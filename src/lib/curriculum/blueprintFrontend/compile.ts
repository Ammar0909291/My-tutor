/**
 * Blueprint Front-End — top-level compile entry point.
 *
 * Mirrors `src/lib/brain-compiler/compile.ts`'s `compileSingle` shape
 * deliberately: parse → validate → lower → existing compiler, pure over
 * inputs, no I/O inside this function (callers pass already-read source
 * text, matching the existing compiler's convention).
 */
import type { BlueprintCompileResult, Diagnostic, SemanticValidationContext } from './types'
import { parseBlueprintMarkdown } from './parser'
import { validateBlueprintAst } from './semanticValidator'
import { lowerBlueprintToDraftPack } from './lowering'

export function compileBlueprint(
  file: string,
  source: string,
  conceptIdFromFilename: string,
  ctx: SemanticValidationContext = {},
): BlueprintCompileResult {
  const { ast, diagnostics: parseDiags } = parseBlueprintMarkdown(file, source, conceptIdFromFilename)
  const diagnostics: Diagnostic[] = [...parseDiags]

  if (!ast) {
    return { ok: false, draftPack: null, diagnostics }
  }

  const semanticDiags = validateBlueprintAst(ast, ctx)
  diagnostics.push(...semanticDiags)

  const hasErrors = diagnostics.some((d) => d.severity === 'E')
  if (hasErrors) {
    // Explicit Phase 1 requirement: do NOT lower on semantic validation failure.
    return { ok: false, draftPack: null, diagnostics }
  }

  const lowerResult = lowerBlueprintToDraftPack(ast, source)
  diagnostics.push(...lowerResult.diagnostics)

  return { ok: lowerResult.ok, draftPack: lowerResult.draftPack, diagnostics }
}
