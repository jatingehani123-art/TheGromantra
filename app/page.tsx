"use client"

import { useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
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
   00. Loading Screen (overlay)
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
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <main
        className="bg-black min-h-screen"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
        }}
      >
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
