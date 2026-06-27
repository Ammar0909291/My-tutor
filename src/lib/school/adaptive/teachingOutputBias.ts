/**
 * Teaching Strategy Engine — advisory output bias (see docs/TEACHING_ENGINE_SPEC.md).
 *
 * The chat route already computes ONE unified TeachingStrategy per turn
 * (getTeachingStrategy / determineStrategy, ./teachingStrategy.ts) and injects it
 * into the prompt — but the strategy object never reaches the post-AI visual/scene
 * output pipeline. This module is the missing, PURE link: it maps the already-chosen
 * strategy type to an advisory bias the route casts over the deterministic visual
 * candidate that pipeline already produced.
 *
 * Strictly pure: no LLM, no DB, no I/O, no new persisted data. It only reads fields
 * that already exist on TeachingStrategyType and on the VisualSpec the pipeline holds.
 * The route applies the bias additively and degrades to today's behavior on any error.
 */

import type { TeachingStrategyType } from './teachingStrategy'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/** Advisory bias the active strategy casts over the (already-produced) output candidate. */
export type OutputBiasKind = 'PROMOTE' | 'SUPPRESS_OPTIONAL' | 'NEUTRAL'

export interface OutputBias {
  kind: OutputBiasKind
  /** Human-readable justification (for logs / optional debug payload). */
  reason: string
}

// Strategy → bias mapping, verbatim from the spec's Section 4 table. PROMOTE for
// strategies where a visual genuinely aids the teaching move (rebuild/repair);
// SUPPRESS_OPTIONAL for pacing/confidence strategies where an unrequested,
// non-interactive diagram is noise; NEUTRAL keeps today's keyword-only behavior.
const STRATEGY_BIAS: Record<TeachingStrategyType, OutputBias> = {
  FOUNDATION_REBUILD:    { kind: 'PROMOTE',          reason: 'FOUNDATION_REBUILD → first-principles teaching benefits from a supporting visual' },
  MISCONCEPTION_REPAIR:  { kind: 'PROMOTE',          reason: 'MISCONCEPTION_REPAIR → a contrast visual aids correcting the wrong mental model' },
  MOMENTUM_RECOVERY:     { kind: 'SUPPRESS_OPTIONAL', reason: 'MOMENTUM_RECOVERY → keep low-momentum turns light; drop optional visuals' },
  CONFIDENCE_CORRECTION: { kind: 'SUPPRESS_OPTIONAL', reason: 'CONFIDENCE_CORRECTION → an unrequested optional diagram is noise while probing reasoning' },
  APPLICATION_FOCUS:     { kind: 'NEUTRAL',          reason: 'APPLICATION_FOCUS → keep default keyword-driven output behavior' },
  CONFIDENCE_BUILDING:   { kind: 'SUPPRESS_OPTIONAL', reason: 'CONFIDENCE_BUILDING → reassurance turns stay focused; drop optional visuals' },
  ACCELERATED_GROWTH:    { kind: 'NEUTRAL',          reason: 'ACCELERATED_GROWTH → brisk pace; keep default output behavior' },
}

/**
 * Map the already-selected teaching strategy to an advisory output bias. Pure and
 * total over TeachingStrategyType; falls back to NEUTRAL for any unexpected value.
 */
export function deriveOutputBias(strategy: TeachingStrategyType): OutputBias {
  return STRATEGY_BIAS[strategy] ?? { kind: 'NEUTRAL', reason: 'unknown strategy → neutral' }
}

/**
 * Is a detected 2D visual OPTIONAL — i.e. safe for SUPPRESS_OPTIONAL to drop?
 *
 * OPTIONAL ⟺ the visual is NOT interactive AND carries NO `challenge` payload.
 * (The spec phrases this as `interactive === false`; the field is `boolean | undefined`
 * on VisualSpec, so "not interactive" is `interactive !== true` to also treat an absent
 * flag as non-interactive.) A visual that is interactive OR carries a `challenge` is
 * REQUIRED — interaction/assessment-critical — and is never dropped.
 *
 * Reads only fields already present on VisualSpec; no I/O, no new data.
 */
export function isOptionalVisual(spec: VisualSpec | null | undefined): boolean {
  if (!spec) return false // no visual at all → nothing to suppress
  const s = spec as { interactive?: boolean; challenge?: unknown }
  return s.interactive !== true && s.challenge == null
}

/**
 * Is the LLM's own free-text `VISUAL:<type>` tag OPTIONAL — i.e. safe for
 * SUPPRESS_OPTIONAL to drop?
 *
 * Unlike a `VisualSpec`, this tag carries no `interactive`/`challenge` payload at
 * all — it is purely the model's own suggestion that a visual would help, with no
 * structural guarantee it is assessment- or interaction-critical. That makes it
 * ALWAYS optional whenever it is present: there is no signal on this tag that could
 * ever justify treating it as REQUIRED. So this is simpler than `isOptionalVisual`
 * (no field to inspect) but follows the identical "OPTIONAL" contract the route's
 * SUPPRESS_OPTIONAL branch already relies on.
 */
export function isOptionalVisualTag(visual: string | null | undefined): boolean {
  return typeof visual === 'string' && visual.trim().length > 0
}

/**
 * Is a turn's inline-practice MCQ (generateInlinePractice.ts) OPTIONAL — i.e.
 * safe for SUPPRESS_OPTIONAL to skip generating entirely?
 *
 * The route only ever generates this question under one of two triggers:
 *  - the strategy is APPLICATION_FOCUS — a deliberate pedagogical choice to
 *    practice right now, so the question is REQUIRED regardless of staleMate.
 *  - staleMate alone (any other strategy type) — the question exists purely
 *    because the strategy-effectiveness reader flagged a stalemate, not
 *    because the active strategy called for one. That makes it OPTIONAL: a
 *    MOMENTUM_RECOVERY/CONFIDENCE_BUILDING/CONFIDENCE_CORRECTION turn that
 *    wants to keep things light shouldn't also have an unrequested quiz
 *    layered on top just because a stalemate was detected.
 */
export function isOptionalInlinePractice(strategy: TeachingStrategyType, staleMate: boolean): boolean {
  if (strategy === 'APPLICATION_FOCUS') return false
  return staleMate
}

/**
 * Is a detected `sceneSpec` (rule-based, parametric, or free-form 3D scene —
 * audit items #3/#4/#5) REQUIRED — i.e. never safe for SUPPRESS_OPTIONAL to
 * drop?
 *
 * Unlike `VisualSpec`, `SceneSpec` carries no `interactive`/`challenge`
 * field at all (confirmed against `src/lib/teaching/sceneSpec.ts`), so there
 * is no structural signal to distinguish a "deliberate" 3D scene from an
 * incidental one — inventing one would be guessing, not implementing. The
 * deliberate policy here is the opposite default from `VisualSpec`: a scene
 * only ever reaches this point after the deterministic 2D pipeline found
 * nothing AND (for the parametric/free-form paths) an explicit feature flag
 * is on, so by construction it is never an incidental, drive-by output —
 * treat it as always REQUIRED and never suppress it. This closes the bias
 * module's blind spot for `sceneSpec` (it previously wasn't inspected at
 * all) without fabricating new SceneSpec semantics.
 */
export function isRequiredSceneSpec(spec: SceneSpec | null | undefined): boolean {
  return spec != null
}

/** Advisory bias on whether the tutor should reach for a `[HINT]` tag this turn. */
export type HintBiasKind = 'PREFERRED' | 'SUPPRESSED' | 'NEUTRAL'

// Strategy → hint bias. There is no SOCRATIC/SCAFFOLDED/DIRECT_INSTRUCTION
// strategy type in this codebase (TeachingStrategyType has exactly the 7
// values above) — this maps onto the closest existing analogues, grounded
// in each strategy's own STRATEGY_ACTION_DIRECTIVE text in teachingStrategy.ts:
//   PREFERRED  — the strategy's directive already withholds the full answer
//                in favour of a hint or probing question:
//                MOMENTUM_RECOVERY ("Give only one small hint. Do not solve it."),
//                MISCONCEPTION_REPAIR ("Ask the student to explain their
//                reasoning before you correct anything."),
//                CONFIDENCE_CORRECTION ("Open with a real-world analogy
//                first" + tutorInstructions' "what if"/"why" probing).
//   SUPPRESSED — CONFIDENCE_BUILDING is the one strategy whose own directive
//                is the literal opposite of a hint: "Explain directly and
//                clearly. No questions." — the closest existing analogue to
//                a DIRECT_INSTRUCTION strategy.
//   NEUTRAL    — every other strategy: hints are neither pushed nor blocked.
const HINT_BIAS: Record<TeachingStrategyType, HintBiasKind> = {
  FOUNDATION_REBUILD:    'NEUTRAL',
  MISCONCEPTION_REPAIR:  'PREFERRED',
  MOMENTUM_RECOVERY:     'PREFERRED',
  CONFIDENCE_CORRECTION: 'PREFERRED',
  APPLICATION_FOCUS:     'NEUTRAL',
  CONFIDENCE_BUILDING:   'SUPPRESSED',
  ACCELERATED_GROWTH:    'NEUTRAL',
}

/** Map the active teaching strategy to an advisory hint bias. Pure and total. */
export function deriveHintBias(strategy: TeachingStrategyType): HintBiasKind {
  return HINT_BIAS[strategy] ?? 'NEUTRAL'
}
