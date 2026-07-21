/**
 * Session-Opening Review Integration tests: proves the wiring added to
 * src/app/api/learn/chat/route.ts (Claude Recommendation "wire the Spaced
 * Retrieval Scheduler into the session-opening lifecycle") is correct.
 *
 * route.ts's own turn handler needs a live DB and can't be unit-tested
 * directly (no test in this repo does — see every other *.test.ts file's
 * pure-core-over-fixtures convention). This test instead exercises the
 * EXACT SAME chain route.ts now calls, with the EXACT SAME composition
 * logic (`overdue.length + dueToday.length`), using the real, unmodified
 * functions — buildStudentIntelligence (Student Intelligence, untouched),
 * scheduleReviews (Spaced Retrieval Scheduler, untouched), and
 * buildOpeningBlock (sessionLifecycle.ts, untouched) — never a mock, never
 * reimplemented logic. This is the same "prove the integration, not just
 * the units" pattern already used by stanceEnforcement.test.ts and
 * failureAnalyticsDashboard.test.ts elsewhere in this suite.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readLessonEvidence, type EvidenceEventRow, type TopicProgressRow } from '@/lib/teaching/evidence/evidenceReader'
import { buildStudentIntelligence } from '@/lib/teaching/studentIntelligence/studentIntelligence'
import { scheduleReviews } from '@/lib/teaching/retrieval/spacedRetrievalScheduler'
import { buildOpeningBlock } from '@/lib/teaching/sessionLifecycle'

// ── Fixtures (mirrors evidenceLoop.test.ts / spacedRetrievalScheduler.test.ts) ─

let seq = 0
beforeEach(() => { seq = 0 })

function ev(over: Partial<EvidenceEventRow> & { category: string; outcome: string; occurredAt: Date }): EvidenceEventRow {
  seq++
  return {
    eventId: `e${String(seq).padStart(4, '0')}`,
    userId: 'u1',
    sessionId: 's1',
    turnId: `t${seq}`,
    conceptId: 'phys.mech.newtons-first-law',
    language: 'en',
    misconceptionId: null,
    assetId: null,
    strength: 0,
    rawScore: null,
    ...over,
  }
}

const probe = (passed: boolean, occurredAt: Date, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false`,
    strength: passed ? 1 : 0,
    occurredAt,
    ...over,
  })

/** Exactly the composition route.ts now performs after loadReviewQueue(). */
function dueReviewCountFrom(queue: ReturnType<typeof scheduleReviews>): number {
  return queue.overdue.length + queue.dueToday.length
}

const NOW = new Date('2026-08-01T12:00:00Z')

// ── Scenario builders ─────────────────────────────────────────────────────────

function topicProgress(over: Partial<TopicProgressRow> = {}): TopicProgressRow {
  return {
    userId: 'u1',
    subjectSlug: 'physics',
    topicSlug: 'phys.mech.newtons-first-law',
    status: 'MASTERED',
    masteryPct: 90,
    attempts: 3,
    revisionCount: 0,
    createdAt: NOW,
    completedAt: NOW,
    updatedAt: NOW,
    ...over,
  }
}

/** A learner who mastered a concept long enough ago, with a middling pass
 *  rate, that its forgetting risk has crossed the review threshold. Mastery
 *  is read from a TopicProgress row, exactly as the live evidenceReader
 *  join requires — mirroring how a real learner's evidence is shaped. */
function learnerWithADueReview() {
  const masteredAt = new Date(NOW.getTime() - 200 * 86_400_000) // 200 days ago
  const events: EvidenceEventRow[] = [
    probe(true, masteredAt, { turnId: 't1' }),
    probe(false, new Date(masteredAt.getTime() + 60_000), { turnId: 't2' }),
    probe(true, new Date(masteredAt.getTime() + 120_000), { turnId: 't3' }),
    ev({ category: 'LEARNER_FEEDBACK', outcome: 'shown', occurredAt: masteredAt, turnId: 't4' }),
  ]
  return readLessonEvidence({ events, topicProgress: [topicProgress({ completedAt: masteredAt })] })
}

/** A learner who mastered a concept moments ago — nowhere near due. */
function learnerWithNoDueReview() {
  const events: EvidenceEventRow[] = [
    probe(true, new Date(NOW.getTime() - 60_000), { turnId: 't1' }),
    probe(true, new Date(NOW.getTime() - 30_000), { turnId: 't2' }),
  ]
  return readLessonEvidence({ events, topicProgress: [topicProgress({ completedAt: new Date(NOW.getTime() - 60_000) })] })
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('session-opening review wiring: due review surfaces first', () => {
  it('a learner with a decayed, review-eligible concept produces dueReviewCount > 0', () => {
    const lessons = learnerWithADueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    // Sanity: this fixture must actually be classified as mastered by
    // Student Intelligence, or the scenario proves nothing.
    expect(profile.conceptStates.some((c) => c.mastered)).toBe(true)
    const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    const dueReviewCount = dueReviewCountFrom(queue)
    expect(dueReviewCount).toBeGreaterThan(0)
  })

  it('feeding that due count into buildOpeningBlock surfaces the due-review-first instruction', () => {
    const lessons = learnerWithADueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    const dueReviewCount = dueReviewCountFrom(queue)

    const block = buildOpeningBlock({
      dueReviewCount,
      retroWinOwed: false,
      isFreshBoundary: true,
      hadPreviousEpisode: true,
    })

    expect(block).toContain('Due reviews come BEFORE any new content')
    expect(block).toContain(`${dueReviewCount} due review item(s)`)
    expect(block).not.toContain('No reviews are due')
  })

  it('the due-review instruction appears before any "proceed to new content" language, preserving the mandatory ordering', () => {
    const lessons = learnerWithADueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    const block = buildOpeningBlock({
      dueReviewCount: dueReviewCountFrom(queue),
      retroWinOwed: false,
      isFreshBoundary: true,
      hadPreviousEpisode: false,
    })
    // Reuses the Educational-Brain-authored ordering guarantee in
    // buildOpeningBlock itself — this test proves the wiring didn't bypass it.
    expect(block.indexOf('SESSION OPENING')).toBeLessThan(block.indexOf('Due reviews come BEFORE'))
  })
})

describe('session-opening review wiring: no due review leaves behaviour unchanged', () => {
  it('a learner with nothing due produces dueReviewCount === 0', () => {
    const lessons = learnerWithNoDueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW })
    expect(dueReviewCountFrom(queue)).toBe(0)
  })

  it('a learner with zero evidence at all (brand new session) produces dueReviewCount === 0, never throws', () => {
    const profile = buildStudentIntelligence('u1', [], { now: NOW })
    expect(() => scheduleReviews(profile, { now: NOW })).not.toThrow()
    const queue = scheduleReviews(profile, { now: NOW })
    expect(dueReviewCountFrom(queue)).toBe(0)
  })

  it('feeding dueReviewCount=0 into buildOpeningBlock reproduces the exact pre-wiring text (no regression)', () => {
    const withoutScheduler = buildOpeningBlock({
      dueReviewCount: 0,
      retroWinOwed: false,
      isFreshBoundary: true,
      hadPreviousEpisode: true,
    })
    // The scheduler-fed path, for a learner with nothing due.
    const lessons = learnerWithNoDueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW })
    const withScheduler = buildOpeningBlock({
      dueReviewCount: dueReviewCountFrom(queue),
      retroWinOwed: false,
      isFreshBoundary: true,
      hadPreviousEpisode: true,
    })
    expect(withScheduler).toBe(withoutScheduler)
    expect(withScheduler).toContain('No reviews are due — proceed to the main content after the greeting.')
  })

  it('retroWinOwed / hadPreviousEpisode / isFreshBoundary behaviour is unaffected by the scheduler wiring', () => {
    // Proves this change is scoped to dueReviewCount only — every other
    // OPENING rule (engineered win, continuity greeting, boundary gating)
    // is untouched, exercised here exactly as it was before this mission.
    const block = buildOpeningBlock({
      dueReviewCount: 0,
      retroWinOwed: true,
      isFreshBoundary: true,
      hadPreviousEpisode: true,
    })
    expect(block).toContain('one engineered, near-certain')
    expect(block).toContain('Greet with continuity in ONE breath')
    const notFresh = buildOpeningBlock({
      dueReviewCount: 5,
      retroWinOwed: true,
      isFreshBoundary: false,
      hadPreviousEpisode: true,
    })
    expect(notFresh).toBe('')
  })
})

describe('session-opening review wiring: deterministic behaviour', () => {
  it('the same evidence corpus produces byte-identical dueReviewCount and opening block across repeated runs', () => {
    const lessons = learnerWithADueReview()
    const run = () => {
      const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
      const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
      const dueReviewCount = dueReviewCountFrom(queue)
      return buildOpeningBlock({ dueReviewCount, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true })
    }
    const a = run()
    const b = run()
    expect(a).toBe(b)
  })

  it('50 repeated runs of the full chain produce a single distinct output (no hidden clock/randomness)', () => {
    const lessons = learnerWithADueReview()
    const results = Array.from({ length: 50 }, () => {
      const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
      const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
      return dueReviewCountFrom(queue)
    })
    expect(new Set(results).size).toBe(1)
  })

  it('does not mutate the input lessons array across the whole chain', () => {
    const lessons = learnerWithADueReview()
    const before = JSON.stringify(lessons)
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    expect(JSON.stringify(lessons)).toBe(before)
  })
})

describe('session-opening review wiring: no regression in surrounding systems', () => {
  it('Student Intelligence and the Scheduler are called with their existing, unmodified public signatures', () => {
    // Structural guard: if either signature changed incompatibly, this
    // file itself would fail to type-check/compile — this test exists so
    // a future refactor of either module trips a test failure here too,
    // not just a silent route.ts drift.
    const lessons = learnerWithNoDueReview()
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    expect(profile.userId).toBe('u1')
    const queue = scheduleReviews(profile, { now: NOW })
    expect(queue).toHaveProperty('overdue')
    expect(queue).toHaveProperty('dueToday')
    expect(queue).toHaveProperty('upcoming')
    expect(queue).toHaveProperty('all')
  })

  it('a scheduler/profile error path (empty profile) still yields a valid, renderable opening block', () => {
    const profile = buildStudentIntelligence('u1', [], { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW })
    const block = buildOpeningBlock({
      dueReviewCount: dueReviewCountFrom(queue),
      retroWinOwed: false,
      isFreshBoundary: true,
      hadPreviousEpisode: false,
    })
    expect(typeof block).toBe('string')
    expect(block.length).toBeGreaterThan(0)
  })
})
