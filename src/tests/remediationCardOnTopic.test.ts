import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { cardConceptIsOnTopic } from '@/lib/teaching/conceptAdjacency'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

/**
 * A remediation card must belong to the lesson, or sit next to it.
 *
 * THE PRODUCTION DEFECT, 2026-08-31, run as an average student on a real
 * account: during `phys.qm.perturbation-theory` the learner asked what "that
 * angle bracket thing" meant — bra-ket notation — and was served the
 * owner-promoted card for `phys.opt.total-internal-reflection`, verbatim,
 * about swimming pools and optical fibres. When they objected, the same
 * paragraph came back again.
 *
 * The resolver produced a confident wrong concept id and nothing downstream
 * could tell. Three resolver-side fixes were rejected by measurement; this
 * guard is structural instead of lexical.
 */
describe('a remediation card may only serve for this lesson or a neighbour', () => {
  it('BLOCKS the exact production defect', () => {
    expect(cardConceptIsOnTopic('phys.qm.perturbation-theory', 'phys.opt.total-internal-reflection'))
      .toBe(false)
  })

  it('allows the ordinary case — the card IS the lesson concept', () => {
    // This is what every normal remediation turn does, and it must be untouched.
    for (const id of [
      'phys.qm.perturbation-theory',
      'phys.mech.friction',
      'phys.meas.units',
      'chem.org.pericyclic',
    ]) expect(cardConceptIsOnTopic(id, id), id).toBe(true)
  })

  it('allows a prerequisite detour, which is the excursion the engine opens', () => {
    // Phase 4 opens an excursion to a PREREQUISITE when a learner names a gap.
    // Those are adjacent by construction, so the guard must not block them.
    const lesson = 'phys.qm.perturbation-theory'
    const prereqs = getKGNode(lesson)?.prerequisites ?? []
    expect(prereqs.length, 'fixture concept should have prerequisites').toBeGreaterThan(0)
    for (const p of prereqs) expect(cardConceptIsOnTopic(lesson, p), p).toBe(true)
  })

  it('allows the reverse edge — a concept this lesson unlocks', () => {
    // Adjacency is undirected: teaching forward to what this concept enables is
    // as on-topic as teaching back to what it needs.
    const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
    const concepts: Array<{ id: string; requires?: string[] }> = g.concepts ?? g
    const child = concepts.find((c) => (c.requires ?? []).length > 0)!
    const parent = (child.requires ?? [])[0]
    expect(cardConceptIsOnTopic(parent, child.id), `${parent} -> ${child.id}`).toBe(true)
  })

  it('fails safe: no lesson anchor is no evidence, so nothing is withheld', () => {
    expect(cardConceptIsOnTopic(null, 'phys.opt.total-internal-reflection')).toBe(true)
    expect(cardConceptIsOnTopic(undefined, 'phys.mech.friction')).toBe(true)
  })

  it('withholds when there is no card concept at all', () => {
    expect(cardConceptIsOnTopic('phys.mech.friction', null)).toBe(false)
  })

  it('blocks distant concepts inside the same subject, not just across domains', () => {
    // The defect crossed domains (qm -> opt), but the rule is adjacency, not
    // domain equality — two unrelated mechanics concepts are equally wrong.
    expect(cardConceptIsOnTopic('phys.qm.perturbation-theory', 'phys.mech.friction')).toBe(false)
  })

  it('is wired into the card call site, ahead of the lookup', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain('cardConceptIsOnTopic')
    expect(route.indexOf('cardConceptIsOnTopic')).toBeLessThan(route.indexOf('findRemediationCard(conceptForCard)'))
    // The anchor must be LESSON state, never the request-derived id — using
    // resolvedConceptId would let the same bad resolution authorise itself.
    expect(route).toContain('libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? null')
  })
})

/**
 * THE ANCHOR IS WHAT THIS TURN TEACHES, NOT THE LESSON.
 *
 * MEASURED (phys.mech.friction, 2026-09-01, real account, studied as a
 * learner): the learner said "what is the normal force… i dont get it", the
 * engine correctly opened a knowledge-gap excursion to
 * phys.mech.normal-force, and this guard withheld the normal-force card on
 * EVERY turn of that excursion:
 *
 *   [remediation-card] withheld — off-topic for this lesson
 *     { lesson: 'phys.mech.friction', card: 'phys.mech.normal-force' }
 *
 * The guard's own comment had claimed "a prerequisite detour stays adjacent".
 * That was an assumption, and it is false here: the two concepts are SIBLINGS,
 * both requiring phys.mech.free-body-diagram, with no prerequisite edge
 * between them in either direction. `neighbours()` was right; the anchor was
 * wrong.
 */
describe('a legitimate excursion is not off-topic', () => {
  const KG = require('fs').readFileSync('docs/physics/kg/graph.json', 'utf8')
  const byId = new Map<string, { requires?: string[]; unlocks?: string[] }>(
    (JSON.parse(KG).concepts as Array<{ id: string; requires?: string[]; unlocks?: string[] }>)
      .map((c) => [c.id, c]),
  )

  it('the two concepts really are siblings, not prerequisites', () => {
    // Pins WHY the guard fired, so a future KG edit that adds the edge shows
    // up here rather than silently changing what this test is about.
    const friction = byId.get('phys.mech.friction')!
    const normal = byId.get('phys.mech.normal-force')!
    expect(friction.requires).toContain('phys.mech.free-body-diagram')
    expect(normal.requires).toContain('phys.mech.free-body-diagram')
    expect(friction.requires ?? []).not.toContain('phys.mech.normal-force')
    expect(normal.requires ?? []).not.toContain('phys.mech.friction')
  })

  it('so the LESSON anchor withholds the excursion card — the defect', () => {
    expect(cardConceptIsOnTopic('phys.mech.friction', 'phys.mech.normal-force')).toBe(false)
  })

  it('and the TAUGHT-CONCEPT anchor admits it — the fix', () => {
    // During the excursion, decisionConceptIdHoisted IS phys.mech.normal-force.
    expect(cardConceptIsOnTopic('phys.mech.normal-force', 'phys.mech.normal-force')).toBe(true)
  })

  it('an unrelated card is still refused under the new anchor', () => {
    // The protection the guard exists for is unchanged: the optics card served
    // during a quantum lesson would still be withheld.
    expect(cardConceptIsOnTopic('phys.mech.normal-force', 'phys.opt.total-internal-reflection')).toBe(false)
  })
})

describe('the route anchors on the taught concept', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf-8') as string

  it('prefers decisionConceptIdHoisted over the lesson node', () => {
    expect(ROUTE).toMatch(/const cardLessonAnchor\s*=\s*\n?\s*decisionConceptIdHoisted \?\? libraryConceptNodeIdHoisted/)
  })
})
