/**
 * Core mathematics figures — batch 21 of the mathematics visual campaign (2026-10-12): Boolean
 * circuits, vertex / edge connectivity (Menger), maximum flow, matchings, and nine figures of real
 * analysis (supremum and infimum, convergence of a sequence, Cauchy sequences, open and closed sets,
 * ε–δ continuity, uniform continuity, the Riemann integral by Darboux sums, uniform convergence,
 * pointwise convergence).
 *
 * Same rules as batches 1-20: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5,
 * at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a
 * label left to right and compares labels that share a last token before "="), and every number drawn
 * comes from the constants and pure helpers exported here, which the test file re-derives from the
 * DRAWN coordinates (a circuit is simulated from its drawn wires, graphs are rebuilt from drawn dots
 * and lines, sequences and curves are read back and checked against their formula).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, shadeConvex, arcPts, type V3 } from './mathSceneKit'
import { ngon } from './mathCoreScenesB18'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 24): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const outward = (p: Pt, c: Pt, d: number): Pt => { const l = Math.hypot(p[0] - c[0], p[1] - c[1]) || 1; return [p[0] + ((p[0] - c[0]) / l) * d, p[1] + ((p[1] - c[1]) / l) * d] }
/** A curve y = fn(x) on [x0, x1] drawn through a mapping (x, y) -> screen. */
const plot = (fn: (x: number) => number, x0: number, x1: number, map: (x: number, y: number) => Pt, color: string, n = 72): SceneObject => curve(Array.from({ length: n + 1 }, (_, i) => { const x = x0 + ((x1 - x0) * i) / n, m = map(x, fn(x)); return P(m[0], m[1]) as V3 }), color)

// ── 1. Boolean circuits ──────────────────────────────────────────────────────

export type GateKind = 'AND' | 'OR' | 'NOT'
/** Input and output pins of a gate symbol centred at c (the wires of a circuit end exactly on these). */
export const gatePins = (kind: GateKind, c: Pt): { in: Pt[]; out: Pt } =>
  kind === 'AND' ? { in: [[c[0] - 0.5, c[1] + 0.2], [c[0] - 0.5, c[1] - 0.2]], out: [c[0] + 0.4, c[1]] }
    : kind === 'OR' ? { in: [[c[0] - 0.39, c[1] + 0.2], [c[0] - 0.39, c[1] - 0.2]], out: [c[0] + 0.5, c[1]] }
      : { in: [[c[0] - 0.4, c[1]]], out: [c[0] + 0.46, c[1]] }

/** The standard distinctive-shape symbols: D for AND, curved arrowhead for OR, triangle with a bubble for NOT. */
export function gateShape(kind: GateKind, c: Pt, color: string = ROLE.ink): SceneObject[] {
  const t = 0.04
  if (kind === 'AND') return [ln([c[0] - 0.5, c[1] + 0.4], [c[0], c[1] + 0.4], color, t), ln([c[0] - 0.5, c[1] - 0.4], [c[0], c[1] - 0.4], color, t), ln([c[0] - 0.5, c[1] - 0.4], [c[0] - 0.5, c[1] + 0.4], color, t), curve(arcPts(c[0], c[1], 0.4, -90, 90, 16), color)]
  if (kind === 'OR') {
    const top: V3[] = [], bot: V3[] = [], back: V3[] = []
    for (let i = 0; i <= 14; i++) {
      const u = i / 14, s = -1 + (2 * i) / 14
      top.push(P(c[0] - 0.5 + u, c[1] + 0.4 * (1 - u * u))); bot.push(P(c[0] - 0.5 + u, c[1] - 0.4 * (1 - u * u))); back.push(P(c[0] - 0.5 + 0.15 * (1 - s * s), c[1] + 0.4 * s))
    }
    return [curve(top, color), curve(bot, color), curve(back, color)]
  }
  return [ln([c[0] - 0.4, c[1] + 0.35], [c[0] - 0.4, c[1] - 0.35], color, t), ln([c[0] - 0.4, c[1] + 0.35], [c[0] + 0.3, c[1]], color, t), ln([c[0] - 0.4, c[1] - 0.35], [c[0] + 0.3, c[1]], color, t), curve(arcPts(c[0] + 0.38, c[1], 0.08, 0, 360, 16), color)]
}

/** XOR built from OR, AND, NOT, AND: Y = (A OR B) AND NOT(A AND B). Wires are straight segments that end ON gate pins. */
export const BC = {
  symbols: [{ kind: 'AND' as GateKind, c: [-3.2, 3.4] as Pt }, { kind: 'OR' as GateKind, c: [-0.4, 3.4] as Pt }, { kind: 'NOT' as GateKind, c: [2.4, 3.4] as Pt }],
  gates: [
    { id: 'or', kind: 'OR' as GateKind, c: [-1.8, 0.7] as Pt },
    { id: 'and1', kind: 'AND' as GateKind, c: [-1.8, -1.5] as Pt },
    { id: 'not', kind: 'NOT' as GateKind, c: [0.1, -1.5] as Pt },
    { id: 'and2', kind: 'AND' as GateKind, c: [1.6, -0.3] as Pt },
  ],
  terminals: { A: [-4.3, -0.1] as Pt, B: [-4.3, -0.9] as Pt, Y: [2.5, -0.3] as Pt },
  junctions: [[-3.6, -0.1], [-3.0, -0.9]] as ReadonlyArray<Pt>,
  table: { x: [3.55, 4.1, 4.65] as readonly number[], head: 1.4, rows: [0.6, -0.2, -1.0, -1.8] as readonly number[] },
}
const gatePinOf = (id: string) => { const g = BC.gates.find((x) => x.id === id)!; return gatePins(g.kind, g.c) }
/** The wire segments (a segment ends at a pin, a terminal, a junction or a bend; two wires that merely cross share no endpoint). */
export const BC_WIRES: ReadonlyArray<readonly [Pt, Pt]> = (() => {
  const or = gatePinOf('or'), and1 = gatePinOf('and1'), not = gatePinOf('not'), and2 = gatePinOf('and2')
  const A = BC.terminals.A, B = BC.terminals.B, Y = BC.terminals.Y
  return [
    [A, [-3.6, -0.1]], [[-3.6, -0.1], [-3.6, 0.9]], [[-3.6, 0.9], or.in[0]], [[-3.6, -0.1], [-3.6, -1.3]], [[-3.6, -1.3], and1.in[0]],
    [B, [-3.0, -0.9]], [[-3.0, -0.9], [-3.0, 0.5]], [[-3.0, 0.5], or.in[1]], [[-3.0, -0.9], [-3.0, -1.7]], [[-3.0, -1.7], and1.in[1]],
    [or.out, [0.7, 0.7]], [[0.7, 0.7], [0.7, -0.1]], [[0.7, -0.1], and2.in[0]],
    [and1.out, not.in[0]],
    [not.out, [0.9, -1.5]], [[0.9, -1.5], [0.9, -0.5]], [[0.9, -0.5], and2.in[1]],
    [and2.out, Y],
  ]
})()
/** Simulate the circuit: the netlist is DERIVED from the wire segments (so a mis-drawn wire changes the answer). */
export function simulateCircuit(A: number, B: number, wires: ReadonlyArray<readonly [Pt, Pt]> = BC_WIRES): number {
  const key = (p: Pt) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`
  const parent = new Map<string, string>()
  const find = (k: string): string => { if (!parent.has(k)) parent.set(k, k); const p = parent.get(k)!; if (p === k) return k; const r = find(p); parent.set(k, r); return r }
  for (const [a, b] of wires) parent.set(find(key(a)), find(key(b)))
  const net = (p: Pt) => find(key(p))
  const val = new Map<string, number>([[net(BC.terminals.A), A], [net(BC.terminals.B), B]])
  for (let pass = 0; pass < 6; pass++) for (const g of BC.gates) {
    const pins = gatePins(g.kind, g.c), ins = pins.in.map((p) => val.get(net(p)))
    if (ins.some((v) => v === undefined)) continue
    const [x, y] = ins as number[]
    val.set(net(pins.out), g.kind === 'AND' ? x & y : g.kind === 'OR' ? x | y : 1 - x)
  }
  return val.get(net(BC.terminals.Y)) as number
}

/** KG: Boolean functions built from AND, OR, NOT gates; every Boolean function has a circuit. */
export function buildBooleanCircuitsScene(): SceneSpec {
  return framed(raw_buildBooleanCircuitsScene())
}
function raw_buildBooleanCircuitsScene(): SceneSpec {
  const { symbols, gates, terminals, junctions, table } = BC
  const seen = new Set<string>(), wires: SceneObject[] = []
  for (const [a, b] of BC_WIRES) { const k = `${a}|${b}`; if (!seen.has(k)) { seen.add(k); wires.push(ln(a, b, ROLE.reference, 0.03)) } }
  const rowIn = [[0, 0], [0, 1], [1, 0], [1, 1]]
  return {
    id: 'math-boolean-circuits',
    title: 'Boolean circuits and logic gates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three basic gates (AND gives 1 only if both inputs are 1, OR gives 1 if at least one is, NOT flips its input), then wire four of them into a circuit for the exclusive-or Y = (A OR B) AND NOT(A AND B) and read its truth table: Y is 1 exactly when A and B differ (0, 1, 1, 0). Every Boolean function can be built this way from AND, OR and NOT.',
    ariaLabel:
      'Top row: the three standard gate symbols labelled AND, OR and NOT. Below, a circuit: inputs A and B each feed an OR gate and an AND gate; the AND output goes through a NOT gate; the OR output and the NOT output feed a second AND gate whose output is Y. At the right a truth table with columns A, B, Y: rows 0 0 give 0, 0 1 give 1, 1 0 give 1 and 1 1 give 0, captioned Y equals A XOR B.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three basic gates: AND outputs 1 only when BOTH inputs are 1, OR outputs 1 when AT LEAST ONE input is 1, and NOT (a triangle with a bubble) flips a single input, 0 to 1 and 1 to 0.', objects: [...symbols.flatMap((s) => gateShape(s.kind, s.c)), ...symbols.map((s) => lb(s.kind, [s.c[0], s.c[1] - 0.75]))] },
      { narration: 'Wire gates together: A and B both go to an OR gate and an AND gate; the AND output passes through a NOT (making a NAND), and the OR output and the NAND output meet in a second AND. A dot marks a join; wires that cross without a dot are not connected.', objects: [...gates.flatMap((g) => gateShape(g.kind, g.c)), ...wires, ...junctions.map((j) => dt(j, ROLE.ink, 0.07)), lb('A', [terminals.A[0] - 0.35, terminals.A[1]]), lb('B', [terminals.B[0] - 0.35, terminals.B[1]]), lb('Y', [terminals.Y[0] + 0.35, terminals.Y[1]], ROLE.result)] },
      { narration: 'Feed in every input pair and follow the wires: the circuit outputs 0, 1, 1, 0. Y is 1 exactly when A and B differ — the exclusive-or. Any truth table can be wired this way (one AND per row that outputs 1, then OR them together), which is why AND, OR and NOT are enough.', objects: [lb('A', [table.x[0], table.head]), lb('B', [table.x[1], table.head]), lb('Y', [table.x[2], table.head], ROLE.result), ...rowIn.flatMap(([a, b], i) => [lb(String(a), [table.x[0], table.rows[i]]), lb(String(b), [table.x[1], table.rows[i]]), lb(String(simulateCircuit(a, b)), [table.x[2], table.rows[i]], ROLE.result)]), lb('Y = A XOR B', [0.6, -3.1], ROLE.result)] },
    ],
  }
}

// ── 2. Vertex and edge connectivity (Menger) ─────────────────────────────────

/** The 6-cycle a-b-c-d-e-f with the chord a-d: κ = λ = δ = 2. Three copies: a vertex cut, an edge cut and two disjoint paths. */
export const KAP = {
  R: 1.1, centers: [[-2.5, 2.0], [2.5, 2.0], [0, -2.0]] as ReadonlyArray<Pt>, names: ['a', 'b', 'c', 'd', 'e', 'f'],
  edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3]] as ReadonlyArray<readonly [number, number]>,
  cutV: [0, 3] as readonly number[], cutE: [[0, 1], [2, 3]] as ReadonlyArray<readonly [number, number]>,
  pathA: [1, 0, 5, 4] as readonly number[], pathB: [1, 2, 3, 4] as readonly number[],
}
export const kapPoints = (panel: number): Pt[] => ngon(6, KAP.centers[panel], KAP.R)

/** KG: κ(G) = least vertices whose removal disconnects, λ(G) = least edges, κ ≤ λ ≤ δ; Menger: κ = most internally disjoint paths. */
export function buildVertexConnectivityScene(): SceneSpec {
  return framed(raw_buildVertexConnectivityScene())
}
function raw_buildVertexConnectivityScene(): SceneSpec {
  const { centers, names, edges, cutV, cutE, pathA, pathB } = KAP
  const cap = (panel: number): Pt => [centers[panel][0], centers[panel][1] - 2.25]
  const base = (panel: number, vcolor: (i: number) => string, vr: (i: number) => number): SceneObject[] => {
    const V = kapPoints(panel), c = centers[panel]
    return [...edges.map(([a, b]) => ln(V[a], V[b], ROLE.reference, 0.04)), ...V.map((p, i) => dt(p, vcolor(i), vr(i))), ...V.map((p, i) => lb(names[i], outward(p, c, 0.42)))]
  }
  const V0 = kapPoints(0), V1 = kapPoints(1), V2 = kapPoints(2)
  const comp = (i: number) => (i === 1 || i === 2 ? ROLE.output : i === 4 || i === 5 ? ROLE.result : ROLE.input)
  const path = (V: Pt[], p: readonly number[], color: string) => p.slice(0, -1).map((v, i) => ln(V[v], V[p[i + 1]], color, 0.09))
  return {
    id: 'math-vertex-connectivity',
    title: 'Connectivity κ and λ, Menger\'s theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show connectivity numbers on one graph (a 6-cycle a…f with the chord a–d): removing the 2 red vertices a, d splits it into {b, c} and {e, f} (vertex connectivity κ = 2, no single vertex does it); removing the 2 red edges a–b and c–d cuts {b, c} off (edge connectivity λ = 2); the minimum degree is δ = 2, so κ ≤ λ ≤ δ is 2 ≤ 2 ≤ 2; and Menger\'s theorem says the most internally disjoint paths between b and e (b–a–f–e and b–c–d–e) equals the fewest vertices that separate them, 2.',
    ariaLabel:
      'Three copies of the same graph, a hexagon of six dots a to f clockwise from the top with a chord from a to d. Left: the dots a and d are red; the dots b and c form one blue pair and e and f one green pair with no edge between the pairs, captioned kappa equals 2. Middle: the edges a to b and c to d are drawn thick red, cutting the pair b and c off, captioned lambda equals 2. Right: two thick paths from b to e, b a f e in blue and b c d e in green, sharing no vertex, captioned 2 disjoint paths. A last caption reads 2 is at most 2 is at most 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Vertex connectivity κ: the fewest vertices whose removal disconnects the graph. Remove a and d (red) and what is left falls apart into {b, c} (blue) and {e, f} (green). No single vertex does this, so κ = 2.', objects: [...base(0, (i) => (cutV.includes(i) ? ROLE.input : comp(i)), (i) => (cutV.includes(i) ? 0.24 : 0.16)), ln(V0[1], V0[2], ROLE.output, 0.09), ln(V0[4], V0[5], ROLE.result, 0.09), lb('κ = 2', cap(0))] },
      { narration: 'Edge connectivity λ: the fewest EDGES whose removal disconnects it. Cutting a–b and c–d (red) isolates {b, c}; no single edge is enough, so λ = 2. Every vertex has degree at least 2 (the minimum degree δ is 2), and κ ≤ λ ≤ δ.', objects: [...base(1, (i) => (i === 1 || i === 2 ? ROLE.output : ROLE.ink), () => 0.16), ...cutE.map(([a, b]) => ln(V1[a], V1[b], ROLE.input, 0.1)), lb('λ = 2', cap(1)), lb('2 ≤ 2 ≤ 2', [0, 0.35], ROLE.aid)] },
      { narration: 'Menger\'s theorem: the largest number of paths from b to e that share no inner vertex equals the fewest vertices separating b from e. Here b–a–f–e (blue) and b–c–d–e (green) are two such paths, matching the 2-vertex cut {a, d}.', objects: [...base(2, (i) => (i === 1 || i === 4 ? ROLE.input : ROLE.ink), (i) => (i === 1 || i === 4 ? 0.22 : 0.16)), ...path(V2, pathA, ROLE.output), ...path(V2, pathB, ROLE.result), lb('2 disjoint paths', cap(2))] },
    ],
  }
}

// ── 3. Maximum flow ──────────────────────────────────────────────────────────

/** A network s → a, b → t with capacities; a maximum flow of 4 saturates the two edges into t, which form a minimum cut of capacity 4. */
export const MF = {
  V: { s: [-4.0, 0], a: [-0.9, 1.9], b: [-0.9, -1.9], t: [2.6, 0] } as Record<string, Pt>, r: 0.22, cutX: 1.2,
  edges: [
    { u: 's', v: 'a', cap: 3, flow: 3 }, { u: 's', v: 'b', cap: 3, flow: 1 }, { u: 'a', v: 'b', cap: 1, flow: 1 },
    { u: 'a', v: 't', cap: 2, flow: 2 }, { u: 'b', v: 't', cap: 2, flow: 2 },
  ] as ReadonlyArray<{ u: string; v: string; cap: number; flow: number }>,
}
const mfDir = (e: { u: string; v: string }): { a: Pt; b: Pt; n: Pt } => {
  const a = MF.V[e.u], b = MF.V[e.v], l = Math.hypot(b[0] - a[0], b[1] - a[1]), d: Pt = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]
  return { a: [a[0] + d[0] * (MF.r + 0.04), a[1] + d[1] * (MF.r + 0.04)], b: [b[0] - d[0] * (MF.r + 0.04), b[1] - d[1] * (MF.r + 0.04)], n: [-d[1], d[0]] }
}
/** Where an edge's capacity (side +1, to the left of its direction) or flow (side −1) number sits. */
export const mfLabelAt = (e: { u: string; v: string }, side: 1 | -1): Pt => { const { a, b, n } = mfDir(e); return [(a[0] + b[0]) / 2 + n[0] * 0.42 * side, (a[1] + b[1]) / 2 + n[1] * 0.42 * side] }
export const maxFlowValue = (edges: ReadonlyArray<{ u: string; v: string; cap: number }>, s: string, t: string): number => {
  const nodes = [...new Set(edges.flatMap((e) => [e.u, e.v]))], cap = new Map<string, number>()
  for (const e of edges) cap.set(`${e.u}>${e.v}`, (cap.get(`${e.u}>${e.v}`) ?? 0) + e.cap)
  let total = 0
  for (;;) {
    const prev = new Map<string, string>([[s, s]]), queue = [s]
    while (queue.length && !prev.has(t)) { const x = queue.shift()!; for (const y of nodes) if (!prev.has(y) && (cap.get(`${x}>${y}`) ?? 0) > 0) { prev.set(y, x); queue.push(y) } }
    if (!prev.has(t)) return total
    let b = Infinity
    for (let y = t; y !== s; y = prev.get(y)!) b = Math.min(b, cap.get(`${prev.get(y)}>${y}`) ?? 0)
    for (let y = t; y !== s; y = prev.get(y)!) { const x = prev.get(y)!; cap.set(`${x}>${y}`, (cap.get(`${x}>${y}`) ?? 0) - b); cap.set(`${y}>${x}`, (cap.get(`${y}>${x}`) ?? 0) + b) }
    total += b
  }
}

/** KG: maximum s–t flow in a capacitated network; Ford–Fulkerson augmenting paths; max-flow = min-cut. */
export function buildMaximumFlowScene(): SceneSpec {
  return framed(raw_buildMaximumFlowScene())
}
function raw_buildMaximumFlowScene(): SceneSpec {
  const { V, edges, cutX } = MF
  const c: Pt = [-0.9, 0]
  const into = (e: { v: string }) => e.v === 't'
  const dashes: SceneObject[] = Array.from({ length: 9 }, (_, i) => ln([cutX, -3.3 + i * 0.75], [cutX, -3.3 + i * 0.75 + 0.4], ROLE.input, 0.04))
  return {
    id: 'math-maximum-flow',
    title: 'Maximum flow and minimum cut',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a network with source s and sink t: each arrow has a capacity. A flow obeys the capacities and conserves flow at a and b; here the flow 3, 1, 1, 2, 2 on the five arrows pushes 4 units from s to t (found by augmenting along s→a→t, s→a→b→t and s→b→t). The two arrows into t (capacity 2 + 2 = 4) form a cut that separates t from s, and no flow can exceed any cut, so 4 is the maximum: max flow = min cut.',
    ariaLabel:
      'A network: a dot s on the left, dots a above and b below in the middle, a dot t on the right. Arrows run from s to a and s to b, from a down to b, and from a and b to t, with capacity numbers beside them: 3, 3, 1, 2, 2. In the second step blue numbers and blue thickening show the flow on each arrow: 3, 1, 1, 2, 2, so 4 units reach t. In the third step a red dashed line separates t from the rest, crossing the two arrows into t (capacity 2 and 2), and the captions say max flow 4 and min cut 2 plus 2 equals 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A flow network: source s, sink t, and a CAPACITY on each arrow (the most it can carry): s→a 3, s→b 3, a→b 1, a→t 2, b→t 2. How much can flow from s to t?', objects: [...edges.map((e) => { const d = mfDir(e); return arrow(P(d.a[0], d.a[1]), P(d.b[0], d.b[1]), ROLE.reference) }), ...Object.entries(V).map(([k, p]) => dt(p, ROLE.ink, MF.r)), ...Object.entries(V).map(([k, p]) => lb(k, outward(p, c, 0.5))), ...edges.map((e) => lb(String(e.cap), mfLabelAt(e, 1)))] },
      { narration: 'Push flow along augmenting paths: 2 along s→a→t, 1 along s→a→b→t, 1 along s→b→t. The flows (blue) are 3, 1, 1, 2, 2 — none exceeds its capacity, and what enters a and b also leaves them. Total into t: 2 + 2 = 4.', objects: [...edges.map((e) => { const d = mfDir(e); return ln(d.a, d.b, ROLE.output, 0.03 + 0.025 * e.flow) }), ...edges.map((e) => lb(String(e.flow), mfLabelAt(e, -1), ROLE.output))] },
      { narration: 'Why not more? Cut the network just before t (red dashes): the arrows crossing it, a→t and b→t, have capacities 2 + 2 = 4, and every unit of flow must cross. So 4 is the most possible — the maximum flow equals the capacity of the minimum cut.', objects: [...dashes, ...edges.filter(into).map((e) => { const d = mfDir(e); return ln(d.a, d.b, ROLE.input, 0.12) }), lb('max flow 4', [-0.9, -3.6], ROLE.output), lb('min cut 2 + 2 = 4', [2.0, 3.0], ROLE.input)] },
    ],
  }
}

// ── 4. Matching ──────────────────────────────────────────────────────────────

/** A bipartite graph X = {1, 2, 3}, Y = {A, B, C}: a matching of size 2, an augmenting path 2–A–1–B–3–C, and the perfect matching it produces. */
export const MAT = {
  cx: [-3.3, 0, 3.3] as readonly number[], dx: 0.95, ys: [1.5, 0, -1.5] as readonly number[],
  edges: [[0, 0], [0, 1], [1, 0], [2, 1], [2, 2]] as ReadonlyArray<readonly [number, number]>,
  m1: [[0, 0], [2, 1]] as ReadonlyArray<readonly [number, number]>,
  path: [[1, 0], [0, 0], [0, 1], [2, 1], [2, 2]] as ReadonlyArray<readonly [number, number]>,   // 2–A, A–1, 1–B, B–3, 3–C (alternating)
  m2: [[1, 0], [0, 1], [2, 2]] as ReadonlyArray<readonly [number, number]>,
}
export const matLeft = (panel: number, i: number): Pt => [MAT.cx[panel] - MAT.dx, MAT.ys[i]]
export const matRight = (panel: number, j: number): Pt => [MAT.cx[panel] + MAT.dx, MAT.ys[j]]

/** KG: a matching is a set of pairwise non-adjacent edges; perfect when every vertex is matched; augmenting paths enlarge it; Hall's theorem. */
export function buildMatchingScene(): SceneSpec {
  return framed(raw_buildMatchingScene())
}
function raw_buildMatchingScene(): SceneSpec {
  const { cx, edges, m1, path, m2 } = MAT
  const has = (set: ReadonlyArray<readonly [number, number]>, e: readonly [number, number]) => set.some((m) => m[0] === e[0] && m[1] === e[1])
  const panel = (p: number, edgeColor: (e: readonly [number, number]) => string, edgeT: (e: readonly [number, number]) => number, vcolor: (side: 'L' | 'R', i: number) => string): SceneObject[] => [
    ...edges.map((e) => ln(matLeft(p, e[0]), matRight(p, e[1]), edgeColor(e), edgeT(e))),
    ...[0, 1, 2].map((i) => dt(matLeft(p, i), vcolor('L', i))), ...[0, 1, 2].map((j) => dt(matRight(p, j), vcolor('R', j))),
    ...[0, 1, 2].map((i) => lb(String(i + 1), [matLeft(p, i)[0] - 0.4, matLeft(p, i)[1]])), ...[0, 1, 2].map((j) => lb('ABC'[j], [matRight(p, j)[0] + 0.4, matRight(p, j)[1]])),
  ]
  const free = (side: 'L' | 'R', i: number) => ((side === 'L' && i === 1) || (side === 'R' && i === 2) ? ROLE.input : ROLE.ink)
  return {
    id: 'math-matching',
    title: 'Matching and augmenting paths',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a bipartite graph with X = {1, 2, 3} and Y = {A, B, C}: a matching is a set of edges with no shared vertex; M = {1–A, 3–B} (blue) has 2 edges, leaving 2 and C unmatched (red). The path 2–A–1–B–3–C alternates unmatched, matched, unmatched, matched, unmatched edges and joins the two free vertices (an augmenting path); swapping matched and unmatched edges along it gives the matching {2–A, 1–B, 3–C} (green) of size 3 — a perfect matching.',
    ariaLabel:
      'Three copies of a bipartite graph with the numbers 1, 2, 3 in a left column and the letters A, B, C in a right column and five edges: 1 to A, 1 to B, 2 to A, 3 to B, 3 to C. Left: the edges 1 to A and 3 to B are thick blue, the unmatched vertices 2 and C are red, captioned size 2. Middle: the path 2 A 1 B 3 C is drawn with its unmatched edges red and matched edges blue, captioned augmenting. Right: the edges 2 to A, 1 to B and 3 to C are thick green, covering all six vertices, captioned perfect.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A matching is a set of edges, no two sharing a vertex. M = {1–A, 3–B} (blue) matches 4 of the 6 vertices; vertices 2 and C (red) are still free. Can M be made bigger?', objects: [...panel(0, (e) => (has(m1, e) ? ROLE.output : ROLE.reference), (e) => (has(m1, e) ? 0.1 : 0.03), free), lb('size 2', [cx[0], -2.7])] },
      { narration: 'An augmenting path starts at a free vertex, ends at a free vertex and alternates between unmatched and matched edges: 2–A (unmatched), A–1 (matched), 1–B (unmatched), B–3 (matched), 3–C (unmatched). It has one more unmatched edge than matched ones.', objects: [...panel(1, (e) => (has(path, e) ? (has(m1, e) ? ROLE.output : ROLE.input) : ROLE.reference), (e) => (has(path, e) ? 0.1 : 0.03), free), lb('augmenting', [cx[1], -2.7])] },
      { narration: 'Flip the path: the matched edges on it become unmatched and the unmatched ones become matched. The new matching {2–A, 1–B, 3–C} (green) has 3 edges and covers every vertex — a perfect matching. Repeating this until no augmenting path remains gives a maximum matching.', objects: [...panel(2, (e) => (has(m2, e) ? ROLE.result : ROLE.reference), (e) => (has(m2, e) ? 0.1 : 0.03), () => ROLE.ink), lb('perfect', [cx[2], -2.7], ROLE.result)] },
    ],
  }
}

// ── 5. Supremum and infimum ──────────────────────────────────────────────────

/** S = {1 − 1/n}: inf S = 0 is a member (a minimum), sup S = 1 is not (no maximum); 0.9 is not an upper bound because 1 − 1/11 = 0.909 > 0.9. */
export const SUP = { x0: -1.75, u: 3.5, y: 0, vMin: -0.5, vMax: 1.5, nMax: 12, bound: 0.9, k: 11 }
export const supX = (v: number) => SUP.x0 + v * SUP.u
export const supTerm = (n: number) => 1 - 1 / n

/** KG: sup(S) the least upper bound, inf(S) the greatest lower bound; attained iff it is a maximum / minimum. */
export function buildSupInfScene(): SceneSpec {
  return framed(raw_buildSupInfScene())
}
function raw_buildSupInfScene(): SceneSpec {
  const { y, vMin, vMax, nMax, bound, k } = SUP
  const at = (v: number, dy = 0): Pt => [supX(v), y + dy]
  const terms = Array.from({ length: nMax }, (_, i) => supTerm(i + 1))
  return {
    id: 'math-sup-inf',
    title: 'Supremum and infimum',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the set S = {1 − 1/n : n = 1, 2, 3, …} on a number line: 0, 1/2, 2/3, 3/4, … creeping up toward 1 without reaching it. Every number ≥ 1 is an upper bound and 1 is the LEAST one (the supremum): 0.9 is not an upper bound because the member 1 − 1/11 = 0.909 exceeds it. The supremum 1 is not in S (so S has no maximum), while the infimum 0 is a member (a minimum).',
    ariaLabel:
      'A horizontal number line from minus one half to one and a half with ticks at 0 and 1. Twelve dots mark the members 0, 0.5, 0.667, 0.75 and so on, piling up just to the left of 1. In the second step the stretch of the line from 1 rightwards is drawn violet and labelled upper bounds, an open green ring at 1 is labelled sup equals 1, not attained, and a red tick at 0.9 sits just left of a red dot at 0.909 showing that 0.9 is below a member. In the third step the stretch from 0 leftwards is violet, labelled lower bounds, and the dot at 0 is a filled green dot labelled inf equals 0, attained.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The set S = {1 − 1/n} = 0, 1/2, 2/3, 3/4, 4/5, … Its members climb toward 1 but never reach it — they pile up just to the left of 1.', objects: [arrow(P(supX(vMin) - 0.2, y), P(supX(vMax) + 0.2, y), ROLE.reference), ...terms.map((v) => dt(at(v), ROLE.ink, 0.1)), lb('0', at(0, -0.5)), lb('1', at(1, -0.5)), lb('S: 1 − 1/n', [0, 1.6])] },
      { narration: 'An upper bound is a number at least as big as every member: all numbers ≥ 1 (violet) qualify. The supremum is the LEAST upper bound: it is 1, but 1 is not in S (open ring), so S has no maximum. Nothing smaller works: 0.9 (red tick) is not a bound because 1 − 1/11 = 0.909 (red dot) is above it.', objects: [ln(at(1), at(vMax), ROLE.aid, 0.09), ringAt(at(1), 0.15, ROLE.result), ln(at(bound, -0.3), at(bound, 0.3), ROLE.input, 0.05), dt(at(supTerm(k)), ROLE.input, 0.12), lb('0.9', at(bound, -0.95), ROLE.input), lb('0.909', at(supTerm(k), 0.65), ROLE.input), lb('upper bounds', at(1.5, -1.3), ROLE.aid), lb('sup = 1: not attained', [2.3, 1.0], ROLE.result)] },
      { narration: 'Lower bounds are numbers ≤ every member: all numbers ≤ 0 (violet). The infimum is the GREATEST lower bound, 0 — and this time 0 IS a member (n = 1), so it is attained: a minimum.', objects: [ln(at(vMin), at(0), ROLE.aid, 0.09), dt(at(0), ROLE.result, 0.14), lb('lower bounds', at(-0.5, -1.3), ROLE.aid), lb('inf = 0: attained', [-2.4, 1.0], ROLE.result)] },
    ],
  }
}

// ── 6. Convergence of a sequence ─────────────────────────────────────────────

/** aₙ = 2 + (−1)ⁿ/n → 2: for ε = 0.3 only n ≤ 3 lie outside the band (N = 3); for ε = 0.15 it is n ≤ 6 (N = 6). */
export const CNV = { ox: -4.3, ux: 0.7, uy: 3.0, L: 2, nMax: 12, eps: [0.3, 0.15] as readonly number[], N: [3, 6] as readonly number[] }
export const seqA = (n: number) => 2 + Math.pow(-1, n) / n
export const cnvAt = (n: number, v: number): Pt => [CNV.ox + n * CNV.ux, (v - CNV.L) * CNV.uy]

/** KG: aₙ → L iff ∀ε > 0 ∃N: n > N ⟹ |aₙ − L| < ε. */
export function buildConvergenceSequencesScene(): SceneSpec {
  return framed(raw_buildConvergenceSequencesScene())
}
function raw_buildConvergenceSequencesScene(): SceneSpec {
  const { nMax, eps, N, L } = CNV
  const ns = Array.from({ length: nMax }, (_, i) => i + 1)
  const band = (e: number): SceneObject[] => [ln(cnvAt(0.4, L + e), cnvAt(nMax + 0.6, L + e), ROLE.aid, 0.03), ln(cnvAt(0.4, L - e), cnvAt(nMax + 0.6, L - e), ROLE.aid, 0.03)]
  const outside = (e: number, color: string) => ns.filter((n) => Math.abs(seqA(n) - L) >= e).map((n) => dt(cnvAt(n, seqA(n)), color, 0.19))
  const marker = (n: number, text: string): SceneObject[] => [ln([cnvAt(n + 0.5, 0)[0], -3.6], [cnvAt(n + 0.5, 0)[0], 2.3], ROLE.result, 0.03), lb(text, [cnvAt(n + 0.5, 0)[0], 2.65], ROLE.result)]
  return {
    id: 'math-convergence-sequences',
    title: 'Convergence of a sequence (ε–N)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the ε–N definition on aₙ = 2 + (−1)ⁿ/n → 2: given ε = 0.3, from the 4th term on every aₙ lies within 0.3 of 2 (N = 3); a smaller ε = 0.15 needs a later N = 6 (terms 1–6 are outside the narrower band, terms 7 on are inside). N depends on ε, and for EVERY ε some N exists.',
    ariaLabel:
      'A plot of twelve dots for the sequence, n from 1 to 12 left to right: the dots jump above and below the horizontal line L equals 2 with ever smaller swings. In the second step two violet lines mark a band of half-width 0.3 around the limit; the first three dots, which lie outside it, are red, a green vertical line after the third dot is labelled N1 equals 3, and every later dot is inside the band. In the third step a narrower band of half-width 0.15 is added; dots 4, 5 and 6 also turn red and a second green line after the sixth dot is labelled N2 equals 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The sequence aₙ = 2 + (−1)ⁿ/n: 1, 2.5, 1.67, 2.25, 1.8, … It swings above and below 2 by ever smaller amounts. The claim is aₙ → 2.', objects: [ln(cnvAt(0.4, L), cnvAt(nMax + 0.6, L), ROLE.reference, 0.03), arrow(P(cnvAt(0.4, 0)[0], -3.5), P(cnvAt(nMax + 0.9, 0)[0], -3.5), ROLE.reference), ...ns.map((n) => dt(cnvAt(n, seqA(n)), ROLE.ink, 0.13)), ...[3, 6, 9, 12].map((n) => lb(String(n), [cnvAt(n, 0)[0], -3.95])), lb('L = 2', [-4.2, 0.4])] },
      { narration: 'Pick ε = 0.3: the band 2 ± 0.3 (violet). The terms a₁, a₂, a₃ lie outside it (red), but from n = 4 on every term is inside, since 1/n < 0.3 once n > 3.33. So N = 3 works for this ε.', objects: [...band(eps[0]), ...outside(eps[0], ROLE.input), ...marker(N[0], 'N₁ = 3'), lb('ε₁ = 0.3', [-3.7, 1.35], ROLE.aid)] },
      { narration: 'A smaller ε = 0.15 narrows the band. Now a₄, a₅, a₆ are outside as well, and we must go further: 1/n < 0.15 needs n > 6.67, so N = 6. Smaller ε, larger N — but some N always exists, and that is exactly what aₙ → 2 means.', objects: [...band(eps[1]), ...outside(eps[1], ROLE.input), ...marker(N[1], 'N₂ = 6'), lb('ε₂ = 0.15', [-3.6, -0.75], ROLE.aid)] },
    ],
  }
}

// ── 7. Cauchy sequences ──────────────────────────────────────────────────────

/** sₙ = 2 − 2^(1−n) (partial sums 1, 1.5, 1.75, …) is Cauchy: for ε = 0.1 every pair of terms beyond N = 4 is within 0.1. aₙ = (−1)ⁿ never settles: terms of opposite parity stay 2 apart. */
export const CAU = { x0: -4.0, u: 8.0, y: 1.6, nMax: 7, N: 4, eps: 0.1, yb: -1.9, ub: 2.0 }
export const cauS = (n: number) => 2 - Math.pow(2, 1 - n)
export const cauX = (v: number) => CAU.x0 + (v - 1) * CAU.u

/** KG: Cauchy: ∀ε ∃N: m, n > N ⟹ |aₘ − aₙ| < ε; in ℝ Cauchy ⟺ convergent. */
export function buildCauchySequenceScene(): SceneSpec {
  return framed(raw_buildCauchySequenceScene())
}
function raw_buildCauchySequenceScene(): SceneSpec {
  const { y, nMax, N, eps, yb, ub } = CAU
  const top = Array.from({ length: nMax }, (_, i) => cauS(i + 1))
  const x5 = cauX(cauS(N + 1)), x2 = cauX(2)
  return {
    id: 'math-cauchy-sequence',
    title: 'Cauchy sequences',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Contrast a Cauchy sequence with one that is not. The partial sums sₙ = 2 − 2^(1−n) = 1, 1.5, 1.75, 1.875, 1.9375, … bunch up: beyond N = 4 any two terms are closer than ε = 0.1 (they all sit in a stretch shorter than the ε ruler), so the sequence is Cauchy — and in ℝ that means it converges (to 2). The sequence (−1)ⁿ alternates between −1 and 1, terms of opposite parity are always 2 apart, so it is not Cauchy and does not converge.',
    ariaLabel:
      'A number line near the top with seven dots for the terms 1, 1.5, 1.75, 1.875, 1.9375, 1.969 and 1.984 crowding toward 2 at the right end, the first five numbered 1 to 5. A violet ruler above the right end is labelled epsilon equals 0.1; a violet bracket under the dots from the fifth term to 2 is labelled n greater than 4 and is shorter than the ruler. Below, a second number line has just two dots, at minus 1 and 1, joined by a red line labelled gap 2 and captioned minus one to the n, not Cauchy.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Partial sums sₙ = 2 − 2^(1−n): 1, 1.5, 1.75, 1.875, 1.9375, 1.969, 1.984, … Each term is halfway to 2 from the last, so the terms get closer and closer to EACH OTHER.', objects: [arrow(P(-4.3, y), P(4.4, y), ROLE.reference), ...top.map((v) => dt([cauX(v), y], ROLE.ink, 0.11)), ...[1, 2, 3, 4, 5].map((n) => lb(String(n), [cauX(cauS(n)), y + 0.5])), lb('sₙ: Cauchy', [-2.4, 2.9])] },
      { narration: 'Take ε = 0.1 (the violet ruler). From n = 5 on every term lies between s₅ = 1.9375 and 2, a stretch of only 0.0625 — shorter than ε — so any two of them differ by less than ε. A smaller ε just needs a later N: this is a Cauchy sequence.', objects: [ln([cauX(2 - eps), y + 1.0], [cauX(2), y + 1.0], ROLE.aid, 0.05), ln([cauX(2 - eps), y + 0.85], [cauX(2 - eps), y + 1.15], ROLE.aid, 0.04), ln([cauX(2), y + 0.85], [cauX(2), y + 1.15], ROLE.aid, 0.04), lb('ε = 0.1', [cauX(2 - eps / 2) - 0.1, y + 1.5], ROLE.aid), ln([x5, y - 0.35], [cauX(2), y - 0.35], ROLE.aid, 0.05), lb('n > 4', [(x5 + cauX(2)) / 2, y - 0.85], ROLE.aid)] },
      { narration: 'Compare (−1)ⁿ = −1, 1, −1, 1, …: the terms never bunch up. Whenever m and n have opposite parity |aₘ − aₙ| = 2, so no N works for ε < 2 — not Cauchy, and indeed it does not converge. In ℝ, Cauchy and convergent are the same thing (completeness).', objects: [arrow(P(-4.3, yb), P(4.3, yb), ROLE.reference), dt([-ub, yb], ROLE.ink, 0.14), dt([ub, yb], ROLE.ink, 0.14), lb('−1', [-ub, yb - 0.6]), lb('1', [ub, yb - 0.6]), ln([-ub + 0.2, yb], [ub - 0.2, yb], ROLE.input, 0.05), lb('gap 2', [0, yb + 0.5], ROLE.input), lb('(−1)ⁿ: not Cauchy', [0, -3.5])] },
    ],
  }
}

// ── 8. Open and closed sets ──────────────────────────────────────────────────

/** A disc of radius R: open (dashed edge, an interior point with a ball inside), closed (solid edge, a boundary point whose every ball sticks out), and its complement (open). */
export const OPN = {
  R: 1.7, cl: [-2.6, 0.5] as Pt, cr: [2.6, 0.5] as Pt,
  xOff: [-0.5, 0.3] as Pt, rx: 1.0,                 // interior point x = cl + xOff, ball radius rx (|xOff| + rx < R)
  yAng: 30, ry: 0.75,                               // boundary point y of the closed disc at this angle (degrees), ball radius ry
  zAng: -110, zDist: 2.5, rz: 0.45,                  // point z outside the closed disc, ball radius rz (zDist − R > rz)
}
export const opnPt = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] + r * Math.sin((deg * Math.PI) / 180)]

/** KG: open ball B(x, r); S is open iff every point is interior; closed iff its complement is open. */
export function buildOpenSetsScene(): SceneSpec {
  return framed(raw_buildOpenSetsScene())
}
function raw_buildOpenSetsScene(): SceneSpec {
  const { R, cl, cr, xOff, rx, yAng, ry, zAng, zDist, rz } = OPN
  const poly = (c: Pt): Array<[number, number]> => Array.from({ length: 36 }, (_, i) => { const p = opnPt(c, R * 0.97, i * 10); return [p[0], p[1]] as [number, number] })
  const xp: Pt = [cl[0] + xOff[0], cl[1] + xOff[1]], yp = opnPt(cr, R, yAng), zp = opnPt(cr, zDist, zAng)
  return {
    id: 'math-open-sets',
    title: 'Open and closed sets',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show open and closed with a disc. Open: the disc without its edge (dashed) — around every point, such as x, a whole ball B(x, r) still fits inside, so every point is interior. Closed: the disc with its edge (solid) — the edge point y belongs to it, yet EVERY ball around y sticks out of the disc, so y is not interior (the set is not open). Closed means the complement is open: the point z outside has a ball that stays entirely outside.',
    ariaLabel:
      'Left: a disc filled with violet hatching whose edge is a dashed circle, captioned open; a dot x inside it has a blue circle around it lying wholly within the disc, labelled B(x, r) inside S. Right: a similar disc with a solid edge, captioned closed; a dot y on the edge has a red circle around it that crosses the edge and sticks out, labelled every ball sticks out. In the third step a dot z outside the right disc has a blue circle that stays entirely outside it, captioned complement is open.',
    stage: NO_STAGE,
    steps: [
      { narration: 'An OPEN set contains none of its edge. This disc has a dashed edge: it is the set of points at distance < R from the centre. Around the point x a small ball B(x, r) (blue) fits completely inside — x is an interior point, and so is every other point of the set.', objects: [...Array.from({ length: 24 }, (_, i) => curve(arcPts(cl[0], cl[1], R, i * 15, i * 15 + 9, 8), ROLE.reference)), ...shadeConvex(poly(cl), 0.3, ROLE.aid, 0.015), dt(xp, ROLE.ink, 0.1), lb('x', [xp[0] - 0.3, xp[1] + 0.3]), ringAt(xp, rx, ROLE.output, 32), lb('B(x, r)', [cl[0], cl[1] - R - 0.55], ROLE.output), lb('open', [cl[0], cl[1] + R + 0.6])] },
      { narration: 'A CLOSED set contains its edge. This disc has a solid edge, and the point y on the edge is in the set. But every ball around y — however small (red) — sticks out past the edge, so y is not an interior point. Closed sets contain all their limit points, boundary included.', objects: [curve(arcPts(cr[0], cr[1], R, 0, 360, 40), ROLE.reference), ...shadeConvex(poly(cr), 0.3, ROLE.aid, 0.015), dt(yp, ROLE.ink, 0.1), lb('y', opnPt(cr, R + 0.45, yAng)), ringAt(yp, ry, ROLE.input, 32), lb('closed', [cr[0], cr[1] + R + 0.6])] },
      { narration: 'A set is closed exactly when its COMPLEMENT is open. A point z outside the closed disc has room: a ball around it (blue) lies entirely outside, so the outside is open — every point of it is interior.', objects: [dt(zp, ROLE.ink, 0.1), lb('z', [zp[0] + 0.35, zp[1] + 0.25]), ringAt(zp, rz, ROLE.output, 32), lb('complement is open', [cr[0], cr[1] - R - 2.0], ROLE.output)] },
    ],
  }
}

// ── 9. ε–δ continuity ────────────────────────────────────────────────────────

/** f(x) = x² is continuous at a = 1: for ε = 0.5 the window |x − 1| < δ = 0.22 keeps f inside the band (the largest allowed δ is 0.2247). A jump at a = 1 defeats every δ. */
export const CTY = { ux: 1.6, uy: 1.0, oxL: -4.4, oxR: 0.5, oy: -2.6, a: 1, eps: 0.5, delta: 0.22, xMax: 1.8 }
export const ctyF = (x: number) => x * x
export const ctyJump = (x: number) => (x < 1 ? x : x + 1)
export const ctyAt = (ox: number, x: number, y: number): Pt => [ox + x * CTY.ux, CTY.oy + y * CTY.uy]
/** The largest δ that works for f(x) = x² at a = 1 and the given ε. */
export const ctyDeltaMax = (eps: number) => Math.min(1 - Math.sqrt(1 - eps), Math.sqrt(1 + eps) - 1)

/** KG: f continuous at a iff ∀ε ∃δ: |x − a| < δ ⟹ |f(x) − f(a)| < ε. */
export function buildContinuityRigorousScene(): SceneSpec {
  return framed(raw_buildContinuityRigorousScene())
}
function raw_buildContinuityRigorousScene(): SceneSpec {
  const { oxL, oxR, a, eps, delta, xMax } = CTY
  const G = (ox: number) => (x: number, y: number) => ctyAt(ox, x, y)
  const axes = (ox: number, top: number): SceneObject[] => [arrow(P(ox - 0.15, CTY.oy), P(ox + xMax * CTY.ux + 0.3, CTY.oy), ROLE.reference), arrow(P(ox, CTY.oy - 0.15), P(ox, CTY.oy + top), ROLE.reference)]
  const bandLines = (ox: number, fa: number): SceneObject[] => [ln(ctyAt(ox, 0, fa + eps), ctyAt(ox, xMax, fa + eps), ROLE.aid, 0.03), ln(ctyAt(ox, 0, fa - eps), ctyAt(ox, xMax, fa - eps), ROLE.aid, 0.03)]
  const box = (ox: number, fa: number): SceneObject[] => [ln(ctyAt(ox, a - delta, fa - eps), ctyAt(ox, a - delta, fa + eps), ROLE.result, 0.04), ln(ctyAt(ox, a + delta, fa - eps), ctyAt(ox, a + delta, fa + eps), ROLE.result, 0.04)]
  const inWindow = plot(ctyF, a - delta, a + delta, G(oxL), ROLE.result, 16)
  const leftBranch: SceneObject = ln(ctyAt(oxR, a - delta, ctyJump(a - delta)), ctyAt(oxR, a, 1), ROLE.input, 0.1)
  return {
    id: 'math-continuity-rigorous',
    title: 'Continuity: the ε–δ definition',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show f continuous at a means: for any tolerance ε around f(a) there is a window δ around a so that x in the window forces f(x) within ε. For f(x) = x² at a = 1 and ε = 0.5 the window δ = 0.22 works (the curve stays between 0.5 and 1.5 — the biggest allowed δ is 0.2247). For a function with a JUMP at a, the points just left of a stay about 1 below f(a), so no δ, however small, keeps f within ε = 0.5.',
    ariaLabel:
      'Left: the parabola y equals x squared for x from 0 to 1.8 with axes, a dot at the point (1, 1) marked a and f(a), and two horizontal violet lines at heights 0.5 and 1.5 forming a band of half-width epsilon around f(a). In the second step two vertical green lines at x equals 0.78 and 1.22 make a window of half-width delta, and the green part of the curve inside it stays within the band. Right, third step: a graph that follows y equals x up to an open ring at (1, 1) and then jumps to a filled dot at (1, 2) and continues upward; a band of half-width 0.5 around 2; the same window; the red piece of the graph just left of 1 is far below the band, captioned jump, no delta works.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = x² near a = 1, so f(a) = 1. The learner chooses a tolerance ε = 0.5: the band 1 ± 0.5 (violet). The question: can we keep f(x) inside it by keeping x close enough to a?', objects: [...axes(oxL, 3.5), plot(ctyF, 0, xMax, G(oxL), ROLE.output), ...bandLines(oxL, 1), dt(ctyAt(oxL, a, 1), ROLE.ink, 0.1), lb('a', [ctyAt(oxL, a, 0)[0], CTY.oy - 0.4]), lb('f(a)', [oxL - 0.45, ctyAt(oxL, 0, 1)[1]]), lb('ε', [oxL + xMax * CTY.ux + 0.3, ctyAt(oxL, 0, 1 + eps)[1]], ROLE.aid), lb('continuous at a', [oxL + 1.4, 1.5], ROLE.output)] },
      { narration: 'Yes: the window |x − 1| < δ = 0.22 (green lines) works. Inside it (green curve) x² only runs from 0.61 to 1.49, always within the band. A smaller ε would just need a smaller δ — for every ε some δ exists, and that is continuity.', objects: [...box(oxL, 1), inWindow, lb('δ', [ctyAt(oxL, a - delta, 0)[0] - 0.05, CTY.oy - 0.4], ROLE.result)] },
      { narration: 'Now a function with a jump at a = 1 (it equals x before 1 and x + 1 from 1 on), so f(a) = 2. With the same ε = 0.5 the band is 2 ± 0.5, but just left of 1 the graph is near 1 — about a whole unit below. The same window δ fails: its left half (red) lies far outside the band, and shrinking δ never fixes it. This f is not continuous at a.', objects: [...axes(oxR, 3.5), ln(ctyAt(oxR, 0, 0), ctyAt(oxR, a, 1), ROLE.output, 0.04), ln(ctyAt(oxR, a, 2), ctyAt(oxR, xMax, ctyJump(xMax)), ROLE.output, 0.04), ringAt(ctyAt(oxR, a, 1), 0.1, ROLE.output, 16), dt(ctyAt(oxR, a, 2), ROLE.ink, 0.1), ...bandLines(oxR, 2), ...box(oxR, 2), leftBranch, lb('a', [ctyAt(oxR, a, 0)[0], CTY.oy - 0.4]), lb('f(a)', [oxR - 0.45, ctyAt(oxR, 0, 2)[1]]), lb('jump: no δ works', [oxR + 1.4, 1.5], ROLE.input)] },
    ],
  }
}

// ── 10. Uniform continuity ───────────────────────────────────────────────────

/** The same window width δ = 0.5 at x = 0.5, 1.5, 2.5: sin x changes by at most δ in every window (slope ≤ 1), x² changes by 0.75, 1.75, 2.75 — no single δ serves a given ε everywhere. */
export const UNC = { oxL: -4.6, oxR: 0.6, oy: -2.3, ux: 1.3, uy: 0.6, delta: 0.5, starts: [0.5, 1.5, 2.5] as readonly number[], xMax: 3 }
export const uncAt = (ox: number, x: number, y: number): Pt => [ox + x * UNC.ux, UNC.oy + y * UNC.uy]
/** Range (max − min) of fn over [x, x + δ], by dense sampling. */
export const windowRange = (fn: (x: number) => number, x0: number, x1: number): number => { let lo = Infinity, hi = -Infinity; for (let i = 0; i <= 400; i++) { const v = fn(x0 + ((x1 - x0) * i) / 400); lo = Math.min(lo, v); hi = Math.max(hi, v) } return hi - lo }

/** KG: uniformly continuous: δ depends only on ε, not on the point; continuous on a compact set ⟹ uniformly continuous. */
export function buildUniformContinuityScene(): SceneSpec {
  return framed(raw_buildUniformContinuityScene())
}
function raw_buildUniformContinuityScene(): SceneSpec {
  const { oxL, oxR, delta, starts, xMax } = UNC
  const sinF = (x: number) => Math.sin(x), sq = (x: number) => x * x
  const G = (ox: number) => (x: number, y: number) => uncAt(ox, x, y)
  const axes = (ox: number, top: number): SceneObject[] => [arrow(P(ox - 0.15, UNC.oy), P(ox + xMax * UNC.ux + 0.3, UNC.oy), ROLE.reference), arrow(P(ox, UNC.oy - 0.15), P(ox, UNC.oy + top), ROLE.reference)]
  const boxes = (ox: number, fn: (x: number) => number, color: string): SceneObject[] => starts.flatMap((x0) => {
    let lo = Infinity, hi = -Infinity
    for (let i = 0; i <= 400; i++) { const v = fn(x0 + (delta * i) / 400); lo = Math.min(lo, v); hi = Math.max(hi, v) }
    const a = uncAt(ox, x0, lo), b = uncAt(ox, x0 + delta, hi)
    return [ln(a, [b[0], a[1]], color, 0.03), ln([a[0], b[1]], b, color, 0.03), ln(a, [a[0], b[1]], color, 0.03), ln([b[0], a[1]], b, color, 0.03)]
  })
  const heights = (ox: number, fn: (x: number) => number, color: string, ups: readonly number[]): SceneObject[] => starts.map((x0, i) => {
    let hi = -Infinity
    for (let i = 0; i <= 400; i++) hi = Math.max(hi, fn(x0 + (delta * i) / 400))
    return lb(f2(windowRange(fn, x0, x0 + delta)), [uncAt(ox, x0 + delta / 2, 0)[0], uncAt(ox, 0, hi)[1] + ups[i]], color)
  })
  return {
    id: 'math-uniform-continuity',
    title: 'Uniform continuity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why uniform continuity needs one δ for the whole domain. With the SAME window width δ = 0.5 placed at x = 0.5, 1.5 and 2.5, sin x changes by only 0.36, 0.09, 0.46 — never more than δ, because its slope is at most 1, so one δ serves a given ε everywhere (uniformly continuous). x² changes by 0.75, 1.75, 2.75 in the same windows, growing as the curve steepens, so a δ that is good near 0 is too big further out: the δ must shrink with x (on all of ℝ, x² is not uniformly continuous; on a bounded interval it is, by Heine–Cantor).',
    ariaLabel:
      'Left: the curve sine of x for x from 0 to 3 with three narrow violet boxes of the same width at x equals 0.5, 1.5 and 2.5, each just as tall as the curve changes inside it; labels give the heights 0.36, 0.09 and 0.46. Right: the parabola x squared on the same x range, drawn to the same vertical scale, with three boxes of the same width whose heights grow: 0.75, 1.75 and 2.75, in red.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Fix a window of width δ = 0.5 and slide it along sin x (boxes at x = 0.5, 1.5, 2.5). Its slope never exceeds 1, so in every window the value changes by at most 0.5: by 0.36, 0.09 and 0.46 here. One δ keeps f within ε everywhere — uniformly continuous.', objects: [...axes(oxL, 1.2), lb('x', [-0.2, -2.65]), plot(sinF, 0, xMax, G(oxL), ROLE.output), ...boxes(oxL, sinF, ROLE.aid), ...heights(oxL, sinF, ROLE.aid, [0.4, 1.0, 0.4]), lb('sin x', [oxL + 1.9, UNC.oy + 1.9], ROLE.output)] },
      { narration: 'Same δ = 0.5, same vertical scale, on x²: the windows now rise by 0.75, 1.75 and 2.75 — the curve gets steeper (slope 2x), so the same horizontal window produces ever larger changes. To keep the change below a given ε, δ must shrink as x grows: no single δ works for all x.', objects: [...axes(oxR, 5.8), lb('x', [4.75, -2.7]), plot(sq, 0, xMax, G(oxR), ROLE.output), ...boxes(oxR, sq, ROLE.input), ...heights(oxR, sq, ROLE.input, [0.4, 0.4, 0.4]), lb('x²', [oxR + 1.0, UNC.oy + 4.3], ROLE.output)] },
      { narration: 'So: sin x is uniformly continuous on ℝ (δ = ε works everywhere); x² is continuous at every point but NOT uniformly on ℝ. On a closed bounded interval such as [0, 3] the steepest slope is finite, so every continuous function there IS uniformly continuous (Heine–Cantor).', objects: [lb('same δ', [(oxL + oxR) / 2 + 1.2, UNC.oy + 5.4], ROLE.ink)] },
    ],
  }
}

// ── 11. Riemann integral (Darboux sums) ──────────────────────────────────────

/** f(x) = x² on [0, 1]: lower and upper Darboux sums for n = 4 and n = 8 equal parts squeeze ∫ = 1/3 (U − L = 1/n). */
export const DAR = { ox: [-4.2, 0.9] as readonly number[], u: 3.4, oy: -2.2, n: [4, 8] as readonly number[] }
export const darF = (x: number) => x * x
export const darboux = (n: number): { lower: number; upper: number } => {
  let lower = 0, upper = 0
  for (let i = 1; i <= n; i++) { lower += darF((i - 1) / n) / n; upper += darF(i / n) / n }
  return { lower, upper }
}
export const darAt = (panel: number, x: number, y: number): Pt => [DAR.ox[panel] + x * DAR.u, DAR.oy + y * DAR.u]

/** KG: partition P of [a, b]; lower and upper Darboux sums L(f, P), U(f, P); integrable iff inf U = sup L. */
export function buildRiemannIntegralScene(): SceneSpec {
  return framed(raw_buildRiemannIntegralScene())
}
function raw_buildRiemannIntegralScene(): SceneSpec {
  /** Lower: the tops of the rectangles under the curve (the first has height 0) and their left sides; upper: the staircase of tops and risers over it. */
  const stair = (panel: number, n: number, upper: boolean, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    for (let i = 1; i <= n; i++) {
      const x0 = (i - 1) / n, x1 = i / n
      if (upper) {
        out.push(ln(darAt(panel, x0, darF(x1)), darAt(panel, x1, darF(x1)), color, 0.035))
        out.push(ln(darAt(panel, x0, darF(x0)), darAt(panel, x0, darF(x1)), color, 0.025))
      } else if (i >= 2) {
        out.push(ln(darAt(panel, x0, darF(x0)), darAt(panel, x1, darF(x0)), color, 0.035))
        out.push(ln(darAt(panel, x0, 0), darAt(panel, x0, darF(x0)), color, 0.025))
      }
    }
    out.push(ln(darAt(panel, 1, 0), darAt(panel, 1, upper ? 1 : darF((n - 1) / n)), color, 0.025))
    return out
  }
  const base = (panel: number): SceneObject[] => [ln(darAt(panel, -0.03, 0), darAt(panel, 1.05, 0), ROLE.reference, 0.04), plot(darF, 0, 1, (x, y) => darAt(panel, x, y), ROLE.ink, 60)]
  const d4 = darboux(4), d8 = darboux(8)
  return {
    id: 'math-riemann-integral',
    title: 'Riemann integral: Darboux sums',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the rigorous Riemann integral for f(x) = x² on [0, 1]: split into n equal strips; the lower sum L uses the smallest value of f on each strip (blue rectangles under the curve), the upper sum U the largest (red rectangles over it). n = 4 gives L = 0.22 and U = 0.47; n = 8 gives L = 0.27 and U = 0.40. Always L ≤ ∫ ≤ U, and the gap U − L = 1/n shrinks to 0, squeezing the integral to 1/3: f is Riemann integrable when inf U = sup L.',
    ariaLabel:
      'Left: the parabola y equals x squared on [0, 1] over four equal strips; blue stair-step rectangles lie under the curve with total area L4 equals 0.22 and, in the second step, red rectangles lie over it with total area U4 equals 0.47. Right, third step: the same parabola over eight strips with blue rectangles under it, L8 equals 0.27, and red rectangles over it, U8 equals 0.40, so the two sums are closer together. Captions say L at most the integral at most U, and U minus L equals 1 over n.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Divide [0, 1] into n = 4 equal strips. On each strip take the SMALLEST value of x² (its left end, since x² is increasing) and build a rectangle under the curve: the lower Darboux sum L₄ = (0 + 1 + 4 + 9)/64 = 0.22.', objects: [...base(0), ...stair(0, 4, false, ROLE.output), lb(`L₄ = ${f2(d4.lower)}`, [DAR.ox[0] + 1.7, DAR.oy - 0.55], ROLE.output), lb('4 strips', [DAR.ox[0] + 1.7, 1.7])] },
      { narration: 'Now take the LARGEST value on each strip (its right end) for rectangles that overshoot the curve: the upper Darboux sum U₄ = (1 + 4 + 9 + 16)/64 = 0.47. The true area lies between the two: 0.22 ≤ ∫ ≤ 0.47.', objects: [...stair(0, 4, true, ROLE.input), lb(`U₄ = ${f2(d4.upper)}`, [DAR.ox[0] + 0.7, DAR.oy + 4.0], ROLE.input)] },
      { narration: 'Refine to n = 8 strips: L₈ = 0.27 and U₈ = 0.40 — the sandwich tightens, and U − L = 1/n shrinks to 0. Both sums close in on 1/3, so inf U = sup L and f is Riemann integrable; that common value is the integral.', objects: [...base(1), ...stair(1, 8, false, ROLE.output), ...stair(1, 8, true, ROLE.input), lb(`L₈ = ${f2(d8.lower)}`, [DAR.ox[1] + 1.7, DAR.oy - 0.55], ROLE.output), lb(`U₈ = ${f2(d8.upper)}`, [DAR.ox[1] + 0.7, DAR.oy + 4.0], ROLE.input), lb('8 strips', [DAR.ox[1] + 1.7, 1.7]), lb('L ≤ ∫ ≤ U', [0, -3.9], ROLE.ink), lb('U − L = 1/n', [0, -4.5], ROLE.aid)] },
    ],
  }
}

// ── 12. Uniform convergence ──────────────────────────────────────────────────

/** Left: fₙ(x) = x + sin(nx)/n on [0, 3] stays within 1/n of f(x) = x — inside an ε = 0.3 tube once n ≥ 4. Right: xⁿ on [0, 1] always reaches 1/2 at xₙ = 2^(−1/n), outside an ε = 0.25 tube around its pointwise limit. */
export const UCV = { oxL: -4.7, oxR: 1.2, oy: -2.8, uL: 1.3, uR: 3.3, eps: 0.3, epsR: 0.25, nsL: [5, 12] as readonly number[], nBad: 2, nsR: [2, 5, 15] as readonly number[] }
export const ucvFn = (n: number) => (x: number) => x + Math.sin(n * x) / n
export const ucvAtL = (x: number, y: number): Pt => [UCV.oxL + x * UCV.uL, UCV.oy + y * UCV.uL]
export const ucvAtR = (x: number, y: number): Pt => [UCV.oxR + x * UCV.uR, UCV.oy + y * UCV.uR]
export const xHalf = (n: number) => Math.pow(0.5, 1 / n)

/** KG: fₙ → f uniformly iff sup |fₙ − f| → 0; the uniform limit of continuous functions is continuous. */
export function buildUniformConvergenceScene(): SceneSpec {
  return framed(raw_buildUniformConvergenceScene())
}
function raw_buildUniformConvergenceScene(): SceneSpec {
  const { oxL, oxR, oy, uL, uR, eps, epsR, nsL, nBad, nsR } = UCV
  const colors = [ROLE.input, ROLE.output, ROLE.result]
  const axesL: SceneObject[] = [arrow(P(oxL - 0.15, oy), P(oxL + 3 * uL + 0.3, oy), ROLE.reference), arrow(P(oxL, oy - 0.15), P(oxL, oy + 3.7 * uL), ROLE.reference)]
  const axesR: SceneObject[] = [arrow(P(oxR - 0.15, oy), P(oxR + uR + 0.3, oy), ROLE.reference), arrow(P(oxR, oy - 0.15), P(oxR, oy + 1.2 * uR), ROLE.reference)]
  return {
    id: 'math-uniform-convergence',
    title: 'Uniform convergence',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that uniform convergence means the WHOLE graph of fₙ sits inside an ε-tube around the limit f once n is large. Left: fₙ(x) = x + sin(nx)/n differs from f(x) = x by at most 1/n, so with ε = 0.3 the curves for n = 5 and n = 12 stay inside the tube while n = 2 (swing 0.5) pokes out. Right: xⁿ on [0, 1] tends to 0 at every x < 1 but is never within ε = 0.25 everywhere — at xₙ = 2^(−1/n) its value is always 1/2 — so the convergence is only pointwise (and the limit jumps).',
    ariaLabel:
      'Left: a straight line y equals x with two parallel violet lines above and below it forming an epsilon tube. In the first step the blue wavy curve for n equals 5 and the green wavy curve for n equals 12 stay inside the tube. In the second step a red curve for n equals 2 swings out of the tube. Right: the curves x squared, x to the fifth and x to the fifteenth on [0, 1] in red, blue and green, rising ever more steeply near 1; a violet line at height 0.25 marks the tube above the limit 0; a white dot on each curve at height one half lies above the tube, at x about 0.71, 0.87 and 0.95; an open ring at (1, 0) and a filled dot at (1, 1) show the jump of the limit.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Uniform convergence: draw an ε-tube (violet, ε = 0.3) around the limit f(x) = x. fₙ(x) = x + sin(nx)/n wiggles by at most 1/n, so for n = 5 (blue, 0.2) and n = 12 (green, 0.08) the WHOLE curve lies inside the tube.', objects: [...axesL, lb('x', [-0.3, -3.1]), ln(ucvAtL(0, 0), ucvAtL(3, 3), ROLE.ink, 0.04), ln(ucvAtL(0, eps), ucvAtL(3, 3 + eps), ROLE.aid, 0.03), ln(ucvAtL(0, -eps), ucvAtL(3, 3 - eps), ROLE.aid, 0.03), plot(ucvFn(nsL[0]), 0, 3, (x, y) => ucvAtL(x, y), ROLE.output, 120), plot(ucvFn(nsL[1]), 0, 3, (x, y) => ucvAtL(x, y), ROLE.result, 160), lb('f', ucvAtL(3.15, 3.3)), lb('ε-tube', ucvAtL(0.9, 2.2), ROLE.aid)] },
      { narration: 'For a small n the curve can leave the tube: n = 2 swings 0.5 > ε (red) so it escapes. Uniform convergence says that for every ε there is an N past which ALL n > N behave like n = 5 and 12 — one N for every x at once, because sup |fₙ − f| ≤ 1/n → 0.', objects: [plot(ucvFn(nBad), 0, 3, (x, y) => ucvAtL(x, y), ROLE.input, 100)] },
      { narration: 'Compare fₙ(x) = xⁿ on [0, 1]: the limit is 0 for x < 1 (and 1 at x = 1), so the ε = 0.25 tube sits around 0. But each xⁿ reaches 1/2 at xₙ = 2^(−1/n) ≈ 0.71, 0.87, 0.95 (white dots) — above the tube — however large n is. Convergence at each point, yet not uniform; and the limit is discontinuous, impossible for a uniform limit of continuous functions.', objects: [...axesR, lb('x', [4.75, -3.1]), ...nsR.map((n, i) => plot((x) => Math.pow(x, n), 0, 1, (x, y) => ucvAtR(x, y), colors[i], 90)), ln(ucvAtR(0, epsR), ucvAtR(1, epsR), ROLE.aid, 0.03), ...nsR.map((n) => dt(ucvAtR(xHalf(n), 0.5), ROLE.ink, 0.15)), ringAt(ucvAtR(1, 0), 0.09, ROLE.ink, 16), dt(ucvAtR(1, 1), ROLE.ink, 0.1), lb('½', [oxR - 0.3, ucvAtR(0, 0.5)[1]]), lb('xⁿ: only pointwise', ucvAtR(0.45, 1.15), ROLE.input)] },
    ],
  }
}

// ── 13. Pointwise convergence ────────────────────────────────────────────────

/** fₙ(x) = xⁿ → 0 on [0, 1): the N(x, ε = 0.1) needed grows without bound as x → 1 (N = 2, 4, 7, 11, 22, 45 at x = 0.2, 0.5, 0.7, 0.8, 0.9, 0.95). */
export const PTW = { oxL: -4.4, oxR: 1.4, oyL: -2.2, oyR: -3.0, uL: 3.0, uR: 3.0, hN: 0.1, eps: 0.1, xs: [0.2, 0.5, 0.7, 0.8, 0.9, 0.95] as readonly number[], ns: [1, 2, 4, 8] as readonly number[] }
/** The smallest n with xⁿ < ε. */
export const ptwN = (x: number, eps: number) => { let n = 1; while (Math.pow(x, n) >= eps) n++; return n }
export const ptwAtL = (x: number, y: number): Pt => [PTW.oxL + x * PTW.uL, PTW.oyL + y * PTW.uL]
export const ptwBar = (x: number): Pt => [PTW.oxR + x * PTW.uR, PTW.oyR]

/** KG: fₙ → f pointwise iff ∀x ∀ε ∃N(x, ε); weaker than uniform. */
export function buildPointwiseConvergenceScene(): SceneSpec {
  return framed(raw_buildPointwiseConvergenceScene())
}
function raw_buildPointwiseConvergenceScene(): SceneSpec {
  const { oxL, oxR, oyL, oyR, uL, uR, hN, eps, xs, ns } = PTW
  const colors = [ROLE.ink, ROLE.input, ROLE.output, ROLE.result]
  return {
    id: 'math-pointwise-convergence',
    title: 'Pointwise convergence: N depends on x',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show pointwise convergence of fₙ(x) = xⁿ on [0, 1): at each fixed x < 1, xⁿ → 0, so for ε = 0.1 there is an N(x, ε). But N depends on the point: the bars give the first n with xⁿ < 0.1 — 2 at x = 0.2, 4 at 0.5, 7 at 0.7, 11 at 0.8, 22 at 0.9, 45 at 0.95 — growing without bound as x → 1. No single N serves every x, which is exactly why this convergence is not uniform.',
    ariaLabel:
      'Left: the curves x, x squared, x to the fourth and x to the eighth on [0, 1] in four colours, each flatter against the axis and steeper near 1 as n grows, with a violet horizontal line at height 0.1. Right: six vertical blue bars at x equal to 0.2, 0.5, 0.7, 0.8, 0.9 and 0.95 with heights 2, 4, 7, 11, 22 and 45, each topped by its number; the bars grow faster and faster toward the right end, captioned N of x grows without bound.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The functions fₙ(x) = xⁿ for n = 1, 2, 4, 8. At every x < 1 the values shrink toward 0 as n grows; near x = 1 they stay high for a long time. The violet line is ε = 0.1.', objects: [arrow(P(oxL - 0.15, oyL), P(oxL + uL + 0.3, oyL), ROLE.reference), arrow(P(oxL, oyL - 0.15), P(oxL, oyL + uL + 0.3), ROLE.reference), ...ns.map((n, i) => plot((x) => Math.pow(x, n), 0, 1, (x, y) => ptwAtL(x, y), colors[i], 80)), ln(ptwAtL(0, eps), ptwAtL(1, eps), ROLE.aid, 0.03), lb('n: 1, 2, 4, 8', ptwAtL(0.3, 1.0), ROLE.ink), lb('ε', [oxL - 0.4, ptwAtL(0, eps)[1] + 0.3], ROLE.aid)] },
      { narration: 'For each x ask: how large must n be for xⁿ < 0.1? Bars show it: x = 0.2 needs n ≥ 2 (0.04), x = 0.5 needs 4 (0.0625), x = 0.7 needs 7 (0.082), x = 0.8 needs 11, x = 0.9 needs 22, x = 0.95 needs 45. Every point has its N(x, ε) — that is pointwise convergence.', objects: [ln([oxR - 0.15, oyR], [oxR + uR + 0.3, oyR], ROLE.reference, 0.03), ...xs.map((x) => ln(ptwBar(x), [ptwBar(x)[0], oyR + ptwN(x, eps) * hN], ROLE.output, 0.12)), ...xs.map((x) => lb(String(ptwN(x, eps)), [ptwBar(x)[0], oyR + ptwN(x, eps) * hN + 0.35], ROLE.output)), lb('0', [oxR, oyR - 0.4]), lb('1', [oxR + uR, oyR - 0.4])] },
      { narration: 'The needed N climbs without limit as x approaches 1 (xⁿ < 0.1 at x = 0.99 takes n = 230). No single N works for all x at once: the convergence is pointwise but not uniform — N depends on x as well as ε.', objects: [lb('N(x) is unbounded', [2.2, oyR + 5.0], ROLE.input)] },
    ],
  }
}
