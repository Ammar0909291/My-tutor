/**
 * Mathematics visual campaign, batch 22 (2026-10-12): complex analysis (the complex plane, line integrals, Cauchy's theorem,
 * residues, real integrals by residues, Möbius maps, the Riemann surface of log z) and topology (open sets, homeomorphism, quotient
 * spaces, homotopy, the fundamental group, the Euler characteristic). Contour integrals are summed along the DRAWN curves, winding
 * numbers are counted from the drawn loops, the finite topology is rebuilt from the drawn boxes, and the planar graphs are
 * checked for crossings before V − E + F is recomputed.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB22'

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
  ['math.cx.complex-numbers-analysis', M.buildComplexNumbersAnalysisScene, 'math-complex-numbers-analysis'],
  ['math.cx.complex-integration', M.buildComplexIntegrationScene, 'math-complex-integration'],
  ['math.cx.cauchy-theorem', M.buildCauchyTheoremScene, 'math-cauchy-theorem'],
  ['math.cx.residue-theorem', M.buildResidueTheoremScene, 'math-residue-theorem'],
  ['math.cx.real-integral-residues', M.buildRealIntegralResiduesScene, 'math-real-integral-residues'],
  ['math.cx.mobius-transformation', M.buildMobiusTransformationScene, 'math-mobius-transformation'],
  ['math.cx.riemann-surface', M.buildRiemannSurfaceScene, 'math-riemann-surface'],
  ['math.top.open-sets', M.buildTopologyOpenSetsScene, 'math-topology-open-sets'],
  ['math.top.homeomorphism', M.buildHomeomorphismScene, 'math-homeomorphism'],
  ['math.top.quotient-space', M.buildQuotientSpaceScene, 'math-quotient-space'],
  ['math.top.homotopy', M.buildHomotopyScene, 'math-homotopy'],
  ['math.top.fundamental-group', M.buildFundamentalGroupScene, 'math-fundamental-group'],
  ['math.top.euler-characteristic', M.buildEulerCharacteristicScene, 'math-euler-characteristic'],
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
type C = [number, number]
const mean = (xs: number[]) => sum(xs) / xs.length
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const cmul = (a: C, b: C): C => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
/** ∫ f dz along a drawn polyline (midpoint rule); toZ maps a screen point to the complex number it stands for. */
const contour = (pts: number[][], f: (z: C) => C, toZ: (p: number[]) => C): C => { let re = 0, im = 0; for (let i = 0; i < pts.length - 1; i++) { const a = toZ(pts[i]), b = toZ(pts[i + 1]), m: C = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], t = cmul(f(m), [b[0] - a[0], b[1] - a[1]]); re += t[0]; im += t[1] } return [re, im] }
/** how many times a drawn loop winds round c (signed, counter-clockwise positive) */
const winding = (pts: number[][], c: number[]) => { let a = 0; for (let i = 0; i < pts.length - 1; i++) { const u = [pts[i][0] - c[0], pts[i][1] - c[1]], v = [pts[i + 1][0] - c[0], pts[i + 1][1] - c[1]]; a += Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]) } return a / (2 * Math.PI) }
const fitCircle = (p: Obj) => { const pts = p.points!.slice(0, -1), cx = mean(pts.map((q) => q[0])), cy = mean(pts.map((q) => q[1])); return { c: [cx, cy], r: mean(pts.map((q) => Math.hypot(q[0] - cx, q[1] - cy))) } }
const closed = (p: Obj) => dist(p.points![0], p.points![p.points!.length - 1]) < 0.02
const labelAt = (s: SceneSpec, p: number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const subsetsOf = <T,>(xs: readonly T[]): T[][] => xs.reduce<T[][]>((acc, x) => acc.concat(acc.map((r) => [...r, x])), [[]])

describe('the mathematics each figure draws', () => {
  it('Complex plane: the blue arrow ends at 3 + 4i with modulus 5 and argument 53.13°, the arc spans exactly that angle, the red point is the conjugate, and z z̄ = |z|² = 25 from the drawn points', () => {
    const s = M.buildComplexNumbersAnalysisScene(), { c, u, arcR } = M.CNA
    const toZ = (p: number[]): C => [(p[0] - c[0]) / u, (p[1] - c[1]) / u]
    const z = toZ(arrows(s, BLUE)[0].to!), zc = toZ(arrows(s, RED)[0].to!)
    expect(z).toEqual(approx([3, 4], 2)); expect(zc).toEqual(approx([3, -4], 2))
    expect(Math.hypot(...z)).toBeCloseTo(5, 1); expect((Math.atan2(z[1], z[0]) * 180) / Math.PI).toBeCloseTo(53.13, 0)
    expect(zc[0]).toBeCloseTo(z[0], 1); expect(zc[1]).toBeCloseTo(-z[1], 1)                                                                     // mirror image in the real axis
    const prod = cmul(z, zc); expect(prod[0]).toBeCloseTo(25, 0); expect(prod[1]).toBeCloseTo(0, 0); expect(prod[0]).toBeCloseTo(z[0] ** 2 + z[1] ** 2, 0)
    const arc = pathsOf(s, GREEN, 8)[0].points!; arc.forEach((q) => expect(dist(q, c as number[])).toBeCloseTo(arcR, 1))
    const a0 = Math.atan2(arc[0][1] - c[1], arc[0][0] - c[0]), a1 = Math.atan2(arc[arc.length - 1][1] - c[1], arc[arc.length - 1][0] - c[0]); expect(a0).toBeCloseTo(0, 1); expect(a1).toBeCloseTo(Math.atan2(z[1], z[0]), 1)
    const guides = bonds(s, VIOLET, 0.02).map((o) => toZ(o.from!)).concat(bonds(s, VIOLET, 0.02).map((o) => toZ(o.to!))); expect(guides.some((g) => near(g[0], 3, 0.02) && near(g[1], 0, 0.02))).toBe(true); expect(guides.some((g) => near(g[0], 0, 0.02) && near(g[1], 4, 0.02))).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['z = 3 + 4i', '|z| = 5', 'z̄ = 3 − 4i', 'z z̄ = 25', '|z|² = 25']))
  })

  it('Complex line integral: summing f(z) = 1/z along the drawn semicircle gives iπ (real part 0), the length is π, |∫| ≤ max|f|·length, and the five blue arrows are identical (f γ′ = i)', () => {
    const s = M.buildComplexIntegrationScene(), { c, R } = M.CIN
    const arc = pathsOf(s, BLUE, 40)[0].points!, toZ = (p: number[]): C => [(p[0] - c[0]) / R, (p[1] - c[1]) / R]
    arc.forEach((q) => expect(dist(q, c as number[])).toBeCloseTo(R, 1))
    expect(toZ(arc[0])).toEqual(approx([1, 0], 2)); expect(toZ(arc[arc.length - 1])).toEqual(approx([-1, 0], 2))
    const I = contour(arc, ([x, y]) => { const d = x * x + y * y; return [x / d, -y / d] }, toZ)
    expect(I[0]).toBeCloseTo(0, 1); expect(I[1]).toBeCloseTo(Math.PI, 1)                                                                          // ∫ dz/z = iπ
    const length = sum(arc.slice(1).map((q, i) => dist(q, arc[i]))) / R, maxF = Math.max(...arc.map((q) => 1 / Math.hypot(...toZ(q))))
    expect(length).toBeCloseTo(Math.PI, 1); expect(Math.hypot(I[0], I[1])).toBeLessThanOrEqual(maxF * length + 0.02); expect(maxF).toBeCloseTo(1, 1)
    for (const a of arrows(s, RED)) { const r = [a.from![0] - c[0], a.from![1] - c[1]], d = [a.to![0] - a.from![0], a.to![1] - a.from![1]]; expect(dist(a.from!, c as number[])).toBeCloseTo(R, 1); expect(dotp(r, d)).toBeCloseTo(0, 1); expect(crossz(r, d)).toBeGreaterThan(0) }   // tangent, counter-clockwise
    const ups = arrows(s, BLUE); expect(ups).toHaveLength(5); ups.forEach((a) => { expect(a.to![0] - a.from![0]).toBeCloseTo(0, 6); expect(a.to![1] - a.from![1]).toBeCloseTo(1, 6) })
    const xs = ups.map((a) => a.from![0]).sort((a, b) => a - b); xs.slice(1).forEach((x, i) => expect(x - xs[i]).toBeCloseTo(M.CIN.axis.w / 4, 2))
    for (const t of M.CIN.ts) { const e: C = [Math.cos(t), -Math.sin(t)], g: C = [-Math.sin(t), Math.cos(t)], p = cmul(e, g); expect(p[0]).toBeCloseTo(0, 9); expect(p[1]).toBeCloseTo(1, 9) }   // e^(−it) · i e^(it) = i
    expect(texts(s)).toEqual(expect.arrayContaining(['∫ dz/z = iπ', '|∫| = π ≤ 1 · π', 'f(γ)γ′ = i']))
  })

  it("Cauchy's theorem: round the drawn simple loop ∮ z² dz and ∮ dz/(z − p) (p outside) are 0, round the hole ∮ dz/(z − z₀) = 2πi with winding number 1; two drawn paths A → B give the same ∫ z² dz", () => {
    const s = M.buildCauchyTheoremScene(), { dl, loopL, hole, loopR, A, B, bow } = M.CAUT
    const id = (p: number[]): C => [p[0], p[1]], sq = (z: C): C => cmul(z, z), pole = (p: number[]) => (z: C): C => { const d: C = [z[0] - p[0], z[1] - p[1]], n = d[0] * d[0] + d[1] * d[1]; return [d[0] / n, -d[1] / n] }
    const loops = pathsOf(s, GREEN, 40), left = loops.find((p) => p.points![0][0] < 0)!.points!, right = pathsOf(s, RED, 40).find((p) => p.points![0][0] > 0 && closed(p))!.points!
    expect(closed(pathsOf(s, GREEN, 40)[0])).toBe(true)
    left.forEach((q) => expect(((q[0] - dl.c[0]) / dl.rx) ** 2 + ((q[1] - dl.c[1]) / dl.ry) ** 2).toBeLessThan(1))                                  // C lies inside D
    const I0 = contour(left, sq, id), I1 = contour(left, pole(hole as number[]), id); expect(Math.hypot(...I0)).toBeLessThan(0.05); expect(Math.hypot(...I1)).toBeLessThan(0.05)
    const I2 = contour(right, pole(hole as number[]), id); expect(I2[0]).toBeCloseTo(0, 1); expect(I2[1]).toBeCloseTo(2 * Math.PI, 1)               // 2πi round the puncture
    expect(winding(right, hole as number[])).toBeCloseTo(1, 1); expect(winding(left, hole as number[])).toBeCloseTo(0, 1)
    expect(dots(s, RED).some((d) => dist(d.position!, hole as number[]) < 0.02)).toBe(true)
    const pa = pathsOf(s, BLUE, 40).find((p) => p.points![0][0] < 0 && dist(p.points![0], A as number[]) < 0.02)!.points!, pb = pathsOf(s, RED, 40).find((p) => p.points![0][0] < 0 && dist(p.points![0], A as number[]) < 0.02)!.points!
    expect(dist(pa[pa.length - 1], B as number[])).toBeLessThan(0.02); expect(dist(pb[pb.length - 1], B as number[])).toBeLessThan(0.02)
    ;[...pa, ...pb].forEach((q) => expect(((q[0] - dl.c[0]) / dl.rx) ** 2 + ((q[1] - dl.c[1]) / dl.ry) ** 2).toBeLessThan(1))
    const cube = (z: C): C => cmul(cmul(z, z), z), exact: C = [(cube([B[0], B[1]])[0] - cube([A[0], A[1]])[0]) / 3, (cube([B[0], B[1]])[1] - cube([A[0], A[1]])[1]) / 3]
    const Ja = contour(pa, sq, id), Jb = contour(pb, sq, id)
    ;[Ja, Jb].forEach((J) => { expect(J[0]).toBeCloseTo(exact[0], 0); expect(J[1]).toBeCloseTo(exact[1], 0) })                                       // ∫ z² dz = (B³ − A³)/3 along either path
    expect(Ja[0]).toBeCloseTo(Jb[0], 1); expect(Ja[1]).toBeCloseTo(Jb[1], 1)                                                                        // same ∫ whichever path
    expect(bow).toBeLessThan(0); expect(loopL.c[1]).toBeGreaterThan(A[1]); expect(loopR.r).toBeGreaterThan(0.5)
  })

  it('Residue theorem: the drawn circle encloses exactly the poles 0 and −1, each with residue 1 (small-circle integrals), and ∮ f dz summed along the drawn contour is 4πi = 2πi(1 + 1)', () => {
    const s = M.buildResidueTheoremScene(), { o, u, poles, cc, cr } = M.RES
    const toZ = (p: number[]): C => [(p[0] - o[0]) / u, (p[1] - o[1]) / u], f = (z: C): C => M.resF(z[0], z[1])
    const circ = pathsOf(s, BLUE, 40)[0], fit = fitCircle(circ), center = toZ(fit.c); expect(center[0]).toBeCloseTo(cc, 1); expect(center[1]).toBeCloseTo(0, 1); expect(fit.r / u).toBeCloseTo(cr, 1)
    const red = dots(s, RED).map((d) => toZ(d.position!)); expect(red).toHaveLength(2)
    const inside = poles.filter((p) => Math.hypot(p - center[0], 0) < fit.r / u); expect(inside.sort()).toEqual([-1, 0]); expect(red.map((r) => Math.round(r[0])).sort()).toEqual([-1, 0])
    for (const p of poles) { const small = Array.from({ length: 73 }, (_, i) => [p + 0.2 * Math.cos((2 * Math.PI * i) / 72), 0.2 * Math.sin((2 * Math.PI * i) / 72)]); const r = contour(small, f, (q) => [q[0], q[1]]); expect(r[0] / (2 * Math.PI)).toBeCloseTo(0, 1); expect(r[1] / (2 * Math.PI)).toBeCloseTo(1, 1) }   // Res = 1 at each pole
    const total = contour(circ.points!, f, toZ); expect(total[0]).toBeCloseTo(0, 0); expect(total[1]).toBeCloseTo(4 * Math.PI, 0)
    const outside = labelsOf(s).filter((l) => l.text === '1'); expect(outside).toHaveLength(2)
    expect(texts(s)).toEqual(expect.arrayContaining(['outside: ignored', '∮ f dz = 2πi Σ Res', '2πi (1 + 1) = 4πi']))
  })

  it('Real integral by residues: along the drawn real segment + semicircle the integral of 1/(1 + z²) is π = 2πi · Res(i), i is inside and −i outside, and the arc is below πR/(R² − 1)', () => {
    const s = M.buildRealIntegralResiduesScene(), { o, u, R } = M.RIR
    const toZ = (p: number[]): C => [(p[0] - o[0]) / u, (p[1] - o[1]) / u], f = (z: C): C => { const w = cmul(z, z), d: C = [1 + w[0], w[1]], n = d[0] * d[0] + d[1] * d[1]; return [d[0] / n, -d[1] / n] }
    const seg = bonds(s, BLUE, 0.07)[0], arc = pathsOf(s, GREEN, 40)[0].points!
    expect(toZ(seg.from!)).toEqual(approx([-R, 0], 2)); expect(toZ(seg.to!)).toEqual(approx([R, 0], 2))
    arc.forEach((q) => expect(dist(q, o as number[])).toBeCloseTo(R * u, 1)); arc.forEach((q) => expect(q[1]).toBeGreaterThanOrEqual(o[1] - 0.01))   // upper semicircle of radius R
    expect(toZ(arc[0])).toEqual(approx([R, 0], 2)); expect(toZ(arc[arc.length - 1])).toEqual(approx([-R, 0], 2))                                   // closes the segment
    const segI = contour([seg.from!, seg.to!].flatMap((p, i, a) => (i === 0 ? Array.from({ length: 401 }, (_, k) => [a[0][0] + ((a[1][0] - a[0][0]) * k) / 400, a[0][1]]) : [])), f, toZ), arcI = contour(arc, f, toZ)
    expect(segI[0]).toBeCloseTo(2 * Math.atan(R), 1); expect(arcI[1]).toBeCloseTo(0, 1)
    expect(segI[0] + arcI[0]).toBeCloseTo(Math.PI, 1)                                                                                              // the closed contour integral
    const res = (() => { const e = 1e-6, z: C = [0, 1 + e], v = f(z); return cmul(v, [0, e]) })(); expect(res[0]).toBeCloseTo(0, 3); expect(res[1]).toBeCloseTo(-0.5, 3)    // Res(i) = 1/(2i) = −i/2
    const twoPiI: C = cmul([0, 2 * Math.PI], res as C); expect(twoPiI[0]).toBeCloseTo(Math.PI, 3)
    expect(Math.hypot(...arcI)).toBeLessThan(M.arcBound(R)); expect(M.arcBound(R)).toBeCloseTo((Math.PI * 3) / 8, 6); expect(M.arcBound(100)).toBeLessThan(0.04)
    const red = dots(s, RED)[0]; expect(toZ(red.position!)).toEqual(approx([0, 1], 2)); expect(Math.hypot(...toZ(red.position!))).toBeLessThan(R)
    expect(texts(s)).toEqual(expect.arrayContaining(['1/(1 + x²)', 'Res = 1/(2i)', '2πi · 1/(2i) = π', 'arc → 0 as R → ∞']))
  })

  it('Möbius map: every point of the drawn blue image circle is 1/z of a point with Re z = 1, every point of the red one is 1/z of a point with |z| = 1.6, and A′, B′, C′ are 1/A, 1/B, 1/C', () => {
    const s = M.buildMobiusTransformationScene(), { z0, w0, u, line: x1, circ } = M.MOB
    const toZ = (p: number[]): C => [(p[0] - z0[0]) / u, (p[1] - z0[1]) / u], toW = (p: number[]): C => [(p[0] - w0[0]) / u, (p[1] - w0[1]) / u]
    const lineZ = bonds(s, BLUE, 0.05)[0]; expect(toZ(lineZ.from!)[0]).toBeCloseTo(x1, 2); expect(toZ(lineZ.to!)[0]).toBeCloseTo(x1, 2)
    const redZ = fitCircle(pathsOf(s, RED, 40).find((p) => p.points![0][0] < 1)!); expect(toZ(redZ.c)).toEqual(approx([0, 0], 2)); expect(redZ.r / u).toBeCloseTo(circ, 1)
    const blueW = pathsOf(s, BLUE, 40).find((p) => p.points![0][0] > 1)!, redW = pathsOf(s, RED, 40).find((p) => p.points![0][0] > 1)!
    const fb = fitCircle(blueW); expect(toW(fb.c)).toEqual(approx([0.5, 0], 2)); expect(fb.r / u).toBeCloseTo(0.5, 1)
    for (const q of blueW.points!) { const w = toW(q); if (Math.hypot(...w) < 0.3) continue; const z = M.recip(w[0], w[1]); expect(Math.abs(z[0] - x1), `w = ${w}`).toBeLessThan(0.1) }   // away from 0 (whose preimage is far off the screen)
    const fr = fitCircle(redW); expect(toW(fr.c)).toEqual(approx([0, 0], 2)); expect(fr.r / u).toBeCloseTo(1 / circ, 1)
    for (const q of redW.points!) { const w = toW(q), z = M.recip(w[0], w[1]); expect(Math.hypot(...z)).toBeCloseTo(circ, 1) }
    const zs = dots(s, GREEN).filter((d) => d.position![0] < 0).map((d) => toZ(d.position!)), ws = dots(s, GREEN).filter((d) => d.position![0] > 0).map((d) => toW(d.position!))
    expect(zs).toHaveLength(3); expect(ws).toHaveLength(3)
    for (const z of zs) { const want = M.recip(z[0], z[1]); expect(ws.some((w) => Math.hypot(w[0] - want[0], w[1] - want[1]) < 0.03), `1/(${z}) = ${want}`).toBe(true) }
    expect(zs.some((z) => near(z[0], 1, 0.03) && near(z[1], 0, 0.03))).toBe(true); expect(ws.some((w) => near(w[0], 0.5, 0.03) && near(w[1], -0.5, 0.03))).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['w = 1/z', 'line → circle', 'circle → circle']))
  })

  it('Riemann surface of log z: the blue curve is the helix (cos θ, sin θ, θ/2π) under the oblique projection, the ribs are radial at every quarter turn one quarter-level higher, and the red points at θ = 0, 2π, 4π lie over the same z = 1', () => {
    const s = M.buildRiemannSurfaceScene(), o = M.RSF
    const proj = (x: number, y: number, h: number): number[] => [o.ox + o.ux * x + o.dxy * y, o.oy + o.uz * h + o.dyy * y]
    const helix = pathsOf(s, BLUE, 40)[0].points!; expect(helix).toHaveLength(121)
    helix.forEach((q, i) => { const th = (2 * Math.PI * o.turns * i) / 120, want = proj(Math.cos(th), Math.sin(th), th / (2 * Math.PI)); expect(dist(q, want)).toBeLessThan(0.015) })
    const ribs = bonds(s, SLATE, 0.02); expect(ribs).toHaveLength(4 * o.turns + 1)
    ribs.forEach((r, k) => { const dy = (r.to![1] - r.from![1]) / o.dyy, dx = (r.to![0] - r.from![0] - o.dxy * dy) / o.ux, h = (r.from![1] - o.oy) / o.uz
      expect(Math.hypot(dx, dy)).toBeCloseTo(o.rib, 1); expect(dx).toBeCloseTo(o.rib * Math.cos((k * Math.PI) / 2), 1); expect(dy).toBeCloseTo(o.rib * Math.sin((k * Math.PI) / 2), 1); expect(h).toBeCloseTo(k / 4, 1) })   // radial at θ = kπ/2, at height k/4
    const reds = dots(s, RED).sort((a, b) => a.position![1] - b.position![1]).map((d) => d.position!); expect(reds).toHaveLength(3)
    reds.forEach((p, k) => { expect(dist(p, proj(1, 0, k))).toBeLessThan(0.015); expect(p[0]).toBeCloseTo(reds[0][0], 2) })                          // same x on screen: the same z = 1
    expect(reds[1][1] - reds[0][1]).toBeCloseTo(o.uz, 2); expect(reds[2][1] - reds[1][1]).toBeCloseTo(o.uz, 2)                                      // one sheet = 2π higher
    const vl = bonds(s, VIOLET, 0.03)[0]; expect(vl.from![0]).toBeCloseTo(vl.to![0], 6); expect(vl.from![0]).toBeCloseTo(reds[0][0], 2)
    expect([0, 40, 80].every((i, k) => dist(helix[i], reds[k]) < 0.015)).toBe(true)                                              // helix at θ = 0, 2π, 4π
    const base = paths(s, SLATE).find((p) => p.points!.length === 73)!; base.points!.forEach((q, i) => expect(dist(q, proj(Math.cos((2 * Math.PI * i) / 72), Math.sin((2 * Math.PI * i) / 72), 0))).toBeLessThan(0.015))
  })

  it('Topology: the boxes drawn give the partition topology; int A = {a}, cl A = {a, c, d}, ∂A = {c, d} computed from the open and closed sets agree with the coloured points', () => {
    const s = M.buildTopologyOpenSetsScene(), { ys, A } = M.TPO, names = ['a', 'b', 'c', 'd']
    const panelOf = (y: number) => ys.findIndex((v) => Math.abs(y - v) < 1.2)
    const blocksOf = (p: number) => {
      const sl = bonds(s, SLATE, 0.03).filter((o) => panelOf(o.from![1]) === p), boxes: Array<{ x0: number; x1: number; y0: number; y1: number }> = []
      const used = new Set<number>(); sl.forEach((o, i) => { if (used.has(i)) return; const grp = [o]; used.add(i); let grew = true; while (grew) { grew = false; sl.forEach((q, j) => { if (!used.has(j) && grp.some((g) => [g.from!, g.to!].some((a) => [q.from!, q.to!].some((b) => dist(a, b) < 0.01)))) { grp.push(q); used.add(j); grew = true } }) } const xs = grp.flatMap((g) => [g.from![0], g.to![0]]), yv = grp.flatMap((g) => [g.from![1], g.to![1]]); boxes.push({ x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...yv), y1: Math.max(...yv) }) })
      return boxes.map((b) => names.filter((n) => { const q = M.tpoDot(p, n); return q[0] > b.x0 && q[0] < b.x1 && q[1] > b.y0 && q[1] < b.y1 }))
    }
    const blocks = blocksOf(0); expect(blocks.map((b) => b.join('')).sort()).toEqual(['a', 'b', 'cd'])
    for (const p of [1, 2]) expect(blocksOf(p).map((b) => b.join('')).sort()).toEqual(['a', 'b', 'cd'])
    const opens = subsetsOf(blocks).map((u) => u.flat().sort()), has = (xs: string[][], t: string[]) => xs.some((x) => x.join() === t.slice().sort().join())
    for (const x of opens) for (const y of opens) { expect(has(opens, [...new Set([...x, ...y])])).toBe(true); expect(has(opens, x.filter((e) => y.includes(e)))).toBe(true) }   // a topology: unions and intersections
    const closeds = opens.map((u) => names.filter((n) => !u.includes(n))), Aset = [...A]
    const interior = opens.filter((u) => u.every((e) => Aset.includes(e))).sort((a, b) => b.length - a.length)[0], closure = closeds.filter((c) => Aset.every((e) => c.includes(e))).sort((a, b) => a.length - b.length)[0]
    const Ac = names.filter((n) => !Aset.includes(n)), clAc = closeds.filter((c) => Ac.every((e) => c.includes(e))).sort((a, b) => a.length - b.length)[0], boundary = closure.filter((e) => clAc.includes(e))
    expect(interior).toEqual(['a']); expect(closure.slice().sort()).toEqual(['a', 'c', 'd']); expect(boundary.sort()).toEqual(['c', 'd'])
    const colored = (p: number, color: string, r?: number) => names.filter((n) => dots(s, color).some((d) => dist(d.position!, M.tpoDot(p, n)) < 0.02 && (r === undefined || d.radius === r))).sort()
    expect(colored(0, BLUE)).toEqual([...A].sort()); expect(colored(1, GREEN)).toEqual(interior); expect(colored(2, VIOLET)).toEqual(closure.slice().sort()); expect(colored(2, RED, 0.22)).toEqual(boundary.sort())
    expect(M.partitionOps(M.TPO.blocks, A)).toEqual({ interior: ['a'], closure: ['a', 'c', 'd'], boundary: ['c', 'd'] })
  })

  it('Homeomorphism: each red line is the radial map h from a circle point to the square, g(h(p)) = p, the images are distinct points of the square, and the circle minus a point is one piece while the figure eight minus its crossing is two', () => {
    const s = M.buildHomeomorphismScene(), { c, Rc, Rs, nRays, lower } = M.HMO
    const circ = pathsOf(s, GREEN, 40).find((p) => dist(p.points![0], [c[0] + Rc, c[1]]) < 0.02)!; circ.points!.forEach((q) => expect(dist(q, c as number[])).toBeCloseTo(Rc, 1))
    const sqLines = bonds(s, BLUE, 0.05); expect(sqLines).toHaveLength(4); sqLines.forEach((o) => [o.from!, o.to!].forEach((q) => { expect(Math.abs(q[0] - c[0])).toBeCloseTo(Rs, 1); expect(Math.abs(q[1] - c[1])).toBeCloseTo(Rs, 1) }))
    const rays = bonds(s, RED, 0.035); expect(rays).toHaveLength(nRays)
    const imgs = rays.map((o) => { const p = [o.from![0] - c[0], o.from![1] - c[1]], q = [o.to![0] - c[0], o.to![1] - c[1]]
      expect(Math.hypot(...p)).toBeCloseTo(Rc, 1); expect(Math.max(Math.abs(q[0]), Math.abs(q[1]))).toBeCloseTo(Rs, 1); expect(crossz(p, q)).toBeCloseTo(0, 1)                // on the circle, on the square, on one ray
      const scale = Rs / Math.max(Math.abs(p[0]), Math.abs(p[1])); expect(q[0]).toBeCloseTo(p[0] * scale, 1); expect(q[1]).toBeCloseTo(p[1] * scale, 1)                  // h(p) = p · Rs/‖p‖∞
      const back = M.hmoG([q[0], q[1]]); expect(back[0]).toBeCloseTo(p[0], 1); expect(back[1]).toBeCloseTo(p[1], 1)                                                    // g(h(p)) = p
      return q })
    for (let i = 0; i < imgs.length; i++) for (let j = i + 1; j < imgs.length; j++) expect(dist(imgs[i], imgs[j])).toBeGreaterThan(0.5)                                // injective
    const lowerPaths = paths(s).filter((p) => p.points![0][1] < -1 && p.points!.length >= 40)
    const joined = (p: Obj) => p.points!.every((q, i) => i === 0 || dist(q, p.points![i - 1]) < 0.2)
    const circle = lowerPaths.filter((p) => p.points![0][0] < 0), eight = lowerPaths.filter((p) => p.points![0][0] > 0)
    expect(circle).toHaveLength(1); expect(eight).toHaveLength(2); [...circle, ...eight].forEach((p) => expect(joined(p)).toBe(true))                                  // pieces = connected arcs
    const gapPt = [lower.circ[0], lower.circ[1] + lower.rc]; const e = circle[0].points!; expect(dist(e[0], gapPt)).toBeLessThan(0.3); expect(dist(e[e.length - 1], gapPt)).toBeLessThan(0.3); expect(dist(e[0], e[e.length - 1])).toBeGreaterThan(0.1)
    const touch = [(lower.eight[0][0] + lower.eight[1][0]) / 2, lower.eight[0][1]]; eight.forEach((p) => { expect(dist(p.points![0], touch)).toBeLessThan(0.3); expect(dist(p.points![0], p.points![p.points!.length - 1])).toBeGreaterThan(0.1) })
    expect(eight.map((p) => p.color).sort()).toEqual([BLUE, RED].sort())
    expect(texts(s)).toEqual(expect.arrayContaining(['circle ≅ square', '1 piece', '2 pieces', 'not homeomorphic']))
  })

  it('Quotient spaces: the interval has two red end dots and the circle one; the square’s opposite sides carry arrows in the same direction (torus); the disc boundary is the red circle and the sphere has one red dot', () => {
    const s = M.buildQuotientSpaceScene(), { cx, ySrc, yDst, half } = M.QSP
    const reds = dots(s, RED); const end = reds.filter((d) => d.radius === 0.11); expect(end).toHaveLength(3)
    expect(end.filter((d) => near(d.position![1], ySrc, 0.01)).map((d) => d.position![0]).sort((a, b) => a - b)).toEqual([cx[0] - 0.6, cx[0] + 0.6].map((v) => expect.closeTo(v, 2)))
    expect(end.filter((d) => near(d.position![1], yDst + 0.7, 0.01))).toHaveLength(1)                                                                // one point where the ends met
    const circle = pathsOf(s, GREEN, 40).find((p) => p.points![0][0] < -2)!; circle.points!.forEach((q) => expect(dist(q, [cx[0], yDst])).toBeCloseTo(0.7, 1))
    const blue = arrows(s, BLUE), red = arrows(s, RED).filter((a) => a.from![0] > -1.5 && a.from![0] < 1.5)
    expect(blue).toHaveLength(2); expect(red).toHaveLength(2)
    blue.forEach((a) => { expect(a.to![0]).toBeCloseTo(a.from![0], 6); expect(a.to![1]).toBeGreaterThan(a.from![1]) }); expect(blue.map((a) => a.from![0]).sort((a, b) => a - b)).toEqual([cx[1] - half, cx[1] + half].map((v) => expect.closeTo(v, 2)))
    red.forEach((a) => { expect(a.to![1]).toBeCloseTo(a.from![1], 6); expect(a.to![0]).toBeGreaterThan(a.from![0]) }); expect(red.map((a) => a.from![1]).sort((a, b) => a - b)).toEqual([ySrc - half, ySrc + half].map((v) => expect.closeTo(v, 2)))
    const disc = pathsOf(s, RED, 40).find((p) => p.points![0][0] > 2)!; disc.points!.forEach((q) => expect(dist(q, [cx[2], ySrc])).toBeCloseTo(half, 1))
    const sph = pathsOf(s, GREEN, 40).find((p) => p.points![0][0] > 2)!; sph.points!.forEach((q) => expect(dist(q, [cx[2], yDst])).toBeCloseTo(half, 1))
    const pt = reds.filter((d) => d.radius === 0.13); expect(pt).toHaveLength(1); expect(pt[0].position![1]).toBeCloseTo(yDst - half, 2)
    expect(texts(s)).toEqual(expect.arrayContaining(['circle', 'torus', 'sphere', 'ends glued', 'sides glued', 'edge pinched']))
  })

  it('Homotopy: each drawn green path is (1 − t) f + t g for t = ¼, ½, ¾ and stays off the hole; f and g bound a region without the hole (winding 0) but f against k winds once round it', () => {
    const s = M.buildHomotopyScene(), { A, B, hole, holeR } = M.HMT
    const f = pathsOf(s, BLUE, 40)[0].points!, g = pathsOf(s, RED, 40)[0].points!, k = pathsOf(s, VIOLET, 40)[0].points!, H = pathsOf(s, GREEN, 40)
    ;[f, g, k].forEach((p) => { expect(dist(p[0], A as number[])).toBeLessThan(0.02); expect(dist(p[p.length - 1], B as number[])).toBeLessThan(0.02) })
    expect(H).toHaveLength(3)
    const ts = H.map((h) => { const i = 30, d = [f[i][0] - g[i][0], f[i][1] - g[i][1]], t = ((f[i][0] - h.points![i][0]) * d[0] + (f[i][1] - h.points![i][1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]); h.points!.forEach((q, j) => { expect(Math.abs(q[0] - ((1 - t) * f[j][0] + t * g[j][0]))).toBeLessThan(0.02); expect(Math.abs(q[1] - ((1 - t) * f[j][1] + t * g[j][1]))).toBeLessThan(0.02) }); return t }).sort((a, b) => a - b)
    expect(ts).toEqual([0.25, 0.5, 0.75].map((v) => expect.closeTo(v, 2)))
    for (let step = 0; step <= 20; step++) { const t = step / 20; f.forEach((q, j) => expect(dist([(1 - t) * q[0] + t * g[j][0], (1 - t) * q[1] + t * g[j][1]], hole as number[])).toBeGreaterThan(holeR)) }      // the whole homotopy avoids the hole
    ;[...f, ...g, ...H.flatMap((h) => h.points!)].forEach((q) => expect(dist(q, hole as number[])).toBeGreaterThan(holeR))
    const loop = (a: number[][], b: number[][]) => [...a, ...b.slice().reverse()]
    expect(winding(loop(f, g), hole as number[])).toBeCloseTo(0, 1); expect(Math.abs(winding(loop(f, k), hole as number[]))).toBeCloseTo(1, 1)       // k is on the other side of the hole
    expect(texts(s)).toEqual(expect.arrayContaining(['H(s, t)', 'no homotopy f → k', 'hole']))
  })

  it('Fundamental group: the drawn loops have winding numbers +1, +2 and −1 round the hole, start and end at the base point inside the annulus, and the loops in the disc shrink (radii 0.9, 0.55, 0.2)', () => {
    const s = M.buildFundamentalGroupScene(), { centers, inner, outer, r0, shrink } = M.FGR
    const loopOf = (color: string, panel: number) => pathsOf(s, color, 40).find((p) => dist(p.points![0], [centers[panel][0] + r0, centers[panel][1]]) < 0.02)!.points!
    const L1 = loopOf(BLUE, 0), L2 = loopOf(GREEN, 1), L3 = loopOf(RED, 2)
    ;[[L1, 0, 1], [L2, 1, 2], [L3, 2, -1]].forEach(([L, panel, n]) => { const pts = L as number[][], c = centers[panel as number] as number[]
      expect(winding(pts, c)).toBeCloseTo(n as number, 1); expect(dist(pts[0], pts[pts.length - 1])).toBeLessThan(0.02)
      pts.forEach((q) => { expect(dist(q, c)).toBeGreaterThan(inner); expect(dist(q, c)).toBeLessThan(outer) }) })                                            // the loop lives in the annulus
    ;[0, 1, 2].forEach((p) => expect(dots(s, INK).some((d) => dist(d.position!, [centers[p][0] + r0, centers[p][1]]) < 0.02)).toBe(true))               // base point x₀
    const disc = pathsOf(s, VIOLET, 20).filter((p) => dist(p.points![0], centers[3] as number[]) < 1.0 && closed(p)).map((p) => fitCircle(p).r).sort((a, b) => b - a)
    expect(disc).toHaveLength(3); disc.forEach((r, i) => expect(r).toBeCloseTo(shrink[i], 1)); expect(disc[0]).toBeGreaterThan(disc[1]); expect(disc[1]).toBeGreaterThan(disc[2])
    expect(dots(s, VIOLET).some((d) => dist(d.position!, centers[3] as number[]) < 0.02)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['π₁(S¹) = ℤ', 'π₁(disc) = 0', 'x₀']))
    expect(labelsOf(s).map((o) => o.text)).toEqual(expect.arrayContaining(['1', '2', '−1', '0']))
  })

  it('Euler characteristic: the drawn cube and tetrahedron are planar (no crossing edges) with V − E + F = 8 − 12 + 6 = 2 and 4 − 6 + 4 = 2, and the surfaces have 0, 1, 2 holes giving χ = 2, 0, −2', () => {
    const s = M.buildEulerCharacteristicScene()
    const segs = bonds(s, SLATE, 0.04), dv = dots(s, INK).filter((d) => d.radius === 0.11).map((d) => d.position!)
    const side = (neg: boolean) => ({ V: dv.filter((p) => (p[0] < 0) === neg), E: segs.filter((o) => (o.from![0] < 0) === neg) })
    const crosses = (a: Obj, b: Obj) => { const shared = [a.from!, a.to!].some((p) => [b.from!, b.to!].some((q) => dist(p, q) < 0.01)); if (shared) return false; const d1 = crossz([a.to![0] - a.from![0], a.to![1] - a.from![1]], [b.from![0] - a.from![0], b.from![1] - a.from![1]]), d2 = crossz([a.to![0] - a.from![0], a.to![1] - a.from![1]], [b.to![0] - a.from![0], b.to![1] - a.from![1]]), d3 = crossz([b.to![0] - b.from![0], b.to![1] - b.from![1]], [a.from![0] - b.from![0], a.from![1] - b.from![1]]), d4 = crossz([b.to![0] - b.from![0], b.to![1] - b.from![1]], [a.to![0] - b.from![0], a.to![1] - b.from![1]]); return d1 * d2 < 0 && d3 * d4 < 0 }
    const results = [true, false].map((neg) => { const { V, E } = side(neg)
      for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) expect(crosses(E[i], E[j])).toBe(false)                                        // a planar drawing
      const idx = (p: number[]) => V.findIndex((q) => dist(p, q) < 0.01), edges = E.map((o) => [idx(o.from!), idx(o.to!)] as [number, number]); edges.forEach((e) => expect(e.every((v) => v >= 0)).toBe(true))
      expect(comps(V.map((_, i) => i), edges)).toBe(1)                                                                                                       // connected, so Euler's formula holds: F = E − V + 2
      const F = E.length - V.length + 2; return { V: V.length, E: E.length, F, text: `${V.length} − ${E.length} + ${F} = ${V.length - E.length + F}` } })
    expect(results.map((r) => [r.V, r.E, r.F])).toEqual([[8, 12, 6], [4, 6, 4]]); results.forEach((r) => expect(r.V - r.E + r.F).toBe(2))
    expect(texts(s)).toEqual(expect.arrayContaining(results.map((r) => r.text)))
    const holes = (x0: number, x1: number) => pathsOf(s, VIOLET, 8).filter((p) => closed(p) && p.points![0][0] > x0 && p.points![0][0] < x1).filter((p) => { const xs = p.points!.map((q) => q[0]); return (Math.max(...xs) - Math.min(...xs)) / 2 <= 0.51 }).length
    const g = [holes(-4.6, -1.5), holes(-1.6, 1.6), holes(1.6, 4.9)]; expect(g).toEqual([0, 1, 2])
    expect(g.map((n) => `χ: ${2 - 2 * n}`.replace('-', '−'))).toEqual(['χ: 2', 'χ: 0', 'χ: −2'])
    expect(texts(s)).toEqual(expect.arrayContaining(['χ: 2', 'χ: 0', 'χ: −2']))
  })
})
const comps = (vs: number[], es: ReadonlyArray<readonly [number, number]>) => { const p = new Map(vs.map((v) => [v, v])); const f = (x: number): number => (p.get(x) === x ? x : (p.set(x, f(p.get(x)!)), p.get(x)!)); for (const [a, b] of es) p.set(f(a), f(b)); return new Set(vs.map(f)).size }
