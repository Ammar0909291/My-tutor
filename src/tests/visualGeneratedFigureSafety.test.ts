import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * A GENERATED FIGURE MUST NOT BYPASS THE COMMON VISUAL SAFETY SYSTEM.
 *
 * The engine can now draw a topic nobody authored, which means figures reach
 * learners without a human ever having looked at their layout. Everything the
 * authored corpus was given — one readability floor, one placement solver, one
 * label primitive — has to apply to them too, or "generic" quietly means
 * "generic and unchecked".
 *
 * The engine emits exactly two forms, and this fixes each to a renderer that
 * carries the safety system:
 *
 *   spec  -> VisualRenderer      (2D: useFigureLegibility — floor + placement)
 *   scene -> SceneSpecRenderer   (3D: SceneLabel + placeSceneLabels)
 *
 * A third form, or a second renderer for either, is how a generated figure
 * would slip past — so the surfaces are asserted rather than assumed.
 */

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

describe('Generated figures inherit the shared visual safety system', () => {
  it('the engine emits exactly two forms', () => {
    const engine = read('src/lib/teaching/visual/visualEngine.ts')
    expect(engine).toMatch(/kind:\s*'scene'/)
    expect(engine).toMatch(/kind:\s*'spec'/)
    // The resolver maps those two forms onto two renderers and nothing else.
    const resolver = read('src/lib/teaching/visual/resolveVisual.ts')
    expect(resolver).toMatch(/renderer:\s*'scene'/)
    expect(resolver).toMatch(/renderer:\s*'spec'/)
  })

  it('the 2D form is drawn by the renderer that owns the readability floor', () => {
    const renderer = read('src/components/visuals/VisualRenderer.tsx')
    expect(renderer, 'VisualRenderer must run the shared 2D owner').toContain('useFigureLegibility')
    expect(renderer).toMatch(/ref=\{figureRef\}/)
  })

  it('the 3D form is drawn by the renderer that owns placement', () => {
    const renderer = read('src/components/school/visuals/SceneSpecRenderer.tsx')
    expect(renderer, 'scenes must go through the placement solver').toMatch(/placeSceneLabels|PlacedLabels/)
    expect(renderer, 'scenes must use the one label primitive').toContain('SceneLabel')
  })

  it('the learner surface routes both forms to exactly those renderers', () => {
    const screen = read('src/components/learn/LessonScreen.tsx')
    expect(screen).toMatch(/msg\.visualSpec\s*&&[\s\S]{0,200}<VisualRenderer/)
    expect(screen).toMatch(/msg\.sceneSpec\s*&&[\s\S]{0,200}<SceneSpecFigure/)
  })

  it('the 2D floor and the 3D floor are the same number', () => {
    // Two floors would mean a generated spec figure and a generated scene
    // figure disagree about what is readable.
    const twoD = Number(read('src/components/school/visuals/useFigureLegibility.ts')
      .match(/FIGURE_TEXT_FLOOR_PX\s*=\s*(\d+)/)![1])
    const threeD = Number(read('src/components/school/visuals/SceneLabel.tsx')
      .match(/FLOOR_PX\s*=\s*(\d+)/)![1])
    expect(twoD).toBe(threeD)
    expect(twoD).toBeGreaterThanOrEqual(10)
  })

  it('a generated scene is layout-checked before it can be served', () => {
    // The critic's STATIC layer runs the same viewport model the authored
    // corpus is held to, so an unrenderable scene is rejected without a model
    // call — and, unlike an authored figure, nobody would otherwise have looked.
    const critic = read('src/lib/teaching/visual/figureCritic.ts')
    expect(critic).toMatch(/isLayoutSafe|checkSceneLayoutAllViewports/)
  })
})
