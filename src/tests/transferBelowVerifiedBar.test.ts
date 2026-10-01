/**
 * TRANSFER BELOW THE VERIFIED BAR (owner-approved, 2026-09-24).
 *
 * Synthetic-student after-run 2 (production, phys.mech.velocity, off-track
 * student) reached TRANSFER with verified CHECK 1 / PRACTICE 1: the plain
 * counters, which also accept correctness that no server key graded, had
 * carried the ladder past PRACTICE. TRANSFER moved no counter and the gate
 * attached no authored question there, so the lesson could never certify.
 *
 * Now, at TRANSFER below the bar only: the gate keeps attaching authored
 * questions, and a SERVER-GRADED right answer tops up the lowest unmet
 * verified counter — never past the bar, never past its plain counterpart.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  initialConversationState, advanceConversationState, transferBelowVerifiedBar,
  VERIFIED_CHECK_BAR, VERIFIED_PRACTICE_BAR, type ConversationState,
} from '@/lib/teaching/conversationState'
import { MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED, masteryVerifiedStrict, conceptMasteryVerdict } from '@/lib/teaching/masteryGate'

const serverGradedRight = { askedQuestion: true, signalCorrect: true, deliveredTeaching: true, serverGraded: true }
const selfReportedRight = { askedQuestion: true, signalCorrect: true, deliveredTeaching: true, serverGraded: false }

/** The measured production state: TRANSFER, plain 1/2, verified 1/1. */
function stuckAtTransfer(over: Partial<ConversationState> = {}): ConversationState {
  return {
    ...initialConversationState('phys.mech.velocity'),
    phase: 'TRANSFER', demonstrated: true, sawModernGrading: true,
    correctAtCheck: 1, correctAtPractice: 2,
    verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 1,
    ...over,
  } as ConversationState
}

describe('the bar is the mastery gate\'s bar', () => {
  it('mirrored constants equal masteryGate\'s', () => {
    expect(VERIFIED_CHECK_BAR).toBe(MASTERY_CHECK_REQUIRED)
    expect(VERIFIED_PRACTICE_BAR).toBe(MASTERY_PRACTICE_REQUIRED)
  })
  it('transferBelowVerifiedBar: only TRANSFER, only below the bar', () => {
    expect(transferBelowVerifiedBar(stuckAtTransfer())).toBe(true)
    expect(transferBelowVerifiedBar(stuckAtTransfer({ verifiedCorrectAtPractice: 2 }))).toBe(false)
    expect(transferBelowVerifiedBar(stuckAtTransfer({ verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 2 }))).toBe(true)
    expect(transferBelowVerifiedBar(stuckAtTransfer({ phase: 'PRACTICE' }))).toBe(false)
    expect(transferBelowVerifiedBar(null)).toBe(false)
  })
})

describe('the ladder at TRANSFER', () => {
  it('the measured state: one server-graded right answer certifies the lesson', () => {
    const before = stuckAtTransfer()
    expect(conceptMasteryVerdict(before)).toBe(false)
    const after = advanceConversationState(before, serverGradedRight)
    expect(after.verifiedCorrectAtPractice).toBe(2)
    expect(after.phase).toBe('TRANSFER')
    expect(masteryVerifiedStrict(after)).toBe(true)
    expect(conceptMasteryVerdict(after)).toBe(true)
  })
  it('a missing verified CHECK is filled first', () => {
    const after = advanceConversationState(stuckAtTransfer({ verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 1 }), serverGradedRight)
    expect(after.verifiedCorrectAtCheck).toBe(1)
    expect(after.verifiedCorrectAtPractice).toBe(1)
  })
  it('self-reported correctness still credits nothing', () => {
    const after = advanceConversationState(stuckAtTransfer(), selfReportedRight)
    expect(after.verifiedCorrectAtPractice).toBe(1)
    expect(conceptMasteryVerdict(after)).toBe(false)
  })
  it('at the bar nothing moves (no inflation past the bar)', () => {
    const atBar = stuckAtTransfer({ verifiedCorrectAtPractice: 2 })
    const after = advanceConversationState(atBar, serverGradedRight)
    expect(after.verifiedCorrectAtCheck).toBe(1)
    expect(after.verifiedCorrectAtPractice).toBe(2)
  })
  it('verified never exceeds plain', () => {
    const odd = stuckAtTransfer({ correctAtPractice: 1, verifiedCorrectAtPractice: 1 })
    const after = advanceConversationState(odd, serverGradedRight)
    expect(after.verifiedCorrectAtPractice).toBeLessThanOrEqual(after.correctAtPractice)
  })
  it('plain counters and the phase are unchanged at TRANSFER (as before)', () => {
    const before = stuckAtTransfer()
    const after = advanceConversationState(before, serverGradedRight)
    expect(after.correctAtCheck).toBe(before.correctAtCheck)
    expect(after.correctAtPractice).toBe(before.correctAtPractice)
  })
})

describe('the gate at TRANSFER below the bar', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('reads the helper once, from the pre-turn state', () => {
    expect(route).toMatch(/const transferNeedsVerifiedCredit = transferBelowVerifiedBar\(conversationStateHoisted\)/)
  })
  it('phaseAllowsProbe, probeAttachablePhase and probeWouldCountThisPhase all include it', () => {
    expect(route).toMatch(/\(phaseBeforeTurn === 'OBSERVE' && evidenceMoveHoisted === 'ask'\) \|\|\s*transferNeedsVerifiedCredit\s*\n\s*phaseAllowsProbeHoisted = phaseAllowsProbe/)
    expect(route).toMatch(/probeAttachablePhase:[\s\S]{0,260}\|\|\s*transferNeedsVerifiedCredit,/)
    expect(route).toMatch(/probeWouldCountThisPhaseHoisted = isProbeAttachablePhase\(phaseBeforeTurn\) \|\| transferNeedsVerifiedCredit/)
  })
})
