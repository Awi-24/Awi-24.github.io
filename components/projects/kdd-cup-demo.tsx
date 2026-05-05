'use client'

import { useState } from 'react'
import { Table, BarChart3, Brain, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { ProjectDemoHero3D } from "@/components/project-demo-hero-3d"

const MODELS = [
  { 
    id: "xgboost", 
    name: "XGBoost", 
    f1: 0.9995, 
    recall: 0.9992, 
    rocAuc: 1.000, 
    prAuc: 0.999,
    note: "Near-perfect scores are expected in KDD Cup 1999: DoS attacks generate extreme src_bytes/count values that are trivially separable with labels.",
    type: "Supervised"
  },
  { 
    id: "iforest", 
    name: "IsolationForest", 
    f1: 0.942, 
    recall: 0.971, 
    rocAuc: 0.982, 
    prAuc: 0.965,
    note: "97.1% recall without any training labels. Recommended for cold-start scenarios where labels are unavailable.",
    type: "Unsupervised"
  },
  { 
    id: "lof", 
    name: "LOF", 
    f1: 0.885, 
    recall: 0.824, 
    rocAuc: 0.912, 
    prAuc: 0.870,
    note: "Good for local anomalies (points in low-density regions). High computational cost on large datasets — O(n²) in space.",
    type: "Unsupervised"
  },
  { 
    id: "autoenc", 
    name: "Autoencoder", 
    f1: 0.045, 
    recall: 0.023, 
    rocAuc: 0.986, 
    prAuc: 0.952,
    note: "ROC-AUC=0.986 and PR-AUC=0.952 prove the signal is strong. Low F1 (4.5%) is an artifact of the conservative threshold (μ+2σ) — reducing threshold swaps precision for recall.",
    type: "Unsupervised"
  },
  { 
    id: "ocsvm", 
    name: "OneClassSVM", 
    f1: 0.390, 
    recall: 0.245, 
    rocAuc: 0.620, 
    prAuc: 0.580,
    note: "Trained on 8k normal samples (full dataset is unfeasible for RBF kernel: O(n²)). Reduced training coverage explains the low recall.",
    type: "Unsupervised"
  }
]

const INSIGHTS = [
  {
    title: "XGBoost is trivially dominant",
    body: "F1=0.9995 and ROC-AUC=1.000 are expected: DoS attacks produce extreme src_bytes and count that any ensemble separates easily with labels. The real challenge is the rare classes (U2R, R2L < 1% of dataset)."
  },
  {
    title: "IsolationForest: Production King",
    body: "97.1% recall with zero training labels is the study's most interesting result. Recommended for production cold-start environments where attack labels don't exist yet or are expensive to obtain."
  },
  {
    title: "The Autoencoder Paradox",
    body: "ROC-AUC=0.986 and PR-AUC=0.952 confirm reconstruction error is an excellent anomaly signal. Low F1 (4.46%) is an artifact of the conservative threshold (μ+2σ on normal data). Reducing threshold improves recall at the cost of precision."
  },
  {
    title: "OneClassSVM: Scalability limitation",
    body: "Underperformance (F1=0.39) caused by forced subsampling (8k normal samples) required by the O(n²) cost of the RBF kernel on the full dataset. Not a model weakness — an infra limitation."
  },
  {
    title: "Feature Importance",
    body: "src_bytes, dst_bytes, count, and dst_host_srv_count are XGBoost's top features. Rare classes U2R and R2L (< 1% of data) remain the practical challenge for any detector — even with high global scores."
  }
]

export default function KDDCupDemo() {
  const [activeTab, setActiveTab] = useState<"table" | "chart" | "insights">("table")

  const fmt = (v: number) => (v * 100).toFixed(1) + "%"

  return (
    <div className="space-y-6">
      <ProjectDemoHero3D shape="prism" accent="#00ffff" secondary="#00ff9f" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-[#00ffff] text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> KDD CUP 1999 BENCHMARK
          </h4>
          <p className="text-[10px] text-[#00ffff]/40 mt-1 uppercase tracking-widest">
            Binary Task: normal=0 vs attack=1 · 20% test split · 494k connections · 41 features
          </p>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded border border-[#00ffff]/20">
          {([["table", "TABLE"], ["chart", "CHART"], ["insights", "INSIGHTS"]] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-3 py-1 text-[10px] font-bold transition-all ${
                activeTab === id ? "bg-[#00ffff] text-black rounded-sm" : "text-[#00ffff]/40 hover:text-[#00ffff]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[300px]">
        {activeTab === "table" && (
          <div className="overflow-x-auto" style={{ animation: "fadeIn 0.3s" }}>
            <table className="w-full text-left text-[10px] border-collapse">
              <thead>
                <tr className="border-b border-[#00ffff]/20 text-[#00ffff]/60 uppercase">
                  <th className="py-2">Algorithm</th>
                  <th className="py-2">Type</th>
                  <th className="py-2 text-right">F1-Score</th>
                  <th className="py-2 text-right">Recall</th>
                  <th className="py-2 text-right">ROC-AUC</th>
                </tr>
              </thead>
              <tbody className="text-[#00ffff]/80 font-mono">
                {MODELS.map((m) => (
                  <tr key={m.id} className="border-b border-[#00ffff]/5 hover:bg-[#00ffff]/5 transition-colors group">
                    <td className="py-3 font-bold text-[#00ffff]">{m.name}</td>
                    <td className="py-3 text-[9px] uppercase opacity-50">{m.type}</td>
                    <td className="py-3 text-right">{fmt(m.f1)}</td>
                    <td className="py-3 text-right text-[#00ff9f]">{fmt(m.recall)}</td>
                    <td className="py-3 text-right">{fmt(m.rocAuc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[9px] text-[#00ffff]/30 mt-4 italic">
              ¹ Autoencoder: low recall due to conservative threshold (μ+2σ) · ² OneClassSVM: trained on 8k samples (O(n²) limitation)
            </p>
          </div>
        )}

        {activeTab === "chart" && (
          <div className="h-full flex items-end justify-between gap-2 pt-8" style={{ animation: "fadeIn 0.3s" }}>
            {MODELS.map((m) => (
              <div key={m.id} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex flex-col gap-1 items-center justify-end h-48">
                  {/* F1 Bar */}
                  <div 
                    className="w-full max-w-[20px] bg-[#00ffff]/40 rounded-t transition-all duration-500 group-hover:bg-[#00ffff]/60 relative"
                    style={{ height: `${m.f1 * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      F1: {fmt(m.f1)}
                    </span>
                  </div>
                  {/* Recall Bar */}
                  <div 
                    className="w-full max-w-[20px] bg-[#00ff9f]/40 rounded-t transition-all duration-500 group-hover:bg-[#00ff9f]/60 relative"
                    style={{ height: `${m.recall * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#00ff9f] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      REC: {fmt(m.recall)}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#00ffff]/60 uppercase rotate-45 mt-4 origin-left">{m.name}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="grid sm:grid-cols-2 gap-4" style={{ animation: "fadeIn 0.3s" }}>
            {INSIGHTS.map((ins, i) => (
              <div key={i} className="p-3 bg-black/40 border border-[#00ffff]/10 rounded hover:border-[#00ffff]/30 transition-all group">
                <h5 className="text-[10px] font-bold text-[#00ffff] mb-1 flex items-center gap-2 uppercase">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {ins.title}
                </h5>
                <p className="text-[9px] text-[#00ffff]/60 leading-relaxed">
                  {ins.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-[#00ffff]/5 border border-[#00ffff]/20 rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-[#00ffff] shrink-0" />
        <div className="text-[10px] text-[#00ffff]/70 leading-relaxed">
          <span className="font-bold">Autoencoder:</span> Low F1 is an artifact of the conservative threshold (μ+2σ). 
          ROC-AUC={fmt(MODELS.find(m => m.id === "autoenc")!.rocAuc)} and PR-AUC={fmt(MODELS.find(m => m.id === "autoenc")!.prAuc)} confirm the signal is strong.
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
