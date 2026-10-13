/**
 * Core school-mathematics figures — batch 6 of the mathematics visual campaign
 * (2026-10-11): single-variable calculus.
 *
 * Limits (two-sided, one-sided, at infinity), continuity and its three kinds of
 * failure, the tangent line and the derivative as a limit of secants,
 * differentiability, increasing/decreasing, local extrema, concavity and Riemann
 * sums. Same rules as batches 1-5: one visual language from visualDesign.ts, labels
 * are names not sentences (marks of 1-2 characters are free), steps are cumulative,
 * coordinates stay inside +-5, at most 50 objects per step, and every number drawn
 * comes from the constants and pure helpers exported here, which the test file
 * re-derives independently from the DRAWN coordinates.
 *
 * Colour roles keep their meaning: red is the input / the given (the left
 * approach), blue is what is produced or compared (the right approach), green is
 * the result, violet is a construction aid (tangents, secants), slate is axes and
 * inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, arcPts, type V3 } from './mathSceneKit'

/** An open (hollow) point: a small ring. */
const ring = (x: number, y: number, color: string, r = 0.13): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
const r3 = (n: number) => Math.round(n * 1000) / 1000
const num = (n: number) => String(r3(n))

// ── 1. Limit of a function ───────────────────────────────────────────────────

/** f(x) = (x² − 1)/(x − 1) = x + 1 for x ≠ 1, and the limit at 1 is 2. */
export const LIM = { u: 0.8, ox: -0.8, oy: -1.6, a: 1, left: [0.5, 0.8, 0.95], right: [1.5, 1.2, 1.05] } as const
export const limF = (x: number) => (x * x - 1) / (x - 1)

/** KG: the value f(x) approaches as x approaches a, whether or not f(a) exists. */
export function buildLimitScene(): SceneSpec {
  return framed(raw_buildLimitScene())
}
function raw_buildLimitScene(): SceneSpec {
  const { u, ox, oy, a, left, right } = LIM
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const gap = 0.12
  return {
    id: 'math-limits',
    title: 'Limit: what f(x) approaches as x approaches a',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a limit as the height the graph approaches as x gets closer to a from both sides, even when f(a) itself is not defined.',
    ariaLabel:
      'The graph of f of x equals (x squared minus 1) over (x minus 1), which is the line y equals x plus 1 with a hole at x equals 1, where f is undefined. Points with x equal to 0.5, 0.8 and 0.95 from the left have heights 1.5, 1.8 and 1.95; points with x equal to 1.5, 1.2 and 1.05 from the right have heights 2.5, 2.2 and 2.05. Both sides close in on the height 2, so the limit is 2.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'f(x) = (x² − 1) ÷ (x − 1). At x = 1 it is 0 ÷ 0: undefined, so the graph has a hole there. What does f(x) do as x gets close to 1?',
        objects: [...mathAxes(S, -1.4, 3.6, -0.7, 4.8), line(S(-0.8, limF(-0.8)), S(a - gap, limF(a - gap)), ROLE.ink, 0.06), line(S(a + gap, limF(a + gap)), S(3.2, limF(3.2)), ROLE.ink, 0.06), ring(a * u + ox, 2 * u + oy, ROLE.ink, 0.14), label('f(x) = (x² − 1)/(x − 1)', S(0.2, 4.5), ROLE.ink, 'primary'), label('f(1): no value', S(2.5, 1.1), ROLE.reference, 'detail')],
      },
      {
        narration: 'Come in from the left: x = 0.5, 0.8, 0.95 give f(x) = 1.5, 1.8, 1.95. The heights creep up towards 2.',
        objects: [...left.flatMap((x) => [guide(S(x, 0), S(x, limF(x)), ROLE.input, 0.02), dot(S(x, limF(x)), ROLE.input, 0.12)]), label('from the left: 1.5, 1.8, 1.95', S(-0.2, 3.3), ROLE.input, 'detail')],
      },
      {
        narration: 'Come in from the right: x = 1.5, 1.2, 1.05 give 2.5, 2.2, 2.05, coming down towards 2. Both sides close in on 2, so the limit is 2, even though f(1) does not exist.',
        objects: [...right.flatMap((x) => [guide(S(x, 0), S(x, limF(x)), ROLE.output, 0.02), dot(S(x, limF(x)), ROLE.output, 0.12)]), guide(S(0, 2), S(a - gap, 2), ROLE.result, 0.03), label('from the right: 2.5, 2.2, 2.05', S(3.0, 0.5), ROLE.output, 'detail'), label('limit = 2', S(-1.0, 2.5), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 2. One-sided limits ──────────────────────────────────────────────────────

/** f(x) = x for x < 1 and x + 2 for x >= 1: left limit 1, right limit 3, value f(1) = 3. */
export const ONES = { u: 0.8, ox: -0.88, oy: -1.76, a: 1, left: [0.4, 0.7, 0.9], right: [1.6, 1.3, 1.1] } as const
export const onesF = (x: number) => (x < 1 ? x : x + 2)

/** KG: the limit as x approaches a from the left, or from the right. */
export function buildOneSidedLimitsScene(): SceneSpec {
  return framed(raw_buildOneSidedLimitsScene())
}
function raw_buildOneSidedLimitsScene(): SceneSpec {
  const { u, ox, oy, a, left, right } = ONES
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-one-sided-limits',
    title: 'One-sided limits: left and right can disagree',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the left-hand and right-hand limits at a jump separately, and that the two-sided limit exists only when they agree.',
    ariaLabel:
      'A graph that jumps at x equals 1: it follows y equals x up to x equals 1 (open circle at height 1) and then y equals x plus 2 from x equals 1 (filled dot at height 3). Approaching x equal to 1 from the left, heights 0.4, 0.7, 0.9 tend to 1. From the right, heights 3.6, 3.3, 3.1 tend to 3. The one-sided limits 1 and 3 differ, so the two-sided limit does not exist.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'This function follows y = x for x < 1 and then jumps to y = x + 2 for x ≥ 1. The open circle at (1, 1) is not a point of the graph; the filled dot at (1, 3) is.',
        objects: [...mathAxes(S, -1.4, 3.6, -1.2, 5.6), line(S(-0.8, -0.8), S(0.97, 0.97), ROLE.ink, 0.06), line(S(1, 3), S(3.2, 5.2), ROLE.ink, 0.06), ring(a * u + ox, 1 * u + oy, ROLE.ink, 0.14), dot(S(a, 3), ROLE.ink, 0.14)],
      },
      {
        narration: 'From the left, x = 0.4, 0.7, 0.9 give heights 0.4, 0.7, 0.9, creeping up to 1. The left-hand limit is 1.',
        objects: [...left.flatMap((x) => [guide(S(x, 0), S(x, onesF(x)), ROLE.input, 0.02), dot(S(x, onesF(x)), ROLE.input, 0.12)]), label('from the left → 1', S(-0.2, 2.2), ROLE.input, 'primary')],
      },
      {
        narration: 'From the right, x = 1.6, 1.3, 1.1 give heights 3.6, 3.3, 3.1, coming down to 3. The right-hand limit is 3. The two sides disagree (1 ≠ 3), so the two-sided limit at x = 1 does not exist.',
        objects: [...right.flatMap((x) => [guide(S(x, 0), S(x, onesF(x)), ROLE.output, 0.02), dot(S(x, onesF(x)), ROLE.output, 0.12)]), label('from the right → 3', S(2.9, 2.6), ROLE.output, 'primary'), label('1 ≠ 3: no limit at x = 1', S(1.9, -1.0), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 3. Limits at infinity ────────────────────────────────────────────────────

/** f(x) = 2 + 1/x: as x → ±∞, f → 2. */
export const LINF = { u: 0.7, ox: 0, oy: -1.1, right: [1, 2, 4], left: [-1, -2, -4] } as const
export const linfF = (x: number) => 2 + 1 / x

/** KG: the behaviour of f(x) as x grows without bound; a finite limit gives a horizontal asymptote. */
export function buildLimitsAtInfinityScene(): SceneSpec {
  return framed(raw_buildLimitsAtInfinityScene())
}
function raw_buildLimitsAtInfinityScene(): SceneSpec {
  const { u, ox, oy, right, left } = LINF
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-limits-at-infinity',
    title: 'Limits at infinity: the horizontal asymptote',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that as x grows without bound in either direction, f(x) = 2 + 1/x settles towards 2, so y = 2 is a horizontal asymptote.',
    ariaLabel:
      'The graph of f of x equals 2 plus 1 over x. On the right, x equal to 1, 2 and 4 give heights 3, 2.5 and 2.25, sinking towards the dashed line y equals 2. On the left, x equal to minus 1, minus 2 and minus 4 give heights 1, 1.5 and 1.75, rising towards y equals 2. The limit is 2 as x goes to infinity and to minus infinity, so y equals 2 is a horizontal asymptote.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'f(x) = 2 + 1/x. What happens as x gets enormous? The fraction 1/x gets tiny, so f(x) is almost exactly 2.',
        objects: [...mathAxes(S, -5.4, 5.4, -1.4, 5.4), curve(sampleMapped(linfF, 0.4, 5, S, 60), ROLE.ink), curve(sampleMapped(linfF, -5, -0.4, S, 60), ROLE.ink), label('f(x) = 2 + 1/x', S(2.4, 4.6), ROLE.ink, 'primary')],
      },
      {
        narration: 'To the right: x = 1, 2, 4 give 3, 2.5, 2.25. The graph sinks towards the line y = 2 and never quite touches it. As x → ∞, f(x) → 2.',
        objects: [...right.flatMap((x) => [guide(S(x, 0), S(x, linfF(x)), ROLE.output, 0.02), dot(S(x, linfF(x)), ROLE.output, 0.12)]), label('x → ∞: f(x) → 2', S(3.6, 1.0), ROLE.output, 'primary')],
      },
      {
        narration: 'To the left: x = −1, −2, −4 give 1, 1.5, 1.75, rising towards 2. As x → −∞, f(x) → 2 as well. The line y = 2 is a horizontal asymptote.',
        objects: [...left.flatMap((x) => [guide(S(x, 0), S(x, linfF(x)), ROLE.input, 0.02), dot(S(x, linfF(x)), ROLE.input, 0.12)]), line(S(-5.2, 2), S(5.2, 2), ROLE.result, 0.025), label('x → −∞: f(x) → 2', S(-3.4, 3.4), ROLE.input, 'primary'), label('y = 2: horizontal asymptote', S(-2.0, 2.45), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 4. Continuity ────────────────────────────────────────────────────────────

/** f(x) = x²/2 + 1/2, continuous at a = 1 (f(1) = 1, limit 1). */
export const CONT = { u: 0.8, ox: -0.4, oy: -1.5, a: 1, left: [0.2, 0.6, 0.9], right: [1.8, 1.4, 1.1] } as const
export const contF = (x: number) => (x * x) / 2 + 0.5

/** KG: f is continuous at a when f(a) exists, the limit exists, and they are equal. */
export function buildPointContinuityScene(): SceneSpec {
  return framed(raw_buildPointContinuityScene())
}
function raw_buildPointContinuityScene(): SceneSpec {
  const { u, ox, oy, a, left, right } = CONT
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-continuity',
    title: 'Continuity at a point: three things must hold',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three conditions for continuity at a: f(a) is defined, the limit as x approaches a exists, and the two are equal, which on a graph means no gap, jump or hole.',
    ariaLabel:
      'The graph of f of x equals x squared over 2 plus one half, a smooth curve. At x equal to 1 the point (1, 1) is on the graph, so f(1) exists. Points approaching x equal to 1 from the left and from the right both close in on height 1, so the limit is 1. The limit equals f(1), so f is continuous at 1: the curve can be drawn through that point without lifting the pencil.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Test f(x) = x²/2 + 1/2 at a = 1. First: is f(1) defined? Yes, f(1) = 1, a real point on the graph.',
        objects: [...mathAxes(S, -2.4, 3.4, -0.7, 4.6), curve(sampleMapped(contF, -2, 2.8, S, 56), ROLE.ink), dot(S(a, contF(a)), ROLE.result, 0.15), label('f(1) = 1', S(1.9, 0.5), ROLE.result, 'primary')],
      },
      {
        narration: 'Second: does the limit exist? From the left (x = 0.2, 0.6, 0.9) and from the right (x = 1.8, 1.4, 1.1) the heights both close in on 1. The limit is 1.',
        objects: [...left.map((x) => dot(S(x, contF(x)), ROLE.input, 0.11)), ...right.map((x) => dot(S(x, contF(x)), ROLE.output, 0.11)), guide(S(-2.2, 1), S(a, 1), ROLE.aid, 0.025), label('limit = 1', S(-1.3, 1.5), ROLE.aid, 'primary')],
      },
      {
        narration: 'Third: are they equal? The limit 1 equals f(1) = 1, so f is continuous at 1. You can draw through that point without lifting your pencil: no hole, no jump, no break.',
        objects: [label('limit = f(1): continuous', S(2.0, 3.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 5. Types of discontinuity ────────────────────────────────────────────────

export const DISCON = { s: 0.7, centres: [-3.4, 0, 3.4] } as const

/** KG: removable, jump and infinite discontinuities. */
export function buildContinuityTypesScene(): SceneSpec {
  return framed(raw_buildContinuityTypesScene())
}
function raw_buildContinuityTypesScene(): SceneSpec {
  const { s, centres } = DISCON
  const panel = (c: number) => (x: number, y: number): V3 => P(c + x * s, y * s)
  const [S1, S2, S3] = centres.map(panel)
  const axesOf = (S: (x: number, y: number) => V3) => mathAxes(S, -1.9, 1.9, -2.2, 2.6)
  return {
    id: 'math-continuity-types',
    title: 'Types of discontinuity: removable, jump, infinite',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three ways continuity can fail: a removable hole (the limit exists but the point is missing or misplaced), a jump (the one-sided limits differ), and an infinite discontinuity (the values grow without bound).',
    ariaLabel:
      'Three small graphs. Left, a removable discontinuity: the line y equals x with a hole at x equals 1, where the limit 1 exists but the point is missing. Middle, a jump discontinuity: the graph is at height 1 left of 0 and at height 2 from 0 on, so the one-sided limits differ. Right, an infinite discontinuity: y equals 1 over x grows without bound as x approaches 0.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Removable: the graph is the line y = x but the point at x = 1 is missing. The limit (1) exists; only the single point is absent, so the gap could be filled.',
        objects: [...axesOf(S1), line(S1(-1.6, -1.6), S1(0.88, 0.88), ROLE.ink, 0.06), line(S1(1.12, 1.12), S1(1.6, 1.6), ROLE.ink, 0.06), ring(centres[0] + 1 * s, 1 * s, ROLE.input, 0.13), label('removable', P(centres[0], 2.5), ROLE.input, 'primary'), label('hole', P(centres[0], -1.95), ROLE.input, 'detail')],
      },
      {
        narration: 'Jump: left of 0 the graph is at height 1, from 0 on it is at height 2. The one-sided limits (1 and 2) differ, so there is no limit and no way to join the pieces.',
        objects: [...axesOf(S2), line(S2(-1.7, 1), S2(-0.05, 1), ROLE.ink, 0.06), line(S2(0, 2), S2(1.7, 2), ROLE.ink, 0.06), ring(centres[1], 1 * s, ROLE.output, 0.13), dot(S2(0, 2), ROLE.output, 0.13), label('jump', P(centres[1], 2.5), ROLE.output, 'primary'), label('sides differ', P(centres[1], -1.95), ROLE.output, 'detail')],
      },
      {
        narration: 'Infinite: y = 1/x grows without bound as x approaches 0. There is a vertical asymptote at x = 0 and no finite limit.',
        objects: [...axesOf(S3), curve(sampleMapped((x) => 1 / x, 0.45, 1.7, S3, 40), ROLE.ink), curve(sampleMapped((x) => 1 / x, -1.7, -0.45, S3, 40), ROLE.ink), guide(S3(0, -2.1), S3(0, 2.5), ROLE.result, 0.025), label('infinite', P(centres[2], 2.5), ROLE.result, 'primary'), label('unbounded', P(centres[2], -1.95), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 6. Slope of tangent (derivative intro) ───────────────────────────────────

/** f(x) = x²/4, f'(x) = x/2. */
export const DER = { u: 0.8, ox: -1.52, oy: -2.16, p: 2, q: 4 } as const
export const derF = (x: number) => (x * x) / 4
export const derFp = (x: number) => x / 2

/** KG: the slope of the tangent line, the instantaneous rate of change. */
export function buildDerivativeIntroScene(): SceneSpec {
  return framed(raw_buildDerivativeIntroScene())
}
function raw_buildDerivativeIntroScene(): SceneSpec {
  const { u, ox, oy, p, q } = DER
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const tangent = (x0: number, half: number) => line(S(x0 - half, derF(x0) - derFp(x0) * half), S(x0 + half, derF(x0) + derFp(x0) * half), ROLE.aid, 0.05)
  return {
    id: 'math-derivative-intro',
    title: 'The slope of the tangent: how fast f is changing',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the derivative as the slope of the tangent line at a point, which measures the instantaneous rate of change and is different at different points.',
    ariaLabel:
      'The curve y equals x squared over 4. At the point P (2, 1) the tangent line just touches the curve; going 1 across it rises 1, so its slope is 1. At the point Q (4, 4) the tangent is steeper: going 1 across it rises 2, so its slope is 2. The slope changes from point to point.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The curve y = x²/4 and a point P(2, 1) on it. How steeply is the curve rising right at P?', objects: [...mathAxes(S, -1.2, 5.2, -1, 6.4), curve(sampleMapped(derF, -1, 4.6, S, 60), ROLE.ink), dot(S(p, derF(p)), ROLE.result, 0.15), label('P', S(p - 0.5, derF(p) + 0.7), ROLE.result, 'primary')] },
      {
        narration: 'The tangent line at P touches the curve there and has the same steepness. Go 1 across and it rises 1: the slope of the tangent at P is 1. This slope is the derivative f′(2) = 1.',
        objects: [tangent(p, 1.9), line(S(p, derF(p)), S(p + 1, derF(p)), ROLE.input, 0.07), line(S(p + 1, derF(p)), S(p + 1, derF(p) + derFp(p)), ROLE.output, 0.07), label('slope 1', S(p + 1.9, derF(p) + 0.3), ROLE.aid, 'primary'), label('f′(2) = 1', S(p - 1.2, derF(p) + 1.9), ROLE.aid, 'detail')],
      },
      {
        narration: 'At Q(4, 4) the curve is steeper, and so is the tangent: 1 across, 2 up, slope 2. The slope depends on where you are. f′(x) = x/2 gives the slope at every point.',
        objects: [dot(S(q, derF(q)), ROLE.result, 0.15), label('Q', S(q - 0.45, derF(q) + 0.6), ROLE.result, 'primary'), tangent(q, 1.3), label('slope 2: steeper', S(q - 0.2, derF(q) - 1.6), ROLE.aid, 'primary')],
      },
    ],
  }
}

// ── 7. The derivative as a limit of secants ──────────────────────────────────

export const SEC = { hs: [2, 1, 0.5] } as const
/** Slope of the secant from (a, f(a)) to (a + h, f(a + h)) for f(x) = x²/4. */
export const secantSlope = (a: number, h: number) => (derF(a + h) - derF(a)) / h

/** KG: f′(a) = lim_{h→0} (f(a + h) − f(a)) / h. */
export function buildDerivativeDefinitionScene(): SceneSpec {
  return framed(raw_buildDerivativeDefinitionScene())
}
function raw_buildDerivativeDefinitionScene(): SceneSpec {
  const { u, ox, oy, p } = DER
  const { hs } = SEC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const secant = (h: number, color: string, thickness: number) => {
    const m = secantSlope(p, h), x1 = p - 0.9, x2 = p + h + 0.5
    return line(S(x1, derF(p) + m * (x1 - p)), S(x2, derF(p) + m * (x2 - p)), color, thickness)
  }
  return {
    id: 'math-derivative-definition',
    title: 'The derivative: secant slopes closing in on the tangent',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show f′(a) as the limit of the slopes of secant lines through (a, f(a)) and (a + h, f(a + h)) as h shrinks to 0, which is the slope of the tangent.',
    ariaLabel:
      'The curve y equals x squared over 4 with the point P (2, 1). A second point at x equal to 2 plus h gives a secant line through both. With h equal to 2 the secant slope is 1.5; with h equal to 1 it is 1.25; with h equal to 0.5 it is 1.125. The slopes close in on 1, which is the slope of the tangent at P: the derivative f prime of 2 equals 1.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Take P(2, 1) and a second point Q a distance h to the right. The secant line through P and Q has slope (f(2 + h) − f(2)) ÷ h. With h = 2, Q = (4, 4): slope 1.5.',
        objects: [...mathAxes(S, -1.2, 5.2, -1, 6.4), curve(sampleMapped(derF, -1, 4.6, S, 60), ROLE.ink), dot(S(p, derF(p)), ROLE.result, 0.15), secant(hs[0], ROLE.input, 0.04), dot(S(p + hs[0], derF(p + hs[0])), ROLE.input, 0.12), label(`h = ${hs[0]}: slope ${num(secantSlope(p, hs[0]))}`, S(5.0, 4.9), ROLE.input, 'detail')],
      },
      {
        narration: 'Slide Q towards P. With h = 1 the slope is 1.25, with h = 0.5 it is 1.125. Each secant is closer to the tangent than the last.',
        objects: [secant(hs[1], ROLE.output, 0.04), dot(S(p + hs[1], derF(p + hs[1])), ROLE.output, 0.12), secant(hs[2], ROLE.aid, 0.04), dot(S(p + hs[2], derF(p + hs[2])), ROLE.aid, 0.12), label(`h = ${hs[1]}: ${num(secantSlope(p, hs[1]))}`, S(5.0, 3.9), ROLE.output, 'detail'), label(`h = ${hs[2]}: ${num(secantSlope(p, hs[2]))}`, S(5.0, 2.9), ROLE.aid, 'detail')],
      },
      {
        narration: 'In the limit h → 0 the secant becomes the tangent. The slopes 1.5, 1.25, 1.125, … close in on 1: f′(2) = lim (f(2 + h) − f(2)) ÷ h = 1. That is the derivative.',
        objects: [line(S(p - 0.9, derF(p) - derFp(p) * 0.9), S(p + 1.9, derF(p) + derFp(p) * 1.9), ROLE.result, 0.06), label('h → 0: slope 1 = f′(2)', S(5.0, 1.9), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 8. Differentiability ─────────────────────────────────────────────────────

export const DIFF = { s: 0.6, centres: [-3.4, 0, 3.4] } as const

/** KG: differentiable at a point when the tangent slope exists there; corners and vertical tangents fail. */
export function buildDifferentiabilityScene(): SceneSpec {
  return framed(raw_buildDifferentiabilityScene())
}
function raw_buildDifferentiabilityScene(): SceneSpec {
  const { s, centres } = DIFF
  const panel = (c: number) => (x: number, y: number): V3 => P(c + x * s, y * s)
  const [S1, S2, S3] = centres.map(panel)
  const axesOf = (S: (x: number, y: number) => V3) => mathAxes(S, -1.9, 1.9, -2.0, 2.6)
  return {
    id: 'math-differentiability',
    title: 'Differentiability: when the tangent slope exists',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a function is differentiable at a point only if the graph is smooth there with a single non-vertical tangent: a corner (different left and right slopes) or a vertical tangent means no derivative.',
    ariaLabel:
      'Three small graphs. Left, y equals x squared is smooth at 0 and has the horizontal tangent y equals 0: differentiable. Middle, y equals the absolute value of x has a corner at 0: approaching from the left the slope is minus 1, from the right plus 1, so there is no single tangent and no derivative. Right, the cube root of x has a vertical tangent at 0, an infinite slope: no derivative.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'Smooth: y = x² near 0. There is exactly one tangent line, y = 0 (slope 0). The derivative exists: f′(0) = 0.',
        objects: [...axesOf(S1), curve(sampleMapped((x) => x * x, -1.55, 1.55, S1, 40), ROLE.ink), line(S1(-1.7, 0), S1(1.7, 0), ROLE.aid, 0.05), dot(S1(0, 0), ROLE.result, 0.13), label('smooth', P(centres[0], 2.45), ROLE.result, 'primary'), label('differentiable', P(centres[0], -1.7), ROLE.result, 'detail')],
      },
      {
        narration: 'Corner: y = |x| at 0. Coming from the left the slope is −1, from the right it is +1. They disagree, so there is no single tangent and no derivative at 0.',
        objects: [...axesOf(S2), line(S2(-1.6, 1.6), S2(0, 0), ROLE.input, 0.06), line(S2(0, 0), S2(1.6, 1.6), ROLE.output, 0.06), dot(S2(0, 0), ROLE.ink, 0.13), label('corner', P(centres[1], 2.45), ROLE.output, 'primary'), label('slopes −1 and +1 differ', P(centres[1], -1.7), ROLE.output, 'detail')],
      },
      {
        narration: 'Vertical tangent: y = ∛x at 0 climbs straight up there. The slope would be infinite, which is not a number, so there is no derivative at 0.',
        objects: [...axesOf(S3), curve(sampleMapped((x) => Math.cbrt(x), -1.7, 1.7, S3, 60), ROLE.ink), guide(S3(0, -1.9), S3(0, 2.0), ROLE.aid, 0.045), dot(S3(0, 0), ROLE.ink, 0.13), label('vertical tangent', P(centres[2], 2.45), ROLE.aid, 'primary'), label('infinite slope', P(centres[2], -1.7), ROLE.aid, 'detail')],
      },
    ],
  }
}

// ── 9. Increasing and decreasing ─────────────────────────────────────────────

/** f(x) = x³/3 − x, f'(x) = x² − 1: increasing for |x| > 1, decreasing for |x| < 1. */
export const INC = { u: 1.1, oy: 0, x0: -2.2, x1: 2.2 } as const
export const incF = (x: number) => (x * x * x) / 3 - x
export const incFp = (x: number) => x * x - 1

/** KG: f′ > 0 means increasing, f′ < 0 means decreasing. */
export function buildIncreasingDecreasingScene(): SceneSpec {
  return framed(raw_buildIncreasingDecreasingScene())
}
function raw_buildIncreasingDecreasingScene(): SceneSpec {
  const { u, oy, x0, x1 } = INC
  const S = (x: number, y: number): V3 => P(x * u, y * u + oy)
  const piece = (a: number, b: number, color: string) => curve(sampleMapped(incF, a, b, S, 32), color)
  return {
    id: 'math-increasing-decreasing',
    title: 'Increasing and decreasing: the sign of f′',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that f is increasing where its derivative is positive (the graph climbs as x increases) and decreasing where the derivative is negative, with turning points where f′ = 0.',
    ariaLabel:
      'The graph of f of x equals x cubed over 3 minus x, whose derivative is x squared minus 1. For x less than minus 1 the derivative is positive and the graph climbs. Between minus 1 and 1 the derivative is negative and the graph falls. For x greater than 1 it climbs again. The turning points are at x equal to minus 1 and 1, where the derivative is zero.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = x³/3 − x. Its derivative f′(x) = x² − 1 is zero at x = −1 and x = 1, where the graph turns.', objects: [...mathAxes(S, x0 - 0.3, x1 + 0.4, -2.2, 2.2), curve(sampleMapped(incF, x0, x1, S, 60), ROLE.ink), dot(S(-1, incF(-1)), ROLE.aid, 0.13), dot(S(1, incF(1)), ROLE.aid, 0.13), label('f(x) = x³/3 − x', S(1.2, 1.8), ROLE.ink, 'primary')] },
      { narration: 'Where f′ > 0 the graph climbs as x increases. For x < −1: f′(−2) = 3 > 0. For x > 1: f′(2) = 3 > 0. Increasing on both.', objects: [piece(x0, -1, ROLE.result), piece(1, x1, ROLE.result), label('increasing: f′ > 0', S(-1.7, -1.1), ROLE.result, 'detail'), label('increasing', S(1.8, -0.9), ROLE.result, 'detail')] },
      { narration: 'Where f′ < 0 the graph falls. For −1 < x < 1: f′(0) = −1 < 0. Decreasing there. The graph switches between climbing and falling exactly where f′ = 0.', objects: [piece(-1, 1, ROLE.input), label('decreasing: f′ < 0', S(0, -1.55), ROLE.input, 'detail')] },
    ],
  }
}

// ── 10. Local extrema ────────────────────────────────────────────────────────

/** g(x) = x⁴/4 − x²: local max at 0 (value 0), local minima at ±√2 (value −1). */
export const EXT = { u: 0.9, ox: 0, oy: 0.3, x0: -2.4, x1: 2.4 } as const
export const extF = (x: number) => (x ** 4) / 4 - x * x
export const extFp = (x: number) => x ** 3 - 2 * x

/** KG: local maxima and minima occur where f′ changes sign; at an interior extremum f′ = 0. */
export function buildLocalExtremaScene(): SceneSpec {
  return framed(raw_buildLocalExtremaScene())
}
function raw_buildLocalExtremaScene(): SceneSpec {
  const { u, ox, oy, x0, x1 } = EXT
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const r = Math.SQRT2
  const flat = (x: number, color: string) => line(S(x - 0.9, extF(x)), S(x + 0.9, extF(x)), color, 0.045)
  return {
    id: 'math-local-extrema',
    title: 'Local extrema: where the tangent is horizontal',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a smooth function has its local maxima and minima where the tangent is horizontal (f′ = 0), and that f′ changes sign there: positive to negative at a maximum, negative to positive at a minimum.',
    ariaLabel:
      'The graph of g of x equals x to the fourth over 4 minus x squared, shaped like a W. It has a local maximum at (0, 0) and local minima at (minus root 2, minus 1) and (root 2, minus 1). At each of these three points the tangent line is horizontal, so the derivative x cubed minus 2x is zero there.',
    stage: NO_STAGE,
    steps: [
      { narration: 'g(x) = x⁴/4 − x². The graph is shaped like a W: it falls, rises, falls, then rises.', objects: [...mathAxes(S, x0 - 0.3, x1 + 0.4, -2.2, 3.2), curve(sampleMapped(extF, x0, x1, S, 72), ROLE.ink)] },
      { narration: 'At the top of the middle hump and at the bottom of each dip the tangent line is horizontal: slope 0. These are the local maximum (0, 0) and the local minima at x = ±√2, where g = −1.', objects: [flat(0, ROLE.aid), flat(-r, ROLE.aid), flat(r, ROLE.aid), dot(S(0, extF(0)), ROLE.input, 0.14), dot(S(-r, extF(-r)), ROLE.output, 0.14), dot(S(r, extF(r)), ROLE.output, 0.14), label('local max (0, 0)', S(0.1, 0.9), ROLE.input, 'detail'), label('local min', S(-r, -1.8), ROLE.output, 'detail'), label('local min', S(r, -1.8), ROLE.output, 'detail')] },
      { narration: 'Horizontal tangent means g′(x) = x³ − 2x = x(x² − 2) = 0, at x = 0 and x = ±√2. The slope goes + to − at a maximum and − to + at a minimum.', objects: [label('g′(x) = x³ − 2x = 0', S(0, 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Concavity ────────────────────────────────────────────────────────────

/** f(x) = x³/6, f''(x) = x: concave down for x < 0, concave up for x > 0, inflection at 0. */
export const CONC = { u: 0.8, ox: 0, oy: 0, x0: -3, x1: 3, t: 1.5 } as const
export const concF = (x: number) => (x * x * x) / 6
export const concFp = (x: number) => (x * x) / 2

/** KG: concave up where f″ > 0 (the graph lies above its tangents), concave down where f″ < 0; an inflection point is where it changes. */
export function buildConcavityScene(): SceneSpec {
  return framed(raw_buildConcavityScene())
}
function raw_buildConcavityScene(): SceneSpec {
  const { u, ox, oy, x0, x1, t } = CONC
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const tangentAt = (x: number, color: string) => line(S(x - 1.4, concF(x) + concFp(x) * -1.4), S(x + 1.4, concF(x) + concFp(x) * 1.4), color, 0.04)
  return {
    id: 'math-concavity',
    title: 'Concavity and inflection points',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show concave up (the graph lies above its tangent lines, f″ > 0) and concave down (below them, f″ < 0), with the inflection point where the bending changes direction.',
    ariaLabel:
      'The graph of f of x equals x cubed over 6. For x greater than 0 it bends upward: the curve lies above its tangent line at x equal to 1.5, concave up, since f double prime equals x is positive. For x less than 0 it bends downward: the curve lies below its tangent line at x equal to minus 1.5, concave down. At the origin the bending changes, an inflection point.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = x³/6. Its second derivative f″(x) = x is positive for x > 0 and negative for x < 0.', objects: [...mathAxes(S, x0 - 0.4, x1 + 0.5, -4.2, 4.2), curve(sampleMapped(concF, x0, x1, S, 60), ROLE.ink), label('f(x) = x³/6', S(2.0, 3.6), ROLE.ink, 'primary')] },
      { narration: 'For x > 0 the graph bends upward like a cup: concave up. It lies above its tangent line (here at x = 1.5). f″ > 0.', objects: [tangentAt(t, ROLE.output), dot(S(t, concF(t)), ROLE.output, 0.13), label('concave up: above the tangent', S(2.6, 0.4), ROLE.output, 'detail')] },
      { narration: 'For x < 0 it bends downward like a cap: concave down, below its tangent line (here at x = −1.5). f″ < 0. At the origin the bending switches: that point is an inflection point.', objects: [tangentAt(-t, ROLE.input), dot(S(-t, concF(-t)), ROLE.input, 0.13), dot(S(0, 0), ROLE.result, 0.16), label('concave down: below the tangent', S(-2.6, -0.4), ROLE.input, 'detail'), label('inflection point', S(0.9, -1.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Riemann sums ─────────────────────────────────────────────────────────

/** f(x) = x²/4 on [0, 4]: left sums with n = 4 and n = 8, exact area 16/3. */
export const RIE = { u: 0.9, ox: -1.8, oy: -1.8, a: 0, b: 4, n1: 4, n2: 8 } as const
export const rieF = (x: number) => (x * x) / 4
export const leftSum = (n: number) => {
  const dx = (RIE.b - RIE.a) / n
  let s = 0
  for (let i = 0; i < n; i++) s += rieF(RIE.a + i * dx) * dx
  return s
}
export const exactArea = () => (RIE.b ** 3 - RIE.a ** 3) / 12

/** KG: the area under a curve approximated by a sum of rectangle areas; more, thinner rectangles approach the exact area. */
export function buildRiemannSumsScene(): SceneSpec {
  return framed(raw_buildRiemannSumsScene())
}
function raw_buildRiemannSumsScene(): SceneSpec {
  const { u, ox, oy, a, b, n1, n2 } = RIE
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const rects = (n: number, color: string, thickness: number): SceneObject[] => {
    const dx = (b - a) / n, out: SceneObject[] = []
    for (let i = 0; i < n; i++) {
      const x = a + i * dx, h = rieF(x)
      if (h > 0) out.push(line(S(x, 0), S(x, h), color, thickness))                 // a zero-height rectangle has no left side
      out.push(line(S(x, h), S(x + dx, h), color, thickness))
      if (rieF(x + dx) > 0 && h > 0) out.push(line(S(x + dx, h), S(x + dx, 0), color, thickness))
    }
    return out
  }
  return {
    id: 'math-riemann-sums',
    title: 'Riemann sums: area from thin rectangles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the area under y = x²/4 from 0 to 4 approximated by rectangles whose heights come from the curve, and that more, thinner rectangles give a better answer, approaching the exact area 16/3.',
    ariaLabel:
      'The curve y equals x squared over 4 from x equal to 0 to 4. Four rectangles of width 1 with heights from the left ends add to 3.5. Eight rectangles of width 0.5 add to 4.375. Both are below the exact area under the curve, 16 over 3, about 5.33, and the sums creep up towards it as the rectangles get thinner.',
    stage: NO_STAGE,
    steps: [
      { narration: 'How much area lies under y = x²/4 between x = 0 and x = 4? A curved edge is hard, but rectangles are easy.', objects: [...mathAxes(S, -0.6, 4.8, -0.5, 4.8), curve(sampleMapped(rieF, a, b, S, 56), ROLE.ink), line(S(b, 0), S(b, rieF(b)), ROLE.reference, 0.03)] },
      { narration: 'Use 4 rectangles of width 1, each as tall as the curve at its left edge: heights 0, 0.25, 1, 2.25. Their areas add to 3.5, an underestimate.', objects: [...rects(n1, ROLE.output, 0.04), label(`n = ${n1}: ${num(leftSum(n1))}`, S(1.0, 3.7), ROLE.output, 'primary')] },
      { narration: 'Use 8 thinner rectangles: the sum is 4.375, closer. As the rectangles get thinner the sum creeps up towards the exact area 16/3 ≈ 5.33. That limit is the definite integral.', objects: [...rects(n2, ROLE.result, 0.025), label(`n = ${n2}: ${num(leftSum(n2))}`, S(1.0, 3.0), ROLE.result, 'primary'), label(`exact area = 16/3 ≈ ${(exactArea()).toFixed(2)}`, S(1.2, 2.3), ROLE.aid, 'primary')] },
    ],
  }
}
