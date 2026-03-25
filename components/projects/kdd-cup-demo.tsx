"use client"

import { useState } from "react"
import { BarChart3, ExternalLink, Trophy, Target, Shield, Zap } from "lucide-react"

const MODELS = [
  {
    id: "rf",
    name: "Random Forest",
    accuracy: 99.93,
    precision: 99.91,
    recall: 99.95,
    f1: 99.93,
    trainingTime: "4.2s",
    color: "#FCE94F",
    desc: "Ensemble de 100 árvores. Melhor balanço geral entre precisão e tempo de treino.",
    badge: "🏆 MELHOR"
  },
  {
    id: "dt",
    name: "Decision Tree",
    accuracy: 99.87,
    precision: 99.84,
    recall: 99.90,
    f1: 99.87,
    trainingTime: "0.8s",
    color: "#00B4FF",
    desc: "Mais rápido para treinar. Interpretável. Ligeira queda em precision vs RF.",
    badge: "⚡ MAIS RÁPIDO"
  },
  {
    id: "nb",
    name: "Naive Bayes",
    accuracy: 92.41,
    precision: 95.12,
    recall: 89.30,
    f1: 92.11,
    trainingTime: "0.1s",
    color: "#FF4400",
    desc: "Simples e ultrarrápido. Assume independência entre features — limita recall.",
    badge: "📉 BASELINE"
  },
  {
    id: "knn",
    name: "K-Nearest Neighbors",
    accuracy: 99.76,
    precision: 99.70,
    recall: 99.82,
    f1: 99.76,
    trainingTime: "0.02s",
    color: "#A855F7",
    desc: "Alta acurácia mas custo quadrático em predição. Sem treino, alto custo de inferência.",
    badge: null
  },
  {
    id: "nn",
    name: "Neural Network (MLP)",
    accuracy: 99.81,
    precision: 99.78,
    recall: 99.85,
    f1: 99.81,
    trainingTime: "18.4s",
    color: "#22D3EE",
    desc: "MLP com 2 camadas ocultas. Mais lento para treinar mas robusto a ruído.",
    badge: null
  },
]

const ATTACK_TYPES = ["DoS", "Probe", "R2L", "U2R", "Normal"]
const CONFUSION_RF = [
  [67338, 12, 0, 0, 0],
  [0, 3710, 3, 0, 0],
  [0, 0, 1126, 0, 0],
  [2, 0, 0, 52, 0],
  [0, 0, 0, 0, 9711],
]

export default function KDDCupDemo() {
  const [selectedModel, setSelectedModel] = useState("rf")
  const [activeTab, setActiveTab] = useState<"metrics" | "confusion" | "insight">("metrics")

  const model = MODELS.find(m => m.id === selectedModel)!

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FCE94F]">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-bold">KDD Cup 1999 — Comparação de Modelos</h3>
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

      <p className="text-[#FCE94F]/60 text-xs font-mono">
        Dataset: 494.021 conexões · 41 features · 5 classes de ataque · Intrusion Detection
      </p>

      {/* Model Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {MODELS.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedModel(m.id)}
            className={`p-2 rounded text-left transition-all border ${
              selectedModel === m.id
                ? "border-[#FCE94F] bg-[#FCE94F]/10"
                : "border-[#FCE94F]/20 bg-[#0a0a0f] hover:border-[#FCE94F]/40"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#FCE94F] text-xs font-bold">{m.name}</span>
            </div>
            <div className="text-[10px] font-mono" style={{ color: m.color }}>
              ACC: {m.accuracy.toFixed(1)}%
            </div>
            {m.badge && (
              <div className="text-[9px] mt-1 text-[#FCE94F]/80">{m.badge}</div>
            )}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#FCE94F]/20">
        {(["metrics", "confusion", "insight"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-mono transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#FCE94F] text-[#FCE94F]"
                : "border-transparent text-[#FCE94F]/40 hover:text-[#FCE94F]/70"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* METRICS Tab */}
      {activeTab === "metrics" && (
        <div className="space-y-3">
          <p className="text-[#FCE94F]/50 text-xs italic">{model.desc}</p>
          {[
            { label: "Accuracy", value: model.accuracy, icon: <Target className="w-4 h-4" /> },
            { label: "Precision", value: model.precision, icon: <Shield className="w-4 h-4" /> },
            { label: "Recall", value: model.recall, icon: <Zap className="w-4 h-4" /> },
            { label: "F1-Score", value: model.f1, icon: <Trophy className="w-4 h-4" /> },
          ].map(metric => (
            <div key={metric.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5" style={{ color: model.color }}>
                  {metric.icon} {metric.label}
                </span>
                <span className="font-mono text-[#FCE94F]">{metric.value.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-[#0a0a0f] rounded overflow-hidden border border-[#FCE94F]/10">
                <div
                  className="h-full rounded transition-all duration-700"
                  style={{
                    width: `${metric.value}%`,
                    background: `linear-gradient(90deg, ${model.color}88, ${model.color})`,
                    boxShadow: `0 0 6px ${model.color}`
                  }}
                />
              </div>
            </div>
          ))}

          {/* Training Time */}
          <div className="mt-4 p-3 rounded border border-[#FCE94F]/20 bg-[#0a0a0f]">
            <p className="text-[#FCE94F]/50 text-xs">Tempo de treino estimado (dataset completo)</p>
            <p className="text-[#FCE94F] font-mono font-bold text-lg mt-1">{model.trainingTime}</p>
          </div>

          {/* Comparison bar chart */}
          <div className="mt-2">
            <p className="text-[#FCE94F]/50 text-xs mb-2 font-mono">ACCURACY COMPARATIVO:</p>
            <div className="space-y-1.5">
              {MODELS.map(m => (
                <div key={m.id} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#FCE94F]/60 w-28 truncate">{m.name}</span>
                  <div className="flex-1 h-1.5 bg-[#0a0a0f] rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${m.accuracy}%`,
                        backgroundColor: m.id === selectedModel ? "#FCE94F" : `${m.color}66`,
                        boxShadow: m.id === selectedModel ? "0 0 6px #FCE94F" : "none"
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono w-14 text-right" style={{ color: m.color }}>
                    {m.accuracy.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONFUSION MATRIX Tab (only for Random Forest) */}
      {activeTab === "confusion" && (
        <div>
          <p className="text-[#FCE94F]/50 text-xs mb-3 font-mono">
            Matriz de confusão — {selectedModel === "rf" ? "Random Forest (melhor modelo)" : "Ver RF para matrix completa"}
          </p>
          {selectedModel === "rf" ? (
            <div className="overflow-x-auto">
              <table className="text-[10px] font-mono w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-1 text-[#FCE94F]/40 text-left">Pred ↓ Real →</th>
                    {ATTACK_TYPES.map(t => (
                      <th key={t} className="p-1 text-[#FCE94F]/70 text-center">{t}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONFUSION_RF.map((row, i) => (
                    <tr key={i}>
                      <td className="p-1 text-[#FCE94F]/70 font-bold">{ATTACK_TYPES[i]}</td>
                      {row.map((val, j) => (
                        <td
                          key={j}
                          className="p-1 text-center rounded"
                          style={{
                            backgroundColor: i === j
                              ? `rgba(252,233,79,${Math.min(val / 70000, 0.4)})`
                              : val > 0 ? "rgba(255,68,0,0.3)" : "transparent",
                            color: i === j ? "#FCE94F" : val > 0 ? "#FF4400" : "#FCE94F22"
                          }}
                        >
                          {val.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-[#FCE94F]/50 text-sm">Selecione o Random Forest para ver a matriz de confusão completa.</p>
              <button
                onClick={() => setSelectedModel("rf")}
                className="mt-3 text-xs text-[#FCE94F] border border-[#FCE94F]/40 px-3 py-1.5 rounded hover:bg-[#FCE94F]/10 transition-colors"
              >
                Ir para Random Forest
              </button>
            </div>
          )}
        </div>
      )}

      {/* INSIGHT Tab */}
      {activeTab === "insight" && (
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded border border-[#FCE94F]/30 bg-[#FCE94F]/5">
            <p className="text-[#FCE94F] font-bold mb-1">🏆 Conclusão Principal</p>
            <p className="text-[#FCE94F]/70">
              Random Forest e KNN dominam em acurácia ({">"}99.7%). O dataset KDD é altamente
              separável — até DT simples atinge 99.87%. O diferencial está em R2L e U2R (ataques raros).
            </p>
          </div>
          <div className="p-3 rounded border border-[#FF4400]/30 bg-[#FF4400]/5">
            <p className="text-[#FF4400] font-bold mb-1">⚠ Ponto Crítico: Classes Raras</p>
            <p className="text-[#FF4400]/70">
              Ataques U2R (~50 amostras) e R2L (~1000) são sub-representados.
              Naive Bayes falha justamente nessas classes (recall 89%).
              RF e DT lidam melhor graças ao ensemble e bagging.
            </p>
          </div>
          <div className="p-3 rounded border border-[#00B4FF]/30 bg-[#00B4FF]/5">
            <p className="text-[#00B4FF] font-bold mb-1">📊 Análise do Dataset</p>
            <p className="text-[#00B4FF]/70">
              41 features: duração, protocolo, serviço, flag, bytes enviados/recebidos...
              Feature engineering revelou que &quot;src_bytes&quot; e &quot;dst_bytes&quot; são as mais discriminativas
              para distinguir DoS de tráfego normal.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
