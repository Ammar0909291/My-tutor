/**
 * Assessment Intelligence Engine (Phase 2H).
 *
 * Decides, deterministically, whether a learner should be assessed on a
 * chapter right now, and if so what kind of assessment is appropriate —
 * without duplicating any logic already owned by the Teaching Engine,
 * Student Memory Engine, Mastery Intelligence, or Recommendation Intelligence
 * (nextBestAction.ts). All signals are read from those existing engines;
 * no new tables, no new queries beyond what they already expose.
 *
 * Classification (assessment_type):
 *   guided        — confidence is low; smaller, easier check to build belief
 *   standard       — ordinary chapter assessment
 *   challenge      — performance has been excellent; raise the bar
 *   reassessment   — previously passed, but retention has since decayed
 *
 * When assessment_required is false, recommended_after says what should
 * happen first ('practice' | 'remediation'), or null when no assessment is
 * needed at all right now (mastery already proven and stable).
 */

import type { Chapter } from '@/lib/education'
import type { TrackLevel } from '@/lib/teaching-engine/types'
import { getChapterProgressDetails } from '@/lib/school/schoolProgress'
import { readLearnerMemory } from '@/lib/memory'
import { getMasteryProfile, type MasteryLevel } from './masteryIntelligence'
import { ASSESSMENT_PASS_THRESHOLD, ASSESSMENT_TOTAL } from '@/lib/school/assessment/assessmentTypes'

// ── Public types ──────────────────────────────────────────────────────────────

export type AssessmentType = 'guided' | 'standard' | 'challenge' | 'reassessment'

export interface AssessmentSignals {
  practiceStatus: 'not_started' | 'in_progress' | 'mastered'
  assessmentPassed: boolean
  assessmentAttempts: number
  masteryLevel: MasteryLevel | null
  confidenceLevel: number        // 0-100, from LearningProfile (Student Memory)
  trackLevel: TrackLevel
  weakConceptIds: string[]       // chapter-scoped weak concepts (Student Memory)
  reviewDueConceptIds: string[]  // chapter-scoped concepts due for spaced review
  successRate: number           // 0-100 (Student Memory)
}

export interface AssessmentDecision {
  assessment_required: boolean
  assessment_type: AssessmentType | null
  difficulty: TrackLevel
  question_count: number
  target_concepts: string[]
  mastery_threshold: number
  reason: string
  recommended_after: 'practice' | 'remediation' | null
  confidence: 'low' | 'medium' | 'high'
}

// ── Constants ─────────────────────────────────────────────────────────────────

// A focused assessment (guided / reassessment) covers fewer questions to
// reduce cognitive load while still producing a usable signal.
const FOCUSED_QUESTION_COUNT = Math.round(ASSESSMENT_TOTAL * 0.6)
const CHALLENGE_MASTERY_THRESHOLD = Math.min(90, ASSESSMENT_PASS_THRESHOLD + 15)

const TRACK_ORDER: TrackLevel[] = ['T0', 'T1', 'T2', 'T3', 'T4']

function stepTrack(level: TrackLevel, delta: number): TrackLevel {
  const idx = TRACK_ORDER.indexOf(level)
  return TRACK_ORDER[Math.max(0, Math.min(TRACK_ORDER.length - 1, idx + delta))]
}

// ── Pure decision function ───────────────────────────────────────────────────

/**
 * Deterministic, no AI. First-match-wins over a fixed priority order, mirroring
 * the established pattern in teachingStrategy.ts's determineStrategy().
 */
export function determineAssessmentDecision(
  signals: AssessmentSignals,
  kgNodeIds: string[],
): AssessmentDecision {
  const dataConfidence: AssessmentDecision['confidence'] =
    signals.masteryLevel !== null || signals.assessmentAttempts > 0 ? 'high'
    : signals.practiceStatus !== 'not_started' ? 'medium'
    : 'low'

  // 1. Nothing to assess yet — practice hasn't started.
  if (signals.practiceStatus === 'not_started') {
    return {
      assessment_required: false,
      assessment_type: null,
      difficulty: signals.trackLevel,
      question_count: 0,
      target_concepts: kgNodeIds.slice(0, 5),
      mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
      reason: 'Practice has not started for this chapter yet — build foundational understanding before assessing.',
      recommended_after: 'practice',
      confidence: 'high',
    }
  }

  // 2. Repeated failures — remediate before allowing another attempt.
  if (!signals.assessmentPassed && signals.assessmentAttempts >= 2) {
    return {
      assessment_required: false,
      assessment_type: null,
      difficulty: stepTrack(signals.trackLevel, -1),
      question_count: 0,
      target_concepts: signals.weakConceptIds.length > 0 ? signals.weakConceptIds : kgNodeIds.slice(0, 5),
      mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
      reason: `${signals.assessmentAttempts} assessment attempts without a pass — remediate the weak concepts before retaking.`,
      recommended_after: 'remediation',
      confidence: 'high',
    }
  }

  // 3. Mastery already proven and stable — don't interrupt learning.
  if (signals.masteryLevel === 'TRUE_MASTERY' && signals.reviewDueConceptIds.length === 0) {
    return {
      assessment_required: false,
      assessment_type: null,
      difficulty: signals.trackLevel,
      question_count: 0,
      target_concepts: [],
      mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
      reason: 'Mastery already demonstrated and retention is stable — continue with new material.',
      recommended_after: null,
      confidence: 'high',
    }
  }

  // 4. Previously passed, but retention has decayed — reassess.
  if (signals.assessmentPassed && signals.reviewDueConceptIds.length > 0) {
    return {
      assessment_required: true,
      assessment_type: 'reassessment',
      difficulty: signals.trackLevel,
      question_count: FOCUSED_QUESTION_COUNT,
      target_concepts: signals.reviewDueConceptIds,
      mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
      reason: 'This chapter was previously passed, but the spaced-review schedule shows retention may be fading — reassess to confirm mastery still holds.',
      recommended_after: null,
      confidence: dataConfidence,
    }
  }

  // 5. Low confidence — ease in with a smaller, guided assessment.
  if (signals.confidenceLevel < 50) {
    return {
      assessment_required: true,
      assessment_type: 'guided',
      difficulty: stepTrack(signals.trackLevel, -1),
      question_count: FOCUSED_QUESTION_COUNT,
      target_concepts: signals.weakConceptIds.length > 0 ? signals.weakConceptIds : kgNodeIds.slice(0, 5),
      mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
      reason: 'Low self-reported confidence — a smaller, guided assessment reduces pressure while still confirming readiness.',
      recommended_after: null,
      confidence: dataConfidence,
    }
  }

  // 6. Excellent performance — raise the bar with a challenge assessment.
  if (
    signals.masteryLevel !== 'AT_RISK' &&
    signals.masteryLevel !== 'FALSE_MASTERY' &&
    signals.weakConceptIds.length === 0 &&
    signals.successRate >= 85 &&
    signals.confidenceLevel >= 70
  ) {
    return {
      assessment_required: true,
      assessment_type: 'challenge',
      difficulty: stepTrack(signals.trackLevel, 1),
      question_count: ASSESSMENT_TOTAL,
      target_concepts: kgNodeIds,
      mastery_threshold: CHALLENGE_MASTERY_THRESHOLD,
      reason: 'Strong recent performance across this chapter — a challenge assessment verifies deeper mastery.',
      recommended_after: null,
      confidence: dataConfidence,
    }
  }

  // 7. Default — standard assessment.
  return {
    assessment_required: true,
    assessment_type: 'standard',
    difficulty: signals.trackLevel,
    question_count: ASSESSMENT_TOTAL,
    target_concepts: signals.weakConceptIds.length > 0 ? signals.weakConceptIds : kgNodeIds,
    mastery_threshold: ASSESSMENT_PASS_THRESHOLD,
    reason: signals.practiceStatus === 'mastered'
      ? 'Practice mastery reached — ready for the chapter assessment.'
      : 'Practice is underway — an assessment will check current understanding.',
    recommended_after: null,
    confidence: dataConfidence,
  }
}

// ── Async signal gathering + decision wrapper ────────────────────────────────

/**
 * Gathers signals from the existing Student Memory Engine, Mastery
 * Intelligence Engine, and chapter progress details (all non-fatal,
 * each independently fault-tolerant), then runs the deterministic decision
 * function. Zero new database queries — every signal is read through an
 * existing, already-tested accessor.
 */
export async function getAssessmentDecision(
  userId: string,
  board: string,
  grade: number,
  subjectSlug: string,
  subjectId: string,
  chapter: Chapter,
): Promise<AssessmentDecision> {
  const kgNodeIds = chapter.kgNodeIds

  const [details, memory, masteryProfile] = await Promise.all([
    getChapterProgressDetails(userId, subjectSlug, chapter, false).catch(() => null),
    readLearnerMemory(userId, subjectSlug, subjectId).catch(() => null),
    getMasteryProfile(userId, board, grade, subjectSlug, chapter.id, kgNodeIds).catch(() => null),
  ])

  const weakConceptIds = memory
    ? memory.weakConcepts.filter((w) => kgNodeIds.includes(w.slug)).map((w) => w.slug)
    : []
  const reviewDueConceptIds = memory
    ? memory.dueForReview.filter((slug) => kgNodeIds.includes(slug))
    : []

  const signals: AssessmentSignals = {
    practiceStatus: details?.practiceStatus ?? 'not_started',
    assessmentPassed: details?.assessmentPassed ?? false,
    assessmentAttempts: details?.assessmentAttempts ?? 0,
    masteryLevel: masteryProfile?.masteryLevel ?? null,
    confidenceLevel: memory?.confidenceLevel ?? 70,
    trackLevel: memory?.trackLevel ?? 'T0',
    weakConceptIds,
    reviewDueConceptIds,
    successRate: memory?.successRate ?? 65,
  }

  return determineAssessmentDecision(signals, kgNodeIds)
}

// ── Tutor system prompt integration ──────────────────────────────────────────

/**
 * Builds an advisory ASSESSMENT INTELLIGENCE system prompt block. Purely
 * informational — the tutor decides how (or whether) to act on it. Returns
 * an empty string when no assessment is recommended and nothing else needs
 * to happen (mastery already stable), to avoid prompt noise.
 */
export function buildAssessmentIntelligenceBlock(decision: AssessmentDecision): string {
  if (!decision.assessment_required && decision.recommended_after === null) return ''

  const lines: string[] = ['\n\nASSESSMENT INTELLIGENCE']
  if (decision.assessment_required) {
    lines.push(`Recommendation: a ${decision.assessment_type} assessment is appropriate now (${decision.question_count} questions, pass mark ${decision.mastery_threshold}%).`)
  } else {
    lines.push(`Recommendation: hold off on assessment for now${decision.recommended_after ? ` — ${decision.recommended_after} first` : ''}.`)
  }
  lines.push(`Reason: ${decision.reason}`)
  lines.push('Do not reference this recommendation directly to the student — use it only to decide whether to steer the conversation toward (or away from) an assessment.')
  return lines.join('\n')
}
