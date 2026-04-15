"use client"

import { useState } from "react"
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
  const npxCommand = "npx create-hivemind-protocol"

  const handleCopyNpx = () => {
    navigator.clipboard.writeText(npxCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans selection:bg-[#F5C518] selection:text-[#0A0A0A] overflow-x-hidden">
      <NodeBackground />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <HiveMindLogo className="mx-auto mb-12 animate-pulse" />
          
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
      <section className="bg-[#050505] py-16 px-4 border-y border-[#1E1E1E]">
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
      <section className="py-32 px-4 border-y border-[#1E1E1E]">
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
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#888888]">Productivity over time</span>
                    <span className="text-red-500">Collapses at Scale</span>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    <div className="flex-1 bg-red-500/40 h-[100%] rounded-t" />
                    <div className="flex-1 bg-red-500/50 h-[90%] rounded-t" />
                    <div className="flex-1 bg-red-500/60 h-[70%] rounded-t" />
                    <div className="flex-1 bg-red-500/70 h-[40%] rounded-t animate-pulse" />
                    <div className="flex-1 bg-red-500/80 h-[15%] rounded-t" />
                    <div className="flex-1 bg-red-500/90 h-[5%] rounded-t" />
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Constant context repetition
                  </li>
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> No code ownership boundaries
                  </li>
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High hallucination rate on large files
                  </li>
                </ul>
              </div>
            </div>

            {/* HiveMind Side */}
            <div className="bg-[#0D0D0D] p-8 rounded border border-[#F5C518]/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold uppercase tracking-widest border-b border-l border-[#F5C518]/20">Total Control</div>
              <h3 className="text-xl font-bold text-white mb-6">HiveMind Protocol</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#888888]">Productivity over time</span>
                    <span className="text-[#F5C518]">Sustained Efficiency</span>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    <div className="flex-1 bg-[#F5C518]/20 h-[80%] rounded-t" />
                    <div className="flex-1 bg-[#F5C518]/30 h-[82%] rounded-t" />
                    <div className="flex-1 bg-[#F5C518]/40 h-[85%] rounded-t" />
                    <div className="flex-1 bg-[#F5C518]/50 h-[84%] rounded-t" />
                    <div className="flex-1 bg-[#F5C518]/60 h-[86%] rounded-t" />
                    <div className="flex-1 bg-[#F5C518]/70 h-[88%] rounded-t animate-pulse" />
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" /> Persistent per-agent memory
                  </li>
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" /> Strict behavioral railguards
                  </li>
                  <li className="text-xs text-[#888888] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" /> Zero drift architecture
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="py-32 px-4 bg-[#050505] border-y border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">A command for every workflow.</h2>
            <p className="text-[#888888]">Standardized slash commands keep every agent coordinated without you repeating yourself.</p>
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
              { cmd: "/resolve", desc: "Close an active blocker" },
              { cmd: "/blocker", desc: "Register a new blocker" },
              { cmd: "/decision", desc: "Log a decision" },
              { cmd: "/audit", desc: "Security audit" },
              { cmd: "/scaffold", desc: "Generate project structure" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#1E1E1E] group">
                <code className="text-[#F5C518] font-mono group-hover:translate-x-1 transition-transform">{item.cmd}</code>
                <span className="text-[#888888] text-sm">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Up in 30 seconds.</h2>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold text-white">Scaffold</h3>
                </div>
                <p className="text-[#888888] mb-6">Choose your installation path: clone the template or use the initializer.</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-2">Option A: Via NPX</p>
                    <Terminal command="npx create-hivemind-protocol my-project" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-2">Option B: Via Git</p>
                    <Terminal command="git clone https://github.com/Awi-24/HiveMind-Protocol.git" />
                  </div>
                </div>
              </div>
              <div className="hidden md:block border-l border-[#1E1E1E] h-48 ml-12" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-bold text-white">Configure</h3>
                </div>
                <p className="text-[#888888]">Edit <code className="text-[#F5C518]">project.json</code> — set your stack, active agents, model IDs.</p>
              </div>
              <div className="hidden md:block border-l border-[#1E1E1E] h-32 ml-12" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-bold text-white">Initialize</h3>
                </div>
                <p className="text-[#888888]">Open in Claude Code. Run <code className="text-[#F5C518]">/init</code>. Agents read their profiles and shared memory.</p>
              </div>
              <div className="hidden md:block border-l border-[#1E1E1E] h-32 ml-12" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-bold">4</div>
                  <h3 className="text-xl font-bold text-white">Build</h3>
                </div>
                <p className="text-[#888888]">Each agent maintains state, respects code boundaries, and updates shared memory — automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Routing Table */}
      <section className="py-32 px-4 bg-[#050505] border-y border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Right model for the right task.</h2>
          
          <div className="overflow-x-auto rounded-lg border border-[#1E1E1E]">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="bg-[#141414]">
                  <th className="px-6 py-4 text-[#F5C518] font-bold uppercase text-xs tracking-widest">Tier</th>
                  <th className="px-6 py-4 text-[#F5C518] font-bold uppercase text-xs tracking-widest">Model</th>
                  <th className="px-6 py-4 text-[#F5C518] font-bold uppercase text-xs tracking-widest">Used For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E]">
                <tr>
                  <td className="px-6 py-4 text-white font-medium">Lite</td>
                  <td className="px-6 py-4 font-mono text-sm">Haiku 4.5</td>
                  <td className="px-6 py-4 text-[#888888] text-sm">Reads, logs, status, formatting</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white font-medium">Standard</td>
                  <td className="px-6 py-4 font-mono text-sm">Sonnet 4.6</td>
                  <td className="px-6 py-4 text-[#888888] text-sm">Code, debugging, tests, reviews</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white font-medium">Heavy</td>
                  <td className="px-6 py-4 font-mono text-sm">Opus 4.6</td>
                  <td className="px-6 py-4 text-[#888888] text-sm">Architecture, security, cross-system design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-4">
              <HiveMindLogo size={40} />
              <span className="text-xl font-bold text-white">HiveMind Protocol</span>
            </div>
            
            <div className="flex gap-8 text-sm text-[#888888]">
              <a href="https://github.com/Awi-24/HiveMind-Protocol" className="hover:text-[#F5C518] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[#F5C518] transition-colors">npm</a>
              <a href="#" className="hover:text-[#F5C518] transition-colors">CLAUDE.md</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1E1E1E]">
            <p className="text-xs text-[#888888]">© 2026 HiveMind Protocol — MIT License</p>
            <p className="text-xs text-[#888888] font-medium italic">Built for Claude Code. Works everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
