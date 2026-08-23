/**
 * LONG-HORIZON VALIDATION — the part that can be decided deterministically.
 *
 * Single-session behaviour has been tested extensively; the multi-day half
 * never has. Real elapsed time cannot be produced inside a session, and
 * fabricating historical timestamps in production is forbidden — so this
 * validates the LAW rather than the database, using the time abstraction the
 * scheduler already exposes: `scheduleReviews(profile, { now })` is pure,
 * takes `now` as an argument, and its own docblock guarantees
 * "same profile + same options.now → byte-identical queue".
 *
 * That is a legitimate test clock. It is NOT a substitute for observing a real
 * learner return after three weeks, and the scenarios that still require a
 * real observation window are named in the session report rather than faked
 * here.
 *
 * What is pinned, in the words of the validation matrix:
 *   · earned mastery stays earned (decay is risk, never erasure)
 *   · review eventually occurs (not never)
 *   · review is not aggressive (not on day one)
 *   · a weak concept comes back sooner than a solid one
 *   · an unmastered concept is never a maintenance target
 */
import { describe, it, expect } from 'vitest'
import {
  scheduleReviews, type SpacedRetrievalOptions,
} from '@/lib/teaching/retrieval/spacedRetrievalScheduler'
import {
  forgettingRisk, effectiveHalfLifeDays,
  type StudentIntelligence, type ConceptState,
} from '@/lib/teaching/studentIntelligence/studentIntelligence'

const DAY = 86_400_000
const T0 = new Date('2026-01-01T09:00:00.000Z')
const at = (days: number) => new Date(T0.getTime() + days * DAY)

function concept(over: Partial<ConceptState> & { conceptId: string }): ConceptState {
  return {
    subject: 'physics', lessons: 1, probeOutcomes: 3, probePassRate: 1,
    masteryPct: 90, masteryStatus: 'MASTERED', mastered: true,
    firstEvidenceAt: T0, lastEvidenceAt: T0,
    forgettingRisk: 0, retries: 0, ...over,
  }
}

function profile(states: ConceptState[]): StudentIntelligence {
  return { conceptStates: states, activeMisconceptions: [] } as unknown as StudentIntelligence
}

const opts = (now: Date): SpacedRetrievalOptions => ({ now })

describe('retention over days, decided by the law rather than by waiting', () => {
  it('decay is RISK, not erasure — mastered stays mastered however long the gap', () => {
    // The failure this guards is the one that would destroy trust fastest:
    // a learner returning after a long break to find their work gone.
    const solid = concept({ conceptId: 'phys.mech.newtons-first-law' })
    for (const days of [1, 30, 200, 1000]) {
      const q = scheduleReviews(profile([solid]), opts(at(days)))
      const all = [...q.overdue, ...q.dueToday, ...q.upcoming]
      expect(all).toHaveLength(1)
      expect(all[0].conceptId).toBe('phys.mech.newtons-first-law')
    }
    // And the underlying risk saturates below 1 rather than flipping a flag.
    expect(forgettingRisk(T0, at(1000), 1, 30)).toBeLessThanOrEqual(1)
    expect(forgettingRisk(T0, at(1000), 1, 30)).toBeGreaterThan(0.9)
  })

  it('review is not aggressive — nothing is due the day after mastering it', () => {
    const q = scheduleReviews(profile([concept({ conceptId: 'phys.mech.inertia' })]), opts(at(1)))
    expect(q.overdue).toHaveLength(0)
    expect(q.dueToday).toHaveLength(0)
    expect(q.upcoming).toHaveLength(1)
  })

  it('review does eventually occur — it is scheduled, not deferred forever', () => {
    const q = scheduleReviews(profile([concept({ conceptId: 'phys.mech.inertia' })]), opts(at(365)))
    expect(q.overdue.length + q.dueToday.length).toBe(1)
  })

  it('a shaky concept returns sooner than a solid one', () => {
    // The half-life is scaled by how solid the knowledge actually was, so this
    // is a property of the law and not of any one threshold.
    const shaky = concept({ conceptId: 'a', probePassRate: 0 })
    const solid = concept({ conceptId: 'b', probePassRate: 1 })
    const qs = scheduleReviews(profile([shaky, solid]), opts(at(0)))
    const byId = new Map([...qs.overdue, ...qs.dueToday, ...qs.upcoming].map((r) => [r.conceptId, r]))
    expect(byId.get('a')!.nextReviewAt.getTime()).toBeLessThan(byId.get('b')!.nextReviewAt.getTime())
    expect(effectiveHalfLifeDays(0, 30)).toBeLessThan(effectiveHalfLifeDays(1, 30))
  })

  it('an UNMASTERED concept is never a maintenance target', () => {
    // Still being taught is not the same as needing review; scheduling one
    // would interrupt live teaching with a "review" of something unlearned.
    const learning = concept({ conceptId: 'phys.mech.momentum', mastered: false, masteryStatus: 'IN_PROGRESS' })
    const q = scheduleReviews(profile([learning]), opts(at(500)))
    expect([...q.overdue, ...q.dueToday, ...q.upcoming]).toHaveLength(0)
  })

  it('mixed mastery states are ordered, not collapsed', () => {
    const q = scheduleReviews(profile([
      concept({ conceptId: 'old-weak', probePassRate: 0.2, lastEvidenceAt: at(-90) }),
      concept({ conceptId: 'recent-solid', probePassRate: 1, lastEvidenceAt: at(-2) }),
      concept({ conceptId: 'unmastered', mastered: false }),
    ]), opts(at(0)))
    const ids = [...q.overdue, ...q.dueToday, ...q.upcoming].map((r) => r.conceptId)
    expect(ids).toContain('old-weak')
    expect(ids).toContain('recent-solid')
    expect(ids).not.toContain('unmastered')
    expect(q.overdue.map((r) => r.conceptId)).toContain('old-weak')
  })

  it('is deterministic — the same clock yields the same queue', () => {
    const p = profile([concept({ conceptId: 'x', probePassRate: 0.5 })])
    expect(JSON.stringify(scheduleReviews(p, opts(at(60)))))
      .toBe(JSON.stringify(scheduleReviews(p, opts(at(60)))))
  })
})
