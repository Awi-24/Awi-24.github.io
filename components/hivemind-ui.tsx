"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { Copy, Check } from "lucide-react"

export function HiveMindLogo({ size = 120, className = "" }: { size?: number, className?: string }) {
  const points = 12
  const innerRadius = 22
  const outerRadius = 42
  const centerRadius = 14

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Shockwave effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full rounded-full border border-[#F5C518] animate-shockwave opacity-0" />
      </div>
      
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <circle cx="50" cy="50" r={centerRadius} fill="#F5C518" />
        <circle cx="50" cy="50" r={centerRadius + 2} stroke="#F5C518" strokeWidth="0.5" opacity="0.3" />

        {Array.from({ length: points }).map((_, i) => {
          const angle = (i * 360) / points
          const rad = (angle * Math.PI) / 180
          const ix = 50 + Math.cos(rad) * innerRadius
          const iy = 50 + Math.sin(rad) * innerRadius
          const ox = 50 + Math.cos(rad) * outerRadius
          const oy = 50 + Math.sin(rad) * outerRadius

          const cp1x = 50 + Math.cos(rad - 0.1) * (innerRadius * 0.5)
          const cp1y = 50 + Math.sin(rad - 0.1) * (innerRadius * 0.5)
          const cp2x = 50 + Math.cos(rad + 0.1) * (innerRadius + (outerRadius - innerRadius) * 0.5)
          const cp2y = 50 + Math.sin(rad + 0.1) * (innerRadius + (outerRadius - innerRadius) * 0.5)

          const nextRad = ((i + 1) * 360 / points * Math.PI) / 180
          const nix = 50 + Math.cos(nextRad) * innerRadius
          const niy = 50 + Math.sin(nextRad) * innerRadius
          const cpWebX = 50 + Math.cos(rad + (Math.PI / points)) * (innerRadius * 0.8)
          const cpWebY = 50 + Math.sin(rad + (Math.PI / points)) * (innerRadius * 0.8)

          return (
            <g key={i}>
              <path d={`M 50 50 Q ${cp1x} ${cp1y} ${ix} ${iy}`} stroke="#F5C518" strokeWidth="1.5" opacity="0.4" fill="none" />
              <path d={`M ${ix} ${iy} Q ${cp2x} ${cp2y} ${ox} ${oy}`} stroke="#F5C518" strokeWidth="1.5" opacity="0.4" fill="none" />
              <path d={`M ${ix} ${iy} Q ${cpWebX} ${cpWebY} ${nix} ${niy}`} stroke="#F5C518" strokeWidth="1" opacity="0.2" fill="none" />
              <circle cx={ix} cy={iy} r="3" fill="#F5C518" opacity="0.8" />
              <circle cx={ox} cy={oy} r="4" fill="#F5C518" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function NodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let nodes: { x: number, y: number, vx: number, vy: number, ox: number, oy: number }[] = []
    const nodeCount = 60

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = Array.from({ length: nodeCount }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x, y, 
          ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#F5C518"
      ctx.strokeStyle = "#F5C518"

      nodes.forEach((node, i) => {
        // Natural movement
        node.x += node.vx
        node.y += node.vy

        // Mouse influence
        const mdx = mouseRef.current.x - node.x
        const mdy = mouseRef.current.y - node.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        
        if (mdist < 200) {
          const force = (200 - mdist) / 200
          node.x -= (mdx / mdist) * force * 2
          node.y -= (mdy / mdist) * force * 2
        }

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2)
        ctx.fill()

        // Connect to neighbors
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 180) {
            ctx.globalAlpha = (1 - dist / 180) * 0.2
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        // Connect specifically to mouse
        if (mdist < 200) {
          ctx.globalAlpha = (1 - mdist / 200) * 0.3
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
        }
      })
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

export function HiveMindCard({ children, title, icon: Icon, className = "" }: { children: ReactNode, title: string, icon: any, className?: string }) {
  return (
    <div className={`bg-[#141414] border-l-4 border-[#F5C518] rounded-r-lg p-6 flex flex-col gap-4 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-[#1a1a1a] scroll-reveal ${className}`}>
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
    }, 40)
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
