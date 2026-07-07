'use client'
/**
 * HydrogenOrbitalInteractive3D — Interactive Simulation Layer Phase 2, Task 2.
 * Additive: lets the student switch live between 1s / 2s / 2p / 3d probability
 * clouds via a dropdown selector. Reinforces that every orbital is a probability
 * CLOUD, never a flat circular orbit. Does not modify HydrogenOrbital3D.tsx
 * (untouched, still registered/used as-is).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

type OrbitalShape = '1s' | '2s' | '2p' | '3d'

const ORBITAL_META: Record<OrbitalShape, { color: string; radius: number; label: string }> = {
  '1s': { color: '#4DD0E1', radius: 1.0, label: '1s — spherical cloud, no node' },
  '2s': { color: '#FFD166', radius: 2.0, label: '2s — larger sphere with a radial node' },
  '2p': { color: '#81C784', radius: 2.2, label: '2p — dumbbell, two lobes along an axis' },
  '3d': { color: '#CE93D8', radius: 2.4, label: '3d — four-lobed cloverleaf cloud' },
}

function cloudPoints(count: number, radius: number, shape: OrbitalShape): [number, number, number][] {
  const pts: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    let px = Math.cos(theta) * r
    let py = y
    let pz = Math.sin(theta) * r
    let rad = radius * (0.5 + Math.random() * 0.5)
    if (shape === '2s') {
      rad = (i % 2 === 0 ? radius * 0.35 : radius) * (0.7 + Math.random() * 0.3)
    }
    if (shape === '2p') {
      const lobe = Math.sign(py || 1)
      px *= 0.5
      pz *= 0.5
      py = lobe * (0.6 + Math.abs(py)) * radius * 0.7
      rad = radius * (0.4 + Math.random() * 0.3)
    }
    if (shape === '3d') {
      // four-lobed cloverleaf in the equatorial plane, flattened along y (nodal plane).
      const lobeFactor = Math.abs(Math.sin(2 * theta))
      rad = radius * (0.25 + lobeFactor * 0.75) * (0.7 + Math.random() * 0.3)
      py *= 0.25
    }
    pts.push([px * rad, py * (shape === '2p' || shape === '3d' ? 1 : rad), pz * rad])
  }
  return pts
}

function Scene({ shape }: { shape: OrbitalShape }) {
  const meta = ORBITAL_META[shape]
  const points = useMemo(() => cloudPoints(240, meta.radius, shape), [shape, meta.radius])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.7} />
      </mesh>
      <group>
        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={meta.color} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

interface HydrogenOrbitalInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function HydrogenOrbitalInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: HydrogenOrbitalInteractive3DProps) {
  const [shape, setShape] = useState<OrbitalShape>('1s')

  const { mark } = useControlMastery({ defaultConcept: 'hydrogen_orbital_clouds', threshold: 4, initialTouched: ['1s'], context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown',
      id: 'orbital',
      label: 'Orbital',
      value: shape,
      options: (Object.keys(ORBITAL_META) as OrbitalShape[]).map((s) => ({ value: s, label: ORBITAL_META[s].label })),
      onChange: (v) => {
        const next = v as OrbitalShape
        setShape(next)
        mark(next)
      },
    },
  ]

  return (
    <div>
      <ThreeDVisual
        cameraDistance={9}
        ariaLabel="Interactive hydrogen orbital explorer: switch between 1s, 2s, 2p, and 3d probability clouds"
      >
        <Scene shape={shape} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Every orbital shown is a probability CLOUD — points where the electron is likely to be found —
        never a flat circular orbit like a planet around the sun.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => setShape('1s')}
      />
    </div>
  )
}
