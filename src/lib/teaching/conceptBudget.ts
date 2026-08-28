/**
 * Concept teaching budget + question purpose (P6).
 *
 * Root cause of the open-ended feel: nothing bounded how long a concept could
 * run. The phase ladder (conversationState.ts) decides WHERE the learner is
 * and moves forward on success, but a learner who never quite succeeds has no
 * exit — remediationCount and explanationCount were recorded but never
 * consulted as a limit, so explain/question/explain could continue
 * indefinitely. That is the trap this module closes.
 *
 * Everything here is a PURE FUNCTION OVER ConversationState. No new state, no
 * new persistence, no second progress tracker: the budget is derived from
 * counters the engine already maintains (turnsOnConcept, explanationCount,
 * remediationCount, consecutiveFailures) plus the mastery evidence the server
 * already owns (correctAtCheck / correctAtPractice). Mastery therefore stays
 * server-controlled — this module reads the verdict, it never computes one and
 * the client is never consulted.
 */

import type { ConversationState, TeachingPhase } from './conversationState'

/**
 * The teaching budget for one concept, expressed as the flow it is meant to
 * afford: introduction, explanation, example, MCQ, one recovery explanation,
 * one recovery MCQ, then move on. Deliberately generous enough to absorb
 * clarifying exchanges, but finite.
 */
export const CONCEPT_TURN_BUDGET = 12

/** How many distinct teaching attempts (initial + recoveries) a concept gets
 *  before it is marked for review rather than retried again. */
export const MAX_TEACHING_ATTEMPTS = 3

/**
 * A ONE-TIME extension for a learner who is demonstrably converting.
 *
 * WHY (measured 2026-08-16, real account). `turnsOnConcept` counts EVERY
 * non-degraded turn — teaching, learner questions, confusion, recovery — not
 * just assessed ones. The mastery ladder needs five server-graded correct
 * answers plus a teaching give; when the tutor does not volunteer each question
 * the learner spends a turn asking for it, so the assessment sequence alone
 * consumed ~11 of the 12 turns in live runs. A weak, question-asking learner —
 * the learner this product exists for — therefore burns the budget faster than
 * a silent one. Observed directly: `chem.found.states-of-matter` closed as
 * `needsReview` with `conceptsMastered: []` on the very turn the learner
 * answered correctly and advanced GUIDE → CHECK.
 *
 * The extension buys TURNS and never certification: mastery remains
 * `hasDemonstratedMastery` (correctAtPractice >= 2 or phase TRANSFER), still
 * from server-graded evidence. Raising the base budget instead was rejected —
 * it would hand 18 turns to a learner who is failing, which is worse for them
 * and more expensive.
 */
export const BUDGET_EXTENSION_TURNS = 6

/**
 * Is this learner converting rather than stalling? Evaluated only at the moment
 * the base budget is spent. All three must hold:
 *
 *   1. at least one server-graded correct answer at an ASSESSED rung —
 *      `correctAtCheck`/`correctAtPractice` move only inside CHECK/PRACTICE, so
 *      this cannot be satisfied by chat, acknowledgement or a diagnostic exit;
 *   2. the learner is not currently failing;
 *   3. the ladder is past the diagnostic rungs.
 *
 * Grantable at most once (`budgetExtensionGranted`), so the worst case is a
 * hard stop at CONCEPT_TURN_BUDGET + BUDGET_EXTENSION_TURNS. Termination is
 * structural — there is no path that grants twice, hence no loop.
 */
export function qualifiesForBudgetExtension(state: ConversationState): boolean {
  if (state.budgetExtensionGranted) return false
  if ((state.turnsOnConcept ?? 0) < CONCEPT_TURN_BUDGET) return false
  // Already finished: there is nothing to extend, and granting here would put a
  // spurious flag on a concept that closed by mastery.
  if (hasDemonstratedMastery(state)) return false
  if ((state.correctAtCheck ?? 0) + (state.correctAtPractice ?? 0) < 1) return false
  if ((state.consecutiveFailures ?? 0) !== 0) return false
  return state.phase === 'CHECK' || state.phase === 'PRACTICE' || state.phase === 'TRANSFER'
}

/** The turn allowance in force for this concept, base plus any granted
 *  extension. The ONLY place the extension changes behaviour. */
export function effectiveTurnBudget(state: ConversationState): number {
  return CONCEPT_TURN_BUDGET + (state.budgetExtensionGranted ? BUDGET_EXTENSION_TURNS : 0)
}

/** Consecutive failures after which continuing is more costly than moving on. */
export const MAX_CONSECUTIVE_FAILURES = 3

export type BudgetStatus = 'ok' | 'final_attempt' | 'exhausted'

export interface ConceptBudget {
  status: BudgetStatus
  turnsUsed: number
  turnsRemaining: number
  attemptsUsed: number
  /** Why the budget ended. Null while status is 'ok'. */
  reason: 'turns' | 'attempts' | 'failures' | null
  /** True when the concept must be recorded for future review instead of
   *  being certified — the never-trap-the-learner exit. */
  markForReview: boolean
}

/**
 * Has the server's own mastery evidence already been satisfied? Reuses the
 * same counters masteryGate reads, so budget and mastery cannot disagree
 * about whether a concept is done.
 */
export function hasDemonstratedMastery(state: ConversationState): boolean {
  return state.correctAtPractice >= 2 || state.phase === 'TRANSFER'
}

/**
 * Has the learner ever produced a single correct answer at an ASSESSED rung?
 *
 * `correctAtCheck`/`correctAtPractice` move ONLY inside CHECK/PRACTICE, on a
 * server-graded answer — never on chat, acknowledgement or a diagnostic exit.
 * A learner with both at zero has therefore never once demonstrated the
 * concept under assessment: whatever else happened, the teaching has not yet
 * landed for them.
 */
function neverDemonstratedAnything(state: ConversationState): boolean {
  return (state.correctAtCheck ?? 0) === 0 && (state.correctAtPractice ?? 0) === 0
}

export function evaluateConceptBudget(state: ConversationState): ConceptBudget {
  const turnsUsed = state.turnsOnConcept ?? 0
  // An attempt is the initial teaching pass plus each remediation.
  const attemptsUsed = 1 + (state.remediationCount ?? 0)
  const turnsRemaining = Math.max(0, effectiveTurnBudget(state) - turnsUsed)

  const base = { turnsUsed, turnsRemaining, attemptsUsed }

  // A concept the learner has actually mastered is never "exhausted" — it is
  // finished. Checking this first is what stops a slow-but-successful learner
  // from being marked for review on the turn they succeed.
  if (hasDemonstratedMastery(state)) {
    return { ...base, status: 'ok', reason: null, markForReview: false }
  }

  // THE `turns` BACKSTOP IS ABSOLUTE — it fires even for an unassessed
  // learner, so termination is always guaranteed and no loop can form. This
  // is deliberately checked BEFORE the confusion guard below.
  if (turnsUsed >= effectiveTurnBudget(state)) {
    return { ...base, status: 'exhausted', reason: 'turns', markForReview: true }
  }

  // ── NEVER ABANDON A LEARNER WHO HAS ONLY ASKED FOR HELP ──────────────────
  //
  // Measured live (phys.mech.collisions-inelastic, real account, 2026-08-28):
  // a learner who said "I do not understand" / "explain differently" three
  // times — and had never once been given, let alone failed, a graded
  // question — drove `consecutiveFailures` to MAX_CONSECUTIVE_FAILURES. The
  // budget read `exhausted:failures`, the concept was folded as needsReview,
  // the lesson finalised, and every later turn (including one where the
  // learner reasoned correctly) served "on pause — you haven't mastered it."
  // That is the exact P0 the brief names: "I don't understand" must trigger
  // REMEDIATION, not abandonment/completion.
  //
  // `attempts` and `failures` are both meant to end a concept the learner is
  // FAILING UNDER ASSESSMENT — a bad fit for a learner who has simply not been
  // assessed yet. While the learner has produced zero correct assessed answers
  // AND turns remain, those two early exits are SUPPRESSED, so remediation
  // keeps going (the engine already escalates to a different representation on
  // each "explain differently" / recovery turn). The moment the learner lands
  // even one correct assessed answer, `neverDemonstratedAnything` is false and
  // the normal budget resumes — a learner who got one right and then fails
  // repeatedly can still be moved to review. Termination is unaffected: the
  // `turns` backstop above already fired if it was going to.
  const stillFindingTheirFooting = neverDemonstratedAnything(state)

  if (attemptsUsed > MAX_TEACHING_ATTEMPTS && !stillFindingTheirFooting) {
    return { ...base, status: 'exhausted', reason: 'attempts', markForReview: true }
  }
  if ((state.consecutiveFailures ?? 0) >= MAX_CONSECUTIVE_FAILURES && !stillFindingTheirFooting) {
    return { ...base, status: 'exhausted', reason: 'failures', markForReview: true }
  }

  // One turn of warning before the hard stop, so the tutor can close the
  // concept deliberately rather than being cut off mid-explanation.
  if (turnsRemaining <= 2 || attemptsUsed === MAX_TEACHING_ATTEMPTS) {
    return { ...base, status: 'final_attempt', reason: null, markForReview: false }
  }

  return { ...base, status: 'ok', reason: null, markForReview: false }
}

// ── Question purpose ─────────────────────────────────────────────────────────

/**
 * Every question must belong to a purpose (P6 requirement 8). The purpose is
 * DERIVED from the phase ladder and the live misconception/failure state
 * rather than chosen by the model, so "why am I asking this" is always
 * answerable and never invented after the fact.
 */
export type QuestionPurpose =
  | 'diagnostic'
  | 'understanding_check'
  | 'misconception_repair'
  | 'mastery_verification'
  | 'transfer'

const PURPOSE_BY_PHASE: Record<TeachingPhase, QuestionPurpose> = {
  OBSERVE: 'diagnostic',
  DEMONSTRATE: 'understanding_check',
  GUIDE: 'understanding_check',
  CHECK: 'understanding_check',
  PRACTICE: 'mastery_verification',
  TRANSFER: 'transfer',
}

export function questionPurpose(state: ConversationState): QuestionPurpose {
  // An active misconception outranks the ladder: repairing it IS the reason
  // for the next question, wherever the learner happens to be.
  if (state.misconceptionDetectedThisLesson && (state.consecutiveFailures ?? 0) > 0) {
    return 'misconception_repair'
  }
  return PURPOSE_BY_PHASE[state.phase] ?? 'understanding_check'
}

const PURPOSE_DESCRIPTION: Record<QuestionPurpose, string> = {
  diagnostic: 'find out what they already know — do not grade it, and do not teach before hearing the answer',
  understanding_check: 'check the idea you just taught actually landed',
  misconception_repair: 'confront the specific wrong idea they showed, and make the contrast unmissable',
  mastery_verification: 'verify they can do it independently, without scaffolding',
  transfer: 'check they can apply it in a situation you have not shown them',
}

/**
 * The per-turn flow contract. Names the purpose of the next question, states
 * the recovery rule (never repeat the failed explanation), and — when the
 * budget is spent — instructs the tutor to close the concept and move on
 * rather than trying again.
 *
 * Returns '' when nothing needs saying, so an ordinary turn pays no prompt
 * cost.
 */
export function buildLessonFlowBlock(state: ConversationState): string {
  const budget = evaluateConceptBudget(state)
  const purpose = questionPurpose(state)
  const lines: string[] = []

  if (hasDemonstratedMastery(state)) {
    // Requirement 4: do not keep explaining a mastered concept.
    lines.push(
      '- This concept is DEMONSTRATED. Do not explain it further and do not '
      + 'ask another question about it. Confirm briefly and move to the next concept.',
    )
  } else {
    lines.push(`- Purpose of your next question: ${PURPOSE_DESCRIPTION[purpose]}.`)
  }

  if ((state.consecutiveFailures ?? 0) > 0 && !hasDemonstratedMastery(state)) {
    // Requirement 3: recovery must not repeat what already failed.
    const used: string[] = []
    if (state.analogiesUsed.length > 0) used.push(`analogies already used: ${state.analogiesUsed.join(', ')}`)
    if (state.demonstrationsShown.length > 0) used.push(`demonstrations already shown: ${state.demonstrationsShown.join(', ')}`)
    lines.push(
      '- They just got it wrong. Do NOT repeat the explanation that failed. '
      + 'Teach it a DIFFERENT way — a different analogy, a different example, or a '
      + 'visual — then ask a NEW multiple-choice question about it.'
      + (used.length > 0 ? ` For reference, ${used.join('; ')}.` : ''),
    )
  }

  if (budget.status === 'final_attempt') {
    lines.push(
      '- This is the LAST attempt at this concept. Make this explanation and '
      + 'question count, then move on regardless of the outcome.',
    )
  }

  if (budget.status === 'exhausted') {
    // Requirements 7 + 10: never trap the learner; the lesson always ends.
    lines.push(
      '- The teaching budget for this concept is SPENT. Stop teaching it now. '
      + 'Give them the answer plainly, tell them it is worth another look later, '
      + 'and move to the next concept. Do NOT ask another question about it and '
      + 'do NOT apologise at length — this is normal pacing, not a failure.',
    )
  }

  if (lines.length === 0) return ''
  return '\n\nLESSON FLOW (mandatory):\n' + lines.join('\n')
}
