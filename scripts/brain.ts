#!/usr/bin/env node
/**
 * C2 — the `brain` CLI shell.
 *
 * Deliberately thin: argv parsing and disk I/O only. Every decision lives in
 * src/lib/cekr/cli.ts, which is pure and unit-tested without a filesystem —
 * the same split brain-compiler/compile.ts already uses.
 *
 *   npm run brain -- check <files...>     parse + lower + validate (V-1…V-16)
 *   npm run brain -- fmt   <files...>     normalise in place
 *   npm run brain -- fmt --check <files>  fail if any file is unformatted
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { check, formatReport, fmt, isFormatted } from '../src/lib/cekr/cli'
import { importKg, importAssets, coverage, formatCoverage } from '../src/lib/cekr/import'
import type { CekrRecord } from '../src/lib/cekr/types'

const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'english']

/** Read every subject's KG + assets and lower them to CEKR. Read-only. */
function importAll(): { records: CekrRecord[]; diagnostics: Array<{ code: string; id: string; detail: string }> } {
  const records: CekrRecord[] = []
  const diagnostics: Array<{ code: string; id: string; detail: string }> = []
  const graphs: Array<{ file: string; graph: ReturnType<typeof JSON.parse> }> = []
  for (const s of SUBJECTS) {
    const file = `docs/${s}/kg/graph.json`
    try { graphs.push({ file, graph: JSON.parse(readFileSync(file, 'utf8')) }) } catch { /* subject absent */ }
  }
  // The union lets cross-SUBJECT cross_links resolve; importing one subject at
  // a time would report every one of them as unresolved.
  const known = new Set<string>(graphs.flatMap(({ graph }) => graph.concepts.map((c: { id: string }) => c.id)))
  for (const { file, graph } of graphs) {
    const r = importKg(graph, { file, knownConceptIds: known })
    records.push(...r.records); diagnostics.push(...r.diagnostics)
  }
  for (const s of SUBJECTS) {
    const file = `docs/${s}/teaching-assets/assets.json`
    try {
      const r = importAssets(JSON.parse(readFileSync(file, 'utf8')), { file, knownConceptIds: known })
      records.push(...r.records); diagnostics.push(...r.diagnostics)
    } catch { /* subject has no assets file */ }
  }
  return { records, diagnostics }
}

function usage(): never {
  console.error('usage: brain check <files...> | brain fmt [--check] <files...> | brain coverage')
  process.exit(2)
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2)
  if (!command) usage()

  if (command === 'check') {
    const files = rest
    if (files.length === 0) usage()
    const report = check(files.map((file) => ({ file, source: readFileSync(file, 'utf8') })))
    console.log(formatReport(report))
    process.exit(report.ok ? 0 : 1)
  }

  if (command === 'fmt') {
    const checkOnly = rest[0] === '--check'
    const files = checkOnly ? rest.slice(1) : rest
    if (files.length === 0) usage()
    let unformatted = 0
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      if (isFormatted(source)) continue
      unformatted++
      if (checkOnly) console.error(`unformatted: ${file}`)
      else { writeFileSync(file, fmt(source)); console.log(`formatted: ${file}`) }
    }
    if (checkOnly) {
      console.log(unformatted === 0 ? `ok — ${files.length} file(s) formatted` : `FAILED — ${unformatted} unformatted`)
      process.exit(unformatted === 0 ? 0 : 1)
    }
    console.log(`ok — ${unformatted} file(s) rewritten`)
    process.exit(0)
  }

  if (command === 'import' || command === 'coverage') {
    const { records, diagnostics } = importAll()
    console.log(formatCoverage(coverage(records)))
    if (diagnostics.length > 0) {
      const byCode: Record<string, number> = {}
      for (const d of diagnostics) byCode[d.code] = (byCode[d.code] ?? 0) + 1
      console.log('\ndiagnostics: ' + Object.entries(byCode).sort().map(([k, n]) => `${k}=${n}`).join(' '))
      // Unresolved references are the ones a human must act on; asymmetries
      // are bulk data findings and are summarised by count only.
      for (const d of diagnostics.filter((x) => x.code === 'I-UNRESOLVED')) {
        console.log(`  ${d.code} ${d.id} — ${d.detail}`)
      }
    }
    process.exit(0)
  }

  usage()
}

main()
