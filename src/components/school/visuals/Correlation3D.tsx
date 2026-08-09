'use client'
/**
 * Correlation3D — Data Science 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine: correlation between two variables —
 *   1 axes · 2 random points · 3 positive correlation · 4 negative correlation ·
 *   5 correlation comparison.
 * Teaches correlation strength and direction. Reuses ThreeDVisual +
 * MolecularNode3D + Vector3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D, vectorLabelAnchor } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'
import { ROLE, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'

const CAMERA_DISTANCE = 11
const POSITIVE_FROM: [number, number, number] = [-2.6, -1.3, 0]
const POSITIVE_TO: [number, number, number] = [2.6, 1.3, 0]
const NEGATIVE_FROM: [number, number, number] = [-2.6, 1.3, 0]
const NEGATIVE_TO: [number, number, number] = [2.6, -1.3, 0]
const XS = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4]
// Deterministic jitter so points sit near (not exactly on) each trend line.
const JITTER = [0.2, -0.15, 0.1, -0.05, 0.15, -0.2, 0.1]

function axes(offsetX: number) {
  return (
    <group>
      <Vector3D start={[offsetX - 2.8, -1.6, 0]} end={[offsetX + 2.8, -1.6, 0]} color="#9AA5B8" thickness={0.025} />
      <Vector3D start={[offsetX, -1.6, 0]} end={[offsetX, 1.6, 0]} color="#9AA5B8" thickness={0.025} />
    </group>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showAxes = revealStep >= 1
  const showRandom = revealStep >= 2
  const showPositive = revealStep >= 3
  const showNegative = revealStep >= 4
  const compare = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (compare) {
      XS.forEach((x, i) => {
        obstacles.push({ type: 'point', position: [-3 + x * 0.5, x * 0.5 + JITTER[i], 0], radius: 0.09 })
        obstacles.push({ type: 'point', position: [3 + x * 0.5, -x * 0.5 + JITTER[i], 0], radius: 0.09 })
      })
      obstacles.push({ type: 'vector', from: [-4.2, -1.2, 0], to: [-1.8, 1.2, 0] })
      obstacles.push({ type: 'vector', from: [1.8, 1.2, 0], to: [4.2, -1.2, 0] })
      labels.push({ text: 'Positive (left, up) vs negative (right, down) correlation', position: [0, -2.3, 0], color: themeColor(ROLE.ink, theme) ?? ROLE.ink })
      return { labels, obstacles }
    }
    if (showNegative) {
      XS.forEach((x, i) => obstacles.push({ type: 'point', position: [x, -x * 0.5 + JITTER[i], 0], radius: 0.1 }))
      obstacles.push({ type: 'vector', from: NEGATIVE_FROM, to: NEGATIVE_TO })
      labels.push({ text: 'negative', position: vectorLabelAnchor(NEGATIVE_FROM, NEGATIVE_TO), color: '#FFD166' })
    } else if (showPositive) {
      XS.forEach((x, i) => obstacles.push({ type: 'point', position: [x, x * 0.5 + JITTER[i], 0], radius: 0.1 }))
      obstacles.push({ type: 'vector', from: POSITIVE_FROM, to: POSITIVE_TO })
      labels.push({ text: 'positive', position: vectorLabelAnchor(POSITIVE_FROM, POSITIVE_TO), color: '#FFD166' })
    }
    return { labels, obstacles }
  }, [compare, showPositive, showNegative, theme])

  if (compare) {
    return (
      <group>
        {axes(-3)}
        {axes(3)}
        {XS.map((x, i) => <MolecularNode3D key={`pp${i}`} position={[-3 + x * 0.5, x * 0.5 + JITTER[i], 0]} radius={0.09} color="#81C784" />)}
        <Vector3D start={[-4.2, -1.2, 0]} end={[-1.8, 1.2, 0]} color="#FFD166" thickness={0.03} />
        {XS.map((x, i) => <MolecularNode3D key={`nn${i}`} position={[3 + x * 0.5, -x * 0.5 + JITTER[i], 0]} radius={0.09} color="#FF6B6B" />)}
        <Vector3D start={[1.8, 1.2, 0]} end={[4.2, -1.2, 0]} color="#FFD166" thickness={0.03} />
        <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
      </group>
    )
  }

  return (
    <group>
      {showAxes && axes(0)}
      {showRandom && !showPositive &&
        XS.map((x, i) => <MolecularNode3D key={`r${i}`} position={[x, JITTER[i] * 4 - 0.2, 0]} radius={0.1} color="#9AA5B8" />)}
      {showPositive && !showNegative && (
        <group>
          {XS.map((x, i) => <MolecularNode3D key={`p${i}`} position={[x, x * 0.5 + JITTER[i], 0]} radius={0.1} color="#81C784" />)}
          <Vector3D start={POSITIVE_FROM} end={POSITIVE_TO} color="#FFD166" thickness={0.03} />
        </group>
      )}
      {showNegative && (
        <group>
          {XS.map((x, i) => <MolecularNode3D key={`n${i}`} position={[x, -x * 0.5 + JITTER[i], 0]} radius={0.1} color="#FF6B6B" />)}
          <Vector3D start={NEGATIVE_FROM} end={NEGATIVE_TO} color="#FFD166" thickness={0.03} />
        </group>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function Correlation3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D correlation: axes, random points, positive correlation, negative correlation, and a side-by-side comparison showing correlation strength and direction"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
