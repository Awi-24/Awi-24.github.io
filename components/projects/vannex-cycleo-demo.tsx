'use client'

import { useState } from 'react'
import { Calendar, Bell, BarChart3, Droplets, Home, Lock, Activity, Info } from 'lucide-react'

const PHASES = [
  { id: "menstrual", label: "Menstrual", days: "1 – 5", color: "#e75480", light: "#ff8fab", bg: "#3d0d1e", emoji: "🔴", desc: "Uterine lining shedding. Prioritize rest, hydration, and warmth." },
  { id: "follicular", label: "Follicular", days: "6 – 13", color: "#f4a261", light: "#ffd09b", bg: "#3d2008", emoji: "🌱", desc: "Estrogen rising. High energy — great for exercise and new projects." },
  { id: "ovulation", label: "Ovulation", days: "14 – 16", color: "#ffd60a", light: "#fff176", bg: "#3d3200", emoji: "✨", desc: "LH peak. Fertile window. Peak energy and libido." },
  { id: "luteal", label: "Luteal", days: "17 – 28", color: "#b48ded", light: "#d4b4fe", bg: "#2a1a45", emoji: "🌙", desc: "Progesterone rises. Possible PMS in final days. Prioritize self-care." },
]

const SYMPTOMS = [
  { label: "Cramps", icon: "⚡", active: true },
  { label: "Headache", icon: "🤯", active: false },
  { label: "Bloating", icon: "💧", active: true },
  { label: "Fatigue", icon: "😴", active: false },
]

export default function VannexCycleoDemo() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* App Mockup */}
      <div className="w-full max-w-[280px] aspect-[9/19.5] bg-[#0f0f12] rounded-[3rem] border-[6px] border-[#222] shadow-2xl relative overflow-hidden flex-shrink-0 mx-auto md:mx-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl z-20" />
        
        <div className="h-full w-full bg-[#050507] p-4 pt-8 flex flex-col">
          {activeTab === "home" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">April 15</p>
                  <p className="text-white text-xl font-bold mt-0.5">Hello! 👋</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#e75480]/20 flex items-center justify-center border border-[#e75480]/40">
                  <Activity className="w-4 h-4 text-[#e75480]" />
                </div>
              </div>

              <div className="bg-[#e75480]/10 border border-[#e75480]/30 rounded-2xl p-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-[#e75480] flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
                  <span className="text-2xl font-bold text-white">Day 12</span>
                  <span className="text-[8px] text-[#e75480] font-bold uppercase">Follicular</span>
                </div>
                <p className="text-white/70 text-[10px] mt-4 leading-relaxed px-2">
                  Energy is peaking! Great day for intense training or deep work.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1a1e] rounded-xl p-3 border border-white/5">
                  <p className="text-white/40 text-[8px] uppercase font-bold">Predicted Next</p>
                  <p className="text-white text-xs font-bold mt-1">April 29</p>
                </div>
                <div className="bg-[#1a1a1e] rounded-xl p-3 border border-white/5">
                  <p className="text-white/40 text-[8px] uppercase font-bold">Fertility</p>
                  <p className="text-[#ffd60a] text-xs font-bold mt-1">High Risk</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cycle" && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h5 className="text-white font-bold text-sm">Cycle Phases</h5>
              <div className="space-y-2">
                {PHASES.map((p) => (
                  <div key={p.id} className="p-2 rounded-xl border border-white/5 flex items-center gap-3 bg-[#1a1a1e]/50">
                    <span className="text-xl">{p.emoji}</span>
                    <div>
                      <p className="text-white text-[10px] font-bold">{p.label} <span className="text-white/30 font-normal ml-1">Days {p.days}</span></p>
                      <p className="text-white/40 text-[8px] leading-tight mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-around py-3 bg-[#1a1a1e] rounded-2xl border border-white/5">
            {[["home", Home], ["cycle", Calendar], ["log", Droplets]].map(([id, Icon]) => (
              <button key={id as string} onClick={() => setActiveTab(id as string)}>
                <Icon className={`w-5 h-5 ${activeTab === id ? "text-[#e75480]" : "text-white/20"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex-1 space-y-6">
        <div>
          <h4 className="text-[#e75480] text-xl font-bold flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5" /> Privacy-First Tracker
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            Menstrual cycle tracker that places user privacy above all else. 
            While popular apps monetize health data, Vannex Cycle ensures 
            <span className="text-[#e75480] font-semibold"> no data ever leaves the device</span> — not even for anonymous analytics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-[#e75480] mb-2 font-bold text-sm">
              <Lock className="w-4 h-4" /> Local Encryption
            </div>
            <p className="text-white/50 text-xs">AES-256 local encryption for all sensitive logs and cycle history.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-[#e75480] mb-2 font-bold text-sm">
              <Activity className="w-4 h-4" /> Local Logic
            </div>
            <p className="text-white/50 text-xs">Prediction algorithm runs 100% on-device. No cloud processing required.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#e75480]/5 border border-[#e75480]/20 flex gap-3">
          <Info className="w-5 h-5 text-[#e75480] shrink-0" />
          <p className="text-xs text-white/60 leading-relaxed italic">
            Zero cloud · Zero tracking · Zero ads · Fully Open Source
          </p>
        </div>
      </div>
    </div>
  )
}
