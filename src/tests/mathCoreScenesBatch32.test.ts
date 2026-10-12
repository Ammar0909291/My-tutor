/**
 * Mathematics visual campaign, batch 32 (2026-10-12): the rest of the linear-algebra helpers (augmented matrix, rank, inverse, vector space, dimension, matrix of a linear map, diagonalization, spectral theorem, inner product, Cauchy–Schwarz, QR, singular values, tensor). Every number a figure states is re-derived here from the
 * DRAWN dots, numerals, lines, arrows and curves, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB32'

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
  ['math.linalg.augmented-matrix', M.buildAugmentedMatrixScene, 'math-augmented-matrix'],
  ['math.linalg.rank', M.buildRankScene, 'math-rank'],
  ['math.linalg.matrix-inverse', M.buildMatrixInverseScene, 'math-matrix-inverse'],
  ['math.linalg.vector-space', M.buildVectorSpaceScene, 'math-vector-space'],
  ['math.linalg.dimension', M.buildDimensionScene, 'math-dimension'],
  ['math.linalg.matrix-representation', M.buildMatrixRepresentationScene, 'math-matrix-representation'],
  ['math.linalg.diagonalization', M.buildDiagonalizationScene, 'math-diagonalization'],
  ['math.linalg.spectral-theorem', M.buildSpectralTheoremScene, 'math-spectral-theorem'],
  ['math.linalg.inner-product', M.buildInnerProductScene, 'math-inner-product'],
  ['math.linalg.inner-product-space', M.buildInnerProductSpaceScene, 'math-inner-product-space'],
  ['math.linalg.qr-factorization', M.buildQrFactorizationScene, 'math-qr-factorization'],
  ['math.linalg.singular-values', M.buildSingularValuesScene, 'math-singular-values'],
  ['math.linalg.tensor', M.buildTensorScene, 'math-tensor'],
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


// ── helpers ────────────────────────────────────────────────────────────────────────────────
const dist = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const labelAt = (s: SceneSpec, p: readonly number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const numsIn = (t: string) => (t.replace(/−/g, '-').match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
const numOf = (t: string) => Number(t.replace(/−/g, '-'))
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  let acc = Number(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = Number(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
/** the numeral grid of a matrix as drawn: g[i][j] = the label at mAt(spec, i, j) */
const gridLabels = (s: SceneSpec, spec: M.MSpec, rows: number, cols: number) => Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => { const l = labelAt(s, M.mAt(spec, i, j)); expect(l, `entry ${i},${j}`).toBeTruthy(); return l! }))
const numGrid = (s: SceneSpec, spec: M.MSpec, rows: number, cols: number) => gridLabels(s, spec, rows, cols).map((r) => r.map((l) => numOf(l.text!)))
const matMul = (A: number[][], B: number[][]) => A.map((row) => B[0].map((_, j) => row.reduce((t, v, k) => t + v * B[k][j], 0)))
const closeVec = (a: readonly number[], b: readonly number[], tol = 0.02) => { expect(a).toHaveLength(b.length); a.forEach((x, i) => expect(Math.abs(x - b[i]), `${a} vs ${b}`).toBeLessThanOrEqual(tol)) }
const closeMat = (A: number[][], B: number[][], tol = 0.02) => A.forEach((row, i) => closeVec(row, B[i], tol))
/** a drawn arrow as the vector it shows, in world units of the figure (origin o, scale s) */
const vecOf = (a: Obj, o: readonly number[], s: number): [number, number] => [(a.to![0] - o[0]) / s, (a.to![1] - o[1]) / s]
const startsAt = (a: Obj, p: readonly number[]) => dist(a.from!, p) < 0.02
const arrowsFrom = (sc: SceneSpec, color: string, o: readonly number[]) => arrows(sc, color).filter((a) => startsAt(a, o))
const rankOf = (m: number[][]) => { const A = m.map((r) => [...r]); let r = 0; for (let c = 0; c < A[0].length && r < A.length; c++) { let p = r; for (let i = r + 1; i < A.length; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i; if (Math.abs(A[p][c]) < 1e-9) continue; [A[r], A[p]] = [A[p], A[r]]; for (let i = r + 1; i < A.length; i++) { const f = A[i][c] / A[r][c]; for (let k = c; k < A[0].length; k++) A[i][k] -= f * A[r][k] } r++ } return r }
const det2 = (A: number[][]) => A[0][0] * A[1][1] - A[0][1] * A[1][0]
const mulVec = (A: number[][], v: readonly number[]) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]
/** the numeral colours of a matrix as drawn */
const colorsOf = (s: SceneSpec, spec: M.MSpec, rows: number, cols: number) => gridLabels(s, spec, rows, cols).map((r) => r.map((l) => l.color))

describe('the mathematics each figure draws', () => {
  it('math.linalg.augmented-matrix: [A | b] is read off the equations and R2 − R1 keeps the solution (2, 1)', () => {
    const s = M.buildAugmentedMatrixScene()
    const M1 = numGrid(s, M.AUG.m1, 2, 3), M2 = numGrid(s, M.AUG.m2, 2, 3)
    // the drawn equations "x + y = 3", "x − y = 1" are the rows of the first matrix
    for (let i = 0; i < 2; i++) {
      const eq = labelAt(s, [M.AUG.eqX, M.mAt(M.AUG.m1, i, 0)[1]])!.text!
      const m = /^x ([+−]) y = (−?\d+)$/.exec(eq)
      expect(m, eq).toBeTruthy()
      expect([1, m![1] === '+' ? 1 : -1, numOf(m![2])]).toEqual(M1[i])
    }
    // the b column (right of the violet bar) is green, the coefficients are ink
    for (const spec of [M.AUG.m1, M.AUG.m2]) {
      colorsOf(s, spec, 2, 3).forEach((row) => { expect(row[0]).toBe(INK); expect(row[1]).toBe(INK); expect(row[2]).toBe(GREEN) })
      const [a, b] = M.augBar(spec)
      expect(bonds(s, VIOLET, 0.04).some((o) => near(o.from![0], a[0], 0.01) && near(o.to![0], b[0], 0.01) && near(o.from![1], a[1], 0.01) && near(o.to![1], b[1], 0.01))).toBe(true)
      // the bar sits between column 2 and column 3
      expect(a[0]).toBeGreaterThan(M.mAt(spec, 0, 1)[0])
      expect(a[0]).toBeLessThan(M.mAt(spec, 0, 2)[0])
    }
    // R2 − R1: row 1 unchanged, row 2 minus row 1
    expect(M2[0]).toEqual(M1[0])
    expect(M2[1]).toEqual(M1[1].map((v, k) => v - M1[0][k]))
    // back-substitution on the drawn second matrix gives the drawn solution, which solves both matrices
    const y = M2[1][2] / M2[1][1], x = M2[0][2] - M2[0][1] * y
    const caption = labelAt(s, [M.AUG.eqX, M.mAt(M.AUG.m2, 0, 0)[1] - 0.4])!.text!
    expect(numsIn(caption)).toEqual([x, y])
    expect([x, y]).toEqual([2, 1])
    for (const m of [M1, M2]) for (const row of m) expect(row[0] * x + row[1] * y).toBeCloseTo(row[2], 9)
    expect(det2([[M1[0][0], M1[0][1]], [M1[1][0], M1[1][1]]])).not.toBe(0)
    // the row-operation arrow runs straight down from the first matrix to the second
    const down = arrows(s, VIOLET).find((a) => Math.abs(a.from![0] - a.to![0]) < 0.001)!
    expect(down.from![1]).toBeGreaterThan(M.mAt(M.AUG.m2, 0, 0)[1])
    expect(down.to![1]).toBeLessThan(M.mAt(M.AUG.m1, 1, 0)[1])
    expect(down.to![1]).toBeLessThan(down.from![1])
  })

  it('math.linalg.rank: two pivots after row reduction of the drawn matrix, so rank 2', () => {
    const s = M.buildRankScene()
    const A = numGrid(s, M.RNK.mA, 3, 3), R = numGrid(s, M.RNK.mR, 3, 3)
    expect(rankOf(A)).toBe(2)
    // row 2 = 2 × row 1 (the caption), and exactly those two rows are drawn red
    expect(A[1]).toEqual(A[0].map((v) => 2 * v))
    const colA = colorsOf(s, M.RNK.mA, 3, 3)
    colA.forEach((row, i) => row.forEach((c) => expect(c).toBe(i < 2 ? RED : INK)))
    expect(numsIn(labelAt(s, [M.RNK.mA.cx, -1.4])!.text!)).toEqual([2, 2, 1])
    // the drawn echelon form really is row-equivalent to A: R1 = row 1, R2 = row 3 − row 1, R3 = row 2 − 2 row 1
    expect(R[0]).toEqual(A[0])
    expect(R[1].map((v) => v + 0)).toEqual(A[2].map((v, k) => v - A[0][k]))
    expect(R[2].map((v) => v + 0)).toEqual(A[1].map((v, k) => v - 2 * A[0][k]))
    // echelon: pivot columns strictly increase and the zero row is last
    const lead = R.map((row) => row.findIndex((v) => v !== 0))
    expect(lead).toEqual([0, 1, -1])
    // the green numerals are exactly the pivots
    const colR = colorsOf(s, M.RNK.mR, 3, 3)
    const greens: Array<[number, number]> = []
    colR.forEach((row, i) => row.forEach((c, j) => { if (c === GREEN) greens.push([i, j]) }))
    expect(greens).toEqual([[0, 0], [1, 1]])
    expect(greens.map(([i, j]) => R[i][j])).toEqual([1, -2])
    colR[2].forEach((c) => expect(c).toBe(SLATE))
    // "2 pivots" and "rank = 2" are the number of green pivots and the computed rank
    expect(numsIn(labelAt(s, [M.RNK.mR.cx, -1.4])!.text!)).toEqual([greens.length])
    expect(numsIn(labelAt(s, [M.RNK.mR.cx, -2.2])!.text!)).toEqual([rankOf(A)])
    expect(rankOf(R)).toBe(rankOf(A))
  })

  it('math.linalg.matrix-inverse: the drawn A and A⁻¹ multiply to the drawn I, and det A = 1', () => {
    const s = M.buildMatrixInverseScene()
    const A = numGrid(s, M.invSpec(0), 2, 2), Ai = numGrid(s, M.invSpec(1), 2, 2), I = numGrid(s, M.invSpec(2), 2, 2)
    const d = det2(A)
    expect(d).toBe(1)
    expect(numsIn(labelAt(s, [M.INV.cx[0], 2.0])!.text!)).toEqual([d])
    // the inverse formula (1/det)[[d, −b], [−c, a]] reproduces the drawn A⁻¹
    closeMat(Ai, [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]])
    closeMat(matMul(A, Ai), I)
    closeMat(matMul(Ai, A), I)
    closeMat(I, [[1, 0], [0, 1]])
    colorsOf(s, M.invSpec(2), 2, 2).forEach((row, i) => row.forEach((c, j) => expect(c).toBe(i === j ? GREEN : SLATE)))
    colorsOf(s, M.invSpec(1), 2, 2).forEach((row) => row.forEach((c) => expect(c).toBe(BLUE)))
    // the operators sit between the matrices, in order: A × A⁻¹ = I
    const times = labelAt(s, [(M.INV.cx[0] + M.INV.cx[1]) / 2, M.INV.cy])!, eq = labelAt(s, [(M.INV.cx[1] + M.INV.cx[2]) / 2, M.INV.cy])!
    expect([times.text, eq.text]).toEqual(['×', '='])
    expect(labelAt(s, [M.INV.cx[1], -2.2])!.text).toBe('A A⁻¹ = I')
  })

  it('math.linalg.vector-space: sums, doubles and negatives of the drawn vectors are the drawn vectors', () => {
    const s = M.buildVectorSpaceScene()
    const o = M.VSP.o, k = M.VSP.s
    const u = vecOf(arrowsFrom(s, RED, o)[0], o, k), v = vecOf(arrowsFrom(s, BLUE, o)[0], o, k), w = vecOf(arrowsFrom(s, GREEN, o)[0], o, k)
    closeVec(u, [1, 2]); closeVec(v, [2, 1])
    closeVec(w, [u[0] + v[0], u[1] + v[1]])
    // the dashed parallelogram sides are v and u translated to the tips
    const sides = bonds(s, VIOLET, 0.03)
    expect(sides).toHaveLength(2)
    for (const side of sides) {
      const d = [(side.to![0] - side.from![0]) / k, (side.to![1] - side.from![1]) / k]
      const fromU = dist(side.from!, [o[0] + k * u[0], o[1] + k * u[1]]) < 0.02
      closeVec(d, fromU ? v : u)
      closeVec([(side.to![0] - o[0]) / k, (side.to![1] - o[1]) / k], w)
    }
    // scalar multiples: 2u (same direction) and −u (opposite direction)
    const va = arrowsFrom(s, VIOLET, o).map((a) => vecOf(a, o, k))
    expect(va).toHaveLength(2)
    const dbl = va.find((x) => dotp(x, u) > 0)!, neg = va.find((x) => dotp(x, u) < 0)!
    closeVec(dbl, [2 * u[0], 2 * u[1]]); closeVec(neg, [-u[0], -u[1]])
    closeVec([u[0] + neg[0], u[1] + neg[1]], [0, 0])
    // every vector shown starts at the one zero vector, drawn where the axes cross
    const [ax, ay] = arrows(s, SLATE)
    expect(near(ay.from![0], o[0], 0.001) && near(ax.from![1], o[1], 0.001)).toBe(true)
    expect(labelsOf(s).some((l) => l.text === '0')).toBe(true)
    for (const t of ['closed under addition', 'closed under scalars', 'V = ℝ²']) expect(texts(s)).toContain(t)
  })

  it('math.linalg.dimension: 2 basis arrows for the plane, 1 for each perpendicular line, 1 + 1 = 2', () => {
    const s = M.buildDimensionScene()
    const o = M.DIM.o, k = M.DIM.s
    const reds = arrowsFrom(s, RED, o).map((a) => vecOf(a, o, k)), blues = arrowsFrom(s, BLUE, o).map((a) => vecOf(a, o, k)), greens = arrowsFrom(s, GREEN, o).map((a) => vecOf(a, o, k))
    expect(reds).toHaveLength(2); expect(blues).toHaveLength(1); expect(greens).toHaveLength(1)
    // the two red arrows are independent (determinant ≠ 0) unit vectors along the axes
    expect(Math.abs(crossz(reds[0], reds[1]))).toBeGreaterThan(0.5)
    reds.forEach((r) => expect(Math.hypot(r[0], r[1])).toBeCloseTo(1, 1))
    expect(dotp(reds[0], reds[1])).toBeCloseTo(0, 1)
    const [u, w] = [blues[0], greens[0]]
    closeVec(u, [2, 1]); closeVec(w, [-1, 2])
    expect(dotp(u, w)).toBeCloseTo(0, 1)
    // U and U⊥ are lines through the origin along u and w
    for (const [color, d] of [[BLUE, u], [GREEN, w]] as const) {
      const line = bonds(s, color, 0.04)[0]
      expect(Math.abs(crossz([line.to![0] - line.from![0], line.to![1] - line.from![1]], d))).toBeLessThan(0.02)
      expect(distToLine(line, o)).toBeLessThan(0.01)
    }
    // the right-angle mark sits at the origin
    const mark = bonds(s, VIOLET, 0.03)
    expect(mark).toHaveLength(2)
    mark.forEach((m) => expect(Math.min(dist(m.from!, o), dist(m.to!, o))).toBeLessThan(0.5))
    // the captions are the counts of the drawn basis arrows
    const cap = (t: string) => numsIn(labelsOf(s).find((l) => l.text!.startsWith(t))!.text!).pop()!
    expect(cap('dim ℝ²')).toBe(reds.length)
    expect(cap('dim U =')).toBe(blues.length)
    expect(cap('dim U⊥')).toBe(greens.length)
    expect(cap('dim U =') + cap('dim U⊥')).toBe(cap('dim ℝ²'))
    expect(evalLR('1 + 1 = 2')).toBe(2)
    expect(texts(s)).toContain('1 + 1 = 2')
  })

  it('math.linalg.matrix-representation: the columns of A are the drawn images T(e₁), T(e₂), and T(v) = A v', () => {
    const s = M.buildMatrixRepresentationScene()
    const o = M.REP.o, k = M.REP.s
    const A = numGrid(s, M.REP.m, 2, 2)
    closeMat(A, [[1, -1], [1, 1]])
    const grey = arrowsFrom(s, SLATE, o).map((a) => vecOf(a, o, k))
    expect(grey).toHaveLength(3)
    const e = grey.filter((g) => Math.hypot(g[0], g[1]) < 1.1)
    expect(e).toHaveLength(2)
    const e1 = e.find((g) => Math.abs(g[0]) > 0.5)!, e2 = e.find((g) => Math.abs(g[1]) > 0.5)!
    closeVec(e1, [1, 0]); closeVec(e2, [0, 1])
    const v = grey.find((g) => Math.hypot(g[0], g[1]) > 1.1)!
    closeVec(v, [2, 1])
    // T(e₁), T(e₂) are the red and blue arrows and equal the columns of the drawn matrix
    const t1 = vecOf(arrowsFrom(s, RED, o)[0], o, k), t2 = vecOf(arrowsFrom(s, BLUE, o)[0], o, k)
    closeVec(t1, [A[0][0], A[1][0]]); closeVec(t2, [A[0][1], A[1][1]])
    expect(colorsOf(s, M.REP.m, 2, 2)).toEqual([[RED, BLUE], [RED, BLUE]])
    // T(v) = v₁ T(e₁) + v₂ T(e₂) = A v, drawn in green
    const tv = vecOf(arrowsFrom(s, GREEN, o)[0], o, k)
    closeVec(tv, [v[0] * t1[0] + v[1] * t2[0], v[0] * t1[1] + v[1] * t2[1]])
    closeVec(tv, mulVec(A, v))
    closeVec(tv, [1, 3])
    expect(numsIn(labelAt(s, [M.REP.m.cx, -1.2])!.text!)).toEqual(v.map(Math.round))
    expect(numsIn(labelAt(s, [M.REP.m.cx, -2.0])!.text!)).toEqual(tv.map(Math.round))
  })

  it('math.linalg.diagonalization: A v = λ v for both drawn eigenvectors, D = diag(λ), A = P D P⁻¹', () => {
    const s = M.buildDiagonalizationScene()
    const o = M.DGN.o, k = M.DGN.s
    const A = numGrid(s, M.DGN.mA, 2, 2), D = numGrid(s, M.DGN.mD, 2, 2)
    const reds = arrowsFrom(s, RED, o), blues = arrows(s, BLUE)
    expect(reds).toHaveLength(2); expect(blues).toHaveLength(2)
    const lambdas: number[] = []
    const P: number[][] = [[0, 0], [0, 0]]
    reds.forEach((r, c) => {
      const v = vecOf(r, o, k)
      const img = vecOf(blues.find((b) => dist(b.from!, r.to!) < 0.02)!, o, k)
      // A v = image, and the image is a multiple λ of v
      closeVec(mulVec(A, v), img)
      const lam = Math.hypot(img[0], img[1]) / Math.hypot(v[0], v[1])
      expect(Math.abs(crossz(v, img))).toBeLessThan(0.02)
      expect(dotp(v, img)).toBeGreaterThan(0)
      lambdas.push(Math.round(lam * 100) / 100)
      P[0][c] = v[0]; P[1][c] = v[1]
    })
    expect(lambdas.sort((a, b) => b - a)).toEqual([3, 2])
    // the captions ×3 and ×2 are the stretch factors
    expect(texts(s)).toEqual(expect.arrayContaining(['×3', '×2']))
    // D is the diagonal matrix of the factors, and P D P⁻¹ gives back the drawn A
    closeMat(D, [[3, 0], [0, 2]])
    const dP = det2(P)
    expect(Math.abs(dP)).toBeGreaterThan(0.5)
    const Pinv = [[P[1][1] / dP, -P[0][1] / dP], [-P[1][0] / dP, P[0][0] / dP]]
    // the columns of P are in the order of the drawn eigenvalues 3, 2
    const lamOrdered = reds.map((r) => { const v = vecOf(r, o, k); const b = blues.find((b2) => dist(b2.from!, r.to!) < 0.02)!; return Math.hypot(...vecOf(b, o, k)) / Math.hypot(v[0], v[1]) })
    closeMat(matMul(matMul(P, [[lamOrdered[0], 0], [0, lamOrdered[1]]]), Pinv), A)
    expect(texts(s)).toContain('A = P D P⁻¹')
  })

  it('math.linalg.spectral-theorem: symmetric A, orthogonal eigenvectors, the ellipse is A applied to the circle', () => {
    const s = M.buildSpectralTheoremScene()
    const c = M.SPT.c, k = M.SPT.s
    const A = numGrid(s, M.SPT.m, 2, 2)
    expect(A[0][1]).toBe(A[1][0])
    const tr = A[0][0] + A[1][1], dt = det2(A)
    const disc = Math.sqrt(tr * tr / 4 - dt)
    const eig = [tr / 2 + disc, tr / 2 - disc]
    expect(eig).toEqual([3, 1])
    // the drawn eigenvectors are unit, perpendicular, and A scales each by its eigenvalue
    const v1 = vecOf(arrowsFrom(s, RED, c)[0], c, k), v2 = vecOf(arrowsFrom(s, BLUE, c)[0], c, k)
    expect(Math.hypot(...v1)).toBeCloseTo(1, 1); expect(Math.hypot(...v2)).toBeCloseTo(1, 1)
    expect(dotp(v1, v2)).toBeCloseTo(0, 2)
    closeVec(mulVec(A, v1), [eig[0] * v1[0], eig[0] * v1[1]], 0.03)
    closeVec(mulVec(A, v2), [eig[1] * v2[0], eig[1] * v2[1]], 0.03)
    // the right-angle mark at the centre
    const mark = bonds(s, VIOLET, 0.03)
    expect(mark).toHaveLength(2)
    // the ellipse is the image of the circle point by point
    const circle = paths(s, SLATE)[0].points!, ell = paths(s, GREEN)[0].points!
    expect(circle).toHaveLength(ell.length)
    circle.forEach((p, i) => {
      closeVec([(ell[i][0] - c[0]) / k, (ell[i][1] - c[1]) / k], mulVec(A, [(p[0] - c[0]) / k, (p[1] - c[1]) / k]), 0.04)
      expect(Math.hypot(p[0] - c[0], p[1] - c[1])).toBeCloseTo(k, 1)
    })
    // semi-axes 3 and 1 (in units of the circle's radius), the long one along the red eigenvector
    const radii = ell.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1]) / k)
    expect(Math.max(...radii)).toBeCloseTo(3, 1)
    expect(Math.min(...radii)).toBeCloseTo(1, 1)
    const far = ell[radii.indexOf(Math.max(...radii))]
    expect(Math.abs(crossz([(far[0] - c[0]) / k, (far[1] - c[1]) / k], v1))).toBeLessThan(0.15)
    expect(texts(s)).toEqual(expect.arrayContaining(['×3', '×1', 'A = Q Λ Qᵀ']))
  })

  it('math.linalg.inner-product: u · v = 5 from the components, from |u||v|cos θ (θ = 45°), and the projection is 0.5 u', () => {
    const s = M.buildInnerProductScene()
    const o = M.INP.o, k = M.INP.s
    const u = vecOf(arrowsFrom(s, RED, o)[0], o, k), v = vecOf(arrowsFrom(s, BLUE, o)[0], o, k)
    closeVec(u, [3, 1]); closeVec(v, [1, 2])
    const d = dotp(u, v)
    expect(d).toBeCloseTo(5, 1)
    // the three component captions
    const cap = (t: string) => labelsOf(s).find((l) => l.text === t)!
    expect(evalLR(cap('3 × 1 = 3').text!)).toBe(numsIn(cap('3 × 1 = 3').text!).pop())
    expect(evalLR(cap('1 × 2 = 2').text!)).toBe(2)
    expect(evalLR(cap('3 + 2 = 5').text!)).toBe(5)
    expect([Math.round(u[0] * v[0]), Math.round(u[1] * v[1])]).toEqual([3, 2])
    expect(numsIn(cap('u · v = 5').text!)).toEqual([Math.round(d)])
    // the angle between the arrows is the 45° stated, and |u||v|cos θ = u · v
    const theta = Math.acos(d / (Math.hypot(...u) * Math.hypot(...v)))
    expect((theta * 180) / Math.PI).toBeCloseTo(numsIn(labelsOf(s).find((l) => l.text!.startsWith('θ'))!.text!)[0], 1)
    expect(Math.hypot(...u) * Math.hypot(...v) * Math.cos(theta)).toBeCloseTo(d, 6)
    // the green arc runs from the direction of u to the direction of v at a constant radius
    const arc = paths(s, GREEN)[0].points!
    arc.forEach((p) => expect(dist(p, o)).toBeCloseTo(M.INP.arcR, 1))
    const ang = (p: number[]) => (Math.atan2(p[1] - o[1], p[0] - o[0]) * 180) / Math.PI
    expect(ang(arc[0])).toBeCloseTo((Math.atan2(u[1], u[0]) * 180) / Math.PI, 0)
    expect(ang(arc[arc.length - 1])).toBeCloseTo((Math.atan2(v[1], v[0]) * 180) / Math.PI, 0)
    // the projection foot is (u·v / u·u) u, the violet drop is perpendicular to u
    const foot = dots(s, GREEN)[0].position!
    const f = d / dotp(u, u)
    closeVec([(foot[0] - o[0]) / k, (foot[1] - o[1]) / k], [f * u[0], f * u[1]])
    expect(f).toBeCloseTo(0.5, 2)
    const drop = bonds(s, VIOLET, 0.04)[0]
    expect(dotp([drop.to![0] - drop.from![0], drop.to![1] - drop.from![1]], u)).toBeCloseTo(0, 1)
    expect(dist(drop.from!, [o[0] + k * v[0], o[1] + k * v[1]]) < 0.02 || dist(drop.to!, [o[0] + k * v[0], o[1] + k * v[1]]) < 0.02).toBe(true)
    expect(bonds(s, VIOLET, 0.03)).toHaveLength(2)
  })

  it('math.linalg.inner-product-space: |⟨u, v⟩| ≤ |u||v| with the drawn bars in the true ratio, and equality for 2u', () => {
    const s = M.buildInnerProductSpaceScene()
    const o = M.IPS.o, k = M.IPS.s
    const u = vecOf(arrowsFrom(s, RED, o)[0], o, k), v = vecOf(arrowsFrom(s, BLUE, o)[0], o, k), v2 = vecOf(arrowsFrom(s, VIOLET, o)[0], o, k)
    closeVec(u, [3, 4]); closeVec(v, [4, 3]); closeVec(v2, [6, 8])
    const nrm = (x: readonly number[]) => Math.hypot(x[0], x[1])
    const cap = (t: string) => labelsOf(s).find((l) => l.text === t)!
    expect(numsIn(cap('|u| = 5').text!)).toEqual([Math.round(nrm(u))])
    expect(numsIn(cap('|v| = 5').text!)).toEqual([Math.round(nrm(v))])
    expect(numsIn(cap('⟨u, v⟩ = 24').text!)).toEqual([Math.round(dotp(u, v))])
    // the drawn bars are horizontal bonds of thickness 0.16: blue = |u||v|, green = |⟨u, v⟩|; rows A (v) then B (2u)
    const blue = bonds(s, BLUE, 0.16).map((b) => b.to![0] - b.from![0]), green = bonds(s, GREEN, 0.16).map((b) => b.to![0] - b.from![0])
    expect(blue).toHaveLength(2); expect(green).toHaveLength(2)
    const pairs: Array<[number[], number[]]> = [[u, v], [u, v2]]
    pairs.forEach(([p, q], i) => {
      const prod = nrm(p) * nrm(q), ip = Math.abs(dotp(p, q))
      expect(ip).toBeLessThanOrEqual(prod + 1e-9)
      expect(green[i] / blue[i]).toBeCloseTo(ip / prod, 2)
    })
    // generic pair: strictly shorter; parallel pair: equal bars and cross product 0
    expect(green[0]).toBeLessThan(blue[0])
    expect(green[1]).toBeCloseTo(blue[1], 6)
    expect(Math.abs(crossz(u, v2))).toBeLessThan(0.05)
    expect(Math.abs(crossz(u, v))).toBeGreaterThan(1)
    // the numerals on the bars are the products and inner products of the drawn vectors
    const at = (x: number, y: number) => labelAt(s, [x, y])!.text
    const bar = (i: number) => bonds(s, BLUE, 0.16)[i]
    expect(numOf(at(bar(0).to![0] + 0.55 - 0.0, bar(0).from![1])!)).toBe(Math.round(nrm(u) * nrm(v)))
    expect(numOf(labelsOf(s).find((l) => dist(l.position!, [bonds(s, GREEN, 0.16)[0].to![0] + 0.55, bonds(s, GREEN, 0.16)[0].from![1]]) < 0.06)!.text!)).toBe(Math.round(Math.abs(dotp(u, v))))
    expect(numOf(at(bar(1).to![0] + 0.55, bar(1).from![1])!)).toBe(Math.round(nrm(u) * nrm(v2)))
    expect(numOf(labelsOf(s).find((l) => dist(l.position!, [bonds(s, GREEN, 0.16)[1].to![0] + 0.55, bonds(s, GREEN, 0.16)[1].from![1]]) < 0.06)!.text!)).toBe(Math.round(Math.abs(dotp(u, v2))))
    expect(texts(s)).toContain('24 ≤ 25')
    expect(evalLR('5 × 10 = 50')).toBe(50)
  })

  it('math.linalg.qr-factorization: Gram–Schmidt on the drawn columns gives the drawn Q and R, and Q R = A', () => {
    const s = M.buildQrFactorizationScene()
    const o = M.QRF.o, k = M.QRF.s
    const A = numGrid(s, M.QRF.mA, 2, 2), R = numGrid(s, M.QRF.mR, 2, 2)
    const a1 = vecOf(arrowsFrom(s, RED, o)[0], o, k), a2 = vecOf(arrowsFrom(s, BLUE, o)[0], o, k)
    // the drawn arrows are the columns of the drawn A
    closeVec(a1, [A[0][0], A[1][0]]); closeVec(a2, [A[0][1], A[1][1]])
    const qs = arrowsFrom(s, GREEN, o).map((a) => vecOf(a, o, k))
    expect(qs).toHaveLength(2)
    const q1 = qs.find((q) => dotp(q, a1) > 0)!, q2 = qs.find((q) => q !== q1)!
    // Gram–Schmidt from scratch
    const n1 = Math.hypot(...a1), q1g = [a1[0] / n1, a1[1] / n1]
    const r12 = dotp(a2, q1g)
    const rest = [a2[0] - r12 * q1g[0], a2[1] - r12 * q1g[1]]
    const r22 = Math.hypot(...rest), q2g = [rest[0] / r22, rest[1] / r22]
    closeVec(q1, q1g, 0.03); closeVec(q2, q2g, 0.03)
    closeMat(R, [[n1, r12], [0, r22]])
    expect(R[1][0]).toBe(0)
    // Q R = A with Q built from the drawn unit arrows, and Q is orthogonal
    const Q = [[q1[0], q2[0]], [q1[1], q2[1]]]
    closeMat(matMul(Q, R), A, 0.04)
    expect(dotp(q1, q2)).toBeCloseTo(0, 2)
    expect(Math.hypot(...q1)).toBeCloseTo(1, 2); expect(Math.hypot(...q2)).toBeCloseTo(1, 2)
    // the violet drop ends on the line of a₁ at (a₂ · q₁) q₁ and the leftover is r₂₂ q₂
    const drop = bonds(s, VIOLET, 0.04)[0]
    const foot = [o[0] + k * r12 * q1g[0], o[1] + k * r12 * q1g[1]]
    expect(dist(drop.to!, foot) < 0.03 || dist(drop.from!, foot) < 0.03).toBe(true)
    closeVec([rest[0], rest[1]], [r22 * q2[0], r22 * q2[1]], 0.04)
    // the captions state the entries of R
    const cap = (t: string) => labelsOf(s).find((l) => l.text!.startsWith(t))!
    expect(numsIn(cap('5 = |a').text!)[0]).toBe(Math.round(R[0][0]))
    expect(numsIn(cap('2 = a').text!)[0]).toBe(Math.round(R[0][1]))
    expect(numsIn(cap('1 = rest').text!)[0]).toBe(Math.round(R[1][1]))
    expect(texts(s)).toContain('A = QR')
    colorsOf(s, M.QRF.mA, 2, 2).forEach((row) => expect(row).toEqual([RED, BLUE]))
  })

  it('math.linalg.singular-values: AᵀA = diag(9, 1) from the drawn A, and the ellipse axes are σ = 3 and 1', () => {
    const s = M.buildSingularValuesScene()
    const c = M.SGV.c, k = M.SGV.s
    const A = numGrid(s, M.SGV.m, 2, 2)
    closeMat(A, [[1.8, -0.8], [2.4, 0.6]], 0.001)
    // AᵀA computed from the drawn matrix
    const At = [[A[0][0], A[1][0]], [A[0][1], A[1][1]]]
    const AtA = matMul(At, A)
    closeMat(AtA, [[9, 0], [0, 1]], 1e-9)
    const tr = AtA[0][0] + AtA[1][1], dt = det2(AtA), disc = Math.sqrt(tr * tr / 4 - dt)
    const sig = [Math.sqrt(tr / 2 + disc), Math.sqrt(tr / 2 - disc)]
    expect(sig).toEqual([3, 1])
    const cap = (t: string) => labelsOf(s).find((l) => l.text!.startsWith(t))!.text!
    expect(numsIn(cap('σ₁'))).toEqual([sig[0]]); expect(numsIn(cap('σ₂'))).toEqual([sig[1]])
    expect(numsIn(cap('AᵀA'))).toEqual([AtA[0][0], AtA[1][1]])
    // e₁, e₂ (unit arrows) and their images A e₁, A e₂ (the red and blue arrows that are not unit-axis)
    const reds = arrowsFrom(s, RED, c).map((a) => vecOf(a, c, k)), blues = arrowsFrom(s, BLUE, c).map((a) => vecOf(a, c, k))
    expect(reds).toHaveLength(2); expect(blues).toHaveLength(2)
    const e1 = reds.find((r) => Math.hypot(...r) < 1.1)!, Ae1 = reds.find((r) => Math.hypot(...r) > 1.1)!
    const e2 = blues.find((b) => Math.abs(b[0]) < 0.05)!, Ae2 = blues.find((b) => Math.abs(b[0]) >= 0.05)!
    closeVec(e1, [1, 0]); closeVec(e2, [0, 1])
    closeVec(Ae1, mulVec(A, e1)); closeVec(Ae2, mulVec(A, e2))
    expect(Math.hypot(...Ae1)).toBeCloseTo(sig[0], 2); expect(Math.hypot(...Ae2)).toBeCloseTo(sig[1], 2)
    expect(dotp(Ae1, Ae2)).toBeCloseTo(0, 2)
    // the ellipse is the image of the circle, with semi-axes σ₁ and σ₂
    const circle = paths(s, SLATE)[0].points!, ell = paths(s, GREEN)[0].points!
    circle.forEach((p, i) => closeVec([(ell[i][0] - c[0]) / k, (ell[i][1] - c[1]) / k], mulVec(A, [(p[0] - c[0]) / k, (p[1] - c[1]) / k]), 0.04))
    const radii = ell.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1]) / k)
    expect(Math.max(...radii)).toBeCloseTo(sig[0], 1); expect(Math.min(...radii)).toBeCloseTo(sig[1], 1)
    const far = ell[radii.indexOf(Math.max(...radii))]
    expect(Math.abs(crossz([(far[0] - c[0]) / k, (far[1] - c[1]) / k], Ae1))).toBeLessThan(0.1)
  })

  it('math.linalg.tensor: every entry of the drawn array is u_i v_j, aligned with its row and column, and the rank is 1', () => {
    const s = M.buildTensorScene()
    const u = numGrid(s, M.TEN.uCol, 2, 1).map((r) => r[0]), v = numGrid(s, M.TEN.vRow, 1, 2)[0], T = numGrid(s, M.TEN.prod, 2, 2)
    expect(u).toEqual([1, 2]); expect(v).toEqual([3, 4])
    T.forEach((row, i) => row.forEach((x, j) => {
      expect(x).toBe(u[i] * v[j])
      // each product sits under its v-entry and level with its u-entry, like a multiplication table
      const l = labelAt(s, M.mAt(M.TEN.prod, i, j))!, vl = labelAt(s, M.mAt(M.TEN.vRow, 0, j))!, ul = labelAt(s, M.mAt(M.TEN.uCol, i, 0))!
      expect(near(l.position![0], vl.position![0], 0.005)).toBe(true)
      expect(near(l.position![1], ul.position![1], 0.005)).toBe(true)
    }))
    // rank 1: det = 0 and the second row is a multiple of the first, as the captions state
    expect(det2(T)).toBe(0)
    expect(rankOf(T)).toBe(1)
    expect(T[1]).toEqual(T[0].map((x) => 2 * x))
    expect(texts(s)).toEqual(expect.arrayContaining(['u ⊗ v', 'rank 1', 'row 2 = 2 × row 1']))
    expect(numsIn(labelsOf(s).find((l) => l.text === 'rank 1')!.text!)).toEqual([rankOf(T)])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'row 2 = 2 × row 1')!.text!)).toEqual([2, 2, 1])
    colorsOf(s, M.TEN.uCol, 2, 1).forEach((r) => expect(r[0]).toBe(RED))
    expect(colorsOf(s, M.TEN.vRow, 1, 2)[0]).toEqual([BLUE, BLUE])
    colorsOf(s, M.TEN.prod, 2, 2).forEach((r) => expect(r).toEqual([GREEN, GREEN]))
  })
})
