/**
 * STAGE PROGRESSION OWNERSHIP AUDIT — one competing owner found and removed.
 *
 * ConversationState.phase is the canonical owner of lesson stage. The Teaching
 * Sequence Executor kept a SECOND stage pointer (contextSnapshot
 * .teachingStepIndex) advanced from contextSnapshot.lastSignal by
 * advanceTeachingStepIndex(). Two machines, different evidence, provably
 * disagreeing:
 *
 *   same turn, same evidence (a WRONG answer)
 *     canonical  phase GUIDE -> DEMONSTRATE   (phaseDown: re-show)
 *     executor   step  DISCOVERY -> TEACHING  (advance)
 *
 *   and the executor pointer is TERMINAL at ASSESSMENT
 *     advanceTeachingStepIndex(2, correct|wrong|confusion) -> 2
 *
 * so once a concept reached ASSESSMENT the executor rendered its ASSESSMENT
 * contract on every later turn of that concept — and that contract declares
 * itself "the ONLY thing the LLM is allowed to render".
 *
 * The step is now DERIVED from the canonical phase. The executor still selects
 * authored content; it is no longer a stage machine.
 *
 * This file audits stage ownership only. Lesson identity, transition,
 * completion, visualization, misconception, first-lesson and teaching-memory
 * ownership have their own suites and are not retested here.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  teachingStepIndexForPhase, advanceTeachingStepIndex, TEACHING_STEPS,
} from '@/lib/teaching/teachingSequenceExecutor'
import {
  PHASE_ORDER, isDeliveryPhase, advanceConversationState, initialConversationState,
  type TeachingPhase,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('the divergence that was fixed (negative control on the old advancer)', () => {
  it('the old advancer moved UP on a wrong answer while the phase moves DOWN', () => {
    const cs = {
      ...initialConversationState(),
      conceptId: 'c', phase: 'GUIDE' as const, demonstrated: true, taughtThisSession: true,
    }
    const after = advanceConversationState(cs, {
      askedQuestion: false, signalCorrect: false, recoveryFired: false,
    } as never)
    // canonical: demote
    expect(after.phase).toBe('DEMONSTRATE')
    // the retired independent advancer: promote — opposite direction
    expect(advanceTeachingStepIndex(0, { correctness: false })).toBe(1)
    // the derived step follows the canonical phase instead
    expect(TEACHING_STEPS[teachingStepIndexForPhase(after.phase)]).toBe('TEACHING')
    expect(teachingStepIndexForPhase(cs.phase)).toBe(teachingStepIndexForPhase(after.phase))
  })

  it('the old advancer was terminal at ASSESSMENT — the derived step is not', () => {
    expect(advanceTeachingStepIndex(2, { correctness: true })).toBe(2)
    expect(advanceTeachingStepIndex(2, { correctness: false })).toBe(2)
    expect(advanceTeachingStepIndex(2, { confusion: true })).toBe(2)
    // Derived: a demotion out of the gates returns to teaching.
    expect(teachingStepIndexForPhase('CHECK')).toBe(2)
    expect(teachingStepIndexForPhase('GUIDE')).toBe(1)
  })
})

describe('the step is derived from the canonical phase', () => {
  it('every phase in the ladder maps to a real step', () => {
    for (const phase of PHASE_ORDER) {
      const i = teachingStepIndexForPhase(phase)
      expect(TEACHING_STEPS[i], phase).toBeDefined()
      expect(i).toBeGreaterThanOrEqual(0)
      expect(i).toBeLessThan(TEACHING_STEPS.length)
    }
  })

  it('the split mirrors isDeliveryPhase — delivery teaches, gates assess', () => {
    for (const phase of PHASE_ORDER) {
      const assessing = teachingStepIndexForPhase(phase) === 2
      expect(assessing, phase).toBe(!isDeliveryPhase(phase))
    }
  })

  it('OBSERVE opens with DISCOVERY', () => {
    expect(TEACHING_STEPS[teachingStepIndexForPhase('OBSERVE')]).toBe('DISCOVERY')
  })

  it('is monotonic across the canonical ladder — never moves backwards', () => {
    let prev = -1
    for (const phase of PHASE_ORDER) {
      const i = teachingStepIndexForPhase(phase)
      expect(i, phase).toBeGreaterThanOrEqual(prev)
      prev = i
    }
  })

  it('is total — unknown or missing phase opens at DISCOVERY, never throws', () => {
    expect(teachingStepIndexForPhase(null)).toBe(0)
    expect(teachingStepIndexForPhase(undefined)).toBe(0)
    expect(teachingStepIndexForPhase('NOT_A_PHASE' as TeachingPhase)).toBe(0)
  })

  it('is pure — same phase, same step', () => {
    for (let i = 0; i < 3; i++) expect(teachingStepIndexForPhase('PRACTICE')).toBe(2)
  })
})

describe('the runtime no longer runs a second stage machine', () => {
  it('the route derives the step from the phase', () => {
    expect(ROUTE).toContain('teachingStepIndexForPhase(canonicalPhase)')
  })

  it('the route no longer advances an independent pointer', () => {
    // Ignore comment lines — the retired call is named in the explanatory
    // comment at the fix site, which is deliberate.
    const calls = ROUTE.split('\n')
      .filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*'))
      .filter((l) => l.includes('advanceTeachingStepIndex('))
    expect(calls).toEqual([])
    // …and it is no longer even imported by the route.
    expect(ROUTE).not.toMatch(/hasTeachingPlan, readTeachingStepIndex, advanceTeachingStepIndex/)
  })

  it('the phase is read from the canonical state, keyed on the same concept', () => {
    expect(ROUTE).toMatch(/readConversationState\(\s*\n?\s*rawSnapshot\?\.conversationState, activeConceptIdForDecide,?\s*\n?\s*\)\.phase/)
  })

  it('readTeachingStepIndex is kept only for the first-turn-of-concept test', () => {
    expect(ROUTE).toContain('const { isFirstTurnOfConcept } =')
    expect(ROUTE).not.toContain('const { stepIndex: priorStepIndex, isFirstTurnOfConcept }')
  })

  it('a fresh concept still opens at DISCOVERY', () => {
    expect(ROUTE).toMatch(/isFirstTurnOfConcept\s*\n?\s*\? 0/)
  })
})
