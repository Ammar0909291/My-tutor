import { prisma } from '@/lib/db/prisma'
import { getCheckpointPassRate } from '@/lib/school/checkpoints/checkpointStats'
import { detectTeachingStyle, type TeachingStyleResult } from './teachingStyle'

/**
 * Student Learning Profile (Sprint BR) — deterministic, no AI, no new tables.
 *
 * Derives difficulty mode from existing assessment + practice + topic progress:
 *   guided   — frequent mistakes or failed assessments
 *   standard — average
 *   advanced — high mastery rate + strong assessment performance
 *
 * Sprint BS: also folds in the in-session understanding-checkpoint pass rate
 * (>80% = strong signal, <50% = struggling signal).
 */

export type DifficultyMode = 'guided' | 'standard' | 'advanced'

export interface StudentLearningProfile {
  grade: number
  strengths: string[]
  weaknesses: string[]
  masteredTopics: string[]
  strugglingTopics: string[]
  preferredDifficulty: DifficultyMode
  preferredTeachingStyle: TeachingStyleResult
  /** Sprint CB: number of detected prerequisite gaps across all struggling topics */
  prerequisiteGapCount: number
  /** Sprint CE: lightweight exam readiness summary string (e.g. "Mathematics: 78% (Exam Ready), ...") */
  examReadinessSummary: string | null
}

const LOOKBACK_DAYS = 60

export async function buildLearningProfile(
  userId: string,
  grade: number,
  subjectSlug?: string,
  lastSuccessfulStyle?: string | null,
  board?: string,
): Promise<StudentLearningProfile> {
  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000)

  const [topicProgressRows, assessmentRows, mistakeRows, checkpointStats] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId },
      select: { topicSlug: true, status: true, masteryPct: true },
    }),
    prisma.practiceSession.findMany({
      where: { userId, kind: 'assessment', completedAt: { not: null }, createdAt: { gte: since } },
      select: { score: true, subjectSlug: true, topicSlug: true },
    }).catch(() => [] as { score: number | null; subjectSlug: string; topicSlug: string }[]),
    prisma.mistakeRecord.findMany({
      where: { userId, createdAt: { gte: since } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    getCheckpointPassRate(userId),
  ])

  const masteredTopics = topicProgressRows
    .filter((r) => r.status === 'MASTERED')
    .map((r) => r.topicSlug)

  const strugglingTopics = topicProgressRows
    .filter((r) => r.status === 'IN_PROGRESS' && r.masteryPct > 0 && r.masteryPct < 60)
    .map((r) => r.topicSlug)

  // Strengths: mastered with high pct
  const strengths = topicProgressRows
    .filter((r) => (r.status === 'MASTERED' || r.status === 'COMPLETED') && r.masteryPct >= 80)
    .map((r) => r.topicSlug)
    .slice(0, 5)

  // Weaknesses: from recent mistake frequency
  const mistakeCount = new Map<string, number>()
  for (const m of mistakeRows) {
    mistakeCount.set(m.topicSlug, (mistakeCount.get(m.topicSlug) ?? 0) + 1)
  }
  const weaknesses = [...mistakeCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([slug]) => slug)

  // Difficulty mode
  const totalAssessments = assessmentRows.length
  const passedAssessments = assessmentRows.filter(
    (r) => typeof r.score === 'number' && r.score >= 70,
  ).length
  const passRate = totalAssessments > 0 ? passedAssessments / totalAssessments : null

  const totalTopics = topicProgressRows.length
  const masteredCount = masteredTopics.length
  const masteryRate = totalTopics > 0 ? masteredCount / totalTopics : null

  const highMistakeRate = mistakeRows.length > 10
  const frequentFailures = passRate !== null && passRate < 0.5

  // Sprint BS: in-session checkpoint pass rate — >80% strong, <50% struggling.
  const checkpointStruggling = checkpointStats.passRate !== null && checkpointStats.passRate < 50
  const checkpointStrong = checkpointStats.passRate !== null && checkpointStats.passRate >= 80

  let preferredDifficulty: DifficultyMode = 'standard'
  if (highMistakeRate || frequentFailures || checkpointStruggling) {
    preferredDifficulty = 'guided'
  } else if (
    (passRate !== null && passRate >= 0.8) ||
    (masteryRate !== null && masteryRate >= 0.6) ||
    checkpointStrong
  ) {
    preferredDifficulty = 'advanced'
  }

  const preferredTeachingStyle = await detectTeachingStyle(
    userId,
    subjectSlug ?? '',
    preferredDifficulty,
    lastSuccessfulStyle,
  ).catch(() => ({
    style: 'STEP_BY_STEP' as const,
    confidence: 'low' as const,
    label: 'Step-by-Step',
  }))

  // Sprint CB: count detected prerequisite gaps across struggling topics
  let prerequisiteGapCount = 0
  if (strugglingTopics.length > 0 || weaknesses.length > 0) {
    try {
      const { ALL_KG_NODES } = await import('@/lib/education')
      const KG_BY_ID = new Map(ALL_KG_NODES.map((n: import('@/lib/education').KnowledgeNode) => [n.id, n]))
      const recentMistakeSlugs = new Set([...weaknesses, ...strugglingTopics])
      const masteredSet = new Set(masteredTopics)
      for (const slug of recentMistakeSlugs) {
        const node = KG_BY_ID.get(slug)
        if (!node) continue
        for (const prereqId of node.prerequisites) {
          if (!masteredSet.has(prereqId)) {
            prerequisiteGapCount++
            break // count one gap per struggling topic
          }
        }
      }
    } catch { /* non-fatal */ }
  }

  // Sprint CE: lightweight exam readiness summary (only when board is provided)
  let examReadinessSummary: string | null = null
  if (board) {
    try {
      const { getExamReadinessForAllSubjects, buildExamReadinessSummaryText } = await import('./examReadiness')
      const summary = await getExamReadinessForAllSubjects(userId, board, grade)
      examReadinessSummary = buildExamReadinessSummaryText(summary)
    } catch { /* non-fatal */ }
  }

  return {
    grade,
    strengths,
    weaknesses,
    masteredTopics,
    strugglingTopics,
    preferredDifficulty,
    preferredTeachingStyle,
    prerequisiteGapCount,
    examReadinessSummary,
  }
}

/** Format the profile as a tutor context block. */
export function formatLearningProfileContext(profile: StudentLearningProfile): string {
  const difficultyInstructions: Record<DifficultyMode, string> = {
    guided: 'This student needs extra support: break explanations into smaller steps, provide more worked examples, check understanding more frequently, and keep a patient and encouraging tone.',
    standard: 'Teach at a normal pace with clear explanations and one worked example per concept.',
    advanced: 'This student has strong mastery: use deeper reasoning, introduce challenge questions ("What if...?", "Can you derive...?"), and move faster through basics.',
  }

  const lines = [
    `STUDENT LEARNING PROFILE:`,
    `- Grade: ${profile.grade}`,
    `- Coaching mode: ${profile.preferredDifficulty.toUpperCase()}`,
    `- Teaching style: ${profile.preferredTeachingStyle.label} (${profile.preferredTeachingStyle.confidence} confidence)`,
  ]
  if (profile.strengths.length > 0) {
    lines.push(`- Strong topics (can move quickly): ${profile.strengths.slice(0, 3).join(', ')}`)
  }
  if (profile.weaknesses.length > 0) {
    lines.push(`- Weak topics (reinforce gently): ${profile.weaknesses.slice(0, 3).join(', ')}`)
  }
  if (profile.strugglingTopics.length > 0) {
    lines.push(`- Currently struggling with: ${profile.strugglingTopics.slice(0, 3).join(', ')}`)
  }
  lines.push(`Coaching instruction: ${difficultyInstructions[profile.preferredDifficulty]}`)

  // Smart questioning per mode
  if (profile.preferredDifficulty === 'guided') {
    lines.push(`Periodically invite participation with: "Can you try this step?" or "What do you think comes next here?" — keep it gentle and supportive.`)
  } else if (profile.preferredDifficulty === 'advanced') {
    lines.push(`Periodically challenge with: "What do you think happens next?" or "Can you work out why that's true?" — push them to reason independently.`)
  }

  return `\n\n${lines.join('\n')}`
}

/** Derive a chapter difficulty badge label from KG node count and grade. */
export function chapterDifficultyBadge(
  kgNodeCount: number,
  grade: number,
): { label: 'Easy' | 'Moderate' | 'Advanced'; color: string; bg: string } {
  // Senior grades skew harder; more nodes = more complex
  const gradeWeight = grade >= 11 ? 2 : grade >= 9 ? 1 : 0
  const score = kgNodeCount + gradeWeight

  if (score <= 2) return { label: 'Easy', color: 'var(--green)', bg: 'var(--green-muted)' }
  if (score <= 5) return { label: 'Moderate', color: 'var(--yellow)', bg: 'var(--yellow-muted)' }
  return { label: 'Advanced', color: 'var(--coral)', bg: 'var(--coral-muted)' }
}

/**
 * Sprint BS: how often the tutor should weave in understanding checkpoints,
 * based on the student's coaching mode — guided students get more frequent
 * checks, advanced students get fewer.
 */
export function checkpointFrequencyForMode(mode: DifficultyMode): 'frequent' | 'normal' | 'reduced' {
  if (mode === 'guided') return 'frequent'
  if (mode === 'advanced') return 'reduced'
  return 'normal'
}
