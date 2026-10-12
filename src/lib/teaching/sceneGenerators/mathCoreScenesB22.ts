/**
 * Core mathematics figures — batch 22 of the mathematics visual campaign (2026-10-12): complex
 * analysis (the complex plane, line integrals, Cauchy's theorem, the residue theorem, real integrals
 * by residues, Möbius maps, the Riemann surface of log z) and the first six topology figures (open
 * and closed sets, homeomorphism, quotient spaces, homotopy, the fundamental group, the Euler
 * characteristic).
 *
 * Same rules as batches 1-21: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5,
 * at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a
 * label left to right and compares labels that share a last token before "="), and every number drawn
 * comes from the constants and pure helpers exported here, which the test file re-derives from the
 * DRAWN coordinates (contour integrals are summed along the drawn curves, winding numbers are counted
 * from the drawn loops, the finite topology is rebuilt from the drawn blocks). A label is about 0.26
 * screen units wide per character: keep neighbouring captions short.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, shadeConvex, arcPts, type V3 } from './mathSceneKit'
import { oblique, type Obl } from './mathCoreScenesB20'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 40): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const ellipseAt = (c: Pt, rx: number, ry: number, color: string, n = 60): SceneObject => curve(Array.from({ length: n + 1 }, (_, i) => { const a = (2 * Math.PI * i) / n; return P(c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)) }), color)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const DEG = Math.PI / 180

// ── 1. The complex plane ─────────────────────────────────────────────────────

/** z = 3 + 4i on a plane with the origin at c and u screen units per unit: |z| = 5, arg z = 53.13°, conjugate 3 − 4i, z z̄ = 25 = |z|². */
export const CNA = { c: [-1.0, 0] as Pt, u: 0.95, z: [3, 4] as Pt, arcR: 1.2 }
export const cnaAt = (re: number, im: number): Pt => [CNA.c[0] + CNA.u * re, CNA.c[1] + CNA.u * im]

/** KG: ℂ = {x + iy}, |z| = √(x² + y²), arg z, polar form z = re^{iθ}, conjugate z̄ = x − iy, |z|² = z z̄. */
export function buildComplexNumbersAnalysisScene(): SceneSpec {
  return framed(raw_buildComplexNumbersAnalysisScene())
}
function raw_buildComplexNumbersAnalysisScene(): SceneSpec {
  const { c, z, arcR } = CNA
  const at = cnaAt, zp = at(z[0], z[1]), r = Math.hypot(z[0], z[1]), th = Math.atan2(z[1], z[0]) / DEG
  return {
    id: 'math-complex-numbers-analysis',
    title: 'The complex plane: modulus, argument, conjugate',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show z = 3 + 4i as the point (3, 4) of the complex plane (real part along the horizontal axis, imaginary part along the vertical one). Its modulus is the length of the arrow, |z| = √(3² + 4²) = 5, and its argument is the angle θ ≈ 53° from the positive real axis, so in polar form z = re^{iθ}. Its conjugate z̄ = 3 − 4i is the mirror image in the real axis, and z z̄ = 3² + 4² = 25 = |z|².',
    ariaLabel:
      'A complex plane with a horizontal real axis and a vertical imaginary axis. A blue arrow runs from the origin to the point 3 plus 4i, with violet guide lines down to 3 on the real axis and across to 4 on the imaginary axis. In the second step a green arc marks the angle theta of about 53 degrees from the real axis, and captions give the modulus 5 and the polar form. In the third step a red arrow runs to the mirror point 3 minus 4i below the real axis, the conjugate, with captions z times z-bar equals 25 and the modulus squared equals 25.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A complex number z = x + iy is a point (x, y) of the plane: real part x along the horizontal axis, imaginary part y along the vertical one. Here z = 3 + 4i is the point (3, 4).', objects: [arrow(P(-4.3, 0), P(4.4, 0), ROLE.reference), arrow(P(c[0], -4.6), P(c[0], 4.6), ROLE.reference), ln(at(z[0], 0), zp, ROLE.aid, 0.02), ln(at(0, z[1]), zp, ROLE.aid, 0.02), arrow(P(c[0], c[1]), P(zp[0], zp[1]), ROLE.output), dt(zp, ROLE.ink, 0.14), lb('3', [at(z[0], 0)[0], -0.45]), lb('4', [c[0] - 0.4, at(0, z[1])[1]]), lb('Re', [4.2, 0.45]), lb('Im', [c[0] + 0.5, 4.5]), lb('z = 3 + 4i', [3.2, 4.3], ROLE.output)] },
      { narration: 'The modulus |z| = √(3² + 4²) = 5 is the length of the arrow, and the argument θ ≈ 53° is its angle from the positive real axis. Together they give the polar form z = re^{iθ} = 5e^{iθ}.', objects: [curve(arcPts(c[0], c[1], arcR, 0, th, 16), ROLE.result), lb('θ', [c[0] + 1.6 * Math.cos((th / 2) * DEG), c[1] + 1.6 * Math.sin((th / 2) * DEG)], ROLE.result), lb('|z| = 5', [3.3, 1.9], ROLE.output), lb('polar: re^(iθ)', [2.8, -1.1], ROLE.result)] },
      { narration: 'The conjugate z̄ = 3 − 4i is the reflection of z in the real axis. Multiplying gives z z̄ = (3 + 4i)(3 − 4i) = 9 + 16 = 25, a real number equal to |z|².', objects: [arrow(P(c[0], c[1]), P(at(z[0], -z[1])[0], at(z[0], -z[1])[1]), ROLE.input), dt(at(z[0], -z[1]), ROLE.input, 0.14), lb('z̄ = 3 − 4i', [3.2, -4.3], ROLE.input), lb('z z̄ = 25', [-2.9, 3.4], ROLE.result), lb('|z|² = 25', [-2.9, 2.6], ROLE.result)] },
    ],
  }
}
export const cnaModulus = () => Math.hypot(CNA.z[0], CNA.z[1])
export const cnaArg = () => (Math.atan2(CNA.z[1], CNA.z[0]) * 180) / Math.PI

// ── 2. Complex line integral ─────────────────────────────────────────────────

/** ∫_C dz/z over the upper unit semicircle γ(t) = e^{it}, 0 ≤ t ≤ π: the integrand f(γ)γ′ = e^{−it} · i e^{it} = i is constant, so the integral is iπ; |iπ| = π = max|f| · length. */
export const CIN = { c: [0, 0.6] as Pt, R: 2.2, axis: { y: -2.4, x0: -2.5, w: 5.0 }, ts: [0, 1, 2, 3, 4].map((k) => (k * Math.PI) / 4) as readonly number[], tangentAt: [Math.PI / 4, (3 * Math.PI) / 4] as readonly number[] }
export const cinGamma = (t: number): Pt => [CIN.c[0] + CIN.R * Math.cos(t), CIN.c[1] + CIN.R * Math.sin(t)]

/** KG: ∫_C f dz = ∫ f(γ(t))γ′(t) dt, linearity, reversal, estimation lemma |∫_C f dz| ≤ max|f| · length(C). */
export function buildComplexIntegrationScene(): SceneSpec {
  return framed(raw_buildComplexIntegrationScene())
}
function raw_buildComplexIntegrationScene(): SceneSpec {
  const { c, R, axis, ts, tangentAt } = CIN
  const tx = (t: number) => axis.x0 + (t / Math.PI) * axis.w
  return {
    id: 'math-complex-integration',
    title: 'Complex line integral: ∫ f(γ(t)) γ′(t) dt',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a complex line integral is computed. Take C = the upper unit semicircle γ(t) = e^{it} from 1 to −1 and f(z) = 1/z. The tangent vector is γ′(t) = i e^{it} and f(γ(t)) = e^{−it}, so the integrand f(γ(t)) γ′(t) = i is the same arrow at every t, and ∫_C dz/z = ∫₀^π i dt = iπ. The estimation lemma is sharp here: |∫| = π = max|f| · length(C) = 1 · π.',
    ariaLabel:
      'A blue upper semicircle of radius about two, running counter-clockwise from the point 1 on the right to the point minus 1 on the left, labelled C. In the second step two short red arrows at 45 and 135 degrees point along the curve in the direction of travel, labelled gamma prime, and below the semicircle a horizontal axis from 0 to pi carries five identical blue arrows pointing straight up, captioned f of gamma times gamma prime equals i. In the third step the captions give the integral of dz over z equals i pi, and the absolute value pi is at most 1 times pi.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The curve C is the upper unit semicircle γ(t) = e^{it}, t from 0 to π, running from 1 to −1. We integrate f(z) = 1/z along it.', objects: [curve(arcPts(c[0], c[1], R, 0, 180, 60), ROLE.output), dt(cinGamma(0), ROLE.ink, 0.12), dt(cinGamma(Math.PI), ROLE.ink, 0.12), lb('1', [c[0] + R + 0.45, c[1]]), lb('−1', [c[0] - R - 0.5, c[1]]), lb('C', [c[0], c[1] + R + 0.5], ROLE.output)] },
      { narration: 'The tangent is γ′(t) = i e^{it} (red, along the direction of travel) and f(γ(t)) = 1/e^{it} = e^{−it}. Their product f(γ(t)) γ′(t) = e^{−it} · i e^{it} = i is the SAME number for every t — five samples (blue arrows) over t from 0 to π.', objects: [...tangentAt.map((t) => { const p = cinGamma(t); return arrow(P(p[0], p[1]), P(p[0] - 0.7 * Math.sin(t), p[1] + 0.7 * Math.cos(t)), ROLE.input) }), lb('γ′', [cinGamma(Math.PI / 4)[0] + 0.75, cinGamma(Math.PI / 4)[1] + 0.35], ROLE.input), ln([axis.x0, axis.y], [axis.x0 + axis.w, axis.y], ROLE.reference, 0.03), ...ts.map((t) => arrow(P(tx(t), axis.y), P(tx(t), axis.y + 1.0), ROLE.output)), lb('0', [axis.x0, axis.y - 0.45]), lb('π', [axis.x0 + axis.w, axis.y - 0.45]), lb('f(γ)γ′ = i', [0, axis.y - 0.95], ROLE.output)] },
      { narration: 'So ∫_C dz/z = ∫₀^π i dt = iπ. The estimation lemma |∫_C f dz| ≤ max|f| · length(C) is exact here: |iπ| = π, and max|1/z| = 1 on the circle, length π.', objects: [lb('∫ dz/z = iπ', [0, c[1] - 0.7], ROLE.result), lb('|∫| = π ≤ 1 · π', [0, c[1] - 1.45], ROLE.aid)] },
    ],
  }
}

// ── 3. Cauchy's theorem ──────────────────────────────────────────────────────

/** Left: a simply connected domain D (an ellipse) with a closed curve C and two paths A → B: all integrals of a holomorphic f vanish / agree. Right: the same domain with a hole at z₀: ∮ dz/(z − z₀) = 2πi around it. */
export const CAUT = {
  dl: { c: [-2.4, 1.0] as Pt, rx: 2.2, ry: 1.7 }, dr: { c: [2.4, 1.0] as Pt, rx: 2.2, ry: 1.7 },
  loopL: { c: [-2.4, 1.5] as Pt, rx: 0.9, ry: 0.6 }, hole: [2.4, 1.0] as Pt, loopR: { c: [2.4, 1.0] as Pt, r: 1.0 },
  A: [-3.9, 0.3] as Pt, B: [-0.9, 0.3] as Pt, bow: -0.55,
}
/** The straight path A → B (s in [0, 1]) and the bowed one. */
export const cautPath = (s: number, bow: number): Pt => [CAUT.A[0] + s * (CAUT.B[0] - CAUT.A[0]), CAUT.A[1] + s * (CAUT.B[1] - CAUT.A[1]) + bow * Math.sin(Math.PI * s)]

/** KG: f holomorphic on a simply connected domain ⟹ ∮_C f dz = 0 for every closed curve, equivalently path-independence. */
export function buildCauchyTheoremScene(): SceneSpec {
  return framed(raw_buildCauchyTheoremScene())
}
function raw_buildCauchyTheoremScene(): SceneSpec {
  const { dl, dr, loopL, hole, loopR, A, B, bow } = CAUT
  const domain = (d: { c: Pt; rx: number; ry: number }): SceneObject[] => [ellipseAt(d.c, d.rx, d.ry, ROLE.reference, 72), ...shadeConvex(Array.from({ length: 40 }, (_, i) => [d.c[0] + d.rx * 0.97 * Math.cos((2 * Math.PI * i) / 40), d.c[1] + d.ry * 0.97 * Math.sin((2 * Math.PI * i) / 40)] as [number, number]), 0.32, ROLE.aid, 0.015)]
  const path = (bw: number, color: string): SceneObject => curve(Array.from({ length: 41 }, (_, i) => { const p = cautPath(i / 40, bw); return P(p[0], p[1]) }), color)
  return {
    id: 'math-cauchy-theorem',
    title: "Cauchy's theorem",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show Cauchy's theorem: if f is holomorphic on a simply connected domain D (no holes), then ∮_C f dz = 0 for EVERY closed curve C in D, equivalently ∫ from A to B is the same along every path. A hole breaks this: with a puncture at z₀ and f(z) = 1/(z − z₀), the loop around it gives 2πi, not 0 — the curve cannot be shrunk to a point inside the domain.",
    ariaLabel:
      'Left: a hatched oval domain with no holes; a green closed curve inside it is labelled integral around the loop equals 0. Right: a similar hatched oval with a red puncture at its centre and a red circle drawn around the puncture, labelled integral equals 2 pi i. In the third step two paths join the points A and B inside the left domain, a straight blue one and a bowed red one, captioned same integral.',
    stage: NO_STAGE,
    steps: [
      { narration: 'D has no holes (it is simply connected) and f is holomorphic on it. Then the integral round ANY closed curve C inside D is 0: ∮_C f dz = 0. (Think of C shrinking to a point inside D without leaving it.)', objects: [...domain(dl), ellipseAt(loopL.c, loopL.rx, loopL.ry, ROLE.result, 72), arrow(P(loopL.c[0] - 0.15, loopL.c[1] + loopL.ry), P(loopL.c[0] + 0.15, loopL.c[1] + loopL.ry), ROLE.result), lb('no holes', [dl.c[0], dl.c[1] + dl.ry + 0.5]), lb('∮ = 0', [dl.c[0], dl.c[1] - dl.ry - 0.6], ROLE.result)] },
      { narration: 'Puncture the domain at z₀ (red) and take f(z) = 1/(z − z₀), which is not holomorphic there. The circle round the hole now gives ∮ dz/(z − z₀) = 2πi ≠ 0: the loop cannot be contracted inside the domain, so Cauchy\'s theorem does not apply.', objects: [...domain(dr), dt(hole, ROLE.input, 0.2), lb('z₀', [hole[0] + 0.45, hole[1] + 0.35], ROLE.input), ringAt(loopR.c, loopR.r, ROLE.input, 72), arrow(P(loopR.c[0] + 0.15, loopR.c[1] + loopR.r), P(loopR.c[0] - 0.15, loopR.c[1] + loopR.r), ROLE.input), lb('one hole', [dr.c[0], dr.c[1] + dr.ry + 0.5]), lb('∮ = 2πi', [dr.c[0], dr.c[1] - dr.ry - 0.6], ROLE.input)] },
      { narration: 'Path independence is the same fact: two paths from A to B inside the simply connected D (blue straight, red bowed) together make a closed curve, so their integrals differ by 0 — the integral of a holomorphic f depends only on the endpoints.', objects: [dt(A, ROLE.ink, 0.12), dt(B, ROLE.ink, 0.12), lb('A', [A[0] - 0.4, A[1]]), lb('B', [B[0] + 0.4, B[1]]), path(0, ROLE.output), path(bow, ROLE.input), lb('same ∫', [dl.c[0], A[1] - 1.55], ROLE.ink)] },
    ],
  }
}

// ── 4. Residue theorem ───────────────────────────────────────────────────────

/** f(z) = 1/z + 1/(z + 1) + 1/(z − 3): poles 0, −1, 3 with residue 1 each; the circle |z + ½| = 1.5 encloses 0 and −1 only, so ∮ f dz = 2πi(1 + 1) = 4πi. */
export const RES = { o: [-1.0, 0.3] as Pt, u: 1.1, poles: [0, -1, 3] as readonly number[], cc: -0.5, cr: 1.5 }
export const resAt = (re: number, im = 0): Pt => [RES.o[0] + RES.u * re, RES.o[1] + RES.u * im]
export const resF = (re: number, im: number): [number, number] => { let a = 0, b = 0; for (const p of RES.poles) { const dr = re - p, d = dr * dr + im * im; a += dr / d; b += -im / d } return [a, b] }
export const resInside = (p: number) => Math.abs(p - RES.cc) < RES.cr

/** KG: ∮_C f dz = 2πi Σ Res(f, zₖ) over the poles inside C. */
export function buildResidueTheoremScene(): SceneSpec {
  return framed(raw_buildResidueTheoremScene())
}
function raw_buildResidueTheoremScene(): SceneSpec {
  const { o, u, poles, cc, cr } = RES
  const cross = (p: Pt, color: string): SceneObject[] => [ln([p[0] - 0.17, p[1] - 0.17], [p[0] + 0.17, p[1] + 0.17], color, 0.045), ln([p[0] - 0.17, p[1] + 0.17], [p[0] + 0.17, p[1] - 0.17], color, 0.045)]
  const centre = resAt(cc)
  return {
    id: 'math-residue-theorem',
    title: 'The residue theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show ∮_C f dz = 2πi Σ Res(f, zₖ) for f(z) = 1/z + 1/(z + 1) + 1/(z − 3): it has poles at 0, −1 and 3, each with residue 1. The circle C (centre −½, radius 1.5) encloses the poles 0 and −1 but not 3, so only those two residues count: ∮_C f dz = 2πi (1 + 1) = 4πi. The pole outside contributes nothing.',
    ariaLabel:
      'A horizontal real axis with three crosses marking poles, two close together on the left and one far to the right. A blue circle encloses the two left poles but not the right one. In the second step the two enclosed poles get red dots and the numeral 1 for their residue, and the pole outside is circled grey, labelled outside ignored. In the third step the captions give the integral of f around the circle equals 2 pi i times the sum of the residues, and 2 pi i times 1 plus 1 equals 4 pi i.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f has three poles on the real axis: z = 0, z = −1 and z = 3, each a simple pole with residue 1. The contour C is the circle of radius 1.5 centred at −½ (blue, counter-clockwise).', objects: [arrow(P(-4.6, o[1]), P(4.6, o[1]), ROLE.reference), ...poles.flatMap((p) => cross(resAt(p), ROLE.ink)), curve(arcPts(centre[0], centre[1], cr * u, 0, 360, 72), ROLE.output), arrow(P(centre[0] - 0.15, centre[1] + cr * u), P(centre[0] + 0.15, centre[1] + cr * u), ROLE.output), lb('C', [centre[0], centre[1] + cr * u + 0.45], ROLE.output), lb('Re', [4.4, o[1] + 0.45])] },
      { narration: 'Count only the poles INSIDE C: z = 0 and z = −1 (red), each with residue 1. The pole at z = 3 lies outside the circle, so it is ignored.', objects: [...poles.filter(resInside).flatMap((p) => [dt(resAt(p), ROLE.input, 0.2), lb('1', [resAt(p)[0], resAt(p)[1] + 0.55], ROLE.input)]), ringAt(resAt(3), 0.25, ROLE.reference, 24), lb('outside: ignored', [resAt(3)[0], resAt(3)[1] + 0.75], ROLE.reference)] },
      { narration: 'The residue theorem: ∮_C f dz = 2πi · (sum of the residues inside) = 2πi (1 + 1) = 4πi. It contains Cauchy\'s theorem (no poles inside gives 0) and the integral formula (one simple pole).', objects: [lb('∮ f dz = 2πi Σ Res', [centre[0], 3.0], ROLE.result), lb('2πi (1 + 1) = 4πi', [centre[0], -2.3], ROLE.result)] },
    ],
  }
}

// ── 5. Real integrals by residues ────────────────────────────────────────────

/** ∫_{−∞}^{∞} dx/(1 + x²) = π: close the real segment [−R, R] with the upper semicircle; only the pole i is inside, Res = 1/(2i), 2πi/(2i) = π; the arc contributes ≤ πR/(R² − 1) → 0. */
export const RIR = { o: [0, -1.4] as Pt, u: 1.2, R: 3 }
export const rirAt = (re: number, im: number): Pt => [RIR.o[0] + RIR.u * re, RIR.o[1] + RIR.u * im]
export const arcBound = (R: number) => (Math.PI * R) / (R * R - 1)

/** KG: ∫_{−∞}^{∞} f(x) dx by closing the contour in ℂ and applying the residue theorem (Jordan's lemma for exponential factors). */
export function buildRealIntegralResiduesScene(): SceneSpec {
  return framed(raw_buildRealIntegralResiduesScene())
}
function raw_buildRealIntegralResiduesScene(): SceneSpec {
  const { o, u, R } = RIR
  const cross = (p: Pt, color: string): SceneObject[] => [ln([p[0] - 0.17, p[1] - 0.17], [p[0] + 0.17, p[1] + 0.17], color, 0.045), ln([p[0] - 0.17, p[1] + 0.17], [p[0] + 0.17, p[1] - 0.17], color, 0.045)]
  return {
    id: 'math-real-integral-residues',
    title: 'A real integral by residues',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how ∫_{−∞}^{∞} dx/(1 + x²) is computed with residues. Integrate f(z) = 1/(1 + z²) along the real segment from −R to R (blue) and close the contour with the upper semicircle of radius R (green). The poles of f are ±i; only i lies inside, with residue 1/(2i), so the closed integral is 2πi · 1/(2i) = π. On the arc |f| ≤ 1/(R² − 1) and the length is πR, so the arc integral is at most πR/(R² − 1) → 0 as R → ∞, leaving ∫_{−∞}^{∞} dx/(1 + x²) = π.',
    ariaLabel:
      'A horizontal blue segment from minus R to R along the real axis with grey crosses at i above it and minus i below it, captioned 1 over 1 plus x squared. In the second step a green upper semicircle of radius R closes the segment into a contour; the cross at i turns into a red dot (inside) and the cross at minus i stays outside. In the third step the captions give the residue 1 over 2i, 2 pi i times 1 over 2i equals pi, and the arc tends to 0 as R grows.',
    stage: NO_STAGE,
    steps: [
      { narration: 'We want ∫ dx/(1 + x²) over the whole real line. Treat it as an integral of f(z) = 1/(1 + z²) along the real segment from −R to R (blue). The poles of f are z = i and z = −i (crosses).', objects: [ln(rirAt(-R, 0), rirAt(R, 0), ROLE.output, 0.07), ...cross(rirAt(0, 1), ROLE.reference), ...cross(rirAt(0, -1), ROLE.reference), lb('i', [rirAt(0, 1)[0] + 0.45, rirAt(0, 1)[1]]), lb('−i', [rirAt(0, -1)[0] + 0.5, rirAt(0, -1)[1]]), lb('−R', [rirAt(-R, 0)[0], o[1] - 0.45]), lb('R', [rirAt(R, 0)[0], o[1] - 0.45]), lb('1/(1 + x²)', [-3.0, -3.7], ROLE.output)] },
      { narration: 'Close the contour with the upper semicircle of radius R (green). Together they enclose exactly one pole, z = i (red); the pole at −i is outside the closed contour.', objects: [curve(arcPts(o[0], o[1], R * u, 0, 180, 60), ROLE.result), dt(rirAt(0, 1), ROLE.input, 0.2), lb('contour', [0, rirAt(0, R)[1] + 0.5], ROLE.result)] },
      { narration: 'Residue at i: 1/(1 + z²) = 1/((z − i)(z + i)), so Res = 1/(2i). The residue theorem gives the closed integral 2πi · 1/(2i) = π. On the arc |f| ≤ 1/(R² − 1) and its length is πR, so the arc integral is at most πR/(R² − 1) → 0: in the limit the real integral is π.', objects: [lb('Res = 1/(2i)', [2.6, 0.9], ROLE.input), lb('2πi · 1/(2i) = π', [1.9, -3.7], ROLE.result), lb('arc → 0 as R → ∞', [0, 3.4], ROLE.result)] },
    ],
  }
}

// ── 6. Möbius transformation ─────────────────────────────────────────────────

/** w = 1/z: the line Re z = 1 maps to the circle |w − ½| = ½, the circle |z| = 1.6 to the circle |w| = 0.625; the points 1, 1 + i, 1 − i go to 1, (1 − i)/2, (1 + i)/2. */
export const MOB = { z0: [-2.4, 0] as Pt, w0: [2.6, 0] as Pt, u: 1.5, line: 1, circ: 1.6, yMax: 1.4 }
export const mobZ = (re: number, im: number): Pt => [MOB.z0[0] + MOB.u * re, MOB.z0[1] + MOB.u * im]
export const mobW = (re: number, im: number): Pt => [MOB.w0[0] + MOB.u * re, MOB.w0[1] + MOB.u * im]
/** 1 / (x + iy) */
export const recip = (re: number, im: number): [number, number] => { const d = re * re + im * im; return [re / d, -im / d] }

/** KG: f(z) = (az + b)/(cz + d), ad − bc ≠ 0, maps circles and lines to circles and lines. */
export function buildMobiusTransformationScene(): SceneSpec {
  return framed(raw_buildMobiusTransformationScene())
}
function raw_buildMobiusTransformationScene(): SceneSpec {
  const { u, line: x1, circ, yMax } = MOB
  const marks: Array<[string, number, number]> = [['A', 1, 0], ['B', 1, 1], ['C', 1, -1]]
  const cross = (c: Pt, rx: number, ry: number): SceneObject[] => [ln([c[0] - rx, c[1]], [c[0] + rx, c[1]], ROLE.reference, 0.015), ln([c[0], c[1] - ry], [c[0], c[1] + ry], ROLE.reference, 0.015)]
  return {
    id: 'math-mobius-transformation',
    title: 'Möbius map w = 1/z: lines and circles to circles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a Möbius transformation maps circles and lines to circles and lines, with w = 1/z (a = 0, b = 1, c = 1, d = 0, ad − bc = −1 ≠ 0). In the z-plane the vertical line Re z = 1 (blue) and the circle |z| = 1.6 (red); in the w-plane their images are the circle through 0 with centre ½ and radius ½ (blue) and the circle |w| = 1/1.6 = 0.625 (red). The three points A = 1, B = 1 + i, C = 1 − i go to A′ = 1, B′ = (1 − i)/2, C′ = (1 + i)/2: three points determine the map.',
    ariaLabel:
      'Two copies of the complex plane side by side. Left, the z-plane: a vertical blue line at real part 1 and a red circle of radius 1.6 about the origin, with three green points A, B, C on the line at 1, 1 plus i and 1 minus i. Right, the w-plane: a blue circle of radius one half through the origin and the point 1, and a red circle of radius 0.625 about the origin, with the images A prime, B prime and C prime marked on the blue circle. Captions read w equals 1 over z, line to circle and circle to circle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The z-plane: the vertical line Re z = 1 (blue) and the circle |z| = 1.6 (red) about the origin. Mark three points on the line: A = 1, B = 1 + i, C = 1 − i.', objects: [...cross(MOB.z0, 2.6, 2.6), ln(mobZ(x1, -yMax), mobZ(x1, yMax), ROLE.output, 0.05), curve(arcPts(MOB.z0[0], MOB.z0[1], circ * u, 0, 360, 72), ROLE.input), ...marks.map(([, a, b]) => dt(mobZ(a, b), ROLE.result, 0.13)), ...marks.map(([n, a, b]) => lb(n, [mobZ(a, b)[0] + 0.4, mobZ(a, b)[1] + (b === 0 ? -0.35 : 0)], ROLE.result)), lb('z', [MOB.z0[0] - 2.5, 2.4])] },
      { narration: 'Apply w = 1/z. The line Re z = 1 goes to the circle with centre ½ and radius ½ (blue) — a LINE becomes a circle (through 0, the image of ∞). The circle |z| = 1.6 goes to the circle |w| = 0.625 (red). A, B, C land on the blue circle: A′ = 1, B′ = (1 − i)/2, C′ = (1 + i)/2.', objects: [...cross(MOB.w0, 1.5, 1.5), curve(arcPts(mobW(0.5, 0)[0], mobW(0.5, 0)[1], 0.5 * u, 0, 360, 48), ROLE.output), curve(arcPts(MOB.w0[0], MOB.w0[1], (1 / circ) * u, 0, 360, 48), ROLE.input), ...marks.map(([, a, b]) => { const w = recip(a, b); return dt(mobW(w[0], w[1]), ROLE.result, 0.13) }), ...marks.map(([n, a, b]) => { const w = recip(a, b); return lb(n + '′', [mobW(w[0], w[1])[0] + 0.5, mobW(w[0], w[1])[1] + (b === 0 ? -0.1 : b > 0 ? -0.1 : 0.1)], ROLE.result) }), lb('w', [MOB.w0[0] - 1.9, 2.4])] },
      { narration: 'Circles and lines go to circles and lines: a line is a circle through ∞. Since a Möbius map has three free parameters (a, b, c, d up to a common factor), three points and their images fix it completely.', objects: [lb('w = 1/z', [0, 3.5], ROLE.ink), lb('line → circle', [2.6, -3.2], ROLE.output), lb('circle → circle', [2.6, -3.9], ROLE.input)] },
    ],
  }
}

// ── 7. Riemann surface of log z ──────────────────────────────────────────────

/** The helicoid over ℂ∖{0}: (cos θ, sin θ) at height θ/2π, three turns; the points θ = 0, 2π, 4π all lie over z = 1. */
export const RSF: Obl & { turns: number; rib: number } = { ox: 0.0, oy: -3.4, ux: 1.6, uz: 1.75, dxy: 0.8, dyy: 0.55, turns: 3, rib: 1.25 }
export const helixPoint = (theta: number): [number, number, number] => [Math.cos(theta), Math.sin(theta), theta / (2 * Math.PI)]

/** KG: the natural domain of multivalued log z and √z; for log z an infinite-sheeted helical cover of ℂ∖{0}. */
export function buildRiemannSurfaceScene(): SceneSpec {
  return framed(raw_buildRiemannSurfaceScene())
}
function raw_buildRiemannSurfaceScene(): SceneSpec {
  const o = RSF, proj = oblique(o), N = 120
  const ribs: SceneObject[] = Array.from({ length: 4 * o.turns + 1 }, (_, k) => { const th = (k * Math.PI) / 2, h = th / (2 * Math.PI), a = proj([0, 0, h]), b = proj([o.rib * Math.cos(th), o.rib * Math.sin(th), h]); return line(a, b, ROLE.reference, 0.02) })
  return {
    id: 'math-riemann-surface',
    title: 'Riemann surface of log z: a helical staircase',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Riemann surface of log z as a spiral staircase over the punctured plane: going once round the origin (θ → θ + 2π) does not bring you back to the same point of the surface but one level up, because log z changes by 2πi. Each level (sheet) lies over the whole plane ℂ∖{0}; the three red points at heights 0, 1, 2 lie over the same z = 1 but on different sheets, which is why log z is multivalued on ℂ but single-valued on this surface.',
    ariaLabel:
      'A blue spiral winding three times round a vertical axis, rising from a flat grey unit circle at the bottom. In the second step grey radial lines are drawn from the axis at every quarter turn, forming a spiral ramp. In the third step a violet vertical line passes through three red dots, at the start of the first, second and third turns, all lying above the same point of the base circle; they are numbered 1, 2 and 3 and captioned same z.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Plot the point z = e^{iθ} at height θ/(2π). As θ grows the point circles the origin and climbs: a helix (blue) over the unit circle (grey) — three turns shown, but it goes on forever, upward and downward.', objects: [curve(Array.from({ length: 73 }, (_, i) => proj([Math.cos((2 * Math.PI * i) / 72), Math.sin((2 * Math.PI * i) / 72), 0])), ROLE.reference), arrow(proj([0, 0, 0]), proj([0, 0, o.turns + 0.35]), ROLE.reference), curve(Array.from({ length: N + 1 }, (_, i) => proj(helixPoint((2 * Math.PI * o.turns * i) / N))), ROLE.output), lb('log z', [1.9, 1.0], ROLE.output)] },
      { narration: 'Fill in radial lines at every quarter turn: the surface is a spiral ramp (a helicoid). Each full level lies over the entire punctured plane ℂ∖{0}; the origin itself is missing, the axis is the hole.', objects: ribs },
      { narration: 'Walk once round the origin along the ramp and you arrive one level higher, over the SAME point z = 1: the three red points (θ = 0, 2π, 4π) are different points of the surface lying above one z. log z takes different values on them (0, 2πi, 4πi), so on the surface it is a genuine single-valued function.', objects: [line(proj([1, 0, -0.2]), proj([1, 0, o.turns - 0.5]), ROLE.aid, 0.03), ...[0, 1, 2].map((k) => dot(proj([1, 0, k]), ROLE.input, 0.13)), ...[0, 1, 2].map((k) => lb(String(k + 1), [proj([1, 0, k])[0] + 0.45, proj([1, 0, k])[1]], ROLE.input)), lb('same z', [proj([1, 0, 2.2])[0] + 1.2, proj([1, 0, 2.2])[1]], ROLE.aid)] },
    ],
  }
}

// ── 8. Open and closed sets (topology) ───────────────────────────────────────

/** X = {a, b, c, d} with the partition topology generated by the blocks {a}, {b}, {c, d}; A = {a, c}: int A = {a}, cl A = {a, c, d}, ∂A = {c, d}. */
export const TPO = { x: -1.4, ys: [3.0, 0.3, -2.4] as readonly number[], cap: 2.9, A: ['a', 'c'] as readonly string[], blocks: [['a'], ['b'], ['c', 'd']] as ReadonlyArray<readonly string[]> }
export const tpoDot = (panel: number, name: string): Pt => { const x = TPO.x, y = TPO.ys[panel]; return name === 'a' ? [x - 1.0, y + 0.5] : name === 'b' ? [x - 1.0, y - 0.5] : name === 'c' ? [x + 0.8, y + 0.5] : [x + 0.8, y - 0.5] }
export const tpoBlockRect = (panel: number, block: readonly string[]): [Pt, Pt] => { const ps = block.map((n) => tpoDot(panel, n)), xs = ps.map((p) => p[0]), ys = ps.map((p) => p[1]); return [[Math.min(...xs) - 0.3, Math.min(...ys) - 0.3], [Math.max(...xs) + 0.3, Math.max(...ys) + 0.3]] }
/** Interior, closure and boundary in the partition topology (opens = closeds = unions of blocks). */
export function partitionOps(blocks: ReadonlyArray<readonly string[]>, A: readonly string[]) {
  const all = blocks.flat(), interior = blocks.filter((b) => b.every((x) => A.includes(x))).flat(), closure = blocks.filter((b) => b.some((x) => A.includes(x))).flat()
  const Ac = all.filter((x) => !A.includes(x)), clAc = blocks.filter((b) => b.some((x) => Ac.includes(x))).flat()
  return { interior: all.filter((x) => interior.includes(x)), closure: all.filter((x) => closure.includes(x)), boundary: all.filter((x) => closure.includes(x) && clAc.includes(x)) }
}

/** KG: open sets are the elements of τ; closed sets their complements; int A, cl A and ∂A = cl(A) ∩ cl(Aᶜ). */
export function buildTopologyOpenSetsScene(): SceneSpec {
  return framed(raw_buildTopologyOpenSetsScene())
}
function raw_buildTopologyOpenSetsScene(): SceneSpec {
  const { A, blocks, ys, cap } = TPO, names = ['a', 'b', 'c', 'd'], ops = partitionOps(blocks, A)
  const panel = (p: number, color: (n: string) => string): SceneObject[] => [
    ...blocks.flatMap((b) => { const [lo, hi] = tpoBlockRect(p, b); return [ln([lo[0], lo[1]], [hi[0], lo[1]], ROLE.reference, 0.03), ln([hi[0], lo[1]], [hi[0], hi[1]], ROLE.reference, 0.03), ln([hi[0], hi[1]], [lo[0], hi[1]], ROLE.reference, 0.03), ln([lo[0], hi[1]], [lo[0], lo[1]], ROLE.reference, 0.03)] }),
    ...names.map((n) => dt(tpoDot(p, n), color(n), 0.14)), ...names.map((n) => lb(n, [tpoDot(p, n)[0] + (n === 'a' || n === 'b' ? -0.5 : 0.5), tpoDot(p, n)[1]])),
  ]
  return {
    id: 'math-topology-open-sets',
    title: 'Open sets, closure, interior and boundary',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a topology on the four-point set X = {a, b, c, d} whose open sets are all unions of the blocks {a}, {b}, {c, d} (the boxes); the closed sets are the complements, which are again unions of blocks. For A = {a, c}: the interior int A is the largest open set inside A, which is {a} (the block {c, d} is not inside A); the closure cl A is the smallest closed set containing A, {a, c, d}; the boundary is ∂A = cl A ∩ cl(Aᶜ) = {a, c, d} ∩ {b, c, d} = {c, d}.',
    ariaLabel:
      'Three copies of a four-point space stacked in a column: points a and b in their own small boxes on the left, points c and d in one tall box on the right. Top: a and c are blue, forming the set A, captioned A equals a, c. Middle: only a is green, the interior of A. Bottom: a, c and d are violet, the closure of A, with c and d also marked red, the boundary.',
    stage: NO_STAGE,
    steps: [
      { narration: 'X = {a, b, c, d}; the open sets are the unions of the boxes {a}, {b}, {c, d} (and ∅). Take A = {a, c} (blue).', objects: [...panel(0, (n) => (A.includes(n) ? ROLE.output : ROLE.reference)), lb('A = {a, c}', [cap, ys[0]], ROLE.output)] },
      { narration: 'Interior: the largest OPEN set inside A. The box {a} lies inside A; the box {c, d} does not (d ∉ A), and a union of boxes inside A is just {a}. So int A = {a} (green).', objects: [...panel(1, (n) => (ops.interior.includes(n) ? ROLE.result : ROLE.reference)), lb('int A', [cap, ys[1]], ROLE.result)] },
      { narration: 'Closure: the smallest CLOSED set containing A; the closed sets are also unions of boxes, so it must contain the whole box {c, d}: cl A = {a, c, d} (violet). The boundary cl A ∩ cl(Aᶜ) = {a, c, d} ∩ {b, c, d} = {c, d} (red): the points where A and its complement meet.', objects: [...panel(2, (n) => (ops.closure.includes(n) ? ROLE.aid : ROLE.reference)), ...ops.boundary.map((n) => dt(tpoDot(2, n), ROLE.input, 0.22)), lb('cl A and ∂A', [cap, ys[2]], ROLE.aid)] },
    ],
  }
}

// ── 9. Homeomorphism ─────────────────────────────────────────────────────────

/** A circle of radius 1 and a square of half-side 1.6, both centred at c: h(p) = p scaled along its ray out to the square, g(q) its inverse. Below: a circle minus a point stays in one piece, a figure eight minus its crossing point falls into two. */
export const HMO = { c: [0, 2.0] as Pt, Rc: 1.0, Rs: 1.6, nRays: 8, lower: { circ: [-2.6, -2.3] as Pt, rc: 1.0, eight: [[1.9, -2.3], [3.3, -2.3]] as ReadonlyArray<Pt>, re: 0.7 } }
/** The square point on the ray through the circle point of angle θ. */
export const hmoH = (theta: number): Pt => { const c = Math.cos(theta), s = Math.sin(theta), m = Math.max(Math.abs(c), Math.abs(s)); return [HMO.Rs * c / m, HMO.Rs * s / m] }
/** The inverse: back to the unit circle. */
export const hmoG = (q: Pt): Pt => { const l = Math.hypot(q[0], q[1]); return [(HMO.Rc * q[0]) / l, (HMO.Rc * q[1]) / l] }

/** KG: a homeomorphism is a continuous bijection with continuous inverse; homeomorphic spaces share every topological property. */
export function buildHomeomorphismScene(): SceneSpec {
  return framed(raw_buildHomeomorphismScene())
}
function raw_buildHomeomorphismScene(): SceneSpec {
  const { c, Rc, Rs, nRays, lower } = HMO
  const rays = Array.from({ length: nRays }, (_, k) => (2 * Math.PI * k) / nRays)
  const sq: Pt[] = [[c[0] - Rs, c[1] - Rs], [c[0] + Rs, c[1] - Rs], [c[0] + Rs, c[1] + Rs], [c[0] - Rs, c[1] + Rs]]
  return {
    id: 'math-homeomorphism',
    title: 'Homeomorphism: a circle is a square; a circle is not a figure eight',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a homeomorphism: the map h that slides each point of the circle outward along its ray onto the square (and its inverse that slides it back) is a continuous bijection with a continuous inverse, so a circle and a square are the same topological space. A topological property tells two spaces apart: removing one point from a circle leaves ONE piece, but removing the crossing point from a figure eight leaves TWO, so a circle and a figure eight are not homeomorphic.',
    ariaLabel:
      'Top: a small green circle inside a larger blue square, both centred on the same point. In the second step eight short red lines run outward along the rays from points of the circle to the matching points of the square, labelled h. Below: on the left a green circle with a small gap and a red ring at the gap, captioned 1 piece; on the right a figure eight made of two touching loops, one blue and one red, with a red ring at the touching point, captioned 2 pieces; between them the caption not homeomorphic.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A circle (green) and a square (blue) are different shapes, but as topological spaces they are the same.', objects: [curve(arcPts(c[0], c[1], Rc, 0, 360, 48), ROLE.result), ...sq.map((p, i) => ln(p, sq[(i + 1) % 4], ROLE.output, 0.05)), lb('circle ≅ square', [0, 4.4], ROLE.ink)] },
      { narration: 'Slide every point of the circle outward along its ray until it hits the square: h (red). Each point of the square comes from exactly one point of the circle (a bijection), and sliding back, h⁻¹, is just as continuous — nothing is torn or glued. So h is a homeomorphism.', objects: [...rays.map((t) => ln([c[0] + Rc * Math.cos(t), c[1] + Rc * Math.sin(t)], [c[0] + hmoH(t)[0], c[1] + hmoH(t)[1]], ROLE.input, 0.035)), ...rays.map((t) => dt([c[0] + Rc * Math.cos(t), c[1] + Rc * Math.sin(t)], ROLE.result, 0.09)), ...rays.map((t) => dt([c[0] + hmoH(t)[0], c[1] + hmoH(t)[1]], ROLE.output, 0.09)), lb('h', [c[0] + 0.55, c[1] + 0.25], ROLE.input)] },
      { narration: 'Spaces are NOT homeomorphic if some topological property differs. Remove one point from a circle (green): it stays in one piece. Remove the crossing point from a figure eight: it falls apart into two pieces (blue, red). A homeomorphism would preserve the number of pieces, so circle ≇ figure eight.', objects: [curve(arcPts(lower.circ[0], lower.circ[1], lower.rc, 100, 440, 60), ROLE.result), ringAt([lower.circ[0], lower.circ[1] + lower.rc], 0.09, ROLE.input, 16), curve(arcPts(lower.eight[0][0], lower.eight[0][1], lower.re, 10, 350, 48), ROLE.output), curve(arcPts(lower.eight[1][0], lower.eight[1][1], lower.re, 190, 530, 48), ROLE.input), ringAt([(lower.eight[0][0] + lower.eight[1][0]) / 2, lower.eight[0][1]], 0.09, ROLE.ink, 16), lb('1 piece', [lower.circ[0], lower.circ[1] - 1.55], ROLE.result), lb('2 pieces', [(lower.eight[0][0] + lower.eight[1][0]) / 2, lower.eight[0][1] - 1.35], ROLE.input), lb('not homeomorphic', [0, -0.35], ROLE.ink)] },
    ],
  }
}

// ── 10. Quotient space ───────────────────────────────────────────────────────

/** Three gluing constructions: the interval [0, 1] with its ends identified is a circle; the square with opposite sides identified (same direction) is a torus; the disc with its boundary circle collapsed to a point is a sphere. */
export const QSP = { cx: [-3.3, 0, 3.3] as readonly number[], ySrc: 2.4, yDst: -0.3, half: 0.8 }

/** KG: the quotient topology; S¹ = [0, 1] with 0 ~ 1, the torus = a square with edges identified. */
export function buildQuotientSpaceScene(): SceneSpec {
  return framed(raw_buildQuotientSpaceScene())
}
function raw_buildQuotientSpaceScene(): SceneSpec {
  const { cx, ySrc, yDst, half } = QSP
  const down = (x: number): SceneObject => arrow(P(x, ySrc - 1.2), P(x, yDst + 1.2), ROLE.reference)
  const discPoly = Array.from({ length: 36 }, (_, i) => [cx[2] + half * 0.97 * Math.cos((2 * Math.PI * i) / 36), ySrc + half * 0.97 * Math.sin((2 * Math.PI * i) / 36)] as [number, number])
  return {
    id: 'math-quotient-space',
    title: 'Quotient spaces: gluing',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show three quotient spaces, each built by gluing. (1) The interval [0, 1] with the endpoints 0 and 1 identified (the two red dots become one) is a circle S¹. (2) A square with the left and right sides identified in the same direction (blue arrows) and the top and bottom sides identified in the same direction (red arrows) is a torus. (3) A disc with its whole boundary circle (red) collapsed to a single point is a sphere. The quotient topology is the finest topology that makes the gluing map continuous.',
    ariaLabel:
      'Three columns, each with a flat shape on top, a downward arrow, and the glued shape below. Left: a short horizontal segment with a red dot at each end becomes a green circle with one red dot. Middle: a square whose two vertical sides carry blue upward arrows and whose two horizontal sides carry red rightward arrows becomes a violet torus, a ring with a hole. Right: a hatched disc with a red boundary circle becomes a green sphere, a circle with a violet equator, with one red dot at the bottom where the boundary was squeezed to a point.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Glue the two ends of the interval [0, 1] together (the red dots 0 and 1 become one point): the interval closes up into a circle S¹.', objects: [ln([cx[0] - 0.6, ySrc], [cx[0] + 0.6, ySrc], ROLE.reference, 0.05), dt([cx[0] - 0.6, ySrc], ROLE.input, 0.11), dt([cx[0] + 0.6, ySrc], ROLE.input, 0.11), lb('0', [cx[0] - 0.6, ySrc + 0.45]), lb('1', [cx[0] + 0.6, ySrc + 0.45]), down(cx[0]), curve(arcPts(cx[0], yDst, 0.7, 0, 360, 48), ROLE.result), dt([cx[0], yDst + 0.7], ROLE.input, 0.11), lb('ends glued', [cx[0], 3.9]), lb('circle', [cx[0], yDst - 1.3], ROLE.result)] },
      { narration: 'Identify the left and right sides (blue arrows, same direction) and the top and bottom sides (red arrows, same direction) of a square. Gluing the blue pair makes a cylinder, then gluing the circle ends gives a torus — a ring with a hole.', objects: [...[[-1, -1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [-1, 1, -1, -1]].map(([x0, y0, x1, y1]) => ln([cx[1] + half * x0, ySrc + half * y0], [cx[1] + half * x1, ySrc + half * y1], ROLE.reference, 0.04)), arrow(P(cx[1] - half, ySrc - 0.4), P(cx[1] - half, ySrc + 0.4), ROLE.output), arrow(P(cx[1] + half, ySrc - 0.4), P(cx[1] + half, ySrc + 0.4), ROLE.output), arrow(P(cx[1] - 0.4, ySrc - half), P(cx[1] + 0.4, ySrc - half), ROLE.input), arrow(P(cx[1] - 0.4, ySrc + half), P(cx[1] + 0.4, ySrc + half), ROLE.input), down(cx[1]), ellipseAt([cx[1], yDst], 1.1, 0.75, ROLE.aid), ellipseAt([cx[1], yDst - 0.05], 0.45, 0.2, ROLE.aid, 40), lb('sides glued', [cx[1], 3.9]), lb('torus', [cx[1], yDst - 1.3], ROLE.aid)] },
      { narration: 'Collapse the entire boundary circle (red) of a disc to ONE point: the disc closes like a purse into a sphere. The red dot at the bottom is where the boundary went.', objects: [curve(arcPts(cx[2], ySrc, half, 0, 360, 48), ROLE.input), ...shadeConvex(discPoly, 0.3, ROLE.aid, 0.015), down(cx[2]), curve(arcPts(cx[2], yDst, half, 0, 360, 48), ROLE.result), ellipseAt([cx[2], yDst], half, 0.22, ROLE.aid, 40), dt([cx[2], yDst - half], ROLE.input, 0.13), lb('edge pinched', [cx[2], 3.9]), lb('sphere', [cx[2], yDst - 1.3], ROLE.result)] },
    ],
  }
}

// ── 11. Homotopy ─────────────────────────────────────────────────────────────

/** Two paths f, g from A to B above a hole, the straight-line homotopy H(s, t) = (1 − t) f(s) + t g(s) between them, and a path k that passes below the hole (not homotopic to f). */
export const HMT = { A: [-3.6, -0.7] as Pt, B: [3.6, -0.7] as Pt, hole: [0.0, 0.3] as Pt, holeR: 0.7, apex: { f: 3.3, g: 2.3, k: -2.2 }, ts: [0.25, 0.5, 0.75] as readonly number[] }
export const hmtPath = (apex: number, s: number): Pt => [HMT.A[0] + s * (HMT.B[0] - HMT.A[0]), HMT.A[1] + s * (HMT.B[1] - HMT.A[1]) + apex * Math.sin(Math.PI * s)]

/** KG: f ≃ g if some continuous H with H(x, 0) = f(x), H(x, 1) = g(x) exists (rel endpoints here). */
export function buildHomotopyScene(): SceneSpec {
  return framed(raw_buildHomotopyScene())
}
function raw_buildHomotopyScene(): SceneSpec {
  const { A, B, hole, holeR, apex, ts } = HMT
  const path = (a: number, color: string, n = 60): SceneObject => curve(Array.from({ length: n + 1 }, (_, i) => { const p = hmtPath(a, i / n); return P(p[0], p[1]) }), color)
  const holePoly = Array.from({ length: 36 }, (_, i) => [hole[0] + holeR * 0.95 * Math.cos((2 * Math.PI * i) / 36), hole[1] + holeR * 0.95 * Math.sin((2 * Math.PI * i) / 36)] as [number, number])
  return {
    id: 'math-homotopy',
    title: 'Homotopy: deforming one path into another',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a homotopy of paths in a plane with a hole. The paths f (blue) and g (red) both run from A to B above the hole; H(s, t) = (1 − t) f(s) + t g(s) slides f to g through the green intermediate paths t = ¼, ½, ¾ without ever touching the hole, so f and g are homotopic. The path k (violet) goes BELOW the hole: to deform f into k the path would have to cross the hole, which is not allowed, so k is not homotopic to f.',
    ariaLabel:
      'A hatched grey disc, the hole, in the middle of the plane, with a dot A on the far left and a dot B on the far right. Two paths from A to B arch over the hole: a high blue one labelled f and a lower red one labelled g. In the second step three green arches between them show the intermediate paths of the deformation. In the third step a violet path from A to B dips below the hole, captioned no homotopy f to k.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The plane has a hole (hatched). Two paths from A to B: f (blue) arches high over the hole, g (red) arches lower, but both pass above it.', objects: [ringAt(hole, holeR, ROLE.reference, 40), ...shadeConvex(holePoly, 0.2, ROLE.reference, 0.02), dt(A, ROLE.ink, 0.13), dt(B, ROLE.ink, 0.13), lb('A', [A[0] - 0.4, A[1]]), lb('B', [B[0] + 0.4, B[1]]), path(apex.f, ROLE.output), path(apex.g, ROLE.input), lb('f', [0, hmtPath(apex.f, 0.5)[1] + 0.4], ROLE.output), lb('g', [0, hmtPath(apex.g, 0.5)[1] - 0.35], ROLE.input), lb('hole', [hole[0], hole[1] - 0.05])] },
      { narration: 'Slide f to g by H(s, t) = (1 − t) f(s) + t g(s): at t = ¼, ½, ¾ (green) each point of f moves in a straight line toward the matching point of g. All the intermediate paths stay above the hole, so f ≃ g.', objects: [...ts.map((t) => path((1 - t) * apex.f + t * apex.g, ROLE.result)), lb('H(s, t)', [-3.0, 2.8], ROLE.result)] },
      { narration: 'The violet path k goes below the hole. Pushing f down onto k would drag it across the hole, which is not part of the space, so there is no homotopy: k is not homotopic to f. The hole is exactly what makes the two classes of path different.', objects: [path(apex.k, ROLE.aid), lb('k', [0, hmtPath(apex.k, 0.5)[1] - 0.45], ROLE.aid), lb('no homotopy f → k', [0, -4.2], ROLE.aid)] },
    ],
  }
}

// ── 12. Fundamental group ────────────────────────────────────────────────────

/** Loops in an annulus winding 1, 2 and −1 times round the hole (so π₁ = ℤ) and the loops in a disc shrinking to a point (π₁ = 0). */
export const FGR = { centers: [[-2.4, 1.8], [2.4, 1.8], [-2.4, -1.9], [2.4, -1.9]] as ReadonlyArray<Pt>, outer: 1.2, inner: 0.45, r0: 0.85, wob: 0.12, shrink: [0.9, 0.55, 0.2] as readonly number[] }
/** A loop based at angle 0 and winding n times: radius r0 + wob·sin(θ/2) when n = 2, plain circle otherwise. */
export const loopPoint = (n: number, theta: number): Pt => { const r = n === 2 ? FGR.r0 + FGR.wob * Math.sin(theta / 2) : FGR.r0; return [r * Math.cos(theta), r * Math.sin(theta)] }

/** KG: π₁(X, x₀) = homotopy classes of loops at x₀ under concatenation; π₁(S¹) = ℤ; simply connected spaces have π₁ trivial. */
export function buildFundamentalGroupScene(): SceneSpec {
  return framed(raw_buildFundamentalGroupScene())
}
function raw_buildFundamentalGroupScene(): SceneSpec {
  const { centers, outer, inner, r0, shrink } = FGR
  const annulus = (c: Pt): SceneObject[] => [ringAt(c, outer, ROLE.reference, 48), ringAt(c, inner, ROLE.reference, 32)]
  const loop = (c: Pt, n: number, color: string): SceneObject => {
    const turns = Math.abs(n), sign = n < 0 ? -1 : 1, N = 48 * turns
    return curve(Array.from({ length: N + 1 }, (_, i) => { const p = loopPoint(n, sign * (2 * Math.PI * turns * i) / N); return P(c[0] + p[0], c[1] + p[1]) }), color)
  }
  const head = (c: Pt, sign: number, color: string): SceneObject => arrow(P(c[0] + r0 * Math.cos(80 * DEG * sign), c[1] + r0 * Math.sin(80 * DEG * sign)), P(c[0] + r0 * Math.cos(100 * DEG * sign), c[1] + r0 * Math.sin(100 * DEG * sign)), color)
  const base = (c: Pt): SceneObject => dt([c[0] + r0, c[1]], ROLE.ink, 0.09)
  return {
    id: 'math-fundamental-group',
    title: 'Fundamental group: loops and winding numbers',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what the fundamental group counts. In a ring (circle with a hole, S¹) a loop based at x₀ can wind once round the hole (blue, +1), twice (green, +2) or the other way (red, −1); loops with different winding numbers cannot be deformed into each other without crossing the hole, and concatenating loops adds the winding numbers, so π₁(S¹) = ℤ. In a disc there is no hole: every loop (the violet circles) shrinks to the point, so π₁ is trivial — the disc is simply connected.',
    ariaLabel:
      'Four panels. Top left: a ring (two concentric grey circles) with a base point on its right side and a blue loop going once counter-clockwise round the hole, labelled 1, captioned pi one of the circle equals Z. Top right: the ring with a green loop that winds twice counter-clockwise, labelled 2. Bottom left: the ring with a red loop going once clockwise, labelled minus 1. Bottom right: a plain grey disc with three violet concentric circles shrinking to a dot, labelled 0, captioned pi one of the disc equals 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A ring (annulus) has a hole. Pick a base point x₀ and a loop that starts and ends there: going once counter-clockwise round the hole (blue) has winding number +1.', objects: [...annulus(centers[0]), loop(centers[0], 1, ROLE.output), head(centers[0], 1, ROLE.output), base(centers[0]), lb('x₀', [centers[0][0] + r0 + 0.75, centers[0][1]]), lb('1', [centers[0][0], centers[0][1] - 1.6], ROLE.output), lb('π₁(S¹) = ℤ', [centers[0][0], centers[0][1] + 1.75], ROLE.ink)] },
      { narration: 'Loops can wind twice (green, +2) or the other way round (red, −1). Loops with different winding numbers cannot be deformed into each other without crossing the hole, and doing one loop after another adds the numbers: the classes of loops form the integers, π₁(S¹) = ℤ.', objects: [...annulus(centers[1]), loop(centers[1], 2, ROLE.result), head(centers[1], 1, ROLE.result), base(centers[1]), lb('2', [centers[1][0], centers[1][1] - 1.6], ROLE.result), ...annulus(centers[2]), loop(centers[2], -1, ROLE.input), head(centers[2], -1, ROLE.input), base(centers[2]), lb('−1', [centers[2][0], centers[2][1] - 1.6], ROLE.input)] },
      { narration: 'A disc has no hole. Every loop in it (violet circles) can be shrunk, through smaller and smaller loops, to the single point at its centre, so every loop is equivalent to the constant loop: π₁ is trivial. A space where this holds for every loop is simply connected.', objects: [ringAt(centers[3], outer, ROLE.reference, 48), ...shrink.map((r) => ringAt(centers[3], r, ROLE.aid, 36)), dt(centers[3], ROLE.aid, 0.08), lb('0', [centers[3][0], centers[3][1] - 1.6], ROLE.aid), lb('π₁(disc) = 0', [centers[3][0], centers[3][1] - 2.05], ROLE.ink)] },
    ],
  }
}

// ── 13. Euler characteristic ─────────────────────────────────────────────────

/** Cube and tetrahedron drawn as planar graphs (V − E + F = 2 with the outer face counted), then the surfaces of genus 0, 1, 2 with χ = 2 − 2g. */
export const EUL3 = {
  cube: { c: [-2.5, 1.7] as Pt, outer: 1.4, inner: 0.65 }, tet: { c: [2.5, 1.7] as Pt, r: 1.5 },
  icons: { y: -2.5, x: [-3.3, 0, 3.3] as readonly number[], r: 1.0 },
}
export const cubeGraph = (): { V: Pt[]; E: Array<readonly [number, number]> } => {
  const { c, outer, inner } = EUL3.cube
  const V: Pt[] = [[-outer, -outer], [outer, -outer], [outer, outer], [-outer, outer], [-inner, -inner], [inner, -inner], [inner, inner], [-inner, inner]].map(([x, y]) => [c[0] + x, c[1] + y] as Pt)
  const E: Array<readonly [number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
  return { V, E }
}
export const tetGraph = (): { V: Pt[]; E: Array<readonly [number, number]> } => {
  const { c, r } = EUL3.tet
  const V: Pt[] = [[c[0], c[1] + r], [c[0] - r * 0.95, c[1] - r * 0.7], [c[0] + r * 0.95, c[1] - r * 0.7], [c[0], c[1] - 0.1]]
  return { V, E: [[0, 1], [1, 2], [2, 0], [3, 0], [3, 1], [3, 2]] }
}
/** The outline of the union of ellipses (an ellipse boundary with the parts inside the others removed), as runs of points. */
export function unionOutline(cs: ReadonlyArray<{ c: Pt; rx: number; ry: number }>, n = 90): V3[][] {
  const inside = (p: Pt, k: number) => ((p[0] - cs[k].c[0]) / cs[k].rx) ** 2 + ((p[1] - cs[k].c[1]) / cs[k].ry) ** 2 < 0.999
  const out: V3[][] = []
  cs.forEach((e, k) => {
    const pts = Array.from({ length: n }, (_, i) => { const a = (2 * Math.PI * i) / n; return [e.c[0] + e.rx * Math.cos(a), e.c[1] + e.ry * Math.sin(a)] as Pt })
    const keep = pts.map((p) => cs.every((_, j) => j === k || !inside(p, j)))
    const start = keep.findIndex((v) => !v)
    if (start < 0) { out.push([...pts, pts[0]].map((p) => P(p[0], p[1]))); return }
    let run: V3[] = []
    for (let m = 1; m <= n; m++) { const i = (start + m) % n; if (keep[i]) run.push(P(pts[i][0], pts[i][1])); else { if (run.length >= 8) out.push(run); run = [] } }
    if (run.length >= 8) out.push(run)
  })
  return out
}
export const DOUBLE_TORUS = { lobes: [[-0.7, 0], [0.7, 0]] as ReadonlyArray<Pt>, rx: 0.85, ry: 0.65, holeRx: 0.3, holeRy: 0.15 }
export const TORUS = { rx: 1.2, ry: 0.85, holeRx: 0.5, holeRy: 0.22 }

/** KG: χ = V − E + F = 2 for a polyhedron / sphere, a topological invariant; torus 0; genus g gives 2 − 2g. */
export function buildEulerCharacteristicScene(): SceneSpec {
  return framed(raw_buildEulerCharacteristicScene())
}
function raw_buildEulerCharacteristicScene(): SceneSpec {
  const cube = cubeGraph(), tet = tetGraph(), { icons } = EUL3, d = DOUBLE_TORUS
  const draw = (g: { V: Pt[]; E: ReadonlyArray<readonly [number, number]> }): SceneObject[] => [...g.E.map(([a, b]) => ln(g.V[a], g.V[b], ROLE.reference, 0.04)), ...g.V.map((p) => dt(p, ROLE.ink, 0.11))]
  const at = (i: number, p: Pt): Pt => [icons.x[i] + p[0], icons.y + p[1]]
  return {
    id: 'math-euler-characteristic',
    title: 'Euler characteristic: V − E + F',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that V − E + F is a topological invariant. Drawn flat as planar graphs, the cube has V = 8, E = 12 and F = 6 faces (five inside plus the outer one), so 8 − 12 + 6 = 2; the tetrahedron has 4 − 6 + 4 = 2. The count depends only on the surface, which is a sphere in both cases: χ = 2. Other surfaces give other values — a torus has χ = 0 and a surface with g holes has χ = 2 − 2g (the double torus gives −2).',
    ariaLabel:
      'Top left: a cube drawn flat as a square inside a square with four lines joining the corners, eight dots and twelve lines, captioned 8 minus 12 plus 6 equals 2. Top right: a tetrahedron drawn as a triangle with a dot in the middle joined to the three corners, four dots and six lines, captioned 4 minus 6 plus 4 equals 2. Bottom: three surfaces side by side: a sphere (circle with an equator), a torus (ring with one hole) and a double torus (peanut-shaped with two holes), with captions chi 2, chi 0 and chi minus 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Flatten a cube into a planar graph (a square inside a square, corners joined): 8 vertices, 12 edges, and 6 faces — the 5 regions inside and the outer region. V − E + F = 8 − 12 + 6 = 2.', objects: [...draw(cube), lb('8 − 12 + 6 = 2', [EUL3.cube.c[0], 0.0], ROLE.result), lb('V − E + F', [0, 4.1], ROLE.ink)] },
      { narration: 'A tetrahedron flattened the same way (a triangle with a point in the middle joined to the corners): 4 vertices, 6 edges, 4 faces. V − E + F = 4 − 6 + 4 = 2 again. Different polyhedra, same number — because both are topologically a sphere.', objects: [...draw(tet), lb('4 − 6 + 4 = 2', [EUL3.tet.c[0], 0.0], ROLE.result)] },
      { narration: 'The number belongs to the SURFACE, not the polyhedron: a sphere has χ = 2, a torus (one hole) χ = 0, a double torus (two holes) χ = −2; in general χ = 2 − 2g for genus g. Homeomorphic surfaces have the same χ, so a sphere and a torus can never be homeomorphic.', objects: [ringAt(at(0, [0, 0]), icons.r, ROLE.result, 48), ellipseAt(at(0, [0, 0]), icons.r, 0.26, ROLE.aid, 40), ellipseAt(at(1, [0, 0]), TORUS.rx, TORUS.ry, ROLE.aid, 60), ellipseAt(at(1, [0, -0.02]), TORUS.holeRx, TORUS.holeRy, ROLE.aid, 40), ...unionOutline(d.lobes.map((l) => ({ c: at(2, l), rx: d.rx, ry: d.ry }))).map((run) => curve(run, ROLE.aid)), ...d.lobes.map((l) => ellipseAt(at(2, l), d.holeRx, d.holeRy, ROLE.aid, 32)), lb('χ: 2', [icons.x[0], icons.y - 1.5], ROLE.result), lb('χ: 0', [icons.x[1], icons.y - 1.5], ROLE.result), lb('χ: −2', [icons.x[2], icons.y - 1.5], ROLE.result), lb('sphere', [icons.x[0], icons.y + 1.4]), lb('torus', [icons.x[1], icons.y + 1.4]), lb('double torus', [icons.x[2], icons.y + 1.4])] },
    ],
  }
}
