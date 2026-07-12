import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | GROMANTRA",
  description: "GROMANTRA terms of service. Rules and conditions governing use of our website and services.",
  alternates: { canonical: "https://thegromantra.com/terms" },
}

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
            // LEGAL
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase tracking-wide mb-12">
            Terms of Service
          </h1>

          <div className="space-y-8 text-[rgba(255,255,255,0.8)] leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the GROMANTRA website (thegromantra.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our website or services.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">2. Services</h2>
              <p>GROMANTRA provides digital marketing services including SEO, social media management, web development, performance marketing, and branding. The specific scope of services will be defined in individual client agreements.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of GROMANTRA and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written consent.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
              <p>GROMANTRA shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">5. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in the relevant Indian jurisdiction.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">6. Contact</h2>
              <p>For any questions regarding these terms, contact us at <a href="mailto:gromantra0957@gmail.com" className="text-[#5EC6FF] hover:underline">gromantra0957@gmail.com</a>.</p>
            </section>

            <p className="text-sm" style={{ color: "var(--gm-data)" }}>
              Last updated: July 2026
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
