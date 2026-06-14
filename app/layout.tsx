import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google"
import { ReactLenis } from "@/lib/lenis-provider"
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

export const metadata: Metadata = {
  title: "GROMANTRA — Digital Signal Architecture",
  description:
    "We don't make campaigns. We architect signals. Digital marketing, brand architecture, and growth systems for ambitious brands.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} font-sans antialiased bg-black`}
        suppressHydrationWarning
      >
        <ReactLenis root>
          {/* Global grain overlay */}
          <div className="grain-overlay" aria-hidden="true" />
          {/* Global scanline overlay */}
          <div className="scanline-overlay" aria-hidden="true" />
          {children}
          <Analytics />
        </ReactLenis>
      </body>
    </html>
  )
}
