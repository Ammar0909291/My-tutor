import { describe, it, expect } from 'vitest'
import {
  lookupConceptVisual, getConceptVisualType, getConceptSceneGenerator,
} from '@/lib/teaching/visualRegistry'

describe('visualRegistry', () => {
  // ── Tier 1: exact concept matches ──────────────────────────────────────

  it('returns exact match for a concept with a dedicated visual', () => {
    const entry = lookupConceptVisual('phys.mech.projectile-motion')
    expect(entry).not.toBeNull()
    expect(entry!.primary).toBe('three_projectile_motion')
    expect(entry!.all).toContain('three_projectile_motion')
    expect(entry!.sceneGenerator).toBe('projectile')
  })

  it('returns exact match for fractions', () => {
    expect(getConceptVisualType('math.arith.fractions')).toBe('fraction_bar')
  })

  it('returns exact match for chemistry bonding', () => {
    expect(getConceptVisualType('chem.bond.molecular-geometry')).toBe('three_molecular_shapes')
  })

  it('returns scene generator for concept with one', () => {
    expect(getConceptSceneGenerator('phys.mech.collisions')).toBe('collision')
  })

  it('returns null scene generator for concept without one', () => {
    expect(getConceptSceneGenerator('math.arith.fractions')).toBeNull()
  })

  // ── Tier 2: domain prefix fallback ─────────────────────────────────────

  it('falls back to domain visual when no exact match', () => {
    const entry = lookupConceptVisual('phys.mech.some-unlisted-concept')
    expect(entry).not.toBeNull()
    expect(entry!.primary).toBe('force_diagram')
  })

  it('matches the longest domain prefix', () => {
    const entry = lookupConceptVisual('math.geom.something-new')
    expect(entry).not.toBeNull()
    expect(entry!.primary).toBe('geometry_shape')
  })

  it('domain match returns all available types', () => {
    const entry = lookupConceptVisual('phys.mech.unknown-mechanics')
    expect(entry!.all).toEqual(['force_diagram', 'three_newton_forces'])
  })

  // ── Null cases ─────────────────────────────────────────────────────────

  it('returns null for unknown concept with no matching domain', () => {
    expect(lookupConceptVisual('unknown.subject.concept')).toBeNull()
  })

  it('returns null for null concept ID', () => {
    expect(lookupConceptVisual(null)).toBeNull()
  })

  it('getConceptVisualType returns null for null', () => {
    expect(getConceptVisualType(null)).toBeNull()
  })

  it('getConceptSceneGenerator returns null for null', () => {
    expect(getConceptSceneGenerator(null)).toBeNull()
  })

  // ── Tier 1 beats Tier 2 ────────────────────────────────────────────────

  it('exact concept match overrides domain default', () => {
    const exact = getConceptVisualType('phys.mech.projectile-motion')
    const domain = lookupConceptVisual('phys.mech.some-other')
    expect(exact).toBe('three_projectile_motion')
    expect(domain!.primary).toBe('force_diagram')
  })

  // ── Cross-subject coverage checks ──────────────────────────────────────

  it.each([
    ['phys.mech.newtons-first-law', 'three_newton_forces'],
    ['chem.bond.ionic-bond', 'three_bond_formation'],
    ['bio.eco.food-chains', 'food_chain'],
    ['math.arith.integers', 'number_line'],
    ['cs.algo.sorting', 'three_algorithm_visualization'],
  ] as const)('concept %s → %s', (conceptId, expected) => {
    expect(getConceptVisualType(conceptId)).toBe(expected)
  })

  // ── All entries have valid primary in all[] ────────────────────────────

  it('every concept entry has primary as first element of all[]', () => {
    const physics = [
      'phys.mech.projectile-motion', 'phys.mech.circular-motion',
      'phys.mech.newtons-first-law', 'phys.em.ohms-law',
      'math.arith.fractions', 'chem.bond.molecular-geometry',
    ]
    for (const id of physics) {
      const entry = lookupConceptVisual(id)
      expect(entry).not.toBeNull()
      expect(entry!.all[0]).toBe(entry!.primary)
    }
  })
})
