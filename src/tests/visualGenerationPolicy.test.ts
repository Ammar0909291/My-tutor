import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  resolveServicePolicy, servesImmediately, reviewOnlyList, generationPolicySummary,
} from '@/lib/teaching/visual/generationPolicy'
import {
  recordGenerationOutcome, describeOutcome, type GenerationOutcome, type GenerationOutcomeSink,
} from '@/lib/teaching/visual/generationOutcome'
import { generateConceptScene } from '@/lib/teaching/visual/visualEngine'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * ELIGIBILITY IS A RULE NOW, AND IT IS STILL BOUNDED.
 *
 * Policy used to come from two hand-typed lists. It cannot: the engine has to
 * work for topics nobody enumerated in advance. What replaced them is a rule —
 * kill switch, optional narrowing, grounding, budgets — and these tests pin the
 * parts of it that could go wrong quietly.
 *
 * The property that matters most is what a PASS is allowed to mean. It makes a
 * figure eligible to SERVE. It never promotes anything to ACTIVE, at any
 * confidence: that stays a human decision, and a policy that could grant it
 * would convert one model's opinion into the platform's own content.
 */

const CONCEPT = 'phys.mech.viscosity'
const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
  auto: process.env.VISUAL_AI_SCENE_AUTO,
  review: process.env.VISUAL_AI_SCENE_REVIEW_ONLY,
}

beforeEach(() => {
  delete process.env.ENABLE_AI_SCENE_GENERATION
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_AUTO
  delete process.env.VISUAL_AI_SCENE_REVIEW_ONLY
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
  process.env.VISUAL_AI_SCENE_AUTO = ORIGINAL.auto
  process.env.VISUAL_AI_SCENE_REVIEW_ONLY = ORIGINAL.review
})

describe('service policy', () => {
  it('NO ENUMERATION IS REQUIRED — a topic nobody listed still has a policy', () => {
    // The whole point of the rewrite: an engine that can only draw concepts
    // someone typed cannot draw the topic a learner actually raised.
    expect(resolveServicePolicy('phys.some.topic.nobody.listed')).toBe('auto')
  })

  it('THE KILL SWITCH DEMOTES EVERYTHING AT ONCE', () => {
    for (const off of ['false', '0', 'off', 'no', 'FALSE', ' Off ']) {
      process.env.ENABLE_AI_SCENE_GENERATION = off
      expect(resolveServicePolicy(CONCEPT), off).toBe('off')
    }
  })

  it('a missing flag does not silently disable the engine', () => {
    // The failure this file has already had once, in the other direction: a
    // migration flag whose absence would have meant "show no visuals ever".
    delete process.env.ENABLE_AI_SCENE_GENERATION
    expect(resolveServicePolicy(CONCEPT)).toBe('auto')
  })

  it('an explicit narrowing still excludes everything outside it', () => {
    process.env.VISUAL_AI_SCENE_ALLOWLIST = 'phys.therm.calorimetry'
    expect(resolveServicePolicy(CONCEPT)).toBe('off')
    expect(resolveServicePolicy('phys.therm.calorimetry')).toBe('auto')
  })

  it('the narrowing has no wildcard — it cannot be widened by a typo', () => {
    process.env.VISUAL_AI_SCENE_ALLOWLIST = 'phys.*, physics, *'
    expect(resolveServicePolicy(CONCEPT)).toBe('off')
  })

  it('the review-only list holds a topic back whatever the critic says', () => {
    process.env.VISUAL_AI_SCENE_REVIEW_ONLY = CONCEPT
    expect(resolveServicePolicy(CONCEPT)).toBe('reviewed')
    expect(servesImmediately('reviewed')).toBe(false)
    expect(resolveServicePolicy('phys.therm.calorimetry')).toBe('auto')
  })

  it('the review-only list is empty by default and never means "all"', () => {
    expect(reviewOnlyList().size).toBe(0)
    process.env.VISUAL_AI_SCENE_REVIEW_ONLY = '   '
    expect(reviewOnlyList().size).toBe(0)
  })

  it('SERVING IS NOT PROMOTION — no policy value grants ACTIVE', () => {
    // `servesImmediately` answers whether a figure may be shown, never whether
    // it becomes the platform's content. Nothing here returns a status.
    for (const policy of ['off', 'reviewed', 'auto'] as const) {
      expect(typeof servesImmediately(policy)).toBe('boolean')
    }
    expect(servesImmediately('auto')).toBe(true)
    expect(servesImmediately('off')).toBe(false)
  })

  it('describes the rule rather than enumerating concepts it cannot list', () => {
    expect(generationPolicySummary().scope).toBe('rule-based')
    process.env.VISUAL_AI_SCENE_ALLOWLIST = CONCEPT
    expect(generationPolicySummary().scope).toBe('narrowed')
    process.env.ENABLE_AI_SCENE_GENERATION = 'false'
    expect(generationPolicySummary().scope).toBe('disabled')
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
