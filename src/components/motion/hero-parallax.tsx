import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface HeroParallaxProps {
  children: React.ReactNode
  className?: string
}

/** Subtle y-shift on the hero image tied to scroll. Disabled when reduced motion. */
export function HeroParallax({ children, className }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={shouldReduceMotion ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  )
}
