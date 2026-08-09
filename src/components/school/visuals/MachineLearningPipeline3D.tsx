'use client'
/**
 * MachineLearningPipeline3D — Data Science 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine: the ML training/prediction workflow —
 *   1 raw data · 2 cleaning · 3 feature preparation · 4 model · 5 prediction output.
 * Teaches the end-to-end training and prediction workflow. Reuses ThreeDVisual +
 * MolecularNode3D + Bond3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 12

interface Stage {
  pos: [number, number, number]
  label: string
  color: string
}

const STAGES: Stage[] = [
  { pos: [-4, 0, 0], label: 'Raw data', color: '#9AA5B8' },
  { pos: [-2, 0, 0], label: 'Cleaning', color: '#4DD0E1' },
  { pos: [0, 0, 0], label: 'Features', color: '#FFB74D' },
  { pos: [2, 0, 0], label: 'Model', color: '#5B8DEF' },
  { pos: [4, 0, 0], label: 'Prediction', color: '#81C784' },
]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  // Stage i is revealed at step i+1; the connector into it appears with it.
  const visibleCount = Math.min(Math.max(revealStep, 0), STAGES.length)

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    STAGES.slice(0, visibleCount).forEach((s, i) => {
      obstacles.push({ type: 'node', position: s.pos, radius: 0.5 })
      if (i > 0) obstacles.push({ type: 'bond', from: STAGES[i - 1].pos, to: s.pos })
      labels.push({ text: s.label, position: nodeLabelAnchor(s.pos, 0.5), color: s.color })
    })
    return { labels, obstacles }
  }, [visibleCount])

  return (
    <group>
      {STAGES.slice(0, visibleCount).map((s, i) => (
        <group key={i}>
          {i > 0 && <Bond3D atomA={STAGES[i - 1].pos} atomB={s.pos} color="#9AA5B8" />}
          <MolecularNode3D position={s.pos} radius={0.5} color={s.color} />
        </group>
      ))}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function MachineLearningPipeline3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D machine learning pipeline: raw data, cleaning, feature preparation, the model, and the prediction output, connected as a training and prediction workflow"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
