import type { MethodData } from "./types"

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

export const EMPTY_METHOD: MethodData = {
  title: "Methode",
  description: "[Placeholder] Reflectie op deze werkmethode...",
  pros: [...PLACEHOLDER_PROS],
  cons: [...PLACEHOLDER_CONS],
}

export const methodsData: MethodData[] = [
  {
    title: "Methode 1",
    description: "[Placeholder] Reflectie op deze werkmethode...",
    pros: [...PLACEHOLDER_PROS],
    cons: [...PLACEHOLDER_CONS],
  },
  {
    title: "Methode 2",
    description: "[Placeholder] Reflectie op deze werkmethode...",
    pros: [...PLACEHOLDER_PROS],
    cons: [...PLACEHOLDER_CONS],
  },
]
