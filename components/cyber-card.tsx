"use client"

import { useState, useRef, ReactNode } from "react"

interface CyberCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function CyberCard({ children, delay = 0, className = "" }: CyberCardProps) {
  const [transform, setTransform] = useState("")
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowPosition({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    })
  }

  const handleMouseLeave = () => {
    setTransform("")
    setGlowPosition({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg transition-transform duration-200 ${className}`}
      style={{
        transform,
        animationDelay: `${delay}s`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background with gradient border */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff9f 100%)",
          padding: "1px"
        }}
      />
      
      {/* Inner background */}
      <div className="absolute inset-[1px] rounded-lg bg-[#0d0d15]" />
      
      {/* Glow effect that follows mouse */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)`,
          opacity: transform ? 1 : 0
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ffff] rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff00ff] rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff00ff] rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffff] rounded-br-lg" />

      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
