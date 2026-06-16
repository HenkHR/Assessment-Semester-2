import { useEffect, useState } from "react"

import type { SectionId } from "@/content/types"

export function useScrollSpy(
  sectionIds: SectionId[],
  options?: { rootMargin?: string; threshold?: number },
): SectionId | null {
  const { rootMargin = "-20% 0px -60% 0px", threshold = 0 } = options ?? {}
  const [activeId, setActiveId] = useState<SectionId | null>(
    sectionIds[0] ?? null,
  )

  useEffect(() => {
    if (sectionIds.length === 0) return

    const ratios = new Map<string, number>()

    const updateActive = () => {
      if (window.scrollY < 50) {
        setActiveId(sectionIds[0])
        return
      }

      if (ratios.size === 0) return

      let bestId = sectionIds[0]
      let bestRatio = -1

      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id as SectionId
        }
      }

      setActiveId(bestId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio)
          } else {
            ratios.delete(id)
          }
        }
        updateActive()
      },
      { rootMargin, threshold },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveId(sectionIds[0])
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, rootMargin, threshold])

  return activeId
}
