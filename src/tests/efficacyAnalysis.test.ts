/**
 * Efficacy Study Analysis Pipeline tests (Claude Recommendation #11,
 * Phase 4): proves eligibility filtering, learning-gain/misconception-
 * repair/completion/engagement/retention-trend computations are correct,
 * deterministic, and degrade honestly on empty input — never fabricating
 * a result. Follows evidenceLoop.test.ts's fixture convention (hand-built
 * EvidenceEventRow[] -> readLessonEvidence).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readLessonEvidence, type EvidenceEventRow, type LessonEvidence } from '@/lib/teaching/evidence/evidenceReader'
import { buildStudentIntelligence, type StudentIntelligence } from '@/lib/teaching/studentIntelligence/studentIntelligence'
import type { PackageInspector } from '@/lib/teaching/evidence/authoringFeedback'
import {
  filterEligibleLessons, computeLearningGain, computeMisconceptionRepairRate,
  computeLessonCompletionRate, aggregateEngagement, computeRetentionTrend,
  buildEfficacyStudyReport, MIN_SAMPLE, type StudyEligibilityCriteria,
} from '@/lib/research/efficacyAnalysis'
import type { ReviewQueueStats } from '@/lib/teaching/dashboard/failureAnalyticsDashboard'

// ── Fixture builders (mirrors evidenceLoop.test.ts) ──────────────────────────

let seq = 0
beforeEach(() => { seq = 0 })
const T0 = new Date('2026-01-01T00:00:00Z').getTime()
const at = (min: number) => new Date(T0 + min * 60_000)
const daysAfter = (d: number) => new Date(T0 + d * 86_400_000)

function ev(over: Partial<EvidenceEventRow> & { category: string; outcome: string }): EvidenceEventRow {
  seq++
  return {
    eventId: `e${String(seq).padStart(4, '0')}`,
    occurredAt: at(seq),
    userId: 'u1',
    sessionId: 's1',
    turnId: `t${seq}`,
    conceptId: 'phys.mech.f1',
    language: 'en',
    misconceptionId: null,
    strength: 0,
    rawScore: null,
    ...over,
  }
}

const probe = (passed: boolean, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false`,
    strength: passed ? 1 : 0,
    ...over,
  })

const mc = (phrase: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'MISCONCEPTION_DETECTED', outcome: phrase, strength: 0.5, ...over })

const noPkgInspector: PackageInspector = () => null

function criteria(over: Partial<StudyEligibilityCriteria> = {}): StudyEligibilityCriteria {
  return {
    participantUserIds: ['u1'],
    studyStart: new Date(T0 - 86_400_000),
    studyEnd: new Date(T0 + 365 * 86_400_000),
    ...over,
  }
}

// ── Eligibility filtering ─────────────────────────────────────────────────────

describe('filterEligibleLessons', () => {
  it('excludes learners not in participantUserIds (never treats the whole corpus as the cohort)', () => {
    const events = [probe(true, { userId: 'u1', sessionId: 's1' }), probe(true, { userId: 'u2', sessionId: 's2' })]
    const lessons = readLessonEvidence({ events })
    const { eligible, participantsIncluded } = filterEligibleLessons(lessons, criteria({ participantUserIds: ['u1'], minLessonsPerLearner: 1 }))
    expect(eligible.every((l) => l.userId === 'u1')).toBe(true)
    expect(participantsIncluded).toBe(1)
  })

  it('excludes a learner below minLessonsPerLearner', () => {
    const events = [probe(true, { userId: 'u1', sessionId: 's1', conceptId: 'c1' })]
    const lessons = readLessonEvidence({ events })
    const { eligible, participantsIncluded, participantsExcluded } = filterEligibleLessons(
      lessons, criteria({ participantUserIds: ['u1'], minLessonsPerLearner: 3 }),
    )
    expect(eligible).toHaveLength(0)
    expect(participantsIncluded).toBe(0)
    expect(participantsExcluded).toBe(1)
  })

  it('includes a learner who meets minLessonsPerLearner across distinct lessons', () => {
    const events = [
      probe(true, { userId: 'u1', sessionId: 's1', conceptId: 'c1' }),
      probe(true, { userId: 'u1', sessionId: 's2', conceptId: 'c2' }),
      probe(true, { userId: 'u1', sessionId: 's3', conceptId: 'c3' }),
    ]
    const lessons = readLessonEvidence({ events })
    const { eligible, participantsIncluded } = filterEligibleLessons(lessons, criteria({ participantUserIds: ['u1'], minLessonsPerLearner: 3 }))
    expect(eligible).toHaveLength(3)
    expect(participantsIncluded).toBe(1)
  })

  it('excludes lessons outside the study window', () => {
    const events = [probe(true, { userId: 'u1', sessionId: 's1', occurredAt: daysAfter(-100) })]
    const lessons = readLessonEvidence({ events })
    const { eligible } = filterEligibleLessons(lessons, criteria({ participantUserIds: ['u1'], minLessonsPerLearner: 1, studyStart: new Date(T0), studyEnd: new Date(T0 + 86_400_000) }))
    expect(eligible).toHaveLength(0)
  })

  it('restricts to the subjects filter when supplied', () => {
    const events = [
      probe(true, { userId: 'u1', sessionId: 's1', conceptId: 'phys.a' }),
      probe(true, { userId: 'u1', sessionId: 's2', conceptId: 'eng.b' }),
    ]
    const lessons = readLessonEvidence({ events })
    const { eligible } = filterEligibleLessons(lessons, criteria({ participantUserIds: ['u1'], minLessonsPerLearner: 1, subjects: ['physics'] }))
    expect(eligible.every((l) => l.subject === 'physics')).toBe(true)
  })

  it('an empty participantUserIds list yields zero eligible lessons, not "everyone"', () => {
    const events = [probe(true, { userId: 'u1' }), probe(true, { userId: 'u2' })]
    const lessons = readLessonEvidence({ events })
    const { eligible, participantsIncluded } = filterEligibleLessons(lessons, criteria({ participantUserIds: [], minLessonsPerLearner: 1 }))
    expect(eligible).toHaveLength(0)
    expect(participantsIncluded).toBe(0)
  })
})

// ── Learning gain ─────────────────────────────────────────────────────────────

describe('computeLearningGain', () => {
  it('computes a positive gain when the second half passes more often than the first', () => {
    const events = [
      probe(false, { conceptId: 'c1', turnId: 't1' }),
      probe(false, { conceptId: 'c1', turnId: 't2' }),
      probe(true, { conceptId: 'c1', turnId: 't3' }),
      probe(true, { conceptId: 'c1', turnId: 't4' }),
    ]
    const lessons = readLessonEvidence({ events })
    const gain = computeLearningGain(lessons)
    const c1 = gain.find((g) => g.conceptId === 'c1')!
    expect(c1.firstHalfPassRate).toBe(0)
    expect(c1.secondHalfPassRate).toBe(1)
    expect(c1.gain).toBe(1)
  })

  it('omits concepts with zero probe evidence entirely (never reports a fabricated zero gain)', () => {
    const events = [mc('x', { conceptId: 'c1' })] // misconception only, no probes
    const lessons = readLessonEvidence({ events })
    const gain = computeLearningGain(lessons)
    expect(gain.find((g) => g.conceptId === 'c1')).toBeUndefined()
  })

  it('flags lowSample when total outcomes are below MIN_SAMPLE', () => {
    const events = [probe(true, { conceptId: 'c1' }), probe(false, { conceptId: 'c1', turnId: 't2' })]
    const lessons = readLessonEvidence({ events })
    const gain = computeLearningGain(lessons)
    expect(gain[0].lowSample).toBe(true)
    expect(gain[0].firstHalfOutcomes + gain[0].secondHalfOutcomes).toBeLessThan(MIN_SAMPLE)
  })

  it('counts distinct learners per concept', () => {
    const events = [
      probe(true, { conceptId: 'c1', userId: 'u1', turnId: 't1' }),
      probe(true, { conceptId: 'c1', userId: 'u2', turnId: 't2' }),
    ]
    const lessons = readLessonEvidence({ events })
    const gain = computeLearningGain(lessons)
    expect(gain.find((g) => g.conceptId === 'c1')!.learners).toBe(2)
  })
})

// ── Misconception repair rate ─────────────────────────────────────────────────

describe('computeMisconceptionRepairRate', () => {
  function profileWith(lessons: LessonEvidence[]): StudentIntelligence {
    return buildStudentIntelligence('u1', lessons, { now: daysAfter(400) })
  }

  it('computes repairRate=1 when every detected misconception has a later passing probe (dormant)', () => {
    const events = [
      mc('gravity pulls harder on heavy things', { conceptId: 'c1', sessionId: 's1' }),
      probe(true, { conceptId: 'c1', sessionId: 's1', turnId: 't2' }),
    ]
    const lessons = readLessonEvidence({ events })
    const stat = computeMisconceptionRepairRate([profileWith(lessons)])
    expect(stat.totalDetected).toBe(1)
    expect(stat.repairRate).toBe(1)
    expect(stat.totalActive).toBe(0)
  })

  it('computes repairRate=0 when no passing probe follows the misconception', () => {
    const events = [mc('gravity pulls harder on heavy things', { conceptId: 'c1', sessionId: 's1' })]
    const lessons = readLessonEvidence({ events })
    const stat = computeMisconceptionRepairRate([profileWith(lessons)])
    expect(stat.repairRate).toBe(0)
    expect(stat.totalActive).toBe(1)
  })

  it('returns repairRate=0 (not null/NaN) when zero misconceptions were detected', () => {
    const lessons = readLessonEvidence({ events: [probe(true, { conceptId: 'c1' })] })
    const stat = computeMisconceptionRepairRate([profileWith(lessons)])
    expect(stat.totalDetected).toBe(0)
    expect(stat.repairRate).toBe(0)
    expect(stat.lowSample).toBe(true)
  })

  it('aggregates across multiple learner profiles', () => {
    const lessons1 = readLessonEvidence({ events: [mc('x', { conceptId: 'c1', userId: 'u1', sessionId: 's1' }), probe(true, { conceptId: 'c1', userId: 'u1', sessionId: 's1', turnId: 't2' })] })
    const lessons2 = readLessonEvidence({ events: [mc('y', { conceptId: 'c2', userId: 'u2', sessionId: 's2' })] })
    const p1 = buildStudentIntelligence('u1', lessons1, { now: daysAfter(400) })
    const p2 = buildStudentIntelligence('u2', lessons2, { now: daysAfter(400) })
    const stat = computeMisconceptionRepairRate([p1, p2])
    expect(stat.totalDetected).toBe(2)
    expect(stat.totalDormant).toBe(1)
    expect(stat.totalActive).toBe(1)
    expect(stat.repairRate).toBe(0.5)
  })
})

// ── Lesson completion ─────────────────────────────────────────────────────────

describe('computeLessonCompletionRate', () => {
  it('counts a mastered-outcome lesson as completed', () => {
    const events = [ev({ category: 'PROBE_OUTCOME', outcome: 'pass|conf=high|confusion=false', conceptId: 'c1' })]
    // masteryStatus flows through TopicProgress join, not directly settable here;
    // rely on outcome classification via a passing final probe -> 'progressing'.
    const lessons = readLessonEvidence({ events })
    const stat = computeLessonCompletionRate(lessons)
    expect(stat.totalLessons).toBe(1)
    expect(stat.completedOrMastered).toBe(1)
    expect(stat.completionRate).toBe(1)
  })

  it('excludes no_signal lessons from the denominator', () => {
    const events = [ev({ category: 'RE_ASK', outcome: 'x', conceptId: 'c1' })] // no probes/recoveries/misconceptions
    const lessons = readLessonEvidence({ events })
    const stat = computeLessonCompletionRate(lessons)
    expect(stat.totalLessons).toBe(0)
    expect(stat.completionRate).toBe(0)
  })

  it('counts an abandoned lesson (final event is a failing probe) as not completed', () => {
    const events = [probe(false, { conceptId: 'c1' })]
    const lessons = readLessonEvidence({ events })
    const stat = computeLessonCompletionRate(lessons)
    expect(stat.completedOrMastered).toBe(0)
    expect(stat.completionRate).toBe(0)
  })

  it('flags lowSample below MIN_SAMPLE total lessons', () => {
    const events = [probe(true, { conceptId: 'c1' })]
    const lessons = readLessonEvidence({ events })
    const stat = computeLessonCompletionRate(lessons)
    expect(stat.lowSample).toBe(true)
  })
})

// ── Cohort engagement ─────────────────────────────────────────────────────────

describe('aggregateEngagement', () => {
  it('averages sessions observed across learners', () => {
    const p1 = buildStudentIntelligence('u1', readLessonEvidence({ events: [probe(true, { userId: 'u1', sessionId: 's1' })] }), { now: daysAfter(1) })
    const p2 = buildStudentIntelligence('u2', readLessonEvidence({ events: [
      probe(true, { userId: 'u2', sessionId: 's2', turnId: 'a' }),
      probe(true, { userId: 'u2', sessionId: 's3', turnId: 'b' }),
    ] }), { now: daysAfter(1) })
    const agg = aggregateEngagement([p1, p2])
    expect(agg.learners).toBe(2)
    expect(agg.meanSessionsPerLearner).toBe((1 + 2) / 2)
  })

  it('returns nulls (not zeros) when no profile has evidence for a field', () => {
    const agg = aggregateEngagement([])
    expect(agg.learners).toBe(0)
    expect(agg.meanSessionsPerLearner).toBeNull()
    expect(agg.meanLongestGapDays).toBeNull()
  })
})

// ── Retention trend ───────────────────────────────────────────────────────────

describe('computeRetentionTrend', () => {
  function stats(avgForgettingRisk: number | null): ReviewQueueStats {
    return {
      learnersWithReviews: 1, totalScheduled: 1, totalOverdue: 0, totalDueToday: 0, totalUpcoming: 1,
      avgForgettingRisk, byMaintenanceStatus: { stable: 1, at_risk: 0, overdue: 0, critical: 0 }, topOverdueConcepts: [],
    }
  }

  it('computes a negative delta when forgetting risk improves', () => {
    const trend = computeRetentionTrend(stats(0.5), stats(0.2))
    expect(trend.avgForgettingRiskDelta).toBeCloseTo(-0.3, 10)
  })

  it('returns null delta when either window has no averageable data', () => {
    const trend = computeRetentionTrend(stats(null), stats(0.2))
    expect(trend.avgForgettingRiskDelta).toBeNull()
  })
})

// ── Full report composition ───────────────────────────────────────────────────

describe('buildEfficacyStudyReport', () => {
  it('assembles a coherent report from eligible lessons and profiles', () => {
    const events = [
      probe(false, { conceptId: 'c1', turnId: 't1' }),
      probe(true, { conceptId: 'c1', turnId: 't2' }),
      mc('x', { conceptId: 'c1', turnId: 't3' }),
      probe(true, { conceptId: 'c1', turnId: 't4' }),
    ]
    const lessons = readLessonEvidence({ events })
    const profile = buildStudentIntelligence('u1', lessons, { now: daysAfter(10) })
    const report = buildEfficacyStudyReport(
      lessons, [profile], 1, 0, noPkgInspector, daysAfter(10), { start: new Date(T0), end: daysAfter(10) },
    )
    expect(report.cohort.participantsIncluded).toBe(1)
    expect(report.overall.learningGain.length).toBeGreaterThan(0)
    expect(report.bySubject.length).toBeGreaterThan(0)
    expect(report.overall.misconceptionRepair.totalDetected).toBe(1)
  })

  it('produces a zero-participant caveat and no findings when the cohort is empty', () => {
    const report = buildEfficacyStudyReport([], [], 0, 0, noPkgInspector, daysAfter(0), { start: new Date(T0), end: daysAfter(0) })
    expect(report.cohort.participantsIncluded).toBe(0)
    expect(report.caveats[0]).toMatch(/Zero eligible participants/)
    expect(report.overall.learningGain).toEqual([])
    expect(report.bySubject).toEqual([])
  })

  it('is deterministic — identical input yields an identical report', () => {
    const events = [probe(true, { conceptId: 'c1', turnId: 't1' }), probe(false, { conceptId: 'c1', turnId: 't2' })]
    const lessons = readLessonEvidence({ events })
    const profile = buildStudentIntelligence('u1', lessons, { now: daysAfter(5) })
    const a = buildEfficacyStudyReport(lessons, [profile], 1, 0, noPkgInspector, daysAfter(5), { start: new Date(T0), end: daysAfter(5) })
    const b = buildEfficacyStudyReport(lessons, [profile], 1, 0, noPkgInspector, daysAfter(5), { start: new Date(T0), end: daysAfter(5) })
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('flags a low-cohort-size caveat below the ~34-participant planning target', () => {
    const lessons = readLessonEvidence({ events: [probe(true, { conceptId: 'c1' })] })
    const profile = buildStudentIntelligence('u1', lessons, { now: daysAfter(1) })
    const report = buildEfficacyStudyReport(lessons, [profile], 1, 0, noPkgInspector, daysAfter(1), { start: new Date(T0), end: daysAfter(1) })
    expect(report.caveats.some((c) => c.includes('below the planning target'))).toBe(true)
  })
})
