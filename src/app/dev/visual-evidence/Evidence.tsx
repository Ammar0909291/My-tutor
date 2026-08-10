'use client'
/**
 * STRESS-COHORT EVIDENCE — the learner's own renderers, payloads produced by
 * the real engine during the seeded 30-topic run (seed 20260810).
 * Dev-only; 404s in production. No rendering code of its own.
 */
import dynamic from 'next/dynamic'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const SceneSpecFigure = dynamic(
  () => import('@/components/school/visuals/SceneSpecFigure').then((m) => m.SceneSpecFigure),
  { ssr: false },
)

function Case({ id, topic, note, children }: { id: string; topic: string; note: string; children: React.ReactNode }) {
  return (
    <section data-evidence={id} style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 14, margin: '0 0 2px', color: 'var(--text-primary, #e6edf3)' }}>{topic}</h2>
      <p style={{ fontSize: 11, margin: '0 0 10px', color: 'var(--text-secondary, #8b949e)' }}>{note}</p>
      {children}
    </section>
  )
}

const P0 = {"type": "scene", "id": "generalized-coordinates-config-space", "title": "Configuration Space and Generalized Coordinates", "sceneType": "diagram", "teachingGoal": "Demonstrate how a constrained mechanical system is described by a minimal set of independent generalized coordinates.", "cameraDistance": 12, "ariaLabel": "A 3D diagram showing a double pendulum system constrained in a plane, parameterized by generalized coordinates theta 1 and theta 2.", "steps": [{"narration": "Consider a double pendulum moving in a 2D plane, consisting of two point masses connected by rigid rods.", "objects": [{"type": "particle", "id": "origin", "position": [0, 0, 0], "radius": 0.15, "color": "#333333"}, {"type": "label", "id": "origin_label", "position": [0, 0.4, 0], "text": "Pivot (0,0)"}, {"type": "particle", "id": "mass1", "position": [2, -2, 0], "radius": 0.2, "color": "#2563eb"}, {"type": "label", "id": "m1_label", "position": [2.3, -2, 0], "text": "m\u2081"}, {"type": "bond", "id": "rod1", "from": [0, 0, 0], "to": [2, -2, 0], "thickness": 0.05, "color": "#64748b"}, {"type": "particle", "id": "mass2", "position": [4, -3, 0], "radius": 0.2, "color": "#dc2626"}, {"type": "label", "id": "m2_label", "position": [4.3, -3, 0], "text": "m\u2082"}, {"type": "bond", "id": "rod2", "from": [2, -2, 0], "to": [4, -3, 0], "thickness": 0.05, "color": "#64748b"}]}, {"narration": "While the system uses four Cartesian coordinates (x\u2081, y\u2081, x\u2082, y\u2082), the rigid rod constraints reduce the degrees of freedom to just two.", "objects": [{"type": "path", "id": "constraint_note", "points": [[-3, 3, 0], [3, 3, 0]], "color": "#94a3b8"}, {"type": "label", "id": "constraints_text", "position": [0, 3.5, 0], "text": "Holonomic Constraints: x\u2081\u00b2 + y\u2081\u00b2 = L\u2081\u00b2, (x\u2082-x\u2081)\u00b2 + (y\u2082-y\u2081)\u00b2 = L\u2082\u00b2"}]}, {"narration": "We parameterize the configuration space entirely using independent generalized coordinates: angle \u03b8\u2081 and angle \u03b8\u2082.", "objects": [{"type": "vector", "id": "angle1_arc", "from": [0, -1, 0], "to": [1, -1, 0], "color": "#16a34a", "thickness": 0.03}, {"type": "label", "id": "q1_label", "position": [1.2, -0.8, 0], "text": "q\u2081 = \u03b8\u2081"}, {"type": "vector", "id": "angle2_arc", "from": [2, -2.5, 0], "to": [2.8, -2.5, 0], "color": "#16a34a", "thickness": 0.03}, {"type": "label", "id": "q2_label", "position": [3.1, -2.3, 0], "text": "q\u2082 = \u03b8\u2082"}, {"type": "label", "id": "dof_summary", "position": [0, -4.5, 0], "text": "2 Degrees of Freedom = 2 Generalized Coordinates"}]}]} as unknown as SceneSpec
const P1 = {"type": "process_flow", "title": "Reactivity Trend of Alkali Metals", "steps": [{"title": "Increase in atomic radius down the group"}, {"title": "Decreased nuclear attraction on valence electron"}, {"title": "Greater ease of losing the single s-electron"}, {"title": "Increased vigour of reaction with water and oxygen"}]} as unknown as VisualSpec
const P2 = {"type": "process_flow", "title": "Constructing the Lebesgue Integral for f \u2265 0", "steps": [{"title": "Deconstruct the range into vertical slices"}, {"title": "Approximate f from below with simple functions \u03c6"}, {"title": "Integrate each simple function \u03c6 by measure of its slices"}, {"title": "Take the supremum over all valid simple functions \u03c6"}]} as unknown as VisualSpec
const P3 = {"type": "graph", "equation": "x^2", "title": "Numerical Differentiation: Tangent vs Secant Approximations"} as unknown as VisualSpec

export function Evidence() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <Case id="phys-mech-generalized-coordinates" topic="phys.mech.generalized-coordinates — Generalized Coordinates and Configuration Space"
        note="physics · runtime-generated · scene/diagram · critic PASS · served">
        <SceneSpecFigure spec={P0} />
      </Case>
      <Case id="chem-sblock-alkali" topic="chem.sblock.alkali — Alkali Metals"
        note="chemistry · runtime-generated · process_flow · critic PASS · served">
        <VisualRenderer spec={P1} />
      </Case>
      <Case id="math-meas-lebesgue-integral" topic="math.meas.lebesgue-integral — Lebesgue Integral"
        note="mathematics · runtime-generated · process_flow · critic PASS · served">
        <VisualRenderer spec={P2} />
      </Case>
      <Case id="math-num-numerical-differentiation" topic="math.num.numerical-differentiation — Numerical Differentiation"
        note="mathematics · runtime-generated · graph · critic PASS · served">
        <VisualRenderer spec={P3} />
      </Case>
    </main>
  )
}
