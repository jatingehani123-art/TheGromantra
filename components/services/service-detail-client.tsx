"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Target, Megaphone, Monitor, BarChart3, Palette, CheckCircle2, ChevronDown, Activity } from "lucide-react"
import { motion } from "framer-motion"

const ICON_MAP: Record<string, any> = {
  seo: Target,
  "social-media": Megaphone,
  "web-development": Monitor,
  "performance-marketing": BarChart3,
  branding: Palette,
}

function StatCounter({ targetValue, suffix }: { targetValue: number, suffix: string }) {
  const [count, setCount] = useState(0)

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => {
        let current = 0
        const duration = 2000
        const step = targetValue / (duration / 16)
        
        const timer = setInterval(() => {
          current += step
          if (current >= targetValue) {
            setCount(targetValue)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, 16)
      }}
      className="text-7xl md:text-9xl font-display font-bold text-[#5EC6FF] glow-text"
    >
      {count}{suffix}
    </motion.div>
  )
}

export default function ServiceDetailClient({ service, id }: { service: any, id: string }) {
  const Icon = ICON_MAP[id] || Target

  return (
    <main className="bg-[#050508] min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* SEC 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center">
        <div 
          className="absolute inset-0 blur-[150px] -z-10 pointer-events-none opacity-40" 
          style={{ background: `radial-gradient(circle at center, ${service.themeColor}, transparent 50%)` }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl mx-auto relative z-10"
        >
          <div className="w-20 h-20 mx-auto rounded-xl bg-[#0F1115] border border-[#5EC6FF]/50 flex items-center justify-center text-[#5EC6FF] mb-8 glow-blue animate-[float_4s_ease-in-out_infinite]">
            <Icon className="w-10 h-10" />
          </div>
          <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
            // ACTIVE PROTOCOL
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-wide mb-6">
            {service.name}
          </h1>
          <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.7)] font-sans max-w-2xl mx-auto mb-10">
            {service.tagline}
          </p>
          <Link 
            href={`/contact?service=${encodeURIComponent(service.name)}`}
            className="inline-block px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan relative overflow-hidden group"
          >
            Start Project <span className="ml-2 group-hover:ml-4 transition-all">→</span>
          </Link>
        </motion.div>

        {/* Scroll cue indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#5EC6FF] tracking-widest uppercase">System Check</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-5 h-5 text-[#5EC6FF]" />
          </motion.div>
        </motion.div>
      </section>

      {/* SEC 2: WHAT'S INCLUDED (Scroll Cards) */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/50">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase">System Capabilities</h2>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:overflow-x-auto snap-y md:snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
            {service.included.map((item: string, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                key={i} 
                className="snap-center md:snap-start shrink-0 w-full md:w-[400px] bg-[#171A1F]/50 backdrop-blur-md border border-[#343C43] rounded-xl p-8 flex flex-col items-start gap-6 hover:border-[#5EC6FF]/50 hover:shadow-[0_0_30px_rgba(94,198,255,0.15)] transition-all group"
              >
                <div className="p-3 rounded-lg bg-black/50 border border-[#343C43] group-hover:border-[#5EC6FF]/30 transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-[#1D4ED8] group-hover:text-[#5EC6FF] transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">{item}</h3>
                <p className="text-[rgba(255,255,255,0.6)] font-mono text-sm leading-relaxed">
                  Included within the standard {service.name} deployment protocol. Optimizes overall output quality.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEC 3: HOW IT WORKS (Checkpoint Timeline) */}
      <section className="py-32 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase">Execution Track</h2>
          </motion.div>
          
          <div className="relative">
            {/* Animated Horizontal Line for Desktop */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1D4ED8] via-[#5EC6FF] to-[#1D4ED8] origin-left" 
            />
            
            {/* Animated Vertical Line for Mobile */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="block md:hidden absolute top-0 bottom-0 left-12 w-[2px] bg-gradient-to-b from-[#1D4ED8] via-[#5EC6FF] to-[#1D4ED8] origin-top" 
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { title: "DISCOVER", desc: "System audit & gap analysis" },
                { title: "STRATEGIZE", desc: "Blueprint & resource allocation" },
                { title: "EXECUTE", desc: "Launch & integrate protocols" },
                { title: "OPTIMIZE", desc: "Live tuning & reporting" }
              ].map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.5 + (i * 0.2), duration: 0.5 }}
                  key={i} 
                  className="relative flex flex-row md:flex-col items-center text-left md:text-center gap-6 md:gap-0"
                >
                  <div className="w-24 h-24 rounded-full bg-[#0F1115] border-2 border-[#5EC6FF] flex items-center justify-center text-[#5EC6FF] font-mono text-xl md:mb-8 relative z-10 shadow-[0_0_30px_rgba(94,198,255,0.4)] shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-mono uppercase tracking-widest mb-2 text-xl">{step.title}</h3>
                    <p className="text-[rgba(255,255,255,0.6)] text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEC 4: RESULTS / PROOF VISUAL */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 mix-blend-overlay -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Activity className="w-16 h-16 text-[#1D4ED8] mx-auto mb-6 glow-blue" />
            <h2 className="text-2xl md:text-3xl font-mono text-white uppercase tracking-widest mb-2">
              Measurable Outcomes
            </h2>
            <p className="text-[rgba(255,255,255,0.6)]">Built for absolute scale.</p>
          </motion.div>
          
          <StatCounter targetValue={service.stats.value} suffix={service.stats.suffix} />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-[rgba(255,255,255,0.8)] font-sans mt-8"
          >
            {service.stats.label}
          </motion.p>
        </div>
      </section>

      {/* SEC 5: WHY THIS SERVICE & CTA */}
      <section className="py-32 bg-[#050508] relative z-10 border-t border-[#343C43]/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8"
          >
            The Solo Operator Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-[rgba(255,255,255,0.7)] mb-14 leading-relaxed"
          >
            Agencies pass your {service.name} project from account managers to junior staff, diluting the strategy. With Gromantra, the same system architect who builds the strategy executes the daily operations. Zero communication lag, maximum accountability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link 
              href={`/contact?service=${encodeURIComponent(service.name)}`}
              className="inline-block px-12 py-6 text-black font-mono font-bold text-lg uppercase tracking-widest bg-[#5EC6FF] hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(94,198,255,0.5)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95"
            >
              Deploy This System
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
