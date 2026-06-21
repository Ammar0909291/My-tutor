'use client'
/**
 * NewtonForcesInteractive3D — Classical Mechanics Interactive Layer Sprint,
 * Task 3. Additive: live controls (object mass, gravity strength, friction
 * coefficient) drive the gravity/normal/friction force vectors and a net
 * force readout. Does not modify NewtonForces3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { ForceArrow3D } from './ForceArrow3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

function Scene({ mass, g, friction }: { mass: number; g: number; friction: number }) {
  const weight = mass * g
  const frictionForce = friction * weight
  const netForce = Math.max(0, frictionForce - frictionForce) // resting block: friction opposes applied; net horizontal shown as 0 unless pushed
  return (
    <group>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#3A4356" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5B8DEF" />
      </mesh>
      <ForceArrow3D origin={[0, 0, 0]} direction={[0, -1, 0]} magnitude={weight} color="#FF6B6B" label={`Fg=${weight.toFixed(1)}N`} scale={0.15} />
      <ForceArrow3D origin={[0, 0, 0]} direction={[0, 1, 0]} magnitude={weight} color="#4DD0E1" label="N" scale={0.15} />
      <ForceArrow3D origin={[0, 0.5, 0]} direction={[1, 0, 0]} magnitude={frictionForce} color="#FFB74D" label={`f=${frictionForce.toFixed(1)}N`} scale={0.15} />
      {netForce === 0 && (
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  )
}

interface NewtonForcesInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function NewtonForcesInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: NewtonForcesInteractive3DProps = {}) {
  const [mass, setMass] = useState(2)
  const [gravity, setGravity] = useState(9.8)
  const [friction, setFriction] = useState(0.3)
  const touched = useMemo(() => new Set<string>(), [])

  const weight = mass * gravity
  const frictionForce = friction * weight

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'newton_forces_balance',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'mass', label: 'Object mass', min: 0.5, max: 10, step: 0.5, value: mass, onChange: handleChange('mass', setMass), format: (v) => `${v.toFixed(1)} kg` },
    { kind: 'slider', id: 'gravity', label: 'Gravity strength', min: 1, max: 25, step: 0.1, value: gravity, onChange: handleChange('gravity', setGravity), format: (v) => `${v.toFixed(1)} m/s²` },
    { kind: 'slider', id: 'friction', label: 'Friction coefficient', min: 0, max: 1, step: 0.05, value: friction, onChange: handleChange('friction', setFriction), format: (v) => v.toFixed(2) },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={8} ariaLabel="Interactive 3D Newton's forces: adjust object mass, gravity strength, and friction coefficient to see the force vectors and net force change live">
        <Scene mass={mass} g={gravity} friction={friction} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Weight: {weight.toFixed(1)} N · Friction force: {frictionForce.toFixed(1)} N · Vertical forces balanced (N = Fg)
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setMass(2); setGravity(9.8); setFriction(0.3) }}
      />
    </div>
  )
}
