import type { HTMLAttributes, CSSProperties } from 'react'
import styles from './primitives.module.css'

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Background color of the pill. Default var(--candy-red). */
  color?: string
}

/**
 * Candy "Pill" / "Badge" primitive — small rounded label (e.g. the "NEW"
 * badge on a practice-mode card). Renders a `<span>`; combine with
 * `className` for absolute positioning within a parent card.
 */
export function Pill({ color, className, style, ...rest }: PillProps) {
  const merged: CSSProperties = { ...(color ? { background: color } : {}), ...style }
  return <span className={[styles.pill, className].filter(Boolean).join(' ')} style={merged} {...rest} />
}
