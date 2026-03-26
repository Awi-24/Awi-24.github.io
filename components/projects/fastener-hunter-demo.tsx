"use client"

import { useState } from "react"
import { Search, Database, Bot, CheckCircle, AlertTriangle, ChevronRight, Layers, Filter, Cpu } from "lucide-react"

const SAMPLE_RESULTS = [
  {
    baseNumber: "W500412-S442",
    type: "Hex Bolt",
    size: "M8x1.25x25",
    material: "10.9 Steel",
    coating: "Zinc",
    score: 97.3,
    sources: ["GFDS", "COSTING"],
  },
  {
    baseNumber: "W500413-S442",
    type: "Hex Bolt",
    size: "M8x1.25x30",
    material: "10.9 Steel",
    coating: "Zinc",
    score: 89.1,
    sources: ["GFDS", "WERS"],
  },
  {
    baseNumber: "W500414-S443",
    type: "Hex Bolt",
    size: "M8x1.25x25",
    material: "10.9 Steel",
    coating: "Dacromet",
    score: 82.4,
    sources: ["WERS"],
  },
  {
    baseNumber: "W711823-S437",
    type: "Hex Flange Bolt",
    size: "M8x1.25x25",
    material: "10.9 Steel",
    coating: "Zinc",
    score: 71.8,
    sources: ["GFDS"],
  },
]

type Fastener = typeof SAMPLE_RESULTS[0]

const ASSESSMENT_TEMPLATE = (f: Fastener) => `RELATÓRIO DE SUBSTITUIÇÃO — ${f.baseNumber}

COMPATIBILIDADE GERAL: ${f.score.toFixed(1)}%
Tipo: ${f.type} ${f.size} | ${f.material} | ${f.coating}

⚠ RISCOS IDENTIFICADOS
• ${f.coating === "Dacromet" ? "Revestimento Dacromet: maior resistência à corrosão — verificar compatibilidade com fluidos da linha" : "Revestimento Zinc: adequado para ambiente seco — confirmar se há exposição a fluidos"}
• Torque máximo pode variar ±5–8% vs especificação original — validar com engenharia de produto

💡 OPORTUNIDADES
• ${f.sources.length > 1 ? `Base Number disponível em ${f.sources.join(" e ")}: consolidação de fornecedor possível` : `Fonte única (${f.sources[0]}): considerar homologação em DB secundário`}
• ${f.score > 90 ? "Similaridade alta (>90%): candidato preferencial para substituição imediata" : f.score > 80 ? "Similaridade boa — adequado como substituto com validação mínima" : "Similaridade moderada — recomenda-se teste antes da implementação"}

🔧 ANÁLISE TÉCNICA
Classe de resistência ${f.material}: equivalente à especificação original.
Dimensões ${f.size} dentro da tolerância dimensional.
Verificar especificações de montagem (torque + ângulo) antes da aplicação em linha.`

type Phase = "idle" | "scoring" | "results" | "assessment"

export default function FastenerHunterDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [phase, setPhase] = useState<Phase>("idle")
  const [scoringStep, setScoringStep] = useState(0)
  const [results, setResults] = useState<Fastener[]>([])
  const [selected, setSelected] = useState<Fastener | null>(null)
  const [assessmentText, setAssessmentText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showArch, setShowArch] = useState(false)

  const runSearch = () => {
    if (!searchTerm) return
    setPhase("scoring")
    setScoringStep(0)
    setResults([])
    setSelected(null)
    setAssessmentText("")

    // Simulate scoring layer step-by-step
    const steps = [0, 1, 2, 3]
    steps.forEach((step) => {
      setTimeout(() => {
        setScoringStep(step + 1)
        if (step === 3) {
          setTimeout(() => {
            setResults(SAMPLE_RESULTS)
            setPhase("results")
          }, 400)
        }
      }, (step + 1) * 320)
    })
  }

  const runAssessment = (f: Fastener) => {
    setSelected(f)
    setPhase("assessment")
    setIsTyping(true)
    setAssessmentText("")
    const text = ASSESSMENT_TEMPLATE(f)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setAssessmentText(text.slice(0, i + 1))
        i += 3 // faster typing
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 8)
  }

  const reset = () => {
    setPhase("results")
    setSelected(null)
    setAssessmentText("")
  }

  const scoreColor = (s: number) =>
    s >= 90 ? "#FCE94F" : s >= 80 ? "#00B4FF" : s >= 70 ? "#FF8C00" : "#888"

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#FCE94F]" />
          <h3 className="font-bold text-[#FCE94F]">Fastener Hunter</h3>
          <span className="text-xs text-[#FF4400] bg-[#FF4400]/10 px-2 py-0.5 rounded font-mono">RAG · 3 DBs</span>
        </div>
        <button
          onClick={() => setShowArch(v => !v)}
          className="flex items-center gap-1 text-[#00B4FF]/60 hover:text-[#00B4FF] text-xs transition-colors"
        >
          <Layers className="w-3 h-3" /> arquitetura
        </button>
      </div>

      {/* Architecture diagram (toggle) */}
      {showArch && (
        <div className="bg-[#0a0a0f] border border-[#FCE94F]/20 rounded-lg p-4 text-xs font-mono space-y-2">
          <p className="text-[#FCE94F]/60 mb-3">Pipeline de 2 camadas (RAG)</p>
          <div className="flex flex-col gap-1.5">
            {[
              { icon: <Search className="w-3 h-3" />, label: "Input", desc: "Base Number de referência", color: "#FCE94F" },
              { icon: <Filter className="w-3 h-3" />, label: "Camada 1 — Score matemático", desc: "Normalização + similaridade vetorial em GFDS, WERS e COSTING. DB unificado grande demais pro LLM processar diretamente.", color: "#00B4FF" },
              { icon: <Database className="w-3 h-3" />, label: "Top-N candidatos", desc: "Apenas os fixadores com maior score são passados adiante", color: "#00B4FF" },
              { icon: <Cpu className="w-3 h-3" />, label: "Camada 2 — LLM Assessment", desc: "Candidatos ranqueados + contexto técnico → análise de riscos, oportunidades e recomendação", color: "#FF4400" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-0.5 shrink-0" style={{ color: step.color }}>{step.icon}</div>
                <div>
                  <span className="font-bold" style={{ color: step.color }}>{step.label}</span>
                  <span className="text-[#666] ml-1">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Digite o Base Number (ex: W500412)"
            className="w-full bg-[#0a0a0f] border border-[#FCE94F]/30 rounded-lg px-4 py-3 text-[#FCE94F] text-sm placeholder:text-[#FCE94F]/30 focus:border-[#FCE94F] focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FCE94F]/30" />
        </div>
        <button
          onClick={runSearch}
          disabled={phase === "scoring" || !searchTerm}
          className="px-4 py-2 bg-[#FF4400] text-white rounded-lg font-bold text-sm hover:bg-[#FF4400]/80 disabled:opacity-40 transition-all"
        >
          Buscar
        </button>
      </div>

      {/* === PHASE: SCORING === */}
      {phase === "scoring" && (
        <div className="bg-[#0a0a0f] rounded-lg border border-[#00B4FF]/20 p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#00B4FF] text-sm mb-1">
            <Filter className="w-4 h-4 animate-pulse" />
            <span className="font-bold">Camada 1 — Score de Similaridade</span>
          </div>
          {[
            { label: "Consultando GFDS", done: scoringStep >= 1 },
            { label: "Consultando WERS", done: scoringStep >= 2 },
            { label: "Consultando COSTING DB", done: scoringStep >= 3 },
            { label: "Calculando scores e ranqueando candidatos", done: scoringStep >= 4 },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {step.done ? (
                <CheckCircle className="w-3.5 h-3.5 text-[#00B4FF] shrink-0" />
              ) : i === scoringStep ? (
                <div className="w-3.5 h-3.5 border border-[#00B4FF] border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 border border-[#555] rounded-full shrink-0" />
              )}
              <span style={{ color: step.done ? "#00B4FF" : i === scoringStep ? "#00B4FF99" : "#555" }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* === PHASE: RESULTS === */}
      {phase === "results" && results.length > 0 && (
        <div className="bg-[#0a0a0f] rounded-lg border border-[#FCE94F]/20 p-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#FCE94F]/60 text-xs font-mono">{results.length} candidatos ranqueados por similaridade</span>
            <span className="text-[#00B4FF] text-xs">→ Clique para Assessment LLM</span>
          </div>
          {results.map((f, i) => (
            <button
              key={f.baseNumber}
              onClick={() => runAssessment(f)}
              className="w-full text-left bg-[#111118] border border-[#FCE94F]/10 rounded-lg p-3 hover:border-[#FCE94F]/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#FCE94F] font-mono text-sm font-bold">{f.baseNumber}</p>
                    <div className="flex gap-1">
                      {f.sources.map(s => (
                        <span key={s} className="text-[9px] px-1 rounded" style={{ background: "#00B4FF20", color: "#00B4FF" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#FCE94F]/40 text-xs mt-0.5">{f.type} · {f.size} · {f.coating}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm" style={{ color: scoreColor(f.score) }}>{f.score.toFixed(1)}%</p>
                    <p className="text-[9px] text-[#555]">similaridade</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#FCE94F]/20 group-hover:text-[#FCE94F] transition-colors" />
                </div>
              </div>
              {/* score bar */}
              <div className="mt-2 h-0.5 bg-[#222] rounded overflow-hidden">
                <div className="h-full rounded" style={{ width: `${f.score}%`, background: scoreColor(f.score) }} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* === PHASE: ASSESSMENT === */}
      {phase === "assessment" && selected && (
        <div className="space-y-3">
          {/* Selected card */}
          <div className="bg-[#0a0a0f] rounded-lg border border-[#FCE94F]/30 p-3 flex items-center justify-between">
            <div>
              <p className="text-[#FCE94F] font-mono font-bold text-sm">{selected.baseNumber}</p>
              <p className="text-[#FCE94F]/40 text-xs">{selected.type} · {selected.size} · {selected.coating}</p>
            </div>
            <span className="font-mono font-bold text-lg" style={{ color: scoreColor(selected.score) }}>
              {selected.score.toFixed(1)}%
            </span>
          </div>

          {/* LLM label */}
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#FF4400]" />
            <span className="text-[#FF4400] text-sm font-bold">Camada 2 — Assessment LLM</span>
            {isTyping && <span className="w-1.5 h-4 bg-[#FF4400] animate-pulse rounded-sm" />}
          </div>

          {/* Assessment output */}
          <div className="bg-[#0a0a0f] rounded-lg border border-[#FF4400]/20 p-4">
            <pre className="text-[#FCE94F]/80 text-xs font-mono whitespace-pre-wrap leading-relaxed">
              {assessmentText}
            </pre>
          </div>

          {/* Checklist (appears after typing) */}
          {!isTyping && (
            <div className="bg-[#0a0a0f] rounded-lg border border-[#FCE94F]/10 p-3">
              <p className="text-[#FCE94F]/40 text-xs mb-2 font-mono">CHECKLIST DE VALIDAÇÃO</p>
              {["Confirmar compatibilidade dimensional", "Validar classe de resistência", "Checar revestimento para o ambiente", "Verificar torque especificado", "Aprovar com engenharia de produto"].map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00B4FF] shrink-0" />
                  <span className="text-[#FCE94F]/50 text-xs">{s}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={reset} className="text-[#FCE94F]/40 hover:text-[#FCE94F] text-xs transition-colors">
            ← Voltar aos resultados
          </button>
        </div>
      )}

      {/* Empty state */}
      {phase === "idle" && (
        <div className="bg-[#0a0a0f] rounded-lg border border-[#FCE94F]/10 p-6 text-center space-y-1">
          <Search className="w-8 h-8 text-[#FCE94F]/15 mx-auto mb-2" />
          <p className="text-[#FCE94F]/40 text-sm">Digite um Base Number para buscar</p>
          <p className="text-[#FCE94F]/20 text-xs">ex: W500412 · busca em GFDS, WERS e COSTING</p>
        </div>
      )}
    </div>
  )
}
