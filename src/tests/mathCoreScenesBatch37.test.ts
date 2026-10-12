/**
 * Mathematics visual campaign, batch 37 (2026-10-12): the probability helpers (sample space, classical probability, combinatorial probability, independence, random variables, expected value, Markov's inequality,
 * transition matrices, the Poisson process; `math.prob.bayesian-inference` is the twin of the batch-34 figure). Every number a figure states is re-derived here from the DRAWN dots, numerals, lines and arrows,
 * never from the generator's own constants alone (outcomes are counted from the drawing, probabilities recomputed from first principles).
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB37'
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
  ['math.prob.sample-space', M.buildSampleSpaceScene, 'math-sample-space'],
  ['math.prob.classical-probability', M.buildClassicalProbabilityScene, 'math-classical-probability'],
  ['math.prob.combinatorial-probability', M.buildCombinatorialProbabilityScene, 'math-combinatorial-probability'],
  ['math.prob.independence', M.buildIndependenceScene, 'math-independence'],
  ['math.prob.random-variable', M.buildRandomVariableScene, 'math-random-variable'],
  ['math.prob.expected-value', M.buildExpectedValueScene, 'math-expected-value'],
  ['math.prob.markov-inequality', M.buildMarkovInequalityScene, 'math-markov-inequality'],
  ['math.prob.transition-matrix', M.buildTransitionMatrixScene, 'math-transition-matrix'],
  ['math.prob.poisson-process', M.buildPoissonProcessScene, 'math-poisson-process'],
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
  /** the text of a label after its first ": " or "= " (the part that is an expression) */
  const after = (t: string, sep: string) => t.slice(t.indexOf(sep) + sep.length)
  const sorted = (xs: readonly number[]) => [...xs].sort((a, b) => a - b)
  const bbox = (bs: Obj[]) => { const xs = bs.flatMap((b) => [b.from![0], b.to![0]]), ys = bs.flatMap((b) => [b.from![1], b.to![1]]); return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) } }
  const inBox = (b: { x0: number; x1: number; y0: number; y1: number }, p: readonly number[], pad = 0) => p[0] > b.x0 - pad && p[0] < b.x1 + pad && p[1] > b.y0 - pad && p[1] < b.y1 + pad

  it('math.prob.sample-space: the finite Ω holds the 4 outcomes HH, HT, TH, TT = {H, T} × {H, T}; the countable Ω runs on past its last dot; the interval [0, 1] is a segment', () => {
    const s = M.buildSampleSpaceScene()
    // finite: the grey box holds the 4 blue dots, each named by its label
    const box = bbox(bonds(s, SLATE, 0.04))
    const blue = dots(s, BLUE)
    expect(blue).toHaveLength(4)
    blue.forEach((d) => expect(inBox(box, d.position!), 'dot in box').toBe(true))
    const names = blue.map((d) => labelAt(s, [d.position![0], d.position![1] + 0.42], 0.05)!.text!)
    const product = ['H', 'T'].flatMap((a) => ['H', 'T'].map((b) => a + b))
    expect(names.sort()).toEqual(product.sort())
    expect(names.length).toBe(2 * 2)
    expect(new Set(blue.map((d) => d.position!.join())).size).toBe(4)
    // countable: six red dots equally spaced and numbered 1…6 from the top, then an arrow that continues past the last one
    const red = dots(s, RED).sort((a, b) => b.position![1] - a.position![1])
    expect(red).toHaveLength(6)
    const gaps = red.slice(1).map((d, i) => red[i].position![1] - d.position![1])
    gaps.forEach((g) => expect(near(g, gaps[0], 0.02)).toBe(true))
    red.forEach((d, k) => { expect(near(d.position![0], red[0].position![0], 0.001)).toBe(true); expect(labelAt(s, [d.position![0] + 0.5, d.position![1]], 0.05)!.text).toBe(String(k + 1)) })
    const [cont] = arrows(s, RED)
    expect(arrows(s, RED)).toHaveLength(1)
    expect(cont.from![1]).toBeLessThan(red[5].position![1]); expect(cont.to![1]).toBeLessThan(cont.from![1])
    expect(near(cont.from![0], red[0].position![0], 0.01)).toBe(true)
    // uncountable: one green segment with end labels 0 and 1, and a violet point strictly inside
    const seg = bonds(s, GREEN, 0.08)
    expect(seg).toHaveLength(1)
    const [lo, hi] = [Math.min(seg[0].from![1], seg[0].to![1]), Math.max(seg[0].from![1], seg[0].to![1])]
    expect(labelAt(s, [seg[0].from![0] + 0.5, lo], 0.05)!.text).toBe('0'); expect(labelAt(s, [seg[0].from![0] + 0.5, hi], 0.05)!.text).toBe('1')
    const [pt] = dots(s, VIOLET)
    expect(pt.position![1]).toBeGreaterThan(lo); expect(pt.position![1]).toBeLessThan(hi)
    for (const t of ['finite', '4 outcomes', 'countable', '1, 2, 3, …', 'uncountable', '[0, 1]']) expect(texts(s)).toContain(t)
  })

  it('math.prob.classical-probability: the 36 drawn outcomes form the 6 × 6 grid, the 6 blue dots are exactly the pairs with sum 7 (P = 6 ÷ 36 = 1/6) and the red dot is the only sum 12', () => {
    const s = M.buildClassicalProbabilityScene()
    // calibrate the grid from the drawn numerals: columns along the bottom, rows down the left
    const nums = labelsOf(s).filter((l) => /^[1-6]$/.test(l.text!))
    expect(nums).toHaveLength(12)
    const bottomY = Math.min(...nums.map((l) => l.position![1])), leftX = Math.min(...nums.map((l) => l.position![0]))
    const colX = (k: number) => nums.find((l) => l.text === String(k) && near(l.position![1], bottomY, 0.01))!.position![0]
    const rowY = (k: number) => nums.find((l) => l.text === String(k) && near(l.position![0], leftX, 0.01))!.position![1]
    const cell = (d: Obj): [number, number] => {
      const i = [1, 2, 3, 4, 5, 6].find((k) => near(d.position![0], colX(k), 0.01))!, j = [1, 2, 3, 4, 5, 6].find((k) => near(d.position![1], rowY(k), 0.01))!
      expect(i, 'dot on a column').toBeDefined(); expect(j, 'dot on a row').toBeDefined()
      return [i, j]
    }
    const all = dots(s, SLATE).map(cell)
    expect(all).toHaveLength(36)
    expect(new Set(all.map((c) => c.join())).size).toBe(36)
    // the event "sum 7": drawn blue dots versus the independent enumeration
    const faces = [1, 2, 3, 4, 5, 6]
    const pairs = faces.flatMap((i) => faces.map((j) => [i, j] as const))
    const sevenDrawn = dots(s, BLUE).map(cell)
    const sevenTrue = pairs.filter(([i, j]) => i + j === 7)
    expect(sevenDrawn.map((c) => c.join()).sort()).toEqual(sevenTrue.map((c) => c.join()).sort())
    expect(sevenDrawn).toHaveLength(6)
    const diag = bonds(s, VIOLET, 0.03)[0]
    dots(s, BLUE).forEach((d) => expect(distToLine(diag, d.position!)).toBeLessThan(0.02))
    const twelveDrawn = dots(s, RED).map(cell)
    expect(twelveDrawn).toEqual(pairs.filter(([i, j]) => i + j === 12).map((c) => [...c]))
    // the captions
    expect(numsIn(texts(s).find((t) => t.startsWith('sum 7'))!)).toEqual([7, 6, 36]); expect(numsIn(texts(s).find((t) => t.startsWith('sum 12'))!)).toEqual([12, 1, 36])
    expect(numsIn(texts(s).find((t) => t.startsWith('two dice'))!)).toEqual([36])
    expect(evalLR('6 ÷ 36 = 1/6')).toBeCloseTo(1 / 6, 10); expect(texts(s)).toContain('6 ÷ 36 = 1/6')
    expect(sevenDrawn.length / all.length).toBeCloseTo(1 / 6, 10)
  })

  it('math.prob.combinatorial-probability: 10 drawn pairs = C(5, 2), coloured 3 boy–boy + 1 girl–girl + 3 × 2 = 6 mixed, so P(mixed) = 6/10', () => {
    const s = M.buildCombinatorialProbabilityScene()
    const boys = dots(s, BLUE), girls = dots(s, RED)
    expect(boys).toHaveLength(3); expect(girls).toHaveLength(2)
    const people = [...boys, ...girls].map((d) => ({ p: d.position!, boy: d.color === BLUE }))
    const segs = [...bonds(s, BLUE, 0.035), ...bonds(s, RED, 0.035), ...bonds(s, GREEN, 0.035)]
    expect(segs).toHaveLength(10)
    const who = (p: readonly number[]) => people.findIndex((q) => dist(q.p, p) < 0.02)
    const keyOf = (o: Obj) => { const [a, b] = [who(o.from!), who(o.to!)]; expect(a).toBeGreaterThanOrEqual(0); expect(b).toBeGreaterThanOrEqual(0); return [Math.min(a, b), Math.max(a, b)].join('-') }
    const drawnPairs = segs.map(keyOf)
    // every pair of the five people appears exactly once (C(5, 2) = 10, enumerated independently)
    const allPairs = people.flatMap((_, a) => people.map((__, b) => [a, b]).filter(([x, y]) => y > x).map(([x, y]) => `${x}-${y}`))
    expect(allPairs).toHaveLength(10)
    expect(drawnPairs.sort()).toEqual(allPairs.sort())
    // the colour of each pair matches its kind
    for (const o of segs) {
      const [a, b] = [people[who(o.from!)], people[who(o.to!)]]
      const kind = a.boy && b.boy ? BLUE : !a.boy && !b.boy ? RED : GREEN
      expect(o.color).toBe(kind)
    }
    const counts = { boyboy: bonds(s, BLUE, 0.035).length, girlgirl: bonds(s, RED, 0.035).length, mixed: bonds(s, GREEN, 0.035).length }
    expect(counts).toEqual({ boyboy: 3, girlgirl: 1, mixed: 6 })
    expect(counts.mixed).toBe(boys.length * girls.length)
    expect(counts.boyboy + counts.girlgirl).toBe(4)
    // captions
    expect(numsIn(texts(s).find((t) => t.startsWith('C(5'))!)).toEqual([5, 2, 10])
    expect(evalLR(after(texts(s).find((t) => t.startsWith('mixed'))!, ': '))).toBe(6)
    expect(evalLR(after(texts(s).find((t) => t.startsWith('same sex'))!, ': '))).toBe(4)
    expect(numsIn(texts(s).find((t) => t.startsWith('6 of'))!)).toEqual([6, 10])
    expect(counts.mixed / segs.length).toBeCloseTo(0.6, 10)
  })

  it('math.prob.independence: the drawn areas give P(A) = 0.6, P(B) = 0.5 and P(A ∩ B) = 0.3 = 0.6 × 0.5, and inside B the share of A is 0.3 ÷ 0.5 = 0.6 = P(A)', () => {
    const s = M.buildIndependenceScene()
    const sq = bbox(bonds(s, SLATE, 0.04))
    const side = sq.x1 - sq.x0
    expect(near(side, sq.y1 - sq.y0, 0.01)).toBe(true)
    // the A divider is vertical, the B divider horizontal; the green outline is their overlap
    const divA = bonds(s, BLUE, 0.04)[0], divB = bonds(s, RED, 0.04)[0]
    expect(near(divA.from![0], divA.to![0], 1e-9)).toBe(true); expect(near(divB.from![1], divB.to![1], 1e-9)).toBe(true)
    const pA = (divA.from![0] - sq.x0) / side, pB = (divB.from![1] - sq.y0) / side
    expect(pA).toBeCloseTo(0.6, 2); expect(pB).toBeCloseTo(0.5, 2)
    const ov = bbox(bonds(s, GREEN, 0.06))
    expect(ov.x0).toBeCloseTo(sq.x0, 2); expect(ov.y0).toBeCloseTo(sq.y0, 2)
    expect(ov.x1).toBeCloseTo(divA.from![0], 2); expect(ov.y1).toBeCloseTo(divB.from![1], 2)
    const pAB = ((ov.x1 - ov.x0) * (ov.y1 - ov.y0)) / (side * side)
    expect(pAB).toBeCloseTo(0.3, 2)
    expect(Math.abs(pAB - pA * pB)).toBeLessThan(0.005)      // independent: P(A ∩ B) = P(A) P(B)
    expect(Math.abs(pAB / pB - pA)).toBeLessThan(0.01)        // P(A | B) = P(A)
    // the hatching stays in its own event: blue verticals inside A, red horizontals inside B
    const vh = bonds(s, BLUE, 0.022), hh = bonds(s, RED, 0.022)
    expect(vh.length).toBeGreaterThanOrEqual(5); expect(hh.length).toBeGreaterThanOrEqual(4)
    vh.forEach((o) => { expect(near(o.from![0], o.to![0], 1e-9)).toBe(true); expect(o.from![0]).toBeLessThan(divA.from![0]); expect(o.from![0]).toBeGreaterThan(sq.x0) })
    hh.forEach((o) => { expect(near(o.from![1], o.to![1], 1e-9)).toBe(true); expect(o.from![1]).toBeLessThan(divB.from![1]); expect(o.from![1]).toBeGreaterThan(sq.y0) })
    // the captions agree with the drawing
    expect(numsIn(texts(s).find((t) => t.startsWith('A:'))!)).toEqual([pA].map((v) => Math.round(v * 10) / 10))
    expect(numsIn(texts(s).find((t) => t.startsWith('B:'))!)).toEqual([Math.round(pB * 10) / 10])
    expect(evalLR(after(texts(s).find((t) => t.startsWith('A ∩ B'))!, ': '))).toBeCloseTo(pAB, 5)
    expect(evalLR(after(texts(s).find((t) => t.startsWith('P(A | B)'))!, '= '))).toBeCloseTo(pA, 5)
  })

  it('math.prob.random-variable: each of the 4 outcomes has exactly one arrow, to its number of heads (HH → 2, HT → 1, TH → 1, TT → 0), so 1 / 2 / 1 of the 4 outcomes give 0 / 1 / 2', () => {
    const s = M.buildRandomVariableScene()
    const outs = dots(s, RED).map((d) => ({ y: d.position![1], x: d.position![0], name: labelAt(s, [d.position![0] - 0.65, d.position![1]], 0.05)!.text! }))
    expect(outs.map((o) => o.name).sort()).toEqual(['HH', 'HT', 'TH', 'TT'])
    // the number line: grey dots, each with its numeral to the right
    const vals = dots(s, SLATE).map((d) => ({ y: d.position![1], x: d.position![0], v: Number(labelAt(s, [d.position![0] + 0.5, d.position![1]], 0.05)!.text) }))
    expect(vals.map((v) => v.v).sort()).toEqual([0, 1, 2])
    const arr = arrows(s, BLUE)
    expect(arr).toHaveLength(4)
    const into = new Map<number, number>()
    for (const o of outs) {
      const mine = arr.filter((a) => near(a.from![1], o.y, 0.01))
      expect(mine, `one arrow from ${o.name}`).toHaveLength(1)
      const end = vals.reduce((best, v) => (Math.abs(v.y - mine[0].to![1]) < Math.abs(best.y - mine[0].to![1]) ? v : best))
      expect(Math.abs(end.y - mine[0].to![1])).toBeLessThan(0.01)
      expect(end.v, `X(${o.name})`).toBe([...o.name].filter((c) => c === 'H').length)
      into.set(end.v, (into.get(end.v) ?? 0) + 1)
    }
    expect([0, 1, 2].map((v) => into.get(v))).toEqual([1, 2, 1])
    // the captions beside the values: n of 4
    for (const v of vals) {
      const cap = labelsOf(s).find((l) => /of 4$/.test(l.text!) && near(l.position![1], v.y, 0.01))!
      expect(numsIn(cap.text!)).toEqual([into.get(v.v), 4])
    }
    expect(sum([...into.values()])).toBe(4)
  })

  it('math.prob.expected-value: the bar heights give P = 0.1, 0.2, 0.3, 0.4 and E[X] = 2, the pivot sits at x = 2 and the torques about it cancel (left 0.4 = right 0.4)', () => {
    const s = M.buildExpectedValueScene()
    const bars = bonds(s, BLUE, 0.2).sort((a, b) => a.from![0] - b.from![0])
    expect(bars).toHaveLength(4)
    const h = bars.map((b) => b.to![1] - b.from![1])
    const total = sum(h)
    const p = h.map((v) => v / total)
    p.forEach((v, i) => expect(v).toBeCloseTo([0.1, 0.2, 0.3, 0.4][i], 2))
    // the values under the bars, from the drawn numerals
    const vals = bars.map((b) => Number(labelAt(s, [b.from![0], -2.35], 0.05)!.text))
    expect(vals).toEqual([0, 1, 2, 3])
    const mean = sum(vals.map((v, i) => v * p[i]))
    expect(mean).toBeCloseTo(2, 2)
    // all bars stand on the beam
    const beam = bonds(s, SLATE, 0.06)[0]
    bars.forEach((b) => expect(near(b.from![1], beam.from![1], 0.001)).toBe(true))
    // the probability labels on the bars are the heights in %
    bars.forEach((b, i) => expect(Number(labelAt(s, [b.from![0], b.to![1] + 0.42], 0.05)!.text)).toBe(Math.round(p[i] * 100)))
    // the pivot: two green sides meeting at an apex on the beam
    const piv = bonds(s, GREEN, 0.05)
    expect(piv).toHaveLength(3)
    const apex = piv.flatMap((o) => [o.from!, o.to!]).reduce((best, q) => (q[1] > best[1] ? q : best))
    const x0 = bars[0].from![0], dx = bars[1].from![0] - bars[0].from![0]
    const pivotValue = (apex[0] - x0) / dx
    expect(pivotValue).toBeCloseTo(mean, 2)
    // moments about the pivot cancel
    const torque = sum(bars.map((b, i) => (b.from![0] - apex[0]) * h[i]))
    expect(Math.abs(torque)).toBeLessThan(0.05)
    const left = sum(vals.map((v, i) => (v < pivotValue ? (pivotValue - v) * p[i] : 0))), right = sum(vals.map((v, i) => (v > pivotValue ? (v - pivotValue) * p[i] : 0)))
    expect(left).toBeCloseTo(0.4, 2); expect(right).toBeCloseTo(0.4, 2)
    expect(numsIn(texts(s).find((t) => t.startsWith('left'))!)).toEqual([left].map((v) => Math.round(v * 10) / 10))
    expect(numsIn(texts(s).find((t) => t.startsWith('right'))!)).toEqual([Math.round(right * 10) / 10])
    expect(numsIn(texts(s).find((t) => t.startsWith('E[X]'))!)).toEqual([2])
  })

  it("math.prob.markov-inequality: the drawn tail P(X ≥ 4) = 0.2 is at most E[X] ÷ 4 = 0.5, and the inequality holds for every a = 1…7 on the drawn distribution", () => {
    const s = M.buildMarkovInequalityScene()
    const bars = bonds(s, BLUE, 0.3).sort((a, b) => a.from![0] - b.from![0])
    expect(bars).toHaveLength(8)
    const h = bars.map((b) => b.to![1] - b.from![1])
    const total = sum(h)
    const p = h.map((v) => v / total)
    const want = [0.3, 0.2, 0.2, 0.1, 0.05, 0.05, 0.05, 0.05]
    p.forEach((v, k) => expect(v, `p(${k})`).toBeCloseTo(want[k], 2))
    // the values under the bars are 0…7
    bars.forEach((b, k) => expect(labelAt(s, [b.from![0], -2.25], 0.05)!.text).toBe(String(k)))
    const mean = sum(p.map((v, k) => k * v))
    expect(mean).toBeCloseTo(2, 2)
    // the two violet guides: the mean (at the bar of value 2) and a (at the bar of value 4)
    const guides = bonds(s, VIOLET, 0.025).sort((a, b) => a.from![0] - b.from![0])
    expect(guides).toHaveLength(2)
    expect(near(guides[0].from![0], bars[2].from![0], 0.01)).toBe(true); expect(near(guides[1].from![0], bars[4].from![0], 0.01)).toBe(true)
    const a = 4
    // the red tail bars repeat bars a…7
    const red = bonds(s, RED, 0.3).sort((x, y) => x.from![0] - y.from![0])
    expect(red).toHaveLength(8 - a)
    red.forEach((r, i) => { expect(near(r.from![0], bars[a + i].from![0], 0.01)).toBe(true); expect(near(r.to![1], bars[a + i].to![1], 0.01)).toBe(true) })
    // the right-hand bars: tail (red) and bound (green), measured in the same units as the bars
    const tailBar = bonds(s, RED, 0.5)[0], boundBar = bonds(s, GREEN, 0.5)[0]
    const tail = (tailBar.to![1] - tailBar.from![1]) / total, bound = (boundBar.to![1] - boundBar.from![1]) / total
    expect(tail).toBeCloseTo(sum(p.slice(a)), 2); expect(tail).toBeCloseTo(0.2, 2)
    expect(bound).toBeCloseTo(mean / a, 2); expect(bound).toBeCloseTo(0.5, 2)
    expect(tail).toBeLessThanOrEqual(bound)
    // Markov's inequality for every threshold on the drawn distribution
    for (let t = 1; t <= 7; t++) expect(sum(p.slice(t)), `a = ${t}`).toBeLessThanOrEqual(mean / t + 1e-9)
    expect(numsIn(texts(s).find((t) => t.startsWith('tail'))!)).toEqual([0.2]); expect(numsIn(texts(s).find((t) => t.startsWith('bound'))!)).toEqual([0.5])
    expect(evalLR(after(texts(s).find((t) => t.startsWith('0.2 ≤'))!, '≤ '))).toBeCloseTo(0.5, 10)
  })

  it('math.prob.transition-matrix: P = [[90, 10], [50, 50]] % has rows adding to 100, and the drawn P² = [[86, 14], [70, 30]] is P × P (86 = 81 + 5)', () => {
    const s = M.buildTransitionMatrixScene()
    const { m1, m2, m3 } = M.TMX
    const read = (m: typeof m1) => [0, 1].map((i) => [0, 1].map((j) => numOf(labelAt(s, mAt(m, i, j), 0.02)!.text!)))
    const P1 = read(m1), P1b = read(m2), P2 = read(m3)
    expect(P1).toEqual([[90, 10], [50, 50]]); expect(P1b).toEqual(P1)
    P1.forEach((row) => { expect(sum(row)).toBe(100); row.forEach((v) => expect(v).toBeGreaterThanOrEqual(0)) })
    // the second matrix is the product of the first with itself (entries in %)
    const prod = matMul(P1.map((r) => r.map((v) => v / 100)), P1b.map((r) => r.map((v) => v / 100))).map((r) => r.map((v) => v * 100))
    closeMat(P2, prod, 0.5)
    P2.forEach((row) => expect(sum(row)).toBe(100))
    // 86 = 81 + 5: the S → S path via S (0.9 × 0.9) plus the path via R (0.1 × 0.5)
    expect(evalLR(after(texts(s).find((t) => t.startsWith('86 ='))!, '= '))).toBe(86)
    expect(P1[0][0] * P1b[0][0] / 100).toBe(81); expect(P1[0][1] * P1b[1][0] / 100).toBe(5); expect(P2[0][0]).toBe(81 + 5)
    // the outlines: blue holds row 1 of the first matrix, red holds column 1 of the second, green holds the entry 86
    const blue = bbox(bonds(s, BLUE, 0.035)), red = bbox(bonds(s, RED, 0.035)), green = bbox(bonds(s, GREEN, 0.035))
    expect(inBox(blue, mAt(m1, 0, 0)) && inBox(blue, mAt(m1, 0, 1))).toBe(true); expect(inBox(blue, mAt(m1, 1, 0)) || inBox(blue, mAt(m1, 1, 1))).toBe(false)
    expect(inBox(red, mAt(m2, 0, 0)) && inBox(red, mAt(m2, 1, 0))).toBe(true); expect(inBox(red, mAt(m2, 0, 1)) || inBox(red, mAt(m2, 1, 1))).toBe(false)
    expect(inBox(green, mAt(m3, 0, 0))).toBe(true); expect([[0, 1], [1, 0], [1, 1]].some(([i, j]) => inBox(green, mAt(m3, i, j)))).toBe(false)
    for (const t of ['×', '=', 'S', 'R', 'entries in %', 'each row adds to 100', 'after two steps']) expect(texts(s)).toContain(t)
  })

  it('math.prob.poisson-process: the drawn staircase counts the 9 drawn arrivals (N(0) = 0, N(6) = 9), each window of length 2 holds 3, and 9 ÷ 6 = 1.5 = λ so 1.5 × 6 = 9', () => {
    const s = M.buildPoissonProcessScene()
    // the time scale, read from the numerals under the lower axis; the count scale from the numerals 3, 6, 9 on the left
    const timeNums = labelsOf(s).filter((l) => /^[0-6]$/.test(l.text!) && l.position![1] < -2.5)
    expect(timeNums.map((l) => l.text).sort()).toEqual(['0', '1', '2', '3', '4', '5', '6'])
    const x0 = timeNums.find((l) => l.text === '0')!.position![0], x6 = timeNums.find((l) => l.text === '6')!.position![0]
    const tOf = (x: number) => ((x - x0) / (x6 - x0)) * 6
    const yNums = labelsOf(s).filter((l) => ['3', '6', '9'].includes(l.text!) && l.position![0] < x0 - 0.3)
    expect(yNums).toHaveLength(3)
    const y3 = yNums.find((l) => l.text === '3')!.position![1], y9 = yNums.find((l) => l.text === '9')!.position![1]
    const uy = (y9 - y3) / 6, baseY = y3 - 3 * uy
    const nOf = (y: number) => (y - baseY) / uy
    // the arrivals are the red dots on the top row
    const arrivals = dots(s, RED).map((d) => tOf(d.position![0])).sort((a, b) => a - b)
    expect(arrivals).toHaveLength(9)
    arrivals.forEach((t) => { expect(t).toBeGreaterThan(0); expect(t).toBeLessThan(6) })
    // the staircase: horizontal blue runs at heights 0…9, vertical jumps of 1 at the arrivals
    const runs = bonds(s, BLUE, 0.05), jumps = bonds(s, BLUE, 0.03)
    expect(runs).toHaveLength(10); expect(jumps).toHaveLength(9)
    const level = (t: number) => { const r = runs.find((o) => tOf(Math.min(o.from![0], o.to![0])) <= t + 1e-9 && tOf(Math.max(o.from![0], o.to![0])) >= t - 1e-9)!; return Math.round(nOf(r.from![1])) }
    expect(level(0.0)).toBe(0); expect(level(6)).toBe(9)
    const knots = [0, ...arrivals, 6]
    for (let k = 0; k + 1 < knots.length; k++) expect(level((knots[k] + knots[k + 1]) / 2), `N between arrival ${k} and ${k + 1}`).toBe(arrivals.filter((a) => a <= (knots[k] + knots[k + 1]) / 2).length)
    jumps.forEach((j) => { expect(near(j.from![0], j.to![0], 1e-9)).toBe(true); expect(Math.abs(nOf(j.to![1]) - nOf(j.from![1]))).toBeCloseTo(1, 1) })
    // the jumps happen at the arrival times
    expect(jumps.map((j) => tOf(j.from![0])).sort((a, b) => a - b)).toEqual(arrivals.map((t) => expect.closeTo(t, 1)))
    // three windows of length 2: guides at t = 2 and t = 4, three arrivals in each, matching the three numerals 3
    const guides = bonds(s, VIOLET, 0.025).map((o) => tOf(o.from![0])).sort((a, b) => a - b)
    expect(guides).toHaveLength(2); expect(guides[0]).toBeCloseTo(2, 1); expect(guides[1]).toBeCloseTo(4, 1)
    const edges = [0, ...guides.map(Math.round), 6]
    const counts = [0, 1, 2].map((w) => arrivals.filter((t) => t > edges[w] && t < edges[w + 1]).length)
    expect(counts).toEqual([3, 3, 3])
    const winNums = labelsOf(s).filter((l) => l.text === '3' && l.color === GREEN)
    expect(winNums).toHaveLength(3)
    winNums.forEach((l, i) => { const t = tOf(l.position![0]); expect(t).toBeGreaterThan(edges[i]); expect(t).toBeLessThan(edges[i + 1]) })
    // rate: 9 arrivals in 6 time units = 1.5 per unit; the expected counts 1.5 × 2 = 3 and 1.5 × 6 = 9 match what is drawn
    const lambda = numsIn(texts(s).find((t) => t.startsWith('λ'))!)[0]
    expect(arrivals.length / 6).toBeCloseTo(lambda, 10)
    expect(lambda * 2).toBeCloseTo(counts[0], 10)
    expect(evalLR(after(texts(s).find((t) => t.startsWith('mean'))!, 'mean '))).toBe(arrivals.length)
    expect(evalLR(texts(s).find((t) => t.startsWith('1.5 ×'))!)).toBe(counts[0])
  })

  it('math.prob.bayesian-inference: the probability twin is served the figure of math.stats.bayesian-inference (same KG statement)', () => {
    for (const id of ['math.prob.bayesian-inference', 'math.stats.bayesian-inference']) {
      const d = resolveVisual({ message: '', lessonConceptId: id, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, id).toBe(true)
      expect(d.asset?.scope, id).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('math-bayesian-inference')
    }
  })
})
