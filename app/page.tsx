"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Monitor, Zap, Code2, User, Briefcase, Mail, ExternalLink, Github, Linkedin, Terminal, Cpu, Shield, Database, Globe, Sparkles } from "lucide-react"
import RetroPage from "@/components/retro-page"
import TransitionScreen from "@/components/transition-screen"
import ModernPage from "@/components/modern-page"

export type AppState = "retro" | "transitioning" | "modern"

export default function CyberpunkPortfolio() {
  const [appState, setAppState] = useState<AppState>("retro")
  const [glitchIntensity, setGlitchIntensity] = useState(0)

  const handleEnterModern = () => {
    setAppState("transitioning")
  }

  const handleTransitionComplete = () => {
    setAppState("modern")
  }

  const handleBackToRetro = () => {
    setAppState("retro")
  }

  // Random glitch effect
  useEffect(() => {
    if (appState === "modern") {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.95) {
          setGlitchIntensity(Math.random())
          setTimeout(() => setGlitchIntensity(0), 100)
        }
      }, 500)
      return () => clearInterval(glitchInterval)
    }
  }, [appState])

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#00ffff] overflow-x-hidden">
      {appState === "retro" && <RetroPage onEnterModern={handleEnterModern} />}
      {appState === "transitioning" && <TransitionScreen onComplete={handleTransitionComplete} />}
      {appState === "modern" && <ModernPage onBack={handleBackToRetro} glitchIntensity={glitchIntensity} />}
    </main>
  )
}
