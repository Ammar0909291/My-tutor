import { describe, it, expect } from 'vitest'
import { restoreGeneratedFigureForConcept, restoreVisualSession, restoreRuntimeTopicSession } from '@/lib/teaching/visual/resolveVisual'
import { figureCacheKey } from '@/lib/teaching/visual/visualEngine'
import { kgTopicIdentity, groundingHash } from '@/lib/teaching/visual/topicIdentity'
import { verdictKey, figureFingerprint } from '@/lib/teaching/visual/verdictCache'

/**
 * REAL-STUDENT REPORT, Chemistry Lesson 2 (States of Matter): "On lesson
 * resume, Tutor said the figure was already on screen although no figure was
 * rendered. Refreshing did not correctly restore it; a later nudge generated
 * one."
 *
 * REPRODUCED LIVE (disposable QA account, chem.found.states-of-matter): the
 * lesson served a genuine `visualSpec` payload on a real turn. Simulating a
 * refresh — `GET /api/sessions/history`, exactly what LessonScreen.tsx calls
 * on mount — came back with an EMPTY `visuals` map (checked twice, 3 seconds
 * apart, ruling out a timing artefact), while the stored message text still
 * read "The figure you're looking at shows...". The same harness, same turn
 * budget, run against phys.em.electric-dipole (a concept-owned SCENE figure)
 * restored correctly and completely — isolating the gap to concepts with no
 * curated tier, not the restoration pipeline in general.
 *
 * ROOT CAUSE: `chem.found.states-of-matter` has neither a Tier-0
 * scene-generator binding nor a Tier-1 curated registry binding (both
 * confirmed by reading resolveVisual.ts's tier list), so its figure comes
 * from the generation/cache tier — the SAME tier a genuine off-curriculum
 * "runtime topic" uses. `restoreRuntimeTopicSession` is the only restore path
 * that can read that tier back (it needs an async cache lookup, which
 * `restoreVisualSession`'s synchronous re-derivation cannot do) — but its own
 * guard, `!isRuntimeTopicId(session.conceptId)`, refuses every real KG
 * concept, on the unstated assumption that a KG concept is always served by
 * one of the two synchronous tiers. That assumption is false exactly when
 * neither tier has a binding for it.
 *
 * FIX: `restoreGeneratedFigureForConcept` — the identical cache-read-and-
 * revalidate logic (now shared via `restoreFromFigureCache`), reached via
 * `kgTopicIdentity` instead of `runtimeTopicIdentity`. No model call, no
 * generation, no new trust: the same admission bar the live turn and the
 * runtime-topic restore both already clear.
 */

const CONCEPT_ID = 'chem.found.states-of-matter'

const FIGURE = {
  type: 'process_flow',
  title: 'States of Matter',
  steps: [
    { title: 'Solid — particles vibrate in a fixed lattice' },
    { title: 'Melting (heating)' },
    { title: 'Liquid — particles slide past each other' },
    { title: 'Evaporation (heating)' },
    { title: 'Gas — particles move freely, widely spaced' },
  ],
}

function session(overrides: Record<string, unknown> = {}) {
  return {
    conceptId: CONCEPT_ID,
    representation: 'process',
    renderer: 'spec',
    returnToConceptId: null,
    turns: 0,
    ...overrides,
  }
}

/** The cache as the engine leaves it after serving one generated figure —
 *  identical mock shape to visualRuntimeTopicRestore.test.ts, so both restore
 *  paths are exercised the same honest way. */
function warmCache(opts: { verdict?: boolean; figure?: unknown } = {}) {
  const ctx = kgTopicIdentity(CONCEPT_ID)!
  const rows = new Map<string, string>()
  rows.set(figureCacheKey(CONCEPT_ID), JSON.stringify(opts.figure ?? FIGURE))
  if (opts.verdict !== false) {
    rows.set(verdictKey(CONCEPT_ID), JSON.stringify({
      decision: 'promote',
      confidence: 1,
      grounding: groundingHash(ctx),
      figure: figureFingerprint(opts.figure ?? FIGURE),
      judgedAt: Date.now(),
    }))
  }
  return {
    client: {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) =>
          rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
        update: async () => {},
        create: async () => {},
      },
    } as never,
  }
}

describe('restoreGeneratedFigureForConcept — the exact reported failure shape', () => {
  it('restores a KG concept\'s generated figure after a refresh, with no model call', async () => {
    const cache = warmCache()
    const restored = await restoreGeneratedFigureForConcept(session(), { cacheClient: cache.client })
    expect(restored).not.toBeNull()
    expect(restored!.graphical).toBe(true)
    expect(restored!.conceptId).toBe(CONCEPT_ID)
    expect(restored!.payload?.renderer).toBe('spec')
    expect(restored!.source).toBe('generated')
  })

  it('is marked curated (a real KG concept), not engine-runtime-topic', async () => {
    const cache = warmCache()
    const restored = await restoreGeneratedFigureForConcept(session(), { cacheClient: cache.client })
    expect(restored!.asset!.provenance).toBe('curated')
  })

  it('this is exactly the case restoreVisualSession and restoreRuntimeTopicSession both refuse — proving the fix closes a real gap, not a duplicate path', async () => {
    // The synchronous deterministic path has no binding for this concept.
    expect(restoreVisualSession(session())).toBeNull()
    // The runtime-topic path refuses on sight: this is a real KG id.
    const cache = warmCache()
    expect(await restoreRuntimeTopicSession(session(), { cacheClient: cache.client })).toBeNull()
  })
})

describe('restoreGeneratedFigureForConcept — negative controls (never fabricate a figure)', () => {
  it('restores NOTHING when the critic never passed it (held, not promoted)', async () => {
    const cache = warmCache({ verdict: false })
    expect(await restoreGeneratedFigureForConcept(session(), { cacheClient: cache.client })).toBeNull()
  })

  it('restores NOTHING when the cached figure is not the one that was judged', async () => {
    const swapped = { ...FIGURE, steps: [{ title: 'Something else entirely' }] }
    const cache = warmCache({ figure: swapped, verdict: false })
    expect(await restoreGeneratedFigureForConcept(session(), { cacheClient: cache.client })).toBeNull()
  })

  it('restores NOTHING when the cache is empty', async () => {
    const empty = {
      visualizationCache: { findUnique: async () => null, update: async () => {}, create: async () => {} },
    } as never
    expect(await restoreGeneratedFigureForConcept(session(), { cacheClient: empty })).toBeNull()
  })

  it('refuses a runtime-topic id outright — this function is the KG-only counterpart', async () => {
    const cache = warmCache()
    const runtimeLike = session({ conceptId: 'topic:deadbeefdeadbeef' })
    expect(await restoreGeneratedFigureForConcept(runtimeLike, { cacheClient: cache.client })).toBeNull()
  })

  it('refuses a concept id with no KG node at all', async () => {
    const cache = warmCache()
    const bogus = session({ conceptId: 'chem.found.does-not-exist' })
    expect(await restoreGeneratedFigureForConcept(bogus, { cacheClient: cache.client })).toBeNull()
  })

  it('never claims ownership of a HELD figure it does not belong to — cross-concept isolation', async () => {
    // A session for a DIFFERENT concept must never resolve against this
    // concept's cache row, even though both are real KG ids.
    const cache = warmCache()
    const otherConcept = session({ conceptId: 'chem.found.pure-substances' })
    expect(await restoreGeneratedFigureForConcept(otherConcept, { cacheClient: cache.client })).toBeNull()
  })
})
