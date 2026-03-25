"use client"

import { useState, useEffect } from "react"
import { Code2, User, Briefcase, Mail, ExternalLink, Github, Linkedin, Terminal, Cpu, Shield, Database, Globe, ChevronRight, Zap, Lock, ArrowLeft, Brain, Cloud, BarChart3, FileCode, Layers, Server, Microscope, GraduationCap, Award, Languages, Play } from "lucide-react"
import AsciiRain from "@/components/ascii-rain"
import GlitchText from "@/components/glitch-text"
import CyberCard from "@/components/cyber-card"
import VannexCycleoDemo from "@/components/projects/vannex-cycleo-demo"
import MonnexDemo from "@/components/projects/monnex-demo"
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
    { name: "Keras / TensorFlow", level: 70 },
    { name: "PyTorch", level: 65 },
    { name: "Scikit-learn", level: 72 },
    { name: "Vertex AI", level: 65 },
    { name: "MLflow", level: 62 },
  ],
  mlTechniques: [
    { name: "Detecção de Anomalias", level: 75 },
    { name: "Regressão", level: 70 },
    { name: "Clusterização", level: 65 },
    { name: "PCA / EDA", level: 68 },
  ],
  dataEng: [
    { name: "BigQuery", level: 72 },
    { name: "Pandas / NumPy", level: 75 },
    { name: "Pipelines ETL", level: 70 },
    { name: "Alteryx", level: 62 },
  ],
  cloudMlops: [
    { name: "GCP", level: 72 },
    { name: "Terraform (IaC)", level: 65 },
    { name: "Docker", level: 68 },
    { name: "CI/CD / Tekton", level: 65 },
    { name: "AWS", level: 62 },
  ],
  languages: [
    { name: "Python", level: 75 },
    { name: "SQL", level: 72 },
    { name: "TypeScript / JS", level: 68 },
    { name: "C++", level: 62 },
  ],
  visualization: [
    { name: "Plotly / Dash", level: 72 },
    { name: "Matplotlib", level: 70 },
    { name: "PyQt", level: 63 },
  ],
  frontend: [
    { name: "React.js / Next.js", level: 68 },
    { name: "Tailwind CSS", level: 70 },
    { name: "Figma", level: 63 },
  ],
  genAi: [
    { name: "Claude API", level: 70 },
    { name: "GPT-4", level: 68 },
    { name: "Prompt Engineering", level: 75 },
    { name: "LLM Integration", level: 70 },
  ]
}

const EXPERIENCES = [
  {
    title: "Software Development Analyst",
    company: "Ford Motor Company",
    location: "Camaçari, BA",
    period: "Mai 2024 - Presente",
    type: "Híbrido",
    highlights: [
      "Projetei e implantei pipeline de ML end-to-end para detecção de anomalias em custos de garantia (Keras + BigQuery + Vertex AI), atualmente em produção no GCP",
      "Gerenciei infraestrutura cloud como código com Terraform (IaC) e CI/CD com Tekton",
      "Construí pipelines ETL no BigQuery para ingestão e processamento de dados de sensores de múltiplas linhas de manufatura",
      "Desenvolvi ferramenta Python para cálculo de física de juntas (torque + ângulo) usada em chão de fábrica",
      "Criei base de dados técnica com extração automática de PDFs via OCR — redução de 60%+ no tempo de busca"
    ],
    tags: ["Python", "GCP", "BigQuery", "Vertex AI", "Keras", "Terraform", "Tekton", "ETL", "Pandas", "Docker", "Plotly"]
  },
  {
    title: "Estagiário de Engenharia de Software",
    company: "Ford Brasil",
    location: "Salvador, BA",
    period: "Jan 2023 - Mai 2024",
    type: "Híbrido",
    highlights: [
      "Automatizei rotinas de coleta e formatação de dados com Python, eliminando retrabalho manual recorrente da equipe",
      "Desenvolvi scripts e ferramentas de apoio para análises de dados e fluxos operacionais",
      "Iniciou na área de ML colaborando com o time de engenharia em projetos de dados industriais"
    ],
    tags: ["Python", "Automação", "Pandas", "Otimização de Processos"]
  },
  {
    title: "Desenvolvedor Web Front-End",
    company: "Clube de Programação Cimatec",
    location: "Salvador, BA",
    period: "Jul 2022 - Mai 2024",
    type: "Híbrido",
    highlights: [
      "Desenvolvi apps web com React.js / Next.js com foco em UX e SEO",
      "Contribuí no desenvolvimento do site oficial do Clube de Programação com Figma e ReactJS",
      "Participei de competições de algoritmos com C++ e Python"
    ],
    tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Vite"]
  },
  {
    title: "Gerente de Marketing",
    company: "Clube de Programação Cimatec",
    location: "Salvador, BA",
    period: "Jun 2021 - Mar 2023",
    type: "Presencial",
    highlights: [
      "Criação da identidade visual do Instagram e demais eventos do Clube de Programação",
      "Responsável pela comunicação com membros, venda de produtos e divulgação da iniciativa"
    ],
    tags: ["Marketing", "Design", "Identidade Visual", "Comunicação"]
  },
  {
    title: "Iniciação Científica — Sistema MES / Indústria 4.0",
    company: "SENAI CIMATEC",
    location: "Salvador, BA",
    period: "Ago 2022 - Jan 2023",
    type: "Presencial",
    highlights: [
      "Desenvolvimento de software de sistema de execução de manufaturas avançadas (MES)",
      "Aplicação de recursos da Indústria 4.0 em ambiente de pesquisa e desenvolvimento"
    ],
    tags: ["MES", "Indústria 4.0", "Pesquisa", "Desenvolvimento de Software"]
  }
]

const PUBLICATIONS = [
  {
    title: "Statistical Study of Eco-Efficiency in Compact and Average Cars",
    venue: "VIII SIINTEC International Symposium",
    year: "Nov 2022",
    description: "Análise estatística e modelagem de dados para avaliação de ecoeficiência entre marcas automotivas brasileiras."
  },
  {
    title: "Viability of Using Piezoelectric Devices in Urban Zones for Energy Generation",
    venue: "VII SIINTEC International Symposium",
    year: "Dec 2021",
    description: "Pesquisa de viabilidade do uso de piezoelétricos em zonas urbanas de alto fluxo para geração de energia."
  }
]

const CERTIFICATIONS = [
  { name: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google", year: "2026" },
  { name: "AWS Machine Learning Foundations", issuer: "Amazon Web Services", year: "2026" },
  { name: "Designer de Experimentos (DOE)", issuer: "SENAI CIMATEC", year: "2025" },
  { name: "Supervised ML: Regression", issuer: "IBM / Coursera", year: "2025" },
  { name: "Exploratory Data Analysis for ML", issuer: "IBM / Coursera", year: "2024" },
  { name: "Introduction to AI", issuer: "IBM / Coursera", year: "2024" },
  { name: "Assistente de Engenharia", issuer: "SENAI CIMATEC", year: "2024" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Grupo Boticário", year: "2022" },
  { name: "Introdução à Nuvem e Serviços de AWS", issuer: "Grupo Boticário", year: "2022" },
]

const PROJECTS = [
  {
    id: "anomaly-detect",
    title: "ANOMALY_DETECT.ai",
    description: "Sistema de ML end-to-end para detecção de anomalias em custos de garantia entre concessionárias Ford, identificando overcharges via BigQuery e Vertex AI.",
    previewHint: "Execute o modelo ao vivo · Veja anomalias sendo detectadas · Score de risco por concessionária",
    demoType: "ML em tempo real",
    tags: ["Keras", "BigQuery", "Vertex AI", "GCP", "Anomaly Detection"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "fastener-hunter",
    title: "FASTENER_HUNTER.ai",
    description: "Sistema de recomendação de fixadores integrando 3 BDs internos Ford. Busca por BAS Number → recomendações ranqueadas com assessment de LLM e checklist de validação.",
    previewHint: "Busca interativa nos BDs · Recomendações com score de match · Assessment automático via LLM",
    demoType: "Busca + LLM",
    tags: ["Python", "LLM", "SQL", "Prompt Engineering", "Recommendation"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "torque-calc",
    title: "TORQUE_ANGLE_CALC.py",
    description: "Calculadora de física de juntas para fixadores automotivos. Dado torque + tipo de junta, calcula ângulo exato sem danificar o material e garante fixação segura.",
    previewHint: "Ajuste torque em tempo real · Selecione tipo de junta · Veja ângulo calculado + status de segurança",
    demoType: "Calculadora física",
    tags: ["Python", "PyQt", "NumPy", "Matplotlib", "Physics"],
    status: "PROD",
    type: "ford"
  },
  {
    id: "vannex-cycle",
    title: "Vannex Cycle",
    description: "App Flutter de rastreamento de ciclo menstrual com previsões de fertilidade e insights personalizados. 100% privacy-first: SQLite local, sem cloud, sem tracking.",
    previewHint: "Explore features do app · Veja UI do ciclo mensal · Privacidade e arquitetura técnica",
    demoType: "Preview UI",
    tags: ["Flutter", "Dart", "SQLite", "Privacy First", "Health Tech"],
    status: "PROD",
    type: "personal"
  },
  {
    id: "monnex",
    title: "Monnex",
    description: "App Flutter de finanças pessoais com análise de gastos, metas e score de saúde financeira. Privacy-first: dados 100% locais com criptografia AES-256.",
    previewHint: "Navegue pelo dashboard · Veja gráficos de gastos · Score de saúde financeira",
    demoType: "Preview UI",
    tags: ["Flutter", "Dart", "SQLite", "Privacy First", "FinTech"],
    status: "PROD",
    type: "personal"
  },
  {
    id: "awiOS",
    title: "awiOS Engine",
    description: "Engine Flutter para visual novels com linguagem de scripting própria. Sistema de branching narrativo + diálogos estilo The Sims com sincronia emocional dos personagens.",
    previewHint: "Veja o motor de diálogos ao vivo · Personagens reagindo em tempo real · Explore o scripting engine",
    demoType: "Demo ao vivo",
    tags: ["Flutter", "Dart", "Visual Novel", "Game Engine"],
    status: "PROD",
    type: "personal"
  },
  {
    id: "tse-analyses",
    title: "TSE Analyses",
    description: "EDA + ML sobre gastos CEAP de deputados federais. Anomaly detection revela inconsistências ocultas que passam despercebidas no relatório oficial.",
    previewHint: "Passe o mouse no gráfico · Revele anomalias escondidas · Veja valores reais vs relatório oficial",
    demoType: "Visualização EDA",
    tags: ["Python", "Pandas", "Anomaly Detection", "EDA"],
    status: "PROD",
    type: "personal"
  },
  {
    id: "kdd-cup",
    title: "KDD Cup 1999 — Model Comparison",
    description: "Comparação de 5 modelos de ML (Random Forest, Decision Tree, Naive Bayes, KNN, MLP) para detecção de intrusão em rede. Dataset com 494k conexões e 41 features.",
    previewHint: "Compare modelos ao vivo · Veja métricas F1/Precision/Recall · Explore matriz de confusão",
    demoType: "Benchmark ML",
    tags: ["Python", "Sklearn", "Pandas", "Anomaly Detection", "KDD Cup"],
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
              { id: "experiencia", label: "XP" },
              { id: "projetos", label: "Projetos" },
              { id: "contato", label: "Contato" }
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
                {"< ENGENHEIRO IA/ML | ENG. DE DADOS />"}
              </p>
              
              <p className="text-[#00B4FF]/70 max-w-2xl mb-4 text-base sm:text-lg px-4">
                Engenheiro de Computação com 3 anos de experiência em ML na Ford Motor Company —
                construí pipelines de dados no GCP, sistema de detecção de anomalias em produção e ferramentas internas com LLM e OCR.
              </p>

              <p className="text-[#FCE94F]/50 text-sm mb-8">
                Salvador, BA | Inglês C1 | Alemão B1
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
                  { label: "Projetos", value: "8" },
                  { label: "Certificações", value: "9" },
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
                <p className="text-[#00B4FF]/70 text-sm">SENAI CIMATEC | 2020 - 2026 | IEEE EMBS Cimatec</p>
              </div>
            </section>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && (
            <section className="py-16">
              <GlitchText 
                text="// HABILIDADES" 
                className="text-2xl sm:text-3xl font-bold text-[#FCE94F] mb-12 text-center"
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ML / IA */}
                <CyberCard delay={0}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">ML / IA</span>
                    </div>
                    {SKILLS.mlAi.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* ML Techniques */}
                <CyberCard delay={0.1}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Técnicas de ML</span>
                    </div>
                    {SKILLS.mlTechniques.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Data Engineering */}
                <CyberCard delay={0.2}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Eng. de Dados</span>
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
                      <span className="text-[#FCE94F] font-bold">Linguagens</span>
                    </div>
                    {SKILLS.languages.map((s, i) => renderSkillBar(s.name, s.level, i))}
                  </div>
                </CyberCard>

                {/* Visualization & Frontend */}
                <CyberCard delay={0.5}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Layers className="w-6 h-6 text-[#FF4400]" />
                      <span className="text-[#FCE94F] font-bold">Visualização & Frontend</span>
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
                      <span className="text-[#FCE94F] font-bold">IA Generativa</span>
                    </div>
                    {SKILLS.genAi.map((s, i) => renderSkillBar(s.name, s.level, i))}
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
                  Expertise em disseminação de conhecimento em prompt engineering e uso de ferramentas generativas em ambientes corporativos. 
                  Desenvolvimento de estratégias avançadas de prompting (Chain-of-Thought, Few-Shot, Role-Based), integração de LLMs em pipelines ML, 
                  fine-tuning de modelos e implementação de RAG (Retrieval-Augmented Generation) para casos de uso empresariais.
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
                    {selectedProject === "vannex-cycle" && <VannexCycleoDemo />}
                    {selectedProject === "monnex" && <MonnexDemo />}
                    {selectedProject === "awiOS" && <AwiOSDemo />}
                    {selectedProject === "tse-analyses" && <TSEAnalysesDemo />}
                    {selectedProject === "kdd-cup" && <KDDCupDemo />}
                    {/* Ford Projects */}
                    {selectedProject === "anomaly-detect" && <AnomalyDetectionDemo />}
                    {selectedProject === "fastener-hunter" && <FastenerHunterDemo />}
                    {selectedProject === "torque-calc" && <TorqueCalcDemo />}
                  </div>
                </div>
              ) : (
                // Projects Grid
                <>
                  {/* Category: Ford Projects */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-lg font-bold text-[#FF4400]">▓ PROJETOS FORD</h3>
                      <span className="text-xs text-[#FF4400]/50 border border-[#FF4400]/20 px-2 py-0.5 rounded font-mono">
                        🔒 Repos Privados / Corporativos
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
                              <Play className="w-3 h-3 group-hover:scale-110 transition-transform" />
                              Abrir Simulação Interativa
                            </button>
                          </div>
                        </CyberCard>
                      ))}
                    </div>
                  </div>

                  {/* Category: Personal Projects */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-lg font-bold text-[#00B4FF]">▓ PROJETOS PESSOAIS</h3>
                      <span className="text-xs text-[#00B4FF]/50 border border-[#00B4FF]/20 px-2 py-0.5 rounded font-mono">
                        Demos interativos disponíveis
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
                            <button
                              onClick={() => setSelectedProject(project.id)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00B4FF]/10 border border-[#00B4FF]/30 text-[#00B4FF] rounded hover:bg-[#00B4FF]/20 hover:border-[#00B4FF]/60 transition-all text-sm font-medium group"
                            >
                              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              Abrir Demo Interativo
                            </button>
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
          {activeSection === "contato" && (
            <section className="py-16">
              <GlitchText 
                text="// CONTATO" 
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
          {"<"} ADRIAN WIDMER | ENGENHEIRO IA/ML {"/>"} | 2026
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
