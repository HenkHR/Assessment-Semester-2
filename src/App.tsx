import { AnimatedContainer } from "@/components/animated-container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function App() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-6">
      <AnimatedContainer className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              React, Vite, shadcn/ui, Tailwind CSS, and Framer Motion — ready
              to go.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This hero card fades in on load. Press{" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
                d
              </kbd>{" "}
              to toggle dark mode.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </AnimatedContainer>
    </main>
  )
}

export default App
