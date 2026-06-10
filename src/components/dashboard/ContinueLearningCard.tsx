'use client'

interface Props {
  subjectSlug?: string
  primarySubjectSlug?: string
  topicSlug?: string
  lessonTitle?: string
  [key: string]: unknown
}

export function ContinueLearningCard({ subjectSlug, topicSlug, lessonTitle }: Props) {
  if (!subjectSlug || !topicSlug) return null
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Continue Learning</p>
      <p className="font-semibold">{lessonTitle ?? topicSlug}</p>
    </div>
  )
}
