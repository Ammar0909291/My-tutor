/**
 * C4 — Top-level compile entry point.
 *
 * source strings → CompileResult (CompiledPack + diagnostics).
 * Pure over inputs; no I/O; no LLM. The CLI (cli.ts) wraps this with
 * disk I/O for real files.
 */
import type { CompileResult } from './types'
import { parse } from './parser'
import { lowerToAST, emitCompiledPack, hashSource } from './lowering'

export interface CompileInput {
  file: string
  source: string
}

export function compile(inputs: CompileInput[]): CompileResult {
  if (inputs.length === 0) {
    return { ok: false, pack: null, diagnostics: [{ code: 'E0001', severity: 'E', message: 'no source files provided' }] }
  }

  // MVP: single-file packs. Multi-file merging is a follow-on when overlays
  // land (§7 of the SDK spec). We handle just the first source in this
  // release and diagnose the rest as skipped.
  const primary = inputs[0]
  const parseResult = parse(primary.file, primary.source)
  const lowered = lowerToAST(primary.file, parseResult.blocks)
  const diagnostics = [...parseResult.diagnostics, ...lowered.diagnostics]

  const hasErrors = diagnostics.some((d) => d.severity === 'E')
  if (hasErrors || !lowered.pack) {
    return { ok: false, pack: null, diagnostics }
  }

  const sourceLock: Record<string, string> = { [primary.file]: hashSource(primary.source) }
  for (let i = 1; i < inputs.length; i++) {
    diagnostics.push({
      code: 'I0002', severity: 'I',
      message: `file "${inputs[i].file}" ignored in C4 MVP (single-file packs only; multi-file overlays land in C4 follow-on)`,
    })
  }
  const pack = emitCompiledPack(lowered.pack, sourceLock)
  return { ok: true, pack, diagnostics }
}

export function compileSingle(file: string, source: string): CompileResult {
  return compile([{ file, source }])
}
