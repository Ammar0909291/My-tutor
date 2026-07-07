'use client'
/**
 * MemoryStorage3D — Computer Science 3D Foundation Sprint, Task 3.
 * revealStep-gated on the Universal 3D Engine: the memory hierarchy as a
 * speed-vs-size pyramid —
 *   1 CPU · 2 RAM · 3 cache · 4 storage · 5 data-movement path.
 * Faster/smaller tiers sit higher; slower/larger tiers sit lower.
 * Reuses ThreeDVisual + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'

interface Tier {
  label: string
  y: number
  width: number
  color: string
}

// Ordered top (fast/small) → bottom (slow/large).
const CPU: Tier = { label: 'CPU', y: 2.4, width: 1.0, color: '#5B8DEF' }
const CACHE: Tier = { label: 'Cache (fast, tiny)', y: 1.2, width: 1.6, color: '#4DD0E1' }
const RAM: Tier = { label: 'RAM (volatile)', y: 0, width: 2.6, color: '#FFB74D' }
const STORAGE: Tier = { label: 'Storage (persistent, large)', y: -1.4, width: 3.8, color: '#BA68C8' }

function TierBox({ tier }: { tier: Tier }) {
  return (
    <group>
      <mesh position={[0, tier.y, 0]}>
        <boxGeometry args={[tier.width, 0.8, 1]} />
        <meshStandardMaterial color={tier.color} />
      </mesh>
      <Html position={[0, tier.y, 0.6]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.8)' }}>
          {tier.label}
        </span>
      </Html>
    </group>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showCpu = revealStep >= 1
  const showRam = revealStep >= 2
  const showCache = revealStep >= 3
  const showStorage = revealStep >= 4
  const showPath = revealStep >= 5

  return (
    <group>
      {showCpu && <TierBox tier={CPU} />}
      {showRam && <TierBox tier={RAM} />}
      {showCache && <TierBox tier={CACHE} />}
      {showStorage && <TierBox tier={STORAGE} />}

      {showPath && (
        <group>
          {/* Data climbs the hierarchy toward the CPU as it is needed. */}
          <Vector3D start={[2, STORAGE.y, 0]} end={[2, RAM.y, 0]} color="#BA68C8" thickness={0.04} />
          <Vector3D start={[2, RAM.y, 0]} end={[2, CACHE.y, 0]} color="#FFB74D" thickness={0.04} />
          <Vector3D start={[2, CACHE.y, 0]} end={[2, CPU.y, 0]} color="#4DD0E1" thickness={0.04} />
          <Html position={[0, -2.6, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#5B8DEF', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
              Data moves up: storage → RAM → cache → CPU (faster, smaller each step)
            </span>
          </Html>
        </group>
      )}
    </group>
  )
}

export function MemoryStorage3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D memory hierarchy: the CPU, RAM, cache, and storage arranged as a speed-versus-size pyramid, and the path data takes moving up toward the CPU"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
