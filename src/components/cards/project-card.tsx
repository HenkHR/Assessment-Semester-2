import { ConsList } from "@/components/lists/cons-list"
import { ProsList } from "@/components/lists/pros-list"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProjectCardProps {
  title: string
  description: string
  pros: string[]
  cons: string[]
  goalsReflection: string
}

export function ProjectCard({
  title,
  description,
  pros,
  cons,
  goalsReflection,
}: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {description ? (
          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
            {description}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProsList items={pros} />
          <ConsList items={cons} />
        </div>

        <Separator />

        <div>
          <h4 className="font-heading mb-3 text-lg font-semibold">
            Reflectie op Eerdere Doelen/Doelstelling
          </h4>
          {goalsReflection ? (
            <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
              {goalsReflection}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Voeg een reflectie op eerdere doelen toe...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
