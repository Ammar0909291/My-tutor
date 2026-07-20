/**
 * Explanation Memory — Phase 2 (capture) + Phase 3 (retrieval) for the
 * EXPLANATION family of the Knowledge Asset schema (W1-4 / ADR 14 Phase 1,
 * already in place — AssetIdentity + ExplanationAsset tables, previously
 * empty with "no readers, no writers, no retrieval").
 *
 * "Prefer a stored explanation before calling the LLM": findBestExplanation
 * only ever returns an ACTIVE asset above the confidence threshold — nothing
 * is ACTIVE until a human reviewer promotes it (reviewExplanationAsset), so
 * this is a safe no-op until curated. captureGeneratedExplanation writes a
 * DRAFT after every successful LLM generation, growing the review queue.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus, AuthorKind, ExplanationStyle, GradeBand } from '@prisma/client'
import type { ExplanationKind } from './assetIdentity'
import type { StudentState } from './studentState'
import { pickBest, type MatchableAsset, type MatchOptions } from './matcher'
import { decideCaptureAction, type LineageAsset, type CaptureOutcome } from './versioning'
import { hashContent } from './similarity'

// P0 (Explanation Memory serving metadata — observability only, ADR 13/14
// aligned): `servingMode`/`exactGradeMatch`/`fallbackUsed`/`fallbackReason`
// describe HOW a memory hit was reached — never a provider value (the
// `provider` field on the chat response stays exactly 'memory' regardless
// of mode). Derived purely from the two pickBest() calls already made below
// (default threshold, then the pre-existing threshold=0 grade-band
// fallback) — no new query, no new scoring, no new threshold, no change to
// which asset is selected.
export type ExplanationServingMode = 'exact_match' | 'grade_fallback' | 'confidence_fallback'
export type ExplanationFallbackReason = 'none' | 'grade_band' | 'confidence'

export interface ExplanationMatch {
  assetId: string
  content: string
  familyKind: string
  confidence: number
  servingMode: ExplanationServingMode
  exactGradeMatch: boolean
  fallbackUsed: boolean
  fallbackReason: ExplanationFallbackReason
}

// Classifies a pickBest() hit into the servingMode/fallbackReason taxonomy.
// usedFallbackPath = true only when the result came from the threshold=0
// grade-band fallback call (i.e. nothing cleared DEFAULT_CONFIDENCE_THRESHOLD
// on the normal pass) — this is real, existing branching already in this
// file; classification never influences which asset was picked.
//
// Any non-exact gradeBand is surfaced as a grade fallback regardless of
// which pickBest() call reached it (the normal 65-point pass via the
// HIGH<->ADULT bonus / adjacent-band +10, or the threshold=0 last-resort
// branch) — from the requester's point of view both mean "you didn't get
// content authored for your exact band." confidence_fallback is reserved
// for the one remaining real case: gradeBand was exact but tags/quality
// still left the score short of 65, so only the threshold=0 branch served it.
function classify(exactGradeMatch: boolean, usedFallbackPath: boolean): { servingMode: ExplanationServingMode; fallbackUsed: boolean; fallbackReason: ExplanationFallbackReason } {
  if (exactGradeMatch && !usedFallbackPath) return { servingMode: 'exact_match', fallbackUsed: false, fallbackReason: 'none' }
  if (!exactGradeMatch) return { servingMode: 'grade_fallback', fallbackUsed: true, fallbackReason: 'grade_band' }
  return { servingMode: 'confidence_fallback', fallbackUsed: true, fallbackReason: 'confidence' }
}

interface ExplanationCandidateRow extends MatchableAsset {
  explanationAsset: { content: string } | null
  familyKind: string
}

/** Phase 3: retrieval. Returns null (never throws) on any failure — a lookup
 * miss must always degrade to the existing LLM path, never break a turn. */
export async function findBestExplanation(
  state: StudentState,
  options: MatchOptions = {},
): Promise<ExplanationMatch | null> {
  try {
    const candidates = await prisma.assetIdentity.findMany({
      where: { family: AssetFamily.EXPLANATION, conceptId: state.conceptId, language: state.language, status: AssetStatus.ACTIVE },
      include: { explanationAsset: true },
      take: 50, // small per-concept catalogue expected; caps a pathological hot concept
    })

    const rows: ExplanationCandidateRow[] = candidates
      .filter((c) => c.explanationAsset)
      .map((c) => ({
        assetId: c.assetId,
        conceptId: c.conceptId,
        language: c.language,
        gradeBand: c.gradeBand,
        status: c.status,
        qualityScore: c.qualityScore,
        qualityConfidence: c.qualityConfidence,
        tags: c.tags,
        incompatibilities: c.incompatibilities,
        familyKind: c.familyKind,
        explanationAsset: c.explanationAsset,
      }))

    const best = pickBest(state, rows, options)
    if (best) {
      const meta = classify(best.exactGradeMatch, false)
      return {
        assetId: best.asset.assetId,
        content: best.asset.explanationAsset!.content,
        familyKind: best.asset.familyKind,
        confidence: best.confidence,
        exactGradeMatch: best.exactGradeMatch,
        ...meta,
      }
    }

    // Grade-band fallback: if no candidate cleared the confidence threshold
    // but there ARE authored assets for this concept+language+ACTIVE, serve
    // the best-scoring one anyway. All seeded content was human-curated for
    // this specific concept — a grade-band mismatch is a presentation
    // difference, not a correctness failure. Groq is never preferable over
    // authored content that exists for the right concept.
    if (rows.length > 0) {
      const fallback = pickBest(state, rows, options, 0)
      if (fallback) {
        const meta = classify(fallback.exactGradeMatch, true)
        console.log(
          `[explanationMemory] grade-band fallback: serving ${fallback.asset.assetId}` +
          ` (score=${fallback.confidence}, state.gradeBand=${state.gradeBand})` +
          ` servingMode=${meta.servingMode} fallbackReason=${meta.fallbackReason}`
        )
        return {
          assetId: fallback.asset.assetId,
          content: fallback.asset.explanationAsset!.content,
          familyKind: fallback.asset.familyKind,
          confidence: fallback.confidence,
          exactGradeMatch: fallback.exactGradeMatch,
          ...meta,
        }
      }
    }

    return null
  } catch (err) {
    console.warn('[explanationMemory] findBestExplanation failed, falling back to LLM:', err)
    return null
  }
}

export interface CaptureExplanationInput {
  conceptId: string
  subjectSlug: string
  language: string
  gradeBand: GradeBand
  content: string
  familyKind?: ExplanationKind
  authorId: string // userId, or 'SYSTEM_AI' for background capture with no attributable user
}

/**
 * Phase 2: capture. Fire-and-forget — never awaited on the response hot
 * path. Deduplicates and versions against the existing lineage (same
 * conceptId + familyKind + language) before writing:
 *   - exact or near-duplicate of the latest version → skipped, no new row
 *   - meaningfully different → new row, versioned (parentVersionId → latest)
 *   - nothing comparable exists yet → new lineage (version 1)
 * A new version is always an INSERT, never an UPDATE — an existing ACTIVE
 * asset is untouched until a reviewer explicitly promotes the new version
 * (see reviewExplanationAsset, which then deprecates the old one).
 */
export async function captureGeneratedExplanation(input: CaptureExplanationInput): Promise<CaptureOutcome> {
  try {
    const familyKind: ExplanationKind = input.familyKind ?? 'core_explanation'
    const canonicalSlug = `${input.conceptId}:${familyKind}:${input.language}`
    const contentHash = hashContent(input.content)

    const existingLineage = await prisma.assetIdentity.findMany({
      where: { canonicalSlug, family: AssetFamily.EXPLANATION },
      include: { explanationAsset: true },
    })
    const lineageRows: LineageAsset[] = existingLineage
      .filter((a) => a.explanationAsset)
      .map((a) => ({ assetId: a.assetId, contentHash: a.contentHash, content: a.explanationAsset!.content, version: a.version }))

    const decision = decideCaptureAction(input.content, contentHash, lineageRows)
    if (decision.action === 'skip-duplicate') {
      return { action: 'skipped-duplicate', matchedAssetId: decision.matchedAssetId }
    }

    const created = await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.EXPLANATION,
        familyKind,
        conceptId: input.conceptId,
        language: input.language,
        gradeBand: input.gradeBand,
        authorId: input.authorId,
        authorKind: AuthorKind.AI_AUTHORED,
        status: AssetStatus.DRAFT,
        version: decision.action === 'new-version' ? decision.nextVersion : 1,
        parentVersionId: decision.action === 'new-version' ? decision.parentVersionId : undefined,
        canonicalSlug,
        contentHash,
        tags: deriveTags(input.subjectSlug, familyKind),
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        explanationAsset: {
          create: {
            content: input.content,
            style: ExplanationStyle.CONCRETE,
            readingLevel: 0,
            lengthChars: input.content.length,
            targetedMisconceptions: [],
          },
        },
      },
    })

    return decision.action === 'new-version'
      ? { action: 'versioned', assetId: created.assetId, parentVersionId: decision.parentVersionId }
      : { action: 'inserted', assetId: created.assetId }
  } catch (err) {
    // Capture is best-effort background enrichment — never surface to the turn.
    console.warn('[explanationMemory] captureGeneratedExplanation failed:', err)
    return { action: 'error', message: err instanceof Error ? err.message : String(err) }
  }
}

function deriveTags(subjectSlug: string, familyKind: string): string[] {
  return [subjectSlug, familyKind]
}

// ─── Review workflow (admin-only; see /api/admin/knowledge-assets/route.ts) ───

export async function listExplanationsForReview(status: AssetStatus = AssetStatus.DRAFT) {
  return prisma.assetIdentity.findMany({
    where: { family: AssetFamily.EXPLANATION, status },
    include: { explanationAsset: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
}

/**
 * Approving a new version never overwrites the previously-approved one: the
 * old ACTIVE asset in the same lineage is moved to DEPRECATED (fully
 * preserved, just no longer served — findBestExplanation only reads
 * ACTIVE), and the new one becomes ACTIVE. At most one ACTIVE per
 * canonicalSlug at any time (ADR 14 §4.1).
 */
export async function reviewExplanationAsset(assetId: string, action: 'approve' | 'reject') {
  if (action === 'reject') {
    return prisma.assetIdentity.update({ where: { assetId }, data: { status: AssetStatus.RETIRED } })
  }

  const target = await prisma.assetIdentity.findUniqueOrThrow({ where: { assetId } })
  await prisma.assetIdentity.updateMany({
    where: { canonicalSlug: target.canonicalSlug, family: AssetFamily.EXPLANATION, status: AssetStatus.ACTIVE, assetId: { not: assetId } },
    data: { status: AssetStatus.DEPRECATED, deprecationReason: `Superseded by newer approved version ${assetId}` },
  })
  return prisma.assetIdentity.update({ where: { assetId }, data: { status: AssetStatus.ACTIVE } })
}
