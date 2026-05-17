"use client"

import { useState, useRef, useEffect } from "react"

/* ═══════════════════════════════════════════════
   THE BRIEF — Contact intake as a creative terminal.
   Not a form. A mission report filing station.
   ═══════════════════════════════════════════════ */

const TIMELINE_OPTIONS = [
  "Select timeline",
  "ASAP — within 2 weeks",
  "This quarter",
  "Next quarter",
  "Exploratory — no rush",
]

export default function TheBriefSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    building: "",
    timeline: "",
    email: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formState !== "idle") return
    setFormState("sending")
    setTimeout(() => {
      setFormState("sent")
    }, 800)
  }

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(94, 198, 255, 0.15)",
    color: "white",
    fontFamily: "'Space Mono', monospace",
    fontSize: "16px",
    padding: "12px 0",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  }

  const focusStyle = {
    borderBottom: "1px solid #5ec6ff",
    boxShadow: "0 4px 12px rgba(94, 198, 255, 0.1)",
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{
        padding: "160px 5vw",
        borderLeft: "3px solid #5ec6ff",
      }}
    >
      {/* Large decorative "?" / "!" */}
      <div className="absolute top-1/4 pointer-events-none select-none" style={{ right: "5vw" }}>
        <span
          className="font-display font-extrabold text-[#5ec6ff] block"
          style={{
            fontSize: "25vw",
            opacity: 0.04,
            lineHeight: 1,
            transition: "opacity 0.5s ease",
          }}
        >
          {formState === "sent" ? "!" : "?"}
        </span>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Section label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="w-8 h-px bg-[#5ec6ff]" />
          <span
            className="font-body-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#5ec6ff" }}
          >
            FILE A BRIEF
          </span>
        </div>

        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms",
          }}
        >
          Tell us about your signal.
        </h2>

        {formState === "sent" ? (
          /* Success state */
          <div
            className="py-16"
            style={{
              animation: "fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <p className="font-display text-3xl font-extrabold text-[#5ec6ff] mb-4">
              SIGNAL RECEIVED ✓
            </p>
            <p className="font-body-mono text-sm" style={{ color: "var(--gm-data)" }}>
              We&rsquo;ll be in touch within 24h.
            </p>
          </div>
        ) : (
          /* The form */
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 01 / YOUR NAME */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
              }}
            >
              <label className="font-body-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#5ec6ff" }}>
                01 / YOUR NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderBottom: inputStyle.borderBottom, boxShadow: "none" })}
                placeholder="Your full name"
              />
            </div>

            {/* 02 / YOUR COMPANY */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
              }}
            >
              <label className="font-body-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#5ec6ff" }}>
                02 / YOUR COMPANY
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderBottom: inputStyle.borderBottom, boxShadow: "none" })}
                placeholder="Company name"
              />
            </div>

            {/* 03 / WHAT ARE YOU BUILDING */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
              }}
            >
              <label className="font-body-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#5ec6ff" }}>
                03 / WHAT ARE YOU BUILDING?
              </label>
              <textarea
                required
                rows={3}
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderBottom: inputStyle.borderBottom, boxShadow: "none" })}
                placeholder="Describe your project or vision"
              />
            </div>

            {/* 04 / YOUR TIMELINE */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms",
              }}
            >
              <label className="font-body-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#5ec6ff" }}>
                04 / YOUR TIMELINE
              </label>
              <select
                required
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="appearance-none cursor-pointer"
                style={{
                  ...inputStyle,
                  color: formData.timeline ? "white" : "#A0A0B0",
                }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderBottom: inputStyle.borderBottom, boxShadow: "none" })}
              >
                {TIMELINE_OPTIONS.map((opt, i) => (
                  <option key={opt} value={i === 0 ? "" : opt} disabled={i === 0} style={{ background: "#0a0a0a", color: "white" }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* 05 / YOUR EMAIL */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms",
              }}
            >
              <label className="font-body-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#5ec6ff" }}>
                05 / YOUR EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderBottom: inputStyle.borderBottom, boxShadow: "none" })}
                placeholder="you@company.com"
              />
            </div>

            {/* Submit button */}
            <div
              className="pt-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
              }}
            >
              <button
                type="submit"
                disabled={formState === "sending"}
                className="font-body-mono text-xs tracking-[0.15em] uppercase cursor-pointer transition-all duration-300"
                style={{
                  padding: "14px 36px",
                  border: "1px solid #5ec6ff",
                  background: formState === "sending" ? "#5ec6ff" : "transparent",
                  color: formState === "sending" ? "black" : "#5ec6ff",
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  if (formState !== "sending") {
                    const t = e.currentTarget
                    t.style.background = "#5ec6ff"
                    t.style.color = "black"
                    t.style.boxShadow = "0 0 20px rgba(94, 198, 255, 0.3)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (formState !== "sending") {
                    const t = e.currentTarget
                    t.style.background = "transparent"
                    t.style.color = "#5ec6ff"
                    t.style.boxShadow = "none"
                  }
                }}
              >
                {formState === "sending" ? "TRANSMITTING..." : "TRANSMIT BRIEF →"}
              </button>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(160, 160, 176, 0.4);
          font-family: 'Space Mono', monospace;
          font-size: 14px;
        }
      `}</style>
    </section>
  )
}
