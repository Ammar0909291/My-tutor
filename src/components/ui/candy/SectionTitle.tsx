import type { HTMLAttributes } from 'react'
import styles from './primitives.module.css'

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Candy "SectionTitle" primitive — Baloo 2, 20px/800, used to introduce a
 * group of cards (e.g. "⚡ Jump back in"). Include the emoji directly in
 * `children`.
 */
export function SectionTitle({ className, ...rest }: SectionTitleProps) {
  return <div className={[styles.sectionTitle, className].filter(Boolean).join(' ')} {...rest} />
}
