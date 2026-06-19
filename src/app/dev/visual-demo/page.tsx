import { notFound } from 'next/navigation'
import { VisualDemo } from './VisualDemo'

/**
 * Internal visual-learning showcase — Visual Learning Sprint B.
 * DEV-ONLY: returns 404 in production so it is never visible to normal users.
 * Unlinked from all navigation; reachable only by typing /dev/visual-demo in
 * a development server. Used purely to exercise VisualRenderer / GraphRenderer
 * / NumberLineRenderer in isolation.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function VisualDemoPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <VisualDemo />
}
