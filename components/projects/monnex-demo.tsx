'use client'

import { useState } from 'react'
import { Wallet, PieChart, Target, CreditCard, Home, Lock, Zap, Info } from 'lucide-react'

const CATEGORIES = [
  { label: "Food", icon: "🍔", spent: 680, budget: 800, color: "#f4a261" },
  { label: "Transport", icon: "🚗", spent: 320, budget: 400, color: "#00B4FF" },
  { label: "Health", icon: "💊", spent: 150, budget: 300, color: "#4caf50" },
]

const TRANSACTIONS = [
  { label: "Apple Store", cat: "Entertainment", icon: "🍎", value: -12.99, date: "Today", color: "#888" },
  { label: "Local Supermarket", cat: "Food", icon: "🛒", value: -187.40, date: "Today", color: "#f4a261" },
  { label: "Uber Ride", cat: "Transport", icon: "🚕", value: -24.50, date: "Yesterday", color: "#00B4FF" },
  { label: "Ford Salary", cat: "Income", icon: "💼", value: 7200.00, date: "04/01", color: "#4caf50" },
  { label: "Pharmacy", cat: "Health", icon: "💊", value: -45.80, date: "03/31", color: "#4caf50" },
]

const GOALS = [
  { label: "Emergency Fund", ok: true },
  { label: "New Laptop", ok: false },
]

export default function MonnexDemo() {
  const [activeTab, setActiveTab] = useState("home")
  const [score] = useState(82)

  const scoreLabel = score >= 70 ? "Good" : score >= 40 ? "Regular" : "Alert"

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* App Mockup */}
      <div className="w-full max-w-[280px] aspect-[9/19.5] bg-[#0f0f12] rounded-[3rem] border-[6px] border-[#222] shadow-2xl relative overflow-hidden flex-shrink-0 mx-auto md:mx-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl z-20" />
        
        <div className="h-full w-full bg-[#fafafa] p-4 pt-8 flex flex-col">
          {activeTab === "home" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <p className="text-[#888] text-[10px] uppercase font-bold tracking-widest">Total Balance</p>
                <p className="text-[#111] text-2xl font-bold mt-0.5">$ 14,250.00</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#4caf50]/10 rounded-2xl p-3 border border-[#4caf50]/20">
                  <p className="text-[#4caf50] text-[9px] font-bold uppercase">Net Result</p>
                  <p className="text-[#111] text-sm font-bold mt-0.5">+ $ 2,400</p>
                </div>
                <div className="bg-[#f44336]/10 rounded-2xl p-3 border border-[#f44336]/20">
                  <p className="text-[#f44336] text-[9px] font-bold uppercase">Monthly Spend</p>
                  <p className="text-[#111] text-sm font-bold mt-0.5">$ 1,150</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[#111] text-xs font-bold">Financial Health</p>
                  <span className="text-[10px] px-2 py-0.5 bg-[#4caf50] text-white rounded-full font-bold">{scoreLabel}</span>
                </div>
                <div className="h-2 bg-[#eee] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4caf50] transition-all duration-1000" style={{ width: `${score}%` }} />
                </div>
                <p className="text-[#888] text-[9px] mt-2">Diversify and contribute more frequently to improve.</p>
              </div>

              <div className="space-y-2">
                <p className="text-[#111] text-xs font-bold">Recent Transactions</p>
                {TRANSACTIONS.slice(0, 3).map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm border border-black/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: `${t.color}20` }}>
                        {t.icon}
                      </div>
                      <div>
                        <p className="text-[#111] text-[10px] font-bold">{t.label}</p>
                        <p className="text-[#888] text-[8px]">{t.cat}</p>
                      </div>
                    </div>
                    <p className={`text-[10px] font-bold ${t.value > 0 ? "text-[#4caf50]" : "text-[#111]"}`}>
                      {t.value > 0 ? "+" : ""}{t.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-around py-3 bg-white rounded-2xl shadow-lg border border-black/5">
            {[["home", Home], ["gastos", PieChart], ["metas", Target]].map(([id, Icon]) => (
              <button key={id as string} onClick={() => setActiveTab(id as string)}>
                <Icon className={`w-5 h-5 ${activeTab === id ? "text-[#111]" : "text-[#ccc]"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex-1 space-y-6 text-[#FCE94F]">
        <div>
          <h4 className="text-white text-xl font-bold flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5" /> Privacy-First Finance
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            Personal financial management app with an absolute focus on privacy. 
            While popular apps monetize spending patterns, Monnex ensures that 
            <span className="text-white font-semibold"> no financial data ever leaves your device</span>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-white">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-[#4caf50] mb-2 font-bold text-sm">
              <Lock className="w-4 h-4" /> Native Encryption
            </div>
            <p className="text-white/50 text-xs">Keys and sensitive data protected by system Keychain/Keystore.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-[#00B4FF] mb-2 font-bold text-sm">
              <Zap className="w-4 h-4" /> Local Scoring
            </div>
            <p className="text-white/50 text-xs">Financial health analysis runs locally without cloud processing.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3">
          <Info className="w-5 h-5 text-[#FCE94F] shrink-0" />
          <p className="text-xs text-white/60 leading-relaxed italic">
            Zero cloud · Zero analytics · Zero ads · No internet access required
          </p>
        </div>
      </div>
    </div>
  )
}
