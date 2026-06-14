"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { MonitorPlay, Search, Zap, Crosshair, BarChart3, Bot, TerminalSquare } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"

export function OperatorSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax for the Holo-deck
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10])

  const [easterEggActive, setEasterEggActive] = useState(false)

  const chips = [
    { label: "OPERATOR.STATUS: ONLINE", top: "10%", left: "-20%", delay: 0 },
    { label: "CHANNELS: 360°", top: "40%", right: "-30%", delay: 0.2 },
    { label: "SYSTEMS: SEO / ADS / CONTENT", bottom: "20%", left: "-15%", delay: 0.4 },
    { label: "AUTOMATION / BRAND / ANALYTICS", top: "-10%", right: "10%", delay: 0.6 },
  ]

  return (
    <section ref={containerRef} className="py-40 bg-[#050508] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 z-0 pointer-events-none" />

      <div className="text-center relative z-20 max-w-3xl px-4 mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wide"
        >
          The Operator
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-[rgba(255,255,255,0.7)] font-mono max-w-2xl mx-auto"
        >
          One operator. Every channel. Full-stack growth — run live, in real time.
        </motion.p>
      </div>

      {/* Founder Holo-Deck Container */}
      <div className="relative z-20 w-full max-w-md mx-auto perspective-[1200px]">
        
        <motion.div 
          className="relative w-full aspect-[4/5] md:aspect-square mx-auto transform-gpu"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Glowing Backlight */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#5EC6FF] to-[#1D4ED8] opacity-20 blur-2xl animate-pulse" style={{ transform: "translateZ(-50px)" }} />

          {/* Glass Frame */}
          <div className="absolute inset-0 bg-[#171A1F]/50 backdrop-blur-md border border-[#5EC6FF]/40 rounded-xl overflow-hidden glow-blue flex items-center justify-center">
            
            {/* The Photo */}
            <div className="relative w-full h-full opacity-90 mix-blend-screen saturate-50 contrast-125">
              <img 
                src="/jatin.png" 
                alt="Jatin Gehani - Founder Hologram" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('bg-[#1D4ED8]/20', 'flex', 'items-center', 'justify-center');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] to-transparent opacity-80" />
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #5EC6FF 2px, #5EC6FF 4px)" }} />
            
            {/* Chromatic Aberration Edge Fakes */}
            <div className="absolute inset-0 border-l-2 border-r-2 border-red-500/30 mix-blend-screen pointer-events-none transform translate-x-1" />
            <div className="absolute inset-0 border-t-2 border-b-2 border-blue-500/30 mix-blend-screen pointer-events-none transform -translate-x-1" />

            {/* HUD Corner Brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#5EC6FF]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#5EC6FF]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#5EC6FF]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#5EC6FF]" />

            {/* Pulsing UI inside Frame */}
            <div className="absolute bottom-6 left-6 font-mono text-[#5EC6FF] text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                REC
              </div>
              <div>TRANSMISSION_LIVE</div>
            </div>
          </div>

          {/* Orbiting Readout Chips (Desktop floating, mobile stacked) */}
          {chips.map((chip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + chip.delay, type: "spring" }}
              className="absolute hidden md:flex items-center gap-2 bg-[#0F1115]/80 backdrop-blur-md border border-[#343C43] px-3 py-2 rounded text-[10px] font-mono text-[#5EC6FF] whitespace-nowrap glow-cyan"
              style={{
                top: chip.top,
                bottom: chip.bottom,
                left: chip.left,
                right: chip.right,
                transform: "translateZ(50px)"
              }}
            >
              <TerminalSquare className="w-3 h-3" />
              {chip.label}
            </motion.div>
          ))}
          
        </motion.div>

        {/* Founder Name & Intro (Positioned directly below the hologram) */}
        <div className="relative z-30 mt-12 text-center">
          <h3 className="text-3xl font-display font-bold text-white tracking-widest uppercase mb-2">
            Jatin Gehani
          </h3>
          <p className="text-[#5EC6FF] font-mono text-xs uppercase tracking-[0.2em] mb-4">
            // Founder & System Architect
          </p>
          <p className="text-[rgba(255,255,255,0.7)] text-sm max-w-md mx-auto font-sans leading-relaxed">
            I don't just run campaigns; I engineer automated growth systems. My approach combines data-driven precision with aggressive execution to scale brands predictably.
          </p>
        </div>

        {/* Mobile Stacked Chips */}
        <div className="mt-12 flex flex-col gap-3 md:hidden px-4 relative z-30">
          {chips.map((chip, i) => (
            <div key={i} className="bg-[#0F1115]/80 border border-[#343C43] px-3 py-2 rounded text-[10px] font-mono text-[#5EC6FF] flex items-center gap-2 glow-cyan">
              <TerminalSquare className="w-3 h-3" />
              {chip.label}
            </div>
          ))}
        </div>

        {/* Easter Egg: Pixel Character */}
        <div className="absolute -bottom-16 -right-10 md:-right-24 cursor-pointer group" onClick={() => setEasterEggActive(true)}>
          <div className="relative">
            {easterEggActive && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 -left-12 bg-white text-black font-pixel text-[8px] p-2 rounded shadow-[0_0_10px_#5EC6FF] whitespace-nowrap"
              >
                SYSTEM PILOT: JATIN
                {/* Tail */}
                <div className="absolute bottom-[-4px] right-6 w-2 h-2 bg-white rotate-45" />
              </motion.div>
            )}
            <div className="w-12 h-12 bg-[#1D4ED8] rounded-sm relative shadow-[4px_4px_0_0_#5EC6FF] overflow-hidden hover:scale-110 transition-transform">
              {/* Very primitive CSS pixel art face */}
              <div className="absolute top-3 left-2 w-2 h-2 bg-white" />
              <div className="absolute top-3 right-2 w-2 h-2 bg-white" />
              <div className="absolute top-4 left-3 w-1 h-1 bg-black" />
              <div className="absolute top-4 right-3 w-1 h-1 bg-black" />
              <div className="absolute bottom-3 left-3 w-6 h-1 bg-white" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
