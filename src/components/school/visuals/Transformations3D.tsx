'use client'
/**
 * Transformations3D — Mathematics 3D Foundation Sprint, Task 6.
 * revealStep-gated: 1 original shape · 2 translation · 3 rotation · 4 scaling ·
 * 5 final comparison view. Reuses ThreeDVisual; plain Three.js box geometry.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'

const ORIGINAL_POS: [number, number, number] = [0, 0, 0]
const TRANSLATED_POS: [number, number, number] = [2.2, 0.8, 0]
const ROTATION: [number, number, number] = [0, Math.PI / 4, Math.PI / 6]
const SCALE: [number, number, number] = [1.5, 1.5, 1.5]

const ROW_POS: [number, number, number][] = [[-3, 0, 0], [-1, 0, 0], [1, 0, 0], [3, 0, 0]]

function Scene({ revealStep }: { revealStep: number }) {
  const showOriginal = revealStep >= 1
  const showTranslation = revealStep >= 2
  const showRotation = revealStep >= 3
  const showScaling = revealStep >= 4
  const compare = revealStep >= 5

  return (
    <group>
      {showOriginal && !compare && (
        <mesh position={ORIGINAL_POS}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#9AA5B8" />
        </mesh>
      )}

      {showTranslation && !compare && (
        <mesh position={TRANSLATED_POS}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
      )}

      {showRotation && !compare && (
        <mesh position={ORIGINAL_POS} rotation={ROTATION}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#5B8DEF" />
        </mesh>
      )}

      {showScaling && !compare && (
        <mesh position={ORIGINAL_POS} scale={SCALE}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#81C784" />
        </mesh>
      )}

      {compare && (
        <>
          <mesh position={ROW_POS[0]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#9AA5B8" />
          </mesh>
          <mesh position={ROW_POS[1]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          <mesh position={ROW_POS[2]} rotation={ROTATION}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
          <mesh position={ROW_POS[3]} scale={[1.3, 1.3, 1.3]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#81C784" />
          </mesh>
          <Html position={[0, -1.1, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9AA5B8', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
              Original · Translation · Rotation · Scaling
            </span>
          </Html>
        </>
      )}
    </group>
  )
}

export function Transformations3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D geometric transformations: an original cube, then its translation, rotation, and scaling, each introduced in turn, then a side-by-side comparison view"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
