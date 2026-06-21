'use client'
/**
 * BondFormationInteractive3D — Chemistry 3D Interactive Layer Sprint, Task 5.
 * Additive: a bond-type control (ionic, covalent, metallic) swaps between
 * electron transfer, electron sharing, and a shared electron-sea rendering.
 * Does not modify BondFormation3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

type BondType = 'ionic' | 'covalent' | 'metallic'

const POS_A: [number, number, number] = [-0.9, 0, 0]
const POS_B: [number, number, number] = [0.9, 0, 0]

function IonicScene() {
  return (
    <group>
      <MolecularNode3D position={POS_A} radius={0.3} color="#FF6B6B" label="Na⁺" />
      <MolecularNode3D position={POS_B} radius={0.34} color="#5B8DEF" label="Cl⁻" />
      <mesh position={[0.3, 0.15, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#4DD0E1" emissive="#4DD0E1" emissiveIntensity={0.6} />
      </mesh>
      <Html position={[0, 0.7, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4DD0E1', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>electron transferred A → B</span>
      </Html>
    </group>
  )
}

function CovalentScene() {
  return (
    <group>
      <MolecularNode3D position={POS_A} radius={0.3} color="#FF6B6B" label="A" />
      <MolecularNode3D position={POS_B} radius={0.3} color="#5B8DEF" label="B" />
      <Bond3D atomA={POS_A} atomB={POS_B} bondOrder={1} color="#81C784" label="shared pair" />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

function MetallicScene() {
  const lattice: [number, number, number][] = [
    [-0.9, 0.6, 0], [0, 0.6, 0], [0.9, 0.6, 0],
    [-0.9, -0.6, 0], [0, -0.6, 0], [0.9, -0.6, 0],
  ]
  const seaElectrons: [number, number, number][] = [
    [-0.45, 0, 0.2], [0.45, 0, -0.2], [0, 0.3, 0.3], [0, -0.3, -0.3],
  ]
  return (
    <group>
      {lattice.map((p, i) => (
        <MolecularNode3D key={i} position={p} radius={0.22} color="#FFB74D" />
      ))}
      {seaElectrons.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#4DD0E1" emissive="#4DD0E1" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <Html position={[0, 1.1, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4DD0E1', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>delocalized electron sea</span>
      </Html>
    </group>
  )
}

interface BondFormationInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function BondFormationInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: BondFormationInteractive3DProps = {}) {
  const [bondType, setBondType] = useState<BondType>('covalent')
  const touched = useMemo(() => new Set<string>(), [])

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'bond_type',
    context: masteryContext,
    onMasteryEvent,
  })

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown', id: 'bondType', label: 'Bond type', value: bondType,
      options: [
        { value: 'ionic', label: 'Ionic' },
        { value: 'covalent', label: 'Covalent' },
        { value: 'metallic', label: 'Metallic' },
      ],
      onChange: (v) => { setBondType(v as BondType); touched.add('bondType'); emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 1 }) },
    },
  ]

  const explanation =
    bondType === 'ionic' ? 'An electron transfers completely from one atom to another, forming oppositely charged ions.'
    : bondType === 'covalent' ? 'Two atoms share a pair of electrons between them.'
    : 'Metal atoms share a delocalized "sea" of electrons across the whole lattice.'

  return (
    <div>
      <ThreeDVisual cameraDistance={6} ariaLabel="Interactive 3D bond formation: switch between ionic, covalent, and metallic bonding to see electron transfer, sharing, or a delocalized electron sea">
        {bondType === 'ionic' ? <IonicScene /> : bondType === 'covalent' ? <CovalentScene /> : <MetallicScene />}
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>{explanation}</p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => setBondType('covalent')}
      />
    </div>
  )
}
