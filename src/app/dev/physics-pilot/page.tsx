import { notFound } from 'next/navigation'
import { SceneSpecFigure } from '@/components/school/visuals/SceneSpecFigure'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'

/**
 * M4 Physics pilot render harness — DEV ONLY.
 *
 * Returns 404 in production, exactly like /dev/visual-demo, and is unlinked
 * from all navigation. It exists so the seven pilot figures can be inspected in
 * a real browser through the REAL SceneSpecFigure renderer without needing a
 * database, a signed-in learner or an AI provider.
 *
 * Resolution happens on the SERVER (resolveVisual reaches the visualization
 * engine, which transitively imports the AI client and its redis dependency —
 * none of which can be bundled for the browser). Only the resolved SceneSpec
 * crosses to the client, which is exactly what happens in a real lesson.
 *
 * Adds no route, component or behaviour to production.
 */
export const metadata = { robots: { index: false, follow: false } }

/**
 * Fixtures, not a topic list. The first seven are the M4 pilot figures, whose
 * text is entirely `label` objects. The last two are added ONLY because they
 * exercise the other two label primitives — `vector` labels through Vector3D
 * and `node` labels through MolecularNode3D — which no M4 figure uses, and
 * which were the two paths that ignored the theme. Without them a browser pass
 * over this page cannot see either path at all.
 */
const PILOT = [
  'phys.opt.total-internal-reflection',
  'phys.wave.transverse-waves',
  'phys.wave.interference',
  'phys.therm.calorimetry',
  'phys.therm.first-law',
  'phys.mech.viscosity',
  'phys.mech.surface-tension',
  'phys.meas.scalars-vectors',   // Vector3D label path
  'chem.bond.vsepr',             // MolecularNode3D label path
  // Added for the interactive-frame pass: these are the concepts whose scenes
  // are PARAMETRIC, so this page is the only place the sliders, the choice
  // controls, the stage stepper and the mode chips can be exercised in a real
  // browser without a database or a signed-in learner. They are also the
  // concepts the visual engine is hardest on — torque, collisions, molecular
  // geometry, electron configuration.
  'phys.mech.torque',
  'phys.mech.collisions-inelastic',
  'chem.atomic.electronic-config',
  'chem.solid.crystal-systems',
] as const

export default function PhysicsPilotPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>M4 — Physics visual authoring pilot</h1>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        Dev-only preview. Each figure is resolved through the production visual
        authority and painted by the production renderer.
      </p>

      {PILOT.map((conceptId) => {
        const decision = resolveVisual({
          message: 'explain with diagram',
          lessonConceptId: conceptId,
          subject: 'physics',
          learnerRequest: 'diagram',
        })
        const spec = decision.payload?.renderer === 'scene' ? decision.payload.sceneSpec : null
        const asset = decision.asset
        return (
          <section
            key={conceptId}
            data-concept={conceptId}
            data-scope={asset?.scope ?? 'none'}
            style={{ marginBottom: 40, border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}
          >
            <h2 style={{ fontSize: 17, margin: '0 0 2px' }}>{asset?.conceptTitle ?? conceptId}</h2>
            <code style={{ fontSize: 12, color: '#6b7280' }}>{conceptId}</code>
            <div style={{ fontSize: 12, color: '#374151', margin: '8px 0 12px' }}>
              scope=<b>{asset?.scope ?? 'none'}</b>{' · '}
              provenance=<b>{asset?.provenance ?? 'none'}</b>{' · '}
              identity=<b>{asset?.identity ?? 'none'}</b>{' · '}
              owner=<b>{asset?.conceptId ?? 'none'}</b>
            </div>
            {spec ? <SceneSpecFigure spec={spec} /> : <p style={{ color: '#dc2626' }}>NO FIGURE</p>}
            <details style={{ marginTop: 12 }}>
              <summary style={{ fontSize: 12, color: '#6b7280', cursor: 'pointer' }}>
                what the tutor is told about this figure
              </summary>
              <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', color: '#374151' }}>
                {buildVisualContractBlock(decision).trim()}
              </pre>
            </details>
          </section>
        )
      })}
    </main>
  )
}
