'use client'

import {
  computeLessonLockState,
  type CurriculumLesson, type CurriculumProgress, type TopicProgressEntry,
} from '@/lib/curriculum/lessonNavigation'
import { useLanguage } from '@/components/ui/LanguageToggle'

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

type BadgeLabels = {
  mastered: string; inRevision: string; completed: string
  inProgress: string; locked: string; notStarted: string
}

function statusBadge(lesson: CurriculumLesson | null, ctx: {
  progress: CurriculumProgress
  topicProgressMap: Record<string, TopicProgressEntry>
  availableTopicSlugs: string[]
}, labels: BadgeLabels): { icon: string; color: string; label: string } | null {
  if (!lesson) return null
  const state = computeLessonLockState(lesson, ctx)
  if (state.isMastered) return { icon: '⭐', color: GREEN, label: labels.mastered }
  if (state.isRevision) return { icon: '🔁', color: '#79C0FF', label: labels.inRevision }
  if (state.isCompleted) return { icon: '✅', color: GREEN, label: labels.completed }
  if (state.isCurrent) return { icon: '●', color: INDIGO, label: labels.inProgress }
  if (state.isLocked) return { icon: '🔒', color: 'var(--text-dim)', label: labels.locked }
  return { icon: '○', color: 'var(--text-dim)', label: labels.notStarted }
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
  progress, topicProgressMap, availableTopicSlugs,
  disabled, onPrevious, onCurrent, onNext,
}: LessonNavigationPanelProps) {
  const { t } = useLanguage()
  if (!currentLesson) return null
  const ctx = { progress, topicProgressMap, availableTopicSlugs }
  const badgeLabels: BadgeLabels = {
    mastered: t('status_mastered'),
    inRevision: t('status_in_revision'),
    completed: t('module_status_completed'),
    inProgress: t('module_status_in_progress'),
    locked: t('module_status_locked'),
    notStarted: t('status_not_started'),
  }

  const currentBadge = statusBadge(currentLesson, ctx, badgeLabels)
  const isCurrentCompleted = progress.completedLessons.includes(currentLesson.order)
  // Free navigation: Next is clickable whenever a next lesson exists, exactly
  // like Previous always is — matches the explicit product decision that a
  // learner may page between adjacent lessons freely. canAdvanceToNextLesson
  // (the lock check) still computes nextState below purely for the
  // informational "🔒 Locked" badge — it no longer disables the button.
  const nextEnabled = !disabled && !!nextLesson
  const nextState = nextLesson ? computeLessonLockState(nextLesson, ctx) : null
  const nextLockedReason = nextLesson && nextState?.isLocked
    ? t('nav_locked_reason')
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
      aria-label={t('nav_lesson_area')}
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
        aria-label={t('nav_previous_lesson')}
        style={{
          ...slotStyle(),
          textAlign: 'left', cursor: previousLesson && !disabled ? 'pointer' : 'default',
          opacity: previousLesson ? 1 : 0.45,
        }}
      >
        <span style={labelStyle}>← {t('nav_previous')}</span>
        {previousLesson ? (
          <>
            <span style={titleStyle}>{previousLesson.lessonTitle}</span>
            <span style={conceptStyle}>{previousLesson.topicSlug ?? previousLesson.unitTitle}</span>
            {(() => {
              const b = statusBadge(previousLesson, ctx, badgeLabels)
              return b ? <span style={{ fontSize: 10, color: b.color }}>{b.icon} {b.label}</span> : null
            })()}
          </>
        ) : (
          <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {t('nav_no_previous')}
          </span>
        )}
      </button>

      {/* Current Lesson */}
      <button
        onClick={onCurrent}
        disabled={disabled || !onCurrent}
        title={t('nav_restart_lesson')}
        aria-label={t('nav_current_lesson')}
        style={{
          ...slotStyle(INDIGO),
          textAlign: 'left',
          cursor: onCurrent && !disabled ? 'pointer' : 'default',
        }}
      >
        <span style={{ ...labelStyle, color: INDIGO }}>
          {t('nav_current_lesson')}
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
        aria-label={t('nav_next_lesson')}
        aria-disabled={!nextEnabled}
        style={{
          ...slotStyle(isCurrentCompleted && nextEnabled ? GREEN : undefined),
          textAlign: 'left', cursor: nextEnabled ? 'pointer' : 'default',
          opacity: nextLesson ? (nextEnabled ? 1 : 0.55) : 0.45,
        }}
      >
        <span style={{ ...labelStyle, color: isCurrentCompleted && nextEnabled ? GREEN : undefined }}>
          {isCurrentCompleted && nextEnabled
            ? t('nav_continue_next')
            : `${t('nav_next_lesson')} →`}
        </span>
        {nextLesson ? (
          <>
            <span style={titleStyle}>{nextLesson.lessonTitle}</span>
            <span style={conceptStyle}>{nextLesson.topicSlug ?? nextLesson.unitTitle}</span>
            {nextState?.isLocked ? (
              <span style={{ fontSize: 10, color: AMBER }}>🔒 {t('module_status_locked')}</span>
            ) : !isCurrentCompleted ? (
              <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                {t('nav_finish_current')}
              </span>
            ) : null}
          </>
        ) : (
          <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {t('nav_no_next')}
          </span>
        )}
      </button>
    </div>
  )
}
