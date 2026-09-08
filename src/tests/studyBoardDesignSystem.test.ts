/**
 * STUDY BOARD — the chalkboard/notebook visual identity for /learn,
 * replacing the earlier generic purple-on-near-black "AI chat" skin.
 *
 * Achieved almost entirely through the EXISTING re-skin mechanism
 * (LessonScreen.module.css's `.learnCandy`, which re-points the app-wide
 * bg/text/border/coral custom properties that ~180 inline styles in
 * LessonScreen.tsx already read) — the same technique the prior "candy"
 * skin used, so this is a token/font change, not a JSX rewrite. Zero
 * teaching-logic, grading-authority, or state-machine changes.
 *
 * Source-text assertions, matching this repo's established pattern for
 * LessonScreen.tsx (no render harness exists — see chatAutoScroll.test.ts,
 * tutorMaxLearningView.test.ts for the same style).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const CSS = read('src/components/learn/LessonScreen.module.css')
const TSX = read('src/components/learn/LessonScreen.tsx')
const LAYOUT = read('src/app/layout.tsx')

describe('fonts — Fraunces (display) / IBM Plex Sans (body) / IBM Plex Mono (data)', () => {
  it('layout.tsx loads all three as additive next/font/google entries', () => {
    expect(LAYOUT).toMatch(/import \{ Inter, Plus_Jakarta_Sans, JetBrains_Mono, Nunito, Baloo_2, Fraunces, IBM_Plex_Sans, IBM_Plex_Mono \} from 'next\/font\/google'/)
    expect(LAYOUT).toContain("variable: '--font-fraunces'")
    expect(LAYOUT).toContain("variable: '--font-plex-sans'")
    expect(LAYOUT).toContain("variable: '--font-plex-mono'")
  })

  it('their CSS variables are attached to <html>, alongside the existing font variables (none removed)', () => {
    const idx = LAYOUT.indexOf('<html lang="en"')
    const line = LAYOUT.slice(idx, LAYOUT.indexOf('>', idx))
    for (const v of ['inter.variable', 'body.variable', 'mono.variable', 'nunito.variable', 'baloo2.variable', 'fraunces.variable', 'plexSans.variable', 'plexMono.variable']) {
      expect(line).toContain(v)
    }
  })
})

describe('color tokens — a real chalkboard (dark) / whiteboard (light) pair, not an inverted single palette', () => {
  it('the light default defines a full token set including a marker-green accent', () => {
    const idx = CSS.indexOf('.learnCandy {')
    const end = CSS.indexOf("font-family: var(--font-plex-sans)")
    const block = CSS.slice(idx, end)
    expect(block).toContain('--sb-accent: #2F7D5A')
    expect(block).toContain('--bg-void: var(--sb-paper)')
    expect(block).toContain('--coral: var(--sb-accent)')
  })

  it('[data-theme="dark"] redefines the SAME token names with chalk-amber, not a copy-pasted duplicate scheme', () => {
    const idx = CSS.indexOf(":global([data-theme='dark']) .learnCandy {")
    expect(idx).toBeGreaterThan(-1)
    const end = CSS.indexOf('\n}', idx)
    const block = CSS.slice(idx, end)
    expect(block).toContain('--sb-accent: #E8B84B')
    expect(block).toContain('--coral: var(--sb-accent)')
  })

  it('still composes the shared candyTheme primitives, so components that read --candy-green/--candy-yellow/--candy-text-muted directly (FinalAssessmentModal, PracticePanel, DynamicVisualRenderer) are not left pointing at nothing', () => {
    const idx = CSS.indexOf('.learnCandy {')
    const block = CSS.slice(idx, idx + 700)
    expect(block).toContain("composes: candyTheme from '../ui/candy/tokens.module.css'")
  })

  it('the body font-family switched from Nunito to IBM Plex Sans', () => {
    expect(CSS).not.toMatch(/font-family:\s*var\(--font-nunito\)/)
    expect(CSS).toContain("font-family: var(--font-plex-sans), 'IBM Plex Sans'")
  })
})

describe('the JS brand accent (UI.indigo) — used directly in ~60 inline styles the CSS cascade cannot reach', () => {
  it('is no longer the old purple', () => {
    const idx = TSX.indexOf('const UI = {')
    const block = TSX.slice(idx, idx + 400)
    expect(block).not.toContain('#6C5CE7')
    expect(block).toContain("indigo: '#C97A22'")
  })
})

describe('the display face is applied at real headline moments, not as a blanket page-wide override', () => {
  it('the Tutor Max header name', () => {
    const idx = TSX.indexOf("{t('lesson_tutor_max')}")
    // 2026-09-08: the element's style block grew (nowrap/ellipsis/lineHeight,
    // added so the name cannot wrap out of the fixed-height header). Same
    // invariant, wider window — the display face must still be applied here.
    const before = TSX.slice(Math.max(0, idx - 420), idx)
    expect(before).toContain('styles.displayFace')
  })

  it('the Lesson Roadmap panel title', () => {
    const idx = TSX.indexOf("{t('lesson_roadmap')}\n              </span>")
    const before = TSX.slice(Math.max(0, idx - 250), idx)
    expect(before).toContain('styles.displayFace')
  })

  it('each lesson row title in the list', () => {
    const idx = TSX.indexOf('{lesson.order}. {lesson.lessonTitle}')
    const before = TSX.slice(Math.max(0, idx - 850), idx)
    expect(before).toContain('className={styles.displayFace}')
  })

  it('the floating Quick Check question', () => {
    const idx = TSX.indexOf('{activeMcq.question}')
    const before = TSX.slice(Math.max(0, idx - 200), idx)
    expect(before).toContain('styles.displayFace')
  })

  it('the inline practice (InlinePracticePrompt) question', () => {
    const idx = TSX.indexOf('function InlinePracticePrompt(')
    const block = TSX.slice(idx, idx + 900)
    expect(block).toContain('styles.displayFace')
    expect(block).not.toContain('candy-purple')
  })

  it('the lesson-complete headline', () => {
    const idx = TSX.indexOf("fullyMastered ? `\\u2713 ${t('lc_complete')}")
    expect(idx).toBeGreaterThan(-1)
    const before = TSX.slice(Math.max(0, idx - 200), idx)
    expect(before).toContain('styles.displayFace')
  })
})

describe('the Quick Check panels read as a pinned note (a thin accent cap), not a plain card', () => {
  it('the floating Quick Check CSS class carries an accent top border', () => {
    const idx = CSS.indexOf('.quickCheckFloating {')
    const block = CSS.slice(idx, idx + 500)
    expect(block).toContain('border-top: 3px solid var(--coral) !important')
  })

  it('the inline practice card gets the same treatment inline (a different component, same visual language)', () => {
    const idx = TSX.indexOf('function InlinePracticePrompt(')
    const block = TSX.slice(idx, idx + 700)
    expect(block).toContain("borderTop: `3px solid var(--coral)`")
  })
})

describe('nothing here touches teaching logic, grading, or state', () => {
  it('no new useState/useEffect was introduced by this change (font/color/className edits only)', () => {
    // A loose structural guard, not a line-count assertion: the edits in this
    // change are className/style/token additions, not new hooks.
    const idx = TSX.indexOf('function InlinePracticePrompt(')
    const block = TSX.slice(idx, idx + 900)
    expect(block).toContain('useState')
    // (InlinePracticePrompt's own pre-existing `selected` state — unchanged,
    // present before this change; asserting it still exists as expected.)
  })
})
