"use client"

import { useState } from "react"
import Script from "next/script"

interface FAQ {
  q: string
  a: string
}

interface ServiceFAQProps {
  faqs: FAQ[]
  serviceSlug: string
}

export function ServiceFAQ({ faqs, serviceSlug }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }

  return (
    <section className="py-24 relative z-10 border-t border-[#343C43]/40 bg-black">
      <Script
        id={`faq-${serviceSlug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px bg-[#5ec6ff]" />
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.5)]">
            FAQ
          </h2>
          <span className="w-8 h-px bg-[#5ec6ff]" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#343C43] rounded-xl overflow-hidden transition-colors hover:border-[#5EC6FF]/30"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-display font-bold text-white text-base leading-snug">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-5 h-5 text-[#5EC6FF] transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-[rgba(255,255,255,0.7)] leading-relaxed border-t border-[#343C43]">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
