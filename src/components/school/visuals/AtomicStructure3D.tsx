'use client'
/**
 * AtomicStructure3D — Chemistry 3D Foundation Sprint, Task 3.
 * revealStep-gated on the Universal 3D Engine:
 *   1 nucleus · 2 proton/neutron display · 3 electron shell ·
 *   4 multiple shells · 5 completed atom (electrons orbiting all shells).
 * Reuses ThreeDVisual + MolecularNode3D.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 8
const SHELL_RADII = [1.0, 1.7, 2.4]
const SHELL_COUNTS = [2, 4, 4]

function NucleusParticles({ show }: { show: boolean }) {
  if (!show) return null
  const offsets: [number, number, number][] = [
    [0.12, 0.08, 0], [-0.1, 0.1, 0.05], [0.05, -0.12, -0.05],
    [-0.12, -0.05, 0.08], [0, 0.1, -0.1], [0.08, -0.05, 0.1],
  ]
  return (
    <group>
      {offsets.map((o, i) => (
        <mesh key={i} position={o}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#FF6B6B' : '#5B8DEF'} />
        </mesh>
      ))}
    </group>
  )
}

function ShellRing({ radius, electronCount, spin }: { radius: number; electronCount: number; spin: number }) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * spin
  })
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color="#4DD0E1" transparent opacity={0.5} />
      </mesh>
      {Array.from({ length: electronCount }).map((_, i) => {
        const angle = (i / electronCount) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showNucleus = revealStep >= 1
  const showProtonsNeutrons = revealStep >= 2
  const showShell1 = revealStep >= 3
  const showAllShells = revealStep >= 4
  const completed = revealStep >= 5

  const labels: LayerLabel[] = []
  const obstacles: SceneObject[] = []
  if (showNucleus) obstacles.push({ type: 'node', position: [0, 0, 0], radius: 0.32 })
  // The shells are rings the caption must not be printed across; each is
  // sampled at the seats its electrons occupy.
  const shellsShown = showAllShells ? SHELL_RADII : showShell1 ? SHELL_RADII.slice(0, 1) : []
  shellsShown.forEach((r, i) => {
    for (let k = 0; k < SHELL_COUNTS[i]; k++) {
      const a = (k / SHELL_COUNTS[i]) * Math.PI * 2
      obstacles.push({ type: 'point', position: [Math.cos(a) * r, 0, Math.sin(a) * r], radius: 0.08 })
    }
  })
  if (completed) labels.push({ text: 'Completed atom', position: [0, -2.9, 0], color: '#FFB74D' })

  return (
    <group>
      {showNucleus && (
        <mesh>
          <sphereGeometry args={[0.32, 20, 20]} />
          <meshStandardMaterial color="#FFB74D" transparent opacity={showProtonsNeutrons ? 0.25 : 1} />
        </mesh>
      )}
      <NucleusParticles show={showProtonsNeutrons} />

      {showShell1 && <ShellRing radius={SHELL_RADII[0]} electronCount={SHELL_COUNTS[0]} spin={completed ? 0.4 : 0} />}
      {showAllShells && (
        <>
          <ShellRing radius={SHELL_RADII[1]} electronCount={SHELL_COUNTS[1]} spin={completed ? 0.28 : 0} />
          <ShellRing radius={SHELL_RADII[2]} electronCount={SHELL_COUNTS[2]} spin={completed ? 0.18 : 0} />
        </>
      )}

      <SceneLabelLayer
        labels={labels}
        obstacles={obstacles}
        cameraDistance={CAMERA_DISTANCE}
        theme={theme}
      />
    </group>
  )
}

export function AtomicStructure3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D atomic structure: a nucleus with protons and neutrons, surrounded by electron shells with orbiting electrons"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
