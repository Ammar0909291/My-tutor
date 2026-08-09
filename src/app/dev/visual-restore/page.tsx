import { notFound } from 'next/navigation'
import { SceneSpecFigure } from '@/components/school/visuals/SceneSpecFigure'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'

/**
 * Visual RESTORE harness — DEV ONLY.
 *
 * 404s in production, unlinked from navigation, adds nothing to the product.
 * Sibling of /dev/physics-pilot, and deliberately a separate page: that one
 * renders what a LIVE turn resolves, this one renders what a REFRESH restores.
 *
 * The point it exists to make visible, in a real browser: after a reload the
 * server holds only the figure's identity — `{conceptId, representation,
 * renderer, returnToConceptId, turns}` from contextSnapshot.visualSession — and
 * `restoreVisualSession()` turns that back into a painted figure by re-running
 * the resolver and the admission gate. Each card below shows the persisted
 * identity next to the figure re-derived from it, so "the payload was never
 * stored" and "the picture comes back" can be checked at the same time.
 *
 * The round-trip through JSON.parse(JSON.stringify(...)) is the real one:
 * contextSnapshot is a JSONB column.
 */
export const metadata = { robots: { index: false, follow: false } }

const CASES = [
  { id: 'phys.mech.viscosity', note: 'the reported case — excursion figure' },
  { id: 'phys.opt.total-internal-reflection', note: 'concept-scoped' },
  { id: 'phys.therm.calorimetry', note: 'concept-scoped' },
  { id: 'phys.meas.units', note: 'no figure — must stay empty after restore' },
  { id: 'phys.opt.reflection', note: 'RETIRED binding — must stay empty after restore' },
] as const

export default function VisualRestorePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Visual session restore</h1>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        Dev-only. Each card shows the identity that survives a refresh and the
        figure re-derived from it through the production resolver and admission
        gate. The payload itself is never persisted.
      </p>

      {CASES.map(({ id, note }) => {
        // 1. A live turn, exactly as a lesson produces it.
        const live = resolveVisual({
          message: 'explain with diagram',
          lessonConceptId: id,
          subject: 'physics',
          learnerRequest: 'diagram',
        })
        // 2. What the JSONB column keeps.
        const persisted = JSON.parse(JSON.stringify(live.session))
        // 3. What a refresh gets back.
        const restored = restoreVisualSession(persisted)
        const payload = restored?.payload
        const identical = JSON.stringify(restored?.payload) === JSON.stringify(live.payload)

        return (
          <section
            key={id}
            style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, marginBottom: 20 }}
          >
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#6b7280' }}>{id}</div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>{note}</div>
            <pre style={{ fontSize: 11, background: '#0000000d', padding: 8, borderRadius: 8, overflowX: 'auto' }}>
              persisted identity: {JSON.stringify(persisted)}
            </pre>
            <div style={{ fontSize: 12, marginBottom: 8 }}>
              restored: <strong>{restored ? 'figure' : 'no figure'}</strong>
              {restored ? <> · payload identical to live: <strong>{String(identical)}</strong></> : null}
            </div>
            {payload?.renderer === 'scene' ? <SceneSpecFigure spec={payload.sceneSpec} /> : null}
          </section>
        )
      })}
    </main>
  )
}
