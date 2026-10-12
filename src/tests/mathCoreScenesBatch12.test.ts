/**
 * Mathematics visual campaign, batch 12 (2026-10-12): twelve geometry concepts. Each test checks the
 * MATHEMATICS the figure draws — the drawn coordinates are mapped back to geometry and compared with an
 * independent calculation — not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB12'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const bonds = (s: SceneSpec, color: string, thickness: number) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const arrows = (s: SceneSpec, color: string) => lines(s, color).filter((o) => o.type === 'arrow')
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const vertical = (o: Obj) => near(o.from![0], o.to![0], 1e-9)
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
const vec = (o: Obj, u: number): [number, number] => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
const dotp = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
const crossz = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]
const shoelace = (pts: number[][]) => Math.abs(sum(pts.map((p, i) => p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1]))) / 2
const ang = (a: number[], v: number[], b: number[]) => { const u1 = [a[0] - v[0], a[1] - v[1]], u2 = [b[0] - v[0], b[1] - v[1]]; return Math.acos(dotp(u1, u2) / (Math.hypot(...u1) * Math.hypot(...u2))) * 180 / Math.PI }
/** Menger curvature through three points: 2 |cross| / (|AB| |BC| |CA|). */
const menger = (a: number[], b: number[], c: number[]) => 2 * Math.abs(crossz([b[0] - a[0], b[1] - a[1]], [c[0] - a[0], c[1] - a[1]])) / (Math.hypot(b[0] - a[0], b[1] - a[1]) * Math.hypot(c[0] - b[0], c[1] - b[1]) * Math.hypot(a[0] - c[0], a[1] - c[1]))
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.geom.circle-theorems', M.buildCircleTheoremsScene, 'math-circle-theorems'],
  ['math.geom.conic-sections', M.buildConicSectionsScene, 'math-conic-sections'],
  ['math.geom.ellipse', M.buildEllipseScene, 'math-ellipse'],
  ['math.geom.hyperbola', M.buildHyperbolaScene, 'math-hyperbola'],
  ['math.geom.polar-coordinates', M.buildPolarCoordinatesScene, 'math-polar-coordinates'],
  ['math.geom.polar-curves', M.buildPolarCurvesScene, 'math-polar-curves'],
  ['math.geom.vectors-2d', M.buildVectors2dScene, 'math-vectors-2d'],
  ['math.geom.vectors-3d', M.buildVectors3dScene, 'math-vectors-3d'],
  ['math.geom.dot-product', M.buildDotProductScene, 'math-dot-product'],
  ['math.geom.cross-product', M.buildCrossProductScene, 'math-cross-product'],
  ['math.geom.curvature', M.buildCurvatureScene, 'math-curvature'],
  ['math.geom.x-y-coordinates', M.buildXyCoordinatesScene, 'math-xy-coordinates'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, `${conceptId} ${d.provenance}`).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
  })
  it.each(['math.linalg.vector-addition', 'math.func.linear-function'])('%s is deliberately still figure-less (reserved fixture for the AI-generation tests)', (conceptId) => {
    const d = resolveVisual({ message: '', lessonConceptId: conceptId, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.asset?.scope).not.toBe('concept')
  })
})

describe('every figure is well-formed', () => {
  it.each(BATCH)('%s passes the scene validator the renderer uses', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
  it.each(BATCH)('%s passes the figure audit that admits a figure to a learner (no blockers)', (_id, build) => {
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: build() } as never)).toEqual([])
  })
  it.each(BATCH)('%s keeps every coordinate inside +-5', (conceptId, build) => {
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
  it.each(BATCH)('%s fits the intermediate label budget (marks of 1-2 characters are free)', (_id, build) => {
    const named = labelsOf(build()).filter((o) => !isGlyphLabel(o as never))
    expect(named.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    expect(named.length).toBeGreaterThan(0)
  })
  it.each(BATCH)('%s stays under the 50-objects-per-step limit', (_id, build) => {
    for (const st of build().steps) expect(st.objects.length).toBeLessThanOrEqual(50)
  })
  it.each(BATCH)('%s has three cumulative steps with narration', (_id, build) => {
    const s = build()
    expect(s.steps).toHaveLength(3)
    for (const st of s.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
    expect((s.ariaLabel ?? '').length).toBeGreaterThan(60)
  })
  it.each(BATCH)('%s uses only semantic role colours and a framing camera distance', (_id, build) => {
    const roles = new Set([SLATE, INK, RED, BLUE, VIOLET, GREEN])
    const s = build()
    for (const o of objs(s)) if (o.color) expect(roles.has(o.color.toLowerCase()), `${o.type} ${o.color}`).toBe(true)
    expect(s.cameraDistance!).toBeGreaterThanOrEqual(7)
    expect(s.cameraDistance!).toBeLessThanOrEqual(13)
  })
  it.each(BATCH)('%s never draws a zero-length line', (_id, build) => {
    for (const o of lines(build())) expect(len(o)).toBeGreaterThan(0)
  })
})

describe('the mathematics each figure draws', () => {
  it('Circle theorems: the central angle is 100°, every inscribed angle on the far arc is 50°, and the tangent is perpendicular to the radius', () => {
    const { R, a, b, c } = M.CIRC
    const O = [0, 0], A = M.circPoint(a), B = M.circPoint(b)
    expect(M.angleAt(O as [number, number], A, B)).toBeCloseTo(100, 9)
    for (let t = 145; t < 395; t += 7) expect(M.angleAt(M.circPoint(t), A, B)).toBeCloseTo(50, 8)                                           // the same from every point of the major arc
    expect(M.angleAt(M.circPoint(c[0]), A, B)).toBeCloseTo(M.angleAt(O as [number, number], A, B) / 2, 8)
    const minorArcPoint = M.circPoint(90)
    expect(M.angleAt(minorArcPoint, A, B)).toBeCloseTo(130, 8)                                                                              // on the OTHER arc it is the supplement, 180 − 50
    const s = M.buildCircleTheoremsScene()
    const blue = dots(s, BLUE), red = dots(s, RED)[0], vio = dots(s, VIOLET)[0], centre = dots(s, INK)[0]
    expect(blue).toHaveLength(2); expect(centre.position![0]).toBeCloseTo(0, 2)
    for (const d of [...blue, red, vio]) expect(Math.hypot(d.position![0], d.position![1])).toBeCloseTo(R, 1)                                // all on the circle
    const [pa, pb] = blue.sort((p, q) => p.position![0] - q.position![0]).reverse().map((d) => d.position!)                                 // A on the right, B on the left
    expect(ang(pa, [0, 0], pb)).toBeCloseTo(100, 0)
    expect(ang(pa, red.position!, pb)).toBeCloseTo(50, 0); expect(ang(pa, vio.position!, pb)).toBeCloseTo(50, 0)
    const tangent = bonds(s, GREEN, 0.05)[0], dir = [tangent.to![0] - tangent.from![0], tangent.to![1] - tangent.from![1]]
    expect(Math.abs(dotp(dir, pa)) / (Math.hypot(...dir) * Math.hypot(...pa))).toBeLessThan(0.01)                                           // tangent ⟂ radius OA
    expect((tangent.from![0] + tangent.to![0]) / 2).toBeCloseTo(pa[0], 1)                                                                   // it touches the circle at A
    expect(texts(s)).toEqual(expect.arrayContaining(['100°', '50°', 'half the central angle', 'tangent ⟂ radius']))
  })

  it('Conic sections: every drawn point is e times as far from the focus as from the directrix, for e = 0.5, 1, 2; the circle is r = 1', () => {
    const { l, e, u, ox } = M.CONIC
    const back = (p: number[]) => [p[0] / u + ox, p[1] / u]
    const s = M.buildConicSectionsScene()
    const circle = paths(s, INK)[0], ellipse = paths(s, BLUE)[0], parabola = paths(s, GREEN)[0], hyper = paths(s, RED)[0]
    for (const p of circle.points!) { const [x, y] = back(p); expect(Math.hypot(x, y)).toBeCloseTo(1, 1) }                                  // e = 0: constant distance
    for (const [curve, ecc] of [[ellipse, e.ellipse], [parabola, e.parabola], [hyper, e.hyperbola]] as Array<[Obj, number]>) {
      for (const p of curve.points!) { const [x, y] = back(p); expect(Math.abs(Math.hypot(x, y) - ecc * (x + l / ecc))).toBeLessThan(0.05) }  // focus distance = e × directrix distance
    }
    const closed = (c: Obj) => Math.hypot(c.points![0][0] - c.points![c.points!.length - 1][0], c.points![0][1] - c.points![c.points!.length - 1][1]) < 0.02
    expect([closed(circle), closed(ellipse), closed(parabola), closed(hyper)]).toEqual([true, true, false, false])                           // e < 1 closed; e ≥ 1 open
    const rs = ellipse.points!.map((p) => { const [x, y] = back(p); return Math.hypot(x, y) })
    expect((Math.max(...rs) - Math.min(...rs)) / (Math.max(...rs) + Math.min(...rs))).toBeCloseTo(0.5, 1)                                    // e from the extreme focal distances
    expect(M.conicXY(1, Math.PI)[0]).toBeCloseTo(-0.5, 12); expect(M.conicXY(2, Math.PI)[0]).toBeCloseTo(-1 / 3, 12); expect(M.conicXY(0.5, Math.PI)[0]).toBeCloseTo(-2 / 3, 12)   // vertices
    const dir = bonds(s, VIOLET, 0.03)[0]; expect(dir.from![0] / u + ox).toBeCloseTo(-1, 2); expect(vertical(dir)).toBe(true)
    expect(dots(s, GREEN)[0].position![0]).toBeCloseTo(-ox * u, 2); expect(dots(s, GREEN)[0].position![1]).toBeCloseTo(0, 2)                  // the common focus is the origin
    expect(texts(s)).toEqual(expect.arrayContaining(['circle: eccentricity 0', 'ellipse: eccentricity 0.5', 'parabola: eccentricity 1', 'hyperbola: eccentricity 2', 'directrix', 'common focus']))
  })

  it('Ellipse: x²/9 + y²/4 = 1 with foci (±√5, 0); the focal distances of both marked points add to 2a = 6 (drawn lengths)', () => {
    const { a, b, u, pts, signs } = M.ELL
    const c = M.ellC()
    expect(c * c).toBeCloseTo(a * a - b * b, 12); expect(c).toBeCloseTo(2.2361, 4)
    for (const x of [-3, -2.4, 0, 1.5, 2.9]) { const y = M.ellY(x); expect(x * x / 9 + y * y / 4).toBeCloseTo(1, 12); const [d1, d2] = M.focalDistances(x, y); expect(d1 + d2).toBeCloseTo(6, 12) }
    const s = M.buildEllipseScene()
    const cv = paths(s, INK)[0]
    for (const p of cv.points!) expect(Math.abs((p[0] / u) ** 2 / 9 + (p[1] / u) ** 2 / 4 - 1)).toBeLessThan(0.03)
    const g = dots(s, GREEN), foci = g.filter((d) => near(d.position![1], 0, 0.001)), probes = g.filter((d) => !near(d.position![1], 0, 0.001))
    expect(foci).toHaveLength(2); expect(probes).toHaveLength(2)
    expect(foci.map((d) => d.position![0] / u).sort((p, q) => p - q)).toEqual([-c, c].map((v) => expect.closeTo(v, 1)))
    const toF1 = bonds(s, BLUE, 0.04), toF2 = bonds(s, RED, 0.04)
    expect([toF1.length, toF2.length]).toEqual([2, 2])
    for (let k = 0; k < 2; k++) {
      const p = probes.find((d) => near(d.position![0] / u, pts[k], 0.05))!; expect(p).toBeTruthy()
      expect(p.position![1] / u).toBeCloseTo(signs[k] * M.ellY(pts[k]), 1)
      const d1 = len(toF1.find((o) => near(o.from![0], p.position![0], 0.001))!) / u, d2 = len(toF2.find((o) => near(o.from![0], p.position![0], 0.001))!) / u
      expect(d1 + d2).toBeCloseTo(6, 1)                                                                                                     // constant sum 2a
    }
    for (const t of ['4.12', '1.88', '1.21', '4.79']) expect(texts(s)).toContain(t)
    expect(texts(s)).toEqual(expect.arrayContaining(['x²/9 + y²/4 = 1', 'd₁ + d₂ = 2a = 6']))
  })

  it('Hyperbola: x²/4 − y²/2.25 = 1 with foci (±2.5, 0), |d₁ − d₂| = 2a = 4 at (3, 1.68), asymptote slopes ±0.75, box corners (±2, ±1.5)', () => {
    const { a, b, u, px } = M.HYP
    const c = M.hypC()
    expect(c).toBe(2.5); expect(c * c).toBeCloseTo(a * a + b * b, 12)
    const py = M.hypY(px)
    expect(px * px / 4 - py * py / 2.25).toBeCloseTo(1, 12)
    expect(Math.hypot(px + c, py) - Math.hypot(px - c, py)).toBeCloseTo(4, 12)
    for (const x of [2, 2.5, 4, 5]) { const y = M.hypY(x), d = Math.hypot(x + c, y) - Math.hypot(x - c, y); expect(d).toBeCloseTo(2 * a, 10) }   // constant difference
    expect(b / a).toBe(0.75)
    const s = M.buildHyperbolaScene()
    const branches = paths(s, INK); expect(branches).toHaveLength(2)
    for (const br of branches) for (const p of br.points!) expect(Math.abs((p[0] / u) ** 2 / 4 - (p[1] / u) ** 2 / 2.25 - 1)).toBeLessThan(0.05)
    const asy = bonds(s, VIOLET, 0.03); expect(asy).toHaveLength(2)
    expect(asy.map((o) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])).sort((p, q) => p - q)).toEqual([-0.75, 0.75].map((v) => expect.closeTo(v, 2)))
    const foci = dots(s, GREEN); expect(foci.map((d) => d.position![0] / u).sort((p, q) => p - q)).toEqual([-2.5, 2.5].map((v) => expect.closeTo(v, 2)))
    const pt = dots(s, BLUE)[0]; expect(pt.position![0] / u).toBeCloseTo(3, 1); expect(pt.position![1] / u).toBeCloseTo(py, 1)
    const far = len(bonds(s, BLUE, 0.04)[0]) / u, near2 = len(bonds(s, RED, 0.04)[0]) / u
    expect(far).toBeCloseTo(5.75, 1); expect(near2).toBeCloseTo(1.75, 1); expect(far - near2).toBeCloseTo(4, 1)
    const box = bonds(s, GREEN, 0.04); expect(box).toHaveLength(4)
    expect(Math.max(...box.map((o) => Math.max(o.from![0], o.to![0]))) / u).toBeCloseTo(2, 2); expect(Math.max(...box.map((o) => Math.max(o.from![1], o.to![1]))) / u).toBeCloseTo(1.5, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['1.75', '5.75', '|d₁ − d₂| = 2a = 4', 'asymptotes y = ±0.75x']))
  })

  it('Polar coordinates: (3, 60°) is (1.5, 2.60) and (2, 210°) is (−1.73, −1); circles r = 1, 2, 3; rays every 30°; the guides have lengths x and y', () => {
    const { u, p, q } = M.POLAR
    expect(M.toCartesian(3, 60)[0]).toBeCloseTo(1.5, 12); expect(M.toCartesian(3, 60)[1]).toBeCloseTo(2.598, 3)
    expect(M.toCartesian(2, 210)[0]).toBeCloseTo(-1.732, 3); expect(M.toCartesian(2, 210)[1]).toBeCloseTo(-1, 12)
    for (const [r, t] of [[3, 60], [2, 210], [5, 300], [1, 0]]) { const [x, y] = M.toCartesian(r, t); const [r2, t2] = M.toPolar(x, y); expect(r2).toBeCloseTo(r, 10); expect(t2).toBeCloseTo(t, 8) }   // round trip
    const s = M.buildPolarCoordinatesScene()
    const radii = paths(s, SLATE).map((c) => extent(c).rx / u).sort((a, b) => a - b); expect(radii.map((r) => Math.round(r * 10) / 10)).toEqual([1, 2, 3])
    const rays = bonds(s, SLATE, 0.012); expect(rays).toHaveLength(12)
    expect(rays.map((o) => Math.round((((Math.atan2(o.to![1], o.to![0]) * 180) / Math.PI + 360) % 360) / 30) % 12).sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [pd, qd] = dots(s, GREEN).sort((a, b) => b.position![1] - a.position![1])
    const P1 = [pd.position![0] / u, pd.position![1] / u], Q1 = [qd.position![0] / u, qd.position![1] / u]
    expect(M.toPolar(P1[0], P1[1])[0]).toBeCloseTo(3, 1); expect(M.toPolar(P1[0], P1[1])[1]).toBeCloseTo(60, 0)
    expect(M.toPolar(Q1[0], Q1[1])[0]).toBeCloseTo(2, 1); expect(M.toPolar(Q1[0], Q1[1])[1]).toBeCloseTo(210, 0)
    expect(Q1[0]).toBeLessThan(0); expect(Q1[1]).toBeLessThan(0)                                                                             // third quadrant
    const gs = bonds(s, VIOLET, 0.03); const down = gs.find(vertical)!, across = gs.find((o) => !vertical(o))!
    expect(len(down) / u).toBeCloseTo(3 * Math.sin(Math.PI / 3), 1); expect(len(across) / u).toBeCloseTo(3 * Math.cos(Math.PI / 3), 1)       // y = r sin θ, x = r cos θ
    const arcs = paths(s, RED); expect(extent(arcs[0]).rx).toBeGreaterThan(0)
    expect(texts(s)).toEqual(expect.arrayContaining(['r = 3', 'θ = 60°', 'x = r cos θ: 1.5', 'y = r sin θ: 2.60', 'Q: 2 units at 210°', 'Q = (−1.73, −1.00)']))
  })

  it('Polar curves: every drawn point is (f(θ) cos θ, f(θ) sin θ); the cardioid reaches r = 2 with a cusp at the origin, the rose has 3 petals, the spiral grows by 1 per half turn', () => {
    const colours = [BLUE, RED, GREEN]
    const s = M.buildPolarCurvesScene()
    M.PCURVE.forEach((c, k) => {
      const cv = paths(s, colours[k])[0]
      expect(cv.points).toHaveLength(c.n + 1)
      cv.points!.forEach((p, i) => { const [x, y] = M.polarPoint(k, i); expect(p[0]).toBeCloseTo(c.cx + (x - c.ox) * c.u, 1); expect(p[1]).toBeCloseTo(y * c.u, 1) })
    })
    const back = (k: number, p: number[]) => { const c = M.PCURVE[k]; return [(p[0] - c.cx) / c.u + c.ox, p[1] / c.u] }
    const card = paths(s, BLUE)[0].points!.map((p) => back(0, p))
    for (const [x, y] of card) { const r = Math.hypot(x, y), t = Math.atan2(y, x); expect(Math.abs(r - (1 + Math.cos(t)))).toBeLessThan(0.03) }   // r = 1 + cos θ
    expect(Math.max(...card.map(([x, y]) => Math.hypot(x, y)))).toBeCloseTo(2, 1); expect(Math.min(...card.map(([x, y]) => Math.hypot(x, y)))).toBeLessThan(0.05)
    const rose = paths(s, RED)[0].points!.map((p) => back(1, p))
    const tips = new Set(rose.filter(([x, y]) => Math.hypot(x, y) > 0.97).map(([x, y]) => `${Math.round(x * 2) / 2},${Math.round(y * 2) / 2}`))
    expect(tips.size).toBe(3)                                                                                                               // three distinct petal tips
    for (const [x, y] of rose) expect(Math.hypot(x, y)).toBeLessThan(1.03)
    const spiral = paths(s, GREEN)[0].points!.map((p) => back(2, p)), rr = spiral.map(([x, y]) => Math.hypot(x, y))
    for (let i = 1; i < rr.length; i++) expect(rr[i]).toBeGreaterThan(rr[i - 1] - 0.03)                                                      // radius only grows
    expect(rr[rr.length - 1]).toBeCloseTo(3, 1); expect(rr[45]).toBeCloseTo(1.5, 1)                                                          // r = θ/π: half way round (θ = 1.5π) is 1.5
    expect(M.PCURVE[2].f(2 * Math.PI) - M.PCURVE[2].f(0)).toBeCloseTo(2, 12)                                                                // +2 per full turn
    expect(dots(s, SLATE)).toHaveLength(3)
    expect(texts(s)).toEqual(expect.arrayContaining(['cardioid r = 1 + cos θ', 'rose r = cos 3θ', 'spiral r = θ/π']))
  })

  it('Vectors in 2D: a = (3, 1), b = (1, 2), a + b = (4, 3) with length 5 by head-to-tail; 2a = (6, 2) is parallel and twice as long', () => {
    const { a, b, u } = M.VEC2
    expect(M.vecAdd(a, b)).toEqual([4, 3]); expect(M.vecLen(M.vecAdd(a, b))).toBe(5); expect(M.vecScale(2, a)).toEqual([6, 2]); expect(M.vecLen(M.vecScale(2, a))).toBeCloseTo(2 * M.vecLen(a), 12)
    const s = M.buildVectors2dScene()
    const arrBlue = arrows(s, BLUE), arrRed = arrows(s, RED), sum2 = arrows(s, GREEN)[0], two = arrows(s, VIOLET)[0]
    const va = vec(arrBlue[0], u), vb = vec(arrRed[0], u)
    expect(va[0]).toBeCloseTo(3, 1); expect(va[1]).toBeCloseTo(1, 1); expect(vb[0]).toBeCloseTo(1, 1); expect(vb[1]).toBeCloseTo(2, 1)
    const vs = vec(sum2, u); expect(vs[0]).toBeCloseTo(va[0] + vb[0], 1); expect(vs[1]).toBeCloseTo(va[1] + vb[1], 1); expect(Math.hypot(...vs)).toBeCloseTo(5, 1)
    // head-to-tail: b starts where a ends, and the closing arrow from the origin ends where b ends
    const [bAtTip] = arrRed.slice(1); expect(bAtTip.from![0]).toBeCloseTo(arrBlue[0].to![0], 2); expect(bAtTip.from![1]).toBeCloseTo(arrBlue[0].to![1], 2)
    expect(bAtTip.to![0]).toBeCloseTo(sum2.to![0], 2); expect(bAtTip.to![1]).toBeCloseTo(sum2.to![1], 2)
    const [aAtTip] = arrBlue.slice(1); expect(aAtTip.from![0]).toBeCloseTo(arrRed[0].to![0], 2); expect(aAtTip.to![0]).toBeCloseTo(sum2.to![0], 2)    // the other order lands on the same point
    const v2 = vec(two, u); expect(v2[0]).toBeCloseTo(6, 1); expect(v2[1]).toBeCloseTo(2, 1)
    expect(Math.abs(crossz(v2, va)) / (Math.hypot(...v2) * Math.hypot(...va))).toBeLessThan(0.01); expect(len(two) / len(arrBlue[0])).toBeCloseTo(2, 1)   // parallel, twice as long
    expect(texts(s)).toEqual(expect.arrayContaining(['a = (3, 1)', 'b = (1, 2)', 'a + b = (4, 3)', '|a + b| = 5', '2a = (6, 2)']))
  })

  it('Vectors in 3D: the projected component edges decode to (2, 2, 1), the floor diagonal is 2√2 and |v| = 3', () => {
    const { v, u, k } = M.VEC3
    expect(M.vec3Len(v)).toBe(3); expect(Math.hypot(v[0], v[1])).toBeCloseTo(2 * Math.SQRT2, 12); expect(Math.hypot(Math.hypot(v[0], v[1]), v[2])).toBe(3)    // Pythagoras twice
    const s = M.buildVectors3dScene()
    const ex = bonds(s, RED, 0.06)[0], ey = bonds(s, BLUE, 0.06)[0], ez = bonds(s, GREEN, 0.06)[0]
    const dx = [ex.to![0] - ex.from![0], ex.to![1] - ex.from![1]], dy = [ey.to![0] - ey.from![0], ey.to![1] - ey.from![1]], dz = [ez.to![0] - ez.from![0], ez.to![1] - ez.from![1]]
    const X = -dx[0] / (k * u), Y = dy[0] / u, Z = dz[1] / u                                                                                 // invert the oblique projection
    expect(X).toBeCloseTo(2, 1); expect(Y).toBeCloseTo(2, 1); expect(Z).toBeCloseTo(1, 1)
    expect(dx[0]).toBeCloseTo(dx[1], 2); expect(dy[1]).toBeCloseTo(0, 2); expect(dz[0]).toBeCloseTo(0, 2)                                    // x runs diagonally, y horizontally, z vertically
    expect(ey.from![0]).toBeCloseTo(ex.to![0], 2); expect(ez.from![0]).toBeCloseTo(ey.to![0], 2); expect(ez.from![1]).toBeCloseTo(ey.to![1], 2)    // a staircase: each edge starts where the last ended
    const vArrow = arrows(s, INK)[0]
    expect(vArrow.to![0]).toBeCloseTo(ez.to![0], 2); expect(vArrow.to![1]).toBeCloseTo(ez.to![1], 2)                                         // the sum of the components is v
    expect(Math.hypot(X, Y, Z)).toBeCloseTo(3, 1)
    const diag = bonds(s, VIOLET, 0.05)[0]
    expect(diag.to![0]).toBeCloseTo(ey.to![0], 2); expect(diag.to![1]).toBeCloseTo(ey.to![1], 2)                                             // floor diagonal ends at (2, 2, 0)
    expect(Math.hypot(X, Y)).toBeCloseTo(2.83, 1)
    expect(arrows(s, SLATE)).toHaveLength(3)
    expect(texts(s)).toEqual(expect.arrayContaining(['v = (2, 2, 1)', 'd = 2√2 ≈ 2.83', '|v| = √(2² + 2² + 1²) = 3']))
  })

  it('Dot product: a·b = 11 = |a||b| cos θ (θ ≈ 42.3°); the projection of b on a has length 11/|a| = 2.67; a·c = 0', () => {
    const { a, b, c, u } = M.DOT
    expect(M.dotProd(a, b)).toBe(11); expect(M.dotProd(a, c)).toBe(0)
    expect(M.angleBetween(a, b)).toBeCloseTo(42.27, 2)
    expect(M.vecLen(a) * M.vecLen(b) * Math.cos((M.angleBetween(a, b) * Math.PI) / 180)).toBeCloseTo(11, 10)                                  // the two formulas agree
    const proj = M.projectionOn(a, b); expect(Math.hypot(...proj)).toBeCloseTo(11 / Math.sqrt(17), 12); expect(M.dotProd(a, [b[0] - proj[0], b[1] - proj[1]])).toBeCloseTo(0, 12)
    const s = M.buildDotProductScene()
    const va = vec(arrows(s, BLUE)[0], u), vb = vec(arrows(s, RED)[0], u), vc = vec(arrows(s, VIOLET)[0], u)
    expect(va).toEqual([4, 1].map((v) => expect.closeTo(v, 1))); expect(vb).toEqual([2, 3].map((v) => expect.closeTo(v, 1))); expect(vc).toEqual([-1, 4].map((v) => expect.closeTo(v, 1)))
    expect(dotp(va, vb)).toBeCloseTo(11, 0)
    expect((Math.acos(dotp(va, vb) / (Math.hypot(...va) * Math.hypot(...vb))) * 180) / Math.PI).toBeCloseTo(42.3, 0)
    const foot = bonds(s, GREEN, 0.07)[0]; const f = [(foot.to![0] - foot.from![0]) / u, (foot.to![1] - foot.from![1]) / u]
    expect(Math.hypot(...f)).toBeCloseTo(2.67, 1)
    const bMinusFoot = [vb[0] - f[0], vb[1] - f[1]]; expect(Math.abs(dotp(bMinusFoot, va))).toBeLessThan(0.1)                                 // the dashed drop is perpendicular to a
    expect(Math.hypot(...va) * Math.hypot(...f)).toBeCloseTo(11, 0)                                                                          // a·b = |a| × projection
    expect(Math.abs(dotp(va, vc))).toBeLessThan(0.1)                                                                                         // c ⟂ a
    expect(bonds(s, VIOLET, 0.03).length).toBeGreaterThanOrEqual(3)                                                                          // the dashed drop and the right-angle marks
    expect(texts(s)).toEqual(expect.arrayContaining(['a·b = 11', 'projection 2.67', 'a·c = 0: orthogonal', '42.3°']))
  })

  it('Cross product: the parallelogram on (3, 0) and (1, 2) has area 6 = |a||b| sin θ = a₁b₂ − a₂b₁, and b × a = −6 (opposite orientation)', () => {
    const { a, b, u, ox, oy } = M.CROSS
    expect(M.cross2(a, b)).toBe(6); expect(M.cross2(b, a)).toBe(-6)
    const la = Math.hypot(...a), lb = Math.hypot(...b), sinT = Math.sin(Math.acos(dotp(a, b) / (la * lb)))
    expect(la * lb * sinT).toBeCloseTo(6, 12)                                                                                                // |a||b| sin θ
    expect(la * 2).toBe(6)                                                                                                                   // base 3 × height 2
    const s = M.buildCrossProductScene()
    const va = vec(arrows(s, BLUE)[0], u), vb = vec(arrows(s, RED)[0], u)
    expect(va).toEqual([3, 0].map((v) => expect.closeTo(v, 1))); expect(vb).toEqual([1, 2].map((v) => expect.closeTo(v, 1)))
    expect(crossz(va, vb)).toBeCloseTo(6, 0); expect(crossz(vb, va)).toBeCloseTo(-6, 0)
    const sides = bonds(s, GREEN, 0.04); expect(sides).toHaveLength(4)
    const corners = sides.map((o) => [(o.from![0] - ox) / u, (o.from![1] - oy) / u])
    expect(shoelace(corners)).toBeCloseTo(6, 0)                                                                                              // area of the drawn parallelogram
    const cs = corners.map((c) => [Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10])
    expect(cs).toEqual([[0, 0], [3, 0], [4, 2], [1, 2]])                                                                                     // counter-clockwise from a to b: positive orientation
    const hatch = bonds(s, GREEN, 0.022); expect(hatch.length).toBeGreaterThan(10)
    expect(sum(hatch.map((o) => len(o))) * 0.12 / (u * u)).toBeCloseTo(6, 0)                                                                 // the shading covers the area
    const out = dots(s, GREEN)[0]; const cx = ((a[0] + b[0]) / 2) * u + ox, cy = ((a[1] + b[1]) / 2) * u + oy
    expect(out.position![0]).toBeCloseTo(cx, 2); expect(out.position![1]).toBeCloseTo(cy, 2)                                                  // ⊙ at the centre of the parallelogram
    const cross = bonds(s, RED, 0.04); expect(cross).toHaveLength(2)                                                                         // ⊗ : two crossing strokes
    expect(Math.abs(dotp(vec(cross[0], 1), vec(cross[1], 1)))).toBeLessThan(0.01)
    expect(texts(s)).toEqual(expect.arrayContaining(['area = 3 × 2 = 6', 'a × b = +6k: out of the page', 'b × a = −6k: into the page']))
  })

  it('Curvature: κ(x) = (1 + x²)^(−3/2) is 1 at the vertex and 0.354 at x = 1; the osculating circles have radius 1/κ, centres on the normal, and the drawn circles agree', () => {
    const { u, oy, at } = M.CURV
    expect(M.curvKappa(0)).toBe(1); expect(M.curvKappa(1)).toBeCloseTo(2 ** -1.5, 12)
    // curvature from first principles: the circle through three very close points of the parabola (Menger), no derivative formula used
    const h = 1e-3, pt = (x: number) => [x, x * x / 2]
    for (const x of [0, 0.5, 1, 2]) expect(menger(pt(x - h), pt(x), pt(x + h))).toBeCloseTo(M.curvKappa(x), 4)
    for (const x of at) {
      const c = M.osculatingCentre(x), r = 1 / M.curvKappa(x), p = pt(x)
      expect(Math.hypot(c[0] - p[0], c[1] - p[1])).toBeCloseTo(r, 12)                                                                        // the contact point is on the circle
      expect(dotp([c[0] - p[0], c[1] - p[1]], [1, x])).toBeCloseTo(0, 12)                                                                    // centre − point ⟂ tangent: centre on the normal
    }
    expect(M.osculatingCentre(0)).toEqual([0, 1].map((v) => expect.closeTo(v, 12))); expect(M.osculatingCentre(1)).toEqual([-1, 2.5].map((v) => expect.closeTo(v, 12)))
    const s = M.buildCurvatureScene()
    const parab = paths(s, INK)[0].points!.map((q) => [q[0] / u, (q[1] - oy) / u])
    for (const [x, y] of parab) expect(Math.abs(y - x * x / 2)).toBeLessThan(0.03)
    const i0 = parab.findIndex(([x]) => Math.abs(x) < 0.06), i1 = parab.findIndex(([x]) => Math.abs(x - 1) < 0.06)
    expect(menger(parab[i0 - 8], parab[i0], parab[i0 + 8])).toBeCloseTo(menger(pt(parab[i0 - 8][0]), pt(parab[i0][0]), pt(parab[i0 + 8][0])), 1)    // the drawn curve bends as the exact parabola does
    const circ = (color: string) => { const e = extent(paths(s, color)[0]); return { cx: e.cx / u, cy: (e.cy - oy) / u, r: e.rx / u, ry: e.ry / u } }
    const c0 = circ(BLUE), c1 = circ(RED)
    expect([c0.cx, c0.cy, c0.r]).toEqual([0, 1, 1].map((v) => expect.closeTo(v, 1))); expect([c1.cx, c1.cy, c1.r]).toEqual([-1, 2.5, 2.83].map((v) => expect.closeTo(v, 1)))
    expect(c0.ry).toBeCloseTo(c0.r, 1); expect(c1.ry).toBeCloseTo(c1.r, 1)                                                                   // genuine circles
    expect(1 / c0.r).toBeCloseTo(1, 1); expect(1 / c1.r).toBeCloseTo(0.354, 1)
    const radii = bonds(s, VIOLET, 0.03); expect(radii).toHaveLength(2)
    expect(radii.map((o) => len(o) / u).sort((p, q) => p - q)).toEqual([1, 2.83].map((v) => expect.closeTo(v, 1)))
    expect(i1).toBeGreaterThan(i0)
    expect(texts(s)).toEqual(expect.arrayContaining(['vertex: curvature 1', 'x = 1: curvature 0.354', 'radius 1', 'radius 2.83']))
  })

  it('Cartesian coordinates: P(−4, 3) is 4 left of the y-axis and 3 above the x-axis, Q(2, −3) is 2 right and 3 below, R(0, −2) is on the y-axis', () => {
    const { u, p, q, r } = M.XYC
    const s = M.buildXyCoordinatesScene()
    const [dq, dp] = dots(s, GREEN).sort((a, b) => a.position![0] - b.position![0]).reverse()                                                // Q has the larger x
    const P1 = [dp.position![0] / u, dp.position![1] / u], Q1 = [dq.position![0] / u, dq.position![1] / u], R1 = dots(s, VIOLET)[0].position!.slice(0, 2).map((v) => v / u)
    expect(P1).toEqual([-4, 3].map((v) => expect.closeTo(v, 1))); expect(Q1).toEqual([2, -3].map((v) => expect.closeTo(v, 1))); expect(R1).toEqual([0, -2].map((v) => expect.closeTo(v, 1)))
    expect([Math.sign(P1[0]), Math.sign(P1[1])]).toEqual([-1, 1]); expect([Math.sign(Q1[0]), Math.sign(Q1[1])]).toEqual([1, -1])             // quadrants II and IV
    const toYAxis = bonds(s, BLUE, 0.03), toXAxis = bonds(s, RED, 0.03)
    expect([toYAxis.length, toXAxis.length]).toEqual([2, 2])
    for (const [pt, g] of [[p, toYAxis.find((o) => near(o.from![1], dp.position![1], 0.001))!], [q, toYAxis.find((o) => near(o.from![1], dq.position![1], 0.001))!]] as Array<[readonly number[], Obj]>) {
      expect(len(g) / u).toBeCloseTo(Math.abs(pt[0]), 1)                                                                                      // |x| = distance from the y-axis
      expect(g.to![0]).toBeCloseTo(0, 2)                                                                                                      // the guide ends ON the y-axis
      expect(Math.sign(g.to![0] - g.from![0])).toBe(-Math.sign(pt[0]))                                                                         // it runs toward the axis: from the left for negative x
    }
    for (const [pt, g] of [[p, toXAxis.find((o) => near(o.from![0], dp.position![0], 0.001))!], [q, toXAxis.find((o) => near(o.from![0], dq.position![0], 0.001))!]] as Array<[readonly number[], Obj]>) {
      expect(len(g) / u).toBeCloseTo(Math.abs(pt[1]), 1); expect(g.to![1]).toBeCloseTo(0, 2)
      expect(Math.sign(g.to![1] - g.from![1])).toBe(-Math.sign(pt[1]))
    }
    expect(Math.abs(R1[0])).toBeLessThan(0.01)                                                                                               // on the y-axis: x = 0
    expect(bonds(s, SLATE, 0.012)).toHaveLength(11 + 9)                                                                                      // the unit grid
    expect(texts(s)).toEqual(expect.arrayContaining(['x = −4: 4 left', 'y = 3: 3 up', 'Q: 2 right, 3 down', 'R on the y-axis: x is 0']))
  })
})
