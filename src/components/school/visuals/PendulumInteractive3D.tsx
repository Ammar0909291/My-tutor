'use client'
/**
 * PendulumInteractive3D — Classical Mechanics Interactive Layer Sprint,
 * Task 6. Additive: live controls (string length, starting angle, gravity
 * preset) drive the oscillation and a kinetic/potential energy readout.
 * Does not modify PendulumMotion3D.tsx (untouched).
 */
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const PIVOT: [number, number, number] = [0, 2.6, 0]
const GRAVITY_PRESETS: Record<string, number> = { earth: 9.8, moon: 1.6, jupiter: 24.8 }

function Scene({ length, maxAngleDeg, g }: { length: number; maxAngleDeg: number; g: number }) {
  const maxAngle = (maxAngleDeg * Math.PI) / 180
  const omega = Math.sqrt(g / length)
  const groupRef = useRef<Group>(null)
  const t = useRef(0)
  const [swingFraction, setSwingFraction] = useState(0)

  useFrame((_, delta) => {
    t.current += delta
    const a = Math.sin(t.current * omega) * maxAngle
    if (groupRef.current) groupRef.current.rotation.z = a
    setSwingFraction(1 - Math.abs(a) / maxAngle)
  })

  return (
    <group>
      <mesh position={PIVOT}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#6B7A99" />
      </mesh>
      <group ref={groupRef} position={PIVOT}>
        <mesh position={[0, -length / 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, length, 8]} />
          <meshBasicMaterial color="#8FA8D9" />
        </mesh>
        <mesh position={[0, -length, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#5B8DEF" emissive="#FFB74D" emissiveIntensity={swingFraction * 0.7} />
        </mesh>
      </group>
      <mesh position={[-2.6, swingFraction * 1.5 - 1 + PIVOT[1] - 1.5, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#81C784" />
      </mesh>
    </group>
  )
}

interface PendulumInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function PendulumInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: PendulumInteractive3DProps = {}) {
  const [length, setLength] = useState(2)
  const [startAngle, setStartAngle] = useState(30)
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'moon' | 'jupiter'>('earth')
  const touched = useMemo(() => new Set<string>(), [])

  const g = GRAVITY_PRESETS[gravityPreset]
  const period = 2 * Math.PI * Math.sqrt(length / g)

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'pendulum_period',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleNumberChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'length', label: 'String length', min: 0.5, max: 4, step: 0.1, value: length, onChange: handleNumberChange('length', setLength), format: (v) => `${v.toFixed(1)} m` },
    { kind: 'slider', id: 'startAngle', label: 'Starting angle', min: 5, max: 60, step: 1, value: startAngle, onChange: handleNumberChange('startAngle', setStartAngle), format: (v) => `${v.toFixed(0)}°` },
    {
      kind: 'dropdown', id: 'gravity', label: 'Gravity preset', value: gravityPreset,
      options: [{ value: 'earth', label: 'Earth (9.8)' }, { value: 'moon', label: 'Moon (1.6)' }, { value: 'jupiter', label: 'Jupiter (24.8)' }],
      onChange: (v) => { setGravityPreset(v as 'earth' | 'moon' | 'jupiter'); touched.add('gravity'); emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 }) },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={8} ariaLabel="Interactive 3D pendulum: adjust string length, starting angle, and gravity preset to see the oscillation and energy transfer change live">
        <Scene length={length} maxAngleDeg={startAngle} g={g} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Period: {period.toFixed(2)} s — independent of starting angle for small swings; energy oscillates between potential (at the extremes) and kinetic (at the center).
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setLength(2); setStartAngle(30); setGravityPreset('earth') }}
      />
    </div>
  )
}
