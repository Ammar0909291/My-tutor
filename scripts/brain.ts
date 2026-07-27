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
import {
  buildIndex, entityCard, findReferences, impactOf, neighborhood, resolveId,
  formatCard, formatReferences, formatImpact, formatNeighborhood,
} from '../src/lib/cekr/query'
import type { CekrRecord } from '../src/lib/cekr/types'
import { buildFromCekr, serializeLock } from '../src/lib/brain-compiler'

const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'english']

/** Read every subject's KG + assets and lower them to CEKR. Read-only. */
function importAll(only?: string): { records: CekrRecord[]; diagnostics: Array<{ code: string; id: string; detail: string }> } {
  const records: CekrRecord[] = []
  const diagnostics: Array<{ code: string; id: string; detail: string }> = []
  const graphs: Array<{ file: string; graph: ReturnType<typeof JSON.parse> }> = []
  for (const s of only ? [only] : SUBJECTS) {
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
  for (const s of only ? [only] : SUBJECTS) {
    const file = `docs/${s}/teaching-assets/assets.json`
    try {
      const r = importAssets(JSON.parse(readFileSync(file, 'utf8')), { file, knownConceptIds: known })
      records.push(...r.records); diagnostics.push(...r.diagnostics)
    } catch { /* subject has no assets file */ }
  }
  return { records, diagnostics }
}

function usage(): never {
  console.error(
    'usage: brain check <files...> | brain fmt [--check] <files...> | brain coverage\n' +
    '     | brain build <subject> [--include-draft] [--emit]\n' +
    '     | brain show <id> | brain refs <id> | brain impact <id> | brain near <id> [radius]\n' +
    '     | brain replay <persona> [--seed n] [--turns n] [--engine] [--rules]')
  process.exit(2)
}

async function main(): Promise<void> {
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

  if (command === 'build') {
    const subject = rest[0]
    if (!subject) usage()
    // Imported CEKR is DRAFT (it has had no human review), so a build over the
    // import must say so explicitly rather than silently promoting it.
    const servable = rest.includes('--include-draft')
      ? new Set(['ACTIVE', 'REVIEW', 'DRAFT'])
      : undefined
    const { records } = importAll(subject)
    const r = buildFromCekr(records, {
      packId: `${subject}-cekr`, packVersion: '0.1.0', servableStatuses: servable,
    })
    for (const d of r.diagnostics) console.log(`${d.severity === 'E' ? 'error' : d.severity === 'W' ? 'warn ' : 'info '} ${d.code} — ${d.message}`)
    if (!r.pack || !r.lock) { console.log('FAILED — no pack emitted'); process.exit(1) }
    console.log(`pack ${r.pack.manifest.packId}@${r.pack.manifest.packVersion}`)
    console.log(`rules ${r.pack.rules.length}  contentHash ${r.pack.manifest.contentHash}`)
    console.log(`double-build determinism: ${r.deterministic ? 'PASS' : 'FAIL'}`)
    if (rest.includes('--emit')) {
      writeFileSync(`brain/${subject}.pack.json`, JSON.stringify(r.pack, null, 2) + '\n')
      writeFileSync(`brain/${subject}.brain.lock`, serializeLock(r.lock))
      console.log(`emitted brain/${subject}.pack.json and brain/${subject}.brain.lock`)
    }
    process.exit(r.ok ? 0 : 1)
  }

  // C6 — replay theater. Runs the REAL kernel stages via runEpisode and
  // renders what they decided; nothing here decides anything itself.
  if (command === 'replay') {
    const personaId = rest[0]
    if (!personaId) usage()
    const { PERSONAS, personaById } = await import('../src/lib/kernel/simulation/personas')
    const persona = personaById(personaId)
    if (!persona) {
      console.error(`unknown persona: ${personaId}`)
      console.error(`available: ${PERSONAS.map((p) => p.id).join(', ')}`)
      process.exit(2)
    }
    const flag = (name: string, fallback: number): number => {
      const i = rest.indexOf(`--${name}`)
      return i >= 0 ? Number(rest[i + 1]) || fallback : fallback
    }
    const engine = rest.includes('--engine')
    const { runEpisode } = await import('../src/lib/kernel/simulation/run')
    const { formatReplay, stageJumps } = await import('../src/lib/kernel/simulation/replay')
    const result = await runEpisode({
      persona, seed: flag('seed', 1), turns: flag('turns', 12),
      // The engine transcript needs the shadow run; asking for --engine
      // without it would print an empty theatre.
      engineShadow: engine,
    })
    console.log(formatReplay(result, { engine, rules: rest.includes('--rules') }))
    const jumps = stageJumps((engine ? result.engine?.turns : result.turns) ?? [])
    console.log(jumps.length === 0
      ? '  QUESTION-STAGE: no jumps'
      : `  QUESTION-STAGE: ${jumps.length} phase skip(s) — ${jumps.map((j) => `t${j.turnIndex} ${j.from}→${j.to}`).join(', ')}`)
    const violations = (engine ? result.engine?.violations : result.violations) ?? []
    process.exit(violations.length === 0 && jumps.length === 0 ? 0 : 1)
  }

  // C5 — the language service, on the CLI. Same pure queries a future LSP
  // or web IDE will call; this is the consumer that exists today.
  if (command === 'show' || command === 'refs' || command === 'impact' || command === 'near') {
    const id = rest[0]
    if (!id) usage()
    const index = buildIndex(importAll().records)
    // Authors type KG slugs; entity ids are cekr:<Kind>/<slug>. Resolve, and
    // say so plainly when the slug is unknown or ambiguous rather than
    // answering a question about an entity that does not exist.
    const resolved = resolveId(index, id)
    if (!resolved) {
      console.log(`unknown or ambiguous id: ${id}`)
      process.exit(1)
    }
    if (command === 'show') console.log(formatCard(entityCard(index, resolved), resolved))
    else if (command === 'refs') console.log(formatReferences(findReferences(index, resolved), resolved))
    else if (command === 'impact') console.log(formatImpact(impactOf(index, resolved)))
    else console.log(formatNeighborhood(neighborhood(index, resolved, Number(rest[1] ?? 1) || 1)))
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

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
