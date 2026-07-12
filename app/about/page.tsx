import type { Metadata } from "next"
import { HeroScene } from "@/components/about/HeroScene"
import { TerminalIntro } from "@/components/about/TerminalIntro"
import { OriginTimeline } from "@/components/about/OriginTimeline"
import { OperatorSection } from "@/components/about/OperatorSection"
import { NeuralNetwork } from "@/components/about/NeuralNetwork"
import { ValuesCubes } from "@/components/about/ValuesCubes"
import { WhyGromantra } from "@/components/about/WhyGromantra"
import { FinalCTA } from "@/components/about/FinalCTA"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Jatin Gehani & GROMANTRA | Digital Signal Architecture",
  description: "Learn about GROMANTRA's solo operator model founded by Jatin Gehani. High-performance engineering, automated technical SEO, and data-driven ad systems.",
  keywords: ["Jatin Gehani", "GROMANTRA founder", "digital marketing consultant", "growth engineering", "solo operator marketing"],
  alternates: { canonical: "https://thegromantra.com/about" },
}

export default function AboutPage() {
  return (
    <main className="bg-[#0F1115] min-h-screen selection:bg-[#5EC6FF]/30 selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {/* 1. Hero - Boot Sequence & Growth Graph */}
      <HeroScene />
      
      {/* 2. Introduction - Terminal SEO Log */}
      <TerminalIntro />
      
      {/* 3. The Origin - Interactive Growth Timeline */}
      <OriginTimeline />
      
      {/* 4. The Operator - Founder Holo-Deck */}
      <OperatorSection />
      
      {/* 5. The Engine - Capability Network */}
      <NeuralNetwork />
      
      {/* 6. Core Directives - 3D Values Cubes */}
      <ValuesCubes />
      
      {/* 7. Why Gromantra - VS Duel Arena */}
      <WhyGromantra />
      
      {/* 8. Final CTA - Launch Sequence */}
      <FinalCTA />
      
      <Footer />
    </main>
  )
}
