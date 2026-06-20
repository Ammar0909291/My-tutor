'use client'
/**
 * VisualDemo — internal showcase for Visual Learning Sprint B (dev only).
 * Renders the supported VisualSpecs through the real VisualRenderer, plus a
 * theme toggle and a fail-safe (invalid spec) check. Not user-facing.
 */
import { useState } from 'react'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import { buildVisualSpec } from '@/lib/visuals/visualSpecBuilder'

// Sprint C: tutor-style explanations grounded in real curriculum topics from
// src/lib/education/mathKnowledgeGraph.ts (Linear Equations in Two Variables,
// Quadratic Equations, Cartesian Plane and Plotting, Integers — Introduction).
// These are NOT VisualSpecs — they are plain lesson text. The VisualSpec
// below each one is produced live by the real buildVisualSpec() detector,
// exactly as route.ts does for actual Tutor Max responses. No spec here is
// authored by hand.
const DETECTOR_FIXTURES: { topic: string; tutorText: string }[] = [
  {
    topic: 'Linear Equations in Two Variables (algebra.linear_equations_2var)',
    tutorText: "Let's graph this on the Cartesian plane. The linear equation y = x + 2 is a straight line — start at (0, 2) and use the slope to find more points.",
  },
  {
    topic: 'Quadratic Equations (algebra.quadratic_equations)',
    tutorText: 'A quadratic equation like y = x^2 - 2x - 3 graphs as a parabola. Notice the discriminant tells us it crosses the x-axis at two points.',
  },
  {
    topic: 'Cartesian Plane and Plotting (coordinate_geometry.cartesian_plane)',
    tutorText: 'Every point on the coordinate plane has an x and y value. For example the line y = -2x + 1 passes through the y-axis at (0, 1).',
  },
  {
    topic: 'Integers — Introduction (number_systems.integers)',
    tutorText: 'On the number line, negative numbers sit to the left of zero. Compare -5 and 3 as integers: which is greater?',
  },
]

// Sprint D: tutor-style explanations grounded in real curriculum geometry
// topics (src/lib/education/mathKnowledgeGraph.ts: geometry.triangles,
// geometry.quadrilaterals, geometry.circles, geometry.basic_shapes,
// mensuration.perimeter_area_2d). Run through the real detector below —
// no VisualSpec is hand-written here.
const GEOMETRY_DETECTOR_FIXTURES: { topic: string; tutorText: string }[] = [
  {
    topic: 'Triangles — Properties and Congruence (geometry.triangles)',
    tutorText: 'Find the area of a triangle with base 6 cm and height 4 cm. Remember, the angle sum of any triangle is always 180°.',
  },
  {
    topic: 'Quadrilaterals and Polygons (geometry.quadrilaterals)',
    tutorText: 'A rectangle with width 8 cm and height 3 cm — calculate its area and perimeter using the standard rectangle formulas.',
  },
  {
    topic: 'Circles (geometry.circles)',
    tutorText: 'For a circle of radius 5 cm, calculate the circumference and area using the centre and radius.',
  },
  {
    topic: 'Basic Geometry — Points, Lines and Angles (geometry.basic_shapes)',
    tutorText: 'Measure the angle: this is an angle of 45 degrees, which makes it an acute angle.',
  },
  {
    topic: 'Perimeter and Area of 2D Figures (mensuration.perimeter_area_2d)',
    tutorText: 'To find the perimeter and area of a triangle, we first need its base and height.',
  },
]

// Sprint D: the six supported geometry shapes, rendered through the real
// GeometryRenderer (via VisualRenderer) to verify rendering/theming/responsiveness
// independent of detection (which is exercised separately below).
const GEOMETRY_SPECS: { label: string; spec: VisualSpec }[] = [
  { label: 'Triangle — base 6, height 4',  spec: { type: 'geometry', shape: 'triangle', base: 6, height: 4 } },
  { label: 'Rectangle — 8 × 3',            spec: { type: 'geometry', shape: 'rectangle', width: 8, height: 3 } },
  { label: 'Circle — radius 5',            spec: { type: 'geometry', shape: 'circle', radius: 5 } },
  { label: 'Angle — 45°',                  spec: { type: 'geometry', shape: 'angle', angle: 45 } },
  { label: 'Angle — 120°',                 spec: { type: 'geometry', shape: 'angle', angle: 120 } },
  { label: 'Line segment — length 10',     spec: { type: 'geometry', shape: 'line', length: 10 } },
  { label: 'Point',                        spec: { type: 'geometry', shape: 'point' } },
]

const SPECS: { label: string; spec: VisualSpec }[] = [
  { label: 'Linear — y = x + 2',          spec: { type: 'graph', equation: 'y = x + 2', title: 'Linear' } },
  { label: 'Linear — y = -2x + 1',        spec: { type: 'graph', equation: 'y = -2x + 1', title: 'Linear (negative slope)' } },
  { label: 'Quadratic — y = x²',          spec: { type: 'graph', equation: 'y = x^2', title: 'Quadratic' } },
  { label: 'Quadratic — y = x² - 2x - 3', spec: { type: 'graph', equation: 'y = x^2 - 2x - 3', title: 'Quadratic (roots at -1, 3)' } },
  { label: 'Number line — -5 → 5',        spec: { type: 'number_line', start: -5, end: 5, highlight: [3], title: 'Highlight 3' } },
  { label: 'Number line — fractions',     spec: { type: 'number_line', start: -2, end: 2, step: 0.5, highlight: [-1.5, 0.5], title: 'Basic fractions' } },
  { label: 'Number line — large range',   spec: { type: 'number_line', start: -100, end: 100, highlight: [-50, 75], title: 'Auto-stepped' } },
]

export function VisualDemo() {
  // Initial theme can be set via ?theme=dark (dev convenience for screenshots);
  // the in-page toggle still works for manual checking.
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('theme') === 'dark'
  })
  // local CSS-variable shim so the renderers (which read these vars) look
  // correct on this standalone page regardless of global theme.
  const pageStyle = {
    minHeight: '100vh',
    background: dark ? '#0d1117' : '#f6f8fa',
    color: dark ? '#e6edf3' : '#1f2328',
    '--bg-surface': dark ? '#161b22' : '#ffffff',
    '--border-subtle': dark ? '#30363d' : '#e5e7eb',
    '--text-secondary': dark ? '#9da7b3' : '#4b5563',
    '--text-dim': dark ? '#6e7681' : '#9ca3af',
    '--coral': '#F78166',
    '--coral-muted': 'rgba(247,129,102,0.16)',
    '--font-mono': 'ui-monospace, monospace',
    padding: 24,
  } as React.CSSProperties
  return (
    <div data-theme={dark ? 'dark' : 'light'} style={pageStyle}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Visual Learning — Sprint B Showcase</h1>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit', cursor: 'pointer', fontSize: 13 }}
          >
            {dark ? '☀ Light' : '🌙 Dark'} mode
          </button>
        </div>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Dev-only. GraphRenderer (zoom/pan) + NumberLineRenderer via the real VisualRenderer.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16 }}>
          {SPECS.map(({ label, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer spec={spec} />
            </section>
          ))}

          {/* Fail-safe check: an invalid spec must render nothing, not crash. */}
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Fail-safe — invalid spec renders nothing</h2>
            <div style={{ border: '1px dashed var(--border-subtle)', borderRadius: 12, padding: 12, fontSize: 12, opacity: 0.6 }}>
              <VisualRenderer raw={{ type: 'graph', equation: 'y = sin(@@@)' }} />
              <VisualRenderer raw={{ type: 'unknown_type', foo: 1 }} />
              (nothing rendered above ✓)
            </div>
          </section>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint C — Automatic detection from real lesson text</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Each card below runs the real <code>buildVisualSpec()</code> detector (same function
          <code> /api/learn/chat</code> calls) against tutor-style text grounded in the actual
          curriculum (src/lib/education/mathKnowledgeGraph.ts). No VisualSpec is hand-written here.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {DETECTOR_FIXTURES.map(({ topic, tutorText }) => {
            const detected = buildVisualSpec(tutorText)
            return (
              <section key={topic}>
                <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{topic}</h2>
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, marginBottom: 8, fontSize: 12, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  &ldquo;{tutorText}&rdquo;
                </div>
                {detected ? <VisualRenderer spec={detected} /> : (
                  <p style={{ fontSize: 12, opacity: 0.6 }}>No visual detected (renders lesson text only — zero regression).</p>
                )}
              </section>
            )
          })}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint D — Geometry Engine (manual specs, rendering proof)</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The six supported shapes via the real GeometryRenderer (through VisualRenderer). Automatic detection from real lesson text is demonstrated separately below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16 }}>
          {GEOMETRY_SPECS.map(({ label, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer spec={spec} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint D — Automatic geometry detection from real lesson text</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Each card runs the real <code>buildVisualSpec()</code> detector against tutor-style text grounded
          in real curriculum geometry topics (src/lib/education/mathKnowledgeGraph.ts). No VisualSpec is hand-written here.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {GEOMETRY_DETECTOR_FIXTURES.map(({ topic, tutorText }) => {
            const detected = buildVisualSpec(tutorText)
            return (
              <section key={topic}>
                <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{topic}</h2>
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, marginBottom: 8, fontSize: 12, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  &ldquo;{tutorText}&rdquo;
                </div>
                {detected ? <VisualRenderer spec={detected} /> : (
                  <p style={{ fontSize: 12, opacity: 0.6 }}>No visual detected (renders lesson text only — zero regression).</p>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
