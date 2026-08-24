/**
 * PHASE 6 P2 — cross-domain visual archetype collisions.
 *
 * THE QUESTION, precisely: not "does the asset carry the right conceptId" (the
 * admission gate already enforces that by exact string equality), but one level
 * deeper —
 *
 *   can the archetype chosen FOR THE RIGHT CONCEPT be semantically foreign to
 *   that concept's own subject?
 *
 * i.e. identity passes and the picture is still wrong. Phase 6 flagged this as
 * LATENT on the strength of `conceptRepresentations()` assigning `dna` to
 * phonetic transcription and `force_diagram` to dramatic structure.
 *
 * The audit's answer, pinned here: those collisions are REAL as function output
 * and UNREACHABLE as learner-visible behaviour, and every path that CAN reach a
 * learner is subject-scoped by construction. The most important test in this
 * file is the structural guard in §1 — it is what fails if someone ever wires
 * the keyword table back in.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { admitVisualAsset, makeVisualAsset } from '@/lib/teaching/visual/asset'
import { lookupConceptVisualBinding, getConceptVisualType } from '@/lib/teaching/visualRegistry'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { conceptRepresentations } from '@/lib/teaching/visual/conceptArchetype'
import { getKnowledgeGraph, getAllNodes, getKGNode } from '@/lib/curriculum/knowledgeGraph'

const SUBJECTS = ['english', 'chemistry', 'physics', 'mathematics', 'biology', 'computer_science']
const allConceptIds = (): string[] => {
  const out: string[] = []
  for (const s of SUBJECTS) {
    const g = getKnowledgeGraph(s)
    if (g) out.push(...getAllNodes(g).map((n) => n.id))
  }
  return out
}

/** Every .ts file under src/, excluding tests. */
function productionSources(dir = 'src', acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) { productionSources(p, acc); continue }
    if (!p.endsWith('.ts') && !p.endsWith('.tsx')) continue
    if (p.includes('/tests/') || p.endsWith('.test.ts') || p.endsWith('.test.tsx')) continue
    acc.push(p)
  }
  return acc
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE STRUCTURAL GUARD — the keyword table must stay unwired
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P2 — conceptRepresentations() must have NO production caller', () => {
  it('is referenced by no production module except its own definition', () => {
    // WHY THIS IS THE MOST IMPORTANT TEST HERE. visualEngine.ts's own comment
    // records the reason it is unwired: it is "the archetype keyword table that
    // produced a quantum wavefunction for English phonics", and feeding its
    // output back in "would reintroduce the retired failure". Nothing else
    // enforces that. Without this guard, one import re-opens the defect and
    // every other test in this file would still pass.
    const offenders: string[] = []
    for (const file of productionSources()) {
      if (file.endsWith('visual/conceptArchetype.ts')) continue   // its own definition
      const src = readFileSync(file, 'utf8')
      // A comment mentioning the name is fine; an actual call or import is not.
      const callsIt = /\bconceptRepresentations\s*\(/.test(src.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ''))
      const importsIt = /import[^;]*\bconceptRepresentations\b[^;]*from/.test(src)
      if (callsIt || importsIt) offenders.push(file)
    }
    expect(offenders).toEqual([])
  })

  it('and its collisions are genuinely real — this is not a claim that it is harmless', () => {
    // Measured: English concepts whose FIRST inferred archetype belongs to
    // another subject entirely. If this ever drops to 0 the table was fixed,
    // which is fine; the guard above is what actually protects learners.
    const FOREIGN = new Set(['dna', 'force_diagram', 'molecule', 'bond', 'circuit', 'atom', 'cell', 'wave'])
    const g = getKnowledgeGraph('english')!
    const collisions = getAllNodes(g).filter((n) => {
      const node = getKGNode(n.id)
      const reps = conceptRepresentations({
        conceptId: n.id, title: node?.title ?? '',
        description: (node as { description?: string } | undefined)?.description ?? '',
        prerequisites: [],
      })
      return FOREIGN.has(String(reps[0] ?? ''))
    })
    expect(collisions.length).toBeGreaterThan(0)   // the defect is real...
    // ...and unreachable, per the guard above.
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE ADMISSION GATE — cross-concept substitution is impossible
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P2 — an asset belonging to another concept can never be admitted', () => {
  const asset = (conceptId: string) => makeVisualAsset({
    assetId: `t:${conceptId}`, conceptId, conceptTitle: 'x',
    representation: 'labelled_figure',
    payload: { renderer: 'card', visualType: 'force_diagram' },
    provenance: 'curated',
  })
  const intent = (conceptId: string) => ({
    conceptId, conceptTitle: 'x', purpose: 'explain',
  } as Parameters<typeof admitVisualAsset>[0])

  it('rejects a PHYSICS asset offered for an ENGLISH concept', () => {
    const r = admitVisualAsset(intent('eng.grammar.nouns'), asset('phys.mech.force'))
    expect(r.ok).toBe(false)
    expect(r.ok === false && r.reason).toBe('identity-mismatch')
  })

  it('rejects a CHEMISTRY asset offered for a PHYSICS concept', () => {
    const r = admitVisualAsset(intent('phys.mech.force'), asset('chem.bond.hybridization'))
    expect(r.ok).toBe(false)
    expect(r.ok === false && r.reason).toBe('identity-mismatch')
  })

  it('admits the concept\'s OWN asset — no over-blocking', () => {
    expect(admitVisualAsset(intent('phys.mech.force'), asset('phys.mech.force')).ok).toBe(true)
  })

  it('rejects an asset with no identity at all rather than guessing', () => {
    expect(admitVisualAsset(intent('phys.mech.force'), null).ok).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. EXHAUSTIVE — no binding crosses a subject line, over every concept
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P2 — every curated/domain binding is subject-scoped', () => {
  it('no concept in ANY subject resolves to a binding scoped to another subject', () => {
    const violations: string[] = []
    for (const id of allConceptIds()) {
      const b = lookupConceptVisualBinding(id)
      if (!b) continue
      if (id.split('.')[0] !== b.scope.split('.')[0]) {
        violations.push(`${id} <- ${b.scope} (${b.tier})`)
      }
    }
    // Measured at audit time: 500 bindings resolved across 1,775 concepts,
    // 0 violations. A DOMAIN_VISUALS prefix is always subject-scoped
    // ('phys.mech', 'math.arith'), and `startsWith` therefore cannot match
    // across subjects.
    expect(violations).toEqual([])
  })

  it('the exhaustive sweep actually covered the whole curriculum', () => {
    expect(allConceptIds().length).toBeGreaterThan(1700)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. THE RETIREMENT REGISTER IS WIRED AND EFFECTIVE
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P2 — semantically wrong bindings are suppressed before any tier', () => {
  it('resolveVisual imports the register — it is not a dormant document', () => {
    const src = readFileSync('src/lib/teaching/visual/resolveVisual.ts', 'utf8')
    expect(src).toMatch(/import\s*\{[^}]*isRetiredVisualBinding[^}]*\}\s*from\s*'\.\/retired'/)
  })

  it('known-wrong bindings report as retired', () => {
    // Each of these was found by the M3-A audit to paint a different situation
    // than the concept requires.
    expect(isRetiredVisualBinding('phys.opt.reflection')).toBe(true)
    expect(isRetiredVisualBinding('phys.mech.keplers-laws')).toBe(true)
  })

  it('an ordinary concept is NOT retired — the register is targeted, not blanket', () => {
    expect(isRetiredVisualBinding('phys.mech.force')).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. ENGLISH — the subject Phase 6 worried about — has no curated binding at all
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P2 — English cannot receive a curated visual of any kind', () => {
  it('no English concept has a curated or domain-default visual binding', () => {
    const g = getKnowledgeGraph('english')!
    const bound = getAllNodes(g).map((n) => n.id).filter((id) => getConceptVisualType(id) !== null)
    // 0/216. So the archetype-collision worry cannot express itself through the
    // curated path for English at all — there is nothing to collide with. It
    // also explains the measured 0/216 English visual coverage, which is a
    // consequence of having no bindings, not of a suppression.
    expect(bound).toEqual([])
  })

  it('physics, by contrast, does have bindings — so the check above is meaningful', () => {
    const g = getKnowledgeGraph('physics')!
    const bound = getAllNodes(g).map((n) => n.id).filter((id) => getConceptVisualType(id) !== null)
    expect(bound.length).toBeGreaterThan(50)
  })
})
