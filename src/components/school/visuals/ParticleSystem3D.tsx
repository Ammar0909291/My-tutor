'use client'
/**
 * ParticleSystem3D — 3D Educational Engine Foundation Sprint 1, Task 4.
 * First production demo of the 3D engine: a reusable particle simulation
 * usable later by Quantum Physics (wavefunction clouds), Classical Mechanics
 * (gas particles, collisions), Chemistry (molecular motion), etc.
 * revealStep-gated exactly like every existing SVG teaching visual:
 *   1 → particles appear
 *   2 → movement begins
 *   3 → interactions (proximity links) appear
 *   4 → one particle is highlighted
 *   5 → completed simulation (full effect)
 */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { ThreeDVisual } from './ThreeDVisual'

const PARTICLE_COUNT = 14
const HIGHLIGHT_INDEX = 3
const LINK_DISTANCE = 2.2

interface Particle {
  basePosition: [number, number, number]
  phase: number
  speed: number
}

function useParticleSeeds(): Particle[] {
  return useMemo(() => {
    const seeds: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = (i / PARTICLE_COUNT) * Math.PI * 2
      const radius = 1.4 + (i % 3) * 0.5
      seeds.push({
        basePosition: [
          Math.cos(theta) * radius,
          Math.sin(theta * 1.3) * radius * 0.6,
          Math.sin(theta) * radius,
        ],
        phase: theta,
        speed: 0.4 + (i % 5) * 0.08,
      })
    }
    return seeds
  }, [])
}

function ParticleField({ revealStep }: { revealStep: number }) {
  const seeds = useParticleSeeds()
  const groupRef = useRef<Group>(null)
  const meshRefs = useRef<(Mesh | null)[]>([])
  const linesRef = useRef<Group>(null)
  const elapsed = useRef(0)

  const moving = revealStep >= 2
  const showInteractions = revealStep >= 3
  const showHighlight = revealStep >= 4
  const completed = revealStep >= 5

  useFrame((_, delta) => {
    if (moving) elapsed.current += delta

    seeds.forEach((seed, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return
      const [bx, by, bz] = seed.basePosition
      if (moving) {
        const t = elapsed.current * seed.speed
        mesh.position.set(
          bx + Math.sin(t + seed.phase) * 0.35,
          by + Math.cos(t * 0.8 + seed.phase) * 0.35,
          bz + Math.sin(t * 0.6 + seed.phase) * 0.35,
        )
      } else {
        mesh.position.set(bx, by, bz)
      }
    })

    if (linesRef.current) linesRef.current.visible = showInteractions
  })

  return (
    <group ref={groupRef}>
      {seeds.map((seed, i) => {
        const isHighlighted = showHighlight && i === HIGHLIGHT_INDEX
        return (
          <mesh
            key={i}
            ref={(m) => {
              meshRefs.current[i] = m
            }}
            position={seed.basePosition}
          >
            <sphereGeometry args={[isHighlighted ? 0.22 : 0.13, 16, 16]} />
            <meshStandardMaterial
              color={isHighlighted ? '#FF6B6B' : completed ? '#5B8DEF' : '#8FA8D9'}
              emissive={isHighlighted ? '#FF6B6B' : '#000000'}
              emissiveIntensity={isHighlighted ? 0.6 : 0}
            />
          </mesh>
        )
      })}
      <group ref={linesRef} visible={showInteractions}>
        <ParticleLinks seeds={seeds} active={showInteractions} />
      </group>
    </group>
  )
}

function ParticleLinks({ seeds, active }: { seeds: Particle[]; active: boolean }) {
  const linkPairs = useMemo(() => {
    const pairs: [number, number][] = []
    for (let i = 0; i < seeds.length; i++) {
      for (let j = i + 1; j < seeds.length; j++) {
        const [ax, ay, az] = seeds[i].basePosition
        const [bx, by, bz] = seeds[j].basePosition
        const dist = Math.hypot(ax - bx, ay - by, az - bz)
        if (dist < LINK_DISTANCE) pairs.push([i, j])
      }
    }
    return pairs
  }, [seeds])

  if (!active) return null

  return (
    <>
      {linkPairs.map(([i, j], idx) => {
        const a = seeds[i].basePosition
        const b = seeds[j].basePosition
        const mid: [number, number, number] = [
          (a[0] + b[0]) / 2,
          (a[1] + b[1]) / 2,
          (a[2] + b[2]) / 2,
        ]
        const length = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
        return (
          <mesh key={idx} position={mid}>
            <cylinderGeometry args={[0.015, 0.015, length, 6]} />
            <meshBasicMaterial color="#6B7A99" transparent opacity={0.5} />
          </mesh>
        )
      })}
    </>
  )
}

export function ParticleSystem3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual revealStep={revealStep} ariaLabel="Reusable 3D particle simulation showing particles, motion, proximity interactions, and a highlighted particle">
      <ParticleField revealStep={revealStep} />
    </ThreeDVisual>
  )
}
