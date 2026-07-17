import { describe, it, expect } from 'vitest'
import {
  lookupConceptVisual, getConceptVisualType, getConceptSceneGenerator,
  shouldForceVisualRender, resolveResponseVisual,
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

  // ── P0 regression: kinematics concepts must NOT resolve to force_diagram ──
  // Root cause: 'phys.mech.displacement' had no exact (Tier 1) entry, so it
  // fell through to the 'phys.mech' domain-prefix (Tier 2) default, which is
  // force_diagram — correct for dynamics, wrong for pure kinematics. Exact
  // entries added for every pure-kinematics phys.mech concept so Tier 1 wins
  // before the dynamics-scoped domain default is ever reached.
  it.each([
    'phys.mech.displacement',
    'phys.mech.velocity',
    'phys.mech.acceleration',
    'phys.mech.relative-motion',
    'phys.mech.kinematics-1d',
    'phys.mech.kinematics-2d',
  ])('%s does not resolve to force_diagram', (conceptId) => {
    const visual = getConceptVisualType(conceptId)
    expect(visual).not.toBeNull()
    expect(visual).not.toBe('force_diagram')
  })

  it('displacement resolves to number_line specifically (the reported bug)', () => {
    expect(getConceptVisualType('phys.mech.displacement')).toBe('number_line')
  })

  it('kinematics-1d/2d keep their kinematics_graphs scene generator, only the static primary changed', () => {
    expect(getConceptSceneGenerator('phys.mech.kinematics-1d')).toBe('kinematics_graphs')
    expect(getConceptSceneGenerator('phys.mech.kinematics-2d')).toBe('kinematics_graphs')
    expect(getConceptVisualType('phys.mech.kinematics-1d')).toBe('coordinate_plane')
  })

  // ── Regression: genuine dynamics/force concepts are unaffected ────────────
  it.each([
    ['phys.mech.newtons-first-law', 'three_newton_forces'],
    ['phys.mech.newtons-second-law', 'three_newton_forces'],
    ['phys.mech.newtons-third-law', 'three_newton_forces'],
    ['phys.mech.friction', 'three_newton_forces'],
  ] as const)('force concept %s still resolves correctly (%s), unaffected by the kinematics fix', (conceptId, expected) => {
    expect(getConceptVisualType(conceptId)).toBe(expected)
  })

  it('an unlisted mechanics concept (no exact entry) still gets the dynamics domain default — unchanged behavior', () => {
    // This is intentionally NOT one of the newly-added exact entries — it
    // proves the domain-level default itself was left untouched (only exact
    // Tier-1 entries were added), so any other force/dynamics concept
    // without a dedicated entry keeps working exactly as before.
    expect(getConceptVisualType('phys.mech.some-other-dynamics-concept')).toBe('force_diagram')
  })
})

// ── Phase 2: server-authoritative forced render (route.ts's core gap fix) ────
// Root cause: the LLM's compliance with "emit the VISUAL:<type> tag" was
// advisory only — a model could describe a diagram in prose instead of
// rendering it. These pin down the deterministic replacement.

describe('shouldForceVisualRender', () => {
  it('forces render on an explicit diagram request with a known visual', () => {
    expect(shouldForceVisualRender('diagram', 'force_diagram')).toBe(true)
  })

  it('never forces when no visual is available for the concept', () => {
    expect(shouldForceVisualRender('diagram', null)).toBe(false)
  })

  it('never forces for a real_life_example request (not a visual ask)', () => {
    expect(shouldForceVisualRender('real_life_example', 'force_diagram')).toBe(false)
  })

  it('never forces for explain_differently', () => {
    expect(shouldForceVisualRender('explain_differently', 'force_diagram')).toBe(false)
  })

  it('never forces with no learner request at all (phase-driven suggestion stays advisory)', () => {
    expect(shouldForceVisualRender(null, 'force_diagram')).toBe(false)
  })
})

describe('resolveResponseVisual', () => {
  it("the LLM's own tag wins even when force-render also applies", () => {
    // The model may pick a MORE specific visual than the registry default
    // (e.g. three_newton_forces vs the generic force_diagram) — never
    // discard a real answer just because the deterministic path exists.
    expect(resolveResponseVisual('three_newton_forces', true, 'force_diagram')).toBe('three_newton_forces')
  })

  it('falls back to the available visual when the LLM omitted the tag and force-render applies', () => {
    // THE root-cause fix: model wrote prose instead of emitting the tag —
    // render happens anyway.
    expect(resolveResponseVisual(null, true, 'force_diagram')).toBe('force_diagram')
  })

  it('renders nothing when the LLM omitted the tag and force-render does not apply', () => {
    // Phase-driven (non-explicit-request) visual suggestions stay advisory —
    // unchanged pre-existing behavior.
    expect(resolveResponseVisual(null, false, 'force_diagram')).toBeNull()
  })

  it('renders nothing when neither an LLM tag nor an available visual exists', () => {
    expect(resolveResponseVisual(null, true, null)).toBeNull()
  })

  it('force-render never fabricates a visual when the registry has none', () => {
    expect(resolveResponseVisual(null, true, null)).toBeNull()
  })
})
