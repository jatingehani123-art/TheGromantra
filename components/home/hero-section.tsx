"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useCursorPosition } from "@/hooks/use-cursor-position"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cursorPos = useCursorPosition()

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.innerHeight - rect.top
        setScrollY(Math.max(0, scrolled))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const offsetXValue = (cursorPos.x - centerX) * 0.05
    const offsetYValue = (cursorPos.y - centerY) * 0.05
    setOffsetX(offsetXValue)
    setOffsetY(offsetYValue)
  }, [cursorPos])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden pt-24 pb-12">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: "var(--gradient-primary, linear-gradient(135deg, #1d4ed8, #5ec6ff))" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content - Left Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0 z-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-2 rounded-full border border-[#5ec6ff]/30"
            style={{
              background: "rgba(29, 78, 216, 0.1)",
            }}
          >
            <span className="text-[#5ec6ff] text-sm font-semibold">Trusted by 500+ Startups</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance"
          >
            Marketing Excellence
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: "var(--gradient-primary)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              for Ambitious Startups
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto md:mx-0"
          >
            All-in-one platform for digital marketing strategy, social media management, brand organization, and
            performance tracking.
          </motion.p>

          {/* Single CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex"
          >
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ background: "var(--gradient-primary)", boxShadow: "rgba(94, 198, 255, 0.5) 0 0 20px" }}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* 3D Model - Right Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 h-[450px] sm:h-[500px] md:h-[650px] relative z-10"
        >
          <div 
            className="w-full h-full relative"
            style={{
              transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-V1H5uECOTWm6TowfLYpNhmWu/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{ border: "none", display: "block", background: "transparent" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
