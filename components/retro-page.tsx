"use client"

import { useState, useEffect } from "react"
import { Monitor, Star, Mail, Globe, Zap, Code, Cpu, BookOpen, Briefcase, GraduationCap, Award, Folder, Cloud, User } from "lucide-react"

interface RetroPageProps {
  onEnterModern: () => void
}

export default function RetroPage({ onEnterModern }: RetroPageProps) {
  const [visitCount, setVisitCount] = useState(1337)
  const [currentTime, setCurrentTime] = useState("")
  const [blinkVisible, setBlink] = useState(true)
  const [activeTab, setActiveTab] = useState<"home" | "experience" | "projects" | "education">("home")
  const [msnVisible, setMsnVisible] = useState(false)
  const [msnMsg] = useState("Adrian says: Hi! Welcome to my portfolio! 😎")
  const [xpTime, setXpTime] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-US"))
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
      setXpTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
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
      className={`px-3 py-1 text-xs border-2 font-bold ${active 
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
      <div className="fixed top-3 left-3 z-10 flex flex-col gap-3 select-none pointer-events-none text-white">
        {[
          { label: "My Computer", icon: "🖥️" },
          { label: "My Documents", icon: "📁" },
          { label: "Recycle Bin", icon: "🗑️" },
          { label: "Internet Explorer", icon: "🌐" },
          { label: "MSN Messenger", icon: "💬" },
          { label: "WinAmp", icon: "🎵" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 w-16 text-center cursor-pointer">
            <span style={{ fontSize: 28, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))" }}>{item.icon}</span>
            <span style={{
              fontSize: 10,
              textShadow: "1px 1px 2px #000, -1px -1px 2px #000",
              lineHeight: 1.2,
              whiteSpace: "pre-line"
            }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ===== MSN MESSENGER POPUP ===== */}
      {msnVisible && (
        <div className="fixed z-40 pointer-events-auto" style={{ bottom: 36, right: 16, width: 280 }}>
          <div style={{ background: "#fffde7", border: "2px solid #1565c0", borderRadius: 4, boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(to right, #0a246a, #3a6ea5)", padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>💬</span>
                <span style={{ color: "white", fontSize: 11, fontWeight: "bold" }}>MSN Messenger</span>
              </div>
              <button onClick={() => setMsnVisible(false)} style={{ background: "#c0c0c0", border: "1px solid #808080", width: 16, height: 14, fontSize: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 28 }}>😎</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: "bold", color: "#0a246a", marginBottom: 2 }}>Adrian Widmer</div>
                <div style={{ fontSize: 11, color: "#333" }}>{msnMsg}</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #c0c0c0", padding: "4px 8px", display: "flex", justifyContent: "flex-end", gap: 6, background: "#f0f0f0" }}>
              <button onClick={() => setMsnVisible(false)} style={{ background: "#c0c0c0", border: "2px solid", borderColor: "white #404040 #404040 white", fontSize: 11, padding: "2px 10px", cursor: "pointer" }}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== WINDOWS XP TASKBAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center" style={{ height: 30, background: "linear-gradient(to bottom, #3a7bd5 0%, #245edc 40%, #1444b0 100%)", borderTop: "1px solid #5b9bd5" }}>
        <button style={{ height: "100%", padding: "0 14px 0 8px", background: "linear-gradient(to bottom, #5cb85c 0%, #3d9b3d 50%, #2d7a2d 100%)", borderRight: "1px solid #4a8a4a", borderRadius: "0 12px 12px 0", color: "white", fontWeight: "bold", fontSize: 13, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}>
          <span style={{ fontSize: 16 }}>🏁</span> Start
        </button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: 8, gap: 4, overflow: "hidden" }}>
          <div style={{ background: "rgba(0,0,50,0.3)", border: "1px solid rgba(100,150,255,0.3)", borderRadius: 2, padding: "2px 10px", color: "white", fontSize: 11, display: "flex", alignItems: "center", gap: 5, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            🌐 Adrian Widmer Portfolio — Internet Explorer
          </div>
          <div style={{ background: "rgba(0,0,50,0.2)", border: "1px solid rgba(100,150,255,0.2)", borderRadius: 2, padding: "2px 10px", color: "rgba(255,255,255,0.7)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
            🎵 WinAmp — Linkin Park - In The End
          </div>
        </div>
        <div style={{ background: "linear-gradient(to bottom, #1b5bce 0%, #0e3da0 100%)", borderLeft: "1px solid #4a7ad5", height: "100%", display: "flex", alignItems: "center", padding: "0 10px", gap: 8, fontSize: 11, color: "white" }}>
          <span title="Volume">🔊</span>
          <span title="Network">🌐</span>
          <span style={{ fontSize: 12, fontWeight: "bold", letterSpacing: 0.5 }}>{xpTime}</span>
        </div>
      </div>

      {/* ===== IE WINDOW ===== */}
      <div className="relative z-20 p-2 pb-10">
        <div className="max-w-4xl mx-auto bg-[#c0c0c0] border-[3px] border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-lg overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold uppercase tracking-tight">Internet Explorer - ADRIAN WIDMER PORTFOLIO</span>
            </div>
            <div className="flex gap-1">
              <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-[#d0d0d0]">_</button>
              <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-[#d0d0d0]">&#9633;</button>
              <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-[10px] flex items-center justify-center hover:bg-red-500 hover:text-white">x</button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="bg-[#c0c0c0] px-2 py-1 border-b border-[#808080] text-xs flex gap-4 text-black">
            <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
            <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
            <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
            <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Favorites</span>
            <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
          </div>

          {/* Address Bar */}
          <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-2 border-b border-[#808080] text-black">
            <span className="text-xs">Address:</span>
            <div className="flex-1 bg-white border border-[#808080] px-1 py-0.5 text-xs text-black overflow-hidden whitespace-nowrap">
              http://www.geocities.com/adrian_widmer_ml_engineer_2000/{activeTab === "home" ? "" : activeTab + ".html"}
            </div>
            <button className="bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] px-2 py-0.5 text-xs hover:bg-[#d0d0d0] font-bold">Go</button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-[#c0c0c0] px-2 py-2 flex gap-1 border-b border-[#808080]">
            <RetroButton active={activeTab === "home"} onClick={() => setActiveTab("home")}>HOME</RetroButton>
            <RetroButton active={activeTab === "experience"} onClick={() => setActiveTab("experience")}>EXPERIENCE</RetroButton>
            <RetroButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")}>PROJECTS</RetroButton>
            <RetroButton active={activeTab === "education"} onClick={() => setActiveTab("education")}>EDUCATION</RetroButton>
          </div>

          {/* Main Content Area */}
          <div className="bg-[#000080] p-4 min-h-[500px] text-white overflow-y-auto max-h-[70vh] custom-scrollbar">
            {/* Animated Title */}
            <div className="overflow-hidden whitespace-nowrap mb-6">
              <div className="animate-marquee inline-block">
                <span className="text-2xl font-bold text-yellow-300" style={{ textShadow: "2px 2px #ff0000" }}>
                  ~~ WELCOME TO ADRIAN WIDMER'S PORTFOLIO ~~ {" "}
                  <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                  ~~ SOFTWARE ENGINEER ~~ {" "}
                  <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                  ~~ FORD MOTOR COMPANY ~~ {" "}
                  <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                </span>
              </div>
            </div>

            <div key={activeTab} style={{ animation: "retroTabIn 0.2s ease-out" }}>
              {activeTab === "home" && (
                <div className="text-center space-y-6">
                  <div className="inline-block bg-black p-2 border-2 border-yellow-400">
                    <div className="text-xs text-lime-400 font-mono font-bold uppercase tracking-widest">You are visitor No.</div>
                    <div className="text-2xl font-bold text-red-500 font-mono">{visitCount.toString().padStart(6, '0')}</div>
                  </div>

                  <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] inline-block max-w-lg mx-auto shadow-md">
                    <h2 className="text-lg font-bold text-[#800000] mb-2 uppercase tracking-tighter">Hello Internet Friend!</h2>
                    <p className="text-sm mb-3 leading-relaxed">I worked as a solo dev developing automation solutions with <strong>Python</strong> and <strong>Alteryx</strong> before migrating to the data area.</p>
                    <p className="text-sm mb-3 leading-relaxed">Currently, I am responsible for spreading the use of <strong>AI</strong> and best practices in an engineering team at Ford Motor Company. I study <strong>MLOps</strong> and focus on agentic models with my <strong>HiveMind Protocol</strong> framework.</p>
                    <p className="text-sm italic">I am graduating in Computer Engineering at SENAI CIMATEC in 2026.{blinkVisible && <span className="text-red-500 font-bold">_</span>}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                    <a href="https://github.com/Awi-24" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm font-bold tracking-tight"><Code className="w-4 h-4" /> My GitHub (Awi-24)</a>
                    <a href="mailto:adrianwidmer.work@gmail.com" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm font-bold tracking-tight"><Mail className="w-4 h-4" /> Send an Email</a>
                    <a href="https://linkedin.com/in/adrian-widmer-0587a9230" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-yellow-400 flex items-center gap-2 text-sm font-bold tracking-tight"><Globe className="w-4 h-4" /> My LinkedIn</a>
                    <div className="text-lime-400 flex items-center gap-2 text-sm font-bold opacity-50 cursor-not-allowed"><Star className="w-4 h-4" /> Guestbook (Offline)</div>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2 uppercase" style={{ textShadow: "2px 2px #ff0000" }}>
                    <Briefcase className="w-6 h-6" /> Professional Experience
                  </h2>
                  <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#000080] p-1 shadow-sm"><Briefcase className="w-5 h-5 text-white" /></div>
                      <div>
                        <h3 className="font-bold text-[#000080]">Software Developer (de facto) — Product Analyst</h3>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Ford Motor Company | Jan 2023 - Present</p>
                      </div>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 leading-tight">
                      <li>* Leadership in spreading AI/Best Practices for engineering teams</li>
                      <li>* Warranty Anomaly Detection: end-to-end ML &rarr; flagged real confirmed fraud</li>
                      <li>* Parts Search Engine (RAG + LLM): 99% reduction in search time</li>
                      <li>* Solo Dev Automation: Python/Alteryx migradas para ferramentas de dados</li>
                      <li>* Stack: Python, FastAPI, GCP, LangGraph, LLMs</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2 uppercase" style={{ textShadow: "2px 2px #ff0000" }}>
                    <Folder className="w-6 h-6" /> My Projects
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {[
                      { title: "HiveMind Protocol", desc: "Agentic AI Framework", tags: ["Python", "AI"] },
                      { title: "JumpShip AI", desc: "Autonomous Job Search", tags: ["React", "FastAPI"] },
                      { title: "AwiOS Engine", desc: "VN Game Engine", tags: ["Flutter", "Dart"] },
                      { title: "KDD Cup 1999", desc: "ML Benchmark", tags: ["Python", "XGBoost"] },
                    ].map((p, i) => (
                      <div key={i} className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-sm">
                        <h3 className="font-bold text-[#800000] text-sm mb-1 uppercase tracking-tighter">{p.title}</h3>
                        <p className="text-xs mb-2 italic opacity-70">{p.desc}</p>
                        <div className="flex gap-1">
                          {p.tags.map(t => <span key={t} className="bg-[#000080] text-white text-[9px] px-1 font-bold">{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-yellow-300 flex items-center justify-center gap-2 uppercase" style={{ textShadow: "2px 2px #ff0000" }}>
                    <GraduationCap className="w-6 h-6" /> Education
                  </h2>
                  <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#000080] p-1 shadow-sm"><GraduationCap className="w-5 h-5 text-white" /></div>
                      <div>
                        <h3 className="font-bold text-[#000080]">Computer Engineering (B.Sc.)</h3>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">SENAI CIMATEC | 2020 - 2026</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Focus on Software Engineering, Data Structures and ML. Current GPA: 8.76/10</p>
                  </div>
                </div>
              )}
            </div>

            {/* Secret Button */}
            <div className="mt-8 pt-6 border-t border-[#404080] text-center space-y-3">
              <button
                onClick={onEnterModern}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 text-lg font-bold border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:from-red-500 hover:to-orange-400 transition-all animate-pulse active:scale-95 shadow-xl"
                style={{ textShadow: "1px 1px 2px black" }}
              >
                LEARN MORE
              </button>
              <p className="text-[10px] text-cyan-300 font-bold uppercase animate-pulse">
                {">>> Click for the high-performance cyberpunk experience <<<"}
              </p>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#c0c0c0] px-2 py-1 text-[10px] border-t border-white flex justify-between text-black font-bold uppercase shadow-inner">
            <span>Done</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-3 bg-[#808080] border-inner flex items-center px-1">
                <div className="h-full bg-blue-800 w-full animate-progress-stripes" />
              </div>
              <span>Internet Zone</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 15s linear infinite; }
        @keyframes cloudDrift { 0% { transform: translateX(0); } 100% { transform: translateX(calc(100vw + 400px)); } }
        @keyframes retroTabIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .border-inner { border: 1px inset white; }
        @keyframes progressStripes { from { background-position: 0 0; } to { background-position: 40px 0; } }
        .animate-progress-stripes {
          background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);
          background-size: 40px 40px;
          animation: progressStripes 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
