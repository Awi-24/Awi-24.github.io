"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Copy, Check } from "lucide-react"
import { hivemindCliTheme as t, HIVEMIND_CLI_VERSION } from "@/lib/hivemind-cli-theme"

const installCmd = "npm install -g @awi-24/hivemind-cli"

export default function HivemindCliPage() {
  const [copied, setCopied] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  useEffect(() => {
    const c = window.setInterval(() => setCursorOn((v) => !v), 530)
    return () => window.clearInterval(c)
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const d = t.glyph.dot
  const scan = t.glyph.blockLight.repeat(52)
  const sessionLeft = `SESSION: 00:00:00 TOKENS: 0`
  /* Idle state matches PersistentTopBar (etaState === "idle"). */
  const sessionRight = `ETA: — AGENTS: [ ] 1 THREAD`

  return (
    <div
      className="relative h-svh max-h-svh overflow-hidden selection:bg-[#FF2DFF] selection:text-[#0A0A1A]"
      style={{
        background: `linear-gradient(180deg, ${t.scanline}22 0%, transparent 12%), #0A0A12`,
        color: t.text,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.14]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,240,255,0.04) 1px, rgba(0,240,255,0.04) 2px)",
        }}
        aria-hidden
      />

      <main className="relative z-10 flex h-full min-h-0 w-full items-center justify-center px-3 py-4 sm:px-4 sm:py-6">
        <div className="hide-scrollbar flex max-h-full w-full max-w-3xl flex-col overflow-y-auto overscroll-none">
        {/* PersistentTopBar-style */}
        <div
          className="mb-0 flex flex-shrink-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b px-0 py-2 text-[10px] sm:text-[11px]"
          style={{ borderColor: `${t.primary}33`, color: t.textMuted }}
        >
          <span className="tracking-wide">{sessionLeft}</span>
          <span className="tracking-wide" style={{ color: t.primary }}>
            {sessionRight}
          </span>
        </div>

        {/* CliChrome-style */}
        <div
          className="flex flex-shrink-0 flex-wrap items-center gap-x-1 gap-y-0.5 border-b px-0 py-1.5 text-[9px] uppercase tracking-wide sm:text-[10px]"
          style={{ borderColor: t.panelBorderMuted, color: t.textDim }}
        >
          <span style={{ color: t.accent }}>WS</span>
          <span style={{ color: t.textMuted }}>
            {t.glyph.vertical} Awi-24.github.io {t.glyph.vertical}
          </span>
          <span style={{ color: t.accent }}>API</span>
          <span style={{ color: t.textMuted }}>127.0.0.1:11434 {t.glyph.vertical}</span>
          <span style={{ color: t.accent }}>MEM</span>
          <span style={{ color: t.ok }}> ON </span>
          <span style={{ color: t.textMuted }}>{t.glyph.vertical}</span>
          <span style={{ color: t.accent }}>FW</span>
          <span style={{ color: t.textMuted }}> local {t.glyph.vertical}</span>
          <span style={{ color: t.accent }}>CLI</span>
          <span style={{ color: t.highlight }}> v{HIVEMIND_CLI_VERSION} </span>
          <span style={{ color: t.textMuted }}>
            {t.glyph.vertical} Esc abort {d} /help
          </span>
        </div>

        <header className="mb-3 mt-2 flex flex-shrink-0 flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.35em]" style={{ color: t.textMuted }}>
          <span>
            <span style={{ color: t.primary }}>{t.glyph.diamond}</span> hivemind-cli{" "}
            <span style={{ color: t.primary }}>{t.glyph.diamond}</span>
          </span>
          <nav className="flex gap-4 tracking-[0.18em]">
            <Link href="/" className="transition-colors hover:text-[#00F0FF]">
              exit
            </Link>
            <a
              href="https://github.com/Awi-24/hivemind-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#FF2DFF]"
            >
              src
            </a>
          </nav>
        </header>

        <div className="space-y-3 text-[12px] leading-relaxed sm:text-[13px]">
          <p className="font-mono text-[10px] sm:text-[11px]" style={{ color: t.textMuted }}>
            {scan}
          </p>
          <p className="font-mono text-[10px] leading-snug sm:text-[11px]" style={{ color: t.primary }}>
            {t.glyph.diamond} LINK OPENAI-COMPAT {d} LOCAL {d} AGENTS {d} MCP READY {t.glyph.diamond}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono"
          >
            <div
              className="flex flex-col gap-2 border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              style={{
                borderColor: `${t.primary}55`,
                background: "linear-gradient(90deg, rgba(0,240,255,0.06), transparent 55%)",
                boxShadow: "inset 0 0 28px rgba(0,240,255,0.07)",
              }}
            >
              <div className="flex items-baseline gap-2">
                <span style={{ color: t.primary }}>{t.glyph.diamond}</span>
                <span className="text-[clamp(1.05rem,4vw,1.6rem)] font-bold tracking-[0.42em]" style={{ color: t.text }}>
                  HIVEMIND
                </span>
                <span style={{ color: t.primary }}>{t.glyph.diamond}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 text-[10px] sm:justify-end" style={{ color: t.textMuted }}>
                <span className="tabular-nums" style={{ color: t.highlight }}>
                  v{HIVEMIND_CLI_VERSION}
                </span>
                <span style={{ color: t.textDim }}>{t.glyph.vertical}</span>
                <span>openai-compat</span>
              </div>
            </div>
            <p className="mt-2 text-[10px]" style={{ color: t.textDim }}>
              AGENTIC SHELL HARNESS {d} awi-24 labs
            </p>
          </motion.div>

          <p className="text-[11px]" style={{ color: t.textMuted }}>
            Awaiting initialization command…
          </p>

          {/* Transcript teaser */}
          <div className="space-y-3 border-l-2 pl-3 sm:pl-4" style={{ borderColor: `${t.primary}55` }}>
            <div className="flex gap-2">
              <span className="shrink-0 font-bold" style={{ color: t.userLabel }}>
                {t.tagUser}
              </span>
              <span style={{ color: t.userBody }}>npm i -g @awi-24/hivemind-cli &amp;&amp; hivemind</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-bold" style={{ color: t.assistantLabel }}>
                {t.tagAssistant}
              </span>
              <span style={{ color: t.assistantBody }}>
                Channel open. Memory at <span style={{ color: t.highlight }}>~/.hivemind/</span>.
              </span>
            </div>
          </div>

          {/* InputContextStrip */}
          <p className="font-mono text-[10px] sm:text-[11px]" style={{ color: t.textDim }}>
            openai-compat {t.glyph.vertical} compress heavy {t.glyph.vertical}.hivemind ~/.hivemind
          </p>

          {/* Gold prompt bar (PromptBarTextInput) */}
          <div
            className="flex min-h-[2.25rem] items-center px-2 py-1.5 font-mono text-[12px] sm:text-[13px]"
            style={{ backgroundColor: t.promptBarBg, color: t.promptBarFg }}
          >
            <span className="font-semibold">sys@hivemind</span>
            <span style={{ color: t.promptBarMutedFg }}> :-# </span>
            <span className="min-w-[1ch]" style={{ opacity: cursorOn ? 1 : 0 }}>
              _
            </span>
          </div>

          <div className="pt-2">
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em]" style={{ color: t.textMuted }}>
              package {d} install
            </p>
            <div
              className="flex flex-col gap-3 border p-3 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderColor: t.panelBorder,
                background: "rgba(10, 10, 18, 0.65)",
                boxShadow: `inset 0 0 0 1px ${t.panelBorderMuted}`,
              }}
            >
              <code className="break-all text-[11px] sm:text-[12px]" style={{ color: t.primary }}>
                {installCmd}
              </code>
              <button
                type="button"
                onClick={copy}
                className="shrink-0 border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.22em] transition-colors sm:px-4"
                style={{
                  borderColor: `${t.primary}66`,
                  color: copied ? t.primary : t.highlight,
                  background: copied ? `${t.primary}12` : "transparent",
                }}
              >
                {copied ? (
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" /> ok
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Copy className="h-3.5 w-3.5" /> copy
                  </span>
                )}
              </button>
            </div>
          </div>

          <p className="pt-2 text-[11px] leading-loose" style={{ color: t.textMuted }}>
            On first run the CLI walks you through channel setup (OpenAI-compatible LLM, agents, MCP).
          </p>

          <div className="flex flex-wrap gap-6 pt-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: t.textMuted }}>
            <a
              href="https://github.com/Awi-24/hivemind-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#00F0FF]"
            >
              <Github className="h-4 w-4" />
              github.com/Awi-24/hivemind-cli
            </a>
            <Link href="/hivemind" className="transition-colors hover:text-[#FF2DFF]">
              :: legacy [ archived ] → /hivemind
            </Link>
          </div>
        </div>

        <footer className="flex-shrink-0 pt-3 font-mono text-[10px] uppercase tracking-[0.35em] sm:pt-4" style={{ color: t.textDim }}>
          <motion.span animate={{ opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
            {t.glyph.blockLight}
            {t.glyph.blockLight} end of line
          </motion.span>
        </footer>
        </div>
      </main>
    </div>
  )
}
