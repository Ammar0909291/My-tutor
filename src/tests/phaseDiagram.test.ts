/**
 * chem.state.phase-diagram used to be served a four-box text comparison — the words of a phase diagram with no diagram
 * (docs/qa/chemistry-visual-audit/semantic-review.json: "prose-comparison"). The figure is now a drawn P–T plane; these
 * tests pin what makes it a phase diagram rather than a list: the curves meet where they must, the labels name the regions
 * and the two special points, and a figure whose geometry contradicts that cannot pass the checker.
 */
import { describe, it, expect } from 'vitest'
import { buildPhaseDiagramScene, checkPhaseDiagramConsistency, TRIPLE, CRITICAL } from '@/lib/teaching/sceneGenerators/phaseDiagram'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const texts = (s: SceneSpec) => objects(s).filter((o) => o.type === 'label').map((o) => o.text ?? '')

describe('phase diagram figure', () => {
  const spec = buildPhaseDiagramScene()

  it('is a valid scene, deterministic, and served for chem.state.phase-diagram', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildPhaseDiagramScene())).toBe(JSON.stringify(spec))
    const served = buildCanonicalScene(null, 'chem.state.phase-diagram') as SceneSpec
    expect(served.id).toBe(spec.id)
    expect(served.steps.length).toBe(spec.steps.length)
  })

  it('draws the plane: both axes and three boundary curves, not four text boxes', () => {
    const kinds = objects(spec).map((o) => o.type)
    expect(kinds.filter((k) => k === 'arrow')).toHaveLength(2)
    expect(kinds.filter((k) => k === 'path')).toHaveLength(2)   // sublimation, vaporisation
    expect(kinds.filter((k) => k === 'bond')).toHaveLength(1)   // fusion line
    expect(kinds.filter((k) => k === 'node')).toHaveLength(2)   // triple and critical points
  })

  it('the three curves meet at the triple point and the vaporisation curve ends at the critical point', () => {
    expect(checkPhaseDiagramConsistency(spec)).toEqual({ ok: true, errors: [] })
    const paths = objects(spec).filter((o) => o.type === 'path')
    expect(paths[0].points!.at(-1)).toEqual(TRIPLE)
    expect(paths[1].points![0]).toEqual(TRIPLE)
    expect(paths[1].points!.at(-1)).toEqual(CRITICAL)
    expect(objects(spec).find((o) => o.type === 'bond')!.from).toEqual(TRIPLE)
  })

  it('names the three regions, the two special points and the supercritical fluid', () => {
    const t = texts(spec).join(' | ')
    for (const need of ['solid', 'liquid', 'gas', 'triple point', 'critical point', 'supercritical fluid', 'pressure, P', 'temperature, T']) expect(t).toContain(need)
  })

  it('names the three boundary curves in the narration and keeps the numbers the old figure carried', () => {
    const narration = spec.steps.map((s) => s.narration).join(' ')
    for (const curve of ['melting', 'sublimation', 'vaporisation']) expect(narration).toContain(curve)
    expect(narration).toMatch(/273\.16 K, 612 Pa/)
    expect(narration).toMatch(/CO₂: 304 K, 73 atm/)
    expect(narration).toMatch(/water: 647 K, 218 atm/)
  })

  it('stays readable on a phone: short labels and no more than the 9 the intermediate budget keeps', () => {
    const t = texts(spec)
    expect(t.length).toBeLessThanOrEqual(9)
    for (const x of t) expect(x.length, x).toBeLessThanOrEqual(22)
  })

  it('mutation: a figure whose curves do not meet at the triple point fails the checker', () => {
    const bad = JSON.parse(JSON.stringify(spec)) as SceneSpec
    const path = objects(bad).find((o) => o.type === 'path')!
    path.points![path.points!.length - 1] = [TRIPLE[0] + 1, TRIPLE[1], 0]
    expect(checkPhaseDiagramConsistency(bad).ok).toBe(false)
  })
})
