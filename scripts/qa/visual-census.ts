/**
 * VISUAL INTELLIGENCE CENSUS — evidence for a classification decision, and
 * deliberately NOT a decision itself.
 *
 * For every concept in every shipped KG it reports which tier answers, whether
 * an authored scene generator is reachable, and whether scope.ts demotes the
 * result. Orphan registry keys (a key naming no concept) are reported
 * separately, since they are unreachable at runtime by construction.
 *
 * It prints classifications only where the DATA decides them
 * (ORPHAN / NO-VISUAL / GENERIC-DEMOTED / GENERIC-CLAIMING / AUTHORED). The
 * judgement calls — does a figure materially teach this idea, is the figure
 * faithful, would a wrong figure be worse than none — are pedagogical and are
 * left to the report, not guessed at here.
 */
import { readFileSync } from 'node:fs'
import {
  getConceptVisualType, getConceptSceneGenerator, lookupConceptVisualBinding,
} from '../../src/lib/teaching/visualRegistry'
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'
import { INSUFFICIENT_FOR_CONCEPT } from '../../src/lib/teaching/visual/scope'

const SUBJECTS = ['physics', 'chemistry', 'mathematics', 'english', 'biology', 'computer_science']
const PREFIX: Record<string, string> = {
  phys: 'physics', math: 'mathematics', chem: 'chemistry',
  bio: 'biology', cs: 'computer_science', eng: 'english',
}

type Node = { id: string; title?: string }
function nodesOf(subject: string): Node[] {
  const g = getKnowledgeGraph(subject) as unknown as { modules?: Array<{ nodes?: Node[] }> } | null
  const out: Node[] = []
  for (const m of g?.modules ?? []) for (const n of m.nodes ?? []) out.push(n)
  return out
}

/** CONCEPT_VISUALS keys only — DOMAIN_VISUALS uses domainRule(...) syntax. */
function conceptKeys(): string[] {
  const src = readFileSync('src/lib/teaching/visualRegistry.ts', 'utf8')
  const from = src.indexOf('const CONCEPT_VISUALS')
  const to = src.indexOf('const DOMAIN_VISUALS')
  return [...new Set([...src.slice(from, to).matchAll(/^\s*'([a-z_]+\.[a-z0-9_.-]+)':\s*\{/gm)].map((m) => m[1]))]
}

function main(): void {
  const keys = new Set(conceptKeys())
  const rows: Array<{ subject: string; total: number; authored: number; exact: number; domainOnly: number; demoted: number; none: number }> = []
  let staleScope = 0
  const staleList: string[] = []

  for (const subject of SUBJECTS) {
    const nodes = nodesOf(subject)
    if (nodes.length === 0) continue
    let authored = 0, exact = 0, domainOnly = 0, demoted = 0, none = 0
    for (const n of nodes) {
      const type = getConceptVisualType(n.id)
      if (!type) { none++; continue }
      const isExact = keys.has(n.id)
      if (isExact) exact++; else domainOnly++
      if (getConceptSceneGenerator(n.id)) authored++
      if (INSUFFICIENT_FOR_CONCEPT.has(n.id)) demoted++
    }
    rows.push({ subject, total: nodes.length, authored, exact, domainOnly, demoted, none })
  }

  // A demotion entry naming a concept that renders nothing is stale: it
  // describes a figure that is no longer served.
  for (const id of INSUFFICIENT_FOR_CONCEPT) {
    if (!getConceptVisualType(id)) { staleScope++; staleList.push(id) }
  }

  // ORPHANS: registry keys naming no concept in any shipped KG.
  const allIds = new Set<string>()
  for (const s of SUBJECTS) for (const n of nodesOf(s)) allIds.add(n.id)
  const orphans = [...keys].filter((k) => !allIds.has(k))
  const orphansWithScene = orphans.filter((k) => getConceptSceneGenerator(k))

  console.log('SUBJECT         concepts  exact-row  domain-only  authored-scene  demoted  NO-VISUAL')
  let T = 0, E = 0, D = 0, A = 0, M = 0, N = 0
  for (const r of rows) {
    T += r.total; E += r.exact; D += r.domainOnly; A += r.authored; M += r.demoted; N += r.none
    console.log(
      `${r.subject.padEnd(16)}${String(r.total).padStart(5)}${String(r.exact).padStart(11)}` +
      `${String(r.domainOnly).padStart(13)}${String(r.authored).padStart(16)}` +
      `${String(r.demoted).padStart(9)}${String(r.none).padStart(11)}`)
  }
  console.log(`${'TOTAL'.padEnd(16)}${String(T).padStart(5)}${String(E).padStart(11)}${String(D).padStart(13)}${String(A).padStart(16)}${String(M).padStart(9)}${String(N).padStart(11)}`)
  console.log(`\ncoverage: ${T - N}/${T} concepts get SOME figure (${(100 * (T - N) / T).toFixed(1)}%)`)
  console.log(`orphan registry keys: ${orphans.length} (carrying an authored scene: ${orphansWithScene.length})`)
  console.log(`stale demotion entries (demoted concept that renders nothing): ${staleScope}`)
  for (const s of staleList) console.log(`   STALE  ${s}`)

  // GENERIC-CLAIMING: a concept whose figure comes from a shared/domain source
  // and is NOT demoted — i.e. it claims to depict the concept. This is the
  // group most worth a human's eyes, so it is listed rather than counted.
  const claiming: string[] = []
  for (const s of SUBJECTS) {
    for (const n of nodesOf(s)) {
      if (!getConceptVisualType(n.id)) continue
      if (keys.has(n.id)) continue                      // exact row: authored intent
      if (getConceptSceneGenerator(n.id)) continue      // authored scene: not generic
      if (INSUFFICIENT_FOR_CONCEPT.has(n.id)) continue  // already demoted: honest
      claiming.push(`${n.id}  "${n.title ?? ''}"  -> ${String(getConceptVisualType(n.id))}`)
    }
  }
  console.log(`\nGENERIC-CLAIMING (domain-default figure, not demoted): ${claiming.length}`)
  for (const c of claiming.slice(0, 40)) console.log(`   ${c}`)
  if (claiming.length > 40) console.log(`   … and ${claiming.length - 40} more`)
}
main()
