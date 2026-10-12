/**
 * Mathematics visual campaign, batch 29 (2026-10-12): the quadratic formula, fractional exponents, radicals, exponential and
 * logarithmic equations, logarithm properties, the natural logarithm, the binomial theorem, and the first number-theory helpers —
 * divisibility, primes (a sieve), composites, prime factorization and the greatest common divisor. Every number a figure states is
 * re-derived here from the DRAWN dots, numerals, arrows, lines, curves and circles, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB29'

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
  ['math.alg.quadratic-formula', M.buildQuadraticFormulaScene, 'math-quadratic-formula'],
  ['math.alg.fractional-exponent', M.buildFractionalExponentScene, 'math-fractional-exponent'],
  ['math.alg.radicals', M.buildRadicalsScene, 'math-radicals'],
  ['math.alg.exponential-equations', M.buildExponentialEquationsScene, 'math-exponential-equations'],
  ['math.alg.logarithm-properties', M.buildLogarithmPropertiesScene, 'math-logarithm-properties'],
  ['math.alg.natural-logarithm', M.buildNaturalLogarithmScene, 'math-natural-logarithm'],
  ['math.alg.logarithmic-equations', M.buildLogarithmicEquationsScene, 'math-logarithmic-equations'],
  ['math.alg.binomial-theorem', M.buildBinomialTheoremScene, 'math-binomial-theorem'],
  ['math.nt.divisibility', M.buildDivisibilityScene, 'math-divisibility'],
  ['math.nt.prime-number', M.buildPrimeNumberScene, 'math-prime-number'],
  ['math.nt.composite-number', M.buildCompositeNumberScene, 'math-composite-number'],
  ['math.nt.prime-factorization', M.buildPrimeFactorizationScene, 'math-prime-factorization'],
  ['math.nt.gcd', M.buildGcdScene, 'math-gcd'],
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
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }
const supNum = (t: string) => Number([...t].map((c) => SUP[c] ?? '').join(''))
const numsIn = (t: string) => (t.replace(/−/g, '-').match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
const num = (t: string) => Number(t.replace('−', '-'))
const hasText = (s: SceneSpec, t: string) => texts(s).includes(t)
/** left-to-right value of an arithmetic string (numbers and + − × ÷) */
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  let acc = Number(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = Number(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
const lhsVal = (t: string) => evalLR(t)
const rhsVal = (t: string) => evalLR(`${t.split('=')[1].trim()} =`)
const inBox = (b: { x0: number; x1: number; y0: number; y1: number }, p: number[]) => p[0] > b.x0 && p[0] < b.x1 && p[1] > b.y0 && p[1] < b.y1
const boxesOf = (s: SceneSpec, color: string, thickness: number) => {
  const hs = bonds(s, color, thickness).filter((o) => near(o.from![1], o.to![1], 1e-6))
  const uniq = new Map<string, { x0: number; x1: number; ys: number[] }>()
  for (const o of hs) { const x0 = Math.min(o.from![0], o.to![0]), x1 = Math.max(o.from![0], o.to![0]), k = `${x0.toFixed(2)}|${x1.toFixed(2)}|${o.from![1].toFixed(2)}`; const e = uniq.get(k) ?? { x0, x1, ys: [] }; e.ys.push(o.from![1]); uniq.set(k, e) }
  return [...uniq.values()].map((e) => ({ x0: e.x0, x1: e.x1, y0: Math.min(...e.ys), y1: Math.max(...e.ys) }))
}
/** boxes drawn by rect(): pair each bottom edge with the top edge of the same x-span */
const rectBoxes = (s: SceneSpec, color: string, thickness: number, height: number) => {
  const hs = bonds(s, color, thickness).filter((o) => near(o.from![1], o.to![1], 1e-6)).map((o) => ({ x0: Math.min(o.from![0], o.to![0]), x1: Math.max(o.from![0], o.to![0]), y: o.from![1] }))
  const out: Array<{ x0: number; x1: number; y0: number; y1: number }> = []
  for (const a of hs) for (const b of hs) if (a !== b && near(a.x0, b.x0, 1e-6) && near(a.x1, b.x1, 1e-6) && near(b.y - a.y, height, 0.02)) out.push({ x0: a.x0, x1: a.x1, y0: a.y, y1: b.y })
  return out
}
const crossings = (pts: Array<{ x: number; y: number }>) => {
  const nz = pts.filter((p) => Math.abs(p.y) > 1e-9), out: number[] = []
  for (let i = 0; i + 1 < nz.length; i++) if (nz[i].y * nz[i + 1].y < 0) out.push(nz[i].x + (nz[i + 1].x - nz[i].x) * (nz[i].y / (nz[i].y - nz[i + 1].y)))
  return out
}
const lineParams = (o: Obj, d: (p: number[]) => { x: number; y: number }) => { const a = d(o.from!), b = d(o.to!), m = (b.y - a.y) / (b.x - a.x); return { m, c: a.y - m * a.x } }
const slopeAt = (f: (x: number) => number, x: number) => (f(x + 1e-4) - f(x - 1e-4)) / 2e-4
const isPrimeNum = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }
const divisorsOf = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0)

describe('the mathematics each figure draws', () => {
  it('Quadratic formula: the drawn curve is x² − 2x − 3, it crosses the axis at −1 and 3, the violet axis is x = −b/2a = 1 through the vertex, and the two green half-widths are √D / 2a = 2, so the roots are 1 ± 2', () => {
    const s = M.buildQuadraticFormulaScene(), { ox, sx, oy, sy } = M.QFM
    const dd = (p: number[]) => ({ x: (p[0] - ox) / sx, y: (p[1] - oy) / sy })
    const m = /x² ([−+]) (\d+)x ([−+]) (\d+) = 0/.exec(labelsOf(s).find((o) => o.text!.endsWith('= 0'))!.text!)!; const a = 1, b = (m[1] === '−' ? -1 : 1) * Number(m[2]), c = (m[3] === '−' ? -1 : 1) * Number(m[4]); expect([a, b, c]).toEqual([1, -2, -3])
    const f = (x: number) => a * x * x + b * x + c, cv = pathsOf(s, BLUE)[0].points!.map(dd); cv.forEach((p) => expect(Math.abs(p.y - f(p.x))).toBeLessThan(0.03 + 0.01 * Math.abs(2 * a * p.x + b)))
    const roots = crossings(cv).sort((p, q) => p - q); expect(roots).toHaveLength(2); expect(roots[0]).toBeCloseTo(-1, 1); expect(roots[1]).toBeCloseTo(3, 1)
    const disc = b * b - 4 * a * c, axis = -b / (2 * a), half = Math.sqrt(disc) / (2 * a); expect([disc, axis, half]).toEqual([16, 1, 2])
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('b² − 4ac'))!.text!.split('=')[1])[0]).toBe(disc)
    const g = dots(s, GREEN).map((d) => dd(d.position!)).sort((p, q) => p.x - q.x); expect(g).toHaveLength(2); g.forEach((d, i) => { expect(d.y).toBeCloseTo(0, 1); expect(d.x).toBeCloseTo(roots[i], 1) })
    const ax = bonds(s, VIOLET, 0.025)[0]; expect(dd(ax.from!).x).toBeCloseTo(axis, 1); expect(dd(ax.to!).x).toBeCloseTo(axis, 1)                           // x = −b/2a
    const v = dd(dots(s, RED)[0].position!); expect(v.x).toBeCloseTo(axis, 1); expect(v.y).toBeCloseTo(f(axis), 1); expect(f(axis)).toBe(-4)                  // the vertex is on the axis
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('−b/2a'))!.text!.split('=')[1])[0]).toBe(axis)
    const seg = bonds(s, GREEN, 0.06); expect(seg).toHaveLength(2); seg.forEach((o) => { expect(len(o) / sx).toBeCloseTo(half, 1); expect(dd(o.from!).x).toBeCloseTo(axis, 1) })
    const ends = seg.map((o) => dd(o.to!).x).sort((p, q) => p - q); expect(ends[0]).toBeCloseTo(axis - half, 1); expect(ends[1]).toBeCloseTo(axis + half, 1)                // the roots are the axis ± the half-width
    expect(roots[0]).toBeCloseTo((-b - Math.sqrt(disc)) / (2 * a), 1); expect(roots[1]).toBeCloseTo((-b + Math.sqrt(disc)) / (2 * a), 1)
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('x = 1'))!.text!.replace('±', ' '))).toEqual([axis, half]); expect(hasText(s, '±2')).toBe(true)
  })

  it('Fractional exponent: every arrow applies its operation (³√ or ²) to the number it leaves and gives the number it reaches, both routes from 8 end at 4 = 8^(2/3), and the exponent label is root 3, power 2', () => {
    const s = M.buildFractionalExponentScene(), N = M.FRX.nodes, nodes = Object.values(N)
    const val = (p: readonly number[]) => Number(labelAt(s, p)!.text); const near1 = (p: number[]) => nodes.reduce((best, c) => (dist(p, c as number[]) < dist(p, best as number[]) ? c : best), nodes[0])
    expect([val(N.start), val(N.top), val(N.bot), val(N.end)]).toEqual([8, 2, 64, 4])
    const glyphs = labelsOf(s).filter((o) => o.text === M.FRX.ops.root || o.text === M.FRX.ops.square)
    const all = [...arrows(s, BLUE), ...arrows(s, VIOLET)]; expect(all).toHaveLength(4)
    const step = (a: Obj) => { const from = near1(a.from!), to = near1(a.to!), mid = [(a.from![0] + a.to![0]) / 2, (a.from![1] + a.to![1]) / 2], op = glyphs.reduce((best, g) => (dist(g.position!, mid) < dist(best.position!, mid) ? g : best), glyphs[0]).text!; return { from, to, op } }
    const steps = all.map(step); steps.forEach((t) => expect(M.frxApply(t.op, val(t.from)), `${t.op}`).toBe(val(t.to)))                                        // 8 → 2 by ³√, 2 → 4 by ², 8 → 64 by ², 64 → 4 by ³√
    const blue = arrows(s, BLUE).map(step).map((t) => t.op), violet = arrows(s, VIOLET).map(step).map((t) => t.op)
    expect(blue.sort()).toEqual([M.FRX.ops.root, M.FRX.ops.square].sort()); expect(violet.sort()).toEqual([M.FRX.ops.root, M.FRX.ops.square].sort())               // one root and one power on each route
    const root = Number(M.FRX.ops.root[0] === '³' ? 3 : 0), power = 2; expect(root / 1).toBe(3)
    expect(M.frxApply(M.FRX.ops.square, M.frxApply(M.FRX.ops.root, 8))).toBe(M.frxApply(M.FRX.ops.root, M.frxApply(M.FRX.ops.square, 8)))                       // the order does not matter
    expect(Math.pow(8, power / root)).toBeCloseTo(val(N.end), 9)                                                                                        // 8^(2/3) = 4
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('exponent'))!.text!.replace('/', ' '))).toEqual([power, root])
    expect(texts(s)).toEqual(expect.arrayContaining(['root first', 'power first', 'same result']))
  })

  it('Radicals: the drawn diagonal of the 6 by 6 square has length √72 = 6√2 ≈ 8.49 (its square is 72 = 36 × 2 with 36 = 6²), so √72 simplifies to 6√2', () => {
    const s = M.buildRadicalsScene(), u = M.radU()
    const diag = bonds(s, VIOLET, 0.06)[0]; expect(len(diag) / u).toBeCloseTo(Math.sqrt(72), 1); expect((len(diag) / u) ** 2).toBeCloseTo(72, 0); expect(len(diag) / u).toBeCloseTo(6 * Math.SQRT2, 1)
    const sq = bonds(s, SLATE, 0.05); expect(sq).toHaveLength(4); sq.forEach((o) => expect(len(o) / u).toBeCloseTo(6, 1))
    expect(labelsOf(s).filter((o) => o.text === '6')).toHaveLength(2)
    const prod = labelsOf(s).find((o) => o.text === '72 = 36 × 2')!; expect(rhsVal(prod.text!)).toBe(72); expect(lhsVal(prod.text!)).toBe(72)
    const sqr = labelsOf(s).find((o) => o.text === '36 = 6²')!; expect(6 ** 2).toBe(lhsVal(sqr.text!)); expect(Math.sqrt(36)).toBe(6)
    const [radicand, coeff, rest] = numsIn(labelsOf(s).find((o) => o.text!.startsWith('√72 ='))!.text!); expect([radicand, coeff, rest]).toEqual([72, 6, 2])
    expect(coeff * Math.sqrt(rest)).toBeCloseTo(Math.sqrt(radicand), 9); expect(coeff ** 2 * rest).toBe(radicand)                                          // 6² × 2 = 72, nothing perfect left under the root
    expect([2, 3, 5, 6, 7].every((p) => (rest % (p * p)) !== 0)).toBe(true)
  })

  it('Exponential equations: the drawn curve is y = 2ˣ, the red line y = 8 meets it once at x = 3 (the green point), and 8 = 2³ gives the same exponent 3 in the written chain', () => {
    const s = M.buildExponentialEquationsScene(), { ox, sx, oy, sy, cx } = M.EXE
    const dd = (p: number[]) => ({ x: (p[0] - ox) / sx, y: (p[1] - oy) / sy })
    const cv = pathsOf(s, BLUE)[0].points!.map(dd); cv.forEach((p) => expect(Math.abs(p.y - 2 ** p.x)).toBeLessThan(0.06 + 0.01 * Math.abs(slopeAt((x) => 2 ** x, p.x))))
    const red = lineParams(bonds(s, RED, 0.04)[0], dd); expect(red.m).toBeCloseTo(0, 1); expect(red.c).toBeCloseTo(8, 1)
    const hit = crossings(cv.map((p) => ({ x: p.x, y: p.y - red.c }))); expect(hit).toHaveLength(1); expect(hit[0]).toBeCloseTo(3, 1)                         // one solution
    const g = dots(s, GREEN); expect(g).toHaveLength(1); expect(dd(g[0].position!).x).toBeCloseTo(3, 1); expect(dd(g[0].position!).y).toBeCloseTo(8, 1)
    const o = M.exeAt(0, 0); expect(labelAt(s, [M.exeAt(3, 0)[0], o[1] - 0.45])?.text).toBe('3'); expect(labelAt(s, [o[0] - 0.4, M.exeAt(0, 8)[1]])?.text).toBe('8')
    const same = labelAt(s, [cx, 1.2])!.text!, expo = supNum(same.split('=')[1].trim().slice(1)), base = Number(same.split('=')[1].trim()[0]); expect([base, expo]).toEqual([2, 3]); expect(base ** expo).toBe(Number(labelAt(s, [cx, 2.2])!.text!.split('=')[1]))  // 2ˣ = 2³ and 2³ = 8
    expect(num(labelAt(s, [cx, 0.2])!.text!.split('=')[1])).toBe(expo); expect(2 ** expo).toBe(8)
  })

  it('Logarithm properties: on the ruler 2ᵏ sits at distance k, and the drawn arrow lengths add up — 2 + 3 = 5 lands on 32 (4 × 8), 5 − 2 = 3 on 8 (32 ÷ 4), three 2s land on 64 (4³)', () => {
    const s = M.buildLogarithmPropertiesScene(), { u, x0, rows } = M.LGP
    for (let r = 0; r < 3; r++) for (let k = 0; k <= 6; k++) expect(labelAt(s, [M.lgpAt(k, r)[0], rows[r] - 0.45])?.text, `${r}:${k}`).toBe(String(2 ** k))   // the number 2ᵏ is at distance k
    const k = (x: number) => (x - x0) / u, span = (a: Obj) => ({ from: k(a.from![0]), to: k(a.to![0]) })
    const g = span(arrows(s, GREEN)[0]), b = span(arrows(s, BLUE)[0]); expect([g.from, g.to, b.from, b.to].map((v) => Math.round(v))).toEqual([0, 2, 2, 5])
    expect(2 ** Math.round(g.to - g.from)).toBe(4); expect(2 ** Math.round(b.to - b.from)).toBe(8); expect(2 ** Math.round(b.to)).toBe(4 * 8)               // log 4 + log 8 = log 32
    const r = span(arrows(s, RED)[0]); expect([Math.round(r.from), Math.round(r.to)]).toEqual([5, 3]); expect(2 ** Math.round(r.to)).toBe(32 / 4)             // log 32 − log 4 = log 8
    const vi = arrows(s, VIOLET).map(span).sort((p, q) => p.from - q.from); expect(vi).toHaveLength(3)
    vi.forEach((a, i) => { expect(Math.round(a.to - a.from)).toBe(2); expect(Math.round(a.from)).toBe(2 * i) })                                         // three lengths of log 4, end to end
    expect(2 ** Math.round(vi[2].to)).toBe(4 ** 3); expect(Math.round(vi[2].to)).toBe(3 * Math.round(vi[0].to - vi[0].from))                                // log 4³ = 3 log 4
    const land = dots(s, GREEN).map((d) => ({ row: rows.findIndex((y) => near(d.position![1], y, 0.02)), k: Math.round(k(d.position![0])) })).sort((p, q) => p.row - q.row); expect(land).toEqual([{ row: 0, k: 5 }, { row: 1, k: 3 }, { row: 2, k: 6 }])
    ;['4 × 8 = 32', '32 ÷ 4 = 8'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(lhsVal(t)).toBe(Number(t.split('=')[1])) })
    expect(hasText(s, '2 + 3 = 5')).toBe(true); expect(evalLR('2 + 3 =')).toBe(5); expect(hasText(s, '5 − 2 = 3')).toBe(true); expect(evalLR('5 − 2 =')).toBe(3)
    expect(hasText(s, '4³ = 64')).toBe(true); expect(hasText(s, '6 = 3 × 2')).toBe(true); expect(rhsVal('6 = 3 × 2')).toBe(6)
  })

  it('Natural logarithm: the drawn curve is ln x, it passes through (1, 0) and (e, 1) (the green point at x = 2.718), and its drawn tangent at (e, 1) has slope 1/e ≈ 0.37 — the slope of ln x at x is 1/x', () => {
    const s = M.buildNaturalLogarithmScene(), { ox, sx, oy, sy } = M.LNN, e = Math.E, dd = (p: number[]) => ({ x: (p[0] - ox) / sx, y: (p[1] - oy) / sy })
    const cv = pathsOf(s, BLUE)[0].points!.map(dd); cv.forEach((p) => { expect(p.x).toBeGreaterThan(0); expect(Math.abs(p.y - Math.log(p.x))).toBeLessThan(0.02 + 0.01 / p.x) })
    const one = dd(dots(s, INK)[0].position!), eDot = dd(dots(s, GREEN)[0].position!); expect(one.x).toBeCloseTo(1, 1); expect(one.y).toBeCloseTo(0, 1); expect(eDot.x).toBeCloseTo(e, 1); expect(eDot.y).toBeCloseTo(1, 1); expect(Math.log(eDot.x)).toBeCloseTo(1, 1)
    expect(Math.min(...cv.map((p) => Math.hypot(p.x - eDot.x, p.y - eDot.y)))).toBeLessThan(0.08)                                                      // the point is on the curve
    const tan = bonds(s, RED, 0.035)[0], t = lineParams(tan, dd); expect(t.m).toBeCloseTo(1 / e, 2); expect(t.m * eDot.x + t.c).toBeCloseTo(eDot.y, 1)       // slope 1/e through (e, 1)
    const i = cv.findIndex((p) => p.x > eDot.x), ds = (cv[i + 1].y - cv[i - 1].y) / (cv[i + 1].x - cv[i - 1].x); expect(ds).toBeCloseTo(t.m, 1)               // the curve is as steep as the tangent there
    expect(t.m).toBeCloseTo(1 / eDot.x, 1)
    const guides = bonds(s, VIOLET, 0.025); expect(guides).toHaveLength(2); guides.forEach((g) => expect(dist(g.to!, dots(s, GREEN)[0].position!)).toBeLessThan(0.02))
    const o = M.lnnAt(0, 0); expect(labelAt(s, [M.lnnAt(1, 0)[0], o[1] - 0.45])?.text).toBe('1'); expect(labelAt(s, [M.lnnAt(e, 0)[0], o[1] - 0.45])?.text).toBe('e'); expect(labelAt(s, [o[0] - 0.4, M.lnnAt(0, 1)[1]])?.text).toBe('1')
    expect(Number(labelsOf(s).find((o2) => o2.text!.startsWith('e ≈'))!.text!.split('≈')[1])).toBeCloseTo(e, 3)
    expect(Number(labelsOf(s).find((o2) => o2.text!.startsWith('slope'))!.text!.split('≈')[1])).toBeCloseTo(1 / e, 2)
    expect(hasText(s, 'ln 1 = 0')).toBe(true); expect(hasText(s, 'ln e = 1')).toBe(true); expect(Math.log(1)).toBe(0); expect(Math.log(e)).toBeCloseTo(1, 12)
  })

  it('Logarithmic equations: the drawn curve is log₂ x + log₂(x − 2) on x > 2 and meets y = 3 once, at x = 4; the chain x(x − 2) = 2³ → x² − 2x − 8 = 0 → x = 4 or −2 is consistent, and −2 is outside the drawn domain', () => {
    const s = M.buildLogarithmicEquationsScene(), { ox, sx, oy, sy, cx, rows } = M.LGE, dd = (p: number[]) => ({ x: (p[0] - ox) / sx, y: (p[1] - oy) / sy })
    const cv = pathsOf(s, BLUE)[0].points!.map(dd); cv.forEach((p) => { expect(p.x).toBeGreaterThan(2); expect(Math.abs(p.y - M.lgeF(p.x))).toBeLessThan(0.03 + 0.01 * Math.abs(slopeAt(M.lgeF, p.x))) })
    const asym = bonds(s, VIOLET, 0.025)[0]; expect(dd(asym.from!).x).toBeCloseTo(2, 1); expect(Math.min(...cv.map((p) => p.x))).toBeGreaterThan(dd(asym.from!).x)    // the curve lives to the right of the domain edge
    const red = lineParams(bonds(s, RED, 0.04)[0], dd); expect(red.m).toBeCloseTo(0, 1); expect(red.c).toBeCloseTo(3, 1)
    const hit = crossings(cv.map((p) => ({ x: p.x, y: p.y - red.c }))); expect(hit).toHaveLength(1); expect(hit[0]).toBeCloseTo(4, 1)
    const g = dots(s, GREEN); expect(g).toHaveLength(1); expect(dd(g[0].position!).x).toBeCloseTo(4, 1); expect(dd(g[0].position!).y).toBeCloseTo(3, 1); expect(M.lgeF(4)).toBeCloseTo(3, 9)
    const at = (r: number) => labelAt(s, [cx, rows[r]])!.text!
    const prod = /x\(x − 2\) = 2³/.exec(at(0)); expect(prod).not.toBeNull(); const rhs = 2 ** 3
    const q = /x² ([−+]) (\d+)x ([−+]) (\d+) = 0/.exec(at(1))!, b = (q[1] === '−' ? -1 : 1) * Number(q[2]), c = (q[3] === '−' ? -1 : 1) * Number(q[4]); expect([b, c]).toEqual([-2, -rhs])      // x² − 2x = 8
    const D = b * b - 4 * c, roots = [(-b - Math.sqrt(D)) / 2, (-b + Math.sqrt(D)) / 2]; expect(roots).toEqual([-2, 4]); expect(numsIn(at(2).replace('or', ' '))).toEqual([4, -2])
    expect(roots.filter((r) => r > 2)).toEqual([4]); expect(at(3)).toBe('−2 fails: x > 2'); expect(at(4)).toBe('x = 4')                                      // only 4 is in the domain
    expect(roots.filter((r) => r > 2)[0]).toBeCloseTo(hit[0], 1); expect(Math.log2(4) + Math.log2(4 - 2)).toBe(3)
  })

  it('Binomial theorem: every drawn entry of Pascal’s triangle is the sum of the two above it and equals n! / (k!(n−k)!), each row sums to 2ⁿ, and the green row 4 (1, 4, 6, 4, 1) gives the coefficients of (a + b)⁴', () => {
    const s = M.buildBinomialTheoremScene(), fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
    const val = (n: number, k: number) => Number(labelAt(s, M.bnmAt(n, k))!.text)
    for (let n = 0; n < M.BNM.rows; n++) {
      let rowSum = 0
      for (let k = 0; k <= n; k++) { const v = val(n, k); rowSum += v; expect(v, `${n},${k}`).toBe(fact(n) / (fact(k) * fact(n - k))); if (k > 0 && k < n) expect(v).toBe(val(n - 1, k - 1) + val(n - 1, k)); else expect(v).toBe(1) }
      expect(rowSum).toBe(2 ** n)
    }
    const arr = arrows(s, VIOLET); expect(arr).toHaveLength(2); arr.forEach((a) => expect(dist([a.to![0], a.to![1] - 0.3], M.bnmAt(4, 2))).toBeLessThan(0.2))
    const sources = arr.map((a) => [1, 2].find((k) => Math.abs(a.from![0] - M.bnmAt(3, k)[0]) < 0.2)!).sort(); expect(sources).toEqual([1, 2]); expect(val(3, 1) + val(3, 2)).toBe(val(4, 2))
    expect(hasText(s, '3 + 3 = 6')).toBe(true); expect(evalLR('3 + 3 =')).toBe(val(4, 2))
    const marks = dots(s, GREEN).map((d) => d.position!).sort((p, q) => p[0] - q[0]); expect(marks).toHaveLength(5); marks.forEach((m, k) => { expect(dist([m[0], m[1] - 0.4], M.bnmAt(4, k))).toBeLessThan(0.02) })
    const coeffs = marks.map((_, k) => val(4, k)); expect(coeffs).toEqual([1, 4, 6, 4, 1]); expect(sum(coeffs)).toBe(16)
    for (const [a, b] of [[1.3, 0.7], [2, 3], [-1.5, 4]]) expect(sum(coeffs.map((c, k) => c * a ** (4 - k) * b ** k))).toBeCloseTo((a + b) ** 4, 9)             // the row IS the expansion
    expect(supNum('⁴')).toBe(4); expect(hasText(s, '(a + b)⁴')).toBe(true); expect(hasText(s, '1 + 4 + 6 + 4 + 1 = 16')).toBe(true); expect(evalLR('1 + 4 + 6 + 4 + 1 =')).toBe(16)
  })

  it('Divisibility: the 12 dots fill three boxes of 4 exactly (12 = 4 × 3, remainder 0) while the 13 dots leave 1 red dot outside the three boxes (13 = 4 × 3 + 1), so 4 divides 12 but not 13', () => {
    const s = M.buildDivisibilityScene(), { left, right } = M.DVS
    const ink = dots(s, INK).map((d) => d.position!), boxes = rectBoxes(s, BLUE, 0.04, 0.44); expect(ink).toHaveLength(12 + 13); expect(boxes).toHaveLength(6)
    const side = (p: number[]) => (p[0] < 0 ? 0 : 1), byPanel = [0, 1].map((i) => boxes.filter((b) => (b.x0 + b.x1) / 2 < 0 === (i === 0)))
    const counts = byPanel.map((bs, i) => bs.map((b) => ink.filter((p) => inBox(b, p) && side(p) === i).length)); expect(counts).toEqual([[4, 4, 4], [4, 4, 4]])
    const dotsIn = (i: number) => ink.filter((p) => side(p) === i), outside = (i: number) => dotsIn(i).filter((p) => !byPanel[i].some((b) => inBox(b, p)))
    expect([dotsIn(0).length, dotsIn(1).length]).toEqual([12, 13]); expect([outside(0).length, outside(1).length]).toEqual([0, 1])
    const red = dots(s, RED); expect(red).toHaveLength(1); expect(outside(1).some((p) => dist(p, red[0].position!) < 0.02)).toBe(true)                           // the red dot is the spare one
    const size = counts[0][0], rows = counts[0].length
    expect(size * rows + outside(0).length).toBe(12); expect(size * rows + outside(1).length).toBe(13); expect(12 % size).toBe(0); expect(13 % size).toBe(1)
    expect(lhsVal('12 = 4 × 3')).toBe(12); expect(hasText(s, '12 = 4 × 3')).toBe(true); expect(hasText(s, '13 = 4 × 3 + 1')).toBe(true); expect(rhsVal('13 = 4 × 3 + 1')).toBe(13)
    expect(labelAt(s, [left, 2.2])?.text).toBe('12'); expect(labelAt(s, [right + 0.5, 2.2])?.text).toBe('13'); expect(hasText(s, '4 divides 12')).toBe(true); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('remainder'))!.text!)[0]).toBe(1)
  })

  it('Prime numbers: every number 2…30 sits where drawn; the first round marks exactly the even numbers above 2, the second exactly 9, 15, 21, 25, 27, and the 10 unmarked green ones are exactly the primes (7² = 49 is already past 30)', () => {
    const s = M.buildPrimeNumberScene(), { lo, hi } = M.PRM
    for (let n = lo; n <= hi; n++) expect(labelAt(s, M.prmAt(n))?.text, `numeral ${n}`).toBe(String(n))
    const numeralAbove = (p: number[]) => { for (let n = lo; n <= hi; n++) if (dist([M.prmAt(n)[0], M.prmAt(n)[1] + 0.4], p) < 0.02) return n; return -1 }
    const marksOf = (stepIdx: number, color: string) => s.steps[stepIdx].objects.filter((o) => (o as Obj).type === 'node' && (o as Obj).color === color).map((o) => numeralAbove((o as Obj).position!)).sort((p, q) => p - q)
    const r1 = marksOf(1, RED), r2 = marksOf(2, RED), green = marksOf(2, GREEN)
    expect(r1).toEqual(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((n) => n > 2 && n % 2 === 0)); expect(r2).toEqual([9, 15, 21, 25, 27])
    expect(r1.every((n) => n % 2 === 0)).toBe(true); expect(r2.every((n) => !r1.includes(n) && (n % 3 === 0 || n % 5 === 0))).toBe(true)
    expect(green.every((n) => isPrimeNum(n))).toBe(true); expect([...r1, ...r2].every((n) => !isPrimeNum(n))).toBe(true)                                     // marked = composite, unmarked = prime
    expect([...r1, ...r2, ...green].sort((p, q) => p - q)).toEqual(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i))                                   // every number is exactly one of the two
    expect(green).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]); expect(7 * 7).toBeGreaterThan(hi)
    for (const n of green) expect(divisorsOf(n)).toEqual([1, n])                                                                                       // a prime has exactly two divisors
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('10 primes'))!.text!)[0]).toBe(green.length)
    expect(texts(s)).toEqual(expect.arrayContaining(['multiples of 2', 'multiples of 3, 5']))
  })

  it('Composite numbers: the 12 dots form a 2 × 6 and a 3 × 4 rectangle (both sides at least 2, so 12 is composite) while the 7 dots only form a 1 × 7 line, and no 2…6 divides 7', () => {
    const s = M.buildCompositeNumberScene(), all = dots(s).map((d) => ({ p: d.position!, color: d.color }))
    const groupOf = (p: number[]) => (p[0] < -1.5 ? 0 : p[0] < 1.5 ? 1 : 2), groups = [0, 1, 2].map((i) => all.filter((d) => groupOf(d.p) === i))
    expect(groups.map((g) => g.length)).toEqual([12, 12, 7])
    const shape = (g: typeof all) => ({ rows: new Set(g.map((d) => d.p[1].toFixed(2))).size, cols: new Set(g.map((d) => d.p[0].toFixed(2))).size })
    const shapes = groups.map(shape); expect(shapes).toEqual([{ rows: 2, cols: 6 }, { rows: 3, cols: 4 }, { rows: 1, cols: 7 }])
    shapes.forEach((sh, i) => expect(sh.rows * sh.cols).toBe(groups[i].length))                                                                         // a full rectangle, no gaps
    const composite = (sh: { rows: number; cols: number }) => sh.rows >= 2 && sh.cols >= 2
    expect([composite(shapes[0]), composite(shapes[1]), composite(shapes[2])]).toEqual([true, true, false])
    expect(groups[0].every((d) => d.color === GREEN) && groups[1].every((d) => d.color === GREEN) && groups[2].every((d) => d.color === RED)).toBe(true)
    for (let k = 2; k <= 6; k++) expect(7 % k).not.toBe(0); expect([2, 3, 4, 6].every((k) => 12 % k === 0)).toBe(true)
    ;['12 = 2 × 6', '12 = 3 × 4', '7 = 1 × 7'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(rhsVal(t)).toBe(lhsVal(t)) })
    expect(shapes[0].rows * shapes[0].cols).toBe(shapes[1].rows * shapes[1].cols); expect(texts(s)).toEqual(expect.arrayContaining(['composite 12', 'prime 7']))
  })

  it('Prime factorization: each ladder row divides exactly (72 → 36 → 18 → 9 → 3 → 1), every divisor is prime, the divisors multiply back to 72 (three 2s, two 3s), and the written row 2 × 2 × 2 × 3 × 3 and 2³ × 3² agree', () => {
    const s = M.buildPrimeFactorizationScene(), { rows, xq, xd, product } = M.PFT
    const q = rows.map((y) => Number(labelAt(s, [xq, y])!.text)), d = rows.slice(0, 5).map((y) => Number(labelAt(s, [xd, y])!.text)); expect(q).toEqual([72, 36, 18, 9, 3, 1])
    d.forEach((div, r) => { expect(isPrimeNum(div)).toBe(true); expect(q[r] % div).toBe(0); expect(q[r] / div).toBe(q[r + 1]) })                          // each step divides exactly
    expect(q[5]).toBe(1); expect(d.reduce((a, b) => a * b, 1)).toBe(q[0]); expect(d.filter((v) => v === 2)).toHaveLength(3); expect(d.filter((v) => v === 3)).toHaveLength(2)
    expect(d).toEqual([...d].sort((a, b) => a - b))                                                                                                     // smallest prime first
    const row = Array.from({ length: 9 }, (_, i) => labelAt(s, [product.x0 + i * product.step, product.y])?.text); expect(row.filter((_, i) => i % 2 === 0).map(Number)).toEqual(d); expect(row.filter((_, i) => i % 2 === 1)).toEqual(['×', '×', '×', '×'])
    const cap = labelsOf(s).find((o) => o.text!.startsWith('72 ='))!.text!, [, base1, e1, base2, e2] = /72 = (\d)(.) × (\d)(.)/.exec(cap)!; expect(Number(base1) ** supNum(e1) * Number(base2) ** supNum(e2)).toBe(q[0])
    expect([supNum(e1), supNum(e2)]).toEqual([d.filter((v) => v === Number(base1)).length, d.filter((v) => v === Number(base2)).length])                       // the exponents count the repeats
    expect(bonds(s, SLATE, 0.03)).toHaveLength(5); expect(bonds(s, SLATE, 0.04).length).toBeGreaterThanOrEqual(2)
  })

  it('Greatest common divisor: the numerals inside the drawn circles are exactly the divisors of 12 and of 18, the numerals in both are 1, 2, 3, 6, the big green dot marks 6 = gcd, and 12 ÷ 6 = 2, 18 ÷ 6 = 3 share only 1', () => {
    const s = M.buildGcdScene(), A = pathsOf(s, BLUE)[0].points!, B = pathsOf(s, RED)[0].points!
    const circ = (pts: number[][]) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); return { c: [(Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...ys) + Math.min(...ys)) / 2], r: (Math.max(...xs) - Math.min(...xs)) / 2 } }
    const cA = circ(A), cB = circ(B); expect(cA.r).toBeCloseTo(cB.r, 1)
    const numerals = labelsOf(s).filter((o) => /^\d+$/.test(o.text!)).map((o) => ({ n: Number(o.text), p: o.position! })); expect(numerals).toHaveLength(8)
    const inA = numerals.filter((x) => dist(x.p, cA.c) < cA.r).map((x) => x.n).sort((p, q) => p - q), inB = numerals.filter((x) => dist(x.p, cB.c) < cB.r).map((x) => x.n).sort((p, q) => p - q)
    expect(inA).toEqual(divisorsOf(12)); expect(inB).toEqual(divisorsOf(18))                                                                           // each circle holds exactly the divisors
    const common = inA.filter((n) => inB.includes(n)); expect(common).toEqual([1, 2, 3, 6]); expect(numerals.every((x) => inA.includes(x.n) || inB.includes(x.n))).toBe(true)
    const gcd = Math.max(...common); expect(gcd).toBe(6); const euclid = (a: number, b: number): number => (b === 0 ? a : euclid(b, a % b)); expect(euclid(12, 18)).toBe(gcd)
    const big = dots(s, GREEN).filter((d) => near(d.radius ?? 0, 0.18, 1e-9)); expect(big).toHaveLength(1); const six = numerals.find((x) => x.n === 6)!; expect(dist([big[0].position![0], big[0].position![1] - 0.4], six.p)).toBeLessThan(0.02)
    expect(dots(s, GREEN)).toHaveLength(4); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('gcd'))!.text!)[0]).toBe(gcd)
    expect(euclid(12 / gcd, 18 / gcd)).toBe(1); ;['12 = 6 × 2', '18 = 6 × 3'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(rhsVal(t)).toBe(lhsVal(t)) })
    expect(texts(s)).toEqual(expect.arrayContaining(['divisors of 12', 'divisors of 18']))
  })
})
