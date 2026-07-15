/**
 * C4 — BrainScript parser (BIR-H).
 *
 * Faithful syntactic parse of a .bs source file into RawBlock[]. Format
 * (a minimal subset of the SDK spec §2.1):
 *
 *   # comments start with #
 *   ::<kind> <header text>
 *   fieldName: <json-value>
 *   fieldName: <json-value>
 *   ::end
 *
 * Rules:
 *  - Block opens with "::<kind> <header>" and closes with "::end".
 *  - Field values are single-line JSON (numbers, strings, booleans, arrays,
 *    objects). Multi-line values are NOT supported in MVP (SDK-M1 scope
 *    restriction; the parser is deliberately small).
 *  - Blank lines and comments are ignored INSIDE blocks (but preserved
 *    counted lines in source spans).
 *  - Unknown block kinds are recorded and validated later (never guessed).
 */
import type { RawBlock, Diagnostic, SourceSpan } from './types'

export interface ParseResult {
  blocks: RawBlock[]
  diagnostics: Diagnostic[]
}

function span(file: string, start: number, end: number): SourceSpan {
  return { file, startLine: start, endLine: end }
}

/** Parse a single field value (post-colon). Returns { value, ok }. */
function parseFieldValue(raw: string): { value: unknown; ok: boolean; error?: string } {
  const trimmed = raw.trim()
  if (trimmed === '') return { value: '', ok: true }
  // Unquoted bare strings are legal for common cases (booleans, null, bare tokens).
  if (trimmed === 'true') return { value: true, ok: true }
  if (trimmed === 'false') return { value: false, ok: true }
  if (trimmed === 'null') return { value: null, ok: true }
  // Try JSON parse — legitimate for objects, arrays, quoted strings, numbers.
  try {
    return { value: JSON.parse(trimmed), ok: true }
  } catch {
    // Bare-string fallback: the entire trimmed value is the string. Type
    // enforcement happens at lowering (e.g. band-must-be-integer), where a
    // caller-friendly diagnostic can be attached to the specific field.
    return { value: trimmed, ok: true }
  }
}

export function parse(file: string, source: string): ParseResult {
  const blocks: RawBlock[] = []
  const diagnostics: Diagnostic[] = []
  const lines = source.split(/\r?\n/)

  let inBlock = false
  let currentKind = ''
  let currentHeader = ''
  let currentFields: Record<string, unknown> = {}
  let startLine = 0

  const OPEN_RE = /^::([a-z][a-z0-9_-]*)\s*(.*)$/
  const FIELD_RE = /^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const lineNo = i + 1
    const line = raw.replace(/\s+$/, '')

    // Skip pure blank + comment lines (outside AND inside blocks)
    if (line === '' || line.trim().startsWith('#')) continue

    if (line === '::end') {
      if (!inBlock) {
        diagnostics.push({ code: 'E0101', severity: 'E', message: '::end without matching block open', span: span(file, lineNo, lineNo) })
        continue
      }
      blocks.push({
        kind: currentKind, header: currentHeader, fields: currentFields,
        span: span(file, startLine, lineNo),
      })
      inBlock = false; currentKind = ''; currentHeader = ''; currentFields = {}
      continue
    }

    const openMatch = OPEN_RE.exec(line)
    if (openMatch && !inBlock) {
      inBlock = true
      currentKind = `::${openMatch[1]}`
      currentHeader = openMatch[2].trim()
      currentFields = {}
      startLine = lineNo
      continue
    }
    if (openMatch && inBlock) {
      diagnostics.push({ code: 'E0102', severity: 'E', message: `nested block open before ::end (found ${openMatch[0]})`, span: span(file, lineNo, lineNo) })
      // Recover: close the previous block implicitly and start fresh
      blocks.push({ kind: currentKind, header: currentHeader, fields: currentFields, span: span(file, startLine, lineNo - 1) })
      currentKind = `::${openMatch[1]}`; currentHeader = openMatch[2].trim()
      currentFields = {}; startLine = lineNo
      continue
    }

    if (inBlock) {
      const fm = FIELD_RE.exec(line)
      if (!fm) {
        diagnostics.push({ code: 'E0103', severity: 'E', message: `unrecognized line inside block: ${JSON.stringify(line.slice(0, 80))}`, span: span(file, lineNo, lineNo) })
        continue
      }
      const key = fm[1]
      const rest = fm[2]
      const parsed = parseFieldValue(rest)
      if (!parsed.ok) {
        diagnostics.push({ code: 'E0104', severity: 'E', message: `bad value for field "${key}": ${parsed.error ?? 'unknown'}`, span: span(file, lineNo, lineNo) })
        continue
      }
      if (key in currentFields) {
        diagnostics.push({ code: 'W0105', severity: 'W', message: `duplicate field "${key}" in block; later value wins`, span: span(file, lineNo, lineNo) })
      }
      currentFields[key] = parsed.value
    } else {
      // Bare content outside a block — allowed (author prose per SDK D1)
    }
  }

  if (inBlock) {
    diagnostics.push({ code: 'E0106', severity: 'E', message: `unterminated block (missing ::end)`, span: span(file, startLine, lines.length) })
    // Recover: emit what we have
    blocks.push({ kind: currentKind, header: currentHeader, fields: currentFields, span: span(file, startLine, lines.length) })
  }

  return { blocks, diagnostics }
}
