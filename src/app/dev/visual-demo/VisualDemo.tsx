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
import { QuantumVisualChallenge } from '@/components/visuals/QuantumVisualChallenge'
import { QUANTUM_MASTERY_CHALLENGES } from '@/lib/visuals/quantumMasteryChallenges'
import type { VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { persistVisualMasterySummary } from '@/lib/visuals/visualMasteryPersistence'
import { VisualMasteryViewer } from '@/components/visuals/VisualMasteryViewer'
import { RevisionIntelligenceViewer } from '@/components/intelligence/RevisionIntelligenceViewer'
import { PracticeTargetsViewer } from '@/components/intelligence/PracticeTargetsViewer'
import { RetestIntelligenceViewer } from '@/components/intelligence/RetestIntelligenceViewer'
import { ImprovementTrackingViewer } from '@/components/intelligence/ImprovementTrackingViewer'
import { LearningDifficultyViewer } from '@/components/intelligence/LearningDifficultyViewer'
import { TeachingPlanViewer } from '@/components/intelligence/TeachingPlanViewer'
import { AdaptationEffectivenessViewer } from '@/components/intelligence/AdaptationEffectivenessViewer'
import { MethodEffectivenessViewer } from '@/components/intelligence/MethodEffectivenessViewer'
import { WeightedTeachingPlanViewer } from '@/components/intelligence/WeightedTeachingPlanViewer'
import { TeachingStyleViewer } from '@/components/intelligence/TeachingStyleViewer'
import { TutorVisualSyncViewer } from '@/components/school/visuals/TutorVisualSyncViewer'
import { NarrationDrivenPlaybackViewer } from '@/components/school/visuals/NarrationDrivenPlaybackViewer'
import { LiveNarrationPlaybackViewer } from '@/components/school/visuals/LiveNarrationPlaybackViewer'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { QuantumTunnelingInteractive3D } from '@/components/school/visuals/QuantumTunnelingInteractive3D'
import { BlochSphereInteractive3D } from '@/components/school/visuals/BlochSphereInteractive3D'
import { DoubleSlitInteractive3D } from '@/components/school/visuals/DoubleSlitInteractive3D'
import { HydrogenOrbitalInteractive3D } from '@/components/school/visuals/HydrogenOrbitalInteractive3D'
import { GuidedSimulationMode } from '@/components/school/visuals/GuidedSimulationMode'
import { ProjectileMotionInteractive3D } from '@/components/school/visuals/ProjectileMotionInteractive3D'
import { NewtonForcesInteractive3D } from '@/components/school/visuals/NewtonForcesInteractive3D'
import { MomentumCollisionInteractive3D } from '@/components/school/visuals/MomentumCollisionInteractive3D'
import { CircularMotionInteractive3D } from '@/components/school/visuals/CircularMotionInteractive3D'
import { PendulumInteractive3D } from '@/components/school/visuals/PendulumInteractive3D'

// Sprint R.1 — Animated Teaching Engine. Each VisualCard below now builds itself
// up step-by-step (autoplay) with Play / Pause / Replay / speed controls, instead
// of rendering the finished diagram instantly. These are the real production
// VisualCard components (the path /api/learn/chat → LessonScreen uses).
const ANIMATED_TEACHING_DEMOS: { label: string; type: VisualType }[] = [
  { label: 'Coordinate plane (graph)', type: 'coordinate_plane' },
  { label: 'Geometry — triangle / rectangle / circle', type: 'geometry_shape' },
  { label: 'Number line', type: 'number_line' },
  { label: 'Fraction bars', type: 'fraction_bar' },
  { label: 'Percentage grid', type: 'percentage_grid' },
  { label: 'Food chain (photosynthesis / energy flow)', type: 'food_chain' },
  { label: 'Water cycle', type: 'water_cycle' },
  { label: 'Solar system', type: 'solar_system' },
  { label: 'Force diagram', type: 'force_diagram' },
  { label: 'Circuit diagram', type: 'circuit_diagram' },
]

// Quantum Physics — Visual Expansion Sprint Phase 1. The five production
// VisualCard quantum visuals, each animating step-by-step via the same Sprint
// R.1 engine + Sprint S/T/U narration infrastructure (unchanged).
// 3D Educational Engine Foundation Sprint 1. New engine-level VisualTypes
// (not subject visuals) rendered through the same production VisualCard,
// switch dispatch, VISUAL_STEP_COUNTS, and revealStep/narration contract as
// every SVG visual above — proves the React Three Fiber wrapper (ThreeDVisual)
// plugs into the existing playback engine with zero changes to it.
const THREE_D_ENGINE_DEMOS: { label: string; type: VisualType }[] = [
  { label: '3D Particle System (production demo)', type: 'three_particle_system' },
  { label: '3D Wave Simulation (foundation placeholder)', type: 'three_wave_simulation' },
  { label: '3D Field Visualization (foundation placeholder)', type: 'three_field_visualization' },
  { label: '3D Structure Visualization (foundation placeholder)', type: 'three_structure_visualization' },
]

// 3D Quantum Simulations Phase 1. Five production quantum simulations built on
// the Universal 3D Engine (ThreeDVisual wrapper), each revealStep-gated and
// rendered through the same production VisualCard / playback / narration stack
// as every 2D and 3D visual above — no new engine, no new narration code.
const QUANTUM_3D_DEMOS: { label: string; type: VisualType }[] = [
  { label: '3D Double-slit experiment', type: 'three_double_slit' },
  { label: '3D Quantum tunneling', type: 'three_quantum_tunneling' },
  { label: '3D Bloch sphere', type: 'three_bloch_sphere' },
  { label: '3D Stern–Gerlach experiment', type: 'three_stern_gerlach' },
  { label: '3D Hydrogen orbital explorer', type: 'three_hydrogen_orbital' },
]

// Classical Mechanics 3D Foundation Sprint. Five production mechanics
// simulations built on the Universal 3D Engine (ThreeDVisual wrapper) plus the
// new generic Vector3D/ForceArrow3D primitives, each revealStep-gated and
// rendered through the same production VisualCard / playback / narration
// stack as every quantum 3D visual above — no new engine, no new narration code.
const MECHANICS_3D_DEMOS: { label: string; type: VisualType }[] = [
  { label: 'Projectile motion', type: 'three_projectile_motion' },
  { label: "Newton's forces", type: 'three_newton_forces' },
  { label: 'Momentum collision', type: 'three_momentum_collision' },
  { label: 'Circular motion', type: 'three_circular_motion' },
  { label: 'Pendulum motion', type: 'three_pendulum_motion' },
]

const QUANTUM_VISUAL_DEMOS: { label: string; type: VisualType }[] = [
  { label: 'Double-slit experiment', type: 'double_slit' },
  { label: 'Wave function ψ(x) & |ψ(x)|²', type: 'wave_function' },
  { label: 'Quantum potential well', type: 'potential_well' },
  { label: 'Quantum tunneling', type: 'quantum_tunneling' },
  { label: 'Bloch sphere (qubit)', type: 'bloch_sphere' },
  // Phase 2
  { label: 'Energy level diagram', type: 'energy_level_diagram' },
  { label: 'Quantum circuit', type: 'quantum_circuit' },
  { label: 'Stern–Gerlach experiment', type: 'stern_gerlach' },
  { label: 'Entangled pair', type: 'entanglement_pair' },
]

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

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '24px 0 4px' }}>Sprint R.1 — Animated Teaching Engine</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The production <code>VisualCard</code> components, now drawing themselves step-by-step
          (autoplay) like a teacher at a whiteboard, with Play / Pause / Replay and a 0.5×–1.5×
          speed selector. Final state matches the previous static diagram exactly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {ANIMATED_TEACHING_DEMOS.map(({ label, type }) => (
            <section key={type}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualCard type={type} autoPlay speed={1} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Quantum Physics — Visual Expansion (Phase 1 & 2)</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The nine quantum visuals, rendered by the same production <code>VisualCard</code>
          (step-by-step autoplay, Play / Pause / Replay, 0.5×–1.5× speed). They reuse the Sprint R.1
          animation engine and the Sprint S/T/U narration-sync infrastructure unchanged — no new
          renderer base, no new playback engine.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {QUANTUM_VISUAL_DEMOS.map(({ label, type }) => (
            <section key={type}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualCard type={type} autoPlay speed={1} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>3D Educational Engine Foundation</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Foundation Sprint 1: a reusable React Three Fiber engine plugged into the existing
          <code> VisualCard</code> ecosystem — same switch dispatch, <code>VISUAL_STEP_COUNTS</code>,
          revealStep, narration sync, and Play / Pause / Replay / speed controls as every SVG visual
          above. <code>ParticleSystem3D</code> is the first production demo (particles → movement →
          interactions → highlighted particle → completed simulation); the other three engine types
          are registered foundation placeholders for a future sprint.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {THREE_D_ENGINE_DEMOS.map(({ label, type }) => (
            <section key={type}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualCard type={type} autoPlay speed={1} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Quantum Physics 3D Simulations</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Phase 1: five production quantum simulations built on the Universal 3D Engine
          (<code>ThreeDVisual</code> wrapper, React Three Fiber). Each is revealStep-gated and rendered
          by the same production <code>VisualCard</code> — Play / Pause / Replay, 0.5×–1.5× speed, and
          narration mode all work unchanged. Double-slit, quantum tunneling (counters the
          “borrowed energy” misconception), Bloch sphere (superposition + phase), Stern–Gerlach (spin
          quantization), and the hydrogen orbital explorer (counters the “planetary orbit” misconception).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {QUANTUM_3D_DEMOS.map(({ label, type }) => (
            <section key={type}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualCard type={type} autoPlay speed={1} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Classical Mechanics 3D Foundation</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The first production 3D package for Classical Mechanics: five revealStep-gated
          simulations (Projectile Motion, Newton&apos;s Forces, Momentum Collision, Circular Motion,
          Pendulum Motion) built on the unmodified <code>ThreeDVisual</code> host, using the new
          generic <code>Vector3D</code>/<code>ForceArrow3D</code> primitives. Rendered by the same
          production <code>VisualCard</code> — Play / Pause / Replay, 0.5×–1.5× speed, and narration
          mode all work unchanged.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {MECHANICS_3D_DEMOS.map(({ label, type }) => (
            <section key={type}>
              <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{label}</h2>
              <VisualCard type={type} autoPlay speed={1} />
            </section>
          ))}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Classical Mechanics Interactive Simulations</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Classical Mechanics Interactive Layer Sprint: live, student-controlled versions of all
          five Classical Mechanics 3D Foundation simulations, built additively on the same
          <code> ThreeDVisual</code> host plus the shared, generic <code>SimulationControlPanel</code>
          and <code>GuidedSimulationMode</code> — identical infrastructure to the Quantum Interactive
          layer below, just new subject content. Each is wrapped in a guided step-through script and
          wired to the same mastery collector via <code>onMasteryEvent</code>/<code>masteryContext</code>.
          The original revealStep-gated <code>ProjectileMotion3D</code>/<code>NewtonForces3D</code>/
          <code>MomentumCollision3D</code>/<code>CircularMotion3D</code>/<code>PendulumMotion3D</code>
          above are unmodified.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Projectile motion — guided + interactive</h2>
            <GuidedSimulationMode
              steps={[
                { instruction: 'Increase the launch angle and watch how the trajectory shape changes.', highlightedControlId: 'angle' },
                { instruction: 'Now increase the launch velocity and observe the range grow.', highlightedControlId: 'velocity' },
                { instruction: 'Compare trajectories under different gravity presets — same launch, very different range.', highlightedControlId: 'gravity' },
              ]}
            >
              {({ highlightedControlId }) => (
                <ProjectileMotionInteractive3D
                  highlightedControlId={highlightedControlId}
                  onMasteryEvent={handleMasteryEvent}
                  masteryContext={{ concept: 'projectile_motion_range', source: 'learn', subjectSlug: 'classical_mechanics', topicSlug: 'projectile_motion' }}
                />
              )}
            </GuidedSimulationMode>
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Newton&apos;s forces — guided + interactive</h2>
            <GuidedSimulationMode
              steps={[
                { instruction: 'Increase the object mass and watch the gravity (weight) vector grow.', highlightedControlId: 'mass' },
                { instruction: 'Now increase the friction coefficient and observe the friction vector grow.', highlightedControlId: 'friction' },
                { instruction: 'Notice the vertical forces always stay balanced — the normal force matches gravity exactly.', highlightedControlId: 'gravity' },
              ]}
            >
              {({ highlightedControlId }) => (
                <NewtonForcesInteractive3D
                  highlightedControlId={highlightedControlId}
                  onMasteryEvent={handleMasteryEvent}
                  masteryContext={{ concept: 'newton_forces_balance', source: 'learn', subjectSlug: 'classical_mechanics', topicSlug: 'newton_forces' }}
                />
              )}
            </GuidedSimulationMode>
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Momentum collision — guided + interactive</h2>
            <GuidedSimulationMode
              steps={[
                { instruction: 'Try equal masses with opposite velocities and see how they exchange velocities.', highlightedControlId: 'massA' },
                { instruction: 'Now make mass A much larger than mass B and observe the difference.', highlightedControlId: 'massB' },
                { instruction: 'Adjust the velocities and watch total momentum stay conserved before and after.', highlightedControlId: 'velocityA' },
              ]}
            >
              {({ highlightedControlId }) => (
                <MomentumCollisionInteractive3D
                  highlightedControlId={highlightedControlId}
                  onMasteryEvent={handleMasteryEvent}
                  masteryContext={{ concept: 'momentum_conservation', source: 'learn', subjectSlug: 'classical_mechanics', topicSlug: 'momentum_collision' }}
                />
              )}
            </GuidedSimulationMode>
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Circular motion — guided + interactive</h2>
            <GuidedSimulationMode
              steps={[
                { instruction: 'Increase the radius and watch the velocity vector grow.', highlightedControlId: 'radius' },
                { instruction: 'Now increase the angular velocity and observe the centripetal force grow much faster.', highlightedControlId: 'omega' },
                { instruction: 'Increase the mass and see how the same motion now requires more centripetal force.', highlightedControlId: 'mass' },
              ]}
            >
              {({ highlightedControlId }) => (
                <CircularMotionInteractive3D
                  highlightedControlId={highlightedControlId}
                  onMasteryEvent={handleMasteryEvent}
                  masteryContext={{ concept: 'circular_motion_centripetal_force', source: 'learn', subjectSlug: 'classical_mechanics', topicSlug: 'circular_motion' }}
                />
              )}
            </GuidedSimulationMode>
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Pendulum — guided + interactive</h2>
            <GuidedSimulationMode
              steps={[
                { instruction: 'Increase the string length and watch the period grow longer.', highlightedControlId: 'length' },
                { instruction: 'Change the starting angle — notice the period barely changes for small swings.', highlightedControlId: 'startAngle' },
                { instruction: 'Switch gravity presets and observe how period depends on gravity.', highlightedControlId: 'gravity' },
              ]}
            >
              {({ highlightedControlId }) => (
                <PendulumInteractive3D
                  highlightedControlId={highlightedControlId}
                  onMasteryEvent={handleMasteryEvent}
                  masteryContext={{ concept: 'pendulum_period', source: 'learn', subjectSlug: 'classical_mechanics', topicSlug: 'pendulum_motion' }}
                />
              )}
            </GuidedSimulationMode>
          </section>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Interactive Quantum Simulations</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          3D Interactive Simulation Layer Phase 1 &amp; 2: live, student-controlled versions of four of
          the quantum simulations above, built additively on the same <code>ThreeDVisual</code> host
          plus a shared, generic <code>SimulationControlPanel</code> (sliders/dropdowns/reset). These
          are student-driven (local state), not <code>revealStep</code>/narration-driven, so they are
          rendered as standalone components here rather than through <code>VisualCard</code>. The
          original revealStep-gated <code>QuantumTunneling3D</code>/<code>BlochSphere3D</code>/
          <code>DoubleSlit3D</code>/<code>HydrogenOrbital3D</code> above are unmodified.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Quantum tunneling — interactive</h2>
            <QuantumTunnelingInteractive3D />
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Bloch sphere — interactive</h2>
            <BlochSphereInteractive3D />
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Double slit — interactive</h2>
            <DoubleSlitInteractive3D />
          </section>
          <section>
            <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Hydrogen orbitals — interactive</h2>
            <HydrogenOrbitalInteractive3D />
          </section>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Guided Simulation Mode</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Phase 2, Task 3: a generic step-through wrapper (<code>GuidedSimulationMode</code>) around
          an interactive simulation — instruction banner, Next / Previous / Reset, and a highlighted
          control per step (reusing <code>SimulationControlPanel</code>&apos;s existing
          <code> highlightedControlId</code> prop). Local step-index state, same paradigm as
          <code> revealStep</code> — no new narration architecture.
        </p>
        <div style={{ maxWidth: 360, marginTop: 16, marginBottom: 24 }}>
          <GuidedSimulationMode
            steps={[
              { instruction: 'First, raise the barrier height and watch the transmission probability drop.', highlightedControlId: 'height' },
              { instruction: 'Now widen the barrier — a thicker barrier is even harder to tunnel through.', highlightedControlId: 'width' },
              { instruction: 'Finally, raise the particle energy — probability rises, but the barrier height never changes.', highlightedControlId: 'energy' },
            ]}
          >
            {({ highlightedControlId }) => <QuantumTunnelingInteractive3D highlightedControlId={highlightedControlId} />}
          </GuidedSimulationMode>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Quantum Physics — Visual Mastery Challenges</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The 5 highest-value quantum visuals paired with multiple-choice mastery challenges. Reuses
          the existing <code>VisualCard</code> renderers unchanged plus the existing
          <code> createMasteryEmitter</code>/<code>useVisualMastery</code> pipeline
          (<code>visualType: &apos;quantum_interactive&apos;</code>) — same collector as below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 16, marginBottom: 24 }}>
          {QUANTUM_MASTERY_CHALLENGES.map((c) => (
            <section key={c.id}>
              <QuantumVisualChallenge
                challenge={c}
                onMasteryEvent={recordMasteryEvent}
                masteryContext={{ source: 'learn', subjectSlug: 'quantum_physics', topicSlug: c.concept }}
              />
            </section>
          ))}
        </div>

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

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 3 — Retest Intelligence</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Priority-banded retest candidates, built directly from the
          <code> PracticeTargetPlan</code> above — each target&apos;s existing
          priority becomes its retest priority. No new mastery system, no
          new writes, no grading or assessment-generation changes.
        </p>
        <RetestIntelligenceViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 4 — Improvement Tracking</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Compares the earliest and latest persisted score per topic
          (<code>PracticeSession</code>) and visual area
          (<code>EvidenceRecord</code>) to classify improving / stable /
          declining trends. No new mastery system, no writes, no
          grading changes.
        </p>
        <ImprovementTrackingViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 4 — Learning Difficulty Intelligence</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Read-only detection of WHEN a learner is struggling, built from already-persisted
          <code> TopicProgress</code> (mastery / attempts / revisions) plus the Sprint 1
          <code> RevisionProfile</code> and Sprint 3 retest flags. Classifies each topic
          LOW / MEDIUM / HIGH and lists advisory teaching adaptations. No mastery system,
          no writes, no grading / XP / curriculum / Tutor Max changes. Detection only —
          this sprint does not act on the difficulty.
        </p>
        <LearningDifficultyViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 5 — Adaptive Teaching Plan Engine</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Decides HOW each struggling topic should be taught by synthesizing Sprints 1–4 into a
          per-topic <code>TeachingPlan</code> (recommended methods, practice intensity, revision
          &amp; retest priority). Pure synthesis of existing outputs — no new analysis, no writes,
          no Tutor Max / curriculum / grading / XP changes. The plan is consumed nowhere yet.
        </p>
        <TeachingPlanViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 7 — Adaptation Effectiveness Engine</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Measures whether the adaptive teaching system (Sprints 5/6) is actually helping, by joining
          the before→after mastery signal (Sprint 4-Improvement) with the teaching methods each topic
          received (Sprint 5). Classifies HIGH / MEDIUM / LOW / REGRESSION and surfaces per-method
          insights. Measurement only — read-only, no writes, no teaching-plan / Tutor Max / curriculum
          / grading / XP changes.
        </p>
        <AdaptationEffectivenessViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 8 — Teaching Method Effectiveness Intelligence</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Ranks teaching methods by observed learner improvement, by re-aggregating the Sprint 7
          per-topic effectiveness BY METHOD. Surfaces strongest/weakest methods and per-method
          insights. Intelligence only — read-only, no new measurement, no teaching-plan / Tutor Max /
          curriculum / grading / XP changes.
        </p>
        <MethodEffectivenessViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 9 — Personalized Teaching Plan Weighting</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Reorders each Teaching Plan&apos;s methods to prefer those proven effective for this learner
          (Sprint 8) and de-emphasize weak ones — ordering only, no methods added or removed, difficulty
          logic intact. Read-only: shows original vs weighted order; does not modify Tutor Max,
          curriculum, XP, grading, or Sprints 1–8.
        </p>
        <WeightedTeachingPlanViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Educational Intelligence Sprint 11 — Teaching Style Transparency</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Exposes and explains the teaching style Tutor Max is already using — the active
          (weighted-ordered) methods for the learner&apos;s most relevant struggling topic, plus a
          plain-English &ldquo;why&rdquo;. Visibility only — read-only, no new intelligence, no
          adaptation, no Tutor Max / curriculum / grading / XP changes.
        </p>
        <TeachingStyleViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Visual Learning Sprint S — Tutor ↔ Visual Synchronization</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Synchronization infrastructure (dev-only). Each visual drives the real playback engine with
          the new optional <code>onStepChange</code>; the active narration segment is highlighted live
          as the animation reaches each step. Sample narration is developer-authored, not AI-generated.
          No live tutor behavior change — Sprint R/R.1 animation is unchanged.
        </p>
        <TutorVisualSyncViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Visual Learning Sprint T — Narration-Driven Playback</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The visual advances when narration advances, not by a timer. Use Next / Previous / Reset to
          step the narration; the animation follows via <code>useTeachingPlayback</code> in
          &ldquo;narration&rdquo; mode. Timer mode elsewhere is unchanged. No live tutor / AI / curriculum
          changes — playback control infrastructure only.
        </p>
        <NarrationDrivenPlaybackViewer />

        <h1 style={{ fontSize: 20, fontWeight: 800, margin: '32px 0 4px' }}>Visual Learning Sprint U — Live Narration → Visual Playback</h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          The real production <code>VisualCard</code> driven by real lesson narration via narration
          mode (Next / Previous / Reset). Visual progression follows the narration segment, not a timer.
          In production, when no live narration step is supplied, VisualCard falls back to timer mode
          (identical to Sprint R.1) — zero regression. No Tutor Max / AI / curriculum changes.
        </p>
        <LiveNarrationPlaybackViewer />
      </div>
    </div>
  )
}
