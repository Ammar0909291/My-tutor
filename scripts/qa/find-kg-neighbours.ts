/**
 * For each orphan registry key, is there a REAL KG concept it was probably
 * meant to name? A typo'd key is a concept silently left with no visual; a key
 * with no counterpart at all is merely dead weight. The two need different
 * answers, so this prints the nearest real ids rather than guessing.
 *
 * Run: npx tsx scripts/qa/find-kg-neighbours.ts
 */
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'

const ORPHANS = [
  'math.geom.straight-lines',
  'math.arith.integers',
  'math.arith.rational-numbers',
  'math.arith.real-numbers',
  'math.alg.linear-equations',
  'math.alg.linear-inequalities',
  'math.stat.probability',
  'math.calc.integration',
  'math.trig.trigonometric-identities',
]

type Node = { id: string; slug?: string; title?: string }
const g = getKnowledgeGraph('mathematics') as unknown as { modules?: Array<{ nodes?: Node[] }> } | null
const all: Node[] = []
for (const mod of g?.modules ?? []) for (const n of mod.nodes ?? []) all.push(n)
console.log(`mathematics KG: ${all.length} concepts\n`)

for (const orphan of ORPHANS) {
  const tail = orphan.split('.').pop() ?? ''
  const stem = tail.replace(/s$/, '')
  const near = all
    .filter((n) => n.id.includes(stem) || (n.title ?? '').toLowerCase().includes(stem.replace(/-/g, ' ')))
    .slice(0, 4)
  console.log(`${orphan}`)
  if (near.length === 0) console.log('    no similar concept in the KG')
  for (const n of near) console.log(`    -> ${n.id.padEnd(38)} ${n.title ?? ''}`)
  console.log('')
}
