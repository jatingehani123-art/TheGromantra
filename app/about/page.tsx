import { HeroScene } from "@/components/about/HeroScene"
import { TerminalIntro } from "@/components/about/TerminalIntro"
import { OperatorSection } from "@/components/about/OperatorSection"
import { NeuralNetwork } from "@/components/about/NeuralNetwork"
import { WhyGromantra } from "@/components/about/WhyGromantra"
import { FinalCTA } from "@/components/about/FinalCTA"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="bg-[#0F1115] min-h-screen selection:bg-[#5EC6FF]/30 selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {/* 1. Hero - Boot Sequence & Growth Graph */}
      <HeroScene />
      
      {/* 2. Introduction - Terminal SEO Log */}
      <TerminalIntro />
      
      {/* 3. The Operator - Founder Holo-Deck */}
      <OperatorSection />
      
      {/* 4. The Engine - Capability Network */}
      <NeuralNetwork />
      
      {/* 5. Why Gromantra - VS Duel Arena */}
      <WhyGromantra />
      
      {/* 6. Final CTA - Launch Sequence */}
      <FinalCTA />
      
      <Footer />
    </main>
  )
}
