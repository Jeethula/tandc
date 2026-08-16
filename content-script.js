/**
 * T&C Clarity - Content Script
 * Executes detection logic on page load and SPA navigation, injects floating consent warning card on checkboxes/modals, and extracts text on demand.
 */

(function () {
  'use strict';

  let lastEvaluatedUrl = '';
  let debounceTimer = null;
  let floatingHostEl = null;

  /**
   * Bulletproof check for valid Extension Context.
   * Property access on chrome.runtime.id throws when invalidated, so it MUST be inside a try-catch block.
   */
  function isContextValid() {
    try {
      return Boolean(typeof chrome !== 'undefined' && chrome && chrome.runtime && chrome.runtime.id);
    } catch (e) {
      return false;
    }
  }

  /**
   * Safely sends a message to extension background service worker
   */
  function safeSendMessage(msg) {
    if (!isContextValid()) return;
    try {
      chrome.runtime.sendMessage(msg, () => {
        if (chrome.runtime && chrome.runtime.lastError) {
          // ignore lastError
        }
      });
    } catch (e) {
      // Ignore extension context invalidation gracefully
    }
  }

  /**
   * Evaluates current page for T&C indicators and consent checkboxes
   */
  function evaluatePage() {
    if (!isContextValid()) return;

    try {
      const currentUrl = location.href;
      const isUrlChanged = currentUrl !== lastEvaluatedUrl;
      lastEvaluatedUrl = currentUrl;

      if (!window.TCDetect) {
        console.warn('[T&C Clarity] TCDetect module not loaded.');
        return;
      }

      // 1. Evaluate full page legal text indicators
      const title = document.title || '';
      const headings = Array.from(document.querySelectorAll('h1, h2'))
        .map(h => h.innerText ? h.innerText.trim() : '')
        .filter(Boolean);
      const bodySample = document.body ? document.body.innerText.slice(0, 30000) : '';

      const result = window.TCDetect.detect({
        url: currentUrl,
        title,
        headings,
        bodyText: bodySample
      });

      const consentMatch = (window.TCDetect && window.TCDetect.detectConsentCheckbox) 
        ? window.TCDetect.detectConsentCheckbox(document) 
        : null;

      const isDetected = result.isTC || (consentMatch && consentMatch.found);

      if (isDetected) {
        safeSendMessage({
          action: 'TC_DETECTED',
          details: result
        });

        const title = (consentMatch && consentMatch.found) ? 'Get AI Clarity Before Accepting' : 'Get Instant AI Clarity';
        const sub = (consentMatch && consentMatch.found) ? 'Terms & Conditions Checkbox Detected' : 'Terms & Conditions Detected';

        renderFloatingBanner({ title, sub });
      } else {
        safeSendMessage({
          action: 'TC_NOT_DETECTED',
          details: result
        });
      }
    } catch (err) {
      // Ignore context invalidation gracefully when extension reloads
    }
  }

  /**
   * Renders Shadow DOM Top Floating Card prompting user to analyze T&C
   */
  function renderFloatingBanner(info = {}) {
    if (!isContextValid()) return;

    try {
      if (sessionStorage.getItem('tc_clarity_floating_dismissed')) return;
      if (document.getElementById('tc-clarity-banner-host')) return;

      const titleText = info.title || 'Analyze Terms Before Accepting';
      const subText = info.sub || 'T&C Clarity detected legal terms on this page';

      floatingHostEl = document.createElement('div');
      floatingHostEl.id = 'tc-clarity-banner-host';
      floatingHostEl.style.cssText = 'position: fixed; top: 16px; right: 16px; z-index: 2147483647; pointer-events: auto;';

      const shadow = floatingHostEl.attachShadow({ mode: 'closed' });

      shadow.innerHTML = `
        <style>
          :host {
            all: initial;
          }
          .tc-banner {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #ffffff;
            color: #0f172a;
            border: 2px solid #2563eb;
            border-radius: 14px;
            padding: 12px 16px;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15), 0 12px 28px -4px rgba(37, 99, 235, 0.2), 0 6px 12px -4px rgba(0, 0, 0, 0.08);
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: 440px;
            animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .tc-banner.closing {
            animation: slideUp 0.2s ease-in forwards;
          }
          @keyframes slideUp {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(-20px) scale(0.95); }
          }
          .tc-icon-wrapper {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #eff6ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .tc-icon-wrapper svg {
            width: 20px;
            height: 20px;
          }
          .tc-body {
            flex: 1;
            min-width: 0;
          }
          .tc-title {
            font-weight: 700;
            font-size: 13px;
            line-height: 1.3;
            color: #0f172a;
          }
          .tc-subtitle {
            font-size: 11px;
            color: #64748b;
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .tc-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }
          .tc-btn-analyze {
            background: #2563eb;
            color: #ffffff;
            border: none;
            padding: 7px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: background 0.15s ease;
          }
          .tc-btn-analyze:hover {
            background: #1d4ed8;
          }
          .tc-btn-dismiss {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            padding: 4px 6px;
            border-radius: 4px;
            line-height: 1;
          }
          .tc-btn-dismiss:hover {
            color: #0f172a;
            background: #f1f5f9;
          }
        </style>
        <div class="tc-banner" id="banner">
          <div class="tc-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div class="tc-body">
            <div class="tc-title">${titleText}</div>
            <div class="tc-subtitle">${subText}</div>
          </div>
          <div class="tc-actions">
            <button class="tc-btn-analyze" id="btn-analyze">✨ Analyze Now</button>
            <button class="tc-btn-dismiss" id="btn-dismiss" title="Dismiss">✕</button>
          </div>
        </div>
      `;

      if (document.body) {
        document.body.appendChild(floatingHostEl);

        const banner = shadow.getElementById('banner');
        const analyzeBtn = shadow.getElementById('btn-analyze');
        const dismissBtn = shadow.getElementById('btn-dismiss');

        analyzeBtn.addEventListener('click', () => {
          analyzeBtn.textContent = '⚡ Analyzing...';
          analyzeBtn.disabled = true;

          try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
              chrome.storage.local.set({
                analysisState: { state: 'analyzing', url: location.href, autoRun: true }
              }).catch(() => {});
            }
          } catch (e) {}

          safeSendMessage({ action: 'OPEN_SIDE_PANEL_AND_ANALYZE', url: location.href });
          safeSendMessage({
            action: 'TC_DETECTED',
            details: { confidence: 'high', signals: ['Consent Checkbox Identified'] }
          });

          setTimeout(() => {
            dismissBanner();
          }, 1200);
        });

        dismissBtn.addEventListener('click', dismissBanner);

        function dismissBanner() {
          try {
            sessionStorage.setItem('tc_clarity_floating_dismissed', '1');
          } catch (e) {}
          if (banner) banner.classList.add('closing');
          setTimeout(() => {
            if (floatingHostEl && floatingHostEl.parentNode) {
              floatingHostEl.parentNode.removeChild(floatingHostEl);
            }
          }, 200);
        }
      }
    } catch (err) {
      // Ignore errors when rendering floating banner
    }
  }

  /**
   * Debounced execution for SPA navigation and DOM mutation support
   */
  function scheduleEvaluation() {
    if (!isContextValid()) return;
    try {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (isContextValid()) {
          evaluatePage();
        }
      }, 500);
    } catch (e) {}
  }

  // Initial execution when idle
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    scheduleEvaluation();
  } else {
    window.addEventListener('DOMContentLoaded', scheduleEvaluation);
  }

  // Observe URL and DOM changes for dynamically loaded modals / forms
  let lastHref = location.href;
  const observer = new MutationObserver((mutations) => {
    if (!isContextValid()) {
      try { observer.disconnect(); } catch (e) {}
      return;
    }
    try {
      if (location.href !== lastHref) {
        lastHref = location.href;
        scheduleEvaluation();
      } else {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            scheduleEvaluation();
            break;
          }
        }
      }
    } catch (e) {
      try { observer.disconnect(); } catch (err) {}
    }
  });

  if (document.body) {
    try {
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }

  window.addEventListener('popstate', scheduleEvaluation);
  window.addEventListener('hashchange', scheduleEvaluation);

  /**
   * Listen for extraction requests from extension popup or side panel
   */
  try {
    if (isContextValid() && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (!isContextValid()) return false;

        if (message.action === 'EXTRACT_TEXT') {
          try {
            if (!window.TCExtract) {
              sendResponse({ success: false, error: 'TCExtract module missing' });
              return;
            }

            const extracted = window.TCExtract.extractText(document);
            sendResponse({
              success: true,
              data: {
                url: location.href,
                title: extracted.title || document.title,
                text: extracted.text,
                charCount: extracted.charCount,
                wordCount: extracted.wordCount,
                headings: extracted.headings
              }
            });
          } catch (err) {
            sendResponse({ success: false, error: err.message });
          }
          return false;
        }

        if (message.action === 'RUN_DETECTION') {
          evaluatePage();
          sendResponse({ success: true, url: location.href });
          return false;
        }
      });
    }
  } catch (e) {}
})();
