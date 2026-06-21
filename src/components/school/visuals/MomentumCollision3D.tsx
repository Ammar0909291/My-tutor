'use client'
/**
 * MomentumCollision3D — Classical Mechanics 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine:
 *   1 two objects · 2 motion vectors · 3 collision (objects meet) · 4 momentum
 *   transfer (highlighted exchange) · 5 final velocities (post-collision
 *   motion). Reuses ThreeDVisual + Vector3D.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'

const START_A: [number, number, number] = [-3, 0.5, 0]
const START_B: [number, number, number] = [3, 0.5, 0]
const MEET = 0

function Scene({ revealStep }: { revealStep: number }) {
  const showObjects = revealStep >= 1
  const showVectors = revealStep >= 2
  const colliding = revealStep >= 3
  const transferring = revealStep >= 4
  const finalState = revealStep >= 5

  const aRef = useRef<Mesh>(null)
  const bRef = useRef<Mesh>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!colliding) return
    t.current = Math.min(1, t.current + delta * 0.5)
    if (aRef.current) {
      const ax = finalState ? MEET - (1 - t.current) * 0.3 : START_A[0] + t.current * (MEET - START_A[0])
      aRef.current.position.set(ax, 0.5, 0)
    }
    if (bRef.current) {
      const bx = finalState ? MEET + (1 - t.current) * 0.3 + 1.5 : START_B[0] + t.current * (MEET - START_B[0] + 0.3)
      bRef.current.position.set(bx, 0.5, 0)
    }
  })

  return (
    <group>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#3A4356" />
      </mesh>

      {showObjects && (
        <>
          <mesh ref={aRef} position={START_A}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
          <mesh ref={bRef} position={START_B}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
        </>
      )}

      {showVectors && !colliding && (
        <>
          <Vector3D start={START_A} end={[START_A[0] + 1.5, START_A[1], 0]} color="#81C784" label="vA" />
          <Vector3D start={START_B} end={[START_B[0] - 1.2, START_B[1], 0]} color="#FFB74D" label="vB" />
        </>
      )}

      {transferring && !finalState && (
        <mesh position={[MEET, 0.5, 0]}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
        </mesh>
      )}

      {finalState && (
        <>
          <Vector3D start={[MEET - 0.3, 0.5, 0]} end={[MEET - 1.3, 0.5, 0]} color="#5B8DEF" label="vA'" />
          <Vector3D start={[MEET + 1.5, 0.5, 0]} end={[MEET + 2.5, 0.5, 0]} color="#FF6B6B" label="vB'" />
        </>
      )}
    </group>
  )
}

export function MomentumCollision3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D momentum collision: two objects with motion vectors, the moment of collision, the momentum transfer between them, and the final post-collision velocities"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
