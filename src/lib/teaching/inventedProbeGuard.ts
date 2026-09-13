/**
 * THE MODEL DOES NOT GET TO ASK THE GRADED QUESTION WHEN A REVIEWED ONE EXISTS.
 *
 * ── THE MEASURED FAILURE, TWICE ─────────────────────────────────────────────
 * `phys.mech.friction` holds FIVE authored, reviewed, gradeable probes. Across
 * two sessions studied as a learner on a real account (2026-09-01), the model
 * wrote THREE incline items of its own and every one of them was broken:
 *
 *   run 1  "5 kg block, 30° incline, μ_s = 0.5, max static friction?"
 *          A) 5 N  B) 12.5 N  C) 25 N  D) 49 N       keyed B
 *          μ·mg·cos30 = 21.2 N. The keyed 12.5 is μ·mg·SIN30. Correct answer
 *          not among the options.
 *
 *   run 2  "4 kg block, 30° incline, μ_s = 0.3, max static friction?"
 *          A) 4.5 N  B) 7.9 N  C) 12.0 N  D) 15.0 N  keyed B
 *          μ·mg·cos30 = 10.4 N. Correct answer not among the options. The
 *          learner tapped 7.9 and was told "That's right."
 *
 *   run 2  the same item again, prose-only, with no tag at all — so it could
 *          not even be graded.
 *
 * Three for three. `gradeMcqAnswer` reads `correctIndex` as ground truth, so a
 * model-invented key is graded exactly as confidently as a reviewed one.
 * `unauthoredKeyGrades` stops such a grade CERTIFYING; it cannot stop the
 * learner being told they are wrong when they are right. The only way to do
 * that is not to ask the question.
 *
 * ── WHY THE EXISTING PREFERENCE WAS NOT ENOUGH ──────────────────────────────
 * route.ts already prefers the gate's probe: `mcqHoisted = gateMcqHoisted ??
 * mcqParse.mcq`, with a comment naming this exact danger — taking the model's
 * "would put an unreviewed item at the exact rung where a wrong answer key
 * costs the learner their progress." That preference only helps on turns where
 * the gate SUPPLIES a probe. On every other turn the `??` falls straight
 * through to the model's item, and that is where all three defects landed.
 *
 * ── THE RULE, AND WHY IT NEEDS NO NEW DATABASE QUERY ────────────────────────
 * The gate publishes its own decision as eight named terms, and they split
 * into two kinds:
 *
 *   POLICY — the server decided no question attaches this turn:
 *     phaseAllowsProbe · probeAttachablePhase · noUnansweredProbeOnScreen ·
 *     notFirstLesson · notExcursion · arbitrationAllowsProbe · notClosingTurn
 *
 *   CAPABILITY — `hasMemoryState`. The gate cannot look a probe up at all.
 *     This says NOTHING about whether authored probes exist.
 *
 * So: when the gate ran, `probe !== null` tells us directly whether authored
 * probes are available. When it declined on POLICY, the server has already
 * ruled out a question this turn and the model must not override that with an
 * item of its own. Only the capability gap leaves us genuinely ignorant, and
 * there behaviour is unchanged.
 *
 * ── WHAT IS DELIBERATELY NOT DONE ───────────────────────────────────────────
 * When no authored probe exists at all, the model's question is still served.
 * Withholding it would leave concepts below the asset contract with no
 * assessment whatsoever, and `masteryReachability` already states the position
 * this codebase takes on that: "teaching without certification is a degraded
 * outcome; teaching not at all is a failure." An imperfect question beats
 * silence when there is no alternative; it does not beat a reviewed one.
 */

export type ModelProbeVerdict =
  /** Below GUIDE: an invented key cannot reach the record here, and silencing
   *  the model would only make the lesson passive. */
  | 'phase-does-not-count'
  /** The gate supplied an authored probe; the model's is moot. */
  | 'authored-served'
  /** The model offered nothing to withhold. */
  | 'no-model-probe'
  /** This exact question (fingerprint-matched) was already asked this
   *  lesson — see `modelProbeAlreadyAsked`'s own doc comment. */
  | 'model-probe-already-asked'
  /** Authored probes exist for this concept — the reviewed item wins. */
  | 'authored-probes-exist'
  /** The server ruled out a question this turn; the model may not override. */
  | 'gate-declined-by-policy'
  /** Nothing reviewed is available; an imperfect question beats silence. */
  | 'served-no-alternative'

export interface ModelProbeDecision {
  /** Serve the model's own MCQ tag as this turn's graded question? */
  serve: boolean
  reason: ModelProbeVerdict
}

export interface ModelProbeInput {
  /**
   * Is this a phase where a question would actually COUNT — GUIDE or a mastery
   * gate (`isProbeAttachablePhase`, in its original un-widened sense)?
   *
   * MEASURED, and it is a correction to this module's first version. Across
   * three lessons studied as a learner on 2026-09-01, EVERY withhold fired
   * with `gate-declined-by-policy` at OBSERVE or DEMONSTRATE — never once at a
   * phase where the key could reach the record. The harm this guard exists for
   * is a wrong key CORRUPTING MASTERY; below GUIDE a correct answer advances
   * the rung and increments no counter, so an invented question there cannot
   * do that harm, and suppressing it only makes the lesson passive.
   *
   * route.ts's own gate says this in as many words, one screen from where this
   * is read: widening the withhold to DEMONSTRATE is "a different change, with
   * a real risk of making lessons passive (blueprint 7), which must be
   * measured on its own rather than smuggled in beside this one." The first
   * version of this guard smuggled it in beside this one. This is the undo.
   */
  probeWouldCountThisPhase: boolean
  /** The gate produced an authored MCQ for this turn. */
  gateServedAuthoredProbe: boolean
  /** The model emitted a parseable `<!--MCQ-->` tag. */
  modelOfferedProbe: boolean
  /**
   * Does this concept have an authored probe available right now?
   * `true`/`false` when the gate actually ran the selector; `null` when it did
   * not, which is genuine ignorance and must not be read as "no".
   */
  authoredProbesExist: boolean | null
  /** The gate was ineligible for at least one POLICY reason (never for the
   *  capability gap alone). */
  gateDeclinedByPolicy: boolean
  /**
   * Does the model's OWN offered question (fingerprint-matched, the exact
   * same test `excludeProbeStem` already applies to AUTHORED probe
   * selection — `hasAskedMcq`/`memoryFingerprint`, reused, not re-derived)
   * match something already asked this lesson?
   *
   * ── THE GAP THIS CLOSES ──────────────────────────────────────────────────
   * `excludeProbeStem` (route.ts, the gate's own authored-probe selector)
   * already guarantees a fresh probe every time — but only for probes drawn
   * from `AUTHORED_PROBES`. It is never consulted for a MODEL-WRITTEN tag,
   * because that path does not go through selection at all: the model
   * writes its own `<!--MCQ-->` (or, since the JSON-fallback fix, a raw
   * JSON-shaped one) straight into its reply.
   *
   * MEASURED (real-student session, 2026-09, live production, Rhetorical
   * Appeals — a concept with a real gap in authored coverage, so
   * `authoredProbesExist` was not `true` and this guard's existing rules
   * let the model's own item through): the model confirmed a just-graded
   * correct answer ("That's right.") and, IN THE SAME REPLY, wrote out the
   * identical bike-lane/pathos question it had asked two turns earlier —
   * word for word, including both option texts — evidently recalled from
   * its own recent context rather than freshly composed. Nothing checked
   * whether this "new" question was actually new.
   *
   * Optional and defaulting to false, so every existing caller and every
   * existing test — none of which had a duplicate to report — keeps its
   * exact prior behaviour.
   */
  modelProbeAlreadyAsked?: boolean
}

export function decideModelProbe(input: ModelProbeInput): ModelProbeDecision {
  if (input.gateServedAuthoredProbe) return { serve: false, reason: 'authored-served' }
  if (!input.modelOfferedProbe) return { serve: false, reason: 'no-model-probe' }
  // Asking the identical question again is never useful, in ANY phase —
  // checked before the phase gate below, which exists for a different
  // reason (a wrong invented KEY cannot corrupt mastery below GUIDE) that
  // has nothing to do with whether the QUESTION itself is a repeat.
  if (input.modelProbeAlreadyAsked) return { serve: false, reason: 'model-probe-already-asked' }
  // Scoped to where the harm is. See probeWouldCountThisPhase.
  if (!input.probeWouldCountThisPhase) return { serve: true, reason: 'phase-does-not-count' }
  // Ordered so the STRONGEST evidence decides first: knowing a reviewed item
  // is available beats inferring from the gate's refusal.
  if (input.authoredProbesExist === true) return { serve: false, reason: 'authored-probes-exist' }
  if (input.gateDeclinedByPolicy) return { serve: false, reason: 'gate-declined-by-policy' }
  return { serve: true, reason: 'served-no-alternative' }
}

/**
 * Was the gate's refusal a POLICY decision rather than the capability gap?
 *
 * Takes the gate's own terms object so the two can never drift: a term added
 * to the gate is treated as policy by default, which is the safe direction —
 * a new reason the server says "no question" should also silence the model.
 * `hasMemoryState` is named explicitly because it is the only term that means
 * "cannot look up" rather than "must not attach".
 */
export function gateRefusedOnPolicy(terms: Record<string, boolean>): boolean {
  const entries = Object.entries(terms)
  if (entries.length === 0) return false
  if (entries.every(([, v]) => v)) return false // eligible; nothing refused
  return entries.some(([k, v]) => k !== 'hasMemoryState' && !v)
}
