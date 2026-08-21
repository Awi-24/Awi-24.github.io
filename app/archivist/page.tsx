"use client"

import Link from "next/link"
import Image from "next/image"
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google"
import { motion } from "framer-motion"
import { useLanguage, LangToggle } from "@/lib/i18n"
import {
  Github,
  Search,
  ListChecks,
  FileSearch,
  ScrollText,
  ShieldCheck,
  Terminal,
  ArrowRight,
} from "lucide-react"

// Paleta e tipografia copiadas do próprio app (src/styles/skins.css + src/index.css do
// repositório): tema escuro zinc/neutro, Source Serif 4 pro display, IBM Plex Mono pro resto —
// e a sombra "brutal" de 2px offset que o app usa em cards/painéis. O corvo com a pena é o
// favicon real do Archivist (raven = guardião de arquivo; pena = escrita acadêmica).
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", weight: ["500", "600", "700"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] })

const BG = "#0a0a0a"
const CARD = "#171717"
const FG = "#fafafa"
const MUTED = "#a3a3a3"
const BORDER = "#404040"
const SHADOW = "#525252"

const cardBase = "border p-6"

const COPY = {
  pt: {
    portfolio: "Portfólio",
    eyebrow: "Alpha v0.1.0 · revisão sistemática · PRISMA-ScR",
    h1: "Revisão bibliográfica guiada por um agente de IA, do protocolo ao relatório PRISMA.",
    lead: "Aplicação desktop para revisões sistemáticas no método PRISMA-ScR: busca em bases acadêmicas, triagem estruturada por título/resumo/texto completo, PDFs de acesso aberto e geração do relatório final — tudo conduzido em chat, rodando com LLMs locais (Ollama).",
    download: "Baixar (Windows / macOS / Linux)",
    viewSource: "Ver código-fonte",
    pipelineTitle: "O pipeline, guiado em chat",
    features: [
      { title: "Busca em bases acadêmicas", body: "OpenAlex, PubMed, Crossref, IEEE e mais — com filtro determinístico por ano e critérios de inclusão." },
      { title: "Triagem estruturada", body: "Screening por título, resumo e texto completo (RAG), com funil PRISMA visível a cada etapa." },
      { title: "PDFs de acesso aberto", body: "Busca automática em fontes oficiais (Open Access, arXiv, Unpaywall) antes de pedir download manual." },
      { title: "Relatório PRISMA", body: "Markdown com diagrama Mermaid do funil, pronto para anexar à revisão." },
      { title: "Local-first", body: "Chat e triagem rodam com Ollama; embeddings via LM Studio. Seus dados não saem da máquina." },
      { title: "Revisão em par", body: "Painel de pair review para reconciliar decisão da IA e do humano quando divergem." },
    ],
    runSource: "Rodar do código-fonte",
    runIntro: "Requer Node.js, Rust e (opcional para testes locais) Ollama + LM Studio:",
    stack: "Stack: Tauri 2 (Rust) · React 19 + TypeScript + Zustand · sqlx/SQLite · Ollama para chat, LM Studio (API compatível OpenAI) para embeddings.",
    why: "Por que existe",
    whyBody: "Uma revisão PRISMA é um trabalho de meses feito à mão: buscar, triar centenas de registros, buscar PDF por PDF, documentar tudo. Archivist conduz esse processo em chat, mantendo cada decisão auditável — e sem enviar os artigos para um servidor de terceiros.",
    readme: "Documentação completa no README",
  },
  en: {
    portfolio: "Portfolio",
    eyebrow: "Alpha v0.1.0 · systematic review · PRISMA-ScR",
    h1: "Systematic literature review guided by an AI agent, from protocol to PRISMA report.",
    lead: "Desktop app for PRISMA-ScR systematic reviews: search across academic databases, structured screening by title/abstract/full text, open-access PDFs and final report generation — all guided in chat, running on local LLMs (Ollama).",
    download: "Download (Windows / macOS / Linux)",
    viewSource: "View source",
    pipelineTitle: "The pipeline, guided in chat",
    features: [
      { title: "Academic database search", body: "OpenAlex, PubMed, Crossref, IEEE and more — with deterministic filtering by year and inclusion criteria." },
      { title: "Structured screening", body: "Title, abstract and full-text screening (RAG), with a PRISMA funnel visible at every stage." },
      { title: "Open-access PDFs", body: "Automatic search across official sources (Open Access, arXiv, Unpaywall) before asking for a manual download." },
      { title: "PRISMA report", body: "Markdown with a Mermaid funnel diagram, ready to attach to the review." },
      { title: "Local-first", body: "Chat and screening run on Ollama; embeddings via LM Studio. Your data never leaves the machine." },
      { title: "Pair review", body: "Pair-review panel to reconcile AI vs. human screening decisions when they diverge." },
    ],
    runSource: "Run from source",
    runIntro: "Requires Node.js, Rust and (optional, for local testing) Ollama + LM Studio:",
    stack: "Stack: Tauri 2 (Rust) · React 19 + TypeScript + Zustand · sqlx/SQLite · Ollama for chat, LM Studio (OpenAI-compatible API) for embeddings.",
    why: "Why it exists",
    whyBody: "A PRISMA review is months of manual work: searching, screening hundreds of records, fetching PDFs one by one, documenting everything. Archivist runs that process in chat, keeping every decision auditable — and never sending papers to a third-party server.",
    readme: "Full documentation in the README",
  },
} as const

export default function ArchivistPage() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <div
      className={`${serif.variable} ${mono.variable} relative min-h-screen overflow-x-hidden`}
      style={{ backgroundColor: BG, color: FG, fontFamily: "var(--font-mono)" }}
    >
      <main className="relative z-10">
        <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8">
          <Link href="/archivist" className="flex items-center gap-2.5">
            <Image src="/archivist-raven.png" alt="" width={28} height={28} className="invert" />
            <span className="font-[family-name:var(--font-serif)] text-lg font-semibold">Archivist</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="px-3 py-2 text-sm transition-colors hover:text-white" style={{ color: MUTED }}>
              {t.portfolio}
            </Link>
            <LangToggle className="px-2 py-2 text-[#a3a3a3]" />
            <a
              href="https://github.com/Awi-24/archivist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-2 text-sm transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: BORDER }}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 pb-16 pt-4 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs uppercase tracking-[0.25em]"
            style={{ color: MUTED }}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-3xl font-[family-name:var(--font-serif)] text-4xl font-semibold leading-[1.12] md:text-6xl"
          >
            {t.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed"
            style={{ color: MUTED }}
          >
            {t.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/Awi-24/archivist/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: FG }}
            >
              {t.download}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/Awi-24/archivist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-6 py-3.5 text-sm transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: BORDER }}
            >
              {t.viewSource}
            </a>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24">
          <h2 className="mb-8 text-xs uppercase tracking-[0.3em]" style={{ color: MUTED }}>
            {t.pipelineTitle}
          </h2>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: BORDER }}>
            {[Search, ListChecks, FileSearch, ScrollText, ShieldCheck, Terminal].map((Icon, i) => (
              <motion.div
                key={t.features[i].title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className={cardBase}
                style={{ backgroundColor: CARD, borderColor: BORDER }}
              >
                <Icon className="mb-4 h-5 w-5" style={{ color: MUTED }} />
                <h3 className="font-[family-name:var(--font-serif)] text-base font-semibold">{t.features[i].title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {t.features[i].body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t px-4 py-20" style={{ borderColor: BORDER }}>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className={cardBase} style={{ backgroundColor: CARD, borderColor: BORDER, boxShadow: `2px 2px 0 ${SHADOW}` }}>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: MUTED }}>
                <Terminal className="h-4 w-4" />
                {t.runSource}
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                {t.runIntro}
              </p>
              <pre
                className="mt-4 overflow-x-auto border p-4 text-xs leading-relaxed md:text-sm"
                style={{ borderColor: BORDER, backgroundColor: BG }}
              >
                {`npm install
npm run tauri dev`}
              </pre>
              <p className="mt-4 text-xs" style={{ color: MUTED }}>
                {t.stack}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold">{t.why}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {t.whyBody}
                </p>
              </div>
              <a
                href="https://github.com/Awi-24/archivist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                style={{ color: MUTED }}
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
