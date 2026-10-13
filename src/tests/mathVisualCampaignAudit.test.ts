/**
 * Mathematics visual campaign — one guard over EVERY authored mathematics figure (2026-10-11).
 *
 * The per-batch tests (mathCoreScenesBatch1..n) check the mathematics each figure draws. This file
 * checks the two admission gates that decide whether a learner sees the figure at all, for every
 * `math.*` entry in CONCEPT_SCENES, so a future batch cannot ship a figure that silently renders
 * nothing:
 *   - validateSceneSpec: the schema the renderer uses (at most 50 objects a step, no zero-length bond)
 *   - payloadBlockers:   the figure audit (a label such as "undefined" reads as leaked internal state, raw LaTeX, a
 *                        self-contradicting equation)
 * and that the figure is actually served at concept scope, and the two reserved figure-less concepts stay so.
 */
import { describe, it, expect } from 'vitest'
import { CONCEPT_SCENE_OVERRIDES, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const MATH = (CONCEPT_SCENE_OVERRIDES as string[]).filter((id) => id.startsWith('math.')).sort()

describe('every authored mathematics figure', () => {
  it('is a non-empty set (the campaign has shipped figures)', () => {
    expect(MATH.length).toBeGreaterThanOrEqual(510)
  })
  it.each(MATH)('%s builds, validates and has no audit blockers', (id) => {
    const scene = buildCanonicalScene(null, id)
    expect(scene, id).not.toBeNull()
    const v = validateSceneSpec(scene!) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: scene! } as never)).toEqual([])
  })
  it.each(MATH)('%s is served at concept scope', (id) => {
    const d = resolveVisual({ message: '', lessonConceptId: id, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.graphical, `${id} ${d.provenance}`).toBe(true)
    expect(d.asset?.scope).toBe('concept')
  })
})

describe('reserved figure-less concepts', () => {
  it.each(['math.linalg.vector-addition', 'math.func.linear-function'])('%s stays figure-less (fixture for the AI-generation tests)', (id) => {
    expect(MATH).not.toContain(id)
  })
})
