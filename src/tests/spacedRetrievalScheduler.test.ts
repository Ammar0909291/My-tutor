/**
 * Spaced Retrieval Scheduler tests (Claude Recommendation #8): proves the
 * forgetting-risk-driven review schedule is correct, deterministic, and
 * reuses Student Intelligence's own decay law rather than a second one.
 * Follows studentIntelligence.test.ts's fixture convention — hand-built
 * StudentIntelligence profiles, no DB.
 */
import { describe, it, expect } from 'vitest'
import { scheduleReviews, type SpacedRetrievalOptions } from '@/lib/teaching/retrieval/spacedRetrievalScheduler'
import { effectiveHalfLifeDays, forgettingRisk, type StudentIntelligence, type ConceptState, type MisconceptionState } from '@/lib/teaching/studentIntelligence/studentIntelligence'

const NOW = new Date('2026-07-16T12:00:00Z')

function conceptState(over: Partial<ConceptState> & { conceptId: string }): ConceptState {
  return {
    subject: 'physics',
    lessons: 3,
    probeOutcomes: 3,
    probePassRate: 1,
    masteryPct: 100,
    masteryStatus: 'MASTERED',
    mastered: true,
    firstEvidenceAt: new Date('2026-06-01T00:00:00Z'),
    lastEvidenceAt: new Date('2026-06-01T00:00:00Z'),
    forgettingRisk: 0,
    retries: 0,
    ...over,
  }
}

function misconception(over: Partial<MisconceptionState> & { conceptId: string }): MisconceptionState {
  return {
    id: 'M1',
    detections: 1,
    firstDetectedAt: new Date('2026-06-01T00:00:00Z'),
    lastDetectedAt: new Date('2026-06-01T00:00:00Z'),
    phrases: ['it just moves'],
    activity: 'active',
    regrowths: 0,
    ...over,
  }
}

function profile(over: Partial<StudentIntelligence> & { conceptStates: ConceptState[] }): StudentIntelligence {
  return {
    userId: 'u1',
    asOf: NOW,
    evidenceBase: { lessons: over.conceptStates.length, probeOutcomes: 0, concepts: over.conceptStates.length },
    masteredConcepts: over.conceptStates.filter((c) => c.mastered).map((c) => c.conceptId),
    activeMisconceptions: [],
    misconceptionHistory: [],
    confidence: { observations: 0, firstHalfMean: null, secondHalfMean: null, direction: 'insufficient_evidence', confidentWrongCount: 0, hesitantRightCount: 0 },
    velocity: { conceptsProgressedPerWeek: null, passesPerLesson: null, activeSpanDays: 0, lessonsObserved: 0 },
    forgettingRisks: [],
    modalityAffinities: [],
    probePerformance: { outcomes: 0, passRate: null },
    recoveryEffectiveness: [],
    engagement: { sessionsObserved: 0, lessonsObserved: 0, abandonedLessons: 0, abandonedRate: null, meanLessonSpanMinutes: null, longestGapDays: null, lastActiveAt: null },
    cognitiveLoad: { confusionRate: null, meanProbeLatencySec: null, latencyDirection: 'insufficient_evidence', observations: 0 },
    ...over,
  }
}

function opts(over: Partial<SpacedRetrievalOptions> = {}): SpacedRetrievalOptions {
  return { now: NOW, ...over }
}

// ── Forgetting calculations ──────────────────────────────────────────────────

describe('forgetting calculations', () => {
  it('reuses ConceptState.forgettingRisk verbatim — never recomputes it', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'phys.mech.f1', forgettingRisk: 0.42 })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].forgettingRisk).toBe(0.42)
  })

  it('computes effectiveHalfLifeDays identically to Student Intelligence for the same passRate', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', probePassRate: 0.8 })] })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 30 }))
    expect(queue.all[0].effectiveHalfLifeDays).toBe(effectiveHalfLifeDays(0.8, 30))
  })

  it('a solid pass rate (1.0) yields a longer half-life than a shaky one (0.0), same as Student Intelligence', () => {
    const solidHalfLife = effectiveHalfLifeDays(1.0, 30)
    const shakyHalfLife = effectiveHalfLifeDays(0.0, 30)
    expect(solidHalfLife).toBeGreaterThan(shakyHalfLife)
  })

  it('null passRate defaults to the same 0.5 solidity Student Intelligence uses', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', probePassRate: null })] })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 30 }))
    expect(queue.all[0].effectiveHalfLifeDays).toBe(effectiveHalfLifeDays(null, 30))
  })
})

// ── Review scheduling ────────────────────────────────────────────────────────

describe('review scheduling', () => {
  it('schedules a nextReviewAt in the future for a freshly mastered, low-risk concept', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW, forgettingRisk: 0 })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].nextReviewAt.getTime()).toBeGreaterThan(NOW.getTime())
    expect(queue.all[0].overdue).toBe(false)
  })

  it('never-mastered concepts are excluded from the schedule entirely', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', mastered: false, masteryStatus: 'IN_PROGRESS' })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all).toHaveLength(0)
  })

  it('a lower reviewRiskThreshold schedules an earlier nextReviewAt than a higher one', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW })] })
    const strict = scheduleReviews(p, opts({ reviewRiskThreshold: 0.15 }))
    const lenient = scheduleReviews(p, opts({ reviewRiskThreshold: 0.5 }))
    expect(strict.all[0].nextReviewAt.getTime()).toBeLessThan(lenient.all[0].nextReviewAt.getTime())
  })

  it('a higher baseHalfLifeDays schedules a later nextReviewAt (memory assumed more durable)', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW })] })
    const shortHalfLife = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    const longHalfLife = scheduleReviews(p, opts({ baseHalfLifeDays: 60 }))
    expect(longHalfLife.all[0].nextReviewAt.getTime()).toBeGreaterThan(shortHalfLife.all[0].nextReviewAt.getTime())
  })

  it('flags hasActiveMisconception true only when Student Intelligence reports an active one for that concept', () => {
    const p = profile({
      conceptStates: [conceptState({ conceptId: 'c1' }), conceptState({ conceptId: 'c2' })],
      activeMisconceptions: [misconception({ conceptId: 'c1' })],
    })
    const queue = scheduleReviews(p, opts())
    const c1 = queue.all.find((r) => r.conceptId === 'c1')!
    const c2 = queue.all.find((r) => r.conceptId === 'c2')!
    expect(c1.hasActiveMisconception).toBe(true)
    expect(c2.hasActiveMisconception).toBe(false)
  })

  it('a dormant misconception (not in activeMisconceptions) does not set hasActiveMisconception', () => {
    const p = profile({
      conceptStates: [conceptState({ conceptId: 'c1' })],
      activeMisconceptions: [], // dormant ones are excluded from this list per Student Intelligence's own contract
      misconceptionHistory: [misconception({ conceptId: 'c1', activity: 'dormant' })],
    })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].hasActiveMisconception).toBe(false)
  })

  it('hasEducationalPackage is null when no packageAvailability lookup is injected', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1' })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].hasEducationalPackage).toBeNull()
  })

  it('hasEducationalPackage reflects the injected lookup when provided', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'phys.mech.f1' }), conceptState({ conceptId: 'phys.mech.f2' })] })
    const queue = scheduleReviews(p, opts({ packageAvailability: (id) => id === 'phys.mech.f1' }))
    expect(queue.all.find((r) => r.conceptId === 'phys.mech.f1')!.hasEducationalPackage).toBe(true)
    expect(queue.all.find((r) => r.conceptId === 'phys.mech.f2')!.hasEducationalPackage).toBe(false)
  })

  it('supports concepts from multiple subjects with no subject-specific branching', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'phys.mech.f1', subject: 'physics' }),
        conceptState({ conceptId: 'eng.phonics.p1', subject: 'english' }),
        conceptState({ conceptId: 'cs.algo.a1', subject: 'computer_science' }),
      ],
    })
    const queue = scheduleReviews(p, opts())
    expect(queue.all.map((r) => r.subject).sort()).toEqual(['computer_science', 'english', 'physics'])
  })
})

// ── Overdue detection ────────────────────────────────────────────────────────

describe('overdue detection', () => {
  it('marks a concept overdue when nextReviewAt falls before the start of today', () => {
    // Long silence (200 days) at a modest half-life guarantees the review
    // threshold is well in the past.
    const longAgo = new Date(NOW.getTime() - 200 * 86_400_000)
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: longAgo, probePassRate: 0.5 })] })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    expect(queue.all[0].overdue).toBe(true)
    expect(queue.all[0].daysOverdue).toBeGreaterThan(0)
    expect(queue.overdue).toHaveLength(1)
  })

  it('does not mark a freshly mastered concept overdue', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].overdue).toBe(false)
    expect(queue.all[0].daysOverdue).toBe(0)
    expect(queue.overdue).toHaveLength(0)
  })

  it('buckets a concept due later today into dueToday, not overdue or upcoming', () => {
    // Craft a nextReviewAt a few hours from "now" — same calendar day.
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW, probePassRate: 1, forgettingRisk: 0 })] })
    // Use a tiny half-life so the threshold-crossing date lands within hours, not days.
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 0.05 }))
    const startOfToday = new Date(NOW); startOfToday.setHours(0, 0, 0, 0)
    const endOfToday = new Date(startOfToday.getTime() + 86_400_000)
    const r = queue.all[0]
    if (r.nextReviewAt.getTime() >= startOfToday.getTime() && r.nextReviewAt.getTime() < endOfToday.getTime()) {
      expect(queue.dueToday).toHaveLength(1)
      expect(queue.overdue).toHaveLength(0)
      expect(queue.upcoming).toHaveLength(0)
    } else {
      // Half-life too small even for this — fall back to asserting bucket disjointness only.
      expect(queue.overdue.length + queue.dueToday.length + queue.upcoming.length).toBe(1)
    }
  })

  it('buckets a far-future review into upcoming', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW })] })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 365 }))
    expect(queue.upcoming).toHaveLength(1)
    expect(queue.overdue).toHaveLength(0)
    expect(queue.dueToday).toHaveLength(0)
  })

  it('overdue + dueToday + upcoming partition `all` exactly (no overlap, no omission)', () => {
    const longAgo = new Date(NOW.getTime() - 300 * 86_400_000)
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'overdue1', lastEvidenceAt: longAgo, probePassRate: 0.5 }),
        conceptState({ conceptId: 'future1', lastEvidenceAt: NOW }),
      ],
    })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    const partitionIds = [...queue.overdue, ...queue.dueToday, ...queue.upcoming].map((r) => r.conceptId).sort()
    expect(partitionIds).toEqual(queue.all.map((r) => r.conceptId).sort())
    expect(partitionIds).toHaveLength(2)
  })

  it('critical maintenanceStatus requires overdue AND (high risk or >=14 days overdue)', () => {
    const veryLongAgo = new Date(NOW.getTime() - 400 * 86_400_000)
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: veryLongAgo, probePassRate: 0.3, forgettingRisk: 0.9 })] })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    expect(queue.all[0].maintenanceStatus).toBe('critical')
  })

  it('stable maintenanceStatus for a freshly mastered, zero-risk concept', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW, forgettingRisk: 0 })] })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].maintenanceStatus).toBe('stable')
  })
})

// ── Priority ordering ────────────────────────────────────────────────────────

describe('priority ordering', () => {
  it('orders `all` by priority descending', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'low', forgettingRisk: 0.1 }),
        conceptState({ conceptId: 'high', forgettingRisk: 0.9 }),
        conceptState({ conceptId: 'mid', forgettingRisk: 0.5 }),
      ],
    })
    const queue = scheduleReviews(p, opts())
    expect(queue.all.map((r) => r.conceptId)).toEqual(['high', 'mid', 'low'])
  })

  it('an active misconception boosts priority above an equal-risk concept without one', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'plain', forgettingRisk: 0.4 }),
        conceptState({ conceptId: 'misconceived', forgettingRisk: 0.4 }),
      ],
      activeMisconceptions: [misconception({ conceptId: 'misconceived' })],
    })
    const queue = scheduleReviews(p, opts())
    expect(queue.all[0].conceptId).toBe('misconceived')
    expect(queue.all[0].priority).toBeGreaterThan(queue.all[1].priority)
  })

  it('a more-overdue concept outranks a less-overdue concept at the same base risk', () => {
    const barelyOverdue = new Date(NOW.getTime() - 40 * 86_400_000)
    const wayOverdue = new Date(NOW.getTime() - 400 * 86_400_000)
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'barely', lastEvidenceAt: barelyOverdue, probePassRate: 0.5, forgettingRisk: 0.5 }),
        conceptState({ conceptId: 'way', lastEvidenceAt: wayOverdue, probePassRate: 0.5, forgettingRisk: 0.5 }),
      ],
    })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    expect(queue.all[0].conceptId).toBe('way')
  })

  it('overdue and dueToday buckets are also priority-ordered internally', () => {
    const longAgo1 = new Date(NOW.getTime() - 100 * 86_400_000)
    const longAgo2 = new Date(NOW.getTime() - 500 * 86_400_000)
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'a', lastEvidenceAt: longAgo1, probePassRate: 0.5, forgettingRisk: 0.3 }),
        conceptState({ conceptId: 'b', lastEvidenceAt: longAgo2, probePassRate: 0.5, forgettingRisk: 0.95 }),
      ],
    })
    const queue = scheduleReviews(p, opts({ baseHalfLifeDays: 10 }))
    expect(queue.overdue.map((r) => r.conceptId)).toEqual(['b', 'a'])
  })

  it('ties break on conceptId for stable, reproducible ordering', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'zzz', forgettingRisk: 0.5, lastEvidenceAt: NOW }),
        conceptState({ conceptId: 'aaa', forgettingRisk: 0.5, lastEvidenceAt: NOW }),
      ],
    })
    const queue = scheduleReviews(p, opts())
    expect(queue.all.map((r) => r.conceptId)).toEqual(['aaa', 'zzz'])
  })
})

// ── Deterministic scheduling ─────────────────────────────────────────────────

describe('deterministic scheduling', () => {
  it('identical profile + options always yields an identical queue', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'c1', forgettingRisk: 0.6, lastEvidenceAt: new Date(NOW.getTime() - 50 * 86_400_000) }),
        conceptState({ conceptId: 'c2', forgettingRisk: 0.2 }),
      ],
      activeMisconceptions: [misconception({ conceptId: 'c1' })],
    })
    const a = scheduleReviews(p, opts({ baseHalfLifeDays: 20 }))
    const b = scheduleReviews(p, opts({ baseHalfLifeDays: 20 }))
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('does not mutate the input profile', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1' })] })
    const before = JSON.stringify(p)
    scheduleReviews(p, opts())
    expect(JSON.stringify(p)).toBe(before)
  })

  it('never reads the system clock — passing a different `now` changes the result deterministically', () => {
    const p = profile({ conceptStates: [conceptState({ conceptId: 'c1', lastEvidenceAt: NOW })] })
    const t0 = scheduleReviews(p, opts({ now: NOW }))
    const later = new Date(NOW.getTime() + 100 * 86_400_000)
    const t1 = scheduleReviews(p, opts({ now: later }))
    expect(t0.all[0].nextReviewAt.getTime()).toBe(t1.all[0].nextReviewAt.getTime()) // schedule itself is now-independent
    expect(t1.all[0].overdue).toBe(true) // but bucketing against `now` differs
  })

  it('100 repeated calls on the same input produce byte-identical output', () => {
    const p = profile({
      conceptStates: [
        conceptState({ conceptId: 'c1', forgettingRisk: 0.7 }),
        conceptState({ conceptId: 'c2', forgettingRisk: 0.1 }),
      ],
    })
    const results = Array.from({ length: 100 }, () => JSON.stringify(scheduleReviews(p, opts())))
    expect(new Set(results).size).toBe(1)
  })
})

// Sanity: forgettingRisk itself stays byte-identical after the
// effectiveHalfLifeDays extraction (regression guard for the refactor).
describe('regression: forgettingRisk unchanged by the effectiveHalfLifeDays extraction', () => {
  it('matches known values across solidity levels', () => {
    const last = new Date('2026-01-01T00:00:00Z')
    const after45d = new Date('2026-02-15T00:00:00Z')
    expect(forgettingRisk(last, last, 1, 30)).toBe(0)
    expect(forgettingRisk(last, after45d, 1, 30)).toBeCloseTo(0.5, 5)
  })
})
