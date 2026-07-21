/**
 * Spine signals tests (ADR 13 Phase 2 follow-up): joins DecisionRecorded
 * spine rows onto LessonEvidence by shared turnId, closing the
 * "worked example used" gap left by the initial Evidence Reader. Pure core,
 * no DB — same convention as evidenceLoop.test.ts.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readLessonEvidence, type EvidenceEventRow } from '@/lib/teaching/evidence/evidenceReader'
import {
  mapTurnsToLessons, computeLessonSpineSignals, attachSpineSignals,
  computeWorkedExampleEffectiveness, type SpineDecisionRow,
} from '@/lib/teaching/evidence/spineSignals'

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
    conceptId: 'phys.mech.newtons-first-law',
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
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false`,
    strength: passed ? 1 : 0,
    rawScore: 12,
    ...over,
  })

function decision(over: Partial<SpineDecisionRow> = {}): SpineDecisionRow {
  return { turnId: null, workedExampleFirst: false, provenance: [], ...over }
}

describe('mapTurnsToLessons', () => {
  it('maps each turnId to its (userId, sessionId, conceptId) lesson key', () => {
    const events = [probe(true, { turnId: 't1' }), probe(false, { turnId: 't2', conceptId: 'phys.mech.momentum' })]
    const map = mapTurnsToLessons(events)
    expect(map.get('t1')).toBe('u1 s1 phys.mech.newtons-first-law')
    expect(map.get('t2')).toBe('u1 s1 phys.mech.momentum')
  })

  it('skips events with no turnId', () => {
    const map = mapTurnsToLessons([probe(true, { turnId: null })])
    expect(map.size).toBe(0)
  })
})

describe('computeLessonSpineSignals', () => {
  it('marks workedExampleUsed true when any decision in the lesson had it', () => {
    const turnToLesson = new Map([['t1', 'u1 s1 phys.mech.newtons-first-law']])
    const signals = computeLessonSpineSignals([decision({ turnId: 't1', workedExampleFirst: true })], turnToLesson)
    expect(signals.get('u1 s1 phys.mech.newtons-first-law')).toEqual({ workedExampleUsed: true, decisionProvenance: [] })
  })

  it('dedupes provenance tags across multiple decisions in one lesson, preserving first-seen order', () => {
    const turnToLesson = new Map([['t1', 'L'], ['t2', 'L']])
    const signals = computeLessonSpineSignals(
      [
        decision({ turnId: 't1', provenance: ['recovery:frozen', 'autonomy'] }),
        decision({ turnId: 't2', provenance: ['autonomy', 'first-lesson'] }),
      ],
      turnToLesson,
    )
    expect(signals.get('L')!.decisionProvenance).toEqual(['recovery:frozen', 'autonomy', 'first-lesson'])
  })

  it('ignores decisions whose turnId has no known lesson', () => {
    const signals = computeLessonSpineSignals([decision({ turnId: 'orphan', workedExampleFirst: true })], new Map())
    expect(signals.size).toBe(0)
  })
})

describe('attachSpineSignals', () => {
  it('enriches a LessonEvidence with its matching signal', () => {
    const events = [probe(true, { turnId: 't1' })]
    const lessons = readLessonEvidence({ events })
    const turnToLesson = mapTurnsToLessons(events)
    const signals = computeLessonSpineSignals([decision({ turnId: 't1', workedExampleFirst: true, provenance: ['turn-directive'] })], turnToLesson)
    const enriched = attachSpineSignals(lessons, signals)
    expect(enriched).toHaveLength(1)
    expect(enriched[0].workedExampleUsed).toBe(true)
    expect(enriched[0].decisionProvenance).toEqual(['turn-directive'])
    // Original LessonEvidence fields survive untouched (structural superset).
    expect(enriched[0].conceptId).toBe('phys.mech.newtons-first-law')
    expect(enriched[0].probes).toHaveLength(1)
  })

  it('defaults to workedExampleUsed=false for a lesson with no spine signal at all', () => {
    const events = [probe(true, { turnId: 't1' })]
    const lessons = readLessonEvidence({ events })
    const enriched = attachSpineSignals(lessons, new Map())
    expect(enriched[0].workedExampleUsed).toBe(false)
    expect(enriched[0].decisionProvenance).toEqual([])
  })

  it('does not mutate the input LessonEvidence array', () => {
    const events = [probe(true, { turnId: 't1' })]
    const lessons = readLessonEvidence({ events })
    const before = JSON.stringify(lessons)
    attachSpineSignals(lessons, new Map([['u1 s1 phys.mech.newtons-first-law', { workedExampleUsed: true, decisionProvenance: ['x'] }]]))
    expect(JSON.stringify(lessons)).toBe(before)
  })
})

describe('computeWorkedExampleEffectiveness', () => {
  it('splits first-probe pass rate by whether a worked example was used', () => {
    const eventsA = [probe(true, { turnId: 'a1', userId: 'u1', sessionId: 's1' })]
    const eventsB = [probe(false, { turnId: 'b1', userId: 'u2', sessionId: 's2' })]
    const eventsC = [probe(true, { turnId: 'c1', userId: 'u3', sessionId: 's3' })]
    const allEvents = [...eventsA, ...eventsB, ...eventsC]
    const lessons = readLessonEvidence({ events: allEvents })
    const turnToLesson = mapTurnsToLessons(allEvents)
    const signals = computeLessonSpineSignals(
      [
        decision({ turnId: 'a1', workedExampleFirst: true }), // WE=true, passed
        decision({ turnId: 'b1', workedExampleFirst: true }), // WE=true, failed
        decision({ turnId: 'c1', workedExampleFirst: false }), // WE=false, passed
      ],
      turnToLesson,
    )
    const enriched = attachSpineSignals(lessons, signals)
    const eff = computeWorkedExampleEffectiveness(enriched)
    expect(eff.withWorkedExample).toEqual({ successes: 1, failures: 1, total: 2, rate: 0.5 })
    expect(eff.withoutWorkedExample).toEqual({ successes: 1, failures: 0, total: 1, rate: 1 })
  })

  it('ignores lessons with no probes at all', () => {
    const events = [ev({ category: 'MISCONCEPTION_DETECTED', outcome: 'x', turnId: 't1' })]
    const lessons = readLessonEvidence({ events })
    const enriched = attachSpineSignals(lessons, new Map())
    const eff = computeWorkedExampleEffectiveness(enriched)
    expect(eff.withWorkedExample.total).toBe(0)
    expect(eff.withoutWorkedExample.total).toBe(0)
  })

  it('returns rate=0 for an empty bucket rather than NaN', () => {
    const events = [probe(true, { turnId: 't1' })]
    const lessons = readLessonEvidence({ events })
    const enriched = attachSpineSignals(lessons, new Map()) // workedExampleUsed=false for all
    const eff = computeWorkedExampleEffectiveness(enriched)
    expect(eff.withWorkedExample).toEqual({ successes: 0, failures: 0, total: 0, rate: 0 })
  })
})
