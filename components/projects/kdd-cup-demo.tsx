"use client"

import { useState } from "react"
import { BarChart3, ExternalLink, AlertTriangle, Lightbulb, Shield, Activity } from "lucide-react"

// Real results from held-out 20% test split (binary: normal=0 vs attack=1)
const MODELS = [
  {
    id: "xgb",
    name: "XGBoost",
    type: "Supervisionado",
    typeColor: "#FCE94F",
    precision: 0.9997,
    recall: 0.9992,
    f1: 0.9995,
    rocAuc: 1.0000,
    prAuc: 1.0000,
    color: "#FCE94F",
    badge: "🏆 MELHOR GERAL",
    note: "Scores quase perfeitos são esperados no KDD Cup 1999: ataques DoS geram valores extremos de src_bytes/count trivialmente separáveis com rótulos.",
  },
  {
    id: "iforest",
    name: "Isolation Forest",
    type: "Não-supervisionado",
    typeColor: "#00B4FF",
    precision: 0.8684,
    recall: 0.9709,
    f1: 0.9168,
    rocAuc: 0.9928,
    prAuc: 0.9903,
    color: "#00B4FF",
    badge: "⭐ MELHOR UNSUP.",
    note: "Recall de 97.1% sem nenhum rótulo de treino. Recomendado para cenários cold-start onde rótulos não estão disponíveis.",
  },
  {
    id: "lof",
    name: "LOF",
    type: "Não-supervisionado",
    typeColor: "#A855F7",
    precision: 0.8561,
    recall: 0.8284,
    f1: 0.8420,
    rocAuc: 0.9265,
    prAuc: 0.9000,
    color: "#A855F7",
    badge: null,
    note: "Bom para anomalias locais (pontos em regiões de baixa densidade). Custo computacional alto em datasets grandes — O(n²) em espaço.",
  },
  {
    id: "autoenc",
    name: "Autoencoder",
    type: "Semi-supervisionado",
    typeColor: "#FF8C00",
    precision: 0.9296,
    recall: 0.0229,
    f1: 0.0446,
    rocAuc: 0.9856,
    prAuc: 0.9524,
    color: "#FF8C00",
    badge: "🔬 VER NOTA",
    note: "ROC-AUC=0.986 e PR-AUC=0.952 provam que o sinal é forte. O F1 baixo (4.5%) é um artefato do threshold conservador (μ+2σ) — reduzir o threshold troca precision por recall.",
  },
  {
    id: "ocsvm",
    name: "One-Class SVM",
    type: "Não-supervisionado",
    typeColor: "#888",
    precision: 0.7691,
    recall: 0.2644,
    f1: 0.3935,
    rocAuc: 0.8262,
    prAuc: 0.6711,
    color: "#888",
    badge: "⚠ SUBSAMPLE",
    note: "Treinado em 8k amostras normais (dataset completo é inviável para kernel RBF: O(n²)). A cobertura de treino reduzida explica o recall baixo.",
  },
]

type MetricKey = "f1" | "precision" | "recall" | "rocAuc" | "prAuc"

const METRIC_LABELS: Record<MetricKey, string> = {
  f1: "F1-Score",
  precision: "Precision",
  recall: "Recall",
  rocAuc: "ROC-AUC",
  prAuc: "PR-AUC",
}

const INSIGHTS = [
  {
    icon: "🏆",
    color: "#FCE94F",
    borderColor: "#FCE94F30",
    bgColor: "#FCE94F08",
    title: "XGBoost é trivialmente dominante",
    body: "F1=0.9995 e ROC-AUC=1.000 são esperados: ataques DoS produzem src_bytes e count extremos que qualquer ensemble separa facilmente com rótulos disponíveis. O desafio real são as classes raras (U2R, R2L < 1% do dataset).",
  },
  {
    icon: "⭐",
    color: "#00B4FF",
    borderColor: "#00B4FF30",
    bgColor: "#00B4FF08",
    title: "IsolationForest: melhor unsupervised",
    body: "Recall de 97.1% com zero rótulos de treino é o resultado mais interessante do estudo. Recomendado para ambientes de cold-start em produção, onde rótulos de ataque ainda não existem ou são caros de obter.",
  },
  {
    icon: "🔬",
    color: "#FF8C00",
    borderColor: "#FF8C0030",
    bgColor: "#FF8C0008",
    title: "Autoencoder: sinal forte, threshold errado",
    body: "ROC-AUC=0.986 e PR-AUC=0.952 confirmam que o erro de reconstrução é um excelente sinal de anomalia. O F1 baixo (4.46%) é um artefato do threshold conservador (μ+2σ em dados normais). Reduzir o threshold melhora recall ao custo de precision.",
  },
  {
    icon: "⚠️",
    color: "#FF4400",
    borderColor: "#FF440030",
    bgColor: "#FF440008",
    title: "OneClassSVM: limitação de escalabilidade",
    body: "Underperformance (F1=0.39) causada pelo subsample forçado (8k amostras normais) necessário pelo custo O(n²) do kernel RBF no dataset completo. Não é fraqueza do modelo — é limitação de infra.",
  },
  {
    icon: "📊",
    color: "#A855F7",
    borderColor: "#A855F730",
    bgColor: "#A855F708",
    title: "Features mais discriminativas",
    body: "src_bytes, dst_bytes, count e dst_host_srv_count são as top features do XGBoost. Classes raras U2R e R2L (< 1% dos dados) permanecem o desafio prático para qualquer detector — mesmo com scores globais altos.",
  },
]

export default function KDDCupDemo() {
  const [activeTab, setActiveTab] = useState<"table" | "chart" | "insights">("table")
  const [activeMetric, setActiveMetric] = useState<MetricKey>("f1")
  const [highlightId, setHighlightId] = useState<string | null>(null)

  const sortedByMetric = [...MODELS].sort((a, b) => b[activeMetric] - a[activeMetric])
  const maxVal = Math.max(...MODELS.map(m => m[activeMetric]))

  const fmt = (v: number) => v.toFixed(4)
  const fmtPct = (v: number) => (v * 100).toFixed(2) + "%"

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FCE94F]">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-bold text-sm">KDD Cup 1999 — Anomaly Detection Benchmark</h3>
        </div>
        <a
          href="https://github.com/Awi-24/KDD-Cup-1999-Anomaly-Detection"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#00B4FF] text-xs hover:text-[#FCE94F] transition-colors"
        >
          <ExternalLink className="w-3 h-3" /> GitHub
        </a>
      </div>

      <p className="text-[#FCE94F]/50 text-xs font-mono">
        Tarefa binária: normal=0 vs attack=1 · 20% test split após deduplicação · 494k conexões · 41 features
      </p>

      {/* Tab Nav */}
      <div className="flex gap-0 border-b border-[#FCE94F]/20">
        {([["table", "TABELA"], ["chart", "GRÁFICO"], ["insights", "INSIGHTS"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-1.5 text-xs font-mono transition-colors border-b-2 -mb-px ${
              activeTab === id
                ? "border-[#FCE94F] text-[#FCE94F]"
                : "border-transparent text-[#FCE94F]/40 hover:text-[#FCE94F]/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ===== TAB: TABLE ===== */}
      {activeTab === "table" && (
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#FCE94F]/20">
                  <th className="text-left py-1.5 pr-3 text-[#FCE94F]/50 font-normal">Modelo</th>
                  <th className="text-left py-1.5 pr-3 text-[#FCE94F]/50 font-normal">Tipo</th>
                  <th className="text-right py-1.5 pr-2 text-[#FCE94F]/50 font-normal">Precision</th>
                  <th className="text-right py-1.5 pr-2 text-[#FCE94F]/50 font-normal">Recall</th>
                  <th className="text-right py-1.5 pr-2 text-[#FCE94F]/50 font-normal">F1</th>
                  <th className="text-right py-1.5 pr-2 text-[#FCE94F]/50 font-normal">ROC-AUC</th>
                  <th className="text-right py-1.5 text-[#FCE94F]/50 font-normal">PR-AUC</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-[#FCE94F]/10 cursor-pointer transition-colors"
                    style={{ background: highlightId === m.id ? `${m.color}12` : "transparent" }}
                    onMouseEnter={() => setHighlightId(m.id)}
                    onMouseLeave={() => setHighlightId(null)}
                  >
                    <td className="py-2 pr-3 font-bold" style={{ color: m.color }}>
                      {m.name}
                      {m.badge && <span className="ml-1 text-[9px] opacity-70">{m.badge}</span>}
                    </td>
                    <td className="py-2 pr-3 text-[10px]" style={{ color: m.typeColor + "99" }}>{m.type}</td>
                    <td className="py-2 pr-2 text-right" style={{ color: m.color }}>{fmt(m.precision)}</td>
                    <td className="py-2 pr-2 text-right" style={{ color: m.id === "autoenc" ? "#FF4400" : m.color }}>
                      {m.id === "autoenc" ? <span title="Artefato do threshold">⚠ {fmt(m.recall)}</span> : fmt(m.recall)}
                    </td>
                    <td className="py-2 pr-2 text-right font-bold" style={{ color: m.id === "autoenc" ? "#FF4400" : m.color }}>
                      {fmt(m.f1)}
                    </td>
                    <td className="py-2 pr-2 text-right" style={{ color: m.color }}>{fmt(m.rocAuc)}</td>
                    <td className="py-2 text-right" style={{ color: m.color }}>{fmt(m.prAuc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hover note */}
          {highlightId && (
            <div
              className="p-3 rounded border text-xs transition-all"
              style={{
                borderColor: `${MODELS.find(m => m.id === highlightId)!.color}40`,
                background: `${MODELS.find(m => m.id === highlightId)!.color}08`,
                color: `${MODELS.find(m => m.id === highlightId)!.color}CC`
              }}
            >
              <span className="font-bold">{MODELS.find(m => m.id === highlightId)!.name}:</span>{" "}
              {MODELS.find(m => m.id === highlightId)!.note}
            </div>
          )}

          <p className="text-[#FCE94F]/30 text-[10px] font-mono italic">
            ¹ Autoencoder: baixo recall por threshold conservador (μ+2σ) · ² OneClassSVM: treinado em 8k amostras (limitação O(n²))
          </p>
        </div>
      )}

      {/* ===== TAB: CHART ===== */}
      {activeTab === "chart" && (
        <div className="space-y-4">
          {/* Metric picker */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(METRIC_LABELS) as MetricKey[]).map(k => (
              <button
                key={k}
                onClick={() => setActiveMetric(k)}
                className={`px-3 py-1 text-xs rounded font-mono transition-colors ${
                  activeMetric === k
                    ? "bg-[#FCE94F] text-[#0a0a0f] font-bold"
                    : "border border-[#FCE94F]/30 text-[#FCE94F]/60 hover:text-[#FCE94F]"
                }`}
              >
                {METRIC_LABELS[k]}
              </button>
            ))}
          </div>

          {/* Bars */}
          <div className="space-y-3">
            {sortedByMetric.map((m, rank) => {
              const val = m[activeMetric]
              const barWidth = maxVal > 0 ? (val / maxVal) * 100 : 0
              const isAnomalous = m.id === "autoenc" && (activeMetric === "recall" || activeMetric === "f1")
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FCE94F]/30 font-mono w-4">#{rank + 1}</span>
                      <span className="font-bold" style={{ color: m.color }}>{m.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${m.typeColor}20`, color: m.typeColor }}>
                        {m.type}
                      </span>
                    </div>
                    <span className="font-mono font-bold flex items-center gap-1" style={{ color: isAnomalous ? "#FF4400" : m.color }}>
                      {isAnomalous && <AlertTriangle className="w-3 h-3" />}
                      {fmt(val)}
                    </span>
                  </div>
                  <div className="h-5 bg-[#0a0a0f] rounded overflow-hidden border border-[#FCE94F]/10 relative">
                    <div
                      className="h-full rounded transition-all duration-700 flex items-center justify-end pr-2"
                      style={{
                        width: `${barWidth}%`,
                        background: isAnomalous
                          ? "linear-gradient(90deg, #FF440044, #FF4400)"
                          : `linear-gradient(90deg, ${m.color}55, ${m.color})`,
                        boxShadow: `0 0 8px ${isAnomalous ? "#FF4400" : m.color}66`,
                        minWidth: val > 0 ? "1%" : "0"
                      }}
                    />
                    {isAnomalous && (
                      <span className="absolute left-2 top-0 bottom-0 flex items-center text-[9px] text-[#FF4400] font-mono">
                        threshold artefact — ROC-AUC: {fmt(m.rocAuc)}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Autoencoder note when relevant */}
          {(activeMetric === "recall" || activeMetric === "f1") && (
            <div className="p-3 rounded border border-[#FF8C00]/40 bg-[#FF8C00]/8 text-[#FF8C00]/90 text-xs">
              <span className="font-bold">Autoencoder:</span> F1 baixo é artefato do threshold conservador (μ+2σ).
              ROC-AUC={fmt(MODELS.find(m => m.id === "autoenc")!.rocAuc)} e PR-AUC={fmt(MODELS.find(m => m.id === "autoenc")!.prAuc)} confirmam que o sinal é forte.
              Basta reduzir o threshold para recuperar recall.
            </div>
          )}
        </div>
      )}

      {/* ===== TAB: INSIGHTS ===== */}
      {activeTab === "insights" && (
        <div className="space-y-3">
          {INSIGHTS.map((ins, i) => (
            <div
              key={i}
              className="p-3 rounded border text-xs leading-relaxed"
              style={{ borderColor: ins.borderColor, background: ins.bgColor }}
            >
              <p className="font-bold mb-1" style={{ color: ins.color }}>
                {ins.icon} {ins.title}
              </p>
              <p style={{ color: ins.color + "BB" }}>{ins.body}</p>
            </div>
          ))}

          <div className="p-3 rounded border border-[#FCE94F]/20 bg-[#FCE94F]/5 text-xs">
            <p className="text-[#FCE94F]/70 font-bold mb-1">📁 Estrutura do estudo</p>
            <p className="text-[#FCE94F]/50 font-mono text-[10px]">
              5 notebooks: EDA → Preprocessing → Baselines (IF/LOF/OCSVM) → Advanced (XGB + Autoencoder) → Evaluation
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
