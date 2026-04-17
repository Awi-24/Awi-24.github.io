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
  ArrowRight,
  TrendingUp,
  Brain,
  Scale,
  Code2,
  Workflow,
  Lock,
  Box,
  Layout,
  Command,
  ChevronDown
} from "lucide-react"
import { NodeBackground, HiveMindCard, Terminal, ScrambleText } from "@/components/hivemind-ui"

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
          // Trigger staggered children
          const children = entry.target.querySelectorAll('.stagger-item')
          children.forEach((child, i) => {
            (child as HTMLElement).style.transitionDelay = `${i * 100}ms`
            child.classList.add('reveal-active')
          })
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#0A0A0A] text-[#F0F0F0] font-sans selection:bg-[#F5C518] selection:text-[#0A0A0A] overflow-hidden relative">
      <NodeBackground />

      {/* Main scrollable container */}
      <main className="h-screen overflow-y-auto scroll-smooth custom-scrollbar relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-4 relative">
          <div className="max-w-5xl mx-auto text-center scroll-reveal">
            <h1 className="text-6xl md:text-9xl font-orbitron font-black text-white mb-8 tracking-tighter leading-tight">
              <ScrambleText text="HIVEMIND" delay={200} /><br/>
              <span className="text-[#F5C518]"><ScrambleText text="PROTOCOL" delay={800} /></span>
            </h1>
            
            <div className="inline-block px-4 py-1 border border-[#F5C518]/30 rounded-full mb-8 bg-[#F5C518]/5 backdrop-blur-sm animate-pulse-slow">
              <p className="text-[#F5C518] font-orbitron text-[10px] font-bold tracking-[0.4em] uppercase">
                Autonomous Multi-Agent Orchestration
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-[#888888] font-orbitron mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide opacity-0 animate-slide-up" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              Stateless agents are dead. Long live <span className="text-white relative group">Context Engineering.<span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5C518] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" /></span>
            </p>


            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20 opacity-0 animate-slide-up" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
              <button 
                onClick={handleCopyNpx}
                className="px-10 py-5 bg-[#F5C518] text-[#0A0A0A] font-orbitron font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 rounded shadow-[0_0_40px_rgba(245,197,24,0.2)] group"
              >
                {copied ? <Check className="w-5 h-5" /> : <TerminalIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
                {copied ? "COPIED!" : `npx create-hivemind-protocol`}
              </button>
              <a 
                href="https://github.com/Awi-24/HiveMind-Protocol" 
                target="_blank"
                className="px-10 py-5 border-2 border-white/10 text-white font-orbitron font-black text-sm hover:border-white transition-all flex items-center justify-center gap-2 rounded"
              >
                GITHUB REPO <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
              <ChevronDown className="w-8 h-8" />
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW STRIP */}
        <section className="bg-white text-black py-24 px-4 scroll-reveal relative z-20 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="stagger-item opacity-0">
              <h2 className="text-4xl font-orbitron font-black mb-6 tracking-tight uppercase">Statelessness is the <span className="text-[#D4A017] animate-glow-text">Enemy</span></h2>
              <p className="text-lg font-medium leading-relaxed opacity-80 mb-8">
                Standard AI coding burns tokens re-learning your architecture every session. HiveMind creates a persistent intelligence layer that lives inside your repo.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-[3px] bg-[#F5C518] rounded-full" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">Architectural Persistence</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-item opacity-0">
              {[
                { label: "Anti-Loop", sub: "Fail-safe gate", icon: Zap },
                { label: "O(1) Memory", sub: "Tiered loading", icon: Database },
                { label: "CTO Mode", sub: "Governance layer", icon: Shield },
                { label: "Role Scoped", sub: "Code ownership", icon: Users }
              ].map((item, i) => (
                <div key={i} className="p-6 border-2 border-black/5 rounded hover:border-black/20 hover:bg-black/5 transition-all group cursor-default">
                  <item.icon className="w-5 h-5 mb-3 group-hover:scale-110 transition-transform text-[#D4A017]" />
                  <p className="font-orbitron font-black text-xs mb-1 uppercase">{item.label}</p>
                  <p className="text-[10px] uppercase font-bold opacity-30 tracking-tighter">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CORE CONCEPTS */}
        <section className="py-40 px-4 scroll-reveal">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-orbitron font-black text-white mb-24 text-center tracking-[0.4em] uppercase">
              <ScrambleText text="CORE_CONCEPTS" delay={500} />
            </h2>
            <div className="grid md:grid-cols-4 gap-6 items-stretch">
              {[
                { title: "MANIFEST", icon: Database, desc: "Self-sufficient Tier 0 index. Read first, always. Zero Speculation." },
                { title: "ENTRY ID", icon: Command, desc: "Stable immutable references that survive refactors and reorders." },
                { title: "HANDOFF", icon: Workflow, desc: "Asynchronous task delegation between specialized agent profiles." },
                { title: "RAILGUARD", icon: Lock, desc: "Hard limits preventing token waste, loops, or unauthorized destructive ops." }
              ].map((concept, i) => (
                <div key={i} className="stagger-item opacity-0 h-full">
                  <HiveMindCard title={concept.title} icon={concept.icon}>
                    {concept.desc}
                  </HiveMindCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ARCHITECTURE MAP */}
        <section className="py-40 px-4 bg-[#050505] border-y border-white/5 scroll-reveal">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className="relative group stagger-item opacity-0">
              <div className="bg-[#0D0D0D] p-10 rounded border border-white/10 font-mono text-sm leading-relaxed relative z-10 overflow-hidden shadow-2xl">
                {/* Pulsing Scan Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F5C518]/20 animate-scan-y pointer-events-none" />
                
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <span className="text-[#F5C518] font-orbitron text-[10px] tracking-widest font-black uppercase">Tree Structure</span>
                  <span className="text-white/20 text-[10px]">LOCAL_REPO</span>
                </div>
                <div className="text-[#888888] space-y-3">
                  <div className="flex gap-3 hover:text-white transition-colors"><span className="text-[#F5C518]">📄</span> CLAUDE.md <span className="text-white/10 italic text-[10px]"># The Contract</span></div>
                  <div className="flex gap-3 hover:text-white transition-colors"><span>📂</span> .claude/commands/ <span className="text-white/10 text-[10px]">22 files</span></div>
                  <div className="flex gap-3 text-white"><span>📂</span> .hivemind/</div>
                  <div className="pl-8 border-l-2 border-[#F5C518]/20 space-y-3 py-2 relative">
                    <div className="flex gap-3 text-white/40 hover:text-white transition-colors cursor-default"><span>📂</span> agents/</div>
                    <div className="flex gap-3 text-white/40 hover:text-white transition-colors cursor-default"><span>📂</span> memory/ <span className="text-[#F5C518]/60 text-[9px] font-bold">ACTIVE</span></div>
                    <div className="flex gap-3 text-white/40 hover:text-white transition-colors cursor-default"><span>📂</span> reports/</div>
                    <div className="flex gap-3 text-white/40 hover:text-white transition-colors cursor-default"><span>📂</span> tools/</div>
                    <div className="flex gap-3 text-[#F5C518] font-bold animate-pulse"><span>📄</span> project.json</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stagger-item opacity-0">
              <h2 className="text-4xl font-orbitron font-black text-white mb-8 uppercase tracking-tight">Technical Infrastructure</h2>
              <p className="text-[#888888] mb-10 leading-relaxed font-medium text-lg">
                HiveMind isn't a complex binary: it's a <span className="text-white">markdown-first</span> architecture. It makes the entire "mind" of your project human-readable, version-controlled, and private.
              </p>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { title: "Local Context", sub: "Zero Speculation. Total Privacy.", icon: Globe },
                  { title: "Audit Trails", sub: "Every decision linked and logged.", icon: Command },
                  { title: "Smart Routing", sub: "Opus/Sonnet/Haiku specialized tiers.", icon: Cpu }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded bg-[#F5C518]/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-[#F5C518]/40 transition-all duration-500">
                      <item.icon className="w-5 h-5 text-[#F5C518]" />
                    </div>
                    <div>
                      <h4 className="font-orbitron font-black text-xs text-white uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-xs text-[#555] font-bold uppercase tracking-tighter group-hover:text-[#888] transition-colors">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. PRODUCTIVITY BENCHMARK */}
        <section className="py-40 px-4 scroll-reveal">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24 stagger-item opacity-0">
              <h2 className="text-4xl font-orbitron font-black text-white mb-6 uppercase tracking-widest">
                <ScrambleText text="THE_PRODUCTIVITY_GAP" delay={200} />
              </h2>
              <p className="text-[#888888] max-w-2xl mx-auto font-medium leading-relaxed">
                Conventional "Vibe Coding" starts fast but becomes a technical debt nightmare. HiveMind scales with your application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center stagger-item opacity-0">
              <div className="bg-[#0D0D0D] p-12 rounded border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 bg-red-900/10 text-red-500 text-[10px] font-orbitron font-black uppercase tracking-widest">UNRELIABLE</div>
                <h3 className="text-xl font-orbitron font-black text-white/20 mb-10 tracking-widest">VIBE_MODE</h3>
                <div className="h-32 flex items-end gap-1 mb-10">
                  {[100, 92, 68, 35, 12, 4].map((h, i) => (
                    <div key={i} className="flex-1 bg-red-500/10 group-hover:bg-red-500/40 group-hover:animate-glitch-bar transition-all duration-1000 rounded-t" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] font-orbitron font-black text-red-500/30 uppercase">
                  <span>Greenfield</span>
                  <span>Enterprise Chaos</span>
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-12 rounded border-2 border-[#F5C518]/10 relative overflow-hidden group shadow-[0_0_100px_rgba(245,197,24,0.05)]">
                <div className="absolute top-0 right-0 p-3 bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-orbitron font-black uppercase tracking-widest">HIVEMIND_GRIP</div>
                <h3 className="text-xl font-orbitron font-black text-[#F5C518] mb-10 tracking-widest uppercase">Protocol Mode</h3>
                <div className="h-32 flex items-end gap-1 mb-10">
                  {[80, 82, 85, 84, 86, 88].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#F5C518]/20 group-hover:bg-[#F5C518]/80 transition-all duration-1000 rounded-t" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] font-orbitron font-black text-[#F5C518]/40 uppercase">
                  <span>Start</span>
                  <span>Scale Up</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MODEL TIERS */}
        <section className="py-40 px-4 bg-[#050505] border-y border-white/5 scroll-reveal">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-orbitron font-black text-white mb-20 uppercase tracking-[0.5em]">
              <ScrambleText text="MODEL_TIERS" delay={300} />
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { tier: "LITE", model: "Haiku 4.5", desc: "Log generation and context reads.", icon: Zap },
                { tier: "STANDARD", model: "Sonnet 4.6", desc: "Feature dev and implementation.", icon: Code2 },
                { tier: "HEAVY", model: "Opus 4.6", desc: "Architecture and security audits.", icon: Brain }
              ].map((item, i) => (
                <div key={i} className="stagger-item opacity-0 bg-[#0D0D0D] p-10 border border-white/5 rounded-lg group hover:border-[#F5C518]/40 transition-all duration-500">
                  <item.icon className="w-6 h-6 text-[#F5C518] mb-8 mx-auto group-hover:rotate-[360deg] transition-transform duration-700" />
                  <span className="font-orbitron font-black text-[9px] tracking-[0.6em] text-[#F5C518]/40 mb-6 block uppercase">{item.tier}</span>
                  <h4 className="text-2xl font-orbitron font-black text-white mb-4">{item.model}</h4>
                  <p className="text-[10px] text-[#555] font-bold uppercase tracking-wider group-hover:text-[#888]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. INSTALLATION */}
        <section className="py-40 px-4 scroll-reveal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-orbitron font-black text-white mb-32 text-center tracking-tighter uppercase underline decoration-[#F5C518] decoration-4 underline-offset-[20px]">Deployment</h2>
            
            <div className="space-y-32 relative">
              <div className="stagger-item opacity-0 bg-[#0D0D0D] p-12 border border-white/10 rounded-xl relative z-10 hover:shadow-[0_0_50px_rgba(245,197,24,0.1)] transition-shadow">
                <div className="flex items-center gap-8 mb-10">
                  <div className="w-16 h-16 rounded-full bg-[#F5C518] text-[#0A0A0A] flex items-center justify-center font-orbitron font-black text-3xl shadow-[0_0_30px_rgba(245,197,24,0.3)]">01</div>
                  <div>
                    <h3 className="text-2xl font-orbitron font-black text-white uppercase">Initialize Project</h3>
                    <p className="text-[#444] font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Create root infrastructure</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <Terminal command="npx create-hivemind-protocol my-project" fullWidth />
                  <div className="flex items-center gap-3 px-4 opacity-20">
                    <div className="h-[1px] flex-1 bg-white" />
                    <span className="text-[9px] font-orbitron font-black uppercase">OR MANUAL</span>
                    <div className="h-[1px] flex-1 bg-white" />
                  </div>
                  <Terminal command="git clone https://github.com/Awi-24/HiveMind-Protocol.git" fullWidth />
                </div>
              </div>

              <div className="stagger-item opacity-0 text-center pt-20 relative z-10">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-orbitron font-black text-3xl mx-auto mb-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">02</div>
                <h3 className="text-3xl font-orbitron font-black text-[#F5C518] mb-6 uppercase tracking-widest">Activate Protocol</h3>
                <p className="text-[#888888] mb-12 max-w-lg mx-auto font-medium">Launch your AI assistant at the root and trigger the onboarding form.</p>
                <div className="inline-flex flex-col items-center group cursor-pointer" onClick={() => handleCopyNpx()}>
                  <div className="px-16 py-10 border-2 border-[#F5C518]/20 bg-[#0D0D0D] rounded-lg group-hover:border-[#F5C518] group-hover:shadow-[0_0_40px_rgba(245,197,24,0.2)] transition-all">
                    <code className="text-5xl font-orbitron font-black text-white tracking-[0.3em]">/init</code>
                  </div>
                  <span className="mt-4 text-[10px] font-orbitron font-black text-[#F5C518] opacity-40 group-hover:opacity-100 transition-opacity animate-pulse">RUN_ON_CLAUDE_CODE</span>
                </div>
              </div>

              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-[#F5C518]/40 via-white/10 to-transparent -translate-x-1/2 -z-10" />
            </div>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="py-32 px-4 bg-white text-black relative z-30">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-6xl font-orbitron font-black block mb-4 tracking-tighter">HIVEMIND</span>
              <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-30 leading-loose">Context Engineering for Digital Repositories</p>
            </div>
            <div className="flex flex-col md:items-end gap-10">
              <div className="flex flex-wrap gap-x-12 gap-y-4 font-orbitron font-black text-xs tracking-[0.2em] uppercase">
                <a href="https://github.com/Awi-24/HiveMind-Protocol" className="hover:text-[#F5C518] border-b-2 border-black/5 hover:border-[#F5C518] transition-all">GitHub</a>
                <a href="https://www.npmjs.com/package/create-hivemind-protocol" target="_blank" className="hover:text-[#F5C518] border-b-2 border-black/5 hover:border-[#F5C518] transition-all">NPM_PKG</a>
              </div>
              <p className="text-[9px] font-black uppercase opacity-20 leading-relaxed text-right tracking-tighter">© 2026 MIT LICENSE. BUILT BY AWI-24.<br/>ALL MODELS COMPATIBLE THROUGH PROTOCOL INJECTION.</p>
            </div>
          </div>
        </footer>

      </main>

      {/* GLOBAL CSS FOR DYNAMIC ANIMATIONS */}
      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-item.reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0A0A0A;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E1E1E;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #F5C518;
        }

        @keyframes scan-y {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-y {
          animation: scan-y 3s linear infinite;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }

        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 10px rgba(245, 197, 24, 0); }
          50% { text-shadow: 0 0 20px rgba(245, 197, 24, 0.5); }
        }
        .animate-glow-text {
          animation: glow-text 2s infinite;
        }

        @keyframes glitch-bar {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          95% { opacity: 1; transform: scaleX(1); }
          96% { opacity: 0.5; transform: scaleX(1.1); }
          97% { opacity: 1; transform: scaleX(0.9); }
          98% { opacity: 0.2; transform: scaleX(1.05); }
        }
        .group:hover .animate-glitch-bar {
          animation: glitch-bar 4s infinite;
        }
      `}</style>
    </div>
  )
}
