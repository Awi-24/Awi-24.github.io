'use client'

import { useState } from 'react'
import { Cpu, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react'

const JOINT_TYPES = [
  { id: "hard", name: "Hard Joint", kFactor: 0.12, description: "Metal-to-Metal, no compression" },
  { id: "soft", name: "Soft Joint", kFactor: 0.18, description: "With gasket or compressible material" },
  { id: "gasket", name: "Sealed Joint", kFactor: 0.15, description: "Joint with O-ring or sealant" },
]

export default function TorqueCalcDemo() {
  const [torque, setTorque] = useState(50)
  const [jointType, setJointType] = useState(JOINT_TYPES[0])
  const [diameter, setDiameter] = useState(10)

  // Simplified physics calculation for angle
  const angle = Math.round((torque * jointType.kFactor * 360) / (diameter * 0.5))
  const status = angle > 180 ? "warning" : "safe"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[#00ffff] text-sm font-bold flex items-center gap-2">
          <Cpu className="w-4 h-4" /> TORQUE & ANGLE CALCULATOR
        </h4>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${status === 'safe' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500 animate-pulse'}`}>
          {status === 'safe' ? 'System Ready' : 'Angle Limit Alert'}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-[#00ffff]/50 uppercase block mb-2">Target Torque (Nm)</label>
            <input 
              type="range" min="10" max="200" value={torque} 
              onChange={(e) => setTorque(Number(e.target.value))}
              className="w-full h-1 bg-[#00ffff]/20 rounded-lg appearance-none cursor-pointer accent-[#00ffff]"
            />
            <div className="text-right text-[#00ffff] font-mono font-bold mt-1">{torque} Nm</div>
          </div>

          <div>
            <label className="text-[10px] text-[#00ffff]/50 uppercase block mb-2">Joint Type</label>
            <div className="grid grid-cols-1 gap-2">
              {JOINT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setJointType(type)}
                  className={`text-left p-2 rounded text-[10px] transition-all border ${
                    jointType.id === type.id 
                      ? "bg-[#00ffff]/10 border-[#00ffff]/50 text-[#00ffff]" 
                      : "border-[#00ffff]/10 text-[#00ffff]/40 hover:border-[#00ffff]/30"
                  }`}
                >
                  <div className="font-bold">{type.name}</div>
                  <div className="opacity-60">{type.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="bg-[#0a0a0f] border border-[#00ffff]/20 rounded p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64" cy="64" r="60"
                fill="none" stroke="currentColor" strokeWidth="8"
                className="text-[#00ffff]/10"
              />
              <circle
                cx="64" cy="64" r="60"
                fill="none" stroke="currentColor" strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * Math.min(angle, 360)) / 360}
                className={`transition-all duration-500 ${status === 'safe' ? 'text-[#00ffff]' : 'text-yellow-500'}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono text-white">{angle}°</span>
              <span className="text-[8px] text-[#00ffff]/50 uppercase tracking-widest">Calculated Angle</span>
            </div>
          </div>

          <div className="mt-6 w-full space-y-2">
            <div className="flex items-center gap-2 p-2 rounded bg-black/40 text-[10px]">
              {status === "safe" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-green-500/80">Safe Angle - Joint will be correctly fixed</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-500/80">High Angle - Risk of yield limit deformation</span>
                </>
              )}
            </div>
          </div>

          {/* Background formula decoration */}
          <div className="absolute bottom-2 right-2 text-[8px] font-mono text-[#00ffff]/10">
            θ = (T * K * 360) / (d * 0.5)
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#00ffff]/5 border border-[#00ffff]/10 rounded text-[9px] text-[#00ffff]/40">
        <p className="font-bold mb-1 uppercase tracking-widest text-[#00ffff]/60">Physical Model Notes:</p>
        <p>Calculation based on linear elastic deformation model for M10-M14 automotive bolts. Actual results may vary depending on surface coating and lubricant factors (K-Factor).</p>
      </div>
    </div>
  )
}
