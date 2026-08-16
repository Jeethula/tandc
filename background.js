/**
 * T&C Clarity - Background Service Worker (Manifest V3)
 * Manages extension state, action badges, message routing, and side panel triggers.
 */

// Enable side panel behavior
try {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
  }
} catch (e) {}

/**
 * Message listener for extension components
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'TC_DETECTED') {
    handleTcDetected(sender.tab?.id, message.details);
    sendResponse({ success: true });
    return false;
  }

  if (message.action === 'TC_NOT_DETECTED') {
    handleTcNotDetected(sender.tab?.id);
    sendResponse({ success: true });
    return false;
  }

  if (message.action === 'OPEN_SIDE_PANEL_AND_ANALYZE' || message.action === 'OPEN_SIDE_PANEL') {
    const tabId = sender.tab ? sender.tab.id : message.tabId;
    const windowId = sender.tab ? sender.tab.windowId : message.windowId;
    const tabUrl = sender.tab ? sender.tab.url : (message.url || '');

    // Set analysis state so side panel or popup renders analyzing screen on open
    chrome.storage.local.set({
      analysisState: { state: 'analyzing', url: tabUrl, autoRun: true }
    }).catch(() => {});

    if (tabId && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.sidePanel.open({ tabId }).then(() => {
        sendResponse({ success: true, opened: true });
      }).catch((err) => {
        // Safely catch user gesture restriction error (Chrome blocks sidePanel.open across IPC)
        sendResponse({ success: false, error: 'USER_GESTURE_REQUIRED', message: err.message });
      });
      return true; // async sendResponse
    } else if (windowId && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.sidePanel.open({ windowId }).then(() => {
        sendResponse({ success: true, opened: true });
      }).catch((err) => {
        sendResponse({ success: false, error: 'USER_GESTURE_REQUIRED', message: err.message });
      });
      return true;
    } else {
      sendResponse({ success: false, error: 'Side panel API unavailable' });
      return false;
    }
  }

  if (message.action === 'GET_TAB_DETECTION') {
    (async () => {
      const tabId = message.tabId;
      if (!tabId) {
        sendResponse({ detected: false });
        return;
      }
      const { tabDetections = {} } = await chrome.storage.session.get('tabDetections').catch(() => ({}));
      sendResponse(tabDetections[tabId] || { detected: false });
    })();
    return true;
  }
});

/**
 * Sets the extension badge when a T&C page is detected on a tab
 */
async function handleTcDetected(tabId, details) {
  if (!tabId) return;

  try {
    const { tabDetections = {} } = await chrome.storage.session.get('tabDetections').catch(() => ({}));
    tabDetections[tabId] = {
      detected: true,
      timestamp: Date.now(),
      details: details || {}
    };
    await chrome.storage.session.set({ tabDetections }).catch(() => {});

    await chrome.action.setBadgeText({ text: 'T&C', tabId }).catch(() => {});
    await chrome.action.setBadgeBackgroundColor({ color: '#2563EB', tabId }).catch(() => {});
    await chrome.action.setBadgeTextColor({ color: '#FFFFFF', tabId }).catch(() => {});
  } catch (e) {
    console.error('Error setting badge:', e);
  }
}

/**
 * Clears badge when T&C page is not detected
 */
async function handleTcNotDetected(tabId) {
  if (!tabId) return;

  try {
    const { tabDetections = {} } = await chrome.storage.session.get('tabDetections').catch(() => ({}));
    delete tabDetections[tabId];
    await chrome.storage.session.set({ tabDetections }).catch(() => {});

    await chrome.action.setBadgeText({ text: '', tabId }).catch(() => {});
  } catch (e) {
    console.error('Error clearing badge:', e);
  }
}

/**
 * Clean up tab state when tab is closed
 */
chrome.tabs.onRemoved.addListener(async (tabId) => {
  try {
    const { tabDetections = {} } = await chrome.storage.session.get('tabDetections').catch(() => ({}));
    if (tabDetections[tabId]) {
      delete tabDetections[tabId];
      await chrome.storage.session.set({ tabDetections }).catch(() => {});
    }
  } catch (e) {}
});
