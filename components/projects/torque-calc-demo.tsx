"use client"

import { useState, useEffect } from "react"
import { Calculator, AlertTriangle, CheckCircle, RotateCw } from "lucide-react"

const JOINT_TYPES = [
  { id: "hard", name: "Junta Rígida", kFactor: 0.12, description: "Metal-Metal, sem compressão" },
  { id: "soft", name: "Junta Macia", kFactor: 0.18, description: "Com gaxeta ou material compressível" },
  { id: "gasket", name: "Com Vedação", kFactor: 0.15, description: "Junta com O-ring ou vedante" },
]

const FASTENER_SIZES = [
  { id: "m6", name: "M6", diameter: 6, pitch: 1.0 },
  { id: "m8", name: "M8", diameter: 8, pitch: 1.25 },
  { id: "m10", name: "M10", diameter: 10, pitch: 1.5 },
  { id: "m12", name: "M12", diameter: 12, pitch: 1.75 },
]

export default function TorqueCalcDemo() {
  const [torque, setTorque] = useState(25)
  const [jointType, setJointType] = useState("hard")
  const [fastenerSize, setFastenerSize] = useState("m10")
  const [calculatedAngle, setCalculatedAngle] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [status, setStatus] = useState<"safe" | "warning" | "danger">("safe")

  const selectedJoint = JOINT_TYPES.find(j => j.id === jointType)!
  const selectedFastener = FASTENER_SIZES.find(f => f.id === fastenerSize)!

  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      // Simplified angle calculation formula
      // Real formula involves clamp load, friction, and material properties
      const kFactor = selectedJoint.kFactor
      const diameter = selectedFastener.diameter
      const pitch = selectedFastener.pitch
      
      // Angle = (Torque * 360) / (π * d * pitch * k)
      const angle = Math.round((torque * 360) / (Math.PI * diameter * pitch * kFactor))
      
      setCalculatedAngle(Math.min(angle, 180))
      
      if (angle > 150) setStatus("danger")
      else if (angle > 100) setStatus("warning")
      else setStatus("safe")
      
      setIsCalculating(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [torque, jointType, fastenerSize, selectedJoint, selectedFastener])

  const statusColors = {
    safe: { bg: "#0d3d2e", border: "#00ff9f", text: "#00ff9f" },
    warning: { bg: "#3d3d0d", border: "#ffcc00", text: "#ffcc00" },
    danger: { bg: "#3d0d0d", border: "#ff0040", text: "#ff0040" },
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#00ffff]">
        <Calculator className="w-5 h-5" />
        <h3 className="font-bold">Calculadora Torque + Angulo</h3>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-2 gap-3">
        {/* Torque Input */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-3">
          <label className="text-[#00ffff]/70 text-xs block mb-2">Torque (Nm)</label>
          <input
            type="range"
            min="5"
            max="100"
            value={torque}
            onChange={(e) => setTorque(Number(e.target.value))}
            className="w-full accent-[#ff00ff]"
          />
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-[#ff00ff]">{torque}</span>
            <span className="text-[#00ffff]/50 text-sm ml-1">Nm</span>
          </div>
        </div>

        {/* Fastener Size */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-3">
          <label className="text-[#00ffff]/70 text-xs block mb-2">Tamanho Fixador</label>
          <div className="grid grid-cols-2 gap-1">
            {FASTENER_SIZES.map(f => (
              <button
                key={f.id}
                onClick={() => setFastenerSize(f.id)}
                className={`py-2 rounded text-xs font-mono transition-all ${
                  fastenerSize === f.id
                    ? "bg-[#ff00ff] text-[#0a0a0f]"
                    : "bg-[#0a0a0f] text-[#00ffff] border border-[#00ffff]/20 hover:border-[#00ffff]/50"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Joint Type Selection */}
      <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-3">
        <label className="text-[#00ffff]/70 text-xs block mb-2">Tipo de Junta</label>
        <div className="space-y-2">
          {JOINT_TYPES.map(j => (
            <button
              key={j.id}
              onClick={() => setJointType(j.id)}
              className={`w-full p-2 rounded text-left transition-all ${
                jointType === j.id
                  ? "bg-[#00ffff]/10 border border-[#00ffff]"
                  : "bg-[#0a0a0f] border border-[#00ffff]/10 hover:border-[#00ffff]/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[#00ffff] text-sm font-medium">{j.name}</span>
                <span className="text-[#ff00ff] text-xs font-mono">K={j.kFactor}</span>
              </div>
              <p className="text-[#00ffff]/50 text-xs mt-1">{j.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      <div 
        className="rounded-lg p-4 border-2 transition-all"
        style={{ 
          backgroundColor: statusColors[status].bg,
          borderColor: statusColors[status].border
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#00ffff]/70 text-sm">Angulo Calculado</span>
          {isCalculating ? (
            <RotateCw className="w-5 h-5 text-[#00ffff] animate-spin" />
          ) : status === "safe" ? (
            <CheckCircle className="w-5 h-5" style={{ color: statusColors[status].text }} />
          ) : (
            <AlertTriangle className="w-5 h-5" style={{ color: statusColors[status].text }} />
          )}
        </div>
        
        <div className="text-center">
          <span 
            className="text-5xl font-bold"
            style={{ color: statusColors[status].text }}
          >
            {calculatedAngle}°
          </span>
        </div>

        {/* Visual Angle Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-32 h-16 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 w-32 h-32 border-2 border-[#00ffff]/30 rounded-full -translate-x-1/2" />
            <div 
              className="absolute bottom-0 left-1/2 w-1 h-14 origin-bottom transition-transform duration-300"
              style={{ 
                backgroundColor: statusColors[status].text,
                transform: `translateX(-50%) rotate(${calculatedAngle - 90}deg)`,
                boxShadow: `0 0 10px ${statusColors[status].text}`
              }}
            />
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#00ffff] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>

        {/* Status Message */}
        <p 
          className="text-center text-xs mt-3"
          style={{ color: statusColors[status].text }}
        >
          {status === "safe" && "Angulo seguro - Junta será fixada corretamente"}
          {status === "warning" && "Atencao - Proximo do limite. Verificar especificacoes"}
          {status === "danger" && "PERIGO - Angulo excessivo pode danificar a junta!"}
        </p>
      </div>

      {/* Formula Info */}
      <div className="bg-[#0a0a0f] rounded border border-[#00ffff]/10 p-3">
        <p className="text-[#00ffff]/50 text-xs font-mono">
          θ = (T × 360) / (π × d × p × K)
        </p>
        <p className="text-[#00ffff]/30 text-[10px] mt-1">
          Onde: T=Torque, d=Diâmetro, p=Passo, K=Fator de atrito
        </p>
      </div>
    </div>
  )
}
