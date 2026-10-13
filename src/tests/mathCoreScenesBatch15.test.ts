/**
 * Mathematics visual campaign, batch 15 (2026-10-12): sets (membership, subset, proper subset, equality, union,
 * intersection, difference, complement, Venn diagram, Hasse diagram), irrational numbers and complex numbers. Each
 * test reads the sets, circles, edges and arrows back from the DRAWN coordinates (a numeral belongs to a circle when
 * its dot lies inside it) and compares them with an independent calculation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB15'

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
  ['math.found.set', M.buildSetScene, 'math-set'],
  ['math.found.subset', M.buildSubsetScene, 'math-subset'],
  ['math.found.proper-subset', M.buildProperSubsetScene, 'math-proper-subset'],
  ['math.found.set-equality', M.buildSetEqualityScene, 'math-set-equality'],
  ['math.found.union', M.buildUnionScene, 'math-union'],
  ['math.found.intersection', M.buildIntersectionScene, 'math-intersection'],
  ['math.found.set-difference', M.buildSetDifferenceScene, 'math-set-difference'],
  ['math.found.complement', M.buildComplementScene, 'math-complement'],
  ['math.found.venn-diagram', M.buildVennDiagramScene, 'math-venn-diagram'],
  ['math.found.hasse-diagram', M.buildHasseDiagramScene, 'math-hasse-diagram'],
  ['math.found.irrational-numbers', M.buildIrrationalNumbersScene, 'math-irrational-numbers'],
  ['math.found.complex-numbers', M.buildComplexNumbersScene, 'math-complex-numbers'],
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

// ── readers: sets, circles and marks recovered from the drawn objects ───────────────────────────────
type Circle = { c: [number, number]; r: number }
type El = { n: number; p: number[] }
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
/** Centre and radius of a closed sampled circle (the last point repeats the first). */
const fitCircle = (p: Obj): Circle => {
  const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1]))
  return { c: [cx, cy], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) }
}
const circlesOf = (s: SceneSpec, color: string) => paths(s, color).filter((p) => p.points!.length >= 90).map(fitCircle)
const within = (p: number[], k: Circle) => Math.hypot(p[0] - k.c[0], p[1] - k.c[1]) < k.r
const numerals = (s: SceneSpec) => labelsOf(s).filter((o) => /^\d+$/.test(o.text ?? ''))
const numeralNear = (s: SceneSpec, p: number[]) => Number(numerals(s).reduce((best, o) => (dist(o.position!, p) < dist(best.position!, p) ? o : best)).text)
/** Every element of the figure: its small dot and the numeral written beside it. */
const elementsOf = (s: SceneSpec): El[] => dots(s).filter((d) => d.radius === 0.08).map((d) => ({ n: numeralNear(s, d.position!), p: d.position! }))
const setIn = (els: El[], k: Circle) => els.filter((e) => within(e.p, k)).map((e) => e.n).sort((a, b) => a - b)
const marksOf = (s: SceneSpec, color: string) => dots(s, color).filter((d) => d.radius === 0.2)
const markedNumerals = (s: SceneSpec, els: El[], color: string) =>
  marksOf(s, color).map((m) => els.find((e) => near(e.p[0], m.position![0], 1e-6) && near(e.p[1], m.position![1], 1e-6))!.n).sort((a, b) => a - b)
const subsetOf = (a: readonly number[], b: readonly number[]) => a.every((x) => b.includes(x))
const sameSet = (a: readonly number[], b: readonly number[]) => subsetOf(a, b) && subsetOf(b, a)
const inter = (a: readonly number[], b: readonly number[]) => a.filter((x) => b.includes(x))
const uni = (a: readonly number[], b: readonly number[]) => [...new Set([...a, ...b])].sort((x, y) => x - y)
const minus = (a: readonly number[], b: readonly number[]) => a.filter((x) => !b.includes(x))
const nested = (inner: Circle, outer: Circle) => dist(inner.c, outer.c) + inner.r < outer.r
/** Ray-casting point-in-polygon. */
const inPoly = (p: number[], poly: number[][]) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
const shoelace = (poly: number[][]) => Math.abs(sum(poly.map((p, i) => p[0] * poly[(i + 1) % poly.length][1] - poly[(i + 1) % poly.length][0] * p[1]))) / 2
/** The two-circle Venn figures: blue = A, red = B; each element's membership is read off its dot. */
const venn = (s: SceneSpec) => {
  const els = elementsOf(s), [A] = circlesOf(s, BLUE), [B] = circlesOf(s, RED)
  return { els, A, B, setA: setIn(els, A), setB: setIn(els, B), all: els.map((e) => e.n).sort((a, b) => a - b) }
}

describe('element dots and numerals stay unambiguous', () => {
  it.each(BATCH)('%s: every element dot has its own numeral clearly nearest, and no two elements crowd each other', (_id, build) => {
    const s = build(), els = dots(s).filter((d) => d.radius === 0.08), nums = numerals(s)
    for (const d of els) {
      const ds = nums.map((o) => dist(o.position!, d.position!)).sort((a, b) => a - b)
      expect(ds[0], 'own numeral beside the dot').toBeLessThan(0.6)
      expect(ds[1], 'next numeral is clearly further').toBeGreaterThan(0.6)
    }
    for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) expect(dist(els[i].position!, els[j].position!)).toBeGreaterThan(0.6)
  })
})

describe('the mathematics each figure draws', () => {
  it('Set: the circle holds exactly the five members 2, 4, 6, 8, 10 (even, at most 10); 3, 7, 9 are outside; 4 ∈ A is marked green, 7 ∉ A red', () => {
    const s = M.buildSetScene(), els = elementsOf(s), [A] = circlesOf(s, BLUE)
    const inside = setIn(els, A), outside = els.filter((e) => !within(e.p, A)).map((e) => e.n).sort((a, b) => a - b)
    expect(inside).toEqual([2, 4, 6, 8, 10]); expect(outside).toEqual([3, 7, 9])
    expect(inside.every((n) => n % 2 === 0 && n <= 10)).toBe(true)                                                                                      // the rule picks the members ...
    expect(outside.every((n) => n % 2 === 1 || n > 10)).toBe(true)                                                                                      // ... and none of the others
    expect(new Set(inside).size).toBe(inside.length)                                                                                                    // members are distinct
    expect(markedNumerals(s, els, GREEN)).toEqual([4]); expect(markedNumerals(s, els, RED)).toEqual([7])
    expect(inside).toContain(4); expect(outside).toContain(7)                                                                                           // 4 ∈ A, 7 ∉ A
    expect(texts(s)).toEqual(expect.arrayContaining(['A = {2, 4, 6, 8, 10}', '4 ∈ A', '7 ∉ A', `|A| = ${inside.length}`, 'rule: even, at most 10']))
  })

  it('Subset: A = {2, 4} lies inside B = {1…6} so every element of A is in B; C = {2, 7} sticks out of B (7 ∈ C, 7 ∉ B)', () => {
    const s = M.buildSubsetScene(), els = elementsOf(s)
    const reds = circlesOf(s, RED).sort((p, q) => p.c[0] - q.c[0]), [A] = circlesOf(s, BLUE), [C] = circlesOf(s, VIOLET)
    const [Bl, Br] = reds
    expect(reds).toHaveLength(2); expect(Bl.c[0]).toBeLessThan(0); expect(Br.c[0]).toBeGreaterThan(0)
    const left = els.filter((e) => e.p[0] < -0.4), right = els.filter((e) => e.p[0] >= -0.4)
    const setA = setIn(left, A), setBl = setIn(left, Bl), setC = setIn(right, C), setBr = setIn(right, Br)
    expect(setA).toEqual([2, 4]); expect(setBl).toEqual([1, 2, 3, 4, 5, 6]); expect(setC).toEqual([2, 7]); expect(setBr).toEqual([1, 2, 3, 4, 5, 6])
    expect(subsetOf(setA, setBl)).toBe(true); expect(nested(A, Bl)).toBe(true)                                                                          // A ⊆ B: the small circle is inside the big one
    expect(subsetOf(setC, setBr)).toBe(false); expect(minus(setC, setBr)).toEqual([7])                                                                  // C ⊄ B because of 7
    expect(nested(C, Br)).toBe(false)
    expect(sameSet(setBl, setBr)).toBe(true)                                                                                                            // both panels show the same B
    expect(markedNumerals(s, left, GREEN)).toEqual([2, 4]); expect(markedNumerals(s, right, RED)).toEqual([7])
    expect(texts(s)).toEqual(expect.arrayContaining(['A = {2, 4}', 'B = {1, …, 6}', 'A ⊆ B', 'C = {2, 7}', 'C ⊄ B', '7 ∈ C, 7 ∉ B']))
  })

  it('Proper subset: A = {1, 2} ⊂ B = {1, 2, 3} ⊂ C = {1, 2, 3, 4}: nested, each strictly smaller (sizes 2 < 3 < 4), the extra elements 3 and 4 are marked', () => {
    const s = M.buildProperSubsetScene(), els = elementsOf(s)
    const [A] = circlesOf(s, BLUE), [B] = circlesOf(s, RED), [C] = circlesOf(s, VIOLET)
    const sa = setIn(els, A), sb = setIn(els, B), sc = setIn(els, C)
    expect(sa).toEqual([1, 2]); expect(sb).toEqual([1, 2, 3]); expect(sc).toEqual([1, 2, 3, 4])
    expect(nested(A, B)).toBe(true); expect(nested(B, C)).toBe(true)
    expect(subsetOf(sa, sb) && sa.length < sb.length).toBe(true); expect(subsetOf(sb, sc) && sb.length < sc.length).toBe(true)                            // proper: ⊆ and ≠
    expect(subsetOf(sc, sb)).toBe(false); expect(subsetOf(sb, sa)).toBe(false)                                                                          // the converse fails
    expect(subsetOf(sa, sc)).toBe(true)                                                                                                                  // A ⊂ C by transitivity
    expect(markedNumerals(s, els, RED)).toEqual([...minus(sb, sa), ...minus(sc, sb)].sort((a, b) => a - b))                                              // 3 ∈ B∖A and 4 ∈ C∖B
    expect([sa.length, sb.length, sc.length]).toEqual([2, 3, 4])
    expect(texts(s)).toEqual(expect.arrayContaining(['A = {1, 2}', 'B = {1, 2, 3}', 'C = {1, 2, 3, 4}', '3 ∈ B, 3 ∉ A', '4 ∈ C, 4 ∉ B', 'A ⊂ B ⊂ C', 'sizes 2 < 3 < 4']))
  })

  it('Set equality: A = {1, 2, 3} and B = {3, 1, 2} are equal (shuffled order, all three pair up); A and C = {1, 2, 4} are not (3 and 4 have no partner)', () => {
    const s = M.buildSetEqualityScene(), els = elementsOf(s)
    const blues = circlesOf(s, BLUE).sort((p, q) => q.c[1] - p.c[1]), [A1, A2] = blues, [B] = circlesOf(s, RED), [C] = circlesOf(s, VIOLET)
    const a1 = setIn(els, A1), b = setIn(els, B), a2 = setIn(els, A2), c = setIn(els, C)
    expect(a1).toEqual([1, 2, 3]); expect(b).toEqual([1, 2, 3]); expect(sameSet(a1, b)).toBe(true)
    expect(a2).toEqual([1, 2, 3]); expect(c).toEqual([1, 2, 4]); expect(sameSet(a2, c)).toBe(false)
    const order = (k: Circle) => els.filter((e) => within(e.p, k)).sort((p, q) => q.p[1] - p.p[1]).map((e) => e.n)
    expect(order(A1)).toEqual([1, 2, 3]); expect(order(B)).toEqual([3, 1, 2])                                                                           // same set, different written order
    const conn = bonds(s, GREEN, 0.035)
    const endsAt = (pt: number[]) => els.find((e) => dist(e.p, pt) < 0.01)!
    const pairs = conn.map((o) => [endsAt(o.from!), endsAt(o.to!)] as const)
    for (const [x, y] of pairs) expect(x.n).toBe(y.n)                                                                                                   // each connector joins equal numerals
    expect(pairs).toHaveLength(5)
    const top = pairs.filter(([x]) => x.p[1] > 0), bottom = pairs.filter(([x]) => x.p[1] < 0)
    expect(top.map(([x]) => x.n).sort()).toEqual([1, 2, 3]); expect(bottom.map(([x]) => x.n).sort()).toEqual([1, 2])
    const slope3 = top.find(([x]) => x.n === 3)!, slope1 = top.find(([x]) => x.n === 1)!
    expect(slope3[1].p[1] - slope3[0].p[1]).toBeGreaterThan(0); expect(slope1[1].p[1] - slope1[0].p[1]).toBeLessThan(0)                               // the connectors cross: order is irrelevant
    expect(markedNumerals(s, els, RED)).toEqual([...minus(a2, c), ...minus(c, a2)].sort((p, q) => p - q))                                                              // the unmatched 3 and 4
    expect(texts(s)).toEqual(expect.arrayContaining(['A = B: same elements, any order', 'A ≠ C: 3 ∉ C, 4 ∉ A']))
  })

  it('Union: A ∪ B = everything in A or B = {1…7}; |A ∪ B| = 5 + 4 − 2 = 7 (the shared 4, 5 counted once); 8, 9, 10 are in neither', () => {
    const s = M.buildUnionScene(), v = venn(s)
    expect(v.setA).toEqual([1, 2, 3, 4, 5]); expect(v.setB).toEqual([4, 5, 6, 7]); expect(v.all).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const u = uni(v.setA, v.setB)
    expect(u).toEqual([1, 2, 3, 4, 5, 6, 7]); expect(minus(v.all, u)).toEqual([8, 9, 10])
    expect(markedNumerals(s, v.els, GREEN)).toEqual(u)                                                                                                    // the green marks are the union
    expect(u.length).toBe(v.setA.length + v.setB.length - inter(v.setA, v.setB).length)                                                                  // inclusion–exclusion
    expect(texts(s)).toEqual(expect.arrayContaining([`A = {${v.setA.join(', ')}}`, `B = {${v.setB.join(', ')}}`, `count: ${v.setA.length} + ${v.setB.length} − ${inter(v.setA, v.setB).length} = ${u.length}`]))
  })

  it('Intersection: A ∩ B = {4, 5}, the lens outlined in green holds exactly those elements, its size is 5 + 4 − 7 = 2', () => {
    const s = M.buildIntersectionScene(), v = venn(s)
    const x = inter(v.setA, v.setB)
    expect(x).toEqual([4, 5]); expect(markedNumerals(s, v.els, GREEN)).toEqual(x)
    const outline = paths(s, GREEN).find((p) => p.points!.length < 90)!.points!
    for (const q of outline) { expect(within(q, v.A)).toBe(true); expect(within(q, v.B)).toBe(true) }                                                    // the outline lies inside both circles
    const lens = v.els.filter((e) => inPoly(e.p, outline)).map((e) => e.n).sort((p, q) => p - q)
    expect(lens).toEqual(x)                                                                                                                               // elements inside the outline = A ∩ B
    const exact = M.lensArea(v.A.r - M.LENS_INSET, dist(v.A.c, v.B.c))
    expect(Math.abs(shoelace(outline) - exact) / exact).toBeLessThan(0.04)                                                                              // it really is the lens of the two circles
    expect(v.setA.length + v.setB.length - uni(v.setA, v.setB).length).toBe(x.length)
    expect(texts(s)).toEqual(expect.arrayContaining([`count: ${v.setA.length} + ${v.setB.length} − ${uni(v.setA, v.setB).length} = ${x.length}`, 'intersection: in A and in B']))
  })

  it('Set difference: A ∖ B = {1, 2, 3} (4 and 5 removed), B ∖ A = {6, 7}, and the two differ; |A ∖ B| = 5 − 2 = 3', () => {
    const s = M.buildSetDifferenceScene(), v = venn(s)
    const ab = minus(v.setA, v.setB), ba = minus(v.setB, v.setA), shared = inter(v.setA, v.setB)
    expect(ab).toEqual([1, 2, 3]); expect(ba).toEqual([6, 7]); expect(shared).toEqual([4, 5])
    expect(markedNumerals(s, v.els, GREEN)).toEqual(ab); expect(markedNumerals(s, v.els, RED)).toEqual(shared); expect(markedNumerals(s, v.els, VIOLET)).toEqual(ba)
    expect(sameSet(ab, ba)).toBe(false)                                                                                                                   // A ∖ B ≠ B ∖ A
    expect(ab.length).toBe(v.setA.length - shared.length)
    expect(inter(ab, v.setB)).toEqual([])                                                                                                                 // nothing of A ∖ B is in B
    expect(texts(s)).toEqual(expect.arrayContaining(['A ∖ B: {1, 2, 3}', 'B ∖ A: {6, 7}', 'A ∖ B ≠ B ∖ A']))
  })

  it('Complement: in U = {1…10} the elements outside A = {1…5} are A′ = {6…10}; A and A′ share nothing and make U (5 + 5 = 10)', () => {
    const s = M.buildComplementScene(), els = elementsOf(s), [A] = circlesOf(s, BLUE)
    const box = bonds(s, SLATE, 0.02), xs = box.flatMap((o) => [o.from![0], o.to![0]]), ys = box.flatMap((o) => [o.from![1], o.to![1]])
    const inBox = (p: number[]) => p[0] > Math.min(...xs) && p[0] < Math.max(...xs) && p[1] > Math.min(...ys) && p[1] < Math.max(...ys)
    expect(box).toHaveLength(4); expect(els.every((e) => inBox(e.p))).toBe(true)                                                                        // every element is in the universe
    const U = els.map((e) => e.n).sort((a, b) => a - b), a = setIn(els, A), comp = minus(U, a)
    expect(U).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); expect(a).toEqual([1, 2, 3, 4, 5]); expect(comp).toEqual([6, 7, 8, 9, 10])
    expect(markedNumerals(s, els, GREEN)).toEqual(comp)
    expect(inter(a, comp)).toEqual([]); expect(uni(a, comp)).toEqual(U); expect(a.length + comp.length).toBe(U.length)
    expect(texts(s)).toEqual(expect.arrayContaining([`A′ = {${comp.join(', ')}}`, `count: ${a.length} + ${comp.length} = ${U.length}`, 'A ∪ A′: all of U']))
  })

  it('Venn diagram: the seven region counts (5, 4, 3, 2, 1, 2, 3) read from their positions give |A| = 11, |B| = 11, |C| = 9, union 20, |U| = 24, and inclusion–exclusion agrees', () => {
    const s = M.buildVennDiagramScene()
    const [A] = circlesOf(s, BLUE), [B] = circlesOf(s, RED), [C] = circlesOf(s, VIOLET)
    const sig = (p: number[]) => (within(p, A) ? 'A' : '') + (within(p, B) ? 'B' : '') + (within(p, C) ? 'C' : '')
    const regions = numerals(s).map((o) => ({ sig: sig(o.position!), n: Number(o.text) }))
    expect(regions).toHaveLength(8)
    expect(new Set(regions.map((r) => r.sig)).size).toBe(8)                                                                                              // one count per region, outside included
    const by = Object.fromEntries(regions.map((r) => [r.sig, r.n]))
    expect(by).toEqual({ A: 5, B: 4, C: 3, AB: 2, AC: 1, BC: 2, ABC: 3, '': 4 })
    const total = (letters: string) => sum(regions.filter((r) => r.sig !== '' && [...letters].every((l) => r.sig.includes(l))).map((r) => r.n))
    expect(total('A')).toBe(11); expect(total('B')).toBe(11); expect(total('C')).toBe(9)
    const union = sum(regions.filter((r) => r.sig !== '').map((r) => r.n))
    expect(union).toBe(20); expect(union + by['']).toBe(24)
    expect(total('A') + total('B') + total('C') - total('AB') - total('AC') - total('BC') + total('ABC')).toBe(union)                                   // |A∪B∪C| by inclusion–exclusion
    expect(texts(s)).toEqual(expect.arrayContaining([`|A| = ${total('A')}`, `|B| = ${total('B')}`, `|C| = ${total('C')}`, `|A ∪ B ∪ C| = ${union}`, `|U| = ${union + by['']}`]))
  })

  it('Hasse diagram: the drawn edges are exactly the covering relations of divisibility on the divisors of 12, all point upward, and climbing reaches exactly the multiples', () => {
    const s = M.buildHasseDiagramScene()
    const nodes = dots(s, SLATE).filter((d) => d.radius === 0.17).map((d) => ({ n: numeralNear(s, d.position!), p: d.position! }))
    const nums = nodes.map((x) => x.n).sort((a, b) => a - b)
    const divisors = Array.from({ length: 12 }, (_, i) => i + 1).filter((k) => 12 % k === 0)
    expect(nums).toEqual(divisors)                                                                                                                         // 1, 2, 3, 4, 6, 12
    const at = (pt: number[]) => nodes.find((x) => dist(x.p, pt) < 0.02)!
    const drawn = bonds(s, SLATE, 0.04).map((o) => { const a = at(o.from!), b = at(o.to!); return [a, b].sort((p, q) => p.p[1] - q.p[1]) })
    const key = (a: number, b: number) => `${a}|${b}`
    const covers = divisors.flatMap((a) => divisors.filter((b) => b > a && b % a === 0 && !divisors.some((c) => c > a && c < b && c % a === 0 && b % c === 0)).map((b) => key(a, b)))
    expect(drawn.map(([lo, hi]) => key(lo.n, hi.n)).sort()).toEqual([...covers].sort())                                                                    // exactly the covering relations
    for (const [lo, hi] of drawn) { expect(hi.p[1]).toBeGreaterThan(lo.p[1]); expect(hi.n % lo.n).toBe(0) }                                                // upward, and the lower divides the upper
    const reach = (from: number): Set<number> => { const seen = new Set<number>(), stack = [from]; while (stack.length) { const x = stack.pop()!; for (const [lo, hi] of drawn) if (lo.n === x && !seen.has(hi.n)) { seen.add(hi.n); stack.push(hi.n) } } return seen }
    for (const a of divisors) expect([...reach(a)].sort((p, q) => p - q)).toEqual(divisors.filter((b) => b > a && b % a === 0))                            // a divides b ⇔ b is reachable from a
    const chain = bonds(s, GREEN, 0.07).map((o) => { const a = at(o.from!), b = at(o.to!); return [a.n, b.n].sort((p, q) => p - q).join('|') }).sort()
    expect(chain).toEqual(['1|2', '2|4', '4|12'].sort()); expect(chain.every((k) => covers.includes(k))).toBe(true)
    const ringAt = (color: string) => paths(s, color).filter((p) => p.points!.length === 33).map((p) => at([mean(p.points!.slice(0, -1).map((q) => q[0])), mean(p.points!.slice(0, -1).map((q) => q[1]))]).n).sort((p, q) => p - q)
    expect(ringAt(VIOLET)).toEqual([4, 6]); expect(12 % 4 === 0 && 12 % 6 === 0 && 6 % 4 !== 0 && 4 % 6 !== 0).toBe(true)                                // incomparable pair
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    expect(ringAt(GREEN)).toEqual([gcd(4, 6), (4 * 6) / gcd(4, 6)].sort((p, q) => p - q))                                                                // meet 2 = gcd, join 12 = lcm
    expect(texts(s)).toEqual(expect.arrayContaining(['chain: 1 | 2 | 4 | 12', 'incomparable', 'meet 2: gcd', 'join 12: lcm']))
  })

  it('Irrational numbers: the unit-square diagonal is √2 and the compass arc lands on √2 ≈ 1.4142; 7/5, 41/29, 17/12 square to 1.96, 1.9988, 2.0069 — none to 2; no fraction p/q squares to 2', () => {
    const { u, x0, y0, ruler, fracs } = M.IRR
    const s = M.buildIrrationalNumbersScene()
    const back = (p: number[]) => [(p[0] - x0) / u, (p[1] - y0) / u]
    const sides = bonds(s, INK, 0.04); expect(sides).toHaveLength(4); for (const o of sides) expect(len(o) / u).toBeCloseTo(1, 2)                          // a unit square
    const diag = bonds(s, GREEN, 0.06)[0]
    expect(len(diag) / u).toBeCloseTo(Math.SQRT2, 2); expect(back(diag.from!)).toEqual(approx([0, 0], 2)); expect(back(diag.to!)).toEqual(approx([1, 1], 2))
    expect(1 * 1 + 1 * 1).toBe(2)                                                                                                                         // Pythagoras: diagonal² = 2
    const arc = paths(s, VIOLET)[0].points!
    for (const q of arc) expect(Math.hypot(q[0] - x0, q[1] - y0) / u).toBeCloseTo(Math.SQRT2, 2)                                                        // centred on 0, radius √2
    const landing = dots(s, GREEN).find((d) => d.radius === 0.13)!
    expect(back(landing.position!)[0]).toBeCloseTo(Math.SQRT2, 2); expect(back(landing.position!)[1]).toBeCloseTo(0, 2); expect(dist(arc[arc.length - 1], landing.position!)).toBeLessThan(0.02)   // the arc lands on the line at √2
    const value = (p: number[]) => ruler.lo + ((p[0] - ruler.xa) / (ruler.xb - ruler.xa)) * (ruler.hi - ruler.lo)
    const reds = dots(s, RED).filter((d) => d.radius === 0.1).map((d) => value(d.position!)).sort((a, b) => a - b)
    const want = fracs.map(([p, q]) => p / q).sort((a, b) => a - b)
    reds.forEach((v, i) => expect(Math.abs(v - want[i])).toBeLessThan(3e-5))
    const green = dots(s, GREEN).find((d) => d.radius === 0.1)!; expect(Math.abs(value(green.position!) - Math.SQRT2)).toBeLessThan(3e-5)             // √2 on the magnified ruler
    const squares = fracs.map(([p, q]) => (p * p) / (q * q))
    for (const sq of squares) expect(Math.abs(sq - 2)).toBeGreaterThan(1e-4)                                                                              // none is 2
    expect(fracs.map(([p, q]) => p / q < Math.SQRT2)).toEqual([true, true, false])                                                                        // below, below, above
    expect(texts(s)).toEqual(expect.arrayContaining(['7/5 → 1.96', '41/29 → 1.9988', '17/12 → 2.0069', '1.400', '1.420', '√2 = 1.41421356…', 'no fraction p/q squares to 2']))
    expect(squares[0].toFixed(2)).toBe('1.96'); expect(squares[1].toFixed(4)).toBe('1.9988'); expect(squares[2].toFixed(4)).toBe('2.0069')
    for (let q = 1; q <= 2000; q++) { const r = Math.sqrt(2 * q * q); expect(Math.abs(r - Math.round(r))).toBeGreaterThan(1e-9) }                         // p² = 2q² has no integer solution
    expect(Math.SQRT2.toString().startsWith('1.41421356')).toBe(true)
  })

  it('Complex numbers: z = 3 + 2i, z* = 3 − 2i (mirror), iz = −2 + 3i (turned 90°), all of modulus √13 ≈ 3.61 (on one circle); i² = −1', () => {
    const { u } = M.CPLX
    const s = M.buildComplexNumbersScene()
    const tip = (o: Obj) => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
    const z = tip(arrows(s, RED)[0]), zc = tip(arrows(s, BLUE)[0]), iz = tip(arrows(s, GREEN)[0])
    expect(z).toEqual(approx([3, 2], 2)); expect(zc).toEqual(approx([3, -2], 2)); expect(iz).toEqual(approx([-2, 3], 2))
    expect(zc[0]).toBeCloseTo(z[0], 2); expect(zc[1]).toBeCloseTo(-z[1], 2)                                                                              // the conjugate mirrors z in the real axis
    const m = Math.hypot(3, 2)
    for (const w of [z, zc, iz]) expect(Math.hypot(w[0], w[1])).toBeCloseTo(m, 1)                                                                          // equal moduli
    expect(Math.round(m * 100) / 100).toBe(3.61)
    expect(dotp(z, iz)).toBeCloseTo(0, 1); expect(crossz(z, iz)).toBeCloseTo(13, 0)                                                                      // perpendicular, anticlockwise: area |z|² = 13
    const c = (3 + 2 * 0) * 0, ix = (re: number, im: number) => [-im, re]                                                                                // i(a + bi) = −b + ai
    expect(ix(3, 2)).toEqual([-2, 3]); expect(c).toBe(0); expect(ix(...(ix(3, 2) as [number, number]))).toEqual([-3, -2]); expect(-1 * 1).toBe(-1)       // multiplying by i twice negates: i² = −1
    const circle = paths(s, VIOLET).find((p) => p.points!.length >= 90)!.points!
    for (const q of circle) expect(Math.hypot(q[0], q[1]) / u).toBeCloseTo(m, 1)                                                                          // z, z* and iz all lie on it
    const arc = paths(s, VIOLET).find((p) => p.points!.length < 90)!.points!
    const ang = (q: number[]) => (Math.atan2(q[1], q[0]) * 180) / Math.PI
    expect(ang(arc[0])).toBeCloseTo((Math.atan2(2, 3) * 180) / Math.PI, 0); expect(ang(arc[arc.length - 1]) - ang(arc[0])).toBeCloseTo(90, 0)           // the quarter turn from z to iz
    const guides = bonds(s, VIOLET, 0.025); expect(guides).toHaveLength(2)
    expect(guides.map((g) => [(g.from![0] / u).toFixed(1), (g.from![1] / u).toFixed(1), (g.to![0] / u).toFixed(1), (g.to![1] / u).toFixed(1)].join(',')).sort()).toEqual(['0.0,2.0,3.0,2.0', '3.0,0.0,3.0,2.0'])   // real part 3, imaginary part 2
    expect(texts(s)).toEqual(expect.arrayContaining(['z = 3 + 2i', 'z* = 3 − 2i', 'iz = −2 + 3i', '|z| = 3.61', '90°']))
  })
})
