/**
 * Caches LLM-generated visualization code (generateVisualizationCode.ts) per
 * normalized concept, so the same concept asked by any student only ever
 * costs one Groq call. Global cache (VisualizationCache has no userId) —
 * the generated code is a pure function of the concept text, not of who
 * asked. Same non-fatal, .catch()-guarded pattern as ChapterContentCache/
 * RevisionNotesCache (src/lib/school/chapterContent.ts) — a DB error here
 * must never block a turn; it just falls back to a fresh generation.
 */

import { prisma as defaultPrisma } from '@/lib/prisma'

/** Minimal shape used here — lets tests pass a mock instead of the real client. */
export interface VisualizationCacheClient {
  visualizationCache: {
    findUnique: (args: { where: { conceptKey: string } }) => Promise<{ code: string } | null>
    update: (args: { where: { conceptKey: string }; data: { renderCount: { increment: number } } }) => Promise<unknown>
    create: (args: { data: { conceptKey: string; code: string } }) => Promise<unknown>
    /**
     * Optional: present on a real Prisma client, absent on the narrow stubs
     * some callers pass. `replaceVisualization` degrades to a no-op without
     * it rather than throwing, because caching is never load-bearing.
     */
    upsert?: (args: {
      where: { conceptKey: string }
      create: { conceptKey: string; code: string }
      update: { code: string }
    }) => Promise<unknown>
  }
}

/**
 * Normalizes free-form explanation text into a stable cache key: lowercase,
 * punctuation stripped, collapsed whitespace, capped to a bounded length so
 * near-duplicate phrasings of the same concept (e.g. trailing punctuation,
 * extra spaces) hit the same cache row instead of fragmenting the cache.
 */
export function normalizeConceptKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 200)
}

export interface CachedVisualization {
  code: string
}

/**
 * Looks up a cached visualization by concept key. On hit, increments
 * renderCount (best-effort — failure to increment doesn't block the read).
 * Returns null on a cache miss or any DB error.
 */
export async function getCachedVisualization(
  conceptKey: string,
  client: VisualizationCacheClient = defaultPrisma,
): Promise<CachedVisualization | null> {
  if (!conceptKey) return null

  const cached = await client.visualizationCache.findUnique({ where: { conceptKey } }).catch(() => null)
  if (!cached) return null

  client.visualizationCache
    .update({ where: { conceptKey }, data: { renderCount: { increment: 1 } } })
    .catch(() => {})

  return { code: cached.code }
}

/**
 * Saves a newly generated visualization under its concept key. Ignores a
 * duplicate-key race (another request cached the same concept first) and
 * any other DB error — caching is a best-effort optimization, never a
 * requirement for the turn to succeed.
 */
export async function saveVisualization(
  conceptKey: string,
  code: string,
  client: VisualizationCacheClient = defaultPrisma,
): Promise<void> {
  if (!conceptKey || !code) return

  await client.visualizationCache
    .create({ data: { conceptKey, code } })
    .catch(() => {})
}

/**
 * Overwrite an existing row, where `saveVisualization` deliberately will not.
 *
 * THE DIFFERENCE MATTERS AND IS NOT A REFACTOR. `saveVisualization` is
 * create-only so a race between two learners generating the same concept keeps
 * the first result rather than flapping — right for a first write. But it makes
 * a cached entry PERMANENT, and that is what turned one critic-rejected figure
 * into a concept that could never be drawn again: the rejected candidate stayed
 * in the cache, was re-offered on every turn, and re-earned its cached
 * rejection forever.
 *
 * Used only where a caller has established that the stored value is a dead end
 * and has a vetted replacement in hand. Best-effort like every other write
 * here: a failure costs the next learner a regeneration, never this one their
 * turn.
 */
export async function replaceVisualization(
  conceptKey: string,
  code: string,
  client: VisualizationCacheClient = defaultPrisma,
): Promise<void> {
  if (!conceptKey || !code) return
  const upsert = client.visualizationCache.upsert
  if (!upsert) return
  await upsert.call(client.visualizationCache, {
    where: { conceptKey },
    create: { conceptKey, code },
    update: { code },
  }).catch(() => {})
}
