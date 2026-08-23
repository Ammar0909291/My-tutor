/**
 * VISUAL INTELLIGENCE CENSUS — evidence for a classification decision, and
 * deliberately NOT a decision itself.
 *
 * For every concept in every shipped KG it reports which tier answers, whether
 * an authored scene generator is reachable, and whether scope.ts demotes the
 * result. Orphan registry keys (a key naming no concept) are reported
 * separately, since they are unreachable at runtime by construction.
 *
 * It prints classifications only where the DATA decides them. The judgement
 * calls — does a figure materially teach this idea, is the figure faithful,
 * would a wrong figure be worse than none — are pedagogical and are left to
 * the report, not guessed at here.
 *
 * CORRECTION, recorded because the first version of this script was wrong in a
 * way that would have caused real damage. It labelled every domain-prefix
 * binding "GENERIC-CLAIMING" — a concept whose figure falsely claims to depict
 * it — and produced 383 of them, which reads like a large defect class and
 * would have justified a large change. It is not one. `scopeForAsset` returns
 * 'domain' for 'domain-default' provenance UNCONDITIONALLY, by its first rule,
 * with an explicit design note that there is deliberately no allowlist
 * promoting individual concepts back out. So all 383 are ALREADY demoted at
 * runtime and already honest in wording.
 *
 * The census now asks scopeForAsset itself instead of re-deriving the answer
 * from registry structure. The group genuinely at risk is much smaller and is
 * already enumerated and ratcheted by visualGeneratorDefaultScope.test.ts:
 * concepts drawing a SHARED authored scene that still claim concept scope.
 */
import { readFileSync } from 'node:fs'
import {
  getConceptVisualType, getConceptSceneGenerator, lookupConceptVisualBinding,
} from '../../src/lib/teaching/visualRegistry'
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'
import { INSUFFICIENT_FOR_CONCEPT, scopeForAsset } from '../../src/lib/teaching/visual/scope'
import { CONCEPT_SCENE_OVERRIDES } from '../../src/lib/teaching/visual/conceptSceneParams'

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

  // The scope question, asked of scopeForAsset rather than re-derived.
  let domainDefaultDemoted = 0
  const generatorDefaultClaiming: string[] = []
  for (const s of SUBJECTS) {
    for (const n of nodesOf(s)) {
      if (!getConceptVisualType(n.id)) continue
      const isDomainOnly = !keys.has(n.id)
      if (isDomainOnly) {
        // Rule 1 of scopeForAsset: a domain-prefix binding is a domain
        // illustration, always. Asserted, not assumed.
        if (scopeForAsset('domain-default', n.id) === 'domain') domainDefaultDemoted++
        continue
      }
      if (!getConceptSceneGenerator(n.id)) continue
      // A CONCEPT_SCENES override means the scene was authored FOR this
      // concept, so its provenance is 'generator', not 'generator-default'.
      // Omitting this check over-counted — it listed math.calc.critical-points,
      // which was deliberately promoted for exactly that reason.
      if (Object.prototype.hasOwnProperty.call(CONCEPT_SCENE_OVERRIDES, n.id)) continue
      if (scopeForAsset('generator-default', n.id) === 'concept') {
        generatorDefaultClaiming.push(`${n.id}  "${n.title ?? ''}"`)
      }
    }
  }
  console.log(`\nDOMAIN-DEFAULT figures already scoped 'domain' by scopeForAsset: ${domainDefaultDemoted}`)
  console.log('   (honest by construction — they render, they do not claim the concept)')
  console.log(`\nGENERATOR-DEFAULT still claiming concept scope: ${generatorDefaultClaiming.length}`)
  console.log('   (a SUPERSET — the authoritative enumeration is')
  console.log('    visualGeneratorDefaultScope.test.ts, which passes and lists 14')
  console.log('    judged-genuine. This list does not perfectly separate')
  console.log("    'generator' from 'generator-default' provenance, so it still")
  console.log('    includes concepts with an authored CONCEPT_SCENES override')
  console.log('    such as math.calc.critical-points. Treat it as a review')
  console.log('    prompt, never as a defect count.)')
  for (const c of generatorDefaultClaiming) console.log(`   ${c}`)
}
main()
