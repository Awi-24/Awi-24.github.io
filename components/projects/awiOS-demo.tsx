"use client"

import { useState, useEffect, useRef } from "react"
import { Code } from "lucide-react"
import { ProjectDemoHero3D } from "@/components/project-demo-hero-3d"

// Simlish-style gibberish generator
const SIMLISH_WORDS = [
  "Sul sul!", "Dag dag!", "Nooboo!", "Wabadebadoo!", "Firby nurbs!", 
  "Yibs!", "Blursh!", "Chumcha!", "Vadish!", "Fleenstones!",
  "Ooh be gah!", "Benzi cansen!", "Gerbit!", "Myshuno!", "Shpansaa!"
]

const DIALOGUE = [
  { speaker: "Serena", avatar: "S", text: "Sul sul! Benzi cansen, Adrian!", emotion: "happy" },
  { speaker: "Adrian", avatar: "A", text: "Dag dag, Serena! Yibs yibs!", emotion: "wave", isPlayer: true },
  { speaker: "Serena", avatar: "S", text: "Nooboo firby nurbs? Fleenstones wabadebadoo!", emotion: "curious" },
  { speaker: "Adrian", avatar: "A", text: "Blursh blursh! Chumcha vadish myshuno!", emotion: "thinking", isPlayer: true },
  { speaker: "Serena", avatar: "S", text: "Ooh be gah! Gerbit gerbit!", emotion: "excited" },
  { speaker: "Adrian", avatar: "A", text: "Shpansaa! Benzi cansen firby!", emotion: "happy", isPlayer: true },
  { speaker: "Serena", avatar: "S", text: "Wabadebadoo! Sul sul, dag dag!", emotion: "wave" },
  { speaker: "Narrador", avatar: "N", text: "[choice] → Abracar Serena | → Dar presente | → Sair", isSystem: true },
  { speaker: "Adrian", avatar: "A", text: "Nooboo nooboo! *abraca*", emotion: "love", isPlayer: true },
  { speaker: "Serena", avatar: "S", text: "Ohhh! Myshuno myshuno! Sul sul!", emotion: "heart" },
]

const CODE_EXAMPLE = `// awiOS Engine - Syntax
[scene: encontro_praca]
  bg: "praca_cidade.png"
  
  serena.enter(left)
  serena.say("Sul sul!")
  serena.emotion(happy)
  
  player.say("Dag dag!")
  
  [choice: interacao]
    → "Abracar" {
      relationship += 10
      goto: romance_path
    }
    → "Dar presente" {
      if inventory.has("flor")
        relationship += 20
      goto: gift_scene
    }
`

export default function AwiOSDemo() {
  const [messages, setMessages] = useState<typeof DIALOGUE>([])
  const [showCode, setShowCode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  // Auto-scroll and auto-add messages
  useEffect(() => {
    if (messages.length < DIALOGUE.length) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setMessages(prev => [...prev, DIALOGUE[prev.length]])
        setIsTyping(false)
      }, 1500 + Math.random() * 1000)
      return () => clearTimeout(timeout)
    }
  }, [messages])

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const getEmotionIcon = (emotion?: string) => {
    switch(emotion) {
      case 'happy': return '😊'
      case 'wave': return '👋'
      case 'curious': return '🤔'
      case 'thinking': return '💭'
      case 'excited': return '🎉'
      case 'love': return '🥰'
      case 'heart': return '❤️'
      default: return '💬'
    }
  }

  return (
    <div className="space-y-4">
      <ProjectDemoHero3D shape="layers" accent="#3a9fe8" secondary="#ff6b9d" />
      {/* Chat Window - Sims Style */}
      <div className="bg-gradient-to-b from-[#1a3a5c] to-[#0d2840] rounded-2xl overflow-hidden border-2 border-[#2a5a8c] shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a5a8c] to-[#3a7ab0] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00ff9f] animate-pulse" />
            <span className="text-white font-bold text-sm">awiOS Chat Engine</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00]" />
            <div className="w-2 h-2 rounded-full bg-[#00ff9f]" />
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatRef} className="h-72 overflow-y-auto p-3 space-y-3 hide-scrollbar">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex gap-2 ${msg.isPlayer ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                msg.isSystem 
                  ? 'bg-[#666]' 
                  : msg.isPlayer 
                    ? 'bg-gradient-to-br from-[#00ff9f] to-[#00ccff]' 
                    : 'bg-gradient-to-br from-[#ff6b9d] to-[#c44569]'
              }`}>
                {msg.avatar}
              </div>
              
              {/* Message Bubble */}
              <div className={`max-w-[70%] ${msg.isPlayer ? 'items-end' : 'items-start'}`}>
                <div className={`px-3 py-2 rounded-2xl ${
                  msg.isSystem 
                    ? 'bg-[#333] border border-[#555]' 
                    : msg.isPlayer 
                      ? 'bg-gradient-to-r from-[#00ccff] to-[#00ff9f] text-[#0a0a0f]' 
                      : 'bg-[#2a4a6c]'
                }`}>
                  {!msg.isSystem && (
                    <p className={`text-xs font-bold mb-1 ${msg.isPlayer ? 'text-[#0a0a0f]/70' : 'text-[#ff6b9d]'}`}>
                      {msg.speaker} {getEmotionIcon(msg.emotion)}
                    </p>
                  )}
                  <p className={`text-sm ${msg.isSystem ? 'text-[#00ff9f] font-mono text-xs' : msg.isPlayer ? 'text-[#0a0a0f]' : 'text-white'}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && messages.length < DIALOGUE.length && (
            <div className="flex gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                DIALOGUE[messages.length]?.isPlayer 
                  ? 'bg-gradient-to-br from-[#00ff9f] to-[#00ccff]' 
                  : 'bg-gradient-to-br from-[#ff6b9d] to-[#c44569]'
              }`}>
                {DIALOGUE[messages.length]?.avatar}
              </div>
              <div className="bg-[#2a4a6c] px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area (decorative) */}
        <div className="bg-[#0d2840] border-t border-[#2a5a8c] p-3 flex gap-2">
          <div className="flex-1 bg-[#1a3a5c] rounded-full px-4 py-2 text-[#6a8aac] text-sm">
            Digitando em Simlish...
          </div>
          <button className="w-10 h-10 bg-gradient-to-r from-[#00ff9f] to-[#00ccff] rounded-full flex items-center justify-center">
            <span className="text-[#0a0a0f] text-lg">➤</span>
          </button>
        </div>
      </div>

      {/* Code Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full p-3 bg-[#1a1a2e] rounded border border-[#00ffff]/20 text-[#00ffff] hover:border-[#00ffff]/50 transition-all text-sm font-mono flex items-center justify-center gap-2"
      >
        <Code className="w-4 h-4" />
        {showCode ? 'Esconder' : 'Ver'} Sintaxe awiOS
      </button>

      {showCode && (
        <div className="bg-[#0a0a0f] rounded border border-[#00ffff]/20 p-3 overflow-auto max-h-48">
          <pre className="text-[#00ff9f] text-xs font-mono leading-relaxed whitespace-pre">
            {CODE_EXAMPLE}
          </pre>
        </div>
      )}
    </div>
  )
}
