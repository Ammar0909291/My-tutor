/**
 * Mathematics visual campaign, batch 16 (2026-10-12): arithmetic — counting, subitizing, expanded form, the
 * multiplication table, long multiplication, fraction multiplication / division, mixed numbers, proportion,
 * rounding, square numbers, cube numbers and square roots. Each test reads digits, dots, bars, rectangles and
 * arrows back from the DRAWN coordinates and compares them with an independent calculation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB16'

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
  ['math.arith.counting', M.buildCountingScene, 'math-counting'],
  ['math.arith.subitizing', M.buildSubitizingScene, 'math-subitizing'],
  ['math.arith.expanded-form', M.buildExpandedFormScene, 'math-expanded-form'],
  ['math.arith.multiplication-table', M.buildMultiplicationTableScene, 'math-multiplication-table'],
  ['math.arith.long-multiplication', M.buildLongMultiplicationScene, 'math-long-multiplication'],
  ['math.arith.fraction-multiplication', M.buildFractionMultiplicationScene, 'math-fraction-multiplication'],
  ['math.arith.mixed-numbers', M.buildMixedNumbersScene, 'math-mixed-numbers'],
  ['math.arith.proportion', M.buildProportionScene, 'math-proportion'],
  ['math.arith.rounding', M.buildRoundingScene, 'math-rounding'],
  ['math.arith.square-numbers', M.buildSquareNumbersScene, 'math-square-numbers'],
  ['math.arith.cube-numbers', M.buildCubeNumbersScene, 'math-cube-numbers'],
  ['math.arith.square-roots', M.buildSquareRootsScene, 'math-square-roots'],
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
const bbox = (ls: Obj[]) => {
  const xs = ls.flatMap((o) => [o.from![0], o.to![0]]), ys = ls.flatMap((o) => [o.from![1], o.to![1]])
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}
type Box = { x0: number; x1: number; y0: number; y1: number }
const inBox = (p: number[], b: Box, tol = 0) => p[0] > b.x0 - tol && p[0] < b.x1 + tol && p[1] > b.y0 - tol && p[1] < b.y1 + tol
const labelAtXY = (s: SceneSpec, x: number, y: number, tol = 0.02) => labelsOf(s).find((o) => near(o.position![0], x, tol) && near(o.position![1], y, tol))
const supToNum = (t: string) => Number([...t.slice(2)].map((ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(ch)).join(''))
const digitLabels = (s: SceneSpec) => labelsOf(s).filter((o) => /^\d$/.test(o.text ?? ''))
const byX = (a: Obj, b: Obj) => a.position![0] - b.position![0]

describe('the mathematics each figure draws', () => {
  it('Counting: each of the 6 dots gets exactly one of 1…6 (left to right), the last number is the size 6; a shuffled order is still a one-to-one run of 1…6', () => {
    const s = M.buildCountingScene(), { n, yNum, yTop, order } = M.CNT
    const red = dots(s, RED).filter((d) => d.radius === 0.17).sort(byX)
    expect(red).toHaveLength(n)
    const below = red.map((d) => Number(labelAtXY(s, d.position![0], yNum)!.text)), above = red.map((d) => Number(labelAtXY(s, d.position![0], yTop)!.text))
    expect(below).toEqual([1, 2, 3, 4, 5, 6])                                                                                                            // in order
    expect(new Set(below).size).toBe(red.length); expect(Math.max(...below)).toBe(red.length)                                                           // one-to-one, and the last number is the size
    expect(above).toEqual([...order]); expect([...above].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6]); expect(Math.max(...above)).toBe(red.length)    // another order: still a bijection onto 1…6
    const ties = bonds(s, VIOLET, 0.025)
    expect(ties).toHaveLength(12)
    for (const d of red) expect(ties.filter((t) => near(t.from![0], d.position![0], 1e-6)).length).toBe(2)                                               // one tie down and one tie up per dot
    const br = bonds(s, GREEN, 0.045)[0]
    expect(br.from![0]).toBeLessThan(red[0].position![0]); expect(br.to![0]).toBeGreaterThan(red[n - 1].position![0])                                    // the bracket spans every counted object
    expect(texts(s)).toEqual(expect.arrayContaining(['count: 6', 'another order: still 6']))
  })

  it('Subitizing: the dice patterns hold 1, 2, 3, 4 dots (symmetric about their box); the 7 scattered dots split into brackets of 4 and 3, each within the subitizing range', () => {
    const s = M.buildSubitizingScene(), { box, cx, cy } = M.SUBI
    const blue = dots(s, BLUE).filter((d) => d.radius === 0.15), red = dots(s, RED).filter((d) => d.radius === 0.15)
    const counts = cx.map((x) => blue.filter((d) => inBox(d.position!, { x0: x - box / 2, x1: x + box / 2, y0: cy - box / 2, y1: cy + box / 2 })).length)
    expect(counts).toEqual([1, 2, 3, 4]); expect(blue).toHaveLength(10)
    cx.forEach((x, k) => {
      const mine = blue.filter((d) => Math.abs(d.position![0] - x) < box / 2)
      expect(mean(mine.map((d) => d.position![0]))).toBeCloseTo(x, 1); expect(mean(mine.map((d) => d.position![1]))).toBeCloseTo(cy, 1)                // a centred, symmetric pattern
      expect(Number(labelAtXY(s, x, cy - box / 2 - 0.35)!.text)).toBe(k + 1)                                                                            // the numeral under the box names the count
    })
    expect(red).toHaveLength(7)
    const brackets = bonds(s, GREEN, 0.04); expect(brackets).toHaveLength(8)
    const left = bbox(brackets.filter((o) => o.from![0] < 0 && o.to![0] < 0)), right = bbox(brackets.filter((o) => o.from![0] > 0 && o.to![0] > 0))
    const inL = red.filter((d) => inBox(d.position!, left)).length, inR = red.filter((d) => inBox(d.position!, right)).length
    expect([inL, inR]).toEqual([4, 3]); expect(inL + inR).toBe(red.length); expect(Math.max(inL, inR)).toBeLessThanOrEqual(4)                               // 4 + 3 = 7, each chunk ≤ 4
    expect(texts(s)).toEqual(expect.arrayContaining(['up to 4: at a glance', '7: count in groups', '4 + 3 = 7']))
  })

  it('Expanded form: the stacks hold 3, 4, 5 counters of the places 10², 10¹, 10⁰, so 345 = 3 × 100 + 4 × 10 + 5 × 1 = 300 + 40 + 5', () => {
    const s = M.buildExpandedFormScene(), { cols, step, termY } = M.EXPF
    const counters = dots(s).filter((d) => d.radius === 0.2)
    const stacks = cols.map((c) => counters.filter((d) => near(d.position![0], c.x, 1e-6)).sort((a, b) => a.position![1] - b.position![1]))
    expect(stacks.map((st) => st.length)).toEqual([3, 4, 5])
    for (const st of stacks) for (let i = 1; i < st.length; i++) expect(st[i].position![1] - st[i - 1].position![1]).toBeCloseTo(step, 6)                    // evenly stacked
    const pow = cols.map((c) => supToNum(labelAtXY(s, c.x, -1.2)!.text!)); expect(pow).toEqual([2, 1, 0])
    const terms = stacks.map((st, k) => st.length * 10 ** pow[k]); expect(terms).toEqual([300, 40, 5])
    expect(sum(terms)).toBe(345); expect(texts(s)).toContain('345')
    cols.forEach((c, k) => expect(labelAtXY(s, c.x, termY[k])!.text).toBe(`${stacks[k].length} × ${10 ** pow[k]} = ${terms[k]}`))
    expect(texts(s)).toContain('345 = 300 + 40 + 5')
    expect(new Set(stacks.map((st) => st[0].color)).size).toBe(3)                                                                                        // one colour per place
  })

  it('Multiplication table: the grid is 12 × 12; the 7-by-8 rectangle holds 56 cells and its mirror over the diagonal the same 56; the whole table sums to 78² = 6084', () => {
    const s = M.buildMultiplicationTableScene(), { n, u, x0, y0 } = M.MULT
    const grid = bonds(s, SLATE, 0.012); expect(grid).toHaveLength(2 * (n + 1))
    const vx = grid.filter((o) => near(o.from![0], o.to![0], 1e-9)).map((o) => o.from![0]).sort((a, b) => a - b)
    expect(vx).toHaveLength(n + 1); vx.forEach((x, i) => expect(x).toBeCloseTo(x0 + i * u, 6))
    const cells = (b: Box) => { let c = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (inBox([x0 + (i + 0.5) * u, y0 + (j + 0.5) * u], b)) c++; return c }
    const g = bbox(bonds(s, GREEN, 0.06)), bl = bbox(bonds(s, BLUE, 0.04))
    expect(Math.round((g.x1 - g.x0) / u)).toBe(8); expect(Math.round((g.y1 - g.y0) / u)).toBe(7); expect(cells(g)).toBe(56)                                  // 7 rows × 8 columns
    expect(cells({ x0: bl.x0 - 0.05, x1: bl.x1 + 0.05, y0: bl.y0 - 0.05, y1: bl.y1 + 0.05 })).toBe(56)                                                      // 8 rows × 7 columns
    expect(Math.round((bl.x1 - bl.x0) / u)).toBe(7); expect(Math.round((bl.y1 - bl.y0) / u)).toBe(8)
    const mirror = (p: number[]) => [x0 + (p[1] - y0), y0 + (p[0] - x0)]
    expect(mirror([g.x1, g.y1])[0]).toBeCloseTo(bl.x1, 1); expect(mirror([g.x1, g.y1])[1]).toBeCloseTo(bl.y1, 1)                                         // reflecting the corner over the diagonal
    const diag = bonds(s, VIOLET, 0.03)[0]; expect(slope(diag)).toBeCloseTo(1, 6); expect(distToLine(diag, [x0, y0])).toBeLessThan(1e-6)
    let total = 0; for (let r = 1; r <= n; r++) for (let c = 1; c <= n; c++) total += r * c
    expect(total).toBe(78 * 78); expect(7 * 8).toBe(56)
    for (const k of [1, 7, 8, 12]) { expect(labelAtXY(s, x0 + (k - 0.5) * u, y0 - 0.3)!.text).toBe(String(k)); expect(labelAtXY(s, x0 - 0.3, y0 + (k - 0.5) * u)!.text).toBe(String(k)) }
    expect(texts(s)).toEqual(expect.arrayContaining(['7 × 8 = 56', '8 × 7 = 56', 'mirror']))
  })

  it('Long multiplication: 23 × 14 — partial products 92 and 230 aligned by place value add to 322; the carried 1 sits over the tens digit', () => {
    const s = M.buildLongMultiplicationScene(), { col, row, mul } = M.LONG
    const digits = digitLabels(s)
    const rowDigits = (y: number) => digits.filter((o) => near(o.position![1], y, 0.01)).sort(byX)
    const read = (y: number) => rowDigits(y).map((o) => o.text).join('')
    const [a, b] = mul
    expect([Number(read(row.a)), Number(read(row.b)), Number(read(row.p1)), Number(read(row.p2)), Number(read(row.tot))]).toEqual([23, 14, 92, 230, 322])
    for (const y of [row.a, row.b, row.p1, row.p2, row.tot]) {
      const ds = rowDigits(y); expect(near(ds[ds.length - 1].position![0], col.O, 1e-6)).toBe(true)                                                       // ones digits share a column
      for (const d of ds) expect([col.H, col.T, col.O].some((x) => near(d.position![0], x, 1e-6))).toBe(true)                                              // every digit sits in a place column
    }
    expect(Number(read(row.p1))).toBe(a * (b % 10)); expect(Number(read(row.p2))).toBe(a * 10 * Math.floor(b / 10))
    expect(Number(read(row.p1)) + Number(read(row.p2))).toBe(Number(read(row.tot))); expect(Number(read(row.tot))).toBe(a * b)
    const carry = digits.find((o) => near(o.position![1], row.carry, 0.01))!
    expect(near(carry.position![0], col.T, 1e-6)).toBe(true); expect(Number(carry.text)).toBe(Math.floor(((a % 10) * (b % 10)) / 10))                      // 3 × 4 = 12: write 2, carry 1 over the tens
    const col3 = (y: number) => [col.O, col.T, col.H].map((x) => { const d = rowDigits(y).find((o) => near(o.position![0], x, 1e-6)); return d ? Number(d.text) : 0 })
    const p1 = col3(row.p1), p2 = col3(row.p2), tot = col3(row.tot); let c = 0
    for (let k = 0; k < 3; k++) { const t = p1[k] + p2[k] + c; expect(t % 10).toBe(tot[k]); c = Math.floor(t / 10) }                                         // column addition with carries reproduces the drawn total
    expect(texts(s)).toEqual(expect.arrayContaining(['23 × 4', '23 × 10', '92 + 230 = 322']))
  })

  it('Fraction multiplication: 3/4 of the width and 2/3 of the height overlap in 6 of 12 cells (= 1/2); the bar shows 3/4 ÷ 3/8 = 2 pieces', () => {
    const s = M.buildFractionMultiplicationScene(), { cw, ch, cols, rows, x0, y0, bar } = M.FM
    const vlines = bonds(s, SLATE, 0.015).filter((o) => near(o.from![0], o.to![0], 1e-9)), hlines = bonds(s, SLATE, 0.015).filter((o) => near(o.from![1], o.to![1], 1e-9))
    expect(vlines).toHaveLength(cols + 1); expect(hlines).toHaveLength(rows + 1)
    const blue = bbox(bonds(s, BLUE, 0.045)), red = bbox(bonds(s, RED, 0.045))
    expect(Math.round((blue.x1 - blue.x0) / cw)).toBe(3); expect(Math.round(((red.x1 - red.x0) - 0.24) / cw)).toBe(4); expect(Math.round((red.y1 - red.y0) / ch)).toBe(2)   // 3 of 4 columns, 2 rows
    const green = dots(s, GREEN).filter((d) => d.radius === 0.16)
    expect(green).toHaveLength(6)
    for (const d of green) { expect(inBox(d.position!, blue)).toBe(true); expect(inBox(d.position!, red)).toBe(true) }                                      // each is in both strips
    expect(cols * rows).toBe(12); expect((2 * 3) / (3 * 4)).toBe(0.5); expect(green.length / (cols * rows)).toBe(0.5)                                         // numerators × numerators over denominators × denominators
    const L = Math.hypot(bonds(s, SLATE, 0.04)[0].to![0] - bonds(s, SLATE, 0.04)[0].from![0], 0)
    expect(L).toBeCloseTo(bar.L, 6)
    const frac = bonds(s, BLUE, 0.09)[0], pieces = bonds(s, GREEN, 0.09)
    expect(len(frac) / L).toBeCloseTo(0.75, 6); expect(pieces).toHaveLength(2)
    for (const p of pieces) expect(Math.abs(len(p) - (0.375 * L - 0.04))).toBeLessThan(0.011)                                                                   // two pieces of 3/8 (minus the drawn gap) ...
    expect(Math.abs(len(pieces[0]) + len(pieces[1]) + 0.08 - 0.75 * L)).toBeLessThan(0.02)                                                                   // ... fill the 3/4 bar
    expect(0.75 / 0.375).toBe(2); expect(Math.round(((3 * 8) / (4 * 3)) * 1e9) / 1e9).toBe(2)                                                              // ÷ 3/8 is × 8/3
    expect(texts(s)).toEqual(expect.arrayContaining(['2/3 × 3/4 = 1/2', '(3/4) ÷ (3/8) = 2', '6 of 12 cells']))
    expect(x0).toBeLessThan(0)
  })

  it('Mixed numbers: 3 whole bars + 1 half bar = 7 half bars, so 3½ = 7/2; (3 × 2 + 1)/2 = 7/2 and 7 ÷ 2 = 3 remainder 1', () => {
    const s = M.buildMixedNumbersScene(), { U, y1, y2 } = M.MIX
    const bars = lines(s).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, 0.17, 1e-9))
    const row1 = bars.filter((o) => near(o.from![1], y1, 1e-6)), row2 = bars.filter((o) => near(o.from![1], y2, 1e-6))
    expect(row1).toHaveLength(4); expect(row2).toHaveLength(7)
    const wholes = row1.filter((o) => o.color === BLUE), half = row1.filter((o) => o.color === RED)
    expect(wholes).toHaveLength(3); expect(half).toHaveLength(1)
    for (const w of wholes) expect(len(w)).toBeCloseTo(U, 2)
    expect(len(half[0])).toBeCloseTo(U / 2, 2)
    for (const h of row2) expect(len(h)).toBeCloseTo(U / 2, 2)
    expect(sum(row1.map(len))).toBeCloseTo(3.5 * U, 1); expect(sum(row2.map(len))).toBeCloseTo(3.5 * U, 1)                                               // the same total length
    expect(row2.filter((o) => o.color === BLUE)).toHaveLength(6); expect(row2.filter((o) => o.color === RED)).toHaveLength(1)
    expect(len(wholes[0]) / len(row2[0])).toBeCloseTo(2, 1)                                                                                                 // a whole is two halves
    expect(3 * 2 + 1).toBe(7); expect(Math.floor(7 / 2)).toBe(3); expect(7 % 2).toBe(1)
    expect(texts(s)).toEqual(expect.arrayContaining(['3½', '7/2', '3 wholes and a half', '7 halves', '3 × 2 + 1 = 7', '7 ÷ 2 = 3 r 1']))
  })

  it('Proportion: 3 : 4 and 6 : 8 have the same ratio (0.75) and the same diagonal slope; cross products 3 × 8 = 4 × 6 = 24', () => {
    const s = M.buildProportionScene(), { u } = M.PROP
    const blue = bbox(bonds(s, BLUE, 0.04)), red = bbox(bonds(s, RED, 0.04))
    const dims = (b: Box) => [Math.round((b.x1 - b.x0) / u), Math.round((b.y1 - b.y0) / u)]
    expect(dims(blue)).toEqual([3, 4]); expect(dims(red)).toEqual([6, 8])
    expect((blue.x1 - blue.x0) / (blue.y1 - blue.y0)).toBeCloseTo((red.x1 - red.x0) / (red.y1 - red.y0), 6)                                                 // equal ratios
    expect(3 / 4).toBe(6 / 8); expect(3 / 4).toBe(0.75)
    const diags = bonds(s, VIOLET, 0.025); expect(diags).toHaveLength(2)
    expect(slope(diags[0])).toBeCloseTo(slope(diags[1]), 6); expect(slope(diags[0])).toBeCloseTo(4 / 3, 6)                                                  // the same angle
    expect(3 * 8).toBe(4 * 6); expect(3 * 8).toBe(24)
    for (const [t, v] of [['3', 3], ['4', 4], ['6', 6], ['8', 8]] as const) expect(labelsOf(s).some((o) => o.text === t), `side ${v}`).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['3 : 4', '6 : 8', '3/4 = 6/8', 'both 0.75', '3 × 8 = 24', '4 × 6 = 24']))
  })

  it('Rounding: 3.44 is 0.04 from 3.40 (rounds to 3.4), 3.46 is 0.04 from 3.50 (rounds to 3.5), 3.45 is exactly halfway and rounds up to 3.5', () => {
    const s = M.buildRoundingScene(), { xa, xb, lo, hi } = M.RND
    const val = (x: number) => lo + ((x - xa) / (xb - xa)) * (hi - lo)
    const ticks = bonds(s, SLATE, 0.025); expect(ticks).toHaveLength(11)
    ticks.map((t) => val(t.from![0])).sort((a, b) => a - b).forEach((v, i) => expect(v).toBeCloseTo(3.4 + i / 100, 4))                                      // a tick per hundredth
    const pts = dots(s).filter((d) => d.radius === 0.14)
    const at = (c: string) => val(pts.find((d) => d.color === c)!.position![0])
    expect(at(RED)).toBeCloseTo(3.44, 4); expect(at(BLUE)).toBeCloseTo(3.46, 4); expect(at(GREEN)).toBeCloseTo(3.45, 4)
    const end = (c: string) => val(arrows(s, c)[0].to![0])
    expect(end(RED)).toBeCloseTo(3.4, 4); expect(end(BLUE)).toBeCloseTo(3.5, 4); expect(end(GREEN)).toBeCloseTo(3.5, 4)
    const h = (v: number) => Math.round(v * 100)
    expect([M.roundTenth(h(at(RED))), M.roundTenth(h(at(BLUE))), M.roundTenth(h(at(GREEN)))]).toEqual([340, 350, 350])                                          // by integer hundredths
    expect([h(at(RED)) - 340, 350 - h(at(RED))]).toEqual([4, 6]); expect([h(at(BLUE)) - 340, 350 - h(at(BLUE))]).toEqual([6, 4])                             // distances to the two tenths
    expect(h(at(GREEN)) - 340).toBe(350 - h(at(GREEN)))                                                                                                      // the tie
    for (const [c, from] of [[RED, at(RED)], [BLUE, at(BLUE)], [GREEN, at(GREEN)]] as const) expect(Math.abs(val(arrows(s, c)[0].from![0]) - from)).toBeLessThan(1e-3)   // each arrow starts at its number
    expect(texts(s)).toEqual(expect.arrayContaining(['3.40', '3.45', '3.50', '3.44 → 3.4', '3.46 → 3.5', 'halfway: rounds up', 'nearest tenth']))
  })

  it('Square numbers: the 5 × 5 array has layers of 1, 3, 5, 7, 9 dots (an L each), cumulative 1, 4, 9, 16, 25 = k²; the nested squares enclose k² dots', () => {
    const s = M.buildSquareNumbersScene(), { n, s: sp, x0, y0, colors } = M.SQN
    const pts = dots(s).filter((d) => d.radius === 0.13)
    expect(pts).toHaveLength(n * n)
    const idx = pts.map((d) => ({ i: (d.position![0] - x0) / sp, j: (d.position![1] - y0) / sp, color: d.color }))
    for (const p of idx) { expect(p.i).toBeCloseTo(Math.round(p.i), 1); expect(p.j).toBeCloseTo(Math.round(p.j), 1) }
    const layer = (p: { i: number; j: number }) => Math.max(Math.round(p.i), Math.round(p.j))
    const sizes = Array.from({ length: n }, (_, k) => idx.filter((p) => layer(p) === k).length)
    expect(sizes).toEqual([1, 3, 5, 7, 9]); expect(sizes.map((_, k) => sum(sizes.slice(0, k + 1)))).toEqual([1, 4, 9, 16, 25])
    for (let k = 0; k < n; k++) expect(new Set(idx.filter((p) => layer(p) === k).map((p) => p.color))).toEqual(new Set([colors[k]]))                      // one colour per layer
    const nested = bonds(s, SLATE, 0.02); expect(nested).toHaveLength(4 * n)
    for (let k = 0; k < n; k++) {
      const side = x0 + k * sp + 0.25, inside = idx.filter((p) => x0 + p.i * sp < side && y0 + p.j * sp < y0 + k * sp + 0.25).length
      expect(inside).toBe((k + 1) ** 2)                                                                                                                  // the k-th outline encloses k² dots
    }
    expect(sum(sizes)).toBe(25); expect(5 ** 2).toBe(25); expect(1 + 3 + 5 + 7 + 9).toBe(25)
    expect(texts(s)).toEqual(expect.arrayContaining(['1² = 1', '2² = 4', '3² = 9', '4² = 16', '5² = 25', '1 + 3 + 5 + 7 + 9 = 25']))
  })

  it('Cube numbers: the cubes of side 1, 2, 3 hold 1, 8, 27 dots = n layers of n × n; each layer is an n-by-n lattice shifted obliquely from the last', () => {
    const s = M.buildCubeNumbersScene(), { s: sp, a, b, centres, layerColors } = M.CUB
    const pts = dots(s).filter((d) => d.radius === 0.1)
    const owner = (d: Obj) => centres.map((c) => Math.hypot(d.position![0] - c[0], d.position![1] - c[1])).reduce((best, v, i, arr) => (v < arr[best] ? i : best), 0)
    const cubes = centres.map((_, k) => pts.filter((d) => owner(d) === k))
    expect(cubes.map((c) => c.length)).toEqual([1, 8, 27])
    cubes.forEach((cube, k) => {
      const n = k + 1
      const layers = layerColors.slice(0, n).map((col) => cube.filter((d) => d.color === col))
      layers.forEach((layer) => {
        expect(layer).toHaveLength(n * n)
        expect(new Set(layer.map((d) => Math.round(d.position![0] * 100))).size).toBe(n); expect(new Set(layer.map((d) => Math.round(d.position![1] * 100))).size).toBe(n)   // an n × n lattice
      })
      expect(sum(layers.map((l) => l.length))).toBe(n ** 3)
      for (let L = 1; L < n; L++) {
        const cm = (l: Obj[]) => [mean(l.map((d) => d.position![0])), mean(l.map((d) => d.position![1]))]
        expect(cm(layers[L])[0] - cm(layers[L - 1])[0]).toBeCloseTo(a * sp, 1); expect(cm(layers[L])[1] - cm(layers[L - 1])[1]).toBeCloseTo(b * sp, 1)         // the oblique step to the next layer
      }
    })
    const edges = bonds(s, SLATE, 0.02); expect(edges).toHaveLength(24)
    expect(edges.map((e) => Math.round(len(e) / sp * 10) / 10).filter((l) => l > 0.5).length).toBe(24)
    expect([1, 2, 3].map((n) => n ** 3)).toEqual([1, 8, 27]); expect(4 ** 3).toBe(64); expect(5 ** 3).toBe(125)
    expect(texts(s)).toEqual(expect.arrayContaining(['1³ = 1', '2³ = 8', '3³ = 27', '1, 8, 27, 64, 125, …']))
  })

  it('Square roots: squares of area 4, 9, 16, 10 have sides √area (2, 3, 4, 3.162); each side bar is as long as its square; √10 lies between 3 and 4 on the number line', () => {
    const s = M.buildSquareRootsScene(), { u, y0, areas, line: nl } = M.SQR
    const groups = (color: string) => {
      const ls = bonds(s, color, 0.04).sort((p, q) => Math.min(p.from![0], p.to![0]) - Math.min(q.from![0], q.to![0]))
      const out: Obj[][] = []
      for (const l of ls) { const g = out[out.length - 1]; if (g && Math.min(l.from![0], l.to![0]) <= bbox(g).x1 + 0.1) g.push(l); else out.push([l]) }
      return out.map(bbox)
    }
    const sq = [...groups(BLUE), ...groups(RED)]
    expect(sq).toHaveLength(4)
    const sides = sq.map((b) => (b.x1 - b.x0) / u), tall = sq.map((b) => (b.y1 - b.y0) / u)
    sides.forEach((sd, k) => { expect(sd).toBeCloseTo(Math.sqrt(areas[k]), 1); expect(tall[k]).toBeCloseTo(sd, 1); expect(sd * sd).toBeCloseTo(areas[k], 0) })     // area = side²
    sq.forEach((b, k) => { expect(near(b.y0, y0, 1e-6)).toBe(true); expect(labelAtXY(s, (b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2)!.text).toBe(String(areas[k])) })    // the area is written inside
    const bars = bonds(s, GREEN, 0.05); expect(bars).toHaveLength(4)
    bars.sort((p, q) => p.from![0] - q.from![0]).forEach((bar, k) => expect(len(bar)).toBeCloseTo(sq[k].x1 - sq[k].x0, 2))                                  // the side bar matches the square
    expect(Math.sqrt(4)).toBe(2); expect(Math.sqrt(9)).toBe(3); expect(Math.sqrt(16)).toBe(4); expect(Math.sqrt(10).toFixed(2)).toBe('3.16')
    const r = dots(s, GREEN).find((d) => d.radius === 0.12)!
    expect(3 + (r.position![0] - nl.x3) / nl.scale).toBeCloseTo(Math.sqrt(10), 2)                                                                            // √10 on the number line
    expect(Math.sqrt(10)).toBeGreaterThan(3); expect(Math.sqrt(10)).toBeLessThan(4); expect(9 < 10 && 10 < 16).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['√4 = 2', '√9 = 3', '√16 = 4', '√10 ≈ 3.16', '√10', '9 < 10 < 16']))
  })
})
