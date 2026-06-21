import { notFound } from "next/navigation"
import ServiceDetailClient from "@/components/services/service-detail-client"

// Centralized Services Data
const SERVICES_DATA: Record<string, any> = {
  "seo": {
    name: "SEO",
    tagline: "High-intent search architectures that capture demand.",
    themeColor: "rgba(94, 198, 255, 0.2)",
    included: [
      "Technical SEO Audits",
      "On-Page Optimization",
      "Content Strategy & Gap Analysis",
      "High-Authority Link Building",
      "Local SEO Optimization",
      "Continuous Analytics & Reporting"
    ],
    stats: { label: "Organic Traffic Growth Potential", value: 312, suffix: "%" }
  },
  "social-media": {
    name: "Social Media & Content",
    tagline: "Community-driven content frameworks that convert.",
    themeColor: "rgba(29, 78, 216, 0.2)",
    included: [
      "Cross-Platform Content Calendars",
      "Reels & Short-form Video Generation",
      "Proactive Community Management",
      "Influencer & Creator Coordination",
      "Paid Social Campaign Setup",
      "Trend Monitoring & Engagement"
    ],
    stats: { label: "Engagement Rate Multiplier", value: 4, suffix: "x" }
  },
  "web-development": {
    name: "Web Development",
    tagline: "Lightning-fast, conversion-optimized digital platforms.",
    themeColor: "rgba(94, 198, 255, 0.2)",
    included: [
      "High-Converting Landing Pages",
      "Full-Stack Custom Websites",
      "E-commerce & Shopify Solutions",
      "Core Web Vitals Optimization",
      "Headless CMS Integration",
      "Ongoing Maintenance & Security"
    ],
    stats: { label: "Average Conversion Lift", value: 45, suffix: "%" }
  },
  "performance-marketing": {
    name: "Performance Marketing",
    tagline: "Data-driven ad campaigns designed for immediate ROI.",
    themeColor: "rgba(29, 78, 216, 0.2)",
    included: [
      "Google Search & Display Ads",
      "Meta (Facebook/IG) Campaigns",
      "Omnichannel Campaign Strategy",
      "Continuous A/B Testing",
      "Advanced Conversion Tracking",
      "Dynamic Budget Optimization"
    ],
    stats: { label: "ROAS Target Efficiency", value: 250, suffix: "%+" }
  },
  "branding": {
    name: "Branding (Design/Video)",
    tagline: "Kinetic brand identities built for digital ecosystems.",
    themeColor: "rgba(94, 198, 255, 0.2)",
    included: [
      "Kinetic Brand Identity & Logos",
      "Social Media Aesthetic Guidelines",
      "High-Retention Video Editing",
      "Motion Graphics & Micro-animations",
      "Comprehensive Brand Guidelines",
      "Packaging & Print Readiness"
    ],
    stats: { label: "Brand Recall Increase", value: 87, suffix: "%" }
  }
}

export async function generateStaticParams() {
  return [
    { id: "seo" },
    { id: "social-media" },
    { id: "web-development" },
    { id: "performance-marketing" },
    { id: "branding" }
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = SERVICES_DATA[id]
  if (!service) return {}

  const metaMap: Record<string, { title: string; description: string; keywords: string[] }> = {
    "seo": {
      title: "Technical SEO & Organic Search Architectures | GROMANTRA",
      description: "Automated, high-intent organic search frameworks. We build crawlable systems that rank in Google search, AI Overviews, and LLMs.",
      keywords: ["Technical SEO", "Organic Search Architecture", "GEO", "Core Web Vitals", "SEO Audit"]
    },
    "social-media": {
      title: "Social Media & Community Content Frameworks | GROMANTRA",
      description: "Compounding organic social systems and short-form video generation that build engaged customer bases and organic distribution channels.",
      keywords: ["Social Media Marketing", "Content Strategy", "Short-form Video", "Community Building"]
    },
    "web-development": {
      title: "Conversion-Optimized Custom Web Engineering | GROMANTRA",
      description: "Lightning-fast, highly responsive websites built using Next.js and React. Engineered for maximum speed, security, and conversion rate optimization.",
      keywords: ["Web Development", "Next.js Web Developer", "Page Speed Optimization", "Conversion Rate Optimization"]
    },
    "performance-marketing": {
      title: "Performance Marketing & Paid Acquisition Systems | GROMANTRA",
      description: "Data-driven ad campaigns designed for immediate ROI and aggressive scaling. Search, display, social, and remarketing systems.",
      keywords: ["Performance Marketing", "Google Ads Specialist", "Meta Ads", "Paid Social Advertising"]
    },
    "branding": {
      title: "Kinetic Brand Identity & Digital Asset Design | GROMANTRA",
      description: "Brand guidelines, logos, motion graphics, and high-retention video assets engineered specifically for modern digital ecosystems.",
      keywords: ["Brand Identity Design", "Logo Design", "Video Editing", "Motion Graphics"]
    }
  }

  const meta = metaMap[id] || {
    title: `${service.name} Systems | GROMANTRA`,
    description: service.tagline,
    keywords: ["Digital Marketing", service.name]
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    }
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = SERVICES_DATA[id]

  if (!service) {
    notFound()
  }

  return <ServiceDetailClient service={service} id={id} />
}
