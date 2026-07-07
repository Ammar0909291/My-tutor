'use client'
/**
 * CoordinateSystemInteractive3D — Mathematics Interactive Layer Sprint, Task 2.
 * Additive: live controls (X, Y, Z) drive a moving point, its coordinate
 * readout, and projection lines. Does not modify CoordinateSystem3D.tsx.
 */
import { useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

const ORIGIN: [number, number, number] = [0, 0, 0]

function Scene({ x, y, z }: { x: number; y: number; z: number }) {
  const point: [number, number, number] = [x, y, z]
  return (
    <group>
      <Vector3D start={ORIGIN} end={[3, 0, 0]} color="#FF6B6B" label="X" />
      <Vector3D start={ORIGIN} end={[0, 3, 0]} color="#81C784" label="Y" />
      <Vector3D start={ORIGIN} end={[0, 0, 3]} color="#5B8DEF" label="Z" />
      <MolecularNode3D position={point} radius={0.12} color="#FFB74D" label={`(${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`} />
      <Vector3D start={[x, 0, 0]} end={point} color="#9AA5B8" thickness={0.02} />
      <Vector3D start={[0, y, 0]} end={point} color="#9AA5B8" thickness={0.02} />
      <Vector3D start={[0, 0, z]} end={point} color="#9AA5B8" thickness={0.02} />
    </group>
  )
}

interface CoordinateSystemInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function CoordinateSystemInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: CoordinateSystemInteractive3DProps = {}) {
  const [x, setX] = useState(2)
  const [y, setY] = useState(1.5)
  const [z, setZ] = useState(1)

  const { handleChange } = useControlMastery({ defaultConcept: 'coordinate_point_position', threshold: 3, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'x', label: 'X coordinate', min: -3, max: 3, step: 0.1, value: x, onChange: handleChange('x', setX), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'y', label: 'Y coordinate', min: -3, max: 3, step: 0.1, value: y, onChange: handleChange('y', setY), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'z', label: 'Z coordinate', min: -3, max: 3, step: 0.1, value: z, onChange: handleChange('z', setZ), format: (v) => v.toFixed(1) },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={7} ariaLabel="Interactive 3D coordinate system: adjust X, Y, and Z to move a point and see its projection lines change live">
        <Scene x={x} y={y} z={z} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Point: ({x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)}) — each axis value moves the point along
        that axis independently.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setX(2); setY(1.5); setZ(1) }}
      />
    </div>
  )
}
