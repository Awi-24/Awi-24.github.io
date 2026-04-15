"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Github, 
  Terminal, 
  Cpu, 
  Shield, 
  Database, 
  Zap, 
  Brain, 
  Layers, 
  Server, 
  ArrowLeft, 
  Copy, 
  Check,
  ChevronRight,
  Code2,
  Workflow,
  MessageSquare,
  Activity,
  GitBranch
} from "lucide-react"
import { HiveMindRain, HiveMindCard, FlowStep } from "@/components/hivemind-ui"

export default function HiveMindPage() {
  const [copiedGit, setCopiedGit] = useState(false)
  const [copiedNpx, setCopiedNpx] = useState(false)

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  const gitCommand = "git clone https://github.com/Awi-24/HiveMind-Protocol.git"
  const npxCommand = "npx hivemind-protocol init" // Placeholder as requested

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      <HiveMindRain />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-400/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center border border-yellow-400 group-hover:bg-yellow-400 transition-colors">
              <ArrowLeft className="w-4 h-4 text-yellow-400 group-hover:text-black transition-colors" />
            </div>
            <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest hidden sm:inline">Back to Portfolio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Awi-24/HiveMind-Protocol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-mono text-xs hidden md:inline">GITHUB</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-yellow-400/30 rounded-full mb-8 bg-yellow-400/5">
            <Activity className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] text-yellow-400 font-mono tracking-[0.2em] uppercase">Status: Production Ready</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 tracking-tighter">
            HIVE<span className="text-yellow-400">MIND</span> PROTOCOL
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Um framework open-source para orquestração de <span className="text-yellow-400">multi-agentes de IA</span>. 
            Crie equipes autônomas que colaboram em tempo real.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#install" className="px-8 py-3 bg-yellow-400 text-black font-bold font-mono text-sm hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]">
              GET STARTED
            </a>
            <a href="https://github.com/Awi-24/HiveMind-Protocol" target="_blank" className="px-8 py-3 border border-yellow-400 text-yellow-400 font-bold font-mono text-sm hover:bg-yellow-400/10 transition-all">
              VIEW REPOSITORY
            </a>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 bg-yellow-400/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-orbitron text-yellow-400 mb-16 text-center tracking-widest uppercase underline decoration-2 underline-offset-8">
            Como Funciona
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FlowStep 
              icon={Brain} 
              title="Orquestração" 
              description="LLMs (Claude, GPT, Gemini) colaboram via protocolos definidos." 
            />
            <FlowStep 
              icon={Layers} 
              title="Memória" 
              description="Sistema de memória persistente para manter contexto entre sessões." 
            />
            <FlowStep 
              icon={Shield} 
              title="Railguards" 
              description="Limites operacionais para evitar loops infinitos e desperdício de tokens." 
            />
            <FlowStep 
              icon={Zap} 
              title="Deployment" 
              isLast 
              description="Geração automatizada de código e relatórios técnicos vivos." 
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <HiveMindCard title="Role-Based Profiles">
              <div className="flex flex-col gap-4">
                <p className="text-sm">12 perfis pré-definidos (CTO, Lead Dev, Security, DevOps) com fronteiras comportamentais específicas.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] border border-yellow-400/20 px-2 py-1">CTO</span>
                  <span className="text-[10px] border border-yellow-400/20 px-2 py-1">SECURITY</span>
                  <span className="text-[10px] border border-yellow-400/20 px-2 py-1">DEVOPS</span>
                </div>
              </div>
            </HiveMindCard>

            <HiveMindCard title="Token Compression">
              <p className="text-sm">Regras de comunicação inspiradas em "Caveman" reduzem o volume de output em ~65% sem sacrificar a segurança.</p>
            </HiveMindCard>

            <HiveMindCard title="Model Routing">
              <p className="text-sm">Seleção automática do tier de modelo (Lite, Standard, Heavy) baseada na complexidade da tarefa.</p>
            </HiveMindCard>

            <HiveMindCard title="Persistent Context">
              <p className="text-sm">Sistema baseado em arquivos que mantém o estado do projeto e o contexto dos agentes entre diferentes sessões.</p>
            </HiveMindCard>

            <HiveMindCard title="Living Reports">
              <p className="text-sm">Changelogs, relatórios de sprint e logs de auditoria colaborativos escritos em tempo real pelos próprios agentes.</p>
            </HiveMindCard>

            <HiveMindCard title="Scaffold Templates">
              <p className="text-sm">Estruturas pré-configuradas para stacks populares como Next.js, FastAPI e Node.js prontas para uso.</p>
            </HiveMindCard>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="py-20 px-4 bg-yellow-400/5 border-y border-yellow-400/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-orbitron text-white mb-10 text-center uppercase tracking-widest">
            Instalação <span className="text-yellow-400">Rápida</span>
          </h2>

          <div className="space-y-8">
            {/* Git Install */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-2">
                <GitBranch className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-mono text-white/40 uppercase">Via Git Clone</span>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-yellow-400 rounded opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-black border border-yellow-400/30 p-4 rounded flex items-center justify-between font-mono text-sm overflow-x-auto whitespace-nowrap">
                  <span className="text-yellow-400 mr-4">$</span>
                  <code className="text-white/80 flex-1">{gitCommand}</code>
                  <button 
                    onClick={() => copyToClipboard(gitCommand, setCopiedGit)}
                    className="ml-4 p-2 hover:bg-yellow-400/10 rounded transition-colors"
                  >
                    {copiedGit ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-yellow-400" />}
                  </button>
                </div>
              </div>
            </div>

            {/* NPX Install */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-mono text-white/40 uppercase">Via NPX (Direto no projeto)</span>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-yellow-400 rounded opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-black border border-yellow-400/30 p-4 rounded flex items-center justify-between font-mono text-sm overflow-x-auto whitespace-nowrap">
                  <span className="text-yellow-400 mr-4">$</span>
                  <code className="text-white/80 flex-1">{npxCommand}</code>
                  <button 
                    onClick={() => copyToClipboard(npxCommand, setCopiedNpx)}
                    className="ml-4 p-2 hover:bg-yellow-400/10 rounded transition-colors"
                  >
                    {copiedNpx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-yellow-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block p-4 border border-yellow-400/20 bg-black">
              <p className="text-xs text-white/60 leading-relaxed max-w-md">
                Após a instalação, configure o arquivo <span className="text-yellow-400">project.json</span> para definir sua stack e agentes ativos. Use <span className="text-yellow-400">/init</span> via Claude Code para iniciar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-yellow-400/10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400"></div>
            <span className="font-orbitron font-bold tracking-tighter">HIVEMIND</span>
          </div>
          
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            &copy; 2026 Awi-24 / Open Source Framework
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/Awi-24" target="_blank" className="text-white/40 hover:text-yellow-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
