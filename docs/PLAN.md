# Plan: TLE Portfolio Refresh

## Summary

Rebuild the Hogeschool Rotterdam TLE 4 assessment single-page portfolio in `Assessment Semester 2`, preserving the source project's **structure and section contract** (`assessment/`) while refreshing visuals, motion, and component quality. The result is a Dutch-language, scroll-linked SPA with five fixed-nav sections, TypeScript content types, shadcn/ui primitives, Framer Motion reveals, and placeholder data only — no real personal content.

**Source of truth for structure:** `c:\Users\henk-\Development\assessment\src\`  
**Target workspace:** `c:\Users\henk-\Development\Assessment Semester 2\`

### Confirmed design direction (user choices)

| Choice | Selection | Implementation |
|--------|-----------|----------------|
| Aesthetic | **Tech Refined** | Direction A (Signal Lab) — cool slate/zinc base, subtle grid texture, precise borders |
| Theme | **Dark only** | Force `.dark` on `<html>`; remove light-mode toggle (keep `ThemeProvider` only if needed for token structure) |
| Typography | **Technical mono** | Space Grotesk (headings/nav) + IBM Plex Sans (body) + IBM Plex Mono (section labels, pros/cons headers) |
| Motion | **Expressive** | Orchestrated page-load sequence, staggered section reveals, nav underline animation, subtle parallax on hero image, animated scan-line signature |
| Deploy | **GitHub Pages (new repo)** | `base: '/Assessment-Semester-2/'` → `https://henkhr.github.io/Assessment-Semester-2/` |
| Navbar brand | **Assessment 2** | Left-side brand in navbar; links to `#over-mij` |

**Hybrid note:** Direction A palette + Direction C's glass/glow accents on cards (subtle phosphor highlight on hover) — dark-first exhibition feel without the violet-heavy Night Circuit palette.

---

| Constraint | Value |
|------------|-------|
| Framework | Vite 8 + React 19 + TypeScript |
| Styling | Tailwind v4 + shadcn/ui (base-nova) |
| Motion | Framer Motion + existing `AnimatedContainer` |
| Routing | None — single page, anchor scroll |
| Section IDs | `over-mij`, `methoden`, `groepsprojecten`, `boek`, `toekomstplannen` |
| Nav labels | Over Mij \| Toolkit \| Projecten \| Boek \| Toekomst |
| Content | Placeholders only in `src/content/` |
| Language | Dutch (`lang="nl"`) |

---

## 1. Architecture

### 1.1 Folder structure

```
Assessment Semester 2/
├── public/
│   ├── placeholder-profile.svg      # neutral silhouette, no real photo
│   ├── placeholder-book.svg         # generic book cover placeholder
│   └── favicon.svg                  # optional branded favicon
├── src/
│   ├── App.tsx                      # composes layout + sections, imports content
│   ├── main.tsx                     # unchanged except if scroll-behavior added globally
│   ├── index.css                    # design tokens, fonts, signature element CSS
│   ├── content/
│   │   ├── types.ts                 # all content interfaces
│   │   ├── about.ts                 # aboutData placeholder
│   │   ├── methods.ts               # methodsData[2] placeholder
│   │   ├── group-projects.ts        # groupProjectsData[2] placeholder
│   │   ├── book.ts                  # bookData placeholder
│   │   ├── future-plans.ts          # futurePlansData placeholder
│   │   └── index.ts                 # re-exports all content + NAV_ITEMS constant
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx           # desktop nav + mobile Sheet
│   │   │   ├── section-shell.tsx    # shared section wrapper (id, padding, bg)
│   │   │   └── section-heading.tsx  # consistent h2 + optional subtitle
│   │   ├── sections/
│   │   │   ├── about-section.tsx
│   │   │   ├── methods-section.tsx
│   │   │   ├── group-projects-section.tsx
│   │   │   ├── book-section.tsx
│   │   │   └── future-plans-section.tsx
│   │   ├── cards/
│   │   │   ├── method-card.tsx
│   │   │   ├── project-card.tsx
│   │   │   └── book-subsection.tsx  # reusable book reflection block
│   │   ├── lists/
│   │   │   ├── pros-list.tsx
│   │   │   └── cons-list.tsx
│   │   ├── motion/
│   │   │   ├── scroll-reveal.tsx    # viewport-triggered wrapper (extends AnimatedContainer pattern)
│   │   │   ├── stagger-children.tsx # stagger container for grids/lists
│   │   │   └── signature-element.tsx # direction-specific hero accent (see §3)
│   │   ├── animated-container.tsx   # existing — keep for load/hero use
│   │   ├── theme-provider.tsx       # existing — keep dark toggle (d key)
│   │   └── ui/                      # shadcn primitives
│   ├── hooks/
│   │   ├── use-scroll-spy.ts        # IntersectionObserver active section
│   │   └── use-scroll-to.ts         # smooth scroll with navbar offset
│   └── lib/
│       └── utils.ts                   # existing cn()
├── index.html                         # lang="nl", Dutch title
├── vite.config.ts                     # base path for GitHub Pages (optional)
└── .github/workflows/deploy.yml       # optional GitHub Pages
```

### 1.2 TypeScript types (`src/content/types.ts`)

```typescript
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

export type SectionId =
  | "over-mij"
  | "methoden"
  | "groepsprojecten"
  | "boek"
  | "toekomstplannen"
```

### 1.3 Content separation

- Each content file exports a single typed constant with **Dutch structural placeholders** (see §8).
- `src/content/index.ts` exports:
  - `aboutData`, `methodsData`, `groupProjectsData`, `bookData`, `futurePlansData`
  - `NAV_ITEMS: NavItem[]` — single source for navbar and scroll spy
  - `SECTION_IDS: SectionId[]` — derived from `NAV_ITEMS` for `useScrollSpy`
- `App.tsx` imports from `@/content` only — no inline content strings.
- Image paths point to `public/` placeholders, never external URLs with real photos.

### 1.4 App composition

```tsx
// App.tsx (conceptual)
export function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <AboutSection data={aboutData} />
        <MethodsSection methods={methodsData} />
        <GroupProjectsSection projects={groupProjectsData} />
        <BookSection data={bookData} />
        <FuturePlansSection plans={futurePlansData} />
      </main>
    </div>
  )
}
```

### 1.5 Shared layout primitives

**`SectionShell`** — wraps every section:

- `id` prop matching `SectionId`
- `className` for alternating backgrounds
- `scroll-mt-20` (or `scroll-mt-[4.5rem]`) for fixed navbar offset
- First section (`over-mij`) gets extra top padding: `pt-24` (matches source)

**`SectionHeading`** — centered or left-aligned per direction; uses `font-heading`.

---

## 2. Component Mapping

| Source (`assessment/`) | Target | shadcn / primitives |
|------------------------|--------|---------------------|
| `App.jsx` (inline data) | `App.tsx` + `src/content/*` | — |
| `Navbar.jsx` | `layout/navbar.tsx` | `Sheet`, `SheetTrigger`, `SheetContent`, `Button`, `Separator` |
| `AboutSection.jsx` | `sections/about-section.tsx` | `Card`, `Badge`, `Avatar` (optional) or styled `img` |
| `MethodsSection.jsx` | `sections/methods-section.tsx` | `SectionShell`, grid layout |
| `MethodCard.jsx` | `cards/method-card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Badge` |
| `GroupProjectsSection.jsx` | `sections/group-projects-section.tsx` | `SectionShell`, `Separator` between cards |
| `ProjectCard.jsx` | `cards/project-card.tsx` | `Card`, `Accordion` or bordered sub-blocks |
| `BookSection.jsx` | `sections/book-section.tsx` | `Card` subsections, `Badge` for book title |
| `FuturePlansSection.jsx` | `sections/future-plans-section.tsx` | `Card` centered, `blockquote` styling |
| `ProsList.jsx` | `lists/pros-list.tsx` | `Badge` variant + `Check` icon (lucide) |
| `ConsList.jsx` | `lists/cons-list.tsx` | `Badge` variant + `Minus` or `X` icon |
| — (new) | `motion/scroll-reveal.tsx` | Framer Motion `whileInView` |
| — (new) | `motion/stagger-children.tsx` | Framer Motion `staggerChildren` |
| — (new) | `hooks/use-scroll-spy.ts` | IntersectionObserver |
| `AnimatedContainer` (target) | Keep; use for navbar brand / hero only | Framer Motion |

### Slot guarantee (from source)

`MethodsSection` and `GroupProjectsSection` always render **exactly 2 slots**, using fallbacks when array is short:

```typescript
const [method1, method2] = [
  methods[0] ?? EMPTY_METHOD,
  methods[1] ?? EMPTY_METHOD,
]
```

Define `EMPTY_METHOD` / `EMPTY_PROJECT` in content files with Dutch placeholder labels.

---

## 3. Design System

User selects **one direction** before Phase 2 (tokens + fonts). All directions share:
- oklch CSS variables in `index.css` (shadcn token structure)
- Dark mode via existing `ThemeProvider` (`d` key)
- One **signature element** reused across sections
- Avoid: cream + generic serif, dark + acid green, newspaper multi-column clichés

---

### Direction A: **Signal Lab** (technical craft, monospace accents)

**Vibe:** Creative Technologist as builder — oscilloscope traces, grid paper, precise motion.

| Role | Font (`@fontsource`) | Usage |
|------|----------------------|-------|
| Display | `@fontsource/space-grotesk` (600, 700) | Headings, nav |
| Body | `@fontsource-variable/geist` (keep) | Paragraphs |
| Accent | `@fontsource/jetbrains-mono` (400, 500) | Labels, pros/cons headers, section indices |

**Palette (oklch):**

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `oklch(0.98 0.005 250)` | `oklch(0.14 0.02 250)` |
| `--foreground` | `oklch(0.18 0.02 250)` | `oklch(0.93 0.01 250)` |
| `--primary` | `oklch(0.55 0.2 250)` electric blue | `oklch(0.72 0.16 250)` |
| `--accent` | `oklch(0.92 0.04 180)` cyan wash | `oklch(0.22 0.04 180)` |
| `--muted` | `oklch(0.95 0.01 250)` | `oklch(0.22 0.02 250)` |
| `--destructive` | pros/cons "cons" accent | warm amber `oklch(0.65 0.15 55)` |

**Signature element:** **Monospace section index strip** — vertical `01`–`05` labels fixed at section left edge (desktop) or top-left badge (mobile), with a 1px animated scan line (CSS `@keyframes` + `prefers-reduced-motion: none` only).

**Card style:** Sharp corners (`--radius: 0.375rem`), subtle 1px borders, no heavy shadows.

---

### Direction B: **Atelier Warm** (human-centered maker)

**Vibe:** Workshop notebook meets digital portfolio — warm paper, ink, one bold coral accent.

| Role | Font | Usage |
|------|------|-------|
| Display | `@fontsource/fraunces` (600, 700, soft opsz) | Headings only |
| Body | `@fontsource/dm-sans` (400, 500) | Body, UI |
| Accent | `@fontsource-variable/geist-mono` | Tags, metadata |

**Palette:**

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `oklch(0.97 0.015 75)` warm off-white | `oklch(0.16 0.02 45)` espresso |
| `--foreground` | `oklch(0.22 0.03 45)` | `oklch(0.92 0.02 75)` |
| `--primary` | `oklch(0.58 0.18 25)` terracotta | `oklch(0.7 0.14 25)` |
| `--accent` | `oklch(0.88 0.06 145)` sage | `oklch(0.28 0.04 145)` |
| `--card` | `oklch(0.99 0.01 75)` | `oklch(0.2 0.02 45)` |

**Signature element:** **Hand-drawn section dividers** — inline SVG wavy rules between sections (static SVG path, subtle Framer Motion draw-on-scroll via `pathLength`).

**Card style:** Soft radius (`--radius: 0.75rem`), warm border, light inner shadow.

---

### Direction C: **Night Circuit** (immersive dark-first)

**Vibe:** Exhibition install — deep violet base, phosphor highlights, glass panels. Light mode exists but dark is the hero.

| Role | Font | Usage |
|------|------|-------|
| Display | `@fontsource/syne` (700, 800) | Headings, nav brand |
| Body | `@fontsource/ibm-plex-sans` (400, 500) | Body |
| Accent | `@fontsource/ibm-plex-mono` | Code-like labels |

**Palette:**

| Token | Light | Dark (default feel) |
|-------|-------|---------------------|
| `--background` | `oklch(0.97 0.01 300)` | `oklch(0.12 0.04 285)` |
| `--foreground` | `oklch(0.2 0.03 285)` | `oklch(0.92 0.02 300)` |
| `--primary` | `oklch(0.5 0.22 300)` violet | `oklch(0.75 0.18 165)` phosphor mint |
| `--accent` | `oklch(0.9 0.05 300)` | `oklch(0.25 0.08 300)` |
| `--card` | white | `oklch(0.16 0.04 285 / 0.8)` glass |

**Signature element:** **Animated gradient mesh** — fixed `position: absolute` blob in hero (`about-section`) using CSS `oklch` radial gradients + slow `@keyframes` drift; `pointer-events: none`; disabled when `prefers-reduced-motion`.

**Card style:** Glass (`backdrop-blur`, semi-transparent `bg-card`), glow ring on hover.

---

### Token structure in `index.css`

Extend existing file — do not replace shadcn imports:

```css
@theme inline {
  --font-sans: 'DM Sans', 'Geist Variable', sans-serif;      /* per direction */
  --font-heading: 'Fraunces', serif;                          /* per direction */
  --font-mono: 'Geist Mono Variable', monospace;

  /* Semantic extensions (all directions) */
  --color-pros: var(--accent);           /* or direction-specific */
  --color-cons: var(--destructive);
  --color-section-alt: var(--muted);

  /* Layout */
  --section-py: 4rem;
  --navbar-h: 4rem;
}

:root {
  /* existing shadcn tokens — override per direction */
}

.dark {
  /* dark overrides */
}

/* Global */
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

/* Signature element — one block per chosen direction */
.signature-mesh { /* Direction C */ }
.signature-index { /* Direction A */ }
.signature-divider { /* Direction B */ }
```

**Typography utilities** (add to components or CSS):

```css
.heading-display { font-family: var(--font-heading); }
.text-label { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
```

---

## 4. Section-by-Section Implementation

Global responsive rules:
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-16` (source parity), first section `pt-24 pb-16`
- All sections use `ScrollReveal` for entrance; cards use `StaggerChildren`
- Images: `loading="lazy"`, explicit `width`/`height` or aspect-ratio to prevent CLS

---

### 4.1 Over Mij (`over-mij`)

**Layout:** Two-column on `md+`: image left (1/3), text right (2/3). Stacked on mobile.

**Content blocks:**
- Profile image (circular or squircle per direction)
- `h1` from `data.title`
- Subsection "Mijn interesses" + optional "Waar ik goed in ben" (`strengths`)

**Animations:**
- Image: `scaleIn` via ScrollReveal
- Text column: stagger headline → interests → strengths
- Direction C: gradient mesh behind image column only

**Responsive:**
- Image max `w-64 h-64` (source parity); center on mobile
- Text left-aligned on desktop, centered on mobile optional per direction

```
+------------------------------------------------------------------+
|  [NAVBAR - fixed]                                                |
+------------------------------------------------------------------+
|  §01 / gradient mesh (signature)                                 |
|                                                                  |
|     +----------+    OVER MIJ                                     |
|     |          |    ─────────                                    |
|     |  photo   |    Mijn interesses                              |
|     |  placeholder|    Lorem placeholder tekst over interesses   |
|     |          |                                               |
|     +----------+    Waar ik goed in ben (optional)               |
|                     Lorem placeholder tekst...                   |
|                                                                  |
+------------------------------------------------------------------+
```

---

### 4.2 Toolkit (`methoden`)

**Layout:** Centered `h2` "Toolkit", 2-column grid `md:grid-cols-2 gap-8`.

**Per card:** title, description, pros list, cons list (stacked in card — unlike project card).

**Animations:** Section heading fade up; cards stagger in (0.1s delay each).

**Responsive:** Single column on mobile; equal-height cards optional (`h-full` on Card).

```
+------------------------------------------------------------------+
|                         TOOLKIT                                  |
|                         ───────                                  |
|   +------------------------+  +------------------------+         |
|   | Methode 1              |  | Methode 2              |         |
|   | Beschrijving...        |  | Beschrijving...        |         |
|   | ✓ Positieve punten     |  | ✓ Positieve punten     |         |
|   |   • item                 |  |   • item                 |         |
|   | ✗ Verbeterpunten       |  | ✗ Verbeterpunten       |         |
|   +------------------------+  +------------------------+         |
+------------------------------------------------------------------+
```

---

### 4.3 Projecten (`groepsprojecten`)

**Layout:** Centered `h2` "Projecten", vertical stack `space-y-8` (source parity).

**Per card:** title, description, pros/cons side-by-side on `md+` (`grid-cols-2`), goals reflection below `Separator`.

**Animations:** Each project card ScrollReveal; internal pros/cons stagger.

**Responsive:** Pros/cons stack on mobile.

```
+------------------------------------------------------------------+
|                        PROJECTEN                                 |
|                        ─────────                                 |
|   +------------------------------------------------------------+ |
|   | Project 1                                                  | |
|   | Beschrijving...                                            | |
|   | +------------------+  +------------------+                 | |
|   | | Positieve punten |  | Verbeterpunten   |                 | |
|   | +------------------+  +------------------+                 | |
|   | ─────────────────────────────────────────────────────────  | |
|   | Reflectie op eerdere doelen                                  | |
|   | Placeholder reflectietekst...                                | |
|   +------------------------------------------------------------+ |
|   +------------------------------------------------------------+ |
|   | Project 2  (same structure)                                | |
|   +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

---

### 4.4 Boek (`boek`)

**Layout:** Centered `h2` "Boek", row layout: cover left (1/3), content right (2/3).

**Content blocks (right column):**
1. Book title (`h3`)
2. "Waar het boek over gaat" — `BookSubsection`
3. "Wat ik heb geleerd"
4. "Hoe ik het heb toegepast"
5. "Hoe ik het ga gebruiken"

Each subsection: `Card` with muted background (replaces source `bg-gray-50` boxes).

**Animations:** Cover parallax-lite (optional, subtle `y` shift on scroll — skip if reduced motion); subsections stagger.

**Responsive:** Cover centered above text on mobile; cover aspect `w-64 h-96` (source).

```
+------------------------------------------------------------------+
|                           BOEK                                   |
|                           ────                                   |
|    +-----------+     Superintelligence (placeholder)             |
|    |           |     +--------------------------------------+  |
|    |  book     |     | Waar het boek over gaat                |  |
|    |  cover    |     +--------------------------------------+  |
|    |           |     +--------------------------------------+  |
|    +-----------+     | Wat ik heb geleerd                     |  |
|                      +--------------------------------------+  |
|                      +--------------------------------------+  |
|                      | Hoe ik het heb toegepast               |  |
|                      +--------------------------------------+  |
|                      +--------------------------------------+  |
|                      | Hoe ik het ga gebruiken                |  |
|                      +--------------------------------------+  |
+------------------------------------------------------------------+
```

---

### 4.5 Toekomst (`toekomstplannen`)

**Layout:** Centered `h2` "Toekomst", single `Card` `max-w-4xl mx-auto` with body text.

**Animations:** Card scale-in; optional signature divider above section.

**Responsive:** Generous horizontal padding on card (`p-6 sm:p-8`).

```
+------------------------------------------------------------------+
|                         TOEKOMST                                 |
|                         ────────                                 |
|              +--------------------------------+                  |
|              |                                |                  |
|              |  Placeholder toekomstplannen   |                  |
|              |  tekst — meerdere alinea's     |                  |
|              |                                |                  |
|              +--------------------------------+                  |
+------------------------------------------------------------------+
```

---

## 5. Navbar

### 5.1 Desktop (`md+`)

- Fixed top, `h-16`, `z-50`, `backdrop-blur`, `bg-background/80`, bottom `border-border`
- Brand (optional): "TLE 4" or student initials placeholder — links to `#over-mij`
- Nav links: map `NAV_ITEMS` — `Button variant="ghost"` or custom underline style
- **Active indicator:** bottom border or pill background on active section (from `useScrollSpy`)
- **Theme toggle:** small icon `Button` (Sun/Moon) — supplements `d` key
- Smooth scroll via `useScrollTo(sectionId)` with offset `navbar-h`

### 5.2 Mobile (`< md`)

- Hide inline nav links
- `Sheet` from right: hamburger `Button` → full-height menu with large tap targets
- Same `NAV_ITEMS`; clicking link closes Sheet then scrolls
- `Separator` between brand and links inside Sheet

### 5.3 Scroll spy (`useScrollSpy`)

```typescript
// src/hooks/use-scroll-spy.ts
export function useScrollSpy(
  sectionIds: SectionId[],
  options?: { rootMargin?: string; threshold?: number }
): SectionId | null
```

**Implementation:**
- `IntersectionObserver` on each `document.getElementById(id)`
- `rootMargin: "-20% 0px -60% 0px"` — activates section in upper viewport third
- `threshold: 0` or `0.1`
- Return id with highest `intersectionRatio` among intersecting entries
- Fallback: first section when at top (`scrollY < 50`)

**Navbar integration:**
```tsx
const activeId = useScrollSpy(SECTION_IDS)
// link className: activeId === item.id ? "text-primary border-b-2 ..." : "..."
```

### 5.4 Scroll-to helper (`useScrollTo`)

```typescript
export function useScrollTo() {
  return (id: SectionId) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
    window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }
}
```

Read `prefers-reduced-motion` via `window.matchMedia` or `useReducedMotion()` from Framer Motion.

---

## 6. shadcn Components to Add

Install via `npx shadcn@latest add <component>` (base-nova style):

| Component | Purpose |
|-----------|---------|
| `badge` | Pros/cons labels, optional skill tags in About |
| `separator` | Project reflection divider, mobile nav, section breaks |
| `sheet` | Mobile navigation drawer |
| `avatar` | Optional profile image wrapper (or skip — use styled `img`) |
| `accordion` | Optional: collapse book subsections on mobile (only if it improves UX) |

**Already present:** `button`, `card`

**Icons:** `lucide-react` — `Menu`, `X`, `Sun`, `Moon`, `Check`, `Minus`, `ChevronRight`

**Do not install unless needed:** `navigation-menu` (overkill for 5 anchors), `tabs`, `carousel`, `dialog`.

---

## 7. Animation Strategy

### 7.1 What animates when

| Element | Trigger | Animation | Reduced motion |
|---------|---------|-----------|----------------|
| Navbar on load | mount | `fadeInDown` (AnimatedContainer) | instant |
| Section headings | enter viewport | `fadeInUp` (ScrollReveal) | opacity only or skip |
| Cards / lists | enter viewport | stagger children 0.08–0.12s | no stagger, instant |
| Nav active state | scroll | CSS transition on underline | same |
| Signature element | always / scroll | CSS keyframes or slow Framer | **static** |
| Theme toggle | click | CSS transition colors | same |
| Sheet open/close | user | shadcn/Base UI default | respect system |

### 7.2 Motion components

**`ScrollReveal`** — wraps `motion.div`:
```tsx
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: "-80px" }}
variants={fadeInUp}
```
Uses `useReducedMotion()` — set `transition: { duration: 0 }` when true.

**`StaggerChildren`** — parent `motion.div` with `staggerChildren: 0.1`, children `motion.div` variants.

**Extend `AnimatedContainer`** — keep for navbar/one-off; do not nest heavy motion trees.

### 7.3 Performance

- `viewport={{ once: true }}` on all scroll reveals — no repeat animations
- Animate `transform` and `opacity` only — avoid layout properties
- Signature mesh: pure CSS, `will-change: transform` sparingly, single layer
- No scroll-linked JavaScript listeners except IntersectionObserver (passive)
- Lazy-load images below fold
- Keep total Framer Motion nodes reasonable (<30 animated wrappers)

---

## 8. Placeholder Content Strategy

**Principles:**
- Dutch language throughout
- Clearly placeholder — user replaces before submission
- Structural labels match TLE expectations (interesses, pros/cons, reflectie, etc.)
- No real names, photos, book titles, or project names from source `App.jsx`

### 8.1 Placeholder patterns

| Field | Example placeholder |
|-------|---------------------|
| `aboutData.title` | `"Over Mij"` |
| `aboutData.interests` | `"[Placeholder] Beschrijf hier je interesses binnen Creative Technology..."` |
| `aboutData.strengths` | `"[Placeholder] Beschrijf hier je sterke punten..."` |
| `methodsData[n].title` | `"Methode 1"` / `"Methode 2"` |
| `methodsData[n].description` | `"[Placeholder] Reflectie op deze werkmethode..."` |
| `pros[]` | 3 items: `"[Placeholder] Positief punt 1"`, etc. |
| `cons[]` | 3 items: `"[Placeholder] Verbeterpunt 1"`, etc. |
| `groupProjectsData[n].title` | `"Groepsproject 1"` |
| `goalsReflection` | `"[Placeholder] Reflectie op eerdere doelen en doelstellingen..."` |
| `bookData.title` | `"Boektitel (placeholder)"` |
| `bookData.about` | `"[Placeholder] Korte samenvatting van het boek..."` |
| `futurePlansData` | `"[Placeholder] Beschrijf je toekomstplannen binnen Creative Technology..."` |

### 8.2 Images

- `public/placeholder-profile.svg` — neutral avatar silhouette
- `public/placeholder-book.svg` — generic book outline
- `imageAlt`: `"Profiel foto (placeholder)"` / `"Boekomslag (placeholder)"`

### 8.3 Empty-state fallbacks (in components)

Mirror source behavior: if `pros`/`cons` empty, show italic `"Voeg positieve punten toe..."` — keeps layout reviewable before content entry.

---

## 9. Deployment

### 9.1 Optional GitHub Pages

**`vite.config.ts`:**
```typescript
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/<repo-name>/" : "/",
  // ...existing plugins
})
```

Replace `<repo-name>` with `Assessment-Semester-2`.

**`.github/workflows/deploy.yml`** — copy pattern from source `assessment/.github/workflows/deploy.yml`:
- Trigger on `push` to `main` + `workflow_dispatch`
- `npm ci` → `npm run build` with `GITHUB_PAGES=true` env
- Deploy `dist/` via `actions/deploy-pages@v4`

### 9.2 Repo settings

- GitHub → Settings → Pages → Source: GitHub Actions
- Ensure `permissions: pages: write, id-token: write` in workflow

### 9.3 Local preview of production build

```bash
GITHUB_PAGES=true npm run build
npm run preview
```

### 9.4 `index.html` updates

```html
<html lang="nl">
<title>TLE 4 — Portfolio (placeholder)</title>
```

---

## 10. Implementation Phases

### Phase 1: Foundation — types, content, layout shell

**Agent:** dev  
**Files:** `src/content/*`, `src/components/layout/*`, `src/hooks/use-scroll-to.ts`, `index.html`

#### Steps

1. Create `src/content/types.ts` with all interfaces + `SectionId`, `NavItem`
2. Create placeholder content files (`about.ts`, `methods.ts`, `group-projects.ts`, `book.ts`, `future-plans.ts`, `index.ts`)
3. Add `EMPTY_METHOD` / `EMPTY_PROJECT` fallbacks
4. Create `SectionShell`, `SectionHeading`
5. Implement `useScrollTo` with navbar offset + reduced motion
6. Update `index.html` to `lang="nl"` and Dutch title
7. Add `public/placeholder-*.svg` assets

#### Acceptance Criteria

- [ ] `npm run typecheck` passes
- [ ] Content imports resolve from `@/content`
- [ ] `NAV_ITEMS` exports 5 items with correct ids/labels
- [ ] No real user data in any content file

---

### Phase 2: Design tokens and direction lock-in

**Agent:** ux  
**Files:** `src/index.css`, `package.json` (font packages), `src/components/motion/signature-element.tsx`

#### Steps

1. User selects Direction A, B, or C (or hybrid — document choice in commit message)
2. Install chosen `@fontsource/*` packages
3. Override oklch tokens in `index.css` for light + dark
4. Add `--font-heading`, `--font-mono`, semantic `--color-pros` / `--color-cons`
5. Implement signature element component + CSS
6. Add global `scroll-behavior: smooth` with reduced-motion override

#### Acceptance Criteria

- [ ] Light and dark modes both readable (WCAG AA contrast for body text)
- [ ] Fonts load without FOUT issues (single import block in `index.css`)
- [ ] Signature element visible in About section
- [ ] `d` key dark toggle still works

---

### Phase 3: Navbar + scroll spy + shadcn primitives

**Agent:** dev  
**Files:** `src/components/layout/navbar.tsx`, `src/hooks/use-scroll-spy.ts`, `src/components/ui/badge.tsx`, `separator.tsx`, `sheet.tsx`

#### Steps

1. Run `npx shadcn@latest add badge separator sheet`
2. Implement `useScrollSpy` with IntersectionObserver
3. Build `Navbar` — desktop links + active state + theme toggle
4. Add mobile `Sheet` menu with close-on-navigate
5. Wire `App.tsx` to render `Navbar` + empty section shells with correct ids

#### Acceptance Criteria

- [ ] Clicking nav scrolls to correct section with navbar offset
- [ ] Active nav highlights while scrolling through sections
- [ ] Mobile menu opens/closes; keyboard accessible
- [ ] All 5 section ids present in DOM

---

### Phase 4: Section components + lists + cards

**Agent:** dev  
**Files:** `src/components/sections/*`, `src/components/cards/*`, `src/components/lists/*`, `src/App.tsx`

#### Steps

1. Build `pros-list.tsx` and `cons-list.tsx` with Badge + lucide icons
2. Build `method-card.tsx` and `project-card.tsx` using shadcn Card
3. Build all 5 section components mirroring source layout logic
4. Enforce 2-slot guarantee in methods/projects sections
5. Compose full `App.tsx` with content imports
6. Remove placeholder welcome card from current `App.tsx`

#### Acceptance Criteria

- [ ] Visual structure matches source wireframes (columns, grids, stacks)
- [ ] Optional `strengths` renders only when defined
- [ ] `goalsReflection` block renders with Separator
- [ ] Book section shows 4 subsections + cover
- [ ] `npm run build` succeeds

---

### Phase 5: Motion polish (expressive)

**Agent:** ux  
**Files:** `src/components/motion/scroll-reveal.tsx`, `stagger-children.tsx`, `page-load-sequence.tsx`, section integrations

#### Steps

1. Create `ScrollReveal` and `StaggerChildren` with `useReducedMotion`
2. **Page-load orchestration:** navbar fades down → hero image scales in → headline stagger → interests block (sequential, ~1.2s total)
3. Apply scroll reveals to remaining section headings and cards with stagger (0.1s between cards)
4. **Nav active indicator:** animated underline slides between sections (Framer Motion `layoutId`)
5. **Hero parallax:** subtle `y` transform on profile image tied to scroll (disabled when reduced motion)
6. **Signature scan line:** CSS keyframes on section index strip (Direction A)
7. Tune spring settings (stiffness 300, damping 24); verify no jank on mobile

#### Acceptance Criteria

- [ ] Page-load sequence runs once on first visit; respects reduced motion
- [ ] Sections animate on first viewport entry only
- [ ] Nav underline transitions smoothly between active sections
- [ ] `prefers-reduced-motion: reduce` disables parallax and scan line
- [ ] No layout shift from animations
- [ ] Lighthouse performance remains acceptable (no scroll jank)

---

### Phase 6: Deployment + QA

**Agent:** dev  
**Files:** `vite.config.ts`, `.github/workflows/deploy.yml`, `README.md` (optional, only if user requests)

#### Steps

1. Add GitHub Pages `base` path config behind env flag
2. Copy/adapt deploy workflow from source assessment repo
3. Run full test checklist (§Testing Strategy)
4. Production build preview

#### Acceptance Criteria

- [ ] `npm run build` produces valid `dist/`
- [ ] GitHub Pages workflow deploys successfully (if enabled)
- [ ] Asset paths resolve correctly with `base` prefix
- [ ] All placeholder content visible on deployed URL

---

## 11. Files to Create/Modify

### Create

| Path | Purpose |
|------|---------|
| `src/content/types.ts` | TypeScript interfaces |
| `src/content/about.ts` | About placeholder |
| `src/content/methods.ts` | Methods placeholder (2 items) |
| `src/content/group-projects.ts` | Projects placeholder (2 items) |
| `src/content/book.ts` | Book placeholder |
| `src/content/future-plans.ts` | Future plans placeholder |
| `src/content/index.ts` | Barrel + NAV_ITEMS |
| `src/hooks/use-scroll-spy.ts` | Active section detection |
| `src/hooks/use-scroll-to.ts` | Smooth scroll with offset |
| `src/components/layout/navbar.tsx` | Navigation |
| `src/components/layout/section-shell.tsx` | Section wrapper |
| `src/components/layout/section-heading.tsx` | Section titles |
| `src/components/sections/about-section.tsx` | Over Mij |
| `src/components/sections/methods-section.tsx` | Toolkit |
| `src/components/sections/group-projects-section.tsx` | Projecten |
| `src/components/sections/book-section.tsx` | Boek |
| `src/components/sections/future-plans-section.tsx` | Toekomst |
| `src/components/cards/method-card.tsx` | Method card |
| `src/components/cards/project-card.tsx` | Project card |
| `src/components/cards/book-subsection.tsx` | Book reflection block |
| `src/components/lists/pros-list.tsx` | Pros list |
| `src/components/lists/cons-list.tsx` | Cons list |
| `src/components/motion/scroll-reveal.tsx` | Viewport animations |
| `src/components/motion/stagger-children.tsx` | Stagger container |
| `src/components/motion/signature-element.tsx` | Direction accent |
| `src/components/ui/badge.tsx` | shadcn |
| `src/components/ui/separator.tsx` | shadcn |
| `src/components/ui/sheet.tsx` | shadcn |
| `public/placeholder-profile.svg` | Placeholder image |
| `public/placeholder-book.svg` | Placeholder image |
| `.github/workflows/deploy.yml` | Optional CI deploy |

### Modify

| Path | Change |
|------|--------|
| `src/App.tsx` | Replace welcome card with full SPA layout |
| `src/index.css` | Fonts, tokens, signature CSS, scroll behavior |
| `index.html` | `lang="nl"`, Dutch title |
| `vite.config.ts` | Optional `base` for GitHub Pages |
| `package.json` | Add `@fontsource/*` packages for chosen direction |

### Keep unchanged (unless bugfix)

| Path | Notes |
|------|-------|
| `src/components/animated-container.tsx` | Reuse for navbar |
| `src/components/theme-provider.tsx` | Dark mode + `d` key |
| `src/components/ui/button.tsx` | Nav, theme toggle |
| `src/components/ui/card.tsx` | Cards |
| `src/lib/utils.ts` | `cn()` |
| `src/main.tsx` | ThemeProvider wrapper |
| `components.json` | base-nova config |

---

## 12. What NOT to Do

- **No real content** — do not copy text, images, or project names from `assessment/src/App.jsx`
- **No React Router** — single page only; anchor navigation
- **No CMS / API / backend** — static content files only
- **No over-engineering** — no state management library, no i18n framework, no test suite for placeholder strings
- **No section id changes** — breaks nav contract and assessment rubric anchors
- **No generic AI aesthetic** — avoid default purple gradients, Inter-only, cookie-cutter hero blobs without direction
- **No copying source styles** — gray/blue/green utility colors are reference layout only
- **No excessive shadcn installs** — only components listed in §6
- **No animations on every child** — stagger selectively (cards, lists), not every paragraph
- **No commits to `assessment/` junction** — all work stays in `Assessment Semester 2`

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| User picks design direction late | Rework tokens/fonts | Phase 2 gate before section styling; use CSS variables so swap is isolated to `index.css` |
| Scroll spy flicker between sections | Nav jitter | Use `rootMargin` tuning; debounce not needed if highest `intersectionRatio` wins |
| Fixed navbar covers section headings | Poor scroll UX | `scroll-mt-20` on all sections; `useScrollTo` offset matches |
| Framer Motion + reduced motion gaps | A11y failure | Centralize `useReducedMotion` in all motion wrappers; test with OS setting on |
| GitHub Pages wrong asset paths | Broken images/CSS | `base` in vite config; test with `preview` before deploy |
| shadcn Sheet focus trap on mobile | UX friction | Close sheet before scroll; test keyboard escape |
| Font payload size | Slow LCP | Limit to 2–3 weights per family; use variable fonts where available |
| TypeScript strict content shapes | Build errors | `satisfies` on content exports; unit types in `types.ts` |
| Dark mode contrast on custom palette | Illegible text | ux phase includes contrast check both modes |
| Placeholder images missing | Broken img | Ship SVGs in `public/`; fallback `onError` to muted block optional |

---

## Testing Strategy

### Manual testing checklist

**Navigation**
- [ ] Each nav label scrolls to correct section
- [ ] Active nav updates while scrolling up and down
- [ ] Mobile sheet opens, navigates, closes
- [ ] `d` toggles dark mode; preference persists (localStorage via ThemeProvider)

**Layout**
- [ ] Viewports: 320px, 768px, 1024px, 1440px — no horizontal overflow
- [ ] First section clears fixed navbar
- [ ] Methods: 2 cards side-by-side on desktop, stacked on mobile
- [ ] Projects: pros/cons columns collapse on mobile
- [ ] Book: cover stacks above content on mobile

**Content**
- [ ] All placeholders visible; no real personal data
- [ ] Empty pros/cons show italic fallback
- [ ] `strengths` hidden when undefined in content

**Motion & a11y**
- [ ] `prefers-reduced-motion: reduce` — animations disabled/minimal
- [ ] Keyboard: Tab through nav and sheet controls
- [ ] Focus visible on interactive elements
- [ ] Images have `alt` text

**Build & deploy**
- [ ] `npm run typecheck` — pass
- [ ] `npm run lint` — pass
- [ ] `npm run build` — pass
- [ ] `npm run preview` — all assets load
- [ ] (If Pages) deployed URL loads with correct base path

### Automated (lightweight, optional)

- No mandatory test framework for v1
- If adding tests later: single Vitest smoke test asserting `NAV_ITEMS` ids match `SECTION_IDS` and content arrays have length ≥ 0

### Browser matrix

- Chrome/Edge (primary)
- Firefox
- Mobile Safari (iOS scroll + Sheet behavior)

---

## Open Questions

1. ~~**Design direction**~~ — **Resolved:** Tech Refined / Signal Lab hybrid, dark-only.
2. ~~**GitHub repo name**~~ — **Resolved:** `Assessment-Semester-2` (Pages base: `/Assessment-Semester-2/`).
3. ~~**Navbar brand**~~ — **Resolved:** "Assessment 2".
4. ~~**Default theme**~~ — **Resolved:** Dark only.
