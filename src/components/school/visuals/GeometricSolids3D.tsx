'use client'
/**
 * GeometricSolids3D — Mathematics 3D Foundation Sprint, Task 5.
 * revealStep-gated: 1 cube · 2 sphere · 3 cylinder · 4 cone · 5 comparison
 * view (all four side by side). Reuses ThreeDVisual; plain Three.js solids.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 9
const SOLO_POS: [number, number, number] = [0, 0, 0]
const ROW_POS: [number, number, number][] = [[-3, 0, 0], [-1, 0, 0], [1, 0, 0], [3, 0, 0]]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showCube = revealStep >= 1
  const showSphere = revealStep >= 2
  const showCylinder = revealStep >= 3
  const showCone = revealStep >= 4
  const compare = revealStep >= 5

  const cubePos = compare ? ROW_POS[0] : SOLO_POS
  const spherePos = compare ? ROW_POS[1] : SOLO_POS
  const cylinderPos = compare ? ROW_POS[2] : SOLO_POS
  const conePos = compare ? ROW_POS[3] : SOLO_POS

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (compare) {
      for (const p of ROW_POS) obstacles.push({ type: 'node', position: p, radius: 0.55 })
      labels.push({ text: 'Cube · Sphere · Cylinder · Cone', position: [0, -1.1, 0], color: '#9AA5B8' })
    }
    return { labels, obstacles }
  }, [compare])

  return (
    <group>
      {showCube && !showSphere && (
        <mesh position={cubePos}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#FF6B6B" /></mesh>
      )}
      {showSphere && !showCylinder && (
        <mesh position={spherePos}><sphereGeometry args={[0.65, 24, 24]} /><meshStandardMaterial color="#5B8DEF" /></mesh>
      )}
      {showCylinder && !showCone && (
        <mesh position={cylinderPos}><cylinderGeometry args={[0.55, 0.55, 1.2, 24]} /><meshStandardMaterial color="#81C784" /></mesh>
      )}
      {showCone && !compare && (
        <mesh position={conePos}><coneGeometry args={[0.6, 1.2, 24]} /><meshStandardMaterial color="#FFB74D" /></mesh>
      )}

      {compare && (
        <>
          <mesh position={ROW_POS[0]}><boxGeometry args={[0.9, 0.9, 0.9]} /><meshStandardMaterial color="#FF6B6B" /></mesh>
          <mesh position={ROW_POS[1]}><sphereGeometry args={[0.55, 24, 24]} /><meshStandardMaterial color="#5B8DEF" /></mesh>
          <mesh position={ROW_POS[2]}><cylinderGeometry args={[0.45, 0.45, 1.0, 24]} /><meshStandardMaterial color="#81C784" /></mesh>
          <mesh position={ROW_POS[3]}><coneGeometry args={[0.5, 1.0, 24]} /><meshStandardMaterial color="#FFB74D" /></mesh>
        </>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function GeometricSolids3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D geometric solids: a cube, a sphere, a cylinder, a cone, each introduced in turn, then a side-by-side comparison view"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
