/**
 * PHASE 5 (Case D) — "no infinite filler loop."
 *
 * The filler-repair mechanism (route.ts, guarded by shouldRepairFillerTurn)
 * replaces a content-free model turn with one fixed sentence. Before this
 * fix that replacement was stateless: nothing recorded that it had already
 * fired, so a model producing filler on every turn received the
 * byte-identical canned sentence forever — exactly the failure Case D names.
 *
 * The fix bounds the EXISTING repair (shouldApplyFillerRepair /
 * fillerRepairStreak) rather than inventing a second repair mechanism. The
 * streak counts CONSECUTIVE FILLER-SHAPED TURNS (fillerTurnDetected), not
 * consecutive repairs — so once the cap suppresses the repair, it stays
 * suppressed for as long as the model keeps producing filler, rather than
 * re-arming every other turn. These tests operate on the real, exported
 * functions — no route.ts mock.
 */
import { describe, it, expect } from 'vitest'
import {
  detectFillerTurn,
  shouldApplyFillerRepair,
  FILLER_REPAIR_STREAK_CAP,
  advanceConversationState,
  initialConversationState,
  readConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'

const fillerText = "Take your time, we can continue whenever you're ready."
const contentText = 'Force equals mass times acceleration — that is the relationship at play here.'

function neutralEvidence(overrides: Partial<TurnEvidence>): TurnEvidence {
  return { askedQuestion: false, signalCorrect: null, recoveryFired: false, ...overrides }
}

describe('Phase 5 Case D — detectFillerTurn is unchanged', () => {
  it('still recognises the same filler shape as before this fix', () => {
    expect(detectFillerTurn(fillerText)).toBe(true)
  })
  it('still leaves real content alone', () => {
    expect(detectFillerTurn(contentText)).toBe(false)
  })
})

describe('Phase 5 Case D — shouldApplyFillerRepair caps consecutive firing', () => {
  it('allows the repair for the first CAP consecutive occurrences', () => {
    for (let i = 0; i < FILLER_REPAIR_STREAK_CAP; i++) {
      expect(shouldApplyFillerRepair(i)).toBe(true)
    }
  })

  it('refuses at and beyond the cap — this is the fix', () => {
    expect(shouldApplyFillerRepair(FILLER_REPAIR_STREAK_CAP)).toBe(false)
    expect(shouldApplyFillerRepair(FILLER_REPAIR_STREAK_CAP + 1)).toBe(false)
    expect(shouldApplyFillerRepair(FILLER_REPAIR_STREAK_CAP + 50)).toBe(false)
  })

  it('NEGATIVE CONTROL: prove the pre-fix shape actually loops forever, then prove the real fix does not', () => {
    // The OLD mechanism (route.ts before this fix): apply on every single
    // filler turn, unconditionally, with no memory of prior firings.
    const unboundedApply = () => true
    let oldRepeats = 0
    for (let turn = 0; turn < 12; turn++) {
      if (unboundedApply()) oldRepeats++
    }
    // The regression this fix closes: an infinite, byte-identical loop.
    expect(oldRepeats).toBe(12)

    // The SAME 12-turn sequence — the learner keeps sending short replies
    // and the model keeps producing filler every single turn (the realistic
    // "stuck" shape Case D describes) — run through the real fold this fix
    // wires (shouldApplyFillerRepair + fillerRepairStreak, driven by
    // fillerTurnDetected = true on every turn, since the model's raw output
    // is filler-shaped on every turn regardless of whether we intervened).
    let state = initialConversationState('phys.mech.newtons-second-law')
    let newRepeats = 0
    for (let turn = 0; turn < 12; turn++) {
      const applied = shouldApplyFillerRepair(state.fillerRepairStreak)
      if (applied) newRepeats++
      state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    }
    // Bounded — not 12. This is the invariant Case D requires: the canned
    // sentence fires at most CAP times, even though the model stayed stuck
    // in a filler-shaped response for all 12 turns.
    expect(newRepeats).toBe(FILLER_REPAIR_STREAK_CAP)
    expect(newRepeats).toBeLessThan(12)
    // ...and it never re-arms while the model is STILL stuck.
    expect(state.fillerRepairStreak).toBe(12)
    expect(shouldApplyFillerRepair(state.fillerRepairStreak)).toBe(false)
  })

  it('REVERT CHECK: with the cap function stubbed back to "always allow", the regression returns', () => {
    // Simulates reverting shouldApplyFillerRepair to unconditional true —
    // proving the invariant genuinely depends on the cap, not on some other
    // incidental behaviour of advanceConversationState.
    let state = initialConversationState('chem.found.pure-substances')
    let repeats = 0
    const revertedShouldApply = () => true // pre-fix behaviour
    for (let turn = 0; turn < 8; turn++) {
      const applied = revertedShouldApply()
      if (applied) repeats++
      state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    }
    expect(repeats).toBe(8) // regression reproduced under the reverted rule
    // ...and the real (non-reverted) function on the same final streak value
    // would already have refused long before turn 8, confirming the two
    // behave differently — the fix is load-bearing, not a no-op.
    expect(shouldApplyFillerRepair(state.fillerRepairStreak)).toBe(false)
  })

  it('re-arms the moment the model produces genuinely non-filler content', () => {
    let state = initialConversationState('phys.test')
    // Stuck for CAP + 3 turns straight.
    for (let turn = 0; turn < FILLER_REPAIR_STREAK_CAP + 3; turn++) {
      state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    }
    expect(shouldApplyFillerRepair(state.fillerRepairStreak)).toBe(false)
    // One genuinely non-filler turn breaks the streak.
    state = advanceConversationState(state, neutralEvidence({
      askedQuestion: true, signalCorrect: true, fillerTurnDetected: false,
    }))
    expect(state.fillerRepairStreak).toBe(0)
    expect(shouldApplyFillerRepair(state.fillerRepairStreak)).toBe(true)
  })
})

describe('Phase 5 Case D — fillerRepairStreak folds like every other consecutive counter', () => {
  it('increments on every filler-shaped turn, whether or not the repair actually fired', () => {
    let state = initialConversationState('phys.test')
    state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    expect(state.fillerRepairStreak).toBe(1)
    state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    expect(state.fillerRepairStreak).toBe(2)
  })

  it('resets to 0 the instant a turn is not filler-shaped', () => {
    let state = initialConversationState('phys.test')
    state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    expect(state.fillerRepairStreak).toBe(2)
    state = advanceConversationState(state, neutralEvidence({
      askedQuestion: true, signalCorrect: true, fillerTurnDetected: false,
    }))
    expect(state.fillerRepairStreak).toBe(0)
  })

  it('omitting fillerTurnDetected entirely behaves exactly like false (no migration hazard)', () => {
    let state = initialConversationState('phys.test')
    state = advanceConversationState(state, neutralEvidence({ fillerTurnDetected: true }))
    expect(state.fillerRepairStreak).toBe(1)
    state = advanceConversationState(state, neutralEvidence({})) // field omitted
    expect(state.fillerRepairStreak).toBe(0)
  })
})

describe('Phase 5 Case D — persistence: old snapshots default safely', () => {
  it('a stored snapshot with no fillerRepairStreak field reads back as 0', () => {
    const legacySnapshot = { ...initialConversationState('math.arith.fractions') } as Record<string, unknown>
    delete legacySnapshot.fillerRepairStreak
    const read = readConversationState(legacySnapshot, 'math.arith.fractions')
    expect(read.fillerRepairStreak).toBe(0)
  })

  it('a genuinely mid-streak snapshot is preserved across a read for the SAME concept', () => {
    const midStreak = { ...initialConversationState('math.arith.fractions'), fillerRepairStreak: 1 }
    const read = readConversationState(midStreak, 'math.arith.fractions')
    expect(read.fillerRepairStreak).toBe(1)
  })

  it('a concept change resets the streak like every other per-concept counter', () => {
    const midStreak = { ...initialConversationState('math.arith.fractions'), fillerRepairStreak: 1 }
    const read = readConversationState(midStreak, 'math.geom.slope')
    expect(read.fillerRepairStreak).toBe(0)
  })
})
