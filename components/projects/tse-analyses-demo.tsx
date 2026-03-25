"use client"

import { useState } from "react"
import { TrendingUp, AlertTriangle, Eye, EyeOff } from "lucide-react"

// Normal looking data
const DATA_NORMAL = [
  { month: "Jan", value: 45000 },
  { month: "Fev", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Abr", value: 55000 },
  { month: "Mai", value: 51000 },
  { month: "Jun", value: 58000 },
  { month: "Jul", value: 54000 },
  { month: "Ago", value: 49000 },
  { month: "Set", value: 56000 },
  { month: "Out", value: 52000 },
  { month: "Nov", value: 47000 },
  { month: "Dez", value: 61000 },
]

// Hidden anomalies
const DATA_ANOMALY = [
  { month: "Jan", value: 45000, anomaly: false },
  { month: "Fev", value: 52000, anomaly: false },
  { month: "Mar", value: 185000, anomaly: true, reason: "Gráfica suspeita - mesmo CNPJ" },
  { month: "Abr", value: 55000, anomaly: false },
  { month: "Mai", value: 210000, anomaly: true, reason: "Divulgação acima do teto" },
  { month: "Jun", value: 58000, anomaly: false },
  { month: "Jul", value: 54000, anomaly: false },
  { month: "Ago", value: 320000, anomaly: true, reason: "Combustível - km impossível" },
  { month: "Set", value: 56000, anomaly: false },
  { month: "Out", value: 175000, anomaly: true, reason: "Alimentação - valor por refeição" },
  { month: "Nov", value: 47000, anomaly: false },
  { month: "Dez", value: 61000, anomaly: false },
]

export default function TSEAnalysesDemo() {
  const [isHovering, setIsHovering] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  const maxNormal = Math.max(...DATA_NORMAL.map(d => d.value))
  const maxAnomaly = Math.max(...DATA_ANOMALY.map(d => d.value))

  const anomalies = DATA_ANOMALY.filter(d => d.anomaly)

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#00ffff]/70">Gastos CEAP - Deputados 2023</span>
        <div className="flex items-center gap-2 text-[#ff00ff]">
          {isHovering ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>Passe o mouse no gráfico</span>
        </div>
      </div>

      {/* Main Chart Container */}
      <div 
        className="relative bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-4 cursor-crosshair"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setSelectedMonth(null); }}
      >
        {/* Chart Title */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#00ffff]" />
          <h4 className="text-[#00ffff] font-bold text-sm">
            {isHovering ? "DADOS REAIS - ANOMALIAS DETECTADAS" : "RELATÓRIO OFICIAL - TUDO OK"}
          </h4>
        </div>

        {/* Chart Area */}
        <div className="relative h-48">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-[#00ffff]/50 text-[10px]">
            <span>{isHovering ? "320k" : "61k"}</span>
            <span>{isHovering ? "160k" : "30k"}</span>
            <span>0</span>
          </div>

          {/* Chart bars container */}
          <div className="absolute left-14 right-0 top-0 bottom-0 flex items-end gap-1">
            {DATA_NORMAL.map((item, i) => {
              const normalHeight = (item.value / maxNormal) * 100
              const anomalyData = DATA_ANOMALY[i]
              const anomalyHeight = (anomalyData.value / maxAnomaly) * 100
              const isAnomaly = anomalyData.anomaly

              return (
                <div 
                  key={item.month} 
                  className="flex-1 flex flex-col items-center relative"
                  onMouseEnter={() => setSelectedMonth(i)}
                  onMouseLeave={() => setSelectedMonth(null)}
                >
                  {/* Bar */}
                  <div className="w-full relative" style={{ height: '140px' }}>
                    {/* Normal bar (visible when not hovering) */}
                    <div 
                      className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${
                        isHovering ? 'opacity-0' : 'opacity-100'
                      } bg-gradient-to-t from-[#00ff9f] to-[#00ffff]`}
                      style={{ height: `${normalHeight}%` }}
                    />
                    
                    {/* Anomaly bar (visible when hovering) */}
                    <div 
                      className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${
                        isHovering ? 'opacity-100' : 'opacity-0'
                      } ${isAnomaly ? 'bg-gradient-to-t from-[#ff0040] to-[#ff6b6b]' : 'bg-gradient-to-t from-[#00ff9f] to-[#00ffff]'}`}
                      style={{ height: `${anomalyHeight}%` }}
                    />

                    {/* Anomaly indicator */}
                    {isHovering && isAnomaly && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <AlertTriangle className="w-4 h-4 text-[#ff0040] animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Month label */}
                  <span className="text-[8px] text-[#00ffff]/50 mt-1">{item.month}</span>

                  {/* Tooltip on hover */}
                  {selectedMonth === i && isHovering && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#0a0a0f] border border-[#00ffff]/30 rounded p-2 z-10 min-w-[120px]">
                      <p className="text-[10px] text-[#00ffff]/70">{item.month}/2023</p>
                      <p className={`text-xs font-bold ${isAnomaly ? 'text-[#ff0040]' : 'text-[#00ff9f]'}`}>
                        R$ {anomalyData.value.toLocaleString()}
                      </p>
                      {isAnomaly && anomalyData.reason && (
                        <p className="text-[9px] text-[#ff0040] mt-1">{anomalyData.reason}</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Overlay message */}
        {!isHovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]/50 backdrop-blur-[1px] rounded-lg pointer-events-none">
            <div className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-[#00ff9f] font-bold">Nenhuma irregularidade encontrada</p>
              <p className="text-[#00ffff]/50 text-xs mt-1">Passe o mouse para análise ML</p>
            </div>
          </div>
        )}
      </div>

      {/* Anomaly Summary - only show when hovering */}
      {isHovering && (
        <div className="bg-[#1a0011] border border-[#ff0040]/50 rounded-lg p-4 animate-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff0040] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[#ff0040] font-bold text-sm mb-2">
                {anomalies.length} ANOMALIAS DETECTADAS
              </p>
              <div className="space-y-1">
                {anomalies.map((a, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#00ffff]/70">{a.month}: {a.reason}</span>
                    <span className="text-[#ff0040] font-mono">R$ {a.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#ff0040]/70 text-[10px] mt-2">
                Total suspeito: R$ {anomalies.reduce((s, a) => s + a.value, 0).toLocaleString()} | Modelos: IsolationForest + DBSCAN
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ML Info */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#1a1a2e] rounded p-2 border border-[#00ffff]/10">
          <p className="text-[#00ffff]/50 text-[10px]">Precisão</p>
          <p className="text-[#00ff9f] font-bold text-sm">94.2%</p>
        </div>
        <div className="bg-[#1a1a2e] rounded p-2 border border-[#00ffff]/10">
          <p className="text-[#00ffff]/50 text-[10px]">Registros</p>
          <p className="text-[#00ffff] font-bold text-sm">1.2M</p>
        </div>
        <div className="bg-[#1a1a2e] rounded p-2 border border-[#00ffff]/10">
          <p className="text-[#00ffff]/50 text-[10px]">Anomalias</p>
          <p className="text-[#ff0040] font-bold text-sm">4.7%</p>
        </div>
      </div>
    </div>
  )
}
