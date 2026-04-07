"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import ServicesSection from "@/components/home/services-section"
import ProjectsSection from "@/components/home/projects-section"
import PricingSection from "@/components/home/pricing-section"
import TestimonialsSection from "@/components/home/testimonials-section"

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <ProjectsSection />
        <PricingSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </main>
  )
}
