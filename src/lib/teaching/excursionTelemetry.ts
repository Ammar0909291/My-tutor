/**
 * EXCURSION LIFECYCLE MEASUREMENT — observability only.
 *
 * WHY THIS EXISTS
 *
 * R1-R4 (docs/architecture/EXCURSION_GATE_OWNERSHIP_PROPOSAL.md) fixed a real
 * defect: an active excursion silently disabled the assessment gate. The fixes
 * are production-verified, but the proposal's §9 step 0 was never built, so
 * BEHAVIOUR was known and PREVALENCE was not — how often real learners open an
 * excursion, how long it holds, and how it ends were all unmeasured. Every
 * excursion signal in production was a pretty-printed `[excursion]` object log,
 * which cannot be aggregated reliably and carries no session identity.
 *
 * This module changes nothing about excursions. It is a pure event builder plus
 * one structured log line, modelled on the existing `[learn/chat] BRAIN_EVENT=`
 * convention (src/lib/understanding/brainMetrics.ts) rather than a new
 * telemetry framework, and it writes NOTHING to the database.
 *
 * ── THE DENOMINATOR IS ON EVERY LINE, ON PURPOSE ────────────────────────────
 *
 * A count of excursions is not a prevalence. An event is emitted on EVERY turn
 * that reaches the excursion decision, including the ordinary ones
 * (`kind: 'none'`), so eligible turns, eligible sessions, opens and closes all
 * come from ONE log stream with no join between log shapes. The cost is one
 * compact JSON line per turn (~230 bytes), alongside the ~1 kB BRAIN_EVENT line
 * that already fires per turn. It is platform log volume, never Supabase
 * egress — see the egress-incident notes in CLAUDE.md.
 *
 * ── ONE EXCURSION IS NOT ONE EVENT PER TURN ─────────────────────────────────
 *
 * `kind` separates the lifecycle from the turns it spans:
 *
 *   'open'     'started' from rest    — a NEW excursion. THE numerator.
 *   'restate'  'started' while live   — the SAME target requested again (a
 *                                       retry, or a learner asking twice). The
 *                                       excursion never closed, so NOT an open.
 *   'switch'   transition 'switched'  — the target was REPLACED; the excursion
 *                                       never closed, so this is NOT an open.
 *   'continue' transition 'continued' — a turn served under a live excursion.
 *   'close'    transition 'closed-*'  — the excursion ended.
 *   'none'     transition 'none'      — an ordinary turn. The denominator.
 *
 * Counting 'open' alone answers "how many excursions", counting every line
 * answers "out of how many turns", and distinct sessionId over each answers the
 * session-level question. Counting any other way inflates prevalence.
 *
 * ── IDEMPOTENCY, AND ITS HONEST LIMIT ───────────────────────────────────────
 *
 * `kind: 'open'` cannot repeat for a live excursion, because it is derived from
 * the PERSISTED prior state rather than from the transition label alone. That
 * distinction is load-bearing and was found by test: excursion.ts emits
 * `transition: 'started'` again when the concept an excursion is already on is
 * re-requested, so counting the label would double-count a retry. The persisted
 * snapshot, not this module, is the dedupe mechanism — which is why nothing
 * here infers an excursion from learner text or model output.
 *
 * `turnKey` (sessionId + the request's ingress timestamp) collapses DUPLICATE
 * DELIVERY of the same execution's line at aggregation time: count distinct
 * turnKey, not rows.
 *
 * What this does NOT guarantee, stated rather than papered over: two truly
 * CONCURRENT executions of the same turn would both read `active: false` and
 * both emit an open. The runtime holds no per-turn lock, so no measurement
 * placed here can rule that out; it is a limitation of the architecture's
 * identity, not of this file.
 *
 * ── PII ─────────────────────────────────────────────────────────────────────
 *
 * No learner message text, no title the learner typed, no userId, no email, no
 * transcript. `targetTopicTitle` is the learner's own words and is deliberately
 * reduced to `targetKind: 'topic'` — the existing `[excursion]` line prints the
 * title; this one must never. Concept ids and subject slugs are curriculum
 * identifiers, not personal data. Pinned by test.
 */
import type { ExcursionDecision, ExcursionState, ExcursionTransition } from './excursion'
import { MAX_EXCURSION_TURNS } from './excursion'

export const EXCURSION_EVENT_PREFIX = '[learn/chat] EXCURSION_EVENT='

export type ExcursionEventKind = 'none' | 'open' | 'restate' | 'switch' | 'continue' | 'close'

export interface ExcursionEvent {
  /** Schema version. Bump when a field's MEANING changes, never for additions. */
  v: 1
  kind: ExcursionEventKind
  /**
   * Could an excursion have happened at all this turn?
   *
   * False when there is no lesson concept (free chat / Library browsing):
   * `decideExcursion` returns 'none' before any branch runs, so such turns are
   * not a denominator for anything. Emitted rather than dropped so the excluded
   * population is visible in the same stream.
   */
  eligible: boolean
  sessionId: string
  /** sessionId + request ingress ms. Count DISTINCT of this, never rows. */
  turnKey: string
  subject: string
  lessonConceptId: string | null
  /** The concept taught this turn, when there is one. Never a learner's words. */
  targetConceptId: string | null
  /** 'topic' means the curriculum could not name it. The title itself is never logged. */
  targetKind: 'concept' | 'topic' | null
  transition: ExcursionTransition
  /**
   * The excursion's own turn counter read from the PRIOR persisted state.
   *
   * Set on 'close' and 'switch' — the two events that end a target's run — and
   * null otherwise. `decideExcursion` resets the persisted state to
   * NO_EXCURSION when it closes, so the closing decision's own `turns` is 0 and
   * reading it would report every excursion as zero turns long.
   */
  turnsHeld: number | null
  /**
   * Turns on which the assessment gate saw `notExcursion: false`, for this run.
   *
   * turnsHeld + 2: the opening turn, the held turns, and the closing turn —
   * which is also blocked, because `turnCountsForLesson` excludes the return
   * turn. Close only. CONFOUNDER: a 'switch' resets the counter, so for an
   * excursion that switched target this counts only since the last switch.
   */
  turnsBlocked: number | null
  /** Close only. Did it end at the R2 safety bound rather than a learner signal? */
  atBound: boolean | null
  /**
   * Close only. Was the lesson the excursion promised to return to still the
   * lesson in progress? False exactly for 'closed-lesson-changed' — which is
   * what keeps a navigation-away distinguishable from a genuine close.
   */
  anchorHeld: boolean | null
  /** Was this a prerequisite detour the learner did not choose? Open/close only. */
  openedAsKnowledgeGap: boolean | null
  ts: string
}

/**
 * The same liveness test `decideExcursion` applies to the persisted state: a
 * snapshot flagged active with nothing to teach is not an excursion. Restated
 * rather than imported because it is not exported, and a measurement that
 * disagreed with the decision about what "open" means would be worse than none.
 */
const wasLive = (s: ExcursionState): boolean =>
  s.active && Boolean(s.targetConceptId || s.targetTopicTitle)

/**
 * TRANSITION 'started' IS NOT THE SAME QUESTION AS "DID AN EXCURSION OPEN".
 *
 * Found by test, not by reading: excursion.ts's request branch emits
 *
 *   transition: active && state.targetConceptId !== requestedConceptId
 *     ? 'switched' : 'started'
 *
 * so re-requesting the concept an excursion is ALREADY on yields 'started'
 * again. A retried request, or a learner simply asking twice, would then be
 * counted as a second excursion — the exact double-count that turns a rare
 * event into an epidemic. The prior PERSISTED state settles it, and it is
 * authoritative rather than a heuristic: an open is a transition INTO an
 * excursion. The behaviour is untouched; only the counting is corrected.
 */
const kindFor = (t: ExcursionTransition, priorLive: boolean): ExcursionEventKind => {
  if (t === 'started') return priorLive ? 'restate' : 'open'
  if (t === 'switched') return 'switch'
  if (t === 'continued') return 'continue'
  if (t.startsWith('closed-')) return 'close'
  return 'none'
}

/**
 * PURE. Reads the decision and the prior state; mutates neither, and returns a
 * plain object. Nothing downstream of the excursion decision reads this, so no
 * value here can change what the turn does — pinned by test.
 */
export function buildExcursionEvent(input: {
  priorState: ExcursionState
  decision: ExcursionDecision
  lessonConceptId: string | null
  sessionId: string
  subject: string
  turnReceivedAt: number
}): ExcursionEvent {
  const { priorState, decision, lessonConceptId, sessionId, subject, turnReceivedAt } = input
  const kind = kindFor(decision.transition, wasLive(priorState))
  const endsARun = kind === 'close' || kind === 'switch'
  const turnsHeld = endsARun ? priorState.turns : null

  // On a close the decision's state is NO_EXCURSION, so identity and intent
  // both come from the state that was persisted BEFORE this turn.
  const source = kind === 'close' ? priorState : decision.state

  return {
    v: 1,
    kind,
    eligible: Boolean(lessonConceptId),
    sessionId,
    turnKey: `${sessionId}:${turnReceivedAt}`,
    subject,
    lessonConceptId,
    targetConceptId: source.targetConceptId,
    targetKind: source.targetConceptId ? 'concept' : (source.targetTopicTitle ? 'topic' : null),
    transition: decision.transition,
    turnsHeld,
    turnsBlocked: kind === 'close' ? priorState.turns + 2 : null,
    atBound: kind === 'close' ? decision.transition === 'closed-turn-limit' : null,
    anchorHeld: kind === 'close'
      ? (priorState.returnToConceptId === null || priorState.returnToConceptId === lessonConceptId)
      : null,
    openedAsKnowledgeGap: kind === 'open' || kind === 'restate' || kind === 'close'
      ? (source.openedAsKnowledgeGap ?? false)
      : null,
    ts: new Date(turnReceivedAt).toISOString(),
  }
}

/**
 * One line per turn. Never throws — observability may not break a turn, the
 * same fail-open rule every function in brainMetrics.ts follows.
 */
export function recordExcursionEvent(event: ExcursionEvent): void {
  try {
    console.log(EXCURSION_EVENT_PREFIX + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
}

/** Re-exported so an aggregation query and the safety bound cannot drift apart. */
export { MAX_EXCURSION_TURNS }
