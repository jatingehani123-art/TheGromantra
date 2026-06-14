"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const words = [
  "Gromantra", "wasn't", "built", "as", "another", "agency.", "It", "was", "built", "as", "a", "performance", "machine.",
  "Every", "campaign.", "Every", "click.", "Every", "conversion.",
  "Measured.", "Optimized.", "Accelerated."
]

export function OriginTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  })

  // Timeline line fill
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="py-32 relative bg-[#0F1115] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Animated text scramble/reveal */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-mono tracking-widest text-[#343C43] uppercase mb-8"
          >
            // 01 The Origin
          </motion.h2>
          
          <div className="flex flex-wrap gap-x-3 gap-y-4 text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.1, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={
                  word.includes("machine") || word.includes("Accelerated")
                    ? "text-[#5EC6FF] glow-text"
                    : "text-white"
                }
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Timeline Track */}
        <div className="relative pl-8 md:pl-16 border-l border-[#171A1F]">
          <motion.div 
            className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[#1D4ED8] to-[#5EC6FF] origin-top shadow-[0_0_10px_rgba(94,198,255,0.5)]"
            style={{ height: "100%", scaleY: lineScale, transformOrigin: "top" }}
          />

          <div className="space-y-24">
            {[
              { year: "INIT", title: "System Architecture", desc: "Building the foundation of a modern growth machine." },
              { year: "EXEC", title: "Campaign Deployment", desc: "Launching data-driven marketing vectors." },
              { year: "OPT", title: "Algorithmic Refinement", desc: "Continuous iteration for maximum performance." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-[41px] md:-left-[73px] top-1 w-4 h-4 rounded-full bg-[#0F1115] border-2 border-[#5EC6FF] glow-cyan" />
                
                <div className="text-sm font-mono text-[#5EC6FF] mb-2 tracking-wider">{step.year}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-lg max-w-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}
