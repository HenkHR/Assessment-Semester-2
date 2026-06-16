import type { NavItem, SectionId } from "./types"

export type {
  AboutData,
  BookData,
  FuturePlansData,
  GroupProjectData,
  MethodData,
  NavItem,
  ProsConsItem,
  SectionId,
} from "./types"

export { aboutData } from "./about"
export { EMPTY_METHOD, methodsData } from "./methods"
export { EMPTY_PROJECT, groupProjectsData } from "./group-projects"
export { bookData } from "./book"
export { futurePlansData } from "./future-plans"

export const NAV_ITEMS: NavItem[] = [
  { id: "over-mij", label: "Over Mij" },
  { id: "methoden", label: "Toolkit" },
  { id: "groepsprojecten", label: "Projecten" },
  { id: "boek", label: "Boek" },
  { id: "toekomstplannen", label: "Toekomst" },
]

export const SECTION_IDS: SectionId[] = NAV_ITEMS.map((item) => item.id)
