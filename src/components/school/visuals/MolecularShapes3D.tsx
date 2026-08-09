'use client'
/**
 * MolecularShapes3D — Chemistry 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: a tetrahedral AX4 molecule
 * (e.g. methane-shaped) —
 *   1 atoms · 2 bonds · 3 geometry (tetrahedral arrangement) ·
 *   4 bond angles (labeled) · 5 final molecule.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D.
 *
 * Every label — the atom names included — is declared to SceneLabelLayer, so
 * the whole set is solved together against the canvas and the geometry.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CENTER: [number, number, number] = [0, 0, 0]
// Tetrahedral vertex directions, scaled to bond length.
const BOND_LEN = 1.4
const CAMERA_DISTANCE = 6
const OUTER: [number, number, number][] = [
  [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1],
].map((v) => {
  const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  return [v[0] / len * BOND_LEN, v[1] / len * BOND_LEN, v[2] / len * BOND_LEN] as [number, number, number]
})

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showAtoms = revealStep >= 1
  const showBonds = revealStep >= 2
  const showGeometry = revealStep >= 3
  const showAngles = revealStep >= 4
  const completed = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (showAtoms) {
      obstacles.push({ type: 'node', position: CENTER, radius: 0.32 })
      labels.push({ text: 'C', position: nodeLabelAnchor(CENTER, 0.32), color: '#5B8DEF' })
      for (const p of OUTER) {
        obstacles.push({ type: 'node', position: p, radius: 0.22 })
        labels.push({ text: 'H', position: nodeLabelAnchor(p, 0.22), color: '#81C784' })
      }
    }
    if (showBonds) {
      for (const p of OUTER) obstacles.push({ type: 'bond', from: CENTER, to: p })
    }
    if (showAngles) {
      labels.push({ text: '109.5° tetrahedral angles', position: [0, BOND_LEN * 0.55, 0], color: '#FFB74D' })
    }
    if (completed) {
      labels.push({ text: 'Tetrahedral molecule', position: [0, -BOND_LEN * 1.2, 0], color: '#5B8DEF' })
    }
    return { labels, obstacles }
  }, [showAtoms, showBonds, showAngles, completed])

  return (
    <group>
      {showAtoms && (
        <>
          <MolecularNode3D position={CENTER} radius={0.32} color="#5B8DEF" />
          {OUTER.map((p, i) => (
            <MolecularNode3D key={i} position={p} radius={0.22} color="#81C784" />
          ))}
        </>
      )}

      {showBonds &&
        OUTER.map((p, i) => <Bond3D key={i} atomA={CENTER} atomB={p} bondOrder={1} color="#9AA5B8" />)}

      {showGeometry && (
        <mesh position={CENTER}>
          <sphereGeometry args={[BOND_LEN, 16, 16]} />
          <meshBasicMaterial color="#FFB74D" wireframe transparent opacity={0.25} />
        </mesh>
      )}

      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function MolecularShapes3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      // Labelled figure: a moving camera moves every label with it, and no
      // placement survives that. Manual orbit still works.
      autoRotate={false}
      ariaLabel="3D molecular shapes: a tetrahedral molecule built up from its atoms, bonds, overall geometry, labeled bond angles, and the final molecule"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
