/**
 * Core school-mathematics figures — batch 17 of the mathematics visual campaign
 * (2026-10-12): the rest of the algebra essentials (fundamental theorem of algebra, rational
 * inequalities, Pascal's triangle), number theory (the sieve, modular arithmetic) and
 * sequences and series (convergent, divergent, geometric series, comparison test, integral
 * test, alternating series). `math.alg.exponential-function` and `math.alg.logarithm` reuse the
 * batch-2 figures of their `math.func.*` twins (same KG statement: f(x) = aˣ and its inverse).
 *
 * Same rules as batches 1-16: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects (note: SM-01 evaluates the
 * arithmetic in a label left to right, and compares labels that share a last token before "="),
 * and every number drawn comes from the constants and pure helpers exported here, which the
 * test file re-derives from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, mathAxes, polyLines, sampleMapped, arcPts, type XY, type V3 } from './mathSceneKit'

type XYr = readonly [number, number]
const rectLines = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.03): SceneObject[] => polyLines([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], color, t)
const ringAt = (x: number, y: number, color: string, r = 0.2): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
export const choose = (n: number, k: number): number => { let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return Math.round(c) }

// ── 1. Fundamental theorem of algebra ────────────────────────────────────────

/** z³ − 1 has the three cube roots of unity (120° apart on the unit circle); (z − 1)²(z + 1) has 1 twice and −1 once: three roots counted with multiplicity. */
export const FTA = { cx: [-2.4, 2.6] as readonly number[], u: 1.3 }
export const unityRoots = (n: number): XY[] => Array.from({ length: n }, (_, k) => [Math.cos((2 * Math.PI * k) / n), Math.sin((2 * Math.PI * k) / n)] as XY)

/** KG: every non-constant complex polynomial has a complex root, hence exactly n roots counted with multiplicity. */
export function buildFundamentalTheoremAlgebraScene(): SceneSpec {
  return framed(raw_buildFundamentalTheoremAlgebraScene())
}
function raw_buildFundamentalTheoremAlgebraScene(): SceneSpec {
  const { cx, u } = FTA
  const L = (x: number, y: number): V3 => P(cx[0] + x * u, y * u)
  const R = (x: number, y: number): V3 => P(cx[1] + x * u, y * u)
  const roots = unityRoots(3)
  return {
    id: 'math-fundamental-theorem-algebra',
    title: 'Fundamental theorem of algebra: n roots in ℂ',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show that a polynomial of degree n has n complex roots counted with multiplicity: z³ − 1 (degree 3) has the three cube roots of unity, equally spaced 120° apart on the unit circle; (z − 1)²(z + 1) (also degree 3) has the root 1 twice and −1 once — three roots again once multiplicity is counted.',
    ariaLabel:
      'Left: a complex plane with a violet unit circle and three green dots at 1 and at the two points 120 degrees round the circle from it, with violet lines from the origin; the caption says the roots of z cubed equals 1 are three roots 120 degrees apart. Right: a second complex plane with a green dot at minus 1 and a green dot at 1 circled twice, captioned (z minus 1) squared times (z plus 1), root 1 counts twice.',
    stage: NO_STAGE,
    steps: [
      { narration: 'z³ − 1 has degree 3. Its roots are the numbers whose cube is 1: 1 itself and two complex numbers on the unit circle — three roots in the complex plane.', objects: [...mathAxes(L, -1.7, 1.7, -1.7, 1.7), curve(arcPts(L(0, 0)[0], L(0, 0)[1], u, 0, 360, 72), ROLE.aid), ...roots.map((p) => dot(L(p[0], p[1]), ROLE.result, 0.13)), label('roots of z³ = 1', P(cx[0], -2.4), ROLE.result, 'primary')] },
      { narration: 'They are spread evenly round the circle, 120° apart (each is the previous one turned by 120°), and three is exactly the degree of the polynomial.', objects: [...roots.map((p) => guide(L(0, 0), L(p[0], p[1]), ROLE.aid, 0.02)), label('3 roots, 120° apart', P(cx[0], 2.3), ROLE.aid, 'primary')] },
      { narration: 'Roots can repeat: (z − 1)²(z + 1) is also degree 3 but has only two different roots, 1 and −1. Counting 1 twice (its multiplicity) gives 3 again — always exactly n roots with multiplicity.', objects: [...mathAxes(R, -1.7, 1.7, -1.7, 1.7), dot(R(1, 0), ROLE.result, 0.13), dot(R(-1, 0), ROLE.result, 0.13), ringAt(R(1, 0)[0], R(1, 0)[1], ROLE.input, 0.28), label('(z − 1)²(z + 1)', P(cx[1], -2.4), ROLE.result, 'primary'), label('root 1 counts twice', P(cx[1], 2.3), ROLE.input, 'primary')] },
    ],
  }
}

// ── 2. Rational inequality ───────────────────────────────────────────────────

/** (x − 1)/(x + 2) > 0: zero at 1, undefined at −2; positive for x < −2 and x > 1. */
export const RAT = { ox: 0.3, oy: 0.9, ux: 0.55, uy: 0.55, x: [-6, 5] as readonly number[], yMax: 4, chartY: -2.2, zero: 1, pole: -2, left: [-6, -3] as readonly number[], right: [-1.4, 5] as readonly number[] }
export const ratF = (x: number) => (x - 1) / (x + 2)

/** KG: p(x)/q(x) > 0 is solved with a sign chart on the zeros of p and q (q ≠ 0). */
export function buildRationalInequalityScene(): SceneSpec {
  return framed(raw_buildRationalInequalityScene())
}
function raw_buildRationalInequalityScene(): SceneSpec {
  const { ox, oy, ux, uy, x, yMax, chartY, zero, pole, left, right } = RAT
  const G = (px: number, py: number): V3 => P(ox + px * ux, oy + py * uy)
  const C = (px: number): V3 => P(ox + px * ux, chartY)
  return {
    id: 'math-rational-inequality',
    title: 'Rational inequality: a sign chart',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Solve (x − 1)/(x + 2) > 0 with a sign chart: the numerator is zero at x = 1 and the denominator at x = −2 (undefined there), these two numbers cut the line into three intervals, and the quotient is positive on x < −2 and on x > 1 (open ends, since the inequality is strict and −2 is excluded) — exactly where the graph is above the axis.',
    ariaLabel:
      'Top: the graph of y equals (x minus 1) over (x plus 2): two branches either side of a violet vertical asymptote at x equals minus 2, crossing the x axis at the green dot x equals 1; the left branch lies above the axis and the right branch is above the axis only past 1. Bottom: a number line with open circles at minus 2 and 1 and signs plus, minus, plus on the three intervals; green thick segments mark x less than minus 2 and x greater than 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Graph y = (x − 1)/(x + 2): it is undefined at x = −2 (the denominator is 0, a vertical asymptote) and crosses the axis at x = 1 (the numerator is 0).', objects: [...mathAxes(G, x[0] - 0.3, x[1] + 0.3, -yMax - 0.3, yMax + 0.3), line(G(pole, -yMax - 0.3), G(pole, yMax + 0.3), ROLE.aid, 0.02), curve(sampleMapped(ratF, left[0], left[1], G, 40), ROLE.output), curve(sampleMapped(ratF, right[0], right[1], G, 60), ROLE.output), dot(G(zero, 0), ROLE.result, 0.12), label('not allowed: −2', P(-2.5, -1.2), ROLE.aid, 'primary'), label('zero at 1', P(G(zero, 0)[0] + 0.5, G(0, -1.1)[1]), ROLE.result, 'primary')] },
      { narration: 'The two special numbers −2 and 1 cut the number line into three intervals. Test one number in each: x = −3 gives (−4)/(−1) = 4 > 0; x = 0 gives (−1)/2 < 0; x = 3 gives 2/5 > 0. Signs: + − +.', objects: [line(C(x[0]), C(x[1]), ROLE.reference, 0.03), ringAt(C(pole)[0], C(pole)[1], ROLE.aid, 0.14), ringAt(C(zero)[0], C(zero)[1], ROLE.aid, 0.14), label('+', P(C(-4)[0], chartY + 0.4), ROLE.result, 'primary'), label('−', P(C(-0.5)[0], chartY + 0.4), ROLE.input, 'primary'), label('+', P(C(3)[0], chartY + 0.4), ROLE.result, 'primary')] },
      { narration: 'We want the quotient > 0: the two + intervals. The solution is x < −2 or x > 1. The ends are open (strict inequality), and −2 is never allowed because the denominator would be 0.', objects: [line(C(x[0]), C(pole), ROLE.result, 0.07), line(C(zero), C(x[1]), ROLE.result, 0.07), label('x < −2 or x > 1', P(C(-0.5)[0], chartY - 0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Pascal's triangle ─────────────────────────────────────────────────────

/** Rows 0…6 of Pascal's triangle: entry C(n, k); each entry is the sum of the two above; row n sums to 2ⁿ. */
export const PASC = { rows: 6, dx: 1.0, dy: 1.3, y0: 3.2, xSum: 4.4, gap: 0.5 }
export const pascPos = (n: number, k: number): XY => [(k - n / 2) * PASC.dx, PASC.y0 - n * PASC.dy]
const trim = (a: XYr, b: XYr, d = 0.28): [XY, XY] => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / l, uy = (b[1] - a[1]) / l; return [[a[0] + ux * d, a[1] + uy * d], [b[0] - ux * d, b[1] - uy * d]] }
/** KG: C(n, k) in a triangle, each entry the sum of the two above it. */
export function buildPascalsTriangleScene(): SceneSpec {
  return framed(raw_buildPascalsTriangleScene())
}
function raw_buildPascalsTriangleScene(): SceneSpec {
  const { rows, xSum } = PASC
  const entries: SceneObject[] = []
  for (let n = 0; n < rows; n++) for (let k = 0; k <= n; k++) { const p = pascPos(n, k); entries.push(label(String(choose(n, k)), P(p[0], p[1]), ROLE.ink, 'primary')) }
  const [a4, b4, t5] = [pascPos(4, 1), pascPos(4, 2), pascPos(5, 2)]
  const bracket = [line(P(a4[0], a4[1] - PASC.gap), P(b4[0], b4[1] - PASC.gap), ROLE.result, 0.04), line(P(t5[0], a4[1] - PASC.gap), P(t5[0], t5[1] + PASC.gap), ROLE.result, 0.04)]
  return {
    id: 'math-pascals-triangle',
    title: "Pascal's triangle",
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: "Show Pascal's triangle: the entry in row n, position k is the binomial coefficient C(n, k); every inner entry is the sum of the two entries above it (4 + 6 = 10 = C(5, 2)), the edges are 1, and row n adds up to 2ⁿ (1, 2, 4, 8, 16, 32).",
    ariaLabel:
      "Six rows of numbers in a triangle: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; 1 5 10 10 5 1. A green bracket under the 4 and the 6 of the fifth row drops to the 10 below them, with the captions 4 plus 6 equals 10 and C of 5, 2 equals 10. A column of blue numbers on the right headed row sum gives each row's total: 1, 2, 4, 8, 16, 32.",
    stage: NO_STAGE,
    steps: [
      { narration: 'Pascal\'s triangle: start with 1 at the top and make each new number the SUM of the two above it; the outside edges are all 1. Rows 0 to 5 are shown.', objects: entries },
      { narration: 'Look at the first 10 in the bottom row: it sits under the 4 and the 6 of the row above, and 4 + 6 = 10. This is the rule that builds the whole triangle — and the entry is also the binomial coefficient C(5, 2) = 10.', objects: [...bracket, label('4 + 6 = 10', P(-1.7, -4.4), ROLE.result, 'primary'), label('C(5, 2) = 10', P(1.7, -4.4), ROLE.result, 'primary')] },
      { narration: 'Add each row: 1, 2, 4, 8, 16, 32 — the powers of 2, so row n totals 2ⁿ. The triangle is also symmetric left to right.', objects: [label('row sum', P(xSum, PASC.y0 + 0.8), ROLE.output, 'primary'), ...Array.from({ length: rows }, (_, n) => label(String(2 ** n), P(xSum, PASC.y0 - n * PASC.dy), ROLE.output, 'primary'))] },
    ],
  }
}

// ── 4. Sieve of Eratosthenes ─────────────────────────────────────────────────

/** 1…49 in a 7 × 7 grid; multiples of 2, 3, 5, 7 are crossed out (marked) and the 15 unmarked numbers above 1 are the primes. */
export const SIEVE = { n: 49, cols: 7, x0: -3.3, y0: 2.8, dx: 0.95, dy: 1.0, my: -0.42, hw: 0.22 }
export const sievePos = (k: number): XY => [SIEVE.x0 + ((k - 1) % SIEVE.cols) * SIEVE.dx, SIEVE.y0 - Math.floor((k - 1) / SIEVE.cols) * SIEVE.dy]
/** Smallest prime factor of n ≥ 2. */
export const spf = (n: number) => { for (let p = 2; p * p <= n; p++) if (n % p === 0) return p; return n }
const SIEVE_COLOR: Record<number, string> = { 2: ROLE.input, 3: ROLE.output, 5: ROLE.aid, 7: ROLE.reference }

/** KG: the sieve finds all primes up to a limit by marking the multiples of each prime as composite. */
export function buildSieveOfEratosthenesScene(): SceneSpec {
  return framed(raw_buildSieveOfEratosthenesScene())
}
function raw_buildSieveOfEratosthenesScene(): SceneSpec {
  const { n, my, hw } = SIEVE
  const all = Array.from({ length: n }, (_, i) => i + 1)
  const mark = (k: number, color: string, t = 0.05): SceneObject => line(P(sievePos(k)[0] - hw, sievePos(k)[1] + my), P(sievePos(k)[0] + hw, sievePos(k)[1] + my), color, t)
  const composite = all.filter((k) => k >= 4 && spf(k) < k)
  const primes = all.filter((k) => k >= 2 && spf(k) === k)
  return {
    id: 'math-sieve-of-eratosthenes',
    title: 'Sieve of Eratosthenes: primes up to 49',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the sieve on 1…49: underline the multiples of 2 (red), then of 3 (blue), 5 (violet) and 7 (grey) — each composite is crossed out once, by its smallest prime factor, and only primes up to √49 = 7 are needed — leaving the 15 primes 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (green).',
    ariaLabel:
      'The numbers 1 to 49 in a grid of seven rows and seven columns. A red underline under every even number greater than 2; then blue underlines under 9, 15, 21, 27, 33, 39 and 45, violet underlines under 25 and 35 and a grey underline under 49. The 15 numbers left, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 and 47, get green underlines: they are the primes.',
    stage: NO_STAGE,
    steps: [
      { narration: 'List 1 to 49. 1 is not prime. 2 is the first prime — keep it, and cross out all its multiples (4, 6, 8, …): they have 2 as a factor, so they are not prime.', objects: all.map((k) => label(String(k), P(sievePos(k)[0], sievePos(k)[1]), ROLE.ink, 'primary')) },
      { narration: 'Red underlines: every even number above 2 is crossed out (23 numbers).', objects: [...composite.filter((k) => spf(k) === 2).map((k) => mark(k, SIEVE_COLOR[2])), label('multiples of 2', P(0, 3.7), ROLE.input, 'primary')] },
      { narration: 'The next number left standing, 3, is prime: cross out its multiples (blue: 9, 15, 21, …). Then 5 (violet: 25, 35) and 7 (grey: 49). Nothing past √49 = 7 is needed — every composite up to 49 has a prime factor ≤ 7. What is left un-crossed are the primes (green underlines): 15 of them.', objects: [...composite.filter((k) => spf(k) > 2).map((k) => mark(k, SIEVE_COLOR[spf(k)])), ...primes.map((k) => mark(k, ROLE.result, 0.07)), label('then 3, 5, 7', P(-1.6, -4.0), ROLE.output, 'primary'), label('15 primes', P(1.6, -4.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Modular arithmetic ────────────────────────────────────────────────────

/** A clock with residues 0…4 (mod 5): starting at 3 and taking 4 steps wraps past 0 and lands on 2; and the numbers 0…14 sorted by remainder. */
export const MOD = { m: 5, c: [-2.6, 0.2] as XYr, R: 1.6, rl: 2.25, table: { x0: 0.9, y0: 1.6, dx: 0.95, dy: 0.7 } }
export const modPos = (r: number): XY => { const a = ((90 - (360 / MOD.m) * r) * Math.PI) / 180; return [MOD.c[0] + MOD.R * Math.cos(a), MOD.c[1] + MOD.R * Math.sin(a)] }

/** KG: arithmetic on residues {0, …, n−1} where everything wraps modulo n. */
export function buildModularArithmeticScene(): SceneSpec {
  return framed(raw_buildModularArithmeticScene())
}
function raw_buildModularArithmeticScene(): SceneSpec {
  const { m, c, rl, table } = MOD
  const resid = Array.from({ length: m }, (_, r) => r)
  const hops = [0, 1, 2, 3].map((i) => { const a = modPos((3 + i) % m), b = modPos((4 + i) % m), [s, e] = trim(a, b, 0.22); return arrow(P(s[0], s[1]), P(e[0], e[1]), ROLE.input) })
  const cell = (k: number): XY => [table.x0 + (k % m) * table.dx, table.y0 - Math.floor(k / m) * table.dy]
  const colX = table.x0 + 2 * table.dx
  return {
    id: 'math-modular-arithmetic',
    title: 'Modular arithmetic: a clock of remainders',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show arithmetic mod 5 as a clock with the residues 0…4: from 3, taking 4 steps goes past 0 and lands on 2, so 3 + 4 = 7 ≡ 2 (mod 5); numbers that land on the same spot — 2, 7, 12, … — have the same remainder, the same column of the table of 0…14 written five to a row.',
    ariaLabel:
      'Left: a clock face with five points numbered 0 to 4 clockwise from the top, labelled mod 5. Four red arrows walk from 3 to 4, then 0, then 1, then 2, captioned 3 plus 4 equals 7. Right: the numbers 0 to 14 in three rows of five; the column holding 2, 7 and 12 is outlined in green and captioned 7 is congruent to 2 mod 5, same remainder.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Arithmetic mod 5 uses only the residues 0, 1, 2, 3, 4, arranged on a clock: after 4 comes 0 again — the numbers wrap around.', objects: [curve(arcPts(c[0], c[1], MOD.R, 0, 360, 72), ROLE.reference), ...resid.map((r) => dot(P(modPos(r)[0], modPos(r)[1]), ROLE.ink, 0.13)), ...resid.map((r) => { const a = ((90 - (360 / m) * r) * Math.PI) / 180; return label(String(r), P(c[0] + rl * Math.cos(a), c[1] + rl * Math.sin(a)), ROLE.ink, 'primary') }), label('mod 5', P(c[0], c[1]), ROLE.aid, 'primary')] },
      { narration: 'Add 3 + 4: start at 3 and take 4 steps clockwise — 4, then 0 (wrapping past the top), then 1, then 2. You land on 2: 3 + 4 = 7, and 7 leaves remainder 2 when divided by 5.', objects: [...hops, label('3 + 4 = 7', P(c[0], -2.5), ROLE.input, 'primary')] },
      { narration: 'Write 0 to 14 five to a row: each column is one residue. 2, 7 and 12 share a column, so 7 ≡ 2 (mod 5) — numbers that differ by a multiple of 5 are the same on this clock.', objects: [...Array.from({ length: 15 }, (_, k) => label(String(k), P(cell(k)[0], cell(k)[1]), ROLE.ink, 'primary')), ...rectLines(colX - 0.42, table.y0 - 2 * table.dy - 0.4, colX + 0.42, table.y0 + 0.4, ROLE.result, 0.04), label('7 ≡ 2 (mod 5)', P(table.x0 + 2 * table.dx, -1.0), ROLE.result, 'primary'), label('same remainder', P(table.x0 + 2 * table.dx, -1.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Convergent sequence ───────────────────────────────────────────────────

/** aₙ = 1/n → 0: the ε-band around the limit and the N after which every term is inside it (ε = 0.2 → N = 5; ε = 0.1 → N = 10). */
export const CONV = { x0: -4.2, y0: -2.0, ux: 0.55, uy: 3.6, nMax: 13, eps: [0.2, 0.1] as readonly number[], N: [5, 10] as readonly number[] }
export const convTerm = (n: number) => 1 / n
/** The least N such that |aₙ − 0| < ε for every n > N (integer arithmetic on hundredths to dodge float ties). */
export const convN = (eps: number) => { let N = 0; for (let n = 1; n <= 1000; n++) if (Math.abs(convTerm(n)) * 1000 >= eps * 1000 - 1e-9) N = n; return N }

/** KG: aₙ → L when for every ε > 0 there is an N with |aₙ − L| < ε for all n > N. */
export function buildConvergentSequenceScene(): SceneSpec {
  return framed(raw_buildConvergentSequenceScene())
}
function raw_buildConvergentSequenceScene(): SceneSpec {
  const { x0, y0, ux, uy, nMax, eps, N } = CONV
  const S = (n: number, a: number): V3 => P(x0 + n * ux, y0 + a * uy)
  const ns = Array.from({ length: nMax }, (_, i) => i + 1)
  const band = (e: number, color: string) => [line(S(0, e), S(nMax + 0.7, e), color, 0.025), line(S(0, -e), S(nMax + 0.7, -e), color, 0.025)]
  return {
    id: 'math-convergent-sequence',
    title: 'Convergent sequence: the ε–N definition',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the ε–N definition of aₙ → L for aₙ = 1/n and L = 0: given a band of half-width ε around L, there is an N after which every term lies inside the band. For ε = 0.2 the terms are inside from n = 6 on (N = 5); a narrower band ε = 0.1 needs a later start, N = 10 — but some N always exists.',
    ariaLabel:
      'A plot of the points one over n for n from 1 to 13 falling toward the axis. Two violet lines at plus and minus 0.2 around the limit 0 form a band; the points up to n equals 5 are red because they are on or outside the band and the points from n equals 6 are green because they are inside; a violet vertical line separates them, captioned epsilon 0.2, N 5. A second, narrower blue band at 0.1 and a blue vertical line after n equals 10 are captioned epsilon 0.1, N 10.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The sequence aₙ = 1/n: 1, 1/2, 1/3, … The terms get closer and closer to 0 — the claim is that the limit is L = 0.', objects: [arrow(S(-0.3, 0), S(nMax + 0.9, 0), ROLE.reference), arrow(S(0, -0.28), S(0, 1.12), ROLE.reference), ...ns.map((n) => dot(S(n, convTerm(n)), ROLE.ink, 0.09)), label('n', S(nMax + 1.1, -0.12), ROLE.reference, 'detail'), label('aₙ', S(0.45, 1.1), ROLE.reference, 'detail'), label('limit 0', S(nMax + 0.4, 0.1), ROLE.result, 'primary')] },
      { narration: 'Pick a tolerance ε = 0.2: the band from −0.2 to 0.2 around the limit. The terms up to n = 5 are on or outside it (red; a₅ = 0.2 is not less than 0.2) but from n = 6 on EVERY term is inside (green). So N = 5 works for this ε.', objects: [...band(eps[0], ROLE.aid), line(S(N[0] + 0.5, -0.28), S(N[0] + 0.5, 1.1), ROLE.aid, 0.02), ...ns.map((n) => dot(S(n, convTerm(n)), n <= N[0] ? ROLE.input : ROLE.result, 0.15)), label('ε 0.2: N 5', S(N[0] + 0.5, -0.4), ROLE.aid, 'primary')] },
      { narration: 'A smaller tolerance ε = 0.1 squeezes the band, and now the terms must be inside from a later place: N = 10 (a₁₀ = 0.1 is not less than 0.1). The definition says an N exists for EVERY ε > 0, however small — that is what convergence to 0 means.', objects: [...band(eps[1], ROLE.output), line(S(N[1] + 0.5, -0.28), S(N[1] + 0.5, 1.1), ROLE.output, 0.02), label('ε 0.1: N 10', S(N[1] + 0.5, -0.4), ROLE.output, 'primary')] },
    ],
  }
}

// ── 7. Divergent sequence ────────────────────────────────────────────────────

/** (−1)ⁿ oscillates between −1 and 1 (no limit L fits: every L is ≥ 1 from some term); aₙ = n passes every bound M. */
export const DIVG = { xA: -4.4, xB: 0.6, dxn: 0.4, n: 10, yA: 0.2, uA: 0.9, yB0: -1.9, uB: 0.38, M: 6 }
export const oscTerm = (n: number) => (n % 2 === 0 ? 1 : -1)

/** KG: a sequence that does not converge: it may tend to ±∞ or oscillate like (−1)ⁿ. */
export function buildDivergentSequenceScene(): SceneSpec {
  return framed(raw_buildDivergentSequenceScene())
}
function raw_buildDivergentSequenceScene(): SceneSpec {
  const { xA, xB, dxn, n, yA, uA, yB0, uB, M } = DIVG
  const A = (k: number, a: number): V3 => P(xA + k * dxn, yA + a * uA)
  const B = (k: number, a: number): V3 => P(xB + k * dxn, yB0 + a * uB)
  const ks = Array.from({ length: n }, (_, i) => i + 1)
  return {
    id: 'math-divergent-sequence',
    title: 'Divergent sequences: oscillating and unbounded',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show two ways to diverge: (−1)ⁿ alternates between −1 and 1 forever, so no number L can be a limit (a band of half-width 0.5 around ANY L misses one of the two values); aₙ = n grows past every bound M (after n = 6 every term exceeds 6) and has no finite limit either.',
    ariaLabel:
      'Left: the points of the sequence minus 1 to the n for n from 1 to 10, alternating between a red row at minus 1 and a blue row at 1, with a violet band of half-width 0.5 around 0 that none of the points enters, captioned no limit L. Right: the points a n equals n rising in a straight line, with a violet horizontal line at the bound 6; the points above it are green, captioned passes any bound M.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The sequence (−1)ⁿ: −1, 1, −1, 1, … It never settles: odd terms are −1 (red), even terms are 1 (blue).', objects: [...ks.map((k) => dot(A(k, oscTerm(k)), oscTerm(k) === 1 ? ROLE.output : ROLE.input, 0.12)), label('(−1)ⁿ: oscillates', P(xA + 2.2, 2.4), ROLE.ink, 'primary')] },
      { narration: 'Could the limit be L = 0? Try the band of half-width 0.5 around 0: every term is 1 away from 0, so none ever enters it. The same happens for any L: the two values −1 and 1 are 2 apart, so at least one is ≥ 1 away from L. No limit exists.', objects: [line(A(0, 0.5), A(n + 1, 0.5), ROLE.aid, 0.025), line(A(0, -0.5), A(n + 1, -0.5), ROLE.aid, 0.025), label('no limit L', P(xA + 2.2, -1.4), ROLE.aid, 'primary')] },
      { narration: 'The sequence aₙ = n: 1, 2, 3, … It has no limit because it is unbounded: for ANY bound M (here M = 6) all terms past n = 6 are bigger than M (green). It diverges to +∞.', objects: [...ks.map((k) => dot(B(k, k), k > M ? ROLE.result : ROLE.ink, 0.12)), line(B(0.5, M), B(n + 0.8, M), ROLE.aid, 0.025), label('n: grows without bound', P(xB + 2.4, 2.6), ROLE.ink, 'primary'), label('passes any bound M', P(xB + 2.6, -2.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Geometric series ──────────────────────────────────────────────────────

/** 1 + ½ + ¼ + … laid end to end on a number line: the partial sums 1, 1.5, 1.75, 1.875, … close in on 2 = a/(1 − r). */
export const GSE = { x0: -3.6, u: 3.4, a: 1, r: 0.5, terms: 6, yBar: 0.8 }
export const partialSum = (n: number) => (GSE.a * (1 - GSE.r ** n)) / (1 - GSE.r)

/** KG: Sₙ = a(1 − rⁿ)/(1 − r), and for |r| < 1 the infinite series converges to a/(1 − r). */
export function buildGeometricSeriesScene(): SceneSpec {
  return framed(raw_buildGeometricSeriesScene())
}
function raw_buildGeometricSeriesScene(): SceneSpec {
  const { x0, u, a, r, terms, yBar } = GSE
  const X = (v: number): XY => [x0 + v * u, yBar]
  const segs = Array.from({ length: terms }, (_, i) => line(P(X(partialSum(i))[0], yBar), P(X(partialSum(i + 1))[0], yBar), i % 2 === 0 ? ROLE.output : ROLE.input, 0.16))
  const tickLabels: Array<[number, string]> = [[1, '1'], [2, '1.5'], [3, '1.75'], [4, '1.875']]
  return {
    id: 'math-geometric-series',
    title: 'Geometric series: partial sums close in on a/(1 − r)',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the geometric series 1 + 1/2 + 1/4 + … with a = 1 and r = 1/2 as pieces laid end to end on a number line: the partial sums Sₙ = (1 − (1/2)ⁿ)/(1 − 1/2) are 1, 1.5, 1.75, 1.875, … and the gap to 2 halves each time, so the infinite sum is a/(1 − r) = 2.',
    ariaLabel:
      'A number line from 0 to 2 built from consecutive bars of lengths 1, one half, one quarter, one eighth, one sixteenth and one thirty-second, alternately blue and red. Violet ticks under the ends of the first bars are labelled with the partial sums 1, 1.5, 1.75 and 1.875. A green dot at 2 marks the limit, with the captions a is 1 and the ratio is one half, and sum to infinity 2, and a green bracket for the remaining gap.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Lay the terms of 1 + 1/2 + 1/4 + 1/8 + … end to end: a = 1 and each piece is r = 1/2 of the one before (alternate colours).', objects: [...segs, label('a 1, ratio ½', P(0, 2.4), ROLE.ink, 'primary')] },
      { narration: 'The partial sums are where the pieces end: S₁ = 1, S₂ = 1.5, S₃ = 1.75, S₄ = 1.875 — Sₙ = a(1 − rⁿ)/(1 − r) = 2(1 − (1/2)ⁿ).', objects: [...tickLabels.flatMap(([n, t]) => [guide(P(X(partialSum(n))[0], yBar - 0.4), P(X(partialSum(n))[0], yBar - 0.15), ROLE.aid, 0.025), label(t, P(X(partialSum(n))[0], yBar - 0.7), ROLE.aid, 'primary')])] },
      { narration: 'Each new piece closes half of what is left, so the sums never pass 2 but get as near as you like: the infinite series converges to a/(1 − r) = 1/(1 − 1/2) = 2.', objects: [dot(P(X(a / (1 - r))[0], yBar), ROLE.result, 0.15), line(P(X(partialSum(4))[0], -0.9), P(X(a / (1 - r))[0], -0.9), ROLE.result, 0.05), label('sum to ∞: 2', P(X(1.8)[0], 1.7), ROLE.result, 'primary'), label('gap left', P(X(1.94)[0], -1.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Comparison test ───────────────────────────────────────────────────────

/** bₙ = 1/n² (blue) and aₙ = 1/(n² + 1) (red): 0 ≤ aₙ ≤ bₙ, and Σbₙ converges (to π²/6 ≈ 1.645), so Σaₙ converges. */
export const CMP = { x0: -4.0, dx: 0.85, y0: -1.6, uy: 3.6, n: 8, off: 0.13 }
export const cmpB = (n: number) => 1 / (n * n)
export const cmpA = (n: number) => 1 / (n * n + 1)

/** KG: if 0 ≤ aₙ ≤ bₙ and Σbₙ converges then Σaₙ converges (and if aₙ ≥ bₙ ≥ 0 with Σbₙ diverging, Σaₙ diverges). */
export function buildComparisonTestScene(): SceneSpec {
  return framed(raw_buildComparisonTestScene())
}
function raw_buildComparisonTestScene(): SceneSpec {
  const { x0, dx, y0, uy, n, off } = CMP
  const ns = Array.from({ length: n }, (_, i) => i + 1)
  const X = (k: number) => x0 + k * dx
  return {
    id: 'math-comparison-test',
    title: 'Comparison test: a smaller series under a convergent one',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the comparison test for the terms bₙ = 1/n² (blue) and aₙ = 1/(n² + 1) (red): each aₙ is positive and no bigger than bₙ, and Σ1/n² converges (to π²/6 ≈ 1.645), so the smaller positive series Σ1/(n² + 1) is trapped below it and converges too.',
    ariaLabel:
      'A bar chart for n from 1 to 8 with a tall blue bar for the term b n, one over n squared, and a shorter red bar beside it for a n, one over n squared plus one. Every red bar is below the blue bar next to it, captioned a n is at most b n. A caption says the sum of the b n converges to 1.645, so the sum of the a n converges too.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The terms bₙ = 1/n² (blue): 1, 1/4, 1/9, … Their series Σ1/n² is known to converge — to π²/6 ≈ 1.645.', objects: [...ns.map((k) => line(P(X(k) - off, y0), P(X(k) - off, y0 + cmpB(k) * uy), ROLE.output, 0.09)), ...ns.map((k) => label(String(k), P(X(k), y0 - 0.35), ROLE.ink, 'primary')), label('bₙ: 1/n²', P(2.3, 2.0), ROLE.output, 'primary')] },
      { narration: 'Compare the new terms aₙ = 1/(n² + 1) (red): since n² + 1 > n², each aₙ is positive and smaller than bₙ — every red bar sits below the blue bar beside it.', objects: [...ns.map((k) => line(P(X(k) + off, y0), P(X(k) + off, y0 + cmpA(k) * uy), ROLE.input, 0.09)), label('aₙ: 1/(n² + 1)', P(2.3, 1.3), ROLE.input, 'primary'), label('aₙ ≤ bₙ', P(2.3, 0.6), ROLE.ink, 'primary')] },
      { narration: 'Comparison test: 0 ≤ aₙ ≤ bₙ and Σbₙ converges, so the partial sums of Σaₙ are increasing and can never pass Σbₙ ≈ 1.645 — they are bounded, so Σaₙ converges as well.', objects: [label('Σ bₙ → 1.645', P(2.3, -0.1), ROLE.result, 'primary'), label('so Σ aₙ converges', P(2.3, -0.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Integral test ────────────────────────────────────────────────────────

/** Σ1/n² is trapped under ∫₁^∞ dx/x² = 1 (rectangles below the curve); Σ1/n lies above ∫dx/x = ln N → ∞ (rectangles above the curve). */
export const INTG = { u: 0.55, uy: 2.0, y0: -1.6, oxL: -4.8, oxR: 0.45, x1: 7.5 }
export const harmonic = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / k; return s }

/** KG: for positive, continuous, decreasing f, Σf(n) and ∫₁^∞ f(x) dx both converge or both diverge. */
export function buildIntegralTestScene(): SceneSpec {
  return framed(raw_buildIntegralTestScene())
}
function raw_buildIntegralTestScene(): SceneSpec {
  const { u, uy, y0, oxL, oxR, x1 } = INTG
  const GL = (x: number, y: number): V3 => P(oxL + x * u, y0 + y * uy)
  const GR = (x: number, y: number): V3 => P(oxR + x * u, y0 + y * uy)
  const lower = [2, 3, 4, 5, 6, 7].flatMap((n) => rectLines(oxL + (n - 1) * u, y0, oxL + n * u, y0 + uy / (n * n), ROLE.result, 0.02))
  const upper = [1, 2, 3, 4, 5, 6].flatMap((n) => rectLines(oxR + n * u, y0, oxR + (n + 1) * u, y0 + uy / n, ROLE.input, 0.02))
  return {
    id: 'math-integral-test',
    title: 'Integral test: series against area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the integral test: for f(x) = 1/x² the rectangles of width 1 and height f(n) for n = 2, 3, … sit UNDER the curve, so Σ1/n² (n ≥ 2) is at most the finite area ∫₁^∞ dx/x² = 1 — it converges; for f(x) = 1/x the rectangles of height f(n) on [n, n + 1] sit OVER the curve, so Σ1/n is at least ∫dx/x = ln N, which grows without bound — it diverges.',
    ariaLabel:
      'Left: the curve y equals 1 over x squared for x from 1 to 7.5 with six thin green rectangles of width 1 standing on the axis at x from 1 to 7, each under the curve, captioned 1 over x squared and converges. Right: the curve y equals 1 over x with six red rectangles from x equal 1 to 7, each reaching above the curve, captioned 1 over x and diverges.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = 1/x² is positive, continuous and decreasing. Draw rectangles of width 1 and height f(n) on [n − 1, n] for n = 2, 3, …: each lies UNDER the curve, so their total area Σ1/n² is less than the area under the curve from 1 on.', objects: [line(P(oxL + 0.6 * u, y0), P(oxL + 7.8 * u, y0), ROLE.reference, 0.03), curve(sampleMapped((x) => 1 / (x * x), 1, x1, GL, 60), ROLE.output), ...lower, label('1/x²', P(oxL + 3.6 * u, y0 + 1.1 * uy), ROLE.output, 'primary')] },
      { narration: 'f(x) = 1/x is also positive, continuous and decreasing. Now put each rectangle on [n, n + 1] with height f(n): it sticks OUT ABOVE the curve, so the total Σ1/n is more than the area under the curve.', objects: [line(P(oxR + 0.6 * u, y0), P(oxR + 7.8 * u, y0), ROLE.reference, 0.03), curve(sampleMapped((x) => 1 / x, 1, x1, GR, 60), ROLE.output), ...upper, label('1/x', P(oxR + 4.4 * u, y0 + 1.0 * uy), ROLE.output, 'primary')] },
      { narration: 'The area under 1/x² from 1 to ∞ is 1, a finite number, so Σ1/n² is bounded and converges. The area under 1/x up to N is ln N, which grows without limit, so Σ1/n is unbounded and diverges. Series and integral go the same way.', objects: [label('converges', P(oxL + 4.2 * u, -2.6), ROLE.result, 'primary'), label('diverges', P(oxR + 4.2 * u, -2.6), ROLE.input, 'primary')] },
    ],
  }
}

// ── 11. Alternating series ───────────────────────────────────────────────────

/** 1 − 1/2 + 1/3 − … hops right and left by 1/n; the partial sums zig-zag in on ln 2 ≈ 0.693. */
export const ALT = { x0: -3.6, u: 6.4, rows: 8, y0: 2.6, dy: 0.55 }
export const altSum = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += ((k % 2 === 1 ? 1 : -1)) / k; return s }

/** KG: Σ(−1)ⁿaₙ converges when aₙ is positive, decreasing and tends to 0 (Leibniz). */
export function buildAlternatingSeriesScene(): SceneSpec {
  return framed(raw_buildAlternatingSeriesScene())
}
function raw_buildAlternatingSeriesScene(): SceneSpec {
  const { x0, u, rows, y0, dy } = ALT
  const X = (v: number) => x0 + v * u
  const hop = (n: number) => arrow(P(X(altSum(n - 1)), y0 - (n - 1) * dy), P(X(altSum(n)), y0 - (n - 1) * dy), n % 2 === 1 ? ROLE.output : ROLE.input)
  const first = [1, 2, 3, 4].map(hop), later = [5, 6, 7, 8].map(hop)
  return {
    id: 'math-alternating-series',
    title: 'Alternating series: partial sums zig-zag to the limit',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the alternating series 1 − 1/2 + 1/3 − 1/4 + …: each term is a hop of length 1/n, right then left (blue then red), and because the hops are positive, shrinking and tend to 0, the partial sums zig-zag ever more tightly around one number — here ln 2 ≈ 0.693 — which the Leibniz test guarantees.',
    ariaLabel:
      'Eight rows, one per term. Row one is a long blue arrow from 0 to 1; row two a red arrow back to 0.5; row three a shorter blue arrow to 0.83; each next arrow is shorter and points the other way, so the ends of the arrows close in on a green vertical line at 0.693. Captions say hops shrink to 0 and the sum is ln 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Add 1 − 1/2 + 1/3 − 1/4 + … one term at a time: +1 hops right (blue) from 0 to 1; −1/2 hops back left (red) to 0.5; +1/3 goes right to 0.83; −1/4 left to 0.58. Each hop is shorter than the one before and in the opposite direction.', objects: [...first, label('1 − ½ + ⅓ − ¼ + …', P(0.0, y0 + 0.7), ROLE.ink, 'primary')] },
      { narration: 'Keep going: the later hops (5 to 8) get tiny, and the ends of the hops — the partial sums — pinch in from both sides on one number. Odd partial sums stay above it, even ones below it.', objects: [...later, line(P(X(Math.LN2), y0 + 0.4), P(X(Math.LN2), y0 - rows * dy + 0.3), ROLE.result, 0.04)] },
      { narration: 'Because the hops (positive, decreasing, → 0) shrink to nothing, the zig-zag cannot escape: the series converges (Leibniz alternating series test). Its sum is ln 2 ≈ 0.693, and the error after n terms is less than the next hop 1/(n + 1).', objects: [label('limit ln 2 ≈ 0.693', P(X(Math.LN2) + 1.6, y0 - rows * dy + 0.9), ROLE.result, 'primary'), label('hops shrink to 0', P(X(Math.LN2) + 1.6, y0 - rows * dy + 0.2), ROLE.ink, 'primary')] },
    ],
  }
}
