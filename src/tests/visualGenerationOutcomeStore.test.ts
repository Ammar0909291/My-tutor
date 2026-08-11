import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { describeFigure, rendererOf } from '@/lib/teaching/visual/generationOutcomeStore'
import { generateConceptFigure, generateConceptScene } from '@/lib/teaching/visual/visualEngine'
import type { GenerationOutcome } from '@/lib/teaching/visual/generationOutcome'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * THE AUDIT TRAIL HAS TO BE READABLE, OR IT IS NOT AN AUDIT TRAIL.
 *
 * Two properties earn their tests here, and both were real defects before this
 * build: a generated SPEC was recorded as an EMPTY SceneSpec (so every graph,
 * number line and process flow the engine ever produced would have been written
 * down as a blank scene), and a REJECTED figure was recorded with its reason but
 * without the artefact — which is exactly the shape of blindness that let the
 * anchor rule reject 7 of 7 of our own gold-standard figures unnoticed.
 */

const CONCEPT = 'math.func.linear-function'
const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
  auto: process.env.VISUAL_AI_SCENE_AUTO,
}
beforeEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = CONCEPT
  process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
  process.env.VISUAL_AI_SCENE_AUTO = ORIGINAL.auto
})

const ctx = {
  conceptId: CONCEPT,
  title: 'Linear Function',
  description: 'A function whose graph is a straight line, written y = mx + c.',
  prerequisites: [],
}

const emptyCache = () => ({
  visualizationCache: {
    findUnique: async () => null,
    update: async () => undefined,
    create: async () => undefined,
  },
})

const collect = () => {
  const seen: GenerationOutcome[] = []
  return { seen, sink: { record: async (o: GenerationOutcome) => { seen.push(o) } } }
}

describe('what the engine hands the sink', () => {
  it('A GENERATED SPEC IS RECORDED AS A SPEC, not as an empty scene', async () => {
    const { seen, sink } = collect()
    await generateConceptFigure(ctx, {
      enabled: () => true, policy: 'auto', cacheClient: emptyCache(), outcomeSink: sink,
      generate: async () => ({ type: 'graph', equation: '2x + 1', title: 'Linear function', xLabel: 'x', yLabel: 'y = 2x + 1' }),
    })
    expect(seen).toHaveLength(1)
    const result = seen[0].result
    expect(result.ok).toBe(true)
    expect(result.ok && result.figure?.kind).toBe('spec')
    // The legacy `scene` field still carries the placeholder; a reader that
    // trusted it would be recording nothing at all.
    expect(result.ok && result.scene.steps).toHaveLength(0)
  })

  it('A REJECTED FIGURE IS RECORDED WITH WHAT WAS REJECTED', async () => {
    const { seen, sink } = collect()
    const bad = { type: 'sankey', nodes: [] }
    await generateConceptFigure(ctx, {
      enabled: () => true, policy: 'auto', cacheClient: emptyCache(), outcomeSink: sink,
      generate: async () => bad,
    })
    const result = seen[0].result
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.payload).toEqual(bad)
  })

  it('a rejected SCENE carries its payload too', async () => {
    const { seen, sink } = collect()
    // No concept vocabulary anywhere — rejected by the anchor rule, which is
    // the rule whose false rejects this payload exists to make visible.
    const bad = {
      id: 'x', title: 'x', sceneType: 'diagram',
      steps: [{ narration: 'n', objects: [
        { type: 'node', position: [0, 0, 0], text: 'alpha' },
        { type: 'node', position: [1, 0, 0], text: 'beta' },
      ] }],
    }
    await generateConceptScene(ctx, {
      enabled: () => true, policy: 'auto', cacheClient: emptyCache(), outcomeSink: sink,
      generate: async () => bad,
    })
    const result = seen[0].result
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.payload).toEqual(bad)
  })

  it('an accepted scene records the scene as its figure', async () => {
    const { seen, sink } = collect()
    await generateConceptScene(ctx, {
      enabled: () => true, policy: 'auto', cacheClient: emptyCache(), outcomeSink: sink,
      generate: async () => ({
        id: 's', title: 'linear function', sceneType: 'plot',
        steps: [{ narration: 'a straight line', objects: [
          { type: 'point', position: [0, 1, 0], text: 'linear function' },
          { type: 'point', position: [1, 3, 0], text: 'straight line' },
          { type: 'arrow', from: [0, 1, 0], to: [1, 3, 0] },
        ] }],
      }),
    })
    const result = seen[0].result
    expect(result.ok).toBe(true)
    expect(result.ok && result.figure?.kind).toBe('scene')
  })
})

describe('the accessibility text the asset row requires', () => {
  const scene = (steps: SceneSpec['steps'], title = ''): SceneSpec =>
    ({ id: 's', title, sceneType: 'diagram', steps })

  it('prefers the scene narration', () => {
    expect(describeFigure(
      { kind: 'scene', scene: scene([{ narration: 'The line rises by m each step.', objects: [] }]) },
      'Linear Function',
    )).toBe('The line rises by m each step.')
  })

  it('IS NEVER EMPTY — an empty one fails asset validation', () => {
    for (const figure of [
      { kind: 'scene' as const, scene: scene([]) },
      { kind: 'scene' as const, scene: scene([{ objects: [] }]) },
      { kind: 'spec' as const, spec: { type: 'graph' } as never },
    ]) {
      expect(describeFigure(figure, 'Linear Function').trim().length).toBeGreaterThan(0)
    }
  })

  it('names the form when a spec has no title, and claims nothing more', () => {
    const text = describeFigure({ kind: 'spec', spec: { type: 'number_line' } as never }, 'Linear Function')
    expect(text).toContain('number line')
    expect(text).toContain('Linear Function')
  })
})

describe('the renderer column', () => {
  it('distinguishes the two forms, and is null when there is no figure', () => {
    expect(rendererOf({ kind: 'scene', scene: { id: 's', title: '', sceneType: 'diagram', steps: [] } }).label).toBe('scene')
    expect(rendererOf({ kind: 'spec', spec: { type: 'graph' } as never }).label).toBe('spec')
    expect(rendererOf(undefined).label).toBeNull()
  })
})
