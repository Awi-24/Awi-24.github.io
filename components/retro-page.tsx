"use client"

import { useState, useEffect } from "react"
import { Monitor, Star, Mail, Globe, Zap, Code, Cpu, BookOpen, Briefcase, GraduationCap, Award, Folder } from "lucide-react"

interface RetroPageProps {
  onEnterModern: () => void
}

export default function RetroPage({ onEnterModern }: RetroPageProps) {
  const [visitCount, setVisitCount] = useState(1337)
  const [currentTime, setCurrentTime] = useState("")
  const [blinkVisible, setBlink] = useState(true)
  const [activeTab, setActiveTab] = useState<"home" | "experiencia" | "projetos" | "formacao">("home")
  const [msnVisible, setMsnVisible] = useState(false)
  const [msnMsg] = useState("Adrian diz: Oi! Bem-vindo ao meu portfolio! 😎")
  const [xpTime, setXpTime] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("pt-BR"))
      setBlink(prev => !prev)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const counter = setInterval(() => {
      setVisitCount(prev => prev + Math.floor(Math.random() * 3))
    }, 2000)
    return () => clearInterval(counter)
  }, [])

  // XP taskbar clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setXpTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))
    }
    updateClock()
    const t = setInterval(updateClock, 1000)
    return () => clearInterval(t)
  }, [])

  // MSN Messenger popup after 2s
  useEffect(() => {
    const t = setTimeout(() => setMsnVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const RetroButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs border-2 ${active 
        ? "bg-[#000080] text-white border-t-[#404040] border-l-[#404040] border-r-white border-b-white" 
        : "bg-[#c0c0c0] text-black border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]"
      }`}
    >
      {children}
    </button>
  )

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      {/* ===== WINDOWS XP DESKTOP BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Sky */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, #1565c0 0%, #1e88e5 20%, #42a5f5 45%, #90caf9 62%, #bbdefb 72%, #e3f2fd 80%)"
        }} />
        {/* Green ground */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "42%", background: "#5aad3f" }} />
        {/* Hills SVG */}
        <svg className="absolute left-0 right-0 w-full" style={{ bottom: "38%", height: "120px" }} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,80 C120,30 280,110 480,55 C660,5 820,90 1000,45 C1160,5 1320,65 1440,50 L1440,120 L0,120 Z" fill="#4caf50" />
          <path d="M0,95 C200,50 380,115 580,75 C760,38 940,95 1100,65 C1250,40 1370,78 1440,70 L1440,120 L0,120 Z" fill="#5aad3f" />
        </svg>
        {/* Animated clouds */}
        <div className="absolute" style={{ top: "6%", animation: "cloudDrift 40s linear infinite", left: "-200px" }}>
          <div style={{ width: 200, height: 60, background: "rgba(255,255,255,0.9)", borderRadius: 40, position: "relative" }}>
            <div style={{ width: 110, height: 80, background: "rgba(255,255,255,0.95)", borderRadius: 50, position: "absolute", top: -30, left: 30 }} />
            <div style={{ width: 70, height: 55, background: "rgba(255,255,255,0.88)", borderRadius: 35, position: "absolute", top: -20, left: 100 }} />
          </div>
        </div>
        <div className="absolute" style={{ top: "12%", animation: "cloudDrift 60s linear infinite", animationDelay: "-20s", left: "-300px" }}>
          <div style={{ width: 260, height: 70, background: "rgba(255,255,255,0.85)", borderRadius: 45, position: "relative" }}>
            <div style={{ width: 140, height: 90, background: "rgba(255,255,255,0.9)", borderRadius: 55, position: "absolute", top: -35, left: 50 }} />
          </div>
        </div>
        <div className="absolute" style={{ top: "4%", animation: "cloudDrift 50s linear infinite", animationDelay: "-35s", left: "-150px" }}>
          <div style={{ width: 150, height: 45, background: "rgba(255,255,255,0.8)", borderRadius: 30, position: "relative" }}>
            <div style={{ width: 90, height: 65, background: "rgba(255,255,255,0.85)", borderRadius: 40, position: "absolute", top: -25, left: 25 }} />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP ICONS (fixed, left side) ===== */}
      <div className="fixed top-3 left-3 z-10 flex flex-col gap-3 select-none pointer-events-none">
        {[
          { label: "Meu Computador", icon: "🖥️" },
          { label: "Meus Documentos", icon: "📁" },
          { label: "Recycle Bin", icon: "🗑️" },
          { label: "Internet\nExplorer", icon: "🌐" },
          { label: "MSN Messenger", icon: "💬" },
          { label: "WinAmp", icon: "🎵" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 w-16 text-center cursor-pointer">
            <span style={{ fontSize: 28, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))" }}>{item.icon}</span>
            <span style={{
              fontSize: 10,
              color: "white",
              textShadow: "1px 1px 2px #000, -1px -1px 2px #000",
              lineHeight: 1.2,
              whiteSpace: "pre-line"
            }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ===== MSN MESSENGER POPUP ===== */}
      {msnVisible && (
        <div
          className="fixed z-40 pointer-events-auto"
          style={{ bottom: 36, right: 16, width: 280 }}
        >
          <div style={{ background: "#fffde7", border: "2px solid #1565c0", borderRadius: 4, boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", overflow: "hidden" }}>
            {/* MSN title bar */}
            <div style={{
              background: "linear-gradient(to right, #0a246a, #3a6ea5)",
              padding: "3px 6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>💬</span>
                <span style={{ color: "white", fontSize: 11, fontWeight: "bold" }}>MSN Messenger</span>
              </div>
              <button
                onClick={() => setMsnVisible(false)}
                style={{ background: "#c0c0c0", border: "1px solid #808080", width: 16, height: 14, fontSize: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >x</button>
            </div>
            {/* Message */}
            <div style={{ padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 28 }}>😎</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: "bold", color: "#0a246a", marginBottom: 2 }}>Adrian Widmer</div>
                <div style={{ fontSize: 11, color: "#333" }}>{msnMsg}</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #c0c0c0", padding: "4px 8px", display: "flex", justifyContent: "flex-end", gap: 6, background: "#f0f0f0" }}>
              <button
                onClick={() => setMsnVisible(false)}
                style={{ background: "#c0c0c0", border: "2px solid", borderColor: "white #404040 #404040 white", fontSize: 11, padding: "2px 10px", cursor: "pointer" }}
              >OK</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== WINDOWS XP TASKBAR ===== */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center"
        style={{
          height: 30,
          background: "linear-gradient(to bottom, #3a7bd5 0%, #245edc 40%, #1444b0 100%)",
          borderTop: "1px solid #5b9bd5",
        }}
      >
        {/* Start button */}
        <button style={{
          height: "100%",
          padding: "0 14px 0 8px",
          background: "linear-gradient(to bottom, #5cb85c 0%, #3d9b3d 50%, #2d7a2d 100%)",
          borderRight: "1px solid #4a8a4a",
          borderRadius: "0 12px 12px 0",
          color: "white",
          fontWeight: "bold",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)"
        }}>
          <span style={{ fontSize: 16 }}>🏁</span> Iniciar
        </button>

        {/* Taskbar items */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: 8, gap: 4, overflow: "hidden" }}>
          <div style={{
            background: "rgba(0,0,50,0.3)",
            border: "1px solid rgba(100,150,255,0.3)",
            borderRadius: 2,
            padding: "2px 10px",
            color: "white",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 5,
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            🌐 Portfolio do Adrian Widmer — Internet Explorer
          </div>
          <div style={{
            background: "rgba(0,0,50,0.2)",
            border: "1px solid rgba(100,150,255,0.2)",
            borderRadius: 2,
            padding: "2px 10px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 5
          }}>
            🎵 WinAmp — Linkin Park - In The End
          </div>
        </div>

        {/* System tray */}
        <div style={{
          background: "linear-gradient(to bottom, #1b5bce 0%, #0e3da0 100%)",
          borderLeft: "1px solid #4a7ad5",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 8,
          fontSize: 11,
          color: "white"
        }}>
          <span title="Volume">🔊</span>
          <span title="Rede">🌐</span>
          <span style={{ fontSize: 12, fontWeight: "bold", letterSpacing: 0.5 }}>{xpTime}</span>
        </div>
      </div>

      {/* ===== IE WINDOW (main content, over the desktop) ===== */}
      <div className="relative z-20 p-2 pb-10">
      {/* Browser Window Frame */}
      <div className="max-w-4xl mx-auto bg-[#c0c0c0] border-[3px] border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-lg">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-bold">
              Internet Explorer - PORTFOLIO DO ADRIAN WIDMER
            </span>
          </div>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-[#d0d0d0]">_</button>
            <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-[#d0d0d0]">&#9633;</button>
            <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-red-500 hover:text-white">x</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 border-b border-[#808080] text-xs flex gap-4">
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Arquivo</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Editar</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Exibir</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Favoritos</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Ajuda</span>
        </div>

        {/* Address Bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-2 border-b border-[#808080]">
          <span className="text-xs">Endereco:</span>
          <div className="flex-1 bg-white border border-[#808080] px-1 py-0.5 text-xs">
            http://www.geocities.com/adrian_widmer_ml_engineer_2000/{activeTab === "home" ? "" : activeTab + ".html"}
          </div>
          <button className="bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]">
            Ir
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#c0c0c0] px-2 py-2 flex gap-1 border-b border-[#808080]">
          <RetroButton active={activeTab === "home"} onClick={() => setActiveTab("home")}>
            HOME
          </RetroButton>
          <RetroButton active={activeTab === "experiencia"} onClick={() => setActiveTab("experiencia")}>
            EXPERIENCIA
          </RetroButton>
          <RetroButton active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")}>
            PROJETOS
          </RetroButton>
          <RetroButton active={activeTab === "formacao"} onClick={() => setActiveTab("formacao")}>
            FORMACAO
          </RetroButton>
        </div>

        {/* Main Content */}
        <div className="bg-[#000080] p-4 min-h-[600px] text-white">
          {/* Under Construction GIF Placeholder */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
              <Zap className="w-6 h-6" />
              <span className="text-xs">EM CONSTRUCAO - VOLTE SEMPRE!</span>
              <Zap className="w-6 h-6" />
            </div>
          </div>

          {/* Marquee Title */}
          <div className="overflow-hidden whitespace-nowrap mb-4">
            <div className="animate-marquee inline-block">
              <span className="text-2xl font-bold text-yellow-300" style={{ textShadow: "2px 2px #ff0000" }}>
                ~~ BEM VINDO AO PORTFOLIO DO ADRIAN WIDMER ~~ {" "}
                <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                ~~ ENGENHEIRO DE SOFTWARE ~~ {" "}
                <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                ~~ FORD MOTOR COMPANY ~~ {" "}
                <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
              </span>
            </div>
          </div>

          <div key={activeTab} style={{ animation: "retroTabIn 0.22s ease-out" }}>
          {/* TAB: HOME */}
          {activeTab === "home" && (
            <div className="text-center space-y-6">
              {/* Visitor Counter */}
              <div className="inline-block bg-black p-2 border-2 border-yellow-400">
                <div className="text-xs text-lime-400 font-mono">
                  VOCE E O VISITANTE Nro
                </div>
                <div className="text-2xl font-bold text-red-500 font-mono">
                  {visitCount.toString().padStart(6, '0')}
                </div>
              </div>

              {/* Welcome Message */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] inline-block max-w-lg mx-auto">
                <h2 className="text-lg font-bold text-[#800000] mb-2">Ola Amigo da Internet!</h2>
                <p className="text-sm mb-2">
                  Meu nome e <strong>Adrian Widmer</strong>, sou Engenheiro de Software e IA/ML na Ford Motor Company — 3+ anos desenvolvendo sistemas de ML em producao, pipelines de dados e ferramentas internas como unico dev na equipe de engenharia automotiva.
                </p>
                <p className="text-sm mb-2">
                  Trabalho com <span className="text-red-600">Python</span>, <span className="text-red-600">FastAPI</span>, <span className="text-red-600">GCP</span>, <span className="text-red-600">RAG</span> e <span className="text-red-600">LLMs</span>!
                </p>
                <p className="text-sm">
                  Estou me formando em Engenharia da Computacao no SENAI CIMATEC em 2026.
                  {blinkVisible && <span className="text-red-500"> _</span>}
                </p>
              </div>

              {/* Skills Box */}
              <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] inline-block max-w-md mx-auto">
                <h3 className="text-sm font-bold text-[#000080] mb-2 flex items-center justify-center gap-1">
                  <Cpu className="w-4 h-4" /> MINHAS SKILLS
                </h3>
                <div className="flex flex-wrap justify-center gap-1 text-xs">
                  {["Python", "BigQuery", "GCP", "Docker", "FastAPI", "Pandas", "RAG", "Ollama", "SQL", "Plotly", "Streamlit", "Scikit-learn"].map((skill, i) => (
                    <span key={i} className="bg-[#000080] text-white px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Links Section */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                <a href="https://github.com/Awi-24" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm">
                  <Code className="w-4 h-4" /> Meu GitHub (Awi-24)
                </a>
                <a href="mailto:adrianwidmer.work@gmail.com" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" /> Mande um Email
                </a>
                <a href="https://linkedin.com/in/adrian-widmer-0587a9230" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" /> Meu LinkedIn
                </a>
                <a href="#" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4" /> Livro de Visitas
                </a>
              </div>

              {/* Webring */}
              <div className="border border-yellow-400 p-2 inline-block">
                <div className="text-xs text-yellow-400 mb-1">WEBRING DOS ENGENHEIROS DE ML</div>
                <div className="flex gap-2 text-xs">
                  <a href="#" className="text-cyan-400 hover:text-white">{"<< Anterior"}</a>
                  <span className="text-white">|</span>
                  <a href="#" className="text-cyan-400 hover:text-white">{"Proximo >>"}</a>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCIA */}
          {activeTab === "experiencia" && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2" style={{ textShadow: "2px 2px #ff0000" }}>
                  <Briefcase className="w-6 h-6" /> EXPERIENCIA PROFISSIONAL
                </h2>
              </div>

              {/* Ford Motor Company */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#000080] flex items-center justify-center text-white font-bold text-xs">
                    SW
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000080]">Software Developer (de facto) — Product Development Analyst</h3>
                    <p className="text-xs text-gray-600">Ford Motor Company | Jan 2023 - Presente</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  <li>* Warranty Anomaly Detection: pipeline ML end-to-end sobre centenas de concessionarias dos EUA — flagou fraude real confirmada sem contexto previo</li>
                  <li>* Parts Search Engine (RAG + LLM): busca semantica sobre 20.000 pecas x 72 metricas — de 8-16h para &lt;5min (99%), usado por ~50 engenheiros/semana</li>
                  <li>* PDF Extraction & Search DB: extracao automatizada de ~200 PDFs tecnicos, substituindo workflow manual de 1-2h por sessao</li>
                  <li>* Stack: Python, FastAPI, Streamlit, GCP (BigQuery, Cloud Run), Docker, PostgreSQL</li>
                </ul>
              </div>

              {/* IC CIMATEC */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#800000] flex items-center justify-center text-white font-bold text-xs">
                    IC
                  </div>
                  <div>
                    <h3 className="font-bold text-[#800000]">Iniciacao Cientifica — MES / Industria 4.0</h3>
                    <p className="text-xs text-gray-600">SENAI CIMATEC | Ago 2022 - Jan 2023</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  <li>* Desenvolvimento de software MES (Manufacturing Execution System)</li>
                  <li>* Aplicacao de recursos de Industria 4.0 em ambiente de P&D</li>
                </ul>
              </div>

              {/* Publications */}
              <div className="bg-black/50 p-4 border border-cyan-400 max-w-2xl mx-auto">
                <h3 className="text-cyan-400 text-sm font-bold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> PUBLICACOES CIENTIFICAS
                </h3>
                <div className="space-y-3">
                  <div className="border-l-2 border-lime-400 pl-3">
                    <p className="text-lime-300 text-sm font-bold">SIINTEC 2022</p>
                    <p className="text-white text-xs">Statistical Study of Eco-Efficiency in Compact and Average Cars</p>
                  </div>
                  <div className="border-l-2 border-lime-400 pl-3">
                    <p className="text-lime-300 text-sm font-bold">SIINTEC 2021</p>
                    <p className="text-white text-xs">Viability of Piezoelectric Devices as a Power Source in Salvador</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROJETOS */}
          {activeTab === "projetos" && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2" style={{ textShadow: "2px 2px #ff0000" }}>
                  <Folder className="w-6 h-6" /> MEUS PROJETOS
                </h2>
              </div>

              {/* Ford Projects Section */}
              <div className="mb-6 max-w-3xl mx-auto">
                <div className="bg-[#000080] text-white px-2 py-1 text-sm font-bold mb-2 inline-block">
                  PROJETOS FORD (Privados)
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {/* Anomaly Detection */}
                  <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                    <h3 className="font-bold text-[#800000] text-sm mb-1">ANOMALY_DETECT.ai</h3>
                    <p className="text-[10px] mb-2">Deteccao de anomalias em garantias usando Keras Autoencoder</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-[#000080] text-white text-[10px] px-1">Keras</span>
                      <span className="bg-[#000080] text-white text-[10px] px-1">BigQuery</span>
                    </div>
                  </div>

                  {/* Fastener Hunter */}
                  <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                    <h3 className="font-bold text-[#800000] text-sm mb-1">FASTENER_HUNTER.ai</h3>
                    <p className="text-[10px] mb-2">RAG 2 camadas: scoring matematico filtra Top-N candidatos por Base Number → LLM gera assessment com riscos e oportunidades</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                      <span className="bg-[#000080] text-white text-[10px] px-1">RAG</span>
                      <span className="bg-[#000080] text-white text-[10px] px-1">LLM</span>
                      <span className="bg-[#000080] text-white text-[10px] px-1">SQL</span>
                    </div>
                  </div>

                  {/* Torque Calculator */}
                  <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                    <h3 className="font-bold text-[#800000] text-sm mb-1">TORQUE_CALC.py</h3>
                    <p className="text-[10px] mb-2">Calculadora de torque automotivo com analise de especificacoes</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                      <span className="bg-[#000080] text-white text-[10px] px-1">NumPy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Projects Section */}
              <div className="mb-4 max-w-3xl mx-auto">
                <div className="bg-[#008000] text-white px-2 py-1 text-sm font-bold mb-2 inline-block">
                  PROJETOS PESSOAIS (Open Source)
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {/* HiveMind Protocol */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">HiveMind Protocol</h3>
                  <p className="text-xs mb-2">Framework open-source para orquestracao de multi-agentes de IA com memoria persistente e model routing.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Agents</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">LLM</span>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <a href="https://github.com/Awi-24/HiveMind-Protocol" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block">
                      GitHub
                    </a>
                    <a href="/hivemind" className="text-red-600 text-xs hover:underline font-bold block">
                      SITE DEDICADO
                    </a>
                  </div>
                </div>

                {/* Hivemind CLI */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">Hivemind CLI</h3>
                  <p className="text-xs mb-2">Terminal TUI multi-agente para LLMs locais: tools, MCP, memoria .hivemind/ e Ollama / LM Studio.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Node</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">CLI</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Ink</span>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <a href="https://github.com/Awi-24/hivemind-cli" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block">
                      GitHub
                    </a>
                    <a href="/hivemind-cli" className="text-red-600 text-xs hover:underline font-bold block">
                      SITE DEDICADO
                    </a>
                  </div>
                </div>

                {/* AwiOS */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">AwiOS Engine</h3>
                  <p className="text-xs mb-2">Engine Flutter para visual novels com linguagem de scripting propria e branching narrativo</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Flutter</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Dart</span>
                  </div>
                  <a href="https://github.com/Awi-24/AwiOS" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

                {/* JumpShip */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">JumpShip</h3>
                  <p className="text-xs mb-2">Plataforma local-first de busca de empregos com IA: resume upload → LLM parsing → scraping multi-plataforma → scoring por LLM</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">FastAPI</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">React 19</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Ollama</span>
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <a href="https://github.com/Awi-24/JumpShip" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block">
                      GitHub
                    </a>
                    <a href="/jumpship" className="text-red-600 text-xs hover:underline font-bold block">
                      SITE DEDICADO
                    </a>
                  </div>
                </div>

                {/* CEAP Spending Analysis */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">CEAP Spending Analysis</h3>
                  <p className="text-xs mb-2">EDA sobre gastos dos deputados federais — picos no fim do ano e convergencia partidaria por incentivo orcamentario. Em andamento como TCC.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Pandas</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Plotly</span>
                  </div>
                  <a href="https://github.com/Awi-24/TSE-DataAnalytics" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

                {/* KDD Cup 1999 */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">KDD Cup 1999 — Anomaly Detection</h3>
                  <p className="text-xs mb-2">XGBoost vs IsolationForest vs LOF vs Autoencoder vs OCSVM. IsolationForest: 97.1% recall sem rotulos.</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">XGBoost</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Sklearn</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Keras</span>
                  </div>
                  <a href="https://github.com/Awi-24/KDD-Cup-1999-Anomaly-Detection" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

              </div>

              <div className="text-center">
                <a href="https://github.com/Awi-24" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#c0c0c0] text-[#000080] px-4 py-2 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0] text-sm font-bold">
                  VER TODOS OS PROJETOS NO GITHUB
                </a>
              </div>
            </div>
          )}

          {/* TAB: FORMACAO */}
          {activeTab === "formacao" && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2" style={{ textShadow: "2px 2px #ff0000" }}>
                  <GraduationCap className="w-6 h-6" /> FORMACAO E CERTIFICACOES
                </h2>
              </div>

              {/* Education */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <h3 className="font-bold text-[#000080] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> EDUCACAO
                </h3>
                <div className="border-l-4 border-[#000080] pl-3">
                  <p className="font-bold">Engenharia da Computacao</p>
                  <p className="text-sm">SENAI CIMATEC - Salvador, BA</p>
                  <p className="text-xs text-gray-600">Fev 2020 - Dez 2026 (previsto) | GPA 8.76/10</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <h3 className="font-bold text-[#000080] mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" /> CERTIFICACOES
                </h3>
                <div className="grid gap-2">
                  {[
                    { tag: "GCP", color: "bg-blue-500", name: "Google Cloud Fundamentals: Core Infrastructure", org: "Google | 2026" },
                    { tag: "SRE", color: "bg-blue-500", name: "Google SRE Culture", org: "Google | 2026" },
                    { tag: "AWS", color: "bg-orange-500", name: "AWS Machine Learning Foundations", org: "Amazon Web Services | 2026" },
                    { tag: "DOE", color: "bg-[#000080]", name: "Designer de Experimentos (DOE)", org: "SENAI CIMATEC | 2025" },
                    { tag: "IBM", color: "bg-blue-700", name: "Supervised ML: Regression", org: "IBM / Coursera | 2025" },
                    { tag: "IBM", color: "bg-blue-700", name: "Exploratory Data Analysis for ML", org: "IBM / Coursera | 2024" },
                    { tag: "IBM", color: "bg-blue-700", name: "Introduction to AI", org: "IBM / Coursera | 2024" },
                    { tag: "LNX", color: "bg-gray-600", name: "NDG Linux Essentials", org: "Cisco | 2024" },
                    { tag: "CIM", color: "bg-green-700", name: "Assistente de Engenharia", org: "SENAI CIMATEC | 2024" },
                    { tag: "AWS", color: "bg-orange-500", name: "AWS Cloud Practitioner Essentials", org: "Grupo Boticario | 2022" },
                    { tag: "AWS", color: "bg-orange-500", name: "Intro a Nuvem e Servicos de AWS", org: "Grupo Boticario | 2022" },
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 border-l-4 border-[#000080] pl-2">
                      <div className={`w-8 h-8 ${cert.color} flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0`}>{cert.tag}</div>
                      <div>
                        <p className="font-bold text-xs">{cert.name}</p>
                        <p className="text-[10px] text-gray-600">{cert.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Coursework */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <h3 className="font-bold text-[#000080] mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> MATERIAS RELEVANTES
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    "Engenharia de Software",
                    "Design Patterns (GoF)",
                    "Clean Architecture / SOLID",
                    "Scrum / Agile",
                    "Algoritmos e Est. de Dados",
                    "Redes de Computadores",
                    "Sistemas Operacionais",
                  ].map((subject, i) => (
                    <div key={i} className="flex items-center gap-1 border-l-2 border-[#000080] pl-2">
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-black/50 p-4 border border-cyan-400 max-w-2xl mx-auto">
                <h3 className="text-cyan-400 text-sm font-bold mb-3">IDIOMAS:</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-1">PT</div>
                    <div className="text-xs text-lime-300">Portugues</div>
                    <div className="text-[10px] text-gray-400">Nativo</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">EN</div>
                    <div className="text-xs text-lime-300">Ingles</div>
                    <div className="text-[10px] text-gray-400">Fluente</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">DE</div>
                    <div className="text-xs text-lime-300">Alemao</div>
                    <div className="text-[10px] text-gray-400">Intermediario</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>{/* closes key={activeTab} wrapper */}

          {/* Secret Button to Enter Modern Version */}
          <div className="mt-8 pt-4 border-t border-[#404080] text-center">
            <button
              onClick={onEnterModern}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 text-lg font-bold border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:from-red-500 hover:to-orange-400 transition-all animate-pulse"
              style={{ textShadow: "1px 1px 2px black" }}
            >
              SAIBA MAIS
            </button>
            <p className="text-xs text-cyan-400 mt-2 animate-pulse">
              {">>> CLIQUE PARA VER A VERSAO CYBERPUNK 2077 <<<"}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-[#404080] text-center">
            <p className="text-xs text-cyan-300">
              Ultima atualizacao: {currentTime}
            </p>
            <p className="text-xs text-yellow-400 mt-1">
              Melhor visualizado em Internet Explorer 5.0 | Resolucao 800x600
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <div className="bg-white text-black text-[8px] px-1 border border-black">
                NETSCAPE NOW!
              </div>
              <div className="bg-white text-black text-[8px] px-1 border border-black">
                MADE WITH NOTEPAD
              </div>
              <div className="bg-white text-black text-[8px] px-1 border border-black">
                PYTHON POWERED
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 text-xs border-t border-white flex justify-between">
          <span>Concluido</span>
          <span>Zona da Internet</span>
        </div>
      </div>
      </div>{/* closes z-20 IE wrapper */}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }
        @keyframes retroTabIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
