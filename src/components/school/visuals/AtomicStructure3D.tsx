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
/**
 * ONE REAL, NEUTRAL ATOM: magnesium-24 — 12 protons, 12 neutrons, 12 electrons in the shells 2, 8, 2 (R19).
 * The card used to draw 3 protons + 3 neutrons with 2 + 4 + 4 = 10 electrons: a charged atom with a shell filling no element
 * has (L at 4 of 8 while M already holds 4). The numbers below are an actual element, and the drawing says which.
 */
const SHELL_RADII = [1.0, 1.7, 2.4]
const SHELL_COUNTS = [2, 8, 2]
const PROTONS = 12
const NEUTRONS = 12
/** The atom the card draws, exported so a test can hold its numbers to the periodic table. */
export const ATOM_MODEL = { symbol: 'Mg', protons: PROTONS, neutrons: NEUTRONS, shellElectrons: SHELL_COUNTS } as const

/** `n` points evenly spread on a sphere of radius `r` (Fibonacci lattice) — deterministic, no overlap at this size. */
function sphereOffsets(n: number, r: number): [number, number, number][] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const th = golden * i
    return [Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r] as [number, number, number]
  })
}
const NUCLEON_OFFSETS = sphereOffsets(PROTONS + NEUTRONS, 0.2)

function NucleusParticles({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <group>
      {NUCLEON_OFFSETS.map((o, i) => (
        <mesh key={i} position={o}>
          <sphereGeometry args={[0.075, 12, 12]} />
          {/* even indices are protons (red), odd are neutrons (blue): 12 of each */}
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
  if (showProtonsNeutrons) labels.push({ text: `${PROTONS} protons + ${NEUTRONS} neutrons`, position: [0, 0.75, 0], color: '#FFB74D' })
  if (completed) labels.push({ text: `Neutral Mg-24 atom: ${PROTONS} protons = ${SHELL_COUNTS.reduce((a, b) => a + b, 0)} electrons (${SHELL_COUNTS.join(', ')})`, position: [0, -2.9, 0], color: '#FFB74D' })

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
      ariaLabel="3D atomic structure: a magnesium-24 atom — a nucleus of 12 protons and 12 neutrons, surrounded by 12 electrons in shells of 2, 8 and 2"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
