import { Navbar } from "@/components/layout/navbar"
import { SectionHeading } from "@/components/layout/section-heading"
import { SectionShell } from "@/components/layout/section-shell"
import { NAV_ITEMS } from "@/content"

export function App() {
  return (
    <>
      <Navbar />
      <main>
        {NAV_ITEMS.map(({ id, label }) => (
          <SectionShell key={id} id={id} className="min-h-[80vh]">
            <SectionHeading>{label}</SectionHeading>
          </SectionShell>
        ))}
      </main>
    </>
  )
}

export default App
