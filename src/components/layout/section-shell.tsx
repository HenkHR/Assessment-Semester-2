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
        "relative scroll-mt-[4.5rem] py-16",
        id === "over-mij" && "pt-24 pb-16",
        className,
      )}
    >
      {children}
    </section>
  )
}
