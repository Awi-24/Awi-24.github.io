"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Home, FileText, LineChart, BarChart3, Settings, Target, ChevronRight, Shield, Database, Lock, PieChart, Zap, CreditCard, Wallet } from "lucide-react"

const CATEGORIES = [
  { label: "Alimentação", icon: "🍔", spent: 680, budget: 800, color: "#f4a261" },
  { label: "Transporte", icon: "🚗", spent: 320, budget: 400, color: "#4fc3f7" },
  { label: "Lazer", icon: "🎮", spent: 210, budget: 200, color: "#e75480" },
  { label: "Saúde", icon: "💊", spent: 150, budget: 300, color: "#4caf50" },
  { label: "Moradia", icon: "🏠", spent: 1200, budget: 1200, color: "#b48ded" },
  { label: "Outros", icon: "📦", spent: 226, budget: 300, color: "#888" },
]

const TRANSACTIONS = [
  { label: "Supermercado Extra", cat: "Alimentação", icon: "🛒", value: -187.40, date: "Hoje", color: "#f4a261" },
  { label: "Uber", cat: "Transporte", icon: "🚗", value: -23.90, date: "Hoje", color: "#4fc3f7" },
  { label: "Steam", cat: "Lazer", icon: "🎮", value: -59.99, date: "Ontem", color: "#e75480" },
  { label: "Salário Ford", cat: "Receita", icon: "💼", value: 7200.00, date: "01/04", color: "#4caf50" },
  { label: "Farmácia", cat: "Saúde", icon: "💊", value: -45.80, date: "31/03", color: "#4caf50" },
]

const SCORE_ITEMS = [
  { label: "Reserva de emergência", ok: true },
  { label: "Gasto < 80% da receita", ok: true },
  { label: "Meta mensal atingida", ok: false },
  { label: "Investimento regular", ok: false },
]

export default function MonnexDemo() {
  const [tab, setTab] = useState<"info" | "preview">("preview")
  const [screen, setScreen] = useState<"home" | "gastos" | "metas">("home")

  const totalSpent = CATEGORIES.reduce((a, c) => a + c.spent, 0)
  const totalBudget = CATEGORIES.reduce((a, c) => a + c.budget, 0)
  const score = 62

  const scoreColor = score >= 70 ? "#4caf50" : score >= 40 ? "#ffc107" : "#ef5350"
  const scoreLabel = score >= 70 ? "Bom" : score >= 40 ? "Regular" : "Atenção"

  return (
    <div className="space-y-4">
      {/* Tab Nav */}
      <div className="flex gap-2">
        {[["info", "Sobre o Projeto"], ["preview", "Preview da UI"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id as "info" | "preview")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              tab === id ? "bg-[#6b4eff] text-white" : "bg-[#1a1a2e] text-[#6b4eff] hover:bg-[#252540]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <div className="space-y-5">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] rounded-xl p-5 border border-[#6b4eff]/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6b4eff] to-[#8b5cf6] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6b4eff]/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Monnex</h3>
                <p className="text-[#888] text-xs">Finanças Pessoais · Flutter</p>
              </div>
            </div>
            <p className="text-[#888] text-sm leading-relaxed">
              App de gestão financeira pessoal com foco absoluto em privacidade.
              Enquanto apps populares monetizam padrões de consumo, o Monnex garante que{" "}
              <span className="text-[#6b4eff] font-semibold">seus dados financeiros jamais saiam do seu dispositivo</span>.
            </p>
          </div>

          {/* Privacy badge */}
          <div className="bg-[#0d3020]/50 border border-[#4caf50]/40 rounded-xl p-4 flex items-center gap-4">
            <Shield className="w-9 h-9 text-[#4caf50] shrink-0" />
            <div>
              <p className="text-[#4caf50] font-bold text-sm">100% Privacy First</p>
              <p className="text-[#4caf50]/70 text-xs mt-0.5">Zero cloud · Zero analytics · Zero ads · Sem acesso à internet</p>
            </div>
          </div>

          {/* Why privacy matters */}
          <div className="bg-[#2a0d0d]/50 border border-[#ef5350]/30 rounded-xl p-4">
            <p className="text-[#ef5350] font-bold text-sm mb-1">Por que Privacy First?</p>
            <p className="text-[#ef5350]/70 text-xs leading-relaxed">
              Apps financeiros vendem dados de consumo para seguradoras, marketeiros e bancos.
              Seus gastos revelam onde você mora, trabalha e sua saúde financeira.
              O Monnex foi criado pra quem não aceita esse trade-off.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { icon: Database, title: "SQLite Criptografado", desc: "Banco embedded com AES-256. Dados nunca saem do device." },
              { icon: Lock, title: "flutter_secure_storage", desc: "Chaves e dados sensíveis protegidos pelo Keychain/Keystore." },
              { icon: PieChart, title: "Gastos por Categoria", desc: "Categorização automática com gráficos mensais interativos." },
              { icon: Target, title: "Metas Financeiras", desc: "Objetivos de economia com projeções baseadas no histórico." },
              { icon: Zap, title: "Score de Saúde", desc: "Score local 0-100 baseado em diversificação, poupança e gastos." },
              { icon: CreditCard, title: "Multi-conta", desc: "Suporte a múltiplas contas: corrente, poupança, investimentos." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-[#111118] rounded-xl p-4 border border-[#6b4eff]/20 flex items-start gap-3">
                <Icon className="w-5 h-5 text-[#6b4eff] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{title}</p>
                  <p className="text-[#666] text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="bg-[#111118] rounded-xl p-4 border border-[#6b4eff]/20">
            <p className="text-white font-bold text-sm mb-3">Stack Tecnológico</p>
            <div className="flex flex-wrap gap-2">
              {["Flutter", "Dart", "SQLite (sqflite)", "flutter_secure_storage", "Riverpod", "fl_chart", "intl", "path_provider"].map((t, i) => (
                <span key={i} className="px-3 py-1 bg-[#1a1a2e] text-[#6b4eff] text-xs rounded-full border border-[#6b4eff]/30">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ===== PHONE PREVIEW ===== */
        <div className="flex flex-col items-center gap-3">
          {/* Screen nav */}
          <div className="flex gap-1 bg-[#0d0d1a] p-1 rounded-lg">
            {[["home", "🏠 Início"], ["gastos", "📊 Gastos"], ["metas", "🎯 Metas"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setScreen(id as "home" | "gastos" | "metas")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  screen === id ? "bg-[#6b4eff] text-white" : "text-[#666] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Phone frame */}
          <div className="w-full max-w-xs bg-[#080810] rounded-3xl border border-[#1a1a2e] overflow-hidden shadow-2xl shadow-[#6b4eff]/10">

            {/* Status bar */}
            <div className="flex justify-between items-center px-5 pt-3 pb-1">
              <span className="text-[#333] text-[10px] font-medium">9:41</span>
              <div className="flex gap-1 items-center">
                <span className="text-[#333] text-[9px]">●●●  WiFi  87%</span>
              </div>
            </div>

            {screen === "home" && (
              <div className="px-4 pb-4">
                <p className="text-[#666] text-xs pt-2 pb-1">Início</p>

                {/* Balance card */}
                <div className="bg-gradient-to-br from-[#6b4eff] to-[#8b5cf6] rounded-2xl p-4 mb-3">
                  <p className="text-white/70 text-xs mb-0.5">Saldo Total</p>
                  <p className="text-white text-3xl font-bold">R$ 52.605,25</p>
                  <p className="text-white/60 text-xs mb-3">Contas + Investimentos</p>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#4caf50]" />
                      <div>
                        <p className="text-white/60 text-[9px]">Resultado mês</p>
                        <p className="text-[#4caf50] text-xs font-bold">+R$ 1.106</p>
                      </div>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-[#ef5350]" />
                      <div>
                        <p className="text-white/60 text-[9px]">Gastos mês</p>
                        <p className="text-[#ef5350] text-xs font-bold">-R$ 2.786</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="bg-[#111118] rounded-2xl p-3 mb-3 border border-[#1a1a2e]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-medium">Saúde Financeira</p>
                      <p className="text-xs mt-0.5" style={{ color: `${scoreColor}` }}>{scoreLabel}</p>
                      <p className="text-[#555] text-[9px] mt-0.5">Diversifique e aporte com mais frequência</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold" style={{ color: scoreColor }}>{score}</span>
                      <span className="text-[#555] text-sm">/100</span>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: scoreColor }} />
                  </div>
                </div>

                {/* Last transactions */}
                <div className="bg-[#111118] rounded-2xl p-3 border border-[#1a1a2e]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-xs font-medium">Últimas transações</p>
                    <ChevronRight className="w-3 h-3 text-[#555]" />
                  </div>
                  {TRANSACTIONS.slice(0, 3).map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-t border-[#1a1a2e] first:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{t.icon}</span>
                        <div>
                          <p className="text-white text-[10px] font-medium">{t.label}</p>
                          <p className="text-[#555] text-[9px]">{t.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${t.value > 0 ? "text-[#4caf50]" : "text-[#ef5350]"}`}>
                        {t.value > 0 ? "+" : ""}R$ {Math.abs(t.value).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {screen === "gastos" && (
              <div className="px-4 pb-4">
                <p className="text-white font-bold text-xs pt-2 pb-3">Gastos de Abril</p>

                {/* Total bar */}
                <div className="bg-[#111118] rounded-2xl p-3 mb-3 border border-[#1a1a2e]">
                  <div className="flex justify-between mb-1">
                    <p className="text-[#888] text-xs">Total gasto</p>
                    <p className="text-white text-xs font-bold">R$ {totalSpent.toLocaleString("pt-BR")} <span className="text-[#555] font-normal">/ R$ {totalBudget.toLocaleString("pt-BR")}</span></p>
                  </div>
                  <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#6b4eff] to-[#8b5cf6]" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  {CATEGORIES.map((c, i) => {
                    const pct = Math.min((c.spent / c.budget) * 100, 100)
                    const over = c.spent > c.budget
                    return (
                      <div key={i} className="bg-[#111118] rounded-xl p-3 border border-[#1a1a2e]">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{c.icon}</span>
                            <p className="text-white text-xs">{c.label}</p>
                          </div>
                          <p className="text-xs" style={{ color: over ? "#ef5350" : "#888" }}>
                            R$ {c.spent} <span className="text-[#555]">/ {c.budget}</span>
                          </p>
                        </div>
                        <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: over ? "#ef5350" : c.color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {screen === "metas" && (
              <div className="px-4 pb-4">
                <p className="text-white font-bold text-xs pt-2 pb-3">Metas</p>

                {/* Main goal */}
                <div className="bg-[#111118] rounded-2xl p-4 mb-3 border border-[#6b4eff]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-[#6b4eff]/20 rounded-xl flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#6b4eff]" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Meta principal</p>
                      <p className="text-[#6b4eff] text-xs">R$ 100.000</p>
                    </div>
                  </div>
                  <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden mb-1.5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#6b4eff] to-[#4caf50]" style={{ width: "53%" }} />
                  </div>
                  <div className="flex justify-between text-[9px]">
                    <span className="text-[#888]">R$ 52.810 acumulado</span>
                    <span className="text-[#6b4eff] font-bold">53%</span>
                  </div>
                </div>

                {/* Score checklist */}
                <div className="bg-[#111118] rounded-2xl p-3 border border-[#1a1a2e]">
                  <p className="text-white text-xs font-medium mb-2">Score · {score}/100</p>
                  {SCORE_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 border-t border-[#1a1a2e] first:border-0">
                      <span className="text-sm">{item.ok ? "✅" : "⬜"}</span>
                      <p className={`text-xs ${item.ok ? "text-[#4caf50]" : "text-[#555]"}`}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom nav */}
            <div className="flex justify-around items-center py-3 border-t border-[#111118]" style={{ background: "#06060e" }}>
              {[
                { id: "home", icon: Home, label: "Início" },
                { id: "gastos", icon: PieChart, label: "Gastos" },
                { id: "inv", icon: LineChart, label: "Investir" },
                { id: "metas", icon: Target, label: "Metas" },
                { id: "settings", icon: Settings, label: "Config" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => ["home", "gastos", "metas"].includes(id) && setScreen(id as "home" | "gastos" | "metas")}
                  className="flex flex-col items-center gap-0.5"
                >
                  <Icon className="w-4 h-4" style={{ color: screen === id ? "#6b4eff" : "#444" }} />
                  <span className="text-[9px]" style={{ color: screen === id ? "#6b4eff" : "#444" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-center gap-2 text-[10px] text-[#4caf50]/70 bg-[#0d3020]/30 px-3 py-1.5 rounded-full border border-[#4caf50]/20">
            <Shield className="w-3 h-3 text-[#4caf50]" />
            Dados financeiros ficam só no seu dispositivo
          </div>
        </div>
      )}
    </div>
  )
}
