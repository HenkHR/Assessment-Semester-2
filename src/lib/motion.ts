import type { Transition, Variants } from "framer-motion"

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
}

export const viewportOnce = { once: true, margin: "-80px" } as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export function withReducedMotion(
  variants: Variants,
  shouldReduceMotion: boolean | null,
): Variants {
  if (!shouldReduceMotion) return variants

  const hidden = variants.hidden
  if (typeof hidden !== "object" || hidden === null || Array.isArray(hidden)) {
    return variants
  }

  return {
    ...variants,
    hidden: {
      ...hidden,
      y: 0,
      scale: 1,
    },
  }
}

export function motionTransition(
  shouldReduceMotion: boolean | null,
  delay = 0,
): Transition {
  return shouldReduceMotion ? { duration: 0 } : { ...springTransition, delay }
}
