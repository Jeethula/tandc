/**
 * T&C Clarity - Detection Heuristics Module
 * Evaluates whether a web page is a Terms of Service, Privacy Policy, or EULA document.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TCDetect = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // URL keyword patterns
  const URL_PATTERNS = [
    /terms/i,
    /tos\b/i,
    /terms-of-service/i,
    /terms-and-conditions/i,
    /terms_of_service/i,
    /terms_and_conditions/i,
    /privacy/i,
    /privacy-policy/i,
    /privacy_policy/i,
    /eula/i,
    /legal\b/i,
    /user-agreement/i,
    /agreement\b/i,
    /terms-of-use/i,
    /condition/i
  ];

  // Title / Heading keywords
  const TITLE_KEYWORDS = [
    'terms of service',
    'terms & conditions',
    'terms and conditions',
    'privacy policy',
    'privacy notice',
    'user agreement',
    'end user license agreement',
    'eula',
    'terms of use',
    'legal notice',
    'conditions of use',
    'terms of sale',
    'cookie policy',
    'data policy'
  ];

  // Legal agreement phrases with weight points
  const LEGAL_PHRASES = [
    { phrase: 'you agree to', weight: 2 },
    { phrase: 'by using this service', weight: 2.5 },
    { phrase: 'by accessing', weight: 2 },
    { phrase: 'arbitration', weight: 3 },
    { phrase: 'binding arbitration', weight: 3 },
    { phrase: 'governing law', weight: 3 },
    { phrase: 'limitation of liability', weight: 3 },
    { phrase: 'disclaimer of warranties', weight: 3 },
    { phrase: 'we collect', weight: 2 },
    { phrase: 'personal information', weight: 2 },
    { phrase: 'personal data', weight: 2 },
    { phrase: 'right to terminate', weight: 2.5 },
    { phrase: 'at our sole discretion', weight: 2.5 },
    { phrase: 'indemnify', weight: 3 },
    { phrase: 'indemnification', weight: 3 },
    { phrase: 'intellectual property', weight: 2 },
    { phrase: 'changes to these terms', weight: 2.5 },
    { phrase: 'reserve the right to modify', weight: 2.5 },
    { phrase: 'class action waiver', weight: 3 },
    { phrase: 'privacy policy', weight: 2 },
    { phrase: 'terms of service', weight: 2 }
  ];

  /**
   * Detects if the current document is a T&C / Privacy Policy page.
   * @param {Object} options
   * @param {string} options.url - Page URL
   * @param {string} options.title - Document title
   * @param {Array<string>} options.headings - Top-level heading strings (h1, h2)
   * @param {string} options.bodyText - Plain text sample of the body
   * @returns {Object} { isTC: boolean, score: number, confidence: string, signals: string[] }
   */
  function detect({ url = '', title = '', headings = [], bodyText = '' }) {
    let score = 0;
    const signals = [];

    // 1. URL Analysis
    try {
      const parsedUrl = new URL(url);
      const urlPathQuery = (parsedUrl.pathname + parsedUrl.search).toLowerCase();
      
      for (const pattern of URL_PATTERNS) {
        if (pattern.test(urlPathQuery)) {
          score += 4;
          signals.push(`URL keyword match: "${pattern.source}"`);
          break;
        }
      }
    } catch (e) {
      // invalid URL string fallback
      if (URL_PATTERNS.some(p => p.test(url.toLowerCase()))) {
        score += 4;
        signals.push('URL keyword match');
      }
    }

    // 2. Title Analysis
    const lowerTitle = title.toLowerCase();
    for (const kw of TITLE_KEYWORDS) {
      if (lowerTitle.includes(kw)) {
        score += 5;
        signals.push(`Title match: "${kw}"`);
        break;
      }
    }

    // 3. Headings Analysis (H1 / H2)
    let headingMatchFound = false;
    for (const h of headings) {
      const lowerH = h.toLowerCase().trim();
      for (const kw of TITLE_KEYWORDS) {
        if (lowerH.includes(kw)) {
          score += 4;
          signals.push(`Heading match ("${h}")`);
          headingMatchFound = true;
          break;
        }
      }
      if (headingMatchFound) break;
    }

    // 4. Body Phrase Keyword Density
    const lowerBody = bodyText.slice(0, 50000).toLowerCase();
    let phraseScore = 0;
    let matchedPhrasesCount = 0;

    for (const item of LEGAL_PHRASES) {
      if (lowerBody.includes(item.phrase)) {
        phraseScore += item.weight;
        matchedPhrasesCount++;
      }
    }

    if (phraseScore > 0) {
      score += Math.min(phraseScore, 10); // cap phrase score contribution to 10
      signals.push(`${matchedPhrasesCount} legal phrase matches (phrase score: ${phraseScore})`);
    }

    // Threshold calculation
    // A page is detected if score >= 8 or strong Title+URL match
    const isTC = score >= 8;
    let confidence = 'none';
    if (score >= 12) confidence = 'high';
    else if (score >= 8) confidence = 'medium';
    else if (score >= 4) confidence = 'low';

    return {
      isTC,
      score,
      confidence,
      signals,
      details: {
        urlMatch: signals.some(s => s.startsWith('URL')),
        titleMatch: signals.some(s => s.startsWith('Title')),
        headingMatch: signals.some(s => s.startsWith('Heading')),
        phraseScore
      }
    };
  }

  /**
   * Scans document or modal containers for T&C agreement checkboxes or consent inputs.
   * @param {Document|HTMLElement} rootElement
   * @returns {Object|null} { found: boolean, text: string, element: HTMLElement }
   */
  function detectConsentCheckbox(rootElement = document) {
    const consentKeywords = [
      'agree to',
      'accept the',
      'terms of service',
      'terms and conditions',
      'terms & conditions',
      'privacy policy',
      'terms of use',
      'eula',
      'user agreement',
      'by checking',
      'i accept'
    ];

    try {
      const inputs = rootElement.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"]');
      
      for (const input of inputs) {
        let labelText = '';

        // Check associated label
        if (input.id) {
          const labelEl = rootElement.querySelector(`label[for="${CSS.escape(input.id)}"]`);
          if (labelEl) labelText += ' ' + labelEl.innerText;
        }

        // Check parent label
        const parentLabel = input.closest('label');
        if (parentLabel) labelText += ' ' + parentLabel.innerText;

        // Check parent element container text
        const parentContainer = input.closest('form, div, p, li, fieldset, [role="dialog"], .modal');
        if (parentContainer) labelText += ' ' + parentContainer.innerText;

        // Check aria-label / title
        if (input.getAttribute('aria-label')) labelText += ' ' + input.getAttribute('aria-label');
        if (input.title) labelText += ' ' + input.title;

        const lowerText = labelText.toLowerCase();
        for (const kw of consentKeywords) {
          if (lowerText.includes(kw)) {
            return {
              found: true,
              matchedKeyword: kw,
              labelText: labelText.trim().slice(0, 150),
              element: input
            };
          }
        }
      }
    } catch (e) {
      // ignore selector errors
    }

    return null;
  }

  return {
    detect,
    detectConsentCheckbox,
    URL_PATTERNS,
    TITLE_KEYWORDS,
    LEGAL_PHRASES
  };
}));
