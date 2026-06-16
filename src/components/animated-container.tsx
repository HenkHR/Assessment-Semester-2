import { motion, useReducedMotion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} as const satisfies Record<string, Variants>

type AnimationName = keyof typeof animations

interface AnimatedContainerProps {
  children: React.ReactNode
  animation?: AnimationName
  delay?: number
  className?: string
}

export function AnimatedContainer({
  children,
  animation = "fadeInUp",
  delay = 0,
  className,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  const selected = animations[animation]

  const variants: Variants = {
    hidden: {
      ...selected.hidden,
      ...(shouldReduceMotion && "y" in selected.hidden ? { y: 0 } : {}),
      ...(shouldReduceMotion && "scale" in selected.hidden ? { scale: 1 } : {}),
    },
    visible: selected.visible,
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay,
            }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
