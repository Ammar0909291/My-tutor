'use client'
/**
 * GeometricSolids3D — Mathematics 3D Foundation Sprint, Task 5.
 * revealStep-gated: 1 cube · 2 sphere · 3 cylinder · 4 cone · 5 comparison
 * view (all four side by side). Reuses ThreeDVisual; plain Three.js solids.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 9
export const SOLO_POS: [number, number, number] = [0, 0, 0]
export const ROW_POS: [number, number, number][] = [[-3, 0, 0], [-1, 0, 0], [1, 0, 0], [3, 0, 0]]

/**
 * What the card draws, as data (the Scene below reads these numbers; tests assert on them — `mathVisualSemanticEvidence.test.ts`). The four solids are introduced
 * one at a time at their full size (`solo`), then shown side by side (`row`) a little smaller, left to right in the order the caption names them.
 */
export type SolidKind = 'cube' | 'sphere' | 'cylinder' | 'cone'
export const SOLIDS: ReadonlyArray<{ kind: SolidKind; solo: readonly number[]; row: readonly number[]; color: string }> = [
  { kind: 'cube', solo: [1, 1, 1], row: [0.9, 0.9, 0.9], color: '#FF6B6B' },
  { kind: 'sphere', solo: [0.65, 24, 24], row: [0.55, 24, 24], color: '#5B8DEF' },
  { kind: 'cylinder', solo: [0.55, 0.55, 1.2, 24], row: [0.45, 0.45, 1.0, 24], color: '#81C784' },
  { kind: 'cone', solo: [0.6, 1.2, 24], row: [0.5, 1.0, 24], color: '#FFB74D' },
]
export const SOLIDS_COMPARE_LABEL = 'Cube · Sphere · Cylinder · Cone'

/** One solid, drawn from `SOLIDS` — the same geometry calls the card always made, now driven by the exported numbers. */
function Solid({ index, size, position }: { index: number; size: 'solo' | 'row'; position: [number, number, number] }) {
  const { kind, color, ...dims } = SOLIDS[index]
  const a = dims[size] as number[]
  return (
    <mesh position={position}>
      {kind === 'cube' && <boxGeometry args={a as [number, number, number]} />}
      {kind === 'sphere' && <sphereGeometry args={a as [number, number, number]} />}
      {kind === 'cylinder' && <cylinderGeometry args={a as [number, number, number, number]} />}
      {kind === 'cone' && <coneGeometry args={a as [number, number, number]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showCube = revealStep >= 1
  const showSphere = revealStep >= 2
  const showCylinder = revealStep >= 3
  const showCone = revealStep >= 4
  const compare = revealStep >= 5

  const cubePos = compare ? ROW_POS[0] : SOLO_POS
  const spherePos = compare ? ROW_POS[1] : SOLO_POS
  const cylinderPos = compare ? ROW_POS[2] : SOLO_POS
  const conePos = compare ? ROW_POS[3] : SOLO_POS

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (compare) {
      for (const p of ROW_POS) obstacles.push({ type: 'node', position: p, radius: 0.55 })
      labels.push({ text: SOLIDS_COMPARE_LABEL, position: [0, -1.1, 0], color: '#9AA5B8' })
    }
    return { labels, obstacles }
  }, [compare])

  return (
    <group>
      {showCube && !showSphere && <Solid index={0} size="solo" position={cubePos} />}
      {showSphere && !showCylinder && <Solid index={1} size="solo" position={spherePos} />}
      {showCylinder && !showCone && <Solid index={2} size="solo" position={cylinderPos} />}
      {showCone && !compare && <Solid index={3} size="solo" position={conePos} />}

      {compare && (
        <>
          {SOLIDS.map((_, i) => <Solid key={i} index={i} size="row" position={ROW_POS[i]} />)}
        </>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function GeometricSolids3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D geometric solids: a cube, a sphere, a cylinder, a cone, each introduced in turn, then a side-by-side comparison view"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
