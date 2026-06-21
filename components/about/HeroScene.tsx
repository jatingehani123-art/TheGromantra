"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { EffectComposer, Bloom, Scanline, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

function DataGraph() {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 150; i++) {
      const t = i / 150
      const x = (t - 0.5) * 20
      // Exponential curve
      const y = Math.pow(t * 3, 2) - 4
      const z = Math.sin(t * Math.PI * 4) * 2
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])

  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <group>
      {/* The Growth Curve Line */}
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x5ec6ff, opacity: 0.8, transparent: true }))} />
      
      {/* Glowing Data Nodes along the curve */}
      {points.map((pos, i) => (
        i % 5 === 0 && (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={0xffffff} />
          </mesh>
        )
      ))}
      
      {/* Holographic Rings */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, -2, -2]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4, 4.1, 64]} />
          <meshBasicMaterial color={0x1d4ed8} side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle parallax rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <DataGraph />
      <ambientLight intensity={0.5} />
      
      {/* Postprocessing Pipeline */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2.0} />
        <Scanline density={1.5} opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </group>
  )
}

export function HeroScene() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    // Simulate system boot delay
    const timer = setTimeout(() => setBooted(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050508] cursor-crosshair">
      
      {/* Pre-Boot Terminal Sequence */}
      <AnimatePresence>
        {!booted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-[#0F1115] flex flex-col items-center justify-center font-pixel text-[#5EC6FF] text-xs md:text-sm tracking-widest text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ times: [0, 0.2, 0.4, 1], duration: 1 }}
            >
              INITIALIZING GROMANTRA SYSTEM... <br/><br/>
              LOADING KERNEL... [OK] <br/>
              ESTABLISHING UPLINK... [OK] <br/>
              BYPASSING MAINFRAME... [OK] <br/><br/>
              <span className="text-white animate-pulse">PRESS START</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center max-w-5xl mx-auto pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm font-mono tracking-widest text-[#5ec6ff] uppercase border border-[#5ec6ff]/30 rounded-full mb-8 backdrop-blur-md bg-[rgba(10,10,10,0.8)] pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-[#5ec6ff] animate-pulse glow-cyan" />
          System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: booted ? 1 : 0, filter: booted ? "blur(0px)" : "blur(10px)", scale: booted ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 50 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display mb-6 uppercase text-balance"
        >
          Growth Is Not Luck. <br />
          <span className="inline-block text-transparent bg-clip-text gradient-primary glow-text relative">
            It's Engineered.
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 2, delay: 3 }}
              className="absolute inset-0 text-[#5EC6FF] opacity-0 mix-blend-screen"
            >
              It's Engineered.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl text-[rgba(255,255,255,0.7)] max-w-2xl mb-12 font-mono"
        >
          Gromantra is a one-operator 360° growth system — SEO, ads, content, automation, brand, all run from a single command deck.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
        >
          <Link href="/contact" className="px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan relative overflow-hidden group inline-block">
            <span className="relative z-10">Start The Race</span>
            <div className="absolute inset-0 bg-[#5EC6FF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </Link>
          
          <Link href="/services" className="px-8 py-4 text-white font-mono uppercase tracking-widest border border-[#343C43] hover:border-[#5EC6FF] transition-colors duration-300 bg-[#171A1F]/80 backdrop-blur-md inline-block">
            View Our Process
          </Link>
        </motion.div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none mix-blend-overlay z-1" />

      {/* Bottom Gradient Overlay (pointer-events-none to prevent blocking) */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0F1115] to-transparent -z-10 pointer-events-none" />
    </div>
  )
}
