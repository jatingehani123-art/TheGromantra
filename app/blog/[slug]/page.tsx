"use client"

import { use } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const POSTS_DATA: Record<string, { title: string; category: string; date: string }> = {
  "architecting-growth-systems": {
    title: "Why You Need a Growth System, Not Just Campaigns",
    category: "Strategy & Systems",
    date: "OCT 12, 2024",
  },
  "performance-marketing-2024": {
    title: "Performance Marketing in an AI-First World",
    category: "Performance Marketing",
    date: "OCT 28, 2024",
  },
  "seo-technical-foundations": {
    title: "Technical SEO: Building The Digital Signal",
    category: "SEO",
    date: "NOV 05, 2024",
  },
  "brand-identity-scale": {
    title: "Brand Identity That Moves: Designing For Scale",
    category: "Branding",
    date: "NOV 18, 2024",
  },
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const postData = POSTS_DATA[slug]
  // Generate title from slug if not found in data
  const title = postData?.title ?? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const category = postData?.category ?? "SEO & Architecture"
  const date = postData?.date ?? "NOV 05, 2024"

  // Get related posts (all posts except current)
  const relatedSlugs = Object.keys(POSTS_DATA).filter(s => s !== slug).slice(0, 3)

  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />
      
      <Navbar />
      
      <article className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6">
          
          {/* Meta Row */}
          <div className="flex items-center gap-4 mb-8 font-mono text-[10px] md:text-xs uppercase tracking-widest">
            <span className="text-[#5EC6FF] border border-[#5EC6FF]/30 bg-[#5EC6FF]/10 px-2 py-1 rounded">
              {category}
            </span>
            <span className="text-[rgba(255,255,255,0.5)]">{date}</span>
            <span className="text-[rgba(255,255,255,0.5)] hidden sm:inline">· 5 MIN READ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
            {title}
          </h1>

          {/* Hero Image Placeholder */}
          <div className="w-full aspect-video bg-[#171A1F] border border-[#343C43] rounded-xl mb-12 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="font-mono text-[#5EC6FF] text-xs tracking-[0.3em] relative z-10 glow-cyan">
              // VISUAL_DATA_MISSING
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-invert prose-lg max-w-none font-sans text-[rgba(255,255,255,0.8)] leading-relaxed">
            <p className="text-xl text-[rgba(255,255,255,0.9)] font-medium mb-8">
              Content is king, but infrastructure is the kingdom. If search engines can't crawl your digital architecture, your content doesn't exist.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-12 mb-6">The Foundations of Technical SEO</h2>
            <p className="mb-6">
              When we talk about growth systems, we're not just talking about ad spend and conversion rates. We're talking about the underlying architecture that supports everything else. Technical SEO is the foundation of that architecture.
            </p>
            <p className="mb-6">
              Unlike traditional marketing, which relies on rented attention, a solid technical foundation ensures that your owned assets compound in value over time.
            </p>

            <h3 className="text-xl font-display font-bold text-white mt-10 mb-4">1. Site Speed and Core Web Vitals</h3>
            <p className="mb-6">
              Every millisecond of latency is a leak in your funnel. We engineer for speed, utilizing modern frameworks like Next.js and React to deliver instantaneous experiences that Google rewards.
            </p>

            <h3 className="text-xl font-display font-bold text-white mt-10 mb-4">2. Crawlability and Indexation</h3>
            <p className="mb-6">
              Search engines are ruthless in their efficiency. If your site structure is messy, they will abandon the crawl. We build clean, logical hierarchies with XML sitemaps and optimized robots.txt files.
            </p>

            <blockquote className="border-l-2 border-[#5EC6FF] pl-6 my-10 italic text-[rgba(255,255,255,0.9)] bg-[#1D4ED8]/10 py-4 pr-4 rounded-r-lg">
              &quot;A brilliant campaign on a broken website is just an expensive way to frustrate users.&quot;
            </blockquote>

            <h2 className="text-2xl font-display font-bold text-white mt-12 mb-6">The Gromantra Approach</h2>
            <p className="mb-6">
              We treat your website as a living system. It requires continuous monitoring, optimization, and iteration. By combining technical SEO with performance marketing, we create a unified engine that captures intent and converts it into revenue.
            </p>
          </div>

          {/* Author / Back Link */}
          <div className="mt-16 pt-8 border-t border-[#343C43] flex items-center justify-between">
            <Link href="/blog" className="text-[#5EC6FF] font-mono text-xs uppercase tracking-widest hover:glow-cyan transition-all flex items-center gap-2">
              <span className="rotate-180 inline-block">→</span> Back to Transmissions
            </Link>
          </div>

        </div>
      </article>

      {/* Related Posts Section */}
      <section className="border-t border-[#343C43] bg-[#050508] py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-bold text-2xl text-white mb-10 uppercase">
            Related Transmissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedSlugs.map((relSlug) => {
              const post = POSTS_DATA[relSlug]
              return (
                <Link key={relSlug} href={`/blog/${relSlug}`} className="block group">
                  <div className="bg-[#171A1F] border border-[#343C43] rounded-xl p-6 transition-all duration-300 hover:border-[#5EC6FF]/50 hover:shadow-[0_0_20px_rgba(94,198,255,0.1)]">
                    <span className="font-mono text-[10px] text-[#5EC6FF] mb-3 block">{post.category.toUpperCase()}</span>
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-[#5EC6FF] transition-colors mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] line-clamp-2">
                      Read the full transmission to learn more about our approach.
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
