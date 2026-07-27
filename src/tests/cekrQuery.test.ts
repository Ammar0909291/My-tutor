/**
 * C5 — the Brain language service core (SDK-M3 refs, SDK-M4 lenses).
 *
 * Two levels: hand-built fixtures pin the semantics exactly, and the REAL
 * physics corpus proves the queries survive a 238-concept graph — an impact
 * analysis that only works on a 4-node fixture has not been shown to analyse
 * anything.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  buildIndex, resolveId, entityCard, findReferences, impactOf, neighborhood,
  formatCard, formatReferences, IMPACT_EDGE_KINDS,
} from '@/lib/cekr/query'
import { importKg, type KgGraph } from '@/lib/cekr/import'

/** a ← b ← c chain, plus d off to the side and an explanation on a. */
function fixture() {
  const graph: KgGraph = {
    concepts: [
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B', requires: ['a'] },
      { id: 'c', name: 'C', requires: ['b'] },
      { id: 'd', name: 'D', requires: ['a'] },
    ],
  }
  return buildIndex(importKg(graph, { file: 'g.json' }).records)
}

const physics = () => {
  const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8')) as KgGraph
  const known = new Set(graph.concepts.map((c) => c.id))
  return buildIndex(importKg(graph, { file: 'docs/physics/kg/graph.json', knownConceptIds: known }).records)
}

// ── resolution ──────────────────────────────────────────────────────────────

describe('authors type slugs, not entity ids', () => {
  const index = fixture()

  it('resolves a bare KG slug', () => {
    // The defect the first draft had: entity ids are cekr:<Kind>/<slug>, so a
    // service accepting only the internal form reports every real slug as
    // unknown — answering a question nobody asks.
    expect(resolveId(index, 'b')).toBe('cekr:Concept/b')
  })

  it('accepts a full entity id unchanged', () => {
    expect(resolveId(index, 'cekr:Concept/b')).toBe('cekr:Concept/b')
  })

  it('returns null for an unknown slug rather than guessing', () => {
    expect(resolveId(index, 'nope')).toBeNull()
  })

  it('returns null for an AMBIGUOUS slug rather than picking one', () => {
    // Silently picking a kind would make find-references quietly incomplete,
    // which is worse than saying "ambiguous".
    const ambiguous = buildIndex([
      { ...(fixture().entities.get('cekr:Concept/a')!), id: 'cekr:Concept/x' },
      { ...(fixture().entities.get('cekr:Concept/a')!), id: 'cekr:Explanation/x', kind: 'Explanation' },
    ])
    expect(resolveId(ambiguous, 'x')).toBeNull()
  })
})

// ── SDK-M3 ──────────────────────────────────────────────────────────────────

describe('entity card (hover / go-to-definition)', () => {
  const index = fixture()

  it('reports kind, status, defining file and degree by edge kind', () => {
    const card = entityCard(index, 'cekr:Concept/a')!
    expect(card).toMatchObject({ kind: 'Concept', status: 'DRAFT', citation: 'g.json' })
    // a is required by b and d, and unlocks both.
    expect(card.degree.in.REQUIRES).toBe(2)
    expect(card.degree.out.UNLOCKS).toBe(2)
  })

  it('returns null for an unknown id — a legitimate query, not an error', () => {
    expect(entityCard(index, 'cekr:Concept/ghost')).toBeNull()
    expect(formatCard(null, 'ghost')).toContain('unknown id')
  })
})

describe('find references', () => {
  const index = fixture()

  it('finds both directions and labels them', () => {
    const refs = findReferences(index, 'cekr:Concept/b')
    expect(refs.some((r) => r.direction === 'incoming' && r.edgeKind === 'REQUIRES' && r.otherId === 'cekr:Concept/c')).toBe(true)
    expect(refs.some((r) => r.direction === 'outgoing' && r.edgeKind === 'REQUIRES' && r.otherId === 'cekr:Concept/a')).toBe(true)
  })

  it('is stably ordered — an unstable reference list is unusable', () => {
    expect(JSON.stringify(findReferences(index, 'cekr:Concept/a')))
      .toBe(JSON.stringify(findReferences(index, 'cekr:Concept/a')))
  })

  it('reports an id with no references without failing', () => {
    expect(formatReferences([], 'x')).toContain('no references')
  })
})

// ── SDK-M4 impact lens ──────────────────────────────────────────────────────

describe('impact analysis (EBC §12.4)', () => {
  const index = fixture()

  it('walks TRANSITIVELY: changing a impacts b, c and d', () => {
    const rep = impactOf(index, 'cekr:Concept/a')
    expect(rep.impacted.map((n) => n.id).sort()).toEqual([
      'cekr:Concept/b', 'cekr:Concept/c', 'cekr:Concept/d',
    ])
    // Distance is the real dependency depth, not a flat list.
    expect(rep.impacted.find((n) => n.id === 'cekr:Concept/b')!.distance).toBe(1)
    expect(rep.impacted.find((n) => n.id === 'cekr:Concept/c')!.distance).toBe(2)
  })

  it('is directional — changing a LEAF impacts nothing', () => {
    expect(impactOf(index, 'cekr:Concept/c').impacted).toEqual([])
    expect(impactOf(index, 'cekr:Concept/c').dependsOn).toEqual(['cekr:Concept/b'])
  })

  it('follows only load-bearing edges, never explanatory ones', () => {
    // If EXPLAINS/TARGETS counted, the answer to "what breaks" would drift
    // toward "everything", which helps nobody.
    expect(IMPACT_EDGE_KINDS).toEqual(['REQUIRES', 'REQUIRES_CAPABILITY', 'REFINES', 'PART_OF'])
    expect(IMPACT_EDGE_KINDS).not.toContain('EXPLAINS')
    expect(IMPACT_EDGE_KINDS).not.toContain('UNLOCKS')   // the derived mirror
  })

  it('never revisits a node — a diamond does not duplicate', () => {
    const diamond = buildIndex(importKg({
      concepts: [
        { id: 'top' }, { id: 'l', requires: ['top'] }, { id: 'r', requires: ['top'] },
        { id: 'bot', requires: ['l', 'r'] },
      ],
    }, { file: 'g.json' }).records)
    const ids = impactOf(diamond, 'cekr:Concept/top').impacted.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toHaveLength(3)
  })

  it('bounds the walk and SAYS SO instead of silently truncating', () => {
    const rep = impactOf(fixture(), 'cekr:Concept/a', 2)
    expect(rep.impacted).toHaveLength(2)
    expect(rep.truncated).toBe(true)
    expect(impactOf(fixture(), 'cekr:Concept/a').truncated).toBe(false)
  })

  it('is deterministic', () => {
    expect(JSON.stringify(impactOf(index, 'cekr:Concept/a')))
      .toBe(JSON.stringify(impactOf(index, 'cekr:Concept/a')))
  })
})

// ── SDK-M4 neighborhood lens ────────────────────────────────────────────────

describe('neighborhood lens', () => {
  const index = fixture()

  it('rings by hop distance over REQUIRES/UNLOCKS, both directions', () => {
    const n = neighborhood(index, 'cekr:Concept/a', 1)
    expect(n.rings[0]).toEqual(['cekr:Concept/a'])
    expect(n.rings[1]).toEqual(['cekr:Concept/b', 'cekr:Concept/d'])
  })

  it('widens with the radius', () => {
    expect(neighborhood(index, 'cekr:Concept/a', 2).rings[2]).toEqual(['cekr:Concept/c'])
  })

  it('flags concepts with no authored explanation (the coverage colouring)', () => {
    // Nothing in the fixture has an EXPLAINS edge, so every concept reached
    // is uncovered — the honest answer for a KG-only import.
    expect(neighborhood(index, 'cekr:Concept/a', 2).uncovered).toHaveLength(4)
  })
})

// ── against the real corpus ─────────────────────────────────────────────────

describe('the real physics graph', () => {
  const index = physics()

  it('indexes every concept and resolves real slugs', () => {
    expect(index.entities.size).toBeGreaterThanOrEqual(238)
    expect(resolveId(index, 'phys.meas.units')).toBe('cekr:Concept/phys.meas.units')
  })

  it('the root concept impacts a large, bounded, deduplicated set', () => {
    const rep = impactOf(index, 'cekr:Concept/phys.meas.units', 500)
    expect(rep.impacted.length).toBeGreaterThan(100)
    expect(new Set(rep.impacted.map((n) => n.id)).size).toBe(rep.impacted.length)
    // The root of a prerequisite DAG depends on nothing.
    expect(rep.dependsOn).toEqual([])
    // Distances are non-decreasing — BFS order, not insertion order.
    const d = rep.impacted.map((n) => n.distance)
    expect(d).toEqual([...d].sort((x, y) => x - y))
  })

  it('a deep concept impacts fewer things than the root', () => {
    const deep = resolveId(index, 'phys.rel.length-contraction')!
    expect(impactOf(index, deep).impacted.length)
      .toBeLessThan(impactOf(index, 'cekr:Concept/phys.meas.units', 500).impacted.length)
  })

  it('is deterministic at corpus scale', () => {
    const run = () => JSON.stringify(impactOf(physics(), 'cekr:Concept/phys.meas.units', 500))
    expect(run()).toBe(run())
  })
})
