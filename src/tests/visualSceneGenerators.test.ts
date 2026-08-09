import { describe, it, expect } from 'vitest'
import { buildCanonicalScene, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'

/**
 * The 29 deterministic scene generators were fully written, fully unit-tested,
 * and completely unreachable in production: their only entry point routed by
 * keyword-matching the model's prose, and every parameter extractor called the
 * LLM. These tests pin the activation.
 */
describe('Scene generator activation', () => {
  it('every activated generator builds a scene', () => {
    const failures = ACTIVATED_SCENE_KINDS.filter((k) => buildCanonicalScene(k) === null)
    expect(failures, `generators returning null: ${failures.join(', ')}`).toEqual([])
  })

  it('every generated scene passes the SAME validator the client runs', () => {
    const failures: string[] = []
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      if (!scene) { failures.push(`${kind}: null`); continue }
      const result = validateSceneSpec(scene)
      if (!result.valid) failures.push(`${kind}: ${JSON.stringify(result.errors)}`)
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('generation is deterministic — no LLM, no randomness, no clock', () => {
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const a = JSON.stringify(buildCanonicalScene(kind))
      const b = JSON.stringify(buildCanonicalScene(kind))
      expect(b, kind).toBe(a)
    }
  })

  it('is synchronous — a generator can never introduce a second model round-trip', () => {
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      expect(scene, kind).not.toBeInstanceOf(Promise)
    }
  })

  it('an unknown or malformed kind degrades to null rather than throwing', () => {
    expect(buildCanonicalScene(null)).toBeNull()
    expect(buildCanonicalScene('not_a_generator')).toBeNull()
    expect(buildCanonicalScene('')).toBeNull()
  })

  it('scenes carry real teaching content, not empty shells', () => {
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)!
      expect(scene.title.length, kind).toBeGreaterThan(0)
      expect(scene.steps.length, kind).toBeGreaterThan(0)
      const objects = scene.steps.flatMap((s) => s.objects)
      expect(objects.length, kind).toBeGreaterThan(0)
    }
  })
})

describe('Scene generator activation — reaches the resolver', () => {
  it('a registry concept naming a generator now renders that generator', () => {
    // phys.mech.collisions-elastic is bound to the 'collision' generator and had
    // no production caller before this change.
    expect(getConceptSceneGenerator('phys.mech.collisions-elastic')).toBe('collision')
    const d = resolveVisual({ message: '', lessonConceptId: 'phys.mech.collisions-elastic' })
    expect(d.payload.renderer).toBe('scene')
    expect(d.provenance).toContain('generator:')
  })

  it('every concept with a generator binding resolves through it', () => {
    const misses: string[] = []
    for (const subject of ['mathematics', 'physics', 'chemistry', 'biology', 'computer_science']) {
      const graph = getKnowledgeGraph(subject)
      if (!graph) continue
      for (const node of getAllNodes(graph)) {
        const kind = getConceptSceneGenerator(node.id)
        if (!kind || !ACTIVATED_SCENE_KINDS.includes(kind)) continue
        // A binding retired in M3-B/B1 is deliberately not served — the figure
        // depicted a different situation. Skipped here, asserted in
        // visualRetiredBindings.test.ts.
        if (isRetiredVisualBinding(node.id)) continue
        const d = resolveVisual({ message: '', lessonConceptId: node.id, subject })
        if (d.payload.renderer !== 'scene') misses.push(`${node.id} (${kind}) -> ${d.payload.renderer}`)
      }
    }
    expect(misses, misses.slice(0, 10).join('\n')).toEqual([])
  })

  it('a concept without a generator still falls back to its card', () => {
    expect(getConceptSceneGenerator('math.arith.fractions')).toBeNull()
    const d = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions' })
    expect(d.graphical).toBe(true)
    expect(d.payload.renderer).toBe('card')
  })
})
