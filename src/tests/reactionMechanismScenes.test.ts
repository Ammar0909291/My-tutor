/**
 * chem.kinet.mechanism was a generated five-box PROCEDURE flowchart and chem.surface.heterogeneous-cat had no figure (its generated
 * flowchart was rejected by the critic on every attempt) — hard-concept learner run, 2026-10-20. Both now own a drawn figure; these
 * tests pin what makes each a picture OF the concept, derived from the drawn coordinates, and that a figure that contradicts itself
 * cannot pass the checker.
 */
import { describe, it, expect } from 'vitest'
import {
  buildMechanismProfileScene, checkMechanismProfileConsistency, profilePoints, profileExtrema, PROFILE,
  buildSurfaceCatalysisScene, checkSurfaceCatalysisConsistency, CAT, SITES, SURFACE_Y, ADSORBED_Y, TARGET_SITES,
} from '@/lib/teaching/sceneGenerators/reactionMechanismScenes'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const texts = (s: SceneSpec) => objects(s).map((o) => o.text ?? '').filter(Boolean)

describe('chem.kinet.mechanism: the energy profile of a two-step mechanism', () => {
  const spec = buildMechanismProfileScene()

  it('is a valid scene, deterministic, and served for chem.kinet.mechanism', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildMechanismProfileScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'chem.kinet.mechanism') as SceneSpec).id).toBe(spec.id)
  })

  it('the drawn curve has exactly two transition-state maxima and one intermediate well between them, at the anchors it was derived from', () => {
    const ex = profileExtrema(profilePoints())
    expect(ex.map((e) => e[2])).toEqual(['max', 'min', 'max'])
    expect(ex[0][0]).toBeCloseTo(PROFILE.ts1[0], 2); expect(ex[0][1]).toBeCloseTo(PROFILE.ts1[1], 2)
    expect(ex[1][0]).toBeCloseTo(PROFILE.intermediate[0], 2); expect(ex[1][1]).toBeCloseTo(PROFILE.intermediate[1], 2)
    expect(ex[2][0]).toBeCloseTo(PROFILE.ts2[0], 2); expect(ex[2][1]).toBeCloseTo(PROFILE.ts2[1], 2)
  })

  it('the second barrier (measured from the intermediate) is larger than the first (from the reactants): TS₂ is the slow step', () => {
    const ea1 = PROFILE.ts1[1] - PROFILE.reactants[1], ea2 = PROFILE.ts2[1] - PROFILE.intermediate[1]
    expect(ea2).toBeGreaterThan(ea1)
    // and the two arrows drawn for Eₐ₁ and Eₐ₂ span exactly those heights
    const arrows = objects(spec).filter((o) => o.type === 'arrow' && o.from && o.to && Math.abs(o.to![1] - o.from![1]) > 0.5 && o.from![0] > -8)
    expect(arrows.map((a) => Math.round(Math.abs(a.to![1] - a.from![1]) * 1000) / 1000).sort((a, b) => a - b)).toEqual([Math.round(ea1 * 1000) / 1000, Math.round(ea2 * 1000) / 1000])
  })

  it('the products lie below the reactants, and every part the lesson names is labelled', () => {
    expect(PROFILE.products[1]).toBeLessThan(PROFILE.reactants[1])
    expect(checkMechanismProfileConsistency(spec)).toEqual({ ok: true, errors: [] })
    for (const need of ['reactants', 'intermediate', 'products', 'TS₁', 'TS₂ · slow', 'Eₐ₁', 'Eₐ₂', 'energy', 'reaction progress']) expect(texts(spec)).toContain(need)
  })

  it('carries no number (no energies, no rates): it is a schematic of order and shape', () => {
    expect(texts(spec).join(' ')).not.toMatch(/\d\s*(kJ|J|mol|s\b|M\b)/)
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(1000)
  })

  it('a figure whose second barrier is the smaller one is rejected', () => {
    const bad = clone(spec)
    const path = objects(bad).find((o) => o.type === 'path')!
    // lower TS₂ below TS₁: scale the energy of the second hump
    path.points = path.points!.map(([x, y, z]) => (x > PROFILE.intermediate[0] ? [x, PROFILE.intermediate[1] + (y - PROFILE.intermediate[1]) * 0.2, z] : [x, y, z])) as never
    expect(checkMechanismProfileConsistency(bad).ok).toBe(false)
  })
  it('a profile with a missing intermediate well (one hump) is rejected', () => {
    const bad = clone(spec)
    const path = objects(bad).find((o) => o.type === 'path')!
    path.points = path.points!.map(([x, y, z]) => [x, Math.max(y, PROFILE.intermediate[1] + 3 * (1 - Math.abs(x - 1) / 8)), z]) as never
    expect(checkMechanismProfileConsistency(bad).ok).toBe(false)
  })
  it('products above the reactants are rejected', () => {
    const bad = clone(spec)
    const path = objects(bad).find((o) => o.type === 'path')!
    path.points = path.points!.map(([x, y, z], i, a) => (i > a.length - 8 ? [x, y + 6, z] : [x, y, z])) as never
    expect(checkMechanismProfileConsistency(bad).ok).toBe(false)
  })
})

describe('chem.surface.heterogeneous-cat: adsorption, surface reaction, desorption on a solid', () => {
  const spec = buildSurfaceCatalysisScene()

  it('is a valid scene, deterministic, and served for chem.surface.heterogeneous-cat', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildSurfaceCatalysisScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'chem.surface.heterogeneous-cat') as SceneSpec).id).toBe(spec.id)
  })

  it('draws the surface with active sites, and the three steps left to right: adsorption arrows, a bonded neighbouring pair, an upward product', () => {
    const o = objects(spec)
    expect(o.filter((x) => x.type === 'bond' && x.from![1] === SURFACE_Y && x.to![1] === SURFACE_Y)).toHaveLength(1)   // the solid
    expect(o.filter((x) => x.type === 'node' && x.position![1] === SURFACE_Y)).toHaveLength(SITES.length)               // the sites
    const down = o.filter((x) => x.type === 'arrow' && x.to![1] < x.from![1])
    expect(down.map((a) => a.to![0]).sort((a, b) => a - b)).toEqual([...TARGET_SITES].sort((a, b) => a - b))           // adsorption: one arrow per reactant, to a site
    const up = o.filter((x) => x.type === 'arrow' && x.to![1] > x.from![1])
    expect(up).toHaveLength(1); expect(up[0].from![0]).toBe(CAT.product[0])                                                // desorption: the product leaves upward
    expect(CAT.adsA[0]).toBeGreaterThan(Math.max(...TARGET_SITES)); expect(CAT.product[0]).toBeGreaterThan(CAT.adsB[0]) // left to right order of the steps
  })

  it('the reacting species sit on NEIGHBOURING sites and are joined by a bond; the poison has a site of its own', () => {
    const idx = (x: number) => SITES.indexOf(x)
    expect(Math.abs(idx(CAT.adsA[0]) - idx(CAT.adsB[0]))).toBe(1)
    expect(objects(spec).some((x) => x.type === 'bond' && x.from![0] === CAT.adsA[0] && x.to![0] === CAT.adsB[0])).toBe(true)
    expect(idx(CAT.poison[0])).toBeGreaterThanOrEqual(0)
    expect([CAT.adsA[0], CAT.adsB[0], ...TARGET_SITES]).not.toContain(CAT.poison[0])
    expect(CAT.poison[1]).toBe(ADSORBED_Y)
  })

  it('passes its own consistency check, names every part, and says poisoning can happen at any stage (the critic\'s objection to the old flowchart)', () => {
    expect(checkSurfaceCatalysisConsistency(spec)).toEqual({ ok: true, errors: [] })
    for (const need of ['adsorption', 'surface reaction', 'desorption', 'active sites', 'poison blocks a site']) expect(texts(spec)).toContain(need)
    expect(spec.steps.map((s) => s.narration).join(' ')).toMatch(/at any stage/)
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(1000)
  })

  it('a poison drawn on a reactant\'s site is rejected', () => {
    const bad = clone(spec)
    const n = objects(bad).find((o) => o.type === 'node' && o.position![0] === CAT.poison[0] && o.position![1] === CAT.poison[1])!
    n.position = [CAT.adsA[0], CAT.adsA[1], 0]
    expect(checkSurfaceCatalysisConsistency(bad).ok).toBe(false)
  })
  it('reacting species that are not neighbours (no bond between them) are rejected', () => {
    const bad = clone(spec)
    const bond = objects(bad).find((o) => o.type === 'bond' && o.from![0] === CAT.adsA[0] && o.to![0] === CAT.adsB[0])!
    bond.to![0] = bond.to![0] + 1
    expect(checkSurfaceCatalysisConsistency(bad).errors.join(' ')).toMatch(/bond/)
  })
  it('a product that is still on the surface is rejected', () => {
    const bad = clone(spec)
    const n = objects(bad).find((o) => o.type === 'node' && o.position![0] === CAT.product[0] && o.position![1] === CAT.product[1])!
    n.position = [CAT.product[0], SURFACE_Y + 0.5, 0]
    expect(checkSurfaceCatalysisConsistency(bad).ok).toBe(false)
  })
})
