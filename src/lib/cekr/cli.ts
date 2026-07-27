/**
 * C2 — `brain check` and `brain fmt`.
 *
 * The logic is pure functions over strings; `scripts/brain.ts` is the thin
 * shell that adds argv and disk I/O. Keeping them apart is what makes the CLI
 * testable without a filesystem, and it is the same split `compile.ts` already
 * uses ("Pure over inputs; no I/O; the CLI wraps this with disk I/O").
 *
 * ── check ────────────────────────────────────────────────────────────────
 * Ring 1 (syntax) is the parser's diagnostics; Ring 2 (well-formedness) is
 * C1's V-1…V-16 over the lowered corpus. Both are reported together, because
 * an author fixing a file wants every finding at once rather than one per run.
 *
 * ── fmt ──────────────────────────────────────────────────────────────────
 * Formatting NORMALISES, it does not rewrite. Field order is preserved
 * verbatim: in an authored corpus the order of fields carries the author's
 * emphasis, and a formatter that sorts them would silently edit meaning.
 * What it fixes is whitespace — the things that produce noisy diffs.
 */
import { fromBrainScript } from './fromBrainScript'
import { validateCorpus, type Finding } from './validate'
import { isEdge, type CekrEdge, type CekrEnvelope } from './types'
import type { Diagnostic } from '@/lib/brain-compiler/types'

export interface CheckInput { file: string; source: string }

export interface CheckReport {
  ok: boolean
  /** Ring 1 — parse + lowering diagnostics, per file. */
  diagnostics: Array<Diagnostic & { file: string }>
  /** Ring 2 — CEKR V-code findings over the whole lowered corpus. */
  findings: Finding[]
  recordCount: number
}

/**
 * Check one or more sources. Multi-file by design: V-3 (reference
 * resolution), V-4 (acyclicity) and V-8 (symmetry) are CORPUS properties, and
 * checking files one at a time would report false unresolved-reference errors
 * for every cross-file edge.
 */
export function check(inputs: readonly CheckInput[]): CheckReport {
  const diagnostics: CheckReport['diagnostics'] = []
  const entities: CekrEnvelope[] = []
  const edges: CekrEdge[] = []

  for (const input of inputs) {
    const { records, diagnostics: d } = fromBrainScript(input.source, { file: input.file })
    for (const diag of d) diagnostics.push({ ...diag, file: input.file })
    for (const r of records) {
      if (isEdge(r)) edges.push(r as CekrEdge)
      else entities.push(r as CekrEnvelope)
    }
  }

  const findings = validateCorpus({ entities, edges })
  const hardErrors = diagnostics.filter((d) => d.severity === 'E')
  return {
    ok: hardErrors.length === 0 && findings.length === 0,
    diagnostics,
    findings,
    recordCount: entities.length + edges.length,
  }
}

/** Human-readable report. Stable ordering so two runs diff cleanly. */
export function formatReport(report: CheckReport): string {
  const lines: string[] = []
  for (const d of report.diagnostics) {
    const at = d.span ? `${d.file}:${d.span.startLine}` : d.file
    lines.push(`${d.severity === 'E' ? 'error' : 'warn '} ${d.code} ${at} — ${d.message}`)
  }
  for (const f of report.findings) {
    lines.push(`error ${f.code} ${f.id} — ${f.detail}`)
  }
  lines.push(report.ok
    ? `ok — ${report.recordCount} record(s), 0 findings`
    : `FAILED — ${report.diagnostics.filter((d) => d.severity === 'E').length} diagnostic(s), ${report.findings.length} finding(s)`)
  return lines.join('\n')
}

// ── fmt ────────────────────────────────────────────────────────────────────

/**
 * Normalise a .bs source. Idempotent: fmt(fmt(x)) === fmt(x), asserted by
 * test — a formatter that is not a fixed point cannot be run in CI.
 *
 * Rules, deliberately few:
 *   · block markers start at column 0
 *   · fields are indented two spaces, `name: value` with a single space
 *   · comments and blank lines inside blocks are preserved
 *   · runs of blank lines collapse to one; trailing whitespace is stripped
 *   · exactly one blank line between blocks; file ends with one newline
 *   · FIELD ORDER IS NEVER CHANGED
 */
export function fmt(source: string): string {
  const out: string[] = []
  let inBlock = false
  let pendingBlank = false

  for (const raw of source.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, '')
    const trimmed = line.trim()

    if (trimmed === '') { pendingBlank = true; continue }

    const isOpen = trimmed.startsWith('::') && trimmed !== '::end'
    const isClose = trimmed === '::end'

    if (pendingBlank && out.length > 0) {
      // One blank line between blocks; none directly after a block opener.
      if (!inBlock || isOpen) out.push('')
      pendingBlank = false
    }

    if (isOpen) { out.push(trimmed); inBlock = true; continue }
    if (isClose) { out.push('::end'); inBlock = false; continue }

    if (trimmed.startsWith('#')) { out.push(inBlock ? `  ${trimmed}` : trimmed); continue }

    if (inBlock) {
      const colon = trimmed.indexOf(':')
      if (colon > 0) {
        const name = trimmed.slice(0, colon).trim()
        const value = trimmed.slice(colon + 1).trim()
        out.push(`  ${name}: ${value}`)
        continue
      }
    }
    out.push(trimmed)
  }

  while (out.length > 0 && out[out.length - 1] === '') out.pop()
  return out.join('\n') + '\n'
}

/** Is the file already formatted? The `--check` mode of fmt. */
export function isFormatted(source: string): boolean {
  return fmt(source) === source
}
