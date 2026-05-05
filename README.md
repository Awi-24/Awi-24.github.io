# Adrian Widmer | Software & Data Engineer Portfolio

A hybrid dual-themed portfolio featuring both a 90s retro-internet aesthetic and a modern cyberpunk interface.

## 🚀 Overview

This portfolio showcases my professional journey as a Software and Data Engineer at Ford Motor Company and my personal research into Agentic AI architectures.

### Key Features:
- **Dual Experience:** Toggle between a nostalgic **Windows 95/Retro** interface and a high-performance **Cyberpunk/Modern** UI.
- **Agentic AI Focus:** Detailed insights into the **HiveMind Protocol**, a proprietary orchestration framework.
- **Enterprise Experience:** Case studies on production-grade ML systems (Warranty Anomaly Detection) and RAG implementations for industrial engineering.
- **Expertise Tracking:** Visual progress mapping from Intern to Mid-level status.

## 🛠️ Technical Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Styling:** Tailwind CSS / Vanilla CSS / Framer Motion
- **Language:** TypeScript
- **AI Integration:** LangGraph, OpenAI, Anthropic, Ollama
- **Deployment:** GitHub Actions + GitHub Pages

## 🌐 GitHub Pages (publish)

The site is a [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) (`output: 'export'` → `out/`). `public/.nojekyll` disables Jekyll so assets under `_next/` are served.

1. In the repo: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push to `main` or run the **Deploy to GitHub Pages** workflow manually (**Actions → … → Run workflow**).
3. For this **`<user>.github.io`** repository, the live URL is `https://awi-24.github.io/` (no `basePath`). If you ever use a project site at `https://awi-24.github.io/<repo>/`, set `basePath: '/<repo>'` and `assetPrefix: '/<repo>'` in `next.config.mjs`.

Local check: `npm run build` then open `out/index.html` via a static server if you want to verify the export.

## 📂 Project Highlights

### HiveMind Protocol
A multi-level agentic orchestration framework designed for complex workflow automation and autonomous task delegation.

### WARRANTY_ANOMALY_DETECT.ai
An end-to-end ML pipeline deployed on Google Vertex AI using Keras Autoencoders to identify financial inconsistencies and fraud in warranty costs.

### FASTENER_HUNTER.ai
A 2-layer RAG system that optimized technical parts searches from 16 hours to under 5 minutes, serving 50+ engineers weekly.

## 🔧 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Awi-24/Awi-24.github.io.git
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`.

## 📄 License

This project is personal intellectual property. Feel free to explore the code for inspiration.

---
*Built with precision and passion by Adrian Widmer.*
