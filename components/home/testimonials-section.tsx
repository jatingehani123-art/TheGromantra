"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"



export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      quote:
        "Gromantra completely overhauled our organic search strategy. In just 4 months, our inbound leads grew by 150%. Their data-driven approach is a breath of fresh air in the marketing space.",
      name: "Aarav Sharma",
      designation: "Founder, Zylker Technologies (Bengaluru)",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      quote:
        "Their performance marketing campaigns are incredibly creative and convert exceptionally well. We saw an immediate lift in online sales and a significant drop in acquisition costs.",
      name: "Priya Patel",
      designation: "Head of Marketing, Vistara Retail (Mumbai)",
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      quote:
        "Working with Gromantra has been a game-changer. They didn't just manage our search ads; they optimized our entire funnel, resulting in a 4.2x ROI on our ad spend.",
      name: "Rohan Mehta",
      designation: "CEO, BlueStone Apparel (Ahmedabad)",
      src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    },
    {
      quote:
        "The level of transparency and analytical depth they offer is unparalleled. We always know exactly where our budget is going and the results are clearly visible in our metrics.",
      name: "Anjali Nair",
      designation: "Director of Growth, EduKite (New Delhi)",
      src: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=1000&auto=format&fit=crop",
    },
    {
      quote:
        "Their SEO expertise put us at the top of local search results in multiple regions. Our booking volume has been consistent, and local brand visibility has never been higher.",
      name: "Vikram Malhotra",
      designation: "Co-Founder, UrbanStay Rentals (Goa)",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ padding: "120px 0" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(94, 198, 255, 0.1), rgba(52, 60, 67, 0.1))" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto" style={{ padding: "0 5vw" }}>
        {/* Section header with new typography */}
        <div
          className="text-center mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#5ec6ff]" />
            <span
              className="font-body-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--gm-data)" }}
            >
              TESTIMONIALS
            </span>
            <span className="w-8 h-px bg-[#5ec6ff]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 text-balance tracking-tight">
            What Our Customers Say
          </h2>
        </div>

        {/* Original AnimatedTestimonials component */}
        <AnimatedTestimonials 
          testimonials={testimonials} 
          autoplay={true} 
          showButtons={false} 
          autoplayInterval={2000} 
        />
      </div>
    </section>
  )
}
