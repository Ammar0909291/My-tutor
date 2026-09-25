/**
 * THE RETIREMENT LIFECYCLE, END TO END THROUGH THE REAL RESOLVER.
 *
 * The defect: retirement was keyed by concept and returned before every tier,
 * so a faithful figure authored after a retirement was unreachable until
 * someone deleted the retirement row by hand (1f829c0 had to delete 18).
 * Now retirement records the retired ASSETS (by content), and a
 * concept-authored asset with new content is served with no edit to retired.ts.
 *
 * A replacement scene is injected for phys.em.lc-circuits (retired: its card
 * has neither an inductor nor a capacitor) exactly as an author would add one
 * — a CONCEPT_SCENES entry. retired.ts is NOT touched by this test.
 */
import { describe, it, expect, vi } from 'vitest'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const { REPLACED } = vi.hoisted(() => ({ REPLACED: 'phys.em.lc-circuits' }))

vi.mock('@/lib/teaching/visual/conceptSceneParams', async (importOriginal) => {
  const real = await importOriginal<typeof import('@/lib/teaching/visual/conceptSceneParams')>()
  // A structurally real scene, re-identified as an LC-circuit figure.
  const donor = real.buildCanonicalScene(null, 'bio.cell.cell-cycle') as SceneSpec
  const replacement: SceneSpec = { ...donor, id: 'lc-circuit-energy-exchange', title: 'LC circuit: energy moves between C and L' }
  return {
    ...real,
    CONCEPT_SCENE_OVERRIDES: [...real.CONCEPT_SCENE_OVERRIDES, REPLACED],
    buildCanonicalScene: (kind: string | null, conceptId?: string | null) =>
      conceptId === REPLACED ? replacement : real.buildCanonicalScene(kind, conceptId),
  }
})

import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding, retirementReason } from '@/lib/teaching/visual/retired'
import { describeVisualTurn } from '@/lib/teaching/visual/turnRecord'

const resolve = (id: string, request = false) =>
  resolveVisual({ message: request ? 'please draw it' : '', lessonConceptId: id, learnerRequest: request ? 'diagram' : null })

describe('retired -> replaced, with no retirement row removed', () => {
  it('the concept is STILL on the retirement register (evidence kept, nothing deleted)', () => {
    expect(isRetiredVisualBinding(REPLACED)).toBe(true)
    expect(retirementReason(REPLACED)).toMatch(/inductor/)
  })

  it('the authored replacement is served — on an ordinary turn and on an explicit request', () => {
    for (const d of [resolve(REPLACED), resolve(REPLACED, true)]) {
      expect(d.graphical).toBe(true)
      expect(d.asset?.provenance).toBe('generator')
      expect((d.payload as { sceneSpec: SceneSpec }).sceneSpec.id).toBe('lc-circuit-energy-exchange')
      expect(d.provenance).toBe(`generator:${REPLACED}:concept-authored`)
    }
  })

  it('the retired card itself is never what is served', () => {
    const d = resolve(REPLACED)
    expect(d.payload?.renderer).not.toBe('card')
  })

  it('telemetry describes the replacement, not the retired binding', () => {
    const d = resolve(REPLACED)
    const r = describeVisualTurn(d, { sceneSpec: (d.payload as { sceneSpec: unknown }).sceneSpec }, false)
    expect(r).toMatchObject({ tier: 'tier0-generator', served: true, reason: null })
  })
})

describe('a retired CONCEPT-AUTHORED figure stays retired', () => {
  it('phys.opt.reflection: its own concave-mirror scene is the retired asset, so it is still refused', () => {
    const d = resolve('phys.opt.reflection', true)
    expect(d.graphical).toBe(false)
    expect(d.provenance).toBe('no-figure:retired-binding')
  })

  it('every other retired concept is unaffected by one concept\'s replacement', () => {
    for (const id of ['phys.em.rc-circuits', 'phys.mech.keplers-laws', 'chem.bond.ionic-bonding', 'cs.algo.flowcharts']) {
      expect(resolve(id).provenance).toBe('no-figure:retired-binding')
    }
  })
})
