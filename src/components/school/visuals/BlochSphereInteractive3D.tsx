'use client'
/**
 * BlochSphereInteractive3D — Interactive Simulation Layer Phase 1, Task 5.
 * Additive: wraps the Bloch sphere concept with live theta/phi controls and
 * X/Y/Z/H preset-gate buttons so the state vector moves on demand. Does not
 * modify BlochSphere3D.tsx (untouched, still registered/used as-is).
 */
import { useMemo, useState } from 'react'
import { Line } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

function blochVector(thetaDeg: number, phiDeg: number) {
  const theta = (thetaDeg * Math.PI) / 180
  const phi = (phiDeg * Math.PI) / 180
  const vx = Math.sin(theta) * Math.cos(phi) * 2
  const vz = Math.sin(theta) * Math.sin(phi) * 2
  const vy = Math.cos(theta) * 2
  return [vx, vy, vz] as [number, number, number]
}

function Scene({ theta, phi }: { theta: number; phi: number }) {
  const [vx, vy, vz] = blochVector(theta, phi)

  const equatorPts: [number, number, number][] = useMemo(
    () => Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2
      return [Math.cos(a) * 2, 0, Math.sin(a) * 2] as [number, number, number]
    }),
    []
  )

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#5B8DEF" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#88AAFF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.4} />
      </mesh>
      <Line points={[[0, -2.2, 0], [0, 2.2, 0]]} color="#9AA7C2" lineWidth={1} />
      <Line points={equatorPts} color="#4DD0E1" lineWidth={1.5} />
      <group>
        <Line points={[[0, 0, 0], [vx, vy, vz]]} color="#FFD166" lineWidth={3} />
        <mesh position={[vx, vy, vz]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

const GATE_PRESETS: Record<string, { theta: number; phi: number }> = {
  X: { theta: 180, phi: 0 },
  Y: { theta: 90, phi: 90 },
  Z: { theta: 0, phi: 0 },
  H: { theta: 90, phi: 0 },
}

interface BlochSphereInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function BlochSphereInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: BlochSphereInteractive3DProps = {}) {
  const [theta, setTheta] = useState(60)
  const [phi, setPhi] = useState(0)

  const { mark: markTouched } = useControlMastery({ defaultConcept: 'bloch_sphere_superposition', threshold: 2, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'theta', label: 'Theta (polar angle)', min: 0, max: 180, step: 1, value: theta, onChange: (v) => { setTheta(v); markTouched('theta') }, format: (v) => `${v.toFixed(0)}°` },
    { kind: 'slider', id: 'phi', label: 'Phi (phase angle)', min: 0, max: 360, step: 1, value: phi, onChange: (v) => { setPhi(v); markTouched('phi') }, format: (v) => `${v.toFixed(0)}°` },
    {
      kind: 'dropdown',
      id: 'gate',
      label: 'Apply gate preset',
      value: '',
      options: [
        { value: '', label: 'Choose a gate…' },
        { value: 'X', label: 'X (bit flip → south pole)' },
        { value: 'Y', label: 'Y (bit + phase flip)' },
        { value: 'Z', label: 'Z (phase flip, stays at north pole)' },
        { value: 'H', label: 'H (Hadamard → equator superposition)' },
      ],
      onChange: (v) => {
        const preset = GATE_PRESETS[v]
        if (preset) { setTheta(preset.theta); setPhi(preset.phi); markTouched('gate') }
      },
    },
  ]

  return (
    <div>
      <ThreeDVisual
        cameraDistance={6}
        ariaLabel="Interactive 3D Bloch sphere: adjust theta and phi or apply X, Y, Z, H gate presets to move the state vector"
      >
        <Scene theta={theta} phi={phi} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Theta sets how far the state is from |0⟩ toward |1⟩ (superposition); phi rotates the
        vector around the equator (relative phase) — both are needed to fully describe the state.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setTheta(60); setPhi(0) }}
      />
    </div>
  )
}
