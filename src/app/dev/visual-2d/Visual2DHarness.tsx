'use client'

/**
 * THE 2D HALF OF THE ACTIVE CORPUS — dev-only measurement surface.
 *
 * The runtime authority can fill exactly three channels, and two of them are
 * 2D (see `route.ts`'s authority clamp):
 *
 *   'card'  -> VisualCard          19 of its types are SVG, not three.js
 *   'spec'  -> VisualRenderer      4 renderers: graph, number_line,
 *                                  geometry, process_flow
 *   'scene' -> SceneSpecRenderer   (covered by /dev/physics-pilot)
 *
 * The 3D half was measured in a browser; this half never was. It was assumed
 * safe because it is SVG with CSS variables — which is a reason to expect it
 * to be fine, not evidence that it is. This page exists so it can be measured
 * the same way: real components, real renderer, no database, no AI provider.
 *
 * The spec fixtures below are ordinary valid specs built the way
 * `visualSpecBuilder` builds them. They are inputs to a measurement, not
 * authored teaching content.
 *
 * Adds no route, component or behaviour to production.
 */

import { VisualCard } from '@/components/school/visuals/VisualCard'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { VISUAL_META, type VisualType } from '@/lib/school/visuals/visualTypes'
import type { VisualSpec } from '@/lib/visuals/visualSpec'

/** Every VisualCard type whose figure is SVG rather than three.js. */
const SVG_CARDS = (Object.keys(VISUAL_META) as VisualType[])
  .filter((type) => !type.startsWith('three_'))
  .sort()

const SPECS: { name: string; spec: VisualSpec }[] = [
  { name: 'spec:graph', spec: { type: 'graph', equation: '2x + 1', title: 'A straight line' } },
  { name: 'spec:number_line', spec: { type: 'number_line', start: -5, end: 5, highlight: [-3, 0, 4], title: 'Integers around zero' } },
  { name: 'spec:geometry:triangle', spec: { type: 'geometry', shape: 'triangle', base: 8, height: 5 } },
  { name: 'spec:geometry:circle', spec: { type: 'geometry', shape: 'circle', radius: 4 } },
  // ── REAL GENERATED OUTPUT ─────────────────────────────────────────────────
  // Not invented fixtures: these two are the verbatim payloads the engine
  // produced through gemini-3.5-flash-lite and served after the critic passed
  // them — a curriculum concept and a topic the curriculum has never heard of.
  // The authored corpus was measured in a browser; the figures a learner
  // actually gets from runtime generation had never been.
  {
    name: 'generated:kg:kinetic-energy',
    spec: {
      type: 'graph',
      equation: '0.5 * x^2',
      title: 'Kinetic Energy as a Function of Velocity (m = 1 kg)',
    },
  },
  {
    name: 'generated:runtime-topic:kubernetes',
    spec: {
      type: 'process_flow',
      title: 'Kubernetes Pod Scheduling Lifecycle',
      steps: [
        { title: 'Pending Pod Creation' },
        { title: 'Filtering Nodes (Predicates)' },
        { title: 'Scoring Feasible Nodes (Priorities)' },
        { title: 'Binding Pod to Node' },
      ],
    },
  },
  {
    name: 'spec:process_flow',
    spec: {
      type: 'process_flow',
      title: 'How a plant makes food',
      steps: [
        { title: 'Light hits the leaf' },
        { title: 'Water arrives from the roots' },
        { title: 'Carbon dioxide enters the pores' },
        { title: 'Sugar and oxygen are produced' },
      ],
    },
  },
]

export function Visual2DHarness() {
  return (
    <main style={{ padding: 16, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>2D visual corpus harness</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20, fontSize: 13 }}>
        Dev-only. {SVG_CARDS.length} SVG card types and {SPECS.length} VisualSpec figures,
        each painted by the production renderer.
      </p>

      {SVG_CARDS.map((type) => (
        <section key={type} data-visual2d={type} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 12, margin: '0 0 4px', fontFamily: 'ui-monospace, monospace', color: 'var(--text-dim)' }}>
            {type}
          </h2>
          <VisualCard type={type} autoPlay speed={4} />
        </section>
      ))}

      {SPECS.map(({ name, spec }) => (
        <section key={name} data-visual2d={name} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 12, margin: '0 0 4px', fontFamily: 'ui-monospace, monospace', color: 'var(--text-dim)' }}>
            {name}
          </h2>
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 10, background: 'var(--bg-surface)' }}>
            <VisualRenderer spec={spec} />
          </div>
        </section>
      ))}
    </main>
  )
}
