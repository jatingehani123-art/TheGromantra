"use client"

import { useEffect, useRef, useCallback } from "react"

/* ═══════════════════════════════════════════════════════════════
   GROMANTRA LOADING SCREEN — Film Reel + Word Storm
   
   Single requestAnimationFrame loop drives:
   - 5 film reel strips (translateX)
   - Progress bar simulation
   - Word storm cycling
   - Random lit word effect
   - Clock update
   - Scanline sweep
   - Logo border clip-path reveal
   
   Exit: scaleY collapse upward, dispatches 'loaderComplete'
   ═══════════════════════════════════════════════════════════════ */

// ─── STRIP DATA ───
const STRIPS = [
  {
    words: ["BRAND ARCHITECTURE", "CONVERSION RATE", "MARKET POSITIONING", "AUDIENCE TARGETING", "GROWTH HACKING", "PAID MEDIA", "CONTENT STRATEGY", "PERFORMANCE MARKETING"],
    speed: 0.6, dir: 1,
  },
  {
    words: ["MOTION IDENTITY", "FUNNEL DESIGN", "LEAD GENERATION", "CREATIVE DIRECTION", "VIRAL CAMPAIGNS", "SOCIAL PROOF", "EMAIL MARKETING", "RETENTION LOOPS"],
    speed: 0.45, dir: -1,
  },
  {
    words: ["PERFORMANCE ADS", "SEO DOMINANCE", "BRAND RECALL", "CUSTOMER JOURNEY", "RETENTION SYSTEMS", "CLICK-THROUGH RATE", "SIGNAL STRENGTH", "CONVERSION CRAFT"],
    speed: 0.7, dir: 1,
  },
  {
    words: ["DIGITAL CAMPAIGNS", "STORYTELLING", "VISUAL LANGUAGE", "MARKET SHARE", "ROI ENGINEERING", "OMNICHANNEL", "LAUNCH STRATEGY", "GROWTH LOOPS"],
    speed: 0.5, dir: -1,
  },
  {
    words: ["CREATIVE SYSTEMS", "BRAND MANIFESTO", "IDENTITY DESIGN", "AUDIENCE PRECISION", "COMPOUNDING REACH", "DATA-DRIVEN", "ZERO NOISE", "BRAND VELOCITY"],
    speed: 0.55, dir: 1,
  },
]

const STORM_WORDS = [
  "BRAND ARCHITECTURE", "MOTION IDENTITY", "GROWTH SYSTEMS",
  "DIGITAL CAMPAIGNS", "MARKET SIGNALS", "CREATIVE STRATEGY",
  "CONVERSION CRAFT", "AUDIENCE PRECISION", "BRAND VELOCITY",
  "SIGNAL OVER NOISE",
]

const STATUS_LABELS: [number, string][] = [
  [0, "INITIALIZING SIGNAL..."],
  [20, "LOADING BRAND ASSETS..."],
  [45, "CALIBRATING AUDIENCE..."],
  [70, "BUILDING SYSTEMS..."],
  [92, "SIGNAL LOCKED ✓"],
]

function getStatusLabel(pct: number): string {
  let label = STATUS_LABELS[0][1]
  for (const [threshold, text] of STATUS_LABELS) {
    if (pct >= threshold) label = text
  }
  return label
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pctRef = useRef(0)
  const wordIndexRef = useRef(0)
  const lastWordTimeRef = useRef(0)
  const isCompleteRef = useRef(false)
  const startTimeRef = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Strip position refs
  const stripPosRef = useRef<number[]>(STRIPS.map(() => 0))

  // DOM refs for direct manipulation (no React re-renders in RAF)
  const barFillRef = useRef<HTMLDivElement>(null)
  const pctLabelRef = useRef<HTMLDivElement>(null)
  const statusLabelRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const logoBorderRef = useRef<HTMLDivElement>(null)
  const wordStageRef = useRef<HTMLDivElement>(null)
  const stripInnerRefs = useRef<(HTMLDivElement | null)[]>([])
  const wordSpanRefs = useRef<Map<string, HTMLSpanElement[]>>(new Map())

  // Lit word tracking
  const litWordsRef = useRef<Map<HTMLSpanElement, number>>(new Map())

  const initStripRefs = useCallback((el: HTMLDivElement | null, index: number) => {
    stripInnerRefs.current[index] = el
  }, [])

  // Create word elements for word storm
  useEffect(() => {
    if (!wordStageRef.current) return
    const stage = wordStageRef.current
    stage.innerHTML = ""
    STORM_WORDS.forEach((word, i) => {
      const div = document.createElement("div")
      div.textContent = word
      div.className = "gl-storm-word"
      div.style.cssText = `
        position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        font-family: 'Syne', sans-serif; font-weight: 800; font-size: 32px;
        color: #5ec6ff; letter-spacing: -0.01em; white-space: nowrap;
        opacity: 0; transform: translateY(30px) skewY(4deg);
        will-change: transform, opacity;
      `
      if (i === 0) {
        div.style.opacity = "1"
        div.style.transform = "translateY(0) skewY(0deg)"
      }
      stage.appendChild(div)
    })
  }, [])

  // Register word spans from strips for lit effect
  const registerWordSpan = useCallback((el: HTMLSpanElement | null, stripIdx: number) => {
    if (!el) return
    const key = `strip-${stripIdx}`
    if (!wordSpanRefs.current.has(key)) wordSpanRefs.current.set(key, [])
    const arr = wordSpanRefs.current.get(key)!
    if (!arr.includes(el)) arr.push(el)
  }, [])

  // ─── MAIN RAF LOOP ───
  useEffect(() => {
    startTimeRef.current = performance.now()
    let lastClockUpdate = 0

    const loop = (now: number) => {
      if (isCompleteRef.current) return

      // ── STRIPS: update translateX ──
      STRIPS.forEach((strip, i) => {
        const inner = stripInnerRefs.current[i]
        if (!inner) return
        stripPosRef.current[i] += strip.speed * strip.dir
        // Reset position for seamless loop
        const totalW = inner.scrollWidth / 3 // 3 copies
        if (strip.dir > 0 && stripPosRef.current[i] > totalW) {
          stripPosRef.current[i] -= totalW
        }
        if (strip.dir < 0 && Math.abs(stripPosRef.current[i]) > totalW) {
          stripPosRef.current[i] += totalW
        }
        inner.style.transform = `translateX(${-stripPosRef.current[i]}px)`
      })

      // ── RANDOM LIT EFFECT ──
      // 4% chance per frame to light up a random word
      if (Math.random() < 0.04) {
        const allSpans: HTMLSpanElement[] = []
        wordSpanRefs.current.forEach((arr) => allSpans.push(...arr))
        if (allSpans.length > 0) {
          const span = allSpans[Math.floor(Math.random() * allSpans.length)]
          if (!litWordsRef.current.has(span)) {
            span.style.color = "rgba(94, 198, 255, 0.7)"
            span.style.textShadow = "0 0 20px rgba(94, 198, 255, 0.3)"
            const duration = 500 + Math.random() * 300
            litWordsRef.current.set(span, now + duration)
          }
        }
      }
      // Revert expired lit words
      litWordsRef.current.forEach((expiry, span) => {
        if (now >= expiry) {
          span.style.color = "rgba(255,255,255,0.05)"
          span.style.textShadow = "none"
          litWordsRef.current.delete(span)
        }
      })

      // ── PROGRESS BAR ──
      if (pctRef.current < 100) {
        pctRef.current = Math.min(100, pctRef.current + (Math.random() * 1.8 + 0.6))
        const pct = pctRef.current

        if (barFillRef.current) {
          barFillRef.current.style.width = `${pct}%`
        }
        if (pctLabelRef.current) {
          pctLabelRef.current.textContent = `${Math.round(pct)}%`
        }
        if (statusLabelRef.current) {
          const label = getStatusLabel(pct)
          statusLabelRef.current.textContent = label
          if (pct >= 92) {
            statusLabelRef.current.style.color = "#5ec6ff"
            statusLabelRef.current.style.opacity = "1"
            statusLabelRef.current.style.animation = "none"
          }
        }

        // Logo border clip-path reveal (0–30% of progress)
        if (logoBorderRef.current && pct <= 30) {
          const clipPct = Math.min(100, (pct / 30) * 100)
          logoBorderRef.current.style.clipPath = `inset(0 ${100 - clipPct}% 0 0)`
        } else if (logoBorderRef.current && pct > 30) {
          logoBorderRef.current.style.clipPath = "inset(0 0% 0 0)"
        }
      }

      // ── WORD STORM CYCLING ──
      if (now - lastWordTimeRef.current > 750 && pctRef.current < 100) {
        lastWordTimeRef.current = now
        const stage = wordStageRef.current
        if (stage) {
          const words = stage.children
          const prevIdx = wordIndexRef.current
          wordIndexRef.current = (wordIndexRef.current + 1) % STORM_WORDS.length
          const nextIdx = wordIndexRef.current

          // Exit previous
          const prev = words[prevIdx] as HTMLElement
          if (prev) {
            prev.style.transition = "opacity 0.25s ease-in, transform 0.25s ease-in"
            prev.style.opacity = "0"
            prev.style.transform = "translateY(-28px) skewY(-3deg)"
          }

          // Enter next
          setTimeout(() => {
            const next = words[nextIdx] as HTMLElement
            if (next) {
              next.style.transition = "none"
              next.style.transform = "translateY(30px) skewY(4deg)"
              next.style.opacity = "0"
              // Force reflow
              void next.offsetHeight
              next.style.transition = "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)"
              next.style.opacity = "1"
              next.style.transform = "translateY(0) skewY(0deg)"
            }
          }, 100)
        }
      }

      // ── CLOCK ──
      if (now - lastClockUpdate > 1000) {
        lastClockUpdate = now
        if (clockRef.current) {
          const d = new Date()
          clockRef.current.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
            .map((n) => String(n).padStart(2, "0"))
            .join(":")
        }
      }

      // ── COMPLETION CHECK ──
      if (pctRef.current >= 100 && !isCompleteRef.current) {
        const elapsed = now - startTimeRef.current
        if (elapsed >= 2200) {
          isCompleteRef.current = true

          // Show final word
          const stage = wordStageRef.current
          if (stage) {
            Array.from(stage.children).forEach((c) => {
              ;(c as HTMLElement).style.opacity = "0"
            })
            const finalDiv = document.createElement("div")
            finalDiv.textContent = "SIGNAL LOCKED ✓"
            finalDiv.style.cssText = `
              position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
              font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
              color: #5ec6ff; letter-spacing: 0.2em; white-space: nowrap;
              opacity: 0; transform: translateY(20px);
              transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
            `
            stage.appendChild(finalDiv)
            requestAnimationFrame(() => {
              finalDiv.style.opacity = "1"
              finalDiv.style.transform = "translateY(0)"
            })
          }

          // Collapse after 900ms
          setTimeout(() => {
            if (loaderRef.current) {
              loaderRef.current.style.transition = "transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)"
              loaderRef.current.style.transformOrigin = "top"
              loaderRef.current.style.transform = "scaleY(0)"
            }
            // After collapse: hide and dispatch
            setTimeout(() => {
              if (loaderRef.current) {
                loaderRef.current.style.display = "none"
              }
              document.dispatchEvent(new CustomEvent("loaderComplete"))
              onCompleteRef.current()
            }, 600)
          }, 900)

          return // Stop the main loop
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    // Initialize clock immediately
    if (clockRef.current) {
      const d = new Date()
      clockRef.current.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":")
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Render strip word spans (3x duplicated for seamless loop)
  const renderStripWords = (words: string[], stripIdx: number) => {
    const tripled = [...words, ...words, ...words]
    return tripled.map((word, i) => (
      <span key={`${stripIdx}-${i}`} className="gl-strip-span inline-flex items-center flex-shrink-0">
        <span
          ref={(el) => { if (el) registerWordSpan(el, stripIdx) }}
          className="gl-strip-word"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "15px",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.05)",
            padding: "0 28px",
            whiteSpace: "nowrap" as const,
            transition: "color 0.5s, text-shadow 0.5s",
          }}
        >
          {word}
        </span>
        <span style={{ color: "rgba(94, 198, 255, 0.2)", fontFamily: "'DM Mono', monospace", fontSize: "12px", padding: "0 4px" }}>
          ◈
        </span>
      </span>
    ))
  }

  return (
    <div
      ref={loaderRef}
      id="gromantra-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#04040A",
        overflow: "hidden",
      }}
    >
      {/* ─── LAYER 1: GRID OVERLAY ─── */}
      <div
        id="gl-grid"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(94, 198, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 198, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.025,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ─── LAYER 2: FILM REEL STRIPS ─── */}
      <div
        id="gl-reel"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {STRIPS.map((strip, i) => (
          <div
            key={i}
            className={`gl-strip ${i >= 3 ? "gl-strip-hide-mobile" : ""}`}
            style={{
              height: "52px",
              overflow: "hidden",
              borderTop: "1px solid rgba(94, 198, 255, 0.04)",
              borderBottom: "1px solid rgba(94, 198, 255, 0.04)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              ref={(el) => initStripRefs(el, i)}
              className="gl-strip-inner"
              style={{
                display: "inline-flex",
                whiteSpace: "nowrap",
                willChange: "transform",
              }}
            >
              {renderStripWords(strip.words, i)}
            </div>
          </div>
        ))}
      </div>

      {/* ─── LAYER 3: SCANLINE SWEEP ─── */}
      <div
        id="gl-scanline"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(94, 198, 255, 0.5)",
          boxShadow: "0 0 12px rgba(94, 198, 255, 0.4)",
          zIndex: 20,
          pointerEvents: "none",
          animation: "gl-scanline-sweep 2.8s linear infinite",
        }}
      />

      {/* ─── LAYER 4: CORNER COORDINATES ─── */}
      <div id="gl-corner-tl" className="gl-corner" style={{ position: "absolute", top: 16, left: 20, zIndex: 15 }}>
        GROMANTRA.STUDIO
      </div>
      <div id="gl-corner-tr" className="gl-corner gl-corner-hide-mobile" style={{ position: "absolute", top: 16, right: 20, zIndex: 15 }}>
        EST. 2021
      </div>
      <div id="gl-corner-bl" className="gl-corner gl-corner-hide-mobile" style={{ position: "absolute", bottom: 16, left: 20, zIndex: 15 }}>
        JAIPUR · IN
      </div>
      <div ref={clockRef} id="gl-corner-br" className="gl-corner" style={{ position: "absolute", bottom: 16, right: 20, zIndex: 15 }}>
        00:00:00
      </div>

      {/* ─── LAYER 5: CENTER STAGE ─── */}
      <div
        id="gl-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Logo block */}
        <div id="gl-logo-wrap" style={{ position: "relative", display: "inline-block" }}>
          <div
            id="gl-logo"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "42px",
              letterSpacing: "0.18em",
              color: "white",
              position: "relative",
              zIndex: 2,
              lineHeight: 1,
            }}
          >
            GROMANTRA
          </div>
          {/* Logo border (clip-path animated) */}
          <div
            ref={logoBorderRef}
            id="gl-logo-border"
            style={{
              position: "absolute",
              inset: "-10px -18px",
              border: "1px solid rgba(94, 198, 255, 0.25)",
              zIndex: 1,
              clipPath: "inset(0 100% 0 0)",
              pointerEvents: "none",
            }}
          />
          {/* Signal dot */}
          <div
            id="gl-signal-dot"
            style={{
              position: "absolute",
              top: "-6px",
              right: "-12px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#5ec6ff",
              boxShadow: "0 0 8px rgba(94, 198, 255, 0.8)",
              zIndex: 3,
              animation: "gl-pulse 1.4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Sub-label */}
        <div
          id="gl-logo-sub"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.55em",
            color: "rgba(160,160,176,0.6)",
            marginTop: "8px",
          }}
        >
          DIGITAL · MARKETING · AGENCY
        </div>

        {/* Word storm stage */}
        <div
          ref={wordStageRef}
          id="gl-wordstage"
          style={{
            height: "58px",
            overflow: "hidden",
            marginTop: "16px",
            width: "500px",
            maxWidth: "90vw",
            position: "relative",
          }}
        />

        {/* Progress system */}
        <div id="gl-progress" style={{ width: "320px", maxWidth: "80vw", marginTop: "24px" }}>
          {/* Bar track */}
          <div
            id="gl-bar-track"
            style={{
              height: "1px",
              background: "rgba(94, 198, 255, 0.12)",
              position: "relative",
              overflow: "visible",
            }}
          >
            <div
              ref={barFillRef}
              id="gl-bar-fill"
              style={{
                height: "100%",
                width: "0%",
                background: "#5ec6ff",
                boxShadow: "0 0 8px rgba(94, 198, 255, 0.5)",
                position: "relative",
              }}
            >
              {/* Glowing tip */}
              <div
                id="gl-bar-tip"
                style={{
                  position: "absolute",
                  right: "-1px",
                  top: "-3px",
                  width: "2px",
                  height: "7px",
                  background: "#5ec6ff",
                  boxShadow: "0 0 6px rgba(94, 198, 255, 0.8)",
                }}
              />
            </div>
          </div>

          {/* Status row */}
          <div
            id="gl-status-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div
              ref={statusLabelRef}
              id="gl-status-label"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.35em",
                color: "rgba(160,160,176,0.7)",
                animation: "gl-status-blink 0.8s ease-in-out infinite",
              }}
            >
              INITIALIZING SIGNAL...
            </div>
            <div
              ref={pctLabelRef}
              id="gl-pct"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "13px",
                color: "#5ec6ff",
              }}
            >
              0%
            </div>
          </div>
        </div>
      </div>

      {/* ─── GLOBAL STYLES ─── */}
      <style jsx global>{`
        @keyframes gl-scanline-sweep {
          0% { top: -2px; opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes gl-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes gl-status-blink {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        .gl-corner {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.25em;
          color: rgba(94, 198, 255, 0.25);
          text-transform: uppercase;
          user-select: none;
        }
        @media (max-width: 480px) {
          #gl-logo { font-size: 28px !important; }
          #gl-wordstage { width: 90vw !important; }
          .gl-storm-word { font-size: 22px !important; }
          #gl-progress { width: 80vw !important; }
          .gl-corner-hide-mobile { display: none !important; }
          .gl-strip-hide-mobile { display: none !important; }
          .gl-strip-word { font-size: 11px !important; padding: 0 16px !important; }
        }
      `}</style>
    </div>
  )
}
