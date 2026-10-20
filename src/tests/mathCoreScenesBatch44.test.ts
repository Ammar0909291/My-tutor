/**
 * Mathematics visual campaign, batch 44 (2026-10-20): Stokes' theorem (math.calc.stokes-theorem). The concept was served NO figure.
 * Every number the figure states is re-derived here from the DRAWN arrows, curves and labels, never from the generator's constants
 * alone: the red arrows lie along the drawn circle in the counter-clockwise direction, the circulation integral is evaluated
 * numerically from the drawn field arrows, the curl is the one the field has, and the flux of the curl equals the circulation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB44'
import { oblique } from '@/lib/teaching/sceneGenerators/mathCoreScenesB20'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const arrows = (s: SceneSpec, color: string) => objs(s).filter((o) => o.type === 'arrow' && o.color === color && o.from && o.to)
const paths = (s: SceneSpec, color: string) => objs(s).filter((o) => o.type === 'path' && o.color === color && o.points)
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol

const scene = M.buildStokesTheoremScene()
const O = oblique(M.STK)
/** Invert the oblique projection for a point known to lie in the plane z = z0. */
const unproject = (p: readonly number[], z0: number): [number, number] => {
  const y = (p[1] - M.STK.oy - M.STK.uz * z0) / M.STK.dyy
  return [(p[0] - M.STK.ox - M.STK.dxy * y) / M.STK.ux, y]
}

describe('math.calc.stokes-theorem is served its own figure, as a figure OF the concept', () => {
  it.each([null, 'diagram'] as const)('resolves to the Stokes scene (request: %s)', (req) => {
    const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: 'math.calc.stokes-theorem', learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.graphical, d.provenance).toBe(true)
    expect(d.asset?.scope).toBe('concept')
    expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('math-stokes-theorem')
    expect(isRetiredVisualBinding('math.calc.stokes-theorem')).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.calc.stokes-theorem')).toBe(false)
  })
})

describe('the figure is well-formed (math.calc.stokes-theorem)', () => {
  it('passes the scene validator and the figure audit that admits a figure to a learner', () => {
    const v = validateSceneSpec(scene) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: scene } as never)).toEqual([])
  })
  it('keeps every coordinate inside ±5, fits the intermediate label budget and stays under 50 objects per step', () => {
    for (const o of objs(scene)) for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
      expect(Math.abs(p[0])).toBeLessThanOrEqual(5); expect(Math.abs(p[1])).toBeLessThanOrEqual(5)
    }
    const named = labelsOf(scene).filter((o) => !isGlyphLabel(o as never))
    expect(named.length).toBeGreaterThan(0)
    expect(named.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    for (const st of scene.steps) expect(st.objects.length).toBeLessThanOrEqual(50)
  })
  it('has three cumulative steps with narration, only role colours and a framing camera', () => {
    expect(scene.steps).toHaveLength(3)
    for (const st of scene.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
    const roles = new Set([SLATE, INK, RED, BLUE, VIOLET, GREEN])
    for (const o of objs(scene)) if (o.color) expect(roles.has(o.color.toLowerCase())).toBe(true)
    expect(scene.cameraDistance!).toBeGreaterThanOrEqual(7); expect(scene.cameraDistance!).toBeLessThanOrEqual(13)
    expect(scene.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(1000)
  })
})

describe('the mathematics the figure draws (math.calc.stokes-theorem)', () => {
  const rim = paths(scene, BLUE)[0]
  const rimPts = rim.points!.map((p) => unproject(p, 0))

  it('the boundary curve C is the unit circle in the xy-plane: every drawn rim point is at distance 1 from the origin', () => {
    expect(rim.points!.length).toBeGreaterThan(60)
    for (const [x, y] of rimPts) expect(near(Math.hypot(x, y), 1, 0.01)).toBe(true)
  })

  it('the surface S is the upper unit hemisphere: both grey half-circles keep distance 1 from the origin and stay at or above z = 0', () => {
    const arcs = paths(scene, SLATE)
    expect(arcs).toHaveLength(2)
    const zOf = (p: number[], x: number, y: number) => (p[1] - M.STK.oy - M.STK.dyy * y) / M.STK.uz
    for (const a of arcs) for (const p of a.points!) {
      // an arc lies in the x–z plane (y = 0) or the y–z plane (x = 0): try each reading, one must put the point on the unit sphere with z ≥ 0
      const readings: Array<[number, number, number]> = []
      const xz = (p[0] - M.STK.ox) / M.STK.ux, z1 = zOf(p, 0, 0); readings.push([xz, 0, z1])
      const yy = (p[0] - M.STK.ox) / M.STK.dxy ; const z2 = zOf(p, 0, yy); readings.push([0, yy, z2])
      expect(readings.some(([x, y, z]) => near(Math.hypot(x, y, z), 1, 0.02) && z >= -0.01)).toBe(true)
    }
  })

  it('the normal n points up out of the dome: it starts at the top of the hemisphere (z = 1) and rises along z', () => {
    const n = arrows(scene, VIOLET)
    expect(n).toHaveLength(1)
    expect(near(n[0].from![0], O([0, 0, 1])[0])).toBe(true); expect(near(n[0].from![1], O([0, 0, 1])[1])).toBe(true)
    expect(near(n[0].to![0], n[0].from![0])).toBe(true)
    expect(n[0].to![1]).toBeGreaterThan(n[0].from![1])
  })

  it('the red arrows are F = (−y, x, 0): each starts on C and points counter-clockwise (right-hand rule about n = +z), with length |F| × scale', () => {
    const field = arrows(scene, RED)
    expect(field).toHaveLength(M.FIELD_AT.length)
    for (const a of field) {
      const [x, y] = unproject(a.from!, 0), [tx, ty] = unproject(a.to!, 0)
      expect(near(Math.hypot(x, y), 1, 0.02)).toBe(true)                       // starts on the circle
      const [dx, dy] = [(tx - x) / M.ARROW_LEN, (ty - y) / M.ARROW_LEN]        // the drawn displacement in field units
      const [fx, fy] = M.fieldF(x, y)
      expect(near(dx, fx, 0.03)).toBe(true); expect(near(dy, fy, 0.03)).toBe(true)
      expect(x * dy - y * dx).toBeGreaterThan(0.9)                            // (position × field)_z > 0: counter-clockwise, |F| = 1 on the unit circle
    }
  })

  it('the circulation printed on the figure is the line integral of the DRAWN field along the DRAWN curve: ∮ F·dr = 2π', () => {
    let total = 0
    for (let i = 0; i < rimPts.length - 1; i++) {
      const [x0, y0] = rimPts[i], [x1, y1] = rimPts[i + 1]
      const [fx, fy] = M.fieldF((x0 + x1) / 2, (y0 + y1) / 2)
      total += fx * (x1 - x0) + fy * (y1 - y0)
    }
    expect(total).toBeCloseTo(2 * Math.PI, 1)
    expect(M.circulation()).toBeCloseTo(2 * Math.PI, 10)
    const printed = labelsOf(scene).find((l) => (l.text ?? '').startsWith('circulation'))!
    expect(printed.text).toContain('2π')
  })

  it('the curl is (0, 0, 2): ∂Q/∂x − ∂P/∂y of F = (−y, x, 0), checked by finite differences, and the green arrows all point up along z', () => {
    const h = 1e-5, x = 0.3, y = -0.4
    const dQdx = (M.fieldF(x + h, y)[1] - M.fieldF(x - h, y)[1]) / (2 * h)
    const dPdy = (M.fieldF(x, y + h)[0] - M.fieldF(x, y - h)[0]) / (2 * h)
    expect(dQdx - dPdy).toBeCloseTo(2, 5)
    expect(M.curlF).toEqual([0, 0, 2])
    const curls = arrows(scene, GREEN)
    expect(curls).toHaveLength(M.CURL_BASES.length)
    for (const a of curls) { expect(near(a.to![0], a.from![0])).toBe(true); expect(a.to![1]).toBeGreaterThan(a.from![1]) }
    // each green arrow stands on the disc under the dome (distance from the axis < 1)
    for (const a of curls) { const [bx, by] = unproject(a.from!, 0); expect(Math.hypot(bx, by)).toBeLessThan(1) }
    expect(labelsOf(scene).some((l) => l.text === 'curl F = (0, 0, 2)')).toBe(true)
  })

  it('the flux of the curl through S equals the circulation: ∬ (∇×F)·n dS = 2 × (disc area π) = 2π', () => {
    // (∇×F)·n dS = 2 dx dy over the disc under the hemisphere; integrate on a grid
    let area = 0; const step = 0.005
    for (let x = -1; x < 1; x += step) for (let y = -1; y < 1; y += step) if (x * x + y * y <= 1) area += step * step
    expect(M.curlF[2] * area).toBeCloseTo(2 * Math.PI, 1)
    expect(M.fluxOfCurl()).toBeCloseTo(M.circulation(), 10)
    const printed = labelsOf(scene).find((l) => (l.text ?? '').startsWith('flux of curl'))!
    expect(printed.text).toContain('2π')
  })

  it('names the surface, the edge and the normal, and the narration states both sides equal 2π', () => {
    const t = labelsOf(scene).map((l) => l.text)
    for (const need of ['S', 'C', 'n', 'F']) expect(t).toContain(need)
    expect(scene.steps.map((s) => s.narration).join(' ')).toMatch(/2π/)
    expect(scene.steps[0].narration).toMatch(/right-hand rule/)
  })

  // Mutation checks: figures that LOOK like Stokes' theorem but state something false.
  it('a clockwise field arrow is caught by the counter-clockwise check', () => {
    const bad = JSON.parse(JSON.stringify(scene)) as SceneSpec
    const a = (bad.steps[1].objects as Obj[]).find((o) => o.type === 'arrow' && o.color === RED)!
    const [from, to] = [a.from!, a.to!]; a.from = to; a.to = from                // reverse the arrow: it now points clockwise
    const [x, y] = unproject(a.from!, 0), [tx, ty] = unproject(a.to!, 0)
    const cross = x * ((ty - y) / M.ARROW_LEN) - y * ((tx - x) / M.ARROW_LEN)
    expect(cross).toBeLessThan(0.9)
  })
  it('a field that is not tangent to C would not integrate to 2π (the integral is computed from the drawn curve)', () => {
    let total = 0
    for (let i = 0; i < rimPts.length - 1; i++) {
      const [x0, y0] = rimPts[i], [x1, y1] = rimPts[i + 1]
      total += x0 * (x1 - x0)                                                    // F = (x, 0, 0): the wrong field
    }
    expect(Math.abs(total - 2 * Math.PI)).toBeGreaterThan(1)
  })
})
