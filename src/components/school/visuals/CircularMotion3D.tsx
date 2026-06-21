'use client'
/**
 * CircularMotion3D — Classical Mechanics 3D Foundation Sprint, Task 7.
 * revealStep-gated on the Universal 3D Engine:
 *   1 orbit path · 2 moving body · 3 velocity vector (tangential) · 4
 *   centripetal force vector (inward) · 5 full motion explanation (body
 *   animates around the path with both vectors live). Reuses ThreeDVisual +
 *   Vector3D.
 */
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'

const RADIUS = 2.5

function orbitPoints(steps = 48) {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    pts.push([Math.cos(theta) * RADIUS, 0, Math.sin(theta) * RADIUS])
  }
  return pts
}

function Scene({ revealStep }: { revealStep: number }) {
  const showPath = revealStep >= 1
  const showBody = revealStep >= 2
  const showVelocity = revealStep >= 3
  const showCentripetal = revealStep >= 4
  const animating = revealStep >= 5

  const path = useMemo(() => orbitPoints(), [])
  const bodyRef = useRef<Mesh>(null)
  const angle = useRef(0)
  const [pos, setPos] = useState<[number, number, number]>([RADIUS, 0, 0])

  useFrame((_, delta) => {
    if (!animating) return
    angle.current += delta * 0.7
    const x = Math.cos(angle.current) * RADIUS
    const z = Math.sin(angle.current) * RADIUS
    if (bodyRef.current) bodyRef.current.position.set(x, 0, z)
    setPos([x, 0, z])
  })

  const bodyPos: [number, number, number] = animating ? pos : [RADIUS, 0, 0]
  const tangent: [number, number, number] = [-Math.sin(angle.current), 0, Math.cos(angle.current)]
  const inward: [number, number, number] = [-bodyPos[0] / RADIUS, 0, -bodyPos[2] / RADIUS]

  return (
    <group>
      {showPath && (
        <group>
          {path.map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshBasicMaterial color="#6B7A99" />
            </mesh>
          ))}
        </group>
      )}

      {showBody && (
        <mesh ref={bodyRef} position={bodyPos}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#5B8DEF" />
        </mesh>
      )}

      {showVelocity && (
        <Vector3D
          start={bodyPos}
          end={[bodyPos[0] + tangent[0] * 1.3, bodyPos[1], bodyPos[2] + tangent[2] * 1.3]}
          color="#81C784"
          label="v"
        />
      )}

      {showCentripetal && (
        <Vector3D
          start={bodyPos}
          end={[bodyPos[0] + inward[0] * 1.1, bodyPos[1], bodyPos[2] + inward[2] * 1.1]}
          color="#FF6B6B"
          label="Fc"
        />
      )}

      {/* center marker */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#FFB74D" />
      </mesh>
    </group>
  )
}

export function CircularMotion3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D circular motion: the orbit path, a moving body, its tangential velocity vector, the inward centripetal force vector, and the body animating around the full path with both vectors live"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
