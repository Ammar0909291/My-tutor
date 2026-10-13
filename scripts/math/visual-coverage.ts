/**
 * Mathematics visual campaign — coverage report (2026-10-11).
 *
 * Which of the 908 Mathematics KG concepts already resolve to a fixed figure, by
 * the same registry calls the tutor uses, split by the campaign tiers in
 * docs/qa/mathematics-visual-campaign/tiers.json (E essential, H helpful, N none).
 * Read-only: no network, no DB.
 *
 *   npx tsx scripts/math/visual-coverage.ts            # totals + per domain + next 24 essential gaps
 *   npx tsx scripts/math/visual-coverage.ts --list E   # every uncovered concept of one tier
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lookupConceptVisualBinding, getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'

const root = process.cwd()
const kg = JSON.parse(readFileSync(join(root, 'docs/mathematics/kg/graph.json'), 'utf8'))
const nodes: Array<{ id: string; name: string }> = kg.concepts ?? kg.nodes ?? kg
const tiers: Record<string, 'E' | 'H' | 'N'> = JSON.parse(readFileSync(join(root, 'docs/qa/mathematics-visual-campaign/tiers.json'), 'utf8')).tiers
const authored = new Set<string>(CONCEPT_SCENE_OVERRIDES as string[])

const covered = (id: string) => {
  if (authored.has(id)) return true
  try { if (lookupConceptVisualBinding(id)) return true } catch { /* none */ }
  try { if (getConceptSceneGenerator(id)) return true } catch { /* none */ }
  return false
}
// The AI canary: deliberately figure-less (visualCanaryConcept.test.ts). Never counted as a gap.
const CANARY = 'math.linalg.vector-addition'

const rows = nodes.map((n) => ({ id: n.id, name: n.name, domain: n.id.split('.')[1], tier: tiers[n.id] ?? 'N', covered: covered(n.id) }))
const tot = (t: string) => rows.filter((r) => r.tier === t).length
const cov = (t: string) => rows.filter((r) => r.tier === t && r.covered).length
console.log(`concepts ${rows.length}; with a fixed figure ${rows.filter((r) => r.covered).length}`)
for (const t of ['E', 'H', 'N']) console.log(`  tier ${t}: ${cov(t)} / ${tot(t)} covered`)
const byDomain = new Map<string, { n: number; e: number; eCov: number }>()
for (const r of rows) {
  const d = byDomain.get(r.domain) ?? { n: 0, e: 0, eCov: 0 }
  d.n++; if (r.tier === 'E') { d.e++; if (r.covered) d.eCov++ }
  byDomain.set(r.domain, d)
}
console.log('\ndomain   concepts  essential  essential-covered')
for (const [d, v] of byDomain) console.log(`${d.padEnd(8)} ${String(v.n).padStart(8)} ${String(v.e).padStart(10)} ${String(v.eCov).padStart(18)}`)

const listTier = process.argv.includes('--list') ? process.argv[process.argv.indexOf('--list') + 1] : null
const gaps = rows.filter((r) => !r.covered && r.id !== CANARY && (listTier ? r.tier === listTier : r.tier === 'E'))
console.log(`\n${listTier ? `uncovered tier ${listTier}` : 'next essential gaps'} (${gaps.length}):`)
for (const g of listTier ? gaps : gaps.slice(0, 24)) console.log(`  ${g.id}  |  ${g.name}`)
