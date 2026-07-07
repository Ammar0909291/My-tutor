'use client'
/**
 * MomentumCollisionInteractive3D — Classical Mechanics Interactive Layer
 * Sprint, Task 4. Additive: live controls (mass A, mass B, velocity A,
 * velocity B) drive a 1D elastic-collision readout (before/after velocities,
 * momentum transfer). Does not modify MomentumCollision3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

function elasticCollision(mA: number, vA: number, mB: number, vB: number) {
  const vA2 = ((mA - mB) * vA + 2 * mB * vB) / (mA + mB)
  const vB2 = ((mB - mA) * vB + 2 * mA * vA) / (mA + mB)
  const momentumBefore = mA * vA + mB * vB
  const momentumTransfer = mA * (vA - vA2)
  return { vA2, vB2, momentumBefore, momentumTransfer }
}

function Scene({ mA, vA, mB, vB, vA2, vB2 }: { mA: number; vA: number; mB: number; vB: number; vA2: number; vB2: number }) {
  const radiusA = 0.25 + mA * 0.05
  const radiusB = 0.25 + mB * 0.05
  return (
    <group>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3A4356" />
      </mesh>
      <mesh position={[-3, radiusA, 0]}>
        <sphereGeometry args={[radiusA, 16, 16]} />
        <meshStandardMaterial color="#5B8DEF" />
      </mesh>
      <mesh position={[3, radiusB, 0]}>
        <sphereGeometry args={[radiusB, 16, 16]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <Vector3D start={[-3, radiusA, 0]} end={[-3 + vA * 0.3, radiusA, 0]} color="#81C784" label="vA" />
      <Vector3D start={[3, radiusB, 0]} end={[3 + vB * 0.3, radiusB, 0]} color="#FFB74D" label="vB" />
      <Vector3D start={[-1, radiusA + 1.2, 0]} end={[-1 + vA2 * 0.3, radiusA + 1.2, 0]} color="#4DD0E1" label="vA'" />
      <Vector3D start={[1, radiusB + 1.2, 0]} end={[1 + vB2 * 0.3, radiusB + 1.2, 0]} color="#B388FF" label="vB'" />
    </group>
  )
}

interface MomentumCollisionInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function MomentumCollisionInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: MomentumCollisionInteractive3DProps = {}) {
  const [mA, setMA] = useState(2)
  const [mB, setMB] = useState(1)
  const [vA, setVA] = useState(3)
  const [vB, setVB] = useState(-1)

  const { vA2, vB2, momentumBefore, momentumTransfer } = useMemo(() => elasticCollision(mA, vA, mB, vB), [mA, vA, mB, vB])

  const { handleChange } = useControlMastery({ defaultConcept: 'momentum_conservation', threshold: 4, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'massA', label: 'Mass A', min: 0.5, max: 8, step: 0.5, value: mA, onChange: handleChange('massA', setMA), format: (v) => `${v.toFixed(1)} kg` },
    { kind: 'slider', id: 'massB', label: 'Mass B', min: 0.5, max: 8, step: 0.5, value: mB, onChange: handleChange('massB', setMB), format: (v) => `${v.toFixed(1)} kg` },
    { kind: 'slider', id: 'velocityA', label: 'Velocity A', min: -6, max: 6, step: 0.5, value: vA, onChange: handleChange('velocityA', setVA), format: (v) => `${v.toFixed(1)} m/s` },
    { kind: 'slider', id: 'velocityB', label: 'Velocity B', min: -6, max: 6, step: 0.5, value: vB, onChange: handleChange('velocityB', setVB), format: (v) => `${v.toFixed(1)} m/s` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D momentum collision: adjust mass A, mass B, velocity A, and velocity B to see before/after velocities and momentum transfer change live">
        <Scene mA={mA} vA={vA} mB={mB} vB={vB} vA2={vA2} vB2={vB2} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Total momentum: {momentumBefore.toFixed(1)} kg·m/s (conserved) · Momentum transferred A→B: {momentumTransfer.toFixed(1)} kg·m/s
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setMA(2); setMB(1); setVA(3); setVB(-1) }}
      />
    </div>
  )
}
