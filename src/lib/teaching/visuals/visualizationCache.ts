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
