"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Social {
  name: string
  url: string
  icon?: React.ReactNode
  popupIcon?: React.ReactNode
}

interface SocialLinksProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'socials'> {
  socials: Social[]
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
  const [rotation, setRotation] = React.useState<number>(0)
  const [clicked, setClicked] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  }

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 200)
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [clicked])

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-4 md:gap-8", className)}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-5 py-2 transition-opacity duration-200 flex items-center gap-2 hover:scale-110 hover:shadow-lg transition-transform",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-50"
              : "opacity-100"
          )}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name)
            setRotation(Math.random() * 20 - 10)
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setClicked(true)
          }}
        >
          {social.icon && <span className="text-gray-400 group-hover:text-white transition-colors">{social.icon}</span>}
          <span className="block text-lg font-medium tracking-wide text-gray-400 group-hover:text-white transition-colors">{social.name}</span>
          
          <AnimatePresence>
            {isMounted && hoveredSocial === social.name && social.popupIcon && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center pointer-events-none z-50"
                animate={animation}
              >
                <motion.div
                  className="flex items-center justify-center size-20 rounded-2xl bg-[#1d4ed8]/20 border border-[#5ec6ff]/30 shadow-2xl text-[#5ec6ff] backdrop-blur-md"
                  initial={{
                    y: -30,
                    rotate: rotation,
                    opacity: 0,
                    filter: "blur(4px)",
                  }}
                  animate={{ y: -60, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {social.popupIcon}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  )
}
