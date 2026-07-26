import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export async function generateStaticParams() {
  return [
    { slug: "case-study-1" },
    { slug: "case-study-2" },
    { slug: "case-study-3" },
  ]
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <Navbar />
      <div className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#5EC6FF] font-mono text-xs tracking-widest mb-6 uppercase">case study coming soon</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase tracking-wide mb-6">Coming Soon</h1>
          <p className="text-[rgba(255,255,255,0.6)] mb-12">This case study is being prepared. Contact us to hear about our results directly.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/case-studies" className="px-6 py-3 font-mono text-xs uppercase tracking-widest border border-[#343C43] text-[rgba(255,255,255,0.7)] hover:border-[#5EC6FF] hover:text-[#5EC6FF] transition-all">All Case Studies</Link>
            <Link href="/contact" className="px-6 py-3 font-mono text-xs uppercase tracking-widest border border-[#5EC6FF] text-[#5EC6FF] hover:bg-[#5EC6FF] hover:text-black transition-all">Contact Us</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}