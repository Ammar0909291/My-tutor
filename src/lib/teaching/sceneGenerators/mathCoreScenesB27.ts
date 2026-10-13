/**
 * Core mathematics figures — batch 27 of the mathematics visual campaign (2026-10-12): arithmetic.
 * Addition and subtraction on the number line, counting and skip counting, column addition with a
 * carry, dividend / divisor / quotient, remainders, long division, powers, the exponent rules,
 * scientific notation, percentages, unit rates and estimation by rounding.
 *
 * Same rules as batches 1-26: one visual language from visualDesign.ts, labels are names not sentences
 * (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5, at most 50
 * objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a label left to
 * right and compares labels that share a last token before "="), and every number a figure states is
 * re-derived by the test file from the DRAWN dots, hops, digits and bars. A label is about 0.26 screen
 * units wide per character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts } from './mathSceneKit'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
/** a hop (a half circle above or below the axis) from x0 to x1 */
const hop = (x0: number, x1: number, y: number, up: boolean, color: string): SceneObject => curve(arcPts((x0 + x1) / 2, y, Math.abs(x1 - x0) / 2, up ? 0 : 180, up ? 180 : 360, 12), color)

// ── 1. Addition ──────────────────────────────────────────────────────────────

/** 4 + 3 = 7 as three hops right from 4; 3 + 4 = 7 as four hops from 3 (addition commutes). */
export const ADD = { x0: -4.5, dx: 0.9, y: 0.4, a: 4, b: 3 }
export const addX = (v: number) => ADD.x0 + ADD.dx * v

/** KG: addition combines quantities: a + b is a hops of b along the number line; a + b = b + a. */
export function buildAdditionScene(): SceneSpec {
  return framed(raw_buildAdditionScene())
}
function raw_buildAdditionScene(): SceneSpec {
  const { y, a, b } = ADD
  const ticks: SceneObject[] = Array.from({ length: 11 }, (_, v) => ln([addX(v), y - 0.12], [addX(v), y + 0.12], ROLE.reference, 0.03))
  const nums: SceneObject[] = Array.from({ length: 11 }, (_, v) => lb(String(v), [addX(v), y - 0.95]))
  return {
    id: 'math-addition',
    title: 'Addition: hop along the number line',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show addition as movement along the number line: to add 3 to 4, start at 4 and hop 3 steps to the right (three green hops), landing on 7, so 4 + 3 = 7. The order does not matter: starting at 3 and hopping 4 steps (four violet hops, below the line) also lands on 7, so 3 + 4 = 4 + 3 (addition is commutative). Adding means “counting on” from the first number.',
    ariaLabel:
      'A number line from 0 to 10. A white dot at 4 and three green hops above the line, from 4 to 5, 5 to 6 and 6 to 7, with a green dot at 7 and the caption 4 plus 3 equals 7. In the second step a white dot at 3 and four violet hops below the line from 3 to 7, captioned 3 plus 4 equals 7, landing on the same point.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Start at 4 on the number line. To add 3, hop three steps to the right: 5, 6, 7. You land on 7, so 4 + 3 = 7.', objects: [arrow(P(addX(0) - 0.4, y), P(addX(10) + 0.3, y), ROLE.reference), ...ticks, ...nums, ...Array.from({ length: b }, (_, k) => hop(addX(a + k), addX(a + k + 1), y, true, ROLE.result)), dt([addX(a), y], ROLE.ink, 0.14), dt([addX(a + b), y], ROLE.result, 0.18), lb('4 + 3 = 7', [addX(5.5), y + 1.7], ROLE.result)] },
      { narration: 'Swap the numbers: start at 3 and hop 4 steps to the right (violet, below the line). You land on the same 7, so 3 + 4 = 7 as well. Adding in either order gives the same sum.', objects: [...Array.from({ length: a }, (_, k) => hop(addX(b + k), addX(b + k + 1), y, false, ROLE.aid)), dt([addX(b), y], ROLE.ink, 0.14), lb('3 + 4 = 7', [addX(5.0), y - 1.95], ROLE.aid)] },
      { narration: 'Both routes end at 7: 4 + 3 = 3 + 4 = 7. Adding a number is counting on from the other one, one hop per unit.', objects: [lb('same sum', [addX(7), y + 0.9], ROLE.result)] },
    ],
  }
}

// ── 2. Subtraction ───────────────────────────────────────────────────────────

/** 9 − 4 = 5: four hops left from 9, and the bar model whole 9 = part 4 + difference 5. */
export const SUB = { x0: -4.5, dx: 0.9, y: 1.2, a: 9, b: 4, bar: { y0: -2.2, y1: -1.5 } }
export const subX = (v: number) => SUB.x0 + SUB.dx * v

/** KG: subtraction takes away (counting back) or finds the difference (the missing part). */
export function buildSubtractionScene(): SceneSpec {
  return framed(raw_buildSubtractionScene())
}
function raw_buildSubtractionScene(): SceneSpec {
  const { y, a, b, bar } = SUB
  const ticks: SceneObject[] = Array.from({ length: 11 }, (_, v) => ln([subX(v), y - 0.12], [subX(v), y + 0.12], ROLE.reference, 0.03))
  const nums: SceneObject[] = Array.from({ length: 11 }, (_, v) => lb(String(v), [subX(v), y + 0.5]))
  return {
    id: 'math-subtraction',
    title: 'Subtraction: take away, or find the difference',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two views of subtraction with 9 − 4 = 5. Counting back: start at 9 on the number line and hop 4 steps to the LEFT (four red hops), landing on 5. The part-whole bar: the whole bar is 9 long; the part 4 is taken away (red), and what is left over, 5 (blue), is the difference — which also shows that 9 − 4 = 5 because 4 + 5 = 9: subtraction undoes addition.',
    ariaLabel:
      'A number line from 0 to 10 with four red hops below the line leftwards from 9 to 5, a white dot at 9 and a blue dot at 5. Below, a long bar divided into a red part of length 4 on the left and a blue part of length 5 on the right, with the whole labelled 9 above it, the parts labelled 4 and 5 below, and the caption 4 plus 5 equals 9.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Start at 9 and take away 4: hop four steps to the left (red) — 8, 7, 6, 5. You land on 5, so 9 − 4 = 5.', objects: [arrow(P(subX(0) - 0.4, y), P(subX(10) + 0.3, y), ROLE.reference), ...ticks, ...nums, ...Array.from({ length: b }, (_, k) => hop(subX(a - k - 1), subX(a - k), y, false, ROLE.input)), dt([subX(a), y], ROLE.ink, 0.14), dt([subX(a - b), y], ROLE.output, 0.18), lb('9 − 4 = 5', [subX(7), y - 1.7], ROLE.input)] },
      { narration: 'The same fact as parts of a whole: the whole bar is 9 long; remove the part 4 (red) and the part that is left, 5 (blue), is the difference.', objects: [...rect(subX(0), bar.y0, subX(a), bar.y1, ROLE.reference, 0.04), ln([subX(b), bar.y0], [subX(b), bar.y1], ROLE.reference, 0.04), ln([subX(0), (bar.y0 + bar.y1) / 2], [subX(b), (bar.y0 + bar.y1) / 2], ROLE.input, 0.18), ln([subX(b), (bar.y0 + bar.y1) / 2], [subX(a), (bar.y0 + bar.y1) / 2], ROLE.output, 0.18), lb('9', [subX(a / 2), bar.y1 + 0.5]), lb('4', [subX(b / 2), bar.y0 - 0.45], ROLE.input), lb('5', [subX((a + b) / 2), bar.y0 - 0.45], ROLE.output)] },
      { narration: 'Subtraction undoes addition: since 4 + 5 = 9, we know 9 − 4 = 5 and 9 − 5 = 4. The difference is the missing part.', objects: [lb('4 + 5 = 9', [subX(a / 2), bar.y0 - 1.3], ROLE.result)] },
    ],
  }
}

// ── 3. Counting and skip counting ────────────────────────────────────────────

/** Counting 1 … 10, counting by twos (2, 4, 6, 8, 10) and by fives (5, 10). */
export const CNS = { x0: -4.0, dx: 0.9, rows: [1.8, 0.2, -1.4] as readonly number[], steps: [1, 2, 5] as readonly number[], n: 10 }
export const cnsAt = (row: number, k: number): Pt => [CNS.x0 + CNS.dx * (k - 1), CNS.rows[row]]

/** KG: the counting sequence 1, 2, 3, … and counting in steps (skip counting). */
export function buildCountingSequenceScene(): SceneSpec {
  return framed(raw_buildCountingSequenceScene())
}
function raw_buildCountingSequenceScene(): SceneSpec {
  const { n, steps } = CNS, cols = [ROLE.output, ROLE.result, ROLE.input]
  const names = ['by ones', 'by twos', 'by fives']
  const row = (r: number): SceneObject[] => [lb(names[r], [CNS.x0 + 0.1, CNS.rows[r] + 0.6], cols[r]), ...Array.from({ length: n }, (_, i) => i + 1).flatMap((k) => [dt(cnsAt(r, k), k % steps[r] === 0 ? cols[r] : ROLE.reference, k % steps[r] === 0 ? 0.16 : 0.08), lb(String(k), [cnsAt(r, k)[0], cnsAt(r, k)[1] - 0.45], k % steps[r] === 0 ? ROLE.ink : ROLE.reference)])]
  return {
    id: 'math-counting-sequence',
    title: 'Counting and skip counting',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the counting sequence and skip counting. Counting by ones names every number 1, 2, 3, …, 10: each is one more than the one before. Counting by twos lights up every second number — 2, 4, 6, 8, 10 — each is 2 more than the previous; counting by fives lights up 5 and 10, every fifth number. Skip counting is the counting sequence with some numbers skipped; the lit numbers are the multiples of the step.',
    ariaLabel:
      'Three rows of the numbers 1 to 10. Top row, in blue: every number is a bright dot, counting by ones. Middle row, in the second step: only 2, 4, 6, 8 and 10 are bright green dots, counting by twos, the others are small grey dots. Bottom row, third step: only 5 and 10 are bright red dots, counting by fives.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Counting by ones: 1, 2, 3, …, 10 — each number is one more than the one before. Every number is named (blue).', objects: row(0) },
      { narration: 'Counting by twos: skip every other number — 2, 4, 6, 8, 10 (green). Each is 2 more than the last; these are the even numbers.', objects: row(1) },
      { narration: 'Counting by fives: 5, 10 (red) — every fifth number. The lit numbers are the multiples of the step: 2, 4, 6, 8, 10 are 2 × 1, 2 × 2, …; 5 and 10 are 5 × 1 and 5 × 2.', objects: row(2) },
    ],
  }
}

// ── 4. Column addition ───────────────────────────────────────────────────────

/** 47 + 38 = 85 by columns: ones 7 + 8 = 15, write 5 and carry 1; tens 4 + 3 + 1 = 8. */
export const CLA = { tens: -0.6, ones: 0.6, y: { carry: 1.9, top: 1.1, bottom: 0.3, line: -0.2, result: -1.0 } }

/** KG: column addition: add the ones, carry when the sum reaches ten, then add the tens. */
export function buildColumnAdditionScene(): SceneSpec {
  return framed(raw_buildColumnAdditionScene())
}
function raw_buildColumnAdditionScene(): SceneSpec {
  const { tens, ones, y } = CLA
  return {
    id: 'math-column-addition',
    title: 'Column addition with a carry',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show column addition of 47 + 38. Line the numbers up by place value (tens under tens, ones under ones). Add the ONES column first: 7 + 8 = 15, which is 1 ten and 5 ones, so write 5 in the ones place and CARRY the 1 ten to the tens column (red 1). Then add the TENS column: 4 + 3 + the carried 1 = 8. The answer is 85. The carry is how a sum of ten or more in one place moves into the next place.',
    ariaLabel:
      'Two numbers written one above the other: 47 on top and plus 38 below, with a line underneath. In the second step the ones column is added: a green 5 is written under the line in the ones place and a small red 1 is carried above the tens column. In the third step the tens column is added, 4 plus 3 plus the carried 1, and a green 8 is written in the tens place of the answer, giving 85.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Write 47 above 38 so the digits line up by place: tens over tens, ones over ones. Then add column by column, starting with the ones on the right.', objects: [lb('4', [tens, y.top]), lb('7', [ones, y.top]), lb('3', [tens, y.bottom]), lb('8', [ones, y.bottom]), lb('+', [tens - 0.9, y.bottom]), ln([tens - 1.3, y.line], [ones + 0.6, y.line], ROLE.reference, 0.04)] },
      { narration: 'Ones: 7 + 8 = 15 — that is 1 ten and 5 ones. Write 5 in the ones place under the line and carry the 1 (a ten) over to the tens column (red).', objects: [lb('5', [ones, y.result], ROLE.result), lb('1', [tens, y.carry], ROLE.input)] },
      { narration: 'Tens: 4 + 3 + the carried 1 = 8. Write 8 in the tens place. The sum is 85: 47 + 38 = 85.', objects: [lb('8', [tens, y.result], ROLE.result), lb('47 + 38 = 85', [0, -2.1], ROLE.result)] },
    ],
  }
}

// ── 5. Dividend, divisor, quotient ───────────────────────────────────────────

/** 20 ÷ 4 = 5: twenty dots grouped into groups of 4 (the divisor); the number of groups is the quotient 5. */
export const DVD = { dividend: 20, divisor: 4, x0: -3.6, dx: 1.8, y: 0.4, cols: 2 }
/** the position of dot j (0..3) inside group g (0..4) */
export const dvdDot = (g: number, j: number): Pt => [DVD.x0 + DVD.dx * g + (j % 2) * 0.5, DVD.y + (j < 2 ? 0.25 : -0.25)]

/** KG: in a ÷ b = c, a is the dividend, b the divisor and c the quotient; a = b × c. */
export function buildDivisorDividendScene(): SceneSpec {
  return framed(raw_buildDivisorDividendScene())
}
function raw_buildDivisorDividendScene(): SceneSpec {
  const { dividend, divisor } = DVD, groups = dividend / divisor
  const all = Array.from({ length: groups }, (_, g) => Array.from({ length: divisor }, (_, j) => dt(dvdDot(g, j), ROLE.ink, 0.12))).flat()
  return {
    id: 'math-divisor-dividend',
    title: 'Dividend, divisor and quotient',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the parts of a division with 20 ÷ 4 = 5. The DIVIDEND (20) is the amount being shared out: twenty dots. The DIVISOR (4) is the size of each group: put the dots into groups of 4 (the boxes). The QUOTIENT (5) is how many groups come out. Division checks against multiplication: 4 × 5 = 20, so the dividend equals the divisor times the quotient.',
    ariaLabel:
      'Twenty white dots arranged in a row of five clusters. In the second step a blue box is drawn round each cluster of four dots, five boxes in all. In the third step the labels dividend 20, divisor 4 (each box) and quotient 5 (the number of boxes) appear with the equation 20 divided by 4 equals 5.',
    stage: NO_STAGE,
    steps: [
      { narration: '20 dots to divide: that is the DIVIDEND, the amount we start with.', objects: [...all, lb('dividend 20', [0.0, 2.0], ROLE.input)] },
      { narration: 'Put them into groups of 4 (blue boxes) — the group size is the DIVISOR. Count the groups: there are 5 of them, the QUOTIENT.', objects: Array.from({ length: groups }, (_, g) => rect(dvdDot(g, 0)[0] - 0.4, dvdDot(g, 2)[1] - 0.4, dvdDot(g, 1)[0] + 0.4, dvdDot(g, 0)[1] + 0.4, ROLE.output, 0.04)).flat() },
      { narration: '20 ÷ 4 = 5: dividend ÷ divisor = quotient. Check by multiplying back: divisor × quotient = 4 × 5 = 20, the dividend.', objects: [lb('divisor 4', [DVD.x0 + 0.25, 1.25], ROLE.output), ln([DVD.x0 - 0.4, -0.8], [DVD.x0 + DVD.dx * 4 + 0.9, -0.8], ROLE.result, 0.04), lb('quotient 5', [DVD.x0 + DVD.dx * 2 + 0.25, -1.3], ROLE.result), lb('20 ÷ 4 = 5', [0.0, -2.3], ROLE.result)] },
    ],
  }
}

// ── 6. Remainder ─────────────────────────────────────────────────────────────

/** 17 ÷ 5 = 3 remainder 2: three full groups of 5 and 2 dots left over; 17 = 3 × 5 + 2. */
export const RMD = { total: 17, size: 5, gx: [-3.4, -0.9, 1.6] as readonly number[], leftX: 3.9, y: 0.4, step: 0.4, leftStep: 0.55 }
export const rmdDot = (g: number, j: number): Pt => [RMD.gx[g] + (j - 2) * RMD.step, RMD.y]
export const rmdLeft = (j: number): Pt => [RMD.leftX + (j - 0.5) * RMD.leftStep, RMD.y]

/** KG: the remainder is what is left after making as many full groups as possible; a = bq + r with 0 ≤ r < b. */
export function buildRemainderScene(): SceneSpec {
  return framed(raw_buildRemainderScene())
}
function raw_buildRemainderScene(): SceneSpec {
  const { gx } = RMD
  const groupDots = gx.flatMap((_, g) => Array.from({ length: 5 }, (_, j) => dt(rmdDot(g, j), ROLE.ink, 0.12)))
  const left = [0, 1].map((j) => dt(rmdLeft(j), ROLE.ink, 0.12))
  return {
    id: 'math-remainder',
    title: 'Remainder: what is left over',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a remainder with 17 ÷ 5. Make as many full groups of 5 as you can from 17 dots: three groups (blue boxes) use 15 dots, leaving 2 dots that cannot make another full group — the REMAINDER (red). So 17 ÷ 5 = 3 remainder 2, and 17 = 3 × 5 + 2. The remainder is always smaller than the group size (2 < 5); if it reached 5 another full group could be made.',
    ariaLabel:
      'Seventeen white dots in a row: three clusters of five and two more dots apart on the right. In the second step a blue box surrounds each cluster of five and the two spare dots turn red, labelled remainder 2. In the third step the equation 17 equals 3 times 5 plus 2 appears, with the note remainder less than 5.',
    stage: NO_STAGE,
    steps: [
      { narration: '17 dots. Make groups of 5.', objects: [...groupDots, ...left] },
      { narration: 'Three full groups of 5 (blue boxes) use up 15 dots. The 2 dots left over (red) cannot make a fourth group of 5 — that is the REMAINDER.', objects: [...gx.flatMap((_, g) => rect(rmdDot(g, 0)[0] - 0.3, RMD.y - 0.4, rmdDot(g, 4)[0] + 0.3, RMD.y + 0.4, ROLE.output, 0.04)), ...[0, 1].map((j) => dt(rmdLeft(j), ROLE.input, 0.16)), lb('remainder 2', [RMD.leftX, RMD.y - 0.95], ROLE.input)] },
      { narration: '17 ÷ 5 = 3 remainder 2, and it checks: 3 × 5 + 2 = 17. The remainder is always less than the divisor (2 < 5), otherwise another full group would fit.', objects: [lb('17 = 3 × 5 + 2', [0.0, -1.9], ROLE.result), lb('2 is less than 5', [0.0, -2.8], ROLE.input)] },
    ],
  }
}

// ── 7. Long division ─────────────────────────────────────────────────────────

/** 156 ÷ 12 = 13: 12 goes into 15 once (15 − 12 = 3), bring down the 6 to make 36, 12 goes into 36 three times (36 − 36 = 0). */
export const LDV = { dx: 0.6, cols: [0.0, 0.6, 1.2] as readonly number[], y: { q: 2.0, top: 1.1, r1: 0.2, d1: -0.7, r2: -1.4, d2: -2.3 } }

/** KG: long division works digit by digit: divide, multiply, subtract, bring down. */
export function buildLongDivisionScene(): SceneSpec {
  return framed(raw_buildLongDivisionScene())
}
function raw_buildLongDivisionScene(): SceneSpec {
  const { cols, y } = LDV
  return {
    id: 'math-long-division',
    title: 'Long division: 156 ÷ 12',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show long division of 156 by 12 as a repeated cycle: divide, multiply, subtract, bring down. 12 does not go into 1, so look at 15: it goes in once; write 1 above the 5, multiply 1 × 12 = 12, subtract 15 − 12 = 3. Bring down the next digit 6 to make 36. 12 goes into 36 three times; write 3 above the 6, multiply 3 × 12 = 36, subtract 36 − 36 = 0. The quotient is 13 with remainder 0, and the check 12 × 13 = 156 works.',
    ariaLabel:
      'A long-division layout: the divisor 12 on the left, a bracket over the dividend 156, and space above for the quotient. In the second step a green 1 is written above the 5, 12 is written under the 15 and subtracted leaving 3, and the 6 is brought down beside it to make 36. In the third step a green 3 is written above the 6 making the quotient 13, 36 is written under 36 and subtracted leaving 0, and the caption says 12 times 13 equals 156.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Set up: divisor 12 outside the bracket, dividend 156 inside. Work from the left: 12 does not go into 1, so take the first two digits, 15.', objects: [lb('12', [cols[0] - 1.1, y.top]), ln([cols[0] - 0.4, y.top + 0.4], [cols[2] + 0.4, y.top + 0.4], ROLE.reference, 0.04), ln([cols[0] - 0.4, y.top + 0.4], [cols[0] - 0.4, y.top - 0.4], ROLE.reference, 0.04), lb('1', [cols[0], y.top]), lb('5', [cols[1], y.top]), lb('6', [cols[2], y.top])] },
      { narration: '12 goes into 15 once: write 1 above the 5. Multiply 1 × 12 = 12, write it under the 15 and subtract: 15 − 12 = 3. Bring down the next digit, 6, to make 36.', objects: [lb('1', [cols[1], y.q], ROLE.result), lb('1', [cols[0], y.r1]), lb('2', [cols[1], y.r1]), lb('−', [cols[0] - 0.5, y.r1]), ln([cols[0] - 0.4, y.r1 - 0.4], [cols[1] + 0.4, y.r1 - 0.4], ROLE.reference, 0.03), lb('3', [cols[1], y.d1], ROLE.output), lb('6', [cols[2], y.d1], ROLE.input)] },
      { narration: '12 goes into 36 three times: write 3 above the 6 (the quotient is now 13). Multiply 3 × 12 = 36, subtract: 36 − 36 = 0. Nothing is left, so 156 ÷ 12 = 13 exactly. Check: 12 × 13 = 156.', objects: [lb('3', [cols[2], y.q], ROLE.result), lb('3', [cols[1], y.r2]), lb('6', [cols[2], y.r2]), lb('−', [cols[0] + 0.1, y.r2]), ln([cols[1] - 0.4, y.r2 - 0.4], [cols[2] + 0.4, y.r2 - 0.4], ROLE.reference, 0.03), lb('0', [cols[2], y.d2], ROLE.output), lb('12 × 13 = 156', [0.4, -3.2], ROLE.result)] },
    ],
  }
}

// ── 8. Exponentiation ────────────────────────────────────────────────────────

/** 2¹ … 2⁵ = 2, 4, 8, 16, 32: each power is double the one before. */
export const EXP = { ox: -3.4, dx: 1.5, oy: -2.4, scale: 0.14, n: 5, base: 2 }
export const expBar = (k: number): Pt => [EXP.ox + EXP.dx * (k - 1), EXP.oy]

/** KG: aⁿ is a multiplied by itself n times; powers of 2 double. */
export function buildExponentiationScene(): SceneSpec {
  return framed(raw_buildExponentiationScene())
}
function raw_buildExponentiationScene(): SceneSpec {
  const { dx, scale, base } = EXP
  const bar = (k: number): SceneObject[] => { const v = Math.pow(base, k), p = expBar(k); return [ln(p, [p[0], p[1] + v * scale], k === 5 ? ROLE.result : ROLE.output, 0.3), lb(String(v), [p[0], p[1] + v * scale + 0.45], ROLE.ink), lb(`2${'¹²³⁴⁵'[k - 1]}`, [p[0], p[1] - 0.45])] }
  return {
    id: 'math-exponentiation',
    title: 'Powers: repeated multiplication',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show exponentiation as repeated multiplication: 2ⁿ means n twos multiplied together. 2¹ = 2, 2² = 2 × 2 = 4, 2³ = 2 × 2 × 2 = 8, 2⁴ = 16, 2⁵ = 32. The bars show how fast powers grow: each power is DOUBLE the previous one (multiply by the base again), so the heights go 2, 4, 8, 16, 32. The small raised number, the exponent, counts the factors.',
    ariaLabel:
      'A bar chart of five bars of rising height labelled 2 to the power 1 up to 2 to the power 5, with the heights 2, 4, 8, 16 and 32 written above them. In the second step the last two bars, 16 and 32, appear. In the third step small arrows between the bar tops show times 2 at each step and a caption says 2 to the fifth equals 32.',
    stage: NO_STAGE,
    steps: [
      { narration: '2¹ = 2, 2² = 2 × 2 = 4, 2³ = 2 × 2 × 2 = 8: the exponent says how many 2s are multiplied. The bars show the values 2, 4, 8.', objects: [1, 2, 3].flatMap(bar) },
      { narration: '2⁴ = 16 and 2⁵ = 32. Each bar is twice the one before: the next power is the last one times the base.', objects: [4, 5].flatMap(bar) },
      { narration: 'Every step multiplies by 2 again, so the growth gets faster and faster: 2 → 4 → 8 → 16 → 32. So 2⁵ = 2 × 2 × 2 × 2 × 2 = 32.', objects: [...[1, 2, 3, 4].map((k) => arrow(P(expBar(k)[0] + 0.3, expBar(k)[1] + Math.pow(base, k) * scale + 0.1), P(expBar(k + 1)[0] - 0.3, expBar(k + 1)[1] + Math.pow(base, k + 1) * scale + 0.1), ROLE.input)), lb('× 2', [expBar(2)[0] + dx / 2, expBar(2)[1] + 1.9], ROLE.input), lb('2⁵ = 32', [expBar(4)[0], expBar(5)[1] + Math.pow(base, 5) * scale + 1.1], ROLE.result)] },
    ],
  }
}

// ── 9. Exponent rules ────────────────────────────────────────────────────────

/** Factors drawn as dots: a³·a² has 3 + 2 = 5 factors (a⁵); (a²)³ has 3 groups of 2 = 6 factors (a⁶); a⁵ ÷ a² cancels 2 of 5 and leaves 3 (a³). */
export const EXR = { x0: -1.2, dx: 0.5, rows: [2.2, 0.4, -1.5] as readonly number[] }
export const exrAt = (row: number, i: number): Pt => [EXR.x0 + EXR.dx * i + (row === 1 ? 0.25 * Math.floor(i / 2) : 0), EXR.rows[row]]

/** KG: aᵐ·aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ. */
export function buildExponentRulesScene(): SceneSpec {
  return framed(raw_buildExponentRulesScene())
}
function raw_buildExponentRulesScene(): SceneSpec {
  return {
    id: 'math-exponent-rules',
    title: 'Exponent rules by counting factors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the exponent rules by counting factors (each dot is one factor a). PRODUCT: a³ · a² is 3 factors followed by 2 more, 5 factors in all, so a³ · a² = a⁵: the exponents ADD (3 + 2 = 5). POWER: (a²)³ is three groups of 2 factors, 6 in all, so (a²)³ = a⁶: the exponents MULTIPLY (2 × 3 = 6). QUOTIENT: a⁵ ÷ a² cancels 2 of the 5 factors and leaves 3, so a⁵ ÷ a² = a³: the exponents SUBTRACT (5 − 2 = 3).',
    ariaLabel:
      'Three rows of dots. Top row: three blue dots followed by two red dots, five in all, captioned a cubed times a squared equals a to the fifth. Middle row: three boxes each holding two dots, six dots in all, captioned a squared, cubed, equals a to the sixth. Bottom row: five dots with the last two crossed out in red, leaving three green dots, captioned a to the fifth divided by a squared equals a cubed.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Product rule: a³ · a² is three factors of a (blue dots) times two more (red): 5 factors altogether, so a³ · a² = a⁵. Multiplying powers of the same base ADDS the exponents: 3 + 2 = 5.', objects: [...[0, 1, 2].map((i) => dt(exrAt(0, i), ROLE.output, 0.13)), ...[3, 4].map((i) => dt(exrAt(0, i), ROLE.input, 0.13)), lb('a³·a² = a⁵', [exrAt(0, 2)[0] + 2.8, EXR.rows[0]], ROLE.ink)] },
      { narration: 'Power rule: (a²)³ is three groups, each of two factors (boxes): 3 × 2 = 6 factors, so (a²)³ = a⁶. A power of a power MULTIPLIES the exponents.', objects: [...[0, 1, 2].flatMap((g) => rect(exrAt(1, 2 * g)[0] - 0.25, EXR.rows[1] - 0.3, exrAt(1, 2 * g + 1)[0] + 0.25, EXR.rows[1] + 0.3, ROLE.aid, 0.03)), ...[0, 1, 2, 3, 4, 5].map((i) => dt(exrAt(1, i), ROLE.ink, 0.12)), lb('(a²)³ = a⁶', [exrAt(1, 5)[0] + 2.2, EXR.rows[1]], ROLE.ink)] },
      { narration: 'Quotient rule: a⁵ ÷ a² cancels two of the five factors (crossed red) and leaves three, so a⁵ ÷ a² = a³. Dividing powers of the same base SUBTRACTS the exponents: 5 − 2 = 3.', objects: [...[0, 1, 2].map((i) => dt(exrAt(2, i), ROLE.result, 0.13)), ...[3, 4].map((i) => dt(exrAt(2, i), ROLE.input, 0.13)), ...[3, 4].map((i) => ln([exrAt(2, i)[0] - 0.22, EXR.rows[2] + 0.22], [exrAt(2, i)[0] + 0.22, EXR.rows[2] - 0.22], ROLE.input, 0.05)), lb('a⁵ ÷ a² = a³', [exrAt(2, 4)[0] + 2.2, EXR.rows[2]], ROLE.ink)] },
    ],
  }
}

// ── 10. Scientific notation ──────────────────────────────────────────────────

/** 4 500 000 = 4.5 × 10⁶: the decimal point moves 6 places left, from the end of the number to just after the first digit. */
export const SCN = { digits: [4, 5, 0, 0, 0, 0, 0] as readonly number[], x0: -3.0, dx: 1.0, y: 0.0 }
export const scnX = (i: number) => SCN.x0 + SCN.dx * i
export const scnGap = (g: number): Pt => [SCN.x0 + SCN.dx * g - SCN.dx / 2, SCN.y - 0.35]

/** KG: a number in scientific notation is m × 10ⁿ with 1 ≤ m < 10. */
export function buildScientificNotationScene(): SceneSpec {
  return framed(raw_buildScientificNotationScene())
}
function raw_buildScientificNotationScene(): SceneSpec {
  const { digits } = SCN, n = digits.length
  return {
    id: 'math-scientific-notation',
    title: 'Scientific notation: 4 500 000 = 4.5 × 10⁶',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to write 4 500 000 in scientific notation, m × 10ⁿ with 1 ≤ m < 10. The decimal point of a whole number sits after the last digit. Slide it left until it comes just after the FIRST digit, giving m = 4.5; count the places it moved — 6 hops — and that count is the exponent: 4 500 000 = 4.5 × 10⁶. Each hop to the left divides the number by 10, so the factor 10⁶ puts the six places back. (A very small number such as 0.00032 = 3.2 × 10⁻⁴ moves the point right and gets a negative exponent.)',
    ariaLabel:
      'The seven digits 4 5 0 0 0 0 0 in a row with a red dot after the last digit marking the decimal point. In the second step six blue hops run leftwards over the digits from that point to the gap just after the 4, where a green dot now sits. In the third step the caption reads 4.5 times 10 to the 6, and 6 places.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The number 4 500 000 (digits 4, 5, 0, 0, 0, 0, 0). Its decimal point is after the last digit (red dot).', objects: [...digits.map((d, i) => lb(String(d), [scnX(i), SCN.y + 0.3], i < 2 ? ROLE.ink : ROLE.reference)), dt(scnGap(n), ROLE.input, 0.1)] },
      { narration: 'Move the point left until it sits just after the first digit: 4.500000. That takes 6 hops (blue), one for each digit it passes: 5, 0, 0, 0, 0, 0.', objects: [...Array.from({ length: 6 }, (_, k) => hop(scnGap(n - k)[0], scnGap(n - k - 1)[0], SCN.y - 0.2, false, ROLE.output)), dt(scnGap(1), ROLE.result, 0.14)] },
      { narration: 'The mantissa is 4.5 (1 ≤ 4.5 < 10) and the point moved 6 places, so 4 500 000 = 4.5 × 10⁶. The exponent is the number of places moved; moving left gives a positive exponent.', objects: [lb('4.5 × 10⁶', [0.3, 1.9], ROLE.result), lb('6 places', [0.3, -1.9], ROLE.output)] },
    ],
  }
}

// ── 11. Percentages ──────────────────────────────────────────────────────────

/** A bar for 80 = 100%; each quarter is 25% = 20; 25% of 80 = 20 and an increase of 25% turns 80 into 100. */
export const PCT = { x0: -4.0, w: 8.0, y0: -0.4, y1: 0.4, whole: 80 }
export const pctX = (frac: number) => PCT.x0 + PCT.w * frac

/** KG: a percentage is a fraction of 100: p% of N = (p/100) × N. */
export function buildPercentageCalculationsScene(): SceneSpec {
  return framed(raw_buildPercentageCalculationsScene())
}
function raw_buildPercentageCalculationsScene(): SceneSpec {
  const { y0, y1 } = PCT
  return {
    id: 'math-percentage-calculations',
    title: 'Percentages of a whole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show percentage calculations with a bar. “Per cent” means out of 100. Let the whole bar be 80, which is 100%. Cut it into four equal quarters: each is 25% of the whole and is worth 80 ÷ 4 = 20. So 25% of 80 = 20 (the shaded quarter). A 25% increase adds that quarter: 80 + 20 = 100. In general p% of N = (p ÷ 100) × N: here 25 ÷ 100 × 80 = 20.',
    ariaLabel:
      'A long horizontal bar with the labels 100 percent and 80 above it. In the second step three vertical dividers cut it into four equal quarters, each labelled 25 percent above and 20 below. In the third step the first quarter is shaded green with the caption 25 percent of 80 equals 20, and a note that 80 plus 20 is 100.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The whole bar is 80 — that is 100% of it. “Per cent” means “out of 100”, so 100% is the whole amount.', objects: [...rect(pctX(0), y0, pctX(1), y1, ROLE.reference, 0.05), lb('100%', [pctX(0.5), y1 + 1.35], ROLE.output), lb('80', [pctX(0.5), y0 - 1.25])] },
      { narration: 'Cut the bar into 4 equal quarters. Each quarter is 100% ÷ 4 = 25% of the whole, and is worth 80 ÷ 4 = 20.', objects: [...[1, 2, 3].map((k) => ln([pctX(k / 4), y0], [pctX(k / 4), y1], ROLE.reference, 0.04)), ...[0, 1, 2, 3].map((k) => lb('25%', [pctX((k + 0.5) / 4), y1 + 0.55], ROLE.aid)), ...[0, 1, 2, 3].map((k) => lb('20', [pctX((k + 0.5) / 4), y0 - 0.55], ROLE.aid))] },
      { narration: 'So 25% of 80 is one quarter: 20 (shaded). Check with the formula: 25 ÷ 100 × 80 = 0.25 × 80 = 20. Adding that quarter to the whole is a 25% increase: 80 + 20 = 100.', objects: [ln([pctX(0) + 0.03, (y0 + y1) / 2], [pctX(0.25) - 0.03, (y0 + y1) / 2], ROLE.result, 0.5), lb('25% of 80 = 20', [pctX(0.25), -2.5], ROLE.result), lb('80 + 20 = 100', [pctX(0.75), -2.5], ROLE.output)] },
    ],
  }
}

// ── 12. Unit rate ────────────────────────────────────────────────────────────

/** 6 apples cost $12, so the unit rate is $2 per apple: the points (n, 2n) lie on a line through the origin whose slope is the unit rate. */
export const UTR = { ox: -3.6, oy: -2.6, ux: 0.75, uy: 0.4, pts: [1, 2, 3, 6] as readonly number[], rate: 2 }
export const utrAt = (n: number, cost: number): Pt => [UTR.ox + UTR.ux * n, UTR.oy + UTR.uy * cost]

/** KG: a unit rate compares a quantity to ONE of another: cost per apple, miles per hour. */
export function buildUnitRateScene(): SceneSpec {
  return framed(raw_buildUnitRateScene())
}
function raw_buildUnitRateScene(): SceneSpec {
  const { pts, rate } = UTR
  return {
    id: 'math-unit-rate',
    title: 'Unit rate: the cost of one',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a unit rate. 6 apples cost $12; the UNIT RATE is the cost of ONE apple: 12 ÷ 6 = $2 per apple. Plotting cost against the number of apples gives the points (1, 2), (2, 4), (3, 6) and (6, 12), all on one straight line through the origin; the line goes up $2 for each extra apple, so the unit rate is the SLOPE of the line, and its height at 1 apple is the unit rate itself. Once you know the rate, the cost of any number of apples is rate × number.',
    ariaLabel:
      'A graph with the number of apples along the bottom and the cost in dollars up the side. In the first step four dots at 1 apple for 2 dollars, 2 apples for 4, 3 apples for 6 and 6 apples for 12. In the second step a straight line through the origin and all four points. In the third step a violet guide at 1 apple meets the line at 2 dollars, with a green dot and the caption 2 dollars per apple.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Apples against cost: 1 apple costs 2 dollars, 2 apples 4 dollars, 3 apples 6 dollars, and 6 apples 12 dollars (dots).', objects: [arrow(P(utrAt(0, 0)[0], utrAt(0, 0)[1]), P(utrAt(7, 0)[0], utrAt(7, 0)[1]), ROLE.reference), arrow(P(utrAt(0, 0)[0], utrAt(0, 0)[1]), P(utrAt(0, 13)[0], utrAt(0, 13)[1]), ROLE.reference), ...pts.map((n) => dt(utrAt(n, rate * n), ROLE.output, 0.13)), lb('apples', [utrAt(6.4, 0)[0], utrAt(0, 0)[1] - 0.55]), lb('cost', [utrAt(0, 0)[0] - 0.7, utrAt(0, 13)[1] + 0.1])] },
      { narration: 'The points are on a straight line through the origin: cost is proportional to the number of apples (doubling the apples doubles the cost).', objects: [ln(utrAt(0, 0), utrAt(6.5, 13), ROLE.output, 0.04)] },
      { narration: 'Unit rate = 12 ÷ 6 = $2 per apple: the line is at height 2 when there is 1 apple, and rises 2 for every extra apple (its slope). Any cost is then 2 × (number of apples).', objects: [ln(utrAt(1, 0), utrAt(1, 2), ROLE.aid, 0.025), ln(utrAt(0, 2), utrAt(1, 2), ROLE.aid, 0.025), dt(utrAt(1, 2), ROLE.result, 0.2), lb('$2 per apple', [utrAt(3.3, 0)[0] + 0.0, utrAt(3.3, 9)[1]], ROLE.result), lb('12 ÷ 6 = 2', [utrAt(5, 0)[0], utrAt(0, 5)[1]], ROLE.ink)] },
    ],
  }
}

// ── 13. Estimation ───────────────────────────────────────────────────────────

/** 47 + 38: round to 50 + 40 = 90 (the estimate); the exact sum is 85, only 5 away. */
export const EST = { a: 47, b: 38, ra: 50, rb: 40, exact: 85, est: 90, x0: -4.5, u: 0.3, rows: { round: 1.4, sum: -1.6 }, lo: 30, sumLo: 80 }
export const estRoundX = (v: number) => EST.x0 + EST.u * (v - EST.lo)
export const estSumX = (v: number) => EST.x0 + 1.3 + 0.4 * (v - EST.sumLo)

/** KG: estimation: round the numbers to friendly values to get a quick, approximately right answer. */
export function buildEstimationScene(): SceneSpec {
  return framed(raw_buildEstimationScene())
}
function raw_buildEstimationScene(): SceneSpec {
  const { a, b, ra, rb, exact, est, rows } = EST
  const r = rows.round, s = rows.sum
  const roundTick = (v: number): SceneObject[] => [ln([estRoundX(v), r - 0.12], [estRoundX(v), r + 0.12], ROLE.reference, 0.03), lb(String(v), [estRoundX(v), r - 0.55])]
  const sumTick = (v: number): SceneObject[] => [ln([estSumX(v), s - 0.12], [estSumX(v), s + 0.12], ROLE.reference, 0.03), lb(String(v), [estSumX(v), s - 0.55])]
  return {
    id: 'math-estimation',
    title: 'Estimation by rounding',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show estimation with 47 + 38. Round each number to the nearest ten: 47 is closest to 50 and 38 is closest to 40 (arrows on the number line). Add the friendly numbers in your head: 50 + 40 = 90, the ESTIMATE. The exact sum is 85, so the estimate is only 5 too high — close enough to catch a big mistake (an answer like 850 or 8.5 would be obviously wrong). Estimation trades exactness for speed and a sanity check.',
    ariaLabel:
      'Top, a number line from 30 to 60 with ticks at 30, 40, 50 and 60. A white dot at 38 has a curved arrow to 40 and a white dot at 47 has a curved arrow to 50. Below, a second number line from 80 to 100 with a red dot at 90 labelled the estimate and a blue dot at 85 labelled exact, the gap between them marked 5. Captions read 47 is about 50, 38 is about 40, and 40 plus 50 equals 90.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Round to the nearest ten: 47 is 3 away from 50 but 7 from 40, so 47 ≈ 50. 38 is 2 away from 40, so 38 ≈ 40 (arrows).', objects: [ln([estRoundX(30), r], [estRoundX(60), r], ROLE.reference, 0.04), ...[30, 40, 50, 60].flatMap(roundTick), dt([estRoundX(a), r], ROLE.ink, 0.12), dt([estRoundX(b), r], ROLE.ink, 0.12), hop(estRoundX(a), estRoundX(ra), r, true, ROLE.output), hop(estRoundX(b), estRoundX(rb), r, true, ROLE.output), lb('47 → 50', [estRoundX(a) + 0.6, r + 1.1], ROLE.output), lb('38 → 40', [estRoundX(b) - 0.6, r + 1.1], ROLE.output)] },
      { narration: 'Add the friendly numbers: 40 + 50 = 90. This is the estimate of 47 + 38.', objects: [ln([estSumX(80), s], [estSumX(100), s], ROLE.reference, 0.04), ...[80, 85, 90, 95, 100].flatMap(sumTick), dt([estSumX(est), s], ROLE.input, 0.18), lb('40 + 50 = 90', [estSumX(est) + 0.9, s + 0.9], ROLE.input)] },
      { narration: 'The exact sum 47 + 38 = 85 is only 5 away from the estimate 90 — the rounding errors (+3 and +2) added up to 5. A quick estimate shows the exact answer should be near 90, so it would catch an error like 850 or 8.5.', objects: [dt([estSumX(exact), s], ROLE.output, 0.18), lb('exact 85', [estSumX(exact) - 0.9, s + 0.9], ROLE.output), lb('5 off', [(estSumX(exact) + estSumX(est)) / 2, s - 1.3], ROLE.ink)] },
    ],
  }
}
