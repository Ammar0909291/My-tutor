/**
 * Blueprint Front-End — IR types (Phase 1 of the Blueprint→Brain-Compiler bridge).
 *
 * Mirrors the naming of `src/lib/brain-compiler/types.ts` deliberately: this
 * front-end produces its own AST layer (BlueprintAST) that LOWERS INTO the
 * existing compiler's `RawBlock[]` → `lowerToAST` → `emitCompiledPack` path,
 * unchanged. No new PackAST/CompiledPack/validator is defined here — only
 * `Diagnostic` is reused directly from brain-compiler so error reporting is
 * uniform across both front-ends (.bs and blueprint markdown).
 *
 * Scope (Phase 1 only, per governance): parse + validate + lower to
 * DRAFT CompiledPacks. No packRegistry activation, no serving-path change.
 */
import type { Diagnostic } from '@/lib/brain-compiler/types'

export type { Diagnostic }

export interface BlueprintSourceSpan {
  file: string
  startLine: number
  endLine: number
}

// ── Blueprint AST — one node per structured C0-C9 concern ───────────────────

export interface BlueprintMetadata {
  conceptId: string
  name: string
  difficultyRaw: string
  bloom: string
  masteryThreshold: number | null
  estimatedHours: number | null
  /** Raw, unresolved concept-id references. Validated against the KG universe
   *  by the semantic validator, not here. */
  prerequisites: string[]
  sessionCapRaw: string | null
  status: string
}

export interface BlueprintTeachingAction {
  /** e.g. "TA-1", "TA-A01" — the id as authored, not renumbered. */
  id: string
  title: string
  /** Primitive/protocol codes found in the header and/or body (e.g. "P01", "P07"). */
  primitives: string[]
  /** MC-* ids referenced anywhere in this TA's body (diagnostic dispatch, "Address MC-2", etc). */
  referencedMisconceptionIds: string[]
  span: BlueprintSourceSpan
}

export interface BlueprintMisconception {
  /** e.g. "MC-1", "MC-L-IS-OMEGA" — corpus uses both numeric and slug ids. */
  id: string
  label: string
  span: BlueprintSourceSpan
}

export interface BlueprintAST {
  conceptId: string
  sourceFile: string
  metadata: BlueprintMetadata
  teachingActions: BlueprintTeachingAction[]
  misconceptions: BlueprintMisconception[]
  /** Section titles actually found (for diagnostics / coverage reporting). */
  sectionsFound: string[]
  span: BlueprintSourceSpan
}

export interface ParseResult {
  ast: BlueprintAST | null
  diagnostics: Diagnostic[]
}

// ── Semantic validation context ──────────────────────────────────────────────

export interface SemanticValidationContext {
  /** The known-good concept-id universe (e.g. from the subject KG). Prerequisite
   *  checks are skipped (not silently passed) when this is omitted. */
  knownConceptIds?: Set<string>
  /** conceptId → its prerequisite conceptIds, for cycle detection across the
   *  batch being compiled (and any already-loaded corpus passed in). */
  prerequisiteGraph?: Map<string, string[]>
}

// ── Draft package — the Phase 1 output shape ─────────────────────────────────

import type { CompiledPack } from '@/lib/brain-compiler/types'

export type DraftPackStatus = 'DRAFT'

export interface DraftCompiledPack {
  status: DraftPackStatus
  pack: CompiledPack
  /** The blueprint this pack was compiled from. */
  sourceConceptId: string
  sourceFile: string
}

export interface BlueprintCompileResult {
  ok: boolean
  draftPack: DraftCompiledPack | null
  diagnostics: Diagnostic[]
}
