import { ConsList } from "@/components/lists/cons-list"
import { ProsList } from "@/components/lists/pros-list"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MethodCardProps {
  title: string
  description: string
  pros: string[]
  cons: string[]
}

export function MethodCard({
  title,
  description,
  pros,
  cons,
}: MethodCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {description ? (
          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
            {description}
          </p>
        ) : null}
        <ProsList items={pros} />
        <ConsList items={cons} />
      </CardContent>
    </Card>
  )
}
