import { Minus } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface ConsListProps {
  items: string[]
}

export function ConsList({ items }: ConsListProps) {
  const isEmpty = items.length === 0

  return (
    <div className="mt-4">
      <Badge
        variant="outline"
        className="mb-3 border-cons/30 bg-cons/10 text-cons"
      >
        <Minus aria-hidden="true" />
        Verbeterpunten
      </Badge>
      <ul className="space-y-2">
        {isEmpty ? (
          <li className="text-sm text-muted-foreground italic">
            Voeg verbeterpunten toe...
          </li>
        ) : (
          items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Minus
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-cons"
              />
              <span>{item}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
