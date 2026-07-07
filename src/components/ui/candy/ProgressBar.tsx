import type { CSSProperties } from 'react'
import styles from './primitives.module.css'

export interface ProgressBarProps {
  /** Fill percentage, 0-100. */
  percent: number
  /** Track/fill height in px. Default 12 (matches the daily-goal bar). */
  height?: number
  /** Border radius in px for both track and fill. Default 8. */
  borderRadius?: number
  /** Track background. Default '#EEF1FB'. */
  trackColor?: string
  /** Fill background (color or gradient). Default green candy gradient. */
  fillColor?: string
  /**
   * Animate the fill growing from 0 with the springy `growBar` keyframe
   * (1.2s cubic-bezier overshoot). Default true. Set false for bars that
   * should render at their final width immediately (e.g. quest progress).
   */
  animated?: boolean
  className?: string
}

/**
 * Candy "ProgressBar" primitive — a linear progress bar with the springy
 * (overshoot) grow-in animation used by the daily-goal bar and the daily
 * quest bars.
 */
export function ProgressBar({
  percent,
  height = 12,
  borderRadius = 8,
  trackColor = '#EEF1FB',
  fillColor = 'linear-gradient(90deg, var(--candy-green), #7DE029)',
  animated = true,
  className,
}: ProgressBarProps) {
  const trackStyle: CSSProperties = { height, borderRadius, background: trackColor }
  const fillStyle: CSSProperties = animated
    ? ({ borderRadius, background: fillColor, '--progress-width': `${percent}%` } as CSSProperties)
    : { borderRadius, background: fillColor, width: `${percent}%` }

  return (
    <div className={[styles.progressTrack, className].filter(Boolean).join(' ')} style={trackStyle}>
      <div className={[styles.progressFill, animated ? styles.progressFillAnimated : ''].filter(Boolean).join(' ')} style={fillStyle} />
    </div>
  )
}
