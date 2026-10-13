/**
 * Mathematics visual campaign, batch 38 (2026-10-12): the sequences-and-series helpers (sequences, arithmetic sequences, series, partial sums, arithmetic series, convergence of series, the harmonic series) and four
 * real-analysis helpers (metric spaces, compactness, connectedness, Riemann integrability). Every number a figure states is re-derived here from the DRAWN dots, bars, lines and numerals, never from the generator's own constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB38'
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
  ['math.seq.sequence', M.buildSequenceScene, 'math-sequence'],
  ['math.seq.arithmetic-sequence', M.buildArithmeticSequenceScene, 'math-arithmetic-sequence'],
  ['math.seq.series', M.buildSeriesScene, 'math-series'],
  ['math.seq.partial-sums', M.buildPartialSumsScene, 'math-partial-sums'],
  ['math.seq.arithmetic-series', M.buildArithmeticSeriesScene, 'math-arithmetic-series'],
  ['math.seq.series-convergence', M.buildSeriesConvergenceScene, 'math-series-convergence'],
  ['math.seq.harmonic-series', M.buildHarmonicSeriesScene, 'math-harmonic-series'],
  ['math.real.metric-space', M.buildMetricSpaceScene, 'math-metric-space'],
  ['math.real.compactness', M.buildCompactnessScene, 'math-compactness'],
  ['math.real.connectedness', M.buildConnectednessScene, 'math-connectedness'],
  ['math.real.riemann-integrability', M.buildRiemannIntegrabilityScene, 'math-riemann-integrability'],
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
  /** the text of a label after the first occurrence of a separator */
  const after = (t: string, sep: string) => t.slice(t.indexOf(sep) + sep.length)
  const sortX = (xs: Obj[]) => [...xs].sort((a, b) => a.from![0] - b.from![0])
  const horizontalAxis = (s: SceneSpec) => arrows(s, SLATE).filter((a) => near(a.from![1], a.to![1], 1e-9))
  const textStarting = (s: SceneSpec, p: string) => texts(s).find((t) => t.startsWith(p))!

  it('math.seq.sequence: the 5 drawn dots are the isolated points (n, n²) — each n has one value, the labels read 1, 4, 9, 16, 25 and the dot over n = 3 is a₃ = 9', () => {
    const s = M.buildSequenceScene()
    const base = horizontalAxis(s)[0].from![1]
    const dotsB = dots(s, BLUE).sort((a, b) => a.position![0] - b.position![0])
    expect(dotsB).toHaveLength(5)
    const unit = (d: Obj, n: number) => (d.position![1] - base) / (n * n)
    dotsB.forEach((d, i) => {
      const n = Number(labelsOf(s).find((l) => /^[1-5]$/.test(l.text!) && near(l.position![0], d.position![0], 0.01) && l.position![1] < base)!.text)
      expect(n).toBe(i + 1)
      expect(Number(labelAt(s, [d.position![0], d.position![1] + 0.42], 0.05)!.text), `a${n}`).toBe(n * n)
      expect(unit(d, n), `height of the dot over ${n}`).toBeCloseTo(unit(dotsB[0], 1), 1)
    })
    expect(dotsB.map((d) => d.position![0]).slice(1).map((x, i) => x - dotsB[i].position![0]).every((g, _, a) => near(g, a[0], 0.02))).toBe(true)
    // isolated: nothing joins the dots (the only line is the violet guide of step 3)
    expect(lines(s).filter((o) => o.type === 'bond')).toHaveLength(1)
    // the third dot
    const [hi] = dots(s, VIOLET)
    expect(near(hi.position![0], dotsB[2].position![0], 0.01)).toBe(true); expect(near(hi.position![1], dotsB[2].position![1], 0.01)).toBe(true)
    expect(numsIn(textStarting(s, 'a₃'))).toEqual([9]); expect(numsIn(textStarting(s, '1, 4'))).toEqual([1, 4, 9, 16, 25])
    expect(texts(s)).toContain('aₙ = n²')
  })

  it('math.seq.arithmetic-sequence: the 5 drawn dots 3, 5, 7, 9, 11 lie on one line with the constant step d = 2 (drawn as 4 equal runs and rises), a₅ = 3 + 8 = 11', () => {
    const s = M.buildArithmeticSequenceScene()
    const base = horizontalAxis(s)[0].from![1]
    const dotsB = dots(s, BLUE).sort((a, b) => a.position![0] - b.position![0])
    expect(dotsB).toHaveLength(5)
    const vals = dotsB.map((d) => Number(labelAt(s, [d.position![0] - 0.05, d.position![1] + 0.45], 0.06)!.text))
    expect(vals).toEqual([3, 5, 7, 9, 11])
    vals.forEach((v, i) => expect(v).toBe(3 + 2 * i))                 // aₙ = 3 + 2(n − 1)
    const uy = (dotsB[0].position![1] - base) / vals[0]
    dotsB.forEach((d, i) => expect((d.position![1] - base) / vals[i], `scale at n = ${i + 1}`).toBeCloseTo(uy, 1))
    // collinear: the grey line passes through every dot
    const lineG = bonds(s, SLATE, 0.03)[0]
    dotsB.forEach((d) => expect(distToLine(lineG, d.position!)).toBeLessThan(0.03))
    // the steps: 4 runs (violet, horizontal) and 4 rises (red, vertical), all equal
    const runs = bonds(s, VIOLET, 0.035), rises = bonds(s, RED, 0.035)
    expect(runs).toHaveLength(4); expect(rises).toHaveLength(4)
    runs.forEach((o) => { expect(near(o.from![1], o.to![1], 1e-9)).toBe(true); expect(len(o)).toBeCloseTo(dotsB[1].position![0] - dotsB[0].position![0], 1) })
    rises.forEach((o) => { expect(near(o.from![0], o.to![0], 1e-9)).toBe(true); expect(len(o) / uy, 'rise = d').toBeCloseTo(2, 1) })
    expect(texts(s).filter((t) => t === '+2')).toHaveLength(4)
    expect(numsIn(textStarting(s, 'd ='))).toEqual([2])
    expect(evalLR(after(textStarting(s, 'a₅'), '= '))).toBe(vals[4])
    expect(numsIn(textStarting(s, 'aₙ'))).toEqual([3, 2, 1])
  })

  it('math.seq.series: the drawn segments 1, 2, 3, 4, 5 end at the running totals 1, 3, 6, 10, 15 and the whole line is the series 1 + 2 + 3 + 4 + 5 = 15', () => {
    const s = M.buildSeriesScene()
    const segs = [...bonds(s, BLUE, 0.14), ...bonds(s, RED, 0.14)].sort((a, b) => a.from![0] - b.from![0])
    expect(segs).toHaveLength(5)
    const unit = len(segs[0])
    const terms = segs.map((o) => len(o) / unit)
    terms.forEach((t, i) => expect(t).toBeCloseTo(i + 1, 1))
    segs.slice(1).forEach((o, i) => expect(near(o.from![0], segs[i].to![0], 0.011)).toBe(true))   // end to end
    segs.forEach((o, i) => expect(Number(labelAt(s, [(o.from![0] + o.to![0]) / 2, o.from![1] + 0.55], 0.06)!.text), `term ${i + 1}`).toBe(i + 1))
    // the running totals sit under the segment ends
    let total = 0
    segs.forEach((o) => {
      total += Math.round(len(o) / unit)
      const t = labelAt(s, [o.to![0], o.from![1] - 0.6], 0.06)!
      expect(Number(t.text)).toBe(total)
      expect((o.to![0] - segs[0].from![0]) / unit).toBeCloseTo(total, 1)
    })
    expect(total).toBe(15)
    expect(evalLR(after(textStarting(s, 'series'), ': '))).toBe(15)
  })

  it('math.seq.partial-sums: the drawn dots are S₁ = 0.5, S₂ = 0.75, S₃ = 0.875, … of 1/2 + 1/4 + 1/8 + …, the gaps to 1 halve, and the captions repeat the sums', () => {
    const s = M.buildPartialSumsScene()
    const y0 = horizontalAxis(s)[0].from![1]
    const limit = bonds(s, VIOLET, 0.03)[0].from![1]
    const unit = limit - y0                                           // the height of 1
    expect(near(bonds(s, VIOLET, 0.03)[0].from![1], bonds(s, VIOLET, 0.03)[0].to![1], 1e-9)).toBe(true)
    const dotsB = dots(s, BLUE).sort((a, b) => a.position![0] - b.position![0])
    expect(dotsB).toHaveLength(6)
    const sums = dotsB.map((d) => (d.position![1] - y0) / unit)
    let acc = 0
    sums.forEach((v, i) => { acc += Math.pow(0.5, i + 1); expect(v, `S${i + 1}`).toBeCloseTo(acc, 2) })
    sums.slice(1).forEach((v, i) => { expect(v).toBeGreaterThan(sums[i]); expect(v).toBeLessThan(1) })
    // the red gaps run from each dot up to the limit and halve each time
    const gaps = sortX(bonds(s, RED, 0.035))
    expect(gaps).toHaveLength(6)
    gaps.forEach((g, i) => { expect(near(g.from![0], dotsB[i].position![0], 0.011)).toBe(true); expect(Math.abs(g.to![1] - g.from![1]) / unit, `gap ${i + 1}`).toBeCloseTo(Math.pow(0.5, i + 1), 2) })
    gaps.slice(1).forEach((g, i) => expect(len(g) / len(gaps[i])).toBeCloseTo(0.5, 1))
    // the numerals under the dots are n
    dotsB.forEach((d, i) => expect(labelAt(s, [d.position![0], y0 - 0.45], 0.06)!.text).toBe(String(i + 1)))
    // the captions
    expect(evalLR(after(textStarting(s, 'S₂'), '= '))).toBeCloseTo(sums[1], 2); expect(evalLR(after(textStarting(s, 'S₃'), '= '))).toBeCloseTo(sums[2], 2)
    expect(numsIn(textStarting(s, 'limit'))).toEqual([1])
  })

  it('math.seq.arithmetic-series: every column of the stacked bars is 14 tall (a₁ + aₙ = 3 + 11) so 5 columns = 70 and the series is half: 5 × 14 ÷ 2 = 35 = 3 + 5 + 7 + 9 + 11', () => {
    const s = M.buildArithmeticSeriesScene()
    const blue = sortX(bonds(s, BLUE, 0.5)), red = sortX(bonds(s, RED, 0.5))
    expect(blue).toHaveLength(5); expect(red).toHaveLength(5)
    const vals = blue.map((b) => Number(labelAt(s, [b.from![0], b.from![1] - 0.45], 0.06)!.text))
    expect(vals).toEqual([3, 5, 7, 9, 11])
    expect(vals.slice(1).map((v, i) => v - vals[i])).toEqual([2, 2, 2, 2])      // arithmetic progression
    const u = (blue[0].to![1] - blue[0].from![1]) / vals[0]
    blue.forEach((b, i) => expect((b.to![1] - b.from![1]) / vals[i]).toBeCloseTo(u, 1))
    // the red copy is the same list reversed, stacked on the blue bar of its column
    const redVals = red.map((b) => Number(labelAt(s, [b.from![0], b.to![1] + 0.45], 0.06)!.text))
    expect(redVals).toEqual([...vals].reverse())
    red.forEach((r, i) => { expect(near(r.from![1], blue[i].to![1], 0.011)).toBe(true); expect((r.to![1] - r.from![1]) / u, `red ${i}`).toBeCloseTo(redVals[i], 1) })
    // every column has the height a₁ + aₙ = 14
    blue.forEach((b, i) => expect((red[i].to![1] - b.from![1]) / u, `column ${i}`).toBeCloseTo(3 + 11, 1))
    const column = (red[0].to![1] - blue[0].from![1]) / u
    expect(Math.round(column) * blue.length).toBe(70)
    expect(sum(vals)).toBe(Math.round(column) * blue.length / 2)
    expect(numsIn(textStarting(s, 'each column'))).toEqual([14])
    expect(evalLR(after(textStarting(s, 'S₅'), '= '))).toBe(35); expect(evalLR(textStarting(s, '3 + 5'))).toBe(35)
  })

  it('math.seq.series-convergence: the drawn partial sums of Σ 1/n² level off below π²/6 ≈ 1.645 while those of 1 − 1 + 1 − … jump 1, 0, 1, 0, … and settle nowhere', () => {
    const s = M.buildSeriesConvergenceScene()
    const red = dots(s, RED).sort((a, b) => a.position![0] - b.position![0]), blue = dots(s, BLUE).sort((a, b) => a.position![0] - b.position![0])
    expect(red).toHaveLength(8); expect(blue).toHaveLength(8)
    // unit height read from the alternating sums (1 and 0), base from the axis
    const base = horizontalAxis(s)[0].from![1]
    const hi = red[0].position![1], lo = red[1].position![1]
    expect(near(lo, base, 0.01)).toBe(true)
    const unit = hi - lo
    red.forEach((d, i) => expect((d.position![1] - base) / unit, `alternating sum ${i + 1}`).toBeCloseTo(i % 2 === 0 ? 1 : 0, 1))
    // never settle: every step jumps by 1
    red.slice(1).forEach((d, i) => expect(Math.abs(d.position![1] - red[i].position![1]) / unit).toBeCloseTo(1, 1))
    // Σ 1/n²
    const sums = blue.map((d) => (d.position![1] - base) / unit)
    let acc = 0
    sums.forEach((v, i) => { acc += 1 / ((i + 1) * (i + 1)); expect(v, `S${i + 1}`).toBeCloseTo(acc, 1) })
    sums.slice(1).forEach((v, i) => expect(v).toBeGreaterThan(sums[i]))                 // increasing …
    const incr = sums.slice(1).map((v, i) => v - sums[i])
    incr.slice(1).forEach((v, i) => expect(v).toBeLessThan(incr[i] + 0.02))               // … by less and less
    const lim = bonds(s, VIOLET, 0.03)[0]
    const limit = (lim.from![1] - base) / unit
    expect(limit).toBeCloseTo(Math.PI * Math.PI / 6, 1)
    sums.forEach((v) => expect(v).toBeLessThan(limit))
    expect(numsIn(textStarting(s, 'limit'))).toEqual([Math.round(limit * 1000) / 1000])
    for (const t of ['converges', 'no limit']) expect(texts(s)).toContain(t)
  })

  it('math.seq.harmonic-series: the drawn bars are 1/n, the groups 3–4 and 5–8 each add up to more than 1/2, and H₈ = 2.72 exceeds 1 + 1.5 = 2.5', () => {
    const s = M.buildHarmonicSeriesScene()
    const bars = sortX(bonds(s, BLUE, 0.42))
    expect(bars).toHaveLength(8)
    const nOf = (b: Obj) => Number(labelAt(s, [b.from![0], b.from![1] - 0.4], 0.06)!.text)
    expect(bars.map(nOf)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    const u = (bars[0].to![1] - bars[0].from![1])
    bars.forEach((b, i) => expect((b.to![1] - b.from![1]) / u, `1/${i + 1}`).toBeCloseTo(1 / (i + 1), 2))
    const term = (n: number) => (bars[n - 1].to![1] - bars[n - 1].from![1]) / u
    const groupSum = (a: number, b: number) => sum(Array.from({ length: b - a + 1 }, (_, k) => term(a + k)))
    // the red bracket spans bars 3–4, the green one bars 5–8
    const red = bonds(s, RED, 0.06)[0], green = bonds(s, GREEN, 0.06)[0]
    const covered = (br: Obj) => bars.map((b, i) => (b.from![0] > Math.min(br.from![0], br.to![0]) && b.from![0] < Math.max(br.from![0], br.to![0]) ? i + 1 : 0)).filter(Boolean)
    expect(covered(red)).toEqual([3, 4]); expect(covered(green)).toEqual([5, 6, 7, 8])
    expect(groupSum(3, 4)).toBeGreaterThan(0.5); expect(groupSum(5, 8)).toBeGreaterThan(0.5)
    expect(groupSum(3, 4)).toBeCloseTo(1 / 3 + 1 / 4, 2); expect(groupSum(5, 8)).toBeCloseTo(1 / 5 + 1 / 6 + 1 / 7 + 1 / 8, 2)
    expect(texts(s).filter((t) => t === '≥ 0.5')).toHaveLength(2)
    // H₈
    const h8 = groupSum(1, 8)
    expect(h8).toBeCloseTo(2.7179, 1)
    expect(numsIn(textStarting(s, 'H₈'))).toEqual([Math.round(h8 * 100) / 100])
    expect(evalLR(textStarting(s, '1 + 1.5'))).toBe(2.5); expect(h8).toBeGreaterThan(2.5)
    // the groups of 2, 4, 8, … terms (n = 2^(k−1) + 1 … 2^k) keep adding more than 1/2: independent check of the claim (the group {2} alone is exactly 1/2)
    for (let k = 2; k <= 10; k++) { let g = 0; for (let n = Math.pow(2, k - 1) + 1; n <= Math.pow(2, k); n++) g += 1 / n; expect(g).toBeGreaterThan(0.5) }
  })

  it('math.real.metric-space: the drawn triangle has the distances 3, 4, 5 (right angle, 3² + 4² = 5²), 5 ≤ 3 + 4, and the taxicab distance between y and z is 3 + 4 = 7', () => {
    const s = M.buildMetricSpaceScene()
    const xy = bonds(s, BLUE, 0.06)[0], xz = bonds(s, RED, 0.06)[0], yz = bonds(s, GREEN, 0.06)[0]
    const X = xy.from!, Y = xy.to!, Z = xz.to!
    expect(near(xz.from![0], X[0], 0.011) && near(xz.from![1], X[1], 0.011)).toBe(true)
    expect(dist(yz.from!, Y) < 0.011 && dist(yz.to!, Z) < 0.011).toBe(true)
    const d = (a: readonly number[], b: readonly number[]) => dist(a, b)
    const u = d(X, Y) / 3
    expect(d(X, Z) / u).toBeCloseTo(4, 1); expect(d(Y, Z) / u).toBeCloseTo(5, 1)
    expect(d(X, Y) ** 2 + d(X, Z) ** 2).toBeCloseTo(d(Y, Z) ** 2, 1)                 // Pythagoras: a right angle at x
    expect((Y[0] - X[0]) * (Z[0] - X[0]) + (Y[1] - X[1]) * (Z[1] - X[1])).toBeCloseTo(0, 1)
    // the labels read the distances off the drawing
    const mid = (a: readonly number[], b: readonly number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const lab = (a: readonly number[], b: readonly number[]) => labelsOf(s).filter((l) => /^d = /.test(l.text!)).reduce((best, l) => (dist(l.position!, mid(a, b)) < dist(best.position!, mid(a, b)) ? l : best))
    expect(numsIn(lab(X, Y).text!)).toEqual([Math.round(d(X, Y) / u)]); expect(numsIn(lab(X, Z).text!)).toEqual([Math.round(d(X, Z) / u)]); expect(numsIn(lab(Y, Z).text!)).toEqual([Math.round(d(Y, Z) / u)])
    // the triangle inequality for every ordering of the three points, from the drawn lengths
    const P3 = [X, Y, Z]
    for (const [a, b, c] of [[0, 1, 2], [1, 2, 0], [2, 0, 1], [0, 2, 1], [1, 0, 2], [2, 1, 0]]) expect(d(P3[a], P3[c])).toBeLessThanOrEqual(d(P3[a], P3[b]) + d(P3[b], P3[c]) + 1e-9)
    // the violet detour y → x → z has length 3 + 4 = 7, longer than the direct 5; the taxicab distance of y and z is the same 7
    const detour = bonds(s, VIOLET, 0.03)
    expect(detour).toHaveLength(2)
    expect(sum(detour.map(len)) / u).toBeCloseTo(7, 1)
    const taxi = Math.abs(Y[0] - Z[0]) + Math.abs(Y[1] - Z[1])
    expect(taxi / u).toBeCloseTo(7, 1)
    expect(numsIn(textStarting(s, '5 ≤'))).toEqual([5, 3, 4]); expect(evalLR(after(textStarting(s, 'taxicab'), ': '))).toBe(7); expect(numsIn(textStarting(s, 'straight'))).toEqual([5])
  })

  it('math.real.compactness: the three drawn open intervals cover [0, 1] (finite subcover) while the intervals (1/k, 1.2) leave (0, 1/4] uncovered, so (0, 1] has no finite subcover', () => {
    const s = M.buildCompactnessScene()
    const segs = bonds(s, BLUE, 0.1).sort((a, b) => a.from![0] - b.from![0])
    expect(segs).toHaveLength(2)
    const covers = bonds(s, SLATE, 0.07)
    expect(covers).toHaveLength(6)
    const dotsB = dots(s, BLUE)
    expect(dotsB).toHaveLength(3)                                      // [0, 1] closed at both ends; (0, 1] only at 1
    const panel = (seg: Obj) => {
      const a = seg.from![0], w = seg.to![0] - seg.from![0]
      const mine = covers.filter((o) => (o.from![0] + o.to![0]) / 2 > a - 1.0 && (o.from![0] + o.to![0]) / 2 < a + w + 1.0 && (a < 0 ? (o.from![0] + o.to![0]) / 2 < 0 : (o.from![0] + o.to![0]) / 2 > 0))
      return { a, w, ivs: mine.map((o) => [(Math.min(o.from![0], o.to![0]) - a) / w, (Math.max(o.from![0], o.to![0]) - a) / w] as const).sort((p, q) => p[0] - q[0]) }
    }
    const L = panel(segs[0]), R = panel(segs[1])
    expect(L.ivs).toHaveLength(3); expect(R.ivs).toHaveLength(3)
    const inAny = (ivs: ReadonlyArray<readonly [number, number]>, t: number) => ivs.some(([a, b]) => t > a && t < b)
    // [0, 1]: every point is in one of the 3 open intervals, and consecutive intervals overlap
    for (let k = 0; k <= 1000; k++) expect(inAny(L.ivs, k / 1000), `t = ${k / 1000}`).toBe(true)
    L.ivs.slice(1).forEach(([a], i) => expect(a).toBeLessThan(L.ivs[i][1]))
    // (0, 1]: the drawn intervals are (1/2, 1.2), (1/3, 1.2), (1/4, 1.2); the smallest left end is 1/4 and the red piece covers exactly (0, 1/4]
    const lefts = R.ivs.map(([a]) => a).sort((p, q) => q - p)
    lefts.forEach((a, i) => expect(a).toBeCloseTo(1 / (i + 2), 1))
    const red = bonds(s, RED, 0.14)[0]
    expect((red.to![0] - red.from![0]) / R.w).toBeCloseTo(Math.min(...lefts), 2)
    expect(near(red.from![0], R.a, 0.011)).toBe(true)
    for (const t of [0.01, 0.1, 0.2, 0.249]) expect(inAny(R.ivs, t), `t = ${t} is missed`).toBe(false)
    expect(inAny(R.ivs, 0.3)).toBe(true); expect(inAny(R.ivs, 1)).toBe(true)
    // the whole infinite family covers (0, 1] (each point t is inside (1/k, 1.2) for k > 1/t) but no finite part does
    for (const t of [0.5, 0.1, 0.01, 0.001]) expect(Math.ceil(1 / t) + 1).toBeGreaterThan(1 / t)
    for (let N = 2; N <= 40; N++) expect(1 / N).toBeGreaterThan(0)
    for (const t of ['[0, 1]', 'finite subcover', '(0, 1]', 'no finite subcover', 'compact ⟺ closed and bounded']) expect(texts(s)).toContain(t)
  })

  it('math.real.connectedness: the cut of [0, 3] at 1.5 leaves parts that touch, [0, 1] ∪ [2, 3] has a gap, and f(x) = 2x − 1 sends [0, 3] onto the one piece [−1, 5]', () => {
    const s = M.buildConnectednessScene()
    const blue = bonds(s, BLUE, 0.12).sort((a, b) => b.from![1] - a.from![1]), red = bonds(s, RED, 0.12).sort((a, b) => b.from![1] - a.from![1])
    expect(blue).toHaveLength(2); expect(red).toHaveLength(2)
    // band 1: the two parts share the cut point (they touch) and the violet dot marks it
    const [a1, b1] = [blue[0], red[0]]
    expect(near(a1.from![1], b1.from![1], 1e-9)).toBe(true)
    expect(dist(a1.to!, b1.from!)).toBeLessThan(0.011)
    const [touch] = dots(s, VIOLET)
    expect(dist(touch.position!, a1.to!)).toBeLessThan(0.02)
    const u = (b1.to![0] - a1.from![0]) / 3                                  // one unit of the line
    expect((a1.to![0] - a1.from![0]) / u).toBeCloseTo(1.5, 1)
    // band 2: the pieces [0, 1] and [2, 3] with a gap of one unit, cut in the gap
    const [a2, b2] = [blue[1], red[1]]
    expect(b2.from![0] - a2.to![0]).toBeGreaterThan(0.5 * u)
    expect((b2.from![0] - a2.to![0]) / u).toBeCloseTo(1, 1)
    const cut = bonds(s, VIOLET, 0.03)[0]
    expect(cut.from![0]).toBeGreaterThan(a2.to![0]); expect(cut.from![0]).toBeLessThan(b2.from![0])
    expect(near(cut.from![0], cut.to![0], 1e-9)).toBe(true)
    // band 3: the domain [0, 3] and its image under f(x) = 2x − 1, one unbroken piece twice as long
    const dom = bonds(s, SLATE, 0.08)[0], img = bonds(s, GREEN, 0.12)[0]
    expect((img.to![0] - img.from![0]) / (dom.to![0] - dom.from![0])).toBeCloseTo(2, 1)
    const arr = sortX(arrows(s, SLATE))
    expect(arr).toHaveLength(3)
    const f = (t: number) => 2 * t - 1
    arr.forEach((a) => {
      const t = (a.from![0] - dom.from![0]) / u
      const v = (a.to![0] - img.from![0]) / u - 1                            // image coordinate: img starts at −1
      expect(v, `f(${t.toFixed(2)})`).toBeCloseTo(f(Math.round(t * 2) / 2), 1)
    })
    expect(arr.map((a) => Math.round(2 * (a.from![0] - dom.from![0]) / u) / 2)).toEqual([0, 1.5, 3])
    for (const t of ['A', 'B', 'cut: the parts touch', 'a gap: two pieces', 'f(x) = 2x − 1', 'image: one piece']) expect(texts(s)).toContain(t)
  })

  it('math.real.riemann-integrability: the cell holding the jump at 0.4 is 1/n wide, so U − L = 1 × 1/n = 0.25, 0.125, 0.0625 → 0 for n = 4, 8, 16 and the integral 1.6 lies between the sums', () => {
    const s = M.buildRiemannIntegrabilityScene()
    const [left, right] = sortX(bonds(s, BLUE, 0.06))
    const base = horizontalAxis(s)[0].from![1]
    const x0 = left.from![0], x1 = right.to![0], xj = left.to![0]
    expect(near(xj, right.from![0], 0.011)).toBe(true)                            // one jump, no gap in x
    const uy = left.from![1] - base                                              // height of the value 1
    const fl = (left.from![1] - base) / uy, fr = (right.from![1] - base) / uy
    expect([fl, fr].map((v) => Math.round(v * 100) / 100)).toEqual([1, 2])
    const jump = (xj - x0) / (x1 - x0)
    expect(jump).toBeCloseTo(0.4, 2)
    expect(near(bonds(s, VIOLET, 0.025)[0].from![0], xj, 0.011)).toBe(true)
    expect(numsIn(textStarting(s, 'f jumps'))).toEqual([Math.round(jump * 10) / 10])
    // the three red rows: widths 1/n, each a cell of the partition into n equal parts that contains the jump
    const rows = sortX(bonds(s, RED, 0.12))
    expect(rows).toHaveLength(3)
    const fAt = (t: number) => (t < jump ? fl : fr)
    const sums: Array<{ n: number; L: number; U: number; gap: number }> = []
    rows.sort((p, q) => p.from![1] - q.from![1]).forEach((r) => {
      const lab = labelsOf(s).find((l) => l.text!.startsWith('n =') && near(l.position![1], r.from![1], 0.011))!
      const [n, shown] = numsIn(lab.text!)
      const a = (r.from![0] - x0) / (x1 - x0), b = (r.to![0] - x0) / (x1 - x0)
      expect(b - a, `width for n = ${n}`).toBeCloseTo(1 / n, 2)
      expect(a * n).toBeCloseTo(Math.round(a * n), 1)                          // a cell of the partition
      expect(a).toBeLessThanOrEqual(jump); expect(b).toBeGreaterThan(jump)       // it holds the jump
      // upper and lower sums of the drawn function over the n cells
      let L = 0, U = 0
      for (let k = 0; k < n; k++) {
        const lo = k / n, hi = (k + 1) / n
        const vals = [fAt(lo + 1e-9), fAt(hi - 1e-9)]
        L += Math.min(...vals) / n; U += Math.max(...vals) / n
      }
      sums.push({ n, L, U, gap: U - L })
      expect(U - L, `U − L for n = ${n}`).toBeCloseTo(shown, 3)
      expect(shown).toBeCloseTo(((fr - fl) * (b - a)), 2)
      expect(L).toBeLessThanOrEqual(0.4 * fl + 0.6 * fr + 1e-9); expect(U).toBeGreaterThanOrEqual(0.4 * fl + 0.6 * fr - 1e-9)
    })
    expect(sums.map((r) => r.n)).toEqual([4, 8, 16])
    expect(sums.map((r) => r.gap)).toEqual([0.25, 0.125, 0.0625].map((v) => expect.closeTo(v, 6)))
    sums.slice(1).forEach((r, i) => expect(r.gap).toBeCloseTo(sums[i].gap / 2, 6))
    expect(0.4 * fl + 0.6 * fr).toBeCloseTo(1.6, 1)
    expect(texts(s)).toContain('gap U − L → 0')
  })
})
