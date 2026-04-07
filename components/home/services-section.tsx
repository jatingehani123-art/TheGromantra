"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  { id: "digital-marketing-strategy", name: "Digital Marketing Strategy", icon: "🎯" },
  { id: "social-media-management", name: "Social Media Management", icon: "📢" },
  { id: "branding-identity", name: "Branding & Identity", icon: "✨" },
  { id: "content-creation", name: "Content Creation", icon: "✍️" },
  { id: "campaign-setup", name: "Campaign Setup & Optimization", icon: "⚙️" },
  { id: "performance-tracking", name: "Performance Tracking & Reporting", icon: "📊" },
]

export default function ServicesSection() {
  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden">
      {/* Spotlight Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle at top-left, rgba(94, 198, 255, 0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Services We Provide</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive digital marketing solutions tailored to your startup's needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link href={`/services/${service.id}`} className="block h-full group">
                <div className="relative p-8 rounded-xl card-glass hover:card-glass-hover transition-all duration-500 border border-[#343c43] hover:border-[#5ec6ff]/50 h-full cursor-pointer bg-white/5">
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(94, 198, 255, 0.05))" }}
                  />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#5ec6ff] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <div
                      className="mt-4 h-1 w-0 group-hover:w-12 transition-all duration-300"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
