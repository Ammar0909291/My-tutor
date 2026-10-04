/**
 * Coverage-driven physics extension (45 new concepts, 2026-10-03/04): the
 * figure UX properties a browser review found broken and fixed, held for every
 * one of them.
 *
 *  1. Every label is met at SOME stage, at beginner (5 labels) and intermediate
 *     (9) budgets, when the learner walks the stages — the promise the figure's
 *     held-back note makes. Before: on 8 figures some labels were shown at no
 *     stage (e.g. the special-diodes photodiode and solar-cell notes).
 *  2. The intermediate learner's complete view holds nothing back (that level
 *     opens on the complete figure).
 *  3. The frame's headline chip is a short statement, never a narration
 *     sentence cut mid-formula (six figures did this).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { stageView } from '@/lib/teaching/visual/sceneStage'
import { budgetLabels, complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'
import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'

// The 45 concepts the extension added: in today's graph, absent from the
// pre-extension graph (commit d7c47993's parent, 238 concepts).
const now: { id: string }[] = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8')).concepts
let before: Set<string> | null = null
try {
  before = new Set((JSON.parse(execSync('git show d7c47993~1:docs/physics/kg/graph.json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).concepts as { id: string }[]).map((c) => c.id))
} catch { /* shallow clone: fall back to the explicit prefix list below */ }
const EXTENSION = before
  ? now.map((c) => c.id).filter((id) => !before!.has(id))
  : now.map((c) => c.id).filter((id) => /^phys\.(rel\.general-relativity-intro|mod\.special-diodes)$/.test(id))

const sceneFor = (id: string): SceneSpec => {
  const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])
  return (d.payload as { sceneSpec: SceneSpec }).sceneSpec
}
const labelsOf = (objs: SceneObject[]) => objs.filter((o) => o.type === 'label' && !isGlyphLabel(o))

describe('coverage-extension physics figures: labels and headline', () => {
  it('covers the extension (45 concepts when history is available)', () => {
    expect(EXTENSION.length === 45 || before === null).toBe(true)
  })
  for (const id of EXTENSION) {
    it(`${id}: every label met at some stage; complete view whole at intermediate; short headline`, () => {
      const spec = sceneFor(id)
      expect(spec, id).toBeTruthy()
      for (const level of ['beginner', 'intermediate'] as const) {
        const policy = complexityFor(level)
        const seen = new Set<SceneObject>()
        const all = new Set<SceneObject>()
        for (let k = 1; k <= spec.steps.length; k++) {
          const objs = stageView(spec, k).objects
          labelsOf(objs).forEach((o) => all.add(o))
          labelsOf(budgetLabels(objs, policy, new Set(spec.steps[k - 1].objects))).forEach((o) => seen.add(o))
        }
        const never = [...all].filter((o) => !seen.has(o)).map((o) => o.text)
        expect(never, `${id} @ ${level}`).toEqual([])
      }
      const complete = stageView(spec, Infinity).objects
      expect(labelsOf(budgetLabels(complete, complexityFor('intermediate'))).length).toBe(labelsOf(complete).length)
      const result = (deriveExplainer(spec) as { result?: { expression: string; value?: string } }).result
      if (result) expect(`${result.expression} ${result.value ?? ''}`.trim().length, id).toBeLessThanOrEqual(70)
    })
  }
})
