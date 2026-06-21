'use client'
/**
 * VectorVisualization3D — Mathematics 3D Foundation Sprint, Task 3.
 * revealStep-gated: 1 origin · 2 vector arrow · 3 magnitude · 4 direction ·
 * 5 completed visualization. Reuses ThreeDVisual + Vector3D directly.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'

const ORIGIN: [number, number, number] = [0, 0, 0]
const TIP: [number, number, number] = [2.5, 1.8, 1.2]
const MAGNITUDE = Math.sqrt(TIP[0] ** 2 + TIP[1] ** 2 + TIP[2] ** 2)

function Scene({ revealStep }: { revealStep: number }) {
  const showOrigin = revealStep >= 1
  const showVector = revealStep >= 2
  const showMagnitude = revealStep >= 3
  const showDirection = revealStep >= 4
  const completed = revealStep >= 5

  return (
    <group>
      {showOrigin && (
        <mesh position={ORIGIN}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#9AA5B8" />
        </mesh>
      )}
      {showVector && <Vector3D start={ORIGIN} end={TIP} color="#5B8DEF" label="v" />}
      {showMagnitude && (
        <Html position={[TIP[0] / 2, TIP[1] / 2 + 0.3, TIP[2] / 2]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FFB74D', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            |v| = {MAGNITUDE.toFixed(2)}
          </span>
        </Html>
      )}
      {showDirection && (
        <>
          <Vector3D start={ORIGIN} end={[TIP[0], 0, 0]} color="#FF6B6B" thickness={0.02} label="x" />
          <Vector3D start={ORIGIN} end={[0, TIP[1], 0]} color="#81C784" thickness={0.02} label="y" />
          <Vector3D start={ORIGIN} end={[0, 0, TIP[2]]} color="#4DD0E1" thickness={0.02} label="z" />
        </>
      )}
      {completed && (
        <Html position={[0, -1.4, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#5B8DEF', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            Vector v = (x, y, z) components + magnitude
          </span>
        </Html>
      )}
    </group>
  )
}

export function VectorVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={7}
      ariaLabel="3D vector visualization: the origin, the vector arrow, its magnitude, its directional components, and the completed visualization"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
