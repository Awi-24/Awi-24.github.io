"use client"

import { useState } from "react"
import { AlertTriangle, MapPin, DollarSign, Play, CheckCircle } from "lucide-react"
import { ProjectDemoHero3D } from "@/components/project-demo-hero-3d"

const DEALERSHIPS = [
  { id: 1, name: "Ford North Station", city: "New York", avgCost: 1200, currentCost: 1350, risk: "low" },
  { id: 2, name: "Main Avenue Ford", city: "Chicago", avgCost: 1100, currentCost: 4500, risk: "critical" },
  { id: 3, name: "Sunset Valley Ford", city: "Los Angeles", avgCost: 1400, currentCost: 1550, risk: "low" },
  { id: 4, name: "River Creek Motors", city: "Miami", avgCost: 950, currentCost: 2800, risk: "high" },
  { id: 5, name: "Ford Heritage", city: "Detroit", avgCost: 1300, currentCost: 1400, risk: "low" },
]

export default function AnomalyDetectionDemo() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setShowResults(false)
    setAnalysisProgress(0)
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setShowResults(true)
          return 100
        }
        return prev + 5
      })
    }, 50)
  }

  return (
    <div className="space-y-4">
      <ProjectDemoHero3D shape="cube" accent="#00ffff" secondary="#00ff9f" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-[#00ffff] text-sm font-bold uppercase tracking-wider">Warranty Anomaly Monitor</h4>
          <p className="text-[#00ffff]/40 text-[10px]">Real-time auditing engine (Simulation)</p>
        </div>
        <button 
          onClick={startAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff] rounded hover:bg-[#00ffff]/20 transition-all text-xs font-bold disabled:opacity-50"
        >
          {isAnalyzing ? "ANALYZING..." : <><Play className="w-3 h-3" /> RUN AUDIT</>}
        </button>
      </div>

      {isAnalyzing && (
        <div className="space-y-2 animate-in fade-in duration-300">
          <div className="flex justify-between text-[10px] font-mono text-[#00ffff]">
            <span>{analysisProgress < 30 && "> Querying BigQuery..."}</span>
            <span>{analysisProgress >= 30 && analysisProgress < 70 && "> Running Keras Autoencoder..."}</span>
            <span>{analysisProgress >= 70 && "> Aggregating risk scores..."}</span>
            <span>{analysisProgress}%</span>
          </div>
          <div className="h-1 bg-[#00ffff]/10 rounded overflow-hidden">
            <div 
              className="h-full bg-[#00ffff] transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
        </div>
      )}

      {showResults && (
        <div className="grid gap-2 animate-in slide-in-from-top-4 duration-500">
          {DEALERSHIPS.map((dealer) => (
            <div 
              key={dealer.id}
              className={`p-3 rounded border flex items-center justify-between transition-all ${
                dealer.risk === 'critical' ? 'bg-red-500/10 border-red-500/40' : 
                dealer.risk === 'high' ? 'bg-orange-500/10 border-orange-500/40' :
                'bg-black/40 border-[#00ffff]/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${
                  dealer.risk === 'critical' ? 'bg-red-500/20 text-red-500' : 
                  dealer.risk === 'high' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-[#00ffff]/10 text-[#00ffff]'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{dealer.name}</p>
                  <p className="text-[10px] text-white/40">{dealer.city}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <DollarSign className="w-3 h-3 text-[#00ffff]/50" />
                  <span className="text-xs font-mono text-white">${dealer.currentCost}</span>
                </div>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  {dealer.risk === 'low' ? (
                    <><CheckCircle className="w-2 h-2 text-green-500" /><span className="text-[8px] text-green-500 uppercase font-bold">Verified</span></>
                  ) : (
                    <><AlertTriangle className="w-2 h-2 text-red-500" /><span className="text-[8px] text-red-500 uppercase font-bold">{dealer.risk} Risk</span></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isAnalyzing && !showResults && (
        <div className="h-48 border-2 border-dashed border-[#00ffff]/5 rounded flex flex-col items-center justify-center text-[#00ffff]/20 space-y-2 uppercase tracking-widest">
          <Play className="w-8 h-8 opacity-20" />
          <p className="text-[10px]">Ready to process audit data</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#00ffff]/10">
        <p className="text-[#00ffff]/50 text-[10px] leading-relaxed italic">
          Stack: BigQuery ETL &rarr; Feature Engineering &rarr; Keras Autoencoder &rarr; Vertex AI
        </p>
        <p className="text-[#00ffff]/30 text-[10px] mt-1">
          Threshold: 0.50 | Precision: 94.2% | Recall: 89.7%
        </p>
      </div>
    </div>
  )
}
