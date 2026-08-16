# Contributing to T&C Clarity

First off, thank you for considering contributing to **T&C Clarity**! 🎉 We welcome contributions of all kinds: bug reports, feature suggestions, documentation enhancements, UI improvements, and code pull requests.

---

## 🌟 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- **Google Chrome**, **Brave**, **Edge**, or any Chromium-based browser (v114+ recommended for Side Panel API).
- **Node.js** (v18 or higher) & **npm** (for building the landing page and running development utilities).
- A free **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey) or a local [Ollama](https://ollama.com) instance.

### 2. Fork and Clone
```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/Jeethula/tandc.git
cd tandc
```

### 3. Load Extension in Chrome
1. Open `chrome://extensions` in your Chrome address bar.
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select this root project directory (`tandc` or `t&c-addin`).
5. Pin **T&C Clarity** to your Chrome toolbar.

### 4. Running the Landing Page
```bash
cd landing-page
npm install
npm run dev      # Starts Vite dev server at http://localhost:5173
npm run build    # Validates production build
```

---

## 🏗️ Repository Architecture

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

## 🛠️ Contribution Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/issue-description
```

### 2. Making Changes
- Maintain pure client-side privacy. **Never introduce external tracking, third-party analytics, or middleman servers.**
- Follow clean vanilla JavaScript practices for extension code and standard React/Tailwind conventions for the landing page.
- Test your changes thoroughly against live Terms of Service and Privacy Policy pages.

### 3. Commit Your Changes
We adhere to conventional commits:
- `feat: add local Ollama model auto-detection`
- `fix: handle edge case in SPA mutation observer`
- `docs: update setup steps in README`
- `style: refine cyber blue glowing borders in sidepanel`

```bash
git add .
git commit -m "feat: description of your change"
```

### 4. Submit a Pull Request
1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request against the `main` branch on [https://github.com/Jeethula/tandc](https://github.com/Jeethula/tandc).
3. Fill out the PR template completely with details of what was changed and how you tested it.

---

## 🐛 Reporting Bugs

When reporting a bug via [GitHub Issues](https://github.com/Jeethula/tandc/issues):
- Include a descriptive title and steps to reproduce.
- Note the browser version and OS.
- If applicable, include the URL of the Terms of Service page where the issue occurred.
- Do NOT share your private API keys in logs or screenshots!

---

## 💡 Proposing New Features

Have an idea to make T&C Clarity even better?
- Open an issue titled `Feature: <your idea>`.
- Describe the problem it solves and your proposed solution.
- Discuss with maintainers before opening a large PR.

---

## 👨‍💻 Maintainer & Contact

- **Lead Maintainer**: Jeethu
- **LinkedIn**: [https://www.linkedin.com/in/jeethula/](https://www.linkedin.com/in/jeethula/)
- **Email**: [jeeththenthar@gmail.com](mailto:jeeththenthar@gmail.com)
- **GitHub**: [@Jeethula](https://github.com/Jeethula)

Thank you for helping keep the web transparent, safe, and privacy-first! 🛡️
