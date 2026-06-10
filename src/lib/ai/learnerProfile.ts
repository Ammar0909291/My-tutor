export interface LearnerProfile {
  profileId: string
  strengths: string[]
  weaknesses: string[]
  learningStyle: string
  pace: 'slow' | 'medium' | 'fast'
  estimatedLevel: 'beginner' | 'intermediate' | 'advanced'
  confidenceScore: number
  learningPace: 'FAST' | 'STEADY' | 'SLOW'
  explanationStyle: string
  consistencyRate: number
  topicsStruggling: string[]
  topicsMastered: string[]
  nextRecommendation: string
  strongConcepts: string[]
  weakConcepts: string[]
  studyStreak?: number
  lastActive?: string
  mistakeTrend: Array<{ concept: string; category: string; count: number; recent?: boolean }>
  recommendedFocusAreas: string[]
  mode?: string
  recommendedDifficulty?: string
  averageMastery?: number
}

export async function getLearnerProfile(_profileId: string): Promise<LearnerProfile | null> {
  return null
}

export async function updateLearnerProfile(
  _profileId: string,
  _data: Partial<LearnerProfile>
): Promise<void> {}

export async function buildLearnerIntelligenceProfile(
  _userId: string,
  _subjectCode?: string,
  _subjectId?: string | null,
  _selfDescription?: string | null,
  _learningGoals?: string | null,
): Promise<LearnerProfile & { hasSignal: boolean }> {
  return {
    profileId: _userId ?? '',
    strengths: [], weaknesses: [], learningStyle: 'mixed', pace: 'medium',
    estimatedLevel: 'beginner', confidenceScore: 0, learningPace: 'STEADY',
    explanationStyle: 'standard', consistencyRate: 0, topicsStruggling: [],
    topicsMastered: [], nextRecommendation: '', strongConcepts: [], weakConcepts: [],
    mistakeTrend: [], recommendedFocusAreas: [],
    hasSignal: false,
  }
}

export function humanize(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function formatLearnerIntelligenceContext(_profile: LearnerProfile | null): string {
  return ''
}
