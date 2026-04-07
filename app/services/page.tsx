"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Target, Megaphone, Sparkles, PenTool, Settings, BarChart } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"

const services = [
  { 
    id: "digital-marketing-strategy", 
    name: "Digital Marketing Strategy", 
    icon: <Target className="h-5 w-5" />,
    description: "Data-driven roadmaps to maximize your online presence and reach your target audience effectively."
  },
  { 
    id: "social-media-management", 
    name: "Social Media Management", 
    icon: <Megaphone className="h-5 w-5" />,
    description: "Engage your community and build brand loyalty across all major social platforms."
  },
  { 
    id: "branding-identity", 
    name: "Branding & Identity", 
    icon: <Sparkles className="h-5 w-5" />,
    description: "Craft a unique, memorable brand voice and visual identity that stands out in the market."
  },
  { 
    id: "content-creation", 
    name: "Content Creation", 
    icon: <PenTool className="h-5 w-5" />,
    description: "High-quality, conversion-focused content including blogs, videos, and professional copywriting."
  },
  { 
    id: "campaign-setup", 
    name: "Campaign Setup & Optimization", 
    icon: <Settings className="h-5 w-5" />,
    description: "Precision-targeted ad campaigns engineered for maximum ROI and lowest cost per acquisition."
  },
  { 
    id: "performance-tracking", 
    name: "Performance Tracking & Reporting", 
    icon: <BarChart className="h-5 w-5" />,
    description: "Comprehensive analytics dashboards providing actionable insights into your campaign health."
  },
]

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance animate-fade-up">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Comprehensive digital marketing solutions designed to accelerate your startup's growth.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <li key={service.id} className="min-h-[16rem] list-none animate-fade-up relative z-50" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
                <Link href={`/services/${service.id}`} className="block h-full group relative z-50 cursor-pointer pointer-events-auto">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#343c43] p-2 md:rounded-[1.5rem] md:p-3 transition-transform duration-500 hover:-translate-y-2 cursor-pointer">
                    
                    {/* Interactive glowing effect layer */}
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    
                    {/* Core Inner Card Background */}
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[#343c43] bg-black p-6 md:p-8 transition-colors duration-500 group-hover:border-[#5ec6ff]/30">
                      
                      {/* Subtle fixed background gradient block (acts as base before hover) */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                        style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(94, 198, 255, 0.05))" }}
                      />

                      <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
                        {/* Icon Wrapper */}
                        <div className="w-fit rounded-xl border border-[#343c43] bg-[#1d4ed8]/10 p-3 text-[#5ec6ff] shadow-inner group-hover:bg-[#1d4ed8]/20 transition-colors duration-300 group-hover:scale-110 transform">
                          {service.icon}
                        </div>
                        
                        <div className="space-y-4 mt-4">
                          <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#5ec6ff] transition-colors duration-300">
                            {service.name}
                          </h3>
                          <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {service.description}
                          </p>
                        </div>

                        {/* Animated Underline */}
                        <div
                          className="mt-2 h-1 w-0 group-hover:w-16 transition-all duration-500 ease-out"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>

                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  )
}
