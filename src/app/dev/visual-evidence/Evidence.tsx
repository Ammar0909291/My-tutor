'use client'
/** SEED 77321 COHORT EVIDENCE — learner renderers, real engine payloads. Dev-only. */
import dynamic from 'next/dynamic'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
const SceneSpecFigure = dynamic(() => import('@/components/school/visuals/SceneSpecFigure').then((m) => m.SceneSpecFigure), { ssr: false })
function Case({ id, topic, note, children }: { id: string; topic: string; note: string; children: React.ReactNode }) {
  return (<section data-evidence={id} style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 14, margin: '0 0 2px', color: 'var(--text-primary, #e6edf3)' }}>{topic}</h2>
    <p style={{ fontSize: 11, margin: '0 0 10px', color: 'var(--text-secondary, #8b949e)' }}>{note}</p>
    {children}</section>)
}

const P0 = {"type": "number_line", "start": 0, "end": 14, "highlight": [7], "title": "The pH Scale (0 to 14, Neutral at 7)"} as unknown as VisualSpec
const P1 = {"type": "scene", "id": "chem_state_liquids_properties", "title": "Liquid State Properties: Evaporation and Vapour Pressure", "sceneType": "diagram", "teachingGoal": "Demonstrate how energetic molecules escape the liquid surface during evaporation, creating vapour pressure.", "cameraDistance": 12, "ariaLabel": "3D diagram showing liquid molecules in a container, with some escaping as vapour to demonstrate evaporation and vapour pressure.", "steps": [{"narration": "Liquid molecules are held together by intermolecular forces in a constant state of thermal motion.", "objects": [{"type": "particle", "id": "liq_1", "position": [-1, -2, 0], "color": "#3b82f6", "radius": 0.4}, {"type": "particle", "id": "liq_2", "position": [0, -2, 0.5], "color": "#3b82f6", "radius": 0.4}, {"type": "particle", "id": "liq_3", "position": [1, -1.8, -0.5], "color": "#3b82f6", "radius": 0.4}, {"type": "particle", "id": "liq_4", "position": [-0.5, -1, -0.3], "color": "#3b82f6", "radius": 0.4}, {"type": "particle", "id": "liq_5", "position": [0.5, -1.2, 0.2], "color": "#3b82f6", "radius": 0.4}, {"type": "label", "id": "lbl_liquid", "position": [-2.5, -1.5, 0], "text": "Liquid Phase"}]}, {"narration": "Molecules near the surface with higher kinetic energy overcome attractive forces and evaporate.", "objects": [{"type": "vector", "id": "v_escape", "from": [0, -0.8, 0], "to": [0, 1.5, 0], "color": "#10b981", "thickness": 0.08}, {"type": "particle", "id": "vap_1", "position": [0, 1.8, 0], "color": "#60a5fa", "radius": 0.4}, {"type": "label", "id": "lbl_evap", "position": [0.8, 0.5, 0], "text": "Evaporation"}]}, {"narration": "The accumulation of escaped gas particles above the liquid exerts a vapour pressure.", "objects": [{"type": "particle", "id": "vap_2", "position": [-1.5, 2.2, 0.5], "color": "#60a5fa", "radius": 0.4}, {"type": "particle", "id": "vap_3", "position": [1.5, 2.5, -0.5], "color": "#60a5fa", "radius": 0.4}, {"type": "arrow", "id": "p_down_1", "from": [-1.5, 3.5, 0.5], "to": [-1.5, 2.7, 0.5], "color": "#ef4444", "thickness": 0.05}, {"type": "arrow", "id": "p_down_2", "from": [1.5, 3.8, -0.5], "to": [1.5, 2.9, -0.5], "color": "#ef4444", "thickness": 0.05}, {"type": "label", "id": "lbl_vpressure", "position": [0, 3.5, 0], "text": "Vapour Pressure"}]}]} as unknown as SceneSpec
const P2 = {"type": "process_flow", "title": "Solving Linear Diophantine Equations: ax + by = c", "steps": [{"title": "Check Solvability via GCD"}, {"title": "Find One Particular Solution"}, {"title": "Generate Infinitely Many Solutions"}]} as unknown as VisualSpec

export function Evidence() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <Case id="chem-equil-kw-ph" topic="chem.equil.kw-ph — Water Ionization and pH"
        note="chemistry · runtime-generated · number_line · critic PASS · served">
        <VisualRenderer spec={P0} />
      </Case>
      <Case id="chem-state-liquids" topic="chem.state.liquids — Liquid State Properties"
        note="chemistry · runtime-generated · scene/diagram · critic PASS · served">
        <SceneSpecFigure spec={P1} />
      </Case>
      <Case id="math-nt-linear-diophantine" topic="math.nt.linear-diophantine — Linear Diophantine Equations"
        note="mathematics · runtime-generated · process_flow · critic PASS · served">
        <VisualRenderer spec={P2} />
      </Case>
    </main>
  )
}
