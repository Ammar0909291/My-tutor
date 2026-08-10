/**
 * SERVICE POLICY — how far a generated figure is trusted, per concept.
 *
 * WHY THIS EXISTS. Until now the only control over runtime generation was a
 * single exact-match allowlist: a concept was either invisible or live to
 * learners, with nothing in between. That is not a control you can widen to a
 * thousand concepts — to reach them you would type a thousand ids, and the
 * first mistake ships an unreviewed figure to a child.
 *
 * WHAT THE FIRST REAL MEASUREMENT CHANGED (2026-08-10, 12 calls against
 * gemini-3.5-flash-lite). The assumption behind "review everything" was that
 * the validator would let bad figures through. Measured, the opposite is true:
 * the validator's false-ACCEPT rate on a 7-concept sample was 0, while its
 * false-REJECT rate is high enough that it rejected 7 of 7 of this repository's
 * own authored gold-standard figures before the anchor rule was corrected, and
 * still rejects 3 of them.
 *
 * So the policy this file expresses is not "trust nothing". It is "decide, per
 * concept, how much evidence is required before a learner sees this" — and,
 * crucially, keep the REJECTIONS, because a rejection today tells you as much
 * about the rule as about the generator.
 *
 * Pure and synchronous. No I/O, no model, no database.
 */

import { isRuntimeSceneGenerationAllowed, runtimeSceneAllowlist } from './flag'

/**
 * OFF       generation is not attempted at all.
 * REVIEWED  generate and persist as DRAFT; a human promotes it before any
 *           learner sees it. Nothing is served on this policy alone.
 * AUTO      generate, validate, serve. Reserved for concepts where the
 *           evidence already exists.
 */
export type ServicePolicy = 'off' | 'reviewed' | 'auto'

/**
 * Concepts whose generated figures may be served without review.
 *
 * A SEPARATE list from the eligibility allowlist, deliberately. Widening
 * eligibility and granting auto-serve are different decisions with different
 * blast radii, and one env var that did both would make the safer of the two
 * impossible to express.
 *
 * Same matching rules as the allowlist: exact after trimming, no wildcard, no
 * prefix, no regex. An empty or unset list means "nothing auto-serves" and
 * never "everything does".
 */
export function autoServeList(): ReadonlySet<string> {
  const raw = process.env.VISUAL_AI_SCENE_AUTO
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
 * The policy for one concept.
 *
 * ELIGIBILITY IS STILL THE MASTER GATE. `isRuntimeSceneGenerationAllowed`
 * already requires ENABLE_AI_SCENE_GENERATION==='true' AND membership of the
 * allowlist, and it is consulted before the cache — so switching the flag off
 * or removing a concept stops serving figures that were already generated.
 * That property is preserved exactly: a concept that is not eligible is 'off',
 * whatever the auto list says.
 *
 * NOTE ON THE UPGRADE PATH. Before this file, an allowlisted concept was
 * generated AND served. It is now generated and held as DRAFT unless it also
 * appears in the auto list. That is a deliberate tightening, and it changes
 * nothing today because the allowlist is empty and the flag is unset — but if
 * you enable generation expecting the old behaviour, name the concepts in
 * VISUAL_AI_SCENE_AUTO as well.
 */
export function resolveServicePolicy(conceptId: string | null | undefined): ServicePolicy {
  if (!isRuntimeSceneGenerationAllowed(conceptId)) return 'off'
  return autoServeList().has((conceptId ?? '').trim()) ? 'auto' : 'reviewed'
}

/** True when a figure generated under this policy may reach a learner now. */
export function servesImmediately(policy: ServicePolicy): boolean {
  return policy === 'auto'
}

/**
 * Every concept currently eligible, with its policy. For an operator surface
 * that has to answer "what is generation doing right now?" without guessing
 * from two env vars.
 */
export function generationPolicySummary(): { conceptId: string; policy: ServicePolicy }[] {
  return [...runtimeSceneAllowlist()]
    .sort()
    .map((conceptId) => ({ conceptId, policy: resolveServicePolicy(conceptId) }))
}
