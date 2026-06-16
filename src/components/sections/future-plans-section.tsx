import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { SignatureElement } from "@/components/motion/signature-element"
import { Card, CardContent } from "@/components/ui/card"
import type { FuturePlansData } from "@/content/types"

interface FuturePlansSectionProps {
  plans: FuturePlansData
}

export function FuturePlansSection({ plans }: FuturePlansSectionProps) {
  return (
    <SectionShell id="toekomstplannen" className="bg-section-alt/40">
      <SignatureElement index={5} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading className="mb-12">Toekomst</SectionHeading>

        <Card className="mx-auto max-w-4xl">
          <CardContent className="py-2">
            {plans ? (
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {plans}
              </p>
            ) : (
              <p className="text-lg text-muted-foreground italic">
                Voeg je toekomstplannen toe voor verdere ontwikkeling in dit
                vakgebied...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  )
}
