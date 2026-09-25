/**
 * A stable content fingerprint of a figure payload — pure, no imports.
 *
 * Lives on its own so the pure visual modules (retirement, the resolver's sync
 * tiers) can use it without importing the cache layer. `verdictCache.ts`
 * re-exports it, so there is still exactly one definition: a verdict judged
 * against a figure and a retirement recorded against a figure hash the same way.
 */
export function figureFingerprint(payload: unknown): string {
  const text = JSON.stringify(payload) ?? ''
  let hash = 0
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0
  return `f${(hash >>> 0).toString(16)}`
}
