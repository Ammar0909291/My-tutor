import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  resolveServicePolicy, servesImmediately, autoServeList, generationPolicySummary,
} from '@/lib/teaching/visual/generationPolicy'
import {
  recordGenerationOutcome, describeOutcome, type GenerationOutcome, type GenerationOutcomeSink,
} from '@/lib/teaching/visual/generationOutcome'
import { generateConceptScene } from '@/lib/teaching/visual/visualEngine'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * TRUST, NOT MERELY ELIGIBILITY.
 *
 * The allowlist answers "may this concept be generated". It cannot answer "may
 * the result be shown to a child", and until now nothing did — a validated
 * scene went straight to a learner. These tests pin the separation, and pin the
 * property the first real measurement showed matters most: a REJECTION is
 * recorded, because a discarded rejection makes a weak generator and an
 * over-strict rule look identical.
 */

const CONCEPT = 'phys.mech.viscosity'
const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
  auto: process.env.VISUAL_AI_SCENE_AUTO,
}

beforeEach(() => {
  delete process.env.ENABLE_AI_SCENE_GENERATION
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_AUTO
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
  process.env.VISUAL_AI_SCENE_AUTO = ORIGINAL.auto
})

const eligible = () => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = CONCEPT
}

describe('service policy', () => {
  it('is off when generation is not enabled at all', () => {
    expect(resolveServicePolicy(CONCEPT)).toBe('off')
  })

  it('is off for a concept that is not allowlisted, even if it is auto-listed', () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
    // Eligibility is the master gate: auto-serve cannot smuggle in a concept
    // the allowlist never admitted.
    expect(resolveServicePolicy(CONCEPT)).toBe('off')
  })

  it('defaults an eligible concept to REVIEWED, not to serving', () => {
    eligible()
    expect(resolveServicePolicy(CONCEPT)).toBe('reviewed')
    expect(servesImmediately('reviewed')).toBe(false)
  })

  it('serves only when the concept is named in the separate auto list', () => {
    eligible()
    process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
    expect(resolveServicePolicy(CONCEPT)).toBe('auto')
    expect(servesImmediately('auto')).toBe(true)
  })

  it('the auto list has no wildcard and empty never means all', () => {
    eligible()
    process.env.VISUAL_AI_SCENE_AUTO = 'phys.*, physics, *'
    expect(autoServeList().has(CONCEPT)).toBe(false)
    expect(resolveServicePolicy(CONCEPT)).toBe('reviewed')
    process.env.VISUAL_AI_SCENE_AUTO = '   '
    expect(autoServeList().size).toBe(0)
  })

  it('switching the flag off demotes every concept at once', () => {
    eligible()
    process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
    expect(resolveServicePolicy(CONCEPT)).toBe('auto')
    delete process.env.ENABLE_AI_SCENE_GENERATION
    expect(resolveServicePolicy(CONCEPT)).toBe('off')
  })

  it('summarises what generation is actually doing right now', () => {
    eligible()
    process.env.VISUAL_AI_SCENE_ALLOWLIST = `${CONCEPT},phys.therm.calorimetry`
    process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
    expect(generationPolicySummary()).toEqual([
      { conceptId: 'phys.mech.viscosity', policy: 'auto' },
      { conceptId: 'phys.therm.calorimetry', policy: 'reviewed' },
    ])
  })
})

describe('outcome recording', () => {
  const sceneOf = (): SceneSpec => ({
    id: 's', title: 'Viscosity', sceneType: 'diagram',
    steps: [{ narration: 'two plates shear a fluid', objects: [
      { type: 'node', position: [0, 0, 0], text: 'viscosity' },
      { type: 'node', position: [1, 0, 0], text: 'shear' },
    ] }],
  })

  const outcome = (over: Partial<GenerationOutcome> = {}): GenerationOutcome => ({
    conceptId: CONCEPT, conceptTitle: 'Viscosity', policy: 'reviewed',
    elapsedMs: 1200, cached: false, model: 'gemini-3.5-flash-lite',
    result: { ok: true, scene: sceneOf(), served: false },
    ...over,
  })

  it('reports honestly when there is no sink — dropped is not recorded', async () => {
    expect(await recordGenerationOutcome(outcome())).toBe(false)
  })

  it('a sink that throws never propagates', async () => {
    const sink: GenerationOutcomeSink = { record: async () => { throw new Error('db down') } }
    await expect(recordGenerationOutcome(outcome(), sink)).resolves.toBe(false)
  })

  it('accepted-and-held reads differently from accepted-and-served', () => {
    const held = describeOutcome(outcome())
    const served = describeOutcome(outcome({
      policy: 'auto', result: { ok: true, scene: sceneOf(), served: true },
    }))
    expect(held).toContain('HELD-FOR-REVIEW')
    expect(served).toContain('SERVED')
    expect(held).not.toEqual(served)
  })

  it('a rejection carries its reason', () => {
    const line = describeOutcome(outcome({
      result: { ok: false, reason: 'not-anchored-to-concept', scene: null },
    }))
    expect(line).toContain('rejected:not-anchored-to-concept')
  })

  it('THE POINT: a rejected generation is written down, not discarded', async () => {
    // Measured 2026-08-10: the anchor rule rejected 7 of 7 authored
    // gold-standard figures. That pattern was invisible because rejections were
    // thrown away. This is the test that would have made it visible.
    const seen: GenerationOutcome[] = []
    const sink: GenerationOutcomeSink = { record: async (o) => { seen.push(o) } }

    const result = await generateConceptScene(
      { conceptId: CONCEPT, title: 'Viscosity', description: 'resistance to shear', prerequisites: [] },
      {
        enabled: () => true,
        policy: 'reviewed',
        outcomeSink: sink,
        // A scene that cannot anchor: no concept vocabulary on any object.
        generate: async () => ({
          id: 'x', title: 'x', sceneType: 'diagram',
          steps: [{ narration: 'n', objects: [
            { type: 'node', position: [0, 0, 0], text: 'alpha' },
            { type: 'node', position: [1, 0, 0], text: 'beta' },
          ] }],
        }),
      },
    )

    expect(result.ok).toBe(false)
    expect(seen).toHaveLength(1)
    expect(seen[0].result.ok).toBe(false)
    expect(seen[0].conceptId).toBe(CONCEPT)
    expect(seen[0].policy).toBe('reviewed')
  })

  it('an ineligible concept records nothing — nothing was attempted', async () => {
    const seen: GenerationOutcome[] = []
    const sink: GenerationOutcomeSink = { record: async (o) => { seen.push(o) } }
    const result = await generateConceptScene(
      { conceptId: CONCEPT, title: 'Viscosity', description: 'resistance to shear', prerequisites: [] },
      { enabled: () => false, outcomeSink: sink },
    )
    expect(result).toEqual({ ok: false, reason: 'flag-off' })
    expect(seen).toEqual([])
  })
})
