import { notFound } from 'next/navigation'
import { VisualCardsHarness } from '../VisualCardsHarness'

/**
 * One card, alone on the page — DEV ONLY, 404 in production.
 *
 * The full harness runs every three.js card at once, which exceeds the
 * browser's live-WebGL-context limit, so the later figures paint nothing. This
 * route exists to LOOK at a single figure with its context intact.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function OneVisualCardPage({ params }: { params: { type: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  return <VisualCardsHarness only={params.type} />
}
