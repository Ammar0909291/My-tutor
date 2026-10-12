/**
 * Core school-mathematics figures — batch 18 of the mathematics visual campaign
 * (2026-10-12): discrete mathematics. Graphs (degrees and the handshaking lemma, types,
 * representations, paths / cycles / connectivity, Euler and Hamiltonian tours, trees, minimum
 * spanning trees, colouring, planarity), stars and bars, inclusion–exclusion and asymptotic
 * notation. `math.graph.graph`, `math.graph.tree` and `math.graph.graph-coloring` are registered
 * to the figures of their `math.disc.*` twins (same KG statements).
 *
 * Same rules as batches 1-17: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the
 * arithmetic in a label left to right and compares labels that share a last token before "="),
 * and every number drawn comes from the constants and pure helpers exported here, which the test
 * file re-derives from the DRAWN coordinates. A graph is dots joined by lines; a vertex letter is a
 * label placed OUTWARD from its dot (labels are pushed off anything they overlap).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, polyLines, sampleMapped, arcPts, type V3 } from './mathSceneKit'
import { VEN, lensOutline } from './mathCoreScenesB15'
import { choose } from './mathCoreScenesB17'

export type Pt = readonly [number, number]
const pt = (p: Pt): V3 => P(p[0], p[1])
const gEdge = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pt(a), pt(b), color, t)
const gVert = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pt(p), color, r)
const outward = (p: Pt, c: Pt, d: number): Pt => { const l = Math.hypot(p[0] - c[0], p[1] - c[1]) || 1; return [p[0] + ((p[0] - c[0]) / l) * d, p[1] + ((p[1] - c[1]) / l) * d] }
const vLabel = (text: string, p: Pt, c: Pt, d = 0.45, color: string = ROLE.ink): SceneObject => label(text, pt(outward(p, c, d)), color, 'primary')
/** n points on a circle, clockwise from the top (or from angle a0 degrees). */
export const ngon = (n: number, c: Pt, R: number, a0 = 90): Pt[] => Array.from({ length: n }, (_, i) => { const a = ((a0 - (360 / n) * i) * Math.PI) / 180; return [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)] as Pt })
export const degreesOf = (n: number, edges: ReadonlyArray<readonly [number, number]>) => { const d = Array(n).fill(0) as number[]; for (const [a, b] of edges) { d[a]++; d[b]++ } return d }
const rectLines = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.03): SceneObject[] => polyLines([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], color, t)

// ── 1. Graph ─────────────────────────────────────────────────────────────────

/** A pentagon A…E with the chord A–C: 6 edges, degrees 3, 2, 3, 2, 2, and Σdeg = 12 = 2 × 6. */
export const GRA = { c: [0, 0.1] as Pt, R: 2.0, names: ['A', 'B', 'C', 'D', 'E'], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]] as ReadonlyArray<readonly [number, number]> }

/** KG: G = (V, E); the degree of a vertex counts its incident edges; handshaking lemma Σdeg = 2|E|. */
export function buildGraphScene(): SceneSpec {
  return framed(raw_buildGraphScene())
}
function raw_buildGraphScene(): SceneSpec {
  const { c, R, names, edges } = GRA
  const V = ngon(5, c, R), deg = degreesOf(5, edges)
  return {
    id: 'math-graph',
    title: 'Graph: vertices, edges and degrees',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a graph G = (V, E) with vertices A…E and 6 edges; the degree of a vertex is the number of edges at it (A 3, B 2, C 3, D 2, E 2) and every edge is counted at both of its ends, so the degrees add up to twice the number of edges (handshaking lemma): 3 + 2 + 3 + 2 + 2 = 12 = 2 × 6.',
    ariaLabel:
      'A pentagon of five dots labelled A to E clockwise from the top, joined by its five sides plus one chord from A to C, six lines in all. In the second step each dot gets a blue number beside it: A 3, B 2, C 3, D 2, E 2. The captions say the sum of the degrees is 12 and the number of edges is 6, so 2 times 6 equals 12.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A graph is a set V of vertices (dots) and a set E of edges (lines joining two vertices). This one has 5 vertices A…E and 6 edges: the pentagon and the chord A–C.', objects: [...edges.map(([a, b]) => gEdge(V[a], V[b])), ...V.map((p) => gVert(p)), ...V.map((p, i) => vLabel(names[i], p, c))] },
      { narration: 'The degree of a vertex is the number of edges meeting it: A has 3 (B, E, C), B has 2, C has 3, D has 2, E has 2.', objects: V.map((p, i) => vLabel(String(deg[i]), p, c, 0.95, ROLE.output)) },
      { narration: 'Count each edge from both of its ends and the degrees add to 3 + 2 + 3 + 2 + 2 = 12 — exactly twice the 6 edges. This handshaking lemma, Σ deg = 2|E|, holds in every graph.', objects: [label('Σ deg = 12', P(0, -3.9), ROLE.output, 'primary'), label('|E| = 6', P(-2.2, -4.6), ROLE.ink, 'primary'), label('2|E| = 12', P(2.2, -4.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Types of graphs ───────────────────────────────────────────────────────

/** Four small graphs: the complete K₄, the complete bipartite K₂,₃, a multigraph (a doubled edge) and the regular cycle C₅. */
export const GTY = {
  k4: { c: [-2.8, 1.5] as Pt }, bip: { c: [2.8, 1.5] as Pt }, multi: { c: [-2.8, -1.9] as Pt }, reg: { c: [2.8, -1.9] as Pt },
}
const k4Pts = (c: Pt): Pt[] => [[c[0] - 0.9, c[1] + 0.9], [c[0] + 0.9, c[1] + 0.9], [c[0] + 0.9, c[1] - 0.9], [c[0] - 0.9, c[1] - 0.9]]
export const K4_EDGES: ReadonlyArray<readonly [number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3]]
const bipPts = (c: Pt): { U: Pt[]; W: Pt[] } => ({ U: [[c[0] - 0.9, c[1] + 0.6], [c[0] - 0.9, c[1] - 0.6]], W: [[c[0] + 0.9, c[1] + 0.9], [c[0] + 0.9, c[1]], [c[0] + 0.9, c[1] - 0.9]] })
const multiPts = (c: Pt): { a: Pt; b: Pt; c3: Pt; bend: Pt } => ({ a: [c[0] - 0.9, c[1] - 0.5], b: [c[0] + 0.9, c[1] - 0.5], c3: [c[0], c[1] + 0.9], bend: [c[0], c[1] - 1.3] })
export const REG_R = 0.95

/** KG: simple graph, multigraph, complete Kₙ, bipartite, regular. */
export function buildGraphTypesScene(): SceneSpec {
  return framed(raw_buildGraphTypesScene())
}
function raw_buildGraphTypesScene(): SceneSpec {
  const K = k4Pts(GTY.k4.c), B = bipPts(GTY.bip.c), M = multiPts(GTY.multi.c), C5 = ngon(5, GTY.reg.c, REG_R)
  return {
    id: 'math-graph-types',
    title: 'Types of graphs',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show four kinds of graph: the complete graph K₄ (all 6 pairs of its 4 vertices are joined), a bipartite graph (vertices in two sets — blue and red — with edges only BETWEEN the sets), a multigraph (two edges between the same pair of vertices) and a regular graph (the 5-cycle C₅, every vertex of degree 2).',
    ariaLabel:
      'Top left: four dots at the corners of a square with all six lines joining them, labelled complete K 4. Top right: two blue dots on the left and three red dots on the right with all six lines between the two groups and none inside a group, labelled bipartite. Bottom left: a triangle in which one side is drawn twice, the second copy bent downward, labelled multigraph. Bottom right: a pentagon of five dots, each with exactly two lines, labelled regular, every degree 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Complete graph K₄: every pair of the 4 vertices is joined by an edge — 6 = C(4, 2) edges, and each vertex has degree 3.', objects: [...K4_EDGES.map(([a, b]) => gEdge(K[a], K[b])), ...K.map((p) => gVert(p)), label('complete K₄', P(GTY.k4.c[0], 0.0), ROLE.ink, 'primary')] },
      { narration: 'Bipartite graph: the vertices split into two sets (blue, red) and every edge goes between the sets, never inside one. Here all 2 × 3 = 6 possible edges are present (K₂,₃).', objects: [...B.U.flatMap((u) => B.W.map((w) => gEdge(u, w))), ...B.U.map((p) => gVert(p, ROLE.output)), ...B.W.map((p) => gVert(p, ROLE.input)), label('bipartite', P(GTY.bip.c[0], 0.0), ROLE.ink, 'primary')] },
      { narration: 'A multigraph allows several edges between the same two vertices (here a and b are joined twice). A regular graph has the same degree at every vertex — the 5-cycle has degree 2 everywhere. Graphs without doubled edges or loops are called simple.', objects: [gEdge(M.a, M.b), gEdge(M.a, M.bend), gEdge(M.bend, M.b), gEdge(M.b, M.c3), gEdge(M.c3, M.a), gVert(M.a), gVert(M.b), gVert(M.c3), label('multigraph', P(GTY.multi.c[0], -3.4), ROLE.ink, 'primary'), ...ngon(5, GTY.reg.c, REG_R).flatMap((p, i) => [gEdge(p, C5[(i + 1) % 5]), gVert(p)]), label('regular: degree 2', P(GTY.reg.c[0], -3.4), ROLE.ink, 'primary')] },
    ],
  }
}
export const multigraphPoints = (): { a: Pt; b: Pt; c3: Pt; bend: Pt } => multiPts(GTY.multi.c)
export const bipartitePoints = () => bipPts(GTY.bip.c)
export const completePoints = () => k4Pts(GTY.k4.c)
export const regularPoints = () => ngon(5, GTY.reg.c, REG_R)

// ── 3. Graph representation ──────────────────────────────────────────────────

/** Vertices 1-4 with edges 1–2, 1–3, 2–3, 3–4, written as an adjacency matrix and as adjacency lists. */
export const REP = {
  V: [[-3.7, 1.5], [-1.7, 1.5], [-2.7, 0.0], [-2.7, -1.7]] as Pt[], c: [-2.7, 0.3] as Pt,
  edges: [[0, 1], [0, 2], [1, 2], [2, 3]] as ReadonlyArray<readonly [number, number]>,
  m: { x0: 1.0, y0: 1.8, d: 0.7 }, listY: [-1.3, -2.0, -2.7, -3.4] as readonly number[], listX: 2.1,
}
export const adjacencyOf = (n: number, edges: ReadonlyArray<readonly [number, number]>) => { const A = Array.from({ length: n }, () => Array(n).fill(0) as number[]); for (const [a, b] of edges) { A[a][b] = 1; A[b][a] = 1 } return A }
export const neighboursOf = (n: number, edges: ReadonlyArray<readonly [number, number]>) => Array.from({ length: n }, (_, i) => edges.flatMap(([a, b]) => (a === i ? [b] : b === i ? [a] : [])).sort((x, y) => x - y))

/** KG: adjacency matrix A_ij = 1 iff (i, j) ∈ E; adjacency list: each vertex's neighbours. */
export function buildGraphRepresentationScene(): SceneSpec {
  return framed(raw_buildGraphRepresentationScene())
}
function raw_buildGraphRepresentationScene(): SceneSpec {
  const { V, c, edges, m, listY, listX } = REP
  const A = adjacencyOf(4, edges), lists = neighboursOf(4, edges)
  const cell = (i: number, j: number): Pt => [m.x0 + j * m.d, m.y0 - i * m.d]
  const grid: SceneObject[] = [
    ...Array.from({ length: 5 }, (_, j) => line(P(m.x0 - m.d / 2 + j * m.d, m.y0 + m.d / 2), P(m.x0 - m.d / 2 + j * m.d, m.y0 - 3.5 * m.d), ROLE.reference, 0.015)),
    ...Array.from({ length: 5 }, (_, i) => line(P(m.x0 - m.d / 2, m.y0 + m.d / 2 - i * m.d), P(m.x0 + 3.5 * m.d, m.y0 + m.d / 2 - i * m.d), ROLE.reference, 0.015)),
  ]
  return {
    id: 'math-graph-representation',
    title: 'Graph representation: matrix and lists',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show one graph (vertices 1-4, edges 1–2, 1–3, 2–3, 3–4) written two ways: the adjacency matrix has a 1 in row i, column j exactly when i and j are joined (so it is symmetric with a zero diagonal and its row sums are the degrees), and the adjacency list names each vertex\'s neighbours.',
    ariaLabel:
      'Left: four dots numbered 1 to 4 where 1, 2 and 3 form a triangle and 3 has a tail to 4. Right: a four by four grid of zeros and ones with blue row and column numbers 1 to 4; the ones sit exactly where two vertices are joined, giving a symmetric pattern with zeros down the diagonal. Below it four lines list the neighbours: 1 has 2 and 3, 2 has 1 and 3, 3 has 1, 2 and 4, and 4 has 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A small graph: vertices 1, 2, 3, 4 and edges 1–2, 1–3, 2–3 (a triangle) and 3–4.', objects: [...edges.map(([a, b]) => gEdge(V[a], V[b])), ...V.map((p) => gVert(p)), ...V.map((p, i) => vLabel(String(i + 1), p, c))] },
      { narration: 'Adjacency matrix: row i, column j holds 1 if i and j are joined by an edge and 0 if not. Row 3 is 1 1 0 1 (3 is joined to 1, 2 and 4); the matrix is symmetric, the diagonal is 0 (no loops), and each row adds up to that vertex\'s degree.', objects: [...grid, ...[0, 1, 2, 3].map((j) => label(String(j + 1), P(m.x0 + j * m.d, m.y0 + m.d), ROLE.output, 'primary')), ...[0, 1, 2, 3].map((i) => label(String(i + 1), P(m.x0 - m.d, m.y0 - i * m.d), ROLE.output, 'primary')), ...A.flatMap((row, i) => row.map((v, j) => label(String(v), P(cell(i, j)[0], cell(i, j)[1]), v ? ROLE.result : ROLE.reference, 'primary')))] },
      { narration: 'Adjacency lists: for each vertex, just list its neighbours — 1: 2, 3; 2: 1, 3; 3: 1, 2, 4; 4: 3. It stores only the edges that exist, which is shorter for sparse graphs.', objects: lists.map((l, i) => label(`${i + 1}: ${l.map((x) => x + 1).join(', ')}`, P(listX, listY[i]), ROLE.ink, 'primary')) },
    ],
  }
}

// ── 4. Connectivity, paths and cycles ────────────────────────────────────────

/** Left: a path v1→v5 (distinct vertices). Middle: a 4-cycle (a closed path). Right: a disconnected graph — no path from x1 to y2. */
export const CON = {
  k: 1.25,
  A: { c: [-3.4, 0.3] as Pt, v: [[-1.0, 0.0], [-0.4, 1.0], [0.5, 0.6], [0.6, -0.6], [-0.3, -0.9]] as Pt[], e: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 3]] as ReadonlyArray<readonly [number, number]>, path: [0, 1, 2, 3, 4] as readonly number[] },
  B: { c: [-0.2, 0.3] as Pt, v: [[-0.7, 0.7], [0.7, 0.7], [0.7, -0.7], [-0.7, -0.7], [1.5, 0.0]] as Pt[], e: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4]] as ReadonlyArray<readonly [number, number]>, cycle: [0, 1, 2, 3] as readonly number[] },
  C: { c: [3.3, 0.3] as Pt, v: [[-0.8, 0.9], [0.1, 0.9], [-0.35, 0.1], [0.5, -0.9], [1.2, -0.3]] as Pt[], e: [[0, 1], [1, 2], [2, 0], [3, 4]] as ReadonlyArray<readonly [number, number]>, u: 0, w: 4 },
}
/** A panel-local vertex position placed on the page (panel offsets are scaled by CON.k). */
export const shift = (p: Pt, c: Pt): Pt => [p[0] * CON.k + c[0], p[1] * CON.k + c[1]]
/** Connected components by union-find. */
export const components = (n: number, edges: ReadonlyArray<readonly [number, number]>) => { const p = Array.from({ length: n }, (_, i) => i); const f = (x: number): number => (p[x] === x ? x : (p[x] = f(p[x]))); for (const [a, b] of edges) p[f(a)] = f(b); return Array.from({ length: n }, (_, i) => f(i)) }

/** KG: a path is a sequence of distinct vertices joined by edges, a cycle a closed path; connected = a path between every pair. */
export function buildGraphConnectivityScene(): SceneSpec {
  return framed(raw_buildGraphConnectivityScene())
}
function raw_buildGraphConnectivityScene(): SceneSpec {
  const { A, B, C } = CON
  const draw = (g: { c: Pt; v: Pt[]; e: ReadonlyArray<readonly [number, number]> }, edgeColor: (a: number, b: number) => string, thick: (a: number, b: number) => number, vcolor: (i: number) => string) => [
    ...g.e.map(([a, b]) => gEdge(shift(g.v[a], g.c), shift(g.v[b], g.c), edgeColor(a, b), thick(a, b))),
    ...g.v.map((p, i) => gVert(shift(p, g.c), vcolor(i))),
  ]
  const inPath = (a: number, b: number) => A.path.some((v, i) => i < A.path.length - 1 && ((v === a && A.path[i + 1] === b) || (v === b && A.path[i + 1] === a)))
  const inCycle = (a: number, b: number) => B.cycle.some((v, i) => (v === a && B.cycle[(i + 1) % B.cycle.length] === b) || (v === b && B.cycle[(i + 1) % B.cycle.length] === a))
  return {
    id: 'math-graph-connectivity',
    title: 'Paths, cycles and connectivity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the vocabulary of connectivity: a path is a sequence of DISTINCT vertices joined by edges (green: v1, v2, v3, v4, v5); a cycle is a closed path (violet 4-cycle); a graph is connected when there is a path between every pair of its vertices, and the right-hand graph is not — its two pieces (components) have no path between x₁ and y₂.',
    ariaLabel:
      'Left: five dots joined in a chain with one extra chord; the five-dot chain from the first to the last dot is drawn in thick green and labelled path, distinct vertices. Middle: a square of four dots drawn in thick violet with a tail to a fifth dot, labelled cycle, a closed path. Right: a triangle of dots and, apart from it, a separate pair of dots joined by one line; one dot of the triangle and one dot of the pair are red and the caption says disconnected, no path.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A path is a walk along edges that never repeats a vertex: v1 → v2 → v3 → v4 → v5 (green). The chord v2–v4 is not used.', objects: draw(A, (a, b) => (inPath(a, b) ? ROLE.result : ROLE.reference), (a, b) => (inPath(a, b) ? 0.08 : 0.04), (i) => (A.path.includes(i) ? ROLE.result : ROLE.ink)).concat(label('path: distinct vertices', pt([A.c[0], -1.7]), ROLE.result, 'primary')) },
      { narration: 'A cycle is a path that closes up: it returns to where it started, here around the square w1 → w2 → w3 → w4 → w1 (violet). The tail to w5 is not part of it.', objects: draw(B, (a, b) => (inCycle(a, b) ? ROLE.aid : ROLE.reference), (a, b) => (inCycle(a, b) ? 0.08 : 0.04), (i) => (B.cycle.includes(i) ? ROLE.aid : ROLE.ink)).concat(label('cycle: a closed path', pt([B.c[0], -1.7]), ROLE.aid, 'primary')) },
      { narration: 'A graph is connected when there is a path between EVERY pair of vertices. This one is in two separate pieces: x₁ and y₂ (red) lie in different components, so no path joins them — the graph is disconnected.', objects: [...draw(C, () => ROLE.reference, () => 0.04, () => ROLE.ink), gVert(shift(C.v[C.u], C.c), ROLE.input, 0.22), gVert(shift(C.v[C.w], C.c), ROLE.input, 0.22), label('disconnected: no path', pt([C.c[0], -1.7]), ROLE.input, 'primary')] },
    ],
  }
}

// ── 5. Euler and Hamiltonian tours ───────────────────────────────────────────

/** Left: the bowtie (two triangles sharing a vertex): every degree even, so an Euler circuit uses each edge once (numbered 1-6). Right: a Hamiltonian cycle through each vertex of a pentagon-with-chord once. */
export const EUL = {
  c: [-2.6, 0] as Pt,
  v: { C: [-2.6, 0], L1: [-4.0, 1.1], L2: [-4.0, -1.1], R1: [-1.2, 1.1], R2: [-1.2, -1.1] } as Record<string, Pt>,
  tour: ['C', 'L1', 'L2', 'C', 'R1', 'R2', 'C'] as readonly string[],
  ham: { c: [2.8, 0] as Pt, R: 1.7, edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]] as ReadonlyArray<readonly [number, number]>, cycle: [0, 1, 2, 3, 4] as readonly number[] },
}
export const eulerEdges = (): Array<readonly [string, string]> => EUL.tour.slice(0, -1).map((a, i) => [a, EUL.tour[i + 1]] as const)

/** KG: Euler circuit — each edge exactly once (exists iff connected with all degrees even); Hamiltonian cycle — each vertex exactly once. */
export function buildEulerHamiltonianScene(): SceneSpec {
  return framed(raw_buildEulerHamiltonianScene())
}
function raw_buildEulerHamiltonianScene(): SceneSpec {
  const { v, c, ham } = EUL
  const E = eulerEdges()
  const H = ngon(5, ham.c, ham.R)
  const num = (k: number): SceneObject => { const [a, b] = E[k], m: Pt = [(v[a][0] + v[b][0]) / 2, (v[a][1] + v[b][1]) / 2]; return label(String(k + 1), pt(outward(m, c, 0.4)), ROLE.output, 'primary') }
  return {
    id: 'math-euler-hamiltonian',
    title: 'Euler and Hamiltonian tours',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Contrast the two tours: an Euler circuit crosses every EDGE exactly once and exists exactly when the graph is connected and every degree is even — the bowtie has degrees 4, 2, 2, 2, 2, and the numbered tour C → L1 → L2 → C → R1 → R2 → C uses its 6 edges once each; a Hamiltonian cycle visits every VERTEX exactly once — in the pentagon-with-a-chord the outer pentagon does.',
    ariaLabel:
      'Left: a bowtie, two triangles that share their middle vertex, with a blue number 1 to 6 beside each edge giving the order of a tour that uses every edge once and returns to the middle; the caption says all degrees even. Right: a pentagon of five dots with a chord, whose five outer sides are drawn in thick green to show a loop through every dot once, captioned Hamiltonian: each vertex once.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The bowtie: two triangles sharing the middle vertex. Its degrees are 4 (middle) and 2, 2, 2, 2 — all even, and the graph is connected, so an Euler circuit exists (Euler\'s theorem).', objects: [...E.map(([a, b]) => gEdge(v[a], v[b])), ...Object.values(v).map((p) => gVert(p)), label('all degrees even', pt([c[0], -2.1]), ROLE.ink, 'primary')] },
      { narration: 'Walk it: C → L1 (1), L1 → L2 (2), L2 → C (3), C → R1 (4), R1 → R2 (5), R2 → C (6). Every edge is used exactly once and the walk ends where it began: an Euler circuit.', objects: [...E.map((_, k) => num(k)), label('Euler: each edge once', pt([c[0], -2.9]), ROLE.output, 'primary')] },
      { narration: 'A Hamiltonian cycle instead visits every VERTEX once: here the outer pentagon A → B → C → D → E → A (green) passes through all 5 vertices once; the chord A–C is not needed. (Deciding whether one exists is much harder than Euler\'s even-degree test.)', objects: [...ham.edges.map(([a, b]) => gEdge(H[a], H[b])), ...ham.cycle.map((a, i) => gEdge(H[a], H[ham.cycle[(i + 1) % 5]], ROLE.result, 0.08)), ...H.map((p) => gVert(p)), label('Hamiltonian: each vertex once', pt([ham.c[0], -2.9]), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Trees ─────────────────────────────────────────────────────────────────

/** A binary tree on 7 vertices (6 edges): the path c–a–d is unique; adding the edge e–f closes the cycle e–b–f. */
export const TRE = {
  v: { r: [0, 2.4], a: [-1.6, 1.0], b: [1.6, 1.0], c: [-2.4, -0.4], d: [-0.8, -0.4], e: [0.8, -0.4], f: [2.4, -0.4] } as Record<string, Pt>,
  edges: [['r', 'a'], ['r', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'e'], ['b', 'f']] as ReadonlyArray<readonly [string, string]>,
  path: ['c', 'a', 'd'] as readonly string[], extra: ['e', 'f'] as readonly [string, string],
}

/** KG: a tree is a connected acyclic graph: n vertices, n − 1 edges, a unique path between any two vertices. */
export function buildGraphTreesScene(): SceneSpec {
  return framed(raw_buildGraphTreesScene())
}
function raw_buildGraphTreesScene(): SceneSpec {
  const { v, edges, path, extra } = TRE
  const names = Object.keys(v)
  return {
    id: 'math-graph-trees',
    title: 'Trees: connected, no cycles, n − 1 edges',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a tree: 7 vertices and 6 = n − 1 edges, connected with no cycle, drawn as a rooted binary tree; any two vertices are joined by exactly one path (c to d goes c–a–d); and adding one more edge to a tree always creates a cycle (e–f closes e–b–f), so it stops being a tree.',
    ariaLabel:
      'A rooted binary tree with the root at the top, two children below it and each of those with two children, seven dots and six lines in all, captioned 7 vertices, 6 edges. In the second step the two lines c to a and a to d, the only route between the two leaves c and d, are thick green, captioned unique path. In the third step a red line joins the two leaves e and f, and the two lines e to b and b to f turn violet to show the cycle that results, captioned extra edge, a cycle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A tree is a connected graph with no cycles. This rooted binary tree has 7 vertices and 6 edges — always one fewer edge than vertices (n − 1).', objects: [...edges.map(([a, b]) => gEdge(v[a], v[b])), ...names.map((k) => gVert(v[k])), label('root', pt([v.r[0], v.r[1] + 0.7]), ROLE.ink, 'primary'), label('7 vertices, 6 edges', pt([-3.4, -2.0]), ROLE.ink, 'primary')] },
      { narration: 'Between any two vertices there is exactly ONE path: from leaf c to leaf d the only route is c → a → d (green). There is no second way round, because that would be a cycle.', objects: [...path.slice(0, -1).map((a, i) => gEdge(v[a], v[path[i + 1]], ROLE.result, 0.09)), ...path.map((k) => gVert(v[k], ROLE.result, 0.2)), label('unique path', pt([-1.6, -1.3]), ROLE.result, 'primary')] },
      { narration: 'Add one extra edge e–f: now e → b → f and e → f are two different paths between e and f — a cycle (violet) — so the graph with 7 edges is no longer a tree. A tree has no edge to spare.', objects: [gEdge(v[extra[0]], v[extra[1]], ROLE.input, 0.08), gEdge(v.e, v.b, ROLE.aid, 0.08), gEdge(v.b, v.f, ROLE.aid, 0.08), label('extra edge: a cycle', pt([1.6, -1.3]), ROLE.input, 'primary')] },
    ],
  }
}

// ── 7. Spanning tree ─────────────────────────────────────────────────────────

/** A weighted graph on 5 vertices; Kruskal's greedy choice picks AB 1, BC 2, DE 3, AD 4 (total 10) and rejects BE, CE, AE (each would close a cycle). */
export const SPT = {
  v: { A: [-3.2, 0.8], B: [-0.8, 2.0], C: [2.0, 0.9], D: [-2.2, -1.6], E: [0.6, -1.2] } as Record<string, Pt>,
  edges: [['A', 'B', 1], ['B', 'C', 2], ['D', 'E', 3], ['A', 'D', 4], ['B', 'E', 5], ['C', 'E', 6], ['A', 'E', 7]] as ReadonlyArray<readonly [string, string, number]>,
  centre: [-0.3, 0.2] as Pt,
}
/** Kruskal's algorithm on the edge list (sorted by weight): the accepted edges and their total. */
export function kruskal(vertices: readonly string[], edges: ReadonlyArray<readonly [string, string, number]>) {
  const parent = Object.fromEntries(vertices.map((x) => [x, x])) as Record<string, string>
  const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])))
  const chosen: Array<readonly [string, string, number]> = []
  for (const e of [...edges].sort((p, q) => p[2] - q[2])) { if (find(e[0]) !== find(e[1])) { parent[find(e[0])] = find(e[1]); chosen.push(e) } }
  return { chosen, total: chosen.reduce((s, e) => s + e[2], 0) }
}

/** KG: a spanning tree uses all vertices and n − 1 edges with no cycle; the minimum one (Kruskal / Prim) minimises total weight. */
export function buildSpanningTreeScene(): SceneSpec {
  return framed(raw_buildSpanningTreeScene())
}
function raw_buildSpanningTreeScene(): SceneSpec {
  const { v, edges, centre } = SPT
  const names = Object.keys(v)
  const { chosen } = kruskal(names, edges)
  const wLabel = ([a, b, w]: readonly [string, string, number]): SceneObject => { const m: Pt = [(v[a][0] + v[b][0]) / 2, (v[a][1] + v[b][1]) / 2]; return label(String(w), pt(outward(m, centre, 0.38)), ROLE.output, 'primary') }
  const green = (es: ReadonlyArray<readonly [string, string, number]>) => es.map(([a, b]) => gEdge(v[a], v[b], ROLE.result, 0.09))
  return {
    id: 'math-spanning-tree',
    title: 'Minimum spanning tree (Kruskal)',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a minimum spanning tree by Kruskal\'s algorithm on a weighted graph with 5 vertices and 7 edges: take edges in order of weight, keeping one only if it does not close a cycle — AB 1, BC 2, DE 3 and AD 4 are kept (4 = n − 1 edges, total weight 10, everything connected), while BE 5, CE 6 and AE 7 would each close a cycle and are rejected.',
    ariaLabel:
      'A graph with five dots A to E and seven lines, each with its weight written beside it: AB 1, BC 2, DE 3, AD 4, BE 5, CE 6, AE 7. In the second step the three cheapest edges, AB, BC and DE, are drawn thick and green. In the third step AD joins them: four thick green edges connect all five dots, captioned total 10 and four edges, n minus 1. Three thin grey edges remain, which would close cycles.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A weighted graph: 5 vertices, 7 edges, each with a cost. We want the cheapest set of edges that still connects everything — a minimum spanning tree.', objects: [...edges.map(([a, b]) => gEdge(v[a], v[b])), ...names.map((k) => gVert(v[k])), ...names.map((k) => vLabel(k, v[k], centre, 0.45)), ...edges.map(wLabel)] },
      { narration: 'Kruskal\'s algorithm: go through the edges from cheapest to dearest and keep an edge only if it does not close a cycle. AB (1), BC (2) and DE (3) are all fine.', objects: [...green(chosen.slice(0, 3)), label('cheapest first', pt([-3.4, -2.9]), ROLE.result, 'primary')] },
      { narration: 'AD (4) joins the two pieces, and now all 5 vertices are connected with 4 = n − 1 edges. BE (5), CE (6) and AE (7) would each close a cycle, so they are rejected. The total weight is 1 + 2 + 3 + 4 = 10 — the minimum.', objects: [...green(chosen.slice(3)), label('total 10', pt([0.8, -2.9]), ROLE.result, 'primary'), label('4 edges = n − 1', pt([3.4, -2.9]), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 8. Graph colouring ───────────────────────────────────────────────────────

/** The 5-cycle needs 3 colours (it is an odd cycle); K₄ needs 4 (all its vertices are mutually adjacent). */
export const COL = {
  c5: { c: [-2.8, 0.3] as Pt, R: 1.5, colors: [ROLE.output, ROLE.input, ROLE.output, ROLE.input, ROLE.result] as readonly string[] },
  k4: { c: [2.8, 0.3] as Pt, colors: [ROLE.output, ROLE.input, ROLE.result, ROLE.aid] as readonly string[] },
}
/** The fewest colours that properly colour a graph (brute force over all assignments). */
export function chromaticNumber(n: number, edges: ReadonlyArray<readonly [number, number]>): number {
  for (let k = 1; k <= n; k++) {
    const col = Array(n).fill(0) as number[]
    const ok = (i: number): boolean => { if (i === n) return true; for (let c = 0; c < k; c++) { if (edges.every(([a, b]) => (a === i && b < i ? col[b] !== c : b === i && a < i ? col[a] !== c : true))) { col[i] = c; if (ok(i + 1)) return true } } return false }
    if (ok(0)) return k
  }
  return n
}

/** KG: a proper colouring gives adjacent vertices different colours; χ(G) is the fewest colours needed; planar graphs need at most 4. */
export function buildGraphColoringScene(): SceneSpec {
  return framed(raw_buildGraphColoringScene())
}
function raw_buildGraphColoringScene(): SceneSpec {
  const { c5, k4 } = COL
  const C = ngon(5, c5.c, c5.R), K = k4Pts(k4.c)
  const cycleEdges: Array<readonly [number, number]> = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  return {
    id: 'math-graph-coloring',
    title: 'Graph colouring: no two neighbours alike',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show proper colourings: colour the vertices so that no edge joins two vertices of the same colour. The 5-cycle cannot be done with two colours (going round, the colours alternate and the fifth vertex clashes with the first) but works with three, so χ(C₅) = 3; K₄, where every vertex touches every other, needs four distinct colours, χ(K₄) = 4 — and the Four Colour Theorem says four always suffice for a planar graph.',
    ariaLabel:
      'Left: a pentagon of five grey dots. In the second step the dots are coloured round the pentagon blue, red, blue, red, green, so no two neighbouring dots match, captioned chi of C 5 equals 3. Right: four dots at the corners of a square with all six lines joining them, coloured blue, red, green and violet, captioned chi of K 4 equals 4, and a heading says planar, 4 colours suffice.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Colour the vertices of the 5-cycle so that neighbours always differ. Alternating two colours round the cycle fails: with 5 vertices the fifth lands next to the first with the same colour.', objects: [...cycleEdges.map(([a, b]) => gEdge(C[a], C[b])), ...C.map((p) => gVert(p))] },
      { narration: 'Three colours work: blue, red, blue, red, and a third colour (green) for the last vertex. No edge joins two vertices of the same colour — a proper colouring — so the fewest colours needed is χ(C₅) = 3.', objects: [...C.map((p, i) => gVert(p, c5.colors[i], 0.26)), label('χ(C₅) = 3', pt([c5.c[0], -2.1]), ROLE.ink, 'primary')] },
      { narration: 'In K₄ every vertex is adjacent to every other, so all four need different colours: χ(K₄) = 4. The Four Colour Theorem says a planar graph (a map) never needs more than 4.', objects: [...K4_EDGES.map(([a, b]) => gEdge(K[a], K[b])), ...K.map((p, i) => gVert(p, k4.colors[i], 0.26)), label('χ(K₄) = 4', pt([k4.c[0], -2.1]), ROLE.ink, 'primary'), label('planar: 4 colours suffice', pt([0, 3.4]), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Planar graph ──────────────────────────────────────────────────────────

/** K₄ drawn without crossings (V = 4, E = 6, F = 4: 4 − 6 + 4 = 2); K₅ drawn as a pentagon with its pentagram has 5 crossings and 10 > 3V − 6 = 9 edges. */
export const PLA = {
  k4: { c: [-2.8, 0.1] as Pt, a: [0, 1.7] as Pt, b: [-1.7, -1.1] as Pt, cc: [1.7, -1.1] as Pt, d: [0, 0] as Pt },
  k5: { c: [2.9, 0.1] as Pt, R: 1.7 },
}
export const planarK4 = (): { V: Pt[]; E: ReadonlyArray<readonly [number, number]>; faces: Pt[] } => {
  const { c, a, b, cc, d } = PLA.k4, sh = (p: Pt): Pt => [p[0] + c[0], p[1] + c[1]]
  const V = [a, b, cc, d].map(sh)
  const E: ReadonlyArray<readonly [number, number]> = [[0, 1], [1, 2], [2, 0], [3, 0], [3, 1], [3, 2]]
  const cen = (i: number, j: number, k: number): Pt => [(V[i][0] + V[j][0] + V[k][0]) / 3, (V[i][1] + V[j][1] + V[k][1]) / 3]
  return { V, E, faces: [cen(3, 0, 1), cen(3, 1, 2), cen(3, 2, 0), [c[0] - 1.9, c[1] + 1.6]] }
}
/** Proper crossing point of two segments, or null when they only touch at an end or miss. */
export function segCross(p1: Pt, p2: Pt, p3: Pt, p4: Pt): Pt | null {
  const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0])
  if (Math.abs(d) < 1e-12) return null
  const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d
  const u = ((p3[0] - p1[0]) * (p2[1] - p1[1]) - (p3[1] - p1[1]) * (p2[0] - p1[0])) / d
  return t > 1e-6 && t < 1 - 1e-6 && u > 1e-6 && u < 1 - 1e-6 ? [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])] : null
}
export const k5Edges = (): Array<readonly [number, number]> => { const out: Array<readonly [number, number]> = []; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) out.push([i, j]); return out }
export const k5Crossings = (V: readonly Pt[]): Pt[] => { const E = k5Edges(), out: Pt[] = []; for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) { const [a, b] = E[i], [c, d] = E[j]; if (new Set([a, b, c, d]).size < 4) continue; const x = segCross(V[a], V[b], V[c], V[d]); if (x) out.push(x) } return out }

/** KG: a planar graph can be drawn without edge crossings; Euler's formula V − E + F = 2; a planar graph has at most 3V − 6 edges. */
export function buildPlanarGraphScene(): SceneSpec {
  return framed(raw_buildPlanarGraphScene())
}
function raw_buildPlanarGraphScene(): SceneSpec {
  const { V, E, faces } = planarK4(), K5 = ngon(5, PLA.k5.c, PLA.k5.R)
  return {
    id: 'math-planar-graph',
    title: 'Planar graphs: Euler\'s formula',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show planarity: K₄ can be drawn with no edge crossing (a triangle with a vertex in the middle) and its 4 vertices, 6 edges and 4 faces (3 inside + the outside) satisfy Euler\'s formula V − E + F = 2, i.e. 4 − 6 + 4 = 2; K₅ drawn as a pentagon with its pentagram has 5 crossings, and indeed a planar graph with V = 5 has at most 3V − 6 = 9 edges but K₅ has 10, so no drawing of K₅ avoids crossings.',
    ariaLabel:
      'Left: four dots, three on the outside forming a triangle and one in the middle joined to all three, six lines in total with no crossing; in the second step the four regions, three inside and one outside, are numbered 1 to 4 and the caption reads 4 minus 6 plus 4 equals 2. Right: five dots on a pentagon joined by all ten lines, which cross each other in five places marked with red dots, captioned K 5, 10 edges, 5 crossings, and planar needs at most 9 edges.',
    stage: NO_STAGE,
    steps: [
      { narration: 'K₄ drawn with one vertex in the middle of a triangle: all 6 edges, and none crosses another. A graph that can be drawn in the plane without crossings is planar.', objects: [...E.map(([a, b]) => gEdge(V[a], V[b])), ...V.map((p) => gVert(p))] },
      { narration: 'The edges cut the plane into faces: three triangles inside and the outside — 4 faces. Euler\'s formula for a connected planar graph: V − E + F = 2, here 4 vertices − 6 edges + 4 faces = 2.', objects: [...faces.map((p, i) => label(String(i + 1), pt(p), ROLE.output, 'primary')), label('4 − 6 + 4 = 2', pt([PLA.k4.c[0], -2.3]), ROLE.result, 'primary')] },
      { narration: 'K₅ (all 10 pairs of 5 vertices) drawn on a pentagon has 5 crossings (red). It cannot be fixed: a planar graph on V vertices has at most 3V − 6 edges, which is 9 for V = 5, but K₅ has 10.', objects: [...k5Edges().map(([a, b]) => gEdge(K5[a], K5[b])), ...K5.map((p) => gVert(p)), ...k5Crossings(K5).map((p) => gVert(p, ROLE.input, 0.1)), label('K₅: 10 edges, 5 crossings', pt([PLA.k5.c[0], -2.3]), ROLE.input, 'primary'), label('planar needs at most 9', pt([PLA.k5.c[0], -3.0]), ROLE.input, 'primary')] },
    ],
  }
}

// ── 10. Stars and bars ───────────────────────────────────────────────────────

/** 5 identical balls (stars) into 3 bins separated by 2 bars: 7 slots, choose 2 for the bars: C(7, 2) = 21 ways. */
export const SB = {
  n: 5, k: 3, slots: 7, dx: 0.7, x0: -2.1,
  rows: [{ y: 1.6, bars: [2, 4] }, { y: 0.4, bars: [0, 6] }, { y: -0.8, bars: [1, 3] }] as ReadonlyArray<{ y: number; bars: readonly number[] }>,
  labelX: 3.2,
}
/** The bin sizes of a stars-and-bars row: stars between the bars. */
export const binsOf = (bars: readonly number[], slots: number): number[] => { const out: number[] = []; let prev = -1; for (const b of [...bars].sort((p, q) => p - q)) { out.push(b - prev - 1); prev = b } out.push(slots - prev - 1); return out }
export const countSolutions = (total: number, k: number, min = 0): number => (k === 1 ? (total >= min ? 1 : 0) : Array.from({ length: total - min + 1 }, (_, v) => v + min).reduce((s, v) => s + countSolutions(total - v, k - 1, min), 0))

/** KG: placing n identical balls in k bins: C(n + k − 1, k − 1) ways; with every bin non-empty, C(n − 1, k − 1). */
export function buildStarsBarsScene(): SceneSpec {
  return framed(raw_buildStarsBarsScene())
}
function raw_buildStarsBarsScene(): SceneSpec {
  const { slots, dx, x0, rows, labelX, n, k } = SB
  const X = (i: number) => x0 + i * dx
  const row = (r: { y: number; bars: readonly number[] }): SceneObject[] => [
    ...Array.from({ length: slots }, (_, i) => (r.bars.includes(i) ? line(P(X(i), r.y - 0.28), P(X(i), r.y + 0.28), ROLE.input, 0.05) : dot(P(X(i), r.y), ROLE.output, 0.14))),
    label(`${binsOf(r.bars, slots).join(' + ')} = ${n}`, P(labelX, r.y), ROLE.ink, 'primary'),
  ]
  return {
    id: 'math-stars-and-bars',
    title: 'Stars and bars: balls into bins',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show stars and bars: 5 identical balls (stars) in 3 bins corresponds to a row of 5 stars and 2 bars (the bars divide the bins), e.g. ★★|★|★★ means 2 + 1 + 2; each way is fixed by which 2 of the 7 slots are bars, so there are C(7, 2) = 21 = C(5 + 3 − 1, 3 − 1) solutions of x₁ + x₂ + x₃ = 5 (and 6 = C(4, 2) if every bin must hold at least one).',
    ariaLabel:
      'Three rows of seven symbols: blue dots for balls and red vertical bars for the dividers. The first row is two dots, a bar, one dot, a bar, two dots, captioned 2 plus 1 plus 2 equals 5. The second is a bar, five dots and a bar, captioned 0 plus 5 plus 0 equals 5. The third is one dot, a bar, one dot, a bar and three dots, captioned 1 plus 1 plus 3 equals 5. Captions say choose 2 of the 7 slots for the bars, C of 7, 2 equals 21, and with every bin non-empty 6 ways.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Put 5 identical balls into 3 bins: write the balls as stars and separate the bins with 2 bars. ★★ | ★ | ★★ means 2 in the first bin, 1 in the second, 2 in the third: 2 + 1 + 2 = 5.', objects: [label('x₁ + x₂ + x₃ = 5', P(0, 2.7), ROLE.output, 'primary'), ...row(rows[0])] },
      { narration: 'Other ways are other arrangements: | ★★★★★ | puts all 5 in the middle bin (0 + 5 + 0) and ★ | ★ | ★★★ gives 1 + 1 + 3. Every way to fill the bins is exactly one row of 5 stars and 2 bars, and vice versa.', objects: [...row(rows[1]), ...row(rows[2])] },
      { narration: 'So count the rows: there are 7 slots (5 stars + 2 bars) and we choose which 2 are bars, C(7, 2) = 21 ways — the number of non-negative solutions of x₁ + x₂ + x₃ = 5, C(n + k − 1, k − 1). If every bin must be non-empty, put one star in each first and only 2 stars remain to place: C(4, 2) = 6.', objects: [label('choose 2 of 7 slots for the bars', P(0, -2.0), ROLE.ink, 'primary'), label('C(7, 2) = 21', P(0, -2.8), ROLE.result, 'primary'), label('with every bin non-empty: 6 ways', P(0, -3.6), ROLE.aid, 'primary')] },
    ],
  }
}
export const starsBarsCount = (n: number, k: number) => choose(n + k - 1, k - 1)

// ── 11. Inclusion–exclusion ──────────────────────────────────────────────────

/** Numbers 1…30: multiples of 2 (|A| = 15), of 3 (|B| = 10), of both = multiples of 6 (5): |A ∪ B| = 15 + 10 − 5 = 20; neither: 10. */
export const INX = { N: 30, a: 2, b: 3, box: VEN.box, regions: { aOnly: [-1.9, 0.1] as Pt, both: [0, 0.1] as Pt, bOnly: [1.9, 0.1] as Pt, neither: [-3.3, -1.9] as Pt } }
export const countMultiples = (N: number, d: number) => Math.floor(N / d)

/** KG: |A ∪ B| = |A| + |B| − |A ∩ B| (and the alternating sum for more sets). */
export function buildInclusionExclusionScene(): SceneSpec {
  return framed(raw_buildInclusionExclusionScene())
}
function raw_buildInclusionExclusionScene(): SceneSpec {
  const { N, a, b, box, regions } = INX
  const A = countMultiples(N, a), B = countMultiples(N, b), AB = countMultiples(N, a * b)
  const union = A + B - AB
  return {
    id: 'math-inclusion-exclusion',
    title: 'Inclusion–exclusion: count the overlap once',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the inclusion–exclusion principle on the numbers 1…30: A = multiples of 2 (15 of them) and B = multiples of 3 (10); adding 15 + 10 = 25 counts the 5 multiples of both (the multiples of 6) twice, so subtract the overlap once: |A ∪ B| = 25 − 5 = 20 numbers are divisible by 2 or 3, and 30 − 20 = 10 by neither.',
    ariaLabel:
      'Two overlapping circles in a rectangle. The left circle is labelled A, multiples of 2, and the right circle B, multiples of 3. The regions hold the counts 10 for only A, 5 for both, 5 for only B and 10 outside both. A green outline marks the overlap. Captions say 15 plus 10 equals 25 counts the overlap twice, then 25 minus 5 equals 20 for the union, and 30 minus 20 is 10 for neither.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Among 1 to 30, A is the multiples of 2 and B the multiples of 3. Counting each region: 10 are multiples of 2 only, 5 of both (the multiples of 6: 6, 12, 18, 24, 30), 5 of 3 only, and 10 of neither.', objects: [...rectLines(box.x0, box.y0, box.x1, box.y1, ROLE.reference, 0.02), curve(arcOf(VEN.A), ROLE.output), curve(arcOf(VEN.B), ROLE.input), label('A: multiples of 2', P(-2.6, 2.9), ROLE.output, 'primary'), label('B: multiples of 3', P(2.6, 2.9), ROLE.input, 'primary'), label(String(A - AB), P(regions.aOnly[0], regions.aOnly[1]), ROLE.ink, 'primary'), label(String(AB), P(regions.both[0], regions.both[1]), ROLE.ink, 'primary'), label(String(B - AB), P(regions.bOnly[0], regions.bOnly[1]), ROLE.ink, 'primary'), label(String(N - union), P(regions.neither[0], regions.neither[1]), ROLE.reference, 'primary')] },
      { narration: 'How many are divisible by 2 or by 3? |A| + |B| = 15 + 10 = 25 — but that counts the 5 multiples of 6 TWICE, once in each circle (green overlap).', objects: [curve(lensOutline(), ROLE.result), label('15 + 10 = 25', P(0, -3.3), ROLE.ink, 'primary')] },
      { narration: 'Subtract the overlap once: |A ∪ B| = |A| + |B| − |A ∩ B| = 15 + 10 − 5 = 20. So 20 of the numbers are divisible by 2 or 3, and the remaining 30 − 20 = 10 by neither.', objects: [label('25 − 5 = 20', P(0, -4.0), ROLE.result, 'primary'), label('neither: 10', P(regions.neither[0] + 0.1, -3.5), ROLE.reference, 'primary')] },
    ],
  }
}
const arcOf = (k: { readonly c: readonly [number, number]; readonly r: number }) => arcPts(k.c[0], k.c[1], k.r, 0, 360, 96)

// ── 12. Asymptotic notation ──────────────────────────────────────────────────

/** f(n) = 3n² + 5n: the ratio f(n)/n² = 3 + 5/n falls to 3 and is at most 4 from n₀ = 5 on, so 3n² ≤ f ≤ 4n² and f = Θ(n²). */
export const ASY = { x0: -4.2, y0: -2.6, ux: 0.8, uy: 0.6, n1: 0.8, nMax: 10, n0: 5, upper: 4, lower: 3 }
export const asyF = (n: number) => 3 * n * n + 5 * n
export const asyRatio = (n: number) => asyF(n) / (n * n)

/** KG: f = O(g) — grows at most as fast; Ω — at least as fast; Θ — the same rate (up to constants, for large n). */
export function buildAsymptoticNotationScene(): SceneSpec {
  return framed(raw_buildAsymptoticNotationScene())
}
function raw_buildAsymptoticNotationScene(): SceneSpec {
  const { x0, y0, ux, uy, n1, nMax, n0, upper, lower } = ASY
  const S = (n: number, r: number): V3 => P(x0 + n * ux, y0 + r * uy)
  return {
    id: 'math-asymptotic-notation',
    title: 'Asymptotic notation: O, Ω and Θ',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show f(n) = 3n² + 5n against g(n) = n² by plotting the RATIO f(n)/n² = 3 + 5/n: it falls toward 3 and is at most 4 from n₀ = 5 on, so 3n² ≤ f(n) ≤ 4n² for n ≥ 5 — f is O(n²) (upper bound c = 4), Ω(n²) (lower bound 3) and therefore Θ(n²); constants and the lower-order 5n do not matter for large n.',
    ariaLabel:
      'A graph of the ratio f of n over n squared against n from 1 to 10: a blue curve that starts high at 8 and falls toward 3. In the second step a violet horizontal line at 4 appears, with a violet vertical line at n zero equals 5 where the curve crosses it; after that the curve stays below the line. In the third step a green horizontal line at 3 appears, below the curve all the way, and the caption says f is theta of n squared: the ratio is squeezed between 3 and 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Compare f(n) = 3n² + 5n with n² by plotting the ratio f(n)/n² = 3 + 5/n (blue). It starts high (8 at n = 1) and falls toward 3: for large n the 5n is negligible next to 3n².', objects: [arrow(S(0, 0), S(nMax + 0.6, 0), ROLE.reference), arrow(S(0, 0), S(0, 8.8), ROLE.reference), curve(sampleMapped(asyRatio, n1, nMax, S, 64), ROLE.output), label('f(n)/n²', pt([x0 + 2.6 * ux, y0 + 6.2 * uy]), ROLE.output, 'primary'), label('n', pt([x0 + (nMax + 0.9) * ux, y0 - 0.1]), ROLE.reference, 'detail')] },
      { narration: 'Upper bound: from n₀ = 5 on the ratio is at most 4 (3 + 5/n ≤ 4 exactly when n ≥ 5), so f(n) ≤ 4n² for n ≥ 5 — f = O(n²) with constant c = 4 and threshold n₀ = 5.', objects: [line(S(0, upper), S(nMax + 0.4, upper), ROLE.aid, 0.025), line(S(n0, 0), S(n0, upper), ROLE.aid, 0.02), label('4', pt([x0 + (nMax + 0.9) * ux, y0 + upper * uy]), ROLE.aid, 'primary'), label('n₀ 5', pt([x0 + n0 * ux, y0 - 0.45]), ROLE.aid, 'primary')] },
      { narration: 'Lower bound: the ratio never drops below 3 (it is 3 + 5/n > 3), so f(n) ≥ 3n² — f = Ω(n²). Squeezed between 3n² and 4n² once n ≥ 5, f grows at exactly the rate of n²: f = Θ(n²).', objects: [line(S(0, lower), S(nMax + 0.4, lower), ROLE.result, 0.025), label('3', pt([x0 + (nMax + 0.9) * ux, y0 + lower * uy]), ROLE.result, 'primary'), label('f is Θ(n²)', pt([x0 + 7.4 * ux, y0 + 6.0 * uy]), ROLE.result, 'primary')] },
    ],
  }
}
