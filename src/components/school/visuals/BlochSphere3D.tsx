'use client'
/**
 * BlochSphere3D — 3D Quantum Simulations Phase 1, Task 4.
 * revealStep-gated Bloch sphere on the Universal 3D Engine:
 *   1 sphere · 2 |0⟩/|1⟩ poles · 3 equator · 4 state vector · 5 phase rotation.
 * Educational goal: teach superposition (the vector points between poles) and
 * phase (the vector precesses around the equator). Reuses ThreeDVisual;
 * narration-compatible via revealStep.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

function Scene({ revealStep }: { revealStep: number }) {
  const vectorRef = useRef<Group>(null)
  const phase = useRef(0)

  const showSphere = revealStep >= 1
  const showPoles = revealStep >= 2
  const showEquator = revealStep >= 3
  const showVector = revealStep >= 4
  const showPhase = revealStep >= 5

  useFrame((_, delta) => {
    if (showPhase && vectorRef.current) {
      phase.current += delta * 0.8
      vectorRef.current.rotation.y = phase.current
    }
  })

  // State vector at polar angle 60° (a superposition), azimuth handled by group rotation.
  const theta = Math.PI / 3
  const vx = Math.sin(theta) * 2
  const vy = Math.cos(theta) * 2

  const equatorPts: [number, number, number][] = Array.from({ length: 65 }, (_, i) => {
    const a = (i / 64) * Math.PI * 2
    return [Math.cos(a) * 2, 0, Math.sin(a) * 2]
  })

  return (
    <group>
      {showSphere && (
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#5B8DEF" transparent opacity={0.18} wireframe={false} />
        </mesh>
      )}

      {/* Poles */}
      {showPoles && (
        <group>
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#88AAFF" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, -2, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.4} />
          </mesh>
          <Line points={[[0, -2.2, 0], [0, 2.2, 0]]} color="#9AA7C2" lineWidth={1} />
        </group>
      )}

      {/* Equator */}
      {showEquator && <Line points={equatorPts} color="#4DD0E1" lineWidth={1.5} />}

      {/* State vector (precesses around y when phase step active) */}
      {showVector && (
        <group ref={vectorRef}>
          <Line points={[[0, 0, 0], [vx, vy, 0]]} color="#FFD166" lineWidth={3} />
          <mesh position={[vx, vy, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  )
}

export function BlochSphere3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={6}
      ariaLabel="3D Bloch sphere: the sphere, |0⟩ and |1⟩ poles, the equator, a state vector pointing to a superposition, and phase precession around the vertical axis"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
