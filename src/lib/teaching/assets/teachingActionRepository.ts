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
import { findAuthorScaffolding } from './learnerAdmission'
import { pickBest, type MatchableAsset, type MatchOptions } from './matcher'
import { findBestExplanation, captureGeneratedExplanation, type ExplanationMatch, type ExplanationServingMode, type ExplanationFallbackReason } from './explanationMemory'
import { decideCaptureAction, type LineageAsset, type CaptureOutcome } from './versioning'
import { hashContent } from './similarity'
import { probeToMcq } from '../gateAssessment'
import type { TutorMCQ } from '../mcq'

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
      // Deterministic candidate order (ADR 14 §13 — Remediation Item 6). A
      // ladder puts several probes on one concept whose scores can still tie
      // after the proximity bonus; pickBest keeps the FIRST best-scoring
      // candidate, so without a stable order the winner would depend on
      // whatever order Postgres happened to return. assetId is unique, so this
      // makes selection reproducible for identical inputs.
      orderBy: { assetId: 'asc' },
      take: 50,
    })

    const rows: ProbeCandidateRow[] = candidates
      .filter((c) => c.probeAsset)
      .map((c) => ({
        assetId: c.assetId, conceptId: c.conceptId, language: c.language, gradeBand: c.gradeBand,
        status: c.status, qualityScore: c.qualityScore, qualityConfidence: c.qualityConfidence,
        tags: c.tags, incompatibilities: c.incompatibilities,
        // Carried so scoreMatch can see the ladder rung — previously dropped
        // here, which is why difficulty could never influence selection.
        difficulty: c.probeAsset!.difficulty,
        probeAsset: c.probeAsset,
      }))
      // THE LEARNER ADMISSION BOUNDARY, same rule as Explanation Memory.
      // A probe is spoken to the learner too, and its stem and choices come
      // from the same authored corpus — bracketed authoring labels such as
      // "[correct]" belong to a reviewer, never to a student. Relevance is NOT
      // asked of a probe: a probe deliberately follows the explanation rather
      // than the learner's wording, and refusing it on vocabulary would strip
      // legitimate checks. Register alone decides.
      .filter((row) => {
        const probe = row.probeAsset!
        const text = [probe.stem, ...(Array.isArray(probe.choices) ? probe.choices.map((c) => JSON.stringify(c)) : [])].join(' ')
        const scaffolding = findAuthorScaffolding(text)
        if (!scaffolding) return true
        console.warn(`[teachingActionRepository] refused probe ${row.assetId} for learner: ${scaffolding}`)
        return false
      })
      // ALREADY-ASKED EXCLUSION (MatchOptions.excludeProbeStem). Applied here,
      // before scoring, so an exhausted corpus returns null and the caller
      // falls back rather than re-asking — never after, which would silently
      // serve the same question with a lower confidence number attached.
      .filter((row) => !options.excludeProbeStem?.(row.probeAsset!.stem))
      // GATE-COMPATIBILITY FILTER (MatchOptions.requireMcq).
      //
      // The selection layer must not return an asset that the next MANDATORY
      // conversion layer will inevitably reject. Applied BEFORE pickBest, so
      // the winner is the best CONVERTIBLE probe rather than the best probe
      // that then fails to convert — filtering after ranking would still lose
      // the turn whenever an unconvertible probe outscored a usable one, which
      // is exactly what production did 7 times out of 9.
      //
      // The predicate is `probeToMcq` itself, not a familyKind check. A
      // familyKind allowlist would be a second, drifting definition of
      // "gradeable"; asking the real converter means selection and conversion
      // can never disagree — including on the cases probeToMcq refuses for
      // reasons other than kind (no choices, zero or multiple correct answers,
      // duplicate option text, more than four options).
      .filter((row) => {
        if (!options.requireMcq) return true
        const probe = row.probeAsset!
        return probeToMcq({
          stem: probe.stem,
          choices: (probe.choices as Array<{ text: string; isCorrect: boolean }> | null) ?? null,
        }) !== null
      })

    const best = pickBest(state, rows, options)
    if (best) {
      return {
        assetId: best.asset.assetId,
        stem: best.asset.probeAsset!.stem,
        choices: (best.asset.probeAsset!.choices as ProbeChoice[] | null) ?? null,
        correctValue: best.asset.probeAsset!.correctValue,
        confidence: best.confidence,
      }
    }

    // Grade-band fallback: authored probe for the right concept is always
    // better than Groq generating one — serve the best available grade band.
    if (rows.length > 0) {
      const fallback = pickBest(state, rows, options, 0)
      if (fallback) {
        return {
          assetId: fallback.asset.assetId,
          stem: fallback.asset.probeAsset!.stem,
          choices: (fallback.asset.probeAsset!.choices as ProbeChoice[] | null) ?? null,
          correctValue: fallback.asset.probeAsset!.correctValue,
          confidence: fallback.confidence,
        }
      }
    }

    return null
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

/** Same dedup/versioning contract as captureGeneratedExplanation — see that
 * function's docstring. Compares against the probe's `stem` text. */
export async function captureGeneratedProbe(input: CaptureProbeInput): Promise<CaptureOutcome> {
  try {
    const probeKind: ProbeKind = input.probeKind ?? 'mcq'
    const canonicalSlug = `${input.conceptId}:${probeKind}:${input.language}`
    const contentHash = hashContent(input.stem)

    const existingLineage = await prisma.assetIdentity.findMany({
      where: { canonicalSlug, family: AssetFamily.PROBE },
      include: { probeAsset: true },
    })
    const lineageRows: LineageAsset[] = existingLineage
      .filter((a) => a.probeAsset)
      .map((a) => ({ assetId: a.assetId, contentHash: a.contentHash, content: a.probeAsset!.stem, version: a.version }))

    const decision = decideCaptureAction(input.stem, contentHash, lineageRows)
    if (decision.action === 'skip-duplicate') {
      return { action: 'skipped-duplicate', matchedAssetId: decision.matchedAssetId }
    }

    const created = await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.PROBE,
        familyKind: probeKind,
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

    return decision.action === 'new-version'
      ? { action: 'versioned', assetId: created.assetId, parentVersionId: decision.parentVersionId }
      : { action: 'inserted', assetId: created.assetId }
  } catch (err) {
    console.warn('[teachingActionRepository] captureGeneratedProbe failed:', err)
    return { action: 'error', message: err instanceof Error ? err.message : String(err) }
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

/** Same "deprecate, never overwrite" contract as reviewExplanationAsset. */
export async function reviewProbeAsset(assetId: string, action: 'approve' | 'reject') {
  if (action === 'reject') {
    return prisma.assetIdentity.update({ where: { assetId }, data: { status: AssetStatus.RETIRED } })
  }

  const target = await prisma.assetIdentity.findUniqueOrThrow({ where: { assetId } })
  await prisma.assetIdentity.updateMany({
    where: { canonicalSlug: target.canonicalSlug, family: AssetFamily.PROBE, status: AssetStatus.ACTIVE, assetId: { not: assetId } },
    data: { status: AssetStatus.DEPRECATED, deprecationReason: `Superseded by newer approved version ${assetId}` },
  })
  return prisma.assetIdentity.update({ where: { assetId }, data: { status: AssetStatus.ACTIVE } })
}

// ─── Lesson assembly ──────────────────────────────────────────────────────────

export interface AssembledLesson {
  text: string
  usedAssetIds: string[]
  explanationConfidence: number
  // P0 (Explanation Memory serving metadata — observability only): passed
  // through verbatim from the explanation match; assembleLesson's own
  // selection logic (explanation required, probe optional) is unchanged.
  explanationAssetId: string
  explanationServingMode: ExplanationServingMode
  explanationExactGradeMatch: boolean
  explanationFallbackUsed: boolean
  explanationFallbackReason: ExplanationFallbackReason
  /**
   * The authored probe rendered as a GRADEABLE question, when it converts.
   *
   * Before this field, an assembled turn's probe was appended to `text` as
   * prose ("**Quick check:** …\n\nA. …\nB. …") and nothing else. That prose is
   * invisible to `gradeMcqAnswer` for exactly the same reason an LLM's prose
   * question is: no declared answer key. So the one serving path that already
   * HELD a reviewed, distractor-mapped assessment could not produce a single
   * unit of evidence from it — the memory path's own instance of the E6 defect.
   *
   * Null when the authored probe is not a multiple-choice item at all
   * (`short_answer`, `checkpoint` — 541 of the 1,652 authored probes), in which
   * case the prose rendering is kept exactly as before.
   */
  probeMcq: TutorMCQ | null
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
  let probeMcq: TutorMCQ | null = null
  if (probe) {
    usedAssetIds.push(probe.assetId)
    // A multiple-choice probe becomes the turn's REAL question — tappable and
    // gradeable — so it must not also be typed into the prose, or the learner
    // reads the same question twice and answers the ungraded copy.
    probeMcq = probeToMcq(probe)
    if (!probeMcq) text += formatProbeAsFollowUp(probe)
  }

  return {
    text, usedAssetIds, probeMcq, explanationConfidence: explanation.confidence,
    explanationAssetId: explanation.assetId,
    explanationServingMode: explanation.servingMode,
    explanationExactGradeMatch: explanation.exactGradeMatch,
    explanationFallbackUsed: explanation.fallbackUsed,
    explanationFallbackReason: explanation.fallbackReason,
  }
}

function formatProbeAsFollowUp(probe: ProbeMatch): string {
  if (!probe.choices || probe.choices.length === 0) return `\n\n**Quick check:** ${probe.stem}`
  const options = probe.choices
    .map((c, i) => `${String.fromCharCode(65 + i)}. ${c.text}`)
    .join('\n')
  return `\n\n**Quick check:** ${probe.stem}\n\n${options}`
}

export { findBestExplanation, captureGeneratedExplanation, type ExplanationMatch }
