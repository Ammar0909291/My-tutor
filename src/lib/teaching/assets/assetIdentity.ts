// W1-4 (ADR 14 Phase 1): Type-only companion for the Knowledge Asset schema.
//
// Re-exports Prisma-generated enums so callers import from one place.
// Defines TypeScript-only discriminator types (ExplanationKind, ProbeKind)
// and the ProbeChoice interface stored as JSONB in ProbeAsset.choices.
//
// No readers, no writers, no retrieval. Tables are empty after this batch.
// Phase 2 wires ingestion; Phase 3 wires retrieval (Wave 2 items).

export {
  AssetFamily,
  AssetStatus,
  AuthorKind,
  ExplanationStyle,
  VisualRenderer,
  ProbeDifficulty,
  GradeBand,
} from '@prisma/client'

// familyKind discriminator values for the Explanation family (ADR 14 §4.2)
export type ExplanationKind =
  | 'definition'
  | 'core_explanation'
  | 'worked_example'
  | 'hint_tier_1'
  | 'hint_tier_2'
  | 'hint_tier_3'
  | 'misconception_repair'
  | 'prerequisite_recovery'

// familyKind discriminator values for the Probe family (ADR 14 §4.4)
export type ProbeKind =
  | 'mcq'
  | 'true_false'
  | 'short_answer'
  | 'numeric'
  | 'step_check'
  | 'misconception_probe'
  | 'checkpoint'

// Typed shape of each element in ProbeAsset.choices (stored as JSONB)
export interface ProbeChoice {
  text: string
  isCorrect: boolean
  misconceptionId?: string  // if wrong: which misconception does this distractor trigger?
}
