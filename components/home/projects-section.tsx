"use client"

import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "E-Commerce Marketing Campaign",
    description: "Increased online sales by 340% with targeted social media strategy",
    category: "Social Media Strategy",
    metrics: "340% ROI",
    gradient: "linear-gradient(135deg, #1d4ed8, #5ec6ff)",
  },
  {
    id: 2,
    title: "Brand Identity Overhaul",
    description: "Complete rebranding resulting in 220% increase in brand recognition",
    category: "Branding",
    metrics: "220% Growth",
    gradient: "linear-gradient(135deg, #343c43, #1d4ed8)",
  },
  {
    id: 3,
    title: "Content Marketing Excellence",
    description: "Generated 500K organic impressions through strategic content creation",
    category: "Content Strategy",
    metrics: "500K Reach",
    gradient: "linear-gradient(135deg, #5ec6ff, #1d4ed8)",
  },
  {
    id: 4,
    title: "Influencer Campaign Launch",
    description: "Connected brands with 50+ micro-influencers for authentic engagement",
    category: "Influencer Marketing",
    metrics: "50+ Partnerships",
    gradient: "linear-gradient(135deg, #1d4ed8, #343c43)",
  },
  {
    id: 5,
    title: "Performance Analytics Suite",
    description: "Real-time tracking dashboard for 20+ marketing channels",
    category: "Analytics",
    metrics: "20+ Channels",
    gradient: "linear-gradient(135deg, #5ec6ff, #343c43)",
  },
  {
    id: 6,
    title: "Email Marketing Automation",
    description: "Automated campaigns achieving 45% open rate and 12% conversion",
    category: "Email Marketing",
    metrics: "45% Open Rate",
    gradient: "linear-gradient(135deg, #343c43, #5ec6ff)",
  },
]

export default function ProjectsSection() {
  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(94, 198, 255, 0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Our Projects</h2>
          <p className="text-gray-400 text-lg">Proven success stories from brands we've transformed</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
              className="project-card relative group cursor-pointer"

            >
              {/* Card Gradient Border */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 pointer-events-none"
                style={{ background: project.gradient }}
              >
                <div className="rounded-lg bg-black w-full h-full" />
              </div>

              {/* Card Content */}
              <div className="relative p-6 rounded-xl bg-black/80 backdrop-blur-md border border-[#343c43] group-hover:border-[#5ec6ff]/30 transition-all duration-300 h-full">
                {/* Category Badge */}
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#1d4ed8]/20 border border-[#5ec6ff]/30">
                  <span className="text-[#5ec6ff] text-xs font-semibold">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#5ec6ff] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6">{project.description}</p>

                {/* Metrics */}
                <div className="mb-6">
                  <p className="text-[#5ec6ff] font-bold text-lg">{project.metrics}</p>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center text-[#5ec6ff] group-hover:translate-x-2 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                style={{ background: project.gradient }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
