import { notFound } from 'next/navigation'
import { ChemVisualAuditHarness } from './ChemVisualAuditHarness'

/**
 * Chemistry visual AUDIT surface — DEV ONLY, 404 in production, unlinked from
 * all navigation (same gate as /dev/visual-2d, /dev/visual-cards and
 * /dev/physics-pilot).
 *
 * Mounts the REAL learner-facing component for one manifest entry, inside a
 * replica of the lesson's teaching-canvas container, so a headless browser can
 * render and measure exactly what a learner would see. Driven by
 * `scripts/chemistry/visual-audit/render-measure.mjs`, which injects the entry
 * as `window.__CHEM_AUDIT__` before the page loads.
 *
 * Deliberately NO `searchParams` here: reading one forces the tree through
 * Suspense, and measured in Chromium (see /dev/visual-cards) a react-three-fiber
 * canvas then never leaves its 300x150 default. The payload is client-side only.
 *
 * Adds no route, component or behaviour to production.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ChemVisualAuditPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <ChemVisualAuditHarness />
}
