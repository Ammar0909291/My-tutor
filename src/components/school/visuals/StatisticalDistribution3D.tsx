'use client'
/**
 * StatisticalDistribution3D — Data Science 3D Foundation Sprint, Task 2.
 * revealStep-gated on the Universal 3D Engine: a statistical distribution —
 *   1 axes · 2 data points · 3 histogram · 4 distribution curve · 5 summary stats.
 * Teaches normal vs skewed distributions and spread. Reuses ThreeDVisual +
 * MolecularNode3D + Vector3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D, vectorLabelAnchor } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 10
const X_AXIS: [[number, number, number], [number, number, number]] = [[-3, -1.6, 0], [3, -1.6, 0]]
const Y_AXIS: [[number, number, number], [number, number, number]] = [[-3, -1.6, 0], [-3, 2, 0]]
const BINS = [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4]
// Bell-shaped counts (normal distribution), peak in the middle.
const COUNTS = [1, 2, 3, 4, 5, 4, 3, 2, 1]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showAxes = revealStep >= 1
  const showPoints = revealStep >= 2
  const showHistogram = revealStep >= 3
  const showCurve = revealStep >= 4
  const showStats = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showAxes) {
      obstacles.push({ type: 'vector', from: X_AXIS[0], to: X_AXIS[1] })
      obstacles.push({ type: 'vector', from: Y_AXIS[0], to: Y_AXIS[1] })
      labels.push({ text: 'value', position: vectorLabelAnchor(X_AXIS[0], X_AXIS[1]), color: '#9AA5B8' })
      labels.push({ text: 'frequency', position: vectorLabelAnchor(Y_AXIS[0], Y_AXIS[1]), color: '#9AA5B8' })
    }
    if (showHistogram) {
      BINS.forEach((x, bi) => {
        const h = COUNTS[bi] * 0.3
        obstacles.push({ type: 'node', position: [x, -1.6 + h / 2, 0], radius: Math.max(0.25, h / 2) })
      })
    }
    if (showStats) {
      obstacles.push({ type: 'vector', from: [0, -1.6, 0], to: [0, 1.4, 0] })
      labels.push({
        text: 'Mean at center (symmetric normal distribution) — spread is the width',
        position: [0, -2.2, 0],
        color: '#FF6B6B',
      })
    }
    return { labels, obstacles }
  }, [showAxes, showHistogram, showStats])

  return (
    <group>
      {showAxes && (
        <group>
          <Vector3D start={X_AXIS[0]} end={X_AXIS[1]} color="#9AA5B8" thickness={0.03} />
          <Vector3D start={Y_AXIS[0]} end={Y_AXIS[1]} color="#9AA5B8" thickness={0.03} />
        </group>
      )}

      {showPoints && !showHistogram &&
        BINS.flatMap((x, bi) =>
          Array.from({ length: COUNTS[bi] }).map((_, i) => (
            <MolecularNode3D key={`p${bi}-${i}`} position={[x, -1.4 + i * 0.28, 0]} radius={0.08} color="#5B8DEF" />
          ))
        )}

      {showHistogram &&
        BINS.map((x, bi) => {
          const h = COUNTS[bi] * 0.3
          return (
            <mesh key={`b${bi}`} position={[x, -1.6 + h / 2, 0]}>
              <boxGeometry args={[0.5, h, 0.5]} />
              <meshStandardMaterial color="#5B8DEF" />
            </mesh>
          )
        })}

      {showCurve &&
        BINS.map((x, bi) => (
          <MolecularNode3D key={`c${bi}`} position={[x, -1.6 + COUNTS[bi] * 0.3 + 0.2, 0]} radius={0.07} color="#FFD166" />
        ))}

      {showStats && (
        <group>
          <Vector3D start={[0, -1.6, 0]} end={[0, 1.4, 0]} color="#FF6B6B" thickness={0.025} />
        </group>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function StatisticalDistribution3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D statistical distribution: axes, data points, a histogram, the distribution curve, and summary statistics showing the mean and spread"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
