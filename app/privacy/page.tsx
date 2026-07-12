import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | GROMANTRA",
  description: "GROMANTRA privacy policy. How we collect, use, and protect your personal information.",
  alternates: { canonical: "https://thegromantra.com/privacy-policy" },
}

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
            // LEGAL
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase tracking-wide mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-[rgba(255,255,255,0.8)] leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>When you use our contact forms, we collect your name, email address, company name, and any message content you submit. We do not use cookies for tracking purposes beyond essential site functionality.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p>We use the information you provide solely to respond to your inquiries, communicate about our services, and improve our website experience. We do not sell, rent, or trade your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">3. Data Storage & Security</h2>
              <p>Your data is stored securely using industry-standard encryption and security practices. We retain your contact information only for as long as necessary to fulfill the purposes for which it was collected.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p>Our website uses Vercel Analytics for anonymous usage statistics. We may also use third-party services for form submissions. These services have their own privacy policies governing their use of your data.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">5. Your Rights</h2>
              <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, contact us at <a href="mailto:gromantra0957@gmail.com" className="text-[#5EC6FF] hover:underline">gromantra0957@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white mb-3">6. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
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
