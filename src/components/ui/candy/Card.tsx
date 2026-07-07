import type { HTMLAttributes } from 'react'
import styles from './primitives.module.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Candy "Card" primitive — white/dark surface, 24px rounded corners and the
 * flat candy drop-shadow (`0 4px 0 var(--candy-shadow)`).
 *
 * Renders a plain `<div>` with the candy card look applied; pass layout
 * concerns (padding, flex/grid, gap, etc.) via `className` or `style`.
 * Requires `.candyTheme` tokens on an ancestor element.
 */
export function Card({ className, ...rest }: CardProps) {
  return <div className={[styles.card, className].filter(Boolean).join(' ')} {...rest} />
}
