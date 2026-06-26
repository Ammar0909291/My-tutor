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
