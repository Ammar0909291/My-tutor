/**
 * bio.cell.cancer-biology-hallmarks was served a hub of seven names (learner run, 2026-10-21: two labels touched; nothing said that one hallmark is not enough).
 * It now draws the entry's own model, "multiple independent locks": five safeguards in a row, one breach that stops after the first, and the full breach.
 */
import { describe, it, expect } from 'vitest'
import { buildCancerHallmarksScene, checkCancerHallmarksConsistency, WALL_X, SAFEGUARDS, FIRST_BREACH_END_X, FINAL_END_X } from '@/lib/teaching/sceneGenerators/cancerHallmarksLocks'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const arrowsOf = (s: SceneSpec, step: number) => s.steps[step].objects.filter((o) => o.type === 'arrow')
const crossed = (a: { from?: number[]; to?: number[] }) => WALL_X.filter((x) => x > Math.min(a.from![0], a.to![0]) && x < Math.max(a.from![0], a.to![0])).length

describe('cancer hallmarks figure', () => {
  const spec = buildCancerHallmarksScene()

  it('is a valid scene, deterministic, and served for bio.cell.cancer-biology-hallmarks', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildCancerHallmarksScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'bio.cell.cancer-biology-hallmarks') as SceneSpec).id).toBe(spec.id)
  })
  it('passes its own consistency check', () => { expect(checkCancerHallmarksConsistency(spec)).toEqual({ ok: true, errors: [] }) })

  it('five safeguards, each named as the lesson names it', () => {
    expect(SAFEGUARDS).toHaveLength(5)
    const text = spec.steps[0].objects.map((o) => o.text ?? '').join(' | ')
    for (const s of SAFEGUARDS) expect(text).toContain(s)
  })
  it('ONE hallmark: the first breach crosses exactly one wall and stops before the second', () => {
    const [first] = arrowsOf(spec, 1)
    expect(crossed(first)).toBe(1)
    expect(first.to![0]).toBe(FIRST_BREACH_END_X)
    expect(FIRST_BREACH_END_X).toBeLessThan(WALL_X[1])
  })
  it('SEVERAL: the rest carries on from where it stopped, through every other wall, to the malignant end', () => {
    const [first] = arrowsOf(spec, 1), [rest] = arrowsOf(spec, 2)
    expect(rest.from![0]).toBe(first.to![0])
    expect(crossed(first) + crossed(rest)).toBe(WALL_X.length)
    expect(rest.to![0]).toBe(FINAL_END_X)
    expect(FINAL_END_X).toBeGreaterThan(WALL_X[WALL_X.length - 1])
  })
  it('narration names all seven hallmarks, and stays inside the figure panel budget', () => {
    const all = spec.steps.map((s) => s.narration).join(' ')
    for (const h of ['proliferative signalling', 'growth suppressors', 'apoptosis', 'replicative immortality', 'invasion and metastasis', 'Angiogenesis', 'metabolic reprogramming']) expect(all).toContain(h)
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950)
    expect(objects(spec).filter((o) => o.type === 'label' && (o.text ?? '').length > 2).length).toBeLessThanOrEqual(9)
  })

  // Mutations: pictures that say one hallmark is enough, or that the breach never completes.
  it('a first breach that runs through two walls (one hallmark made to look sufficient) is rejected', () => {
    const bad = clone(spec)
    arrowsOf(bad, 1)[0].to![0] = WALL_X[1] + 0.8
    expect(checkCancerHallmarksConsistency(bad).errors.join(' ')).toMatch(/exactly ONE wall/)
  })
  it('a breach that stops short of the last wall is rejected', () => {
    const bad = clone(spec)
    arrowsOf(bad, 2)[0].to![0] = WALL_X[WALL_X.length - 1] - 0.5
    expect(checkCancerHallmarksConsistency(bad).ok).toBe(false)
  })
  it('a "malignant" label placed inside the walls is rejected', () => {
    const bad = clone(spec)
    bad.steps[2].objects.find((o) => o.text === 'malignant')!.position![0] = 0
    expect(checkCancerHallmarksConsistency(bad).errors.join(' ')).toMatch(/malignant/)
  })
  it('a missing wall is rejected', () => {
    const bad = clone(spec)
    bad.steps[0].objects = bad.steps[0].objects.filter((o) => !(o.type === 'bond' && o.from![0] === WALL_X[2]))
    expect(checkCancerHallmarksConsistency(bad).ok).toBe(false)
  })
})
