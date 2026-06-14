"use client"

import { motion } from "framer-motion"

export function FinalCTA() {
  return (
    <section className="relative py-40 bg-[#050508] overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background Horizon Effect */}
      <div className="absolute inset-0 perspective-[1000px] flex items-end justify-center pointer-events-none">
        {/* Race track fading into horizon */}
        <div className="w-[200%] h-[200%] absolute bottom-[-100%] border-t border-[#343C43]"
             style={{ transform: "rotateX(75deg)" }}>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
          {/* Glowing Light Trail */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[100%] bg-gradient-to-b from-[#5EC6FF] to-transparent blur-xl glow-cyan animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight"
        >
          Ready To Enter <br />
          <span className="text-transparent bg-clip-text gradient-primary glow-text">The Fast Lane?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[rgba(255,255,255,0.7)] mb-12 font-mono uppercase tracking-widest"
        >
          Growth is a system. Let's build yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative inline-block group"
        >
          <button className="relative px-10 py-5 bg-[#171A1F] border border-[#343C43] overflow-hidden transition-all hover:border-[#5EC6FF] cursor-pointer">
            {/* Charging Fill Background */}
            <div className="absolute inset-0 bg-[#1D4ED8] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <span className="relative z-10 font-mono text-white text-lg uppercase tracking-widest group-hover:text-white transition-colors duration-500">
              Launch Your Growth Engine
            </span>
          </button>

          {/* Pixel Rocket Cameo */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-32 group-hover:translate-x-[500px] transition-all duration-1000 ease-in pointer-events-none z-50">
            <div className="text-2xl rotate-45">🚀</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#0F1115] to-transparent z-10" />
    </section>
  )
}
