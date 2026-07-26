"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  ArrowUp, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    const Comp = Component as any;

    return (
      <Comp
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>SEO & GEO Optimization</span> <span className="text-[#5EC6FF]/60">✦</span>
    <span>Performance Marketing</span> <span className="text-[#E1306C]/60">✦</span>
    <span>Web Development</span> <span className="text-[#5EC6FF]/60">✦</span>
    <span>Brand Identity</span> <span className="text-[#E1306C]/60">✦</span>
    <span>Social Media Growth</span> <span className="text-[#5EC6FF]/60">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative z-[100] w-full max-w-[100vw] overflow-hidden cinematic-footer-wrapper border-t border-[#343C43]"
      >
        <footer className="relative z-[100] flex min-h-[100dvh] w-full max-w-[100vw] overflow-hidden flex-col justify-between bg-black text-white">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] z-0" style={{ pointerEvents: 'none' }} />
          <div className="footer-bg-grid absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 select-none text-[#5EC6FF]"
            style={{ pointerEvents: 'none' }}
          >
            GROMANTRA
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-[#343C43]/50 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[#5EC6FF] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-display font-black footer-text-glow tracking-tighter mb-12 text-center uppercase"
            >
              Ready to grow?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-4 md:gap-6 w-full">
              
              <div className="flex flex-wrap justify-center gap-4 w-full relative z-[60]">
                <button onClick={() => window.location.href = '/contact'} className="footer-glass-pill px-6 md:px-10 py-3 md:py-5 rounded-full text-white font-bold text-xs md:text-base flex items-center gap-3 group bg-[#171A1F] border-[#343C43] pointer-events-auto cursor-pointer hover:bg-white/10 transition-all relative z-[60]">
                  Start a Project
                </button>
                
                <button onClick={() => window.location.href = '/services'} className="footer-glass-pill px-6 md:px-10 py-3 md:py-5 rounded-full text-white font-bold text-xs md:text-base flex items-center gap-3 group bg-[#171A1F] border-[#343C43] pointer-events-auto cursor-pointer hover:bg-white/10 transition-all relative z-[60]">
                  View Services
                </button>
              </div>

              {/* Business Contact Bar */}
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-6 w-full mt-4 md:mt-6 bg-[#171A1F]/80 backdrop-blur-md py-4 px-4 md:px-8 rounded-2xl border border-[#343C43]">
                  <div className="flex items-center gap-2 md:gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#5EC6FF]" />
                    <span className="text-xs md:text-sm text-[rgba(255,255,255,0.7)] text-center">17-A Kailash Nagar, Udaipur</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-[#343C43]" />
                  <div className="flex items-center gap-2 md:gap-3">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#5EC6FF]" />
                    <a href="tel:+919983959625" className="text-xs md:text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition-colors relative z-50">+91 99839 59625</a>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-[#343C43]" />
                  <div className="flex items-center gap-2 md:gap-3">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#5EC6FF]" />
                    <a href="mailto:gromantra0957@gmail.com" className="text-xs md:text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition-colors relative z-50">gromantra0957@gmail.com</a>
                  </div>
              </div>

              {/* Structured Links Layout */}
              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-16 w-full mt-4 md:mt-6 max-w-5xl relative z-[60] px-2 md:px-4">
                
                {/* Services Section */}
                <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 relative z-[60]">
                  <h3 className="font-mono text-[#5EC6FF] text-[10px] md:text-xs uppercase tracking-widest border-b border-[#343C43] pb-1 md:pb-2 w-full text-center md:text-left pointer-events-none">
                    Services
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 max-w-[280px] md:max-w-sm">
                    <Link href="/services/seo" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">SEO</Link>
                    <Link href="/services/social-media" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Social Media</Link>
                    <Link href="/services/web-development" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Web Dev</Link>
                    <Link href="/services/performance" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Performance</Link>
                    <Link href="/services/branding" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Branding</Link>
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 relative z-[60]">
                  <h3 className="font-mono text-[#5EC6FF] text-[10px] md:text-xs uppercase tracking-widest border-b border-[#343C43] pb-1 md:pb-2 w-full text-center md:text-left pointer-events-none">
                    Quick Links
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 max-w-[280px] md:max-w-sm">
                    <Link href="/blog" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white border-[#5EC6FF]/30 flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Blog</Link>
                    <Link href="/contact" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white border-[#5EC6FF]/30 flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Contact</Link>
                    <Link href="/privacy-policy" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Privacy Policy</Link>
                    <Link href="/terms" className="footer-glass-pill px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[rgba(255,255,255,0.7)] font-medium text-[10px] md:text-xs hover:text-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">Terms</Link>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 relative z-[60]">
                  <h3 className="font-mono text-[#5EC6FF] text-[10px] md:text-xs uppercase tracking-widest border-b border-[#343C43] pb-1 md:pb-2 w-full text-center md:text-left pointer-events-none">
                    Network
                  </h3>
                  <div className="flex gap-2">
                    <a href="https://www.facebook.com/share/1CwnmHnH8o/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full footer-glass-pill text-[#5EC6FF] hover:text-white pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">
                      <Facebook className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full footer-glass-pill text-[#E1306C] hover:text-white pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">
                      <Instagram className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/the-gromantra" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full footer-glass-pill text-[#5EC6FF] hover:text-white pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors relative z-[60]">
                      <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-4 md:pb-8 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-4 md:mt-0">
            
            {/* Copyright */}
            <div className="text-[rgba(255,255,255,0.5)] text-[8px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center">
              © 2026 GROMANTRA. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-1.5 md:gap-2 order-1 md:order-2 cursor-default border-[#343C43]/50">
              <span className="text-[rgba(255,255,255,0.5)] text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-xs md:text-sm text-[#E1306C]">❤</span>
              <span className="text-[rgba(255,255,255,0.5)] text-[8px] md:text-[10px] font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black font-display text-[10px] md:text-xs tracking-normal ml-1">GROMANTRA</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full footer-glass-pill flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white group order-3 pointer-events-auto cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
