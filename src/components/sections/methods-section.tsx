import { MethodCard } from "@/components/cards/method-card"
import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { SignatureElement } from "@/components/motion/signature-element"
import { EMPTY_METHOD } from "@/content"
import type { MethodData } from "@/content/types"

interface MethodsSectionProps {
  methods: MethodData[]
}

export function MethodsSection({ methods }: MethodsSectionProps) {
  const [method1, method2] = [
    methods[0] ?? EMPTY_METHOD,
    methods[1] ?? EMPTY_METHOD,
  ]

  return (
    <SectionShell id="methoden">
      <SignatureElement index={2} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading className="mb-12">Toolkit</SectionHeading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <MethodCard
            title={method1.title}
            description={method1.description}
            pros={method1.pros}
            cons={method1.cons}
          />
          <MethodCard
            title={method2.title}
            description={method2.description}
            pros={method2.pros}
            cons={method2.cons}
          />
        </div>
      </div>
    </SectionShell>
  )
}
