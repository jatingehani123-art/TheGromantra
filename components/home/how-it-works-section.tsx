"use client"

import { useRef, useEffect } from "react"

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your account and set up your brand profile in minutes.",
  },
  {
    number: "02",
    title: "Connect Channels",
    description: "Link your social media accounts and marketing tools.",
  },
  {
    number: "03",
    title: "Launch Campaigns",
    description: "Create and manage campaigns with AI-powered insights.",
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".step").forEach((step, i) => {
            setTimeout(() => {
              step.classList.add("animate-fade-up")
            }, i * 200)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: "linear-gradient(to right, rgba(52, 60, 67, 0.15), rgba(29, 78, 216, 0.15))" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">How It Works</h2>
          <p className="text-gray-400 text-lg">Get started in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="step opacity-0 relative">
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-12 left-1/2 w-full h-1 -z-10"
                  style={{ background: "linear-gradient(to right, #1d4ed8, #5ec6ff, transparent)" }}
                />
              )}

              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg"
                  style={{ background: "var(--gradient-primary)", boxShadow: "rgba(94, 198, 255, 0.3) 0 0 20px" }}
                >
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
