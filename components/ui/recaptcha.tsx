"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface ReCAPTCHAProps {
  onVerify: (token: string) => void
  onExpired?: () => void
}

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad?: () => void
  }
}

export function ReCAPTCHA({ onVerify, onExpired }: ReCAPTCHAProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  // Use site key from env or Google's official test key for local/demo testing
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMieGNQ_MXjiZKhI"

  useEffect(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      setLoaded(true)
    } else {
      window.onRecaptchaLoad = () => {
        setLoaded(true)
      }
    }
  }, [])

  useEffect(() => {
    if (loaded && containerRef.current && widgetIdRef.current === null && window.grecaptcha?.render) {
      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token: string) => {
            onVerify(token)
          },
          "expired-callback": () => {
            if (onExpired) onExpired()
          },
        })
      } catch (err) {
        console.error("reCAPTCHA render error:", err)
      }
    }
  }, [loaded, siteKey, onVerify, onExpired])

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
        strategy="lazyOnload"
      />
      <div ref={containerRef} className="min-h-[78px] min-w-[304px]" />
    </div>
  )
}
