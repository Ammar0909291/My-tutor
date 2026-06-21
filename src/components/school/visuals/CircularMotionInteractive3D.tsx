'use client'
/**
 * CircularMotionInteractive3D — Classical Mechanics Interactive Layer
 * Sprint, Task 5. Additive: live controls (radius, angular velocity, mass)
 * drive the animated orbiting body, its velocity vector, and centripetal
 * force vector. Does not modify CircularMotion3D.tsx (untouched).
 */
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

function orbitPoints(radius: number, steps = 48) {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    pts.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius])
  }
  return pts
}

function Scene({ radius, omega, mass }: { radius: number; omega: number; mass: number }) {
  const path = useMemo(() => orbitPoints(radius), [radius])
  const bodyRef = useRef<Mesh>(null)
  const angle = useRef(0)
  const [pos, setPos] = useState<[number, number, number]>([radius, 0, 0])

  useFrame((_, delta) => {
    angle.current += delta * omega
    const x = Math.cos(angle.current) * radius
    const z = Math.sin(angle.current) * radius
    if (bodyRef.current) bodyRef.current.position.set(x, 0, z)
    setPos([x, 0, z])
  })

  const v = omega * radius
  const Fc = mass * omega * omega * radius
  const tangent: [number, number, number] = [-Math.sin(angle.current), 0, Math.cos(angle.current)]
  const inward: [number, number, number] = [-pos[0] / radius, 0, -pos[2] / radius]

  return (
    <group>
      {path.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color="#6B7A99" />
        </mesh>
      ))}
      <mesh ref={bodyRef} position={pos}>
        <sphereGeometry args={[0.15 + mass * 0.03, 16, 16]} />
        <meshStandardMaterial color="#5B8DEF" />
      </mesh>
      <Vector3D start={pos} end={[pos[0] + tangent[0] * v * 0.3, pos[1], pos[2] + tangent[2] * v * 0.3]} color="#81C784" label={`v=${v.toFixed(1)}`} />
      <Vector3D start={pos} end={[pos[0] + inward[0] * 1.1, pos[1], pos[2] + inward[2] * 1.1]} color="#FF6B6B" label={`Fc=${Fc.toFixed(1)}`} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#FFB74D" />
      </mesh>
    </group>
  )
}

interface CircularMotionInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function CircularMotionInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: CircularMotionInteractive3DProps = {}) {
  const [radius, setRadius] = useState(2.5)
  const [omega, setOmega] = useState(1)
  const [mass, setMass] = useState(2)

  const v = omega * radius
  const Fc = mass * omega * omega * radius

  const { handleChange } = useControlMastery({ defaultConcept: 'circular_motion_centripetal_force', threshold: 3, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'radius', label: 'Radius', min: 1, max: 4, step: 0.1, value: radius, onChange: handleChange('radius', setRadius), format: (v) => `${v.toFixed(1)} m` },
    { kind: 'slider', id: 'omega', label: 'Angular velocity', min: 0.2, max: 3, step: 0.1, value: omega, onChange: handleChange('omega', setOmega), format: (v) => `${v.toFixed(1)} rad/s` },
    { kind: 'slider', id: 'mass', label: 'Mass', min: 0.5, max: 8, step: 0.5, value: mass, onChange: handleChange('mass', setMass), format: (v) => `${v.toFixed(1)} kg` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D circular motion: adjust radius, angular velocity, and mass to see the velocity vector and centripetal force vector change live">
        <Scene radius={radius} omega={omega} mass={mass} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Speed: {v.toFixed(2)} m/s · Centripetal force: {Fc.toFixed(2)} N
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setRadius(2.5); setOmega(1); setMass(2) }}
      />
    </div>
  )
}
