import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { getConceptVisualType, getConceptSceneGenerator, lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { isRuntimeSceneGenerationAllowed, runtimeSceneAllowlist } from '@/lib/teaching/visual/flag'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'

/**
 * THE DESIGNATED AI CANARY CONCEPT.
 *
 * `visualCanaryAllowlist.test.ts` proves the allowlist MECHANISM is sound —
 * exact matching, no wildcards, empty never means all, eligibility checked
 * before the cache. It exercises that mechanism with physics concepts.
 *
 * What no test asserted until now is WHICH concept the canary is. The id lived
 * only in prose, so the value an operator types into the production dashboard
 * had nothing in the repository to check it against.
 *
 * That matters because of a specific, documented confusion:
 *
 *   math.linalg.vector-addition   "Vector Addition"                mathematics
 *   phys.meas.vector-addition     "Vector Addition and Resolution"  physics
 *
 * They are different KG nodes in different subjects. The physics one is
 * CURATED — it has an exact registry binding and a scene generator — and the
 * engine never consults generation for a concept that already has a faithful
 * figure. So allowlisting the physics id would produce a canary that silently
 * does nothing, while appearing to be enabled and "safe".
 *
 * These tests pin the identity, the distinction, and the property that makes
 * the mathematics concept a VALID canary: it is genuinely assetless, so
 * generation is the only way it can ever produce a figure.
 *
 * Test-only. No production code, flag, allowlist or architecture is changed
 * here, and nothing here enables anything.
 */

const CANARY = 'math.linalg.vector-addition'
const NOT_THE_CANARY = 'phys.meas.vector-addition'

const ORIGINAL = {
  ENABLE_AI_SCENE_GENERATION: process.env.ENABLE_AI_SCENE_GENERATION,
  VISUAL_AI_SCENE_ALLOWLIST: process.env.VISUAL_AI_SCENE_ALLOWLIST,
}

beforeEach(() => {
  delete process.env.ENABLE_AI_SCENE_GENERATION
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
})

afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.ENABLE_AI_SCENE_GENERATION
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.VISUAL_AI_SCENE_ALLOWLIST
})

describe('Canary concept — identity', () => {
  it('the canary concept exists in the canonical Knowledge Graph', () => {
    const node = getKGNode(CANARY)
    expect(node, `${CANARY} is not a KG concept`).toBeTruthy()
    expect(node!.title).toBe('Vector Addition')
  })

  it('is a DIFFERENT concept from the deterministic physics one', () => {
    const maths = getKGNode(CANARY)!
    const physics = getKGNode(NOT_THE_CANARY)!
    expect(maths.id).not.toBe(physics.id)
    expect(maths.title).not.toBe(physics.title)
    expect(physics.title).toBe('Vector Addition and Resolution')
  })

  it('is genuinely assetless — which is what makes it a valid canary', () => {
    // If it had a curated figure, generation would never be consulted for it
    // and the canary would prove nothing.
    expect(getConceptVisualType(CANARY), 'canary must have no curated card').toBeNull()
    expect(getConceptSceneGenerator(CANARY), 'canary must have no scene generator').toBeNull()
    expect(lookupConceptVisualBinding(CANARY), 'canary must have no registry binding').toBeFalsy()
    expect(isRetiredVisualBinding(CANARY), 'canary must not be a retired binding').toBe(false)
  })

  it('receives NO FIGURE today, with generation off', () => {
    const d = resolveVisual({
      message: 'Explain vector addition with a diagram',
      lessonConceptId: CANARY, subject: 'mathematics', learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toContain('no-faithful-visual')
  })

  it('the physics concept is curated and must NOT be used as the canary', () => {
    const d = resolveVisual({
      message: '', lessonConceptId: NOT_THE_CANARY, subject: 'physics', learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.source).toBe('registry')
  })
})

describe('Canary concept — eligibility', () => {
  it('IS eligible with nothing configured — no id has to be typed first', () => {
    // The inversion. This file was written when eligibility was an
    // enumeration; the engine now has to reach topics nobody listed, and the
    // bounds are grounding, budgets and the critic rather than a list.
    expect(isRuntimeSceneGenerationAllowed(CANARY)).toBe(true)
    expect(runtimeSceneAllowlist().size).toBe(0)
  })

  it('becomes eligible ONLY with both the flag and its exact id', () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    expect(isRuntimeSceneGenerationAllowed(CANARY)).toBe(true)
    // and nothing else comes with it
    expect(isRuntimeSceneGenerationAllowed(NOT_THE_CANARY)).toBe(false)
    expect(isRuntimeSceneGenerationAllowed('math.linalg.vector')).toBe(false)
    expect(isRuntimeSceneGenerationAllowed('mathematics')).toBe(false)
  })

  it('a narrowing excludes everything outside it, and the kill switch beats both', () => {
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    expect(isRuntimeSceneGenerationAllowed(CANARY)).toBe(true)
    expect(isRuntimeSceneGenerationAllowed(NOT_THE_CANARY)).toBe(false)
    process.env.ENABLE_AI_SCENE_GENERATION = 'false'
    expect(isRuntimeSceneGenerationAllowed(CANARY)).toBe(false)
  })

  it('allowlisting the PHYSICS id would be a silent no-op — the mistake is detectable', () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = NOT_THE_CANARY
    // It would be "eligible" by the flag...
    expect(isRuntimeSceneGenerationAllowed(NOT_THE_CANARY)).toBe(true)
    // ...but it is curated, so the engine never reaches generation for it, and
    // the real canary stays denied. An operator who typed the wrong id would
    // see no generated visual anywhere.
    expect(isRuntimeSceneGenerationAllowed(CANARY)).toBe(false)
    const d = resolveVisual({ message: '', lessonConceptId: NOT_THE_CANARY, subject: 'physics' })
    expect(d.source).toBe('registry')
  })
})

describe('Canary concept — the generation path, up to the provider boundary', () => {
  it('with the canary DISABLED the generator is never invoked', async () => {
    let invoked = false
    const d = await resolveVisualForTurn(
      { message: 'Explain vector addition with a diagram', lessonConceptId: CANARY, subject: 'mathematics', learnerRequest: 'diagram' },
      { generate: async () => { invoked = true; return null } },
    )
    expect(invoked, 'generation must not be attempted while the canary is off').toBe(false)
    expect(d.graphical).toBe(false)
  })

  it('with the canary ENABLED the generator IS invoked for it', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    let invoked = false
    await resolveVisualForTurn(
      { message: 'Explain vector addition with a diagram', lessonConceptId: CANARY, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        generate: async () => { invoked = true; return null },
        cacheClient: null as never,
        budgetReader: { countToday: async () => 0 },
      },
    )
    expect(invoked, 'generation must be reachable for the enabled canary').toBe(true)
  })

  it('with the canary ENABLED an OTHER concept still never reaches the generator', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    let invoked = false
    await resolveVisualForTurn(
      { message: '', lessonConceptId: 'phys.mech.kinetic-energy', subject: 'physics', learnerRequest: 'diagram' },
      {
        generate: async () => { invoked = true; return null },
        cacheClient: null as never,
        budgetReader: { countToday: async () => 0 },
      },
    )
    expect(invoked, 'only the allowlisted concept may generate').toBe(false)
  })

  it('a provider failure leaves the canary with no figure, never a substitute', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CANARY, subject: 'mathematics', learnerRequest: 'diagram' },
      { generate: async () => { throw new Error('provider down') }, cacheClient: null as never },
    )
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toContain('no-figure')
  })

  it('a scene about a DIFFERENT concept is rejected for the canary', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    // A perfectly well-formed scene — of photosynthesis.
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CANARY, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        cacheClient: null as never,
        generate: async () => ({
          id: 'x', title: 'Vector Addition', sceneType: 'diagram',
          steps: [{ narration: 'n', objects: [
            { type: 'node', position: [0, 0, 0], text: 'chloroplast' },
            { type: 'node', position: [2, 0, 0], text: 'glucose' },
            { type: 'arrow', from: [0, 0, 0], to: [2, 0, 0], text: 'light energy' },
          ] }],
        }),
      },
    )
    expect(d.graphical, 'an off-concept scene must never be served').toBe(false)
    expect(d.payload).toBeNull()
  })

  it('malformed model output is rejected', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CANARY
    for (const junk of [null, 'not json', {}, { steps: [] }, { steps: [{ objects: [] }] }]) {
      const d = await resolveVisualForTurn(
        { message: '', lessonConceptId: CANARY, subject: 'mathematics' },
        { generate: async () => junk, cacheClient: null as never },
      )
      expect(d.graphical, `malformed payload accepted: ${JSON.stringify(junk)}`).toBe(false)
      expect(d.payload).toBeNull()
    }
  })
})
