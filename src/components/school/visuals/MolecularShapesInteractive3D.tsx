'use client'
/**
 * MolecularShapesInteractive3D — Chemistry 3D Interactive Layer Sprint, Task 4.
 * Additive: a molecule-type control (linear, trigonal planar, tetrahedral)
 * swaps the outer-atom geometry and updates the displayed bond angle. Does
 * not modify MolecularShapes3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const CENTER: [number, number, number] = [0, 0, 0]
const BOND_LEN = 1.4

type MoleculeType = 'linear' | 'trigonal_planar' | 'tetrahedral'

const SHAPES: Record<MoleculeType, { angle: string; positions: [number, number, number][] }> = {
  linear: {
    angle: '180°',
    positions: [[BOND_LEN, 0, 0], [-BOND_LEN, 0, 0]],
  },
  trigonal_planar: {
    angle: '120°',
    positions: [0, 120, 240].map((deg) => {
      const r = (deg * Math.PI) / 180
      return [Math.cos(r) * BOND_LEN, 0, Math.sin(r) * BOND_LEN] as [number, number, number]
    }),
  },
  tetrahedral: {
    angle: '109.5°',
    positions: ([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]] as [number, number, number][]).map((v) => {
      const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
      return [v[0] / len * BOND_LEN, v[1] / len * BOND_LEN, v[2] / len * BOND_LEN] as [number, number, number]
    }),
  },
}

function Scene({ moleculeType }: { moleculeType: MoleculeType }) {
  const shape = SHAPES[moleculeType]
  return (
    <group>
      <MolecularNode3D position={CENTER} radius={0.32} color="#5B8DEF" label="Central atom" />
      {shape.positions.map((p, i) => (
        <group key={i}>
          <MolecularNode3D position={p} radius={0.22} color="#81C784" />
          <Bond3D atomA={CENTER} atomB={p} bondOrder={1} color="#9AA5B8" />
        </group>
      ))}
      <Html position={[0, -BOND_LEN * 1.3, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#FFB74D', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
          Bond angle: {shape.angle}
        </span>
      </Html>
    </group>
  )
}

interface MolecularShapesInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function MolecularShapesInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: MolecularShapesInteractive3DProps = {}) {
  const [moleculeType, setMoleculeType] = useState<MoleculeType>('tetrahedral')
  const touched = useMemo(() => new Set<string>(), [])

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'molecular_geometry',
    context: masteryContext,
    onMasteryEvent,
  })

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown', id: 'moleculeType', label: 'Molecule type', value: moleculeType,
      options: [
        { value: 'linear', label: 'Linear' },
        { value: 'trigonal_planar', label: 'Trigonal planar' },
        { value: 'tetrahedral', label: 'Tetrahedral' },
      ],
      onChange: (v) => { setMoleculeType(v as MoleculeType); touched.add('moleculeType'); emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 1 }) },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={6} ariaLabel="Interactive 3D molecular shapes: switch between linear, trigonal planar, and tetrahedral geometry to see bond angles change">
        <Scene moleculeType={moleculeType} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Geometry: {moleculeType.replace('_', ' ')} — bond angle {SHAPES[moleculeType].angle}.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => setMoleculeType('tetrahedral')}
      />
    </div>
  )
}
