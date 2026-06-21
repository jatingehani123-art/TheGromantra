"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    "SEO",
    "Social Media & Content",
    "Web Development",
    "Performance Marketing",
    "Branding (Design/Video)"
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Simple validation
    const newErrors: Record<string, string> = {}
    if (!formData.get("name")) newErrors.name = "REQUIRED_FIELD_MISSING"
    if (!formData.get("email")) newErrors.email = "REQUIRED_FIELD_MISSING"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)) {
      newErrors.email = "INVALID_FORMAT"
    }
    if (!formData.get("message")) newErrors.message = "REQUIRED_FIELD_MISSING"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus("submitting")

    // Mock API call
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => setStatus("idle"), 5000)
    }, 1500)
  }

  if (status === "success") {
    return (
      <div className="bg-[#171A1F]/50 backdrop-blur-md border border-[#5EC6FF]/40 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center relative overflow-hidden group">
        {/* Success glitch effect */}
        <div className="absolute inset-0 bg-[#5EC6FF]/10 opacity-0 animate-pulse transition-opacity" />
        <div className="font-mono text-[#5EC6FF] text-sm tracking-widest uppercase mb-4">
          // TRANSMISSION RECEIVED
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">Signal Locked</h3>
        <p className="text-[rgba(255,255,255,0.7)] font-sans">
          The system has processed your request. Operator will respond shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#171A1F]/50 backdrop-blur-md border border-[#343C43] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Decorative Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#5EC6FF]/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#5EC6FF]/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#5EC6FF]/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#5EC6FF]/50" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[#5EC6FF] font-mono text-[10px] uppercase tracking-widest flex items-center justify-between">
            NAME
            {errors.name && <span className="text-[#FFB020]">[{errors.name}]</span>}
          </label>
          <input 
            type="text" 
            name="name"
            className={`w-full bg-[#0F1115] border ${errors.name ? 'border-[#FFB020]' : 'border-[#343C43] focus:border-[#5EC6FF]'} rounded px-4 py-3 text-white font-sans outline-none transition-colors shadow-inner`}
            placeholder="John Doe"
          />
        </div>

        {/* Email & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[#5EC6FF] font-mono text-[10px] uppercase tracking-widest flex items-center justify-between">
              EMAIL
              {errors.email && <span className="text-[#FFB020]">[{errors.email}]</span>}
            </label>
            <input 
              type="email" 
              name="email"
              className={`w-full bg-[#0F1115] border ${errors.email ? 'border-[#FFB020]' : 'border-[#343C43] focus:border-[#5EC6FF]'} rounded px-4 py-3 text-white font-sans outline-none transition-colors shadow-inner`}
              placeholder="john@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#5EC6FF] font-mono text-[10px] uppercase tracking-widest">
              COMPANY (OPTIONAL)
            </label>
            <input 
              type="text" 
              name="company"
              className="w-full bg-[#0F1115] border border-[#343C43] focus:border-[#5EC6FF] rounded px-4 py-3 text-white font-sans outline-none transition-colors shadow-inner"
              placeholder="Company Inc."
            />
          </div>
        </div>

        {/* Service Interested */}
        <div className="space-y-2">
          <label className="text-[#5EC6FF] font-mono text-[10px] uppercase tracking-widest">
            TARGET SYSTEM (SERVICE)
          </label>
          <select 
            name="service"
            className="w-full bg-[#0F1115] border border-[#343C43] focus:border-[#5EC6FF] rounded px-4 py-3 text-white font-sans outline-none transition-colors shadow-inner appearance-none"
            defaultValue=""
          >
            <option value="" disabled>Select a Service</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-[#5EC6FF] font-mono text-[10px] uppercase tracking-widest flex items-center justify-between">
            TRANSMISSION (MESSAGE)
            {errors.message && <span className="text-[#FFB020]">[{errors.message}]</span>}
          </label>
          <textarea 
            name="message"
            rows={4}
            className={`w-full bg-[#0F1115] border ${errors.message ? 'border-[#FFB020]' : 'border-[#343C43] focus:border-[#5EC6FF]'} rounded px-4 py-3 text-white font-sans outline-none transition-colors shadow-inner resize-none`}
            placeholder="Describe your growth objectives..."
          />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="w-full px-8 py-4 text-white font-mono uppercase tracking-widest bg-[#1D4ED8] hover:bg-[#5EC6FF] hover:text-black transition-all duration-300 glow-blue hover:glow-cyan relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "TRANSMITTING..." : "OPEN CHANNEL"}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>

      </form>
    </div>
  )
}
