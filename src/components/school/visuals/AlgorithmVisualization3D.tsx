'use client'
/**
 * AlgorithmVisualization3D — Computer Science 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine: the execution flow of a sorting
 * algorithm, taught as a flow (NOT a full algorithm engine) —
 *   1 unsorted data · 2 comparison · 3 swap · 4 progress · 5 sorted result.
 * Bars are fixed, hand-authored snapshots of one swap and the final result.
 * Reuses ThreeDVisual + Html label (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'

const SLOT_X = [-2.4, -1.2, 0, 1.2, 2.4]

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

function caption(text: string, color: string) {
  return (
    <Html position={[0, -2.4, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
        {text}
      </span>
    </Html>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  if (revealStep >= 5) return <group><Bars heights={SORTED} /> {caption('Sorted result — smallest to largest', '#81C784')}</group>
  if (revealStep >= 4) return <group><Bars heights={PROGRESS} /> {caption('Progress — the data is becoming ordered', '#5B8DEF')}</group>
  if (revealStep >= 3) return <group><Bars heights={AFTER_SWAP} highlight={[0, 1]} swap /> {caption('Swap — out-of-order pair is exchanged', '#FF6B6B')}</group>
  if (revealStep >= 2) return <group><Bars heights={UNSORTED} highlight={[0, 1]} /> {caption('Comparison — is the left bar bigger than the right?', '#FFD166')}</group>
  return <group><Bars heights={UNSORTED} /> {caption('Unsorted data', '#9AA5B8')}</group>
}

export function AlgorithmVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D sorting algorithm flow: unsorted bars, a comparison of two bars, a swap, partial progress, and the final sorted result"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
