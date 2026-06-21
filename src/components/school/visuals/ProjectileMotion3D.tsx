'use client'
/**
 * ProjectileMotion3D — Classical Mechanics 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine:
 *   1 ground plane · 2 launch point · 3 projectile path (parabolic arc traced)
 *   4 velocity vector (at launch, decomposed) · 5 completed trajectory with
 *   the projectile animating along the arc. Reuses ThreeDVisual + Vector3D.
 */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'

const LAUNCH: [number, number, number] = [-4, 0, 0]
const G = 4
const V0X = 2.2
const V0Y = 4.2

function arcPoints(steps = 60) {
  const pts: [number, number, number][] = []
  let t = 0
  const dt = 0.04
  for (let i = 0; i <= steps; i++) {
    const x = LAUNCH[0] + V0X * t
    const y = Math.max(0, LAUNCH[1] + V0Y * t - 0.5 * G * t * t)
    pts.push([x, y, 0])
    if (y <= 0 && i > 5) break
    t += dt
  }
  return pts
}

function Scene({ revealStep }: { revealStep: number }) {
  const showGround = revealStep >= 1
  const showLaunch = revealStep >= 2
  const showPath = revealStep >= 3
  const showVelocity = revealStep >= 4
  const completed = revealStep >= 5

  const path = useMemo(() => arcPoints(), [])
  const ballRef = useRef<Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!completed || !ballRef.current) return
    elapsed.current = (elapsed.current + delta * 0.5) % 1
    const idx = Math.floor(elapsed.current * (path.length - 1))
    const p = path[idx]
    ballRef.current.position.set(p[0], p[1], p[2])
  })

  return (
    <group>
      {showGround && (
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#3A4356" />
        </mesh>
      )}

      {showLaunch && (
        <mesh position={LAUNCH}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#5B8DEF" />
        </mesh>
      )}

      {showPath && (
        <group>
          {path.map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshBasicMaterial color="#81C784" />
            </mesh>
          ))}
        </group>
      )}

      {showVelocity && (
        <group>
          <Vector3D start={LAUNCH} end={[LAUNCH[0] + V0X, LAUNCH[1], LAUNCH[2]]} color="#FFB74D" label="vₓ" />
          <Vector3D start={LAUNCH} end={[LAUNCH[0], LAUNCH[1] + V0Y, LAUNCH[2]]} color="#4DD0E1" label="vy" />
          <Vector3D start={LAUNCH} end={[LAUNCH[0] + V0X, LAUNCH[1] + V0Y, LAUNCH[2]]} color="#FF6B6B" label="v" />
        </group>
      )}

      {completed && (
        <mesh ref={ballRef} position={LAUNCH}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.4} />
        </mesh>
      )}
    </group>
  )
}

export function ProjectileMotion3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D projectile motion: a ground plane, a launch point, the traced parabolic path, the decomposed launch velocity vector, and the projectile animating along its completed trajectory"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
