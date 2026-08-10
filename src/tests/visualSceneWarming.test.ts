import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { warmConceptScenes, describeWarmReport } from '@/lib/teaching/visual/sceneWarming'
import { generateConceptScene } from '@/lib/teaching/visual/visualEngine'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * WARMING MOVES THE COST; IT MUST NOT ADD ANY.
 *
 * The economy of runtime generation is that a concept costs at most ONE
 * provider call for the whole platform, ever. A warm pass that re-generated
 * cached concepts, or that warmed concepts the allowlist never admitted, would
 * quietly destroy that — so those are the properties worth pinning, along with
 * the ceiling that stops a pass emptying a quota.
 */

const CONCEPT = 'phys.mech.viscosity'
const OTHER = 'phys.therm.calorimetry'

const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
}
beforeEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = `${CONCEPT},${OTHER}`
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
})

/**
 * A scene that genuinely anchors to phys.mech.viscosity ("Viscosity and
 * Stokes' Law"): two DISTINCT labels drawn from the concept's own title, and
 * three geometric objects. Anything less is rejected by the anchor rule, which
 * is correct — the fixture has to be faithful for these tests to be about
 * warming rather than about validation.
 */
const faithful = (word = 'viscosity'): SceneSpec => ({
  id: 's', title: word, sceneType: 'diagram',
  steps: [{
    narration: `${word} is shown with its own parts labelled.`,
    objects: [
      { type: 'node', position: [0, 0, 0], text: 'viscosity' },
      { type: 'node', position: [1, 0, 0], text: 'stokes drag' },
      { type: 'arrow', from: [0, 0, 0], to: [1, 0, 0] },
    ],
  }],
})

const emptyCache = () => ({
  visualizationCache: {
    findUnique: async () => null,
    update: async () => undefined,
    create: async () => undefined,
  },
})

describe('warming', () => {
  it('generates for an eligible concept and reports the call', async () => {
    let calls = 0
    const report = await warmConceptScenes([CONCEPT], {
      maxCalls: 5,
      cacheClient: emptyCache(),
      generate: async () => { calls++; return faithful('viscosity') },
    })
    expect(calls).toBe(1)
    expect(report.generated).toBe(1)
    expect(report.estimatedCalls).toBe(1)
  })

  it('A CACHED CONCEPT COSTS NOTHING — the whole economy of this', async () => {
    let calls = 0
    const cached = {
      visualizationCache: {
        findUnique: async () => ({ code: JSON.stringify(faithful('viscosity')) }),
        update: async () => undefined,
        create: async () => undefined,
      },
    }
    const report = await warmConceptScenes([CONCEPT], {
      maxCalls: 5,
      cacheClient: cached as never,
      generate: async () => { calls++; return faithful('viscosity') },
    })
    expect(calls).toBe(0)
    expect(report.cached).toBe(1)
    expect(report.estimatedCalls).toBe(0)
  })

  it('never warms a concept the allowlist did not admit', async () => {
    process.env.VISUAL_AI_SCENE_ALLOWLIST = OTHER
    let calls = 0
    const report = await warmConceptScenes([CONCEPT], {
      maxCalls: 5,
      cacheClient: emptyCache(),
      generate: async () => { calls++; return faithful('viscosity') },
    })
    expect(calls).toBe(0)
    expect(report.skipped).toBe(1)
    expect(report.results[0].outcome).toBe('skipped-not-eligible')
  })

  it('stops at the call ceiling rather than finishing the list', async () => {
    let calls = 0
    const report = await warmConceptScenes([CONCEPT, OTHER], {
      maxCalls: 1,
      cacheClient: emptyCache(),
      generate: async () => { calls++; return faithful('viscosity') },
    })
    expect(calls).toBe(1)
    expect(report.results).toHaveLength(1)
  })

  it('a rejection is reported with its reason and does not stop the pass', async () => {
    const report = await warmConceptScenes([CONCEPT, OTHER], {
      maxCalls: 5,
      cacheClient: emptyCache(),
      // No concept vocabulary anywhere: rejected by the anchor.
      generate: async () => ({
        id: 'x', title: 'x', sceneType: 'diagram',
        steps: [{ narration: 'n', objects: [
          { type: 'node', position: [0, 0, 0], text: 'alpha' },
          { type: 'node', position: [1, 0, 0], text: 'beta' },
        ] }],
      }),
    })
    expect(report.rejected).toBe(2)
    expect(report.results[0].reason).toBeTruthy()
  })

  it('an unknown concept id is skipped, not thrown', async () => {
    process.env.VISUAL_AI_SCENE_ALLOWLIST = 'phys.not.a.real.concept'
    const report = await warmConceptScenes(['phys.not.a.real.concept'], {
      maxCalls: 5, cacheClient: emptyCache(), generate: async () => faithful('viscosity'),
    })
    expect(report.results[0].outcome).toBe('unknown-concept')
  })

  it('summarises a pass in one line', async () => {
    const report = await warmConceptScenes([CONCEPT], {
      maxCalls: 5, cacheClient: emptyCache(), generate: async () => faithful('viscosity'),
    })
    expect(describeWarmReport(report)).toContain('provider calls')
  })
})

describe('the on-turn budget', () => {
  // The description must actually contain the vocabulary the fixture labels
  // use, or the scene is rejected by the anchor and these tests would be
  // measuring validation instead of the budget.
  const ctx = {
    conceptId: CONCEPT,
    title: "Viscosity and Stokes' Law",
    description: "Viscosity measures a fluid's internal resistance to flow; Stokes' law gives the drag force on a sphere.",
    prerequisites: [],
  }

  it('a slow provider yields NO FIGURE rather than a hanging turn', async () => {
    const result = await generateConceptScene(ctx, {
      enabled: () => true,
      policy: 'auto',
      budgetMs: 20,
      cacheClient: emptyCache(),
      generate: () => new Promise((resolve) => setTimeout(() => resolve(faithful('viscosity')), 400)),
    })
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.reason).toBe('budget-exceeded')
  })

  it('the same generation inside the budget succeeds', async () => {
    const result = await generateConceptScene(ctx, {
      enabled: () => true,
      policy: 'auto',
      budgetMs: 2000,
      cacheClient: emptyCache(),
      generate: async () => faithful('viscosity'),
    })
    expect(result.ok).toBe(true)
  })

  it('budget 0 disables the clock — nobody is waiting on a warm pass', async () => {
    const result = await generateConceptScene(ctx, {
      enabled: () => true,
      policy: 'auto',
      budgetMs: 0,
      cacheClient: emptyCache(),
      generate: () => new Promise((resolve) => setTimeout(() => resolve(faithful('viscosity')), 60)),
    })
    expect(result.ok).toBe(true)
  })
})
