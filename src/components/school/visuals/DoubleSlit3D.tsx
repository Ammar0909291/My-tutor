'use client'
/**
 * DoubleSlit3D — 3D Quantum Simulations Phase 1, Task 2.
 * revealStep-gated double-slit experiment on the Universal 3D Engine:
 *   1 source · 2 barrier+slits · 3 wave propagation · 4 interference emerging
 *   5 completed interference screen.
 * Reuses ThreeDVisual wrapper; mobile-safe; narration-compatible via revealStep.
 */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

function Scene({ revealStep }: { revealStep: number }) {
  const wavesRef = useRef<Group>(null)
  const t = useRef(0)

  const showSource = revealStep >= 1
  const showBarrier = revealStep >= 2
  const propagate = revealStep >= 3
  const showPattern = revealStep >= 4
  const completed = revealStep >= 5

  // Interference fringe intensities across the screen (cos² envelope).
  const fringes = useMemo(() => {
    const bars: { y: number; intensity: number }[] = []
    for (let i = -6; i <= 6; i++) {
      const y = i * 0.45
      const intensity = Math.pow(Math.cos(i * 0.9), 2)
      bars.push({ y, intensity })
    }
    return bars
  }, [])

  useFrame((_, delta) => {
    if (propagate && wavesRef.current) {
      t.current += delta
      wavesRef.current.children.forEach((child, i) => {
        const scale = ((t.current * 1.2 + i * 0.5) % 3)
        child.scale.set(scale, scale, 1)
        const mat = (child as any).children?.[0]?.material
        if (mat) mat.opacity = Math.max(0, 0.5 - scale * 0.16)
      })
    }
  })

  return (
    <group>
      {/* Source */}
      {showSource && (
        <mesh position={[-4, 0, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.7} />
        </mesh>
      )}

      {/* Barrier with two slits (three blocks leaving two gaps) */}
      {showBarrier && (
        <group position={[-1.2, 0, 0]}>
          {[1.7, 0, -1.7].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[0.2, i === 1 ? 1.2 : 1.6, 2]} />
              <meshStandardMaterial color="#5B6B8C" />
            </mesh>
          ))}
        </group>
      )}

      {/* Expanding circular wavefronts from each slit */}
      {propagate && (
        <group ref={wavesRef} position={[-1.1, 0, 0]}>
          {[0.8, -0.8].map((y, s) =>
            [0, 1, 2].map((r) => (
              <group key={`${s}-${r}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh>
                  <ringGeometry args={[0.6, 0.66, 40]} />
                  <meshBasicMaterial color="#4DD0E1" transparent opacity={0.4} />
                </mesh>
              </group>
            )),
          )}
        </group>
      )}

      {/* Interference screen with fringes */}
      {showPattern && (
        <group position={[4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.1, 6, 2]} />
            <meshStandardMaterial color="#1B2030" />
          </mesh>
          {fringes.map((f, i) => (
            <mesh key={i} position={[0.08, f.y, 0]}>
              <boxGeometry args={[0.04, 0.34, 1.8]} />
              <meshBasicMaterial
                color="#4DD0E1"
                transparent
                opacity={(completed ? 1 : 0.6) * f.intensity}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}

export function DoubleSlit3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D double-slit experiment: a source, a two-slit barrier, propagating wavefronts, and a building interference pattern on the screen"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
