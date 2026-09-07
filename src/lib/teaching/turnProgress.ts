/**
 * THE PROGRESS SUPERVISOR — the one property this runtime has never had.
 *
 * ── WHAT IT IS FOR ─────────────────────────────────────────────────────────
 * Every guard in the teaching runtime answers "MAY this happen?" — phase
 * legality, arbitration, the gate's eight terms, the suppression layer. Each is
 * individually correct. Nothing anywhere asks "HAS anything happened?", so
 * correct refusals compose into states the machine cannot leave. Measured, not
 * theorised: livenessEndToEnd.test.ts drives the real route into one (eight
 * correct answers, five authored probes, zero credit, one question re-served
 * nine times), and reachabilityProof.test.ts shows that with the server grade
 * unproducible NOT ONE reachable state can reach mastery.
 *
 * This module is that missing axis. It is deliberately NOT a second
 * pedagogical state machine, and four constraints keep it from becoming one —
 * asserted structurally by turnProgress.test.ts, so a later session cannot
 * widen it by accident:
 *
 *   C1  It owns TWO counters of SYSTEM INACTIVITY (`stagnantTurns`,
 *       `probeHeldTurns`) and nothing else. Neither describes the learner.
 *       (This was ONE counter until the end-to-end test refused to invert: see
 *       `foldProbeHeldTurns` for why a second, narrower signal was required
 *       and why widening the first one would have been the wrong answer.)
 *   C2  It never assigns a phase. Rung 2 is consumed by the EXISTING
 *       diagnostic-conclusion predicate; this module only reports.
 *   C3  It writes no evidence, no counter, no grade, no progress row. It is a
 *       pure function of facts the turn already computed.
 *   C4  It never discards learner work. Releasing a probe the learner declined
 *       to answer in gradeable form is not marking it wrong, not advancing past
 *       it, and not a claim about what they know.
 *
 * ── WHY A COUNTER AND NOT THE INVARIANT ITSELF ─────────────────────────────
 * The design-time invariant is "no state may depend forever on an event the
 * runtime made impossible". That is undecidable here: at turn 7 the server
 * cannot know whether the grading event is impossible or merely late. Any code
 * evaluating it directly would either fire early — discarding legitimate work —
 * or never fire. So the runtime carries the weaker, decidable proxy: nothing
 * has happened for N turns. It never claims impossibility, only absence, which
 * is a fact the server already owns.
 */

/** Facts the turn has already computed. This module derives, never fetches. */
export interface TurnProgressInputs {
  /** The conversation phase changed across this turn's fold. */
  phaseChanged: boolean
  /** correctAtCheck / correctAtPractice (plain or verified) moved. */
  masteryCounterMoved: boolean
  /** `gradeMcqAnswer` resolved against a server-held key. Right OR wrong:
   *  a wrong answer is evidence and moves the lesson forward. */
  serverGradeRecorded: boolean
  /** A question the learner had not already been shown was put on screen. */
  freshProbeAttached: boolean
  /** The turn delivered teaching AND it was not a repeat of the previous turn.
   *  Repetition is the symptom, so it must not count as progress. */
  distinctTeachingDelivered: boolean
  /** The learner asked for something (diagram / simpler / another example) and
   *  the turn answered it. Legitimate teaching, never escalated against. */
  learnerRequestHonoured: boolean
  /** A prerequisite gap was opened as a detour. */
  knowledgeGapOpened: boolean

  // ── Turns that are not counted either way ────────────────────────────────
  /** RS P-3 outage template: content-free by construction. An outage is not a
   *  stall, and escalating through one would spend probes on a broken turn. */
  degradedTurn: boolean
  /** A failure state fired; recovery has its own protocol and its own pacing. */
  recoveryFired: boolean
  /** An excursion deliberately freezes the lesson's ladder. Paused is not stuck. */
  excursionActive: boolean
  /** Lesson one runs under its own hard limits (first-lesson/02 §2). */
  firstLessonActive: boolean
}

export type TurnOutcome = 'productive' | 'unproductive' | 'excluded'

/** 0 = nothing; 1 = release a stuck probe; 2 = let the diagnostic conclude;
 *  3 = compose the turn server-side. */
export type EscalationRung = 0 | 1 | 2 | 3

export const RUNG_1_AT = 2
export const RUNG_2_AT = 3
export const RUNG_3_AT = 4

export function classifyTurn(i: TurnProgressInputs): TurnOutcome {
  // Excluded BEFORE productive: a degraded turn can carry a stale
  // `distinctTeachingDelivered` from the template's own text, and a recovery
  // turn legitimately delivers teaching — neither should reset a stagnation
  // streak that the learner is still inside.
  if (i.degradedTurn || i.recoveryFired || i.excursionActive || i.firstLessonActive) {
    return 'excluded'
  }
  if (
    i.phaseChanged
    || i.masteryCounterMoved
    || i.serverGradeRecorded
    || i.freshProbeAttached
    || i.distinctTeachingDelivered
    || i.learnerRequestHonoured
    || i.knowledgeGapOpened
  ) return 'productive'
  return 'unproductive'
}

/**
 * The single integer. `excluded` FREEZES rather than resets: an outage in the
 * middle of a stall must not buy the stall a fresh budget, and must not
 * advance it either.
 *
 * A corrupt stored value reads as 0 — the SAFE direction for this counter,
 * because a wrong high value would escalate against a healthy lesson.
 */
export function foldStagnation(prev: unknown, outcome: TurnOutcome): number {
  const base = typeof prev === 'number' && Number.isFinite(prev) && prev >= 0
    ? Math.floor(prev) : 0
  if (outcome === 'excluded') return base
  if (outcome === 'productive') return 0
  return base + 1
}

export function escalationRung(stagnantTurns: number): EscalationRung {
  if (!Number.isFinite(stagnantTurns) || stagnantTurns < RUNG_1_AT) return 0
  if (stagnantTurns >= RUNG_3_AT) return 3
  if (stagnantTurns >= RUNG_2_AT) return 2
  return 1
}

/** True when the runtime should stop holding an ungraded probe on screen so a
 *  DIFFERENT authored probe can be selected. Nothing is graded or discarded. */
export function shouldReleasePendingProbe(rung: EscalationRung): boolean {
  return rung >= 1
}

/** True when a diagnostic that has produced nothing may conclude even though
 *  the engine's own move was not 'ask'. CONSUMED BY the existing predicate in
 *  conversationState — this module never assigns a phase (C2). */
export function diagnosticMayConclude(rung: EscalationRung): boolean {
  return rung >= 2
}

/** True when the turn should be composed deterministically rather than left to
 *  the model. If no authored asset exists the caller reports `unservable` — a
 *  named failure beats a silent loop. */
export function shouldComposeDeterministically(rung: EscalationRung): boolean {
  return rung >= 3
}

/**
 * ── WHY A SECOND, NARROWER COUNTER ─────────────────────────────────────────
 * `stagnantTurns` asks "did anything happen this turn?", and a tutor that keeps
 * producing NEW teaching text answers yes forever. Measured: with rung 1 driven
 * by `stagnantTurns`, the L1 reproduction did not invert at all — the model was
 * teaching something different every turn while the learner's answers were
 * never graded and the same question was re-served underneath. Teaching was
 * happening; ASSESSMENT was deadlocked. A general "is the system moving" signal
 * cannot see that, and widening it to call genuine teaching unproductive would
 * have made the supervisor fire on healthy lessons — the one thing it must
 * never do.
 *
 * So the stuck dimension gets its own counter. This is exactly the owner's
 * invariant, narrowed to the state that actually depends on the unproducible
 * event: a pending probe is waiting for a grade, and a grade requires an answer
 * the resolver can map. Counting how long that wait has lasted claims nothing
 * about the learner and nothing about impossibility — only duration.
 *
 * Increments ONLY while the SAME probe is carried forward ungraded. Any grade
 * (right or wrong), any fresh probe, or no probe at all resets it to 0.
 */
export function foldProbeHeldTurns(
  prev: unknown,
  ctx: { carriedForwardUngraded: boolean; sameProbeAsLastTurn: boolean },
): number {
  const base = typeof prev === 'number' && Number.isFinite(prev) && prev >= 0
    ? Math.floor(prev) : 0
  if (!ctx.carriedForwardUngraded || !ctx.sameProbeAsLastTurn) return 0
  return base + 1
}

/** Turns a probe may sit unanswered before the runtime stops holding it. */
export const PROBE_HELD_RELEASE_AT = 2

/**
 * Stop HOLDING an ungraded probe so a different authored one can be selected.
 * Never grades it, never marks it wrong, never advances past it, and leaves it
 * spent in the ledger. See route.ts's rung-1 site for the full contract.
 */
export function shouldReleaseHeldProbe(probeHeldTurns: number): boolean {
  return Number.isFinite(probeHeldTurns) && probeHeldTurns >= PROBE_HELD_RELEASE_AT
}
