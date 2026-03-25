"use client"

import { useState, useEffect } from "react"
import { Calendar, Flame, ChevronRight, Home, BarChart3, Settings, Shield, Database, Smartphone, Bell, Lock } from "lucide-react"

export default function VannexCycleoDemo() {
  const [activeTab, setActiveTab] = useState<"demo" | "info">("info")
  const [currentDay] = useState(8)
  const [cycleProgress, setCycleProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleProgress(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const weekDays = [
    { day: "d", date: 15 },
    { day: "s", date: 16 },
    { day: "t", date: 17 },
    { day: "q", date: 18, highlight: true },
    { day: "q", date: 19, active: true },
    { day: "s", date: 20 },
    { day: "s", date: 21 },
    { day: "d", date: 22 },
  ]

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 2
  }))

  const features = [
    { icon: Shield, title: "Privacy First", desc: "Dados armazenados apenas localmente no dispositivo. Sem servidores, sem cloud, sem tracking." },
    { icon: Database, title: "SQLite Local", desc: "Banco de dados SQLite embedded. Seus dados nunca saem do seu celular." },
    { icon: Lock, title: "Criptografia", desc: "Dados sensíveis criptografados com AES-256. Proteção por biometria opcional." },
    { icon: Bell, title: "Notificações Inteligentes", desc: "Lembretes de ciclo, janela fértil e sintomas baseados no seu histórico." },
    { icon: BarChart3, title: "Insights Personalizados", desc: "ML local para previsões de ciclo cada vez mais precisas com o uso." },
    { icon: Smartphone, title: "React Native", desc: "App nativo para iOS e Android com performance otimizada." },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
            activeTab === "info" 
              ? "bg-[#e75480] text-white" 
              : "bg-[#2d1b3d] text-[#e75480] hover:bg-[#3d2a4a]"
          }`}
        >
          Sobre o Projeto
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
            activeTab === "demo" 
              ? "bg-[#e75480] text-white" 
              : "bg-[#2d1b3d] text-[#e75480] hover:bg-[#3d2a4a]"
          }`}
        >
          Preview da Interface
        </button>
      </div>

      {activeTab === "info" ? (
        <div className="space-y-6">
          {/* Project Header */}
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a0f24] rounded-xl p-6 border border-[#4a2d5e]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e75480] to-[#a65d7a] rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Vannex Cycleo</h3>
                <p className="text-[#b8a0c4] text-sm">App de Ciclo Menstrual</p>
              </div>
            </div>
            <p className="text-[#b8a0c4] text-sm leading-relaxed">
              Aplicativo de rastreamento de ciclo menstrual focado em privacidade. Diferente de apps populares que vendem dados para terceiros, 
              o Vannex Cycleo mantém todas as informações sensíveis <span className="text-[#e75480] font-medium">exclusivamente no dispositivo da usuária</span>.
            </p>
          </div>

          {/* Privacy Badge */}
          <div className="bg-[#0d3d2e]/30 border border-[#00ff9f]/30 rounded-xl p-4 flex items-center gap-4">
            <Shield className="w-10 h-10 text-[#00ff9f]" />
            <div>
              <h4 className="text-[#00ff9f] font-bold">100% Privacy First</h4>
              <p className="text-[#00ff9f]/70 text-sm">Zero dados enviados para servidores. Zero tracking. Zero ads. Seus dados são só seus.</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#1a1a2e] rounded-xl p-4 border border-[#4a2d5e]/30">
                <div className="flex items-start gap-3">
                  <feature.icon className="w-5 h-5 text-[#e75480] mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                    <p className="text-[#8b7a95] text-xs mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-[#4a2d5e]/30">
            <h4 className="text-white font-bold mb-3">Stack Tecnológico</h4>
            <div className="flex flex-wrap gap-2">
              {["React Native", "TypeScript", "SQLite", "Expo", "AES-256 Encryption", "Local ML", "Biometric Auth"].map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-[#2d1b3d] text-[#e75480] text-xs rounded-full border border-[#e75480]/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Demo Preview */
        <div className="w-full max-w-sm mx-auto">
          <div className="relative bg-gradient-to-b from-[#2d1b3d] to-[#1a0f24] rounded-3xl overflow-hidden shadow-2xl border border-[#4a2d5e]/30">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full bg-[#e75480]/40 animate-pulse"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`
                }}
              />
            ))}

            <div className="p-6 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-2xl font-bold">Ola!</span>
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-[#b8a0c4] text-sm">quinta-feira, 19 marco</p>
                </div>
                <button className="p-2 border border-[#4a2d5e] rounded-lg">
                  <Calendar className="w-5 h-5 text-[#b8a0c4]" />
                </button>
              </div>
            </div>

            <div className="flex justify-between px-4 py-3">
              {weekDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[#6b5178] text-xs">{d.day}</span>
                  <div className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    d.highlight 
                      ? "bg-[#8b7355] text-white" 
                      : d.active 
                        ? "bg-[#a65d7a] text-white"
                        : "bg-[#3d2a4a] text-[#8b7a95]"
                  }`}>
                    {d.date}
                    {d.highlight && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex items-center justify-center py-8">
              <div 
                className="absolute w-56 h-56 rounded-full"
                style={{
                  background: `conic-gradient(from ${cycleProgress}deg, transparent 0%, #e75480 25%, #a65d7a 50%, transparent 75%)`,
                  opacity: 0.3,
                  filter: 'blur(20px)'
                }}
              />
              
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-[#3d2a4a] to-[#2d1b3d] flex items-center justify-center border-4 border-[#e75480]/50 shadow-lg shadow-[#e75480]/20">
                <div className="text-center">
                  <p className="text-5xl font-bold text-white">Dia {currentDay}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-[#e75480] font-medium text-sm">Janela Fertil</span>
                  </div>
                </div>
                
                <div className="absolute bottom-3 bg-[#3d2a4a] px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">0%</span>
                </div>
              </div>

              <div className="absolute bottom-2">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
            </div>

            <div className="mx-4 mb-4 bg-gradient-to-r from-[#3d2a4a] to-[#4a2d5e] rounded-2xl p-4 border border-[#5a3d6a]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#4a5d3a] rounded-lg flex items-center justify-center text-sm">
                    🌱
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Iniciante</p>
                    <p className="text-[#8b7a95] text-xs">65 pts para Em progresso</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#e75480] font-bold text-sm">10 pts</span>
                  <ChevronRight className="w-4 h-4 text-[#8b7a95]" />
                </div>
              </div>
              
              <div className="mt-3 h-1.5 bg-[#2d1b3d] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#e75480] to-[#a65d7a] rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="relative flex justify-around items-center py-4 bg-[#2d1b3d]/50 border-t border-[#4a2d5e]/30">
              <button className="flex flex-col items-center gap-1 px-3 py-2 bg-[#e75480]/20 rounded-xl">
                <Home className="w-4 h-4 text-[#e75480]" />
                <span className="text-[#e75480] text-[10px]">Inicio</span>
              </button>
              <button className="flex flex-col items-center gap-1 px-3 py-2">
                <Calendar className="w-4 h-4 text-[#8b7a95]" />
                <span className="text-[#8b7a95] text-[10px]">Calendario</span>
              </button>
              
              <div className="w-12 h-12 bg-gradient-to-br from-[#e75480] to-[#a65d7a] rounded-full flex items-center justify-center shadow-lg shadow-[#e75480]/30 -mt-6">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#e75480] rounded-full" />
                </div>
              </div>
              
              <button className="flex flex-col items-center gap-1 px-3 py-2">
                <BarChart3 className="w-4 h-4 text-[#8b7a95]" />
                <span className="text-[#8b7a95] text-[10px]">Insights</span>
              </button>
              <button className="flex flex-col items-center gap-1 px-3 py-2">
                <Settings className="w-4 h-4 text-[#8b7a95]" />
                <span className="text-[#8b7a95] text-[10px]">Config</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
