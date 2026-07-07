import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import styles from './primitives.module.css'

export interface CandyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Resting box-shadow depth in px (the "3D" thickness). Default 4. */
  depth?: number
  /** Color of the 3D shadow (any CSS color, e.g. a candy token var). Default var(--candy-shadow). */
  shadowColor?: string
  /** translateY(-Npx) applied on hover, in px. Default 2. */
  hoverLift?: number
  /** Shadow depth while hovered, in px. Defaults to `depth` (no change). */
  hoverDepth?: number
  /** translateY(+Npx) applied on press, in px. Default 1. */
  activePush?: number
  /** Shadow depth while pressed, in px. Default 1. */
  activeDepth?: number
}

/**
 * Candy "Button" primitive — the chunky 3D-press button used for stat
 * chips, the continue card and the practice-mode cards.
 *
 * Renders a `<button>` with a flat bottom shadow that shrinks on press and
 * grows (optionally) on hover, simulating a physical button. All mechanics
 * are tuned via `depth`/`hoverLift`/`hoverDepth`/`activePush`/`activeDepth`/
 * `shadowColor`; pass the visual skin (background, border-radius, padding,
 * etc.) via `className`.
 */
export function CandyButton({
  depth = 4,
  shadowColor = 'var(--candy-shadow)',
  hoverLift = 2,
  hoverDepth,
  activePush = 1,
  activeDepth = 1,
  className,
  style,
  ...rest
}: CandyButtonProps) {
  const vars = {
    '--btn-depth': `${depth}px`,
    '--btn-shadow': shadowColor,
    '--btn-hover-lift': `${hoverLift}px`,
    '--btn-hover-depth': `${hoverDepth ?? depth}px`,
    '--btn-active-push': `${activePush}px`,
    '--btn-active-depth': `${activeDepth}px`,
  } as CSSProperties

  return <button className={[styles.btn3d, className].filter(Boolean).join(' ')} style={{ ...vars, ...style }} {...rest} />
}
