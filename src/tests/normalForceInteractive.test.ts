/**
 * NORMAL FORCE: THE WHOLE LESSON, DRAWN FROM ONE FORMULA, AND CHECKED FROM THE DRAWING.
 *
 * `phys.mech.normal-force` was served the shared force-diagram CARD: a block on a LEVEL surface, N = mg. The Educational Brain's
 * Learning Objective is wider — (1) N is whatever makes the net force perpendicular to the surface zero; (2) N equals the weight
 * ONLY on a flat surface with nothing else pushing down (mg cos θ on a slope, more than mg under an extra push); (3) N is not
 * gravity's Third-Law partner — its own partner is the block pushing on the SURFACE. The card agreed with the very misconception
 * (MC-NORMAL-EQUALS-WEIGHT) the lesson exists to correct, so the figure is now this interactive scene (θ and F), default = the
 * level baseline.
 *
 * Every assertion below re-derives the physics from the DRAWN arrows (direction, length, balance, where N′ acts), never from a label.
 */
import { describe, expect, it } from 'vitest'
import {
  FORCE_SCALE, NORMAL_FORCE_DEFAULTS, NORMAL_FORCE_GEOMETRY, NORMAL_FORCE_LIMITS, buildNormalForceScene, checkNormalForceConsistency,
  normalMagnitude, validateNormalForceParams, type NormalForceParams,
} from '@/lib/teaching/sceneGenerators/normalForce.pure'
import { PARAMETRIC_SCENES, rebuildScene } from '@/lib/teaching/visual/parametricScenes'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { placeSceneLabels, viewportFromCanvas } from '@/lib/teaching/visual/layout'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

type Obj = { id?: string; type: string; text?: string; position?: number[]; from?: number[]; to?: number[]; points?: number[][] }
const objects = (spec: SceneSpec): Obj[] => spec.steps.flatMap((s) => s.objects as unknown as Obj[])
const byId = (spec: SceneSpec, id: string) => objects(spec).find((o) => o.id === id)
const texts = (spec: SceneSpec) => objects(spec).filter((o) => o.type === 'label').map((o) => o.text ?? '')
const P = (over: Partial<NormalForceParams> = {}): NormalForceParams => ({ ...NORMAL_FORCE_DEFAULTS, ...over })
const scene = (over: Partial<NormalForceParams> = {}) => buildNormalForceScene(P(over))
const vec = (spec: SceneSpec, id: string): [number, number] | null => { const o = byId(spec, id); return o?.from && o.to ? [o.to[0] - o.from[0], o.to[1] - o.from[1]] : null }
const len = (v: [number, number]) => Math.hypot(v[0], v[1])
const deg = (d: number) => (d * Math.PI) / 180

const ANGLES = [0, 10, 30, 45, 60]
const PUSHES = [0, 0.25, 0.5, 1]

describe('registered through the existing variable layer, bound to the concept', () => {
  it('two controls, each stating its consequence; the default is the level baseline (N = mg)', () => {
    const entry = PARAMETRIC_SCENES.normal_force
    expect(entry.defaults).toEqual({ angleDeg: 0, push: 0 })
    expect(entry.variables.map((v) => v.key)).toEqual(['angleDeg', 'push'])
    for (const v of entry.variables) {
      expect(v.effect.length, v.key).toBeGreaterThan(30)
      if (v.kind !== 'number') throw new Error('numeric controls expected')
      const lim = NORMAL_FORCE_LIMITS[v.key as keyof typeof NORMAL_FORCE_LIMITS]
      expect([v.min, v.max]).toEqual([lim.min, lim.max])
      for (let x = v.min; x <= v.max + 1e-9; x += v.step) expect(validateNormalForceParams({ ...NORMAL_FORCE_DEFAULTS, [v.key]: Math.round(x * 100) / 100 }), `${v.key}=${x}`).not.toBeNull()
    }
    expect(normalMagnitude(0, 0)).toBe(1)
  })

  it('phys.mech.normal-force is served this figure at concept scope; free-body-diagram, friction and equilibrium keep the card', () => {
    expect(getConceptSceneGenerator('phys.mech.normal-force')).toBe('normal_force')
    for (const c of ['phys.mech.free-body-diagram', 'phys.mech.friction', 'phys.mech.equilibrium']) expect(getConceptSceneGenerator(c), c).not.toBe('normal_force')
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.mech.normal-force', learnerRequest: 'diagram', subject: 'physics' } as never)
    expect(d.asset?.scope).toBe('concept')
    expect(d.payload?.renderer).toBe('scene')
    const spec = (d.payload as { sceneSpec: SceneSpec }).sceneSpec
    expect(spec.id).toBe('phys-normal-force')
    expect(spec.parametric).toEqual({ kind: 'normal_force', params: { angleDeg: 0, push: 0 } })
    expect(spec.steps).toHaveLength(5)
  })

  it('a control press re-runs the same builder; a value the validator refuses builds NO figure', () => {
    const moved = rebuildScene('normal_force', { angleDeg: 30, push: 0.5 })!
    expect(moved.parametric?.params).toMatchObject({ angleDeg: 30, push: 0.5 })
    expect(texts(moved).join('|')).toContain('θ = 30°')
    for (const bad of [{ angleDeg: 61 }, { angleDeg: -5 }, { push: 1.25 }, { push: -0.25 }, { angleDeg: NaN }]) expect(rebuildScene('normal_force', bad), JSON.stringify(bad)).toBeNull()
  })
})

describe('the physics, re-derived from the DRAWN arrows at every control value', () => {
  it('N is perpendicular to the drawn surface and points away from it, at every tilt', () => {
    for (const a of ANGLES) for (const f of PUSHES) {
      const spec = scene({ angleDeg: a, push: f })
      const surf = byId(spec, 'surface')!
      const u: [number, number] = [surf.to![0] - surf.from![0], surf.to![1] - surf.from![1]]
      const uHat: [number, number] = [u[0] / len(u), u[1] / len(u)]
      const N = vec(spec, 'normal')!
      expect(Math.abs(N[0] * uHat[0] + N[1] * uHat[1]) / len(N), `θ=${a} F=${f}: perpendicular`).toBeLessThan(1e-3)
      expect(N[0] * -uHat[1] + N[1] * uHat[0], `θ=${a} F=${f}: away from the surface`).toBeGreaterThan(0)
      expect((Math.atan2(uHat[1], uHat[0]) * 180) / Math.PI, `drawn tilt`).toBeCloseTo(a, 1)
    }
  })

  it('the weight is always straight down and mg long — whatever the tilt (the misconception is that it follows the surface)', () => {
    for (const a of ANGLES) {
      const w = vec(scene({ angleDeg: a }), 'weight')!
      expect(Math.abs(w[0])).toBeLessThan(1e-3)
      expect(w[1]).toBeLessThan(0)
      expect(len(w)).toBeCloseTo(FORCE_SCALE, 2)
    }
  })

  it('LEVEL surface, nothing else vertical: N is drawn exactly as long as the weight', () => {
    const spec = scene()
    expect(len(vec(spec, 'normal')!)).toBeCloseTo(len(vec(spec, 'weight')!), 2)
    expect(vec(spec, 'normal')![0]).toBeCloseTo(0, 3)
    expect(texts(spec)).toContain('N = 1.00 mg')
    expect(spec.steps[3].narration).toMatch(/N = mg/)
    expect(spec.steps[3].narration).toMatch(/ONLY because the surface is level/)
  })

  it('TILTED surface: N is shorter than the weight by cos θ — the figure contradicts "N always equals weight"', () => {
    for (const a of [10, 30, 45, 60]) {
      const spec = scene({ angleDeg: a })
      const ratio = len(vec(spec, 'normal')!) / len(vec(spec, 'weight')!)
      expect(ratio, `θ=${a}`).toBeCloseTo(Math.cos(deg(a)), 2)
      expect(ratio).toBeLessThan(1)
      expect(texts(spec)).toContain(`N = ${(Math.round(Math.cos(deg(a)) * 100) / 100).toFixed(2)} mg`)
      expect(spec.steps[3].narration).toMatch(/less than the weight/)
    }
  })

  it('an extra DOWNWARD push: N grows past the weight, N = (mg + F) cos θ, and the push is drawn straight down F·mg long', () => {
    for (const a of [0, 30]) for (const f of [0.25, 0.5, 1]) {
      const spec = scene({ angleDeg: a, push: f })
      const push = vec(spec, 'push')!
      expect(Math.abs(push[0])).toBeLessThan(1e-3)
      expect(push[1]).toBeLessThan(0)
      expect(len(push) / FORCE_SCALE, `θ=${a} F=${f}`).toBeCloseTo(f, 2)
      expect(len(vec(spec, 'normal')!) / FORCE_SCALE).toBeCloseTo((1 + f) * Math.cos(deg(a)), 2)
    }
    expect(len(vec(scene({ angleDeg: 0, push: 1 }), 'normal')!)).toBeGreaterThan(len(vec(scene({ angleDeg: 0, push: 1 }), 'weight')!))
    expect(scene({ angleDeg: 0, push: 0.5 }).steps[3].narration).toMatch(/MORE than the weight/)
    expect(byId(scene(), 'push')).toBeUndefined()
  })

  it('the forces balance perpendicular to the surface: N minus the load pressing into it is zero, at every state', () => {
    for (const a of ANGLES) for (const f of PUSHES) {
      const spec = scene({ angleDeg: a, push: f })
      const w = vec(spec, 'weight')!, p = vec(spec, 'push') ?? [0, 0] as [number, number], N = vec(spec, 'normal')!
      const nHat: [number, number] = [-Math.sin(deg(a)), Math.cos(deg(a))]
      const load: [number, number] = [w[0] + p[0], w[1] + p[1]]
      const net = (N[0] * nHat[0] + N[1] * nHat[1]) + (load[0] * nHat[0] + load[1] * nHat[1])
      expect(net, `θ=${a} F=${f}`).toBeCloseTo(0, 2)
      const parts = checkNormalForceConsistency(spec, { angleDeg: a, push: f })
      expect(parts.errors, `θ=${a} F=${f}`).toEqual([])
    }
  })

  it('the resolved load: its two parts reconstruct the whole (cos θ into the surface, sin θ along it)', () => {
    for (const a of [15, 30, 60]) for (const f of [0, 0.5]) {
      const spec = scene({ angleDeg: a, push: f })
      const perp = vec(spec, 'load-perpendicular')!, along = vec(spec, 'load-along')!
      const w = vec(spec, 'weight')!, p = vec(spec, 'push') ?? [0, 0] as [number, number]
      expect(perp[0] + along[0]).toBeCloseTo(w[0] + p[0], 2)
      expect(perp[1] + along[1]).toBeCloseTo(w[1] + p[1], 2)
      expect(len(perp) / len(along)).toBeCloseTo(1 / Math.tan(deg(a)), 1)
    }
    expect(byId(scene(), 'load-perpendicular'), 'a level surface has no separate parts to show').toBeUndefined()
  })

  it("N's Third-Law partner N′ acts ON the surface, equal and opposite to N — not on the block, and not gravity's partner", () => {
    for (const a of ANGLES) for (const f of [0, 0.5]) {
      const spec = scene({ angleDeg: a, push: f })
      const N = vec(spec, 'normal')!, Np = vec(spec, 'partner')!
      expect(Np[0]).toBeCloseTo(-N[0], 2)
      expect(Np[1]).toBeCloseTo(-N[1], 2)
      const tail = byId(spec, 'partner')!.from!, surf = byId(spec, 'surface')!
      const s: [number, number] = [surf.to![0] - surf.from![0], surf.to![1] - surf.from![1]]
      const off = Math.abs(((tail[0] - surf.from![0]) * -s[1] + (tail[1] - surf.from![1]) * s[0]) / len(s))
      expect(off, `θ=${a}: N′'s tail lies on the surface line`).toBeLessThan(1e-2)
    }
    const n = scene().steps[4].narration
    expect(n).toMatch(/Third-Law partner is the block pushing on the SURFACE/)
    expect(n).toMatch(/Gravity's partner/)
    expect(n).toMatch(/Earth/)
  })

  it('the arrows do not sit on top of each other: weight, push, N and N′ are drawn on separate lines', () => {
    for (const a of [0, 30]) {
      const spec = scene({ angleDeg: a, push: 0.5 })
      const x = (id: string) => byId(spec, id)!.from![0]
      expect(Math.abs(x('push') - x('weight'))).toBeGreaterThan(0.4)
      expect(Math.abs(x('partner') - x('weight'))).toBeGreaterThan(0.4)
    }
  })
})

describe('NEGATIVE CONTROLS: the checker fails a figure that agrees with the misconception', () => {
  const corrupt = (mutate: (objs: Obj[], spec: SceneSpec) => void, params: NormalForceParams = P({ angleDeg: 30 })) => {
    const spec = JSON.parse(JSON.stringify(buildNormalForceScene(params))) as SceneSpec
    mutate(objects(spec), spec)
    return checkNormalForceConsistency(spec, params)
  }
  const without = (id: string) => (_o: Obj[], spec: SceneSpec) => { for (const st of spec.steps) st.objects = (st.objects as unknown as Obj[]).filter((o) => o.id !== id) as never }
  it('passes the real figure', () => expect(checkNormalForceConsistency(scene({ angleDeg: 30 }), P({ angleDeg: 30 })).ok).toBe(true))
  it('N drawn vertical (the card\'s picture) on a 30° slope fails: not perpendicular, not balanced', () => {
    const r = corrupt((o) => { const n = o.find((x) => x.id === 'normal')!; n.to = [n.from![0], n.from![1] + 2 * 0.87, 0] })
    expect(r.ok).toBe(false)
    expect(r.errors.join('|')).toMatch(/perpendicular/)
  })
  it('N drawn as long as the weight on a slope ("N = mg") fails the balance', () => {
    const r = corrupt((o) => { const n = o.find((x) => x.id === 'normal')!; const dx = n.to![0] - n.from![0], dy = n.to![1] - n.from![1]; const k = 2 / Math.hypot(dx, dy); n.to = [n.from![0] + dx * k, n.from![1] + dy * k, 0] })
    expect(r.ok).toBe(false)
    expect(r.errors.join('|')).toMatch(/do not balance|not \(mg \+ F\) cos θ/)
  })
  it('N′ drawn on the BLOCK instead of the surface fails; so does a missing N′', () => {
    expect(corrupt((o) => { const n = o.find((x) => x.id === 'partner')!; n.from = [n.from![0], n.from![1] + 1, 0]; n.to = [n.to![0], n.to![1] + 1, 0] }).errors.join('|')).toMatch(/ON the surface/)
    expect(corrupt(without('partner')).errors.join('|')).toMatch(/partner N′ is not drawn/)
  })
  it('a weight that follows the surface (the other classic error) fails', () => {
    const r = corrupt((o) => { const w = o.find((x) => x.id === 'weight')!; w.to = [w.from![0] + 1, w.from![1] - 1.7, 0] })
    expect(r.errors.join('|')).toMatch(/straight down/)
  })
  it('a push claimed but not drawn fails; a push drawn when F = 0 fails', () => {
    expect(corrupt(without('push'), P({ angleDeg: 0, push: 0.5 })).errors.join('|')).toMatch(/not drawn/)
    const spec = JSON.parse(JSON.stringify(buildNormalForceScene(P({ angleDeg: 0, push: 0.5 })))) as SceneSpec
    expect(checkNormalForceConsistency(spec, P({ angleDeg: 0, push: 0 })).ok).toBe(false)
  })
})

describe('a real figure at every control value', () => {
  it('rebuildScene accepts every state (validator and scene gate both pass)', () => {
    for (const a of ANGLES) for (const f of PUSHES) expect(rebuildScene('normal_force', { angleDeg: a, push: f }), `θ=${a} F=${f}`).not.toBeNull()
  })

  it('nothing is NaN, every coordinate is inside the ±5 authoring box, narrations are under 220 characters, ids are unique, labels fit the budget', () => {
    for (const a of ANGLES) for (const f of PUSHES) {
      const spec = scene({ angleDeg: a, push: f })
      for (const o of objects(spec)) for (const pt of [o.position, o.from, o.to].filter(Boolean) as number[][]) for (const c of pt) {
        expect(Number.isFinite(c)).toBe(true)
        expect(Math.abs(c), `θ=${a} F=${f}`).toBeLessThanOrEqual(5)
      }
      for (const st of spec.steps) expect((st.narration ?? '').length, `θ=${a} F=${f}`).toBeLessThan(220)
      expect(objects(spec).filter((o) => o.type === 'label').length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
      const ids = objects(spec).map((o) => o.id).filter(Boolean) as string[]
      expect(new Set(ids).size).toBe(ids.length)
      for (const t of texts(spec)) expect(t).not.toMatch(/NaN|Infinity|undefined/)
    }
  })

  it('the tilted surface and block stay inside the frame at every angle (contact point and half-length are the figure\'s own)', () => {
    const { contact, halfSurface } = NORMAL_FORCE_GEOMETRY
    for (const a of ANGLES) {
      const dx = Math.cos(deg(a)) * halfSurface, dy = Math.sin(deg(a)) * halfSurface
      for (const y of [contact[1] + dy, contact[1] - dy]) expect(Math.abs(y), `θ=${a}`).toBeLessThanOrEqual(5)
      expect(Math.abs(contact[0] + dx)).toBeLessThanOrEqual(5)
    }
  })

  it('at 390 px and at the 1280 px column every label is placed and none moves more than 45 px', () => {
    for (const a of [0, 30, 60]) for (const f of [0, 0.5, 1]) {
      const spec = scene({ angleDeg: a, push: f })
      for (const [w, hh, bw] of [[282, 260, 390], [566, 272, 1280], [566, 380, 1280]] as Array<[number, number, number]>) {
        const cum: SceneSpec['steps'][number]['objects'] = []
        for (const step of spec.steps) {
          cum.push(...step.objects)
          const placed = placeSceneLabels({ ...spec, steps: [{ objects: [...cum] }] }, viewportFromCanvas(w, hh, bw))
          expect(placed.unresolved, `θ=${a} F=${f} @${w}x${hh}`).toBe(0)
          for (const l of placed.labels) expect(l.movedPx, `θ=${a} F=${f} @${w}x${hh}: "${l.text}" moved ${l.movedPx}px`).toBeLessThanOrEqual(45)
        }
      }
    }
  })

  it('deterministic: the same parameters give byte-identical figures', () => {
    for (const a of ANGLES) expect(JSON.stringify(scene({ angleDeg: a, push: 0.5 }))).toBe(JSON.stringify(scene({ angleDeg: a, push: 0.5 })))
  })
})
