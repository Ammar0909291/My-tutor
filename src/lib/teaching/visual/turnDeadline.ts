/**
 * ONE DEADLINE FOR THE WHOLE ATTEMPT.
 *
 * ── THE PROBLEM ─────────────────────────────────────────────────────────────
 * Generation had a budget and the judge had a budget, and they were
 * independent. Two 'safe' bounds compose into an unsafe one: 8s + 5s is a 13s
 * worst case, on a turn where a learner is watching a chat window, for a
 * picture that is an enhancement rather than the lesson.
 *
 * A learner does not experience stages. They experience the wait. So the bound
 * has to be on the thing they experience — the whole attempt, from the decision
 * to draw through validation to the judge's answer.
 *
 * ── HOW IT BEHAVES ──────────────────────────────────────────────────────────
 * The deadline is set once and consulted between stages. Each stage is given
 * only the time that remains, so a slow generation eats into the judge's share
 * rather than adding to it. When time runs out at any point the answer is NO
 * FIGURE and the lesson continues as text — which this engine already treats as
 * an ordinary successful outcome, so there is no separate failure path to get
 * wrong.
 *
 * NOTHING IS SERVED HALF-CHECKED. Running out of time before the judge answers
 * does not serve the unjudged figure; it abandons it. The generation itself is
 * not cancelled — an HTTP request cannot be un-sent — so whatever it produces
 * still reaches the cache for the next learner, who will not have to wait for
 * it. That is the one thing the timeout leaves behind, and it is a gift rather
 * than a leak.
 */

/**
 * The total a learner may wait for a figure.
 *
 * Chosen against measurement, not taste: generation runs 0.5-4.2s and the judge
 * 0.5-1.5s on gemini-3.5-flash-lite, so this accommodates the ordinary case
 * with room, and abandons the tail. The tail is exactly what should be
 * abandoned — a figure arriving after the learner has read the answer is worse
 * than no figure, because it arrives attached to a claim that it is on screen.
 */
export const TURN_FIGURE_BUDGET_MS = 9000

export interface Deadline {
  /** Milliseconds left, never negative. */
  remaining(): number
  /** True once nothing may be started. */
  expired(): boolean
}

export function startDeadline(
  totalMs: number = TURN_FIGURE_BUDGET_MS,
  now: () => number = Date.now,
): Deadline {
  const startedAt = now()
  return {
    remaining: () => Math.max(0, totalMs - (now() - startedAt)),
    expired: () => now() - startedAt >= totalMs,
  }
}

/**
 * A deadline that never expires, for the offline vetting pass where nobody is
 * waiting and abandoning a slow provider would only waste the call.
 */
export const NO_DEADLINE: Deadline = { remaining: () => 0, expired: () => false }

/**
 * The budget to hand a stage.
 *
 * `NO_DEADLINE` reports 0 remaining, which every stage in this engine reads as
 * "no clock" — so the unlimited case and the just-expired case must never be
 * confused. Callers check `expired()` before starting a stage; this only sizes
 * one that is going to run.
 */
export function budgetFor(deadline: Deadline): number {
  return deadline.remaining()
}
