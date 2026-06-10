'use client'

interface Props {
  subjectSlug?: string
  topicSlug?: string
  topicTitle?: string
  lessonGoal?: string
  teachingLanguage?: string
  difficulty?: number
  focusCategories?: string[]
  onClose?: () => void
  onComplete?: (score: number | null, evidenceWritten: boolean) => void
  onViewInsights?: () => void
  [key: string]: unknown
}

export function PracticePanel(_props: Props) {
  return null
}
