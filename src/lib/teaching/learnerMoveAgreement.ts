/**
 * LEARNER-MOVE AGREEMENT ASSERTION — observability only, still shadow.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §8 Batch 2
 * ("Log a violation when the reading and an existing layer disagree — the
 * §4.4 shape. Hold here for a real observation window. This batch's output
 * is the evidence base for every batch after it").
 *
 * ── THE §4.4 SHAPE, TRACED AGAINST THE REAL FUNCTIONS (NOT ASSUMED FROM THE
 *    TABLE) ────────────────────────────────────────────────────────────────
 * `classifyConversation`'s FIRST branch is `if (opts.recoveryKey) return
 * {type:'RECOVERY', ...}`, and `recoveryKeyHoisted` (route.ts) is written
 * as exactly `turnIntent.failureState` — the identical value
 * `LearnerMoveReading`'s own `DISTRESS` signal is sourced from
 * (`learnerMove.ts`: `if (intent.failureState !== null) signals.push({kind:
 * 'DISTRESS', ...})`). So `reading.has('DISTRESS')` and
 * `classifyConversation(...).type === 'RECOVERY'` are STRUCTURALLY LOCKED
 * to the same underlying value — they can never genuinely disagree unless a
 * future refactor breaks that wiring, which is why this module checks it
 * anyway, as a cheap structural sanity assertion, not because production
 * traffic is expected to ever trip it.
 *
 * The GENUINE §4.4 gap lives one level deeper: `classifyConversation` ALSO
 * returns `type: 'CONFUSION'` from two OTHER branches (the
 * `helpRequestKind === 'explain_differently'` branch, and the bottom
 * `CONFUSION_RE.test(trimmed) && isShortMessage(trimmed)` fallback) — both
 * reached only when `opts.recoveryKey` is falsy, i.e. exactly when the
 * reading has NO `DISTRESS` signal. `CONFUSION_RE` (conversationDecision.ts)
 * was widened for non-standard-English confusion phrasings
 * (`recoveryGuard.ts`'s own `detectFailureState`, which `DISTRESS` is
 * sourced from, was not — design doc §4.4's own measured 9/9 finding). THIS
 * is the comparison with real evidentiary value: a turn where
 * `classifyConversation` independently decided the learner is confused, but
 * the reading — and by extension `turnArbitration`'s RECOVERY rung, which
 * `recoveryKeyHoisted` claims — saw nothing.
 *
 * ── WHY THIS EVENT IS CONDITIONAL, NOT ONE-LINE-PER-TURN (unlike Batch 1) ──
 * The design doc's own words for this batch are "Log a violation WHEN the
 * reading and an existing layer disagree" — conditional phrasing, distinct
 * from Batch 1's "emit one line per turn" (unconditional, denominator
 * included on every line, matching `excursionTelemetry.ts`'s own stated
 * discipline). Read literally rather than assuming Batch 1's convention
 * carries over unstated. This is also not a violation of "the denominator
 * is on every line" in spirit: Batch 1's own `LEARNER_MOVE=` line ALREADY
 * fires on every turn that reaches `readLearnerMove`, so it already is the
 * denominator stream — a violation RATE is still computable by joining
 * `LEARNER_MOVE_AGREEMENT=` line counts against `LEARNER_MOVE=` line counts
 * over the same window (`turnKey` correlates a violation to its own turn),
 * without this module duplicating a per-turn line Batch 1 already emits.
 *
 * ── PII ─────────────────────────────────────────────────────────────────────
 * Same discipline as `learnerMoveTelemetry.ts`: no message text, no
 * `LearnerMoveSignal.detail`, no userId, no email. `conversationDecisionType`
 * is a closed enum (`ConversationDecisionType`), never raw text.
 */
import type { LearnerMoveReading, LearnerMoveKind } from './learnerMove'
import type { ConversationDecisionType } from './conversationDecision'

export const LEARNER_MOVE_AGREEMENT_EVENT_PREFIX = '[learn/chat] LEARNER_MOVE_AGREEMENT='

export type LearnerMoveAgreementViolationKind =
  /** The §4.4 gap itself — classifyConversation independently found confusion the reading missed. */
  | 'confusion_without_distress'
  /** Structural sanity check only — see module header. Never expected to fire on real traffic. */
  | 'distress_without_recovery'

export interface LearnerMoveAgreementEvent {
  /** Schema version. Bump when a field's MEANING changes, never for additions. */
  v: 1
  sessionId: string
  /** sessionId + request ingress ms. Count DISTINCT of this, never rows. */
  turnKey: string
  subject: string
  lessonConceptId: string | null
  kind: LearnerMoveAgreementViolationKind
  /** Every kind the reading found this turn, for context on WHAT it read instead. No `detail` — see PII note above. */
  readingKinds: LearnerMoveKind[]
  conversationDecisionType: ConversationDecisionType
  ts: string
}

/**
 * PURE. Returns the violation kind found, or null when the reading and
 * `classifyConversation` agree — the common case. Reads only `reading.has()`
 * and the decision's own `type`; calls no detector, reimplements nothing.
 */
export function detectLearnerMoveAgreementViolation(input: {
  reading: LearnerMoveReading
  conversationDecisionType: ConversationDecisionType
}): LearnerMoveAgreementViolationKind | null {
  const hasDistress = input.reading.has('DISTRESS')
  if (!hasDistress && input.conversationDecisionType === 'CONFUSION') {
    return 'confusion_without_distress'
  }
  if (hasDistress && input.conversationDecisionType !== 'RECOVERY') {
    return 'distress_without_recovery'
  }
  return null
}

/**
 * PURE. Reads the reading, the decision, and identity fields already
 * computed by route.ts; mutates nothing and returns a plain object.
 */
export function buildLearnerMoveAgreementEvent(input: {
  reading: LearnerMoveReading
  conversationDecisionType: ConversationDecisionType
  kind: LearnerMoveAgreementViolationKind
  sessionId: string
  subject: string
  lessonConceptId: string | null
  turnReceivedAt: number
}): LearnerMoveAgreementEvent {
  const { reading, conversationDecisionType, kind, sessionId, subject, lessonConceptId, turnReceivedAt } = input
  return {
    v: 1,
    sessionId,
    turnKey: `${sessionId}:${turnReceivedAt}`,
    subject,
    lessonConceptId,
    kind,
    readingKinds: reading.signals.map((s) => s.kind),
    conversationDecisionType,
    ts: new Date(turnReceivedAt).toISOString(),
  }
}

/**
 * One line PER VIOLATION (not per turn — see module header). Never throws —
 * observability may not break a turn, the same fail-open rule
 * `learnerMoveTelemetry.ts`/`excursionTelemetry.ts`/`brainMetrics.ts` follow.
 */
export function recordLearnerMoveAgreementEvent(event: LearnerMoveAgreementEvent): void {
  try {
    console.log(LEARNER_MOVE_AGREEMENT_EVENT_PREFIX + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
}
