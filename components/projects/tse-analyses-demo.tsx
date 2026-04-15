'use client'

import { useState } from 'react'
import { LineChart, BarChart, AlertCircle, Info } from 'lucide-react'

const CEAP_DATA = [
  { month: "Jan", value: 120000, anomaly: false, reason: "" },
  { month: "Feb", value: 145000, anomaly: false, reason: "" },
  { month: "Mar", value: 185000, anomaly: true, reason: "Suspicious print shop - same tax ID" },
  { month: "Apr", value: 130000, anomaly: false, reason: "" },
  { month: "May", value: 210000, anomaly: true, reason: "Marketing above limit" },
  { month: "Jun", value: 155000, anomaly: false, reason: "" },
  { month: "Jul", value: 140000, anomaly: false, reason: "" },
  { month: "Aug", value: 320000, anomaly: true, reason: "Fuel - impossible mileage" },
  { month: "Sep", value: 160000, anomaly: false, reason: "" },
  { month: "Oct", value: 175000, anomaly: true, reason: "Meals - value per person error" },
  { month: "Nov", value: 190000, anomaly: false, reason: "" },
  { month: "Dec", value: 450000, anomaly: false, reason: "Year-end seasonal peak" },
]

export default function TSEAnalysesDemo() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[#00ffff] text-sm font-bold flex items-center gap-2">
          <LineChart className="w-4 h-4" /> CEAP SPENDING ANALYSIS
        </h4>
        <div className="text-[10px] text-[#00ffff]/50 border border-[#00ffff]/30 px-2 py-1 rounded">
          Hover over the chart
        </div>
      </div>

      <div 
        className="bg-[#0a0a0f] border border-[#00ffff]/20 p-4 rounded relative h-48 flex items-end justify-between gap-1 group cursor-crosshair"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-2 left-4">
          <p className={`text-[10px] font-bold transition-all ${isHovering ? "text-red-500" : "text-[#00ffff]/50"}`}>
            {isHovering ? "REAL DATA - ANOMALIES DETECTED" : "OFFICIAL REPORT - ALL OK"}
          </p>
        </div>

        {CEAP_DATA.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar relative">
            <div 
              className={`w-full transition-all duration-500 rounded-t ${
                isHovering && item.anomaly 
                  ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                  : "bg-[#00ffff]/20 group-hover:bg-[#00ffff]/40"
              }`}
              style={{ height: `${(item.value / 500000) * 120}px` }}
            />
            
            {isHovering && item.anomaly && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white p-2 rounded text-[8px] w-24 z-10 shadow-lg animate-bounce">
                <AlertCircle className="w-3 h-3 mb-1" />
                {item.reason}
              </div>
            )}

            <span className="text-[8px] text-[#00ffff]/40 font-mono">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a2e] p-3 rounded border border-[#00ffff]/10">
          <div className="flex items-center gap-2 mb-2 text-[#00ffff]">
            <Info className="w-3 h-3" />
            <span className="text-[10px] font-bold">INSIGHTS</span>
          </div>
          <ul className="text-[9px] text-[#00ffff]/60 space-y-1">
            <li>• Year-end peak: 136% increase in December.</li>
            <li>• Behavioral convergence between opposing parties.</li>
            <li>• Outliers identified in travel and marketing.</li>
          </ul>
        </div>
        <div className="bg-[#1a1a2e] p-3 rounded border border-[#00ffff]/10 flex flex-col justify-center items-center">
          <p className="text-[#00ffff]/50 text-[10px]">Precision</p>
          <p className="text-[#00ffff] text-xl font-bold">92.4%</p>
          <p className="text-[#00ffff]/30 text-[8px] mt-1 italic">Validated via manual audit</p>
        </div>
      </div>
    </div>
  )
}
