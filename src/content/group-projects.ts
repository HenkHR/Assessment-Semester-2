import type { GroupProjectData } from "./types"

const PLACEHOLDER_PROS_STAGELINK = [
  "Veel geleerd over backend API's bouwen",
  "Veel geprogrammeerd, ook veel geleerd over het werken met AI agents.",
  "Communicatie binnen het backend team was erg goed.",
] as const

const PLACEHOLDER_CONS_STAGELINK = [
  "planning van het backend team was rommelig of zelfs niet aanwezig, wat de werkdruk binnen het team vergrootte.",
  "Communicatie en verwachtingen tussen front en backend was niet altijd top, todat er een goede basis was in de backend en de documentatie hiervan",
  "Ik had soms wat moeite met het loslaten van taken waardoor anderen binnen het backend team soms geforceerd werden om op mijn werk te wachten.",
] as const

const PLACEHOLDER_PROS_RAUW = [
  "[Placeholder] Positief punt 1",
  "[Placeholder] Positief punt 2",
  "[Placeholder] Positief punt 3",
] as const

const PLACEHOLDER_CONS_RAUW = [
  "[Placeholder] Verbeterpunt 1",
  "[Placeholder] Verbeterpunt 2",
  "[Placeholder] Verbeterpunt 3",
] as const

export const EMPTY_PROJECT: GroupProjectData = {
  title: "Groepsproject",
  description: "[Placeholder] Beschrijving van het groepsproject...",
  pros: [...PLACEHOLDER_PROS_STAGELINK],
  cons: [...PLACEHOLDER_CONS_STAGELINK],
  goalsReflection:
    "[Placeholder] Reflectie op eerdere doelen en doelstellingen...",
}

export const groupProjectsData: GroupProjectData[] = [
  {
    title: "StageLink",
    description: "AI student-stage matching systeem met een focus op AI geletterdheid",
    pros: [...PLACEHOLDER_PROS_STAGELINK],
    cons: [...PLACEHOLDER_CONS_STAGELINK],
    goalsReflection:
      "Na TLE2 had ik besloten dat ik me meer bezig wilde houden met het communiceren van voortgang met mijn teamgenoten, zodat ik mezelf niet onnodig druk maakte over wat anderen aan het doen waren. Binnen het backend team is dit erg goed gelukt, wel moet ik zeggen dat dit misschien komt omdat ik net teveel op mijn eigen bord genomen had waardoor andere mensen vaak minder hoefden te doen. Dus in plaats van dat ik me druk maak over het werk van anderen heb ik daar het werk van anderen op mezelf genomen, wat niet helemaal de bedoeling is. Aan het eind van dit project had ik me voorgenomen om juist ook die planning en userstories beter te krijgen. Als de userstories goed afgebakend zijn hoef ik niet bang te zijn dat een andere teamgenoot de taak anders interpreteert, ik denk namelijk dat hier mijn probleem ligt. Omdat ik vaak het technisch ontwerp doe ben ik bang dat teamgenoten bij belangrijke taken mijn visie niet doorhebben. Maar met een goed afgebakende userstory kan dit eigenlijk niet als je een goede acceptatiecriteria/Definition of Done hebt.",
  },
  {
    title: "RAUW",
    description: "Platform voor buurtbewoners en handhavers om hun buurt te verbeteren door middel van contact en terugkoppeling",
    pros: [...PLACEHOLDER_PROS_RAUW],
    cons: [...PLACEHOLDER_CONS_RAUW],
    goalsReflection:
      "[Placeholder] Reflectie op eerdere doelen en doelstellingen...",
  },
]
