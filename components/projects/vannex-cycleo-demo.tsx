"use client"

import { useState } from "react"
import { Calendar, Flame, Home, BarChart3, Settings, Shield, Database, Lock, Bell, Heart, ChevronRight, Activity, Droplets } from "lucide-react"

const PHASES = [
  { id: "menstrual", label: "Menstrual", days: "1 – 5", color: "#e75480", light: "#ff8fab", bg: "#3d0d1e", emoji: "🔴", desc: "Descamação do endométrio. Priorize descanso, hidratação e calor local." },
  { id: "folicular", label: "Folicular", days: "6 – 13", color: "#f4a261", light: "#ffd09b", bg: "#3d2008", emoji: "🌱", desc: "Estrogênio aumentando. Energia alta — ótimo para exercícios e novos projetos." },
  { id: "ovulacao", label: "Ovulação", days: "14 – 16", color: "#ffd60a", light: "#fff176", bg: "#3d3200", emoji: "✨", desc: "Pico de LH. Janela fértil. Pico de energia e libido." },
  { id: "lutea", label: "Lútea", days: "17 – 28", color: "#b48ded", light: "#d4b4fe", bg: "#2a1a45", emoji: "🌙", desc: "Progesterona sobe. Possível TPM nos dias finais. Priorize autocuidado." },
]

const SYMPTOMS = [
  { label: "Cólica", icon: "⚡", active: true },
  { label: "Humor", icon: "😔", active: true },
  { label: "Fadiga", icon: "😴", active: false },
  { label: "Dor de cabeça", icon: "🤯", active: false },
  { label: "Inchaço", icon: "💧", active: true },
  { label: "Acne", icon: "🔴", active: false },
]

const WEEK = [
  { d: "D", n: 28, past: true },
  { d: "S", n: 1, menstrual: true },
  { d: "T", n: 2, menstrual: true },
  { d: "Q", n: 3, menstrual: true, today: true },
  { d: "Q", n: 4, menstrual: true },
  { d: "S", n: 5 },
  { d: "S", n: 6 },
]

export default function VannexCycleoDemo() {
  const [tab, setTab] = useState<"info" | "preview">("preview")
  const [screen, setScreen] = useState<"home" | "ciclo" | "log">("home")
  const [loggedSymptoms, setLoggedSymptoms] = useState<Set<number>>(new Set([0, 1, 4]))

  const toggleSymptom = (i: number) => {
    setLoggedSymptoms(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const currentPhase = PHASES[0] // menstrual, day 3

  return (
    <div className="space-y-4">
      {/* Tab Nav */}
      <div className="flex gap-2">
        {[["info", "Sobre o Projeto"], ["preview", "Preview da UI"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id as "info" | "preview")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              tab === id ? "bg-[#e75480] text-white" : "bg-[#2d1b3d] text-[#e75480] hover:bg-[#3d2a4a]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <div className="space-y-5">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#2d1b3d] to-[#1a0f24] rounded-xl p-5 border border-[#4a2d5e]/40">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e75480] to-[#a83060] rounded-2xl flex items-center justify-center shadow-lg shadow-[#e75480]/30">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Vannex Cycle</h3>
                <p className="text-[#b8a0c4] text-xs">App de Ciclo Menstrual · Flutter</p>
              </div>
            </div>
            <p className="text-[#b8a0c4] text-sm leading-relaxed">
              Tracker de ciclo menstrual que coloca a privacidade da usuária acima de tudo.
              Enquanto apps populares monetizam dados de saúde, o Vannex Cycle garante que{" "}
              <span className="text-[#e75480] font-semibold">nenhum dado sai do dispositivo</span> — nem para analytics anônimos.
            </p>
          </div>

          {/* Privacy badge */}
          <div className="bg-[#0d3020]/50 border border-[#4caf50]/40 rounded-xl p-4 flex items-center gap-4">
            <Shield className="w-9 h-9 text-[#4caf50] shrink-0" />
            <div>
              <p className="text-[#4caf50] font-bold text-sm">100% Privacy First</p>
              <p className="text-[#4caf50]/70 text-xs mt-0.5">Zero cloud · Zero tracking · Zero ads · Código aberto</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { icon: Database, title: "SQLite Local", desc: "Banco embedded no device. Dados nunca saem do celular." },
              { icon: Lock, title: "Criptografia", desc: "flutter_secure_storage + AES-256 para dados sensíveis." },
              { icon: Activity, title: "Previsão de Ciclo", desc: "Algoritmo local (sem ML em servidor) com histórico pessoal." },
              { icon: Bell, title: "Notificações", desc: "Lembretes de ciclo, ovulação e sintomas. Gerados localmente." },
              { icon: BarChart3, title: "Insights", desc: "Padrões de humor, dor e fluxo com gráficos por ciclo." },
              { icon: Droplets, title: "Log de Sintomas", desc: "Registro diário de sintomas e intensidade de fluxo." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-[#1e1030] rounded-xl p-4 border border-[#4a2d5e]/30 flex items-start gap-3">
                <Icon className="w-5 h-5 text-[#e75480] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{title}</p>
                  <p className="text-[#8b7a95] text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="bg-[#1e1030] rounded-xl p-4 border border-[#4a2d5e]/30">
            <p className="text-white font-bold text-sm mb-3">Stack Tecnológico</p>
            <div className="flex flex-wrap gap-2">
              {["Flutter", "Dart", "SQLite (sqflite)", "flutter_secure_storage", "Provider", "Riverpod", "Local Notifications", "fl_chart"].map((t, i) => (
                <span key={i} className="px-3 py-1 bg-[#2d1b3d] text-[#e75480] text-xs rounded-full border border-[#e75480]/30">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ===== PHONE PREVIEW ===== */
        <div className="flex flex-col items-center gap-3">
          {/* Screen nav */}
          <div className="flex gap-1 bg-[#1a0f24] p-1 rounded-lg">
            {[["home", "🏠 Início"], ["ciclo", "🔴 Ciclo"], ["log", "📝 Log"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setScreen(id as "home" | "ciclo" | "log")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  screen === id ? "bg-[#e75480] text-white" : "text-[#b8a0c4] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Phone frame */}
          <div className="w-full max-w-xs bg-[#120820] rounded-3xl border border-[#4a2d5e]/40 overflow-hidden shadow-2xl shadow-[#e75480]/10">

            {/* Status bar */}
            <div className="flex justify-between items-center px-5 pt-3 pb-1">
              <span className="text-[#6b5178] text-[10px] font-medium">9:41</span>
              <div className="flex gap-1 items-center">
                <span className="text-[#6b5178] text-[9px]">●●●</span>
                <span className="text-[#6b5178] text-[9px]">WiFi</span>
                <span className="text-[#6b5178] text-[9px]">87%</span>
              </div>
            </div>

            {screen === "home" && (
              <div className="px-4 pb-4">
                {/* Header */}
                <div className="flex justify-between items-start py-3">
                  <div>
                    <p className="text-[#b8a0c4] text-xs">quinta-feira, 3 de abril</p>
                    <p className="text-white text-xl font-bold mt-0.5">Olá! 👋</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#e75480]/20 border border-[#e75480]/40 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#e75480]" />
                  </div>
                </div>

                {/* Phase card */}
                <div
                  className="rounded-2xl p-4 mb-3"
                  style={{ background: `linear-gradient(135deg, ${currentPhase.bg} 0%, #1a0f24 100%)`, border: `1px solid ${currentPhase.color}30` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-medium" style={{ color: currentPhase.color }}>Fase Atual</p>
                      <p className="text-white text-lg font-bold">{currentPhase.emoji} {currentPhase.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">Dia 3</p>
                      <p className="text-[10px]" style={{ color: `${currentPhase.color}99` }}>de 28</p>
                    </div>
                  </div>
                  {/* Progress bar cycle */}
                  <div className="h-1.5 bg-[#ffffff15] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "11%", background: currentPhase.color }} />
                  </div>
                  <p className="text-[10px] mt-2" style={{ color: `${currentPhase.color}90` }}>{currentPhase.desc}</p>
                </div>

                {/* Week strip */}
                <div className="bg-[#1e1030] rounded-2xl p-3 mb-3">
                  <div className="flex justify-between">
                    {WEEK.map((w, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[#6b5178] text-[9px]">{w.d}</span>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium"
                          style={{
                            background: w.today ? currentPhase.color : w.menstrual ? `${currentPhase.color}30` : w.past ? "#1e1030" : "#2d1b3d",
                            color: w.today ? "white" : w.menstrual ? currentPhase.light : "#6b5178",
                            border: w.today ? "none" : `1px solid ${w.menstrual ? `${currentPhase.color}40` : "transparent"}`
                          }}
                        >
                          {w.n}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next prediction */}
                <div className="bg-[#1e1030] rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e75480]/15 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[#e75480]" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Próx. ciclo previsto</p>
                      <p className="text-[#b8a0c4] text-[10px]">em 25 dias · ~1 de maio</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6b5178]" />
                </div>
              </div>
            )}

            {screen === "ciclo" && (
              <div className="px-4 pb-4">
                <p className="text-white font-bold text-sm py-3">Fases do Ciclo</p>
                <div className="space-y-2">
                  {PHASES.map((p, i) => (
                    <div
                      key={p.id}
                      className="rounded-xl p-3 border"
                      style={{ background: p.bg, borderColor: `${p.color}30` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.emoji}</span>
                          <div>
                            <p className="text-white text-xs font-semibold">{p.label}</p>
                            <p className="text-[10px]" style={{ color: `${p.color}90` }}>Dias {p.days}</p>
                          </div>
                        </div>
                        {i === 0 && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${p.color}30`, color: p.color }}>
                            AGORA
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] leading-relaxed" style={{ color: `${p.color}80` }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {screen === "log" && (
              <div className="px-4 pb-4">
                <p className="text-white font-bold text-sm py-3">Log de Hoje · Dia 3</p>
                {/* Flow */}
                <div className="bg-[#1e1030] rounded-2xl p-3 mb-3 border border-[#4a2d5e]/30">
                  <p className="text-[#b8a0c4] text-xs mb-2">Intensidade do fluxo</p>
                  <div className="flex gap-2">
                    {["Sem fluxo", "Leve", "Moderado", "Intenso"].map((label, i) => (
                      <button
                        key={i}
                        className="flex-1 py-1.5 rounded-lg text-[9px] font-medium transition-colors"
                        style={{
                          background: i === 2 ? "#e75480" : "#2d1b3d",
                          color: i === 2 ? "white" : "#8b7a95",
                          border: `1px solid ${i === 2 ? "#e75480" : "#4a2d5e40"}`
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Symptoms */}
                <div className="bg-[#1e1030] rounded-2xl p-3 border border-[#4a2d5e]/30">
                  <p className="text-[#b8a0c4] text-xs mb-2">Sintomas</p>
                  <div className="grid grid-cols-3 gap-2">
                    {SYMPTOMS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => toggleSymptom(i)}
                        className="flex flex-col items-center gap-0.5 py-2 rounded-xl text-[9px] transition-all"
                        style={{
                          background: loggedSymptoms.has(i) ? "#e7548020" : "#2d1b3d",
                          color: loggedSymptoms.has(i) ? "#e75480" : "#8b7a95",
                          border: `1px solid ${loggedSymptoms.has(i) ? "#e7548050" : "#4a2d5e30"}`
                        }}
                      >
                        <span className="text-base">{s.icon}</span>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom nav */}
            <div className="flex justify-around items-center py-3 border-t border-[#2d1b3d]" style={{ background: "#0d0818" }}>
              {[
                { id: "home", icon: Home, label: "Início" },
                { id: "ciclo", icon: Calendar, label: "Ciclo" },
                { id: "log", icon: Activity, label: "Log" },
                { id: "stats", icon: BarChart3, label: "Insights" },
                { id: "settings", icon: Settings, label: "Config" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => ["home", "ciclo", "log"].includes(id) && setScreen(id as "home" | "ciclo" | "log")}
                  className="flex flex-col items-center gap-0.5"
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: screen === id ? "#e75480" : "#6b5178" }}
                  />
                  <span className="text-[9px]" style={{ color: screen === id ? "#e75480" : "#6b5178" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-center gap-2 text-[10px] text-[#4caf50]/70 bg-[#0d3020]/30 px-3 py-1.5 rounded-full border border-[#4caf50]/20">
            <Shield className="w-3 h-3 text-[#4caf50]" />
            Todos os dados ficam só no seu dispositivo
          </div>
        </div>
      )}
    </div>
  )
}
