'use client'
/**
 * PendulumMotion3D — Classical Mechanics 3D Foundation Sprint, Task 8.
 * revealStep-gated on the Universal 3D Engine:
 *   1 pivot · 2 string · 3 bob · 4 swing motion (animates) · 5 energy
 *   explanation (KE/PE indicator tracks the swing). Reuses ThreeDVisual.
 */
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

const PIVOT: [number, number, number] = [0, 2, 0]
const LENGTH = 2.6
const MAX_ANGLE = Math.PI / 4

function Scene({ revealStep }: { revealStep: number }) {
  const showPivot = revealStep >= 1
  const showString = revealStep >= 2
  const showBob = revealStep >= 3
  const swinging = revealStep >= 4
  const showEnergy = revealStep >= 5

  const groupRef = useRef<Group>(null)
  const t = useRef(0)
  const [angle, setAngle] = useState(MAX_ANGLE)

  useFrame((_, delta) => {
    if (!swinging) return
    t.current += delta
    const a = Math.sin(t.current * 1.6) * MAX_ANGLE
    setAngle(a)
    if (groupRef.current) groupRef.current.rotation.z = a
  })

  const bobX = Math.sin(angle) * LENGTH
  const bobY = -Math.cos(angle) * LENGTH
  // Normalized swing position: 0 at extremes (max PE), 1 at center (max KE).
  const swingFraction = 1 - Math.abs(angle) / MAX_ANGLE

  return (
    <group>
      {showPivot && (
        <mesh position={PIVOT}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#6B7A99" />
        </mesh>
      )}

      <group ref={groupRef} position={PIVOT}>
        {showString && !swinging && (
          <mesh position={[0, -LENGTH / 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, LENGTH, 8]} />
            <meshBasicMaterial color="#8FA8D9" />
          </mesh>
        )}
        {showBob && !swinging && (
          <mesh position={[0, -LENGTH, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
        )}
      </group>

      {swinging && (
        <>
          <mesh position={[bobX / 2, PIVOT[1] + bobY / 2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.02, 0.02, LENGTH, 8]} />
            <meshBasicMaterial color="#8FA8D9" />
          </mesh>
          <mesh position={[bobX, PIVOT[1] + bobY, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#5B8DEF"
              emissive={showEnergy ? '#FFB74D' : '#000000'}
              emissiveIntensity={showEnergy ? swingFraction * 0.7 : 0}
            />
          </mesh>
        </>
      )}

      {showEnergy && (
        <mesh position={[-2.6, swingFraction * 1.5 - 1, 0]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#81C784" />
        </mesh>
      )}
    </group>
  )
}

export function PendulumMotion3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={8}
      ariaLabel="3D pendulum motion: the pivot, string, bob, the swing motion animating, and an energy indicator tracking kinetic vs potential energy through the swing"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
