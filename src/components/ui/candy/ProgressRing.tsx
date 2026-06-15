'use client'

import { useId, type ReactNode } from 'react'
import styles from './primitives.module.css'

export interface ProgressRingProps {
  /** Fill percentage, 0-100. */
  percent: number
  /** Overall width/height of the ring in px. Default 84. */
  size?: number
  /** Circle radius in px. Default 36 (matches the daily-goal ring). */
  radius?: number
  /** Stroke width in px. Default 10. */
  strokeWidth?: number
  /** Track stroke color. Default '#EEF1FB'. */
  trackColor?: string
  /** Gradient start color for the fill stroke. Default '#8B5CF6' (candy purple). */
  gradientFrom?: string
  /** Gradient end color for the fill stroke. Default '#3B9EFF' (candy blue). */
  gradientTo?: string
  /** Optional centered content, e.g. a "65%" label. */
  label?: ReactNode
  className?: string
}

/**
 * Candy "ProgressRing" primitive — a circular progress ring with the
 * springy (overshoot) fill-in animation used by the daily-goal card.
 */
export function ProgressRing({
  percent,
  size = 84,
  radius = 36,
  strokeWidth = 10,
  trackColor = '#EEF1FB',
  gradientFrom = '#8B5CF6',
  gradientTo = '#3B9EFF',
  label,
  className,
}: ProgressRingProps) {
  const gradientId = `candy-ring-${useId().replace(/:/g, '')}`
  const circumference = 2 * Math.PI * radius
  const dashoffset = circumference - (circumference * percent) / 100
  const center = size / 2

  return (
    <div className={[styles.ringWrap, className].filter(Boolean).join(' ')} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        <circle className={styles.ringBg} cx={center} cy={center} r={radius} stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          className={styles.ringFill}
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          style={{ '--ring-circumference': circumference, '--ring-dashoffset': dashoffset } as React.CSSProperties}
        />
      </svg>
      {label !== undefined && <div className={styles.ringCenter}>{label}</div>}
    </div>
  )
}
