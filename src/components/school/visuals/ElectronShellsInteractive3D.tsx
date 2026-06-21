'use client'
/**
 * ElectronShellsInteractive3D — Chemistry 3D Interactive Layer Sprint, Task 3.
 * Additive: live controls (atomic number, shell display mode) drive the K/L/M
 * shell population so the student observes shell-filling behavior. Does not
 * modify ElectronShells3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

const SHELL_NAMES = ['K', 'L', 'M']
const SHELL_CAPACITY = [2, 8, 8]
const SHELL_RADII = [1.0, 1.8, 2.6]
const SHELL_COLORS = ['#4DD0E1', '#81C784', '#FFB74D']

function fillShells(electronCount: number): number[] {
  let remaining = electronCount
  return SHELL_CAPACITY.map((cap) => {
    const filled = Math.min(cap, remaining)
    remaining -= filled
    return filled
  })
}

function Shell({ radius, name, color, count, animated }: { radius: number; name: string; color: string; count: number; animated: boolean }) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (animated && ref.current) ref.current.rotation.z += delta * 0.3
  })
  if (count === 0) return null
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <Html position={[radius + 0.25, 0, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>{name}: {count}</span>
      </Html>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

interface ElectronShellsInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function ElectronShellsInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: ElectronShellsInteractive3DProps = {}) {
  const [atomicNumber, setAtomicNumber] = useState(11)
  const [displayMode, setDisplayMode] = useState<'animated' | 'static'>('animated')

  const shellCounts = useMemo(() => fillShells(atomicNumber), [atomicNumber])

  const { mark } = useControlMastery({ defaultConcept: 'electron_shell_filling', threshold: 2, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    {
      kind: 'slider', id: 'atomicNumber', label: 'Atomic number', min: 1, max: 18, step: 1, value: atomicNumber,
      onChange: (v) => { setAtomicNumber(v); mark('atomicNumber') },
      format: (v) => `${v}`,
    },
    {
      kind: 'dropdown', id: 'displayMode', label: 'Shell display mode', value: displayMode,
      options: [{ value: 'animated', label: 'Animated' }, { value: 'static', label: 'Static' }],
      onChange: (v) => { setDisplayMode(v as 'animated' | 'static'); mark('displayMode') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D electron shells: adjust atomic number to see K, L, and M shells fill with electrons">
        <group>
          <mesh>
            <sphereGeometry args={[0.3, 20, 20]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          {SHELL_NAMES.map((name, i) => (
            <Shell key={name} radius={SHELL_RADII[i]} name={name} color={SHELL_COLORS[i]} count={shellCounts[i]} animated={displayMode === 'animated'} />
          ))}
        </group>
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Electron distribution: {shellCounts.filter((c) => c > 0).map((c, i) => `${SHELL_NAMES[i]}=${c}`).join(', ')}
        {' '}— K fills first (max 2), then L (max 8), then M.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setAtomicNumber(11); setDisplayMode('animated') }}
      />
    </div>
  )
}
