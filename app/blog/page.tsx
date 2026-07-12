import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogIndexClient from "@/components/blog/blog-index-client"

export const metadata: Metadata = {
  title: "GROMANTRA Transmissions | Growth Strategy & SEO Blog",
  description: "Insights on technical SEO, brand identity, performance marketing, and automated growth systems by Jatin Gehani.",
  keywords: ["technical SEO blog", "growth marketing strategies", "performance marketing", "Jatin Gehani articles"],
  alternates: { canonical: "https://thegromantra.com/blog" },
}

const POSTS = [
  {
    slug: "architecting-growth-systems",
    title: "Why You Need a Growth System, Not Just Campaigns",
    excerpt: "Campaigns turn off when you stop spending. Growth systems compound over time. Here's how to build the infrastructure that scales your brand indefinitely.",
    date: "2024-10-12",
    category: "Strategy & Systems"
  },
  {
    slug: "performance-marketing-2024",
    title: "Performance Marketing in an AI-First World",
    excerpt: "As ad platforms shift towards automated bidding and AI generation, the real edge is in data architecture and creative velocity.",
    date: "2024-10-28",
    category: "Performance Marketing"
  },
  {
    slug: "seo-technical-foundations",
    title: "Technical SEO: Building The Digital Signal",
    excerpt: "Content is king, but infrastructure is the kingdom. If search engines can't crawl your digital architecture, your content doesn't exist.",
    date: "2024-11-05",
    category: "SEO"
  },
  {
    slug: "brand-identity-scale",
    title: "Brand Identity That Moves: Designing For Scale",
    excerpt: "Static logos are dead. Modern brand identities must be kinetic, responsive, and designed specifically for digital ecosystems.",
    date: "2024-11-18",
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

          <BlogIndexClient posts={POSTS} />

        </div>
      </div>
      <Footer />
    </main>
  )
}
