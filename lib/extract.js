/**
 * T&C Clarity - Readability-Style Text Extractor
 * Extracts readable main body text from HTML documents, removing navigation, sidebars, headers, footers, and scripts.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TCExtract = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Elements to unconditionally remove
  const UNWANTED_TAGS = [
    'script', 'style', 'noscript', 'iframe', 'svg', 'nav', 'header', 'footer',
    'form', 'button', 'input', 'select', 'textarea', 'aside', 'canvas', 'picture', 'map'
  ];

  // Classes/IDs likely to be non-content
  const UNWANTED_SELECTORS = [
    '.nav', '.navbar', '#nav', '#header', '#footer', '.footer', '.sidebar',
    '#sidebar', '.comments', '#comments', '.ad', '.ads', '.advertisement',
    '.cookie-banner', '.consent-banner', '#cookie-notice', '.social-share'
  ];

  /**
   * Extracts clean, structured text content from DOM document or root element.
   * @param {Document|HTMLElement} rootElement - Document or target element to extract from
   * @returns {Object} { title: string, text: string, charCount: number, headings: string[] }
   */
  function extractText(rootElement = document) {
    const doc = rootElement.ownerDocument || (rootElement.nodeType === 9 ? rootElement : document);
    const pageTitle = doc.title ? doc.title.trim() : '';

    // Clone root to avoid mutating live DOM
    const clone = rootElement.cloneNode(true);

    // Remove unwanted tag elements
    UNWANTED_TAGS.forEach(tag => {
      const elements = clone.querySelectorAll(tag);
      elements.forEach(el => el.remove());
    });

    // Remove unwanted selectors
    UNWANTED_SELECTORS.forEach(sel => {
      try {
        const elements = clone.querySelectorAll(sel);
        elements.forEach(el => el.remove());
      } catch (e) {
        // ignore selector errors
      }
    });

    // Prefer <main> or <article> if available and containing text
    let targetContainer = null;
    const candidates = clone.querySelectorAll('main, article, [role="main"], .legal-content, .terms-content, .privacy-content');
    
    for (const cand of candidates) {
      if (cand.innerText && cand.innerText.trim().length > 500) {
        targetContainer = cand;
        break;
      }
    }

    // Fallback: Find largest text container if no main/article candidate found
    if (!targetContainer) {
      targetContainer = findLargestTextContainer(clone);
    }

    // Fallback to body or clone if needed
    if (!targetContainer) {
      targetContainer = clone.body || clone;
    }

    // Collect top section headings (h1, h2, h3)
    const headingElements = targetContainer.querySelectorAll('h1, h2, h3');
    const headings = Array.from(headingElements)
      .map(h => h.innerText ? h.innerText.trim() : '')
      .filter(h => h.length > 0 && h.length < 150);

    // Process paragraphs and blocks to format output text clearly
    const textBlocks = [];
    const blockElements = targetContainer.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, tr, div, section');

    if (blockElements.length > 0) {
      blockElements.forEach(el => {
        // Only get text directly or from children if it's a leaf block element
        if (!el.querySelector('p, h1, h2, h3, h4, h5, h6, li, tr')) {
          const text = el.innerText || el.textContent;
          if (text) {
            const cleaned = cleanWhitespace(text);
            if (cleaned.length > 15 && !textBlocks.includes(cleaned)) {
              textBlocks.push(cleaned);
            }
          }
        }
      });
    }

    let finalText = '';
    if (textBlocks.length > 0) {
      finalText = textBlocks.join('\n\n');
    } else {
      // Direct innerText fallback
      finalText = cleanWhitespace(targetContainer.innerText || targetContainer.textContent || '');
    }

    // Truncate if insanely huge (safeguard limits)
    const charCount = finalText.length;

    return {
      title: pageTitle,
      text: finalText,
      charCount,
      headings: headings.slice(0, 10),
      wordCount: finalText.split(/\s+/).filter(Boolean).length
    };
  }

  /**
   * Finds element with the highest text density
   */
  function findLargestTextContainer(container) {
    let bestEl = null;
    let maxLen = 0;

    const divs = container.querySelectorAll('div, section, article');
    divs.forEach(div => {
      // Don't select container that contains another candidate div with almost equal text
      const len = div.innerText ? div.innerText.trim().length : 0;
      if (len > maxLen) {
        maxLen = len;
        bestEl = div;
      }
    });

    return bestEl;
  }

  /**
   * Normalizes whitespace while preserving paragraphs
   */
  function cleanWhitespace(str) {
    if (!str) return '';
    return str
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim();
  }

  return {
    extractText,
    cleanWhitespace
  };
}));
