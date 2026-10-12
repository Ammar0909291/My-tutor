/**
 * Mathematics visual campaign, batch 11 (2026-10-12): twelve function concepts. Each test checks the
 * MATHEMATICS the figure draws — the drawn coordinates are mapped back to function values and compared
 * with an independent calculation — not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB11'

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
const slope = (o: Obj) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])
/** Centre and half-height of a closed curve (an oval) drawn as a path. */
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2 } }
/** Index in a column of n elements spaced sp apart, centred on y = 0, for a screen y. */
const idxAt = (n: number, sp: number, y: number) => Math.round((n - 1) / 2 - y / sp)
/** How many times a drawn curve crosses the horizontal screen line y = level. */
const crossings = (pts: number[][], level: number) => pts.slice(1).filter((p, i) => (pts[i][1] >= level) !== (p[1] >= level)).length

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.func.function-concept', M.buildFunctionConceptScene, 'math-function-concept'],
  ['math.func.injectivity', M.buildInjectivityScene, 'math-injectivity'],
  ['math.func.surjectivity', M.buildSurjectivityScene, 'math-surjectivity'],
  ['math.func.bijection', M.buildBijectionScene, 'math-bijection'],
  ['math.func.transformations-functions', M.buildTransformationsFunctionsScene, 'math-transformations-functions'],
  ['math.func.polynomial-function', M.buildPolynomialFunctionScene, 'math-polynomial-function'],
  ['math.func.end-behavior', M.buildEndBehaviorScene, 'math-end-behavior'],
  ['math.func.rational-function', M.buildRationalFunctionScene, 'math-rational-function'],
  ['math.func.vertical-asymptote', M.buildVerticalAsymptoteScene, 'math-vertical-asymptote'],
  ['math.func.horizontal-asymptote', M.buildHorizontalAsymptoteScene, 'math-horizontal-asymptote'],
  ['math.func.piecewise-function', M.buildPiecewiseFunctionScene, 'math-piecewise-function'],
  ['math.func.monotonic-function', M.buildMonotonicFunctionScene, 'math-monotonic-function'],
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
  it('Function concept: every input has exactly one arrow, f(x) = x² sends −1, 0, 1, 2 to 1, 0, 1, 4 and the range is {0, 1, 4}', () => {
    const { dom, cod, gap, sp } = M.FUNC
    expect(dom.map(M.funcOf)).toEqual([1, 0, 1, 4]); expect(M.funcRange()).toEqual([0, 1, 4])
    expect(new Set(dom.map(M.funcOf)).size).toBeLessThan(dom.length)                                                                       // two inputs share an output: still a function
    const s = M.buildFunctionConceptScene()
    expect(dots(s, RED)).toHaveLength(4); expect(dots(s, BLUE)).toHaveLength(6)
    const arr = arrows(s, INK); expect(arr).toHaveLength(4)
    const fromIdx = arr.map((a) => idxAt(dom.length, sp, a.from![1]))
    expect([...fromIdx].sort()).toEqual([0, 1, 2, 3])                                                                                      // exactly one arrow leaves each input
    for (const a of arr) {
      expect(a.from![0]).toBeCloseTo(-gap + 0.2, 2); expect(a.to![0]).toBeCloseTo(gap - 0.2, 2)
      const x = dom[idxAt(dom.length, sp, a.from![1])], y = cod[idxAt(cod.length, sp, a.to![1])]
      expect(y).toBe(x * x)
    }
    const hit = paths(s, GREEN).map((r) => cod[idxAt(cod.length, sp, extent(r).cy)]).sort((a, b) => a - b)
    expect(hit).toEqual([0, 1, 4])
    expect(cod.filter((v) => !hit.includes(v))).toEqual([2, 3, 5])                                                                         // in the codomain, not in the range
    expect(texts(s)).toEqual(expect.arrayContaining(['domain A', 'codomain B', 'f(x) = x²', 'range = {0, 1, 4}', 'one arrow from each input']))
  })

  it('Injectivity: x³ passes the horizontal line test (each line crosses once), x² fails (±1.5 share 2.25), x² on x ≥ 0 passes', () => {
    const { cx, ux, uyL, uyR, oyR, levelsL, levelR } = M.INJ
    const grid = Array.from({ length: 400 }, (_, i) => -3 + i * 0.015)
    for (let i = 1; i < grid.length; i++) expect(grid[i] ** 3).toBeGreaterThan(grid[i - 1] ** 3)                                          // x³ is strictly increasing, hence injective
    expect(1.5 ** 2).toBe((-1.5) ** 2); expect(Math.sqrt(levelR)).toBe(1.5)                                                                 // x² is not
    for (let i = 1; i < 200; i++) expect((i * 0.01) ** 2).toBeGreaterThan(((i - 1) * 0.01) ** 2)                                           // but is on x ≥ 0
    expect(levelsL.map((c) => M.cubeRoot(c) ** 3)).toEqual(levelsL.map((c) => expect.closeTo(c, 12)))
    const s = M.buildInjectivityScene()
    const inks = paths(s, INK), cube = inks[0], square = inks[1]
    for (const p of cube.points!) { const x = (p[0] - cx[0]) / ux; expect(Math.abs(p[1] / uyL - x ** 3)).toBeLessThan(0.15) }
    for (const p of square.points!) { const x = (p[0] - cx[1]) / ux; expect(Math.abs((p[1] - oyR) / uyR - x * x)).toBeLessThan(0.1) }
    for (const c of levelsL) expect(crossings(cube.points!, c * uyL)).toBe(1)                                                              // one hit per horizontal line
    expect(crossings(square.points!, levelR * uyR + oyR)).toBe(2)                                                                          // two hits
    const green = dots(s, GREEN); expect(green).toHaveLength(3)
    green.forEach((d, i) => { const c = [...levelsL].sort((a, b) => a - b)[i]; const gd = [...green].sort((p, q) => p.position![1] - q.position![1])[i]; expect(gd.position![1] / uyL).toBeCloseTo(c, 1); expect(((gd.position![0] - cx[0]) / ux) ** 3).toBeCloseTo(c, 0); void d })
    const red = dots(s, RED).sort((p, q) => p.position![0] - q.position![0]); expect(red).toHaveLength(2)
    expect((red[0].position![0] - cx[1]) / ux).toBeCloseTo(-1.5, 2); expect((red[1].position![0] - cx[1]) / ux).toBeCloseTo(1.5, 2)
    expect(red[0].position![1]).toBeCloseTo(red[1].position![1], 2)                                                                        // same height: a shared output
    const branch = paths(s, GREEN)[0]; for (const p of branch.points!) expect((p[0] - cx[1]) / ux).toBeGreaterThanOrEqual(-0.01)
    expect(crossings(branch.points!, 2.25 * uyR + oyR)).toBe(1)
    expect(texts(s)).toEqual(expect.arrayContaining(['x³: one hit each', 'x²: hit twice', 'x ≥ 0: injective']))
  })

  it('Surjectivity: f is onto {1,2,3} (3 has two arrows), g is not onto {1,2,3,4} (4 has none), read from the drawn arrows', () => {
    const { cx, gap, sp, f, g } = M.SURJ
    expect(M.isOnto(f.cod, f.pairs)).toBe(true); expect(M.isOnto(g.cod, g.pairs)).toBe(false)
    expect(M.reached(f.pairs)).toEqual([1, 2, 3]); expect(M.reached(g.pairs)).toEqual([1, 2, 3])
    expect(g.cod.filter((v) => !M.reached(g.pairs).includes(v))).toEqual([4])
    const s = M.buildSurjectivityScene()
    const arr = arrows(s, BLUE)
    const left = arr.filter((a) => a.from![0] < 0), right = arr.filter((a) => a.from![0] > 0)
    expect([left.length, right.length]).toEqual([4, 3])
    const targets = (as: Obj[], cod: readonly number[]) => as.map((a) => cod[idxAt(cod.length, sp, a.to![1])])
    expect(new Set(targets(left, f.cod))).toEqual(new Set([1, 2, 3]))                                                                      // every target is reached
    expect(targets(left, f.cod).filter((v) => v === 3)).toHaveLength(2)                                                                    // f is not injective
    expect(new Set(targets(right, g.cod))).toEqual(new Set([1, 2, 3])); expect(targets(right, g.cod)).not.toContain(4)                     // nothing reaches 4
    expect(new Set(targets(right, g.cod)).size).toBe(g.dom.length)                                                                         // but g is injective
    left.forEach((a) => expect(a.to![0]).toBeCloseTo(cx[0] + gap - 0.2, 2))
    const rings = (color: string) => paths(s, color).map((r) => extent(r))
    expect(rings(GREEN)).toHaveLength(3); expect(rings(RED)).toHaveLength(1)
    expect(g.cod[idxAt(g.cod.length, sp, rings(RED)[0].cy)]).toBe(4)                                                                       // the red ring is on 4
    expect(texts(s)).toEqual(expect.arrayContaining(['onto: range = codomain', '4 is never reached']))
  })

  it('Bijection: one arrow out of each input and one into each output (f(x) = 2x), and the violet arrows are the inverse y/2', () => {
    const { gap, sp, dom, cod } = M.BIJ
    expect(dom.map(M.bijF)).toEqual([2, 4, 6]); expect(new Set(dom.map(M.bijF)).size).toBe(3)
    for (const x of dom) expect(M.bijInverse(M.bijF(x))).toBe(x); for (const y of cod) expect(M.bijF(M.bijInverse(y))).toBe(y)            // each undoes the other
    const s = M.buildBijectionScene()
    const fw = arrows(s, BLUE), bw = arrows(s, VIOLET)
    expect([fw.length, bw.length]).toEqual([3, 3])
    expect(fw.map((a) => idxAt(dom.length, sp, a.from![1])).sort()).toEqual([0, 1, 2]); expect(fw.map((a) => idxAt(cod.length, sp, a.to![1])).sort()).toEqual([0, 1, 2])   // one out, one in
    fw.forEach((a) => expect(cod[idxAt(cod.length, sp, a.to![1])]).toBe(2 * dom[idxAt(dom.length, sp, a.from![1])]))
    bw.forEach((a) => {
      expect(a.from![0]).toBeGreaterThan(a.to![0])                                                                                          // run right to left
      const y = cod[idxAt(cod.length, sp, a.from![1] + 0.2)], x = dom[idxAt(dom.length, sp, a.to![1] + 0.2)]
      expect(x).toBe(y / 2)
    })
    expect(paths(s, GREEN)).toHaveLength(3); expect(gap).toBe(2.2)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = 2x', 'one in, one out: bijective', 'inverse: y ↦ y/2']))
  })

  it('Transformations: the vertex of f(x − 2) + 1 is (2, 1), −f(x) mirrors every point in the x-axis, 2f(x) doubles every height', () => {
    const { u, ox } = M.TRANS
    expect(M.transShift(2)).toBe(1); expect(M.transShift(0)).toBe(5); expect(M.transReflect(3)).toBe(-9); expect(M.transStretch(1)).toBe(2)
    for (const x of [-2, -0.5, 1.3, 2.6]) { expect(M.transShift(x + 2)).toBeCloseTo(M.transBase(x) + 1, 12); expect(M.transReflect(x)).toBe(-M.transBase(x)); expect(M.transStretch(x)).toBe(2 * M.transBase(x)) }   // the three rules
    const s = M.buildTransformationsFunctionsScene()
    const back = (p: number[]) => [(p[0] - ox) / u, p[1] / u]
    const base = paths(s, INK)[0], shifted = paths(s, BLUE)[0], refl = paths(s, RED)[0], stretch = paths(s, GREEN)[0]
    for (const p of base.points!) { const [x, y] = back(p); expect(Math.abs(y - x * x)).toBeLessThan(0.08) }
    for (const p of shifted.points!) { const [x, y] = back(p); expect(Math.abs(y - ((x - 2) ** 2 + 1))).toBeLessThan(0.08) }
    for (const p of stretch.points!) { const [x, y] = back(p); expect(Math.abs(y - 2 * x * x)).toBeLessThan(0.12) }
    base.points!.forEach((p, i) => { expect(refl.points![i][0]).toBeCloseTo(p[0], 2); expect(refl.points![i][1]).toBeCloseTo(-p[1], 2) })      // same x, opposite height
    const v = back(dots(s, BLUE)[0].position!); expect(v[0]).toBeCloseTo(2, 1); expect(v[1]).toBeCloseTo(1, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = x²', 'f(x − 2) + 1', '−f(x)', '2f(x)']))
  })

  it('Polynomial: (x + 2)(x − 1)(x − 3) = x³ − 2x² − 5x + 6 has roots −2, 1, 3, y-intercept 6 and exactly two turning points (max ≈ 8.2, min ≈ −4.1)', () => {
    const { roots, ux, uy, mid } = M.POLY
    for (const x of [-3, -1.5, 0, 0.7, 2.2, 5]) expect(M.polyP(x)).toBeCloseTo(M.polyExpanded(x), 10)
    for (const r of roots) expect(M.polyP(r)).toBeCloseTo(0, 12); expect(M.polyP(0)).toBe(6)
    const [t1, t2] = M.polyTurning()
    expect(M.polyDerivative(t1)).toBeCloseTo(0, 10); expect(M.polyDerivative(t2)).toBeCloseTo(0, 10)
    expect(t1).toBeCloseTo(-0.7863, 3); expect(t2).toBeCloseTo(2.1196, 3)
    expect(M.polyP(t1)).toBeCloseTo(8.2, 1); expect(M.polyP(t2)).toBeCloseTo(-4.06, 2)
    const grid = Array.from({ length: 2000 }, (_, i) => -3 + i * 0.004); let flips = 0
    for (let i = 2; i < grid.length; i++) if (Math.sign(M.polyDerivative(grid[i])) !== Math.sign(M.polyDerivative(grid[i - 1]))) flips++
    expect(flips).toBe(2); expect(flips).toBeLessThanOrEqual(3 - 1)                                                                          // at most degree − 1 turning points
    const s = M.buildPolynomialFunctionScene()
    const cv = paths(s, INK)[0].points!
    for (const p of cv) { const x = p[0] / ux + mid; expect(Math.abs(p[1] / uy - M.polyP(x))).toBeLessThan(0.3) }
    let turns = 0; const steps = cv.slice(1).map((q, i) => q[1] - cv[i][1]).filter((d) => Math.abs(d) > 1e-9); for (let i = 1; i < steps.length; i++) if (Math.sign(steps[i]) !== Math.sign(steps[i - 1])) turns++
    expect(turns).toBe(2)                                                                                                                   // the drawn curve turns twice
    const rootsDrawn = dots(s, GREEN).map((d) => d.position![0] / ux + mid).sort((a, b) => a - b)
    expect(rootsDrawn).toEqual([-2, 1, 3].map((v) => expect.closeTo(v, 1))); for (const d of dots(s, GREEN)) expect(d.position![1]).toBeCloseTo(0, 2)
    const ic = dots(s, BLUE)[0]; expect(ic.position![0] / ux + mid).toBeCloseTo(0, 1); expect(ic.position![1] / uy).toBeCloseTo(6, 1)
    const tp = dots(s, RED).sort((a, b) => a.position![0] - b.position![0]); expect(tp).toHaveLength(2)
    expect(tp[0].position![1] / uy).toBeCloseTo(8.2, 0); expect(tp[1].position![1] / uy).toBeCloseTo(-4.06, 0)
    expect(texts(s)).toEqual(expect.arrayContaining(['p(0) = 6', 'roots −2, 1, 3', 'max ≈ 8.2', 'min ≈ −4.1', 'degree 3: ≤ 3 roots, ≤ 2 turns']))
  })

  it('End behaviour: the left/right signs follow aₙ(−1)ⁿ and aₙ in all four panels, read from the drawn curve ends and arrows', () => {
    const { panels, xmax } = M.ENDB
    for (const [a, n] of [[1, 2], [-1, 2], [1, 3], [-1, 3], [2, 4], [-3, 5], [0.5, 6], [-2, 7]]) {
      const [l, r] = M.endSigns(a, n)
      expect(l).toBe(Math.sign(a * (-1000) ** n)); expect(r).toBe(Math.sign(a * 1000 ** n))                                                  // numerically far out
      if (n % 2 === 0) expect(l).toBe(r); else expect(l).toBe(-r)                                                                           // even: ends match, odd: opposite
    }
    const s = M.buildEndBehaviorScene()
    const curves = [...paths(s, BLUE), ...paths(s, RED)]; expect(curves).toHaveLength(4)
    const arrs = arrows(s, VIOLET); expect(arrs).toHaveLength(8)
    for (const pn of panels) {
      const cv = curves.find((c) => near(extent(c).cx, pn.c[0], 0.01) && near(extent(c).cy, pn.c[1], 1.2) && (c.color === BLUE) === (pn.a > 0))!
      expect(cv, `panel ${pn.a} x^${pn.n}`).toBeTruthy()
      const first = cv.points![0], last = cv.points![cv.points!.length - 1]
      const [l, r] = M.endSigns(pn.a, pn.n)
      expect(Math.sign(first[1] - pn.c[1])).toBe(l); expect(Math.sign(last[1] - pn.c[1])).toBe(r)                                           // the drawn ends agree with the rule
      expect(first[0]).toBeCloseTo(pn.c[0] - xmax * M.ENDB.ux, 1)
      for (const [p, sg] of [[first, l], [last, r]] as Array<[number[], number]>) {
        const a = arrs.find((ar) => near(ar.from![0], p[0], 0.15) && near(ar.from![1], p[1], 0.01))!
        expect(a, 'an arrow at each end').toBeTruthy(); expect(Math.sign(a.to![1] - a.from![1])).toBe(sg)                                    // pointing the way the curve is going
      }
    }
    expect(texts(s)).toEqual(expect.arrayContaining(['x²', '−x²', 'x³', '−x³', 'even n: ends match', 'odd n: ends opposite']))
  })

  it('Rational function: x = 3 is a vertical asymptote (numerator 10 ≠ 0), x = 1 a hole (f → −1.5), zero at −2, horizontal asymptote y = 1', () => {
    const { ux, uy, mid, holeGap } = M.RAT
    expect(M.ratDenominator(3)).toBe(0); expect(M.ratNumerator(3)).toBe(10)                                                                   // pole: bottom 0, top not
    expect(M.ratDenominator(1)).toBeCloseTo(0, 12); expect(M.ratNumerator(1)).toBeCloseTo(0, 12)                                                                   // both zero: a common factor, a hole
    expect(M.ratNumerator(-2)).toBeCloseTo(0, 12); expect(M.ratDenominator(-2)).not.toBe(0)
    for (const x of [-3, 0, 2, 5, 9]) expect(M.ratF(x)).toBeCloseTo(M.ratNumerator(x) / M.ratDenominator(x), 12)                             // the cancelled form is the same function
    expect(M.ratF(1 - 1e-7)).toBeCloseTo(-1.5, 5); expect(M.ratF(1 + 1e-7)).toBeCloseTo(-1.5, 5); expect(M.ratHole()).toEqual([1, -1.5])
    expect(Math.abs(M.ratF(3 + 1e-6))).toBeGreaterThan(1e6)
    for (const x of [1e4, -1e4, 1e6, -1e6]) expect(M.ratF(x)).toBeCloseTo(1, 2)
    const s = M.buildRationalFunctionScene()
    const branches = paths(s, INK); expect(branches).toHaveLength(3)
    for (const b of branches) for (const p of b.points!) { const x = p[0] / ux + mid; expect(Math.abs(p[1] / uy - M.ratF(x))).toBeLessThan(0.12); expect(Math.abs(x - 3)).toBeGreaterThan(0.7); expect(Math.abs(x - 1)).toBeGreaterThan(holeGap - 0.05) }   // no curve at the pole or the hole
    const hole = extent(paths(s, RED)[0]); expect(hole.cx / ux + mid).toBeCloseTo(1, 1); expect(hole.cy / uy).toBeCloseTo(-1.5, 1)
    const va = bonds(s, VIOLET, 0.03)[0]; expect(va.from![0] / ux + mid).toBeCloseTo(3, 2); expect(va.from![0]).toBeCloseTo(va.to![0], 3)
    const ha = bonds(s, BLUE, 0.03)[0]; expect(ha.from![1] / uy).toBeCloseTo(1, 1); expect(ha.to![1]).toBeCloseTo(ha.from![1], 3)
    const z = dots(s, GREEN)[0]; expect(z.position![0] / ux + mid).toBeCloseTo(-2, 1); expect(z.position![1]).toBeCloseTo(0, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['vertical asymptote x = 3', 'hole at x = 1', 'zero x = −2', 'horizontal asymptote y = 1']))
  })

  it('Vertical asymptote: 1/(x − 2) has numerator 1 and denominator 0 at 2; heights 2, 5, 10 from the right and −2, −5, −10 from the left; |f| grows without bound', () => {
    const { ux, uy, a, right, left } = M.VA
    expect(a - 2).toBe(0); expect(M.vaF(2.5)).toBeCloseTo(2, 12); expect(M.vaF(2.2)).toBeCloseTo(5, 12); expect(M.vaF(2.1)).toBeCloseTo(10, 12)
    expect(M.vaF(1.5)).toBeCloseTo(-2, 12); expect(M.vaF(1.8)).toBeCloseTo(-5, 12); expect(M.vaF(1.9)).toBeCloseTo(-10, 12)
    for (const e of [1e-2, 1e-4, 1e-6]) { expect(M.vaF(2 + e) * e).toBeCloseTo(1, 6); expect(M.vaF(2 - e) * e).toBeCloseTo(-1, 6) }           // → ±∞
    const s = M.buildVerticalAsymptoteScene()
    const branches = paths(s, INK); expect(branches).toHaveLength(2)
    for (const b of branches) for (const p of b.points!) { const x = p[0] / ux + a; expect(Math.abs(p[1] / uy - M.vaF(x))).toBeLessThan(0.7); expect(Math.abs(x - 2)).toBeGreaterThan(0.05) }
    const hr = dots(s, BLUE), hl = dots(s, RED); expect([hr.length, hl.length]).toEqual([3, 3])
    hr.forEach((d, i) => { expect(d.position![0] / ux + a).toBeCloseTo(right[i], 1); expect(d.position![1] / uy).toBeCloseTo(M.vaF(right[i]), 1) })
    hl.forEach((d, i) => { expect(d.position![0] / ux + a).toBeCloseTo(left[i], 1); expect(d.position![1] / uy).toBeCloseTo(M.vaF(left[i]), 1) })
    expect(hr.map((d) => d.position![1])).toEqual([...hr.map((d) => d.position![1])].sort((p, q) => p - q))                                      // climbing as x nears 2
    const va = bonds(s, VIOLET, 0.03)[0]; expect(va.from![0]).toBeCloseTo(0, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['x = 2', 'x → 2⁺: f → +∞', 'x → 2⁻: f → −∞']))
  })

  it('Horizontal asymptote: (2x² + 1)/(x² + 1) = 2 − 1/(x² + 1) → 2, and 4/(x² + 1) → 0; f(4) ≈ 1.94 and f(6) ≈ 1.97 close in on 2', () => {
    const { u, uy, probes } = M.HA
    for (const x of [-5, -1, 0, 0.3, 2, 8]) expect(M.haF(x)).toBeCloseTo(2 - 1 / (x * x + 1), 12)                                              // exact identity: the gap to 2 is 1/(x² + 1)
    expect(M.haF(1e6)).toBeCloseTo(2, 9); expect(M.haF(-1e6)).toBeCloseTo(2, 9); expect(M.haG(1e6)).toBeCloseTo(0, 9)
    expect(M.haF(4)).toBeCloseTo(33 / 17, 12); expect(M.haF(6)).toBeCloseTo(73 / 37, 12)
    expect(2 - M.haF(6)).toBeLessThan(2 - M.haF(4)); expect(2 - M.haF(4)).toBeLessThan(2 - M.haF(0))                                          // ever closer
    const s = M.buildHorizontalAsymptoteScene()
    const back = (p: number[]) => [p[0] / u, (p[1] + 1.2) / uy]
    for (const p of paths(s, BLUE)[0].points!) { const [x, y] = back(p); expect(Math.abs(y - M.haF(x))).toBeLessThan(0.05) }
    for (const p of paths(s, RED)[0].points!) { const [x, y] = back(p); expect(Math.abs(y - M.haG(x))).toBeLessThan(0.08) }
    const dash = bonds(s, VIOLET, 0.03)[0]; expect(back(dash.from!)[1]).toBeCloseTo(2, 2); expect(dash.to![1]).toBeCloseTo(dash.from![1], 3)
    const pd = dots(s, GREEN); expect(pd).toHaveLength(2)
    pd.forEach((d, i) => { const [x, y] = back(d.position!); expect(x).toBeCloseTo(probes[i], 1); expect(y).toBeCloseTo(M.haF(probes[i]), 1) })
    expect(texts(s)).toEqual(expect.arrayContaining(['deg p = deg q: y = 2/1 = 2', 'deg p < deg q: y = 0', 'f(4) ≈ 1.94, f(6) ≈ 1.97']))
  })

  it('Piecewise: −x, x², 6 − x agree at the breakpoints (0 = 0, 4 = 4) so f is continuous; 7 − x would jump from 4 to 5 at x = 2', () => {
    const { u, mid, midY } = M.PIECE
    expect([M.pieceF(-3), M.pieceF(-0.0001), M.pieceF(0), M.pieceF(1), M.pieceF(2), M.pieceF(4)].map((v) => Math.round(v * 1000) / 1000)).toEqual([3, 0, 0, 1, 4, 2])
    expect(M.pieceF(-1e-9)).toBeCloseTo(0, 6); expect(M.pieceF(1e-9)).toBeCloseTo(0, 6)                                                       // continuous at 0
    expect(M.pieceF(2 - 1e-9)).toBeCloseTo(4, 6); expect(M.pieceF(2)).toBe(4)                                                               // and at 2
    expect(M.pieceBad(2)).toBe(5); expect(M.pieceBad(2) - M.pieceF(2)).toBe(1)                                                             // the mismatch
    const s = M.buildPiecewiseFunctionScene()
    const back = (p: number[]) => [p[0] / u + mid, p[1] / u + midY]
    const l1 = bonds(s, BLUE, 0.06)[0], l3 = bonds(s, RED, 0.06)[0], bad = bonds(s, RED, 0.04)[0], parab = paths(s, GREEN)[0].points!
    expect(slope(l1)).toBeCloseTo(-1, 1); expect(slope(l3)).toBeCloseTo(-1, 1); expect(slope(bad)).toBeCloseTo(-1, 1)
    const a = back(l1.from!), b = back(l1.to!); expect(a).toEqual([-3, 3].map((v) => expect.closeTo(v, 1))); expect(b[0]).toBeCloseTo(0, 1); expect(b[1]).toBeCloseTo(0, 1)
    for (const p of parab) { const [x, y] = back(p); expect(Math.abs(y - x * x)).toBeLessThan(0.05) }
    const pStart = back(parab[0]), pEnd = back(parab[parab.length - 1]); expect(pStart[0]).toBeCloseTo(b[0], 1); expect(pStart[1]).toBeCloseTo(b[1], 1)   // piece 1 meets piece 2
    const c1 = back(l3.from!); expect(c1[0]).toBeCloseTo(pEnd[0], 1); expect(c1[1]).toBeCloseTo(pEnd[1], 1); expect(c1[1]).toBeCloseTo(4, 1)    // piece 2 meets piece 3
    const bf = back(bad.from!); expect(bf[0]).toBeCloseTo(2, 1); expect(bf[1]).toBeCloseTo(5, 1)
    const kinks = dots(s, INK).map((d) => back(d.position!)); expect(kinks).toHaveLength(2)
    expect(kinks.map((k) => k[1]).sort()).toEqual([0, 4].map((v) => expect.closeTo(v, 1)))
    expect(texts(s)).toEqual(expect.arrayContaining(['−x', 'x²', '6 − x', '0 = 0', '4 = 4', '7 − x: jump at x = 2']))
  })

  it('Monotonic: (x³ + 3x)/4 only rises, its negative only falls, x³ − 3x rises then falls then rises (so repeats heights)', () => {
    const { centres, ux, uy, probes } = M.MONO
    const grid = Array.from({ length: 300 }, (_, i) => -2.2 + i * 0.015)
    for (let i = 1; i < grid.length; i++) { expect(M.monoInc(grid[i])).toBeGreaterThan(M.monoInc(grid[i - 1])); expect(M.monoDec(grid[i])).toBeLessThan(M.monoDec(grid[i - 1])) }
    expect(new Set(grid.map((x) => Math.round(M.monoInc(x) * 1e9))).size).toBe(grid.length)                                                  // strictly monotonic: no repeated height
    expect(M.monoNeither(0)).toBeCloseTo(M.monoNeither(Math.sqrt(3)), 12); expect(M.monoNeither(0)).toBeCloseTo(M.monoNeither(-Math.sqrt(3)), 12)   // h repeats a height: not injective
    const [a, b] = probes.inc
    expect(M.monoInc(a)).toBeLessThan(M.monoInc(b)); expect(M.monoDec(a)).toBeGreaterThan(M.monoDec(b))
    expect([M.monoNeither(-2), M.monoNeither(-1), M.monoNeither(1)]).toEqual([-2, 2, -2])                                                    // up, then down
    const s = M.buildMonotonicFunctionScene()
    const ys = (p: Obj) => p.points!.map((q) => q[1])
    const inc = paths(s, BLUE)[0], dec = paths(s, RED)[0], neither = paths(s, INK)[0]
    const diffs = (v: number[]) => v.slice(1).map((y, i) => y - v[i])
    expect(diffs(ys(inc)).every((d) => d >= 0)).toBe(true); expect(ys(inc)[ys(inc).length - 1] - ys(inc)[0]).toBeGreaterThan(2)
    expect(diffs(ys(dec)).every((d) => d <= 0)).toBe(true); expect(ys(dec)[0] - ys(dec)[ys(dec).length - 1]).toBeGreaterThan(2)
    let flips = 0; const dn = diffs(ys(neither)).filter((d) => Math.abs(d) > 1e-9); for (let i = 1; i < dn.length; i++) if (Math.sign(dn[i]) !== Math.sign(dn[i - 1])) flips++
    expect(flips).toBe(2)                                                                                                                    // rises, falls, rises
    for (const p of inc.points!) expect(Math.abs(p[1] / uy - M.monoInc((p[0] - centres[0]) / ux))).toBeLessThan(0.1)
    for (const p of neither.points!) expect(Math.abs(p[1] / uy - M.monoNeither((p[0] - centres[2]) / ux))).toBeLessThan(0.2)
    const bl = dots(s, BLUE).sort((p, q) => p.position![0] - q.position![0]), rd = dots(s, RED).sort((p, q) => p.position![0] - q.position![0])
    expect(bl[0].position![1]).toBeLessThan(bl[1].position![1]); expect(rd[0].position![1]).toBeGreaterThan(rd[1].position![1])           // left lower than right / left higher than right
    const up = bonds(s, GREEN, 0.05)[0], down = bonds(s, RED, 0.05)[0]; expect(slope(up)).toBeGreaterThan(0); expect(slope(down)).toBeLessThan(0)
    expect(texts(s)).toEqual(expect.arrayContaining(['increasing', 'decreasing', 'rises then falls', 'strictly monotonic ⇒ injective']))
  })
})
