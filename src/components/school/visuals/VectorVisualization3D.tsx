'use client'
/**
 * VectorVisualization3D — Mathematics 3D Foundation Sprint, Task 3.
 * revealStep-gated: 1 origin · 2 vector arrow · 3 magnitude · 4 direction ·
 * 5 completed visualization. Reuses ThreeDVisual + Vector3D directly.
 *
 * LABELS GO THROUGH THE ENGINE. Every piece of text this figure draws is
 * declared to `SceneLabelLayer`, which solves all of them together against the
 * live canvas and the geometry below. It used to draw its own `<Html>` at a
 * fixed 11px with a black halo in both themes, and each Vector3D placed its own
 * label with no knowledge of the others.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D, vectorLabelAnchor } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const ORIGIN: [number, number, number] = [0, 0, 0]
const TIP: [number, number, number] = [2.5, 1.8, 1.2]
const MAGNITUDE = Math.sqrt(TIP[0] ** 2 + TIP[1] ** 2 + TIP[2] ** 2)
const CAMERA_DISTANCE = 7

const AXES: { end: [number, number, number]; color: string; label: string }[] = [
  { end: [TIP[0], 0, 0], color: '#FF6B6B', label: 'x' },
  { end: [0, TIP[1], 0], color: '#81C784', label: 'y' },
  { end: [0, 0, TIP[2]], color: '#4DD0E1', label: 'z' },
]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showOrigin = revealStep >= 1
  const showVector = revealStep >= 2
  const showMagnitude = revealStep >= 3
  const showDirection = revealStep >= 4
  const completed = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showOrigin) obstacles.push({ type: 'point', position: ORIGIN, radius: 0.08 })
    if (showVector) {
      obstacles.push({ type: 'vector', from: ORIGIN, to: TIP })
      labels.push({ text: 'v', position: vectorLabelAnchor(ORIGIN, TIP), color: '#5B8DEF' })
    }
    if (showMagnitude) {
      labels.push({
        text: `|v| = ${MAGNITUDE.toFixed(2)}`,
        position: [TIP[0] / 2, TIP[1] / 2 + 0.3, TIP[2] / 2],
        color: '#FFB74D',
      })
    }
    if (showDirection) {
      for (const axis of AXES) {
        obstacles.push({ type: 'vector', from: ORIGIN, to: axis.end })
        labels.push({ text: axis.label, position: vectorLabelAnchor(ORIGIN, axis.end), color: axis.color })
      }
    }
    if (completed) {
      labels.push({
        text: 'Vector v = (x, y, z) components + magnitude',
        position: [0, -1.4, 0],
        color: '#5B8DEF',
      })
    }
    return { labels, obstacles }
  }, [showOrigin, showVector, showMagnitude, showDirection, completed])

  return (
    <group>
      {showOrigin && (
        <mesh position={ORIGIN}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#9AA5B8" />
        </mesh>
      )}
      {showVector && <Vector3D start={ORIGIN} end={TIP} color="#5B8DEF" />}
      {showDirection && AXES.map((axis) => (
        <Vector3D key={axis.label} start={ORIGIN} end={axis.end} color={axis.color} thickness={0.02} />
      ))}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function VectorVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  // Read on the DOM side: <Canvas> mounts its own reconciler root and app
  // context does not cross it. Same rule SceneSpecRenderer documents.
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      // A labelled teaching figure is not a turntable: while the camera orbits,
      // every label's screen position orbits with it and no placement can hold.
      // Manual orbit is untouched — the learner can still turn the model.
      autoRotate={false}
      ariaLabel="3D vector visualization: the origin, the vector arrow, its magnitude, its directional components, and the completed visualization"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
