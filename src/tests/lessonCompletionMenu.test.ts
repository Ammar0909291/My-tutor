import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * LESSON COMPLETION MENU — three compact actions on the P6.6 completion
 * card: Start Next Lesson, Restart Current Lesson, Close.
 *
 * Source assertions, matching this repo's established pattern for
 * LessonScreen.tsx (no React-render harness exists here — see
 * lessonTransition.test.ts's "STRUCTURAL LOCK" suite for the same style
 * applied to the sibling completeAndAdvance/confirmLessonSwitch functions).
 *
 * WHAT THIS PINS, PER REQUIREMENT:
 * - Start Next Lesson: UNCHANGED — still clears the card then calls the one
 *   canonical transition (completeAndAdvance), still gated on
 *   nextLessonOrder !== null (an already-completed final lesson has no next
 *   lesson to start).
 * - Restart Current Lesson: reuses the SAME lesson-switch gate every other
 *   restart in the app goes through (requestLessonSwitch -> confirm dialog
 *   -> confirmLessonSwitch -> callLessonInit(mode:'restart')) — no second,
 *   parallel restart mechanism. Always rendered (not gated on
 *   nextLessonOrder).
 * - Close: touches lessonCompletion state ONLY. It must call NEITHER
 *   completeAndAdvance NOR requestLessonSwitch NOR any progress-mutating
 *   function — closing must never record, advance, or alter completion.
 */

const SRC = readFileSync(
  path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'),
  'utf8',
)

// The completion card: from its own opening comment to the closing of the
// `{lessonCompletion && (...)}` block, bounded by the next major section
// (the P2 tappable-MCQ block) rather than a fixed character count, matching
// lessonTransition.test.ts's own reasoning for why a fixed window is fragile.
const CARD_START = SRC.indexOf('{lessonCompletion && (')
const CARD_END = SRC.indexOf('{/* P2 — tappable multiple-choice answers.', CARD_START)
const CARD = SRC.slice(CARD_START, CARD_END)

describe('lesson completion menu — structure', () => {
  it('the completion card block is found and non-trivial', () => {
    expect(CARD_START).toBeGreaterThan(-1)
    expect(CARD_END).toBeGreaterThan(CARD_START)
    expect(CARD.length).toBeGreaterThan(200)
  })

  it('renders exactly three action buttons, in order: next, restart, close', () => {
    const buttons = [...CARD.matchAll(/\{t\('(lc_next|lc_restart|lc_close)'\)\}/g)].map((m) => m[1])
    expect(buttons).toEqual(['lc_next', 'lc_restart', 'lc_close'])
  })
})

describe('Start Next Lesson — unchanged behaviour', () => {
  const start = CARD.indexOf("{t('lc_next')}")
  const onClickStart = CARD.lastIndexOf('onClick={() => {', start)
  const body = CARD.slice(onClickStart, start)

  it('is still gated on a next lesson actually existing', () => {
    expect(CARD.slice(0, onClickStart)).toContain('lessonCompletion.nextLessonOrder !== null')
  })

  it('still clears the card and calls the one canonical transition', () => {
    expect(body).toContain('setLessonCompletion(null)')
    expect(body).toContain('completeAndAdvance(currentLessonData.order, currentLessonData)')
  })

  it('does not call the restart or lesson-switch path', () => {
    expect(body).not.toContain('requestLessonSwitch(')
    expect(body).not.toContain("callLessonInit(sessionId, 'restart'")
  })
})

describe('Restart Current Lesson — reuses the canonical restart gate', () => {
  const start = CARD.indexOf("{t('lc_restart')}")
  const onClickStart = CARD.lastIndexOf('onClick={() => {', start)
  const body = CARD.slice(onClickStart, start)

  it('exists and is NOT gated on nextLessonOrder — always available', () => {
    expect(start).toBeGreaterThan(-1)
    // The nearest preceding conditional must be the Next button's own gate,
    // not one that also wraps Restart.
    const nextGate = CARD.lastIndexOf('lessonCompletion.nextLessonOrder !== null', onClickStart)
    const nextButtonEnd = CARD.indexOf(')}', CARD.indexOf("{t('lc_next')}"))
    expect(nextGate).toBeLessThan(nextButtonEnd)
  })

  it('clears the card, then hands off to requestLessonSwitch — no parallel restart mechanism', () => {
    expect(body).toContain('setLessonCompletion(null)')
    expect(body).toContain('requestLessonSwitch(currentLessonData)')
    // Must NOT call callLessonInit directly — that would duplicate the
    // reset/confirm-dialog/tab-switch logic requestLessonSwitch ->
    // confirmLessonSwitch already owns.
    expect(body).not.toContain('callLessonInit(')
    expect(body).not.toContain('completeAndAdvance(')
  })

  it('targets the just-finished lesson, which requestLessonSwitch itself classifies as a restart', () => {
    // requestLessonSwitch computes isRestart from
    // target.order === curriculumProgress.currentLesson. currentLessonData
    // (passed here) is derived from that same curriculumProgress.currentLesson
    // and is not advanced until completeAndAdvance runs (Next button only) —
    // so passing it here is guaranteed to hit the restart branch, not review
    // or forward-navigation.
    const reqSrc = SRC.slice(
      SRC.indexOf('const requestLessonSwitch = useCallback'),
      SRC.indexOf('const requestLessonSwitch = useCallback') + 500,
    )
    expect(reqSrc).toContain('target.order === curriculumProgress.currentLesson')
  })
})

describe('Close — dismisses the card and touches nothing else', () => {
  const start = CARD.indexOf("{t('lc_close')}")
  const onClickStart = CARD.lastIndexOf('onClick={() =>', start)
  const body = CARD.slice(onClickStart, start)

  it('exists and is NOT gated on nextLessonOrder — always available', () => {
    expect(start).toBeGreaterThan(-1)
  })

  it('calls setLessonCompletion(null) and nothing else state-mutating', () => {
    expect(body).toContain('setLessonCompletion(null)')
  })

  it('never advances, restarts, or records progress', () => {
    // Anti-vacuity: assert the ABSENCE of every progress-mutating call this
    // handler could accidentally pick up, not just "contains setLessonCompletion".
    expect(body).not.toContain('completeAndAdvance(')
    expect(body).not.toContain('requestLessonSwitch(')
    expect(body).not.toContain('callLessonInit(')
    expect(body).not.toContain('handleLessonComplete(')
    expect(body).not.toContain('markLessonSkipped(')
  })

  it("the handler's own onClick body is a single short arrow, not a multi-statement block", () => {
    // A `onClick={() => setLessonCompletion(null)}` single-expression arrow
    // structurally cannot smuggle in a second statement the way a `{ ... }`
    // block could — this is close reading of the exact source shape, not a
    // string-contains guess.
    const fullOnClick = CARD.slice(onClickStart, CARD.indexOf('}', CARD.indexOf('setLessonCompletion(null)', onClickStart)) + 1)
    expect(fullOnClick).toMatch(/onClick=\{\(\)\s*=>\s*setLessonCompletion\(null\)\}/)
  })
})

describe('lesson completion menu — i18n', () => {
  const I18N = readFileSync(path.join(process.cwd(), 'src/lib/i18n.ts'), 'utf8')

  it('lc_restart and lc_close are defined for all three languages', () => {
    const restartCount = (I18N.match(/lc_restart:/g) ?? []).length
    const closeCount = (I18N.match(/lc_close:/g) ?? []).length
    expect(restartCount).toBe(3)
    expect(closeCount).toBe(3)
  })

  it('no language block is missing lc_next/lc_restart/lc_close (all three sit together)', () => {
    // Each occurrence of lc_next should be immediately followed by
    // lc_restart then lc_close before the next unrelated key — catches a
    // block where one of the three was added but another was missed.
    const blocks = [...I18N.matchAll(/lc_next: '[^']*',\s*\n\s*lc_restart: '[^']*',\s*\n\s*lc_close: '[^']*',/g)]
    expect(blocks).toHaveLength(3)
  })
})
