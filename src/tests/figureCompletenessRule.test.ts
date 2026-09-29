import { describe, expect, it } from 'vitest'
import { buildSemanticsBlock, describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { rebuildScene } from '@/lib/teaching/visual/parametricScenes'

describe('the figure description says it is complete (real-learner run 2026-09-29)', () => {
  it('a lens figure with no rays tells the model nothing else is drawn, and to imagine what is missing', () => {
    const scene = rebuildScene('ray_optics', { objectDistance: 30, focalLength: 10, objectHeight: 5, opticsType: 'convex_lens' })!
    const block = buildSemanticsBlock(describeVisualPayload({ renderer: 'scene', sceneSpec: scene } as never))
    expect(block).toMatch(/That list is COMPLETE: nothing else is drawn/)
    expect(block).toMatch(/IMAGINE/)
  })

  it('an empty description adds no completeness claim', () => {
    expect(buildSemanticsBlock(describeVisualPayload(null))).not.toMatch(/COMPLETE/)
  })
})
