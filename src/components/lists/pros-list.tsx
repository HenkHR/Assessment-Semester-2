import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface ProsListProps {
  items: string[]
}

export function ProsList({ items }: ProsListProps) {
  const isEmpty = items.length === 0

  return (
    <div className="mt-4">
      <Badge
        variant="outline"
        className="mb-3 border-pros/30 bg-pros/10 text-pros"
      >
        <Check aria-hidden="true" />
        Positieve punten
      </Badge>
      <ul className="space-y-2">
        {isEmpty ? (
          <li className="text-sm text-muted-foreground italic">
            Voeg positieve punten toe...
          </li>
        ) : (
          items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-pros"
              />
              <span>{item}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
