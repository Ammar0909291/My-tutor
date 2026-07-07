'use client'
/**
 * SternGerlach3D — 3D Quantum Simulations Phase 1, Task 5.
 * revealStep-gated Stern–Gerlach on the Universal 3D Engine:
 *   1 particle beam · 2 magnet · 3 beam enters field · 4 beam splits (two
 *   discrete paths) · 5 detectors register spin-up / spin-down.
 * Educational goal: show spin quantization — a continuous classical beam would
 * smear, but the quantum beam splits into exactly two discrete spots.
 * Reuses ThreeDVisual; narration-compatible via revealStep.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

function Scene({ revealStep }: { revealStep: number }) {
  const beamRef = useRef<Group>(null)
  const t = useRef(0)

  const showBeam = revealStep >= 1
  const showMagnet = revealStep >= 2
  const entering = revealStep >= 3
  const splitting = revealStep >= 4
  const detectors = revealStep >= 5

  useFrame((_, delta) => {
    if (entering) t.current += delta
  })

  return (
    <group>
      {/* Source */}
      {showBeam && (
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.8]} />
          <meshStandardMaterial color="#5B6B8C" />
        </mesh>
      )}

      {/* Incoming straight beam before the field */}
      {showBeam && !splitting && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-4.5 + i * 0.5, 0, 0]}>
              <sphereGeometry args={[0.08, 10, 10]} />
              <meshBasicMaterial color="#4DD0E1" />
            </mesh>
          ))}
        </group>
      )}

      {/* Magnet poles (inhomogeneous field) */}
      {showMagnet && (
        <group position={[-1, 0, 0]}>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[2.2, 0.5, 1.6]} />
            <meshStandardMaterial color="#EF5350" />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <boxGeometry args={[2.2, 0.5, 1.6]} />
            <meshStandardMaterial color="#42A5F5" />
          </mesh>
        </group>
      )}

      {/* Split beams — exactly two discrete deflected paths */}
      {splitting && (
        <group>
          {[1, -1].map((dir) =>
            Array.from({ length: 6 }).map((_, i) => {
              const x = 0.3 + i * 0.55
              const y = dir * (i * 0.18)
              return (
                <mesh key={`${dir}-${i}`} position={[x, y, 0]}>
                  <sphereGeometry args={[0.08, 10, 10]} />
                  <meshBasicMaterial color={dir > 0 ? '#FFD166' : '#81C784'} />
                </mesh>
              )
            }),
          )}
        </group>
      )}

      {/* Detector screen with two discrete spots */}
      {detectors && (
        <group position={[4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.1, 3.2, 1.6]} />
            <meshStandardMaterial color="#1B2030" />
          </mesh>
          <mesh position={[0.08, 1, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.08, -1, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  )
}

export function SternGerlach3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={10}
      ariaLabel="3D Stern–Gerlach experiment: a particle beam, an inhomogeneous magnet, the beam entering the field, splitting into two discrete paths, and two detector spots showing spin-up and spin-down"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
