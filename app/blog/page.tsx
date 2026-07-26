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
    slug: "high-conversion-web-engineering-inp-cac",
    title: "High-Conversion Web Engineering: How INP & Speed Control CAC",
    excerpt: "A slow page is an expensive page. Learn how optimizing INP, Core Web Vitals, and server-side rendering directly reduces Google & Meta ad costs while turning traffic into qualified pipeline.",
    date: "2025-02-18",
    category: "Web Development"
  },
  {
    slug: "server-side-data-architecture-paid-media",
    title: "Server-Side Data Architecture: Scaling Paid Media Beyond Cookies",
    excerpt: "Client-side pixel tracking is dead. Discover how server-to-server data pipelines and Conversions API (CAPI) feed AI bidding algorithms the first-party signals required to slash CPA.",
    date: "2025-02-02",
    category: "Performance Marketing"
  },
  {
    slug: "generative-engine-optimization-geo-playbook",
    title: "Generative Engine Optimization (GEO): The 2026 Playbook for AI Search",
    excerpt: "Search is no longer just blue links. Google AI Overviews, Perplexity, and ChatGPT now synthesize answers. Here is the technical playbook for engineering content that AI models trust and cite.",
    date: "2025-01-15",
    category: "SEO"
  },
  {
    slug: "brand-identity-scale",
    title: "Brand Identity That Moves: Designing For Scale",
    excerpt: "Static logos are dead. Modern brand identities must be kinetic, responsive, and designed specifically for digital ecosystems.",
    date: "2024-11-18",
    category: "Branding"
  },
  {
    slug: "seo-technical-foundations",
    title: "Technical SEO: Building The Digital Signal",
    excerpt: "Content is king, but infrastructure is the kingdom. If search engines can't crawl your digital architecture, your content doesn't exist.",
    date: "2024-11-05",
    category: "SEO"
  },
  {
    slug: "performance-marketing-2024",
    title: "Performance Marketing in an AI-First World",
    excerpt: "As ad platforms shift towards automated bidding and AI generation, the real edge is in data architecture and creative velocity.",
    date: "2024-10-28",
    category: "Performance Marketing"
  },
  {
    slug: "architecting-growth-systems",
    title: "Why You Need a Growth System, Not Just Campaigns",
    excerpt: "Campaigns turn off when you stop spending. Growth systems compound over time. Here's how to build the infrastructure that scales your brand indefinitely.",
    date: "2024-10-12",
    category: "Strategy & Systems"
  }
]

export default function BlogIndexPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />
      
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
