"use client"

import { useState, useEffect } from "react"
import { Search, Database, Bot, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react"

const SAMPLE_FASTENERS = [
  { basNumber: "W500412-S442", type: "Hex Bolt", size: "M8x1.25x25", material: "10.9 Steel", coating: "Zinc" },
  { basNumber: "W500413-S442", type: "Hex Bolt", size: "M8x1.25x30", material: "10.9 Steel", coating: "Zinc" },
  { basNumber: "W500414-S443", type: "Hex Bolt", size: "M8x1.25x25", material: "10.9 Steel", coating: "Dacromet" },
  { basNumber: "W711823-S437", type: "Hex Flange Bolt", size: "M8x1.25x25", material: "10.9 Steel", coating: "Zinc" },
]

const VALIDATION_STEPS = [
  "Verificar compatibilidade dimensional",
  "Confirmar classe de resistência",
  "Validar revestimento para ambiente",
  "Checar torque especificado",
  "Verificar disponibilidade no estoque",
]

export default function FastenerHunterDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof SAMPLE_FASTENERS>([])
  const [selectedFastener, setSelectedFastener] = useState<typeof SAMPLE_FASTENERS[0] | null>(null)
  const [llmAssessment, setLlmAssessment] = useState<string | null>(null)
  const [isTypingAssessment, setIsTypingAssessment] = useState(false)

  const handleSearch = () => {
    if (!searchTerm) return
    setIsSearching(true)
    setResults([])
    setSelectedFastener(null)
    setLlmAssessment(null)

    setTimeout(() => {
      setResults(SAMPLE_FASTENERS)
      setIsSearching(false)
    }, 800)
  }

  const generateAssessment = (fastener: typeof SAMPLE_FASTENERS[0]) => {
    setSelectedFastener(fastener)
    setIsTypingAssessment(true)
    setLlmAssessment("")

    const assessment = `ANÁLISE DE SUBSTITUIÇÃO - ${fastener.basNumber}

✓ COMPATIBILIDADE: Alta (98.5%)
Este fixador é um candidato adequado para substituição baseado nos seguintes critérios:

• Dimensões: ${fastener.size} - Compatível com especificação original
• Material: ${fastener.material} - Classe de resistência equivalente
• Revestimento: ${fastener.coating} - Adequado para ambiente veicular

PASSOS DE VALIDAÇÃO:
1. Confirmar com engenharia de produto
2. Executar teste de torque em ambiente controlado
3. Validar com equipe de qualidade

NOTA: Esta recomendação é baseada em análise automatizada. Sempre consultar documentação técnica oficial antes da implementação.`

    let index = 0
    const interval = setInterval(() => {
      if (index < assessment.length) {
        setLlmAssessment(assessment.slice(0, index + 1))
        index++
      } else {
        setIsTypingAssessment(false)
        clearInterval(interval)
      }
    }, 10)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#00ffff]">
        <Database className="w-5 h-5" />
        <h3 className="font-bold">Fastener Hunter</h3>
        <span className="text-xs text-[#ff00ff] bg-[#ff00ff]/10 px-2 py-0.5 rounded">3 DBs Integrados</span>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Digite o BAS Number (ex: W500412)"
            className="w-full bg-[#0a0a0f] border border-[#00ffff]/30 rounded-lg px-4 py-3 text-[#00ffff] text-sm placeholder:text-[#00ffff]/30 focus:border-[#00ffff] focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00ffff]/30" />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching || !searchTerm}
          className="px-4 py-2 bg-[#ff00ff] text-[#0a0a0f] rounded-lg font-bold text-sm hover:bg-[#ff00ff]/80 disabled:opacity-50 transition-all"
        >
          Buscar
        </button>
      </div>

      {/* Searching Animation */}
      {isSearching && (
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin w-5 h-5 border-2 border-[#00ffff] border-t-transparent rounded-full" />
            <span className="text-[#00ffff]/70 text-sm">Consultando 3 bancos de dados...</span>
          </div>
          <div className="flex gap-2 mt-3">
            {["GFDS", "WERS", "COSTING"].map((db, i) => (
              <div key={db} className="flex-1 h-1 bg-[#0a0a0f] rounded overflow-hidden">
                <div 
                  className="h-full bg-[#00ffff] animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && !selectedFastener && (
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[#00ffff]/70 text-xs">{results.length} resultados encontrados</span>
            <span className="text-[#00ff9f] text-xs">Ordenado por compatibilidade</span>
          </div>
          
          {results.map((fastener, i) => (
            <button
              key={fastener.basNumber}
              onClick={() => generateAssessment(fastener)}
              className="w-full text-left bg-[#0a0a0f] border border-[#00ffff]/10 rounded-lg p-3 hover:border-[#00ffff]/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#00ffff] font-mono text-sm">{fastener.basNumber}</p>
                  <p className="text-[#00ffff]/50 text-xs mt-1">
                    {fastener.type} | {fastener.size} | {fastener.material}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    i === 0 ? "bg-[#00ff9f]/20 text-[#00ff9f]" : "bg-[#ffcc00]/20 text-[#ffcc00]"
                  }`}>
                    {i === 0 ? "Best Match" : `${98 - i * 3}%`}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#00ffff]/30 group-hover:text-[#00ffff] transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* LLM Assessment */}
      {selectedFastener && (
        <div className="space-y-3">
          {/* Selected Fastener Card */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#ff00ff]/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#00ff9f]" />
              <span className="text-[#00ff9f] text-sm font-bold">Fastener Selecionado</span>
            </div>
            <p className="text-[#00ffff] font-mono">{selectedFastener.basNumber}</p>
            <p className="text-[#00ffff]/50 text-xs">
              {selectedFastener.type} | {selectedFastener.size} | {selectedFastener.coating}
            </p>
          </div>

          {/* AI Assessment */}
          <div className="bg-[#0d0d1a] rounded-lg border border-[#ff00ff]/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-[#ff00ff]" />
              <span className="text-[#ff00ff] text-sm font-bold">Assessment LLM</span>
              {isTypingAssessment && (
                <span className="w-2 h-4 bg-[#ff00ff] animate-pulse" />
              )}
            </div>
            
            <pre className="text-[#00ffff] text-xs font-mono whitespace-pre-wrap leading-relaxed">
              {llmAssessment}
            </pre>
          </div>

          {/* Validation Checklist */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/20 p-4">
            <p className="text-[#00ffff]/70 text-xs mb-3">Checklist de Validação:</p>
            <div className="space-y-2">
              {VALIDATION_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-[#00ffff]/30 rounded flex items-center justify-center">
                    {!isTypingAssessment && i < 3 && (
                      <CheckCircle className="w-3 h-3 text-[#00ff9f]" />
                    )}
                  </div>
                  <span className="text-[#00ffff]/60 text-xs">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => { setSelectedFastener(null); setLlmAssessment(null) }}
            className="w-full py-2 text-[#00ffff]/70 text-xs hover:text-[#00ffff] transition-colors"
          >
            ← Voltar aos resultados
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && results.length === 0 && !selectedFastener && (
        <div className="bg-[#1a1a2e] rounded-lg border border-[#00ffff]/10 p-6 text-center">
          <Search className="w-8 h-8 text-[#00ffff]/20 mx-auto mb-2" />
          <p className="text-[#00ffff]/50 text-sm">Digite um BAS Number para buscar</p>
          <p className="text-[#00ffff]/30 text-xs mt-1">Exemplo: W500412-S442</p>
        </div>
      )}
    </div>
  )
}
