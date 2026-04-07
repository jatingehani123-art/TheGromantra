"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Target, Megaphone, Sparkles, PenTool, Settings, BarChart } from "lucide-react"

const serviceDetails: Record<string, any> = {
  "digital-marketing-strategy": {
    name: "Digital Marketing Strategy",
    icon: <Target className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Develop a comprehensive strategy to drive growth and engage your target audience.",
    benefits: [
      "Tailored strategy based on your business goals",
      "Competitive market analysis",
      "Audience targeting and personas",
      "Multi-channel campaign planning",
      "ROI-focused approach",
    ],
    process: [
      "Discovery & Analysis",
      "Strategy Development",
      "Plan Implementation",
      "Performance Monitoring",
      "Optimization & Scaling",
    ],
  },
  "social-media-management": {
    name: "Social Media Management",
    icon: <Megaphone className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Manage and grow your social media presence across all platforms.",
    benefits: [
      "Multi-platform content management",
      "Audience engagement and community building",
      "Real-time analytics and reporting",
      "Influencer collaboration opportunities",
      "Crisis management support",
    ],
    process: [
      "Account Setup & Optimization",
      "Content Planning",
      "Daily Management",
      "Engagement & Community Building",
      "Analytics & Reporting",
    ],
  },
  "branding-identity": {
    name: "Branding & Identity",
    icon: <Sparkles className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Create a compelling brand identity that resonates with your audience.",
    benefits: [
      "Logo and visual identity design",
      "Brand guidelines and specifications",
      "Consistent brand messaging",
      "Logo package (all formats)",
      "Brand launch strategy",
    ],
    process: [
      "Brand Discovery",
      "Concept Development",
      "Design & Iteration",
      "Brand Guidelines",
      "Launch & Implementation",
    ],
  },
  "content-creation": {
    name: "Content Creation",
    icon: <PenTool className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Create engaging, high-quality content that drives engagement.",
    benefits: [
      "Blog posts and articles",
      "Social media content",
      "Video content creation",
      "Infographics and visuals",
      "Email marketing content",
    ],
    process: [
      "Content Strategy",
      "Research & Planning",
      "Creation & Production",
      "Editing & Optimization",
      "Distribution & Promotion",
    ],
  },
  "campaign-setup": {
    name: "Campaign Setup & Optimization",
    icon: <Settings className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Launch and optimize campaigns for maximum impact and ROI.",
    benefits: [
      "Campaign strategy and planning",
      "Ad creation and optimization",
      "Budget management and allocation",
      "A/B testing",
      "Performance tracking",
    ],
    process: [
      "Objective Definition",
      "Audience & Budget Setup",
      "Creative Development",
      "Campaign Launch",
      "Continuous Optimization",
    ],
  },
  "performance-tracking": {
    name: "Performance Tracking & Reporting",
    icon: <BarChart className="w-24 h-24 text-[#5ec6ff] mx-auto drop-shadow-[0_0_15px_rgba(94,198,255,0.5)]" />,
    description: "Track and analyze your marketing performance with detailed insights.",
    benefits: [
      "Real-time analytics dashboard",
      "Monthly performance reports",
      "ROI tracking and analysis",
      "Competitive benchmarking",
      "Actionable insights and recommendations",
    ],
    process: [
      "Metrics Definition",
      "Dashboard Setup",
      "Data Collection",
      "Analysis & Insights",
      "Reporting & Recommendations",
    ],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const service = serviceDetails[id]

  if (!service) {
    return (
      <main className="bg-black min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-white">Service not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        {/* Hero Banner */}
        <div className="relative mb-16 overflow-hidden">
          <div
            className="absolute inset-0 blur-3xl"
            style={{ background: "linear-gradient(to right, rgba(29, 78, 216, 0.2), rgba(94, 198, 255, 0.2))" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="mb-6 flex justify-center">{service.icon}</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 animate-fade-up">{service.name}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {service.description}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-xl card-glass border border-[#343c43] hover:border-[#5ec6ff]/50 transition-all"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white text-sm"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    ✓
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {service.process.map((step: string, i: number) => (
                <div key={i} className="relative">
                  {i < service.process.length - 1 && (
                    <div
                      className="hidden md:block absolute top-12 left-1/2 w-full h-1 -z-10"
                      style={{ background: "linear-gradient(to right, #1d4ed8, #5ec6ff)" }}
                    />
                  )}
                  <div className="text-center p-6 rounded-xl gradient-accent border border-[#343c43] relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-white font-semibold text-sm">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-xl gradient-accent border border-[#343c43]">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-6">Let's discuss how we can help grow your business.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ background: "var(--gradient-primary)", boxShadow: "rgba(94, 198, 255, 0.5) 0 0 20px" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
