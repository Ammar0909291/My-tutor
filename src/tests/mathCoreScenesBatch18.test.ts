/**
 * Mathematics visual campaign, batch 18 (2026-10-12): discrete mathematics — graphs (degrees, types, representations,
 * paths and connectivity, Euler / Hamiltonian tours, trees, minimum spanning trees, colouring, planarity), stars and
 * bars, inclusion–exclusion and asymptotic notation. Each test rebuilds the graph from the DRAWN dots and lines (a
 * vertex is a dot, an edge a line whose ends sit on two dots) and compares it with an independent calculation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB18'

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
  ['math.disc.graph', M.buildGraphScene, 'math-graph'],
  ['math.disc.graph-types', M.buildGraphTypesScene, 'math-graph-types'],
  ['math.disc.graph-representation', M.buildGraphRepresentationScene, 'math-graph-representation'],
  ['math.disc.graph-connectivity', M.buildGraphConnectivityScene, 'math-graph-connectivity'],
  ['math.disc.euler-hamiltonian', M.buildEulerHamiltonianScene, 'math-euler-hamiltonian'],
  ['math.disc.graph-trees', M.buildGraphTreesScene, 'math-graph-trees'],
  ['math.disc.spanning-tree', M.buildSpanningTreeScene, 'math-spanning-tree'],
  ['math.disc.graph-coloring', M.buildGraphColoringScene, 'math-graph-coloring'],
  ['math.disc.planar-graph', M.buildPlanarGraphScene, 'math-planar-graph'],
  ['math.disc.stars-bars', M.buildStarsBarsScene, 'math-stars-and-bars'],
  ['math.disc.inclusion-exclusion', M.buildInclusionExclusionScene, 'math-inclusion-exclusion'],
  ['math.disc.asymptotic-notation', M.buildAsymptoticNotationScene, 'math-asymptotic-notation'],
  ['math.graph.graph', M.buildGraphScene, 'math-graph'],
  ['math.graph.tree', M.buildGraphTreesScene, 'math-graph-trees'],
  ['math.graph.graph-coloring', M.buildGraphColoringScene, 'math-graph-coloring'],
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

// ── readers: rebuild graphs from dots and lines ─────────────────────────────────────────────────────
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const vertsOf = (s: SceneSpec, filter: (p: number[]) => boolean = () => true, r = 0.16) => dots(s).filter((d) => d.radius === r && filter(d.position!)).map((d) => d.position!)
const segsOf = (s: SceneSpec, thickness: number, color?: string, filter: (o: Obj) => boolean = () => true) =>
  lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9) && filter(o))
const idx = (verts: number[][], p: number[]) => { const i = verts.findIndex((v) => dist(v, p) < 0.02); expect(i, `no dot at ${p}`).toBeGreaterThanOrEqual(0); return i }
const edgesOf = (verts: number[][], ss: Obj[]): Array<[number, number]> => ss.map((o) => [idx(verts, o.from!), idx(verts, o.to!)])
const degrees = (n: number, E: Array<[number, number]>) => { const d = Array(n).fill(0) as number[]; for (const [a, b] of E) { d[a]++; d[b]++ } return d }
const comps = (n: number, E: Array<[number, number]>) => { const p = Array.from({ length: n }, (_, i) => i); const f = (x: number): number => (p[x] === x ? x : (p[x] = f(p[x]))); for (const [a, b] of E) p[f(a)] = f(b); return Array.from({ length: n }, (_, i) => f(i)) }
const nComps = (n: number, E: Array<[number, number]>) => new Set(comps(n, E)).size
const acyclic = (n: number, E: Array<[number, number]>) => nComps(n, E) === n - E.length
const numeralsOf = (s: SceneSpec) => labelsOf(s).filter((o) => /^\d+$/.test(o.text ?? ''))
const nearestIdx = (pts: number[][], p: number[]) => pts.reduce((best, q, i) => (dist(q, p) < dist(pts[best], p) ? i : best), 0)
const pathBetween = (n: number, E: Array<[number, number]>, s: number, t: number): number[] | null => {
  const prev = Array(n).fill(-2) as number[]; prev[s] = -1; const q = [s]
  while (q.length) { const u = q.shift()!; for (const [a, b] of E) { const v = a === u ? b : b === u ? a : -1; if (v >= 0 && prev[v] === -2) { prev[v] = u; q.push(v) } } }
  if (prev[t] === -2) return null
  const path = [t]; while (path[0] !== s) path.unshift(prev[path[0]]); return path
}
const fitCircle = (p: Obj) => { const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1])); return { c: [cx, cy] as [number, number], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) } }

describe('the mathematics each figure draws', () => {
  it('Graph: 5 vertices, 6 edges; the drawn blue degree numbers equal the edge count at each dot (A 3, B 2, C 3, D 2, E 2) and add to 12 = 2 × 6 (handshaking)', () => {
    const s = M.buildGraphScene(), V = vertsOf(s)
    expect(V).toHaveLength(5)
    const E = edgesOf(V, segsOf(s, 0.04)); expect(E).toHaveLength(6)
    const deg = degrees(5, E); expect(deg.slice().sort()).toEqual([2, 2, 2, 3, 3])
    const letters = labelsOf(s).filter((o) => /^[A-E]$/.test(o.text ?? '')); expect(letters).toHaveLength(5)
    const numerals = numeralsOf(s).filter((o) => o.color === BLUE); expect(numerals).toHaveLength(5)
    const vertexOfLetter = Object.fromEntries(letters.map((o) => [o.text, nearestIdx(V, o.position!)]))
    expect(Object.keys(vertexOfLetter).sort()).toEqual(['A', 'B', 'C', 'D', 'E'])
    for (const o of numerals) expect(Number(o.text)).toBe(deg[nearestIdx(V, o.position!)])                                                               // each numeral is its own vertex's degree
    expect([deg[vertexOfLetter.A], deg[vertexOfLetter.B], deg[vertexOfLetter.C], deg[vertexOfLetter.D], deg[vertexOfLetter.E]]).toEqual([3, 2, 3, 2, 2])
    expect(sum(deg)).toBe(2 * E.length); expect(sum(numerals.map((o) => Number(o.text)))).toBe(12)
    expect(new Set(E.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`)).size).toBe(6)                                                              // simple: no repeated edge
    expect(texts(s)).toEqual(expect.arrayContaining(['Σ deg = 12', '|E| = 6', '2|E| = 12']))
  })

  it('Types of graphs: K₄ has all C(4, 2) = 6 pairs (degree 3); K₂,₃ joins only blue to red (2 × 3 = 6 edges); the multigraph doubles one pair; C₅ is regular of degree 2', () => {
    const s = M.buildGraphTypesScene()
    const quad = (qx: number, qy: number) => (p: number[]) => (qx < 0 ? p[0] < 0 : p[0] > 0) && (qy > 0 ? p[1] > 0 : p[1] < 0)
    const inQuad = (qx: number, qy: number) => (o: Obj) => quad(qx, qy)(o.from!) && quad(qx, qy)(o.to!)
    // complete
    const K = vertsOf(s, quad(-1, 1)), Ek = edgesOf(K, segsOf(s, 0.04, undefined, inQuad(-1, 1)))
    expect(K).toHaveLength(4); expect(Ek).toHaveLength(6); expect(new Set(Ek.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`)).size).toBe(6); expect(degrees(4, Ek)).toEqual([3, 3, 3, 3])
    // bipartite
    const Bv = [...vertsOf(s, quad(1, 1)).map((p) => ({ p, c: dots(s).find((d) => d.position === p)!.color }))]
    const blue = Bv.filter((v) => v.c === BLUE), red = Bv.filter((v) => v.c === RED)
    expect([blue.length, red.length]).toEqual([2, 3])
    const Bp = Bv.map((v) => v.p), Eb = edgesOf(Bp, segsOf(s, 0.04, undefined, inQuad(1, 1)))
    expect(Eb).toHaveLength(6)
    for (const [a, b] of Eb) expect(Bv[a].c).not.toBe(Bv[b].c)                                                                                          // edges only BETWEEN the two sets
    expect(blue.length * red.length).toBe(Eb.length)
    // multigraph: the bend point is where exactly two lines meet that is NOT a vertex
    const Mv = vertsOf(s, quad(-1, -1)); expect(Mv).toHaveLength(3)
    const Ms = segsOf(s, 0.04, undefined, inQuad(-1, -1)); expect(Ms).toHaveLength(5)
    const ends = Ms.flatMap((o) => [o.from!, o.to!]), bends = ends.filter((p) => !Mv.some((v) => dist(v, p) < 0.02))
    const bend = bends[0]; expect(bends.filter((p) => dist(p, bend) < 0.02)).toHaveLength(2)                                                            // one pseudo-vertex joining two segments
    const viaBend = Ms.filter((o) => dist(o.from!, bend) < 0.02 || dist(o.to!, bend) < 0.02).map((o) => (dist(o.from!, bend) < 0.02 ? o.to! : o.from!))
    const direct = Ms.find((o) => Mv.some((v) => dist(v, o.from!) < 0.02) && Mv.some((v) => dist(v, o.to!) < 0.02) && !viaBend.includes(o.from!) && !viaBend.includes(o.to!) && ((): boolean => { const a = idx(Mv, o.from!), b = idx(Mv, o.to!); const pair = [idx(Mv, viaBend[0]), idx(Mv, viaBend[1])].sort(); return [a, b].sort().join() === pair.join() })())
    expect(direct).toBeTruthy()                                                                                                                           // a direct edge parallel to the bent one: the same pair joined twice
    // regular
    const R = vertsOf(s, quad(1, -1)), Er = edgesOf(R, segsOf(s, 0.04, undefined, inQuad(1, -1)))
    expect(R).toHaveLength(5); expect(Er).toHaveLength(5); expect(degrees(5, Er)).toEqual([2, 2, 2, 2, 2])
    expect(texts(s)).toEqual(expect.arrayContaining(['complete K₄', 'bipartite', 'multigraph', 'regular: degree 2']))
  })

  it('Graph representation: the drawn 0/1 matrix equals the adjacency of the drawn graph (symmetric, zero diagonal, row sums = degrees) and the lists name each vertex\'s neighbours', () => {
    const s = M.buildGraphRepresentationScene(), { m } = M.REP
    const V = vertsOf(s, (p) => p[0] < 0), E = edgesOf(V, segsOf(s, 0.04)); expect(V).toHaveLength(4); expect(E).toHaveLength(4)
    const order = V.map((p, i) => ({ i, n: Number(numeralsOf(s).filter((o) => o.position![0] < 0).reduce((best, o) => (dist(o.position!, p) < dist(best.position!, p) ? o : best)).text) }))
    const num = (i: number) => order.find((o) => o.i === i)!.n                                                                                           // vertex numeral for a dot
    const A = Array.from({ length: 4 }, () => Array(4).fill(-1) as number[])
    for (const o of labelsOf(s).filter((o) => (o.text === '0' || o.text === '1') && (o.color === GREEN || o.color === SLATE))) {
      const i = Math.round((m.y0 - o.position![1]) / m.d), j = Math.round((o.position![0] - m.x0) / m.d); A[i][j] = Number(o.text)
    }
    for (const row of A) for (const v of row) expect(v).toBeGreaterThanOrEqual(0)                                                                         // all 16 entries drawn
    const want = Array.from({ length: 4 }, () => Array(4).fill(0) as number[]); for (const [a, b] of E) { want[num(a) - 1][num(b) - 1] = 1; want[num(b) - 1][num(a) - 1] = 1 }
    expect(A).toEqual(want)                                                                                                                                // A_ij = 1 ⇔ the drawn graph joins i and j
    for (let i = 0; i < 4; i++) { expect(A[i][i]).toBe(0); for (let j = 0; j < 4; j++) expect(A[i][j]).toBe(A[j][i]) }
    const deg = degrees(4, E); V.forEach((_, i) => expect(sum(A[num(i) - 1])).toBe(deg[i]))                                                           // row sums are the degrees
    const lists = labelsOf(s).filter((o) => /^\d: /.test(o.text ?? '')).map((o) => ({ v: Number(o.text![0]), ns: o.text!.slice(3).split(', ').map(Number) }))
    expect(lists).toHaveLength(4)
    for (const { v, ns } of lists) expect(ns).toEqual(A[v - 1].map((x, j) => (x ? j + 1 : 0)).filter(Boolean))                                            // the list is the row of ones
    expect(texts(s)).toEqual(expect.arrayContaining(['1: 2, 3', '2: 1, 3', '3: 1, 2, 4', '4: 3']))
  })

  it('Connectivity: the green edges form a path of 5 distinct vertices, the violet edges a 4-cycle, and the right graph has 2 components with no path between the two red dots', () => {
    const s = M.buildGraphConnectivityScene()
    const panel = (p: number[]) => (p[0] < -1.8 ? 'A' : p[0] < 2.0 ? 'B' : 'C')
    const nodes = dots(s).filter((d) => d.radius === 0.16).map((d) => d.position!)
    const VA = nodes.filter((p) => panel(p) === 'A'), VB = nodes.filter((p) => panel(p) === 'B'), VC = nodes.filter((p) => panel(p) === 'C')
    expect([VA.length, VB.length, VC.length]).toEqual([5, 5, 5])
    const slate = (pn: string) => segsOf(s, 0.04, undefined, (o) => panel(o.from!) === pn)
    // path
    const pathEdges = edgesOf(VA, segsOf(s, 0.08, GREEN)); const allA = edgesOf(VA, [...slate('A'), ...segsOf(s, 0.08, GREEN)])
    expect(pathEdges).toHaveLength(4); const dA = degrees(5, pathEdges); expect(dA.slice().sort()).toEqual([1, 1, 2, 2, 2]); expect(nComps(5, pathEdges)).toBe(1)           // a path: 2 ends, 3 inner, connected
    const ends = dA.map((d, i) => (d === 1 ? i : -1)).filter((i) => i >= 0), walk = pathBetween(5, pathEdges, ends[0], ends[1])!
    expect(new Set(walk).size).toBe(walk.length); expect(walk).toHaveLength(5)                                                                           // distinct vertices
    expect(allA).toHaveLength(5); expect(allA.length).toBeGreaterThan(pathEdges.length)                                                                  // the chord is drawn but not on the path
    // cycle
    const cyc = edgesOf(VB, segsOf(s, 0.08, VIOLET)); expect(cyc).toHaveLength(4)
    expect(degrees(5, cyc).filter((d) => d === 2)).toHaveLength(4); expect(degrees(5, cyc).filter((d) => d === 0)).toHaveLength(1); expect(nComps(5, cyc)).toBe(2)   // 4 vertices of degree 2, one untouched
    const four = [...new Set(cyc.flat())]; expect(acyclic(4, cyc.map(([a, b]) => [four.indexOf(a), four.indexOf(b)] as [number, number]))).toBe(false)                       // it closes up
    // disconnected
    const Ec = edgesOf(VC, slate('C')); expect(Ec).toHaveLength(4); expect(nComps(5, Ec)).toBe(2)
    const reds = dots(s, RED).filter((d) => d.radius === 0.22).map((d) => idx(VC, d.position!)); expect(reds).toHaveLength(2)
    expect(pathBetween(5, Ec, reds[0], reds[1])).toBeNull()                                                                                              // no path between them
    expect(comps(5, Ec)[reds[0]]).not.toBe(comps(5, Ec)[reds[1]])
    expect(texts(s)).toEqual(expect.arrayContaining(['path: distinct vertices', 'cycle: a closed path', 'disconnected: no path']))
  })

  it('Euler and Hamiltonian: the bowtie is connected with all degrees even (4, 2, 2, 2, 2) and the numbers 1…6 walk every edge once and return; the green outer pentagon visits each of the 5 vertices once', () => {
    const s = M.buildEulerHamiltonianScene()
    const VL = vertsOf(s, (p) => p[0] < 0), VR = vertsOf(s, (p) => p[0] > 0)
    expect([VL.length, VR.length]).toEqual([5, 5])
    const EL = edgesOf(VL, segsOf(s, 0.04, undefined, (o) => o.from![0] < 0)); expect(EL).toHaveLength(6)
    const dL = degrees(5, EL); expect(dL.slice().sort()).toEqual([2, 2, 2, 2, 4]); expect(dL.every((d) => d % 2 === 0)).toBe(true); expect(nComps(5, EL)).toBe(1)   // Euler's condition
    const mid = EL.map(([a, b]) => [(VL[a][0] + VL[b][0]) / 2, (VL[a][1] + VL[b][1]) / 2])
    const nums = numeralsOf(s).filter((o) => o.color === BLUE).map((o) => ({ k: Number(o.text), e: nearestIdx(mid, o.position!) })).sort((p, q) => p.k - q.k)
    expect(nums.map((x) => x.k)).toEqual([1, 2, 3, 4, 5, 6]); expect(new Set(nums.map((x) => x.e)).size).toBe(6)                                          // every edge numbered once
    const order = nums.map((x) => EL[x.e]); let at = -1; const start = order[0].find((v) => order[1].includes(v) === false)!
    at = start; const seq = [at]
    for (const [a, b] of order) { expect([a, b].includes(at)).toBe(true); at = a === at ? b : a; seq.push(at) }                                         // consecutive edges share the current vertex
    expect(seq[seq.length - 1]).toBe(seq[0]); expect(dL[seq[0]]).toBe(4)                                                                                  // a circuit through the middle vertex
    const HE = edgesOf(VR, segsOf(s, 0.04, undefined, (o) => o.from![0] > 0)), cyc = edgesOf(VR, segsOf(s, 0.08, GREEN))
    expect(HE).toHaveLength(6); expect(cyc).toHaveLength(5)
    expect(degrees(5, cyc)).toEqual([2, 2, 2, 2, 2]); expect(nComps(5, cyc)).toBe(1)                                                                      // one cycle through every vertex once
    const key = (e: [number, number]) => `${Math.min(...e)}-${Math.max(...e)}`
    for (const e of cyc) expect(HE.map(key)).toContain(key(e))                                                                                            // it uses real edges
    expect(HE.length - cyc.length).toBe(1)                                                                                                                 // the chord is left out
    expect(texts(s)).toEqual(expect.arrayContaining(['all degrees even', 'Euler: each edge once', 'Hamiltonian: each vertex once']))
  })

  it('Trees: 7 vertices and 6 = n − 1 edges, connected and acyclic; the unique path between the green leaves is c–a–d; adding the red edge makes a cycle equal to the violet edges', () => {
    const s = M.buildGraphTreesScene()
    const V = vertsOf(s); expect(V).toHaveLength(7)
    const E = edgesOf(V, segsOf(s, 0.04)); expect(E).toHaveLength(6)
    expect(E.length).toBe(V.length - 1); expect(nComps(7, E)).toBe(1); expect(acyclic(7, E)).toBe(true)                                                     // connected + n − 1 edges ⇒ a tree
    const deg = degrees(7, E), root = V.reduce((best, p, i) => (p[1] > V[best][1] ? i : best), 0)
    expect(deg[root]).toBe(2); expect(deg.filter((d) => d === 1)).toHaveLength(4)                                                                         // a binary tree: 4 leaves
    const green = edgesOf(V, segsOf(s, 0.09, GREEN)); expect(green).toHaveLength(2)
    const ends = degrees(7, green).map((d, i) => (d === 1 ? i : -1)).filter((i) => i >= 0)
    expect(ends).toHaveLength(2); for (const e of ends) expect(deg[e]).toBe(1)                                                                            // the path joins two leaves
    const unique = pathBetween(7, E, ends[0], ends[1])!; expect(unique).toHaveLength(3)
    expect(new Set(unique.slice(0, -1).map((v, i) => `${Math.min(v, unique[i + 1])}-${Math.max(v, unique[i + 1])}`))).toEqual(new Set(green.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`)))
    const extra = edgesOf(V, segsOf(s, 0.08, RED)); expect(extra).toHaveLength(1)
    expect(pathBetween(7, E, extra[0][0], extra[0][1])).not.toBeNull()                                                                                    // its ends were already connected ...
    expect(acyclic(7, [...E, extra[0]])).toBe(false); expect(E.length + 1).toBe(7)                                                                        // ... so it closes a cycle
    const cyc = edgesOf(V, segsOf(s, 0.08, VIOLET)), tp = pathBetween(7, E, extra[0][0], extra[0][1])!
    expect(new Set(cyc.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`))).toEqual(new Set(tp.slice(0, -1).map((v, i) => `${Math.min(v, tp[i + 1])}-${Math.max(v, tp[i + 1])}`)))   // the violet edges ARE the tree path joining the red edge's ends
    expect(texts(s)).toEqual(expect.arrayContaining(['root', '7 vertices, 6 edges', 'unique path', 'extra edge: a cycle']))
  })

  it('Spanning tree: the green edges are exactly Kruskal\'s result on the drawn weights (1, 2, 3, 4; total 10 = four n − 1 edges); each rejected edge would close a cycle', () => {
    const s = M.buildSpanningTreeScene()
    const V = vertsOf(s); expect(V).toHaveLength(5)
    const slate = segsOf(s, 0.04), E = edgesOf(V, slate); expect(E).toHaveLength(7)
    const mids = slate.map((o) => [(o.from![0] + o.to![0]) / 2, (o.from![1] + o.to![1]) / 2])
    const W = Array(7).fill(0) as number[]
    for (const o of numeralsOf(s).filter((o) => o.color === BLUE)) W[nearestIdx(mids, o.position!)] = Number(o.text)
    expect(W.slice().sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7])
    const order = E.map((e, i) => ({ e, w: W[i], i })).sort((p, q) => p.w - q.w)
    const parent = [0, 1, 2, 3, 4], find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x]))), kept: number[] = []
    for (const { e, w, i } of order) { if (find(e[0]) !== find(e[1])) { parent[find(e[0])] = find(e[1]); kept.push(i) } void w }
    const green = segsOf(s, 0.09, GREEN).map((o) => slate.findIndex((g) => (dist(g.from!, o.from!) < 0.02 && dist(g.to!, o.to!) < 0.02) || (dist(g.from!, o.to!) < 0.02 && dist(g.to!, o.from!) < 0.02))).sort((a, b) => a - b)
    expect(green).toEqual(kept.slice().sort((a, b) => a - b))                                                                                              // the drawn tree is Kruskal's
    expect(green).toHaveLength(V.length - 1); expect(sum(green.map((i) => W[i]))).toBe(10)
    const tree = green.map((i) => E[i]); expect(nComps(5, tree)).toBe(1); expect(acyclic(5, tree)).toBe(true)
    for (let i = 0; i < 7; i++) if (!green.includes(i)) { const lighter = green.filter((g) => W[g] < W[i]).map((g) => E[g]); expect(pathBetween(5, lighter, E[i][0], E[i][1]), `edge of weight ${W[i]}`).not.toBeNull() }   // rejected: a cheaper path already joins its ends
    const ref = M.kruskal(['A', 'B', 'C', 'D', 'E'], M.SPT.edges); expect(ref.total).toBe(10); expect(ref.chosen.map((e) => e[2])).toEqual([1, 2, 3, 4])
    expect(texts(s)).toEqual(expect.arrayContaining(['cheapest first', 'total 10', '4 edges = n − 1']))
  })

  it('Graph colouring: the 5-cycle colouring (blue, red, blue, red, green) is proper and uses the minimum 3 colours; K₄ uses 4 distinct colours = its chromatic number', () => {
    const s = M.buildGraphColoringScene()
    const nodes = dots(s).filter((d) => d.radius === 0.16).map((d) => d.position!), marks = dots(s).filter((d) => d.radius === 0.26)
    const colourAt = (p: number[]) => marks.find((m) => dist(m.position!, p) < 0.02)!.color
    const VC = nodes.filter((p) => p[0] < 0), VK = marks.filter((m) => m.position![0] > 0).map((m) => m.position!)                                         // K₄'s dots are drawn already coloured
    expect([VC.length, VK.length]).toEqual([5, 4]); expect(marks).toHaveLength(9)
    const Ec = edgesOf(VC, segsOf(s, 0.04, undefined, (o) => o.from![0] < 0)), Ek = edgesOf(VK, segsOf(s, 0.04, undefined, (o) => o.from![0] > 0))
    expect([Ec.length, Ek.length]).toEqual([5, 6])
    for (const [a, b] of Ec) expect(colourAt(VC[a])).not.toBe(colourAt(VC[b]))                                                                            // proper
    for (const [a, b] of Ek) expect(colourAt(VK[a])).not.toBe(colourAt(VK[b]))
    expect(new Set(VC.map(colourAt)).size).toBe(3); expect(new Set(VK.map(colourAt)).size).toBe(4)
    expect(M.chromaticNumber(5, Ec)).toBe(3); expect(M.chromaticNumber(4, Ek)).toBe(4)                                                                     // fewest colours possible
    expect(degrees(5, Ec)).toEqual([2, 2, 2, 2, 2]); expect(degrees(4, Ek)).toEqual([3, 3, 3, 3])                                                          // odd cycle; complete graph
    expect(M.chromaticNumber(5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]])).toBe(3); expect(M.chromaticNumber(6, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]])).toBe(2)   // C₅ needs 3, an even cycle only 2
    expect(texts(s)).toEqual(expect.arrayContaining(['χ(C₅) = 3', 'χ(K₄) = 4', 'planar: 4 colours suffice']))
  })

  it('Planar graph: K₄ is drawn with no crossings and V − E + F = 4 − 6 + 4 = 2; the pentagon K₅ has 10 edges that cross in 5 places, and 10 > 3V − 6 = 9', () => {
    const s = M.buildPlanarGraphScene()
    const VK = vertsOf(s, (p) => p[0] < 0), VF = vertsOf(s, (p) => p[0] > 0)
    expect([VK.length, VF.length]).toEqual([4, 5])
    const sk = segsOf(s, 0.04, undefined, (o) => o.from![0] < 0), sf = segsOf(s, 0.04, undefined, (o) => o.from![0] > 0)
    expect([sk.length, sf.length]).toEqual([6, 10])
    const crossings = (ss: Obj[]) => { const out: number[][] = []; for (let i = 0; i < ss.length; i++) for (let j = i + 1; j < ss.length; j++) { const x = M.segCross([ss[i].from![0], ss[i].from![1]], [ss[i].to![0], ss[i].to![1]], [ss[j].from![0], ss[j].from![1]], [ss[j].to![0], ss[j].to![1]]); if (x) out.push([x[0], x[1]]) } return out }
    expect(crossings(sk)).toHaveLength(0)                                                                                                                  // K₄: planar drawing
    const F = numeralsOf(s).filter((o) => o.color === BLUE && o.position![0] < 0).length; expect(F).toBe(4)
    expect(VK.length - sk.length + F).toBe(2)                                                                                                              // Euler: V − E + F = 2
    const X = crossings(sf); expect(X).toHaveLength(5)
    const reds = dots(s, RED).filter((d) => d.radius === 0.1).map((d) => d.position!); expect(reds).toHaveLength(5)
    for (const x of X) expect(reds.some((r) => dist(r, x) < 0.03)).toBe(true)                                                                              // a red dot on every crossing
    expect(new Set(edgesOf(VF, sf).map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`)).size).toBe(10)                                                  // all C(5, 2) pairs
    expect(sf.length).toBeGreaterThan(3 * VF.length - 6); expect(3 * 5 - 6).toBe(9)                                                                         // too many edges for a planar graph
    expect(texts(s)).toEqual(expect.arrayContaining(['4 − 6 + 4 = 2', 'K₅: 10 edges, 5 crossings', 'planar needs at most 9']))
  })

  it('Stars and bars: each drawn row has 5 stars and 2 bars in 7 slots giving bins that add to 5; the number of ways is C(7, 2) = 21 = the non-negative solutions of x₁ + x₂ + x₃ = 5 (6 if every bin is non-empty)', () => {
    const s = M.buildStarsBarsScene(), { x0, dx, slots, rows, n, k } = M.SB
    for (const r of rows) {
      const stars = dots(s, BLUE).filter((d) => d.radius === 0.14 && near(d.position![1], r.y, 1e-6)).map((d) => Math.round((d.position![0] - x0) / dx))
      const bars = bonds(s, RED, 0.05).filter((o) => near((o.from![1] + o.to![1]) / 2, r.y, 1e-6)).map((o) => Math.round((o.from![0] - x0) / dx))
      expect(stars.length + bars.length).toBe(slots); expect(stars).toHaveLength(n); expect(bars).toHaveLength(k - 1)                                      // 5 stars + 2 bars = 7 symbols
      expect(new Set([...stars, ...bars]).size).toBe(slots)
      const bins = M.binsOf(bars, slots); expect(sum(bins)).toBe(n); expect(bins).toHaveLength(k)
      expect(labelsOf(s).some((o) => o.text === `${bins.join(' + ')} = ${n}`)).toBe(true)                                                                  // the caption states these bins
    }
    const all = new Set<string>(); for (let a = 0; a < slots; a++) for (let b = a + 1; b < slots; b++) all.add(M.binsOf([a, b], slots).join(','))
    expect(all.size).toBe(21); expect(M.starsBarsCount(n, k)).toBe(21); expect(M.countSolutions(n, k)).toBe(21)                                           // bijection with the solutions
    expect(M.countSolutions(n, k, 1)).toBe(6); expect(M.starsBarsCount(n - k, k)).toBe(6)                                                                  // every bin ≥ 1: C(4, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['x₁ + x₂ + x₃ = 5', 'choose 2 of 7 slots for the bars', 'C(7, 2) = 21', 'with every bin non-empty: 6 ways']))
  })

  it('Inclusion–exclusion: the region counts 10, 5, 5, 10 read from the circles equal the multiples of 2 and 3 up to 30; |A ∪ B| = 15 + 10 − 5 = 20', () => {
    const s = M.buildInclusionExclusionScene()
    const [A] = paths(s, BLUE).filter((p) => p.points!.length >= 90).map(fitCircle), [B] = paths(s, RED).filter((p) => p.points!.length >= 90).map(fitCircle)
    const within = (p: number[], k: { c: [number, number]; r: number }) => Math.hypot(p[0] - k.c[0], p[1] - k.c[1]) < k.r
    const reg = numeralsOf(s).filter((o) => o.position![1] > -2.7 && o.position![1] < 2.5).map((o) => ({ inA: within(o.position!, A), inB: within(o.position!, B), n: Number(o.text) }))
    expect(reg).toHaveLength(4)
    const at = (a: boolean, b: boolean) => reg.find((r) => r.inA === a && r.inB === b)!.n
    const N = 30, nums = Array.from({ length: N }, (_, i) => i + 1)
    const mult = (d: number) => nums.filter((x) => x % d === 0)
    expect([at(true, false), at(true, true), at(false, true), at(false, false)]).toEqual([mult(2).filter((x) => x % 3 !== 0).length, mult(6).length, mult(3).filter((x) => x % 2 !== 0).length, nums.filter((x) => x % 2 !== 0 && x % 3 !== 0).length])
    expect(at(true, true) + at(true, false)).toBe(mult(2).length); expect(at(true, true) + at(false, true)).toBe(mult(3).length)                         // |A| = 15, |B| = 10
    const union = at(true, false) + at(true, true) + at(false, true)
    expect(union).toBe(mult(2).length + mult(3).length - mult(6).length); expect(union).toBe(20); expect(at(false, false)).toBe(N - union)               // inclusion–exclusion
    const lens = paths(s, GREEN).find((p) => p.points!.length < 90)!.points!
    for (const q of lens) { expect(within(q, A)).toBe(true); expect(within(q, B)).toBe(true) }                                                              // the green outline is the overlap
    expect(texts(s)).toEqual(expect.arrayContaining(['A: multiples of 2', 'B: multiples of 3', '15 + 10 = 25', '25 − 5 = 20', 'neither: 10']))
  })

  it('Asymptotic notation: the drawn ratio is f(n)/n² = 3 + 5/n; it equals 4 at n₀ = 5, stays ≤ 4 after it and > 3 always, so 3n² ≤ f(n) ≤ 4n² for n ≥ 5', () => {
    const s = M.buildAsymptoticNotationScene(), { x0, y0, ux, uy, n0, upper, lower } = M.ASY
    const curve0 = paths(s, BLUE)[0].points!
    for (const q of curve0) { const n = (q[0] - x0) / ux, r = (q[1] - y0) / uy; expect(Math.abs(r - (3 + 5 / n))).toBeLessThan(0.02 + (0.012 * 5) / (n * n)) }   // every drawn point has ratio 3 + 5/n
    const level = (c: string) => bonds(s, c, 0.025).map((o) => (o.from![1] - y0) / uy)
    expect(level(VIOLET)[0]).toBeCloseTo(upper, 1); expect(level(GREEN)[0]).toBeCloseTo(lower, 1)
    const guide = bonds(s, VIOLET, 0.02)[0]; expect((guide.from![0] - x0) / ux).toBeCloseTo(n0, 1)
    expect(M.asyRatio(n0)).toBe(4)
    for (let n = 1; n <= 200; n++) { expect(M.asyF(n)).toBeGreaterThan(3 * n * n); expect(M.asyF(n) <= 4 * n * n).toBe(n >= 5) }                          // f ≥ 3n² always; f ≤ 4n² exactly from n = 5
    expect(M.asyF(4)).toBe(68); expect(4 * 4 * 4).toBe(64)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(n)/n²', '4', '3', 'n₀ 5', 'f is Θ(n²)']))
  })
})
