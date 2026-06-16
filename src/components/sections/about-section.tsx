import { HeroParallax } from "@/components/motion/hero-parallax"
import {
  PageLoadFade,
  PageLoadScale,
} from "@/components/motion/page-load-sequence"
import { SignatureElement } from "@/components/motion/signature-element"
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children"
import { SectionShell } from "@/components/layout/section-shell"
import type { AboutData } from "@/content/types"

interface AboutSectionProps {
  data: AboutData
}

export function AboutSection({ data }: AboutSectionProps) {
  const { imageSrc, imageAlt, title, interests, strengths } = data

  return (
    <SectionShell id="over-mij" className="bg-section-alt/40">
      <SignatureElement index={1} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <HeroParallax className="flex w-full justify-center md:w-1/3">
            <PageLoadScale>
              <div className="size-64 overflow-hidden rounded-full border-4 border-border shadow-lg">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={256}
                  height={256}
                  loading="eager"
                  className="size-full object-cover"
                />
              </div>
            </PageLoadScale>
          </HeroParallax>

          <div className="w-full md:w-2/3">
            <StaggerChildren onView={false} delay={0.35} stagger={0.12}>
              <StaggerItem>
                <h1 className="heading-display mb-6 text-4xl md:text-5xl">
                  {title}
                </h1>
              </StaggerItem>
            </StaggerChildren>

            <PageLoadFade delay={0.65} className="space-y-4 text-lg leading-relaxed">
              <div>
                <h2 className="font-heading mb-3 text-2xl font-semibold">
                  Mijn Interesses
                </h2>
                <p className="whitespace-pre-line text-muted-foreground">
                  {interests}
                </p>
              </div>
              {strengths ? (
                <div>
                  <h2 className="font-heading mt-6 mb-3 text-2xl font-semibold">
                    Waar ik goed in ben
                  </h2>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {strengths}
                  </p>
                </div>
              ) : null}
            </PageLoadFade>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
