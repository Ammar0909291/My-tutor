'use client'
/**
 * QuantumTunneling3D — 3D Quantum Simulations Phase 1, Task 3.
 * revealStep-gated tunneling on the Universal 3D Engine:
 *   1 potential barrier · 2 incoming wave packet · 3 penetration (exponential
 *   decay inside) · 4 transmitted (reduced-amplitude) packet · 5 completed.
 * Educational goal: counter the "particle borrows energy" misconception — the
 * barrier height is FIXED and the transmitted packet has SMALLER amplitude
 * (lower probability), never extra energy. Reuses ThreeDVisual; narration-compatible.
 */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

function gaussianPoints(center: number, amplitude: number, width: number) {
  const pts: [number, number, number][] = []
  for (let x = -7; x <= 7; x += 0.2) {
    const y = amplitude * Math.exp(-Math.pow((x - center) / width, 2)) * Math.cos((x - center) * 4)
    pts.push([x, y, 0])
  }
  return pts
}

function Packet({ center, amplitude, color }: { center: number; amplitude: number; color: string }) {
  const pts = useMemo(() => gaussianPoints(center, amplitude, 1.1), [center, amplitude])
  return (
    <group>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const incomingRef = useRef<Mesh>(null)
  const t = useRef(0)

  const showBarrier = revealStep >= 1
  const showIncoming = revealStep >= 2
  const penetrating = revealStep >= 3
  const transmitted = revealStep >= 4
  const completed = revealStep >= 5

  useFrame((_, delta) => {
    if (showIncoming && !transmitted) t.current += delta * 0.6
  })

  return (
    <group>
      {/* Fixed potential barrier — height never changes (no "borrowed energy") */}
      {showBarrier && (
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 2, 2]} />
          <meshStandardMaterial color="#7E57C2" transparent opacity={0.55} />
        </mesh>
      )}

      {/* Incoming full-amplitude packet (left of barrier) */}
      {showIncoming && !transmitted && (
        <Packet center={-3.5} amplitude={1.4} color="#4DD0E1" />
      )}

      {/* Penetration: exponentially decaying tail inside the barrier */}
      {penetrating && !transmitted && (
        <group>
          {Array.from({ length: 6 }).map((_, i) => {
            const x = -0.4 + i * 0.16
            const decay = 1.4 * Math.exp(-i * 0.5)
            return (
              <mesh key={i} position={[x, decay * 0.5, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshBasicMaterial color="#FFB74D" />
              </mesh>
            )
          })}
        </group>
      )}

      {/* Transmitted packet — SMALLER amplitude (lower probability, same energy) */}
      {transmitted && (
        <Packet center={3.5} amplitude={completed ? 0.5 : 0.7} color="#81C784" />
      )}

      {/* Baseline axis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.02, 0.02]} />
        <meshBasicMaterial color="#444B5E" />
      </mesh>
    </group>
  )
}

export function QuantumTunneling3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={11}
      ariaLabel="3D quantum tunneling: a fixed-height potential barrier, an incoming wave packet, exponential penetration inside the barrier, and a reduced-amplitude transmitted packet — illustrating that energy is not borrowed, only transmission probability is reduced"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
