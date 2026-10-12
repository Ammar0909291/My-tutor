/**
 * Mathematics visual campaign, batch 14 (2026-10-12): eleven more linear-algebra concepts and the geometric
 * sequence. Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped back to
 * vectors, lines and areas and compared with an independent calculation — not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB14'
import { applyMat, dotv, norm } from '@/lib/teaching/sceneGenerators/mathCoreScenesB13'

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
const disp = (o: Obj, u: number): [number, number] => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
const crossz = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]
const dotp = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
const approx = (v: readonly number[], tol = 1) => v.map((x) => expect.closeTo(x, tol))
const slope = (o: Obj) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])
/** Distance from point p to the infinite line through a drawn segment. */
const distToLine = (o: Obj, p: number[]) => Math.abs(crossz([o.to![0] - o.from![0], o.to![1] - o.from![1]], [p[0] - o.from![0], p[1] - o.from![1]])) / len(o)
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.linalg.dot-product', M.buildLinalgDotProductScene, 'math-linalg-dot-product'],
  ['math.linalg.cross-product', M.buildLinalgCrossProductScene, 'math-linalg-cross-product'],
  ['math.linalg.row-reduction', M.buildRowReductionScene, 'math-row-reduction'],
  ['math.linalg.subspace', M.buildSubspaceScene, 'math-subspace'],
  ['math.linalg.null-space', M.buildNullSpaceScene, 'math-null-space'],
  ['math.linalg.column-space', M.buildColumnSpaceScene, 'math-column-space'],
  ['math.linalg.kernel-image', M.buildKernelImageScene, 'math-kernel-image'],
  ['math.linalg.eigenspace', M.buildEigenspaceScene, 'math-eigenspace'],
  ['math.linalg.orthogonal-basis', M.buildOrthogonalBasisScene, 'math-orthogonal-basis'],
  ['math.linalg.least-squares', M.buildLeastSquaresScene, 'math-least-squares'],
  ['math.linalg.svd', M.buildSvdScene, 'math-svd'],
  ['math.seq.geometric-sequence', M.buildGeometricSequenceScene, 'math-geometric-sequence'],
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
  it('Dot product: 2·4 + (−1)·2 + 3·1 = 8 − 2 + 3 = 9 = |a||b| cos θ (θ = 58.34° ≈ 58.3°); the drawn product bars add to 9', () => {
    const { a, b, ua, up, xa, xb, xp, xt } = M.DOTL
    const prods = a.map((v, i) => v * b[i])
    expect(prods).toEqual([8, -2, 3]); expect(M.dotN(a, b)).toBe(9); expect(M.normN(a)).toBeCloseTo(Math.sqrt(14), 12); expect(M.normN(b)).toBeCloseTo(Math.sqrt(21), 12)
    expect(M.normN(a) * M.normN(b) * Math.cos((M.angleN(a, b) * Math.PI) / 180)).toBeCloseTo(9, 10); expect(M.angleN(a, b)).toBeCloseTo(58.34, 2); expect(M.angleN(a, b).toFixed(1)).toBe("58.3")
    expect(M.dotN([1, 2, 0], [2, -1, 5])).toBe(0)                                                                                              // zero ⇔ orthogonal (an example)
    const s = M.buildLinalgDotProductScene()
    const signedBars = (color: string, xs: readonly number[], scaleH: number) => xs.map((x) => { const b2 = lines(s, color).find((o) => o.type === 'bond' && near(o.from![0], x, 0.001)); return b2 ? (b2.to![1] - b2.from![1]) / scaleH : 0 })
    expect(signedBars(BLUE, xa, ua)).toEqual(approx(a)); expect(signedBars(RED, xb, ua)).toEqual(approx(b))
    const prodDrawn = xp.map((x) => { const b2 = lines(s).find((o) => o.type === 'bond' && o.thickness === 0.14 && near(o.from![0], x, 0.001) && (o.color === GREEN || o.color === RED))!; return (b2.to![1] - b2.from![1]) / up })
    expect(prodDrawn).toEqual(approx(prods))
    const neg = lines(s, RED).find((o) => near(o.from![0], xp[1], 0.001))!; expect(neg.to![1]).toBeLessThan(0)                                    // the negative product points down
    const total = lines(s, GREEN).find((o) => o.type === 'bond' && near(o.from![0], xt, 0.001))!
    expect((total.to![1] - total.from![1]) / up).toBeCloseTo(sum(prodDrawn), 0); expect((total.to![1] - total.from![1]) / up).toBeCloseTo(9, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['a·b = 8 − 2 + 3 = 9', 'θ ≈ 58.3°', 'products']))
  })

  it('Cross product: a × b = (0, 0, 4) is perpendicular to a = (2, 0, 0) and b = (1, 2, 0), has length 4 = area, and b × a = −(a × b)', () => {
    const { a, b, k, u } = M.CROSSL
    const c = M.cross3(a, b), cr = M.cross3(b, a)
    expect(c).toEqual([0, 0, 4]); expect(cr).toEqual([0, 0, -4].map((v) => expect.closeTo(v, 12)))
    expect(M.dotN(c, a)).toBe(0); expect(M.dotN(c, b)).toBe(0)                                                                                 // perpendicular to both
    expect(M.normN(c)).toBeCloseTo(M.normN(a) * M.normN(b) * Math.sin((M.angleN(a, b) * Math.PI) / 180), 12)                                    // |a||b| sin θ
    expect(Math.abs(a[0] * b[1] - a[1] * b[0])).toBe(4)                                                                                         // parallelogram area
    const s = M.buildLinalgCrossProductScene()
    const decodeFloor = (o: Obj) => { const dx = o.to![0] - o.from![0], dy = o.to![1] - o.from![1]; const x = -dy / (k * u), y = dx / u + k * x; return [x, y, 0] }   // a floor vector (z = 0)
    const da = decodeFloor(arrows(s, BLUE)[0]), db = decodeFloor(arrows(s, RED)[0])
    expect(da).toEqual(approx(a)); expect(db).toEqual(approx(b))
    const up = arrows(s, GREEN)[0], down = arrows(s, VIOLET)[0]
    expect((up.to![0] - up.from![0])).toBeCloseTo(0, 2); expect((up.to![1] - up.from![1]) / u).toBeCloseTo(4, 1)                                 // straight up, length 4 (x = y = 0)
    expect((down.to![0] - down.from![0])).toBeCloseTo(0, 2); expect((down.to![1] - down.from![1]) / u).toBeCloseTo(-4, 1)
    expect(M.cross3(da as [number, number, number], db as [number, number, number])[2]).toBeCloseTo(4, 1)                                       // decoded a × b has the drawn length
    expect(texts(s)).toEqual(expect.arrayContaining(['a × b = (0, 0, 4)', 'length 4 = area', 'b × a = (0, 0, −4)']))
  })

  it('Row reduction: every row-operation line passes through the solution (2, 1); R₁ − 2R₂ = (0 3 | 3), ÷3 gives y = 1, then x = 2', () => {
    const { lines: ls, sol, u } = M.ROWR
    for (const { a, b, c } of ls) expect(a * sol[0] + b * sol[1]).toBe(c)                                                                      // each equation holds at (2, 1)
    expect([2 - 2 * 1, 1 - 2 * -1, 5 - 2 * 1]).toEqual([0, 3, 3]); expect([0 / 3, 3 / 3, 3 / 3]).toEqual([0, 1, 1]); expect([1 + 0, -1 + 1, 1 + 1]).toEqual([1, 0, 2])   // R₁ − 2R₂, ÷3, R₂ + R₁
    const solve = (p: { a: number; b: number; c: number }, q: { a: number; b: number; c: number }) => { const d = p.a * q.b - p.b * q.a; return [(p.c * q.b - p.b * q.c) / d, (p.a * q.c - p.c * q.a) / d] }
    expect(solve(ls[0], ls[1])).toEqual([2, 1]); expect(solve(ls[2], ls[1])).toEqual([2, 1]); expect(solve(ls[2], ls[3])).toEqual([2, 1])       // equivalent systems, one solution
    const s = M.buildRowReductionScene()
    const l1 = bonds(s, BLUE, 0.05)[0], l2 = bonds(s, RED, 0.05)[0], l3 = bonds(s, GREEN, 0.06)[0], l4 = bonds(s, VIOLET, 0.06)[0]
    const origin = [0, 0]                                                                                                                       // the solution is drawn at the screen origin
    for (const l of [l1, l2, l3, l4]) expect(distToLine(l, origin)).toBeLessThan(0.02)                                                           // all four lines pass through it
    expect(slope(l1)).toBeCloseTo(-2, 1); expect(slope(l2)).toBeCloseTo(1, 1); expect(Math.abs(slope(l3))).toBeLessThan(0.01); expect(Math.abs(l4.to![0] - l4.from![0])).toBeLessThan(0.01)
    const dot0 = dots(s, GREEN)[0]; expect(dot0.position![0]).toBeCloseTo(0, 2); expect(dot0.position![1]).toBeCloseTo(0, 2); expect(u).toBe(0.8)
    expect(texts(s)).toEqual(expect.arrayContaining(['row 1: (2 1 | 5)', 'row 2: (1 −1 | 1)', 'solution (2, 1)', 'R₁ − 2R₂, ÷3: (0 1 | 1)', 'R₂ + R₁: (1 0 | 2)']))
  })

  it('Subspace: the line through 0 is closed under +, scaling and contains 0; the shifted line misses 0 and p + q = (2, 3) leaves it', () => {
    const { shift, u, p, s: sc, ox, oy } = M.SUBSP
    for (const pt of [[2, 1], [-4, -2], [-2, -1], [4, 2], [0, 0]] as Array<[number, number]>) expect(M.onLine(pt, 0)).toBe(true)
    for (let c = -3; c <= 3; c += 0.5) { expect(M.onLine([2 * c, 1 * c], 0)).toBe(true); expect(M.onLine([-4 * c + 2, -2 * c + 1], 0)).toBe(true) }   // multiples and sums stay on y = x/2
    expect(M.onLine([0, 0], shift)).toBe(false); expect(M.onLine(p[0], shift)).toBe(true); expect(M.onLine(p[1], shift)).toBe(true); expect(M.onLine([2, 3], shift)).toBe(false)
    const s = M.buildSubspaceScene()
    const origin = [ox, oy]
    const w = bonds(s, BLUE, 0.04)[0], sh = bonds(s, RED, 0.04)[0]
    expect(slope(w)).toBeCloseTo(0.5, 2); expect(slope(sh)).toBeCloseTo(0.5, 2); expect(distToLine(w, origin)).toBeLessThan(0.02); expect(distToLine(sh, origin)).toBeGreaterThan(0.5)   // only W passes through 0
    const vs = arrows(s, VIOLET).map((a) => ({ a, d: disp(a, sc) }))
    const v = vs.find((x) => near(x.d[0], -4, 0.1))!, pq = vs.find((x) => near(x.d[0], 2, 0.1))!
    expect(v.d).toEqual(approx([-4, -2])); expect(pq.d).toEqual(approx([2, 3]))
    const sumArrow = arrows(s, GREEN)[0]; expect(disp(sumArrow, sc)).toEqual(approx([-2, -1]))                                                  // u + v
    expect(distToLine(w, sumArrow.to!)).toBeLessThan(0.03)                                                                                       // ... stays in W
    expect(distToLine(sh, pq.a.to!)).toBeGreaterThan(0.3)                                                                                         // p + q leaves the shifted line
    expect(texts(s)).toEqual(expect.arrayContaining(['u + v stays in W', 'contains 0', 'p + q leaves the line', 'line through 0: subspace', 'shifted line: not a subspace']))
  })

  it('Null space: A(−2, 1) = 0 along the line x + 2y = 0; A(1, 1) = (3, 6); all solutions of Ax = (3, 6) form the parallel line (1, 1) + N(A)', () => {
    const { nullDir, b, probe, u, ox } = M.NULLS
    expect(M.mulA(nullDir)).toEqual([0, 0]); expect(M.mulA(probe)).toEqual([3, 6]); expect(dotp([1, 2], nullDir)).toBe(0)                             // N(A) ⟂ the row (1, 2)
    for (let c = -3; c <= 3; c += 0.5) { const z = M.mulA([c * nullDir[0], c * nullDir[1]]); expect(z[0]).toBeCloseTo(0, 12); expect(z[1]).toBeCloseTo(0, 12); const x = [probe[0] + c * nullDir[0], probe[1] + c * nullDir[1]] as const; const y = M.mulA(x); expect(y[0]).toBeCloseTo(b[0], 12); expect(y[1]).toBeCloseTo(b[1], 12) }   // x_p + N(A) solves Ax = b
    expect(M.mulA([1, 0])).toEqual([1, 2]); expect(M.mulA([0, 1])).toEqual([2, 4])
    const s = M.buildNullSpaceScene()
    const nl = bonds(s, BLUE, 0.05)[0], sl = bonds(s, RED, 0.04)[0]
    expect(slope(nl)).toBeCloseTo(-0.5, 2); expect(slope(sl)).toBeCloseTo(-0.5, 2)                                                                // parallel
    expect(distToLine(nl, [ox, 0])).toBeLessThan(0.02)                                                                                           // N(A) through the origin
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(nullDir)); expect(disp(arrows(s, RED)[0], u)).toEqual(approx(probe))
    const pt = dots(s, RED)[0]; expect(distToLine(sl, pt.position!)).toBeLessThan(0.02)                                                           // the particular solution is on the solution line
    expect([(pt.position![0] - ox) / u, pt.position![1] / u]).toEqual(approx(probe))
    for (const d of dots(s, BLUE)) expect(distToLine(nl, d.position!)).toBeLessThan(0.02)                                                         // sample null vectors lie on it
    expect(texts(s)).toEqual(expect.arrayContaining(['N(A): Ax = 0', 'A(1, 1) = (3, 6) ≠ 0', 'all solutions of Ax = b', 'xₚ + N(A)']))
  })

  it('Column space: the columns (1, 1), (2, 2) span only the line y = x; b = (3, 3) is reachable (x = (1, 1)), b′ = (1, 0) is not', () => {
    const { A, cols, b, bBad, u, ox, oy } = M.COLS
    expect(crossz(cols[0], cols[1])).toBe(0)
    const Ax = (x: number, y: number) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y]
    expect(Ax(1, 1)).toEqual([3, 3]); expect(Ax(3, 0)).toEqual([3, 3])
    for (let x = -3; x <= 3; x += 0.5) for (let y = -3; y <= 3; y += 0.5) { const o = Ax(x, y); expect(o[0]).toBe(o[1]); expect(o).not.toEqual([1, 0]) }   // every output is (t, t): (1, 0) is never reached
    const s = M.buildColumnSpaceScene()
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(cols[0])); expect(disp(arrows(s, RED)[0], u)).toEqual(approx(cols[1]))
    const ln = bonds(s, VIOLET, 0.04)[0]; expect(slope(ln)).toBeCloseTo(1, 2)
    const good = dots(s, GREEN)[0]; expect([(good.position![0] - ox) / u, (good.position![1] - oy) / u]).toEqual(approx(b)); expect(distToLine(ln, good.position!)).toBeLessThan(0.02)   // b is on the line
    const e = extent(paths(s, RED)[0]); expect([(e.cx - ox) / u, (e.cy - oy) / u]).toEqual(approx(bBad)); expect(distToLine(ln, [e.cx, e.cy])).toBeGreaterThan(0.3)                       // b′ is off it
    expect(texts(s)).toEqual(expect.arrayContaining(['column 1', 'column 2', 'C(A): the line y = x', 'b = (3, 3): solvable', 'b′ = (1, 0): no solution']))
  })

  it('Kernel and image: T(x, y) = (x + y, 2x + 2y) kills the line x + y = 0, its image is the line along (1, 2), and each input line x + y = c maps to (c, 2c)', () => {
    const { cx, u, levels } = M.KERIM
    expect(M.applyK([1, -1])).toEqual([0, 0]); expect(M.applyK([5, -5])).toEqual([0, 0]); expect(M.applyK([1, 0])).toEqual(M.applyK([0, 1])); expect(M.applyK([1, 0])).toEqual([1, 2])   // not injective
    for (const c of levels) for (const x of [-2, 0, 1.5]) expect(M.applyK([x, c - x])).toEqual([c, 2 * c].map((v) => expect.closeTo(v, 12)))              // x + y = c collapses to one point
    for (let x = -3; x <= 3; x += 1) for (let y = -3; y <= 3; y += 1) { const o = M.applyK([x, y]); expect(o[1]).toBe(2 * o[0]) }                      // the image lies on y = 2x: not surjective
    const s = M.buildKernelImageScene()
    const ker = bonds(s, RED, 0.05)[0], img = bonds(s, BLUE, 0.05)[0]
    expect(slope(ker)).toBeCloseTo(-1, 2); expect(slope(img)).toBeCloseTo(2, 2)
    expect(distToLine(ker, [cx[0], 0])).toBeLessThan(0.02); expect(distToLine(img, [cx[1], 0])).toBeLessThan(0.02)                                     // both through their origins
    const kdot = dots(s, RED)[0]; expect(kdot.position![0]).toBeCloseTo(cx[1], 2); expect(kdot.position![1]).toBeCloseTo(0, 2)                           // the kernel goes to 0
    const greys = bonds(s, SLATE, 0.025), imgs = dots(s, BLUE); expect(greys).toHaveLength(3); expect(imgs).toHaveLength(3)
    for (const g of greys) {
      const mid = [((g.from![0] + g.to![0]) / 2 - cx[0]) / u, (g.from![1] + g.to![1]) / 2 / u], image = M.applyK(mid as [number, number])
      const d = imgs.find((p) => near((p.position![0] - cx[1]) / u, image[0], 0.05) && near(p.position![1] / u, image[1], 0.05))
      expect(d, `image of a point of ${mid}`).toBeTruthy()                                                                                               // the line collapses to this image point
    }
    expect(imgs.map((d) => Math.round(((d.position![0] - cx[1]) / u) * 10) / 10).sort((a, b) => a - b)).toEqual([-1, 1, 2])
    expect(texts(s)).toEqual(expect.arrayContaining(['ker T: x + y = 0', 'im T: along (1, 2)', 'input', 'output', 'kernel = line: not injective', 'image = line: not onto']))
  })

  it('Eigenspace: A(1, 1) = 3(1, 1), A(1, −1) = (1, −1) (eigenvalues 3 and 1 from det(A − λI) = 0); w = (2, 0) goes to (4, 2), not parallel', () => {
    const { e3, e1, w, u } = M.EIG
    expect(M.applyE(e3)).toEqual([3, 3]); expect(M.applyE(e1)).toEqual([1, -1]); expect(M.applyE(w)).toEqual([4, 2])
    for (const lam of [3, 1]) expect((2 - lam) * (2 - lam) - 1).toBeCloseTo(0, 12)                                                                      // det(A − λI) = 0
    expect((2 - 2) * (2 - 2) - 1).not.toBe(0)                                                                                                            // λ = 2 is not an eigenvalue
    expect(crossz(M.applyE(w), w)).not.toBe(0)                                                                                                           // w is not an eigenvector
    expect(crossz(M.applyE(e3), e3)).toBe(0); expect(crossz(M.applyE(e1), e1)).toBe(0)
    const s = M.buildEigenspaceScene()
    const g = disp(arrows(s, GREEN)[0], u), b3 = disp(arrows(s, BLUE)[0], u), r1 = disp(arrows(s, RED)[0], u), dw = disp(arrows(s, SLATE).find((a) => near(a.to![0], 1.4, 0.2))!, u), dAw = disp(arrows(s, VIOLET)[0], u)
    expect(b3).toEqual(approx(e3)); expect(r1).toEqual(approx(e1)); expect(g).toEqual(approx([3, 3])); expect(g[0] / b3[0]).toBeCloseTo(3, 1)         // tripled along the same line
    expect(Math.abs(crossz(g, b3))).toBeLessThan(0.1)
    expect(dw).toEqual(approx(w)); expect(dAw).toEqual(approx([4, 2])); expect(Math.abs(crossz(dAw, dw))).toBeGreaterThan(2)                                  // turned
    expect(slope(bonds(s, VIOLET, 0.03)[0])).toBeCloseTo(1, 2); expect(slope(bonds(s, SLATE, 0.03)[0])).toBeCloseTo(-1, 2)                                 // the two eigenspace lines y = x, y = −x
    expect(texts(s)).toEqual(expect.arrayContaining(['E₃: y = x, λ = 3', 'E₁: y = −x, λ = 1', 'w = (2, 0)', 'Aw = (4, 2): turned']))
  })

  it('Orthonormal basis: e, f have length 1 and e·f = 0; ⟨v, e⟩ = 2.83, ⟨v, f⟩ = −1.41 and v = ⟨v, e⟩e + ⟨v, f⟩f for v = (3, 1)', () => {
    const { e, f, v, u, ox, oy } = M.ONB
    expect(norm(e)).toBeCloseTo(1, 12); expect(norm(f)).toBeCloseTo(1, 12); expect(dotv(e, f)).toBeCloseTo(0, 12)
    const ce = dotv(v, e), cf = dotv(v, f)
    expect(ce).toBeCloseTo(2.8284, 4); expect(cf).toBeCloseTo(-1.4142, 4)
    expect(ce * e[0] + cf * f[0]).toBeCloseTo(3, 12); expect(ce * e[1] + cf * f[1]).toBeCloseTo(1, 12)                                                 // the expansion reproduces v
    expect(ce * ce + cf * cf).toBeCloseTo(norm(v) ** 2, 12)                                                                                              // Parseval
    const s = M.buildOrthogonalBasisScene()
    expect(disp(arrows(s, BLUE)[0], u)).toEqual(approx(e, 2)); expect(disp(arrows(s, RED)[0], u)).toEqual(approx(f, 2)); expect(disp(arrows(s, INK)[0], u)).toEqual(approx(v))
    expect(dotp(disp(arrows(s, BLUE)[0], u), disp(arrows(s, RED)[0], u))).toBeCloseTo(0, 1)
    expect(bonds(s, GREEN, 0.03)).toHaveLength(2)                                                                                                        // the right-angle mark
    const gs = bonds(s, SLATE, 0.03); expect(gs).toHaveLength(2)
    const pe = [ce * e[0], ce * e[1]], pf = [cf * f[0], cf * f[1]]
    const toE = gs.find((g) => near((g.to![0] - ox) / u, pe[0], 0.05) && near((g.to![1] - oy) / u, pe[1], 0.05))!, toF = gs.find((g) => near((g.to![0] - ox) / u, pf[0], 0.05) && near((g.to![1] - oy) / u, pf[1], 0.05))!
    expect(Math.abs(dotp(disp(toE, u), e))).toBeLessThan(0.1); expect(Math.abs(dotp(disp(toF, u), f))).toBeLessThan(0.1)                                    // the drops are perpendicular to e and to f
    const st1 = bonds(s, BLUE, 0.06)[0], st2 = bonds(s, RED, 0.06)[0]
    expect(len(st1) / u).toBeCloseTo(ce, 1); expect(len(st2) / u).toBeCloseTo(Math.abs(cf), 1); expect(dotp(disp(st2, u), f)).toBeLessThan(0)           // 2.83 along e, then 1.41 BACK along f
    const tip = dots(s, GREEN)[0]; expect([(tip.position![0] - ox) / u, (tip.position![1] - oy) / u]).toEqual(approx(v)); expect(st2.to![0]).toBeCloseTo(tip.position![0], 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['v = (3, 1)', '⟨v, e⟩ = 2.83', '⟨v, f⟩ = −1.41']))
  })

  it('Least squares: the normal equations give y = 2/3 + x/2 with residuals −1/6, 1/3, −1/6 (orthogonal to the columns of A), SSE = 1/6, better than any other line', () => {
    const { xs, ys, u, ox, oy } = M.LSQ
    const fit = M.lsqFit(xs, ys)
    expect(fit.ata).toEqual([[3, 6], [6, 14]]); expect(fit.atb).toEqual([5, 11]); expect(fit.c).toBeCloseTo(2 / 3, 12); expect(fit.m).toBeCloseTo(0.5, 12)
    const res = xs.map((x, i) => ys[i] - (fit.c + fit.m * x))
    expect(res).toEqual([-1 / 6, 1 / 3, -1 / 6].map((v) => expect.closeTo(v, 12)))
    expect(sum(res)).toBeCloseTo(0, 12); expect(sum(xs.map((x, i) => x * res[i]))).toBeCloseTo(0, 12)                                                    // Aᵀ r = 0: the error is perpendicular to the column space
    expect(fit.sse).toBeCloseTo(1 / 6, 12)
    let best = Infinity; for (let c = -1; c <= 2; c += 0.02) for (let m = -0.5; m <= 1.5; m += 0.02) best = Math.min(best, M.lsqSse(c, m))
    expect(best).toBeGreaterThanOrEqual(fit.sse - 1e-9); expect(M.lsqSse(0, 1)).toBe(1)                                                                  // the line through two points has SSE 1
    const s = M.buildLeastSquaresScene()
    const pts = dots(s, BLUE); expect(pts).toHaveLength(3)
    pts.sort((a, b) => a.position![0] - b.position![0]).forEach((d, i) => { expect((d.position![0] - ox) / u).toBeCloseTo(xs[i], 1); expect((d.position![1] - oy) / u).toBeCloseTo(ys[i], 1) })
    const fl = bonds(s, GREEN, 0.05)[0]; expect(slope(fl)).toBeCloseTo(0.5, 2)
    const lineAt = (x: number) => fl.from![1] + ((x * u + ox - fl.from![0]) * (fl.to![1] - fl.from![1])) / (fl.to![0] - fl.from![0])
    expect((lineAt(2) - oy) / u).toBeCloseTo(fit.c + 2 * fit.m, 1)
    const rs = bonds(s, RED, 0.04); expect(rs).toHaveLength(3)
    expect(rs.map((r) => Math.round((len(r) / u) * 100) / 100).sort((a, b) => a - b)).toEqual([0.17, 0.17, 0.33])
    expect(sum(rs.map((r) => (len(r) / u) ** 2))).toBeCloseTo(1 / 6, 1)
    const two = bonds(s, SLATE, 0.03)[0]; expect(slope(two)).toBeCloseTo(1, 2)
    const ringc = extent(paths(s, RED)[0]); expect([(ringc.cx - ox) / u, (ringc.cy - oy) / u]).toEqual(approx([3, 3]))                                  // where that line misses the third point's height
    expect(texts(s)).toEqual(expect.arrayContaining(['no line hits all 3', 'y = 0.67 + 0.5x', 'SSE = 0.17', 'line through 2 points: 1.00']))
  })

  it('SVD: A = [[3, 1], [1, 3]] has singular values 4 and 2; the unit circle becomes the ellipse with those semi-axes, Av₁ = 4 along the long axis', () => {
    const { A, cx, uL, uR } = M.SVD
    const [s1, s2] = M.singularValues(A)
    expect(s1).toBeCloseTo(4, 12); expect(s2).toBeCloseTo(2, 12)
    const ata = [[A[0][0] * A[0][0] + A[1][0] * A[1][0], A[0][0] * A[0][1] + A[1][0] * A[1][1]], [A[0][0] * A[0][1] + A[1][0] * A[1][1], A[0][1] * A[0][1] + A[1][1] * A[1][1]]]
    expect(ata).toEqual([[10, 6], [6, 10]]); expect(10 + 10).toBe(16 + 4); expect(10 * 10 - 36).toBe(16 * 4)                                           // eigenvalues of AᵀA are 16 and 4
    const v1: [number, number] = [Math.SQRT1_2, Math.SQRT1_2], v2: [number, number] = [Math.SQRT1_2, -Math.SQRT1_2]
    const a1 = M.applyS(v1), a2 = M.applyS(v2)
    expect(Math.hypot(...a1)).toBeCloseTo(4, 12); expect(Math.hypot(...a2)).toBeCloseTo(2, 12); expect(a1[0]).toBeCloseTo(4 * v1[0], 12); expect(a2[1]).toBeCloseTo(2 * v2[1], 12)   // A vᵢ = σᵢ uᵢ
    const s = M.buildSvdScene()
    const circle = paths(s, INK).find((p) => Math.abs(extent(p).cx - cx[0]) < 0.05)!, ell = paths(s, INK).find((p) => Math.abs(extent(p).cx - cx[1]) < 0.05)!
    for (const q of circle.points!) expect(Math.hypot((q[0] - cx[0]) / uL, q[1] / uL)).toBeCloseTo(1, 1)
    const inv = (p: number[]) => { const x = (p[0] - cx[1]) / uR, y = p[1] / uR; return [(3 * x - y) / 8, (-x + 3 * y) / 8] }                                 // A⁻¹ = (1/8)[[3, −1], [−1, 3]]
    for (const q of ell.points!) expect(Math.hypot(...inv(q))).toBeCloseTo(1, 1)                                                                          // every ellipse point is A applied to a unit vector
    const radii = ell.points!.map((q) => Math.hypot((q[0] - cx[1]) / uR, q[1] / uR))
    expect(Math.max(...radii)).toBeCloseTo(4, 1); expect(Math.min(...radii)).toBeCloseTo(2, 1)                                                           // semi-axes 4 and 2
    const farthest = ell.points![radii.indexOf(Math.max(...radii))]; expect(Math.abs(((farthest[0] - cx[1]) / uR) - ((farthest[1]) / uR))).toBeLessThan(0.3)   // along y = x
    const l1 = arrows(s, BLUE)[0], l2 = arrows(s, RED).find((a) => a.from![0] < -1)!, r1 = arrows(s, GREEN)[0], r2 = arrows(s, RED).find((a) => a.from![0] > 0)!
    expect(disp(l1, uL)).toEqual(approx(v1, 2)); expect(disp(l2, uL)).toEqual(approx(v2, 2))
    expect(Math.hypot(...disp(r1, uR))).toBeCloseTo(4, 1); expect(Math.hypot(...disp(r2, uR))).toBeCloseTo(2, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['v₁', 'v₂', 'unit circle', 'A v₁: length 4', 'A v₂: length 2', 'σ₁ = 4, σ₂ = 2']))
  })

  it('Geometric sequence: each term is the previous times r; 1, 2, 4, 8, 16 (×2), 16, 8, 4, 2, 1 (×½), 8, −4, 2, −1, 0.5 (×−½); a_n = a₁ rⁿ⁻¹', () => {
    const { panels, cx, dx, uy, n } = M.GEO
    const terms = (k: number) => Array.from({ length: n }, (_, i) => M.geoTerm(panels[k].a1, panels[k].r, i + 1))
    expect(terms(0)).toEqual([1, 2, 4, 8, 16]); expect(terms(1)).toEqual([16, 8, 4, 2, 1]); expect(terms(2)).toEqual([8, -4, 2, -1, 0.5])
    for (let k = 0; k < 3; k++) { const t = terms(k); for (let i = 1; i < n; i++) expect(t[i] / t[i - 1]).toBeCloseTo(panels[k].r, 12) }                  // constant ratio
    expect(Math.sign(terms(2)[1])).toBe(-1); expect(Math.sign(terms(2)[2])).toBe(1)                                                                      // negative ratio alternates
    expect(Math.abs(terms(1)[4])).toBeLessThan(Math.abs(terms(1)[0])); expect(Math.abs(terms(2)[4])).toBeLessThan(Math.abs(terms(2)[0]))                // |r| < 1 shrinks
    const s = M.buildGeometricSequenceScene()
    const colours = [BLUE, RED, GREEN]
    colours.forEach((col, k) => {
      const x0 = cx[k] - ((n - 1) / 2) * dx
      const drawn = Array.from({ length: n }, (_, i) => { const b = bonds(s, col, 0.08).find((o) => near(o.from![0], x0 + i * dx, 0.001))!; return (b.to![1] - b.from![1]) / uy })
      expect(drawn).toEqual(terms(k).map((t) => expect.closeTo(t, 0)))
      for (let i = 1; i < n; i++) expect(drawn[i] / drawn[i - 1]).toBeCloseTo(panels[k].r, 0)                                                            // the drawn bars keep the ratio
    })
    expect(bonds(s, SLATE, 0.03)).toHaveLength(3)
    expect(texts(s)).toEqual(expect.arrayContaining(['ratio 2: doubles', 'ratio ½: halves', 'ratio −½: alternates', '16', '0.5']))
  })
})
