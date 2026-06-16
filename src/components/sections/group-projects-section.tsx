import { ProjectCard } from "@/components/cards/project-card"
import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { SignatureElement } from "@/components/motion/signature-element"
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children"
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
        <ScrollReveal>
          <SectionHeading className="mb-12">Projecten</SectionHeading>
        </ScrollReveal>
        <StaggerChildren className="space-y-8">
          <StaggerItem>
            <ProjectCard
              title={project1.title}
              description={project1.description}
              pros={project1.pros}
              cons={project1.cons}
              goalsReflection={project1.goalsReflection}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard
              title={project2.title}
              description={project2.description}
              pros={project2.pros}
              cons={project2.cons}
              goalsReflection={project2.goalsReflection}
            />
          </StaggerItem>
        </StaggerChildren>
      </div>
    </SectionShell>
  )
}
