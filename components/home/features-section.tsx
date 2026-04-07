"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Marketing Planner",
    description: "Plan campaigns with AI-powered insights and automated scheduling.",
    icon: "📅",
  },
  {
    title: "Social Media Manager",
    description: "Manage all social channels from one beautiful dashboard.",
    icon: "📱",
  },
  {
    title: "Brand Kit Organizer",
    description: "Keep your brand consistent with centralized asset management.",
    icon: "🎨",
  },
  {
    title: "Campaign Tracking",
    description: "Real-time monitoring and campaign performance analytics.",
    icon: "📊",
  },
  {
    title: "Analytics Dashboard",
    description: "Deep insights into your marketing ROI and customer behavior.",
    icon: "📈",
  },
  {
    title: "Content Creator",
    description: "Generate stunning content with AI assistance.",
    icon: "✨",
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(29, 78, 216, 0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Powerful Features for Modern Marketing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in digital marketing, built for startups and growing teams.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
              className="relative p-6 rounded-xl transition-all duration-300 border border-[#343c43] hover:border-[#5ec6ff]/50 bg-white/5 group cursor-pointer hover:shadow-[0_0_20px_rgba(94,198,255,0.15)]"
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.1), rgba(94, 198, 255, 0.1))" }}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:animate-float">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#5ec6ff] transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
