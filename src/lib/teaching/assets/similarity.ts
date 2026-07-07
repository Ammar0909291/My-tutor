/**
 * Deterministic, symbolic text similarity — no embeddings, no external
 * calls, no new infrastructure. ADR 14 §6 is explicit that pgvector
 * embedding similarity is a Phase 3+ concern, "not required for the hot
 * retrieval path"; this applies the same principle to duplicate detection.
 * Good enough to catch true near-duplicates (same explanation reworded
 * slightly by repeated LLM generations); intentionally not a claim of deep
 * semantic understanding. Upgrading to embedding-based similarity later is
 * additive — nothing here would need to change shape.
 */

const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'to', 'of', 'and', 'in', 'on', 'for', 'this', 'that', 'it', 'be', 'as', 'with'])

export function normalizeForComparison(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  return new Set(words)
}

/** Jaccard similarity of two texts' normalized token sets — 0 (disjoint) to 1 (identical vocabulary). */
export function jaccardSimilarity(a: string, b: string): number {
  const setA = normalizeForComparison(a)
  const setB = normalizeForComparison(b)
  if (setA.size === 0 && setB.size === 0) return 1
  if (setA.size === 0 || setB.size === 0) return 0

  let intersection = 0
  for (const word of setA) if (setB.has(word)) intersection++
  const union = setA.size + setB.size - intersection
  return intersection / union
}

/** Above this, two explanations for the same concept+kind+language are
 * treated as duplicates of each other rather than independent assets. */
export const DUPLICATE_SIMILARITY_THRESHOLD = 0.85

/**
 * Lightweight non-cryptographic content hash — good enough for exact-
 * duplicate detection and cheap change comparison; avoids a Node crypto
 * import in a module also used by edge-adjacent code paths. Shared by both
 * Explanation Memory and the Teaching Action Repository so every asset
 * family hashes content the same way.
 */
export function hashContent(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    hash = (hash * 31 + content.charCodeAt(i)) | 0
  }
  return `h${(hash >>> 0).toString(16)}`
}
