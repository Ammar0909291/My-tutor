/**
 * AnswerObserved v2 — PROBE PROVENANCE (servedAssetId + serverGraded).
 *
 * WHY THIS EXISTS, measured. chem.bio.vitamins failed certification three times
 * with D4-not-verified. The persisted conversation state proved the cause was
 * `verifiedCorrectAtPractice` (1) falling short of `correctAtPractice` (2) —
 * one credit was awarded on the model's self-report rather than a server grade.
 * It was NOT possible to say WHICH probe produced that credit, because
 * AnswerObserved recorded {correct, conceptId, confusion, diagnostic,
 * capabilityRefs, statedConfidence} and nothing about the probe or the grading
 * authority. This adds exactly those two facts and nothing else.
 *
 * OBSERVABILITY ONLY. No selection, mastery, phase, grading or credit rule is
 * touched — the tests below pin that as an invariant, not as an intention.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

import { buildTurnEvents, type TurnFacts } from '@/lib/evidence-spine/turnEmitter'
import { CURRENT_SCHEMA_VERSION, type AnswerObservedV1 } from '@/lib/evidence-spine/types'
import { foldEvent, initialStudentView } from '@/lib/evidence-spine/fold'

const BASE: TurnFacts = {
  learnerId: 'u1', sessionId: 's1', turnId: 't1',
  messageLength: 12, latencyFromPrevTurnMs: 1000,
  assistantLength: 80, assistantAskedQuestion: true, provider: 'llm',
  signal: { correctness: true, confidence: 'high' },
  resolvedConceptId: 'chem.bio.vitamins',
  recoveryKey: null, recoveryEscalationRung: 0, sessionFailureCount: 0,
  autonomyRequested: false,
  decisionMove: 'ask', decisionPhaseBefore: 'PRACTICE', decisionPhaseAfter: 'PRACTICE',
  workedExampleFirst: false, stageCeiling: null, provenance: [],
  freshSessionBoundary: false, boundaryGapMs: null, lessonCompleted: false,
}

const answerOf = (f: TurnFacts) =>
  buildTurnEvents(f).find((e) => e.type === 'AnswerObserved')?.payload as AnswerObservedV1 | undefined

describe('AnswerObserved v2 — the two new fields are emitted', () => {
  it('records the answered probe and that the server graded it', () => {
    const p = answerOf({ ...BASE, answeredProbeAssetId: '17fcd6a9', answerServerGraded: true })
    expect(p).toBeDefined()
    expect(p!.servedAssetId).toBe('17fcd6a9')
    expect(p!.serverGraded).toBe(true)
  })

  it('records a model-invented question as a NULL identity, not as absent', () => {
    // The distinction that matters: "answered something with no authored
    // identity" is a finding, and must not look like "we forgot to record it".
    const p = answerOf({ ...BASE, answeredProbeAssetId: null, answerServerGraded: false })
    expect(p!.servedAssetId).toBeNull()
    expect(p!.serverGraded).toBe(false)
  })

  it('carries the credit-bearing combination the mastery fold keys on', () => {
    // correct + serverGraded is the only shape that increments a VERIFIED
    // counter; correct WITHOUT serverGraded is the shape that silently did not.
    const verified = answerOf({ ...BASE, answeredProbeAssetId: 'a1', answerServerGraded: true })
    const unverified = answerOf({ ...BASE, answeredProbeAssetId: 'a1', answerServerGraded: false })
    expect([verified!.correct, verified!.serverGraded]).toEqual([true, true])
    expect([unverified!.correct, unverified!.serverGraded]).toEqual([true, false])
  })
})

describe('backward compatibility — nothing existing changes', () => {
  it('a caller supplying neither field emits a payload IDENTICAL to v1', () => {
    // Structural, not by eyeball: the key set must be exactly the v1 key set.
    const p = answerOf(BASE)!
    expect(Object.keys(p).sort()).toEqual(
      ['capabilityRefs', 'conceptId', 'confusion', 'correct', 'diagnostic', 'statedConfidence'].sort(),
    )
    expect('servedAssetId' in p).toBe(false)
    expect('serverGraded' in p).toBe(false)
  })

  it('the v1 payload shape still folds, and folds identically to v2', () => {
    const v1: AnswerObservedV1 = {
      correct: true, statedConfidence: 'high', confusion: false,
      conceptId: 'c', capabilityRefs: [], diagnostic: false,
    }
    const v2: AnswerObservedV1 = { ...v1, servedAssetId: 'a1', serverGraded: true }
    const ev = (payload: AnswerObservedV1, schemaVersion: number) => ({
      eventId: 'e', seq: 1, learnerId: 'u1', sessionId: 's1', turnId: 't1',
      type: 'AnswerObserved', schemaVersion, payload,
    })
    const a = foldEvent(initialStudentView('u1'), ev(v1, 1) as never)
    const b = foldEvent(initialStudentView('u1'), ev(v2, 2) as never)
    expect(a.answers).toEqual(b.answers)
    expect(a.answers.correct).toBe(1)
  })

  it('historical v1 events remain decodable — no backfill required', () => {
    expect(CURRENT_SCHEMA_VERSION.AnswerObserved).toBe(2)
    // fold.ts admits any version >= 1 and <= current, so 1 stays readable.
    expect(1).toBeLessThanOrEqual(CURRENT_SCHEMA_VERSION.AnswerObserved)
  })

  it('no OTHER event type changed version', () => {
    expect(CURRENT_SCHEMA_VERSION.StudentMessageReceived).toBe(1)
    expect(CURRENT_SCHEMA_VERSION.AssistantRendered).toBe(1)
    expect(CURRENT_SCHEMA_VERSION.DecisionRecorded).toBe(2) // already v2 before this change
    expect(CURRENT_SCHEMA_VERSION.CapabilityObserved).toBe(1)
  })

  it('the rest of the turn\'s events are untouched by the new fields', () => {
    const without = buildTurnEvents(BASE)
    const with_ = buildTurnEvents({ ...BASE, answeredProbeAssetId: 'a1', answerServerGraded: true })
    expect(with_.map((e) => e.type)).toEqual(without.map((e) => e.type))
    const nonAnswer = (evs: typeof without) => evs.filter((e) => e.type !== 'AnswerObserved')
    expect(nonAnswer(with_)).toEqual(nonAnswer(without))
  })

  it('a turn with no signal still emits no AnswerObserved', () => {
    expect(answerOf({ ...BASE, signal: null, answeredProbeAssetId: 'a1', answerServerGraded: true }))
      .toBeUndefined()
  })
})

describe('route wiring — the recorded provenance cannot drift from the counter', () => {
  const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('passes the probe being ANSWERED, not the one served next', () => {
    expect(src).toMatch(/answeredProbeAssetId:\s*pendingMcqHoisted\?\.assetId\s*\?\?\s*null/)
  })

  it('passes the SAME flag the mastery fold reads as evidence.serverGraded', () => {
    expect(src).toMatch(/answerServerGraded:\s*gradedAgainstServerKeyHoisted/)
    // The fold's own source of truth, unchanged by this work.
    const cs = readFileSync('src/lib/teaching/conversationState.ts', 'utf-8')
    expect(cs).toMatch(/const verified = evidence\.serverGraded === true/)
  })

  it('pendingMcqHoisted is assigned exactly once, so it still names the answered probe', () => {
    // If a future edit reassigns it before emit, servedAssetId would silently
    // start naming the NEXT probe. This is the guard for that.
    const assignments = [...src.matchAll(/pendingMcqHoisted\s*=(?!=)/g)]
    expect(assignments.length).toBe(1)
  })
})
