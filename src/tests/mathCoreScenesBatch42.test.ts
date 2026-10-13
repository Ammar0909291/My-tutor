/**
 * Mathematics visual campaign, batch 42 (2026-10-12): TODO describe the concepts. Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB42'
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
  ['math.graph.graph-invariants', M.buildGraphInvariantsScene, 'math-graph-invariants'],
  ['math.graph.graph-operations', M.buildGraphOperationsScene, 'math-graph-operations'],
  ['math.graph.random-graph', M.buildRandomGraphScene, 'math-random-graph'],
  ['math.trig.trig-identities', M.buildTrigIdentitiesScene, 'math-trig-identities'],
  ['math.trig.trig-equations', M.buildTrigEquationsScene, 'math-trig-equations'],
  ['math.cat.limits', M.buildLimitsScene, 'math-limits'],
  ['math.cat.adjunction', M.buildAdjunctionScene, 'math-adjunction'],
  ['math.num.error-analysis', M.buildErrorAnalysisScene, 'math-error-analysis'],
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
  const labelIn = (s: SceneSpec, start: string) => labelsOf(s).find((l) => (l.text ?? '').startsWith(start))!
  const nearest = <T extends { position?: number[] }>(items: T[], p: readonly number[]) => items.reduce((m, o) => (dist(o.position!, p) < dist(m.position!, p) ? o : m))
  const nearestIdx = (pts: readonly (readonly number[])[], p: readonly number[]) => pts.reduce((m, q, k) => (dist(q, p) < dist(pts[m], p) ? k : m), 0)
  /** adjacency of a drawn graph: edges are drawn lines, vertices are drawn dots; returns edges as index pairs into `verts` */
  const edgesOf = (es: Obj[], verts: readonly (readonly number[])[]): Array<[number, number]> => es.map((e) => [nearestIdx(verts, e.from!), nearestIdx(verts, e.to!)] as [number, number])
  const bfs = (n: number, es: Array<[number, number]>, src: number): number[] => {
    const d = Array(n).fill(Infinity); d[src] = 0
    for (let changed = true; changed;) { changed = false; for (const [a, b] of es) { if (d[a] + 1 < d[b]) { d[b] = d[a] + 1; changed = true } if (d[b] + 1 < d[a]) { d[a] = d[b] + 1; changed = true } } }
    return d
  }
  const components = (n: number, es: Array<[number, number]>) => new Set(Array.from({ length: n }, (_, v) => Math.min(...bfs(n, es, v).map((d, u) => (Number.isFinite(d) ? u : Infinity))))).size

  // ── 1. graph invariants ────────────────────────────────────────────────────────────────────
  it('math.graph.graph-invariants: the drawn graph has order 6, size 7, degrees 3 3 3 2 2 1 (sum 2m), girth 3 and diameter 3', () => {
    const s = M.buildGraphInvariantsScene()
    const verts = dots(s, INK).map((d) => d.position!)
    const es = edgesOf(bonds(s, SLATE, 0.06), verts)
    const n = verts.length, m = es.length
    expect([n, m]).toEqual([6, 7])
    expect(numsIn(labelIn(s, 'order').text!)).toEqual([n]); expect(numsIn(labelIn(s, 'size').text!)).toEqual([m])
    // the degrees, counted from the drawn edges, against the numeral drawn beside each vertex
    const deg = verts.map((_, v) => es.filter((e) => e[0] === v || e[1] === v).length)
    const numerals = labelsOf(s).filter((l) => l.color === RED && /^\d$/.test(l.text ?? ''))
    expect(numerals).toHaveLength(6)
    verts.forEach((v, k) => expect(numOf(nearest(numerals, v).text!), `vertex ${k}`).toBe(deg[k]))
    expect([...deg].sort((a, b) => b - a)).toEqual([3, 3, 3, 2, 2, 1])
    const sumLabel = labelIn(s, '3 + 3'), twice = labelIn(s, '2 ×')
    expect(evalLR(sumLabel.text!)).toBe(sum(deg)); expect(numsIn(sumLabel.text!).slice(-1)[0]).toBe(sum(deg))
    expect(evalLR(twice.text!)).toBe(2 * m); expect(sum(deg)).toBe(2 * m)                   // handshake
    // girth: the shortest cycle of the drawn graph, found by brute force over all vertex triples/quadruples/...
    const adj = (a: number, b: number) => es.some((e) => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))
    let girth = Infinity
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) if (a < b && b !== c && a !== c && adj(a, b) && adj(b, c) && adj(c, a)) girth = Math.min(girth, 3)
    if (!Number.isFinite(girth)) for (const e of es) { const d = bfs(n, es.filter((q) => q !== e), e[0])[e[1]]; if (Number.isFinite(d)) girth = Math.min(girth, d + 1) }
    expect(girth).toBe(3)
    const green = edgesOf(bonds(s, GREEN, 0.1), verts)
    expect(green).toHaveLength(3)
    const gv = [...new Set(green.flat())]; expect(gv).toHaveLength(3)
    gv.forEach((a) => gv.forEach((b) => { if (a < b) expect(adj(a, b)).toBe(true) }))        // the green edges ARE a triangle of the graph
    expect(numsIn(labelIn(s, 'girth').text!)).toEqual([girth])
    // diameter: the largest shortest-path distance; the violet path realises it
    const dmat = verts.map((_, v) => bfs(n, es, v))
    const diameter = Math.max(...dmat.flat())
    expect(diameter).toBe(3)
    const violet = edgesOf(bonds(s, VIOLET, 0.1), verts)
    expect(violet).toHaveLength(diameter)
    const ends = [...violet.flat()].filter((v) => violet.flat().filter((u) => u === v).length === 1)
    expect(ends).toHaveLength(2); expect(dmat[ends[0]][ends[1]]).toBe(diameter)
    expect(numsIn(labelIn(s, 'diameter').text!)).toEqual([diameter])
  })

  // ── 2. graph operations ────────────────────────────────────────────────────────────────────
  it('math.graph.graph-operations: G has 5 edges, G[S] keeps every edge of G inside S = {1, 2, 3}, and the complement has exactly the 1 pair that G lacks', () => {
    const s = M.buildGraphOperationsScene(), X = M.GOP.xs
    const panelOf = (p: readonly number[]) => nearestIdx(X.map((x) => [x, M.GOP.y]), p)
    const verts = dots(s, INK)
    const numerals = labelsOf(s).filter((l) => l.color === INK && /^\d$/.test(l.text ?? ''))
    const graphOf = (panel: number, color: string) => {
      const vs = verts.filter((d) => panelOf(d.position!) === panel)
      const name = (d: Obj) => numOf(nearest(numerals, d.position!).text!)
      const names = vs.map(name).sort()
      const es = lines(s, color).filter((l) => panelOf(l.from!) === panel).map((l) => [name(nearest(vs, l.from!)), name(nearest(vs, l.to!))].sort() as [number, number])
      return { names, es }
    }
    const G = graphOf(0, BLUE), H = graphOf(1, GREEN), C = graphOf(2, RED)
    expect(G.names).toEqual([1, 2, 3, 4]); expect(G.es).toHaveLength(5)
    const key = (e: [number, number]) => `${e[0]}-${e[1]}`
    const inG = new Set(G.es.map(key))
    const S = H.names
    expect(S).toEqual([1, 2, 3])
    // induced subgraph: EVERY edge of G with both ends in S, and nothing else
    const expectInduced = G.es.filter((e) => S.includes(e[0]) && S.includes(e[1])).map(key).sort()
    expect(H.es.map(key).sort()).toEqual(expectInduced); expect(expectInduced).toHaveLength(3)
    expect(expectInduced).toContain('1-3')                                                  // the diagonal is kept — a plain subgraph could drop it
    // complement: all pairs of the four vertices that are not edges of G
    const missing: string[] = []
    for (let a = 1; a <= 4; a++) for (let b = a + 1; b <= 4; b++) if (!inG.has(`${a}-${b}`)) missing.push(`${a}-${b}`)
    expect(C.names).toEqual([1, 2, 3, 4]); expect(C.es.map(key).sort()).toEqual(missing.sort()); expect(missing).toEqual(['2-4'])
    // the same vertex stands at the same place in every panel it appears in (up to the panel shift)
    for (const [pn, g] of [[1, H], [2, C]] as const) for (const nm of g.names) {
      const here = verts.filter((d) => panelOf(d.position!) === pn).find((d) => numOf(nearest(numerals, d.position!).text!) === nm)!
      const there = verts.filter((d) => panelOf(d.position!) === 0).find((d) => numOf(nearest(numerals, d.position!).text!) === nm)!
      closeVec([here.position![0] - X[pn], here.position![1]], [there.position![0] - X[0], there.position![1]], 0.02)
    }
    // the captions
    expect(numsIn(labelIn(s, '5 edges').text!)).toEqual([G.es.length]); expect(numsIn(labelIn(s, '3 edges').text!)).toEqual([H.es.length]); expect(numsIn(labelIn(s, '1 edge').text!)).toEqual([C.es.length])
    expect(numsIn(labelIn(s, 'S =').text!)).toEqual(S)
    const pairs = labelIn(s, '5 + 1')
    expect(evalLR(pairs.text!)).toBe(G.es.length + C.es.length); expect(numsIn(pairs.text!).slice(-1)[0]).toBe(4 * 3 / 2)   // all C(4, 2) pairs
    for (const t of ['G', 'G[S]', 'complement']) expect(texts(s)).toContain(t)
  })

  // ── 3. random graphs ───────────────────────────────────────────────────────────────────────
  it('math.graph.random-graph: 10 possible edges on 5 vertices, the p = 0.6 sample (6 edges) is connected, the p = 0.2 sample (2 edges) is not, and log 5 / 5 lies between 0.2 and 0.6 on the drawn p-line', () => {
    const s = M.buildRandomGraphScene(), X = M.RDG.xs
    const panelOf = (p: readonly number[]) => (p[0] < 0 ? 0 : 1)
    const verts = [0, 1].map((pn) => dots(s, INK).filter((d) => panelOf(d.position!) === pn).map((d) => d.position!))
    expect(verts[0]).toHaveLength(5); expect(verts[1]).toHaveLength(5)
    const edgesIn = (pn: number, color: string, t: number) => bonds(s, color, t).filter((l) => panelOf(l.from!) === pn && l.from![1] > -1 && l.to![1] > -1)
    for (const pn of [0, 1]) {                                                              // all C(5, 2) possible edges, once each
      const all = edgesOf(edgesIn(pn, SLATE, 0.03), verts[pn]).map((e) => [...e].sort().join('-'))
      expect(new Set(all).size).toBe(10); expect(all).toHaveLength(10)
    }
    const hi = edgesOf(edgesIn(0, BLUE, 0.08), verts[0]), lo = edgesOf(edgesIn(1, RED, 0.08), verts[1])
    expect(hi).toHaveLength(6); expect(lo).toHaveLength(2)
    expect(components(5, hi)).toBe(1); expect(components(5, lo)).toBeGreaterThan(1)       // connected / not connected, from the drawn edges
    const ph = numsIn(labelIn(s, 'chance 0.6').text!)[0], pl = numsIn(labelIn(s, 'chance 0.2').text!)[0]
    expect([ph, pl]).toEqual([0.6, 0.2])
    for (const [text, p, drawn] of [['10 × 0.6', ph, hi.length], ['10 × 0.2', pl, lo.length]] as const) {
      const l = labelIn(s, text)
      expect(evalLR(l.text!)).toBeCloseTo(10 * p, 6); expect(Math.round(10 * p)).toBe(drawn)    // the expected number of edges equals what the sample shows
      expect(numsIn(l.text!).slice(-1)[0]).toBeCloseTo(drawn, 6)
    }
    expect(texts(s)).toContain('connected'); expect(texts(s)).toContain('not connected')
    // the p-line: positions read back as probabilities
    const [axis] = bonds(s, SLATE, 0.04).filter((l) => l.from![1] < -2 && Math.abs(l.from![1] - l.to![1]) < 1e-9)
    const pOf = (d: Obj) => (d.position![0] - axis.from![0]) / (axis.to![0] - axis.from![0])
    const red = dots(s, RED)[0], violet = dots(s, VIOLET)[0], blue = dots(s, BLUE)[0]
    expect(dots(s, RED)).toHaveLength(1); expect(dots(s, VIOLET)).toHaveLength(1); expect(dots(s, BLUE)).toHaveLength(1)
    expect(pOf(red)).toBeCloseTo(pl, 2); expect(pOf(blue)).toBeCloseTo(ph, 2)
    expect(pOf(violet)).toBeCloseTo(Math.log(verts[0].length) / verts[0].length, 2)         // log n / n for the n = 5 drawn vertices
    expect(pOf(red)).toBeLessThan(pOf(violet)); expect(pOf(violet)).toBeLessThan(pOf(blue))
    expect(numOf(labelIn(s, 'threshold').text!.replace('threshold ', ''))).toBeCloseTo(pOf(violet), 2)
    expect(X[0]).toBeLessThan(X[1])
  })

  // ── 4. trigonometric identities ────────────────────────────────────────────────────────────
  it('math.trig.trig-identities: at θ = 30° the drawn sin θ = 0.5, cos θ = 0.87 and sin 2θ = 0.87 satisfy sin 2θ = 2 sin θ cos θ, and the two bars have the same height', () => {
    const s = M.buildTrigIdentitiesScene()
    const e = extent(paths(s, SLATE)[0])
    const c = [e.cx, e.cy], R = (e.rx + e.ry) / 2
    const ang = (p: readonly number[]) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI
    const P1 = dots(s, INK)[0].position!, Q = dots(s, VIOLET)[0].position!
    expect(dist(P1, c)).toBeCloseTo(R, 1); expect(dist(Q, c)).toBeCloseTo(R, 1)               // both points lie on the circle
    const th = ang(P1), th2 = ang(Q)
    expect(th).toBeCloseTo(30, 0); expect(th2).toBeCloseTo(2 * th, 0)                         // 2θ is really double θ
    const [sinSeg] = bonds(s, RED, 0.08), [cosSeg] = bonds(s, BLUE, 0.08), [sin2Seg] = bonds(s, GREEN, 0.08)
    const sinV = len(sinSeg) / R, cosV = len(cosSeg) / R, sin2V = len(sin2Seg) / R
    expect(sinSeg.to![0]).toBeCloseTo(P1[0], 2); expect(sinSeg.to![1]).toBeCloseTo(P1[1], 2); expect(sinSeg.from![1]).toBeCloseTo(c[1], 2)   // the red segment drops from the point to the axis
    expect(cosSeg.from![0]).toBeCloseTo(c[0], 2); expect(cosSeg.to![0]).toBeCloseTo(P1[0], 2)
    expect(sin2Seg.to![0]).toBeCloseTo(Q[0], 2); expect(sin2Seg.to![1]).toBeCloseTo(Q[1], 2)
    expect(sinV).toBeCloseTo(Math.sin((th * Math.PI) / 180), 1); expect(cosV).toBeCloseTo(Math.cos((th * Math.PI) / 180), 1); expect(sin2V).toBeCloseTo(Math.sin((th2 * Math.PI) / 180), 1)
    expect(sin2V).toBeCloseTo(2 * sinV * cosV, 1)                                             // the identity, measured on the drawing
    // the numbers written on the figure
    expect(numsIn(labelIn(s, 'θ =').text!)).toEqual([Math.round(th)]); expect(numsIn(labelIn(s, '2θ =').text!).slice(-1)).toEqual([Math.round(th2)])
    expect(numsIn(labelIn(s, 'sin θ =').text!)).toEqual([Math.round(sinV * 10) / 10]); expect(numsIn(labelIn(s, 'cos θ =').text!)).toEqual([Math.round(cosV * 100) / 100]); expect(numsIn(labelIn(s, 'sin 2θ =').text!).slice(-1)).toEqual([Math.round(sin2V * 100) / 100])
    const eq = labelIn(s, '2 ×')
    expect(evalLR(eq.text!)).toBeCloseTo(Math.round(sin2V * 100) / 100, 6); expect(numsIn(eq.text!)).toEqual([2, Math.round(sinV * 10) / 10, Math.round(cosV * 100) / 100, Math.round(sin2V * 100) / 100])
    // the bars: equal height, and (in the figure's bar scale) equal to sin 2θ
    const bars = bonds(s, GREEN, 0.3)
    expect(bars).toHaveLength(2)
    bars.forEach((b) => { expect(len(b) / M.TID.barScale).toBeCloseTo(sin2V, 1); expect(b.from![0]).toBeCloseTo(b.to![0], 2) })
    expect(len(bars[0])).toBeCloseTo(len(bars[1]), 1); expect(bars[0].from![1]).toBeCloseTo(bars[1].from![1], 2)
    for (const t of ['left', 'right']) expect(texts(s)).toContain(t)
  })

  // ── 5. trigonometric equations ─────────────────────────────────────────────────────────────
  it('math.trig.trig-equations: the line y = 0.5 meets the drawn sine at 30°, 150°, 390° and 510°; 150 = 180 − 30, and the period between repeats is 360°', () => {
    const s = M.buildTrigEquationsScene(), F = M.TEQ
    const deg = (x: number) => (x - F.ox) / F.ux, val = (y: number) => (y - F.oy) / F.uy
    const curvePts = paths(s, BLUE)[0].points!.map((p) => [deg(p[0]), val(p[1])] as [number, number])
    curvePts.forEach(([d, v]) => expect(Math.abs(v - Math.sin((d * Math.PI) / 180)), `sin(${d.toFixed(0)}°)`).toBeLessThanOrEqual(0.012))
    const [lvl] = bonds(s, RED, 0.04)
    const level = val(lvl.from![1]); expect(level).toBeCloseTo(0.5, 2); expect(lvl.to![1]).toBeCloseTo(lvl.from![1], 2)
    // where the drawn curve crosses the drawn line (linear interpolation between samples)
    const cross: number[] = []
    for (let k = 1; k < curvePts.length; k++) { const [d0, v0] = curvePts[k - 1], [d1, v1] = curvePts[k]; if ((v0 - level) * (v1 - level) < 0) cross.push(d0 + ((level - v0) / (v1 - v0)) * (d1 - d0)) }
    expect(cross).toHaveLength(4)
    const sol = dots(s, GREEN).map((d) => deg(d.position![0])).sort((a, b) => a - b)
    expect(sol).toHaveLength(4)
    sol.forEach((d, k) => { expect(Math.abs(d - cross[k]), `solution ${k}`).toBeLessThan(1.2); expect(Math.abs(val(dots(s, GREEN).find((q) => Math.abs(deg(q.position![0]) - d) < 1e-6)!.position![1]) - level)).toBeLessThan(0.02) })
    expect(Math.abs(sol[0] - (Math.asin(level) * 180) / Math.PI)).toBeLessThan(1.2)                         // the principal solution, arcsin 0.5
    expect(Math.abs(sol[0] + sol[1] - 180)).toBeLessThan(1.5); expect(Math.abs(sol[2] - sol[0] - 360)).toBeLessThan(1.5); expect(Math.abs(sol[3] - sol[1] - 360)).toBeLessThan(1.5)
    // the tags under the axis
    const tags = labelsOf(s).filter((l) => /^\d+°$/.test(l.text ?? ''))
    expect(tags.map((t) => numOf((t.text ?? '').replace('°', ''))).sort((a, b) => a - b)).toEqual(sol.map(Math.round))
    tags.forEach((t) => expect(Math.abs(deg(t.position![0]) - sol[nearestIdx(sol.map((d) => [d, 0]), [deg(t.position![0]), 0])])).toBeLessThan(1))
    // the mirror line at 90° (the peak) and the period arrow
    const [mirror] = bonds(s, VIOLET, 0.04)
    expect(deg(mirror.from![0])).toBeCloseTo((sol[0] + sol[1]) / 2, 0); expect(deg(mirror.from![0])).toBeCloseTo(90, 0); expect(val(mirror.to![1])).toBeCloseTo(1, 1)
    const [per] = arrows(s, VIOLET)
    expect(deg(per.to![0]) - deg(per.from![0])).toBeCloseTo(360, 0); expect(deg(per.from![0])).toBeCloseTo(sol[0], 0)
    expect(evalLR(labelIn(s, '180°').text!.replace(/°/g, ''))).toBe(150); expect(numsIn(labelIn(s, 'period').text!)).toEqual([360]); expect(numsIn(labelIn(s, 'sin x').text!)).toEqual([level])
  })

  // ── 6. limits ──────────────────────────────────────────────────────────────────────────────
  it('math.cat.limits: the product of A = {1, 2} and B = {a, b} is the 2 × 2 grid of 4 pairs, and the one map u from the cone c lands on the pair (f(c), g(c)) = (2, a)', () => {
    const s = M.buildLimitsScene()
    const A = dots(s, BLUE).map((d) => d.position!), B = dots(s, RED).map((d) => d.position!)
    expect(A).toHaveLength(2); expect(B).toHaveLength(2)
    expect(A[0][0]).toBeCloseTo(A[1][0], 2); expect(B[0][1]).toBeCloseTo(B[1][1], 2)           // A down a column, B along a row
    const rows = bonds(s, BLUE, 0.03), cols = bonds(s, RED, 0.03)
    expect(rows).toHaveLength(2); expect(cols).toHaveLength(2)
    rows.forEach((r) => { expect(r.from![1]).toBeCloseTo(r.to![1], 2); expect(A.some((a) => dist(a, r.from!) < 0.02)).toBe(true) })    // a row starts at an element of A
    cols.forEach((c) => { expect(c.from![0]).toBeCloseTo(c.to![0], 2); expect(B.some((b) => dist(b, c.from!) < 0.02)).toBe(true) })    // a column starts at an element of B
    // the product: one dot where each row meets each column, and no other grey dot
    const prod = dots(s, INK).map((d) => d.position!)
    expect(prod).toHaveLength(rows.length * cols.length)
    for (const r of rows) for (const c of cols) expect(prod.some((p) => dist(p, [c.from![0], r.from![1]]) < 0.02), `(${r.from![1]}, ${c.from![0]})`).toBe(true)
    const pairs = labelIn(s, '2 ×'); expect(evalLR(pairs.text!)).toBe(prod.length); expect(numsIn(pairs.text!)).toEqual([2, 2, 4])
    // the names of the elements
    const nm = (p: readonly number[]) => nearest(labelsOf(s).filter((l) => /^[12ab]$/.test(l.text ?? '')), p).text
    expect(A.map(nm).sort()).toEqual(['1', '2']); expect(B.map(nm).sort()).toEqual(['a', 'b'])
    // the cone: f and g end at an element of A and of B; the single green arrow u ends at the product pair they pick out
    const c = dots(s, VIOLET)[0].position!
    const [f, g] = (() => { const as = arrows(s, VIOLET); return as.length === 2 ? [as.find((a) => A.some((p) => dist(p, a.to!) < 0.45))!, as.find((a) => B.some((p) => dist(p, a.to!) < 0.45))!] : [] })()
    expect(f).toBeDefined(); expect(g).toBeDefined()
    expect(dist(f.from!, c)).toBeLessThan(0.5); expect(dist(g.from!, c)).toBeLessThan(0.5)
    const fa = nearest(A.map((position) => ({ position })), f.to!).position, gb = nearest(B.map((position) => ({ position })), g.to!).position
    expect([nm(fa), nm(gb)]).toEqual(['2', 'a'])
    const us = arrows(s, GREEN); expect(us).toHaveLength(1)                                    // exactly one u
    const hit = dots(s, GREEN)[0].position!
    expect(dist(us[0].to!, hit)).toBeLessThan(0.45); expect(dist(us[0].from!, c)).toBeLessThan(0.5)
    closeVec(hit.slice(0, 2), [gb[0], fa[1]], 0.02)                                                       // column of g(c), row of f(c)
    expect(prod.some((p) => dist(p, hit) < 0.02)).toBe(true)
    for (const t of ['A', 'B', 'A × B', 'unique u']) expect(texts(s)).toContain(t)
  })

  // ── 7. adjunction ──────────────────────────────────────────────────────────────────────────
  it('math.cat.adjunction: Hom(A, GB) and Hom(FA, B) are both a 3 × 3 grid of 9 dots, point for point the same, and the highlighted pair is x ↦ 2, y ↦ 0', () => {
    const s = M.buildAdjunctionScene()
    const L = dots(s, BLUE).map((d) => d.position!), Rg = dots(s, RED).map((d) => d.position!)
    expect(L).toHaveLength(9); expect(Rg).toHaveLength(9)
    const uniq = (v: number[]) => [...new Set(v.map((x) => Math.round(x * 100) / 100))].sort((a, b) => a - b)
    const lx = uniq(L.map((p) => p[0])), ly = uniq(L.map((p) => p[1])), rx = uniq(Rg.map((p) => p[0])), ry = uniq(Rg.map((p) => p[1]))
    expect([lx.length, ly.length, rx.length, ry.length]).toEqual([3, 3, 3, 3])
    expect(lx.length * ly.length).toBe(L.length)                                              // a full 3 x 3 lattice, not 9 scattered dots
    const shift = rx[0] - lx[0]
    expect(lx.map((x) => x + shift)).toEqual(rx.map((x) => Math.round(x * 100) / 100).map((x, k) => Math.round((lx[k] + shift) * 100) / 100)); closeVec(ly, ry, 0.011)
    for (let k = 1; k < 3; k++) { expect(lx[k] - lx[k - 1]).toBeCloseTo(lx[1] - lx[0], 1); expect(ly[k] - ly[k - 1]).toBeCloseTo(ly[1] - ly[0], 1) }
    for (const x of lx) for (const y of ly) expect(L.some((p) => dist(p, [x, y]) < 0.02), `(${x}, ${y})`).toBe(true)
    const nine = labelIn(s, '3 ×'); expect(evalLR(nine.text!)).toBe(L.length); expect(numsIn(nine.text!)).toEqual([lx.length, ly.length, L.length])
    // the numerals under the columns / beside the rows say 0, 1, 2
    const ticks = labelsOf(s).filter((l) => /^[012]$/.test(l.text ?? ''))
    expect(ticks).toHaveLength(6)
    expect(lx.map((x) => nearest(ticks.filter((t) => t.position![1] < ly[0] - 0.3), [x, ly[0] - 0.8]).text)).toEqual(['0', '1', '2'])
    expect(ly.map((y) => nearest(ticks.filter((t) => t.position![0] < lx[0] - 0.3), [lx[0] - 0.7, y]).text)).toEqual(['0', '1', '2'])
    // the highlighted pair: the same lattice point in both grids
    const gl = dots(s, GREEN).map((d) => d.position!)
    expect(gl).toHaveLength(2)
    const [gL, gR] = gl.sort((a, b) => a[0] - b[0])
    closeVec([gR[0] - shift, gR[1]], gL.slice(0, 2), 0.02)
    expect(lx.findIndex((x) => Math.abs(x - gL[0]) < 0.02)).toBe(2); expect(ly.findIndex((y) => Math.abs(y - gL[1]) < 0.02)).toBe(0)
    // the arrow between the grids
    const [bij] = arrows(s, VIOLET)
    expect(bij.from![0]).toBeGreaterThan(lx[2]); expect(bij.to![0]).toBeLessThan(rx[0]); expect(bij.to![1]).toBeCloseTo(bij.from![1], 2)
    expect(bij.from![1]).toBeGreaterThan(ly[0]); expect(bij.from![1]).toBeLessThan(ly[2])
    for (const t of ['Hom(A, GB)', 'Hom(FA, B)', 'F ⊣ G']) expect(texts(s)).toContain(t)
  })

  // ── 8. error analysis ──────────────────────────────────────────────────────────────────────
  it('math.num.error-analysis: read off the magnified ruler, the errors are 0.00159 and 0.00126 and the relative errors 0.000507 and 0.000402', () => {
    const s = M.buildErrorAnalysisScene()
    const ticks = bonds(s, SLATE, 0.04).sort((a, b) => a.from![0] - b.from![0])
    expect(ticks).toHaveLength(5)
    const gap = ticks[1].from![0] - ticks[0].from![0]                                          // 0.001 on the ruler
    ticks.forEach((t, k) => expect(t.from![0] - ticks[0].from![0]).toBeCloseTo(k * gap, 1))
    expect(texts(s)).toContain('1 tick = 0.001')
    const perUnit = gap / 0.001
    const valueAt = (x: number) => 3.14 + (x - ticks[1].from![0]) / perUnit                    // the second tick is 3.140 (the blue dot's label)
    const dp = dots(s, GREEN)[0].position!, d1 = dots(s, BLUE)[0].position!, d2 = dots(s, VIOLET)[0].position!
    expect(dots(s, GREEN)).toHaveLength(1); expect(dots(s, BLUE)).toHaveLength(1); expect(dots(s, VIOLET)).toHaveLength(1)
    expect(valueAt(d1[0])).toBeCloseTo(numsIn(labelIn(s, '3.14').text!)[0], 4)                 // the blue dot sits on the 3.140 tick
    const x = valueAt(dp[0]), xhat1 = valueAt(d1[0]), xhat2 = valueAt(d2[0])
    expect(x).toBeCloseTo(Math.PI, 4)                                                          // the green dot is π
    const q = numsIn(labelIn(s, '22').text!); expect(xhat2).toBeCloseTo(q[0] / q[1], 4)
    for (const [dd, xh, text, rtext, color] of [[d1, xhat1, 'error', 'relative', RED], [d2, xhat2, 'error', 'relative', VIOLET]] as const) {
      const br = lines(s, color).filter((l) => Math.abs(l.from![1] - l.to![1]) < 1e-9)
      expect(br).toHaveLength(1)
      const absErr = len(br[0]) / perUnit
      expect(absErr).toBeCloseTo(Math.abs(xh - x), 5)                                          // the bracket spans exactly |x̂ − x|
      expect([br[0].from![0], br[0].to![0]].sort((a, b) => a - b).map((v) => Math.round(v * 100) / 100)).toEqual([dd[0], dp[0]].sort((a, b) => a - b).map((v) => Math.round(v * 100) / 100))
      const el = labelsOf(s).find((l) => (l.text ?? '').startsWith(text) && l.color === color)!, rl = labelsOf(s).find((l) => (l.text ?? '').startsWith(rtext) && l.color === color)!
      expect(numsIn(el.text!)[0]).toBeCloseTo(absErr, 4)
      expect(numsIn(rl.text!)[0]).toBeCloseTo(absErr / x, 5)                                   // relative error = absolute / |x|
    }
    expect(Math.abs(xhat2 - x)).toBeLessThan(Math.abs(xhat1 - x))                              // 22/7 is the better approximation here
    expect(xhat1 - x).toBeLessThan(0); expect(xhat2 - x).toBeGreaterThan(0)                    // below and above π
  })
})
