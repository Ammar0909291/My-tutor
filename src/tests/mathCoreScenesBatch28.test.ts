/**
 * Mathematics visual campaign, batch 28 (2026-10-12): reciprocals, decimal operations, terminating and repeating decimals, irrational
 * square roots, and the first algebra helpers — equations as balances, solution sets, substitution, elimination, degree, polynomial
 * multiplication and division, factoring and factoring trinomials. Every number a figure states is re-derived here from the DRAWN
 * digits, dots, lines, curves and boxes, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB28'

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
  ['math.arith.fraction-reciprocal', M.buildReciprocalScene, 'math-reciprocal'],
  ['math.arith.decimal-operations', M.buildDecimalOperationsScene, 'math-decimal-operations'],
  ['math.arith.terminating-decimals', M.buildTerminatingDecimalsScene, 'math-terminating-decimals'],
  ['math.arith.repeating-decimals', M.buildRepeatingDecimalsScene, 'math-repeating-decimals'],
  ['math.arith.irrational-roots', M.buildIrrationalRootsScene, 'math-irrational-roots'],
  ['math.alg.equation', M.buildEquationScene, 'math-equation'],
  ['math.alg.solution-set', M.buildSolutionSetScene, 'math-solution-set'],
  ['math.alg.substitution-method', M.buildSubstitutionMethodScene, 'math-substitution-method'],
  ['math.alg.elimination-method', M.buildEliminationMethodScene, 'math-elimination-method'],
  ['math.alg.degree', M.buildDegreeScene, 'math-degree'],
  ['math.alg.polynomial-operations', M.buildPolynomialOperationsScene, 'math-polynomial-operations'],
  ['math.alg.polynomial-division', M.buildPolynomialDivisionScene, 'math-polynomial-division'],
  ['math.alg.factoring', M.buildFactoringScene, 'math-factoring'],
  ['math.alg.factoring-trinomials', M.buildFactoringTrinomialsScene, 'math-factoring-trinomials'],
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
const numsIn = (t: string) => (t.match(/\d+(?:\.\d+)?/g) ?? []).map(Number)
const num = (t: string) => Number(t.replace('−', '-'))
const hasText = (s: SceneSpec, t: string) => texts(s).includes(t)
/** left-to-right value of the part of a label before its "=" (numbers, a/b fractions and + − × ÷) */
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  const val = (t: string) => (t.includes('/') ? Number(t.split('/')[0]) / Number(t.split('/')[1]) : Number(t))
  let acc = val(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = val(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
const rhsOf = (expr: string) => Number(expr.split('=').pop()!.trim())
const boxesOf = (s: SceneSpec, color: string, thickness: number) => {
  const hs = bonds(s, color, thickness).filter((o) => near(o.from![1], o.to![1], 1e-6))
  const uniq = new Map<string, { x0: number; x1: number; ys: number[] }>()
  for (const o of hs) { const x0 = Math.min(o.from![0], o.to![0]), x1 = Math.max(o.from![0], o.to![0]), k = `${x0.toFixed(2)}|${x1.toFixed(2)}`; const e = uniq.get(k) ?? { x0, x1, ys: [] }; e.ys.push(o.from![1]); uniq.set(k, e) }
  return [...uniq.values()].map((e) => ({ x0: e.x0, x1: e.x1, y0: Math.min(...e.ys), y1: Math.max(...e.ys) })).sort((a, b) => a.x0 - b.x0)
}
/** the x-values at which a sampled curve changes sign (zero samples are skipped, the crossing is interpolated between the nonzero neighbours) */
const crossings = (pts: Array<{ x: number; y: number }>) => {
  const nz = pts.filter((p) => Math.abs(p.y) > 1e-9), out: number[] = []
  for (let i = 0; i + 1 < nz.length; i++) if (nz[i].y * nz[i + 1].y < 0) out.push(nz[i].x + (nz[i + 1].x - nz[i].x) * (nz[i].y / (nz[i].y - nz[i + 1].y)))
  return out
}
/** distance from a point to the polyline through sampled points */
const distToPolyline = (p: { x: number; y: number }, pts: Array<{ x: number; y: number }>) => Math.min(...pts.slice(1).map((b, i) => { const a = pts[i], dx = b.x - a.x, dy = b.y - a.y, t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy))); return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy)) }))
const lineParams = (o: Obj, d: (p: number[]) => { x: number; y: number }) => { const a = d(o.from!), b = d(o.to!), m = (b.y - a.y) / (b.x - a.x); return { m, c: a.y - m * a.x } }

describe('the mathematics each figure draws', () => {
  it('Reciprocal: every drawn point of the curve has x · y = 1, (2, 1/2) and (1/2, 2) are swapped copies of each other on it, each spans a rectangle of area 1 with the axes, and the captions multiply to 1', () => {
    const s = M.buildReciprocalScene(), { ox, oy, u } = M.RCP, o = M.rcpAt(0, 0)
    const dd = (p: number[]) => ({ x: (p[0] - ox) / u, y: (p[1] - oy) / u })
    const cv = pathsOf(s, BLUE)[0].points!.map(dd); expect(cv.length).toBeGreaterThanOrEqual(8)
    cv.forEach((p) => expect(p.x * p.y).toBeCloseTo(1, 1))                                                                                             // the graph IS xy = 1
    const g = dd(dots(s, GREEN)[0].position!), r = dd(dots(s, RED)[0].position!), w = dots(s, INK).map((d) => dd(d.position!)); expect(w).toHaveLength(1)
    expect([g.x, g.y]).toEqual([expect.closeTo(2, 1), expect.closeTo(0.5, 1)]); expect([r.x, r.y]).toEqual([expect.closeTo(0.5, 1), expect.closeTo(2, 1)]); expect(w[0].x).toBeCloseTo(1, 1); expect(w[0].y).toBeCloseTo(1, 1)
    expect(g.x).toBeCloseTo(r.y, 1); expect(g.y).toBeCloseTo(r.x, 1)                                                                                   // reciprocals swap the two coordinates
    ;[g, r].forEach((p) => { expect(p.x * p.y).toBeCloseTo(1, 1); expect(distToPolyline(p, cv)).toBeLessThan(0.05) })
    const guides = bonds(s, VIOLET, 0.025); expect(guides).toHaveLength(4)
    for (const pt of [dots(s, GREEN)[0], dots(s, RED)[0]]) {
      const mine = guides.filter((q) => dist(q.to!, pt.position!) < 0.02); expect(mine).toHaveLength(2)
      const horiz = mine.find((q) => near(q.from![1], q.to![1], 1e-6))!, vert = mine.find((q) => near(q.from![0], q.to![0], 1e-6))!
      expect((len(horiz) / u) * (len(vert) / u)).toBeCloseTo(1, 1)                                                                                     // the rectangle has area 1
    }
    expect(labelAt(s, [M.rcpAt(0.5, 0)[0], o[1] - 0.45])?.text).toBe('1/2'); expect(labelAt(s, [M.rcpAt(2, 0)[0], o[1] - 0.45])?.text).toBe('2')
    expect(labelAt(s, [o[0] - 0.4, M.rcpAt(0, 2)[1]])?.text).toBe('2'); expect(labelAt(s, [o[0] - 0.55, M.rcpAt(0, 0.5)[1]])?.text).toBe('1/2')
    ;['2 × 1/2 = 1', '1/2 × 2 = 1', '3/4 × 4/3 = 1'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(evalLR(t)).toBeCloseTo(rhsOf(t), 9) })
  })

  it('Decimal operations: the digits line up in one column and add to 3.75 place by place, and the shaded block of the 10 × 10 grid is 3 columns by 4 rows = 12 of 100 squares = 0.3 × 0.4 = 0.12', () => {
    const s = M.buildDecimalOperationsScene(), { cols, rows, grid } = M.DCO, { x0, y0, cell } = grid
    const rowText = (y: number) => cols.map((x) => labelAt(s, [x, y])?.text).join('')
    const A = rowText(rows.a), B = rowText(rows.b), S = rowText(rows.s); expect([A, B, S]).toEqual(['2.35', '1.40', '3.75'])
    ;[rows.a, rows.b, rows.s].forEach((y) => expect(labelAt(s, [cols[1], y])?.text).toBe('.'))                                                          // decimal points in one column
    expect(Number(A) + Number(B)).toBeCloseTo(Number(S), 9)
    const dig = (t: string) => [t[0], t[2], t[3]].map(Number); const a = dig(A), b = dig(B), out = [0, 0, 0]; let carry = 0
    for (let i = 2; i >= 0; i--) { const v = a[i] + b[i] + carry; out[i] = v % 10; carry = Math.floor(v / 10) }
    expect(out).toEqual(dig(S)); expect(carry).toBe(0)                                                                                                 // hundredths, tenths, units: 5, 7, 3 with no carry
    const inner = bonds(s, SLATE, 0.015), vx = inner.filter((o) => near(o.from![0], o.to![0], 1e-6)).map((o) => o.from![0]).sort((p, q) => p - q), hy = inner.filter((o) => near(o.from![1], o.to![1], 1e-6)).map((o) => o.from![1]).sort((p, q) => p - q)
    expect(vx).toHaveLength(9); expect(hy).toHaveLength(9); vx.forEach((x, i) => expect(x).toBeCloseTo(x0 + (i + 1) * cell, 1)); hy.forEach((y, i) => expect(y).toBeCloseTo(y0 + (i + 1) * cell, 1))
    const outline = bonds(s, SLATE, 0.04).filter((o) => near(len(o), 10 * cell, 0.02)); expect(outline).toHaveLength(4)                                   // 10 cells = one whole each way
    const shade = bonds(s, GREEN, 0.28).sort((p, q) => p.from![1] - q.from![1]); expect(shade).toHaveLength(4)
    const colsShaded = shade.map((o) => len(o) / cell); colsShaded.forEach((c) => expect(c).toBeCloseTo(3, 1)); shade.forEach((o, i) => expect((o.from![1] - y0) / cell - 0.5).toBeCloseTo(i, 1))
    const cells = sum(colsShaded.map(Math.round)); expect(cells).toBe(12)
    expect(labelAt(s, [x0 + 1.5 * cell, y0 - 0.45])?.text).toBe('0.3'); expect(Number(labelAt(s, [x0 + 1.5 * cell, y0 - 0.45])!.text) * 10).toBeCloseTo(Math.round(colsShaded[0]), 6)  // 0.3 = 3 columns of 10
    expect(labelAt(s, [x0 - 0.6, y0 + 2 * cell])?.text).toBe('0.4'); expect(Number(labelAt(s, [x0 - 0.6, y0 + 2 * cell])!.text) * 10).toBeCloseTo(shade.length, 6)  // 0.4 = 4 rows of 10
    expect(cells / 100).toBeCloseTo(0.3 * 0.4, 9)
    ;['2.35 + 1.4 = 3.75', '0.3 × 0.4 = 0.12', '3 × 4 = 12'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(evalLR(t)).toBeCloseTo(rhsOf(t), 9) })
    expect(cells).toBe(3 * 4)
  })

  it('Terminating decimals: each of 2…25 sits where it is drawn and is green exactly when its only prime factors are 2 and 5 — equivalently when it divides a power of 10 — and the two examples are 1/8 = 0.125 (3 digits) and 1/7 → 0.142857…', () => {
    const s = M.buildTerminatingDecimalsScene(), { lo, hi } = M.TRM
    const green: number[] = [], red: number[] = []
    for (let d = lo; d <= hi; d++) {
      const p = M.trmAt(d); expect(labelAt(s, p)?.text, `numeral ${d}`).toBe(String(d))
      const mark = objs(s).find((o) => o.type === 'node' && o.position && dist(o.position, [p[0], p[1] + 0.42]) < 0.02)!; expect([GREEN, RED]).toContain(mark.color)
      ;(mark.color === GREEN ? green : red).push(d)
    }
    const onlyTwoFive = (d: number) => { let n = d; while (n % 2 === 0) n /= 2; while (n % 5 === 0) n /= 5; return n === 1 }
    const dividesPowerOfTen = (d: number) => { for (let k = 1; k <= 12; k++) if (10 ** k % d === 0) return true; return false }
    green.forEach((d) => { expect(onlyTwoFive(d)).toBe(true); expect(dividesPowerOfTen(d)).toBe(true) }); red.forEach((d) => { expect(onlyTwoFive(d)).toBe(false); expect(dividesPowerOfTen(d)).toBe(false) })
    expect(green).toEqual([2, 4, 5, 8, 10, 16, 20, 25]); expect(red).toHaveLength(16); expect(green.length + red.length).toBe(hi - lo + 1)
    expect(labelsOf(s).find((o) => o.text === 'terminates')!.color).toBe(GREEN); expect(labelsOf(s).find((o) => o.text === 'repeats')!.color).toBe(RED)
    expect(hasText(s, '1/8 = 0.125')).toBe(true); expect(evalLR('1/8 = 0.125')).toBeCloseTo(0.125, 9)
    expect('0.125'.split('.')[1]).toHaveLength(Array.from({ length: 12 }, (_, k) => k + 1).find((k) => 10 ** k % 8 === 0)!)                                  // 3 digits = the first power of ten that 8 divides
    expect(red).toContain(7); expect(hasText(s, '1/7 → 0.142857…')).toBe(true); expect(142857 * 7).toBe(999999)
  })

  it('Repeating decimals: each blue arrow takes remainder r to 10r mod 7 and the digit beside it is ⌊10r / 7⌋, the digits read 142857, the cycle visits 1…6 once and returns to its start, so the period is 6 and 0.142857 = 1/7 to six places', () => {
    const s = M.buildRepeatingDecimalsScene(), { remainders, m } = M.REP
    const nodes = remainders.map((_, k) => M.repNode(k)), nodeDots = objs(s).filter((o) => o.type === 'node' && near(o.radius ?? 0, 0.2, 1e-9)); expect(nodeDots).toHaveLength(6)
    nodes.forEach((p, k) => { expect(nodeDots.some((o) => dist(o.position!, p) < 0.02)).toBe(true); expect(labelAt(s, M.repNumeral(k))?.text).toBe(String(remainders[k])) })
    expect(dots(s, RED)).toHaveLength(1); expect(dist(dots(s, RED)[0].position!, nodes[0])).toBeLessThan(0.02)                                          // the start: remainder 1
    const arr = arrows(s, BLUE); expect(arr).toHaveLength(6)
    const idx = (p: number[]) => nodes.reduce((best, c, i) => (dist(p, c) < dist(p, nodes[best]) ? i : best), 0)
    const written: number[] = []
    arr.forEach((a) => {
      const i = idx(a.from!), j = idx(a.to!); expect(j).toBe((i + 1) % 6); expect((10 * remainders[i]) % m).toBe(remainders[j])                          // r → 10r mod 7
      const dg = Number(labelAt(s, M.repDigit(i))!.text); expect(dg).toBe(Math.floor((10 * remainders[i]) / m)); written[i] = dg
    })
    expect(written.join('')).toBe('142857'); expect(Math.abs(Number(written.join('')) / 1e6 - 1 / m)).toBeLessThan(1e-6)
    expect([...remainders].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6]); expect((10 * remainders[5]) % m).toBe(remainders[0])                       // all six remainders, then back to the first
    expect(s.steps[1].objects.filter((o) => (o as Obj).type === 'arrow')).toHaveLength(3); expect(s.steps[2].objects.filter((o) => (o as Obj).type === 'arrow')).toHaveLength(3)
    expect(numsIn(labelAt(s, [M.REP.cx, M.REP.cy])!.text!)[0]).toBe(arr.length); expect(arr.length).toBe(m - 1)                                         // period 6 = the most a division by 7 allows
    expect(hasText(s, '1/7 → 0.142857…')).toBe(true)
  })

  it('Irrational roots: the drawn diagonal has length √2 (its square is 1² + 1² = 2), the arc keeps that radius and lands on the number line at 1.414, between the red ticks 1.4 and 1.5 (1.4² < 2 < 1.5²), and no p/q with q ≤ 2000 squares to 2', () => {
    const s = M.buildIrrationalRootsScene(), { ox, oy, u } = M.IRR
    const diag = bonds(s, VIOLET, 0.06)[0]; expect(len(diag) / u).toBeCloseTo(Math.SQRT2, 2); expect((len(diag) / u) ** 2).toBeCloseTo(2, 1)
    const sq = bonds(s, SLATE, 0.05); expect(sq).toHaveLength(4); sq.forEach((o) => expect(len(o) / u).toBeCloseTo(1, 2))
    const arc = pathsOf(s, BLUE)[0].points!; arc.forEach((p) => expect(Math.hypot(p[0] - ox, p[1] - oy) / u).toBeCloseTo(Math.SQRT2, 2))
    expect(dist(arc[0], [ox + u, oy + u])).toBeLessThan(0.03); expect(arc[arc.length - 1][1]).toBeCloseTo(oy, 1); expect((arc[arc.length - 1][0] - ox) / u).toBeCloseTo(Math.SQRT2, 2)
    const land = dots(s, GREEN)[0].position!; expect((land[0] - ox) / u).toBeCloseTo(Math.SQRT2, 2); expect(land[1]).toBeCloseTo(oy, 1)
    const ticks = bonds(s, RED, 0.05).map((o) => (o.from![0] - ox) / u).sort((p, q) => p - q); expect(ticks[0]).toBeCloseTo(1.4, 2); expect(ticks[1]).toBeCloseTo(1.5, 2)
    expect(ticks[0]).toBeLessThan((land[0] - ox) / u); expect((land[0] - ox) / u).toBeLessThan(ticks[1])
    ;['1.4² = 1.96', '1.5² = 2.25'].forEach((t) => { const base = Number(t.split('²')[0]); expect(hasText(s, t)).toBe(true); expect(base * base).toBeCloseTo(rhsOf(t), 9) })
    expect(1.4 * 1.4).toBeLessThan(2); expect(2).toBeLessThan(1.5 * 1.5)
    expect(hasText(s, '1² + 1² = 2')).toBe(true); expect(1 + 1).toBe(2)
    for (let k = 0; k <= 2; k++) expect(labelAt(s, [M.irrAt(k, 0)[0], oy - 0.5])?.text).toBe(String(k))
    for (let q = 1; q <= 2000; q++) { const p = Math.round(q * Math.SQRT2); expect(p * p === 2 * q * q).toBe(false) }
  })

  it('Equation: both pans weigh the same (the block x is 4 units wide, so 4 + 3 = 7 on the left and 7 on the right, beam level); taking 3 off each side leaves x = 4 on the left and 4 units on the right', () => {
    const s = M.buildEquationScene(), { beamY, panY, spacing } = M.EQN
    const beam = bonds(s, SLATE, 0.07).find((o) => near(o.from![1], beamY, 0.01) && near(o.to![1], beamY, 0.01))!; expect(near(beam.from![1], beam.to![1], 1e-9)).toBe(true)  // level
    const edges = bonds(s, BLUE, 0.04); expect(edges).toHaveLength(4); const width = Math.max(...edges.map((o) => Math.abs(o.to![0] - o.from![0]))); const xUnits = width / spacing; expect(xUnits).toBeCloseTo(4, 1)
    edges.forEach((o) => { expect(o.from![1]).toBeGreaterThan(panY); expect(o.to![1]).toBeGreaterThan(panY) })                                           // the block rests on its pan
    const red = dots(s, RED).filter((d) => near(d.radius ?? 0, 0.14, 1e-9)), right = dots(s, INK).filter((d) => near(d.radius ?? 0, 0.14, 1e-9)); expect([red.length, right.length]).toEqual([3, 7])
    expect(Math.round(xUnits) + red.length).toBe(right.length)                                                                                         // 4 + 3 = 7: the pans balance
    const key = (p: number[]) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`, mids = new Set(bonds(s, VIOLET, 0.05).map((o) => key([(o.from![0] + o.to![0]) / 2, (o.from![1] + o.to![1]) / 2]))); expect(bonds(s, VIOLET, 0.05)).toHaveLength(12); expect(mids.size).toBe(6)
    red.forEach((d) => expect(mids.has(key(d.position!))).toBe(true))                                                                                  // the 3 red units come off the left
    const rightSorted = [...right].sort((p, q) => p.position![0] - q.position![0]); const removed = rightSorted.filter((d) => mids.has(key(d.position!))), kept = rightSorted.filter((d) => !mids.has(key(d.position!)))
    expect(removed).toHaveLength(3); expect(kept).toHaveLength(4)                                                                                      // and 3 of the 7 from the right
    const green = dots(s, GREEN); expect(green).toHaveLength(4); green.forEach((g) => expect(kept.some((k) => dist(k.position!, g.position!) < 0.02)).toBe(true))
    expect(Math.round(xUnits)).toBe(kept.length)                                                                                                       // x on the left = 4 on the right
    expect(texts(s)).toEqual(expect.arrayContaining(['x + 3 = 7', 'x = 4'])); expect(numsIn('x + 3 = 7')).toEqual([3, red.length === 3 ? 7 : 0]); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('x ='))!.text!)[0]).toBe(kept.length)
    expect(labelAt(s, [(M.EQN.block.x0 + M.EQN.block.x0 + M.EQN.block.w) / 2, panY + 0.31])?.text).toBe('x')
  })

  it('Solution set: the drawn graphs meet once at x = 3, twice at x = ±2 and never (parallel), matching the labelled sets {3}, {−2, 2} and ∅', () => {
    const s = M.buildSolutionSetScene(), { s: sc, oy, ox } = M.SOL
    const panelOf = (px: number) => (px < -2 ? 0 : px < 1.8 ? 1 : 2), dd = (panel: number, p: number[]) => ({ x: (p[0] - ox[panel]) / sc, y: (p[1] - oy) / sc })
    const blue = bonds(s, BLUE, 0.04), red = bonds(s, RED, 0.04); expect([blue.length, red.length]).toEqual([2, 3])
    const bl = (panel: number) => blue.find((o) => panelOf(o.from![0]) === panel), rd = (panel: number) => red.find((o) => panelOf(o.from![0] + 0.5) === panel)!
    const A1 = lineParams(bl(0)!, (p) => dd(0, p)), A2 = lineParams(rd(0), (p) => dd(0, p)); expect([A1.m, A1.c]).toEqual([expect.closeTo(2, 1), expect.closeTo(1, 1)]); expect([A2.m, A2.c]).toEqual([expect.closeTo(0, 1), expect.closeTo(7, 1)])
    const xa = (A2.c - A1.c) / (A1.m - A2.m); expect(xa).toBeCloseTo(3, 1); expect(A1.m * xa + A1.c).toBeCloseTo(7, 1)                                       // 2x + 1 = 7 → x = 3
    const par = pathsOf(s, BLUE)[0].points!.map((p) => dd(1, p)); par.forEach((p) => expect(Math.abs(p.y - p.x * p.x)).toBeLessThan(0.02 + 0.025 * Math.abs(2 * p.x)))   // rounding to 0.01 on a steep curve
    const four = lineParams(rd(1), (p) => dd(1, p)); expect(four.m).toBeCloseTo(0, 1); expect(four.c).toBeCloseTo(4, 1)
    const xb = crossings(par.map((p) => ({ x: p.x, y: p.y - four.c }))).sort((p, q) => p - q); expect(xb).toHaveLength(2); expect(xb[0]).toBeCloseTo(-2, 1); expect(xb[1]).toBeCloseTo(2, 1)   // x² = 4 → ±2
    const C1 = lineParams(bl(2)!, (p) => dd(2, p)), C2 = lineParams(rd(2), (p) => dd(2, p)); expect(C1.m).toBeCloseTo(C2.m, 6); expect(C1.m).toBeCloseTo(1, 2); expect(Math.abs(C1.c - C2.c)).toBeGreaterThan(0.5)   // parallel, different intercepts
    const g = dots(s, GREEN).map((d) => ({ panel: panelOf(d.position![0]), ...dd(panelOf(d.position![0]), d.position!) })); expect([0, 1, 2].map((p) => g.filter((q) => q.panel === p).length)).toEqual([1, 2, 0])
    g.filter((q) => q.panel === 0).forEach((q) => { expect(q.x).toBeCloseTo(3, 1); expect(q.y).toBeCloseTo(7, 1) }); g.filter((q) => q.panel === 1).map((q) => q.x).sort((p, r) => p - r).forEach((x, i) => { expect(x).toBeCloseTo([-2, 2][i], 1); expect(Math.abs(x * x - 4)).toBeLessThan(0.1) })
    const setOf = (t: string) => t.replace(/[{}]/g, '').split(',').map((v) => num(v.trim()))
    expect(setOf(labelAt(s, [M.solAt(0, 2, 0)[0], -3.35])!.text!)).toEqual([3]); expect(setOf(labelAt(s, [M.solAt(1, 0, 0)[0], -3.35])!.text!)).toEqual([-2, 2]); expect(labelAt(s, [M.solAt(2, 2, 0)[0], -3.35])?.text).toBe('∅')
    const t = /(\d+)x \+ (\d+) = (\d+)/.exec(labelAt(s, [M.solAt(0, 2, 0)[0], 2.7])!.text!)!; expect((Number(t[3]) - Number(t[2])) / Number(t[1])).toBe(3)       // the title solves to the set shown
    expect(labelAt(s, [M.solAt(0, 3, 0)[0], oy - 0.45])?.text).toBe('3'); expect(labelAt(s, [M.solAt(1, -2, 0)[0], oy - 0.45])?.text).toBe('−2'); expect(labelAt(s, [M.solAt(1, 2, 0)[0], oy - 0.45])?.text).toBe('2')
    expect(texts(s)).toEqual(expect.arrayContaining(['x² = 4', 'x + 1 = x']))
  })

  it('Substitution method: the two drawn lines are y = x + 1 and y = 7 − 2x and cross at (2, 3); the written chain 2x + (x + 1) = 7 → 3x + 1 = 7 → x = 2 → y = 3 follows from them', () => {
    const s = M.buildSubstitutionMethodScene(), { ox, oy, u, cx, rows } = M.SBM, o = M.sbmAt(0, 0)
    const dd = (p: number[]) => ({ x: (p[0] - ox) / u, y: (p[1] - oy) / u })
    const L1 = lineParams(bonds(s, BLUE, 0.04)[0], dd), L2 = lineParams(bonds(s, RED, 0.04)[0], dd); expect([L1.m, L1.c]).toEqual([expect.closeTo(1, 1), expect.closeTo(1, 1)]); expect([L2.m, L2.c]).toEqual([expect.closeTo(-2, 1), expect.closeTo(7, 1)])
    const x = (L2.c - L1.c) / (L1.m - L2.m), y = L1.m * x + L1.c; expect(x).toBeCloseTo(2, 1); expect(y).toBeCloseTo(3, 1); expect(y).toBeCloseTo(L2.m * x + L2.c, 6)
    const p = dd(dots(s, GREEN)[0].position!); expect(p.x).toBeCloseTo(2, 1); expect(p.y).toBeCloseTo(3, 1)
    const guides = bonds(s, VIOLET, 0.025); expect(guides).toHaveLength(2); expect(guides.map((q) => len(q) / u).sort((a, b) => a - b)).toEqual([expect.closeTo(2, 1), expect.closeTo(3, 1)])
    const at = (k: number) => labelAt(s, [cx, rows[k]])!.text!
    const first = /y = x \+ (\d+)/.exec(at(0))!, second = /2x \+ y = (\d+)/.exec(at(1))!; expect(Number(first[1])).toBeCloseTo(L1.c, 1); expect(Number(second[1])).toBeCloseTo(L2.c, 1)
    const sub = /2x \+ \(x \+ (\d+)\) = (\d+)/.exec(at(2))!; expect(Number(sub[1])).toBe(Number(first[1])); expect(Number(sub[2])).toBe(Number(second[1]))     // y replaced by x + 1
    const comb = /(\d+)x \+ (\d+) = (\d+)/.exec(at(3))!; expect(Number(comb[1])).toBe(2 + 1); expect(Number(comb[2])).toBe(Number(first[1])); expect(Number(comb[3])).toBe(Number(second[1]))
    const xSol = (Number(comb[3]) - Number(comb[2])) / Number(comb[1]); expect(xSol).toBe(Number(at(4).split('=')[1])); expect(xSol).toBeCloseTo(x, 1)
    const ySol = xSol + Number(first[1]); expect(ySol).toBe(Number(at(5).split('=')[1])); expect(ySol).toBeCloseTo(y, 1)
    const arr = arrows(s, VIOLET); expect(arr).toHaveLength(4); arr.forEach((a) => { expect(a.to![1]).toBeLessThan(a.from![1]); expect(a.from![0]).toBeCloseTo(cx, 1) })
    expect(s.steps[1].objects.filter((q) => (q as Obj).type === 'arrow')).toHaveLength(2); expect(s.steps[2].objects.filter((q) => (q as Obj).type === 'arrow')).toHaveLength(2)
    expect(labelAt(s, [M.sbmAt(2, 0)[0], o[1] - 0.45])?.text).toBe('2'); expect(labelAt(s, [o[0] - 0.4, M.sbmAt(0, 3)[1]])?.text).toBe('3')
  })

  it('Elimination method: the y-coefficients +1 and −1 add to 0 (a cross between them), x + x = 2x and 5 + 1 = 6 give x = 3 and y = 2, and the two drawn lines cross at (3, 2)', () => {
    const s = M.buildEliminationMethodScene(), { cols, rows, ox, oy, u } = M.ELM, o = M.elmAt(0, 0)
    const at = (c: number, y: number) => labelAt(s, [cols[c], y])?.text
    expect([0, 1, 2, 3, 4].map((c) => at(c, rows.a))).toEqual(['x', '+', 'y', '=', '5']); expect([0, 1, 2, 3, 4].map((c) => at(c, rows.b))).toEqual(['x', '−', 'y', '=', '1'])
    const sign = (t?: string) => (t === '+' ? 1 : -1); expect(sign(at(1, rows.a)) + sign(at(1, rows.b))).toBe(0)                                           // +y and −y cancel
    expect(at(1, rows.s)).toBeUndefined(); expect(at(2, rows.s)).toBeUndefined()                                                                       // so no y term is left in the sum
    const xSum = 1 + 1, rhsSum = Number(at(4, rows.a)) + Number(at(4, rows.b)); expect(at(0, rows.s)).toBe(`${xSum}x`); expect(Number(at(4, rows.s))).toBe(rhsSum); expect(at(3, rows.s)).toBe('=')
    const xv = rhsSum / xSum; expect(xv).toBe(3); expect(labelAt(s, [-3.0, rows.x])?.text).toBe(`x = ${xv}`)
    const yv = Number(at(4, rows.a)) - xv; expect(yv).toBe(2); expect(labelAt(s, [-3.0, rows.y])?.text).toBe(`y = ${yv}`); expect(xv - yv).toBe(Number(at(4, rows.b)))   // also satisfies x − y = 1
    const cr = bonds(s, VIOLET, 0.05); expect(cr).toHaveLength(2); cr.forEach((c) => { expect((c.from![0] + c.to![0]) / 2).toBeCloseTo(cols[2], 1); expect((c.from![1] + c.to![1]) / 2).toBeCloseTo((rows.a + rows.b) / 2, 1) })
    const dd = (p: number[]) => ({ x: (p[0] - ox) / u, y: (p[1] - oy) / u }), L1 = lineParams(bonds(s, BLUE, 0.04)[0], dd), L2 = lineParams(bonds(s, RED, 0.04)[0], dd)
    expect([L1.m, L1.c]).toEqual([expect.closeTo(-1, 1), expect.closeTo(5, 1)]); expect([L2.m, L2.c]).toEqual([expect.closeTo(1, 1), expect.closeTo(-1, 1)])  // x + y = 5 and x − y = 1
    const x = (L2.c - L1.c) / (L1.m - L2.m); expect(x).toBeCloseTo(xv, 1); expect(L1.m * x + L1.c).toBeCloseTo(yv, 1)
    const g = dd(dots(s, GREEN)[0].position!); expect(g.x).toBeCloseTo(3, 1); expect(g.y).toBeCloseTo(2, 1)
    expect(labelAt(s, [M.elmAt(3, 0)[0], o[1] - 0.45])?.text).toBe('3'); expect(labelAt(s, [o[0] - 0.4, M.elmAt(0, 2)[1]])?.text).toBe('2')
    expect(hasText(s, 'y cancels')).toBe(true)
  })

  it('Degree: each drawn curve is its polynomial, crosses the x-axis exactly as many times as its degree (1, 2, 3 — green points on those crossings), and the highest power in its label is that degree', () => {
    const s = M.buildDegreeScene(), { s: sc, oy, ox, polys } = M.DEG
    const curves = pathsOf(s, BLUE).sort((p, q) => p.points![0][0] - q.points![0][0]); expect(curves).toHaveLength(3)
    const greenAll = dots(s, GREEN), panelOfX = (px: number) => ox.reduce((best, c, i) => (Math.abs(px - c) < Math.abs(px - ox[best]) ? i : best), 0)
    curves.forEach((c, p) => {
      const pts = c.points!.map((q) => ({ x: (q[0] - ox[p]) / sc, y: (q[1] - oy) / sc })); pts.forEach((q) => { const h = 1e-3, slope = (polys[p].f(q.x + h) - polys[p].f(q.x - h)) / (2 * h); expect(Math.abs(q.y - polys[p].f(q.x))).toBeLessThan(0.03 + 0.012 * Math.abs(slope)) })
      const roots = crossings(pts), titleX = M.degAt(p, (polys[p].x0 + polys[p].x1) / 2, 0)[0]
      const degree = numsIn(labelAt(s, [titleX, 2.4])!.text!)[0], formula = labelAt(s, [titleX, -2.5])!.text!, top = /x([²³]?)/.exec(formula)![1]
      expect(roots).toHaveLength(degree); expect(degree).toBe(p + 1); expect(degree).toBe(top ? supNum(top) : 1)                                           // roots = degree = highest power
      const mine = greenAll.filter((d) => panelOfX(d.position![0]) === p).map((d) => ({ x: (d.position![0] - ox[p]) / sc, y: (d.position![1] - oy) / sc })).sort((a, b) => a.x - b.x)
      expect(mine).toHaveLength(degree); mine.forEach((d, i) => { expect(d.y).toBeCloseTo(0, 1); expect(d.x).toBeCloseTo(roots.sort((a, b) => a - b)[i], 1); expect(Math.abs(polys[p].f(d.x))).toBeLessThan(0.1) })
    })
    expect(greenAll).toHaveLength(1 + 2 + 3)
  })

  it('Polynomial operations: the drawn pieces are x by x, x by 3 units, 2 units by x and 2 × 3 unit squares, they add up to the whole (x + 2) by (x + 3) rectangle, and the areas give x² + 5x + 6', () => {
    const s = M.buildPolynomialOperationsScene()
    const [F] = boxesOf(s, SLATE, 0.05), [B] = boxesOf(s, BLUE, 0.05), [G1, G2] = boxesOf(s, GREEN, 0.05), [R] = boxesOf(s, RED, 0.05)
    const W = (b: { x0: number; x1: number }) => b.x1 - b.x0, H = (b: { y0: number; y1: number }) => b.y1 - b.y0
    expect(W(B)).toBeCloseTo(H(B), 2); const X = W(B)                                                                                                    // x by x
    const grid = bonds(s, SLATE, 0.03), gh = grid.filter((o) => near(o.from![1], o.to![1], 1e-6)).map((o) => o.from![1]).sort((p, q) => p - q), gv = grid.filter((o) => near(o.from![0], o.to![0], 1e-6)).map((o) => o.from![0])
    expect(gh).toHaveLength(2); expect(gv).toHaveLength(1)
    const u = gh[0] - R.y0; expect(gh[1] - gh[0]).toBeCloseTo(u, 2); expect(gv[0] - R.x0).toBeCloseTo(u, 2); expect(W(R)).toBeCloseTo(2 * u, 2); expect(H(R)).toBeCloseTo(3 * u, 2)    // six unit squares: 2 across, 3 up
    expect(W(G1)).toBeCloseTo(X, 2); expect(H(G1)).toBeCloseTo(3 * u, 2); expect(W(G2)).toBeCloseTo(2 * u, 2); expect(H(G2)).toBeCloseTo(X, 2)
    expect(W(F)).toBeCloseTo(X + 2 * u, 2); expect(H(F)).toBeCloseTo(X + 3 * u, 2)                                                                       // (x + 2) by (x + 3)
    const areas = [W(B) * H(B), W(G1) * H(G1), W(G2) * H(G2), W(R) * H(R)]; expect(sum(areas)).toBeCloseTo(W(F) * H(F), 1)
    expect(areas[0] / (X * X)).toBeCloseTo(1, 1); expect(areas[1] / (X * u)).toBeCloseTo(3, 1); expect(areas[2] / (X * u)).toBeCloseTo(2, 1); expect(areas[3] / (u * u)).toBeCloseTo(6, 1)  // x² + 3x + 2x + 6
    expect((areas[1] + areas[2]) / (X * u)).toBeCloseTo(5, 1)
    const mid = (b: { x0: number; x1: number; y0: number; y1: number }, dy = 0) => [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2 + dy]
    expect(labelAt(s, mid(B))?.text).toBe('x²'); expect(labelAt(s, mid(G1))?.text).toBe('3x'); expect(labelAt(s, mid(G2))?.text).toBe('2x'); expect(labelAt(s, [R.x0 + u / 2, R.y0 + 2.5 * u])?.text).toBe('6')
    expect(labelAt(s, [(F.x0 + B.x1) / 2, F.y1 + 0.4])?.text).toBe('x'); expect(labelAt(s, [(B.x1 + F.x1) / 2, F.y1 + 0.4])?.text).toBe('2')
    expect(labelAt(s, [F.x0 - 0.4, (B.y0 + B.y1) / 2])?.text).toBe('x'); expect(labelAt(s, [F.x0 - 0.4, F.y0 + 1.5 * u])?.text).toBe('3')
    const f = /\(x \+ (\d+)\)\(x \+ (\d+)\)/.exec('(x + 2)(x + 3)')!, a = Number(f[1]), b = Number(f[2]); expect(hasText(s, '(x + 2)(x + 3)')).toBe(true); expect(hasText(s, 'x² + 5x + 6')).toBe(true)
    expect([a + b, a * b]).toEqual([5, 6]); expect(a).toBeCloseTo(W(R) / u, 6); expect(b).toBeCloseTo(H(R) / u, 6)
  })

  it('Polynomial division: the drawn rows are x² + 5x + 7 ÷ (x + 2) = x + 3 remainder 1 — each product row is quotient term × divisor, each subtraction and the brought-down 7 follow from the rows above, and (x + 2)(x + 3) + 1 = x² + 5x + 7', () => {
    const s = M.buildPolynomialDivisionScene(), { cols, rows, divX } = M.PDV
    const at = (c: number, r: number) => labelAt(s, [cols[c], r])?.text
    const term = (t: string) => (t === 'x²' ? { deg: 2, c: 1 } : /^(\d*)x$/.test(t) ? { deg: 1, c: Number(t.slice(0, -1) || 1) } : { deg: 0, c: Number(t) })
    const dividend = [at(0, rows.top), at(1, rows.top), at(2, rows.top)].map((t) => term(t!)); expect(dividend.map((d) => d.deg)).toEqual([2, 1, 0]); const P = dividend.map((d) => d.c); expect(P).toEqual([1, 5, 7])
    const dv = /x \+ (\d+)/.exec(labelAt(s, [divX, rows.top])!.text!)!, D = [1, Number(dv[1])]; expect(D).toEqual([1, 2])
    const q1 = term(at(1, rows.q)!), q0 = term(at(2, rows.q)!); expect([q1.deg, q1.c, q0.deg, q0.c]).toEqual([1, 1, 0, 3])
    expect([term(at(0, rows.r1)!).c, term(at(1, rows.r1)!).c]).toEqual([q1.c * D[0], q1.c * D[1]])                                                     // x · (x + 2) = x² + 2x
    const d1 = term(at(1, rows.d1)!).c; expect(d1).toBe(P[1] - q1.c * D[1]); expect(at(0, rows.d1)).toBeUndefined(); expect(P[0] - q1.c * D[0]).toBe(0)  // the x² term cancels, leaving 3x
    expect(term(at(2, rows.d1)!).c).toBe(P[2]); expect(labelsOf(s).find((o) => o.text === '7' && o.color === RED)).toBeDefined()                          // the 7 is brought down
    expect(d1).toBe(q0.c * D[0] * 1)                                                                                                                   // 3x ÷ x = 3
    expect([term(at(1, rows.r2)!).c, term(at(2, rows.r2)!).c]).toEqual([q0.c * D[0], q0.c * D[1]])                                                    // 3 · (x + 2) = 3x + 6
    const rem = term(at(2, rows.d2)!).c; expect(rem).toBe(P[2] - q0.c * D[1]); expect(rem).toBe(1); expect(at(1, rows.d2)).toBeUndefined()           // remainder 1 of degree 0 < degree 1
    const mul = (a: number[], b: number[]) => { const out = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y })); return out }
    const prod = mul(D, [q1.c, q0.c]); prod[prod.length - 1] += rem; expect(prod).toEqual(P)                                                              // p = d·q + r
    expect(hasText(s, 'quotient x + 3')).toBe(true); expect(Number(/x \+ (\d+)/.exec('quotient x + 3')![1])).toBe(q0.c); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('remainder'))!.text!)[0]).toBe(rem)
    const rules = bonds(s, SLATE, 0.03); expect(rules).toHaveLength(2); expect(rules[0].from![1]).toBeCloseTo((rows.r1 + rows.d1) / 2, 1); expect(rules[1].from![1]).toBeCloseTo((rows.r2 + rows.d2) / 2, 1)
    expect(labelsOf(s).filter((o) => o.text === '−')).toHaveLength(2)                                                                                  // two subtractions
  })

  it('Factoring: the drawn curve is y = x² + 5x + 6, it crosses the x-axis at −3 and −2 (the green points), the factors written under them are (x + 3) and (x + 2), and 3 + 2 = 5, 3 × 2 = 6 give back the polynomial', () => {
    const s = M.buildFactoringScene(), { ox, oy, ux, uy } = M.FCT
    const cv = pathsOf(s, BLUE)[0].points!.map((p) => ({ x: (p[0] - ox) / ux, y: (p[1] - oy) / uy })); cv.forEach((p) => expect(Math.abs(p.y - (p.x * p.x + 5 * p.x + 6))).toBeLessThan(0.05))
    expect(Math.min(...cv.map((p) => p.y))).toBeCloseTo(-0.25, 1)
    const roots = crossings(cv).sort((a, b) => a - b); expect(roots).toHaveLength(2); expect(roots[0]).toBeCloseTo(-3, 1); expect(roots[1]).toBeCloseTo(-2, 1)
    const g = dots(s, GREEN).map((d) => ({ x: (d.position![0] - ox) / ux, y: (d.position![1] - oy) / uy })).sort((a, b) => a.x - b.x); expect(g).toHaveLength(2)
    g.forEach((d, i) => { expect(d.y).toBeCloseTo(0, 1); expect(d.x).toBeCloseTo(roots[i], 1) })
    ;['−3', '−2'].forEach((t, i) => expect(labelAt(s, [M.fctAt(g[i].x, 0)[0], M.fctAt(0, 0)[1] - 0.45])?.text).toBe(t))
    const fl = labelsOf(s).filter((o) => /^\(x \+ \d+\)$/.test(o.text!)).sort((p, q) => p.position![0] - q.position![0]); expect(fl).toHaveLength(2)
    fl.forEach((o, i) => { const a = numsIn(o.text!)[0]; expect(-a).toBeCloseTo(roots[i], 1); expect(Math.abs(o.position![0] - M.fctAt(roots[i], 0)[0])).toBeLessThan(1.0) })   // each factor sits under its own root
    const [r1, r2] = roots.map(Math.round); expect(hasText(s, '(x + 3)(x + 2)')).toBe(true)
    expect([-(r1 + r2), r1 * r2]).toEqual([5, 6]); expect(hasText(s, 'x² + 5x + 6')).toBe(true)                                                         // coefficients from the roots
    ;[-4, -3, -2, -1].forEach((x) => expect((x + 3) * (x + 2)).toBeCloseTo(x * x + 5 * x + 6, 9))
  })

  it('Factoring trinomials: every listed pair has product 6 and the sum written beside it, only (2, 3) has sum 5 (green, the rest red), the list is every integer pair with product 6, and the split x² + 2x + 3x + 6 groups to (x + 2)(x + 3)', () => {
    const s = M.buildFactoringTrinomialsScene(), { pairs, cols } = M.FTR
    const at = (i: number, c: keyof typeof cols) => num(labelAt(s, M.ftrAt(i, c))!.text!)
    const title = /x² \+ (\d+)x \+ (\d+)/.exec(labelsOf(s).find((o) => o.text!.startsWith('x² + 5x'))!.text!)!, B = Number(title[1]), C = Number(title[2]); expect([B, C]).toEqual([5, 6])
    const good: number[] = []
    pairs.forEach((p, i) => {
      const a = at(i, 'a'), b = at(i, 'b'); expect([a, b]).toEqual([p[0], p[1]]); expect(at(i, 'p')).toBe(a * b); expect(a * b).toBe(C); expect(at(i, 's')).toBe(a + b)
      const mark = objs(s).find((o) => o.type === 'node' && o.position && dist(o.position, M.ftrAt(i, 'mark')) < 0.02)!; expect(mark.color).toBe(a + b === B ? GREEN : RED); if (a + b === B) good.push(i)
    })
    expect(good).toEqual([1]); expect(dots(s, GREEN)).toHaveLength(1); expect(dots(s, RED)).toHaveLength(3)
    const all = new Set<string>(); for (const d of [1, 2, 3, 6, -1, -2, -3, -6]) { const e = C / d; if (Number.isInteger(e)) all.add([d, e].sort((x, y) => x - y).join(',')) }
    expect(new Set(pairs.map((p) => [p[0], p[1]].sort((x, y) => x - y).join(',')))).toEqual(all)                                                       // the table is complete
    const split = /x² \+ (\d+)x \+ (\d+)x \+ (\d+)/.exec(labelsOf(s).find((o) => o.text!.startsWith('x² + 2x'))!.text!)!, p = Number(split[1]), q = Number(split[2]); expect([p + q, p * q, Number(split[3])]).toEqual([B, C, C])
    expect([p, q]).toEqual([pairs[good[0]][0], pairs[good[0]][1]])                                                                                      // the split uses the green pair
    const f = /\(x \+ (\d+)\)\(x \+ (\d+)\)/.exec(labelsOf(s).find((o) => o.text!.startsWith('(x +'))!.text!)!; expect([Number(f[1]) + Number(f[2]), Number(f[1]) * Number(f[2])]).toEqual([B, C])
    ;[-3, 0, 1, 4].forEach((x) => expect((x + p) * (x + q)).toBeCloseTo(x * x + B * x + C, 9))
    expect(hasText(s, 'need sum 5')).toBe(true)
  })
})
