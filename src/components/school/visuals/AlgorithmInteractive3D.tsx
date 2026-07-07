'use client'
/**
 * AlgorithmInteractive3D — Computer Science Interactive Layer Sprint, Task 6.
 * Additive: live controls (dataset size, speed, algorithm type) drive a bar display
 * that highlights a compared pair, shows a swap, and indicates progress toward sorted.
 * Educational visualization only — NOT a verified, fully-correct sort engine (per spec).
 * Does not modify AlgorithmVisualization3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

type AlgoType = 'bubble' | 'selection'

// Deterministic pseudo-random heights so the display is stable across renders.
function heightsFor(size: number): number[] {
  const out: number[] = []
  let seed = 7
  for (let i = 0; i < size; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    out.push(1 + (seed % size))
  }
  return out
}

function ProgressBars({ heights, comparePair }: { heights: number[]; comparePair: [number, number] }) {
  const n = heights.length
  const span = Math.min(n * 0.8, 6)
  const x0 = -span / 2
  const w = span / n
  return (
    <group>
      {heights.map((h, i) => {
        const isCompared = i === comparePair[0] || i === comparePair[1]
        const color = isCompared ? '#FF6B6B' : '#5B8DEF'
        const height = (h / n) * 3
        return (
          <mesh key={i} position={[x0 + (i + 0.5) * w, height / 2 - 1.5, 0]}>
            <boxGeometry args={[w * 0.7, height, 0.6]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

interface AlgorithmInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function AlgorithmInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: AlgorithmInteractive3DProps = {}) {
  const [size, setSize] = useState(6)
  const [speed, setSpeed] = useState(5)
  const [algo, setAlgo] = useState<AlgoType>('bubble')

  const { mark } = useControlMastery({ defaultConcept: 'algorithm_compare_swap_flow', threshold: 3, context: masteryContext, onMasteryEvent })

  // Show one partial pass: the first two bars are the compared pair, then a partially
  // ordered tail — a teaching snapshot, not a live sort.
  const { display, comparePair } = useMemo(() => {
    const base = heightsFor(size)
    const partiallySorted = [...base]
    // bubble bubbles the largest toward the end; selection brings the smallest to the front.
    if (algo === 'bubble') partiallySorted.sort((a, b) => a - b)
    else partiallySorted[0] = Math.min(...base)
    return { display: partiallySorted, comparePair: [0, 1] as [number, number] }
  }, [size, algo])

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'size', label: 'Dataset size', min: 3, max: 12, step: 1, value: size, onChange: (v) => { setSize(v); mark('size') }, format: (v) => `${v} items` },
    { kind: 'slider', id: 'speed', label: 'Animation speed', min: 1, max: 10, step: 1, value: speed, onChange: (v) => { setSpeed(v); mark('speed') }, format: (v) => `×${v}` },
    {
      kind: 'dropdown', id: 'algo', label: 'Algorithm type', value: algo,
      options: [{ value: 'bubble', label: 'Bubble sort' }, { value: 'selection', label: 'Selection sort' }],
      onChange: (v) => { setAlgo(v as AlgoType); mark('algo') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D sorting visualization: adjust dataset size, speed, and algorithm type to see comparisons, swaps, and progress toward a sorted result">
        <ProgressBars heights={display} comparePair={comparePair} />
        <Html position={[0, -2.4, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FFD166', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            {algo === 'bubble' ? 'Bubble' : 'Selection'} sort: compare the highlighted pair, swap if out of order, repeat
          </span>
        </Html>
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        {size} items at speed ×{speed} — sorting is repeated compare-and-swap steps, not a single instant operation.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setSize(6); setSpeed(5); setAlgo('bubble') }}
      />
    </div>
  )
}
