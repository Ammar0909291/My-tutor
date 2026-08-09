'use client'
/**
 * MemoryStorage3D — Computer Science 3D Foundation Sprint, Task 3.
 * revealStep-gated on the Universal 3D Engine: the memory hierarchy as a
 * speed-vs-size pyramid —
 *   1 CPU · 2 RAM · 3 cache · 4 storage · 5 data-movement path.
 * Faster/smaller tiers sit higher; slower/larger tiers sit lower.
 * Reuses ThreeDVisual + Vector3D (no new primitives).
 *
 * A TIER'S NAME IS INSIDE ITS BOX, and that is the design — so the boxes are
 * NOT declared as obstacles for their own captions. Obstacles are what a label
 * must stay clear of; a container a label deliberately sits in is not one. The
 * path arrows and the summary caption are still solved against each other, and
 * every label is still held inside the canvas.
 *
 * The tier names are drawn in the engine's neutral INK, not in white. A wide
 * name overhangs its own box — "Storage (persistent, large)" is wider than the
 * widest tier — and white text that leaves the box lands on the light-theme
 * canvas, where it cannot be read at all.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'
import { ROLE, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'

interface Tier {
  label: string
  y: number
  width: number
  color: string
}

const CAMERA_DISTANCE = 9

// Ordered top (fast/small) → bottom (slow/large).
const CPU: Tier = { label: 'CPU', y: 2.4, width: 1.0, color: '#5B8DEF' }
const CACHE: Tier = { label: 'Cache (fast, tiny)', y: 1.2, width: 1.6, color: '#4DD0E1' }
const RAM: Tier = { label: 'RAM (volatile)', y: 0, width: 2.6, color: '#FFB74D' }
const STORAGE: Tier = { label: 'Storage (persistent, large)', y: -1.4, width: 3.8, color: '#BA68C8' }

/** Where a tier's name sits: on the front face of its own box. */
function tierLabelAnchor(tier: Tier): [number, number, number] {
  return [0, tier.y, 0.6]
}

function TierBox({ tier }: { tier: Tier }) {
  return (
    <mesh position={[0, tier.y, 0]}>
      <boxGeometry args={[tier.width, 0.8, 1]} />
      <meshStandardMaterial color={tier.color} />
    </mesh>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showCpu = revealStep >= 1
  const showRam = revealStep >= 2
  const showCache = revealStep >= 3
  const showStorage = revealStep >= 4
  const showPath = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    const tier = (show: boolean, t: Tier) => {
      if (show) labels.push({ text: t.label, position: tierLabelAnchor(t), color: themeColor(ROLE.ink, theme) ?? ROLE.ink })
    }
    tier(showCpu, CPU)
    tier(showRam, RAM)
    tier(showCache, CACHE)
    tier(showStorage, STORAGE)
    if (showPath) {
      obstacles.push({ type: 'vector', from: [2, STORAGE.y, 0], to: [2, RAM.y, 0] })
      obstacles.push({ type: 'vector', from: [2, RAM.y, 0], to: [2, CACHE.y, 0] })
      obstacles.push({ type: 'vector', from: [2, CACHE.y, 0], to: [2, CPU.y, 0] })
      labels.push({
        text: 'Data moves up: storage → RAM → cache → CPU (faster, smaller each step)',
        position: [0, -2.6, 0],
        color: '#5B8DEF',
      })
    }
    return { labels, obstacles }
  }, [showCpu, showRam, showCache, showStorage, showPath, theme])

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
        </group>
      )}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function MemoryStorage3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D memory hierarchy: the CPU, RAM, cache, and storage arranged as a speed-versus-size pyramid, and the path data takes moving up toward the CPU"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
