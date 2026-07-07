'use client'

interface LearnerPositionPanelProps {
  subjectSlug?: string
  teachingLanguage?: string
  onGapClick?: (topicSlug: string) => void
  [key: string]: unknown
}

interface LockedTopicDetailProps {
  topicSlug?: string
  teachingLanguage?: string
  lockReasons?: Record<string, { missingPrereqs: { slug: string; title: string }[] }>
  [key: string]: unknown
}

export function LearnerPositionPanel({ subjectSlug }: LearnerPositionPanelProps) {
  if (!subjectSlug) return null
  return (
    <div style={{
      padding: '7px 12px',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 11,
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
    }}>
      <span style={{ fontSize: 9, color: 'var(--coral)' }}>◉</span>
      Knowledge map active
    </div>
  )
}

export function LockedTopicDetail({ topicSlug, lockReasons, teachingLanguage }: LockedTopicDetailProps) {
  if (!topicSlug || !lockReasons) return null
  const info = lockReasons[topicSlug]
  if (!info?.missingPrereqs?.length) return null
  const isRu = teachingLanguage === 'ru'
  return (
    <div style={{ paddingTop: 5, paddingBottom: 3 }}>
      <p style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {isRu ? 'Требуется' : 'Requires'}
      </p>
      {info.missingPrereqs.map((p) => (
        <div key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
          <span style={{ fontSize: 8, color: '#F85149', flexShrink: 0 }}>●</span>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.title}</span>
        </div>
      ))}
    </div>
  )
}
