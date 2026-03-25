"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, ChevronDown, Home, FileText, LineChart, BarChart3, Settings, Target, ChevronRight, Plus, Shield, Database, Lock, Smartphone, PieChart, Zap } from "lucide-react"

export default function MonnexDemo() {
  const [activeTab, setActiveTab] = useState<"demo" | "info">("info")
  const [showDetails, setShowDetails] = useState(false)

  const features = [
    { icon: Shield, title: "Privacy First", desc: "Todos os dados financeiros armazenados localmente. Sem sincronização com servidores externos." },
    { icon: Database, title: "SQLite Encrypted", desc: "Banco de dados SQLite com criptografia AES-256. Seus gastos nunca saem do dispositivo." },
    { icon: Lock, title: "Sem Tracking", desc: "Zero analytics, zero ads, zero venda de dados. Código auditável e transparente." },
    { icon: PieChart, title: "Análise de Gastos", desc: "Categorização automática de despesas com gráficos interativos e insights mensais." },
    { icon: Target, title: "Metas Financeiras", desc: "Defina objetivos de economia e acompanhe progresso com projeções baseadas no histórico." },
    { icon: Zap, title: "Saúde Financeira", desc: "Score de 0-100 calculado localmente baseado em diversificação, poupança e padrões de gasto." },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
            activeTab === "info" 
              ? "bg-[#6b4eff] text-white" 
              : "bg-[#1a1a2e] text-[#6b4eff] hover:bg-[#252540]"
          }`}
        >
          Sobre o Projeto
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
            activeTab === "demo" 
              ? "bg-[#6b4eff] text-white" 
              : "bg-[#1a1a2e] text-[#6b4eff] hover:bg-[#252540]"
          }`}
        >
          Preview da Interface
        </button>
      </div>

      {activeTab === "info" ? (
        <div className="space-y-6">
          {/* Project Header */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-xl p-6 border border-[#6b4eff]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6b4eff] to-[#8b5cf6] rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Monnex</h3>
                <p className="text-[#888] text-sm">Gerenciamento Financeiro Pessoal</p>
              </div>
            </div>
            <p className="text-[#888] text-sm leading-relaxed">
              Aplicativo de finanças pessoais construído com foco absoluto em privacidade. Enquanto apps populares monetizam seus dados financeiros, 
              o Monnex garante que <span className="text-[#6b4eff] font-medium">suas informações financeiras jamais saiam do seu dispositivo</span>.
            </p>
          </div>

          {/* Privacy Badge */}
          <div className="bg-[#0d3d2e]/30 border border-[#00ff9f]/30 rounded-xl p-4 flex items-center gap-4">
            <Shield className="w-10 h-10 text-[#00ff9f]" />
            <div>
              <h4 className="text-[#00ff9f] font-bold">100% Privacy First</h4>
              <p className="text-[#00ff9f]/70 text-sm">Dados financeiros são extremamente sensíveis. No Monnex, eles ficam apenas com você.</p>
            </div>
          </div>

          {/* Why Privacy Matters */}
          <div className="bg-[#3d1a1a]/30 border border-[#ff4757]/30 rounded-xl p-4">
            <h4 className="text-[#ff4757] font-bold mb-2">Por que Privacy First?</h4>
            <p className="text-[#ff4757]/70 text-sm leading-relaxed">
              Apps de finanças populares vendem dados agregados sobre padrões de consumo para empresas de marketing, 
              seguradoras e até instituições financeiras. Seus gastos revelam onde você mora, trabalha, seu estilo de vida e saúde. 
              O Monnex foi criado para quem não aceita esse trade-off.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#1a1a2e] rounded-xl p-4 border border-[#6b4eff]/20">
                <div className="flex items-start gap-3">
                  <feature.icon className="w-5 h-5 text-[#6b4eff] mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                    <p className="text-[#666] text-xs mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-[#6b4eff]/20">
            <h4 className="text-white font-bold mb-3">Stack Tecnológico</h4>
            <div className="flex flex-wrap gap-2">
              {["React / Next.js", "TypeScript", "SQLite", "AES-256 Encryption", "Recharts", "PWA", "IndexedDB Fallback"].map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-[#252540] text-[#6b4eff] text-xs rounded-full border border-[#6b4eff]/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Demo Preview */
        <div className="w-full max-w-sm mx-auto">
          <div className="relative bg-[#0a0a0f] rounded-3xl overflow-hidden shadow-2xl border border-[#1a1a2e]">
            <div className="p-6 pb-0">
              <p className="text-[#888] text-sm text-center mb-4">Inicio</p>
            </div>

            <div className="mx-4 bg-gradient-to-br from-[#6b4eff] to-[#8b5cf6] rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#3d2a6b]/50 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/70 rounded" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Saldo Total</p>
                  <p className="text-white/60 text-xs">Disponivel: R$ 2.427,22</p>
                </div>
              </div>
              
              <p className="text-white text-4xl font-bold mb-2">R$ 52.605,25</p>
              <p className="text-white/70 text-sm mb-4">Contas + Investimentos</p>
              
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex justify-center"
              >
                <ChevronDown className={`w-6 h-6 text-white/60 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="flex gap-3 mx-4 mb-6">
              <div className="flex-1 bg-[#111118] rounded-xl p-4 border border-[#1a1a2e]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0d3d2e] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#00ff9f]" />
                  </div>
                  <div>
                    <p className="text-[#666] text-xs">Resultado do ...</p>
                    <p className="text-[#00ff9f] font-bold">R$ 1.106,05</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-[#111118] rounded-xl p-4 border border-[#1a1a2e]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3d1a1a] rounded-full flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-[#ff4757]" />
                  </div>
                  <div>
                    <p className="text-[#666] text-xs">Gastos do mes</p>
                    <p className="text-[#ff4757] font-bold">R$ 1.586,42</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-4 mb-4 bg-[#111118] rounded-xl p-4 border border-[#1a1a2e]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3d3d0d] rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#ffc107]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Saude Financeira</p>
                    <p className="text-[#ffc107] text-sm">Regular</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#ffc107] text-3xl font-bold">43</span>
                  <span className="text-[#666] text-sm">/100</span>
                </div>
              </div>
              
              <p className="text-[#888] text-xs mb-2">Ha espaco para melhorar. Considere diversificar e aportar com mais frequencia.</p>
              <p className="text-[#666] text-xs">Toque para ver detalhes</p>
            </div>

            <div className="mx-4 mb-6 bg-[#111118] rounded-xl p-4 border border-[#1a1a2e]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0d3d2e] rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#00ff9f]" />
                  </div>
                  <p className="text-white font-medium">Objetivos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#666]" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[#888] text-sm">100k</p>
                <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00ff9f] to-[#ff4757] rounded-full" style={{ width: '53%' }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#888]">R$ 52.810,65 / R$ 100.000,00</span>
                  <span className="text-[#00ff9f] font-bold">53%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-around items-center py-4 bg-[#0a0a0f] border-t border-[#1a1a2e]">
              <button className="flex flex-col items-center gap-1">
                <Home className="w-5 h-5 text-[#6b4eff]" />
                <span className="text-[#6b4eff] text-[10px]">Inicio</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <FileText className="w-5 h-5 text-[#666]" />
                <span className="text-[#666] text-[10px]">Transacoes</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <LineChart className="w-5 h-5 text-[#666]" />
                <span className="text-[#666] text-[10px]">Investir</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <BarChart3 className="w-5 h-5 text-[#666]" />
                <span className="text-[#666] text-[10px]">Relatorios</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Settings className="w-5 h-5 text-[#666]" />
                <span className="text-[#666] text-[10px]">Config</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
