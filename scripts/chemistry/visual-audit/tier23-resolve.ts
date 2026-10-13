/**
 * CHEMISTRY TIER 2 / TIER 3 RESOLUTION AUDIT — what the REAL resolver serves from the production snapshot.
 *
 *   npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts                  # summary to stdout
 *   npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts --out <dir>      # also writes the artefacts
 *
 * WHY IT EXISTS. `inventory.ts` enumerates Tier -1/0/1 (synchronous, in-repo). Tier 2 (an ACTIVE visual asset a human
 * approved) and Tier 3 (a figure the model generated and a critic promoted, cached in `visualization_cache`) live in the
 * production database, so the first campaign could only call them "eligible" — and 147 of 186 concepts have a generated
 * figure there, 74 with a promote verdict, shown to learners ~6,000 times. This script closes that gap WITHOUT a second
 * resolver: it runs the real `resolveVisualForTurn` (tiers, retirement, the cache/verdict/decline read path, the
 * admission gate incl. the chemistry predicate) over every concept, with the database replaced by a read-only cache client
 * backed by the committed production snapshot (docs/qa/chemistry-visual-audit/tier23-snapshot, see its README). The replay
 * itself lives in `tier23Replay.ts` so the freshness test can import it.
 *
 * What it can and cannot say. A concept whose figure is in the snapshot with a `promote` verdict is replayed exactly as
 * production serves it. A cache MISS would need a live model call and a live critic: the stubs refuse (generation returns
 * nothing, the critic holds), so such a concept is reported as `needs-live-generation`, never as content.
 *
 * Two modes per concept: `asked` (the learner says "show me a diagram" — the widest door) and `ordinary` (no request).
 *
 * Output (with --out):
 *   tier23-resolution.json   one record per concept (186) + summary
 *   tier23-manifest.json     the Tier 2 / Tier 3 figures actually SERVED, as render-measure.mjs manifest entries
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { replayAll } from './tier23Replay'

const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }

async function main() {
  const { summary, concepts, manifest } = await replayAll()
  console.log(JSON.stringify(summary, null, 2))
  const out = arg('out')
  if (out) {
    mkdirSync(out, { recursive: true })
    writeFileSync(join(out, 'tier23-resolution.json'), JSON.stringify({ summary, concepts }, null, 1) + '\n')
    writeFileSync(join(out, 'tier23-manifest.json'), JSON.stringify(manifest, null, 1) + '\n')
    console.log(`wrote tier23-resolution.json (${concepts.length} concepts) and tier23-manifest.json (${manifest.length} served figures) -> ${out}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
