"use client"

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
          <FeaturesSection />
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
