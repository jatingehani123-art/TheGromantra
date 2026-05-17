"use client"

import { useEffect, useRef, useState } from "react"

/* ═══════════════════════════════════════════════
   DISTORTION CLOCK
   Full-screen live clock with glitch effect.
   Pure tension builder — no CTA, just urgency.
   ═══════════════════════════════════════════════ */

export default function DistortionClockSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [text2Visible, setText2Visible] = useState(false)

  // Update clock every second
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  // Glitch every 7 seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 400)
    }, 7000)
    return () => clearInterval(glitchInterval)
  }, [])

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setTextVisible(true), 1000)
          setTimeout(() => setText2Visible(true), 1500)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black flex items-center justify-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Top-right corner info */}
      <div
        className="absolute top-8 flex flex-col items-end gap-1"
        style={{
          right: "5vw",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.6s ease 600ms",
        }}
      >
        <span className="font-body-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--gm-data)" }}>
          LOCAL: INDIA
        </span>
        <span className="font-body-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 text-[#5ec6ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ec6ff] signal-pulse" />
          SIGNAL: LIVE
        </span>
      </div>

      {/* Center content */}
      <div className="text-center relative z-10">
        {/* The massive clock */}
        <div
          className={`font-display font-extrabold text-[#5ec6ff] leading-none select-none ${
            isGlitching ? "glitch-active" : ""
          }`}
          style={{
            fontSize: "clamp(3rem, 18vw, 15rem)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            textShadow: isGlitching ? "4px 0 #1d4ed8, -4px 0 #5ec6ff" : "none",
          }}
        >
          {time}
        </div>

        {/* Text line 1 */}
        <p
          className="font-body-mono text-sm mt-8 max-w-lg mx-auto"
          style={{
            color: "var(--gm-data)",
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Right now, your competitors are being seen.
        </p>

        {/* Text line 2 */}
        <p
          className="font-body-mono text-sm mt-3"
          style={{
            color: "#5ec6ff",
            opacity: text2Visible ? 1 : 0,
            transform: text2Visible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Are you transmitting?
        </p>
      </div>

      {/* Glitch CSS */}
      <style jsx>{`
        .glitch-active {
          animation: clockGlitch 0.4s steps(4) forwards;
        }
        @keyframes clockGlitch {
          0% { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-4px, 2px); clip-path: inset(30% 0 40% 0); }
          40% { transform: translate(4px, -2px); clip-path: inset(60% 0 10% 0); }
          60% { transform: translate(-2px, 0); clip-path: inset(10% 0 70% 0); }
          100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </section>
  )
}
