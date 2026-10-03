/**
 * Launch-readiness item 4 (2026-10-03): every biology concept resolves to a
 * figure of its own through a static Tier 0/1 binding, as physics does
 * (physicsCoreScenesBatch14.test.ts). Measured before this change: 198/199;
 * the one without was bio.plant.plant-respiration, left to Tier 3 generation
 * by the 2026-09-25 campaign because a live sweep saw it work. Tier 3 has a
 * documented stuck mode (bioVisualGapFix.test.ts), so a learner's explicit
 * request should not depend on it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { CONCEPT_SCENE_OVERRIDES, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'

const g = JSON.parse(readFileSync('docs/biology/kg/graph.json', 'utf8'))
const ids: string[] = (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)

describe('biology figure coverage', () => {
  it('every one of the 199 biology concepts resolves to a figure of that concept', () => {
    expect(ids).toHaveLength(199)
    const none = ids.filter((id) => {
      const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'biology' } as Parameters<typeof resolveVisual>[0])
      return !(d.graphical && d.asset?.conceptId === id)
    })
    expect(none).toEqual([])
  }, 120_000)

  it('plant respiration draws the three light conditions its Core Understanding teaches, and validates', () => {
    expect(CONCEPT_SCENE_OVERRIDES).toContain('bio.plant.plant-respiration')
    const scene = buildCanonicalScene(null, 'bio.plant.plant-respiration')
    expect(scene).not.toBeNull()
    expect(validateSceneSpec(scene!).valid).toBe(true)
    const text = JSON.stringify(scene).toLowerCase()
    for (const s of ['compensation point', 'night', 'respiration', 'photosynthesis']) expect(text).toContain(s)
  })
})
