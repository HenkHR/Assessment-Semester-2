import { motion, useReducedMotion } from "framer-motion"

import {
  fadeInUp,
  motionTransition,
  viewportOnce,
  withReducedMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={withReducedMotion(fadeInUp, shouldReduceMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={motionTransition(shouldReduceMotion, delay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
