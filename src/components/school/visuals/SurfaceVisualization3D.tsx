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
import { Vector3D } from './Vector3D'

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

function Scene({ revealStep }: { revealStep: number }) {
  const showAxes = revealStep >= 1
  const showGrid = revealStep >= 2
  const showSurface = revealStep >= 3
  const showContours = revealStep >= 4
  const completed = revealStep >= 5

  const surfaceGeom = useMemo(() => buildSurfaceGeometry(), [])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {showAxes && (
        <group rotation={[Math.PI / 2, 0, 0]}>
          <Vector3D start={[0, 0, 0]} end={[3, 0, 0]} color="#FF6B6B" label="x" />
          <Vector3D start={[0, 0, 0]} end={[0, 3, 0]} color="#81C784" label="z (height)" />
          <Vector3D start={[0, 0, 0]} end={[0, 0, 3]} color="#5B8DEF" label="y" />
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
  )
}

export function SurfaceVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={8}
      ariaLabel="3D surface visualization of z = x squared plus y squared: axes, a flat grid, the generated curved surface, contour rings, and the completed shaded surface"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
