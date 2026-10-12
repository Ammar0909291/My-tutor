/**
 * Mathematics visual campaign, batch 27 (2026-10-12): arithmetic — addition and subtraction on the number line, counting and skip
 * counting, column addition with a carry, dividend / divisor / quotient, remainders, long division, powers, the exponent rules,
 * scientific notation, percentages, unit rates and estimation. Every number a figure states is re-derived here from the DRAWN
 * hops, dots, digits, boxes and bars, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB27'

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
  ['math.arith.addition', M.buildAdditionScene, 'math-addition'],
  ['math.arith.subtraction', M.buildSubtractionScene, 'math-subtraction'],
  ['math.arith.counting-sequence', M.buildCountingSequenceScene, 'math-counting-sequence'],
  ['math.arith.column-addition', M.buildColumnAdditionScene, 'math-column-addition'],
  ['math.arith.divisor-dividend', M.buildDivisorDividendScene, 'math-divisor-dividend'],
  ['math.arith.remainder', M.buildRemainderScene, 'math-remainder'],
  ['math.arith.long-division', M.buildLongDivisionScene, 'math-long-division'],
  ['math.arith.exponentiation', M.buildExponentiationScene, 'math-exponentiation'],
  ['math.arith.exponent-rules', M.buildExponentRulesScene, 'math-exponent-rules'],
  ['math.arith.scientific-notation', M.buildScientificNotationScene, 'math-scientific-notation'],
  ['math.arith.percentage-calculations', M.buildPercentageCalculationsScene, 'math-percentage-calculations'],
  ['math.arith.unit-rate', M.buildUnitRateScene, 'math-unit-rate'],
  ['math.arith.estimation', M.buildEstimationScene, 'math-estimation'],
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
const bbox = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) } }
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }
const supNum = (t: string) => Number([...t].map((c) => SUP[c] ?? '').join(''))
const numsIn = (t: string) => (t.match(/\d+(?:\.\d+)?/g) ?? []).map(Number)
const hasText = (s: SceneSpec, t: string) => texts(s).includes(t)
/** horizontal edges of the blue boxes drawn by rect(): returns the distinct [x0, x1] spans and the y-range of each box */
const boxesOf = (s: SceneSpec, color: string, thickness: number) => {
  const hs = bonds(s, color, thickness).filter((o) => near(o.from![1], o.to![1], 1e-6))
  const uniq = new Map<string, { x0: number; x1: number; ys: number[] }>()
  for (const o of hs) { const x0 = Math.min(o.from![0], o.to![0]), x1 = Math.max(o.from![0], o.to![0]), k = `${x0.toFixed(2)}|${x1.toFixed(2)}`; const e = uniq.get(k) ?? { x0, x1, ys: [] }; e.ys.push(o.from![1]); uniq.set(k, e) }
  return [...uniq.values()].map((e) => ({ x0: e.x0, x1: e.x1, y0: Math.min(...e.ys), y1: Math.max(...e.ys) })).sort((a, b) => a.x0 - b.x0)
}
const inBox = (b: { x0: number; x1: number; y0: number; y1: number }, p: number[]) => p[0] > b.x0 && p[0] < b.x1 && p[1] > b.y0 && p[1] < b.y1

describe('the mathematics each figure draws', () => {
  it('Addition: three green hops of length 1 carry the white dot at 4 to the green dot at 7 (4 + 3 = 7), four violet hops carry the dot at 3 to the same 7 (3 + 4 = 7), and every tick is labelled with its own value', () => {
    const s = M.buildAdditionScene(), { x0, dx, y } = M.ADD
    const val = (x: number) => (x - x0) / dx
    const green = pathsOf(s, GREEN).map(bbox).sort((p, q) => p.cx - q.cx), violet = pathsOf(s, VIOLET).map(bbox).sort((p, q) => p.cx - q.cx)
    expect(green).toHaveLength(3); expect(violet).toHaveLength(4)
    green.forEach((h) => { expect(val(h.cx + h.w / 2) - val(h.cx - h.w / 2)).toBeCloseTo(1, 1); expect(h.cy).toBeGreaterThan(y) })                           // each hop is one unit, above the line
    violet.forEach((h) => { expect(val(h.cx + h.w / 2) - val(h.cx - h.w / 2)).toBeCloseTo(1, 1); expect(h.cy).toBeLessThan(y) })                         // below the line
    const chain = (hs: ReturnType<typeof bbox>[]) => hs.map((h, i) => [Math.round(val(h.cx - h.w / 2)), Math.round(val(h.cx + h.w / 2))] as const).every(([a, b], i, all) => b === a + 1 && (i === 0 || a === all[i - 1][1]))
    expect(chain(green)).toBe(true); expect(chain(violet)).toBe(true)                                                                                    // consecutive hops, no gaps
    const startG = Math.round(val(green[0].cx - green[0].w / 2)), endG = Math.round(val(green[2].cx + green[2].w / 2))
    const startV = Math.round(val(violet[0].cx - violet[0].w / 2)), endV = Math.round(val(violet[3].cx + violet[3].w / 2))
    expect([startG, endG - startG, endG]).toEqual([4, 3, 7]); expect([startV, endV - startV, endV]).toEqual([3, 4, 7])                                    // 4 + 3 = 3 + 4 = 7
    const ink = dots(s, INK).map((d) => Math.round(val(d.position![0]))).sort(); expect(ink).toEqual([3, 4])
    const land = dots(s, GREEN); expect(land).toHaveLength(1); expect(val(land[0].position![0])).toBeCloseTo(7, 1); expect(land[0].position![1]).toBeCloseTo(y, 1)
    for (let v = 0; v <= 10; v++) expect(labelAt(s, [M.addX(v), y - 0.95])?.text, `tick ${v}`).toBe(String(v))
    expect(texts(s)).toEqual(expect.arrayContaining(['4 + 3 = 7', '3 + 4 = 7', 'same sum']))
  })

  it('Subtraction: four red hops carry the dot at 9 left to the dot at 5 (9 − 4 = 5); in the bar, the red part is 4 long, the blue part 5 long, together the whole 9, so 4 + 5 = 9', () => {
    const s = M.buildSubtractionScene(), { x0, dx, y } = M.SUB
    const val = (x: number) => (x - x0) / dx
    const hops = pathsOf(s, RED).map(bbox).sort((p, q) => q.cx - p.cx)
    expect(hops).toHaveLength(4); hops.forEach((h) => { expect(val(h.cx + h.w / 2) - val(h.cx - h.w / 2)).toBeCloseTo(1, 1); expect(h.cy).toBeLessThan(y) })
    hops.forEach((h, i) => { expect(val(h.cx + h.w / 2)).toBeCloseTo(9 - i, 1); expect(val(h.cx - h.w / 2)).toBeCloseTo(8 - i, 1) })                          // 9→8→7→6→5, leftwards
    expect(val(dots(s, INK)[0].position![0])).toBeCloseTo(9, 1); const end = dots(s, BLUE); expect(end).toHaveLength(1); expect(val(end[0].position![0])).toBeCloseTo(5, 1)
    const red = bonds(s, RED, 0.18)[0], blue = bonds(s, BLUE, 0.18)[0], frame = bonds(s, SLATE, 0.04).filter((o) => near(o.from![1], o.to![1], 1e-6))
    const lr = len(red) / dx, lbl = len(blue) / dx, whole = Math.max(...frame.map(len)) / dx
    expect(lr).toBeCloseTo(4, 1); expect(lbl).toBeCloseTo(5, 1); expect(whole).toBeCloseTo(9, 1); expect(lr + lbl).toBeCloseTo(whole, 1)                       // part + part = whole
    expect(red.to![0]).toBeCloseTo(blue.from![0], 1)                                                                                                   // the parts meet at the divider
    expect(9 - 4).toBe(5); expect(4 + 5).toBe(9)
    expect(labelAt(s, [M.subX(4.5), M.SUB.bar.y1 + 0.5])?.text).toBe('9'); expect(labelAt(s, [M.subX(2), M.SUB.bar.y0 - 0.45])?.text).toBe('4'); expect(labelAt(s, [M.subX(6.5), M.SUB.bar.y0 - 0.45])?.text).toBe('5')
    expect(texts(s)).toEqual(expect.arrayContaining(['9 − 4 = 5', '4 + 5 = 9']))
  })

  it('Counting sequence: all ten numbers are lit when counting by ones, exactly 2, 4, 6, 8, 10 when counting by twos and exactly 5, 10 when counting by fives — the multiples of the step', () => {
    const s = M.buildCountingSequenceScene(), { x0, dx, rows, steps } = M.CNS
    const k = (x: number) => Math.round((x - x0) / dx) + 1
    const lit = (color: string, row: number) => dots(s, color).filter((d) => near(d.radius ?? 0, 0.16, 1e-9) && near(d.position![1], rows[row], 0.02)).map((d) => k(d.position![0])).sort((a, b) => a - b)
    const small = (row: number) => dots(s, SLATE).filter((d) => near(d.radius ?? 0, 0.08, 1e-9) && near(d.position![1], rows[row], 0.02)).map((d) => k(d.position![0])).sort((a, b) => a - b)
    expect(lit(BLUE, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); expect(small(0)).toEqual([])
    expect(lit(GREEN, 1)).toEqual([2, 4, 6, 8, 10]); expect(lit(RED, 2)).toEqual([5, 10])
    ;([[0, BLUE], [1, GREEN], [2, RED]] as const).forEach(([row, color]) => {
      const l = lit(color, row), sm = small(row)
      expect(l.every((n) => n % steps[row] === 0)).toBe(true); expect(sm.every((n) => n % steps[row] !== 0)).toBe(true)                                   // lit = multiples of the step
      expect([...l, ...sm].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      l.slice(1).forEach((n, i) => expect(n - l[i]).toBe(steps[row]))                                                                                  // each lit number is `step` more than the last
    })
    for (let row = 0; row < 3; row++) for (let n = 1; n <= 10; n++) expect(labelAt(s, [M.cnsAt(row, n)[0], M.cnsAt(row, n)[1] - 0.45])?.text, `${row}:${n}`).toBe(String(n))
    expect(small(1)).toHaveLength(5); expect(small(2)).toHaveLength(8)
    expect(texts(s)).toEqual(expect.arrayContaining(['by ones', 'by twos', 'by fives']))
  })

  it('Column addition: the digits line up by place, the ones 7 + 8 = 15 write 5 and carry 1, the tens 4 + 3 + 1 = 8 write 8, and the written answer 85 equals 47 + 38', () => {
    const s = M.buildColumnAdditionScene(), { tens, ones, y } = M.CLA
    const at = (x: number, yy: number) => labelAt(s, [x, yy])?.text
    const top = [at(tens, y.top), at(ones, y.top)], bot = [at(tens, y.bottom), at(ones, y.bottom)]
    expect(top).toEqual(['4', '7']); expect(bot).toEqual(['3', '8']); expect(at(tens - 0.9, y.bottom)).toBe('+')
    const A = Number(top.join('')), B = Number(bot.join('')); expect([A, B]).toEqual([47, 38])
    const onesSum = Number(top[1]) + Number(bot[1]); const wOnes = at(ones, y.result), carry = at(tens, y.carry)
    expect(onesSum).toBe(15); expect(wOnes).toBe(String(onesSum % 10)); expect(carry).toBe(String(Math.floor(onesSum / 10)))                              // write 5, carry 1
    const tensSum = Number(top[0]) + Number(bot[0]) + Number(carry); const wTens = at(tens, y.result)
    expect(tensSum).toBe(8); expect(wTens).toBe(String(tensSum))
    expect(Number(wTens + wOnes)).toBe(A + B); expect(A + B).toBe(85)
    const rule = bonds(s, SLATE, 0.04)[0]; expect(rule.from![1]).toBeCloseTo(y.line, 1)
    expect(y.top).toBeGreaterThan(y.bottom); expect(y.bottom).toBeGreaterThan(y.line); expect(y.result).toBeLessThan(y.line); expect(y.carry).toBeGreaterThan(y.top)  // carry above, answer below the line
    expect(labelsOf(s).find((o) => o.text === '1' && o.color === RED)!.position![0]).toBeCloseTo(tens, 1)                                              // the carry sits over the tens column
    expect(hasText(s, '47 + 38 = 85')).toBe(true)
  })

  it('Dividend, divisor, quotient: 20 dots form 5 boxes of exactly 4, so 20 ÷ 4 = 5 and 4 × 5 = 20, and the labels name those same three numbers', () => {
    const s = M.buildDivisorDividendScene()
    const d = dots(s, INK).map((o) => o.position!), boxes = boxesOf(s, BLUE, 0.04)
    expect(d).toHaveLength(20); expect(boxes).toHaveLength(5)
    const per = boxes.map((b) => d.filter((p) => inBox(b, p)).length); expect(per).toEqual([4, 4, 4, 4, 4]); expect(sum(per)).toBe(20)                      // every dot is in exactly one box
    const label = (t: string) => numsIn(labelsOf(s).find((o) => o.text!.startsWith(t))!.text!)[0]
    const dividend = label('dividend'), divisor = label('divisor'), quotient = label('quotient')
    expect([dividend, divisor, quotient]).toEqual([d.length, per[0], boxes.length])                                                                    // the labels are the drawn counts
    expect(dividend / divisor).toBe(quotient); expect(divisor * quotient).toBe(dividend)
    expect(hasText(s, '20 ÷ 4 = 5')).toBe(true)
    const brace = bonds(s, GREEN, 0.04)[0]; expect(brace.from![0]).toBeLessThanOrEqual(boxes[0].x0); expect(brace.to![0]).toBeGreaterThanOrEqual(boxes[4].x1)  // the quotient bracket spans every box
  })

  it('Remainder: 17 dots make three full boxes of 5 and leave 2 outside every box (the red remainder), so 17 = 3 × 5 + 2 with 2 < 5', () => {
    const s = M.buildRemainderScene()
    const all = dots(s, INK).map((o) => o.position!), boxes = boxesOf(s, BLUE, 0.04), red = dots(s, RED).map((o) => o.position!)
    expect(all).toHaveLength(17); expect(boxes).toHaveLength(3)
    const per = boxes.map((b) => all.filter((p) => inBox(b, p)).length); expect(per).toEqual([5, 5, 5])
    const outside = all.filter((p) => !boxes.some((b) => inBox(b, p))); expect(outside).toHaveLength(2)
    expect(red).toHaveLength(2); red.forEach((p) => { expect(outside.some((q) => dist(p, q) < 0.02)).toBe(true) })                                      // the red dots are exactly the spare ones
    const q = boxes.length, size = per[0], r = outside.length
    expect(q * size + r).toBe(all.length); expect(r).toBeLessThan(size); expect(all.length % size).toBe(r); expect(Math.floor(all.length / size)).toBe(q)
    expect(texts(s)).toEqual(expect.arrayContaining(['remainder 2', '17 = 3 × 5 + 2', '2 is less than 5']))
  })

  it('Long division: the drawn digits give 156 ÷ 12 with quotient digits 1 and 3 (13), subtraction rows 12 and 36 leaving 3 and 0, the brought-down 6 making 36, and 12 × 13 = 156', () => {
    const s = M.buildLongDivisionScene(), { cols, y } = M.LDV
    const at = (x: number, yy: number) => labelAt(s, [x, yy])?.text
    const divisor = Number(at(cols[0] - 1.1, y.top)), dividend = Number([0, 1, 2].map((i) => at(cols[i], y.top)).join('')); expect([divisor, dividend]).toEqual([12, 156])
    const q1 = Number(at(cols[1], y.q)), q2 = Number(at(cols[2], y.q)); expect([q1, q2]).toEqual([1, 3])
    expect(q1).toBe(Math.floor(15 / divisor))                                                                                                          // 12 goes into 15 once
    const row1 = Number(at(cols[0], y.r1)! + at(cols[1], y.r1)!); expect(row1).toBe(q1 * divisor)                                                      // 1 × 12 = 12
    const rem1 = Number(at(cols[1], y.d1)); expect(rem1).toBe(15 - row1)                                                                               // 15 − 12 = 3
    const brought = Number(at(cols[2], y.d1)); expect(brought).toBe(Number(at(cols[2], y.top)))                                                         // the 6 comes down from the dividend
    const next = rem1 * 10 + brought; expect(next).toBe(36); expect(q2).toBe(Math.floor(next / divisor))                                                // 12 goes into 36 three times
    const row2 = Number(at(cols[1], y.r2)! + at(cols[2], y.r2)!); expect(row2).toBe(q2 * divisor); expect(Number(at(cols[2], y.d2))).toBe(next - row2) // 36 − 36 = 0
    expect(Number(`${q1}${q2}`)).toBe(13); expect(divisor * 13).toBe(dividend); expect(dividend % divisor).toBe(0)
    expect(labelsOf(s).find((o) => o.text === '1' && o.color === GREEN)!.position![0]).toBeCloseTo(cols[1], 1)                                         // quotient digit sits above the digit it was found for
    expect(hasText(s, '12 × 13 = 156')).toBe(true)
  })

  it('Exponentiation: the bars are 2, 4, 8, 16, 32 tall (each double the one before, 2ᵏ for k = 1…5), every bar carries its own value and exponent, and the arrows climb by 2ᵏ', () => {
    const s = M.buildExponentiationScene(), { scale, base, oy } = M.EXP
    const bars = [...bonds(s, BLUE, 0.3), ...bonds(s, GREEN, 0.3)].sort((p, q) => p.from![0] - q.from![0]); expect(bars).toHaveLength(5)
    const heights = bars.map((b) => (b.to![1] - b.from![1]) / scale); heights.forEach((h, i) => expect(h).toBeCloseTo(Math.pow(base, i + 1), 0))
    heights.slice(1).forEach((h, i) => expect(h / heights[i]).toBeCloseTo(base, 1))                                                                      // each is double the previous
    expect(Math.round(heights[4])).toBe(2 * 2 * 2 * 2 * 2)
    bars.forEach((b, i) => {
      expect(labelAt(s, [b.to![0], b.to![1] + 0.45])?.text).toBe(String(Math.pow(2, i + 1)))
      const ex = labelAt(s, [b.from![0], oy - 0.45])!.text!; expect(ex[0]).toBe('2'); expect(supNum(ex.slice(1))).toBe(i + 1)                           // 2ᵏ written under the bar
    })
    const arr = arrows(s, RED); expect(arr).toHaveLength(4)
    arr.forEach((a, i) => { expect((a.to![1] - a.from![1]) / scale).toBeCloseTo(Math.pow(2, i + 1), 0); expect(a.from![0]).toBeLessThan(a.to![0]) })       // from the top of bar k to the top of bar k+1
    expect(bars.every((b) => b.from![1] === bars[0].from![1])).toBe(true)                                                                              // all stand on the same baseline
    expect(texts(s)).toEqual(expect.arrayContaining(['× 2', '2⁵ = 32']))
  })

  it('Exponent rules: counting the drawn factors gives a³·a² = a⁵ (3 + 2), (a²)³ = a⁶ (3 boxes of 2) and a⁵ ÷ a² = a³ (5 factors, 2 crossed out)', () => {
    const s = M.buildExponentRulesScene(), { rows } = M.EXR
    const row = (color: string, r: number) => dots(s, color).filter((d) => near(d.position![1], rows[r], 0.02)).map((d) => d.position!)
    const b0 = row(BLUE, 0), r0 = row(RED, 0); expect([b0.length, r0.length]).toEqual([3, 2])
    const label = (r: number) => labelsOf(s).find((o) => near(o.position![1], rows[r], 0.02) && o.position![0] > 1.2)!.text!
    expect(supNum(label(0).split('=')[1])).toBe(b0.length + r0.length); expect(label(0).startsWith('a³·a²')).toBe(true)                                   // product: exponents add
    const boxes = boxesOf(s, VIOLET, 0.03), ink = row(INK, 1); expect(boxes).toHaveLength(3); expect(ink).toHaveLength(6)
    const per = boxes.map((b) => ink.filter((p) => inBox(b, p)).length); expect(per).toEqual([2, 2, 2]); expect(sum(per)).toBe(6)
    expect(supNum(label(1).split('=')[1])).toBe(boxes.length * per[0]); expect(label(1).startsWith('(a²)³')).toBe(true)                                   // power of a power: exponents multiply
    const g2 = row(GREEN, 2), x2 = row(RED, 2), cross = lines(s, RED).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, 0.05, 1e-9))
    expect([g2.length, x2.length, cross.length]).toEqual([3, 2, 2])
    x2.forEach((p) => expect(cross.some((c) => dist([(c.from![0] + c.to![0]) / 2, (c.from![1] + c.to![1]) / 2], p) < 0.02)).toBe(true))                    // each red dot is crossed out
    expect(supNum(label(2).split('=')[1])).toBe(g2.length + x2.length - cross.length); expect(g2.length).toBe(5 - 2); expect(label(2).startsWith('a⁵ ÷ a²')).toBe(true) // quotient: exponents subtract
    expect(3 + 2).toBe(5); expect(2 * 3).toBe(6); expect(5 - 2).toBe(3)
  })

  it('Scientific notation: the seven digits read 4 500 000, the point moves 6 places left (six hops spanning 6 digit widths) from the end to just after the 4, and 4.5 × 10⁶ equals the number', () => {
    const s = M.buildScientificNotationScene(), { x0, dx, y } = M.SCN
    const digitLabels = [0, 1, 2, 3, 4, 5, 6].map((i) => labelAt(s, [M.scnX(i), y + 0.3])!.text!); const value = Number(digitLabels.join('')); expect(value).toBe(4500000)
    const red = dots(s, RED)[0].position!, green = dots(s, GREEN)[0].position!
    expect(red[0]).toBeCloseTo(M.scnX(6) + dx / 2, 1)                                                                                                  // the point starts just after the last digit
    expect(green[0]).toBeCloseTo(M.scnX(0) + dx / 2, 1)                                                                                                // and ends just after the first digit
    const hops = pathsOf(s, BLUE).map(bbox).sort((p, q) => q.cx - p.cx); expect(hops).toHaveLength(6)
    hops.forEach((h, i) => { expect(h.w / dx).toBeCloseTo(1, 1); expect((red[0] - (i + 0.5) * dx)).toBeCloseTo(h.cx, 1) })                              // chained leftwards, one digit each
    const places = (red[0] - green[0]) / dx; expect(places).toBeCloseTo(6, 1); expect(hops.length).toBe(Math.round(places))
    const mant = Number(digitLabels[0]) + Number(digitLabels[1]) / 10; expect(mant).toBe(4.5); expect(mant >= 1 && mant < 10).toBe(true)
    const note = labelAt(s, [0.3, 1.9])!.text!; expect(note).toBe('4.5 × 10⁶'); expect(supNum(note.split('10')[1])).toBe(hops.length)
    expect(mant * Math.pow(10, hops.length)).toBeCloseTo(value, 6)
    expect(numsIn(labelAt(s, [0.3, -1.9])!.text!)[0]).toBe(hops.length); expect(x0).toBeLessThan(0)
  })

  it('Percentages: the bar is cut into 4 equal quarters each labelled 25% and 20 (4 × 25 = 100, 4 × 20 = 80), the shaded green part is exactly one quarter, so 25% of 80 = 20 and 80 + 20 = 100', () => {
    const s = M.buildPercentageCalculationsScene(), { x0, w, y0, y1, whole } = M.PCT
    const frame = bonds(s, SLATE, 0.05).filter((o) => near(o.from![1], o.to![1], 1e-6)); expect(frame).toHaveLength(2); frame.forEach((o) => expect(len(o)).toBeCloseTo(w, 1))
    const cuts = bonds(s, SLATE, 0.04).filter((o) => near(o.from![0], o.to![0], 1e-6)).map((o) => o.from![0]).sort((a, b) => a - b); expect(cuts).toHaveLength(3)
    const edges = [x0, ...cuts, x0 + w]; const widths = edges.slice(1).map((e, i) => e - edges[i]); widths.forEach((q) => expect(q).toBeCloseTo(w / 4, 1)) // four equal quarters
    const pct = labelsOf(s).filter((o) => o.text === '25%'), val = labelsOf(s).filter((o) => o.text === '20')
    expect(pct).toHaveLength(4); expect(val).toHaveLength(4); expect(sum(pct.map((o) => numsIn(o.text!)[0]))).toBe(100); expect(sum(val.map((o) => numsIn(o.text!)[0]))).toBe(whole)
    pct.forEach((o) => expect(edges.some((e, i) => i < 4 && near(o.position![0], (e + edges[i + 1]) / 2, 0.06))).toBe(true))                           // each label sits over a quarter
    const shade = bonds(s, GREEN, 0.5)[0]; const frac = (len(shade) + 0.06) / w; expect(frac).toBeCloseTo(0.25, 2); expect(shade.from![1]).toBeGreaterThan(y0 - 0.01); expect(shade.from![1]).toBeLessThan(y1 + 0.01)
    const result = frac * whole; expect(result).toBeCloseTo(20, 1); expect(result).toBeCloseTo(whole / 4, 6)
    expect(hasText(s, '25% of 80 = 20')).toBe(true); expect(hasText(s, '80 + 20 = 100')).toBe(true); expect(whole + result).toBeCloseTo(100, 6)
    expect(hasText(s, '100%')).toBe(true); expect(hasText(s, '80')).toBe(true)
  })

  it('Unit rate: the four dots (1, 2), (2, 4), (3, 6), (6, 12) all have cost ÷ apples = 2, lie on one line through the origin of slope 2, and the green dot at 1 apple shows $2 per apple (12 ÷ 6 = 2)', () => {
    const s = M.buildUnitRateScene(), { ox, oy, ux, uy, pts, rate } = M.UTR
    const data = (p: number[]) => ({ n: (p[0] - ox) / ux, c: (p[1] - oy) / uy })
    const d = dots(s, BLUE).map((o) => data(o.position!)).sort((a, b) => a.n - b.n); expect(d).toHaveLength(4)
    expect(d.map((p) => Math.round(p.n))).toEqual([...pts]); d.forEach((p) => { expect(p.c / p.n).toBeCloseTo(2, 1) })                                  // every point has the same unit rate
    const line = bonds(s, BLUE, 0.04)[0]; const a = data(line.from!), b = data(line.to!)
    expect(a.n).toBeCloseTo(0, 1); expect(a.c).toBeCloseTo(0, 1); expect((b.c - a.c) / (b.n - a.n)).toBeCloseTo(rate, 1)                                // through the origin, slope = unit rate
    dots(s, BLUE).forEach((o) => expect(distToLine(line, o.position!)).toBeLessThan(0.03))                                                              // all four points are on the line
    const g = dots(s, GREEN); expect(g).toHaveLength(1); const gp = data(g[0].position!); expect(gp.n).toBeCloseTo(1, 1); expect(gp.c).toBeCloseTo(2, 1)
    expect(gp.c / gp.n).toBeCloseTo(12 / 6, 1)                                                                                                         // the cost of ONE apple is the unit rate
    const guides = bonds(s, VIOLET, 0.025); expect(guides).toHaveLength(2)
    guides.forEach((o) => expect(dist(o.to!, g[0].position!)).toBeLessThan(0.02)); expect(Math.abs(guides.map(len).reduce((x, y) => x + y) - (ux + 2 * uy))).toBeLessThan(0.03)
    expect(texts(s)).toEqual(expect.arrayContaining(['$2 per apple', '12 ÷ 6 = 2']))
  })

  it('Estimation: 47 rounds to 50 and 38 to 40 (each to its NEAREST ten, by the drawn hops), the estimate 40 + 50 = 90 sits at 90 on the lower line, the exact 85 = 47 + 38 sits 5 below it, and the two rounding errors 3 + 2 add to that 5', () => {
    const s = M.buildEstimationScene(), { x0, u, lo, rows, a, b } = M.EST
    const top = (x: number) => (x - x0) / u + lo, low = (x: number) => (x - x0 - 1.3) / 0.4 + 80
    const ink = dots(s, INK).map((o) => Math.round(top(o.position![0]))).sort(); expect(ink).toEqual([b, a])
    const hops = pathsOf(s, BLUE).map(bbox).map((h) => ({ from: top(h.cx - h.w / 2), to: top(h.cx + h.w / 2) })).sort((p, q) => p.from - q.from); expect(hops).toHaveLength(2)
    const nearestTen = (v: number) => Math.round(v / 10) * 10
    hops.forEach((h) => { const start = Math.round(h.from); expect(Math.round(h.to)).toBe(nearestTen(start)); expect(Math.abs(h.to - start)).toBeLessThanOrEqual(5) })  // each hop ends at the nearest ten
    const ends = hops.map((h) => Math.round(h.to)); expect(ends).toEqual([40, 50])
    const est = dots(s, RED); expect(est).toHaveLength(1); expect(low(est[0].position![0])).toBeCloseTo(sum(ends), 1); expect(sum(ends)).toBe(90)         // 40 + 50 = 90
    const exact = dots(s, BLUE).filter((o) => near(o.radius ?? 0, 0.18, 1e-9)); expect(exact).toHaveLength(1); expect(low(exact[0].position![0])).toBeCloseTo(a + b, 1); expect(a + b).toBe(85)
    const off = low(est[0].position![0]) - low(exact[0].position![0]); expect(off).toBeCloseTo(5, 1)                                                      // the estimate is 5 above the exact sum
    expect(ends[1] - a + (ends[0] - b)).toBe(5)                                                                                                       // rounding errors 3 + 2 = 5
    ;[30, 40, 50, 60].forEach((v) => expect(labelAt(s, [x0 + u * (v - lo), rows.round - 0.55])?.text).toBe(String(v)))
    ;[80, 85, 90, 95, 100].forEach((v) => expect(labelAt(s, [M.estSumX(v), rows.sum - 0.55])?.text).toBe(String(v)))
    expect(texts(s)).toEqual(expect.arrayContaining(['47 → 50', '38 → 40', '40 + 50 = 90', 'exact 85', '5 off']))
  })
})
