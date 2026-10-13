/**
 * Mathematics visual campaign, batch 13 (2026-10-12): twelve linear-algebra concepts in the plane.
 * Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped back to vectors
 * and compared with an independent calculation — not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB13'

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
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
/** The displacement an arrow or bond stands for, in vector units (screen length ÷ u). */
const disp = (o: Obj, u: number): [number, number] => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
const shoelace = (pts: number[][]) => Math.abs(sum(pts.map((p, i) => p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1]))) / 2
const cross = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]
const dotp = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
const angleOf = (p: readonly number[], q: readonly number[]) => (Math.acos(dotp(p, q) / (Math.hypot(...p) * Math.hypot(...q))) * 180) / Math.PI
const approx = (v: readonly number[], tol = 1) => v.map((x) => expect.closeTo(x, tol))

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.linalg.vector', M.buildVectorScene, 'math-vector'],
  ['math.linalg.scalar-multiplication', M.buildScalarMultiplicationScene, 'math-scalar-multiplication'],
  ['math.linalg.norm', M.buildNormScene, 'math-norm'],
  ['math.linalg.unit-vector', M.buildUnitVectorScene, 'math-unit-vector'],
  ['math.linalg.orthogonality', M.buildOrthogonalityScene, 'math-orthogonality'],
  ['math.linalg.span', M.buildSpanScene, 'math-span'],
  ['math.linalg.linear-independence', M.buildLinearIndependenceScene, 'math-linear-independence'],
  ['math.linalg.basis', M.buildBasisScene, 'math-basis'],
  ['math.linalg.coordinates', M.buildCoordinatesScene, 'math-coordinates'],
  ['math.linalg.change-of-basis', M.buildChangeOfBasisScene, 'math-change-of-basis'],
  ['math.linalg.linear-map', M.buildLinearMapScene, 'math-linear-map'],
  ['math.linalg.projection', M.buildProjectionScene, 'math-projection'],
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
  it('Vector: (3, 2) from any tail is the same vector; (2, 3) is a different one with the same length', () => {
    const { v, w, tails, u } = M.VEC
    const s = M.buildVectorScene()
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(v))
    const copies = arrows(s, VIOLET); expect(copies).toHaveLength(2)
    for (const c of copies) expect(disp(c, u)).toEqual(approx(v))                                                                           // identical displacement
    expect(new Set(copies.map((c) => `${c.from![0]},${c.from![1]}`)).size).toBe(2); for (const c of copies) expect(len(c)).toBeGreaterThan(0)    // from different tails
    expect(tails).toHaveLength(2)
    expect(disp(arrows(s, RED)[0], u)).toEqual(approx(w))
    expect(Math.hypot(...v)).toBeCloseTo(Math.hypot(...w), 12); expect(v).not.toEqual(w)                                                    // same length, different vector
    const g = bonds(s, VIOLET, 0.03); expect(g.map((b) => Math.round(len(b) / u)).sort()).toEqual([2, 3])                                     // the component guides
    expect(texts(s)).toEqual(expect.arrayContaining(['v = (3, 2)', 'w = (2, 3)', '3', '2', 'same vector, other tails']))
  })

  it('Scalar multiplication: 2v = (4, 2), ½v = (1, 0.5), −v = (−2, −1), each on the line of v with length |c||v|', () => {
    const { v, u } = M.SCAL
    const s = M.buildScalarMultiplicationScene()
    const dv = disp(arrows(s, BLUE)[0], u), d2 = disp(arrows(s, VIOLET)[0], u), dh = disp(arrows(s, GREEN)[0], u), dn = disp(arrows(s, RED)[0], u)
    expect(dv).toEqual(approx(v)); expect(d2).toEqual(approx([4, 2])); expect(dh).toEqual(approx([1, 0.5])); expect(dn).toEqual(approx([-2, -1]))
    for (const [d, c] of [[d2, 2], [dh, 0.5], [dn, -1]] as Array<[number[], number]>) {
      expect(Math.abs(cross(d, v))).toBeLessThan(0.1)                                                                                       // parallel to v
      expect(Math.hypot(...d)).toBeCloseTo(Math.abs(c) * Math.hypot(...v), 1)                                                                // |cv| = |c||v|
      expect(Math.sign(dotp(d, v))).toBe(Math.sign(c))                                                                                       // c < 0 reverses direction
    }
    expect(M.scale(3, [1, -2])).toEqual([3, -6])
    expect(texts(s)).toEqual(expect.arrayContaining(['v = (2, 1)', '2v = (4, 2)', '½v = (1, 0.5)', '−v = (−2, −1)']))
  })

  it('Norm: |(3, 4)| = 5; |p + q| = 6.40 ≤ |p| + |q| = 7.29; the drawn unit shapes are the unit balls of the 1-, 2- and ∞-norms', () => {
    const { v, p, q, cx, u, oy } = M.NORM
    expect(M.norm(v)).toBe(5); expect(M.pNorm(v, 1)).toBe(7); expect(M.pNorm(v, 2)).toBeCloseTo(5, 12); expect(M.pNorm(v, Infinity)).toBe(4)
    const pq = M.add(p, q)
    expect(M.norm(pq)).toBeCloseTo(Math.sqrt(41), 12); expect(M.norm(p) + M.norm(q)).toBeCloseTo(7.2854, 3); expect(M.norm(pq)).toBeLessThan(M.norm(p) + M.norm(q))
    for (let i = 1; i < 30; i++) { const a = [Math.sin(i * 1.7) * 5, Math.cos(i * 0.9) * 4] as const, b = [Math.cos(i * 2.3) * 3, Math.sin(i * 1.1) * 6] as const; expect(M.norm(M.add(a, b))).toBeLessThanOrEqual(M.norm(a) + M.norm(b) + 1e-12) }   // the triangle inequality, in general
    for (const pp of [1, 2, Infinity]) { const a = [3, -2] as const; expect(M.pNorm(M.scale(-2.5, a), pp)).toBeCloseTo(2.5 * M.pNorm(a, pp), 12) }  // homogeneity
    const s = M.buildNormScene()
    const left = arrows(s, BLUE).filter((a) => a.from![0] < -1.5)[0]
    expect(disp(left, u[0])).toEqual(approx(v)); expect(len(left) / u[0]).toBeCloseTo(5, 1)
    const legs = bonds(s, VIOLET, 0.03).filter((b) => b.from![0] < -1); expect(legs.map((b) => Math.round(len(b) / u[0])).filter((n) => n >= 3).sort()).toEqual([3, 4])
    const mid = [...arrows(s, BLUE), ...arrows(s, RED), ...arrows(s, GREEN)].filter((a) => a.from![0] > -1.2 && a.from![0] < 2.2)
    const mp = mid.find((a) => a.color === BLUE)!, mq = mid.find((a) => a.color === RED)!, ms = mid.find((a) => a.color === GREEN)!
    expect(disp(mp, u[1])).toEqual(approx(p)); expect(disp(mq, u[1])).toEqual(approx(q)); expect(disp(ms, u[1])).toEqual(approx(pq))
    expect(mq.from![0]).toBeCloseTo(mp.to![0], 2); expect(mq.from![1]).toBeCloseTo(mp.to![1], 2)                                             // head to tail
    expect(len(ms) / u[1]).toBeCloseTo(6.403, 1); expect(len(ms)).toBeLessThan(len(mp) + len(mq))
    const ball = (color: string) => paths(s, color)[0].points!.map((pt) => [(pt[0] - cx[2]) / u[2], (pt[1] - oy[2]) / u[2]])
    for (const [x, y] of ball(RED)) expect(Math.abs(Math.abs(x) + Math.abs(y) - 1)).toBeLessThan(0.03)                                         // 1-norm: a diamond
    for (const [x, y] of ball(BLUE)) expect(Math.abs(Math.hypot(x, y) - 1)).toBeLessThan(0.03)                                                // 2-norm: a circle
    for (const [x, y] of ball(GREEN)) expect(Math.abs(Math.max(Math.abs(x), Math.abs(y)) - 1)).toBeLessThan(0.03)                             // ∞-norm: a square
    expect(texts(s)).toEqual(expect.arrayContaining(['|v| = √(3² + 4²) = 5', '|p + q| = 6.40 ≤ 7.29', 'norm-1 shapes: p = 1, 2, ∞']))
  })

  it('Unit vector: e₁, e₂ and v̂ = (3, 4)/5 = (0.6, 0.8) all have length 1 and sit on the unit circle; v̂ points along v', () => {
    const { v, u } = M.UNIT
    const vh = M.normalize(v)
    expect(vh[0]).toBeCloseTo(0.6, 12); expect(vh[1]).toBeCloseTo(0.8, 12); expect(M.norm(vh)).toBeCloseTo(1, 12); expect(M.norm(v)).toBe(5)
    const s = M.buildUnitVectorScene()
    for (const pt of paths(s, INK)[0].points!) expect(Math.hypot(pt[0] / u, pt[1] / u)).toBeCloseTo(1, 1)
    const e1 = disp(arrows(s, BLUE)[0], u), e2 = disp(arrows(s, RED)[0], u), dv = disp(arrows(s, VIOLET)[0], u), dh = disp(arrows(s, GREEN)[0], u)
    expect(e1).toEqual(approx([1, 0])); expect(e2).toEqual(approx([0, 1])); expect(Math.hypot(...e1)).toBeCloseTo(1, 1); expect(Math.hypot(...e2)).toBeCloseTo(1, 1)
    expect(dv).toEqual(approx([3, 4])); expect(Math.hypot(...dv)).toBeCloseTo(5, 1)
    expect(dh).toEqual(approx([0.6, 0.8])); expect(Math.hypot(...dh)).toBeCloseTo(1, 1)
    expect(Math.abs(cross(dh, dv))).toBeLessThan(0.1)                                                                                         // same direction as v
    expect(dh[0] / dv[0]).toBeCloseTo(1 / 5, 1)                                                                                              // = v divided by |v|
    const tip = dots(s, GREEN)[0]; expect(Math.hypot(tip.position![0] / u, tip.position![1] / u)).toBeCloseTo(1, 1)                           // ends on the circle
    expect(texts(s)).toEqual(expect.arrayContaining(['e₁', 'e₂', '|v| = 5', 'v̂ = v/|v| = (0.6, 0.8)']))
  })

  it('Orthogonality: u·w = 0 (right angle), u·w′ = 4 at 36.9°, and for the orthogonal pair |u + w|² = |u|² + |w|² = 10', () => {
    const { u, w, w2, s: sc } = M.ORTH
    expect(M.dotv(u, w)).toBe(0); expect(M.dotv(u, w2)).toBe(4); expect(angleOf(u, w2)).toBeCloseTo(36.87, 2); expect(Math.cos((36.87 * Math.PI) / 180)).toBeCloseTo(4 / 5, 3)
    const sumv = M.add(u, w); expect(M.dotv(sumv, sumv)).toBe(10); expect(M.dotv(u, u) + M.dotv(w, w)).toBe(10)
    const sumBad = M.add(u, w2); expect(M.dotv(sumBad, sumBad)).toBe(18); expect(M.dotv(u, u) + M.dotv(w2, w2)).toBe(10)                       // fails when not orthogonal
    expect(Math.abs(M.det2(u, w))).toBeGreaterThan(0)                                                                                          // orthogonal ⇒ not parallel ⇒ independent
    const s = M.buildOrthogonalityScene()
    const du = disp(arrows(s, BLUE)[0], sc), dw = disp(arrows(s, RED)[0], sc), dw2 = disp(arrows(s, VIOLET)[0], sc), ds = disp(arrows(s, GREEN)[0], sc)
    expect(du).toEqual(approx(u)); expect(dw).toEqual(approx(w)); expect(dw2).toEqual(approx(w2)); expect(ds).toEqual(approx(sumv))
    expect(Math.abs(dotp(du, dw))).toBeLessThan(0.1); expect(angleOf(du, dw)).toBeCloseTo(90, 0)                                              // drawn at a right angle
    expect(angleOf(du, dw2)).toBeCloseTo(36.9, 0); expect(dotp(du, dw2)).toBeCloseTo(4, 0)
    expect(Math.hypot(...ds) ** 2).toBeCloseTo(10, 0)
    const mark = bonds(s, GREEN, 0.03); expect(mark.length).toBe(2)                                                                          // the right-angle square
    expect(texts(s)).toEqual(expect.arrayContaining(['u·w = 0', 'u·w′ = 4: 36.9°', '|u + w|² = 5 + 5 = 10']))
  })

  it('Span: the 25 dots are c₁v₁ + c₂v₂ for whole c₁, c₂ in [−2, 2] (all different, det 3 ≠ 0 so they reach every direction); 2v₁ stays on the line of v₁', () => {
    const { v1, v2, range, u } = M.SPAN
    expect(M.det2(v1, v2)).toBe(3); expect(M.det2(v1, M.scale(2, v1))).toBe(0)
    const s = M.buildSpanScene()
    const lat = dots(s, GREEN); expect(lat).toHaveLength((2 * range + 1) ** 2)
    const coeffs = lat.map((d) => M.solveBasis(v1, v2, [d.position![0] / u, d.position![1] / u]))
    for (const [c1, c2] of coeffs) { expect(Math.abs(c1 - Math.round(c1))).toBeLessThan(0.1); expect(Math.abs(c2 - Math.round(c2))).toBeLessThan(0.1); expect(Math.abs(Math.round(c1))).toBeLessThanOrEqual(range); expect(Math.abs(Math.round(c2))).toBeLessThanOrEqual(range) }
    expect(new Set(coeffs.map(([a, b]) => `${Math.round(a)},${Math.round(b)}`)).size).toBe(25)                                                  // every pair appears once
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(v1)); expect(disp(arrows(s, RED)[0], u).slice()).toBeDefined()
    const reds = arrows(s, RED); expect(disp(reds[0], u)).toEqual(approx(v2)); expect(disp(reds[1], u)).toEqual(approx([4, 2]))
    const onLine = dots(s, BLUE); expect(onLine).toHaveLength(3)
    for (const d of onLine) expect(Math.abs(cross([d.position![0] / u, d.position![1] / u], v1))).toBeLessThan(0.1)                           // multiples of v₁ lie on its line
    expect(onLine.map((d) => Math.round((d.position![0] / u / v1[0]) * 10) / 10).sort((a, b) => a - b)).toEqual([-1, 0.5, 2])
    const ln = bonds(s, VIOLET, 0.03)[0]; expect((ln.to![1] - ln.from![1]) / (ln.to![0] - ln.from![0])).toBeCloseTo(0.5, 2)
    expect(Math.abs(cross(disp(reds[1], u), v1))).toBeLessThan(0.1)                                                                           // 2v₁ adds no new direction
    expect(texts(s)).toEqual(expect.arrayContaining(['span{v₁} = a line', 'span{v₁, v₂} = ℝ²', '2v₁: same line']))
  })

  it('Linear independence: (2, 1), (−1, 1) have det 3 (only the trivial combination); v₃ = 2v₁ gives 2v₁ − v₃ = 0; v₄ = v₁ + v₂ makes three vectors dependent', () => {
    const { v1, v2, v3, v4, u } = M.INDEP
    expect(M.det2(v1, v2)).toBe(3)
    expect(M.solveBasis(v1, v2, [0, 0])).toEqual([0, 0].map((x) => expect.closeTo(x, 12)))                                                    // c₁v₁ + c₂v₂ = 0 ⇒ c = 0
    expect(M.sub(M.scale(2, v1), v3)).toEqual([0, 0]); expect(M.det2(v1, v3)).toBe(0)                                                        // a non-trivial relation
    expect(M.sub(M.add(v1, v2), v4)).toEqual([0, 0])
    for (const [a, b, c] of [[v1, v2, v4], [v1, v2, [5, -3]], [v2, v3, [1, 7]]] as Array<[M.Vec, M.Vec, M.Vec]>) { const k = M.solveBasis(a, b, c); const r = M.add(M.scale(k[0], a), M.scale(k[1], b)); if (Math.abs(M.det2(a, b)) > 0) { expect(r[0]).toBeCloseTo(c[0], 12); expect(r[1]).toBeCloseTo(c[1], 12) } }   // a third vector is always a combination
    const s = M.buildLinearIndependenceScene()
    const d1 = disp(arrows(s, BLUE)[0], u), d2 = disp(arrows(s, RED)[0], u), d3 = disp(arrows(s, VIOLET)[0], u), d4 = disp(arrows(s, GREEN)[0], u)
    expect(d1).toEqual(approx(v1)); expect(d2).toEqual(approx(v2)); expect(d3).toEqual(approx(v3)); expect(d4).toEqual(approx(v4))
    expect(cross(d1, d2)).toBeCloseTo(3, 0)                                                                                                     // not parallel
    expect(Math.abs(cross(d1, d3))).toBeLessThan(0.1)                                                                                           // v₃ ∥ v₁
    expect(d4[0]).toBeCloseTo(d1[0] + d2[0], 1); expect(d4[1]).toBeCloseTo(d1[1] + d2[1], 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['v₁', 'v₂', 'only 0v₁ + 0v₂ = 0', 'v₃ = 2v₁: dependent', 'v₄ = v₁ + v₂']))
  })

  it('Basis: w = (3, 1) = 3e₁ + e₂ = 2b₁ − b₂, each recipe unique because both bases have non-zero determinant', () => {
    const { b1, b2, w, u } = M.BASIS
    expect(M.det2([1, 0], [0, 1])).toBe(1); expect(M.det2(b1, b2)).toBe(2)
    expect(M.solveBasis([1, 0], [0, 1], w)).toEqual([3, 1].map((x) => expect.closeTo(x, 12))); expect(M.solveBasis(b1, b2, w)).toEqual([2, -1].map((x) => expect.closeTo(x, 12)))
    expect(M.add(M.scale(2, b1), M.scale(-1, b2))).toEqual([3, 1])
    const s = M.buildBasisScene()
    expect(bonds(s, SLATE, 0.012)).toHaveLength(14); expect(bonds(s, VIOLET, 0.012)).toHaveLength(14)                                         // two grids
    const [x3, y1] = [bonds(s, BLUE, 0.05)[0], bonds(s, RED, 0.05)[0]]
    expect(disp(x3, u)).toEqual(approx([3, 0])); expect(disp(y1, u)).toEqual(approx([0, 1]))                                                   // 3 steps along e₁ then 1 along e₂
    const [s1, s2] = [bonds(s, VIOLET, 0.07)[0], bonds(s, RED, 0.07)[0]]
    expect(disp(s1, u)).toEqual(approx([2, 2])); expect(disp(s2, u)).toEqual(approx([1, -1]))                                                   // 2b₁ then −b₂
    expect(s2.from![0]).toBeCloseTo(s1.to![0], 2); expect(s2.from![1]).toBeCloseTo(s1.to![1], 2)
    expect(s2.to![0] / u).toBeCloseTo(w[0], 1); expect(s2.to![1] / u).toBeCloseTo(w[1], 1)                                                    // both recipes end at w
    const tip = dots(s, GREEN)[0]; expect([tip.position![0] / u, tip.position![1] / u]).toEqual(approx(w))
    expect(texts(s)).toEqual(expect.arrayContaining(['w = 3e₁ + e₂', 'b₁', 'b₂', 'w = 2b₁ − b₂']))
  })

  it('Coordinates: in the skew basis b₁ = (2, 0), b₂ = (1, 1) the vector (4, 2) is 1·b₁ + 2·b₂, so [w]_B = (1, 2) ≠ (4, 2)', () => {
    const { b1, b2, w, u, oy } = M.COORD
    const c = M.solveBasis(b1, b2, w)
    expect(c).toEqual([1, 2].map((x) => expect.closeTo(x, 12))); expect(M.add(M.scale(c[0], b1), M.scale(c[1], b2))).toEqual([4, 2]); expect(M.det2(b1, b2)).toBe(2)
    expect(c).not.toEqual([4, 2])                                                                                                               // coordinates depend on the basis
    const s = M.buildCoordinatesScene()
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(b1)); expect(disp(arrows(s, RED)[0], u)).toEqual(approx(b2))
    expect(bonds(s, VIOLET, 0.012)).toHaveLength(10)                                                                                           // the slanted grid
    for (const g of bonds(s, VIOLET, 0.012).slice(0, 5)) expect(Math.abs(g.to![1] - g.from![1])).toBeLessThan(0.01 + 0.0)                      // one family is horizontal (parallel to b₁)
    const d = dots(s, GREEN)[0]; expect([d.position![0] / u, (d.position![1] - oy) / u]).toEqual(approx(w))
    const s1 = bonds(s, BLUE, 0.07)[0], s2 = bonds(s, RED, 0.07)[0]
    expect(disp(s1, u)).toEqual(approx([2, 0])); expect(disp(s2, u)).toEqual(approx([2, 2]))                                                    // 1 step of b₁, then 2 of b₂
    expect(s2.from![0]).toBeCloseTo(s1.to![0], 2); expect(s2.to![0]).toBeCloseTo(d.position![0], 2); expect(s2.to![1]).toBeCloseTo(d.position![1], 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['b₁ = (2, 0)', 'b₂ = (1, 1)', 'w = (4, 2) in the usual axes', '[w]_B = (1, 2)']))
  })

  it('Change of basis: M = [[2, 1], [0, 1]] sends B-coordinates to standard ones and M⁻¹ = [[0.5, −0.5], [0, 1]] back: (4, 2) ↔ (1, 2), (3, 1) ↔ (1, 1)', () => {
    const { b1, b2, pts, u, oy } = M.CHANGE
    const m = M.matM(), mi = M.matMInv()
    expect(m).toEqual([[2, 1], [0, 1]]); expect(mi).toEqual([[0.5, -0.5], [0, 1]].map((r) => r.map((x) => expect.closeTo(x, 12))))
    const prod = [[0, 0], [0, 0]]; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) prod[i][j] = m[i][0] * mi[0][j] + m[i][1] * mi[1][j]
    expect(prod).toEqual([[1, 0], [0, 1]].map((r) => r.map((x) => expect.closeTo(x, 12))))                                                      // M M⁻¹ = I
    expect(M.applyMat(m, [1, 2])).toEqual([4, 2]); expect(M.applyMat(mi, [4, 2])).toEqual([1, 2].map((x) => expect.closeTo(x, 12))); expect(M.applyMat(mi, [3, 1])).toEqual([1, 1].map((x) => expect.closeTo(x, 12)))
    const s = M.buildChangeOfBasisScene()
    const ds = dots(s, GREEN); expect(ds).toHaveLength(2)
    for (const d of ds) {
      const p: [number, number] = [d.position![0] / u, (d.position![1] - oy) / u]
      const grid = M.solveBasis(b1, b2, p), viaMatrix = M.applyMat(mi, p)
      expect(grid[0]).toBeCloseTo(viaMatrix[0], 1); expect(grid[1]).toBeCloseTo(viaMatrix[1], 1)                                                // the grid position IS M⁻¹ × standard coordinates
    }
    expect(pts.map((p) => M.applyMat(mi, p).map((x) => Math.round(x * 10) / 10))).toEqual([[1, 2], [1, 1]])
    expect(bonds(s, VIOLET, 0.012)).toHaveLength(10)
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(b1)); expect(disp(arrows(s, RED)[0], u)).toEqual(approx(b2))
    expect(texts(s)).toEqual(expect.arrayContaining(['M = [b₁ b₂] = [[2, 1], [0, 1]]', 'M⁻¹ = [[0.5, −0.5], [0, 1]]', '[w]_B = M⁻¹ [w]_E', 'B-coordinates: (1, 2) and (1, 1)']))
  })

  it('Linear map: T(e₁) = (2, 1), T(e₂) = (1, 2) are the matrix columns, the unit square (area 1) becomes a parallelogram of area det = 3, and T(1, 1) = T(e₁) + T(e₂) = (3, 3)', () => {
    const { u, A } = M.LMAP
    expect(M.applyT([1, 0])).toEqual([2, 1]); expect(M.applyT([0, 1])).toEqual([1, 2]); expect(M.det2([2, 1], [1, 2])).toBe(3); expect(A[0][0] * A[1][1] - A[0][1] * A[1][0]).toBe(3)
    for (const [a, b, c] of [[[1, 2], [-3, 4], 2.5], [[0.5, -1], [2, 2], -3], [[7, 1], [1, 7], 0.1]] as Array<[M.Vec, M.Vec, number]>) {
      const l = M.applyT(M.add(a, b)), r = M.add(M.applyT(a), M.applyT(b)); expect(l[0]).toBeCloseTo(r[0], 12); expect(l[1]).toBeCloseTo(r[1], 12)          // additivity
      const h = M.applyT(M.scale(c, a)), k = M.scale(c, M.applyT(a)); expect(h[0]).toBeCloseTo(k[0], 12); expect(h[1]).toBeCloseTo(k[1], 12)                // homogeneity
    }
    const s = M.buildLinearMapScene()
    const blue = arrows(s, BLUE), red = arrows(s, RED), green = arrows(s, GREEN)
    expect(blue.map((a) => disp(a, u))).toEqual(expect.arrayContaining([approx([1, 0]), approx([2, 1])])); expect(red.map((a) => disp(a, u))).toEqual(expect.arrayContaining([approx([0, 1]), approx([1, 2])]))
    expect(green.map((a) => disp(a, u)).sort((p, q) => Math.hypot(...p) - Math.hypot(...q))).toEqual([approx([1, 1]), approx([3, 3])])           // (1, 1) ↦ (3, 3)
    const sq = bonds(s, SLATE, 0.04), par = bonds(s, VIOLET, 0.04)
    const corners = (bs: Obj[]) => bs.map((b) => [b.from![0], b.from![1]])
    expect(shoelace(corners(sq)) / (u * u)).toBeCloseTo(1, 1); expect(shoelace(corners(par)) / (u * u)).toBeCloseTo(3, 1)                          // area × det
    const guides = bonds(s, SLATE, 0.03); expect(guides).toHaveLength(2)
    expect(texts(s)).toEqual(expect.arrayContaining(['T(e₁) = (2, 1)', 'T(e₂) = (1, 2)', 'area 1 → area 3', 'T(1, 1) = T(e₁) + T(e₂) = (3, 3)']))
  })

  it('Projection: proj_u(v) = (v·u/u·u)u = (2.7, 0.9) is the closest point (2.21, against 2.72 and 2.55), v − proj ⊥ u and |v|² = |proj|² + |v − proj|²', () => {
    const { u, v, others, s: sc, ox, oy } = M.PROJ
    const p = M.projOn(u, v)
    expect(p[0]).toBeCloseTo(2.7, 12); expect(p[1]).toBeCloseTo(0.9, 12)
    const err = M.sub(v, p); expect(err[0]).toBeCloseTo(-0.7, 12); expect(err[1]).toBeCloseTo(2.1, 12); expect(M.dotv(err, u)).toBeCloseTo(0, 12)       // v − proj ⊥ u
    expect(M.dotv(v, v)).toBe(13); expect(M.dotv(p, p) + M.dotv(err, err)).toBeCloseTo(13, 12); expect(M.dotv(p, p)).toBeCloseTo(8.1, 12); expect(M.dotv(err, err)).toBeCloseTo(4.9, 12)   // Pythagoras
    const dist = (c: number) => M.norm(M.sub(v, M.scale(c, u)))
    let best = Infinity, bestC = 0; for (let c = -2; c <= 4; c += 0.001) if (dist(c) < best) { best = dist(c); bestC = c }
    expect(bestC).toBeCloseTo(0.9, 2); expect(best).toBeCloseTo(2.2136, 3)                                                                       // searched: the minimum is at the projection
    expect(dist(others[0])).toBeCloseTo(2.72, 2); expect(dist(others[1])).toBeCloseTo(2.55, 2); expect(dist(others[0])).toBeGreaterThan(best); expect(dist(others[1])).toBeGreaterThan(best)
    const s = M.buildProjectionScene()
    const du = disp(arrows(s, BLUE)[0], sc), dv = disp(arrows(s, RED)[0], sc)
    expect(du).toEqual(approx(u)); expect(dv).toEqual(approx(v))
    const foot = bonds(s, GREEN, 0.07)[0]; expect(disp(foot, sc)).toEqual(approx(p))
    const drop = bonds(s, VIOLET, 0.04)[0]
    expect(len(drop) / sc).toBeCloseTo(2.2136, 1); expect(Math.abs(dotp(disp(drop, sc), u))).toBeLessThan(0.1)                                      // the dashed drop is perpendicular to u
    expect([(drop.to![0] - ox) / sc, (drop.to![1] - oy) / sc]).toEqual(approx(p))
    const alts = bonds(s, SLATE, 0.025); expect(alts.map((a) => Math.round((len(a) / sc) * 100) / 100).sort()).toEqual([2.55, 2.72])
    for (const a of alts) expect(len(a) / sc).toBeGreaterThan(len(drop) / sc)
    expect(texts(s)).toEqual(expect.arrayContaining(['proj = (2.7, 0.9)', '2.72', '2.55', '2.21 is shortest']))
  })
})
