"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { Copy, Check } from "lucide-react"

export function HiveMindLogo({ size = 120, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="8" fill="#F5C518" />
      <circle cx="50" cy="50" r="12" stroke="#F5C518" strokeWidth="0.5" strokeDasharray="2 2" />
      
      {/* Radial nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + Math.cos(rad) * 15
        const y1 = 50 + Math.sin(rad) * 15
        const x2 = 50 + Math.cos(rad) * 35
        const y2 = 50 + Math.sin(rad) * 35
        
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F5C518" strokeWidth="1" opacity="0.6" />
            <circle cx={x2} cy={y2} r="3" fill="#F5C518" />
            {/* Sub-connections */}
            <line 
              x1={x2} 
              y1={y2} 
              x2={50 + Math.cos(rad + 0.3) * 45} 
              y2={50 + Math.sin(rad + 0.3) * 45} 
              stroke="#F5C518" 
              strokeWidth="0.5" 
              opacity="0.3" 
            />
            <circle cx={50 + Math.cos(rad + 0.3) * 45} cy={50 + Math.sin(rad + 0.3) * 45} r="1.5" fill="#D4A017" opacity="0.5" />
          </g>
        )
      })}
    </svg>
  )
}

export function NodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let nodes: { x: number, y: number, vx: number, vy: number }[] = []
    const nodeCount = 40

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      }))
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#F5C518"
      ctx.strokeStyle = "#F5C518"

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.15
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}

export function HiveMindCard({ 
  children, 
  title, 
  icon: Icon,
  className = "" 
}: { 
  children: ReactNode, 
  title: string, 
  icon: any,
  className?: string 
}) {
  return (
    <div className={`bg-[#141414] border-l-4 border-[#F5C518] rounded-r-lg p-6 flex flex-col gap-4 shadow-xl ${className}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-[#F5C518]" />
        <h3 className="text-[#F0F0F0] font-bold text-lg">{title}</h3>
      </div>
      <div className="text-[#888888] text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export function Terminal({ command, className = "", animate = true }: { command: string, className?: string, animate?: boolean }) {
  const [copied, setCopied] = useState(false)
  const [displayText, setDisplayText] = useState(animate ? "" : command)
  const [isTyping, setIsTyping] = useState(animate)

  useEffect(() => {
    if (!animate) return
    
    let current = ""
    let index = 0
    const interval = setInterval(() => {
      if (index < command.length) {
        current += command[index]
        setDisplayText(current)
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [command, animate])

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`bg-[#0D0D0D] border border-[#1E1E1E] rounded-lg overflow-hidden font-mono text-sm ${className}`}>
      <div className="bg-[#141414] px-4 py-2 border-b border-[#1E1E1E] flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <button onClick={handleCopy} className="text-[#888888] hover:text-[#F5C518] transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 flex gap-3">
        <span className="text-[#F5C518] shrink-0">$</span>
        <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <code className="text-[#F0F0F0]">{displayText}</code>
          {isTyping && <span className="inline-block w-2 h-4 bg-[#F5C518] ml-1 animate-pulse" />}
        </div>
      </div>
    </div>
  )
}
