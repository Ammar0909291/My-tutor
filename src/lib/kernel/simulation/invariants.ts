/**
 * K6 — the invariant battery (RS §14, the subset marked "simulation").
 *
 * These are the release-blocking properties a simulated episode must never
 * violate. Each is checked against the DECISION the kernel produced and the
 * ladder state it produced it from — never against rendered text, because the
 * simulator uses a stub driver and rendered text is K5's jurisdiction.
 *
 * Nothing here restates a rule. Every check reads the same owner the runtime
 * reads: PHASE_MAX_QUESTION_STAGE for ceilings, questionLegality for
 * answerable-source, the policy artifact for budgets. A violation therefore
 * means the OWNER disagreed with itself under a state the fixtures never
 * reached — which is the only kind of finding a simulator is entitled to
 * produce.
 */
import type { PolicyDecision } from '../types'
import type { ConversationState } from '@/lib/teaching/conversationState'
import { PHASE_MAX_QUESTION_STAGE, type TeachingPhase } from '@/lib/teaching/conversationState'
import { questionLegality } from '@/lib/teaching/questionLegality'

export interface EpisodeTurn {
  turnIndex: number
  stateBefore: ConversationState
  decision: PolicyDecision
  recoveryActive: boolean
  /** What the persona said this turn. Synthetic by construction — no learner
   *  text ever reaches the simulator. Carried so a replay transcript is
   *  readable; a replay that shows decisions without the utterance that
   *  provoked them cannot be reasoned about (C6). */
  message?: string
}

export interface InvariantViolation {
  /** RS invariant id, or the Band-2 rule id for legality checks. */
  code: string
  turnIndex: number
  detail: string
}

type Check = (t: EpisodeTurn, prev: EpisodeTurn | undefined) => InvariantViolation | null

/** I-1 — no question above the effective stage ceiling. */
const i1: Check = (t) => {
  const ceiling = PHASE_MAX_QUESTION_STAGE[t.stateBefore.phase as TeachingPhase]
  return t.decision.stageCeiling > ceiling
    ? { code: 'I-1', turnIndex: t.turnIndex,
        detail: `stageCeiling ${t.decision.stageCeiling} > phase ceiling ${ceiling} at ${t.stateBefore.phase}` }
    : null
}

/** I-7 — at most one question per turn. */
const i7a: Check = (t) =>
  t.decision.budgets.maxQuestions > 1
    ? { code: 'I-7', turnIndex: t.turnIndex, detail: `maxQuestions=${t.decision.budgets.maxQuestions}` }
    : null

/** I-7 — never more than two consecutive ASK turns. */
const i7b: Check = (t, prev) => {
  if (t.decision.move !== 'ASK' || prev?.decision.move !== 'ASK') return null
  // Two in a row is legal; the state machine must have given by the third.
  return t.stateBefore.questionsAskedSinceTeach >= 2
    ? { code: 'I-7', turnIndex: t.turnIndex, detail: 'third consecutive ASK' }
    : null
}

/** I-11 — during recovery: no questions. */
const i11: Check = (t) =>
  t.recoveryActive && (t.decision.move === 'ASK' || t.decision.budgets.maxQuestions > 0)
    ? { code: 'I-11', turnIndex: t.turnIndex, detail: `move=${t.decision.move} during recovery` }
    : null

/** RECOVER must carry a zero question budget whatever the ladder wanted. */
const recoverBudget: Check = (t) =>
  t.decision.move === 'RECOVER' && t.decision.budgets.maxQuestions !== 0
    ? { code: 'I-11', turnIndex: t.turnIndex, detail: 'RECOVER with a non-zero question budget' }
    : null

/** QL-1 — a question is never asked with no source to answer from. This is
 *  the invariant the Henry's Law transcript violated seven times. */
const ql1: Check = (t) => {
  if (t.decision.move !== 'ASK') return null
  const verdict = questionLegality(t.stateBefore, {})
  return verdict.askLegal
    ? null
    : { code: verdict.reason ?? 'QL', turnIndex: t.turnIndex,
        detail: `ASK emitted while Band 2 says illegal (${verdict.reason})` }
}

/** I-12 — a failure never drops the ladder by more than one phase. */
const i12: Check = (t, prev) => {
  if (!prev) return null
  const order = Object.keys(PHASE_MAX_QUESTION_STAGE)
  const before = order.indexOf(prev.stateBefore.phase)
  const after = order.indexOf(t.stateBefore.phase)
  if (before < 0 || after < 0) return null
  return before - after > 1
    ? { code: 'I-12', turnIndex: t.turnIndex, detail: `${prev.stateBefore.phase} → ${t.stateBefore.phase}` }
    : null
}

/** Every turn must produce a decision — silence is a decision, absence is a bug. */
const totality: Check = (t) =>
  t.decision.move === null && !t.recoveryActive
    ? { code: 'I-19', turnIndex: t.turnIndex, detail: 'no move decided and no interrupt' }
    : null

export const CHECKS: readonly Check[] = [i1, i7a, i7b, i11, recoverBudget, ql1, i12, totality]

/** Run the battery over a complete episode. Pure. */
export function checkEpisode(turns: readonly EpisodeTurn[]): InvariantViolation[] {
  const out: InvariantViolation[] = []
  turns.forEach((t, idx) => {
    const prev = idx > 0 ? turns[idx - 1] : undefined
    for (const check of CHECKS) {
      const v = check(t, prev)
      if (v) out.push(v)
    }
  })
  return out
}
