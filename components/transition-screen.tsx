"use client"

import { useState, useEffect, useRef } from "react"

interface TransitionScreenProps {
  onComplete: () => void
}

const ASCII_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF@#$%^&*()_+-=[]{}|;:',.<>?/~`"

const HACKING_MESSAGES = [
  "INICIANDO PROTOCOLO ICE-BREAKER...",
  "BYPASSANDO BLACKWALL_FIREWALL...",
  "ACESSANDO NET_ARCHITECTURE v2.077...",
  "CARREGANDO NEURAL_LINK.protocol...",
  "DESCRIPTOGRAFANDO BRAINDANCE_DATA...",
  "SINCRONIZANDO GHOST_IN_THE_SHELL...",
  "INJETANDO SHARD: WIDMER_OS.exe...",
  "DESVIO DE ROTA: NIGHT_CITY_NODE...",
  "ATIVANDO SANDEVISTAN_OVERCLOCK...",
  "CONECTANDO GITHUB://AWI-24...",
  "AUTENTICANDO: CORPO_CERTIFIED...",
  "ATIVANDO MODO CYBERPUNK_2077...",
  "SISTEMA ADRIAN.WIDMER ONLINE...",
  "ACESSO TOTAL CONCEDIDO...",
]

const GLITCH_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`█▓▒░▀▄▌▐─│┌┐└┘├┤┬┴┼"

export default function TransitionScreen({ onComplete }: TransitionScreenProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [matrixColumns, setMatrixColumns] = useState<{ chars: string; speed: number; x: number }[]>([])
  const [showGlitch, setShowGlitch] = useState(false)
  const [flashOpacity, setFlashOpacity] = useState(0)
  const [noiseOpacity, setNoiseOpacity] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate ASCII art logo
  const asciiLogo = `
   █████╗ ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗
  ██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗  ██║
  ███████║██║  ██║██████╔╝██║███████║██╔██╗ ██║
  ██╔══██║██║  ██║██╔══██╗██║██╔══██║██║╚██╗██║
  ██║  ██║██████╔╝██║  ██║██║██║  ██║██║ ╚████║
  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
       WIDMER // ML ENGINEER // v2.077
  `

  // Matrix rain effect
  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20)
    const columns = Array.from({ length: cols }, (_, i) => ({
      chars: Array.from({ length: 30 }, () => 
        ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
      ).join(""),
      speed: 0.5 + Math.random() * 2,
      x: i * 20
    }))
    setMatrixColumns(columns)
  }, [])

  // Terminal typing effect
  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    let currentLine = ""

    const typeInterval = setInterval(() => {
      if (lineIndex >= HACKING_MESSAGES.length) {
        clearInterval(typeInterval)
        setTimeout(onComplete, 1000)
        return
      }

      const message = HACKING_MESSAGES[lineIndex]
      
      if (charIndex < message.length) {
        currentLine += message[charIndex]
        setCurrentMessage(currentLine + (Math.random() > 0.5 ? "█" : "▌"))
        charIndex++
      } else {
        setTerminalLines(prev => [...prev.slice(-8), `> ${message}`])
        setProgress(((lineIndex + 1) / HACKING_MESSAGES.length) * 100)
        lineIndex++
        charIndex = 0
        currentLine = ""
        setCurrentMessage("")

        // Random effects
        if (Math.random() > 0.5) {
          setShowGlitch(true)
          setTimeout(() => setShowGlitch(false), 150)
        }
        if (Math.random() > 0.6) {
          setFlashOpacity(0.3)
          setTimeout(() => setFlashOpacity(0), 50)
        }
        if (Math.random() > 0.7) {
          setNoiseOpacity(0.2)
          setTimeout(() => setNoiseOpacity(0), 100)
        }
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [onComplete])

  // Canvas noise effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value * 0.2     // R
        data[i + 1] = value       // G (green tint)
        data[i + 2] = value * 0.3 // B
        data[i + 3] = 15          // A (very transparent)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const noiseInterval = setInterval(drawNoise, 50)
    return () => clearInterval(noiseInterval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {matrixColumns.map((col, i) => (
          <div
            key={i}
            className="absolute text-[#FCE94F] text-xs font-mono whitespace-pre leading-tight"
            style={{
              left: col.x,
              animation: `matrixFall ${5 / col.speed}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {col.chars.split("").map((char, j) => (
              <div 
                key={j} 
                style={{ 
                  opacity: 1 - (j / col.chars.length),
                  textShadow: j === 0 ? "0 0 10px #FCE94F, 0 0 20px #FCE94F" : "none"
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Noise Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: noiseOpacity + 0.05 }}
      />

      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(252, 233, 79, 0.03) 2px, rgba(252, 233, 79, 0.03) 4px)"
        }}
      />

      {/* Flash Effect */}
      <div 
        className="absolute inset-0 bg-[#FCE94F] pointer-events-none transition-opacity duration-50"
        style={{ opacity: flashOpacity }}
      />

      {/* Main Terminal Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen p-4 ${showGlitch ? "animate-glitch" : ""}`}>
        {/* ASCII Logo */}
        <pre 
          className="text-[#FCE94F] text-[8px] sm:text-xs md:text-sm font-mono mb-8 text-center"
          style={{
            textShadow: "0 0 10px #FCE94F, 0 0 20px #FCE94F",
            filter: showGlitch ? `hue-rotate(${Math.random() * 360}deg)` : "none"
          }}
        >
          {asciiLogo}
        </pre>

        {/* Terminal Window */}
        <div 
          className="w-full max-w-2xl bg-black/80 border border-[#FCE94F] rounded p-4"
          style={{ boxShadow: "0 0 20px rgba(252, 233, 79, 0.3), inset 0 0 20px rgba(252, 233, 79, 0.1)" }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#FCE94F]/30">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-[#FCE94F] text-sm font-mono">ADRIAN_WIDMER_PORTFOLIO.exe</span>
          </div>

          {/* Terminal Output */}
          <div className="font-mono text-sm space-y-1 h-48 overflow-hidden">
            {terminalLines.map((line, i) => (
              <div 
                key={i} 
                className="text-[#FCE94F]"
                style={{ 
                  textShadow: "0 0 5px #FCE94F",
                  opacity: 0.5 + (i / terminalLines.length) * 0.5
                }}
              >
                {line}
              </div>
            ))}
            {currentMessage && (
              <div className="text-[#FCE94F]" style={{ textShadow: "0 0 10px #FCE94F" }}>
                {">"} {currentMessage}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-[#FCE94F]/30">
            <div className="flex justify-between text-xs text-[#FCE94F] mb-2">
              <span>JACK-IN PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-black border border-[#FCE94F] rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF4400] to-[#FCE94F] transition-all duration-300"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: "0 0 10px #FCE94F"
                }}
              />
            </div>
          </div>
        </div>

        {/* Random Glitch Text */}
        {showGlitch && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span 
              className="text-6xl font-bold text-red-500"
              style={{ 
                fontFamily: "monospace",
                textShadow: "-2px 0 #00B4FF, 2px 0 #FF4400"
              }}
            >
              {Array.from({ length: 10 }, () => 
                GLITCH_SYMBOLS[Math.floor(Math.random() * GLITCH_SYMBOLS.length)]
              ).join("")}
            </span>
          </div>
        )}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 text-[#FCE94F] text-xs font-mono opacity-50">
        <div>SYS://WIDMER_NETRUNNER</div>
        <div>NODE: NIGHT_CITY.2077</div>
        <div>github.com/Awi-24</div>
      </div>
      <div className="absolute top-4 right-4 text-[#FCE94F] text-xs font-mono opacity-50 text-right">
        <div>STATUS: JACKED_IN</div>
        <div>ICE: BYPASSED</div>
        <div>LOC: SALVADOR.BA</div>
      </div>

      <style jsx>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes animate-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: animate-glitch 0.2s linear;
        }
      `}</style>
    </div>
  )
}
