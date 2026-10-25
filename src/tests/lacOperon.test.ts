/**
 * bio.mol.gene-regulation used to be served two coloured pins captioned "Operon genes: OFF" / "ON" — the headline of the lesson with
 * no operon in it, while the tutor spoke of an operator, a repressor and RNA polymerase (hard-concept learner run, 2026-10-20). The
 * figure now draws the lac operon in both states; these tests pin what makes it a mechanism rather than a caption: the repressor is
 * on the operator and the polymerase at the promoter when lactose is absent, the repressor has left, allolactose touches it and an
 * mRNA starts at the polymerase when lactose is present — and a figure whose geometry contradicts its OFF / ON caption is rejected.
 */
import { describe, it, expect } from 'vitest'
import {
  buildLacOperonScene, checkLacOperonConsistency, PROMOTER, OPERATOR, GENES, Y_ABSENT, Y_PRESENT,
  ABSENT_REPRESSOR, ABSENT_POLYMERASE, PRESENT_REPRESSOR, PRESENT_ALLOLACTOSE, PRESENT_POLYMERASE,
} from '@/lib/teaching/sceneGenerators/lacOperon'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const inRange = (x: number, [a, b]: [number, number]) => x >= a && x <= b

describe('lac operon figure', () => {
  const spec = buildLacOperonScene()

  it('is a valid scene, deterministic, and served for bio.mol.gene-regulation', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildLacOperonScene())).toBe(JSON.stringify(spec))
    const served = buildCanonicalScene(null, 'bio.mol.gene-regulation') as SceneSpec
    expect(served.id).toBe(spec.id)
    expect(served.steps.length).toBe(spec.steps.length)
  })

  it('draws an operon, not two captions: six DNA segments, five protein/ligand spheres and one mRNA', () => {
    const kinds = objects(spec).map((o) => o.type)
    expect(kinds.filter((k) => k === 'bond')).toHaveLength(6)   // promoter, operator, genes — once per state
    expect(kinds.filter((k) => k === 'node')).toHaveLength(5)   // 2 repressors, 2 polymerases, 1 allolactose
    expect(kinds.filter((k) => k === 'path')).toHaveLength(1)   // the mRNA, only when lactose is present
  })

  it('lactose absent: the repressor is on the operator, the polymerase is at the promoter, and no mRNA is drawn', () => {
    expect(inRange(ABSENT_REPRESSOR[0], OPERATOR)).toBe(true)
    expect(inRange(ABSENT_POLYMERASE[0], PROMOTER)).toBe(true)
    expect(ABSENT_REPRESSOR[0]).toBeGreaterThan(ABSENT_POLYMERASE[0])   // between the polymerase and the genes: it blocks the way
    const mrna = objects(spec).filter((o) => o.type === 'path')
    expect(mrna.every((o) => o.points![0][1] < Y_ABSENT)).toBe(true)
  })

  it('lactose present: the repressor has left the DNA, allolactose touches it and the polymerase is on the genes with an mRNA', () => {
    expect(PRESENT_REPRESSOR[1] - Y_PRESENT).toBeGreaterThan(2)
    expect(Math.hypot(PRESENT_ALLOLACTOSE[0] - PRESENT_REPRESSOR[0], PRESENT_ALLOLACTOSE[1] - PRESENT_REPRESSOR[1])).toBeLessThan(1.5)
    expect(inRange(PRESENT_POLYMERASE[0], GENES)).toBe(true)
    const mrna = objects(spec).find((o) => o.type === 'path')!
    expect(Math.abs(mrna.points![0][0] - PRESENT_POLYMERASE[0])).toBeLessThan(1.5)
  })

  it('passes its own consistency check and names every part the tutor talks about', () => {
    expect(checkLacOperonConsistency(spec)).toEqual({ ok: true, errors: [] })
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    for (const need of ['promoter', 'operator', 'repressor', 'RNA polymerase', 'allolactose', 'mRNA', 'lacZ', 'genes OFF', 'genes ON']) expect(text).toContain(need)
  })

  it('narration stays inside the figure panel budget and teaches the core mechanism only', () => {
    const total = spec.steps.reduce((n, s) => n + s.narration.length, 0)
    expect(total).toBeLessThan(950)
    const all = spec.steps.map((s) => s.narration).join(' ')
    expect(all).not.toMatch(/cAMP|CAP\b|catabolite/)
  })

  // Mutation checks: each is a figure that LOOKS like the lac operon but contradicts its own caption.
  it('an mRNA drawn in the lactose-absent panel is rejected', () => {
    const bad = clone(spec)
    const mrna = objects(bad).find((o) => o.type === 'path')!
    mrna.points = mrna.points!.map(([x, y, z]) => [x, y + (Y_ABSENT - Y_PRESENT), z]) as never
    expect(checkLacOperonConsistency(bad).ok).toBe(false)
  })

  it('a repressor still on the operator when lactose is present is rejected', () => {
    const bad = clone(spec)
    const node = objects(bad).find((o) => o.type === 'node' && o.position![0] === PRESENT_REPRESSOR[0] && o.position![1] === PRESENT_REPRESSOR[1])!
    node.position = [PRESENT_REPRESSOR[0], Y_PRESENT + 1.15, 0]
    expect(checkLacOperonConsistency(bad).ok).toBe(false)
  })

  it('a polymerase that is not on the genes when lactose is present is rejected', () => {
    const bad = clone(spec)
    const node = objects(bad).find((o) => o.type === 'node' && o.position![0] === PRESENT_POLYMERASE[0] && o.position![1] === PRESENT_POLYMERASE[1])!
    node.position = [-7, PRESENT_POLYMERASE[1], 0]
    expect(checkLacOperonConsistency(bad).ok).toBe(false)
  })

  it('a missing ON caption is rejected', () => {
    const bad = clone(spec)
    const label = objects(bad).find((o) => o.text === 'lactose present: genes ON')!
    label.text = 'lactose present'
    expect(checkLacOperonConsistency(bad).errors.join(' ')).toMatch(/genes ON/)
  })
})
