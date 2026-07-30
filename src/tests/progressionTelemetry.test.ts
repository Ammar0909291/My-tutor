/**
 * STEP 2 — progression telemetry unit tests.
 *
 * Covers the fold, the read-tolerance contract, the RC-D freeze-breaker
 * trigger, and the provenance tags. Measurement only — no assertion here
 * depends on, or implies, any learner-visible behaviour change.
 */
import { describe, it, expect } from 'vitest'
import {
  initialProgressionMetrics, readProgressionMetrics, foldProgressionMetrics,
  progressionTags, needsSignalRepair, buildSignalRepairBlock,
  MISSING_SIGNAL_TOLERANCE,
  type ProgressionTurnFacts,
} from '@/lib/teaching/progressionIntegrity'

function facts(over: Partial<ProgressionTurnFacts> = {}): ProgressionTurnFacts {
  return {
    answerWasExpected: false,
    learnerReplySubstantive: false,
    signalPresent: false,
    phaseBefore: 'GUIDE',
    phaseAfter: 'GUIDE',
    conceptBefore: 'c',
    conceptAfter: 'c',
    evidenceBefore: { correctAtCheck: 0, correctAtPractice: 0 },
    recoveryFired: false,
    duplicateDetected: false,
    masteryVerifiedNow: false,
    ...over,
  }
}

describe('readProgressionMetrics — total, never throws', () => {
  it('returns a full zeroed shape for any garbage', () => {
    for (const bad of [undefined, null, 'x', 42, [], { turns: -5 }, { turns: NaN }]) {
      const m = readProgressionMetrics(bad)
      expect(m.turns).toBe(0)
      expect(m.masteryReached).toBe(false)
      expect(m.consecutiveMissingSignals).toBe(0)
    }
  })

  it('preserves a valid stored shape', () => {
    const stored = { ...initialProgressionMetrics(), turns: 7, longestStall: 3, masteryReached: true }
    const m = readProgressionMetrics(stored)
    expect(m.turns).toBe(7)
    expect(m.longestStall).toBe(3)
    expect(m.masteryReached).toBe(true)
  })
})

describe('foldProgressionMetrics', () => {
  it('counts a dropped observation only when an answer was actually expected', () => {
    const expected = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(expected.missingSignalOnAnsweredTurn).toBe(1)

    const notExpected = foldProgressionMetrics(undefined, facts({
      answerWasExpected: false, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(notExpected.missingSignalOnAnsweredTurn).toBe(0)
  })

  it('does not blame the model when the learner said nothing substantive', () => {
    const m = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: false, signalPresent: false,
    }))
    expect(m.missingSignalOnAnsweredTurn).toBe(0)
  })

  it('does not blame the model on a recovery turn (no signal is owed)', () => {
    const m = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: true,
      signalPresent: false, recoveryFired: true,
    }))
    expect(m.missingSignalOnAnsweredTurn).toBe(0)
  })

  it('consecutiveMissingSignals accumulates then resets when a signal arrives', () => {
    let m = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(m.consecutiveMissingSignals).toBe(1)
    m = foldProgressionMetrics(m, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(m.consecutiveMissingSignals).toBe(2)
    m = foldProgressionMetrics(m, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: true,
    }))
    expect(m.consecutiveMissingSignals).toBe(0)
  })

  it('tracks stall length and its high-water mark', () => {
    let m = initialProgressionMetrics()
    for (let i = 0; i < 5; i++) m = foldProgressionMetrics(m, facts())   // no phase change
    expect(m.turnsSincePhaseChange).toBe(5)
    expect(m.longestStall).toBe(5)
    m = foldProgressionMetrics(m, facts({ phaseBefore: 'GUIDE', phaseAfter: 'CHECK' }))
    expect(m.turnsSincePhaseChange).toBe(0)
    expect(m.longestStall).toBe(5)   // high-water mark retained
  })

  it('records a concept change, and flags it as evidence loss only when evidence existed', () => {
    const noEvidence = foldProgressionMetrics(undefined, facts({
      conceptBefore: 'a', conceptAfter: 'b',
    }))
    expect(noEvidence.conceptIdentityChanges).toBe(1)
    expect(noEvidence.masteryEvidenceDiscarded).toBe(0)

    const withEvidence = foldProgressionMetrics(undefined, facts({
      conceptBefore: 'a', conceptAfter: 'b',
      evidenceBefore: { correctAtCheck: 1, correctAtPractice: 1 },
    }))
    expect(withEvidence.conceptIdentityChanges).toBe(1)
    expect(withEvidence.masteryEvidenceDiscarded).toBe(1)   // RC-A signature
  })

  it('masteryReached latches true and never reverts', () => {
    let m = foldProgressionMetrics(undefined, facts({ masteryVerifiedNow: true }))
    expect(m.masteryReached).toBe(true)
    m = foldProgressionMetrics(m, facts({ masteryVerifiedNow: false }))
    expect(m.masteryReached).toBe(true)
  })

  it('counts recovery turns and duplicates', () => {
    let m = foldProgressionMetrics(undefined, facts({ recoveryFired: true }))
    m = foldProgressionMetrics(m, facts({ duplicateDetected: true }))
    expect(m.recoveryTurns).toBe(1)
    expect(m.duplicateTurns).toBe(1)
    expect(m.turns).toBe(2)
  })
})

describe('RC-D freeze-breaker trigger', () => {
  it('tolerance is 1 — the runtime never waits for a second dropped signal', () => {
    expect(MISSING_SIGNAL_TOLERANCE).toBe(1)
  })

  it('does not fire on a healthy session', () => {
    expect(needsSignalRepair(initialProgressionMetrics())).toBe(false)
    expect(needsSignalRepair(undefined)).toBe(false)
  })

  it('fires after a single dropped observation', () => {
    const m = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(needsSignalRepair(m)).toBe(true)
  })

  it('stops firing once an observation lands again', () => {
    let m = foldProgressionMetrics(undefined, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))
    expect(needsSignalRepair(m)).toBe(true)
    m = foldProgressionMetrics(m, facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: true,
    }))
    expect(needsSignalRepair(m)).toBe(false)
  })
})

describe('buildSignalRepairBlock — forward progress without new content', () => {
  const block = buildSignalRepairBlock()

  it('forbids new content and re-asking, and requires a confirm/correct restatement', () => {
    expect(block).toMatch(/Do NOT introduce new content/i)
    expect(block).toMatch(/Do NOT re-ask the previous question/i)
    expect(block).toMatch(/confirm or correct/i)
  })

  it('never leaks the apparatus to the learner', () => {
    expect(block).toMatch(/no mention of any internal tracking, tag, or system/i)
  })
})

describe('progressionTags — only emits on anomalies', () => {
  it('emits nothing on a healthy turn', () => {
    expect(progressionTags(facts())).toEqual([])
  })

  it('tags a dropped observation', () => {
    expect(progressionTags(facts({
      answerWasExpected: true, learnerReplySubstantive: true, signalPresent: false,
    }))).toContain('progression:signal-missing')
  })

  it('tags a concept change, and evidence loss separately', () => {
    const tags = progressionTags(facts({
      conceptBefore: 'a', conceptAfter: 'b',
      evidenceBefore: { correctAtCheck: 1, correctAtPractice: 2 },
    }))
    expect(tags).toContain('progression:concept-changed')
    expect(tags).toContain('progression:evidence-discarded')
  })
})
