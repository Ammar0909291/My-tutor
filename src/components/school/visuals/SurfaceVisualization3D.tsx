'use client'
/**
 * SurfaceVisualization3D — Mathematics 3D Foundation Sprint, Task 4.
 * revealStep-gated: 1 axes · 2 grid · 3 surface generation · 4 contours ·
 * 5 completed surface. Renders z = x² + y² (a paraboloid). Reuses ThreeDVisual
 * + Vector3D for axes.
 */
import { useMemo } from 'react'
import { PlaneGeometry } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D, vectorLabelAnchor } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 8
const ORIGIN: [number, number, number] = [0, 0, 0]
// The axes group is counter-rotated back to world orientation, so these ends
// are already world coordinates — which is what the label layer needs.
const AXES: { end: [number, number, number]; color: string; text: string }[] = [
  { end: [3, 0, 0], color: '#FF6B6B', text: 'x' },
  { end: [0, 3, 0], color: '#81C784', text: 'z (height)' },
  { end: [0, 0, 3], color: '#5B8DEF', text: 'y' },
]
const SIZE = 3
const SEGMENTS = 24

function buildSurfaceGeometry() {
  const geom = new PlaneGeometry(SIZE * 2, SIZE * 2, SEGMENTS, SEGMENTS)
  const pos = geom.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = (x * x + y * y) * 0.12
    pos.setZ(i, z)
  }
  pos.needsUpdate = true
  geom.computeVertexNormals()
  return geom
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showAxes = revealStep >= 1
  const showGrid = revealStep >= 2
  const showSurface = revealStep >= 3
  const showContours = revealStep >= 4
  const completed = revealStep >= 5

  const surfaceGeom = useMemo(() => buildSurfaceGeometry(), [])

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showAxes) {
      for (const axis of AXES) {
        obstacles.push({ type: 'vector', from: ORIGIN, to: axis.end })
        labels.push({ text: axis.text, position: vectorLabelAnchor(ORIGIN, axis.end), color: axis.color })
      }
    }
    return { labels, obstacles }
  }, [showAxes])

  return (
    <group>
      {/* The label layer sits OUTSIDE the rotated group: placement returns
          world coordinates, and a rotated parent would re-rotate them. */}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
      {showAxes && (
        <group rotation={[Math.PI / 2, 0, 0]}>
          {AXES.map((axis) => (
            <Vector3D key={axis.text} start={ORIGIN} end={axis.end} color={axis.color} />
          ))}
        </group>
      )}

      {showGrid && !showSurface && (
        <mesh>
          <planeGeometry args={[SIZE * 2, SIZE * 2, SEGMENTS, SEGMENTS]} />
          <meshBasicMaterial color="#4DD0E1" wireframe transparent opacity={0.4} />
        </mesh>
      )}

      {showSurface && (
        <mesh geometry={surfaceGeom}>
          <meshStandardMaterial color="#5B8DEF" wireframe={!completed} transparent opacity={completed ? 0.85 : 0.6} side={2} />
        </mesh>
      )}

      {showContours &&
        [0.3, 0.7, 1.1].map((h, i) => (
          <mesh key={i} position={[0, 0, h]}>
            <ringGeometry args={[Math.sqrt(h / 0.12) - 0.02, Math.sqrt(h / 0.12), 48]} />
            <meshBasicMaterial color="#FFB74D" transparent opacity={0.6} side={2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function SurfaceVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D surface visualization of z = x squared plus y squared: axes, a flat grid, the generated curved surface, contour rings, and the completed shaded surface"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
