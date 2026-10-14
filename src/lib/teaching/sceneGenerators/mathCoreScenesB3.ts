/**
 * Core school-mathematics figures — batch 3 of the mathematics visual campaign
 * (2026-10-11): arithmetic and number sense.
 *
 * Twelve concepts a learner meets first with objects, not symbols: fraction bars,
 * counters, place-value columns, arrays, number lines and equal-area rectangles.
 * Same rules as batches 1-2: one visual language from visualDesign.ts, labels are
 * names not sentences, steps are cumulative, coordinates stay inside +-5, at most
 * 50 objects per step, and every number drawn comes from the constants and pure
 * helpers exported here, which the test file re-derives independently.
 *
 * Colour roles keep their meaning: red is the input / the given, blue is what is
 * produced or compared, green is the result, violet is a construction aid, slate
 * is axes and inert reference geometry.
 *
 * A "filled" bar cell is one short thick cylinder (line() with a large thickness);
 * the renderer has no filled rectangle, and hatching a cell would use dozens of
 * objects.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, type V3 } from './mathSceneKit'

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
export const lcm = (a: number, b: number) => (a / gcd(a, b)) * b
const minus = (n: number) => (n < 0 ? `−${-n}` : `${n}`)

/** A bar of n equal cells from x0 (width w) at height y, with shaded runs [from, to) in a colour. */
export function fracBar(x0: number, y: number, w: number, n: number, shaded: Array<[number, number, string]>, h = 0.62): SceneObject[] {
  const cw = w / n
  const out: SceneObject[] = [
    line(P(x0, y - h / 2), P(x0 + w, y - h / 2), ROLE.reference, 0.04),
    line(P(x0, y + h / 2), P(x0 + w, y + h / 2), ROLE.reference, 0.04),
  ]
  for (let i = 0; i <= n; i++) out.push(line(P(x0 + i * cw, y - h / 2), P(x0 + i * cw, y + h / 2), ROLE.reference, i === 0 || i === n ? 0.04 : 0.025))
  for (const [a, b, color] of shaded) for (let i = a; i < b; i++) out.push(line(P(x0 + i * cw + 0.05, y), P(x0 + (i + 1) * cw - 0.05, y), color, h * 0.56))
  return out
}

// ── 1. Equivalent fractions ──────────────────────────────────────────────────

/** 1/2 = 2/4 = 4/8, drawn as bars of width W from x = -W/2. */
export const EQF = { W: 6, rows: [{ n: 2, k: 1, y: 1.7 }, { n: 4, k: 2, y: 0.3 }, { n: 8, k: 4, y: -1.1 }] } as const
/** a/b and c/d are equivalent exactly when a·d = b·c. */
export const equivalent = (a: number, b: number, c: number, d: number) => a * d === b * c

/** KG: "Two fractions a/b and c/d are equivalent if ad = bc; multiplying numerator and denominator by the same nonzero number preserves the value." */
export function buildEquivalentFractionsScene(): SceneSpec {
  return framed(raw_buildEquivalentFractionsScene())
}
function raw_buildEquivalentFractionsScene(): SceneSpec {
  const { W, rows } = EQF
  const x0 = -W / 2
  const bar = (r: (typeof rows)[number]) => fracBar(x0, r.y, W, r.n, [[0, r.k, ROLE.output]], 0.7)
  const lab = (r: (typeof rows)[number]) => label(`${r.k}/${r.n}`, P(x0 - 0.75, r.y), ROLE.ink, 'primary')
  return {
    id: 'math-fraction-equivalence',
    title: 'Equivalent fractions: 1/2 = 2/4 = 4/8',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that cutting every piece into the same number of smaller pieces changes the names of a fraction but not the amount, and that a/b = c/d exactly when ad = bc.',
    ariaLabel:
      'Three bars of the same length. The first is cut in 2 with 1 piece shaded, the second in 4 with 2 shaded, the third in 8 with 4 shaded. All three shaded parts end at the same place, so 1/2, 2/4 and 4/8 are the same amount. ' +
      'Check: 1 times 4 equals 2 times 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Here is half of a bar: 1 piece of 2 is shaded. 1/2.', objects: [...bar(rows[0]), lab(rows[0])] },
      {
        narration: 'Cut every piece in two. Now there are 4 pieces and 2 of them are shaded. Both numbers doubled (1 → 2 and 2 → 4), but the shaded part ends in the same place: 2/4 = 1/2.',
        objects: [...bar(rows[1]), lab(rows[1]), label('× 2', P(x0 + W + 0.75, (rows[0].y + rows[1].y) / 2), ROLE.input, 'primary'), guide(P(0, rows[0].y + 0.5), P(0, rows[2].y - 0.5), ROLE.aid, 0.03)],
      },
      {
        narration: 'Cut again: 8 pieces, 4 shaded, and the shaded part still ends at the line. Multiplying top and bottom by the same number keeps the fraction. Test: 1/2 and 2/4 are equivalent because 1 × 4 = 2 × 2.',
        objects: [...bar(rows[2]), lab(rows[2]), label('× 2', P(x0 + W + 0.75, (rows[1].y + rows[2].y) / 2), ROLE.input, 'primary'), label('ad = bc: 1 × 4 = 2 × 2', P(0, rows[2].y - 1.1), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 2. Fraction simplification ───────────────────────────────────────────────

/** 6/8 simplifies to 3/4 by dividing by gcd(6, 8) = 2. */
export const SIMP = { W: 6, num: 6, den: 8, y1: 1.6, y2: -0.9 } as const

/** KG: "Writing a fraction in its simplest (lowest) form by dividing numerator and denominator by their greatest common divisor." */
export function buildFractionSimplificationScene(): SceneSpec {
  return framed(raw_buildFractionSimplificationScene())
}
function raw_buildFractionSimplificationScene(): SceneSpec {
  const { W, num, den, y1, y2 } = SIMP
  const g = gcd(num, den), x0 = -W / 2, cw = W / den
  const brackets: SceneObject[] = []
  for (let p = 0; p < den / g; p++) {
    const a = x0 + p * g * cw + 0.08, b = x0 + (p + 1) * g * cw - 0.08, yb = y1 - 0.55
    brackets.push(line(P(a, yb + 0.1), P(a, yb), ROLE.aid, 0.035), line(P(a, yb), P(b, yb), ROLE.aid, 0.035), line(P(b, yb), P(b, yb + 0.1), ROLE.aid, 0.035))
  }
  return {
    id: 'math-fraction-simplification',
    title: 'Simplifying a fraction: 6/8 = 3/4',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that grouping the pieces of a fraction in equal groups, as large as the numerator and denominator allow (their greatest common divisor), gives the same amount in the fewest pieces.',
    ariaLabel:
      'A bar cut into 8 pieces with 6 shaded, which is 6/8. The pieces are grouped in pairs, because the greatest common divisor of 6 and 8 is 2. Each pair becomes one piece: a bar of 4 pieces with 3 shaded, which is 3/4. 3 and 4 share no factor, so 3/4 is in lowest terms.',
    stage: NO_STAGE,
    steps: [
      { narration: '6/8: the bar has 8 equal pieces and 6 are shaded.', objects: [...fracBar(x0, y1, W, den, [[0, num, ROLE.output]]), label(`${num}/${den}`, P(x0 - 0.75, y1), ROLE.ink, 'primary')] },
      {
        narration: 'The biggest number that divides both 6 and 8 is 2 (their greatest common divisor). Group the pieces in twos.',
        objects: [...brackets, label(`gcd(${num}, ${den}) = ${g}`, P(0, y1 - 1.15), ROLE.aid, 'primary'), label(`÷ ${g}`, P(x0 + W + 0.7, (y1 + y2) / 2), ROLE.input, 'primary')],
      },
      {
        narration: 'Each pair becomes one bigger piece: 4 pieces, 3 shaded. The same amount, 3/4. 3 and 4 share no factor except 1, so this is the lowest form.',
        objects: [
          ...fracBar(x0, y2, W, den / g, [[0, num / g, ROLE.result]]), label(`${num / g}/${den / g}`, P(x0 - 0.75, y2), ROLE.result, 'primary'),
          label(`gcd(${num / g}, ${den / g}) = ${gcd(num / g, den / g)}: lowest terms`, P(0, y2 - 0.85), ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 3. Adding fractions with different denominators ──────────────────────────

/** 1/3 + 1/4 = 7/12. */
export const ADDF = { W: 6, a: [1, 3], b: [1, 4], rows: { a: 2.9, b: 1.7, a12: 0.0, b12: -1.2, sum: -3.0 } } as const

/** KG: "Adding or subtracting fractions by finding a common denominator and combining numerators; requires knowledge of LCM." */
export function buildFractionAdditionScene(): SceneSpec {
  return framed(raw_buildFractionAdditionScene())
}
function raw_buildFractionAdditionScene(): SceneSpec {
  const { W, a, b, rows } = ADDF
  const L = lcm(a[1], b[1]), x0 = -W / 2
  const ka = (a[0] * L) / a[1], kb = (b[0] * L) / b[1]
  const lab = (t: string, y: number, color: string = ROLE.ink) => label(t, P(x0 - 0.8, y), color, 'primary')
  return {
    id: 'math-fraction-addition',
    title: 'Adding fractions: 1/3 + 1/4 = 7/12',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that fractions can be added only when the pieces are the same size, so both are re-cut into the common denominator (the LCM) and then the shaded pieces are counted together.',
    ariaLabel:
      'A bar cut in thirds with 1 shaded and a bar cut in quarters with 1 shaded: the pieces are different sizes. Both are re-cut into twelfths: 1/3 becomes 4/12 and 1/4 becomes 3/12, ending in the same places. ' +
      'Together the shaded twelfths make a bar with 4 plus 3 equals 7 pieces shaded: 7/12.',
    stage: NO_STAGE,
    steps: [
      {
        narration: '1/3 and 1/4 cannot be added piece for piece: a third and a quarter are different sizes.',
        objects: [...fracBar(x0, rows.a, W, a[1], [[0, a[0], ROLE.input]]), lab('1/3', rows.a), ...fracBar(x0, rows.b, W, b[1], [[0, b[0], ROLE.output]]), lab('1/4', rows.b)],
      },
      {
        narration: 'Cut both into pieces of the same size. The smallest common size is a twelfth, because 12 is the least common multiple of 3 and 4. 1/3 = 4/12 and 1/4 = 3/12: the shaded parts end in the same places as before.',
        objects: [
          ...fracBar(x0, rows.a12, W, L, [[0, ka, ROLE.input]]), lab(`${ka}/${L}`, rows.a12, ROLE.input),
          ...fracBar(x0, rows.b12, W, L, [[0, kb, ROLE.output]]), lab(`${kb}/${L}`, rows.b12, ROLE.output),
          guide(P(x0 + (a[0] / a[1]) * W, rows.a - 0.4), P(x0 + (ka / L) * W, rows.a12 + 0.4), ROLE.input, 0.03),
          guide(P(x0 + (b[0] / b[1]) * W, rows.b - 0.4), P(x0 + (kb / L) * W, rows.b12 + 0.4), ROLE.output, 0.03),
          label(`LCM(${a[1]}, ${b[1]}) = ${L}`, P(0.2, (rows.b + rows.a12) / 2), ROLE.aid, 'detail'),
        ],
      },
      {
        narration: 'Now the pieces match, so count them: 4 twelfths + 3 twelfths = 7 twelfths. Add the numerators and keep the denominator: 1/3 + 1/4 = 7/12.',
        objects: [
          ...fracBar(x0, rows.sum, W, L, [[0, ka, ROLE.input], [ka, ka + kb, ROLE.output]]), lab(`${ka + kb}/${L}`, rows.sum, ROLE.result),
          label(`${ka}/${L} + ${kb}/${L} = ${ka + kb}/${L}`, P(0.2, (rows.b12 + rows.sum) / 2), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 4. Improper fractions ────────────────────────────────────────────────────

/** 7/3: three wholes drawn side by side, each cut into thirds. */
export const IMPR = { W: 6, whole: 3, num: 7, den: 3, barY: 1.0, lineY: -1.6 } as const

/** KG: "A fraction where the numerator is greater than or equal to the denominator (e.g., 7/3), representing a quantity ≥ 1." */
export function buildImproperFractionsScene(): SceneSpec {
  return framed(raw_buildImproperFractionsScene())
}
function raw_buildImproperFractionsScene(): SceneSpec {
  const { W, whole, num, den, barY, lineY } = IMPR
  const x0 = -W / 2, unit = W / whole
  // a heavier edge marks each whole, so "one whole = 3 thirds" is visible inside a row of thirds
  const wholeEdge = (k: number) => line(P(x0 + k * unit, barY - 0.4), P(x0 + k * unit, barY + 0.4), ROLE.ink, 0.07)
  const wholeBar = (k: number, shaded: number) => [...fracBar(x0 + k * unit, barY, unit, den, [[0, shaded, ROLE.output]]), wholeEdge(k), wholeEdge(k + 1)]
  const xAt = (v: number) => x0 + v * unit
  const endX = xAt(num / den)
  const ticks: SceneObject[] = []
  for (let i = 0; i <= whole; i++) ticks.push(line(P(xAt(i), lineY - 0.15), P(xAt(i), lineY + 0.15), ROLE.reference, 0.04), label(String(i), P(xAt(i), lineY - 0.5), ROLE.reference, 'detail'))
  return {
    id: 'math-improper-fractions',
    title: 'Improper fractions: 7/3 is more than one whole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that when the numerator is at least the denominator the fraction is one whole or more: 3/3 is exactly one whole, and 7/3 is seven thirds, past 2 on the number line.',
    ariaLabel:
      'A whole bar cut into 3 thirds, all 3 shaded: 3/3 is one whole. Two more bars are added and 7 thirds are shaded in total: both of the first two bars full and 1 piece of the third. ' +
      'On a number line from 0 to 3 the point 7/3 sits a little past 2, so 7/3 is more than 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'One whole is cut in 3 equal pieces. All 3 shaded is 3/3, which is exactly one whole: the numerator equals the denominator.', objects: [...wholeBar(0, den), label(`${den}/${den} = 1 whole`, P(xAt(0.5), barY + 0.85), ROLE.ink, 'primary')] },
      {
        narration: 'Keep going with more wholes, each cut in thirds. Shade 7 thirds: two full wholes (6 thirds) and 1 more. The numerator 7 is bigger than the denominator 3, so the fraction is more than 1: an improper fraction.',
        objects: [...wholeBar(1, den), ...wholeBar(2, num - 2 * den), label(`${num}/${den}`, P(xAt(1.5), barY + 0.9), ROLE.result, 'primary'), label(`${num} pieces of 1/${den}`, P(xAt(1.5), barY - 0.85), ROLE.output, 'detail')],
      },
      {
        narration: 'On the number line 7/3 lands a third of the way past 2. It is more than 1, and more than 2.',
        objects: [
          line(P(xAt(0), lineY), P(xAt(whole), lineY), ROLE.reference, 0.05), ...ticks,
          guide(P(endX, barY - 0.4), P(endX, lineY), ROLE.aid, 0.03), dot(P(endX, lineY), ROLE.result, 0.15), label(`${num}/${den} is more than 1`, P(endX + 0.5, lineY + 0.6), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 5. Place value ───────────────────────────────────────────────────────────

/** 3,482: digits and the value of one counter in each place. */
export const PLACE = { digits: [3, 4, 8, 2], values: [1000, 100, 10, 1], names: ['thousands', 'hundreds', 'tens', 'ones'], xs: [-3.6, -1.2, 1.2, 3.6], baseY: -1.2, step: 0.42 } as const
export const placeSum = (digits: readonly number[], values: readonly number[]) => digits.reduce((s, d, i) => s + d * values[i], 0)

/** KG: "The positional system in which the value of a digit depends on its position within a numeral; in base 10, each position represents a power of 10." */
export function buildPlaceValueScene(): SceneSpec {
  return framed(raw_buildPlaceValueScene())
}
function raw_buildPlaceValueScene(): SceneSpec {
  const { digits, values, names, xs, baseY, step } = PLACE
  const total = placeSum(digits, values)
  const counters: SceneObject[] = []
  digits.forEach((d, c) => { for (let i = 0; i < d; i++) counters.push(dot(P(xs[c], baseY + 0.45 + i * step), ROLE.output, 0.17)) })
  return {
    id: 'math-place-value',
    title: 'Place value: 3,482',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that each digit of a numeral is worth its digit times the value of its place, in base 10 a power of ten, and that the number is the sum of those values.',
    ariaLabel:
      'Four columns headed thousands, hundreds, tens and ones, holding the digits 3, 4, 8 and 2 of the number 3,482. Counters stacked in each column show 3 thousands, 4 hundreds, 8 tens and 2 ones. ' +
      'Their values 3000, 400, 80 and 2 add up to 3482.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The number 3,482 has four digits. Each digit sits in a place with its own name: thousands, hundreds, tens, ones.',
        objects: [...names.map((n, c) => label(n, P(xs[c], 2.6), ROLE.ink, 'detail')), ...digits.map((d, c) => label(String(d), P(xs[c], baseY), ROLE.ink, 'primary')), line(P(-4.8, baseY - 0.35), P(4.8, baseY - 0.35), ROLE.reference, 0.03)],
      },
      { narration: 'The digit says how many of that place there are. 3 thousands, 4 hundreds, 8 tens and 2 ones: one counter for each.', objects: counters },
      {
        narration: 'Each counter is worth its place: 3 × 1000, 4 × 100, 8 × 10, 2 × 1. Add them: 3000 + 400 + 80 + 2 = 3482. Move a digit one place left and it is worth ten times as much.',
        objects: [...digits.map((d, c) => label(`${d} × ${values[c]}`, P(xs[c], baseY - 0.85), ROLE.result, 'detail')), label(`${digits.map((d, c) => d * values[c]).join(' + ')} = ${total}`, P(0, baseY - 1.7), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 6. Multiplication ────────────────────────────────────────────────────────

/** 3 × 4 as an array of dots: 3 rows of 4. */
export const MUL = { rows: 3, cols: 4, gap: 0.7 } as const

/** KG: "A binary operation representing repeated addition; a × b is the sum of b copies of a." */
export function buildMultiplicationScene(): SceneSpec {
  return framed(raw_buildMultiplicationScene())
}
function raw_buildMultiplicationScene(): SceneSpec {
  const { rows, cols, gap } = MUL
  const array = (cx: number, r: number, c: number, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) out.push(dot(P(cx + (j - (c - 1) / 2) * gap, 0.4 + ((r - 1) / 2 - i) * gap), color, 0.2))
    return out
  }
  const total = rows * cols
  const rep = (n: number, times: number) => Array(times).fill(n).join(' + ')
  return {
    id: 'math-multiplication',
    title: 'Multiplication: 3 × 4 is 3 rows of 4',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show multiplication as repeated addition of equal rows in an array, and that turning the array on its side gives the same total, so a × b = b × a.',
    ariaLabel:
      'An array of dots with 3 rows of 4: adding the rows 4 plus 4 plus 4 gives 12, so 3 times 4 is 12. The same dots turned on their side make 4 rows of 3: 3 plus 3 plus 3 plus 3 is also 12, so 3 times 4 equals 4 times 3.',
    stage: NO_STAGE,
    steps: [
      { narration: '3 × 4 means 3 equal rows with 4 in each row. Lay them out as an array.', objects: [...array(-2.5, rows, cols, ROLE.output), label(`${rows} rows of ${cols}`, P(-2.5, 2.1), ROLE.ink, 'primary')] },
      { narration: 'Add the rows: 4 + 4 + 4 = 12. That is why 3 × 4 = 12: repeated addition.', objects: [label(`${rep(cols, rows)} = ${total}`, P(-2.5, -1.35), ROLE.result, 'primary')] },
      {
        narration: 'Turn the array on its side: now 4 rows of 3. Same 12 dots. So 3 × 4 = 4 × 3: the order does not change the product.',
        objects: [...array(2.8, cols, rows, ROLE.input), label(`${cols} rows of ${rows}`, P(2.8, 2.45), ROLE.ink, 'primary'), label(`${rep(rows, cols)} = ${total}`, P(2.8, -1.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 7. Division ──────────────────────────────────────────────────────────────

/** 13 ÷ 4 = 3 remainder 1. */
export const DIV = { total: 13, size: 4, gap: 0.7 } as const
export const divmod = (a: number, b: number): [number, number] => [Math.floor(a / b), a % b]

/** KG: "The inverse operation to multiplication; a ÷ b finds how many times b fits into a, with a possible remainder for integers." */
export function buildDivisionScene(): SceneSpec {
  return framed(raw_buildDivisionScene())
}
function raw_buildDivisionScene(): SceneSpec {
  const { total, size, gap } = DIV
  const [q, r] = divmod(total, size)
  const xAt = (i: number) => (i - (total - 1) / 2) * gap
  const dotsRow = Array.from({ length: total }, (_, i) => dot(P(xAt(i), 0.2), ROLE.output, 0.2))
  const brackets: SceneObject[] = []
  for (let g = 0; g < q; g++) {
    const a = xAt(g * size) - 0.3, b = xAt(g * size + size - 1) + 0.3, y = 0.75
    brackets.push(line(P(a, y - 0.12), P(a, y), ROLE.aid, 0.04), line(P(a, y), P(b, y), ROLE.aid, 0.04), line(P(b, y), P(b, y - 0.12), ROLE.aid, 0.04))
  }
  return {
    id: 'math-division',
    title: 'Division: 13 ÷ 4 = 3 remainder 1',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show division as finding how many groups of the divisor fit into the total, with what is left over as the remainder, and check it by multiplying back.',
    ariaLabel:
      '13 dots in a row. They are grouped in fours: 3 full groups of 4 fit, and 1 dot is left over. So 13 divided by 4 is 3 remainder 1. Check: 3 times 4 plus 1 equals 13.',
    stage: NO_STAGE,
    steps: [
      { narration: 'How many 4s fit into 13? Here are 13 dots.', objects: [...dotsRow, label(`${total} ÷ ${size}`, P(0, 1.7), ROLE.ink, 'primary')] },
      {
        narration: 'Make groups of 4. Three full groups fit, and 1 dot is left over, because it is not enough for another group.',
        objects: [...brackets, label(`${q} groups of ${size}`, P(-1.2, 1.35), ROLE.aid, 'detail'), dot(P(xAt(total - 1), 0.2), ROLE.input, 0.26), label(`${r} left over`, P(xAt(total - 1) - 0.2, -0.55), ROLE.input, 'detail')],
      },
      {
        narration: 'So 13 ÷ 4 = 3 remainder 1. Check by multiplying back: 3 × 4 + 1 = 13.',
        objects: [label(`${total} ÷ ${size} = ${q} remainder ${r}`, P(0, -1.5), ROLE.result, 'primary'), label(`${q} × ${size} + ${r} = ${q * size + r}`, P(0, -2.2), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 8. Number base ───────────────────────────────────────────────────────────

/** 13 in base 10 (1 ten + 3 ones) and in base 2 (1101: 8 + 4 + 0 + 1). */
export const BASE = { value: 13, binary: [1, 1, 0, 1], binaryPlaces: [8, 4, 2, 1], tens: [1, 3], tenPlaces: [10, 1], unit: 0.35 } as const
export const fromDigits = (digits: readonly number[], places: readonly number[]) => digits.reduce((s, d, i) => s + d * places[i], 0)

/** KG: "A positional numeral system using b distinct digit symbols; base 2 (binary), base 8 (octal), and base 16 (hexadecimal) are common in computing." */
export function buildNumberBaseScene(): SceneSpec {
  return framed(raw_buildNumberBaseScene())
}
function raw_buildNumberBaseScene(): SceneSpec {
  const { value, binary, binaryPlaces, tens, tenPlaces, unit } = BASE
  const box = (cx: number, y: number, w: number): SceneObject[] => [
    line(P(cx - w / 2, y - 0.55), P(cx + w / 2, y - 0.55), ROLE.reference, 0.04), line(P(cx - w / 2, y + 0.55), P(cx + w / 2, y + 0.55), ROLE.reference, 0.04),
    line(P(cx - w / 2, y - 0.55), P(cx - w / 2, y + 0.55), ROLE.reference, 0.04), line(P(cx + w / 2, y - 0.55), P(cx + w / 2, y + 0.55), ROLE.reference, 0.04),
  ]
  const column = (xs: number[], y: number, digits: readonly number[], places: readonly number[], color: string): SceneObject[] =>
    xs.flatMap((cx, i) => [...box(cx, y, 1.15), label(String(digits[i]), P(cx, y), color, 'primary'), label(String(places[i]), P(cx, y + 0.95), ROLE.aid, 'detail')])
  const x10 = [-0.7, 0.7], x2 = [-1.95, -0.65, 0.65, 1.95]
  const barY1 = -2.6, barY2 = -3.3, x0 = -(value * unit) / 2
  const seg = (a: number, b: number, y: number, color: string) => line(P(x0 + a * unit + 0.03, y), P(x0 + b * unit - 0.03, y), color, 0.32)
  const binSegs: SceneObject[] = []
  let pos = 0
  binary.forEach((d, i) => { if (d) { binSegs.push(seg(pos, pos + binaryPlaces[i], barY2, ROLE.output)); pos += binaryPlaces[i] } })
  return {
    id: 'math-number-base',
    title: 'Number base: 13 in base 10 and base 2',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the same quantity can be written in different bases, where each position is worth a power of the base: 13 is 1 ten and 3 ones in base 10, and 8 + 4 + 0 + 1 = 1101 in base 2.',
    ariaLabel:
      'The number thirteen written two ways. In base 10 the places are tens and ones: 1 ten and 3 ones. In base 2 the places are 8, 4, 2 and 1 and the digits are 1, 1, 0, 1, so 8 plus 4 plus 0 plus 1 is 13. ' +
      'Two bars of equal length, 10 plus 3 and 8 plus 4 plus 1, show it is the same amount.',
    stage: NO_STAGE,
    steps: [
      { narration: 'In base 10 each place is worth ten times the one to its right. 13 is 1 ten and 3 ones.', objects: [...column(x10, 2.2, tens, tenPlaces, ROLE.ink), label('base 10', P(-3.6, 2.2), ROLE.ink, 'primary')] },
      {
        narration: 'In base 2 each place is worth twice the one to its right: 8, 4, 2, 1, and the only digits are 0 and 1. 13 = 8 + 4 + 0 + 1, so it is written 1101.',
        objects: [...column(x2, -0.1, binary, binaryPlaces, ROLE.input), label('base 2', P(-3.6, -0.1), ROLE.ink, 'primary')],
      },
      {
        narration: 'Both are the same amount, 13. Lay 10 + 3 and 8 + 4 + 1 end to end and the bars are equally long. Computers use base 2 (and 8, 16) because a switch has two states.',
        objects: [seg(0, tens[0] * tenPlaces[0], barY1, ROLE.output), seg(tens[0] * tenPlaces[0], value, barY1, ROLE.input), ...binSegs, label(`${tenPlaces[0] * tens[0]} + ${tens[1]} = ${binary.map((d, i) => (d ? binaryPlaces[i] : null)).filter((v) => v !== null).join(' + ')}`, P(0, -4.1), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 9. Ratio ─────────────────────────────────────────────────────────────────

/** 2 red : 3 blue, repeated 1, 2 and 3 times. */
export const RATIO = { red: 2, blue: 3, gap: 0.5, groupGap: 0.55, rows: [1, 2, 3], ys: [2.2, 0.4, -1.4] } as const

/** KG: "A comparison of two quantities by division, expressing how many times one is contained in the other; written a:b or a/b." */
export function buildRatioScene(): SceneSpec {
  return framed(raw_buildRatioScene())
}
function raw_buildRatioScene(): SceneSpec {
  const { red, blue, gap, groupGap, rows, ys } = RATIO
  const groupW = (red + blue - 1) * gap
  const rowObjs = (times: number, y: number): SceneObject[] => {
    const totalW = times * groupW + (times - 1) * (groupGap + gap)
    const out: SceneObject[] = []
    for (let g = 0; g < times; g++) {
      const gx = -totalW / 2 + g * (groupW + groupGap + gap)
      for (let i = 0; i < red + blue; i++) out.push(dot(P(gx + i * gap, y), i < red ? ROLE.input : ROLE.output, 0.19))
    }
    return out
  }
  return {
    id: 'math-ratio',
    title: 'Ratio: 2 red for every 3 blue',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a ratio as a comparison of two quantities that stays the same when both are multiplied by the same number, 2:3 = 4:6 = 6:9, and as a fraction red/blue = 2/3.',
    ariaLabel:
      'A group of 2 red counters and 3 blue counters is the ratio 2 to 3. Two such groups give 4 red and 6 blue, 4 to 6, and three groups give 6 red and 9 blue, 6 to 9. Every row has 2 red for every 3 blue, so the ratio is the same, and red divided by blue is 2 over 3.',
    stage: NO_STAGE,
    steps: [
      { narration: 'For every 2 red counters there are 3 blue ones. The ratio of red to blue is 2 : 3.', objects: [...rowObjs(rows[0], ys[0]), label(`${red} : ${blue}`, P(0, ys[0] + 0.65), ROLE.ink, 'primary')] },
      { narration: 'Make two groups: 4 red and 6 blue. There are more counters but still 2 red for every 3 blue: 4 : 6 is the same ratio.', objects: [...rowObjs(rows[1], ys[1]), label(`${red * 2} : ${blue * 2}`, P(0, ys[1] + 0.65), ROLE.ink, 'primary')] },
      {
        narration: 'Three groups: 6 : 9. Multiplying both parts by the same number keeps the ratio. Written as a division, red ÷ blue is 2/3 every time.',
        objects: [...rowObjs(rows[2], ys[2]), label(`${red * 3} : ${blue * 3}`, P(0, ys[2] + 0.65), ROLE.ink, 'primary'), label(`same ratio: red ÷ blue = ${red}/${blue}`, P(0, -2.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 10. Direct variation ─────────────────────────────────────────────────────

/** y = kx with k = 2. */
export const DIRV = { u: 0.62, k: 2, xs: [1, 2, 3], ox: -1.1, oy: -2.0 } as const
export const dirF = (x: number) => DIRV.k * x

/** KG: "A relationship where y = kx for a constant k, meaning y is proportional to x and the graph passes through the origin." */
export function buildDirectVariationScene(): SceneSpec {
  return framed(raw_buildDirectVariationScene())
}
function raw_buildDirectVariationScene(): SceneSpec {
  const { u, k, xs, ox, oy } = DIRV
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  return {
    id: 'math-direct-variation',
    title: 'Direct variation: y = kx',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that in direct variation y = kx the graph is a straight line through the origin, doubling x doubles y, and the ratio y over x is the same constant k at every point.',
    ariaLabel:
      'The line y equals 2x through the origin. The points (1, 2), (2, 4) and (3, 6) lie on it: when x doubles from 1 to 2, y doubles from 2 to 4, and y divided by x is 2 at every point, so the constant k is 2.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'In direct variation y = kx, y is a fixed multiple of x. Here k = 2: y is always twice x. The graph is a straight line through the origin (0, 0).',
        objects: [...mathAxes(S, -0.6, 4.4, -0.6, 7.6), label('x', S(4.6, 0.55), ROLE.reference, 'detail'), label('y', S(0.5, 7.6), ROLE.reference, 'detail'), line(S(0, 0), S(3.6, dirF(3.6)), ROLE.ink, 0.06), dot(S(0, 0), ROLE.result, 0.15), label('y = 2x', S(1.5, 6.4), ROLE.ink, 'primary'), label('through (0, 0)', S(1.7, -0.9), ROLE.result, 'detail')],
      },
      {
        narration: 'Double x and y doubles too: x = 1 gives y = 2, x = 2 gives y = 4.',
        objects: [...[1, 2].flatMap((x) => [guide(S(x, 0), S(x, dirF(x)), ROLE.input, 0.025), guide(S(x, dirF(x)), S(0, dirF(x)), ROLE.output, 0.025), dot(S(x, dirF(x)), ROLE.ink, 0.14)]), label('(1, 2)', S(1.9, 1.1), ROLE.ink, 'detail'), label('(2, 4)', S(2.9, 3.4), ROLE.ink, 'detail')],
      },
      {
        narration: 'Divide y by x at any point and you get the same number: 2 ÷ 1 = 4 ÷ 2 = 6 ÷ 3 = 2. That constant is k.',
        objects: [guide(S(3, 0), S(3, dirF(3)), ROLE.input, 0.025), guide(S(3, dirF(3)), S(0, dirF(3)), ROLE.output, 0.025), dot(S(3, dirF(3)), ROLE.ink, 0.14), label('(3, 6)', S(3.9, 5.1), ROLE.ink, 'detail'), label(`y ÷ x = ${k} every time`, S(6.2, 0.8), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 11. Inverse variation ────────────────────────────────────────────────────

/** y = k / x with k = 6. */
export const INVV = { u: 0.62, k: 6, pts: [[2, 3], [3, 2]], ox: -2.2, oy: -2.2 } as const
export const invVarF = (x: number) => INVV.k / x

/** KG: "A relationship where y = k/x for a constant k, meaning y decreases as x increases and their product is constant." */
export function buildInverseVariationScene(): SceneSpec {
  return framed(raw_buildInverseVariationScene())
}
function raw_buildInverseVariationScene(): SceneSpec {
  const { u, k, pts, ox, oy } = INVV
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u + oy)
  const rect = (x: number, y: number, color: string): SceneObject[] => [
    line(S(0, 0), S(x, 0), color, 0.045), line(S(x, 0), S(x, y), color, 0.045), line(S(x, y), S(0, y), color, 0.045), line(S(0, y), S(0, 0), color, 0.045),
  ]
  return {
    id: 'math-inverse-variation',
    title: 'Inverse variation: y = k/x',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that in inverse variation y = k/x, y falls as x rises, the product xy is the constant k at every point, and the rectangle under any point has the same area k.',
    ariaLabel:
      'The curve y equals 6 over x falling from left to right. The point (2, 3) gives a rectangle from the origin 2 wide and 3 tall, area 6. The point (3, 2) gives a rectangle 3 wide and 2 tall, also area 6. As x grows, y shrinks, and x times y is always 6.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'In inverse variation y = k/x, as x gets bigger y gets smaller. Here k = 6: y = 6/x. The curve falls but never reaches 0.',
        objects: [...mathAxes(S, -0.5, 7.6, -0.5, 7.6), label('x', S(7.8, 0.5), ROLE.reference, 'detail'), label('y', S(0.5, 7.7), ROLE.reference, 'detail'), curve(sampleMapped(invVarF, 0.8, 7.4, S, 72), ROLE.ink), label('y = 6/x', S(5.3, 2.6), ROLE.ink, 'primary')],
      },
      {
        narration: 'Take the point (2, 3). The rectangle from the origin to it is 2 wide and 3 tall: area 2 × 3 = 6.',
        objects: [...rect(pts[0][0], pts[0][1], ROLE.input), dot(S(pts[0][0], pts[0][1]), ROLE.input, 0.15), label('(2, 3)', S(2.5, 3.9), ROLE.input, 'primary'), label('2 × 3 = 6', S(1.0, 1.5), ROLE.input, 'detail')],
      },
      {
        narration: 'Slide along the curve to (3, 2): wider, but shorter. The rectangle is 3 by 2 and the area is still 6. The product x × y is always k.',
        objects: [...rect(pts[1][0], pts[1][1], ROLE.output), dot(S(pts[1][0], pts[1][1]), ROLE.output, 0.15), label('(3, 2)', S(3.9, 2.7), ROLE.output, 'primary'), label('3 × 2 = 6', S(5.0, 0.9), ROLE.output, 'detail'), label('x × y = 6 always', S(5.4, 4.8), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 12. Percentage change ────────────────────────────────────────────────────

/** An increase 50 -> 65 and a decrease 80 -> 60, drawn at `unit` screen units per 1. */
export const PCT = { unit: 0.05, x0: -3.2, up: { old: 50, now: 65 }, down: { old: 80, now: 60 }, ys: { upOld: 3.0, upNew: 2.0, downOld: 0.0, downNew: -1.0 } } as const
/** (new - old) / old x 100, in percent. */
export const pctChange = (oldV: number, newV: number) => ((newV - oldV) / oldV) * 100

/** KG: "Expressing the change in a quantity as a percentage of its original value: (new − old) / old × 100%." */
export function buildPercentageChangeScene(): SceneSpec {
  return framed(raw_buildPercentageChangeScene())
}
function raw_buildPercentageChangeScene(): SceneSpec {
  const { unit, x0, up, down, ys } = PCT
  const tube = (a: number, b: number, y: number, color: string) => line(P(x0 + a * unit, y), P(x0 + b * unit, y), color, 0.42)
  const pc = (o: number, n: number) => Math.round(pctChange(o, n))
  const signed = (n: number) => (n > 0 ? `+${n}` : minus(n))
  return {
    id: 'math-percentage-change',
    title: 'Percentage change: (new − old) ÷ old × 100%',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a percentage change is the change as a fraction of the ORIGINAL value, for an increase (50 to 65 is +30%) and a decrease (80 to 60 is −25%).',
    ariaLabel:
      'Two pairs of bars. An old bar of 50 and a new bar of 65: the extra 15 is 15 over 50, which is 30 percent more. An old bar of 80 and a new bar of 60: the missing 20 is 20 over 80, which is 25 percent less. In both the change is divided by the old value.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A price goes from 50 to 65. The old value is 50 and the new value is 65. What is the change?',
        objects: [tube(0, up.old, ys.upOld, ROLE.output), label(`old ${up.old}`, P(x0 - 0.9, ys.upOld), ROLE.output, 'detail'), tube(0, up.old, ys.upNew, ROLE.output), tube(up.old, up.now, ys.upNew, ROLE.result), label(`new ${up.now}`, P(x0 - 0.9, ys.upNew), ROLE.ink, 'detail'), label(signed(up.now - up.old), P(x0 + up.now * unit + 0.6, ys.upNew), ROLE.result, 'detail')],
      },
      {
        narration: 'The change is 65 − 50 = 15. As a fraction of the OLD value that is 15 ÷ 50 = 0.30, which is +30%.',
        objects: [label(`${signed(up.now - up.old)} ÷ ${up.old} = ${signed(pc(up.old, up.now))}%`, P(1.7, ys.upNew - 0.55), ROLE.result, 'primary')],
      },
      {
        narration: 'A decrease works the same way. 80 falls to 60: the change is 60 − 80 = −20, and −20 ÷ 80 = −0.25, so the price fell by 25%. Always divide by the old value.',
        objects: [tube(0, down.old, ys.downOld, ROLE.output), label(`old ${down.old}`, P(x0 - 0.9, ys.downOld), ROLE.output, 'detail'), tube(0, down.now, ys.downNew, ROLE.output), tube(down.now, down.old, ys.downNew, ROLE.input), label(`new ${down.now}`, P(x0 - 0.9, ys.downNew), ROLE.ink, 'detail'), label(`${signed(down.now - down.old)} ÷ ${down.old} = ${signed(pc(down.old, down.now))}%`, P(1.7, ys.downNew - 0.65), ROLE.input, 'primary')],
      },
    ],
  }
}
