/**
 * Signal Verification Layer — Architectural Root Cause Fix.
 *
 * Cross-checks the LLM's SIGNAL tag claims against independently
 * measurable evidence before allowing them to drive mastery state.
 * Pure module: no DB, no I/O.
 *
 * Design: verification FLAGS but does not OVERRIDE. A flagged signal
 * still advances the teaching phase (to avoid over-blocking), but
 * flagged evidence does not count toward strict mastery — the gate
 * that authorizes lesson completion.
 */

import type { TeachingSignal } from './signals'
import type { TeachingPhase } from './conversationState'

export type VerificationStatus = 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED'

export interface VerificationResult {
  status: VerificationStatus
  reasons: string[]
}

const CORRECT_CONTRADICTION_RE =
  /\b(not quite|that'?s not (?:quite )?right|let me correct|actually,? (?:the|that|it)|close,? but|almost,? but|not exactly|that'?s (?:a )?(?:common )?(?:mistake|error|misconception)|unfortunately|incorrect)\b/i

const INCORRECT_CONTRADICTION_RE =
  /\b(exactly right|perfect(?:ly)?!|well done|that'?s (?:exactly )?correct|excellent|spot on|you(?:'ve)? got it|brilliant|absolutely right|great (?:job|work|answer))\b/i

/**
 * Cross-check the LLM's SIGNAL against independently observable evidence.
 *
 * Returns a verification result. The caller decides what to do with
 * flagged signals — this module never overrides.
 */
export function verifySignal(
  signal: TeachingSignal,
  context: {
    assistantText: string
    learnerMessage: string
    phase: TeachingPhase
    turnLatencyMs?: number | null
  },
): VerificationResult {
  const reasons: string[] = []

  if (signal.correctness === undefined) {
    return { status: 'CLEAN', reasons: [] }
  }

  // 1. Response-text contradiction: the LLM's OWN words disagree with its SIGNAL.
  if (signal.correctness === true) {
    if (CORRECT_CONTRADICTION_RE.test(context.assistantText)) {
      reasons.push('text-contradicts-correct')
    }
  } else if (signal.correctness === false) {
    if (INCORRECT_CONTRADICTION_RE.test(context.assistantText)) {
      reasons.push('text-contradicts-incorrect')
    }
  }

  // 2. Bare-content check for CHECK/PRACTICE: if the learner's message is
  //    extremely short and lacks technical content, correctness="true" at
  //    these phases is suspicious — the learner didn't demonstrate anything.
  if (signal.correctness === true) {
    const advancedPhases: TeachingPhase[] = ['CHECK', 'PRACTICE', 'TRANSFER']
    if (advancedPhases.includes(context.phase)) {
      const words = context.learnerMessage.trim().split(/\s+/)
      const hasNumber = /\d/.test(context.learnerMessage)
      const hasOperator = /[+\-*/=<>≤≥≠÷×]/.test(context.learnerMessage)
      if (words.length < 3 && !hasNumber && !hasOperator) {
        reasons.push('bare-content-at-advanced-phase')
      }
    }
  }

  // 3. Latency check: an implausibly fast correct answer to a non-trivial
  //    phase is suspicious. Only fires at CHECK/PRACTICE/TRANSFER where the
  //    learner is expected to think.
  if (
    signal.correctness === true &&
    context.turnLatencyMs != null &&
    context.turnLatencyMs < 2000
  ) {
    const timedPhases: TeachingPhase[] = ['CHECK', 'PRACTICE', 'TRANSFER']
    if (timedPhases.includes(context.phase)) {
      reasons.push('implausibly-fast-correct')
    }
  }

  if (reasons.length === 0) return { status: 'CLEAN', reasons: [] }

  const hasContradiction = reasons.some((r) => r.startsWith('text-contradicts'))
  return {
    status: hasContradiction ? 'CONTRADICTED' : 'SUSPICIOUS',
    reasons,
  }
}

/**
 * Override the SIGNAL when the LLM's own text clearly contradicts its claim.
 *
 * This is the ONE case where verification overrides: when the LLM says
 * "not quite" in its text but marks correctness="true" in the SIGNAL,
 * the text wins — it is what the learner sees and what the LLM intended.
 * The SIGNAL tag is an afterthought the LLM sometimes gets wrong.
 *
 * Returns a corrected signal (same reference if unchanged).
 */
export function resolveContradiction(
  signal: TeachingSignal,
  verification: VerificationResult,
): TeachingSignal {
  if (verification.status !== 'CONTRADICTED') return signal

  const flipped = { ...signal }
  if (verification.reasons.includes('text-contradicts-correct')) {
    flipped.correctness = false
  } else if (verification.reasons.includes('text-contradicts-incorrect')) {
    flipped.correctness = true
  }
  return flipped
}
