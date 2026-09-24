/**
 * THE PHOTOSYNTHESIS VISUAL-SERVING-LEDGER DISCREPANCY (2026-09-23).
 *
 * MEASURED IN PRODUCTION (bio.plant.photosynthesis, direct SQL against
 * `visual_generation_outcome`/`visualization_cache`): a cached critic REJECT
 * verdict repeatedly triggered resolveVisual.ts's explicit-request retry
 * path. The retry's own fresh generation succeeded structurally, so
 * `generateConceptFigure`'s `finish()` had already written
 * `served: servesImmediately(policy)` — a PRE-CRITIC policy prediction, per
 * `generationPolicy.ts`'s own doc comment on `servesImmediately` — before the
 * retry was judged and discarded. `visual_generation_outcome` therefore read
 * `served: true` for attempts the learner's actual HTTP response never
 * carried a figure for. Live reproduction (disposable QA account against
 * real production, 2026-09-23) confirmed the response never carries a
 * visual/visualSpec/sceneSpec field across repeated explicit "show me a
 * diagram" requests on this concept, while the DB simultaneously recorded
 * `served: true` for those same attempts.
 *
 * THE FIX (`recordNotServed` in resolveVisual.ts): every exit that discards
 * an already-`ok:true` figure now appends ONE additional, best-effort
 * `served: false` outcome row — never editing the original row, only
 * correcting the trail — so a reader taking the LATEST outcome row per
 * attempt sees what the learner actually received. This is deliberately NOT
 * a change to what gets served: a rejected figure is never force-served (the
 * critic's decision, the verdict cache, and admission are all untouched);
 * only the audit trail is made honest. The fix hardcodes `cached: true` on
 * every corrective row because `prismaBudgetReader.countToday()`
 * (generationOutcomeStore.ts) counts `cached: false` rows toward the daily
 * generation budget — a correction costs no fresh provider call (the
 * original row it corrects already counted the real cost), so it must never
 * count a second time.
 *
 * These tests exercise `resolveVisualForTurn` directly with injected deps
 * (cache, critic, outcome sink) — no network, no real database, no LLM —
 * exactly like `visualEngineArchitecture.test.ts`'s own harness.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { figureCacheKey } from '@/lib/teaching/visual/visualEngine'
import { verdictKey, figureFingerprint } from '@/lib/teaching/visual/verdictCache'
import { groundingHash } from '@/lib/teaching/visual/topicIdentity'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { ArchetypeContext } from '@/lib/teaching/visual/archetypes'
import type { GenerationOutcome, GenerationOutcomeSink } from '@/lib/teaching/visual/generationOutcome'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const openBudget = { countToday: async () => 0 }

const passingCritic = async () => ({
  dimensions: {
    relevance: { verdict: 'pass' as const, reason: '' },
    correctness: { verdict: 'pass' as const, reason: '' },
    explanatoryValue: { verdict: 'pass' as const, reason: '' },
    grounding: { verdict: 'pass' as const, reason: '' },
    rendering: { verdict: 'pass' as const, reason: '' },
  },
  decision: 'promote' as const,
  confidence: 1,
  judged: true,
})

const rejectingCritic = async () => ({
  dimensions: {
    relevance: { verdict: 'fail' as const, reason: 'off-topic' },
    correctness: { verdict: 'pass' as const, reason: '' },
    explanatoryValue: { verdict: 'pass' as const, reason: '' },
    grounding: { verdict: 'pass' as const, reason: '' },
    rendering: { verdict: 'pass' as const, reason: '' },
  },
  decision: 'reject' as const,
  confidence: 1,
  judged: true,
})

// No curated asset for either, so the resolver reaches the engine tier.
const CALORIMETRY = 'phys.mech.kinetic-energy'
const PHOTOSYNTHESIS = 'bio.plant.photosynthesis'

const ctxFor = (conceptId: string): ArchetypeContext => {
  const n = getKGNode(conceptId)!
  return {
    conceptId, title: n.title, description: n.description ?? '',
    prerequisites: n.prerequisites ?? [], difficulty: n.difficulty,
  }
}

const scene = (conceptId: string, label: string): SceneSpec => {
  const ctx = ctxFor(conceptId)
  return {
    id: `gen-${conceptId}`, title: ctx.title, sceneType: 'diagram',
    steps: [{ narration: `${ctx.title} — ${label}.`, objects: [
      { type: 'node', position: [-2, 0, 0], text: ctx.title },
      { type: 'node', position: [2, 0, 0], text: `${ctx.title} detail` },
    ] }],
  }
}

/** In-memory VisualizationCacheClient — no real DB, no network. */
function fakeCacheClient() {
  const rows = new Map<string, string>()
  return {
    seed(key: string, code: string) { rows.set(key, code) },
    client: {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) => {
          const code = rows.get(where.conceptKey)
          return code ? { code } : null
        },
        update: async () => undefined,
        create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
          if (!rows.has(data.conceptKey)) rows.set(data.conceptKey, data.code)
        },
        upsert: async ({ where, update }: { where: { conceptKey: string }; update: { code: string } }) => {
          rows.set(where.conceptKey, update.code)
        },
      },
    },
  }
}

function fakeOutcomeSink() {
  const outcomes: GenerationOutcome[] = []
  const sink: GenerationOutcomeSink = { record: async (o) => { outcomes.push(o) } }
  return { outcomes, sink }
}

function carriesFigure(d: { graphical: boolean; payload: unknown }): boolean {
  return d.graphical && d.payload !== null
}

describe('the ledger-correction fix does not change what a learner is served', () => {
  it('1. an accepted/generated visual still reaches the response, unaffected by the fix', async () => {
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => scene(CALORIMETRY, 'accepted'), cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(true)
    expect(d.source).toBe('generated')
    // No corrective row for an attempt that really was served.
    expect(outcomes.some((o) => o.result.ok && o.result.served === false)).toBe(false)
  })

  it('2. visual/visualSpec/sceneSpec consistency: graphical and a non-null payload always agree', async () => {
    const { sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const accepted = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => scene(CALORIMETRY, 'consistency'), cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(accepted.graphical).toBe(accepted.payload !== null)

    const cache2 = fakeCacheClient()
    const rejected = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: rejectingCritic, budgetReader: openBudget,
        generate: async () => scene(CALORIMETRY, 'consistency'), cacheClient: cache2.client, outcomeSink: sink,
      },
    )
    expect(rejected.graphical).toBe(rejected.payload !== null)
    expect(rejected.graphical).toBe(false)
  })

  it('3. a critic-rejected visual stays absent from the response — never force-served', async () => {
    const { sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: rejectingCritic, budgetReader: openBudget,
        generate: async () => scene(CALORIMETRY, 'rejected'), cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:critic-reject')
  })

  it('4. a structurally-invalid figure stays absent from the response', async () => {
    const { sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => ({ id: 'x' }), cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:engine-structurally-invalid')
  })

  it('6. existing visual authority rules are intact: a curated concept never reaches the engine', async () => {
    const { sink } = fakeOutcomeSink()
    let generatorCalled = false
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: 'phys.mech.projectile-motion', subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => { generatorCalled = true; return null }, outcomeSink: sink,
      },
    )
    expect(d.source).toBe('registry')
    expect(generatorCalled).toBe(false)
  })
})

describe('the ledger now agrees with the HTTP response on the discard paths', () => {
  /**
   * Seeds BOTH caches so `resolveVisualForTurn` reproduces the exact
   * production shape: a figure already sitting in the figure cache, and a
   * REJECT verdict already cached against that figure's own fingerprint.
   */
  function seedCachedReject(cache: ReturnType<typeof fakeCacheClient>, conceptId: string, figure: SceneSpec) {
    cache.seed(figureCacheKey(conceptId), JSON.stringify(figure))
    cache.seed(verdictKey(conceptId), JSON.stringify({
      decision: 'reject', confidence: 0.9,
      grounding: groundingHash(ctxFor(conceptId)),
      figure: figureFingerprint(figure),
      judgedAt: Date.now(),
    }))
  }

  it('5a. ordinary turn on a cached-reject concept: no figure served, and the stale served:true row is corrected', async () => {
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const frozen = scene(CALORIMETRY, 'frozen-rejected')
    seedCachedReject(cache, CALORIMETRY, frozen)

    const d = await resolveVisualForTurn(
      // No explicit diagram request — an ordinary teaching turn.
      { message: 'can you explain that again?', lessonConceptId: CALORIMETRY, subject: 'physics' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => frozen, cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:critic-reject-cached')

    const conceptOutcomes = outcomes.filter((o) => o.conceptId === CALORIMETRY)
    expect(conceptOutcomes.length).toBeGreaterThan(0)
    const last = conceptOutcomes[conceptOutcomes.length - 1]
    expect(last.result.ok && last.result.served).toBe(false)
    // Budget-safety: a correction never counts as a fresh provider call.
    expect(last.cached).toBe(true)
  })

  it('5b. explicit "show me a diagram" retry, discarded as an identical figure: ledger agrees with the empty response', async () => {
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const frozen = scene(CALORIMETRY, 'identical-retry')
    seedCachedReject(cache, CALORIMETRY, frozen)

    const d = await resolveVisualForTurn(
      { message: 'can you show me a diagram of this?', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        // The retry regenerates the SAME figure -> identical-figure discard.
        generate: async () => frozen, cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:retry-identical-figure')

    const conceptOutcomes = outcomes.filter((o) => o.conceptId === CALORIMETRY)
    const last = conceptOutcomes[conceptOutcomes.length - 1]
    expect(last.result.ok && last.result.served).toBe(false)
    expect(last.cached).toBe(true)
  })

  it('5c. explicit "show me a diagram" retry, discarded on a second critic reject: ledger agrees with the empty response', async () => {
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const frozen = scene(CALORIMETRY, 'reject-again-original')
    seedCachedReject(cache, CALORIMETRY, frozen)

    const d = await resolveVisualForTurn(
      { message: 'can you show me a diagram of this?', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: rejectingCritic, budgetReader: openBudget,
        // The first attempt is a CACHE HIT on the seeded `frozen` figure —
        // deps.generate is never called for it. The retry skips the cache
        // (ignoreCachedFigure) and is the only call to deps.generate this
        // turn; a genuinely different candidate here means it is judged
        // (not discarded as identical) and hits the critic-reject exit.
        generate: async () => scene(CALORIMETRY, 'reject-again-retry'),
        cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:retry-critic-reject')

    const conceptOutcomes = outcomes.filter((o) => o.conceptId === CALORIMETRY)
    const last = conceptOutcomes[conceptOutcomes.length - 1]
    expect(last.result.ok && last.result.served).toBe(false)
    expect(last.cached).toBe(true)
  })

  it('7. bio.plant.photosynthesis specifically reproduces the formerly-failing shape, then passes: no figure served, ledger says so too', async () => {
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const frozen = scene(PHOTOSYNTHESIS, 'photosynthesis-frozen-rejected')
    seedCachedReject(cache, PHOTOSYNTHESIS, frozen)

    // Exactly the live-reproduced learner action: an explicit diagram request
    // on a concept whose only cached candidate was already rejected.
    const d = await resolveVisualForTurn(
      { message: 'Can you show me a diagram of this?', lessonConceptId: PHOTOSYNTHESIS, subject: 'biology', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        generate: async () => frozen, cacheClient: cache.client, outcomeSink: sink,
      },
    )
    // The response the production incident measured: no visual at all.
    expect(carriesFigure(d)).toBe(false)
    expect(d.provenance).toBe('no-figure:retry-identical-figure')

    // The gap the production incident measured: ledger said served:true for
    // this exact shape. It must not any more — the LATEST row must agree
    // with the empty response above.
    const conceptOutcomes = outcomes.filter((o) => o.conceptId === PHOTOSYNTHESIS)
    expect(conceptOutcomes.length).toBeGreaterThan(0)
    const last = conceptOutcomes[conceptOutcomes.length - 1]
    expect(last.result.ok && last.result.served).toBe(false)
    expect(last.cached).toBe(true)
    // And no PRIOR row for this concept was rewritten — this is a correction
    // appended to the trail, not a rewrite of history.
    expect(conceptOutcomes.some((o) => o.result.ok && o.result.served === true)).toBe(true)
  })

  it('a genuinely promoted retry still replaces the stale reject and IS served', async () => {
    // Negative control for 5c/7: when the retry earns a promote, the fix
    // must not interfere with the normal replace-and-serve path at all.
    const { outcomes, sink } = fakeOutcomeSink()
    const cache = fakeCacheClient()
    const frozen = scene(CALORIMETRY, 'will-be-replaced')
    seedCachedReject(cache, CALORIMETRY, frozen)

    const d = await resolveVisualForTurn(
      { message: 'can you show me a diagram of this?', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      {
        enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
        // First attempt is a cache hit on `frozen` (deps.generate not
        // called); the retry is the only generate call and returns a
        // genuinely different, promotable candidate.
        generate: async () => scene(CALORIMETRY, 'promoted-replacement'),
        cacheClient: cache.client, outcomeSink: sink,
      },
    )
    expect(carriesFigure(d)).toBe(true)
    expect(d.provenance).toContain('generated-retry')
    // A served figure needs no correction.
    const conceptOutcomes = outcomes.filter((o) => o.conceptId === CALORIMETRY)
    const last = conceptOutcomes[conceptOutcomes.length - 1]
    expect(last.result.ok && last.result.served).toBe(true)
  })
})
