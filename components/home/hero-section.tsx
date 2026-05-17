"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"

const SERVICES_TICKER = [
  "BRAND ARCHITECTURE",
  "MOTION & IDENTITY",
  "DIGITAL CAMPAIGNS",
  "GROWTH SYSTEMS",
  "STRATEGY & INTELLIGENCE",
  "SIGNAL DESIGN",
  "PERFORMANCE ANALYTICS",
  "CONTENT SYSTEMS",
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  // Trigger reveal animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Cursor tracking for glow + robot parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    setOffsetX((e.clientX - centerX) * 0.03)
    setOffsetY((e.clientY - centerY) * 0.03)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-black pt-24 pb-0"
      style={{ overflow: "visible" }}
    >
      {/* Layer 0: Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ overflow: "hidden" }}>
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
          style={{ background: "radial-gradient(circle, #1d4ed8, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
          style={{ background: "radial-gradient(circle, #5ec6ff, transparent)" }}
        />
      </div>

      {/* Layer 1: Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Main content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ padding: "0 5vw" }}
      >
        {/* Text Content - Left Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0 z-20">
          {/* Label badge */}
          <div
            className={`inline-block mb-6 transition-all ${isLoaded ? "clip-reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="font-body-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border border-[#5ec6ff]/30 rounded-full inline-block"
              style={{ color: "var(--gm-data)", background: "rgba(29, 78, 216, 0.08)" }}
            >
              ● SIGNAL ACTIVE — EST. 2021
            </span>
          </div>

          {/* Main Heading — clip-path reveal per line */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white mb-6 leading-[0.95] tracking-tight">
            <span
              className={`block ${isLoaded ? "clip-reveal-up stagger-1" : "opacity-0"}`}
            >
              Marketing
            </span>
            <span
              className={`block ${isLoaded ? "clip-reveal-up stagger-2" : "opacity-0"}`}
            >
              Excellence
            </span>
            <span
              className={`block text-transparent bg-clip-text ${isLoaded ? "clip-reveal-up stagger-3" : "opacity-0"}`}
              style={{
                backgroundImage: "linear-gradient(to right, #1d4ed8, #5ec6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <span className="font-serif-accent italic font-normal">for</span>{" "}
              Ambitious Brands
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`font-body-mono text-sm sm:text-base mb-10 max-w-md mx-auto md:mx-0 leading-relaxed ${isLoaded ? "clip-reveal-up stagger-4" : "opacity-0"}`}
            style={{ color: "var(--gm-data)" }}
          >
            All-in-one signal architecture for digital marketing strategy, brand identity systems, and performance tracking.
          </p>

          {/* CTA Button — border only, fills on hover */}
          <div className={`flex ${isLoaded ? "clip-reveal-up stagger-5" : "opacity-0"}`}>
            <Link
              href="/contact"
              className="group relative px-8 py-4 font-display font-bold text-sm tracking-[0.15em] uppercase border-2 border-[#5ec6ff] text-[#5ec6ff] rounded-none transition-all duration-300 hover:bg-[#5ec6ff] hover:text-black hover:shadow-[0_0_30px_rgba(94,198,255,0.4)]"
            >
              <span className="relative z-10">INITIATE CONTACT</span>
            </Link>
          </div>
        </div>

        {/* 3D Robot — isolated stacking layer, NO overflow clipping */}
        <div
          className={`w-full md:w-1/2 h-[450px] sm:h-[500px] md:h-[650px] z-10 ${isLoaded ? "clip-reveal-up stagger-3" : "opacity-0"}`}
          style={{
            position: "relative",
            isolation: "isolate",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-V1H5uECOTWm6TowfLYpNhmWu/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{ border: "none", display: "block", background: "transparent" }}
              title="Gromantra 3D Robot"
            />
          </div>
        </div>
      </div>

      {/* Bottom ticker — horizontal scrolling service list */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#343c43]/40"
        style={{ overflow: "hidden" }}
      >
        <div className="ticker-track flex whitespace-nowrap py-3">
          {[...SERVICES_TICKER, ...SERVICES_TICKER].map((service, i) => (
            <span
              key={i}
              className="font-body-mono text-xs tracking-[0.15em] uppercase mx-8"
              style={{ color: "var(--gm-data)", opacity: 0.6 }}
            >
              {service}
              <span className="mx-8 text-[#5ec6ff]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
