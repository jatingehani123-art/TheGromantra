"use client"

import { useEffect, useRef, useState } from "react"

/* ═══════════════════════════════════════════════
   ABOUT / IDENTITY MANIFESTO SECTION
   Enhanced with scroll-driven animations:
   - Parallax numeral with translate + opacity
   - Headline lines slide from staggered directions
   - Stats scale up with spring-like easing
   - Divider draws itself on scroll
   - Paragraphs reveal word-by-word feel
   ═══════════════════════════════════════════════ */

interface StatItem {
  value: number
  suffix: string
  label: string
}

const STATS: StatItem[] = [
  { value: 127, suffix: "+", label: "brands transformed" },
  { value: 340, suffix: "%", label: "avg. growth delivered" },
  { value: 14, suffix: "", label: "active campaigns" },
]

function useCountUp(target: number, duration: number, isVisible: boolean) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return count
}

function StatCounter({ stat, isVisible, index }: { stat: StatItem; isVisible: boolean; index: number }) {
  const count = useCountUp(stat.value, 1200, isVisible)
  const delay = 600 + index * 120

  return (
    <div
      className="flex flex-col"
      style={{
        opacity: isVisible ? 1 : 0,
        clipPath: isVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <span className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none">
        {count}
        <span className="text-[#5ec6ff]">{stat.suffix}</span>
      </span>
      <span
        className="font-body-mono text-xs tracking-[0.15em] uppercase mt-2"
        style={{ color: "var(--gm-data)" }}
      >
        {stat.label}
      </span>
    </div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // IntersectionObserver for triggering entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15, rootMargin: "-50px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Continuous scroll progress for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewH = window.innerHeight
      // 0 = section just entered bottom, 1 = section exited top
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Derived parallax values from scroll progress
  const numeralOpacity = scrollProgress * 0.08
  const numeralY = (0.5 - scrollProgress) * 80 // moves 80px range
  const numeralScale = 0.95 + scrollProgress * 0.1

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ padding: "160px 5vw" }}
    >
      {/* Large decorative "01" numeral — parallax driven by scroll */}
      <div
        className="absolute font-display font-extrabold text-[#5ec6ff] select-none pointer-events-none"
        style={{
          fontSize: "18vw",
          left: "-5vw",
          top: "50%",
          opacity: numeralOpacity,
          transform: `translateY(calc(-50% + ${numeralY}px)) scale(${numeralScale})`,
          lineHeight: 1,
          willChange: "transform, opacity",
        }}
      >
        01
      </div>

      {/* Floating accent line — parallax, moves opposite to numeral */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "2px",
          height: "200px",
          background: "linear-gradient(to bottom, transparent, #5ec6ff, transparent)",
          left: "12vw",
          top: "30%",
          opacity: scrollProgress * 0.4,
          transform: `translateY(${-numeralY * 0.6}px)`,
          willChange: "transform, opacity",
        }}
      />

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left column — 40% */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            {/* Entity label */}
            <div
              className="mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0ms",
              }}
            >
              <span
                className="font-body-mono text-[10px] tracking-[0.3em] uppercase inline-flex items-center gap-3"
                style={{ color: "var(--gm-data)" }}
              >
                <span
                  className="inline-block w-8 h-px bg-[#5ec6ff]"
                  style={{
                    transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
                  }}
                />
                ENTITY
              </span>
            </div>

            {/* Manifesto headline — 3 lines, each with unique entrance */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.05] tracking-tight">
              {/* Line 1: slides from left with clip */}
              <span
                className="block overflow-hidden"
              >
                <span
                  className="block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0) translateX(0)" : "translateY(100%) translateX(-10px)",
                    transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 100ms",
                  }}
                >
                  We don&rsquo;t make
                </span>
              </span>

              {/* Line 2: slides from bottom */}
              <span
                className="block overflow-hidden"
              >
                <span
                  className="block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(100%)",
                    transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 220ms",
                  }}
                >
                  campaigns.{" "}
                  <span className="font-serif-accent italic font-normal text-[#5ec6ff]">We</span>
                </span>
              </span>

              {/* Line 3: gradient text, slides from bottom with scale */}
              <span
                className="block overflow-hidden"
              >
                <span
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(to right, #1d4ed8, #5ec6ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0) scale(1)" : "translateY(100%) scale(0.95)",
                    transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 340ms",
                  }}
                >
                  architect signals.
                </span>
              </span>
            </h2>
          </div>

          {/* Right column — 60% */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center">
            {/* Paragraphs — staggered reveal with subtle slide */}
            <div className="space-y-6 mb-12">
              <p
                className="font-body-mono text-sm leading-relaxed max-w-lg"
                style={{
                  color: "var(--gm-data)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) translateX(0)" : "translateY(20px) translateX(10px)",
                  filter: isVisible ? "blur(0px)" : "blur(4px)",
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
                }}
              >
                Gromantra builds signal systems that cut through noise. We operate at the intersection of brand architecture, 
                data-driven growth, and cinematic identity design.
              </p>
              <p
                className="font-body-mono text-sm leading-relaxed max-w-lg"
                style={{
                  color: "var(--gm-data)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) translateX(0)" : "translateY(20px) translateX(10px)",
                  filter: isVisible ? "blur(0px)" : "blur(4px)",
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 440ms",
                }}
              >
                Every brand we touch leaves with a system — not a deliverable. 
                Precision-engineered campaigns that compound, not decay.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-12 sm:gap-16 mb-12">
              {STATS.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  stat={stat}
                  isVisible={isVisible}
                  index={i}
                />
              ))}
            </div>

            {/* Divider line — draws itself from left to right */}
            <div
              className="h-px w-[60%]"
              style={{
                background: "linear-gradient(to right, #5ec6ff, #1d4ed8, transparent)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 900ms, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 900ms",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom ambient glow — fades in with scroll */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(29, 78, 216, 0.08), transparent)",
          filter: "blur(80px)",
          opacity: scrollProgress * 0.8,
        }}
      />
    </section>
  )
}
