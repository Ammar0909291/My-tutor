import { notFound } from 'next/navigation'
import { VisualCardsHarness } from './VisualCardsHarness'

/**
 * VisualCard three.js label harness — DEV ONLY.
 *
 * Returns 404 in production, exactly like /dev/visual-demo and
 * /dev/physics-pilot, and is unlinked from all navigation. It renders the
 * ACTIVE three.js VisualCard corpus through the real VisualCard so the shared
 * label layer can be measured in a real browser at every viewport and theme.
 *
 * Adds no route, component or behaviour to production.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function VisualCardsPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <VisualCardsHarness />
}
