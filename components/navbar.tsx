"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Info, Briefcase, Phone } from 'lucide-react'
import { TubelightNavbar } from "@/components/ui/tubelight-navbar"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Services', url: '/services', icon: Briefcase },
    { name: 'Contact', url: '/contact', icon: Phone }
  ]

  return (
    <>
      {/* Background overlay for scrolling */}
      <div 
        className={`fixed top-0 left-0 right-0 h-20 transition-all duration-500 z-40 pointer-events-none ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-[#343c43]/50" : "bg-transparent"
        }`} 
      />
      
      {/* Logo & Brand */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto" style={{ padding: "0 5vw" }}>
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 pointer-events-auto group">
              <Image src="/logo.png" alt="Gromantra Logo" width={32} height={32} className="w-8 h-8" />
              <span className="font-display text-white font-extrabold text-lg tracking-[0.1em] uppercase hidden sm:inline group-hover:text-[#5ec6ff] transition-colors duration-300">
                GROMANTRA
              </span>
            </Link>

            {/* Status indicator */}
            <div className="flex items-center gap-4 pointer-events-auto">
              <div className="hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5ec6ff] signal-pulse" />
                <span className="font-body-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--gm-data)" }}>
                  SYSTEMS ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Animated Navigation */}
      <TubelightNavbar items={navItems} />
    </>
  )
}
