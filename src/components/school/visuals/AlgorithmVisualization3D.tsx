'use client'
/**
 * AlgorithmVisualization3D — Computer Science 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine: the execution flow of a sorting
 * algorithm, taught as a flow (NOT a full algorithm engine) —
 *   1 unsorted data · 2 comparison · 3 swap · 4 progress · 5 sorted result.
 * Bars are fixed, hand-authored snapshots of one swap and the final result.
 * Reuses ThreeDVisual; its caption goes through the shared label layer.
 */
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const SLOT_X = [-2.4, -1.2, 0, 1.2, 2.4]
const CAMERA_DISTANCE = 9
const CAPTION_AT: [number, number, number] = [0, -2.4, 0]

// Fixed per-step snapshots of bar heights (value of each element). Hand-authored
// so the visual stays a simple teaching flow rather than a live sort.
const UNSORTED = [3, 1, 4, 2, 5]
const AFTER_SWAP = [1, 3, 4, 2, 5] // first comparison (3 vs 1) resolved by a swap
const PROGRESS = [1, 2, 3, 4, 5].map((_, i) => [1, 3, 2, 4, 5][i]) // mid-way, partially ordered
const SORTED = [1, 2, 3, 4, 5]

function Bars({ heights, highlight, swap }: { heights: number[]; highlight?: [number, number]; swap?: boolean }) {
  return (
    <group>
      {heights.map((h, i) => {
        const isHi = highlight && (i === highlight[0] || i === highlight[1])
        const color = isHi ? (swap ? '#FF6B6B' : '#FFD166') : '#5B8DEF'
        const height = h * 0.6
        return (
          <mesh key={i} position={[SLOT_X[i], height / 2 - 1.5, 0]}>
            <boxGeometry args={[0.7, height, 0.7]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

/** The one step of the flow this reveal shows: its bars and its caption. */
function stepOf(revealStep: number) {
  if (revealStep >= 5) return { heights: SORTED, text: 'Sorted result — smallest to largest', color: '#81C784' }
  if (revealStep >= 4) return { heights: PROGRESS, text: 'Progress — the data is becoming ordered', color: '#5B8DEF' }
  if (revealStep >= 3) return { heights: AFTER_SWAP, text: 'Swap — out-of-order pair is exchanged', color: '#FF6B6B', highlight: [0, 1] as [number, number], swap: true }
  if (revealStep >= 2) return { heights: UNSORTED, text: 'Comparison — is the left bar bigger than the right?', color: '#FFD166', highlight: [0, 1] as [number, number] }
  return { heights: UNSORTED, text: 'Unsorted data', color: '#9AA5B8' }
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const step = stepOf(revealStep)
  // Each bar as an obstacle at its own centre, so the caption is solved against
  // the columns rather than printed across them.
  const obstacles: SceneObject[] = step.heights.map((h, i) => ({
    type: 'node' as const,
    position: [SLOT_X[i], (h * 0.6) / 2 - 1.5, 0] as [number, number, number],
    radius: Math.max(0.35, (h * 0.6) / 2),
  }))
  return (
    <group>
      <Bars heights={step.heights} highlight={step.highlight} swap={step.swap} />
      <SceneLabelLayer
        labels={[{ text: step.text, position: CAPTION_AT, color: step.color }]}
        obstacles={obstacles}
        cameraDistance={CAMERA_DISTANCE}
        theme={theme}
      />
    </group>
  )
}

export function AlgorithmVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D sorting algorithm flow: unsorted bars, a comparison of two bars, a swap, partial progress, and the final sorted result"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
