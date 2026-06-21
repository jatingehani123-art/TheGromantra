"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ContactForm } from "@/components/ui/contact-form"
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />
      
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center md:text-left">
            <p className="text-[#5EC6FF] font-mono text-sm tracking-widest mb-4 uppercase">
              // COMM_LINK: SECURE
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
              Open A Channel
            </h1>
            <p className="mt-4 text-[rgba(255,255,255,0.7)] max-w-2xl text-lg">
              Ready to engineer your growth? Initialize a connection below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Info Side Panel */}
            <div className="space-y-12">
              <div>
                <h3 className="font-mono text-[#5EC6FF] text-xs uppercase tracking-widest mb-6 border-b border-[#343C43] pb-2">
                  Direct Line
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#171A1F] border border-[#343C43] flex items-center justify-center text-[#5EC6FF]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.5)] font-mono text-[10px] mb-1">EMAIL</p>
                      <a href="mailto:hello@gromantra.com" className="text-white hover:text-[#5EC6FF] transition-colors">hello@gromantra.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#171A1F] border border-[#343C43] flex items-center justify-center text-[#5EC6FF]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.5)] font-mono text-[10px] mb-1">PHONE</p>
                      <a href="tel:+15551234567" className="text-white hover:text-[#5EC6FF] transition-colors">+1 (555) 123-4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#171A1F] border border-[#343C43] flex items-center justify-center text-[#5EC6FF]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.5)] font-mono text-[10px] mb-1">HQ</p>
                      <p className="text-white">Global Remote<br/><span className="text-[rgba(255,255,255,0.5)] text-sm">Operator Active Worldwide</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[#5EC6FF] text-xs uppercase tracking-widest mb-6 border-b border-[#343C43] pb-2">
                  Response Protocol
                </h3>
                <div className="bg-[#171A1F] border border-[#343C43] rounded p-4 text-sm text-[rgba(255,255,255,0.8)] leading-relaxed relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#1D4ED8]" />
                  <p>System normally responds within <span className="text-[#5EC6FF] font-bold">24 hours</span>. Priority processing applied to active clients.</p>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[#5EC6FF] text-xs uppercase tracking-widest mb-6 border-b border-[#343C43] pb-2">
                  Social Network
                </h3>
                <div className="flex gap-4">
                  {[
                    { Icon: Twitter, href: "https://twitter.com" },
                    { Icon: Linkedin, href: "https://linkedin.com" },
                    { Icon: Instagram, href: "https://instagram.com" },
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-[#171A1F] border border-[#343C43] flex items-center justify-center text-white hover:border-[#5EC6FF] hover:text-[#5EC6FF] hover:glow-cyan transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
