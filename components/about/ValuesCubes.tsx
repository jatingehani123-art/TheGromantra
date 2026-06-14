"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const values = [
  {
    title: "Precision",
    desc: "Every variable calculated. No guesswork, only algorithmic certainty.",
    delay: 0,
  },
  {
    title: "Speed",
    desc: "Velocity without friction. Rapid deployment and continuous iteration.",
    delay: 0.1,
  },
  {
    title: "Innovation",
    desc: "Pushing boundaries of what digital systems can achieve.",
    delay: 0.2,
  },
  {
    title: "Accountability",
    desc: "Data doesn't lie. Complete transparency in every metric.",
    delay: 0.3,
  },
]

export function ValuesCubes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-[#0F1115] relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase">
            Core Directives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => {
            const isHovered = hoveredIndex === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: val.delay }}
                className="relative h-64 md:h-80 w-full group cursor-pointer perspective-[1000px]"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : i)}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                >
                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#171A1F] border border-[#343C43] rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-12 h-12 mb-6 border border-[#5EC6FF] rounded flex items-center justify-center rotate-45 group-hover:glow-cyan transition-all">
                      <span className="-rotate-45 font-mono text-[#5EC6FF] text-lg">0{i + 1}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">{val.title}</h3>
                  </div>

                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1D4ED8] to-[#0F1115] border border-[#5EC6FF] rounded-xl flex flex-col items-center justify-center p-6 text-center glow-blue"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-4">{val.title}</h3>
                    <p className="text-[rgba(255,255,255,0.9)] font-mono text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
