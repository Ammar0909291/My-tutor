/**
 * Mathematics visual campaign, batch 40 (2026-10-13): four topology helpers, four optimisation helpers and three functional-analysis helpers. Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB40'
import { mAt } from '@/lib/teaching/sceneGenerators/mathCoreScenesB32'

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
  ['math.top.topological-space', M.buildTopologicalSpaceScene, 'math-topological-space'],
  ['math.top.product-space', M.buildProductSpaceScene, 'math-product-space'],
  ['math.top.homotopy-equivalence', M.buildHomotopyEquivalenceScene, 'math-homotopy-equivalence'],
  ['math.top.homology', M.buildHomologyScene, 'math-homology'],
  ['math.opt.convex-optimization', M.buildConvexOptimizationScene, 'math-convex-optimization'],
  ['math.opt.quadratic-programming', M.buildQuadraticProgrammingScene, 'math-quadratic-programming'],
  ['math.opt.integer-programming', M.buildIntegerProgrammingScene, 'math-integer-programming'],
  ['math.opt.dynamic-programming', M.buildDynamicProgrammingScene, 'math-dynamic-programming'],
  ['math.fnal.normed-space', M.buildNormedSpaceScene, 'math-normed-space'],
  ['math.fnal.distributions', M.buildDistributionsScene, 'math-distributions'],
  ['math.fnal.special-functions', M.buildSpecialFunctionsScene, 'math-special-functions'],
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

describe('the mathematics each figure draws', () => {
  /** drawn world coordinates → graph coordinates of a frame */
  const toG = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
  const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toG(f, p))
  const labelIn = (s: SceneSpec, start: string) => labelsOf(s).find((l) => (l.text ?? '').startsWith(start))!
  const bbox = (ls: Obj[]) => { const xs = ls.flatMap((o) => [o.from![0], o.to![0]]), ys = ls.flatMap((o) => [o.from![1], o.to![1]]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] as const }
  /** the y of a drawn polyline (graph coordinates, increasing x) at x, by linear interpolation */
  const valueAt = (g: [number, number][], x: number) => { for (let i = 1; i < g.length; i++) if (g[i][0] >= x) { const [x0, y0] = g[i - 1], [x1, y1] = g[i]; return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) } return g[g.length - 1][1] }
  const argmin = (g: [number, number][], lo: number, hi: number) => g.filter(([x]) => x >= lo && x <= hi).reduce((m, p) => (p[1] < m[1] ? p : m))

  // ── 1. topological space ───────────────────────────────────────────────────────────────────
  it('math.top.topological-space: the drawn boxes are a topology on {a, b, c} — the axioms and the counts 3, 2, 1 are re-derived from which dot lies in which box', () => {
    const s = M.buildTopologicalSpaceScene()
    const boxOf = (color: string) => { const ls = bonds(s, color, 0.05); expect(ls, color).toHaveLength(4); return bbox(ls) }
    const X = boxOf(SLATE), AB = boxOf(BLUE), A = boxOf(GREEN)
    const inside = (b: readonly number[], p: readonly number[]) => p[0] > b[0] && p[0] < b[2] && p[1] > b[1] && p[1] < b[3]
    const pts = dots(s, INK)
    expect(pts).toHaveLength(3)
    const nameOf = (d: Obj) => labelAt(s, [d.position![0] + 0.42, d.position![1]])!.text!
    const named = pts.map((d) => ({ name: nameOf(d), pos: d.position! })).sort((p, q) => p.name.localeCompare(q.name))
    expect(named.map((n) => n.name)).toEqual(['a', 'b', 'c'])
    // the open sets: each drawn box is the set of the points inside it; ∅ is always open
    const setOf = (b: readonly number[]) => named.filter((n) => inside(b, n.pos)).map((n) => n.name).join('')
    const tau = new Set(['', setOf(A), setOf(AB), setOf(X)])
    expect([...tau].sort()).toEqual(['', 'a', 'ab', 'abc'])                           // τ = {∅, {a}, {a, b}, X}
    const inter = (u: string, v: string) => [...u].filter((c) => v.includes(c)).join('')
    const union = (u: string, v: string) => [...new Set([...u, ...v])].sort().join('')
    for (const u of tau) for (const v of tau) { expect(tau.has(union(u, v)), `${u} ∪ ${v}`).toBe(true); expect(tau.has(inter(u, v)), `${u} ∩ ${v}`).toBe(true) }
    expect(tau.has('abc')).toBe(true)                                                // X is open
    expect(tau.has('ac')).toBe(false); expect(tau.has('b')).toBe(false)              // {a, c} and {b} are not open
    // the number of drawn open sets (boxes) around each point, and the numeral drawn under it
    const count = (n: string) => [A, AB, X].filter((b) => inside(b, named.find((q) => q.name === n)!.pos)).length
    expect(['a', 'b', 'c'].map(count)).toEqual([3, 2, 1])
    named.forEach((n) => expect(numOf(labelAt(s, [n.pos[0], n.pos[1] - 0.62])!.text!)).toBe(count(n.name)))
    for (const t of ['τ = {∅, {a}, {a, b}, X}', '{a} ∪ {a, b} = {a, b}', '{a} ∩ {a, b} = {a}', '{a, c} ∉ τ', '{a}', '{a, b}', 'X']) expect(texts(s)).toContain(t)
    // the captions agree with the sets read from the drawing
    expect(union('a', 'ab')).toBe('ab'); expect(inter('a', 'ab')).toBe('a')
  })

  // ── 2. product topology ────────────────────────────────────────────────────────────────────
  it('math.top.product-space: the strips π₁⁻¹(U) and π₂⁻¹(V) cross in the rectangle U × V, and its projections are U = (1, 3) and V = (0.5, 2)', () => {
    const s = M.buildProductSpaceScene(), F = M.PRD
    const [uSeg] = bonds(s, BLUE, 0.1), [vSeg] = bonds(s, RED, 0.1)
    const U = [toG(F, uSeg.from!)[0], toG(F, uSeg.to!)[0]].sort((a, b) => a - b), V = [toG(F, vSeg.from!)[1], toG(F, vSeg.to!)[1]].sort((a, b) => a - b)
    expect(toG(F, uSeg.from!)[1]).toBeCloseTo(0, 1); expect(toG(F, vSeg.from!)[0]).toBeCloseTo(0, 1)    // U lies on the X axis, V on the Y axis
    closeVec(U, [1, 3], 0.02); closeVec(V, [0.5, 2], 0.02)
    expect(numsIn(labelIn(s, 'U =').text!)).toEqual(U.map((v) => Math.round(v * 100) / 100))
    expect(numsIn(labelIn(s, 'V =').text!)).toEqual(V.map((v) => Math.round(v * 100) / 100))
    // the strips: vertical lines at the ends of U, horizontal lines at the ends of V, each spanning the whole plane
    const vert = bonds(s, BLUE, 0.05), horiz = bonds(s, RED, 0.05)
    expect(vert).toHaveLength(2); expect(horiz).toHaveLength(2)
    vert.forEach((o) => expect(near(o.from![0], o.to![0], 0.001)).toBe(true)); horiz.forEach((o) => expect(near(o.from![1], o.to![1], 0.001)).toBe(true))
    closeVec(vert.map((o) => toG(F, o.from!)[0]).sort((a, b) => a - b), U, 0.02); closeVec(horiz.map((o) => toG(F, o.from!)[1]).sort((a, b) => a - b), V, 0.02)
    // the green rectangle is exactly the intersection of the two strips, and its projections are U and V
    const rect = bbox(bonds(s, GREEN, 0.09))
    expect(bonds(s, GREEN, 0.09)).toHaveLength(4)
    const [rx0, ry0] = toG(F, [rect[0], rect[1]]), [rx1, ry1] = toG(F, [rect[2], rect[3]])
    closeVec([rx0, rx1], U, 0.02); closeVec([ry0, ry1], V, 0.02)
    const c = labelIn(s, 'U ×').position!
    expect(near(c[0], (rect[0] + rect[2]) / 2, 0.02) && near(c[1], (rect[1] + rect[3]) / 2, 0.02)).toBe(true)   // the name sits in the middle of the rectangle
    for (const t of ['π₁⁻¹(U)', 'π₂⁻¹(V)', 'projections: U and V', 'X', 'Y']) expect(texts(s)).toContain(t)
  })

  // ── 3. homotopy equivalence ────────────────────────────────────────────────────────────────
  it('math.top.homotopy-equivalence: every drawn arrow is p ↦ p/|p| (same ray, landing on the circle), g∘f fixes the circle, and the midpoints are at radius (|p| + 1)/2', () => {
    const s = M.buildHomotopyEquivalenceScene()
    const circ = extent(paths(s, GREEN)[0])
    const c = [circ.cx, circ.cy], R = (circ.rx + circ.ry) / 2
    expect(circ.rx).toBeCloseTo(circ.ry, 1)
    const polar = (p: readonly number[]) => ({ r: dist(p, c) / R, a: Math.atan2(p[1] - c[1], p[0] - c[0]) })
    const origin = dots(s, SLATE)[0]
    expect(dist(origin.position!, c)).toBeLessThan(0.02)                              // the hollow mark is the removed origin
    const ps = dots(s, BLUE).map((d) => d.position!)
    expect(ps).toHaveLength(3)
    ps.forEach((p) => expect(polar(p).r, 'no sample point is the removed origin').toBeGreaterThan(0.3))
    expect(ps.map((p) => polar(p).r > 1)).toEqual([true, false, true])                // two outside the circle, one inside
    const arrs = arrows(s, VIOLET)
    expect(arrs).toHaveLength(3)
    arrs.forEach((a) => {
      const p = ps.find((q) => dist(q, a.from!) < 0.02)!
      expect(p, 'each arrow starts at a sample point').toBeTruthy()
      const g = [(p[0] - c[0]) / dist(p, c), (p[1] - c[1]) / dist(p, c)]                // g(p) = p/|p|, in units of the radius
      closeVec([(a.to![0] - c[0]) / R, (a.to![1] - c[1]) / R], g, 0.02)                  // the arrow ends exactly at g(p)
      expect(polar(a.to!).r).toBeCloseTo(1, 1)                                          // … on the circle
    })
    // g∘f = id: the landing points are on the circle, and g leaves a circle point where it is (|q| = 1 ⟹ q/|q| = q)
    const lands = dots(s, GREEN).map((d) => d.position!)
    expect(lands).toHaveLength(3)
    lands.forEach((q) => { expect(polar(q).r).toBeCloseTo(1, 1); closeVec([(q[0] - c[0]) / dist(q, c), (q[1] - c[1]) / dist(q, c)], [(q[0] - c[0]) / R, (q[1] - c[1]) / R], 0.02) })
    // f∘g ≃ id: H_t(p) = (1 − t) p + t p/|p|; the drawn violet dots are H_½(p), at the radius (|p| + 1)/2
    const mids = dots(s, VIOLET).map((d) => d.position!)
    expect(mids).toHaveLength(3)
    ps.forEach((p) => {
      const r = polar(p).r, g = [(p[0] - c[0]) / dist(p, c), (p[1] - c[1]) / dist(p, c)]
      const h = [c[0] + R * (0.5 * (p[0] - c[0]) / R + 0.5 * g[0]), c[1] + R * (0.5 * (p[1] - c[1]) / R + 0.5 * g[1])]
      const m = mids.find((q) => dist(q, h) < 0.03)!
      expect(m, `midpoint of the slide from radius ${r.toFixed(2)}`).toBeTruthy()
      expect(polar(m).r).toBeCloseTo((r + 1) / 2, 1)
    })
    for (const t of ['S¹', '0 removed', 'ℝ² ∖ {0}', 'g: p ↦ p/|p|', 't = ½', 'g ∘ f = id', 'f ∘ g ≃ id']) expect(texts(s)).toContain(t)
  })

  // ── 4. homology ────────────────────────────────────────────────────────────────────────────
  it('math.top.homology: the numbers under each space are its pieces (H₀, blue) and independent loops (H₁, red), counted from the drawn curves: (1, 0), (1, 1), (1, 2), (2, 2)', () => {
    const s = M.buildHomologyScene()
    type Item = { pts: number[][]; closed: boolean }
    const items: Item[] = [...dots(s, BLUE).map((d) => ({ pts: [d.position!], closed: false })), ...paths(s, BLUE).map((p) => ({ pts: p.points!, closed: dist(p.points![0], p.points![p.points!.length - 1]) < 0.02 }))]
    expect(items).toHaveLength(6)                                                    // 1 point + 5 curves (circle, the two circles of the figure-eight, two separate circles)
    expect(items.filter((i) => i.closed)).toHaveLength(5)
    const centre = (it: Item) => { const xs = it.pts.map((p) => p[0]), ys = it.pts.map((p) => p[1]); return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2] }
    const touches = (a: Item, b: Item) => a.pts.some((p) => b.pts.some((q) => dist(p, q) < 0.03))
    const components = (group: Item[]) => { const seen = new Set<number>(); let n = 0; group.forEach((_, i) => { if (seen.has(i)) return; n++; const stack = [i]; while (stack.length) { const k = stack.pop()!; if (seen.has(k)) continue; seen.add(k); group.forEach((g, j) => { if (!seen.has(j) && touches(group[k], g)) stack.push(j) }) } }); return n }
    const nums = labelsOf(s).filter((l) => /^\d$/.test(l.text ?? ''))
    const blue = nums.filter((l) => l.color === BLUE), red = nums.filter((l) => l.color === RED)
    expect(blue).toHaveLength(4); expect(red).toHaveLength(4)
    const results = blue.map((b) => {
      const r = red.find((q) => near(q.position![1], b.position![1], 0.001) && near(q.position![0] - b.position![0], 0.8, 0.02))!
      expect(r, 'each blue numeral has its red partner').toBeTruthy()
      const cx = (b.position![0] + r.position![0]) / 2, y = b.position![1]
      const group = items.filter((it) => { const c = centre(it); return Math.abs(c[0] - cx) < 1.9 && c[1] > y && c[1] < y + 2.4 })
      return [numOf(b.text!), numOf(r.text!), components(group), group.filter((g) => g.closed).length, cx] as const
    }).sort((p, q) => p[4] - q[4])
    results.forEach(([h0, h1, pieces, loops]) => { expect(h0, 'H₀ = connected pieces').toBe(pieces); expect(h1, 'H₁ = loops').toBe(loops) })
    // row one reads point, circle, figure-eight; the separate pair has the same loops as the figure-eight but a different H₀
    const row1 = results.filter((r) => r[4] < 5 && r[3] !== undefined).map((r) => [r[0], r[1]])
    expect(results.map((r) => [r[0], r[1]]).sort().join('|')).toBe([[1, 0], [1, 1], [1, 2], [2, 2]].sort().join('|'))
    expect(row1.length).toBe(4)
    expect(components(items)).toBe(5)                                                // the whole drawing: point, circle, figure-eight (touching), two separate circles
    for (const t of ['H₀: pieces', 'H₁: loops', 'not connected']) expect(texts(s)).toContain(t)
  })

  // ── 5. convex optimisation ─────────────────────────────────────────────────────────────────
  it('math.opt.convex-optimization: the convex curve has one dip with its chord above it; the non-convex curve has two dips and its right (local) minimum is higher than the left (global) one', () => {
    const s = M.buildConvexOptimizationScene(), L = M.CVL, R = M.CVR
    const f = pathG(paths(s, BLUE)[0], L), w = pathG(paths(s, RED)[0], R)
    // convex: one lowest point at x = 1.5, value 0; every chord of the drawn curve lies above it (to the drawing's rounding)
    const [fx, fy] = argmin(f, 0, 3.4)
    expect(fx).toBeCloseTo(1.5, 1); expect(fy).toBeCloseTo(0, 1)
    for (let i = 0; i + 16 < f.length; i += 3) for (let j = i + 8; j < f.length; j += 5) for (let k = i + 1; k < j; k += 3) {
      const t = (f[k][0] - f[i][0]) / (f[j][0] - f[i][0])
      expect(f[k][1], `chord ${i}-${j} at ${k}`).toBeLessThanOrEqual(f[i][1] + t * (f[j][1] - f[i][1]) + 0.04)
    }
    // the green dot marks that minimum; the violet chord joins two points of the curve and lies above it between them
    const green = dots(s, GREEN), red = dots(s, RED)
    const dMin = green.find((d) => d.position![0] < 0)!
    closeVec(toG(L, dMin.position!), [fx, fy], 0.06)
    const [chord] = bonds(s, VIOLET, 0.05)
    const [ca, cb] = [toG(L, chord.from!), toG(L, chord.to!)]
    closeVec([ca[0], cb[0]], [0.5, 3], 0.02)
    expect(Math.abs(valueAt(f, ca[0]) - ca[1])).toBeLessThan(0.04); expect(Math.abs(valueAt(f, cb[0]) - cb[1])).toBeLessThan(0.04)   // both ends are on the curve
    for (let x = ca[0] + 0.05; x < cb[0]; x += 0.05) expect(ca[1] + ((cb[1] - ca[1]) * (x - ca[0])) / (cb[0] - ca[0]), `chord at ${x.toFixed(2)}`).toBeGreaterThan(valueAt(f, x))
    // non-convex: two dips (one in each half, with a higher barrier between), the right one higher than the left
    const left = argmin(w, -1.6, -0.3), right = argmin(w, 0.3, 1.6)
    const barrier = Math.max(...w.filter(([x]) => Math.abs(x) < 0.3).map((p) => p[1]))
    expect(barrier).toBeGreaterThan(right[1] + 0.3); expect(barrier).toBeGreaterThan(left[1] + 0.3)
    expect(right[1]).toBeGreaterThan(left[1] + 0.4)                                  // the right dip is a local, not global, minimum
    closeVec(toG(R, red.find((d) => d.position![0] > 0)!.position!), right, 0.06)
    closeVec(toG(R, green.find((d) => d.position![0] > 0)!.position!), left, 0.06)
    expect(left[0]).toBeCloseTo(-1.04, 1); expect(right[0]).toBeCloseTo(0.96, 1)
    expect(right[1]).toBeCloseTo(0.29, 1); expect(left[1]).toBeCloseTo(-0.31, 1)
    for (const t of ['convex: one minimum', 'chord above graph', 'non-convex: two minima']) expect(texts(s)).toContain(t)
  })

  // ── 6. quadratic programming ───────────────────────────────────────────────────────────────
  it('math.opt.quadratic-programming: the circle round (3, 2.5) touches x + y = 4 at (2.25, 1.75), the best feasible point; −∇f is along the edge normal there', () => {
    const s = M.buildQuadraticProgrammingScene(), F = M.QPF
    const edge = bonds(s, RED, 0.07)[0]
    const [e0, e1] = [toG(F, edge.from!), toG(F, edge.to!)]
    closeVec([e0[0] + e0[1], e1[0] + e1[1]], [4, 4], 0.03)                            // the red edge is the line x + y = 4
    expect(numsIn(labelIn(s, 'x + y').text!)).toEqual([4])
    const floor = bonds(s, SLATE, 0.05)
    expect(floor).toHaveLength(2)                                                    // the other two sides: y = 0 and x = 0
    // the centre dot (violet) is the unconstrained minimum, outside the triangle
    const [cd] = dots(s, VIOLET)
    const C = toG(F, cd.position!)
    closeVec(C, [3, 2.5], 0.03)
    // a thin violet leader line joins the centre dot to its caption "min of f"
    const [leader] = bonds(s, VIOLET, 0.025)
    expect(dist(leader.from!, [cd.position![0] + 0.2, cd.position![1]])).toBeLessThan(0.02)
    expect(dist(leader.to!, labelIn(s, 'min of f').position!)).toBeLessThan(1.5)
    expect(C[0] + C[1]).toBeGreaterThan(4)                                           // infeasible
    // the two level circles are centred there; the blue one has radius = distance from the centre to the edge (tangent)
    const circles = paths(s)
    expect(circles).toHaveLength(2)
    const [outer] = circles.filter((p) => p.color === VIOLET), [tan] = circles.filter((p) => p.color === BLUE)
    const rOf = (p: Obj) => (extent(p).rx / F.ux + extent(p).ry / F.uy) / 2
    ;[outer, tan].forEach((p) => closeVec(toG(F, [extent(p).cx, extent(p).cy]), C, 0.03))
    const dEdge = Math.abs(C[0] + C[1] - 4) / Math.SQRT2
    expect(rOf(tan)).toBeCloseTo(dEdge, 1); expect(dEdge).toBeCloseTo(1.06, 1); expect(rOf(outer)).toBeCloseTo(1.8, 1)
    // the green dot is the foot of the perpendicular from the centre to the edge, i.e. the touching point
    const [sol] = dots(s, GREEN)
    const S = toG(F, sol.position!)
    const foot = [C[0] - (C[0] + C[1] - 4) / 2, C[1] - (C[0] + C[1] - 4) / 2]
    closeVec(S, foot, 0.03)
    expect(numsIn(labelIn(s, 'QP solution').text!)).toEqual(foot.map((v) => Math.round(v * 100) / 100))
    // optimality, checked by brute force on the drawn triangle: no feasible grid point has a smaller f = (x − cx)² + (y − cy)²
    const fval = (x: number, y: number) => (x - C[0]) ** 2 + (y - C[1]) ** 2
    for (let x = 0; x <= 4; x += 0.05) for (let y = 0; x + y <= 4.0001; y += 0.05) expect(fval(x, y)).toBeGreaterThanOrEqual(fval(S[0], S[1]) - 0.012)
    expect(fval(S[0], S[1])).toBeCloseTo(1.125, 1)
    // −∇f = 2 (centre − solution) points along the arrow, and the arrow is along the edge normal (1, 1)
    const [g] = arrows(s, VIOLET)
    expect(dist(g.from!, sol.position!)).toBeLessThan(0.03)
    const dir = [g.to![0] - g.from![0], g.to![1] - g.from![1]], grad = [C[0] - S[0], C[1] - S[1]]
    expect(Math.abs(crossz(dir, grad)) / (Math.hypot(dir[0], dir[1]) * Math.hypot(grad[0], grad[1]))).toBeLessThan(0.03)
    expect(dotp(dir, grad)).toBeGreaterThan(0)
    expect(Math.abs(crossz(dir, [1, 1])) / (Math.hypot(dir[0], dir[1]) * Math.SQRT2)).toBeLessThan(0.03)
    for (const t of ['x + y ≤ 4', 'min of f', 'level curves of f', '−∇f']) expect(texts(s)).toContain(t)
  })

  // ── 7. integer programming ─────────────────────────────────────────────────────────────────
  it('math.opt.integer-programming: 19 whole-number points lie in the drawn polygon, the LP corner (3.75, 1.25) gives 23.75, and the best lattice point (3, 2) gives 23', () => {
    const s = M.buildIntegerProgrammingScene(), F = M.IPF
    const edges = bonds(s, SLATE, 0.07)
    expect(edges).toHaveLength(4)
    const verts = edges.map((o) => toG(F, o.from!))
    const has = (x: number, y: number) => verts.some((v) => Math.abs(v[0] - x) < 0.03 && Math.abs(v[1] - y) < 0.03)
    ;[[0, 0], [4.5, 0], [3.75, 1.25], [0, 5]].forEach(([x, y]) => expect(has(x, y), `corner (${x}, ${y})`).toBe(true))
    // the two slanted edges are the lines x + y = 5 and 10x + 6y = 45
    const slant = edges.map((o) => [toG(F, o.from!), toG(F, o.to!)]).filter(([a, b]) => Math.abs(a[1] - b[1]) > 0.1 && Math.abs(a[0] - b[0]) > 0.1)
    expect(slant).toHaveLength(2)
    const on = (a: number, b: number, c: number) => slant.some(([p, q]) => Math.abs(a * p[0] + b * p[1] - c) < 0.04 && Math.abs(a * q[0] + b * q[1] - c) < 0.04)
    expect(on(1, 1, 5)).toBe(true); expect(on(10, 6, 45)).toBe(true)
    // the polygon as a convex region (corners in drawn order) and the lattice points inside it
    const poly = edges.map((o) => [toG(F, o.from!), toG(F, o.to!)])
    const centroid = [sum(verts.map((v) => v[0])) / 4, sum(verts.map((v) => v[1])) / 4]
    const insidePoly = (x: number, y: number) => poly.every(([a, b]) => crossz([b[0] - a[0], b[1] - a[1]], [x - a[0], y - a[1]]) * crossz([b[0] - a[0], b[1] - a[1]], [centroid[0] - a[0], centroid[1] - a[1]]) >= -1e-6)
    const expected: number[][] = []
    for (let x = 0; x <= 6; x++) for (let y = 0; y <= 6; y++) if (insidePoly(x, y)) expected.push([x, y])
    expect(expected).toHaveLength(19)
    const lattice = dots(s, BLUE).map((d) => toG(F, d.position!))
    expect(lattice).toHaveLength(19)
    lattice.forEach(([x, y]) => { expect(Math.abs(x - Math.round(x))).toBeLessThan(0.03); expect(Math.abs(y - Math.round(y))).toBeLessThan(0.03) })
    expect(lattice.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).sort()).toEqual(expected.map(([x, y]) => `${x},${y}`).sort())
    expect(numsIn(labelIn(s, 'integer points').text ?? '')).toEqual([])               // (the count is in the narration, the dots carry it in the figure)
    // objective 5x + 4y: the LP optimum is the polygon corner with the largest value, and it is not a lattice point
    const obj = (x: number, y: number) => 5 * x + 4 * y
    const best = verts.reduce((m, v) => (obj(v[0], v[1]) > obj(m[0], m[1]) ? v : m))
    const [lp] = dots(s, RED), [ip] = dots(s, GREEN)
    closeVec(toG(F, lp.position!), best, 0.03); closeVec(toG(F, lp.position!), [3.75, 1.25], 0.03)
    expect(numsIn(labelIn(s, '23.75').text!)).toEqual([Math.round(obj(best[0], best[1]) * 100) / 100])
    expect(Math.abs(best[0] - Math.round(best[0]))).toBeGreaterThan(0.2)
    // the best lattice point and its value
    const bestInt = lattice.reduce((m, v) => (obj(v[0], v[1]) > obj(m[0], m[1]) ? v : m))
    closeVec(toG(F, ip.position!), [Math.round(bestInt[0]), Math.round(bestInt[1])], 0.03); closeVec(toG(F, ip.position!), [3, 2], 0.03)
    expect(numsIn(labelIn(s, 'best integer').text!)).toEqual([obj(Math.round(bestInt[0]), Math.round(bestInt[1]))])
    expect(obj(best[0], best[1])).toBeGreaterThan(obj(3, 2))                           // the relaxation overshoots: 23.75 > 23
    // the level lines have the objective's slope −5/4 and pass through their dots; the branch lines are x = 3 and x = 4
    const levels = [[RED, lp], [GREEN, ip]] as const
    levels.forEach(([color, d]) => {
      const [l] = bonds(s, color, 0.04); const a = toG(F, l.from!), b = toG(F, l.to!)
      expect((b[1] - a[1]) / (b[0] - a[0])).toBeCloseTo(-1.25, 1)
      expect(Math.abs(obj(a[0], a[1]) - obj(...(toG(F, d.position!) as [number, number])))).toBeLessThan(0.1)
    })
    const branch = bonds(s, VIOLET, 0.03).map((o) => toG(F, o.from!)[0]).sort()
    closeVec(branch, [3, 4], 0.02)
    for (const t of ['x', 'y', 'integer points', '23.75 at the LP vertex', 'best integer point: 23']) expect(texts(s)).toContain(t)
  })

  // ── 8. dynamic programming ─────────────────────────────────────────────────────────────────
  it('math.opt.dynamic-programming: the green numbers are the cheapest cost to T, recomputed by the Bellman recursion on the drawn graph; the green route costs 9 and the greedy route 10', () => {
    const s = M.buildDynamicProgrammingScene()
    const nodes = dots(s, INK)
    expect(nodes).toHaveLength(6)
    const nameOf = (d: Obj) => (labelAt(s, [d.position![0], d.position![1] + 0.62]) ?? labelAt(s, [d.position![0], d.position![1] - 0.62]))!.text!
    const pos: Record<string, number[]> = {}
    nodes.forEach((d) => { pos[nameOf(d)] = d.position! })
    expect(Object.keys(pos).sort()).toEqual(['A', 'B', 'C', 'D', 'S', 'T'])
    const nodeAt = (p: readonly number[]) => Object.keys(pos).find((n) => dist(pos[n], p) < 0.03)!
    // the roads and their drawn costs: each cost numeral is the one nearest to its road
    const roads = bonds(s, SLATE, 0.04)
    expect(roads).toHaveLength(8)
    const numerals = labelsOf(s).filter((l) => /^\d$/.test(l.text ?? '') && l.color === INK && !Object.values(pos).some((p) => dist(p, l.position!) < 0.01))
    const segDist = (o: Obj, p: readonly number[]) => { const dx = o.to![0] - o.from![0], dy = o.to![1] - o.from![1]; const t = Math.max(0, Math.min(1, ((p[0] - o.from![0]) * dx + (p[1] - o.from![1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(o.from![0] + t * dx - p[0], o.from![1] + t * dy - p[1]) }
    // every cost numeral belongs to the road nearest to it (clearly nearer than any other), and that matching is one-to-one
    const owner = numerals.map((n) => { const d = roads.map((o, i) => ({ i, d: segDist(o, n.position!) })).sort((a, b) => a.d - b.d); expect(d[0].d, 'a numeral sits beside its road').toBeLessThan(0.45); expect(d[1].d - d[0].d, 'and is clearly nearer to it than to any other road').toBeGreaterThan(0.15); return d[0].i })
    expect(numerals).toHaveLength(8); expect(new Set(owner).size).toBe(8)
    const graph = roads.map((o, i) => ({ u: nodeAt(o.from!), v: nodeAt(o.to!), w: numOf(numerals[owner.indexOf(i)].text!) }))
    // the Bellman recursion on the drawn graph (columns left to right: S < A, B < C, D < T)
    const V: Record<string, number> = { T: 0 }
    const out = (n: string) => graph.filter((e) => e.u === n)
    for (const n of ['C', 'D', 'A', 'B', 'S']) V[n] = Math.min(...out(n).map((e) => e.w + V[e.v]))
    expect(V).toEqual({ T: 0, C: 3, D: 6, A: 8, B: 4, S: 9 })
    // the drawn green numbers (step two: beside C, D, A, B; step three: beside S) are exactly these values
    const greens = labelsOf(s).filter((l) => l.color === GREEN && /^\d$/.test(l.text ?? ''))
    expect(greens).toHaveLength(5)
    const valueNear = (n: string) => numOf(greens.map((g) => ({ g, d: dist(g.position!, pos[n]) })).sort((a, b) => a.d - b.d)[0].g.text!)
    for (const n of ['C', 'D', 'A', 'B', 'S']) expect(valueNear(n), `V(${n})`).toBe(V[n])
    // the highlighted route is the cheapest S → T route: enumerate all of them from the drawn graph
    const routes: Array<{ path: string; cost: number }> = []
    const walk = (n: string, path: string, cost: number) => { if (n === 'T') { routes.push({ path, cost }); return } out(n).forEach((e) => walk(e.v, path + e.v, cost + e.w)) }
    walk('S', 'S', 0)
    routes.sort((a, b) => a.cost - b.cost)
    expect(routes[0]).toEqual({ path: 'SBCT', cost: 9 }); expect(routes[1].cost).toBeGreaterThan(9)
    const route = bonds(s, GREEN, 0.1)
    expect(route.map((o) => nodeAt(o.from!) + nodeAt(o.to!)).sort()).toEqual(['BC', 'CT', 'SB'])
    expect(sum(route.map((o) => graph.find((e) => e.u === nodeAt(o.from!) && e.v === nodeAt(o.to!))!.w))).toBe(V.S)
    expect(evalLR(labelIn(s, '5 + 1 + 3').text!.replace(/ = 9.*/, ' = 9'))).toBe(9)
    expect(numsIn(labelIn(s, '5 + 1 + 3').text!).pop()).toBe(V.S)
    // the greedy walk (always the cheapest road next) costs 10, which is the number on its caption
    let g = 'S', gc = 0
    while (g !== 'T') { const e = out(g).sort((a, b) => a.w - b.w)[0]; gc += e.w; g = e.v }
    expect(gc).toBe(10); expect(numsIn(labelIn(s, 'greedy').text!)).toEqual([gc])
    for (const t of ['cheapest cost to T', '5 + 1 + 3 = 9', 'greedy first step: 10']) expect(texts(s)).toContain(t)
  })

  // ── 9. normed space ────────────────────────────────────────────────────────────────────────
  it('math.fnal.normed-space: the sup distance max |f − g| is 0.15 for g (inside the band of radius 0.25) and 0.4 for h (outside), measured on the drawn curves; the triangle inequality holds', () => {
    const s = M.buildNormedSpaceScene(), F = M.NRM
    const col = (c: string) => paths(s, c).map((p) => pathG(p, F))
    const [f] = col(BLUE), [g] = col(GREEN), [h] = col(RED), bands = col(VIOLET)
    expect(bands).toHaveLength(2)
    ;[f, g, ...bands].forEach((c) => expect(c).toHaveLength(121))
    expect(h).toHaveLength(49); expect(h[0][0]).toBeCloseTo(0.5, 2); expect(h[h.length - 1][0]).toBeCloseTo(0.9, 2)     // h is drawn only where it departs from f
    const sup = (a: [number, number][], b: [number, number][]) => Math.max(...a.map((p, i) => Math.abs(p[1] - b[i][1])))
    const upper = bands.find((b) => b[60][1] > f[60][1])!, lower = bands.find((b) => b[60][1] < f[60][1])!
    // the band: the same vertical distance ε above and below f at every x
    const eps = sum(upper.map((p, i) => p[1] - f[i][1])) / 121
    expect(eps).toBeCloseTo(0.25, 2)
    upper.forEach((p, i) => { expect(p[1] - f[i][1]).toBeCloseTo(eps, 1); expect(f[i][1] - lower[i][1]).toBeCloseTo(eps, 1) })
    expect(numsIn(labelIn(s, 'band of radius').text!)).toEqual([Math.round(eps * 100) / 100])
    // d(f, g) and d(f, h) as the largest vertical gaps; g stays in the band, h leaves it
    const supOn = (xs: [number, number][], a: [number, number][]) => Math.max(...xs.map((p) => Math.abs(p[1] - valueAt(a, p[0]))))   // largest gap of a drawn curve to another, at the first curve's own x values
    const dg = sup(f, g), dh = supOn(h, f)
    expect(dg).toBeCloseTo(0.15, 1); expect(dh).toBeCloseTo(0.4, 1)
    expect(dg).toBeLessThan(eps); expect(dh).toBeGreaterThan(eps)
    expect(numsIn(labelIn(s, 'g: distance').text!)).toEqual([Math.round(dg * 100) / 100]); expect(numsIn(labelIn(s, 'h: distance').text!)[0]).toEqual(Math.round(dh * 10) / 10)
    const gaps = h.map((p) => Math.abs(p[1] - valueAt(f, p[0])))
    expect(h[gaps.indexOf(Math.max(...gaps))][0]).toBeCloseTo(0.7, 1)                 // the bump sits at x = 0.7
    // the sup norm is a norm-induced metric: symmetric, d(f, f) = 0, and the triangle inequality on the three drawn functions
    expect(sup(f, f)).toBe(0); expect(sup(g, f)).toBe(dg)
    const dgh = supOn(h, g)
    expect(dgh).toBeLessThanOrEqual(dg + dh + 1e-9); expect(dh).toBeLessThanOrEqual(dg + dgh + 1e-9)
    // f itself is the drawn sin curve: the middle value and the extrema
    expect(Math.max(...f.map((p) => p[1]))).toBeCloseTo(0.85, 1); expect(Math.min(...f.map((p) => p[1]))).toBeCloseTo(0.25, 1)
    for (const t of ['f', 'band of radius 0.25', 'g: distance 0.15', 'h: distance 0.4, outside']) expect(texts(s)).toContain(t)
  })

  // ── 10. distributions ──────────────────────────────────────────────────────────────────────
  it('math.fnal.distributions: each bump has area 1 (width 1, ½, ¼; height 1, 2, 4), the average of the drawn φ = cos x under it is 0.96, 0.99, 1.00, and these tend to φ(0) = 1', () => {
    const s = M.buildDistributionsScene(), F = M.DST
    const phi = pathG(paths(s, BLUE)[0], F)
    phi.forEach(([x, y]) => expect(y, `φ(${x.toFixed(2)})`).toBeCloseTo(Math.cos(x), 1))                // the drawn test function is cos x
    expect(valueAt(phi, 0)).toBeCloseTo(1, 1)
    const bump = (color: string) => {
      const ls = bonds(s, color, 0.05); expect(ls, color).toHaveLength(3)
      const top = ls.find((o) => near(o.from![1], o.to![1], 0.001))!, sides = ls.filter((o) => near(o.from![0], o.to![0], 0.001))
      expect(sides).toHaveLength(2)
      const w = Math.abs(toG(F, top.to!)[0] - toG(F, top.from!)[0]), h = toG(F, top.from!)[1]
      const centre = (toG(F, top.to!)[0] + toG(F, top.from!)[0]) / 2
      return { w, h, centre }
    }
    const bumps = [bump(RED), bump(VIOLET), bump(GREEN)]
    closeVec(bumps.map((b) => b.w), [1, 0.5, 0.25], 0.02)
    bumps.forEach((b) => { expect(b.w * b.h, 'area').toBeCloseTo(1, 1); expect(b.centre).toBeCloseTo(0, 1) })
    // the average of φ over a bump, integrated from the drawn curve, against the caption and the exact 2 sin(w/2)/w
    const average = (w: number) => { const n = 400; let a = 0; for (let k = 0; k < n; k++) a += valueAt(phi, -w / 2 + ((k + 0.5) * w) / n); return a / n }
    const caps = ['width 1:', 'width ½:', 'width ¼:'].map((p) => numOf(labelIn(s, p).text!.split(':')[1]))
    bumps.forEach((b, i) => {
      expect(Math.abs(average(b.w) - caps[i]), `bump ${i}`).toBeLessThanOrEqual(0.012)
      expect(Math.abs(Math.round((2 * Math.sin(b.w / 2)) / b.w * 100) / 100 - caps[i])).toBeLessThan(0.0001)
    })
    expect(caps).toEqual([0.96, 0.99, 1])
    expect(caps[0]).toBeLessThan(caps[1]); expect(caps[1]).toBeLessThan(caps[2]); expect(caps[2]).toBeLessThanOrEqual(1)          // they climb to φ(0) = 1
    const [peak] = dots(s, GREEN)
    closeVec(toG(F, peak.position!), [0, 1], 0.03)
    expect(numsIn(labelIn(s, 'δ(φ)').text!)).toEqual([0, 1])
    expect(numsIn(labelIn(s, 'each bump').text!)).toEqual([1])                               // the caption states the area the drawn bumps have
    for (const t of ['φ', 'each bump has area 1', 'average of φ', 'width 1: 0.96', 'width ½: 0.99', 'width ¼: 1.00', 'δ(φ) = φ(0) = 1']) expect(texts(s)).toContain(t)
  })

  // ── 11. special functions ──────────────────────────────────────────────────────────────────
  it('math.fnal.special-functions: the drawn curve is Γ(x) = ∫ t^(x−1) e^(−t) dt (checked by numerical integration), its values at 1, 2, 3, 4 are the factorials 1, 1, 2, 6, and B(2, 2) = 1 ÷ 6', () => {
    const s = M.buildSpecialFunctionsScene(), F = M.GAM
    // Γ(x) from its definition: ∫₀^∞ t^(x−1) e^(−t) dt = ∫₀^∞ 2 u^(2x−1) e^(−u²) du (t = u²), by Simpson's rule on [0, 7]
    const gam = (x: number) => { const n = 4000, h = 7 / n; const g = (u: number) => 2 * Math.pow(u, 2 * x - 1) * Math.exp(-u * u); let a = g(0) + g(7); for (let k = 1; k < n; k++) a += g(k * h) * (k % 2 ? 4 : 2); return (a * h) / 3 }
    const fact = (n: number) => (n <= 1 ? 1 : n * fact(n - 1))
    const curve = pathG(paths(s, BLUE)[0], F)
    expect(curve[0][0]).toBeCloseTo(0.5, 1); expect(curve[curve.length - 1][0]).toBeCloseTo(4.2, 1)
    curve.forEach(([x, y]) => {
      const slopeAt = Math.abs(gam(x + 0.01) - gam(x - 0.01)) / 0.02
      expect(Math.abs(y - gam(x)), `Γ(${x.toFixed(2)})`).toBeLessThanOrEqual(0.03 + 0.012 * slopeAt)       // P() rounds every coordinate to 0.01
    })
    expect(curve[0][1]).toBeCloseTo(Math.sqrt(Math.PI), 1)                              // Γ(½) = √π
    const lowY = Math.min(...curve.map((p) => p[1]))
    const bottom = curve.filter((p) => p[1] <= lowY + 0.02)                            // the flat bottom of the dip (the drawing rounds to 0.01)
    expect(lowY).toBeCloseTo(0.89, 1)
    expect(sum(bottom.map((p) => p[0])) / bottom.length).toBeCloseTo(1.46, 1)           // centred on x ≈ 1.46, where Γ is smallest
    // the green dots at x = 1, 2, 3, 4 sit on the curve at the factorials (n − 1)!, and each carries its value as a numeral
    const dg = dots(s, GREEN)
    expect(dg).toHaveLength(4)
    const pts = dg.map((d) => toG(F, d.position!)).sort((a, b) => a[0] - b[0])
    pts.forEach(([x, y], i) => {
      const n = i + 1
      expect(x).toBeCloseTo(n, 1); expect(y, `Γ(${n})`).toBeCloseTo(fact(n - 1), 1); expect(Math.abs(y - gam(n))).toBeLessThan(0.03)
      expect(Math.abs(valueAt(curve, x) - y)).toBeLessThan(0.05)
      const num = labelsOf(s).filter((l) => l.color === GREEN && /^\d+$/.test(l.text ?? '')).sort((a, b) => dist(a.position!, dg[i].position!) - dist(b.position!, dg[i].position!))
      expect(numOf(labelsOf(s).filter((l) => l.color === GREEN && /^\d+$/.test(l.text ?? '')).find((l) => dist(l.position!, [F.ox + n * F.ux - 0.4, F.oy + fact(n - 1) * F.uy + 0.35]) < 0.03)!.text!)).toBe(fact(n - 1))
      void num
    })
    // the beta value: B(2, 2) = Γ(2)Γ(2)/Γ(4), from the values on the drawn dots
    const b22 = (pts[1][1] * pts[1][1]) / pts[3][1]
    expect(b22).toBeCloseTo(1 / 6, 1)
    const cap = labelIn(s, 'B(2, 2)').text!
    expect(evalLR(cap.split('= ')[1].split(' ≈')[0])).toBeCloseTo(1 / 6, 6)
    expect(numOf(cap.split('≈ ')[1])).toBe(Math.round((1 / 6) * 100) / 100)
    expect(Math.abs(b22 - numOf(cap.split('≈ ')[1]))).toBeLessThan(0.02)
    for (const t of ['Γ(x)', 'Γ(n) = (n − 1)!', 'B(2, 2) = 1 × 1 ÷ 6 ≈ 0.17']) expect(texts(s)).toContain(t)
  })
})
