'use client'
/**
 * CrystalLatticeInteractive3D — Chemistry 3D Interactive Layer Sprint, Task 6.
 * Additive: live controls (lattice size, lattice type) drive how many unit
 * cells are repeated and whether a body-centered atom is shown, so the
 * student observes crystal growth. Does not modify CrystalLattice3D.tsx
 * (untouched).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

const SPACING = 1.1
type LatticeType = 'simple_cubic' | 'body_centered'

function gridPositions(nx: number, ny: number, nz: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  const cx = (nx - 1) / 2
  const cy = (ny - 1) / 2
  const cz = (nz - 1) / 2
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) {
      for (let z = 0; z < nz; z++) {
        pts.push([(x - cx) * SPACING, (y - cy) * SPACING, (z - cz) * SPACING])
      }
    }
  }
  return pts
}

function unitCellEdges(nodes: [number, number, number][]): [[number, number, number], [number, number, number]][] {
  const edges: [[number, number, number], [number, number, number]][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const [ax, ay, az] = nodes[i]
      const [bx, by, bz] = nodes[j]
      const dist = Math.hypot(ax - bx, ay - by, az - bz)
      if (Math.abs(dist - SPACING) < 0.01) edges.push([nodes[i], nodes[j]])
    }
  }
  return edges
}

function Scene({ size, latticeType }: { size: number; latticeType: LatticeType }) {
  const corners = useMemo(() => gridPositions(size + 1, size + 1, size + 1), [size])
  const edges = useMemo(() => (size === 1 ? unitCellEdges(corners) : []), [corners, size])
  const bodyCenters = useMemo(() => {
    if (latticeType !== 'body_centered') return []
    return gridPositions(size, size, size).map(([x, y, z]) => [x + SPACING / 2 - SPACING / 2, y, z] as [number, number, number])
  }, [latticeType, size])

  return (
    <group>
      {corners.map((p, i) => <MolecularNode3D key={i} position={p} radius={0.13} color="#5B8DEF" />)}
      {edges.map(([a, b], i) => <Bond3D key={i} atomA={a} atomB={b} bondOrder={1} color="#9AA5B8" />)}
      {bodyCenters.map((p, i) => <MolecularNode3D key={`bc${i}`} position={p} radius={0.1} color="#FFB74D" />)}
    </group>
  )
}

interface CrystalLatticeInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function CrystalLatticeInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: CrystalLatticeInteractive3DProps = {}) {
  const [size, setSize] = useState(2)
  const [latticeType, setLatticeType] = useState<LatticeType>('simple_cubic')

  const { mark } = useControlMastery({ defaultConcept: 'crystal_lattice_growth', threshold: 2, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    {
      kind: 'slider', id: 'latticeSize', label: 'Lattice size', min: 1, max: 4, step: 1, value: size,
      onChange: (v) => { setSize(v); mark('latticeSize') },
      format: (v) => `${v}×${v}×${v} cells`,
    },
    {
      kind: 'dropdown', id: 'latticeType', label: 'Lattice type', value: latticeType,
      options: [{ value: 'simple_cubic', label: 'Simple cubic' }, { value: 'body_centered', label: 'Body-centered' }],
      onChange: (v) => { setLatticeType(v as LatticeType); mark('latticeType') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={10} ariaLabel="Interactive 3D crystal lattice: adjust lattice size and lattice type to see unit cells repeat and the crystal grow">
        <Scene size={size} latticeType={latticeType} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        {size === 1 ? 'A single unit cell' : `${size}×${size}×${size} repeated unit cells`} — {latticeType === 'body_centered' ? 'with a body-centered atom in each cell' : 'simple cubic packing'}.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setSize(2); setLatticeType('simple_cubic') }}
      />
    </div>
  )
}
