import { motion, useReducedMotion } from "framer-motion"

import {
  motionTransition,
  staggerContainer,
  staggerItem,
  viewportOnce,
  withReducedMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  /** When false, animates on mount (page-load sequences). Default: viewport entry. */
  onView?: boolean
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  onView = true,
}: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion()
  const variants = withReducedMotion(
    staggerContainer(stagger, delay),
    shouldReduceMotion,
  )

  const shared = {
    variants,
    initial: "hidden" as const,
    transition: motionTransition(shouldReduceMotion),
  }

  if (onView) {
    return (
      <motion.div
        {...shared}
        whileInView="visible"
        viewport={viewportOnce}
        className={cn(className)}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div {...shared} animate="visible" className={cn(className)}>
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={withReducedMotion(staggerItem, shouldReduceMotion)}
      transition={motionTransition(shouldReduceMotion)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
