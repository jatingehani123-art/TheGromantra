import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Target, Megaphone, Monitor, BarChart3, Palette, TerminalSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, PPC, Web Development, Branding — GROMANTRA",
  description: "Explore GROMANTRA's full-service digital marketing solutions: technical SEO, social media management, custom web development, performance marketing (Google Ads & Meta Ads), and brand identity design. Growth systems that scale.",
  keywords: ["SEO services", "social media marketing agency", "custom web development", "performance marketing services", "Google Ads management", "PPC campaign management", "brand identity design", "digital marketing agency India", "conversion rate optimization", "organic traffic growth"],
  alternates: { canonical: "https://thegromantra.com/services" },
}

const SERVICES = [
  {
    id: "seo",
    name: "SEO",
    icon: Target,
    desc: "Dominate search results with technical SEO audits, keyword strategy, on-page optimization, and authority-building content that compounds organic traffic and drives qualified leads month over month."
  },
  {
    id: "social-media",
    name: "Social Media & Content",
    icon: Megaphone,
    desc: "Strategic social media marketing and content creation across Instagram, LinkedIn, Facebook, and X — community management, influencer campaigns, and content calendars engineered for engagement and conversions."
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: Monitor,
    desc: "Custom website development, responsive design, and high-performance web applications — from landing pages to full-stack platforms built for Core Web Vitals, speed, and conversion rate optimization."
  },
  {
    id: "performance-marketing",
    name: "Performance Marketing",
    icon: BarChart3,
    desc: "ROI-driven Google Ads, Meta Ads, and PPC campaign management — precision audience targeting, A/B creative testing, and real-time bid optimization to maximize lead generation and minimize cost per acquisition."
  },
  {
    id: "branding",
    name: "Branding & Creative",
    icon: Palette,
    desc: "Complete brand identity design — logo systems, visual guidelines, video production, and motion graphics that build recognition, trust, and a cohesive presence across every digital and print touchpoint."
  }
]

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="flex-1 pt-32 pb-24 relative z-10 flex flex-col items-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-15" style={{ zIndex: -10, pointerEvents: 'none' }} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />

        <div className="text-center mb-16 relative z-10 px-4">
          <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
            // SYSTEMS & PROTOCOLS
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
            The Engine
          </h1>
          <p className="mt-4 text-[rgba(255,255,255,0.7)] max-w-2xl mx-auto text-lg">
            A unified growth infrastructure spanning all critical digital channels.
          </p>
        </div>

        {/* Network Grid View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            
            {/* Connecting lines for desktop (simulated network) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full hidden lg:block opacity-30" style={{ zIndex: -10, pointerEvents: 'none' }}>
              <path d="M 33 20 L 66 20 L 66 60 L 33 60 Z" fill="none" stroke="#343C43" strokeWidth="0.5" strokeDasharray="1 1" />
              <path d="M 50 40 L 50 60" fill="none" stroke="#343C43" strokeWidth="0.5" strokeDasharray="1 1" />
            </svg>

            {SERVICES.map((s, i) => (
              <Link key={s.id} href={`/services/${s.id}`} className="group relative z-20 pointer-events-auto block">
                <div className="h-full bg-[#171A1F] border border-[#343C43] rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:border-[#5EC6FF]/50 group-hover:shadow-[0_0_30px_rgba(94,198,255,0.15)] group-hover:-translate-y-2 overflow-hidden">
                  
                  {/* Hover scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(94,198,255,0.05),transparent)] translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 pointer-events-none" />

                  <div className="w-16 h-16 rounded-full bg-[#0F1115] border border-[#343C43] flex items-center justify-center text-[#5EC6FF] mb-6 group-hover:scale-110 group-hover:border-[#5EC6FF] group-hover:glow-cyan transition-all duration-500">
                    <s.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider group-hover:text-[#5EC6FF] transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-[rgba(255,255,255,0.6)] font-sans text-sm leading-relaxed mb-8 flex-1">
                    {s.desc}
                  </p>

                  <div className="mt-auto font-mono text-[10px] text-[#5EC6FF] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    <TerminalSquare className="w-3 h-3" />
                    Initialize System <span className="ml-1">→</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Empty/Placeholder for grid symmetry if needed */}
            <div className="hidden lg:flex h-full border border-dashed border-[#343C43] rounded-xl p-8 flex-col items-center justify-center text-center opacity-50 relative overflow-hidden">
              <div className="font-mono text-[#343C43] text-xs tracking-widest uppercase">
                // SYSTEM_READY
                <br/><br/>
                Awaiting Protocol Expansion
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
