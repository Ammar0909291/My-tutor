/**
 * Blueprint Front-End — Educational Package Assembly (Phase 1.5).
 *
 * One blueprint → one DRAFT Educational Package = Rule Layer + Knowledge
 * Layer under a single deterministic manifest.
 *
 *   Rule Layer      — the EXISTING CompiledPack from Phase 1's lowering,
 *                     produced by the existing brain-compiler unchanged.
 *                     Its manifest.contentHash is untouched here; the
 *                     package hash wraps it, never replaces it.
 *   Knowledge Layer — AssetNodes from assetLowering.ts.
 *
 * Reuse discipline:
 *   - No second compiler: rule compilation is `lowerBlueprintToDraftPack`
 *     (Phase 1) verbatim.
 *   - No second hashing scheme: package contentHash uses brain-compiler's
 *     canonicalJsonHash; sourceLock uses its hashSource.
 *   - No registry changes: DRAFT packages are returned as data. Nothing here
 *     calls packRegistry, and the rulePack inside remains loadable by the
 *     existing loader if a later, separately-approved phase activates it.
 */
import { canonicalJsonHash, hashSource } from '@/lib/brain-compiler/hash'
import type {
  AssetKind, BlueprintAST, Diagnostic, EducationalPackage,
  EducationalPackageManifest, PackageAssemblyResult, SemanticValidationContext,
} from './types'
import { parseBlueprintMarkdown } from './parser'
import { validateBlueprintAst } from './semanticValidator'
import { lowerBlueprintToDraftPack } from './lowering'
import { lowerBlueprintToAssets } from './assetLowering'

const PACKAGE_COMPILER_ID = 'blueprint-frontend@0.3.0-physics-migration'
const LANGUAGE_DEFAULT = 'en'

/** AST (parsed + semantically validated by the caller) → DRAFT package. */
export function assembleEducationalPackage(ast: BlueprintAST, source: string): PackageAssemblyResult {
  const diagnostics: Diagnostic[] = []

  // Rule Layer — Phase 1 path, unchanged.
  const ruleResult = lowerBlueprintToDraftPack(ast, source)
  diagnostics.push(...ruleResult.diagnostics)
  if (!ruleResult.ok || !ruleResult.draftPack) {
    return { ok: false, educationalPackage: null, diagnostics }
  }
  const rulePack = ruleResult.draftPack.pack

  // Knowledge Layer.
  const assetAst = lowerBlueprintToAssets(ast)
  if (assetAst.assets.length === 0) {
    diagnostics.push({
      code: 'BFA01', severity: 'W',
      message: `${ast.sourceFile}: no educational assets lowered — package carries only the rule layer`,
    })
  }
  const duplicate = findDuplicateAssetId(assetAst.assets.map((a) => a.assetId))
  if (duplicate) {
    diagnostics.push({ code: 'BFA02', severity: 'E', message: `${ast.sourceFile}: duplicate assetId "${duplicate}"` })
    return { ok: false, educationalPackage: null, diagnostics }
  }

  const assetCounts: Partial<Record<AssetKind, number>> = {}
  for (const a of assetAst.assets) assetCounts[a.kind] = (assetCounts[a.kind] ?? 0) + 1

  const manifest: EducationalPackageManifest = {
    packageId: `${ast.conceptId}-package`,
    packageVersion: '0.1.0-draft',
    conceptId: ast.conceptId,
    compiler: PACKAGE_COMPILER_ID,
    language: LANGUAGE_DEFAULT,
    // Wraps (never replaces) the rule pack's own hash: the package hash
    // changes iff the rule layer or any asset changes.
    contentHash: canonicalJsonHash({ ruleContentHash: rulePack.manifest.contentHash, assets: assetAst.assets }),
    sourceLock: { [ast.sourceFile]: hashSource(source) },
    assetCount: assetAst.assets.length,
    assetCounts,
    ruleCount: rulePack.manifest.ruleCount,
  }

  const educationalPackage: EducationalPackage = {
    status: 'DRAFT',
    manifest,
    concept: {
      conceptId: ast.conceptId,
      name: ast.metadata.name,
      difficultyRaw: ast.metadata.difficultyRaw,
      bloom: ast.metadata.bloom,
      masteryThreshold: ast.metadata.masteryThreshold,
      estimatedHours: ast.metadata.estimatedHours,
      prerequisites: [...ast.metadata.prerequisites],
      status: ast.metadata.status,
    },
    rulePack,
    assets: assetAst.assets,
    extensionPoints: { diagrams: [], animations: [], simulations: [] },
  }

  return { ok: true, educationalPackage, diagnostics }
}

/** Top-level: markdown → parse → semantic validation → both lowerings →
 *  DRAFT Educational Package. Same gate discipline as compileBlueprint —
 *  semantic errors block all lowering. */
export function compileBlueprintToPackage(
  file: string,
  source: string,
  conceptIdFromFilename: string,
  ctx: SemanticValidationContext = {},
): PackageAssemblyResult {
  const { ast, diagnostics: parseDiags } = parseBlueprintMarkdown(file, source, conceptIdFromFilename)
  const diagnostics: Diagnostic[] = [...parseDiags]
  if (!ast) return { ok: false, educationalPackage: null, diagnostics }

  diagnostics.push(...validateBlueprintAst(ast, ctx))
  if (diagnostics.some((d) => d.severity === 'E')) {
    return { ok: false, educationalPackage: null, diagnostics }
  }

  const result = assembleEducationalPackage(ast, source)
  return { ok: result.ok, educationalPackage: result.educationalPackage, diagnostics: [...diagnostics, ...result.diagnostics] }
}

function findDuplicateAssetId(ids: string[]): string | null {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) return id
    seen.add(id)
  }
  return null
}
