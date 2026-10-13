/**
 * Mathematics visual campaign, batch 25 (2026-10-12), the first helpful-tier batch: foundations of sets and relations. Membership,
 * the empty set, finite sets, set operations, the power set, the Cartesian product, ordered pairs, relations and their properties
 * (reflexive, symmetric, transitive), equivalence classes and partitions. Every fact is re-derived from the DRAWN dots, rings,
 * arrows and boxes: membership by point-in-region, bijections and collisions from the arrows, the closure of a relation under its
 * property, the three conditions for a partition.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB25'

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
  ['math.found.set-membership', M.buildSetMembershipScene, 'math-set-membership'],
  ['math.found.empty-set', M.buildEmptySetScene, 'math-empty-set'],
  ['math.found.finite-set', M.buildFiniteSetScene, 'math-finite-set'],
  ['math.found.set-operations', M.buildSetOperationsScene, 'math-set-operations'],
  ['math.found.power-set', M.buildPowerSetScene, 'math-power-set'],
  ['math.found.cartesian-product', M.buildCartesianProductScene, 'math-cartesian-product'],
  ['math.found.ordered-pair', M.buildOrderedPairScene, 'math-ordered-pair'],
  ['math.found.relation', M.buildRelationScene, 'math-relation'],
  ['math.found.reflexive-relation', M.buildReflexiveRelationScene, 'math-reflexive-relation'],
  ['math.found.symmetric-relation', M.buildSymmetricRelationScene, 'math-symmetric-relation'],
  ['math.found.transitive-relation', M.buildTransitiveRelationScene, 'math-transitive-relation'],
  ['math.found.equivalence-class', M.buildEquivalenceClassScene, 'math-equivalence-class'],
  ['math.found.partition', M.buildPartitionScene, 'math-partition'],
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
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const fitCircle = (p: Obj) => { const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1])); return { c: [cx, cy], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) } }
const ellipseOf = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { c: [(Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...ys) + Math.min(...ys)) / 2] as [number, number], rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }
const nearest = (p: number[], cands: number[][]) => cands.reduce((best, c, i) => (dist(p, c) < dist(p, cands[best]) ? i : best), 0)
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const inE = (e: { c: number[]; rx: number; ry: number }, p: number[]) => ((p[0] - e.c[0]) / e.rx) ** 2 + ((p[1] - e.c[1]) / e.ry) ** 2 < 1
const setEq = (a: ReadonlyArray<number | string>, b: ReadonlyArray<number | string>) => a.length === b.length && [...a].sort().join() === [...b].sort().join()

describe('the mathematics each figure draws', () => {
  it('Set membership: the three dots inside the drawn oval are a, b, c and the two outside are d, e, and every written statement x ∈ S / x ∉ S agrees with where its dot is', () => {
    const s = M.buildSetMembershipScene(), oval = ellipseOf(pathsOf(s, SLATE, 40)[0])
    const dd = dots(s, INK).filter((d) => d.radius === 0.12).map((d) => ({ p: d.position!, name: labelAt(s, [d.position![0], d.position![1] + 0.45])!.text! })); expect(dd).toHaveLength(5)
    const members = dd.filter((d) => inE(oval, d.p)).map((d) => d.name).sort(); expect(members).toEqual(['a', 'b', 'c']); expect(dd.filter((d) => !inE(oval, d.p)).map((d) => d.name).sort()).toEqual(['d', 'e'])
    const stmts = labelsOf(s).map((l) => /^([a-e]) (∈|∉) S$/.exec(l.text ?? '')).filter(Boolean) as RegExpExecArray[]; expect(stmts).toHaveLength(4)
    stmts.forEach((m) => { const d = dd.find((x) => x.name === m[1])!; expect(inE(oval, d.p), m[0]).toBe(m[2] === '∈') })                                           // each statement is true
    expect(dd.every((d) => inE(oval, d.p) !== !inE(oval, d.p))).toBe(true)                                                                              // in or out, never both
    expect(dots(s, GREEN)).toHaveLength(3); expect(dots(s, RED)).toHaveLength(2); expect(texts(s)).toContain('S = {a, b, c}')
  })

  it('Empty set: the first ring holds nothing, the second holds exactly one ring (so {∅} has 1 element), and in the third the empty dashed ring lies inside A without covering any of its three elements', () => {
    const s = M.buildEmptySetScene(), { c, r, inner, A } = M.EMP
    const rings = paths(s).filter((p) => p.points!.length >= 28 && p.color !== VIOLET).map((p) => ({ ...fitCircle(p), color: p.color }))
    const ring = (cc: number[]) => rings.find((q) => dist(q.c, cc) < 0.05 && q.r > 0.5)!
    expect(ring(c[0] as number[]).r).toBeCloseTo(r[0], 1); expect(ring(c[1] as number[]).r).toBeCloseTo(r[1], 1); expect(ring(c[2] as number[]).r).toBeCloseTo(r[2], 1)
    const everything = [...dots(s).map((d) => d.position!), ...rings.filter((q) => q.r < 0.5).map((q) => q.c)]
    const inside = (cc: Pt2, rad: number) => everything.filter((p) => dist(p, cc) < rad - 0.02)
    type Pt2 = number[]
    expect(inside(c[0] as Pt2, r[0])).toHaveLength(0)                                                                                                   // ∅: no elements
    expect(inside(c[1] as Pt2, r[1])).toHaveLength(1); expect(rings.filter((q) => q.r < 0.5 && dist(q.c, c[1] as Pt2) < 0.05)).toHaveLength(1)           // {∅}: one element, itself an empty ring
    expect(rings.find((q) => dist(q.c, c[1] as Pt2) < 0.05 && q.r < 0.5)!.r).toBeCloseTo(inner, 1)
    const dd = dots(s, INK).map((d) => d.position!).filter((p) => dist(p, c[2] as Pt2) < r[2]); expect(dd).toHaveLength(3)
    const e = M.emptyInsideA(), arcs = pathsOf(s, VIOLET, 8); expect(arcs).toHaveLength(8); arcs.forEach((a2) => a2.points!.forEach((q) => expect(dist(q, e.c as Pt2)).toBeCloseTo(e.r, 1)))
    expect(dist(e.c as Pt2, c[2] as Pt2) + e.r).toBeLessThan(r[2]); dd.forEach((p) => expect(dist(p, e.c as Pt2)).toBeGreaterThan(e.r + 0.1))                  // inside A, covering nothing
    expect(A).toHaveLength(3); expect(texts(s)).toEqual(expect.arrayContaining(['0 elements', '1 element', '∅ ⊆ A']))
  })

  it('Finite set: the blue arrows match the five elements one-to-one with 1…5, while the red arrows into {1, 2, 3, 4} send two elements to the same number', () => {
    const s = M.buildFiniteSetScene(), A = [0, 1, 2, 3, 4].map((i) => M.finA(i) as number[]), N = [0, 1, 2, 3, 4].map((i) => M.finN(i) as number[]), Mm = [0, 1, 2, 3].map((j) => M.finM(j) as number[])
    const target = (o: Obj, cands: number[][]) => ({ from: nearest(o.from!, A), to: nearest(o.to!, cands) })
    const blue = arrows(s, BLUE).map((o) => target(o, N)), red = arrows(s, RED).map((o) => target(o, Mm))
    expect(blue).toHaveLength(5); expect(new Set(blue.map((x) => x.from)).size).toBe(5); expect(new Set(blue.map((x) => x.to)).size).toBe(5)               // a bijection
    blue.forEach((x) => expect(x.from).toBe(x.to))                                                                                                      // p ↦ 1, q ↦ 2, …
    expect(red).toHaveLength(5); expect(new Set(red.map((x) => x.to)).size).toBe(4); expect(new Set(red.map((x) => x.to)).size).toBeLessThan(new Set(red.map((x) => x.from)).size)   // pigeonhole
    const hit = (t: number) => red.filter((x) => x.to === t).length; expect([0, 1, 2, 3].map(hit).sort()).toEqual([1, 1, 1, 2])
    ;[0, 1, 2, 3, 4].forEach((i) => expect(labelAt(s, [N[i][0] + 0.45, N[i][1]])!.text).toBe(String(i + 1)))
    ;[0, 1, 2, 3].forEach((j) => expect(labelAt(s, [Mm[j][0] - 0.45, Mm[j][1]])!.text).toBe(String(j + 1)))
    expect(texts(s)).toEqual(expect.arrayContaining(['|A| = 5', 'a collision']))
  })

  it('Set operations: from the drawn circles and numbered dots, the coloured elements of the four panels are A ∪ B = {1…6}, A ∩ B = {3, 4}, A ∖ B = {1, 2} and Aᶜ = {5, 6, 7}', () => {
    const s = M.buildSetOperationsScene(), { centers, r, off } = M.SOP
    const results = centers.map((c, k) => {
      const A = { c: [c[0] - off, c[1]], rx: r, ry: r }, B = { c: [c[0] + off, c[1]], rx: r, ry: r }
      const rings = pathsOf(s, SLATE, 40).filter((p) => dist(ellipseOf(p).c, c as number[]) < 1.2); expect(rings).toHaveLength(2)
      const els = M.SOP.U.map((n) => ({ n, p: [c[0] + M.sopEl(n)[0], c[1] + M.sopEl(n)[1]] }))
      els.forEach((e) => expect(labelAt(s, [e.p[0], e.p[1] + 0.4])!.text).toBe(String(e.n)))
      const inA = els.filter((e) => inE(A, e.p)).map((e) => e.n), inB = els.filter((e) => inE(B, e.p)).map((e) => e.n)
      expect(inA.sort()).toEqual([1, 2, 3, 4]); expect(inB.sort()).toEqual([3, 4, 5, 6])
      const colored = (col: string) => els.filter((e) => dots(s, col).some((d) => d.radius === 0.14 && dist(d.position!, e.p) < 0.02)).map((e) => e.n)
      return { inA, inB, colored }
    })
    const U = M.SOP.U, A = results[0].inA, B = results[0].inB
    expect(results[0].colored(GREEN)).toEqual(U.filter((x) => A.includes(x) || B.includes(x))); expect(results[1].colored(BLUE)).toEqual(U.filter((x) => A.includes(x) && B.includes(x)))
    expect(results[2].colored(RED)).toEqual(U.filter((x) => A.includes(x) && !B.includes(x))); expect(results[3].colored(VIOLET)).toEqual(U.filter((x) => !A.includes(x)))
    expect(results[0].colored(GREEN)).toEqual([1, 2, 3, 4, 5, 6]); expect(results[1].colored(BLUE)).toEqual([3, 4]); expect(results[2].colored(RED)).toEqual([1, 2]); expect(results[3].colored(VIOLET)).toEqual([5, 6, 7])
    expect(texts(s)).toEqual(expect.arrayContaining(['A ∪ B', 'A ∩ B', 'A ∖ B', 'Aᶜ']))
  })

  it('Power set: the eight panels show eight different subsets of {a, b, c} — every yes/no pattern once, 2³ — and each caption names the subset the green dots show', () => {
    const s = M.buildPowerSetScene(), pats: string[] = []
    for (let k = 0; k < 8; k++) {
      const members = [0, 1, 2].filter((i) => dots(s, GREEN).some((d) => d.radius === 0.16 && dist(d.position!, M.pwsDot(k, i) as number[]) < 0.02))
      pats.push([0, 1, 2].map((i) => (members.includes(i) ? 1 : 0)).join(''))
      expect(labelAt(s, [M.pwsCentre(k)[0], M.pwsCentre(k)[1] - 0.75])!.text, `panel ${k}`).toBe(M.subsetName(members))
      expect(setEq(members, M.PWS_ORDER[k] as number[])).toBe(true)
    }
    expect(new Set(pats).size).toBe(8); expect(pats.sort()).toEqual(['000', '001', '010', '011', '100', '101', '110', '111']); expect(pats.length).toBe(2 ** 3)
    expect(texts(s)).toContain('2 · 2 · 2 = 8')
  })

  it('Cartesian product: the six grid points are exactly all pairs (a, b) with a ∈ {1, 2, 3}, b ∈ {p, q}, so |A × B| = 3 × 2 = 6, and the green point is (2, q)', () => {
    const s = M.buildCartesianProductScene(), { A, B } = M.CPR
    const pts = dots(s, INK).filter((d) => d.radius === 0.14).map((d) => d.position!); expect(pts).toHaveLength(6)
    const pairs = pts.map((p) => { const i = [0, 1, 2].find((k) => Math.abs(M.cprAt(k, 0)[0] - p[0]) < 0.02)!, j = [0, 1].find((k) => Math.abs(M.cprAt(0, k)[1] - p[1]) < 0.02)!; return `${A[i]}${B[j]}` })
    expect(pairs.sort()).toEqual(A.flatMap((a) => B.map((b) => `${a}${b}`)).sort()); expect(pts.length).toBe(A.length * B.length)
    A.forEach((a, i) => expect(labelAt(s, [M.cprAt(i, 0)[0], M.CPR.oy - 1.3])!.text).toBe(a)); B.forEach((b, j) => expect(labelAt(s, [M.CPR.ox - 1.3, M.cprAt(0, j)[1]])!.text).toBe(b))
    const g = dots(s, GREEN)[0].position!; expect(dist(g, M.cprAt(1, 1) as number[])).toBeLessThan(0.02)                                                  // (2, q): above 2, level with q
    expect(texts(s)).toEqual(expect.arrayContaining(['(2, q)', '3 × 2 = 6']))
  })

  it('Ordered pair: the blue point is (1, 3), the red one (3, 1) is its mirror image in y = x and a different point, and the labels name them correctly', () => {
    const s = M.buildOrderedPairScene(), { ox, oy, u } = M.ORP, toM = (q: number[]) => [(q[0] - ox) / u, (q[1] - oy) / u]
    const b = toM(dots(s, BLUE)[0].position!), r = toM(dots(s, RED)[0].position!)
    expect(b[0]).toBeCloseTo(1, 1); expect(b[1]).toBeCloseTo(3, 1); expect(r[0]).toBeCloseTo(3, 1); expect(r[1]).toBeCloseTo(1, 1)
    expect([b[1], b[0]]).toEqual([expect.closeTo(r[0], 1), expect.closeTo(r[1], 1)])                                                                   // swap the entries = reflect in y = x
    expect(dist(b, r)).toBeGreaterThan(1); expect(Math.abs(b[0] - r[0]) + Math.abs(b[1] - r[1])).toBeGreaterThan(1)                                      // (1, 3) ≠ (3, 1)
    const diag = bonds(s, VIOLET, 0.03)[0], v = [diag.to![0] - diag.from![0], diag.to![1] - diag.from![1]]; expect(v[0]).toBeCloseTo(v[1], 6)           // the line y = x
    const mid = [(b[0] + r[0]) / 2, (b[1] + r[1]) / 2]; expect(mid[0]).toBeCloseTo(mid[1], 1)                                                           // the midpoint lies on it
    expect(texts(s)).toEqual(expect.arrayContaining(['(1, 3)', '(3, 1)', '(a, b) = (c, d) ⇔ a = c, b = d']))
  })

  it('Relation: the four arrows are the pairs (1, a), (1, b), (2, b), (3, c), the four green cells of the grid are the same pairs, and 1 has two images so R is not a function', () => {
    const s = M.buildRelationScene(), { A, B, pairs } = M.REL
    const LA = [0, 1, 2].map((i) => M.relA(i) as number[]), LB = [0, 1, 2].map((j) => M.relB(j) as number[])
    const key = (i: number, j: number) => `${A[i]}${B[j]}`
    const arr = [...arrows(s, BLUE), ...arrows(s, RED)].map((o) => key(nearest(o.from!, LA), nearest(o.to!, LB)))
    const distinct = [...new Set(arr)].sort(); expect(distinct).toEqual(pairs.map(([i, j]) => key(i, j)).sort()); expect(distinct).toEqual(['1a', '1b', '2b', '3c'])
    const cells = dots(s, GREEN).map((d) => { const i = [0, 1, 2].find((k) => Math.abs(M.relCell(k, 0)[1] - d.position![1]) < 0.02)!, j = [0, 1, 2].find((k) => Math.abs(M.relCell(0, k)[0] - d.position![0]) < 0.02)!; return key(i, j) }).sort()
    expect(cells).toEqual(distinct)                                                                                                                     // the arrow diagram and the subset of A × B agree
    expect(paths(s, SLATE).filter((p) => p.points!.length === 17)).toHaveLength(5)                                                                      // the other 5 of the 9 pairs are not in R
    const images = (i: number) => distinct.filter((k) => k.startsWith(A[i])).length; expect([0, 1, 2].map(images)).toEqual([2, 1, 1]); expect([0, 1, 2].every((i) => images(i) === 1)).toBe(false)   // not a function
    expect(arrows(s, RED).map((o) => nearest(o.from!, LA))).toEqual([0, 0])
    expect(texts(s)).toEqual(expect.arrayContaining(['R ⊆ A × B', 'not a function']))
  })

  it('Reflexive relation: the left relation has a loop at all four elements (reflexive) and the right one lacks the loop at 3 (not reflexive), read from the drawn rings', () => {
    const s = M.buildReflexiveRelationScene(), loops = pathsOf(s, GREEN, 20).filter((p) => p.points!.length === 21).map((p) => fitCircle(p))
    const loopsAt = (panel: number) => [0, 1, 2, 3].filter((i) => loops.some((l) => dist(l.c, M.rfxLoop(panel, i).c as number[]) < 0.04 && Math.abs(l.r - 0.22) < 0.03)).sort()
    expect(loopsAt(0)).toEqual([0, 1, 2, 3]); expect(loopsAt(1)).toEqual([0, 1, 3])
    loops.forEach((l) => { const near = [0, 1].flatMap((p) => [0, 1, 2, 3].map((i) => dist(l.c, M.rfxNode(p, i) as number[]))); expect(Math.min(...near)).toBeCloseTo(0.2, 1) })           // each loop passes through its element
    const refl = (panel: number) => loopsAt(panel).length === 4; expect(refl(0)).toBe(true); expect(refl(1)).toBe(false)
    expect(loops).toHaveLength(7); expect(texts(s)).toEqual(expect.arrayContaining(['reflexive', 'not reflexive', '?']))
    expect(arrows(s, SLATE)).toHaveLength(4)                                                                                                            // 1 → 2 and 2 → 3 in each panel
  })

  it('Symmetric relation: every drawn green arrow has its reverse, while in the right panel the two red arrows 1 → 2 and 2 → 3 have none', () => {
    const s = M.buildSymmetricRelationScene()
    const read = (panel: number, color: string) => arrows(s, color).filter((o) => Math.abs(o.from![0] - M.SYM.c[panel][0]) < 3).map((o) => { const N = [0, 1, 2, 3].map((i) => M.symNode(panel, i) as number[]); return [nearest(o.from!, N), nearest(o.to!, N)] as [number, number] })
    const left = read(0, GREEN), rg = read(1, GREEN), rr = read(1, RED), has = (set: Array<[number, number]>, a: number, b: number) => set.some(([x, y]) => x === a && y === b)
    expect(left).toHaveLength(6); left.forEach(([a, b]) => expect(has(left, b, a)).toBe(true))                                                          // aRb ⟹ bRa
    const right = [...rg, ...rr]; expect(right).toHaveLength(4)
    expect(rr.map(([a, b]) => `${a}${b}`).sort()).toEqual(['01', '12']); rr.forEach(([a, b]) => expect(has(right, b, a)).toBe(false))                // one-way arrows are the red ones
    rg.forEach(([a, b]) => expect(has(right, b, a)).toBe(true)); expect(right.every(([a, b]) => has(right, b, a))).toBe(false)                          // so the right relation is not symmetric
    expect(texts(s)).toEqual(expect.arrayContaining(['symmetric', 'not symmetric']))
  })

  it('Transitive relation: with the drawn arrows 1 → 2, 2 → 3 the left panel contains the shortcut 1 → 3 and is closed under composition; the right panel lacks it', () => {
    const s = M.buildTransitiveRelationScene()
    const read = (panel: number) => [...arrows(s, BLUE), ...arrows(s, GREEN)].filter((o) => Math.abs(o.from![0] - M.TRN.c[panel][0]) < 3).map((o) => { const N = [0, 1, 2].map((i) => M.trnNode(panel, i) as number[]); return [nearest(o.from!, N), nearest(o.to!, N)] as [number, number] })
    const closed = (R: Array<[number, number]>) => R.every(([a, b]) => R.every(([c, d]) => b !== c || R.some(([x, y]) => x === a && y === d)))
    const left = read(0), right = read(1)
    expect(left.map(([a, b]) => `${a}${b}`).sort()).toEqual(['01', '02', '12']); expect(right.map(([a, b]) => `${a}${b}`).sort()).toEqual(['01', '12'])
    expect(closed(left)).toBe(true); expect(closed(right)).toBe(false)                                                                                  // aRb ∧ bRc ⟹ aRc
    expect(arrows(s, GREEN)).toHaveLength(1); expect(labelAt(s, [M.TRN.c[1][0], M.trnNode(1, 0)[1] - 0.4])!.text).toBe('?')
    expect(texts(s)).toEqual(expect.arrayContaining(['transitive', 'not transitive']))
  })

  it('Equivalence classes: each drawn oval holds the numbers 0…8 with the same remainder mod 3, pairs inside an oval differ by a multiple of 3 and pairs in different ovals do not, and the ovals are disjoint and cover all nine', () => {
    const s = M.buildEquivalenceClassScene(), ovals = [GREEN, BLUE, RED].map((c) => ({ color: c, e: ellipseOf(pathsOf(s, c, 40)[0]) }))
    const els = dots(s).filter((d) => d.radius === 0.12).map((d) => ({ p: d.position!, n: Number(labelAt(s, [d.position![0] + 0.45, d.position![1]])!.text) })); expect(els).toHaveLength(9)
    const cls = (e: { p: number[]; n: number }) => ovals.findIndex((o) => inE(o.e, e.p))
    els.forEach((e) => expect(cls(e)).toBeGreaterThanOrEqual(0))
    const classes = [0, 1, 2].map((k) => els.filter((e) => cls(e) === k).map((e) => e.n).sort((a, b) => a - b)); expect(classes).toEqual([[0, 3, 6], [1, 4, 7], [2, 5, 8]])
    classes.forEach((c, k) => c.forEach((n) => expect(n % 3).toBe(k)))
    for (const a of els) for (const b of els) expect(M.sameClass(a.n, b.n)).toBe(cls(a) === cls(b))                                                     // x ~ y ⇔ same oval
    expect(new Set(classes.flat()).size).toBe(9); expect(sum(classes.map((c) => c.length))).toBe(9)                                                     // disjoint, covering
    expect(texts(s)).toEqual(expect.arrayContaining(['[0]', '[1]', '[2]']))
  })

  it('Partition: the three drawn boxes are non-empty, disjoint and cover {1…6}; the bottom two boxes overlap at 3 and leave 6 uncovered, so the same test fails', () => {
    const s = M.buildPartitionScene()
    const boxesOf = (panel: number, colors: string[]) => colors.map((col) => { const bs = bonds(s, col, 0.04).filter((o) => Math.abs((o.from![1] + o.to![1]) / 2 - M.PRT.ys[panel]) < 0.7); const xs = bs.flatMap((o) => [o.from![0], o.to![0]]), ys = bs.flatMap((o) => [o.from![1], o.to![1]]); return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) } })
    const members = (panel: number, boxes: ReturnType<typeof boxesOf>) => boxes.map((b) => [0, 1, 2, 3, 4, 5].filter((i) => { const p = M.prtDot(panel, i); return p[0] > b.x0 && p[0] < b.x1 && p[1] > b.y0 && p[1] < b.y1 }))
    const top = members(0, boxesOf(0, [BLUE, GREEN, VIOLET])), bottom = members(1, boxesOf(1, [BLUE, VIOLET]))
    expect(top).toEqual([[0, 1], [2], [3, 4, 5]]); expect(M.isPartition(top, 6)).toBe(true)
    expect(bottom).toEqual([[0, 1, 2], [2, 3, 4]]); expect(M.isPartition(bottom, 6)).toBe(false)
    const overlap = bottom[0].filter((x) => bottom[1].includes(x)), uncovered = [0, 1, 2, 3, 4, 5].filter((x) => !bottom.some((b) => b.includes(x)))
    expect(overlap).toEqual([2]); expect(uncovered).toEqual([5])                                                                                        // 3 twice, 6 missing
    expect(dots(s, RED).map((d) => d.position!.slice(0, 2))).toEqual([M.prtDot(1, 5).map((v) => expect.closeTo(v, 2))])
    const all = (blocks: number[][]) => blocks.every((b) => b.length > 0); expect(all(top)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['a partition', '3 twice, 6 missing']))
  })
})
