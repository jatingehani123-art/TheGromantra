"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import { Target, Search, TrendingUp, Award, Zap, ChevronDown, CheckCircle2, Terminal } from "lucide-react"
import { ServiceFAQ } from "@/components/services/service-faq"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// --- 3D Constellation Component ---
function KeywordNode({ position, label, isHovered, onHover }: { position: [number, number, number], label: string, isHovered: boolean, onHover: (hovered: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      const scale = isHovered ? 1.5 : 1.0
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1))
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshBasicMaterial color={isHovered ? 0xffffff : 0x5ec6ff} />
    </mesh>
  )
}

function ConstellationConnections({ nodes }: { nodes: { position: [number, number, number] }[] }) {
  const lineGeometry = useMemo(() => {
    const points = []
    // Draw lines between sequential nodes and back to start
    for (let i = 0; i < nodes.length; i++) {
      const start = nodes[i].position
      const end = nodes[(i + 1) % nodes.length].position
      points.push(new THREE.Vector3(...start))
      points.push(new THREE.Vector3(...end))
    }
    // Also cross-connect some nodes
    if (nodes.length > 4) {
      points.push(new THREE.Vector3(...nodes[0].position))
      points.push(new THREE.Vector3(...nodes[3].position))
      points.push(new THREE.Vector3(...nodes[1].position))
      points.push(new THREE.Vector3(...nodes[4].position))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [nodes])

  return (
    <primitive object={new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x1d4ed8, opacity: 0.4, transparent: true }))} />
  )
}

function ConstellationScene({ hoveredIndex, setHoveredIndex, nodes }: { hoveredIndex: number | null, setHoveredIndex: (idx: number | null) => void, nodes: any[] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <ConstellationConnections nodes={nodes} />
      {nodes.map((node, i) => (
        <KeywordNode
          key={i}
          position={node.position}
          label={node.label}
          isHovered={hoveredIndex === i}
          onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
        />
      ))}
      <ambientLight intensity={0.5} />
    </group>
  )
}

// --- Main SEO Page Client Component ---
export default function SeoPageClient({ service, id }: { service: any, id: string }) {
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null)
  
  // Rank Climb Simulator State
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "optimizing" | "completed">("idle")
  const [logMessages, setLogMessages] = useState<string[]>([])
  
  const initialKeywords = useMemo(() => [
    { name: "technical seo architecture", position: 42, clicks: 120 },
    { name: "nextjs core web vitals agency", position: 28, clicks: 80 },
    { name: "enterprise schema optimization", position: 17, clicks: 190 },
    { name: "algorithmic search dominance", position: 55, clicks: 45 },
  ], [])

  const [keywords, setKeywords] = useState(initialKeywords)

  const constellationNodes = useMemo(() => [
    { label: "Google Crawler Optimizations", position: [-3, 2, 0] as [number, number, number] },
    { label: "Site Speed & Core Web Vitals", position: [2, 3, -2] as [number, number, number] },
    { label: "High Intent Keyword Silos", position: [4, -1, 1] as [number, number, number] },
    { label: "Semantic Graph Building", position: [-1, -3, -1] as [number, number, number] },
    { label: "Page Weight Compression", position: [-4, -1, 2] as [number, number, number] },
  ], [])

  // Simulator Engine
  const startSimulation = () => {
    if (simStatus !== "idle") return
    
    setSimStatus("running")
    setLogMessages(["[00:01] Initializing SEO Deep Crawl Protocol..."])
    
    // Step 1: crawl
    setTimeout(() => {
      setLogMessages(prev => [...prev, "[00:03] Injecting Structured Data JSON-LD graph ... [SUCCESS]", "[00:05] Bypassing competitor keyword clusters ..."])
      setSimStatus("optimizing")
    }, 1000)

    // Step 2: rank climbing countdowns
    let intervalCount = 0
    const interval = setInterval(() => {
      setKeywords(prev => prev.map(k => {
        const nextPos = Math.max(1, Math.floor(k.position - (k.position - 1) * 0.35))
        const clickLift = Math.floor(k.clicks * (k.position / nextPos))
        return { ...k, position: nextPos, clicks: clickLift }
      }))

      intervalCount++
      if (intervalCount === 1) {
        setLogMessages(prev => [...prev, "[00:08] Adjusting site speed latency matrix... LCP lowered to 0.7s."])
      } else if (intervalCount === 2) {
        setLogMessages(prev => [...prev, "[00:12] Compounding authority backlinks index ... [SECURED]"])
      }

      if (intervalCount >= 4) {
        clearInterval(interval)
        setKeywords(prev => prev.map(k => ({ ...k, position: 1 })))
        setLogMessages(prev => [...prev, "[00:15] Rank climb finalized. Google Search index updated.", "[SUCCESS] Search Protocol secured. System running at 100% Organic Efficiency."])
        setSimStatus("completed")
      }
    }, 1200)
  }

  const resetSimulation = () => {
    setKeywords(initialKeywords)
    setLogMessages([])
    setSimStatus("idle")
  }

  return (
    <main className="bg-[#050508] min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,198,255,0.15),transparent_50%)] -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-[#5EC6FF] uppercase border border-[#5EC6FF]/30 rounded-full mb-6 bg-[#0F1115]/80 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EC6FF] animate-pulse" />
              SEO System Active
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-tight">
              Organic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#5EC6FF] glow-text">
                Dominance.
              </span>
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.7)] font-mono mb-8 max-w-lg">
              We design structured semantic hierarchies, optimize Core Web Vitals, and build crawl architectures that force search engines to rank your brand.
            </p>
            <Link 
              href={`/contact?service=SEO`}
              className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan"
            >
              Secure Top Rank →
            </Link>
          </motion.div>

          {/* Right 3D Keyword Constellation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[400px] sm:h-[450px] border border-[#343C43] rounded-xl bg-[#0F1115]/50 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#5EC6FF] uppercase tracking-widest z-20">
              // 3D KEYWORD CONSTELLATION MAP
            </div>
            
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ConstellationScene 
                hoveredIndex={hoveredNodeIndex} 
                setHoveredIndex={setHoveredNodeIndex} 
                nodes={constellationNodes}
              />
            </Canvas>

            {/* Hover details overlay */}
            <AnimatePresence>
              {hoveredNodeIndex !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#5EC6FF]/30 p-4 rounded-lg backdrop-blur-md z-20"
                >
                  <p className="font-mono text-[10px] text-[#5EC6FF] uppercase tracking-widest mb-1">// NODE SPECIFICATION</p>
                  <h4 className="text-white font-display font-bold uppercase text-sm">
                    {constellationNodes[hoveredNodeIndex].label}
                  </h4>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-[#5EC6FF] tracking-widest uppercase">Inspect Protocol</span>
          <ChevronDown className="w-5 h-5 text-[#5EC6FF] animate-bounce" />
        </div>
      </section>

      {/* --- RANK CLIMB SIMULATOR SECTION --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
              Rank Climb Simulator
            </h2>
            <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
              // Live crawl vector simulation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (left 5 columns) */}
            <div className="lg:col-span-5 bg-[#0F1115]/80 border border-[#343C43] rounded-xl p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider">
                  Crawl Control Deck
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.6)] font-sans leading-relaxed mb-6">
                  Initiate our organic optimization protocol. Watch keywords automatically bypass traditional indexes and climb live to position #1.
                </p>

                {/* Console Log Area */}
                <div className="bg-black border border-[#343C43] rounded p-4 h-48 overflow-y-auto font-mono text-xs text-green-400 space-y-2 mb-6">
                  {logMessages.length === 0 && (
                    <div className="text-[rgba(255,255,255,0.3)]">// Command prompt ready. Press deploy below.</div>
                  )}
                  {logMessages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Terminal className="w-3.5 h-3.5 mt-0.5 text-green-400 shrink-0" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {simStatus === "idle" && (
                  <button 
                    onClick={startSimulation}
                    className="flex-1 py-4 text-black font-mono font-bold uppercase tracking-widest bg-[#5EC6FF] hover:bg-white transition-all shadow-[0_0_20px_rgba(94,198,255,0.3)]"
                  >
                    Deploy SEO Engine
                  </button>
                )}
                {simStatus !== "idle" && (
                  <button 
                    onClick={resetSimulation}
                    disabled={simStatus === "running" || simStatus === "optimizing"}
                    className="flex-1 py-4 text-white font-mono font-bold uppercase tracking-widest border border-[#343C43] hover:border-[#5EC6FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset Grid
                  </button>
                )}
              </div>
            </div>

            {/* Keyword Dashboard (right 7 columns) */}
            <div className="lg:col-span-7 bg-[#0F1115]/50 border border-[#343C43] rounded-xl p-6 flex flex-col justify-center">
              <div className="space-y-4">
                {keywords.map((kw, i) => {
                  const isNumberOne = kw.position === 1
                  return (
                    <div 
                      key={i} 
                      className={`p-4 rounded border transition-all ${
                        isNumberOne 
                          ? "bg-[#1D4ED8]/10 border-[#5EC6FF] shadow-[0_0_15px_rgba(94,198,255,0.1)]" 
                          : "bg-[#171A1F] border-[#343C43]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-[9px] text-[#5EC6FF] uppercase tracking-widest mb-1">
                            VECTOR KEYWORD {i + 1}
                          </div>
                          <h4 className="text-white font-display font-bold text-sm sm:text-base uppercase">
                            {kw.name}
                          </h4>
                        </div>

                        <div className="text-right flex items-center gap-4">
                          <div>
                            <div className="font-mono text-[9px] text-[rgba(255,255,255,0.4)] uppercase">ESTIMATED TRAFFIC</div>
                            <span className={`font-mono text-sm font-bold ${isNumberOne ? "text-[#5EC6FF]" : "text-white"}`}>
                              {kw.clicks.toLocaleString()} clicks/mo
                            </span>
                          </div>

                          <div className="flex flex-col items-center justify-center w-16 h-16 rounded bg-black/60 border border-[#343C43] relative overflow-hidden shrink-0">
                            <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] absolute top-1">RANK</span>
                            <span className={`font-mono text-xl font-bold mt-2 ${isNumberOne ? "text-green-400 scale-110" : "text-[#FFB020]"}`}>
                              #{kw.position}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILS & WHAT'S INCLUDED --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
            SEO System Architectures
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.7)] mb-16 max-w-2xl mx-auto">
            Our search architecture optimization is built around data completeness and speed compliance. Here is the operational protocol deployment:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.included.map((item: string, i: number) => (
              <div 
                key={i} 
                className="bg-[#171A1F]/50 border border-[#343C43] rounded-xl p-8 text-left hover:border-[#5EC6FF]/50 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded bg-[#0F1115] border border-[#5EC6FF]/30 flex items-center justify-center text-[#5EC6FF] mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg uppercase mb-2">{item}</h4>
                  <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed">
                    Automated analysis ensures continuous tracking of indexing errors, schema updates, and crawling compliance factors.
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
