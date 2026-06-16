import type { GroupProjectData } from "./types"

const PLACEHOLDER_PROS = [
  "[Placeholder] Positief punt 1",
  "[Placeholder] Positief punt 2",
  "[Placeholder] Positief punt 3",
] as const

const PLACEHOLDER_CONS = [
  "[Placeholder] Verbeterpunt 1",
  "[Placeholder] Verbeterpunt 2",
  "[Placeholder] Verbeterpunt 3",
] as const

export const EMPTY_PROJECT: GroupProjectData = {
  title: "Groepsproject",
  description: "[Placeholder] Beschrijving van het groepsproject...",
  pros: [...PLACEHOLDER_PROS],
  cons: [...PLACEHOLDER_CONS],
  goalsReflection:
    "[Placeholder] Reflectie op eerdere doelen en doelstellingen...",
}

export const groupProjectsData: GroupProjectData[] = [
  {
    title: "Groepsproject 1",
    description: "[Placeholder] Beschrijving van het groepsproject...",
    pros: [...PLACEHOLDER_PROS],
    cons: [...PLACEHOLDER_CONS],
    goalsReflection:
      "[Placeholder] Reflectie op eerdere doelen en doelstellingen...",
  },
  {
    title: "Groepsproject 2",
    description: "[Placeholder] Beschrijving van het groepsproject...",
    pros: [...PLACEHOLDER_PROS],
    cons: [...PLACEHOLDER_CONS],
    goalsReflection:
      "[Placeholder] Reflectie op eerdere doelen en doelstellingen...",
  },
]
