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
    { name: 'About Us', url: '/about', icon: Info },
    { name: 'Services', url: '/services', icon: Briefcase },
    { name: 'Contact Us', url: '/contact', icon: Phone }
  ]

  return (
    <>
      {/* Background overlay for scrolling logo + CTA */}
      <div 
        className={`fixed top-0 left-0 right-0 h-20 transition-all duration-500 z-40 pointer-events-none ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-[#343c43]" : "bg-transparent"
        }`} 
      />
      
      {/* Logo & Call To Action (Top Left & Top Right) */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 animate-slide-in pointer-events-auto">
              <Image src="/logo.png" alt="The Gromantra Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-white font-bold hidden sm:inline tracking-wide">The Gromantra</span>
            </Link>

            <div className="flex items-center gap-4 pointer-events-auto">
              {/* Login and Get Started removed per user request */}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Animated Navigation (Center Top / Center Bottom on Mobile) */}
      <TubelightNavbar items={navItems} />
    </>
  )
}
