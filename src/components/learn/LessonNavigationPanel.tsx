'use client'

import {
  computeLessonLockState, canAdvanceToNextLesson,
  type CurriculumLesson, type CurriculumProgress, type TopicProgressEntry,
} from '@/lib/curriculum/lessonNavigation'

interface LessonNavigationPanelProps {
  previousLesson: CurriculumLesson | null
  currentLesson: CurriculumLesson | null
  nextLesson: CurriculumLesson | null
  totalLessons: number
  progress: CurriculumProgress
  topicProgressMap: Record<string, TopicProgressEntry>
  availableTopicSlugs: string[]
  teachingLanguage?: string
  disabled?: boolean
  onPrevious: () => void
  onCurrent?: () => void
  onNext: () => void
}

const INDIGO = '#6C5CE7'
const GREEN = '#22C55E'
const AMBER = '#F59E0B'

function statusBadge(lesson: CurriculumLesson | null, ctx: {
  progress: CurriculumProgress
  topicProgressMap: Record<string, TopicProgressEntry>
  availableTopicSlugs: string[]
}): { icon: string; color: string; label: string } | null {
  if (!lesson) return null
  const state = computeLessonLockState(lesson, ctx)
  if (state.isMastered) return { icon: '⭐', color: GREEN, label: 'Mastered' }
  if (state.isRevision) return { icon: '🔁', color: '#79C0FF', label: 'In revision' }
  if (state.isCompleted) return { icon: '✅', color: GREEN, label: 'Completed' }
  if (state.isCurrent) return { icon: '●', color: INDIGO, label: 'In progress' }
  if (state.isLocked) return { icon: '🔒', color: 'var(--text-dim)', label: 'Locked' }
  return { icon: '○', color: 'var(--text-dim)', label: 'Not started' }
}

/**
 * Lesson Navigation Panel — Previous / Current / Next, inside the Tutor Max
 * chat panel. Purely presentational: every field it renders is data
 * LessonScreen.tsx already fetched (CurriculumLesson[], CurriculumProgress,
 * topicProgressMap, availableTopicSlugs). Lock/mastery/completion state is
 * computed by the same computeLessonLockState() the Curriculum Roadmap
 * tree uses, so the two views can never disagree.
 */
export function LessonNavigationPanel({
  previousLesson, currentLesson, nextLesson, totalLessons,
  progress, topicProgressMap, availableTopicSlugs, teachingLanguage,
  disabled, onPrevious, onCurrent, onNext,
}: LessonNavigationPanelProps) {
  if (!currentLesson) return null
  const isRu = teachingLanguage === 'ru'
  const isHi = teachingLanguage === 'hi'
  const ctx = { progress, topicProgressMap, availableTopicSlugs }

  const currentBadge = statusBadge(currentLesson, ctx)
  const isCurrentCompleted = progress.completedLessons.includes(currentLesson.order)
  const nextEnabled = !disabled && canAdvanceToNextLesson(currentLesson, nextLesson, ctx)
  const nextState = nextLesson ? computeLessonLockState(nextLesson, ctx) : null
  const nextLockedReason = nextLesson && nextState?.isLocked
    ? (isRu ? 'Заблокировано — выполните текущий урок и предпосылки'
        : isHi ? 'Locked — pehle current lesson aur prerequisites complete karo'
        : 'Locked — finish the current lesson and its prerequisites first')
    : undefined

  const slotStyle = (accent?: string): React.CSSProperties => ({
    flex: 1, minWidth: 0, padding: '8px 10px', borderRadius: 10,
    border: `1px solid ${accent ? `${accent}44` : 'var(--border-subtle)'}`,
    background: accent ? `${accent}0c` : 'transparent',
    display: 'flex', flexDirection: 'column', gap: 3,
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
    color: 'var(--text-dim)',
  }
  const titleStyle: React.CSSProperties = {
    fontSize: 11.5, fontWeight: 600, color: 'var(--text-primary)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  }
  const conceptStyle: React.CSSProperties = {
    fontSize: 10, color: 'var(--text-dim)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  }

  return (
    <div
      role="navigation"
      aria-label={isRu ? 'Навигация по урокам' : isHi ? 'Lesson navigation' : 'Lesson navigation'}
      style={{
        display: 'flex', gap: 6, padding: '8px 12px',
        borderBottom: '1px solid var(--border-subtle)', alignItems: 'stretch',
      }}
    >
      {/* Previous Lesson */}
      <button
        onClick={onPrevious}
        disabled={disabled || !previousLesson}
        title={previousLesson ? previousLesson.lessonTitle : undefined}
        aria-label={isRu ? 'Предыдущий урок' : 'Previous lesson'}
        style={{
          ...slotStyle(),
          textAlign: 'left', cursor: previousLesson && !disabled ? 'pointer' : 'default',
          opacity: previousLesson ? 1 : 0.45,
        }}
      >
        <span style={labelStyle}>← {isRu ? 'Предыдущий' : isHi ? 'Pichla' : 'Previous'}</span>
        {previousLesson ? (
          <>
            <span style={titleStyle}>{previousLesson.lessonTitle}</span>
            <span style={conceptStyle}>{previousLesson.topicSlug ?? previousLesson.unitTitle}</span>
            {(() => {
              const b = statusBadge(previousLesson, ctx)
              return b ? <span style={{ fontSize: 10, color: b.color }}>{b.icon} {b.label}</span> : null
            })()}
          </>
        ) : (
          <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {isRu ? 'Нет предыдущего урока' : 'No earlier lesson'}
          </span>
        )}
      </button>

      {/* Current Lesson */}
      <button
        onClick={onCurrent}
        disabled={disabled || !onCurrent}
        title={isRu ? 'Начать урок заново' : 'Restart this lesson'}
        aria-label={isRu ? 'Текущий урок' : isHi ? 'Current lesson' : 'Current lesson'}
        style={{
          ...slotStyle(INDIGO),
          textAlign: 'left',
          cursor: onCurrent && !disabled ? 'pointer' : 'default',
        }}
      >
        <span style={{ ...labelStyle, color: INDIGO }}>
          {isRu ? 'Текущий' : isHi ? 'Current' : 'Current'}
          {totalLessons > 0 && (
            <span style={{ marginLeft: 6, fontWeight: 700, color: 'var(--text-dim)' }}>
              {currentLesson.order} / {totalLessons}
            </span>
          )}
        </span>
        <span style={titleStyle}>{currentLesson.lessonTitle}</span>
        <span style={conceptStyle}>{currentLesson.topicSlug ?? currentLesson.unitTitle}</span>
        {currentBadge && (
          <span style={{ fontSize: 10, color: currentBadge.color }}>{currentBadge.icon} {currentBadge.label}</span>
        )}
      </button>

      {/* Next Lesson / Continue to Next Lesson */}
      <button
        onClick={onNext}
        disabled={!nextEnabled}
        title={nextLockedReason ?? (nextLesson ? nextLesson.lessonTitle : undefined)}
        aria-label={isRu ? 'Следующий урок' : 'Next lesson'}
        aria-disabled={!nextEnabled}
        style={{
          ...slotStyle(isCurrentCompleted && nextEnabled ? GREEN : undefined),
          textAlign: 'left', cursor: nextEnabled ? 'pointer' : 'default',
          opacity: nextLesson ? (nextEnabled ? 1 : 0.55) : 0.45,
        }}
      >
        <span style={{ ...labelStyle, color: isCurrentCompleted && nextEnabled ? GREEN : undefined }}>
          {isCurrentCompleted && nextEnabled
            ? (isRu ? '✅ Продолжить →' : isHi ? '✅ Continue →' : '✅ Continue to Next Lesson →')
            : `${isRu ? 'Следующий' : isHi ? 'Agla' : 'Next'} →`}
        </span>
        {nextLesson ? (
          <>
            <span style={titleStyle}>{nextLesson.lessonTitle}</span>
            <span style={conceptStyle}>{nextLesson.topicSlug ?? nextLesson.unitTitle}</span>
            {nextState?.isLocked ? (
              <span style={{ fontSize: 10, color: AMBER }}>🔒 {isRu ? 'Заблокировано' : 'Locked'}</span>
            ) : !isCurrentCompleted ? (
              <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                {isRu ? 'Завершите текущий урок' : 'Finish the current lesson first'}
              </span>
            ) : null}
          </>
        ) : (
          <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {isRu ? 'Это последний урок' : 'This is the last lesson'}
          </span>
        )}
      </button>
    </div>
  )
}
