/**
 * Confidence Calibration Engine (Sprint CU).
 *
 * Measures the gap between what a student THINKS they know and what they
 * ACTUALLY demonstrate. Detects overconfident and underconfident learners
 * so the tutor can correct or encourage accordingly.
 *
 * Classification:
 *   WELL_CALIBRATED  — self-assessed confidence matches performance
 *   OVERCONFIDENT    — high-confidence language + weak performance
 *   UNDERCONFIDENT   — low-confidence language + strong performance
 *   UNCERTAIN        — insufficient evidence (caller should hide card)
 *
 * Signals:
 *   Confidence   — keyword analysis of LearningCheckpoint.userResponse texts
 *                  plus optional recent student conversation messages
 *   Performance  — LearningCheckpoint pass rate + PracticeSession scores
 *
 * All DB calls are non-fatal. Returns null when evidence is insufficient.
 */

import { prisma } from '@/lib/db/prisma'

// ── Public types ──────────────────────────────────────────────────────────────

export type ConfidenceLevel = 'HIGH' | 'LOW' | 'NEUTRAL'
export type CalibrationLevel = 'WELL_CALIBRATED' | 'OVERCONFIDENT' | 'UNDERCONFIDENT' | 'UNCERTAIN'

export interface ConfidenceProfile {
  calibration: CalibrationLevel
  confidenceLevel: ConfidenceLevel
  /** Brief tutor-facing explanation. */
  explanation: string
  /** Compact one-liner for chapter page card. */
  insight: string
  /** Sub-text for card body. */
  insightDetail: string
}

// ── Language analysis ─────────────────────────────────────────────────────────
//
// Phrases are matched as whole-word or phrase substrings (case-insensitive).
// Patterns are deliberately conservative to reduce false positives from
// incidental use of common words.

const HIGH_CONFIDENCE_PHRASES = [
  'easy', 'i know this', 'got it', 'obvious', "it's simple", 'i understand',
  'makes sense', 'of course', 'no problem', 'definitely', 'i can do this',
  "i've got this", 'i already know', 'simple', 'clear to me', 'sure',
]

const LOW_CONFIDENCE_PHRASES = [
  'confused', "i'm confused", 'not sure', "don't understand", 'do not understand',
  "i'm not sure", 'not certain', 'difficult', "don't get it", 'i am lost',
  "i'm lost", 'struggling', 'unsure', 'maybe', 'i think so', "i'm not confident",
  "don't know", 'hard to understand', 'tricky', 'not clear', 'a bit confused',
]

function scoreText(text: string, phrases: string[]): number {
  const lower = text.toLowerCase()
  let count = 0
  for (const phrase of phrases) {
    // simple substring match — phrase list is conservative enough that false
    // positives are rare; word-boundary checking added for short tokens
    if (phrase.length <= 5) {
      const rx = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      if (rx.test(lower)) count++
    } else {
      if (lower.includes(phrase)) count++
    }
  }
  return count
}

function detectLanguageConfidence(texts: string[]): ConfidenceLevel {
  if (texts.length === 0) return 'NEUTRAL'
  let totalHigh = 0
  let totalLow = 0
  for (const t of texts) {
    totalHigh += scoreText(t, HIGH_CONFIDENCE_PHRASES)
    totalLow  += scoreText(t, LOW_CONFIDENCE_PHRASES)
  }
  const total = totalHigh + totalLow
  if (total < 2) return 'NEUTRAL'
  if (totalHigh >= totalLow * 1.5) return 'HIGH'
  if (totalLow >= totalHigh * 1.5) return 'LOW'
  return 'NEUTRAL'
}

// ── Performance classification ────────────────────────────────────────────────

type PerformanceLevel = 'STRONG' | 'WEAK' | 'MIXED'

function classifyPerformance(checkpointPassRate: number | null, practiceScore: number | null): PerformanceLevel {
  const scores = [checkpointPassRate, practiceScore].filter((s): s is number => s !== null)
  if (scores.length === 0) return 'MIXED'
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  if (avg >= 65) return 'STRONG'
  if (avg < 45) return 'WEAK'
  return 'MIXED'
}

// ── Calibration matrix ────────────────────────────────────────────────────────

export function detectConfidenceCalibration(
  confidenceLevel: ConfidenceLevel,
  performance: PerformanceLevel,
): CalibrationLevel {
  if (confidenceLevel === 'NEUTRAL') return 'WELL_CALIBRATED'
  if (confidenceLevel === 'HIGH' && performance === 'WEAK')   return 'OVERCONFIDENT'
  if (confidenceLevel === 'LOW'  && performance === 'STRONG') return 'UNDERCONFIDENT'
  // HIGH+STRONG, LOW+WEAK, any+MIXED → calibrated (matches or insufficient gap)
  return 'WELL_CALIBRATED'
}

// ── Insight strings ───────────────────────────────────────────────────────────

const CALIBRATION_INSIGHTS: Record<CalibrationLevel, { insight: string; detail: string }> = {
  WELL_CALIBRATED: {
    insight: '🎯 Confidence Well Calibrated',
    detail:  'Your self-assessment matches your performance.',
  },
  OVERCONFIDENT: {
    insight: '⚠ Overconfidence Detected',
    detail:  'You may be moving ahead faster than your understanding.',
  },
  UNDERCONFIDENT: {
    insight: '💡 Building Confidence',
    detail:  'You are performing better than you think.',
  },
  UNCERTAIN: {
    insight: '',
    detail:  '',
  },
}

function buildExplanation(
  calibration: CalibrationLevel,
  confidenceLevel: ConfidenceLevel,
  performance: PerformanceLevel,
): string {
  switch (calibration) {
    case 'WELL_CALIBRATED':
      return confidenceLevel === 'HIGH'
        ? 'Student expresses high confidence and performance supports it — well-calibrated.'
        : confidenceLevel === 'LOW'
        ? 'Student expresses uncertainty and performance reflects it — self-awareness is accurate.'
        : `Student's confidence and performance are broadly aligned (performance: ${performance.toLowerCase()}).`
    case 'OVERCONFIDENT':
      return 'Student uses high-confidence language but checkpoint and practice performance suggests significant gaps. Treat expressed confidence with caution — probe before assuming readiness.'
    case 'UNDERCONFIDENT':
      return 'Student expresses uncertainty or self-doubt, but demonstrated performance is strong. The gap is psychological, not academic. Reinforce achievement and progress explicitly.'
    case 'UNCERTAIN':
      return 'Insufficient evidence to classify confidence calibration.'
  }
}

// ── Lookback constants ────────────────────────────────────────────────────────

const CHECKPOINT_LOOKBACK_DAYS = 14
const PRACTICE_LOOKBACK_DAYS   = 30
const MIN_TEXTS_FOR_LANGUAGE   = 3

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Returns a confidence calibration profile for a chapter, or null when
 * there is insufficient language data to make a determination.
 *
 * @param recentStudentMessages Optional student message texts from the active
 *   conversation session. Supplements checkpoint response analysis.
 */
export async function getConfidenceProfile(
  userId: string,
  subjectSlug: string,
  chapterId: string,
  recentStudentMessages?: string[],
): Promise<ConfidenceProfile | null> {
  const since14 = new Date(Date.now() - CHECKPOINT_LOOKBACK_DAYS * 86400000)
  const since30 = new Date(Date.now() - PRACTICE_LOOKBACK_DAYS    * 86400000)

  const [checkpointRows, practiceRows] = await Promise.all([
    prisma.learningCheckpoint.findMany({
      where: { userId, subjectSlug, chapterId, createdAt: { gte: since14 } },
      select: { userResponse: true, passed: true },
    }).catch(() => [] as { userResponse: string; passed: boolean }[]),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug, chapterId, completedAt: { not: null }, createdAt: { gte: since30 } },
      orderBy: { completedAt: 'desc' },
      take: 5,
      select: { score: true },
    }).catch(() => [] as { score: number | null }[]),
  ])

  // ── Language confidence ────────────────────────────────────────────────────

  const languageTexts = [
    ...checkpointRows.map((r) => r.userResponse),
    ...(recentStudentMessages ?? []),
  ].filter((t) => typeof t === 'string' && t.trim().length > 0)

  if (languageTexts.length < MIN_TEXTS_FOR_LANGUAGE) return null

  const confidenceLevel = detectLanguageConfidence(languageTexts)

  // ── Performance ────────────────────────────────────────────────────────────

  const checkpointPassRate = checkpointRows.length >= 3
    ? Math.round((checkpointRows.filter((r) => r.passed).length / checkpointRows.length) * 100)
    : null

  const practiceScores = practiceRows.map((r) => r.score).filter((s): s is number => s !== null)
  const practiceScore = practiceScores.length > 0
    ? Math.round(practiceScores.reduce((a, b) => a + b, 0) / practiceScores.length)
    : null

  const performance = classifyPerformance(checkpointPassRate, practiceScore)

  // ── Calibration ────────────────────────────────────────────────────────────

  const calibration = detectConfidenceCalibration(confidenceLevel, performance)

  const { insight, detail } = CALIBRATION_INSIGHTS[calibration]

  return {
    calibration,
    confidenceLevel,
    explanation: buildExplanation(calibration, confidenceLevel, performance),
    insight,
    insightDetail: detail,
  }
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the CONFIDENCE CALIBRATION system prompt block for the tutor.
 * Returns empty string when profile is null (no evidence).
 */
export function buildConfidenceCalibrationBlock(profile: ConfidenceProfile | null): string {
  if (!profile || profile.calibration === 'UNCERTAIN') return ''

  const lines: string[] = ['\n\nCONFIDENCE CALIBRATION']
  lines.push(`Status: ${profile.calibration} (language confidence: ${profile.confidenceLevel})`)
  lines.push(`Context: ${profile.explanation}`)

  switch (profile.calibration) {
    case 'OVERCONFIDENT':
      lines.push('Tutor strategy: Student appears confident but evidence suggests gaps. Verify reasoning before accepting answers. Use challenge questions ("Can you explain why?", "What would happen if...?"). Avoid validating surface-level answers without checking underlying understanding.')
      break
    case 'UNDERCONFIDENT':
      lines.push('Tutor strategy: Student performs well but lacks self-belief. Explicitly acknowledge correct answers ("That\'s exactly right"). Remind the student of prior progress. Reframe difficulty as normal — not a sign of inability. Build momentum with achievable success before introducing harder material.')
      break
    default:
      lines.push('Tutor strategy: Student\'s confidence and performance are aligned. Maintain current approach. Minor acknowledgement of progress is still helpful.')
      break
  }

  lines.push('Do not reference this calibration assessment directly to the student.')
  return lines.join('\n')
}
