/**
 * Teaching Action Repository — generalizes Explanation Memory to the PROBE
 * family (practice/quiz/assessment/challenge questions) and assembles a full
 * turn from whichever families have suitable ACTIVE content, so the
 * Educational Brain can teach a concept end-to-end from stored assets alone
 * when the catalogue is rich enough — and fall back to the LLM the moment
 * it isn't.
 *
 * Deliberately does not touch the VISUAL family: diagrams/animations already
 * have a live, separate caching pipeline (src/lib/teaching/visuals/
 * visualizationCache.ts, ADR 12) with its own known follow-up work (W4-2).
 * Extending that system is out of this task's scope.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus, AuthorKind, ProbeDifficulty, GradeBand } from '@prisma/client'
import type { ProbeKind, ProbeChoice } from './assetIdentity'
import type { StudentState } from './studentState'
import { pickBest, type MatchableAsset, type MatchOptions } from './matcher'
import { findBestExplanation, captureGeneratedExplanation, type ExplanationMatch } from './explanationMemory'

export interface ProbeMatch {
  assetId: string
  stem: string
  choices: ProbeChoice[] | null
  correctValue: string | null
  confidence: number
}

interface ProbeCandidateRow extends MatchableAsset {
  probeAsset: { stem: string; choices: unknown; correctValue: string | null } | null
}

export async function findBestProbe(state: StudentState, options: MatchOptions = {}): Promise<ProbeMatch | null> {
  try {
    const candidates = await prisma.assetIdentity.findMany({
      where: { family: AssetFamily.PROBE, conceptId: state.conceptId, language: state.language, status: AssetStatus.ACTIVE },
      include: { probeAsset: true },
      take: 50,
    })

    const rows: ProbeCandidateRow[] = candidates
      .filter((c) => c.probeAsset)
      .map((c) => ({
        assetId: c.assetId, conceptId: c.conceptId, language: c.language, gradeBand: c.gradeBand,
        status: c.status, qualityScore: c.qualityScore, qualityConfidence: c.qualityConfidence,
        tags: c.tags, incompatibilities: c.incompatibilities, probeAsset: c.probeAsset,
      }))

    const best = pickBest(state, rows, options)
    if (!best) return null

    return {
      assetId: best.asset.assetId,
      stem: best.asset.probeAsset!.stem,
      choices: (best.asset.probeAsset!.choices as ProbeChoice[] | null) ?? null,
      correctValue: best.asset.probeAsset!.correctValue,
      confidence: best.confidence,
    }
  } catch (err) {
    console.warn('[teachingActionRepository] findBestProbe failed, falling back to LLM:', err)
    return null
  }
}

export interface CaptureProbeInput {
  conceptId: string
  subjectSlug: string
  language: string
  gradeBand: GradeBand
  stem: string
  choices?: ProbeChoice[]
  correctValue?: string
  probeKind?: ProbeKind
  difficulty?: ProbeDifficulty
  authorId: string
}

export async function captureGeneratedProbe(input: CaptureProbeInput): Promise<void> {
  try {
    const probeKind: ProbeKind = input.probeKind ?? 'mcq'
    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.PROBE,
        familyKind: probeKind,
        conceptId: input.conceptId,
        language: input.language,
        gradeBand: input.gradeBand,
        authorId: input.authorId,
        authorKind: AuthorKind.AI_AUTHORED,
        status: AssetStatus.DRAFT,
        canonicalSlug: `${input.conceptId}:${probeKind}:${input.language}`,
        contentHash: `p${input.stem.length}`,
        tags: [input.subjectSlug, probeKind],
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        probeAsset: {
          create: {
            stem: input.stem,
            choices: input.choices ? (input.choices as unknown as object) : undefined,
            correctValue: input.correctValue,
            keywords: [],
            difficulty: input.difficulty ?? ProbeDifficulty.PROFICIENT,
            targetedMisconceptions: [],
            requiredVisuals: [],
          },
        },
      },
    })
  } catch (err) {
    console.warn('[teachingActionRepository] captureGeneratedProbe failed:', err)
  }
}

export async function listProbesForReview(status: AssetStatus = AssetStatus.DRAFT) {
  return prisma.assetIdentity.findMany({
    where: { family: AssetFamily.PROBE, status },
    include: { probeAsset: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
}

export async function reviewProbeAsset(assetId: string, action: 'approve' | 'reject') {
  return prisma.assetIdentity.update({
    where: { assetId },
    data: { status: action === 'approve' ? AssetStatus.ACTIVE : AssetStatus.RETIRED },
  })
}

// ─── Lesson assembly ──────────────────────────────────────────────────────────

export interface AssembledLesson {
  text: string
  usedAssetIds: string[]
  explanationConfidence: number
}

/**
 * Student State → best explanation (required) → best practice question
 * (optional) → one combined turn. Returns null the moment the required
 * explanation slot can't be filled with sufficient confidence — the caller
 * falls back to the existing LLM pipeline unchanged in that case. No probe
 * is invented to fill a gap: if only the explanation exists, that alone is
 * still a complete, useful turn.
 */
export async function assembleLesson(state: StudentState, options: MatchOptions = {}): Promise<AssembledLesson | null> {
  const explanation = await findBestExplanation(state, options)
  if (!explanation) return null

  const usedAssetIds = [explanation.assetId]
  let text = explanation.content

  const probe = await findBestProbe(state, options)
  if (probe) {
    usedAssetIds.push(probe.assetId)
    text += formatProbeAsFollowUp(probe)
  }

  return { text, usedAssetIds, explanationConfidence: explanation.confidence }
}

function formatProbeAsFollowUp(probe: ProbeMatch): string {
  if (!probe.choices || probe.choices.length === 0) return `\n\n**Quick check:** ${probe.stem}`
  const options = probe.choices
    .map((c, i) => `${String.fromCharCode(65 + i)}. ${c.text}`)
    .join('\n')
  return `\n\n**Quick check:** ${probe.stem}\n\n${options}`
}

export { findBestExplanation, captureGeneratedExplanation, type ExplanationMatch }
