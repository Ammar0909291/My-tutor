'use client'
/**
 * GeometricSolids3D — Mathematics 3D Foundation Sprint, Task 5.
 * revealStep-gated: 1 cube · 2 sphere · 3 cylinder · 4 cone · 5 comparison
 * view (all four side by side). Reuses ThreeDVisual; plain Three.js solids.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'

const SOLO_POS: [number, number, number] = [0, 0, 0]
const ROW_POS: [number, number, number][] = [[-3, 0, 0], [-1, 0, 0], [1, 0, 0], [3, 0, 0]]

function Scene({ revealStep }: { revealStep: number }) {
  const showCube = revealStep >= 1
  const showSphere = revealStep >= 2
  const showCylinder = revealStep >= 3
  const showCone = revealStep >= 4
  const compare = revealStep >= 5

  const cubePos = compare ? ROW_POS[0] : SOLO_POS
  const spherePos = compare ? ROW_POS[1] : SOLO_POS
  const cylinderPos = compare ? ROW_POS[2] : SOLO_POS
  const conePos = compare ? ROW_POS[3] : SOLO_POS

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
          <Html position={[0, -1.1, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9AA5B8', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
              Cube · Sphere · Cylinder · Cone
            </span>
          </Html>
        </>
      )}
    </group>
  )
}

export function GeometricSolids3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D geometric solids: a cube, a sphere, a cylinder, a cone, each introduced in turn, then a side-by-side comparison view"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
