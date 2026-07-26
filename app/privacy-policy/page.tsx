import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | GROMANTRA",
  description: "Privacy Policy and data protection details for GROMANTRA's digital growth ecosystems.",
  alternates: { canonical: "https://thegromantra.com/privacy-policy" },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />
      
      <Navbar />
      
      <div className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 select-text">
          <p className="text-[#5EC6FF] font-mono text-xs tracking-widest mb-4 uppercase">
            // DOCUMENT_TYPE: LEGAL_NOTICE
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase tracking-wide mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-[rgba(255,255,255,0.75)] font-sans space-y-8 leading-relaxed">
            <p className="text-xs font-mono text-[#5EC6FF]/70">
              LAST MODIFIED: JULY 5, 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                1. System Overview & Scope
              </h2>
              <p>
                This document outlines the privacy protocols implemented by GROMANTRA (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). It governs how we collect, process, and secure user information transmitted via our signal systems and site vectors at thegromantra.com.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                2. Information Processing Vectors
              </h2>
              <p>
                We capture minimal client vector data when you open communications channels with us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Inputs:</strong> Name, Email, and Company details provided voluntarily during form submissions.</li>
                <li><strong>Network Logs:</strong> IP address, device telemetry, browser information, and traffic timestamps for threat protection and performance diagnostics.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                3. Purpose of Processing
              </h2>
              <p>
                Captured telemetry and transmission data are used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to submitted briefs and schedule project connection calls.</li>
                <li>Audit and optimize custom client acquisition campaigns.</li>
                <li>Maintain system integrity, monitor network health, and protect GROMANTRA assets.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                4. Data Transmission & Third-Party Services
              </h2>
              <p>
                We do not sell client data. Information is routed via secure channels to authorized system endpoints:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Formspree:</strong> Form vectors are securely relayed via Formspree for automated delivery to operators.</li>
                <li><strong>Vercel Analytics:</strong> Anonymous usage patterns are evaluated via Vercel to optimize web application speeds.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                5. Security Protocols
              </h2>
              <p>
                Our server configurations employ industry-standard encryption protocols (SSL/TLS) for data in transit. Information storage arrays are protected by access permissions restricted strictly to operations leaders.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider">
                6. Contact Information
              </h2>
              <p>
                For data erasure requests or clarifications on data vectors, contact our system architect directly at: <a href="mailto:gromantra0957@gmail.com" className="text-[#5EC6FF] hover:underline">gromantra0957@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
