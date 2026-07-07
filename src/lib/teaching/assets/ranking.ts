/**
 * Ranking support for the admin review queue and future multi-candidate
 * serving decisions. Deliberately separate from matcher.ts's scoreMatch:
 * that function decides whether ONE candidate is suitable for ONE student
 * turn (hard concept/language/status filters + fit); this ranks assets
 * against EACH OTHER for admin triage and future "best of several
 * equally-suitable candidates" tie-breaking.
 *
 * No new schema fields: usageCount is read live from EvidenceEvent (never
 * written back to AssetIdentity.sampleSize — that remains the Evidence
 * Engine's single-writer field, per ADR 13's invariant); approvalDate is
 * approximated by updatedAt on ACTIVE assets (AssetIdentity has no
 * dedicated reviewedAt column and adding one is out of this task's "no
 * schema redesign" scope); manualPriority is parsed from the existing
 * `tags` array using a `priority:<1-5>` convention.
 */
import type { AssetStatus } from '@prisma/client'

export interface RankableAsset {
  assetId: string
  status: AssetStatus
  qualityScore: number
  qualityConfidence: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface RankingFactors {
  qualityScore: number       // raw Evidence Engine score, 0–1
  evidenceScore: number      // qualityScore weighted by how much evidence backs it, 0–1
  freshness: number          // exponential decay by age, 0–1 (1 = brand new)
  usageCount: number         // ASSET_SHOWN evidence events for this asset
  approvalDateProxy: Date | null // updatedAt when ACTIVE, else null (never approved)
  manualPriority: number     // 0–5, from a `priority:<n>` tag; 0 = unset
}

export interface RankedAsset {
  assetId: string
  factors: RankingFactors
  compositeScore: number // 0–100, for sorting the admin review queue
}

const FRESHNESS_HALF_LIFE_DAYS = 180

export function parseManualPriority(tags: string[]): number {
  for (const tag of tags) {
    const match = /^priority:([0-5])$/.exec(tag)
    if (match) return Number(match[1])
  }
  return 0
}

export function computeFreshness(createdAt: Date, now: Date = new Date()): number {
  const ageDays = Math.max(0, (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  return Math.exp((-Math.LN2 * ageDays) / FRESHNESS_HALF_LIFE_DAYS)
}

export function rankAsset(asset: RankableAsset, usageCount: number, now: Date = new Date()): RankedAsset {
  const evidenceScore = asset.qualityScore * asset.qualityConfidence
  const freshness = computeFreshness(asset.createdAt, now)
  const manualPriority = parseManualPriority(asset.tags)

  const factors: RankingFactors = {
    qualityScore: asset.qualityScore,
    evidenceScore,
    freshness,
    usageCount,
    approvalDateProxy: asset.status === 'ACTIVE' ? asset.updatedAt : null,
    manualPriority,
  }

  // Weighted composite, 0–100. Manual priority is deliberately the largest
  // single lever (a human saying "use this one" should be decisive), then
  // evidence/quality, then freshness and usage as tie-breakers.
  const compositeScore =
    manualPriority * 10 +               // 0–50
    evidenceScore * 30 +                 // 0–30
    freshness * 10 +                     // 0–10
    Math.min(10, Math.log2(usageCount + 1) * 2) // 0–10, diminishing returns

  return { assetId: asset.assetId, factors, compositeScore: Math.min(100, Math.round(compositeScore)) }
}

export function rankAssets(assets: RankableAsset[], usageCounts: Map<string, number>, now: Date = new Date()): RankedAsset[] {
  return assets
    .map((a) => rankAsset(a, usageCounts.get(a.assetId) ?? 0, now))
    .sort((a, b) => b.compositeScore - a.compositeScore)
}
