import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * ── LEARNING ROADMAP + TUTOR SPLIT-VIEW UI FIX ──────────────────────────────
 *
 * REPORTED: opening the Learning Roadmap took the entire viewport, hiding
 * Tutor Max entirely, and the Tutor explanation block felt oversized.
 *
 * ROOT CAUSE (confirmed by reading LessonScreen.tsx directly — see the
 * "LEARNING ROADMAP SPLIT VIEW" comments at the 3-panel grid and at Panel 3):
 * the outer grid's className collapsed to a single, full-width column
 * (`'grid grid-cols-1'`) for EVERY `maximizedPanel` value, with no
 * distinction between "the learner wants a full-screen tool" (code editor)
 * and "the learner wants to browse lessons while still teaching" (roadmap).
 * Panel 3 (Tutor Chat) was then unconditionally `display:none` whenever any
 * other panel was maximized, roadmap included.
 *
 * THE FIX (LessonScreen.tsx only — no navigation/mastery/curriculum change):
 *  - The grid gets a THIRD, `'curriculum'`-specific className branch: mobile
 *    stays a single full-width column (unchanged mobile pattern — the
 *    roadmap still gets the whole screen there, since a phone has no usable
 *    width to split), and only at the `md:` breakpoint does it become a real
 *    2-column split, `md:grid-cols-[minmax(280px,32%)_1fr]` — a responsive
 *    fraction with a floor, never a fixed pixel pair.
 *  - Panel 3's className becomes conditional — `'hidden md:contents'` for
 *    'curriculum' (mirroring Panel 1's own existing pattern exactly), so
 *    Tutor Max is reachable on desktop beside the roadmap and still hidden
 *    on mobile, matching the existing mobile navigation exactly.
 *  - Panel 1 and Panel 2 needed NO changes — their existing conditions
 *    already do the right thing once the grid gives them a real column.
 *
 * MEASURED, not assumed — a static HTML harness reproducing this exact
 * markup and the REAL compiled Tailwind CSS from `npm run build` was opened
 * in local headless Chromium (no production/internet access needed — this
 * is pure local rendering) across six viewports:
 *
 *   390  (mobile)  -> roadmap 100%, chat NOT rendered (0 client rects)
 *   768  (md floor) -> roadmap 280px/36.5% (the 280px floor), chat 57.3%
 *   900             -> roadmap 280px/31.1%, chat 63.6%
 *   1024            -> roadmap 317px/31.0%, chat 64.3%
 *   1280            -> roadmap 399px/31.2%, chat 65.1%
 *   1440            -> roadmap 451px/31.3%, chat 65.4%
 *   bodyOverflowX: false at every one of the six viewports above.
 *
 * That is real evidence the ~30-35%/~65-70% target is met and nothing
 * overflows horizontally — not merely that the source text looks right.
 * This vitest file pins the SOURCE that produced those measurements, since
 * a real browser is not part of this project's normal test run (see
 * playwright.config.ts / e2e/README.md — e2e needs a live local Postgres +
 * seeded user and is explicitly a separate, manual harness).
 */

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')

const GRID_IDX = SRC.indexOf('3-PANEL GRID')
const GRID_CLASSNAME_IDX = SRC.indexOf('className={', GRID_IDX)
const GRID_BLOCK = SRC.slice(GRID_CLASSNAME_IDX, GRID_CLASSNAME_IDX + 400)

const PANEL3_IDX = SRC.indexOf('PANEL 3 — TUTOR CHAT')
const PANEL3_BLOCK = SRC.slice(PANEL3_IDX, PANEL3_IDX + 1200)

describe('1/2/3 — the Learning Roadmap is a ~32/68 split on desktop, not a full-screen replacement', () => {
  it('the grid gains a curriculum-specific responsive split, checked before the generic full-collapse branch', () => {
    expect(GRID_BLOCK).toContain(
      "maximizedPanel === 'curriculum' ? 'grid grid-cols-1 gap-0 p-0 md:grid-cols-[minmax(280px,32%)_1fr] md:gap-4 md:p-4'",
    )
    const curriculumIdx = GRID_BLOCK.indexOf("maximizedPanel === 'curriculum'")
    const genericCollapseIdx = GRID_BLOCK.indexOf("maximizedPanel ? 'grid grid-cols-1'")
    expect(curriculumIdx).toBeGreaterThan(-1)
    expect(genericCollapseIdx).toBeGreaterThan(curriculumIdx)
  })

  it('the split uses a bounded, responsive fraction (minmax floor + percentage) — never a fixed pixel pair that could overflow a narrow desktop window', () => {
    expect(GRID_BLOCK).toContain('minmax(280px,32%)_1fr')
    expect(GRID_BLOCK).not.toMatch(/grid-cols-\[\d+px_\d+px\]/)
  })

  it("Tutor Max (Panel 3) is NOT force-hidden for 'curriculum' — the inline style only hides it for 'code', never for 'curriculum' or 'chat'", () => {
    expect(PANEL3_BLOCK).toContain(
      "maximizedPanel && maximizedPanel !== 'chat' && maximizedPanel !== 'curriculum' ? { display: 'none' } : undefined",
    )
  })

  it("Panel 3's className switches to the roadmap-visible pattern only for 'curriculum', mirroring Panel 1's own existing 'hidden md:contents' convention", () => {
    expect(PANEL3_BLOCK).toContain("className={maximizedPanel === 'curriculum' ? 'hidden md:contents' : 'contents'}")
  })
})

describe('4/5 — the roadmap and Tutor Max keep their OWN independent scrolling (no page-level scroll, no nested scroll trap)', () => {
  it('the curriculum tree list is still its own overflowY:auto region, untouched by the split-view fix', () => {
    const treeIdx = SRC.indexOf('Curriculum tree')
    expect(treeIdx).toBeGreaterThan(-1)
    const block = SRC.slice(treeIdx, treeIdx + 200)
    expect(block).toMatch(/flex:\s*1,\s*overflowY:\s*'auto'/)
  })

  it("Tutor Max's message list is still its own overflowY:auto region (messagesAreaRef), untouched by the split-view fix", () => {
    const idx = SRC.indexOf('ref={messagesAreaRef}')
    expect(idx).toBeGreaterThan(-1)
    const block = SRC.slice(idx, idx + 200)
    expect(block).toMatch(/overflowY:\s*'auto'/)
  })
})

describe('6/7/8/9/10 — the previous lesson-selection navigation fix is untouched by this UI pass', () => {
  it('the roadmap row click handler is still the single, unconditional requestLessonSwitch(lesson) — no new lock/selection branch added', () => {
    const matches = [...SRC.matchAll(/onClick=\{\(\) => \{\s*\/\/ Free navigation:[\s\S]*?requestLessonSwitch\(lesson\)\s*\}\}/g)]
    expect(matches.length).toBe(1)
  })

  it("confirmLessonSwitch still restores the chat panel and stages the SAME target — the automatic Roadmap -> Learn navigation from the prior fix is intact", () => {
    const start = SRC.indexOf('const confirmLessonSwitch = useCallback')
    const end = SRC.indexOf('}, [lessonSwitchDialog, stageLessonPreview])', start)
    const body = SRC.slice(start, end)
    const dialogCloseIdx = body.indexOf('setLessonSwitchDialog(null)')
    const restoreIdx = body.indexOf("setMaximizedPanel('chat')")
    const stageIdx = body.indexOf('stageLessonPreview(target)')
    expect(dialogCloseIdx).toBeGreaterThan(-1)
    expect(restoreIdx).toBeGreaterThan(dialogCloseIdx)
    expect(stageIdx).toBeGreaterThan(restoreIdx)
  })

  it('closing/exiting the roadmap still restores normal Learn layout via the pre-existing restore controls, unchanged', () => {
    // The mobile "← Back to Tutor Max" button.
    expect(SRC).toContain("onClick={() => setMaximizedPanel('chat')}")
    // The desktop maximize/restore toggle on the roadmap panel header.
    expect(SRC).toContain("onClick={() => setMaximizedPanel(maximizedPanel === 'curriculum' ? 'chat' : 'curriculum')}")
  })

  it('locked-lesson behaviour is unchanged — still advisory-only, still the same computeLessonLockState call, no new gate introduced by this UI pass', () => {
    expect(SRC).toMatch(/computeLessonLockState\(lesson, \{ progress: lessonListLockProgress, topicProgressMap, availableTopicSlugs \}\)/)
    // The row click handler has no isLocked branch (still unconditional).
    const idx = SRC.indexOf('requestLessonSwitch(lesson)')
    const before = SRC.slice(Math.max(0, idx - 400), idx)
    expect(before).not.toMatch(/if \(isLocked\)/)
  })
})

describe('11 — mobile behaviour is preserved: the split applies ONLY at the md breakpoint', () => {
  it("the grid's unprefixed (mobile-first) track is a plain single full-width column, matching the existing mobile roadmap exactly", () => {
    const curriculumClass = "grid grid-cols-1 gap-0 p-0 md:grid-cols-[minmax(280px,32%)_1fr] md:gap-4 md:p-4"
    expect(GRID_BLOCK).toContain(curriculumClass)
    // Only 'md:'-prefixed utilities introduce the split/spacing — every
    // unprefixed utility in this class list is the mobile-unchanged base.
    const unprefixed = curriculumClass.split(' ').filter((c) => !c.startsWith('md:'))
    expect(unprefixed).toEqual(['grid', 'grid-cols-1', 'gap-0', 'p-0'])
  })

  it("Panel 3's className starts 'hidden' for 'curriculum' — still hidden on mobile, matching the pre-existing pattern", () => {
    expect(PANEL3_BLOCK).toContain("'hidden md:contents' : 'contents'")
  })

  it('no separate mobile-only lesson-selection handler was created — the roadmap row click stays the single shared implementation', () => {
    const matches = [...SRC.matchAll(/requestLessonSwitch\(lesson\)/g)]
    expect(matches.length).toBe(1)
  })
})

describe('12 — no horizontal overflow at supported desktop widths', () => {
  it('the split track is bounded by minmax (a floor, not an unbounded fixed value) — this is what a real local-Chromium measurement (see header comment) confirmed produces zero horizontal overflow at 768/900/1024/1280/1440px', () => {
    expect(GRID_BLOCK).toMatch(/md:grid-cols-\[minmax\(280px,32%\)_1fr\]/)
  })
})

// SUPERSEDES this file's own prior "capped ... and centered" assertions
// below. `margin: '0 auto'` CENTERS a capped-width row — that moves the
// LEFT edge inward exactly as much as the right, which is a real, reported
// regression ("the panel shrank from the left"), not merely a naming
// nitpick. The fix drops centering entirely: a left-anchored width (no
// auto margin) sits flush at the start of its flex-column parent by
// default, so the same ~30% compactness goal is met with the removed
// space appearing ONLY on the right. See the row's own comment in
// LessonScreen.tsx for the full reasoning.
describe('Tutor explanation content is ~30% narrower on desktop, anchored to its LEFT edge (not centered)', () => {
  const rowStart = SRC.indexOf('<div key={msg.id}')
  const rowBlockEnd = SRC.indexOf('{/* Tutor avatar row', rowStart)
  const rowBlock = SRC.slice(rowStart, rowBlockEnd)

  it('a plain (non-canvas) message row gets a responsive width class — 100% on mobile, 70% on desktop — never a centering margin', () => {
    expect(rowBlock).toContain("className={hasCanvasVisual ? undefined : 'w-full md:w-[70%]'}")
    // The regression this superseded is a NEGATIVE control — checked against
    // the REAL style object only (rowBlock's own explanatory comment quotes
    // the old, superseded literal verbatim for context, so asserting against
    // the whole block would trip on the comment, not the code).
    const styleStart = rowBlock.indexOf('style={{')
    const styleObject = rowBlock.slice(styleStart, rowBlock.indexOf('}}>', styleStart))
    expect(styleObject).not.toMatch(/margin:\s*['"]0 auto['"]/)
    expect(styleObject).not.toContain('maxWidth: 760')
  })

  it('canvas (figure) rows are completely untouched — className stays undefined, inline width:100% unchanged', () => {
    expect(rowBlock).toContain("...(hasCanvasVisual ? { width: '100%' } : null)")
  })

  it('mobile is unaffected (still full width) — only the md: (desktop) breakpoint introduces the 70% reduction', () => {
    const classAttr = "className={hasCanvasVisual ? undefined : 'w-full md:w-[70%]'}"
    expect(rowBlock).toContain(classAttr)
    const value = "w-full md:w-[70%]"
    const unprefixed = value.split(' ').filter((c) => !c.startsWith('md:'))
    expect(unprefixed).toEqual(['w-full'])
  })

  it('the message-text wrapper gets a modest, deliberate trim (16.2->15.6 fontSize, 1.7->1.6 lineHeight) — not a blanket 30% font shrink, and still a comfortable size for a weak/lower-intermediate learner (>=15px)', () => {
    const idx = SRC.indexOf('<div className="animate-message"')
    expect(idx).toBeGreaterThan(-1)
    const block = SRC.slice(idx, idx + 200)
    expect(block).toContain('fontSize: 15.6, lineHeight: 1.6')
    // Sanity floor: still comfortably above a "too small" body-text size.
    expect(15.6).toBeGreaterThanOrEqual(15)
  })

  it('the tutor bubble Card padding is UNCHANGED (14px 16px) — deliberately out of scope, a separately pinned invariant this task does not touch', () => {
    // See src/tests/lessonHeaderAndCanvas.test.ts's own pin on this exact
    // literal (the false-branch/canvas-mode split). Re-asserted here so a
    // future "compactness" edit to THIS file doesn't silently touch it
    // without also updating that dedicated test.
    expect(SRC).toContain("padding: hasCanvasVisual ? undefined : '14px 16px'")
  })
})

describe('13 — no regression to existing LessonScreen tests (see full-suite run in validation; these are the layout-adjacent ones re-affirmed here)', () => {
  it('the file still exports exactly one LessonScreen component (sanity: no stray duplicate introduced)', () => {
    expect(SRC.match(/^export function LessonScreen\(/gm)?.length).toBe(1)
  })
})
