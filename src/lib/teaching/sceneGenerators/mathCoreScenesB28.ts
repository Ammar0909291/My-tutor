/**
 * Core mathematics figures — batch 28 of the mathematics visual campaign (2026-10-12): the rest of the decimal and root
 * arithmetic (reciprocals, decimal operations, terminating and repeating decimals, irrational square roots) and the first
 * algebra helpers (equations as balances, solution sets, substitution and elimination, degree, polynomial arithmetic,
 * polynomial division, factoring).
 *
 * Same rules as batches 1-27: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right), and every number a figure states is re-derived by
 * the test file from the DRAWN dots, digits, lines and curves. A label is about 0.26 screen units wide per character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts, sampleMapped } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
/** a small crossing-out mark over a point */
const cross = (p: Pt, s = 0.2, color: string = ROLE.aid): SceneObject[] => [ln([p[0] - s, p[1] + s], [p[0] + s, p[1] - s], color, 0.05), ln([p[0] - s, p[1] - s], [p[0] + s, p[1] + s], color, 0.05)]

// ── 1. Reciprocal ────────────────────────────────────────────────────────────

/** y = 1/x: every point has x · y = 1; (2, 1/2) and (1/2, 2) are reciprocals and the rectangles they span both have area 1. */
export const RCP = { ox: -2.3, oy: -2.7, u: 1.2 }
export const rcpAt = (x: number, y: number): Pt => [RCP.ox + RCP.u * x, RCP.oy + RCP.u * y]

/** KG: the reciprocal of x is 1/x; x · (1/x) = 1, so the reciprocal is the multiplicative inverse. */
export function buildReciprocalScene(): SceneSpec {
  return framed(raw_buildReciprocalScene())
}
function raw_buildReciprocalScene(): SceneSpec {
  const o = rcpAt(0, 0), pairs: Array<[number, number]> = [[2, 0.5], [0.5, 2]]
  return {
    id: 'math-reciprocal',
    title: 'Reciprocal: x · (1/x) = 1',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the reciprocal as the multiplicative inverse with the graph of y = 1/x. Every point of the curve has x · y = 1, so the y-value is the reciprocal of the x-value: at x = 2 the curve is at 1/2, and at x = 1/2 it is at 2 (the two numbers swap roles). The rectangle from the origin to either point has area width × height = 1, the same as the unit square, which is why a number times its reciprocal is 1. A fraction is flipped to get its reciprocal: 3/4 × 4/3 = 1. Zero has no reciprocal (the curve never touches the axes).',
    ariaLabel:
      'A graph of y equals 1 over x in the first quadrant: a blue curve falling from the top left towards the x-axis. In the second step a green point at 2 across and one half up and a red point at one half across and 2 up, each with violet guide lines forming a rectangle with the axes, and a white point at 1, 1. In the third step the captions 2 times one half equals 1, one half times 2 equals 1 and three quarters times four thirds equals 1 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of y = 1/x: for every x, the height y is its reciprocal 1/x. The curve gets very high near 0 and very low far out, and it never reaches the axes — 0 has no reciprocal.', objects: [ar(o, rcpAt(4.4, 0)), ar(o, rcpAt(0, 4.3)), curve(sampleMapped((x) => 1 / x, 0.25, 4, (x, y) => pp(rcpAt(x, y)), 40), ROLE.output), lb('y = 1/x', rcpAt(3.0, 1.15), ROLE.output)] },
      { narration: 'Two points on the curve: (2, 1/2) and (1/2, 2). The numbers swap places — each is the reciprocal of the other. The rectangle each one spans with the axes has area 2 × 1/2 = 1 = 1/2 × 2.', objects: [dt(rcpAt(1, 1), ROLE.ink, 0.12), ...pairs.flatMap(([a, b]) => [ln(rcpAt(a, 0), rcpAt(a, b), ROLE.aid, 0.025), ln(rcpAt(0, b), rcpAt(a, b), ROLE.aid, 0.025)]), dt(rcpAt(2, 0.5), ROLE.result, 0.16), dt(rcpAt(0.5, 2), ROLE.input, 0.16), lb('1/2', [rcpAt(0.5, 0)[0], o[1] - 0.45]), lb('2', [rcpAt(2, 0)[0], o[1] - 0.45]), lb('2', [o[0] - 0.4, rcpAt(0, 2)[1]]), lb('1/2', [o[0] - 0.55, rcpAt(0, 0.5)[1]])] },
      { narration: 'So a number times its reciprocal is always 1: 2 × 1/2 = 1 and 1/2 × 2 = 1. For a fraction, flip it: the reciprocal of 3/4 is 4/3, and 3/4 × 4/3 = 1.', objects: [lb('2 × 1/2 = 1', [1.95, 1.7], ROLE.result), lb('1/2 × 2 = 1', [1.95, 1.0], ROLE.input), lb('3/4 × 4/3 = 1', [1.95, 0.3], ROLE.ink)] },
    ],
  }
}

// ── 2. Decimal operations ────────────────────────────────────────────────────

/** 2.35 + 1.40 = 3.75 with the decimal points in one column, and 0.3 × 0.4 = 0.12 as 12 of the 100 cells of a 10 × 10 grid. */
export const DCO = { cols: [-3.9, -3.45, -3.0, -2.55] as readonly number[], rows: { a: 1.4, b: 0.6, line: 0.1, s: -0.6 }, grid: { x0: 0.6, y0: -1.7, cell: 0.32 } }

/** KG: align the decimal points to add or subtract; for products, count the decimal places. */
export function buildDecimalOperationsScene(): SceneSpec {
  return framed(raw_buildDecimalOperationsScene())
}
function raw_buildDecimalOperationsScene(): SceneSpec {
  const { cols, rows, grid } = DCO, { x0, y0, cell } = grid
  const row = (y: number, text: string, color: string): SceneObject[] => [...text].map((c, i) => lb(c, [cols[i], y], color))
  const gridLines: SceneObject[] = []
  for (let k = 1; k < 10; k++) gridLines.push(ln([x0 + k * cell, y0], [x0 + k * cell, y0 + 10 * cell], ROLE.reference, 0.015), ln([x0, y0 + k * cell], [x0 + 10 * cell, y0 + k * cell], ROLE.reference, 0.015))
  return {
    id: 'math-decimal-operations',
    title: 'Decimal operations',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to do arithmetic with decimals. ADDITION: write the numbers so the decimal points are in one column — units under units, tenths under tenths, hundredths under hundredths — and add column by column: 2.35 + 1.40 = 3.75 (5 + 0 = 5, 3 + 4 = 7, 2 + 1 = 3). MULTIPLICATION: 0.3 × 0.4 is 3 tenths of 4 tenths of one whole; in a 10 × 10 grid of 100 small squares the region 3 columns wide and 4 rows tall holds 3 × 4 = 12 squares, which is 12 hundredths = 0.12. The count of decimal places adds: one place plus one place gives two places.',
    ariaLabel:
      'Left, the sum 2.35 plus 1.4 written in columns with the decimal points directly above each other, 2.35 over 1.40, a line, and the answer 3.75 in green. Right, a large square cut into a 10 by 10 grid of small squares; in the second step a green block 3 squares wide and 4 squares tall is shaded in the lower left corner with 0.3 under the grid and 0.4 beside it. In the third step the captions 0.3 times 0.4 equals 0.12 and 3 times 4 equals 12 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Add 2.35 + 1.4: write 1.40 under 2.35 so the decimal points are in one column, then add each column: hundredths 5 + 0 = 5, tenths 3 + 4 = 7, units 2 + 1 = 3. The sum is 3.75.', objects: [lb('2.35 + 1.4 = 3.75', [-2.35, 2.4], ROLE.result), ...row(rows.a, '2.35', ROLE.ink), ...row(rows.b, '1.40', ROLE.ink), lb('+', [cols[0] - 0.65, rows.b]), ln([cols[0] - 0.9, rows.line], [cols[3] + 0.35, rows.line], ROLE.reference, 0.04), ...row(rows.s, '3.75', ROLE.result)] },
      { narration: 'Multiply 0.3 × 0.4 with a 10 × 10 grid that stands for 1 whole. 0.3 is 3 columns and 0.4 is 4 rows; the shaded block they cut out has 3 × 4 = 12 of the 100 small squares.', objects: [...rect(x0, y0, x0 + 10 * cell, y0 + 10 * cell, ROLE.reference, 0.04), ...gridLines, ...Array.from({ length: 4 }, (_, r) => ln([x0, y0 + cell * (r + 0.5)], [x0 + 3 * cell, y0 + cell * (r + 0.5)], ROLE.result, 0.28)), lb('0.3', [x0 + 1.5 * cell, y0 - 0.45], ROLE.input), lb('0.4', [x0 - 0.6, y0 + 2 * cell], ROLE.output)] },
      { narration: '12 squares out of 100 is 12 hundredths = 0.12, so 0.3 × 0.4 = 0.12. The digits multiply as whole numbers, 3 × 4 = 12, and the decimal places add: 1 + 1 = 2 places.', objects: [lb('0.3 × 0.4 = 0.12', [2.35, 2.4], ROLE.result), lb('3 × 4 = 12', [2.2, y0 - 1.2], ROLE.ink)] },
    ],
  }
}

// ── 3. Terminating decimals ──────────────────────────────────────────────────

/** Denominators 2…25: 1/d terminates exactly when d has no prime factor other than 2 and 5. */
export const TRM = { x0: -3.75, dx: 1.5, y0: 1.4, dy: 1.0, lo: 2, hi: 25, perRow: 6 }
export const trmAt = (d: number): Pt => [TRM.x0 + TRM.dx * ((d - TRM.lo) % TRM.perRow), TRM.y0 - TRM.dy * Math.floor((d - TRM.lo) / TRM.perRow)]
export const trmTerminates = (d: number) => { let n = d; for (const p of [2, 5]) while (n % p === 0) n /= p; return n === 1 }

/** KG: a fraction in lowest terms terminates exactly when its denominator has only the prime factors 2 and 5. */
export function buildTerminatingDecimalsScene(): SceneSpec {
  return framed(raw_buildTerminatingDecimalsScene())
}
function raw_buildTerminatingDecimalsScene(): SceneSpec {
  const ds = Array.from({ length: TRM.hi - TRM.lo + 1 }, (_, i) => TRM.lo + i)
  return {
    id: 'math-terminating-decimals',
    title: 'Which fractions terminate',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show which unit fractions 1/d have a terminating decimal. The denominators 2 to 25 are laid out; those marked green — 2, 4, 5, 8, 10, 16, 20, 25 — are exactly the ones whose only prime factors are 2 and 5, and for these 1/d ends after finitely many digits (1/8 = 0.125: three digits, because 8 = 2³). All the others (red) have another prime factor — 3, 7, 11, 13, … — and their decimals never end: 1/7 = 0.142857… repeats forever. The reason: 10 = 2 × 5, so a denominator made of 2s and 5s divides some power of 10, and a fraction with denominator 10ᵏ is a decimal with k digits.',
    ariaLabel:
      'A grid of the numbers 2 to 25 in six columns and four rows. In the second step a small dot is added above each number: green above 2, 4, 5, 8, 10, 16, 20 and 25, red above all the others. Labels terminates in green and repeats in red appear below. In the third step the examples 1 over 8 equals 0.125 in green and 1 over 7 gives 0.142857 and on forever in red appear above the grid.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The denominators 2, 3, 4, … , 25. For each, does the decimal for 1/d stop?', objects: ds.map((d) => lb(String(d), trmAt(d))) },
      { narration: 'Green: d has no prime factors except 2 and 5 (2, 4 = 2², 5, 8 = 2³, 10 = 2 × 5, 16, 20, 25) — the decimal terminates. Red: some other prime divides d (3, 6, 7, 9, 11, …) — the decimal never ends.', objects: [...ds.map((d) => dt([trmAt(d)[0], trmAt(d)[1] + 0.42], trmTerminates(d) ? ROLE.result : ROLE.input, 0.1)), lb('terminates', [-2.0, -2.7], ROLE.result), lb('repeats', [2.0, -2.7], ROLE.input)] },
      { narration: '1/8 = 0.125 stops after 3 digits because 8 = 2³; 1/7 = 0.142857142857… goes on forever. A denominator made only of 2s and 5s divides a power of 10, so the fraction becomes a decimal with finitely many places.', objects: [lb('1/8 = 0.125', [-2.2, 2.75], ROLE.result), lb('1/7 → 0.142857…', [1.95, 2.75], ROLE.input)] },
    ],
  }
}

// ── 4. Repeating decimals ────────────────────────────────────────────────────

/** 1/7 by long division: the remainders 1, 3, 2, 6, 4, 5 cycle, each step writing one digit: 1, 4, 2, 8, 5, 7. */
export const REP = { cx: 0, cy: -0.2, R: 1.7, m: 7, remainders: [1, 3, 2, 6, 4, 5] as readonly number[], digits: [1, 4, 2, 8, 5, 7] as readonly number[] }
const repPol = (k: number, r: number): Pt => { const a = ((90 - 60 * k) * Math.PI) / 180; return [REP.cx + r * Math.cos(a), REP.cy + r * Math.sin(a)] }
export const repNode = (k: number): Pt => repPol(k, REP.R)
export const repNumeral = (k: number): Pt => repPol(k, 2.15)
export const repDigit = (k: number): Pt => repPol(k + 0.5, 2.05)

/** KG: a repeating decimal is a block of digits that recurs; long division must repeat a remainder, so every rational number either ends or repeats. */
export function buildRepeatingDecimalsScene(): SceneSpec {
  return framed(raw_buildRepeatingDecimalsScene())
}
function raw_buildRepeatingDecimalsScene(): SceneSpec {
  const { remainders, digits } = REP
  const arrowFor = (k: number): SceneObject => { const a = repNode(k), b = repNode((k + 1) % 6), d = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / d, uy = (b[1] - a[1]) / d; return ar([a[0] + 0.3 * ux, a[1] + 0.3 * uy], [b[0] - 0.3 * ux, b[1] - 0.3 * uy], ROLE.output) }
  const step = (ks: number[]): SceneObject[] => ks.flatMap((k) => [arrowFor(k), lb(String(digits[k]), repDigit(k), ROLE.result)])
  return {
    id: 'math-repeating-decimals',
    title: 'Why 1/7 repeats',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why a fraction gives a repeating decimal, using the long division of 1 by 7. Each step multiplies the remainder by 10, divides by 7, writes the quotient digit and keeps the new remainder: 1 → 10 ÷ 7 = 1 r 3 → 30 ÷ 7 = 4 r 2 → 20 ÷ 7 = 2 r 6 → 60 ÷ 7 = 8 r 4 → 40 ÷ 7 = 5 r 5 → 50 ÷ 7 = 7 r 1, and the remainder 1 is back where it started. Dividing by 7 can only leave the six remainders 1…6, so after at most 6 steps a remainder must recur and from then on the digits repeat: 1/7 = 0.142857 142857… The block of repeating digits is the period (here 6). Every fraction therefore has a decimal that either ends (remainder 0) or repeats.',
    ariaLabel:
      'Six numbered dots 1, 3, 2, 6, 4, 5 around a ring, clockwise from the top. In the second step blue arrows run from 1 to 3, 3 to 2 and 2 to 6 with the green digits 1, 4 and 2 beside them. In the third step the arrows 6 to 4, 4 to 5 and 5 back to 1 are added with the digits 8, 5 and 7, the caption period 6 in the centre and one over seven gives 0.142857 and on forever above.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Long division of 1 by 7: the only remainders that can occur are 1 to 6 (a remainder of 0 would end the decimal). Start with remainder 1 (red).', objects: remainders.flatMap((r, k) => [dt(repNode(k), k === 0 ? ROLE.input : ROLE.ink, 0.2), lb(String(r), repNumeral(k), k === 0 ? ROLE.input : ROLE.ink)]) },
      { narration: 'Each arrow: remainder × 10, divided by 7. 10 ÷ 7 = 1 remainder 3 (digit 1); 30 ÷ 7 = 4 remainder 2 (digit 4); 20 ÷ 7 = 2 remainder 6 (digit 2).', objects: step([0, 1, 2]) },
      { narration: '60 ÷ 7 = 8 remainder 4 (digit 8); 40 ÷ 7 = 5 remainder 5 (digit 5); 50 ÷ 7 = 7 remainder 1 (digit 7) — back to the remainder 1, so the digits 142857 repeat for ever: 1/7 = 0.142857142857…', objects: [...step([3, 4, 5]), lb('period 6', [REP.cx, REP.cy], ROLE.result), lb('1/7 → 0.142857…', [0, 2.95], ROLE.result)] },
    ],
  }
}

// ── 5. Irrational roots ──────────────────────────────────────────────────────

/** The diagonal of a unit square has length √2 (d² = 1² + 1² = 2); an arc carries it to the number line at 1.414…, between 1.4 and 1.5. */
export const IRR = { ox: -4.2, oy: -1.8, u: 2.4 }
export const irrAt = (x: number, y: number): Pt => [IRR.ox + IRR.u * x, IRR.oy + IRR.u * y]

/** KG: √2 is irrational: no fraction squares to 2; its decimal never ends or repeats. */
export function buildIrrationalRootsScene(): SceneSpec {
  return framed(raw_buildIrrationalRootsScene())
}
function raw_buildIrrationalRootsScene(): SceneSpec {
  const { oy, u } = IRR, o = irrAt(0, 0), r = Math.SQRT2 * u
  return {
    id: 'math-irrational-roots',
    title: 'Square root of 2 on the number line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show where √2 lives. A unit square has sides 1, and by Pythagoras its diagonal d satisfies d² = 1² + 1² = 2, so d = √2. Swinging an arc of that length from the corner down to the number line marks the point √2 ≈ 1.41421…, between 1 and 2. It lies between 1.4 and 1.5 because 1.4² = 1.96 < 2 < 2.25 = 1.5²; zooming in further, no finite or repeating decimal squares to exactly 2 — √2 is irrational: it is a real length that no fraction measures. The same holds for the square root of any non-perfect square such as 3, 5 or 6.',
    ariaLabel:
      'A number line with ticks at 0, 1 and 2. A unit square stands on the segment from 0 to 1, with sides marked 1 and a violet diagonal labelled square root of 2 and the caption 1 squared plus 1 squared equals 2. In the second step a blue arc about the origin carries the diagonal down to the number line, ending in a green point labelled square root of 2 between 1 and 2. In the third step two red ticks at 1.4 and 1.5 bracket the point, with the captions 1.4 squared equals 1.96 and 1.5 squared equals 2.25.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A square with side 1 stands on the number line from 0 to 1. Its diagonal d (violet) has d² = 1² + 1² = 2 by Pythagoras, so d = √2.', objects: [ar([o[0] - 0.4, oy], [irrAt(2, 0)[0] + 0.4, oy]), ...[0, 1, 2].flatMap((k) => [ln(irrAt(k, 0), [irrAt(k, 0)[0], oy - 0.15], ROLE.reference, 0.03), lb(String(k), [irrAt(k, 0)[0], oy - 0.5])]), ...rect(o[0], oy, irrAt(1, 1)[0], irrAt(1, 1)[1], ROLE.reference, 0.05), ln(o, irrAt(1, 1), ROLE.aid, 0.06), lb('1', [o[0] - 0.4, irrAt(0, 0.5)[1]]), lb('1', [irrAt(0.5, 1)[0], irrAt(0, 1)[1] + 0.4]), lb('√2', [irrAt(0.5, 0.5)[0] - 0.5, irrAt(0.5, 0.5)[1] + 0.35], ROLE.aid), lb('1² + 1² = 2', [irrAt(0.5, 1)[0], irrAt(0, 1)[1] + 1.0], ROLE.aid)] },
      { narration: 'Swing the diagonal about 0 like a compass (blue arc) until it lies on the number line: it lands at the point √2 ≈ 1.414 (green), between 1 and 2.', objects: [curve(arcPts(o[0], o[1], r, 45, 0, 18), ROLE.output), dt([o[0] + r, oy], ROLE.result, 0.18), lb('√2', [o[0] + r, oy + 0.55], ROLE.result)] },
      { narration: 'Squeeze it: 1.4² = 1.96 is below 2 and 1.5² = 2.25 is above, so 1.4 < √2 < 1.5 (red ticks). Zooming in never ends: √2 = 1.41421356… neither stops nor repeats, so it is not a fraction — it is irrational.', objects: [...[1.4, 1.5].map((v) => ln([irrAt(v, 0)[0], oy - 0.12], [irrAt(v, 0)[0], oy + 0.4], ROLE.input, 0.05)), lb('1.4² = 1.96', [-2.3, oy - 1.25], ROLE.input), lb('1.5² = 2.25', [1.0, oy - 1.25], ROLE.input)] },
    ],
  }
}

// ── 6. Equation (balance scale) ──────────────────────────────────────────────

/** x + 3 = 7 on a balance: the left pan holds a block x (4 units wide) and 3 loose units, the right pan 7 units; take 3 off both sides. */
export const EQN = { beamY: 1.9, panY: 0.5, spacing: 0.32, left: { x0: -3.5, x1: -1.1 }, right: { x0: 1.1, x1: 3.5 }, block: { x0: -3.45, w: 1.28 } }
export const eqnRight = (k: number): Pt => [1.5 + EQN.spacing * k, EQN.panY + 0.2]
export const eqnLeft = (k: number): Pt => [-1.95 + EQN.spacing * k, EQN.panY + 0.2]

/** KG: an equation says two expressions are equal; doing the same thing to both sides keeps it true. */
export function buildEquationScene(): SceneSpec {
  return framed(raw_buildEquationScene())
}
function raw_buildEquationScene(): SceneSpec {
  const { beamY, panY, left, right, block } = EQN, bx0 = block.x0, bx1 = block.x0 + block.w
  const frame: SceneObject[] = [ln([-3.6, beamY], [3.6, beamY], ROLE.reference, 0.07), ln([0, beamY], [0, -0.4], ROLE.reference, 0.07), ln([-0.9, -0.4], [0.9, -0.4], ROLE.reference, 0.07),
    ...[left.x0, left.x1, right.x0, right.x1].map((x) => ln([x, beamY], [x, panY], ROLE.reference, 0.03)), ln([left.x0, panY], [left.x1, panY], ROLE.reference, 0.07), ln([right.x0, panY], [right.x1, panY], ROLE.reference, 0.07)]
  return {
    id: 'math-equation',
    title: 'Equation: a balance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an equation as a balance. The equation x + 3 = 7 says the left pan (an unknown block x plus 3 units) weighs the same as the right pan (7 units), so the beam is level. Whatever you do to one side you must do to the other to keep it balanced: take 3 units from each pan and the beam stays level, leaving x on the left and 4 units on the right, so x = 4. Solving an equation means finding the value of the unknown that makes the two sides equal.',
    ariaLabel:
      'A balance scale with a level beam on a central support and two hanging pans. The left pan holds a blue box labelled x and three red units; the right pan holds seven white units; the caption reads x plus 3 equals 7. In the second step the three red units and three of the right-hand units are crossed out in violet, captioned minus 3 on both sides. In the third step the four remaining right-hand units are marked green and x equals 4 is written under the blue box.',
    stage: NO_STAGE,
    steps: [
      { narration: 'x + 3 = 7: the left pan holds the unknown x (blue block) and 3 units (red); the right pan holds 7 units. The beam is level, so both sides weigh the same.', objects: [...frame, ...rect(bx0, panY + 0.06, bx1, panY + 0.56, ROLE.output, 0.04), lb('x', [(bx0 + bx1) / 2, panY + 0.31], ROLE.output), ...[0, 1, 2].map((k) => dt(eqnLeft(k), ROLE.input, 0.14)), ...Array.from({ length: 7 }, (_, k) => dt(eqnRight(k), ROLE.ink, 0.14)), lb('x + 3 = 7', [0, 2.75], ROLE.result)] },
      { narration: 'Take 3 units off the left pan (the red ones) and 3 units off the right pan: the same change on both sides, so the beam stays level.', objects: [...[0, 1, 2].flatMap((k) => cross(eqnLeft(k))), ...[4, 5, 6].flatMap((k) => cross(eqnRight(k))), lb('−3 on both sides', [0, -1.15], ROLE.aid)] },
      { narration: 'What remains balances: x on the left, 4 units (green) on the right. The block x is as wide as 4 units, so x = 4. Check: 4 + 3 = 7.', objects: [...[0, 1, 2, 3].map((k) => dt(eqnRight(k), ROLE.result, 0.17)), lb('x = 4', [(bx0 + bx1) / 2, -0.15], ROLE.result)] },
    ],
  }
}

// ── 7. Solution set ──────────────────────────────────────────────────────────

/** Where the two sides of an equation meet: 2x + 1 = 7 once (x = 3), x² = 4 twice (x = ±2), x + 1 = x never. */
export const SOL = { s: 0.45, oy: -2.0, ox: [-4.5, 0.0, 2.4] as readonly number[] }
export const solAt = (panel: number, x: number, y: number): Pt => [SOL.ox[panel] + SOL.s * x, SOL.oy + SOL.s * y]

/** KG: the solution set collects every value that makes the equation true — it may be empty, finite or infinite. */
export function buildSolutionSetScene(): SceneSpec {
  return framed(raw_buildSolutionSetScene())
}
function raw_buildSolutionSetScene(): SceneSpec {
  const axes = (p: number, x0: number, x1: number, y0: number, y1: number): SceneObject[] => [ar(solAt(p, x0, 0), solAt(p, x1, 0)), ar(solAt(p, 0, y0), solAt(p, 0, y1))]
  const numeral = (p: number, x: number, text: string): SceneObject => lb(text, [solAt(p, x, 0)[0], SOL.oy - 0.45])
  return {
    id: 'math-solution-set',
    title: 'Solution sets: one, two or none',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what a solution set is by graphing each side of an equation: the solutions are exactly the x-values where the two graphs meet. 2x + 1 = 7: the line y = 2x + 1 (blue) meets y = 7 (red) once, at x = 3, so the solution set is {3}. x² = 4: the parabola y = x² meets y = 4 twice, at x = −2 and x = 2, so the set is {−2, 2}. x + 1 = x: the parallel lines y = x + 1 and y = x never meet, so no value works and the solution set is empty, ∅. A solution set can therefore have one element, several, none — or infinitely many, as for an inequality such as x > 3.',
    ariaLabel:
      'Three small graphs side by side. Left: a blue rising line and a red horizontal line at height 7 crossing at a green point above x equals 3, titled 2x plus 1 equals 7 with the set 3 below. Middle: a blue parabola and a red horizontal line at height 4 crossing at two green points above minus 2 and 2, titled x squared equals 4 with the set minus 2, 2. Right: two parallel rising lines that never meet, titled x plus 1 equals x with the empty set symbol below.',
    stage: NO_STAGE,
    steps: [
      { narration: '2x + 1 = 7: graph the left side y = 2x + 1 (blue) and the right side y = 7 (red). They meet at one point, above x = 3. The solution set is {3}.', objects: [...axes(0, -0.3, 4.4, -0.3, 8.8), ln(solAt(0, 0, 1), solAt(0, 3.6, 8.2), ROLE.output, 0.04), ln(solAt(0, 0, 7), solAt(0, 4.2, 7), ROLE.input, 0.04), dt(solAt(0, 3, 7), ROLE.result, 0.15), numeral(0, 3, '3'), lb('2x + 1 = 7', [solAt(0, 2, 0)[0], 2.7]), lb('{3}', [solAt(0, 2, 0)[0], -3.35], ROLE.result)] },
      { narration: 'x² = 4: the parabola y = x² (blue) meets the line y = 4 (red) twice, above x = −2 and x = 2. The solution set has two elements: {−2, 2}.', objects: [...axes(1, -3.2, 3.2, -0.3, 7.2), curve(sampleMapped((x) => x * x, -2.5, 2.5, (x, y) => pp(solAt(1, x, y)), 40), ROLE.output), ln(solAt(1, -3, 4), solAt(1, 3, 4), ROLE.input, 0.04), dt(solAt(1, -2, 4), ROLE.result, 0.15), dt(solAt(1, 2, 4), ROLE.result, 0.15), numeral(1, -2, '−2'), numeral(1, 2, '2'), lb('x² = 4', [solAt(1, 0, 0)[0], 2.7]), lb('{−2, 2}', [solAt(1, 0, 0)[0], -3.35], ROLE.result)] },
      { narration: 'x + 1 = x: the lines y = x + 1 (blue) and y = x (red) are parallel — they never meet, so no x makes the equation true. The solution set is empty, ∅.', objects: [...axes(2, -0.3, 4.4, -0.3, 5.8), ln(solAt(2, 0, 1), solAt(2, 4, 5), ROLE.output, 0.04), ln(solAt(2, 0, 0), solAt(2, 4, 4), ROLE.input, 0.04), lb('x + 1 = x', [solAt(2, 2, 0)[0], 2.7]), lb('∅', [solAt(2, 2, 0)[0], -3.35], ROLE.result)] },
    ],
  }
}

// ── 8. Substitution method ───────────────────────────────────────────────────

/** y = x + 1 and 2x + y = 7: put x + 1 in for y, 3x + 1 = 7, x = 2, y = 3 — the point where the two lines cross. */
export const SBM = { ox: -4.4, oy: -2.6, u: 0.62, cx: 2.7, rows: [2.6, 1.6, 0.4, -0.6, -1.6, -2.6] as readonly number[] }
export const sbmAt = (x: number, y: number): Pt => [SBM.ox + SBM.u * x, SBM.oy + SBM.u * y]

/** KG: solve for one variable in one equation and substitute it into the other. */
export function buildSubstitutionMethodScene(): SceneSpec {
  return framed(raw_buildSubstitutionMethodScene())
}
function raw_buildSubstitutionMethodScene(): SceneSpec {
  const { cx, rows } = SBM, o = sbmAt(0, 0)
  const flow = (k: number): SceneObject => ar([cx, rows[k - 1] - 0.32], [cx, rows[k] + 0.32], ROLE.aid)
  return {
    id: 'math-substitution-method',
    title: 'Substitution method',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the substitution method on the system y = x + 1 and 2x + y = 7. The first equation already gives y in terms of x, so replace y in the second equation by x + 1: 2x + (x + 1) = 7. Now only x is left: 3x + 1 = 7, so 3x = 6 and x = 2. Put that back into y = x + 1 to get y = 3. The graph shows why this works: each equation is a line, and the solution (2, 3) is the single point on both lines.',
    ariaLabel:
      'Left, a graph with a rising blue line y equals x plus 1 and a falling red line 2x plus y equals 7. Right, a column of equations with downward arrows: y equals x plus 1 in blue, 2x plus y equals 7 in red, then 2x plus open bracket x plus 1 close bracket equals 7, then 3x plus 1 equals 7, then x equals 2 and y equals 3 in green. In the last step a green point marks the crossing of the two lines at 2 across and 3 up with violet guides to the axes.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two equations: y = x + 1 (blue line) and 2x + y = 7 (red line). The first one already says what y equals.', objects: [ar(o, sbmAt(5.4, 0)), ar(o, sbmAt(0, 6.6)), ln(sbmAt(0, 1), sbmAt(5, 6), ROLE.output, 0.04), ln(sbmAt(0.5, 6), sbmAt(3.5, 0), ROLE.input, 0.04), lb('y = x + 1', [cx, rows[0]], ROLE.output), lb('2x + y = 7', [cx, rows[1]], ROLE.input)] },
      { narration: 'Substitute: wherever y appears in the second equation, write x + 1 — giving 2x + (x + 1) = 7. Combine like terms: 3x + 1 = 7. Only x is left.', objects: [flow(2), lb('2x + (x + 1) = 7', [cx, rows[2]]), flow(3), lb('3x + 1 = 7', [cx, rows[3]])] },
      { narration: 'Solve: 3x = 6, so x = 2. Back in y = x + 1: y = 3. The solution (2, 3) is where the two lines cross (green point).', objects: [flow(4), lb('x = 2', [cx, rows[4]], ROLE.result), flow(5), lb('y = 3', [cx, rows[5]], ROLE.result), ln(sbmAt(2, 0), sbmAt(2, 3), ROLE.aid, 0.025), ln(sbmAt(0, 3), sbmAt(2, 3), ROLE.aid, 0.025), dt(sbmAt(2, 3), ROLE.result, 0.18), lb('2', [sbmAt(2, 0)[0], o[1] - 0.45]), lb('3', [o[0] - 0.4, sbmAt(0, 3)[1]])] },
    ],
  }
}

// ── 9. Elimination method ────────────────────────────────────────────────────

/** x + y = 5 and x − y = 1: adding the equations cancels y, 2x = 6, x = 3, y = 2 — again the crossing of the two lines. */
export const ELM = { cols: [-4.4, -3.7, -3.0, -2.3, -1.6] as readonly number[], rows: { a: 1.9, b: 0.7, rule: 0.15, s: -0.55, x: -1.5, y: -2.3 }, ox: 0.3, oy: -2.4, u: 0.75 }
export const elmAt = (x: number, y: number): Pt => [ELM.ox + ELM.u * x, ELM.oy + ELM.u * y]

/** KG: add or subtract multiples of the equations so one variable cancels. */
export function buildEliminationMethodScene(): SceneSpec {
  return framed(raw_buildEliminationMethodScene())
}
function raw_buildEliminationMethodScene(): SceneSpec {
  const { cols, rows } = ELM, o = elmAt(0, 0)
  const eq = (y: number, coef: string, op: string, rhs: string): SceneObject[] => [lb(coef, [cols[0], y]), lb(op, [cols[1], y]), lb('y', [cols[2], y]), lb('=', [cols[3], y]), lb(rhs, [cols[4], y])]
  return {
    id: 'math-elimination-method',
    title: 'Elimination method',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the elimination method on the system x + y = 5 and x − y = 1. Write the equations one under the other with like terms in columns and add them: the y-terms +y and −y cancel (a violet cross between them), x + x = 2x and 5 + 1 = 6, so 2x = 6 and x = 3. Put x = 3 back into x + y = 5 to get y = 2. The graph agrees: the two lines cross at the single point (3, 2). Adding (or subtracting) equations keeps the system true, and choosing the sum that removes one variable leaves an equation in one unknown.',
    ariaLabel:
      'Left, two equations written in aligned columns, x plus y equals 5 above x minus y equals 1, with a line under them. In the second step the row 2x equals 6 is written under the line and a violet cross is drawn between the two y terms, captioned y cancels. In the third step x equals 3 and y equals 2 are written in green. Right, a graph with a falling blue line x plus y equals 5 and a rising red line x minus y equals 1, which in the third step cross at a green point above 3 with the value 2 marked on the vertical axis.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The system x + y = 5 and x − y = 1, written with like terms in columns. The graph shows the two lines (blue and red).', objects: [...eq(rows.a, 'x', '+', '5'), ...eq(rows.b, 'x', '−', '1'), ln([cols[0] - 0.35, rows.rule], [cols[4] + 0.35, rows.rule], ROLE.reference, 0.04), ar(o, elmAt(6, 0)), ar(o, elmAt(0, 5.6)), ln(elmAt(0, 5), elmAt(5, 0), ROLE.output, 0.04), ln(elmAt(1, 0), elmAt(6, 5), ROLE.input, 0.04)] },
      { narration: 'Add the two equations: the y-terms +y and −y cancel (violet cross). x + x = 2x and 5 + 1 = 6, so 2x = 6.', objects: [...cross([cols[2], (rows.a + rows.b) / 2], 0.14), lb('2x', [cols[0], rows.s]), lb('=', [cols[3], rows.s]), lb('6', [cols[4], rows.s]), lb('y cancels', [-3.0, 2.8], ROLE.aid)] },
      { narration: 'Divide by 2: x = 3. Put it into x + y = 5: y = 5 − 3 = 2. The solution (3, 2) is where the two lines cross.', objects: [lb('x = 3', [-3.0, rows.x], ROLE.result), lb('y = 2', [-3.0, rows.y], ROLE.result), dt(elmAt(3, 2), ROLE.result, 0.18), lb('3', [elmAt(3, 0)[0], o[1] - 0.45]), lb('2', [o[0] - 0.4, elmAt(0, 2)[1]])] },
    ],
  }
}

// ── 10. Degree of a polynomial ───────────────────────────────────────────────

/** Degree 1, 2, 3: the graph of a polynomial of degree n crosses the x-axis at most n times (here exactly n). */
export const DEG = {
  s: 0.5, oy: -0.2, ox: [-3.4, 0.0, 3.4] as readonly number[],
  polys: [
    { f: (x: number) => x - 1, x0: -1.5, x1: 3, roots: [1] as readonly number[], text: 'x − 1', title: 'degree 1' },
    { f: (x: number) => x * x - 1, x0: -2, x1: 2, roots: [-1, 1] as readonly number[], text: 'x² − 1', title: 'degree 2' },
    { f: (x: number) => x * x * x - 3 * x, x0: -2.1, x1: 2.1, roots: [-Math.sqrt(3), 0, Math.sqrt(3)] as readonly number[], text: 'x³ − 3x', title: 'degree 3' },
  ],
}
export const degAt = (panel: number, x: number, y: number): Pt => [DEG.ox[panel] + DEG.s * x, DEG.oy + DEG.s * y]

/** KG: the degree is the highest power of the variable; it bounds the number of roots. */
export function buildDegreeScene(): SceneSpec {
  return framed(raw_buildDegreeScene())
}
function raw_buildDegreeScene(): SceneSpec {
  const panel = (p: number): SceneObject[] => {
    const d = DEG.polys[p]
    return [ar(degAt(p, d.x0 - 0.4, 0), degAt(p, d.x1 + 0.5, 0)), ar(degAt(p, 0, -3.3), degAt(p, 0, 3.3)), curve(sampleMapped(d.f, d.x0, d.x1, (x, y) => pp(degAt(p, x, y)), 40), ROLE.output),
      ...d.roots.map((r) => dt(degAt(p, r, 0), ROLE.result, 0.13)), lb(d.title, [degAt(p, (d.x0 + d.x1) / 2, 0)[0], 2.4]), lb(d.text, [degAt(p, (d.x0 + d.x1) / 2, 0)[0], -2.5], ROLE.output)]
  }
  return {
    id: 'math-degree',
    title: 'Degree and the number of roots',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the degree of a polynomial — the highest power of the variable — and what it limits. x − 1 has degree 1 (a line) and crosses the x-axis once; x² − 1 has degree 2 (a parabola) and crosses twice, at −1 and 1; x³ − 3x has degree 3 and crosses three times, at −√3, 0 and √3. A polynomial of degree n has at most n real roots — the green points where its graph meets the axis — and the degree also fixes the long-run shape: odd degrees run from one side of the plane to the opposite one, even degrees turn back up.',
    ariaLabel:
      'Three small graphs of polynomials. First, a rising blue line titled degree 1, labelled x minus 1, with one green point on the x-axis at 1. Second, a blue parabola titled degree 2, labelled x squared minus 1, with green points at minus 1 and 1. Third, a blue S-shaped cubic titled degree 3, labelled x cubed minus 3x, with three green points on the x-axis.',
    stage: NO_STAGE,
    steps: [
      { narration: 'x − 1: the highest power of x is 1, so the degree is 1. Its graph is a line, which crosses the x-axis once (green): one root.', objects: panel(0) },
      { narration: 'x² − 1: highest power 2, degree 2. The parabola crosses the x-axis twice, at x = −1 and x = 1: two roots.', objects: panel(1) },
      { narration: 'x³ − 3x: highest power 3, degree 3. The curve crosses three times, at −√3, 0 and √3: three roots. A polynomial of degree n has at most n roots.', objects: panel(2) },
    ],
  }
}

// ── 11. Polynomial operations (area model) ───────────────────────────────────

/** (x + 2)(x + 3) = x² + 5x + 6 as areas: a square x by x, three strips x by 1, two strips 1 by x and six unit squares. */
export const PLO = { x0: -4.0, y0: -1.8, X: 2.0, U: 0.55 }

/** KG: multiply polynomials by distributing; the grid (area) method keeps every product term. */
export function buildPolynomialOperationsScene(): SceneSpec {
  return framed(raw_buildPolynomialOperationsScene())
}
function raw_buildPolynomialOperationsScene(): SceneSpec {
  const { x0, y0, X, U } = PLO, xm = x0 + X, x1 = x0 + X + 2 * U, ym = y0 + 3 * U, y1 = y0 + 3 * U + X
  return {
    id: 'math-polynomial-operations',
    title: 'Multiplying polynomials with areas',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to multiply (x + 2)(x + 3) with a rectangle whose sides are x + 2 and x + 3. Cut each side into its parts and the rectangle into four pieces, one for every product of a part of the first factor with a part of the second: x · x = x² (blue), x · 3 = 3x and 2 · x = 2x (green), 2 · 3 = 6 (red, six unit squares). The whole area is the sum of the pieces: x² + 3x + 2x + 6 = x² + 5x + 6, where the two x-pieces combine like terms. This is the distributive law drawn as an area, the same as FOIL.',
    ariaLabel:
      'A large rectangle with its top side split into x and 2, and its left side split into x and 3. In the second step it is cut into four coloured regions: a blue square x squared at top left, a green region 3x at bottom left, a green region 2x at top right and a red region of six unit squares at bottom right. In the third step the captions open bracket x plus 2 close bracket open bracket x plus 3 close bracket and x squared plus 5x plus 6 appear to the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A rectangle with width x + 2 and height x + 3. Split the width into x and 2, and the height into x and 3.', objects: [...rect(x0, y0, x1, y1, ROLE.reference, 0.05), lb('x', [x0 + X / 2, y1 + 0.4]), lb('2', [xm + U, y1 + 0.4]), lb('x', [x0 - 0.4, ym + X / 2]), lb('3', [x0 - 0.4, y0 + 1.5 * U])] },
      { narration: 'The four pieces are the four products: x · x = x² (blue), x · 3 = 3x and 2 · x = 2x (green), and 2 · 3 = 6 (red, six unit squares).', objects: [...rect(x0, ym, xm, y1, ROLE.output, 0.05), ...rect(x0, y0, xm, ym, ROLE.result, 0.05), ...rect(xm, ym, x1, y1, ROLE.result, 0.05), ...rect(xm, y0, x1, ym, ROLE.input, 0.05), ln([xm + U, y0], [xm + U, ym], ROLE.reference, 0.03), ln([xm, y0 + U], [x1, y0 + U], ROLE.reference, 0.03), ln([xm, y0 + 2 * U], [x1, y0 + 2 * U], ROLE.reference, 0.03), lb('x²', [x0 + X / 2, ym + X / 2], ROLE.output), lb('3x', [x0 + X / 2, y0 + 1.5 * U], ROLE.result), lb('2x', [xm + U, ym + X / 2], ROLE.result), lb('6', [xm + U / 2, y0 + 2.5 * U], ROLE.input)] },
      { narration: 'Add the areas: x² + 3x + 2x + 6. The two x-pieces are like terms, so (x + 2)(x + 3) = x² + 5x + 6.', objects: [lb('(x + 2)(x + 3)', [1.9, 1.0]), lb('x² + 5x + 6', [1.9, -0.4], ROLE.result)] },
    ],
  }
}

// ── 12. Polynomial division ──────────────────────────────────────────────────

/** (x² + 5x + 7) ÷ (x + 2) = x + 3 remainder 1, laid out like long division, so x² + 5x + 7 = (x + 2)(x + 3) + 1. */
export const PDV = { cols: [-0.6, 0.7, 2.0] as readonly number[], mid: [0.05, 1.35] as readonly number[], rows: { q: 1.9, top: 1.1, r1: 0.3, d1: -0.5, r2: -1.3, d2: -2.1 }, bracketX: -1.7, divX: -3.1 }

/** KG: p(x) = d(x)q(x) + r(x) with deg r < deg d. */
export function buildPolynomialDivisionScene(): SceneSpec {
  return framed(raw_buildPolynomialDivisionScene())
}
function raw_buildPolynomialDivisionScene(): SceneSpec {
  const { cols, mid, rows, bracketX, divX } = PDV
  const rule1 = (rows.r1 + rows.d1) / 2, rule2 = (rows.r2 + rows.d2) / 2
  return {
    id: 'math-polynomial-division',
    title: 'Polynomial long division',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show long division of polynomials with (x² + 5x + 7) ÷ (x + 2). Divide the leading terms: x² ÷ x = x, write x in the quotient; multiply x · (x + 2) = x² + 2x and subtract, leaving 3x; bring down the 7 to make 3x + 7. Divide again: 3x ÷ x = 3; 3 · (x + 2) = 3x + 6; subtract, leaving the remainder 1. The remainder has lower degree (0) than the divisor (1), so we stop: quotient x + 3, remainder 1. Check: (x + 2)(x + 3) + 1 = x² + 5x + 6 + 1 = x² + 5x + 7.',
    ariaLabel:
      'A long-division layout: the divisor x plus 2 on the left, a bracket over the dividend x squared plus 5x plus 7. In the second step a green x is written above the 5x, x squared plus 2x is written below and subtracted with a line, leaving 3x, and the 7 is brought down in red beside it. In the third step a green 3 is written above the 7 so the quotient reads x plus 3, 3x plus 6 is written below and subtracted, leaving a remainder of 1, with the captions quotient x plus 3 and remainder 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Set up: divisor x + 2 outside the bracket, dividend x² + 5x + 7 inside. Terms are lined up by power: x², x, constant.', objects: [lb('x + 2', [divX, rows.top]), ln([bracketX, rows.top + 0.4], [cols[2] + 0.6, rows.top + 0.4], ROLE.reference, 0.04), ln([bracketX, rows.top + 0.4], [bracketX, rows.top - 0.4], ROLE.reference, 0.04), lb('x²', [cols[0], rows.top]), lb('+', [mid[0], rows.top]), lb('5x', [cols[1], rows.top]), lb('+', [mid[1], rows.top]), lb('7', [cols[2], rows.top])] },
      { narration: 'x² ÷ x = x: write x above the 5x. Multiply x · (x + 2) = x² + 2x, write it below and subtract: (x² + 5x) − (x² + 2x) = 3x. Bring down the 7: 3x + 7.', objects: [lb('x', [cols[1], rows.q], ROLE.result), lb('−', [cols[0] - 0.75, rows.r1]), lb('x²', [cols[0], rows.r1]), lb('+', [mid[0], rows.r1]), lb('2x', [cols[1], rows.r1]), ln([cols[0] - 0.45, rule1], [cols[1] + 0.45, rule1], ROLE.reference, 0.03), lb('3x', [cols[1], rows.d1], ROLE.output), lb('+', [mid[1], rows.d1]), lb('7', [cols[2], rows.d1], ROLE.input)] },
      { narration: '3x ÷ x = 3: write + 3 in the quotient. Multiply 3 · (x + 2) = 3x + 6 and subtract: (3x + 7) − (3x + 6) = 1. The remainder 1 has lower degree than x + 2, so stop: quotient x + 3, remainder 1.', objects: [lb('+', [mid[1], rows.q], ROLE.result), lb('3', [cols[2], rows.q], ROLE.result), lb('−', [cols[1] - 0.75, rows.r2]), lb('3x', [cols[1], rows.r2]), lb('+', [mid[1], rows.r2]), lb('6', [cols[2], rows.r2]), ln([cols[1] - 0.45, rule2], [cols[2] + 0.45, rule2], ROLE.reference, 0.03), lb('1', [cols[2], rows.d2], ROLE.output), lb('quotient x + 3', [-1.8, -3.1], ROLE.result), lb('remainder 1', [2.3, -3.1], ROLE.output)] },
    ],
  }
}

// ── 13. Factoring ────────────────────────────────────────────────────────────

/** y = x² + 5x + 6 crosses the x-axis at −3 and −2, so it factors as (x + 3)(x + 2). */
export const FCT = { ox: 2.75, oy: -0.6, ux: 1.1, uy: 0.75 }
export const fctAt = (x: number, y: number): Pt => [FCT.ox + FCT.ux * x, FCT.oy + FCT.uy * y]

/** KG: factoring writes a polynomial as a product of lower-degree polynomials; a root r gives the factor (x − r). */
export function buildFactoringScene(): SceneSpec {
  return framed(raw_buildFactoringScene())
}
function raw_buildFactoringScene(): SceneSpec {
  const o = fctAt(0, 0)
  return {
    id: 'math-factoring',
    title: 'Factoring: roots give factors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that factoring and finding roots are the same thing. The parabola y = x² + 5x + 6 crosses the x-axis at x = −3 and x = −2, the roots (green points). A root r means that x − r is a factor (the factor theorem): the root −3 gives (x + 3) and the root −2 gives (x + 2). Multiplying the factors back, (x + 3)(x + 2) = x² + 5x + 6, because 3 + 2 = 5 is the coefficient of x and 3 × 2 = 6 is the constant term.',
    ariaLabel:
      'A graph of a blue upward parabola, labelled x squared plus 5x plus 6, with its lowest point just below the x-axis. In the second step green points mark where it crosses the x-axis, at minus 3 and minus 2. In the third step the factors x plus 3 and x plus 2 are written under the points and the product x plus 3 times x plus 2 appears below.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The graph of y = x² + 5x + 6: a parabola that dips just below the x-axis and comes back up.', objects: [ar(fctAt(-5.4, 0), fctAt(0.5, 0)), ar(fctAt(0, -0.8), fctAt(0, 5.2)), curve(sampleMapped((x) => x * x + 5 * x + 6, -4.5, -0.5, (x, y) => pp(fctAt(x, y)), 40), ROLE.output), lb('x² + 5x + 6', [-2.9, 3.0], ROLE.output)] },
      { narration: 'It meets the x-axis at x = −3 and x = −2: those are the roots (green), the values that make x² + 5x + 6 equal 0.', objects: [dt(fctAt(-3, 0), ROLE.result, 0.15), dt(fctAt(-2, 0), ROLE.result, 0.15), lb('−3', [fctAt(-3, 0)[0], o[1] - 0.45]), lb('−2', [fctAt(-2, 0)[0], o[1] - 0.45])] },
      { narration: 'A root r gives a factor x − r: the root −3 gives (x + 3) and the root −2 gives (x + 2). So x² + 5x + 6 = (x + 3)(x + 2); check: 3 + 2 = 5 and 3 × 2 = 6.', objects: [lb('(x + 3)', [-1.2, o[1] - 1.15], ROLE.result), lb('(x + 2)', [1.2, o[1] - 1.15], ROLE.result), lb('(x + 3)(x + 2)', [0, -2.7], ROLE.result)] },
    ],
  }
}

// ── 14. Factoring trinomials ─────────────────────────────────────────────────

/** x² + 5x + 6: find two numbers with product 6 and sum 5 — only 2 and 3 work — then split 5x = 2x + 3x. */
export const FTR = { pairs: [[1, 6], [2, 3], [-1, -6], [-2, -3]] as ReadonlyArray<readonly [number, number]>, cols: { a: -2.6, b: -1.6, p: -0.4, s: 1.2, mark: 2.4 }, rows: [1.0, 0.2, -0.6, -1.4] as readonly number[], head: 1.9 }
export const ftrAt = (row: number, col: keyof typeof FTR.cols): Pt => [FTR.cols[col], FTR.rows[row]]

/** KG: factor ax² + bx + c by finding numbers that multiply to ac and add to b. */
export function buildFactoringTrinomialsScene(): SceneSpec {
  return framed(raw_buildFactoringTrinomialsScene())
}
function raw_buildFactoringTrinomialsScene(): SceneSpec {
  const { pairs, cols, head } = FTR
  const fmt = (n: number) => (n < 0 ? `−${-n}` : String(n))
  return {
    id: 'math-factoring-trinomials',
    title: 'Factoring a trinomial',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to factor x² + 5x + 6. Look for two numbers a and b whose PRODUCT is the constant 6 and whose SUM is the coefficient 5. List the integer pairs with product 6 — (1, 6), (2, 3), (−1, −6), (−2, −3) — and add each: 7, 5, −7, −5. Only (2, 3) has sum 5 (green). Split the middle term with them: x² + 5x + 6 = x² + 2x + 3x + 6, then group: x(x + 2) + 3(x + 2) = (x + 2)(x + 3).',
    ariaLabel:
      'A table with columns a, b and ab listing the pairs 1 and 6, 2 and 3, minus 1 and minus 6, minus 2 and minus 3, every product being 6, under the title x squared plus 5x plus 6. In the second step a column sum gives 7, 5, minus 7 and minus 5, with a red mark beside each row except the second, which gets a green mark, and the caption need sum 5. In the third step the lines x squared plus 2x plus 3x plus 6 and open bracket x plus 2 close bracket open bracket x plus 3 close bracket appear below.',
    stage: NO_STAGE,
    steps: [
      { narration: 'x² + 5x + 6: find two numbers a, b with product ab = 6 (the constant). The integer pairs with product 6: (1, 6), (2, 3), (−1, −6), (−2, −3).', objects: [lb('x² + 5x + 6', [0, 3.0], ROLE.output), lb('a', [cols.a, head]), lb('b', [cols.b, head]), lb('ab', [cols.p, head]), ...pairs.flatMap(([a, b], i) => [lb(fmt(a), ftrAt(i, 'a')), lb(fmt(b), ftrAt(i, 'b')), lb(fmt(a * b), ftrAt(i, 'p'))])] },
      { narration: 'We need the sum a + b to equal the middle coefficient 5. The sums are 7, 5, −7, −5: only the pair (2, 3) works (green).', objects: [lb('sum', [cols.s, head]), lb('need sum 5', [0, 2.45], ROLE.aid), ...pairs.flatMap(([a, b], i) => [lb(fmt(a + b), ftrAt(i, 's')), dt(ftrAt(i, 'mark'), a + b === 5 ? ROLE.result : ROLE.input, 0.14)])] },
      { narration: 'Split 5x into 2x + 3x: x² + 2x + 3x + 6. Group the terms: x(x + 2) + 3(x + 2) = (x + 2)(x + 3).', objects: [lb('x² + 2x + 3x + 6', [0, -2.5]), lb('(x + 2)(x + 3)', [0, -3.3], ROLE.result)] },
    ],
  }
}
