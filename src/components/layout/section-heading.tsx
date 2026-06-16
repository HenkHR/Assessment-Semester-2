import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  children,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {children}
    </h2>
  )
}
