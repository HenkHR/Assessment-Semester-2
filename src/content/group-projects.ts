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
  "Communicatie binnen het team was weer top, groepje was super fijn om mee samen te werken.",
  "Ik heb nog voor dit project veel geleerd over AI workflows en agents, dit heb ik geprobeerd toe te passen in dit project met veel succes.",
  "Backend bijna in mijn eentje kunnen bouwen, wat meer tijd over liet voor andere mensen om frontend en documentatie te doen.",
  "Contact tussen front en backend was uitstekend, de lijntjes waren nu lekker kort omdat je in hetzelfde groepje werkte."
] as const

const PLACEHOLDER_CONS_RAUW = [
  "Er werd weer weinig gedaan met de planning (voornamelijk door mij). Ik had voor de backend geen goede userstories met acceptatiecriteria. Dit heeft me verder niet belemmerd maar was wel iets waar ik aan wilde werken.",
  "Planning front en backend had wat beter zwart op wit kunnen staan. 1 userstory voor front en backend waardoor beide kanten af moeten zijn had beter geweest.",
  "Veel ziek/afwezig geweest, een van mijn voornemens uit een eerder TLE was om meer te doen aan de design fase, dit is helaas niet gelukt.",
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
      "Na eigenlijk elk voorgaande TLE heb ik mezelf voorgenomen om betere userstories en acceptatiecriteria te schrijven. Dit is wederom weer niet gelukt. Ik spendeer hier te weinig tijd aan tijdens de design fase en tijdens de develop fase ben ik alleen nog maar gefocust op het bouwen van de applicatie. Ook vind ik nog steeds dat ik te weining initiatief toon tijdens de design fase. terwijl dit vorig jaar en tijdens TLE2 een stuk beter ging. nu reageer ik meer op wat anderen voorstellen dan dat ik zelf met geheel nieuwe ideeen kom. Voor bijvoorbeeld PLE is dus weer mijn doelstelling om meer initiatief te tonen tijdens de design fase, alle geleerde methoden zelf te doorlopen en ook om concrete, goed afgebakende userstories en acceptatiecriteria te schrijven voordat ik begin met programmeren.",
  },
]