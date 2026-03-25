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
      className="min-h-screen p-2"
      style={{
        background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000080' fill-opacity='0.15'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E"), #c0c0c0`,
        fontFamily: "'Comic Sans MS', cursive, sans-serif"
      }}
    >
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
                ~~ ENGENHEIRO DE IA/ML ~~ {" "}
                <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
                ~~ FORD MOTOR COMPANY ~~ {" "}
                <Star className="inline w-5 h-5 text-yellow-400" /> {" "}
              </span>
            </div>
          </div>

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
                  Meu nome e <strong>Adrian Widmer</strong>, sou Engenheiro de IA/ML especializado em sistemas de ML em producao, Salvador, BA.
                </p>
                <p className="text-sm mb-2">
                  Trabalho com <span className="text-red-600">Machine Learning</span>, <span className="text-red-600">BigQuery</span>, <span className="text-red-600">GCP</span> e <span className="text-red-600">Python</span>!
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
                  {["Python", "Keras", "PyTorch", "BigQuery", "GCP", "Terraform", "Docker", "React.js", "SQL", "Pandas", "Vertex AI", "PySpark"].map((skill, i) => (
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

              {/* Engenheiro de IA/ML */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#000080] flex items-center justify-center text-white font-bold text-xs">
                    ML
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000080]">Engenheiro de IA/ML</h3>
                    <p className="text-xs text-gray-600">Nov 2023 - Presente</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  <li>* Desenvolvo pipelines de ML com Vertex AI e BigQuery</li>
                  <li>* Crio modelos de deteccao de anomalias com Keras</li>
                  <li>* Gerencio infraestrutura com Terraform no GCP</li>
                  <li>* Processa terabytes de dados em sistemas em producao</li>
                  <li>* Implemento ETL com Python, Pandas e PySpark</li>
                </ul>
              </div>

              {/* Clube de Programacao */}
              <div className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#008000] flex items-center justify-center text-white font-bold text-xs">
                    CP
                  </div>
                  <div>
                    <h3 className="font-bold text-[#008000]">Clube de Programacao CIMATEC</h3>
                    <p className="text-xs text-gray-600">Diretor Geral | Jan 2023 - Jun 2024</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  <li>* Liderei equipe de 15+ desenvolvedores</li>
                  <li>* Organizei workshops de Python e Web Dev</li>
                  <li>* Coordenei projetos open-source</li>
                  <li>* Mentorei estudantes em programacao</li>
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
                    <p className="text-white text-xs">Statistical Study of Eco-Efficiency Applying Concepts of Circular Economy to the State of Bahia</p>
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
                    <p className="text-[10px] mb-2">Recomendacao de fixadores com busca em 3 BDs internos e assessment via LLM</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
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
                {/* Vannex Cycleo */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">Vannex Cycleo</h3>
                  <p className="text-xs mb-2">App mobile para registro e analise de atividades de ciclismo</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">React Native</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">TypeScript</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Firebase</span>
                  </div>
                  <a href="https://github.com/Awi-24/Vannex-Cycleo" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

                {/* Monnex */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">Monnex</h3>
                  <p className="text-xs mb-2">App de financas pessoais com categorizacao inteligente</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Flask</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">React</span>
                  </div>
                  <a href="https://github.com/Awi-24/Monnex" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

                {/* AwiOS */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">AwiOS</h3>
                  <p className="text-xs mb-2">Sistema operacional de terminal interativo com comandos personalizados</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">TypeScript</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">React</span>
                  </div>
                  <a href="https://github.com/Awi-24/AwiOS" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                    Ver no GitHub
                  </a>
                </div>

                {/* TSE Analyses */}
                <div className="bg-[#c0c0c0] text-black p-3 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
                  <h3 className="font-bold text-[#800000] text-sm mb-1">TSE Analyses</h3>
                  <p className="text-xs mb-2">EDA + Anomaly Detection sobre gastos CEAP de deputados federais</p>
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
                  <h3 className="font-bold text-[#800000] text-sm mb-1">KDD Cup 1999</h3>
                  <p className="text-xs mb-2">Comparacao de 5 modelos ML para deteccao de intrusao (494k conexoes)</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-[#000080] text-white text-[10px] px-1">Python</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Sklearn</span>
                    <span className="bg-[#000080] text-white text-[10px] px-1">Pandas</span>
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
                  <p className="text-xs text-gray-600">2020 - 2026 (Previsao)</p>
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
                    { tag: "AWS", color: "bg-orange-500", name: "AWS Machine Learning Foundations", org: "Amazon Web Services | 2026" },
                    { tag: "DOE", color: "bg-[#000080]", name: "Designer de Experimentos (DOE)", org: "SENAI CIMATEC | 2025" },
                    { tag: "IBM", color: "bg-blue-700", name: "Supervised ML: Regression", org: "IBM / Coursera | 2025" },
                    { tag: "IBM", color: "bg-blue-700", name: "Exploratory Data Analysis for ML", org: "IBM / Coursera | 2024" },
                    { tag: "IBM", color: "bg-blue-700", name: "Introduction to AI", org: "IBM / Coursera | 2024" },
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

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
