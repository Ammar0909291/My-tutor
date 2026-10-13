/**
 * Core school-mathematics figures — batch 4 of the mathematics visual campaign
 * (2026-10-11): elementary geometry and transformations.
 *
 * Point, line, segment, ray, plane, perpendicular lines, trapezoid, area, and the
 * four rigid / similarity transformations. Same rules as batches 1-3: one visual
 * language from visualDesign.ts, labels are names not sentences, steps are
 * cumulative, coordinates stay inside +-5, at most 50 objects per step, and every
 * number drawn comes from the constants and pure helpers exported here, which the
 * test file re-derives independently from the drawn coordinates.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid, slate
 * is axes and inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, mathAxes, polyLines, shadeConvex, arcPts, rightAngleMark, type XY, type V3 } from './mathSceneKit'

export const cross2 = (a: XY, b: XY, c: XY) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
export const dist = (a: XY, b: XY) => Math.hypot(b[0] - a[0], b[1] - a[1])
export function shoelaceArea(poly: ReadonlyArray<XY>): number {
  let s = 0
  for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1] }
  return Math.abs(s) / 2
}
/** Signed area: positive for a counter-clockwise ordering. */
export function signedArea(poly: ReadonlyArray<XY>): number {
  let s = 0
  for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1] }
  return s / 2
}
/** Ray-casting point-in-polygon, for convex or concave polygons. */
export function insidePoly(pt: XY, poly: ReadonlyArray<XY>): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// ── 1. Point ─────────────────────────────────────────────────────────────────

/** Three things side by side: a point, a segment (length), a square (length and width). */
export const POINT = { xs: [-3.2, 0, 3.2], y: 0.5, seg: 1.8, side: 1.8 } as const

/** KG: "A dimensionless location in space with no length, width, or height; the fundamental primitive of Euclidean geometry." */
export function buildPointScene(): SceneSpec {
  return framed(raw_buildPointScene())
}
function raw_buildPointScene(): SceneSpec {
  const { xs, y, seg, side } = POINT
  return {
    id: 'math-point',
    title: 'Point: a location with no size',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a point as an exact location with no length, width or height, by contrast with a segment, which has length, and a square, which has length and width.',
    ariaLabel:
      'A point A drawn as a dot with a crosshair marking its exact location: a point has only position, no length, width or height. Beside it, a segment has a length, and a square has both length and width.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A point is an exact location. The dot is only a mark to show where it is; the crosshair shows the exact spot. The point itself has no size at all.',
        objects: [line(P(xs[0] - 0.9, y), P(xs[0] + 0.9, y), ROLE.reference, 0.025), line(P(xs[0], y - 0.9), P(xs[0], y + 0.9), ROLE.reference, 0.025), dot(P(xs[0], y), ROLE.input, 0.12), label('A', P(xs[0] + 0.3, y + 0.4), ROLE.input, 'primary'), label('point: only a location', P(xs[0], y - 1.5), ROLE.input, 'detail')],
      },
      {
        narration: 'A line segment has one measurable thing, its length. A point has none: it cannot be measured with a ruler.',
        objects: [line(P(xs[1] - seg / 2, y), P(xs[1] + seg / 2, y), ROLE.output, 0.07), dot(P(xs[1] - seg / 2, y), ROLE.output, 0.1), dot(P(xs[1] + seg / 2, y), ROLE.output, 0.1), label('segment: length', P(xs[1], y - 1.5), ROLE.output, 'detail')],
      },
      {
        narration: 'A square has length and width, so it covers an area. A point has no length, no width and no height: it only says where.',
        objects: [...polyLines([[xs[2] - side / 2, y - side / 2], [xs[2] + side / 2, y - side / 2], [xs[2] + side / 2, y + side / 2], [xs[2] - side / 2, y + side / 2]], ROLE.result, 0.06), label('square: length and width', P(xs[2], y - 1.5), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 2. Line ──────────────────────────────────────────────────────────────────

export const LINE2 = { A: [-2.5, -1] as XY, B: [1.5, 1] as XY, other: [[-1.2, 2.0], [1.6, -1.4]] as XY[] } as const
/** Point on the line through a and b at parameter t (t = 0 is a, t = 1 is b). */
export const onLine = (a: XY, b: XY, t: number): XY => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]

/** KG: "A one-dimensional figure extending infinitely in both directions, determined by any two distinct points." */
export function buildLineScene(): SceneSpec {
  return framed(raw_buildLineScene())
}
function raw_buildLineScene(): SceneSpec {
  const { A, B, other } = LINE2
  const out = (t: number) => { const p = onLine(A, B, t); return P(p[0], p[1]) }
  return {
    id: 'math-line',
    title: 'Line: through two points, forever',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that two distinct points determine exactly one line, which has no endpoints and goes on in both directions, while a single point lies on many lines.',
    ariaLabel:
      'Two points A and B. The one straight line through both, with arrowheads at each end to show it never stops, is line AB. Through A alone many different lines can be drawn, but only one of them also passes through B.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take two different points, A and B.', objects: [dot(P(A[0], A[1]), ROLE.input, 0.15), dot(P(B[0], B[1]), ROLE.input, 0.15), label('A', P(A[0] - 0.35, A[1] - 0.4), ROLE.input, 'primary'), label('B', P(B[0] + 0.35, B[1] + 0.4), ROLE.input, 'primary')] },
      {
        narration: 'There is exactly one straight line through both. It does not stop at A or B: the arrowheads show it goes on forever in both directions. This is line AB.',
        objects: [arrow(out(0.5), out(1.6), ROLE.ink), arrow(out(0.5), out(-0.55), ROLE.ink), label('line AB', P(-3.0, 0.75), ROLE.ink, 'primary')],
      },
      {
        narration: 'Through A alone you can draw as many lines as you like, but only one of them also passes through B. Two points are enough to fix a line.',
        objects: [...other.map((q) => arrow(P(A[0], A[1]), P(A[0] + (2.2 * (q[0] - A[0])) / dist(A, q), A[1] + 2.2 * (q[1] - A[1]) / dist(A, q)), ROLE.aid)), ...other.map((q) => arrow(P(A[0], A[1]), P(A[0] - 1.6 * (q[0] - A[0]) / dist(A, q), A[1] - 1.6 * (q[1] - A[1]) / dist(A, q)), ROLE.aid)), label('many lines through A', P(-3.0, -2.6), ROLE.aid, 'detail'), label('only one through A and B', P(2.6, -1.2), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 3. Line segment ──────────────────────────────────────────────────────────

export const SEG = { A: [-2.5, 0] as XY, B: [2.5, 0] as XY, rulerY: -0.95 } as const

/** KG: "The part of a line between two endpoints; has a finite measurable length." */
export function buildLineSegmentScene(): SceneSpec {
  return framed(raw_buildLineSegmentScene())
}
function raw_buildLineSegmentScene(): SceneSpec {
  const { A, B, rulerY } = SEG
  const length = dist(A, B)
  const ticks: SceneObject[] = []
  for (let i = 0; i <= length; i++) ticks.push(line(P(A[0] + i, rulerY), P(A[0] + i, rulerY - 0.22), ROLE.reference, 0.04), label(String(i), P(A[0] + i, rulerY - 0.65), ROLE.reference, 'detail'))
  return {
    id: 'math-line-segment',
    title: 'Line segment: the part between two endpoints',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a segment as the part of a line between two endpoints, and that, unlike a line, it can be measured.',
    ariaLabel:
      'A line through points A and B with arrowheads at both ends. The part between A and B is the segment AB, with two endpoints. Laid against a ruler it is 5 units long.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Here is a line through A and B. It has no ends, so its length cannot be measured.', objects: [arrow(P(0, 0), P(4.4, 0), ROLE.reference), arrow(P(0, 0), P(-4.4, 0), ROLE.reference), dot(P(A[0], A[1]), ROLE.input, 0.14), dot(P(B[0], B[1]), ROLE.input, 0.14), label('A', P(A[0], 0.55), ROLE.input, 'primary'), label('B', P(B[0], 0.55), ROLE.input, 'primary')] },
      { narration: 'Keep only the part from A to B, with both endpoints. That is the line segment AB.', objects: [line(P(A[0], A[1]), P(B[0], B[1]), ROLE.ink, 0.09), label('segment AB', P(0, 0.6), ROLE.ink, 'primary')] },
      { narration: 'Because it has two endpoints it has a length you can measure. Against the ruler, AB is 5 units long.', objects: [line(P(A[0], rulerY), P(B[0], rulerY), ROLE.reference, 0.04), ...ticks, label(`length AB = ${length}`, P(0, rulerY - 1.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Ray ───────────────────────────────────────────────────────────────────

export const RAY = { A: [-2.5, 0.8] as XY, B: [0.5, 0.8] as XY, A2: [-2.5, -1.2] as XY, B2: [0.5, -1.2] as XY, reach: 4.4 } as const

/** KG: "A part of a line with one endpoint that extends infinitely in one direction." */
export function buildRayScene(): SceneSpec {
  return framed(raw_buildRayScene())
}
function raw_buildRayScene(): SceneSpec {
  const { A, B, A2, B2, reach } = RAY
  return {
    id: 'math-ray',
    title: 'Ray: one endpoint, one direction forever',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a ray as a part of a line that starts at one endpoint, passes through a second point and never stops, and that ray AB and ray BA are different rays.',
    ariaLabel:
      'Ray AB starts at the endpoint A, passes through B and has an arrowhead showing it goes on forever to the right. Ray BA starts at B, passes through A and goes on forever to the left. They are different rays.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A ray begins at one point, its endpoint. Here the endpoint is A, and the ray will pass through B.', objects: [dot(P(A[0], A[1]), ROLE.input, 0.16), dot(P(B[0], B[1]), ROLE.output, 0.14), label('A', P(A[0], A[1] + 0.55), ROLE.input, 'primary'), label('B', P(B[0], B[1] + 0.55), ROLE.output, 'primary'), label('endpoint', P(A[0], A[1] - 0.6), ROLE.input, 'detail')] },
      { narration: 'Ray AB starts at A, goes through B and keeps going. It has one endpoint, and the arrowhead shows it never stops.', objects: [arrow(P(A[0], A[1]), P(reach, A[1]), ROLE.ink), label('ray AB', P(2.6, A[1] + 0.55), ROLE.ink, 'primary')] },
      { narration: 'Ray BA is different: it starts at B, goes through A and runs the other way. The order of the letters tells you which point is the endpoint.', objects: [dot(P(A2[0], A2[1]), ROLE.output, 0.14), dot(P(B2[0], B2[1]), ROLE.input, 0.16), label('A', P(A2[0], A2[1] - 0.55), ROLE.output, 'primary'), label('B', P(B2[0], B2[1] - 0.55), ROLE.input, 'primary'), arrow(P(B2[0], B2[1]), P(-reach, B2[1]), ROLE.result), label('ray BA', P(-3.4, B2[1] - 0.55), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Plane ─────────────────────────────────────────────────────────────────

/** A slanted sheet and three points that are not on one line. */
export const PLANE = {
  sheet: [[-3.6, -1.8], [2.4, -1.8], [4.0, 1.6], [-2.0, 1.6]] as XY[],
  pts: [[-1.8, -0.7], [1.8, -0.9], [0.4, 0.9]] as XY[],
} as const

/** KG: "A two-dimensional flat surface extending infinitely; determined by any three non-collinear points." */
export function buildPlaneScene(): SceneSpec {
  return framed(raw_buildPlaneScene())
}
function raw_buildPlaneScene(): SceneSpec {
  const { sheet, pts } = PLANE
  const [A, B, C] = pts
  const ext = (a: XY, b: XY, t0: number, t1: number) => [onLine(a, b, t0), onLine(a, b, t1)] as const
  const edgeArrow = (a: XY, b: XY, t0: number, t1: number) => { const [p, q] = ext(a, b, t0, t1); return arrow(P(p[0], p[1]), P(q[0], q[1]), ROLE.aid) }
  return {
    id: 'math-plane',
    title: 'Plane: a flat surface through three points',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that three points not on one line fix exactly one flat surface, the plane, which goes on forever, and that a line through two of its points lies entirely in it.',
    ariaLabel:
      'Three points A, B and C that do not lie on one line. A flat sheet through them is a plane; the sheet is drawn with edges but a plane goes on forever. The lines through pairs of the points, extended, stay in the plane.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take three points that are not on one straight line.', objects: [...pts.map((p) => dot(P(p[0], p[1]), ROLE.input, 0.15)), ...pts.map((p, i) => label('ABC'[i], P(p[0] + (i === 2 ? 0.1 : 0), p[1] + (i === 2 ? 0.5 : -0.45)), ROLE.input, 'primary'))] },
      { narration: 'Exactly one flat surface passes through all three. That is the plane ABC. The sheet drawn here has edges, but a plane has none: it goes on forever.', objects: [...polyLines(sheet, ROLE.output, 0.05), ...shadeConvex(sheet, 0.22, ROLE.output, 0.015), label('plane ABC', P(2.3, 1.1), ROLE.output, 'primary')] },
      {
        narration: 'Any line through two points of a plane lies completely in it. Extend AB, BC and CA: they run on in the plane, past the edge of the sheet.',
        objects: [edgeArrow(A, B, -0.8, 1.7), edgeArrow(B, C, -0.25, 1.9), edgeArrow(C, A, -0.25, 1.9), label('lines in the plane stay in it', P(0, -2.5), ROLE.aid, 'detail')],
      },
    ],
  }
}

// ── 6. Perpendicular lines ───────────────────────────────────────────────────

/** Line L is y = 0 (math); P = (0, 3); the foot is F = (0, 0); other points Q = (4, 0), R = (-4, 0). */
export const PERP = { u: 0.62, oy: -0.9, P: [0, 3] as XY, F: [0, 0] as XY, Q: [4, 0] as XY, R: [-4, 0] as XY } as const

/** KG: "Two lines intersecting at 90°; the perpendicular from a point to a line is the shortest segment from the point to the line." */
export function buildPerpendicularLinesScene(): SceneSpec {
  return framed(raw_buildPerpendicularLinesScene())
}
function raw_buildPerpendicularLinesScene(): SceneSpec {
  const { u, oy, P: Pp, F, Q, R } = PERP
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const sx = (p: XY): XY => [p[0] * u, p[1] * u + oy]
  return {
    id: 'math-perpendicular-lines',
    title: 'Perpendicular lines: 90°, and the shortest distance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show perpendicular lines meeting at 90 degrees, and that the perpendicular from a point to a line is the shortest segment from the point to the line.',
    ariaLabel:
      'A horizontal line and a vertical line meeting at a right angle marked 90 degrees. Then a point P above a horizontal line L: the perpendicular segment from P down to L has length 3, and the slanted segments from P to points 4 units to the left or right on L each have length 5, so the perpendicular is the shortest.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Perpendicular lines meet at a right angle, 90°. The little square marks it.', objects: [line(S(-5.2, 0), S(5.2, 0), ROLE.ink, 0.06), line(S(0, -1.4), S(0, 4.2), ROLE.ink, 0.06), ...rightAngleMark(...sx([0, 0]), [1, 0], [0, 1], 0.3, ROLE.result), label('90°', P(0.75, oy + 0.65), ROLE.result, 'primary')] },
      { narration: 'Now a point P above the line L. Drop the perpendicular from P to L: it lands at F. This segment PF is 3 long.', objects: [dot(S(Pp[0], Pp[1]), ROLE.input, 0.15), label('P', S(0.5, 3.3), ROLE.input, 'primary'), line(S(Pp[0], Pp[1]), S(F[0], F[1]), ROLE.result, 0.07), label('perpendicular', S(1.8, 1.5), ROLE.result, 'detail')] },
      { narration: 'Any other segment from P to L is slanted and longer: from P to a point 4 along is 5 (a 3-4-5 triangle). The perpendicular, 3, is the shortest distance from P to L.', objects: [line(S(Pp[0], Pp[1]), S(Q[0], Q[1]), ROLE.input, 0.045), line(S(Pp[0], Pp[1]), S(R[0], R[1]), ROLE.input, 0.045), label('5', S(2.4, 1.9), ROLE.input, 'primary'), label('5', S(-2.4, 1.9), ROLE.input, 'primary'), label('3', S(-0.45, 1.5), ROLE.result, 'primary'), label('shortest: 3 < 5', S(0, -1.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Trapezoid ─────────────────────────────────────────────────────────────

/** Trapezoid (0,0) (8,0) (6,3) (2,3): bases 8 and 4, height 3. */
export const TRAP = { u: 0.5, poly: [[0, 0], [8, 0], [6, 3], [2, 3]] as XY[], b1: 4, b2: 8, h: 3 } as const
/** Rotate p by 180 degrees about c. */
export const rot180 = (p: XY, c: XY): XY => [2 * c[0] - p[0], 2 * c[1] - p[1]]
export const trapezoidArea = (b1: number, b2: number, h: number) => ((b1 + b2) * h) / 2

/** KG: "A quadrilateral with exactly one pair of parallel sides (the bases); area = ½(b₁ + b₂)h." */
export function buildTrapezoidScene(): SceneSpec {
  return framed(raw_buildTrapezoidScene())
}
function raw_buildTrapezoidScene(): SceneSpec {
  const { u, poly, b1, b2, h } = TRAP
  const centre: XY = [(poly[1][0] + poly[2][0]) / 2, (poly[1][1] + poly[2][1]) / 2]          // midpoint of the right leg
  const copy = poly.map((p) => rot180(p, centre))
  const ox = -7 * u, oy = -1.5 * u            // centre the 0..14 by 0..3 drawing on the origin
  const S = (p: XY): XY => [ox + p[0] * u, oy + p[1] * u]
  const sp = poly.map(S), sc = copy.map(S)
  const A = trapezoidArea(b1, b2, h)
  return {
    id: 'math-trapezoid',
    title: 'Trapezoid: area = ½(b₁ + b₂)h',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a trapezoid has exactly one pair of parallel sides, the bases, and that two copies, one turned upside down, make a parallelogram, so the area is half of (b1 + b2) times the height.',
    ariaLabel:
      'A trapezoid with a top base of 4, a bottom base of 8 and height 3. A copy turned upside down fits against it to make a parallelogram with base 4 plus 8, which is 12, and height 3, so area 36. The trapezoid is half of that: 18, which is one half times (4 plus 8) times 3.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A trapezoid has exactly one pair of parallel sides, the bases. This one has a top base b₁ = 4, a bottom base b₂ = 8 and a height h = 3 (measured square to the bases).',
        objects: [...polyLines(sp, ROLE.ink, 0.06), ...shadeConvex(sp, 0.12, ROLE.output), label('b₁ = 4', P(...S([4, 3.55])), ROLE.ink, 'detail'), label('b₂ = 8', P(...S([4, -0.55])), ROLE.ink, 'detail'), line(P(...S([2, 3])), P(...S([2, 0])), ROLE.aid, 0.03), label('h = 3', P(...S([1.0, 1.5])), ROLE.aid, 'detail')],
      },
      {
        narration: 'Make a copy and turn it upside down (half a turn). It fits against the right-hand slanted side exactly.',
        objects: [...polyLines(sc, ROLE.result, 0.05), ...shadeConvex(sc, 0.12, ROLE.result)],
      },
      {
        narration: 'Together they make a parallelogram with base b₁ + b₂ = 12 and height 3: area 12 × 3 = 36. The trapezoid is half of it: ½ × (4 + 8) × 3 = 18.',
        objects: [label(`parallelogram: ${b1 + b2} × ${h} = ${(b1 + b2) * h}`, P(...S([7, -1.4])), ROLE.result, 'primary'), label(`trapezoid: ½(${b1} + ${b2}) × ${h} = ${A}`, P(...S([7, 4.6])), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 8. Area ──────────────────────────────────────────────────────────────────

/** A 4 x 3 rectangle, a right triangle on a 4 x 3 base, and an L-shape (the rectangle plus a 2 x 1 block). */
export const AREA = { u: 0.65, rect: [4, 3], tri: [4, 3], extra: [2, 1] } as const

/** KG: "The measure of the two-dimensional extent of a figure; for curved regions computed via integration." */
export function buildAreaScene(): SceneSpec {
  return framed(raw_buildAreaScene())
}
function raw_buildAreaScene(): SceneSpec {
  const { u, rect, tri, extra } = AREA
  const grid = (x0: number, y0: number, w: number, h: number, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    for (let i = 0; i <= w; i++) out.push(line(P(x0 + i * u, y0), P(x0 + i * u, y0 + h * u), color, i === 0 || i === w ? 0.05 : 0.02))
    for (let j = 0; j <= h; j++) out.push(line(P(x0, y0 + j * u), P(x0 + w * u, y0 + j * u), color, j === 0 || j === h ? 0.05 : 0.02))
    return out
  }
  const rx = -4.3, ry = 0.6, tx = 0.7
  const triPoly: XY[] = [[tx, ry], [tx + tri[0] * u, ry], [tx, ry + tri[1] * u]]
  const ly = -2.2
  // the L-shape is the rectangle plus the bump on its right
  const Lrect = grid(rx, ly, rect[0], rect[1], ROLE.output)
  const bumpX = rx + rect[0] * u
  return {
    id: 'math-area',
    title: 'Area: counting unit squares',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show area as the number of unit squares that cover a figure: a 4 by 3 rectangle holds 12, a triangle on the same base and height holds half of that, and areas of pieces add.',
    ariaLabel:
      'A rectangle 4 squares wide and 3 tall covered by 12 unit squares, area 12. A right triangle with the same base and height covers half of such a rectangle, area 6. A larger shape made of the 4 by 3 rectangle plus a 2 by 1 block has area 12 plus 2, which is 14.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Area measures how much flat space a shape covers, counted in unit squares. This rectangle is 4 squares wide and 3 tall: 4 × 3 = 12 squares.', objects: [...grid(rx, ry, rect[0], rect[1], ROLE.output), label(`${rect[0]} × ${rect[1]} = ${rect[0] * rect[1]}`, P(rx + (rect[0] * u) / 2, ry + rect[1] * u + 0.45), ROLE.output, 'primary')] },
      { narration: 'A right triangle with the same base and height fills exactly half of that rectangle: ½ × 4 × 3 = 6 squares.', objects: [...polyLines(triPoly, ROLE.result, 0.06), ...grid(tx, ry, tri[0], tri[1], ROLE.reference), label(`½ × ${tri[0]} × ${tri[1]} = ${(tri[0] * tri[1]) / 2}`, P(tx + (tri[0] * u) / 2, ry + tri[1] * u + 0.45), ROLE.result, 'primary')] },
      { narration: 'Areas add. This shape is the 4 × 3 rectangle plus a 2 × 1 block: 12 + 2 = 14 squares. (Curved regions are measured with integration, later.)', objects: [...Lrect, ...grid(bumpX, ly, extra[0], extra[1], ROLE.input), label(`${rect[0] * rect[1]} + ${extra[0] * extra[1]} = ${rect[0] * rect[1] + extra[0] * extra[1]}`, P(rx + ((rect[0] + extra[0]) * u) / 2 + 0.1, ly - 0.5), ROLE.input, 'primary')] },
    ],
  }
}

// ── 9. Translation ───────────────────────────────────────────────────────────

export const TRANS = { u: 0.8, ox: -0.1, oy: -0.45, tri: [[-3, -1], [-1, -1], [-2, 1]] as XY[], v: [4, 2] as XY } as const
export const translate = (p: XY, v: XY): XY => [p[0] + v[0], p[1] + v[1]]

/** KG: "A transformation that moves every point by the same vector (h, k), preserving shape, size, and orientation." */
export function buildTranslationScene(): SceneSpec {
  return framed(raw_buildTranslationScene())
}
function raw_buildTranslationScene(): SceneSpec {
  const { u, ox, oy, tri, v } = TRANS
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const sx = (p: XY): XY => [p[0] * u + ox, p[1] * u + oy]
  const img = tri.map((p) => translate(p, v))
  const names = ['A', 'B', 'C']
  return {
    id: 'math-translation',
    title: 'Translation: slide every point by the same vector',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a translation as moving every point of a figure by the same vector (h, k), so the image is the same shape and size and faces the same way.',
    ariaLabel:
      'A triangle ABC with vertices (-3, -1), (-1, -1) and (-2, 1). Every vertex slides by the vector (4, 2): 4 right and 2 up. The image triangle A prime B prime C prime has vertices (1, 1), (3, 1) and (2, 3): the same shape and size, facing the same way.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Triangle ABC. A translation will slide the whole triangle without turning or flipping it.', objects: [...mathAxes(S, -5.2, 5.2, -3.4, 4.6), ...polyLines(tri.map(sx), ROLE.input, 0.06), ...tri.map((p, i) => label(names[i], P(...sx([p[0] + (i === 0 ? -0.5 : i === 1 ? 0.5 : 0), p[1] + (i === 2 ? 0.6 : -0.5)])), ROLE.input, 'primary'))] },
      { narration: 'Choose a vector, (4, 2): 4 to the right and 2 up. Every single point moves by exactly this vector, so all the arrows are parallel and the same length.', objects: [...tri.map((p) => arrow(P(...sx(p)), P(...sx(translate(p, v))), ROLE.aid)), label('vector (4, 2)', S(0.2, 0.0 - 1.6), ROLE.aid, 'primary')] },
      { narration: 'The image A′B′C′ is the same shape and size as ABC, facing the same way, just somewhere else: translation preserves shape, size and orientation.', objects: [...polyLines(img.map(sx), ROLE.result, 0.06), ...img.map((p, i) => label(`${names[i]}′`, P(...sx([p[0] + (i === 0 ? -0.5 : i === 1 ? 0.5 : 0), p[1] + (i === 2 ? 0.6 : -0.5)])), ROLE.result, 'primary')), label('same shape, same size', S(4.2, -1.6), ROLE.result, 'detail')] },
    ],
  }
}

// ── 10. Rotation ─────────────────────────────────────────────────────────────

export const ROT = { u: 0.8, ox: -0.88, oy: -1.52, tri: [[2, 0], [4, 0], [2, 1.5]] as XY[], deg: 90 } as const
/** Rotate p by deg degrees counter-clockwise about the origin. */
export const rotate = (p: XY, deg: number): XY => {
  const t = (deg * Math.PI) / 180
  return [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)]
}

/** KG: "A transformation that turns every point by angle θ about a fixed center; expressed by a 2×2 rotation matrix." */
export function buildRotationScene(): SceneSpec {
  return framed(raw_buildRotationScene())
}
function raw_buildRotationScene(): SceneSpec {
  const { u, ox, oy, tri, deg } = ROT
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const sx = (p: XY): XY => [p[0] * u + ox, p[1] * u + oy]
  const img = tri.map((p) => rotate(p, deg).map((c) => Math.round(c * 1e9) / 1e9) as XY)
  const names = ['P', 'Q', 'R']
  const arc = (p: XY) => {
    const r = Math.hypot(p[0], p[1]), a0 = (Math.atan2(p[1], p[0]) * 180) / Math.PI
    return curve(arcPts(ox, oy, r * u, a0, a0 + deg, 20), ROLE.aid)
  }
  return {
    id: 'math-rotation',
    title: 'Rotation: turn every point about a centre',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a rotation as turning every point of a figure by the same angle about a fixed centre, keeping each point at the same distance from that centre, so the image is the same shape and size.',
    ariaLabel:
      'A triangle PQR and a centre O at the origin. Every vertex is turned 90 degrees counter-clockwise about O along a circular arc, so (x, y) goes to (-y, x). The image triangle has vertices (0, 2), (0, 4) and (-1.5, 2): the same shape and size, with each vertex the same distance from O as before.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Triangle PQR and a fixed centre O. A rotation turns the whole figure about O.', objects: [...mathAxes(S, -2.4, 4.8, -1.2, 5.0), ...polyLines(tri.map(sx), ROLE.input, 0.06), dot(S(0, 0), ROLE.ink, 0.15), label('centre O', S(-0.4, -0.75), ROLE.ink, 'detail'), ...tri.map((p, i) => label(names[i], P(...sx([p[0] + (i === 1 ? 0.45 : i === 0 ? 0.35 : -0.35), p[1] + (i === 2 ? 0.55 : -0.5)])), ROLE.input, 'primary'))] },
      { narration: 'Turn every point 90° counter-clockwise about O. Each point travels along a circle centred on O, so it stays the same distance from O.', objects: [...tri.map(arc), label('90°', S(2.6, 1.9), ROLE.aid, 'primary')] },
      { narration: 'The image is the same shape and size, turned a quarter turn. In coordinates a 90° turn sends (x, y) to (−y, x): P(2, 0) goes to (0, 2).', objects: [...polyLines(img.map(sx), ROLE.result, 0.06), ...img.map((p, i) => label(`${names[i]}′`, P(...sx([p[0] + (i === 2 ? -0.55 : 0.55), p[1] + (i === 2 ? 0.2 : 0.2)])), ROLE.result, 'primary')), label('(x, y) → (−y, x)', S(2.6, 4.3), ROLE.result, 'detail')] },
    ],
  }
}

// ── 11. Reflection ───────────────────────────────────────────────────────────

/** Mirror line x = 0; triangle ABC is counter-clockwise, its image is clockwise. */
export const REFL = { u: 0.8, oy: -1.2, tri: [[1, 0.5], [3.5, 1], [1.5, 3]] as XY[] } as const
export const reflectY = (p: XY): XY => [-p[0], p[1]]

/** KG: "A transformation that flips every point over a line of reflection, reversing orientation." */
export function buildTransformReflectionScene(): SceneSpec {
  return framed(raw_buildTransformReflectionScene())
}
function raw_buildTransformReflectionScene(): SceneSpec {
  const { u, oy, tri } = REFL
  const sx = (p: XY): XY => [p[0] * u, p[1] * u + oy]
  const img = tri.map(reflectY)
  const names = ['A', 'B', 'C']
  const lab = (p: XY, i: number, text: string, color: string, sign: number) => label(text, P(...sx([p[0] + sign * (i === 1 ? 0.5 : i === 0 ? 0.0 : -0.1 * sign), p[1] + (i === 0 ? -0.5 : i === 2 ? 0.55 : 0.1)])), color, 'primary')
  return {
    id: 'math-reflection',
    title: 'Reflection: flip every point over a mirror line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a reflection as flipping every point over a mirror line to the same distance on the other side, so the image is the same shape and size but the order of the corners is reversed.',
    ariaLabel:
      'A mirror line m and a triangle ABC on its right. Each vertex is joined by a horizontal segment, perpendicular to m, to its image on the left at the same distance from m. The image triangle A prime B prime C prime is the same shape and size, but its corners run the opposite way round: counter-clockwise ABC becomes clockwise.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A mirror line m, and triangle ABC on one side of it. Going A → B → C turns to the left (counter-clockwise).', objects: [line(P(...sx([0, -0.8])), P(...sx([0, 3.9])), ROLE.aid, 0.045), label('mirror m', P(...sx([0.1, 4.4])), ROLE.aid, 'primary'), ...polyLines(tri.map(sx), ROLE.input, 0.06), ...tri.map((p, i) => lab(p, i, names[i], ROLE.input, 1))] },
      { narration: 'Flip every point straight across the mirror: each guide is perpendicular to m, and the image is exactly as far behind the mirror as the point is in front.', objects: [...tri.map((p) => guide(P(...sx(p)), P(...sx(reflectY(p))), ROLE.aid, 0.025)), ...tri.map((p) => dot(P(...sx([0, p[1]])), ROLE.aid, 0.06))] },
      { narration: 'The image A′B′C′ is the same shape and size, but flipped: A′ → B′ → C′ now turns to the right (clockwise). A reflection reverses orientation.', objects: [...polyLines(img.map(sx), ROLE.result, 0.06), ...img.map((p, i) => lab(p, i, `${names[i]}′`, ROLE.result, -1)), label('same size, order reversed', P(0, -1.9), ROLE.result, 'detail')] },
    ],
  }
}

// ── 12. Dilation ─────────────────────────────────────────────────────────────

export const DIL = { u: 0.7, ox: -2.4, oy: -1.5, tri: [[2, 1], [3.4, 1], [2.4, 2.1]] as XY[], k: 2 } as const
export const dilate = (p: XY, k: number): XY => [p[0] * k, p[1] * k]

/** KG: "A transformation scaling distances from a center by a constant factor k; produces a similar figure of different size." */
export function buildDilationScene(): SceneSpec {
  return framed(raw_buildDilationScene())
}
function raw_buildDilationScene(): SceneSpec {
  const { u, ox, oy, tri, k } = DIL
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const sx = (p: XY): XY => [p[0] * u + ox, p[1] * u + oy]
  const img = tri.map((p) => dilate(p, k))
  const names = ['A', 'B', 'C']
  return {
    id: 'math-dilation',
    title: 'Dilation: scale from a centre by a factor k',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a dilation as moving every point along the ray from the centre to k times its distance, producing a similar figure: same angles, all lengths multiplied by k, matching sides parallel.',
    ariaLabel:
      'A small triangle ABC and a centre O at the origin. Rays from O through each vertex continue to points twice as far from O: A prime, B prime and C prime. The big triangle A prime B prime C prime has the same angles as ABC with every side twice as long, and each side parallel to its match: a dilation with factor 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A small triangle ABC and a centre O. A dilation with scale factor k = 2 will stretch distances from O by 2.', objects: [dot(S(0, 0), ROLE.ink, 0.15), label('centre O', S(0.3, -0.7), ROLE.ink, 'detail'), ...polyLines(tri.map(sx), ROLE.input, 0.06), ...tri.map((p, i) => label(names[i], P(...sx([p[0] + (i === 0 ? -0.45 : i === 1 ? 0.2 : -0.45), p[1] + (i === 2 ? 0.2 : -0.5)])), ROLE.input, 'primary'))] },
      { narration: 'Draw a ray from O through each vertex and mark the point twice as far from O: OA′ = 2·OA, OB′ = 2·OB, OC′ = 2·OC.', objects: [...tri.map((p) => guide(S(0, 0), P(...sx(dilate(p, k))), ROLE.aid, 0.025)), ...tri.map((p) => dot(P(...sx(dilate(p, k))), ROLE.output, 0.13)), label(`k = ${k}`, S(0.7, 3.4), ROLE.aid, 'primary')] },
      { narration: 'Join the new points: A′B′C′ has the same angles as ABC, every side twice as long, and each side parallel to its match. The two triangles are similar.', objects: [...polyLines(img.map(sx), ROLE.result, 0.06), ...img.map((p, i) => label(`${names[i]}′`, P(...sx([p[0] + (i === 0 ? -0.5 : i === 1 ? 0.5 : -0.4), p[1] + (i === 2 ? 0.3 : -0.5)])), ROLE.result, 'primary')), label('similar: sides × 2', S(6.4, 3.6), ROLE.result, 'detail')] },
    ],
  }
}
