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

export interface ExplanationMatch {
  assetId: string
  content: string
  familyKind: string
  confidence: number
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
    if (!best) return null

    return {
      assetId: best.asset.assetId,
      content: best.asset.explanationAsset!.content,
      familyKind: best.asset.familyKind,
      confidence: best.confidence,
    }
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

/** Phase 2: capture. Fire-and-forget — never awaited on the response hot path. */
export async function captureGeneratedExplanation(input: CaptureExplanationInput): Promise<void> {
  try {
    const familyKind: ExplanationKind = input.familyKind ?? 'core_explanation'
    const canonicalSlug = `${input.conceptId}:${familyKind}:${input.language}`

    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.EXPLANATION,
        familyKind,
        conceptId: input.conceptId,
        language: input.language,
        gradeBand: input.gradeBand,
        authorId: input.authorId,
        authorKind: AuthorKind.AI_AUTHORED,
        status: AssetStatus.DRAFT,
        canonicalSlug,
        contentHash: hashContent(input.content),
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
  } catch (err) {
    // Capture is best-effort background enrichment — never surface to the turn.
    console.warn('[explanationMemory] captureGeneratedExplanation failed:', err)
  }
}

function hashContent(content: string): string {
  // Lightweight non-cryptographic hash — good enough for dedup/debug, avoids
  // a Node crypto import in a file also used by edge-adjacent code paths.
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    hash = (hash * 31 + content.charCodeAt(i)) | 0
  }
  return `h${(hash >>> 0).toString(16)}`
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

export async function reviewExplanationAsset(assetId: string, action: 'approve' | 'reject') {
  return prisma.assetIdentity.update({
    where: { assetId },
    data: { status: action === 'approve' ? AssetStatus.ACTIVE : AssetStatus.RETIRED },
  })
}
