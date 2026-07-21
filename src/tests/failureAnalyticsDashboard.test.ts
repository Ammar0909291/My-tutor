/**
 * Failure Analytics Dashboard tests (Claude Recommendation #9): proves the
 * dashboard correctly assembles/re-ranks EXISTING Learning Analytics,
 * Authoring Feedback, Package Feedback, and Spaced Retrieval Scheduler
 * outputs, that the new impact-ranking and aggregation logic is correct,
 * and that everything is deterministic. Follows evidenceLoop.test.ts's
 * fixture convention (hand-built EvidenceEventRow[] → readLessonEvidence).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readLessonEvidence, type EvidenceEventRow, type LessonEvidence } from '@/lib/teaching/evidence/evidenceReader'
import { computeLearningAnalytics } from '@/lib/teaching/evidence/learningAnalytics'
import { buildAuthoringFeedback, type PackageInspector } from '@/lib/teaching/evidence/authoringFeedback'
import type { ReviewQueue, ScheduledReview } from '@/lib/teaching/retrieval/spacedRetrievalScheduler'
import {
  buildFailureAnalyticsDashboard, aggregateReviewQueueStats, rankAuthoringPriorities,
  findConceptsNeedingMoreProbes, type LearnerReviewQueue,
} from '@/lib/teaching/dashboard/failureAnalyticsDashboard'

// ── Fixture builders (mirrors evidenceLoop.test.ts) ──────────────────────────

let seq = 0
beforeEach(() => { seq = 0 })
const T0 = new Date('2026-07-01T10:00:00Z').getTime()
const at = (min: number) => new Date(T0 + min * 60_000)

function ev(over: Partial<EvidenceEventRow> & { category: string; outcome: string }): EvidenceEventRow {
  seq++
  return {
    eventId: `e${String(seq).padStart(4, '0')}`,
    occurredAt: at(seq),
    userId: 'u1',
    sessionId: 's1',
    turnId: `t${seq}`,
    conceptId: 'phys.therm.entropy',
    language: 'en',
    misconceptionId: null,
    assetId: null,
    strength: 0,
    rawScore: null,
    ...over,
  }
}

const probe = (passed: boolean, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false${over.outcome ? '' : ''}`,
    strength: passed ? 1 : 0,
    rawScore: 12,
    ...over,
  })

const probeWithKey = (passed: boolean, placement: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false|placement=${placement}`,
    strength: passed ? 1 : 0,
    ...over,
  })

const mc = (phrase: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'MISCONCEPTION_DETECTED', outcome: phrase, strength: 0.5, ...over })

const noPkgInspector: PackageInspector = () => null

// Reused so probeEffectiveness rows produce `discriminates` flags matching
// what the dashboard's re-sort needs to distinguish.
function probeSeriesForConcept(conceptId: string, userId: string, sessionId: string, results: boolean[]): EvidenceEventRow[] {
  return results.map((passed, i) => probe(passed, { conceptId, userId, sessionId, turnId: `${userId}-${conceptId}-${i}` }))
}

// ── ScheduledReview / ReviewQueue fixtures ───────────────────────────────────

function scheduledReview(over: Partial<ScheduledReview> & { conceptId: string }): ScheduledReview {
  return {
    subject: 'physics',
    lastEvidenceAt: new Date(T0),
    forgettingRisk: 0.2,
    effectiveHalfLifeDays: 30,
    nextReviewAt: new Date(T0 + 10 * 86_400_000),
    overdue: false,
    daysOverdue: 0,
    hasActiveMisconception: false,
    hasEducationalPackage: null,
    priority: 0.2,
    maintenanceStatus: 'stable',
    ...over,
  }
}

function reviewQueueOf(reviews: ScheduledReview[]): ReviewQueue {
  const overdue = reviews.filter((r) => r.overdue)
  const rest = reviews.filter((r) => !r.overdue)
  return { overdue, dueToday: [], upcoming: rest, all: reviews }
}

// ── Dashboard metrics ─────────────────────────────────────────────────────────

describe('dashboard metrics', () => {
  it('passes mostFailedConcepts through verbatim from Learning Analytics', () => {
    const events = [
      ...probeSeriesForConcept('phys.a', 'u1', 's1', [false, false, false, false, true]),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.mostFailedConcepts).toEqual(direct.mostFailedConcepts)
  })

  it('passes mostCommonMisconceptions through verbatim', () => {
    const events = [mc('gravity pulls harder on heavy things', { conceptId: 'phys.b' })]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.mostCommonMisconceptions).toEqual(direct.mostCommonMisconceptions)
  })

  it('passes conceptsRequiringRepeatedRemediation and highestDropOff through verbatim', () => {
    const events = [
      mc('x', { conceptId: 'phys.c', userId: 'u1', sessionId: 's1' }),
      mc('x', { conceptId: 'phys.c', userId: 'u1', sessionId: 's2' }),
      ...probeSeriesForConcept('phys.d', 'u1', 's3', [false]),
      ...probeSeriesForConcept('phys.d', 'u2', 's4', [false]),
      ...probeSeriesForConcept('phys.d', 'u3', 's5', [true]),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.conceptsRequiringRepeatedRemediation).toEqual(direct.conceptsRequiringRepeatedRemediation)
    expect(dashboard.highestDropOff).toEqual(direct.dropOffPoints)
  })

  it('weakestMasteryProbes puts non-discriminating probes before discriminating ones', () => {
    const events = [
      // Everyone passes → does not discriminate.
      ...probeSeriesForConcept('phys.easy', 'u1', 's1', [true, true, true, true, true]),
      // Genuine spread → discriminates.
      ...probeSeriesForConcept('phys.hard', 'u1', 's2', [true, false, true, false, true]),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const easyIdx = dashboard.weakestMasteryProbes.findIndex((p) => p.conceptId === 'phys.easy')
    const hardIdx = dashboard.weakestMasteryProbes.findIndex((p) => p.conceptId === 'phys.hard')
    expect(dashboard.weakestMasteryProbes[easyIdx].discriminates).toBe(false)
    expect(dashboard.weakestMasteryProbes[hardIdx].discriminates).toBe(true)
    expect(easyIdx).toBeLessThan(hardIdx)
  })

  it('reviewQueueStats aggregates across multiple learners correctly', () => {
    const queues: LearnerReviewQueue[] = [
      { userId: 'u1', queue: reviewQueueOf([scheduledReview({ conceptId: 'c1', overdue: true, daysOverdue: 5, maintenanceStatus: 'overdue' })]) },
      { userId: 'u2', queue: reviewQueueOf([scheduledReview({ conceptId: 'c1', overdue: true, daysOverdue: 20, maintenanceStatus: 'critical' })]) },
      { userId: 'u3', queue: reviewQueueOf([scheduledReview({ conceptId: 'c2', overdue: false, maintenanceStatus: 'stable' })]) },
    ]
    const stats = aggregateReviewQueueStats(queues)
    expect(stats.totalOverdue).toBe(2)
    expect(stats.totalScheduled).toBe(3)
    expect(stats.learnersWithReviews).toBe(3)
    expect(stats.byMaintenanceStatus.overdue).toBe(1)
    expect(stats.byMaintenanceStatus.critical).toBe(1)
    expect(stats.byMaintenanceStatus.stable).toBe(1)
    expect(stats.topOverdueConcepts[0]).toEqual({ conceptId: 'c1', subject: 'physics', learners: 2, maxDaysOverdue: 20 })
  })

  it('packageEffectiveness (package feedback) passes through for a concept with a compiled package', () => {
    const inspector: PackageInspector = () => ({ packageId: 'pkg-1', contentHash: 'sha256:abc', assetKinds: new Set(['worked_example']) })
    const events = probeSeriesForConcept('phys.pkg', 'u1', 's1', [true, true])
    const lessons = readLessonEvidence({ events, packageIndex: inspector })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], inspector)
    expect(dashboard.packageEffectiveness).toHaveLength(1)
    expect(dashboard.packageEffectiveness[0].conceptId).toBe('phys.pkg')
    expect(dashboard.packageEffectiveness[0].packageId).toBe('pkg-1')
  })

  it('authoringFindings passes buildAuthoringFeedback through verbatim', () => {
    const events = probeSeriesForConcept('phys.fail', 'u1', 's1', [false, false, false, false, false])
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const analytics = computeLearningAnalytics(lessons)
    const direct = buildAuthoringFeedback(analytics, lessons, noPkgInspector)
    expect(dashboard.authoringFindings).toEqual(direct)
  })

  it('conceptsNeedingMoreProbes flags a concept with real volume but only one probe key', () => {
    const events = probeSeriesForConcept('phys.oneprobe', 'u1', 's1', [true, false, true, false, true, false])
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const gap = dashboard.conceptsNeedingMoreProbes.find((g) => g.conceptId === 'phys.oneprobe')
    expect(gap).toBeDefined()
    expect(gap!.distinctProbes).toBe(1)
    expect(gap!.totalOutcomes).toBe(6)
  })

  it('conceptsNeedingMoreProbes does NOT flag a concept with two distinct probe keys', () => {
    const events = [
      probeWithKey(true, 'below', { conceptId: 'phys.twoprobes', userId: 'u1', sessionId: 's1', turnId: 'p1' }),
      probeWithKey(false, 'below', { conceptId: 'phys.twoprobes', userId: 'u1', sessionId: 's1', turnId: 'p2' }),
      probeWithKey(true, 'above', { conceptId: 'phys.twoprobes', userId: 'u1', sessionId: 's1', turnId: 'p3' }),
      probeWithKey(false, 'above', { conceptId: 'phys.twoprobes', userId: 'u1', sessionId: 's1', turnId: 'p4' }),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    expect(dashboard.conceptsNeedingMoreProbes.find((g) => g.conceptId === 'phys.twoprobes')).toBeUndefined()
  })

  it('generatedFrom.learnersSeen counts distinct users across all lessons', () => {
    const events = [
      ...probeSeriesForConcept('phys.a', 'u1', 's1', [true]),
      ...probeSeriesForConcept('phys.a', 'u2', 's2', [true]),
      ...probeSeriesForConcept('phys.b', 'u1', 's3', [true]),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    expect(dashboard.generatedFrom.learnersSeen).toBe(2)
  })

  it('workedExampleEffectiveness defaults to null when not supplied', () => {
    const lessons = readLessonEvidence({ events: probeSeriesForConcept('phys.a', 'u1', 's1', [true]) })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    expect(dashboard.workedExampleEffectiveness).toBeNull()
  })
})

// ── Ranking correctness ───────────────────────────────────────────────────────

describe('ranking correctness', () => {
  it('a high-severity finding with more evidence outranks a high-severity finding with less', () => {
    const events = [
      ...probeSeriesForConcept('phys.bigfail', 'u1', 's1', [false, false, false, false, false, false, false, false, false, false]),
      ...probeSeriesForConcept('phys.smallfail', 'u2', 's2', [false, false, false, false, false]),
    ]
    const lessons = readLessonEvidence({ events })
    const analytics = computeLearningAnalytics(lessons)
    const report = buildAuthoringFeedback(analytics, lessons, noPkgInspector)
    const ranked = rankAuthoringPriorities(report, analytics)
    const bigIdx = ranked.findIndex((r) => r.conceptId === 'phys.bigfail')
    const smallIdx = ranked.findIndex((r) => r.conceptId === 'phys.smallfail')
    expect(bigIdx).toBeGreaterThanOrEqual(0)
    expect(smallIdx).toBeGreaterThanOrEqual(0)
    expect(ranked[bigIdx].impactScore).toBeGreaterThan(ranked[smallIdx].impactScore)
    expect(bigIdx).toBeLessThan(smallIdx)
  })

  it('impactScore = severity weight (2 for high, 1 for medium) × magnitude', () => {
    const events = probeSeriesForConcept('phys.fail', 'u1', 's1', [false, false, false, false, false])
    const lessons = readLessonEvidence({ events })
    const analytics = computeLearningAnalytics(lessons)
    const report = buildAuthoringFeedback(analytics, lessons, noPkgInspector)
    const ranked = rankAuthoringPriorities(report, analytics)
    const finding = ranked.find((r) => r.conceptId === 'phys.fail' && r.kind === 'blueprint_needs_revision')!
    const failures = analytics.mostFailedConcepts.find((c) => c.id === 'phys.fail')!.stat.failures
    const expectedWeight = finding.severity === 'high' ? 2 : 1
    expect(finding.impactScore).toBe(expectedWeight * failures)
  })

  it('orders the full priority list by impactScore descending', () => {
    const events = [
      ...probeSeriesForConcept('phys.a', 'u1', 's1', [false, false, false, false, false, false]),
      ...probeSeriesForConcept('phys.b', 'u1', 's2', [false, false, false, false, false]),
    ]
    const lessons = readLessonEvidence({ events })
    const analytics = computeLearningAnalytics(lessons)
    const report = buildAuthoringFeedback(analytics, lessons, noPkgInspector)
    const ranked = rankAuthoringPriorities(report, analytics)
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].impactScore).toBeGreaterThanOrEqual(ranked[i].impactScore)
    }
  })

  it('ties in impactScore break on conceptId for reproducible ordering', () => {
    const events = [
      ...probeSeriesForConcept('phys.zzz', 'u1', 's1', [false, false, false, false, false]),
      ...probeSeriesForConcept('phys.aaa', 'u1', 's2', [false, false, false, false, false]),
    ]
    const lessons = readLessonEvidence({ events })
    const analytics = computeLearningAnalytics(lessons)
    const report = buildAuthoringFeedback(analytics, lessons, noPkgInspector)
    const ranked = rankAuthoringPriorities(report, analytics)
    const zzz = ranked.findIndex((r) => r.conceptId === 'phys.zzz')
    const aaa = ranked.findIndex((r) => r.conceptId === 'phys.aaa')
    // Equal magnitude and severity → conceptId tiebreak, aaa first.
    expect(aaa).toBeLessThan(zzz)
  })

  it('topOverdueConcepts ranks by learner count first, then max days overdue', () => {
    const queues: LearnerReviewQueue[] = [
      { userId: 'u1', queue: reviewQueueOf([scheduledReview({ conceptId: 'lonely', overdue: true, daysOverdue: 100 })]) },
      { userId: 'u1', queue: reviewQueueOf([scheduledReview({ conceptId: 'popular', overdue: true, daysOverdue: 1 })]) },
      { userId: 'u2', queue: reviewQueueOf([scheduledReview({ conceptId: 'popular', overdue: true, daysOverdue: 2 })]) },
    ]
    const stats = aggregateReviewQueueStats(queues)
    expect(stats.topOverdueConcepts[0].conceptId).toBe('popular') // 2 learners beats 1, despite fewer days overdue
    expect(stats.topOverdueConcepts[0].learners).toBe(2)
  })
})

// ── Deterministic output ─────────────────────────────────────────────────────

describe('deterministic output', () => {
  it('identical lessons + queues always yield an identical dashboard', () => {
    const events = [
      ...probeSeriesForConcept('phys.a', 'u1', 's1', [false, true, false]),
      mc('gravity is heavier', { conceptId: 'phys.a', userId: 'u1', sessionId: 's1' }),
    ]
    const lessons = readLessonEvidence({ events })
    const queues: LearnerReviewQueue[] = [{ userId: 'u1', queue: reviewQueueOf([scheduledReview({ conceptId: 'phys.a' })]) }]
    const a = buildFailureAnalyticsDashboard(lessons, queues, noPkgInspector)
    const b = buildFailureAnalyticsDashboard(lessons, queues, noPkgInspector)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('does not mutate the input lessons or review queues', () => {
    const events = probeSeriesForConcept('phys.a', 'u1', 's1', [false, true])
    const lessons = readLessonEvidence({ events })
    const queues: LearnerReviewQueue[] = [{ userId: 'u1', queue: reviewQueueOf([scheduledReview({ conceptId: 'phys.a' })]) }]
    const lessonsBefore = JSON.stringify(lessons)
    const queuesBefore = JSON.stringify(queues)
    buildFailureAnalyticsDashboard(lessons, queues, noPkgInspector)
    expect(JSON.stringify(lessons)).toBe(lessonsBefore)
    expect(JSON.stringify(queues)).toBe(queuesBefore)
  })

  it('50 repeated calls on the same input produce byte-identical output', () => {
    const events = probeSeriesForConcept('phys.a', 'u1', 's1', [false, false, true, false, true, false])
    const lessons = readLessonEvidence({ events })
    const results = Array.from({ length: 50 }, () => JSON.stringify(buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)))
    expect(new Set(results).size).toBe(1)
  })
})

// ── Empty dataset handling ───────────────────────────────────────────────────

describe('empty dataset handling', () => {
  it('an empty lesson corpus and empty review queues produce a fully-formed, empty dashboard without throwing', () => {
    const dashboard = buildFailureAnalyticsDashboard([], [], noPkgInspector)
    expect(dashboard.generatedFrom).toEqual({ lessonsAnalyzed: 0, conceptsSeen: 0, learnersSeen: 0 })
    expect(dashboard.mostFailedConcepts).toEqual([])
    expect(dashboard.mostCommonMisconceptions).toEqual([])
    expect(dashboard.recoverySuccessRates).toEqual([])
    expect(dashboard.weakestMasteryProbes).toEqual([])
    expect(dashboard.conceptsRequiringRepeatedRemediation).toEqual([])
    expect(dashboard.highestDropOff).toEqual([])
    expect(dashboard.packageEffectiveness).toEqual([])
    expect(dashboard.authoringFindings.findings).toEqual([])
    expect(dashboard.authoringPriorities).toEqual([])
    expect(dashboard.conceptsNeedingMoreProbes).toEqual([])
    expect(dashboard.workedExampleEffectiveness).toBeNull()
  })

  it('aggregateReviewQueueStats on an empty array returns all-zero/null stats without throwing', () => {
    const stats = aggregateReviewQueueStats([])
    expect(stats).toEqual({
      learnersWithReviews: 0,
      totalScheduled: 0,
      totalOverdue: 0,
      totalDueToday: 0,
      totalUpcoming: 0,
      avgForgettingRisk: null,
      byMaintenanceStatus: { stable: 0, at_risk: 0, overdue: 0, critical: 0 },
      topOverdueConcepts: [],
    })
  })

  it('rankAuthoringPriorities on an empty report returns an empty list', () => {
    const analytics = computeLearningAnalytics([])
    const report = buildAuthoringFeedback(analytics, [], noPkgInspector)
    expect(rankAuthoringPriorities(report, analytics)).toEqual([])
  })

  it('findConceptsNeedingMoreProbes on empty analytics returns an empty list', () => {
    const analytics = computeLearningAnalytics([])
    expect(findConceptsNeedingMoreProbes(analytics, [])).toEqual([])
  })

  it('a learner with an empty review queue counts toward totals but not learnersWithReviews', () => {
    const stats = aggregateReviewQueueStats([{ userId: 'u1', queue: reviewQueueOf([]) }])
    expect(stats.learnersWithReviews).toBe(0)
    expect(stats.totalScheduled).toBe(0)
  })
})

// ── Regression ────────────────────────────────────────────────────────────────

describe('regression', () => {
  it('dashboard does not change Learning Analytics ordering for mostCommonMisconceptions', () => {
    const events = [
      mc('a', { conceptId: 'phys.x', userId: 'u1' }),
      mc('a', { conceptId: 'phys.x', userId: 'u2' }),
      mc('b', { conceptId: 'phys.y', userId: 'u1' }),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.mostCommonMisconceptions.map((m) => m.id)).toEqual(direct.mostCommonMisconceptions.map((m) => m.id))
  })

  it('recoverySuccessRates passes through unmodified (still worst-first)', () => {
    const events = [
      ev({ category: 'LEARNER_FEEDBACK', outcome: 'recovery:i_cant_do_this', conceptId: 'phys.r', userId: 'u1', sessionId: 's1' }),
      probe(false, { conceptId: 'phys.r', userId: 'u1', sessionId: 's1', turnId: 'after' }),
    ]
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.recoverySuccessRates).toEqual(direct.recoverySuccessRates)
  })

  it('weakestMasteryProbes never drops or adds rows versus analytics.probeEffectiveness', () => {
    const events = probeSeriesForConcept('phys.a', 'u1', 's1', [true, false, true])
    const lessons = readLessonEvidence({ events })
    const dashboard = buildFailureAnalyticsDashboard(lessons, [], noPkgInspector)
    const direct = computeLearningAnalytics(lessons)
    expect(dashboard.weakestMasteryProbes).toHaveLength(direct.probeEffectiveness.length)
    expect(new Set(dashboard.weakestMasteryProbes.map((p) => `${p.conceptId}::${p.probe}`)))
      .toEqual(new Set(direct.probeEffectiveness.map((p) => `${p.conceptId}::${p.probe}`)))
  })

  it('buildFailureAnalyticsDashboard never throws when packages/analytics/queues are all absent', () => {
    expect(() => buildFailureAnalyticsDashboard([], [], noPkgInspector)).not.toThrow()
  })
})
