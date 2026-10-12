/**
 * A learner's own questions and requests do not spend the concept's teaching
 * budget (2026-09-28, physics unit-1 certification). Measured on
 * phys.mech.normal-force: a learner who asked "why does that matter?", asked
 * for a diagram and asked one off-topic question was closed "on pause — not
 * mastered" on turn 12 after answering correctly twice and missing once.
 * Termination stays structural via ABSOLUTE_TURN_CEILING.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { advanceConversationState, initialConversationState, type TurnEvidence } from '@/lib/teaching/conversationState'
import { TURN_BUDGET_IN_FORCE, ABSOLUTE_TURN_CEILING, evaluateConceptBudget } from '@/lib/teaching/conceptBudget'
import { isLearnerInitiatedTurn } from '@/lib/teaching/learnerEngagement'

const ev = (over: Partial<TurnEvidence> = {}): TurnEvidence =>
  ({ askedQuestion: false, signalCorrect: null, recoveryFired: false, ...over })

describe('budget accounting', () => {
  it('a learner-initiated turn counts toward the total, not the teaching budget', () => {
    let s = initialConversationState('c1')
    s = advanceConversationState(s, ev())
    s = advanceConversationState(s, ev({ learnerInitiated: true }))
    expect(s.turnsOnConcept).toBe(1)
    expect(s.turnsTotalOnConcept).toBe(2)
  })

  it('the measured shape — 12 turns with 4 learner questions — is no longer exhausted', () => {
    let s = initialConversationState('c1')
    for (let i = 0; i < 12; i++) s = advanceConversationState(s, ev({ learnerInitiated: i % 3 === 1 }))
    expect(s.turnsOnConcept).toBe(12 - 4)
    expect(evaluateConceptBudget(s).status).not.toBe('exhausted')
  })

  it('without learner questions the base budget still closes the concept exactly as before', () => {
    let s = initialConversationState('c1')
    for (let i = 0; i < TURN_BUDGET_IN_FORCE; i++) s = advanceConversationState(s, ev())
    expect(evaluateConceptBudget(s)).toMatchObject({ status: 'exhausted', reason: 'turns' })
  })

  it('termination is still guaranteed: endless questions hit the absolute ceiling', () => {
    let s = initialConversationState('c1')
    for (let i = 0; i < ABSOLUTE_TURN_CEILING; i++) s = advanceConversationState(s, ev({ learnerInitiated: true }))
    expect(s.turnsOnConcept).toBe(0)
    expect(evaluateConceptBudget(s)).toMatchObject({ status: 'exhausted', reason: 'turns' })
  })

  it('a degraded turn counts toward neither', () => {
    const s = advanceConversationState(initialConversationState('c1'), ev({ degradedTurn: true, learnerInitiated: true }))
    expect(s.turnsOnConcept).toBe(0)
    expect(s.turnsTotalOnConcept ?? 0).toBe(0)
  })
})

describe('what counts as learner-initiated', () => {
  it.each([
    'why does that matter?',
    'can you show me a diagram?',
    'A stiff spring and a soft spring feel the same 10 N force. Which stretches more?',
    'explain it differently please',
  ])('yes: %s', (m) => expect(isLearnerInitiatedTurn(m, { answeredPendingQuestion: false })).toBe(true))

  it.each([
    'ok, continue', 'got it', 'quiz me', 'give me a practice question',
    'I think N = mg — the normal force always equals the weight',
  ])('no: %s', (m) => expect(isLearnerInitiatedTurn(m, { answeredPendingQuestion: false })).toBe(false))

  it('an answer to the pending quiz is never learner-initiated, even phrased as a question', () => {
    expect(isLearnerInitiatedTurn('is it 78 N?', { answeredPendingQuestion: true })).toBe(false)
  })
})

describe('route wiring', () => {
  it('both ladder folds pass the flag', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route.match(/learnerInitiated: \(await import\('@\/lib\/teaching\/learnerEngagement'\)\)/g)?.length).toBe(2)
  })
})
