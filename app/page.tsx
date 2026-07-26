import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import ServicesSection from "@/components/home/services-section"
import DistortionClockSection from "@/components/home/distortion-clock-section"
import SignalBoardSection from "@/components/home/signal-board-section"
import CollaboratorsSection from "@/components/home/collaborators-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import TheBriefSection from "@/components/home/the-brief-section"

export const metadata: Metadata = {
  title: "GROMANTRA — Top Digital Marketing & SEO Agency in Udaipur, Rajasthan",
  description: "GROMANTRA is a premier digital marketing agency based in Udaipur, Rajasthan. We engineer high-performance technical SEO, Meta & Google ad campaigns, custom web development, and brand growth systems. Founded by Jatin Gehani.",
  keywords: ["digital marketing agency Udaipur", "SEO company in Udaipur", "digital marketing services Rajasthan", "best marketing agency Udaipur", "web development company Udaipur", "PPC agency Rajasthan", "growth marketing India"],
  alternates: { canonical: "https://thegromantra.com" },
}

/* ═══════════════════════════════════════════════
   SECTION ORDER:
   01. Hero
   02. Manifesto (FeaturesSection)
   03. Services (Horizontal Scroll)
   04. Distortion Clock
   05. Frequency Lab (SignalBoardSection)
   06. Collaborators
   07. Testimonials
   08. The Brief
   09. Footer (untouched)
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <main className="bg-black min-h-screen">
        <Navbar />
        <div className="pt-16">
          <HeroSection />
          <div id="features">
            <FeaturesSection />
          </div>
          <ServicesSection />
          <DistortionClockSection />
          <SignalBoardSection />
          <CollaboratorsSection />
          <TestimonialsSection />
          <TheBriefSection />
        </div>
        <Footer />
      </main>
    </>
  )
}
