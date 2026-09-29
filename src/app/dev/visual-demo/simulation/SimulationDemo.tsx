'use client'
/**
 * Dev-only harness for the Newton simulation (ADR 16, G2).
 *
 * Renders the REAL production component, ExplainerFigure, with the canonical
 * Newton figure straight from the parametric registry — no concept binding,
 * no route, no server. The inspection panel below it shows what the pure
 * layers hold (phase, tick, the v–t trace, the in-memory evidence log) so the
 * browser test can assert on it. Nothing here is sent anywhere.
 */
import { useCallback, useState } from 'react'
import { ExplainerFigure } from '@/components/school/visuals/ExplainerFigure'
import type { SimulationHost } from '@/components/school/visuals/useSimulation'
import { canonicalParametricScene } from '@/lib/teaching/visual/parametricScenes'

const KIND = 'newton_second_law'

export function SimulationDemo() {
  const [spec] = useState(() => canonicalParametricScene(KIND))
  const [host, setHost] = useState<SimulationHost | null>(null)
  const onUpdate = useCallback((h: SimulationHost) => setHost(h), [])

  if (!spec) return <p>Newton simulation is not registered.</p>

  const objects = host?.frame?.steps.flatMap((s) => s.objects) ?? []
  const trace = objects.find((o) => o.id === 'velocity-time-graph')
  const now = objects.find((o) => o.id === 'current-velocity')
  const block = objects.find((o) => o.id === 'block')

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 16, background: 'var(--bg-primary, #0b1220)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 18, margin: '0 0 4px' }}>Newton&apos;s second law — time-stepped simulation (dev only)</h1>
      <p style={{ fontSize: 12, opacity: 0.7, margin: '0 0 12px' }}>
        ADR 16 gate G2. Not a production route; no concept is bound to this simulation.
      </p>

      <ExplainerFigure spec={spec} onSimulationUpdate={onUpdate} />

      <section aria-label="Inspection (dev only)" style={{ marginTop: 16, fontSize: 12 }}>
        <h2 style={{ fontSize: 13, margin: '0 0 6px' }}>Inspection (dev only)</h2>
        <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12 }}>
          <dt>phase</dt><dd data-testid="inspect-phase">{host?.control?.phase ?? '—'}</dd>
          <dt>tick</dt><dd data-testid="inspect-tick">{host?.control?.tick ?? '—'}</dd>
          <dt>terminal tick</dt><dd data-testid="inspect-terminal">{host?.control?.terminalTick ?? '—'}</dd>
          <dt>params</dt><dd data-testid="inspect-params">{JSON.stringify(host?.control?.params ?? {})}</dd>
          <dt>frame id</dt><dd data-testid="inspect-frame-id">{host?.frame?.id ?? '—'}</dd>
          <dt>block x</dt><dd data-testid="inspect-block-x">{block?.position?.[0] ?? '—'}</dd>
          <dt>v–t trace points</dt><dd data-testid="inspect-vt-points">{trace?.points?.length ?? 0}</dd>
          <dt>v–t current point</dt><dd data-testid="inspect-vt-now">{JSON.stringify(now?.position ?? null)}</dd>
        </dl>
        <h3 style={{ fontSize: 12, margin: '10px 0 4px' }}>Evidence log (in memory only)</h3>
        <pre data-testid="sim-evidence" style={{ whiteSpace: 'pre-wrap', maxHeight: 260, overflow: 'auto', margin: 0 }}>
          {JSON.stringify(host?.evidence.events ?? [], null, 1)}
        </pre>
      </section>
    </main>
  )
}
