/**
 * SERVICE POLICY — what may be done with a generated figure.
 *
 * ── WHAT THIS USED TO SAY ───────────────────────────────────────────────────
 * Two hand-typed lists: one deciding which concepts could be generated for, a
 * second deciding which of those could be served. Both clerical, both requiring
 * someone to have thought about a topic in advance. That is a canary's shape,
 * and the engine is not a canary any more — eligibility is now a rule
 * (`flag.ts` + grounding + budgets) and quality is a measurement
 * (`figureCritic.ts`).
 *
 * ── WHAT A PASS MEANS, EXACTLY ──────────────────────────────────────────────
 * A critic PASS makes a figure ELIGIBLE TO SERVE from the vetted cache. It does
 * NOT make it proven, and it does NOT promote it to ACTIVE. Those are different
 * claims and conflating them would quietly convert one model's opinion into the
 * platform's authored content:
 *
 *   serving   this figure passed five checks on this date, and a learner may
 *             see it while that remains true
 *   ACTIVE    a human decided this is our content
 *
 * Only the review lifecycle produces the second. Nothing in this engine
 * promotes to ACTIVE on its own, at any confidence, ever.
 *
 * FAIL, UNSURE, a timeout, an unreachable judge — all of them mean no figure,
 * and the lesson continues in text.
 *
 * Pure and synchronous. No I/O, no model, no database.
 */

import { isRuntimeSceneGenerationAllowed, runtimeSceneAllowlist, isGenerationKilled } from './flag'

/**
 * OFF       generation is not attempted at all.
 * REVIEWED  generate and persist as DRAFT; nothing is served until a human
 *           promotes it. Opt-in per concept, for topics somebody wants to see
 *           personally before learners do.
 * AUTO      generate, validate, judge, and serve what the critic promotes.
 *           The default — and still not a promotion to ACTIVE.
 */
export type ServicePolicy = 'off' | 'reviewed' | 'auto'

/**
 * Topics held back for a human, whatever the critic says.
 *
 * The INVERSE of the list this file used to carry. It exists for the case where
 * someone wants to inspect a particular topic's figures first — a sensitive
 * subject, or one that produced something odd — not for the ordinary path.
 * Empty, the normal state, means nothing is held back.
 *
 * Exact match after trimming, no wildcards: a hold list that widens by typo
 * would silently disable the engine for a whole subject.
 */
export function reviewOnlyList(): ReadonlySet<string> {
  const raw = process.env.VISUAL_AI_SCENE_REVIEW_ONLY
  if (!raw || !raw.trim()) return EMPTY
  const out = new Set<string>()
  for (const entry of raw.split(',')) {
    const id = entry.trim()
    if (id) out.add(id)
  }
  return out
}

const EMPTY: ReadonlySet<string> = new Set()

/**
 * The policy for one topic.
 *
 * Eligibility remains the master gate and is still consulted BEFORE the cache,
 * so throwing the kill switch stops figures that were already generated rather
 * than merely future ones.
 */
export function resolveServicePolicy(conceptId: string | null | undefined): ServicePolicy {
  if (!isRuntimeSceneGenerationAllowed(conceptId)) return 'off'
  return reviewOnlyList().has((conceptId ?? '').trim()) ? 'reviewed' : 'auto'
}

/**
 * True when the POLICY permits serving a figure now.
 *
 * Permits — the critic still has to promote it, and the budgets still have to
 * allow the attempt. This answers only "is holding for review required here",
 * never "has this figure earned a learner's screen".
 */
export function servesImmediately(policy: ServicePolicy): boolean {
  return policy === 'auto'
}

/**
 * What generation is doing right now, for an operator who should not have to
 * infer it from environment variables. With no narrowing the answer is "any
 * topic that clears grounding and budget", which is a rule and not a list, so
 * it is described rather than enumerated.
 */
export function generationPolicySummary(): {
  scope: 'rule-based' | 'narrowed' | 'disabled'
  narrowedTo: string[]
  heldForReview: string[]
} {
  const narrowedTo = [...runtimeSceneAllowlist()].sort()
  const heldForReview = [...reviewOnlyList()].sort()
  const scope = isGenerationKilled() ? 'disabled' : narrowedTo.length > 0 ? 'narrowed' : 'rule-based'
  return { scope, narrowedTo, heldForReview }
}
