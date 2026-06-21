"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_LOGS = [
  "Optimizing keyword cluster — complete.",
  "Deploying ad creative variant B.",
  "Publishing scheduled content batch to IG/TikTok.",
  "A/B test result: variant B +12% CTR.",
  "Core Web Vitals scan: LCP under 1.2s.",
  "Competitor backlink gap identified.",
  "Scaling performance budget on winning ad set.",
  "Re-rendering video asset with new kinetic typography.",
  "Syncing CRM data with Meta Conversions API.",
  "Running technical SEO crawl — 0 errors found."
]

export default function SignalBoardSection() {
  const [logs, setLogs] = useState<{ id: number; time: string; text: string }[]>([])
  const logIdRef = useRef(0)

  useEffect(() => {
    // Initial logs
    const initial = Array.from({ length: 6 }).map((_, i) => ({
      id: logIdRef.current++,
      time: new Date(Date.now() - (6 - i) * 5000).toTimeString().split(' ')[0],
      text: MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)]
    }))
    setLogs(initial)

    // Add a new log every 2-4 seconds
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, {
          id: logIdRef.current++,
          time: new Date().toTimeString().split(' ')[0],
          text: MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)]
        }]
        // Keep max 10 logs
        return newLogs.slice(-10)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden border-t border-[#343C43]">
      
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 lg:pr-12 relative z-10 text-center lg:text-left">
          <p className="text-[#5EC6FF] font-mono text-xs tracking-widest mb-4 uppercase flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse glow-red" />
            LIVE FEED
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wide mb-6">
            The System Never Sleeps
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.7)] mb-8 font-sans leading-relaxed">
            While agencies wait for weekly check-ins, our growth engine is constantly executing, optimizing, and scaling across every channel in real time.
          </p>
        </div>

        {/* Live Terminal Feed */}
        <div className="flex-1 w-full max-w-2xl relative z-10">
          <div className="bg-[#0F1115] border border-[#343C43] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(29,78,216,0.15)] relative h-[400px] flex flex-col">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#343C43] bg-[#171A1F]">
              <div className="w-3 h-3 rounded-full bg-[#5EC6FF] animate-pulse" />
              <span className="ml-2 font-mono text-xs text-[rgba(255,255,255,0.4)]">gromantra_pulse_stream.exe</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff 2px, #ffffff 4px)" }} />
              
              <div className="h-full flex flex-col justify-end space-y-3 relative z-10 mask-image-fade-top pb-2">
                <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 border-b border-[#343C43]/50 pb-2 last:border-0"
                    >
                      <span className="text-[rgba(255,255,255,0.4)] shrink-0">[{log.time}]</span>
                      <span className="text-[#5EC6FF] glow-cyan">{log.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
