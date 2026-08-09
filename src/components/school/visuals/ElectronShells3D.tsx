'use client'
/**
 * ElectronShells3D — Chemistry 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine:
 *   1 nucleus · 2 K shell · 3 L shell · 4 M shell · 5 electron population
 *   (electrons appear on every revealed shell, K=2, L=8, M=8). Reuses
 *   ThreeDVisual; shells rendered as labeled torus rings.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 9

/** Where a shell's name sits: just outside the ring, on its right. */
function shellLabelAnchor(radius: number): [number, number, number] {
  return [radius + 0.25, 0, 0]
}

const SHELLS = [
  { name: 'K', radius: 1.0, capacity: 2, color: '#4DD0E1' },
  { name: 'L', radius: 1.8, capacity: 8, color: '#81C784' },
  { name: 'M', radius: 2.6, capacity: 8, color: '#FFB74D' },
]

function Shell({ radius, color, electronCount }: { radius: number; name: string; color: string; electronCount: number }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      {Array.from({ length: electronCount }).map((_, i) => {
        const angle = (i / electronCount) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showNucleus = revealStep >= 1
  const showK = revealStep >= 2
  const showL = revealStep >= 3
  const showM = revealStep >= 4
  const populate = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showNucleus) obstacles.push({ type: 'node', position: [0, 0, 0], radius: 0.3 })
    const visible = [showK, showL, showM]
    SHELLS.forEach((shell, i) => {
      if (!visible[i]) return
      labels.push({ text: `${shell.name} shell`, position: shellLabelAnchor(shell.radius), color: shell.color })
      // The ring sampled as the seats around it — the points a label must not
      // be printed on top of.
      const seats = populate ? shell.capacity : 8
      for (let k = 0; k < seats; k++) {
        const a = (k / seats) * Math.PI * 2
        obstacles.push({ type: 'point', position: [Math.cos(a) * shell.radius, 0, Math.sin(a) * shell.radius], radius: 0.08 })
      }
    })
    return { labels, obstacles }
  }, [showNucleus, showK, showL, showM, populate])

  return (
    <group>
      {showNucleus && (
        <mesh>
          <sphereGeometry args={[0.3, 20, 20]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
      )}
      {showK && <Shell {...SHELLS[0]} electronCount={populate ? SHELLS[0].capacity : 0} />}
      {showL && <Shell {...SHELLS[1]} electronCount={populate ? SHELLS[1].capacity : 0} />}
      {showM && <Shell {...SHELLS[2]} electronCount={populate ? SHELLS[2].capacity : 0} />}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function ElectronShells3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D electron shells: a nucleus with K, L, and M shells revealed in order, each populated with its electrons"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
