import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google"
import { ReactLenis } from "@/lib/lenis-provider"
import { SiteLoader } from "@/components/ui/site-loader"
import { DisableDevTools } from "@/components/ui/disable-devtools"
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
  title: "GROMANTRA — Best Digital Marketing & Technical SEO Agency in Udaipur, Rajasthan",
  description:
    "GROMANTRA is a premier digital marketing agency in Udaipur, Rajasthan. Founded by Jatin Gehani, we architect high-performance technical SEO, Meta/Google PPC ad campaigns, custom web development, and brand growth systems.",
  keywords: [
    "digital marketing agency in Udaipur",
    "best SEO company in Udaipur",
    "digital marketing agency Rajasthan",
    "web development company Udaipur",
    "PPC agency Udaipur",
    "SEO services Rajasthan",
    "social media marketing Udaipur",
    "Jatin Gehani GROMANTRA",
    "growth marketing agency India"
  ],
  generator: "Next.js",
  openGraph: {
    title: "GROMANTRA — Digital Marketing Agency in Udaipur, Rajasthan",
    description:
      "Leading growth architecture & digital marketing agency in Udaipur, Rajasthan. High-intent SEO, Meta/Google Ads, custom web engineering & brand strategy.",
    url: "https://thegromantra.com",
    siteName: "GROMANTRA",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GROMANTRA — Digital Marketing Agency in Udaipur, Rajasthan",
    description:
      "Leading growth architecture & digital marketing agency in Udaipur, Rajasthan. High-intent SEO, Meta/Google Ads, custom web engineering & brand strategy.",
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
        <DisableDevTools />
        <ReactLenis root>
          <SiteLoader>
            {/* Global grain overlay */}
            <div className="grain-overlay" aria-hidden="true" />
            {/* Google Analytics (gtag.js) */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-6PHGBC72KC"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-6PHGBC72KC');
                `,
              }}
            />
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
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Udaipur",
                        "addressRegion": "Rajasthan",
                        "addressCountry": "IN"
                      },
                      "areaServed": ["Udaipur", "Rajasthan", "India", "Global"],
                      "sameAs": [
                        "https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA==",
                        "https://www.linkedin.com/in/the-gromantra",
                        "https://x.com/thegromantra"
                      ],
                      "description": "Premier digital marketing & growth engineering agency based in Udaipur, Rajasthan. Specializing in technical SEO, PPC management, web development, and social media architecture.",
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
