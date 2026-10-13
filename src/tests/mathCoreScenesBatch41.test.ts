/**
 * Mathematics visual campaign, batch 41 (2026-10-13): four geometry helpers, four function helpers and four complex-analysis helpers. Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB41'
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
  ['math.geom.geometric-proof', M.buildGeometricProofScene, 'math-geometric-proof'],
  ['math.geom.length', M.buildLengthScene, 'math-length'],
  ['math.geom.differential-geometry-surfaces', M.buildSurfaceCurvatureScene, 'math-surface-curvature'],
  ['math.geom.geometric-constructions', M.buildGeometricConstructionsScene, 'math-geometric-constructions'],
  ['math.func.function-notation', M.buildFunctionNotationScene, 'math-function-notation'],
  ['math.func.zero-of-function', M.buildZeroOfFunctionScene, 'math-zero-of-function'],
  ['math.func.step-function', M.buildStepFunctionScene, 'math-step-function'],
  ['math.func.function-operations', M.buildFunctionOperationsScene, 'math-function-operations'],
  ['math.cx.analytic-continuation', M.buildAnalyticContinuationScene, 'math-analytic-continuation'],
  ['math.cx.singularities', M.buildSingularitiesScene, 'math-singularities'],
  ['math.cx.residue', M.buildResidueScene, 'math-residue'],
  ['math.cx.argument-principle', M.buildArgumentPrincipleScene, 'math-argument-principle'],
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
  /** drawn world coordinates → graph coordinates of a frame */
  const toG = (f: M.Frame, p: readonly number[]): [number, number] => [(p[0] - f.ox) / f.ux, (p[1] - f.oy) / f.uy]
  const pathG = (o: Obj, f: M.Frame) => o.points!.map((p) => toG(f, p))
  const labelIn = (s: SceneSpec, start: string) => labelsOf(s).find((l) => (l.text ?? '').startsWith(start))!
  const valueAt = (g: [number, number][], x: number) => { for (let i = 1; i < g.length; i++) if (g[i][0] >= x) { const [x0, y0] = g[i - 1], [x1, y1] = g[i]; return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) } return g[g.length - 1][1] }
  const polyLen = (pts: readonly number[][]) => sum(pts.slice(1).map((p, i) => dist(p, pts[i])))
  const degOf = (rad: number) => (rad * 180) / Math.PI
  /** the angle (degrees) at vertex V between the rays to P and Q */
  const angleAt = (V: readonly number[], P: readonly number[], Q: readonly number[]) => { const u = [P[0] - V[0], P[1] - V[1]], w = [Q[0] - V[0], Q[1] - V[1]]; return degOf(Math.atan2(Math.abs(crossz(u, w)), dotp(u, w))) }
  const after = (t: string, sep: string) => t.slice(t.indexOf(sep) + sep.length)

  // ── 1. geometric proof ─────────────────────────────────────────────────────────────────────
  it('math.geom.geometric-proof: the drawn triangle has the angles 50°, 60°, 70°; the parallel through C makes equal alternate angles; the three angles at C fill a straight angle of 180°', () => {
    const s = M.buildGeometricProofScene()
    const sides = bonds(s, SLATE, 0.06)
    expect(sides).toHaveLength(3)
    const verts = dots(s, INK).map((d) => d.position!)
    expect(verts).toHaveLength(3)
    const named = (n: string) => { const l = labelsOf(s).find((q) => q.text === n && q.color === INK)!; return verts.reduce((m, v) => (dist(v, l.position!) < dist(m, l.position!) ? v : m)) }
    const A = named('A'), B = named('B'), C = named('C')
    const aA = angleAt(A, B, C), aB = angleAt(B, A, C), aC = angleAt(C, A, B)
    closeVec([aA, aB, aC], [50, 60, 70], 0.4)                                                // measured on the drawn triangle
    expect(aA + aB + aC).toBeCloseTo(180, 1)                                                  // the proved fact, on the drawing
    // the parallel line through C
    const [par] = bonds(s, VIOLET, 0.04)
    expect(Math.abs(par.from![1] - C[1])).toBeLessThan(0.02); expect(Math.abs(par.to![1] - C[1])).toBeLessThan(0.02)
    expect(Math.abs(crossz([par.to![0] - par.from![0], par.to![1] - par.from![1]], [B[0] - A[0], B[1] - A[1]]))).toBeLessThan(0.02)   // ∥ AB
    expect(Math.min(par.from![0], par.to![0])).toBeLessThan(Math.min(A[0], C[0])); expect(Math.max(par.from![0], par.to![0])).toBeGreaterThan(Math.max(B[0], C[0]))
    // alternate angles: parallel-line direction against CA equals the angle at A; against CB equals the angle at B
    const left = [C[0] - 1, C[1]], right = [C[0] + 1, C[1]]
    expect(angleAt(C, left, A)).toBeCloseTo(aA, 0); expect(angleAt(C, right, B)).toBeCloseTo(aB, 0)
    expect(angleAt(C, left, A) + angleAt(C, A, B) + angleAt(C, B, right)).toBeCloseTo(180, 1)  // the three angles at C fill the straight angle
    // the drawn arcs: spans measured about their vertices — blue 50 (A and C-left), red 60 (B and C-right), green 70 (gamma), violet 180 (straight)
    const span = (p: Obj) => { const V = [...verts].sort((a, b) => dist(a, p.points![0]) - dist(b, p.points![0]))[0]; const last = p.points![p.points!.length - 1]; expect(dist(V, p.points![0])).toBeCloseTo(dist(V, last), 1); return angleAt(V, p.points![0], last) }
    const spans = (c: string) => paths(s, c).map(span).sort((a, b) => a - b)
    closeVec(spans(BLUE), [50, 50], 0.5); closeVec(spans(RED), [60, 60], 0.5); closeVec(spans(GREEN), [70], 0.5); closeVec(spans(VIOLET), [180], 0.5)
    // the caption's sum is the arithmetic of the measured angles
    const cap = labelIn(s, '50°').text!
    expect(numsIn(cap)).toEqual([50, 70, 60, 180])
    expect(evalLR(cap.replace(/°/g, ''))).toBe(180)
    expect(Math.round(aA) + Math.round(aC) + Math.round(aB)).toBe(180)
    for (const t of ['α', 'β', 'γ', 'alternate angles are equal', 'straight angle']) expect(texts(s)).toContain(t)
  })

  // ── 2. length ──────────────────────────────────────────────────────────────────────────────
  it('math.geom.length: the chord paths of 1, 2 and 4 equal chords have the lengths 1.41, 1.53, 1.56 (in units of the radius) and climb towards the arc length 1.57', () => {
    const s = M.buildLengthScene(), R = M.LEN.R, c = M.LEN.c
    const arc = paths(s, BLUE)[0]
    arc.points!.forEach((p) => expect(dist(p, c)).toBeCloseTo(R, 1))
    const arcLen = polyLen(arc.points!) / R
    expect(arcLen).toBeCloseTo(Math.PI / 2, 2)                                        // a quarter circle: π/2
    const groups: Array<[string, number]> = [[RED, 1], [VIOLET, 2], [GREEN, 4]]
    const totals = groups.map(([color, n]) => {
      const ch = bonds(s, color, 0.06)
      expect(ch, color).toHaveLength(n)
      const lens = ch.map(len)
      lens.forEach((l) => expect(l).toBeCloseTo(lens[0], 1))                          // equal chords
      ch.forEach((o) => { expect(dist(o.from!, c)).toBeCloseTo(R, 1); expect(dist(o.to!, c)).toBeCloseTo(R, 1) })   // inscribed in the arc
      const ends = ch.flatMap((o) => [o.from!, o.to!])
      expect(ends.some((p) => dist(p, arc.points![0]) < 0.03) && ends.some((p) => dist(p, arc.points![arc.points!.length - 1]) < 0.03)).toBe(true)   // the path runs from end to end of the arc
      return sum(lens) / R
    })
    closeVec(totals, [Math.SQRT2, 1.5307, 1.5607], 0.01)                                // 2n sin(π/4n) for n = 1, 2, 4
    totals.forEach((t, i) => { expect(t).toBeLessThan(arcLen); if (i) expect(t).toBeGreaterThan(totals[i - 1]) })   // each path is shorter than the arc, and longer than the one before
    const cap = (p: string) => numOf(after(labelIn(s, p).text!, ': '))
    expect([cap('1 chord'), cap('2 chords'), cap('4 chords'), cap('arc')]).toEqual([...totals, arcLen].map((v) => Math.round(v * 100) / 100))
    for (const t of ['1 chord: 1.41', '2 chords: 1.53', '4 chords: 1.56', 'arc: 1.57']) expect(texts(s)).toContain(t)
  })

  // ── 3. curvature of surfaces ───────────────────────────────────────────────────────────────
  it('math.geom.differential-geometry-surfaces: the drawn sections have radius 2 and the signs (+ +), (+ 0), (+ −), so K = k₁ k₂ is positive, zero, negative', () => {
    const s = M.buildSurfaceCurvatureScene()
    const curves = [...paths(s, BLUE), ...paths(s, RED)]
    expect(curves).toHaveLength(6)
    const info = curves.map((p) => {
      const pts = p.points!, a = pts[0], m = pts[Math.floor(pts.length / 2)], z = pts[pts.length - 1]
      const sag = (a[1] + z[1]) / 2 - m[1]                                           // positive: the ends are above the middle (bends up)
      const area2 = Math.abs(crossz([m[0] - a[0], m[1] - a[1]], [z[0] - a[0], z[1] - a[1]]))
      const R = area2 < 0.02 ? Infinity : (dist(a, m) * dist(m, z) * dist(a, z)) / (2 * area2)   // circumradius of three drawn points
      const sign = Math.abs(sag) < 0.03 ? 0 : sag > 0 ? 1 : -1
      return { x: m[0], y: m[1], sign, R }
    })
    const cols = [...new Set(info.map((i) => Math.round(i.x * 10)))].sort((a, b) => a - b)
    expect(cols).toHaveLength(3)
    const colInfo = cols.map((cx) => info.filter((i) => Math.round(i.x * 10) === cx).sort((a, b) => b.y - a.y))
    const signs = colInfo.map((c) => c.map((i) => i.sign))
    expect(signs).toEqual([[1, 1], [1, 0], [1, -1]])                                  // sphere, cylinder, saddle
    colInfo.flat().filter((i) => i.sign !== 0).forEach((i) => expect(i.R).toBeCloseTo(2, 0))   // the principal radius of curvature is 2 (k = 0.5)
    const K = colInfo.map((c) => c.reduce((p, i) => p * (i.sign === 0 ? 0 : i.sign / i.R), 1))
    expect([Math.sign(K[0]), Math.sign(K[1]), Math.sign(K[2])]).toEqual([1, 0, -1])
    closeVec(K, [0.25, 0, -0.25], 0.03)                                               // K = k₁ k₂
    // the drawn sign marks and K captions agree with the measured curvatures
    const markOf = (col: number, row: number) => { const ref = colInfo[col][row]; return labelsOf(s).filter((l) => /^[+−0]$/.test(l.text ?? '')).sort((a, b) => dist(a.position!, [ref.x, ref.y - 0.75]) - dist(b.position!, [ref.x, ref.y - 0.75]))[0].text! }
    for (let col = 0; col < 3; col++) for (let row = 0; row < 2; row++) expect(markOf(col, row)).toBe(signs[col][row] > 0 ? '+' : signs[col][row] < 0 ? '−' : '0')
    const caps = ['K > 0', 'K = 0', 'K < 0']
    caps.forEach((t, i) => { const l = labelIn(s, t); expect(Math.abs(l.position![0] - colInfo[i][0].x)).toBeLessThan(0.5) })
    expect(texts(s)).toContain('two sections through one point')
    const names = ['sphere', 'cylinder', 'saddle']
    names.forEach((t, i) => expect(Math.abs(labelIn(s, t).position![0] - colInfo[i][0].x)).toBeLessThan(0.5))
  })

  // ── 4. compass and straightedge ────────────────────────────────────────────────────────────
  it('math.geom.geometric-constructions: P and Q are on both circles (radius 2.4 > AB/2), PA = PB, and PQ crosses AB at its midpoint at a right angle', () => {
    const s = M.buildGeometricConstructionsScene()
    const [A, B] = dots(s, INK).map((d) => d.position!).sort((a, b) => a[0] - b[0])
    const AB = dist(A, B)
    const [ca] = paths(s, BLUE), [cb] = paths(s, RED)
    const fit = (p: Obj) => { const e = extent(p); expect(e.rx).toBeCloseTo(e.ry, 1); return { c: [e.cx, e.cy], r: (e.rx + e.ry) / 2 } }
    const [fa, fb] = [fit(ca), fit(cb)]
    expect(dist(fa.c, A)).toBeLessThan(0.03); expect(dist(fb.c, B)).toBeLessThan(0.03)
    expect(fa.r).toBeCloseTo(fb.r, 1); expect(fa.r).toBeCloseTo(2.4, 1)               // the same compass opening
    expect(fa.r).toBeGreaterThan(AB / 2)                                              // wider than half of AB, so the circles meet
    expect(numsIn(labelIn(s, 'compass radius').text!)).toEqual([Math.round(fa.r * 10) / 10])
    const pq = dots(s, GREEN).map((d) => d.position!).sort((a, b) => b[1] - a[1])
    expect(pq).toHaveLength(2)
    const [P1, Q1] = pq
    ;[P1, Q1].forEach((p) => { expect(dist(p, A)).toBeCloseTo(fa.r, 1); expect(dist(p, B)).toBeCloseTo(fa.r, 1) })   // on both circles: PA = PB = QA = QB
    const pa = bonds(s, VIOLET, 0.03).filter((o) => len(o) > 1)
    expect(pa).toHaveLength(2)
    pa.forEach((o) => expect(len(o)).toBeCloseTo(fa.r, 1))                           // the violet segments from A and B to P
    const line = bonds(s, GREEN, 0.06)[0]
    expect(dist(line.from!, P1) < 0.03 && dist(line.to!, Q1) < 0.03 || dist(line.from!, Q1) < 0.03 && dist(line.to!, P1) < 0.03).toBe(true)
    const [M0] = dots(s, VIOLET)
    expect(dist(M0.position!, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2])).toBeLessThan(0.03)   // M is the midpoint of AB
    expect(distToLine(line, M0.position!)).toBeLessThan(0.03)                        // and lies on PQ
    expect(Math.abs(dotp([P1[0] - Q1[0], P1[1] - Q1[1]], [B[0] - A[0], B[1] - A[1]]))).toBeLessThan(0.03)   // PQ ⟂ AB
    expect(dist(P1, M0.position!)).toBeCloseTo(dist(Q1, M0.position!), 1)             // PQ is bisected by AB as well
    const mark = bonds(s, VIOLET, 0.03).filter((o) => len(o) < 0.5)
    expect(mark).toHaveLength(2); mark.forEach((o) => expect(len(o)).toBeCloseTo(0.32, 1))   // the right-angle square at M
    for (const t of ['same radius: PA = PB', 'PQ ⟂ AB and bisects it', 'A', 'B', 'P', 'Q', 'M']) expect(texts(s)).toContain(t)
  })

  // ── 5. function notation ───────────────────────────────────────────────────────────────────
  it('math.func.function-notation: the drawn curve is y = x² + 1, and f(2) = 5, f(−1) = 2 are the heights of the curve above x = 2 and x = −1', () => {
    const s = M.buildFunctionNotationScene(), F = M.FNN
    const f = pathG(paths(s, BLUE)[0], F)
    f.forEach(([x, y]) => expect(Math.abs(y - (x * x + 1)), `f(${x.toFixed(2)})`).toBeLessThanOrEqual(0.04))
    const out = dots(s, GREEN).map((d) => toG(F, d.position!)).sort((a, b) => b[0] - a[0])
    const inp = dots(s, VIOLET).map((d) => toG(F, d.position!)).sort((a, b) => b[0] - a[0])
    expect(out).toHaveLength(2); expect(inp).toHaveLength(2)
    out.forEach(([x, y], i) => {
      expect(Math.abs(y - valueAt(f, x))).toBeLessThan(0.05)                         // each green dot is on the drawn curve
      expect(y).toBeCloseTo(x * x + 1, 1)                                             // substituting x into the rule
      expect(inp[i][0]).toBeCloseTo(x, 1); expect(inp[i][1]).toBeCloseTo(0, 1)        // above the input marked on the axis
    })
    const guides = bonds(s, VIOLET, 0.03)
    expect(guides).toHaveLength(2)
    guides.forEach((g) => { expect(toG(F, g.from!)[0]).toBeCloseTo(toG(F, g.to!)[0], 1); expect(Math.abs(toG(F, g.to!)[1] - toG(F, g.from!)[1])).toBeGreaterThan(1) })
    const l1 = labelIn(s, 'f(2)'), l2 = labelIn(s, 'f(−1)')
    expect(numsIn(l1.text!)).toEqual([2, 5]); expect(numsIn(l2.text!)).toEqual([-1, 2])
    expect(out.map(([x, y]) => [Math.round(x), Math.round(y)])).toEqual([[2, 5], [-1, 2]])
    for (const t of ['f(x) = x² + 1', 'x', 'y', '2', '−1']) expect(texts(s)).toContain(t)
  })

  // ── 6. zero of a function ──────────────────────────────────────────────────────────────────
  it('math.func.zero-of-function: the drawn curve crosses the axis at −1 and 3; f(2) = −3 < 0 < f(4) = 5 brackets the zero 3', () => {
    const s = M.buildZeroOfFunctionScene(), F = M.ZRF
    const f = pathG(paths(s, BLUE)[0], F)
    f.forEach(([x, y]) => expect(Math.abs(y - (x * x - 2 * x - 3)), `f(${x.toFixed(2)})`).toBeLessThanOrEqual(0.09))
    const zeros: number[] = []
    for (let i = 1; i < f.length; i++) if (f[i - 1][1] * f[i][1] < 0) zeros.push(f[i - 1][0] - (f[i - 1][1] * (f[i][0] - f[i - 1][0])) / (f[i][1] - f[i - 1][1]))
    closeVec(zeros, [-1, 3], 0.05)                                                   // the x-intercepts of the drawn graph
    const gd = dots(s, GREEN).map((d) => toG(F, d.position!)).sort((a, b) => a[0] - b[0])
    expect(gd).toHaveLength(2)
    gd.forEach(([x, y], i) => { expect(x).toBeCloseTo(zeros[i], 1); expect(y).toBeCloseTo(0, 1) })
    const nums = labelsOf(s).filter((l) => l.color === GREEN && /^[−\d]+$/.test(l.text ?? '')).map((l) => numOf(l.text!)).sort((a, b) => a - b)
    expect(nums).toEqual(gd.map(([x]) => Math.round(x)))                              // the numerals under the dots
    // the sign change: one drawn point below the axis, one above, the zero in between
    const br = dots(s, VIOLET).map((d) => toG(F, d.position!)).sort((a, b) => a[0] - b[0])
    expect(br).toHaveLength(2)
    expect(br[0][1]).toBeLessThan(0); expect(br[1][1]).toBeGreaterThan(0)
    expect(br[0][1]).toBeCloseTo(-3, 1); expect(br[1][1]).toBeCloseTo(5, 1)
    expect(numsIn(labelIn(s, 'f(2)').text!)).toEqual([2, -3]); expect(numsIn(labelIn(s, 'f(4)').text!)).toEqual([4, 5])
    expect(zeros.filter((z) => z > br[0][0] && z < br[1][0])).toHaveLength(1)        // exactly the zero 3 lies between x = 2 and x = 4
    for (const t of ['the zeros of f', 'sign change: a zero between', 'f(x) = x² − 2x − 3']) expect(texts(s)).toContain(t)
  })

  // ── 7. step functions ──────────────────────────────────────────────────────────────────────
  it('math.func.step-function: the drawn staircases are ⌊x⌋ (closed left, open right) and ⌈x⌉ (open left, closed right), and ⌊2.7⌋ = 2, ⌊−1.2⌋ = −2, ⌈2.1⌉ = 3 are read off them', () => {
    const s = M.buildStepFunctionScene(), F = M.STP
    const seg = (color: string) => bonds(s, color, 0.06).map((o) => ({ x0: toG(F, o.from!)[0], x1: toG(F, o.to!)[0], y: toG(F, o.from!)[1], yEnd: toG(F, o.to!)[1] })).sort((a, b) => a.x0 - b.x0)
    const floorSegs = seg(BLUE), ceilSegs = seg(RED)
    expect(floorSegs).toHaveLength(5); expect(ceilSegs).toHaveLength(5)
    const ringsAt = (color: string) => paths(s, color).map((p) => { const e = extent(p); expect(e.rx).toBeCloseTo(0.11, 1); return toG(F, [e.cx, e.cy]) })
    const dotsOf = (color: string) => dots(s, color).map((d) => toG(F, d.position!))
    const has = (pts: [number, number][], x: number, y: number) => pts.some((p) => Math.abs(p[0] - x) < 0.03 && Math.abs(p[1] - y) < 0.03)
    const fr = ringsAt(BLUE), fd = dotsOf(BLUE), cr = ringsAt(RED), cd = dotsOf(RED)
    floorSegs.forEach((g) => {
      expect(g.x1 - g.x0).toBeCloseTo(1, 1); expect(g.yEnd).toBeCloseTo(g.y, 2); expect(g.y).toBeCloseTo(Math.round(g.x0), 1)   // [n, n+1) at height n
      expect(has(fd, g.x0, g.y), 'filled dot at the left end').toBe(true); expect(has(fr, g.x1, g.y), 'open ring at the right end').toBe(true)
    })
    ceilSegs.forEach((g) => {
      expect(g.x1 - g.x0).toBeCloseTo(1, 1); expect(g.y).toBeCloseTo(Math.round(g.x0) + 1, 1)                                  // (n, n+1] at height n + 1
      expect(has(cr, g.x0, g.y), 'open ring at the left end').toBe(true); expect(has(cd, g.x1, g.y), 'filled dot at the right end').toBe(true)
    })
    // reading the drawn staircases: the segment covering x (left end included for the floor, right end included for the ceiling)
    const readFloor = (x: number) => floorSegs.find((g) => x >= g.x0 - 1e-9 && x < g.x1 - 1e-9)!.y
    const readCeil = (x: number) => ceilSegs.find((g) => x > g.x0 + 1e-9 && x <= g.x1 + 1e-9)!.y
    const reads = dots(s, GREEN).map((d) => toG(F, d.position!)).sort((a, b) => a[0] - b[0])
    expect(reads).toHaveLength(3)
    closeVec(reads.map((r) => r[0]), [-1.2, 2.1, 2.7], 0.02)
    expect(reads[0][1]).toBeCloseTo(readFloor(-1.2), 1); expect(reads[2][1]).toBeCloseTo(readFloor(2.7), 1); expect(reads[1][1]).toBeCloseTo(readCeil(2.1), 1)
    expect(reads.map((r) => Math.round(r[1]))).toEqual([Math.floor(-1.2), Math.ceil(2.1), Math.floor(2.7)])   // −2, 3, 2 — first principles
    expect(numsIn(labelIn(s, '⌊2.7⌋').text!)).toEqual([2.7, 2]); expect(numsIn(labelIn(s, '⌊−1.2⌋').text!)).toEqual([-1.2, -2]); expect(numsIn(labelIn(s, '⌈2.1⌉').text!)).toEqual([2.1, 3])
    for (const t of ['floor ⌊x⌋', 'ceiling ⌈x⌉']) expect(texts(s)).toContain(t)
  })

  // ── 8. operations on functions ─────────────────────────────────────────────────────────────
  it('math.func.function-operations: the stacked heights 3 + 4 reach (f + g)(2) = 7; f(g(2)) = 5 and g(f(2)) = 9 are read along the drawn guides, so composition does not commute', () => {
    const s = M.buildFunctionOperationsScene(), F = M.FOP
    const f = pathG(paths(s, BLUE)[0], F), g = pathG(paths(s, RED)[0], F), fg = pathG(paths(s, GREEN)[0], F)
    f.forEach(([x, y]) => expect(Math.abs(y - (x + 1))).toBeLessThanOrEqual(0.05)); g.forEach(([x, y]) => expect(Math.abs(y - x * x)).toBeLessThanOrEqual(0.09))
    fg.forEach(([x, y]) => expect(Math.abs(y - (x * x + x + 1))).toBeLessThanOrEqual(0.12))
    // stacked bars at x = 2: blue f(2), red g(2) on top, the sum
    const [bf] = bonds(s, BLUE, 0.09), [bg] = bonds(s, RED, 0.09)
    const hf = toG(F, bf.to!)[1] - toG(F, bf.from!)[1], hg = toG(F, bg.to!)[1] - toG(F, bg.from!)[1]
    expect(toG(F, bf.from!)[0]).toBeCloseTo(2, 1); expect(dist(bg.from!, bf.to!)).toBeLessThan(0.02)
    expect(hf).toBeCloseTo(valueAt(f, 2), 1); expect(hg).toBeCloseTo(valueAt(g, 2), 1)       // the heights of the drawn f and g at 2
    expect(hf + hg).toBeCloseTo(valueAt(fg, 2), 1)                                              // stacked = the drawn sum curve
    expect(numsIn(labelIn(s, 'sum at 2').text!)).toEqual([2, Math.round(hf + hg)])
    expect(Math.round(hf)).toBe(3); expect(Math.round(hg)).toBe(4)
    // the composition chains: across from the first output to the same value on the x axis, then up to the second curve
    const guides = bonds(s, VIOLET, 0.03)
    expect(guides).toHaveLength(4)
    const chainEnd = (curveG: [number, number][], x0: number, y0: number) => {
      const horiz = guides.find((o) => Math.abs(toG(F, o.from!)[0] - x0) < 0.03 && Math.abs(toG(F, o.from!)[1] - y0) < 0.03)!
      const x1 = toG(F, horiz.to!)[0]
      const vert = guides.find((o) => Math.abs(toG(F, o.from!)[0] - x1) < 0.03 && Math.abs(toG(F, o.from!)[1] - y0) < 0.03)!
      expect(Math.abs(toG(F, horiz.to!)[1] - y0)).toBeLessThan(0.03)                   // horizontal: the output is carried across to become the next input
      return { x1, top: toG(F, vert.to!)[1], curveAt: valueAt(curveG, x1) }
    }
    const fOfG = chainEnd(f, 2, valueAt(g, 2)), gOfF = chainEnd(g, 2, valueAt(f, 2))
    expect(fOfG.x1).toBeCloseTo(valueAt(g, 2), 1); expect(fOfG.top).toBeCloseTo(fOfG.curveAt, 1); expect(fOfG.top).toBeCloseTo(5, 1)       // f(g(2)) = f(4) = 5
    expect(gOfF.x1).toBeCloseTo(valueAt(f, 2), 1); expect(gOfF.top).toBeCloseTo(gOfF.curveAt, 0); expect(gOfF.top).toBeCloseTo(9, 0)       // g(f(2)) = g(3) = 9
    expect(Math.abs(fOfG.top - gOfF.top)).toBeGreaterThan(3)                           // f∘g ≠ g∘f
    expect(numsIn(labelIn(s, 'f after g').text!)).toEqual([2, Math.round(fOfG.top)]); expect(numsIn(labelIn(s, 'g after f').text!)).toEqual([2, Math.round(gOfF.top)])
    for (const t of ['f', 'g', 'x']) expect(texts(s)).toContain(t)
  })

  // ── 9. analytic continuation ───────────────────────────────────────────────────────────────
  it('math.cx.analytic-continuation: the discs have radius 1 (centre 0) and 1.5 (centre −0.5), each stopped by the pole at 1; the point −1.2 is outside the first and inside the second', () => {
    const s = M.buildAnalyticContinuationScene(), A = M.ACN
    const toZ = (p: readonly number[]): [number, number] => [(p[0] - A.ox) / A.u, (p[1] - A.oy) / A.u]
    const disc = (p: Obj) => { const e = extent(p); expect(e.rx).toBeCloseTo(e.ry, 1); return { c: toZ([e.cx, e.cy]), r: (e.rx + e.ry) / 2 / A.u } }
    const d1 = disc(paths(s, BLUE)[0]), d2 = disc(paths(s, VIOLET)[0])
    closeVec(d1.c, [0, 0], 0.02); closeVec(d2.c, [-0.5, 0], 0.02)
    expect(d1.r).toBeCloseTo(1, 1); expect(d2.r).toBeCloseTo(1.5, 1)
    const pole = toZ(dots(s, RED)[0].position!)
    closeVec(pole, [1, 0], 0.02)
    // the radius of convergence is the distance from the centre to the nearest singularity — the pole lies on both circles
    expect(Math.hypot(pole[0] - d1.c[0], pole[1] - d1.c[1])).toBeCloseTo(d1.r, 1); expect(Math.hypot(pole[0] - d2.c[0], pole[1] - d2.c[1])).toBeCloseTo(d2.r, 1)
    expect(Math.hypot(d1.c[0] - d2.c[0], d1.c[1] - d2.c[1])).toBeLessThan(d1.r + d2.r)         // the discs overlap
    // the point −1.2: outside the first disc, inside the second
    const q = toZ(dots(s, GREEN)[0].position!)
    expect(q[0]).toBeCloseTo(-1.2, 1)
    expect(Math.hypot(q[0] - d1.c[0], q[1] - d1.c[1])).toBeGreaterThan(d1.r); expect(Math.hypot(q[0] - d2.c[0], q[1] - d2.c[1])).toBeLessThan(d2.r)
    expect(Math.hypot(q[0] - d2.c[0], q[1] - d2.c[1])).toBeCloseTo(0.7, 1)
    const exact = (t: string) => labelsOf(s).find((l) => l.text === t)!
    expect(numsIn(exact('radius 1').text!)).toEqual([d1.r].map((v) => Math.round(v * 10) / 10)); expect(numsIn(exact('radius 1.5').text!)).toEqual([Math.round(d2.r * 10) / 10])   // the captions state the drawn radii
    expect(numsIn(labelIn(s, 'pole at').text!)).toEqual([1]); expect(numsIn(labelIn(s, 'point').text!)).toEqual([Math.round(q[0] * 10) / 10])
    const leader = bonds(s, GREEN, 0.025)[0]
    expect(Math.abs(leader.from![0] - dots(s, GREEN)[0].position![0])).toBeLessThan(0.02)   // the leader line hangs from the green dot
    expect(Math.abs(labelIn(s, 'point').position![0] - dots(s, GREEN)[0].position![0])).toBeLessThan(0.02)
    for (const t of ['Re', 'Im']) expect(texts(s)).toContain(t)
  })

  // ── 10. singularities ──────────────────────────────────────────────────────────────────────
  it('math.cx.singularities: |sin z/z| tends to 1 (bounded), |1/z| grows like 1/r, and e^(1/z) explodes on one side and vanishes on the other (read from the drawn curves)', () => {
    const s = M.buildSingularitiesScene()
    const U = M.sngU, [P1, P2, P3] = M.SNG
    const rv = (ox: number, p: readonly number[]) => ({ r: 1 - (p[0] - ox) / U.x, v: (p[1] - U.oy) / U.y })
    const inPanel = (ox: number) => (o: Obj) => o.points![0][0] >= ox - 0.01 && o.points![0][0] <= ox + 2.9
    const trace = (color: string, ox: number) => paths(s, color).filter(inPanel(ox)).map((o) => o.points!.map((p) => rv(ox, p)))
    // removable: bounded, tends to 1, equal to sin r / r
    const [rem] = trace(BLUE, P1.ox)
    rem.forEach(({ r, v }) => expect(Math.abs(v - Math.sin(r) / r), `sin r / r at ${r.toFixed(2)}`).toBeLessThanOrEqual(0.02))
    expect(Math.max(...rem.map((p) => p.v))).toBeLessThanOrEqual(1.02); expect(rem[rem.length - 1].v).toBeGreaterThan(0.98)
    expect(rem[0].v).toBeLessThan(rem[rem.length - 1].v)                               // creeping up to the limit 1 as r shrinks
    const lim = bonds(s, VIOLET, 0.02)[0]
    expect((lim.from![1] - U.oy) / U.y).toBeCloseTo(1, 1)                              // the violet line marks the limit 1
    // pole: r · |f| = 1 along the drawn curve, unbounded
    const [pole] = trace(RED, P2.ox)
    pole.forEach(({ r, v }) => expect(Math.abs(r * v - 1), `r|f| at ${r.toFixed(2)}`).toBeLessThanOrEqual(0.04))
    expect(pole[pole.length - 1].v).toBeGreaterThan(4.8); pole.slice(1).forEach((p, i) => expect(p.v).toBeGreaterThan(pole[i].v))
    // essential: e^(1/r) up, e^(−1/r) down
    const [up] = trace(RED, P3.ox), [down] = trace(BLUE, P3.ox)
    up.forEach(({ r, v }) => expect(Math.abs(Math.log(v) * r - 1), `r ln|f| at ${r.toFixed(2)}`).toBeLessThanOrEqual(0.03))
    expect(Math.max(...up.map((p) => p.v))).toBeGreaterThan(4.8)
    down.forEach(({ r, v }) => expect(Math.abs(v - Math.exp(-1 / r)), `e^(-1/r) at ${r.toFixed(2)}`).toBeLessThanOrEqual(0.015))
    expect(down[down.length - 1].v).toBeLessThan(0.02); expect(down[0].v).toBeGreaterThan(0.3)
    // the verdicts: bounded / unbounded / no limit — read from the three drawn curves
    expect(Math.max(...rem.map((p) => p.v))).toBeLessThan(1.1)                         // bounded
    expect(Math.max(...pole.map((p) => p.v))).toBeGreaterThan(4.8)                     // unbounded
    expect(Math.max(...up.map((p) => p.v)) - Math.min(...down.map((p) => p.v))).toBeGreaterThan(4.5)   // two different directions, two different "limits"
    for (const t of ['removable', 'pole', 'essential', 'sin z / z', '1 / z', 'e^(1/z)', 'bounded', 'unbounded', 'no limit']) expect(texts(s)).toContain(t)
    expect(texts(s).filter((t) => t === 'r')).toHaveLength(3)                          // the distance r is marked on each panel's axis
  })

  // ── 11. residue ────────────────────────────────────────────────────────────────────────────
  it('math.cx.residue: the blue bars are f(2 + h) = 3/h = 3, 6, 12 for h = 1, ½, ¼ and the green bars (z − 2) f(z) = h · 3/h are all 3 — the residue', () => {
    const s = M.buildResidueScene(), R = M.RSD
    const barH = (o: Obj) => (o.to![1] - o.from![1]) / R.u
    const blue = bonds(s, BLUE, 0.5).sort((a, b) => a.from![0] - b.from![0]), green = bonds(s, GREEN, 0.5).sort((a, b) => a.from![0] - b.from![0])
    expect(blue).toHaveLength(3); expect(green).toHaveLength(3)
    // the distances h are the numerals under the green bars
    const hOf = (x: number) => { const t = labelsOf(s).filter((l) => ['1', '½', '¼'].includes(l.text ?? '') && l.color === INK).sort((a, b) => Math.abs(a.position![0] - x) - Math.abs(b.position![0] - x))[0].text!; return t === '1' ? 1 : t === '½' ? 0.5 : 0.25 }
    const hs = green.map((o) => hOf(o.from![0]))
    expect(hs).toEqual([1, 0.5, 0.25])
    blue.forEach((o, i) => { expect(Math.abs(o.from![0] - green[i].from![0])).toBeLessThan(0.02); expect(barH(o), `f at h = ${hs[i]}`).toBeCloseTo(3 / hs[i], 1) })   // f(2 + h) = 3/h
    green.forEach((o, i) => expect(barH(o), `h·f at h = ${hs[i]}`).toBeCloseTo(hs[i] * barH(blue[i]), 1))                                 // (z − 2) f(z) = h · f
    const heights = green.map(barH)
    heights.forEach((h) => expect(h).toBeCloseTo(heights[0], 1))                       // constant
    expect(heights[0]).toBeCloseTo(3, 1)
    expect(barH(blue[2])).toBeGreaterThan(barH(blue[1])); expect(barH(blue[1])).toBeGreaterThan(barH(blue[0]))   // f grows towards the pole
    // the numerals above the bars are the bar heights
    const above = (o: Obj, color: string) => numOf(labelsOf(s).filter((l) => l.color === color && /^\d+$/.test(l.text ?? '')).sort((a, b) => dist(a.position!, [o.from![0], o.to![1] + 0.45]) - dist(b.position!, [o.from![0], o.to![1] + 0.45]))[0].text!)
    blue.forEach((o) => expect(above(o, BLUE)).toBe(Math.round(barH(o)))); green.forEach((o) => expect(above(o, GREEN)).toBe(Math.round(barH(o))))
    expect(numsIn(labelIn(s, 'residue').text!)).toEqual([heights[0]].map(Math.round))   // residue 3
    expect(numsIn(labelIn(s, 'f(z)').text!)).toEqual([3, 2])                           // f(z) = 3/(z − 2): numerator 3, pole at 2
    for (const t of ['(z − 2) f(z) stays 3', 'distance h from the pole']) expect(texts(s)).toContain(t)
  })

  // ── 12. argument principle ─────────────────────────────────────────────────────────────────
  it('math.cx.argument-principle: two drawn zeros lie inside the circle |z − 0.5| = 2, no poles, and the drawn image of f(z) = z² − 1 winds twice (counter-clockwise) round 0', () => {
    const s = M.buildArgumentPrincipleScene(), A = M.ARP
    const toZ = (p: readonly number[]): [number, number] => [(p[0] - A.zc[0]) / A.uz, (p[1] - A.zc[1]) / A.uz]
    const toW = (p: readonly number[]): [number, number] => [(p[0] - A.wc[0]) / A.uw, (p[1] - A.wc[1]) / A.uw]
    const e = extent(paths(s, BLUE)[0])
    const c = toZ([e.cx, e.cy]), radius = (e.rx + e.ry) / 2 / A.uz
    closeVec(c, [0.5, 0], 0.03); expect(radius).toBeCloseTo(2, 1)
    // the zeros: the drawn green dots satisfy f(z) = z² − 1 = 0 and lie inside the circle; there are no poles (f is a polynomial, nothing else is drawn in the z-plane)
    const zs = dots(s, GREEN).map((d) => toZ(d.position!)).sort((a, b) => a[0] - b[0])
    expect(zs).toHaveLength(2)
    zs.forEach(([x, y]) => { expect(Math.hypot(x * x - y * y - 1, 2 * x * y), 'f(z) = 0').toBeLessThan(0.05); expect(Math.hypot(x - c[0], y - c[1])).toBeLessThan(radius) })
    const Z = zs.filter(([x, y]) => Math.hypot(x - c[0], y - c[1]) < radius).length, Pn = 0
    expect(dots(s, INK).filter((d) => d.position![0] < A.zc[0] + 2.5).length).toBe(0)
    // the image curve: the drawn points are f(0.5 + 2e^{it})
    const img = paths(s, RED)[0].points!.map(toW)
    expect(img).toHaveLength(121)
    img.forEach(([re, im], k) => { const t = A.t0 + (2 * Math.PI * k) / 120, zr = 0.5 + 2 * Math.cos(t), zi = 2 * Math.sin(t), er = zr * zr - zi * zi - 1, ei = 2 * zr * zi; expect(Math.hypot(re - er, im - ei), `w(${k})`).toBeLessThanOrEqual(0.07) })
    // the winding number round the drawn origin: add up the turning of the direction to the curve point
    const origin = toW(dots(s, INK).find((d) => dist(d.position!, [A.wc[0], A.wc[1]]) < 0.02)!.position!)
    closeVec(origin, [0, 0], 0.03)
    let turn = 0
    for (let k = 1; k < img.length; k++) { const a = Math.atan2(img[k - 1][1], img[k - 1][0]), b = Math.atan2(img[k][1], img[k][0]); let d = b - a; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; turn += d }
    const winding = turn / (2 * Math.PI)
    expect(winding).toBeCloseTo(2, 1); expect(Math.round(winding)).toBe(Z - Pn)       // the argument principle: winding number = Z − P
    // the violet ray from the origin along the positive real axis is crossed twice, upward both times
    const crossings = img.slice(1).filter((p, k) => p[0] > 0 && img[k][0] > 0 && img[k][1] < 0 && p[1] >= 0).length
    const downward = img.slice(1).filter((p, k) => p[0] > 0 && img[k][0] > 0 && img[k][1] > 0 && p[1] <= 0).length
    expect(crossings).toBe(2); expect(downward).toBe(0)
    const [ray] = bonds(s, VIOLET, 0.03)
    expect(dist(ray.from!, [A.wc[0], A.wc[1]])).toBeLessThan(0.02); expect(Math.abs(ray.to![1] - ray.from![1])).toBeLessThan(0.01); expect(ray.to![0]).toBeGreaterThan(Math.max(...img.map((p) => A.wc[0] + A.uw * p[0])) - 0.5)
    // the captions
    expect(numsIn(labelIn(s, 'zeros inside').text!)).toEqual([Z]); expect(numsIn(labelIn(s, 'winds').text!)).toEqual([Math.round(winding)])
    const cap = labelIn(s, 'Z − P').text!
    expect(numsIn(cap)).toEqual([2, 0, 2]); expect(evalLR(cap.replace('Z − P = ', ''))).toBe(Z - Pn)
    for (const t of ['z-plane', 'w-plane']) expect(texts(s)).toContain(t)
  })
})
