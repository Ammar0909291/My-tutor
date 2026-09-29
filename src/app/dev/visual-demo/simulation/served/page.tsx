import { notFound } from 'next/navigation'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { ServedConceptFigure } from './ServedConceptFigure'

/**
 * Dev-only: what the PRODUCTION resolver serves for a concept (ADR 16, G3).
 *
 *   /dev/visual-demo/simulation/served?concept=phys.mech.newtons-second-law
 *
 * Runs the real `resolveVisual` on the server — the same registry → Tier 0/1
 * decision a lesson turn makes — and renders the served scene through
 * SceneSpecFigure, the component LessonScreen uses. It lets the browser test
 * exercise the served path without a database or a signed-in learner.
 * DEV-ONLY: 404 in production; it binds and changes nothing.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ServedConceptPage({ searchParams }: { searchParams: { concept?: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const conceptId = searchParams.concept ?? 'phys.mech.newtons-second-law'
  const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
  const payload = decision.payload as { renderer?: string; sceneSpec?: SceneSpec; visualType?: string } | null
  return (
    <ServedConceptFigure
      conceptId={conceptId}
      provenance={decision.provenance ?? null}
      renderer={payload?.renderer ?? null}
      visualType={payload?.visualType ?? null}
      sceneSpec={payload?.renderer === 'scene' ? payload.sceneSpec ?? null : null}
    />
  )
}
