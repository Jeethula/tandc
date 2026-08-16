/**
 * T&C Clarity - Side Panel Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const pageHost = document.getElementById('page-host');
  const overallRiskBadge = document.getElementById('overall-risk-badge');
  const copySummaryBtn = document.getElementById('copy-summary-btn');
  const exportTextBtn = document.getElementById('export-text-btn');
  const openSettingsBtn = document.getElementById('open-settings-btn');
  const refreshSummaryBtn = document.getElementById('refresh-summary-btn');
  
  const noKeyBanner = document.getElementById('no-key-banner');
  const bannerOpenSettingsBtn = document.getElementById('banner-open-settings-btn');

  const emptyState = document.getElementById('empty-state');
  const emptySummarizeBtn = document.getElementById('empty-summarize-btn');
  const analyzingState = document.getElementById('analyzing-state');
  const contentStream = document.getElementById('content-stream');
  const heroSummaryText = document.getElementById('hero-summary-text');
  const timestampTag = document.getElementById('timestamp-tag');
  
  const watchOutContainer = document.getElementById('watch-out-container');
  const considerContainer = document.getElementById('consider-container');
  const toast = document.getElementById('toast');

  // Categories accordion containers
  const catDataCollection = document.getElementById('cat-data-collection');
  const catDataSharing = document.getElementById('cat-data-sharing');
  const catUserRights = document.getElementById('cat-user-rights');
  const catLiability = document.getElementById('cat-liability');
  const catCancellation = document.getElementById('cat-cancellation');
  const catDispute = document.getElementById('cat-dispute');
  const catChanges = document.getElementById('cat-changes');

  let currentTab = null;
  let currentSummaryData = null;

  // Initialize
  await init();

  async function init() {
    // Toolbar listeners
    copySummaryBtn.addEventListener('click', handleCopySummary);
    exportTextBtn.addEventListener('click', handleExportText);
    openSettingsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());
    bannerOpenSettingsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());
    refreshSummaryBtn.addEventListener('click', handleRefreshSummary);
    emptySummarizeBtn.addEventListener('click', handleRefreshSummary);

    // Update active tab & load summary
    await updateActiveTab();

    // Listen for storage changes to auto-update live
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local') {
        loadActiveSummary();
      }
    });

    // Listen for tab switches and tab navigation updates
    if (chrome.tabs && chrome.tabs.onActivated) {
      chrome.tabs.onActivated.addListener(async () => {
        await updateActiveTab();
      });
    }

    if (chrome.tabs && chrome.tabs.onUpdated) {
      chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        if (tab.active && (changeInfo.status === 'complete' || changeInfo.url)) {
          await updateActiveTab();
        }
      });
    }
  }

  async function updateActiveTab() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        currentTab = tab;
        if (currentTab.url) {
          try {
            const u = new URL(currentTab.url);
            pageHost.textContent = u.hostname || currentTab.title;
          } catch (e) {
            pageHost.textContent = currentTab.title || 'Legal Document';
          }
        }
      }
    } catch (e) {}

    await loadActiveSummary();
  }

  /**
   * Loads ONLY the active current tab's summary from local storage (NO stale cross-tab cache)
   */
  async function loadActiveSummary() {
    if (!currentTab || !currentTab.url) {
      showEmptyState();
      return;
    }

    const currentTabCacheKey = getCacheKey(currentTab.url);
    const storage = await chrome.storage.local.get([
      currentTabCacheKey,
      'analysisState',
      'aiProvider',
      'geminiApiKey',
      'geminiModel',
      'ollamaUrl',
      'ollamaModel'
    ]);

    const provider = storage.aiProvider || 'gemini';
    if (provider === 'gemini' && !storage.geminiApiKey) {
      noKeyBanner.classList.remove('hidden');
    } else {
      noKeyBanner.classList.add('hidden');
    }

    // Check if AI analysis is currently running or requested for THIS active tab
    if (storage.analysisState && storage.analysisState.state === 'analyzing' && storage.analysisState.url === currentTab.url) {
      showAnalyzingState(storage);
      if (storage.analysisState.autoRun) {
        await chrome.storage.local.set({
          analysisState: { state: 'analyzing', url: currentTab.url, autoRun: false }
        });
        handleRefreshSummary();
      }
      return;
    }

    // Only show summary if a valid record exists strictly for THIS current tab URL
    const record = storage[currentTabCacheKey];
    if (record && record.summary && record.url === currentTab.url) {
      currentSummaryData = record;
      renderFullSummary(currentSummaryData);
    } else {
      showEmptyState();
    }
  }

  function showAnalyzingState(settings = {}) {
    emptyState.classList.add('hidden');
    contentStream.classList.add('hidden');
    analyzingState.classList.remove('hidden');

    const provider = settings.aiProvider || 'gemini';
    const modelLabel = provider === 'ollama' ? `Local Ollama (${settings.ollamaModel || 'llama3.2'})` : `Gemini (${settings.geminiModel || TCGemini.DEFAULT_GEMINI_MODEL})`;
    const providerText = document.getElementById('analyzing-provider-text');
    if (providerText) {
      providerText.textContent = `Analyzing document clauses with ${modelLabel}...`;
    }
  }

  /**
   * Renders the complete structured summary
   */
  function renderFullSummary(record) {
    const summary = record.summary;
    if (!summary) {
      showEmptyState();
      return;
    }

    analyzingState.classList.add('hidden');
    emptyState.classList.add('hidden');
    contentStream.classList.remove('hidden');

    // Page title / Host update
    if (record.url) {
      try {
        const u = new URL(record.url);
        pageHost.textContent = u.hostname;
      } catch (e) {}
    }

    // Risk Badge
    const risk = (summary.overallRisk || 'medium').toLowerCase();
    overallRiskBadge.className = `risk-badge risk-${risk}`;
    overallRiskBadge.textContent = `${risk.toUpperCase()} RISK`;

    // Hero One-Line Summary
    heroSummaryText.textContent = summary.oneLineSummary || 'No executive summary provided.';

    // Timestamp
    if (record.timestamp) {
      const dateStr = new Date(record.timestamp).toLocaleString();
      timestampTag.textContent = `Analyzed on ${dateStr}`;
    }

    // Render Watch Out Points
    watchOutContainer.innerHTML = '';
    const watchOuts = summary.watchOutPoints || [];
    if (watchOuts.length === 0) {
      watchOutContainer.innerHTML = '<div class="point-card"><p class="point-detail">No severe watch-out items highlighted.</p></div>';
    } else {
      watchOuts.forEach(pt => {
        const card = document.createElement('div');
        card.className = 'point-card';
        const sev = (pt.severity || 'medium').toLowerCase();
        card.innerHTML = `
          <div class="point-header">
            <span class="point-title">${escapeHtml(pt.title)}</span>
            <span class="severity-pill sev-${sev}">${sev}</span>
          </div>
          <p class="point-detail">${escapeHtml(pt.detail)}</p>
        `;
        watchOutContainer.appendChild(card);
      });
    }

    // Render Consider Points
    considerContainer.innerHTML = '';
    const considers = summary.considerPoints || [];
    if (considers.length === 0) {
      considerContainer.innerHTML = '<div class="point-card"><p class="point-detail">No specific key considerations highlighted.</p></div>';
    } else {
      considers.forEach(pt => {
        const card = document.createElement('div');
        card.className = 'point-card';
        card.innerHTML = `
          <div class="point-header">
            <span class="point-title">${escapeHtml(pt.title)}</span>
          </div>
          <p class="point-detail">${escapeHtml(pt.detail)}</p>
        `;
        considerContainer.appendChild(card);
      });
    }

    // Render Categories Deep-Dive
    const cats = summary.categories || {};
    catDataCollection.textContent = cats.dataCollection || 'No data collection details extracted.';
    catDataSharing.textContent = cats.dataSharing || 'No data sharing details extracted.';
    catUserRights.textContent = cats.userRights || 'No user rights details extracted.';
    catLiability.textContent = cats.liability || 'No liability details extracted.';
    catCancellation.textContent = cats.cancellationRefunds || 'No cancellation/refund details extracted.';
    catDispute.textContent = cats.disputeResolution || 'No dispute resolution details extracted.';
    catChanges.textContent = cats.changesToTerms || 'No terms change notice details extracted.';
  }

  /**
   * Refresh / Re-summarize Active Tab
   */
  async function handleRefreshSummary() {
    if (!currentTab || !currentTab.id) return;
    
    showToast('Extracting & analyzing active page...');
    
    const settings = await chrome.storage.local.get(['aiProvider', 'geminiApiKey', 'geminiModel', 'ollamaUrl', 'ollamaModel']);
    const provider = settings.aiProvider || 'gemini';

    if (provider === 'gemini' && !settings.geminiApiKey) {
      showToast('API Key missing. Please set in Options.');
      chrome.runtime.openOptionsPage();
      return;
    }

    try {
      // Set analyzing state immediately
      await chrome.storage.local.set({
        analysisState: { state: 'analyzing', url: currentTab.url }
      });
      showAnalyzingState(settings);

      // Extract text
      let pageText = '';
      let pageTitle = currentTab.title;

      try {
        const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'EXTRACT_TEXT' });
        if (response && response.success) {
          pageText = response.data.text;
          pageTitle = response.data.title;
        }
      } catch (e) {
        const [result] = await chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: () => TCExtract.extractText(document)
        });
        if (result && result.result) {
          pageText = result.result.text;
        }
      }

      if (!pageText || pageText.length < 100) {
        showToast('Page content too short to analyze.');
        await chrome.storage.local.set({ analysisState: { state: 'idle' } });
        showEmptyState();
        return;
      }

      const newSummary = await TCGemini.summarize({
        provider,
        text: pageText,
        apiKey: settings.geminiApiKey,
        model: TCGemini.normalizeModelName(settings.geminiModel),
        ollamaUrl: settings.ollamaUrl,
        ollamaModel: settings.ollamaModel
      });

      const cacheKey = getCacheKey(currentTab.url);
      const record = {
        url: currentTab.url,
        title: pageTitle || currentTab.title,
        timestamp: Date.now(),
        summary: newSummary
      };

      await chrome.storage.local.set({
        [cacheKey]: record,
        activeSummaryKey: cacheKey,
        activeTabUrl: currentTab.url,
        analysisState: { state: 'idle' }
      });

      currentSummaryData = record;
      renderFullSummary(currentSummaryData);
      showToast('Analysis complete!');

    } catch (err) {
      await chrome.storage.local.set({ analysisState: { state: 'idle' } });
      showEmptyState();
      showToast(`Analysis failed: ${err.message || 'Unknown error'}`);
    }
  }

  /**
   * Copy Summary to Clipboard
   */
  async function handleCopySummary() {
    if (!currentSummaryData || !currentSummaryData.summary) {
      showToast('No summary content to copy.');
      return;
    }

    const s = currentSummaryData.summary;
    const textLines = [
      `=== T&C Clarity Summary: ${currentSummaryData.title || pageHost.textContent} ===`,
      `URL: ${currentSummaryData.url}`,
      `Overall Risk: ${(s.overallRisk || 'medium').toUpperCase()}`,
      `Date: ${new Date(currentSummaryData.timestamp).toLocaleString()}`,
      ``,
      `EXECUTIVE SUMMARY:`,
      s.oneLineSummary,
      ``,
      `WATCH OUT POINTS:`,
      ...(s.watchOutPoints || []).map(p => `- [${(p.severity || 'MED').toUpperCase()}] ${p.title}: ${p.detail}`),
      ``,
      `KEY CONSIDERATIONS:`,
      ...(s.considerPoints || []).map(p => `- ${p.title}: ${p.detail}`),
      ``,
      `CATEGORY BREAKDOWN:`,
      `• Data Collection: ${s.categories?.dataCollection}`,
      `• Data Sharing: ${s.categories?.dataSharing}`,
      `• User Rights: ${s.categories?.userRights}`,
      `• Liability: ${s.categories?.liability}`,
      `• Cancellation & Refunds: ${s.categories?.cancellationRefunds}`,
      `• Dispute Resolution: ${s.categories?.disputeResolution}`,
      `• Changes to Terms: ${s.categories?.changesToTerms}`
    ];

    try {
      await navigator.clipboard.writeText(textLines.join('\n'));
      showToast('Summary copied to clipboard!');
    } catch (e) {
      showToast('Could not copy text.');
    }
  }

  /**
   * Export Summary as Text File
   */
  function handleExportText() {
    if (!currentSummaryData || !currentSummaryData.summary) {
      showToast('No summary content to export.');
      return;
    }

    const s = currentSummaryData.summary;
    const textLines = [
      `==================================================`,
      `T&C CLARITY - TERMS & PRIVACY ANALYSIS REPORT`,
      `==================================================`,
      `Document: ${currentSummaryData.title || 'Legal Document'}`,
      `URL: ${currentSummaryData.url}`,
      `Date Analyzed: ${new Date(currentSummaryData.timestamp).toLocaleString()}`,
      `Overall Risk: ${(s.overallRisk || 'medium').toUpperCase()}`,
      `--------------------------------------------------`,
      ``,
      `[EXECUTIVE SUMMARY]`,
      s.oneLineSummary,
      ``,
      `[WATCH OUT POINTS]`,
      ...(s.watchOutPoints || []).map(p => `* [${(p.severity || 'MED').toUpperCase()}] ${p.title}\n  ${p.detail}\n`),
      ``,
      `[POINTS TO CONSIDER]`,
      ...(s.considerPoints || []).map(p => `* ${p.title}\n  ${p.detail}\n`),
      ``,
      `[CATEGORY DEEP-DIVE]`,
      `1. Data Collection & Privacy:`,
      `   ${s.categories?.dataCollection}`,
      ``,
      `2. Data Sharing & Third Parties:`,
      `   ${s.categories?.dataSharing}`,
      ``,
      `3. User Rights & Data Controls:`,
      `   ${s.categories?.userRights}`,
      ``,
      `4. Liability & Disclaimers:`,
      `   ${s.categories?.liability}`,
      ``,
      `5. Cancellation & Refunds:`,
      `   ${s.categories?.cancellationRefunds}`,
      ``,
      `6. Dispute Resolution & Arbitration:`,
      `   ${s.categories?.disputeResolution}`,
      ``,
      `7. Changes to Terms & Notice:`,
      `   ${s.categories?.changesToTerms}`
    ];

    const blob = new Blob([textLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tc_summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Export report downloaded!');
  }

  function showEmptyState() {
    analyzingState.classList.add('hidden');
    contentStream.classList.add('hidden');
    emptyState.classList.remove('hidden');
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  function getCacheKey(url) {
    let clean = url || '';
    try {
      const u = new URL(url);
      clean = u.origin + u.pathname;
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
