'use client'
/**
 * DataStructureInteractive3D — Computer Science Interactive Layer Sprint, Task 5.
 * Additive: a single control (structure type) switches between array, linked list,
 * stack, and queue, and the display describes how insert, remove, and traversal behave
 * for the chosen structure, so the student sees the differing access rules (LIFO vs FIFO,
 * indexed vs pointer). Does not modify DataStructureVisualization3D.tsx (untouched).
 */
import { useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

type StructureType = 'array' | 'linked_list' | 'stack' | 'queue'

const ACCESS: Record<StructureType, { insert: string; remove: string; traversal: string }> = {
  array: { insert: 'insert by index (shift others)', remove: 'remove by index (shift others)', traversal: 'random access by index' },
  linked_list: { insert: 'insert by relinking pointers', remove: 'remove by relinking pointers', traversal: 'follow pointers from head' },
  stack: { insert: 'push onto the top', remove: 'pop from the top (LIFO)', traversal: 'top-down only' },
  queue: { insert: 'enqueue at the back', remove: 'dequeue from the front (FIFO)', traversal: 'front-to-back only' },
}

function Cell({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Scene({ structure }: { structure: StructureType }) {
  const color = '#5B8DEF'
  if (structure === 'array') {
    return <group>{[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => <Cell key={i} position={[x, 0, 0]} color={color} />)}</group>
  }
  if (structure === 'linked_list') {
    const xs = [-1.5, -0.5, 0.5, 1.5]
    return (
      <group>
        {xs.map((x, i) => <Cell key={i} position={[x, 0, 0]} color="#81C784" />)}
        {xs.slice(0, -1).map((x, i) => <Vector3D key={i} start={[x + 0.3, 0, 0]} end={[xs[i + 1] - 0.3, 0, 0]} color="#FFD166" thickness={0.03} />)}
      </group>
    )
  }
  if (structure === 'stack') {
    return (
      <group>
        {[-1, -0.3, 0.4].map((y, i) => <Cell key={i} position={[0, y, 0]} color="#FFB74D" />)}
        <Vector3D start={[0, 1.4, 0]} end={[0, 0.8, 0]} color="#FFD166" thickness={0.03} />
        <Html position={[0, 1.7, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#FFB74D', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.7)' }}>push / pop (top)</span>
        </Html>
      </group>
    )
  }
  // queue
  return (
    <group>
      {[-0.75, 0, 0.75].map((x, i) => <Cell key={i} position={[x, 0, 0]} color="#BA68C8" />)}
      <Vector3D start={[-1.6, 0, 0]} end={[-1.1, 0, 0]} color="#81C784" thickness={0.03} />
      <Vector3D start={[1.1, 0, 0]} end={[1.6, 0, 0]} color="#FF6B6B" thickness={0.03} />
      <Html position={[0, -0.8, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#BA68C8', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.7)' }}>enqueue (back) → dequeue (front)</span>
      </Html>
    </group>
  )
}

interface DataStructureInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function DataStructureInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: DataStructureInteractive3DProps = {}) {
  const [structure, setStructure] = useState<StructureType>('array')

  const { mark } = useControlMastery({ defaultConcept: 'data_structure_access_rules', threshold: 1, context: masteryContext, onMasteryEvent })

  const a = ACCESS[structure]

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown', id: 'structure', label: 'Structure type', value: structure,
      options: [
        { value: 'array', label: 'Array' },
        { value: 'linked_list', label: 'Linked list' },
        { value: 'stack', label: 'Stack (LIFO)' },
        { value: 'queue', label: 'Queue (FIFO)' },
      ],
      onChange: (v) => { setStructure(v as StructureType); mark('structure') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D data structures: switch between array, linked list, stack, and queue to see how insert, remove, and traversal differ">
        <Scene structure={structure} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Insert: {a.insert} · Remove: {a.remove} · Traversal: {a.traversal}.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => setStructure('array')}
      />
    </div>
  )
}
