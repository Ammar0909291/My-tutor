/**
 * Re-audit ONLY the concepts that changed, without a 90-minute full re-render.
 *
 *   1. `physicsVisualAudit.test.ts` names the concepts whose served figure no longer
 *      matches the committed audit.
 *   2. Render just those:   render.ts --out <dir> --concepts a,b,c
 *      (add --no-states only if none of them is interactive)
 *   3. Validate that dir:   validate.ts --in <dir> --out <dir2>
 *      (the other concepts show as "missing renders" there; they are ignored below)
 *   4. Merge:               merge-audit.ts --base docs/qa/physics-visual-audit/audit-summary.json \
 *                                          --update <dir2>/audit-summary.json --out docs/qa/physics-visual-audit/audit-summary.json
 *
 * A concept's row is replaced only if the update actually rendered it; every other
 * row, and every other concept's fingerprint, is kept from the base. The roll-up
 * counts are recomputed from the merged rows.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const arg = (n: string) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined }
const basePath = arg('base'), updatePath = arg('update'), outPath = arg('out')
if (!basePath || !updatePath || !outPath) {
  console.error('usage: merge-audit.ts --base <audit-summary.json> --update <audit-summary.json> --out <file>')
  process.exit(2)
}

interface Row { id: string; verdict: string; dims: Record<string, string>; byViewport: Record<string, string>; states: number }
interface Audit {
  generatedAt: string; fingerprint: string; fingerprints: Record<string, string>
  viewports: string[]; themes: string[]
  summary: { concepts: number; verdicts: Record<string, number>; byViewport: Record<string, Record<string, number>>; byDimension: Record<string, Record<string, number>>; withMissingRenders: number }
  concepts: Row[]
}
const base: Audit = JSON.parse(readFileSync(resolve(basePath), 'utf8'))
const update: Audit = JSON.parse(readFileSync(resolve(updatePath), 'utf8'))

const rows = new Map(base.concepts.map((r) => [r.id, r]))
const fingerprints = { ...base.fingerprints }
const replaced: string[] = []
for (const r of update.concepts) {
  if (!r.states) continue // not rendered in the update run
  rows.set(r.id, r)
  fingerprints[r.id] = update.fingerprints[r.id]
  replaced.push(r.id)
}
// New concepts that were never rendered stay out: the test then names them.
const merged = [...rows.values()]
const tally = (key: (r: Row) => string) => merged.reduce<Record<string, number>>((m, r) => { const k = key(r); m[k] = (m[k] ?? 0) + 1; return m }, {})
const out: Audit = {
  ...update,
  generatedAt: new Date().toISOString(),
  fingerprint: update.fingerprint,
  fingerprints,
  concepts: merged,
  summary: {
    concepts: merged.length,
    verdicts: tally((r) => r.verdict),
    byViewport: Object.fromEntries(base.viewports.map((vp) => [vp, tally((r) => r.byViewport[vp])])),
    byDimension: Object.fromEntries(Object.keys(merged[0].dims).map((d) => [d, tally((r) => r.dims[d])])),
    withMissingRenders: 0,
  },
}
writeFileSync(resolve(outPath), JSON.stringify(out, null, 1))
console.log(`replaced ${replaced.length} concept(s): ${replaced.join(', ')}`)
console.log(JSON.stringify(out.summary.verdicts))
