/**
 * Deterministic capture-time decision: given the existing assets in a
 * canonicalSlug lineage (same conceptId + familyKind + language) and a
 * newly generated candidate, decide whether to skip it (exact/near
 * duplicate), version it (a genuinely improved rewrite of the same kind of
 * explanation), or start a brand-new lineage (nothing comparable exists
 * yet). Pure — no Prisma, no I/O — the caller supplies the lineage rows and
 * performs whatever action is decided.
 *
 * "Improved explanations never overwrite older approved ones": a new
 * version is always a NEW row (parentVersionId points backward), never an
 * UPDATE of an existing one. The reviewer decides when/whether the new
 * version supersedes the old ACTIVE one (see reviewExplanationAsset).
 */
import { jaccardSimilarity, DUPLICATE_SIMILARITY_THRESHOLD } from './similarity'

export interface LineageAsset {
  assetId: string
  contentHash: string
  content: string
  version: number
}

export type CaptureDecision =
  | { action: 'skip-duplicate'; matchedAssetId: string; similarity: number }
  | { action: 'new-version'; parentVersionId: string; nextVersion: number; similarity: number }
  | { action: 'new-lineage' }

export function decideCaptureAction(
  candidateContent: string,
  candidateContentHash: string,
  existingLineage: LineageAsset[],
): CaptureDecision {
  if (existingLineage.length === 0) return { action: 'new-lineage' }

  // Exact byte-for-byte duplicate (identical hash) — always skip, regardless
  // of similarity threshold tuning.
  const exact = existingLineage.find((a) => a.contentHash === candidateContentHash)
  if (exact) return { action: 'skip-duplicate', matchedAssetId: exact.assetId, similarity: 1 }

  // Compare against the latest version only — older superseded versions
  // don't need to keep matching against every future generation.
  const latest = existingLineage.reduce((a, b) => (b.version > a.version ? b : a))
  const similarity = jaccardSimilarity(candidateContent, latest.content)

  if (similarity >= DUPLICATE_SIMILARITY_THRESHOLD) {
    return { action: 'skip-duplicate', matchedAssetId: latest.assetId, similarity }
  }

  return { action: 'new-version', parentVersionId: latest.assetId, nextVersion: latest.version + 1, similarity }
}
