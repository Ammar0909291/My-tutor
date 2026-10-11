/**
 * Core school-mathematics figures — batch 5 of the mathematics visual campaign
 * (2026-10-11): trigonometry and algebra.
 *
 * The unit circle (functions and Pythagorean identities), the laws of sines and
 * cosines, Euler's formula, completing the square, the discriminant, the remainder
 * and factor theorems, polynomial and rational expressions, and inequalities on a
 * number line. Same rules as batches 1-4: one visual language from visualDesign.ts,
 * labels are names not sentences (marks of 1-2 characters are free), steps are
 * cumulative, coordinates stay inside +-5, at most 50 objects per step, and every
 * number drawn comes from the constants and pure helpers exported here, which the
 * test file re-derives independently from the DRAWN coordinates.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid, slate
 * is axes and inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, axes2, polyLines, shadeConvex, arcPts, rightAngleMark, type XY, type V3 } from './mathSceneKit'

const minus = (n: number) => (n < 0 ? `−${-n}` : `${n}`)
const rad = (deg: number) => (deg * Math.PI) / 180
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const circle = (cx: number, cy: number, r: number, color: string): SceneObject => curve(arcPts(cx, cy, r, 0, 360, 96), color)
/** An open (hollow) point: a small ring. */
const ring = (x: number, y: number, color: string, r = 0.13): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)

// ── 1. Trigonometric functions ───────────────────────────────────────────────

/** Unit circle drawn with radius R screen units about (cx, cy); angle 50 degrees. */
export const TRIG = { R: 2.3, cx: -1.0, cy: -0.2, deg: 50 } as const
export const trigValues = (deg: number) => ({ cos: Math.cos(rad(deg)), sin: Math.sin(rad(deg)), tan: Math.tan(rad(deg)) })

/** KG: "The functions sin(x), cos(x), tan(x), etc. defined for all real x via the unit circle; periodic with period 2π (or π for tan)." */
export function buildTrigFunctionsScene(): SceneSpec {
  return framed(raw_buildTrigFunctionsScene())
}
function raw_buildTrigFunctionsScene(): SceneSpec {
  const { R, cx, cy, deg } = TRIG
  const { cos, sin, tan } = trigValues(deg)
  const px = cx + R * cos, py = cy + R * sin
  return {
    id: 'math-trig-functions',
    title: 'Trigonometric functions on the unit circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show sin, cos and tan of an angle as lengths read off the unit circle: cos is the horizontal coordinate of the point at that angle, sin the vertical coordinate, and tan the length cut off on the tangent line at (1, 0).',
    ariaLabel:
      'A unit circle with an angle of 50 degrees from the positive x-axis. The point P at that angle has horizontal coordinate cos 50 degrees, about 0.64, and vertical coordinate sin 50 degrees, about 0.77. A vertical line tangent to the circle at (1, 0) meets the extended radius at height tan 50 degrees, about 1.19.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'On the unit circle (radius 1), an angle θ is measured from the positive x-axis, counter-clockwise. Here θ = 50°. The radius to the point P makes this angle.',
        objects: [...axes2(cx, cy, cx - R - 0.5, cx + R + 0.6, cy - R - 0.5, cy + R + 0.6), circle(cx, cy, R, ROLE.ink), line(P(cx, cy), P(px, py), ROLE.ink, 0.05), curve(arcPts(cx, cy, 0.7, 0, deg, 20), ROLE.aid), label(`θ = ${deg}°`, P(cx + 1.5, cy + 0.62), ROLE.aid, 'primary')],
      },
      {
        narration: 'The point P = (cos θ, sin θ). Its horizontal distance from the centre is cos θ ≈ 0.64 and its height is sin θ ≈ 0.77.',
        objects: [line(P(cx, cy), P(px, cy), ROLE.input, 0.07), line(P(px, cy), P(px, py), ROLE.output, 0.07), dot(P(px, py), ROLE.result, 0.15), label(`cos θ = ${f2(cos)}`, P(cx + (R * cos) / 2, cy - 0.45), ROLE.input, 'primary'), label(`sin θ = ${f2(sin)}`, P(px + 0.95, cy + (R * sin) / 2 - 0.1), ROLE.output, 'primary'), label('P (cos θ, sin θ)', P(px - 0.1, py + 0.5), ROLE.result, 'detail')],
      },
      {
        narration: 'Draw the tangent line at (1, 0) and extend the radius until it meets it. The height where it meets is tan θ = sin θ ÷ cos θ ≈ 1.19. The values repeat every full turn (every 360°, or 2π).',
        objects: [line(P(cx + R, cy - 0.6), P(cx + R, cy + R * tan + 0.5), ROLE.reference, 0.03), line(P(px, py), P(cx + R, cy + R * tan), ROLE.ink, 0.03), line(P(cx + R, cy), P(cx + R, cy + R * tan), ROLE.aid, 0.07), label(`tan θ = ${f2(tan)}`, P(cx + R + 1.3, cy + (R * tan) / 2), ROLE.aid, 'primary')],
      },
    ],
  }
}

// ── 2. Pythagorean identities ────────────────────────────────────────────────

/** cos = 0.8 and sin = 0.6 (a 3-4-5 triangle), so tan = 0.75 and sec = 1.25. */
export const PYID = { R: 2.2, cx: -1.4, cy: -0.6, cos: 0.8, sin: 0.6 } as const

/** KG: "sin²x + cos²x = 1, 1 + tan²x = sec²x, 1 + cot²x = csc²x; all derived from x² + y² = 1 on the unit circle." */
export function buildPythagoreanIdentitiesScene(): SceneSpec {
  return framed(raw_buildPythagoreanIdentitiesScene())
}
function raw_buildPythagoreanIdentitiesScene(): SceneSpec {
  const { R, cx, cy, cos, sin } = PYID
  const r4 = (n: number) => Math.round(n * 1e4) / 1e4
  const tan = r4(sin / cos), sec = r4(1 / cos)
  const px = cx + R * cos, py = cy + R * sin
  return {
    id: 'math-pythagorean-identities',
    title: 'Pythagorean identities from the unit circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that sin²θ + cos²θ = 1 is Pythagoras on the unit circle, and that scaling that triangle so its adjacent side is 1 gives 1 + tan²θ = sec²θ.',
    ariaLabel:
      'A right triangle inside the unit circle with hypotenuse 1 (the radius), adjacent side cos theta equals 0.8 and opposite side sin theta equals 0.6. Pythagoras gives 0.36 plus 0.64 equals 1. Scaling the triangle so the adjacent side is 1 gives opposite side tan theta equals 0.75 and hypotenuse sec theta equals 1.25, and 1 plus 0.5625 equals 1.5625, which is 1.25 squared.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Take a point P on the unit circle. The radius to P is 1. Dropping a vertical from P makes a right triangle with legs cos θ (0.8 here) and sin θ (0.6).',
        objects: [...axes2(cx, cy, cx - R - 0.4, cx + R + 0.9, cy - R - 0.4, cy + R + 0.4), circle(cx, cy, R, ROLE.ink), line(P(cx, cy), P(px, py), ROLE.ink, 0.05), line(P(cx, cy), P(px, cy), ROLE.input, 0.07), line(P(px, cy), P(px, py), ROLE.output, 0.07), dot(P(px, py), ROLE.result, 0.14), label('1', P(cx + (R * cos) / 2 - 0.3, cy + (R * sin) / 2 + 0.3), ROLE.ink, 'primary'), label(`cos θ = ${cos}`, P(cx + (R * cos) / 2, cy - 0.45), ROLE.input, 'detail'), label(`sin θ = ${sin}`, P(px + 0.95, cy + (R * sin) / 2), ROLE.output, 'detail')],
      },
      {
        narration: 'This is a right triangle with hypotenuse 1, so Pythagoras gives cos²θ + sin²θ = 1. Check: 0.64 + 0.36 = 1. This is true for every angle.',
        objects: [label('sin²θ + cos²θ = 0.36 + 0.64 = 1', P(cx + 0.9, cy - R - 0.95), ROLE.result, 'primary')],
      },
      {
        narration: 'Divide everything by cos²θ. The triangle scales up until its adjacent side is 1: the opposite side becomes tan θ = 0.75 and the hypotenuse sec θ = 1.25. Pythagoras again: 1 + tan²θ = sec²θ, and 1 + 0.5625 = 1.5625 = 1.25².',
        objects: [line(P(px, cy), P(cx + R, cy), ROLE.aid, 0.07), line(P(cx + R, cy), P(cx + R, cy + R * tan), ROLE.aid, 0.07), line(P(px, py), P(cx + R, cy + R * tan), ROLE.aid, 0.035), label('1', P(cx + R - 0.3, cy - 0.45), ROLE.aid, 'primary'), label(`tan θ = ${tan}`, P(cx + R + 1.15, cy + (R * tan) / 2), ROLE.aid, 'detail'), label(`sec θ = ${sec}`, P(cx + R * 0.5 + 0.2, cy + R * tan * 0.8 + 0.5), ROLE.aid, 'detail'), label('1 + tan²θ = sec²θ', P(cx + 0.9, cy - R - 1.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 3. Law of sines ──────────────────────────────────────────────────────────

/** Triangle with angles A = 40, B = 60, C = 80 inscribed in a circle of radius R screen units; R = 5 in "length units". */
export const LOS = { R: 2.2, cy: 0.1, angles: { A: 40, B: 60, C: 80 }, units: 5 } as const
/** Vertex positions on the circle: arc AB = 2C, arc BC = 2A, going counter-clockwise from A at 90 degrees. */
export function losVertices(): { A: XY; B: XY; C: XY } {
  const { R, cy, angles } = LOS
  const a0 = 90, b0 = a0 + 2 * angles.C, c0 = b0 + 2 * angles.A
  const at = (d: number): XY => [R * Math.cos(rad(d)), cy + R * Math.sin(rad(d))]
  return { A: at(a0), B: at(b0), C: at(c0) }
}

/** KG: "For any triangle: a/sin A = b/sin B = c/sin C = 2R (circumradius)." */
export function buildLawOfSinesScene(): SceneSpec {
  return framed(raw_buildLawOfSinesScene())
}
function raw_buildLawOfSinesScene(): SceneSpec {
  const { R, cy, angles, units } = LOS
  const V = losVertices()
  const k = units / R                                      // length units per screen unit
  const side = (p: XY, q: XY) => Math.hypot(q[0] - p[0], q[1] - p[1]) * k
  const a = side(V.B, V.C), b = side(V.C, V.A), c = side(V.A, V.B)
  const mid = (p: XY, q: XY, out: number): XY => { const m: XY = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; const d = Math.hypot(m[0], m[1] - cy) || 1; return [m[0] + (out * m[0]) / d, m[1] + (out * (m[1] - cy)) / d] }
  const inward = (p: XY, t: number): XY => [p[0] * (1 - t), cy + (p[1] - cy) * (1 - t)]
  const ang = (deg: number, v: XY, name: 'A' | 'B' | 'C') => label(`${deg}°`, P(...inward(v, 0.3)), name === 'A' ? ROLE.input : name === 'B' ? ROLE.output : ROLE.aid, 'detail')
  const ratio = (s: number, deg: number) => Math.round((s / Math.sin(rad(deg))) * 100) / 100
  return {
    id: 'math-law-of-sines',
    title: 'Law of sines: a ÷ sin A = b ÷ sin B = c ÷ sin C = 2R',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that in any triangle each side divided by the sine of the opposite angle is the same number, the diameter 2R of the circle through the three corners.',
    ariaLabel:
      'A triangle ABC with angles 40, 60 and 80 degrees drawn inside its circumscribed circle of radius 5. Its sides are a = 6.43, b = 8.66 and c = 9.85. Dividing each side by the sine of its opposite angle gives 10 every time, which is the diameter 2R of the circle.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A triangle with angles A = 40°, B = 60° and C = 80°. Side a is opposite angle A, b opposite B, c opposite C.',
        objects: [...polyLines([V.A, V.B, V.C], ROLE.ink, 0.06), label('A', P(V.A[0], V.A[1] + 0.4), ROLE.ink, 'primary'), label('B', P(V.B[0] - 0.35, V.B[1] - 0.3), ROLE.ink, 'primary'), label('C', P(V.C[0] + 0.35, V.C[1] - 0.3), ROLE.ink, 'primary'), label('a', P(...mid(V.B, V.C, 0.3)), ROLE.input, 'primary'), label('b', P(...mid(V.C, V.A, 0.4)), ROLE.output, 'primary'), label('c', P(...mid(V.A, V.B, 0.4)), ROLE.aid, 'primary'), ang(angles.A, V.A, 'A'), ang(angles.B, V.B, 'B'), ang(angles.C, V.C, 'C')],
      },
      {
        narration: 'Divide each side by the sine of the angle opposite it: 6.43 ÷ sin 40°, 8.66 ÷ sin 60°, 9.85 ÷ sin 80°. Every one comes to 10.',
        objects: [label(`a ÷ sin A = ${ratio(a, angles.A)}`, P(0, cy - R - 1.0), ROLE.input, 'detail'), label(`b ÷ sin B = ${ratio(b, angles.B)}`, P(0, cy - R - 1.5), ROLE.output, 'detail'), label(`c ÷ sin C = ${ratio(c, angles.C)}`, P(0, cy - R - 2.0), ROLE.aid, 'detail')],
      },
      {
        narration: 'That common number is the diameter of the circle through all three corners, the circumcircle: 2R = 10. So a ÷ sin A = b ÷ sin B = c ÷ sin C = 2R.',
        objects: [circle(0, cy, R, ROLE.result), dot(P(0, cy), ROLE.result, 0.1), label(`= 2R = ${2 * units}`, P(2.2, cy + R + 0.5), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 4. Law of cosines ────────────────────────────────────────────────────────

/** Triangle with C at the origin, a = CB = 5 along +x, b = CA = 6 at C = 60 degrees. */
export const LOC = { u: 0.6, ox: -1.5, oy: -1.8, a: 5, b: 6, C: 60 } as const
export const lawOfCosinesC2 = (a: number, b: number, Cdeg: number) => a * a + b * b - 2 * a * b * Math.cos(rad(Cdeg))

/** KG: "c² = a² + b² − 2ab cosC; generalizes the Pythagorean theorem to arbitrary triangles; enables solving SSS and SAS configurations." */
export function buildLawOfCosinesScene(): SceneSpec {
  return framed(raw_buildLawOfCosinesScene())
}
function raw_buildLawOfCosinesScene(): SceneSpec {
  const { u, ox, oy, a, b, C } = LOC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const B: XY = [a, 0], A: XY = [b * Math.cos(rad(C)), b * Math.sin(rad(C))], A90: XY = [0, b]
  const c2 = lawOfCosinesC2(a, b, C)
  return {
    id: 'math-law-of-cosines',
    title: 'Law of cosines: c² = a² + b² − 2ab cos C',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the law of cosines as Pythagoras with a correction: if the angle C were 90 degrees, c squared would be a squared plus b squared, and a smaller angle takes away 2ab cos C.',
    ariaLabel:
      'A triangle with sides a = 5 and b = 6 meeting at an angle C of 60 degrees. If C were 90 degrees the third side would satisfy c squared equals 25 plus 36, which is 61. At 60 degrees the correction 2 times 5 times 6 times cos 60, which is 30, is subtracted: c squared is 31, so c is about 5.57.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Two sides a = 5 and b = 6 meet at the angle C = 60°. The third side c is opposite C. How long is it?',
        objects: [line(S(0, 0), S(B[0], B[1]), ROLE.ink, 0.06), line(S(0, 0), S(A[0], A[1]), ROLE.ink, 0.06), line(S(B[0], B[1]), S(A[0], A[1]), ROLE.output, 0.06), curve(arcPts(ox, oy, 0.6, 0, C, 16), ROLE.aid), label('C = 60°', S(1.6, 0.9), ROLE.aid, 'detail'), label(`a = ${a}`, S(2.5, -0.55), ROLE.ink, 'detail'), label(`b = ${b}`, S(-0.75, 3.2), ROLE.ink, 'detail'), label('c', S(4.6, 3.1), ROLE.output, 'primary')],
      },
      {
        narration: 'If the angle were 90°, Pythagoras would give c² = a² + b² = 25 + 36 = 61, a long third side (about 7.81).',
        objects: [line(S(0, 0), S(A90[0], A90[1]), ROLE.reference, 0.03), line(S(B[0], B[1]), S(A90[0], A90[1]), ROLE.reference, 0.03), ...rightAngleMark(ox, oy, [1, 0], [0, 1], 0.3, ROLE.reference), label('if C = 90°: c² = 61', S(-1.6, 6.4), ROLE.reference, 'detail')],
      },
      {
        narration: 'But C is only 60°, so the far corner is pulled in. The law of cosines subtracts the correction 2ab cos C = 2 · 5 · 6 · 0.5 = 30: c² = 61 − 30 = 31, so c ≈ 5.57.',
        objects: [label(`c² = a² + b² − 2ab cos C = ${c2.toFixed(0)}`, S(3.4, -1.6), ROLE.result, 'primary'), label(`c ≈ ${Math.sqrt(c2).toFixed(2)}`, S(5.2, 4.0), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 5. Euler's formula ───────────────────────────────────────────────────────

export const EULER = { R: 2.2, cx: -0.8, cy: -0.2, deg: 60 } as const

/** KG: "e^(iθ) = cos θ + i sin θ; at θ = π: e^(iπ) + 1 = 0 (Euler's identity)." */
export function buildEulersFormulaScene(): SceneSpec {
  return framed(raw_buildEulersFormulaScene())
}
function raw_buildEulersFormulaScene(): SceneSpec {
  const { R, cx, cy, deg } = EULER
  const px = cx + R * Math.cos(rad(deg)), py = cy + R * Math.sin(rad(deg))
  return {
    id: 'math-eulers-formula',
    title: "Euler's formula: e^(iθ) = cos θ + i sin θ",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show e^(i theta) as the point on the unit circle in the complex plane at angle theta, with real part cos theta and imaginary part sin theta, and e^(i pi) = -1 as the half-turn.',
    ariaLabel:
      'The complex plane with a unit circle. The number e to the i theta is the point at angle theta: its real part is cos theta and its imaginary part is sin theta. Turning theta up to pi, half a circle, lands on the point minus 1, so e to the i pi equals minus 1, and e to the i pi plus 1 equals 0.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'In the complex plane the horizontal axis is the real part and the vertical axis is the imaginary part. e^(iθ) is the point on the unit circle at angle θ (here 60°).',
        objects: [...axes2(cx, cy, cx - R - 0.5, cx + R + 0.6, cy - R - 0.5, cy + R + 0.6), label('Re', P(cx + R + 0.6, cy - 0.35), ROLE.reference, 'detail'), label('Im', P(cx + 0.4, cy + R + 0.65), ROLE.reference, 'detail'), circle(cx, cy, R, ROLE.ink), line(P(cx, cy), P(px, py), ROLE.ink, 0.05), curve(arcPts(cx, cy, 0.7, 0, deg, 16), ROLE.aid), label(`θ = ${deg}°`, P(cx + 1.35, cy + 0.3), ROLE.aid, 'detail'), dot(P(px, py), ROLE.result, 0.15), label('e^(iθ)', P(px + 0.1, py + 0.5), ROLE.result, 'primary')],
      },
      {
        narration: 'Its real part is cos θ and its imaginary part is sin θ: e^(iθ) = cos θ + i sin θ. This joins the exponential and the trigonometric functions.',
        objects: [line(P(cx, cy), P(px, cy), ROLE.input, 0.07), line(P(px, cy), P(px, py), ROLE.output, 0.07), label('cos θ', P((cx + px) / 2, cy - 0.45), ROLE.input, 'detail'), label('i sin θ', P(px + 0.85, (cy + py) / 2), ROLE.output, 'detail'), label('e^(iθ) = cos θ + i sin θ', P(cx, cy - R - 0.85), ROLE.result, 'primary')],
      },
      {
        narration: 'Turn θ all the way to π (half a circle, 180°): the point lands on −1. So e^(iπ) = −1, and moving the −1 across gives Euler’s identity e^(iπ) + 1 = 0.',
        objects: [curve(arcPts(cx, cy, R + 0.3, 0, 180, 40), ROLE.aid), label('θ = π', P(cx, cy + R + 0.75), ROLE.aid, 'detail'), dot(P(cx - R, cy), ROLE.result, 0.17), label('e^(iπ) = −1', P(cx - R + 0.2, cy - 0.6), ROLE.result, 'detail'), label('e^(iπ) + 1 = 0', P(cx, cy - R - 1.5), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 6. Completing the square ─────────────────────────────────────────────────

/** x = 4 drawn at u screen units per unit; strips of width 3, so x² + 6x + 9 = (x + 3)². */
export const CTS = { u: 0.45, x: 4, h: 3 } as const

/** KG: "Rewriting ax² + bx + c by adding and subtracting (b/2a)² to form a perfect square trinomial; yields vertex form." */
export function buildCompletingTheSquareScene(): SceneSpec {
  return framed(raw_buildCompletingTheSquareScene())
}
function raw_buildCompletingTheSquareScene(): SceneSpec {
  const { u, x, h } = CTS
  const total = (x + h) * u
  const ox = -total / 2, oy = -total / 2
  const R = (x0: number, y0: number, x1: number, y1: number): XY[] => [[ox + x0 * u, oy + y0 * u], [ox + x1 * u, oy + y0 * u], [ox + x1 * u, oy + y1 * u], [ox + x0 * u, oy + y1 * u]]
  const fillRect = (poly: XY[], color: string) => [...shadeConvex(poly, 0.17, color, 0.02), ...polyLines(poly, color, 0.04)]
  const cx = (a: number, b: number) => ox + ((a + b) / 2) * u
  return {
    id: 'math-completing-the-square',
    title: 'Completing the square: x² + 6x + 9 = (x + 3)²',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show completing the square as a picture: an x by x square plus two strips of 3 by x is an L-shape, and adding a 3 by 3 corner (9) completes a bigger square of side x + 3.',
    ariaLabel:
      'A square of side x, drawn with x equal to 4, and two strips of width 3 along two of its sides: together x squared plus 3x plus 3x, which is x squared plus 6x. The missing corner is a 3 by 3 square of area 9. Adding it completes a square of side x plus 3, so x squared plus 6x plus 9 equals (x plus 3) squared, and x squared plus 6x equals (x plus 3) squared minus 9.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'x² + 6x as areas: a square of side x, plus two strips each 3 wide and x long (3x + 3x = 6x). Here x is drawn as 4.',
        objects: [...fillRect(R(0, 0, x, x), ROLE.output), ...fillRect(R(x, 0, x + h, x), ROLE.input), ...fillRect(R(0, x, x, x + h), ROLE.input), label('x²', P(cx(0, x), oy + (x / 2) * u), ROLE.ink, 'primary'), label('3x', P(cx(x, x + h), oy + (x / 2) * u), ROLE.ink, 'primary'), label('3x', P(cx(0, x), oy + (x + h / 2) * u), ROLE.ink, 'primary'), label(`drawn with x = ${x}`, P(0, oy - 0.55), ROLE.reference, 'detail')],
      },
      {
        narration: 'There is a missing corner, 3 by 3 = 9. Add it and the pieces make one big square with side x + 3: that is “completing the square”.',
        objects: [...fillRect(R(x, x, x + h, x + h), ROLE.aid), label('9', P(cx(x, x + h), oy + (x + h / 2) * u), ROLE.ink, 'primary')],
      },
      {
        narration: 'So x² + 6x + 9 = (x + 3)². Move the 9 across: x² + 6x = (x + 3)² − 9. That form tells you the lowest point of y = x² + 6x is at x = −3, y = −9.',
        objects: [label('x² + 6x + 9 = (x + 3)²', P(0, oy - 1.2), ROLE.result, 'primary'), label('x² + 6x = (x + 3)² − 9', P(0, oy - 1.8), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 7. Discriminant ──────────────────────────────────────────────────────────

/** y = x² − 2x + c for c = −3, 1, 4: discriminant b² − 4ac = 4 − 4c = 16, 0, −12. */
export const DISC = { u: 0.45, ox: -0.5, oy: -1.62, a: 1, b: -2, cs: [-3, 1, 4] } as const
export const discriminant = (a: number, b: number, c: number) => b * b - 4 * a * c
export const discF = (x: number, c: number) => DISC.a * x * x + DISC.b * x + c

/** KG: "The expression b² − 4ac: positive → two real roots, zero → one repeated root, negative → two complex roots." */
export function buildDiscriminantScene(): SceneSpec {
  return framed(raw_buildDiscriminantScene())
}
function raw_buildDiscriminantScene(): SceneSpec {
  const { u, ox, oy, a, b, cs } = DISC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const d = cs.map((c) => discriminant(a, b, c))
  return {
    id: 'math-discriminant',
    title: 'Discriminant b² − 4ac: how many times the parabola meets the axis',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the sign of b squared minus 4ac decides whether y = ax² + bx + c crosses the x-axis twice (positive), touches it once (zero) or never (negative).',
    ariaLabel:
      'Three parabolas y equals x squared minus 2x plus c, the same shape at different heights. With c equal to minus 3 the discriminant is 16, positive, and the curve crosses the x-axis twice at x equals minus 1 and 3. With c equal to 1 the discriminant is 0 and the curve just touches the x-axis at x equals 1. With c equal to 4 the discriminant is minus 12, negative, and the curve stays above the axis: no real roots.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'y = x² − 2x − 3 (a = 1, b = −2, c = −3). Its discriminant b² − 4ac = 4 + 12 = 16 is positive: the curve crosses the x-axis twice, at x = −1 and x = 3. Two real roots.',
        objects: [...mathAxes(S, -2.2, 4.4, -2.4, 9.6), curve(sampleMapped((x) => discF(x, cs[0]), -1.5, 3.5, S, 56), ROLE.output), dot(S(-1, 0), ROLE.result, 0.13), dot(S(3, 0), ROLE.result, 0.13), label('b² − 4ac', P(3.0, 1.55), ROLE.reference, 'primary'), label(`${d[0]} > 0: two real roots`, P(3.0, 0.95), ROLE.output, 'detail')],
      },
      {
        narration: 'Lift the curve to y = x² − 2x + 1 (c = 1): b² − 4ac = 4 − 4 = 0. It just touches the x-axis at x = 1: one repeated root.',
        objects: [curve(sampleMapped((x) => discF(x, cs[1]), -1.5, 3.5, S, 56), ROLE.result), dot(S(1, 0), ROLE.result, 0.14), label(`${d[1]}: one repeated root`, P(3.0, 0.4), ROLE.result, 'detail')],
      },
      {
        narration: 'Lift it again, y = x² − 2x + 4 (c = 4): b² − 4ac = 4 − 16 = −12 is negative. The curve floats above the x-axis and never meets it: no real roots (the two roots are complex).',
        objects: [curve(sampleMapped((x) => discF(x, cs[2]), -1.5, 3.5, S, 56), ROLE.input), label(`${minus(d[2])} < 0: no real roots`, P(3.0, -0.15), ROLE.input, 'detail')],
      },
    ],
  }
}

// ── 8 & 9. Remainder theorem and factor theorem ──────────────────────────────

/** p(x) = x² − x − 6 = (x − 3)(x + 2). */
export const POLY = { u: 0.5, ox: -0.25, oy: 0, a: 1 } as const
export const polyP = (x: number) => x * x - x - 6
/** Quotient and remainder of p(x) ÷ (x − a) by synthetic division; coefficients of x² − x − 6. */
export function syntheticDivide(a: number): { quotient: number[]; remainder: number } {
  const coeffs = [1, -1, -6]
  const out: number[] = []
  let carry = 0
  for (const c of coeffs) { carry = c + carry * a; out.push(carry) }
  return { quotient: out.slice(0, -1), remainder: out[out.length - 1] }
}

/** KG: "When a polynomial p(x) is divided by (x − a), the remainder equals p(a)." */
export function buildRemainderTheoremScene(): SceneSpec {
  return framed(raw_buildRemainderTheoremScene())
}
function raw_buildRemainderTheoremScene(): SceneSpec {
  const { u, ox, oy, a } = POLY
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const { quotient, remainder } = syntheticDivide(a)
  return {
    id: 'math-remainder-theorem',
    title: 'Remainder theorem: the remainder is p(a)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that dividing p(x) by (x - a) leaves the remainder p(a), the height of the graph at x = a.',
    ariaLabel:
      'The graph of p of x equals x squared minus x minus 6. Dividing by x minus 1 gives quotient x and remainder minus 6, so p of x equals (x minus 1) times x minus 6. At x equal to 1 the first term is zero, so the graph is at height minus 6, which equals the remainder: p of 1 equals minus 6.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The polynomial p(x) = x² − x − 6. Divide it by (x − 1).',
        objects: [...mathAxes(S, -3.4, 4.4, -7.4, 7.4), curve(sampleMapped(polyP, -3, 4, S, 64), ROLE.ink), label('p(x) = x² − x − 6', S(3.6, 7.0), ROLE.ink, 'primary')],
      },
      {
        narration: 'Long division gives quotient x and remainder −6: p(x) = (x − 1)·x + (−6).',
        objects: [label(`p(x) = (x − ${a})·${quotient[0] === 1 ? 'x' : quotient[0]} ${remainder < 0 ? '−' : '+'} ${Math.abs(remainder)}`, S(-0.4, -7.2), ROLE.aid, 'primary')],
      },
      {
        narration: 'Now put x = 1: the term (x − 1)·x becomes 0, so p(1) is just the remainder. The graph at x = 1 is at height −6. The remainder equals p(a).',
        objects: [guide(S(a, 0), S(a, polyP(a)), ROLE.input, 0.03), dot(S(a, polyP(a)), ROLE.result, 0.15), label(`p(${a}) = ${minus(polyP(a))} = remainder`, S(a + 3.0, polyP(a) - 0.2), ROLE.result, 'primary')],
      },
    ],
  }
}

/** KG: "(x − a) is a factor of p(x) iff p(a) = 0; the remainder theorem at zero remainder." */
export function buildFactorTheoremScene(): SceneSpec {
  return framed(raw_buildFactorTheoremScene())
}
function raw_buildFactorTheoremScene(): SceneSpec {
  const { u, ox, oy } = POLY
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-factor-theorem',
    title: 'Factor theorem: (x − a) is a factor exactly when p(a) = 0',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that (x - a) divides p(x) with no remainder exactly when p(a) = 0, that is, when the graph crosses the x-axis at x = a.',
    ariaLabel:
      'The graph of p of x equals x squared minus x minus 6. It meets the x-axis at x equal to 3 and minus 2: p of 3 is 0 and p of minus 2 is 0, so x minus 3 and x plus 2 are factors, and p of x equals (x minus 3)(x plus 2). At x equal to 1 the graph is at minus 6, not 0, so x minus 1 is not a factor.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The same p(x) = x² − x − 6. By the remainder theorem, dividing by (x − a) leaves p(a). If p(a) = 0 the remainder is zero: (x − a) is a factor.',
        objects: [...mathAxes(S, -3.4, 4.4, -7.4, 7.4), curve(sampleMapped(polyP, -3, 4, S, 64), ROLE.ink), label('p(x) = x² − x − 6', S(3.6, 7.0), ROLE.ink, 'primary')],
      },
      {
        narration: 'p(3) = 9 − 3 − 6 = 0 and p(−2) = 4 + 2 − 6 = 0. The graph meets the x-axis there, so (x − 3) and (x + 2) are factors.',
        objects: [dot(S(3, 0), ROLE.result, 0.15), dot(S(-2, 0), ROLE.result, 0.15), label('p(3) = 0', S(3.4, 1.1), ROLE.result, 'detail'), label('p(−2) = 0', S(-2.6, 1.1), ROLE.result, 'detail'), label('p(x) = (x − 3)(x + 2)', S(0.5, -7.6), ROLE.result, 'primary')],
      },
      {
        narration: 'Test another: p(1) = 1 − 1 − 6 = −6, not 0, so the graph is not on the axis there and (x − 1) is not a factor (it leaves the remainder −6).',
        objects: [guide(S(1, 0), S(1, polyP(1)), ROLE.input, 0.03), dot(S(1, polyP(1)), ROLE.input, 0.15), label('p(1) = −6 ≠ 0: not a factor', S(3.3, polyP(1) - 1.0), ROLE.input, 'detail')],
      },
    ],
  }
}

// ── 10. Polynomial inequality ────────────────────────────────────────────────

/** p(x) = (x + 1)(x - 1)(x - 3) = x³ - 3x² - x + 3 on x in [-1.4, 3.4]. */
export const PINEQ = { u: 0.55, ox: -0.55, oy: 0, roots: [-1, 1, 3] } as const
export const pineqP = (x: number) => (x + 1) * (x - 1) * (x - 3)

/** KG: "Inequality p(x) > 0 solved by finding roots, constructing a sign chart, and identifying intervals where the polynomial has the required sign." */
export function buildPolynomialInequalityScene(): SceneSpec {
  return framed(raw_buildPolynomialInequalityScene())
}
function raw_buildPolynomialInequalityScene(): SceneSpec {
  const { u, ox, oy, roots } = PINEQ
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const x0 = -1.4, x1 = 3.4, chartY = -4.2
  const seg = (a: number, b: number, y: number, color: string) => line(S(a, y), S(b, y), color, 0.12)
  const bounds = [x0, ...roots, x1]
  const signs = [-1, 1, -1, 1]
  return {
    id: 'math-polynomial-inequality',
    title: 'Polynomial inequality: p(x) > 0 from a sign chart',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to solve p(x) > 0: find the roots, record the sign of p on each interval between them (it flips at each simple root), and read off the intervals where p is positive.',
    ariaLabel:
      'The graph of p of x equals (x plus 1)(x minus 1)(x minus 3) with roots at minus 1, 1 and 3. A sign chart shows p negative left of minus 1, positive between minus 1 and 1, negative between 1 and 3, and positive right of 3. So p of x is greater than 0 when x is between minus 1 and 1, or when x is greater than 3.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Solve p(x) > 0 for p(x) = (x + 1)(x − 1)(x − 3). First find the roots, where p(x) = 0: x = −1, 1 and 3.',
        objects: [...mathAxes(S, -1.9, 3.9, -5.6, 5.6), curve(sampleMapped(pineqP, x0, x1, S, 64), ROLE.ink), ...roots.map((r) => dot(S(r, 0), ROLE.aid, 0.13)), ...roots.map((r) => label(minus(r), S(r, -0.7), ROLE.aid, 'detail')), label('p(x) = (x + 1)(x − 1)(x − 3)', S(1.0, 6.2), ROLE.ink, 'primary')],
      },
      {
        narration: 'The roots cut the line into four intervals, and p keeps one sign inside each. Test one point per interval: the signs alternate − + − +.',
        objects: [...bounds.slice(0, -1).flatMap((lo, i) => [seg(lo + 0.04, bounds[i + 1] - 0.04, chartY, signs[i] > 0 ? ROLE.result : ROLE.input), label(signs[i] > 0 ? '+' : '−', S((lo + bounds[i + 1]) / 2, chartY - 0.8), signs[i] > 0 ? ROLE.result : ROLE.input, 'primary')]), label('sign of p', S(-1.6, chartY + 0.8), ROLE.reference, 'detail')],
      },
      {
        narration: 'p(x) > 0 on the + intervals: −1 < x < 1, or x > 3. The roots themselves are not included (p = 0 there, which is not greater than 0).',
        objects: [line(S(-1, 0), S(1, 0), ROLE.result, 0.12), line(S(3, 0), S(x1, 0), ROLE.result, 0.12), ...roots.map((r) => ring(r * u + ox, oy, ROLE.result, 0.16)), label('p(x) > 0: −1 < x < 1 or x > 3', S(1.2, -6.4), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 11. Rational expressions ─────────────────────────────────────────────────

export const RATX = { u: 0.5, oy: -1.5, hole: [3, 6] as XY } as const
export const ratF = (x: number) => (x * x - 9) / (x - 3)

/** KG: "Fractions p(x)/q(x) where p and q are polynomials with q ≠ 0; simplified by factoring and canceling common factors." */
export function buildRationalExpressionsScene(): SceneSpec {
  return framed(raw_buildRationalExpressionsScene())
}
function raw_buildRationalExpressionsScene(): SceneSpec {
  const { u, oy, hole } = RATX
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const gap = 0.35
  return {
    id: 'math-rational-expressions',
    title: 'Rational expressions: factor, cancel, and mind the hole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that simplifying (x² − 9)/(x − 3) by factoring and cancelling gives x + 3, but only for x ≠ 3, so the graph is the line y = x + 3 with a hole at (3, 6).',
    ariaLabel:
      'The fraction x squared minus 9 over x minus 3. Factoring the top gives (x minus 3)(x plus 3), and cancelling x minus 3 leaves x plus 3. The graph is the line y equals x plus 3, with a hole at the point (3, 6) because the original fraction is not defined when x equals 3.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Simplify (x² − 9) ÷ (x − 3). Factor the top as a difference of squares: x² − 9 = (x − 3)(x + 3).',
        objects: [...mathAxes(S, -5, 5, -2, 8.6), label('(x² − 9) ÷ (x − 3)', S(-2.6, 7.7), ROLE.input, 'primary'), label('= (x − 3)(x + 3) ÷ (x − 3)', S(-1.6, 6.5), ROLE.aid, 'primary')],
      },
      {
        narration: 'Cancel the common factor (x − 3): what is left is x + 3. So the fraction equals the line y = x + 3 — everywhere except where x − 3 = 0.',
        objects: [line(S(-4.5, ratF(-4.5)), S(hole[0] - gap, ratF(hole[0] - gap)), ROLE.output, 0.07), line(S(hole[0] + gap, hole[1] + gap), S(4.5, 7.5), ROLE.output, 0.07), label('= x + 3', S(-2.6, 5.3), ROLE.output, 'primary')],
      },
      {
        narration: 'At x = 3 the original fraction would be 0 ÷ 0, which is undefined. So the graph has a hole at (3, 6): the line is the same as x + 3 except that one point is missing. Cancelling only works for x ≠ 3.',
        objects: [ring(hole[0] * u, hole[1] * u + oy, ROLE.input, 0.16), guide(S(hole[0], -1.4), S(hole[0], hole[1] - 0.4), ROLE.input, 0.025), label('hole at (3, 6): x ≠ 3', S(3.4, 2.0), ROLE.input, 'primary')],
      },
    ],
  }
}

// ── 12. Inequality (number line) ─────────────────────────────────────────────

/** Number line from -4 to 5 at u screen units per 1. Solutions: x > 2; x <= -1; -1 < x <= 3. */
export const INEQ = { u: 0.78, ox: -0.35, axisY: -2.0, rows: { gt: 1.9, le: 0.6, between: -0.7 } } as const

/** KG: "A statement that one expression is greater than or less than another; solutions form intervals or regions rather than isolated points." */
export function buildInequalityScene(): SceneSpec {
  return framed(raw_buildInequalityScene())
}
function raw_buildInequalityScene(): SceneSpec {
  const { u, ox, axisY, rows } = INEQ
  const X = (x: number) => x * u + ox
  const ticks: SceneObject[] = []
  for (let i = -4; i <= 5; i++) ticks.push(line(P(X(i), axisY - 0.12), P(X(i), axisY + 0.12), ROLE.reference, 0.035), label(minus(i), P(X(i), axisY - 0.5), ROLE.reference, 'detail'))
  const guideDown = (x: number, y: number, color: string) => guide(P(X(x), y - 0.18), P(X(x), axisY + 0.1), color, 0.02)
  return {
    id: 'math-inequality',
    title: 'Inequalities: solutions are whole intervals',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the solutions of an inequality are an interval on the number line: an open circle excludes the end value, a filled dot includes it, and a thick line marks all the solutions.',
    ariaLabel:
      'A number line from minus 4 to 5. The inequality x greater than 2 is an open circle at 2 and a thick line going right forever. The inequality x less than or equal to minus 1 is a filled dot at minus 1 and a thick line going left. The compound inequality minus 1 less than x less than or equal to 3 is an open circle at minus 1, a filled dot at 3 and a thick line between them.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'x > 2 means every number bigger than 2. The open circle at 2 says 2 itself is not included; the thick line goes right forever.',
        objects: [line(P(X(-4.4), axisY), P(X(5.4), axisY), ROLE.reference, 0.04), ...ticks, arrow(P(X(2), rows.gt), P(X(5.4), rows.gt), ROLE.result), ring(X(2), rows.gt, ROLE.result, 0.16), guideDown(2, rows.gt, ROLE.result), label('x > 2', P(X(3.8), rows.gt + 0.55), ROLE.result, 'primary')],
      },
      {
        narration: 'x ≤ −1 means −1 and everything below it. The filled dot at −1 says −1 is included; the thick line goes left forever.',
        objects: [arrow(P(X(-1), rows.le), P(X(-4.4), rows.le), ROLE.input), dot(P(X(-1), rows.le), ROLE.input, 0.16), guideDown(-1, rows.le, ROLE.input), label('x ≤ −1', P(X(-3), rows.le + 0.55), ROLE.input, 'primary')],
      },
      {
        narration: 'A compound inequality, −1 < x ≤ 3: numbers above −1 (open circle, not included) up to and including 3 (filled dot). The solutions are the thick segment between them.',
        objects: [line(P(X(-1), rows.between), P(X(3), rows.between), ROLE.output, 0.1), ring(X(-1), rows.between, ROLE.output, 0.16), dot(P(X(3), rows.between), ROLE.output, 0.16), guideDown(3, rows.between, ROLE.output), label('−1 < x ≤ 3', P(X(1), rows.between + 0.55), ROLE.output, 'primary')],
      },
    ],
  }
}
