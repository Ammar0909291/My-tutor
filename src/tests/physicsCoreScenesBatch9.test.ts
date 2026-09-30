/**
 * Physics visual gap campaign, batch 9 (2026-09-30): the five retired circuit
 * concepts, semiconductors, the nuclear shell model. Each test checks the
 * PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildWheatstoneScene, buildPotentiometerScene, buildSelfInductanceScene, buildTransformerScene, buildLcScene,
  buildEnergyBandsScene, buildSemiconductorClassesScene, buildIntrinsicScene, buildExtrinsicScene,
  buildPnJunctionScene, buildDiodeScene, buildShellModelScene,
  BRIDGE, bridgeUnknown, POT, potEmf, coilCurrent, backEmf, XFMR, secondaryVoltage, lcFrequencyKHz,
  levelSpread, BAND_GAPS, intrinsicCarriers, VALENCE, diodeCurrent, magicNumbers,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB9'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.em.wheatstone-bridge', buildWheatstoneScene, 'phys-wheatstone'],
  ['phys.em.potentiometer', buildPotentiometerScene, 'phys-potentiometer'],
  ['phys.em.self-inductance', buildSelfInductanceScene, 'phys-self-inductance'],
  ['phys.em.mutual-inductance', buildTransformerScene, 'phys-transformer'],
  ['phys.em.lc-circuits', buildLcScene, 'phys-lc'],
  ['phys.mod.energy-bands', buildEnergyBandsScene, 'phys-energy-bands'],
  ['phys.mod.semiconductor-classification', buildSemiconductorClassesScene, 'phys-semiconductor-classes'],
  ['phys.mod.intrinsic-semiconductors', buildIntrinsicScene, 'phys-intrinsic-semiconductor'],
  ['phys.mod.extrinsic-semiconductors', buildExtrinsicScene, 'phys-extrinsic-semiconductor'],
  ['phys.mod.pn-junction', buildPnJunctionScene, 'phys-pn-junction'],
  ['phys.mod.diode-rectification', buildDiodeScene, 'phys-diode'],
  ['phys.mod.nuclear-models', buildShellModelScene, 'phys-nuclear-shell'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
})

describe('every figure passes the scene validator the renderer uses', () => {
  it.each(BATCH)('%s', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
})

describe('the physics each figure draws', () => {
  it('Wheatstone: balanced when P/Q = R/S', () => {
    const S = bridgeUnknown()
    expect(BRIDGE.P / BRIDGE.Q).toBeCloseTo(BRIDGE.R / S, 10)
    expect(texts(buildWheatstoneScene())).toContain(`S = QR/P = ${S} Ω`)
  })

  it('potentiometer: E = V_AB × l/L', () => {
    expect(potEmf()).toBeCloseTo((POT.VAB * POT.l) / POT.L, 10)
    expect(texts(buildPotentiometerScene())).toContain(`= ${potEmf()} V`)
  })

  it('self-inductance: ε = −L dI/dt — small while rising, zero when steady, a large spike at switch-off', () => {
    expect(backEmf(1)).toBeLessThan(0)
    expect(backEmf(3)).toBeCloseTo(0, 5)
    expect(backEmf(4.2)).toBeGreaterThan(Math.abs(backEmf(1)) * 4)
    expect(coilCurrent(5)).toBe(0)
  })

  it('transformer: V_s = V_p N_s/N_p', () => {
    expect(secondaryVoltage()).toBe((XFMR.Vp * XFMR.Ns) / XFMR.Np)
    expect(texts(buildTransformerScene())).toContain(`${secondaryVoltage()} V`)
  })

  it('LC: f = 1/(2π√LC) = 1.59 kHz, and the two energies always add to the total', () => {
    expect(lcFrequencyKHz()).toBeCloseTo(1.59, 2)
    const [uc, ul] = objs(buildLcScene()).filter((o) => o.type === 'path')
    for (let i = 0; i < uc.points!.length; i += 17) {
      expect(uc.points![i][1] + 2.2 + ul.points![i][1] + 2.2).toBeCloseTo(3.6, 1)
    }
  })

  it('energy bands: levels spread as the atoms approach', () => {
    expect(levelSpread(1.6)).toBeGreaterThan(levelSpread(-4.0) * 50)
  })

  it('semiconductor vs insulator: the insulator gap is several times wider', () => {
    expect(BAND_GAPS.insulator / BAND_GAPS.semiconductor).toBeGreaterThan(4)
  })

  it('intrinsic: carrier numbers rise steeply with temperature', () => {
    expect(intrinsicCarriers(2)).toBeGreaterThan(intrinsicCarriers(1.5) * 2)
  })

  it('extrinsic: P brings one spare electron, B one missing (Si has 4)', () => {
    expect(VALENCE.P - VALENCE.Si).toBe(1)
    expect(VALENCE.Si - VALENCE.B).toBe(1)
  })

  it('p-n junction: the built-in field points from n (right) to p (left)', () => {
    const field = objs(buildPnJunctionScene()).find((o) => o.type === 'arrow')!
    expect(field.to![0]).toBeLessThan(field.from![0])
  })

  it('diode: essentially no current in reverse, and it turns on near 0.6 V', () => {
    expect(Math.abs(diodeCurrent(-1))).toBeLessThan(1e-11)
    expect(diodeCurrent(0.3)).toBeLessThan(1e-6)
    expect(diodeCurrent(0.7)).toBeGreaterThan(1e-3)
  })

  it('shell model: the gaps fall at the magic numbers 2, 8, 20, 28, 50', () => {
    expect(magicNumbers()).toEqual([2, 8, 20, 28, 50])
    const t = texts(buildShellModelScene())
    for (const m of [2, 8, 20, 28, 50]) expect(t).toContain(String(m))
  })
})
