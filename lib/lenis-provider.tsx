"use client"

import { ReactNode } from "react"
import { ReactLenis as Lenis } from "lenis/react"

export function ReactLenis({
  children,
  root,
}: {
  children: ReactNode
  root?: boolean
}) {
  return (
    <Lenis root={root} options={{ lerp: 0.05, syncTouch: true }}>
      {children}
    </Lenis>
  )
}
