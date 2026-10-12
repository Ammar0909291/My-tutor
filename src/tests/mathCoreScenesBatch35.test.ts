/**
 * Mathematics visual campaign, batch 35 (2026-10-12): the discrete-mathematics helpers (counting principles, permutations, combinations, the binomial theorem, a bijection, recurrences, a recursion tree, a truth table, growth curves, complexity classes). Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB35'
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
  ['math.disc.counting-principles', M.buildCountingPrinciplesScene, 'math-counting-principles'],
  ['math.disc.permutations', M.buildPermutationsScene, 'math-permutations'],
  ['math.disc.combinations', M.buildCombinationsScene, 'math-combinations'],
  ['math.disc.combinatorics', M.buildCombinatoricsScene, 'math-combinatorics'],
  ['math.disc.recurrence-relation', M.buildRecurrenceRelationScene, 'math-recurrence-relation'],
  ['math.disc.linear-recurrence', M.buildLinearRecurrenceScene, 'math-linear-recurrence'],
  ['math.disc.divide-conquer-recurrence', M.buildDivideConquerRecurrenceScene, 'math-divide-conquer-recurrence'],
  ['math.disc.propositional-logic', M.buildPropositionalLogicScene, 'math-propositional-logic'],
  ['math.disc.algorithm-complexity', M.buildAlgorithmComplexityScene, 'math-algorithm-complexity'],
  ['math.disc.complexity-classes', M.buildComplexityClassesScene, 'math-complexity-classes'],
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

// ── readers ────────────────────────────────────────────────────────────────────────────────
const toGraph = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toGraph(f, p))
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
const choose = (n: number, k: number) => fact(n) / (fact(k) * fact(n - k))
const nearestIndex = (p: readonly number[], pts: ReadonlyArray<readonly number[]>) => pts.reduce((best, q, i) => (dist(p, q) < dist(p, pts[best]) ? i : best), 0)
const inEllipse = (e: { cx: number; cy: number; rx: number; ry: number }, p: readonly number[], slack = 1) => ((p[0] - e.cx) / e.rx) ** 2 + ((p[1] - e.cy) / e.ry) ** 2 <= slack

describe('the mathematics each figure draws', () => {
  it('math.disc.counting-principles: 3 × 2 = 6 leaves in the drawn tree, and 4 + 3 = 7 disjoint routes', () => {
    const s = M.buildCountingPrinciplesScene()
    const leaves = dots(s, RED), shirts = dots(s, BLUE).filter((d) => d.position![0] < 0)
    expect(leaves).toHaveLength(6); expect(shirts).toHaveLength(3)
    // every leaf hangs on exactly one shirt by a drawn branch, and every shirt has the same number of leaves
    const branches = bonds(s, SLATE, 0.04)
    const parentOf = (leaf: Obj) => { const b = branches.filter((o) => dist(o.to!, leaf.position!) < 0.02); expect(b, 'one branch into each leaf').toHaveLength(1); return shirts.findIndex((sh) => dist(sh.position!, b[0].from!) < 0.02) }
    const perShirt = [0, 0, 0]
    leaves.forEach((l) => { const i = parentOf(l); expect(i).toBeGreaterThanOrEqual(0); perShirt[i]++ })
    expect(perShirt).toEqual([2, 2, 2])
    // each shirt is joined to the root; the root is the one dot with no branch into it
    const root = dots(s, INK)[0]
    shirts.forEach((sh) => expect(branches.some((o) => dist(o.from!, root.position!) < 0.02 && dist(o.to!, sh.position!) < 0.02)).toBe(true))
    expect(shirts.length * perShirt[0]).toBe(leaves.length)
    // the leaves are numbered 1 to 6, and the caption multiplies
    const nums = labelsOf(s).filter((l) => /^[1-6]$/.test(l.text!) && l.position![0] > -1 && l.position![0] < 0).map((l) => Number(l.text)).sort()
    expect(nums).toEqual([1, 2, 3, 4, 5, 6])
    expect(evalLR(labelsOf(s).find((l) => l.text!.startsWith('3 × 2'))!.text!)).toBe(leaves.length)
    // addition: 4 bus routes and 3 train routes are different points; 4 + 3 = 7
    const bus = dots(s, BLUE).filter((d) => d.position![0] > 0), train = dots(s, GREEN)
    expect(bus).toHaveLength(4); expect(train).toHaveLength(3)
    bus.forEach((b) => train.forEach((t) => expect(dist(b.position!, t.position!)).toBeGreaterThan(0.3)))
    expect(evalLR(labelsOf(s).find((l) => l.text!.startsWith('4 + 3'))!.text!)).toBe(bus.length + train.length)
    for (const t of ['bus', 'train']) expect(texts(s)).toContain(t)
  })

  it('math.disc.permutations: the 12 filled cells are exactly the ordered pairs (a, b) with a ≠ b, so P(4, 2) = 12', () => {
    const s = M.buildPermutationsScene()
    const cellOf = (d: Obj) => { const a = (d.position![0] - M.PRM.x0) / M.PRM.dx + 1, b = (M.PRM.y0 - d.position![1]) / M.PRM.dy + 1; expect(Math.abs(a - Math.round(a)) + Math.abs(b - Math.round(b))).toBeLessThan(0.05); return [Math.round(a), Math.round(b)] as const }
    const filled = dots(s, BLUE).map(cellOf)
    expect(filled).toHaveLength(12)
    const keys = new Set(filled.map(([a, b]) => `${a},${b}`))
    expect(keys.size).toBe(12)
    for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) expect(keys.has(`${a},${b}`)).toBe(a !== b)
    // the order matters: (1, 2) and (2, 1) are two different cells (the red and green dots)
    const red = cellOf(dots(s, RED)[0]), green = cellOf(dots(s, GREEN)[0])
    expect(red).toEqual([1, 2]); expect(green).toEqual([2, 1])
    expect(keys.has('1,2') && keys.has('2,1')).toBe(true)
    // 4 × 3 = 24 ÷ 2 = 12 = 4!/(4 − 2)!
    expect(evalLR('4 × 3 = 12')).toBe(filled.length); expect(evalLR('24 ÷ 2 = 12')).toBe(filled.length)
    expect(fact(4) / fact(4 - 2)).toBe(filled.length)
    expect(texts(s)).toEqual(expect.arrayContaining(['4 × 3 = 12', '24 ÷ 2 = 12', 'P(4, 2) = 12']))
    // headers 1-4 along the top (red) and down the left (green)
    for (let i = 1; i <= 4; i++) { expect(labelAt(s, [M.prmCell(i, 1)[0], M.PRM.y0 + 0.7])!.text).toBe(String(i)); expect(labelAt(s, [M.PRM.x0 - 0.7, M.prmCell(1, i)[1]])!.text).toBe(String(i)) }
  })

  it('math.disc.combinations: the 10 drawn segments are exactly the 2-subsets of 5 points, each once, so C(5, 2) = 20 ÷ 2 = 10', () => {
    const s = M.buildCombinationsScene()
    const pts = [0, 1, 2, 3, 4].map((k) => M.cmbPoint(k))
    const segs = [...bonds(s, BLUE, 0.04), ...bonds(s, GREEN, 0.04)]
    expect(segs).toHaveLength(10)
    const pairs = segs.map((o) => [nearestIndex(o.from!, pts), nearestIndex(o.to!, pts)].sort() as [number, number])
    segs.forEach((o, i) => { expect(dist(o.from!, pts[pairs[i][0]] ) < 0.02 || dist(o.from!, pts[pairs[i][1]]) < 0.02).toBe(true) })
    const keys = new Set(pairs.map((p) => p.join('-')))
    expect(keys.size).toBe(10)
    for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) expect(keys.has(`${a}-${b}`)).toBe(true)
    // every point is joined to the 4 others
    for (let k = 0; k < 5; k++) expect(pairs.filter((p) => p.includes(k))).toHaveLength(4)
    // blue = the 5 sides of the pentagon (neighbours), green = the 5 diagonals
    const blue = bonds(s, BLUE, 0.04).map((o) => [nearestIndex(o.from!, pts), nearestIndex(o.to!, pts)].sort() as [number, number])
    expect(blue).toHaveLength(5); blue.forEach(([a, b]) => expect([1, 4]).toContain(b - a))
    // C(5, 2) = 5!/(2! 3!) = 10 = (5 × 4) ÷ 2
    expect(choose(5, 2)).toBe(10)
    expect(evalLR('5 × 4 = 20')).toBe(20); expect(evalLR(labelsOf(s).find((l) => l.text!.startsWith('20 ÷'))!.text!)).toBe(10)
    expect(texts(s)).toEqual(expect.arrayContaining(['5 × 4 = 20', '20 ÷ 2 = 10', 'C(5, 2) = 10']))
    // five numbered points
    expect(dots(s, INK)).toHaveLength(5)
  })

  it('math.disc.binomial-theorem: the discrete twin is served the Pascal figure of math.alg.binomial-theorem (same KG statement)', () => {
    for (const id of ['math.disc.binomial-theorem', 'math.alg.binomial-theorem']) {
      const d = resolveVisual({ message: '', lessonConceptId: id, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, id).toBe(true)
      expect(d.asset?.scope, id).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('math-binomial-theorem')
    }
  })

  it('math.disc.combinatorics: the drawn tree has 2³ = 8 leaves, the paths spell every 3-bit string once, and the green path 101 is the subset {1, 3}', () => {
    const s = M.buildCombinatoricsScene()
    const branches = bonds(s, SLATE, 0.04)
    expect(branches).toHaveLength(2 + 4 + 8)
    // rebuild the tree from the drawn branches: children of a node, upper child first
    const root = branches.map((b) => b.from!).reduce((m, p) => (p[0] < m[0] ? p : m))
    const childrenOf = (p: readonly number[]) => branches.filter((b) => dist(b.from!, p) < 0.02).map((b) => b.to!).sort((a, b) => b[1] - a[1])
    const strings: Array<{ leaf: number[]; bits: string }> = []
    const walk = (p: readonly number[], bits: string) => { const kids = childrenOf(p); if (!kids.length) { strings.push({ leaf: [...p], bits }); return } expect(kids).toHaveLength(2); kids.forEach((k, i) => walk(k, bits + i)) }
    walk(root, '')
    expect(strings).toHaveLength(8)
    expect(strings.map((x) => x.bits).sort()).toEqual(['000', '001', '010', '011', '100', '101', '110', '111'])
    // each branch carries the bit that its geometry says: 0 on the upper child, 1 on the lower child
    for (const b of branches) {
      const bit = childrenOf(b.from!).findIndex((k) => dist(k, b.to!) < 0.02)
      expect([0, 1]).toContain(bit)
      const mid = [(b.from![0] + b.to![0]) / 2, (b.from![1] + b.to![1]) / 2]
      const lab = labelAt(s, [mid[0] - 0.12, mid[1] + (bit === 0 ? 0.24 : -0.24)], 0.04)
      expect(lab, 'branch label').toBeTruthy(); expect(lab!.text).toBe(String(bit))
    }
    // the eight blue dots are the leaves
    const leafDots = dots(s, BLUE); expect(leafDots).toHaveLength(8)
    strings.forEach((x) => expect(leafDots.some((d) => dist(d.position!, x.leaf) < 0.02)).toBe(true))
    // the green path: three branches from the root to one leaf; its bits give the subset
    const green = bonds(s, GREEN, 0.07)
    expect(green).toHaveLength(3)
    let at = root as readonly number[]; let bits = ''
    for (let i = 0; i < 3; i++) { const step = green.find((g) => dist(g.from!, at) < 0.02)!; expect(step).toBeTruthy(); const kids = childrenOf(at); bits += kids.findIndex((k) => dist(k, step.to!) < 0.02); at = step.to! }
    expect(bits).toBe('101')
    const subset = [...bits].map((b, i) => (b === '1' ? i + 1 : 0)).filter(Boolean)
    expect(subset).toEqual([1, 3])
    expect(texts(s)).toContain('101 ↔ {1, 3}')
    // 2 × 2 × 2 = 8 strings, and as many subsets of a 3-element set
    expect(evalLR('2 × 2 × 2 = 8')).toBe(strings.length); expect(2 ** 3).toBe(strings.length)
    expect(texts(s)).toContain('2 × 2 × 2 = 8')
  })

  it('math.disc.recurrence-relation: the drawn bars are 1, 1, 2, 3, 5, 8, 13, 21 and each is stacked from the two bars before it', () => {
    const s = M.buildRecurrenceRelationScene()
    const F = M.FIB
    const value = (y: number) => (y - F.base) / F.scale
    // each bar: its drawn segments (from the axis up), read in value units
    const bar = (n: number) => bonds(s, BLUE, F.thick).concat(bonds(s, GREEN, F.thick), bonds(s, VIOLET, F.thick)).filter((o) => Math.abs(o.from![0] - M.fibX(n)) < 0.01).map((o) => ({ lo: value(o.from![1]), hi: value(o.to![1]), color: o.color })).sort((p, q) => p.lo - q.lo)
    const totals: number[] = []
    for (let n = 1; n <= 8; n++) {
      const segs = bar(n)
      totals.push(Math.round(segs[segs.length - 1].hi))
      expect(segs[0].lo).toBeCloseTo(0, 1)
      // the numeral above the bar is its height
      const top = segs[segs.length - 1].hi
      const l = labelAt(s, [M.fibX(n), F.base + F.scale * top + 0.4], 0.05)!
      expect(l, `numeral for bar ${n}`).toBeTruthy(); expect(Number(l.text)).toBe(Math.round(top))
      // the index label under it
      expect(labelAt(s, [M.fibX(n), F.base - 0.4], 0.05)!.text).toBe(`F${'₁₂₃₄₅₆₇₈'[n - 1]}`)
    }
    expect(totals).toEqual([1, 1, 2, 3, 5, 8, 13, 21])
    // F₁ and F₂ are single violet bars; from F₃ on a bar is two parts: blue as tall as the previous bar, green as tall as the bar before that
    for (const n of [1, 2]) { const segs = bar(n); expect(segs).toHaveLength(1); expect(segs[0].color).toBe(VIOLET) }
    for (let n = 3; n <= 8; n++) {
      const [lower, upper] = bar(n)
      expect(bar(n)).toHaveLength(2)
      expect(lower.color).toBe(BLUE); expect(upper.color).toBe(GREEN)
      expect(Math.round(lower.hi - lower.lo)).toBe(totals[n - 2])     // as tall as bar n − 1
      expect(Math.round(upper.hi - upper.lo)).toBe(totals[n - 3])     // as tall as bar n − 2
      expect(totals[n - 1]).toBe(totals[n - 2] + totals[n - 3])
    }
    // the captions: 13 = 8 + 5 and 21 = 13 + 8 are the drawn bars 7, 6, 5 and 8, 7, 6
    expect(numsIn(labelsOf(s).find((l) => l.text === '13 = 8 + 5')!.text!)).toEqual([totals[6], totals[5], totals[4]])
    expect(numsIn(labelsOf(s).find((l) => l.text === '21 = 13 + 8')!.text!)).toEqual([totals[7], totals[6], totals[5]])
    expect(texts(s)).toEqual(expect.arrayContaining(['Fₙ = Fₙ₋₁ + Fₙ₋₂', 'lower part = Fₙ₋₁', 'upper part = Fₙ₋₂']))
    // the terms grow by a roughly constant factor (the golden ratio, 1.618)
    expect(totals[7] / totals[6]).toBeCloseTo(1.618, 1)
  })

  it('math.disc.linear-recurrence: the drawn terms obey aₙ = 5aₙ₋₁ − 6aₙ₋₂ and aₙ = 3·3ⁿ − 2·2ⁿ, the characteristic roots are 2 and 3', () => {
    const s = M.buildLinearRecurrenceScene()
    const F = M.LRC
    const dotsB = dots(s, BLUE).map((d) => toGraph(F, d.position!)).sort((a, b) => a[0] - b[0])
    expect(dotsB).toHaveLength(5)
    const values = dotsB.map(([n, y]) => { expect(Math.abs(n - Math.round(n))).toBeLessThan(0.02); return Math.pow(10, y) })
    // the labels beside the dots are the terms; the dots sit at their logarithms
    const termLabels = [0, 1, 2, 3, 4].map((n) => { const d = dots(s, BLUE)[n]; return labelsOf(s).find((l) => l.color === BLUE && /^\d+$/.test(l.text!) && dist(l.position!, [d.position![0] - 0.55, d.position![1] + 0.3]) < 0.1)! })
    termLabels.forEach((l) => expect(l, 'term label').toBeTruthy())
    const terms = termLabels.map((l) => Number(l.text))
    expect(terms).toEqual([1, 5, 19, 65, 211])
    values.forEach((v, i) => expect(Math.abs(v / terms[i] - 1)).toBeLessThan(0.03))
    // the recurrence on the drawn labels and the closed form
    for (let n = 2; n < terms.length; n++) expect(terms[n]).toBe(5 * terms[n - 1] - 6 * terms[n - 2])
    terms.forEach((a, n) => expect(a).toBe(3 * 3 ** n - 2 * 2 ** n))
    // characteristic equation r² − 5r + 6 = 0: coefficients from the caption, roots by the quadratic formula
    const eq = labelsOf(s).find((l) => l.text!.startsWith('r²'))!.text!
    const [c1, c0] = numsIn(eq)
    const disc = Math.sqrt(c1 * c1 - 4 * c0), roots = [(c1 + disc) / 2, (c1 - disc) / 2]
    expect(roots).toEqual([3, 2])
    expect(numsIn(labelsOf(s).find((l) => l.text === 'roots 2 and 3')!.text!)).toEqual([2, 3])
    for (const r of roots) expect(r * r - c1 * r + c0).toBeCloseTo(0, 9)
    // aₙ = A 2ⁿ + B 3ⁿ with a₀ = 1, a₁ = 5 gives A = −2, B = 3, as the caption states
    const B = (terms[1] - 2 * terms[0]) / (3 - 2), A = terms[0] - B
    expect([A, B]).toEqual([-2, 3])
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('aₙ = 3'))!.text!)).toEqual([B, 3, -A, 2].map(Math.abs))
    // the green line has slope log₁₀ 3 on the log scale, and the dots lie close to it
    const g = bonds(s, GREEN, 0.03)[0]
    const slope = ((g.to![1] - g.from![1]) / F.uy) / ((g.to![0] - g.from![0]) / F.ux)
    expect(slope).toBeCloseTo(Math.log10(3), 2)
    // the terms approach the line as the larger root takes over (the gap shrinks and is under 0.1 from n = 3)
    const gaps = dotsB.map(([n, y]) => Math.abs(y - (Math.log10(3) + n * Math.log10(3))))
    gaps.slice(1).forEach((g, i) => expect(g).toBeLessThan(gaps[i]))
    gaps.slice(3).forEach((g) => expect(g).toBeLessThan(0.1))
  })

  it('math.disc.divide-conquer-recurrence: the drawn tree has 1, 2, 4, 8 nodes of sizes 8, 4, 2, 1; every level costs 8 and the total is 4 × 8 = 32', () => {
    const s = M.buildDivideConquerRecurrenceScene()
    const nodes = labelsOf(s).filter((l) => /^\d$/.test(l.text!) && l.position![0] < 3.0)
    const levelsY = [...new Set(nodes.map((l) => Math.round(l.position![1] * 100)))].sort((a, b) => b - a)
    expect(levelsY).toHaveLength(4)
    const byLevel = levelsY.map((y) => nodes.filter((l) => Math.round(l.position![1] * 100) === y))
    expect(byLevel.map((l) => l.length)).toEqual([1, 2, 4, 8])
    expect(byLevel.map((l) => l.map((x) => Number(x.text)))).toEqual([[8], [4, 4], [2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1]])
    // each node of size m has two children of size m/2 joined by drawn links (14 links)
    const links = bonds(s, SLATE, 0.03)
    expect(links).toHaveLength(14)
    for (let k = 0; k < 3; k++) byLevel[k].forEach((parent) => { const kids = byLevel[k + 1].filter((c) => links.some((o) => [dist(o.from!, parent.position!), dist(o.to!, c.position!)].every((d) => d < 0.45) || [dist(o.to!, parent.position!), dist(o.from!, c.position!)].every((d) => d < 0.45))); expect(kids, `children of a ${parent.text}`).toHaveLength(2); kids.forEach((c) => expect(Number(c.text) * 2).toBe(Number(parent.text))) })
    // every level costs (number of nodes) × (size) = 8, read off the drawn nodes and the captions
    const costs = byLevel.map((l) => l.length * Number(l[0].text))
    expect(costs).toEqual([8, 8, 8, 8])
    const caps = labelsOf(s).filter((l) => / × \d = 8$/.test(l.text!))
    expect(caps).toHaveLength(4)
    caps.sort((a, b) => b.position![1] - a.position![1]).forEach((c, k) => { expect(evalLR(c.text!)).toBe(costs[k]); expect(numsIn(c.text!)).toEqual([byLevel[k].length, Number(byLevel[k][0].text), 8]) })
    // 4 = log₂ 8 + 1 levels, total 4 × 8 = 32
    expect(byLevel.length).toBe(Math.log2(8) + 1)
    expect(evalLR('4 × 8 = 32')).toBe(sum(costs)); expect(texts(s)).toEqual(expect.arrayContaining(['4 × 8 = 32', 'T(n) = 2T(n/2) + n']))
  })

  it('math.disc.propositional-logic: the drawn table is the truth table of p, q, ¬(p ∧ q) and ¬p ∨ ¬q, and the last two columns are equal', () => {
    const s = M.buildPropositionalLogicScene()
    const read = (c: number) => M.TTB.rows.map((y) => { const l = labelAt(s, [M.TTB.cols[c], y])!; expect(l, `cell ${c},${y}`).toBeTruthy(); expect(['T', 'F']).toContain(l.text); expect(l.color).toBe(l.text === 'T' ? GREEN : RED); return l.text === 'T' })
    const [p, q, nand, demorgan] = [0, 1, 2, 3].map(read)
    // all four combinations of p and q appear once
    expect(new Set(p.map((v, i) => `${v}${q[i]}`)).size).toBe(4)
    // the third and fourth columns are recomputed from p and q
    nand.forEach((v, i) => expect(v).toBe(!(p[i] && q[i])))
    demorgan.forEach((v, i) => expect(v).toBe(!p[i] || !q[i]))
    // equal in every row: De Morgan
    expect(nand).toEqual(demorgan)
    expect(nand).toEqual([false, true, true, true])
    for (const t of ['p', 'q', '¬(p ∧ q)', '¬p ∨ ¬q', 'equal in every row']) expect(texts(s)).toContain(t)
    expect(labelsOf(s).filter((l) => l.text === 'T' || l.text === 'F')).toHaveLength(16)
  })

  it('math.disc.algorithm-complexity: the curves are n, n log₂ n, n², 2ⁿ, 2ⁿ crosses n² at n = 4, and the dots at n = 6 read 6, 15.5, 36, 64', () => {
    const s = M.buildAlgorithmComplexityScene()
    const F = M.CPX
    const curves = { n: pathG(paths(s, SLATE)[0], F), nlogn: pathG(paths(s, BLUE)[0], F), n2: pathG(paths(s, GREEN)[0], F), exp: pathG(paths(s, RED)[0], F) }
    const f: Record<keyof typeof curves, (n: number) => number> = { n: (n) => n, nlogn: (n) => n * Math.log2(n), n2: (n) => n * n, exp: (n) => 2 ** n }
    for (const k of Object.keys(curves) as Array<keyof typeof curves>) curves[k].forEach(([n, y]) => expect(Math.abs(y - f[k](n)), `${k} at n = ${n.toFixed(2)}`).toBeLessThan(0.35))
    // 2ⁿ is below n² between n = 2 and n = 4 and above it after (equal at 2: 4 = 4 and at 4: 16 = 16)
    const e = curves.exp, q = curves.n2
    e.forEach(([n, y], i) => { if (n > 2.3 && n < 3.7) expect(y).toBeLessThan(q[i][1] - 0.5); if (n > 4.3) expect(y).toBeGreaterThan(q[i][1] + 0.5) })
    expect([2 ** 2, 2 ** 4]).toEqual([2 * 2, 4 * 4])
    // the four dots at n = 6 and their order
    const dotsAt6 = dots(s, SLATE).concat(dots(s, BLUE), dots(s, GREEN), dots(s, RED)).map((d) => toGraph(F, d.position!)).filter(([n]) => Math.abs(n - 6) < 0.03).sort((a, b) => a[1] - b[1])
    expect(dotsAt6).toHaveLength(4)
    const expected = [6, 6 * Math.log2(6), 36, 64]
    dotsAt6.forEach(([, y], i) => expect(Math.abs(y - expected[i])).toBeLessThan(0.35))
    // the caption lists n and the four values: 6 | 6, 15.5, 36, 64
    expect(numsIn(labelsOf(s).find((l) => l.text!.startsWith('at n = 6'))!.text!)).toEqual([6, 6, Math.round(6 * Math.log2(6) * 10) / 10, 36, 64])
    expect(dotsAt6.map(([n]) => Math.round(n))).toEqual([6, 6, 6, 6])
    // the curves are in growth order everywhere past n = 4 (so the classes separate)
    for (let i = 0; i < 4; i++) { const n = 5 + 0.5 * i; expect(f.n(n) < f.nlogn(n) && f.nlogn(n) < f.n2(n) && f.n2(n) < f.exp(n)).toBe(true) }
    for (const t of ['n log n', 'n²', '2ⁿ']) expect(texts(s)).toContain(t)
  })

  it('math.disc.complexity-classes: P and NP-complete are disjoint regions inside NP, and each example sits in its own class', () => {
    const s = M.buildComplexityClassesScene()
    const ell = (o: Obj) => { const xs = o.points!.map((p) => p[0]), ys = o.points!.map((p) => p[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }
    const NP = ell(paths(s, BLUE)[0]), Pc = ell(paths(s, GREEN)[0]), NPC = ell(paths(s, RED)[0])
    const ptsP = paths(s, GREEN)[0].points!, ptsC = paths(s, RED)[0].points!
    // P and NPC lie inside NP; P and NPC do not overlap (no point of one inside the other, a clear gap between them)
    ptsP.forEach((p) => expect(inEllipse(NP, p, 1.01)).toBe(true))
    ptsC.forEach((p) => expect(inEllipse(NP, p, 1.01)).toBe(true))
    ptsP.forEach((p) => expect(inEllipse(NPC, p, 0.99)).toBe(false))
    ptsC.forEach((p) => expect(inEllipse(Pc, p, 0.99)).toBe(false))
    const gap = Math.min(...ptsP.flatMap((p) => ptsC.map((c) => dist(p, c))))
    expect(gap).toBeGreaterThan(0.3)
    // the example problems sit in their own region
    const at = (t: string) => labelsOf(s).find((l) => l.text === t)!.position!
    expect(inEllipse(Pc, at('sorting'), 1)).toBe(true); expect(inEllipse(Pc, at('P'), 1)).toBe(true)
    for (const t of ['SAT', '3-colouring', 'TSP']) { expect(inEllipse(NPC, at(t), 1), t).toBe(true); expect(inEllipse(Pc, at(t), 1)).toBe(false) }
    // the NP-complete caption sits just above its region, inside NP and not in P
    const cap = at('NP-complete')
    expect(inEllipse(NP, cap, 1)).toBe(true); expect(inEllipse(Pc, cap, 1)).toBe(false)
    expect(Math.abs(cap[0] - NPC.cx)).toBeLessThan(NPC.rx); expect(cap[1] - (NPC.cy + NPC.ry)).toBeLessThan(1.0); expect(cap[1]).toBeGreaterThan(NPC.cy + NPC.ry)
    expect(inEllipse(NP, at('NP'), 1)).toBe(true); expect(inEllipse(Pc, at('NP'), 1)).toBe(false); expect(inEllipse(NPC, at('NP'), 1)).toBe(false)
    expect(inEllipse(NP, at('P = NP ?'), 1)).toBe(true); expect(inEllipse(Pc, at('P = NP ?'), 1)).toBe(false); expect(inEllipse(NPC, at('P = NP ?'), 1)).toBe(false)
    // sizes: NP is the biggest region
    expect(NP.rx).toBeGreaterThan(Pc.rx); expect(NP.ry).toBeGreaterThan(NPC.ry)
  })
})
