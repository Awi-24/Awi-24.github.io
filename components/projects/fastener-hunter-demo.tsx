'use client'

import { useState } from 'react'
import { Search, Database, Bot, CheckCircle, AlertTriangle, ChevronRight, Layers, Filter, Cpu } from 'lucide-react'

const SAMPLE_RESULTS = [
  {
    baseNumber: "W500412-S440",
    desc: "Hex Bolt & Washer M10x40",
    material: "Class 10.9 Steel",
    coating: "Dacromet",
    size: "M10 x 1.5 x 40",
    sources: ["GFDS", "WERS"],
    score: 98.4
  },
  {
    baseNumber: "W500415-S442",
    desc: "Hex Bolt M10x45",
    material: "Class 10.9 Steel",
    coating: "Zinc",
    size: "M10 x 1.5 x 45",
    sources: ["GFDS", "COSTING"],
    score: 85.2
  },
  {
    baseNumber: "W712334-S440",
    desc: "Hex Bolt M10x35",
    material: "Class 8.8 Steel",
    coating: "Dacromet",
    size: "M10 x 1.5 x 35",
    sources: ["WERS"],
    score: 72.1
  }
]

const ASSESSMENT_TEMPLATE = (f: any) => `REPLACEMENT REPORT — ${f.baseNumber}
--------------------------------------------------
IDENTIFIED OPPORTUNITY:
High geometric compatibility detected between 
${f.baseNumber} and the legacy reference.

TECHNICAL RISK ASSESSMENT:
• ${f.coating === "Dacromet" ? "Dacromet Coating: superior corrosion resistance — verify compatibility with line fluids" : "Zinc Coating: suitable for dry environments — confirm if there is fluid exposure"}
• Maximum torque may vary ±5–8% vs original spec — validate with product engineering
• ${f.sources.length > 1 ? `Base Number available in ${f.sources.join(" and ")}: vendor consolidation possible` : `Single source (${f.sources[0]}): consider multi-sourcing validation`}
• ${f.score > 90 ? "High Similarity (>90%): preferred candidate for immediate replacement" : f.score > 80 ? "Good Similarity — suitable as substitute with minimal validation" : "Moderate Similarity — testing recommended before implementation"}

🔧 TECHNICAL ANALYSIS
Material Class ${f.material}: equivalent to original spec.
Dimensions ${f.size} within dimensional tolerance.
Verify assembly specs (torque + angle) before line application.`

export default function FastenerHunterDemo() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof SAMPLE_RESULTS>([])
  const [selected, setSelected] = useState<typeof SAMPLE_RESULTS[0] | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    setIsSearching(true)
    setResults([])
    setSelected(null)
    
    setTimeout(() => {
      setIsSearching(false)
      setResults(SAMPLE_RESULTS)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e] rounded-lg border border-[#FCE94F]/20 p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FCE94F]/40" />
            <input 
              type="text" 
              placeholder="Enter Base Number (e.g., W500412)"
              className="w-full bg-black/40 border border-[#FCE94F]/20 rounded px-10 py-2 text-xs text-[#FCE94F] focus:outline-none focus:border-[#FCE94F]/50 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-[#FCE94F] text-black px-4 py-2 rounded text-xs font-bold hover:bg-[#FCE94F]/80 transition-all flex items-center gap-2"
          >
            {isSearching ? <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Bot className="w-3 h-3" />}
            SEARCH
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] text-[#FCE94F]/40 font-mono uppercase tracking-widest">
            <span>Query Results</span>
            <span>Layer 1: Vector Search</span>
          </div>
          
          <div className="space-y-2 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {isSearching ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-[#1a1a2e]/50 rounded border border-[#FCE94F]/5 animate-pulse" />
              ))
            ) : results.length > 0 ? (
              results.map((res, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(res)}
                  className={`w-full text-left p-3 rounded border transition-all group ${
                    selected?.baseNumber === res.baseNumber 
                      ? "bg-[#FCE94F]/10 border-[#FCE94F]/40 shadow-[0_0_15px_rgba(252,233,79,0.1)]" 
                      : "bg-[#1a1a2e] border-[#FCE94F]/10 hover:border-[#FCE94F]/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#FCE94F]">{res.baseNumber}</span>
                    <span className="text-[10px] font-mono text-[#FCE94F]/60">{res.score}% Match</span>
                  </div>
                  <p className="text-[10px] text-[#FCE94F]/40 line-clamp-1">{res.desc}</p>
                  <div className="flex gap-1 mt-2">
                    {res.sources.map(s => (
                      <span key={s} className="text-[8px] px-1 bg-black/40 border border-[#FCE94F]/10 text-[#FCE94F]/40 rounded uppercase font-mono">{s}</span>
                    ))}
                  </div>
                </button>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#FCE94F]/20 space-y-2 border-2 border-dashed border-[#FCE94F]/5 rounded">
                <Search className="w-8 h-8 opacity-20" />
                <p className="text-xs">Search legacy DBs (GFDS, WERS, COSTING)</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Assessment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] text-[#FF4400]/60 font-mono uppercase tracking-widest">
            <span>Layer 2: LLM Assessment</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>GPT-4o Mini</span>
            </div>
          </div>

          <div className="bg-black/60 border border-[#FF4400]/20 rounded h-[300px] p-4 font-mono text-[10px] relative overflow-hidden">
            {selected ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-[#FF4400]">
                  <Bot className="w-4 h-4" />
                  <span className="font-bold">ENGINEERING AGENT ANALYSIS</span>
                </div>
                <div className="text-[#FCE94F]/80 leading-relaxed whitespace-pre-wrap">
                  {ASSESSMENT_TEMPLATE(selected)}
                </div>
                <div className="pt-4 border-t border-[#FCE94F]/10">
                  <p className="text-[#FCE94F]/40 text-xs mb-2 font-mono uppercase tracking-tighter">Validation Checklist</p>
                  <div className="grid grid-cols-1 gap-1">
                    {["Geometric Compatibility", "Strength Class", "Coating/Environment", "Torque Spec", "Engineering Approval"].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[9px] text-[#FCE94F]/60">
                        <CheckCircle className="w-3 h-3 text-[#00ff9f]" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#FF4400]/20 text-center p-6 space-y-4">
                <div className="relative">
                  <Cpu className="w-12 h-12 opacity-10 animate-pulse" />
                  <Filter className="absolute -bottom-2 -right-2 w-6 h-6 opacity-20" />
                </div>
                <p className="text-[10px] leading-relaxed uppercase tracking-wider">
                  Select a candidate from the search results to generate a technical assessment report via LLM.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
