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
  /** Verbatim TA body text, when the extraction shape captured it (the
   *  primary "### TA-x — Title" shape does; several structural fallback
   *  shapes — bracket lines, table rows, grammar stanzas — do not, since
   *  their "body" is just the routing line itself, already fully captured
   *  by title/primitives/referencedMisconceptionIds). Asset lowering uses
   *  this to recover content embedded INSIDE a named TA (e.g. a worked
   *  example authored as "### TA-A02 — Worked Example Pair: …") rather than
   *  under its own dedicated top-level section. */
  body?: string
}

export interface BlueprintMisconception {
  /** e.g. "MC-1", "MC-L-IS-OMEGA" — corpus uses both numeric and slug ids. */
  id: string
  label: string
  /** Phase 1.5: the full authored block body (probe, bridge, replacement …)
   *  verbatim — asset lowering preserves it rather than lossily re-parsing. */
  body: string
  span: BlueprintSourceSpan
}

/** A raw section as authored (Phase 1.5): kept on the AST so the asset
 *  lowering layer can work from the AST alone, without re-reading source. */
export interface BlueprintSection {
  title: string
  body: string
  startLine: number
}

export interface BlueprintAST {
  conceptId: string
  sourceFile: string
  metadata: BlueprintMetadata
  teachingActions: BlueprintTeachingAction[]
  misconceptions: BlueprintMisconception[]
  /** Section titles actually found (for diagnostics / coverage reporting). */
  sectionsFound: string[]
  /** Phase 1.5: full raw sections (title + body), input to asset lowering. */
  sections: BlueprintSection[]
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

// ═════════════════════════════════════════════════════════════════════════════
// Phase 1.5 — Knowledge Compilation Layer (AssetAST + Educational Package)
// ═════════════════════════════════════════════════════════════════════════════
//
// The Rule Layer above answers "what should the engine DO"; the Knowledge
// Layer answers "what does the tutor KNOW about this concept". Asset kinds
// deliberately align with the existing runtime asset vocabulary
// (`ExplanationKind`/`ProbeKind` in src/lib/teaching/assets/assetIdentity.ts)
// so a later phase can ingest these into the AssetIdentity tables without a
// vocabulary translation step. Nothing here touches CompiledPack — the
// Educational Package WRAPS the untouched rule pack alongside the assets.

/** Closed set for Phase 1.5 — textual knowledge only. Diagram/animation/
 *  simulation kinds are deliberately NOT members yet; they arrive via the
 *  extensionPoints surface below when ADR-12-side work lands. */
export type AssetKind =
  | 'core_explanation'
  | 'worked_example'
  | 'misconception'
  | 'teaching_note'
  | 'teaching_action_meta'
  | 'mastery_probe'
  | 'adaptive_rule'
  | 'session_flow'
  | 'learning_objective'
  | 'reference'

export interface AssetNode {
  /** Deterministic, stable id: `${conceptId}/${kind}/${localKey}` where
   *  localKey is the authored id (MC-…, MP-…, TA-…) when one exists, else a
   *  1-based ordinal. Never derived from content hashes or timestamps. */
  assetId: string
  kind: AssetKind
  conceptId: string
  /** Short human title (authored heading text where available). */
  title: string
  /** Verbatim markdown content as authored — lowering preserves, never rewrites. */
  content: string
  /** Authored local identifier when one exists (e.g. "MC-L-IS-OMEGA", "MP-3"). */
  localKey: string | null
  /** BCP-47; the corpus is English-authored today. */
  language: string
  /** Structured cross-references (asset → misconception ids etc.), by authored id. */
  refs: string[]
  span: BlueprintSourceSpan
}

/** The Knowledge-Layer AST: every educational asset lowered from one blueprint. */
export interface AssetAST {
  conceptId: string
  sourceFile: string
  assets: AssetNode[]
}

// ── Educational Package — Rule Layer + Knowledge Layer, one artifact ────────

export interface EducationalPackageManifest {
  packageId: string               // `${conceptId}-package`
  packageVersion: string          // semver; '0.1.0-draft' in this phase
  conceptId: string
  compiler: string                // this front-end's id (rule pack keeps its own)
  language: string
  /** sha256 over canonicalized { ruleContentHash, assets } — reuses
   *  brain-compiler's canonicalJsonHash, no second hashing scheme. */
  contentHash: string
  sourceLock: Record<string, string>
  assetCount: number
  assetCounts: Partial<Record<AssetKind, number>>
  ruleCount: number
}

/** Concept-level metadata carried at package level (not per-asset). */
export interface EducationalPackageConceptInfo {
  conceptId: string
  name: string
  difficultyRaw: string
  bloom: string
  masteryThreshold: number | null
  estimatedHours: number | null
  prerequisites: string[]
  status: string
}

/** Reserved, empty-by-construction surface for future non-textual assets.
 *  Kept as explicit named fields (not an open map) so adding a family is a
 *  visible, reviewed type change — mirrors GUARDABLE_FIELDS discipline. */
export interface PackageExtensionPoints {
  diagrams: never[]
  animations: never[]
  simulations: never[]
}

export interface EducationalPackage {
  status: DraftPackStatus         // DRAFT only in this phase — never ACTIVE
  manifest: EducationalPackageManifest
  concept: EducationalPackageConceptInfo
  /** Rule Layer — the EXISTING CompiledPack, byte-identical to what Phase 1
   *  produced; asset lowering must not perturb its contentHash. */
  rulePack: CompiledPack
  /** Knowledge Layer. */
  assets: AssetNode[]
  extensionPoints: PackageExtensionPoints
}

export interface PackageAssemblyResult {
  ok: boolean
  educationalPackage: EducationalPackage | null
  diagnostics: Diagnostic[]
}
