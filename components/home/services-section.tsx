"use client"

import { useEffect, useRef, useState } from "react"

/* ═══════════════════════════════════════════════
   SERVICES — HORIZONTAL SCROLL NARRATIVE CHAMBER
   Services aren't listed. They're experienced one
   at a time, like walking through rooms.
   ═══════════════════════════════════════════════ */

const SERVICES = [
  {
    num: "01",
    name: "Brand Architecture",
    description: "Foundation systems that define market position.",
  },
  {
    num: "02",
    name: "Motion & Identity",
    description: "Visual language that moves and breathes.",
  },
  {
    num: "03",
    name: "Digital Campaigns",
    description: "Precision-targeted signals across channels.",
  },
  {
    num: "04",
    name: "Growth Systems",
    description: "Scalable engines built for compounding returns.",
  },
  {
    num: "05",
    name: "Strategy & Intelligence",
    description: "Data architecture that informs every decision.",
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isInView, setIsInView] = useState(false)

  // Track scroll progress through the tall section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const viewH = window.innerHeight
      // progress 0→1 as we scroll through the section
      const rawProgress = (-rect.top) / (sectionHeight - viewH)
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))
      setProgress(clampedProgress)

      // Check if section is in view at all
      if (rect.top < viewH && rect.bottom > 0) {
        setIsInView(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate translateX for the horizontal runner
  const roomWidth = typeof window !== "undefined" ? window.innerWidth : 1920
  const totalWidth = roomWidth * SERVICES.length
  const maxShift = totalWidth - roomWidth
  const translateX = -progress * maxShift

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* Section label — fixed during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header — top left corner */}
        <div
          className="absolute top-8 z-20 flex items-center gap-3"
          style={{
            left: "5vw",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="w-8 h-px bg-[#5ec6ff]" />
          <span
            className="font-body-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--gm-data)" }}
          >
            SERVICES
          </span>
        </div>

        {/* Progress indicator — top right */}
        <div
          className="absolute top-8 z-20 flex items-center gap-3"
          style={{ right: "5vw" }}
        >
          <span className="font-body-mono text-xs" style={{ color: "var(--gm-data)" }}>
            {String(Math.min(SERVICES.length, Math.floor(progress * SERVICES.length) + 1)).padStart(2, "0")}
          </span>
          <div className="w-24 h-px bg-[#343c43] relative">
            <div
              className="absolute inset-y-0 left-0 bg-[#5ec6ff]"
              style={{
                width: `${progress * 100}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <span className="font-body-mono text-xs" style={{ color: "var(--gm-data)" }}>
            {String(SERVICES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal runner — translateX driven by scroll */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${totalWidth}px`,
            transform: `translateX(${translateX}px)`,
            willChange: "transform",
          }}
        >
          {SERVICES.map((service, i) => {
            const isHovered = hoveredIndex === i
            return (
              <div
                key={i}
                className="relative flex-shrink-0 h-full flex items-center cursor-pointer"
                style={{
                  width: `${roomWidth}px`,
                  padding: "0 5vw",
                  borderRight: i < SERVICES.length - 1 ? "1px solid rgba(52, 60, 67, 0.3)" : "none",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Large background number */}
                <div
                  className="absolute font-display font-extrabold text-[#5ec6ff] select-none pointer-events-none"
                  style={{
                    fontSize: "25vw",
                    right: "10vw",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.04,
                    lineHeight: 1,
                  }}
                >
                  {service.num}
                </div>

                {/* Service content */}
                <div className="relative z-10 flex items-start gap-8">
                  {/* Vertical signal line */}
                  <div className="relative flex-shrink-0" style={{ width: "2px", minHeight: "120px" }}>
                    <div
                      className="absolute top-0 left-0 w-full bg-[#5ec6ff]"
                      style={{
                        height: isHovered ? "100%" : "40%",
                        transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col justify-center">
                    {/* Service number label */}
                    <span
                      className="font-body-mono text-xs tracking-[0.2em] mb-4"
                      style={{ color: "var(--gm-data)" }}
                    >
                      {service.num}
                    </span>

                    {/* Service name */}
                    <h3
                      className="font-display font-extrabold text-white uppercase tracking-tight leading-none mb-6"
                      style={{
                        fontSize: "clamp(2rem, 6vw, 6rem)",
                        transform: isHovered ? "translateX(8px)" : "translateX(0)",
                        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-body-mono text-sm max-w-xs"
                      style={{
                        color: "var(--gm-data)",
                        opacity: isHovered ? 1 : 0.6,
                        transform: isHovered ? "translateX(8px)" : "translateX(0)",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 50ms",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Room ambient glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse, rgba(29, 78, 216, 0.06), transparent)",
                    filter: "blur(60px)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#343c43]/40" />
      </div>
    </section>
  )
}
