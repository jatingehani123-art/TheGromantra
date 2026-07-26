"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, Cpu, Code, Eye, RefreshCw, Terminal, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function WebDevPageClient({ service, id }: { service: any, id: string }) {
  const [renderMode, setRenderMode] = useState<"split" | "visual" | "wireframe">("split")
  const [logs, setLogs] = useState<string[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Simulation Logs
  useEffect(() => {
    const messages = [
      "SYSTEM: Initializing V3 Growth Engine Build...",
      "SYSTEM: Hydrating Next.js 16 core assets...",
      "METRICS: DOM Weight: 240kB [OPTIMAL]",
      "METRICS: Largest Contentful Paint (LCP): 0.6s [EXCELLENT]",
      "METRICS: Cumulative Layout Shift (CLS): 0.00 [STABLE]",
      "METRICS: First Input Delay (FID): 8ms [ZERO_LATENCY]",
      "SECURITY: SSL handshake completed successfully.",
      "SYSTEM: Deployment uplink running at 100% speed capacity."
    ]

    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < messages.length) {
        setLogs(prev => [...prev, messages[currentIdx]])
        currentIdx++
      } else {
        clearInterval(interval)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  return (
    <main className="bg-[#050508] min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,198,255,0.12),transparent_50%)]" style={{ zIndex: -10, pointerEvents: 'none' }} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-4 w-full text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-[#5EC6FF] uppercase border border-[#5EC6FF]/30 rounded-full mb-6 bg-[#0F1115]/80 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EC6FF] animate-pulse" />
            ENGINE PROTOCOL: ONLINE
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-none">
            Web <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#5EC6FF] glow-text">
              Engineering.
            </span>
          </h1>
          <p className="text-lg text-[rgba(255,255,255,0.7)] font-mono mb-8 max-w-xl">
            We build lightning-fast, high-converting digital platforms engineered with Next.js, optimizing Core Web Vitals to zero latency.
          </p>
          <Link 
            href={`/contact?service=Web%20Development`}
            className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan mb-12"
          >
            Launch Code Vector →
          </Link>
        </div>
      </section>

      {/* --- SPLIT SCREEN WIREFRAME VISUALIZER --- */}
      <section className="py-24 border-t border-[#343C43]/40 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
              Visualizer Room
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
              // Switch between layout wireframe and final visual rendering
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setRenderMode("visual")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all flex items-center gap-2 ${
                renderMode === "visual" ? "bg-white text-black border-white" : "border-[#343C43] text-white hover:border-[#5EC6FF]"
              }`}
            >
              <Eye className="w-4 h-4" /> Visual
            </button>
            <button 
              onClick={() => setRenderMode("split")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all flex items-center gap-2 ${
                renderMode === "split" ? "bg-[#1D4ED8] text-white border-[#5EC6FF] glow-blue" : "border-[#343C43] text-white hover:border-[#5EC6FF]"
              }`}
            >
              <RefreshCw className="w-4 h-4" /> Split
            </button>
            <button 
              onClick={() => setRenderMode("wireframe")}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all flex items-center gap-2 ${
                renderMode === "wireframe" ? "bg-white text-black border-white" : "border-[#343C43] text-white hover:border-[#5EC6FF]"
              }`}
            >
              <Code className="w-4 h-4" /> Wireframe
            </button>
          </div>

          {/* Split Screen Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
            {/* Visual Panel */}
            <AnimatePresence mode="popLayout">
              {(renderMode === "split" || renderMode === "visual") && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`border border-[#343C43] bg-[#0F1115] rounded-xl overflow-hidden shadow-2xl relative ${
                    renderMode === "visual" ? "lg:col-span-2" : ""
                  }`}
                  style={{ minHeight: "400px" }}
                >
                  <div className="bg-[#171A1F] border-b border-[#343C43] px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="font-mono text-xs text-[rgba(255,255,255,0.4)] ml-4">mock_startup_visual.html</span>
                  </div>

                  {/* Mock Visual Content */}
                  <div className="p-8 space-y-8">
                    <div className="h-12 w-32 bg-[#171A1F] border border-[#343C43] rounded" />
                    <div className="space-y-4">
                      <div className="h-8 w-2/3 bg-gradient-to-r from-[#1D4ED8] to-[#5EC6FF] rounded" />
                      <div className="h-4 w-1/2 bg-[#171A1F] rounded" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-[#171A1F] border border-[#343C43] rounded p-4 flex flex-col justify-between">
                        <span className="font-mono text-xs text-[#5EC6FF]">LCP</span>
                        <span className="text-2xl font-bold text-white">0.6s</span>
                      </div>
                      <div className="h-24 bg-[#171A1F] border border-[#343C43] rounded p-4 flex flex-col justify-between">
                        <span className="font-mono text-xs text-[#5EC6FF]">CLS</span>
                        <span className="text-2xl font-bold text-white">0.00</span>
                      </div>
                      <div className="h-24 bg-[#171A1F] border border-[#343C43] rounded p-4 flex flex-col justify-between">
                        <span className="font-mono text-xs text-[#5EC6FF]">FID</span>
                        <span className="text-2xl font-bold text-white">8ms</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wireframe Panel */}
            <AnimatePresence mode="popLayout">
              {(renderMode === "split" || renderMode === "wireframe") && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`border border-dashed border-[#5EC6FF]/50 bg-black rounded-xl overflow-hidden relative ${
                    renderMode === "wireframe" ? "lg:col-span-2" : ""
                  }`}
                  style={{ minHeight: "400px" }}
                >
                  <div className="bg-black/80 border-b border-[#343C43] px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#5EC6FF]/20 border border-[#5EC6FF]" />
                    <span className="font-mono text-xs text-[#5EC6FF] ml-4">mock_startup_wireframe.md</span>
                  </div>

                  {/* Mock Wireframe Content */}
                  <div className="p-8 space-y-8 bg-[linear-gradient(rgba(94,198,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(94,198,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] h-full">
                    <div className="h-12 w-32 border border-dashed border-[#5EC6FF]/40 rounded flex items-center justify-center font-mono text-[10px] text-[#5EC6FF]/60 bg-black">
                      &lt;NAVBAR_CONTAINER&gt;
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 w-2/3 border border-dashed border-[#5EC6FF] rounded flex items-center pl-4 font-mono text-[10px] text-[#5EC6FF] bg-black">
                        &lt;HERO_TITLE&gt;
                      </div>
                      <div className="h-4 w-1/2 border border-dashed border-[#5EC6FF]/30 rounded flex items-center pl-4 font-mono text-[9px] text-[#5EC6FF]/40 bg-black">
                        &lt;SUB_TEXT&gt;
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 border border-dashed border-[#1D4ED8] rounded p-4 flex flex-col justify-between bg-black">
                        <span className="font-mono text-[9px] text-[#1D4ED8]">GRID_ITEM_01</span>
                        <span className="font-mono text-xs text-[#1D4ED8]">&lt;LCP_WIDGET&gt;</span>
                      </div>
                      <div className="h-24 border border-dashed border-[#1D4ED8] rounded p-4 flex flex-col justify-between bg-black">
                        <span className="font-mono text-[9px] text-[#1D4ED8]">GRID_ITEM_02</span>
                        <span className="font-mono text-xs text-[#1D4ED8]">&lt;CLS_WIDGET&gt;</span>
                      </div>
                      <div className="h-24 border border-dashed border-[#1D4ED8] rounded p-4 flex flex-col justify-between bg-black">
                        <span className="font-mono text-[9px] text-[#1D4ED8]">GRID_ITEM_03</span>
                        <span className="font-mono text-xs text-[#1D4ED8]">&lt;FID_WIDGET&gt;</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Core Web Vitals Terminal Log */}
          <div className="bg-[#0F1115] border border-[#343C43] rounded-xl overflow-hidden max-w-3xl mx-auto shadow-2xl">
            <div className="bg-[#171A1F] border-b border-[#343C43] px-4 py-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#5EC6FF]" />
              <span className="font-mono text-xs text-white">CORE_WEB_VITALS_TELEMETRY.LOG</span>
            </div>
            <div className="p-6 bg-black h-48 overflow-y-auto font-mono text-xs text-[#5EC6FF] space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[rgba(255,255,255,0.3)]">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </section>

      {/* --- INCLUDED MODULES --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
            Development Scope
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
                    Custom web development includes responsive layouts, Next.js optimization, routing, API uplinks, and custom layouts.
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
