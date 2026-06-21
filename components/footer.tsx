"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SocialLinks } from "@/components/ui/social-links"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

/* ═══════════════════════════════════════════════
   FOOTER — TRANSMISSION TERMINAL
   Restores original social media section + SocialLinks
   component with new design system typography.
   ═══════════════════════════════════════════════ */

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <Instagram className="w-5 h-5" />,
    popupIcon: <Instagram className="w-10 h-10" />,
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: <Facebook className="w-5 h-5" />,
    popupIcon: <Facebook className="w-10 h-10" />,
  },
  {
    name: "X",
    url: "https://twitter.com",
    icon: <Twitter className="w-5 h-5" />,
    popupIcon: <Twitter className="w-10 h-10" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />,
    popupIcon: <Linkedin className="w-10 h-10" />,
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-black border-t border-[#343c43] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(29, 78, 216, 0.1), transparent)" }}
        />
      </div>

      {/* ═══ TOP BAND — Full-width statement ═══ */}
      <div
        className="relative z-10 border-b border-[#343c43]/40"
        style={{ padding: "100px 5vw 80px" }}
      >
        <div
          className="max-w-7xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-none"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            LET&rsquo;S BUILD SOMETHING
            <br />
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: "linear-gradient(to right, #1d4ed8, #5ec6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              THAT LASTS.
            </span>
          </h2>
          <p
            className="font-body-mono text-xs tracking-[0.15em] uppercase mt-6"
            style={{ color: "var(--gm-data)" }}
          >
            gromantra.studio — est. 2021
          </p>
        </div>
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="relative z-10" style={{ padding: "60px 5vw" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Gromantra Logo" width={32} height={32} className="w-8 h-8" />
              <span className="font-display text-white font-extrabold tracking-[0.05em] uppercase">GROMANTRA</span>
            </div>
            <p className="font-body-mono text-xs leading-relaxed" style={{ color: "var(--gm-data)" }}>
              Signal architecture for brands that refuse to blend in.
            </p>
          </div>

          {/* Product */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            }}
          >
            <h4 className="font-display text-white font-bold mb-4 text-sm">Product</h4>
            <div className="space-y-3">
              <Link href="/#features" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Features
              </Link>
              <Link href="/contact" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Pricing
              </Link>
              <Link href="/services" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Services
              </Link>
            </div>
          </div>

          {/* Company */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            }}
          >
            <h4 className="font-display text-white font-bold mb-4 text-sm">Company</h4>
            <div className="space-y-3">
              <Link href="/about" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                About Us
              </Link>
              <Link href="/blog" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Blog
              </Link>
              <Link href="/contact" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            }}
          >
            <h4 className="font-display text-white font-bold mb-4 text-sm">Support</h4>
            <div className="space-y-3">
              <Link href="/contact" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Get in touch
              </Link>
              <Link href="/contact" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Help Center
              </Link>
              <Link href="/contact" className="font-body-mono text-xs hover:text-[#5ec6ff] hover:pl-2 transition-all duration-300 block" style={{ color: "var(--gm-data)" }}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* ═══ SOCIAL MEDIA FOLLOW SECTION — Original SocialLinks component ═══ */}
        <div
          className="mt-16 pt-16 flex flex-col items-center justify-center border-t border-[#343c43]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 600ms",
          }}
        >
          <h4
            className="font-body-mono text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--gm-data)" }}
          >
            Follow Us
          </h4>
          <SocialLinks socials={socials} className="gap-2 md:gap-8" />
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="relative z-10 border-t border-[#343c43]" style={{ padding: "20px 5vw" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Copyright */}
          <p className="font-body-mono text-[11px]" style={{ color: "var(--gm-data)", opacity: 0.6 }}>
            Made with <span className="text-[#5ec6ff]">❤️</span> by Gromantra · Made in India
          </p>

          {/* Center: Systems operational */}
          <div className="flex items-center gap-2 order-first sm:order-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ec6ff] signal-pulse" />
            <span
              className="font-body-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--gm-data)", opacity: 0.6 }}
            >
              SYSTEMS OPERATIONAL
            </span>
          </div>

          {/* Right: Copyright year */}
          <p className="font-body-mono text-[11px]" style={{ color: "var(--gm-data)", opacity: 0.5 }}>
            © {new Date().getFullYear()} Gromantra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
