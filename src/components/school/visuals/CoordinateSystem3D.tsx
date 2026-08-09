'use client'
/**
 * CoordinateSystem3D — Mathematics 3D Foundation Sprint, Task 2.
 * revealStep-gated: 1 X axis · 2 Y axis · 3 Z axis · 4 coordinate point ·
 * 5 completed system. Reuses ThreeDVisual + Vector3D.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D, vectorLabelAnchor } from './Vector3D'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 7
const AXES: { end: [number, number, number]; color: string; text: string }[] = [
  { end: [3, 0, 0], color: '#FF6B6B', text: 'X' },
  { end: [0, 3, 0], color: '#81C784', text: 'Y' },
  { end: [0, 0, 3], color: '#5B8DEF', text: 'Z' },
]
const ORIGIN: [number, number, number] = [0, 0, 0]
const POINT: [number, number, number] = [2, 1.5, 1]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showX = revealStep >= 1
  const showY = revealStep >= 2
  const showZ = revealStep >= 3
  const showPoint = revealStep >= 4
  const completed = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    const shown = [showX, showY, showZ]
    AXES.forEach((axis, i) => {
      if (!shown[i]) return
      obstacles.push({ type: 'vector', from: ORIGIN, to: axis.end })
      labels.push({ text: axis.text, position: vectorLabelAnchor(ORIGIN, axis.end), color: axis.color })
    })
    if (showPoint) {
      obstacles.push({ type: 'node', position: POINT, radius: 0.12 })
      labels.push({ text: '(2, 1.5, 1)', position: nodeLabelAnchor(POINT, 0.12), color: '#FFB74D' })
    }
    if (completed) {
      obstacles.push({ type: 'vector', from: [POINT[0], 0, 0], to: POINT })
      obstacles.push({ type: 'vector', from: [0, POINT[1], 0], to: POINT })
      obstacles.push({ type: 'vector', from: [0, 0, POINT[2]], to: POINT })
    }
    return { labels, obstacles }
  }, [showX, showY, showZ, showPoint, completed])

  return (
    <group>
      {showX && <Vector3D start={ORIGIN} end={AXES[0].end} color={AXES[0].color} />}
      {showY && <Vector3D start={ORIGIN} end={AXES[1].end} color={AXES[1].color} />}
      {showZ && <Vector3D start={ORIGIN} end={AXES[2].end} color={AXES[2].color} />}
      {showPoint && <MolecularNode3D position={POINT} radius={0.12} color="#FFB74D" />}
      {completed && (
        <>
          <Vector3D start={[POINT[0], 0, 0]} end={POINT} color="#9AA5B8" thickness={0.02} />
          <Vector3D start={[0, POINT[1], 0]} end={POINT} color="#9AA5B8" thickness={0.02} />
          <Vector3D start={[0, 0, POINT[2]]} end={POINT} color="#9AA5B8" thickness={0.02} />
        </>
      )}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function CoordinateSystem3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D coordinate system: X, Y, and Z axes built up in order, a labeled coordinate point, and the completed system with projection lines"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
