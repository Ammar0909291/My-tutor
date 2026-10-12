/**
 * Mathematics visual campaign, batch 24 (2026-10-12), the last essential-tier batch: smooth manifolds, categories (composition,
 * mono / epi / iso, functors, natural transformations), the Platonic solids, curvature and the osculating circle, the Frenet–Serret
 * frame, simple functions and the Lebesgue integral, the cyclic group ℤ₆ and convolution. Charts, categories, polyhedra, groups and
 * overlaps are rebuilt from the DRAWN coordinates and the identities each figure states are recomputed.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB24'

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
  ['math.top.smooth-manifold', M.buildSmoothManifoldScene, 'math-smooth-manifold'],
  ['math.cat.category', M.buildCategoryScene, 'math-category'],
  ['math.cat.morphism-types', M.buildMorphismTypesScene, 'math-morphism-types'],
  ['math.cat.functor', M.buildFunctorScene, 'math-functor'],
  ['math.cat.natural-transformation', M.buildNaturalTransformationScene, 'math-natural-transformation'],
  ['math.geom.platonic-solids', M.buildPlatonicSolidsScene, 'math-platonic-solids'],
  ['math.geom.differential-geometry-curves', M.buildCurvesInSpaceScene, 'math-curves-in-space'],
  ['math.geom.frenet-serret', M.buildFrenetSerretScene, 'math-frenet-serret'],
  ['math.meas.simple-function', M.buildSimpleFunctionScene, 'math-simple-function'],
  ['math.meas.lebesgue-integral', M.buildLebesgueIntegralScene, 'math-lebesgue-integral'],
  ['math.abst.cyclic-group', M.buildCyclicGroupScene, 'math-cyclic-group'],
  ['math.fnal.convolution', M.buildConvolutionScene, 'math-convolution'],
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
/** circle through three points (for a partial arc) */
const circum = (a: number[], b: number[], c: number[]) => { const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])), ux = ((a[0] ** 2 + a[1] ** 2) * (b[1] - c[1]) + (b[0] ** 2 + b[1] ** 2) * (c[1] - a[1]) + (c[0] ** 2 + c[1] ** 2) * (a[1] - b[1])) / d, uy = ((a[0] ** 2 + a[1] ** 2) * (c[0] - b[0]) + (b[0] ** 2 + b[1] ** 2) * (a[0] - c[0]) + (c[0] ** 2 + c[1] ** 2) * (b[0] - a[0])) / d; return { c: [ux, uy], r: Math.hypot(a[0] - ux, a[1] - uy) } }
const nearest = (p: number[], cands: number[][]) => cands.reduce((best, c, i) => (dist(p, c) < dist(p, cands[best]) ? i : best), 0)
const inv = (ox: number, oy: number, ux: number, uy: number) => (p: number[]): [number, number] => [(p[0] - ox) / ux, (p[1] - oy) / uy]
const cross3 = (a: readonly number[], b: readonly number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const dot3 = (a: readonly number[], b: readonly number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

describe('the mathematics each figure draws', () => {
  it('Smooth manifold: for the drawn circle points the blue dots are u = x/(1 − y) and the red dots v = x/(1 + y), the rays pass through the points, u·v = 1, and the three (u, v) dots lie on the drawn violet branches of v = 1/u', () => {
    const s = M.buildSmoothManifoldScene(), { c, R, hyp } = M.SMF
    const Pdots = dots(s, INK).filter((d) => d.radius === 0.1 && dist(d.position!, c as number[]) < R + 0.05).map((d) => d.position!); expect(Pdots).toHaveLength(3)
    const N = dots(s, INK).find((d) => d.radius === 0.12 && d.position![1] > c[1])!.position!, S = dots(s, INK).find((d) => d.radius === 0.12 && d.position![1] < c[1])!.position!
    expect(dist(N, [c[0], c[1] + R])).toBeLessThan(0.02); expect(dist(S, [c[0], c[1] - R])).toBeLessThan(0.02)
    Pdots.forEach((p) => expect(dist(p, c as number[])).toBeCloseTo(R, 1))
    const bluePts = dots(s, BLUE).filter((d) => d.radius === 0.09).map((d) => d.position!), redPts = dots(s, RED).filter((d) => d.radius === 0.09).map((d) => d.position!); expect(bluePts).toHaveLength(3); expect(redPts).toHaveLength(3)
    const uv = Pdots.map((p) => { const x = (p[0] - c[0]) / R, y = (p[1] - c[1]) / R, u = x / (1 - y), v = x / (1 + y)
      expect(bluePts.some((q) => near(q[1], c[1], 0.02) && near((q[0] - c[0]) / R, u, 0.03))).toBe(true); expect(redPts.some((q) => near(q[1], c[1], 0.02) && near((q[0] - c[0]) / R, v, 0.03))).toBe(true)
      expect(u * v).toBeCloseTo(1, 1); return [u, v] })                                                                                                 // u·v = x²/(1 − y²) = 1
    const distToLine = (a: number[], b: number[], p: number[]) => Math.abs(crossz([b[0] - a[0], b[1] - a[1]], [p[0] - a[0], p[1] - a[1]])) / dist(a, b)
    for (const o of bonds(s, BLUE, 0.03)) expect(Pdots.some((p) => distToLine(o.from!, o.to!, p) < 0.03)).toBe(true)                                   // every blue ray passes through a point P
    for (const o of bonds(s, RED, 0.03)) expect(Pdots.some((p) => distToLine(o.from!, o.to!, p) < 0.03)).toBe(true)
    expect(bonds(s, BLUE, 0.03).every((o) => dist(o.from!, N) < 0.02)).toBe(true); expect(bonds(s, RED, 0.03).every((o) => dist(o.from!, S) < 0.02)).toBe(true)
    const toH = inv(hyp.c[0], hyp.c[1], hyp.u, hyp.u), onH = dots(s, INK).filter((d) => d.radius === 0.1 && d.position![0] > 1.2).map((d) => toH(d.position!)); expect(onH).toHaveLength(3)
    onH.forEach(([u, v]) => { expect(u * v).toBeCloseTo(1, 1); expect(uv.some(([a, b]) => Math.abs(a - u) < 0.05 && Math.abs(b - v) < 0.05)).toBe(true) })
    pathsOf(s, VIOLET, 20).forEach((p) => p.points!.map(toH).forEach(([u, v]) => expect(Math.abs(u * v - 1)).toBeLessThan(0.1)))                         // v = 1/u on both branches
    expect(pathsOf(s, VIOLET, 20)).toHaveLength(2); expect(texts(s)).toEqual(expect.arrayContaining(['N', 'S', 'v = 1/u', 'smooth: u ≠ 0']))
  })

  it('Category: the drawn arrows have the declared domains and codomains, every composable pair has its composite drawn (g∘f, h∘g, h∘g∘f), composition is associative, and each object carries an identity loop', () => {
    const s = M.buildCategoryScene(), objs = M.catObjects(), pos = objs.map(([, p]) => p as number[])
    const arrOf = (o: Obj) => ({ dom: objs[nearest(o.from!, pos)][0], cod: objs[nearest(o.to!, pos)][0] })
    const gens = arrows(s, BLUE).map(arrOf), comps = arrows(s, GREEN).map(arrOf)
    expect(gens.map((a) => a.dom + a.cod).sort()).toEqual(['AB', 'BC', 'CD']); expect(comps.map((a) => a.dom + a.cod).sort()).toEqual(['AC', 'AD', 'BD'])
    const all = [...gens, ...comps], has = (dom: string, cod: string) => all.some((a) => a.dom === dom && a.cod === cod)
    for (const f of all) for (const g of all) if (f.cod === g.dom && !(f.dom === f.cod) && !(g.dom === g.cod)) expect(has(f.dom, g.cod), `${f.dom}${f.cod} then ${g.dom}${g.cod}`).toBe(true)   // composites exist
    const comp = (f: { dom: string; cod: string }, g: { dom: string; cod: string }) => ({ dom: f.dom, cod: g.cod })
    const [f, g, h] = ['AB', 'BC', 'CD'].map((k) => ({ dom: k[0], cod: k[1] })); expect(comp(comp(f, g), h)).toEqual(comp(f, comp(g, h)))              // (h∘g)∘f = h∘(g∘f): the same arrow A → D
    expect(has('A', 'D')).toBe(true)
    const loops = pathsOf(s, SLATE, 8).filter((p) => p.points!.length === 25); expect(loops).toHaveLength(4)
    objs.forEach(([, p]) => expect(loops.some((l) => { const fc = fitCircle(l); return dist(fc.c, [p[0] - 0.45, p[1] - 0.45]) < 0.05 && Math.abs(fc.r - 0.25) < 0.03 })).toBe(true))
    expect(dots(s, INK)).toHaveLength(4); expect(labelsOf(s).filter((l) => l.text === '1')).toHaveLength(4)
    expect(texts(s)).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'f', 'g', 'h', 'g∘f', 'h∘g', 'h∘g∘f']))
  })

  it('Morphism types: the drawn mono is injective but not onto, the epi is onto but not injective, and the iso is a bijection whose red arrows are its inverse', () => {
    const s = M.buildMorphismTypesScene(), { mono, epi, iso } = M.MPH
    const edgeSet = (panel: number, g: { left: readonly number[]; right: readonly number[] }, color: string, rev = false) => arrows(s, color).filter((a) => Math.abs((a.from![0] + a.to![0]) / 2 - M.MPH.cx[panel]) < 0.9).map((a) => {
      const L = g.left.map((_, i) => M.mphLeft(panel, g.left, i) as number[]), Rr = g.right.map((_, j) => M.mphRight(panel, g.right, j) as number[])
      const from = a.from!, to = a.to!; return rev ? [nearest([to[0], to[1] + 0.22], L), nearest([from[0], from[1] + 0.22], Rr)] as [number, number] : [nearest(from, L), nearest(to, Rr)] as [number, number] })
    const mp = edgeSet(0, mono, BLUE), ep = edgeSet(1, epi, RED), isoF = edgeSet(2, iso, GREEN), isoB = edgeSet(2, iso, RED, true)
    const inj = (e: Array<[number, number]>) => new Set(e.map((x) => x[1])).size === e.length, onto = (e: Array<[number, number]>, n: number) => new Set(e.map((x) => x[1])).size === n
    expect(inj(mp)).toBe(true); expect(onto(mp, mono.right.length)).toBe(false)                                                                         // mono: 1 ↦ a, 2 ↦ c, b missed
    expect(onto(ep, epi.right.length)).toBe(true); expect(inj(ep)).toBe(false)                                                                         // epi: 1, 2 ↦ a, 3 ↦ b
    expect(inj(isoF) && onto(isoF, iso.right.length) && isoF.length === iso.left.length).toBe(true)
    isoF.forEach(([i, j]) => expect(isoB.some(([i2, j2]) => i2 === i && j2 === j)).toBe(true))                                                          // the inverse goes back along each arrow
    const fnMap = (e: Array<[number, number]>) => e.sort((a, b) => a[0] - b[0]).map((x) => x[1]); expect(fnMap(mp)).toEqual([0, 2]); expect(fnMap(ep)).toEqual([0, 0, 1]); expect(fnMap(isoF)).toEqual([0, 1])
    expect(texts(s)).toEqual(expect.arrayContaining(['mono', 'epi', 'iso']))
  })

  it('Functor: every right-hand object is the shift of a left one by the same vector, F sends f, g, g∘f to arrows with matching endpoints, and F(g∘f) runs FX → FZ like Fg∘Ff', () => {
    const s = M.buildFunctorScene(), { X, Y, Z, shift } = M.FNC
    const dsl = dots(s, INK).map((d) => d.position!); expect(dsl).toHaveLength(6)
    ;[X, Y, Z].forEach((p) => { expect(dsl.some((q) => dist(q, p as number[]) < 0.02)).toBe(true); expect(dsl.some((q) => dist(q, [p[0] + shift[0], p[1] + shift[1]]) < 0.02)).toBe(true) })
    const fl = bonds(s, SLATE, 0.02); expect(fl).toHaveLength(3); fl.forEach((o) => { expect(o.to![0] - o.from![0]).toBeCloseTo(shift[0], 1); expect(o.to![1] - o.from![1]).toBeCloseTo(shift[1], 1) })   // same F on every object
    const bl = arrows(s, BLUE), gr = arrows(s, GREEN); expect(bl).toHaveLength(4); expect(gr).toHaveLength(2)
    const left = bl.filter((a) => a.from![0] < 0), right = bl.filter((a) => a.from![0] > 0); expect(left).toHaveLength(2); expect(right).toHaveLength(2)
    left.forEach((a) => expect(right.some((b) => Math.abs(b.from![0] - a.from![0] - shift[0]) < 0.02 && Math.abs(b.from![1] - a.from![1] - shift[1]) < 0.02 && Math.abs(b.to![0] - a.to![0] - shift[0]) < 0.02 && Math.abs(b.to![1] - a.to![1] - shift[1]) < 0.02)).toBe(true))   // F(f), F(g) are the images of f, g
    const gl = gr.find((a) => a.from![0] < 0)!, gR = gr.find((a) => a.from![0] > 0)!
    expect(gR.from![0] - gl.from![0]).toBeCloseTo(shift[0], 1); expect(gR.to![0] - gl.to![0]).toBeCloseTo(shift[0], 1); expect(gR.to![1] - gl.to![1]).toBeCloseTo(shift[1], 1)  // F(g∘f) = image of g∘f
    const FXp = M.fncImage(X) as number[], FZp = M.fncImage(Z) as number[], first = right.find((a) => dist(a.from!, FXp) < 0.4)!, last = right.find((a) => dist(a.to!, FZp) < 0.4)!
    expect(dist(first.to!, last.from!)).toBeLessThan(0.7); expect(dist(gR.from!, FXp)).toBeLessThan(0.4); expect(dist(gR.to!, FZp)).toBeLessThan(0.4)    // Fg∘Ff and F(g∘f) both run FX → FZ
    expect(texts(s)).toEqual(expect.arrayContaining(['Ff', 'Fg', 'g∘f', 'F(g∘f)', 'F(g∘f) = Fg∘Ff']))
  })

  it('Natural transformation: the four dots form a commuting square — Ff ∥ Gf, ηX ∥ ηY, both paths from FX to GY have the same vector as the green diagonal', () => {
    const s = M.buildNaturalTransformationScene(), { FX, FY, GX, GY } = M.NAT
    const d = dots(s, INK).map((q) => q.position!); expect(d).toHaveLength(4); [FX, FY, GX, GY].forEach((p) => expect(d.some((q) => dist(q, p as number[]) < 0.02)).toBe(true))
    const vec = (o: Obj) => [o.to![0] - o.from![0], o.to![1] - o.from![1]], blue = arrows(s, BLUE).map(vec), red = arrows(s, RED).map(vec), green = vec(arrows(s, GREEN)[0])
    expect(blue).toHaveLength(2); expect(red).toHaveLength(2)
    expect(blue[0][0]).toBeCloseTo(blue[1][0], 6); expect(blue[0][1]).toBeCloseTo(blue[1][1], 6); expect(red[0][0]).toBeCloseTo(red[1][0], 6); expect(red[0][1]).toBeCloseTo(red[1][1], 6)       // Ff = Gf, ηX = ηY as vectors
    const Ff = [FY[0] - FX[0], FY[1] - FX[1]], Gf = [GY[0] - GX[0], GY[1] - GX[1]], eX = [GX[0] - FX[0], GX[1] - FX[1]], eY = [GY[0] - FY[0], GY[1] - FY[1]]
    const path1 = [Ff[0] + eY[0], Ff[1] + eY[1]], path2 = [eX[0] + Gf[0], eX[1] + Gf[1]], diag = [GY[0] - FX[0], GY[1] - FX[1]]                          // across then down; down then across
    expect(path1[0]).toBeCloseTo(path2[0], 9); expect(path1[1]).toBeCloseTo(path2[1], 9); expect(path1[0]).toBeCloseTo(diag[0], 9); expect(path1[1]).toBeCloseTo(diag[1], 9)
    expect(crossz(green, diag) / (Math.hypot(...green) * Math.hypot(...diag))).toBeCloseTo(0, 2); expect(dotp(green, diag)).toBeGreaterThan(0)                                                         // the green arrow is the common composite
    expect(crossz(Ff, Gf)).toBeCloseTo(0, 9); expect(crossz(eX, eY)).toBeCloseTo(0, 9)
    expect(texts(s)).toEqual(expect.arrayContaining(['FX', 'FY', 'GX', 'GY', 'Ff', 'Gf', 'ηX', 'ηY', 'commutes', 'ηY∘Ff = Gf∘ηX']))
  })

  it('Platonic solids: each drawn wireframe has the V, E, F of its solid (V − E + F = 2), all vertices of a solid have the same degree, the edges are the projected edges of the exact vertex sets, and cube/octahedron and dodecahedron/icosahedron swap V and F', () => {
    const s = M.buildPlatonicSolidsScene(), lines3 = bonds(s, BLUE, 0.03).concat(bonds(s, GREEN, 0.03), bonds(s, RED, 0.03), bonds(s, VIOLET, 0.03))
    const expectedDeg = { tetra: 3, cube: 3, octa: 4, dodeca: 3, icosa: 5 }
    const info = M.PLATONIC.map((sol, i) => {
      const c = M.platonicCenter(i), mine = lines3.filter((o) => Math.abs((o.from![0] + o.to![0]) / 2 - c[0]) < 1.8 && Math.abs((o.from![1] + o.to![1]) / 2 - c[1]) < 1.8)
      const vs: number[][] = []; for (const o of mine) for (const p of [o.from!, o.to!]) if (!vs.some((q) => dist(q, p) < 0.015)) vs.push(p)
      const deg = vs.map((v) => mine.filter((o) => dist(o.from!, v) < 0.015 || dist(o.to!, v) < 0.015).length)
      expect(mine.length, sol.name).toBe(sol.E); expect(vs.length, sol.name).toBe(sol.V); expect(2 - vs.length + mine.length, sol.name).toBe(sol.F); expect(new Set(deg).size, sol.name).toBe(1); expect(deg[0]).toBe(expectedDeg[sol.kind])   // regular: V − E + F = 2
      const V3 = M.platonicVertices(sol.kind), E3 = M.platonicEdges(V3), R3 = M.platonicCircum(sol.kind)
      expect(E3).toHaveLength(sol.E); expect(V3).toHaveLength(sol.V)
      const lens = E3.map(([a, b]) => Math.hypot(V3[a][0] - V3[b][0], V3[a][1] - V3[b][1], V3[a][2] - V3[b][2])); expect(Math.max(...lens) - Math.min(...lens)).toBeLessThan(1e-9)    // all edges equal
      E3.forEach(([a, b]) => { const pa = M.platonicProject(V3[a], c, R3), pb = M.platonicProject(V3[b], c, R3); expect(mine.some((o) => (dist(o.from!, pa as number[]) < 0.02 && dist(o.to!, pb as number[]) < 0.02) || (dist(o.from!, pb as number[]) < 0.02 && dist(o.to!, pa as number[]) < 0.02))).toBe(true) })
      return sol })
    const byName = Object.fromEntries(info.map((x) => [x.name, x])); expect([byName.cube.V, byName.cube.F]).toEqual([byName.octahedron.F, byName.octahedron.V]); expect([byName.dodecahedron.V, byName.dodecahedron.F]).toEqual([byName.icosahedron.F, byName.icosahedron.V]); expect(byName.tetrahedron.V).toBe(byName.tetrahedron.F)
    expect(texts(s)).toEqual(expect.arrayContaining(['tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron']))
  })

  it('Curves: the ellipse points satisfy (x/1.8)² + (y/1.2)² = 1, the red arrows point along the counter-clockwise unit tangent, and the osculating circles have radius 1/κ = 0.8 and 2.7 and are tangent to the curve', () => {
    const s = M.buildCurvesInSpaceScene(), { c, u, a, b } = M.DGC, toM = inv(c[0], c[1], u, u)
    const el = pathsOf(s, BLUE, 40)[0].points!.map(toM); el.forEach(([x, y]) => expect(Math.abs((x / a) ** 2 + (y / b) ** 2 - 1)).toBeLessThan(0.02))
    const ar = arrows(s, RED); expect(ar).toHaveLength(8)
    ar.forEach((o, k) => { const t = (k * Math.PI) / 4, T = M.unitTangent(t), v = [o.to![0] - o.from![0], o.to![1] - o.from![1]], l = Math.hypot(v[0], v[1]); expect(l).toBeCloseTo(0.7, 1); expect(crossz(v, T)).toBeCloseTo(0, 1); expect(dotp(v, T)).toBeGreaterThan(0); const p = toM(o.from!); expect(p[0]).toBeCloseTo(a * Math.cos(t), 1); expect(p[1]).toBeCloseTo(b * Math.sin(t), 1) })
    const k0 = M.ellipseCurvature(0), k1 = M.ellipseCurvature(Math.PI / 2); expect(k0).toBeCloseTo(a / b ** 2, 9); expect(k1).toBeCloseTo(b / a ** 2, 9); expect(k0).toBeCloseTo(1.25, 2); expect(k1).toBeCloseTo(0.37, 2)
    const g = fitCircle(pathsOf(s, GREEN, 40)[0]); expect(g.r / u).toBeCloseTo(1 / k0, 1); expect(toM(g.c)[0]).toBeCloseTo(a - 1 / k0, 1); expect(toM(g.c)[1]).toBeCloseTo(0, 1)
    expect(dist(toM(g.c), [a, 0])).toBeCloseTo(1 / k0, 1)                                                                                                // the circle passes through (a, 0) with the normal along the x-axis: tangent
    const arc = pathsOf(s, VIOLET, 20)[0].points!.map(toM), n = arc.length, cc = circum(arc[0], arc[Math.floor(n / 2)], arc[n - 1])
    expect(cc.r).toBeCloseTo(1 / k1, 0); expect(cc.c[0]).toBeCloseTo(0, 1); expect(cc.c[1]).toBeCloseTo(b - 1 / k1, 0); expect(Math.max(...arc.map((q) => q[1]))).toBeCloseTo(b, 1)       // touches the curve at the top (0, b)
    expect(texts(s)).toEqual(expect.arrayContaining(['curvature 1.25', 'curvature 0.37']))
  })

  it('Frenet–Serret: the helix is drawn from (cos t, sin t, t/2), the red / green / blue arrows are T, N, B at t = π, they are orthonormal with B = T × N, and by finite differences T′ = κN, N′ = −κT + τB, B′ = −τN with κ = 0.8, τ = 0.4', () => {
    const s = M.buildFrenetSerretScene(), F = M.FSR
    const proj = (p: readonly number[]): number[] => [F.ox + F.ux * p[0] + F.dxy * p[1], F.oy + F.uz * p[2] + F.dyy * p[1]], vec = (v: readonly number[]): number[] => [F.ux * v[0] + F.dxy * v[1], F.uz * v[2] + F.dyy * v[1]]
    const hx = pathsOf(s, BLUE, 40)[0].points!; expect(hx).toHaveLength(121)
    hx.forEach((q, i) => { const t = (2 * Math.PI * F.turns * i) / 120; expect(dist(q, proj([Math.cos(t), Math.sin(t), F.c * t]))).toBeLessThan(0.015) })
    const t0 = F.t0, step = 1e-5, r = (t: number) => [Math.cos(t), Math.sin(t), F.c * t], diff = (f: (t: number) => number[], t: number) => f(t + step).map((v, i) => (v - f(t - step)[i]) / (2 * step))
    const speed = (t: number) => Math.hypot(...diff(r, t)), Tn = (t: number) => diff(r, t).map((v) => v / speed(t))
    const T = Tn(t0), dT = diff(Tn, t0).map((v) => v / speed(t0)), kappa = Math.hypot(...dT), N = dT.map((v) => v / kappa), B = cross3(T, N)
    const fr = M.fsrFrame(t0); expect(fr.T).toEqual(T.map((v) => expect.closeTo(v, 5))); expect(fr.N).toEqual(N.map((v) => expect.closeTo(v, 5))); expect(fr.B).toEqual(B.map((v) => expect.closeTo(v, 5)))
    expect(kappa).toBeCloseTo(0.8, 5); expect(fr.kappa).toBeCloseTo(0.8, 9); expect(fr.tau).toBeCloseTo(0.4, 9)
    ;[[T, N], [T, B], [N, B]].forEach(([a, b]) => expect(dot3(a, b)).toBeCloseTo(0, 6)); [T, N, B].forEach((v) => expect(Math.hypot(...v)).toBeCloseTo(1, 6))
    const Nf = (t: number) => diff(Tn, t).map((v) => v / speed(t) / kappa), Bf = (t: number) => cross3(Tn(t), Nf(t))
    const dN = diff(Nf, t0).map((v) => v / speed(t0)), dB = diff(Bf, t0).map((v) => v / speed(t0)), tau = -dot3(dB, N)
    expect(tau).toBeCloseTo(0.4, 4)
    dN.forEach((v, i) => expect(v).toBeCloseTo(-kappa * T[i] + tau * B[i], 4)); dB.forEach((v, i) => expect(v).toBeCloseTo(-tau * N[i], 4))        // N′ = −κT + τB, B′ = −τN
    const start = proj(r(t0)), tip = (v: readonly number[]) => [start[0] + F.len * vec(v)[0], start[1] + F.len * vec(v)[1]]
    ;([[RED, T], [GREEN, N], [BLUE, B]] as const).forEach(([col, v]) => { const a = arrows(s, col)[0]; expect(dist(a.from!, start)).toBeLessThan(0.02); expect(dist(a.to!, tip(v))).toBeLessThan(0.02) })
    expect(texts(s)).toEqual(expect.arrayContaining(['T′ = κN', 'N′ = −κT + τB', 'B′ = −τN', 'κ = 0.8', 'τ = 0.4']))
  })

  it('Simple function: the three drawn pieces give ∫φ dμ = 1·1 + 3·1.5 + 2·1.5 = 8.5; the red and blue staircases are the simple functions ⌊2ⁿx⌋/2ⁿ, increasing and below f(x) = x with error at most 2⁻ⁿ', () => {
    const s = M.buildSimpleFunctionScene(), { L, R } = M.SMP, toL = inv(L.ox, L.oy, L.ux, L.uy), toR = inv(R.ox, R.oy, R.ux, R.uy)
    const tops = bonds(s, INK, 0.06).map((o) => ({ a: toL(o.from!)[0], b: toL(o.to!)[0], v: toL(o.from!)[1] })).sort((p, q) => p.a - q.a); expect(tops).toHaveLength(3)
    expect(tops.map((t) => [t.a, t.b, t.v].map((v) => Math.round(v * 100) / 100))).toEqual([[0, 1, 1], [1, 2.5, 3], [2.5, 4, 2]]); expect(sum(tops.map((t) => t.v * (t.b - t.a)))).toBeCloseTo(8.5, 6); expect(M.simpleIntegral()).toBeCloseTo(8.5, 9)
    ;([BLUE, RED, GREEN] as const).forEach((col, i) => { const bar = bonds(s, col, 0.1)[0], a = toL(bar.from!)[0], b = toL(bar.to!)[0]; expect(a).toBeCloseTo(tops[i].a + 0.05 / L.ux, 1); expect(b).toBeCloseTo(tops[i].b - 0.05 / L.ux, 1) })             // E₁, E₂, E₃ cover the interval
    expect(tops[0].b).toBeCloseTo(tops[1].a, 6); expect(tops[1].b).toBeCloseTo(tops[2].a, 6)
    const stair = (color: string, t: number) => bonds(s, color, t).filter((o) => o.from![0] > 0 && Math.abs(o.from![1] - o.to![1]) < 1e-9).map((o) => ({ x0: toR(o.from!)[0], x1: toR(o.to!)[0], h: toR(o.from!)[1] })).sort((a, b) => a.x0 - b.x0)
    const p1 = stair(RED, 0.05), p2 = stair(BLUE, 0.04); expect(p1).toHaveLength(3); expect(p2).toHaveLength(7)                                          // the n-th has 2^(n+1) − 1 non-zero steps on [0, 2]
    for (const [n, p] of [[1, p1], [2, p2]] as const) p.forEach((st) => { const exact = M.approxSimple(n, st.x0 + 1e-9); expect(st.h).toBeCloseTo(exact, 1); expect(st.h).toBeLessThanOrEqual(st.x0 + 0.02); expect(st.x0 - st.h).toBeLessThan(2 ** -n + 0.02) })   // φₙ ≤ f, f − φₙ < 2⁻ⁿ
    const area = (p: typeof p1) => sum(p.map((st) => st.h * (st.x1 - st.x0))); expect(area(p1)).toBeCloseTo(1.5, 1); expect(area(p2)).toBeCloseTo(1.75, 1); expect(area(p1)).toBeLessThan(area(p2)); expect(area(p2)).toBeLessThan(2)   // ∫φ₁ < ∫φ₂ < ∫f
    expect(texts(s)).toEqual(expect.arrayContaining(['1·1', '3·1.5', '2·1.5', '∫φ dμ = 8.5', 'φ₁ ≤ φ₂ ≤ f']))
  })

  it('Lebesgue integral: the green sets E = [√y, 1] have the written measures 0.50, 0.29, 0.13, the slab sum is 0.23 < 1/3 and tends to 1/3 for thin slabs, and the nine red dots are the rationals k/8 at height 1', () => {
    const s = M.buildLebesgueIntegralScene(), { L, R, levels } = M.LEB, toL = inv(L.ox, L.oy, L.u, L.u), toR = inv(R.ox, R.oy, R.ux, R.uy)
    pathsOf(s, BLUE, 40)[0].points!.map(toL).forEach(([x, y]) => expect(Math.abs(y - x * x)).toBeLessThan(0.02))
    const lv = bonds(s, VIOLET, 0.025).map((o) => toL(o.from!)[1]).sort((a, b) => a - b); expect(lv).toEqual(levels.map((y) => expect.closeTo(y, 2)))
    const segs = bonds(s, GREEN, 0.1).map((o) => ({ a: toL(o.from!)[0], b: toL(o.to!)[0] })).sort((p, q) => p.a - q.a); expect(segs).toHaveLength(3)
    const meas = segs.map((g) => g.b - g.a); levels.forEach((y, i) => { expect(segs[i].a).toBeCloseTo(Math.sqrt(y), 1); expect(segs[i].b).toBeCloseTo(1, 1) })
    levels.forEach((y, i) => expect(meas[i]).toBeCloseTo(1 - Math.sqrt(y), 1))                                                              // μ{x² ≥ y} = 1 − √y
    const slab = sum(meas.map((m) => 0.25 * m)); expect(slab).toBeCloseTo(0.23, 1); expect(slab).toBeLessThan(1 / 3); expect(slab).toBeCloseTo(M.slabSum(levels, 0.25), 1)
    const fine = Array.from({ length: 999 }, (_, i) => (i + 1) / 1000); expect(M.slabSum(fine, 0.001)).toBeCloseTo(1 / 3, 2)                              // thinner slabs → ∫₀¹ x² dx = 1/3
    ;[0.5, 0.29, 0.13].forEach((v) => expect(labelsOf(s).map((o) => o.text)).toContain(v.toFixed(2)))
    const rat = dots(s, RED).map((d) => toR(d.position!)); expect(rat).toHaveLength(9); rat.sort((a, b) => a[0] - b[0]).forEach(([x, y], k) => { expect(x).toBeCloseTo(k / 8, 2); expect(y).toBeCloseTo(1, 2) })
    expect(texts(s)).toEqual(expect.arrayContaining(['slabs sum 0.23', '1 on ℚ', '∫ 1_ℚ = 0']))
  })

  it('Cyclic group: the green triangle is the subgroup generated by 2 and the violet line the one generated by 3, computed mod 6 from the drawn points; their orders 3 and 2 divide 6, and the ringed points are exactly the generators 1 and 5', () => {
    const s = M.buildCyclicGroupScene(), { c, R, n } = M.CYG, pts = Array.from({ length: n }, (_, k) => [c[0] + R * Math.sin((k * 2 * Math.PI) / n), c[1] + R * Math.cos((k * 2 * Math.PI) / n)])
    const dd = dots(s, INK).filter((d) => d.radius === 0.14).map((d) => d.position!); expect(dd).toHaveLength(6); pts.forEach((p) => expect(dd.some((q) => dist(q, p) < 0.02)).toBe(true))      // 0 at the top, clockwise
    const idx = (p: number[]) => nearest(p, pts)
    const verts = (color: string, t: number) => [...new Set(bonds(s, color, t).flatMap((o) => [idx(o.from!), idx(o.to!)]))].sort((a, b) => a - b)
    expect(verts(GREEN, 0.06)).toEqual(M.generated(2, 6)); expect(verts(VIOLET, 0.06)).toEqual(M.generated(3, 6)); expect(M.generated(1, 6)).toEqual([0, 1, 2, 3, 4, 5])
    expect(M.generated(2, 6)).toEqual([0, 2, 4]); expect(M.generated(3, 6)).toEqual([0, 3]); expect(6 % M.generated(2, 6).length).toBe(0); expect(6 % M.generated(3, 6).length).toBe(0)       // Lagrange: orders divide 6
    expect(bonds(s, GREEN, 0.06)).toHaveLength(3)
    const gens = [0, 1, 2, 3, 4, 5].filter((g) => M.generated(g === 0 ? 6 : g, 6).length === 6); expect(gens).toEqual([1, 5])
    const ringed = pathsOf(s, BLUE, 8).filter((p) => p.points!.length === 21).map((p) => idx(fitCircle(p).c)).sort((a, b) => a - b); expect(ringed).toEqual(gens)
    const sub = (set: number[]) => set.every((a) => set.every((b) => set.includes((a + b) % 6))); expect(sub(M.generated(2, 6))).toBe(true); expect(sub(M.generated(3, 6))).toBe(true)         // closed under addition mod 6
    const hops = pathsOf(s, BLUE, 8).filter((p) => p.points!.length === 9); expect(hops).toHaveLength(6)
    expect(texts(s)).toEqual(expect.arrayContaining(['ℤ₆ = ⟨g⟩', 'order 3', 'order 2', 'generators 1, 5']))
  })

  it('Convolution: the overlap of the drawn boxes is 0.5 at x = 0.5 and 1 at x = 1, the hatching spans exactly the overlap, and the green triangle through the white dots is (f*g)(x) = min(x, 2 − x), the numerical convolution of the boxes', () => {
    const s = M.buildConvolutionScene(), { ox, oy, ux, uy, xs, res } = M.CNV2
    const toT = inv(ox, oy, ux, uy), toRes = inv(res.ox, res.oy, res.ux, res.uy)
    const boxOf = (color: string, t: number) => { const vs = bonds(s, color, t).filter((o) => Math.abs(o.from![0] - o.to![0]) < 1e-9).map((o) => toT(o.from!)[0]).sort((a, b) => a - b); return [vs[0], vs[vs.length - 1]] }
    const fBox = boxOf(BLUE, 0.06), red = boxOf(RED, 0.05), violet = boxOf(VIOLET, 0.04)
    expect(fBox).toEqual([expect.closeTo(0, 6), expect.closeTo(1, 6)]); expect(red[1] - red[0]).toBeCloseTo(1, 6); expect(violet[1] - violet[0]).toBeCloseTo(1, 6)
    const overlap = (a: number[], b: number[]) => Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0]))
    expect(overlap(fBox, red)).toBeCloseTo(0.5, 6); expect(overlap(fBox, violet)).toBeCloseTo(1, 6)
    expect(red[1]).toBeCloseTo(xs[0], 6); expect(violet[1]).toBeCloseTo(xs[1], 6)                                                                       // the flipped box g(x − y) ends at y = x
    expect(M.convAt(xs[0])).toBeCloseTo(overlap(fBox, red), 2); expect(M.convAt(xs[1])).toBeCloseTo(overlap(fBox, violet), 2)                          // ∫ f(y) g(x − y) dy is the overlap length
    const hatch = (color: string) => bonds(s, color, 0.02).map((o) => toT(o.from!)[0]); const hx = hatch(GREEN).filter((x) => x >= -1 && x <= 2); expect(hx.length).toBeGreaterThan(8)
    const lo = Math.min(...hx), hi = Math.max(...hx); expect([lo, hi].map((v) => Math.round(v * 100) / 100)).toEqual([0, 1])                                  // the union of both hatches is [0, 1]; the first spans [0, 0.5]
    const tri = bonds(s, GREEN, 0.06).map((o) => [toRes(o.from!), toRes(o.to!)]); expect(tri).toHaveLength(2)
    expect(tri[0][0]).toEqual(approx([0, 0], 2)); expect(tri[0][1]).toEqual(approx([1, 1], 2)); expect(tri[1][1]).toEqual(approx([2, 0], 2))
    for (const x of [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75]) { const seg = x <= 1 ? tri[0] : tri[1], y = seg[0][1] + ((seg[1][1] - seg[0][1]) * (x - seg[0][0])) / (seg[1][0] - seg[0][0]); expect(y).toBeCloseTo(M.convAt(x), 1); expect(y).toBeCloseTo(Math.min(x, 2 - x), 1) }
    const wd = dots(s, INK).map((d) => toRes(d.position!)); expect(wd).toHaveLength(2); wd.forEach(([x, y]) => expect(y).toBeCloseTo(M.convAt(x), 1))
    expect(texts(s)).toEqual(expect.arrayContaining(['0.5', 'f*g']))
  })
})
