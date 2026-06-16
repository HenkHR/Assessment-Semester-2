import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface BookSubsectionProps {
  title: string
  content: string
  emptyFallback: string
}

export function BookSubsection({
  title,
  content,
  emptyFallback,
}: BookSubsectionProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="font-heading text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content ? (
          <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
            {content}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">{emptyFallback}</p>
        )}
      </CardContent>
    </Card>
  )
}
