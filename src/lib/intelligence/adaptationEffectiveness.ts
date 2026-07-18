/**
 * Adaptation Effectiveness — Educational Intelligence Sprint 7, Tasks 2/3/4/5.
 *
 * Measures whether the adaptive teaching system (Sprints 5/6) is actually
 * helping, by joining the already-derived before→after mastery signal
 * (`analyzeImprovement()`, Sprint 4-Improvement) with the teaching methods
 * recommended for each topic (`TeachingPlan`, Sprint 5). MEASUREMENT ONLY —
 * pure functions, no writes, no schema change, no teaching-plan mutation, no
 * Tutor Max / curriculum / grading / XP coupling. See
 * docs/EDUCATIONAL_INTELLIGENCE_ADAPTATION_EFFECTIVENESS_AUDIT.md.
 */
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from './revisionProfile'
import { generatePracticeTargets } from './practiceTargets'
import { generateRetestCandidates } from './retestCandidates'
import { analyzeImprovement, type TopicScoreHistoryRow, type VisualEvidenceHistoryRow, type ImprovementSummary } from './improvementTracking'
import { getTeachingPlans } from './teachingPlan'
import type { TeachingPlan, TeachingMethod } from './teachingPlan'
import type { DifficultyLevel } from './learningDifficultyProfile'

export type EffectivenessLevel = 'high' | 'medium' | 'low' | 'regression'

/** Example (per the Sprint 7 brief): `{ topicSlug, difficultyLevel, teachingMethods, masteryBefore, masteryAfter, improvement, effectiveness }`. */
export interface AdaptationEffectiveness {
  subjectSlug: string
  topicSlug: string
  topic: string
  difficultyLevel: DifficultyLevel
  teachingMethods: TeachingMethod[]
  masteryBefore: number
  masteryAfter: number
  improvement: number
  effectiveness: EffectivenessLevel
}

// ─── Effectiveness thresholds (descriptive, NOT grading) ───────────────────────
export const HIGH_IMPROVEMENT_MIN = 25
export const MEDIUM_IMPROVEMENT_MIN = 10

/** Task 3 — classifies one before→after delta. Pure. */
export function classifyEffectiveness(improvement: number): EffectivenessLevel {
  if (improvement < 0) return 'regression'
  if (improvement >= HIGH_IMPROVEMENT_MIN) return 'high'
  if (improvement >= MEDIUM_IMPROVEMENT_MIN) return 'medium'
  return 'low'
}

/**
 * Task 3 — joins the improvement summary (before→after mastery) with the
 * Sprint 5 teaching plans (methods/difficulty) per topic. Only topic-based
 * improvement entries that have a matching teaching plan are measured — a
 * topic with no plan was never adapted, so its change is not attributable.
 * Pure: no I/O.
 */
export function evaluateTeachingEffectiveness(
  improvement: ImprovementSummary,
  teachingPlans: TeachingPlan[]
): AdaptationEffectiveness[] {
  const planByKey = new Map(teachingPlans.map((p) => [`${p.subjectSlug}:${p.topicSlug}`, p]))
  const all = [...improvement.improving, ...improvement.stable, ...improvement.declining]

  const out: AdaptationEffectiveness[] = []
  for (const entry of all) {
    if (!entry.subjectSlug || !entry.topicSlug) continue // skip visual-type entries (not topic-scoped)
    const plan = planByKey.get(`${entry.subjectSlug}:${entry.topicSlug}`)
    if (!plan) continue
    out.push({
      subjectSlug: entry.subjectSlug,
      topicSlug: entry.topicSlug,
      topic: entry.topic,
      difficultyLevel: plan.difficultyLevel,
      teachingMethods: plan.recommendedMethods,
      masteryBefore: entry.previousMastery,
      masteryAfter: entry.currentMastery,
      improvement: entry.improvementPct,
      effectiveness: classifyEffectiveness(entry.improvementPct),
    })
  }
  // Largest improvement first.
  out.sort((a, b) => b.improvement - a.improvement)
  return out
}

export type InsightAssessment = 'effective' | 'moderate' | 'limited' | 'negative' | 'uncertain'

/** Example (per the Sprint 7 brief): "Worked examples appear effective." */
export interface AdaptationInsight {
  method: TeachingMethod
  sampleSize: number
  averageImprovement: number
  assessment: InsightAssessment
  message: string
}

const METHOD_LABEL: Record<TeachingMethod, string> = {
  step_by_step: 'Step-by-step instruction',
  worked_examples: 'Worked examples',
  visual_explanation: 'Visual explanation',
  guided_practice: 'Guided practice',
  more_revision: 'Extra revision',
  more_retesting: 'Retesting',
  analogy_based: 'Analogy-based teaching',
  standard_instruction: 'Standard instruction',
}

/** Minimum topics using a method before its impact is considered measurable (else "uncertain"). */
export const MIN_SAMPLE_FOR_CONFIDENCE = 2

/**
 * Task 4 — aggregates effectiveness by teaching method into advisory insights.
 * Recommendations only; never mutates any plan. Pure.
 */
export function generateAdaptationInsights(effectiveness: AdaptationEffectiveness[]): AdaptationInsight[] {
  const byMethod = new Map<TeachingMethod, number[]>()
  for (const e of effectiveness) {
    for (const m of e.teachingMethods) {
      const list = byMethod.get(m) ?? []
      list.push(e.improvement)
      byMethod.set(m, list)
    }
  }

  const insights: AdaptationInsight[] = []
  for (const [method, improvements] of byMethod) {
    const sampleSize = improvements.length
    const averageImprovement = Math.round(improvements.reduce((s, n) => s + n, 0) / sampleSize)
    const label = METHOD_LABEL[method]

    let assessment: InsightAssessment
    let message: string
    if (sampleSize < MIN_SAMPLE_FOR_CONFIDENCE) {
      assessment = 'uncertain'
      message = `${label} impact remains uncertain (only ${sampleSize} topic${sampleSize === 1 ? '' : 's'} measured so far).`
    } else if (averageImprovement < 0) {
      assessment = 'negative'
      message = `${label} shows a negative trend on average — review where it is applied.`
    } else if (averageImprovement >= HIGH_IMPROVEMENT_MIN) {
      assessment = 'effective'
      message = `${label} appears effective (avg +${averageImprovement}% mastery).`
    } else if (averageImprovement >= MEDIUM_IMPROVEMENT_MIN) {
      assessment = 'moderate'
      message = `${label} shows moderate improvement (avg +${averageImprovement}% mastery).`
    } else {
      assessment = 'limited'
      message = `${label} shows limited improvement (avg +${averageImprovement}% mastery).`
    }
    insights.push({ method, sampleSize, averageImprovement, assessment, message })
  }

  // Most-sampled, then strongest first.
  insights.sort((a, b) => b.sampleSize - a.sampleSize || b.averageImprovement - a.averageImprovement)
  return insights
}

export interface AdaptationEffectivenessProfile {
  effectiveness: AdaptationEffectiveness[]
  insights: AdaptationInsight[]
}

/** Task 5 — pure profile builder over the two already-computed inputs. */
export function buildAdaptationEffectivenessProfile(
  improvement: ImprovementSummary,
  teachingPlans: TeachingPlan[]
): AdaptationEffectivenessProfile {
  const effectiveness = evaluateTeachingEffectiveness(improvement, teachingPlans)
  const insights = generateAdaptationInsights(effectiveness)
  return { effectiveness, insights }
}

/**
 * Task 5/6 — loads a user's Sprint 4-Improvement summary and Sprint 5 teaching
 * plans, and builds their effectiveness profile. Read-only. Reuses the exact
 * data-fetch the improvement-tracking route uses (PracticeSession history +
 * school-chapter KG expansion) so the before→after signal is identical.
 */
export async function getAdaptationEffectivenessProfile(userId: string): Promise<AdaptationEffectivenessProfile> {
  const { teachingPlan } = await getTeachingPlans(userId)

  // ── Reproduce the improvement-tracking data fetch (read-only) ──
  const profile = await getRevisionProfile(userId)
  const attemptsRows = await prisma.topicProgress.findMany({
    where: { userId },
    select: { subjectSlug: true, topicSlug: true, attempts: true },
  })
  const targets = generatePracticeTargets(profile, attemptsRows)
  const retestCandidates = generateRetestCandidates(targets)

  const sessionRows = await prisma.practiceSession.findMany({
    where: { userId, completedAt: { not: null }, score: { not: null }, chapterId: null },
    select: { subjectSlug: true, topicSlug: true, score: true, completedAt: true },
  })

  const validTopicKeys = new Set(attemptsRows.map((r) => `${r.subjectSlug}:${r.topicSlug}`))
  const historyRows: TopicScoreHistoryRow[] = []
  for (const row of sessionRows) {
    if (validTopicKeys.has(`${row.subjectSlug}:${row.topicSlug}`)) {
      historyRows.push({ subjectSlug: row.subjectSlug, topicSlug: row.topicSlug, score: row.score as number, completedAt: row.completedAt as Date })
    }
  }

  const evidenceRows = await prisma.evidenceRecord.findMany({
    where: { userId, type: 'VISUAL' },
    select: { notes: true, createdAt: true },
  })
  const visualHistoryRows: VisualEvidenceHistoryRow[] = []
  for (const row of evidenceRows) {
    const notes = row.notes as { visualType?: string; shown?: number; completed?: number } | null
    if (!notes?.visualType) continue
    visualHistoryRows.push({ visualType: notes.visualType, shown: notes.shown ?? 0, completed: notes.completed ?? 0, createdAt: row.createdAt })
  }

  const improvement = analyzeImprovement(profile, historyRows, visualHistoryRows, targets, retestCandidates)
  return buildAdaptationEffectivenessProfile(improvement, teachingPlan)
}
