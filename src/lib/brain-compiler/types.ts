/**
 * C4 — Educational Brain Compiler: IR types.
 *
 * Three layers per the EBC spec §3:
 *   BIR-H (syntactic) — RawBlock (faithful parse of a .bs file)
 *   BIR-M (semantic)  — RuleAST, PackAST (validated, linked entities)
 *   BIR-L (runtime)   — CompiledPack (JSON-serializable; the on-disk artifact)
 *
 * CompiledPack → PolicyPack conversion happens at load time by the runtime
 * loader (predicates.ts + registry.ts), producing the function-carrying
 * shape the K4 Policy Engine already consumes. Nothing about this pipeline
 * calls an LLM (EBC D-2).
 */
import type { BandId, RuleEffect } from '@/lib/kernel/policy/types'

// ── BIR-H: raw parse ─────────────────────────────────────────────────────────

export interface SourceSpan {
  file: string
  startLine: number
  endLine: number
}

export interface RawBlock {
  kind: string                    // '::pack', '::rule', '::end' — closed set
  header: string                  // e.g. "B3.dispatch.newtons-first-law v1"
  fields: Record<string, unknown> // parsed JSON values from field lines
  span: SourceSpan
}

// ── Guard AST (predicate DSL — the ONLY way rules express conditions) ───────
// Deliberately restricted: no arbitrary code, no side effects, decidable.

export type GuardClause =
  | { kind: 'true' }
  | { kind: 'false' }
  | { kind: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'; field: string; value: string | number | boolean | null }
  | { kind: 'in' | 'nin'; field: string; values: Array<string | number | boolean | null> }
  | { kind: 'all' | 'any'; clauses: GuardClause[] }

export interface GuardAST {
  ast: GuardClause
  describe: string
  reads: string[]                 // fields the AST reads; computed by lowering
}

// ── BIR-M: semantic entities (post-validation) ──────────────────────────────

export interface RuleAST {
  ruleId: string
  band: BandId
  guard: GuardAST
  effect: RuleEffect
  specificity: number
  citation: string
  mandatory: boolean
  span: SourceSpan
}

export interface PackAST {
  packId: string                  // e.g. "physics-mechanics-v1"
  packVersion: string             // semver
  description: string
  rules: RuleAST[]
  sourceFiles: string[]           // for the lockfile
  span: SourceSpan
}

// ── BIR-L: on-disk compiled pack ────────────────────────────────────────────
// This is what the compiler EMITS and the loader CONSUMES. Fully JSON-
// serializable. Determinism: the pack body (rules[]) is canonicalized and
// hashed; the manifest carries the hash + source lock.

export interface CompiledRule {
  ruleId: string
  band: BandId
  specificity: number
  mandatory: boolean
  citation: string
  guardAst: GuardClause
  guardReads: string[]
  guardDescribe: string
  effect: RuleEffect
}

export interface PackManifest {
  packId: string
  packVersion: string
  description: string
  compiler: string                // e.g. "eos-brain-compiler@0.1.0"
  compiledAtIso: string           // ISO date (informational; not part of hash)
  sourceLock: Record<string, string> // file → sha256 hash
  contentHash: string             // sha256 of canonicalized rules[]
  ruleCount: number
  bandCounts: Partial<Record<BandId, number>>
}

export interface CompiledPack {
  manifest: PackManifest
  rules: CompiledRule[]
}

// ── Diagnostics (EBC §13.2) ─────────────────────────────────────────────────

export type Severity = 'E' | 'W' | 'I'

export interface Diagnostic {
  code: string                    // stable, e.g. "E0201", "W0631"
  severity: Severity
  message: string
  span?: SourceSpan
  relatedSpans?: SourceSpan[]
  fixItSuggestion?: string        // never auto-applied
}

export interface CompileResult {
  ok: boolean
  pack: CompiledPack | null
  diagnostics: Diagnostic[]
}
