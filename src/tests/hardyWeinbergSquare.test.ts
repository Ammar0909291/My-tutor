/**
 * bio.gen.population-genetics was served a four-spoke hub of the forces that disturb Hardy-Weinberg equilibrium: no p, no q, no genotype
 * frequencies (learner run, 2026-10-21). It now draws the lesson's own example (a recessive disease at 9 %): a gene-pool bar split at p = 0.7,
 * a unit square whose AREAS are p², pq, pq and q², and the next generation's bar — split in exactly the same place. The tests re-derive every
 * area and frequency from the DRAWN lines and reject a figure whose geometry disagrees with its numbers.
 */
import { describe, it, expect } from 'vitest'
import {
  buildHardyWeinbergScene, checkHardyWeinbergConsistency, P, Q, BAR_LEN, Y_POOL, Y_NEXT, SQ_X0, SQUARE_SIDE, cells, splitX,
} from '@/lib/teaching/sceneGenerators/hardyWeinbergSquare'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))

describe('Hardy-Weinberg square', () => {
  const spec = buildHardyWeinbergScene()

  it('is a valid scene, deterministic, and served for bio.gen.population-genetics', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildHardyWeinbergScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'bio.gen.population-genetics') as SceneSpec).id).toBe(spec.id)
  })

  it('uses the lesson’s own example: disease incidence 9 % gives q = 0.3, p = 0.7, carriers 0.42 (not 18 %)', () => {
    expect(Q * Q).toBeCloseTo(0.09, 12)
    expect(P + Q).toBeCloseTo(1, 12)
    const c = cells()
    const area = (x: (typeof c)[number]) => ((x.x1 - x.x0) * (x.y1 - x.y0)) / SQUARE_SIDE ** 2
    const by = (g: string) => c.filter((x) => x.genotype === g).reduce((n, x) => n + area(x), 0)
    expect(by('AA')).toBeCloseTo(0.49, 9); expect(by('Aa')).toBeCloseTo(0.42, 9); expect(by('aa')).toBeCloseTo(0.09, 9)
    expect(by('AA') + by('Aa') + by('aa')).toBeCloseTo(1, 9)
  })

  it('the two heterozygote regions are equal and each is pq', () => {
    const [, ab, ba] = cells()
    const area = (x: typeof ab) => ((x.x1 - x.x0) * (x.y1 - x.y0)) / SQUARE_SIDE ** 2
    expect(area(ab)).toBeCloseTo(P * Q, 9); expect(area(ba)).toBeCloseTo(P * Q, 9)
  })

  it('the gene-pool bar splits at p, and the next generation splits in exactly the same place', () => {
    const seg = (y: number) => objects(spec).filter((o) => o.type === 'bond' && o.from![1] === y && o.to![1] === y && o.thickness === 0.5)
    for (const y of [Y_POOL, Y_NEXT]) {
      const s = seg(y).sort((a, b) => a.from![0] - b.from![0])
      expect(s).toHaveLength(2)
      expect(s[0].to![0]).toBe(splitX(P))
      expect((s[0].to![0] - s[0].from![0]) / BAR_LEN).toBeCloseTo(P, 9)
    }
  })

  it('passes its own consistency check and every label’s number is an area just measured', () => {
    expect(checkHardyWeinbergConsistency(spec)).toEqual({ ok: true, errors: [] })
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    for (const want of ['AA  p² = 0.49', 'Aa  2pq = 0.42', 'aa  q² = 0.09', 'A: p = 0.7', 'a: q = 0.3', 'same p, same q']) expect(text).toContain(want)
  })

  it('narration states the dominance point the lesson turns on and stays inside the panel budget', () => {
    const all = spec.steps.map((s) => s.narration).join(' ')
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950)
    expect(all).toMatch(/Dominant A does not “win”/)
    expect(all).toMatch(/not 2 × 9 %/)
  })

  // Mutations
  it('a next generation drawn with a different split (allele frequency changed) is rejected', () => {
    const bad = clone(spec)
    const a = objects(bad).find((o) => o.type === 'bond' && o.from![1] === Y_NEXT && o.color === objects(spec).find((x) => x.type === 'bond' && x.from![1] === Y_POOL)!.color)!
    a.to![0] = a.to![0] - 1
    expect(checkHardyWeinbergConsistency(bad).ok).toBe(false)
  })
  it('a square cut somewhere other than p (areas not p², pq, q²) is rejected', () => {
    const bad = clone(spec)
    for (const o of objects(bad)) if (o.type === 'bond' && o.thickness === 0.045) {
      for (const k of ['from', 'to'] as const) if (Math.abs(o[k]![0] - (SQ_X0 + SQUARE_SIDE * P)) < 1e-6) o[k]![0] -= 1.2
    }
    expect(checkHardyWeinbergConsistency(bad).ok).toBe(false)
  })
  it('a label that states a different genotype frequency is rejected', () => {
    const bad = clone(spec)
    objects(bad).find((o) => o.text?.startsWith('Aa  2pq'))!.text = 'Aa  2pq = 0.18'
    expect(checkHardyWeinbergConsistency(bad).errors.join(' ')).toMatch(/2pq = 0.42/)
  })
})
