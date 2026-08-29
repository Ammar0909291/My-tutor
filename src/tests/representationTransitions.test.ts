/**
 * Representation transitions — four views over ONE object set.
 *
 * The claim being tested is identity: a learner following the lever from the
 * situation into the diagram must be following the SAME lever. A layer that
 * rebuilt or re-laid-out the figure between views would look similar and teach
 * nothing, so these tests check coordinates and ids rather than appearances.
 */
import { describe, expect, it } from 'vitest'
import {
  availableRepresentations, decorForView, focusForView, linkSymbols, objectsForView, workingLines,
} from '@/lib/teaching/visual/representation'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'
import { canonicalParametricScene, PARAMETRIC_SCENES } from '@/lib/teaching/visual/parametricScenes'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const torque = canonicalParametricScene('torque_diagram')!
const torqueExplainer = deriveExplainer(torque)
const torqueObjects = torque.steps.flatMap((s) => s.objects)

describe('object identity is preserved across views', () => {
  it('never rewrites an object — a kept object is the SAME object', () => {
    for (const view of ['spatial', 'schematic', 'symbolic', 'numeric'] as const) {
      for (const shown of objectsForView(torqueObjects, view)) {
        const original = torqueObjects.find((o) => o.id === shown.id)
        expect(shown, `${view}/${shown.id}`).toBe(original)
      }
    }
  })

  it('narrows monotonically: later views never re-introduce what the diagram dropped', () => {
    const spatial = objectsForView(torqueObjects, 'spatial').length
    const schematic = objectsForView(torqueObjects, 'schematic').length
    expect(schematic).toBeLessThanOrEqual(spatial)
    expect(objectsForView(torqueObjects, 'symbolic').length).toBe(schematic)
  })

  it('keeps the quantities that carry the relationship, and drops bare apparatus', () => {
    const scene: SceneSpec = {
      id: 's', title: 'T', sceneType: 'diagram',
      steps: [{
        objects: [
          { type: 'bond', id: 'wall', from: [0, 0, 0], to: [1, 0, 0], color: ROLE.reference },
          { type: 'vector', id: 'force', from: [0, 0, 0], to: [0, 2, 0], color: ROLE.input },
          { type: 'label', id: 'named', position: [1, 1, 0], text: 'pivot', color: ROLE.reference },
        ],
      }],
    }
    const kept = objectsForView(scene.steps[0].objects, 'schematic').map((o) => o.id)
    expect(kept).toContain('force')
    // A NAMED piece of apparatus is being talked about, so it stays.
    expect(kept).toContain('named')
    expect(kept).not.toContain('wall')
  })
})

describe('a view is offered only when it says something new', () => {
  it('always offers the situation', () => {
    expect(availableRepresentations(torque, torqueExplainer)[0].view).toBe('spatial')
  })

  it('offers the full progression for a figure that has apparatus and a result', () => {
    expect(availableRepresentations(torque, torqueExplainer).map((r) => r.view))
      .toEqual(['spatial', 'schematic', 'symbolic', 'numeric'])
  })

  it('offers no schematic step when there is no apparatus to strip', () => {
    const bare: SceneSpec = {
      id: 'b', title: 'B', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'vector', id: 'v', from: [0, 0, 0], to: [1, 1, 0], color: ROLE.input }] }],
    }
    expect(availableRepresentations(bare, deriveExplainer(bare)).map((r) => r.view)).toEqual(['spatial'])
  })

  it('offers no symbolic step when the figure states no relationship', () => {
    expect(availableRepresentations(torque, { panels: [], result: undefined }).map((r) => r.view))
      .not.toContain('symbolic')
  })

  it('offers no numeric step without an evaluated value', () => {
    expect(availableRepresentations(torque, { panels: torqueExplainer.panels, result: { expression: 'τ = r × F' } })
      .map((r) => r.view)).not.toContain('numeric')
  })

  it('states what every offered step teaches', () => {
    for (const kind of Object.keys(PARAMETRIC_SCENES)) {
      const spec = canonicalParametricScene(kind)!
      for (const r of availableRepresentations(spec, deriveExplainer(spec))) {
        expect(r.teaches.length, `${kind}/${r.view}`).toBeGreaterThan(20)
        expect(r.label.length).toBeGreaterThan(2)
      }
    }
  })
})

describe('the stage stops being spatial when the view stops being about space', () => {
  it('draws the ground and triad only in the situation view', () => {
    expect(decorForView('spatial')).toBe(true)
    expect(decorForView('schematic')).toBe(false)
    expect(decorForView('symbolic')).toBe(false)
    expect(decorForView('numeric')).toBe(false)
  })

  it('leads with the result once the view is about the answer', () => {
    expect(focusForView(torqueObjects, 'spatial').size).toBe(0)
    expect(focusForView(torqueObjects, 'schematic').size).toBe(0)
    expect([...focusForView(torqueObjects, 'numeric')]).toContain('torqueLabel')
  })
})

describe('symbols are linked to the objects they stand for', () => {
  const legend = torqueExplainer.legend ?? []

  it('rebuilds the line EXACTLY — a dropped character is a wrong formula', () => {
    for (const line of workingLines(torqueExplainer)) {
      expect(linkSymbols(line, legend).map((t) => t.text).join('')).toBe(line)
    }
  })

  it('paints a symbol in the colour of the object it names', () => {
    const tokens = linkSymbols('τ = |r| |F| sin θ', [
      { label: 'r = 2 m', color: ROLE.output },
      { label: 'F = 10 N', color: ROLE.input },
    ])
    expect(tokens.find((t) => t.text === 'r')?.color).toBe(ROLE.output)
    expect(tokens.find((t) => t.text === 'F')?.color).toBe(ROLE.input)
  })

  it('leaves anything the figure does not draw in ordinary ink', () => {
    const tokens = linkSymbols('τ = 2 × 10 × sin(90°)', [{ label: 'r = 2 m', color: ROLE.output }])
    expect(tokens.filter((t) => t.color)).toEqual([])
  })

  it('never treats a WORD as a symbol', () => {
    const tokens = linkSymbols('Force applied here', [{ label: 'Force vector', color: ROLE.input }])
    expect(tokens.filter((t) => t.color)).toEqual([])
  })

  it('degrades to plain text with no legend', () => {
    expect(linkSymbols('a = b', [])).toEqual([{ text: 'a = b' }])
  })
})
