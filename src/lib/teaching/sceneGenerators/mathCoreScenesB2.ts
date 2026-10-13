/**
 * Core school-mathematics figures — batch 2 of the mathematics visual campaign
 * (2026-10-11).
 *
 * Twelve concepts that had no figure: the coordinate plane, quadrants, the
 * midpoint formula, parallel lines, the converse of Pythagoras, the
 * parallelogram, and six function families. Same rules as batch 1
 * (mathCoreScenesB1.ts): one visual language from visualDesign.ts, labels are
 * names not sentences, steps are cumulative, coordinates stay inside +-5, and
 * EVERY number drawn is computed from the constants exported here, which the
 * test file re-derives independently.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid, slate
 * is axes and inert reference geometry. Labels of one or two characters ("x",
 * "-3", "I") are marks, not names (visualComplexity.isGlyphLabel), so axis
 * numbers do not use up the label budget.
 *
 * Graph figures place everything through one map S(x, y) from MATH coordinates to
 * screen coordinates, with an offset that centres the drawn extent on the origin
 * (the camera looks at the origin).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import {
  P, NO_STAGE, framed, sampleMapped, guide, axes2, mathAxes, polyLines, shadeConvex, arcPts, rightAngleMark, chevron, gridLines,
  type XY, type V3,
} from './mathSceneKit'

const minus = (n: number) => (n < 0 ? `−${-n}` : `${n}`)

// ── 1. Coordinate plane ──────────────────────────────────────────────────────

/** Unit length u screen units; grid x -4..4, y -3..3; two example points. */
export const CP = { u: 0.8, gx: 4, gy: 3, A: [3, 2], B: [-2, -3] } as const
const cpMap = (x: number, y: number): V3 => P(x * CP.u, y * CP.u)

/**
 * KG: "The plane R² with two perpendicular number lines (x-axis, y-axis)
 * intersecting at the origin, enabling algebraic representation of geometric
 * objects."
 */
export function buildCoordinatePlaneScene(): SceneSpec {
  return framed(raw_buildCoordinatePlaneScene())
}
function raw_buildCoordinatePlaneScene(): SceneSpec {
  const { u, gx, gy, A, B } = CP
  const S = cpMap
  const nums: SceneObject[] = []
  for (let x = -gx; x <= gx; x++) if (x !== 0) nums.push(label(minus(x), P(x * u, -0.3), ROLE.reference, 'detail'))
  for (let y = -gy; y <= gy; y++) if (y !== 0) nums.push(label(minus(y), P(-0.3, y * u), ROLE.reference, 'detail'))
  return {
    id: 'math-coordinate-plane',
    title: 'The coordinate plane: every point has an address (x, y)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two perpendicular number lines crossing at the origin, and that a point is located by going along x then up or down y, with negative numbers going left and down.',
    ariaLabel:
      'A grid with a horizontal x-axis and a vertical y-axis crossing at the origin (0, 0), numbered from minus 4 to 4 and minus 3 to 3. ' +
      'Point A at (3, 2) is reached by going 3 right and 2 up. Point B at (-2, -3) is reached by going 2 left and 3 down.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Two number lines cross at right angles: the x-axis goes across, the y-axis goes up. They meet at the origin, (0, 0).',
        objects: [
          ...gridLines(-gx, gx, -gy, gy, S), ...axes2(0, 0, -(gx + 0.5) * u, (gx + 0.5) * u, -(gy + 0.5) * u, (gy + 0.5) * u),
          label('x', P((gx + 0.5) * u, 0.3), ROLE.reference, 'detail'), label('y', P(0.3, (gy + 0.5) * u), ROLE.reference, 'detail'),
          ...nums, dot(P(0, 0), ROLE.ink, 0.1), label('origin (0, 0)', P(1.45, -0.85), ROLE.ink, 'detail'),
        ],
      },
      {
        narration: 'Every point has an address (x, y). To reach A: go along x first (3 to the right), then up y (2).',
        objects: [
          line(S(0, 0), S(A[0], 0), ROLE.input, 0.07), line(S(A[0], 0), S(A[0], A[1]), ROLE.output, 0.07),
          dot(S(A[0], A[1]), ROLE.ink, 0.14),
          label('A (3, 2)', P(A[0] * u + 0.3, A[1] * u + 0.45), ROLE.ink, 'primary'),
          label('3 right', P((A[0] * u) / 2, 0.42), ROLE.input, 'detail'), label('2 up', P(A[0] * u + 0.7, (A[1] * u) / 2), ROLE.output, 'detail'),
        ],
      },
      {
        narration: 'Negative numbers go the other way: left of the y-axis and below the x-axis. B is 2 left and 3 down, so B = (−2, −3).',
        objects: [
          line(S(0, 0), S(B[0], 0), ROLE.input, 0.07), line(S(B[0], 0), S(B[0], B[1]), ROLE.output, 0.07),
          dot(S(B[0], B[1]), ROLE.ink, 0.14),
          label('B (−2, −3)', P(B[0] * u - 0.1, B[1] * u - 0.5), ROLE.ink, 'primary'),
          label('2 left', P((B[0] * u) / 2, 0.42), ROLE.input, 'detail'), label('3 down', P(B[0] * u - 0.85, (B[1] * u) / 2), ROLE.output, 'detail'),
        ],
      },
    ],
  }
}

// ── 2. Quadrants ─────────────────────────────────────────────────────────────

export const QUAD = { u: 0.75, pts: { I: [3, 2], II: [-3, 2], III: [-3, -2], IV: [3, -2] } } as const
/** Quadrant of a point off the axes, from the signs of x and y. */
export function quadrantOf(x: number, y: number): 'I' | 'II' | 'III' | 'IV' | null {
  if (x === 0 || y === 0) return null
  return x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III'
}

/**
 * KG: "The four regions of the coordinate plane divided by the axes: Quadrant I
 * (x>0, y>0), II (x<0, y>0), III (x<0, y<0), IV (x>0, y<0)."
 */
export function buildQuadrantsScene(): SceneSpec {
  return framed(raw_buildQuadrantsScene())
}
function raw_buildQuadrantsScene(): SceneSpec {
  const { u, pts } = QUAD
  const signs = { I: '(+, +)', II: '(−, +)', III: '(−, −)', IV: '(+, −)' } as const
  const at = { I: [3.5, 2.8], II: [-3.5, 2.8], III: [-3.5, -2.8], IV: [3.5, -2.8] } as const
  const names = (['I', 'II', 'III', 'IV'] as const).map((q) => label(q, P(at[q][0], at[q][1]), ROLE.ink, 'primary'))
  const signLabels = (['I', 'II', 'III', 'IV'] as const).map((q) => label(signs[q], P(at[q][0], at[q][1] + (at[q][1] > 0 ? -0.55 : 0.55)), ROLE.output, 'primary'))
  const pointObjs: SceneObject[] = []
  for (const q of ['I', 'II', 'III', 'IV'] as const) {
    const [x, y] = pts[q]
    pointObjs.push(dot(P(x * u, y * u), ROLE.result, 0.15), label(`(${minus(x)}, ${minus(y)})`, P(x * u, y * u + (y > 0 ? 0.5 : -0.5)), ROLE.result, 'primary'))
  }
  return {
    id: 'math-quadrants',
    title: 'Quadrants: the axes cut the plane into four',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four quadrants numbered counter-clockwise from the top right, and the sign of x and y that defines each.',
    ariaLabel:
      'The x-axis and y-axis divide the plane into four quadrants, numbered counter-clockwise: I top right with x and y both positive, ' +
      'II top left with x negative and y positive, III bottom left with both negative, IV bottom right with x positive and y negative. One example point sits in each.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The two axes cut the plane into four regions, the quadrants. Count them counter-clockwise from the top right: I, II, III, IV.',
        objects: [
          ...axes2(0, 0, -4.4, 4.4, -3.4, 3.4), label('x', P(4.4, 0.3), ROLE.reference, 'detail'), label('y', P(0.3, 3.4), ROLE.reference, 'detail'),
          ...names,
        ],
      },
      { narration: 'Each quadrant has its own pair of signs. x is positive on the right, y is positive going up.', objects: signLabels },
      { narration: 'So a point\'s signs tell you its quadrant: (3, 2) is in I, (−3, 2) in II, (−3, −2) in III, (3, −2) in IV. A point on an axis is in no quadrant.', objects: pointObjs },
    ],
  }
}

// ── 3. Midpoint formula ──────────────────────────────────────────────────────

export const MID = { u: 0.8, ox: 0.68, oy: -0.56, A: [-4, -1], B: [2, 3] } as const
export const midpoint = (a: readonly [number, number], b: readonly [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

/** KG: "The midpoint of a segment from (x1, y1) to (x2, y2) is ((x1+x2)/2, (y1+y2)/2)." */
export function buildMidpointScene(): SceneSpec {
  return framed(raw_buildMidpointScene())
}
function raw_buildMidpointScene(): SceneSpec {
  const { u, ox, oy, A, B } = MID
  const M = midpoint(A, B)
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const [nx, ny] = [-(B[1] - A[1]), B[0] - A[0]]
  const nl = Math.hypot(nx, ny)
  // a short tick across the middle of each half, the standard "these two are equal" mark
  const tick = (c: [number, number]): SceneObject => {
    const p = S(c[0], c[1])
    return line(P(p[0] - (nx / nl) * 0.14, p[1] - (ny / nl) * 0.14), P(p[0] + (nx / nl) * 0.14, p[1] + (ny / nl) * 0.14), ROLE.result, 0.04)
  }
  return {
    id: 'math-midpoint',
    title: 'Midpoint: the average of the ends',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the midpoint of a segment has x equal to the average of the two x-values and y equal to the average of the two y-values, and that it splits the segment into two equal halves.',
    ariaLabel:
      'A segment from A (-4, -1) to B (2, 3). The x-values -4 and 2 average to -1 and the y-values -1 and 3 average to 1, so the midpoint M is (-1, 1). ' +
      'M splits the segment into two halves of equal length.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A segment runs from A (−4, −1) to B (2, 3). Where is the point exactly halfway?',
        objects: [
          ...mathAxes(S, -4.8, 3.1, -2.2, 3.6),
          line(S(A[0], A[1]), S(B[0], B[1]), ROLE.ink, 0.06), dot(S(A[0], A[1]), ROLE.ink, 0.14), dot(S(B[0], B[1]), ROLE.ink, 0.14),
          label('A (−4, −1)', S(-4.1, -1.9), ROLE.ink, 'primary'), label('B (2, 3)', S(2.5, 3.6), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Look across first. The two x-values are −4 and 2. Halfway between them is their average: (−4 + 2) ÷ 2 = −1.',
        objects: [
          guide(S(A[0], A[1]), S(A[0], 0), ROLE.input, 0.025), guide(S(B[0], B[1]), S(B[0], 0), ROLE.input, 0.025),
          dot(S(A[0], 0), ROLE.input, 0.1), dot(S(B[0], 0), ROLE.input, 0.1), dot(S(M[0], 0), ROLE.result, 0.14),
          label('x = (−4 + 2) ÷ 2 = −1', S(-1.2, -0.8), ROLE.result, 'detail'),
        ],
      },
      {
        narration: 'Do the same up the y-axis: (−1 + 3) ÷ 2 = 1. Together they give M (−1, 1), and M splits the segment into two equal halves.',
        objects: [
          guide(S(A[0], A[1]), S(0, A[1]), ROLE.output, 0.025), guide(S(B[0], B[1]), S(0, B[1]), ROLE.output, 0.025),
          dot(S(0, A[1]), ROLE.output, 0.1), dot(S(0, B[1]), ROLE.output, 0.1), dot(S(0, M[1]), ROLE.result, 0.14),
          guide(S(M[0], M[1]), S(0, M[1]), ROLE.result, 0.02), guide(S(M[0], M[1]), S(M[0], 0), ROLE.result, 0.02),
          dot(S(M[0], M[1]), ROLE.result, 0.17), label('M (−1, 1)', S(0.9, 0.5), ROLE.result, 'primary'),
          tick(midpoint(A, M)), tick(midpoint(M, B)),
          label('y = (−1 + 3) ÷ 2 = 1', S(1.8, -0.9), ROLE.result, 'detail'), label('AM = MB', S(-3.3, 1.6), ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 4. Parallel lines and a transversal ──────────────────────────────────────

/** Two horizontal lines y = +-gap/2, cut by a transversal at theta degrees through the origin. */
export const PAR = { gap: 2.4, theta: 60, arcR: 0.6, ext: 1.3 } as const
/** The two angle sizes the figure shows, from the transversal's direction alone. */
export function transversalAngles(theta: number) {
  return { acute: theta, obtuse: 180 - theta }
}
/** Where the transversal (through the origin at theta degrees) crosses y = yLine. */
export const crossingX = (yLine: number, theta: number) => yLine / Math.tan((theta * Math.PI) / 180)

/**
 * KG: "Lines that never meet; when cut by a transversal they produce equal
 * corresponding angles, alternate interior angles, and co-interior supplementary
 * angles."
 */
export function buildParallelLinesScene(): SceneSpec {
  return framed(raw_buildParallelLinesScene())
}
function raw_buildParallelLinesScene(): SceneSpec {
  const { gap, theta, arcR, ext } = PAR
  const { acute, obtuse } = transversalAngles(theta)
  const yT = gap / 2, yB = -gap / 2
  const tx = crossingX(yT, theta), bx = crossingX(yB, theta)
  const yEnd = gap / 2 + ext
  const polar = (cx: number, cy: number, r: number, deg: number): XY => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]
  const lab = (text: string, cx: number, cy: number, midDeg: number, color: string, r = 1.0) => {
    const p = polar(cx, cy, r, midDeg)
    return label(text, P(p[0], p[1]), color, 'primary')
  }
  return {
    id: 'math-parallel-lines',
    title: 'Parallel lines cut by a transversal',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that when a transversal crosses two parallel lines, corresponding angles are equal, alternate interior angles are equal, and co-interior angles add to 180 degrees.',
    ariaLabel:
      'Two parallel horizontal lines are crossed by a slanted transversal at 60 degrees. The angle above the top line and right of the transversal equals the matching angle at the bottom line (corresponding, 60 degrees). ' +
      'The angle below the top line on the left is also 60 degrees (alternate interior). The interior angle on the right of the top line is 120 degrees, and 120 plus 60 is 180 (co-interior).',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Two parallel lines never meet, so they stay the same distance apart. A third line, the transversal, crosses both.',
        objects: [
          line(P(-4.2, yT), P(4.2, yT), ROLE.ink, 0.06), line(P(-4.2, yB), P(4.2, yB), ROLE.ink, 0.06),
          ...chevron(3.6, yT, ROLE.ink), ...chevron(3.6, yB, ROLE.ink),
          line(P(crossingX(-yEnd, theta), -yEnd), P(crossingX(yEnd, theta), yEnd), ROLE.reference, 0.06),
          label('parallel', P(-3.0, yT + 0.45), ROLE.ink, 'detail'), label('transversal', P(2.9, yEnd - 0.1), ROLE.reference, 'detail'),
        ],
      },
      {
        narration: 'Corresponding angles sit in the same spot at each crossing, so they are equal: both are 60°.',
        objects: [
          curve(arcPts(tx, yT, arcR, 0, theta), ROLE.input), curve(arcPts(bx, yB, arcR, 0, theta), ROLE.input),
          lab(`${acute}°`, tx, yT, theta / 2, ROLE.input), lab(`${acute}°`, bx, yB, theta / 2, ROLE.input),
        ],
      },
      {
        narration: 'Alternate interior angles (inside, on opposite sides) are equal: 60° and 60°. Co-interior angles (inside, same side) add to 180°: 120° + 60°.',
        objects: [
          curve(arcPts(tx, yT, arcR, 180, 180 + theta), ROLE.output), lab(`${acute}°`, tx, yT, 180 + theta / 2, ROLE.output),
          curve(arcPts(tx, yT, arcR + 0.18, 180 + theta, 360), ROLE.result), lab(`${obtuse}°`, tx, yT, 180 + theta + obtuse / 2, ROLE.result, 1.2),
          label(`${obtuse}° + ${acute}° = 180°`, P(2.6, 0), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 5. Converse of the Pythagorean theorem ───────────────────────────────────

/** Triangle 1: 5-12-13 (passes the test); triangle 2: 5-12-14 (fails it). Drawn at s screen units per length unit. */
export const CONV = { s: 0.34, ok: { a: 5, b: 12, c: 13 }, bad: { a: 5, b: 12, c: 14 } } as const
/** Apex of a triangle with base b on the x-axis from (0,0), side a from the origin and side c from (b, 0). */
export function apexOf(a: number, b: number, c: number): XY {
  const x = (a * a - c * c + b * b) / (2 * b)
  return [x, Math.sqrt(Math.max(0, a * a - x * x))]
}
/** The angle between sides a and b, opposite c, in degrees (law of cosines). */
export const angleOppositeC = (a: number, b: number, c: number) => (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI

/** KG: "If a² + b² = c² for sides a, b, c of a triangle, then the triangle is right-angled with hypotenuse c." */
export function buildPythagoreanConverseScene(): SceneSpec {
  return framed(raw_buildPythagoreanConverseScene())
}
function raw_buildPythagoreanConverseScene(): SceneSpec {
  const { s, ok, bad } = CONV
  const apexOk = apexOf(ok.a, ok.b, ok.c), apexBad = apexOf(bad.a, bad.b, bad.c)
  const oy = -1.1
  const o1 = -4.5, o2 = 0.8
  const T1 = (x: number, y: number): XY => [o1 + x * s, oy + y * s]
  const T2 = (x: number, y: number): XY => [o2 + x * s, oy + y * s]
  const tri = (f: (x: number, y: number) => XY, base: number, apex: XY, color: string) => polyLines([f(0, 0), f(base, 0), f(apex[0], apex[1])], color, 0.06)
  const ang = Math.round(angleOppositeC(bad.a, bad.b, bad.c))
  const sq = (n: number) => n * n
  const L1 = (text: string, x: number, y: number, color: string, tier: 'detail' | 'primary' = 'detail') => label(text, P(...T1(x, y)), color, tier)
  const L2 = (text: string, x: number, y: number, color: string, tier: 'detail' | 'primary' = 'detail') => label(text, P(...T2(x, y)), color, tier)
  return {
    id: 'math-pythagorean-converse',
    title: 'Converse of Pythagoras: does a² + b² = c² make it right-angled?',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that if the squares of the two shorter sides add up exactly to the square of the longest side the triangle has a right angle, and that when they do not it does not.',
    ariaLabel:
      'Two triangles. The first has sides 5, 12 and 13: 25 plus 144 is 169, which equals 13 squared, so it has a right angle. ' +
      'The second has sides 5, 12 and 14: 25 plus 144 is 169 but 14 squared is 196, so it is not right-angled; its angle is about 103 degrees.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'You are given only the three side lengths of a triangle: 5, 12 and 13. Is it right-angled?',
        objects: [
          ...tri(T1, ok.b, apexOk, ROLE.ink),
          L1('a = 5', -1.2, ok.a / 2, ROLE.input), L1('b = 12', ok.b / 2, -1.4, ROLE.output), L1('c = 13', ok.b / 2 + 1.5, ok.a / 2 + 0.9, ROLE.ink),
        ],
      },
      {
        narration: 'Test it: 5² + 12² = 25 + 144 = 169, and 13² = 169. They match, so the angle between the sides 5 and 12 is exactly 90°.',
        objects: [
          ...rightAngleMark(...T1(0, 0), [1, 0], [0, 1], 0.32, ROLE.result),
          L1(`${sq(ok.a)} + ${sq(ok.b)} = ${sq(ok.c)} = 13²`, ok.b / 2, ok.a + 2.3, ROLE.result, 'primary'),
        ],
      },
      {
        narration: 'Now sides 5, 12 and 14. 25 + 144 = 169, but 14² = 196. They do not match, so the angle between the sides 5 and 12 is not 90°: it is about 103°.',
        objects: [
          ...tri(T2, bad.b, apexBad, ROLE.reference),
          L2('a = 5', -1.5, bad.a / 2, ROLE.reference), L2('b = 12', bad.b / 2, -1.4, ROLE.reference), L2('c = 14', bad.b / 2 + 0.6, bad.a / 2 + 1.1, ROLE.reference),
          curve(arcPts(...T2(0, 0), 0.5, 0, ang), ROLE.input), L2(`≈ ${ang}°`, 2.6, 1.7, ROLE.input),
          L2(`${sq(ok.c)} ≠ ${sq(bad.c)} = 14²`, bad.b / 2, bad.a + 2.3, ROLE.input, 'primary'),
        ],
      },
    ],
  }
}

// ── 6. Parallelogram ─────────────────────────────────────────────────────────

/** A(0,0) B(5,0) C(7,3) D(2,3): base 5, height 3, slanted side offset 2. */
export const PGRAM = { u: 0.85, A: [0, 0], B: [5, 0], C: [7, 3], D: [2, 3] } as const
/** Polygon area by the shoelace formula. */
export function shoelace(poly: ReadonlyArray<readonly [number, number]>): number {
  let s = 0
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length]
    s += a[0] * b[1] - b[0] * a[1]
  }
  return Math.abs(s) / 2
}

/**
 * KG: "A quadrilateral with both pairs of opposite sides parallel; includes
 * rectangles, rhombuses and squares." Its area is base x height, shown by cutting
 * off one end and sliding it to the other.
 */
export function buildParallelogramScene(): SceneSpec {
  return framed(raw_buildParallelogramScene())
}
function raw_buildParallelogramScene(): SceneSpec {
  const { u, A, B, C, D } = PGRAM
  const ox = -3.5 * u, oy = -1.5 * u
  const S = (x: number, y: number): XY => [ox + x * u, oy + y * u]
  const base = B[0] - A[0], height = D[1] - A[1]
  const E: [number, number] = [D[0], 0]                 // foot of the height from D
  const tri: XY[] = [S(A[0], A[1]), S(E[0], E[1]), S(D[0], D[1])]
  const moved: XY[] = [S(A[0] + base, A[1]), S(E[0] + base, E[1]), S(D[0] + base, D[1])]  // slide right by the base length
  const area = base * height
  return {
    id: 'math-parallelogram',
    title: 'Parallelogram: area = base × height',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a parallelogram has both pairs of opposite sides parallel and that its area is base times perpendicular height, by cutting off a triangle and sliding it to make a rectangle.',
    ariaLabel:
      'A parallelogram with base 5 and perpendicular height 3. A triangle cut from the left end is slid to the right end, turning the parallelogram into a 5 by 3 rectangle, so the area is 5 times 3, which is 15.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A parallelogram has two pairs of parallel sides. Its base here is 5.',
        objects: [
          ...polyLines([S(A[0], A[1]), S(B[0], B[1]), S(C[0], C[1]), S(D[0], D[1])], ROLE.ink, 0.06),
          ...chevron(...S(2.9, 0), ROLE.ink, 0.1, 0.12), ...chevron(...S(4.6, height), ROLE.ink, 0.1, 0.12),
          label('base 5', P(...S(2.5, -0.65)), ROLE.output, 'primary'),
        ],
      },
      {
        narration: 'The height is measured straight up from the base, not along the slanted side. It is 3. Cut off the triangle at the left end.',
        objects: [
          guide(P(...S(D[0], D[1])), P(...S(E[0], E[1])), ROLE.aid, 0.03),
          ...rightAngleMark(...S(E[0], E[1]), [1, 0], [0, 1], 0.2, ROLE.aid),
          label('height 3', P(...S(3.75, 1.7)), ROLE.aid, 'primary'),
          ...shadeConvex(tri, 0.12, ROLE.aid), ...polyLines(tri, ROLE.aid, 0.04),
        ],
      },
      {
        narration: 'Slide that triangle to the right end. The pieces now make a rectangle 5 by 3, so the parallelogram has area 5 × 3 = 15.',
        objects: [
          ...shadeConvex(moved, 0.1, ROLE.result),
          ...polyLines(moved, ROLE.result, 0.04),
          ...polyLines([S(E[0], E[1]), S(E[0] + base, E[1]), S(E[0] + base, E[1] + height), S(E[0], E[1] + height)], ROLE.result, 0.03),
          arrow(P(...S(1.2, 0.5)), P(...S(6.0, 0.5)), ROLE.result),
          label('slide', P(...S(3.6, 0.95)), ROLE.result, 'detail'), label(`area = ${base} × ${height} = ${area}`, P(...S(3.5, height + 0.75)), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 7. Equations of lines ────────────────────────────────────────────────────

/**
 * One line, y = 2x + 1, in its three forms. It passes through (0, 1) and (1, 3).
 * math.func.linear-function is deliberately NOT given a figure: four existing tests
 * (visualApprovedFigureTier, visualFigureBreadth, visualFigureCritic,
 * visualGenerationOutcomeStore) use it as their "uncurated concept" fixture for the
 * AI-generation path, exactly as the vector-addition canary is reserved.
 */
export const LINE = { u: 0.62, oy: -0.37, m: 2, b: 1, px: 1 } as const
export const lineY = (x: number) => LINE.m * x + LINE.b
/** Standard form a x + b y = c of y = m x + intercept, scaled to integers: here 2x - y = -1. */
export const lineStandard = () => ({ a: LINE.m, b: -1, c: -LINE.b })

/** KG: "y = mx + b (slope-intercept), y − y₁ = m(x − x₁) (point-slope), ax + by = c (standard form); three equivalent representations of a line." */
export function buildLineEquationScene(): SceneSpec {
  return framed(raw_buildLineEquationScene())
}
function raw_buildLineEquationScene(): SceneSpec {
  const { u, oy, m, b, px } = LINE
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const py = lineY(px), std = lineStandard()
  return {
    id: 'math-line-equation',
    title: 'Equations of lines: three forms of one line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that slope-intercept, point-slope and standard form are three equations of the same line, reading slope m, the y-intercept b and a point on the line.',
    ariaLabel:
      'The line through (0, 1) and (1, 3). In slope-intercept form it is y equals 2x plus 1: the slope 2 is the rise of 2 for a run of 1 and the y-intercept is 1. ' +
      'In point-slope form through (1, 3) it is y minus 3 equals 2 times (x minus 1). In standard form it is 2x minus y equals minus 1. All three describe the same line.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Slope-intercept form, y = mx + b, shows two things at a glance: the slope m = 2 (up 2 for every 1 across) and the y-intercept b = 1 (where the line crosses the y-axis).',
        objects: [
          ...mathAxes(S, -3.2, 3.2, -4, 5.2), label('x', S(3.4, 0.5), ROLE.reference, 'detail'), label('y', S(0.5, 5.2), ROLE.reference, 'detail'),
          line(S(-2.2, lineY(-2.2)), S(1.9, lineY(1.9)), ROLE.ink, 0.06),
          dot(S(0, b), ROLE.result, 0.15), label('(0, 1) = b', S(-1.35, b + 0.6), ROLE.result, 'primary'),
          line(S(0, b), S(1, b), ROLE.input, 0.07), line(S(1, b), S(1, b + m), ROLE.output, 0.07),
          label('run 1', S(0.5, b - 0.6), ROLE.input, 'detail'), label('rise 2', S(1.9, b + m / 2), ROLE.output, 'detail'),
          label('y = 2x + 1', S(-1.7, 4.5), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Point-slope form uses any point on the line and the slope: through (1, 3) with slope 2, y − 3 = 2(x − 1). Multiply out and it is y = 2x + 1 again.',
        objects: [dot(S(px, py), ROLE.aid, 0.16), label('(1, 3)', S(px + 1.1, py - 0.3), ROLE.aid, 'detail'), label('y \u2212 3 = 2(x \u2212 1)', S(3.4, -1.0), ROLE.aid, 'primary')],
      },
      {
        narration: 'Standard form puts x and y on one side: ax + by = c. Here 2x − y = −1. Check (0, 1): 0 − 1 = −1. Check (1, 3): 2 − 3 = −1. Same line.',
        objects: [label(`${std.a}x \u2212 y = \u22121`, S(3.4, -2.5), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 8. Quadratic function ────────────────────────────────────────────────────

/** f(x) = a x² + b x + c. */
export const QUADF = { u: 0.6, ox: -0.6, oy: 0.12, a: 1, b: -2, c: -3 } as const
export const quadF = (x: number) => QUADF.a * x * x + QUADF.b * x + QUADF.c
export const quadVertexX = () => -QUADF.b / (2 * QUADF.a)
export function quadRoots(): [number, number] {
  const { a, b, c } = QUADF
  const d = Math.sqrt(b * b - 4 * a * c)
  return [(-b - d) / (2 * a), (-b + d) / (2 * a)]
}

/** KG: "f(x) = ax² + bx + c; its graph is a parabola; vertex at (−b/2a, f(−b/2a))." */
export function buildQuadraticFunctionScene(): SceneSpec {
  return framed(raw_buildQuadraticFunctionScene())
}
function raw_buildQuadraticFunctionScene(): SceneSpec {
  const { u, ox, oy, c } = QUADF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const vx = quadVertexX(), vy = quadF(vx)
  const [r1, r2v] = quadRoots()
  return {
    id: 'math-quadratic-function',
    title: 'Quadratic function: a parabola with a vertex at x = −b/2a',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the graph of a quadratic is a parabola, that its vertex lies at x = -b/2a, and where its y-intercept and roots sit.',
    ariaLabel:
      'The graph of f of x equals x squared minus 2x minus 3, a parabola opening upward. Its vertex is at (1, -4), on the line x equals minus b over 2a, which is 1. ' +
      'It crosses the y-axis at (0, -3), which is c, and the x-axis at (-1, 0) and (3, 0).',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'f(x) = x² − 2x − 3 is a quadratic (a = 1, b = −2, c = −3). Its graph is a parabola.',
        objects: [
          ...mathAxes(S, -2.4, 4.4, -5, 4.6), label('x', S(4.6, 0.55), ROLE.reference, 'detail'), label('y', S(0.5, 4.6), ROLE.reference, 'detail'),
          curve(sampleMapped(quadF, -1.8, 3.8, S, 64), ROLE.ink), label('f(x) = x² − 2x − 3', S(3.9, 4.2), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'The vertex, the lowest point, sits on the line x = −b ÷ 2a = 2 ÷ 2 = 1. Put x = 1 in: f(1) = −4.',
        objects: [
          guide(S(vx, -4.6), S(vx, 4.2), ROLE.aid, 0.02),
          dot(S(vx, vy), ROLE.result, 0.16), label('vertex (1, −4)', S(vx + 1.75, vy - 0.1), ROLE.result, 'primary'),
          label('x = −b/2a = 1', S(vx + 1.75, 3.2), ROLE.aid, 'detail'),
        ],
      },
      {
        narration: 'The curve crosses the y-axis at (0, c) = (0, −3), and the x-axis at the roots x = −1 and x = 3, equally far either side of the vertex line.',
        objects: [
          dot(S(0, c), ROLE.output, 0.13), label('(0, −3) = c', S(-1.2, c - 0.5), ROLE.output, 'detail'),
          dot(S(r1, 0), ROLE.output, 0.13), dot(S(r2v, 0), ROLE.output, 0.13),
          label('(−1, 0)', S(r1 - 0.2, 0.75), ROLE.output, 'detail'), label('(3, 0)', S(r2v + 0.2, 0.75), ROLE.output, 'detail'),
        ],
      },
    ],
  }
}

// ── 9. Vertex form ───────────────────────────────────────────────────────────

/** f(x) = a (x - h)² + k with a = 1, h = 2, k = 1; the flipped copy has a = -1. */
export const VF = { u: 0.85, ox: -0.94, oy: -0.85, a: 1, h: 2, k: 1 } as const
export const vertexF = (x: number, a: number = VF.a) => a * (x - VF.h) ** 2 + VF.k

/** KG: "f(x) = a(x−h)² + k; vertex at (h, k); a > 0 means minimum, a < 0 means maximum." */
export function buildVertexFormScene(): SceneSpec {
  return framed(raw_buildVertexFormScene())
}
function raw_buildVertexFormScene(): SceneSpec {
  const { u, ox, oy, h, k } = VF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-vertex-form',
    title: 'Vertex form: f(x) = a(x − h)² + k',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that in f(x) = a(x - h)^2 + k the vertex is at (h, k), that h slides the parabola sideways and k slides it up, and that the sign of a decides minimum or maximum.',
    ariaLabel:
      'The parabola y equals x squared with its vertex at the origin. Replacing x by x minus 2 and adding 1 slides it 2 right and 1 up, to a new vertex at (2, 1): f of x equals (x minus 2) squared plus 1. ' +
      'With a equal to minus 1 the parabola flips over and opens downward from the same vertex, so (2, 1) becomes a maximum.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Start from y = x². Its vertex is at the origin.',
        objects: [
          ...mathAxes(S, -2.4, 4.6, -3, 5), label('x', S(4.8, 0.5), ROLE.reference, 'detail'), label('y', S(0.5, 5), ROLE.reference, 'detail'),
          curve(sampleMapped((x) => x * x, -1.9, 1.9, S, 48), ROLE.reference), label('y = x²', S(-1.9, 4.2), ROLE.reference, 'detail'),
        ],
      },
      {
        narration: 'f(x) = (x − 2)² + 1 slides the whole curve 2 to the right (h = 2) and 1 up (k = 1). The vertex moves to (h, k) = (2, 1).',
        objects: [
          curve(sampleMapped((x) => vertexF(x), 0.1, 3.9, S, 48), ROLE.output),
          arrow(S(0, 0), S(h, 0), ROLE.input), arrow(S(h, 0), S(h, k), ROLE.output),
          dot(S(h, k), ROLE.result, 0.16), label('vertex (2, 1)', S(h + 1.7, k - 0.75), ROLE.result, 'primary'),
          label('right 2', S(h / 2, -0.75), ROLE.input, 'detail'), label('up 1', S(h + 0.85, k / 2 - 0.35), ROLE.output, 'detail'),
        ],
      },
      {
        narration: 'The number a decides the opening. a = 1 > 0 opens up, so (2, 1) is a minimum. a = −1 < 0 flips it down, and the same vertex is a maximum.',
        objects: [
          curve(sampleMapped((x) => vertexF(x, -1), 0.1, 3.9, S, 48), ROLE.result),
          label('a > 0: minimum', S(h + 1.8, 4.4), ROLE.output, 'detail'), label('a < 0: maximum', S(h + 1.8, -1.2), ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 10. Exponential function ─────────────────────────────────────────────────

/** f(x) = 2^x (growth) and g(x) = (1/2)^x (decay). */
export const EXPF = { u: 0.7, ox: 0.21, oy: -1.575, base: 2 } as const
export const expF = (x: number, base: number = EXPF.base) => Math.pow(base, x)

/** KG: "f(x) = a^x (a > 0, a ≠ 1) ... models growth, decay, compound interest." */
export function buildExponentialFunctionScene(): SceneSpec {
  return framed(raw_buildExponentialFunctionScene())
}
function raw_buildExponentialFunctionScene(): SceneSpec {
  const { u, ox, oy } = EXPF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const dots = [1, 2].map((x) => ({ x, y: expF(x) }))
  return {
    id: 'math-exponential-function',
    title: 'Exponential function: f(x) = 2ˣ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an exponential f(x) = a^x passes through (0, 1), multiplies by the same factor for every step across, never reaches zero, and decays when the base is below 1.',
    ariaLabel:
      'The graph of f of x equals 2 to the x. It passes through (0, 1), (1, 2) and (2, 4): each step of 1 to the right multiplies the height by 2. The curve gets close to the x-axis on the left but never touches it. ' +
      'A second curve, one half to the x, is the mirror image in the y-axis: it falls from left to right, decay.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'f(x) = 2ˣ. At x = 0 the output is 2⁰ = 1, so every exponential graph passes through (0, 1).',
        objects: [
          ...mathAxes(S, -3.6, 3.0, -0.7, 5.2), label('x', S(3.2, 0.5), ROLE.reference, 'detail'), label('y', S(0.4, 5.2), ROLE.reference, 'detail'),
          curve(sampleMapped((x) => expF(x), -3.4, 2.3, S, 72), ROLE.output), label('f(x) = 2ˣ', S(2.45, 4.9), ROLE.output, 'primary'),
          dot(S(0, 1), ROLE.result, 0.15),
        ],
      },
      {
        narration: 'Each step of 1 to the right multiplies the height by 2: 1, 2, 4, … That constant factor is what makes growth exponential.',
        objects: [
          ...dots.flatMap((d) => [guide(S(d.x, 0), S(d.x, d.y), ROLE.input, 0.025), guide(S(d.x, d.y), S(0, d.y), ROLE.input, 0.025), dot(S(d.x, d.y), ROLE.result, 0.14)]),
          label('× 2', S(0.35, 2.2), ROLE.input, 'primary'), label('× 2', S(1.3, 3.6), ROLE.input, 'primary'),
        ],
      },
      {
        narration: 'The curve gets as close to y = 0 as you like but never touches it. With a base below 1, g(x) = (½)ˣ is the mirror image: it decays.',
        objects: [
          curve(sampleMapped((x) => expF(x, 0.5), -2.3, 3.4, S, 72), ROLE.input), label('g(x) = (½)ˣ', S(-2.7, 4.9), ROLE.input, 'primary'),
          label('never reaches 0', S(1.9, 0.85), ROLE.reference, 'detail'),
        ],
      },
    ],
  }
}

// ── 11. Logarithmic function ─────────────────────────────────────────────────

/** y = 2^x and its inverse y = log2 x, mirrored in y = x. */
export const LOGF = { u: 0.62, ox: -1.15, oy: -0.84, base: 2, xs: [0, 1, 2] } as const
export const logF = (x: number) => Math.log(x) / Math.log(LOGF.base)

/** KG: "The inverse of the exponential function; f(x) = log_a(x); domain (0, ∞)." */
export function buildLogarithmicFunctionScene(): SceneSpec {
  return framed(raw_buildLogarithmicFunctionScene())
}
function raw_buildLogarithmicFunctionScene(): SceneSpec {
  const { u, ox, oy, xs } = LOGF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-logarithmic-function',
    title: 'Logarithm: the mirror image of the exponential',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that y = log2 x is the inverse of y = 2^x, the reflection of its graph in the line y = x, with domain x > 0.',
    ariaLabel:
      'The graph of y equals 2 to the x through (0, 1), (1, 2) and (2, 4). Reflected in the line y equals x, those points become (1, 0), (2, 1) and (4, 2), which lie on the graph of y equals log base 2 of x. ' +
      'The log curve exists only for x greater than 0 and falls steeply toward the y-axis without touching it.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Start with y = 2ˣ. It takes an exponent x and gives the number 2ˣ: (0, 1), (1, 2), (2, 4).',
        objects: [
          ...mathAxes(S, -1.5, 5.2, -2.5, 5.2), label('x', S(5.4, 0.5), ROLE.reference, 'detail'), label('y', S(0.5, 5.3), ROLE.reference, 'detail'),
          curve(sampleMapped((x) => Math.pow(2, x), -1.6, 2.2, S, 56), ROLE.output), label('y = 2ˣ', S(-1.3, 3.9), ROLE.output, 'primary'),
          ...xs.map((x) => dot(S(x, Math.pow(2, x)), ROLE.output, 0.13)),
        ],
      },
      {
        narration: 'A logarithm undoes it: it takes the number and gives the exponent. On the graph that is a mirror image in the line y = x, so (0, 1) becomes (1, 0), (1, 2) becomes (2, 1), (2, 4) becomes (4, 2).',
        objects: [
          line(S(-1.2, -1.2), S(4.9, 4.9), ROLE.aid, 0.03), label('y = x', S(4.5, 5.2), ROLE.aid, 'detail'),
          ...xs.flatMap((x) => [guide(S(x, Math.pow(2, x)), S(Math.pow(2, x), x), ROLE.aid, 0.018), dot(S(Math.pow(2, x), x), ROLE.result, 0.13)]),
        ],
      },
      {
        narration: 'Joining the mirrored points gives y = log₂ x. It exists only for x > 0 (a power of 2 is never 0 or negative), and it dives toward the y-axis without ever touching it.',
        objects: [
          curve(sampleMapped(logF, 0.18, 4.8, S, 72), ROLE.result), label('y = log₂ x', S(4.6, 0.3), ROLE.result, 'primary'),
          label('(4, 2)', S(4.0, 2.9), ROLE.result, 'detail'), label('x > 0 only', S(1.5, -2.2), ROLE.reference, 'detail'),
        ],
      },
    ],
  }
}

// ── 12. Composition of functions ─────────────────────────────────────────────

/** g(x) = x + 2 and f(x) = x²; input 3. */
export const COMP = { input: 3, g: (x: number) => x + 2, f: (x: number) => x * x } as const
export const fOfG = (x: number) => COMP.f(COMP.g(x))
export const gOfF = (x: number) => COMP.g(COMP.f(x))

/** KG: "(f∘g)(x) = f(g(x)) applies g first, then f; ... not generally commutative." */
export function buildCompositionScene(): SceneSpec {
  return framed(raw_buildCompositionScene())
}
function raw_buildCompositionScene(): SceneSpec {
  const x = COMP.input
  const gx = COMP.g(x), fgx = fOfG(x), fx = COMP.f(x), gfx = gOfF(x)
  const name = (k: 'g' | 'f') => (k === 'g' ? 'g: add 2' : 'f: square')
  const boxA = [-3.7, -1.1], boxB = [1.0, 3.6]
  const rect = (b: number[], y: number): SceneObject[] => polyLines([[b[0], y - 0.6], [b[1], y - 0.6], [b[1], y + 0.6], [b[0], y + 0.6]], ROLE.ink, 0.05)
  /** One row "n0 -> machine -> n1 -> machine -> n2": the first machine's half, then the rest. */
  const row = (y: number, first: 'g' | 'f', n0: number, n1: number, n2: number, resultColor: string): { head: SceneObject[]; tail: SceneObject[] } => {
    const second = first === 'g' ? 'f' : 'g'
    return {
      head: [
        label(String(n0), P(-4.6, y), ROLE.input, 'primary'), arrow(P(-4.3, y), P(boxA[0] - 0.05, y), ROLE.reference),
        ...rect(boxA, y), label(name(first), P((boxA[0] + boxA[1]) / 2, y), ROLE.ink, 'detail'),
        arrow(P(boxA[1] + 0.05, y), P(-0.45, y), ROLE.reference), label(String(n1), P(-0.05, y), ROLE.output, 'primary'),
      ],
      tail: [
        arrow(P(0.35, y), P(boxB[0] - 0.05, y), ROLE.reference),
        ...rect(boxB, y), label(name(second), P((boxB[0] + boxB[1]) / 2, y), ROLE.ink, 'detail'),
        arrow(P(boxB[1] + 0.05, y), P(4.05, y), ROLE.reference), label(String(n2), P(4.6, y), resultColor, 'primary'),
      ],
    }
  }
  const r1 = row(1.5, 'g', x, gx, fgx, ROLE.result)
  const r2 = row(-1.6, 'f', x, fx, gfx, ROLE.input)
  return {
    id: 'math-composition',
    title: 'Composition: the order matters',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that f(g(x)) applies g first and then f, and that swapping the order generally gives a different result.',
    ariaLabel:
      'Two rows of machines. With g (add 2) as the first machine and f (square) as the second, the input 3 becomes 5 and then 25, so f of g of 3 is 25. ' +
      'With f first and g second, 3 becomes 9 and then 11, so g of f of 3 is 11. 25 and 11 are different: the order matters.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(g(x)) means: do g first, then feed its output into f. With g = “add 2” and f = “square”, start with 3: g gives 5.', objects: r1.head },
      {
        narration: 'Then f squares that 5 and gives 25. So f(g(3)) = 25, written (f∘g)(3).',
        objects: [...r1.tail, label(`f(g(3)) = ${fgx}`, P(0.4, 0.5), ROLE.result, 'primary'), label('g first, then f', P(0.4, 2.55), ROLE.ink, 'detail')],
      },
      {
        narration: 'Swap the order: f first (3 → 9), then g (9 → 11). g(f(3)) = 11, not 25. In general f∘g and g∘f are different.',
        objects: [...r2.head, ...r2.tail, label(`g(f(3)) = ${gfx}`, P(0.4, -2.7), ROLE.input, 'primary'), label('\u2260', P(4.6, 0.0), ROLE.ink, 'primary')],
      },
    ],
  }
}

// ── 13. Even and odd functions ───────────────────────────────────────────────

/** Three small panels, each with its own axes: f(x) = x² (even), g(x) = x³/2 (odd), h(x) = (x² + x)/2 (neither). */
export const EVEN = { s: 0.5, centres: [-3.2, 0, 3.2], x: 1.5, evenF: (x: number) => x * x, oddF: (x: number) => (x * x * x) / 2, neitherF: (x: number) => (x * x + x) / 2 } as const

/** KG: "f is even if f(−x) = f(x) (symmetric about y-axis); f is odd if f(−x) = −f(x) (symmetric about origin)." */
export function buildEvenOddScene(): SceneSpec {
  return framed(raw_buildEvenOddScene())
}
function raw_buildEvenOddScene(): SceneSpec {
  const { s, centres, x, evenF, oddF, neitherF } = EVEN
  const panel = (c: number) => (px: number, py: number): V3 => P(c + px * s, py * s)
  const axesOf = (S: (px: number, py: number) => V3) => mathAxes(S, -2.4, 2.4, -4.4, 4.6)
  const [Se, So, Sn] = centres.map(panel)
  return {
    id: 'math-even-odd-functions',
    title: 'Even and odd functions: symmetry of the graph',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an even function has f(-x) = f(x), a graph mirrored in the y-axis, that an odd function has f(-x) = -f(x), a graph unchanged by a half-turn about the origin, and that most functions are neither.',
    ariaLabel:
      'Three small graphs. Left, f of x equals x squared is even: the points at x equals 1.5 and minus 1.5 have the same height, 2.25, so the graph is a mirror image in the y-axis. ' +
      'Middle, g of x equals x cubed over 2 is odd: the points at 1.5 and minus 1.5 have heights 1.6875 and minus 1.6875, so a half-turn about the origin maps the graph onto itself. ' +
      'Right, h of x equals (x squared plus x) over 2 is neither: h of 1 is 1 but h of minus 1 is 0.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Even: f(x) = x². The points at x = 1.5 and x = −1.5 are at the same height, 2.25, so f(−x) = f(x). The graph is a mirror image in the y-axis.',
        objects: [
          ...axesOf(Se), curve(sampleMapped(evenF, -2.1, 2.1, Se, 48), ROLE.output),
          dot(Se(x, evenF(x)), ROLE.result, 0.13), dot(Se(-x, evenF(-x)), ROLE.result, 0.13), guide(Se(-x, evenF(x)), Se(x, evenF(x)), ROLE.result, 0.025),
          label('even', P(centres[0], 2.75), ROLE.output, 'primary'), label('f(\u2212x) = f(x)', P(centres[0], -2.8), ROLE.result, 'detail'),
        ],
      },
      {
        narration: 'Odd: g(x) = x³ ÷ 2. At x = 1.5 the height is 1.6875 and at x = −1.5 it is −1.6875, so g(−x) = −g(x). Turn the graph half a turn about the origin and it lands on itself.',
        objects: [
          ...axesOf(So), curve(sampleMapped(oddF, -2.1, 2.1, So, 48), ROLE.input),
          dot(So(x, oddF(x)), ROLE.result, 0.13), dot(So(-x, oddF(-x)), ROLE.result, 0.13), guide(So(-x, oddF(-x)), So(x, oddF(x)), ROLE.result, 0.025),
          label('odd', P(centres[1], 2.75), ROLE.input, 'primary'), label('g(\u2212x) = \u2212g(x)', P(centres[1], -2.8), ROLE.result, 'detail'),
        ],
      },
      {
        narration: 'Most functions are neither. h(x) = (x² + x) ÷ 2 has h(1) = 1 but h(−1) = 0: not equal (so not even) and not opposite (so not odd).',
        objects: [
          ...axesOf(Sn), curve(sampleMapped(neitherF, -2.1, 2.1, Sn, 48), ROLE.reference),
          dot(Sn(1, neitherF(1)), ROLE.aid, 0.13), dot(Sn(-1, neitherF(-1)), ROLE.aid, 0.13),
          label('neither', P(centres[2], 2.75), ROLE.reference, 'primary'), label('h(\u22121) \u2260 \u00B1h(1)', P(centres[2], -2.8), ROLE.aid, 'detail'),
        ],
      },
    ],
  }
}
