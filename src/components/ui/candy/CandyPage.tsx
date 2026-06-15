import type { HTMLAttributes } from 'react'
import styles from './CandyPage.module.css'

export interface CandyPageProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Candy "page shell" — wrap a screen's root element in this to opt the whole
 * page into the candy visual language. It applies the `.candyTheme` tokens
 * (so `var(--candy-*)` resolves for every candy primitive used inside), the
 * candy background + ink color, the Nunito body font and a full-height
 * min-height — matching how /dashboard's `.dashboardV2` root is set up.
 *
 * Renders a plain `<div>`; pass page layout (container width, padding) via
 * `className`/`style` or a child wrapper. Light/dark is handled automatically
 * through the app-wide `data-theme` attribute.
 */
export function CandyPage({ className, ...rest }: CandyPageProps) {
  return <div className={[styles.candyPage, className].filter(Boolean).join(' ')} {...rest} />
}
