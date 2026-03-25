"use client"

import { useEffect, useRef, useState } from "react"

const ASCII_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF@#$%^&*<>[]{}|;:'\"\\/"

interface Column {
  x: number
  y: number
  speed: number
  chars: string[]
  lastUpdate: number
}

export default function AsciiRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const columnsRef = useRef<Column[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const fontSize = 14
    let columns: Column[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize columns
      const numColumns = Math.ceil(canvas.width / fontSize)
      columns = []
      
      for (let i = 0; i < numColumns; i++) {
        // Only create columns with some spacing
        if (Math.random() > 0.7) {
          const chars = Array.from({ length: Math.floor(Math.random() * 20 + 10) }, () => 
            ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
          )
          columns.push({
            x: i * fontSize,
            y: Math.random() * canvas.height - canvas.height,
            speed: Math.random() * 2 + 1,
            chars,
            lastUpdate: Date.now()
          })
        }
      }
      columnsRef.current = columns
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number

    const animate = () => {
      // Semi-transparent clear for trail effect
      ctx.fillStyle = "rgba(5, 5, 8, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      columnsRef.current.forEach((col, colIndex) => {
        // Update column position
        col.y += col.speed

        // Randomly change characters
        if (Date.now() - col.lastUpdate > 100) {
          const randomIndex = Math.floor(Math.random() * col.chars.length)
          col.chars[randomIndex] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
          col.lastUpdate = Date.now()
        }

        // Draw characters
        col.chars.forEach((char, i) => {
          const y = col.y + i * fontSize
          
          if (y > 0 && y < canvas.height) {
            // Color based on position - head is brighter
            const isHead = i === col.chars.length - 1
            const alpha = isHead ? 1 : (1 - i / col.chars.length) * 0.5
            
            if (isHead) {
              ctx.fillStyle = "#FCE94F"
              ctx.shadowBlur = 10
              ctx.shadowColor = "#FCE94F"
            } else if (Math.random() > 0.98) {
              // Random highlight
              ctx.fillStyle = "#FF4400"
              ctx.shadowBlur = 5
              ctx.shadowColor = "#FF4400"
            } else {
              ctx.fillStyle = `rgba(0, 180, 255, ${alpha})`
              ctx.shadowBlur = 0
            }

            ctx.fillText(char, col.x, y)
          }
        })

        // Reset column when it goes off screen
        if (col.y - col.chars.length * fontSize > canvas.height) {
          col.y = -col.chars.length * fontSize
          col.speed = Math.random() * 2 + 1
          col.chars = Array.from({ length: Math.floor(Math.random() * 20 + 10) }, () => 
            ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
          )
        }
      })

      // Reset shadow for next frame
      ctx.shadowBlur = 0

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-5"
      style={{ opacity: 0.15 }}
    />
  )
}
