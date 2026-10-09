'use client'
/**
 * Renders a resolver decision the way a lesson does: a scene goes through
 * SceneSpecFigure (→ ExplainerFigure), exactly as LessonScreen renders
 * `msg.sceneSpec`. A card decision is only described — the point of this page
 * is to show WHICH path a concept takes, not to re-render every card.
 */
import { SceneSpecFigure } from '@/components/school/visuals/SceneSpecFigure'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

export function ServedConceptFigure({ conceptId, provenance, renderer, visualType, sceneSpec }: {
  conceptId: string
  provenance: string | null
  renderer: string | null
  visualType: string | null
  sceneSpec: SceneSpec | null
}) {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 16, background: 'var(--bg-primary, #0b1220)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 18, margin: '0 0 4px' }}>Served visual for {conceptId} (dev only)</h1>
      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, fontSize: 12, margin: '0 0 12px' }}>
        <dt>provenance</dt><dd data-testid="served-provenance">{provenance ?? '—'}</dd>
        <dt>renderer</dt><dd data-testid="served-renderer">{renderer ?? 'none'}</dd>
        <dt>card</dt><dd data-testid="served-card">{visualType ?? '—'}</dd>
        <dt>scene kind</dt><dd data-testid="served-kind">{sceneSpec?.parametric?.kind ?? '—'}</dd>
      </dl>
      {sceneSpec && <SceneSpecFigure spec={sceneSpec} fitToCanvas={conceptId.startsWith('bio.')} />}
    </main>
  )
}
