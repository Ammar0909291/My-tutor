'use client'

/**
 * P1 — visual lesson progress bar.
 *
 * Renders the six-stage lesson arc from the server-authoritative teaching
 * phase (`mastery.phase`, already returned by /api/learn/chat every turn), so
 * it advances automatically as the engine advances. Presentation only: no
 * state, no fetching, no advancement logic of its own.
 *
 * Styling follows the surrounding file's convention — inline styles over the
 * app-wide semantic tokens, which LessonScreen.module.css re-points at the
 * candy palette.
 */

import { buildLessonProgress, LESSON_STAGES } from '@/lib/teaching/lessonProgress'

export function LessonProgressBar({
  phase,
  masteryVerified = false,
}: {
  phase: string | undefined
  masteryVerified?: boolean
}) {
  const progress = buildLessonProgress(phase, masteryVerified)
  // No trustworthy phase yet (lesson not started) — render nothing rather
  // than an empty bar implying the lesson is underway.
  if (!progress) return null

  return (
    <div
      role="group"
      aria-label="Lesson progress"
      style={{
        padding: '8px 12px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
          {progress.complete ? 'Lesson complete' : progress.stage.label}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Step {progress.stageIndex + 1} of {progress.totalStages}
        </span>
      </div>

      {/* Track. aria-* carries the same information for screen readers, so the
          purely decorative segments below are hidden from the a11y tree. */}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
        aria-valuetext={
          progress.complete
            ? 'Lesson complete'
            : `${progress.stage.label}, step ${progress.stageIndex + 1} of ${progress.totalStages}`
        }
        style={{ display: 'flex', gap: 3, height: 6 }}
      >
        {LESSON_STAGES.map((stage, i) => {
          const reached = progress.complete || i <= progress.stageIndex
          const current = !progress.complete && i === progress.stageIndex
          return (
            <div
              key={stage.phase}
              aria-hidden="true"
              title={stage.label}
              style={{
                flex: 1,
                borderRadius: 999,
                background: reached ? 'var(--coral, #F78166)' : 'var(--bg-hover)',
                opacity: reached && !current ? 0.75 : 1,
                // P8: smooth transitions between stages.
                transition: 'background 320ms ease, opacity 320ms ease',
              }}
            />
          )
        })}
      </div>

      {/* Stage names — hidden on narrow viewports via the short label. */}
      <div style={{ display: 'flex', gap: 3 }} aria-hidden="true">
        {LESSON_STAGES.map((stage, i) => {
          const reached = progress.complete || i <= progress.stageIndex
          const current = !progress.complete && i === progress.stageIndex
          return (
            <span
              key={stage.phase}
              style={{
                flex: 1,
                fontSize: 9,
                textAlign: 'center',
                fontWeight: current ? 800 : 600,
                color: current
                  ? 'var(--text-primary)'
                  : reached
                    ? 'var(--text-secondary)'
                    : 'var(--text-tertiary, var(--text-secondary))',
                opacity: reached ? 1 : 0.55,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 320ms ease, opacity 320ms ease',
              }}
            >
              {stage.short}
            </span>
          )
        })}
      </div>
    </div>
  )
}
