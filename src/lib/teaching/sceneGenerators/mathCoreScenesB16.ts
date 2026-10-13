/**
 * Core school-mathematics figures — batch 16 of the mathematics visual campaign
 * (2026-10-12): arithmetic. Counting as a one-to-one pairing, subitizing, expanded form,
 * the multiplication table, long multiplication, fraction multiplication and division,
 * mixed numbers, proportion, rounding, square numbers, cube numbers and square roots.
 *
 * Same rules as batches 1-15: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects, and every number drawn
 * comes from the constants and pure helpers exported here, which the test file re-derives from
 * the DRAWN coordinates. An element is a small dot with its numeral BESIDE it and a highlight
 * is a larger coloured dot — the label solver pushes numerals off anything they overlap.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, polyLines, type XY } from './mathSceneKit'

type XYr = readonly [number, number]
const rectLines = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.03): SceneObject[] => polyLines([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], color, t)
const sup = (n: number) => n.toString().replace(/[0-9]/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)])
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

// ── 1. Counting ──────────────────────────────────────────────────────────────

/** Six objects paired one-to-one with 1…6 (left to right), then with a shuffled run of the same numbers: the last number is always 6. */
export const CNT = { n: 6, dx: 1.2, yDots: 1.4, yNum: -0.6, yTop: 3.0, order: [3, 6, 1, 5, 2, 4] as readonly number[] }
export const cntX = (i: number) => (i - (CNT.n - 1) / 2) * CNT.dx

/** KG: counting establishes a bijection between a finite set and {1, …, n}; n is its size, in whatever order you count. */
export function buildCountingScene(): SceneSpec {
  return framed(raw_buildCountingScene())
}
function raw_buildCountingScene(): SceneSpec {
  const { n, yDots, yNum, yTop, order } = CNT
  const idx = Array.from({ length: n }, (_, i) => i)
  return {
    id: 'math-counting',
    title: 'Counting: one number for each object',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show counting as a one-to-one pairing of objects with 1, 2, …, n: each object gets exactly one number and each number is used once, the last number used (6) is the size of the set, and counting the same objects in another order still ends at 6.',
    ariaLabel:
      'Six red dots in a row, each joined by a short violet line to a numeral below it, the numerals running 1 to 6 from left to right. A green bracket under the numerals is labelled count 6. Above the dots a second row of numerals gives the same six numbers in a different order, 3, 6, 1, 5, 2, 4, each joined to a dot; the caption says another order, still 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Six objects (red). Counting pairs each object with one number — 1, 2, 3, … — using each number once and every object once.', objects: [...idx.map((i) => dot(P(cntX(i), yDots), ROLE.input, 0.17)), ...idx.map((i) => guide(P(cntX(i), yDots - 0.3), P(cntX(i), yNum + 0.35), ROLE.aid, 0.025)), ...idx.map((i) => label(String(i + 1), P(cntX(i), yNum), ROLE.ink, 'primary'))] },
      { narration: 'The last number you reach, 6, says how many objects there are: the size of the set. No object is skipped and none is counted twice.', objects: [line(P(cntX(0) - 0.4, yNum - 0.55), P(cntX(n - 1) + 0.4, yNum - 0.55), ROLE.result, 0.045), label('count: 6', P(0, yNum - 1.2), ROLE.result, 'primary')] },
      { narration: 'Count the same six objects in a different order (3, 6, 1, 5, 2, 4): every object still gets one number and every number 1 to 6 is used once, so the answer is the same — the count does not depend on the order.', objects: [...idx.map((i) => guide(P(cntX(i), yDots + 0.3), P(cntX(i), yTop - 0.35), ROLE.aid, 0.025)), ...idx.map((i) => label(String(order[i]), P(cntX(i), yTop), ROLE.output, 'primary')), label('another order: still 6', P(0, yTop + 0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Subitizing ────────────────────────────────────────────────────────────

/** Dice-style patterns for 1…4 are seen at a glance; seven dots are read as two chunks, 4 + 3. */
export const SUBI = {
  box: 1.7, cx: [-3.6, -1.2, 1.2, 3.6] as readonly number[], cy: 1.4, d: 0.42, margin: 0.45,
  A: [[-2.5, -1.4], [-1.6, -1.1], [-1.2, -2.0], [-2.2, -2.3]] as readonly XYr[],
  B: [[1.4, -1.3], [2.4, -1.8], [1.8, -2.5]] as readonly XYr[],
}
export const diceOffsets = (k: number): XY[] => {
  const d = SUBI.d
  return k === 1 ? [[0, 0]] : k === 2 ? [[-d, -d], [d, d]] : k === 3 ? [[-d, -d], [0, 0], [d, d]] : [[-d, -d], [d, -d], [-d, d], [d, d]]
}
const bracketOf = (pts: readonly XYr[]): [number, number, number, number] => {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), m = SUBI.margin
  return [Math.min(...xs) - m, Math.min(...ys) - m, Math.max(...xs) + m, Math.max(...ys) + m]
}

/** KG: subitizing is the instant perception of a small quantity (up to 4) without counting; bigger quantities are seen as chunks. */
export function buildSubitizingScene(): SceneSpec {
  return framed(raw_buildSubitizingScene())
}
function raw_buildSubitizingScene(): SceneSpec {
  const { box, cx, cy } = SUBI
  const [ax0, ay0, ax1, ay1] = bracketOf(SUBI.A), [bx0, by0, bx1, by1] = bracketOf(SUBI.B)
  return {
    id: 'math-subitizing',
    title: 'Subitizing: seeing small numbers at a glance',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show subitizing: the patterns for 1, 2, 3 and 4 are recognised instantly, without counting; seven scattered dots are not, but the eye reads them as two small groups, 4 + 3 = 7 — each group within the subitizing range.',
    ariaLabel:
      'Top row: four boxes showing dice-style dot patterns of one, two, three and four blue dots, with the numerals 1, 2, 3 and 4 under them and the caption up to 4 at a glance. Bottom: seven red dots scattered in two clusters. Green brackets circle a cluster of four and a cluster of three, and the caption reads four plus three equals seven.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Patterns of 1, 2, 3 and 4 dots are recognised instantly — you do not count them. This is subitizing, and it works up to about 4.', objects: [...cx.flatMap((x, k) => [...rectLines(x - box / 2, cy - box / 2, x + box / 2, cy + box / 2, ROLE.reference, 0.03), ...diceOffsets(k + 1).map((o) => dot(P(x + o[0], cy + o[1]), ROLE.output, 0.15)), label(String(k + 1), P(x, cy - box / 2 - 0.35), ROLE.ink, 'primary')]), label('up to 4: at a glance', P(0, cy + box / 2 + 0.6), ROLE.output, 'primary')] },
      { narration: 'Seven dots scattered like this cannot be seen as "seven" at a glance: you have to count them.', objects: [...[...SUBI.A, ...SUBI.B].map((p) => dot(P(p[0], p[1]), ROLE.input, 0.15)), label('7: count in groups', P(0, -3.2), ROLE.input, 'primary')] },
      { narration: 'But the eye splits them into two groups it CAN see at a glance: 4 dots and 3 dots. 4 + 3 = 7 — big quantities are subitized in chunks.', objects: [...rectLines(ax0, ay0, ax1, ay1, ROLE.result, 0.04), ...rectLines(bx0, by0, bx1, by1, ROLE.result, 0.04), label('4', P(ax0 - 0.3, (ay0 + ay1) / 2), ROLE.result, 'primary'), label('3', P(bx1 + 0.3, (by0 + by1) / 2), ROLE.result, 'primary'), label('4 + 3 = 7', P(0, -3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Expanded form ─────────────────────────────────────────────────────────

/** 345 = 3 × 100 + 4 × 10 + 5 × 1 as three stacks of counters, one counter of the place's value per unit of the digit. */
export const EXPF = {
  cols: [{ x: -3.4, d: 3, pow: 2 }, { x: 0, d: 4, pow: 1 }, { x: 3.4, d: 5, pow: 0 }] as ReadonlyArray<{ x: number; d: number; pow: number }>,
  r: 0.2, step: 0.55, base: -0.4,
  /** The three products are staggered so neighbours never touch. */
  termY: [-2.0, -2.7, -2.0] as readonly number[],
}

/** KG: a number is the sum of each digit times its power of 10: 345 = 300 + 40 + 5. */
export function buildExpandedFormScene(): SceneSpec {
  return framed(raw_buildExpandedFormScene())
}
function raw_buildExpandedFormScene(): SceneSpec {
  const { cols, r, step, base, termY } = EXPF
  const colour = [ROLE.output, ROLE.input, ROLE.aid]
  const value = cols.reduce((s, c) => s + c.d * 10 ** c.pow, 0)
  return {
    id: 'math-expanded-form',
    title: 'Expanded form: each digit times its place value',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show expanded form: 345 is 3 hundreds, 4 tens and 5 ones — three stacks of counters worth 100, 10 and 1 each — so 345 = 3 × 100 + 4 × 10 + 5 × 1 = 300 + 40 + 5.',
    ariaLabel:
      'Three stacks of counters under the number 345: a blue stack of three over the heading ten squared, a red stack of four over ten to the first, and a violet stack of five over ten to the zero. Under each heading is the product: three times 100 is 300, four times 10 is 40, five times 1 is 5. A green line underneath says 345 equals 300 plus 40 plus 5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The digits of 345: a stack of 3 counters in the hundreds place, 4 in the tens, 5 in the ones. Each place is worth ten times the one to its right: 10², 10¹, 10⁰.', objects: [label(String(value), P(0, 3.6), ROLE.ink, 'heading'), ...cols.flatMap((c, k) => [...Array.from({ length: c.d }, (_, j) => dot(P(c.x, base + j * step), colour[k], r)), label(`10${sup(c.pow)}`, P(c.x, -1.2), colour[k], 'primary')])] },
      { narration: 'Each counter in a stack is worth that place: 3 × 100 = 300, 4 × 10 = 40, 5 × 1 = 5.', objects: cols.map((c, k) => label(`${c.d} × ${10 ** c.pow} = ${c.d * 10 ** c.pow}`, P(c.x, termY[k]), colour[k], 'primary')) },
      { narration: 'Add the three values to get the number back: 345 = 300 + 40 + 5. Expanded form is the number split by place value.', objects: [label(`${value} = ${cols.map((c) => c.d * 10 ** c.pow).join(' + ')}`, P(0, -3.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Multiplication table ──────────────────────────────────────────────────

/** The 12 × 12 table as a grid of cells; the 7-by-8 and the 8-by-7 rectangles each hold 56 cells. */
export const MULT = { n: 12, u: 0.4, x0: -3.4, y0: -2.4, a: 7, b: 8 }

/** KG: the table of products 1 × 1 … 12 × 12; a product is the number of cells in a rectangle, and a × b = b × a. */
export function buildMultiplicationTableScene(): SceneSpec {
  return framed(raw_buildMultiplicationTableScene())
}
function raw_buildMultiplicationTableScene(): SceneSpec {
  const { n, u, x0, y0, a, b } = MULT
  const idx = Array.from({ length: n + 1 }, (_, i) => i)
  const grid: SceneObject[] = [...idx.map((i) => line(P(x0 + i * u, y0), P(x0 + i * u, y0 + n * u), ROLE.reference, 0.012)), ...idx.map((i) => line(P(x0, y0 + i * u), P(x0 + n * u, y0 + i * u), ROLE.reference, 0.012))]
  const ticks = [1, 7, 8, 12]
  const inset = 0.04
  return {
    id: 'math-multiplication-table',
    title: 'The multiplication table as rectangles of cells',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the 12 × 12 multiplication table as a grid: the entry for row r and column c is the number of cells in the r-by-c rectangle from the corner, so 7 × 8 is a 7-by-8 rectangle of 56 cells; turning it over the diagonal gives the 8-by-7 rectangle with the same 56 cells, so 7 × 8 = 8 × 7.',
    ariaLabel:
      'A twelve by twelve grid of cells with some rows and columns numbered. A green rectangle covering 8 columns and 7 rows from the bottom left corner is labelled 7 times 8 equals 56. A blue rectangle covering 7 columns and 8 rows is the mirror image across a violet diagonal, labelled 8 times 7 equals 56, and the caption mirror.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The 12 × 12 table: column c and row r meet in a cell, and the product c × r is the number of cells in the rectangle from the corner out to that cell.', objects: [...grid, ...ticks.map((k) => label(String(k), P(x0 + (k - 0.5) * u, y0 - 0.3), ROLE.ink, 'detail')), ...ticks.map((k) => label(String(k), P(x0 - 0.3, y0 + (k - 0.5) * u), ROLE.ink, 'detail'))] },
      { narration: 'The 7-by-8 rectangle (7 rows, 8 columns) holds 7 × 8 = 56 cells: that is the table entry for 7 and 8 — worth memorising.', objects: [...rectLines(x0, y0, x0 + b * u, y0 + a * u, ROLE.result, 0.06), label(`${a} × ${b} = ${a * b}`, P(3.5, 0.8), ROLE.result, 'primary')] },
      { narration: 'Flip it over the diagonal and the 7 rows become 7 columns: an 8-by-7 rectangle with the same 56 cells, so 8 × 7 = 7 × 8. Every product in the table appears twice, mirrored across the diagonal.', objects: [line(P(x0, y0), P(x0 + n * u, y0 + n * u), ROLE.aid, 0.03), ...rectLines(x0 + inset, y0 + inset, x0 + a * u - inset, y0 + b * u - inset, ROLE.output, 0.04), label(`${b} × ${a} = ${a * b}`, P(3.5, 0.0), ROLE.output, 'primary'), label('mirror', P(3.5, -0.8), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 5. Long multiplication ───────────────────────────────────────────────────

/** 23 × 14: partial products 23 × 4 = 92 and 23 × 10 = 230, aligned by place value, added to 322. */
export const LONG = {
  col: { H: -0.6, T: 0.2, O: 1.0 } as Record<'H' | 'T' | 'O', number>,
  row: { a: 2.4, b: 1.6, p1: 0.4, p2: -0.4, tot: -1.5, carry: 3.0, head: 3.7 },
  lineY: [1.05, -0.95] as readonly number[], lineX: [-1.9, 1.5] as readonly number[],
  mul: [23, 14] as readonly number[],
}
const PLACES = ['O', 'T', 'H'] as const
const numeral = (value: number, y: number, color: string): SceneObject[] =>
  String(value).split('').reverse().map((ch, k) => label(ch, P(LONG.col[PLACES[k]], y), color, 'primary'))

/** KG: the standard algorithm — partial products aligned by place value, then added. */
export function buildLongMultiplicationScene(): SceneSpec {
  return framed(raw_buildLongMultiplicationScene())
}
function raw_buildLongMultiplicationScene(): SceneSpec {
  const { row, lineX, lineY, mul } = LONG
  const [a, b] = mul
  const p1 = a * (b % 10), p2 = a * 10 * Math.floor(b / 10)
  return {
    id: 'math-long-multiplication',
    title: 'Long multiplication: partial products by place value',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show long multiplication of 23 × 14: multiply 23 by the ones digit 4 (3 × 4 = 12, write 2 carry 1, 2 × 4 + 1 = 9 giving 92), then by the tens digit 1 as 230 (the 0 holds the ones place), and add the aligned partial products: 92 + 230 = 322 = 23 × 14.',
    ariaLabel:
      'The sum 23 times 14 written in columns headed H, T and O for hundreds, tens and ones, with a line under it. Below the line the first partial product 92 in blue, with a small carried 1 above the tens digit of 23, and the second partial product 230 in violet shifted one place left, then a second line and the total 322 in green. The ones digits of every row are in the same column. Captions read 23 times 4, 23 times 10 and 92 plus 230 equals 322.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Write 23 above 14 with the ones digits in one column (O), tens in the next (T), hundreds in the last (H). Multiply 23 by each digit of 14 in turn.', objects: [...(['H', 'T', 'O'] as const).map((k) => label(k, P(LONG.col[k], row.head), ROLE.reference, 'detail')), ...numeral(a, row.a, ROLE.ink), ...numeral(b, row.b, ROLE.ink), label('×', P(-1.4, row.b), ROLE.ink, 'primary'), line(P(lineX[0], lineY[0]), P(lineX[1], lineY[0]), ROLE.reference, 0.03)] },
      { narration: 'First multiply by the ones digit 4: 3 × 4 = 12, write 2 and carry 1; 2 × 4 = 8, plus the carried 1 is 9. The first partial product is 92.', objects: [label('1', P(LONG.col.T, row.carry), ROLE.aid, 'detail'), ...numeral(p1, row.p1, ROLE.output), label(`${a} × ${b % 10}`, P(3.0, row.p1), ROLE.output, 'primary')] },
      { narration: 'Now multiply by the tens digit 1, which really means 10: 23 × 10 = 230. Write it one place to the left — the 0 holds the ones place — then add the columns: 92 + 230 = 322, and 23 × 14 = 322.', objects: [...numeral(p2, row.p2, ROLE.aid), label(`${a} × ${10 * Math.floor(b / 10)}`, P(3.0, row.p2), ROLE.aid, 'primary'), line(P(lineX[0], lineY[1]), P(lineX[1], lineY[1]), ROLE.reference, 0.03), ...numeral(a * b, row.tot, ROLE.result), label(`${p1} + ${p2} = ${a * b}`, P(3.3, row.tot), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Multiplying and dividing fractions ────────────────────────────────────

/** Area model of 2/3 × 3/4 = 6/12 on a 4-by-3 grid, and the bar model of 3/4 ÷ 3/8 = 2. */
export const FM = {
  cw: 0.8, ch: 0.8, cols: 4, rows: 3, x0: -4.2, y0: -1.6, ext: 0.12,
  bar: { x0: 0.8, L: 3.8, yWhole: 1.2, yFrac: 0.2, yPieces: -0.8 },
}

/** KG: multiply numerators and denominators; divide by multiplying by the reciprocal of the divisor. */
export function buildFractionMultiplicationScene(): SceneSpec {
  return framed(raw_buildFractionMultiplicationScene())
}
function raw_buildFractionMultiplicationScene(): SceneSpec {
  const { cw, ch, cols, rows, x0, y0, ext, bar } = FM
  const cell = (c: number, r: number): XYr => [x0 + (c + 0.5) * cw, y0 + (r + 0.5) * ch]
  const grid: SceneObject[] = [
    ...Array.from({ length: cols + 1 }, (_, i) => line(P(x0 + i * cw, y0), P(x0 + i * cw, y0 + rows * ch), ROLE.reference, 0.015)),
    ...Array.from({ length: rows + 1 }, (_, j) => line(P(x0, y0 + j * ch), P(x0 + cols * cw, y0 + j * ch), ROLE.reference, 0.015)),
  ]
  const cells = Array.from({ length: cols * rows }, (_, k) => cell(k % cols, Math.floor(k / cols)))
  const both: XYr[] = []
  for (let c = 0; c < 3; c++) for (let r = 0; r < 2; r++) both.push(cell(c, r))
  const L = bar.L, bx = bar.x0
  const eighths = Array.from({ length: 9 }, (_, k) => line(P(bx + (k * L) / 8, bar.yWhole - 0.18), P(bx + (k * L) / 8, bar.yWhole + 0.18), ROLE.reference, 0.02))
  return {
    id: 'math-fraction-multiplication',
    title: 'Multiplying and dividing fractions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show 2/3 × 3/4 = 6/12 = 1/2 on a 4-by-3 grid: 3/4 of the width and 2/3 of the height overlap in 3 × 2 = 6 of the 4 × 3 = 12 cells (numerators multiply, denominators multiply); and 3/4 ÷ 3/8 = 2 on a bar: two pieces of 3/8 fit in 3/4, which is 3/4 × 8/3 = 2 (divide by multiplying by the reciprocal).',
    ariaLabel:
      'Left: a grid of 4 columns and 3 rows of cells. A blue rectangle covers the left 3 columns and a red rectangle covers the bottom 2 rows; the 6 cells where they overlap have green dots, labelled 6 of 12 cells, and the caption reads 2/3 times 3/4 equals 1/2. Right: a bar for one whole marked in eighths, a blue bar of three quarters, and two green pieces of three eighths that exactly fill it, with the caption 3/4 divided by 3/8 equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A rectangle 4 cells wide and 3 cells high stands for one whole: 12 equal cells.', objects: [...grid, ...cells.map((p) => dot(P(p[0], p[1]), ROLE.reference, 0.08))] },
      { narration: '3/4 of the width is the left 3 columns (blue); 2/3 of the height is the bottom 2 rows (red). The part that is both is 3/4 of 2/3 of the whole.', objects: [...rectLines(x0, y0 - ext, x0 + 3 * cw, y0 + rows * ch + ext, ROLE.output, 0.045), ...rectLines(x0 - ext, y0, x0 + cols * cw + ext, y0 + 2 * ch, ROLE.input, 0.045), label('3/4 wide', P(x0 + 1.5 * cw, y0 + rows * ch + 0.5), ROLE.output, 'primary'), label('2/3 high', P(-2.6, -2.3), ROLE.input, 'primary')] },
      { narration: 'The overlap is 3 × 2 = 6 cells out of 4 × 3 = 12: numerators multiply (2 × 3 = 6) and denominators multiply (3 × 4 = 12), 2/3 × 3/4 = 6/12 = 1/2. To DIVIDE, 3/4 ÷ 3/8 asks how many 3/8 fit in 3/4: two pieces, and 3/4 × 8/3 = 24/12 = 2.', objects: [...both.map((p) => dot(P(p[0], p[1]), ROLE.result, 0.16)), label('6 of 12 cells', P(-2.6, -3.0), ROLE.result, 'primary'), label('2/3 × 3/4 = 1/2', P(-2.6, -3.7), ROLE.result, 'primary'), line(P(bx, bar.yWhole), P(bx + L, bar.yWhole), ROLE.reference, 0.04), ...eighths, label('whole', P(bx + L / 2, bar.yWhole + 0.5), ROLE.reference, 'primary'), line(P(bx, bar.yFrac), P(bx + 0.75 * L, bar.yFrac), ROLE.output, 0.09), line(P(bx, bar.yPieces), P(bx + 0.375 * L - 0.04, bar.yPieces), ROLE.result, 0.09), line(P(bx + 0.375 * L + 0.04, bar.yPieces), P(bx + 0.75 * L, bar.yPieces), ROLE.result, 0.09), label('(3/4) ÷ (3/8) = 2', P(bx + L / 2, -1.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Mixed numbers ─────────────────────────────────────────────────────────

/** 3½ drawn as three whole bars and a half bar, then regrouped into seven half bars: 3½ = 7/2. */
export const MIX = { U: 1.6, gap: 0.12, x0: -3.2, y1: 1.0, y2: -0.7, th: 0.17 }

/** KG: a mixed number is a whole part plus a proper fraction; 3½ = (3 × 2 + 1)/2 = 7/2. */
export function buildMixedNumbersScene(): SceneSpec {
  return framed(raw_buildMixedNumbersScene())
}
function raw_buildMixedNumbersScene(): SceneSpec {
  const { U, gap, x0, y1, y2, th } = MIX
  const wholes = [0, 1, 2].map((i) => line(P(x0 + i * (U + gap), y1), P(x0 + i * (U + gap) + U, y1), ROLE.output, th))
  const half = line(P(x0 + 3 * (U + gap), y1), P(x0 + 3 * (U + gap) + U / 2, y1), ROLE.input, th)
  const halves = Array.from({ length: 7 }, (_, i) => line(P(x0 + i * (U / 2 + gap), y2), P(x0 + i * (U / 2 + gap) + U / 2, y2), i < 6 ? ROLE.output : ROLE.input, th))
  return {
    id: 'math-mixed-numbers',
    title: 'Mixed numbers: wholes plus a fraction',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show 3½ as three whole bars and one half bar, then cut every whole in two: that is 7 half-bars, so 3½ = 7/2 (3 × 2 + 1 = 7 halves); going back, 7 ÷ 2 = 3 remainder 1 gives 3 wholes and a half.',
    ariaLabel:
      'Top: three blue bars of equal length and one red bar half as long, labelled 3 and a half, captioned 3 wholes and a half. Below: seven equal bars, six blue and one red, each the length of the half bar, labelled 7 halves. Captions give the conversion 3 times 2 plus 1 equals 7, and 7 divided by 2 equals 3 remainder 1.',
    stage: NO_STAGE,
    steps: [
      { narration: '3½ is a mixed number: 3 whole bars (blue) and a half bar (red) — a whole part plus a proper fraction.', objects: [...wholes, half, label('3½', P(-4.5, y1), ROLE.ink, 'primary'), label('3 wholes and a half', P(0, 1.9), ROLE.ink, 'primary')] },
      { narration: 'Cut every whole bar into two halves: the same length is now 3 × 2 = 6 halves, plus the 1 half already there — 7 halves in all.', objects: [...halves, label('7/2', P(-4.5, y2), ROLE.ink, 'primary'), label('7 halves', P(0, -1.4), ROLE.ink, 'primary')] },
      { narration: 'Mixed to improper: whole × denominator + numerator, (3 × 2 + 1)/2 = 7/2. Improper to mixed: divide, 7 ÷ 2 = 3 remainder 1, so 3 wholes and 1/2 left over.', objects: [label('3 × 2 + 1 = 7', P(0, -2.2), ROLE.result, 'primary'), label('7 ÷ 2 = 3 r 1', P(0, -2.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Proportion ────────────────────────────────────────────────────────────

/** Two rectangles in the ratio 3 : 4 and 6 : 8 (scale u), the equation 3/4 = 6/8, and the cross products 3 × 8 = 24 = 4 × 6. */
export const PROP = { u: 0.45, r1: { w: 3, h: 4, x0: -4.0, y0: -2.4 }, r2: { w: 6, h: 8, x0: -1.2, y0: -2.4 } }

/** KG: a proportion states that two ratios are equal, a/b = c/d, which holds exactly when ad = bc. */
export function buildProportionScene(): SceneSpec {
  return framed(raw_buildProportionScene())
}
function raw_buildProportionScene(): SceneSpec {
  const { u, r1, r2 } = PROP
  const box = (r: typeof r1, color: string) => [...rectLines(r.x0, r.y0, r.x0 + r.w * u, r.y0 + r.h * u, color, 0.04), line(P(r.x0, r.y0), P(r.x0 + r.w * u, r.y0 + r.h * u), ROLE.aid, 0.025), label(String(r.w), P(r.x0 + (r.w * u) / 2, r.y0 - 0.35), color, 'primary'), label(String(r.h), P(r.x0 - 0.35, r.y0 + (r.h * u) / 2), color, 'primary')]
  return {
    id: 'math-proportion',
    title: 'Proportion: two equal ratios',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a proportion: a 3-by-4 rectangle and a 6-by-8 rectangle have the same shape (3 : 4 = 6 : 8, so 3/4 = 6/8 = 0.75, and their diagonals have the same slope); equal ratios give equal cross products, 3 × 8 = 24 = 4 × 6, which is how an unknown term in a proportion is found.',
    ariaLabel:
      'A small blue rectangle 3 wide and 4 high and a larger red rectangle 6 wide and 8 high, each with a violet diagonal that runs at the same angle, captioned 3 to 4 and 6 to 8. Beside them the equation 3 over 4 equals 6 over 8 with both 0.75, and the cross products 3 times 8 equals 24 and 4 times 6 equals 24.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two rectangles: 3 wide by 4 high, and 6 wide by 8 high. Their sides are in the same ratio, and their diagonals lie at the same angle — the second is the first scaled up, same shape.', objects: [...box(r1, ROLE.output), ...box(r2, ROLE.input), label('3 : 4', P(r1.x0 + (r1.w * u) / 2, r1.y0 + r1.h * u + 0.4), ROLE.output, 'primary'), label('6 : 8', P(r2.x0 + (r2.w * u) / 2, r2.y0 + r2.h * u + 0.4), ROLE.input, 'primary')] },
      { narration: 'Equal ratios make a proportion: 3/4 = 6/8, and both equal 0.75.', objects: [label('3/4 = 6/8', P(3.3, 0.2), ROLE.result, 'primary'), label('both 0.75', P(3.3, -0.6), ROLE.result, 'primary')] },
      { narration: 'Cross-multiplying checks it, and solves for a missing term: 3 × 8 = 24 and 4 × 6 = 24 — in a proportion a/b = c/d the cross products ad and bc are always equal.', objects: [label('3 × 8 = 24', P(3.3, -1.5), ROLE.result, 'primary'), label('4 × 6 = 24', P(3.3, -2.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Rounding ──────────────────────────────────────────────────────────────

/** Rounding to the nearest tenth on the stretch 3.40-3.50: 3.44 → 3.4, 3.46 → 3.5, and the halfway 3.45 rounds up to 3.5. */
export const RND = { lo: 3.4, hi: 3.5, xa: -4, xb: 4, y: 0 }
export const rx = (v: number) => RND.xa + ((v - RND.lo) / (RND.hi - RND.lo)) * (RND.xb - RND.xa)
/** Round a value given in hundredths to the nearest tenth, halves going up (integer arithmetic, no float surprises). */
export const roundTenth = (hundredths: number) => Math.floor((hundredths + 5) / 10) * 10

/** KG: rounding replaces a number by the nearest representable value; at the halfway point the convention is to round up. */
export function buildRoundingScene(): SceneSpec {
  return framed(raw_buildRoundingScene())
}
function raw_buildRoundingScene(): SceneSpec {
  const { y } = RND
  const ticks = Array.from({ length: 11 }, (_, k) => { const tall = k % 5 === 0, h = tall ? 0.28 : 0.14, x = rx(3.4 + k / 100); return line(P(x, y - h), P(x, y + h), ROLE.reference, 0.025) })
  return {
    id: 'math-rounding',
    title: 'Rounding to the nearest tenth',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show rounding on a number line between 3.40 and 3.50: a number goes to whichever tenth is nearer — 3.44 is 0.04 from 3.40 and 0.06 from 3.50 so it rounds down to 3.4, 3.46 rounds up to 3.5 — and 3.45, exactly halfway, is rounded up by convention to 3.5.',
    ariaLabel:
      'A number line from 3.40 to 3.50 with a tick for every hundredth and the ends and the middle labelled 3.40, 3.45 and 3.50. A red dot at 3.44 has a red arrow to 3.40, labelled 3.44 to 3.4, and a blue dot at 3.46 has a blue arrow to 3.50, labelled 3.46 to 3.5. A green dot at 3.45, the exact middle, has a green arrow to 3.50, labelled halfway rounds up. The heading says nearest tenth.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Round to the nearest tenth: the candidates are 3.40 and 3.50, with 3.45 exactly halfway between them. Two numbers to round: 3.44 (red) and 3.46 (blue).', objects: [line(P(RND.xa - 0.4, y), P(RND.xb + 0.4, y), ROLE.reference, 0.03), ...ticks, label('3.40', P(RND.xa, y - 0.75), ROLE.ink, 'primary'), label('3.45', P(0, y - 0.75), ROLE.ink, 'primary'), label('3.50', P(RND.xb, y - 0.75), ROLE.ink, 'primary'), dot(P(rx(3.44), y), ROLE.input, 0.14), dot(P(rx(3.46), y), ROLE.output, 0.14), label('nearest tenth', P(0, 3.3), ROLE.ink, 'primary')] },
      { narration: 'Each goes to the nearer tenth: 3.44 is 0.04 from 3.40 but 0.06 from 3.50, so it rounds DOWN to 3.4; 3.46 is 0.04 from 3.50, so it rounds UP to 3.5.', objects: [arrow(P(rx(3.44), 0.6), P(rx(3.4), 0.6), ROLE.input), arrow(P(rx(3.46), 0.6), P(rx(3.5), 0.6), ROLE.output), label('3.44 → 3.4', P(rx(3.42), 1.25), ROLE.input, 'primary'), label('3.46 → 3.5', P(rx(3.48), 1.25), ROLE.output, 'primary')] },
      { narration: '3.45 is exactly the same distance, 0.05, from both. A tie has to be broken by a rule, and the usual one is to round half UP: 3.45 → 3.5.', objects: [dot(P(rx(3.45), y), ROLE.result, 0.14), arrow(P(rx(3.45), 1.95), P(rx(3.5), 1.95), ROLE.result), label('halfway: rounds up', P(rx(3.45), 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Square numbers ───────────────────────────────────────────────────────

/** A 5 × 5 array of dots coloured by L-shaped layer: the layers hold 1, 3, 5, 7, 9 dots, so 1 + 3 + 5 + 7 + 9 = 25 = 5². */
export const SQN = { n: 5, s: 0.55, x0: -4.0, y0: -1.4, colors: [ROLE.output, ROLE.input, ROLE.aid, ROLE.result, ROLE.ink] as readonly string[] }
export const layerOf = (i: number, j: number) => Math.max(i, j)

/** KG: the perfect squares n² = 1, 4, 9, 16, 25, …; each new square adds an L-shaped layer of the next odd number of dots. */
export function buildSquareNumbersScene(): SceneSpec {
  return framed(raw_buildSquareNumbersScene())
}
function raw_buildSquareNumbersScene(): SceneSpec {
  const { n, s, x0, y0, colors } = SQN
  const dotsAll: SceneObject[] = []
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) dotsAll.push(dot(P(x0 + i * s, y0 + j * s), colors[layerOf(i, j)], 0.13))
  const nested = Array.from({ length: n }, (_, k) => rectLines(x0 - 0.25, y0 - 0.25, x0 + k * s + 0.25, y0 + k * s + 0.25, ROLE.reference, 0.02)).flat()
  const squares = Array.from({ length: n }, (_, k) => label(`${k + 1}${sup(2)} = ${(k + 1) ** 2}`, P(1.6, 1.4 - k * 0.6), colors[k], 'primary'))
  return {
    id: 'math-square-numbers',
    title: 'Perfect squares: n × n dots',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the perfect squares as square arrays of dots: n rows of n dots hold n² dots (1, 4, 9, 16, 25), and each bigger square is the previous one plus an L-shaped layer of the next odd number of dots (3, 5, 7, 9), so 1 + 3 + 5 + 7 + 9 = 25 = 5².',
    ariaLabel:
      'A 5 by 5 array of dots coloured in L-shaped layers: one blue dot in the corner, then a red layer of 3, a violet layer of 5, a green layer of 7 and a white layer of 9. Nested outlines mark the squares of side 1 to 5, and a list beside them reads 1 squared equals 1, 2 squared equals 4, up to 5 squared equals 25. A caption adds that 1 plus 3 plus 5 plus 7 plus 9 equals 25.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A 5 × 5 array of dots: 5 rows of 5 is 25 dots. Colour it in L-shaped layers growing out from the corner dot.', objects: dotsAll },
      { narration: 'Nested squares: 1 × 1 holds 1 dot, 2 × 2 holds 4, 3 × 3 holds 9, 4 × 4 holds 16, 5 × 5 holds 25 — the perfect squares n².', objects: [...nested, ...squares] },
      { narration: 'Each layer is an L of the next odd number of dots — 1, 3, 5, 7, 9 — so n² is the sum of the first n odd numbers: 1 + 3 + 5 + 7 + 9 = 25.', objects: [label('1 + 3 + 5 + 7 + 9 = 25', P(1.5, -2.2), ROLE.result, 'primary'), label('n² = 1 + 3 + … + (2n − 1)', P(1.2, -3.0), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 11. Cube numbers ─────────────────────────────────────────────────────────

/** Cubes of side 1, 2 and 3 as n × n × n dot lattices drawn obliquely, layer by layer: 1, 8, 27 dots. */
export const CUB = { s: 0.6, a: 0.45, b: 0.35, centres: [[-3.8, -0.3], [-1.5, -0.3], [1.9, -0.3]] as readonly XYr[], layerColors: [ROLE.output, ROLE.input, ROLE.result] as readonly string[] }
/** Screen position of lattice point (i, j, k) of an n-cube centred at (cx, cy). */
export const cubePoint = (n: number, cx: number, cy: number, i: number, j: number, k: number): XY => {
  const h = (n - 1) / 2, { s, a, b } = CUB
  return [cx + (i - h + a * (k - h)) * s, cy + (j - h + b * (k - h)) * s]
}
function cubeObjects(n: number, c: XYr): SceneObject[] {
  const out: SceneObject[] = []
  for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const p = cubePoint(n, c[0], c[1], i, j, k); out.push(dot(P(p[0], p[1]), CUB.layerColors[k], 0.1)) }
  if (n > 1) {
    const e = [0, n - 1]
    for (const k of e) for (const j of e) out.push(line(P(...cubePoint(n, c[0], c[1], 0, j, k)), P(...cubePoint(n, c[0], c[1], n - 1, j, k)), ROLE.reference, 0.02))
    for (const k of e) for (const i of e) out.push(line(P(...cubePoint(n, c[0], c[1], i, 0, k)), P(...cubePoint(n, c[0], c[1], i, n - 1, k)), ROLE.reference, 0.02))
    for (const j of e) for (const i of e) out.push(line(P(...cubePoint(n, c[0], c[1], i, j, 0)), P(...cubePoint(n, c[0], c[1], i, j, n - 1)), ROLE.reference, 0.02))
  }
  return out
}

/** KG: the perfect cubes n³ = 1, 8, 27, 64, 125, …: n layers of n × n units. */
export function buildCubeNumbersScene(): SceneSpec {
  return framed(raw_buildCubeNumbersScene())
}
function raw_buildCubeNumbersScene(): SceneSpec {
  const [c1, c2, c3] = CUB.centres
  return {
    id: 'math-cube-numbers',
    title: 'Perfect cubes: n × n × n units',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the perfect cubes as cubes of unit dots: a cube of side n has n layers of n × n dots, so n³ dots — 1 for side 1, 8 for side 2 (2 layers of 4), 27 for side 3 (3 layers of 9) — continuing 64, 125, ….',
    ariaLabel:
      'Three cubes drawn as lattices of dots, layer by layer in blue, red and green. The first cube is a single dot, labelled 1 cubed equals 1. The second has two layers of four dots, labelled 2 cubed equals 8. The third has three layers of nine dots, labelled 3 cubed equals 27. A final caption lists 1, 8, 27, 64, 125.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A cube of side 1 is a single unit. A cube of side 2 is 2 layers (blue, red), each a 2 × 2 square of 4: 2 × 2 × 2 = 8 units.', objects: [...cubeObjects(1, c1), ...cubeObjects(2, c2), label(`1${sup(3)} = 1`, P(c1[0], -1.9), ROLE.output, 'primary'), label(`2${sup(3)} = 8`, P(c2[0], -1.9), ROLE.input, 'primary')] },
      { narration: 'A cube of side 3 is 3 layers (blue, red, green), each a 3 × 3 square of 9: 3 × 3 × 3 = 27 units.', objects: [...cubeObjects(3, c3), label(`3${sup(3)} = 27`, P(c3[0], -1.9), ROLE.result, 'primary')] },
      { narration: 'The perfect cubes are n × n × n: 1, 8, 27, then 4³ = 64 and 5³ = 125 — they count the units in a cube, which is why cubes appear in volume problems.', objects: [label('1, 8, 27, 64, 125, …', P(0, 2.4), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 12. Square roots ─────────────────────────────────────────────────────────

/** Squares of area 4, 9, 16 and 10 (scale u): their sides are √4 = 2, √9 = 3, √16 = 4 and √10 ≈ 3.16, which sits between 3 and 4. */
export const SQR = { u: 0.6, y0: -1.2, areas: [4, 9, 16, 10] as readonly number[], gap: 0.5, xStart: -4.5, line: { x3: -1.25, scale: 2.5, y: -3.6 } }
export const sqrSide = (area: number) => Math.sqrt(area)
export function sqrX0(k: number): number {
  let x = SQR.xStart
  for (let i = 0; i < k; i++) x += sqrSide(SQR.areas[i]) * SQR.u + SQR.gap
  return x
}

/** KG: √x is the non-negative y with y² = x; a square of area x has side √x. */
export function buildSquareRootsScene(): SceneSpec {
  return framed(raw_buildSquareRootsScene())
}
function raw_buildSquareRootsScene(): SceneSpec {
  const { u, y0, areas } = SQR
  const sq = areas.map((a, k) => ({ a, x: sqrX0(k), side: sqrSide(a) * u, color: k < 3 ? ROLE.output : ROLE.input }))
  const nl = SQR.line
  return {
    id: 'math-square-roots',
    title: 'Square roots: the side of a square',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show √x as the side of a square of area x: areas 4, 9 and 16 have sides 2, 3 and 4 (√4 = 2, √9 = 3, √16 = 4), and a square of area 10 has a side between 3 and 4 — √10 ≈ 3.16 — because 9 < 10 < 16; the number line places √10 just above 3.',
    ariaLabel:
      'Four squares standing on a common base, three blue with areas 4, 9 and 16 written inside and one red with area 10. A green bar under each shows its side length, labelled root 4 equals 2, root 9 equals 3, root 16 equals 4, and root 10 approximately 3.16. Below, a number line from 3 to 4 has a green dot just above 3 at root 10, with the caption 3 less than root 10 less than 4, since 9 is less than 10 is less than 16.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Four squares with areas 4, 9, 16 (blue) and 10 (red). The side of a square is the number that, multiplied by itself, gives its area.', objects: sq.flatMap((q) => [...rectLines(q.x, y0, q.x + q.side, y0 + q.side, q.color, 0.04), label(String(q.a), P(q.x + q.side / 2, y0 + q.side / 2), q.color, 'primary')]) },
      { narration: 'The sides are the square roots: √4 = 2, √9 = 3 and √16 = 4 are whole numbers (perfect squares). The area-10 square has a side of about 3.16 — not a whole number.', objects: sq.flatMap((q, k) => [line(P(q.x, y0 - 0.3), P(q.x + q.side, y0 - 0.3), ROLE.result, 0.05), label(k < 3 ? `√${q.a} = ${Math.sqrt(q.a)}` : `√${q.a} ≈ ${f2(Math.sqrt(q.a))}`, P(q.x + q.side / 2, y0 - 0.9), ROLE.result, 'primary')]) },
      { narration: 'Where does √10 sit? 9 < 10 < 16, so 3 < √10 < 4: just above 3 on the number line (about 0.16 of the way to 4).', objects: [line(P(nl.x3, nl.y), P(nl.x3 + nl.scale, nl.y), ROLE.reference, 0.03), line(P(nl.x3, nl.y - 0.15), P(nl.x3, nl.y + 0.15), ROLE.reference, 0.025), line(P(nl.x3 + nl.scale, nl.y - 0.15), P(nl.x3 + nl.scale, nl.y + 0.15), ROLE.reference, 0.025), label('3', P(nl.x3, nl.y - 0.5), ROLE.ink, 'primary'), label('4', P(nl.x3 + nl.scale, nl.y - 0.5), ROLE.ink, 'primary'), dot(P(nl.x3 + (Math.sqrt(10) - 3) * nl.scale, nl.y), ROLE.result, 0.12), label('√10', P(nl.x3 + (Math.sqrt(10) - 3) * nl.scale, nl.y + 0.5), ROLE.result, 'primary'), label('9 < 10 < 16', P(0, -4.5), ROLE.ink, 'primary')] },
    ],
  }
}
