export type SectionId =
  | "over-mij"
  | "methoden"
  | "groepsprojecten"
  | "boek"
  | "toekomstplannen"

export interface AboutData {
  imageSrc: string
  imageAlt: string
  title: string
  interests: string
  strengths?: string
}

export interface ProsConsItem {
  title: string
  description: string
  pros: string[]
  cons: string[]
}

export interface MethodData extends ProsConsItem {}

export interface GroupProjectData extends ProsConsItem {
  goalsReflection: string
}

export interface BookData {
  imageSrc: string
  imageAlt: string
  title: string
  about: string
  learned: string
  applied: string
  futureUse: string
}

export type FuturePlansData = string

export interface NavItem {
  id: SectionId
  label: string
}
