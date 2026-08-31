/**
 * CAN THIS LESSON CLOSE AT ALL?
 *
 * ── THE DEFECT CLASS, WHICH HAS NOW RECURRED FOUR TIMES ─────────────────────
 * Mastery requires THREE graded correct answers — `correctAtCheck >= 1` plus
 * `correctAtPractice >= 2` — and `excludeProbeStem` never re-asks a spent
 * probe. So a (concept, band) holding fewer than three gradeable probes cannot
 * reach mastery. Not "rarely", not "for weak learners": arithmetically, for
 * anyone, however perfectly they answer.
 *
 * That has now been discovered FOUR separate times, each time by a person
 * noticing rather than by the system saying so:
 *
 *   2026-08-19  chemistry   0 of 186 concepts at contract — no chemistry
 *                           lesson could reach mastery. Fixed.
 *   2026-08-19  mathematics 5 (concept, band) pairs taught but never
 *                           quizzable. Fixed.
 *   2026-08-30  physics     every pair at exactly 3, so ONE wrong answer made
 *                           mastery unreachable. Fixed by probe depth.
 *   2026-08-31  english     214 of 216 pairs hold EXACTLY 2 gradeable probes
 *                           while the subject is fully live (626 ACTIVE
 *                           explanations over 216 concepts). Found by
 *                           Session B, verified here independently against
 *                           production. OUT OF SCOPE by owner instruction of
 *                           2026-08-31 — chemistry and physics first — so it
 *                           is RECORDED, not worked. Mathematics is the same
 *                           shape (0 of 47 pairs at contract) and likewise
 *                           deferred.
 *
 * Three of those four are chemistry and physics — this programme's own two
 * subjects — so the instrument earns its place regardless of what happens to
 * the other two. Four recurrences is not bad luck, it is a missing
 * instrument. The gate correctly
 * refuses to fabricate mastery, the learner correctly answers, and nothing
 * anywhere says "this could never have worked". This module says it.
 *
 * ── WHAT IT DOES, AND DELIBERATELY DOES NOT DO ──────────────────────────────
 * It REPORTS. It does not refuse to open the lesson, does not lower the
 * mastery bar, and does not synthesise a probe. Refusing to teach a concept
 * because it cannot be certified would withhold real teaching from a learner
 * over a content-inventory problem, which is worse than the defect. Teaching
 * without certification is a degraded outcome; teaching not at all is a
 * failure.
 *
 * So the fix for an unreachable concept is always to AUTHOR PROBES. This makes
 * the need visible the moment a lesson opens, instead of after someone runs a
 * sixty-concept sweep and reads the transcripts.
 */

/** `correctAtCheck >= 1` plus `correctAtPractice >= 2`. */
export const CREDITS_REQUIRED_FOR_MASTERY = 3

export interface ReachabilityInput {
  /** Gradeable probes available at the served band — closed-choice, >= 2
   *  options, one keyed answer. A short-answer or checkpoint probe is NOT
   *  gradeable by the mastery gate and must not be counted here; counting rows
   *  instead of gradeable probes is exactly how the physics shortfall was
   *  under-reported at 209 pairs when it was 415. */
  gradeableProbes: number
}

export interface Reachability {
  /** False when mastery is arithmetically impossible for ANY learner. */
  reachable: boolean
  /** How many more gradeable probes the pair needs. 0 when reachable. */
  shortfall: number
  /** Stable reason string for logs and payloads. */
  reason: 'ok' | 'insufficient-probes' | 'unknown'
}

/**
 * Pure, total, and safe on nonsense input — an unknown count reports `unknown`
 * rather than guessing in either direction. Claiming a lesson is fine when the
 * inventory is unreadable is the failure mode this exists to end.
 */
export function assessMasteryReachability(input: ReachabilityInput): Reachability {
  const n = input?.gradeableProbes
  if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) {
    return { reachable: true, shortfall: 0, reason: 'unknown' }
  }
  const have = Math.floor(n)
  if (have >= CREDITS_REQUIRED_FOR_MASTERY) {
    return { reachable: true, shortfall: 0, reason: 'ok' }
  }
  return {
    reachable: false,
    shortfall: CREDITS_REQUIRED_FOR_MASTERY - have,
    reason: 'insufficient-probes',
  }
}
