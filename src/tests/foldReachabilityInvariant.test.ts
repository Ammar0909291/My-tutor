/**
 * DoD #13 — adversarial proving: the fold PREVENTS the unreachable mastery
 * shapes, it does not merely happen not to produce them.
 *
 * Slice 1 (the mastery single-owner) rests on a reachability claim: through the
 * real fold, `correctAtPractice` cannot move before `correctAtCheck >= 1`, and
 * TRANSFER cannot be reached before `correctAtPractice >= 2`. That claim is why
 * the raw states `{check:0, practice:2}` and `{phase:'TRANSFER', practice:0}` —
 * which several fixtures used to assert as "mastered" — are UNREACHABLE, and why
 * routing the record/payload through the strict verdict changes no real lesson.
 *
 * masteryLadderReachable.test.ts proves the ladder CAN climb (the positive path).
 * This proves it cannot climb OUT OF ORDER (the negative invariant), by trying
 * adversarially to break it and asserting the fold refuses. If a future edit to
 * `advanceConversationState` let PRACTICE accrue before CHECK, slice 1's premise
 * would silently become false — this test fails first.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'

const correct = () =>
  ({ askedQuestion: true, signalCorrect: true, recoveryFired: false }) as
    Parameters<typeof advanceConversationState>[1]

/** Every state the fold passes through while a perfect learner answers N times. */
function trajectory(steps: number): ConversationState[] {
  const out: ConversationState[] = []
  let s = initialConversationState('phys.mech.friction')
  // Two receipts to clear the delivery phases (OBSERVE→DEMONSTRATE→…) the way a
  // real lesson opens, then graded-correct answers.
  s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true } as never)
  s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true } as never)
  for (let i = 0; i < steps; i++) { s = advanceConversationState(s, correct()); out.push(s) }
  return out
}

describe('the fold enforces ladder ORDER — practice cannot precede check', () => {
  it('at EVERY reachable state, correctAtPractice >= 1 implies correctAtCheck >= 1', () => {
    // Adversarial: pump graded-correct answers and watch every intermediate
    // state. There must be no state where practice moved but check did not.
    for (const s of trajectory(12)) {
      if ((s.correctAtPractice ?? 0) >= 1) {
        expect(s.correctAtCheck, JSON.stringify({
          phase: s.phase, check: s.correctAtCheck, practice: s.correctAtPractice,
        })).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('TRANSFER is never reached with fewer than 2 practice credits', () => {
    for (const s of trajectory(12)) {
      if (s.phase === 'TRANSFER') {
        expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
        expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('the first practice credit only appears AFTER a check credit exists', () => {
    const t = trajectory(12)
    const firstPractice = t.findIndex((s) => (s.correctAtPractice ?? 0) >= 1)
    const firstCheck = t.findIndex((s) => (s.correctAtCheck ?? 0) >= 1)
    expect(firstCheck).toBeGreaterThanOrEqual(0)
    expect(firstPractice).toBeGreaterThan(firstCheck)
  })
})

describe('the unreachable raw states really are unreachable', () => {
  // These are the exact shapes fixtures used to assert as "mastered" before the
  // reachability correction. No fold trajectory produces them.
  it('no reachable state has practice>=2 with check=0', () => {
    const bad = trajectory(20).find(
      (s) => (s.correctAtPractice ?? 0) >= 2 && (s.correctAtCheck ?? 0) === 0,
    )
    expect(bad).toBeUndefined()
  })

  it('no reachable state is TRANSFER with zero graded evidence', () => {
    const bad = trajectory(20).find(
      (s) => s.phase === 'TRANSFER' && (s.correctAtCheck ?? 0) === 0 && (s.correctAtPractice ?? 0) === 0,
    )
    expect(bad).toBeUndefined()
  })
})

describe('neither acknowledgements nor wrong answers can climb the assessed rungs', () => {
  it('acknowledgements never move check or practice', () => {
    let s = initialConversationState('phys.mech.friction')
    for (let i = 0; i < 20; i++) {
      s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true } as never)
    }
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('a wrong answer never increments an assessed counter', () => {
    let s = initialConversationState('phys.mech.friction')
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true } as never)
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true } as never)
    const before = { c: s.correctAtCheck, p: s.correctAtPractice }
    for (let i = 0; i < 6; i++) {
      s = advanceConversationState(s, { askedQuestion: true, signalCorrect: false, recoveryFired: false } as never)
    }
    expect(s.correctAtCheck).toBe(before.c)
    expect(s.correctAtPractice).toBe(before.p)
  })
})
