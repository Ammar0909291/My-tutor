/**
 * The orphan census — every CONCEPT_VISUALS key that names no concept in any
 * shipped Knowledge Graph, with the evidence needed to classify it.
 *
 * An orphan is unreachable at runtime: the visual it names is authored but
 * never served, and the concept it was meant to cover falls through to a
 * domain default or to nothing. `scripts/ci/visual-orphan-baseline.txt` is the
 * accepted-orphan ratchet; this tool produces the evidence for working entries
 * off it, and deliberately does NOT decide anything on its own.
 *
 * For each orphan it reports:
 *   · the authored scene generator, if any (the highest-value group — real
 *     built content wired to a key no learner can reach)
 *   · STRICT candidates: KG concepts whose final id segment or title matches
 *     exactly. Loose substring matching over-reports (it ties
 *     math.arith.integers to integer-arithmetic, algebraic-integers and
 *     integer-programming), so it is reported separately and never used to
 *     justify a mapping.
 *   · what each candidate ALREADY resolves to, and at which tier — because a
 *     repoint onto a concept that already has a better route is a downgrade,
 *     not a repair.
 *
 * Run: npx tsx scripts/qa/orphan-census.ts [--loose]
 */
import { readFileSync } from 'node:fs'
import {
  getConceptVisualType, getConceptSceneGenerator, lookupConceptVisualBinding,
} from '../../src/lib/teaching/visualRegistry'
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'
import { INSUFFICIENT_FOR_CONCEPT } from '../../src/lib/teaching/visual/scope'

const SUBJECT_OF: Record<string, string> = {
  phys: 'physics', math: 'mathematics', chem: 'chemistry',
  bio: 'biology', cs: 'computer_science', eng: 'english',
}

type Node = { id: string; slug?: string; title?: string }
const cache = new Map<string, Node[]>()
function nodesOf(subject: string): Node[] {
  if (!cache.has(subject)) {
    const g = getKnowledgeGraph(subject) as unknown as { modules?: Array<{ nodes?: Node[] }> } | null
    const out: Node[] = []
    for (const m of g?.modules ?? []) for (const n of m.nodes ?? []) out.push(n)
    cache.set(subject, out)
  }
  return cache.get(subject)!
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** CONCEPT_VISUALS only — DOMAIN_VISUALS uses domainRule(...) call syntax. */
function conceptKeys(): string[] {
  const src = readFileSync('src/lib/teaching/visualRegistry.ts', 'utf8')
  const from = src.indexOf('const CONCEPT_VISUALS')
  const to = src.indexOf('const DOMAIN_VISUALS')
  const block = src.slice(from, to > from ? to : undefined)
  return [...new Set([...block.matchAll(/^\s*'([a-z_]+\.[a-z0-9_.-]+)':\s*\{/gm)].map((m) => m[1]))]
}

export interface OrphanRow {
  key: string
  subject: string
  scene: string | null
  strict: Node[]
  loose: Node[]
}

export function census(): OrphanRow[] {
  const rows: OrphanRow[] = []
  for (const key of conceptKeys()) {
    const subject = SUBJECT_OF[key.split('.')[0]]
    if (!subject) continue
    const all = nodesOf(subject)
    if (all.some((n) => n.id === key || n.slug === key)) continue

    const tail = key.split('.').pop() ?? ''
    const strict = all.filter((n) =>
      norm(n.id.split('.').pop() ?? '') === norm(tail) || norm(n.title ?? '') === norm(tail))
    const words = tail.split('-').filter((w) => w.length > 3)
    const loose = all.filter((n) => {
      const hay = `${n.id} ${(n.title ?? '').toLowerCase()}`
      return words.length > 0 && words.every((w) => hay.includes(w))
    })
    rows.push({ key, subject, scene: getConceptSceneGenerator(key), strict, loose })
  }
  return rows
}

function describeTarget(id: string): string {
  const t = getConceptVisualType(id)
  const b = lookupConceptVisualBinding(id) as unknown as { tier?: string } | null
  const demoted = INSUFFICIENT_FOR_CONCEPT.has(id) ? ' DEMOTED' : ''
  return `${String(t)} (tier=${b?.tier ?? 'none'}${demoted})`
}

if (process.argv[1]?.endsWith('orphan-census.ts')) {
  const showLoose = process.argv.includes('--loose')
  const rows = census()
  const withScene = rows.filter((r) => r.scene)
  console.log(`ORPHANS: ${rows.length}   (with an authored scene generator: ${withScene.length})\n`)
  for (const r of rows) {
    console.log(`${r.key}`)
    console.log(`    scene=${r.scene ?? 'none'}`)
    if (r.strict.length === 0) console.log('    strict: NONE')
    for (const c of r.strict) {
      console.log(`    strict -> ${c.id.padEnd(38)} "${c.title ?? ''}"  target=${describeTarget(c.id)}`)
    }
    if (showLoose && r.strict.length === 0 && r.loose.length) {
      for (const c of r.loose.slice(0, 6)) {
        console.log(`    loose  ?  ${c.id.padEnd(38)} "${c.title ?? ''}"  target=${describeTarget(c.id)}`)
      }
    }
    console.log('')
  }
}
