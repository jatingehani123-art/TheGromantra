"use client"

import { useState, useRef, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import { Palette, CheckCircle2, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// --- 3D Morphing Mesh Component ---
function MorphingSphere({ themeColor }: { themeColor: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      // Gently rotate
      meshRef.current.rotation.y = time * 0.15
      meshRef.current.rotation.x = time * 0.10
      
      // Perform simple shape morphing by animating scale and distorting
      const scaleX = 1 + Math.sin(time * 1.5) * 0.12
      const scaleY = 1 + Math.cos(time * 1.8) * 0.12
      const scaleZ = 1 + Math.sin(time * 2.2) * 0.10
      meshRef.current.scale.set(scaleX, scaleY, scaleZ)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color={themeColor} 
        wireframe
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function MorphingScene({ themeColor }: { themeColor: number }) {
  return (
    <group>
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <MorphingSphere themeColor={themeColor} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ambientLight intensity={0.5} />
    </group>
  )
}

// --- Swatch Themes Configuration ---
const SWATCH_THEMES = [
  {
    id: "cyan-blue",
    name: "SIGNAL CYAN",
    accent: "#5EC6FF",
    gradient: "linear-gradient(to right, #1D4ED8, #5EC6FF)",
    meshColor: 0x5ec6ff,
    bgGlow: "radial-gradient(circle, rgba(94, 198, 255, 0.15), transparent 60%)"
  },
  {
    id: "pink-purple",
    name: "PLASMA PINK",
    accent: "#E1306C",
    gradient: "linear-gradient(to right, #7B61FF, #E1306C)",
    meshColor: 0xe1306c,
    bgGlow: "radial-gradient(circle, rgba(225, 48, 108, 0.15), transparent 60%)"
  },
  {
    id: "neon-lime",
    name: "CYBER LIME",
    accent: "#10B981",
    gradient: "linear-gradient(to right, #059669, #10B981)",
    meshColor: 0x10b981,
    bgGlow: "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 60%)"
  },
  {
    id: "amber-gold",
    name: "AMBER VOID",
    accent: "#F59E0B",
    gradient: "linear-gradient(to right, #B45309, #F59E0B)",
    meshColor: 0xf59e0b,
    bgGlow: "radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 60%)"
  }
]

// --- Main Branding Client Page Component ---
export default function BrandingPageClient({ service, id }: { service: any, id: string }) {
  const [theme, setTheme] = useState(SWATCH_THEMES[0])

  return (
    <main 
      className="bg-[#050508] min-h-screen flex flex-col relative overflow-hidden transition-all duration-500"
      style={{
        ["--theme-accent" as any]: theme.accent,
      }}
    >
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32">
        {/* Dynamic glow background */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none transition-all duration-500"
          style={{ background: theme.bgGlow }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 w-full text-center relative z-10 flex flex-col items-center">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest uppercase border rounded-full mb-6 bg-[#0F1115]/80 backdrop-blur-md transition-all duration-500"
            style={{ 
              color: theme.accent,
              borderColor: `${theme.accent}30`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
            BRAND ENVIRONMENT: ACTIVE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-none">
            Kinetic <br className="sm:hidden" />
            <span 
              className="text-transparent bg-clip-text transition-all duration-500"
              style={{ backgroundImage: theme.gradient }}
            >
              Identities.
            </span>
          </h1>

          <p className="text-lg text-[rgba(255,255,255,0.7)] font-mono mb-8 max-w-xl">
            We design fluid, scalable digital identities, motion systems, and content aesthetics built specifically for modern brand ecosystems.
          </p>

          <Link 
            href={`/contact?service=Branding%20(Design/Video)`}
            className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-white hover:text-black transition-all duration-300 mb-12 shadow-lg"
            style={{ backgroundColor: "#1D4ED8" }}
          >
            Launch Identity Spec →
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-mono text-[10px] text-[#5EC6FF] tracking-widest uppercase">Inspect Layout</span>
          <ChevronDown className="w-5 h-5 text-[#5EC6FF] animate-bounce" />
        </div>
      </section>

      {/* --- SWATCH RE-THEMER & MESH SECTION --- */}
      <section className="py-24 border-t border-[#343C43]/40 bg-black relative z-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Centered Column details / Swatches */}
          <div className="space-y-8 text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4">
                Mesh Swatch Room
              </h2>
              <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm uppercase tracking-widest">
                // Cycle themes to test branding adaptability
              </p>
            </div>
            
            <p className="text-sm text-[rgba(255,255,255,0.6)] font-sans leading-relaxed">
              Brands are not static guidelines. Our branding matrices deploy flexible vector systems, enabling clean adaptation across varying digital configurations. Select a theme variant to inspect real-time morphing compliance.
            </p>

            {/* Interactive Swatches */}
            <div className="flex gap-4 relative z-30 pointer-events-auto">
              {SWATCH_THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t)}
                  className={`w-12 h-12 rounded-full border-2 transition-all relative flex items-center justify-center ${
                    theme.id === t.id ? "scale-110 shadow-lg" : "scale-100 hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: t.accent,
                    borderColor: theme.id === t.id ? "#ffffff" : "rgba(52, 60, 67, 0.4)"
                  }}
                  title={t.name}
                >
                  {theme.id === t.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-black" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 rounded border border-[#343C43] bg-[#0F1115] font-mono text-xs text-[rgba(255,255,255,0.7)]">
              ACTIVE THEME ACCENT: <span className="font-bold text-white" style={{ color: theme.accent }}>{theme.name}</span>
            </div>
          </div>

          {/* Morphing Mesh Canvas */}
          <div className="w-full h-[400px] border border-[#343C43] rounded-xl bg-[#0F1115]/50 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#5EC6FF] uppercase tracking-widest z-20">
              // 3D KINETIC MESH
            </div>

            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <MorphingScene themeColor={theme.meshColor} />
            </Canvas>
          </div>

        </div>
      </section>

      {/* --- INCLUDED MODULES --- */}
      <section className="py-32 relative z-10 border-t border-[#343C43]/40 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
            Branding Artifact Scope
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.included.map((item: string, i: number) => (
              <div 
                key={i} 
                className="bg-[#171A1F]/50 border border-[#343C43] rounded-xl p-8 text-left hover:border-[#5EC6FF]/50 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded bg-[#0F1115] border border-[#343C43] flex items-center justify-center text-[#5EC6FF] mb-6" style={{ color: theme.accent, borderColor: `${theme.accent}30` }}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg uppercase mb-2">{item}</h4>
                  <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed">
                    Custom brand vectors, logos, and editing guidelines built specifically for scaling modern digital identities.
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
