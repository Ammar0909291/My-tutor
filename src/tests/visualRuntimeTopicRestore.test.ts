import { describe, it, expect } from 'vitest'
import { restoreRuntimeTopicSession, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { figureCacheKey } from '@/lib/teaching/visual/visualEngine'
import { runtimeTopicId, groundingHash } from '@/lib/teaching/visual/topicIdentity'
import { verdictKey, figureFingerprint } from '@/lib/teaching/visual/verdictCache'

/**
 * A GENERATED FIGURE MUST SURVIVE A REFRESH.
 *
 * A curriculum figure is restored by RE-DERIVING it: `resolveVisual` is
 * deterministic, so the concept id alone suffices and no payload is stored.
 * A runtime topic has no curriculum entry to derive from, and its id is a hash
 * of its title, which cannot be turned back into words — so before this,
 * `restoreVisualSession` returned null for every generated figure. Measured:
 * the figure survived every follow-up turn and vanished on reload, mid
 * explanation, with the tutor still referring to it.
 *
 * The restore reads the figure the engine already cached and the PASS it
 * already recorded. It calls no model — a refresh must never cost a generation
 * — and it clears the same bar the live path does: re-validated against the
 * topic, re-checked against the stored verdict, re-admitted by identity.
 */

const TITLE = 'Kubernetes pod scheduling'
const DESCRIPTION =
  'The scheduler filters out nodes that cannot run the pod, then scores the ' +
  'remaining ones and binds the pod to the highest scoring node.'

const FIGURE = {
  type: 'process_flow',
  title: 'Kubernetes pod scheduling',
  steps: [
    { title: 'Pod is created and left pending' },
    { title: 'Scheduler filters nodes that cannot run it' },
    { title: 'Scheduler scores the remaining nodes' },
    { title: 'Pod is bound to the best node' },
  ],
}

const CONCEPT_ID = runtimeTopicId(TITLE)
const ctx = { conceptId: CONCEPT_ID, title: TITLE, description: DESCRIPTION, prerequisites: [] }

function session(overrides: Record<string, unknown> = {}) {
  return {
    conceptId: CONCEPT_ID,
    representation: 'process',
    renderer: 'spec',
    returnToConceptId: 'phys.meas.units',
    turns: 3,
    topic: { title: TITLE, description: DESCRIPTION },
    ...overrides,
  }
}

/** The cache as the engine leaves it after serving one generated figure. */
function warmCache(opts: { verdict?: boolean; figure?: unknown } = {}) {
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
    calls: 0,
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

describe('Restoring a generated figure', () => {
  it('comes back after a refresh, with no model call', async () => {
    const cache = warmCache()
    const restored = await restoreRuntimeTopicSession(session(), { cacheClient: cache.client })
    expect(restored).not.toBeNull()
    expect(restored!.graphical).toBe(true)
    expect(restored!.conceptId).toBe(CONCEPT_ID)
    expect(restored!.conceptTitle).toBe(TITLE)
    expect(restored!.payload?.renderer).toBe('spec')
    expect(restored!.source).toBe('generated')
  })

  it('is still marked as a runtime topic, so the tutor does not present it as curriculum', async () => {
    const cache = warmCache()
    const restored = await restoreRuntimeTopicSession(session(), { cacheClient: cache.client })
    expect(restored!.asset!.provenance).toBe('engine-runtime-topic')
  })

  it('restores NOTHING when the critic never passed it', async () => {
    // Only a PASS is ever cached, so a missing verdict means the figure was
    // generated and held. A refresh must not promote it by accident.
    const cache = warmCache({ verdict: false })
    expect(await restoreRuntimeTopicSession(session(), { cacheClient: cache.client })).toBeNull()
  })

  it('restores NOTHING when the cached figure is not the one that was judged', async () => {
    const cache = warmCache()
    // Same topic, different figure: the fingerprint in the verdict no longer
    // matches, so the verdict does not cover what is about to be served.
    const swapped = { ...FIGURE, steps: [{ title: 'Something else entirely' }, { title: 'And another' }] }
    const rows = warmCache({ figure: swapped, verdict: false })
    const merged = {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) =>
          where.conceptKey === verdictKey(CONCEPT_ID)
            ? (cache.client as never as { visualizationCache: { findUnique: (a: unknown) => Promise<unknown> } })
                .visualizationCache.findUnique({ where })
            : (rows.client as never as { visualizationCache: { findUnique: (a: unknown) => Promise<unknown> } })
                .visualizationCache.findUnique({ where }),
        update: async () => {},
        create: async () => {},
      },
    } as never
    expect(await restoreRuntimeTopicSession(session(), { cacheClient: merged })).toBeNull()
  })

  it('restores NOTHING when the cache is empty', async () => {
    const empty = {
      visualizationCache: {
        findUnique: async () => null, update: async () => {}, create: async () => {},
      },
    } as never
    expect(await restoreRuntimeTopicSession(session(), { cacheClient: empty })).toBeNull()
  })

  it('rejects a snapshot whose words do not hash to its id', async () => {
    // The integrity check that makes carrying the topic in the snapshot safe:
    // a hand-edited row cannot attach an arbitrary description to a cached
    // figure, because the pair no longer hashes to the id it is stored under.
    const cache = warmCache()
    const forged = session({ topic: { title: 'Photosynthesis', description: DESCRIPTION } })
    expect(await restoreRuntimeTopicSession(forged, { cacheClient: cache.client })).toBeNull()
  })

  it('ignores a session that carries no topic words at all', async () => {
    const cache = warmCache()
    expect(await restoreRuntimeTopicSession(session({ topic: undefined }), { cacheClient: cache.client })).toBeNull()
  })

  it('leaves curriculum figures to the deterministic path', async () => {
    // A KG session is not this function's business: it re-derives, it does not
    // read a cache, and the two must not both claim the same session.
    const kg = { conceptId: 'phys.meas.vector-addition', representation: 'vector', renderer: 'scene', returnToConceptId: null, turns: 1 }
    expect(await restoreRuntimeTopicSession(kg, { cacheClient: warmCache().client })).toBeNull()
    expect(restoreVisualSession(kg)).not.toBeNull()
  })
})
