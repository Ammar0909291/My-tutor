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
import { useVisualMastery } from '@/hooks/useVisualMastery'
import type { VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { persistVisualMasterySummary } from '@/lib/visuals/visualMasteryPersistence'
import { VisualMasteryViewer } from '@/components/visuals/VisualMasteryViewer'
import { RevisionIntelligenceViewer } from '@/components/intelligence/RevisionIntelligenceViewer'
import { PracticeTargetsViewer } from '@/components/intelligence/PracticeTargetsViewer'

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

// Sprint E: tutor-style explanations grounded in real curriculum science
// topics (src/lib/education/biologyKnowledgeGraph.ts, scienceKnowledgeGraph.ts,
// chemistryKnowledgeGraph.ts, geographyKnowledgeGraph.ts). Run through the
// real detector below — no VisualSpec is hand-written here.
const SCIENCE_DETECTOR_FIXTURES: { topic: string; tutorText: string }[] = [
  {
    topic: 'Photosynthesis (biology.photosynthesis)',
    tutorText: 'Photosynthesis is how plants convert sunlight, water, and carbon dioxide into glucose and oxygen inside the chloroplast.',
  },
  {
    topic: 'Digestion and Absorption (biology.digestion)',
    tutorText: 'Explain the human digestive system: digestion begins in the mouth, continues through the stomach and intestines, and ends with absorption.',
  },
  {
    topic: 'Ecosystem (biology.ecosystem)',
    tutorText: 'A food chain shows how energy flows from producers to consumers and finally to decomposers in an ecosystem.',
  },
  {
    topic: 'Respiration in Plants (biology.respiration_plants)',
    tutorText: 'Cellular respiration breaks down glucose using oxygen to release energy, producing carbon dioxide and water as byproducts.',
  },
  {
    topic: 'Chemical Reactions and Equations (chemistry.chemical_reactions.equations)',
    tutorText: 'In a chemical reaction, reactants are transformed into products by breaking and forming chemical bonds.',
  },
  {
    topic: 'States of Matter (chemistry.states_of_matter)',
    tutorText: 'Water can exist as a solid, liquid, or gas — these are called states of matter, and the changes between them follow a predictable pattern.',
  },
  {
    topic: 'Moisture, Clouds and Precipitation (geography.moisture_precipitation)',
    tutorText: 'The water cycle describes how water evaporates, condenses into clouds, falls as precipitation, and is collected in rivers and oceans.',
  },
  {
    topic: 'Structure of the Earth (earth_science.earth_structure.layers)',
    tutorText: 'The rock cycle explains how igneous, sedimentary, and metamorphic rocks continuously transform into one another over geological time.',
  },
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

// Sprint E: manual process_flow specs, rendered through the real
// ProcessFlowRenderer (via VisualRenderer) to verify rendering/theming/
// responsiveness/orientation independent of detection (exercised below).
const PROCESS_FLOW_SPECS: { label: string; spec: VisualSpec }[] = [
  { label: 'Photosynthesis (horizontal, fits desktop)', spec: { type: 'process_flow', title: 'Photosynthesis', steps: ['Sunlight', 'Water', 'Carbon Dioxide', 'Glucose', 'Oxygen'].map((title) => ({ title })), orientation: 'horizontal' } },
  { label: 'Water Cycle (auto)', spec: { type: 'process_flow', title: 'Water Cycle', steps: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'].map((title) => ({ title })), orientation: 'auto' } },
  { label: 'Digestion (vertical, forced)', spec: { type: 'process_flow', title: 'Digestion', steps: ['Mouth', 'Stomach', 'Small Intestine', 'Large Intestine', 'Absorption'].map((title) => ({ title })), orientation: 'vertical' } },
  {
    label: 'Rock Cycle (8 steps, with notes)',
    spec: {
      type: 'process_flow', title: 'Rock Cycle', orientation: 'auto',
      steps: [
        { title: 'Magma', note: 'Molten rock beneath the surface' },
        { title: 'Igneous Rock', note: 'Magma cools and solidifies' },
        { title: 'Weathering and Erosion', note: 'Rock is broken down' },
        { title: 'Sediment', note: 'Particles are transported and deposited' },
        { title: 'Sedimentary Rock', note: 'Sediment compacts and cements' },
        { title: 'Heat and Pressure', note: 'Burial deep underground' },
        { title: 'Metamorphic Rock', note: 'Rock recrystallizes' },
        { title: 'Melting', note: 'Returns to magma' },
      ],
    },
  },
]

// Sprint F: interactive specs — same renderers, `interactive: true` opt-in.
// Manual specs only (Task 7's real-curriculum demo is Sprint E's, unchanged
// here); this section exercises the new drag/reorder behavior in isolation.
const INTERACTIVE_SPECS: { label: string; spec: VisualSpec }[] = [
  { label: 'Graph — drag slope & intercept (y = x + 1)', spec: { type: 'graph', equation: 'y = x + 1', title: 'Interactive linear graph', interactive: true } },
  { label: 'Number line — drag points, compare', spec: { type: 'number_line', start: -10, end: 10, highlight: [2, 5], title: 'Move a point from 2 to 5', interactive: true } },
  { label: 'Triangle — drag vertices', spec: { type: 'geometry', shape: 'triangle', base: 6, height: 4, interactive: true } },
  { label: 'Rectangle — drag corner', spec: { type: 'geometry', shape: 'rectangle', width: 8, height: 3, interactive: true } },
  { label: 'Circle — drag radius', spec: { type: 'geometry', shape: 'circle', radius: 5, interactive: true } },
  { label: 'Angle — drag ray', spec: { type: 'geometry', shape: 'angle', angle: 45, interactive: true } },
  {
    label: 'Photosynthesis — reorder (shuffled)',
    spec: {
      type: 'process_flow', title: 'Photosynthesis', interactive: true, orientation: 'auto',
      steps: ['Sunlight', 'Water', 'Carbon Dioxide', 'Glucose', 'Oxygen'].map((title) => ({ title })),
    },
  },
]

// Sprint G: assessment specs — same renderers, opt-in `challenge` alongside
// `interactive`. Each card states a target; the live drag value is graded
// against it with a tolerance, purely client-side.
const CHALLENGE_SPECS: { label: string; spec: VisualSpec }[] = [
  { label: 'Graph challenge — hit slope 3, intercept 2', spec: { type: 'graph', equation: 'y = x + 1', title: 'Drag to slope=3, intercept=2', interactive: true, challenge: { targetSlope: 3, targetIntercept: 2 } } },
  { label: 'Number line — place a point near 7', spec: { type: 'number_line', start: -10, end: 10, highlight: [2], title: 'Place a point near 7', interactive: true, challenge: { targetValue: 7 } } },
  { label: 'Number line — make a < b', spec: { type: 'number_line', start: -10, end: 10, highlight: [5, 3], title: 'Arrange so the first point is less than the second', interactive: true, challenge: { targetRelation: '<' } } },
  { label: 'Number line — ascending order', spec: { type: 'number_line', start: -10, end: 10, highlight: [8, 1, 5], title: 'Arrange the three points in ascending order', interactive: true, challenge: { order: 'asc' } } },
  { label: 'Triangle challenge — area = 20', spec: { type: 'geometry', shape: 'triangle', base: 6, height: 4, interactive: true, challenge: { targetArea: 20 } } },
  { label: 'Rectangle challenge — perimeter = 24', spec: { type: 'geometry', shape: 'rectangle', width: 8, height: 3, interactive: true, challenge: { targetPerimeter: 24 } } },
  { label: 'Circle challenge — radius = 8', spec: { type: 'geometry', shape: 'circle', radius: 5, interactive: true, challenge: { targetRadius: 8 } } },
  { label: 'Angle challenge — set angle to 120°', spec: { type: 'geometry', shape: 'angle', angle: 45, interactive: true, challenge: { targetAngle: 120 } } },
  {
    label: 'Photosynthesis — reorder challenge',
    spec: {
      type: 'process_flow', title: 'Photosynthesis', interactive: true, orientation: 'auto', challenge: {},
      steps: ['Sunlight', 'Water', 'Carbon Dioxide', 'Glucose', 'Oxygen'].map((title) => ({ title })),
    },
  },
]

// Sprint J: tutor-style explanations for the six newly-covered concepts
// (fractions, percentages, ratios, coordinate geometry, statistics,
// probability). Run through the real detector below — no VisualSpec is
// hand-written here, same convention as every detector-fixture list above.
const SPRINT_J_DETECTOR_FIXTURES: { topic: string; tutorText: string }[] = [
  {
    topic: 'Fractions — placement (number_systems.fractions)',
    tutorText: 'Place the fraction 3/4 on a number line to see where it sits between 0 and 1.',
  },
  {
    topic: 'Fractions — comparison (number_systems.fractions)',
    tutorText: 'Which is bigger: 1/2 or 5/8? Compare them on a number line.',
  },
  {
    topic: 'Percentages (number_systems.percentages)',
    tutorText: 'A student scored 75% on a test. Show 75% on a percentage scale.',
  },
  {
    topic: 'Ratios (number_systems.ratio_proportion)',
    tutorText: 'A recipe mixes flour and sugar in a ratio of 2:3 — what fraction of the mixture is each ingredient?',
  },
  {
    topic: 'Coordinate Geometry — distance between two points (coordinate_geometry.distance)',
    tutorText: 'Plot the points (2, 3) and (5, 9), then find the distance between them.',
  },
  {
    topic: 'Statistics — mean, median, range (statistics.central_tendency)',
    tutorText: 'Find the mean of these test scores: 4, 8, 6, 5, 3, 8. Also find the median and the range.',
  },
  {
    topic: 'Probability — single event (probability.basic_probability)',
    tutorText: 'A fair die has six faces. What is the probability of rolling a 4? The probability is 1/6.',
  },
  {
    topic: 'Probability — everyday percentage framing (probability.basic_probability)',
    tutorText: 'The weather forecast says the probability of rain tomorrow is 30%.',
  },
]

// Sprint L: Visual Mastery Tracking — same renderers, same challenge specs
// as Sprint G above, just with onMasteryEvent/masteryContext wired to a real
// useVisualMastery() collector so the activation can be observed live.
const MASTERY_DEMO_SPECS: { label: string; concept: string; spec: VisualSpec }[] = [
  { label: 'Graph — hit slope 3, intercept 2', concept: 'linear_equation', spec: { type: 'graph', equation: 'y = x + 1', title: 'Drag to slope=3, intercept=2', interactive: true, challenge: { targetSlope: 3, targetIntercept: 2 } } },
  { label: 'Number line — place a point near 7', concept: 'integer_comparison', spec: { type: 'number_line', start: -10, end: 10, highlight: [2], title: 'Place a point near 7', interactive: true, challenge: { targetValue: 7 } } },
  { label: 'Triangle — area = 20', concept: 'triangle_area', spec: { type: 'geometry', shape: 'triangle', base: 6, height: 4, interactive: true, challenge: { targetArea: 20 } } },
  {
    label: 'Photosynthesis — reorder challenge', concept: 'photosynthesis_sequence',
    spec: { type: 'process_flow', title: 'Photosynthesis', interactive: true, orientation: 'auto', challenge: {}, steps: ['Sunlight', 'Water', 'Carbon Dioxide', 'Glucose', 'Oxygen'].map((title) => ({ title })) },
  },
]

export function VisualDemo() {
  // Initial theme can be set via ?theme=dark (dev convenience for screenshots);
  // the in-page toggle still works for manual checking.
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('theme') === 'dark'
  })
  // Sprint L: Visual Mastery Tracking demo state — collector + a rolling log
  // of the raw signals it received, so the activation can be inspected live.
  const { recordMasteryEvent, summary } = useVisualMastery()
  const [signalLog, setSignalLog] = useState<VisualMasterySignal[]>([])
  const handleMasteryEvent = (signal: VisualMasterySignal) => {
    recordMasteryEvent(signal)
    setSignalLog((prev) => [signal, ...prev].slice(0, 8))
  }
  // Sprint M: manual "persist now" control for the demo — real quiz integrations
  // (Practice/Assessment/MockTestQuiz) call this automatically on completion;
  // this page has no completion event, so it's an explicit button instead.
  const [persistStatus, setPersistStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [viewerRefreshKey, setViewerRefreshKey] = useState(0)
  const handlePersistDemoSummary = async () => {
    setPersistStatus('saving')
    const ok = await persistVisualMasterySummary({
      subjectSlug: 'visual-demo',
      topicSlug: 'sprint-m-demo',
      source: 'learn',
      summary,
    })
    setPersistStatus(ok ? 'saved' : 'failed')
    if (ok) setViewerRefreshKey((k) => k + 1)
  }
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
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint E — Science Flow Engine (manual specs, rendering proof)</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          process_flow via the real ProcessFlowRenderer (through VisualRenderer) — vertical, horizontal, and auto orientation, with and without per-step notes. Automatic detection from real lesson text is demonstrated separately below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {PROCESS_FLOW_SPECS.map(({ label, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer spec={spec} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint E — Automatic science process detection from real lesson text</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Each card runs the real <code>buildVisualSpec()</code> detector against tutor-style text grounded
          in real curriculum science topics (biologyKnowledgeGraph.ts, scienceKnowledgeGraph.ts,
          chemistryKnowledgeGraph.ts, geographyKnowledgeGraph.ts). No VisualSpec is hand-written here.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {SCIENCE_DETECTOR_FIXTURES.map(({ topic, tutorText }) => {
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

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint F — Interactive Learning Layer</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Same renderers, <code>interactive: true</code> opt-in. Drag the graph&apos;s slope/intercept points,
          drag a number-line point, drag a shape&apos;s handles, or reorder the shuffled photosynthesis
          steps with the ▲▼ buttons. All state is local to the component — nothing is saved.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {INTERACTIVE_SPECS.map(({ label, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer spec={spec} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint G — Visual Assessment</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Same renderers, opt-in <code>challenge</code> alongside <code>interactive</code>. Each card states a
          target; dragging toward it flips the feedback line from &ldquo;Target: …&rdquo; to &ldquo;✓ Target
          met: …&rdquo;. All grading is live and client-side — no score is saved anywhere.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {CHALLENGE_SPECS.map(({ label, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer spec={spec} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint J — Fractions, Percentages, Ratios, Coordinate Geometry, Statistics, Probability</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Each card runs the real <code>buildVisualSpec()</code> detector against tutor-style text for
          six newly-covered concept areas. Every visual below is rendered by the same, unmodified
          Graph/Number Line Engine used everywhere else on this page — no new renderer types.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {SPRINT_J_DETECTOR_FIXTURES.map(({ topic, tutorText }) => {
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

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint L — Visual Mastery Tracking</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Same renderers and challenge specs as Sprint G, now wired to a real <code>useVisualMastery()</code> collector
          via the optional <code>onMasteryEvent</code>/<code>masteryContext</code> props. Reach each target below to see
          the emitted signal, the collector&apos;s per-instance state, and the running summary update live. Nothing here
          is persisted or sent to any API — it&apos;s purely in-memory for this page.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16 }}>
          {MASTERY_DEMO_SPECS.map(({ label, concept, spec }) => (
            <section key={label}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualRenderer
                spec={spec}
                onMasteryEvent={handleMasteryEvent}
                masteryContext={{ concept, source: 'learn' }}
              />
            </section>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginTop: 20 }}>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Collector summary (useVisualMastery)</h2>
            <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
              {JSON.stringify(summary, null, 2)}
            </pre>
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Last emitted signals (most recent first)</h2>
            <pre style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', maxHeight: 220, overflow: 'auto' }}>
              {signalLog.length === 0 ? '(no signals yet — interact with a visual above)' : JSON.stringify(signalLog, null, 2)}
            </pre>
          </section>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Sprint M — Visual Mastery Persistence</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Real quiz integrations (Practice/Assessment/MockTestQuiz) call
          <code> persistVisualMasterySummary()</code> automatically once, on quiz completion — summarized
          outcomes only, never per click. This page has no completion event of its own, so the button below
          calls the same function manually with the session summary above. Requires being signed in (the
          persist API is authenticated, same as every other save in this app); sign in first if the viewer
          below shows &ldquo;Unauthorized&rdquo;.
        </p>
        <button
          type="button"
          onClick={handlePersistDemoSummary}
          disabled={persistStatus === 'saving' || Object.keys(summary).length === 0}
          style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'inherit', cursor: 'pointer', fontSize: 13, marginBottom: 16 }}
        >
          {persistStatus === 'saving' ? 'Saving…' : 'Persist current session summary'}
        </button>
        {persistStatus === 'saved' && <span style={{ marginLeft: 10, fontSize: 12, color: '#16a34a' }}>Saved ✓</span>}
        {persistStatus === 'failed' && <span style={{ marginLeft: 10, fontSize: 12, color: '#dc2626' }}>Save failed (are you signed in?)</span>}
        <VisualMasteryViewer key={viewerRefreshKey} />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 1 — Weakness-Based Revision</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Read-only revision profile and recommendations, built from already-persisted
          <code> TopicProgress</code> mastery data and the existing Visual Learning Profile above.
          No new writes, no scoring/grading changes.
        </p>
        <RevisionIntelligenceViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 2 — Targeted Practice Intelligence</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Priority-banded practice targets (high/medium/low), built from the
          <code> RevisionProfile</code> above plus <code>TopicProgress.attempts</code>
          as a read-only escalation signal. No new writes, no curriculum or
          practice-generation changes.
        </p>
        <PracticeTargetsViewer />
      </div>
    </div>
  )
}
