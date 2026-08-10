'use client'

/**
 * VISUAL EVIDENCE — the learner's own renderers, the engine's own payloads.
 *
 * This page adds NO rendering code. It mounts the three components
 * `LessonScreen` mounts — `VisualRenderer` for a VisualSpec and
 * `SceneSpecFigure` for a SceneSpec — with payloads copied verbatim from what
 * the engine produced in a real run. If a figure reads badly here it reads
 * badly in a lesson, because it is the same component drawing the same data.
 *
 * It exists because production is behind authentication and cannot be
 * screenshotted from this environment, and because a screenshot of a
 * hand-built mock proves nothing about the product.
 *
 * Dev-only: the route 404s in production.
 */

import dynamic from 'next/dynamic'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const SceneSpecFigure = dynamic(
  () => import('@/components/school/visuals/SceneSpecFigure').then((m) => m.SceneSpecFigure),
  { ssr: false },
)

/** phys.mech.kinetic-energy — KG concept, generated this session, served. */
const KG_GRAPH: VisualSpec = {
  type: 'graph',
  equation: '0.5 * 2 * x^2',
  title: 'Kinetic Energy as a Function of Velocity (m = 2 kg)',
} as VisualSpec

/** topic:7e1bc769a989f449 — NO KG node. Grounded only by the learner's words. */
const NON_KG_FLOW: VisualSpec = {
  type: 'process_flow',
  title: 'Kubernetes Pod Scheduling Lifecycle',
  steps: [
    { title: 'Pod Creation Request' },
    { title: 'Filtering Nodes (Predicates)' },
    { title: 'Scoring Nodes (Priorities)' },
    { title: 'Binding Pod to Best Node' },
  ],
} as VisualSpec

/** chem.found.stoichiometry — KG concept, generated this session, served. */
const KG_FLOW: VisualSpec = {
  type: 'process_flow',
  title: 'Stoichiometric Calculation Steps',
  steps: [
    { title: 'Write and balance equation' },
    { title: 'Convert given mass to moles' },
    { title: 'Apply mole ratio from coefficients' },
    { title: 'Calculate yield or final mass' },
  ],
} as VisualSpec

/** bio.found.viruses-viroids-lichens — read back from the ACTIVE production asset. */
const SCENE: SceneSpec = {
  id: 'bio.found.viruses-viroids-lichens',
  title: 'Viruses, Viroids, and Lichens',
  sceneType: 'diagram',
  teachingGoal: 'Compare the structures of a typical virus, a viroid, and a lichen symbiosis.',
  cameraDistance: 14,
  ariaLabel:
    'A 3D educational diagram illustrating a virus with capsid and genome, a naked viroid RNA, and a lichen mutualistic association.',
  steps: [
    {
      narration: 'A typical virus consists of a protein capsid protecting its genetic material, either DNA or RNA.',
      objects: [
        { id: 'capsid', type: 'node', text: 'Protein Capsid', color: '#3b82f6', radius: 1.2, position: [-3, 0, 0] },
        { id: 'viral_genome', type: 'path', color: '#ef4444', thickness: 0.1,
          points: [[-3.5, 0, 0], [-3.2, 0.3, 0], [-2.8, -0.3, 0], [-2.5, 0, 0]] },
        { id: 'virus_label', type: 'label', text: 'Typical Virus (Acellular)', position: [-3, -2, 0] },
      ],
    },
    {
      narration: 'Viroids are even simpler infectious agents consisting solely of a naked, single-stranded circular RNA molecule without a protein coat.',
      objects: [
        { id: 'viroid_rna', type: 'path', color: '#10b981', thickness: 0.12,
          points: [[0, 0.8, 0], [0.6, 0.4, 0], [0.6, -0.4, 0], [0, -0.8, 0], [-0.6, -0.4, 0], [-0.6, 0.4, 0], [0, 0.8, 0]] },
        { id: 'viroid_label', type: 'label', text: 'Viroid (Naked RNA)', position: [0, -2, 0] },
      ],
    },
    {
      narration: 'Lichens represent a symbiotic mutualism between a fungal partner and a photosynthetic algal or cyanobacterial partner.',
      objects: [
        { id: 'fungus_partner', type: 'node', text: 'Fungal Mycobiont', color: '#8b5cf6', radius: 1, position: [3, 0.5, 0] },
        { id: 'algal_partner', type: 'node', text: 'Algal Phycobiont', color: '#84cc16', radius: 0.7, position: [3, -0.8, 0] },
        { id: 'symbiosis_link', type: 'bond', from: [3, 0.2, 0], to: [3, -0.4, 0], color: '#d97706', thickness: 0.08 },
        { id: 'lichen_label', type: 'label', text: 'Lichen (Symbiotic Association)', position: [3, -2.2, 0] },
      ],
    },
  ],
} as SceneSpec

function Case({ id, topic, note, children }: {
  id: string; topic: string; note: string; children: React.ReactNode
}) {
  return (
    <section data-evidence={id} style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 15, margin: '0 0 2px', color: 'var(--text-primary, #e6edf3)' }}>{topic}</h2>
      <p style={{ fontSize: 12, margin: '0 0 10px', color: 'var(--text-secondary, #8b949e)' }}>{note}</p>
      {children}
    </section>
  )
}

export function Evidence() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <Case id="kg-graph" topic="phys.mech.kinetic-energy — KG concept"
        note="Generated at runtime, critic PASS, served. Renderer: VisualRenderer (graph).">
        <VisualRenderer spec={KG_GRAPH} />
      </Case>

      <Case id="non-kg-flow" topic="Kubernetes Pod Scheduling — NO KG node"
        note="topic:7e1bc769a989f449. Grounded only by the learner's own sentence. Renderer: VisualRenderer (process_flow).">
        <VisualRenderer spec={NON_KG_FLOW} />
      </Case>

      <Case id="kg-flow" topic="chem.found.stoichiometry — KG concept"
        note="Generated at runtime, critic PASS, served. Renderer: VisualRenderer (process_flow).">
        <VisualRenderer spec={KG_FLOW} />
      </Case>

      <Case id="scene" topic="bio.found.viruses-viroids-lichens — 3D scene"
        note="Read back from the ACTIVE production asset. Renderer: SceneSpecFigure (three.js).">
        <SceneSpecFigure spec={SCENE} />
      </Case>
    </main>
  )
}
