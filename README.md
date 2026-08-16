# T&C Clarity — Privacy-First Terms & Privacy Policy Summarizer (Manifest V3)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-00f2fe.svg)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Jeethula%2Ftandc-181717.svg?logo=github)](https://github.com/Jeethula/tandc)

**T&C Clarity** is a privacy-first, BYOK (Bring Your Own Key) Chrome Extension that automatically detects Terms of Service, Privacy Policies, and EULAs, summarizing them using Google Gemini API or Local LLMs (Ollama) directly from your browser.

🌐 **GitHub Repository**: [https://github.com/Jeethula/tandc](https://github.com/Jeethula/tandc)

---

## 🌟 Key Features

- **Auto-Detection**: Heuristically detects legal agreement pages via URL patterns, page headers, and phrase density scoring. Displays a tab action badge (`T&C`) without interrupting your browsing.
- **SPA Support**: Monitors single-page application (SPA) route changes to evaluate client-rendered ToS pages dynamically.
- **Instant Popup Summary**: Highlights overall risk rating (Low / Medium / High), a plain-English 1-line summary, top "Watch Out" concerns, and key points to consider.
- **Chrome Side Panel**: Integrates natively with the Chrome Side Panel API (`chrome.sidePanel`) to display full expandable/collapsible category deep-dives across 7 legal domains.
- **Map-Reduce for Long Documents**: Automatically chunks documents exceeding ~30,000 characters and runs multi-stage summarization for accurate analysis.
- **BYOK & Local LLM Support**: Connect your own Google Gemini 2.0 Flash / Pro key or run 100% offline via local Ollama models (`localhost:11434`).
- **Export & Copy**: Copy formatted summaries or download text reports with a single click.
- **100% Private & Serverless**: Runs entirely client-side. Your Gemini API key is stored locally in `chrome.storage.local`. Zero third-party backend servers or analytics.

---

## 🚀 Installation Guide (Load Unpacked)

To test and run **T&C Clarity** locally in Google Chrome, Brave, Edge, or Arc:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jeethula/tandc.git
   ```

2. **Open Chrome Extensions Manager**:
   Navigate to `chrome://extensions` in your Chrome browser address bar.

3. **Enable Developer Mode**:
   Toggle the **Developer mode** switch in the top-right corner of the page.

4. **Load the Extension**:
   - Click the **Load unpacked** button in the top-left corner.
   - Select this folder (`tandc`).

5. **Pin the Extension**:
   Click the puzzle piece icon in Chrome's toolbar and pin **T&C Clarity** for easy access.

---

## 🔑 Setup & Configuration

1. Get a free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Right-click the **T&C Clarity** extension icon and select **Options** (or click "Set API Key" in the popup banner).
3. Paste your Gemini API key, select your preferred model (default: `gemini-2.0-flash`), and click **Test API Key**.
4. Click **Save Settings**.

---

## 💻 Interactive Landing Page

An interactive 3D landing page with a live T&C scanner playground is available in the [`landing-page/`](landing-page/) directory:

```bash
cd landing-page
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
```

---

## 🏗️ Project Architecture

```
├── manifest.json            # Manifest V3 specification
├── background.js            # Background service worker (badges, sidepanel management)
├── content-script.js        # DOM observer, legal page detector & text extractor
├── lib/
│   ├── detect.js            # URL, heading, and keyword density heuristics
│   ├── extract.js           # Readability and noise-stripping DOM parser
│   └── gemini.js            # Gemini REST client & Map-Reduce chunking pipeline
├── popup/                   # Extension popup view & controller
├── sidepanel/               # Chrome Side Panel 7-domain audit view
├── options/                 # Extension settings, API key management & test connection
├── icons/                   # Extension icon assets
└── landing-page/            # Vite + React landing page with 3D UI and live playground
```

---

## 🔒 Security & Privacy

- **Local Key Storage**: API keys are stored exclusively in `chrome.storage.local`.
- **Direct API Connection**: API calls are routed directly from your browser to Google's official Gemini endpoint (`https://generativelanguage.googleapis.com`) or your local model.
- **No Third-Party Analytics**: Zero logging, tracking, or remote intermediary servers.

For security reports, please consult our [Security Policy](SECURITY.md).

---

## 🤝 Community & Contributing

Contributions are welcome! Please review:
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

---

## 👨‍💻 Maintainer & Contact

- **Author**: Jeethu
- **GitHub**: [@Jeethula](https://github.com/Jeethula)
- **LinkedIn**: [https://www.linkedin.com/in/jeethula/](https://www.linkedin.com/in/jeethula/)
- **Email**: [jeeththenthar@gmail.com](mailto:jeeththenthar@gmail.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
