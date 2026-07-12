import { notFound } from "next/navigation"
import Script from "next/script"
import ServiceDetailClient from "@/components/services/service-detail-client"
import SeoPageClient from "@/components/services/seo-page-client"
import SocialPageClient from "@/components/services/social-page-client"
import WebDevPageClient from "@/components/services/webdev-page-client"
import PerformancePageClient from "@/components/services/performance-page-client"
import BrandingPageClient from "@/components/services/branding-page-client"
import { ServiceFAQ } from "@/components/services/service-faq"

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
    stats: { label: "Organic Traffic Growth Potential", value: 312, suffix: "%" },
    faqs: [
      { q: "How long does it take to see SEO results?", a: "Organic rankings typically show meaningful movement within 3–6 months, depending on domain authority and competition. Technical fixes can show immediate crawl improvements within days." },
      { q: "Do you handle both on-page and off-page SEO?", a: "Yes. Our SEO architecture covers technical audits, on-page optimisation, content strategy, and authority link building as a unified system, not isolated tactics." },
      { q: "Will SEO work for my industry?", a: "SEO works for any business where customers search online before buying. We conduct a demand analysis before engagement to confirm search volume and opportunity." },
      { q: "What does a technical SEO audit include?", a: "We audit crawlability, Core Web Vitals, indexation errors, schema markup, internal linking, duplicate content, and mobile compliance — producing a prioritised remediation roadmap." },
      { q: "Can you guarantee first-page rankings?", a: "No ethical agency can guarantee specific rankings. We guarantee a data-driven process that consistently improves organic visibility and measurable traffic growth over time." },
    ],
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
    stats: { label: "Engagement Rate Multiplier", value: 4, suffix: "x" },
    faqs: [
      { q: "Which platforms do you manage?", a: "We cover Instagram, Facebook, LinkedIn, X (Twitter), and YouTube Shorts. Platform prioritisation is based on where your audience is most active." },
      { q: "How much content do you produce per month?", a: "Typically 12–20 posts per platform per month, including carousels, Reels, and static assets. Volume is agreed at the start of each engagement." },
      { q: "Do you write captions and strategy, or just design?", a: "We handle the full content pipeline: strategy, copy, creative design, scheduling, and performance reporting. You approve before anything goes live." },
      { q: "How do you measure social media success?", a: "Primary KPIs include reach, engagement rate, follower growth, and DM/link-click conversions. We provide monthly reports benchmarked against industry averages." },
      { q: "Can you run paid social alongside organic?", a: "Yes. Paid social amplification is a core part of our stack and can be layered on top of organic management for compounding distribution." },
    ],
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
    stats: { label: "Average Conversion Lift", value: 45, suffix: "%" },
    faqs: [
      { q: "What tech stack do you build with?", a: "We primarily build with Next.js, React, and Tailwind CSS for web apps, and Shopify for e-commerce. We choose the stack based on your performance and scalability requirements." },
      { q: "How long does a custom website take?", a: "A typical marketing website takes 4–8 weeks from briefing to launch. E-commerce and complex custom builds take 8–14 weeks depending on feature scope." },
      { q: "Do you optimise for Core Web Vitals and page speed?", a: "Yes — performance is a first-class requirement in every build. We target Lighthouse scores of 90+ across all core metrics before handoff." },
      { q: "Will I be able to edit my website after launch?", a: "Yes. We integrate a headless CMS (Sanity, Contentful, or similar) so your team can update content without developer dependency." },
      { q: "Do you offer ongoing maintenance post-launch?", a: "Yes. We offer retainer-based maintenance plans covering security updates, performance monitoring, bug fixes, and content changes." },
    ],
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
    stats: { label: "ROAS Target Efficiency", value: 250, suffix: "%+" },
    faqs: [
      { q: "What is the minimum ad budget you work with?", a: "We typically work with brands spending a minimum of ₹50,000/month (or USD $600) in ad spend, which allows enough data volume for meaningful optimisation." },
      { q: "Do you manage Google Ads and Meta Ads together?", a: "Yes. Omnichannel campaign management across Google Search, Display, and Meta (Facebook/Instagram) is our standard offering, with unified attribution reporting." },
      { q: "How do you measure ROAS?", a: "We implement server-side conversion tracking and integrate with your CRM or e-commerce platform to attribute revenue accurately — including post-iOS14 Meta conversions." },
      { q: "How quickly do campaigns go live?", a: "Onboarding, tracking setup, and campaign launch typically take 7–10 business days. Results are monitored weekly with bi-weekly strategy reviews." },
      { q: "Do you handle ad creative as well?", a: "Yes. Static and video ad creatives are included in our performance marketing retainers, produced by our in-house design team and A/B tested continuously." },
    ],
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
    stats: { label: "Brand Recall Increase", value: 87, suffix: "%" },
    faqs: [
      { q: "What does a brand identity project include?", a: "Logo system, colour palette, typography hierarchy, icon set, and a brand guidelines document that covers digital and print applications." },
      { q: "Do you do video editing and motion graphics?", a: "Yes. We produce short-form Reels, YouTube edits, motion graphics, and animated brand assets as part of our branding and content packages." },
      { q: "How long does a full brand identity take?", a: "A complete brand identity project typically takes 3–5 weeks, including discovery, concept presentation, revisions, and final file delivery." },
      { q: "Will I receive editable source files?", a: "Yes. You receive all source files (AI, Figma, PSD) along with exported PNG/SVG/PDF versions for every asset we create." },
      { q: "Can you refresh an existing brand without a full rebrand?", a: "Yes. We offer brand evolution packages that modernise your existing identity — updating typography, refining colour use, and updating digital assets without a full overhaul." },
    ],
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
    alternates: { canonical: `https://thegromantra.com/services/${id}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://thegromantra.com/services/${id}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = SERVICES_DATA[id]

  if (!service) {
    notFound()
  }

  // JSON-LD Service structured data
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.tagline,
    "provider": {
      "@type": "Organization",
      "@id": "https://thegromantra.com/#organization",
      "name": "GROMANTRA"
    },
    "url": `https://thegromantra.com/services/${id}`,
    "serviceType": service.name,
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} Services`,
      "itemListElement": service.included.map((item: string, i: number) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    }
  }

  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
    />
  )

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thegromantra.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://thegromantra.com/services" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://thegromantra.com/services/${id}` },
    ],
  }

  const faqSection = service.faqs ? <ServiceFAQ faqs={service.faqs} serviceSlug={id} /> : null
  const breadcrumbScript = (
    <Script
      id={`breadcrumb-${id}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  )

  if (id === "seo") {
    return <>{jsonLdScript}{breadcrumbScript}<SeoPageClient service={service} id={id} />{faqSection}</>
  }
  if (id === "social-media") {
    return <>{jsonLdScript}{breadcrumbScript}<SocialPageClient service={service} id={id} />{faqSection}</>
  }
  if (id === "web-development") {
    return <>{jsonLdScript}{breadcrumbScript}<WebDevPageClient service={service} id={id} />{faqSection}</>
  }
  if (id === "performance-marketing") {
    return <>{jsonLdScript}{breadcrumbScript}<PerformancePageClient service={service} id={id} />{faqSection}</>
  }
  if (id === "branding") {
    return <>{jsonLdScript}{breadcrumbScript}<BrandingPageClient service={service} id={id} />{faqSection}</>
  }

  return <>{jsonLdScript}{breadcrumbScript}<ServiceDetailClient service={service} id={id} />{faqSection}</>
}
