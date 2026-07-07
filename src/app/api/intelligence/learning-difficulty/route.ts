/**
 * Learning Difficulty API — Educational Intelligence Sprint 4
 * (Learning Difficulty Intelligence), Task 5.
 *
 * GET only: returns the authenticated user's `LearningDifficultyProfile`
 * (Task 2), the LOW/MEDIUM/HIGH `DifficultySummary` (Task 3), and the
 * `TeachingAdaptationRecommendation[]` (Task 4). Read-only — never writes
 * to TopicProgress, StudentProgress, EvidenceRecord, or anything else.
 * Used only by the dev-only Learning Difficulty Viewer (Task 6); no
 * production UI calls it this sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getLearningDifficultyProfile,
  detectLearningDifficulties,
} from '@/lib/intelligence/learningDifficultyProfile'
import { generateTeachingAdaptations } from '@/lib/intelligence/teachingAdaptations'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await getLearningDifficultyProfile(session.user.id)
  const difficulties = detectLearningDifficulties(profile)
  const recommendations = generateTeachingAdaptations(profile)

  return NextResponse.json({ profile, difficulties, recommendations })
}
