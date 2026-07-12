"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import { Megaphone, MessageSquare, Heart, Share2, Compass, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// --- 3D Orbiting Platforms Component ---
function OrbitNode({ speed, radius, color, label, size, onHover }: { speed: number, radius: number, color: number, label: string, size: number, onHover: (name: string | null) => void }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime() * speed
      ref.current.position.x = Math.cos(time) * radius
      ref.current.position.z = Math.sin(time) * radius
      ref.current.position.y = Math.sin(time * 0.5) * 0.5
      ref.current.rotation.y += 0.02
    }
  })

  return (
    <mesh 
      ref={ref}
      onPointerOver={() => onHover(label)}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  )
}

function CentralCore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial color={0x5ec6ff} wireframe />
    </mesh>
  )
}

function OrbitingScene({ onHoverPlatform }: { onHoverPlatform: (name: string | null) => void }) {
  const platforms = [
    { label: "INSTAGRAM", color: 0xe1306c, speed: 0.4, radius: 2.2, size: 0.25 },
    { label: "TIKTOK", color: 0x25f4ee, speed: 0.6, radius: 3.2, size: 0.22 },
    { label: "LINKEDIN", color: 0x0077b5, speed: 0.3, radius: 4.2, size: 0.28 },
    { label: "X (TWITTER)", color: 0xffffff, speed: 0.5, radius: 5.2, size: 0.20 },
  ]

  return (
    <group>
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <CentralCore />
      {platforms.map((p, i) => (
        <OrbitNode 
          key={i}
          speed={p.speed}
          radius={p.radius}
          color={p.color}
          label={p.label}
          size={p.size}
          onHover={onHoverPlatform}
        />
      ))}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ambientLight intensity={0.6} />
    </group>
  )
}

// --- Main Social Client Page Component ---
export default function SocialPageClient({ service, id }: { service: any, id: string }) {
  const [activePlatform, setActivePlatform] = useState<string | null>(null)
  const [calendarIndex, setCalendarIndex] = useState(0)

  const contentDrafts = [
    {
      day: "MONDAY",
      type: "Reels / Short Video",
      topic: "SEO Myth-busting & Organic Spikes",
      hook: "Why most digital marketing agencies lie about your Google Analytics rankings...",
      clicks: "4,500+",
      likes: "1,200",
      shares: "320",
      status: "READY FOR INGESTION"
    },
    {
      day: "WEDNESDAY",
      type: "LinkedIn Newsletter",
      topic: "Bypassing Ad Fatigue in SaaS",
      hook: "How we generated 4.8x ROAS using custom semantic landing page variants...",
      clicks: "12,000+",
      likes: "890",
      shares: "210",
      status: "TRANSMITTING"
    },
    {
      day: "FRIDAY",
      type: "X Carousel Thread",
      topic: "AI Agency vs Solo Operator Model",
      hook: "1/ The standard agency retainer is dead. Here is the operational proof why...",
      clicks: "25,000+",
      likes: "3,100",
      shares: "940",
      status: "COMPILING"
    }
  ]

  const nextSlide = () => {
    setCalendarIndex((prev) => (prev + 1) % contentDrafts.length)
  }

  const prevSlide = () => {
    setCalendarIndex((prev) => (prev - 1 + contentDrafts.length) % contentDrafts.length)
  }

  return (
    <main className="bg-[#050508] min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,48,108,0.12),transparent_50%)] -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-[#E1306C] uppercase border border-[#E1306C]/30 rounded-full mb-6 bg-[#0F1115]/80 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
              Social Uplink Connected
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-tight">
              Community <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1306C] to-[#5EC6FF] glow-text">
                Amplified.
              </span>
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.7)] font-mono mb-8 max-w-lg">
              Compounding content distribution frameworks that bypass algorithm limits and channel authentic engagement directly to your funnel.
            </p>
            <Link 
              href={`/contact?service=Social%20Media`}
              className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan"
            >
              Deploy Distribution Hub →
            </Link>
          </motion.div>

          {/* Right 3D Orbiting Social Platforms */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[400px] sm:h-[450px] border border-[#343C43] rounded-xl bg-[#0F1115]/50 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#5EC6FF] uppercase tracking-widest z-20">
              // 3D SOCIAL VECTOR ORBIT
            </div>
            
            <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
              <OrbitingScene onHoverPlatform={setActivePlatform} />
            </Canvas>

            {/* Hover details overlay */}
            <AnimatePresence>
              {activePlatform && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#E1306C]/30 p-4 rounded-lg backdrop-blur-md z-20"
                >
                  <p className="font-mono text-[10px] text-[#E1306C] uppercase tracking-widest mb-1">// CHANNEL NODE ACTIVE</p>
                  <h4 className="text-white font-display font-bold uppercase text-sm">
                    {activePlatform}
                  </h4>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- SWIPE CALENDAR SECTION --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
              Content Planner Hub
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
              // Dynamic feed pipeline scheduler
            </p>
          </div>

          <div className="relative bg-[#0F1115]/80 border border-[#343C43] rounded-xl p-8 shadow-inner overflow-hidden flex flex-col items-center">
            {/* Swiper Controls */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30 pointer-events-auto">
              <span className="font-mono text-xs text-[#5EC6FF]">
                DAY SCHEDULE {calendarIndex + 1} OF {contentDrafts.length}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-8 h-8 rounded border border-[#343C43] hover:border-[#5EC6FF] text-white flex items-center justify-center transition-all bg-[#0F1115]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-8 h-8 rounded border border-[#343C43] hover:border-[#5EC6FF] text-white flex items-center justify-center transition-all bg-[#0F1115]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider Content */}
            <div className="w-full mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={calendarIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#343C43]/50 pb-4">
                    <div>
                      <span className="text-[#E1306C] font-mono text-[10px] uppercase tracking-widest">
                        {contentDrafts[calendarIndex].day}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white uppercase mt-1">
                        {contentDrafts[calendarIndex].type}
                      </h3>
                    </div>
                    <div className="px-3 py-1 bg-[#171A1F] border border-[#5EC6FF]/30 text-[#5EC6FF] font-mono text-xs uppercase tracking-widest rounded">
                      {contentDrafts[calendarIndex].status}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-[rgba(255,255,255,0.4)] uppercase mb-2">Content Concept</h4>
                    <p className="text-white text-lg font-display uppercase tracking-wide">
                      {contentDrafts[calendarIndex].topic}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-[rgba(255,255,255,0.4)] uppercase mb-2">Algorithm Hook Sequence</h4>
                    <p className="text-[rgba(255,255,255,0.7)] font-sans italic text-sm border-l-2 border-[#E1306C] pl-4">
                      "{contentDrafts[calendarIndex].hook}"
                    </p>
                  </div>

                  {/* Performance metrics inside calendar card */}
                  <div className="grid grid-cols-3 gap-4 border-t border-[#343C43]/50 pt-6">
                    <div>
                      <div className="flex items-center gap-1 text-[rgba(255,255,255,0.4)] font-mono text-[9px] uppercase">
                        <Compass className="w-3.5 h-3.5 text-[#E1306C]" /> Reach
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {contentDrafts[calendarIndex].clicks}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[rgba(255,255,255,0.4)] font-mono text-[9px] uppercase">
                        <Heart className="w-3.5 h-3.5 text-[#E1306C]" /> Likes
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {contentDrafts[calendarIndex].likes}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[rgba(255,255,255,0.4)] font-mono text-[9px] uppercase">
                        <Share2 className="w-3.5 h-3.5 text-[#E1306C]" /> Shares
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {contentDrafts[calendarIndex].shares}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- INCLUDED MODULES --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
            Social Deployment Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.included.map((item: string, i: number) => (
              <div 
                key={i} 
                className="bg-[#171A1F]/50 border border-[#343C43] rounded-xl p-8 text-left hover:border-[#E1306C]/50 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded bg-[#0F1115] border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg uppercase mb-2">{item}</h4>
                  <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed">
                    Continuous monitoring of ad algorithms, organic reaches, and custom demographic conversions.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
