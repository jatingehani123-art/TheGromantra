"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"

/* ═══════════════════════════════════════════════
   THE FREQUENCY LAB
   Interactive frequency visualizer. Each service
   is a wave. Hover to "tune in." Replaces Signal Board.
   ═══════════════════════════════════════════════ */

const CHANNELS = [
  { id: "brand", label: "BRAND", freq: 2, desc: "Architecture" },
  { id: "motion", label: "MOTION", freq: 3, desc: "Identity" },
  { id: "campaigns", label: "CAMPAIGNS", freq: 4, desc: "Digital" },
  { id: "growth", label: "GROWTH", freq: 2.5, desc: "Systems" },
  { id: "strategy", label: "STRATEGY", freq: 1.5, desc: "Intelligence" },
]

const STATS = [
  { label: "ACTIVE BRANDS", value: 38 },
  { label: "AVG. SIGNAL STRENGTH", value: 94, suffix: "%" },
  { label: "UPTIME", value: "4Y 2M", isText: true },
]

function generateWavePath(
  amplitude: number,
  frequency: number,
  phase: number,
  width: number,
  centerY: number
) {
  let d = `M 0 ${centerY}`
  for (let x = 0; x <= width; x += 3) {
    const y =
      centerY +
      amplitude * Math.sin((x / width) * Math.PI * 2 * frequency + phase)
    d += ` L ${x} ${y}`
  }
  return d
}

function useCountUp(target: number, duration: number, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const startTime = performance.now()
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(animate)
      else setCount(target)
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return count
}

export default function SignalBoardSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [phase, setPhase] = useState(0)
  const [amplitudes, setAmplitudes] = useState<Record<string, number>>(
    Object.fromEntries(CHANNELS.map((c) => [c.id, 0]))
  )
  const targetAmplitudes = useRef<Record<string, number>>(
    Object.fromEntries(CHANNELS.map((c) => [c.id, 0]))
  )

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Set target amplitudes based on hover
  useEffect(() => {
    CHANNELS.forEach((c) => {
      targetAmplitudes.current[c.id] =
        activeChannel === null ? 8 : activeChannel === c.id ? 40 : 3
    })
  }, [activeChannel])

  // Animate phase + lerp amplitudes
  useEffect(() => {
    let raf: number
    const animate = () => {
      setPhase((p) => p + 0.03)
      setAmplitudes((prev) => {
        const next = { ...prev }
        CHANNELS.forEach((c) => {
          next[c.id] += (targetAmplitudes.current[c.id] - next[c.id]) * 0.12
        })
        return next
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const svgWidth = typeof window !== "undefined" ? window.innerWidth : 1920
  const svgHeight = 300
  const channelSpacing = svgHeight / (CHANNELS.length + 1)

  const stat1 = useCountUp(STATS[0].value as number, 1200, isVisible)
  const stat2 = useCountUp(STATS[1].value as number, 1200, isVisible)

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ padding: "160px 0" }}
    >
      {/* Section label */}
      <div
        className="flex items-center gap-3 mb-16"
        style={{
          paddingLeft: "5vw",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="w-8 h-px bg-[#5ec6ff]" />
        <span
          className="font-body-mono text-[10px] tracking-[0.4em] uppercase"
          style={{ color: "var(--gm-data)" }}
        >
          THE FREQUENCY LAB
        </span>
      </div>

      {/* Headline */}
      <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }} className="mb-16">
        <h2 className="font-display font-extrabold text-white tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
          <span
            className="block"
            style={{
              opacity: isVisible ? 1 : 0,
              clipPath: isVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            Every brand has a frequency.
          </span>
          <span
            className="block text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #1d4ed8, #5ec6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: isVisible ? 1 : 0,
              clipPath: isVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 250ms",
            }}
          >
            Most are broadcasting static.
          </span>
        </h2>
      </div>

      {/* Oscilloscope baseline */}
      <div className="relative w-full" style={{ height: `${svgHeight}px` }}>
        {/* Center baseline */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "50%",
            height: "1px",
            background: "rgba(94, 198, 255, 0.15)",
          }}
        />

        {/* Waves SVG */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          {CHANNELS.map((channel, i) => {
            const centerY = channelSpacing * (i + 1)
            const isActive = activeChannel === channel.id
            const amp = amplitudes[channel.id] || 0
            const path = generateWavePath(
              amp,
              channel.freq,
              phase,
              svgWidth,
              centerY
            )
            return (
              <path
                key={channel.id}
                d={path}
                fill="none"
                stroke={isActive ? "#5ec6ff" : "#1d4ed8"}
                strokeWidth={isActive ? 2 : 1}
                opacity={
                  activeChannel === null
                    ? 0.4
                    : isActive
                    ? 1
                    : 0.15
                }
                style={{ transition: "opacity 0.3s ease, stroke 0.3s ease" }}
              />
            )
          })}
        </svg>
      </div>

      {/* Channel labels */}
      <div
        className="flex items-center justify-center gap-8 sm:gap-12 mt-8"
        style={{ padding: "0 5vw" }}
      >
        {CHANNELS.map((channel) => {
          const isActive = activeChannel === channel.id
          return (
            <button
              key={channel.id}
              className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none outline-none group"
              onMouseEnter={() => setActiveChannel(channel.id)}
              onMouseLeave={() => setActiveChannel(null)}
              onClick={() =>
                setActiveChannel((prev) =>
                  prev === channel.id ? null : channel.id
                )
              }
            >
              <span
                className="font-body-mono text-[11px] uppercase transition-all duration-300"
                style={{
                  color: isActive ? "#5ec6ff" : "var(--gm-data)",
                  letterSpacing: isActive ? "0.5em" : "0.2em",
                }}
              >
                {channel.label}
              </span>
              <span
                className="font-body-mono text-[9px] uppercase transition-colors duration-300"
                style={{ color: isActive ? "#5ec6ff" : "transparent" }}
              >
                {channel.desc}
              </span>
            </button>
          )
        })}
      </div>

      {/* Data readouts */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-16" style={{ padding: "0 5vw" }}>
        {[
          { label: "ACTIVE BRANDS", display: String(stat1) },
          { label: "AVG. SIGNAL STRENGTH", display: `${stat2}%` },
          { label: "UPTIME", display: "4Y 2M" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="px-6 py-3 font-body-mono text-xs"
            style={{
              border: "1px solid rgba(94, 198, 255, 0.15)",
              color: "var(--gm-data)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${600 + i * 100}ms`,
            }}
          >
            <span style={{ opacity: 0.6 }}>{stat.label}: </span>
            <span className="text-white font-bold">{stat.display}</span>
          </div>
        ))}
      </div>

      {/* Full-width CTA band */}
      <Link href="/contact" className="block mt-20 group relative overflow-hidden">
        <div
          className="py-12 sm:py-16 flex flex-col items-center justify-center transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #5ec6ff)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 900ms",
          }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3
            className="font-display text-3xl sm:text-4xl md:text-[5vw] font-extrabold text-black leading-none tracking-tight relative z-10 text-center"
            style={{ padding: "0 5vw" }}
          >
            READY TO TRANSMIT?
          </h3>
          <p className="font-body-mono text-xs sm:text-sm text-black/60 mt-4 tracking-[0.15em] uppercase relative z-10">
            Response within 24h.
          </p>
        </div>
      </Link>
    </section>
  )
}
