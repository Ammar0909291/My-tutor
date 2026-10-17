/**
 * Mathematics visual campaign, batch 43 (2026-10-17): the unit circle. Every number a figure states is re-derived here from the
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB43'

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
  ['math.trig.unit-circle', M.buildUnitCircleScene, 'math-unit-circle'],
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

  // ── 1. unit circle ─────────────────────────────────────────────────────────────────────────
  it('math.trig.unit-circle: the drawn circle has radius 1 about the axes\' crossing, P at 30° and Q at 150° lie on it, and each label states the coordinate of its point', () => {
    const s = M.buildUnitCircleScene()
    // the circle: the long ink path; its half-extent is the unit, its centre is where the two axes cross
    const ring = paths(s, INK).find((p) => p.points!.length > 60)!
    const { cx, cy, rx, ry } = extent(ring)
    expect(near(rx, ry, 0.02)).toBe(true)
    const u = rx
    expect(near(u, M.UC.R, 0.02)).toBe(true)
    const ax = arrows(s, SLATE)
    expect(ax).toHaveLength(2)
    const horizontal = ax.find((a) => near(a.from![1], a.to![1], 1e-9))!, vertical = ax.find((a) => near(a.from![0], a.to![0], 1e-9))!
    expect(near(vertical.from![0], cx, 0.02)).toBe(true); expect(near(horizontal.from![1], cy, 0.02)).toBe(true)
    // every drawn ring point is at distance 1 (in units) from the centre
    for (const q of ring.points!) expect(near(Math.hypot(q[0] - cx, q[1] - cy) / u, 1, 0.01)).toBe(true)

    const unit = (o: readonly number[]) => ({ x: (o[0] - cx) / u, y: (o[1] - cy) / u })
    const deg = (v: { x: number; y: number }) => (Math.atan2(v.y, v.x) * 180) / Math.PI
    const pts = dots(s, GREEN).map((d) => unit(d.position!)).sort((a, b) => b.x - a.x)
    expect(pts).toHaveLength(2)
    const [P, Q] = pts
    for (const v of [P, Q]) expect(near(v.x * v.x + v.y * v.y, 1, 0.02), 'on the unit circle').toBe(true)       // x² + y² = 1
    expect(numsIn(labelIn(s, 'x²').text!)).toEqual([1])

    // the angles, read from the drawn radii and arcs, against the angle labels
    const radii = bonds(s, INK, 0.05)
    expect(radii).toHaveLength(2)
    radii.forEach((r) => { expect(near(r.from![0], cx, 0.02) && near(r.from![1], cy, 0.02)).toBe(true); expect(near(len(r) / u, 1, 0.01)).toBe(true) })
    const angleOf = (r: Obj) => deg(unit(r.to!))
    const [aP, aQ] = [...radii].map(angleOf).sort((a, b) => a - b)
    expect(near(aP, deg(P), 0.5)).toBe(true); expect(near(aQ, deg(Q), 0.5)).toBe(true)
    expect(Math.round(aP)).toBe(M.UC.first); expect(Math.round(aQ)).toBe(M.UC.second)
    expect(numsIn(labelIn(s, `${M.UC.first}°`).text!)).toEqual([M.UC.first])
    expect(numsIn(labelIn(s, `${M.UC.second}°`).text!)).toEqual([M.UC.second])
    // each violet arc starts on the positive x-axis and ends on its radius, at constant distance from the centre
    const arcs = paths(s, VIOLET).sort((a, b) => a.points!.length - b.points!.length)
    expect(arcs).toHaveLength(2)
    const sweeps = arcs.map((a) => { const w = a.points!.map(unit); w.forEach((v) => expect(Math.hypot(v.x, v.y)).toBeLessThan(1)); expect(near(deg(w[0]), 0, 0.5)).toBe(true); return deg(w[w.length - 1]) })
    // P() rounds to 0.01, which on the small 0.45 arc is up to ~1.3 degrees
    const [sweepP, sweepQ] = [...sweeps].sort((a, b) => a - b)
    expect(near(sweepP, aP, 1.5)).toBe(true); expect(near(sweepQ, aQ, 1.5)).toBe(true)

    // the legs: the red one is the x-coordinate, the blue one the height, and each ends under / beside its point
    const red = bonds(s, RED, 0.07), blue = bonds(s, BLUE, 0.07)
    expect(red).toHaveLength(2); expect(blue).toHaveLength(2)
    for (const [pt, r, b] of [[P, red.find((l) => l.to![0] > cx)!, blue.find((l) => l.from![0] > cx)!], [Q, red.find((l) => l.to![0] < cx)!, blue.find((l) => l.from![0] < cx)!]] as const) {
      expect(near(r.from![1], r.to![1], 1e-9)).toBe(true)                                            // horizontal
      expect(near(r.to![0] - cx, pt.x * u, 0.02)).toBe(true)                                         // signed length = x
      expect(near(b.from![0], b.to![0], 1e-9)).toBe(true)                                            // vertical
      expect(near(b.to![1] - b.from![1], pt.y * u, 0.02)).toBe(true)                                 // length = y
      expect(near(b.from![0], r.to![0], 0.02)).toBe(true)                                            // the blue leg stands on the red one
    }

    // the numbers: cos is the x-coordinate, sin the y-coordinate, signs included; both points share the height, the x-coordinates are opposite
    const stated = (l: Obj) => numOf(String(numsIn(l.text!).slice(-1)[0]))
    const cosP = labelIn(s, 'cos θ'), sinP = labelIn(s, 'sin θ'), cosQ = labelIn(s, `cos ${M.UC.second}`), sinQ = labelIn(s, `sin ${M.UC.second}`)
    expect(near(stated(cosP), P.x, 0.01)).toBe(true); expect(near(stated(sinP), P.y, 0.01)).toBe(true)
    expect(near(stated(cosQ), Q.x, 0.01)).toBe(true); expect(near(stated(sinQ), Q.y, 0.01)).toBe(true)
    expect(stated(cosQ)).toBeLessThan(0); expect(cosQ.text).toContain('−')
    expect(near(stated(cosP), -stated(cosQ), 0.001)).toBe(true); expect(stated(sinP)).toBe(stated(sinQ))
    expect(near(stated(cosP), Math.cos((M.UC.first * Math.PI) / 180), 0.005)).toBe(true)
    expect(near(stated(sinP), 0.5, 1e-9)).toBe(true)
    for (const l of [cosP, cosQ]) expect(l.color).toBe(RED)
    for (const l of [sinP, sinQ]) expect(l.color).toBe(BLUE)
    expect(labelsOf(s).filter((l) => l.text === 'P' || l.text === 'Q')).toHaveLength(2)

    // the 1 and -1 on the axes sit beside the four points where the circle meets them
    const ticks = labelsOf(s).filter((l) => l.text === '1' || l.text === '−1')
    expect(ticks).toHaveLength(4)
    for (const [text, want] of [['1', [1, 0]], ['−1', [-1, 0]], ['1', [0, 1]], ['−1', [0, -1]]] as const) {
      const hit = ticks.filter((t) => t.text === text).find((t) => { const v = unit(t.position!); return dist([v.x, v.y], want) < 0.3 })
      expect(hit, `${text} near ${want}`).toBeTruthy()
    }
  })
})
