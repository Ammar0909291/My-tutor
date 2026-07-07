'use client'
/**
 * MachineLearningPipeline3D — Data Science 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine: the ML training/prediction workflow —
 *   1 raw data · 2 cleaning · 3 feature preparation · 4 model · 5 prediction output.
 * Teaches the end-to-end training and prediction workflow. Reuses ThreeDVisual +
 * MolecularNode3D + Bond3D (no new primitives).
 */
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'

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

function Scene({ revealStep }: { revealStep: number }) {
  // Stage i is revealed at step i+1; the connector into it appears with it.
  const visibleCount = Math.min(Math.max(revealStep, 0), STAGES.length)

  return (
    <group>
      {STAGES.slice(0, visibleCount).map((s, i) => (
        <group key={i}>
          {i > 0 && <Bond3D atomA={STAGES[i - 1].pos} atomB={s.pos} color="#9AA5B8" />}
          <MolecularNode3D position={s.pos} radius={0.5} color={s.color} label={s.label} />
        </group>
      ))}
    </group>
  )
}

export function MachineLearningPipeline3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={12}
      ariaLabel="3D machine learning pipeline: raw data, cleaning, feature preparation, the model, and the prediction output, connected as a training and prediction workflow"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
