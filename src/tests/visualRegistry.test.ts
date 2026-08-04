import { describe, it, expect } from 'vitest'
import {
  lookupConceptVisual, getConceptVisualType, getConceptSceneGenerator,
  shouldForceVisualRender, resolveResponseVisual, textPromisesUnfulfilledVisual,
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
    // 'chem.bond.molecular-geometry' was a stale/invented concept ID that
    // never existed in the canonical KG (docs/chemistry/kg/graph.json) —
    // VSEPR IS the real molecular-geometry concept. Corrected to the real
    // KG id during the chemistry runtime audit fix.
    expect(getConceptVisualType('chem.bond.vsepr')).toBe('three_molecular_shapes')
  })

  it('returns scene generator for concept with one', () => {
    // 'phys.mech.collisions' was a stale/invented concept ID that never
    // existed in the canonical KG (docs/physics/kg/graph.json) — the real
    // concepts are collisions-elastic and collisions-inelastic, which already
    // carried this exact mapping. Same correction as chem.bond.vsepr above,
    // applied during the physics production-hardening pass.
    expect(getConceptSceneGenerator('phys.mech.collisions-elastic')).toBe('collision')
  })

  it('returns null scene generator for concept without one', () => {
    expect(getConceptSceneGenerator('math.arith.fractions')).toBeNull()
  })

  // ── Tier 2: domain prefix fallback ─────────────────────────────────────
  // (chem.bond still carries a domain default — used here to test the
  // mechanism itself. phys.mech's default was deliberately removed, see the
  // P2 section below; the P0 physics production-completeness audit removed
  // phys.em/phys.opt/phys.wave/phys.meas's defaults for the same reason —
  // each domain turned out to be visually heterogeneous, so a blanket
  // fallback was WRONG for most of its remaining concepts. chem.bond is
  // genuinely uniform (every concept under it is a bonding-visual fit),
  // which is exactly the property a domain default is supposed to assert.)

  it('falls back to domain visual when no exact match', () => {
    const entry = lookupConceptVisual('chem.bond.some-unlisted-concept')
    expect(entry).not.toBeNull()
    expect(entry!.primary).toBe('three_bond_formation')
  })

  it('matches the longest domain prefix', () => {
    const entry = lookupConceptVisual('math.geom.something-new')
    expect(entry).not.toBeNull()
    expect(entry!.primary).toBe('geometry_shape')
  })

  it('domain match returns all available types', () => {
    const entry = lookupConceptVisual('chem.bond.unknown-bonding')
    expect(entry!.all).toEqual(['three_bond_formation', 'three_molecular_shapes'])
  })

  // P0 audit regression lock: phys.em/opt/wave/meas no longer have a domain
  // default at all — an unlisted concept under any of them must fall all
  // the way through to null (Tier 3 / honest no-visual), never a
  // substituted circuit/force/vector visual it doesn't depict.
  it.each(['phys.em', 'phys.opt', 'phys.wave', 'phys.meas'])(
    '%s has no domain default — an unlisted concept resolves to null, not a wrong substitution',
    (prefix) => {
      expect(lookupConceptVisual(`${prefix}.some-unlisted-concept`)).toBeNull()
    },
  )

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
    const domain = lookupConceptVisual('chem.bond.some-other')
    expect(exact).toBe('three_projectile_motion')
    expect(domain!.primary).toBe('three_bond_formation')
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

  // P2 (superseded expectation): the P0 fix deliberately left the
  // 'phys.mech' domain default untouched, so an unlisted phys.mech concept
  // still resolved to force_diagram at that point. This P2 pass REMOVES
  // that default entirely, now that every legitimate phys.mech concept has
  // an explicit Tier-1 entry — see the "eliminate broad domain-default"
  // section below for the corrected expectation.
  it('an unlisted phys.mech concept now returns null — the over-broad domain default was removed, not just narrowed', () => {
    expect(getConceptVisualType('phys.mech.some-other-dynamics-concept')).toBeNull()
  })

  // ── P2: Eliminate Broad Domain-Default Visualization Misclassification ──
  // Full audit of the 45 phys.mech concepts previously resolved ONLY
  // through the (now-removed) 'phys.mech' domain default. Every concept is
  // asserted here so a future change that silently reintroduces the
  // over-broad default, or drops one of these explicit entries, fails
  // immediately.

  // (a) Force/equilibrium analysis — force_diagram is correct, kept explicit.
  it.each([
    'phys.mech.force',
    'phys.mech.free-body-diagram',
    'phys.mech.tension',
    'phys.mech.normal-force',
    'phys.mech.inclined-plane',
    'phys.mech.equilibrium',
    'phys.mech.conservative-forces',
    'phys.mech.hookes-law',
  ])('%s correctly resolves to force_diagram (genuine force analysis)', (conceptId) => {
    expect(getConceptVisualType(conceptId)).toBe('force_diagram')
  })

  it('rotational-dynamics resolves to force_diagram and reuses the existing torque_diagram scene generator', () => {
    expect(getConceptVisualType('phys.mech.rotational-dynamics')).toBe('force_diagram')
    expect(getConceptSceneGenerator('phys.mech.rotational-dynamics')).toBe('torque_diagram')
  })

  // (b) A different existing visual type is the better fit — remapped.
  it.each([
    ['phys.mech.work', 'coordinate_plane'],
    ['phys.mech.angular-kinematics', 'coordinate_plane'],
    ['phys.mech.angular-momentum', 'three_circular_motion'],
    ['phys.mech.conservation-of-angular-momentum', 'three_circular_motion'],
    ['phys.mech.rolling-motion', 'three_circular_motion'],
    ['phys.mech.conservation-of-momentum', 'three_momentum_collision'],
    ['phys.mech.collisions-elastic', 'three_momentum_collision'],
    ['phys.mech.collisions-inelastic', 'three_momentum_collision'],
    ['phys.mech.gravitational-field', 'force_diagram'],
    ['phys.mech.orbital-mechanics', 'force_diagram'],
    ['phys.mech.keplers-laws', 'force_diagram'],
  ] as const)('%s resolves to %s (existing type, not force_diagram-by-default)', (conceptId, expected) => {
    expect(getConceptVisualType(conceptId)).toBe(expected)
  })

  it('collisions-elastic/inelastic reuse the existing collision scene generator', () => {
    expect(getConceptSceneGenerator('phys.mech.collisions-elastic')).toBe('collision')
    expect(getConceptSceneGenerator('phys.mech.collisions-inelastic')).toBe('collision')
  })

  it('gravitation/orbital concepts reuse the existing gravitation_orbit scene generator', () => {
    for (const id of [
      'phys.mech.gravitational-field', 'phys.mech.orbital-mechanics', 'phys.mech.keplers-laws',
    ]) {
      expect(getConceptSceneGenerator(id)).toBe('gravitation_orbit')
    }
  })

  // Removed after the visualCoverageValidator flagged it as 🔴 Incorrect
  // Mapping (a pure kinematics/energy quantity assigned force_diagram) —
  // this concept now correctly falls through to null (Category C).
  it('escape-velocity has no exact mapping — falls through to honest fallback (Category C)', () => {
    expect(getConceptVisualType('phys.mech.escape-velocity')).toBeNull()
    expect(getConceptSceneGenerator('phys.mech.escape-velocity')).toBeNull()
  })

  // Orphaned-key fix: these entries existed before but under keys that
  // matched no real KG concept ID, making the (correctly authored) content
  // silently unreachable.
  it('universal-gravitation and satellites (previously orphaned keys) are now reachable', () => {
    expect(getConceptVisualType('phys.mech.universal-gravitation')).toBe('force_diagram')
    expect(getConceptSceneGenerator('phys.mech.universal-gravitation')).toBe('gravitation_orbit')
    expect(getConceptVisualType('phys.mech.satellites')).toBe('force_diagram')
    expect(getConceptSceneGenerator('phys.mech.satellites')).toBe('gravitation_orbit')
  })

  // (c) No existing visual type fits — deliberately left unmapped. These
  // must return null (never force_diagram) now that the domain default is
  // gone, satisfying "an incorrect visualization is worse than none."
  it.each([
    // Energy quantities/transformations
    'phys.mech.kinetic-energy',
    'phys.mech.potential-energy',
    'phys.mech.work-energy-theorem',
    'phys.mech.conservation-of-energy',
    'phys.mech.power',
    'phys.mech.gravitational-potential',
    // Kinematics/energy-threshold quantity — removed after the validator
    // flagged it as an incorrect force_diagram mapping (see above)
    'phys.mech.escape-velocity',
    // Mass-distribution/point concepts
    'phys.mech.moment-of-inertia',
    'phys.mech.center-of-mass',
    // Fluid mechanics — no fluid/pressure visual type exists in this registry
    'phys.mech.stress-strain',
    'phys.mech.pressure-fluids',
    'phys.mech.buoyancy',
    'phys.mech.bernoulli',
    'phys.mech.surface-tension',
    'phys.mech.viscosity',
    // Advanced Lagrangian/Hamiltonian formalism — no visual convention applies
    'phys.mech.generalized-coordinates',
    'phys.mech.euler-lagrange-equation',
    'phys.mech.cyclic-coordinates-conservation-laws',
    'phys.mech.hamiltonian',
    'phys.mech.hamiltons-equations',
    'phys.mech.poisson-brackets',
    'phys.mech.canonical-transformations',
    'phys.mech.hamilton-jacobi-equation',
  ])('%s has no suitable existing visual — correctly returns null, never force_diagram', (conceptId) => {
    expect(getConceptVisualType(conceptId)).toBeNull()
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
    //
    // UPDATED 2026-08-02: the intent is unchanged, but the call now passes the
    // concept's own legal set, exactly as route.ts does. That set is what
    // makes "more specific" meaningful — three_newton_forces is a legitimate
    // choice for phys.mech.newtons-first-law precisely because the concept
    // registers it. Without the set the model was an unbounded second owner of
    // visualization selection (production: an atom model on Mole Concept).
    expect(resolveResponseVisual(
      'three_newton_forces', true, 'force_diagram',
      ['three_newton_forces', 'force_diagram'],
    )).toBe('three_newton_forces')
  })

  it('a tag OUTSIDE the concept set never wins, however specific it looks', () => {
    expect(resolveResponseVisual(
      'three_atomic_structure', true, 'force_diagram',
      ['three_newton_forces', 'force_diagram'],
    )).toBe('force_diagram')
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

describe('textPromisesUnfulfilledVisual', () => {
  // The exact reported bug: the model says a visual is coming but no tag
  // was emitted, so nothing renders unless this text-level promise itself
  // becomes a force-render trigger.
  it('detects the exact reported phrase', () => {
    expect(textPromisesUnfulfilledVisual("Here's a visual example of how forces balance.")).toBe(true)
  })

  it('detects common phrasings of the same promise', () => {
    expect(textPromisesUnfulfilledVisual('Take a look at the diagram below to see the setup.')).toBe(true)
    expect(textPromisesUnfulfilledVisual('Below is a chart showing the trend.')).toBe(true)
    expect(textPromisesUnfulfilledVisual('See the graph for how velocity changes over time.')).toBe(true)
  })

  it('does not fire on ordinary explanatory text with no visual promise', () => {
    expect(textPromisesUnfulfilledVisual('Newton\'s first law says an object stays at rest unless acted on by a force.')).toBe(false)
  })

  it('does not fire on unrelated uses of "here is" or "look at"', () => {
    expect(textPromisesUnfulfilledVisual("Here's the formula you'll need: F = ma.")).toBe(false)
    expect(textPromisesUnfulfilledVisual('Look at the second term in the equation.')).toBe(false)
  })
})
