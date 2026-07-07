'use client'
/**
 * DataStructureVisualization3D — Computer Science 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: structural differences between
 * common data structures —
 *   1 array · 2 linked list · 3 stack · 4 queue · 5 comparison.
 * Reuses ThreeDVisual + Bond3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Bond3D } from './Bond3D'
import { Vector3D } from './Vector3D'

function Cell({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function label(text: string, position: [number, number, number], color: string) {
  return (
    <Html position={position} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.7)' }}>
        {text}
      </span>
    </Html>
  )
}

// Array — contiguous indexed cells in a row.
function ArrayGroup({ y, color }: { y: number; color: string }) {
  return (
    <group>
      {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => <Cell key={i} position={[x, y, 0]} color={color} />)}
      {label('Array — indexed contiguous cells', [0, y + 0.7, 0], color)}
    </group>
  )
}

// Linked list — cells joined by pointer links.
function LinkedListGroup({ y, color }: { y: number; color: string }) {
  const xs = [-1.5, -0.5, 0.5, 1.5]
  return (
    <group>
      {xs.map((x, i) => <Cell key={i} position={[x, y, 0]} color={color} />)}
      {xs.slice(0, -1).map((x, i) => (
        <Vector3D key={i} start={[x + 0.3, y, 0]} end={[xs[i + 1] - 0.3, y, 0]} color="#FFD166" thickness={0.03} />
      ))}
      {label('Linked list — nodes joined by pointers', [0, y + 0.7, 0], color)}
    </group>
  )
}

// Stack — vertical cells, push/pop at the top (LIFO).
function StackGroup({ x, color }: { x: number; color: string }) {
  return (
    <group>
      {[-1, -0.3, 0.4].map((yy, i) => <Cell key={i} position={[x, yy, 0]} color={color} />)}
      <Vector3D start={[x, 1.4, 0]} end={[x, 0.8, 0]} color="#FFD166" thickness={0.03} />
      {label('Stack — LIFO (top in/out)', [x, 1.7, 0], color)}
    </group>
  )
}

// Queue — horizontal cells, enqueue one end, dequeue the other (FIFO).
function QueueGroup({ x, y, color }: { x: number; y: number; color: string }) {
  const xs = [x - 0.75, x, x + 0.75]
  return (
    <group>
      {xs.map((xx, i) => <Cell key={i} position={[xx, y, 0]} color={color} />)}
      <Vector3D start={[x - 1.6, y, 0]} end={[x - 1.1, y, 0]} color="#81C784" thickness={0.03} />
      <Vector3D start={[x + 1.1, y, 0]} end={[x + 1.6, y, 0]} color="#FF6B6B" thickness={0.03} />
      {label('Queue — FIFO (in one end, out the other)', [x, y - 0.7, 0], color)}
    </group>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showArray = revealStep >= 1
  const showLinked = revealStep >= 2
  const showStack = revealStep >= 3
  const showQueue = revealStep >= 4
  const compare = revealStep >= 5

  // Steps 1–4 introduce each structure centered; step 5 lays them out side by side.
  if (compare) {
    return (
      <group>
        <ArrayGroup y={2.2} color="#5B8DEF" />
        <LinkedListGroup y={0.8} color="#81C784" />
        <StackGroup x={-2.2} color="#FFB74D" />
        <QueueGroup x={1.6} y={-1.8} color="#BA68C8" />
        {label('Same data, different access rules', [0, 3.2, 0], '#fff')}
      </group>
    )
  }

  return (
    <group>
      {showArray && !showLinked && <ArrayGroup y={0} color="#5B8DEF" />}
      {showLinked && !showStack && <LinkedListGroup y={0} color="#81C784" />}
      {showStack && !showQueue && <StackGroup x={0} color="#FFB74D" />}
      {showQueue && <QueueGroup x={0} y={0} color="#BA68C8" />}
    </group>
  )
}

export function DataStructureVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={10}
      ariaLabel="3D data structures: an array, a linked list, a stack, a queue, and a side-by-side comparison of how each stores and accesses data"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
