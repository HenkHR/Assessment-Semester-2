import type { MethodData } from "./types"

const PLACEHOLDER_PROS_AI = [
  "Ik heb geleerd waar mensen naar kijken wat betreft data gebruik in AI systemen, mensen willen weten hoe hun data gebruikt word en wat de AI/agoritme hier mee doet.",
  "Ik heb geleerd over verschillende soorten AI en algoritmes (LLM, Cosine similarity etc.)",
  "We werkten in een lost back-end en front-end team en voor het eerst in API vorm, hierdoor heb ik veel geleerd over API documantatie en onderhoud waarbij je rekening houd met een ander extern frontend team.",
  "Ik heb geleerd over de waarde van marktonderzoek, kijken wat de concurrentie doet en hoe ik deze ideeen samen kan voegen in een nieuw, beter product.",
] as const

const PLACEHOLDER_CONS_AI = [
  "Ik werd best wel in het diepe gegooid als back-ender na de gezamelijke ontwerpfase. Al het ontwerp was gedaan rond de front-end en ERD maar nog geen planning o.i.d. voor backend. Hier was ook weinig nadruk op gegeven.",
  "Ethics by Design vond ik er interessant maar wel lastig, als bepaalde waarden met elkaar in conflict zijn is het soms lastig om een keuze te maken of een middenweg te vinden zonder die waarden kwijt te raken.",
] as const

const PLACEHOLDER_PROS_STARTUP = [
  "Je kan zelf weten wat je gaat maken, als je het maar afstemt op de wensen van 'de markt'",
  "Door een *goede* waardepropositie op te stellen kun je vrij nauwkeurig zoeken op andere producten die dezelfde waarde proberen te leveren.",
  "Als je startup goed werkt krijg je een stuk meer centen dan als je voor een opdrachtgever werkt.",
] as const

const PLACEHOLDER_CONS_STARTUP = [
  "Je bent afhankelijk van de markt, je hebt geen vaste opdrachtgever dus je moet zelf mensen over zien te halen om uberhaupt interesse te krijgen in jouw product.",
  "Je moet ook nog eens gaan nadenken over martketing",
  "Je kan zomaar 3x je product om moeten gooien omdat je concept niet goed afgebakend is of omdat je iets beters tegenkomt"
] as const

export const EMPTY_METHOD: MethodData = {
  title: "Methode",
  description: "[Placeholder] Reflectie op deze werkmethode...",
  pros: [...PLACEHOLDER_PROS_AI],
  cons: [...PLACEHOLDER_CONS_STARTUP],
}

export const methodsData: MethodData[] = [
  {
    title: "Specialisatie",
    description: "Wat heb ik geleerd over AI systemen in applicaties en hoe ik moet samenwerken tussen back-end en front-end teams?",
    pros: [...PLACEHOLDER_PROS_AI],
    cons: [...PLACEHOLDER_CONS_AI],
  },
  {
    title: "Startup",
    description: "Wat heb ik geleerd over een tech startup opzetten, van research en design tot marketing?",
    pros: [...PLACEHOLDER_PROS_STARTUP],
    cons: [...PLACEHOLDER_CONS_STARTUP],
  },
]
