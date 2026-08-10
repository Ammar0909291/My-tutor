import { notFound } from 'next/navigation'
import { Visual2DHarness } from './Visual2DHarness'

/**
 * 2D visual corpus harness — DEV ONLY, 404 in production, unlinked from all
 * navigation. Companion to /dev/visual-cards (three.js) and
 * /dev/physics-pilot (SceneSpec), so the whole active corpus can be measured
 * in a real browser without a database or an AI provider.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function Visual2DPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <Visual2DHarness />
}
