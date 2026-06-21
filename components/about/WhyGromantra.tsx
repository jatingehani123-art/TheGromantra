"use client"

import { motion } from "framer-motion"

const points = [
  {
    trad: "Multiple vendors, disconnected reporting",
    gro: "One operator, one unified system",
  },
  {
    trad: "Slow approval chains",
    gro: "Real-time execution, no bottlenecks",
  },
  {
    trad: "Generic strategies",
    gro: "Custom-engineered for your brand",
  },
  {
    trad: "Static monthly reports",
    gro: "Live performance telemetry",
  },
]

export function WhyGromantra() {
  return (
    <section className="py-32 bg-[#050508] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4"
          >
            // COMPARISON MODULE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white uppercase"
          >
            Why Gromantra
          </motion.h2>
        </div>

        {/* The Duel Arena */}
        <div className="relative">
          {/* Desktop Center Divider line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#343C43] to-transparent -translate-x-1/2 -z-10 pointer-events-none" />

          {/* Table Headers */}
          <div className="hidden md:flex justify-between mb-12 relative z-10 px-8">
            <div className="w-[45%] text-left text-[rgba(255,255,255,0.4)] font-mono text-sm uppercase tracking-widest">
              Traditional Agencies
            </div>
            <div className="w-[45%] text-right text-[#5EC6FF] font-mono text-sm uppercase tracking-widest glow-text">
              Gromantra
            </div>
          </div>

          {/* Duel Points */}
          <div className="space-y-16 md:space-y-12">
            {points.map((point, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 relative z-10 group">
                
                {/* Traditional Side (Left / Top) */}
                <motion.div 
                  initial={{ opacity: 0, x: -50, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                  className="w-full md:w-[45%] p-6 rounded-lg bg-[#0F1115]/50 border border-[#171A1F] text-[rgba(255,255,255,0.5)] flex items-center shadow-inner grayscale group-hover:opacity-50 transition-opacity relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                  <span className="font-sans relative z-10">
                    <span className="text-red-500/50 mr-2 font-mono">[-]</span> {point.trad}
                  </span>
                </motion.div>

                {/* VS Marker (Center) */}
                <div className="md:absolute left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#171A1F] border border-[#343C43] flex items-center justify-center font-mono text-[10px] text-[rgba(255,255,255,0.3)] z-20">
                  VS
                </div>

                {/* Gromantra Side (Right / Bottom) */}
                <motion.div 
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.1, type: "spring", stiffness: 150, damping: 15 }}
                  className="w-full md:w-[45%] p-6 rounded-lg bg-[#171A1F] border border-[#5EC6FF]/30 text-white flex justify-end items-center text-right shadow-[0_0_20px_rgba(94,198,255,0.1)] glow-blue relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(94,198,255,0.3)] group-hover:border-[#5EC6FF]/60 transition-all"
                >
                  {/* Speed Lines inside card */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#5EC6FF_10px,#5EC6FF_11px)] group-hover:animate-pulse" />
                  
                  <span className="font-sans font-medium relative z-10 flex items-center gap-2 w-full justify-end">
                    {point.gro} <span className="text-[#5EC6FF] font-mono">[+]</span>
                  </span>
                </motion.div>

              </div>
            ))}
          </div>

          {/* Closing Line */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-32"
          >
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-wider">
              Same race. <span className="inline-block text-transparent bg-clip-text gradient-primary glow-text">Different machine.</span>
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
