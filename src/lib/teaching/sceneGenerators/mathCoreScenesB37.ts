/**
 * Core mathematics figures — batch 37 of the mathematics visual campaign (2026-10-12): the probability helpers (sample space,
 * classical probability, combinatorial probability, independence, random variables, expected value, Markov's inequality,
 * transition matrices, the Poisson process). `math.prob.bayesian-inference` is registered to the figure of its `math.stats`
 * twin (batch 34): the same KG statement, the same figure.
 *
 * Same rules as batches 1-36: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every count, probability and bar a figure states is re-derived by the test file from the DRAWN dots, lines and
 * numerals (outcomes are counted from the drawing, probabilities recomputed from first principles).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, shadeConvex } from './mathSceneKit'
import { matrix, mAt, type MSpec } from './mathCoreScenesB32'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
/** An axis-aligned rectangle drawn as four lines. */
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]

// ── 1. Sample space ──────────────────────────────────────────────────────────

/** Three kinds of Ω: two coin flips (4 outcomes), the number of flips until the first head (1, 2, 3, … without end), a random point of [0, 1]. */
export const SSP = {
  box: { x0: -4.5, y0: -1.5, x1: -1.7, y1: 1.7 },
  outcomes: [['HH', -3.8, 0.6], ['HT', -2.4, 0.6], ['TH', -3.8, -0.6], ['TT', -2.4, -0.6]] as ReadonlyArray<readonly [string, number, number]>,
  col: { x: 0.2, ys: [1.7, 1.08, 0.46, -0.16, -0.78, -1.4] as readonly number[], tailTo: -2.25 },
  seg: { x: 3.5, y0: -1.5, y1: 1.7, pt: 0.3 },
  capY: 2.45, capY2: -2.85, capX: [-3.1, 0.2, 3.5] as readonly number[],
}

/** KG: the set Ω of all possible outcomes of a random experiment — finite, countably infinite or uncountable. */
export function buildSampleSpaceScene(): SceneSpec {
  return framed(raw_buildSampleSpaceScene())
}
function raw_buildSampleSpaceScene(): SceneSpec {
  const { box, outcomes, col, seg, capY, capY2, capX } = SSP
  return {
    id: 'math-sample-space',
    title: 'Sample space: all possible outcomes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the sample space Ω as the set of ALL possible outcomes, in the three sizes it can have. Two coin flips: Ω = {HH, HT, TH, TT}, finite, 4 outcomes = 2 × 2. Flip until the first head: Ω = {1, 2, 3, …}, countably infinite. A random point of the interval [0, 1]: uncountable, no list can reach every outcome.',
    ariaLabel:
      'Three panels from left to right. First, a box holding four dots labelled HH, HT, TH, TT, captioned finite with 4 outcomes. Second, a column of six numbered dots 1 to 6 with an arrow running on downward beyond the last dot, captioned countable with 1, 2, 3 and so on. Third, a vertical blue segment from 0 to 1 with a dot on it, captioned uncountable, the interval 0 to 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Flip a coin twice. The sample space Ω is the set of all possible outcomes: HH, HT, TH, TT — four outcomes, 2 × 2. This Ω is finite.', objects: [...rect(box.x0, box.y0, box.x1, box.y1, ROLE.reference), ...outcomes.flatMap(([t, x, y]) => [dt([x, y], ROLE.output, 0.12), lb(t, [x, y + 0.42], ROLE.output)]), lb('finite', [capX[0], capY], ROLE.output), lb('4 outcomes', [capX[0], capY2], ROLE.output)] },
      { narration: 'Flip until the first head and record the number of flips: Ω = {1, 2, 3, …}. It has no last outcome, yet its outcomes can be listed one after another: countably infinite.', objects: [...col.ys.flatMap((y, k) => [dt([col.x, y], ROLE.input, 0.12), lb(String(k + 1), [col.x + 0.5, y], ROLE.input)]), ar([col.x, col.ys[col.ys.length - 1] - 0.3], [col.x, col.tailTo], ROLE.input), lb('countable', [capX[1], capY], ROLE.input), lb('1, 2, 3, …', [capX[1], capY2], ROLE.input)] },
      { narration: 'Pick a random point of the interval [0, 1] (a spinner stopping at an angle): Ω = [0, 1]. Between any two outcomes there are more, and no list can reach them all: uncountable.', objects: [ln([seg.x, seg.y0], [seg.x, seg.y1], ROLE.result, 0.08), dt([seg.x, seg.y0], ROLE.result, 0.1), dt([seg.x, seg.y1], ROLE.result, 0.1), dt([seg.x, seg.pt], ROLE.aid, 0.12), lb('0', [seg.x + 0.5, seg.y0], ROLE.result), lb('1', [seg.x + 0.5, seg.y1], ROLE.result), lb('ω', [seg.x + 0.5, seg.pt], ROLE.aid), lb('uncountable', [capX[2], capY], ROLE.result), lb('[0, 1]', [capX[2], capY2], ROLE.result)] },
    ],
  }
}

// ── 2. Classical probability ─────────────────────────────────────────────────

/** Two dice: 6 × 6 = 36 equally likely outcomes (first die along x, second along y); "sum 7" holds 6 of them, "sum 12" holds 1. */
export const CLP = { cx: -1.8, cy: -0.1, s: 0.62, capX: 2.8 }
export const clpPos = (i: number, j: number): Pt => [CLP.cx + (i - 3.5) * CLP.s, CLP.cy + (j - 3.5) * CLP.s]

/** KG: when outcomes are equally likely, P(A) = |A| / |Ω| — count the favourable and the total outcomes. */
export function buildClassicalProbabilityScene(): SceneSpec {
  return framed(raw_buildClassicalProbabilityScene())
}
function raw_buildClassicalProbabilityScene(): SceneSpec {
  const faces = [1, 2, 3, 4, 5, 6]
  const grid = faces.flatMap((i) => faces.map((j) => dt(clpPos(i, j), ROLE.reference, 0.1)))
  const nums = faces.flatMap((k) => [lb(String(k), [clpPos(k, 1)[0], clpPos(k, 1)[1] - 0.5], ROLE.ink), lb(String(k), [clpPos(1, k)[0] - 0.5, clpPos(1, k)[1]], ROLE.ink)])
  const sev = faces.map((i) => dt(clpPos(i, 7 - i), ROLE.output, 0.15))
  return {
    id: 'math-classical-probability',
    title: 'Classical probability: favourable ÷ total',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show P(A) = |A| / |Ω| by counting on two fair dice. The 6 × 6 grid holds all 36 equally likely outcomes (first die along, second die up). The event "the sum is 7" is the 6 blue dots on a diagonal: 6 of 36, so the probability is 6 ÷ 36 = 1/6. The event "the sum is 12" is a single outcome, 1 of 36.',
    ariaLabel:
      'A square grid of 36 grey dots, six by six, with the numbers 1 to 6 along the bottom and the left for the two dice. In the second step six blue dots on the diagonal from the top left to the bottom right are marked, captioned sum 7, 6 of 36. In the third step the top right dot is marked red, captioned sum 12, 1 of 36, with the caption 6 divided by 36 equals one sixth.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Roll two dice. The 6 × 6 grid shows all outcomes (first die, second die): 36 of them, all equally likely.', objects: [...grid, ...nums, lb('two dice: 36 outcomes', [CLP.capX, 1.5], ROLE.ink)] },
      { narration: 'The event “the sum is 7” = {(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)}: six outcomes on one diagonal.', objects: [ln(clpPos(1, 6), clpPos(6, 1), ROLE.aid, 0.03), ...sev, lb('sum 7: 6 of 36', [CLP.capX, 0.4], ROLE.output)] },
      { narration: 'Classical probability: P(A) = favourable ÷ total, so P(sum 7) = 6 ÷ 36 = 1/6. Only (6, 6) gives the sum 12: 1 of 36.', objects: [dt(clpPos(6, 6), ROLE.input, 0.15), lb('sum 12: 1 of 36', [CLP.capX, -0.7], ROLE.input), lb('6 ÷ 36 = 1/6', [CLP.capX, -1.8], ROLE.result)] },
    ],
  }
}

// ── 3. Combinatorial probability ─────────────────────────────────────────────

/** A committee of 2 from 3 boys and 2 girls: the 10 pairs on a pentagon; 3 + 1 = 4 pairs of one kind, 3 × 2 = 6 mixed pairs. */
export const CBP = { c: [-1.8, 0] as Pt, R: 1.95, Rl: 2.55, caps: 2.9, boys: 3 }
export const cbpAng = (k: number) => ((90 + 72 * k) * Math.PI) / 180
export const cbpVertex = (k: number, R = CBP.R): Pt => [CBP.c[0] + R * Math.cos(cbpAng(k)), CBP.c[1] + R * Math.sin(cbpAng(k))]
export const cbpName = (k: number) => (k < CBP.boys ? `B${k + 1}` : `G${k - CBP.boys + 1}`)
export const cbpKind = (a: number, b: number): 'boys' | 'girls' | 'mixed' => (a < CBP.boys && b < CBP.boys ? 'boys' : a >= CBP.boys && b >= CBP.boys ? 'girls' : 'mixed')
const CBP_COLOR = { boys: ROLE.output, girls: ROLE.input, mixed: ROLE.result } as const

/** KG: P(A) by counting with combinations — favourable selections over all selections. */
export function buildCombinatorialProbabilityScene(): SceneSpec {
  return framed(raw_buildCombinatorialProbabilityScene())
}
function raw_buildCombinatorialProbabilityScene(): SceneSpec {
  const ks = [0, 1, 2, 3, 4]
  const people = ks.flatMap((k) => [dt(cbpVertex(k), k < CBP.boys ? ROLE.output : ROLE.input, 0.14), lb(cbpName(k), cbpVertex(k, CBP.Rl), k < CBP.boys ? ROLE.output : ROLE.input)])
  const pairs = ks.flatMap((a) => ks.filter((b) => b > a).map((b) => ln(cbpVertex(a), cbpVertex(b), CBP_COLOR[cbpKind(a, b)], 0.035)))
  return {
    id: 'math-combinatorial-probability',
    title: 'Combinatorial probability: count the selections',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show P(A) computed by counting selections. Choose a committee of 2 from 3 boys and 2 girls: there are C(5, 2) = 10 equally likely pairs, one line for every pair of the five people. Same-sex pairs: 3 boy pairs + 1 girl pair = 4 (blue and red). Mixed pairs: 3 boys × 2 girls = 6 (green). So P(a mixed committee) = 6 of 10.',
    ariaLabel:
      'Five dots on a pentagon, three blue ones B1, B2, B3 for the boys and two red ones G1, G2 for the girls, captioned 3 boys, 2 girls. In the second step all ten lines joining pairs are drawn: three blue between boys, one red between the girls and six green between a boy and a girl, captioned C of 5, 2 equals 10 pairs. In the third step captions give mixed 3 times 2 equals 6, same sex 3 plus 1 equals 4, and 6 of 10 mixed.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Choose 2 people for a committee from 3 boys (blue) and 2 girls (red).', objects: [...people, lb('3 boys, 2 girls', [CBP.caps, 1.7], ROLE.ink)] },
      { narration: 'Every pair is one possible committee: C(5, 2) = 10 lines — 3 between two boys (blue), 1 between the two girls (red), 6 between a boy and a girl (green).', objects: [...pairs, lb('C(5, 2) = 10 pairs', [CBP.caps, 0.7], ROLE.ink)] },
      { narration: 'Mixed pairs: 3 boys × 2 girls = 6. Same-sex pairs: 3 + 1 = 4. So P(one boy and one girl) = 6 of the 10 equally likely pairs.', objects: [lb('mixed: 3 × 2 = 6', [CBP.caps, -0.3], ROLE.result), lb('same sex: 3 + 1 = 4', [CBP.caps, -1.2], ROLE.output), lb('6 of 10 are mixed', [CBP.caps, -2.1], ROLE.result)] },
    ],
  }
}

// ── 4. Independence ──────────────────────────────────────────────────────────

/** The unit square of probability (side 3.2): A holds the left 0.6 of the width, B the bottom 0.5 of the height; A ∩ B has area 0.6 × 0.5 = 0.3. */
export const IND = { x0: -4.2, y0: -1.6, side: 3.2, pa: 0.6, pb: 0.5, capX: 2.0 }
export const indXa = () => IND.x0 + IND.pa * IND.side
export const indYb = () => IND.y0 + IND.pb * IND.side

/** KG: A and B are independent iff P(A ∩ B) = P(A)P(B), equivalently P(A | B) = P(A). */
export function buildIndependenceScene(): SceneSpec {
  return framed(raw_buildIndependenceScene())
}
function raw_buildIndependenceScene(): SceneSpec {
  const { x0, y0, side, capX } = IND
  const xa = indXa(), yb = indYb(), x1 = x0 + side, y1 = y0 + side
  const vhatch = (a: number, b: number, c: number, d: number, gap: number, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    for (let x = a + gap / 2; x < b; x += gap) out.push(ln([x, c], [x, d], color, 0.022))
    return out
  }
  return {
    id: 'math-independence',
    title: 'Independence: P(A ∩ B) = P(A) × P(B)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show independence as area in the unit square of probability. Event A takes the left 0.6 of the width (blue strips), event B the bottom 0.5 of the height (red strips). Where they overlap the area is 0.6 × 0.5 = 0.3 = P(A) × P(B), so A and B are independent: and inside B the share occupied by A is 0.3 ÷ 0.5 = 0.6 = P(A), knowing B does not change the chance of A.',
    ariaLabel:
      'A square representing all outcomes. In the first step the left 0.6 of its width is hatched with blue vertical strokes, captioned A, P of A equals 0.6. In the second step the bottom half is hatched with red horizontal strokes, captioned B, P of B equals 0.5. In the third step the overlap, the lower left rectangle, is outlined in green and captioned A and B, 0.6 times 0.5 equals 0.3, with P of A given B equals 0.3 divided by 0.5 equals 0.6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The square is all outcomes (total area 1). Event A takes the left 0.6 of the width: P(A) = 0.6.', objects: [...rect(x0, y0, x1, y1, ROLE.reference), ...vhatch(x0, xa, y0, y1, 0.3, ROLE.output), ln([xa, y0], [xa, y1], ROLE.output, 0.04), lb('A: P(A) = 0.6', [capX, 1.3], ROLE.output)] },
      { narration: 'Event B takes the bottom 0.5 of the height: P(B) = 0.5.', objects: [...shadeConvex([[x0, y0], [x1, y0], [x1, yb], [x0, yb]], 0.4, ROLE.input), ln([x0, yb], [x1, yb], ROLE.input, 0.04), lb('B: P(B) = 0.5', [capX, 0.4], ROLE.input)] },
      { narration: 'Both happen in the overlap: its area is width 0.6 × height 0.5 = 0.3 = P(A) × P(B) — A and B are independent. Inside B, the share taken by A is 0.3 ÷ 0.5 = 0.6 = P(A): learning B does not change the chance of A.', objects: [...rect(x0, y0, xa, yb, ROLE.result, 0.06), lb('A ∩ B: 0.6 × 0.5 = 0.3', [capX, -0.5], ROLE.result), lb('P(A | B) = 0.3 ÷ 0.5 = 0.6', [capX, -1.4], ROLE.result)] },
    ],
  }
}

// ── 5. Random variable ───────────────────────────────────────────────────────

/** Two flips; X = the number of heads maps the outcomes HH, HT, TH, TT to 2, 1, 1, 0 on a number line. */
export const RVR = {
  outcomes: [['HH', 1.5], ['HT', 0.5], ['TH', -0.5], ['TT', -1.5]] as ReadonlyArray<readonly [string, number]>,
  ox: -3.0, line: { x: 1.5, y0: -2.3, y1: 2.3 }, vy: (v: number) => -1.5 + 1.5 * v, capX: 3.3,
}
export const rvrX = (outcome: string) => [...outcome].filter((c) => c === 'H').length

/** KG: a (measurable) function X: Ω → ℝ assigning a number to each outcome. */
export function buildRandomVariableScene(): SceneSpec {
  return framed(raw_buildRandomVariableScene())
}
function raw_buildRandomVariableScene(): SceneSpec {
  const { outcomes, ox, line: nl, vy } = RVR
  const values = [0, 1, 2]
  const arrowsAll = outcomes.map(([name, y]) => ar([ox + 0.3, y], [nl.x - 0.2, vy(rvrX(name))], ROLE.output))
  return {
    id: 'math-random-variable',
    title: 'Random variable: a number for each outcome',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a random variable as a function from outcomes to numbers. Ω = {HH, HT, TH, TT} for two coin flips; X = the number of heads sends HH to 2, HT and TH to 1, and TT to 0. Several outcomes may share a value (HT and TH), but each outcome has exactly one.',
    ariaLabel:
      'On the left four red dots for the outcomes HH, HT, TH, TT, on the right a vertical number line with the values 0, 1, 2. In the second step blue arrows run from each outcome to its number of heads: HH to 2, HT to 1, TH to 1 and TT to 0. In the third step the captions 1 of 4, 2 of 4 and 1 of 4 sit beside the values 0, 1 and 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The outcomes of two coin flips (left) and the real numbers (right, a number line).', objects: [...outcomes.flatMap(([n, y]) => [dt([ox, y], ROLE.input, 0.12), lb(n, [ox - 0.65, y], ROLE.input)]), ar([nl.x, nl.y0], [nl.x, nl.y1], ROLE.reference), ...values.flatMap((v) => [dt([nl.x, vy(v)], ROLE.reference, 0.1), lb(String(v), [nl.x + 0.5, vy(v)], ROLE.ink)]), lb('outcomes Ω', [ox, 2.4], ROLE.input)] },
      { narration: 'X = “the number of heads” sends every outcome to one number: HH → 2, HT → 1, TH → 1, TT → 0. That is a random variable: a function X: Ω → ℝ.', objects: [...arrowsAll, lb('X = heads', [nl.x, 2.75], ROLE.output)] },
      { narration: 'Different outcomes can share a value: 1 of the 4 outcomes gives 0, 2 of the 4 give 1, 1 of the 4 gives 2.', objects: [lb('1 of 4', [nl.x + 1.7, vy(0)], ROLE.result), lb('2 of 4', [nl.x + 1.7, vy(1)], ROLE.result), lb('1 of 4', [nl.x + 1.7, vy(2)], ROLE.result)] },
    ],
  }
}

// ── 6. Expected value ────────────────────────────────────────────────────────

/** X takes 0, 1, 2, 3 with probability 0.1, 0.2, 0.3, 0.4: E[X] = 0 + 0.2 + 0.6 + 1.2 = 2, the balance point of the bars. */
export const EXV = { xs: [0, 1, 2, 3] as readonly number[], p: [0.1, 0.2, 0.3, 0.4] as readonly number[], x0: -3.2, dx: 1.9, base: -1.6, H: 5.5, beam: [-4.2, 3.6] as readonly number[], bar: 0.2 }
export const exvX = (v: number) => EXV.x0 + EXV.dx * v
export const exvMean = () => EXV.xs.reduce((s, x, i) => s + x * EXV.p[i], 0)

/** KG: E[X] = Σ x·P(X = x) — the centre of mass of the distribution. */
export function buildExpectedValueScene(): SceneSpec {
  return framed(raw_buildExpectedValueScene())
}
function raw_buildExpectedValueScene(): SceneSpec {
  const { xs, p, base, H, beam, bar } = EXV
  const xe = exvX(exvMean())
  return {
    id: 'math-expected-value',
    title: 'Expected value: the balance point',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show E[X] as the centre of mass. X takes 0, 1, 2, 3 with probabilities 0.1, 0.2, 0.3, 0.4 (bar heights, in %). The beam balances on a pivot at E[X] = 0 × 0.1 + 1 × 0.2 + 2 × 0.3 + 3 × 0.4 = 2: the left side pulls 2 × 0.1 + 1 × 0.2 = 0.4, the right side pulls 1 × 0.4 = 0.4.',
    ariaLabel:
      'Four vertical bars standing on a horizontal beam at the values 0, 1, 2 and 3, with heights for the probabilities 10, 20, 30 and 40 percent. In the second step a triangular pivot sits under the beam at the value 2, captioned balance point, E of X equals 2. In the third step the captions left pull 0.4 and right pull 0.4 show that the beam balances.',
    stage: NO_STAGE,
    steps: [
      { narration: 'X takes the values 0, 1, 2, 3 with probabilities 0.1, 0.2, 0.3, 0.4 (bar heights, in %).', objects: [ln([beam[0], base], [beam[1], base], ROLE.reference, 0.06), ...xs.flatMap((x, i) => [ln([exvX(x), base], [exvX(x), base + H * p[i]], ROLE.output, bar), lb(String(Math.round(p[i] * 100)), [exvX(x), base + H * p[i] + 0.42], ROLE.output), lb(String(x), [exvX(x), -2.35], ROLE.ink)]), lb('P(X = x) in %', [-3.1, 2.75], ROLE.output)] },
      { narration: 'E[X] = 0 × 0.1 + 1 × 0.2 + 2 × 0.3 + 3 × 0.4 = 2. Put a pivot under the beam at 2: it is the balance point of the bars (the centre of mass).', objects: [ln([xe, base - 0.08], [xe - 1.0, -2.95], ROLE.result, 0.05), ln([xe, base - 0.08], [xe + 1.0, -2.95], ROLE.result, 0.05), ln([xe - 1.0, -2.95], [xe + 1.0, -2.95], ROLE.result, 0.05), lb('E[X] = 2', [xe, 2.75], ROLE.result)] },
      { narration: 'It balances: the bars left of 2 pull with 2 × 0.1 + 1 × 0.2 = 0.4, the bar right of 2 pulls with 1 × 0.4 = 0.4.', objects: [lb('left pull 0.4', [-2.6, 1.7], ROLE.output), lb('right pull 0.4', [3.5, 1.7], ROLE.output)] },
    ],
  }
}

// ── 7. Markov's inequality ───────────────────────────────────────────────────

/** X ≥ 0 on 0…7 with probabilities 0.30, 0.20, 0.20, 0.10, 0.05, 0.05, 0.05, 0.05 (mean 2): P(X ≥ 4) = 0.2 ≤ E[X] ÷ 4 = 0.5. */
export const MKV = { p: [0.3, 0.2, 0.2, 0.1, 0.05, 0.05, 0.05, 0.05] as readonly number[], x0: -4.2, dx: 0.55, base: -1.8, H: 6, bar: 0.3, a: 4, right: { tailX: 2.2, boundX: 4.0 } }
export const mkvX = (k: number) => MKV.x0 + MKV.dx * k
export const mkvMean = () => MKV.p.reduce((s, q, k) => s + k * q, 0)
export const mkvTail = (a: number) => MKV.p.reduce((s, q, k) => (k >= a ? s + q : s), 0)

/** KG: for X ≥ 0, P(X ≥ a) ≤ E[X] / a. */
export function buildMarkovInequalityScene(): SceneSpec {
  return framed(raw_buildMarkovInequalityScene())
}
function raw_buildMarkovInequalityScene(): SceneSpec {
  const { p, base, H, bar, a, right } = MKV
  const mean = mkvMean()
  const tail = mkvTail(a), bound = mean / a
  return {
    id: 'math-markov-inequality',
    title: "Markov's inequality: P(X ≥ a) ≤ E[X] ÷ a",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Markov\'s inequality on a concrete X ≥ 0 taking 0, 1, …, 7 with probabilities 0.30, 0.20, 0.20, 0.10, 0.05, 0.05, 0.05, 0.05 (bars). The mean is 2. For a = 4 the tail P(X ≥ 4) = 0.05 × 4 = 0.2 (red bars) never exceeds the bound E[X] ÷ a = 2 ÷ 4 = 0.5 (green bar).',
    ariaLabel:
      'A bar chart of eight bars for the values 0 to 7, the first bars tall and the last four short, with a violet guide at the mean 2. In the second step a violet guide marks a equals 4 and the four bars from 4 to 7 are drawn red. In the third step two bars stand on the right: a short red bar for the tail 0.2 and a taller green bar for the bound 0.5, captioned 0.2 is at most 2 divided by 4 equals 0.5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'X ≥ 0 takes the values 0 to 7 (bars show the probabilities). Its mean is E[X] = 2 (violet guide).', objects: [ln([-4.5, base], [0, base], ROLE.reference, 0.05), ...p.flatMap((q, k) => [ln([mkvX(k), base], [mkvX(k), base + H * q], ROLE.output, bar), lb(String(k), [mkvX(k), -2.25], ROLE.ink)]), ln([mkvX(mean), -0.1], [mkvX(mean), 0.5], ROLE.aid, 0.025), lb('mean 2', [mkvX(mean), 0.95], ROLE.aid)] },
      { narration: 'Take a = 4. The tail P(X ≥ 4) is the total of the red bars 4, 5, 6, 7: 0.05 + 0.05 + 0.05 + 0.05 = 0.2.', objects: [ln([mkvX(a), -1.0], [mkvX(a), 1.6], ROLE.aid, 0.025), lb('a = 4', [mkvX(a), 2.05], ROLE.aid), ...p.flatMap((q, k) => (k >= a ? [ln([mkvX(k), base], [mkvX(k), base + H * q], ROLE.input, bar)] : []))] },
      { narration: 'Markov’s inequality: P(X ≥ a) ≤ E[X] ÷ a. Here the tail 0.2 (red) is at most 2 ÷ 4 = 0.5 (green) — the bound is safe, though not tight.', objects: [ln([right.tailX, base], [right.tailX, base + H * tail], ROLE.input, 0.5), ln([right.boundX, base], [right.boundX, base + H * bound], ROLE.result, 0.5), lb('tail 0.2', [right.tailX, base + H * tail + 0.45], ROLE.input), lb('bound 0.5', [right.boundX, base + H * bound + 0.45], ROLE.result), lb('0.2 ≤ 2 ÷ 4 = 0.5', [2.2, 2.45], ROLE.result)] },
    ],
  }
}

// ── 8. Transition matrix ─────────────────────────────────────────────────────

/** Two states S and R: P = [[0.9, 0.1], [0.5, 0.5]] (in %), and P² = [[0.86, 0.14], [0.70, 0.30]] — the two-step probabilities. */
export const TMX = {
  P: [[90, 10], [50, 50]] as ReadonlyArray<readonly number[]>,
  m1: { cx: -3.3, cy: 0.4, dx: 1.05, dy: 0.9, rows: 2, cols: 2 } as MSpec,
  m2: { cx: -0.3, cy: 0.4, dx: 1.05, dy: 0.9, rows: 2, cols: 2 } as MSpec,
  m3: { cx: 2.9, cy: 0.4, dx: 1.05, dy: 0.9, rows: 2, cols: 2 } as MSpec,
}
export const tmxSquare = (A: ReadonlyArray<readonly number[]>) => A.map((row) => A[0].map((_, j) => row.reduce((s, v, k) => s + (v * A[k][j]) / 100, 0)))

/** KG: P = [pᵢⱼ] with pᵢⱼ = P(Xₙ₊₁ = j | Xₙ = i), each row sums to 1; the n-step probabilities are the entries of Pⁿ. */
export function buildTransitionMatrixScene(): SceneSpec {
  return framed(raw_buildTransitionMatrixScene())
}
function raw_buildTransitionMatrixScene(): SceneSpec {
  const { P: T, m1, m2, m3 } = TMX
  const P2 = tmxSquare(T)
  const pad = 0.5, hx = 0.42
  const boxAround = (cx: number, cy: number, w: number, h: number, color: string) => rect(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, color, 0.035)
  return {
    id: 'math-transition-matrix',
    title: 'Transition matrix: one step and two steps',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a transition matrix for two states S and R (entries in %): from S the chain stays in S with 90 and moves to R with 10; from R it goes to S with 50 and stays with 50. Each row adds to 100. Multiplying the matrix by itself gives the two-step probabilities: the entry for S → S is 90 × 90 + 10 × 50 in percent, i.e. 81 + 5 = 86.',
    ariaLabel:
      'A two by two matrix with rows 90, 10 and 50, 50 between square brackets, with the states S and R marked, captioned entries in percent. In the second step a caption says each row adds to 100. In the third step the matrix is shown again, then an equals sign and a second matrix with rows 86, 14 and 70, 30, and the first row of the first matrix and first column of the second are outlined in blue and red and the entry 86 in green, captioned 86 equals 81 plus 5 and after two steps.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two states, S and R. The matrix P lists the one-step probabilities in %: row i, column j is the chance of moving from state i to state j. From S: 90 stay, 10 move to R. From R: 50 move to S, 50 stay.', objects: [...matrix(m1, T), lb('S', [mAt(m1, 0, 0)[0], mAt(m1, 0, 0)[1] + 0.95], ROLE.aid), lb('R', [mAt(m1, 0, 1)[0], mAt(m1, 0, 1)[1] + 0.95], ROLE.aid), lb('S', [mAt(m1, 0, 0)[0] - pad - hx, mAt(m1, 0, 0)[1]], ROLE.aid), lb('R', [mAt(m1, 1, 0)[0] - pad - hx, mAt(m1, 1, 0)[1]], ROLE.aid), lb('entries in %', [m1.cx, -1.3], ROLE.ink)] },
      { narration: 'Each row lists everything that can happen next, so each row adds to 100 %: 90 + 10 = 100 and 50 + 50 = 100.', objects: [lb('each row adds to 100', [m1.cx, -2.2], ROLE.result)] },
      { narration: 'Two steps: multiply P by itself. Row 1 of the first matrix with column 1 of the second gives the chance S → S in two steps: 90 % × 90 % + 10 % × 50 % = 81 + 5 = 86 %. The rows of P² also add to 100.', objects: [lb('×', [-1.8, 0.4], ROLE.ink), ...matrix(m2, T), lb('=', [1.3, 0.4], ROLE.ink), ...matrix(m3, P2.map((r) => r.map((v) => Math.round(v)))), ...boxAround((mAt(m1, 0, 0)[0] + mAt(m1, 0, 1)[0]) / 2, mAt(m1, 0, 0)[1], m1.dx + 0.8, 0.8, ROLE.output), ...boxAround(mAt(m2, 0, 0)[0], (mAt(m2, 0, 0)[1] + mAt(m2, 1, 0)[1]) / 2, 0.9, m2.dy + 0.8, ROLE.input), ...boxAround(mAt(m3, 0, 0)[0], mAt(m3, 0, 0)[1], 0.9, 0.8, ROLE.result), lb('86 = 81 + 5', [m3.cx, -1.3], ROLE.result), lb('after two steps', [m3.cx, 2.2], ROLE.ink)] },
    ],
  }
}

// ── 9. Poisson process ───────────────────────────────────────────────────────

/** One sample path on [0, 6] with 9 arrivals (3 in each window of length 2); the rate λ = 1.5 gives the mean count 1.5 × 6 = 9. */
export const PPR = {
  times: [0.4, 0.9, 1.6, 2.3, 2.6, 3.5, 4.3, 5.3, 5.7] as readonly number[], T: 6, ox: -3.9, ux: 1.3, rowY: 2.5, baseY: -2.2, uy: 0.4,
}
export const pprX = (t: number) => PPR.ox + PPR.ux * t
export const pprY = (n: number) => PPR.baseY + PPR.uy * n
export const pprCount = (t: number) => PPR.times.filter((s) => s <= t).length

/** KG: a counting process N(t) with independent Poisson(λ(t − s)) increments; interarrival times iid Exp(λ). */
export function buildPoissonProcessScene(): SceneSpec {
  return framed(raw_buildPoissonProcessScene())
}
function raw_buildPoissonProcessScene(): SceneSpec {
  const { times, T, rowY } = PPR
  const knots = [0, ...times, T]
  const stairs = knots.slice(0, -1).flatMap((t0, k) => [ln([pprX(t0), pprY(k)], [pprX(knots[k + 1]), pprY(k)], ROLE.output, 0.05), ...(k < times.length ? [ln([pprX(knots[k + 1]), pprY(k)], [pprX(knots[k + 1]), pprY(k + 1)], ROLE.output, 0.03)] : [])])
  return {
    id: 'math-poisson-process',
    title: 'Poisson process: counting arrivals over time',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a Poisson process N(t) on one sample path over [0, 6]. Arrivals (dots) come at random times; N(t) is the staircase counting them, N(0) = 0 and 9 arrivals by t = 6. The rate is λ = 1.5 per unit time, so the expected count is 1.5 × 6 = 9, and each window of length 2 expects 1.5 × 2 = 3 arrivals (here 3, 3 and 3), whatever happened in the other windows.',
    ariaLabel:
      'A row of nine dots on a time line, the arrival times, captioned arrival times. In the second step a blue staircase below, N of t, climbs by one step at each arrival from 0 to 9 over the times 0 to 6. In the third step two violet guides at t equals 2 and 4 split the time into three windows each marked 3, with the captions lambda equals 1.5, 1.5 times 2 equals 3 and mean 1.5 times 6 equals 9.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Arrivals happen at random times: phone calls, radioactive decays, web requests. One sample path on [0, 6]: nine arrivals (dots).', objects: [ar([pprX(0) - 0.2, rowY], [pprX(T) + 0.4, rowY], ROLE.reference), ...times.map((t) => dt([pprX(t), rowY], ROLE.input, 0.11)), lb('arrival times', [0.0, 3.0], ROLE.input)] },
      { narration: 'N(t) counts the arrivals up to time t: N(0) = 0 and N jumps by 1 at each arrival, reaching 9 at t = 6.', objects: [ar([pprX(0) - 0.2, PPR.baseY], [pprX(T) + 0.4, PPR.baseY], ROLE.reference), ar([pprX(0), PPR.baseY - 0.2], [pprX(0), pprY(9) + 0.3], ROLE.reference), ...[0, 1, 2, 3, 4, 5, 6].map((t) => lb(String(t), [pprX(t), PPR.baseY - 0.5], ROLE.ink)), ...[3, 6, 9].map((n) => lb(String(n), [pprX(0) - 0.5, pprY(n)], ROLE.ink)), ...stairs, lb('N(t)', [4.55, pprY(9)], ROLE.output)] },
      { narration: 'The rate is λ = 1.5 arrivals per unit time, so the expected count is 1.5 × 6 = 9. The counts in separate windows are independent: each window of length 2 expects 1.5 × 2 = 3 arrivals — here 3, 3 and 3.', objects: [ln([pprX(2), PPR.baseY], [pprX(2), 2.9], ROLE.aid, 0.025), ln([pprX(4), PPR.baseY], [pprX(4), 2.9], ROLE.aid, 0.025), ...[1, 3, 5].map((t) => lb('3', [pprX(t), 1.9], ROLE.result)), lb('λ = 1.5', [-2.6, 1.0], ROLE.aid), lb('1.5 × 2 = 3', [3.4, -0.6], ROLE.result), lb('mean 1.5 × 6 = 9', [3.4, -1.5], ROLE.aid)] },
    ],
  }
}
