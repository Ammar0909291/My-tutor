import { notFound } from 'next/navigation'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import type { VisualPayload } from '@/lib/teaching/visual/types'
import { PhysicsAuditFigure } from './PhysicsAuditFigure'
import { readFileSync } from 'node:fs'
import { parseVisualSpec } from '@/lib/visuals/visualSpec'

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

/** Subjects the audit page may resolve under. Absent => 'physics', so the existing Physics tooling is byte-identical; the Mathematics audit passes `subject=mathematics`. */
const AUDIT_SUBJECTS = new Set(['physics', 'mathematics'])

export default function PhysicsAuditPage({ searchParams }: { searchParams?: { concept?: string; fw?: string; subject?: string; fixture?: string; scope?: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  // English has no static figure (every English figure is generated at runtime), so its render audit feeds the real renderer a fixture
  // spec instead: `?fixture=<id>` reads scripts/qa/englishVisual/fixtures.json (dev only, id charset-checked, spec re-validated by the
  // production zod schema). Absent => the concept path below, unchanged.
  const fixtureId = searchParams?.fixture?.trim() ?? ''
  if (fixtureId) {
    const fw0 = Number(searchParams?.fw)
    const row = /^[A-Za-z0-9._-]+$/.test(fixtureId)
      ? (JSON.parse(readFileSync('scripts/qa/englishVisual/fixtures.json', 'utf8')) as Array<{ id: string; spec: unknown }>).find((f) => f.id === fixtureId)
      : undefined
    const spec = row ? parseVisualSpec(row.spec) : null
    return (
      <PhysicsAuditFigure
        frameWidth={Number.isFinite(fw0) && fw0 > 0 ? fw0 : null}
        conceptId={fixtureId}
        provenance="fixture"
        lessonScope={searchParams?.scope === 'lesson'}
        payload={spec ? ({ renderer: 'spec', visualSpec: spec } as VisualPayload) : null}
      />
    )
  }
  const conceptId = searchParams?.concept?.trim() ?? ''
  if (!conceptId) return <p>?concept=&lt;id&gt; required</p>
  const decision = resolveVisual({
    message: 'show me a diagram',
    lessonConceptId: conceptId,
    subject: AUDIT_SUBJECTS.has(searchParams?.subject ?? '') ? searchParams!.subject! : 'physics',
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
      lessonScope={searchParams?.scope === 'lesson'}
      payload={decision.payload as VisualPayload | null}
    />
  )
}
