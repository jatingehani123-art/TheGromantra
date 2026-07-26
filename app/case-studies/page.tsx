import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Case Studies | GROMANTRA",
  description: "Real growth results from GROMANTRA clients. Deep-dive case studies covering SEO, performance marketing, brand identity, and web development projects.",
  alternates: { canonical: "https://thegromantra.com/case-studies" },
}

// SCAFFOLD: Replace this array with real case study entries when content is ready
const CASE_STUDY_SLOTS = [
  { slug: "case-study-1", label: "Client Story 01", industry: "COMING SOON" },
  { slug: "case-study-2", label: "Client Story 02", industry: "COMING SOON" },
  { slug: "case-study-3", label: "Client Story 03", industry: "COMING SOON" },
]

export default function CaseStudiesPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />

      <Navbar />

      <div className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16">
            <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
              // CLIENT_MISSIONS
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide mb-6">
              Case Studies
            </h1>
            <p className="text-[rgba(255,255,255,0.6)] max-w-2xl text-lg">
              Real growth stories from real brands. Content coming soon - check back shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDY_SLOTS.map((item) => (
              <div
                key={item.slug}
                className="bg-[#171A1F] border border-dashed border-[#343C43] rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[220px] opacity-60"
              >
                <span className="font-mono text-[10px] tracking-widest text-[#5EC6FF] mb-3 uppercase">
                  {item.industry}
                </span>
                <h3 className="font-display font-bold text-white text-lg">{item.label}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[rgba(255,255,255,0.5)] font-mono text-sm mb-6">
              In the meantime, open a channel to discuss your growth objectives.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 font-display font-bold text-sm tracking-[0.15em] uppercase border-2 border-[#5ec6ff] text-[#5ec6ff] transition-all duration-300 hover:bg-[#5ec6ff] hover:text-black"
            >
              INITIATE CONTACT
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
