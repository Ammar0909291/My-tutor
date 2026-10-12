/**
 * Core mathematics figures — batch 30 of the mathematics visual campaign (2026-10-12): the rest of the number-theory
 * helpers (Euclidean algorithm, least common multiple, congruence, residue classes, Pythagorean triples, the
 * distribution of primes, the prime number theorem, continued fractions) and the first abstract-algebra helpers
 * (algebraic structures, binary operations, groups, the symmetric group's Cayley table, subgroups).
 *
 * Same rules as batches 1-29: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right), and every number a figure states is re-derived
 * by the test file from the DRAWN rectangles, dots, numerals, tables, bars and curves. A label is about 0.26 screen
 * units wide per character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts, sampleMapped, rightAngleMark } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
const link = (a: Pt, b: Pt, d: number, color: string): SceneObject => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; return ar([a[0] + d * ux, a[1] + d * uy], [b[0] - d * ux, b[1] - d * uy], color) }
const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
const isPrimeN = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }
const piOf = (x: number) => { let c = 0; for (let n = 2; n <= x; n++) if (isPrimeN(n)) c++; return c }
const mod = (a: number, n: number) => ((a % n) + n) % n

// ── 1. Euclidean algorithm (squares tiling a rectangle) ──────────────────────

/** gcd(48, 18): the 48 × 18 rectangle is tiled by 2 squares of 18, 1 of 12 and 2 of 6; the last square, 6, is the gcd. */
export const EUC = {
  x0: -4.7, y0: -0.4, u: 0.125, a: 48, b: 18,
  squares: [{ x: 0, y: 0, s: 18, step: 0 }, { x: 18, y: 0, s: 18, step: 0 }, { x: 36, y: 0, s: 12, step: 1 }, { x: 36, y: 12, s: 6, step: 2 }, { x: 42, y: 12, s: 6, step: 2 }] as ReadonlyArray<{ x: number; y: number; s: number; step: number }>,
  eqY: [-1.3, -2.0, -2.7] as readonly number[], eqX: -1.9,
}
export const eucAt = (x: number, y: number): Pt => [EUC.x0 + EUC.u * x, EUC.y0 + EUC.u * y]

/** KG: gcd(a, b) = gcd(b, a mod b); repeat until the remainder is 0. */
export function buildEuclideanAlgorithmScene(): SceneSpec {
  return framed(raw_buildEuclideanAlgorithmScene())
}
function raw_buildEuclideanAlgorithmScene(): SceneSpec {
  const { a, b, squares, eqY, eqX } = EUC, cols = [ROLE.output, ROLE.aid, ROLE.result]
  const step = (k: number): SceneObject[] => squares.filter((q) => q.step === k).flatMap((q) => [...rect(eucAt(q.x, q.y)[0], eucAt(q.x, q.y)[1], eucAt(q.x + q.s, q.y + q.s)[0], eucAt(q.x + q.s, q.y + q.s)[1], cols[k], 0.05), lb(String(q.s), eucAt(q.x + q.s / 2, q.y + q.s / 2), cols[k])])
  return {
    id: 'math-euclidean-algorithm',
    title: 'Euclidean algorithm as squares',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Euclidean algorithm for gcd(48, 18) with squares. Tile a 48 × 18 rectangle with the biggest squares that fit: two 18 × 18 squares use up 36 of the 48, leaving a 12 × 18 strip (48 = 2 × 18 + 12). In that strip the biggest square is 12 × 12, leaving a 12 × 6 strip (18 = 1 × 12 + 6). That strip is covered exactly by two 6 × 6 squares (12 = 2 × 6 + 0), with nothing left. The side of the last square, 6, is the greatest common divisor: it is the largest square that tiles the whole rectangle. Each step replaces (a, b) by (b, a mod b): (48, 18) → (18, 12) → (12, 6) → (6, 0).',
    ariaLabel:
      'A rectangle 48 units long and 18 high. In the first step two blue squares of side 18 fill the left part, captioned 48 equals 2 times 18 plus 12. In the second step a violet square of side 12 fills the next part of the remaining strip, captioned 18 equals 1 times 12 plus 6. In the third step two green squares of side 6 fill the last strip exactly, captioned 12 equals 2 times 6 plus 0 and gcd equals 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A 48 × 18 rectangle. The biggest squares that fit are 18 × 18: two of them (blue) cover 36 of the length and leave a strip 12 wide. So 48 = 2 × 18 + 12.', objects: [...rect(eucAt(0, 0)[0], eucAt(0, 0)[1], eucAt(a, b)[0], eucAt(a, b)[1], ROLE.reference, 0.05), ...step(0), lb('48 = 2 × 18 + 12', [eqX, eqY[0]], ROLE.output)] },
      { narration: 'In the 12 × 18 strip the biggest square is 12 × 12 (violet), leaving a 12 × 6 strip: 18 = 1 × 12 + 6.', objects: [...step(1), lb('18 = 1 × 12 + 6', [eqX, eqY[1]], ROLE.aid)] },
      { narration: 'The 12 × 6 strip is covered exactly by two 6 × 6 squares (green): 12 = 2 × 6 + 0. Nothing is left, so the last square side, 6, is the greatest common divisor: gcd(48, 18) = 6.', objects: [...step(2), lb('12 = 2 × 6 + 0', [eqX, eqY[2]], ROLE.result), lb('gcd = 6', [3.4, 0.7], ROLE.result)] },
    ],
  }
}

// ── 2. Least common multiple ─────────────────────────────────────────────────

/** Multiples of 4 and of 6 up to 24: the shared ones are 12 and 24, the least is 12 = 4 × 6 ÷ gcd(4, 6). */
export const LCM = { x0: -4.4, u: 0.19, rows: [0.8, -0.5] as readonly number[], a: 4, b: 6, max: 24 }
export const lcmAt = (n: number, row: number): Pt => [LCM.x0 + LCM.u * n, LCM.rows[row]]

/** KG: lcm(a, b) is the smallest positive number divisible by both; lcm · gcd = a · b. */
export function buildLcmScene(): SceneSpec {
  return framed(raw_buildLcmScene())
}
function raw_buildLcmScene(): SceneSpec {
  const mults = (k: number) => Array.from({ length: Math.floor(LCM.max / k) }, (_, i) => k * (i + 1))
  const rowObjs = (row: number, k: number, color: string): SceneObject[] => [ln(lcmAt(0, row), lcmAt(LCM.max + 1, row), ROLE.reference, 0.03), ...mults(k).flatMap((n) => [dt(lcmAt(n, row), color, 0.12), lb(String(n), [lcmAt(n, row)[0], LCM.rows[row] + (row === 0 ? 0.42 : -0.45)])])]
  return {
    id: 'math-lcm',
    title: 'Least common multiple of 4 and 6',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the least common multiple of 4 and 6. List the multiples of 4 (4, 8, 12, 16, 20, 24) on one row and the multiples of 6 (6, 12, 18, 24) on another. A number on both rows is a common multiple: 12 and 24. The smallest of them, 12, is the least common multiple, lcm(4, 6) = 12; every other common multiple (24) is a multiple of it. It is related to the gcd by lcm × gcd = a × b: gcd(4, 6) = 2, so lcm = 4 × 6 ÷ 2 = 12.',
    ariaLabel:
      'Two rows of dots on number lines from 0 to 24. The top row, blue, marks the multiples of 4: 4, 8, 12, 16, 20, 24. In the second step the bottom row, red, marks the multiples of 6: 6, 12, 18, 24. In the third step green vertical lines join the dots at 12 and 24 on both rows, with 12 emphasised, captioned lcm equals 12 and 4 times 6 divided by 2 equals 12.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The multiples of 4 up to 24 (blue): 4, 8, 12, 16, 20, 24.', objects: [...rowObjs(0, LCM.a, ROLE.output), lb('multiples of 4', [-2.4, 1.95], ROLE.output)] },
      { narration: 'The multiples of 6 up to 24 (red): 6, 12, 18, 24.', objects: [...rowObjs(1, LCM.b, ROLE.input), lb('multiples of 6', [-2.4, -1.75], ROLE.input)] },
      { narration: 'Numbers on both rows are common multiples: 12 and 24 (green lines). The smallest is 12, so lcm(4, 6) = 12. Check with the gcd: 4 × 6 ÷ gcd(4, 6) = 24 ÷ 2 = 12.', objects: [...[12, 24].flatMap((n) => [ln(lcmAt(n, 0), lcmAt(n, 1), ROLE.result, 0.04), dt(lcmAt(n, 0), ROLE.result, n === 12 ? 0.2 : 0.15), dt(lcmAt(n, 1), ROLE.result, n === 12 ? 0.2 : 0.15)]), lb('lcm = 12', [2.9, 0.15], ROLE.result), lb('4 × 6 ÷ 2 = 12', [2.5, -1.75], ROLE.ink)] },
    ],
  }
}

// ── 3. Congruence (a clock) ──────────────────────────────────────────────────

/** Mod 5: the integers 0…14 wrap round a 5-position clock in three rings; 2, 7 and 12 share a position, so they are congruent. */
export const CNG = { n: 5, rings: [1.7, 2.45, 3.2] as readonly number[] }
export const cngAngle = (k: number) => ((90 - 72 * (k % CNG.n)) * Math.PI) / 180
export const cngAt = (k: number, extra = 0): Pt => { const r = CNG.rings[Math.floor(k / CNG.n)] + extra; return [r * Math.cos(cngAngle(k)), r * Math.sin(cngAngle(k))] }

/** KG: a ≡ b (mod n) when n divides a − b: the integers fall into n classes by position on the clock. */
export function buildCongruenceScene(): SceneSpec {
  return framed(raw_buildCongruenceScene())
}
function raw_buildCongruenceScene(): SceneSpec {
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
  return {
    id: 'math-congruence',
    title: 'Congruence mod 5 on a clock',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show congruence modulo 5 as a clock with 5 positions. Write 0, 1, 2, 3, 4 round the clock, then keep counting: 5 lands on 0 again, 6 on 1, 7 on 2, and so on — each lap adds 5. Numbers on the same ray from the centre have the same position, so they are congruent mod 5: 2, 7 and 12 (green) all sit at position 2, and 7 − 2 = 5, 12 − 7 = 5 are multiples of 5. In symbols a ≡ b (mod 5) means 5 divides a − b; congruent numbers leave the same remainder on division by 5.',
    ariaLabel:
      'A clock with five positions. The inner ring has 0, 1, 2, 3, 4 starting at the top and going clockwise; in the second step two more rings continue with 5 to 9 and 10 to 14, each number landing on the ray of its remainder. In the third step green dots mark 2, 7 and 12, which share a ray, with the captions 7 congruent to 2 mod 5 and 12 congruent to 7 mod 5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A clock with 5 positions: 0, 1, 2, 3, 4 (inner ring), clockwise from the top. "mod 5" means we only care about the position.', objects: [...range(0, 4).map((k) => lb(String(k), cngAt(k))), lb('mod 5', [0, 0], ROLE.output)] },
      { narration: 'Keep counting: 5 goes back to position 0, 6 to position 1, … Each lap (a new ring) adds 5, so 5–9 and 10–14 line up with 0–4 on the same rays.', objects: range(5, 14).map((k) => lb(String(k), cngAt(k))) },
      { narration: 'Numbers on the same ray are congruent: 2, 7 and 12 (green dots) all sit at position 2. 7 − 2 = 5 and 12 − 7 = 5 are multiples of 5, so 7 ≡ 2 (mod 5) and 12 ≡ 7 (mod 5).', objects: [...[2, 7, 12].map((k) => dt(cngAt(k, 0.34), ROLE.result, 0.13)), lb('7 ≡ 2 (mod 5)', [-3.3, 3.9], ROLE.result), lb('12 ≡ 7 (mod 5)', [3.3, 3.9], ROLE.result)] },
    ],
  }
}

// ── 4. Residue classes ───────────────────────────────────────────────────────

/** Mod 4: every integer −5…8 belongs to one of four classes [0], [1], [2], [3]; [2] + [3] = [1] because 2 + 3 = 5 is in class [1]. */
export const RSC = { n: 4, lo: -5, hi: 8, x0: -4.3, dx: 0.66, y: 0 }
export const rscAt = (k: number): Pt => [RSC.x0 + RSC.dx * (k - RSC.lo), RSC.y]
export const rscColor = (k: number) => [ROLE.output, ROLE.input, ROLE.result, ROLE.aid][mod(k, RSC.n)]

/** KG: the residue classes mod n partition ℤ; they can be added and multiplied class by class. */
export function buildResidueClassesScene(): SceneSpec {
  return framed(raw_buildResidueClassesScene())
}
function raw_buildResidueClassesScene(): SceneSpec {
  const ks = Array.from({ length: RSC.hi - RSC.lo + 1 }, (_, i) => RSC.lo + i)
  const hopArc = (k0: number, k1: number, color: string): SceneObject => curve(arcPts((rscAt(k0)[0] + rscAt(k1)[0]) / 2, -0.5, Math.abs(rscAt(k1)[0] - rscAt(k0)[0]) / 2, 180, 360, 12), color)
  return {
    id: 'math-residue-classes',
    title: 'Residue classes mod 4',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four residue classes modulo 4. Every integer, negative ones included, leaves a remainder 0, 1, 2 or 3 on division by 4, so the integers split into four classes, colour-coded here: [0] = {…, −4, 0, 4, 8, …} (blue), [1] = {…, −3, 1, 5, …} (red), [2] = {…, −2, 2, 6, …} (green), [3] = {…, −5, −1, 3, 7, …} (violet). Each class is an arithmetic progression with step 4. The classes can be added: take any member of each and add — [2] + [3]: 2 + 3 = 5, which is in the class [1] (and 6 + 7 = 13 is also in [1]), so [2] + [3] = [1].',
    ariaLabel:
      'The integers from minus 5 to 8 on a line, each with a small coloured dot above it: blue for class 0, red for class 1, green for class 2, violet for class 3, repeating every four numbers. In the second step a legend names the four classes. In the third step two green hops run from 0 to 2 and from 2 to 5 below the line, landing on a red-dotted number, with the caption class 2 plus class 3 equals class 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The integers −5 to 8. Divide each by 4: the remainder (0, 1, 2 or 3) gives its colour — and the colours repeat every 4 numbers.', objects: ks.flatMap((k) => [lb(String(k), rscAt(k)), dt([rscAt(k)[0], rscAt(k)[1] + 0.4], rscColor(k), 0.1)]) },
      { narration: 'Four classes: [0] blue, [1] red, [2] green, [3] violet. Each is a progression with step 4, so −3, 1, 5 are all in [1].', objects: [0, 1, 2, 3].flatMap((c) => [dt([-4.2 + 2.4 * c, -3.0], [ROLE.output, ROLE.input, ROLE.result, ROLE.aid][c], 0.12), lb(`[${c}]`, [-3.6 + 2.4 * c, -3.0], [ROLE.output, ROLE.input, ROLE.result, ROLE.aid][c])]) },
      { narration: 'Add classes by adding members: start at 0, hop 2 (a member of [2]) and hop 3 (a member of [3]): you land on 5, which is red — class [1]. So [2] + [3] = [1].', objects: [hopArc(0, 2, ROLE.result), hopArc(2, 5, ROLE.aid), lb('[2] + [3] = [1]', [0.2, -2.1], ROLE.ink)] },
    ],
  }
}

// ── 5. Pythagorean triples ───────────────────────────────────────────────────

/** (3, 4, 5) from m = 2, n = 1 and (5, 12, 13) from m = 3, n = 2: a = m² − n², b = 2mn, c = m² + n². */
export const PYT = { tris: [{ m: 2, n: 1, a: 3, b: 4, c: 5, s: 0.55, o: [-4.3, -1.0] as Pt }, { m: 3, n: 2, a: 5, b: 12, c: 13, s: 0.3, o: [0.4, -1.0] as Pt }] as ReadonlyArray<{ m: number; n: number; a: number; b: number; c: number; s: number; o: Pt }> }
export const pytVerts = (i: number): { P0: Pt; P1: Pt; P2: Pt } => { const t = PYT.tris[i]; return { P0: t.o, P1: [t.o[0] + t.a * t.s, t.o[1]], P2: [t.o[0], t.o[1] + t.b * t.s] } }

/** KG: integer solutions of a² + b² = c²; the primitive ones come from coprime m > n > 0. */
export function buildPythagoreanTriplesScene(): SceneSpec {
  return framed(raw_buildPythagoreanTriplesScene())
}
function raw_buildPythagoreanTriplesScene(): SceneSpec {
  const tri = (i: number): SceneObject[] => {
    const t = PYT.tris[i], { P0, P1, P2 } = pytVerts(i), mid: Pt = [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2], L = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]), nx = (P2[1] - P1[1]) / L, ny = (P1[0] - P2[0]) / L
    return [ln(P0, P1, ROLE.reference, 0.05), ln(P0, P2, ROLE.reference, 0.05), ln(P1, P2, ROLE.aid, 0.05), ...rightAngleMark(P0[0], P0[1], [1, 0], [0, 1], 0.22, ROLE.reference), lb(String(t.a), [(P0[0] + P1[0]) / 2, P0[1] - 0.4]), lb(String(t.b), [P0[0] - 0.45, (P0[1] + P2[1]) / 2]), lb(String(t.c), [mid[0] + 0.45 * nx, mid[1] + 0.45 * ny], ROLE.aid)]
  }
  return {
    id: 'math-pythagorean-triples',
    title: 'Pythagorean triples',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Pythagorean triples: whole numbers a, b, c with a² + b² = c², the sides of a right triangle with integer sides. The smallest is (3, 4, 5): 9 + 16 = 25. The next primitive one is (5, 12, 13): 25 + 144 = 169. All primitive triples come from two coprime numbers m > n > 0 by a = m² − n², b = 2mn, c = m² + n²: m = 2, n = 1 gives (3, 4, 5); m = 3, n = 2 gives (5, 12, 13) (drawn to a different scale).',
    ariaLabel:
      'Two right triangles. The first has legs 3 and 4 and hypotenuse 5, drawn with a violet hypotenuse and a right-angle mark. In the second step a taller triangle with legs 5 and 12 and hypotenuse 13. In the third step the captions m equals 2, n equals 1 and 3 squared plus 4 squared equals 5 squared appear under the first, and m equals 3, n equals 2 and 5 squared plus 12 squared equals 13 squared under the second.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A right triangle with sides 3, 4 and hypotenuse 5 (violet).', objects: tri(0) },
      { narration: 'Another with sides 5, 12 and hypotenuse 13 (drawn smaller: each unit is shorter).', objects: tri(1) },
      { narration: 'Both satisfy a² + b² = c²: 9 + 16 = 25 and 25 + 144 = 169. They come from m = 2, n = 1 (3 = 2² − 1², 4 = 2·2·1, 5 = 2² + 1²) and m = 3, n = 2 (5, 12, 13).', objects: [lb('m = 2, n = 1', [-3.4, -2.0], ROLE.output), lb('3² + 4² = 5²', [-3.4, -2.8], ROLE.result), lb('m = 3, n = 2', [2.3, -2.0], ROLE.output), lb('5² + 12² = 13²', [2.3, -2.8], ROLE.result)] },
    ],
  }
}

// ── 6. Prime distribution ────────────────────────────────────────────────────

/** Primes per block of 20 up to 100: 8, 4, 5, 5, 3 — thinning out, irregularly — 25 primes in all, 5 per block on average. */
export const PDS = { x0: -3.6, dx: 1.8, base: -2.0, sy: 0.4, blocks: [[1, 20], [21, 40], [41, 60], [61, 80], [81, 100]] as ReadonlyArray<readonly [number, number]> }
export const pdsCount = (k: number) => { const [a, b] = PDS.blocks[k]; let c = 0; for (let n = a; n <= b; n++) if (isPrimeN(n)) c++; return c }
export const pdsAt = (k: number, v = 0): Pt => [PDS.x0 + PDS.dx * k, PDS.base + PDS.sy * v]

/** KG: how many primes lie in each stretch of the integers — they thin out but never stop. */
export function buildPrimeDistributionScene(): SceneSpec {
  return framed(raw_buildPrimeDistributionScene())
}
function raw_buildPrimeDistributionScene(): SceneSpec {
  const bar = (k: number): SceneObject[] => [ln(pdsAt(k, 0), pdsAt(k, pdsCount(k)), ROLE.output, 0.5), lb(String(pdsCount(k)), [pdsAt(k, 0)[0], pdsAt(k, pdsCount(k))[1] + 0.4]), lb(`${PDS.blocks[k][0]}–${PDS.blocks[k][1]}`, [pdsAt(k, 0)[0], PDS.base - 0.5])]
  return {
    id: 'math-prime-distribution',
    title: 'How the primes thin out',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the primes are distributed with a count per block of 20 numbers up to 100: 1–20 holds 8 primes (2, 3, 5, 7, 11, 13, 17, 19), 21–40 holds 4 (23, 29, 31, 37), 41–60 holds 5 (41, 43, 47, 53, 59), 61–80 holds 5 (61, 67, 71, 73, 79) and 81–100 holds 3 (83, 89, 97): 25 primes in all, an average of 5 per block. The primes get sparser as the numbers grow, but irregularly (the counts are not even decreasing), and they never stop. How fast they thin out is the content of the prime number theorem.',
    ariaLabel:
      'A bar chart with five bars, one per block of twenty numbers. The first three bars, blue, are labelled 1 to 20 with height 8, 21 to 40 with height 4 and 41 to 60 with height 5. In the second step two more bars appear, 61 to 80 with height 5 and 81 to 100 with height 3. In the third step a horizontal violet line at height 5 marks the average, with the caption 25 primes up to 100.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Count the primes in each block of 20: 1–20 has 8, 21–40 has 4, 41–60 has 5.', objects: [0, 1, 2].flatMap(bar) },
      { narration: '61–80 has 5 and 81–100 has 3. The counts wander, but overall the primes are getting sparser.', objects: [3, 4].flatMap(bar) },
      { narration: 'In total 8 + 4 + 5 + 5 + 3 = 25 primes up to 100 — an average of 5 per block (violet line), above that early on and below it later.', objects: [ln([-4.4, pdsAt(0, 5)[1]], [4.4, pdsAt(0, 5)[1]], ROLE.aid, 0.03), lb('average 5', [3.7, pdsAt(0, 5)[1] + 0.5], ROLE.aid), lb('25 primes up to 100', [0, 2.7], ROLE.result)] },
    ],
  }
}

// ── 7. Prime number theorem ──────────────────────────────────────────────────

/** The staircase π(x) = number of primes ≤ x climbs to 25 at x = 100; x / ln x (21.7 there) tracks it, and π(x) / (x / ln x) → 1. */
export const PNT = { ox: -4.4, sx: 0.084, oy: -2.4, sy: 0.17, xmax: 100 }
export const pntAt = (x: number, y: number): Pt => [PNT.ox + PNT.sx * x, PNT.oy + PNT.sy * y]
export const pntStair = (): Array<[number, number]> => { const pts: Array<[number, number]> = [[0, 0]]; let c = 0; for (let n = 2; n <= PNT.xmax; n++) if (isPrimeN(n)) { pts.push([n, c], [n, c + 1]); c++ } pts.push([PNT.xmax, c]); return pts }

/** KG: π(x) ~ x / ln x as x → ∞. */
export function buildPrimeNumberTheoremScene(): SceneSpec {
  return framed(raw_buildPrimeNumberTheoremScene())
}
function raw_buildPrimeNumberTheoremScene(): SceneSpec {
  const o = pntAt(0, 0)
  return {
    id: 'math-prime-number-theorem',
    title: 'Prime number theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the prime number theorem. The staircase π(x) counts the primes up to x: it jumps by 1 at every prime and reaches π(100) = 25. The smooth curve x / ln x (red) follows it closely: at x = 100 it is 100 / ln 100 ≈ 21.7, a ratio of about 1.15. The theorem says the ratio π(x) / (x / ln x) tends to 1 as x grows without bound — the primes thin out exactly like 1 / ln x, so about one number in ln x is prime near x. (The convergence is slow: the ratio is still about 1.08 at x = 1 000 000.)',
    ariaLabel:
      'A graph with x up to 100 along the bottom. A blue staircase rises by one at each prime, from 0 to 25. In the second step a smooth red curve x divided by the natural log of x runs just below the staircase. In the third step green and red points at x equals 100 mark pi of 100 equals 25 and 100 over ln 100 about 21.7, with the caption ratio 1.15.',
    stage: NO_STAGE,
    steps: [
      { narration: 'π(x), the number of primes up to x, is a staircase: it goes up by 1 at each prime (2, 3, 5, 7, 11, …) and reaches 25 at x = 100.', objects: [ar(pntAt(-3, 0), pntAt(106, 0)), ar(pntAt(0, -1), pntAt(0, 29)), curve(pntStair().map(([x, y]) => pp(pntAt(x, y))), ROLE.output), lb('π(x)', [pntAt(30, 0)[0] - 0.3, pntAt(0, 14)[1]], ROLE.output), lb('50', [pntAt(50, 0)[0], o[1] - 0.45]), lb('100', [pntAt(100, 0)[0], o[1] - 0.45])] },
      { narration: 'The smooth curve x / ln x (red) runs close beneath the staircase and has the same overall shape.', objects: [curve(sampleMapped((x) => x / Math.log(x), 2, 100, (x, y) => pp(pntAt(x, y)), 60), ROLE.input), lb('x / ln x', [pntAt(66, 0)[0], pntAt(0, 7)[1]], ROLE.input)] },
      { narration: 'At x = 100: π(100) = 25 (green) and 100 / ln 100 ≈ 21.7 (red), a ratio of about 1.15. The prime number theorem: this ratio tends to 1 as x → ∞.', objects: [dt(pntAt(100, 25), ROLE.result, 0.15), dt(pntAt(100, 100 / Math.log(100)), ROLE.input, 0.15), lb('25 primes up to 100', [pntAt(62, 0)[0], pntAt(0, 26.5)[1]], ROLE.result), lb('100 / ln 100 ≈ 21.7', [pntAt(30, 0)[0], pntAt(0, 21)[1]], ROLE.input), lb('ratio 1.15', [pntAt(80, 0)[0], o[1] - 1.1], ROLE.ink)] },
    ],
  }
}

// ── 8. Continued fractions ───────────────────────────────────────────────────

/** 17/5 = 3 + 1/(2 + 1/2) = [3; 2, 2]: the partial quotients 3, 2, 2 are the quotients of the Euclidean algorithm on (17, 5). */
export const CFR = { divRows: [1.4, 0.5, -0.4] as readonly number[], divX: -3.0, divs: [[17, 5], [5, 2], [2, 1]] as ReadonlyArray<readonly [number, number]>, nested: { three: [0.6, 1.0] as Pt, plusA: [1.2, 1.0] as Pt, barA: [[1.6, 1.0], [4.4, 1.0]] as readonly [Pt, Pt], numA: [3.0, 1.35] as Pt, twoB: [2.0, 0.3] as Pt, plusB: [2.5, 0.3] as Pt, barB: [[2.9, 0.3], [3.9, 0.3]] as readonly [Pt, Pt], numB: [3.4, 0.65] as Pt, twoC: [3.4, -0.05] as Pt } }

/** KG: a continued fraction a₀ + 1/(a₁ + 1/(a₂ + …)); rationals give finite ones, and the quotients come from the Euclidean algorithm. */
export function buildContinuedFractionsScene(): SceneSpec {
  return framed(raw_buildContinuedFractionsScene())
}
function raw_buildContinuedFractionsScene(): SceneSpec {
  const { divRows, divX, divs, nested: N } = CFR
  return {
    id: 'math-continued-fractions',
    title: 'Continued fraction of 17/5',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to turn 17/5 into a continued fraction. Run the Euclidean algorithm on (17, 5): 17 = 3 × 5 + 2, 5 = 2 × 2 + 1, 2 = 2 × 1 + 0; the quotients 3, 2, 2 are the partial quotients. Nest them: 17/5 = 3 + 1/(2 + 1/2): working from the inside, 2 + 1/2 = 5/2, 1/(5/2) = 2/5, 3 + 2/5 = 17/5 = 3.4. The short notation is [3; 2, 2]. A rational number always ends this way (the remainder reaches 0); an irrational number such as √2 = [1; 2, 2, 2, …] goes on for ever.',
    ariaLabel:
      'Left, three division lines: 17 equals 3 times 5 plus 2, 5 equals 2 times 2 plus 1 and 2 equals 2 times 1 plus 0. In the second step, right, a nested fraction: 3 plus a fraction with numerator 1 over 2 plus a fraction with numerator 1 over 2. In the third step the captions 17 over 5 equals 3.4 and the bracket notation 3; 2, 2 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Euclid on (17, 5): 17 = 3 × 5 + 2, then (5, 2): 5 = 2 × 2 + 1, then (2, 1): 2 = 2 × 1 + 0. The quotients are 3, 2, 2.', objects: [lb('17 = 3 × 5 + 2', [divX, divRows[0]], ROLE.output), lb('5 = 2 × 2 + 1', [divX, divRows[1]], ROLE.aid), lb('2 = 2 × 1 + 0', [divX, divRows[2]], ROLE.result)] },
      { narration: 'Nest the quotients: 3 + 1/(2 + 1/2). The 3 is the first quotient, then 1 over (the second quotient 2 plus 1 over the third quotient 2).', objects: [lb('3', N.three, ROLE.output), lb('+', N.plusA), ln(N.barA[0], N.barA[1], ROLE.reference, 0.03), lb('1', N.numA), lb('2', N.twoB, ROLE.aid), lb('+', N.plusB), ln(N.barB[0], N.barB[1], ROLE.reference, 0.03), lb('1', N.numB), lb('2', N.twoC, ROLE.result)] },
      { narration: 'Evaluate from the inside: 2 + 1/2 = 5/2, then 1/(5/2) = 2/5, then 3 + 2/5 = 17/5 = 3.4. In short, 17/5 = [3; 2, 2].', objects: [lb('17/5 = 3.4', [3.2, -1.3], ROLE.result), lb('[3; 2, 2]', [3.2, -2.1], ROLE.ink)] },
    ],
  }
}

// ── 9. Algebraic structure ───────────────────────────────────────────────────

export const ALS = { dx: 0.78, dy: 0.7, cx: [-2.75, 2.75] as readonly number[], y0: 1.4 }
/** the position of a table cell: row i, column j, with -1 for the header row / column */
export const tblAt = (panel: number, i: number, j: number, dx = ALS.dx, dy = ALS.dy, n = 4): Pt => [ALS.cx[panel] + (j === -1 ? -(n / 2 + 0.7) * dx : (j - (n - 1) / 2) * dx), i === -1 ? ALS.y0 + 0.65 : ALS.y0 - dy * i]
export const alsPlus = (a: number, b: number) => (a + b) % 4
export const alsTimes = (a: number, b: number) => (a * b) % 4

/** KG: the same set with different operations gives different structures: (ℤ₄, +) is a group, (ℤ₄, ×) is not. */
export function buildAlgebraicStructureScene(): SceneSpec {
  return framed(raw_buildAlgebraicStructureScene())
}
function raw_buildAlgebraicStructureScene(): SceneSpec {
  const table = (panel: number, op: (a: number, b: number) => number, sign: string): SceneObject[] => [lb(sign, tblAt(panel, -1, -1), ROLE.aid), ...[0, 1, 2, 3].flatMap((k) => [lb(String(k), tblAt(panel, -1, k), ROLE.aid), lb(String(k), tblAt(panel, k, -1), ROLE.aid)]), ...[0, 1, 2, 3].flatMap((i) => [0, 1, 2, 3].map((j) => lb(String(op(i, j)), tblAt(panel, i, j)))), ln([tblAt(panel, -1, -1)[0] + 0.3, ALS.y0 + 0.33], [tblAt(panel, -1, 3)[0] + 0.35, ALS.y0 + 0.33], ROLE.reference, 0.03), ln([tblAt(panel, 0, -1)[0] + 0.33, ALS.y0 + 0.65 + 0.3], [tblAt(panel, 0, -1)[0] + 0.33, tblAt(panel, 3, 0)[1] - 0.3], ROLE.reference, 0.03)]
  return {
    id: 'math-algebraic-structure',
    title: 'Same set, different structure',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an algebraic structure is a set together with an operation, and that changing the operation changes the structure. Take the set {0, 1, 2, 3}. With addition mod 4 every row and column of the table contains each of 0, 1, 2, 3 exactly once, 0 is an identity (it changes nothing) and every element has an inverse (1 and 3 cancel, 2 cancels itself): a group. With multiplication mod 4 the row of 0 is all 0s and the row of 2 is 0, 2, 0, 2: neither 0 nor 2 ever gives the identity 1, so they have no inverse and the structure is not a group. Abstract algebra studies such structures through their axioms, not through what the elements are.',
    ariaLabel:
      'Two four-by-four operation tables for the numbers 0 to 3. Left, addition mod 4: each row is the previous one shifted. In the second step the right table, multiplication mod 4, whose first row is all zeros and third row is 0 2 0 2. In the third step red marks beside the rows of 0 and 2 of the product table show they never produce 1, with the verdicts a group in green for addition and not a group in red for multiplication.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The set {0, 1, 2, 3} with addition mod 4: each row and each column holds 0, 1, 2, 3 once. 0 is the identity, and every element has an inverse (0↔0, 1↔3, 2↔2).', objects: [...table(0, alsPlus, '+'), lb('plus mod 4', [ALS.cx[0], 3.0], ROLE.output)] },
      { narration: 'The same set with multiplication mod 4: now the row of 0 is all 0s and the row of 2 is 0, 2, 0, 2. The identity for × is 1, but 0 and 2 never produce a 1.', objects: [...table(1, alsTimes, '×'), lb('times mod 4', [ALS.cx[1], 3.0], ROLE.input)] },
      { narration: 'So 0 and 2 have no inverse under × (red marks): the same set is a group under + but not under ×. The operation, not the set, decides the structure.', objects: [...[0, 2].map((i) => dt([tblAt(1, i, 3)[0] + 0.62, tblAt(1, i, 3)[1]], ROLE.input, 0.13)), lb('a group', [ALS.cx[0], -1.4], ROLE.result), lb('not a group', [ALS.cx[1], -1.4], ROLE.input)] },
    ],
  }
}

// ── 10. Binary operation ─────────────────────────────────────────────────────

/** On S = {0, 1, 2}: + gives 3 and 4 (outside S, not closed); + mod 3 stays inside S (closed); both tables are symmetric (commutative). */
export const BNO = { dx: 0.75, dy: 0.65, cx: [-2.6, 2.6] as readonly number[], y0: 1.0, n: 3 }
export const bnoAt = (panel: number, i: number, j: number): Pt => [BNO.cx[panel] + (j === -1 ? -1.55 * BNO.dx - 0.2 : (j - 1) * BNO.dx), i === -1 ? BNO.y0 + 0.65 : BNO.y0 - BNO.dy * i]
export const bnoPlain = (a: number, b: number) => a + b
export const bnoMod = (a: number, b: number) => (a + b) % 3

/** KG: a binary operation on S assigns an element of S to each pair; closure means the result never leaves S. */
export function buildBinaryOperationScene(): SceneSpec {
  return framed(raw_buildBinaryOperationScene())
}
function raw_buildBinaryOperationScene(): SceneSpec {
  const table = (panel: number, op: (a: number, b: number) => number): SceneObject[] => [lb('+', bnoAt(panel, -1, -1), ROLE.aid), ...[0, 1, 2].flatMap((k) => [lb(String(k), bnoAt(panel, -1, k), ROLE.aid), lb(String(k), bnoAt(panel, k, -1), ROLE.aid)]), ...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => lb(String(op(i, j)), bnoAt(panel, i, j), op(i, j) > 2 ? ROLE.input : ROLE.ink)))]
  return {
    id: 'math-binary-operation',
    title: 'Binary operation and closure',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what a binary operation on a set is and what closure means. A binary operation on S = {0, 1, 2} gives, for every ordered pair (a, b) in S, an answer — the operation table. Ordinary addition on S is NOT closed: 1 + 2 = 3, 2 + 1 = 3 and 2 + 2 = 4 are not in S (shown in red), so it is not a binary operation on S. Addition mod 3 is closed: every entry is 0, 1 or 2, so the answer always stays in S. Both tables are symmetric across the main diagonal, which says a + b = b + a: the operation is commutative.',
    ariaLabel:
      'Two three-by-three addition tables for the numbers 0, 1 and 2. Left, ordinary addition, whose entries 3, 3 and 4 are drawn in red. In the second step the right table, addition mod 3, with entries 0, 1, 2 in every row. In the third step the captions not closed under the left table and closed in green under the right table appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Ordinary addition on S = {0, 1, 2}: the table has entries 0 to 4 — the entries 3, 3 and 4 (red) are not in S.', objects: [...table(0, bnoPlain), lb('plain +', [BNO.cx[0], 2.9], ROLE.output)] },
      { narration: 'Addition mod 3 on the same set: every entry is 0, 1 or 2.', objects: [...table(1, bnoMod), lb('+ mod 3', [BNO.cx[1], 2.9], ROLE.input)] },
      { narration: 'Plain addition escapes S: the red entries 3, 3 and 4 are not in {0, 1, 2}, so it is not closed. Mod 3 never leaves S: closed. (Both tables are symmetric about the diagonal: a + b = b + a.)', objects: [lb('not closed', [BNO.cx[0], -1.4], ROLE.input), lb('closed', [BNO.cx[1], -1.4], ROLE.result)] },
    ],
  }
}

// ── 11. Group (axioms on ℤ₃) ─────────────────────────────────────────────────

/** (ℤ₃, +): closed, associative, identity 0 (its row and column copy the headers), and 1 and 2 are each other's inverse (the 0s of the table). */
export const GRP = { dx: 1.0, dy: 0.9, cx: -1.0, y0: 1.2, n: 3, rowH: 0.8 }
export const grpAt = (i: number, j: number): Pt => [GRP.cx + (j === -1 ? -1.5 * GRP.dx - 0.2 : (j - 1) * GRP.dx), i === -1 ? GRP.y0 + 0.8 : GRP.y0 - GRP.dy * i]
export const grpOp = (a: number, b: number) => (a + b) % 3

/** KG: a group is a set with an operation that is closed, associative, has an identity, and gives every element an inverse. */
export function buildGroupTheoryScene(): SceneSpec {
  return framed(raw_buildGroupTheoryScene())
}
function raw_buildGroupTheoryScene(): SceneSpec {
  return {
    id: 'math-group-theory',
    title: 'The group axioms on ℤ₃',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the group axioms on the smallest interesting example, {0, 1, 2} with addition mod 3. CLOSURE: every entry of the table is one of 0, 1, 2. ASSOCIATIVITY: (a + b) + c = a + (b + c) for all choices (it can be checked from the table). IDENTITY: the row and column of 0 simply copy the headers (0 + g = g + 0 = g), so 0 is the identity element (green frames). INVERSES: every element can be combined to give the identity 0 — the 0s of the table (violet) pair 1 with 2 and 0 with itself: the inverse of 1 is 2. A set with an operation that satisfies all four is a group; it is abelian when the table is also symmetric, as here.',
    ariaLabel:
      'A three-by-three addition table mod 3 with the headers 0, 1, 2. In the second step green outlines surround the row and the column of 0, which copy the headers, with the caption identity 0. In the third step violet dots mark the zeros of the table, at 0 and 0, 1 and 2, and 2 and 1, with the captions inverse of 1 is 2 and closed, all entries in 0, 1, 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The operation table of ({0, 1, 2}, + mod 3). Every entry is again 0, 1 or 2: the set is closed under the operation.', objects: [lb('+', grpAt(-1, -1), ROLE.aid), ...[0, 1, 2].flatMap((k) => [lb(String(k), grpAt(-1, k), ROLE.aid), lb(String(k), grpAt(k, -1), ROLE.aid)]), ...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => lb(String(grpOp(i, j)), grpAt(i, j)))), lb('add mod 3', [GRP.cx, 3.1], ROLE.output)] },
      { narration: 'Identity: the row and column of 0 (green frames) just repeat the headers — 0 changes nothing: 0 + g = g + 0 = g.', objects: [...rect(grpAt(0, -1)[0] - 0.45, grpAt(0, 0)[1] - GRP.rowH / 2, grpAt(0, 2)[0] + 0.45, grpAt(0, 0)[1] + GRP.rowH / 2, ROLE.result, 0.04), ...rect(grpAt(0, 0)[0] - 0.45, grpAt(2, 0)[1] - 0.4, grpAt(0, 0)[0] + 0.45, grpAt(-1, 0)[1] + 0.4, ROLE.result, 0.04), lb('identity 0', [3.5, 1.2], ROLE.result)] },
      { narration: 'Inverses: where an entry is the identity 0 (violet) the two headers cancel: 0 with 0, 1 with 2, 2 with 1. So the inverse of 1 is 2. Associativity can be checked for every triple from the table.', objects: [...[[0, 0], [1, 2], [2, 1]].map(([i, j]) => dt([grpAt(i, j)[0] + 0.4, grpAt(i, j)[1]], ROLE.aid, 0.1)), lb('inverse of 1 is 2', [3.2, -0.4], ROLE.aid), lb('closed: all in {0, 1, 2}', [GRP.cx, -2.4], ROLE.ink)] },
    ],
  }
}

// ── 12. Group operation examples (S₃) ────────────────────────────────────────

/** The symmetric group S₃ as permutations of {0, 1, 2}; (a ∘ b)(x) = a(b(x)). The table is not symmetric: r ∘ s ≠ s ∘ r. */
export const GRO = {
  dx: 0.85, dy: 0.7, cx: -1.0, y0: 2.0,
  names: ['e', 'r', 'q', 's', 't', 'u'] as readonly string[],
  perms: [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [2, 1, 0], [0, 2, 1]] as ReadonlyArray<readonly number[]>,
}
export const groCompose = (a: number, b: number) => { const p = GRO.perms[a], q = GRO.perms[b], r = [0, 1, 2].map((x) => p[q[x]]); return GRO.perms.findIndex((m) => m.every((v, i) => v === r[i])) }
export const groAt = (i: number, j: number): Pt => [GRO.cx + (j === -1 ? -3.7 * GRO.dx : (j - 2.5) * GRO.dx), i === -1 ? GRO.y0 + 0.65 : GRO.y0 - GRO.dy * i]

/** KG: concrete groups — the symmetric group Sₙ of permutations, with its Cayley table. */
export function buildGroupOperationScene(): SceneSpec {
  return framed(raw_buildGroupOperationScene())
}
function raw_buildGroupOperationScene(): SceneSpec {
  const head: SceneObject[] = [lb('∘', groAt(-1, -1), ROLE.aid), ...GRO.names.flatMap((nm, k) => [lb(nm, groAt(-1, k), ROLE.aid), lb(nm, groAt(k, -1), ROLE.aid)])]
  const cell = (i: number, j: number): SceneObject => lb(GRO.names[groCompose(i, j)], groAt(i, j))
  const idCells = [0, 1, 2, 3, 4, 5].flatMap((k) => (k === 0 ? [cell(0, 0)] : [cell(0, k), cell(k, 0)]))
  const rest = [0, 1, 2, 3, 4, 5].flatMap((i) => [0, 1, 2, 3, 4, 5].filter((j) => i !== 0 && j !== 0).map((j) => cell(i, j)))
  return {
    id: 'math-group-operation',
    title: 'The symmetric group S₃',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a concrete non-abelian group: the symmetric group S₃ of the 6 ways to rearrange three objects (permutations). Name them e (do nothing), r and q (the two rotations of the three objects) and s, t, u (the three swaps). The Cayley table lists a ∘ b (do b first, then a) for every pair. Reading the table: e behaves as the identity (its row and column copy the headers), each element occurs once in every row and column, so every element has an inverse, and the table encodes everything about the group. It is not symmetric: r ∘ s = t but s ∘ r = u — order matters, so S₃ is a non-commutative (non-abelian) group of order 6.',
    ariaLabel:
      'A six-by-six table of the permutations e, r, q, s, t and u of three objects with the headers along the top and left. In the first step only the row and column of e are filled, copying the headers. In the second step the remaining entries appear; each letter occurs once in every row and column. In the third step two cells for r composed with s and s composed with r are marked with a red dot and a green dot, showing different entries, with the captions not commutative and 6 elements.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The six permutations of three objects: e (identity), r, q (rotations), s, t, u (swaps). Row and column e: composing with e changes nothing, so they copy the headers.', objects: [...head, ...idCells, ln([groAt(-1, -1)[0] + 0.3, GRO.y0 + 0.3], [groAt(-1, 5)[0] + 0.35, GRO.y0 + 0.3], ROLE.reference, 0.03), ln([groAt(0, -1)[0] + 0.3, GRO.y0 + 0.9], [groAt(0, -1)[0] + 0.3, groAt(5, 0)[1] - 0.3], ROLE.reference, 0.03)] },
      { narration: 'The rest of the Cayley table: entry (row a, column b) is a ∘ b. Every letter appears exactly once in each row and each column, so every element has an inverse.', objects: rest },
      { narration: 'It is not symmetric: r ∘ s = t (red dot) but s ∘ r = u (green dot). Order matters: S₃ is a group of order 6 that is not commutative.', objects: [dt([groAt(1, 3)[0] - 0.4, groAt(1, 3)[1]], ROLE.input, 0.1), dt([groAt(3, 1)[0] - 0.4, groAt(3, 1)[1]], ROLE.result, 0.1), lb('not commutative', [GRO.cx, -2.2], ROLE.input), lb('6 elements', [GRO.cx, -2.9], ROLE.ink)] },
    ],
  }
}

// ── 13. Subgroup ─────────────────────────────────────────────────────────────

/** In ℤ₆ under + mod 6, H = {0, 2, 4} is a subgroup (closed, with inverses); {0, 1, 2} is not (1 + 2 = 3 falls outside). */
export const SBG = { n: 6, rNode: 1.7, rNum: 2.25 }
const sbgPol = (k: number, r: number): Pt => { const a = ((90 - 60 * k) * Math.PI) / 180; return [r * Math.cos(a), r * Math.sin(a)] }
export const sbgNode = (k: number): Pt => sbgPol(k, SBG.rNode)
export const sbgNum = (k: number): Pt => sbgPol(k, SBG.rNum)

/** KG: H ≤ G iff H is non-empty, closed under the operation and under inverses. */
export function buildSubgroupScene(): SceneSpec {
  return framed(raw_buildSubgroupScene())
}
function raw_buildSubgroupScene(): SceneSpec {
  return {
    id: 'math-subgroup',
    title: 'Subgroup of ℤ₆',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a subgroup and a non-subgroup inside ℤ₆ = {0, 1, 2, 3, 4, 5} (addition mod 6, the six hours of a clock). H = {0, 2, 4} (green triangle) is a subgroup: it is closed (2 + 2 = 4, 2 + 4 = 6 ≡ 0, 4 + 4 = 8 ≡ 2 — every sum stays in H), it contains the identity 0, and the inverse of each element is in H (−2 ≡ 4, −4 ≡ 2). Its size 3 divides the size 6 of the group. By contrast {0, 1, 2} is not a subgroup: 1 + 2 = 3 lands outside it (red arrow), so it is not closed.',
    ariaLabel:
      'Six numbers 0 to 5 round a ring, 0 at the top, with the caption add mod 6 in the middle. In the second step green dots mark 0, 2 and 4 and a green triangle joins them, captioned H equals 0, 2, 4. In the third step a red arrow runs from 1 to 3 captioned 1 plus 2 equals 3, with the caption 0, 1, 2 is not closed.',
    stage: NO_STAGE,
    steps: [
      { narration: 'ℤ₆ under addition mod 6: the numbers 0 to 5 round a ring, like hours on a clock (6 is back at 0).', objects: [...[0, 1, 2, 3, 4, 5].flatMap((k) => [dt(sbgNode(k), ROLE.ink, 0.12), lb(String(k), sbgNum(k))]), lb('add mod 6', [-3.2, 2.6], ROLE.output)] },
      { narration: 'H = {0, 2, 4} (green): 2 + 2 = 4, 2 + 4 = 0, 4 + 4 = 2 — always back in H; 0 is in H; the inverse of 2 is 4 and of 4 is 2. So H is a subgroup (and 3 divides 6).', objects: [...[0, 2, 4].map((k) => dt(sbgNode(k), ROLE.result, 0.18)), ln(sbgNode(0), sbgNode(2), ROLE.result, 0.05), ln(sbgNode(2), sbgNode(4), ROLE.result, 0.05), ln(sbgNode(4), sbgNode(0), ROLE.result, 0.05), lb('H = {0, 2, 4}', [0, 3.2], ROLE.result)] },
      { narration: 'Not every subset works: in {0, 1, 2} the sum 1 + 2 = 3 (red arrow, 1 → 3) leaves the set, so {0, 1, 2} is not closed and not a subgroup.', objects: [link(sbgNode(1), sbgNode(3), 0.3, ROLE.input), lb('1 + 2 = 3', [2.6, 0.0], ROLE.input), lb('{0, 1, 2} is not closed', [0, -3.3], ROLE.input)] },
    ],
  }
}
