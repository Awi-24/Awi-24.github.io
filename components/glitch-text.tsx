"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: number
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:'\"<>?,./~`█▓▒░"

export default function GlitchText({ text, className = "", intensity = 1 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95 / intensity) {
        setIsGlitching(true)
        
        // Glitch the text
        const glitchedText = text.split("").map(char => {
          if (Math.random() > 0.7) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }
          return char
        }).join("")
        
        setDisplayText(glitchedText)
        setOffset({
          x: (Math.random() - 0.5) * 10 * intensity,
          y: (Math.random() - 0.5) * 5 * intensity
        })

        // Reset after short delay
        setTimeout(() => {
          setDisplayText(text)
          setIsGlitching(false)
          setOffset({ x: 0, y: 0 })
        }, 50 + Math.random() * 100)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text, intensity])

  return (
    <span 
      className={`relative inline-block ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isGlitching ? "none" : "transform 0.1s ease-out"
      }}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Cyan shadow layer */}
      <span 
        className="absolute inset-0 z-0"
        style={{
          color: "#FCE94F",
          clipPath: isGlitching ? `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)` : "none",
          transform: isGlitching ? `translateX(${-2 * intensity}px)` : "none",
          opacity: isGlitching ? 0.8 : 0
        }}
        aria-hidden="true"
      >
        {displayText}
      </span>
      
      {/* Magenta shadow layer */}
      <span 
        className="absolute inset-0 z-0"
        style={{
          color: "#FF4400",
          clipPath: isGlitching ? `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)` : "none",
          transform: isGlitching ? `translateX(${2 * intensity}px)` : "none",
          opacity: isGlitching ? 0.8 : 0
        }}
        aria-hidden="true"
      >
        {displayText}
      </span>
    </span>
  )
}
