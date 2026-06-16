import { Menu } from "lucide-react"
import { useState } from "react"

import { AnimatedContainer } from "@/components/animated-container"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_ITEMS, SECTION_IDS } from "@/content"
import type { SectionId } from "@/content/types"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useScrollTo } from "@/hooks/use-scroll-to"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  id: SectionId
  label: string
  isActive: boolean
  onClick: (id: SectionId) => void
  className?: string
}

function NavLink({ id, label, isActive, onClick, className }: NavLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "font-medium transition-colors",
        isActive
          ? "border-b-2 border-primary pb-0.5 text-primary"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {label}
    </button>
  )
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)
  const scrollTo = useScrollTo()

  const handleBrandClick = () => {
    setSheetOpen(false)
    scrollTo("over-mij")
  }

  const handleNavClick = (id: SectionId) => {
    setSheetOpen(false)
    window.setTimeout(() => scrollTo(id), 150)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur">
      <nav
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-6"
        aria-label="Hoofdnavigatie"
      >
        <AnimatedContainer animation="fadeInDown">
          <button
            type="button"
            onClick={handleBrandClick}
            className="font-heading text-lg font-semibold tracking-tight transition-colors hover:text-primary"
          >
            Assessment 2
          </button>
        </AnimatedContainer>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <NavLink
                id={id}
                label={label}
                isActive={activeId === id}
                onClick={scrollTo}
              />
            </li>
          ))}
        </ul>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu openen"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="px-4">
              <button
                type="button"
                onClick={handleBrandClick}
                className="font-heading text-lg font-semibold tracking-tight transition-colors hover:text-primary"
              >
                Assessment 2
              </button>
            </div>
            <Separator />
            <nav className="flex flex-col px-4" aria-label="Mobiele navigatie">
              {NAV_ITEMS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  aria-current={activeId === id ? "true" : undefined}
                  className={cn(
                    "min-h-12 py-3 text-left text-base font-medium transition-colors",
                    activeId === id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
