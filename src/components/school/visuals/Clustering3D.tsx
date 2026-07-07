'use client'
/**
 * Clustering3D — Data Science 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: grouping data into clusters —
 *   1 dataset · 2 unclassified points · 3 cluster centers · 4 cluster assignment ·
 *   5 final grouped clusters.
 * Teaches grouping, similarity, and segmentation. Reuses ThreeDVisual +
 * MolecularNode3D (no new primitives).
 */
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'

const CENTERS: { pos: [number, number, number]; color: string }[] = [
  { pos: [-1.8, 1.0, 0], color: '#5B8DEF' },
  { pos: [1.8, 0.6, 0], color: '#81C784' },
  { pos: [0, -1.6, 0], color: '#BA68C8' },
]

// Each point belongs to one cluster (index into CENTERS), scattered around its center.
const POINTS: { pos: [number, number, number]; cluster: number }[] = [
  { pos: [-2.4, 1.4, 0], cluster: 0 }, { pos: [-1.4, 0.7, 0], cluster: 0 }, { pos: [-2.0, 0.5, 0], cluster: 0 }, { pos: [-1.2, 1.3, 0], cluster: 0 },
  { pos: [2.3, 0.9, 0], cluster: 1 }, { pos: [1.3, 0.3, 0], cluster: 1 }, { pos: [2.0, 0.1, 0], cluster: 1 }, { pos: [1.5, 1.0, 0], cluster: 1 },
  { pos: [-0.5, -1.3, 0], cluster: 2 }, { pos: [0.5, -1.9, 0], cluster: 2 }, { pos: [0.2, -1.2, 0], cluster: 2 }, { pos: [-0.3, -2.0, 0], cluster: 2 },
]

function Scene({ revealStep }: { revealStep: number }) {
  const showDataset = revealStep >= 1
  const showCenters = revealStep >= 3
  const showAssignment = revealStep >= 4
  const finalGrouped = revealStep >= 5

  return (
    <group>
      {showDataset &&
        POINTS.map((p, i) => (
          <MolecularNode3D
            key={i}
            position={p.pos}
            radius={0.12}
            color={showAssignment ? CENTERS[p.cluster].color : '#9AA5B8'}
          />
        ))}

      {showCenters &&
        CENTERS.map((c, i) => (
          <MolecularNode3D key={`c${i}`} position={c.pos} radius={finalGrouped ? 0.3 : 0.26} color={c.color} label={`Cluster ${i + 1}`} />
        ))}
    </group>
  )
}

export function Clustering3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={10}
      ariaLabel="3D clustering: a dataset of unclassified points, cluster centers, point assignment to the nearest center, and the final grouped clusters showing similarity-based segmentation"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
