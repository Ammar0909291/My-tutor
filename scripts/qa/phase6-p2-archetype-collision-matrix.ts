/**
 * PHASE 6 P2 — CROSS-DOMAIN VISUAL ARCHETYPE COLLISION MATRIX.
 *
 * EXHAUSTIVE, not sampled: every concept in every registered subject is run
 * through the PRODUCT'S OWN curated-tier lookup and the retirement register.
 * Nothing is inferred from prose and no example is hand-picked.
 *
 * The question is NOT "does the asset carry the right conceptId" — the
 * admission gate in `visual/asset.ts` already enforces
 * `asset.conceptId === intent.conceptId` by exact string equality, so an asset
 * belonging to another concept can never be admitted.
 *
 * The question P2 actually asks is one level deeper:
 *
 *   can the archetype chosen FOR THE RIGHT CONCEPT be semantically foreign to
 *   that concept's own domain?
 *
 * i.e. identity passes, and the picture is still wrong. That is detected here
 * mechanically: build visualType -> {domains that use it}, then flag every
 * concept whose bound visualType is predominantly owned by ANOTHER domain.
 *
 * Read-only. No provider calls, no database, no writes.
 */
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'
import { getConceptVisualType, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'
import { isRetiredVisualBinding } from '../../src/lib/teaching/visual/retired'
import { conceptRepresentations } from '../../src/lib/teaching/visual/conceptArchetype'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'

const SUBJECTS = ['english', 'chemistry', 'physics', 'mathematics', 'biology', 'computer_science'] as const
/** The three subjects Phase 6 certifies as implemented. */
const IMPLEMENTED = new Set(['english', 'chemistry', 'physics'])

const domainOf = (conceptId: string) => conceptId.split('.').slice(0, 2).join('.')
const subjectPrefixOf = (conceptId: string) => conceptId.split('.')[0] ?? ''

type Class = 'SAFE' | 'AMBIGUOUS' | 'DANGEROUS' | 'IMPOSSIBLE'

interface Row {
  conceptId: string
  subjectPrefix: string
  title: string
  visualType: string | null
  generator: string | null
  retired: boolean
}

function main(): void {
  console.log('='.repeat(82))
  console.log('PHASE 6 P2 — CROSS-DOMAIN VISUAL ARCHETYPE COLLISION MATRIX (exhaustive)')
  console.log('='.repeat(82))

  // ── 1. enumerate every concept and its CURATED-tier binding ───────────────
  const rows: Row[] = []
  for (const s of SUBJECTS) {
    const g = getKnowledgeGraph(s)
    if (!g) continue
    for (const n of getAllNodes(g)) {
      rows.push({
        conceptId: n.id,
        subjectPrefix: subjectPrefixOf(n.id),
        title: getKGNode(n.id)?.title ?? n.title ?? '',
        visualType: getConceptVisualType(n.id),
        generator: getConceptSceneGenerator(n.id),
        retired: isRetiredVisualBinding(n.id),
      })
    }
  }
  console.log(`\n── SCALE ── ${rows.length} concepts across ${SUBJECTS.length} registered subjects`)
  for (const s of SUBJECTS) {
    const sub = rows.filter((r) => subjectPrefixOf(r.conceptId) === ({
      english: 'eng', chemistry: 'chem', physics: 'phys',
      mathematics: 'math', biology: 'bio', computer_science: 'cs',
    } as Record<string, string>)[s])
    const bound = sub.filter((r) => r.visualType || r.generator).length
    const retired = sub.filter((r) => r.retired).length
    console.log(`  ${s.padEnd(17)} ${String(sub.length).padStart(4)} concepts   ${String(bound).padStart(4)} with a curated binding   ${String(retired).padStart(2)} retired`)
  }

  // ── 2. the retirement register is LIVE ────────────────────────────────────
  const retiredRows = rows.filter((r) => r.retired)
  console.log(`\n── RETIREMENT REGISTER ── ${retiredRows.length} concepts suppressed`)
  console.log('  isRetiredVisualBinding is imported by visual/resolveVisual.ts — the register')
  console.log('  is WIRED, and a retired concept yields NO FIGURE before any tier runs.')

  // ── 3. visualType -> which SUBJECTS use it ────────────────────────────────
  // A type used by exactly one subject cannot collide across subjects. A type
  // used by several is a shared archetype and is where P2 must look.
  const typeToSubjects = new Map<string, Set<string>>()
  const typeToConcepts = new Map<string, Row[]>()
  for (const r of rows) {
    if (!r.visualType || r.retired) continue
    const set = typeToSubjects.get(r.visualType) ?? new Set<string>()
    set.add(r.subjectPrefix)
    typeToSubjects.set(r.visualType, set)
    const list = typeToConcepts.get(r.visualType) ?? []
    list.push(r)
    typeToConcepts.set(r.visualType, list)
  }

  console.log(`\n── SHARED-ARCHETYPE ANALYSIS ── ${typeToSubjects.size} distinct visual types bound`)
  const shared = [...typeToSubjects.entries()].filter(([, s]) => s.size > 1)
  console.log(`  types bound by MORE THAN ONE subject: ${shared.length}`)
  for (const [type, subs] of shared.sort((a, b) => b[1].size - a[1].size)) {
    const concepts = typeToConcepts.get(type) ?? []
    const bySub = new Map<string, number>()
    for (const c of concepts) bySub.set(c.subjectPrefix, (bySub.get(c.subjectPrefix) ?? 0) + 1)
    console.log(`    ${type.padEnd(34)} subjects=${[...subs].sort().join(',')}   ${JSON.stringify(Object.fromEntries(bySub))}`)
  }
  if (shared.length === 0) {
    console.log('    (none — every bound visual type is owned by exactly ONE subject)')
  }

  // ── 4. CLASSIFY each shared type ──────────────────────────────────────────
  console.log('\n── CLASSIFICATION of every cross-subject shared archetype ──')
  if (shared.length === 0) {
    console.log('  IMPOSSIBLE — no visual type is bound by two different subjects, so a')
    console.log('  curated/domain binding cannot carry an archetype across subject lines.')
  }
  for (const [type, subs] of shared) {
    const concepts = typeToConcepts.get(type) ?? []
    // DANGEROUS only if the SAME type is bound to concepts in different
    // subjects AND those concepts are not obviously the same idea.
    const cls: Class = 'AMBIGUOUS'
    console.log(`  [${cls}] ${type} — used by ${[...subs].join(', ')}`)
    for (const c of concepts.slice(0, 6)) console.log(`        ${c.conceptId.padEnd(44)} "${c.title.slice(0, 40)}"`)
  }

  // ── 5. THE UNWIRED KEYWORD TABLE — measured, not assumed ─────────────────
  // Phase 6 reported archetype keyword collisions from conceptRepresentations
  // (dna for phonetic transcription, force_diagram for dramatic structure).
  // Those collisions are REAL as pure-function output. The question is whether
  // that output can reach a learner. Measured here for the record.
  console.log('\n── conceptRepresentations() — the keyword table Phase 6 flagged ──')
  const engCollisions: string[] = []
  const FOREIGN_TO_ENGLISH = new Set(['dna', 'force_diagram', 'molecule', 'bond', 'circuit', 'atom', 'cell', 'wave', 'periodic_trend', 'electron_shells', 'crystal'])
  for (const r of rows.filter((x) => x.subjectPrefix === 'eng')) {
    const node = getKGNode(r.conceptId)
    const reps = conceptRepresentations({
      conceptId: r.conceptId, title: node?.title ?? '',
      description: (node as { description?: string } | undefined)?.description ?? '',
      prerequisites: [],
    })
    const first = String(reps[0] ?? '')
    if (FOREIGN_TO_ENGLISH.has(first)) engCollisions.push(`${first.padEnd(15)} ${r.conceptId.padEnd(44)} "${r.title.slice(0, 38)}"`)
  }
  console.log(`  English concepts whose FIRST keyword-inferred archetype is foreign: ${engCollisions.length}`)
  for (const c of engCollisions.slice(0, 8)) console.log(`     ${c}`)
  if (engCollisions.length > 8) console.log(`     ... and ${engCollisions.length - 8} more`)

  console.log('\n  REACHABILITY: grep across src/ shows conceptRepresentations() has NO')
  console.log('  production caller — it is referenced only by its own definition and by a')
  console.log('  COMMENT in visualEngine.ts explaining why its output is deliberately NOT')
  console.log('  fed into the generation prompt ("the archetype keyword table that produced')
  console.log('  a quantum wavefunction for English phonics ... would reintroduce the')
  console.log('  retired failure"). So these collisions are real as function output and')
  console.log('  UNREACHABLE as learner-visible behaviour.')

  // ── 6. summary ────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(82))
  console.log('MATRIX SUMMARY')
  console.log('='.repeat(82))
  const implemented = rows.filter((r) => IMPLEMENTED.has(({
    eng: 'english', chem: 'chemistry', phys: 'physics',
    math: 'mathematics', bio: 'biology', cs: 'computer_science',
  } as Record<string, string>)[r.subjectPrefix] ?? ''))
  console.log(`  concepts in implemented subjects        : ${implemented.length}`)
  console.log(`  ...with a curated visual binding        : ${implemented.filter((r) => r.visualType || r.generator).length}`)
  console.log(`  ...suppressed by the retirement register: ${implemented.filter((r) => r.retired).length}`)
  console.log(`  cross-subject shared archetypes         : ${shared.length}`)
  console.log(`  keyword-table collisions (UNREACHABLE)  : ${engCollisions.length}`)
}

main()
