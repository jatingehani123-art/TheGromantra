"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Model3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[700px] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Spotlight gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(29, 78, 216, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div
          className="w-full h-[500px] rounded-xl overflow-hidden mb-8 border border-gray-800"
          style={{
            boxShadow: "0 0 40px rgba(29, 78, 216, 0.2), inset 0 0 40px rgba(94, 198, 255, 0.05)",
          }}
        >
          <iframe
            src="https://my.spline.design/robot-4iMc6NYNTNA8cCGwU2qkEH3O/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen
          />
        </div>

        <div className="text-center">
          <Link href="/contact">
            <button
              className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 relative group"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #5ec6ff 100%)",
              }}
            >
              <span className="relative z-10">Get Started Now</span>
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8 0%, #5ec6ff 100%)",
                }}
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
