import { motion, useReducedMotion } from "framer-motion"

import {
  motionTransition,
  scaleIn,
  withReducedMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

interface PageLoadScaleProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/** Hero image scale-in — first beat of the page-load sequence. */
export function PageLoadScale({
  children,
  className,
  delay = 0,
}: PageLoadScaleProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={withReducedMotion(scaleIn, shouldReduceMotion)}
      initial="hidden"
      animate="visible"
      transition={motionTransition(shouldReduceMotion, delay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface PageLoadFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/** Sequential fade-in for hero text blocks after the image. */
export function PageLoadFade({
  children,
  className,
  delay = 0,
}: PageLoadFadeProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={withReducedMotion(
        {
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        },
        shouldReduceMotion,
      )}
      initial="hidden"
      animate="visible"
      transition={motionTransition(shouldReduceMotion, delay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
