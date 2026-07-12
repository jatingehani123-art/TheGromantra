"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, DollarSign, Users, Award, Percent, ChevronDown, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PerformancePageClient({ service, id }: { service: any, id: string }) {
  // Slider states
  const [budget, setBudget] = useState(10000) // $10,000
  const [cpc, setCpc] = useState(1.50) // $1.50 CPC
  const [convRate, setConvRate] = useState(3.5) // 3.5% conversion rate

  const CTR = 0.04 // 4% constant CTR
  const AOV = 180 // $180 Average Order Value

  // Derived metrics
  const clicks = Math.floor(budget / cpc)
  const impressions = Math.floor(clicks / CTR)
  const conversions = Math.floor(clicks * (convRate / 100))
  const revenue = conversions * AOV
  const roas = budget > 0 ? (revenue / budget).toFixed(2) : "0.00"
  const cpa = conversions > 0 ? (budget / conversions).toFixed(2) : "0.00"

  return (
    <main className="bg-[#050508] min-h-screen relative overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <Navbar />

      {/* --- SECTION 1: HERO (SNAP) --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center snap-start">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,198,255,0.12),transparent_50%)] -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 w-full text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-[#5EC6FF] uppercase border border-[#5EC6FF]/30 rounded-full mb-6 bg-[#0F1115]/80 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EC6FF] animate-pulse" />
            ROI CALCULATOR ACTIVE
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-none">
            Paid <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#5EC6FF] glow-text">
              Acquisition.
            </span>
          </h1>
          <p className="text-lg text-[rgba(255,255,255,0.7)] font-mono mb-8 max-w-xl">
            We deploy high-yielding paid ad infrastructure across Google and Meta, optimizing spend parameters to secure immediate ROAS scaling.
          </p>
          <Link 
            href={`/contact?service=Performance%20Marketing`}
            className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan mb-12"
          >
            Initiate Ad Vectors →
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-mono text-[10px] text-[#5EC6FF] tracking-widest uppercase">Scroll to Funnel</span>
          <ChevronDown className="w-5 h-5 text-[#5EC6FF] animate-bounce" />
        </div>
      </section>

      {/* --- SECTION 2: INTERACTIVE FUNNEL & CALCULATOR (SNAP) --- */}
      <section className="min-h-screen py-24 border-t border-[#343C43]/40 bg-black flex flex-col justify-center snap-start relative">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
              Funnel Architecture
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
              // Live acquisition forecasting matrix
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Sliders (Left 6 Columns) */}
            <div className="lg:col-span-6 bg-[#0F1115]/80 border border-[#343C43] rounded-xl p-8 space-y-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-20 pointer-events-auto">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider border-b border-[#343C43]/50 pb-4">
                Uplink Parameters
              </h3>

              {/* Slider 1: Budget */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-[rgba(255,255,255,0.7)]">
                  <span>Ad Budget</span>
                  <span className="text-[#5EC6FF] font-bold">${budget.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1 bg-[#171A1F] rounded-lg appearance-none cursor-pointer accent-[#5EC6FF]"
                />
              </div>

              {/* Slider 2: CPC */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-[rgba(255,255,255,0.7)]">
                  <span>Target CPC</span>
                  <span className="text-[#5EC6FF] font-bold">${cpc.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.20" 
                  max="5.00" 
                  step="0.05" 
                  value={cpc} 
                  onChange={(e) => setCpc(Number(e.target.value))}
                  className="w-full h-1 bg-[#171A1F] rounded-lg appearance-none cursor-pointer accent-[#5EC6FF]"
                />
              </div>

              {/* Slider 3: Conversion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-[rgba(255,255,255,0.7)]">
                  <span>Conversion Rate</span>
                  <span className="text-[#5EC6FF] font-bold">{convRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="15.0" 
                  step="0.1" 
                  value={convRate} 
                  onChange={(e) => setConvRate(Number(e.target.value))}
                  className="w-full h-1 bg-[#171A1F] rounded-lg appearance-none cursor-pointer accent-[#5EC6FF]"
                />
              </div>

              {/* Calculated Outputs Summary */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#343C43]/50">
                <div className="bg-black/40 border border-[#343C43] rounded p-4">
                  <div className="text-[10px] font-mono text-[rgba(255,255,255,0.4)] uppercase">PROJECTED REVENUE</div>
                  <span className="text-xl font-mono font-bold text-white">${revenue.toLocaleString()}</span>
                </div>
                <div className="bg-[#1D4ED8]/10 border border-[#5EC6FF]/30 rounded p-4 shadow-[0_0_15px_rgba(94,198,255,0.05)]">
                  <div className="text-[10px] font-mono text-[#5EC6FF] uppercase">PROJECTED ROAS</div>
                  <span className="text-xl font-mono font-bold text-green-400">{roas}x</span>
                </div>
              </div>
            </div>

            {/* Visual Funnel Representation (Right 6 Columns) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
              {/* Funnel Level 1: Impressions */}
              <div 
                className="w-full h-16 bg-gradient-to-r from-[#171A1F] to-[#1D4ED8]/50 border border-[#343C43] rounded-lg flex items-center justify-between px-8 relative overflow-hidden transition-all duration-300"
                style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 8% 100%)" }}
              >
                <span className="font-mono text-xs text-[rgba(255,255,255,0.6)]">// IMPRESSIONS</span>
                <span className="font-mono text-lg font-bold text-white">{impressions.toLocaleString()}</span>
              </div>

              {/* Funnel Level 2: Clicks */}
              <div 
                className="w-[84%] h-16 bg-gradient-to-r from-[#171A1F] to-[#1D4ED8] border border-[#343C43] rounded-lg flex items-center justify-between px-8 relative overflow-hidden transition-all duration-300"
                style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}
              >
                <span className="font-mono text-xs text-[rgba(255,255,255,0.7)]">// CLICKS</span>
                <span className="font-mono text-lg font-bold text-white">{clicks.toLocaleString()}</span>
              </div>

              {/* Funnel Level 3: Conversions */}
              <div 
                className="w-[68%] h-16 bg-[#171A1F] border border-[#5EC6FF]/50 rounded-lg flex items-center justify-between px-8 relative overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(94,198,255,0.15)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
              >
                <span className="font-mono text-xs text-[#5EC6FF] font-bold">// CONVERSIONS</span>
                <span className="font-mono text-lg font-bold text-[#5EC6FF]">{conversions.toLocaleString()}</span>
              </div>

              {/* Funnel Level 4: Revenue */}
              <div className="w-[50%] h-12 bg-white text-black font-mono font-bold text-sm uppercase tracking-widest flex items-center justify-center rounded shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                ${revenue.toLocaleString()} REV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: INCLUDED SERVICES (SNAP) --- */}
      <section className="min-h-screen py-32 relative z-10 border-t border-[#343C43]/40 bg-[#050508] flex flex-col justify-center snap-start">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
            Paid Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.included.map((item: string, i: number) => (
              <div 
                key={i} 
                className="bg-[#171A1F]/50 border border-[#343C43] rounded-xl p-8 text-left hover:border-[#5EC6FF]/50 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded bg-[#0F1115] border border-[#5EC6FF]/30 flex items-center justify-center text-[#5EC6FF] mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg uppercase mb-2">{item}</h4>
                  <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed">
                    Custom paid vectors scale conversions, decrease cost-per-acquisition, and drive predictive ROAS matrices.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
