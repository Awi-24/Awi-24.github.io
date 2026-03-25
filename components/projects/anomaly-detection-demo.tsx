"use client"

import { useState } from "react"
import { AlertTriangle, MapPin, DollarSign, Play, CheckCircle } from "lucide-react"

const DEALERSHIPS = [
  { id: 1, name: "Ford Salvador Norte", city: "Salvador", avgCost: 850, anomalyScore: 0.12, status: "normal" },
  { id: 2, name: "Ford Paralela", city: "Salvador", avgCost: 920, anomalyScore: 0.18, status: "normal" },
  { id: 3, name: "Ford Lauro de Freitas", city: "Lauro de Freitas", avgCost: 2450, anomalyScore: 0.89, status: "anomaly" },
  { id: 4, name: "Ford Feira de Santana", city: "Feira de Santana", avgCost: 780, anomalyScore: 0.08, status: "normal" },
  { id: 5, name: "Ford V. da Conquista", city: "V. da Conquista", avgCost: 1890, anomalyScore: 0.76, status: "anomaly" },
  { id: 6, name: "Ford Camacari", city: "Camacari", avgCost: 910, anomalyScore: 0.21, status: "normal" },
]

const REPAIR_TYPES = [
  { type: "Freios", expected: 450 },
  { type: "Suspensao", expected: 680 },
  { type: "Motor", expected: 1200 },
  { type: "Eletrica", expected: 350 },
]

export default function AnomalyDetectionDemo() {
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisComplete(false)
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 4
      })
    }, 80)
  }

  const anomalyCount = DEALERSHIPS.filter(d => d.status === "anomaly").length
  const totalSuspect = DEALERSHIPS.filter(d => d.status === "anomaly")
    .reduce((sum, d) => sum + d.avgCost, 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00ffff]">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-sm">Warranty Anomaly Detection</h3>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#ff00ff]/20 border border-[#ff00ff] text-[#ff00ff] rounded text-xs hover:bg-[#ff00ff]/30 disabled:opacity-50 transition-all"
        >
          <Play className="w-3 h-3" />
          {isAnalyzing ? "Analisando..." : "Executar ML"}
        </button>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-3">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-[#00ffff]/70">Processando dados de garantia...</span>
            <span className="text-[#00ffff]">{analysisProgress}%</span>
          </div>
          <div className="h-2 bg-[#0a0a0f] rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] transition-all"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-[#00ffff]/50 mt-2 font-mono">
            {analysisProgress < 30 && "> Carregando BigQuery..."}
            {analysisProgress >= 30 && analysisProgress < 60 && "> Executando Keras Autoencoder..."}
            {analysisProgress >= 60 && analysisProgress < 90 && "> Calculando reconstruction error..."}
            {analysisProgress >= 90 && "> Classificando anomalias..."}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {analysisComplete && (
        <div className="grid grid-cols-3 gap-2 animate-in fade-in">
          <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-3 text-center">
            <MapPin className="w-4 h-4 text-[#00ffff] mx-auto mb-1" />
            <p className="text-xl font-bold text-[#00ffff]">{DEALERSHIPS.length}</p>
            <p className="text-[#00ffff]/50 text-[10px]">Concessionarias</p>
          </div>
          <div className="bg-[#1a0011] rounded-lg border border-[#ff0040]/30 p-3 text-center">
            <AlertTriangle className="w-4 h-4 text-[#ff0040] mx-auto mb-1" />
            <p className="text-xl font-bold text-[#ff0040]">{anomalyCount}</p>
            <p className="text-[#ff0040]/50 text-[10px]">Anomalias</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-lg border border-[#ffcc00]/20 p-3 text-center">
            <DollarSign className="w-4 h-4 text-[#ffcc00] mx-auto mb-1" />
            <p className="text-xl font-bold text-[#ffcc00]">R${(totalSuspect/1000).toFixed(1)}k</p>
            <p className="text-[#ffcc00]/50 text-[10px]">Suspeito</p>
          </div>
        </div>
      )}

      {/* Dealership List */}
      <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 overflow-hidden">
        <div className="p-3 border-b border-[#00ffff]/10">
          <p className="text-[#00ffff]/70 text-xs">Custo Medio por Concessionaria</p>
        </div>
        
        <div className="divide-y divide-[#00ffff]/5 max-h-64 overflow-y-auto">
          {DEALERSHIPS.map((dealer) => (
            <button
              key={dealer.id}
              onClick={() => setSelectedDealer(selectedDealer === dealer.id ? null : dealer.id)}
              className={`w-full p-3 text-left hover:bg-[#00ffff]/5 transition-all ${
                selectedDealer === dealer.id ? "bg-[#00ffff]/10" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      dealer.status === "anomaly" 
                        ? "bg-[#ff0040] animate-pulse" 
                        : analysisComplete ? "bg-[#00ff9f]" : "bg-[#00ffff]/30"
                    }`} />
                    <span className="text-[#00ffff] text-sm">{dealer.name}</span>
                  </div>
                  <p className="text-[#00ffff]/40 text-xs mt-0.5 ml-4">{dealer.city}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-mono font-bold text-sm ${
                    dealer.status === "anomaly" && analysisComplete ? "text-[#ff0040]" : "text-[#00ffff]"
                  }`}>
                    R$ {dealer.avgCost}
                  </p>
                  {analysisComplete && (
                    <p className={`text-[10px] ${
                      dealer.anomalyScore > 0.5 ? "text-[#ff0040]" : "text-[#00ffff]/40"
                    }`}>
                      Score: {(dealer.anomalyScore * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedDealer === dealer.id && dealer.status === "anomaly" && analysisComplete && (
                <div className="mt-3 pt-3 border-t border-[#ff0040]/20 space-y-2 animate-in slide-in-from-top-2">
                  <p className="text-[#ff0040] text-xs font-bold">Tipos de Reparo com Overcharge:</p>
                  {REPAIR_TYPES.slice(0, 3).map(repair => (
                    <div key={repair.type} className="flex justify-between text-xs">
                      <span className="text-[#00ffff]/60">{repair.type}</span>
                      <div className="flex gap-3">
                        <span className="text-[#00ffff]/40">Esperado: R${repair.expected}</span>
                        <span className="text-[#ff0040]">
                          Cobrado: R${Math.round(repair.expected * (1.8 + Math.random() * 0.5))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-[#0a0a0f] rounded border border-[#00ffff]/10 p-3">
        <p className="text-[#00ffff]/50 text-xs">
          Pipeline: BigQuery ETL → Feature Engineering → Keras Autoencoder → Vertex AI
        </p>
        <p className="text-[#00ffff]/30 text-[10px] mt-1">
          Threshold: 0.50 | Precision: 94.2% | Recall: 89.7%
        </p>
      </div>
    </div>
  )
}
