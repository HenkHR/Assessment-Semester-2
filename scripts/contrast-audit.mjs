/**
 * WCAG 2.x contrast audit — OKLCH tokens + alpha compositing
 */

function oklchToRgb(l, c, h, alpha = 1) {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  const clamp = (x) => Math.min(1, Math.max(0, x))
  r = clamp(r)
  g = clamp(g)
  bl = clamp(bl)

  return [r, g, bl, alpha]
}

function parseOklch(str) {
  const m = str.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
  )
  if (!m) throw new Error(`Cannot parse: ${str}`)
  let alpha = 1
  if (m[4]) {
    alpha = m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  }
  return oklchToRgb(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), alpha)
}

function parseHex(hex) {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  return [r, g, b, 1]
}

function composite(fg, bg) {
  const [fr, fg_, fb, fa] = fg
  const [br, bg_, bb] = bg
  const a = fa + (1 - fa) * 0 // bg is opaque
  const outA = fa + (1 - fa) * 1
  return [
    (fr * fa + br * (1 - fa)) / outA,
    (fg_ * fa + bg_ * (1 - fa)) / outA,
    (fb * fa + bb * (1 - fa)) / outA,
  ]
}

function relativeLuminance([r, g, b]) {
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const R = lin(r)
  const G = lin(g)
  const B = lin(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(fgRgb, bgRgb) {
  const l1 = relativeLuminance(fgRgb)
  const l2 = relativeLuminance(bgRgb)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function audit(name, fgStr, bgStr, type = "text") {
  let fgRgb, bgRgb
  if (fgStr.startsWith("#")) fgRgb = parseHex(fgStr).slice(0, 3)
  else fgRgb = composite(parseOklch(fgStr), parseOklch(bgStr))

  if (bgStr.startsWith("#")) bgRgb = parseHex(bgStr).slice(0, 3)
  else bgRgb = parseOklch(bgStr).slice(0, 3)

  if (!fgStr.startsWith("#") && fgStr.includes("/")) {
    fgRgb = composite(parseOklch(fgStr), parseOklch(bgStr))
  } else if (!fgStr.startsWith("#")) {
    fgRgb = parseOklch(fgStr).slice(0, 3)
  }

  const ratio = contrastRatio(fgRgb, bgRgb)
  const threshold = type === "ui" ? 3 : 4.5
  const pass = ratio >= threshold
  return { name, ratio: +ratio.toFixed(2), pass, threshold, type }
}

const tokens = {
  background: "oklch(0.14 0.02 250)",
  foreground: "oklch(0.93 0.01 250)",
  card: "oklch(0.17 0.02 250)",
  cardForeground: "oklch(0.93 0.01 250)",
  primary: "oklch(0.74 0.16 250)",
  primaryFg: "oklch(0.14 0.02 250)",
  secondary: "oklch(0.2 0.02 250)",
  secondaryFg: "oklch(0.93 0.01 250)",
  muted: "oklch(0.22 0.02 250)",
  mutedFg: "oklch(0.775 0.02 250)",
  accent: "oklch(0.22 0.04 180)",
  accentFg: "oklch(0.85 0.06 180)",
  destructive: "oklch(0.77 0.13 55)",
  border: "oklch(0.74 0.16 250 / 12%)",
  ring: "oklch(0.74 0.16 250 / 45%)",
  input: "oklch(0.74 0.16 250 / 15%)",
}

function blendOn(bg, fgColor, alpha) {
  return `oklch(${fgColor.match(/oklch\(([^)]+)\)/)[1]} / ${alpha * 100}%)`
}

const sectionAlt40 = blendOn(tokens.background, tokens.muted, 0.4)
const prosBg10 = blendOn(tokens.background, tokens.accent, 0.1)
const consBg10 = blendOn(tokens.background, tokens.destructive, 0.1)
const destructiveBg10 = blendOn(tokens.background, tokens.destructive, 0.1)
const destructiveBg20 = blendOn(tokens.background, tokens.destructive, 0.2)
const inputBg30 = blendOn(tokens.background, tokens.input.replace(/.*\/\s*/, "").includes("%") ? tokens.primary : tokens.input, 0.3)

// input is primary at 15%
const inputColor = "oklch(0.74 0.16 250)"
const inputBg30Fixed = blendOn(tokens.background, inputColor, 0.15 * 0.3 + 0) // actually bg-input/30 means 30% opacity of input token

function opacityBlend(bgToken, fgToken, opacity) {
  const fg = parseOklch(fgToken)
  const bg = parseOklch(bgToken)
  const blended = composite([fg[0], fg[1], fg[2], opacity], bg)
  return blended
}

function ratioFromTokens(fgToken, bgToken, fgOpacity = 1, bgOpacity = 1) {
  let fg = parseOklch(fgToken)
  let bg = parseOklch(bgToken)
  if (fgOpacity < 1) {
    return contrastRatio(
      composite([fg[0], fg[1], fg[2], fgOpacity], bg),
      bg.slice(0, 3),
    )
  }
  return contrastRatio(fg.slice(0, 3), bg.slice(0, 3))
}

function ratioHexOnHex(fg, bg) {
  return contrastRatio(parseHex(fg).slice(0, 3), parseHex(bg).slice(0, 3))
}

function ratioOklchOnBg(fgToken, bgToken, fgAlpha = 1) {
  const bg = parseOklch(bgToken)
  const fg = parseOklch(fgToken)
  const fgRgb =
    fgAlpha < 1 ? composite([fg[0], fg[1], fg[2], fgAlpha], bg) : fg.slice(0, 3)
  return contrastRatio(fgRgb, bg.slice(0, 3))
}

function ratioTextOnBlendedBg(textToken, blendToken, blendAlpha, bgToken) {
  const bg = parseOklch(bgToken)
  const blend = parseOklch(blendToken)
  const blendedBg = composite([blend[0], blend[1], blend[2], blendAlpha], bg)
  const text = parseOklch(textToken)
  return contrastRatio(text.slice(0, 3), blendedBg)
}

const checks = [
  ["foreground on background", () => ratioFromTokens(tokens.foreground, tokens.background)],
  ["muted-foreground on background", () => ratioFromTokens(tokens.mutedFg, tokens.background)],
  ["muted-foreground on card", () => ratioFromTokens(tokens.mutedFg, tokens.card)],
  ["muted-foreground on muted", () => ratioFromTokens(tokens.mutedFg, tokens.muted)],
  ["muted-foreground on section-alt/40", () => ratioTextOnBlendedBg(tokens.mutedFg, tokens.muted, 0.4, tokens.background)],
  ["primary on background (nav)", () => ratioFromTokens(tokens.primary, tokens.background)],
  ["primary-foreground on primary", () => ratioFromTokens(tokens.primaryFg, tokens.primary)],
  ["secondary-foreground on secondary", () => ratioFromTokens(tokens.secondaryFg, tokens.secondary)],
  ["accent-foreground on accent", () => ratioFromTokens(tokens.accentFg, tokens.accent)],
  ["text-pros (accent-foreground) on bg-pros/10", () => ratioTextOnBlendedBg(tokens.accentFg, tokens.accentFg, 0.1, tokens.background)],
  ["text-pros on background", () => ratioFromTokens(tokens.accentFg, tokens.background)],
  ["text-cons on bg-cons/10", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.1, tokens.background)],
  ["text-cons on background", () => ratioFromTokens(tokens.destructive, tokens.background)],
  ["destructive on destructive/10 bg", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.1, tokens.background)],
  ["destructive on destructive/20 bg", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.2, tokens.background)],
  ["card-foreground on card", () => ratioFromTokens(tokens.cardForeground, tokens.card)],
  ["border on background (UI 3:1)", () => ratioOklchOnBg(tokens.border, tokens.background), "ui"],
  ["ring on background (focus 3:1)", () => ratioOklchOnBg(tokens.ring, tokens.background), "ui"],
  ["signature-index text on signature-index bg", () => ratioFromTokens(tokens.primary, tokens.background), "text"],
  ["btn default: primary-fg on primary", () => ratioFromTokens(tokens.primaryFg, tokens.primary)],
  ["btn secondary: secondary-fg on secondary", () => ratioFromTokens(tokens.secondaryFg, tokens.secondary)],
  ["btn outline: foreground on background", () => ratioFromTokens(tokens.foreground, tokens.background)],
  ["btn outline: foreground on input/30", () => ratioTextOnBlendedBg(tokens.foreground, inputColor, 0.15 * 0.3, tokens.background)],
  ["btn destructive: destructive on destructive/10", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.1, tokens.background)],
  ["btn destructive dark: destructive on destructive/20", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.2, tokens.background)],
  ["btn link: primary on background", () => ratioFromTokens(tokens.primary, tokens.background)],
  ["badge default: primary-fg on primary", () => ratioFromTokens(tokens.primaryFg, tokens.primary)],
  ["badge secondary", () => ratioFromTokens(tokens.secondaryFg, tokens.secondary)],
  ["badge destructive on destructive/10", () => ratioTextOnBlendedBg(tokens.destructive, tokens.destructive, 0.1, tokens.background)],
  ["badge outline: foreground on background", () => ratioFromTokens(tokens.foreground, tokens.background)],
  ["badge link: primary on background", () => ratioFromTokens(tokens.primary, tokens.background)],
  ["placeholder figure on card bg", () => ratioFromTokens("oklch(0.775 0.02 250)", "oklch(0.17 0.02 250)")],
  ["placeholder inner panel on card bg", () => ratioFromTokens("oklch(0.35 0.02 250)", "oklch(0.17 0.02 250)")],
  ["favicon #3b82f6 on #18181b", () => ratioHexOnHex("#3b82f6", "#18181b")],
  ["favicon #60a5fa on #18181b", () => ratioHexOnHex("#60a5fa", "#18181b")],
  ["foreground on navbar bg/80", () => ratioTextOnBlendedBg(tokens.foreground, tokens.background, 0.8, tokens.background)],
  ["brand text (foreground) on navbar", () => ratioFromTokens(tokens.foreground, tokens.background)],
]

console.log("WCAG Contrast Audit\n")
console.log("| Pairing | Ratio | AA | Type |")
console.log("|---------|-------|-----|------|")
for (const [name, fn, type = "text"] of checks) {
  const ratio = fn()
  const threshold = type === "ui" ? 3 : 4.5
  const pass = ratio >= threshold ? "PASS" : "FAIL"
  console.log(`| ${name} | ${ratio.toFixed(2)}:1 | ${pass} | ${type} |`)
}
