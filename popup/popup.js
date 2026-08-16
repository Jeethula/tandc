/**
 * T&C Clarity - Popup UI Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const openOptionsBtn = document.getElementById('open-options');
  const bannerOpenOptionsBtn = document.getElementById('banner-open-options');
  const noKeyBanner = document.getElementById('no-key-banner');
  
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const cachedTag = document.getElementById('cached-tag');
  
  const actionSection = document.getElementById('action-section');
  const summarizeBtn = document.getElementById('summarize-btn');
  const summarizeBtnText = document.getElementById('summarize-btn-text');
  
  const loadingState = document.getElementById('loading-state');
  const loadingText = document.getElementById('loading-text');
  
  const errorState = document.getElementById('error-state');
  const errorTitle = document.getElementById('error-title');
  const errorMessage = document.getElementById('error-message');
  const retryBtn = document.getElementById('retry-btn');
  
  const resultsSection = document.getElementById('results-section');
  const riskBadge = document.getElementById('risk-badge');
  const oneLineSummary = document.getElementById('one-line-summary');
  const watchOutList = document.getElementById('watch-out-list');
  const considerList = document.getElementById('consider-list');
  const openSidepanelBtn = document.getElementById('open-sidepanel-btn');
  const resummarizeBtn = document.getElementById('resummarize-btn');

  let currentTab = null;
  let currentApiKey = null;
  let currentModel = TCGemini.DEFAULT_MODEL;
  let isTcDetected = false;

  // Initialize
  await init();

  async function init() {
    // Open Options listeners
    openOptionsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());
    bannerOpenOptionsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());

    // Summarize listeners
    summarizeBtn.addEventListener('click', () => handleSummarize(false));
    resummarizeBtn.addEventListener('click', () => handleSummarize(true));
    retryBtn.addEventListener('click', () => handleSummarize(true));

    // Open Sidepanel listener
    openSidepanelBtn.addEventListener('click', handleOpenSidePanel);

    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tab;

    if (!currentTab || !currentTab.url) {
      showError('Tab Error', 'Cannot inspect this tab.');
      return;
    }

    // Check saved API key & settings
    const settings = await chrome.storage.local.get(['geminiApiKey', 'geminiModel']);
    currentApiKey = settings.geminiApiKey || null;
    currentModel = TCGemini.normalizeModelName(settings.geminiModel);
    if (settings.geminiModel && settings.geminiModel !== currentModel) {
      await chrome.storage.local.set({ geminiModel: currentModel });
    }

    if (!currentApiKey) {
      noKeyBanner.classList.remove('hidden');
    } else {
      noKeyBanner.classList.add('hidden');
    }

    // Check tab detection status from service worker
    try {
      const detectionState = await chrome.runtime.sendMessage({
        action: 'GET_TAB_DETECTION',
        tabId: currentTab.id
      });

      if (detectionState && detectionState.detected) {
        isTcDetected = true;
        statusDot.className = 'dot detected';
        statusText.textContent = 'Terms & Conditions detected';
        summarizeBtnText.textContent = 'Summarize Legal Terms';
      } else {
        isTcDetected = false;
        statusDot.className = 'dot not-detected';
        statusText.textContent = 'No T&C page detected (Manual mode)';
        summarizeBtnText.textContent = 'Summarize Page Anyway';
      }
    } catch (e) {
      // fallback
      statusText.textContent = 'Ready to summarize';
    }

    // Check if summary is already cached for this URL
    const cacheKey = getCacheKey(currentTab.url);
    const cachedData = await chrome.storage.local.get(cacheKey);

    if (cachedData[cacheKey]) {
      const record = cachedData[cacheKey];
      cachedTag.classList.remove('hidden');
      renderSummary(record.summary);
      actionSection.classList.add('hidden');
      resultsSection.classList.remove('hidden');
    }
  }

  /**
   * Summarize Handler
   * @param {boolean} forceRefresh - Ignore cache if true
   */
  async function handleSummarize(forceRefresh = false) {
    const settings = await chrome.storage.local.get(['aiProvider', 'geminiApiKey', 'geminiModel', 'ollamaUrl', 'ollamaModel']);
    const provider = settings.aiProvider || 'gemini';
    currentApiKey = settings.geminiApiKey || null;
    currentModel = TCGemini.normalizeModelName(settings.geminiModel);

    if (provider === 'gemini' && !currentApiKey) {
      noKeyBanner.classList.remove('hidden');
      showError('API Key Missing', 'Please add your Google Gemini API key in Options or switch to Local Ollama.');
      return;
    }

    const cacheKey = getCacheKey(currentTab.url);

    // If not forcing refresh, check cache first
    if (!forceRefresh) {
      const cachedData = await chrome.storage.local.get(cacheKey);
      if (cachedData[cacheKey]) {
        renderSummary(cachedData[cacheKey].summary);
        actionSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        return;
      }
    }

    // Reset UI to loading state
    errorState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    actionSection.classList.add('hidden');
    loadingState.classList.remove('hidden');
    loadingText.textContent = 'Extracting page text...';

    let pageData = null;

    // Try messaging content script to extract text
    try {
      const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'EXTRACT_TEXT' });
      if (response && response.success) {
        pageData = response.data;
      }
    } catch (err) {
      // Content script injection fallback using scripting API
      try {
        await chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: ['lib/extract.js']
        });
        const [result] = await chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: () => TCExtract.extractText(document)
        });
        if (result && result.result) {
          pageData = {
            url: currentTab.url,
            title: currentTab.title,
            text: result.result.text,
            charCount: result.result.charCount
          };
        }
      } catch (scriptErr) {
        showError('Extraction Failed', 'Could not read text content from this page.');
        return;
      }
    }

    if (!pageData || !pageData.text || pageData.text.length < 100) {
      showError('Page Too Short', 'Page text is too short or clean readable text could not be extracted.');
      return;
    }

    const providerLabel = provider === 'ollama' ? `Local Ollama (${settings.ollamaModel || 'llama3.2'})` : `Gemini (${currentModel})`;
    loadingText.textContent = `Analyzing with ${providerLabel}...`;

    await chrome.storage.local.set({
      analysisState: { state: 'analyzing', url: currentTab.url }
    });

    try {
      const summaryResult = await TCGemini.summarize({
        provider,
        text: pageData.text,
        apiKey: currentApiKey,
        model: currentModel,
        ollamaUrl: settings.ollamaUrl,
        ollamaModel: settings.ollamaModel
      });

      // Save to chrome.storage.local cache
      const cacheRecord = {
        url: currentTab.url,
        title: pageData.title || currentTab.title,
        timestamp: Date.now(),
        summary: summaryResult
      };

      await chrome.storage.local.set({
        [cacheKey]: cacheRecord,
        activeSummaryKey: cacheKey,
        activeTabUrl: currentTab.url,
        analysisState: { state: 'idle' }
      });

      cachedTag.classList.add('hidden');
      loadingState.classList.add('hidden');
      renderSummary(summaryResult);
      resultsSection.classList.remove('hidden');

    } catch (apiErr) {
      await chrome.storage.local.set({ analysisState: { state: 'idle' } });
      loadingState.classList.add('hidden');
      
      let title = 'Analysis Failed';
      let msg = apiErr.message || 'An error occurred while generating summary.';
      
      if (msg.includes('INVALID_API_KEY')) {
        title = 'Invalid API Key';
        noKeyBanner.classList.remove('hidden');
      } else if (msg.includes('RATE_LIMIT')) {
        title = 'Rate Limit Exceeded';
      }

      showError(title, msg);
    }
  }

  /**
   * Renders summary results in popup
   */
  function renderSummary(summary) {
    // Risk Badge
    const risk = (summary.overallRisk || 'medium').toLowerCase();
    riskBadge.className = `risk-badge risk-${risk}`;
    riskBadge.textContent = `${risk.toUpperCase()} RISK`;

    // One Line Summary
    oneLineSummary.textContent = summary.oneLineSummary || 'Summary unavailable.';

    // Watch Out Points (Top 3)
    watchOutList.innerHTML = '';
    const watchOuts = summary.watchOutPoints || [];
    if (watchOuts.length === 0) {
      watchOutList.innerHTML = '<li>No major watch out points detected.</li>';
    } else {
      watchOuts.slice(0, 3).forEach(pt => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="point-title">${escapeHtml(pt.title)}:</span> ${escapeHtml(pt.detail)}`;
        watchOutList.appendChild(li);
      });
    }

    // Consider Points (Top 3)
    considerList.innerHTML = '';
    const considers = summary.considerPoints || [];
    if (considers.length === 0) {
      considerList.innerHTML = '<li>No specific key considerations detected.</li>';
    } else {
      considers.slice(0, 3).forEach(pt => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="point-title">${escapeHtml(pt.title)}:</span> ${escapeHtml(pt.detail)}`;
        considerList.appendChild(li);
      });
    }
  }

  /**
   * Trigger side panel opening
   */
  async function handleOpenSidePanel() {
    const cacheKey = getCacheKey(currentTab.url);
    await chrome.storage.local.set({
      activeSummaryKey: cacheKey,
      activeTabUrl: currentTab.url
    });

    try {
      await chrome.runtime.sendMessage({
        action: 'OPEN_SIDE_PANEL',
        tabId: currentTab.id,
        windowId: currentTab.windowId
      });
      window.close(); // Close popup once side panel opens
    } catch (e) {
      // Fallback
      if (chrome.sidePanel && chrome.sidePanel.open) {
        await chrome.sidePanel.open({ tabId: currentTab.id });
        window.close();
      } else {
        alert('Side panel API unavailable in your browser version.');
      }
    }
  }

  /**
   * Helper: Show Error Card
   */
  function showError(title, msg) {
    loadingState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    actionSection.classList.remove('hidden');
    errorState.classList.remove('hidden');
    errorTitle.textContent = title;
    errorMessage.textContent = msg;
  }

  /**
   * Helper: Generate URL hash for storage key
   */
  function getCacheKey(url) {
    let clean = url || '';
    try {
      const u = new URL(url);
      clean = u.origin + u.pathname; // exclude query params for cleaner hashing
    } catch (e) {}
    
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = ((hash << 5) - hash) + clean.charCodeAt(i);
      hash |= 0;
    }
    return `tc_summary_${Math.abs(hash)}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, match => {
      const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return escapeMap[match];
    });
  }
});
