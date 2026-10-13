/**
 * Core school-mathematics figures — batch 1 of the mathematics visual campaign
 * (2026-10-11).
 *
 * A local audit over all 908 mathematics concepts (the real registry functions,
 * no network) found 47 with a fixed figure; about 346 are concepts whose meaning
 * IS a picture (shapes, graphs, vectors, number lines, distributions). These
 * twelve are core-level (developing / proficient) concepts from six domains,
 * none of which had any figure. Same rules as the physics campaign
 * (physicsCoreScenes.ts): one visual language from visualDesign.ts, labels are
 * names not sentences (<= 9 per figure), steps are cumulative, coordinates
 * inside +-5, and every number drawn is computed rather than eyeballed.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what
 * is produced or compared, green is the result, violet is a construction aid,
 * slate is axes and inert reference geometry.
 *
 * Each figure is grounded in its concept's own KG description and draws what
 * that description defines. No stage grid or axis triad: these figures draw
 * their own 2-D axes where they need them.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { frameReport, TARGET_FRAME_FILL } from '@/lib/teaching/visual/layout'

export type V3 = [number, number, number]
const r2 = (n: number) => Math.round(n * 100) / 100
const P = (x: number, y: number): V3 => [r2(x), r2(y), 0]
const NO_STAGE = { grid: false, axes: false } as const

/**
 * Pull the camera in so the figure fills about 78% of the frame (the same target
 * layout.ts uses). These are flat 2-D graphs spanning less than the +-5 canvas, so
 * the default distance leaves them small. Pure: only cameraDistance changes.
 */
function framed(spec: SceneSpec): SceneSpec {
  const probe = frameReport({ ...spec, cameraDistance: 13 })
  if (!probe.fill) return spec
  const d = Math.min(13, Math.max(7, Math.round((13 * probe.fill / TARGET_FRAME_FILL) * 10) / 10))
  return { ...spec, cameraDistance: d }
}

/** Sample y = fn(x) over [x0, x1] densely enough for curve(). */
function sample(fn: (x: number) => number, x0: number, x1: number, n = 72, dx = 0, dy = 0): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    pts.push(P(x + dx, fn(x) + dy))
  }
  return pts
}

/** Two perpendicular axes crossing at (cx, cy). */
function axes(cx: number, cy: number, x0: number, x1: number, y0: number, y1: number): SceneObject[] {
  return [arrow(P(x0, cy), P(x1, cy), ROLE.reference), arrow(P(cx, y0), P(cx, y1), ROLE.reference)]
}

/** A dashed-looking guide: a thin line (the renderer draws solid cylinders, so thin = guide). */
const guide = (a: V3, b: V3, color: string = ROLE.aid): SceneObject => line(a, b, color, 0.02)

/** Diagonal hatching of the rectangle [x0,x1]x[y0,y1] with lines x - y = c, spacing gap. */
function hatchRect(x0: number, y0: number, x1: number, y1: number, gap: number, color: string): SceneObject[] {
  const out: SceneObject[] = []
  for (let c = x0 - y1 + gap; c < x1 - y0; c += gap) {
    // line y = x - c clipped to the rectangle
    const xa = Math.max(x0, y0 + c), xb = Math.min(x1, y1 + c)
    if (xb - xa > 0.01) out.push(line(P(xa, xa - c), P(xb, xb - c), color, 0.025))
  }
  return out
}

function rectLines(x0: number, y0: number, x1: number, y1: number, color: string, t = 0.05): SceneObject[] {
  return [
    line(P(x0, y0), P(x1, y0), color, t), line(P(x1, y0), P(x1, y1), color, t),
    line(P(x1, y1), P(x0, y1), color, t), line(P(x0, y1), P(x0, y0), color, t),
  ]
}

// ── 1. Pythagorean theorem ───────────────────────────────────────────────────

/** Legs 3 and 4, hypotenuse 5, drawn at S units per length-unit. */
export const PYTH = { a: 3, b: 4, c: 5, S: 0.55 } as const
export const PYTH_AREAS = { a2: PYTH.a ** 2, b2: PYTH.b ** 2, c2: PYTH.c ** 2 } as const

/** Unit vector along the hypotenuse B→C, and the outward (away from the right angle) unit normal, for legs a, b and hypotenuse c. */
export function pythagorasGeometry() {
  const { a, b, c } = PYTH
  return { u: [-b / c, a / c] as const, nOut: [a / c, b / c] as const }
}

/**
 * KG: "In a right triangle with legs a, b and hypotenuse c: a² + b² = c²."
 * The classic area picture: a square on each side of a 3-4-5 triangle, cut into
 * unit cells so the learner can COUNT 9 + 16 = 25.
 */
export function buildPythagoreanScene(): SceneSpec {
  return framed(raw_buildPythagoreanScene())
}
function raw_buildPythagoreanScene(): SceneSpec {
  const { a, b, c, S } = PYTH
  const { u, nOut } = pythagorasGeometry()
  const shift: [number, number] = [-1.1, -0.825]       // centres the figure (extent x -1.65..3.85, y -2.2..3.85)
  const Q = (x: number, y: number) => P(x + shift[0], y + shift[1])
  const Bx = b * S, Cy = a * S
  const hyp = (i: number, j: number) => Q(Bx + u[0] * S * i + nOut[0] * S * j, u[1] * S * i + nOut[1] * S * j)
  const box = (x0: number, y0: number, x1: number, y1: number, color: string): SceneObject[] => [
    line(Q(x0, y0), Q(x1, y0), color, 0.05), line(Q(x1, y0), Q(x1, y1), color, 0.05),
    line(Q(x1, y1), Q(x0, y1), color, 0.05), line(Q(x0, y1), Q(x0, y0), color, 0.05),
  ]

  const triangle: SceneObject[] = [
    line(Q(0, 0), Q(Bx, 0), ROLE.ink, 0.06), line(Q(Bx, 0), Q(0, Cy), ROLE.ink, 0.06), line(Q(0, Cy), Q(0, 0), ROLE.ink, 0.06),
    // right-angle marker
    line(Q(0.28, 0), Q(0.28, 0.28), ROLE.reference, 0.03), line(Q(0.28, 0.28), Q(0, 0.28), ROLE.reference, 0.03),
    label(`a = ${a}`, Q(-0.5, Cy / 2), ROLE.ink, 'detail'),
    label(`b = ${b}`, Q(Bx / 2, 0.42), ROLE.ink, 'detail'),
    label(`c = ${c}`, Q(Bx / 2 + 0.7, Cy / 2 + 0.55), ROLE.ink, 'detail'),
  ]

  // squares on the legs, cut into unit cells (b x b below the horizontal leg, a x a left of the vertical leg)
  const legCells: SceneObject[] = []
  for (let k = 1; k < b; k++) legCells.push(line(Q(k * S, 0), Q(k * S, -b * S), ROLE.output, 0.018), line(Q(0, -k * S), Q(b * S, -k * S), ROLE.output, 0.018))
  for (let k = 1; k < a; k++) legCells.push(line(Q(-k * S, 0), Q(-k * S, a * S), ROLE.input, 0.018), line(Q(-a * S, k * S), Q(0, k * S), ROLE.input, 0.018))
  const legBoxes: SceneObject[] = [...box(0, -b * S, Bx, 0, ROLE.output), ...box(-a * S, 0, 0, Cy, ROLE.input)]

  const hypSquare: SceneObject[] = [
    line(hyp(0, 0), hyp(c, 0), ROLE.result, 0.05), line(hyp(c, 0), hyp(c, c), ROLE.result, 0.05),
    line(hyp(c, c), hyp(0, c), ROLE.result, 0.05), line(hyp(0, c), hyp(0, 0), ROLE.result, 0.05),
  ]
  for (let k = 1; k < c; k++) hypSquare.push(line(hyp(k, 0), hyp(k, c), ROLE.result, 0.016), line(hyp(0, k), hyp(c, k), ROLE.result, 0.016))

  return {
    id: 'math-pythagorean-theorem',
    title: 'Pythagorean theorem: 9 + 16 = 25',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the squares on the two legs of a right triangle together have the same area as the square on the hypotenuse, counted in unit cells for the 3-4-5 triangle.',
    ariaLabel:
      'A right triangle with legs 3 and 4 and hypotenuse 5. A square is drawn on each side, cut into unit cells: 9 cells on the leg of 3, ' +
      '16 cells on the leg of 4 and 25 cells on the hypotenuse. 9 plus 16 equals 25.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A right triangle has two legs, a = 3 and b = 4, and the long side opposite the right angle, the hypotenuse c = 5.', objects: triangle },
      {
        narration: 'Draw a square on each leg and cut it into unit cells. The square on a has 3 × 3 = 9 cells; the square on b has 4 × 4 = 16.',
        objects: [...legBoxes, ...legCells, label(String(PYTH_AREAS.a2), Q(-(a * S) / 2, (a * S) / 2), ROLE.input, 'primary'), label(String(PYTH_AREAS.b2), Q((b * S) / 2, -(b * S) / 2), ROLE.output, 'primary')],
      },
      {
        narration: 'The square on the hypotenuse has 5 × 5 = 25 cells — exactly the 9 and the 16 together. That is a² + b² = c².',
        objects: [...hypSquare, label(String(PYTH_AREAS.c2), hyp(c / 2, c / 2), ROLE.result, 'primary'), label('a² + b² = c²', Q(-1.3, 3.0), ROLE.result, 'primary'), label('9 + 16 = 25', Q(-1.3, 2.35), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 2. Slope ─────────────────────────────────────────────────────────────────

/** Line through P1 = (-2, -1.5) with run 3 and rise 2: slope 2/3. */
export const SLOPE = { x1: -2, y1: -1.5, run: 3, rise: 2 } as const
export const slopeLineY = (x: number) => SLOPE.y1 + ((x - SLOPE.x1) * SLOPE.rise) / SLOPE.run

/**
 * KG: "the ratio of vertical change to horizontal change between any two points;
 * m = (y₂−y₁)/(x₂−x₁) … negative for falling lines."
 */
export function buildSlopeScene(): SceneSpec {
  return framed(raw_buildSlopeScene())
}
function raw_buildSlopeScene(): SceneSpec {
  const { x1, y1, run, rise } = SLOPE
  const x2 = x1 + run, y2 = y1 + rise
  const falling = (x: number) => -0.5 * x + 1.5
  return {
    id: 'math-slope',
    title: 'Slope: rise over run',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show slope as vertical change divided by horizontal change between two points on a line, and that a falling line has negative slope.',
    ariaLabel:
      'A coordinate plane with a rising line through two points. A horizontal run of 3 and a vertical rise of 2 form a right triangle under the line, ' +
      'so the slope is 2 divided by 3. A second line falls from left to right and has negative slope.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Pick any two points on a line. P₁ and P₂ are two points on this one.',
        objects: [
          ...axes(0, 0, -3.9, 3.9, -2.9, 2.9), label('x', P(3.7, 0.35), ROLE.reference, 'detail'), label('y', P(0.35, 2.75), ROLE.reference, 'detail'),
          line(P(-3.4, slopeLineY(-3.4)), P(3.4, slopeLineY(3.4)), ROLE.ink, 0.06),
          dot(P(x1, y1), ROLE.ink, 0.14), dot(P(x2, y2), ROLE.ink, 0.14),
          label('P₁', P(x1 - 0.35, y1 - 0.4), ROLE.ink, 'primary'), label('P₂', P(x2 + 0.1, y2 + 0.45), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Go across from P₁ (the run, 3) and then up to P₂ (the rise, 2).',
        objects: [
          line(P(x1, y1), P(x2, y1), ROLE.input, 0.07), line(P(x2, y1), P(x2, y2), ROLE.output, 0.07),
          label(`run = ${run}`, P(x1 + run / 2, y1 - 0.45), ROLE.input, 'primary'), label(`rise = ${rise}`, P(x2 + 0.95, y1 + rise / 2), ROLE.output, 'primary'),
        ],
      },
      {
        narration: 'Slope m = rise ÷ run = 2/3. A line that falls from left to right has rise below zero, so its slope is negative.',
        objects: [
          label(`m = rise ÷ run = ${rise}/${run}`, P(2.0, -2.35), ROLE.result, 'primary'),
          line(P(-2.4, falling(-2.4)), P(3.4, falling(3.4)), ROLE.aid, 0.05), label('m < 0: falls', P(2.4, -0.45), ROLE.aid, 'detail'),
        ],
      },
    ],
  }
}

// ── 3. Parabola ──────────────────────────────────────────────────────────────

/** y = x²/4: focus (0, 1), directrix y = -1. Screen is shifted down by SHIFT_Y so the figure is centred. */
export const PARA = { f: 1, shiftY: -1.5, px: 3, qx: -2 } as const
export const paraY = (x: number) => (x * x) / 4
/** Distance from (x, y) to the focus, and to the directrix. */
export const distToFocus = (x: number, y: number) => Math.hypot(x, y - PARA.f)
export const distToDirectrix = (_x: number, y: number) => y + PARA.f

export function buildParabolaScene(): SceneSpec {
  return framed(raw_buildParabolaScene())
}
function raw_buildParabolaScene(): SceneSpec {
  const sy = PARA.shiftY
  const S = (x: number, y: number) => P(x, y + sy)
  const pY = paraY(PARA.px), qY = paraY(PARA.qx)
  const pd = r2(distToFocus(PARA.px, pY)), qd = r2(distToFocus(PARA.qx, qY))
  return {
    id: 'math-parabola',
    title: 'Parabola: equally far from focus and directrix',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that every point of a parabola is the same distance from the focus as from the directrix.',
    ariaLabel:
      'A parabola opening upward with its vertex at the bottom. A focus point sits inside the curve on its axis and a horizontal directrix line sits below the vertex. ' +
      'A point P on the curve is joined to the focus and straight down to the directrix, and both segments have length 3.25. A second point Q gives equal lengths of 2.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A parabola is built from a point, the focus F, and a line, the directrix. The vertex is halfway between them.',
        objects: [
          curve(sample(paraY, -4.2, 4.2, 84, 0, sy), ROLE.ink),
          line(S(-4.4, -PARA.f), S(4.4, -PARA.f), ROLE.reference, 0.05), label('directrix', S(3.4, -PARA.f - 0.45), ROLE.reference, 'detail'),
          guide(S(0, -PARA.f), S(0, 4.4), ROLE.aid), dot(S(0, PARA.f), ROLE.result, 0.15), label('F focus', S(0.8, PARA.f + 0.05), ROLE.result, 'primary'),
          dot(S(0, 0), ROLE.ink, 0.11), label('vertex', S(-0.95, -0.35), ROLE.ink, 'detail'),
        ],
      },
      {
        narration: 'Take a point P on the curve. Its distance to the focus (red) and its distance straight down to the directrix (blue) are equal: both 3.25.',
        objects: [
          dot(S(PARA.px, pY), ROLE.ink, 0.15), label('P', S(PARA.px + 0.3, pY + 0.4), ROLE.ink, 'primary'),
          line(S(PARA.px, pY), S(0, PARA.f), ROLE.input, 0.06), line(S(PARA.px, pY), S(PARA.px, -PARA.f), ROLE.output, 0.06),
          label(`PF = ${pd}`, S(1.1, 1.85), ROLE.input, 'detail'), label(`PD = ${r2(distToDirectrix(PARA.px, pY))}`, S(PARA.px + 1.05, 0.6), ROLE.output, 'detail'),
        ],
      },
      {
        narration: 'It holds for every point. Q is closer to the vertex, and again the two distances match: 2 and 2.',
        objects: [
          dot(S(PARA.qx, qY), ROLE.ink, 0.15), label('Q', S(PARA.qx - 0.3, qY + 0.4), ROLE.ink, 'primary'),
          line(S(PARA.qx, qY), S(0, PARA.f), ROLE.input, 0.06), line(S(PARA.qx, qY), S(PARA.qx, -PARA.f), ROLE.output, 0.06),
          label(`QF = QD = ${qd}`, S(-2.9, -0.45), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 4. Graph of a function ───────────────────────────────────────────────────

/** Left panel: f(u) = u²/2 + 0.2 with the vertical-line test at u = 1; right: a circle at u = 0.9. */
export const GRAPH_FN = { left: { cx: -2.5, cy: -1.4 }, right: { cx: 2.6, cy: -1.4 }, probe: 1, circleR: 1.5, circleU: 0.9 } as const
export const graphF = (u: number) => 0.5 * u * u + 0.2
export const circleYs = (u: number, r: number) => { const h = Math.sqrt(r * r - u * u); return [h, -h] as const }

export function buildGraphOfFunctionScene(): SceneSpec {
  return framed(raw_buildGraphOfFunctionScene())
}
function raw_buildGraphOfFunctionScene(): SceneSpec {
  const { left, right, probe, circleR, circleU } = GRAPH_FN
  const fx = (u: number) => P(left.cx + u, left.cy + graphF(u))
  const [yTop, yBot] = circleYs(circleU, circleR)
  const circle: V3[] = []
  for (let i = 0; i <= 72; i++) { const t = (i / 72) * 2 * Math.PI; circle.push(P(right.cx + circleR * Math.cos(t), 0.4 + circleR * Math.sin(t))) }
  return {
    id: 'math-graph-of-function',
    title: 'Graph of a function and the vertical line test',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the graph of f as the set of points (x, f(x)), and the vertical line test: a vertical line crosses the graph of a function at most once.',
    ariaLabel:
      'Two coordinate planes side by side. On the left a U-shaped curve is the graph of a function; a vertical line meets it at exactly one point, the point (x, f(x)). ' +
      'On the right a circle is not the graph of a function: a vertical line meets it at two points.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Each input x gives one output f(x). Plot every pair (x, f(x)) and you have the graph of f.',
        objects: [
          ...axes(left.cx, left.cy, -4.75, -0.35, -2.6, 2.4), label('x', P(-0.55, left.cy + 0.35), ROLE.reference, 'detail'), label('f(x)', P(left.cx + 0.6, 2.3), ROLE.reference, 'detail'),
          curve(sample(graphF, -1.9, 1.9, 60, left.cx, left.cy), ROLE.ink),
          dot(fx(probe), ROLE.result, 0.15), label('(x, f(x))', P(left.cx - 0.15, left.cy + 1.3), ROLE.result, 'detail'),
          guide(P(left.cx + probe, left.cy), fx(probe), ROLE.aid), guide(fx(probe), P(left.cx, left.cy + graphF(probe)), ROLE.aid),
        ],
      },
      {
        narration: 'Vertical line test: a vertical line meets the graph of a function once. This U-shaped graph passes.',
        objects: [line(P(left.cx + probe, -2.5), P(left.cx + probe, 2.2), ROLE.output, 0.04), label('function', P(left.cx, 3.2), ROLE.result, 'primary')],
      },
      {
        narration: 'A circle fails: the vertical line hits it twice, so one input would have two outputs. A circle is not the graph of a function.',
        objects: [
          ...axes(right.cx, right.cy, 0.4, 4.9, -2.6, 2.4),
          curve(circle, ROLE.ink),
          line(P(right.cx + circleU, -2.5), P(right.cx + circleU, 2.2), ROLE.output, 0.04),
          dot(P(right.cx + circleU, 0.4 + yTop), ROLE.input, 0.15), dot(P(right.cx + circleU, 0.4 + yBot), ROLE.input, 0.15),
          label('not a function', P(right.cx, 3.2), ROLE.input, 'primary'), label('two outputs', P(right.cx + 2.1, 0.4 + yTop + 0.55), ROLE.input, 'detail'),
        ],
      },
    ],
  }
}

// ── 5. Inverse functions ─────────────────────────────────────────────────────

/** f(x) = x³/4 and its inverse f⁻¹(x) = ∛(4x); the point (a, f(a)) with a = 1.6. */
export const INV = { a: 1.6, limit: 3.4 } as const
export const invF = (x: number) => (x * x * x) / 4
export const invFinv = (x: number) => Math.cbrt(4 * x)

export function buildInverseFunctionsScene(): SceneSpec {
  return framed(raw_buildInverseFunctionsScene())
}
function raw_buildInverseFunctionsScene(): SceneSpec {
  const { a, limit } = INV
  const b = invF(a)
  const xmax = invFinv(limit)
  return {
    id: 'math-inverse-functions',
    title: 'Inverse functions: reflect over y = x',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the graph of an inverse function is the mirror image of the graph of f across the line y = x, swapping each point (a, b) to (b, a).',
    ariaLabel:
      'A coordinate plane with a rising S-shaped curve for f, a dashed diagonal line y equals x, and a second curve that is the mirror image of the first across that diagonal. ' +
      'The point (a, b) on f is joined by a segment, crossing the diagonal at its middle, to the point (b, a) on the inverse.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Here is f(x) = x³/4. It never turns back, so each output comes from exactly one input and f can be undone.',
        objects: [
          ...axes(0, 0, -3.8, 3.8, -3.4, 3.4), label('x', P(3.5, -0.45), ROLE.reference, 'detail'), label('y', P(0.35, 3.3), ROLE.reference, 'detail'),
          curve(sample(invF, -xmax, xmax, 80), ROLE.output), label('y = f(x)', P(1.15, 3.05), ROLE.output, 'primary'),
        ],
      },
      {
        narration: 'The line y = x is the mirror. Swap every point (x, y) to (y, x) and you get the inverse.',
        objects: [line(P(-3.4, -3.4), P(3.4, 3.4), ROLE.aid, 0.025), label('y = x', P(-2.45, -2.9), ROLE.aid, 'detail')],
      },
      {
        narration: 'The inverse f⁻¹ undoes f. The point (a, b) on f matches (b, a) on f⁻¹, the same distance from the mirror on the other side.',
        objects: [
          curve(sample(invFinv, -limit, limit, 80), ROLE.input), label('y = f⁻¹(x)', P(-2.2, 2.3), ROLE.input, 'primary'),
          dot(P(a, b), ROLE.output, 0.14), dot(P(b, a), ROLE.input, 0.14), guide(P(a, b), P(b, a), ROLE.result),
          label('(a, b)', P(a + 0.55, b - 0.4), ROLE.output, 'detail'), label('(b, a)', P(b - 0.65, a + 0.45), ROLE.input, 'detail'),
        ],
      },
    ],
  }
}

// ── 6. Domain and range ──────────────────────────────────────────────────────

/** f(x) = √(9 − x²): domain [-3, 3], range [0, 3]. Screen is shifted down by SHIFT_Y. */
export const DR = { radius: 3, shiftY: -1.2 } as const
export const drF = (x: number) => Math.sqrt(Math.max(0, DR.radius * DR.radius - x * x))

export function buildDomainRangeScene(): SceneSpec {
  return framed(raw_buildDomainRangeScene())
}
function raw_buildDomainRangeScene(): SceneSpec {
  const r = DR.radius, sy = DR.shiftY
  return {
    id: 'math-domain-range',
    title: 'Domain and range of f(x) = √(9 − x²)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the domain as the set of inputs the graph covers along the x-axis and the range as the set of outputs it covers along the y-axis.',
    ariaLabel:
      'A coordinate plane with a half circle of radius 3 above the x-axis. A thick red segment on the x-axis from minus 3 to 3 marks the domain; ' +
      'a thick blue segment on the y-axis from 0 to 3 marks the range.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'f(x) = √(9 − x²) draws the upper half of a circle of radius 3.',
        objects: [
          ...axes(0, sy, -4.5, 4.5, sy - 1.0, sy + 3.9), label('x', P(4.35, sy + 0.35), ROLE.reference, 'detail'), label('y', P(0.35, sy + 3.75), ROLE.reference, 'detail'),
          curve(sample(drF, -r, r, 90, 0, sy), ROLE.ink), label('f(x) = √(9 − x²)', P(2.95, sy + 3.0), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Domain: the inputs x that work. The graph exists above every x from −3 to 3, marked in red on the x-axis.',
        objects: [line(P(-r, sy), P(r, sy), ROLE.input, 0.12), dot(P(-r, sy), ROLE.input, 0.14), dot(P(r, sy), ROLE.input, 0.14), label('domain', P(-3.8, sy - 0.65), ROLE.input, 'primary'), label('−3 ≤ x ≤ 3', P(0.1, sy - 0.65), ROLE.input, 'detail')],
      },
      {
        narration: 'Range: the outputs the function really reaches. The curve goes from height 0 up to height 3, marked in blue on the y-axis.',
        objects: [line(P(0, sy), P(0, sy + r), ROLE.output, 0.12), dot(P(0, sy + r), ROLE.output, 0.14), label('range', P(-3.9, sy + 1.45), ROLE.output, 'primary'), label('0 ≤ y ≤ 3', P(-3.9, sy + 0.9), ROLE.output, 'detail')],
      },
    ],
  }
}

// ── 7. Systems of linear equations ───────────────────────────────────────────

/** y = x + 1 and y = −½x + 4 meet at (2, 3). U units per axis unit, origin at (OX, OY). */
export const SYS = { U: 0.8, OX: -3.6, OY: -2.4, x: 2, y: 3 } as const
export const sysL1 = (x: number) => x + 1
export const sysL2 = (x: number) => -0.5 * x + 4

export function buildLinearSystemScene(): SceneSpec {
  return framed(raw_buildLinearSystemScene())
}
function raw_buildLinearSystemScene(): SceneSpec {
  const { U, OX, OY, x, y } = SYS
  const S = (px: number, py: number) => P(OX + px * U, OY + py * U)
  return {
    id: 'math-linear-systems',
    title: 'Systems of linear equations: where the lines meet',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the solution of a two-equation linear system as the point where the two lines cross, and the cases of no solution (parallel) and infinitely many (the same line).',
    ariaLabel:
      'A coordinate plane with the line y equals x plus 1 and the line y equals minus one half x plus 4 crossing at the point (2, 3), the solution. ' +
      'Two small side drawings show parallel lines, which have no solution, and two copies of the same line, which have infinitely many.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Each linear equation is a line. This is y = x + 1: every point on it makes that equation true.',
        objects: [
          ...axes(OX, OY, OX - 0.25, OX + 5.9 * U, OY - 0.25, OY + 6.6 * U),
          line(S(-0.3, sysL1(-0.3)), S(5.6, sysL1(5.6)), ROLE.input, 0.06), label('y = x + 1', P(OX + 5.5 * U - 0.2, OY + sysL1(5.6) * U + 0.5), ROLE.input, 'primary'),
        ],
      },
      {
        narration: 'The second equation is y = −½x + 4, another line.',
        objects: [line(S(-0.3, sysL2(-0.3)), S(5.6, sysL2(5.6)), ROLE.output, 0.06), label('y = −½x + 4', P(OX + 5.6 * U + 0.05, OY + sysL2(5.6) * U - 0.55), ROLE.output, 'primary')],
      },
      {
        narration: 'The solution is where the lines cross, the one point on both: (2, 3). Parallel lines never meet, so there is no solution; two copies of the same line meet everywhere, so there are infinitely many.',
        objects: [
          dot(S(x, y), ROLE.result, 0.2), label(`(${x}, ${y})`, P(OX + x * U + 0.85, OY + y * U + 0.35), ROLE.result, 'primary'),
          line(P(2.5, 1.05), P(4.7, 2.15), ROLE.input, 0.05), line(P(2.5, 0.45), P(4.7, 1.55), ROLE.output, 0.05), label('none: parallel', P(3.6, 2.75), ROLE.aid, 'detail'),
          line(P(2.5, -1.35), P(4.7, -0.25), ROLE.input, 0.09), line(P(2.5, -1.35), P(4.7, -0.25), ROLE.output, 0.03), label('infinite: same line', P(3.55, -1.95), ROLE.aid, 'detail'),
        ],
      },
    ],
  }
}

// ── 8. Equation of a circle ──────────────────────────────────────────────────

/**
 * Circle with centre (1, 1) and radius 5; P = (5, 4) is on it because the legs 4 and 3 of the
 * right triangle at the centre give 4² + 3² = 5². (Vector Addition, math.linalg.vector-addition, is the
 * designated AI-canary concept and is deliberately left without a fixed figure: see visualCanaryConcept.test.ts.)
 */
export const CIRCLE = { h: 1, k: 1, r: 5, px: 5, py: 4, U: 0.55 } as const
/** (x − h)² + (y − k)² − r²: zero exactly when (x, y) is on the circle. */
export const circleResidual = (x: number, y: number) => (x - CIRCLE.h) ** 2 + (y - CIRCLE.k) ** 2 - CIRCLE.r ** 2

export function buildCircleEquationScene(): SceneSpec {
  return framed(raw_buildCircleEquationScene())
}
function raw_buildCircleEquationScene(): SceneSpec {
  const { h, k, r, px, py, U } = CIRCLE
  const OX = -h * U, OY = -k * U                               // puts the circle's centre at the screen origin
  const T = (x: number, y: number) => P(OX + x * U, OY + y * U)
  const ring: V3[] = []
  for (let i = 0; i <= 96; i++) { const t = (i / 96) * 2 * Math.PI; ring.push(T(h + r * Math.cos(t), k + r * Math.sin(t))) }
  return {
    id: 'math-circle-equation',
    title: 'Equation of a circle: (x − h)² + (y − k)² = r²',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that every point (x, y) of a circle with centre (h, k) and radius r satisfies (x − h)² + (y − k)² = r², by the Pythagorean theorem on the right triangle at the centre.',
    ariaLabel:
      'A coordinate plane with a circle of radius 5 centred at (1, 1). A radius is drawn from the centre to the point (5, 4) on the circle. A right triangle under it has a horizontal leg of 4 and a vertical leg of 3, ' +
      'so by the Pythagorean theorem 4 squared plus 3 squared equals 5 squared, which is the equation (x minus 1) squared plus (y minus 1) squared equals 25.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A circle is all the points the same distance r from one centre, (h, k). Here the centre is (1, 1) and r = 5.',
        objects: [
          ...axes(OX, OY, OX + (-5.2) * U, OX + 6.6 * U, OY + (-5.2) * U, OY + 6.6 * U),
          curve(ring, ROLE.ink), dot(T(h, k), ROLE.result, 0.15), label('(h, k)', T(h, k + 1.0), ROLE.result, 'primary'),
        ],
      },
      {
        narration: 'Take any point (x, y) on the circle, here (5, 4). The line from the centre to it is the radius, r = 5.',
        objects: [
          dot(T(px, py), ROLE.ink, 0.15), label('(x, y)', T(px + 1.15, py + 0.5), ROLE.ink, 'primary'),
          line(T(h, k), T(px, py), ROLE.aid, 0.06), label(`r = ${r}`, T(3.4, 3.3), ROLE.aid, 'primary'),
        ],
      },
      {
        narration: 'Go across x − h = 4 and up y − k = 3 and you have a right triangle with hypotenuse r. By Pythagoras, 4² + 3² = 5², so (x − 1)² + (y − 1)² = 25.',
        objects: [
          line(T(h, k), T(px, k), ROLE.input, 0.07), line(T(px, k), T(px, py), ROLE.output, 0.07),
          label(`x − h = ${px - h}`, T(3.0, k - 0.95), ROLE.input, 'detail'), label(`y − k = ${py - k}`, T(px + 1.5, 2.5), ROLE.output, 'detail'),
          label('(x − 1)² + (y − 1)² = 25', T(0.6, -3.1), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 9. Determinant ───────────────────────────────────────────────────────────

/** Matrix [[2,1],[1,2]]: columns (2,1) and (1,2); det = 3. */
export const DET = { cols: [[2, 1], [1, 2]] as const, U: 1.3, O: [-2.0, -1.9] as const }
export const det2 = (m: readonly (readonly number[])[]) => m[0][0] * m[1][1] - m[0][1] * m[1][0]
/** Area of the parallelogram spanned by two column vectors (shoelace). */
export function parallelogramArea(c1: readonly number[], c2: readonly number[]) {
  return Math.abs(c1[0] * c2[1] - c1[1] * c2[0])
}
export function buildDeterminantScene(): SceneSpec {
  return framed(raw_buildDeterminantScene())
}
function raw_buildDeterminantScene(): SceneSpec {
  const { cols, U, O } = DET
  const T = (x: number, y: number) => P(O[0] + x * U, O[1] + y * U)
  const [c1, c2] = cols
  const d = parallelogramArea(c1, c2)
  const sum = [c1[0] + c2[0], c1[1] + c2[1]]
  return {
    id: 'math-determinant',
    title: 'Determinant: how much a matrix scales area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the determinant of a 2×2 matrix as the area of the parallelogram that the unit square becomes, the factor by which the matrix scales area.',
    ariaLabel:
      'A unit square with area 1 drawn from the origin. The matrix with columns (2, 1) and (1, 2) sends the two sides of the square to the vectors (2, 1) and (1, 2), ' +
      'and the square becomes a parallelogram of area 3, equal to the determinant 2 times 2 minus 1 times 1.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Start with the unit square: sides î = (1, 0) and ĵ = (0, 1). Its area is 1.',
        objects: [
          ...axes(O[0], O[1], O[0] - 0.4, O[0] + 3.4 * U, O[1] - 0.4, O[1] + 3.4 * U),
          ...rectLines(O[0], O[1], O[0] + U, O[1] + U, ROLE.aid, 0.05), label('area 1', T(0.5, 0.5), ROLE.aid, 'primary'),
        ],
      },
      {
        narration: 'The matrix [2 1; 1 2] sends î to its first column (2, 1) and ĵ to its second column (1, 2). The square becomes a parallelogram.',
        objects: [
          arrow(T(0, 0), T(c1[0], c1[1]), ROLE.input), arrow(T(0, 0), T(c2[0], c2[1]), ROLE.output),
          line(T(c1[0], c1[1]), T(sum[0], sum[1]), ROLE.output, 0.04), line(T(c2[0], c2[1]), T(sum[0], sum[1]), ROLE.input, 0.04),
          label('î → (2, 1)', T(c1[0] + 0.85, c1[1] - 0.2), ROLE.input, 'detail'), label('ĵ → (1, 2)', T(c2[0] - 0.4, c2[1] + 0.55), ROLE.output, 'detail'),
        ],
      },
      {
        narration: 'The new area is the determinant: 2·2 − 1·1 = 3. This matrix triples every area. If the determinant were 0, the square would be flattened to a line.',
        objects: [label(`area = det = ${d}`, T(1.5, 1.4), ROLE.result, 'primary'), label('det = 2·2 − 1·1', T(2.2, 3.35), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 10. Eigenvalues and eigenvectors ─────────────────────────────────────────

/** A = [[3,1],[1,3]]: eigenvalues 4 and 2 with eigenvectors (1,1) and (1,-1). */
export const EIG = { A: [[3, 1], [1, 3]] as const, k: 0.85 }
export const mulA = (v: readonly number[]) => [EIG.A[0][0] * v[0] + EIG.A[0][1] * v[1], EIG.A[1][0] * v[0] + EIG.A[1][1] * v[1]] as const
export function buildEigenScene(): SceneSpec {
  return framed(raw_buildEigenScene())
}
function raw_buildEigenScene(): SceneSpec {
  const k = EIG.k
  const T = (v: readonly number[]) => P(v[0] * k, v[1] * k)
  const v = [-1.2, 0], v1 = [1, 1], v2 = [1, -1]
  const Av = mulA(v), Av1 = mulA(v1), Av2 = mulA(v2)
  return {
    id: 'math-eigenvectors',
    title: 'Eigenvectors keep their direction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an eigenvector as a direction the matrix does not turn: Av is just a scaled copy of v, by the eigenvalue λ.',
    ariaLabel:
      'A coordinate plane with two dashed lines through the origin, along y = x and y = −x. An ordinary vector v along the x-axis is turned to a new direction by the matrix A. ' +
      'The vector v₁ along y = x is stretched to four times as long without turning, and v₂ along y = −x is stretched to twice as long without turning.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A matrix A = [3 1; 1 3] moves vectors. An ordinary vector v = (−1.2, 0) is sent to Av = (−3.6, −1.2): it is turned off its original direction.',
        objects: [
          dot(P(0, 0), ROLE.ink, 0.1), guide(P(-3.7, -3.7), P(3.7, 3.7), ROLE.reference), guide(P(-3.7, 3.7), P(3.7, -3.7), ROLE.reference),
          arrow(P(0, 0), T(Av), ROLE.output), arrow(P(0, 0), T(v), ROLE.input), label('v', P(v[0] * k * 0.5, 0.45), ROLE.input, 'primary'), label('Av turns', P(Av[0] * k + 0.1, Av[1] * k - 0.55), ROLE.output, 'detail'),
        ],
      },
      {
        narration: 'Some vectors are not turned. v₁ = (1, 1) is sent to Av₁ = (4, 4) = 4·v₁: the same direction, four times as long. Eigenvalue λ = 4.',
        objects: [
          arrow(P(0, 0), T(Av1), ROLE.output), arrow(P(0, 0), T(v1), ROLE.input), label('v₁', P(v1[0] * k - 0.55, v1[1] * k + 0.15), ROLE.input, 'primary'), label('Av₁ = 4v₁', P(Av1[0] * k + 0.1, Av1[1] * k + 0.55), ROLE.output, 'primary'),
        ],
      },
      {
        narration: 'v₂ = (1, −1) is sent to Av₂ = (2, −2) = 2·v₂: again the same direction, now twice as long. Eigenvalue λ = 2. These special directions are the eigenvectors.',
        objects: [
          arrow(P(0, 0), T(Av2), ROLE.output), arrow(P(0, 0), T(v2), ROLE.input), label('v₂', P(v2[0] * k - 0.55, v2[1] * k - 0.15), ROLE.input, 'primary'), label('Av₂ = 2v₂', P(Av2[0] * k + 0.95, Av2[1] * k - 0.3), ROLE.output, 'primary'),
        ],
      },
    ],
  }
}

// ── 11. Conditional probability ──────────────────────────────────────────────

/** 50 equally likely outcomes in a 10 x 5 grid; B = right half (25), A = columns 3-8 x rows 0-3 (15), A∩B = 9. */
export const COND = {
  omega: { w: 10, h: 5 },
  A: { x0: 3, y0: 0, x1: 8, y1: 3 },
  B: { x0: 5, y0: 0, x1: 10, y1: 5 },
  U: 0.8,
} as const
export interface Rect { x0: number; y0: number; x1: number; y1: number }
export const rectArea = (r: Rect) => (r.x1 - r.x0) * (r.y1 - r.y0)
export const rectOverlap = (p: Rect, q: Rect) => {
  const w = Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0), h = Math.min(p.y1, q.y1) - Math.max(p.y0, q.y0)
  return w > 0 && h > 0 ? w * h : 0
}
export function buildConditionalProbabilityScene(): SceneSpec {
  return framed(raw_buildConditionalProbabilityScene())
}
function raw_buildConditionalProbabilityScene(): SceneSpec {
  const { omega, A, B, U } = COND
  const OX = -4, OY = -2
  const R = (x: number, y: number) => P(OX + x * U, OY + y * U)
  const rect = (r: Rect, color: string, t = 0.05) => rectLines(OX + r.x0 * U, OY + r.y0 * U, OX + r.x1 * U, OY + r.y1 * U, color, t)
  const inter = { x0: Math.max(A.x0, B.x0), y0: Math.max(A.y0, B.y0), x1: Math.min(A.x1, B.x1), y1: Math.min(A.y1, B.y1) }
  const nA = rectArea(A), nB = rectArea(B), nAB = rectOverlap(A, B), nO = omega.w * omega.h
  return {
    id: 'math-conditional-probability',
    title: 'Conditional probability: P(A | B) = P(A ∩ B) / P(B)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show conditional probability as a fraction of the part of the sample space where B happens: the share of B that is also A.',
    ariaLabel:
      'A rectangle of 50 equally likely outcomes. Event B is the right half with 25 outcomes and event A is a smaller rectangle with 15 outcomes. ' +
      'They overlap in 9 outcomes. Given that B happened, the probability of A is 9 out of 25, which is 0.36.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'All 50 outcomes are equally likely. This whole rectangle is the sample space Ω.',
        objects: [...rect({ x0: 0, y0: 0, x1: omega.w, y1: omega.h }, ROLE.reference, 0.06), label(`Ω: all ${nO} outcomes`, P(OX + omega.w * U * 0.5, OY + omega.h * U + 0.5), ROLE.reference, 'primary')],
      },
      {
        narration: `Event B is the right half: ${nB} outcomes. Event A is the lower rectangle: ${nA} outcomes.`,
        objects: [
          ...rect(B, ROLE.input), label(`B (${nB})`, R(7.5, 4.0), ROLE.input, 'primary'),
          ...rect(A, ROLE.output), label(`A (${nA})`, R(3.9, 2.4), ROLE.output, 'primary'),
        ],
      },
      {
        narration: `Now suppose we are told B happened. Only the ${nB} outcomes inside B are still possible, and ${nAB} of them are also in A. So P(A | B) = ${nAB}/${nB} = ${nAB / nB}.`,
        objects: [
          ...hatchRect(OX + inter.x0 * U, OY + inter.y0 * U, OX + inter.x1 * U, OY + inter.y1 * U, 0.2, ROLE.result),
          label(`A ∩ B (${nAB})`, R(6.5, 1.4), ROLE.result, 'primary'),
          label(`P(A | B) = ${nAB}/${nB} = ${nAB / nB}`, R(5, -0.95), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 12. Normal distribution ──────────────────────────────────────────────────

/** Standard bell: x = Z·W, y = BASE + H·exp(−z²/2). */
export const NORM = { W: 1.15, H: 3.4, BASE: -1.7 } as const
export const normPdfShape = (z: number) => Math.exp(-(z * z) / 2)
/** Share of a normal distribution within ±k standard deviations: erf(k/√2) — the 68–95–99.7 rule. */
export function withinK(k: number): number {
  // Abramowitz–Stegun 7.1.26, |error| < 1.5e-7
  const x = k / Math.SQRT2, t = 1 / (1 + 0.3275911 * x)
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return y
}
export function buildNormalDistributionScene(): SceneSpec {
  return framed(raw_buildNormalDistributionScene())
}
function raw_buildNormalDistributionScene(): SceneSpec {
  const { W, H, BASE } = NORM
  const X = (z: number) => z * W
  const Y = (z: number) => BASE + H * normPdfShape(z)
  const fill = (lo: number, hi: number, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    for (let z = lo; z <= hi + 1e-9; z += 0.1) out.push(line(P(X(z), BASE), P(X(z), Y(z)), color, 0.035))
    return out
  }
  const bracket = (k: number, y: number, color: string): SceneObject[] => [
    line(P(X(-k), y), P(X(k), y), color, 0.04), line(P(X(-k), y - 0.12), P(X(-k), y + 0.12), color, 0.04), line(P(X(k), y - 0.12), P(X(k), y + 0.12), color, 0.04),
  ]
  const pct = (k: number) => `${(Math.round(withinK(k) * 1000) / 10).toString()}%`
  return {
    id: 'math-normal-distribution',
    title: 'Normal distribution: 68 – 95 – 99.7',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the normal distribution as a symmetric bell centred on the mean μ, with about 68% of values within 1σ, 95% within 2σ and 99.7% within 3σ.',
    ariaLabel:
      'A symmetric bell-shaped curve centred on the mean μ. Marks along the bottom show one and two standard deviations either side. ' +
      'Three brackets above the curve show that about 68 percent of values lie within one standard deviation, 95 percent within two and 99.7 percent within three.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The normal distribution is a symmetric bell. Its centre is the mean μ; σ, the standard deviation, measures how spread out it is.',
        objects: [
          line(P(-4.5, BASE), P(4.5, BASE), ROLE.reference, 0.05), curve(sample((z) => Y(z / W) , -3.6 * W, 3.6 * W, 100), ROLE.ink),
          guide(P(0, BASE), P(0, Y(0)), ROLE.aid), label('μ', P(0, BASE - 0.5), ROLE.ink, 'primary'),
          label('−σ', P(X(-1), BASE - 0.5), ROLE.ink, 'detail'), label('σ', P(X(1), BASE - 0.5), ROLE.ink, 'detail'),
          label('−2σ', P(X(-2), BASE - 0.5), ROLE.ink, 'detail'), label('2σ', P(X(2), BASE - 0.5), ROLE.ink, 'detail'),
        ],
      },
      {
        narration: 'About 68% of all values fall within one σ of the mean (the green band).',
        objects: [...fill(-1, 1, ROLE.result), ...bracket(1, 2.1, ROLE.result), label(pct(1), P(0, 2.6), ROLE.result, 'primary')],
      },
      {
        narration: 'About 95% fall within two σ (blue) and about 99.7% within three σ (violet): almost everything.',
        objects: [
          ...fill(-2, -1.1, ROLE.output), ...fill(1.1, 2, ROLE.output), ...fill(-3, -2.1, ROLE.aid), ...fill(2.1, 3, ROLE.aid),
          ...bracket(2, 3.2, ROLE.output), label(pct(2), P(0, 3.7), ROLE.output, 'primary'),
          ...bracket(3, 4.3, ROLE.aid), label(pct(3), P(0, 4.8), ROLE.aid, 'primary'),
        ],
      },
    ],
  }
}
