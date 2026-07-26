import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | GROMANTRA",
  description: "Transparent pricing for GROMANTRA growth systems. Custom retainers and project-based engagements. Details coming soon.",
  alternates: { canonical: "https://thegromantra.com/pricing" },
}

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <Navbar />
      <div className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#5EC6FF] font-mono text-xs tracking-widest mb-6 uppercase">
            // PRICING_TIERS: LOADING...
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide mb-6">
            Request a Quote
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] max-w-xl mx-auto text-lg mb-12">
            Every engagement is scoped to your specific growth objectives. Pricing tiers are being configured
            {/* TODO: Replace with real pricing tiers when supplied by Jatin */}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {["Starter Signal", "Growth Engine", "Full Architecture"].map((tier) => (
              <div key={tier} className="bg-[#171A1F] border border-dashed border-[#343C43] rounded-xl p-8 text-center opacity-60 min-h-[260px] flex flex-col items-center justify-center">
                <span className="font-mono text-[10px] tracking-widest text-[#5EC6FF] mb-3 uppercase">COMING SOON</span>
                <h3 className="font-display font-bold text-white text-xl">{tier}</h3>
              </div>
            ))}
          </div>
          <p className="text-[rgba(255,255,255,0.5)] font-mono text-sm mb-6">
            Ready to move now? Submit a brief and get a custom proposal within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 font-display font-bold text-sm tracking-[0.15em] uppercase border-2 border-[#5ec6ff] text-[#5ec6ff] transition-all duration-300 hover:bg-[#5ec6ff] hover:text-black"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
