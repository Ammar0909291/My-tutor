/**
 * Mathematics visual campaign, batch 1 (2026-10-11): twelve core concepts.
 * Each test checks the MATHEMATICS the figure draws, not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB1'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa'
const segs = (s: SceneSpec, color: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && o.color === color)
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.geom.pythagorean-theorem', M.buildPythagoreanScene, 'math-pythagorean-theorem'],
  ['math.geom.slope', M.buildSlopeScene, 'math-slope'],
  ['math.geom.parabola', M.buildParabolaScene, 'math-parabola'],
  ['math.func.graph-of-function', M.buildGraphOfFunctionScene, 'math-graph-of-function'],
  ['math.func.inverse-functions', M.buildInverseFunctionsScene, 'math-inverse-functions'],
  ['math.func.domain-range', M.buildDomainRangeScene, 'math-domain-range'],
  ['math.alg.system-linear-equations', M.buildLinearSystemScene, 'math-linear-systems'],
  ['math.geom.circle-equation', M.buildCircleEquationScene, 'math-circle-equation'],
  ['math.linalg.determinant', M.buildDeterminantScene, 'math-determinant'],
  ['math.linalg.eigenvalues', M.buildEigenScene, 'math-eigenvectors'],
  ['math.prob.conditional-probability', M.buildConditionalProbabilityScene, 'math-conditional-probability'],
  ['math.prob.normal-distribution', M.buildNormalDistributionScene, 'math-normal-distribution'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
  })
})

describe('every figure is well-formed', () => {
  it.each(BATCH)('%s passes the scene validator the renderer uses', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
  it.each(BATCH)('%s keeps every coordinate inside +-5', (conceptId, build) => {
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
  it.each(BATCH)('%s fits the intermediate label budget', (_id, build) => {
    const labels = objs(build()).filter((o) => o.type === 'label')
    expect(labels.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    expect(labels.length).toBeGreaterThan(0)
  })
  it.each(BATCH)('%s has three cumulative steps with narration', (_id, build) => {
    const s = build()
    expect(s.steps).toHaveLength(3)
    for (const st of s.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
  })
})

describe('the mathematics each figure draws', () => {
  it('Pythagoras: legs 3 and 4 are perpendicular, the hypotenuse is 5, and the squares hold 9, 16 and 25 cells', () => {
    expect(M.PYTH_AREAS).toEqual({ a2: 9, b2: 16, c2: 25 })
    expect(M.PYTH.a ** 2 + M.PYTH.b ** 2).toBe(M.PYTH.c ** 2)
    const { u, nOut } = M.pythagorasGeometry()
    expect(near(u[0] * nOut[0] + u[1] * nOut[1], 0, 1e-9)).toBe(true)          // outward normal is perpendicular to the hypotenuse
    expect(near(Math.hypot(u[0], u[1]), 1, 1e-9)).toBe(true)
    const s = M.buildPythagoreanScene()
    const hypEdges = segs(s, GREEN).filter((o) => near(len(o), M.PYTH.c * M.PYTH.S, 0.02))
    expect(hypEdges.length).toBeGreaterThanOrEqual(4)                           // the four outer edges of the 5x5 square
    const t = texts(s)
    expect(t).toContain('9'); expect(t).toContain('16'); expect(t).toContain('25')
    expect(t).toContain('a² + b² = c²')
  })
  it('Slope: run 3, rise 2, so m = 2/3; both labelled points lie on the line', () => {
    const { x1, y1, run, rise } = M.SLOPE
    expect(M.slopeLineY(x1)).toBeCloseTo(y1, 9)
    expect(M.slopeLineY(x1 + run)).toBeCloseTo(y1 + rise, 9)
    const s = M.buildSlopeScene()
    const runLine = segs(s, RED).find((o) => o.from![1] === o.to![1])!
    const riseLine = segs(s, BLUE).find((o) => o.from![0] === o.to![0])!
    expect(len(runLine)).toBeCloseTo(3, 2)
    expect(len(riseLine)).toBeCloseTo(2, 2)
    expect(texts(s).some((t) => t.includes('2/3'))).toBe(true)
  })
  it('Parabola: every point is as far from the focus as from the directrix, and the drawn segments are equal', () => {
    for (const x of [-4, -2.5, -1, 0, 0.7, 2, 3, 4]) {
      const y = M.paraY(x)
      expect(M.distToFocus(x, y)).toBeCloseTo(M.distToDirectrix(x, y), 9)
    }
    const s = M.buildParabolaScene()
    const red = segs(s, RED), blue = segs(s, BLUE)
    expect(red).toHaveLength(2); expect(blue).toHaveLength(2)                   // P and Q each get a focus segment and a directrix segment
    expect(len(red[0])).toBeCloseTo(len(blue[0]), 1)
    expect(len(red[1])).toBeCloseTo(len(blue[1]), 1)
    expect(len(red[0])).toBeCloseTo(3.25, 1)
    expect(len(red[1])).toBeCloseTo(2, 1)
  })
  it('Graph of a function: a vertical line meets f once but meets the circle twice', () => {
    expect(M.graphF(1)).toBeCloseTo(0.7, 9)
    const [a, b] = M.circleYs(M.GRAPH_FN.circleU, M.GRAPH_FN.circleR)
    expect(a).toBeGreaterThan(0); expect(b).toBeLessThan(0); expect(a).toBeCloseTo(-b, 9)
    expect(Math.hypot(M.GRAPH_FN.circleU, a)).toBeCloseTo(M.GRAPH_FN.circleR, 9)
    const t = texts(M.buildGraphOfFunctionScene())
    expect(t).toContain('function'); expect(t).toContain('not a function')
  })
  it('Inverse functions: f⁻¹(f(x)) = x and the plotted pair (a, b) and (b, a) mirror over y = x', () => {
    for (const x of [-2.3, -1, 0, 0.5, 1.6, 2.38]) expect(M.invFinv(M.invF(x))).toBeCloseTo(x, 9)
    const a = M.INV.a, b = M.invF(a)
    const s = M.buildInverseFunctionsScene()
    const dots = objs(s).filter((o) => o.type === 'node' && o.position)
    expect(dots).toHaveLength(2)
    const [p, q] = dots.map((d) => d.position!)
    expect(p[0]).toBeCloseTo(a, 1); expect(p[1]).toBeCloseTo(b, 1)
    expect(q[0]).toBeCloseTo(p[1], 1); expect(q[1]).toBeCloseTo(p[0], 1)       // mirrored
  })
  it('Domain and range: √(9 − x²) is defined for −3..3 and ranges over 0..3', () => {
    const xs = Array.from({ length: 61 }, (_, i) => -3 + i * 0.1)
    const ys = xs.map(M.drF)
    expect(Math.min(...ys)).toBeCloseTo(0, 6)
    expect(Math.max(...ys)).toBeCloseTo(3, 6)
    const s = M.buildDomainRangeScene()
    const domain = segs(s, RED).find((o) => o.from![1] === o.to![1])!
    const range = segs(s, BLUE).find((o) => o.from![0] === o.to![0])!
    expect(len(domain)).toBeCloseTo(6, 2)
    expect(len(range)).toBeCloseTo(3, 2)
  })
  it('Systems of equations: the lines y = x + 1 and y = −x/2 + 4 cross at (2, 3), which satisfies both', () => {
    expect(M.sysL1(M.SYS.x)).toBe(M.SYS.y)
    expect(M.sysL2(M.SYS.x)).toBe(M.SYS.y)
    // and nowhere else
    for (const x of [-1, 0, 1, 3, 4]) expect(M.sysL1(x)).not.toBeCloseTo(M.sysL2(x), 6)
    const t = texts(M.buildLinearSystemScene())
    expect(t).toContain('(2, 3)'); expect(t.some((x) => x.includes('parallel'))).toBe(true); expect(t.some((x) => x.includes('infinite'))).toBe(true)
  })
  it('Equation of a circle: P = (5, 4) is on the circle with centre (1, 1), radius 5, because 4² + 3² = 5²', () => {
    const { h, k, r, px, py } = M.CIRCLE
    expect(M.circleResidual(px, py)).toBe(0)
    expect((px - h) ** 2 + (py - k) ** 2).toBe(r ** 2)
    expect(M.circleResidual(h + 3, k + 4)).toBe(0)                                // another 3-4-5 point
    expect(M.circleResidual(0, 0)).not.toBe(0)                                    // the origin is inside it
    const s = M.buildCircleEquationScene()
    const red = segs(s, RED)[0], blue = segs(s, BLUE)[0]
    expect(len(red)).toBeCloseTo(4 * M.CIRCLE.U, 1)                               // x − h = 4
    expect(len(blue)).toBeCloseTo(3 * M.CIRCLE.U, 1)                              // y − k = 3
    const radius = segs(s, VIOLET).find((o) => o.from && o.to && len(o) > 2)!
    expect(len(radius)).toBeCloseTo(r * M.CIRCLE.U, 1)                            // r = 5
    // every sampled point of the drawn ring is r from the centre
    const ring = objs(s).find((o) => o.type === 'path' && (o.points?.length ?? 0) > 50)!.points!
    const c0 = [(h - h) * M.CIRCLE.U, (k - k) * M.CIRCLE.U]
    for (const p of ring) expect(Math.hypot(p[0] - c0[0], p[1] - c0[1])).toBeCloseTo(r * M.CIRCLE.U, 1)
    expect(texts(s)).toContain('(x − 1)² + (y − 1)² = 25')
  })
  it('Determinant: det [[2,1],[1,2]] = 3 = the area of the parallelogram the unit square becomes', () => {
    expect(M.det2([[2, 1], [1, 2]])).toBe(3)
    expect(M.parallelogramArea(M.DET.cols[0], M.DET.cols[1])).toBe(3)
    expect(M.parallelogramArea([2, 4], [1, 2])).toBe(0)                          // dependent columns flatten the square
    expect(texts(M.buildDeterminantScene()).some((t) => t.includes('= 3'))).toBe(true)
  })
  it('Eigenvectors: A(1,1) = 4(1,1), A(1,−1) = 2(1,−1), and an ordinary vector is turned', () => {
    expect(M.mulA([1, 1])).toEqual([4, 4])
    expect(M.mulA([1, -1])).toEqual([2, -2])
    const v = [-1.2, 0], Av = M.mulA(v)
    expect(Math.abs(v[0] * Av[1] - v[1] * Av[0])).toBeGreaterThan(0.5)           // cross product ≠ 0: not parallel
    const t = texts(M.buildEigenScene())
    expect(t).toContain('Av₁ = 4v₁'); expect(t).toContain('Av₂ = 2v₂')
  })
  it('Conditional probability: |B| = 25, |A ∩ B| = 9, so P(A | B) = 0.36', () => {
    expect(M.rectArea(M.COND.B)).toBe(25)
    expect(M.rectArea(M.COND.A)).toBe(15)
    expect(M.rectOverlap(M.COND.A, M.COND.B)).toBe(9)
    expect(M.rectArea({ x0: 0, y0: 0, x1: M.COND.omega.w, y1: M.COND.omega.h })).toBe(50)
    expect(9 / 25).toBeCloseTo(0.36, 9)
    expect(texts(M.buildConditionalProbabilityScene()).some((t) => t.includes('9/25 = 0.36'))).toBe(true)
  })
  it('Normal distribution: 68.3% / 95.4% / 99.7% within 1, 2, 3 standard deviations; the bell is symmetric with its peak at μ', () => {
    expect(M.withinK(1)).toBeCloseTo(0.6827, 3)
    expect(M.withinK(2)).toBeCloseTo(0.9545, 3)
    expect(M.withinK(3)).toBeCloseTo(0.9973, 3)
    for (const z of [0.5, 1, 2, 3]) expect(M.normPdfShape(z)).toBeCloseTo(M.normPdfShape(-z), 12)
    expect(M.normPdfShape(0)).toBe(1)
    const t = texts(M.buildNormalDistributionScene())
    expect(t).toEqual(expect.arrayContaining(['68.3%', '95.4%', '99.7%', 'μ']))
  })
})

describe('the figures stay themed and framed', () => {
  it.each(BATCH)('%s uses only semantic role colours', (_id, build) => {
    const roles = new Set(['#94a3b8', '#e2e8f0', RED, BLUE, VIOLET, GREEN])
    for (const o of objs(build())) if (o.color) expect(roles.has(o.color.toLowerCase()), `${o.type} ${o.color}`).toBe(true)
  })
  it.each(BATCH)('%s sets a camera distance that frames it', (_id, build) => {
    const d = build().cameraDistance!
    expect(d).toBeGreaterThanOrEqual(7)
    expect(d).toBeLessThanOrEqual(13)
  })
})
