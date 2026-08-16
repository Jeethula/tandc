# T&C Clarity — Terms & Privacy Policy Summarizer (Manifest V3)

**T&C Clarity** is a privacy-first, BYOK (Bring Your Own Key) Chrome Extension that automatically detects Terms of Service, Privacy Policies, and EULAs, summarizing them using Google Gemini API directly from your browser.

---

## 🌟 Key Features

- **Auto-Detection**: Heuristically detects legal agreement pages via URL patterns, page headers, and phrase density scoring. Displays a tab action badge (`T&C`) without interrupting your browsing.
- **SPA Support**: Monitors single-page application (SPA) route changes to evaluate client-rendered ToS pages dynamically.
- **Instant Popup Summary**: Highlights overall risk rating (Low / Medium / High), a plain-English 1-line summary, top "Watch Out" concerns, and key points to consider.
- **Chrome Side Panel**: Integrates natively with the Chrome Side Panel API (`chrome.sidePanel`) to display full expandable/collapsible category deep-dives across 7 legal domains.
- **Map-Reduce for Long Documents**: Automatically chunks documents exceeding ~30,000 characters and runs multi-stage summarization for accurate analysis.
- **Export & Copy**: Copy formatted summaries or download text reports with a single click.
- **100% Private & Serverless**: Runs entirely client-side. Your Gemini API key is stored locally in `chrome.storage.local`. Zero third-party backend servers or analytics.

---

## 🚀 Installation Guide (Load Unpacked)

To test and run **T&C Clarity** locally in Google Chrome:

1. **Open Chrome Extensions Manager**:
   Navigate to `chrome://extensions` in your Chrome browser address bar.

2. **Enable Developer Mode**:
   Toggle the **Developer mode** switch in the top-right corner of the page.

3. **Load the Extension**:
   - Click the **Load unpacked** button in the top-left corner.
   - Select the folder containing this extension (`/Users/jeethu/Desktop/t&c-addin`).

4. **Pin the Extension**:
   Click the puzzle piece icon in Chrome's toolbar and pin **T&C Clarity** for easy access.

---

## 🔑 Setup & Configuration

1. Get a free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Right-click the **T&C Clarity** extension icon and select **Options** (or click "Set API Key" in the popup banner).
3. Paste your Gemini API key, select your preferred model (default: `gemini-2.0-flash`), and click **Test API Key**.
4. Click **Save Settings**.

---

## 🏗️ Project Architecture

```
/manifest.json                Manifest V3 specification
/background.js               Service worker managing action badges & side panel triggers
/content-script.js           Page load listener, SPA observer & extraction responder
/lib/
  ├── detect.js              T&C detection heuristics (URL, Title, Heading, Keyword Density)
  ├── extract.js             Readability text extractor (main/article prioritization, noise stripping)
  └── gemini.js              Google Gemini REST API client, prompt template & map-reduce engine
/popup/
  ├── popup.html             Extension popup view
  ├── popup.js               Popup controller & cache lookup
  └── popup.css              Popup styling
/sidepanel/
  ├── sidepanel.html         Chrome Side Panel view
  ├── sidepanel.js           Side Panel controller, live sync & export features
  └── sidepanel.css          Side Panel styling
/options/
  ├── options.html           Extension settings view
  ├── options.js             Options controller & key validator
  └── options.css            Options styling
/icons/
  ├── generate-icons.js      Icon generator script
  ├── icon-16.png
  ├── icon-32.png
  ├── icon-48.png
  └── icon-128.png
```

---

## 🔒 Security & Privacy

- **Local Key Storage**: API keys are stored exclusively in `chrome.storage.local`.
- **Direct API Connection**: API calls are routed directly from your browser to Google's official Gemini endpoint (`https://generativelanguage.googleapis.com`).
- **No Third-Party Analytics**: Zero logging, tracking, or remote servers.

---

## 📄 License
MIT License. Free for open-source use and modification.
