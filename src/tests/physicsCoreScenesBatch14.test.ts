/**
 * Physics visual gap campaign, batch 14 (2026-09-30): phys.mech.power, the last
 * physics concept without a figure. Checks the PHYSICS drawn, and that the
 * campaign's end state holds: every physics concept resolves to its own figure.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildPowerScene, LIFT, liftWork, power } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB14'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

describe('phys.mech.power is served its own figure', () => {
  it('as a concept-scoped figure, not retired, within bounds and valid', () => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: 'phys.mech.power', learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical).toBe(true)
      expect(d.asset?.scope).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('phys-power')
    }
    expect(isRetiredVisualBinding('phys.mech.power')).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.mech.power')).toBe(false)
    for (const o of objs(buildPowerScene())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0])).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1])).toBeLessThanOrEqual(5)
      }
    }
    const v = validateSceneSpec(buildPowerScene()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
})

describe('the physics the figure draws', () => {
  it('W = mgh = 2943 J for 50 kg through 6 m; P = W/t = 245 W over 12 s, twice that over 6 s', () => {
    expect(liftWork()).toBeCloseTo(LIFT.m * LIFT.g * LIFT.h, 10)
    expect(Math.round(liftWork())).toBe(2943)
    expect(Math.round(power(liftWork(), LIFT.tSlow))).toBe(245)
    expect(power(liftWork(), LIFT.tFast)).toBeCloseTo(2 * power(liftWork(), LIFT.tSlow), 10)
    expect(texts(buildPowerScene())).toContain('P = W/t = 2943 J / 12 s = 245 W')
  })

  it('on the work–time graph the fast line is twice as steep as the slow one (power is the slope)', () => {
    const lines = objs(buildPowerScene()).filter((o) => o.type === 'bond' && o.from && o.to && o.from[0] !== o.to[0] && o.from[1] !== o.to[1])
    const slopes = lines.map((l) => (l.to![1] - l.from![1]) / (l.to![0] - l.from![0])).sort((a, b) => a - b)
    expect(slopes).toHaveLength(2)
    expect(slopes[1] / slopes[0]).toBeCloseTo(LIFT.tSlow / LIFT.tFast, 1)
  })
})

/**
 * These resolve to a figure that is honestly scoped 'domain' — a shared,
 * concept-bound illustration of the right kind (pendulum, circuit, orbit…)
 * rather than a figure authored for the concept alone. They were never part of
 * the "no figure" gap batches 1-14 closed. Batch 15 promoted the fourteen
 * card-backed ones; these twelve come from shared generator kinds and are the
 * next upgrade. Pinned so the list only changes deliberately.
 */
const DOMAIN_SCOPED = [
  'phys.meas.scalars-vectors', 'phys.mech.kinematics-2d', 'phys.mech.momentum', 'phys.mech.rotational-dynamics',
  'phys.mech.universal-gravitation', 'phys.mech.gravitational-field', 'phys.wave.shm', 'phys.wave.shm-energy',
  'phys.opt.lens-power', 'phys.em.electric-current', 'phys.em.ohms-law', 'phys.em.dc-circuits',
]

describe('campaign end state', () => {
  const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
  const ids: string[] = (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)
  // Resolved once and shared: 281 full resolutions are slow under the full suite's parallel load.
  let decisions: Map<string, ReturnType<typeof resolveVisual>> | null = null
  const all = () => (decisions ??= new Map(ids.map((id) => [id, resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])])))

  it('every one of the 281 physics concepts resolves to a figure of that concept', () => {
    // 238 until the 2026-10-03 coverage-driven extension; each new concept ships its own figure.
    expect(ids).toHaveLength(281)
    const none = ids.filter((id) => { const d = all().get(id)!; return !(d.graphical && d.asset?.conceptId === id) })
    expect(none).toEqual([])
  }, 60_000)

  it('all but the pinned domain-scoped list are served a concept-scoped figure of their own', () => {
    const domain = ids.filter((id) => all().get(id)!.asset?.scope !== 'concept')
    expect(domain.sort()).toEqual([...DOMAIN_SCOPED].sort())
  }, 60_000)
})
