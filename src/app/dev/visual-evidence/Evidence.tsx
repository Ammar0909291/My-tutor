'use client'

/**
 * PARSER-FIX EVIDENCE — the learner's own renderer, payloads the engine really
 * produced and previously REFUSED as "equation does not compile".
 * Dev-only; the route 404s in production. No rendering code of its own.
 */

import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualSpec } from '@/lib/visuals/visualSpec'

/** Was refused by the parser; now compiles, passes the critic, and serves. */
const DECAY = {
  type: 'graph',
  equation: '100*exp(-0.2*x)',
  title: 'Radioactive Decay: N(t) = N0 e^(-lambda t)',
} as unknown as VisualSpec

/** Was refused by the parser; now compiles, passes the critic, and serves. */
const SHM = {
  type: 'graph',
  equation: 'sin(x)',
  title: 'Simple Harmonic Motion: Displacement against Time',
} as unknown as VisualSpec

/** Unchanged by this work — the regression control. */
const CONTROL = {
  type: 'graph',
  equation: '0.5 * x^2',
  title: 'Kinetic Energy as a function of velocity (mass = 1 kg)',
} as unknown as VisualSpec

/** The pre-existing sign bug, in the shape that exposed it. */
const SIGN = {
  type: 'graph',
  equation: '-0.5*x^2 + 8',
  title: 'Downward parabola: -0.5 x^2 + 8',
} as unknown as VisualSpec

function Case({ id, topic, note, children }: {
  id: string; topic: string; note: string; children: React.ReactNode
}) {
  return (
    <section data-evidence={id} style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 14, margin: '0 0 2px', color: 'var(--text-primary, #e6edf3)' }}>{topic}</h2>
      <p style={{ fontSize: 11, margin: '0 0 10px', color: 'var(--text-secondary, #8b949e)' }}>{note}</p>
      {children}
    </section>
  )
}

export function Evidence() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <Case id="decay" topic="phys.mod.radioactive-decay (exponential)"
        note="100*exp(-0.2*x) - previously refused by the parser - now critic PASS - served">
        <VisualRenderer spec={DECAY} />
      </Case>
      <Case id="shm" topic="phys.wave.shm (trigonometric)"
        note="sin(x) - previously refused by the parser - now critic PASS - served">
        <VisualRenderer spec={SHM} />
      </Case>
      <Case id="control" topic="phys.mech.kinetic-energy (REGRESSION CONTROL)"
        note="0.5 * x^2 - worked before this change and must render identically">
        <VisualRenderer spec={CONTROL} />
      </Case>
      <Case id="sign" topic="Unary-minus sign fix"
        note="-0.5*x^2 + 8 must open DOWNWARD; it used to be squared after negation">
        <VisualRenderer spec={SIGN} />
      </Case>
    </main>
  )
}
