/**
 * Pure confidence scoring — no Prisma, no I/O. Given a Student State and a
 * candidate Knowledge Asset, returns a 0–100 confidence that the asset is a
 * good fit. Kept deliberately symbolic (concept/language/gradeBand/tags),
 * matching ADR 14 §6's guidance that pgvector embedding similarity is a
 * Phase 3+ concern, not required for the hot retrieval path.
 */
import { GradeBand, AssetStatus } from '@prisma/client'
import type { StudentState } from './studentState'

const GRADE_BAND_ORDER: GradeBand[] = [
  GradeBand.EARLY, GradeBand.ELEMENTARY, GradeBand.MIDDLE, GradeBand.HIGH, GradeBand.UNDERGRADUATE, GradeBand.ADULT,
]

function gradeBandDistance(a: GradeBand, b: GradeBand): number {
  return Math.abs(GRADE_BAND_ORDER.indexOf(a) - GRADE_BAND_ORDER.indexOf(b))
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
}

export interface MatchOptions {
  activeMisconceptionIds?: string[]
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

  let score = 50 // base: concept + language + ACTIVE all matched, already reviewer-approved

  const distance = gradeBandDistance(state.gradeBand, asset.gradeBand)
  score += distance === 0 ? 25 : distance === 1 ? 10 : 0

  const messageWords = new Set(tokenize(state.userMessage))
  const tagOverlap = asset.tags.filter((t) => messageWords.has(t.toLowerCase())).length
  score += Math.min(15, tagOverlap * 5)

  // qualityScore (0–1) weighted by how much evidence backs it — pure bonus,
  // never required. A brand-new ACTIVE asset (qualityScore=0) still scores
  // 75 on an exact gradeBand match, comfortably above the default threshold.
  score += Math.min(10, asset.qualityScore * asset.qualityConfidence * 10)

  return Math.min(100, Math.round(score))
}

/** Default bar for "suitable" — a match below this is treated as no match. */
export const DEFAULT_CONFIDENCE_THRESHOLD = 65

export function pickBest<T extends MatchableAsset>(
  state: StudentState,
  candidates: T[],
  options: MatchOptions = {},
  threshold: number = DEFAULT_CONFIDENCE_THRESHOLD,
): { asset: T; confidence: number } | null {
  let best: { asset: T; confidence: number } | null = null
  for (const candidate of candidates) {
    const confidence = scoreMatch(state, candidate, options)
    if (confidence >= threshold && (!best || confidence > best.confidence)) {
      best = { asset: candidate, confidence }
    }
  }
  return best
}
