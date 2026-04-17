"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { Copy, Check } from "lucide-react"

// 1. TEXT SCRAMBLE EFFECT
export function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const chars = "!<>-_\\/[]{}—=+*^?#________"
  
  useEffect(() => {
    let frame = 0
    let timeout: NodeJS.Timeout
    
    const start = () => {
      const interval = setInterval(() => {
        setDisplayText(text.split('').map((char, index) => {
          if (char === ' ' || char === '\n') return char
          if (index < frame / 3) return text[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join(''))
        
        frame++
        if (frame / 3 > text.length) clearInterval(interval)
      }, 30)
    }

    timeout = setTimeout(start, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [text, delay])

  return <span>{displayText}</span>
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
    let nodes: { x: number, y: number, vx: number, vy: number }[] = []
    const nodeCount = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = Array.from({ length: nodeCount }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x, y, 
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
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
        
        if (mdist < 250) {
          const force = (250 - mdist) / 250
          node.x -= (mdx / mdist) * force * 1.5
          node.y -= (mdy / mdist) * force * 1.5
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

          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.15
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        if (mdist < 200) {
          ctx.globalAlpha = (1 - mdist / 200) * 0.25
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
}

export function HiveMindCard({ children, title, icon: Icon, className = "" }: { children: ReactNode, title: string, icon: any, className?: string }) {
  return (
    <div className={`bg-[#141414] border border-white/5 border-l-4 border-l-[#F5C518] rounded-r-lg p-6 flex flex-col gap-4 shadow-xl transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_0_30px_rgba(245,197,24,0.1)] group relative overflow-hidden scroll-reveal ${className}`}>
      {/* Light Sweep Animation */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />
      
      <div className="flex items-center gap-3 relative z-10">
        <Icon className="w-6 h-6 text-[#F5C518] group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-[#F0F0F0] font-orbitron font-bold text-base tracking-wider">{title}</h3>
      </div>
      <div className="text-[#888888] text-sm leading-relaxed relative z-10 group-hover:text-[#F0F0F0] transition-colors duration-300">
        {children}
      </div>
    </div>
  )
}

export function Terminal({ command, className = "", animate = true, fullWidth = false }: { command: string, className?: string, animate?: boolean, fullWidth?: boolean }) {
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
    }, 30)
    return () => clearInterval(interval)
  }, [command, animate])

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`bg-[#0D0D0D] border border-[#1E1E1E] rounded-lg overflow-hidden font-mono text-sm shadow-2xl ${fullWidth ? 'w-full' : 'max-w-2xl'} ${className} hover:border-[#F5C518]/30 transition-colors duration-500`}>
      <div className="bg-[#141414] px-4 py-3 border-b border-[#1E1E1E] flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-60" />
        </div>
        <button onClick={handleCopy} className="text-[#888888] hover:text-[#F5C518] transition-colors flex items-center gap-2 text-xs font-orbitron uppercase tracking-tighter">
          {copied ? <><Check className="w-3 h-3 text-green-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <div className="p-5 flex gap-4 overflow-hidden">
        <span className="text-[#F5C518] shrink-0 font-bold select-none">$</span>
        <div className="flex-1 overflow-hidden">
          <code className="text-[#F0F0F0] break-all whitespace-pre-wrap block">{displayText}</code>
          {isTyping && <span className="inline-block w-2.5 h-5 bg-[#F5C518] ml-1 align-middle animate-pulse" />}
        </div>
      </div>
    </div>
  )
}
