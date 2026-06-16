import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { SignatureElement } from "@/components/motion/signature-element"
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children"
import { BookSubsection } from "@/components/sections/book-subsection"
import type { BookData } from "@/content/types"

interface BookSectionProps {
  data: BookData
}

export function BookSection({ data }: BookSectionProps) {
  const { imageSrc, imageAlt, title, about, learned, applied, futureUse } = data

  return (
    <SectionShell id="boek">
      <SignatureElement index={4} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading className="mb-12">Boek</SectionHeading>
        </ScrollReveal>

        <div className="flex flex-col items-start gap-8 md:flex-row">
          <ScrollReveal className="flex w-full justify-center md:w-1/3">
            <div className="h-96 w-64 overflow-hidden rounded-lg border border-border shadow-lg">
              <img
                src={imageSrc}
                alt={imageAlt}
                width={256}
                height={384}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </ScrollReveal>

          <StaggerChildren className="w-full space-y-6 md:w-2/3">
            {title ? (
              <StaggerItem>
                <h3 className="font-heading text-3xl font-bold">{title}</h3>
              </StaggerItem>
            ) : null}

            <StaggerItem>
              <BookSubsection
                title="Waar het boek over gaat"
                content={about}
                emptyFallback="Voeg een beschrijving van het boek toe..."
              />
            </StaggerItem>
            <StaggerItem>
              <BookSubsection
                title="Wat ik heb geleerd"
                content={learned}
                emptyFallback="Voeg wat je hebt geleerd toe..."
              />
            </StaggerItem>
            <StaggerItem>
              <BookSubsection
                title="Hoe ik het heb toegepast"
                content={applied}
                emptyFallback="Voeg toe hoe je het hebt toegepast..."
              />
            </StaggerItem>
            <StaggerItem>
              <BookSubsection
                title="Hoe ik het ga gebruiken"
                content={futureUse}
                emptyFallback="Voeg toe hoe je het gaat gebruiken..."
              />
            </StaggerItem>
          </StaggerChildren>
        </div>
      </div>
    </SectionShell>
  )
}
