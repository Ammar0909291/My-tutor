/**
 * Blueprint Front-End — Lowering (BlueprintAST → existing compiler IR).
 *
 * This is the ONLY file that talks to `src/lib/brain-compiler`. It produces
 * `RawBlock[]` in exactly the shape the existing `.bs` parser already emits
 * (see `src/lib/brain-compiler/parser.ts` + the sample in `brain/*.bs`), then
 * hands off to the EXISTING, UNCHANGED `lowerToAST` / `emitCompiledPack` —
 * the same functions `compileSingle` uses for `.bs` sources. No RuleAST
 * field, guard clause kind, or effect field is invented here; every value
 * written into `fields.guard` / `fields.effect` is validated by the existing
 * `validateAst` / `validateEffect` inside `lowerToAST` exactly as it would be
 * for a hand-authored `.bs` rule.
 *
 * Scope boundary (documented, not a bug): only guard fields already in
 * `GUARDABLE_FIELDS` (predicates.ts) can be lowered. A blueprint's Teaching
 * Action Sequence (C4) maps cleanly to a `currentConceptId` dispatch rule per
 * TA. Its Misconception Engine (C3) does NOT currently lower to a guard —
 * there is no `detectedMisconceptionId`-shaped guardable field today, and
 * inventing one here would be exactly the "ad-hoc extension" predicates.ts
 * warns against ("Adding a field is a spec/pack-version event"). Instead,
 * each TA's `referencedMisconceptionIds` are folded into that rule's
 * `citation` string for provenance, and the misconception content itself
 * stays with the AssetIdentity/ExplanationAsset lowering target (out of
 * scope for this Phase 1 — see the audit report).
 */
import type { RawBlock } from '@/lib/brain-compiler/types'
import { lowerToAST, emitCompiledPack, hashSource } from '@/lib/brain-compiler/lowering'
import type { BlueprintAST, DraftCompiledPack, BlueprintCompileResult, Diagnostic } from './types'

/** Deterministic, documented mapping from a TA's primitive codes to an
 *  actionClass string. First matching family in priority order wins. */
const PRIMITIVE_ACTION_CLASS_TABLE: Array<{ codes: Set<string>; actionClass: string }> = [
  { codes: new Set(['P28', 'P30', 'P31', 'P33', 'P36']), actionClass: 'MISCONCEPTION_REPAIR' },
  { codes: new Set(['P14']), actionClass: 'DIAGNOSTIC_PROBE' },
  { codes: new Set(['P41']), actionClass: 'PREREQUISITE_CHECK' },
  { codes: new Set(['P01', 'P04', 'P06']), actionClass: 'CONCRETE_HOOK' },
  { codes: new Set(['P07', 'P08']), actionClass: 'FORMULA_INTRODUCTION' },
  { codes: new Set(['P10', 'P13']), actionClass: 'GUIDED_PRACTICE' },
  { codes: new Set(['P51', 'P52', 'P54', 'P55']), actionClass: 'INDEPENDENT_PRACTICE' },
  { codes: new Set(['P68', 'P62', 'P85', 'P89', 'P91']), actionClass: 'CLOSURE' },
]

export function mapPrimitivesToActionClass(primitives: string[]): string {
  for (const entry of PRIMITIVE_ACTION_CLASS_TABLE) {
    if (primitives.some((p) => entry.codes.has(p))) return entry.actionClass
  }
  return 'GUIDED_EXPLANATION'
}

/** BlueprintAST → RawBlock[] matching the `.bs` block shape (kind/header/fields/span). */
export function lowerBlueprintToRawBlocks(ast: BlueprintAST): RawBlock[] {
  const packHeader = `${ast.conceptId}-dispatch 0.1.0-draft`
  const packSpan = { file: ast.sourceFile, startLine: 1, endLine: 1 }

  const blocks: RawBlock[] = [
    {
      kind: '::pack',
      header: packHeader,
      fields: { description: `Blueprint-compiled draft dispatch pack for ${ast.conceptId} (Phase 1 front-end; DRAFT only)` },
      span: packSpan,
    },
  ]

  for (const ta of ast.teachingActions) {
    const citation = ta.referencedMisconceptionIds.length > 0
      ? `${ast.sourceFile}#${ta.id} (addresses ${ta.referencedMisconceptionIds.join(', ')})`
      : `${ast.sourceFile}#${ta.id}`

    blocks.push({
      kind: '::rule',
      header: `B3.dispatch.${ast.conceptId}.${ta.id} v1`,
      fields: {
        band: 3,
        citation,
        specificity: 1,
        mandatory: false,
        guard: { kind: 'eq', field: 'currentConceptId', value: ast.conceptId },
        effect: { actionClass: mapPrimitivesToActionClass(ta.primitives) },
      },
      span: { file: ast.sourceFile, startLine: ta.span.startLine, endLine: ta.span.endLine },
    })
  }

  return blocks
}

/**
 * Top-level Phase 1 entry point: BlueprintAST (already parsed + semantically
 * validated by the caller) → DRAFT CompiledPack, via the existing compiler
 * unchanged. Never returns an ACTIVE pack — activation is out of scope for
 * this front-end (see the module doc and the Phase-1 governance note).
 */
export function lowerBlueprintToDraftPack(ast: BlueprintAST, source: string): BlueprintCompileResult {
  const rawBlocks = lowerBlueprintToRawBlocks(ast)
  const lowered = lowerToAST(ast.sourceFile, rawBlocks)
  const diagnostics: Diagnostic[] = [...lowered.diagnostics]

  const hasErrors = diagnostics.some((d) => d.severity === 'E')
  if (hasErrors || !lowered.pack) {
    return { ok: false, draftPack: null, diagnostics }
  }

  const sourceLock: Record<string, string> = { [ast.sourceFile]: hashSource(source) }
  const compiledPack = emitCompiledPack(lowered.pack, sourceLock)

  const draftPack: DraftCompiledPack = {
    status: 'DRAFT',
    pack: compiledPack,
    sourceConceptId: ast.conceptId,
    sourceFile: ast.sourceFile,
  }

  return { ok: true, draftPack, diagnostics }
}
