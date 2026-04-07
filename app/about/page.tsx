"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-20 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-40"
                style={{ background: "radial-gradient(circle, rgba(29, 78, 216, 0.15), transparent)" }}
              />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 text-balance animate-fade-up">
              About MarketFlow
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              We're on a mission to empower startups with world-class digital marketing tools that were previously only
              available to enterprises.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="p-8 rounded-xl card-glass border border-[#343c43] hover:border-[#5ec6ff]/50 transition-all">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400">
                To democratize digital marketing by providing affordable, powerful tools that help startups compete with
                larger enterprises. We believe every startup deserves access to world-class marketing technology.
              </p>
            </div>

            <div className="p-8 rounded-xl card-glass border border-[#343c43] hover:border-[#5ec6ff]/50 transition-all">
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400">
                To become the most trusted marketing platform for ambitious startups globally. We envision a world where
                marketing excellence is accessible to everyone, regardless of their budget.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Customer First", description: "We put our customers at the heart of everything we do." },
                { title: "Innovation", description: "We constantly push the boundaries of what's possible." },
                { title: "Transparency", description: "Honest, open communication is fundamental to our culture." },
              ].map((value, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl gradient-accent border border-[#343c43] hover:border-[#5ec6ff]/50 transition-all"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Priya Sharma", role: "CEO & Founder" },
                { name: "Arjun Patel", role: "VP Product" },
                { name: "Sophie Turner", role: "VP Engineering" },
              ].map((member, i) => (
                <div key={i} className="text-center">
                  <img
                    src={`/professional-team.png?height=200&width=200&query=professional ${member.name}`}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
                    style={{ boxShadow: "rgba(94, 198, 255, 0.2) 0 0 20px" }}
                  />
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
