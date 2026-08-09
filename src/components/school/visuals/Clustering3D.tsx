'use client'
/**
 * Clustering3D — Data Science 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: grouping data into clusters —
 *   1 dataset · 2 unclassified points · 3 cluster centers · 4 cluster assignment ·
 *   5 final grouped clusters.
 * Teaches grouping, similarity, and segmentation. Reuses ThreeDVisual +
 * MolecularNode3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 10
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

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showDataset = revealStep >= 1
  const showCenters = revealStep >= 3
  const showAssignment = revealStep >= 4
  const finalGrouped = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showDataset) for (const p of POINTS) obstacles.push({ type: 'point', position: p.pos, radius: 0.12 })
    if (showCenters) {
      const radius = finalGrouped ? 0.3 : 0.26
      CENTERS.forEach((c, i) => {
        obstacles.push({ type: 'node', position: c.pos, radius })
        labels.push({ text: `Cluster ${i + 1}`, position: nodeLabelAnchor(c.pos, radius), color: c.color })
      })
    }
    return { labels, obstacles }
  }, [showDataset, showCenters, finalGrouped])

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
          <MolecularNode3D key={`c${i}`} position={c.pos} radius={finalGrouped ? 0.3 : 0.26} color={c.color} />
        ))}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function Clustering3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D clustering: a dataset of unclassified points, cluster centers, point assignment to the nearest center, and the final grouped clusters showing similarity-based segmentation"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
