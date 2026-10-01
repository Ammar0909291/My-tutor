/**
 * Physics visual gap campaign, batch 6 (2026-09-30): photons and matter waves,
 * nuclear physics, special relativity. Each test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildPhotonScene, buildDeBroglieScene, buildXRayScene, buildRadioactivityScene, buildNuclearReactionScene,
  buildBindingEnergyScene, buildFissionScene, buildFusionScene, buildComptonScene, buildRelativityPostulatesScene,
  buildTimeDilationScene, buildLengthContractionScene, buildMassEnergyScene,
  PHOTONS, photonEnergyEv, XRAY_KV, RAD_STOP, REACTION, BINDING_DATA, fusionQ, comptonShiftPm,
  COMPTON_THETA_DEG, lorentzGamma, DILATION_BETA, CONTRACTION_BETA, restEnergyMev,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB6'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.mod.photons', buildPhotonScene, 'phys-photons'],
  ['phys.mod.de-broglie', buildDeBroglieScene, 'phys-de-broglie'],
  ['phys.mod.x-rays', buildXRayScene, 'phys-x-rays'],
  ['phys.mod.radioactivity', buildRadioactivityScene, 'phys-radioactivity'],
  ['phys.mod.nuclear-reactions', buildNuclearReactionScene, 'phys-nuclear-reactions'],
  ['phys.mod.binding-energy', buildBindingEnergyScene, 'phys-binding-energy'],
  ['phys.mod.nuclear-fission', buildFissionScene, 'phys-fission'],
  ['phys.mod.nuclear-fusion', buildFusionScene, 'phys-fusion'],
  ['phys.mod.compton-effect', buildComptonScene, 'phys-compton'],
  ['phys.rel.postulates', buildRelativityPostulatesScene, 'phys-rel-postulates'],
  ['phys.rel.time-dilation', buildTimeDilationScene, 'phys-time-dilation'],
  ['phys.rel.length-contraction', buildLengthContractionScene, 'phys-length-contraction'],
  ['phys.rel.mass-energy', buildMassEnergyScene, 'phys-mass-energy'],
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
  it('photons: E = hf, so violet > green > red, and the energy bars scale with f', () => {
    const E = PHOTONS.map((p) => photonEnergyEv(p.f))
    expect(E).toEqual([1.78, 2.32, 3.1])
    const bars = objs(buildPhotonScene()).filter((o) => o.type === 'bond')
    expect(len(bars[2]) / len(bars[0])).toBeCloseTo(PHOTONS[2].f / PHOTONS[0].f, 1)
  })

  it('de Broglie: twice the momentum, half the wavelength', () => {
    const bars = objs(buildDeBroglieScene()).filter((o) => o.type === 'bond')
    expect(len(bars[0]) / len(bars[1])).toBeCloseTo(2, 5)
  })

  it('X-rays: E_max = eV for the tube voltage', () => {
    expect(texts(buildXRayScene())).toContain(`E_max = eV = ${XRAY_KV} keV`)
  })

  it('radioactivity: α stops at paper, β at aluminium, γ passes both', () => {
    expect(RAD_STOP).toEqual({ alpha: 'paper', beta: 'aluminium', gamma: 'lead' })
    const s = buildRadioactivityScene()
    const barX = (name: string) => objs(s).find((o) => o.text === name)!.position![0]
    const [a, b, g] = arrows(s)
    expect(a.to![0]).toBeLessThan(barX('paper'))
    expect(b.to![0]).toBeGreaterThan(barX('paper'))
    expect(b.to![0]).toBeLessThan(barX('aluminium'))
    expect(g.to![0]).toBeGreaterThan(barX('lead'))
  })

  it('nuclear reaction: A and Z balance', () => {
    const sum = (k: 'A' | 'Z', xs: typeof REACTION.before) => xs.reduce((t, x) => t + x[k], 0)
    expect(sum('A', REACTION.before)).toBe(sum('A', REACTION.after))
    expect(sum('Z', REACTION.before)).toBe(sum('Z', REACTION.after))
    expect(texts(buildNuclearReactionScene())).toContain('A: 18 = 18')
  })

  it('binding energy: measured values peak at Fe-56; He-4 sits above Li-7', () => {
    const peak = BINDING_DATA.reduce((a, b) => (b.b > a.b ? b : a))
    expect(peak.n).toBe('Fe-56')
    expect(texts(buildBindingEnergyScene())).toContain('Fe-56: 8.79 MeV')
    const b = (n: string) => BINDING_DATA.find((d) => d.n === n)!.b
    expect(b('He-4')).toBeGreaterThan(b('Li-7'))
  })

  it('fission: three neutrons out of one split', () => {
    const s = buildFissionScene()
    const neutronsOut = arrows(s).filter((a) => a.from![0] > -1.2 && a.color === '#3b82f6')
    expect(neutronsOut.length).toBe(3)
  })

  it('fusion: Q from the D-T mass defect is 17.59 MeV', () => {
    expect(fusionQ()).toBeCloseTo(17.59, 2)
    expect(texts(buildFusionScene())).toContain('17.59 MeV')
  })

  it('Compton: Δλ = 2.43 pm (1 − cos θ); the electron recoils on the far side of the beam from the photon', () => {
    expect(comptonShiftPm(COMPTON_THETA_DEG)).toBeCloseTo(1.21, 2)
    const recoil = arrows(buildComptonScene())[0]
    expect(recoil.to![1]).toBeLessThan(0)   // photon went up, electron goes down
    expect(recoil.to![0]).toBeGreaterThan(0) // and forward
  })

  it('postulates: both observers measure c, and "c + v" is named only to be denied', () => {
    const t = texts(buildRelativityPostulatesScene())
    expect(t).toContain('c for the passenger')
    expect(t).toContain('c for the platform too')
    expect(t).toContain('not c + v')
  })

  it('time dilation: the moving light path is γ = 1.25 times the rest path', () => {
    const [rest, leg] = arrows(buildTimeDilationScene())
    expect(lorentzGamma(DILATION_BETA)).toBeCloseTo(1.25, 5)
    expect(len(leg) / len(rest)).toBeCloseTo(1.25, 1)
  })

  it('length contraction: L = L₀/γ = 0.6 L₀ at 0.8c', () => {
    const bars = objs(buildLengthContractionScene()).filter((o) => o.type === 'bond' && o.from![1] === o.to![1] && (o.from![1] === 0.8 || o.from![1] === -2))
    const [rest, moving] = bars.map(len)
    expect(moving / rest).toBeCloseTo(1 / lorentzGamma(CONTRACTION_BETA), 2)
  })

  it('mass–energy: m_e c² = 0.511 MeV; the two photons leave back-to-back', () => {
    expect(restEnergyMev()).toBeCloseTo(0.511, 3)
    const photons = objs(buildMassEnergyScene()).filter((o) => o.type === 'path')
    const ends = photons.map((p) => p.points![p.points!.length - 1][1])
    expect(Math.sign(ends[0])).toBe(-Math.sign(ends[1]))
  })
})
