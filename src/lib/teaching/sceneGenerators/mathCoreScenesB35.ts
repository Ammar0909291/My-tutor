/**
 * Core mathematics figures — batch 35 of the mathematics visual campaign (2026-10-12): the discrete-mathematics helpers
 * (counting principles, permutations, combinations, combinatorics, recurrence relations, linear recurrences,
 * divide-and-conquer recurrences, propositional logic, algorithm complexity, complexity classes). `math.disc.binomial-theorem` is
 * registered to the Pascal's-triangle figure of its `math.alg` twin (batch 29): the same KG statement, the same figure.
 *
 * Same rules as batches 1-34: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every count, table entry and curve a figure states is re-derived by the test file from the DRAWN dots, lines,
 * numerals and curves (counts are counted from the drawing, tables are recomputed from first principles).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, type V3 } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
/** Maps graph coordinates (x, y) to the figure: screen = origin + (x · ux, y · uy). */
export type Frame = { ox: number; oy: number; ux: number; uy: number }
export const at = (f: Frame, x: number, y: number): Pt => [f.ox + x * f.ux, f.oy + y * f.uy]
const mapOf = (f: Frame) => (x: number, y: number): V3 => P(f.ox + x * f.ux, f.oy + y * f.uy)
const curveOf = (f: Frame, fn: (x: number) => number, x0: number, x1: number, color: string, n = 60): SceneObject => curve(sampleMapped(fn, x0, x1, mapOf(f), n), color)
const lineAt = (f: Frame, a: Pt, b: Pt, color: string, t = 0.04): SceneObject => ln(at(f, a[0], a[1]), at(f, b[0], b[1]), color, t)
const dotAt = (f: Frame, x: number, y: number, color: string, r = 0.14): SceneObject => dt(at(f, x, y), color, r)
/** An axis-aligned rectangle drawn as four lines. */
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]

// ── 1. Counting principles ───────────────────────────────────────────────────

/** Multiplication: 3 shirts × 2 pairs of trousers = 6 outfits (the 6 leaves of the tree). Addition: 4 bus routes or 3 train routes (exclusive) = 7 ways. */
export const CNT = {
  root: [-4.2, 0] as Pt, shirtX: -2.8, leafX: -1.2, shirtY: [1.7, 0, -1.7] as readonly number[], leafDy: 0.5,
  bus: { x0: 1.6, dx: 0.85, y: 0.8, n: 4 }, train: { x0: 1.6, dx: 0.85, y: -0.5, n: 3 },
}
export const cntLeaf = (shirt: number, pair: number): Pt => [CNT.leafX, CNT.shirtY[shirt] + (pair === 0 ? CNT.leafDy : -CNT.leafDy)]

/** KG: if one task can be done in m ways and an independent one in n ways, both together in m·n ways; mutually exclusive tasks add. */
export function buildCountingPrinciplesScene(): SceneSpec {
  return framed(raw_buildCountingPrinciplesScene())
}
function raw_buildCountingPrinciplesScene(): SceneSpec {
  const shirts = CNT.shirtY.map((y, i) => [ln(CNT.root, [CNT.shirtX, y], ROLE.reference, 0.04), dt([CNT.shirtX, y], ROLE.output, 0.14), lb(`S${'₁₂₃'[i]}`, [CNT.shirtX - 0.1, y + 0.4], ROLE.output)]).flat()
  const leaves = CNT.shirtY.flatMap((y, i) => [0, 1].flatMap((j) => [ln([CNT.shirtX, y], cntLeaf(i, j), ROLE.reference, 0.04), dt(cntLeaf(i, j), ROLE.input, 0.12)]))
  const nums = CNT.shirtY.flatMap((_, i) => [0, 1].map((j) => lb(String(2 * i + j + 1), [cntLeaf(i, j)[0] + 0.45, cntLeaf(i, j)[1]], ROLE.ink)))
  const routes = (c: { x0: number; dx: number; y: number; n: number }, color: string) => Array.from({ length: c.n }, (_, k) => dt([c.x0 + c.dx * k, c.y], color, 0.14))
  return {
    id: 'math-counting-principles',
    title: 'The multiplication and addition principles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the two counting principles. Multiplication: choosing a shirt (3 ways) AND then trousers (2 ways, whatever the shirt) gives 3 × 2 = 6 outfits — the tree has one leaf for every combination, 6 leaves. Addition: getting to town by bus (4 routes) OR by train (3 routes), where no route is both, gives 4 + 3 = 7 ways. "And" multiplies the numbers of ways, "or" (for mutually exclusive choices) adds them.',
    ariaLabel:
      'A tree diagram: a root at the left with three blue branches to three shirts S1, S2 and S3, each shirt with two red branches to two trousers choices, six red dots numbered 1 to 6. In the second step the caption 3 times 2 equals 6 outfits. In the third step, at the right, a row of 4 blue dots for bus routes and a row of 3 green dots for train routes, with the caption 4 plus 3 equals 7 ways.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Choose a shirt (3 ways: S₁, S₂, S₃), then trousers (2 ways for each shirt): every path from the root to a leaf is one outfit.', objects: [dt(CNT.root, ROLE.ink, 0.16), ...shirts, ...leaves] },
      { narration: 'The tree has 6 leaves — one for each combination: 3 × 2 = 6 outfits.', objects: [...nums, lb('3 × 2 = 6 outfits', [-2.8, -3.0], ROLE.input)] },
      { narration: 'Addition principle: 4 bus routes (blue) or 3 train routes (green) — no route is both — give 4 + 3 = 7 ways.', objects: [...routes(CNT.bus, ROLE.output), ...routes(CNT.train, ROLE.result), lb('bus', [CNT.bus.x0 + 1.3, CNT.bus.y + 0.55], ROLE.output), lb('train', [CNT.train.x0 + 0.85, CNT.train.y - 0.55], ROLE.result), lb('4 + 3 = 7 ways', [3.0, -1.7], ROLE.ink)] },
    ],
  }
}

// ── 2. Permutations ──────────────────────────────────────────────────────────

/** Ordered pairs of 4 distinct objects: first pick (column) and second pick (row), never the same object twice: P(4, 2) = 4 × 3 = 12 cells; (1, 2) and (2, 1) are different cells. */
export const PRM = { n: 4, x0: -3.6, y0: 1.6, dx: 0.9, dy: 0.85 }
export const prmCell = (first: number, second: number): Pt => [PRM.x0 + PRM.dx * (first - 1), PRM.y0 - PRM.dy * (second - 1)]

/** KG: P(n, r) = n!/(n − r)! counts ordered arrangements of r objects chosen from n. */
export function buildPermutationsScene(): SceneSpec {
  return framed(raw_buildPermutationsScene())
}
function raw_buildPermutationsScene(): SceneSpec {
  const cells: SceneObject[] = []
  for (let a = 1; a <= PRM.n; a++) for (let b = 1; b <= PRM.n; b++) if (a !== b) cells.push(dt(prmCell(a, b), ROLE.output, 0.13))
  const headers = Array.from({ length: PRM.n }, (_, i) => [lb(String(i + 1), [prmCell(i + 1, 1)[0], PRM.y0 + 0.7], ROLE.input), lb(String(i + 1), [PRM.x0 - 0.7, prmCell(1, i + 1)[1]], ROLE.result)]).flat()
  return {
    id: 'math-permutations',
    title: 'Permutations: ordered selections',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show permutations as ordered selections. Choose 2 of 4 distinct objects in order: any of 4 for the first pick (columns, red numbers) and then any of the 3 that are left for the second (rows, green numbers): the table has 4 × 3 = 12 filled cells (blue dots) and 4 empty cells on the diagonal (the same object twice is not allowed). The order matters: (1, 2) and (2, 1) are different cells, so P(4, 2) = 4!/(4 − 2)! = 24 ÷ 2 = 12.',
    ariaLabel:
      'A 4 by 4 table with the first pick 1 to 4 across the top in red and the second pick 1 to 4 down the left in green. In the first step twelve blue dots fill every cell except the four on the diagonal. In the second step a red dot and a green dot mark the cells for the pairs (1, 2) and (2, 1). In the third step the captions 4 times 3 equals 12 and 24 divided by 2 equals 12 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'First pick (columns) and second pick (rows) from 4 objects; the same object cannot be picked twice, so the 4 diagonal cells stay empty and 12 cells (blue) remain.', objects: [...headers, ...cells] },
      { narration: 'Order matters: the pair (1, 2) (red) and the pair (2, 1) (green) are two different cells.', objects: [dt(prmCell(1, 2), ROLE.input, 0.19), dt(prmCell(2, 1), ROLE.result, 0.19)] },
      { narration: 'Count them: 4 choices for the first, 3 for the second: 4 × 3 = 12 = P(4, 2) = 4!/2! = 24 ÷ 2.', objects: [lb('4 × 3 = 12', [2.0, 0.9], ROLE.output), lb('24 ÷ 2 = 12', [2.0, 0.0], ROLE.output), lb('P(4, 2) = 12', [2.0, -0.9], ROLE.ink)] },
    ],
  }
}

// ── 3. Combinations ──────────────────────────────────────────────────────────

/** C(5, 2) = 10: the segments joining 5 points are the unordered pairs; ordered pairs would give 5 × 4 = 20, each pair counted twice. */
export const CMB = { c: [-1.6, 0.1] as Pt, r: 2.0 }
export const cmbPoint = (k: number): Pt => { const a = ((90 - 72 * k) * Math.PI) / 180; return [CMB.c[0] + CMB.r * Math.cos(a), CMB.c[1] + CMB.r * Math.sin(a)] }
export const cmbPairs: ReadonlyArray<readonly [number, number]> = [0, 1, 2, 3, 4].flatMap((a) => [0, 1, 2, 3, 4].filter((b) => b > a).map((b) => [a, b] as const))

/** KG: C(n, r) = n!/(r!(n − r)!) counts unordered selections of r from n. */
export function buildCombinationsScene(): SceneSpec {
  return framed(raw_buildCombinationsScene())
}
function raw_buildCombinationsScene(): SceneSpec {
  const isEdge = (a: number, b: number) => b - a === 1 || (a === 0 && b === 4)
  const segs = (edge: boolean) => cmbPairs.filter(([a, b]) => isEdge(a, b) === edge).map(([a, b]) => ln(cmbPoint(a), cmbPoint(b), edge ? ROLE.output : ROLE.result, 0.04))
  const outward = (k: number): Pt => { const [x, y] = cmbPoint(k); return [CMB.c[0] + (x - CMB.c[0]) * 1.28, CMB.c[1] + (y - CMB.c[1]) * 1.28] }
  return {
    id: 'math-combinations',
    title: 'Combinations: unordered pairs',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show combinations as unordered selections. Choose 2 of 5 points: every segment joining two of the points is one selection, and the segment from 1 to 3 is the same as the one from 3 to 1 (order does not matter). The 5 sides of the pentagon (blue) and its 5 diagonals (green) make 10 segments, so C(5, 2) = 5!/(2! 3!) = 10. Counting ordered pairs instead gives 5 × 4 = 20, which counts every segment twice: C(5, 2) = 20 ÷ 2 = 10.',
    ariaLabel:
      'Five numbered points at the corners of a regular pentagon. In the second step the five sides are drawn in blue. In the third step the five diagonals are drawn in green, making ten segments, with the captions 5 times 4 equals 20 ordered pairs and 20 divided by 2 equals 10.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Five points, numbered 1 to 5. A selection of 2 of them is an unordered pair.', objects: [...[0, 1, 2, 3, 4].flatMap((k) => [dt(cmbPoint(k), ROLE.ink, 0.15), lb(String(k + 1), outward(k))])] },
      { narration: 'The 5 sides of the pentagon join 5 pairs of neighbours (blue).', objects: segs(true) },
      { narration: 'The 5 diagonals (green) join the other 5 pairs: 10 segments, one per pair. Ordered pairs would give 5 × 4 = 20 — each segment twice — so 20 ÷ 2 = 10.', objects: [...segs(false), lb('5 × 4 = 20', [3.0, 0.9], ROLE.input), lb('20 ÷ 2 = 10', [3.0, 0.0], ROLE.result), lb('C(5, 2) = 10', [3.0, -0.9], ROLE.ink)] },
    ],
  }
}

// ── 5. Combinatorics (a bijection with binary strings) ───────────────────────

/** Binary strings of length 3: 2 × 2 × 2 = 8 leaves; each corresponds to a subset of {1, 2, 3} (bit i = 1 ⇔ i ∈ the subset): 101 ↔ {1, 3}. */
export const BIN = { x0: -4.0, dx: 1.6, y0: 2.8, dy: 0.8, depth: 3, highlight: [1, 0, 1] as readonly number[] }
export const binY = (level: number, index: number): number => { const span = Math.pow(2, BIN.depth - level), first = (span - 1) / 2; return BIN.y0 - BIN.dy * (index * span + first) }
export const binPt = (level: number, index: number): Pt => [BIN.x0 + BIN.dx * level, binY(level, index)]

/** KG: combinatorial techniques include direct counting and bijections — here the sets of binary strings and of subsets correspond one-to-one. */
export function buildCombinatoricsScene(): SceneSpec {
  return framed(raw_buildCombinatoricsScene())
}
function raw_buildCombinatoricsScene(): SceneSpec {
  const edgesAt = (level: number): SceneObject[] => {
    const out: SceneObject[] = []
    for (let i = 0; i < Math.pow(2, level - 1); i++) for (const bit of [0, 1]) {
      const child = 2 * i + bit
      const a = binPt(level - 1, i), b = binPt(level, child)
      out.push(ln(a, b, ROLE.reference, 0.04), lb(String(bit), [(a[0] + b[0]) / 2 - 0.12, (a[1] + b[1]) / 2 + (bit === 0 ? 0.24 : -0.24)], ROLE.ink))
    }
    return out
  }
  const leaves = Array.from({ length: 8 }, (_, i) => dt(binPt(3, i), ROLE.output, 0.12))
  // the highlighted path 1, 0, 1: through the nodes at index 1, 2, 5
  const path: SceneObject[] = []
  let idx = 0
  for (let level = 1; level <= 3; level++) { const next = 2 * idx + BIN.highlight[level - 1]; path.push(ln(binPt(level - 1, idx), binPt(level, next), ROLE.result, 0.07)); idx = next }
  return {
    id: 'math-combinatorics',
    title: 'Counting by a bijection',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two of the basic counting techniques at once: direct counting and a bijection. Writing a binary string of length 3 means making 3 independent choices of 0 or 1: a tree with 2 branches at each of 3 levels, so 2 × 2 × 2 = 8 leaves — direct counting by the multiplication principle. Each string also describes a subset of {1, 2, 3}: put i in the subset exactly when the i-th bit is 1, so 101 ↔ {1, 3}. This is a bijection (every string gives one subset and every subset one string), so there are also 8 subsets: the two sets have the same size.',
    ariaLabel:
      'A binary tree growing to the right from a root, each branch labelled 0 for the upper and 1 for the lower. In the first step one level of two branches, in the second step two levels, in the third step three levels with eight blue dots at the leaves and a green highlighted path labelled 1, 0, 1, with the captions 2 times 2 times 2 equals 8 strings and 101 corresponds to the subset {1, 3}.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Build a binary string one bit at a time: the first bit is 0 (upper branch) or 1 (lower branch) — 2 choices.', objects: [dt(binPt(0, 0), ROLE.ink, 0.14), ...edgesAt(1)] },
      { narration: 'The second bit again has 2 choices from each node: now 2 × 2 = 4 paths.', objects: edgesAt(2) },
      { narration: 'Third bit: 2 × 2 × 2 = 8 leaves (blue) — 8 strings. The green path reads 1, 0, 1, i.e. the subset {1, 3}: strings and subsets correspond one-to-one, so there are 8 subsets as well.', objects: [...edgesAt(3), ...leaves, ...path, lb('2 × 2 × 2 = 8', [3.1, 1.2], ROLE.output), lb('101 ↔ {1, 3}', [3.1, 0.3], ROLE.result)] },
    ],
  }
}

// ── 6. Recurrence relation (Fibonacci stacked bars) ──────────────────────────

/** Fₙ = Fₙ₋₁ + Fₙ₋₂ with F₁ = F₂ = 1: each bar from F₃ on is stacked from a lower part as tall as the bar before it (Fₙ₋₁, blue) and an upper part as tall as the bar before that (Fₙ₋₂, green). */
export const FIB = { values: [1, 1, 2, 3, 5, 8, 13, 21] as readonly number[], x0: -3.6, dx: 1.0, scale: 0.16, base: -1.6, thick: 0.34 }
export const fibX = (n: number) => FIB.x0 + FIB.dx * (n - 1)
export const fibY = (v: number) => FIB.base + FIB.scale * v

/** KG: a recurrence defines aₙ from earlier terms; Fibonacci: Fₙ = Fₙ₋₁ + Fₙ₋₂. */
export function buildRecurrenceRelationScene(): SceneSpec {
  return framed(raw_buildRecurrenceRelationScene())
}
function raw_buildRecurrenceRelationScene(): SceneSpec {
  const bar = (n: number): SceneObject[] => {
    const v = FIB.values[n - 1], x = fibX(n)
    const segs: SceneObject[] = n <= 2 ? [ln([x, fibY(0)], [x, fibY(v)], ROLE.aid, FIB.thick)] : [ln([x, fibY(0)], [x, fibY(FIB.values[n - 2])], ROLE.output, FIB.thick), ln([x, fibY(FIB.values[n - 2])], [x, fibY(v)], ROLE.result, FIB.thick)]
    return [...segs, lb(String(v), [x, fibY(v) + 0.4]), lb(`F${'₁₂₃₄₅₆₇₈'[n - 1]}`, [x, fibY(0) - 0.4])]
  }
  return {
    id: 'math-recurrence-relation',
    title: 'A recurrence: the Fibonacci numbers',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a recurrence relation with the Fibonacci numbers. The sequence is defined by F₁ = F₂ = 1 and Fₙ = Fₙ₋₁ + Fₙ₋₂: each term is built from the two before it. In the bar chart each bar from F₃ on is stacked from two parts: the lower part (blue) is exactly as tall as the previous bar, Fₙ₋₁, and the upper part (green) as tall as the bar before that, Fₙ₋₂: for example 13 = 8 + 5 and 21 = 13 + 8. The terms 1, 1, 2, 3, 5, 8, 13, 21 grow roughly like a geometric sequence (each about 1.6 times the last).',
    ariaLabel:
      'A bar chart of the first eight Fibonacci numbers, 1, 1, 2, 3, 5, 8, 13 and 21, with the number above each bar and F1 to F8 below. The first two bars are violet; every later bar is split into a lower blue part as tall as the previous bar and an upper green part as tall as the bar before that. In the third step the captions F n equals F n minus 1 plus F n minus 2, 13 equals 8 plus 5 and 21 equals 13 plus 8 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'F₁ = F₂ = 1 (violet). From F₃ on each bar is the sum of the two before it: F₃ = 1 + 1 = 2, F₄ = 2 + 1 = 3, F₅ = 3 + 2 = 5 — the lower blue part equals the previous bar, the upper green part the bar before that.', objects: [ar([FIB.x0 - 0.7, FIB.base], [fibX(8) + 0.9, FIB.base]), ...[1, 2, 3, 4, 5].flatMap(bar)] },
      { narration: 'The pattern continues: F₆ = 5 + 3 = 8, F₇ = 8 + 5 = 13, F₈ = 13 + 8 = 21.', objects: [6, 7, 8].flatMap(bar) },
      { narration: 'In symbols Fₙ = Fₙ₋₁ + Fₙ₋₂: for instance 13 = 8 + 5 (the 13-bar is an 8-bar topped by a 5-bar) and 21 = 13 + 8.', objects: [lb('Fₙ = Fₙ₋₁ + Fₙ₋₂', [-2.0, 3.3], ROLE.ink), lb('lower part = Fₙ₋₁', [-2.0, 2.4], ROLE.output), lb('upper part = Fₙ₋₂', [-2.0, 1.5], ROLE.result), lb('13 = 8 + 5', [-2.0, 0.6], ROLE.ink), lb('21 = 13 + 8', [-2.0, -0.3], ROLE.ink)] },
    ],
  }
}

// ── 7. Linear recurrence ─────────────────────────────────────────────────────

/** aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1, a₁ = 5: characteristic r² − 5r + 6 = 0 has the roots 2 and 3, aₙ = 3·3ⁿ − 2·2ⁿ gives 1, 5, 19, 65, 211 (drawn on a log scale, almost a straight line of slope log₁₀ 3). */
export const LRC: Frame = { ox: 0.0, oy: -2.4, ux: 0.95, uy: 1.1 }
export const lrcTerm = (n: number) => 3 * Math.pow(3, n) - 2 * Math.pow(2, n)
export const lrcDot = (n: number): Pt => at(LRC, n, Math.log10(lrcTerm(n)))

/** KG: a linear recurrence aₙ = c₁aₙ₋₁ + … has a characteristic polynomial; distinct roots rᵢ give aₙ = ΣAᵢrᵢⁿ. */
export function buildLinearRecurrenceScene(): SceneSpec {
  return framed(raw_buildLinearRecurrenceScene())
}
function raw_buildLinearRecurrenceScene(): SceneSpec {
  const terms = [0, 1, 2, 3, 4]
  return {
    id: 'math-linear-recurrence',
    title: 'Solving a linear recurrence',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a linear recurrence is solved. aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1 and a₁ = 5 generates 1, 5, 19, 65, 211 (a₂ = 25 − 6, a₃ = 95 − 30, …). Trying aₙ = rⁿ gives the characteristic equation r² − 5r + 6 = 0, i.e. (r − 2)(r − 3) = 0, with the distinct roots r = 2 and r = 3, so aₙ = A·2ⁿ + B·3ⁿ; the starting values give A = −2 and B = 3, so aₙ = 3·3ⁿ − 2·2ⁿ. On a logarithmic scale the terms (blue dots) lie almost on a straight line of slope log₁₀ 3, because the larger root 3 soon dominates.',
    ariaLabel:
      'On the left the recurrence a n equals 5 a n minus 1 minus 6 a n minus 2, the characteristic equation r squared minus 5 r plus 6 equals 0, and its roots r equals 2 and 3. On the right a plot with a logarithmic vertical scale: five blue dots for n from 0 to 4 with the values 1, 5, 19, 65 and 211 climbing along a nearly straight line, and the closed form 3 times 3 to the n minus 2 times 2 to the n.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The recurrence aₙ = 5aₙ₋₁ − 6aₙ₋₂ with a₀ = 1, a₁ = 5 gives the terms 1, 5, 19, 65, 211 (blue dots, vertical axis on a log scale).', objects: [lb('aₙ = 5aₙ₋₁ − 6aₙ₋₂', [-2.6, 2.2], ROLE.ink), ar(at(LRC, -0.4, 0), at(LRC, 4.7, 0)), ar(at(LRC, 0, -0.1), at(LRC, 0, 2.6)), ...terms.map((n) => dt(lrcDot(n), ROLE.output, 0.13)), ...[0, 1, 2, 3, 4].map((n) => lb(String(n), [at(LRC, n, 0)[0], at(LRC, n, 0)[1] - 0.4])), ...terms.map((n) => lb(String(lrcTerm(n)), [lrcDot(n)[0] - 0.55, lrcDot(n)[1] + 0.3], ROLE.output))] },
      { narration: 'Try aₙ = rⁿ: r² − 5r + 6 = 0, i.e. (r − 2)(r − 3) = 0. The characteristic roots are r = 2 and r = 3.', objects: [lb('r² − 5r + 6 = 0', [-2.6, 1.3], ROLE.aid), lb('roots 2 and 3', [-2.6, 0.4], ROLE.aid)] },
      { narration: 'So aₙ = A·2ⁿ + B·3ⁿ; a₀ = 1 and a₁ = 5 give A = −2, B = 3: aₙ = 3·3ⁿ − 2·2ⁿ. The dots lie almost on a line of slope log₁₀ 3 (green), since 3ⁿ dominates.', objects: [lineAtLog(), lb('aₙ = 3·3ⁿ − 2·2ⁿ', [-2.6, -0.5], ROLE.result)] },
    ],
  }
}
/** The straight line of slope log₁₀ 3 through the first dot of the 3·3ⁿ part (log₁₀(3·3ⁿ) = log₁₀ 3 + n log₁₀ 3). */
function lineAtLog(): SceneObject { return lineAt(LRC, [0, Math.log10(3)], [4.4, Math.log10(3) * 5.4], ROLE.result, 0.03) }

// ── 8. Divide-and-conquer recurrence ─────────────────────────────────────────

/** T(n) = 2T(n/2) + n for n = 8: the recursion tree has levels of 1, 2, 4, 8 nodes of sizes 8, 4, 2, 1; every level costs 8, there are log₂8 + 1 = 4 levels, total 32. */
export const DCQ = { levels: [8, 4, 2, 1] as readonly number[], y: [2.4, 1.2, 0.0, -1.2] as readonly number[], dx: 0.7, costX: 4.0 }
/** x of node `index` on `level`: the centre of the leaves it covers (leaf i sits at (i − 3.5)·dx). */
export const dcqX = (level: number, index: number): number => { const span = Math.pow(2, 3 - level); return (index * span + (span - 1) / 2 - 3.5) * DCQ.dx }
export const dcqPt = (level: number, index: number): Pt => [dcqX(level, index), DCQ.y[level]]

/** KG: T(n) = aT(n/b) + f(n); here a = b = 2 and f(n) = n (merge sort). */
export function buildDivideConquerRecurrenceScene(): SceneSpec {
  return framed(raw_buildDivideConquerRecurrenceScene())
}
function raw_buildDivideConquerRecurrenceScene(): SceneSpec {
  const level = (k: number): SceneObject[] => Array.from({ length: Math.pow(2, k) }, (_, i) => lb(String(DCQ.levels[k]), dcqPt(k, i), k === 0 ? ROLE.ink : ROLE.output))
  const links = (k: number): SceneObject[] => Array.from({ length: Math.pow(2, k) }, (_, i) => [0, 1].map((b) => { const p = dcqPt(k, i), q = dcqPt(k + 1, 2 * i + b), d = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / d, uy = (q[1] - p[1]) / d; return ln([p[0] + 0.3 * ux, p[1] + 0.3 * uy], [q[0] - 0.3 * ux, q[1] - 0.3 * uy], ROLE.reference, 0.03) })).flat()
  return {
    id: 'math-divide-conquer-recurrence',
    title: 'A divide-and-conquer recursion tree',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the recursion tree of T(n) = 2T(n/2) + n for n = 8 (merge sort): a problem of size 8 is split into 2 problems of size 4, each into 2 of size 2, each into 2 of size 1; the numbers are the sizes. The work to merge at a node of size m is m, so every level costs the same: 1 × 8 = 8, 2 × 4 = 8, 4 × 2 = 8, 8 × 1 = 8. There are log₂ 8 + 1 = 4 levels, total 4 × 8 = 32 = n log₂ n + n — the pattern the Master Theorem generalises (case f(n) = n^(log_b a)).',
    ariaLabel:
      'A tree of numbers, top to bottom: one 8, two 4s, four 2s and eight 1s, each linked to the two numbers below. At the right of each level a blue caption gives the cost of that level: 1 times 8 equals 8, 2 times 4 equals 8, 4 times 2 equals 8 and 8 times 1 equals 8. The caption T of n equals 2 T of n over 2 plus n and the total 4 times 8 equals 32 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'T(n) = 2T(n/2) + n with n = 8: split the problem of size 8 into 2 of size 4 (the numbers are the problem sizes), then each into 2 of size 2.', objects: [...level(0), ...level(1), ...links(0), ...level(2), ...links(1), lb('T(n) = 2T(n/2) + n', [-3.0, 2.4], ROLE.ink)] },
      { narration: 'Split once more: 8 problems of size 1.', objects: [...level(3), ...links(2)] },
      { narration: 'Each level costs the same, n = 8: 1 × 8, 2 × 4, 4 × 2, 8 × 1. With log₂ 8 + 1 = 4 levels the total is 4 × 8 = 32.', objects: [...DCQ.levels.map((m, k) => lb(`${Math.pow(2, k)} × ${m} = 8`, [DCQ.costX, DCQ.y[k]], ROLE.output)), lb('4 × 8 = 32', [DCQ.costX, -2.4], ROLE.result)] },
    ],
  }
}

// ── 9. Propositional logic (De Morgan truth table) ───────────────────────────

/** ¬(p ∧ q) and ¬p ∨ ¬q have the same truth value in every row: De Morgan's law. */
export const TTB = { cols: [-3.3, -1.7, 0.4, 3.0] as readonly number[], rows: [1.5, 0.7, -0.1, -0.9] as readonly number[], headY: 2.5 }
export const ttbRows: ReadonlyArray<readonly [boolean, boolean]> = [[true, true], [true, false], [false, true], [false, false]]
export const ttbValue = (col: number, p: boolean, q: boolean): boolean => (col === 0 ? p : col === 1 ? q : col === 2 ? !(p && q) : !p || !q)

/** KG: logical connectives and their truth-functional properties; two formulas with the same truth table are equivalent. */
export function buildPropositionalLogicScene(): SceneSpec {
  return framed(raw_buildPropositionalLogicScene())
}
function raw_buildPropositionalLogicScene(): SceneSpec {
  const tv = (v: boolean): [string, string] => (v ? ['T', ROLE.result] : ['F', ROLE.input])
  const column = (c: number): SceneObject[] => ttbRows.map(([p, q], r) => { const [t, color] = tv(ttbValue(c, p, q)); return lb(t, [TTB.cols[c], TTB.rows[r]], color) })
  return {
    id: 'math-propositional-logic',
    title: 'De Morgan’s law by a truth table',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a truth table proves that two formulas are equivalent. The first two columns list every combination of truth values of p and q (T = true green, F = false red). The third column evaluates ¬(p ∧ q): p ∧ q is true only in the first row, so its negation is F, T, T, T. The fourth evaluates ¬p ∨ ¬q: it is true as soon as one of p, q is false, so F, T, T, T as well. The two columns agree in all four rows, so ¬(p ∧ q) ≡ ¬p ∨ ¬q — De Morgan’s law, which is why, for example, a NAND gate can also be built from inverted inputs.',
    ariaLabel:
      'A truth table with four rows. In the first step the columns p and q list the four combinations T T, T F, F T and F F, with T in green and F in red. In the second step a third column, not (p and q), with F, T, T, T. In the third step a fourth column, not p or not q, also F, T, T, T, and the caption the columns are equal in every row, so the formulas are equivalent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Every combination of truth values of p and q: 4 rows (T green, F red).', objects: [lb('p', [TTB.cols[0], TTB.headY]), lb('q', [TTB.cols[1], TTB.headY]), ...column(0), ...column(1)] },
      { narration: 'p ∧ q is true only when both are true, so ¬(p ∧ q) is F, T, T, T.', objects: [lb('¬(p ∧ q)', [TTB.cols[2], TTB.headY], ROLE.output), ...column(2)] },
      { narration: '¬p ∨ ¬q is true whenever at least one of p, q is false: F, T, T, T — the same column. The formulas are equivalent in every row.', objects: [lb('¬p ∨ ¬q', [TTB.cols[3], TTB.headY], ROLE.aid), ...column(3), lb('equal in every row', [(TTB.cols[2] + TTB.cols[3]) / 2, -2.0], ROLE.result)] },
    ],
  }
}

// ── 10. Algorithm complexity (growth curves) ─────────────────────────────────

/** n, n log₂ n, n², 2ⁿ: at n = 6 they are 6, 15.5, 36 and 64; 2ⁿ = n² at n = 2 (4) and n = 4 (16) and overtakes n² for good after n = 4. */
export const CPX: Frame & { yMax: number } = { ox: -3.8, oy: -2.4, ux: 0.8, uy: 0.05, yMax: 64 }
export const cpxFns: Record<'n' | 'nlogn' | 'n2' | 'exp', (n: number) => number> = { n: (n) => n, nlogn: (n) => n * Math.log2(n), n2: (n) => n * n, exp: (n) => Math.pow(2, n) }
/** The largest n (on a 0.1 grid from 1) for which a curve stays within the plot window. */
export const cpxN1 = (fn: (n: number) => number) => { let n = 1; while (n < 8 && fn(Math.round((n + 0.1) * 10) / 10) <= CPX.yMax) n = Math.round((n + 0.1) * 10) / 10; return n }

/** KG: the common complexities O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) order algorithms by growth rate. */
export function buildAlgorithmComplexityScene(): SceneSpec {
  return framed(raw_buildAlgorithmComplexityScene())
}
function raw_buildAlgorithmComplexityScene(): SceneSpec {
  const cv = (key: keyof typeof cpxFns, color: string): SceneObject => { const n1 = cpxN1(cpxFns[key]); const N = Math.round((n1 - 1) * 10); return curveOf(CPX, cpxFns[key], 1, n1, color, Math.max(N, 8)) }
  const end = (key: keyof typeof cpxFns): Pt => { const n1 = cpxN1(cpxFns[key]); return at(CPX, n1, cpxFns[key](n1)) }
  return {
    id: 'math-algorithm-complexity',
    title: 'How running time grows',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how common time complexities grow with the input size n. For n up to 8 the curves for n (grey), n log₂ n (blue), n² (green) and 2ⁿ (red) start close together but separate quickly. At n = 6 the operation counts are 6, 15.5, 36 and 64, in that order. The exponential 2ⁿ touches n² at n = 2 (both 4), dips below it, meets it again at n = 4 (both 16) and then races ahead (2⁶ = 64 already equals 8²), which is why exponential-time algorithms are impractical beyond tiny inputs, while n log n scales almost like n.',
    ariaLabel:
      'A coordinate plane with n along the bottom and the number of operations up the side. In the first step a grey straight line for n and a blue slightly curved line for n log n. In the second step a green parabola n squared and a red steeply rising curve 2 to the n, which meets the parabola at n equals 4. In the third step a vertical guide at n equals 6 with four dots at the values 6, 15.5, 36 and 64.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Operations versus input size n: the linear curve n (grey) and n log₂ n (blue), which grows only a little faster.', objects: [ar(at(CPX, 0.4, 0), at(CPX, 8.4, 0)), ar(at(CPX, 0.4, 0), at(CPX, 0.4, 68)), cv('n', ROLE.reference), cv('nlogn', ROLE.output), lb('n', [end('n')[0] + 0.3, end('n')[1]]), lb('n log n', [end('nlogn')[0] + 0.7, end('nlogn')[1] + 0.1], ROLE.output)] },
      { narration: 'n² (green) grows faster still, and 2ⁿ (red) meets it at n = 4 (both 16) — after a first touch at n = 2 — and then shoots up.', objects: [cv('n2', ROLE.result), cv('exp', ROLE.input), lb('n²', [end('n2')[0] + 0.3, end('n2')[1] - 0.25], ROLE.result), lb('2ⁿ', [end('exp')[0] + 0.1, end('exp')[1] + 0.45], ROLE.input)] },
      { narration: 'Read off n = 6: 6, 15.5 (= 6 log₂ 6), 36 and 64 operations — each class several times the one before.', objects: [lineAt(CPX, [6, 0], [6, 64], ROLE.aid, 0.025), ...(['n', 'nlogn', 'n2', 'exp'] as const).map((k, i) => dotAt(CPX, 6, cpxFns[k](6), [ROLE.reference, ROLE.output, ROLE.result, ROLE.input][i], 0.12)), lb('at n = 6: 6, 15.5, 36, 64', [-0.4, -3.1], ROLE.ink)] },
    ],
  }
}

// ── 11. Complexity classes ───────────────────────────────────────────────────

/** If P ≠ NP: P and the NP-complete problems are two disjoint regions inside NP. */
export const CLS = {
  np: { c: [0, 0] as Pt, rx: 4.8, ry: 3.4 },
  p: { c: [-2.2, 0] as Pt, rx: 1.5, ry: 1.3 },
  npc: { c: [2.3, -0.1] as Pt, rx: 1.9, ry: 1.5 },
}
export const clsOutline = (e: { c: Pt; rx: number; ry: number }) => Array.from({ length: 73 }, (_, k) => pp([e.c[0] + e.rx * Math.cos((2 * Math.PI * k) / 72), e.c[1] + e.ry * Math.sin((2 * Math.PI * k) / 72)] as Pt))

/** KG: P is solvable in polynomial time, NP verifiable in polynomial time, NP-complete = the hardest problems of NP; whether P = NP is open. */
export function buildComplexityClassesScene(): SceneSpec {
  return framed(raw_buildComplexityClassesScene())
}
function raw_buildComplexityClassesScene(): SceneSpec {
  return {
    id: 'math-complexity-classes',
    title: 'The complexity classes P, NP and NP-complete',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the classes P, NP and NP-complete relate (under the usual assumption P ≠ NP). P (green) holds the problems that can be SOLVED in polynomial time, such as sorting. NP (blue) holds the problems whose answers can be CHECKED in polynomial time; it contains all of P, because anything solvable quickly can also be checked quickly. The NP-complete problems (red), such as SAT, 3-colouring and the travelling salesman decision problem, are the hardest in NP: every problem in NP reduces to them, so a polynomial-time algorithm for any one of them would put all of NP into P. Whether P = NP is the most famous open problem in computer science.',
    ariaLabel:
      'A large blue oval labelled NP containing two smaller ovals that do not overlap: a green oval on the left labelled P with the word sorting, and a red oval on the right labelled NP-complete with the words SAT, 3-colouring and TSP. In the third step the caption P equals NP question mark appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'NP: the problems whose solutions can be verified in polynomial time (blue region).', objects: [curve(clsOutline(CLS.np), ROLE.output), lb('NP', [0, 2.4], ROLE.output)] },
      { narration: 'P (green): problems that can be solved in polynomial time, e.g. sorting. P lies inside NP — anything solvable quickly can be checked quickly.', objects: [curve(clsOutline(CLS.p), ROLE.result), lb('P', [CLS.p.c[0], CLS.p.c[1] + 0.7], ROLE.result), lb('sorting', [CLS.p.c[0], CLS.p.c[1] - 0.2], ROLE.result)] },
      { narration: 'NP-complete (red): the hardest problems in NP — SAT, 3-colouring, the travelling salesman problem. If P ≠ NP they lie outside P. Whether P = NP is open.', objects: [curve(clsOutline(CLS.npc), ROLE.input), lb('NP-complete', [CLS.npc.c[0], CLS.npc.c[1] + 2.05], ROLE.input), lb('SAT', [CLS.npc.c[0], CLS.npc.c[1] + 0.8], ROLE.input), lb('3-colouring', [CLS.npc.c[0], CLS.npc.c[1] - 0.05], ROLE.input), lb('TSP', [CLS.npc.c[0], CLS.npc.c[1] - 0.9], ROLE.input), lb('P = NP ?', [0, -2.4], ROLE.aid)] },
    ],
  }
}

