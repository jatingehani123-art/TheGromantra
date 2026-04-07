"use client"

import React from "react"
import { motion } from "framer-motion"

export default function DashboardPreviewSection() {
  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle at left, rgba(29, 78, 216, 0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Powerful Dashboard Preview</h2>
          <p className="text-gray-400 text-lg">Visualize your marketing performance at a glance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl"
        >
          <div
            className="absolute inset-0 rounded-2xl blur-3xl -z-10 transition-opacity duration-1000 opacity-80"
            style={{ background: "linear-gradient(to right, rgba(29, 78, 216, 0.25), rgba(94, 198, 255, 0.25))" }}
          />
          <div
            className="relative rounded-2xl border border-[#343c43] overflow-hidden bg-black/50 backdrop-blur-md shadow-2xl"
            style={{ boxShadow: "rgba(94, 198, 255, 0.2) 0 0 40px" }}
          >
            <img src="/advanced-analytics-dashboard.jpg" alt="Dashboard" className="w-full h-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
