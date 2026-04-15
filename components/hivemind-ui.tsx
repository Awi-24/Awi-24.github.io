"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { Copy, Check } from "lucide-react"

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
        node.x += node.vx
        node.y += node.vy

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
