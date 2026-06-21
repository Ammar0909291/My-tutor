'use client'
/**
 * AtomicStructureInteractive3D — Chemistry 3D Interactive Layer Sprint, Task 2.
 * Additive: live controls (proton count, neutron count, electron count) drive
 * the nucleus, shells, and an identity readout (atomic number, mass number,
 * charge state) so the student observes how changing proton count changes
 * which element the atom is. Does not modify AtomicStructure3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const SHELL_CAPACITY = [2, 8, 8, 18]

function fillShells(electronCount: number): number[] {
  let remaining = electronCount
  return SHELL_CAPACITY.map((cap) => {
    const filled = Math.min(cap, remaining)
    remaining -= filled
    return filled
  }).filter((n) => n > 0)
}

function nucleusOffsets(count: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  const shown = Math.min(count, 24)
  for (let i = 0; i < shown; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / shown)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    pts.push([0.12 * Math.sin(phi) * Math.cos(theta), 0.12 * Math.sin(phi) * Math.sin(theta), 0.12 * Math.cos(phi)])
  }
  return pts
}

function Scene({ protons, neutrons, electrons }: { protons: number; neutrons: number; electrons: number }) {
  const protonPts = useMemo(() => nucleusOffsets(protons), [protons])
  const neutronPts = useMemo(() => nucleusOffsets(neutrons).map(([x, y, z]) => [x + 0.02, y - 0.02, z + 0.02] as [number, number, number]), [neutrons])
  const shells = useMemo(() => fillShells(electrons), [electrons])
  const radii = [1.0, 1.7, 2.4, 3.1]

  return (
    <group>
      {protonPts.map((p, i) => (
        <mesh key={`p${i}`} position={p}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
      ))}
      {neutronPts.map((p, i) => (
        <mesh key={`n${i}`} position={p}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#9AA5B8" />
        </mesh>
      ))}
      {shells.map((count, shellIdx) => (
        <group key={shellIdx}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radii[shellIdx], 0.012, 8, 64]} />
            <meshBasicMaterial color="#4DD0E1" transparent opacity={0.5} />
          </mesh>
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2
            const x = Math.cos(angle) * radii[shellIdx]
            const z = Math.sin(angle) * radii[shellIdx]
            return (
              <mesh key={i} position={[x, 0, z]}>
                <sphereGeometry args={[0.08, 10, 10]} />
                <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.4} />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

interface AtomicStructureInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function AtomicStructureInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: AtomicStructureInteractive3DProps = {}) {
  const [protons, setProtons] = useState(6)
  const [neutrons, setNeutrons] = useState(6)
  const [electrons, setElectrons] = useState(6)
  const touched = useMemo(() => new Set<string>(), [])

  const atomicNumber = protons
  const massNumber = protons + neutrons
  const charge = protons - electrons

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'atomic_identity',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'protons', label: 'Proton count', min: 1, max: 20, step: 1, value: protons, onChange: handleChange('protons', setProtons), format: (v) => `${v}` },
    { kind: 'slider', id: 'neutrons', label: 'Neutron count', min: 0, max: 22, step: 1, value: neutrons, onChange: handleChange('neutrons', setNeutrons), format: (v) => `${v}` },
    { kind: 'slider', id: 'electrons', label: 'Electron count', min: 0, max: 20, step: 1, value: electrons, onChange: handleChange('electrons', setElectrons), format: (v) => `${v}` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D atomic structure: adjust proton, neutron, and electron count to see atomic number, mass number, and charge state change live">
        <Scene protons={protons} neutrons={neutrons} electrons={electrons} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Atomic number (Z): {atomicNumber} — Mass number (A): {massNumber} — Charge: {charge > 0 ? `+${charge}` : charge}
        {' '}— changing proton count changes which element this atom is.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setProtons(6); setNeutrons(6); setElectrons(6) }}
      />
    </div>
  )
}
