'use client'
/**
 * DataVisualization3D — Data Science 3D Foundation Sprint, Task 3.
 * revealStep-gated on the Universal 3D Engine: ways to visualize a dataset —
 *   1 dataset · 2 bar chart · 3 scatter plot · 4 trend line · 5 comparison view.
 * Teaches relationships, trends, and correlation. Reuses ThreeDVisual +
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

const CAMERA_DISTANCE = 10
const TREND_FROM: [number, number, number] = [-2.4, -1.1, 0]
const TREND_TO: [number, number, number] = [2.6, 1.6, 0]
const BARS = [1.2, 2.0, 1.6, 2.6, 2.2]
// Scatter points trending upward (x, y) — a positive relationship.
const SCATTER: [number, number][] = [
  [-2.2, -1.0], [-1.4, -0.6], [-0.6, 0.0], [0.2, 0.3], [1.0, 0.8], [1.8, 1.2], [2.4, 1.5],
]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showDataset = revealStep >= 1
  const showBars = revealStep >= 2
  const showScatter = revealStep >= 3
  const showTrend = revealStep >= 4
  const compare = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (compare) {
      BARS.forEach((h, i) => obstacles.push({ type: 'node', position: [-3 + i * 0.55, -1.4 + h / 2, 0], radius: Math.max(0.2, h / 2) }))
      SCATTER.forEach(([x, y]) => obstacles.push({ type: 'point', position: [x * 0.6 + 1.6, y, 0], radius: 0.1 }))
      obstacles.push({ type: 'vector', from: [0.3, -1.0, 0], to: [3.0, 1.0, 0] })
      labels.push({ text: 'Bar chart vs scatter — different views of the same data', position: [0, -2.2, 0], color: themeColor(ROLE.ink, theme) ?? ROLE.ink })
      return { labels, obstacles }
    }
    if (showScatter) {
      SCATTER.forEach(([x, y]) => obstacles.push({ type: 'point', position: [x, y, 0], radius: 0.1 }))
      if (showTrend) {
        obstacles.push({ type: 'vector', from: TREND_FROM, to: TREND_TO })
        labels.push({ text: 'trend', position: vectorLabelAnchor(TREND_FROM, TREND_TO), color: '#FFD166' })
      }
    } else if (showBars) {
      BARS.forEach((h, i) => obstacles.push({ type: 'node', position: [-1.1 + i * 0.55, -1.4 + h / 2, 0], radius: Math.max(0.2, h / 2) }))
    }
    return { labels, obstacles }
  }, [compare, showBars, showScatter, showTrend, theme])

  if (compare) {
    return (
      <group>
        {/* Bar chart on the left, scatter + trend on the right. */}
        {BARS.map((h, i) => (
          <mesh key={`b${i}`} position={[-3 + i * 0.55, -1.4 + h / 2, 0]}>
            <boxGeometry args={[0.4, h, 0.4]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
        ))}
        {SCATTER.map(([x, y], i) => <MolecularNode3D key={`s${i}`} position={[x * 0.6 + 1.6, y, 0]} radius={0.1} color="#81C784" />)}
        <Vector3D start={[0.3, -1.0, 0]} end={[3.0, 1.0, 0]} color="#FFD166" thickness={0.03} />
        <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
      </group>
    )
  }

  return (
    <group>
      {showDataset && !showBars &&
        BARS.map((h, i) => <MolecularNode3D key={`d${i}`} position={[-1.1 + i * 0.55, h - 1.5, 0]} radius={0.12} color="#9AA5B8" />)}

      {showBars && !showScatter &&
        BARS.map((h, i) => (
          <mesh key={`b${i}`} position={[-1.1 + i * 0.55, -1.4 + h / 2, 0]}>
            <boxGeometry args={[0.4, h, 0.4]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
        ))}

      {showScatter && (
        <group>
          {SCATTER.map(([x, y], i) => <MolecularNode3D key={`s${i}`} position={[x, y, 0]} radius={0.1} color="#81C784" />)}
          {showTrend && <Vector3D start={TREND_FROM} end={TREND_TO} color="#FFD166" thickness={0.03} />}
        </group>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function DataVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D data visualization: a dataset, a bar chart, a scatter plot, a trend line, and a comparison view showing relationships and trends"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
