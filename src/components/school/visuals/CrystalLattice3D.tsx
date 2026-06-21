'use client'
/**
 * CrystalLattice3D — Chemistry 3D Foundation Sprint, Task 7.
 * revealStep-gated on the Universal 3D Engine: a simple cubic lattice —
 *   1 unit cell · 2 repeated structure · 3 lattice growth · 4 symmetry ·
 *   5 completed crystal. Reuses ThreeDVisual + MolecularNode3D + Bond3D.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'

const SPACING = 1.1

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

function unitCellEdges(): [[number, number, number], [number, number, number]][] {
  const corners = gridPositions(2, 2, 2)
  const edges: [[number, number, number], [number, number, number]][] = []
  for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      const [ax, ay, az] = corners[i]
      const [bx, by, bz] = corners[j]
      const dist = Math.hypot(ax - bx, ay - by, az - bz)
      if (Math.abs(dist - SPACING) < 0.01) edges.push([corners[i], corners[j]])
    }
  }
  return edges
}

function Scene({ revealStep }: { revealStep: number }) {
  const showUnitCell = revealStep >= 1
  const showRepeated = revealStep >= 2
  const showGrowth = revealStep >= 3
  const showSymmetry = revealStep >= 4
  const completed = revealStep >= 5

  const gridSize: [number, number, number] = showGrowth ? [3, 3, 2] : showRepeated ? [2, 2, 2] : [2, 2, 2]
  const nodes = showRepeated || showGrowth ? gridPositions(...gridSize) : gridPositions(2, 2, 2)
  const edges = unitCellEdges()

  return (
    <group>
      {showUnitCell &&
        nodes.map((p, i) => <MolecularNode3D key={i} position={p} radius={0.14} color="#5B8DEF" />)}

      {showUnitCell && !showRepeated &&
        edges.map(([a, b], i) => <Bond3D key={i} atomA={a} atomB={b} bondOrder={1} color="#9AA5B8" />)}

      {showSymmetry && (
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[SPACING * gridSize[0] + 1, SPACING * gridSize[1] + 1]} />
          <meshBasicMaterial color="#FFB74D" transparent opacity={0.12} side={2} />
        </mesh>
      )}

      {completed && (
        <Html position={[0, -(SPACING * gridSize[1]) / 2 - 0.6, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#5B8DEF', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            Completed crystal lattice
          </span>
        </Html>
      )}
    </group>
  )
}

export function CrystalLattice3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D crystal lattice: a single unit cell, the repeated structure, lattice growth across multiple cells, a symmetry plane, and the completed crystal"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
