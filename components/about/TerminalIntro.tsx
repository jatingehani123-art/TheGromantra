"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function TerminalIntro() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [typedLength, setTypedLength] = useState(0)

  const fullText = `Gromantra is a solo-operator 360° digital marketing agency designed for brands that demand full-stack growth without the friction of managing multiple vendors. 

By operating as a unified engine, we eliminate bottlenecks and execute strategies that span the entire digital ecosystem. From high-intent SEO architectures that capture search demand, to precision performance marketing and paid ads that drive immediate ROI. We engineer engaging content and social frameworks, alongside high-converting web and funnel development. 

But modern growth requires more than just standard channels. We integrate advanced branding and design, sophisticated marketing automation and AI workflows, and live analytics and reporting to ensure every decision is data-backed. 

This is an end-to-end growth infrastructure built for scale.`

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setTypedLength((prev) => {
          if (prev >= fullText.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 2 // typing speed
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isInView, fullText.length])

  const logs = [
    "[10:04:22] LOG: SYSTEM BOOT COMPLETE",
    "[10:04:23] LOG: FOUNDING PROTOCOL ... INITIATED",
    "[10:04:24] LOG: PHILOSOPHY ... DATA OVER OPINION",
    "[10:04:26] LOG: CURRENT FOCUS ... SCALE AUTOMATION",
  ]

  return (
    <section ref={containerRef} className="py-32 bg-[#050508] relative overflow-hidden">
      {/* Background Circuit Grid & Particles */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.15),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        <div className="mb-12">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4"
          >
            // SYSTEM LOG — INIT GROMANTRA
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-display font-bold text-white uppercase"
          >
            The Beginning Of The Circuit
          </motion.h2>
        </div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="relative bg-[#0F1115] border border-[#343C43] rounded-lg overflow-hidden shadow-[0_0_30px_rgba(29,78,216,0.1)]"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#343C43] bg-[#171A1F]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 font-mono text-xs text-[rgba(255,255,255,0.4)]">gromantra_sys_core.exe</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed text-[rgba(255,255,255,0.85)] relative">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #5EC6FF 2px, #5EC6FF 4px)" }} />

            {/* Paragraphs with Typewriter Effect */}
            <div className="space-y-6 relative z-10">
              <p>
                {fullText.substring(0, typedLength)}
                <span className="inline-block w-2 h-4 bg-[#5EC6FF] ml-1 animate-pulse" />
              </p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={typedLength >= fullText.length ? { opacity: 1 } : {}}
                className="mt-8 pt-8 border-t border-[#343C43]/50"
              >
                <p className="text-[#5EC6FF] font-bold text-lg mb-6 uppercase tracking-wider">
                  &gt; One operator, one system, every channel — measured, optimized, accelerated.
                </p>

                {/* Animated Log History */}
                <div className="space-y-2 text-xs md:text-sm text-[rgba(255,255,255,0.6)]">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={typedLength >= fullText.length ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.5 }}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
