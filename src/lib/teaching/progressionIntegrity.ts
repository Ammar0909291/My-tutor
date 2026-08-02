/**
 * Progression Integrity — deterministic concept identity + stall telemetry.
 *
 * Answers one question the runtime could not previously answer reliably:
 * "which concept are we teaching, and did this turn move the lesson forward?"
 *
 * ── RC-A: why pickCurrentTopicSlug exists ─────────────────────────────────
 *
 * The route resolved the current lesson with, in effect:
 *
 *     rows = await prisma.topicProgress.findMany({ where: { userId, subjectSlug } })
 *     inProgressSlug = rows.find(r => r.status === 'IN_PROGRESS')?.topicSlug
 *
 * That query has no `orderBy`, so Postgres may return the rows in any order.
 * It is not a stable "any" either: an UPDATE writes a new tuple under MVCC, so
 * a row that was just updated commonly relocates in the heap and the effective
 * order changes between turns. The conversational checkpoint upserts
 * `status: 'IN_PROGRESS'` on every signalled turn and NEVER writes COMPLETED,
 * so a learner accumulates several IN_PROGRESS rows as normal steady state —
 * meaning `.find()` had several candidates and could return a different one
 * from turn to turn.
 *
 * The consequence is not a cosmetic wobble. The resolved slug feeds the
 * conceptId that `readConversationState(raw, conceptId)` keys on, and that
 * function resets to `initialConversationState()` on ANY mismatch. One flap
 * therefore wipes phase, `correctAtCheck`, `correctAtPractice`,
 * `taughtThisSession`, `demonstrated` and every counter — which reproduces, in
 * one mechanism, most of the reported failure class: lessons restart, mastery
 * never accumulates to the gate, the tutor re-teaches what it already taught
 * (because `taughtThisSession` is false again), and progress silently stalls.
 * Proven in src/tests/progressionStall.test.ts.
 *
 * This module makes the choice a pure, total, order-invariant function of the
 * rows. It does NOT change which topic is "right" in the normal single-
 * candidate case — it only removes the nondeterminism when there are several.
 *
 * ── Telemetry ─────────────────────────────────────────────────────────────
 *
 * Session-scoped counters, folded once per turn, riding the existing
 * contextSnapshot persist like every other counter in this codebase (no new
 * store, no migration). Measurement only: nothing here gates a turn.
 *
 * Pure module: no DB, no I/O, no clock (timestamps are passed in).
 */

// ── Deterministic concept identity ────────────────────────────────────────

/** The narrow shape this module needs from a TopicProgress row. Declared
 *  structurally so tests drive it without a database. */
export interface TopicProgressRowLike {
  topicSlug: string
  status: string
  updatedAt?: Date | string | null
}

/** Statuses that mean "this topic is still being taught". Mirrors the
 *  conversational-checkpoint upsert's own guard, which skips rows already
 *  COMPLETED or MASTERED. */
const ACTIVE_STATUSES = new Set(['IN_PROGRESS'])

function timeOf(row: TopicProgressRowLike): number {
  const raw = row.updatedAt
  if (!raw) return 0
  const t = raw instanceof Date ? raw.getTime() : new Date(raw).getTime()
  return Number.isFinite(t) ? t : 0
}

/**
 * The single in-progress topic for this subject, chosen deterministically.
 *
 * Rule: most recently updated wins; ties break on slug order. Both halves
 * matter — recency is the meaningful signal (the topic actually being worked
 * on), and the slug tiebreak guarantees total order so the result cannot
 * depend on input ordering even when timestamps collide (equal-timestamp rows
 * are common: two upserts inside the same transaction, or a restored backup).
 *
 * Returns null when nothing is in progress. Deliberately does NOT invent an
 * identity in that case — the caller's existing fallbacks (studentProgress
 * .currentLesson, then the first lesson) remain the owners of that decision.
 */
export function pickCurrentTopicSlug(rows: readonly TopicProgressRowLike[]): string | null {
  let best: TopicProgressRowLike | null = null
  for (const row of rows) {
    if (!row || typeof row.topicSlug !== 'string') continue
    if (!ACTIVE_STATUSES.has(row.status)) continue
    if (best === null) { best = row; continue }
    const dt = timeOf(row) - timeOf(best)
    if (dt > 0 || (dt === 0 && row.topicSlug < best.topicSlug)) best = row
  }
  return best?.topicSlug ?? null
}

/** The narrow shape this module needs from a resolved lesson. */
export interface LessonLike {
  order: number
  topicSlug: string
}

/**
 * ── OBJECTIVE 2: the single owner of "which lesson is being taught" ────────
 *
 * PRODUCTION BEHAVIOUR THIS FIXES: a lesson completes, the completion summary
 * shows, the next lesson unlocks — and then "Continue" / "Got it" keeps
 * teaching the lesson that just finished, repeating already-mastered
 * questions.
 *
 * The route resolved the current lesson as, in effect:
 *
 *     pickCurrentTopicSlug(topicProgressRows)                        // won
 *       ?? lessons.find(l => l.order === studentProgress.currentLesson)
 *       ?? lessons[0]
 *
 * That reads a LAGGING, MULTI-VALUED cache before the authoritative owner.
 *
 *   · StudentProgress.currentLesson is authoritative. It is advanced by EVERY
 *     completion (/api/curriculum/progress PATCH: currentLesson =
 *     Math.max(existing, completedLesson + 1)), it is what the UI renders, and
 *     it is what "next lesson unlocked" reflects. One value, always.
 *   · TopicProgress IN_PROGRESS rows are a derived record of what has been
 *     taught. They are multi-valued by design — see this module's header: the
 *     conversational checkpoint upserts IN_PROGRESS on every signalled turn
 *     and nothing clears a row when a learner leaves a lesson unfinished, so
 *     several accumulate as normal steady state.
 *
 * So after finishing lesson N, the completed topic is correctly excluded, but
 * any older unfinished topic still outranks StudentProgress.currentLesson —
 * and the runtime resumes THAT lesson instead of starting N+1.
 *
 * pickCurrentTopicSlug is NOT retired: it answers a genuinely different
 * question ("which topic have we been working on?") and remains this
 * function's fallback for a learner who has no authoritative position yet.
 * What changes is the precedence, which removes the second owner from the
 * decision rather than trying to keep two owners in sync.
 *
 * Pure and total: no I/O, no clock, never throws, order-invariant.
 */
export function selectCurrentLesson<T extends LessonLike>(
  lessons: readonly T[],
  studentCurrentLesson: number | null | undefined,
  topicProgressRows: readonly TopicProgressRowLike[],
): T | null {
  if (!Array.isArray(lessons) || lessons.length === 0) return null

  // 1. Authoritative owner.
  if (typeof studentCurrentLesson === 'number' && Number.isFinite(studentCurrentLesson)) {
    const byOrder = lessons.find((l) => l && l.order === studentCurrentLesson)
    if (byOrder) return byOrder
  }

  // 2. Fallback — no StudentProgress row yet, or a stored order that no longer
  //    resolves. The in-progress record is the best remaining evidence.
  const inProgressSlug = pickCurrentTopicSlug(topicProgressRows)
  if (inProgressSlug) {
    const bySlug = lessons.find((l) => l && l.topicSlug === inProgressSlug)
    if (bySlug) return bySlug
  }

  // 3. Nothing known — start at the beginning.
  return lessons[0] ?? null
}

// ── Stall telemetry ───────────────────────────────────────────────────────

/**
 * Session-scoped progression counters. Every field answers a question the
 * mission's instrumentation step asks, and every field is derivable from
 * state the route already computes — nothing here requires a new engine.
 */
export interface ProgressionMetrics {
  /** Turns folded into these metrics — the denominator for every rate. */
  turns: number
  /** Turns where the server had asked a question and the learner replied
   *  substantively, yet no SIGNAL was parsed (RC-D). The single most
   *  diagnostic number: it is the rate at which the model drops the
   *  observation the whole ladder depends on. */
  missingSignalOnAnsweredTurn: number
  /** Turns carrying a graded signal that nonetheless produced no phase
   *  change. Expected sometimes (a hold is legitimate); a high rate means
   *  evidence is arriving and not moving the machine. */
  signalWithoutAdvance: number
  /** Consecutive turns with no phase change, current run. */
  turnsSincePhaseChange: number
  /** Longest such run this session — the stall high-water mark. */
  longestStall: number
  /** Times the resolved concept identity changed mid-session (RC-A). After
   *  the determinism fix this should be ~0 outside genuine lesson
   *  transitions; any nonzero rate is either a real transition or a
   *  regression, and the two are distinguishable by conceptTransitions. */
  conceptIdentityChanges: number
  /** Times a concept change was accompanied by a full ConversationState
   *  reset that discarded non-zero mastery evidence — always a defect. */
  masteryEvidenceDiscarded: number
  /** Recovery fired on this many turns; and the longest consecutive run. */
  recoveryTurns: number
  longestRecoveryRun: number
  /** Turns where the delivered text duplicated a recent turn (fed by the
   *  verifier's V-DUP-* rules when they run). */
  duplicateTurns: number
  /** Did the lesson reach verified mastery this session? Completion rate is
   *  computed across sessions from this flag. */
  masteryReached: boolean
  /** RC-D freeze-breaker input: consecutive turns where the server had asked
   *  a question and the learner replied substantively yet no SIGNAL was
   *  parsed. Resets to 0 on any turn where the signal DID arrive (or where
   *  no answer was expected). Read at the START of the following turn to
   *  decide whether to inject the SIGNAL_REPAIR block. Never gates a turn
   *  on its own — the block itself makes forward progress by forcing the
   *  next turn to be a runtime-verifiable clarification. */
  consecutiveMissingSignals: number
}

export function initialProgressionMetrics(): ProgressionMetrics {
  return {
    turns: 0,
    missingSignalOnAnsweredTurn: 0,
    signalWithoutAdvance: 0,
    turnsSincePhaseChange: 0,
    longestStall: 0,
    conceptIdentityChanges: 0,
    masteryEvidenceDiscarded: 0,
    recoveryTurns: 0,
    longestRecoveryRun: 0,
    duplicateTurns: 0,
    masteryReached: false,
    consecutiveMissingSignals: 0,
  }
}

/** Total: tolerates any stored shape, never throws. */
export function readProgressionMetrics(raw: unknown): ProgressionMetrics {
  const base = initialProgressionMetrics()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<ProgressionMetrics>
  const num = (v: unknown, d: number) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : d)
  return {
    turns: num(r.turns, 0),
    missingSignalOnAnsweredTurn: num(r.missingSignalOnAnsweredTurn, 0),
    signalWithoutAdvance: num(r.signalWithoutAdvance, 0),
    turnsSincePhaseChange: num(r.turnsSincePhaseChange, 0),
    longestStall: num(r.longestStall, 0),
    conceptIdentityChanges: num(r.conceptIdentityChanges, 0),
    masteryEvidenceDiscarded: num(r.masteryEvidenceDiscarded, 0),
    recoveryTurns: num(r.recoveryTurns, 0),
    longestRecoveryRun: num(r.longestRecoveryRun, 0),
    duplicateTurns: num(r.duplicateTurns, 0),
    masteryReached: r.masteryReached === true,
    consecutiveMissingSignals: num(r.consecutiveMissingSignals, 0),
  }
}

export interface ProgressionTurnFacts {
  /** Server had asked a question on the PREVIOUS turn (a graded answer was
   *  expected this turn). */
  answerWasExpected: boolean
  /** The learner's message was substantive — not a bare acknowledgement, not
   *  a recovery utterance, not empty. */
  learnerReplySubstantive: boolean
  /** A SIGNAL tag was parsed from this turn's model output. */
  signalPresent: boolean
  /** Phase before / after this turn's fold. */
  phaseBefore: string | null
  phaseAfter: string | null
  /** Concept identity before / after this turn's resolution. */
  conceptBefore: string | null
  conceptAfter: string | null
  /** Mastery counters carried by the state BEFORE this turn — used to detect
   *  that a concept change discarded real evidence. */
  evidenceBefore: { correctAtCheck: number; correctAtPractice: number }
  recoveryFired: boolean
  /** The delivered text duplicated a recent turn (verifier V-DUP-* fired). */
  duplicateDetected: boolean
  /** masteryVerified() on the post-fold state. */
  masteryVerifiedNow: boolean
}

/** Fold one completed turn. Pure. */
export function foldProgressionMetrics(
  prev: ProgressionMetrics | undefined,
  f: ProgressionTurnFacts,
): ProgressionMetrics {
  const m = readProgressionMetrics(prev)

  const phaseChanged = f.phaseBefore !== null && f.phaseAfter !== null && f.phaseBefore !== f.phaseAfter
  const conceptChanged = f.conceptBefore !== null && f.conceptAfter !== null && f.conceptBefore !== f.conceptAfter
  const hadEvidence = f.evidenceBefore.correctAtCheck + f.evidenceBefore.correctAtPractice > 0

  const turnsSincePhaseChange = phaseChanged ? 0 : m.turnsSincePhaseChange + 1
  const signalWasDropped =
    f.answerWasExpected && f.learnerReplySubstantive && !f.signalPresent && !f.recoveryFired

  return {
    turns: m.turns + 1,
    // RC-D freeze-breaker counter: consecutive dropped observations. Resets
    // the moment a signal arrives (or none was owed), so it measures an
    // ongoing blind spot rather than a lifetime total.
    consecutiveMissingSignals: signalWasDropped ? m.consecutiveMissingSignals + 1 : 0,
    missingSignalOnAnsweredTurn:
      m.missingSignalOnAnsweredTurn + (signalWasDropped ? 1 : 0),
    signalWithoutAdvance: m.signalWithoutAdvance + (f.signalPresent && !phaseChanged ? 1 : 0),
    turnsSincePhaseChange,
    longestStall: Math.max(m.longestStall, turnsSincePhaseChange),
    conceptIdentityChanges: m.conceptIdentityChanges + (conceptChanged ? 1 : 0),
    masteryEvidenceDiscarded: m.masteryEvidenceDiscarded + (conceptChanged && hadEvidence ? 1 : 0),
    recoveryTurns: m.recoveryTurns + (f.recoveryFired ? 1 : 0),
    longestRecoveryRun: f.recoveryFired
      ? Math.max(m.longestRecoveryRun, consecutiveRecoveryRun(m, true))
      : m.longestRecoveryRun,
    duplicateTurns: m.duplicateTurns + (f.duplicateDetected ? 1 : 0),
    masteryReached: m.masteryReached || f.masteryVerifiedNow,
  }
}

/** Recovery-run helper. The run length is derived from recoveryTurns rather
 *  than stored separately: a run is only interesting while it is unbroken,
 *  and a broken run is already captured by longestRecoveryRun. */
function consecutiveRecoveryRun(m: ProgressionMetrics, firedThisTurn: boolean): number {
  return firedThisTurn ? m.recoveryTurns + 1 : 0
}

// ── RC-D freeze-breaker ───────────────────────────────────────────────────

/**
 * How many consecutive dropped observations are tolerated before the runtime
 * stops waiting for one.
 *
 * ONE. The mission's own success criterion is that the runtime must never
 * freeze when correctness cannot be determined — and a single dropped signal
 * has already cost the learner a turn. Waiting for a second is waiting for
 * the same failure twice. This mirrors questionLegality's
 * DEFAULT_NON_ANSWER_BLOCKS_ASK, which reached the same conclusion for the
 * same reason: you do not repeat the move that just failed.
 */
export const MISSING_SIGNAL_TOLERANCE = 1

/**
 * Does the runtime need to break a signal-blind stall this turn?
 *
 * Read at the START of a turn, against the PREVIOUS turn's folded metrics.
 * True means: the last turn expected a graded answer, the learner gave a
 * substantive reply, and the model returned no observation — so the ladder
 * received `null` and held. The runtime must not simply ask again into the
 * same blind spot.
 */
export function needsSignalRepair(m: ProgressionMetrics | undefined): boolean {
  return readProgressionMetrics(m).consecutiveMissingSignals >= MISSING_SIGNAL_TOLERANCE
}

/**
 * The SIGNAL_REPAIR block. Injected LAST (like the recovery block) so it
 * overrides advisory pacing guidance for one turn.
 *
 * Why this shape, and not "try harder to emit the tag": the tag is the thing
 * that just failed. Repeating the instruction that was already ignored is the
 * definition of the loop this mission exists to eliminate. Instead the runtime
 * changes the TURN so that the learner's next reply is verifiable by the
 * runtime itself, without any model self-report:
 *
 *   • the tutor restates what it believes the learner said, and asks them to
 *     confirm or correct it — a binary the learner answers directly, and one
 *     that is itself pedagogically valuable (it is the own-words check the
 *     canonical ladder's NAME state is built around);
 *   • no new content, no new assessment item — nothing that would compound an
 *     already-unobserved answer with a second unobserved one;
 *   • forward progress is guaranteed either way: a confirmation is evidence
 *     the runtime can act on, and a correction is richer evidence still.
 *
 * This satisfies the mission's "request clarification / defer assessment"
 * branch of the never-freeze rule, and it is the runtime deciding — the model
 * only renders the words.
 */
export function buildSignalRepairBlock(): string {
  return (
    '\n\nOBSERVATION REPAIR — MANDATORY THIS TURN (overrides pacing guidance ' +
    'above):\n' +
    "- The learner's last message was an answer, but this turn's observation " +
    'was not recorded, so the lesson cannot safely advance or grade it.\n' +
    '- Do NOT introduce new content. Do NOT set a new problem, question, or ' +
    'assessment item. Do NOT re-ask the previous question in any form.\n' +
    '- INSTEAD: restate, in one short sentence, what you understood their ' +
    'answer to mean, and ask them to confirm or correct that restatement ' +
    '(e.g. "So you\'re saying the total stays the same — have I got that ' +
    'right?").\n' +
    '- Keep it to two sentences. Warm, unhurried, no apology, and no mention ' +
    'of any internal tracking, tag, or system.\n' +
    '- Then emit the observation tag for THIS turn as normal.'
  )
}

/** Compact provenance tags for the existing evidence-tag array — reuses the
 *  persistence path already carrying verifier and parity tags. Only emits on
 *  anomalies, so a healthy turn adds nothing. */
export function progressionTags(f: ProgressionTurnFacts): string[] {
  const tags: string[] = []
  if (f.answerWasExpected && f.learnerReplySubstantive && !f.signalPresent && !f.recoveryFired) {
    tags.push('progression:signal-missing')
  }
  if (f.conceptBefore && f.conceptAfter && f.conceptBefore !== f.conceptAfter) {
    tags.push('progression:concept-changed')
    if (f.evidenceBefore.correctAtCheck + f.evidenceBefore.correctAtPractice > 0) {
      tags.push('progression:evidence-discarded')
    }
  }
  return tags
}
