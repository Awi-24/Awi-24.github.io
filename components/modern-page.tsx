"use client"

import { useState, useEffect } from "react"
import { Code2, User, Briefcase, Mail, ExternalLink, Github, Linkedin, Terminal, Cpu, Shield, Database, Globe, ChevronRight, Zap, Lock, ArrowLeft, Brain, Cloud, BarChart3, FileCode, Layers, Server, Microscope, GraduationCap, Award, Languages, Play } from "lucide-react"
import AsciiRain from "@/components/ascii-rain"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import AwiOSDemo from "@/components/projects/awiOS-demo"
import TSEAnalysesDemo from "@/components/projects/tse-analyses-demo"
import AnomalyDetectionDemo from "@/components/projects/anomaly-detection-demo"
import FastenerHunterDemo from "@/components/projects/fastener-hunter-demo"
import TorqueCalcDemo from "@/components/projects/torque-calc-demo"
import KDDCupDemo from "@/components/projects/kdd-cup-demo"

interface ModernPageProps {
  onBack: () => void
  glitchIntensity: number
}

const SKILLS = {
  mlAi: [
    { name: "Pandas / NumPy", level: 70 },
    { name: "Scikit-learn", level: 60 },
    { name: "RAG Pipelines", level: 65 },
    { name: "LLM Integration", level: 68 },
    { name: "Streamlit", level: 62 },
  ],
  mlTechniques: [
    { name: "Anomaly Detection", level: 68 },
    { name: "PCA / EDA", level: 58 },
    { name: "Regression", level: 55 },
    { name: "Clustering", level: 48 },
  ],
  dataEng: [
    { name: "BigQuery", level: 68 },
    { name: "ETL Pipelines", level: 62 },
    { name: "Plotly", level: 62 },
    { name: "PostgreSQL", level: 48 },
  ],
  cloudMlops: [
    { name: "GCP (BigQuery, Cloud Run)", level: 68 },
    { name: "Linux / Git", level: 65 },
    { name: "Docker", level: 62 },
    { name: "FastAPI", level: 62 },
  ],
  languages: [
    { name: "Python", level: 65 },
    { name: "SQL", level: 65 },
    { name: "JavaScript / TypeScript", level: 52 },
    { name: "C / C++", level: 45 },
  ],
  visualization: [
    { name: "Plotly", level: 62 },
    { name: "Streamlit", level: 62 },
    { name: "Matplotlib", level: 55 },
  ],
  frontend: [
    { name: "React 19 / Next.js", level: 52 },
    { name: "TypeScript", level: 52 },
    { name: "Framer Motion", level: 42 },
  ],
  genAi: [
    { name: "Prompt Engineering", level: 70 },
    { name: "Ollama", level: 62 },
    { name: "Anthropic API", level: 62 },
    { name: "OpenAI API", level: 60 },
    { name: "Groq", level: 55 },
  ],
  methodologies: [
    { name: "Scrum / Agile", level: 62 },
    { name: "Software Engineering", level: 60 },
    { name: "Design Patterns (GoF)", level: 58 },
    { name: "Clean Arch / SOLID", level: 55 },
  ]
}

const EXPERIENCES = [
  {
    title: "Software Developer (de facto) — Official Title: Product Development Analyst",
    company: "Ford Motor Company",
    location: "Camaçari, Brazil",
    period: "Jan 2023 - Present",
    type: "Hybrid",
    highlights: [
      "Responsible for spreading AI usage and best practices in a multidisciplinary team of mechanical and production engineers.",
      "Warranty Anomaly Detection: End-to-end ML pipeline on warranty cost data in the US — the model flagged a real case of confirmed fraud, validating its precision.",
      "Parts Search Engine (RAG + LLM): Semantic search engine over 20,000 parts × 72 engineering metrics — reduced search time from 8–16h to <5min (99%), used weekly by ~50 engineers.",
      "Solo Dev Automation: Developed automation solutions with Python and Alteryx for critical engineering processes before migrating to large-scale data tool development.",
      "Stack: Python, FastAPI, Streamlit, GCP (BigQuery, Cloud Run), Docker, LangGraph, LLMs."
    ],
    tags: ["Python", "FastAPI", "Streamlit", "GCP", "BigQuery", "Cloud Run", "Docker", "PostgreSQL", "RAG", "LLM"]
  },
  {
    title: "Scientific Initiation Researcher",
    company: "SENAI CIMATEC",
    location: "Salvador, Brazil",
    period: "Aug 2022 - Jan 2023",
    type: "On-site",
    highlights: [
      "Developed software modules for a Manufacturing Execution System (MES) Industry 4.0 with real-time monitoring and process automation."
    ],
    tags: ["MES", "Industry 4.0", "Research", "Software Development"]
  }
]

const PUBLICATIONS = [
  {
    title: "Statistical Study of Eco-Efficiency in Compact and Average Cars",
    venue: "VIII SIINTEC International Symposium",
    year: "Nov 2022",
    description: "Statistical analysis and data modeling for eco-efficiency evaluation among Brazilian automotive brands."
  },
  {
    title: "Viability of Using Piezoelectric Devices in Urban Zones for Energy Generation",
    venue: "VII SIINTEC International Symposium",
    year: "Dec 2021",
    description: "Feasibility research on using piezoelectric devices in high-flow urban zones for energy generation."
  }
]

const CERTIFICATIONS = [
  { name: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google", year: "2026" },
  { name: "Google SRE Culture", issuer: "Google", year: "2026" },
  { name: "AWS Machine Learning Foundations", issuer: "Amazon Web Services", year: "2026" },
  { name: "Design of Experiments (DOE)", issuer: "SENAI CIMATEC", year: "2025" },
  { name: "Supervised ML: Regression", issuer: "IBM / Coursera", year: "2025" },
  { name: "Exploratory Data Analysis for ML", issuer: "IBM / Coursera", year: "2024" },
  { name: "Introduction to AI", issuer: "IBM / Coursera", year: "2024" },
  { name: "NDG Linux Essentials", issuer: "Cisco", year: "2024" },
  { name: "Engineering Assistant", issuer: "SENAI CIMATEC", year: "2024" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Grupo Boticário", year: "2022" },
  { name: "Introduction to Cloud and AWS Services", issuer: "Grupo Boticário", year: "2022" },
]

const PROJECTS = [
  {
    id: "hivemind",
    title: "HiveMind Protocol",
    description: "Proprietary agentic orchestration framework. Defines communication protocols, shared memory, and delegation between specialized agents for complex workflow automation and AI-leveraged performance.",
    previewHint: "Multi-level agentic framework · Task orchestration · Shared memory",
    demoType: "Agentic Architecture",
    tags: ["Python", "LangGraph", "Agentic AI", "Multi-Agent Systems"],
    status: "PROD",
    type: "personal",
    noDemo: true,
    github: "#"
  },
  {
    id: "anomaly-detect",
    title: "WARRANTY_ANOMALY_DETECT.ai",
    description: "End-to-end ML system for detecting anomalies in warranty costs at Ford. Pipeline from BigQuery ETL to Vertex AI deployment, identifying fraud and financial inconsistencies with high precision.",
    previewHint: "Technical Report · Anomaly Detection · BigQuery + Vertex AI",
    demoType: "Data Analysis",
    tags: ["Keras", "BigQuery", "Vertex AI", "GCP", "Anomaly Detection"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "fastener-hunter",
    title: "FASTENER_HUNTER.ai",
    description: "2-layer RAG for technical fastener search. Mathematical similarity scoring on legacy databases + LLM for automatic technical assessment. Reduced search time from 8-16h to seconds.",
    previewHint: "Execution Report · Multi-layer RAG · LLM Assessment",
    demoType: "RAG / LLM",
    tags: ["Python", "LLM", "RAG", "SQL", "Prompt Engineering"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "torque-calc",
    title: "TORQUE_ANGLE_CALC.py",
    description: "Joint physics calculator for automotive fasteners. Given torque + joint type, calculates the exact angle ensuring safe fastening without damaging the material.",
    previewHint: "Engineering calculations · Safety status · Applied physics",
    demoType: "Mechanical Engineering",
    tags: ["Python", "PyQt", "NumPy", "Matplotlib", "Physics"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "jumpship",
    title: "JumpShip",
    description: "Local-first job search platform with AI: Resume parsing by LLM → multi-platform scraping → compatibility scoring by LLM.",
    previewHint: "View source code and architecture on GitHub",
    demoType: "Open Source",
    tags: ["FastAPI", "React 19", "TypeScript", "Ollama", "LLM"],
    status: "DEV ALPHA",
    type: "personal",
    github: "https://github.com/Awi-24/JumpShip",
    noDemo: true
  },
  {
    id: "tse-analyses",
    title: "CEAP Spending Analysis",
    description: "EDA on CEAP spending of Brazilian federal deputies — identified budgetary behavior patterns and seasonal spending anomalies. Academic project.",
    previewHint: "EDA Visualization · Budgetary anomalies · Academic insights",
    demoType: "EDA Visualization",
    tags: ["Python", "Pandas", "Plotly", "EDA"],
    status: "ACADEMIC",
    type: "personal"
  },
  {
    id: "awiOS",
    title: "awiOS Engine",
    description: "Flutter engine for visual novels with its own scripting language. Narrative branching system + The Sims-style dialogues with emotional synchrony.",
    previewHint: "Watch the dialogue engine live · Characters reacting in real-time",
    demoType: "Live Demo",
    tags: ["Flutter", "Dart", "Visual Novel", "Game Engine"],
    status: "PROD",
    type: "personal"
  },
  {
    id: "kdd-cup",
    title: "KDD Cup 1999 Benchmark",
    description: "Benchmark of 5 approaches for network intrusion detection. IsolationForest reaches 97.1% recall without training labels.",
    previewHint: "Compare metrics live · Table with Precision/Recall/ROC-AUC",
    demoType: "ML Benchmark",
    tags: ["Python", "XGBoost", "Sklearn", "Keras", "Anomaly Detection"],
    status: "PUB",
    type: "personal"
  },
]

export default function ModernPage({ onBack, glitchIntensity }: ModernPageProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState("")
  const [scanlinePos, setScanlinePos] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("pt-BR", { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanlinePos(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(scanInterval)
  }, [])

  const renderSkillBar = (name: string, level: number, index: number) => (
    <div key={index} className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#FCE94F]/80">{name}</span>
        <span className="text-[#00B4FF] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1a1a2e] rounded overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#FCE94F] to-[#FF4400] transition-all duration-1000"
          style={{ 
            width: `${level}%`,
            boxShadow: "0 0 10px #FCE94F"
          }}
        />
      </div>
    </div>
  )

  const renderExpertiseBar = () => {
    const levels = ["Intern", "Junior", "Mid-level", "Senior", "Staff", "Singularity"]
    const currentPos = 25 // Between Junior (20%) and Mid-level (40%)
    
    return (
      <div className="mb-12 w-full max-w-4xl mx-auto">
        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-[#FCE94F]/50 mb-2 uppercase tracking-widest">
          {levels.map((lvl, i) => (
            <span key={i} className={i === 1 || i === 2 ? "text-[#FCE94F]" : ""}>{lvl}</span>
          ))}
        </div>
        <div className="relative h-4 bg-[#0a0a0f] border border-[#FCE94F]/30 rounded-full overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 flex">
            <div className="h-full w-1/5 bg-white/5" />
            <div className="h-full w-1/5 bg-[#FCE94F]/10" />
            <div className="h-full w-1/5 bg-[#00B4FF]/10" />
            <div className="h-full w-1/5 bg-[#FF4400]/10" />
            <div className="h-full w-1/5 bg-[#ff00ff]/10" />
          </div>
          
          {/* Progress Bar */}
          <div 
            className="absolute h-full bg-gradient-to-r from-[#FCE94F] via-[#00B4FF] to-[#FF4400] transition-all duration-1000"
            style={{ width: `${currentPos}%`, boxShadow: "0 0 15px rgba(0, 180, 255, 0.5)" }}
          />
          
          {/* Marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] z-10 animate-pulse"
            style={{ left: `${currentPos}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-[10px] font-mono text-[#00B4FF] animate-pulse">
            CURRENT CLEARANCE: JUNIOR-MID LEVEL ASCENSION
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden">
      <AsciiRain />

      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `linear-gradient(transparent ${scanlinePos}%, rgba(252, 233, 79, 0.03) ${scanlinePos + 0.5}%, transparent ${scanlinePos + 1}%)`
        }}
      />

      {glitchIntensity > 0 && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            transform: `translate(${(Math.random() - 0.5) * glitchIntensity * 20}px, ${(Math.random() - 0.5) * glitchIntensity * 10}px)`
          }}
        />
      )}

      <div 
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)"
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-[#FCE94F]/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#FF4400] hover:text-[#FCE94F] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">RETRO</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FCE94F]" />
              <GlitchText text="ADRIAN.WIDMER" className="text-xl font-bold text-[#FCE94F]" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm">
            {[
              { id: "home", label: "Home" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "XP" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`uppercase tracking-wider transition-all px-2 py-1 ${
                  activeSection === section.id 
                    ? "text-[#FCE94F] cyber-glow" 
                    : "text-[#FCE94F]/50 hover:text-[#FCE94F]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-[#00B4FF] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#00B4FF] rounded-full animate-pulse" />
              ONLINE
            </span>
            <span>{currentTime}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-20 pt-20 pb-16 px-4">
        <div key={activeSection} className="max-w-6xl mx-auto" style={{ animation: "sectionEnter 0.38s cubic-bezier(0.16,1,0.3,1)" }}>
          
          {/* Hero Section */}
          {activeSection === "home" && (
            <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">

              <GlitchText 
                text="ADRIAN WIDMER" 
                className="text-4xl sm:text-6xl font-bold text-[#FCE94F] mb-4"
                intensity={2}
              />
              
              <p className="text-lg sm:text-2xl text-[#FF4400] mb-2 font-mono">
                {"< SOFTWARE ENGINEER · DATA ENGINEER · AI/ML />"}
              </p>

              <p className="text-[#00B4FF]/70 max-w-2xl mb-4 text-base sm:text-lg px-4">
                Trabalhei como solo dev desenvolvendo soluções de automação com Python e Alteryx antes de migrar para a área de dados, onde desenvolvi ferramentas de larga escala. Atualmente, sou responsável por difundir o uso de IA e melhores práticas em um time de engenharia na Ford Motor Company. Estudo MLOps (Google) e foco em arquiteturas agênticas com o meu framework <strong>HiveMind Protocol</strong>.
              </p>

              <p className="text-[#FCE94F]/50 text-sm mb-8">
                Salvador, BA | Inglês C1 | Alemão B1 | Foco em Performance alavancada por IA
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setActiveSection("projetos")}
                  className="px-6 sm:px-8 py-3 bg-transparent border-2 border-[#FCE94F] text-[#FCE94F] font-bold uppercase tracking-wider hover:bg-[#FCE94F] hover:text-[#0a0a0f] transition-all neon-pulse text-sm sm:text-base"
                >
                  Ver Projetos
                </button>
                <button 
                  onClick={() => setActiveSection("contato")}
                  className="px-6 sm:px-8 py-3 bg-[#FF4400] text-white font-bold uppercase tracking-wider hover:bg-[#FF4400]/80 transition-all text-sm sm:text-base"
                  style={{ boxShadow: "0 0 20px rgba(255, 68, 0, 0.5)" }}
                >
                  Contato
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-8 border-t border-[#FCE94F]/20 w-full max-w-3xl">
                {[
                  { label: "Anos exp.", value: "3+" },
                  { label: "Projetos", value: "9" },
                  { label: "Certificações", value: "11" },
                  { label: "Publicações", value: "2" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-[#FCE94F] cyber-glow">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-[#00B4FF]/70 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mt-12 p-4 border border-[#FCE94F]/20 rounded bg-[#0a0a0f]/50 backdrop-blur max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="w-5 h-5 text-[#FF4400]" />
                  <span className="text-[#FCE94F] font-bold">B.Sc. Engenharia da Computação</span>
                </div>
                <p className="text-[#00B4FF]/70 text-sm">SENAI CIMATEC | 2020 - 2026 | GPA 8.76/10 | IEEE EMBS Cimatec</p>
              </div>
            </section>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && (
            <section className="py-16">
              <GlitchText 
                text="// SKILLS & EXPERTISE" 
                className="text-2xl sm:text-3xl font-bold text-[#FCE94F] mb-8 text-center"
              />

              {renderExpertiseBar()}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ML / IA */}
                <CyberCard delay={0}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">ML / AI</span>
                    </div>
                    {SKILLS.mlAi.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* ML Techniques */}
                <CyberCard delay={0.1}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">ML Techniques</span>
                    </div>
                    {SKILLS.mlTechniques.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Data Engineering */}
                <CyberCard delay={0.2}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Data Eng.</span>
                    </div>
                    {SKILLS.dataEng.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Cloud & MLOps */}
                <CyberCard delay={0.3}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Cloud className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Cloud & MLOps</span>
                    </div>
                    {SKILLS.cloudMlops.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Languages */}
                <CyberCard delay={0.4}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <FileCode className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Languages</span>
                    </div>
                    {SKILLS.languages.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Visualization & Frontend */}
                <CyberCard delay={0.5}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Layers className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Visualization & Frontend</span>
                    </div>
                    {SKILLS.visualization.map((s, i) => renderSkillBar(s.name, s.level, i))}
                    <div className="mt-4 pt-4 border-t border-[#FCE94F]/10">
                      {SKILLS.frontend.map((s, i) => renderSkillBar(s.name, s.level, i))}
                    </div>
                  </div>
                </CyberCard>

                {/* Generative AI & Prompt Engineering */}
                <CyberCard delay={0.6}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-[#00B4FF]" />
                      <span className="text-[#FCE94F] font-bold">Generative AI</span>
                    </div>
                    {SKILLS.genAi.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Architecture & Methodologies */}
                <CyberCard delay={0.7}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Server className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Architecture & Methods</span>
                    </div>
                    {SKILLS.methodologies.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>
              </div>

              {/* Prompt Engineering Expertise */}
              <div className="mt-12 p-6 border border-[#00B4FF]/50 rounded bg-[#001a00]/30 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-[#00B4FF]" />
                  <h3 className="text-xl font-bold text-[#00B4FF]">EXPERTISE: PROMPT ENGINEERING & LLMs</h3>
                </div>
                <p className="text-[#FCE94F]/80 text-sm leading-relaxed">
                  Desenvolvimento de pipelines LLM integrados com Ollama, OpenAI, Anthropic e Groq. Experiência com RAG (Retrieval-Augmented Generation)
                  em produção, estratégias avançadas de prompting (Chain-of-Thought, Few-Shot, Role-Based) e estudo atual de arquiteturas de IA agêntica
                  com LangGraph e AutoGen para workflows autônomos em produção.
                </p>
              </div>

              {/* Certifications */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#FCE94F] mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF4400]" />
                  Certificações
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="p-4 border border-[#FCE94F]/20 rounded bg-[#0a0a0f]/50 backdrop-blur">
                      <p className="text-[#FCE94F] font-medium text-sm">{cert.name}</p>
                      <p className="text-[#00B4FF]/60 text-xs mt-1">{cert.issuer} | {cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#FCE94F] mb-6 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#FF4400]" />
                  Idiomas
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { lang: "Português", level: "Nativo | C2" },
                    { lang: "Inglês", level: "Avançado | C1" },
                    { lang: "Alemão", level: "Intermediário | B1" },
                  ].map((l, i) => (
                    <div key={i} className="px-4 py-2 border border-[#FF4400]/30 rounded bg-[#FF4400]/5">
                      <span className="text-[#FCE94F] font-medium">{l.lang}</span>
                      <span className="text-[#00B4FF]/60 text-sm ml-2">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Experience Section */}
          {activeSection === "experiencia" && (
            <section className="py-16">
              <GlitchText 
                text="// EXPERIÊNCIA" 
                className="text-2xl sm:text-3xl font-bold text-[#FCE94F] mb-12 text-center"
              />

              <div className="space-y-8">
                {EXPERIENCES.map((exp, i) => (
                  <CyberCard key={i} delay={i * 0.1}>
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#FCE94F]">{exp.title}</h3>
                          <p className="text-[#FF4400]">{exp.company}</p>
                          <p className="text-[#00B4FF]/60 text-sm">{exp.location} | {exp.type}</p>
                        </div>
                        <span className="text-[#00B4FF] font-mono text-sm shrink-0">{exp.period}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="text-[#FCE94F]/70 text-sm flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#FF4400] shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, j) => (
                          <span 
                            key={j}
                            className="text-xs px-2 py-1 border border-[#FCE94F]/30 text-[#FCE94F]/70 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CyberCard>
                ))}
              </div>

              {/* Publications */}
              <div className="mt-16">
                <h3 className="text-xl font-bold text-[#FCE94F] mb-6 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-[#FF4400]" />
                  Pesquisa & Publicações
                </h3>
                <div className="space-y-4">
                  {PUBLICATIONS.map((pub, i) => (
                    <CyberCard key={i} delay={i * 0.1}>
                      <div className="p-5">
                        <h4 className="text-[#FCE94F] font-bold mb-1">{pub.title}</h4>
                        <p className="text-[#FF4400] text-sm mb-2">{pub.venue} | {pub.year}</p>
                        <p className="text-[#FCE94F]/60 text-sm">{pub.description}</p>
                      </div>
                    </CyberCard>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Projects Section */}
          {activeSection === "projetos" && (
            <section className="py-16">
              <GlitchText 
                text="// PROJETOS" 
                className="text-2xl sm:text-3xl font-bold text-[#FCE94F] mb-12 text-center"
              />

              {selectedProject ? (
                // Project Detail View
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex items-center gap-2 text-[#FF4400] hover:text-[#FCE94F] transition-colors text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar aos Projetos
                    </button>
                    {(() => {
                      const proj = PROJECTS.find(p => p.id === selectedProject)
                      return proj ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#FCE94F]/50 font-mono">{(proj as any).demoType}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-mono ${proj.type === "ford" ? "bg-[#FF4400]/20 text-[#FF4400]" : "bg-[#00B4FF]/20 text-[#00B4FF]"}`}>
                            {proj.title}
                          </span>
                        </div>
                      ) : null
                    })()}
                  </div>

                  <div key={selectedProject} className="bg-[#1a1a2e] rounded border border-[#FCE94F]/20 p-6" style={{ animation: "panelExpand 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
                    {/* Personal Projects */}
                    {selectedProject === "hivemind" && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#FCE94F] mb-2">
                          <Brain className="w-5 h-5" />
                          <h3 className="font-bold">HiveMind Protocol: Agentic Framework</h3>
                        </div>
                        <p className="text-[#FCE94F]/80 text-sm leading-relaxed">
                          The HiveMind Protocol is a proprietary framework designed for high-performance agentic orchestration. It provides a standardized layer for multi-agent systems to communicate, share long-term memory, and delegate sub-tasks autonomously.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-black/30 p-4 border border-[#FCE94F]/20 rounded">
                            <h4 className="text-[#FCE94F] text-xs font-bold uppercase mb-2">Core Features</h4>
                            <ul className="text-[10px] text-[#FCE94F]/70 space-y-1">
                              <li>• Inter-agent communication protocols</li>
                              <li>• Shared contextual memory state</li>
                              <li>• Dynamic task delegation logic</li>
                              <li>• Performance-first token optimization</li>
                            </ul>
                          </div>
                          <div className="bg-black/30 p-4 border border-[#00B4FF]/20 rounded">
                            <h4 className="text-[#00B4FF] text-xs font-bold uppercase mb-2">Technology Stack</h4>
                            <ul className="text-[10px] text-[#FCE94F]/70 space-y-1">
                              <li>• Python & LangGraph</li>
                              <li>• Multi-agent Systems (MAS)</li>
                              <li>• Vector DB for shared memory</li>
                              <li>• Custom orchestration logic</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedProject === "awiOS" && <AwiOSDemo />}
                    {selectedProject === "tse-analyses" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00B4FF] mb-2">
                          <GraduationCap className="w-5 h-5" />
                          <h3 className="font-bold">Academic Report: CEAP Spending</h3>
                        </div>
                        <p className="text-[#FCE94F]/80 text-sm leading-relaxed">
                          This project was developed as part of Exploratory Data Analysis (EDA) studies in college. 
                          Using Python, Pandas, and Plotly, I analyzed the 2023 federal deputies' spending dataset (CEAP).
                          The analysis revealed clear seasonal patterns, such as a significant increase in spending in December and behavioral convergence across different political spectrums in certain expense categories.
                        </p>
                        <TSEAnalysesDemo />
                      </div>
                    )}
                    {selectedProject === "kdd-cup" && <KDDCupDemo />}
                    
                    {/* Ford Projects - Textual Reports */}
                    {selectedProject === "anomaly-detect" && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#FF4400] mb-2">
                          <Shield className="w-5 h-5" />
                          <h3 className="font-bold">Execution: Warranty Anomaly Detection</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-black/30 p-4 border border-[#FF4400]/20 rounded">
                            <h4 className="text-[#FF4400] text-xs font-bold uppercase mb-2">The Problem</h4>
                            <p className="text-xs text-[#FCE94F]/70">Difficulty identifying improper warranty charges across a network of hundreds of US dealerships, resulting in undetected financial losses.</p>
                          </div>
                          <div className="bg-black/30 p-4 border border-[#00B4FF]/20 rounded">
                            <h4 className="text-[#00B4FF] text-xs font-bold uppercase mb-2">My Solution</h4>
                            <p className="text-xs text-[#FCE94F]/70">End-to-end pipeline: SQL in BigQuery for massive aggregation -> Feature Engineering (Python) -> Autoencoder Model (Keras) to identify outliers -> Vertex AI Deployment.</p>
                          </div>
                        </div>
                        <div className="bg-[#FF4400]/5 border border-[#FF4400]/20 p-4 rounded">
                          <h4 className="text-[#FCE94F] text-sm font-bold mb-2">Results & Impact</h4>
                          <ul className="text-xs text-[#FCE94F]/80 space-y-2">
                            <li>• The model identified a real case of confirmed fraud without any previous context from the training data.</li>
                            <li>• Automation of an auditing process that previously took weeks of manual analysis.</li>
                            <li>• Drastic reduction in false positives through iterative refinement of average cost features.</li>
                          </ul>
                        </div>
                        <AnomalyDetectionDemo />
                      </div>
                    )}

                    {selectedProject === "fastener-hunter" && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#FCE94F] mb-2">
                          <Search className="w-5 h-5" />
                          <h3 className="font-bold">Execution: Automotive Fastener RAG</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-black/30 p-4 border border-[#FCE94F]/20 rounded">
                            <h4 className="text-[#FCE94F] text-xs font-bold uppercase mb-2">The Problem</h4>
                            <p className="text-xs text-[#FCE94F]/70">Engineers took 8 to 16 hours searching through multiple legacy databases (GFDS, WERS, COSTING) to find viable parts substitutes.</p>
                          </div>
                          <div className="bg-black/30 p-4 border border-[#00B4FF]/20 rounded">
                            <h4 className="text-[#00B4FF] text-xs font-bold uppercase mb-2">My Solution</h4>
                            <p className="text-xs text-[#FCE94F]/70">2-layer RAG system. Layer 1: Vector similarity and mathematical scoring to filter Top-N candidates. Layer 2: LLM Assessment for risk and opportunity analysis.</p>
                          </div>
                        </div>
                        <div className="bg-[#FCE94F]/5 border border-[#FCE94F]/20 p-4 rounded">
                          <h4 className="text-[#FCE94F] text-sm font-bold mb-2">Results & Impact</h4>
                          <ul className="text-xs text-[#FCE94F]/80 space-y-2">
                            <li>• Search time reduction from ~16 hours to under 5 minutes (99% efficiency gain).</li>
                            <li>• Used weekly by about 50 product and cost engineers.</li>
                            <li>• Consolidation of data from 3 distinct sources into a unified, intelligent interface.</li>
                          </ul>
                        </div>
                        <FastenerHunterDemo />
                      </div>
                    )}

                    {selectedProject === "torque-calc" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00B4FF] mb-2">
                          <Cpu className="w-5 h-5" />
                          <h3 className="font-bold">Engineering Calculator: Torque & Angle</h3>
                        </div>
                        <p className="text-[#FCE94F]/80 text-sm leading-relaxed">
                          Developed this tool to solve a critical line assembly problem: precise definition of tightening angle to ensure joint integrity without exceeding material yield limits.
                          The tool uses stress-strain physics models to calculate joint behavior under different friction and torque conditions.
                        </p>
                        <TorqueCalcDemo />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Projects Grid
                <>
                  {/* Category: Ford Projects */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-lg font-bold text-[#FF4400]">▓ FORD PROJECTS</h3>
                      <span className="text-xs text-[#FF4400]/50 border border-[#FF4400]/20 px-2 py-0.5 rounded font-mono">
                        🔒 Private / Corporate Repos
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {PROJECTS.filter(p => p.type === "ford").map((project, i) => (
                        <CyberCard key={i} delay={i * 0.1}>
                          <div className="p-4 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold text-[#FCE94F]">{project.title}</h3>
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-[#FF4400]/20 text-[#FF4400]">
                                FORD
                              </span>
                            </div>
                            <p className="text-[#FCE94F]/60 mb-3 text-xs flex-grow">{project.description}</p>
                            {/* Preview Hint */}
                            <div className="mb-3 px-2 py-1.5 rounded bg-[#FF4400]/5 border border-[#FF4400]/15">
                              <p className="text-[10px] text-[#FF4400]/70 leading-relaxed">
                                <span className="text-[#FF4400] font-bold">▶ {(project as any).demoType}:</span>{" "}
                                {(project as any).previewHint}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.tags.slice(0, 3).map((tag, j) => (
                                <span
                                  key={j}
                                  className="text-[10px] px-1.5 py-0.5 border border-[#FCE94F]/20 text-[#FCE94F]/60 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => setSelectedProject(project.id)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#FF4400]/10 border border-[#FF4400]/30 text-[#FF4400] rounded hover:bg-[#FF4400]/20 hover:border-[#FF4400]/60 transition-all text-xs font-medium group"
                            >
                              <FileCode className="w-3 h-3 group-hover:scale-110 transition-transform" />
                              View Details & Execution
                            </button>
                          </div>
                        </CyberCard>
                      ))}
                    </div>
                  </div>

                  {/* Category: Personal Projects */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-lg font-bold text-[#00B4FF]">▓ PERSONAL PROJECTS</h3>
                      <span className="text-xs text-[#00B4FF]/50 border border-[#00B4FF]/20 px-2 py-0.5 rounded font-mono">
                        Interactive demos available
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {PROJECTS.filter(p => p.type === "personal").map((project, i) => (
                        <CyberCard key={i} delay={i * 0.1}>
                          <div className="p-5 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-[#FCE94F]">{project.title}</h3>
                              <span className="text-xs px-2 py-1 rounded font-mono bg-[#00B4FF]/20 text-[#00B4FF]">
                                {project.status}
                              </span>
                            </div>
                            <p className="text-[#FCE94F]/60 mb-3 text-sm flex-grow">{project.description}</p>
                            {/* Preview Hint */}
                            <div className="mb-3 px-3 py-2 rounded bg-[#00B4FF]/5 border border-[#00B4FF]/15">
                              <p className="text-xs text-[#00B4FF]/70 leading-relaxed">
                                <span className="text-[#00B4FF] font-bold">▶ {(project as any).demoType}:</span>{" "}
                                {(project as any).previewHint}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tags.map((tag, j) => (
                                <span 
                                  key={j}
                                  className="text-xs px-2 py-0.5 border border-[#FCE94F]/30 text-[#FCE94F]/70 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {(project as any).noDemo ? (
                              <a
                                href={(project as any).github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00B4FF]/10 border border-[#00B4FF]/30 text-[#00B4FF] rounded hover:bg-[#00B4FF]/20 hover:border-[#00B4FF]/60 transition-all text-sm font-medium"
                              >
                                <Github className="w-4 h-4" />
                                View on GitHub
                              </a>
                            ) : (
                              <button
                                onClick={() => setSelectedProject(project.id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00B4FF]/10 border border-[#00B4FF]/30 text-[#00B4FF] rounded hover:bg-[#00B4FF]/20 hover:border-[#00B4FF]/60 transition-all text-sm font-medium group"
                              >
                                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Open Interactive Demo
                              </button>
                            )}
                          </div>
                        </CyberCard>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </section>
          )}

          {/* Contact Section */}
          {activeSection === "contact" && (
            <section className="py-16">
              <GlitchText 
                text="// CONTACT" 
                className="text-2xl sm:text-3xl font-bold text-[#FCE94F] mb-16 text-center"
              />

              <div className="max-w-2xl mx-auto">
                <div className="space-y-6">
                  {/* GitHub */}
                  <a 
                    href="https://github.com/Awi-24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <CyberCard>
                      <div className="p-6 flex items-center gap-4 hover:bg-[#1a1a2e]/80 transition-colors cursor-pointer">
                        <Github className="w-8 h-8 text-[#00B4FF] flex-shrink-0" />
                        <div className="flex-grow">
                          <div className="text-[#FCE94F] font-bold">GitHub</div>
                          <div className="text-[#FCE94F]/60 text-sm">github.com/Awi-24</div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FF4400] flex-shrink-0" />
                      </div>
                    </CyberCard>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:adrianwidmer.work@gmail.com"
                    className="block"
                  >
                    <CyberCard>
                      <div className="p-6 flex items-center gap-4 hover:bg-[#1a1a2e]/80 transition-colors cursor-pointer">
                        <Mail className="w-8 h-8 text-[#FCE94F] flex-shrink-0" />
                        <div className="flex-grow">
                          <div className="text-[#FCE94F] font-bold">Email</div>
                          <div className="text-[#FCE94F]/60 text-sm">adrianwidmer.work@gmail.com</div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FF4400] flex-shrink-0" />
                      </div>
                    </CyberCard>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/adrian-widmer-0587a9230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <CyberCard>
                      <div className="p-6 flex items-center gap-4 hover:bg-[#1a1a2e]/80 transition-colors cursor-pointer">
                        <Linkedin className="w-8 h-8 text-[#00B4FF] flex-shrink-0" />
                        <div className="flex-grow">
                          <div className="text-[#FCE94F] font-bold">LinkedIn</div>
                          <div className="text-[#FCE94F]/60 text-sm">linkedin.com/in/adrian-widmer-0587a9230</div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-[#FF4400] flex-shrink-0" />
                      </div>
                    </CyberCard>
                  </a>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#FCE94F]/20 py-6 text-center">
        <p className="text-[#FCE94F]/40 text-sm font-mono">
          {"<"} ADRIAN WIDMER | SOFTWARE ENGINEER {"/>"} | 2026
        </p>
      </footer>

      {/* Corner HUD Elements */}
      <div className="fixed bottom-4 left-4 z-40 text-xs font-mono text-[#00B4FF]/50 space-y-1 hidden sm:block">
        <div>FPS: 60</div>
        <div>LAT: {Math.round(Math.random() * 10 + 10)}ms</div>
        <div>MEM: {Math.round(Math.random() * 20 + 60)}%</div>
      </div>

      <div className="fixed bottom-4 right-4 z-40 text-xs font-mono text-[#00B4FF]/50 text-right space-y-1 hidden sm:block">
        <div>X: {mousePos.x}</div>
        <div>Y: {mousePos.y}</div>
        <div className="flex items-center gap-1 justify-end">
          <Lock className="w-3 h-3" /> SECURE
        </div>
      </div>

      <style jsx>{`
        @keyframes sectionEnter {
          from { opacity: 0; transform: translateY(22px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)   scale(1);     }
        }
        @keyframes panelExpand {
          from { opacity: 0; transform: translateY(12px) scaleY(0.97); }
          to   { opacity: 1; transform: translateY(0)    scaleY(1);    }
        }
      `}</style>
    </div>
  )
}
