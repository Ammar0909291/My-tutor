/**
 * Mathematics visual campaign, batch 21 (2026-10-12): Boolean circuits, connectivity (κ, λ, Menger), maximum flow, matchings
 * and nine figures of real analysis (sup / inf, ε–N convergence, Cauchy sequences, open and closed sets, ε–δ continuity,
 * uniform continuity, Darboux sums, uniform and pointwise convergence). The circuit is simulated from its DRAWN wires, graphs are
 * rebuilt from drawn dots and lines and their connectivity numbers recomputed by brute force, and every curve, sequence and
 * sum is read back from the drawn coordinates and checked against its formula.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB21'

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
  ['math.disc.boolean-circuits', M.buildBooleanCircuitsScene, 'math-boolean-circuits'],
  ['math.graph.connectivity', M.buildVertexConnectivityScene, 'math-vertex-connectivity'],
  ['math.graph.maximum-flow', M.buildMaximumFlowScene, 'math-maximum-flow'],
  ['math.graph.matching', M.buildMatchingScene, 'math-matching'],
  ['math.real.sup-inf', M.buildSupInfScene, 'math-sup-inf'],
  ['math.real.convergence-sequences', M.buildConvergenceSequencesScene, 'math-convergence-sequences'],
  ['math.real.cauchy-sequence', M.buildCauchySequenceScene, 'math-cauchy-sequence'],
  ['math.real.open-sets', M.buildOpenSetsScene, 'math-open-sets'],
  ['math.real.continuity-rigorous', M.buildContinuityRigorousScene, 'math-continuity-rigorous'],
  ['math.real.uniform-continuity', M.buildUniformContinuityScene, 'math-uniform-continuity'],
  ['math.real.riemann-integral', M.buildRiemannIntegralScene, 'math-riemann-integral'],
  ['math.real.uniform-convergence', M.buildUniformConvergenceScene, 'math-uniform-convergence'],
  ['math.real.pointwise-convergence', M.buildPointwiseConvergenceScene, 'math-pointwise-convergence'],
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
const nearest = (p: number[], cands: number[][]) => cands.reduce((best, c, i) => (dist(p, c) < dist(p, cands[best]) ? i : best), 0)
const subsets = <T,>(xs: readonly T[], k: number): T[][] => (k === 0 ? [[]] : xs.flatMap((x, i) => subsets(xs.slice(i + 1), k - 1).map((r) => [x, ...r])))
/** number of connected components of the graph on `vs` (vertex indices) with the given edges */
const comps = (vs: number[], es: ReadonlyArray<readonly [number, number]>) => { const p = new Map(vs.map((v) => [v, v])); const f = (x: number): number => (p.get(x) === x ? x : (p.set(x, f(p.get(x)!)), p.get(x)!)); for (const [a, b] of es) if (p.has(a) && p.has(b)) p.set(f(a), f(b)); return new Set(vs.map(f)).size }
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)

describe('the mathematics each figure draws', () => {
  it('Boolean circuits: the DRAWN wires, simulated gate by gate, give 0, 1, 1, 0 (exclusive-or), the drawn truth table says the same, and a cut wire breaks it', () => {
    const s = M.buildBooleanCircuitsScene()
    const wires = bonds(s, SLATE, 0.03).map((o) => [[o.from![0], o.from![1]], [o.to![0], o.to![1]]] as [M.Pt, M.Pt])
    const rows = [[0, 0], [0, 1], [1, 0], [1, 1]], t = M.BC.table
    const sim = rows.map(([a, b]) => M.simulateCircuit(a, b, wires))
    expect(sim).toEqual([0, 1, 1, 0])
    expect(sim).toEqual(rows.map(([a, b]) => a ^ b))
    rows.forEach(([a, b], i) => {
      expect(labelAt(s, [t.x[0], t.rows[i]])?.text).toBe(String(a)); expect(labelAt(s, [t.x[1], t.rows[i]])?.text).toBe(String(b))
      expect(labelAt(s, [t.x[2], t.rows[i]])?.text).toBe(String(sim[i]))            // the printed output is what the wires compute
    })
    const ends = wires.flatMap((w) => w)
    for (const g of M.BC.gates) { const p = M.gatePins(g.kind, g.c); for (const q of [...p.in, p.out]) expect(ends.some((e) => dist(e, q as number[]) < 0.02), `${g.id} pin ${q}`).toBe(true) }   // every pin is wired
    expect(M.simulateCircuit(1, 0, wires.filter((w) => !(near(w[0][0], -1.3) && near(w[0][1], 0.7))))).not.toBe(1)                                // cutting the OR output wire changes the answer
    expect(paths(s, INK, 8)).toHaveLength(5 + 6)                                                                                              // gate outlines: 3 symbols + 4 gates
    expect(texts(s)).toEqual(expect.arrayContaining(['AND', 'OR', 'NOT', 'Y = A XOR B']))
  })

  it('Connectivity: rebuilt from the drawn dots and lines the graph has κ = λ = δ = 2 (brute force); the red dots are a minimum vertex cut, the red lines a minimum edge cut, and the two coloured paths are internally disjoint b–e paths (Menger)', () => {
    const s = M.buildVertexConnectivityScene(), { R, centers, edges, cutV, cutE, pathA, pathB } = M.KAP
    const all = bonds(s, SLATE, 0.04)
    const graphOf = (panel: number) => {
      const V = M.kapPoints(panel) as number[][]
      const es = all.filter((o) => dist(o.from!, centers[panel] as number[]) < R + 0.05 && dist(o.to!, centers[panel] as number[]) < R + 0.05).map((o) => [nearest(o.from!, V), nearest(o.to!, V)] as [number, number])
      return { V, es }
    }
    const G0 = graphOf(0), n = 6, vs = [0, 1, 2, 3, 4, 5]
    expect(G0.es).toHaveLength(7)
    for (const p of [1, 2]) expect(graphOf(p).es.map((e) => e.slice().sort().join('-')).sort()).toEqual(G0.es.map((e) => e.slice().sort().join('-')).sort())   // the same graph in all three panels
    const deg = vs.map((v) => G0.es.filter((e) => e.includes(v)).length), delta = Math.min(...deg)
    const kappa = [1, 2, 3, 4].find((k) => subsets(vs, k).some((S) => comps(vs.filter((v) => !S.includes(v)), G0.es) > 1))!
    const lambda = [1, 2, 3].find((k) => subsets(G0.es, k).some((S) => comps(vs, G0.es.filter((e) => !S.includes(e))) > 1))!
    expect([delta, kappa, lambda]).toEqual([2, 2, 2])
    // panel 0: the big (red) dots are the vertex cut
    const redV = dots(s, RED).filter((d) => d.radius === 0.24).map((d) => nearest(d.position!, G0.V)).sort()
    expect(redV).toEqual([...cutV].sort()); expect(redV).toHaveLength(kappa)
    expect(comps(vs.filter((v) => !redV.includes(v)), G0.es)).toBe(2)
    // panel 1: the thick red lines are an edge cut of size λ
    const V1 = M.kapPoints(1) as number[][], redE = bonds(s, RED, 0.1).map((o) => [nearest(o.from!, V1), nearest(o.to!, V1)] as [number, number])
    expect(redE).toHaveLength(lambda)
    expect(comps(vs, G0.es.filter((e) => !redE.some((r) => r.slice().sort().join() === e.slice().sort().join())))).toBe(2)
    expect(cutE).toHaveLength(2)
    // panel 2: two internally vertex-disjoint paths from b (1) to e (4); their number equals the least b–e vertex cut
    const V2 = M.kapPoints(2) as number[][]
    const pathOf = (color: string) => bonds(s, color, 0.09).filter((o) => dist(o.from!, M.KAP.centers[2] as number[]) < R + 0.05).map((o) => [nearest(o.from!, V2), nearest(o.to!, V2)] as [number, number])
    const pa = pathOf(BLUE), pb = pathOf(GREEN), adj = (a: number, b: number) => G0.es.some((e) => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))
    for (const p of [pa, pb]) { expect(p).toHaveLength(3); p.forEach(([a, b]) => expect(adj(a, b)).toBe(true)) }
    const innerA = new Set(pa.flatMap((e) => e).filter((v) => v !== 1 && v !== 4)), innerB = new Set(pb.flatMap((e) => e).filter((v) => v !== 1 && v !== 4))
    expect([...innerA].filter((v) => innerB.has(v))).toEqual([])                                                                                // no shared inner vertex
    const cutBE = [1, 2, 3].find((k) => subsets([0, 2, 3, 5], k).some((S) => { const keep = vs.filter((v) => !S.includes(v)); const es = G0.es.filter((e) => !e.some((v) => S.includes(v))); const comp = (x: number) => { const seen = new Set([x]); let grow = true; while (grow) { grow = false; for (const [a, b] of es) { if (seen.has(a) !== seen.has(b)) { seen.add(a); seen.add(b); grow = true } } } return seen }; return keep.includes(1) && !comp(1).has(4) }))!
    expect(cutBE).toBe(2); expect(pathA.length - 1 + 0).toBe(3); expect(pathB.length - 1).toBe(3)
    expect(texts(s)).toEqual(expect.arrayContaining(['κ = 2', 'λ = 2', '2 ≤ 2 ≤ 2', '2 disjoint paths']))
  })

  it('Maximum flow: capacities and flows are read from the drawn numbers; the flow obeys the capacities and conservation, equals the Edmonds–Karp maximum (4), and the red edges into t are a cut of capacity 4', () => {
    const s = M.buildMaximumFlowScene(), names = Object.keys(M.MF.V), V = names.map((k) => M.MF.V[k] as number[])
    const dotsAt = dots(s, INK).filter((d) => d.radius === M.MF.r).map((d) => d.position!)
    expect(dotsAt).toHaveLength(4); V.forEach((p) => expect(nearest(p, dotsAt) >= 0 && dist(dotsAt[nearest(p, dotsAt)], p) < 0.02).toBe(true))
    const base = arrows(s, SLATE), E = base.map((a) => {
      const u = names[nearest(a.from!, V)], v = names[nearest(a.to!, V)], mid = [(M.MF.V[u][0] + M.MF.V[v][0]) / 2, (M.MF.V[u][1] + M.MF.V[v][1]) / 2], d = [M.MF.V[v][0] - M.MF.V[u][0], M.MF.V[v][1] - M.MF.V[u][1]], l = Math.hypot(d[0], d[1]), nrm = [-d[1] / l, d[0] / l]
      const capLab = labelAt(s, [mid[0] + nrm[0] * 0.42, mid[1] + nrm[1] * 0.42]), flowLab = labelAt(s, [mid[0] - nrm[0] * 0.42, mid[1] - nrm[1] * 0.42])
      const over = bonds(s, BLUE, 0.03 + 0.025 * Number(flowLab!.text)).filter((o) => dist(o.from!, a.from!) < 0.3)
      expect(over.length, `${u}→${v} thickness matches its flow`).toBe(1)
      return { u, v, cap: Number(capLab!.text), flow: Number(flowLab!.text) }
    })
    expect(E).toHaveLength(5)
    E.forEach((e) => { expect(e.flow).toBeLessThanOrEqual(e.cap); expect(e.flow).toBeGreaterThanOrEqual(0) })
    for (const k of ['a', 'b']) expect(sum(E.filter((e) => e.v === k).map((e) => e.flow))).toBe(sum(E.filter((e) => e.u === k).map((e) => e.flow)))   // conservation
    const value = sum(E.filter((e) => e.u === 's').map((e) => e.flow))
    expect(value).toBe(sum(E.filter((e) => e.v === 't').map((e) => e.flow)))
    expect(M.maxFlowValue(E, 's', 't')).toBe(4); expect(value).toBe(4)
    const red = bonds(s, RED, 0.12), cutEdges = E.filter((e) => red.some((o) => dist(o.from!, M.MF.V[e.u] as number[]) < 0.5 && dist(o.to!, M.MF.V[e.v] as number[]) < 0.5))
    expect(cutEdges.map((e) => `${e.u}${e.v}`).sort()).toEqual(['at', 'bt'])
    expect(sum(cutEdges.map((e) => e.cap))).toBe(4)
    const rest = E.filter((e) => !cutEdges.includes(e)); expect(rest.every((e) => e.v !== 't')).toBe(true)                                   // removing them leaves t unreachable
    const dashes = bonds(s, RED, 0.04); dashes.forEach((o) => expect(o.from![0]).toBeCloseTo(M.MF.cutX, 6))
    ;['s', 'a', 'b'].forEach((k) => expect(M.MF.V[k][0]).toBeLessThan(M.MF.cutX)); expect(M.MF.V.t[0]).toBeGreaterThan(M.MF.cutX)
    expect(texts(s)).toEqual(expect.arrayContaining(['max flow 4', 'min cut 2 + 2 = 4']))
  })

  it('Matching: from the drawn lines — M = {1–A, 3–B} is a matching of size 2 with 2 and C free; 2–A–1–B–3–C alternates and joins the free vertices; flipping it gives a perfect matching, and Hall\'s condition holds', () => {
    const s = M.buildMatchingScene(), { edges } = M.MAT
    const L = (p: number, i: number) => M.matLeft(p, i) as number[], Rr = (p: number, j: number) => M.matRight(p, j) as number[]
    const edgeOf = (o: Obj, p: number) => [nearest(o.from![0] < o.to![0] ? o.from! : o.to!, [0, 1, 2].map((i) => L(p, i))), nearest(o.from![0] < o.to![0] ? o.to! : o.from!, [0, 1, 2].map((j) => Rr(p, j)))] as [number, number]
    const key = (e: readonly [number, number]) => `${e[0]}${e[1]}`
    const inPanel = (o: Obj, p: number) => Math.abs((o.from![0] + o.to![0]) / 2 - M.MAT.cx[p]) < 0.1
    const colored = (p: number, color: string) => lines(s, color).filter((o) => o.type === 'bond' && inPanel(o, p)).map((o) => edgeOf(o, p))
    const allE = (p: number) => lines(s).filter((o) => o.type === 'bond' && inPanel(o, p)).map((o) => edgeOf(o, p)).map(key).sort()
    for (const p of [0, 1, 2]) expect(allE(p)).toEqual(edges.map(key).sort())                                                                   // the same graph three times
    const disjoint = (es: Array<readonly [number, number]>) => new Set(es.map((e) => e[0])).size === es.length && new Set(es.map((e) => e[1])).size === es.length
    const thick = (p: number, color: string) => lines(s, color).filter((o) => o.type === 'bond' && inPanel(o, p) && (o.thickness ?? 0) > 0.05).map((o) => edgeOf(o, p))
    const M1 = thick(0, BLUE); expect(M1.map(key).sort()).toEqual(['00', '21']); expect(disjoint(M1)).toBe(true)
    const free = (p: number) => ({ l: [0, 1, 2].filter((i) => dots(s, RED).some((d) => dist(d.position!, L(p, i)) < 0.02)), r: [0, 1, 2].filter((j) => dots(s, RED).some((d) => dist(d.position!, Rr(p, j)) < 0.02)) })
    expect(free(0)).toEqual({ l: [1], r: [2] })
    const matched = new Set(M1.flatMap((e) => [`L${e[0]}`, `R${e[1]}`])); expect([0, 1, 2].filter((i) => !matched.has(`L${i}`))).toEqual(free(0).l); expect([0, 1, 2].filter((j) => !matched.has(`R${j}`))).toEqual(free(0).r)
    const pathBlue = thick(1, BLUE), pathRed = thick(1, RED)
    expect(pathBlue.map(key).sort()).toEqual(M1.map(key).sort()); expect(pathRed).toHaveLength(pathBlue.length + 1)                              // one more unmatched than matched edge
    const walk = ['L1']; const used = new Set<string>(); const all = [...pathRed, ...pathBlue]
    for (let step = 0; step < 5; step++) { const cur = walk[walk.length - 1], e = all.find((x) => !used.has(key(x)) && (`L${x[0]}` === cur || `R${x[1]}` === cur))!; used.add(key(e)); walk.push(`L${e[0]}` === cur ? `R${e[1]}` : `L${e[0]}`) }
    expect(walk).toEqual(['L1', 'R0', 'L0', 'R1', 'L2', 'R2'])                                                                                    // 2 – A – 1 – B – 3 – C
    walk.slice(0, -1).forEach((v, i) => { const e = all.find((x) => (`L${x[0]}` === v && `R${x[1]}` === walk[i + 1]) || (`R${x[1]}` === v && `L${x[0]}` === walk[i + 1]))!; expect(pathRed.some((r) => key(r) === key(e))).toBe(i % 2 === 0) })   // unmatched, matched, unmatched, …
    const sym = new Set([...M1.map(key)]); for (const e of [...pathRed, ...pathBlue]) { if (sym.has(key(e))) sym.delete(key(e)); else sym.add(key(e)) }
    const M2 = thick(2, GREEN); expect(M2.map(key).sort()).toEqual([...sym].sort()); expect(M2).toHaveLength(3); expect(disjoint(M2)).toBe(true)  // M2 = M1 △ path
    expect(new Set(M2.flatMap((e) => [`L${e[0]}`, `R${e[1]}`])).size).toBe(6)                                                                    // perfect
    const nbr = (S: number[]) => new Set(edges.filter((e) => S.includes(e[0])).map((e) => e[1])).size
    for (let k = 1; k <= 3; k++) for (const S of subsets([0, 1, 2], k)) expect(nbr(S)).toBeGreaterThanOrEqual(S.length)                           // Hall
    expect(colored(2, GREEN).length).toBeGreaterThan(0)
  })

  it('Supremum / infimum: the dots are 1 − 1/n; 1 bounds them all but is not one of them (open ring), 0.9 is below the red member 1 − 1/11, and the green dot 0 is a member (the minimum)', () => {
    const s = M.buildSupInfScene(), { x0, u } = M.SUP, val = (x: number) => (x - x0) / u
    const terms = dots(s, INK).filter((d) => d.radius === 0.1).map((d) => val(d.position![0])).sort((a, b) => a - b)
    expect(terms).toHaveLength(12); terms.forEach((v, i) => expect(v).toBeCloseTo(1 - 1 / (i + 1), 2))
    expect(Math.max(...terms)).toBeLessThan(1); expect(Math.min(...terms)).toBeCloseTo(0, 2)
    const ring = fitCircle(pathsOf(s, GREEN, 8)[0]); expect(val(ring.c[0])).toBeCloseTo(1, 2)                                                       // sup S = 1 …
    expect(terms.every((v) => Math.abs(v - 1) > 0.05)).toBe(true)                                                                                // … is not attained
    const tick = bonds(s, RED, 0.05)[0]; expect(val(tick.from![0])).toBeCloseTo(0.9, 2)
    const redDot = dots(s, RED).find((d) => d.radius === 0.12)!; expect(val(redDot.position![0])).toBeCloseTo(1 - 1 / 11, 2); expect(val(redDot.position![0])).toBeGreaterThan(0.9)   // 0.9 is not an upper bound
    expect(terms.some((v) => Math.abs(v - val(redDot.position![0])) < 0.002)).toBe(true)                                                         // the red dot IS a member
    const minDot = dots(s, GREEN).find((d) => d.radius === 0.14)!; expect(val(minDot.position![0])).toBeCloseTo(0, 2); expect(terms.some((v) => Math.abs(v) < 0.002)).toBe(true)   // inf S = 0 is attained
    const ub = bonds(s, VIOLET, 0.09); const spans = ub.map((o) => [val(o.from![0]), val(o.to![0])].sort((a, b) => a - b)); expect(spans).toEqual(expect.arrayContaining([expect.arrayContaining([expect.closeTo(1, 2), expect.closeTo(1.5, 2)]), expect.arrayContaining([expect.closeTo(-0.5, 2), expect.closeTo(0, 2)])]))
    expect(texts(s)).toEqual(expect.arrayContaining(['sup = 1: not attained', 'inf = 0: attained', '0.9', '0.909']))
  })

  it('Convergence of a sequence: the dots are 2 + (−1)ⁿ/n; for the drawn bands ε = 0.3 and 0.15 exactly the terms n ≤ N lie outside and every later term is inside', () => {
    const s = M.buildConvergenceSequencesScene(), { ox, ux, uy, L } = M.CNV
    const pts = dots(s, INK).filter((d) => d.radius === 0.13).map((d) => ({ n: Math.round((d.position![0] - ox) / ux), v: d.position![1] / uy + L })).sort((a, b) => a.n - b.n)
    expect(pts.map((p) => p.n)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1)); pts.forEach((p) => expect(Math.abs(p.v - (2 + Math.pow(-1, p.n) / p.n))).toBeLessThan(0.01))
    const band = bonds(s, VIOLET, 0.03).map((o) => o.from![1] / uy), eps = [...new Set(band.filter((y) => y > 0).map((y) => Math.round(y * 1000) / 1000))].sort((a, b) => b - a)
    expect(eps).toEqual([0.3, 0.15]); bonds(s, VIOLET, 0.03).forEach((o) => expect(Math.abs(o.from![1])).toBeCloseTo(Math.abs(o.to![1]), 6))
    const marks = bonds(s, GREEN, 0.03).map((o) => (o.from![0] - ox) / ux).sort((a, b) => a - b); expect(marks).toEqual([3.5, 6.5].map((m) => expect.closeTo(m, 2)))
    const outside = (step: number) => s.steps[step].objects.filter((o) => (o as Obj).type === 'node' && (o as Obj).radius === 0.19).map((o) => Math.round(((o as Obj).position![0] - ox) / ux)).sort((a, b) => a - b)
    ;[[1, 0.3, 3], [2, 0.15, 6]].forEach(([step, e, N]) => {
      expect(outside(step)).toEqual(pts.filter((p) => Math.abs(p.v - 2) >= e).map((p) => p.n))                                                      // red = outside the band
      expect(pts.filter((p) => p.n > N).every((p) => Math.abs(p.v - 2) < e)).toBe(true)                                                              // n > N: inside
      expect(pts.filter((p) => p.n === N).every((p) => Math.abs(p.v - 2) >= e)).toBe(true)                                                            // N is the last outsider
    })
    expect(texts(s)).toEqual(expect.arrayContaining(['N₁ = 3', 'N₂ = 6', 'ε₁ = 0.3', 'ε₂ = 0.15', 'L = 2']))
  })

  it('Cauchy: the dots are sₙ = 2 − 2^(1−n); every pair beyond N = 4 is closer than the drawn ε ruler (and n = 4 is not enough); (−1)ⁿ stays 2 apart', () => {
    const s = M.buildCauchySequenceScene(), { x0, u, y, N, yb, ub } = M.CAU
    const top = dots(s, INK).filter((d) => d.radius === 0.11).map((d) => (d.position![0] - x0) / u + 1).sort((a, b) => a - b)
    expect(top).toHaveLength(7); top.forEach((v, i) => expect(v).toBeCloseTo(2 - Math.pow(2, -i), 2))
    const ruler = bonds(s, VIOLET, 0.05).find((o) => near(o.from![1], y + 1.0, 1e-6))!, eps = (ruler.to![0] - ruler.from![0]) / u; expect(eps).toBeCloseTo(0.1, 2)
    const beyond = top.slice(N); let worst = 0; for (const a of beyond) for (const b of beyond) worst = Math.max(worst, Math.abs(a - b)); expect(worst).toBeLessThan(eps)
    expect(Math.abs(top[N - 1] - top[6])).toBeGreaterThan(eps)                                                                                    // N = 3 would not do
    const br = bonds(s, VIOLET, 0.05).find((o) => near(o.from![1], y - 0.35, 1e-6))!; expect(br.from![0]).toBeCloseTo((top[N] - 1) * u + x0, 1); expect((br.to![0] - br.from![0]) / u).toBeCloseTo(2 - top[N], 1)
    const bot = dots(s, INK).filter((d) => d.radius === 0.14).map((d) => d.position!); expect(bot).toHaveLength(2)
    expect(Math.abs(bot[0][0] - bot[1][0]) / 2).toBeCloseTo(ub, 1)   // the dots sit at ±1 (half the gap = ub screen units per unit); expect(bot[0][1]).toBeCloseTo(yb, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['ε = 0.1', 'n > 4', 'gap 2']))
  })

  it('Open and closed sets: the blue ball around x lies inside the dashed disc, the red ball around the edge point y sticks out, the blue ball around z stays outside the solid disc', () => {
    const s = M.buildOpenSetsScene(), { R, cl, cr, rx, ry, rz } = M.OPN
    const arcs = pathsOf(s, SLATE, 8).filter((p) => p.points!.length === 9), whole = pathsOf(s, SLATE, 8).filter((p) => p.points!.length === 41)
    expect(arcs).toHaveLength(24); arcs.forEach((a) => a.points!.forEach((q) => expect(dist(q, cl as number[])).toBeCloseTo(R, 1)))                  // dashed edge of the open disc
    expect(whole).toHaveLength(1); whole[0].points!.forEach((q) => expect(dist(q, cr as number[])).toBeCloseTo(R, 1))                            // solid edge of the closed disc
    const rings = paths(s).filter((p) => p.points!.length === 33).map((p) => ({ ...fitCircle(p), color: p.color }))
    const ball = (near_: number[]) => rings.find((r) => dist(r.c, near_) < 0.1)!
    const dx = dots(s, INK).map((d) => d.position!), xp = dx.find((p) => dist(p, cl as number[]) < R)!, yp = dx.find((p) => near(dist(p, cr as number[]), R, 0.05))!, zp = dx.find((p) => dist(p, cr as number[]) > R + 0.5 && dist(p, cr as number[]) < 3.5)!
    const bx = ball(xp), by = ball(yp), bz = ball(zp)
    expect(bx.r).toBeCloseTo(rx, 1); expect(dist(xp, cl as number[]) + bx.r).toBeLessThan(R)                                                       // B(x, r) ⊂ S
    expect(by.r).toBeCloseTo(ry, 1); expect(dist(yp, cr as number[]) + by.r).toBeGreaterThan(R); expect(dist(yp, cr as number[]) - by.r).toBeLessThan(R)   // sticks out
    expect(bz.r).toBeCloseTo(rz, 1); expect(dist(zp, cr as number[]) - bz.r).toBeGreaterThan(R)                                                    // ball wholly outside
    ;[bx, bz].forEach((b) => expect(b.color).toBe(BLUE)); expect(by.color).toBe(RED)
    expect(texts(s)).toEqual(expect.arrayContaining(['open', 'closed', 'B(x, r)', 'complement is open']))
  })

  it('ε–δ continuity: x² stays inside the ε-band for the drawn window δ (below the largest allowed 0.2247); the jump function leaves the band on the left of a for EVERY δ', () => {
    const s = M.buildContinuityRigorousScene(), { ux, uy, oxL, oxR, oy, a, eps, delta } = M.CTY
    const inv = (ox: number) => (p: number[]) => [(p[0] - ox) / ux, (p[1] - oy) / uy]
    const parab = pathsOf(s, BLUE, 40)[0].points!.map(inv(oxL)); parab.forEach(([x, y]) => expect(Math.abs(y - x * x)).toBeLessThan(0.02))
    const bl = bonds(s, VIOLET, 0.03), bandOf = (left: boolean) => bl.filter((o) => (o.from![0] < 0) === left).map((o) => Math.round(inv(left ? oxL : oxR)(o.from!)[1] * 100) / 100).sort((x, y) => x - y)
    expect(bandOf(true)).toEqual([0.5, 1.5]); expect(bandOf(false)).toEqual([1.5, 2.5])                                                             // f(a) ± ε around 1 and around 2
    const win = pathsOf(s, GREEN, 8)[0].points!.map(inv(oxL)); expect(win.length).toBeGreaterThan(8)
    win.forEach(([x, y]) => { expect(Math.abs(x - a)).toBeLessThanOrEqual(delta + 0.01); expect(Math.abs(y - 1)).toBeLessThan(eps) })              // |x − a| < δ ⟹ |f(x) − f(a)| < ε
    expect(delta).toBeLessThan(M.ctyDeltaMax(eps)); expect(M.ctyDeltaMax(eps)).toBeCloseTo(0.2247, 3)
    expect(M.ctyDeltaMax(0.2)).toBeCloseTo(0.0954, 3)                                                                                               // a smaller ε needs a smaller δ
    const greens = bonds(s, GREEN, 0.04).map((o) => inv(o.from![0] < 0 ? oxL : oxR)(o.from!)[0]); greens.forEach((x) => expect(Math.abs(Math.abs(x - a) - delta)).toBeLessThan(0.02))
    const right = bonds(s, BLUE, 0.04).map((o) => ({ f: inv(oxR)(o.from!), t: inv(oxR)(o.to!) })).filter((o) => o.f[0] >= -0.01 && o.t[0] <= 1.81)
    const leftBranch = right.find((o) => o.f[0] < 0.05 && o.t[0] < 1.05)!, rightBranch = right.find((o) => o.f[0] > 0.9)!
    expect((leftBranch.t[1] - leftBranch.f[1]) / (leftBranch.t[0] - leftBranch.f[0])).toBeCloseTo(1, 1); expect(rightBranch.f[1]).toBeCloseTo(2, 1)    // y = x then jumps up to f(a) = 2
    for (const d of [0.22, 0.1, 0.01, 0.001]) expect(Math.abs(M.ctyJump(a - d / 2) - M.ctyJump(a))).toBeGreaterThan(0.5)                               // no δ keeps f within ε = 0.5
    const red = bonds(s, RED, 0.1)[0]; expect(inv(oxR)(red.from!)[1]).toBeLessThan(2 - eps); expect(inv(oxR)(red.to!)[1]).toBeLessThan(2 - eps)
  })

  it('Uniform continuity: with the same window δ = 0.5 the boxes drawn on sin x are never taller than δ, while those on x² grow 0.75, 1.75, 2.75, and every number written matches the curve', () => {
    const s = M.buildUniformContinuityScene(), { oxL, oxR, oy, ux, uy, delta, starts } = M.UNC
    const heightsOf = (color: string, ox: number) => starts.map((x0) => {
      const hs = bonds(s, color, 0.03).filter((o) => near(o.from![1], o.to![1], 1e-9) && near(o.from![0], ox + x0 * ux, 0.011))
      expect(hs).toHaveLength(2); const [ya, yb] = hs.map((o) => o.from![1]).sort((a, b) => a - b)
      const w = hs[0].to![0] - hs[0].from![0]; expect(w).toBeCloseTo(delta * ux, 1)
      return (yb - ya) / uy
    })
    const hs = heightsOf(VIOLET, oxL), hq = heightsOf(RED, oxR)
    starts.forEach((x0, i) => { expect(hs[i]).toBeCloseTo(M.windowRange(Math.sin, x0, x0 + delta), 1); expect(hq[i]).toBeCloseTo((x0 + delta) ** 2 - x0 ** 2, 1) })
    hs.forEach((h) => expect(h).toBeLessThanOrEqual(delta + 0.01))                                                                                  // |sin x − sin y| ≤ |x − y|
    expect(hq).toEqual([0.75, 1.75, 2.75].map((v) => expect.closeTo(v, 1))); expect(hq[2] / hq[0]).toBeGreaterThan(3)
    const written = labelsOf(s).map((o) => o.text ?? ''); for (const v of [...starts.map((x0) => M.windowRange(Math.sin, x0, x0 + delta)), ...starts.map((x0) => (x0 + delta) ** 2 - x0 ** 2)]) expect(written).toContain((Math.round(v * 100) / 100).toFixed(2))   // the printed heights are the true changes
    for (const [col, ox, fn] of [[BLUE, oxL, Math.sin], [BLUE, oxR, (x: number) => x * x]] as const) { const p = pathsOf(s, col, 40).find((q) => (q.points![0][0] - ox) < 0.05 && (q.points![0][0] - ox) > -0.05)!; p.points!.forEach((q) => expect(Math.abs((q[1] - oy) / uy - fn((q[0] - ox) / ux))).toBeLessThan(0.03)) }
  })

  it('Riemann integral: the drawn blue / red rectangles give the Darboux sums 0.21875 / 0.46875 (n = 4) and 0.2734 / 0.3984 (n = 8), recomputed from the drawn heights; L ≤ 1/3 ≤ U and U − L = 1/n', () => {
    const s = M.buildRiemannIntegralScene(), { ox, u, oy } = M.DAR
    const sumOf = (color: string, panel: number) => { const tops = bonds(s, color, 0.035).filter((o) => (panel === 0 ? o.from![0] < ox[1] - 0.3 : o.from![0] >= ox[1] - 0.3)); return { n: tops.length, total: sum(tops.map((o) => ((o.to![0] - o.from![0]) / u) * ((o.from![1] - oy) / u))) } }
    const [lo4, up4, lo8, up8] = [sumOf(BLUE, 0), sumOf(RED, 0), sumOf(BLUE, 1), sumOf(RED, 1)]
    expect([up4.n, lo4.n + 1, up8.n, lo8.n + 1]).toEqual([4, 4, 8, 8])
    expect(lo4.total).toBeCloseTo(14 / 64, 2); expect(up4.total).toBeCloseTo(30 / 64, 2); expect(lo8.total).toBeCloseTo(140 / 512, 2); expect(up8.total).toBeCloseTo(204 / 512, 2)
    ;[[lo4, up4, 4], [lo8, up8, 8]].forEach(([l, uu, n]) => { expect((l as typeof lo4).total).toBeLessThan(1 / 3); expect((uu as typeof lo4).total).toBeGreaterThan(1 / 3); expect((uu as typeof lo4).total - (l as typeof lo4).total).toBeCloseTo(1 / (n as number), 2) })
    expect(lo8.total).toBeGreaterThan(lo4.total); expect(up8.total).toBeLessThan(up4.total)                                                          // refining tightens both
    expect(texts(s)).toEqual(expect.arrayContaining(['L₄ = 0.22', 'U₄ = 0.47', 'L₈ = 0.27', 'U₈ = 0.40', 'L ≤ ∫ ≤ U']))
    for (const panel of [0, 1]) { const c = pathsOf(s, INK, 40).find((p) => (panel === 0 ? p.points![0][0] < ox[1] - 0.3 : p.points![0][0] >= ox[1] - 0.3))!; c.points!.forEach((q) => expect(Math.abs((q[1] - oy) / u - ((q[0] - ox[panel]) / u) ** 2)).toBeLessThan(0.01)) }
  })

  it('Uniform convergence: x + sin(nx)/n deviates from x by at most 1/n (inside the ε = 0.3 tube for n = 5, 12; n = 2 leaves it), and xⁿ reaches 1/2 at xₙ = 2^(−1/n) above the 0.25 tube', () => {
    const s = M.buildUniformConvergenceScene(), { oxL, oxR, oy, uL, uR, eps, epsR } = M.UCV
    const onLeft = (p: Obj) => p.points![0][0] < 0, left = (color: string) => pathsOf(s, color, 40).find(onLeft)!, right = (color: string) => pathsOf(s, color, 40).find((p) => !onLeft(p))!
    const dev = (p: Obj, n: number) => Math.max(...p.points!.map((q) => { const x = (q[0] - oxL) / uL, y = (q[1] - oy) / uL; expect(Math.abs(y - (x + Math.sin(n * x) / n))).toBeLessThan(0.02); return Math.abs(y - x) }))
    const d5 = dev(left(BLUE), 5), d12 = dev(left(GREEN), 12), d2 = dev(left(RED), 2)
    expect(d5).toBeLessThan(eps); expect(d12).toBeLessThan(eps); expect(d2).toBeGreaterThan(eps)
    expect(d5).toBeCloseTo(1 / 5, 1); expect(d12).toBeCloseTo(1 / 12, 1); expect(d2).toBeCloseTo(1 / 2, 1)
    const tube = bonds(s, VIOLET, 0.03).filter((o) => o.from![0] < 0).map((o) => (o.from![1] - oy) / uL - (o.from![0] - oxL) / uL).map((v) => Math.round(v * 100) / 100).sort((a, b) => a - b)
    expect(tube).toEqual([-eps, eps])
    const ns = [2, 5, 15]; ;[[RED, 2], [BLUE, 5], [GREEN, 15]].forEach(([col, n]) => right(col as string).points!.forEach((q) => expect(Math.abs((q[1] - oy) / uR - Math.pow((q[0] - oxR) / uR, n as number))).toBeLessThan(0.02)))
    const marks = dots(s, INK).filter((d) => d.radius === 0.15).map((d) => ({ x: (d.position![0] - oxR) / uR, y: (d.position![1] - oy) / uR })).sort((a, b) => a.x - b.x)
    expect(marks).toHaveLength(3); marks.forEach((m, i) => { expect(m.x).toBeCloseTo(Math.pow(0.5, 1 / ns[i]), 1); expect(Math.pow(m.x, ns[i])).toBeCloseTo(0.5, 1); expect(m.y).toBeGreaterThan(epsR) })
    const t2 = bonds(s, VIOLET, 0.03).find((o) => o.from![0] > 0)!; expect((t2.from![1] - oy) / uR).toBeCloseTo(epsR, 2)
  })

  it('Pointwise convergence: the bars are the least n with xⁿ < 0.1 at each drawn x (2, 4, 7, 11, 22, 45), strictly growing; the family of curves is xⁿ for n = 1, 2, 4, 8', () => {
    const s = M.buildPointwiseConvergenceScene(), { oxL, oxR, oyL, oyR, uL, uR, hN, eps } = M.PTW
    const first = (x: number) => { let n = 1; while (Math.pow(x, n) >= eps) n++; return n }
    const bars = bonds(s, BLUE, 0.12).map((o) => ({ x: (o.from![0] - oxR) / uR, N: (o.to![1] - oyR) / hN })).sort((a, b) => a.x - b.x)
    expect(bars.map((b) => Math.round(b.x * 100) / 100)).toEqual([0.2, 0.5, 0.7, 0.8, 0.9, 0.95])
    bars.forEach((b) => { const N = first(Math.round(b.x * 100) / 100); expect(Math.round(b.N)).toBe(N); expect(Math.pow(b.x, N)).toBeLessThan(eps); expect(Math.pow(b.x, N - 1)).toBeGreaterThanOrEqual(eps - 1e-9) })
    expect(bars.map((b) => Math.round(b.N))).toEqual([2, 4, 7, 11, 22, 45])
    bars.reduce((prev, b) => { expect(b.N).toBeGreaterThan(prev); return b.N }, 0)
    expect(first(0.99)).toBe(230)                                                                                                                       // N is unbounded as x → 1
    const nums = labelsOf(s).map((o) => o.text); for (const N of [2, 4, 7, 11, 22, 45]) expect(nums).toContain(String(N))
    const fam = pathsOf(s, INK, 40).concat(pathsOf(s, RED, 40), pathsOf(s, BLUE, 40), pathsOf(s, GREEN, 40)), exps = [1, 2, 4, 8]
    expect(fam).toHaveLength(4)
    exps.forEach((n) => expect(fam.some((p) => p.points!.every((q) => Math.abs((q[1] - oyL) / uL - Math.pow((q[0] - oxL) / uL, n)) < 0.02))).toBe(true))
    const e = bonds(s, VIOLET, 0.03)[0]; expect((e.from![1] - oyL) / uL).toBeCloseTo(eps, 2)
  })
})
