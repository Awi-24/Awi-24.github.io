"use client"

import Link from "next/link"
import Image from "next/image"
import { IBM_Plex_Mono } from "next/font/google"
import { motion } from "framer-motion"
import { useLanguage, LangToggle } from "@/lib/i18n"
import {
  Github,
  FileEdit,
  Palette,
  Workflow,
  FileDown,
  FolderOpen,
  ArrowRight,
  Terminal,
} from "lucide-react"

// Copiado do tema "Retro EZ" real do app (src/themes/skins.css, [data-theme="retro"]):
// fundo branco, tinta preta, borda preta de 2px, sombra dura sem blur (3px 3px 0 #000),
// tipografia de sistema pro corpo e IBM Plex Mono pros dados — nada de acento colorido, é
// preto e branco puro mesmo, igual o app. A marca "EZ" é o logo.png real do repositório.
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] })

const PAPER = "#ffffff"
const PANEL = "#f4f4f4"
const INK = "#0a0a0a"
const MUTED = "#6e6e6e"

const cardBase = "border-2 p-6"
const hardShadow = "3px 3px 0 #000"

const COPY = {
  pt: {
    portfolio: "Portfólio",
    eyebrow: "v1.0.3 · Windows · macOS · Linux",
    h1: "Markdown que já abre formatado. Sem sintaxe crua.",
    lead: "Editor e leitor WYSIWYG para arquivos .md — estilo Typora: você escreve direto no texto renderizado, não numa coluna de código ao lado. Leve, open source, com onze temas (incluindo o Retro EZ desta própria página).",
    download: "Baixar instalador",
    viewSource: "Ver código-fonte",
    inside: "── O que tem dentro",
    features: [
      { title: "Edição WYSIWYG", body: "Milkdown/Crepe sobre ProseMirror — barra de seleção ao marcar texto, menu \"/\" para inserir blocos, tabelas, código com syntax highlight e diagramas Mermaid." },
      { title: "Onze temas", body: "Retro EZ (padrão), Notebook, GitHub, VS Code Light/Dark, Solarized, Dracula, Nord, Cyberpunk, Pink, Pixel e Nandão." },
      { title: "Abas e pastas", body: "Múltiplas abas com indicador de alteração não salva, e um navegador de pasta flutuante com breadcrumb e atalho magnético de borda." },
      { title: "Modo leitura", body: "Visualização somente leitura, sem os controles de edição — inclusive com checkbox de lista de tarefas clicável." },
      { title: "Exportar em PDF", body: "Pelo menu Arquivo ou pelo menu de contexto, aguardando os diagramas Mermaid terminarem de renderizar." },
      { title: "Associação de arquivo", body: "Registra .md/.markdown no sistema — abre com duplo clique, e atualiza em segundo plano (Windows e Linux)." },
    ],
    runSource: "Rodar do código-fonte",
    runIntro: "Requer Node.js, Rust e os pré-requisitos do Tauri para o seu sistema:",
    stack: "Stack: Tauri 2 (Rust) · Milkdown + Crepe · Vite + TypeScript. Builds assinados para Windows/Linux/macOS via GitHub Actions.",
    why: "Por que existe",
    whyBody: "A maioria dos editores Markdown mostra a sintaxe crua ao lado do preview, ou força um painel dividido. ez.down trata o arquivo .md como um documento — você edita o texto formatado diretamente, do jeito que já vê no README de um repositório.",
    readme: "Documentação completa no README",
  },
  en: {
    portfolio: "Portfolio",
    eyebrow: "v1.0.3 · Windows · macOS · Linux",
    h1: "Markdown that opens already formatted. No raw syntax.",
    lead: "WYSIWYG editor and reader for .md files — Typora-style: you write directly in the rendered text, not in a code column next to it. Lightweight, open source, with eleven themes (including this page's own Retro EZ).",
    download: "Download installer",
    viewSource: "View source",
    inside: "── What's inside",
    features: [
      { title: "WYSIWYG editing", body: "Milkdown/Crepe on ProseMirror — a selection toolbar when you highlight text, a \"/\" menu to insert blocks, tables, syntax-highlighted code and Mermaid diagrams." },
      { title: "Eleven themes", body: "Retro EZ (default), Notebook, GitHub, VS Code Light/Dark, Solarized, Dracula, Nord, Cyberpunk, Pink, Pixel and Nandão." },
      { title: "Tabs and folders", body: "Multiple tabs with an unsaved-change indicator, and a floating folder browser with breadcrumbs and edge snap." },
      { title: "Reader mode", body: "View-only mode, no editing controls — including clickable task-list checkboxes." },
      { title: "Export to PDF", body: "From the File menu or the context menu, waiting for Mermaid diagrams to finish rendering." },
      { title: "File association", body: "Registers .md/.markdown on the system — opens on double-click, and updates in the background (Windows and Linux)." },
    ],
    runSource: "Run from source",
    runIntro: "Requires Node.js, Rust and the Tauri prerequisites for your system:",
    stack: "Stack: Tauri 2 (Rust) · Milkdown + Crepe · Vite + TypeScript. Signed builds for Windows/Linux/macOS via GitHub Actions.",
    why: "Why it exists",
    whyBody: "Most Markdown editors show raw syntax next to the preview, or force a split pane. ez.down treats the .md file as a document — you edit the formatted text directly, the way you already see a repository's README.",
    readme: "Full documentation in the README",
  },
} as const

export default function EzDownPage() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <div
      className={`${mono.variable} relative min-h-screen overflow-x-hidden`}
      style={{ backgroundColor: PAPER, color: INK, fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <main className="relative z-10">
        <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-b-2 px-4 py-6" style={{ borderColor: INK }}>
          <Link href="/ez-down" className="flex items-center gap-2.5">
            <Image src="/ezdown-logo.png" alt="ez.down" width={30} height={30} className="rounded-full" />
            <span className="text-lg font-bold tracking-tight">ez.down</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="px-3 py-2 transition-colors hover:underline" style={{ color: MUTED }}>
              {t.portfolio}
            </Link>
            <LangToggle className="px-2 py-2" />
            <a
              href="https://github.com/Awi-24/ez.down"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 px-4 py-2 font-bold transition-colors hover:bg-black hover:text-white"
              style={{ borderColor: INK }}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-block border-2 px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: INK, boxShadow: hardShadow }}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-2xl text-4xl font-bold leading-[1.1] md:text-6xl"
          >
            {t.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: MUTED }}
          >
            {t.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/Awi-24/ez.down/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: INK, boxShadow: hardShadow }}
            >
              {t.download}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/Awi-24/ez.down"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-black hover:text-white"
              style={{ borderColor: INK }}
            >
              {t.viewSource}
            </a>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24">
          <h2 className="mb-8 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.35em]" style={{ color: MUTED }}>
            {t.inside}
          </h2>
          <div className="grid gap-0 border-2 md:grid-cols-2" style={{ borderColor: INK }}>
            {[FileEdit, Palette, FolderOpen, Workflow, FileDown, Terminal].map((Icon, i) => (
              <motion.div
                key={t.features[i].title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className={cardBase}
                style={{ borderColor: INK, backgroundColor: i % 2 === 0 ? PAPER : PANEL }}
              >
                <Icon className="mb-3 h-6 w-6" />
                <h3 className="font-bold">{t.features[i].title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {t.features[i].body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t-2 px-4 py-16" style={{ borderColor: INK, backgroundColor: PANEL }}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className={cardBase} style={{ borderColor: INK, backgroundColor: PAPER, boxShadow: hardShadow }}>
              <div className="mb-4 flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest">
                <Terminal className="h-4 w-4" />
                {t.runSource}
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                {t.runIntro}
              </p>
              <pre
                className="mt-4 overflow-x-auto border-2 p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed md:text-sm"
                style={{ borderColor: INK, backgroundColor: PANEL }}
              >
                {`npm install
npm run tauri dev`}
              </pre>
              <p className="mt-4 text-xs" style={{ color: MUTED }}>
                {t.stack}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t.why}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                {t.whyBody}
              </p>
              <a
                href="https://github.com/Awi-24/ez.down"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:underline"
              >
                {t.readme}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
