"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Github, 
  Terminal as TerminalIcon, 
  Cpu, 
  Shield, 
  Database, 
  Zap, 
  Layers, 
  Users,
  Globe,
  Check,
  Copy,
  ArrowRight
} from "lucide-react"
import { HiveMindLogo, NodeBackground, HiveMindCard, Terminal } from "@/components/hivemind-ui"

export default function HiveMindPage() {
  const [copied, setCopied] = useState(false)
  const npxCommand = "npx create-hivemind-protocol my-project"

  const handleCopyNpx = () => {
    navigator.clipboard.writeText(npxCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans selection:bg-[#F5C518] selection:text-[#0A0A0A] overflow-x-hidden">
      <NodeBackground />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <HiveMindLogo className="mx-auto mb-12" />
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            HiveMind Protocol
          </h1>
          
          <p className="text-xl md:text-2xl text-[#F5C518] font-medium mb-2 tracking-tight">
            One framework. Every AI. No repeated context.
          </p>
          <p className="text-[#888888] text-lg mb-12 max-w-2xl mx-auto">
            Give your AI agents persistent memory, defined roles, and behavioral guardrails — across every session, every model.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button 
              onClick={handleCopyNpx}
              className="px-8 py-4 bg-[#F5C518] text-[#0A0A0A] font-bold text-sm hover:bg-[#D4A017] transition-all flex items-center justify-center gap-3 rounded"
            >
              {copied ? <Check className="w-5 h-5" /> : <TerminalIcon className="w-5 h-5" />}
              {copied ? "Copied!" : `Get Started — ${npxCommand}`}
            </button>
            <a 
              href="https://github.com/Awi-24/HiveMind-Protocol" 
              target="_blank"
              className="px-8 py-4 border border-[#1E1E1E] text-white font-bold text-sm hover:bg-[#141414] transition-all flex items-center justify-center gap-2 rounded"
            >
              View on GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-[10px] text-[#888888] uppercase tracking-[0.3em]">
            Works with Claude Code · GPT · Gemini · Any LLM
          </p>
        </div>
      </section>

      {/* Problem Strip */}
      <section className="bg-[#050505] py-16 px-4 border-y border-[#1E1E1E] scroll-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">AI agents forget everything between sessions.</h2>
          <p className="text-[#888888] leading-relaxed">
            Every new session means re-explaining the stack, the architecture, the decisions already made. 
            Your agents have no memory, no roles, and no rules — so they hallucinate, repeat work, and drift.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <HiveMindCard title="Persistent Memory" icon={Layers}>
              File-based memory system shared across all agents. shared-context, decisions log, handoff queue, and per-agent state files persist across every session.
            </HiveMindCard>

            <HiveMindCard title="Smart Model Routing" icon={Cpu}>
              Tasks are automatically routed to the right model tier. Haiku for reads and logs. Sonnet for code and logic. Opus for architecture and security audits.
            </HiveMindCard>

            <HiveMindCard title="65% Token Reduction" icon={Zap}>
              Caveman-inspired communication rules eliminate filler and preamble from every agent response. Memory files use compressed prose.
            </HiveMindCard>

            <HiveMindCard title="12 Agent Profiles" icon={Users}>
              CTO, Lead Dev, Backend, Frontend, DevOps, Security, QA, Data, Docs, Mobile, AI/ML, Product Manager — each with explicit ownership and boundaries.
            </HiveMindCard>

            <HiveMindCard title="Built-in Railguards" icon={Shield}>
              Anti-loop limits, forbidden operations (rm -rf, DROP TABLE, force push), code ownership boundaries, and confirmation gates for destructive actions.
            </HiveMindCard>

            <HiveMindCard title="Model-Agnostic" icon={Globe}>
              Designed for Claude Code but works with GPT, Gemini, or any LLM. Swap model IDs in project.json — everything else stays the same.
            </HiveMindCard>
          </div>
        </div>
      </section>

      {/* Productivity Comparison Section */}
      <section className="py-32 px-4 border-y border-[#1E1E1E] scroll-reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Escape the Vibe Coding Cliff.</h2>
            <p className="text-[#888888] max-w-2xl mx-auto">Conventional AI coding (Vibe Coding) starts fast but collapses as complexity grows. HiveMind maintains high productivity and total control via protocol-driven orchestration.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vibe Coding Side */}
            <div className="bg-[#0D0D0D] p-8 rounded border border-[#1E1E1E] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 bg-red-900/20 text-red-500 text-[10px] font-bold uppercase tracking-widest border-b border-l border-red-500/20">Unreliable</div>
              <h3 className="text-xl font-bold text-white mb-6">Normal Vibe Coding</h3>
              <div className="h-24 flex items-end gap-1 mb-6">
                {[100, 90, 70, 40, 15, 5].map((h, i) => (
                  <div key={i} className="flex-1 bg-red-500/40 rounded-t transition-all duration-1000" style={{ height: `${h}%` }} />
                ))}
              </div>
              <ul className="space-y-3 text-xs text-[#888888]">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Constant context repetition</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> No code ownership boundaries</li>
              </ul>
            </div>

            {/* HiveMind Side */}
            <div className="bg-[#0D0D0D] p-8 rounded border border-[#F5C518]/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold uppercase tracking-widest border-b border-l border-[#F5C518]/20">Total Control</div>
              <h3 className="text-xl font-bold text-white mb-6">HiveMind Protocol</h3>
              <div className="h-24 flex items-end gap-1 mb-6">
                {[80, 82, 85, 84, 86, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#F5C518]/40 rounded-t transition-all duration-1000" style={{ height: `${h}%` }} />
                ))}
              </div>
              <ul className="space-y-3 text-xs text-[#888888]">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" /> Persistent per-agent memory</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" /> Strict behavioral railguards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="py-32 px-4 bg-[#050505] border-y border-[#1E1E1E] scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">A command for every workflow.</h2>
            <p className="text-[#888888]">Standardized slash commands keep every agent coordinated.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { cmd: "/status", desc: "Current state of all agents" },
              { cmd: "/focus", desc: "Scope session to one agent" },
              { cmd: "/standup", desc: "Cross-agent daily summary" },
              { cmd: "/checkpoint", desc: "Snapshot state before risky ops" },
              { cmd: "/handoff", desc: "Transfer task between agents" },
              { cmd: "/review", desc: "Structured code review" },
              { cmd: "/hotfix", desc: "Emergency fix workflow" },
              { cmd: "/deploy", desc: "Formal QA → Security → DevOps chain" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#1E1E1E]">
                <code className="text-[#F5C518] font-mono">{item.cmd}</code>
                <span className="text-[#888888] text-sm">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Up in 30 Seconds - Centralized Flow */}
      <section className="py-32 px-4 scroll-reveal">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-20 text-center">Up in 30 seconds.</h2>

          <div className="relative space-y-24">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-[0_0_20px_rgba(245,197,24,0.4)]">1</div>
              <h3 className="text-2xl font-bold text-white mb-4">Scaffold</h3>
              <p className="text-[#888888] mb-8 max-w-md">Initialize the project structure with the official template.</p>
              <div className="w-full max-w-md space-y-4">
                <Terminal command="npx create-hivemind-protocol my-project" />
                <Terminal command="git clone https://github.com/Awi-24/HiveMind-Protocol.git" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-[0_0_20px_rgba(245,197,24,0.4)]">2</div>
              <h3 className="text-2xl font-bold text-white mb-4">Configure</h3>
              <p className="text-[#888888] max-w-md">Edit <code className="text-[#F5C518]">project.json</code> to set your tech stack and active agent profiles.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-[0_0_20px_rgba(245,197,24,0.4)]">3</div>
              <h3 className="text-2xl font-bold text-white mb-4">Initialize</h3>
              <p className="text-[#888888] max-w-md">Launch your AI assistant (Claude Code/GPT) and run <code className="text-[#F5C518]">/init</code>.</p>
            </div>

            {/* Connection Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#F5C518]/20 to-transparent -translate-x-1/2 z-0" />
          </div>
        </div>
      </section>

      {/* Model Routing Table */}
      <section className="py-32 px-4 bg-[#050505] border-y border-[#1E1E1E] scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Right model for the right task.</h2>
          <div className="overflow-x-auto rounded-lg border border-[#1E1E1E]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#141414] text-[#F5C518] text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Used For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E] text-sm text-[#888888]">
                <tr><td className="px-6 py-4 text-white font-bold">Lite</td><td className="px-6 py-4">Haiku 4.5</td><td className="px-6 py-4">Reads, logs, status</td></tr>
                <tr><td className="px-6 py-4 text-white font-bold">Standard</td><td className="px-6 py-4">Sonnet 4.6</td><td className="px-6 py-4">Code, logic, debugging</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 scroll-reveal">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[#1E1E1E] pt-12">
          <div className="flex items-center gap-4"><HiveMindLogo size={40} /><span className="text-xl font-bold text-white">HiveMind Protocol</span></div>
          <div className="flex gap-8 text-sm text-[#888888]">
            <a href="https://github.com/Awi-24/HiveMind-Protocol" className="hover:text-[#F5C518]">GitHub</a>
            <a href="#" className="hover:text-[#F5C518]">CLAUDE.md</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes shockwave {
          0% { transform: scale(0.5); opacity: 0; }
          10% { opacity: 0.5; }
          50% { opacity: 0; }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-shockwave {
          animation: shockwave 10s infinite;
        }
      `}</style>
    </div>
  )
}
