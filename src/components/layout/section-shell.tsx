import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import type { SectionId } from "@/content/types"

interface SectionShellProps {
  id: SectionId
  children: ReactNode
  className?: string
}

export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[4.5rem] px-6 py-16",
        id === "over-mij" && "pt-24",
        className,
      )}
    >
      {children}
    </section>
  )
}
