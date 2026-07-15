/**
 * C4 — Lowering: BIR-H (RawBlock[]) → BIR-M (PackAST) → BIR-L (CompiledPack).
 *
 * Deterministic; no I/O; produces diagnostics for every recoverable error.
 * Fields are validated ONE by one; a bad rule poisons only itself, not the
 * whole pack (EBC §13.4 error recovery).
 */
import type { RuleEffect, BandId } from '@/lib/kernel/policy/types'
import type {
  RawBlock, Diagnostic, RuleAST, PackAST, GuardAST, GuardClause,
  CompiledPack, CompiledRule, PackManifest,
} from './types'
import { validateAst, fieldsRead, describeGuard } from './predicates'
import { canonicalJsonHash, hashSource } from './hash'

const COMPILER_ID = 'eos-brain-compiler@0.1.0-c4'

interface LowerResult {
  pack: PackAST | null
  diagnostics: Diagnostic[]
}

/** Turn parsed blocks into a linked, validated PackAST. */
export function lowerToAST(file: string, blocks: RawBlock[]): LowerResult {
  const diags: Diagnostic[] = []
  const rules: RuleAST[] = []

  // First: locate pack header (exactly one required)
  const packBlocks = blocks.filter((b) => b.kind === '::pack')
  const ruleBlocks = blocks.filter((b) => b.kind === '::rule')
  const otherBlocks = blocks.filter((b) => b.kind !== '::pack' && b.kind !== '::rule')

  if (packBlocks.length === 0) {
    diags.push({ code: 'E0201', severity: 'E', message: 'missing ::pack header — every source file must declare its pack' })
    return { pack: null, diagnostics: diags }
  }
  if (packBlocks.length > 1) {
    diags.push({ code: 'E0202', severity: 'E', message: 'multiple ::pack headers found; a source file must declare exactly one', span: packBlocks[1].span })
  }
  const pk = packBlocks[0]

  const packHeader = pk.header.trim()
  const headerMatch = /^([A-Za-z0-9._/@\\\-]+)(?:\s+v?([0-9]+\.[0-9]+\.[0-9]+(?:-[A-Za-z0-9.\-]+)?))?$/.exec(packHeader)
  if (!headerMatch) {
    diags.push({ code: 'E0203', severity: 'E', message: `invalid ::pack header "${packHeader}" (expected: <id> [<semver>])`, span: pk.span })
  }
  const packId = headerMatch?.[1] ?? packHeader
  const packVersion = headerMatch?.[2] ?? (typeof pk.fields.version === 'string' ? pk.fields.version : '0.0.0')
  const description = typeof pk.fields.description === 'string' ? pk.fields.description : ''

  for (const b of otherBlocks) {
    diags.push({ code: 'W0204', severity: 'W', message: `unknown block kind "${b.kind}" ignored (C4 v1 recognizes ::pack and ::rule only)`, span: b.span })
  }

  const seenIds = new Set<string>()
  for (const rb of ruleBlocks) {
    const result = lowerRule(rb)
    diags.push(...result.diagnostics)
    if (!result.rule) continue
    if (seenIds.has(result.rule.ruleId)) {
      diags.push({ code: 'E0301', severity: 'E', message: `duplicate ruleId "${result.rule.ruleId}"`, span: rb.span })
      continue
    }
    seenIds.add(result.rule.ruleId)
    rules.push(result.rule)
  }

  const ast: PackAST = {
    packId, packVersion, description, rules,
    sourceFiles: [file],
    span: pk.span,
  }
  return { pack: ast, diagnostics: diags }
}

function lowerRule(rb: RawBlock): { rule: RuleAST | null; diagnostics: Diagnostic[] } {
  const diags: Diagnostic[] = []
  const header = rb.header.trim()
  const hMatch = /^([A-Za-z0-9._-]+)(?:\s+v?([0-9]+))?$/.exec(header)
  if (!hMatch) {
    diags.push({ code: 'E0401', severity: 'E', message: `invalid ::rule header "${header}" (expected: <ruleId> [v<n>])`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }
  const ruleId = hMatch[1]

  const band = rb.fields.band
  if (typeof band !== 'number' || !Number.isInteger(band) || band < 0 || band > 6) {
    diags.push({ code: 'E0402', severity: 'E', message: `rule "${ruleId}": band must be an integer in [0,6] (got ${JSON.stringify(band)})`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }

  const citation = rb.fields.citation
  if (typeof citation !== 'string' || citation.length === 0) {
    diags.push({ code: 'E0403', severity: 'E', message: `rule "${ruleId}": missing or empty citation (RS L3 provenance law)`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }

  const specificity = rb.fields.specificity
  if (typeof specificity !== 'number' || !Number.isInteger(specificity) || specificity < 0) {
    diags.push({ code: 'E0404', severity: 'E', message: `rule "${ruleId}": specificity must be a non-negative integer`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }

  const mandatory = rb.fields.mandatory
  if (mandatory !== undefined && typeof mandatory !== 'boolean') {
    diags.push({ code: 'E0405', severity: 'E', message: `rule "${ruleId}": mandatory must be a boolean if present`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }

  const guardField = rb.fields.guard
  if (!guardField || typeof guardField !== 'object') {
    diags.push({ code: 'E0406', severity: 'E', message: `rule "${ruleId}": missing or non-object guard`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }
  const guardAstErrors = validateAst(guardField as GuardClause)
  if (guardAstErrors.length > 0) {
    for (const e of guardAstErrors) {
      diags.push({ code: 'E0407', severity: 'E', message: `rule "${ruleId}": ${e}`, span: rb.span })
    }
    return { rule: null, diagnostics: diags }
  }
  const guardClause = guardField as GuardClause

  const effect = rb.fields.effect
  if (!effect || typeof effect !== 'object') {
    diags.push({ code: 'E0408', severity: 'E', message: `rule "${ruleId}": missing or non-object effect`, span: rb.span })
    return { rule: null, diagnostics: diags }
  }
  const effectValidation = validateEffect(ruleId, effect as Record<string, unknown>)
  diags.push(...effectValidation.diagnostics)
  if (!effectValidation.ok) return { rule: null, diagnostics: diags }

  const guard: GuardAST = {
    ast: guardClause,
    reads: fieldsRead(guardClause),
    describe: describeGuard(guardClause),
  }

  return {
    rule: {
      ruleId, band: band as BandId, guard,
      effect: effect as RuleEffect,
      specificity, citation, mandatory: mandatory === true,
      span: rb.span,
    },
    diagnostics: diags,
  }
}

function validateEffect(ruleId: string, effect: Record<string, unknown>): { ok: boolean; diagnostics: Diagnostic[] } {
  const diags: Diagnostic[] = []
  const ALLOWED = new Set([
    'move', 'actionClass', 'budgets', 'stageCeiling', 'vocabularyBans',
    'visualClass', 'contentSlots', 'fallbackChain', 'representation', 'bannedMoves',
  ])
  const MOVES = new Set(['TEACH', 'SHOW', 'ASK', 'RECOVER', 'CLOSE', 'CELEBRATE', 'WAIT'])
  for (const k of Object.keys(effect)) {
    if (!ALLOWED.has(k)) {
      diags.push({ code: 'W0409', severity: 'W', message: `rule "${ruleId}": unknown effect field "${k}" ignored (C4 v1 recognizes ${[...ALLOWED].join('/')} )` })
    }
  }
  if (effect.move !== undefined && (typeof effect.move !== 'string' || !MOVES.has(effect.move))) {
    diags.push({ code: 'E0410', severity: 'E', message: `rule "${ruleId}": effect.move must be one of ${[...MOVES].join('/')} (got ${JSON.stringify(effect.move)})` })
    return { ok: false, diagnostics: diags }
  }
  if (effect.bannedMoves !== undefined) {
    if (!Array.isArray(effect.bannedMoves) || effect.bannedMoves.some((m) => typeof m !== 'string' || !MOVES.has(m))) {
      diags.push({ code: 'E0411', severity: 'E', message: `rule "${ruleId}": effect.bannedMoves must be an array of valid PolicyMove values` })
      return { ok: false, diagnostics: diags }
    }
  }
  if (effect.vocabularyBans !== undefined) {
    if (!Array.isArray(effect.vocabularyBans) || effect.vocabularyBans.some((v) => typeof v !== 'string')) {
      diags.push({ code: 'E0412', severity: 'E', message: `rule "${ruleId}": effect.vocabularyBans must be an array of strings` })
      return { ok: false, diagnostics: diags }
    }
  }
  if (effect.stageCeiling !== undefined && (typeof effect.stageCeiling !== 'number' || !Number.isInteger(effect.stageCeiling))) {
    diags.push({ code: 'E0413', severity: 'E', message: `rule "${ruleId}": effect.stageCeiling must be an integer` })
    return { ok: false, diagnostics: diags }
  }
  return { ok: true, diagnostics: diags }
}

/** BIR-M → BIR-L. Canonicalizes and hashes. */
export function emitCompiledPack(pack: PackAST, sourceLock: Record<string, string>): CompiledPack {
  const rules: CompiledRule[] = pack.rules.map((r) => ({
    ruleId: r.ruleId, band: r.band, specificity: r.specificity, mandatory: r.mandatory,
    citation: r.citation,
    guardAst: r.guard.ast, guardReads: r.guard.reads, guardDescribe: r.guard.describe,
    effect: r.effect,
  })).sort((a, b) => a.band - b.band || a.ruleId.localeCompare(b.ruleId))

  const bandCounts: Partial<Record<0|1|2|3|4|5|6, number>> = {}
  for (const r of rules) bandCounts[r.band] = (bandCounts[r.band] ?? 0) + 1

  const contentHash = canonicalJsonHash(rules)
  const manifest: PackManifest = {
    packId: pack.packId,
    packVersion: pack.packVersion,
    description: pack.description,
    compiler: COMPILER_ID,
    compiledAtIso: new Date(0).toISOString(),  // deterministic timestamp — real time is set by the packager, not in the hash
    sourceLock,
    contentHash,
    ruleCount: rules.length,
    bandCounts,
  }
  return { manifest, rules }
}

export { hashSource }
