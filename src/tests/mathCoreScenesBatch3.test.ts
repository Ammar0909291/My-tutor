/**
 * Mathematics visual campaign, batch 3 (2026-10-11): twelve arithmetic / number-sense concepts.
 * Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped
 * back to math coordinates and compared with an independent calculation — not just
 * that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB3'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const hasDot = (s: SceneSpec, x: number, y: number, tol = 0.025) => dots(s).some((d) => near(d.position![0], x, tol) && near(d.position![1], y, tol))
/** Map screen coordinates back to math coordinates for a figure drawn as (x*u+ox, y*u+oy). */
const back = (u: number, ox = 0, oy = 0) => (p: number[]): [number, number] => [(p[0] - ox) / u, (p[1] - oy) / u]

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.arith.fraction-equivalence', M.buildEquivalentFractionsScene, 'math-fraction-equivalence'],
  ['math.arith.fraction-simplification', M.buildFractionSimplificationScene, 'math-fraction-simplification'],
  ['math.arith.fraction-addition', M.buildFractionAdditionScene, 'math-fraction-addition'],
  ['math.arith.improper-fractions', M.buildImproperFractionsScene, 'math-improper-fractions'],
  ['math.arith.place-value', M.buildPlaceValueScene, 'math-place-value'],
  ['math.arith.multiplication', M.buildMultiplicationScene, 'math-multiplication'],
  ['math.arith.division', M.buildDivisionScene, 'math-division'],
  ['math.arith.number-base', M.buildNumberBaseScene, 'math-number-base'],
  ['math.arith.ratios', M.buildRatioScene, 'math-ratio'],
  ['math.arith.direct-variation', M.buildDirectVariationScene, 'math-direct-variation'],
  ['math.arith.inverse-variation', M.buildInverseVariationScene, 'math-inverse-variation'],
  ['math.arith.percentage-change', M.buildPercentageChangeScene, 'math-percentage-change'],
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
})

const tubes = (s: SceneSpec, color?: string) => lines(s, color).filter((o) => (o as Obj).thickness !== undefined && ((o as Obj).thickness ?? 0) >= 0.25)
const sortX = <T extends Obj>(a: T[]) => [...a].sort((p, q) => p.from![0] - q.from![0])

describe('the mathematics each figure draws', () => {
  it('Equivalent fractions: 1/2, 2/4 and 4/8 shade the same fraction of the same length, so all three end at one line; ad = bc holds for each pair', () => {
    const { W, rows } = M.EQF
    for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) expect(M.equivalent(rows[i].k, rows[i].n, rows[j].k, rows[j].n)).toBe(true)
    expect(M.equivalent(1, 2, 3, 4)).toBe(false); expect(M.equivalent(1, 2, 2, 3)).toBe(false)
    const s = M.buildEquivalentFractionsScene()
    const t = tubes(s)
    expect(t).toHaveLength(1 + 2 + 4)
    for (const r of rows) {
      const row = t.filter((o) => near(o.from![1], r.y, 0.01))
      expect(row, `row ${r.k}/${r.n}`).toHaveLength(r.k)
      const end = Math.max(...row.map((o) => o.to![0]))
      expect(near(end, -W / 2 + (W * r.k) / r.n - 0.05, 0.02)).toBe(true)         // shaded part ends at k/n of the bar
      expect(r.k / r.n).toBe(0.5)
    }
    const ends = rows.map((r) => Math.max(...t.filter((o) => near(o.from![1], r.y, 0.01)).map((o) => o.to![0])))
    expect(near(ends[0], ends[1], 0.02) && near(ends[1], ends[2], 0.02)).toBe(true)  // the same place in all three bars
    // each bar has n cells: n + 1 vertical cell edges of that bar's height
    for (const r of rows) {
      const edges = lines(s, SLATE).filter((o) => near(o.from![0], o.to![0]) && near(len(o), 0.7, 0.01) && near((o.from![1] + o.to![1]) / 2, r.y, 0.01))
      expect(edges, `cells in ${r.n}`).toHaveLength(r.n + 1)
    }
    expect(texts(s)).toEqual(expect.arrayContaining(['1/2', '2/4', '4/8', 'ad = bc: 1 \u00D7 4 = 2 \u00D7 2']))
  })

  it('Fraction simplification: 6/8 = 3/4 by dividing by gcd(6, 8) = 2, and 3/4 is in lowest terms', () => {
    const { W, num, den, y1, y2 } = M.SIMP
    expect(M.gcd(num, den)).toBe(2); expect(M.gcd(3, 4)).toBe(1); expect(num / den).toBe(3 / 4)
    const s = M.buildFractionSimplificationScene()
    const t = tubes(s)
    const r1 = t.filter((o) => near(o.from![1], y1, 0.01)), r2 = t.filter((o) => near(o.from![1], y2, 0.01))
    expect(r1).toHaveLength(6); expect(r2).toHaveLength(3)
    expect(near(Math.max(...r1.map((o) => o.to![0])), Math.max(...r2.map((o) => o.to![0])), 0.03)).toBe(true)   // same amount: same end
    // the violet brackets group the 8 cells in pairs: 4 brackets, each as wide as 2 cells
    const brackets = lines(s, VIOLET).filter((o) => near(o.from![1], o.to![1]) && near(o.from![1], y1 - 0.55, 0.01))
    expect(brackets).toHaveLength(4)
    for (const b of brackets) expect(near(len(b), (W / den) * 2 - 0.16, 0.02)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['6/8', '3/4', 'gcd(6, 8) = 2', '\u00F7 2', 'gcd(3, 4) = 1: lowest terms']))
  })

  it('Fraction addition: 1/3 = 4/12, 1/4 = 3/12, and 4/12 + 3/12 = 7/12 = 1/3 + 1/4', () => {
    const { W, rows } = M.ADDF
    expect(M.lcm(3, 4)).toBe(12)
    expect(1 / 3 + 1 / 4).toBeCloseTo(7 / 12, 12); expect(4 / 12).toBeCloseTo(1 / 3, 12); expect(3 / 12).toBeCloseTo(1 / 4, 12)
    const s = M.buildFractionAdditionScene()
    const t = tubes(s)
    const at = (y: number) => t.filter((o) => near(o.from![1], y, 0.01))
    expect(at(rows.a)).toHaveLength(1); expect(at(rows.b)).toHaveLength(1)
    expect(at(rows.a12)).toHaveLength(4); expect(at(rows.b12)).toHaveLength(3)
    const sum = at(rows.sum)
    expect(sum.filter((o) => o.color === RED)).toHaveLength(4); expect(sum.filter((o) => o.color === BLUE)).toHaveLength(3)
    expect(sum).toHaveLength(7)
    // the re-cut pieces end exactly where the original pieces ended (same amount)
    const end = (y: number) => Math.max(...at(y).map((o) => o.to![0]))
    expect(near(end(rows.a12), end(rows.a), 0.02)).toBe(true); expect(near(end(rows.b12), end(rows.b), 0.02)).toBe(true)
    expect(near(end(rows.a), -W / 2 + W / 3 - 0.05, 0.02)).toBe(true); expect(near(end(rows.b), -W / 2 + W / 4 - 0.05, 0.02)).toBe(true)
    // in the answer bar the blue pieces follow the red ones, with no gap, and stop at 7/12 of the bar
    const xs = sortX(sum)
    expect(xs.map((o) => o.color)).toEqual([RED, RED, RED, RED, BLUE, BLUE, BLUE])
    expect(near(Math.max(...sum.map((o) => o.to![0])), -W / 2 + (W * 7) / 12 - 0.05, 0.02)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['1/3', '1/4', '4/12', '3/12', '7/12', 'LCM(3, 4) = 12', '4/12 + 3/12 = 7/12']))
  })

  it('Improper fractions: 7/3 is seven thirds across three wholes (2 full + 1), lies between 2 and 3 on the number line, and 3/3 = 1', () => {
    const { W, whole, num, den, barY, lineY } = M.IMPR
    expect(num).toBeGreaterThan(den); expect(num / den).toBeGreaterThan(2); expect(num / den).toBeLessThan(3); expect(den / den).toBe(1)
    const s = M.buildImproperFractionsScene()
    const t = tubes(s).filter((o) => near(o.from![1], barY, 0.01))
    expect(t).toHaveLength(num)                                                    // 7 shaded thirds
    const unit = W / whole
    const endX = Math.max(...t.map((o) => o.to![0]))
    expect(near(endX, -W / 2 + (num / den) * unit - 0.05, 0.02)).toBe(true)
    // the marked point on the number line sits at 7/3 of the unit, directly under the end of the shading
    const d = dots(s, GREEN)[0]
    expect(near(d.position![1], lineY, 0.01)).toBe(true)
    expect(near(d.position![0], -W / 2 + (num / den) * unit, 0.02)).toBe(true)
    expect(Math.abs(d.position![0] - endX)).toBeLessThan(0.06)
    // number line ticks at 0, 1, 2, 3
    const ticks = lines(s, SLATE).filter((o) => near(o.from![0], o.to![0]) && near(len(o), 0.3, 0.01)).map((o) => o.from![0]).sort((p, q) => p - q)
    expect(ticks).toHaveLength(whole + 1)
    ticks.forEach((x, i) => expect(near(x, -W / 2 + i * unit, 0.01)).toBe(true))
    expect(texts(s)).toEqual(expect.arrayContaining(['3/3 = 1 whole', '7/3', '7 pieces of 1/3', '7/3 is more than 1']))
  })

  it('Place value: 3,482 has 3, 4, 8 and 2 counters in the thousands, hundreds, tens and ones columns, worth 3000 + 400 + 80 + 2', () => {
    const { digits, values, xs } = M.PLACE
    expect(M.placeSum(digits, values)).toBe(3482)
    expect(M.placeSum([3, 4, 8, 2], [1000, 100, 10, 1])).toBe(3482)
    expect(digits.map((d, i) => d * values[i])).toEqual([3000, 400, 80, 2])
    const s = M.buildPlaceValueScene()
    const counters = dots(s)
    expect(counters).toHaveLength(17)
    digits.forEach((d, c) => expect(counters.filter((o) => near(o.position![0], xs[c], 0.01)), `column ${c}`).toHaveLength(d))
    // the digit shown under each column equals the number of counters above it
    const digitLabels = labelsOf(s).filter((o) => /^\d$/.test(o.text ?? ''))
    for (const l of digitLabels) expect(counters.filter((o) => near(o.position![0], l.position![0], 0.01))).toHaveLength(Number(l.text))
    expect(texts(s)).toEqual(expect.arrayContaining(['thousands', 'hundreds', 'tens', 'ones', '3 \u00D7 1000', '4 \u00D7 100', '8 \u00D7 10', '2 \u00D7 1', '3000 + 400 + 80 + 2 = 3482']))
  })

  it('Multiplication: 3 rows of 4 and 4 rows of 3 are both 12 dots, and the row sums are 4 + 4 + 4 and 3 + 3 + 3 + 3', () => {
    const { rows, cols } = M.MUL
    expect(rows * cols).toBe(12); expect(cols * rows).toBe(12)
    const s = M.buildMultiplicationScene()
    const a = dots(s, BLUE), b = dots(s, RED)
    expect(a).toHaveLength(12); expect(b).toHaveLength(12)
    const distinct = (xs: number[]) => new Set(xs.map((v) => Math.round(v * 100))).size
    expect(distinct(a.map((d) => d.position![1]))).toBe(rows); expect(distinct(a.map((d) => d.position![0]))).toBe(cols)
    expect(distinct(b.map((d) => d.position![1]))).toBe(cols); expect(distinct(b.map((d) => d.position![0]))).toBe(rows)
    expect(texts(s)).toEqual(expect.arrayContaining(['3 rows of 4', '4 + 4 + 4 = 12', '4 rows of 3', '3 + 3 + 3 + 3 = 12']))
  })

  it('Division: 13 ÷ 4 = 3 remainder 1; three brackets each cover exactly four dots and the one left over is the last', () => {
    const { total, size } = M.DIV
    expect(M.divmod(total, size)).toEqual([3, 1]); expect(3 * 4 + 1).toBe(13)
    const s = M.buildDivisionScene()
    const row = dots(s, BLUE)
    expect(row).toHaveLength(13)
    const xs = row.map((d) => d.position![0]).sort((p, q) => p - q)
    const tops = lines(s, VIOLET).filter((o) => near(o.from![1], o.to![1]))
    expect(tops).toHaveLength(3)
    for (const b of tops) {
      const lo = Math.min(b.from![0], b.to![0]), hi = Math.max(b.from![0], b.to![0])
      expect(xs.filter((x) => x > lo && x < hi)).toHaveLength(size)               // exactly 4 dots inside each bracket
    }
    const leftover = dots(s, RED)
    expect(leftover).toHaveLength(1)
    expect(near(leftover[0].position![0], xs[xs.length - 1], 0.01)).toBe(true)     // the last dot
    for (const b of tops) expect(Math.max(b.from![0], b.to![0])).toBeLessThan(leftover[0].position![0])
    expect(texts(s)).toEqual(expect.arrayContaining(['13 \u00F7 4', '3 groups of 4', '1 left over', '13 \u00F7 4 = 3 remainder 1', '3 \u00D7 4 + 1 = 13']))
  })

  it('Number base: 13 is 1 ten + 3 ones and 1101 in binary (8 + 4 + 0 + 1); the two bars are the same length', () => {
    const { value, binary, binaryPlaces, tens, tenPlaces, unit } = M.BASE
    expect(M.fromDigits(binary, binaryPlaces)).toBe(13); expect(M.fromDigits(tens, tenPlaces)).toBe(13); expect(parseInt('1101', 2)).toBe(13)
    expect(value).toBe(13)
    const s = M.buildNumberBaseScene()
    const L = labelsOf(s).filter((o) => /^\d+$/.test(o.text ?? ''))
    const rowText = (y: number) => L.filter((o) => near(o.position![1], y, 0.01)).sort((p, q) => p.position![0] - q.position![0]).map((o) => o.text)
    expect(rowText(2.2)).toEqual(['1', '3']); expect(rowText(-0.1)).toEqual(['1', '1', '0', '1'])
    expect(rowText(2.2 + 0.95)).toEqual(['10', '1']); expect(rowText(-0.1 + 0.95)).toEqual(['8', '4', '2', '1'])
    const t = tubes(s)
    const top = t.filter((o) => near(o.from![1], -2.6, 0.01)), bottom = t.filter((o) => near(o.from![1], -3.3, 0.01))
    const lenOf = (a: Obj[]) => a.reduce((sum, o) => sum + len(o) + 0.06, 0)       // each tube is drawn 0.03 short at both ends
    expect(near(lenOf(top), 13 * unit, 0.03)).toBe(true); expect(near(lenOf(bottom), 13 * unit, 0.03)).toBe(true)
    expect(bottom.map((o) => Math.round((len(o) + 0.06) / unit))).toEqual([8, 4, 1])
    expect(near(Math.max(...top.map((o) => o.to![0])), Math.max(...bottom.map((o) => o.to![0])), 0.01)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['base 10', 'base 2', '10 + 3 = 8 + 4 + 1']))
  })

  it('Ratio: every row has 2 red for every 3 blue (2:3, 4:6, 6:9), so red ÷ blue = 2/3 in each', () => {
    const { red, blue, ys } = M.RATIO
    expect(red / blue).toBeCloseTo(2 / 3, 12)
    const s = M.buildRatioScene()
    ys.forEach((y, i) => {
      const r = dots(s, RED).filter((d) => near(d.position![1], y, 0.01)).length
      const b = dots(s, BLUE).filter((d) => near(d.position![1], y, 0.01)).length
      expect([r, b]).toEqual([red * (i + 1), blue * (i + 1)])
      expect(r / b).toBeCloseTo(2 / 3, 12); expect(M.gcd(r, b)).toBe(i + 1)
    })
    expect(texts(s)).toEqual(expect.arrayContaining(['2 : 3', '4 : 6', '6 : 9', 'same ratio: red \u00F7 blue = 2/3']))
  })

  it('Direct variation: the dots (1,2), (2,4), (3,6) lie on y = 2x through the origin, and y ÷ x is 2 at each', () => {
    const { u, k, xs, ox, oy } = M.DIRV
    const toMath = back(u, ox, oy)
    const s = M.buildDirectVariationScene()
    const marks = dots(s, INK).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(marks).toHaveLength(3)
    marks.forEach(([x, y], i) => { expect(x).toBeCloseTo(xs[i], 1); expect(y).toBeCloseTo(k * xs[i], 1); expect(y / x).toBeCloseTo(k, 1) })
    expect(M.dirF(2) / M.dirF(1)).toBe(2)                                           // doubling x doubles y
    const o = dots(s, GREEN)[0]; const [oxm, oym] = toMath(o.position!)
    expect(oxm).toBeCloseTo(0, 2); expect(oym).toBeCloseTo(0, 2)                    // through the origin
    const ln = lines(s, INK)[0]
    for (const p of [ln.from!, ln.to!]) { const [x, y] = toMath(p); expect(y).toBeCloseTo(2 * x, 1) }
    expect(texts(s)).toEqual(expect.arrayContaining(['y = 2x', 'through (0, 0)', '(1, 2)', '(2, 4)', '(3, 6)', 'y \u00F7 x = 2 every time']))
  })

  it('Inverse variation: every point of the curve has x·y = 6, and the rectangles under (2, 3) and (3, 2) both have area 6', () => {
    const { u, k, pts, ox, oy } = M.INVV
    const toMath = back(u, ox, oy)
    const s = M.buildInverseVariationScene()
    const curve = paths(s, INK)[0].points!
    for (const p of curve) { const [x, y] = toMath(p); expect(x * y).toBeCloseTo(k, 0) }
    for (const [x, y] of pts) expect(x * y).toBe(6)
    for (const [color, [px, py]] of [[RED, pts[0]], [BLUE, pts[1]]] as const) {
      const sides = lines(s, color)
      expect(sides).toHaveLength(4)
      const w = sides.filter((o) => near(o.from![1], o.to![1])).map(len), h = sides.filter((o) => near(o.from![0], o.to![0])).map(len)
      expect(near(w[0], px * u)).toBe(true); expect(near(h[0], py * u)).toBe(true)
      expect((w[0] / u) * (h[0] / u)).toBeCloseTo(6, 0)                           // area = k
    }
    expect(M.invVarF(2)).toBe(3); expect(M.invVarF(3)).toBe(2); expect(M.invVarF(6)).toBe(1)
    expect(texts(s)).toEqual(expect.arrayContaining(['y = 6/x', '(2, 3)', '(3, 2)', '2 \u00D7 3 = 6', '3 \u00D7 2 = 6', 'x \u00D7 y = 6 always']))
  })

  it('Percentage change: 50 → 65 is +30% and 80 → 60 is −25%, as a fraction of the OLD value, and the bars show exactly that', () => {
    const { unit, up, down, ys } = M.PCT
    expect(M.pctChange(50, 65)).toBeCloseTo(30, 9); expect(M.pctChange(80, 60)).toBeCloseTo(-25, 9)
    expect(M.pctChange(100, 100)).toBe(0)
    const s = M.buildPercentageChangeScene()
    const t = tubes(s)
    const len2 = (o: Obj) => len(o) / unit
    const row = (y: number) => t.filter((o) => near(o.from![1], y, 0.01))
    expect(row(ys.upOld).map(len2)[0]).toBeCloseTo(50, 0)
    const upNew = row(ys.upNew); expect(upNew.map(len2).map(Math.round)).toEqual([50, 15])
    expect(upNew[1].color).toBe(GREEN)
    expect(len2(upNew[1]) / len2(row(ys.upOld)[0])).toBeCloseTo(0.3, 2)           // the change is 30% of the OLD bar
    expect(row(ys.downOld).map(len2)[0]).toBeCloseTo(80, 0)
    const dn = row(ys.downNew); expect(dn.map(len2).map(Math.round)).toEqual([60, 20])
    expect(dn[1].color).toBe(RED)
    expect(len2(dn[1]) / len2(row(ys.downOld)[0])).toBeCloseTo(0.25, 2)
    expect(up.now - up.old).toBe(15); expect(down.now - down.old).toBe(-20)
    expect(texts(s)).toEqual(expect.arrayContaining(['old 50', 'new 65', '+15', '+15 \u00F7 50 = +30%', 'old 80', 'new 60', '\u221220 \u00F7 80 = \u221225%']))
  })
})
