"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted locally:", formData)
    alert(`Thank you, ${formData.name}! Your message was successfully recorded locally.\n\n(Note: This form is currently capturing data in the browser environment. To send real emails, you would connect this handleSubmit function to an API endpoint like Resend, SendGrid, or your backend database).`)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 text-balance animate-fade-up">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info + Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a href="mailto:hello@marketflow.io" className="text-[#5ec6ff] hover:underline">
                  hello@marketflow.io
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-[#5ec6ff] hover:underline">
                  +1 (234) 567-890
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                <p className="text-gray-400">
                  123 Marketing Street
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-12 h-12 rounded-full border border-[#343c43] flex items-center justify-center text-gray-400 hover:text-[#5ec6ff] hover:border-[#5ec6ff]/50 transition-all"
                    >
                      {social.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 rounded-xl card-glass border border-[#343c43] animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#343c43] text-white focus:border-[#5ec6ff]/50 focus:outline-none focus:ring-1 focus:ring-[#5ec6ff]/30 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#343c43] text-white focus:border-[#5ec6ff]/50 focus:outline-none focus:ring-1 focus:ring-[#5ec6ff]/30 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#343c43] text-white focus:border-[#5ec6ff]/50 focus:outline-none focus:ring-1 focus:ring-[#5ec6ff]/30 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#343c43] text-white focus:border-[#5ec6ff]/50 focus:outline-none focus:ring-1 focus:ring-[#5ec6ff]/30 transition-all resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-[#5ec6ff]/50 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
