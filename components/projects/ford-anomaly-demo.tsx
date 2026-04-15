'use client'

import { useState } from 'react'
import { AlertTriangle, TrendingUp, Building2 } from 'lucide-react'

const DEALERSHIP_DATA = [
  { dealership: 'Dealership A', repairCost: 2500, avgCost: 2200, overcharge: 300, alert: true },
  { dealership: 'Dealership B', repairCost: 2100, avgCost: 2200, overcharge: -100, alert: false },
  { dealership: 'Dealership C', repairCost: 3200, avgCost: 2200, overcharge: 1000, alert: true },
  { dealership: 'Dealership D', repairCost: 2180, avgCost: 2200, overcharge: -20, alert: false },
  { dealership: 'Dealership E', repairCost: 5800, avgCost: 2200, overcharge: 3600, alert: true },
  { dealership: 'Dealership F', repairCost: 2210, avgCost: 2200, overcharge: 10, alert: false },
]

export default function FordAnomalyDemo() {
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null)
  const anomalies = DEALERSHIP_DATA.filter(d => d.alert)
  const totalOvercharge = DEALERSHIP_DATA.reduce((sum, d) => sum + Math.max(d.overcharge, 0), 0)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#1a1a2e] rounded border border-[#00ffff]/20 p-3">
          <p className="text-[#00ffff]/50 text-xs mb-1">Dealerships</p>
          <p className="text-[#00ffff] font-bold">{DEALERSHIP_DATA.length}</p>
        </div>
        <div className="bg-[#1a1a2e] rounded border border-[#ff0040]/20 p-3">
          <p className="text-[#ff0040]/50 text-xs mb-1">Anomalies</p>
          <p className="text-[#ff0040] font-bold">{anomalies.length}</p>
        </div>
        <div className="bg-[#1a1a2e] rounded border border-[#ff6600]/20 p-3">
          <p className="text-[#ff6600]/50 text-xs mb-1">Total Overcharge</p>
          <p className="text-[#ff6600] font-bold">$ {totalOvercharge.toLocaleString()}</p>
        </div>
      </div>

      {/* Dealership Comparison */}
      <div className="bg-[#1a1a2e] rounded border border-[#00ffff]/20 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-4 h-4 text-[#ff00ff]" />
          <h4 className="text-[#00ffff] font-bold text-sm">DEALERSHIP ANALYSIS</h4>
        </div>

        <div className="space-y-3">
          {DEALERSHIP_DATA.map((dealer, idx) => {
            const isSelected = selectedDealer === idx
            const percentDiff = ((dealer.overcharge / dealer.avgCost) * 100).toFixed(1)
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedDealer(isSelected ? null : idx)}
                className={`w-full text-left p-3 rounded transition-all ${
                  isSelected
                    ? 'bg-[#00ffff]/10 border border-[#00ffff]/50'
                    : `border ${dealer.alert ? 'border-[#ff0040]/30' : 'border-[#00ffff]/10'} hover:border-[#00ffff]/30`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {dealer.alert && <AlertTriangle className="w-3 h-3 text-[#ff0040]" />}
                    <span className="text-[#00ffff] text-xs font-mono">{dealer.dealership}</span>
                  </div>
                  <span className={`text-xs font-bold ${dealer.alert ? 'text-[#ff0040]' : 'text-[#00ff9f]'}`}>
                    {dealer.alert ? '⚠️' : '✓'} $ {dealer.repairCost}
                  </span>
                </div>

                {/* Comparison Bar */}
                <div className="relative h-2 bg-[#0a0a0f] rounded overflow-hidden">
                  <div 
                    className={`h-full transition-all ${dealer.alert ? 'bg-[#ff0040]' : 'bg-[#00ffff]/30'}`}
                    style={{ width: `${Math.min(100, (dealer.repairCost / 6000) * 100)}%` }}
                  />
                  <div 
                    className="absolute inset-y-0 border-l border-[#00ff9f]"
                    style={{ left: `${(dealer.avgCost / 6000) * 100}%` }}
                  />
                </div>

                {isSelected && (
                  <div className="mt-3 p-3 bg-[#0a0a0f] border border-[#00ffff]/20 rounded text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#00ffff]/70">Average Cost:</span>
                      <span className="text-[#00ffff]">$ {dealer.avgCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00ffff]/70">Current Cost:</span>
                      <span className="text-[#ff0040]">$ {dealer.repairCost}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#00ffff]/10">
                      <span className="text-[#ff0040] font-bold">Difference:</span>
                      <span className={`font-bold ${dealer.overcharge > 0 ? 'text-[#ff0040]' : 'text-[#00ff9f]'}`}>
                        {dealer.overcharge > 0 ? '+' : ''} $ {dealer.overcharge} ({percentDiff}%)
                      </span>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ML Model Performance */}
      <div className="bg-[#1a0033]/30 border border-[#ff00ff]/30 rounded p-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[#ff00ff] flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs">
            <p className="text-[#ff00ff] font-bold">ML MODEL - ANOMALY DETECTION</p>
            <p className="text-[#00ffff]/70">
              Warranty data processed via BigQuery + Vertex AI. 
              Algorithms: Isolation Forest + Z-Score Normalization. 
              Accuracy: 97.2% | Anomalies detected: {anomalies.length}/{DEALERSHIP_DATA.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
