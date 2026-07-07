/**
 * Repository statistics — read-only reporting over Explanation Memory /
 * Teaching Action Repository. No writes, no serving-path involvement;
 * purely for the admin completeness report (task 7). Coverage is computed
 * against the canonical Knowledge Graph (docs/{subject}/kg/graph.json),
 * never against curriculum content itself — this only counts what already
 * exists in AssetIdentity, it does not generate or grade anything.
 *
 * Scales by construction: every query here is either grouped/aggregated at
 * the database level (Prisma groupBy) or scoped to one canonicalSlug group
 * at a time (duplicate detection) — nothing does an O(n²) scan over the
 * whole repository, so this holds up whether the catalogue has hundreds or
 * millions of rows.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus } from '@prisma/client'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'
import { jaccardSimilarity, DUPLICATE_SIMILARITY_THRESHOLD } from './similarity'
import { captureTracker, type CaptureHealthStats } from './captureTracker'

export interface ConceptAssetCounts {
  conceptId: string
  title: string
  explanationCount: number
  probeCount: number
}

export interface DuplicateCandidate {
  conceptId: string
  canonicalSlug: string
  assetIdA: string
  assetIdB: string
  similarity: number
}

export interface SubjectRepositoryReport {
  subjectSlug: string
  totalConcepts: number
  conceptsWithExplanations: number  // ACTIVE only — see conceptsWithZeroAssets note
  conceptsWithProbes: number        // ACTIVE only
  explanationCoveragePercent: number
  probeCoveragePercent: number
  // "Zero assets" means zero SERVABLE (ACTIVE) assets — a genuine content
  // gap that will keep going through the LLM regardless of how many DRAFTs
  // are sitting in the review queue for it. A concept can appear here AND
  // have a nonzero contribution to assetsNeedingReview at the same time:
  // that combination means "nothing servable yet, but a reviewer approving
  // the pending draft(s) would close the gap" — two different admin actions.
  conceptsWithZeroAssets: string[] // capped list of concept ids
  conceptsWithZeroAssetsTotal: number
  assetsNeedingReview: number // DRAFT + REVIEW, both families, any concept
  duplicateCandidates: DuplicateCandidate[]
  // Task 6 additions — automatic-growth pipeline health, on top of the
  // Phase 4 completeness fields above.
  conceptsWithZeroExplanations: number // ACTIVE explanationCount === 0, distinct from conceptsWithZeroAssets (which requires BOTH families empty)
  conceptsWithZeroProbes: number       // ACTIVE probeCount === 0
  averageAssetsPerConcept: number      // mean ACTIVE (explanation + probe) count across this subject's concepts
  versionChains: number                // canonicalSlug lineages (any family, any status) with more than one version
  captureHealth: CaptureHealthStats    // process-local capture attempt outcomes since last restart — see captureTracker.ts
}

const ZERO_ASSET_LIST_CAP = 50
const DUPLICATE_LIST_CAP = 50

/** Per-concept ACTIVE asset counts for one subject — the raw material both
 * the completeness report and any future "which concepts need content
 * next" tooling would use. */
export async function getConceptAssetCounts(subjectSlug: string): Promise<ConceptAssetCounts[]> {
  const graph = getKnowledgeGraph(subjectSlug)
  if (!graph) return []
  const nodes = getAllNodes(graph)
  const conceptIds = nodes.map((n) => n.slug)
  if (conceptIds.length === 0) return []

  const [explanationCounts, probeCounts] = await Promise.all([
    prisma.assetIdentity.groupBy({
      by: ['conceptId'],
      where: { conceptId: { in: conceptIds }, family: AssetFamily.EXPLANATION, status: AssetStatus.ACTIVE },
      _count: { _all: true },
    }),
    prisma.assetIdentity.groupBy({
      by: ['conceptId'],
      where: { conceptId: { in: conceptIds }, family: AssetFamily.PROBE, status: AssetStatus.ACTIVE },
      _count: { _all: true },
    }),
  ])

  const explanationMap = new Map(explanationCounts.map((c) => [c.conceptId, c._count._all]))
  const probeMap = new Map(probeCounts.map((c) => [c.conceptId, c._count._all]))

  return nodes.map((n) => ({
    conceptId: n.slug,
    title: n.title,
    explanationCount: explanationMap.get(n.slug) ?? 0,
    probeCount: probeMap.get(n.slug) ?? 0,
  }))
}

/** Finds near-duplicate ACTIVE/DRAFT/REVIEW assets within the same
 * canonicalSlug lineage that are NOT already linked as parent/child
 * versions — i.e. content that should probably have been versioned
 * together but wasn't (predates this pipeline, or a rare near-miss at the
 * capture-time threshold). Scoped per lineage group, so this stays cheap
 * regardless of total repository size. */
export async function getDuplicateCandidates(subjectSlug: string, limit = DUPLICATE_LIST_CAP): Promise<DuplicateCandidate[]> {
  const graph = getKnowledgeGraph(subjectSlug)
  if (!graph) return []
  const conceptIds = getAllNodes(graph).map((n) => n.slug)
  if (conceptIds.length === 0) return []

  const assets = await prisma.assetIdentity.findMany({
    where: { conceptId: { in: conceptIds }, status: { in: [AssetStatus.ACTIVE, AssetStatus.DRAFT, AssetStatus.REVIEW] } },
    include: { explanationAsset: true, probeAsset: true },
  })

  const byLineage = new Map<string, typeof assets>()
  for (const asset of assets) {
    const group = byLineage.get(asset.canonicalSlug) ?? []
    group.push(asset)
    byLineage.set(asset.canonicalSlug, group)
  }

  const candidates: DuplicateCandidate[] = []
  for (const [canonicalSlug, group] of byLineage) {
    if (group.length < 2) continue
    for (let i = 0; i < group.length && candidates.length < limit; i++) {
      for (let j = i + 1; j < group.length && candidates.length < limit; j++) {
        const a = group[i]
        const b = group[j]
        if (a.parentVersionId === b.assetId || b.parentVersionId === a.assetId) continue // already a known version chain
        const textA = a.explanationAsset?.content ?? a.probeAsset?.stem
        const textB = b.explanationAsset?.content ?? b.probeAsset?.stem
        if (!textA || !textB) continue
        const similarity = jaccardSimilarity(textA, textB)
        if (similarity >= DUPLICATE_SIMILARITY_THRESHOLD) {
          candidates.push({ conceptId: a.conceptId, canonicalSlug, assetIdA: a.assetId, assetIdB: b.assetId, similarity })
        }
      }
    }
  }
  return candidates
}

/** Count of canonicalSlug lineages (any family/status, scoped to this
 * subject) that have grown past version 1 — i.e. a generation was captured
 * as a genuinely improved rewrite rather than a duplicate or a fresh
 * concept. Grouped at the database level, so this is cheap at any scale. */
export async function getVersionChainCount(subjectSlug: string): Promise<number> {
  const groups = await prisma.assetIdentity.groupBy({
    by: ['canonicalSlug'],
    where: { conceptId: { startsWith: subjectPrefix(subjectSlug) } },
    _max: { version: true },
  })
  return groups.filter((g) => (g._max.version ?? 0) > 1).length
}

export async function getSubjectRepositoryReport(subjectSlug: string): Promise<SubjectRepositoryReport> {
  const [conceptCounts, duplicateCandidates, assetsNeedingReview, versionChains] = await Promise.all([
    getConceptAssetCounts(subjectSlug),
    getDuplicateCandidates(subjectSlug),
    prisma.assetIdentity.count({
      where: { status: { in: [AssetStatus.DRAFT, AssetStatus.REVIEW] }, conceptId: { startsWith: subjectPrefix(subjectSlug) } },
    }),
    getVersionChainCount(subjectSlug),
  ])

  const totalConcepts = conceptCounts.length
  const conceptsWithExplanations = conceptCounts.filter((c) => c.explanationCount > 0).length
  const conceptsWithProbes = conceptCounts.filter((c) => c.probeCount > 0).length
  const zeroAssetConcepts = conceptCounts.filter((c) => c.explanationCount === 0 && c.probeCount === 0).map((c) => c.conceptId)
  const totalAssetCount = conceptCounts.reduce((sum, c) => sum + c.explanationCount + c.probeCount, 0)

  return {
    subjectSlug,
    totalConcepts,
    conceptsWithExplanations,
    conceptsWithProbes,
    explanationCoveragePercent: totalConcepts > 0 ? Math.round((conceptsWithExplanations / totalConcepts) * 100) : 0,
    probeCoveragePercent: totalConcepts > 0 ? Math.round((conceptsWithProbes / totalConcepts) * 100) : 0,
    conceptsWithZeroAssets: zeroAssetConcepts.slice(0, ZERO_ASSET_LIST_CAP),
    conceptsWithZeroAssetsTotal: zeroAssetConcepts.length,
    assetsNeedingReview,
    duplicateCandidates,
    conceptsWithZeroExplanations: totalConcepts - conceptsWithExplanations,
    conceptsWithZeroProbes: totalConcepts - conceptsWithProbes,
    averageAssetsPerConcept: totalConcepts > 0 ? Math.round((totalAssetCount / totalConcepts) * 100) / 100 : 0,
    versionChains,
    captureHealth: captureTracker.stats(),
  }
}

// Canonical KG ids are prefixed by domain, e.g. "phys.mech.gravity" — the
// first segment is a stable, cheap way to scope a count query by subject
// without needing every AssetIdentity row to carry a redundant subjectSlug
// column.
function subjectPrefix(subjectSlug: string): string {
  const PREFIXES: Record<string, string> = { physics: 'phys.', mathematics: 'math.', english: 'eng.' }
  return PREFIXES[subjectSlug] ?? `${subjectSlug}.`
}
