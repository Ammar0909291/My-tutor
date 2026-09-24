import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  saveVisualization,
  getCachedVisualization,
  replaceVisualization,
  normalizeConceptKey,
  type VisualizationCacheClient,
} from '@/lib/teaching/visuals/visualizationCache'

/**
 * `saveVisualization` is create-only and best-effort by design (see the
 * module's own header): a duplicate-key race between two learners generating
 * the same concept simultaneously is EXPECTED and must stay silent — the
 * loser's write correctly loses, no error should ever reach the caller.
 *
 * What this file guards is the narrower thing that race-swallowing must not
 * also do: hide every OTHER kind of write failure with the exact same
 * silence. Before this fix, `.catch(() => {})` made a genuine P2002 race and
 * a genuine connection failure indistinguishable — both vanished with zero
 * trace. Only the unexpected case should now be logged; the race must still
 * be completely silent, and the call must never throw either way.
 */

function p2002(): Error & { code: string } {
  const err = new Error('Unique constraint failed on the fields: (`conceptKey`)') as Error & { code: string }
  err.code = 'P2002'
  return err
}

function connectionError(): Error & { code: string } {
  const err = new Error('Connection terminated unexpectedly') as Error & { code: string }
  err.code = 'P1001'
  return err
}

describe('saveVisualization', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })
  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('never throws and stays completely silent on a P2002 duplicate-key race', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn().mockRejectedValue(p2002()),
      },
    }
    await expect(saveVisualization('a concept', 'code', client)).resolves.toBeUndefined()
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('logs, but still never throws, on a non-race write failure', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn().mockRejectedValue(connectionError()),
      },
    }
    await expect(saveVisualization('a concept', 'code', client)).resolves.toBeUndefined()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0][0]).toContain('[visualization-cache]')
  })

  it('logs, but never throws, on an error with no code at all (e.g. a thrown string/non-Prisma error)', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn().mockRejectedValue(new Error('boom')),
      },
    }
    await expect(saveVisualization('a concept', 'code', client)).resolves.toBeUndefined()
    expect(warnSpy).toHaveBeenCalledTimes(1)
  })

  it('writes the row and never warns on a normal successful save', async () => {
    const create = vi.fn().mockResolvedValue(undefined)
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique: vi.fn(), update: vi.fn(), create },
    }
    await saveVisualization('a concept', 'code', client)
    expect(create).toHaveBeenCalledWith({ data: { conceptKey: 'a concept', code: 'code' } })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('is a no-op for an empty conceptKey or empty code — never calls create', async () => {
    const create = vi.fn()
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique: vi.fn(), update: vi.fn(), create },
    }
    await saveVisualization('', 'code', client)
    await saveVisualization('a concept', '', client)
    expect(create).not.toHaveBeenCalled()
  })
})

// ── Regression coverage for the module's other two writers, untouched by
//    this fix but previously without a dedicated unit test at all. ──────────

describe('getCachedVisualization', () => {
  it('returns the cached code on a hit and best-effort increments renderCount', async () => {
    const update = vi.fn().mockResolvedValue(undefined)
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn().mockResolvedValue({ code: 'cached-code' }),
        update,
        create: vi.fn(),
      },
    }
    const result = await getCachedVisualization('a concept', client)
    expect(result).toEqual({ code: 'cached-code' })
    expect(update).toHaveBeenCalledWith({
      where: { conceptKey: 'a concept' },
      data: { renderCount: { increment: 1 } },
    })
  })

  it('returns null on a miss without calling update', async () => {
    const update = vi.fn()
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique: vi.fn().mockResolvedValue(null), update, create: vi.fn() },
    }
    expect(await getCachedVisualization('a concept', client)).toBeNull()
    expect(update).not.toHaveBeenCalled()
  })

  it('returns null (never throws) if the lookup itself fails', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn().mockRejectedValue(new Error('db down')),
        update: vi.fn(),
        create: vi.fn(),
      },
    }
    expect(await getCachedVisualization('a concept', client)).toBeNull()
  })

  it('returns null for an empty conceptKey without touching the client', async () => {
    const findUnique = vi.fn()
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique, update: vi.fn(), create: vi.fn() },
    }
    expect(await getCachedVisualization('', client)).toBeNull()
    expect(findUnique).not.toHaveBeenCalled()
  })
})

describe('replaceVisualization', () => {
  it('upserts (overwrites an existing row) when upsert is available', async () => {
    const upsert = vi.fn().mockResolvedValue(undefined)
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique: vi.fn(), update: vi.fn(), create: vi.fn(), upsert },
    }
    await replaceVisualization('a concept', 'new-code', client)
    expect(upsert).toHaveBeenCalledWith({
      where: { conceptKey: 'a concept' },
      create: { conceptKey: 'a concept', code: 'new-code' },
      update: { code: 'new-code' },
    })
  })

  it('degrades to a no-op, never throws, when the client has no upsert method', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: { findUnique: vi.fn(), update: vi.fn(), create: vi.fn() },
    }
    await expect(replaceVisualization('a concept', 'new-code', client)).resolves.toBeUndefined()
  })

  it('never throws even if the upsert itself rejects', async () => {
    const client: VisualizationCacheClient = {
      visualizationCache: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
        upsert: vi.fn().mockRejectedValue(new Error('db down')),
      },
    }
    await expect(replaceVisualization('a concept', 'new-code', client)).resolves.toBeUndefined()
  })
})

describe('normalizeConceptKey', () => {
  it('lowercases, strips punctuation, and collapses whitespace', () => {
    expect(normalizeConceptKey('  Newton\'s   First Law!!  ')).toBe('newton s first law')
  })

  it('caps the key length at 200 characters', () => {
    const long = 'a'.repeat(500)
    expect(normalizeConceptKey(long).length).toBe(200)
  })
})
