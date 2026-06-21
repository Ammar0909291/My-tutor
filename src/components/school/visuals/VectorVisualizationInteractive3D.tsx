'use client'
/**
 * VectorVisualizationInteractive3D — Mathematics Interactive Layer Sprint, Task 3.
 * Additive: live controls (vector X, Y, Z) drive the vector arrow, its
 * magnitude readout, direction-component arrows, and a breakdown summary.
 * Does not modify VectorVisualization3D.tsx.
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const ORIGIN: [number, number, number] = [0, 0, 0]

function Scene({ vx, vy, vz }: { vx: number; vy: number; vz: number }) {
  const tip: [number, number, number] = [vx, vy, vz]
  const magnitude = Math.sqrt(vx * vx + vy * vy + vz * vz)
  return (
    <group>
      <mesh position={ORIGIN}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#9AA5B8" />
      </mesh>
      <Vector3D start={ORIGIN} end={tip} color="#5B8DEF" label="v" />
      <Vector3D start={ORIGIN} end={[vx, 0, 0]} color="#FF6B6B" thickness={0.02} label="x" />
      <Vector3D start={ORIGIN} end={[0, vy, 0]} color="#81C784" thickness={0.02} label="y" />
      <Vector3D start={ORIGIN} end={[0, 0, vz]} color="#4DD0E1" thickness={0.02} label="z" />
      <Html position={[tip[0] / 2, tip[1] / 2 + 0.3, tip[2] / 2]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#FFB74D', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
          |v| = {magnitude.toFixed(2)}
        </span>
      </Html>
    </group>
  )
}

interface VectorVisualizationInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function VectorVisualizationInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: VectorVisualizationInteractive3DProps = {}) {
  const [vx, setVx] = useState(2.5)
  const [vy, setVy] = useState(1.8)
  const [vz, setVz] = useState(1.2)
  const touched = useMemo(() => new Set<string>(), [])

  const magnitude = Math.sqrt(vx * vx + vy * vy + vz * vz)

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'vector_magnitude_direction',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'vx', label: 'Vector X', min: -3, max: 3, step: 0.1, value: vx, onChange: handleChange('vx', setVx), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'vy', label: 'Vector Y', min: -3, max: 3, step: 0.1, value: vy, onChange: handleChange('vy', setVy), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'vz', label: 'Vector Z', min: -3, max: 3, step: 0.1, value: vz, onChange: handleChange('vz', setVz), format: (v) => v.toFixed(1) },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={7} ariaLabel="Interactive 3D vector visualization: adjust vector X, Y, and Z to see magnitude, direction, and component breakdown change live">
        <Scene vx={vx} vy={vy} vz={vz} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        v = ({vx.toFixed(1)}, {vy.toFixed(1)}, {vz.toFixed(1)}) — |v| = {magnitude.toFixed(2)}
        {' '}— magnitude depends on all three components together, not any one alone.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setVx(2.5); setVy(1.8); setVz(1.2) }}
      />
    </div>
  )
}
