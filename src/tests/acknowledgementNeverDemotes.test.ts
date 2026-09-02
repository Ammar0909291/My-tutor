/**
 * SAYING "I UNDERSTAND" MUST NOT MOVE THE LEARNER BACKWARDS.
 *
 * ── THE DEFECT, MEASURED LIVE ───────────────────────────────────────────────
 * phys.mech.friction, 2026-09-01, disposable account, deployed app. At CHECK,
 * with an AUTHORED keyed probe on screen, the learner typed
 * "ok i think i understand" — an acknowledgement, not an answer:
 *
 *   [gate-assessment] { probeFound: true, converted: true,
 *                       assetId: '27a4749c-d745-4c95-af24-b72150e94690' }
 *   [mcq-grade] { asked: 'A 10 kg box sits on a rough floor (μ_s = 0.4)…',
 *                 chosen: null, correct: null }
 *   [ladder] { signalTag: true, correctness: false, ack: true,
 *              phaseBefore: 'CHECK', phaseAfter: 'GUIDE' }
 *
 * The server had NO grade — `chosen: null`, because nothing was answered. The
 * MODEL self-reported the learner incorrect, the fold took its `failed`
 * branch, and the learner was DEMOTED for saying they understood.
 *
 * ── HOW IT WAS REACHED, HONESTLY ────────────────────────────────────────────
 * This became reachable BECAUSE of the acknowledgement fix one commit earlier.
 * Before it, the same script never left OBSERVE, so a CHECK-phase demotion
 * could not occur. Widening the ladder did not create the bug; it exposed it.
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * Two predicates for one idea. The signal-null guard in route.ts — whose own
 * comment says it "keeps acknowledgements out of the phase ladder, mastery
 * evidence, TopicProgress, and misconception records in one place" — read
 * `isBareAcknowledgement` (exact ACK_PHRASES match), while the ladder's
 * acknowledgement branch reads `isLowSignalAcknowledgement`. The gap between
 * the two widths is where the demotion lived.
 *
 * `shouldSuppressSignalCorrectness` cannot cover it: its first line returns
 * `suppress: false` whenever a structured MCQ is pending — precisely this case,
 * pending AND unanswered. Section C pins that, so the two guards are not
 * confused for one another again.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  isLowSignalAcknowledgement, initialConversationState, advanceConversationState,
  type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { shouldSuppressSignalCorrectness } from '@/lib/teaching/answerableTurn'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'

const SRC = (rel: string) => readFileSync(join(process.cwd(), 'src', rel), 'utf8')

/** The fold as the route drives it, with the guard applied. */
function turn(
  state: ConversationState, message: string, modelClaimedCorrectness: boolean | null,
): ConversationState {
  // The guard: an acknowledgement discards the model's unverified claim.
  const signalCorrect = isLowSignalAcknowledgement(message) ? null : modelClaimedCorrectness
  return advanceConversationState(state, {
    askedQuestion: true,
    signalCorrect,
    recoveryFired: false,
    acknowledgement: isLowSignalAcknowledgement(message),
  } as Parameters<typeof advanceConversationState>[1])
}

const at = (phase: TeachingPhase): ConversationState => ({
  ...initialConversationState('phys.mech.friction'), phase, demonstrated: true,
})

// ═══════════════════════════════════════════════════════════════════════════
// A. THE VERBATIM TURN
// ═══════════════════════════════════════════════════════════════════════════
describe('A. the live turn that demoted a learner', () => {
  it('"ok i think i understand" at CHECK no longer drops to GUIDE', () => {
    // The model claimed `correctness: false` on a turn the server never graded.
    const next = turn(at('CHECK'), 'ok i think i understand', false)
    expect(next.phase).toBe('CHECK')
  })

  it('and it buys no mastery either — it is not evidence', () => {
    const next = turn(at('CHECK'), 'ok i think i understand', false)
    expect(next.correctAtCheck).toBe(0)
    expect(next.correctAtPractice).toBe(0)
  })

  it('the same holds at PRACTICE and TRANSFER', () => {
    for (const phase of ['PRACTICE', 'TRANSFER'] as const) {
      const next = turn(at(phase), 'ok i think i understand', false)
      expect(next.phase, phase).toBe(phase)
    }
  })

  it('a hundred of them never demote and never advance a gate', () => {
    let s = at('CHECK')
    for (let i = 0; i < 100; i++) s = turn(s, 'yeah that makes sense', false)
    expect(s.phase).toBe('CHECK')
    expect(s.correctAtCheck).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// B. A REAL WRONG ANSWER STILL DEMOTES — the protection is not a blanket
// ═══════════════════════════════════════════════════════════════════════════
describe('B. genuine failure evidence is untouched', () => {
  it('a wrong answer at CHECK still moves the learner down', () => {
    const next = turn(at('CHECK'), 'the friction force equals the weight', false)
    expect(next.phase).not.toBe('CHECK')
  })

  it('a correct answer at CHECK still credits the gate', () => {
    const next = turn(at('CHECK'), 'the maximum static friction is 20 N', true)
    expect(next.correctAtCheck).toBe(1)
  })

  it('a wrong answer that merely OPENS politely still demotes', () => {
    // "ok" prefix + real content: content breaks the acknowledgement match,
    // so the claim survives and the learner is graded on it.
    expect(isLowSignalAcknowledgement('ok the friction force equals the weight')).toBe(false)
    const next = turn(at('CHECK'), 'ok the friction force equals the weight', false)
    expect(next.phase).not.toBe('CHECK')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. WHY THE EXISTING GUARD COULD NOT COVER THIS
// ═══════════════════════════════════════════════════════════════════════════
describe('C. the two guards are different guards', () => {
  it('shouldSuppressSignalCorrectness passes the claim through when an MCQ is pending', () => {
    // Its first line. This is correct for its own purpose and is why a second
    // guard is needed — not a bug in it.
    expect(shouldSuppressSignalCorrectness({
      priorAssistantText: 'A 10 kg box sits on a rough floor. What is the maximum static friction?',
      hasPendingStructuredMcq: true,
    })).toEqual({ suppress: false, reason: null })
  })

  it('the narrow predicate genuinely misses the live message', () => {
    // The whole gap, in one assertion pair.
    expect(isBareAcknowledgement('ok i think i understand')).toBe(false)
    expect(isLowSignalAcknowledgement('ok i think i understand')).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// D. THE WIRING — the route must read the ladder's predicate, not the narrow one
// ═══════════════════════════════════════════════════════════════════════════
describe('D. the route uses one definition', () => {
  it('the signal-null guard reads isLowSignalAcknowledgement', () => {
    const route = SRC('app/api/learn/chat/route.ts')
    const idx = route.indexOf('if (teachingSignal) {')
    expect(idx).toBeGreaterThan(-1)
    const block = route.slice(idx, idx + 3000)
    // The ack-null guard reads the LADDER predicate and nulls the whole signal.
    // (Now a braced block — its sibling, the learner-question guard, was added
    // as an `else if` at the same seam; the predicate read is what matters.)
    expect(block).toMatch(/if \(isLowSignalAcknowledgement\(message\)\) \{\s*\n?\s*teachingSignal = null/)
    // And specifically NOT the narrow one, which is what let the claim through.
    expect(block).not.toMatch(/isBareAcknowledgement\(message\)\) \{?\s*\n?\s*teachingSignal = null/)
  })
})
