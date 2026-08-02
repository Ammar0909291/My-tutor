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

export function evaluateConceptBudget(state: ConversationState): ConceptBudget {
  const turnsUsed = state.turnsOnConcept ?? 0
  // An attempt is the initial teaching pass plus each remediation.
  const attemptsUsed = 1 + (state.remediationCount ?? 0)
  const turnsRemaining = Math.max(0, CONCEPT_TURN_BUDGET - turnsUsed)

  const base = { turnsUsed, turnsRemaining, attemptsUsed }

  // A concept the learner has actually mastered is never "exhausted" — it is
  // finished. Checking this first is what stops a slow-but-successful learner
  // from being marked for review on the turn they succeed.
  if (hasDemonstratedMastery(state)) {
    return { ...base, status: 'ok', reason: null, markForReview: false }
  }

  if (turnsUsed >= CONCEPT_TURN_BUDGET) {
    return { ...base, status: 'exhausted', reason: 'turns', markForReview: true }
  }
  if (attemptsUsed > MAX_TEACHING_ATTEMPTS) {
    return { ...base, status: 'exhausted', reason: 'attempts', markForReview: true }
  }
  if ((state.consecutiveFailures ?? 0) >= MAX_CONSECUTIVE_FAILURES) {
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
