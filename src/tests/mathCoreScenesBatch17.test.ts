/**
 * Mathematics visual campaign, batch 17 (2026-10-12): fundamental theorem of algebra, rational inequality, Pascal's
 * triangle, the sieve of Eratosthenes, modular arithmetic, convergent / divergent sequences, geometric series, the
 * comparison and integral tests, alternating series (plus the exponential and logarithm algebra concepts, which share
 * the batch-2 figures of their math.func twins). Each test reads points, bars, arrows and numerals back from the DRAWN
 * coordinates and compares them with an independent calculation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB17'
import * as B2 from '@/lib/teaching/sceneGenerators/mathCoreScenesB2'

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
  ['math.alg.exponential-function', B2.buildExponentialFunctionScene, 'math-exponential-function'],
  ['math.alg.logarithm', B2.buildLogarithmicFunctionScene, 'math-logarithmic-function'],
  ['math.alg.fundamental-theorem-algebra', M.buildFundamentalTheoremAlgebraScene, 'math-fundamental-theorem-algebra'],
  ['math.alg.rational-inequality', M.buildRationalInequalityScene, 'math-rational-inequality'],
  ['math.alg.pascals-triangle', M.buildPascalsTriangleScene, 'math-pascals-triangle'],
  ['math.nt.sieve-of-eratosthenes', M.buildSieveOfEratosthenesScene, 'math-sieve-of-eratosthenes'],
  ['math.nt.modular-arithmetic', M.buildModularArithmeticScene, 'math-modular-arithmetic'],
  ['math.seq.convergent', M.buildConvergentSequenceScene, 'math-convergent-sequence'],
  ['math.seq.divergent-sequence', M.buildDivergentSequenceScene, 'math-divergent-sequence'],
  ['math.seq.geometric-series', M.buildGeometricSeriesScene, 'math-geometric-series'],
  ['math.seq.comparison-test', M.buildComparisonTestScene, 'math-comparison-test'],
  ['math.seq.integral-test', M.buildIntegralTestScene, 'math-integral-test'],
  ['math.seq.alternating-series', M.buildAlternatingSeriesScene, 'math-alternating-series'],
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

// ── readers ────────────────────────────────────────────────────────────────────────────────────────
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const bbox = (ls: Obj[]) => {
  const xs = ls.flatMap((o) => [o.from![0], o.to![0]]), ys = ls.flatMap((o) => [o.from![1], o.to![1]])
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}
const labelAtXY = (s: SceneSpec, x: number, y: number, tol = 0.02) => labelsOf(s).find((o) => near(o.position![0], x, tol) && near(o.position![1], y, tol))
const byX = (a: Obj, b: Obj) => a.position![0] - b.position![0]
const cmul = (a: number[], b: number[]) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
const cpow3 = (z: number[]) => cmul(cmul(z, z), z)
const deg = (z: number[]) => ((Math.atan2(z[1], z[0]) * 180) / Math.PI + 360) % 360
const numeralsOf = (s: SceneSpec) => labelsOf(s).filter((o) => /^\d+$/.test(o.text ?? ''))

describe('the mathematics each figure draws', () => {
  it('Fundamental theorem of algebra: the three drawn roots of z³ − 1 satisfy z³ = 1, sit 120° apart on the unit circle (sum 0, product 1); (z − 1)²(z + 1) has 1 twice and −1 once = 3 with multiplicity', () => {
    const s = M.buildFundamentalTheoremAlgebraScene(), { cx, u } = M.FTA
    const green = dots(s, GREEN).filter((d) => d.radius === 0.13)
    const left = green.filter((d) => d.position![0] < 0).map((d) => [(d.position![0] - cx[0]) / u, d.position![1] / u]), right = green.filter((d) => d.position![0] > 0).map((d) => [(d.position![0] - cx[1]) / u, d.position![1] / u])
    expect(left).toHaveLength(3); expect(right).toHaveLength(2)
    for (const z of left) { expect(Math.hypot(z[0], z[1])).toBeCloseTo(1, 1); const c = cpow3(z); expect(c[0]).toBeCloseTo(1, 1); expect(c[1]).toBeCloseTo(0, 1) }   // z³ = 1
    expect(left.map(deg).sort((a, b) => a - b)).toEqual(approx([0, 120, 240], 0))                                                                        // 120° apart
    expect(sum(left.map((z) => z[0]))).toBeCloseTo(0, 1); expect(sum(left.map((z) => z[1]))).toBeCloseTo(0, 1)                                           // Vieta: z³ + 0z² + 0z − 1 has root sum 0 ...
    const prod = left.reduce((p, z) => cmul(p, z), [1, 0]); expect(prod[0]).toBeCloseTo(1, 1); expect(prod[1]).toBeCloseTo(0, 1)                         // ... and product 1
    expect(left.length).toBe(3)                                                                                                                           // = the degree
    const circle = paths(s, VIOLET).find((p) => p.points!.length >= 70)!.points!
    for (const q of circle) expect(Math.hypot(q[0] - cx[0], q[1]) / u).toBeCloseTo(1, 1)
    const spokes = bonds(s, VIOLET, 0.02); expect(spokes).toHaveLength(3); for (const g of spokes) expect(len(g) / u).toBeCloseTo(1, 1)
    const rr = right.map((z) => Math.round(z[0] * 10) / 10).sort((a, b) => a - b); expect(rr).toEqual([-1, 1])
    const p = (z: number) => (z - 1) ** 2 * (z + 1); expect(p(1)).toBe(0); expect(p(-1)).toBe(0)                                                         // both are roots of (z − 1)²(z + 1) = z³ − z² − z + 1
    expect([1, -1, -1, 1].reduce((acc, c) => acc * 2 + c, 0)).toBe(p(2))                                                                                  // the expansion has degree 3
    const rings = paths(s, RED).filter((q) => q.points!.length === 25); expect(rings).toHaveLength(1)
    const rc = [mean(rings[0].points!.slice(0, -1).map((q) => q[0])), mean(rings[0].points!.slice(0, -1).map((q) => q[1]))]
    expect((rc[0] - cx[1]) / u).toBeCloseTo(1, 1)                                                                                                         // the ring sits on the root 1: multiplicity 2
    expect(2 + 1).toBe(3)
    expect(texts(s)).toEqual(expect.arrayContaining(['roots of z³ = 1', '3 roots, 120° apart', '(z − 1)²(z + 1)', 'root 1 counts twice']))
  })

  it('Rational inequality: the drawn graph is y = (x − 1)/(x + 2) with a pole at −2 and a zero at 1; the signs + − + and the green segments (x < −2 or x > 1) match where it is positive', () => {
    const s = M.buildRationalInequalityScene(), { ox, oy, ux, uy, chartY, zero, pole, x } = M.RAT
    const inv = (p: number[]) => [(p[0] - ox) / ux, (p[1] - oy) / uy]
    const branches = paths(s, BLUE); expect(branches).toHaveLength(2)
    for (const br of branches) for (const q of br.points!) { const [px, py] = inv(q), fp = Math.abs(3 / (px + 2) ** 2); expect(Math.abs(py - M.ratF(px))).toBeLessThan(0.012 + 0.012 * fp) }   // every drawn point is on the curve
    const [lo, hi] = [...branches].sort((a, b) => a.points![0][0] - b.points![0][0]).map((b) => b.points!.map((q) => inv(q)[0]))
    expect(Math.max(...lo)).toBeLessThan(-2); expect(Math.min(...hi)).toBeGreaterThan(-2)                                                                  // no branch crosses the asymptote
    const asym = bonds(s, VIOLET, 0.02)[0]; expect(inv(asym.from!)[0]).toBeCloseTo(pole, 1); expect(inv(asym.to!)[0]).toBeCloseTo(pole, 1)
    const zd = dots(s, GREEN).find((d) => d.radius === 0.12)!; expect(inv(zd.position!)[0]).toBeCloseTo(zero, 1); expect(inv(zd.position!)[1]).toBeCloseTo(0, 1); expect(M.ratF(zero)).toBe(0)
    const rings = paths(s, VIOLET).filter((p) => p.points!.length === 25).map((p) => Math.round(((mean(p.points!.slice(0, -1).map((q) => q[0])) - ox) / ux) * 10) / 10).sort((a, b) => a - b)
    expect(rings).toEqual([pole, zero])                                                                                                                   // open circles at −2 and 1
    const signs = labelsOf(s).filter((o) => o.text === '+' || o.text === '−').sort(byX)
    expect(signs.map((o) => o.text)).toEqual(['+', '−', '+'])
    signs.forEach((o) => expect(M.ratF((o.position![0] - ox) / ux) > 0).toBe(o.text === '+'))                                                              // each sign matches the quotient there
    const segs = bonds(s, GREEN, 0.07).map((o) => [(o.from![0] - ox) / ux, (o.to![0] - ox) / ux].sort((a, b) => a - b)).sort((a, b) => a[0] - b[0])
    expect(segs).toHaveLength(2); expect(segs[0][0]).toBeCloseTo(x[0], 1); expect(segs[0][1]).toBeCloseTo(pole, 1); expect(segs[1][0]).toBeCloseTo(zero, 1); expect(segs[1][1]).toBeCloseTo(x[1], 1)
    const inSol = (v: number) => segs.some(([a, b]) => v > a && v < b)
    for (let v = x[0] + 0.025; v <= x[1]; v += 0.05) { if (Math.abs(v - pole) < 0.03 || Math.abs(v - zero) < 0.03) continue; expect(inSol(v), `x = ${v.toFixed(2)}`).toBe(M.ratF(v) > 0) }   // the green set is exactly where the quotient is positive
    expect(M.ratF(-3)).toBe(4); expect(M.ratF(0)).toBe(-0.5); expect(M.ratF(3)).toBe(0.4)
    expect(Math.abs(chartY)).toBeGreaterThan(0)
    expect(texts(s)).toEqual(expect.arrayContaining(['not allowed: −2', 'zero at 1', 'x < −2 or x > 1']))
  })

  it("Pascal's triangle: the drawn numerals are C(n, k); each inner entry is the sum of the two above (4 + 6 = 10); each row sums to 2ⁿ; the triangle is symmetric", () => {
    const s = M.buildPascalsTriangleScene(), { rows, dx, dy, y0, xSum, gap } = M.PASC
    const nums = numeralsOf(s)
    const entry = nums.filter((o) => o.color === INK), sumsLbl = nums.filter((o) => o.color === BLUE)
    expect(entry).toHaveLength((rows * (rows + 1)) / 2)
    const grid: Record<string, number> = {}
    for (const o of entry) { const n = Math.round((y0 - o.position![1]) / dy), k = Math.round(o.position![0] / dx + n / 2); expect(o.position![0]).toBeCloseTo((k - n / 2) * dx, 6); grid[`${n},${k}`] = Number(o.text) }
    for (let n = 0; n < rows; n++) for (let k = 0; k <= n; k++) {
      expect(grid[`${n},${k}`]).toBe(M.choose(n, k))                                                                                                      // C(n, k)
      if (k > 0 && k < n) expect(grid[`${n},${k}`]).toBe(grid[`${n - 1},${k - 1}`] + grid[`${n - 1},${k}`])                                              // the sum of the two above
      expect(grid[`${n},${k}`]).toBe(grid[`${n},${n - k}`])                                                                                              // symmetric
    }
    for (let n = 0; n < rows; n++) {
      const drawn = sumsLbl.find((o) => near(o.position![1], y0 - n * dy, 1e-6) && near(o.position![0], xSum, 1e-6))!
      expect(Number(drawn.text)).toBe(2 ** n); expect(Number(drawn.text)).toBe(sum(Array.from({ length: n + 1 }, (_, k) => grid[`${n},${k}`])))           // row sum = 2ⁿ
    }
    const [h, v] = [bonds(s, GREEN, 0.04).find((o) => near(o.from![1], o.to![1], 1e-9))!, bonds(s, GREEN, 0.04).find((o) => near(o.from![0], o.to![0], 1e-9))!]
    const xs = (n: number, k: number) => (k - n / 2) * dx
    expect(h.from![0]).toBeCloseTo(xs(4, 1), 6); expect(h.to![0]).toBeCloseTo(xs(4, 2), 6); expect(v.from![0]).toBeCloseTo((xs(4, 1) + xs(4, 2)) / 2, 6)     // the bracket spans the 4 and the 6 and drops to the 10 between them
    expect(v.from![0]).toBeCloseTo(xs(5, 2), 6); expect(v.from![1]).toBeCloseTo(y0 - 4 * dy - gap, 6); expect(grid['4,1'] + grid['4,2']).toBe(grid['5,2']); expect(grid['5,2']).toBe(10)
    expect(texts(s)).toEqual(expect.arrayContaining(['4 + 6 = 10', 'C(5, 2) = 10', 'row sum']))
  })

  it('Sieve of Eratosthenes: each composite on 1…49 is underlined once, in the colour of its smallest prime factor (2 red 23, 3 blue 7, 5 violet 2, 7 grey 1); the 15 un-underlined numbers above 1 get green and are exactly the primes', () => {
    const s = M.buildSieveOfEratosthenesScene(), { n, cols, x0, y0, dx, dy, my, hw } = M.SIEVE
    const nums = numeralsOf(s); expect(nums).toHaveLength(n)
    for (const o of nums) { const k = Number(o.text), i = k - 1; expect(o.position![0]).toBeCloseTo(x0 + (i % cols) * dx, 2); expect(o.position![1]).toBeCloseTo(y0 - Math.floor(i / cols) * dy, 2) }   // 1…49 in reading order
    const marks = lines(s).filter((o) => o.type === 'bond' && [0.05, 0.07].some((t) => near(o.thickness ?? 0, t, 1e-9)))
    const markOf = (k: number) => marks.filter((m) => near((m.from![0] + m.to![0]) / 2, nums.find((o) => Number(o.text) === k)!.position![0], 0.011) && near(m.from![1], nums.find((o) => Number(o.text) === k)!.position![1] + my, 0.011))
    const isPrime = (k: number) => { if (k < 2) return false; for (let p = 2; p * p <= k; p++) if (k % p === 0) return false; return true }
    const colorFor: Record<number, string> = { 2: RED, 3: BLUE, 5: VIOLET, 7: SLATE }
    for (let k = 1; k <= n; k++) {
      const m = markOf(k)
      if (k === 1) { expect(m).toHaveLength(0); continue }
      expect(m, `marker on ${k}`).toHaveLength(1)
      expect(m[0].color).toBe(isPrime(k) ? GREEN : colorFor[M.spf(k)])                                                                                    // prime → green; composite → colour of its smallest prime factor
      expect(len(m[0])).toBeCloseTo(2 * hw, 1)
    }
    const count = (c: string) => [...Array(n)].map((_, i) => i + 1).filter((k) => k >= 2 && markOf(k)[0]?.color === c).length
    expect([count(RED), count(BLUE), count(VIOLET), count(SLATE), count(GREEN)]).toEqual([23, 7, 2, 1, 15])
    const primes = [...Array(n)].map((_, i) => i + 1).filter((k) => markOf(k)[0]?.color === GREEN)
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47])
    expect(Math.sqrt(49)).toBe(7); for (let k = 8; k <= n; k++) if (!isPrime(k)) expect(M.spf(k)).toBeLessThanOrEqual(7)                                       // only primes up to √49 are needed
    expect(texts(s)).toEqual(expect.arrayContaining(['multiples of 2', 'then 3, 5, 7', '15 primes']))
  })

  it('Modular arithmetic: the clock holds 0…4 clockwise from the top; four arrows walk from 3 to 2 (3 + 4 = 7 ≡ 2 mod 5); in the table of 0…14 the column of 2, 7, 12 is outlined and every number sits in column n mod 5', () => {
    const s = M.buildModularArithmeticScene(), { m, c, rl, table } = M.MOD
    const nodes = dots(s, INK).filter((d) => d.radius === 0.13)
    expect(nodes).toHaveLength(m)
    const resOf = (p: number[]) => { const a = (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI; return ((Math.round((90 - a) / 72) % m) + m) % m }
    expect(nodes.map((d) => resOf(d.position!)).sort()).toEqual([0, 1, 2, 3, 4])
    for (const d of nodes) { const r = resOf(d.position!); expect(Math.hypot(d.position![0] - c[0], d.position![1] - c[1])).toBeCloseTo(M.MOD.R, 1)
      const lab = labelsOf(s).find((o) => Math.hypot(o.position![0] - c[0], o.position![1] - c[1]) > rl - 0.05 && Math.hypot(o.position![0] - c[0], o.position![1] - c[1]) < rl + 0.05 && resOf(o.position!) === r)!
      expect(Number(lab.text)).toBe(r) }                                                                                                                  // each numeral names the residue where its dot sits
    const nodeAt = (p: number[]) => resOf(nodes.reduce((best, d) => (dist(d.position!, p) < dist(best.position!, p) ? d : best)).position!)
    const hops = arrows(s, RED); expect(hops).toHaveLength(4)
    const path = hops.map((h) => [nodeAt(h.from!), nodeAt(h.to!)])
    expect(path).toEqual([[3, 4], [4, 0], [0, 1], [1, 2]])                                                                                                // 3 → 4 → 0 → 1 → 2 (clockwise)
    expect(path[path.length - 1][1]).toBe((3 + 4) % m); expect(7 % 5).toBe(2)
    const tbl = numeralsOf(s).filter((o) => o.position![0] > 0 && o.color === INK)
    expect(tbl).toHaveLength(15)
    for (const o of tbl) { const k = Number(o.text); expect(o.position![0]).toBeCloseTo(table.x0 + (k % m) * table.dx, 6); expect(o.position![1]).toBeCloseTo(table.y0 - Math.floor(k / m) * table.dy, 6) }   // column = n mod 5
    const box = bbox(bonds(s, GREEN, 0.04))
    const inside = tbl.filter((o) => o.position![0] > box.x0 && o.position![0] < box.x1 && o.position![1] > box.y0 && o.position![1] < box.y1).map((o) => Number(o.text)).sort((a, b) => a - b)
    expect(inside).toEqual([2, 7, 12]); expect(inside.every((k) => k % 5 === 2)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['mod 5', '3 + 4 = 7', '7 ≡ 2 (mod 5)', 'same remainder']))
  })

  it('Convergent sequence: the points are (n, 1/n); for ε = 0.2 the least N with all later terms inside the band is 5 and for ε = 0.1 it is 10; the colours split the terms exactly there', () => {
    const s = M.buildConvergentSequenceScene(), { x0, y0, ux, uy, nMax, eps, N } = M.CONV
    const toNA = (p: number[]) => [(p[0] - x0) / ux, (p[1] - y0) / uy]
    const pts = dots(s, INK).filter((d) => d.radius === 0.09).map((d) => toNA(d.position!)).sort((a, b) => a[0] - b[0])
    expect(pts).toHaveLength(nMax)
    pts.forEach(([n, a], i) => { expect(n).toBeCloseTo(i + 1, 2); expect(a).toBeCloseTo(1 / (i + 1), 2) })
    const bandLevels = (color: string) => bonds(s, color, 0.025).map((o) => (o.from![1] - y0) / uy).sort((a, b) => a - b)
    expect(bandLevels(VIOLET).map((v) => Math.round(v * 100) / 100)).toEqual([-0.2, 0.2]); expect(bandLevels(BLUE).map((v) => Math.round(v * 100) / 100)).toEqual([-0.1, 0.1])
    const leastN = (e: number) => { let last = 0; for (let n = 1; n <= 2000; n++) if (Math.abs(1 / n) >= e - 1e-12) last = n; return last }
    expect(leastN(0.2)).toBe(5); expect(leastN(0.1)).toBe(10); expect(M.convN(0.2)).toBe(5); expect(M.convN(0.1)).toBe(10)
    const guides = (color: string) => bonds(s, color, 0.02).map((o) => (o.from![0] - x0) / ux)
    expect(Math.abs(guides(VIOLET)[0] - (N[0] + 0.5))).toBeLessThan(0.011); expect(Math.abs(guides(BLUE)[0] - (N[1] + 0.5))).toBeLessThan(0.011)               // the vertical line sits just after N
    const marks = dots(s).filter((d) => d.radius === 0.15).map((d) => ({ n: Math.round(toNA(d.position!)[0]), color: d.color }))
    expect(marks).toHaveLength(nMax)
    for (const mk of marks) expect(mk.color).toBe(Math.abs(1 / mk.n) < eps[0] ? GREEN : RED)                                                             // green ⇔ inside the ε = 0.2 band
    expect(marks.filter((mk) => mk.color === RED).map((mk) => mk.n).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5])
    for (let n = N[0] + 1; n <= 2000; n++) expect(Math.abs(1 / n)).toBeLessThan(eps[0])                                                                    // from N + 1 on, always inside
    expect(texts(s)).toEqual(expect.arrayContaining(['limit 0', 'ε 0.2: N 5', 'ε 0.1: N 10']))
  })

  it('Divergent sequence: (−1)ⁿ alternates −1, 1 and no band of half-width 0.5 around 0 (nor around any L) catches a term; aₙ = n rises, and every term past n = 6 is above the bound 6', () => {
    const s = M.buildDivergentSequenceScene(), { xA, xB, dxn, n, yA, uA, yB0, uB, M: bound } = M.DIVG
    const left = dots(s).filter((d) => d.radius === 0.12 && d.position![0] < xB - 0.2).map((d) => ({ k: Math.round((d.position![0] - xA) / dxn), a: (d.position![1] - yA) / uA, c: d.color })).sort((p, q) => p.k - q.k)
    expect(left).toHaveLength(n)
    left.forEach((p) => { expect(p.a).toBeCloseTo(p.k % 2 === 0 ? 1 : -1, 1); expect(p.c).toBe(p.k % 2 === 0 ? BLUE : RED) })                              // (−1)ⁿ
    const bands = bonds(s, VIOLET, 0.025).filter((o) => o.from![0] < 0).map((o) => (o.from![1] - yA) / uA).sort((a, b) => a - b)
    expect(bands.map((v) => Math.round(v * 100) / 100)).toEqual([-0.5, 0.5]); for (const p of left) expect(Math.abs(p.a)).toBeGreaterThan(0.5)             // no term enters the band around 0
    for (let L = -3; L <= 3; L += 0.01) expect(Math.max(Math.abs(1 - L), Math.abs(-1 - L))).toBeGreaterThanOrEqual(1 - 1e-12)                          // for every L some term is ≥ 1 away
    const right = dots(s).filter((d) => d.radius === 0.12 && d.position![0] >= xB - 0.2).map((d) => ({ k: Math.round((d.position![0] - xB) / dxn), a: (d.position![1] - yB0) / uB, c: d.color })).sort((p, q) => p.k - q.k)
    expect(right).toHaveLength(n)
    right.forEach((p, i) => { expect(p.a).toBeCloseTo(i + 1, 1); if (i > 0) expect(p.a).toBeGreaterThan(right[i - 1].a) })                                 // aₙ = n, increasing
    const line6 = bonds(s, VIOLET, 0.025).find((o) => o.from![0] > 0)!; expect((line6.from![1] - yB0) / uB).toBeCloseTo(bound, 1)
    right.forEach((p) => expect(p.c).toBe(p.k > bound ? GREEN : INK)); expect(right.filter((p) => p.a > bound).map((p) => p.k)).toEqual([7, 8, 9, 10])    // exactly the terms past 6 exceed the bound
    expect(texts(s)).toEqual(expect.arrayContaining(['(−1)ⁿ: oscillates', 'no limit L', 'n: grows without bound', 'passes any bound M']))
  })

  it('Geometric series: the pieces are 1, ½, ¼, … (ratio ½) laid end to end; their ends are the partial sums 1, 1.5, 1.75, 1.875 = a(1 − rⁿ)/(1 − r) and the sum to infinity is a/(1 − r) = 2', () => {
    const s = M.buildGeometricSeriesScene(), { x0, u, a, r, terms } = M.GSE
    const segs = bonds(s, BLUE, 0.16).concat(bonds(s, RED, 0.16)).sort((p, q) => p.from![0] - q.from![0])
    expect(segs).toHaveLength(terms)
    const val = (x: number) => (x - x0) / u
    segs.forEach((g, i) => {
      expect(val(g.from![0])).toBeCloseTo((a * (1 - r ** i)) / (1 - r), 2); expect(val(g.to![0])).toBeCloseTo((a * (1 - r ** (i + 1))) / (1 - r), 2)       // each piece ends at the next partial sum
      if (i > 0) expect(g.from![0]).toBeCloseTo(segs[i - 1].to![0], 6)                                                                                   // end to end
      if (i > 0 && i < 4) expect(len(g) / len(segs[i - 1])).toBeCloseTo(r, 1)                                                                            // ratio ½
    })
    expect(segs.map((g, i) => (g.color === BLUE ? 'b' : 'r') + i % 2)).toEqual(['b0', 'r1', 'b0', 'r1', 'b0', 'r1'])                                         // alternating colours
    expect([1, 2, 3, 4].map((n) => (a * (1 - r ** n)) / (1 - r))).toEqual([1, 1.5, 1.75, 1.875])
    const lim = dots(s, GREEN).find((d) => d.radius === 0.15)!; expect(val(lim.position![0])).toBeCloseTo(a / (1 - r), 2); expect(a / (1 - r)).toBe(2)       // the limit
    for (const [n, t] of [[1, '1'], [2, '1.5'], [3, '1.75'], [4, '1.875']] as const) expect(labelAtXY(s, x0 + M.partialSum(n) * u, 0.8 - 0.7)!.text).toBe(t)
    const gap = bonds(s, GREEN, 0.05)[0]; expect(val(gap.from![0])).toBeCloseTo(1.875, 2); expect(val(gap.to![0])).toBeCloseTo(2, 2)                         // the remaining gap 2 − S₄ = 1/8
    expect(2 - 1.875).toBe(0.125); expect(texts(s)).toEqual(expect.arrayContaining(['a 1, ratio ½', 'sum to ∞: 2', 'gap left']))
  })

  it('Comparison test: every drawn red bar aₙ = 1/(n² + 1) is positive and at most the blue bar bₙ = 1/n²; Σbₙ stays below π²/6 ≈ 1.645, so the partial sums of Σaₙ are bounded', () => {
    const s = M.buildComparisonTestScene(), { x0, dx, y0, uy, n, off } = M.CMP
    const bar = (color: string, k: number) => { const b = bonds(s, color, 0.09).find((o) => near(o.from![0], x0 + k * dx + (color === BLUE ? -off : off), 1e-6))!; return (b.to![1] - b.from![1]) / uy }
    const bs = Array.from({ length: n }, (_, i) => bar(BLUE, i + 1)), as = Array.from({ length: n }, (_, i) => bar(RED, i + 1))
    bs.forEach((v, i) => expect(v).toBeCloseTo(1 / (i + 1) ** 2, 2)); as.forEach((v, i) => expect(v).toBeCloseTo(1 / ((i + 1) ** 2 + 1), 2))
    as.forEach((v, i) => { expect(v).toBeGreaterThan(0); expect(v).toBeLessThanOrEqual(bs[i] + 1e-9) })                                                   // 0 < aₙ ≤ bₙ
    for (let k = 1; k <= n; k++) expect(1 / (k * k + 1)).toBeLessThan(1 / (k * k))
    const limit = (Math.PI * Math.PI) / 6; expect(limit).toBeCloseTo(1.645, 3)
    expect(sum(bs)).toBeLessThan(limit); expect(sum(as)).toBeLessThan(sum(bs)); expect(sum(as)).toBeCloseTo(0.96, 2)                                         // partial sums of Σaₙ are below those of Σbₙ, below the limit
    let big = 0; for (let k = 1; k <= 100000; k++) big += 1 / (k * k + 1); expect(big).toBeLessThan(limit)
    const nums = numeralsOf(s).filter((o) => o.color === INK); expect(nums.map((o) => Number(o.text)).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(y0).toBeLessThan(0)
    expect(texts(s)).toEqual(expect.arrayContaining(['bₙ: 1/n²', 'aₙ: 1/(n² + 1)', 'aₙ ≤ bₙ', 'Σ bₙ → 1.645', 'so Σ aₙ converges']))
  })

  it('Integral test: for 1/x² the green rectangles (height f(n) on [n − 1, n]) lie under the curve and total less than the area 1 (converges); for 1/x the red rectangles (height f(n) on [n, n + 1]) lie over the curve and total more than ln N (diverges)', () => {
    const s = M.buildIntegralTestScene(), { u, uy, y0, oxL, oxR } = M.INTG
    const rects = (color: string) => {
      const ls = bonds(s, color, 0.02), bottoms = ls.filter((o) => near(o.from![1], y0, 1e-6) && near(o.to![1], y0, 1e-6))
      return bottoms.map((b) => { const xa = Math.min(b.from![0], b.to![0]), xb = Math.max(b.from![0], b.to![0]), topLine = ls.find((o) => near(o.from![1], o.to![1], 1e-9) && o.from![1] > y0 + 1e-6 && near(Math.min(o.from![0], o.to![0]), xa, 1e-6) && near(Math.max(o.from![0], o.to![0]), xb, 1e-6))!; return { xa, xb, h: (topLine.from![1] - y0) / uy } }).sort((p, q) => p.xa - q.xa)
    }
    const L = rects(GREEN), R = rects(RED)
    expect(L).toHaveLength(6); expect(R).toHaveLength(6)
    L.forEach((r, i) => { const n = i + 2; expect((r.xa - oxL) / u).toBeCloseTo(n - 1, 1); expect((r.xb - oxL) / u).toBeCloseTo(n, 1); expect(r.h).toBeCloseTo(1 / (n * n), 1)                              // height f(n) at the RIGHT end
      expect(r.h).toBeLessThanOrEqual(1 / ((n - 1) * (n - 1)) + 1e-9) })                                                                                                                              // never above the curve over [n − 1, n]
    R.forEach((r, i) => { const n = i + 1; expect((r.xa - oxR) / u).toBeCloseTo(n, 1); expect((r.xb - oxR) / u).toBeCloseTo(n + 1, 1); expect(r.h).toBeCloseTo(1 / n, 1)                                 // height f(n) at the LEFT end
      expect(r.h).toBeGreaterThanOrEqual(1 / (n + 1) - 1e-9) })                                                                                                                                       // never below the curve over [n, n + 1]
    const curves = paths(s, BLUE); expect(curves).toHaveLength(2)
    const cl = curves.find((c) => c.points![0][0] < 0)!, cr = curves.find((c) => c.points![0][0] > 0)!
    for (const q of cl.points!) { const x = (q[0] - oxL) / u; expect(Math.abs((q[1] - y0) / uy - 1 / (x * x))).toBeLessThan(0.02 + 0.02 * (2 / x ** 3)) }
    for (const q of cr.points!) { const x = (q[0] - oxR) / u; expect(Math.abs((q[1] - y0) / uy - 1 / x)).toBeLessThan(0.02 + 0.02 / (x * x)) }
    const lowerSum = sum(L.map((r, i) => 1 / (i + 2) ** 2)), upperSum = sum(R.map((r, i) => 1 / (i + 1)))
    expect(lowerSum).toBeLessThan(1 - 1 / 7); expect(1 - 1 / 7).toBeLessThan(1)                                                                                                                        // Σ ≤ ∫₁⁷ dx/x² = 6/7 < 1
    expect(upperSum).toBeGreaterThan(Math.log(7)); expect(upperSum).toBeCloseTo(M.harmonic(6), 12)                                                                                                    // Σ ≥ ∫₁⁷ dx/x = ln 7
    expect(M.harmonic(100000)).toBeGreaterThan(Math.log(100000)); expect(M.harmonic(100000)).toBeGreaterThan(12)                                                                                       // unbounded
    expect(texts(s)).toEqual(expect.arrayContaining(['1/x²', '1/x', 'converges', 'diverges']))
  })

  it('Alternating series: the hop in row n runs from Sₙ₋₁ to Sₙ (length 1/n, right for odd n, left for even n); the ends close in on ln 2 from both sides, within the next hop', () => {
    const s = M.buildAlternatingSeriesScene(), { x0, u, rows, y0, dy } = M.ALT
    const hops = [...arrows(s, BLUE), ...arrows(s, RED)].sort((p, q) => q.from![1] - p.from![1])
    expect(hops).toHaveLength(rows)
    const val = (x: number) => (x - x0) / u
    hops.forEach((h, i) => {
      const n = i + 1
      expect(h.from![1]).toBeCloseTo(y0 - (n - 1) * dy, 6)
      expect(val(h.from![0])).toBeCloseTo(M.altSum(n - 1), 2); expect(val(h.to![0])).toBeCloseTo(M.altSum(n), 2)                                            // from Sₙ₋₁ to Sₙ
      expect(Math.abs(val(h.to![0]) - val(h.from![0]))).toBeCloseTo(1 / n, 2)                                                                              // a hop of length 1/n
      expect(Math.sign(h.to![0] - h.from![0])).toBe(n % 2 === 1 ? 1 : -1); expect(h.color).toBe(n % 2 === 1 ? BLUE : RED)                                 // right, left, right, …
      if (n >= 2) expect(M.altSum(n) < Math.LN2).toBe(n % 2 === 0)                                                                                          // even sums below ln 2, odd sums above
      expect(Math.abs(M.altSum(n) - Math.LN2)).toBeLessThan(1 / (n + 1))                                                                                    // the error is less than the next hop
    })
    const lim = bonds(s, GREEN, 0.04)[0]; expect(val(lim.from![0])).toBeCloseTo(Math.LN2, 2); expect(val(lim.to![0])).toBeCloseTo(Math.LN2, 2)
    expect(Math.abs(altLimit() - Math.LN2)).toBeLessThan(1e-4)
    function altLimit() { let t = 0; for (let k = 1; k <= 20000; k++) t += (k % 2 === 1 ? 1 : -1) / k; return t }
    expect(texts(s)).toEqual(expect.arrayContaining(['1 − ½ + ⅓ − ¼ + …', 'limit ln 2 ≈ 0.693', 'hops shrink to 0']))
  })
})
