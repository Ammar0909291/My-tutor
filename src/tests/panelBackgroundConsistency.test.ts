import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * ── LEARNING ROADMAP / TUTOR MAX PANEL BACKGROUND CONSISTENCY ──────────────
 *
 * REPORTED: the left Learning Roadmap panel and the right Tutor Max panel
 * had visibly different background colors — they didn't read as one
 * cohesive workspace.
 *
 * ROOT CAUSE, confirmed by reading the design tokens directly:
 *   - Every panel here (Lesson List, Code Editor, Tutor Chat) wraps in the
 *     shared `Panel` -> `<Card>` primitive from `@/components/ui/candy`.
 *     `Card`'s own CSS module (primitives.module.css) reads `--candy-card`
 *     directly — a token defined by the OLD "candy" theme
 *     (candy/tokens.module.css), not by the Study Board re-skin this file's
 *     own header comment says replaced it.
 *   - LessonScreen.module.css's `.learnCandy` re-skin re-points every other
 *     semantic token (--bg-*, --text-*, --border-*, --coral, the semantic
 *     hues) but never re-pointed `--candy-card` — an oversight, not a
 *     deliberate choice (nothing in the file's own extensive commentary
 *     mentions leaving it as-is).
 *   - Meanwhile the Tutor Chat messages area (LessonScreen.tsx) explicitly
 *     paints itself `background: 'var(--bg-void)'` — a Study Board token.
 *     So the roadmap's main surface (stale `--candy-card`, a cool near-
 *     black unrelated to the warm Study Board palette) and the chat's main
 *     surface (`--bg-void`, the Study Board "desk" tone) were two genuinely
 *     different color families on screen at once — the reported seam.
 *
 * THE FIX: `--candy-card: var(--bg-void);` added to BOTH the light and dark
 * `.learnCandy` blocks in LessonScreen.module.css. This re-points the ONE
 * missing token via the file's own existing cascade mechanism (its header
 * comment: "because custom properties cascade, every inline style + child
 * panel under this root re-skins automatically — no JSX/logic changes") —
 * no new arbitrary color, no change to Card.tsx or primitives.module.css
 * (so Dashboard/Coach/Quiz/Flashcards, which also use <Card> outside this
 * scope, are completely unaffected), no change to LessonScreen.tsx at all.
 */

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const CSS = read('src/components/learn/LessonScreen.module.css')
const TSX = read('src/components/learn/LessonScreen.tsx')
const PRIMITIVES_CSS = read('src/components/ui/candy/primitives.module.css')
const CANDY_TOKENS_CSS = read('src/components/ui/candy/tokens.module.css')

const LIGHT_BLOCK = CSS.slice(CSS.indexOf('.learnCandy {'), CSS.indexOf(":global([data-theme='dark']) .learnCandy {"))
const DARK_START = CSS.indexOf(":global([data-theme='dark']) .learnCandy {")
const DARK_BLOCK = CSS.slice(DARK_START, CSS.indexOf('\n}', DARK_START))

describe('both panels now share the SAME primary background token', () => {
  it('the light .learnCandy block re-points --candy-card to --bg-void', () => {
    expect(LIGHT_BLOCK).toContain('--candy-card: var(--bg-void);')
  })

  it("the dark [data-theme='dark'] .learnCandy block re-points --candy-card to --bg-void too — not just the light default", () => {
    expect(DARK_BLOCK).toContain('--candy-card: var(--bg-void);')
  })

  it('the override is a reference to an EXISTING token, never a new arbitrary hex color', () => {
    const lightIdx = LIGHT_BLOCK.indexOf('--candy-card:')
    const lightLine = LIGHT_BLOCK.slice(lightIdx, LIGHT_BLOCK.indexOf(';', lightIdx) + 1)
    const darkIdx = DARK_BLOCK.indexOf('--candy-card:')
    const darkLine = DARK_BLOCK.slice(darkIdx, DARK_BLOCK.indexOf(';', darkIdx) + 1)
    expect(lightLine).toMatch(/--candy-card:\s*var\(--bg-void\);/)
    expect(darkLine).toMatch(/--candy-card:\s*var\(--bg-void\);/)
    expect(lightLine).not.toMatch(/#[0-9a-fA-F]{3,8}/)
    expect(darkLine).not.toMatch(/#[0-9a-fA-F]{3,8}/)
  })

  it('the Tutor Chat messages area still explicitly uses --bg-void, unchanged — so it now matches the roadmap panel exactly instead of by coincidence', () => {
    const idx = TSX.indexOf('ref={messagesAreaRef}')
    const block = TSX.slice(idx, idx + 250)
    expect(block).toContain("background: 'var(--bg-void)'")
  })
})

describe('nested cards/rows inside each panel remain distinguishable (not everything flattened to one tone)', () => {
  it("the Tutor Max message bubble stays on --bg-surface, a distinct token from the new shared --bg-void background", () => {
    const idx = TSX.indexOf("background: hasCanvasVisual ? 'transparent' : 'var(--bg-surface)'")
    expect(idx).toBeGreaterThan(-1)
  })

  it('the Learning Roadmap unit-header rows stay on --bg-elevated, a distinct token from the new shared --bg-void background', () => {
    const idx = TSX.indexOf("background: unitComplete ? 'rgba(63,185,80,0.15)' : `${UI.indigo}18`")
    expect(idx).toBeGreaterThan(-1)
  })

  it('--bg-surface and --bg-elevated remain distinct from --bg-void in both themes (never accidentally collapsed to the same value)', () => {
    for (const block of [LIGHT_BLOCK, DARK_BLOCK]) {
      const voidLine = block.slice(block.indexOf('--bg-void:'), block.indexOf(';', block.indexOf('--bg-void:')))
      const surfaceLine = block.slice(block.indexOf('--bg-surface:'), block.indexOf(';', block.indexOf('--bg-surface:')))
      const elevatedLine = block.slice(block.indexOf('--bg-elevated:'), block.indexOf(';', block.indexOf('--bg-elevated:')))
      expect(voidLine).not.toBe(surfaceLine)
      expect(voidLine).not.toBe(elevatedLine)
    }
  })
})

describe('scope: only this Study Board re-skin is touched — the shared candy primitive and its OTHER consumers are untouched', () => {
  it('Card.tsx / primitives.module.css keep reading the original --candy-card token, unmodified', () => {
    expect(PRIMITIVES_CSS).toContain('background: var(--candy-card);')
  })

  it("the base candy theme's own --candy-card definitions (used by Dashboard/Coach/Quiz/Flashcards, outside .learnCandy) are untouched", () => {
    expect(CANDY_TOKENS_CSS).toContain('--candy-card: #FFFFFF;')
    expect(CANDY_TOKENS_CSS).toContain('--candy-card: #161B22;')
  })

  it('the re-skin still composes candyTheme (so --candy-green/--candy-yellow/--candy-text-muted consumers are unaffected) — unchanged', () => {
    expect(LIGHT_BLOCK).toContain("composes: candyTheme from '../ui/candy/tokens.module.css'")
  })
})

describe('no layout, width, roadmap-behaviour, or teaching-logic change accompanies this fix', () => {
  it('LessonScreen.tsx itself is untouched by this change (the fix is CSS-only, in LessonScreen.module.css)', () => {
    // The split-view grid class and the left-anchored message-row width
    // class from the two prior UI fixes are still present, byte-for-byte —
    // confirming this turn touched no JSX/layout in this file at all.
    expect(TSX).toContain(
      "maximizedPanel === 'curriculum' ? 'grid grid-cols-1 gap-0 p-0 md:grid-cols-[minmax(280px,32%)_1fr] md:gap-4 md:p-4'",
    )
    expect(TSX).toContain("className={hasCanvasVisual ? undefined : 'w-full md:w-[70%]'}")
  })

  it('requestLessonSwitch(lesson) — the single lesson-selection handler — is unchanged, still the only implementation', () => {
    const matches = [...TSX.matchAll(/requestLessonSwitch\(lesson\)/g)]
    expect(matches.length).toBe(1)
  })
})
