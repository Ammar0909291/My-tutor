/**
 * Visual semantics — the tutor may only name what is genuinely drawn.
 *
 * The failure this closes: the contract handed the model invented example
 * phrasings ("look at the arrow", "notice where the two lines meet"), which it
 * reproduced against figures containing neither, and otherwise fell back to
 * "look at the figure displayed on your screen".
 */
import { describe, it, expect } from 'vitest'
import { describeVisualPayload, buildSemanticsBlock } from '@/lib/teaching/visual/visualSemantics'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { makeVisualAsset } from '@/lib/teaching/visual/asset'
import type { VisualDecision, VisualPayload } from '@/lib/teaching/visual/types'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const scene = (steps: SceneSpec['steps'], extra: Partial<SceneSpec> = {}): SceneSpec => ({
  id: 's', title: 'Vector Addition', sceneType: 'diagram', steps, ...extra,
})

// M2: the contract reads its figure off the ADMITTED ASSET, so the fixture
// builds one through the real factory rather than hand-rolling a decision with
// a bare payload. Same inputs, same assertions — the semantics now travel the
// same path they do in production.
const decision = (payload: VisualPayload): VisualDecision => {
  const asset = makeVisualAsset({
    assetId: 'test',
    conceptId: 'phys.meas.vectors',
    conceptTitle: 'Vectors',
    representation: 'vector',
    payload,
    provenance: 'curated',
  })
  return {
    purpose: 'explain', representation: 'vector', payload, asset, graphical: true,
    source: 'registry', provenance: 'test', conceptId: 'phys.meas.vectors',
    conceptTitle: 'Vectors', excursion: false, allowed: null, session: null,
    continuityReason: 'no-active-session',
  }
}

describe('scene payloads yield only what the renderer draws', () => {
  it('names labelled objects verbatim', () => {
    const s = describeVisualPayload({
      renderer: 'scene',
      sceneSpec: scene([{ objects: [
        { type: 'vector', from: [0, 0, 0], to: [1, 1, 0], text: 'v₁' },
        { type: 'label', position: [1, 1, 0], text: 'resultant' },
      ] }]),
    })
    expect(s.elements).toContain('an arrow (vector) labelled "v₁"')
    expect(s.elements).toContain('a text label labelled "resultant"')
    expect(s.caption).toContain('Vector Addition')
  })

  it('omits object types the renderer skips', () => {
    // SceneSpecRenderer returns null for bar/surface — describing them would
    // point the learner at something that is not painted.
    const s = describeVisualPayload({
      renderer: 'scene',
      sceneSpec: scene([{ objects: [
        { type: 'bar', position: [0, 0, 0], text: 'income' },
        { type: 'surface', position: [0, 0, 0] },
        { type: 'node', position: [0, 0, 0], text: 'A' },
      ] }]),
    })
    expect(s.elements.join(' ')).not.toMatch(/income|surface/)
    expect(s.elements).toContain('a node labelled "A"')
  })

  it('reports stages only when the scene really has more than one', () => {
    const one = describeVisualPayload({
      renderer: 'scene',
      sceneSpec: scene([{ narration: 'Start here.', objects: [{ type: 'point' }] }]),
    })
    expect(one.steps).toEqual([])

    const many = describeVisualPayload({
      renderer: 'scene',
      sceneSpec: scene([
        { narration: 'Draw the first vector.', objects: [{ type: 'vector' }] },
        { narration: 'Add the second head to tail.', objects: [{ type: 'vector' }] },
      ]),
    })
    expect(many.steps).toEqual(['Draw the first vector.', 'Add the second head to tail.'])
  })

  it('carries the teaching goal into the caption when authored', () => {
    const s = describeVisualPayload({
      renderer: 'scene',
      sceneSpec: scene([{ objects: [{ type: 'point' }] }], { teachingGoal: 'why order does not matter' }),
    })
    expect(s.caption).toBe('Vector Addition — why order does not matter')
  })
})

describe('spec payloads describe the real drawing, not a guess', () => {
  it('a graph names its own equation', () => {
    const s = describeVisualPayload({
      renderer: 'spec', visualSpec: { type: 'graph', equation: 'y = 2x + 1' },
    })
    expect(s.elements.join(' ')).toContain('y = 2x + 1')
  })

  it('a number line names its real range and marks', () => {
    const s = describeVisualPayload({
      renderer: 'spec',
      visualSpec: { type: 'number_line', start: -3, end: 3, highlight: [-1, 2] },
    })
    expect(s.elements.join(' ')).toContain('from -3 to 3')
    expect(s.elements.join(' ')).toContain('-1, 2')
  })

  it('a geometry shape reports its actual measurements', () => {
    const s = describeVisualPayload({
      renderer: 'spec',
      visualSpec: { type: 'geometry', shape: 'circle', radius: 4 },
    })
    expect(s.elements.join(' ')).toContain('radius 4')
  })

  it('ascii and missing payloads yield nothing to name', () => {
    expect(describeVisualPayload({ renderer: 'ascii' }).elements).toEqual([])
    expect(describeVisualPayload(null).caption).toBeNull()
  })
})

describe('the contract block teaches from the real figure', () => {
  it('lists the elements and forbids naming anything else', () => {
    const block = buildVisualContractBlock(decision({
      renderer: 'scene',
      sceneSpec: scene([{ objects: [{ type: 'vector', text: 'v₁' }] }]),
    }))
    expect(block).toContain('WHAT THE LEARNER SEES')
    expect(block).toContain('an arrow (vector) labelled "v₁"')
    expect(block).toMatch(/named above, and by those\s+only/)
    // The invented examples that trained the old failure are gone.
    expect(block).not.toContain('look at the arrow')
    expect(block).not.toContain('where the two lines meet')
  })

  it('falls back to a truthful generic reference when nothing is nameable', () => {
    const block = buildVisualContractBlock(decision({ renderer: 'ascii' }))
    // ascii is non-graphical in practice, but a graphical decision with an
    // undescribable payload must still not invent labels.
    expect(block).not.toContain('WHAT THE LEARNER SEES')
    expect(block).toMatch(/name none of them rather than guessing/)
  })

  it('never opens with the bare "look at the figure" line', () => {
    const block = buildVisualContractBlock(decision({
      renderer: 'spec', visualSpec: { type: 'graph', equation: 'y = x^2' },
    }))
    expect(block).toMatch(/Do not open with a bare "look at the figure on your screen"/)
  })

  it('an empty semantics object produces no block at all', () => {
    expect(buildSemanticsBlock({ caption: null, elements: [], steps: [] })).toBe('')
  })
})
