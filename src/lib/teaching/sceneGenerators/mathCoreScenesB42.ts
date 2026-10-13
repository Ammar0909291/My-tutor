/**
 * Core mathematics figures — batch 42 of the mathematics visual campaign (2026-10-13): three graph-theory helpers (invariants,
 * operations, random graphs), two trigonometry helpers (identities, equations), two category-theory helpers (limits, adjunctions) and
 * one numerical-analysis helper (error analysis). The last tier-H batch.
 *
 * Same rules as batches 1-41: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are
 * free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01
 * evaluates the arithmetic in a label left to right, and two labels that end in the same name before "=" must not carry different
 * numbers), no label placed inside a circle or closed curve, no `dot()` with its own text (it always counts as a 18 px card move), and
 * every count, angle, value and error a figure states is re-derived by the test file from the DRAWN dots, lines, arrows and curves.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, arcPts, type V3 } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
export type Frame = { ox: number; oy: number; ux: number; uy: number }
export const at = (f: Frame, x: number, y: number): Pt => [f.ox + x * f.ux, f.oy + y * f.uy]
const mapOf = (f: Frame) => (x: number, y: number): V3 => P(f.ox + x * f.ux, f.oy + y * f.uy)
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 60): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const deg = (a: number) => (a * Math.PI) / 180
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]]
/** The point at distance `d` from `a` towards `b`, and the unit vector a → b. */
const towards = (a: Pt, b: Pt, d: number): Pt => { const v = sub(b, a), n = Math.hypot(v[0], v[1]); return [a[0] + (v[0] * d) / n, a[1] + (v[1] * d) / n] }

// ── 1. Graph invariants ──────────────────────────────────────────────────────

/** One graph: a 5-cycle v0…v4 (v0 on top, clockwise) with the chord v1–v3 and a pendant vertex v5 hanging from v0. */
export const GIN = { c: [-1.4, -0.4] as Pt, R: 2.1, edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [1, 3]] as const }
export const ginV = (i: number): Pt => i < 5 ? [GIN.c[0] + GIN.R * Math.cos(deg(90 - 72 * i)), GIN.c[1] + GIN.R * Math.sin(deg(90 - 72 * i))] : [ginV(0)[0], ginV(0)[1] + 1.5]
/** The degree sequence and the invariants of that graph, computed from the edge list. */
export const ginDegrees = (): number[] => Array.from({ length: 6 }, (_, v) => GIN.edges.filter((e) => e[0] === v || e[1] === v).length)

/** KG: numerical properties preserved under isomorphism — order, size, degree sequence, girth, diameter. */
export function buildGraphInvariantsScene(): SceneSpec {
  return framed(raw_buildGraphInvariantsScene())
}
function raw_buildGraphInvariantsScene(): SceneSpec {
  const edge = (a: number, b: number, color: string, t: number) => ln(ginV(a), ginV(b), color, t)
  const base = GIN.edges.map(([a, b]) => edge(a, b, ROLE.reference, 0.06))
  const verts = Array.from({ length: 6 }, (_, v) => dt(ginV(v), ROLE.ink, 0.16))
  const out = (v: number, d: number): Pt => { const p = ginV(v); if (v === 0) return [p[0] + d, p[1] - 0.1]; const dx = v === 5 ? 0 : p[0] - GIN.c[0], dy = v === 5 ? 1 : p[1] - GIN.c[1], n = Math.hypot(dx, dy); return [p[0] + (dx * d) / n, p[1] + (dy * d) / n] }
  const degs = ginDegrees()
  const sum = degs.reduce((s, d) => s + d, 0)
  return {
    id: 'math-graph-invariants',
    title: 'Graph invariants',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show numbers that describe a graph and do not change if the vertices are renamed. The drawn graph has order n = 6 vertices and size m = ${GIN.edges.length} edges. Its degrees are ${degs.join(', ')}, which add up to ${sum} = 2 × ${GIN.edges.length} because every edge has two ends. Its girth, the length of the shortest cycle, is 3 (the green triangle), and its diameter, the largest distance between two vertices, is 3 (the violet path).`,
    ariaLabel:
      'A graph of six dots: a five-sided cycle with one extra edge across it and one dot hanging above the top corner. The first step captions it order 6 and size 7. The second step writes the degree beside each dot, 3, 3, 3, 2, 2, 1, and the sum 3 plus 3 plus 3 plus 2 plus 2 plus 1 equals 14, which is 2 times 7. The third step marks a green triangle, girth 3, and a violet path of three edges from the hanging dot round the left side to the bottom-left corner, diameter 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'One graph with 6 vertices and 7 edges: its order is n = 6 and its size is m = 7. Any graph isomorphic to it has the same n and m.', objects: [...base, ...verts, lb('order n = 6', [3.3, 2.4], ROLE.output), lb('size m = 7', [3.3, 1.5], ROLE.output)] },
      { narration: 'The degree of each vertex (the number of edges at it): 3, 3, 3, 2, 2, 1. Every edge has two ends, so the degrees add up to 3 + 3 + 3 + 2 + 2 + 1 = 14 = 2 × 7.', objects: [...degs.map((d, v) => lb(String(d), out(v, 0.6), ROLE.input)), lb('3 + 3 + 3 + 2 + 2 + 1 = 14', [0.4, -3.4], ROLE.input), lb('2 × 7 = 14', [3.3, 0.2], ROLE.input)] },
      { narration: 'The girth is the length of the shortest cycle: the green triangle v1 v2 v3 gives girth 3. The diameter is the largest distance between two vertices: the violet path v5 → v0 → v4 → v3 has 3 edges, and no pair of vertices is farther apart, so the diameter is 3.', objects: [edge(1, 2, ROLE.result, 0.1), edge(2, 3, ROLE.result, 0.1), edge(1, 3, ROLE.result, 0.1), edge(5, 0, ROLE.aid, 0.1), edge(0, 4, ROLE.aid, 0.1), edge(4, 3, ROLE.aid, 0.1), lb('girth 3', [3.3, -0.9], ROLE.result), lb('diameter 3', [3.3, -1.8], ROLE.aid)] },
    ],
  }
}

// ── 2. Graph operations ──────────────────────────────────────────────────────

/** G on the vertices 1-4 drawn as a square: 1 top-left, 2 top-right, 3 bottom-right, 4 bottom-left; edges 12, 23, 34, 41 and the diagonal 13. S = {1, 2, 3}. */
export const GOP = { s: 0.9, y: 0.2, xs: [-3.3, 0, 3.3] as const, edges: [[1, 2], [2, 3], [3, 4], [4, 1], [1, 3]] as const, S: [1, 2, 3] as const }
export const gopV = (panel: number, v: number): Pt => { const s = GOP.s, o = GOP.xs[panel]; const q: Record<number, Pt> = { 1: [-s, s], 2: [s, s], 3: [s, -s], 4: [-s, -s] }; return [o + q[v][0], GOP.y + q[v][1]] }
/** The edges of the complement of G: every pair of the four vertices that is not an edge. */
export const gopComplement = (): Array<[number, number]> => {
  const has = (a: number, b: number) => GOP.edges.some((e) => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))
  const out: Array<[number, number]> = []
  for (let a = 1; a <= 4; a++) for (let b = a + 1; b <= 4; b++) if (!has(a, b)) out.push([a, b])
  return out
}

/** KG: a subgraph, the induced subgraph G[S] (all edges between the chosen vertices) and the complement (the opposite edges). */
export function buildGraphOperationsScene(): SceneSpec {
  return framed(raw_buildGraphOperationsScene())
}
function raw_buildGraphOperationsScene(): SceneSpec {
  const edge = (p: number, a: number, b: number, color: string, t = 0.07) => ln(gopV(p, a), gopV(p, b), color, t)
  const num = (p: number, v: number): Pt => { const c = gopV(p, v), o = [GOP.xs[p], GOP.y] as const; return [c[0] + Math.sign(c[0] - o[0]) * 0.45, c[1] + Math.sign(c[1] - o[1]) * 0.45] }
  const panelVerts = (p: number, vs: readonly number[], color: string) => vs.flatMap((v) => [dt(gopV(p, v), color, 0.15), lb(String(v), num(p, v), ROLE.ink)])
  const induced = GOP.edges.filter((e) => GOP.S.includes(e[0] as 1 | 2 | 3) && GOP.S.includes(e[1] as 1 | 2 | 3))
  const comp = gopComplement()
  return {
    id: 'math-graph-operations',
    title: 'Graph operations: subgraph, induced subgraph, complement',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show three new graphs made from one graph G (left) on the vertices 1, 2, 3, 4 with the ${GOP.edges.length} edges 12, 23, 34, 41 and 13. The induced subgraph G[S] on S = {1, 2, 3} keeps every edge of G between those vertices (${induced.length} edges, including 13), while a plain subgraph may leave edges out. The complement has the same vertices and exactly the pairs that are not edges of G: ${comp.length} edge. G and its complement together contain all ${GOP.edges.length} + ${comp.length} = ${GOP.edges.length + comp.length} pairs.`,
    ariaLabel:
      'Three small graphs side by side on four corners of a square, numbered 1 to 4. The left graph G has the four sides of the square and the diagonal from 1 to 3, captioned 5 edges. The second step adds the middle graph on the vertices 1, 2 and 3 only, a green triangle captioned G of S and 3 edges, with S equals 1, 2, 3. The third step adds the right graph, the complement: all four vertices and a single red edge from 2 to 4, captioned complement and 1 edge, with the caption 5 plus 1 equals 6 pairs.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph G: four vertices and five edges — the four sides of the square and the diagonal 1–3.', objects: [...GOP.edges.map(([a, b]) => edge(0, a, b, ROLE.output)), ...panelVerts(0, [1, 2, 3, 4], ROLE.ink), lb('G', [GOP.xs[0], 2.5], ROLE.output), lb('5 edges', [GOP.xs[0], -2.0], ROLE.output)] },
      { narration: 'The induced subgraph G[S] for S = {1, 2, 3}: keep those three vertices and EVERY edge of G between them — 12, 23 and the diagonal 13 (3 edges). A plain subgraph could drop an edge such as 13; the induced one never does.', objects: [...induced.map(([a, b]) => edge(1, a, b, ROLE.result)), ...panelVerts(1, GOP.S, ROLE.ink), lb('G[S]', [GOP.xs[1], 2.5], ROLE.result), lb('3 edges', [GOP.xs[1], -2.0], ROLE.result), lb('S = {1, 2, 3}', [GOP.xs[1], -2.9], ROLE.result)] },
      { narration: 'The complement of G: the same four vertices and exactly the pairs that are NOT edges of G. Only the pair 2–4 is missing from G, so the complement has 1 edge. Together G and its complement use all 5 + 1 = 6 pairs of four vertices.', objects: [...comp.map(([a, b]) => edge(2, a, b, ROLE.input)), ...panelVerts(2, [1, 2, 3, 4], ROLE.ink), lb('complement', [GOP.xs[2], 2.5], ROLE.input), lb('1 edge', [GOP.xs[2], -2.0], ROLE.input), lb('5 + 1 = 6 pairs', [0, -3.8], ROLE.ink)] },
    ],
  }
}

// ── 3. Random graphs ─────────────────────────────────────────────────────────

/** Two panels with the 5 vertices of G(5, p) on a pentagon; all C(5, 2) = 10 possible edges grey; a sample at p = 0.6 (6 edges, connected) and one at p = 0.2 (2 edges, not connected). */
export const RDG = { n: 5, xs: [-2.4, 2.4] as const, y: 1.2, R: 1.5, hi: 0.6, lo: 0.2, axisY: -3.0, axisX0: -4.4, axisX1: 4.4,
  sampleHi: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]] as const, sampleLo: [[0, 1], [2, 3]] as const }
export const rdgV = (panel: number, i: number): Pt => [RDG.xs[panel] + RDG.R * Math.cos(deg(90 - 72 * i)), RDG.y + RDG.R * Math.sin(deg(90 - 72 * i))]
export const rdgAxisX = (p: number) => RDG.axisX0 + (RDG.axisX1 - RDG.axisX0) * p
/** The connectivity threshold of G(n, p): log n / n. */
export const rdgThreshold = () => Math.log(RDG.n) / RDG.n
export const rdgPairs = (): Array<[number, number]> => { const o: Array<[number, number]> = []; for (let a = 0; a < RDG.n; a++) for (let b = a + 1; b < RDG.n; b++) o.push([a, b]); return o }

/** KG: G(n, p) — every possible edge is present independently with probability p; connectivity switches on near p = log n / n. */
export function buildRandomGraphScene(): SceneSpec {
  return framed(raw_buildRandomGraphScene())
}
function raw_buildRandomGraphScene(): SceneSpec {
  const e = (panel: number, a: number, b: number, color: string, t: number) => ln(rdgV(panel, a), rdgV(panel, b), color, t)
  const verts = (panel: number) => Array.from({ length: RDG.n }, (_, i) => dt(rdgV(panel, i), ROLE.ink, 0.15))
  const pairs = rdgPairs()
  const thr = rdgThreshold()
  const f1 = (x: number) => x.toFixed(1), f2 = (x: number) => x.toFixed(2)
  const exp = (p: number) => pairs.length * p
  return {
    id: 'math-random-graph',
    title: 'Random graphs G(n, p)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the random graph G(5, p): the 5 vertices have ${pairs.length} possible edges, and each one is kept independently with probability p. With p = ${RDG.hi} we expect ${pairs.length} × ${RDG.hi} = ${f1(exp(RDG.hi))} edges (this sample has ${RDG.sampleHi.length} and is connected); with p = ${RDG.lo} we expect ${pairs.length} × ${RDG.lo} = ${f1(exp(RDG.lo))} edges (this sample has ${RDG.sampleLo.length} and is not connected). Connectivity switches on near the threshold p = log n / n = log 5 / 5 ≈ ${f2(thr)}, between the two samples.`,
    ariaLabel:
      'Two pentagons of five dots, each with all ten possible edges in grey, captioned 10 possible edges. In the second step the left pentagon keeps six blue edges, captioned chance 0.6, 10 times 0.6 equals 6, connected. In the third step the right pentagon keeps two red edges, captioned chance 0.2, 10 times 0.2 equals 2, not connected, and a number line from 0 to 1 below shows the red 0.2, the violet threshold 0.32 and the blue 0.6 in that order.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Five vertices have C(5, 2) = 10 possible edges (grey). In G(5, p) each one is kept on its own, independently, with probability p.', objects: [...[0, 1].flatMap((panel) => pairs.map(([a, b]) => e(panel, a, b, ROLE.reference, 0.03))), ...verts(0), ...verts(1), lb('10 possible edges', [0, 4.8], ROLE.ink)] },
      { narration: 'Edge chance p = 0.6: about 10 × 0.6 = 6 edges survive. This sample (blue) keeps 6 and is connected — every vertex can reach every other.', objects: [...RDG.sampleHi.map(([a, b]) => e(0, a, b, ROLE.output, 0.08)), lb('chance 0.6', [RDG.xs[0], 3.5], ROLE.output), lb('10 × 0.6 = 6', [RDG.xs[0], -0.6], ROLE.output), lb('connected', [RDG.xs[0], -1.8], ROLE.result)] },
      { narration: 'Edge chance p = 0.2: about 10 × 0.2 = 2 edges survive. This sample (red) keeps 2 and is not connected (vertex 5 is alone). On the line of p-values from 0 to 1 the connectivity threshold log 5 / 5 ≈ 0.32 (violet) lies between 0.2 and 0.6: below it a random graph is almost surely disconnected, above it almost surely connected.', objects: [...RDG.sampleLo.map(([a, b]) => e(1, a, b, ROLE.input, 0.08)), lb('chance 0.2', [RDG.xs[1], 3.5], ROLE.input), lb('10 × 0.2 = 2', [RDG.xs[1], -0.6], ROLE.input), lb('not connected', [RDG.xs[1], -1.8], ROLE.input), ln([RDG.axisX0, RDG.axisY], [RDG.axisX1, RDG.axisY], ROLE.reference, 0.04), dt([rdgAxisX(RDG.lo), RDG.axisY], ROLE.input, 0.16), dt([rdgAxisX(thr), RDG.axisY], ROLE.aid, 0.16), dt([rdgAxisX(RDG.hi), RDG.axisY], ROLE.output, 0.16), lb('0', [RDG.axisX0, -3.6]), lb('1', [RDG.axisX1, -3.6]), lb(`threshold ${f2(thr)}`, [rdgAxisX(thr), -4.3], ROLE.aid)] },
    ],
  }
}

// ── 4. Trigonometric identities ──────────────────────────────────────────────

/** The unit circle (drawn with radius R) at θ = 30°; the double-angle identity sin 2θ = 2 sin θ cos θ. */
export const TID = { c: [-2.1, -0.2] as Pt, R: 2.5, theta: 30, barX: [3.0, 4.2] as const, barBase: -3.9, barScale: 1.8 }
export const tidPt = (a: number): Pt => [TID.c[0] + TID.R * Math.cos(deg(a)), TID.c[1] + TID.R * Math.sin(deg(a))]

/** KG: equations that hold for all valid angles — here sin 2θ = 2 sin θ cos θ, checked at θ = 30° on the unit circle. */
export function buildTrigIdentitiesScene(): SceneSpec {
  return framed(raw_buildTrigIdentitiesScene())
}
function raw_buildTrigIdentitiesScene(): SceneSpec {
  const t = TID.theta, c = TID.c, R = TID.R
  const P1 = tidPt(t), P2 = tidPt(2 * t)
  const s1 = Math.sin(deg(t)), c1 = Math.cos(deg(t)), s2 = Math.sin(deg(2 * t))
  const f1 = (x: number) => x.toFixed(1), f2 = (x: number) => x.toFixed(2)
  const circle = curve(arcPts(c[0], c[1], R, 0, 360, 72), ROLE.reference)
  const axes = [ar([c[0] - R - 0.3, c[1]], [c[0] + R + 0.3, c[1]]), ar([c[0], c[1] - R - 0.3], [c[0], c[1] + R + 0.3])]
  const bar = (x: number, h: number, color: string) => ln([x, TID.barBase], [x, TID.barBase + h * TID.barScale], color, 0.3)
  return {
    id: 'math-trig-identities',
    title: 'A trigonometric identity: sin 2θ = 2 sin θ cos θ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show an identity — true for every angle — checked at one angle on the unit circle. At θ = ${t}° the point of the circle has cos θ = ${f2(c1)} (blue) and sin θ = ${f1(s1)} (red). At 2θ = ${2 * t}° the height of the point is sin 2θ = ${f2(s2)} (green). The identity says sin 2θ = 2 sin θ cos θ, and indeed 2 × ${f1(s1)} × ${f2(c1)} = ${f2(2 * s1 * c1)}: the two bars have the same height.`,
    ariaLabel:
      'A circle with a horizontal and a vertical axis through its centre. In the first step a ray at 30 degrees ends at a dot; a red vertical segment from the axis to the dot is the sine, captioned sin theta equals 0.5, and a blue horizontal segment from the centre is the cosine, captioned cos theta equals 0.87. In the second step a violet ray at 60 degrees ends at a second dot and a green vertical segment is captioned sin 2 theta equals 0.87. In the third step two green bars of equal height appear, labelled left and right, with the caption 2 times 0.5 times 0.87 equals 0.87 under the circle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The unit circle (drawn with radius 2.5) and the angle θ = 30°. The point on the circle at that angle has height sin θ = 0.5 (red) and horizontal distance cos θ = 0.87 (blue) from the centre.', objects: [circle, ...axes, ln(c, P1, ROLE.ink, 0.05), ln([P1[0], c[1]], P1, ROLE.input, 0.08), ln(c, [P1[0], c[1]], ROLE.output, 0.08), dt(P1, ROLE.ink, 0.15), curve(arcPts(c[0], c[1], 0.7, 0, t, 12), ROLE.ink), lb('θ = 30°', [3.0, 3.2], ROLE.ink), lb('sin θ = 0.5', [3.0, 2.3], ROLE.input), lb('cos θ = 0.87', [3.0, 1.4], ROLE.output)] },
      { narration: 'Double the angle: 2θ = 60° (violet ray). The point at 60° has height sin 2θ = 0.87 (green segment) — the left side of the identity.', objects: [ln(c, P2, ROLE.aid, 0.05), ln([P2[0], c[1]], P2, ROLE.result, 0.08), dt(P2, ROLE.aid, 0.15), curve(arcPts(c[0], c[1], 1.0, 0, 2 * t, 20), ROLE.aid), lb('2θ = 60°', [3.0, 0.5], ROLE.aid), lb('sin 2θ = 0.87', [3.0, -0.4], ROLE.result)] },
      { narration: 'The right side of the identity: 2 sin θ cos θ = 2 × 0.5 × 0.87 = 0.87. Both bars (left: sin 2θ, right: 2 sin θ cos θ) have the same height, 0.87 — sin 2θ = 2 sin θ cos θ holds at 30° (and, being an identity, at every angle).', objects: [bar(TID.barX[0], s2, ROLE.result), bar(TID.barX[1], 2 * s1 * c1, ROLE.result), lb('2 × 0.5 × 0.87 = 0.87', [-1.5, -3.7], ROLE.result), lb('left', [TID.barX[0], -4.5], ROLE.result), lb('right', [TID.barX[1], -4.5], ROLE.result)] },
    ],
  }
}

// ── 5. Trigonometric equations ───────────────────────────────────────────────

/** sin x on 0° … 540° (x in degrees, 0.0155 per degree) against the line y = 0.5. */
export const TEQ: Frame = { ox: -4.4, oy: 0, ux: 0.0155, uy: 2.0 }
export const TEQ_LEVEL = 0.5
/** The solutions of sin x = 0.5 up to 540°: the principal value 30° (arcsin 0.5), its mirror 180° − 30°, and 360° further on. */
export const teqSolutions = (): number[] => { const p = (Math.asin(TEQ_LEVEL) * 180) / Math.PI; return [p, 180 - p, p + 360, 180 - p + 360].map((v) => Math.round(v * 1e6) / 1e6) }

/** KG: solve with inverse functions for the principal solution, then add period multiples — sin x = 0.5. */
export function buildTrigEquationsScene(): SceneSpec {
  return framed(raw_buildTrigEquationsScene())
}
function raw_buildTrigEquationsScene(): SceneSpec {
  const sol = teqSolutions()
  const X = (d: number) => at(TEQ, d, 0)[0]
  const level = at(TEQ, 0, TEQ_LEVEL)[1]
  const dotOn = (d: number) => dt(at(TEQ, d, Math.sin(deg(d))), ROLE.result, 0.15)
  const tag = (d: number): SceneObject => lb(`${d}°`, [X(d), -0.65], ROLE.result)
  return {
    id: 'math-trig-equations',
    title: 'Solving a trigonometric equation: sin x = 0.5',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the solutions of sin x = 0.5 are found. The horizontal line y = 0.5 (red) meets the graph of sin x (blue) at x = 30° — the principal solution arcsin 0.5 — and, by the symmetry of the sine about 90°, at 180° − 30° = 150°. The sine repeats every 360°, so the same two solutions come back 360° later, at 390° and 510°, and so on for every period.',
    ariaLabel:
      'The blue graph of the sine curve from 0 to 540 degrees with a red horizontal line at height 0.5. In the first step green dots mark the two crossings in the first period at 30 and 150 degrees, captioned sin x equals 0.5. In the second step a violet vertical line at 90 degrees, the peak, shows the mirror symmetry and the caption 180 minus 30 equals 150. In the third step a violet arrow of one period, captioned period 360 degrees, runs along the axis and two more green dots mark the crossings at 390 and 510 degrees.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of sin x (blue) and the line y = 0.5 (red). Within the first period they meet twice: at x = 30° — the principal solution, arcsin 0.5 — and at x = 150°.', objects: [ar(at(TEQ, -3, 0), at(TEQ, 555, 0)), ar(at(TEQ, 0, -1.25), at(TEQ, 0, 1.3)), lb('x', [4.6, -0.4], ROLE.ink), curveOf(TEQ, (d) => Math.sin(deg(d)), 0, 540, ROLE.output, 120), ln(at(TEQ, 0, TEQ_LEVEL), at(TEQ, 540, TEQ_LEVEL), ROLE.input, 0.04), dotOn(sol[0]), dotOn(sol[1]), tag(sol[0]), tag(sol[1]), lb('sin x = 0.5', [-2.9, 3.3], ROLE.input)] },
      { narration: 'Why 150°? The sine is symmetric about its peak at 90° (violet), so the mirror image of 30° is 180° − 30° = 150°.', objects: [ln(at(TEQ, 90, 0), at(TEQ, 90, 1), ROLE.aid, 0.04), lb('180° − 30° = 150°', [0.9, 3.3], ROLE.aid)] },
      { narration: 'The sine repeats every 360°, so each solution returns one period later: 30° + 360° = 390° and 150° + 360° = 510° (green) — and so on. The general solution is 30° + 360°k or 150° + 360°k.', objects: [dotOn(sol[2]), dotOn(sol[3]), tag(sol[2]), tag(sol[3]), ar(at(TEQ, sol[0], -1.3), at(TEQ, sol[2], -1.3), ROLE.aid), lb('period 360°', [(X(sol[0]) + X(sol[2])) / 2, level - 4.6], ROLE.aid)] },
    ],
  }
}

// ── 6. Limits (the product as a limit) ───────────────────────────────────────

/** A = {1, 2} down the left, B = {a, b} along the top; the product A × B is the 2 × 2 grid where a row of A meets a column of B. */
export const LIM = { aX: -1.4, aY: [1.2, -1.4] as const, bY: 2.8, bX: [0.6, 2.6] as const, c: [-4.2, 2.6] as Pt, target: { f: 1, g: 0 } as const }
export const limPair = (i: number, j: number): Pt => [LIM.bX[j], LIM.aY[i]]

/** KG: a limit is a universal cone; the product A × B is the limit of the two-object diagram — here for the sets A = {1, 2}, B = {a, b}. */
export function buildLimitsScene(): SceneSpec {
  return framed(raw_buildLimitsScene())
}
function raw_buildLimitsScene(): SceneSpec {
  const Ai = (i: number): Pt => [LIM.aX, LIM.aY[i]]
  const Bj = (j: number): Pt => [LIM.bX[j], LIM.bY]
  const rows = LIM.aY.map((_, i) => ln(Ai(i), [LIM.bX[1] + 0.6, LIM.aY[i]], ROLE.output, 0.03))
  const cols = LIM.bX.map((_, j) => ln(Bj(j), [LIM.bX[j], LIM.aY[1] - 0.5], ROLE.input, 0.03))
  const pairs = LIM.aY.flatMap((_, i) => LIM.bX.map((_, j) => dt(limPair(i, j), ROLE.ink, 0.15)))
  const hit = limPair(LIM.target.f, LIM.target.g)
  const c = LIM.c
  return {
    id: 'math-limits',
    title: 'A limit: the product as a universal cone',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a limit as a universal cone, in the simplest case — a product. The diagram is just two objects, the sets A = {1, 2} (blue, left) and B = {a, b} (red, top). Their product A × B has one element for each choice of an element of A and an element of B: 2 × 2 = 4 pairs, where a row of A meets a column of B. Its two projections read off the row and the column. Any other cone C with maps f: C → A and g: C → B factors through the product by exactly one map u; here the element c with f(c) = 2 and g(c) = a goes to the pair (2, a).',
    ariaLabel:
      'Two blue dots down the left, numbered 1 and 2, form the set A, and two red dots along the top, labelled a and b, form the set B. In the second step a blue horizontal line runs from each blue dot and a red vertical line from each red dot; four grey dots mark the four places where a row meets a column, captioned A times B and 2 times 2 equals 4 pairs. In the third step a violet dot c at the far left sends a violet arrow f to dot 2 and a violet arrow g to dot a, and a green arrow, captioned unique u, to the pair 2, a.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The diagram: two sets with no maps between them — A = {1, 2} (blue) and B = {a, b} (red).', objects: [dt(Ai(0), ROLE.output, 0.15), dt(Ai(1), ROLE.output, 0.15), dt(Bj(0), ROLE.input, 0.15), dt(Bj(1), ROLE.input, 0.15), lb('1', [LIM.aX, LIM.aY[0] + 0.5], ROLE.output), lb('2', [LIM.aX, LIM.aY[1] + 0.5], ROLE.output), lb('a', [LIM.bX[0], LIM.bY + 0.5], ROLE.input), lb('b', [LIM.bX[1], LIM.bY + 0.5], ROLE.input), lb('A', [-2.3, LIM.aY[1]], ROLE.output), lb('B', [4.2, LIM.bY], ROLE.input)] },
      { narration: 'The product A × B: one element for every pair (row of A, column of B) — a grid with 2 × 2 = 4 pairs. The two projections read the row (blue) and the column (red) of a pair.', objects: [...rows, ...cols, ...pairs, lb('A × B', [2.0, -2.7], ROLE.ink), lb('2 × 2 = 4 pairs', [2.0, -3.6], ROLE.ink)] },
      { narration: 'Any other cone: a set C = {c} with a map f to A (c ↦ 2) and a map g to B (c ↦ a), in violet. They factor through the product by exactly one map u (green): u(c) must be the pair whose row is f(c) = 2 and whose column is g(c) = a — the pair (2, a). That uniqueness is what makes A × B the limit.', objects: [dt(c, ROLE.aid, 0.16), lb('c', [c[0], c[1] + 0.55], ROLE.aid), ar(towards(c, Ai(LIM.target.f), 0.3), towards(Ai(LIM.target.f), c, 0.28), ROLE.aid), ar(towards(c, Bj(LIM.target.g), 0.3), towards(Bj(LIM.target.g), c, 0.28), ROLE.aid), ar(towards(c, hit, 0.3), towards(hit, c, 0.28), ROLE.result), dt(hit, ROLE.result, 0.2), lb('f', [-3.5, 0.4], ROLE.aid), lb('g', [-1.8, 3.35], ROLE.aid), lb('unique u', [-0.9, -2.4], ROLE.result)] },
    ],
  }
}

// ── 7. Adjunction ────────────────────────────────────────────────────────────

/** A = {x, y}, B = Z/3 (UB = {0, 1, 2}), F A = the free group on x and y: a map A → UB is a pair of values (x ↦ i, y ↦ j), and so is a homomorphism FA → B. */
export const ADJ = { xs: [[-4.0, -3.1, -2.2], [2.2, 3.1, 4.0]] as const, ys: [-0.8, 0.2, 1.2] as const, pick: [2, 0] as const, arrow: { from: -1.5, to: 1.5, y: 0.2 } }
export const adjDot = (side: number, i: number, j: number): Pt => [ADJ.xs[side][i], ADJ.ys[j]]

/** KG: F ⊣ G iff Hom(FA, B) ≅ Hom(A, GB) naturally — free group ⊣ underlying set; both sides have 3 × 3 = 9 elements here. */
export function buildAdjunctionScene(): SceneSpec {
  return framed(raw_buildAdjunctionScene())
}
function raw_buildAdjunctionScene(): SceneSpec {
  const grid = (side: number, color: string) => ADJ.ys.flatMap((_, j) => ADJ.xs[side].map((_, i) => dt(adjDot(side, i, j), color, 0.14)))
  const [pi, pj] = ADJ.pick
  return {
    id: 'math-adjunction',
    title: 'An adjunction: Hom(FA, B) ≅ Hom(A, GB)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an adjunction by counting. F sends a set A to the free group on A, and G sends a group B to its underlying set. For A = {x, y} and B = Z/3 = {0, 1, 2}: a plain map A → GB is a choice of the images of x and y, 3 × 3 = 9 maps (left grid). A group homomorphism FA → B is also determined by exactly the images of the two generators x and y — again 3 × 3 = 9 homomorphisms (right grid). Matching them one to one, φ ↦ φ restricted to {x, y}, is the natural bijection Hom(FA, B) ≅ Hom(A, GB) that says F ⊣ G.',
    ariaLabel:
      'A grid of nine blue dots, three columns by three rows, on the left, captioned Hom of A and U B, with the numbers 0, 1, 2 under the columns and beside the rows and the caption 3 times 3 equals 9. In the second step a matching grid of nine red dots on the right is captioned Hom of F A and B. In the third step a violet arrow between the grids carries the captions natural and F adjoint to G, and one dot in each grid, in the same column and row, turns green.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Maps of sets A → GB, where A = {x, y} and GB = {0, 1, 2}: a choice of the image of x (column) and of y (row) — 3 × 3 = 9 maps (blue).', objects: [...grid(0, ROLE.output), ...[0, 1, 2].map((i) => lb(String(i), [ADJ.xs[0][i], -1.6], ROLE.output)), ...[0, 1, 2].map((j) => lb(String(j), [-4.7, ADJ.ys[j]], ROLE.output)), lb('Hom(A, GB)', [-3.1, 2.4], ROLE.output), lb('x ↦ column, y ↦ row', [-3.1, -2.5], ROLE.output), lb('3 × 3 = 9', [-3.1, -3.3], ROLE.output)] },
      { narration: 'Group homomorphisms FA → B, where FA is the free group on x and y: such a homomorphism is DETERMINED by where it sends the generators x and y, and any choice works — again 3 × 3 = 9 homomorphisms (red).', objects: [...grid(1, ROLE.input), lb('Hom(FA, B)', [3.1, 2.4], ROLE.input)] },
      { narration: 'Matching each homomorphism with its restriction to {x, y} pairs up the two grids one to one, naturally in A and B: Hom(FA, B) ≅ Hom(A, GB). That is the statement F ⊣ G. One pair is highlighted (green): x ↦ 2, y ↦ 0.', objects: [ar([ADJ.arrow.from, ADJ.arrow.y], [ADJ.arrow.to, ADJ.arrow.y], ROLE.aid), lb('natural ≅', [-0.05, 0.95], ROLE.aid), lb('F ⊣ G', [-0.05, -0.55], ROLE.aid), dt(adjDot(0, pi, pj), ROLE.result, 0.2), dt(adjDot(1, pi, pj), ROLE.result, 0.2)] },
    ],
  }
}

// ── 8. Error analysis ────────────────────────────────────────────────────────

/** A magnified number line: 1600 world units per 1 (1.6 per 0.001), π at x = 0.5. Two approximations of π: 3.14 and 22/7. */
export const ERR = { x0: 0.5, per: 1600, exact: Math.PI, a1: 3.14, a2: 22 / 7 }
export const errX = (v: number) => ERR.x0 + (v - ERR.exact) * ERR.per
export const errAbs = (v: number) => Math.abs(v - ERR.exact)
export const errRel = (v: number) => errAbs(v) / Math.abs(ERR.exact)

/** KG: absolute error |x̂ − x| and relative error |x̂ − x| / |x| — here for x = π approximated by 3.14 and by 22 / 7. */
export function buildErrorAnalysisScene(): SceneSpec {
  return framed(raw_buildErrorAnalysisScene())
}
function raw_buildErrorAnalysisScene(): SceneSpec {
  const a1 = errAbs(ERR.a1).toFixed(5), a2 = errAbs(ERR.a2).toFixed(5)
  const r1 = errRel(ERR.a1).toFixed(6), r2 = errRel(ERR.a2).toFixed(6)
  const ticks = [3.139, 3.14, 3.141, 3.142, 3.143].map((v) => ln([errX(v), -0.18], [errX(v), 0.18], ROLE.reference, 0.04))
  const bracket = (v: number, color: string): SceneObject[] => {
    const x0 = Math.min(errX(v), ERR.x0), x1 = Math.max(errX(v), ERR.x0)
    return [ln([x0, -0.6], [x1, -0.6], color, 0.07), ln([x0, -0.4], [x0, -0.8], color, 0.07), ln([x1, -0.4], [x1, -0.8], color, 0.07)]
  }
  return {
    id: 'math-error-analysis',
    title: 'Error analysis: absolute and relative error',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the two measures of how wrong an approximation x̂ of x is, on a magnified number line (one tick = 0.001) around x = π ≈ 3.14159. The approximation x̂ = 3.14 has the absolute error |x̂ − x| = ${a1} ≈ 0.00159 (the red bracket) and the relative error |x̂ − x| / |x| = ${a1} / 3.14159 ≈ ${r1}. The better approximation x̂ = 22 / 7 has the absolute error ${a2} ≈ 0.00126 and the relative error ${r2}. The relative error divides by the size of x, so it measures the error in proportion.`,
    ariaLabel:
      'A magnified number line with five tick marks one thousandth apart and a green dot for pi in the middle. The second step puts a blue dot for 3.14 left of pi, a red bracket between them captioned error 0.00159, and the caption relative 0.000507. The third step puts a violet dot for 22 over 7 right of pi, a violet bracket between them captioned error 0.00126 and the caption relative 0.000402.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A magnified number line around the exact value x = π ≈ 3.14159 (green); one tick is 0.001.', objects: [ln([errX(3.1385), 0], [errX(3.1435), 0], ROLE.reference, 0.05), ...ticks, dt([errX(ERR.exact), 0], ROLE.result, 0.17), lb('x = π', [errX(ERR.exact), 0.75], ROLE.result), lb('1 tick = 0.001', [0.5, -3.6], ROLE.reference)] },
      { narration: 'The approximation x̂ = 3.14 (blue). The absolute error is the distance |x̂ − x| ≈ 0.00159 (red bracket). The relative error divides it by the size of x: 0.00159 / 3.14159 ≈ 0.000507.', objects: [dt([errX(ERR.a1), 0], ROLE.output, 0.17), lb('3.14', [errX(ERR.a1), 0.75], ROLE.output), ...bracket(ERR.a1, ROLE.input), lb(`error ${errAbs(ERR.a1).toFixed(5)}`, [-1.7, -1.4], ROLE.input), lb(`relative ${r1}`, [-1.7, -2.3], ROLE.input)] },
      { narration: 'A better approximation: x̂ = 22 / 7 ≈ 3.142857 (violet) is closer, with the absolute error ≈ 0.00126 and the relative error ≈ 0.000402 — both smaller than for 3.14.', objects: [dt([errX(ERR.a2), 0], ROLE.aid, 0.17), lb('22 / 7', [errX(ERR.a2), 0.75], ROLE.aid), ...bracket(ERR.a2, ROLE.aid), lb(`error ${a2}`, [2.4, -1.4], ROLE.aid), lb(`relative ${r2}`, [2.4, -2.3], ROLE.aid)] },
    ],
  }
}
