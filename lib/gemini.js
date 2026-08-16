/**
 * T&C Clarity - LLM Engine (Google Gemini REST & Local Ollama Support)
 * Multi-provider client supporting Google Gemini REST API (BYOK) and local Ollama models (100% Free & Offline).
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TCGemini = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash';
  const DEFAULT_OLLAMA_URL = 'http://localhost:11434';
  const DEFAULT_OLLAMA_MODEL = 'llama3.2';
  const CHUNK_SIZE = 25000;

  const MODEL_ALIASES = {
    'gemini-1.5-pro': 'gemini-2.5-pro',
    'gemini-1.5-flash': 'gemini-2.0-flash',
    'gemini-1.0-pro': 'gemini-2.0-flash'
  };

  const FALLBACK_CHAIN = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash'
  ];

  function normalizeModelName(modelName) {
    if (!modelName) return DEFAULT_GEMINI_MODEL;
    if (MODEL_ALIASES[modelName]) return MODEL_ALIASES[modelName];
    return modelName;
  }

  const SYSTEM_INSTRUCTION = `You are a world-class privacy advocate and legal expert. Your job is to analyze Terms of Service, Privacy Policies, EULAs, and Legal Agreements, translating them into transparent, actionable summaries for everyday users.

Be rigorous, objective, and highlight hidden traps, data sharing practices, forced arbitration, liability caps, and user rights.`;

  const PROMPT_JSON_SCHEMA_INSTRUCTION = `Analyze the provided legal document text and output ONLY valid JSON matching this exact JSON schema:

{
  "overallRisk": "low" | "medium" | "high",
  "oneLineSummary": "A clear, 1-sentence plain-English summary of what this document means for the user.",
  "considerPoints": [
    {
      "title": "Short title",
      "detail": "Detailed explanation of a positive, standard, or noteworthy clause",
      "category": "Data Privacy | User Rights | Account Rules | General"
    }
  ],
  "watchOutPoints": [
    {
      "title": "Short title highlighting potential concern",
      "detail": "Explanation of potential trap, privacy risk, forced arbitration, or heavy restriction",
      "category": "Data Collection | Data Sharing | Dispute Resolution | Liability | Account Loss | General",
      "severity": "low" | "medium" | "high"
    }
  ],
  "categories": {
    "dataCollection": "Summary of what personal/device data is collected",
    "dataSharing": "Summary of who data is shared or sold to, including advertisers or third parties",
    "userRights": "Summary of user data rights, deletion, export, opt-outs",
    "liability": "Summary of liability waivers, disclaimers, user indemnification",
    "cancellationRefunds": "Summary of account termination, subscription cancelation, and refund policies",
    "disputeResolution": "Summary of arbitration, class-action waivers, governing jurisdiction",
    "changesToTerms": "Summary of how terms can be changed and notice provided"
  }
}

Guidelines for risk assessment:
- "high" risk: Forced binding arbitration, class action waiver, selling personal data, unilateral content ownership transfer, zero liability for data breaches, auto-renewals without refund.
- "medium" risk: Extensive tracking for targeted ads, right to terminate accounts without cause, broad license to user content, venue restricted to remote jurisdiction.
- "low" risk: Standard GDPR/CCPA compliance, clear deletion options, fair liability split, reasonable notice for changes.

Return ONLY raw JSON string matching this schema.`;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==========================================
  // GOOGLE GEMINI PROVIDER
  // ==========================================

  async function callGeminiApi({ apiKey, model = DEFAULT_GEMINI_MODEL, prompt, contents }) {
    if (!apiKey) {
      throw new Error('API_KEY_MISSING');
    }

    let targetModel = normalizeModelName(model);
    const maxRetries = 3;
    let attempt = 0;

    while (attempt <= maxRetries) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const payload = {
        contents: contents || [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      };

      let response;
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        throw new Error('NETWORK_ERROR: Unable to reach Gemini API. Check your internet connection.');
      }

      if (response.ok) {
        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResult) {
          throw new Error('EMPTY_RESPONSE: Received empty response from Gemini API.');
        }

        return textResult;
      }

      const status = response.status;
      let errText = '';
      try {
        const errJson = await response.json();
        errText = errJson.error?.message || response.statusText;
      } catch (e) {
        errText = response.statusText;
      }

      if (status === 404) {
        const nextFallback = FALLBACK_CHAIN.find(m => m !== targetModel) || DEFAULT_GEMINI_MODEL;
        console.warn(`[T&C Clarity] Model ${targetModel} returned 404. Retrying with fallback model ${nextFallback}...`);
        targetModel = nextFallback;
        attempt++;
        await sleep(300);
        continue;
      }

      if (status === 429) {
        attempt++;
        if (attempt <= maxRetries) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.warn(`[T&C Clarity] Rate limit 429 encountered. Retrying in ${waitTime}ms (Attempt ${attempt}/${maxRetries})...`);
          await sleep(waitTime);
          continue;
        } else {
          throw new Error(`RATE_LIMIT: Gemini API rate limit exceeded (429). Try switching to local Ollama in Options for unlimited offline analysis.`);
        }
      }

      if (status === 401 || status === 403) {
        throw new Error(`INVALID_API_KEY: Invalid API key (${status}). Please verify your key in Options.`);
      } else {
        throw new Error(`API_ERROR (${status}): ${errText}`);
      }
    }
  }

  // ==========================================
  // LOCAL OLLAMA PROVIDER (100% FREE & OFFLINE)
  // ==========================================

  /**
   * Fetches installed Ollama models from local instance
   */
  async function fetchOllamaModels(baseUrl = DEFAULT_OLLAMA_URL) {
    const cleanUrl = (baseUrl || DEFAULT_OLLAMA_URL).replace(/\/+$/, '');
    try {
      const res = await fetch(`${cleanUrl}/api/tags`);
      if (res.status === 403) {
        throw new Error(`OLLAMA_CORS_ERROR (403): Ollama blocked the extension origin. Please run Ollama with OLLAMA_ORIGINS="*" (e.g., export OLLAMA_ORIGINS="*" && ollama serve).`);
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return (data.models || []).map(m => m.name);
    } catch (err) {
      if (err.message.includes('403')) throw err;
      throw new Error(`OLLAMA_OFFLINE: Could not connect to local Ollama server at ${cleanUrl}. Ensure Ollama is running.`);
    }
  }

  /**
   * Calls local Ollama API endpoint with fallback for format:json and CORS instructions
   */
  async function callOllamaApi({ baseUrl = DEFAULT_OLLAMA_URL, model = DEFAULT_OLLAMA_MODEL, prompt }) {
    const cleanUrl = (baseUrl || DEFAULT_OLLAMA_URL).replace(/\/+$/, '');
    const url = `${cleanUrl}/api/generate`;

    let payload = {
      model: model || DEFAULT_OLLAMA_MODEL,
      prompt: `${SYSTEM_INSTRUCTION}\n\n${prompt}`,
      stream: false,
      format: 'json'
    };

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      throw new Error(`OLLAMA_OFFLINE: Unable to connect to local Ollama at ${cleanUrl}. Check if Ollama service is running.`);
    }

    if (response.status === 403) {
      throw new Error(`OLLAMA_CORS_ERROR (403): Ollama blocked the extension origin. Please launch Ollama with environment variable OLLAMA_ORIGINS="*" (e.g. export OLLAMA_ORIGINS="*" && ollama serve).`);
    }

    // Fallback: If 400 or 500 error occurs with format:json, retry without format parameter
    if (!response.ok) {
      delete payload.format;
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {}
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`OLLAMA_ERROR (${response.status}): ${errText || 'Failed to generate summary from local model ' + model}.`);
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error('OLLAMA_EMPTY: Received empty response from local Ollama model.');
    }

    return data.response;
  }

  /**
   * Validates API credentials or Local Ollama connection
   */
  async function testApiKey(apiKey, model = DEFAULT_GEMINI_MODEL, provider = 'gemini', ollamaUrl = DEFAULT_OLLAMA_URL, ollamaModel = DEFAULT_OLLAMA_MODEL) {
    if (provider === 'ollama') {
      try {
        const models = await fetchOllamaModels(ollamaUrl);
        if (models.length === 0) {
          return { success: false, error: 'Ollama is running but no local models found. Run "ollama run llama3.2" in terminal.' };
        }
        await callOllamaApi({
          baseUrl: ollamaUrl,
          model: ollamaModel || models[0],
          prompt: 'Return JSON: {"status": "ok"}'
        });
        return { success: true, message: `Connected to Ollama! Local model '${ollamaModel || models[0]}' verified.` };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // Default Gemini check
    try {
      await callGeminiApi({
        apiKey,
        model,
        prompt: 'Return exact JSON: {"status": "ok"}'
      });
      return { success: true, message: 'Google Gemini API Key validated successfully!' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Main unified summarization entrypoint
   */
  async function summarize({ provider = 'gemini', text, apiKey, model = DEFAULT_GEMINI_MODEL, ollamaUrl = DEFAULT_OLLAMA_URL, ollamaModel = DEFAULT_OLLAMA_MODEL }) {
    if (!text || text.trim().length < 100) {
      throw new Error('TOO_SHORT: The page content is too short to be a valid Terms & Conditions or Privacy Policy document.');
    }

    const cleanText = text.trim();
    let textToAnalyze = cleanText;

    if (cleanText.length > CHUNK_SIZE) {
      textToAnalyze = await mapReduceSummarizeChunks(cleanText, provider, { apiKey, model, ollamaUrl, ollamaModel });
    }

    const fullPrompt = `${PROMPT_JSON_SCHEMA_INSTRUCTION}\n\n[DOCUMENT TEXT START]\n${textToAnalyze}\n[DOCUMENT TEXT END]`;

    let rawJsonText;
    if (provider === 'ollama') {
      rawJsonText = await callOllamaApi({
        baseUrl: ollamaUrl,
        model: ollamaModel,
        prompt: fullPrompt
      });
    } else {
      rawJsonText = await callGeminiApi({
        apiKey,
        model,
        prompt: fullPrompt
      });
    }

    return parseAndValidateSummaryJson(rawJsonText);
  }

  /**
   * Map-reduce chunking helper supporting both providers
   */
  async function mapReduceSummarizeChunks(fullText, provider, config) {
    const chunks = [];
    let i = 0;
    
    while (i < fullText.length) {
      let end = i + CHUNK_SIZE;
      if (end < fullText.length) {
        const lastBreak = fullText.lastIndexOf('\n\n', end);
        if (lastBreak > i + 10000) {
          end = lastBreak;
        }
      }
      chunks.push(fullText.slice(i, end));
      i = end;
    }

    const intermediateSummaries = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunkPrompt = `Summarize Section ${idx + 1} of ${chunks.length} of a legal document. Extract key clauses, privacy disclosures, liabilities, arbitration rules, and user obligations:\n\n${chunks[idx]}`;
      
      let chunkSummary;
      if (provider === 'ollama') {
        chunkSummary = await callOllamaApi({
          baseUrl: config.ollamaUrl,
          model: config.ollamaModel,
          prompt: chunkPrompt
        });
      } else {
        chunkSummary = await callGeminiApi({
          apiKey: config.apiKey,
          model: config.model,
          prompt: chunkPrompt
        });
      }
      intermediateSummaries.push(`--- SECTION ${idx + 1} SUMMARY ---\n${chunkSummary}`);
    }

    return intermediateSummaries.join('\n\n');
  }

  /**
   * Defensive JSON parser & validator
   */
  function parseAndValidateSummaryJson(rawText) {
    let cleaned = String(rawText || '').trim();
    
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e) {
          throw new Error('PARSE_ERROR: Could not parse response into JSON. Please try again.');
        }
      } else {
        throw new Error('PARSE_ERROR: Response did not contain valid JSON.');
      }
    }

    const validRisks = ['low', 'medium', 'high'];
    const overallRisk = validRisks.includes(String(parsed.overallRisk).toLowerCase()) 
      ? String(parsed.overallRisk).toLowerCase() 
      : 'medium';

    return {
      overallRisk,
      oneLineSummary: parsed.oneLineSummary || 'Summary unavailable.',
      considerPoints: Array.isArray(parsed.considerPoints) ? parsed.considerPoints.map(p => ({
        title: p.title || 'Note',
        detail: p.detail || '',
        category: p.category || 'General'
      })) : [],
      watchOutPoints: Array.isArray(parsed.watchOutPoints) ? parsed.watchOutPoints.map(p => ({
        title: p.title || 'Concern',
        detail: p.detail || '',
        category: p.category || 'General',
        severity: validRisks.includes(String(p.severity).toLowerCase()) ? String(p.severity).toLowerCase() : 'medium'
      })) : [],
      categories: {
        dataCollection: parsed.categories?.dataCollection || 'No specific data collection terms mentioned.',
        dataSharing: parsed.categories?.dataSharing || 'No specific data sharing terms mentioned.',
        userRights: parsed.categories?.userRights || 'No specific user rights mentioned.',
        liability: parsed.categories?.liability || 'No specific liability terms mentioned.',
        cancellationRefunds: parsed.categories?.cancellationRefunds || 'No specific cancellation policies mentioned.',
        disputeResolution: parsed.categories?.disputeResolution || 'No specific dispute resolution clauses mentioned.',
        changesToTerms: parsed.categories?.changesToTerms || 'No specific terms change notice mentioned.'
      }
    };
  }

  return {
    DEFAULT_GEMINI_MODEL,
    DEFAULT_OLLAMA_URL,
    DEFAULT_OLLAMA_MODEL,
    normalizeModelName,
    fetchOllamaModels,
    callGeminiApi,
    callOllamaApi,
    testApiKey,
    summarize,
    parseAndValidateSummaryJson
  };
}));
