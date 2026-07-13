import { describe, it, expect } from 'vitest'
import { computeCurriculumEntryOrder, getPlacementFloorSlugs } from '@/lib/curriculum/placement'
import type { KnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'

// A small synthetic KG mirroring the real shape: 2 modules, mixed difficulties,
// in the same flat walk order /api/curriculum uses (module-major, node-minor).
const GRAPH: KnowledgeGraph = {
  subject: 'test',
  modules: [
    {
      title: 'Module 1',
      nodes: [
        { id: 'a', slug: 'a', title: 'A', description: '', prerequisites: [], difficulty: 'foundational' },
        { id: 'b', slug: 'b', title: 'B', description: '', prerequisites: ['a'], difficulty: 'foundational' },
        { id: 'c', slug: 'c', title: 'C', description: '', prerequisites: ['b'], difficulty: 'developing' },
        { id: 'd', slug: 'd', title: 'D', description: '', prerequisites: ['c'], difficulty: 'proficient' },
      ],
    },
    {
      title: 'Module 2',
      nodes: [
        { id: 'e', slug: 'e', title: 'E', description: '', prerequisites: ['d'], difficulty: 'advanced' },
        { id: 'f', slug: 'f', title: 'F', description: '', prerequisites: ['e'], difficulty: 'expert' },
      ],
    },
  ],
}

describe('computeCurriculumEntryOrder', () => {
  it('beginner always enters at order 1 (no skip)', () => {
    expect(computeCurriculumEntryOrder(GRAPH, 'beginner')).toBe(1)
  })

  it('intermediate enters at the first "proficient" node', () => {
    // flat order: a(1) b(2) c(3) d(4) e(5) f(6) — d is the first proficient+
    expect(computeCurriculumEntryOrder(GRAPH, 'intermediate')).toBe(4)
  })

  it('advanced enters at the first "advanced" node', () => {
    expect(computeCurriculumEntryOrder(GRAPH, 'advanced')).toBe(5)
  })

  it('falls back to 1 when the subject has no content at that difficulty', () => {
    const shallowGraph: KnowledgeGraph = {
      subject: 'shallow',
      modules: [{ title: 'M', nodes: [
        { id: 'x', slug: 'x', title: 'X', description: '', prerequisites: [], difficulty: 'foundational' },
      ] }],
    }
    expect(computeCurriculumEntryOrder(shallowGraph, 'advanced')).toBe(1)
  })

  it('treats a missing difficulty tag as foundational (never crashes, never over-skips)', () => {
    const graphNoDiff: KnowledgeGraph = {
      subject: 'nodiff',
      modules: [{ title: 'M', nodes: [
        { id: 'x', slug: 'x', title: 'X', description: '', prerequisites: [] },
      ] }],
    }
    expect(computeCurriculumEntryOrder(graphNoDiff, 'advanced')).toBe(1)
  })
})

describe('getPlacementFloorSlugs', () => {
  it('beginner has an empty placement floor (nothing skipped)', () => {
    expect(getPlacementFloorSlugs(GRAPH, 'beginner').size).toBe(0)
  })

  it('intermediate treats a, b, c as placement-available (not d itself)', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'intermediate')
    expect([...floor].sort()).toEqual(['a', 'b', 'c'])
  })

  it('advanced treats a, b, c, d as placement-available', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'advanced')
    expect([...floor].sort()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('never includes the entry node itself or anything after it', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'intermediate')
    expect(floor.has('d')).toBe(false)
    expect(floor.has('e')).toBe(false)
    expect(floor.has('f')).toBe(false)
  })
})
