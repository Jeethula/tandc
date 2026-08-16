/**
 * T&C Clarity - Options & Settings Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('settings-form');
  const providerSelect = document.getElementById('provider-select');
  const geminiGroup = document.getElementById('gemini-group');
  const ollamaGroup = document.getElementById('ollama-group');

  const apiKeyInput = document.getElementById('api-key');
  const modelSelect = document.getElementById('model-select');
  const toggleVisibilityBtn = document.getElementById('toggle-key-visibility');

  const ollamaUrlInput = document.getElementById('ollama-url');
  const fetchOllamaBtn = document.getElementById('fetch-ollama-btn');
  const ollamaModelSelect = document.getElementById('ollama-model-select');

  const testKeyBtn = document.getElementById('test-key-btn');
  const clearCacheBtn = document.getElementById('clear-cache-btn');
  const clearKeyBtn = document.getElementById('clear-key-btn');
  
  const statusAlert = document.getElementById('status-alert');
  const alertText = document.getElementById('alert-text');

  // Load saved settings
  const settings = await chrome.storage.local.get([
    'aiProvider',
    'geminiApiKey',
    'geminiModel',
    'ollamaUrl',
    'ollamaModel'
  ]);

  const activeProvider = settings.aiProvider || 'gemini';
  providerSelect.value = activeProvider;
  updateProviderUI(activeProvider);

  if (settings.geminiApiKey) apiKeyInput.value = settings.geminiApiKey;
  if (settings.geminiModel) modelSelect.value = TCGemini.normalizeModelName(settings.geminiModel);
  if (settings.ollamaUrl) ollamaUrlInput.value = settings.ollamaUrl;
  
  // Try populating Ollama models if Ollama is selected or URL is set
  if (settings.ollamaModel) {
    populateOllamaModelDropdown([settings.ollamaModel], settings.ollamaModel);
  }

  // Provider switcher listener
  providerSelect.addEventListener('change', (e) => {
    updateProviderUI(e.target.value);
  });

  function updateProviderUI(provider) {
    if (provider === 'ollama') {
      geminiGroup.classList.add('hidden');
      ollamaGroup.classList.remove('hidden');
    } else {
      geminiGroup.classList.remove('hidden');
      ollamaGroup.classList.add('hidden');
    }
  }

  // Toggle Password Visibility
  toggleVisibilityBtn.addEventListener('click', () => {
    const isPassword = apiKeyInput.type === 'password';
    apiKeyInput.type = isPassword ? 'text' : 'password';
  });

  // Fetch Ollama Models Button
  fetchOllamaBtn.addEventListener('click', async () => {
    const url = ollamaUrlInput.value.trim() || TCGemini.DEFAULT_OLLAMA_URL;
    fetchOllamaBtn.disabled = true;
    showAlert('info', 'Scanning local Ollama models at ' + url + '...');

    try {
      const models = await TCGemini.fetchOllamaModels(url);
      if (models.length === 0) {
        showAlert('error', 'Ollama is running, but no models found. Run "ollama run llama3.2" in your terminal.');
      } else {
        populateOllamaModelDropdown(models, ollamaModelSelect.value);
        showAlert('success', `Found ${models.length} local Ollama model(s)!`);
      }
    } catch (err) {
      showAlert('error', err.message);
    } finally {
      fetchOllamaBtn.disabled = false;
    }
  });

  function populateOllamaModelDropdown(models, selectedValue) {
    ollamaModelSelect.innerHTML = '';
    models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      if (m === selectedValue) opt.selected = true;
      ollamaModelSelect.appendChild(opt);
    });
  }

  // Save Settings Form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const provider = providerSelect.value;
    const key = apiKeyInput.value.trim();
    const model = modelSelect.value;
    const oUrl = ollamaUrlInput.value.trim() || TCGemini.DEFAULT_OLLAMA_URL;
    const oModel = ollamaModelSelect.value || TCGemini.DEFAULT_OLLAMA_MODEL;

    await chrome.storage.local.set({
      aiProvider: provider,
      geminiApiKey: key,
      geminiModel: model,
      ollamaUrl: oUrl,
      ollamaModel: oModel
    });

    showAlert('success', 'Settings saved successfully!');
  });

  // Test API / Local Connection
  testKeyBtn.addEventListener('click', async () => {
    const provider = providerSelect.value;
    const key = apiKeyInput.value.trim();
    const model = modelSelect.value;
    const oUrl = ollamaUrlInput.value.trim() || TCGemini.DEFAULT_OLLAMA_URL;
    const oModel = ollamaModelSelect.value || TCGemini.DEFAULT_OLLAMA_MODEL;

    testKeyBtn.disabled = true;

    if (provider === 'gemini' && !key) {
      showAlert('error', 'Please enter a Gemini API Key before testing.');
      testKeyBtn.disabled = false;
      return;
    }

    showAlert('info', provider === 'ollama' ? 'Testing local Ollama connection...' : 'Testing Google Gemini API key...');

    try {
      const result = await TCGemini.testApiKey(key, model, provider, oUrl, oModel);
      if (result.success) {
        showAlert('success', result.message);
      } else {
        showAlert('error', `Validation failed: ${result.error}`);
      }
    } catch (err) {
      showAlert('error', `Validation error: ${err.message}`);
    } finally {
      testKeyBtn.disabled = false;
    }
  });

  // Clear Cached Summaries
  clearCacheBtn.addEventListener('click', async () => {
    const allData = await chrome.storage.local.get(null);
    const keysToRemove = Object.keys(allData).filter(k => k.startsWith('tc_summary_') || k === 'activeSummaryKey' || k === 'activeTabUrl');

    if (keysToRemove.length === 0) {
      showAlert('info', 'No cached summaries found to clear.');
      return;
    }

    await chrome.storage.local.remove(keysToRemove);
    showAlert('success', `Cleared ${keysToRemove.length} cached summary records.`);
  });

  // Remove Saved Credentials
  clearKeyBtn.addEventListener('click', async () => {
    await chrome.storage.local.remove(['geminiApiKey', 'ollamaUrl', 'ollamaModel']);
    apiKeyInput.value = '';
    showAlert('info', 'Saved credentials removed.');
  });

  function showAlert(type, message) {
    statusAlert.className = `alert alert-${type}`;
    alertText.textContent = message;
    statusAlert.classList.remove('hidden');
  }
});
