/**
 * A LEARNER'S INTERFACE MUST BE IN THEIR LANGUAGE, AND ITS CONTROLS MUST SAY
 * WHICH ONE THEY ARE.
 *
 * ── MEASURED IN A REAL BROWSER, production, 2026-08-11 ──────────────────────
 * Auditing on-screen control density on the real account surfaced two things
 * that were not density problems at all:
 *
 *   1. The previous-lesson button announced itself as "Previous урок" — an
 *      English UI with a hardcoded Russian noun welded onto the translated
 *      adjective. Its three sibling labels (nav_lesson_area,
 *      nav_current_lesson, nav_next_lesson) are complete phrases per language;
 *      only this one was assembled by concatenation, and the noun never moved.
 *
 *   2. SEVEN buttons reading exactly "Prerequisites needed ▼" were on screen
 *      at once at 1280×800, with nothing in any of them saying which lesson it
 *      belonged to.
 *
 * These are cheap to reintroduce — a new language block that forgets a key, a
 * new label built by string concatenation — so they are pinned here rather
 * than left to the next audit to find again.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf8')

describe('no language leaks into another language’s interface', () => {
  const CYRILLIC = /[Ѐ-ӿ]/

  it('the lesson navigation panel contains no hardcoded foreign words', () => {
    const src = read('src/components/learn/LessonNavigationPanel.tsx')
    const offenders = src.split('\n')
      .map((line, i) => [i + 1, line] as const)
      .filter(([, line]) => CYRILLIC.test(line))
    expect(offenders.map(([n, l]) => `${n}: ${l.trim()}`)).toEqual([])
  })

  it('every language defines the previous-lesson label instead of building it', () => {
    const src = read('src/lib/i18n.ts')
    // One definition per language block, and as many as nav_next_lesson has.
    const prev = src.match(/^\s*nav_previous_lesson:/gm)?.length ?? 0
    const next = src.match(/^\s*nav_next_lesson:/gm)?.length ?? 0
    expect(next).toBeGreaterThan(0)
    expect(prev).toBe(next)
  })

  it('the label is used whole, never concatenated with a literal noun', () => {
    const src = read('src/components/learn/LessonNavigationPanel.tsx')
    // `${t('nav_previous')} <word>` is the shape that produced "Previous урок".
    expect(src).not.toMatch(/\$\{t\('nav_previous'\)\}\s*\S/)
    expect(src).toContain("aria-label={t('nav_previous_lesson')}")
  })
})

describe('repeated controls say which one they are', () => {
  it('the locked-lesson disclosure names its lesson', () => {
    const src = read('src/components/learn/LessonScreen.tsx')
    // Seven of these render at once; the accessible name must differ per row.
    expect(src).toMatch(/aria-label=\{`\$\{t\('kg_prereqs_needed'\)\}: \$\{lesson\.lessonTitle\}`\}/)
    expect(src).toMatch(/aria-expanded=\{isLockExpanded\}/)
  })

  it('the glyph-only maximize buttons have a spoken name', () => {
    const src = read('src/components/learn/LessonScreen.tsx')
    // The visible content is "⊞", which is not a name. Three panels
    // (curriculum, code, chat) each carry a direct one-click header button —
    // the chat panel's used to be buried inside the "More" menu only.
    const named = src.match(/aria-label=\{maximizedPanel === '(?:curriculum|code|chat)' \? t\('learn_restore'\) : t\('learn_maximize'\)\}/g)
    expect(named?.length).toBe(3)
  })

  it('none of the three maximize buttons is below the 24px minimum hit area', () => {
    const src = read('src/components/learn/LessonScreen.tsx')
    // All three were (or would have been) 22×22. Measured, not assumed: the literal is in the style.
    expect(src).not.toMatch(/width: 22, height: 22, borderRadius: 4, border: '1px solid var\(--border-default\)'/)
    const sized = src.match(/width: 26, height: 26, borderRadius: 4, border: '1px solid var\(--border-default\)'/g)
    expect(sized?.length).toBe(3)
  })
})
