"use client"

import { useEffect, useRef, useState } from "react"

/* ═══════════════════════════════════════════════
   COLLABORATORS — "Frequencies We've Tuned"
   Dark marquee showing industries + capabilities.
   Two rows, opposite scroll directions.
   ═══════════════════════════════════════════════ */

const ROW_1 = [
  "FINTECH", "HEALTHTECH", "LOGISTICS", "ENTERTAINMENT", "EDTECH",
  "REAL ESTATE", "SAAS", "D2C", "FASHION", "CLIMATE TECH",
]

const ROW_2 = [
  "BRAND ARCHITECTURE", "MOTION IDENTITY", "GROWTH SYSTEMS",
  "DIGITAL CAMPAIGNS", "STRATEGY", "CONTENT SYSTEMS", "LAUNCH STRATEGY",
]

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: string[]
  direction: "left" | "right"
  speed: string
}) {
  const [isPaused, setIsPaused] = useState(false)
  // Duplicate items 4x for seamless loop
  const allItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className="relative overflow-hidden whitespace-nowrap py-4 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="inline-flex gap-0"
        style={{
          animation: `marquee-${direction} ${speed} linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {allItems.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="font-display font-extrabold uppercase transition-colors duration-200 cursor-default whitespace-nowrap"
              style={{
                fontSize: "clamp(1.2rem, 2vw, 2rem)",
                color: "rgba(255, 255, 255, 0.08)",
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = "#A0A0B0"
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = "rgba(255, 255, 255, 0.08)"
              }}
            >
              {item}
            </span>
            <span
              className="mx-6 text-[#5ec6ff] font-body-mono text-sm"
              style={{ opacity: 0.4 }}
            >
              ◈
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CollaboratorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#080810", padding: "80px 0" }}
    >
      {/* Section label */}
      <div
        className="flex items-center gap-3 mb-8"
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
          FREQUENCIES WE&apos;VE TUNED
        </span>
      </div>

      {/* Row 1 — scrolls left */}
      <MarqueeRow items={ROW_1} direction="left" speed="30s" />

      {/* Row 2 — scrolls right */}
      <MarqueeRow items={ROW_2} direction="right" speed="25s" />

      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
