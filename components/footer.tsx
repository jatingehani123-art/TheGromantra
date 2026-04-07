"use client"
import Link from "next/link"
import Image from "next/image"
import { SocialLinks } from "@/components/ui/social-links"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

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
  return (
    <footer className="relative bg-black border-t border-[#343c43] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(29, 78, 216, 0.1), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="The Gromantra Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-white font-semibold">The Gromantra</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Digital marketing solutions for ambitious startups.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-3">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">
                Features
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">
                Pricing
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm block">
                Services
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-3">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm block">
                About Us
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm block">
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-3">
              <Link href="/contact" className="text-gray-400 hover:text-[#5ec6ff] transition-colors text-sm block">
                Get in touch
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#5ec6ff] transition-colors text-sm block">
                Help Center
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#5ec6ff] transition-colors text-sm block">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Connected Social Links */}
        <div className="mt-16 pt-16 flex flex-col items-center justify-center border-t border-[#343c43]">
          <h4 className="text-white/80 font-semibold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
          <SocialLinks socials={socials} className="gap-2 md:gap-8" />
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-[#343c43]">
          <p className="text-center text-gray-500 text-sm">
            Made with <span className="text-[#5ec6ff]">❤️</span> by TheGromantra · Made in India
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} The Gromantra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
