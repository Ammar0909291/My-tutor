/**
 * Student Intelligence tests: learner aggregation, misconception tracking
 * (active/dormant/regrowth), mastery aggregation, confidence evolution,
 * forgetting estimation, and deterministic profile generation — over the
 * pure builder with injected LessonEvidence and clock (no DB, no fs).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readLessonEvidence, type EvidenceEventRow, type EvidenceCorpus } from '@/lib/teaching/evidence/evidenceReader'
import {
  buildStudentIntelligence, forgettingRisk,
  type StudentIntelligence,
} from '@/lib/teaching/studentIntelligence/studentIntelligence'

// ── Fixtures (same event vocabulary route.ts writes) ─────────────────────────

let seq = 0
beforeEach(() => { seq = 0 })
const T0 = new Date('2026-07-01T10:00:00Z').getTime()
const at = (min: number) => new Date(T0 + min * 60_000)
const NOW = new Date('2026-07-16T10:00:00Z') // 15 days after T0

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
    strength: 0,
    rawScore: null,
    ...over,
  }
}

const probe = (passed: boolean, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=na|confusion=false`,
    strength: passed ? 1 : 0,
    ...over,
  })

const confProbe = (passed: boolean, conf: 'high' | 'low', over: Partial<EvidenceEventRow> = {}) =>
  probe(passed, { outcome: `${passed ? 'pass' : 'fail'}|conf=${conf}|confusion=false`, ...over })

const mc = (phrase: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'MISCONCEPTION_DETECTED', outcome: phrase, strength: 0.5, ...over })

const recovery = (state: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'LEARNER_FEEDBACK', outcome: `recovery:${state}`, ...over })

function profileFrom(events: EvidenceEventRow[], extra: Partial<EvidenceCorpus> = {}, now = NOW): StudentIntelligence {
  return buildStudentIntelligence('u1', readLessonEvidence({ events, ...extra }), { now })
}

// ── Learner aggregation ──────────────────────────────────────────────────────

describe('learner aggregation', () => {
  it('aggregates concept states across lessons and ignores other users', () => {
    const events = [
      probe(true), probe(false),                                        // entropy lesson 1
      probe(true, { sessionId: 's2' }),                                 // entropy lesson 2 (retry)
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 's2' }),   // beats
      probe(false, { userId: 'intruder', sessionId: 's9' }),            // someone else
    ]
    const si = profileFrom(events)
    expect(si.userId).toBe('u1')
    expect(si.evidenceBase).toEqual({ lessons: 3, probeOutcomes: 4, concepts: 2 })

    const entropy = si.conceptStates.find((c) => c.conceptId === 'phys.therm.entropy')!
    expect(entropy.lessons).toBe(2)
    expect(entropy.retries).toBe(1)
    expect(entropy.probeOutcomes).toBe(3)
    expect(entropy.probePassRate).toBeCloseTo(2 / 3)
    expect(entropy.subject).toBe('physics')

    expect(si.probePerformance).toEqual({ outcomes: 4, passRate: 0.75 })
  })

  it('captures recovery effectiveness, engagement, and cognitive load descriptively', () => {
    const events = [
      recovery('im_stuck'),
      probe(true, { outcome: 'pass|conf=na|confusion=true', rawScore: 30 }),
      recovery('i_cant_do_this', { sessionId: 's2' }), // terminal → abandoned lesson
    ]
    const si = profileFrom(events)
    const stuck = si.recoveryEffectiveness.find((r) => r.state === 'im_stuck')!
    expect(stuck).toMatchObject({ attempts: 1, recovered: 1, rate: 1 })
    const cant = si.recoveryEffectiveness.find((r) => r.state === 'i_cant_do_this')!
    expect(cant.rate).toBe(0)

    expect(si.engagement.sessionsObserved).toBe(2)
    expect(si.engagement.abandonedLessons).toBe(1)
    expect(si.engagement.lastActiveAt).toEqual(at(3))

    expect(si.cognitiveLoad.confusionRate).toBe(1)
    expect(si.cognitiveLoad.meanProbeLatencySec).toBe(30)
  })

  it('reports modality affinities only past the evidence minimum (never an identity from one sample)', () => {
    const strategyEvents = [1, 2, 3].map((i) => ({
      userId: 'u1', topicSlug: 't', strategy: 'VISUAL_FIRST', sessionId: 's1', createdAt: at(i - 0.5),
    }))
    const events = [probe(true), probe(true), probe(true)]
    const withEnough = profileFrom(events, { strategyEvents })
    expect(withEnough.modalityAffinities).toEqual([{ strategy: 'VISUAL_FIRST', successRate: 1, evidenceCount: 3 }])

    const withOne = profileFrom([probe(true)], { strategyEvents: strategyEvents.slice(0, 1) })
    expect(withOne.modalityAffinities).toEqual([]) // N=1 is a hypothesis, not an affinity
  })
})

// ── Misconception tracking ───────────────────────────────────────────────────

describe('misconception tracking', () => {
  it('classifies a misconception with no later pass as ACTIVE', () => {
    const si = profileFrom([probe(true), mc('entropy is disorder', { misconceptionId: 'MC-DISORDER' })])
    expect(si.activeMisconceptions).toHaveLength(1)
    expect(si.activeMisconceptions[0]).toMatchObject({ id: 'MC-DISORDER', activity: 'active', detections: 1 })
    expect(si.misconceptionHistory).toHaveLength(1)
  })

  it('classifies a misconception followed by a passing probe as DORMANT — but keeps it in history forever', () => {
    const si = profileFrom([mc('x', { misconceptionId: 'MC-X' }), probe(true)])
    expect(si.activeMisconceptions).toHaveLength(0)
    expect(si.misconceptionHistory[0].activity).toBe('dormant')
  })

  it('counts regrowth: detection → pass → re-detection', () => {
    const si = profileFrom([
      mc('x', { misconceptionId: 'MC-X' }),
      probe(true),
      mc('x again', { misconceptionId: 'MC-X', sessionId: 's2' }),
    ])
    const hist = si.misconceptionHistory[0]
    expect(hist.detections).toBe(2)
    expect(hist.regrowths).toBe(1)
    expect(hist.activity).toBe('active') // no pass after the re-detection
    expect(hist.phrases).toEqual(['x', 'x again'])
  })

  it('buckets unattributed detections by phrase without inventing slugs', () => {
    const si = profileFrom([mc('heat is a substance')])
    expect(si.activeMisconceptions[0].id).toBe('phrase:heat is a substance')
  })
})

// ── Mastery aggregation ──────────────────────────────────────────────────────

describe('mastery aggregation', () => {
  it('lists mastered concepts from TopicProgress status and carries mastery pct', () => {
    const events = [probe(true), probe(true, { conceptId: 'phys.wave.beats', sessionId: 's2' })]
    const si = profileFrom(events, {
      topicProgress: [
        {
          userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.therm.entropy',
          status: 'MASTERED', masteryPct: 95, attempts: 3, revisionCount: 1,
          createdAt: at(0), completedAt: at(2), updatedAt: at(2),
        },
        {
          userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.wave.beats',
          status: 'IN_PROGRESS', masteryPct: 40, attempts: 1, revisionCount: 0,
          createdAt: at(0), completedAt: null, updatedAt: at(2),
        },
      ],
    })
    expect(si.masteredConcepts).toEqual(['phys.therm.entropy'])
    const beats = si.conceptStates.find((c) => c.conceptId === 'phys.wave.beats')!
    expect(beats.mastered).toBe(false)
    expect(beats.masteryPct).toBe(40)
  })
})

// ── Confidence evolution ─────────────────────────────────────────────────────

describe('confidence evolution', () => {
  it('reads a rising trend across halves of the observation series', () => {
    const si = profileFrom([
      confProbe(false, 'low'), confProbe(true, 'low'),
      confProbe(true, 'high'), confProbe(true, 'high'),
    ])
    expect(si.confidence.observations).toBe(4)
    expect(si.confidence.firstHalfMean).toBe(0)
    expect(si.confidence.secondHalfMean).toBe(1)
    expect(si.confidence.direction).toBe('rising')
  })

  it('counts calibration quadrants: confident-wrong and hesitant-right', () => {
    const si = profileFrom([confProbe(false, 'high'), confProbe(true, 'low')])
    expect(si.confidence.confidentWrongCount).toBe(1)
    expect(si.confidence.hesitantRightCount).toBe(1)
    expect(si.confidence.direction).toBe('insufficient_evidence') // < 4 observations
  })

  it('ignores probes with no stated confidence (conf=na)', () => {
    const si = profileFrom([probe(true), probe(false)])
    expect(si.confidence.observations).toBe(0)
  })
})

// ── Forgetting estimation ────────────────────────────────────────────────────

describe('forgetting estimation', () => {
  it('is 0 at the moment of evidence and grows toward 1 with silence', () => {
    const last = new Date('2026-07-01T00:00:00Z')
    expect(forgettingRisk(last, last, 1, 30)).toBe(0)
    const after45d = new Date('2026-08-15T00:00:00Z') // one half-life at pass rate 1 (30 × 1.5)
    expect(forgettingRisk(last, after45d, 1, 30)).toBeCloseTo(0.5, 5)
    const afterLong = new Date('2027-07-01T00:00:00Z')
    expect(forgettingRisk(last, afterLong, 1, 30)).toBeGreaterThan(0.99)
  })

  it('decays faster for shaky knowledge (lower pass rate → shorter half-life)', () => {
    const last = new Date('2026-07-01T00:00:00Z')
    const later = new Date('2026-07-31T00:00:00Z')
    const solid = forgettingRisk(last, later, 1.0, 30)
    const shaky = forgettingRisk(last, later, 0.0, 30)
    expect(shaky).toBeGreaterThan(solid)
  })

  it('ranks per-concept risks highest-first in the profile against the injected clock', () => {
    const events = [
      probe(true),                                                        // entropy: minute 1
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 's2', occurredAt: new Date('2026-07-15T10:00:00Z') }),
    ]
    const si = profileFrom(events) // NOW = 15 days after entropy, 1 day after beats
    expect(si.forgettingRisks[0].conceptId).toBe('phys.therm.entropy')
    expect(si.forgettingRisks[0].risk).toBeGreaterThan(si.forgettingRisks[1].risk)
  })
})

// ── Determinism ──────────────────────────────────────────────────────────────

describe('deterministic profile generation', () => {
  it('same lessons + same clock → byte-identical profile; shuffled input too', () => {
    const events = [
      confProbe(false, 'high'), mc('entropy is disorder', { misconceptionId: 'MC-D' }),
      recovery('im_stuck'), confProbe(true, 'low'),
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 's2' }),
    ]
    const a = profileFrom(events)
    const b = profileFrom(events)
    const c = buildStudentIntelligence('u1', readLessonEvidence({ events: [...events].reverse() }), { now: NOW })
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
    expect(JSON.stringify(a)).toBe(JSON.stringify(c))
    expect(a.asOf).toEqual(NOW)
  })

  it('a different clock changes ONLY time-derived fields (forgetting risk), proving the clock is the sole impurity', () => {
    const events = [probe(true), probe(false)]
    const early = profileFrom(events, {}, new Date('2026-07-01T11:00:00Z'))
    const late = profileFrom(events, {}, new Date('2026-12-01T00:00:00Z'))
    expect(late.forgettingRisks[0].risk).toBeGreaterThan(early.forgettingRisks[0]?.risk ?? 0)
    // Non-temporal dimensions identical:
    expect(JSON.stringify(early.probePerformance)).toBe(JSON.stringify(late.probePerformance))
    expect(JSON.stringify(early.misconceptionHistory)).toBe(JSON.stringify(late.misconceptionHistory))
    expect(JSON.stringify(early.confidence)).toBe(JSON.stringify(late.confidence))
  })

  it('produces a well-formed empty profile for a learner with no evidence', () => {
    const si = buildStudentIntelligence('u-new', [], { now: NOW })
    expect(si.evidenceBase).toEqual({ lessons: 0, probeOutcomes: 0, concepts: 0 })
    expect(si.masteredConcepts).toEqual([])
    expect(si.activeMisconceptions).toEqual([])
    expect(si.confidence.direction).toBe('insufficient_evidence')
    expect(si.velocity.lessonsObserved).toBe(0)
    expect(si.engagement.lastActiveAt).toBeNull()
    expect(si.cognitiveLoad.observations).toBe(0)
  })
})
