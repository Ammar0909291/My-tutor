/**
 * hardyWeinbergSquare — `bio.gen.population-genetics` drawn as the area model behind p² + 2pq + q² = 1.
 *
 * The concept was served a four-spoke hub ("Four Forces That Disturb Hardy-Weinberg Equilibrium"): the forces, with none of the
 * equilibrium they disturb — no p, no q, no genotype frequencies (learner run, 2026-10-21). The lesson's own worked example is a
 * recessive disease with incidence 9 %: q² = 0.09, so q = 0.3, p = 0.7, and carriers 2pq = 0.42 (not 2 × 9 % = 18 %).
 *
 *   1. The gene pool: one bar split into A (p = 0.7) and a (q = 0.3).
 *   2. Random mating as a square of side 1 cut at p and at q: four regions whose AREAS are p², pq, pq, q² — AA 0.49, Aa 0.42 (two
 *      regions of 0.21), aa 0.09. The aa region is the disease.
 *   3. The next generation: count the A alleles in that square, p² + half of 2pq = 0.49 + 0.21 = 0.70. Nothing changed. The dominant
 *      allele did not "win" — dominance is how it is expressed in heterozygotes, not a trend in frequency; only selection, mutation,
 *      gene flow or drift would move p.
 *
 * THE CONSISTENCY GUARANTEE. `checkHardyWeinbergConsistency` re-derives from the drawn lines: the pool bar splits at p; the square's
 * cell AREAS are p², pq, pq, q² and sum to the square's area; the labels' numbers are those areas; and the next-generation A segment is
 * exactly p² + half the heterozygote area, equal to the A segment of the first bar.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, box, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

/** Allele frequencies of the worked example (aa = 9 % of the population → q = 0.3). */
export const P = 0.7
export const Q = 0.3
/** Length of the gene-pool bars and side of the square, scene units. */
export const BAR_LEN = 10
export const SQUARE_SIDE = 8
const BAR_X0 = -8
const BAR_THICKNESS = 0.5
export const Y_POOL = 6.8
export const Y_NEXT = -6.4
/** The square: x from SQ_X0, y from SQ_Y0 (bottom) up to SQ_Y0 + side. */
export const SQ_X0 = -8
export const SQ_Y0 = -3.4

const A_COLOR = ROLE.output
const a_COLOR = ROLE.input
const HET_COLOR = ROLE.aid

/** x where the A segment ends, for a bar of the given allele frequency. */
export const splitX = (p: number) => round(BAR_X0 + BAR_LEN * p)

const pct = (x: number) => x.toFixed(2)

/** Genotype regions of the square: [x0, y0, x1, y1, genotype]. Columns split at p, rows split at q (top row = a, bottom row = A). */
export function cells(p = P): Array<{ x0: number; y0: number; x1: number; y1: number; genotype: 'AA' | 'Aa' | 'aa'; color: string }> {
  const xm = round(SQ_X0 + SQUARE_SIDE * p), ym = round(SQ_Y0 + SQUARE_SIDE * p)   // bottom rows hold A
  const x1 = SQ_X0 + SQUARE_SIDE, y1 = SQ_Y0 + SQUARE_SIDE
  return [
    { x0: SQ_X0, y0: SQ_Y0, x1: xm, y1: ym, genotype: 'AA', color: A_COLOR },
    { x0: xm, y0: SQ_Y0, x1, y1: ym, genotype: 'Aa', color: HET_COLOR },
    { x0: SQ_X0, y0: ym, x1: xm, y1, genotype: 'Aa', color: HET_COLOR },
    { x0: xm, y0: ym, x1, y1, genotype: 'aa', color: a_COLOR },
  ]
}
const area = (c: { x0: number; y0: number; x1: number; y1: number }) => (c.x1 - c.x0) * (c.y1 - c.y0) / (SQUARE_SIDE * SQUARE_SIDE)

const bar = (y: number, p: number): SceneObject[] => [
  line([BAR_X0, y, 0], [splitX(p), y, 0], A_COLOR, BAR_THICKNESS),
  line([splitX(p), y, 0], [BAR_X0 + BAR_LEN, y, 0], a_COLOR, BAR_THICKNESS),
]

export function buildHardyWeinbergScene(): SceneSpec {
  const pool: SceneObject[] = [
    ...bar(Y_POOL, P),
    label('this generation', [BAR_X0 + BAR_LEN + 3.3, Y_POOL, 0], ROLE.ink, 'detail'),
    label(`A: p = ${P}`, [BAR_X0 + (BAR_LEN * P) / 2, Y_POOL + 1.5, 0], A_COLOR, 'detail'),
    label(`a: q = ${Q}`, [BAR_X0 + BAR_LEN * (P + Q / 2), Y_POOL + 1.5, 0], a_COLOR, 'detail'),
  ]
  const [aa, ab, ba, bb] = cells()
  const sq: SceneObject[] = [
    ...cells().flatMap((c) => box(c.x0, c.y0, c.x1, c.y1, c.color)),
    label('AA', [(aa.x0 + aa.x1) / 2, (aa.y0 + aa.y1) / 2, 0], A_COLOR, 'detail'),
    label('Aa', [(ab.x0 + ab.x1) / 2, (ab.y0 + ab.y1) / 2, 0], HET_COLOR, 'detail'),
    label('Aa', [(ba.x0 + ba.x1) / 2, (ba.y0 + ba.y1) / 2, 0], HET_COLOR, 'detail'),
    label('aa', [(bb.x0 + bb.x1) / 2, (bb.y0 + bb.y1) / 2, 0], a_COLOR, 'detail'),
    label('p', [(aa.x0 + aa.x1) / 2, SQ_Y0 - 0.9, 0], A_COLOR, 'detail'),
    label('q', [(ab.x0 + ab.x1) / 2, SQ_Y0 - 0.9, 0], a_COLOR, 'detail'),
    label('p', [SQ_X0 - 0.9, (aa.y0 + aa.y1) / 2, 0], A_COLOR, 'detail'),
    label('q', [SQ_X0 - 0.9, (bb.y0 + bb.y1) / 2, 0], a_COLOR, 'detail'),
    label(`AA  p² = ${pct(area(aa))}`, [6.4, 2.2, 0], A_COLOR, 'detail'),
    label(`Aa  2pq = ${pct(area(ab) + area(ba))}`, [6.4, 0.6, 0], HET_COLOR, 'detail'),
    label(`aa  q² = ${pct(area(bb))}`, [6.4, -1.0, 0], a_COLOR, 'detail'),
  ]
  const next: SceneObject[] = [
    ...bar(Y_NEXT, area(aa) + (area(ab) + area(ba)) / 2),
    label('next generation', [BAR_X0 + BAR_LEN + 3.3, Y_NEXT, 0], ROLE.ink, 'detail'),
    label('same p, same q', [BAR_X0 + BAR_LEN / 2, Y_NEXT - 1.5, 0], ROLE.result, 'detail'),
  ]
  return {
    id: 'hardy-weinberg-square',
    title: 'Hardy-Weinberg: p, q and p² + 2pq + q² = 1',
    sceneType: 'diagram',
    teachingGoal: 'In Hardy-Weinberg equilibrium the genotype frequencies are p², 2pq and q², and allele frequencies stay the same generation after generation; a dominant allele does not "win".',
    cameraDistance: 20,
    ariaLabel: 'The Hardy-Weinberg equilibrium for a recessive disease with 9 percent incidence. Top: a gene-pool bar split into allele A, p equals 0.7, and allele a, q equals 0.3. Middle: a square cut at p and q into four regions whose areas are AA, p squared, 0.49; two Aa regions, 2pq, 0.42 together; and aa, q squared, 0.09. Bottom: the next generation bar, split in exactly the same place, so p and q have not changed.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Take one gene with two alleles: A (dominant) at frequency p and a (recessive) at q. Alleles are all there is in the pool, so p + q = 1. Here p = 0.7 and q = 0.3.', objects: pool, intent: 'establish' },
      { narration: 'With random mating, cut a unit square at p and q. The areas are the genotype frequencies: AA = p² = 0.49, Aa = 2pq = 0.42 (two regions), aa = q² = 0.09, and p² + 2pq + q² = 1. If aa is the disease at 9 %, then q = √0.09 = 0.3, p = 0.7 and carriers are 2pq = 0.42, not 2 × 9 %.', objects: sq, intent: 'relate' },
      { narration: 'Count the A alleles in the next generation: all of AA plus half of Aa = 0.49 + 0.21 = 0.70. Nothing changed. Dominant A does not “win”; dominance is how A is expressed in a heterozygote, not a trend. Only selection, mutation, gene flow or drift can move p.', objects: next, intent: 'resolve' },
    ],
  }
}

export function checkHardyWeinbergConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const bonds = objects.filter((o) => o.type === 'bond' && o.from && o.to)
  const text = objects.map((o) => o.text ?? '').join(' | ')

  // The two gene-pool bars: A is the blue segment, a is the red one.
  const seg = (y: number, color: string) => bonds.find((o) => Math.abs(o.from![1] - y) < 1e-6 && Math.abs(o.to![1] - y) < 1e-6 && o.color === color && o.thickness === BAR_THICKNESS)
  const aTop = seg(Y_POOL, A_COLOR), aSmallTop = seg(Y_POOL, a_COLOR), aNext = seg(Y_NEXT, A_COLOR), aSmallNext = seg(Y_NEXT, a_COLOR)
  if (!aTop || !aSmallTop || !aNext || !aSmallNext) return { ok: false, errors: ['both gene-pool bars must be drawn as an A segment and an a segment'] }
  const len = (o: SceneObject) => Math.abs(o.to![0] - o.from![0])
  const pTop = len(aTop) / (len(aTop) + len(aSmallTop))
  const qTop = len(aSmallTop) / (len(aTop) + len(aSmallTop))
  if (Math.abs(pTop + qTop - 1) > 1e-9) errors.push('p + q is not 1 in the gene-pool bar')

  // The square: four boxes, drawn as lines of their own colour. Find the corners from the lines.
  const xs = new Set<number>(), ys = new Set<number>()
  for (const b of bonds) {
    if (Math.abs(b.from![1] - b.to![1]) < 1e-9 && b.thickness === 0.045 && b.from![1] >= SQ_Y0 - 1e-9 && b.from![1] <= SQ_Y0 + SQUARE_SIDE + 1e-9) { xs.add(b.from![0]); xs.add(b.to![0]); ys.add(b.from![1]) }
  }
  const xl = [...xs].sort((a, b) => a - b), yl = [...ys].sort((a, b) => a - b)
  if (xl.length !== 3 || yl.length !== 3) return { ok: false, errors: ['the square must be cut once across and once down'] }
  const wl = xl[1] - xl[0], wr = xl[2] - xl[1], hb = yl[1] - yl[0], ht = yl[2] - yl[1], side = xl[2] - xl[0]
  if (Math.abs(side - (yl[2] - yl[0])) > 1e-6) errors.push('the frequency square is not square')
  const A = (wl * hb) / (side * side), het1 = (wr * hb) / (side * side), het2 = (wl * ht) / (side * side), aa = (wr * ht) / (side * side)
  if (Math.abs(A + het1 + het2 + aa - 1) > 1e-9) errors.push('the four regions do not add up to the whole square')
  if (Math.abs(A - pTop * pTop) > 1e-6) errors.push('the AA region is not p²')
  if (Math.abs(aa - qTop * qTop) > 1e-6) errors.push('the aa region is not q²')
  if (Math.abs(het1 - pTop * qTop) > 1e-6 || Math.abs(het2 - pTop * qTop) > 1e-6) errors.push('the heterozygote regions are not pq each')

  // The numbers in the labels are the areas just measured.
  for (const want of [`AA  p² = ${pct(A)}`, `Aa  2pq = ${pct(het1 + het2)}`, `aa  q² = ${pct(aa)}`, `A: p = ${round(pTop, 3)}`, `a: q = ${round(qTop, 3)}`]) {
    if (!text.includes(want)) errors.push(`a label should read "${want}" (derived from the drawing)`)
  }

  // The next generation: A alleles = all of AA plus half of Aa. It must equal the first bar's p.
  const pNext = len(aNext) / (len(aNext) + len(aSmallNext))
  if (Math.abs(pNext - (A + (het1 + het2) / 2)) > 1e-6) errors.push('the next-generation bar is not p² + half of 2pq')
  if (Math.abs(pNext - pTop) > 1e-6) errors.push('the next-generation bar differs from this one, so the population is not in equilibrium')
  for (const need of ['this generation', 'next generation', 'same p, same q']) if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  return { ok: errors.length === 0, errors }
}
