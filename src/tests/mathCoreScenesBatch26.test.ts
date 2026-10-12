/**
 * Mathematics visual campaign, batch 26 (2026-10-12): the rest of the foundations — partial and total orders, functions as sets of
 * pairs, cardinality, countable and uncountable sets, the natural numbers, ordinals, induction and strong induction, truth tables and
 * logical equivalence. Order axioms are checked on the relation read back from the drawn Hasse edges, the diagonal argument on the
 * drawn digit table, truth tables on the drawn T / F entries, and bijections and trees on the drawn arrows and lines.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB26'

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
  ['math.found.partial-order', M.buildPartialOrderScene, 'math-partial-order'],
  ['math.found.total-order', M.buildTotalOrderScene, 'math-total-order'],
  ['math.found.function-set-theoretic', M.buildSetTheoreticFunctionScene, 'math-set-theoretic-function'],
  ['math.found.cardinality', M.buildCardinalityScene, 'math-cardinality'],
  ['math.found.countable-set', M.buildCountableSetScene, 'math-countable-set'],
  ['math.found.uncountable-set', M.buildUncountableSetScene, 'math-uncountable-set'],
  ['math.found.natural-numbers', M.buildNaturalNumbersScene, 'math-natural-numbers'],
  ['math.found.ordinal-number', M.buildOrdinalNumberScene, 'math-ordinal-number'],
  ['math.found.proof-by-induction', M.buildProofByInductionScene, 'math-proof-by-induction'],
  ['math.found.strong-induction', M.buildStrongInductionScene, 'math-strong-induction'],
  ['math.found.truth-table', M.buildTruthTableScene, 'math-truth-table'],
  ['math.found.logical-equivalence', M.buildLogicalEquivalenceScene, 'math-logical-equivalence'],
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
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const nearest = (p: number[], cands: number[][]) => cands.reduce((best, c, i) => (dist(p, c) < dist(p, cands[best]) ? i : best), 0)
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const bbox = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) } }

describe('the mathematics each figure draws', () => {
  it('Partial order: the closure of the drawn Hasse edges is exactly divisibility on {1, 2, 3, 4, 6, 12} (reflexive, antisymmetric, transitive), the edges are covering steps, 2 ≤ 12 along the green path and 2, 3 (red) are incomparable', () => {
    const s = M.buildPartialOrderScene(), { el, pos } = M.PRO
    const dd = dots(s, INK).map((d) => d.position!); expect(dd).toHaveLength(6)
    const val = (p: number[]) => Number(labelAt(s, [p[0] + 0.5, p[1] + 0.1])!.text)
    const edges = bonds(s, SLATE, 0.04).map((o) => { const a = val(dd[nearest(o.from!, dd)]), b = val(dd[nearest(o.to!, dd)]); const ya = dd[nearest(o.from!, dd)][1], yb = dd[nearest(o.to!, dd)][1]; return (ya < yb ? [a, b] : [b, a]) as [number, number] })
    expect(edges).toHaveLength(7); dd.forEach((p, i) => expect(dist(p, pos[val(p)] as number[])).toBeLessThan(0.02))
    const leq = M.leqFromEdges(el, edges)
    for (const a of el) for (const b of el) expect(leq(a, b), `${a}≤${b}`).toBe(b % a === 0)                                                            // the drawn order IS divisibility
    for (const a of el) expect(leq(a, a)).toBe(true)                                                                                                    // reflexive
    for (const a of el) for (const b of el) if (leq(a, b) && leq(b, a)) expect(a).toBe(b)                                                               // antisymmetric
    for (const a of el) for (const b of el) for (const c of el) if (leq(a, b) && leq(b, c)) expect(leq(a, c)).toBe(true)                               // transitive
    const covers = (a: number, b: number) => leq(a, b) && a !== b && !el.some((m) => m !== a && m !== b && leq(a, m) && leq(m, b)); edges.forEach(([a, b]) => expect(covers(a, b)).toBe(true))
    expect(el.flatMap((a) => el.filter((b) => covers(a, b)).map((b) => `${a}${b}`)).sort()).toEqual(edges.map(([a, b]) => `${a}${b}`).sort())          // every covering pair is drawn, no more
    const green = bonds(s, GREEN, 0.09).map((o) => [val(dd[nearest(o.from!, dd)]), val(dd[nearest(o.to!, dd)])]); expect(green.map((g) => g.join('-')).sort()).toEqual(['2-4', '4-12']); expect(leq(2, 12)).toBe(true)
    const red = dots(s, RED).map((d) => val(dd[nearest(d.position!, dd)])).sort((a, b) => a - b); expect(red).toEqual([2, 3]); expect(leq(2, 3) || leq(3, 2)).toBe(false)
    expect(texts(s)).toEqual(expect.arrayContaining(['divisibility', '2 | 12', 'incomparable']))
  })

  it('Total order: the drawn cells are filled exactly where two numbers are comparable — all 25 for ≤ on {1…5}, only 11 for divisibility on {2…6} — so ≤ is total and divisibility is not', () => {
    const s = M.buildTotalOrderScene(), { left, right } = M.TOT
    const filled = (panel: number, color: string) => { const ds = dots(s, color).filter((d) => d.radius === 0.14).map((d) => d.position!); return (i: number, j: number) => ds.some((d) => dist(d, M.totCell(panel, i, j) as number[]) < 0.02) }
    const fl = filled(0, GREEN), fr = filled(1, RED)
    left.forEach((a, i) => left.forEach((b, j) => expect(fl(i, j), `${a},${b}`).toBe(M.comparableLeq(a, b))))
    right.forEach((a, i) => right.forEach((b, j) => expect(fr(i, j), `${a},${b}`).toBe(M.comparableDiv(a, b))))
    expect(dots(s, GREEN)).toHaveLength(25); expect(dots(s, RED)).toHaveLength(11); expect(paths(s, SLATE).filter((p) => p.points!.length === 17)).toHaveLength(14)
    const allComparable = (els: readonly number[], f: (i: number, j: number) => boolean) => els.every((_, i) => els.every((_, j) => f(i, j)))
    expect(allComparable(left, fl)).toBe(true); expect(allComparable(right, fr)).toBe(false)                                                            // total vs partial
    expect(right.some((a) => right.some((b) => !fr(right.indexOf(a), right.indexOf(b))))).toBe(true)
    left.forEach((a, i) => expect(labelAt(s, [M.totCell(0, i, -1)[0], M.totCell(0, i, 0)[1]])!.text).toBe(String(a)))
    right.forEach((b, j) => expect(labelAt(s, [M.totCell(1, 0, j)[0], M.totCell(1, 0, 0)[1] + 0.55])!.text).toBe(String(b)))
    expect(texts(s)).toEqual(expect.arrayContaining(['total order', 'partial order']))
  })

  it('Function as a set of pairs: the left grid has exactly one mark in every row (counts 1, 1, 1 written beside it) and the right grid has counts 2, 0, 1, which is not a function', () => {
    const s = M.buildSetTheoreticFunctionScene(), { A, f, R } = M.FST
    const marks = (panel: number, color: string) => { const ds = dots(s, color).filter((d) => d.radius === 0.18).map((d) => d.position!); return ds.map((d) => ({ i: [0, 1, 2].find((k) => Math.abs(M.fstCell(panel, k, 0)[1] - d[1]) < 0.02)!, j: [0, 1, 2].find((k) => Math.abs(M.fstCell(panel, 0, k)[0] - d[0]) < 0.02)! })) }
    const ml = marks(0, GREEN), mr = marks(1, RED)
    expect(ml.map((m) => [m.i, m.j].join()).sort()).toEqual(f.map((p) => p.join()).sort()); expect(mr.map((m) => [m.i, m.j].join()).sort()).toEqual(R.map((p) => p.join()).sort())
    const counts = (m: typeof ml) => A.map((_, i) => m.filter((x) => x.i === i).length); expect(counts(ml)).toEqual([1, 1, 1]); expect(counts(mr)).toEqual([2, 0, 1])
    expect(M.isFunctionRel(ml.map((m) => [m.i, m.j] as const), 3)).toBe(true); expect(M.isFunctionRel(mr.map((m) => [m.i, m.j] as const), 3)).toBe(false)
    const written = (panel: number) => A.map((_, i) => labelAt(s, [M.FST.cx[panel] + 1.9, M.fstCell(panel, i, 0)[1]])?.text); expect(written(0)).toEqual(['1', '1', '1']); expect(written(1)).toEqual(['2', '0', '1'])
    expect(new Set(ml.map((m) => m.j)).size).toBeLessThan(3)                                                                                            // outputs may repeat (2, 3 ↦ a)
    expect(paths(s, SLATE).filter((p) => p.points!.length === 17)).toHaveLength(9 - 3 + 9 - 3)
    expect(texts(s)).toEqual(expect.arrayContaining(['function', 'not a function']))
  })

  it('Cardinality: the blue arrows pair {a, b, c} with {1, 2, 3} one-to-one, the green arrows send n to 2n for n = 0…4 (injective, hitting every even number shown), and the bars are 3 and 2³ = 8', () => {
    const s = M.buildCardinalityScene(), C = M.CRD
    const A = [0, 1, 2].map((i) => M.crdFinA(i) as number[]), B = [0, 1, 2].map((i) => M.crdFinB(i) as number[])
    const blue = arrows(s, BLUE).map((o) => [nearest(o.from!, A), nearest(o.to!, B)]); expect(new Set(blue.map((b) => b[0])).size).toBe(3); expect(new Set(blue.map((b) => b[1])).size).toBe(3)
    const IA = [0, 1, 2, 3, 4].map((i) => M.crdInfA(i) as number[]), IB = [0, 1, 2, 3, 4].map((i) => M.crdInfB(i) as number[])
    const green = arrows(s, GREEN).map((o) => { const a = nearest(o.from!, IA), b = nearest(o.to!, IB); return { n: Number(labelAt(s, [IA[a][0] - 0.4, IA[a][1]])!.text), m: Number(labelAt(s, [IB[b][0] + 0.45, IB[b][1]])!.text) } })
    expect(green).toHaveLength(5); green.forEach((g) => expect(g.m).toBe(2 * g.n)); expect(new Set(green.map((g) => g.m)).size).toBe(5); expect(green.map((g) => g.m).sort((a, b) => a - b)).toEqual([0, 2, 4, 6, 8])
    const blueBar = bonds(s, BLUE, 0.2)[0], redBar = bonds(s, RED, 0.2)[0], hb = (blueBar.to![1] - blueBar.from![1]), hr = (redBar.to![1] - redBar.from![1])
    expect(hr / hb).toBeCloseTo(8 / 3, 2); expect(hb / (C.bars.scale * 2.0)).toBeCloseTo(3, 2); expect(hr / (C.bars.scale * 2.0)).toBeCloseTo(8, 2); expect(2 ** 3).toBe(8); expect(hr).toBeGreaterThan(hb)
    expect(texts(s)).toEqual(expect.arrayContaining(['n ↦ 2n', '|A| < |P(A)|', '3', '8']))
  })

  it('Countable set: the drawn zig-zag visits the cells diagonal by diagonal (p + q = 2, 3, 4, …) in the order of the independent enumeration, the coprime cells are numbered 1…11 and the repeats are circled', () => {
    const s = M.buildCountableSetScene(), { n } = M.CNT, cell = (p: number, q: number) => M.cntCell(p, q) as number[]
    const segs = bonds(s, BLUE, 0.04).map((o) => [o.from!, o.to!]); expect(segs).toHaveLength(14)
    const verts = [segs[0][0], ...segs.map((x) => x[1])]; segs.slice(1).forEach((x, i) => expect(dist(x[0], segs[i][1])).toBeLessThan(0.02))             // one continuous path
    const cells = verts.map((v) => { for (let p = 1; p <= n; p++) for (let q = 1; q <= n; q++) if (dist(v, cell(p, q)) < 0.02) return [p, q]; throw new Error('off grid') })
    const expected: number[][] = []; for (let sum2 = 2; sum2 <= 6; sum2++) { const diag: number[][] = []; for (let p = 1; p <= sum2 - 1; p++) diag.push([p, sum2 - p]); if (sum2 % 2 === 0) diag.reverse(); expected.push(...diag) }
    expect(cells).toEqual(expected)                                                                                                                     // the Cantor zig-zag
    expect(cells.slice(1).every((c, i) => Math.abs(c[0] + c[1] - (cells[i][0] + cells[i][1])) <= 1)).toBe(true)                                         // moves along or to the next diagonal
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a), coprime = cells.filter(([p, q]) => gcd(p, q) === 1), skipped = cells.filter(([p, q]) => gcd(p, q) !== 1)
    expect(coprime).toHaveLength(11); coprime.forEach(([p, q], k) => expect(labelAt(s, [cell(p, q)[0] + 0.28, cell(p, q)[1] + 0.28])!.text).toBe(String(k + 1)))
    const rings = pathsOf(s, RED, 20).map((r) => bbox(r)); expect(rings).toHaveLength(skipped.length); skipped.forEach(([p, q]) => expect(rings.some((r) => dist([r.cx, r.cy], cell(p, q)) < 0.03)).toBe(true))
    expect(new Set(coprime.map(([p, q]) => (p / q).toFixed(6))).size).toBe(11)                                                                          // 11 different rationals, no repeats
    expect(dots(s, INK)).toHaveLength(25)
  })

  it('Uncountable set: the diagonal digits of the drawn table are circled, the red row d is their flip, and d differs from every row r₁ … r₅ in the circled position (so it is on no row)', () => {
    const s = M.buildUncountableSetScene(), { ox, d, dRow } = M.UCN
    const digit = (i: number, j: number) => Number(labelAt(s, M.ucnDigit(i, j) as number[], 0.35)!.text)
    const table = [0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3, 4].map((j) => digit(i, j))); expect(table).toEqual(M.UCN.rows.map((r) => [...r]))
    const rings = pathsOf(s, VIOLET, 20).map((r) => bbox(r)); expect(rings).toHaveLength(5); [0, 1, 2, 3, 4].forEach((i) => expect(rings.some((r) => dist([r.cx, r.cy], M.ucnDigit(i, i) as number[]) < 0.03)).toBe(true))
    const diag = [0, 1, 2, 3, 4].map((i) => table[i][i]); expect(diag).toEqual([0, 1, 1, 1, 0])
    const dd = [0, 1, 2, 3, 4].map((j) => Number(labelAt(s, [ox + j * d, dRow])!.text)); expect(dd).toEqual([1, 0, 0, 0, 1]); dd.forEach((v, i) => expect(v).toBe(1 - diag[i]))      // d = flipped diagonal
    table.forEach((row, i) => { expect(dd[i]).not.toBe(row[i]); expect(dd.join('')).not.toBe(row.join('')) })                                             // differs from row i at position i
    expect(table.every((row) => row.join('') !== dd.join(''))).toBe(true)
    expect(labelsOf(s).filter((l) => l.color === RED && /^[01]$/.test(l.text ?? ''))).toHaveLength(5)
    expect(texts(s)).toEqual(expect.arrayContaining(['d', 'd differs from every row']))
  })

  it('Natural numbers: eight equally spaced dots 0…7 with a successor arrow n → n + 1 between neighbours; the three green arcs run 2 → 3 → 4 → 5 (2 + 3 = 5); induction from 0 along the arrows reaches every dot, which all turn green', () => {
    const s = M.buildNaturalNumbersScene(), { x0, dx, n } = M.NNM
    const dd = dots(s, INK).filter((d) => d.radius === 0.13).map((d) => d.position!).sort((a, b) => a[0] - b[0]); expect(dd).toHaveLength(n)
    dd.forEach((p, k) => { expect(p[0]).toBeCloseTo(x0 + dx * k, 1); expect(labelAt(s, [p[0], p[1] - 0.55])!.text).toBe(String(k)) })
    const succ = arrows(s, BLUE).map((o) => [nearest(o.from!, dd), nearest(o.to!, dd)]); expect(succ).toHaveLength(7); succ.forEach(([a, b]) => expect(b).toBe(a + 1))
    expect(labelsOf(s).filter((l) => l.text === 'S')).toHaveLength(7)
    const hops = pathsOf(s, GREEN, 8).filter((p) => p.points!.length === 11).map((p) => [nearest(p.points![0], dd), nearest(p.points![p.points!.length - 1], dd)].sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]); expect(hops).toEqual([[2, 3], [3, 4], [4, 5]])   // three successor steps from 2
    const landing = 2 + 3; expect(landing).toBe(5); expect(hops.map((h) => Math.max(...h))).toEqual([3, 4, 5])
    let reached = new Set([0]); for (let pass = 0; pass < n; pass++) succ.forEach(([a, b]) => { if (reached.has(a)) reached.add(b) }); expect(reached.size).toBe(n)                // induction reaches every dot
    expect(dots(s, GREEN).filter((d) => d.radius === 0.16)).toHaveLength(n)
    expect(texts(s)).toEqual(expect.arrayContaining(['2 + 3 = 5', 'induction', 'first']))
  })

  it('Ordinal numbers: the finite ordinals crowd toward a limit with halving gaps, the green ring ω sits at that limit after all of them (no predecessor), and ω + 1, ω + 2, ω + 3 follow in order', () => {
    const s = M.buildOrdinalNumberScene(), { nFinite } = M.ORD
    const fin = dots(s, INK).filter((d) => d.radius === 0.1).map((d) => d.position![0]).sort((a, b) => a - b); expect(fin).toHaveLength(nFinite)
    const gaps = fin.slice(1).map((x, i) => x - fin[i]); gaps.slice(1, 5).forEach((g, i) => expect(Math.abs(g / gaps[i] - 0.5)).toBeLessThan(0.08))                       // each gap half the last
    const ring = pathsOf(s, GREEN, 20)[0], omega = (Math.max(...ring.points!.map((q) => q[0])) + Math.min(...ring.points!.map((q) => q[0]))) / 2
    fin.forEach((x) => expect(x).toBeLessThan(omega)); expect(omega - fin[fin.length - 1]).toBeLessThan(gaps[gaps.length - 1] * 1.2 + 0.1); expect(omega).toBeCloseTo(M.ordOmega()[0], 1)  // after all of them
    expect(omega - fin[fin.length - 1]).toBeGreaterThan(0); expect(fin[fin.length - 1] - fin[fin.length - 2]).toBeGreaterThan(omega - fin[fin.length - 1] - 0.001)  // ω is the limit: remaining distance ≤ last gap
    const succ = dots(s, BLUE).map((d) => d.position![0]).sort((a, b) => a - b); expect(succ).toHaveLength(3); succ.forEach((x, k) => { expect(x).toBeGreaterThan(omega); expect(x).toBeCloseTo(M.ordSucc(k + 1)[0], 1) })
    succ.slice(1).forEach((x, i) => expect(x).toBeGreaterThan(succ[i]))
    ;[1, 2, 3].forEach((k) => expect(labelAt(s, [succ[k - 1], M.ORD.y - 0.55])!.text).toBe(`ω+${k}`)); expect(labelAt(s, [omega, M.ORD.y - 0.55])!.text).toBe('ω')
    expect(texts(s)).toEqual(expect.arrayContaining(['limit', 'successors']))
  })

  it('Proof by induction: the first domino is green after the base case, the seven arrows run n → n + 1, and closing {1} under them turns all eight dominoes green', () => {
    const s = M.buildProofByInductionScene(), { n } = M.IND
    const boxes = Array.from({ length: n }, (_, k) => M.indBox(k)), greenBoxes = (step: number) => { const bs = s.steps.slice(0, step + 1).flatMap((st) => (st.objects as Obj[]).filter((o) => o.type === 'bond' && o.color === GREEN && o.from && o.to && near(o.thickness ?? 0, 0.09, 1e-9))); return boxes.map((b, k) => bs.some((o) => near(o.from![0], b.x0, 0.01) || near(o.to![0], b.x0, 0.01)) ? k : -1).filter((k) => k >= 0) }
    expect(greenBoxes(0)).toEqual([0])                                                                                                                  // base case: only domino 1
    const imp = arrows(s, BLUE).map((o) => [boxes.findIndex((b) => Math.abs(o.from![0] - b.x1) < 0.02), boxes.findIndex((b) => Math.abs(o.to![0] - b.x0) < 0.02)]); expect(imp).toHaveLength(7); imp.forEach(([a, b]) => { expect(a).toBeGreaterThanOrEqual(0); expect(b).toBe(a + 1) })
    let truth = new Set(greenBoxes(0)); for (let pass = 0; pass < n; pass++) imp.forEach(([a, b]) => { if (truth.has(a)) truth.add(b) }); expect([...truth].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(greenBoxes(2)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])                                                                                              // every domino ends up green
    boxes.forEach((b, k) => expect(labelAt(s, [b.x0 + M.IND.w / 2, M.IND.y - 0.5])!.text).toBe(String(k + 1)))
    expect(texts(s)).toEqual(expect.arrayContaining(['P(1) true', 'P(n) ⟹ P(n + 1)', 'P(n) for every n']))
  })

  it('Strong induction: in the drawn factor tree every parent is the product of its children, each child is smaller than its parent and at least 2, the leaves 2, 3, 2, 5 are prime (green) and multiply to 60', () => {
    const s = M.buildStrongInductionScene(), { nodes, edges } = M.SIN
    const dd = dots(s).filter((d) => d.radius === 0.16 || d.radius === 0.22).map((d) => d.position!); const uniq: number[][] = []; dd.forEach((p) => { if (!uniq.some((q) => dist(p, q) < 0.01)) uniq.push(p) }); expect(uniq).toHaveLength(7)
    const valueAt = (p: number[]) => Number(labelAt(s, [p[0] + 0.55, p[1] + 0.1])!.text)
    const segs = bonds(s, SLATE, 0.04).map((o) => { const a = uniq[nearest(o.from!, uniq)], b = uniq[nearest(o.to!, uniq)]; return a[1] > b[1] ? { parent: a, child: b } : { parent: b, child: a } }); expect(segs).toHaveLength(6)
    const kids = (p: number[]) => segs.filter((x) => dist(x.parent, p) < 0.01).map((x) => valueAt(x.child))
    uniq.forEach((p) => { const k = kids(p); if (k.length) { expect(k).toHaveLength(2); expect(k[0] * k[1]).toBe(valueAt(p)); k.forEach((c) => { expect(c).toBeLessThan(valueAt(p)); expect(c).toBeGreaterThanOrEqual(2) }) } })   // n = a × b with 2 ≤ a, b < n
    const leaves = uniq.filter((p) => kids(p).length === 0); expect(leaves).toHaveLength(4); leaves.forEach((p) => expect(M.isPrimeN(valueAt(p))).toBe(true))
    expect(leaves.map(valueAt).sort((a, b) => a - b)).toEqual([2, 2, 3, 5]); expect(leaves.map(valueAt).reduce((a, b) => a * b, 1)).toBe(60)
    expect(dots(s, GREEN).filter((d) => d.radius === 0.22)).toHaveLength(4); leaves.forEach((p) => expect(dots(s, GREEN).some((d) => dist(d.position!, p) < 0.01)).toBe(true))
    expect(M.isPrimeN(6)).toBe(false); expect(M.isPrimeN(10)).toBe(false); expect(Object.keys(nodes)).toHaveLength(7); expect(edges).toHaveLength(6)
    expect(texts(s)).toEqual(expect.arrayContaining(['assume for all k < 60', '2 · 2 · 3 · 5 = 60']))
  })

  it('Truth table: the drawn T / F entries of p ∧ q, p ∨ q and p ⇒ q equal the logical operations on the drawn (p, q) rows; the implication is false only in the row T, F', () => {
    const s = M.buildTruthTableScene(), { xs, head, rows } = M.TRT
    const entry = (c: number, r: number) => labelAt(s, M.trtCell(c, r) as number[])!.text === 'T'
    rows.forEach(([p, q], r) => { expect(entry(0, r)).toBe(p); expect(entry(1, r)).toBe(q) })
    const table = rows.map((_, r) => ({ p: entry(0, r), q: entry(1, r), and: entry(2, r), or: entry(3, r), imp: entry(4, r) }))
    table.forEach((t) => { expect(t.and).toBe(t.p && t.q); expect(t.or).toBe(t.p || t.q); expect(t.imp).toBe(!t.p || t.q) })
    expect(new Set(table.map((t) => `${t.p}${t.q}`)).size).toBe(4)                                                                                      // all four combinations once
    expect(table.filter((t) => !t.imp).map((t) => [t.p, t.q])).toEqual([[true, false]])                                                                 // p ⇒ q fails only for T, F
    expect(table.map((t) => (t.and ? 'T' : 'F')).join('')).toBe('TFFF'); expect(table.map((t) => (t.or ? 'T' : 'F')).join('')).toBe('TTTF'); expect(table.map((t) => (t.imp ? 'T' : 'F')).join('')).toBe('TFTT')
    ;[labelsOf(s).find((l) => l.text === 'p∧q'), labelsOf(s).find((l) => l.text === 'p∨q'), labelsOf(s).find((l) => l.text === 'p⇒q')].forEach((l, i) => { expect(l).toBeDefined(); expect(l!.position![0]).toBeCloseTo(xs[2 + i], 1); expect(l!.position![1]).toBeCloseTo(head, 1) })
    const colors = (c: number) => rows.map((_, r) => labelAt(s, M.trtCell(c, r) as number[])!.color); colors(2).forEach((col, r) => expect(col).toBe(table[r].and ? GREEN : RED))
  })

  it('Logical equivalence: ¬(p ∧ q) and ¬p ∨ ¬q have identical drawn columns F T T T (equivalent, green frame), while p ∧ q is the opposite in every row (red frame)', () => {
    const s = M.buildLogicalEquivalenceScene(), { rows } = M.LEQ
    const entry = (c: number, r: number) => labelAt(s, M.leqCell(c, r) as number[])!.text === 'T'
    const col = (c: number) => rows.map((_, r) => entry(c, r))
    const P = col(0), Q = col(1), A = col(2), B = col(3), C = col(4)
    expect(P).toEqual(rows.map((r) => r[0])); expect(Q).toEqual(rows.map((r) => r[1]))
    expect(A).toEqual(P.map((p, i) => !(p && Q[i]))); expect(B).toEqual(P.map((p, i) => !p || !Q[i])); expect(C).toEqual(P.map((p, i) => p && Q[i]))        // each column is what its header says
    expect(A).toEqual(B)                                                                                                                                  // ¬(p∧q) ≡ ¬p∨¬q: same value in every row
    expect(C.every((v, i) => v !== A[i])).toBe(true); expect(C).not.toEqual(A)                                                                           // p∧q is never equal to ¬(p∧q)
    expect(A.map((v) => (v ? 'T' : 'F')).join('')).toBe('FTTT')
    const frame = (color: string) => { const bs = bonds(s, color, 0.04); const xs = bs.flatMap((o) => [o.from![0], o.to![0]]); return { x0: Math.min(...xs), x1: Math.max(...xs) } }
    const green = frame(GREEN), red = frame(RED); expect(M.LEQ.xs[2]).toBeGreaterThan(green.x0); expect(M.LEQ.xs[3]).toBeLessThan(green.x1); expect(M.LEQ.xs[2] > red.x0 && M.LEQ.xs[2] < red.x1).toBe(false); expect(M.LEQ.xs[4]).toBeGreaterThan(red.x0); expect(M.LEQ.xs[4]).toBeLessThan(red.x1)
    expect(texts(s)).toEqual(expect.arrayContaining(['¬(p∧q)', '¬p∨¬q', 'p∧q', 'equivalent', 'not equivalent']))
  })
})
