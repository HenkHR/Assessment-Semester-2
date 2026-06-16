import { Navbar } from "@/components/layout/navbar"
import { AboutSection } from "@/components/sections/about-section"
import { BookSection } from "@/components/sections/book-section"
import { FuturePlansSection } from "@/components/sections/future-plans-section"
import { GroupProjectsSection } from "@/components/sections/group-projects-section"
import { MethodsSection } from "@/components/sections/methods-section"
import {
  aboutData,
  bookData,
  futurePlansData,
  groupProjectsData,
  methodsData,
} from "@/content"

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <AboutSection data={aboutData} />
        <MethodsSection methods={methodsData} />
        <GroupProjectsSection projects={groupProjectsData} />
        <BookSection data={bookData} />
        <FuturePlansSection plans={futurePlansData} />
      </main>
    </>
  )
}

export default App
