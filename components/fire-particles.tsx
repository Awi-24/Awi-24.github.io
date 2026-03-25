"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
  type: "fire" | "spark" | "ember"
}

const COLORS = {
  fire: ["#ff0040", "#ff6600", "#ffff00", "#ff00ff", "#00ffff"],
  spark: ["#ffffff", "#00ffff", "#ff00ff"],
  ember: ["#ff0040", "#ff6600"]
}

export default function FireParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create initial particles
    const createParticle = (x?: number, y?: number, type: "fire" | "spark" | "ember" = "fire"): Particle => {
      const colors = COLORS[type]
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? canvas.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        size: type === "spark" ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        type
      }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(createParticle(undefined, undefined, Math.random() > 0.7 ? "ember" : "fire"))
    }

    let animationId: number
    let sparkTimer = 0

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn new particles from bottom
      if (Math.random() > 0.7) {
        particlesRef.current.push(createParticle(
          Math.random() * canvas.width,
          canvas.height + 10,
          Math.random() > 0.8 ? "ember" : "fire"
        ))
      }

      // Spawn electric sparks periodically
      sparkTimer++
      if (sparkTimer > 30 && Math.random() > 0.9) {
        const sparkX = Math.random() * canvas.width
        const sparkY = Math.random() * canvas.height
        for (let i = 0; i < 5; i++) {
          particlesRef.current.push({
            x: sparkX,
            y: sparkY,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            size: Math.random() * 3 + 1,
            life: 0,
            maxLife: 20,
            color: COLORS.spark[Math.floor(Math.random() * COLORS.spark.length)],
            type: "spark"
          })
        }
        sparkTimer = 0
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++
        if (p.life > p.maxLife) return false

        // Physics
        p.x += p.vx
        p.y += p.vy
        
        if (p.type === "fire" || p.type === "ember") {
          p.vx += (Math.random() - 0.5) * 0.5
          p.vy -= 0.02 // Upward acceleration
        }

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.5
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Draw
        const alpha = 1 - (p.life / p.maxLife)
        ctx.save()
        ctx.globalAlpha = alpha
        
        if (p.type === "spark") {
          // Draw spark with glow
          ctx.shadowBlur = 10
          ctx.shadowColor = p.color
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Draw fire particle with gradient
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, p.color)
          gradient.addColorStop(1, "transparent")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife * 0.5), 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.restore()

        return true
      })

      // Keep particle count reasonable
      while (particlesRef.current.length > 200) {
        particlesRef.current.shift()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.6 }}
    />
  )
}
