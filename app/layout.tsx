import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google"
import { ReactLenis } from "@/lib/lenis-provider"
import { SiteLoader } from "@/components/ui/site-loader"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://thegromantra.com"),
  title: "GROMANTRA — Digital Signal Architecture",
  description:
    "We don't make campaigns. We architect signals. Digital marketing, brand architecture, and growth systems for ambitious brands.",
  keywords: ["digital marketing", "signal architecture", "branding", "SEO", "performance marketing", "web development"],
  generator: "Next.js",
  openGraph: {
    title: "GROMANTRA — Digital Signal Architecture",
    description:
      "Architecting digital signals for brands. SEO, social media, web development, performance marketing, branding.",
    url: "https://thegromantra.com",
    siteName: "GROMANTRA",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GROMANTRA — Digital Signal Architecture",
    description:
      "Architecting digital signals for brands. SEO, social media, web development, performance marketing, branding.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} font-sans antialiased bg-black`}
      >
        <ReactLenis root>
          <SiteLoader>
            {/* Global grain overlay */}
            <div className="grain-overlay" aria-hidden="true" />
            {/* Global scanline overlay */}
            <div className="scanline-overlay" aria-hidden="true" />
            {/* JSON-LD Structured Data — Organization + WebSite */}
            <Script
              id="json-ld-organization"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "Organization",
                      "@id": "https://thegromantra.com/#organization",
                      "name": "GROMANTRA",
                      "url": "https://thegromantra.com",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://thegromantra.com/logo.png"
                      },
                      "sameAs": [
                        "https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA==",
                        "https://www.linkedin.com/in/the-gromantra",
                        "https://x.com/thegromantra"
                      ],
                      "description": "Digital signal architecture agency specializing in SEO, performance marketing, web development, social media, and brand identity systems.",
                      "founder": {
                        "@type": "Person",
                        "name": "Jatin Gehani",
                        "jobTitle": "Founder & System Architect"
                      },
                      "foundingDate": "2021",
                      "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "email": "gromantra0957@gmail.com",
                        "availableLanguage": ["English", "Hindi"]
                      }
                    },
                    {
                      "@type": "WebSite",
                      "@id": "https://thegromantra.com/#website",
                      "url": "https://thegromantra.com",
                      "name": "GROMANTRA",
                      "publisher": {
                        "@id": "https://thegromantra.com/#organization"
                      }
                    }
                  ]
                })
              }}
            />
            {children}
            <Analytics />
          </SiteLoader>
        </ReactLenis>
      </body>
    </html>
  )
}
