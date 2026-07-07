import type { HTMLAttributes } from 'react'
import styles from './CandyPage.module.css'

export interface CandyPageProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Bridge the app-wide *legacy* semantic tokens (`--bg-*`, `--text-*`,
   * `--border-*`, `--coral`/`--accent-*`, `--font-heading/body`, …) to candy
   * values for screens still styled with those tokens or the global
   * `.btn-primary`/`.input-field`/`.card` classes. Lets such screens re-skin to
   * the candy palette + fonts without rewriting every inline style. (Same
   * cascade technique as /learn's `.learnCandy`.) Off by default, so screens
   * built directly on candy tokens are unaffected.
   */
  legacy?: boolean
}

/**
 * Candy "page shell" — wrap a screen's root element in this to opt the whole
 * page into the candy visual language. It applies the `.candyTheme` tokens
 * (so `var(--candy-*)` resolves for every candy primitive used inside), the
 * candy background + ink color, the Nunito body font and a full-height
 * min-height — matching how /dashboard's `.dashboardV2` root is set up.
 *
 * Renders a plain `<div>`; pass page layout (container width, padding) via
 * `className`/`style` or a child wrapper. Light/dark is handled automatically
 * through the app-wide `data-theme` attribute. Pass `legacy` to also re-skin
 * markup still using the app-wide semantic tokens / global form classes.
 */
export function CandyPage({ className, legacy, ...rest }: CandyPageProps) {
  const cls = [styles.candyPage, legacy && styles.legacyBridge, className].filter(Boolean).join(' ')
  return <div className={cls} {...rest} />
}
