/**
 * Core school-mathematics figures — batch 12 of the mathematics visual campaign
 * (2026-10-12): geometry.
 *
 * Circle theorems, the conic family sharing a focus, the ellipse and hyperbola as constant
 * sum / difference of focal distances, polar coordinates and polar curves, vectors in 2D and
 * 3D, the dot product as a projection, the cross product as a signed parallelogram area,
 * curvature as the radius of the osculating circle, and signed Cartesian coordinates. Same
 * rules as batches 1-11: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects, and every number drawn
 * comes from the constants and pure helpers exported here, which the test file re-derives
 * independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, polyLines, shadeConvex, arcPts, rightAngleMark, gridLines, type XY, type V3 } from './mathSceneKit'

const DEG = Math.PI / 180
const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
const f2 = (n: number) => { const v = (Math.round(n * 100) / 100).toFixed(2); return v === '-0.00' ? '0.00' : v }
const f3 = (n: number) => (Math.round(n * 1000) / 1000).toFixed(3)
const minus = (s: string) => s.replace('-', '−')
const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
const unit = (a: XY, b: XY): XY => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d] }
const angleDeg = (v: XY) => (Math.atan2(v[1], v[0]) * 180) / Math.PI

// ── 1. Circle theorems ───────────────────────────────────────────────────────

/** Centre O at the origin, radius R; A at 40° and B at 140° (central angle 100°); C at 270° and C′ at 330° on the major arc. */
export const CIRC = { R: 2.2, a: 40, b: 140, c: [270, 330] } as const
export const circPoint = (deg: number): XY => [CIRC.R * Math.cos(deg * DEG), CIRC.R * Math.sin(deg * DEG)]
/** The angle at vertex V between rays V→A and V→B, in degrees. */
export const angleAt = (v: XY, a: XY, b: XY) => { const u1 = unit(v, a), u2 = unit(v, b); return Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) / DEG }

/** KG: inscribed angle = half the central angle on the same arc; a tangent is perpendicular to the radius at the point of contact. */
export function buildCircleTheoremsScene(): SceneSpec {
  return framed(raw_buildCircleTheoremsScene())
}
function raw_buildCircleTheoremsScene(): SceneSpec {
  const { R, a, b, c } = CIRC
  const O: XY = [0, 0], A = circPoint(a), B = circPoint(b), C = circPoint(c[0]), C2 = circPoint(c[1])
  const inscribed = (V: XY, color: string): SceneObject[] => {
    const a0 = angleDeg([A[0] - V[0], A[1] - V[1]]), a1 = angleDeg([B[0] - V[0], B[1] - V[1]])
    return [line(P(...V), P(...A), color, 0.04), line(P(...V), P(...B), color, 0.04), curve(arcPts(V[0], V[1], 0.7, Math.min(a0, a1), Math.max(a0, a1), 12), color)]
  }
  const t: XY = [-Math.sin(a * DEG), Math.cos(a * DEG)]
  return {
    id: 'math-circle-theorems',
    title: 'Circle theorems: inscribed angle and tangent',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two circle theorems: the inscribed angle is half the central angle on the same arc (100° at the centre, 50° at C and at C′), and a tangent is perpendicular to the radius at the point of contact.',
    ariaLabel:
      'A circle with centre O and two points A and B on it. The angle AOB at the centre is 100 degrees. Two points C and C prime on the opposite arc each see the chord AB at an angle of 50 degrees, half of 100, and the angle is the same wherever the point sits on that arc. A tangent line touches the circle at A and meets the radius OA at a right angle.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A circle with centre O. Pick two points A and B on it. The angle AOB at the CENTRE, standing on the minor arc AB, is 100°.', objects: [curve(arcPts(0, 0, R, 0, 360, 72), ROLE.ink), dot(P(...O), ROLE.ink, 0.08), dot(P(...A), ROLE.output, 0.1), dot(P(...B), ROLE.output, 0.1), line(P(...O), P(...A), ROLE.output, 0.04), line(P(...O), P(...B), ROLE.output, 0.04), curve(arcPts(0, 0, 0.8, a, b, 16), ROLE.output), label('O', P(0.0, -0.4), ROLE.ink, 'primary'), label('A', P(A[0] + 0.35, A[1] + 0.2), ROLE.output, 'primary'), label('B', P(B[0] - 0.35, B[1] + 0.2), ROLE.output, 'primary'), label('100°', P(0, 1.25), ROLE.output, 'primary')] },
      { narration: 'Now stand at any point C on the OPPOSITE arc and look at the same chord AB. The inscribed angle ACB is 50°, exactly half the central angle. Move to C′: still 50°. The angle is the same everywhere on that arc.', objects: [dot(P(...C), ROLE.input, 0.1), dot(P(...C2), ROLE.aid, 0.1), ...inscribed(C, ROLE.input), ...inscribed(C2, ROLE.aid), label('C', P(C[0], C[1] - 0.4), ROLE.input, 'primary'), label('C′', P(C2[0] + 0.4, C2[1] - 0.2), ROLE.aid, 'primary'), label('50°', P(C[0], C[1] + 1.0), ROLE.input, 'primary'), label('half the central angle', P(0, -3.1), ROLE.result, 'primary')] },
      { narration: 'A TANGENT touches the circle at exactly one point. At A it meets the radius OA at a right angle: the tangent is perpendicular to the radius.', objects: [line(P(A[0] - 1.5 * t[0], A[1] - 1.5 * t[1]), P(A[0] + 1.5 * t[0], A[1] + 1.5 * t[1]), ROLE.result, 0.05), ...rightAngleMark(A[0], A[1], unit(A, O), t, 0.3, ROLE.result), label('tangent ⟂ radius', P(A[0] + 1.1, A[1] + 1.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Conic sections ────────────────────────────────────────────────────────

/** Every conic r = ℓ / (1 − e cos θ) about a common focus at the origin (ℓ = 1); eccentricity e = 0, 0.5, 1, 2. */
export const CONIC = { l: 1, e: { circle: 0, ellipse: 0.5, parabola: 1, hyperbola: 2 }, u: 1.3, ox: 0.75, rMax: 3.5 } as const
export const conicR = (e: number, th: number) => CONIC.l / (1 - e * Math.cos(th))
export const conicXY = (e: number, th: number): XY => { const r = conicR(e, th); return [r * Math.cos(th), r * Math.sin(th)] }
/** The θ at which r reaches rMax on the open conics (so the arms stay on the page). */
export const openThetaMin = (e: number) => Math.acos((1 - CONIC.l / CONIC.rMax) / e)

/** KG: circle, ellipse, parabola and hyperbola from a plane cutting a double cone; unified by the eccentricity e. */
export function buildConicSectionsScene(): SceneSpec {
  return framed(raw_buildConicSectionsScene())
}
function raw_buildConicSectionsScene(): SceneSpec {
  const { e, u, ox, l } = CONIC
  const S = (p: XY): V3 => P((p[0] - ox) * u, p[1] * u)
  const closed = (ecc: number, color: string) => curve(Array.from({ length: 73 }, (_, i) => S(conicXY(ecc, (2 * Math.PI * i) / 72))), color)
  const open = (ecc: number, color: string) => { const t0 = openThetaMin(ecc), n = 60; return curve(Array.from({ length: n + 1 }, (_, i) => S(conicXY(ecc, t0 + ((2 * Math.PI - 2 * t0) * i) / n))), color) }
  return {
    id: 'math-conic-sections',
    title: 'Conic sections: one family, one focus, eccentricity e',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four conics as one family r = 1/(1 − e cos θ) sharing a focus: eccentricity 0 gives a circle, between 0 and 1 an ellipse, exactly 1 a parabola, above 1 a hyperbola; each point is e times as far from the focus as from the directrix.',
    ariaLabel:
      'Four curves drawn about one common focus, a dot at the origin. A circle with e equals 0. A stretched closed ellipse with e equals 0.5. An open parabola with e equals 1, with a dashed vertical directrix to its left. A narrower open hyperbola branch with e equals 2. As e increases the curve opens up from a closed oval to an open arm.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Slicing a double cone with a plane gives the conic sections. They fit one formula about a focus: r = 1 ÷ (1 − e cos θ), where e is the eccentricity. e = 0 is a circle; 0 < e < 1 (here 0.5) is an ellipse: closed ovals, more stretched as e grows.', objects: [closed(e.circle, ROLE.ink), closed(e.ellipse, ROLE.output), dot(S([0, 0]), ROLE.result, 0.1), label('circle: eccentricity 0', P(-3.0, 2.9), ROLE.ink, 'primary'), label('ellipse: eccentricity 0.5', P(-3.0, 2.2), ROLE.output, 'primary'), label('common focus', P(S([0, 0])[0] - 0.7, -0.5), ROLE.result, 'primary')] },
      { narration: 'e = 1 is a parabola: the oval has opened into one open arm. Every point of a conic is e times as far from the focus as from a fixed line, the directrix; for the parabola e = 1, so focus-distance equals directrix-distance.', objects: [open(e.parabola, ROLE.result), line(S([-l / e.parabola, -3.4]), S([-l / e.parabola, 3.4]), ROLE.aid, 0.03), label('parabola: eccentricity 1', P(-3.0, 1.5), ROLE.result, 'primary'), label('directrix', P(S([-l / e.parabola, 0])[0] - 0.2, S([0, 3.45])[1] + 0.3), ROLE.aid, 'primary')] },
      { narration: 'e > 1 (here 2) is a hyperbola: a narrower open arm. So the family runs through circle, ellipse, parabola, hyperbola as e rises through 0, between 0 and 1, 1 and above 1.', objects: [open(e.hyperbola, ROLE.input), label('hyperbola: eccentricity 2', P(-3.0, 0.8), ROLE.input, 'primary')] },
    ],
  }
}

// ── 3. Ellipse ───────────────────────────────────────────────────────────────

/** x²/9 + y²/4 = 1: a = 3, b = 2, foci (±√5, 0); the sum of the focal distances is 2a = 6. */
export const ELL = { a: 3, b: 2, u: 0.9, pts: [1.5, -2.4] as readonly number[], signs: [1, -1] as readonly number[] } as const
export const ellC = () => Math.sqrt(ELL.a ** 2 - ELL.b ** 2)
export const ellY = (x: number) => ELL.b * Math.sqrt(1 - (x * x) / (ELL.a * ELL.a))
export const focalDistances = (x: number, y: number): [number, number] => [Math.hypot(x + ellC(), y), Math.hypot(x - ellC(), y)]

/** KG: the sum of the distances from two foci is constant (2a); x²/a² + y²/b² = 1; a circle is the case of equal foci. */
export function buildEllipseScene(): SceneSpec {
  return framed(raw_buildEllipseScene())
}
function raw_buildEllipseScene(): SceneSpec {
  const { a, b, u, pts, signs } = ELL
  const c = ellC()
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const at = (k: number): XY => [pts[k], signs[k] * ellY(pts[k])]
  const probe = (k: number): SceneObject[] => {
    const [px, py] = at(k), [d1, d2] = focalDistances(px, py)
    const mid = (fx: number): XY => [((px + fx) * u) / 2, (py * u) / 2]
    const off1: XY = k === 0 ? [0, 0.35] : [-0.5, 0], off2: XY = k === 0 ? [0.5, 0] : [0, -0.35]
    return [
      dot(S(px, py), ROLE.result, 0.11), line(S(px, py), S(-c, 0), ROLE.output, 0.04), line(S(px, py), S(c, 0), ROLE.input, 0.04),
      label(f2(d1), P(mid(-c)[0] + off1[0], mid(-c)[1] + off1[1]), ROLE.output, 'primary'),
      label(f2(d2), P(mid(c)[0] + off2[0], mid(c)[1] + off2[1]), ROLE.input, 'primary'),
    ]
  }
  return {
    id: 'math-ellipse',
    title: 'Ellipse: the focal distances always add to 2a',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the ellipse x²/9 + y²/4 = 1 as the set of points whose distances to the two foci (±√5, 0) add to the constant 2a = 6: two different points both give 6.',
    ariaLabel:
      'An ellipse with semi-axes 3 and 2 and foci F one and F two on the x-axis at plus and minus root 5. A point at the upper right has distances 4.12 and 1.88 to the two foci, which add to 6. A second point on the lower left has distances 1.21 and 4.79, which also add to 6: the sum of the two distances is the same, 2a, for every point of the ellipse.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The ellipse x²/9 + y²/4 = 1 has semi-axes a = 3 and b = 2. Its two foci F₁ and F₂ lie on the long axis at (±c, 0) with c² = a² − b² = 5, so c ≈ 2.24.', objects: [...mathAxes(S, -3.6, 3.6, -2.6, 2.6), curve(Array.from({ length: 73 }, (_, i) => S(a * Math.cos((2 * Math.PI * i) / 72), b * Math.sin((2 * Math.PI * i) / 72))), ROLE.ink), dot(S(-c, 0), ROLE.result, 0.12), dot(S(c, 0), ROLE.result, 0.12), label('F₁', P(-c * u, -0.4), ROLE.result, 'primary'), label('F₂', P(c * u, -0.4), ROLE.result, 'primary'), label('x²/9 + y²/4 = 1', P(0, 2.65), ROLE.ink, 'primary')] },
      { narration: 'Take the point (1.5, 1.73) on the ellipse. Its distance to F₁ is 4.12 (blue) and to F₂ is 1.88 (red). They add to 6 = 2a.', objects: probe(0) },
      { narration: 'Take another point, (−2.4, −1.2), far on the other side. Now the distances are 1.21 and 4.79, and again they add to 6. For EVERY point of the ellipse d₁ + d₂ = 2a. (If the two foci merge, a = b and the ellipse is a circle.)', objects: [...probe(1), label('d₁ + d₂ = 2a = 6', P(0, -2.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Hyperbola ─────────────────────────────────────────────────────────────

/** x²/4 − y²/2.25 = 1: a = 2, b = 1.5, c = 2.5; |d₁ − d₂| = 2a = 4; asymptotes y = ±0.75x. */
export const HYP = { a: 2, b: 1.5, u: 0.8, px: 3 } as const
export const hypC = () => Math.sqrt(HYP.a ** 2 + HYP.b ** 2)
export const hypY = (x: number) => HYP.b * Math.sqrt((x * x) / (HYP.a * HYP.a) - 1)

/** KG: the difference of the distances from two foci is constant; two branches; asymptotes y = ±(b/a)x. */
export function buildHyperbolaScene(): SceneSpec {
  return framed(raw_buildHyperbolaScene())
}
function raw_buildHyperbolaScene(): SceneSpec {
  const { a, b, u, px } = HYP
  const c = hypC(), py = hypY(px)
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const branch = (sg: number) => curve(Array.from({ length: 41 }, (_, i) => { const t = -1.4 + (2.8 * i) / 40; return S(sg * a * Math.cosh(t), b * Math.sinh(t)) }), ROLE.ink)
  const d1 = Math.hypot(px + c, py), d2 = Math.hypot(px - c, py)
  return {
    id: 'math-hyperbola',
    title: 'Hyperbola: the focal distances differ by 2a',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the hyperbola x²/4 − y²/2.25 = 1: two branches, foci (±2.5, 0), the difference of the focal distances is the constant 2a = 4 (5.75 − 1.75 at the point (3, 1.68)), and the branches approach the asymptotes y = ±0.75x, the diagonals of the box of half-sides a and b.',
    ariaLabel:
      'A hyperbola with two branches opening left and right, foci at plus and minus 2.5 on the x-axis and dashed asymptotes through the centre with slope plus and minus 0.75. A point on the right branch at 3, 1.68 is 5.75 from the left focus and 1.75 from the right focus, a difference of 4. A box with corners at plus and minus 2, plus and minus 1.5 has the asymptotes as its diagonals.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The hyperbola x²/4 − y²/2.25 = 1 has two branches, with a = 2, b = 1.5 and foci at (±c, 0) where c² = a² + b² = 6.25, so c = 2.5. Far out the branches hug the dashed asymptotes y = ±0.75x.', objects: [...mathAxes(S, -5.4, 5.4, -3.6, 3.6), branch(1), branch(-1), line(S(-4.6, -3.45), S(4.6, 3.45), ROLE.aid, 0.03), line(S(-4.6, 3.45), S(4.6, -3.45), ROLE.aid, 0.03), dot(S(-c, 0), ROLE.result, 0.12), dot(S(c, 0), ROLE.result, 0.12), label('F₁', P(-c * u, -0.4), ROLE.result, 'primary'), label('F₂', P(c * u, -0.4), ROLE.result, 'primary')] },
      { narration: 'Take P = (3, 1.68) on the right branch. It is 5.75 from the far focus F₁ (blue) and 1.75 from the near focus F₂ (red). The DIFFERENCE is 5.75 − 1.75 = 4 = 2a, for every point of the hyperbola.', objects: [dot(S(px, py), ROLE.output, 0.11), line(S(px, py), S(-c, 0), ROLE.output, 0.04), line(S(px, py), S(c, 0), ROLE.input, 0.04), label(f2(d1), P(((px - c) * u) / 2 - 0.1, (py * u) / 2 + 0.35), ROLE.output, 'primary'), label(f2(d2), P(((px + c) * u) / 2 + 0.55, (py * u) / 2 - 0.2), ROLE.input, 'primary'), label('|d₁ − d₂| = 2a = 4', P(0, -2.9), ROLE.output, 'primary')] },
      { narration: 'The asymptotes are the diagonals of the box with corners (±a, ±b) = (±2, ±1.5): their slope is b ÷ a = 0.75. The box shows where the branches are heading.', objects: [...polyLines([[-a * u, -b * u], [a * u, -b * u], [a * u, b * u], [-a * u, b * u]], ROLE.result, 0.04), label('asymptotes y = ±0.75x', P(-2.6, 2.6), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 5. Polar coordinates ─────────────────────────────────────────────────────

/** P = (r, θ) = (3, 60°); Q = (2, 210°). Drawn at 1.2 per unit. */
export const POLAR = { u: 1.2, p: [3, 60], q: [2, 210], rings: [1, 2, 3] } as const
export const toCartesian = (r: number, deg: number): XY => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)]
export const toPolar = (x: number, y: number): [number, number] => { let t = Math.atan2(y, x) / DEG; if (t < 0) t += 360; return [Math.hypot(x, y), t] }

/** KG: (r, θ) with x = r cos θ, y = r sin θ. */
export function buildPolarCoordinatesScene(): SceneSpec {
  return framed(raw_buildPolarCoordinatesScene())
}
function raw_buildPolarCoordinatesScene(): SceneSpec {
  const { u, p, q, rings } = POLAR
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  const [px, py] = toCartesian(p[0], p[1]), [qx, qy] = toCartesian(q[0], q[1])
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)
  return {
    id: 'math-polar-coordinates',
    title: 'Polar coordinates: distance and angle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show polar coordinates (r, θ) on a grid of circles and rays: P at distance 3 and angle 60° has Cartesian coordinates x = r cos θ = 1.5 and y = r sin θ ≈ 2.60, and Q at 2 units and 210° lies in the third quadrant at (−1.73, −1).',
    ariaLabel:
      'A polar grid of three circles of radius 1, 2 and 3 and twelve rays 30 degrees apart. A point P is 3 units from the origin at an angle of 60 degrees, marked by an arc. Dashed lines drop from P to the axes, showing x equals 1.5 and y equals 2.60. A second point Q, 2 units out at 210 degrees, is in the lower left at about minus 1.73, minus 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Polar coordinates locate a point by its DISTANCE r from the origin and its ANGLE θ measured counter-clockwise from the positive x-axis. P is at r = 3, θ = 60°.', objects: [...rings.map((r) => curve(arcPts(0, 0, r * u, 0, 360, 60), ROLE.reference)), ...rays.map((d) => line(P(0, 0), P(3.4 * u * Math.cos(d * DEG), 3.4 * u * Math.sin(d * DEG)), ROLE.reference, 0.012)), line(S(0, 0), S(px, py), ROLE.output, 0.05), dot(S(px, py), ROLE.result, 0.12), curve(arcPts(0, 0, 0.9, 0, p[1], 16), ROLE.input), label('r = 3', P(S(px, py)[0] - 0.6, S(px, py)[1] - 0.45), ROLE.output, 'primary'), label('θ = 60°', P(1.5, 0.5), ROLE.input, 'primary')] },
      { narration: 'To convert to Cartesian coordinates drop perpendiculars to the axes: x = r cos θ = 3 cos 60° = 1.5 and y = r sin θ = 3 sin 60° ≈ 2.60. Going back: r = √(x² + y²) and θ = atan2(y, x).', objects: [guide(S(px, py), S(px, 0), ROLE.aid, 0.03), guide(S(px, py), S(0, py), ROLE.aid, 0.03), label('x = r cos θ: 1.5', P(S(px, 0)[0], -0.95), ROLE.aid, 'primary'), label('y = r sin θ: 2.60', P(-1.8, S(0, py)[1] + 0.3), ROLE.aid, 'primary')] },
      { narration: 'Angles can go past 180°. Q is 2 units from the origin at θ = 210°, so it lies in the third quadrant: x = 2 cos 210° ≈ −1.73, y = 2 sin 210° = −1.', objects: [line(S(0, 0), S(qx, qy), ROLE.result, 0.05), dot(S(qx, qy), ROLE.result, 0.12), curve(arcPts(0, 0, 1.4, 0, q[1], 40), ROLE.result), label('Q: 2 units at 210°', P(S(qx, qy)[0] - 0.4, S(qx, qy)[1] - 0.5), ROLE.result, 'primary'), label(`Q = (${minus(f2(qx))}, ${minus(f2(qy))})`, P(S(qx, qy)[0] + 0.1, S(qx, qy)[1] - 1.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Polar curves ──────────────────────────────────────────────────────────

/** Three polar curves in three panels: cardioid r = 1 + cos θ, three-petal rose r = cos 3θ, spiral r = θ/π. */
export const PCURVE = [
  { name: 'cardioid', f: (t: number) => 1 + Math.cos(t), t0: 0, t1: 2 * Math.PI, cx: -3.4, u: 1.0, ox: 0.875, n: 72 },
  { name: 'rose', f: (t: number) => Math.cos(3 * t), t0: 0, t1: Math.PI, cx: 0, u: 1.6, ox: 0.25, n: 72 },
  { name: 'spiral', f: (t: number) => t / Math.PI, t0: 0, t1: 3 * Math.PI, cx: 3.4, u: 0.5, ox: 0, n: 90 },
] as const
export const polarPoint = (k: number, i: number): XY => {
  const c = PCURVE[k], t = c.t0 + ((c.t1 - c.t0) * i) / c.n, r = c.f(t)
  return [r * Math.cos(t), r * Math.sin(t)]
}

/** KG: curves r = f(θ): cardioids, roses, lemniscates, Archimedean spirals. */
export function buildPolarCurvesScene(): SceneSpec {
  return framed(raw_buildPolarCurvesScene())
}
function raw_buildPolarCurvesScene(): SceneSpec {
  const draw = (k: number, color: string): SceneObject => curve(Array.from({ length: PCURVE[k].n + 1 }, (_, i) => { const [x, y] = polarPoint(k, i); return P(PCURVE[k].cx + (x - PCURVE[k].ox) * PCURVE[k].u, y * PCURVE[k].u) }), color)
  const origin = (k: number) => dot(P(PCURVE[k].cx - PCURVE[k].ox * PCURVE[k].u, 0), ROLE.reference, 0.08)
  return {
    id: 'math-polar-curves',
    title: 'Polar curves: r = f(θ)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show three curves written as r = f(θ): the cardioid r = 1 + cos θ (a heart with a cusp at the origin), the three-petal rose r = cos 3θ, and the Archimedean spiral r = θ/π whose radius grows steadily with the angle.',
    ariaLabel:
      'Three curves in three panels, each drawn from its polar equation about the origin dot. Left, the cardioid r equals 1 plus cos theta, a heart shape with a point at the origin. Middle, the rose r equals cos 3 theta, with three petals. Right, the spiral r equals theta over pi, winding outward one and a half times.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A polar curve gives the distance r as a function of the angle θ. The cardioid r = 1 + cos θ is largest (r = 2) at θ = 0 and shrinks to 0 at θ = π, making a heart with a cusp at the origin.', objects: [draw(0, ROLE.output), origin(0), label('cardioid r = 1 + cos θ', P(PCURVE[0].cx, -2.1), ROLE.output, 'primary')] },
      { narration: 'The rose r = cos 3θ swings between r = 1 and r = −1 three times as θ goes from 0 to π. Negative r plots on the opposite side, so it traces three petals.', objects: [draw(1, ROLE.input), origin(1), label('rose r = cos 3θ', P(PCURVE[1].cx, -2.1), ROLE.input, 'primary')] },
      { narration: 'The Archimedean spiral r = θ/π: the radius grows in step with the angle, so the curve winds outward at an even rate (here from r = 0 to r = 3 over one and a half turns).', objects: [draw(2, ROLE.result), origin(2), label('spiral r = θ/π', P(PCURVE[2].cx, -2.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Vectors in 2D ─────────────────────────────────────────────────────────

/** a = (3, 1), b = (1, 2); a + b = (4, 3) with length 5; 2a = (6, 2). Screen = (x u + ox, y u + oy). */
export const VEC2 = { a: [3, 1], b: [1, 2], u: 0.75, ox: -3.0, oy: -1.5 } as const
export const vecAdd = (p: readonly number[], q: readonly number[]): XY => [p[0] + q[0], p[1] + q[1]]
export const vecScale = (k: number, p: readonly number[]): XY => [k * p[0], k * p[1]]
export const vecLen = (p: readonly number[]) => Math.hypot(p[0], p[1])

/** KG: magnitude and direction in the plane; added head-to-tail, scaled by multiplication. */
export function buildVectors2dScene(): SceneSpec {
  return framed(raw_buildVectors2dScene())
}
function raw_buildVectors2dScene(): SceneSpec {
  const { a, b, u, ox, oy } = VEC2
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const sum = vecAdd(a, b), two = vecScale(2, a)
  return {
    id: 'math-vectors-2d',
    title: 'Vectors in 2D: components, addition, scaling',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show vectors in the plane as arrows with components: a = (3, 1) and b = (1, 2) add head-to-tail to a + b = (4, 3), whose length is √(16 + 9) = 5, and scaling a by 2 doubles its length without changing its direction.',
    ariaLabel:
      'Two arrows from the origin: a goes 3 right and 1 up, and b goes 1 right and 2 up. Placing b at the tip of a, and a at the tip of b, makes a parallelogram whose diagonal from the origin is the sum a plus b, which goes 4 right and 3 up and has length 5. A longer violet arrow, 2a, points the same way as a with twice its length: 6 right and 2 up.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A vector has magnitude and direction. In the plane it is an ordered pair of components: a = (3, 1) goes 3 right and 1 up; b = (1, 2) goes 1 right and 2 up.', objects: [arrow(S(0, 0), S(...a), ROLE.output), arrow(S(0, 0), S(...b), ROLE.input), dot(S(0, 0), ROLE.reference, 0.07), label('a = (3, 1)', P(S(...a)[0] + 0.1, S(...a)[1] - 0.5), ROLE.output, 'primary'), label('b = (1, 2)', P(S(...b)[0] - 0.2, S(...b)[1] + 0.4), ROLE.input, 'primary')] },
      { narration: 'Add vectors head-to-tail: put the tail of b at the tip of a (and, the other way round, a at the tip of b). The result a + b runs from the start to the final tip: (3 + 1, 1 + 2) = (4, 3). Both orders give the same parallelogram diagonal. Its length is √(4² + 3²) = 5.', objects: [arrow(S(...a), S(...sum), ROLE.input), arrow(S(...b), S(...sum), ROLE.output), arrow(S(0, 0), S(...sum), ROLE.result), label('a + b = (4, 3)', P(S(...sum)[0] + 0.1, S(...sum)[1] + 0.45), ROLE.result, 'primary'), label('|a + b| = 5', P(S(2, 1.5)[0] - 0.5, S(2, 1.5)[1] + 0.7), ROLE.result, 'primary')] },
      { narration: 'Multiplying by a number scales a vector: 2a = (6, 2) points the same way as a and is twice as long (|2a| = 2|a|). (It is drawn slightly below a so both can be seen.)', objects: [arrow(S(0, -0.45), S(two[0], two[1] - 0.45), ROLE.aid), label('2a = (6, 2)', P(S(two[0], two[1])[0] - 0.3, S(two[0], two[1])[1] - 0.95), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 8. Vectors in 3D ─────────────────────────────────────────────────────────

/** v = (2, 2, 1) drawn in oblique projection: screen = ((y − k x) u + ox, (z − k x) u + oy), k = 0.35. |v| = 3. */
export const VEC3 = { v: [2, 2, 1], u: 1.5, k: 0.35, ox: -0.8, oy: 0.2 } as const
export const project3 = (x: number, y: number, z: number): XY => [(y - VEC3.k * x) * VEC3.u + VEC3.ox, (z - VEC3.k * x) * VEC3.u + VEC3.oy]
export const vec3Len = (v: readonly number[]) => Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)

/** KG: vectors in 3-space as triples (a, b, c). */
export function buildVectors3dScene(): SceneSpec {
  return framed(raw_buildVectors3dScene())
}
function raw_buildVectors3dScene(): SceneSpec {
  const { v } = VEC3
  const Pp = (x: number, y: number, z: number): V3 => P(...project3(x, y, z))
  const [vx, vy, vz] = v
  return {
    id: 'math-vectors-3d',
    title: 'Vectors in 3D: three components, one length',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a vector in space v = (2, 2, 1) in an oblique drawing: its three components run along the x, y and z axes, the base diagonal has length √(2² + 2²) = 2√2 and the vector has length √(2² + 2² + 1²) = 3.',
    ariaLabel:
      'A three-dimensional coordinate frame in oblique view, with the x axis pointing down and left toward the viewer, the y axis to the right and the z axis up. A vector from the origin to the point 2, 2, 1 is drawn. Its components form a staircase along the axes: 2 along x, 2 along y and 1 along z. A violet diagonal across the floor of the box has length 2 root 2, and the vector length is the square root of 8 plus 1, which is 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'In space a vector has three components. Here v = (2, 2, 1): 2 along x (drawn toward the viewer), 2 along y (right) and 1 along z (up). The arrow runs from the origin to the point (2, 2, 1).', objects: [arrow(Pp(0, 0, 0), Pp(3.2, 0, 0), ROLE.reference), arrow(Pp(0, 0, 0), Pp(0, 3.0, 0), ROLE.reference), arrow(Pp(0, 0, 0), Pp(0, 0, 2.6), ROLE.reference), label('x', P(...project3(3.5, 0, 0)), ROLE.reference, 'primary'), label('y', P(...project3(0, 3.3, 0)), ROLE.reference, 'primary'), label('z', P(...project3(0, 0, 2.9)), ROLE.reference, 'primary'), arrow(Pp(0, 0, 0), Pp(vx, vy, vz), ROLE.ink), label('v = (2, 2, 1)', P(project3(vx, vy, vz)[0] + 0.9, project3(vx, vy, vz)[1] + 0.35), ROLE.ink, 'primary')] },
      { narration: 'Walk along the three components: 2 along x (red), then 2 along y (blue), then 1 along z (green). The staircase ends at the same tip as v: the vector is the sum of its component vectors.', objects: [line(Pp(0, 0, 0), Pp(vx, 0, 0), ROLE.input, 0.06), line(Pp(vx, 0, 0), Pp(vx, vy, 0), ROLE.output, 0.06), line(Pp(vx, vy, 0), Pp(vx, vy, vz), ROLE.result, 0.06)] },
      { narration: 'Length by Pythagoras twice: the diagonal across the floor of the box is d = √(2² + 2²) = 2√2 ≈ 2.83 (violet); then |v| = √(d² + 1²) = √(8 + 1) = 3. In general |v| = √(a² + b² + c²).', objects: [line(Pp(0, 0, 0), Pp(vx, vy, 0), ROLE.aid, 0.05), label('d = 2√2 ≈ 2.83', P(project3(vx, vy, 0)[0] - 1.5, project3(vx, vy, 0)[1] - 0.45), ROLE.aid, 'primary'), label('|v| = √(2² + 2² + 1²) = 3', P(0.6, -2.9), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 9. Dot product ───────────────────────────────────────────────────────────

/** a = (4, 1), b = (2, 3), c = (−1, 4): a·b = 11, a·c = 0. Screen = (x u + ox, y u + oy). */
export const DOT = { a: [4, 1], b: [2, 3], c: [-1, 4], u: 0.8, ox: -1.4, oy: -1.4 } as const
export const dotProd = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
export const angleBetween = (p: readonly number[], q: readonly number[]) => Math.acos(dotProd(p, q) / (vecLen(p) * vecLen(q))) / DEG
export const projectionOn = (onto: readonly number[], p: readonly number[]): XY => { const k = dotProd(onto, p) / dotProd(onto, onto); return [k * onto[0], k * onto[1]] }

/** KG: a·b = Σaᵢbᵢ = |a||b| cos θ; the component of one vector along another; zero iff orthogonal. */
export function buildDotProductScene(): SceneSpec {
  return framed(raw_buildDotProductScene())
}
function raw_buildDotProductScene(): SceneSpec {
  const { a, b, c, u, ox, oy } = DOT
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const th = angleBetween(a, b), foot = projectionOn(a, b), ua = [a[0] / vecLen(a), a[1] / vecLen(a)] as XY
  const a0 = angleDeg([a[0], a[1]]), a1 = angleDeg([b[0], b[1]])
  return {
    id: 'math-dot-product',
    title: 'Dot product: how much one vector points along another',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the dot product of a = (4, 1) and b = (2, 3): a·b = 4·2 + 1·3 = 11 = |a||b| cos θ with θ ≈ 42°, which is |a| times the length 2.67 of the projection of b onto a; a vector perpendicular to a, such as (−1, 4), has dot product 0.',
    ariaLabel:
      'Two arrows from the origin: a goes 4 right and 1 up, b goes 2 right and 3 up, with an angle of about 42 degrees between them. A dashed line drops from the tip of b perpendicularly onto the line of a, and the green segment from the origin to the foot is the projection of b on a, of length 2.67. The product of the length of a, 4.12, and 2.67 is 11. A third arrow c, minus 1 and 4, is at a right angle to a, and a dot c is 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two vectors a = (4, 1) and b = (2, 3) with an angle θ ≈ 42° between them. The dot product a·b = 4 · 2 + 1 · 3 = 11 (multiply matching components and add). It also equals |a||b| cos θ = 4.12 × 3.61 × 0.74.', objects: [arrow(S(0, 0), S(...a), ROLE.output), arrow(S(0, 0), S(...b), ROLE.input), curve(arcPts(S(0, 0)[0], S(0, 0)[1], 0.9, a0, a1, 12), ROLE.aid), label('a', P(S(...a)[0] + 0.35, S(...a)[1]), ROLE.output, 'primary'), label('b', P(S(...b)[0], S(...b)[1] + 0.35), ROLE.input, 'primary'), label(`${f1(th)}°`, P(S(0, 0)[0] + 1.35, S(0, 0)[1] + 0.55), ROLE.aid, 'primary'), label('a·b = 11', P(0.6, -2.6), ROLE.ink, 'primary')] },
      { narration: 'Geometrically a·b measures how far b points ALONG a. Drop a perpendicular from the tip of b onto the line of a: the green piece is the projection of b on a, of length |b| cos θ = 11 ÷ |a| ≈ 2.67. Then a·b = |a| × 2.67 = 11.', objects: [guide(S(...b), S(...foot), ROLE.aid, 0.03), line(S(0, 0), S(...foot), ROLE.result, 0.07), ...rightAngleMark(S(...foot)[0], S(...foot)[1], [-ua[0], -ua[1]], unit(foot, [b[0], b[1]]), 0.25, ROLE.aid), label('projection 2.67', P(S(...foot)[0] + 0.5, S(...foot)[1] - 0.6), ROLE.result, 'primary')] },
      { narration: 'If two vectors are perpendicular, one has no component along the other, so the dot product is 0. c = (−1, 4) is at a right angle to a: a·c = 4 · (−1) + 1 · 4 = 0. Dot product zero ⇔ orthogonal.', objects: [arrow(S(0, 0), S(...c), ROLE.aid), ...rightAngleMark(S(0, 0)[0], S(0, 0)[1], ua, [c[0] / vecLen(c), c[1] / vecLen(c)], 0.3, ROLE.aid), label('a·c = 0: orthogonal', P(S(...c)[0] + 0.3, S(...c)[1] + 0.45), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 10. Cross product ────────────────────────────────────────────────────────

/** a = (3, 0), b = (1, 2) in the plane z = 0: a × b = (0, 0, 6), the signed area of the parallelogram. */
export const CROSS = { a: [3, 0], b: [1, 2], u: 0.9, ox: -2.4, oy: -1.0 } as const
export const cross2 = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]

/** KG: a × b is perpendicular to both a and b with magnitude |a||b| sin θ (the parallelogram area). */
export function buildCrossProductScene(): SceneSpec {
  return framed(raw_buildCrossProductScene())
}
function raw_buildCrossProductScene(): SceneSpec {
  const { a, b, u, ox, oy } = CROSS
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const corner = [[0, 0], [a[0], a[1]], [a[0] + b[0], a[1] + b[1]], [b[0], b[1]]] as const
  const poly: XY[] = corner.map(([x, y]) => [x * u + ox, y * u + oy])
  const cx = ((a[0] + b[0]) / 2) * u + ox, cy = ((a[1] + b[1]) / 2) * u + oy
  return {
    id: 'math-cross-product',
    title: 'Cross product: a signed parallelogram area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the cross product of a = (3, 0) and b = (1, 2) lying in the page: |a × b| = |a||b| sin θ is the area 6 of the parallelogram they span (base 3 × height 2), and a × b points out of the page while b × a = −(a × b) points into it.',
    ariaLabel:
      'Two arrows from the origin, a going 3 right and b going 1 right and 2 up, with a dashed parallelogram completing them. The parallelogram is shaded: its area is base 3 times height 2, which is 6, equal to the length of the cross product. A green circled dot marks that a cross b points out of the page, and a red circled cross marks that b cross a points into the page.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take a = (3, 0) and b = (1, 2) in the plane of the page. Together they span a parallelogram (dashed): a and b are two of its sides.', objects: [arrow(S(0, 0), S(...a), ROLE.output), arrow(S(0, 0), S(...b), ROLE.input), guide(S(...b), S(a[0] + b[0], a[1] + b[1]), ROLE.reference, 0.03), guide(S(...a), S(a[0] + b[0], a[1] + b[1]), ROLE.reference, 0.03), label('a', P(S(...a)[0] + 0.3, S(...a)[1] - 0.3), ROLE.output, 'primary'), label('b', P(S(...b)[0] - 0.3, S(...b)[1] + 0.3), ROLE.input, 'primary')] },
      { narration: 'The LENGTH of a × b is |a||b| sin θ, the area of that parallelogram: base |a| = 3 times height 2 = 6. In components, a × b = (a₁b₂ − a₂b₁) k = (3 · 2 − 0 · 1) k = 6k.', objects: [...shadeConvex(poly, 0.12, ROLE.result), ...polyLines(poly, ROLE.result, 0.04), label('area = 3 × 2 = 6', P(cx, S(0, 2)[1] + 0.6), ROLE.result, 'primary')] },
      { narration: 'The DIRECTION of a × b is perpendicular to both a and b, found by the right-hand rule: turning from a to b counter-clockwise, it points OUT of the page (⊙). Swap the order and the sign flips: b × a = −6k points INTO the page (⊗).', objects: [ring(cx, cy, ROLE.result, 0.2), dot(P(cx, cy), ROLE.result, 0.06), ring(2.6, 1.4, ROLE.input, 0.2), line(P(2.6 - 0.14, 1.4 - 0.14), P(2.6 + 0.14, 1.4 + 0.14), ROLE.input, 0.04), line(P(2.6 - 0.14, 1.4 + 0.14), P(2.6 + 0.14, 1.4 - 0.14), ROLE.input, 0.04), label('a × b = +6k: out of the page', P(cx - 0.2, S(0, 0)[1] - 0.6), ROLE.result, 'primary'), label('b × a = −6k: into the page', P(2.2, 2.0), ROLE.input, 'primary')] },
    ],
  }
}

// ── 11. Curvature ────────────────────────────────────────────────────────────

/** y = x²/2: curvature κ(x) = |y″|/(1 + y′²)^{3/2} = (1 + x²)^{−3/2}; κ(0) = 1, κ(1) = 2^{−3/2} ≈ 0.354. Screen = (x u, y u + oy). */
export const CURV = { u: 0.6, oy: -1.4, at: [0, 1] as readonly number[] } as const
export const curvF = (x: number) => (x * x) / 2
export const curvKappa = (x: number) => 1 / (1 + x * x) ** 1.5
/** Centre of the osculating circle at x: the point plus (unit normal) / κ. */
export const osculatingCentre = (x: number): XY => { const yp = x, n = Math.hypot(1, yp), k = curvKappa(x); return [x + (-yp / n) / k, curvF(x) + (1 / n) / k] }

/** KG: κ = |dT/ds|, the rate at which the unit tangent turns per unit arc length. */
export function buildCurvatureScene(): SceneSpec {
  return framed(raw_buildCurvatureScene())
}
function raw_buildCurvatureScene(): SceneSpec {
  const { u, oy, at } = CURV
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const circle = (x: number, color: string): SceneObject => { const c = osculatingCentre(x), r = 1 / curvKappa(x); return curve(Array.from({ length: 73 }, (_, i) => S(c[0] + r * Math.cos((2 * Math.PI * i) / 72), c[1] + r * Math.sin((2 * Math.PI * i) / 72))), color) }
  return {
    id: 'math-curvature',
    title: 'Curvature: the radius of the best-fitting circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show curvature κ on the parabola y = x²/2: at the vertex the curve bends like a circle of radius 1 (κ = 1), at x = 1 like a circle of radius 2.83 (κ = 0.354); the sharper the bend, the smaller the radius and the larger κ = 1/R.',
    ariaLabel:
      'The parabola y equals x squared over 2. A blue circle of radius 1 sits inside the curve at the vertex and hugs it closely: the curvature there is 1. A red circle of radius 2.83, centred up and to the left, touches the parabola at x equals 1 and hugs it there: the curvature is 0.354, a gentler bend. Violet radii run from each touching point to its circle centre, perpendicular to the curve.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The parabola y = x² ÷ 2. Curvature κ measures how sharply a curve bends: κ = |dT/ds|, how fast the unit tangent T turns per unit of arc length s. At the vertex the best-fitting circle (blue) has radius 1, so κ = 1 ÷ 1 = 1.', objects: [curve(sampleMapped(curvF, -3, 3, S, 60), ROLE.ink), circle(at[0], ROLE.output), dot(S(0, 0), ROLE.output, 0.1), label('vertex: curvature 1', P(-1.9, 1.4), ROLE.output, 'primary')] },
      { narration: 'Further out the curve flattens. At x = 1 the best-fitting circle (red, centred at (−1, 2.5)) is much bigger, radius 2√2 ≈ 2.83, so κ = 1 ÷ 2.83 ≈ 0.354: gentler bend, smaller curvature.', objects: [circle(at[1], ROLE.input), dot(S(1, curvF(1)), ROLE.input, 0.1), label('x = 1: curvature 0.354', P(1.8, -0.5), ROLE.input, 'primary')] },
      { narration: 'Each circle is centred along the NORMAL to the curve, a distance R = 1/κ from the point of contact (violet radii). In formula terms κ = |y″| ÷ (1 + y′²)^(3/2): at x = 1 that is 1 ÷ 2^(3/2).', objects: [line(S(0, 0), S(...osculatingCentre(at[0])), ROLE.aid, 0.03), line(S(1, curvF(1)), S(...osculatingCentre(at[1])), ROLE.aid, 0.03), label('radius 1', P(-0.45, S(0, 0.5)[1] + 0.05), ROLE.aid, 'primary'), label('radius 2.83', P(S(-1, 0)[0] + 0.5, S(0, 3.7)[1]), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 12. Cartesian coordinates ────────────────────────────────────────────────

/** P = (−4, 3) in quadrant II, Q = (2, −3) in quadrant IV, R = (0, −2) on the y-axis. Drawn at 0.8 per unit. */
export const XYC = { u: 0.8, p: [-4, 3], q: [2, -3], r: [0, -2] } as const

/** KG: the pair (x, y) gives a point's signed distances from the y-axis (x) and from the x-axis (y). */
export function buildXyCoordinatesScene(): SceneSpec {
  return framed(raw_buildXyCoordinatesScene())
}
function raw_buildXyCoordinatesScene(): SceneSpec {
  const { u, p, q, r } = XYC
  const S = (x: number, y: number): V3 => P(x * u, y * u)
  return {
    id: 'math-xy-coordinates',
    title: 'Cartesian coordinates: signed distances from the axes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show (x, y) as signed distances: x is how far a point is from the y-axis (negative on the left) and y how far from the x-axis (negative below); P(−4, 3) is 4 left and 3 up, Q(2, −3) is 2 right and 3 down, and a point on the y-axis has x = 0.',
    ariaLabel:
      'A coordinate grid. The point P at minus 4, 3 has a horizontal dashed line of length 4 to the y-axis, on its right, and a vertical dashed line of length 3 down to the x-axis. The point Q at 2, minus 3 has a dashed line of length 2 to the y-axis on its left and one of length 3 up to the x-axis. The point R at 0, minus 2 lies on the y-axis, so its x coordinate is 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The pair (x, y) locates a point by SIGNED distances. x = distance from the y-axis, negative if the point is to the left; y = distance from the x-axis, negative if below. P is 4 to the left of the y-axis and 3 above the x-axis: P = (−4, 3).', objects: [...gridLines(-5, 5, -4, 4, S), ...mathAxes(S, -5.4, 5.4, -4.4, 4.4), dot(S(...p), ROLE.result, 0.12), guide(S(...p), S(0, p[1]), ROLE.output, 0.03), guide(S(...p), S(p[0], 0), ROLE.input, 0.03), label('x = −4: 4 left', P(S(-2, 0)[0], S(0, 3)[1] + 0.4), ROLE.output, 'primary'), label('y = 3: 3 up', P(S(p[0], 0)[0] - 0.9, S(0, 1.5)[1]), ROLE.input, 'primary')] },
      { narration: 'Q is 2 to the RIGHT of the y-axis (x positive) and 3 BELOW the x-axis (y negative): Q = (2, −3). The signs of (x, y) tell the quadrant: P is in II (−, +), Q in IV (+, −).', objects: [dot(S(...q), ROLE.result, 0.12), guide(S(...q), S(0, q[1]), ROLE.output, 0.03), guide(S(...q), S(q[0], 0), ROLE.input, 0.03), label('Q: 2 right, 3 down', P(S(q[0], q[1])[0] + 0.5, S(q[0], q[1])[1] - 0.5), ROLE.result, 'primary')] },
      { narration: 'A point ON the y-axis is 0 from it: R = (0, −2) has x = 0 and sits 2 below the origin. Every point of the plane has exactly one such pair, and every pair names exactly one point.', objects: [dot(S(...r), ROLE.aid, 0.12), label('R on the y-axis: x is 0', P(S(r[0], r[1])[0] + 1.5, S(r[0], r[1])[1] - 0.45), ROLE.aid, 'primary')] },
    ],
  }
}
