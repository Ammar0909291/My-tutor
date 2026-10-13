/**
 * Core mathematics figures — batch 26 of the mathematics visual campaign (2026-10-12): the rest of the
 * foundations — partial and total orders, functions as sets of pairs, cardinality, countable and
 * uncountable sets, the natural numbers, ordinals, induction (ordinary and strong), truth tables and
 * logical equivalence.
 *
 * Same rules as batches 1-25: one visual language from visualDesign.ts, labels are names not sentences
 * (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5, at most 50
 * objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a label left to
 * right and compares labels that share a last token before "="), and every fact a figure states (order
 * axioms, one-value-per-row, bijections, the diagonal construction, truth values, equivalences) is
 * re-derived by the test file from the DRAWN coordinates and labels.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts } from './mathSceneKit'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 24): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const link = (a: Pt, b: Pt, color: string, r = 0.2): SceneObject => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]), d: Pt = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; return arrow(P(a[0] + d[0] * r, a[1] + d[1] * r), P(b[0] - d[0] * r, b[1] - d[1] * r), color) }
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

// ── 1. Partial order ─────────────────────────────────────────────────────────

/** Divisibility on {1, 2, 3, 4, 6, 12} drawn as a Hasse diagram (an edge joins an element to the next one up it divides). */
export const PRO = { el: [1, 2, 3, 4, 6, 12] as readonly number[], pos: { 1: [0, -3.2], 2: [-1.6, -1.6], 3: [1.6, -1.6], 4: [-3.2, 0], 6: [0, 0], 12: [-1.6, 1.6] } as Record<number, Pt>, edges: [[1, 2], [1, 3], [2, 4], [2, 6], [3, 6], [4, 12], [6, 12]] as ReadonlyArray<readonly [number, number]> }
/** the reflexive-transitive closure of the Hasse edges: a ≤ b */
export const leqFromEdges = (el: readonly number[], edges: ReadonlyArray<readonly [number, number]>): ((a: number, b: number) => boolean) => {
  const reach = new Map<number, Set<number>>(el.map((e) => [e, new Set([e])]))
  for (let pass = 0; pass < el.length; pass++) for (const [a, b] of edges) for (const x of el) if (reach.get(x)!.has(a)) reach.get(x)!.add(b)
  return (a, b) => reach.get(a)!.has(b)
}

/** KG: a partial order is reflexive, antisymmetric and transitive; some pairs may be incomparable. */
export function buildPartialOrderScene(): SceneSpec {
  return framed(raw_buildPartialOrderScene())
}
function raw_buildPartialOrderScene(): SceneSpec {
  const { el, pos, edges } = PRO
  return {
    id: 'math-partial-order',
    title: 'A partial order: divisibility',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a partial order: the relation “a divides b” on {1, 2, 3, 4, 6, 12}. It is reflexive (a | a), antisymmetric (a | b and b | a only if a = b) and transitive (a | b and b | c give a | c). A Hasse diagram draws only the “covering” steps, with larger elements higher; a | b exactly when you can climb from a to b along edges. Some pairs are COMPARABLE (2 divides 12, along the path 2–4–12) but others are INCOMPARABLE: neither 2 | 3 nor 3 | 2. That is what makes the order partial and not total.',
    ariaLabel:
      'A Hasse diagram: 1 at the bottom, 2 and 3 above it, 4 above 2, 6 above both 2 and 3, and 12 at the top above 4 and 6, joined by grey lines. In the second step a green path 2, 4, 12 climbs from 2 to 12, captioned 2 divides 12. In the third step the dots 2 and 3, which lie side by side with no upward path between them, turn red, captioned incomparable.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The elements 1, 2, 3, 4, 6, 12 ordered by divisibility. Each line joins an element to the next one above that it divides (1 | 2, 1 | 3, 2 | 4, 2 | 6, 3 | 6, 4 | 12, 6 | 12); longer relations like 1 | 12 follow by climbing.', objects: [...edges.map(([a, b]) => ln(pos[a], pos[b], ROLE.reference, 0.04)), ...el.map((e) => dt(pos[e], ROLE.ink, 0.15)), ...el.map((e) => lb(String(e), [pos[e][0] + 0.5, pos[e][1] + 0.1])), lb('divisibility', [2.6, 1.8], ROLE.output)] },
      { narration: '2 and 12 are comparable: climbing 2 → 4 → 12 (green) shows 2 | 12. Whenever two elements are connected by an upward path, the lower divides the higher (transitivity).', objects: [ln(pos[2], pos[4], ROLE.result, 0.09), ln(pos[4], pos[12], ROLE.result, 0.09), ...[2, 4, 12].map((e) => dt(pos[e], ROLE.result, 0.2)), lb('2 | 12', [-3.2, 1.8], ROLE.result)] },
      { narration: '2 and 3 are INCOMPARABLE: there is no upward path from either to the other (2 does not divide 3 and 3 does not divide 2). A partial order allows such pairs; if every pair were comparable it would be a total order.', objects: [...[2, 3].map((e) => dt(pos[e], ROLE.input, 0.2)), lb('incomparable', [0, -2.5], ROLE.input)] },
    ],
  }
}

// ── 2. Total order ───────────────────────────────────────────────────────────

/** Comparability tables: ≤ on {1…5} (every pair comparable: a TOTAL order) and divisibility on {2, 3, 4, 5, 6} (gaps: only a PARTIAL order). */
export const TOT = { cx: [-2.8, 2.8] as readonly number[], cy: 0.0, d: 0.55, left: [1, 2, 3, 4, 5] as readonly number[], right: [2, 3, 4, 5, 6] as readonly number[] }
export const totCell = (panel: number, i: number, j: number): Pt => [TOT.cx[panel] + (j - 2) * TOT.d, TOT.cy + (2 - i) * TOT.d]
export const comparableLeq = (a: number, b: number) => a <= b || b <= a
export const comparableDiv = (a: number, b: number) => a % b === 0 || b % a === 0

/** KG: a total order is a partial order in which every two elements are comparable. */
export function buildTotalOrderScene(): SceneSpec {
  return framed(raw_buildTotalOrderScene())
}
function raw_buildTotalOrderScene(): SceneSpec {
  const panel = (p: number, el: readonly number[], comp: (a: number, b: number) => boolean, color: string): SceneObject[] => [
    ...el.map((e, i) => lb(String(e), [totCell(p, i, -1)[0] - 0.0, totCell(p, i, 0)[1]])),
    ...el.map((e, j) => lb(String(e), [totCell(p, 0, j)[0], totCell(p, 0, 0)[1] + 0.55])),
    ...el.flatMap((a, i) => el.map((b, j) => (comp(a, b) ? dt(totCell(p, i, j), color, 0.14) : ringAt(totCell(p, i, j), 0.11, ROLE.reference, 16)))),
  ]
  return {
    id: 'math-total-order',
    title: 'A total order: every pair is comparable',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the difference between a total and a partial order with comparability tables (a filled dot at (a, b) means a and b are comparable: a ≤ b or b ≤ a). For ≤ on {1, 2, 3, 4, 5} every cell is filled — any two numbers are comparable, so ≤ is a TOTAL (linear) order and the elements can be lined up in a single chain. For divisibility on {2, 3, 4, 5, 6} many cells are empty (2 and 3, 3 and 4, 4 and 5 …): divisibility is only a PARTIAL order. Trichotomy — exactly one of a < b, a = b, a > b — holds in a total order.',
    ariaLabel:
      'Two five by five tables of dots. Left, the numbers 1 to 5 down the side and across the top: every one of the 25 cells holds a green dot, captioned total order. Right, the numbers 2 to 6: only the diagonal and the cells for the pairs 2 and 4, 2 and 6, 3 and 6 (and their mirror images) hold red dots while the other 14 cells are empty grey rings, captioned partial order.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Is every pair of numbers from {1, …, 5} comparable under ≤? Yes: for any two, one is less than or equal to the other. So all 25 cells of the table are filled (green): ≤ is a total order.', objects: [...panel(0, TOT.left, comparableLeq, ROLE.result), lb('total order', [TOT.cx[0], -1.9], ROLE.result)] },
      { narration: 'Now compare under divisibility on {2, 3, 4, 5, 6}: 2 and 4 are comparable (2 | 4), 2 and 6, 3 and 6 too, but 2 and 3, 3 and 4, 4 and 5, 4 and 6 and others are not — they appear as empty rings. Some pairs are incomparable, so this order is only partial.', objects: [...panel(1, TOT.right, comparableDiv, ROLE.input), lb('partial order', [TOT.cx[1], -1.9], ROLE.input)] },
      { narration: 'In a total order any two elements a, b satisfy exactly one of a < b, a = b, a > b (trichotomy), so the whole set lines up as a single chain; in a partial order only some pairs can be ranked against each other.', objects: [lb('one chain', [TOT.cx[0], 2.5], ROLE.output), lb('gaps', [TOT.cx[1], 2.5], ROLE.input)] },
    ],
  }
}

// ── 3. A function as a set of pairs ──────────────────────────────────────────

/** f = {(1, b), (2, a), (3, a)}: exactly one pair in every row; R = {(1, a), (1, c), (3, b)} has two in row 1 and none in row 2. */
export const FST = { cx: [-2.6, 2.6] as readonly number[], d: 0.9, A: ['1', '2', '3'] as readonly string[], B: ['a', 'b', 'c'] as readonly string[], f: [[0, 1], [1, 0], [2, 0]] as ReadonlyArray<readonly [number, number]>, R: [[0, 0], [0, 2], [2, 1]] as ReadonlyArray<readonly [number, number]> }
export const fstCell = (panel: number, i: number, j: number): Pt => [FST.cx[panel] + (j - 1) * FST.d, 0.9 - i * FST.d]
export const isFunctionRel = (pairs: ReadonlyArray<readonly [number, number]>, n: number) => Array.from({ length: n }, (_, i) => pairs.filter((p) => p[0] === i).length).every((c) => c === 1)

/** KG: a function f: A → B is a relation f ⊆ A × B in which every a ∈ A is paired with exactly one b ∈ B. */
export function buildSetTheoreticFunctionScene(): SceneSpec {
  return framed(raw_buildSetTheoreticFunctionScene())
}
function raw_buildSetTheoreticFunctionScene(): SceneSpec {
  const { A, B, f, R } = FST
  const grid = (p: number, pairs: ReadonlyArray<readonly [number, number]>, color: string): SceneObject[] => [
    ...A.map((a, i) => lb(a, [FST.cx[p] - 1.0 * FST.d - 0.55, fstCell(p, i, 0)[1]])), ...B.map((b, j) => lb(b, [fstCell(p, 0, j)[0], 1.9])),
    ...A.flatMap((_, i) => B.map((_, j) => (pairs.some(([x, y]) => x === i && y === j) ? dt(fstCell(p, i, j), color, 0.18) : ringAt(fstCell(p, i, j), 0.12, ROLE.reference, 16)))),
  ]
  const rowMarks = (p: number, pairs: ReadonlyArray<readonly [number, number]>): SceneObject[] => A.map((_, i) => { const c = pairs.filter((q) => q[0] === i).length; return lb(String(c), [FST.cx[p] + 1.9, fstCell(p, i, 0)[1]], c === 1 ? ROLE.result : ROLE.input) })
  return {
    id: 'math-set-theoretic-function',
    title: 'A function is a relation with one value per input',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the set-theoretic definition: a function f from A = {1, 2, 3} to B = {a, b, c} is a SET OF ORDERED PAIRS f ⊆ A × B such that every a ∈ A appears as the first entry of EXACTLY ONE pair. As marked cells of the grid A × B: f = {(1, b), (2, a), (3, a)} has exactly one mark in every row (the counts 1, 1, 1) — a function (two inputs may share a value, 2 and 3 both go to a). The relation R = {(1, a), (1, c), (3, b)} has two marks in row 1 and none in row 2 (counts 2, 0, 1), so it is not a function.',
    ariaLabel:
      'Two three by three grids with rows 1, 2, 3 and columns a, b, c. Left: green dots at row 1 column b, row 2 column a, row 3 column a, one in each row, with the count 1 beside every row, captioned function. Right: red dots at row 1 columns a and c and at row 3 column b, so row 1 has two, row 2 has none, with counts 2, 0 and 1, captioned not a function.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Grid of all pairs A × B (rows = inputs 1, 2, 3, columns = outputs a, b, c). f = {(1, b), (2, a), (3, a)}: one marked cell in each row (green).', objects: [...grid(0, f, ROLE.result)] },
      { narration: 'The row counts are 1, 1, 1: every input has exactly one output. (Different inputs may share an output — 2 and 3 both go to a — but one input cannot have two.) So f is a function.', objects: [...rowMarks(0, f), lb('function', [FST.cx[0], -1.2], ROLE.result)] },
      { narration: 'Compare R = {(1, a), (1, c), (3, b)}: row 1 has TWO marks and row 2 has NONE (counts 2, 0, 1). An input with two outputs or with no output breaks the definition, so R is only a relation, not a function.', objects: [...grid(1, R, ROLE.input), ...rowMarks(1, R), lb('not a function', [FST.cx[1], -1.2], ROLE.input)] },
    ],
  }
}

// ── 4. Cardinality ───────────────────────────────────────────────────────────

/** Same size = a bijection: {a, b, c} ↔ {1, 2, 3}; ℕ ↔ the even numbers by n ↦ 2n; and a set is smaller than its power set (3 < 2³ = 8). */
export const CRD = { fin: { ax: -4.0, bx: -2.4, ys: [1.8, 1.0, 0.2] as readonly number[] }, inf: { ax: -0.2, bx: 1.6, ys: [2.2, 1.5, 0.8, 0.1, -0.6] as readonly number[] }, bars: { ox: 3.3, oy: -1.6, w: 0.5, scale: 0.3 } }
export const crdFinA = (i: number): Pt => [CRD.fin.ax, CRD.fin.ys[i]]
export const crdFinB = (i: number): Pt => [CRD.fin.bx, CRD.fin.ys[i]]
export const crdInfA = (i: number): Pt => [CRD.inf.ax, CRD.inf.ys[i]]
export const crdInfB = (i: number): Pt => [CRD.inf.bx, CRD.inf.ys[i]]

/** KG: |A| = |B| iff there is a bijection A → B; |A| < |P(A)|. */
export function buildCardinalityScene(): SceneSpec {
  return framed(raw_buildCardinalityScene())
}
function raw_buildCardinalityScene(): SceneSpec {
  const { bars } = CRD
  return {
    id: 'math-cardinality',
    title: 'Cardinality: same size means a bijection',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that two sets have the same cardinality exactly when their elements can be paired off one-to-one with none left over (a bijection). For finite sets this is counting: {a, b, c} and {1, 2, 3} are paired a ↔ 1, b ↔ 2, c ↔ 3. It also works for infinite sets in a surprising way: n ↦ 2n pairs EVERY natural number 0, 1, 2, 3, 4, … with an even number 0, 2, 4, 6, 8, …, so the natural numbers and the even numbers have the same cardinality although the evens are only part of the naturals. Not all infinities (or finite sizes) coincide: a set is always strictly smaller than its power set, 3 < 2³ = 8.',
    ariaLabel:
      'Left: three letters a, b, c in a column joined by three blue arrows to the numbers 1, 2, 3 in a second column. Middle, second step: a column of the numbers 0 to 4 and a column of the even numbers 0, 2, 4, 6, 8 joined by five green arrows, with dots after them for more, captioned n goes to 2n. Right, third step: two bars, a short blue one of height 3 and a tall red one of height 8, captioned the set and its power set.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Finite sets: {a, b, c} and {1, 2, 3} pair off perfectly (blue arrows): a ↔ 1, b ↔ 2, c ↔ 3 — each element used exactly once, so both have 3 elements. A bijection is what “same number of elements” means.', objects: [...[0, 1, 2].map((i) => dt(crdFinA(i), ROLE.ink, 0.12)), ...[0, 1, 2].map((i) => dt(crdFinB(i), ROLE.ink, 0.12)), ...[0, 1, 2].map((i) => lb('abc'[i], [crdFinA(i)[0] - 0.4, crdFinA(i)[1]])), ...[0, 1, 2].map((i) => lb(String(i + 1), [crdFinB(i)[0] + 0.4, crdFinB(i)[1]])), ...[0, 1, 2].map((i) => link(crdFinA(i), crdFinB(i), ROLE.output, 0.2))] },
      { narration: 'Infinite sets: n ↦ 2n sends 0, 1, 2, 3, 4, … to 0, 2, 4, 6, 8, … It is one-to-one and every even number is hit, so ℕ and the set of even numbers have the SAME cardinality — even though the evens are a proper part of ℕ. (An infinite set is exactly one that can be matched with a proper part of itself.)', objects: [...[0, 1, 2, 3, 4].map((i) => dt(crdInfA(i), ROLE.ink, 0.1)), ...[0, 1, 2, 3, 4].map((i) => dt(crdInfB(i), ROLE.ink, 0.1)), ...[0, 1, 2, 3, 4].map((i) => lb(String(i), [crdInfA(i)[0] - 0.4, crdInfA(i)[1]])), ...[0, 1, 2, 3, 4].map((i) => lb(String(2 * i), [crdInfB(i)[0] + 0.45, crdInfB(i)[1]])), ...[0, 1, 2, 3, 4].map((i) => link(crdInfA(i), crdInfB(i), ROLE.result, 0.2)), lb('n ↦ 2n', [(CRD.inf.ax + CRD.inf.bx) / 2, -1.5], ROLE.result)] },
      { narration: 'Sizes can differ: for A = {a, b, c} the power set P(A) has 2³ = 8 elements (red) against 3 (blue); Cantor proved that no set, finite or infinite, can be matched with its power set, so there are infinitely many different sizes of infinity.', objects: [ln([bars.ox, bars.oy], [bars.ox, bars.oy + 3 * bars.scale * 2.0], ROLE.output, 0.2), ln([bars.ox + 1.0, bars.oy], [bars.ox + 1.0, bars.oy + 8 * bars.scale * 2.0], ROLE.input, 0.2), lb('3', [bars.ox, bars.oy - 0.4], ROLE.output), lb('8', [bars.ox + 1.0, bars.oy - 0.4], ROLE.input), lb('|A| < |P(A)|', [bars.ox + 0.5, bars.oy + 8 * bars.scale * 2.0 + 0.6], ROLE.ink)] },
    ],
  }
}

// ── 5. Countable sets: the rationals ─────────────────────────────────────────

/** The grid of fractions p/q (column p, row q, 1 ≤ p, q ≤ 5) is swept along the diagonals p + q = 2, 3, 4, …, skipping repeats; every positive rational is reached. */
export const CNT = { ox: -2.0, oy: 2.0, d: 1.0, n: 5 }
export const cntCell = (p: number, q: number): Pt => [CNT.ox + (p - 1) * CNT.d, CNT.oy - (q - 1) * CNT.d]
/** the zig-zag order of cells (p, q) up to p + q = n + 1 */
export const zigzag = (n: number): Array<[number, number]> => { const out: Array<[number, number]> = []; for (let s = 2; s <= n + 1; s++) { const cells: Array<[number, number]> = []; for (let p = 1; p <= s - 1; p++) cells.push([p, s - p]); if (s % 2 === 0) cells.reverse(); out.push(...cells) } return out }

/** KG: a set is countable if it can be listed as a sequence (a bijection with a subset of ℕ). */
export function buildCountableSetScene(): SceneSpec {
  return framed(raw_buildCountableSetScene())
}
function raw_buildCountableSetScene(): SceneSpec {
  const { n } = CNT, order = zigzag(n)
  const all = Array.from({ length: n }, (_, p) => Array.from({ length: n }, (_, q) => [p + 1, q + 1] as [number, number])).flat()
  let k = 0
  const numbered = order.map(([p, q]) => (gcd(p, q) === 1 ? ++k : 0))
  return {
    id: 'math-countable-set',
    title: 'Countable sets: listing the rationals',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the positive rational numbers are countable, i.e. can be arranged in a list 1st, 2nd, 3rd, …. Put the fraction p/q in column p and row q of an infinite grid; every positive rational appears. Sweep the grid along the diagonals p + q = 2, 3, 4, … (blue zig-zag) so that every cell is reached after finitely many steps, and number the cells in the order met, skipping fractions already counted in lowest terms (2/2, 4/2, 3/3, 2/4 … are red). This pairs every positive rational with exactly one natural number: ℚ⁺ is countable, the same size as ℕ.',
    ariaLabel:
      'A five by five grid of grey dots with the columns numbered 1 to 5 as numerators and the rows 1 to 5 as denominators. In the second step a blue broken line snakes through the grid diagonal by diagonal, starting at the top left cell, then down and across the next diagonal, back the other way along the next, and so on. In the third step the cells that are in lowest terms get the numbers 1 to 11 in the order visited, while the cells that repeat an earlier value, such as 2 over 2 and 4 over 2, are circled in red and not numbered.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The fraction p/q sits in column p, row q of the grid (p = numerator along the top, q = denominator down the side). Every positive rational number occurs somewhere in the grid, many of them several times (1/1 = 2/2 = 3/3, 1/2 = 2/4, …).', objects: [...all.map(([p, q]) => dt(cntCell(p, q), ROLE.ink, 0.1)), ...Array.from({ length: n }, (_, i) => lb(String(i + 1), [cntCell(i + 1, 1)[0], CNT.oy + 0.6])), ...Array.from({ length: n }, (_, i) => lb(String(i + 1), [CNT.ox - 0.6, cntCell(1, i + 1)[1]])), lb('p', [CNT.ox + 2 * CNT.d, CNT.oy + 1.2], ROLE.output), lb('q', [CNT.ox - 1.3, CNT.oy - 2 * CNT.d], ROLE.output)] },
      { narration: 'Walk the diagonals p + q = 2, 3, 4, …, alternating direction (blue). Each diagonal is finite, so every cell is reached after finitely many steps — there is no “first infinite row” to get stuck in.', objects: order.slice(0, -1).map((c, i) => ln(cntCell(c[0], c[1]), cntCell(order[i + 1][0], order[i + 1][1]), ROLE.output, 0.04)) },
      { narration: 'Number the cells in the order visited but skip any fraction not in lowest terms (red rings): 1/1 is number 1, 1/2 is 2, 2/1 is 3, 3/1 is 4, 1/3 is 5, … Every positive rational gets exactly one number, so ℚ⁺ ↔ ℕ is a bijection and ℚ⁺ is countable.', objects: [...order.map((c, i) => (numbered[i] ? lb(String(numbered[i]), [cntCell(c[0], c[1])[0] + 0.28, cntCell(c[0], c[1])[1] + 0.28], ROLE.result) : ringAt(cntCell(c[0], c[1]), 0.2, ROLE.input, 20))), lb('ℚ⁺ is countable', [0, -3.5], ROLE.result)] },
    ],
  }
}

// ── 6. Uncountable sets: the diagonal argument ───────────────────────────────

/** A supposed list of five binary sequences; flipping the diagonal gives a sequence differing from every row. */
export const UCN = { rows: [[0, 1, 0, 1, 1], [1, 1, 0, 0, 1], [0, 0, 1, 0, 0], [1, 0, 1, 1, 0], [0, 1, 1, 1, 0]] as ReadonlyArray<readonly number[]>, ox: -2.0, oy: 2.4, d: 1.0, dy: 0.8, dRow: -2.2 }
export const ucnDigit = (i: number, j: number): Pt => [UCN.ox + j * UCN.d, UCN.oy - i * UCN.dy]
export const diagonalFlip = (rows: ReadonlyArray<readonly number[]>) => rows.map((r, i) => 1 - r[i])

/** KG: ℝ (equivalently the infinite binary sequences) is uncountable: no list contains every sequence. */
export function buildUncountableSetScene(): SceneSpec {
  return framed(raw_buildUncountableSetScene())
}
function raw_buildUncountableSetScene(): SceneSpec {
  const { rows, ox, d } = UCN, flip = diagonalFlip(rows)
  return {
    id: 'math-uncountable-set',
    title: 'Cantor’s diagonal argument',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show why the set of all infinite binary sequences (and so the real numbers) is uncountable. Suppose it WERE countable and the sequences were written as a list r₁, r₂, r₃, … (a few digits of the first five shown). Build a new sequence d by looking down the diagonal (the 1st digit of r₁, the 2nd digit of r₂, …) and flipping each: here the diagonal is 0, 1, 1, 1, 0 so d = 1, 0, 0, 0, 1. Then d differs from r₁ in the first place, from r₂ in the second, and so on — it differs from every row, so d is not on the list. Every attempted list misses a sequence: no list is complete.',
    ariaLabel:
      'A five by five table of zeros and ones, one row per supposed list entry r1 to r5. In the second step the diagonal digits, the first of row 1, the second of row 2 and so on, are circled in violet. In the third step a new row of red digits underneath, labelled d, is the circled digits flipped, 1 0 0 0 1, and a caption says d differs from every row.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Suppose all infinite binary sequences could be listed as r₁, r₂, r₃, … Here are the first five digits of the first five rows.', objects: [...rows.flatMap((r, i) => r.map((v, j) => lb(String(v), ucnDigit(i, j)))), ...rows.map((_, i) => lb(`r${'₁₂₃₄₅'[i]}`, [ox - 1.3, ucnDigit(i, 0)[1]], ROLE.output))] },
      { narration: 'Look down the diagonal: the 1st digit of r₁ (0), the 2nd digit of r₂ (1), the 3rd of r₃ (1), the 4th of r₄ (1), the 5th of r₅ (0) — circled in violet.', objects: rows.map((_, i) => curve(Array.from({ length: 25 }, (_, k) => { const a = (2 * Math.PI * k) / 24; return P(ucnDigit(i, i)[0] + 0.5 * Math.cos(a), ucnDigit(i, i)[1] + 0.3 * Math.sin(a)) }), ROLE.aid)) },
      { narration: 'Flip every diagonal digit to make d = 1, 0, 0, 0, 1 (red). d differs from r₁ in position 1, from r₂ in position 2, from every rᵢ in position i — so d is not in the list. The list was not complete, whatever it was: the binary sequences (and the reals) are uncountable.', objects: [...flip.map((v, j) => lb(String(v), [ox + j * d, UCN.dRow], ROLE.input)), lb('d', [ox - 1.3, UCN.dRow], ROLE.input), ln([ox - 0.5, UCN.dRow + 0.55], [ox + 4.5, UCN.dRow + 0.55], ROLE.reference, 0.02), lb('d differs from every row', [ox + 2.0, UCN.dRow - 0.8], ROLE.input)] },
    ],
  }
}

// ── 7. The natural numbers ───────────────────────────────────────────────────

/** 0, 1, 2, … each followed by its successor S; addition as repeated successor (2 + 3 = 5); every set containing 0 and closed under S is all of ℕ. */
export const NNM = { x0: -4.0, dx: 1.15, y: 0.0, n: 8 }
export const nnmAt = (k: number): Pt => [NNM.x0 + NNM.dx * k, NNM.y]

/** KG: the natural numbers: 0, the successor function, and induction (Peano's axioms). */
export function buildNaturalNumbersScene(): SceneSpec {
  return framed(raw_buildNaturalNumbersScene())
}
function raw_buildNaturalNumbersScene(): SceneSpec {
  const { n } = NNM, ks = Array.from({ length: n }, (_, i) => i)
  return {
    id: 'math-natural-numbers',
    title: 'The natural numbers: 0 and the successor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the natural numbers as built by Peano’s axioms: there is a first number 0 (it is not the successor of anything), and every number n has a successor S(n) = n + 1 (blue arrows), different numbers having different successors. Addition is repeated successor: 2 + 3 means take the successor of 2 three times, landing on 5. The principle of induction says: any set that contains 0 and contains S(n) whenever it contains n must contain every natural number — all the dots turn green.',
    ariaLabel:
      'A row of eight dots labelled 0 to 7 with a small blue arrow labelled S from each dot to the next, the first dot 0 marked as having nothing before it. In the second step three green arcs hop from 2 to 3, 3 to 4 and 4 to 5, captioned 2 plus 3 equals 5. In the third step every dot turns green, captioned induction: 0 is in, and n in implies S of n in, so all are in.',
    stage: NO_STAGE,
    steps: [
      { narration: 'ℕ = {0, 1, 2, 3, …}: a first element 0, and for every n a next element S(n) = n + 1 (the successor, blue arrows). 0 is nobody’s successor, and different numbers have different successors.', objects: [...ks.map((k) => dt(nnmAt(k), ROLE.ink, 0.13)), ...ks.map((k) => lb(String(k), [nnmAt(k)[0], nnmAt(k)[1] - 0.55])), ...ks.slice(0, -1).map((k) => link(nnmAt(k), nnmAt(k + 1), ROLE.output, 0.2)), ...ks.slice(0, -1).map((k) => lb('S', [(nnmAt(k)[0] + nnmAt(k + 1)[0]) / 2, nnmAt(k)[1] + 0.4], ROLE.output)), lb('first', [nnmAt(0)[0], nnmAt(0)[1] + 0.95], ROLE.result)] },
      { narration: 'Addition is repeated successor: 2 + 3 means start at 2 and apply S three times (green arcs): 2 → 3 → 4 → 5. So 2 + 3 = 5; multiplication is repeated addition.', objects: [...[2, 3, 4].map((k) => curve(arcPts((nnmAt(k)[0] + nnmAt(k + 1)[0]) / 2, nnmAt(k)[1], NNM.dx / 2, 0, 180, 10), ROLE.result)), ...[2, 5].map((k) => dt(nnmAt(k), ROLE.result, 0.2)), lb('2 + 3 = 5', [(nnmAt(2)[0] + nnmAt(5)[0]) / 2, -1.9], ROLE.result)] },
      { narration: 'Induction: if a set contains 0, and contains S(n) whenever it contains n, then it contains every natural number — starting at 0 and following the arrows reaches each dot. All the dots join the set (green).', objects: [...ks.map((k) => dt(nnmAt(k), ROLE.result, 0.16)), lb('induction', [nnmAt(3)[0] + 0.6, 1.9], ROLE.result)] },
    ],
  }
}

// ── 8. Ordinal numbers ───────────────────────────────────────────────────────

/** 0, 1, 2, … pile up toward the first infinite ordinal ω, which is followed by ω + 1, ω + 2, …. */
export const ORD = { x0: -4.4, span: 4.8, nFinite: 8, succ: [1.2, 2.4, 3.6] as readonly number[], omegaX: 0.4, y: 0.0 }
export const ordFinite = (n: number): Pt => [ORD.x0 + ORD.span * (1 - Math.pow(0.5, n)), ORD.y]
/** the limit point of the finite ordinals, and the ordinals ω + k */
export const ordOmega = (): Pt => [ORD.x0 + ORD.span, ORD.y]
export const ordSucc = (k: number): Pt => [ORD.x0 + ORD.span + 1.2 * k, ORD.y]

/** KG: ordinals extend the counting numbers past infinity: 0, 1, 2, …, ω, ω + 1, …. */
export function buildOrdinalNumberScene(): SceneSpec {
  return framed(raw_buildOrdinalNumberScene())
}
function raw_buildOrdinalNumberScene(): SceneSpec {
  const { nFinite } = ORD, ks = Array.from({ length: nFinite }, (_, i) => i)
  return {
    id: 'math-ordinal-number',
    title: 'Ordinal numbers: counting past infinity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show ordinals as positions in a well-ordered list. The finite ordinals 0, 1, 2, 3, … come one after another, crowding together (each gap half the last) towards a limit that none of them reaches. The first position AFTER all of them is the first infinite ordinal ω (a ring: it is a LIMIT ordinal, with no immediate predecessor). Counting does not stop there: ω + 1, ω + 2, ω + 3, … follow, each a successor of the previous one, and beyond them ω·2, ω², … Every nonempty set of ordinals has a least element, which is what “well-ordered” means.',
    ariaLabel:
      'A horizontal line with dots at 0, 1, 2, 3 and then more and more tightly crowded dots piling up toward a point on the right. In the second step a green ring at that limit point is labelled omega, with nothing just before it. In the third step three more blue dots to the right of omega are labelled omega plus 1, omega plus 2 and omega plus 3, captioned successors.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The finite ordinals 0, 1, 2, 3, 4, … Each is the next position in the order; here they are drawn crowding toward a point on the right — they never reach it.', objects: [ln([ORD.x0 - 0.3, ORD.y], [ordSucc(3)[0] + 0.6, ORD.y], ROLE.reference, 0.03), ...ks.map((k) => dt(ordFinite(k), ROLE.ink, 0.1)), ...[0, 1, 2, 3].map((k) => lb(String(k), [ordFinite(k)[0], ORD.y - 0.5]))] },
      { narration: 'The first position after ALL the finite ordinals is ω (green ring). It is a limit ordinal: there is no ω − 1 just before it, because every finite ordinal is still infinitely far below. ω is the smallest infinite ordinal.', objects: [ringAt(ordOmega(), 0.2, ROLE.result, 24), lb('ω', [ordOmega()[0], ORD.y - 0.55], ROLE.result), lb('limit', [ordOmega()[0], ORD.y + 0.7], ROLE.result)] },
      { narration: 'Counting continues past ω: ω + 1, ω + 2, ω + 3, … are successors, each the next of the previous one. Every ordinal is either 0, a successor, or a limit; ω·2, ω², ω^ω and more lie beyond.', objects: [...[1, 2, 3].map((k) => dt(ordSucc(k), ROLE.output, 0.12)), ...[1, 2, 3].map((k) => lb(`ω+${k}`, [ordSucc(k)[0], ORD.y - 0.55], ROLE.output)), lb('successors', [ordSucc(2)[0], ORD.y + 0.7], ROLE.output)] },
    ],
  }
}

// ── 9. Mathematical induction ────────────────────────────────────────────────

/** Eight dominoes: the base case knocks over the first, the inductive step says each knocks over the next, so all fall. */
export const IND = { x0: -3.9, dx: 1.1, h: 1.4, w: 0.35, y: -0.8, n: 8 }
export const indBox = (k: number): { x0: number; x1: number; y0: number; y1: number } => ({ x0: IND.x0 + IND.dx * k - IND.w / 2, x1: IND.x0 + IND.dx * k + IND.w / 2, y0: IND.y, y1: IND.y + IND.h })

/** KG: to prove P(n) for all n ≥ 1, prove P(1) and P(n) ⟹ P(n + 1). */
export function buildProofByInductionScene(): SceneSpec {
  return framed(raw_buildProofByInductionScene())
}
function raw_buildProofByInductionScene(): SceneSpec {
  const { n } = IND, ks = Array.from({ length: n }, (_, i) => i)
  const dom = (k: number, color: string, t: number): SceneObject[] => { const b = indBox(k); return rect(b.x0, b.y0, b.x1, b.y1, color, t) }
  return {
    id: 'math-proof-by-induction',
    title: 'Mathematical induction: the dominoes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how induction proves a statement P(n) for every n = 1, 2, 3, …. Think of a row of dominoes, one for each n; domino n falling means P(n) is true. (1) BASE CASE: P(1) is true — the first domino falls (green). (2) INDUCTIVE STEP: for every n, if P(n) is true then P(n + 1) is true — each domino, when it falls, knocks over the next (arrows). Together they give P(n) for ALL n: domino 1 falls, so 2 falls, so 3 falls, … every domino falls (all green). Skipping either part fails: no first push, or a gap between two dominoes, and the chain stops.',
    ariaLabel:
      'A row of eight upright grey dominoes numbered 1 to 8. In the first step the first domino turns green, labelled P of 1 true. In the second step a blue arrow runs from each domino to the next, labelled P of n implies P of n plus 1. In the third step all eight dominoes turn green, captioned P of n for every n.',
    stage: NO_STAGE,
    steps: [
      { narration: 'One domino for each n = 1, 2, 3, … (a domino falls when P(n) is true). BASE CASE: P(1) is true — the first domino is pushed over (green).', objects: [...ks.flatMap((k) => dom(k, ROLE.reference, 0.04)), ...ks.map((k) => lb(String(k + 1), [indBox(k).x0 + IND.w / 2, IND.y - 0.5])), ...dom(0, ROLE.result, 0.09), lb('P(1) true', [indBox(0).x0 + 0.6, IND.y + IND.h + 0.6], ROLE.result)] },
      { narration: 'INDUCTIVE STEP: whenever domino n falls it knocks over domino n + 1 — the arrows say P(n) ⟹ P(n + 1) for every n. This is proved for a general n, once and for all, not checked one n at a time.', objects: [...ks.slice(0, -1).map((k) => arrow(P(indBox(k).x1 + 0.0, IND.y + IND.h + 0.35), P(indBox(k + 1).x0, IND.y + IND.h + 0.35), ROLE.output)), lb('P(n) ⟹ P(n + 1)', [0, IND.y + IND.h + 1.2], ROLE.output)] },
      { narration: 'Together: domino 1 falls; since each knocks over the next, 2 falls, then 3, and so on — every domino falls (all green). P(n) holds for every n ≥ 1. Both parts are needed: without the base case nothing starts, without the step the chain can break.', objects: [...ks.slice(1).flatMap((k) => dom(k, ROLE.result, 0.09)), lb('P(n) for every n', [0, IND.y - 1.4], ROLE.result)] },
    ],
  }
}

// ── 10. Strong induction ─────────────────────────────────────────────────────

/** Every integer n ≥ 2 is a product of primes: 60 = 6 × 10 with 6 and 10 smaller, hence (by the strong hypothesis) products of primes: 6 = 2 × 3, 10 = 2 × 5. */
export const SIN = { nodes: { 60: [0, 3.0], 6: [-2.2, 1.2], 10: [2.2, 1.2], 'a2': [-3.2, -0.8], 'a3': [-1.2, -0.8], 'b2': [1.2, -0.8], 'b5': [3.2, -0.8] } as Record<string, Pt>,
  edges: [['60', '6'], ['60', '10'], ['6', 'a2'], ['6', 'a3'], ['10', 'b2'], ['10', 'b5']] as ReadonlyArray<readonly [string, string]> }
export const sinValue = (key: string) => Number(key.replace(/^[ab]/, ''))
export const isPrimeN = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }

/** KG: strong induction assumes P(k) for ALL k < n (not just n − 1) to prove P(n). */
export function buildStrongInductionScene(): SceneSpec {
  return framed(raw_buildStrongInductionScene())
}
function raw_buildStrongInductionScene(): SceneSpec {
  const { nodes, edges } = SIN, id = (k: string) => String(sinValue(k))
  const node = (k: string, color: string): SceneObject[] => [dt(nodes[k], color, 0.16), lb(id(k), [nodes[k][0] + 0.55, nodes[k][1] + 0.1], color)]
  return {
    id: 'math-strong-induction',
    title: 'Strong induction: every number is a product of primes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show strong induction on the claim “every integer n ≥ 2 is a product of primes”. Take n = 60 and assume the claim for ALL smaller numbers (not just 59). Since 60 = 6 × 10 is composite, both factors are smaller than 60 and ≥ 2, so by the strong hypothesis each is a product of primes: 6 = 2 × 3 and 10 = 2 × 5. Putting them together, 60 = 2 · 2 · 3 · 5, a product of primes — the factor tree has prime leaves (green). If n is itself prime there is nothing to prove, so the claim holds for n whenever it holds for all k < n, which proves it for every n.',
    ariaLabel:
      'A factor tree. At the top the number 60 with two lines down to 6 and 10. In the second step the 6 splits into 2 and 3 and the 10 into 2 and 5, so the tree has four leaves in a row. In the third step the four leaves 2, 3, 2, 5 turn green, and the caption says 2 times 2 times 3 times 5 equals 60.',
    stage: NO_STAGE,
    steps: [
      { narration: 'n = 60 is composite, 60 = 6 × 10, and both factors are smaller than 60 (and at least 2). Strong hypothesis: the claim is already known for every number below 60, so 6 and 10 are products of primes.', objects: [...edges.slice(0, 2).map(([a, b]) => ln(nodes[a], nodes[b], ROLE.reference, 0.04)), ...node('60', ROLE.ink), ...node('6', ROLE.output), ...node('10', ROLE.output), lb('assume for all k < 60', [0, 4.2], ROLE.aid)] },
      { narration: 'Apply the hypothesis again: 6 = 2 × 3 and 10 = 2 × 5, with factors smaller than 6 and 10 respectively.', objects: [...edges.slice(2).map(([a, b]) => ln(nodes[a], nodes[b], ROLE.reference, 0.04)), ...node('a2', ROLE.ink), ...node('a3', ROLE.ink), ...node('b2', ROLE.ink), ...node('b5', ROLE.ink)] },
      { narration: 'The leaves 2, 3, 2, 5 are prime (green), so 60 = 2 · 2 · 3 · 5 is a product of primes. For ANY n: if it is prime we are done, otherwise n = a × b with 2 ≤ a, b < n, and the strong hypothesis covers both. So the claim is true for every n ≥ 2.', objects: [...['a2', 'a3', 'b2', 'b5'].map((k) => dt(nodes[k], ROLE.result, 0.22)), lb('2 · 2 · 3 · 5 = 60', [0, -2.4], ROLE.result)] },
    ],
  }
}

// ── 11. Truth tables ─────────────────────────────────────────────────────────

/** The four rows (p, q) = TT, TF, FT, FF with the columns p ∧ q, p ∨ q and p ⇒ q. */
export const TRT = { xs: [-3.4, -1.7, 0.2, 2.0, 3.8] as readonly number[], head: 2.0, ys: [1.0, 0.2, -0.6, -1.4] as readonly number[], rows: [[true, true], [true, false], [false, true], [false, false]] as ReadonlyArray<readonly [boolean, boolean]> }
export const trtCell = (col: number, row: number): Pt => [TRT.xs[col], TRT.ys[row]]
export const tf = (v: boolean) => (v ? 'T' : 'F')
export const TRT_OPS: ReadonlyArray<{ name: string; f: (p: boolean, q: boolean) => boolean }> = [{ name: 'p∧q', f: (p, q) => p && q }, { name: 'p∨q', f: (p, q) => p || q }, { name: 'p⇒q', f: (p, q) => !p || q }]

/** KG: a truth table lists the truth value of a compound statement for every combination of truth values of its parts. */
export function buildTruthTableScene(): SceneSpec {
  return framed(raw_buildTruthTableScene())
}
function raw_buildTruthTableScene(): SceneSpec {
  const col = (c: number, name: string, vals: boolean[], color: string): SceneObject[] => [lb(name, [TRT.xs[c], TRT.head], ROLE.ink), ...vals.map((v, r) => lb(tf(v), trtCell(c, r), v ? ROLE.result : color))]
  return {
    id: 'math-truth-table',
    title: 'Truth tables',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show truth tables. Two statements p and q can be true (T) or false (F) in 2 × 2 = 4 ways (the four rows TT, TF, FT, FF). A truth table lists, for each way, the value of a compound statement: p ∧ q (“and”) is true only when both are true; p ∨ q (“or”) is true when at least one is true; p ⇒ q (“if p then q”) is false only when p is true and q false (a promise is broken only if the premise holds and the conclusion fails).',
    ariaLabel:
      'A table with columns p, q, p and q, p or q, and p implies q and four rows. The first two columns list T T, T F, F T, F F. In the second step the column for p and q reads T F F F and the column for p or q reads T T T F. In the third step the column for p implies q reads T F T T. True values are green, false values red.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two statements p and q can each be True or False: 4 combinations, the four rows (TT, TF, FT, FF).', objects: [...col(0, 'p', TRT.rows.map((r) => r[0]), ROLE.input), ...col(1, 'q', TRT.rows.map((r) => r[1]), ROLE.input), ln([-4.3, TRT.head - 0.45], [4.6, TRT.head - 0.45], ROLE.reference, 0.02)] },
      { narration: 'p ∧ q (“p and q”) is true only in the row where BOTH are true: T F F F. p ∨ q (“p or q”, inclusive) is false only when both are false: T T T F.', objects: [...col(2, TRT_OPS[0].name, TRT.rows.map((r) => TRT_OPS[0].f(r[0], r[1])), ROLE.input), ...col(3, TRT_OPS[1].name, TRT.rows.map((r) => TRT_OPS[1].f(r[0], r[1])), ROLE.input)] },
      { narration: 'p ⇒ q (“if p then q”) is false only in the row where p is true and q is false (T, F): T F T T. When p is false the implication is true whatever q is — a promise that is never put to the test cannot be broken.', objects: col(4, TRT_OPS[2].name, TRT.rows.map((r) => TRT_OPS[2].f(r[0], r[1])), ROLE.input) },
    ],
  }
}

// ── 12. Logical equivalence ──────────────────────────────────────────────────

/** De Morgan: ¬(p ∧ q) has the same truth values as ¬p ∨ ¬q (equivalent), but not the same as p ∧ q. */
export const LEQ = { xs: [-3.5, -2.0, -0.2, 2.0, 3.8] as readonly number[], head: 2.0, ys: [1.0, 0.2, -0.6, -1.4] as readonly number[], rows: [[true, true], [true, false], [false, true], [false, false]] as ReadonlyArray<readonly [boolean, boolean]> }
export const leqCell = (col: number, row: number): Pt => [LEQ.xs[col], LEQ.ys[row]]
export const LEQ_COLS: ReadonlyArray<{ name: string; f: (p: boolean, q: boolean) => boolean }> = [{ name: '¬(p∧q)', f: (p, q) => !(p && q) }, { name: '¬p∨¬q', f: (p, q) => !p || !q }, { name: 'p∧q', f: (p, q) => p && q }]

/** KG: two statements are logically equivalent when they have the same truth value in every row of the truth table. */
export function buildLogicalEquivalenceScene(): SceneSpec {
  return framed(raw_buildLogicalEquivalenceScene())
}
function raw_buildLogicalEquivalenceScene(): SceneSpec {
  const col = (c: number, k: number): SceneObject[] => [lb(LEQ_COLS[k].name, [LEQ.xs[c], LEQ.head]), ...LEQ.rows.map((r, i) => lb(tf(LEQ_COLS[k].f(r[0], r[1])), leqCell(c, i), LEQ_COLS[k].f(r[0], r[1]) ? ROLE.result : ROLE.input))]
  const base: SceneObject[] = [lb('p', [LEQ.xs[0], LEQ.head]), lb('q', [LEQ.xs[1], LEQ.head]), ...LEQ.rows.flatMap((r, i) => [lb(tf(r[0]), leqCell(0, i), r[0] ? ROLE.result : ROLE.input), lb(tf(r[1]), leqCell(1, i), r[1] ? ROLE.result : ROLE.input)]), ln([-4.3, LEQ.head - 0.45], [4.6, LEQ.head - 0.45], ROLE.reference, 0.02)]
  return {
    id: 'math-logical-equivalence',
    title: 'Logical equivalence: De Morgan',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show logical equivalence with a truth table. Two statements are LOGICALLY EQUIVALENT when they have the same truth value in every row. Compare ¬(p ∧ q) (“not both”) with ¬p ∨ ¬q (“at least one is false”): both give F T T T in the four rows TT, TF, FT, FF, so ¬(p ∧ q) ≡ ¬p ∨ ¬q — De Morgan’s law. By contrast ¬(p ∧ q) and p ∧ q give opposite values in EVERY row (T F F F against F T T T), so they are far from equivalent.',
    ariaLabel:
      'A truth table. The first two columns p and q list T T, T F, F T, F F. A third column for not p-and-q reads F T T T and a fourth column for not-p or not-q reads F T T T, the two enclosed in a green frame labelled equivalent. In the third step a fifth column for p and q reads T F F F, each entry the opposite of the third column, marked in red as not equivalent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The statement ¬(p ∧ q) (“not both p and q”) is false only when p and q are both true: F T T T.', objects: [...base, ...col(2, 0)] },
      { narration: 'Now ¬p ∨ ¬q (“p is false or q is false”): F T T T again — the same value in every row. Two statements with identical truth-table columns are logically equivalent: ¬(p ∧ q) ≡ ¬p ∨ ¬q (De Morgan).', objects: [...col(3, 1), ...rect(LEQ.xs[2] - 0.8, -1.9, LEQ.xs[3] + 0.8, 1.55, ROLE.result, 0.04), lb('equivalent', [(LEQ.xs[2] + LEQ.xs[3]) / 2, -2.4], ROLE.result)] },
      { narration: 'Compare p ∧ q: T F F F — the OPPOSITE of ¬(p ∧ q) in every row, so these two are never equal: not equivalent (in fact each is the negation of the other).', objects: [...col(4, 2), ...rect(LEQ.xs[4] - 0.7, -1.9, LEQ.xs[4] + 0.7, 1.55, ROLE.input, 0.04), lb('not equivalent', [LEQ.xs[4] - 0.3, -2.4], ROLE.input)] },
    ],
  }
}
