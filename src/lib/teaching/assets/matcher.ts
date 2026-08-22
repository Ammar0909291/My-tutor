/**
 * Pure confidence scoring — no Prisma, no I/O. Given a Student State and a
 * candidate Knowledge Asset, returns a 0–100 confidence that the asset is a
 * good fit. Kept deliberately symbolic (concept/language/gradeBand/tags),
 * matching ADR 14 §6's guidance that pgvector embedding similarity is a
 * Phase 3+ concern, not required for the hot retrieval path.
 */
import { GradeBand, AssetStatus, ProbeDifficulty } from '@prisma/client'
import type { StudentState } from './studentState'

const GRADE_BAND_ORDER: GradeBand[] = [
  GradeBand.EARLY, GradeBand.ELEMENTARY, GradeBand.MIDDLE, GradeBand.HIGH, GradeBand.UNDERGRADUATE, GradeBand.ADULT,
]

/** ADR 14 §4.4's four rungs, in ascending demand. */
const DIFFICULTY_LADDER: ProbeDifficulty[] = [
  ProbeDifficulty.FOUNDATIONAL, ProbeDifficulty.DEVELOPING,
  ProbeDifficulty.PROFICIENT, ProbeDifficulty.ADVANCED,
]

/**
 * Ladder-proximity bonus (ADR 14 §13 — Remediation Item 6).
 *
 * BONUS-ONLY by design, never a penalty or a hard filter. Two consequences
 * that matter for backward compatibility:
 *   - an asset with no difficulty (every EXPLANATION, and any probe authored
 *     before this field mattered) scores EXACTLY what it scored before;
 *   - a learner with no targetDifficulty likewise sees unchanged scoring.
 * So nothing can fall below DEFAULT_CONFIDENCE_THRESHOLD as a result of this
 * term — it can only re-rank candidates that were previously tied, which is
 * precisely the ladder case it exists to resolve.
 */
export function difficultyProximityBonus(
  target?: ProbeDifficulty | null,
  assetDifficulty?: ProbeDifficulty | null,
): number {
  if (!target || !assetDifficulty) return 0
  const t = DIFFICULTY_LADDER.indexOf(target)
  const a = DIFFICULTY_LADDER.indexOf(assetDifficulty)
  if (t < 0 || a < 0) return 0
  const rungs = Math.abs(t - a)
  return rungs === 0 ? 10 : rungs === 1 ? 6 : rungs === 2 ? 3 : 0
}

function gradeBandDistance(a: GradeBand, b: GradeBand): number {
  return Math.abs(GRADE_BAND_ORDER.indexOf(a) - GRADE_BAND_ORDER.indexOf(b))
}

// P0 (Explanation Memory routing fix — intelligent HIGH↔ADULT compatibility):
// GRADE_BAND_ORDER is an institutional-age ordinal, not a content-register
// scale — it places ADULT two steps from HIGH (past UNDERGRADUATE), which
// scores it identically to genuinely mismatched pairs like EARLY↔MIDDLE.
// That's pedagogically wrong for this system specifically: ADULT here means
// "a self-directed Library learner with no school grade on file" (see
// studentState.ts's gradeToGradeBand — grade==null defaults to ADULT), not
// "requires adult-specific phrasing." The vast majority of authored Library
// content (confirmed: 209/216 physics concepts) is written at HIGH band,
// because HIGH-school-level conceptual explanations are exactly what a
// general adult learner re-studying a subject needs — the same explanation
// a genuine grade-9-12 student gets. Treating that pairing as a hard
// confidence-killer denied real students access to correctly-authored
// content for no pedagogical reason.
// Scoped narrowly to this one pair (does not touch EARLY/ELEMENTARY/MIDDLE/
// UNDERGRADUATE relationships, and does not change how ADULT is classified
// anywhere else in the system — e.g. notation/register tuning elsewhere
// still treats ADULT as ADULT). An exact gradeBand match still always
// outranks this compatible-but-different-band case (25 > 15), preserving
// correct tie-breaking when both exist.
function isHighAdultCompatible(a: GradeBand, b: GradeBand): boolean {
  const pair = new Set([a, b])
  return pair.has(GradeBand.HIGH) && pair.has(GradeBand.ADULT) && pair.size === 2
}

const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'to', 'of', 'and', 'in', 'on', 'for', 'this', 'that', 'i', 'you', 'me', 'my'])

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
}

export interface MatchableAsset {
  assetId: string
  conceptId: string
  language: string
  gradeBand: GradeBand
  status: AssetStatus
  qualityScore: number
  qualityConfidence: number
  tags: string[]
  incompatibilities: string[]
  /**
   * ProbeAsset.difficulty, carried through so the ladder is visible to the
   * scorer (ADR 14 §13). Absent/null for EXPLANATION assets and for any probe
   * whose difficulty was not projected — both score as before.
   */
  difficulty?: ProbeDifficulty | null
}

export interface MatchOptions {
  activeMisconceptionIds?: string[]
  /**
   * P1 (memory retrieval facet relevance, 2026-08-22) — an optional, caller-
   * supplied set of facet tags the returned asset MUST carry at least one of.
   *
   * ── THE DEFECT THIS CLOSES ──────────────────────────────────────────────
   * `scoreMatch`'s hard disqualifiers were conceptId/status/language/active-
   * misconception-incompatibility only. `tags` — the field this codebase
   * already uses to represent WHAT FACET of a concept a piece of content
   * covers (fractions' "denominator" vs "numerator" vs "equivalence", say) —
   * fed only into a small BONUS (`tagOverlap`, capped at 15 of 100), scored
   * against the learner's raw message text. A concept + exact-gradeBand match
   * alone already reaches 75 (base 50 + gradeBand 25), comfortably clearing
   * `DEFAULT_CONFIDENCE_THRESHOLD` (65) with ZERO facet relevance at all — so
   * an asset belonging to the right CONCEPT but the wrong FACET of it could
   * win purely on concept membership, whenever the caller actually needed a
   * specific facet (e.g. the teaching engine is repairing a specific
   * misconception or continuing a specific sub-topic) rather than "anything
   * about this concept".
   *
   * ── THE FIX ────────────────────────────────────────────────────────────
   * Reuses `tags` — no new taxonomy. When a caller supplies `requiredTags`
   * (non-empty), an asset is now hard-disqualified (score 0, same as a
   * conceptId/language mismatch) unless it carries at least one of them.
   * Undefined or empty (the default, and every existing call site's current
   * behaviour) changes nothing: `tagOverlap` keeps working exactly as the
   * soft bonus it already was. This is intentionally the NARROWEST point to
   * enforce it — `scoreMatch` is the single place both conceptId and facet
   * tags are already read, so a caller that knows it needs a specific facet
   * can require one without any change to retrieval, ranking or storage
   * elsewhere.
   */
  requiredTags?: string[]
  /**
   * PROBE RETRIEVAL ONLY — ignored by scoreMatch and by explanation matching.
   *
   * Return true for a stem that must not be selected again. Exists because the
   * ladder needs THREE graded correct answers to close a concept (CHECK 1 +
   * PRACTICE 2) while 145 of physics's 238 concepts carry only TWO gradeable
   * authored probes — measured, not assumed. Without an exclusion the same
   * best-scoring probe is returned every time and the learner is re-asked a
   * question they have already answered, which teaches nothing and is the
   * repeat this codebase forbids everywhere else (`hasAskedMcq`,
   * `hasShownVisual`, `hasServedExplanation`).
   *
   * A predicate rather than an id list because the caller's record of "already
   * asked" is keyed on the question fingerprint (TeachingHistory.mcqAsked), not
   * on assetId — matching that record is the whole point.
   */
  excludeProbeStem?: (stem: string) => boolean
  /**
   * PROBE RETRIEVAL ONLY — ignored by scoreMatch and by explanation matching.
   *
   * "Only return a probe that can actually become the turn's MCQ."
   *
   * MEASURED DEFECT THIS EXISTS FOR (production, 2026-08-17): across 28
   * mastery-gate evaluations, 7 selected the SAME asset —
   * `phys.mech.displacement:short_answer:en:high:proficient`, a short_answer
   * probe with `choices: null`. `probeToMcq` correctly refused it all 7 times
   * and the gate fell back to the model. Selection had no idea the caller
   * needed an MCQ, so a probe the very next mandatory layer must reject could
   * win on score.
   *
   * Scoped, NOT global, and that distinction is load-bearing: `assembleLesson`
   * also calls `findBestProbe` and DELIBERATELY accepts a non-MCQ probe,
   * rendering it as a prose follow-up (`formatProbeAsFollowUp`). Making
   * retrieval MCQ-only everywhere would silently delete short-answer practice
   * from that path. Only the mastery gate, which cannot use anything else,
   * sets this.
   *
   * When set, a concept whose only authored probes are unconvertible returns
   * null — an honest "no gate-compatible probe", which the caller already
   * handles by falling back to the model.
   */
  requireMcq?: boolean
}

/**
 * Returns 0 for a hard disqualification (wrong concept, wrong language, not
 * ACTIVE, or gated by an active misconception the asset is incompatible
 * with) and a 0–100 confidence otherwise.
 *
 * Weighting deliberately lets a well-matched, freshly human-approved asset
 * (concept + language + exact gradeBand, zero accumulated evidence) clear
 * DEFAULT_CONFIDENCE_THRESHOLD on its own. qualityScore only ever ADDS
 * confidence on top — it must never be a requirement to reach a baseline
 * servable state, since every asset starts with qualityScore=0 (nothing has
 * measured it yet) and that field's single writer is the Evidence Engine
 * (ADR 13), not this scorer. Gating servability on evidence that cannot
 * exist yet would mean nothing newly approved is ever served.
 */
export function scoreMatch(state: StudentState, asset: MatchableAsset, options: MatchOptions = {}): number {
  if (asset.conceptId !== state.conceptId) return 0
  if (asset.status !== AssetStatus.ACTIVE) return 0
  if (asset.language !== state.language) return 0

  const activeMisconceptionIds = options.activeMisconceptionIds ?? []
  if (asset.incompatibilities.some((m) => activeMisconceptionIds.includes(m))) return 0

  // Facet relevance (see MatchOptions.requiredTags): a hard filter only when
  // the caller actually supplies a requirement — empty/undefined is a no-op,
  // reproducing the exact prior behaviour for every existing call site.
  if (options.requiredTags && options.requiredTags.length > 0) {
    const required = new Set(options.requiredTags.map((t) => t.toLowerCase()))
    const assetTags = new Set(asset.tags.map((t) => t.toLowerCase()))
    const hasRequiredFacet = [...required].some((t) => assetTags.has(t))
    if (!hasRequiredFacet) return 0
  }

  let score = 50 // base: concept + language + ACTIVE all matched, already reviewer-approved

  const distance = gradeBandDistance(state.gradeBand, asset.gradeBand)
  score += distance === 0 ? 25
    : isHighAdultCompatible(state.gradeBand, asset.gradeBand) ? 15 // see isHighAdultCompatible
    : distance === 1 ? 10
    : 0

  const messageWords = new Set(tokenize(state.userMessage))
  const tagOverlap = asset.tags.filter((t) => messageWords.has(t.toLowerCase())).length
  score += Math.min(15, tagOverlap * 5)

  // qualityScore (0–1) weighted by how much evidence backs it — pure bonus,
  // never required. A brand-new ACTIVE asset (qualityScore=0) still scores
  // 75 on an exact gradeBand match, comfortably above the default threshold.
  score += Math.min(10, asset.qualityScore * asset.qualityConfidence * 10)

  // Ladder proximity (ADR 14 §13). Bonus-only — see difficultyProximityBonus.
  score += difficultyProximityBonus(state.targetDifficulty, asset.difficulty)

  return Math.min(100, Math.round(score))
}

/** Default bar for "suitable" — a match below this is treated as no match. */
export const DEFAULT_CONFIDENCE_THRESHOLD = 65

// Observability-only (P0 Explanation Memory serving metadata): does the
// candidate's gradeBand exactly equal the requester's. Reads the same
// GradeBand values scoreMatch already reads — never changes what scoreMatch
// computes or what pickBest selects.
function isExactGradeMatch(state: StudentState, asset: MatchableAsset): boolean {
  return asset.gradeBand === state.gradeBand
}

export function pickBest<T extends MatchableAsset>(
  state: StudentState,
  candidates: T[],
  options: MatchOptions = {},
  threshold: number = DEFAULT_CONFIDENCE_THRESHOLD,
): { asset: T; confidence: number; exactGradeMatch: boolean } | null {
  let best: { asset: T; confidence: number; exactGradeMatch: boolean } | null = null
  for (const candidate of candidates) {
    const confidence = scoreMatch(state, candidate, options)
    // confidence === 0 always means scoreMatch hard-disqualified the
    // candidate (wrong concept/language/status, active-misconception
    // incompatibility, or — P1, 2026-08-22 — a missing required facet):
    // every candidate that clears those checks starts from a base score of
    // 50, so 0 can never be a legitimate low score. Without the `> 0` guard,
    // callers that pass threshold=0 (the grade-band "serve it anyway"
    // fallback both retrieval paths use) would treat "hard-disqualified" as
    // "clears a threshold of 0" and could return a disqualified asset —
    // e.g. a facet-mismatched or misconception-incompatible one — instead
    // of the honest no-match a threshold-0 fallback is supposed to fall
    // back FROM. threshold >= 1 (the normal path) was never affected: any
    // confidence that clears it was already > 0.
    if (confidence > 0 && confidence >= threshold && (!best || confidence > best.confidence)) {
      best = { asset: candidate, confidence, exactGradeMatch: isExactGradeMatch(state, candidate) }
    }
  }
  return best
}
