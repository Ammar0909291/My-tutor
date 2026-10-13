'use client'
/**
 * BondFormation3D — Chemistry 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine:
 *   1 separate atoms · 2 valence electrons · 3 approach (atoms move closer) ·
 *   4 bond formation (shared electron pair + bond) · 5 stable molecule.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D.
 *
 * All four labels go to SceneLabelLayer together, so "shared pair" cannot land
 * on top of an atom name when the atoms close in at step 3.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { Bond3D, bondLabelAnchor } from './Bond3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const FAR_A: [number, number, number] = [-2.6, 0, 0]
const FAR_B: [number, number, number] = [2.6, 0, 0]
const NEAR_A: [number, number, number] = [-0.75, 0, 0]
const NEAR_B: [number, number, number] = [0.75, 0, 0]
const CAMERA_DISTANCE = 6

/** ONE valence electron on each atom: a single covalent bond is a shared PAIR, and each atom contributes one electron to it (R19 — the card drew two per atom, then a pair, so two electrons vanished). */
/** Electrons per atom before bonding, and electrons in the shared pair after: the card must conserve them (1 + 1 = 2). */
export const ELECTRONS_PER_ATOM_BEFORE = 1
export const SHARED_PAIR_ELECTRONS = 2

function ValenceElectrons({ center, side }: { center: [number, number, number]; side: 1 | -1 }) {
  return (
    <mesh position={[center[0] + side * 0.4, center[1], center[2]]}>
      <sphereGeometry args={[0.07, 10, 10]} />
      <meshStandardMaterial color="#4DD0E1" emissive="#4DD0E1" emissiveIntensity={0.5} />
    </mesh>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showAtoms = revealStep >= 1
  const showValence = revealStep >= 2
  const approached = revealStep >= 3
  const bonded = revealStep >= 4
  const stable = revealStep >= 5

  const posA = approached ? NEAR_A : FAR_A
  const posB = approached ? NEAR_B : FAR_B

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showAtoms) {
      obstacles.push({ type: 'node', position: posA, radius: 0.3 })
      obstacles.push({ type: 'node', position: posB, radius: 0.3 })
      labels.push({ text: 'A', position: nodeLabelAnchor(posA, 0.3), color: '#FF6B6B' })
      labels.push({ text: 'B', position: nodeLabelAnchor(posB, 0.3), color: '#5B8DEF' })
    }
    if (bonded) {
      obstacles.push({ type: 'bond', from: posA, to: posB })
      labels.push({ text: 'shared pair', position: bondLabelAnchor(posA, posB), color: '#81C784' })
    }
    if (stable) {
      labels.push({ text: 'Stable molecule AB', position: [0, -0.9, 0], color: '#81C784' })
    }
    return { labels, obstacles }
  }, [showAtoms, bonded, stable, posA, posB])

  return (
    <group>
      {showAtoms && (
        <>
          <MolecularNode3D position={posA} radius={0.3} color="#FF6B6B" />
          <MolecularNode3D position={posB} radius={0.3} color="#5B8DEF" />
        </>
      )}

      {showValence && !bonded && (
        <>
          <ValenceElectrons center={posA} side={1} />
          <ValenceElectrons center={posB} side={-1} />
        </>
      )}

      {bonded && (
        <>
          <Bond3D atomA={posA} atomB={posB} bondOrder={1} color="#81C784" />
          {/* the shared PAIR: the two electrons, one from each atom, now between the nuclei */}
          {[0.11, -0.11].map((dy) => (
            <mesh key={dy} position={[0, dy, 0]}>
              <sphereGeometry args={[0.06, 10, 10]} />
              <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.6} />
            </mesh>
          ))}
        </>
      )}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function BondFormation3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D bond formation: two separate atoms with their valence electrons approach each other, form a shared-electron-pair bond, and settle into a stable molecule"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
