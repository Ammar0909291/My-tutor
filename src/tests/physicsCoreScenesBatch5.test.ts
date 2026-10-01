/**
 * Physics visual gap campaign, batch 5 (2026-09-30): thermal physics and sound.
 * Each test checks the PHYSICS the figure draws.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildTemperatureScene, buildZerothLawScene, buildSpecificHeatScene, buildKineticTheoryScene,
  buildInternalEnergyScene, buildSecondLawScene, buildEntropyScene, buildHeatEngineScene,
  buildRefrigeratorScene, buildForcedOscillationScene, buildSoundWaveScene, buildSoundIntensityScene,
  buildWaveSpeedScene, TEMP_COLD, TEMP_HOT, C_WATER, C_ALUMINIUM, ENGINE_QH, ENGINE_W, FRIDGE_QC, FRIDGE_W,
  resonanceAmplitude, RES_W0, SOUND_K, STRING_MASS_RATIO,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB5'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const paths = (s: SceneSpec) => objs(s).filter((o) => o.type === 'path' && o.points && o.points.length > 0)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])
const RED = '#ef4444', BLUE = '#3b82f6'

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.therm.temperature', buildTemperatureScene, 'phys-temperature'],
  ['phys.therm.zeroth-law', buildZerothLawScene, 'phys-zeroth-law'],
  ['phys.therm.specific-heat', buildSpecificHeatScene, 'phys-specific-heat'],
  ['phys.therm.kinetic-theory', buildKineticTheoryScene, 'phys-kinetic-theory'],
  ['phys.therm.internal-energy', buildInternalEnergyScene, 'phys-internal-energy'],
  ['phys.therm.second-law', buildSecondLawScene, 'phys-second-law'],
  ['phys.therm.entropy', buildEntropyScene, 'phys-entropy'],
  ['phys.therm.heat-engines', buildHeatEngineScene, 'phys-heat-engine'],
  ['phys.therm.refrigerators', buildRefrigeratorScene, 'phys-refrigerator'],
  ['phys.wave.forced-oscillations', buildForcedOscillationScene, 'phys-forced-oscillation'],
  ['phys.wave.sound-waves', buildSoundWaveScene, 'phys-sound-wave'],
  ['phys.wave.sound-intensity', buildSoundIntensityScene, 'phys-sound-intensity'],
  ['phys.wave.wave-speed', buildWaveSpeedScene, 'phys-wave-speed'],
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
  it('temperature: speed ∝ √T — four times hotter, twice as fast', () => {
    const a = arrows(buildTemperatureScene())
    const cold = a.filter((x) => x.color === BLUE).map(len), hot = a.filter((x) => x.color === RED).map(len)
    expect(hot[0] / cold[0]).toBeCloseTo(Math.sqrt(TEMP_HOT / TEMP_COLD), 1)
  })

  it('zeroth law: both contacts read the same temperature', () => {
    const readings = objs(buildZerothLawScene()).filter((o) => / °C$/.test(o.text ?? '')).map((o) => o.text)
    expect(readings.length).toBe(2)
    expect(new Set(readings).size).toBe(1)
  })

  it('specific heat: the slope ratio equals c_water / c_Al', () => {
    const lines = objs(buildSpecificHeatScene()).filter((o) => o.type === 'bond' && (o.color === RED || o.color === BLUE))
    const slope = (o: Obj) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])
    const al = lines.find((o) => o.color === RED)!, w = lines.find((o) => o.color === BLUE)!
    expect(slope(al) / slope(w)).toBeCloseTo(C_WATER / C_ALUMINIUM, 1)
  })

  it('kinetic theory: the bounce reverses the momentum component into the wall', () => {
    const [inc, out] = arrows(buildKineticTheoryScene())
    expect(inc.to![0] - inc.from![0]).toBeGreaterThan(0)
    expect(out.to![0] - out.from![0]).toBeLessThan(0)
    expect(Math.abs(inc.to![0] - inc.from![0])).toBeCloseTo(Math.abs(out.to![0] - out.from![0]), 5)
  })

  it('internal energy: names both kinetic and potential contributions', () => {
    expect(texts(buildInternalEnergyScene())).toContain('U = ΣKE + ΣPE')
  })

  it('second law: the spontaneous arrow points hot → cold', () => {
    const s = buildSecondLawScene()
    const flow = arrows(s).find((a) => a.color === RED)!
    expect(flow.to![1]).toBeLessThan(flow.from![1]) // hot box is above
  })

  it('entropy: after, the gas occupies a region twice as wide', () => {
    const dots = objs(buildEntropyScene()).filter((o) => o.type === 'node')
    const spread = (xs: number[]) => Math.max(...xs) - Math.min(...xs)
    const before = dots.filter((d) => d.position![0] < 0).map((d) => d.position![0])
    const after = dots.filter((d) => d.position![0] > 0).map((d) => d.position![0])
    expect(spread(after) / spread(before)).toBeGreaterThan(1.8)
  })

  it('heat engine: Q_H = W + Q_C and η = W/Q_H', () => {
    const t = texts(buildHeatEngineScene())
    expect(t).toContain(`Q_C = ${ENGINE_QH - ENGINE_W} J`)
    expect(t).toContain(`η = W / Q_H = ${ENGINE_W / ENGINE_QH}`)
  })

  it('refrigerator: Q_H = Q_C + W and COP = Q_C/W', () => {
    const t = texts(buildRefrigeratorScene())
    expect(t).toContain(`Q_H = ${FRIDGE_QC + FRIDGE_W} J`)
    expect(t).toContain(`COP = Q_C / W = ${FRIDGE_QC / FRIDGE_W}`)
    // heat is moved UP (cold → hot) in a fridge
    for (const a of arrows(buildRefrigeratorScene()).filter((x) => x.color === RED || x.color === BLUE)) expect(a.to![1]).toBeGreaterThan(a.from![1])
  })

  it('resonance: the peak is at the natural frequency and heavier damping lowers it', () => {
    const light = [0.6, 0.9, 1, 1.1, 1.5].map((w) => resonanceAmplitude(w, RES_W0, 0.18))
    expect(Math.max(...light)).toBe(light[2])
    expect(resonanceAmplitude(RES_W0, RES_W0, 0.6)).toBeLessThan(resonanceAmplitude(RES_W0, RES_W0, 0.18))
    const [lc, hc] = paths(buildForcedOscillationScene())
    expect(Math.max(...hc.points!.map((p) => p[1]))).toBeLessThan(Math.max(...lc.points!.map((p) => p[1])))
  })

  it('sound: layers bunch (compression) where the pressure peaks', () => {
    const s = buildSoundWaveScene()
    const layers = objs(s).filter((o) => o.type === 'bond' && o.color === BLUE).map((o) => o.from![0]).sort((a, b) => a - b)
    const gaps = layers.slice(1).map((x, i) => ({ x: (x + layers[i]) / 2, g: x - layers[i] }))
    const tightest = gaps.reduce((a, b) => (b.g < a.g ? b : a))
    // pressure ∝ −dξ/dx = −Ak cos(k(x − X0)) peaks where k(x − X0) = π (mod 2π)
    const phase = ((SOUND_K * (tightest.x + 3.8)) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
    expect(Math.abs(phase - Math.PI)).toBeLessThan(0.6)
  })

  it('sound intensity: twice the distance is a quarter the intensity, −6 dB', () => {
    expect(texts(buildSoundIntensityScene())).toContain('I/4, -6 dB')
  })

  it('wave speed: 4× heavier string → half the wavelength at the same frequency', () => {
    const [light, heavy] = paths(buildWaveSpeedScene())
    // wavelength = distance between successive upward zero crossings
    const lambda = (o: Obj, base: number) => {
      const xs = o.points!.filter((p, i, a) => i > 0 && (a[i - 1][1] - base) < 0 && (p[1] - base) >= 0).map((p) => p[0])
      return xs[1] - xs[0]
    }
    expect(lambda(light, 1.6) / lambda(heavy, -1.6)).toBeCloseTo(Math.sqrt(STRING_MASS_RATIO), 1)
  })
})
