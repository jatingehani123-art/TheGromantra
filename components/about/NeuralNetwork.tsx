"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const nodes = [
  { id: "seo", label: "SEO", x: 20, y: 20, desc: "Algorithmic search dominance via technical perfection." },
  { id: "perf", label: "Performance Marketing", x: 80, y: 30, desc: "Capital allocation systems designed for ROI." },
  { id: "content", label: "Content Strategy", x: 40, y: 50, desc: "Signal-to-noise ratio optimization." },
  { id: "brand", label: "Brand Positioning", x: 70, y: 70, desc: "Psychological framing and market positioning." },
  { id: "auto", label: "Automation", x: 10, y: 80, desc: "Zero-latency workflows and operational scale." },
  { id: "conv", label: "Conversion Optimization", x: 50, y: 90, desc: "Frictionless user journeys to conversion." },
  { id: "ai", label: "AI Systems", x: 90, y: 85, desc: "Predictive modeling and generative workflows." },
]

// Simple SVG lines connecting nearby nodes
const connections = [
  ["seo", "content"],
  ["seo", "auto"],
  ["content", "perf"],
  ["content", "conv"],
  ["perf", "brand"],
  ["brand", "ai"],
  ["conv", "brand"],
  ["auto", "conv"],
]

// Simple SVG pixel art icons
function PixelIcon({ type }: { type: string }) {
  if (type === "seo") {
    // Magnifying glass
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="4" y="2" width="6" height="2" />
        <rect x="2" y="4" width="2" height="6" />
        <rect x="10" y="4" width="2" height="6" />
        <rect x="4" y="10" width="6" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="11" y="11" width="2" height="2" />
        <rect x="13" y="13" width="2" height="2" />
      </svg>
    )
  }
  if (type === "perf") {
    // Megaphone / Zap
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="8" y="2" width="2" height="4" />
        <rect x="6" y="6" width="4" height="2" />
        <rect x="4" y="8" width="4" height="6" />
        <rect x="10" y="4" width="2" height="4" />
      </svg>
    )
  }
  // Generic block
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="4" y="4" width="8" height="8" />
    </svg>
  )
}

export function NeuralNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <section className="py-32 bg-[#050508] relative overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay z-0" />

      <div className="text-center relative z-20 max-w-3xl px-4 mb-16 mt-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wide">
          The Engine
        </h2>
        <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
          // 360° Capability Network
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] border border-[#171A1F]/50 rounded-xl bg-[#0F1115]/50 backdrop-blur-sm p-4 z-10">

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([from, to], i) => {
            const n1 = nodes.find((n) => n.id === from)
            const n2 = nodes.find((n) => n.id === to)
            if (!n1 || !n2) return null
            return (
              <motion.line
                key={i}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="#343C43"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = activeNode === node.id
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isActive ? null : node.id)}
            >
              <div className="relative cursor-pointer group z-20">
                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${isActive ? "bg-[#5EC6FF] border-[#fff] text-black glow-cyan" : "bg-[#171A1F] border-[#1D4ED8] text-[#5EC6FF] group-hover:bg-[#1D4ED8] group-hover:text-white"} transition-colors shadow-[4px_4px_0_0_#171A1F]`}>
                  <PixelIcon type={node.id} />
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0F1115]/80 px-2 rounded">
                  <span className={`font-mono text-[10px] ${isActive ? "text-[#5EC6FF]" : "text-[rgba(255,255,255,0.7)]"} uppercase tracking-wider`}>
                    {node.label}
                  </span>
                </div>
              </div>

              {/* Glass Card Expansion */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-50 top-4 pt-6 left-1/2 -translate-x-1/2 w-64"
                  >
                    <div className="p-4 rounded-lg bg-[rgba(10,10,10,0.95)] border border-[#5EC6FF]/30 backdrop-blur-xl shadow-[0_0_30px_rgba(29,78,216,0.2)]">
                      <h4 className="font-display font-bold text-white mb-2 uppercase text-sm">{node.label}</h4>
                      <p className="text-xs text-[rgba(255,255,255,0.7)] font-mono leading-relaxed">{node.desc}</p>
                      <div className="absolute top-6 left-4 w-8 h-[1px] bg-[#5EC6FF]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
