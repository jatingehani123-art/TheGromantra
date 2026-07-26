import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { POSTS_DATA } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Jatin Gehani - Founder & System Architect in Udaipur, Rajasthan | GROMANTRA",
  description:
    "Jatin Gehani is the founder and system architect of GROMANTRA in Udaipur, Rajasthan, specializing in technical SEO, PPC paid media, custom web development, and growth architectures.",
  keywords: [
    "Jatin Gehani",
    "GROMANTRA founder",
    "digital marketing consultant Udaipur",
    "SEO expert Udaipur",
    "digital marketing Udaipur Rajasthan",
    "growth architect Rajasthan"
  ],
  alternates: { canonical: "https://thegromantra.com/about/jatin-gehani" },
  openGraph: {
    title: "Jatin Gehani - Founder & System Architect in Udaipur, Rajasthan | GROMANTRA",
    description: "Founder of GROMANTRA in Udaipur, Rajasthan. Technical SEO & growth architect.",
    images: [{ url: "/jatin.jpeg", width: 800, height: 800, alt: "Jatin Gehani" }],
    type: "profile",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://thegromantra.com/about/jatin-gehani",
  name: "Jatin Gehani",
  jobTitle: "Founder & System Architect",
  description:
    "Jatin Gehani is the founder of GROMANTRA, specialising in technical growth infrastructures, automated SEO, high-performance acquisition models, and brand identity systems for ambitious brands.",
  url: "https://thegromantra.com/about/jatin-gehani",
  image: "https://thegromantra.com/jatin.jpeg",
  worksFor: {
    "@type": "Organization",
    "@id": "https://thegromantra.com/#organization",
    name: "GROMANTRA",
  },
  sameAs: [
    "https://www.linkedin.com/in/the-gromantra",
    "https://x.com/gromantra",
    "https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA==",
  ],
  knowsAbout: [
    "Technical SEO",
    "Performance Marketing",
    "Brand Architecture",
    "Growth Systems",
    "Web Development",
    "Digital Signal Architecture",
  ],
}

const posts = Object.values(POSTS_DATA)

export default function JatinGehaniPage() {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10" style={{ zIndex: -10, pointerEvents: 'none' }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" style={{ zIndex: -10, pointerEvents: 'none' }} />

      <Navbar />

      <div className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-12 font-mono text-[10px] uppercase tracking-widest text-[rgba(255,255,255,0.5)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#5EC6FF] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[#5EC6FF] transition-colors">About</Link>
            <span>/</span>
            <span className="text-[#5EC6FF]">Jatin Gehani</span>
          </nav>

          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
            {/* Headshot */}
            <div className="shrink-0">
              <div className="w-48 h-48 rounded-2xl border border-[#5EC6FF]/30 overflow-hidden relative">
                <Image
                  src="/jatin.jpeg"
                  alt="Jatin Gehani - Founder of GROMANTRA"
                  fill
                  className="object-cover"
                  priority
                  sizes="192px"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-[#5EC6FF] font-mono text-xs tracking-widest mb-3 uppercase">
                // OPERATOR_PROFILE
              </p>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase tracking-wide mb-4">
                Jatin Gehani
              </h1>
              <p className="text-[#5EC6FF] font-mono text-sm mb-6">Founder &amp; System Architect &mdash; GROMANTRA (Udaipur, Rajasthan)</p>
              <p className="text-[rgba(255,255,255,0.75)] leading-relaxed mb-6 max-w-xl">
                Jatin Gehani is the founder of GROMANTRA in Udaipur, Rajasthan, and the primary architect behind its client growth systems. Specialising in <Link href="/services/seo" className="text-[#5EC6FF] underline hover:text-white transition-colors">technical SEO infrastructures</Link>, <Link href="/services/performance-marketing" className="text-[#5EC6FF] underline hover:text-white transition-colors">paid acquisition frameworks</Link>, and <Link href="/services/branding" className="text-[#5EC6FF] underline hover:text-white transition-colors">brand identity ecosystems</Link>, he builds marketing engines that compound in value over time &mdash; not campaigns that evaporate the moment the budget runs dry.
              </p>
              <p className="text-[rgba(255,255,255,0.65)] leading-relaxed mb-8 max-w-xl">
                Since 2021, GROMANTRA has empowered businesses across Udaipur, Rajasthan, Jaipur, and globally, delivering measurable growth in organic traffic, customer acquisition efficiency, and digital brand equity through custom <Link href="/services/web-development" className="text-[#5EC6FF] underline hover:text-white transition-colors">web engineering</Link>. Jatin&apos;s approach treats marketing as an engineering discipline &mdash; systems-first, data-driven, and built for permanence.
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-3">
                {[
                  "Technical SEO",
                  "Performance Marketing",
                  "Brand Architecture",
                  "Growth Systems",
                  "Web Engineering",
                  "Signal Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-[#5EC6FF]/30 text-[#5EC6FF] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Articles by Jatin */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#5ec6ff]" />
              <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.5)]">
                Transmissions by Jatin
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="bg-[#171A1F] border border-[#343C43] rounded-xl p-6 transition-all duration-300 hover:border-[#5EC6FF]/50 hover:shadow-[0_0_20px_rgba(94,198,255,0.1)] h-full flex flex-col">
                    <span className="font-mono text-[10px] text-[#5EC6FF] mb-3 block">
                      {post.category.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[#5EC6FF] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="font-mono text-[10px] text-[#5EC6FF]/70 mt-4 block">
                      Read Transmission &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-20 pt-12 border-t border-[#343C43] text-center">
            <p className="text-[rgba(255,255,255,0.6)] mb-6 font-mono text-sm">
              Ready to engineer your growth? Open a channel.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 font-display font-bold text-sm tracking-[0.15em] uppercase border-2 border-[#5ec6ff] text-[#5ec6ff] transition-all duration-300 hover:bg-[#5ec6ff] hover:text-black hover:shadow-[0_0_30px_rgba(94,198,255,0.4)]"
            >
              INITIATE CONTACT
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
