import { notFound } from 'next/navigation'
import { Evidence } from './Evidence'

/**
 * DEV-ONLY visual evidence page — 404 in production, unlinked from navigation.
 * Mounts the learner's own renderers with payloads the engine really produced.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function VisualEvidencePage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <Evidence />
}
