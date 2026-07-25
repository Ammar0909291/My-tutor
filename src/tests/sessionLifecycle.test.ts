/**
 * CTO iteration — session lifecycle state machine (decision-engine/07
 * §1/§6/§8 as deterministic code). Pure unit tests.
 */
import { describe, it, expect } from 'vitest'
import {
  SESSION_GAP_MS, isNewEpisode, deriveEpisode, applySignalToEpisode,
  buildOpeningBlock, buildAffectCloseBlock, detectExplicitFinishRequest,
  forceClosing, type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'

const NOW = 1_700_000_000_000

function fresh(overrides: Partial<SessionEpisode> = {}): SessionEpisode {
  return {
    startedAt: new Date(NOW).toISOString(),
    phase: 'OPENING',
    visibleFailures: 0,
    retroWinOwed: false,
    openingSatisfied: false,
    ...overrides,
  }
}

describe('session boundary (07 §8 rule 1)', () => {
  it('no prior messages = new episode', () => {
    expect(isNewEpisode(null, NOW)).toBe(true)
  })
  it('inside the gap = same session, budgets continue', () => {
    expect(isNewEpisode(NOW - SESSION_GAP_MS + 1000, NOW)).toBe(false)
    const prev = fresh({ phase: 'CORE', visibleFailures: 1 })
    expect(deriveEpisode(prev, false, NOW, null)).toBe(prev)
  })
  it('past the gap = new episode, budgets reset', () => {
    expect(isNewEpisode(NOW - SESSION_GAP_MS - 1000, NOW)).toBe(true)
    const prev = fresh({ phase: 'CORE', visibleFailures: 2 })
    const next = deriveEpisode(prev, true, NOW, { correctness: true })
    expect(next.visibleFailures).toBe(0)
    expect(next.phase).toBe('OPENING')
    expect(next.retroWinOwed).toBe(false)
  })
  it('failure-then-vanish flags the retro win (07 §8 rule 3)', () => {
    const next = deriveEpisode(fresh(), true, NOW, { correctness: false })
    expect(next.retroWinOwed).toBe(true)
  })
})

describe('phase transitions (07 §1, §6; first-lesson/02 §2)', () => {
  it('OPENING → CORE on the first answered signal', () => {
    const ep = applySignalToEpisode(fresh(), { correctness: true }, { isFirstLesson: false })
    expect(ep.phase).toBe('CORE')
    expect(ep.openingSatisfied).toBe(true)
  })
  it('a landed win clears the retro-win debt', () => {
    const ep = applySignalToEpisode(fresh({ retroWinOwed: true }), { correctness: true }, { isFirstLesson: false })
    expect(ep.retroWinOwed).toBe(false)
  })
  it('affect budget: 2 visible failures → CLOSING', () => {
    let ep = fresh()
    ep = applySignalToEpisode(ep, { correctness: false }, { isFirstLesson: false })
    expect(ep.phase).toBe('CORE')
    ep = applySignalToEpisode(ep, { correctness: false }, { isFirstLesson: false })
    expect(ep.phase).toBe('CLOSING')
    expect(ep.visibleFailures).toBe(2)
  })
  it('lesson one: budget is 1 (first-lesson/02 §2)', () => {
    const ep = applySignalToEpisode(fresh(), { correctness: false }, { isFirstLesson: true })
    expect(ep.phase).toBe('CLOSING')
  })
  it('non-answer signals change nothing (no fabricated budget spend)', () => {
    const ep = fresh({ phase: 'CORE', visibleFailures: 1 })
    expect(applySignalToEpisode(ep, null, { isFirstLesson: false })).toBe(ep)
    expect(applySignalToEpisode(ep, {}, { isFirstLesson: false })).toBe(ep)
  })
})

describe('prompt blocks', () => {
  it('opening enforces reviews-before-new-content when reviews are due', () => {
    const block = buildOpeningBlock({ dueReviewCount: 3, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true })
    expect(block).toMatch(/BEFORE any new content/)
    expect(block).toMatch(/never "do you remember X\?"/i)
    expect(block).toMatch(/never remark on how long/i)
  })
  it('retro win comes FIRST when owed', () => {
    const block = buildOpeningBlock({ dueReviewCount: 2, retroWinOwed: true, isFreshBoundary: true, hadPreviousEpisode: true })
    expect(block.indexOf('near-certain win')).toBeLessThan(block.indexOf('Due reviews'))
    expect(block).toMatch(/Do not mention the previous failure/)
  })
  it('no block mid-session (no re-greeting — invisible-restart guard)', () => {
    expect(buildOpeningBlock({ dueReviewCount: 3, retroWinOwed: false, isFreshBoundary: false, hadPreviousEpisode: true })).toBe('')
  })

  // P0-1 (lesson introduction defect): a returning learner starting lesson
  // 2+ was only ever getting "name one thing they did well" — no explicit
  // objective, no why-it-matters, no connection to the previous lesson.
  it('lessonIntro adds objective, why-it-matters, and a connection to the previous lesson', () => {
    const block = buildOpeningBlock({
      dueReviewCount: 0, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true,
      lessonIntro: { lessonTitle: 'Newton\'s Second Law', lessonGoal: 'Apply F=ma to solve motion problems', previousLessonTitle: 'Newton\'s First Law' },
    })
    expect(block).toMatch(/state the lesson objective/i)
    expect(block).toMatch(/Apply F=ma to solve motion problems/)
    expect(block).toMatch(/why this lesson matters/i)
    expect(block).toMatch(/connect it to the previous lesson, "Newton's First Law"/)
  })

  it('lessonIntro with no previous lesson title still asks for a connection, without naming one', () => {
    const block = buildOpeningBlock({
      dueReviewCount: 0, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: false,
      lessonIntro: { lessonTitle: 'Fractions', lessonGoal: 'Compare and order fractions', previousLessonTitle: null },
    })
    expect(block).toMatch(/connect it to what the learner already knows/i)
    expect(block).not.toMatch(/connect it to the previous lesson, "/)
  })

  it('omitting lessonIntro reproduces the exact pre-fix text (no regression for lesson one / no-lesson-context callers)', () => {
    const withoutIntro = buildOpeningBlock({ dueReviewCount: 0, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true })
    const withNullIntro = buildOpeningBlock({ dueReviewCount: 0, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true, lessonIntro: null })
    expect(withoutIntro).toBe(withNullIntro)
    expect(withoutIntro).not.toMatch(/lesson objective/i)
  })
  it('affect close forbids new content and mistake-blaming', () => {
    const block = buildAffectCloseBlock()
    expect(block).toMatch(/do NOT introduce new content/i)
    expect(block).toMatch(/never frame the ending as caused by their mistakes/i)
  })
})

// 07 §6 extension — explicit finish requests outrank the failure budget.
// Root cause: a real transcript where "Finish it now." got "Let's wrap this
// up!" followed immediately by a brand-new, unresolved scenario instead of
// an actual close.
describe('explicit finish request (07 §6 extension)', () => {
  it('detects unambiguous session-stop phrasings', () => {
    expect(detectExplicitFinishRequest('Finish it now.')).toBe(true)
    expect(detectExplicitFinishRequest("let's wrap this up")).toBe(true)
    expect(detectExplicitFinishRequest('wrap it up please')).toBe(true)
    expect(detectExplicitFinishRequest("I'm done for today")).toBe(true)
    expect(detectExplicitFinishRequest('can we stop here')).toBe(true)
    expect(detectExplicitFinishRequest('i have to go')).toBe(true)
    expect(detectExplicitFinishRequest("that's enough for today")).toBe(true)
    expect(detectExplicitFinishRequest("let's end it")).toBe(true)
  })

  it('does NOT fire on finishing a problem/example, not the session', () => {
    expect(detectExplicitFinishRequest("let's finish this equation")).toBe(false)
    expect(detectExplicitFinishRequest('can we finish this problem first?')).toBe(false)
    expect(detectExplicitFinishRequest('I got this topic move to next')).toBe(false)
    expect(detectExplicitFinishRequest('what happens next?')).toBe(false)
  })

  it('empty/whitespace message never fires', () => {
    expect(detectExplicitFinishRequest('')).toBe(false)
    expect(detectExplicitFinishRequest('   ')).toBe(false)
  })

  it('forceClosing sets CLOSING regardless of current failure count', () => {
    const ep = fresh({ phase: 'CORE', visibleFailures: 0 })
    const closed = forceClosing(ep)
    expect(closed.phase).toBe('CLOSING')
    expect(closed.visibleFailures).toBe(0) // no fabricated failure
  })

  it('forceClosing is idempotent — already-CLOSING episode is returned unchanged (same reference)', () => {
    const ep = fresh({ phase: 'CLOSING', visibleFailures: 2 })
    expect(forceClosing(ep)).toBe(ep)
  })

  it('forceClosing never re-opens or rewinds — only ever moves toward CLOSING', () => {
    const openingEp = fresh({ phase: 'OPENING' })
    expect(forceClosing(openingEp).phase).toBe('CLOSING')
  })

  it('once forced CLOSING, applySignalToEpisode never downgrades it back out', () => {
    const closed = forceClosing(fresh({ phase: 'CORE', visibleFailures: 0 }))
    const afterSignal = applySignalToEpisode(closed, { correctness: true }, { isFirstLesson: false })
    expect(afterSignal.phase).toBe('CLOSING')
  })
})
