/**
 * Teaching History — per-concept strategy/explanation/misconception ledger.
 *
 * Tracks which teaching strategies, analogies, demonstrations, and
 * misconceptions have been encountered for the CURRENT concept within a
 * lesson session. Persisted in contextSnapshot.teachingHistory (JSONB on
 * LearnSession). Resets when the active concept changes — same lifecycle
 * as ConversationState.
 *
 * Pure module: no DB, no I/O.
 */

export const STRATEGY_CONCISE = 0
export const STRATEGY_SIMPLER_WORDING = 1
export const STRATEGY_ANALOGY = 2
export const STRATEGY_VISUAL = 3
export const STRATEGY_PHYSICAL = 4
export const STRATEGY_GUIDED_DISCOVERY = 5
export const STRATEGY_PREREQ_REMEDIATION = 6

const STRATEGY_COUNT = 7
const EXPLANATION_LIMIT = 2

export interface TeachingHistory {
  conceptId: string | null
  strategiesUsed: number[]
  analogiesUsed: string[]
  demonstrationsShown: string[]
  misconceptionsSeen: string[]
  prerequisiteAttempts: string[]
  explanationCount: number
  confidence: 'high' | 'medium' | 'low' | 'unknown'
  frustration: number
  mastery: 'none' | 'emerging' | 'developing' | 'verified'
}

export function initialTeachingHistory(conceptId: string | null): TeachingHistory {
  return {
    conceptId,
    strategiesUsed: [],
    analogiesUsed: [],
    demonstrationsShown: [],
    misconceptionsSeen: [],
    prerequisiteAttempts: [],
    explanationCount: 0,
    confidence: 'unknown',
    frustration: 0,
    mastery: 'none',
  }
}

export function readTeachingHistory(
  raw: unknown,
  currentConceptId: string | null,
): TeachingHistory {
  if (raw && typeof raw === 'object' && Array.isArray((raw as TeachingHistory).strategiesUsed)) {
    const s = raw as TeachingHistory
    if (s.conceptId === currentConceptId) {
      return {
        ...initialTeachingHistory(currentConceptId),
        ...s,
      }
    }
  }
  return initialTeachingHistory(currentConceptId)
}

/** Pick the lowest-indexed strategy not yet attempted. Returns -1 when all
 * seven have been used — the caller should treat this as "prerequisite
 * remediation is the only move left." */
export function selectNextStrategy(history: TeachingHistory): number {
  const used = new Set(history.strategiesUsed)
  for (let i = 0; i < STRATEGY_COUNT; i++) {
    if (!used.has(i)) return i
  }
  return -1
}

export function updateTeachingHistory(
  prev: TeachingHistory,
  update: Partial<Pick<TeachingHistory,
    | 'strategiesUsed'
    | 'analogiesUsed'
    | 'demonstrationsShown'
    | 'misconceptionsSeen'
    | 'prerequisiteAttempts'
    | 'explanationCount'
    | 'confidence'
    | 'frustration'
    | 'mastery'
  >>,
): TeachingHistory {
  return { ...prev, ...update }
}

export function hasExceededExplanationLimit(history: TeachingHistory): boolean {
  return history.explanationCount >= EXPLANATION_LIMIT
}

/** Maps failure/remediation counts to a 0-5 frustration scale.
 * Each consecutive failure adds 1; each remediation adds 0.5 (remediation
 * signals confusion but also effort, so it weighs less than outright failure). */
export function computeFrustration(consecutiveFailures: number, remediationCount: number): number {
  const raw = consecutiveFailures + remediationCount * 0.5
  return Math.min(5, Math.round(raw))
}

export function computeMastery(
  correctAtCheck: number,
  correctAtPractice: number,
): TeachingHistory['mastery'] {
  if (correctAtPractice >= 2) return 'verified'
  if (correctAtCheck >= 1) return 'developing'
  if (correctAtCheck > 0 || correctAtPractice > 0) return 'emerging'
  return 'none'
}
