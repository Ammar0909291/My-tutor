import { notFound } from 'next/navigation'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import type { VisualPayload } from '@/lib/teaching/visual/types'
import { PhysicsAuditFigure } from './PhysicsAuditFigure'

/**
 * Physics visual audit render page — DEV ONLY (404 in production).
 *
 *   /dev/physics-audit?concept=phys.mech.newtons-second-law
 *
 * Resolves the concept through the REAL production authority (`resolveVisual`,
 * the same sync decision a lesson turn makes) and renders the resulting payload
 * with the same dispatch LessonScreen uses (card → VisualCard, scene →
 * SceneSpecFigure, spec → VisualRenderer). It is the render surface for
 * `scripts/qa/physicsVisual/render.ts`, which measures what a learner would
 * actually see in headless Chromium.
 *
 * It adds no renderer, registry or selection logic: one figure per page load
 * (a WebGL context is scarce), nothing persisted, nothing sent anywhere.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function PhysicsAuditPage({ searchParams }: { searchParams?: { concept?: string; fw?: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const conceptId = searchParams?.concept?.trim() ?? ''
  if (!conceptId) return <p>?concept=&lt;id&gt; required</p>
  const decision = resolveVisual({
    message: 'show me a diagram',
    lessonConceptId: conceptId,
    subject: 'physics',
    learnerRequest: 'diagram',
  })
  // `fw` pins the figure frame's width in px so the audit can reproduce the
  // lesson surface at a given viewport (layout.ts VIEWPORTS: a 390px phone
  // gives the canvas 282px, a 1280px desktop 992px). Absent => LessonScreen's
  // own VISUAL_FRAME (full width, 720px cap).
  const fw = Number(searchParams?.fw)
  return (
    <PhysicsAuditFigure
      frameWidth={Number.isFinite(fw) && fw > 0 ? fw : null}
      conceptId={conceptId}
      provenance={decision.provenance}
      payload={decision.payload as VisualPayload | null}
    />
  )
}
