"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const POSTS = [
  {
    slug: "architecting-growth-systems",
    title: "Why You Need a Growth System, Not Just Campaigns",
    excerpt: "Campaigns turn off when you stop spending. Growth systems compound over time. Here's how to build the infrastructure that scales your brand indefinitely.",
    date: "OCT 12, 2024",
    category: "Strategy & Systems" // Using a generic tag or one of the 5 services
  },
  {
    slug: "performance-marketing-2024",
    title: "Performance Marketing in an AI-First World",
    excerpt: "As ad platforms shift towards automated bidding and AI generation, the real edge is in data architecture and creative velocity.",
    date: "OCT 28, 2024",
    category: "Performance Marketing"
  },
  {
    slug: "seo-technical-foundations",
    title: "Technical SEO: Building The Digital Signal",
    excerpt: "Content is king, but infrastructure is the kingdom. If search engines can't crawl your digital architecture, your content doesn't exist.",
    date: "NOV 05, 2024",
    category: "SEO"
  },
  {
    slug: "brand-identity-scale",
    title: "Brand Identity That Moves: Designing For Scale",
    excerpt: "Static logos are dead. Modern brand identities must be kinetic, responsive, and designed specifically for digital ecosystems.",
    date: "NOV 18, 2024",
    category: "Branding"
  }
]

export default function BlogIndexPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />
      
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4">
              // TRANSMISSION LOG
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
              From The Command Deck
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {["All Transmissions", "SEO", "Social Media", "Web Development", "Performance Marketing", "Branding"].map((tag, i) => (
              <button 
                key={i}
                className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${i === 0 ? "bg-[#1D4ED8] border-[#5EC6FF] text-white glow-blue" : "bg-[#171A1F] border-[#343C43] text-[rgba(255,255,255,0.7)] hover:border-[#5EC6FF] hover:text-[#5EC6FF]"}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {POSTS.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full group relative z-50 cursor-pointer">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#343c43] p-2 transition-transform duration-500 hover:-translate-y-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[#343c43] bg-black p-6 transition-colors duration-500 group-hover:border-[#5ec6ff]/30">
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(94, 198, 255, 0.05))" }} />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] text-[#5EC6FF] border border-[#5EC6FF]/30 bg-[#5EC6FF]/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="font-mono text-[10px] text-[rgba(255,255,255,0.5)]">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-[#5ec6ff] transition-colors duration-300 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm font-sans text-[rgba(255,255,255,0.6)] leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center text-[#5EC6FF] font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                      Read Transmission <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </main>
  )
}
