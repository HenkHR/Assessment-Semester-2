import { useReducedMotion } from "framer-motion"
import { useCallback } from "react"

import type { SectionId } from "@/content/types"

export const NAVBAR_OFFSET = 72

export function useScrollTo() {
  const prefersReducedMotion = useReducedMotion()

  return useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id)
      if (!el) return

      const y =
        el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET

      window.scrollTo({
        top: y,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    },
    [prefersReducedMotion],
  )
}
