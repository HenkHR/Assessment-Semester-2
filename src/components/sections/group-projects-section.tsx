import { ProjectCard } from "@/components/cards/project-card"
import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { SignatureElement } from "@/components/motion/signature-element"
import { EMPTY_PROJECT } from "@/content"
import type { GroupProjectData } from "@/content/types"

interface GroupProjectsSectionProps {
  projects: GroupProjectData[]
}

export function GroupProjectsSection({ projects }: GroupProjectsSectionProps) {
  const [project1, project2] = [
    projects[0] ?? EMPTY_PROJECT,
    projects[1] ?? EMPTY_PROJECT,
  ]

  return (
    <SectionShell id="groepsprojecten" className="bg-section-alt/40">
      <SignatureElement index={3} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading className="mb-12">Projecten</SectionHeading>
        <div className="space-y-8">
          <ProjectCard
            title={project1.title}
            description={project1.description}
            pros={project1.pros}
            cons={project1.cons}
            goalsReflection={project1.goalsReflection}
          />
          <ProjectCard
            title={project2.title}
            description={project2.description}
            pros={project2.pros}
            cons={project2.cons}
            goalsReflection={project2.goalsReflection}
          />
        </div>
      </div>
    </SectionShell>
  )
}
