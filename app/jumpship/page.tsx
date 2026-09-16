"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { JumpShipLogoHero } from "@/components/jumpship-logo-hero"
import { JumpShipNauticalWaves } from "@/components/jumpship-nautical-decor"
import { useLanguage, LangToggle } from "@/lib/i18n"
import {
  Github,
  Search,
  Brain,
  FileText,
  LayoutDashboard,
  Mic,
  Lock,
  Terminal,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const BG = "#0A0A0A"
const BG2 = "#111111"
const BG3 = "#181818"
const TEXT = "#F0EDE8"
const MUTED = "#888880"
const GOLD = "#F5A623"
const GOLD_LIGHT = "#FFD080"
const GOLD_DIM = "#B8791A"

const cardBase =
  "rounded-[20px] border border-[rgba(245,166,35,0.15)] bg-[#111111] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-[rgba(245,166,35,0.38)] hover:shadow-[0_12px_48px_rgba(245,166,35,0.12)]"

const COPY = {
  pt: {
    portfolio: "Portfolio",
    eyebrow: "Local-first, seus dados sob seu controle",
    h2a: "Busca de vagas",
    h2b: "guiada por IA",
    lead: (
      <>
        Agrega boards e portais de carreira, pontua cada vaga com LLM (local ou nuvem) e gera{" "}
        <span style={{ color: TEXT }}>PDFs de currículo sob medida</span> por posição, com Kanban e fluxo opcional de
        entrevista simulada.
      </>
    ),
    seeCode: "Ver código",
    facts: [
      ["JumpShip 1.0", "Release estável com JobSpy e scrapper dedicado"],
      ["Stack", "FastAPI, React 19, Vite e SQLite"],
      ["LLM", "Ollama (padrão), LM Studio, OpenAI, Anthropic…"],
      ["Privacidade", "Sem conta, chaves opcionais criptografadas"],
    ],
    featTitle: "O que você ganha",
    features: [
      { title: "Busca unificada", body: "JobSpy (LinkedIn, Indeed, Glassdoor, Gupy e similares) mais JumpShip Scrapper: Greenhouse, Lever, Workday e páginas Playwright." },
      { title: "Scoring com LLM", body: "Nota de 0 a 100, gaps honestos e contexto salarial ancorado no seu currículo parseado." },
      { title: "PDFs por vaga", body: "Template HTML orientado a ATS vira PDF de uma página via xhtml2pdf." },
      { title: "Kanban", body: "Colunas Saved, Applied, Interview, Offer e Rejected com drag-and-drop." },
      { title: "Mock interview", body: "Chat stateless com pesquisa de empresa (DuckDuckGo). Estado só no browser." },
    ],
    quickStart: "Quick start",
    quickStartIntro: "No root do repositório (Linux / macOS / Git Bash):",
    quickStartAlt: (
      <>
        Alternativa: copie <code style={{ color: GOLD }}>.env.example</code> para{" "}
        <code style={{ color: GOLD }}>.env</code>, suba backend (uvicorn) e{" "}
        <code style={{ color: GOLD }}>npm run dev</code> no frontend.
      </>
    ),
    why: "Por que existe",
    whyBody: "Filtros automatizados exigem resposta na mesma moeda: encontrar vagas alinhadas, enxergar lacunas e exportar materiais afinados, com opção de rodar tudo localmente (Ollama e LM Studio).",
    readme: "Documentação completa no README",
  },
  en: {
    portfolio: "Portfolio",
    eyebrow: "Local-first, your data under your control",
    h2a: "Job search",
    h2b: "guided by AI",
    lead: (
      <>
        Aggregates job boards and career portals, scores each job with an LLM (local or cloud) and generates{" "}
        <span style={{ color: TEXT }}>tailored résumé PDFs</span> per posting, with a Kanban tracker and an optional
        mock interview flow.
      </>
    ),
    seeCode: "View code",
    facts: [
      ["JumpShip 1.0", "Stable release with JobSpy and a dedicated scrapper"],
      ["Stack", "FastAPI, React 19, Vite and SQLite"],
      ["LLM", "Ollama (default), LM Studio, OpenAI, Anthropic…"],
      ["Privacy", "No account, optional encrypted API keys"],
    ],
    featTitle: "What you get",
    features: [
      { title: "Unified search", body: "JobSpy (LinkedIn, Indeed, Glassdoor, and similar) plus the JumpShip Scrapper: Greenhouse, Lever, Workday and Playwright-driven pages." },
      { title: "LLM scoring", body: "0–100 score, honest gaps and salary context grounded in your parsed résumé." },
      { title: "Per-job PDFs", body: "ATS-oriented HTML template becomes a one-page PDF via xhtml2pdf." },
      { title: "Kanban", body: "Saved, Applied, Interview, Offer and Rejected columns with drag-and-drop." },
      { title: "Mock interview", body: "Stateless chat with company research (DuckDuckGo). State lives only in the browser." },
    ],
    quickStart: "Quick start",
    quickStartIntro: "From the repository root (Linux / macOS / Git Bash):",
    quickStartAlt: (
      <>
        Alternative: copy <code style={{ color: GOLD }}>.env.example</code> to{" "}
        <code style={{ color: GOLD }}>.env</code>, start the backend (uvicorn) and{" "}
        <code style={{ color: GOLD }}>npm run dev</code> on the frontend.
      </>
    ),
    why: "Why it exists",
    whyBody: "Automated filters demand a response in kind: find well-matched roles, see honest gaps, and export tailored materials, with the option to run everything locally (Ollama and LM Studio).",
    readme: "Full documentation in the README",
  },
} as const

export default function JumpShipPage() {
  const reduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#F0EDE8]" style={{ backgroundColor: BG }}>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 70% at 50% -10%, rgba(245,166,35,0.08), transparent 55%), radial-gradient(ellipse 80% 50% at 100% 40%, rgba(184,121,26,0.05), transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,166,35,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, black 20%, transparent 70%)",
        }}
      />

      <main className="relative z-10">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Image
              src="/jumpship-logo.png"
              alt="JumpShip"
              width={280}
              height={84}
              className="h-9 w-auto max-h-10 max-w-[min(220px,62vw)] object-contain object-left"
              unoptimized
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/"
              className="rounded-xl px-4 py-2 text-sm transition-colors hover:bg-[rgba(245,166,35,0.06)]"
              style={{ color: MUTED }}
            >
              {t.portfolio}
            </Link>
            <LangToggle className="px-2 py-2" />
            <a
              href="https://github.com/Awi-24/JumpShip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium ring-1 ring-[rgba(245,166,35,0.35)] transition-all hover:ring-[rgba(245,166,35,0.55)]"
              style={{
                background: "linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.04) 100%)",
                color: GOLD_LIGHT,
              }}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>
        </header>

        <JumpShipLogoHero />

        <section className="relative mx-auto max-w-6xl px-4 pb-16 md:pb-24">
          <div className="relative z-[1] grid gap-10 md:grid-cols-12 md:items-start md:gap-8 lg:gap-12">
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 flex items-center gap-2" style={{ color: MUTED }}>
                <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: GOLD }} />
                <p className="text-xs font-medium">{t.eyebrow}</p>
              </div>
              <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl" style={{ color: TEXT }}>
                {t.h2a}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(105deg, ${GOLD_LIGHT} 0%, ${GOLD} 45%, ${GOLD_DIM} 100%)`,
                  }}
                >
                  {t.h2b}
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: MUTED }}>
                {t.lead}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://github.com/Awi-24/JumpShip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: GOLD,
                    color: BG,
                    boxShadow: "0 8px 32px rgba(245,166,35,0.25)",
                  }}
                >
                  {t.seeCode}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative md:col-span-6 md:self-start"
              initial={{ opacity: 0, scale: 0.98, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={`${cardBase} relative overflow-hidden p-8 md:p-10`}
                style={{
                  boxShadow: "0 0 0 1px rgba(245,166,35,0.08), inset 0 1px 0 0 rgba(255,255,255,0.06)",
                  background: `linear-gradient(135deg, rgba(245,166,35,0.06) 0%, rgba(245,166,35,0.02) 100%), ${BG2}`,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        rotate: [0, 0.45, -0.45, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                }
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                  style={{ background: `rgba(245,166,35,0.15)` }}
                />
                <div
                  className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: `rgba(184,121,26,0.12)` }}
                />
                <dl className="relative grid gap-4 sm:grid-cols-2">
                  {t.facts.map(([k, v], i) => (
                    <motion.div
                      key={k as string}
                      className="rounded-2xl bg-[#181818] p-4 ring-1 ring-white/[0.08]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -2, boxShadow: "0 8px 24px rgba(245,166,35,0.12)" }
                      }
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-snug" style={{ color: MUTED }}>
                        {v}
                      </dd>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24">
          <motion.h3
            className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.45em]"
            style={{ color: MUTED }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t.featTitle}
          </motion.h3>
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {[
              { icon: Search, span: "md:col-span-7" },
              { icon: Brain, span: "md:col-span-5" },
              { icon: FileText, span: "md:col-span-4" },
              { icon: LayoutDashboard, span: "md:col-span-4" },
              { icon: Mic, span: "md:col-span-4" },
            ].map((item, i) => (
              <motion.div
                key={t.features[i].title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={`${cardBase} ${item.span} flex flex-col`}
              >
                <item.icon className="mb-4 h-8 w-8" style={{ color: GOLD }} />
                <h4 className="text-lg font-semibold" style={{ color: TEXT }}>
                  {t.features[i].title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {t.features[i].body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          className="border-t px-4 py-20 backdrop-blur-sm"
          style={{ borderColor: "rgba(245,166,35,0.12)", backgroundColor: "rgba(17,17,17,0.85)" }}
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cardBase}
            >
              <div className="mb-4 flex items-center gap-2" style={{ color: GOLD_LIGHT }}>
                <Terminal className="h-5 w-5" style={{ color: GOLD }} />
                <span className="text-xs font-bold uppercase tracking-widest">{t.quickStart}</span>
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                {t.quickStartIntro}
              </p>
              <pre
                className="mt-4 overflow-x-auto rounded-2xl border p-4 font-mono text-xs leading-relaxed md:text-sm"
                style={{
                  borderColor: "rgba(245,166,35,0.2)",
                  backgroundColor: BG3,
                  color: TEXT,
                }}
              >
                {`bash ./start.sh
# API: http://localhost:8000
# UI: http://localhost:5173`}
              </pre>
              <p className="mt-4 text-xs" style={{ color: MUTED }}>
                {t.quickStartAlt}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(74,222,128,0.08)] ring-1 ring-[rgba(74,222,128,0.2)]">
                  <Lock className="h-5 w-5 text-[#4ade80]" />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: TEXT }}>
                    {t.why}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {t.whyBody}
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/Awi-24/JumpShip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-110"
                style={{ color: GOLD }}
              >
                {t.readme}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <footer className="relative z-10 mt-8 w-full md:mt-12">
          <div className="relative min-h-28 w-full pb-6 md:min-h-32">
            <JumpShipNauticalWaves />
          </div>
        </footer>
      </main>
    </div>
  )
}
