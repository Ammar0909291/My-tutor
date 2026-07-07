'use client'
/**
 * DataVisualization3D — Data Science 3D Foundation Sprint, Task 3.
 * revealStep-gated on the Universal 3D Engine: ways to visualize a dataset —
 *   1 dataset · 2 bar chart · 3 scatter plot · 4 trend line · 5 comparison view.
 * Teaches relationships, trends, and correlation. Reuses ThreeDVisual +
 * MolecularNode3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D } from './Vector3D'

const BARS = [1.2, 2.0, 1.6, 2.6, 2.2]
// Scatter points trending upward (x, y) — a positive relationship.
const SCATTER: [number, number][] = [
  [-2.2, -1.0], [-1.4, -0.6], [-0.6, 0.0], [0.2, 0.3], [1.0, 0.8], [1.8, 1.2], [2.4, 1.5],
]

function Scene({ revealStep }: { revealStep: number }) {
  const showDataset = revealStep >= 1
  const showBars = revealStep >= 2
  const showScatter = revealStep >= 3
  const showTrend = revealStep >= 4
  const compare = revealStep >= 5

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
        <Html position={[0, -2.2, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.7)' }}>
            Bar chart vs scatter — different views of the same data
          </span>
        </Html>
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
          {showTrend && <Vector3D start={[-2.4, -1.1, 0]} end={[2.6, 1.6, 0]} color="#FFD166" thickness={0.03} label="trend" />}
        </group>
      )}
    </group>
  )
}

export function DataVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={10}
      ariaLabel="3D data visualization: a dataset, a bar chart, a scatter plot, a trend line, and a comparison view showing relationships and trends"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
