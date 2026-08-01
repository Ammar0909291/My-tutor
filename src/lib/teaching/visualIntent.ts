/**
 * WP-7 — the visual tier's two one-directional projections.
 *
 *   VisualIntent      (§7.2)  pedagogical tier → production tier   [VH-1]
 *   VisualAvailability (§7.4)  production tier → pedagogical tier  [VH-7]
 *
 * NEITHER IS A CALL. VI-1: the VisualIntent flows downward only, and the
 * production tier never returns a decision. VH-7's projection is PUBLISHED
 * upward as capability, never queried — which is what preserves ADR 12 §13's
 * leaf rule (everything calls into the visual tier; it calls into nothing).
 * Both are plain data with pure constructors here; no transport, no I/O.
 *
 * SCOPE. This module defines the projections and validates them. It does NOT
 * implement VD-1's admission test, VD-2's purpose assignment, VD-3's selection
 * funnel or VD-7's fallback ladder — those are Phase 2 stages V3/V5, which are
 * learner-visible and out of WP-7. Nothing here is wired into a rendering
 * path, so behaviour is unchanged.
 *
 * W4-2 is untouched and remains gated: no cache, no renderer, no background
 * authoring, and `ENABLE_DYNAMIC_VISUALIZATION` is neither read nor changed.
 */

// ── VD-2 · the closed purpose set (§5.3, VP-A…VP-J) ─────────────────────────
// Closed by design: a visual whose purpose is not one of these is not admitted.
export const VISUAL_PURPOSES = [
  'STRUCTURE-REVEAL',      // VP-A
  'PROCESS-TRACE',         // VP-B
  'RELATION-MAP',          // VP-C
  'QUANTITY-SENSE',        // VP-D
  'CONTRAST-DISCRIMINATE', // VP-E
  'MODEL-EXTERNALIZE',     // VP-F
  'ATTENTION-DIRECT',      // VP-G
  'MEMORY-OFFLOAD',        // VP-H
  'LEARNER-CONSTRUCT',     // VP-I
  'MANIPULATE-DISCOVER',   // VP-J
] as const
export type VisualPurpose = (typeof VISUAL_PURPOSES)[number]

/** VD-3's output: a pedagogical FORM CLASS, never a renderer. The names come
 *  from §5.4's purpose ⇒ form-class affinity table; mapping a form class to a
 *  renderer is ADR 12 §4.3's job and must not happen here. */
export const VISUAL_FORM_CLASSES = [
  'labelled-static-diagram', 'exploded-view',
  'stepped-sequence', 'animation-with-prediction-points',
  'graph-network', 'matrix',
  'plot', 'scaled-comparison', 'number-line',
  'side-by-side-minimal-pair',
  'schematic-with-named-parts',
  'annotation-overlay',
  'reference-table', 'persistent-panel',
  'blank-partial-canvas', 'sorting-surface',
  'bounded-interactive',
] as const
export type VisualFormClass = (typeof VISUAL_FORM_CLASSES)[number]

/** P06 → P07 → P08. The target rung, not the learner's current one. */
export type CpaRung = 'concrete' | 'pictorial' | 'abstract'

export interface VisualConstraints {
  /** Load ceiling. */
  maxElements?: number
  /** Set for VP-E: the contract the producer must honour, so a minimal pair
   *  teaches the boundary rather than the pair. */
  mustVaryExactlyOne?: string
  /** Claims the visual must not give away (N2). */
  mustNotReveal?: readonly string[]
  /** True only for VP-I / VP-J. */
  interactionRequired?: boolean
  /** From the accessibility profile. */
  channelsAvailable?: readonly string[]
}

export interface VisualProvenance {
  decisionId: string
  admittedBy: string
  /** Mandatory, for Phase 1's reason: a record stating only what was chosen
   *  cannot be debugged, and counterfactual analysis is impossible without it. */
  alternativesRejected: readonly string[]
  contraindicationsCleared: readonly string[]
}

/**
 * §7.2. `purpose` and `claim` are REQUIRED — a visual whose claim cannot be
 * written is not admitted (VD-2). `claim` is what makes the intent
 * self-describing: a producer can validate its output against it, and a
 * fallback can attempt the same claim in another form. `visual_type` could
 * support neither, which is why VH-1 replaces it.
 */
export interface VisualIntent {
  purpose: VisualPurpose
  /** One sentence: the proposition to be made perceptible. */
  claim: string
  formClass?: VisualFormClass
  cpaRung?: CpaRung
  constraints?: VisualConstraints
  /** VH-3. The instructional content the description MUST convey — not a
   *  label, not "present and non-empty". Carried on the intent so the
   *  producer is told what equivalence means for THIS visual rather than
   *  being left to infer it. */
  a11yRequirement?: string
  /** Decided above (VD-7), executed below. The production tier must not
   *  improvise a degradation: it lacks the pedagogical context to know which
   *  loss is acceptable. Ordered, best first. */
  fallbackContract?: readonly VisualFormClass[]
  provenance?: VisualProvenance
}

/** Structural validation only — never a pedagogical judgement. Returns the
 *  reasons an intent is malformed; empty means well-formed. */
export function validateVisualIntent(intent: VisualIntent): string[] {
  const problems: string[] = []
  if (!VISUAL_PURPOSES.includes(intent.purpose)) problems.push(`unknown purpose: ${String(intent.purpose)}`)
  if (typeof intent.claim !== 'string' || intent.claim.trim() === '') {
    problems.push('claim is required and must be non-empty — a visual whose claim cannot be written is not admitted (VD-2)')
  }
  if (intent.formClass !== undefined && !VISUAL_FORM_CLASSES.includes(intent.formClass)) {
    problems.push(`unknown form class: ${String(intent.formClass)}`)
  }
  // VP-I / VP-J are interactive by definition (§5.4).
  const interactive = intent.purpose === 'LEARNER-CONSTRUCT' || intent.purpose === 'MANIPULATE-DISCOVER'
  if (interactive && intent.constraints?.interactionRequired === false) {
    problems.push(`${intent.purpose} requires interaction; constraints.interactionRequired must not be false`)
  }
  if (!interactive && intent.constraints?.interactionRequired === true) {
    problems.push(`interactionRequired is true only for LEARNER-CONSTRUCT / MANIPULATE-DISCOVER (§7.2)`)
  }
  if (intent.purpose === 'CONTRAST-DISCRIMINATE' && !intent.constraints?.mustVaryExactlyOne) {
    problems.push('CONTRAST-DISCRIMINATE requires constraints.mustVaryExactlyOne (VP-E one-dimension discipline)')
  }
  return problems
}

/** VH-3's rule, as a checkable predicate. ADR 12 §4.5 accepted "present and
 *  non-empty"; §11.2 strengthens that to INSTRUCTIONAL EQUIVALENCE — the
 *  description must convey what the intent said the visual must convey.
 *  Structural check only: it verifies a requirement was stated and something
 *  substantive answers it. Judging real equivalence is a human/eval task and
 *  is deliberately not faked here. */
export function a11yDescriptionSatisfies(
  intent: Pick<VisualIntent, 'a11yRequirement'>,
  description: string | null | undefined,
): { satisfied: boolean; reason: string } {
  if (!intent.a11yRequirement || intent.a11yRequirement.trim() === '') {
    return { satisfied: false, reason: 'No a11yRequirement was stated on the intent — equivalence is undefined, so it cannot be met (§11.2).' }
  }
  if (!description || description.trim() === '') {
    return { satisfied: false, reason: 'Description absent or empty.' }
  }
  // The old bar. Kept explicit so the strengthening is visible rather than implied.
  const meetsOldBar = description.trim().length > 0
  const meetsNewBar = meetsOldBar && description.trim().length >= intent.a11yRequirement.trim().length
  return meetsNewBar
    ? { satisfied: true, reason: 'Description is substantive relative to the stated instructional requirement.' }
    : { satisfied: false, reason: 'Description is present but shorter than the instructional content it must convey — passes the old present-and-non-empty bar, fails instructional equivalence (§11.2).' }
}

// ── VH-7 · VisualAvailability (§7.4) ────────────────────────────────────────

/**
 * The upward projection. Carries CAPABILITY, not content.
 *
 * §7.4 enumerates what it MUST NOT contain, "because the value of the boundary
 * is entirely in what is excluded": asset ids · cache keys · renderer names or
 * the VisualRenderer enum · spec payloads · quality scores · asset counts ·
 * lifecycle status · any production identifier. Each of those would let the
 * pedagogical tier reason about ADR 12's internals, which is how the boundary
 * erodes. The projection is expressed entirely in form classes — Phase 2's own
 * vocabulary — so it says nothing the pedagogical tier does not already own.
 */
export interface VisualAvailability {
  conceptId: string
  formClassesAvailable: readonly VisualFormClass[]
  /** Deterministically producible without entering the turn's latency budget. */
  formClassesGenerableInTurn: readonly VisualFormClass[]
  projectionVersion: number
}

export const VISUAL_AVAILABILITY_VERSION = 1

/**
 * Publish an availability projection. PUBLISHED, not queried: the production
 * tier calls this to state what it can do; the pedagogical tier reads the
 * result. There is no reverse call, so the leaf rule holds by construction.
 *
 * Unknown form classes are dropped rather than passed through — leaking an
 * unrecognised string would be the first step toward leaking a renderer name.
 */
export function publishVisualAvailability(input: {
  conceptId: string
  formClassesAvailable?: readonly string[]
  formClassesGenerableInTurn?: readonly string[]
}): VisualAvailability {
  const keep = (xs: readonly string[] | undefined): VisualFormClass[] =>
    (xs ?? []).filter((x): x is VisualFormClass => (VISUAL_FORM_CLASSES as readonly string[]).includes(x))

  const available = keep(input.formClassesAvailable)
  // Generable is necessarily a subset of available: a tier cannot generate in
  // turn something it cannot produce at all.
  const generable = keep(input.formClassesGenerableInTurn).filter(f => available.includes(f))

  return {
    conceptId: input.conceptId,
    formClassesAvailable: available,
    formClassesGenerableInTurn: generable,
    projectionVersion: VISUAL_AVAILABILITY_VERSION,
  }
}

/** The empty projection — "nothing is available for this concept". Distinct
 *  from "availability is unknown", which is the absence of a projection. */
export function emptyVisualAvailability(conceptId: string): VisualAvailability {
  return {
    conceptId,
    formClassesAvailable: [],
    formClassesGenerableInTurn: [],
    projectionVersion: VISUAL_AVAILABILITY_VERSION,
  }
}
