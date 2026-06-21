"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for solo entrepreneurs",
    features: ["Up to 3 social channels", "Basic analytics", "Content calendar", "Email support", "2 campaigns/month"],
    recommended: false,
  },
  {
    name: "Growth",
    price: "$79",
    period: "/month",
    description: "For growing startups",
    features: [
      "Unlimited social channels",
      "Advanced analytics",
      "AI content creation",
      "Priority support",
      "Unlimited campaigns",
      "Team collaboration",
    ],
    recommended: true,
  },
  {
    name: "Business",
    price: "$199",
    period: "/month",
    description: "For enterprise teams",
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced API access",
      "White-label options",
      "Custom workflows",
    ],
    recommended: false,
  },
]

export default function PricingSection() {
  return (
    <section className="relative py-12 md:py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(94, 198, 255, 0.15), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg">
            Choose the plan that fits your needs. Always flexible, always affordable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            // Using a custom framer-motion approach for the continuous pulse
            const recommendedAnimationProps = plan.recommended
              ? {
                  animate: {
                    boxShadow: [
                      "rgba(94, 198, 255, 0.2) 0 0 20px",
                      "rgba(94, 198, 255, 0.4) 0 0 40px",
                      "rgba(94, 198, 255, 0.2) 0 0 20px",
                    ],
                  },
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
                }
              : {}

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, scale: plan.recommended ? 1.05 : 1.02, transition: { duration: 0.3 } }}
                {...recommendedAnimationProps}
                className={`pricing-card relative rounded-2xl border overflow-hidden ${
                  plan.recommended ? "border-[#5ec6ff]/50 md:scale-105" : "border-[#343c43]"
                } hover:border-[#5ec6ff]/50 hover:bg-[#0a0a0a]/90`}
                style={{
                  background: plan.recommended ? "rgba(29, 78, 216, 0.1)" : "rgba(10, 10, 10, 1)",
                }}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-primary)" }} />
                )}

                <div className="p-8">
                  {plan.recommended && (
                    <div
                      className="mb-4 inline-block px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      Recommended
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full block text-center px-6 py-3 rounded-lg font-semibold mb-8 transition-all duration-300 ${
                      plan.recommended
                        ? "text-white hover:shadow-lg"
                        : "border border-[#5ec6ff]/30 text-white hover:bg-[#1d4ed8]/10"
                    }`}
                    style={{
                      background: plan.recommended ? "var(--gradient-primary)" : "transparent",
                      boxShadow: plan.recommended ? "rgba(94, 198, 255, 0.5) 0 0 20px" : "none",
                    }}
                  >
                    Get Started
                  </Link>

                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                          style={{ background: "var(--gradient-primary)" }}
                        >
                          ✓
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
