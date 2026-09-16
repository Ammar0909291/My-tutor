/**
 * Deterministic Physics Verifier — per-concept dimension bindings.
 *
 * Types only, per DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md §5.2 and §6 row 0
 * ("Dimension algebra + parser, unconsumed"). Populating CONCEPT_DIMENSION_BINDINGS
 * with real concept data is Batch 2 — this file intentionally ships an empty
 * registry.
 *
 * Bindings are per-concept, never global, because the same symbol names
 * different physical quantities across concepts (§4.3): T is period in SHM,
 * tension in statics, temperature in thermodynamics; μ is permeability in
 * electromagnetism, coefficient of friction in mechanics, linear mass density
 * in waves. A single global symbol table cannot represent this.
 */

// Dimension is defined in dimensions.ts (the algebra module) and re-exported
// here rather than redeclared, so there is exactly one definition to drift.
export type { Dimension } from './dimensions'

import type { Dimension } from './dimensions'

/**
 * One canonical rendering of an equation as authored/expected for a concept,
 * paired with a human-readable gloss. Not consumed by anything this batch —
 * carried in the type so Batch 2+ has a place to put corpus text without a
 * second type-shape decision later.
 */
export interface ConceptCanonicalEquation {
  readonly text: string
  readonly gloss: string
}

/**
 * Per-concept binding: which Dimension each symbol used in that concept's
 * equations denotes, plus the canonical equation forms the concept teaches.
 */
export interface ConceptDimensionBinding {
  readonly conceptId: string
  readonly symbols: Readonly<Record<string, Dimension>>
  readonly canonical: ReadonlyArray<ConceptCanonicalEquation>
}

/**
 * Registry of concept bindings, keyed by KG concept id (e.g. "phys.mech.newtons-second-law").
 * Intentionally empty this batch — see file header.
 */
export const CONCEPT_DIMENSION_BINDINGS: Readonly<Record<string, ConceptDimensionBinding>> = {}
