/**
 * Durable Learner State, third design — Batch 0, pure module.
 *
 * Pins `computeConceptMasteryRecord` against the invariant its own header
 * claims: `verified` is never reimplemented (it must always equal
 * `masteryVerifiedStrict`'s own answer for the same state), and
 * `masteryScore` can never claim more than the gate itself has certified.
 */
import { describe, it, expect } from 'vitest'
import { computeConceptMasteryRecord } from '@/lib/teaching/conceptMasteryRecord'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'

const NOW = new Date('2026-09-16T00:00:00.000Z')

function stateWith(overrides: Partial<ConversationState>): ConversationState {
  return { ...initialConversationState('phys.mech.friction'), ...overrides }
}

describe('computeConceptMasteryRecord', () => {
  it('null state — unverified, zero score, never throws', () => {
    const r = computeConceptMasteryRecord(null, 'phys.mech.friction', NOW)
    expect(r).toEqual({
      conceptId: 'phys.mech.friction',
      verified: false,
      masteryScore: 0,
      computedAt: NOW.toISOString(),
    })
  })

  it('verified is NEVER reimplemented — it always agrees with masteryVerifiedStrict', () => {
    const cases: Partial<ConversationState>[] = [
      {},
      { verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2 },
      { verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 1 },
      { verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2, signalContradictions: 1 },
      { correctAtCheck: 5, correctAtPractice: 5 }, // plain counters, no verified ones
    ]
    for (const overrides of cases) {
      const state = stateWith(overrides)
      const r = computeConceptMasteryRecord(state, 'phys.mech.friction', NOW)
      expect(r.verified).toBe(masteryVerifiedStrict(state))
    }
  })

  it('fully verified -> masteryScore is exactly 1', () => {
    const state = stateWith({ verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2 })
    const r = computeConceptMasteryRecord(state, 'c1', NOW)
    expect(r.verified).toBe(true)
    expect(r.masteryScore).toBe(1)
  })

  it('zero verified evidence -> masteryScore is exactly 0', () => {
    const r = computeConceptMasteryRecord(stateWith({}), 'c1', NOW)
    expect(r.masteryScore).toBe(0)
  })

  it('partial verified evidence never overstates what the gate has certified', () => {
    // One verified check, one of two verified practice answers: below the
    // gate (needs 2 practice), so verified must be false and the score
    // must sit strictly below 1.
    const state = stateWith({ verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 1 })
    const r = computeConceptMasteryRecord(state, 'c1', NOW)
    expect(r.verified).toBe(false)
    expect(r.masteryScore).toBeGreaterThan(0)
    expect(r.masteryScore).toBeLessThan(1)
  })

  it('score never reaches 1 while unverified, even with surplus practice evidence', () => {
    // Surplus practice (3 > required 2) but zero verified check evidence --
    // masteryVerifiedStrict requires BOTH, so this must stay unverified and
    // the score must still be capped below 1.
    const state = stateWith({ verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 3 })
    const r = computeConceptMasteryRecord(state, 'c1', NOW)
    expect(r.verified).toBe(false)
    expect(r.masteryScore).toBeLessThan(1)
  })

  it('is a pure function -- same inputs, same output, no mutation', () => {
    const state = stateWith({ verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 1 })
    const frozen = JSON.parse(JSON.stringify(state))
    const a = computeConceptMasteryRecord(state, 'c1', NOW)
    const b = computeConceptMasteryRecord(state, 'c1', NOW)
    expect(a).toEqual(b)
    expect(state).toEqual(frozen)
  })

  it('the plain-counter divergence class cannot leak through this module', () => {
    // The exact shape masteryCounterDisplayDivergence.test.ts records: a
    // MODERN session (sawModernGrading true, so the legacy fallback that
    // would otherwise certify on plain counters does not apply) with plain
    // counters satisfied but verified counters at zero. `verified` here
    // must read false, matching the strict gate, never the plain one --
    // and NOT the "genuine legacy row" result a raw fixture without
    // sawModernGrading would legitimately produce (see the sibling case
    // right above this one for that correct-but-different shape).
    const state = stateWith({
      correctAtCheck: 1, correctAtPractice: 2,
      verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 0,
      sawModernGrading: true,
    })
    expect(masteryVerifiedStrict(state)).toBe(false) // confirms this IS the divergence shape
    const r = computeConceptMasteryRecord(state, 'c1', NOW)
    expect(r.verified).toBe(false)
    expect(r.masteryScore).toBe(0) // verified counters are zero, so score is zero too
  })
})
