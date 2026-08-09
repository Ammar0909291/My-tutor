'use client'
/**
 * DataStructureVisualization3D — Computer Science 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: structural differences between
 * common data structures —
 *   1 array · 2 linked list · 3 stack · 4 queue · 5 comparison.
 * Reuses ThreeDVisual + Vector3D (no new primitives).
 *
 * The comparison step puts four labelled structures on one canvas, which is
 * exactly where private label drawing failed: each group placed its own caption
 * knowing nothing about the other three. Every caption is now declared to
 * SceneLabelLayer and the whole set is solved together.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'
import { ROLE, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'

const CAMERA_DISTANCE = 10
const CELL = 0.6

function Cell({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[CELL, CELL, CELL]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

/** One structure's geometry and its caption, described once and used by both. */
interface Structure {
  cells: [number, number, number][]
  arrows: { from: [number, number, number]; to: [number, number, number]; color: string }[]
  caption: { text: string; position: [number, number, number] }
}

// Array — contiguous indexed cells in a row.
function arrayStructure(y: number): Structure {
  return {
    cells: [-1.5, -0.75, 0, 0.75, 1.5].map((x) => [x, y, 0] as [number, number, number]),
    arrows: [],
    caption: { text: 'Array — indexed contiguous cells', position: [0, y + 0.7, 0] },
  }
}

// Linked list — cells joined by pointer links.
function linkedListStructure(y: number): Structure {
  const xs = [-1.5, -0.5, 0.5, 1.5]
  return {
    cells: xs.map((x) => [x, y, 0] as [number, number, number]),
    arrows: xs.slice(0, -1).map((x, i) => ({
      from: [x + 0.3, y, 0] as [number, number, number],
      to: [xs[i + 1] - 0.3, y, 0] as [number, number, number],
      color: '#FFD166',
    })),
    caption: { text: 'Linked list — nodes joined by pointers', position: [0, y + 0.7, 0] },
  }
}

// Stack — vertical cells, push/pop at the top (LIFO).
function stackStructure(x: number): Structure {
  return {
    cells: [-1, -0.3, 0.4].map((yy) => [x, yy, 0] as [number, number, number]),
    arrows: [{ from: [x, 1.4, 0], to: [x, 0.8, 0], color: '#FFD166' }],
    caption: { text: 'Stack — LIFO (top in/out)', position: [x, 1.7, 0] },
  }
}

// Queue — horizontal cells, enqueue one end, dequeue the other (FIFO).
function queueStructure(x: number, y: number): Structure {
  return {
    cells: [x - 0.75, x, x + 0.75].map((xx) => [xx, y, 0] as [number, number, number]),
    arrows: [
      { from: [x - 1.6, y, 0], to: [x - 1.1, y, 0], color: '#81C784' },
      { from: [x + 1.1, y, 0], to: [x + 1.6, y, 0], color: '#FF6B6B' },
    ],
    caption: { text: 'Queue — FIFO (in one end, out the other)', position: [x, y - 0.7, 0] },
  }
}

function StructureGroup({ structure, color }: { structure: Structure; color: string }) {
  return (
    <group>
      {structure.cells.map((p, i) => <Cell key={i} position={p} color={color} />)}
      {structure.arrows.map((a, i) => (
        <Vector3D key={i} start={a.from} end={a.to} color={a.color} thickness={0.03} />
      ))}
    </group>
  )
}

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showArray = revealStep >= 1
  const showLinked = revealStep >= 2
  const showStack = revealStep >= 3
  const showQueue = revealStep >= 4
  const compare = revealStep >= 5

  // Steps 1–4 introduce each structure centered; step 5 lays them out side by side.
  const shown = useMemo((): { structure: Structure; color: string }[] => {
    if (compare) {
      return [
        { structure: arrayStructure(2.2), color: '#5B8DEF' },
        { structure: linkedListStructure(0.8), color: '#81C784' },
        { structure: stackStructure(-2.2), color: '#FFB74D' },
        { structure: queueStructure(1.6, -1.8), color: '#BA68C8' },
      ]
    }
    if (showQueue) return [{ structure: queueStructure(0, 0), color: '#BA68C8' }]
    if (showStack) return [{ structure: stackStructure(0), color: '#FFB74D' }]
    if (showLinked) return [{ structure: linkedListStructure(0), color: '#81C784' }]
    if (showArray) return [{ structure: arrayStructure(0), color: '#5B8DEF' }]
    return []
  }, [showArray, showLinked, showStack, showQueue, compare])

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    for (const { structure, color } of shown) {
      labels.push({ text: structure.caption.text, position: structure.caption.position, color })
      for (const c of structure.cells) obstacles.push({ type: 'node', position: c, radius: CELL / 2 })
      for (const a of structure.arrows) obstacles.push({ type: 'vector', from: a.from, to: a.to })
    }
    if (compare) {
      labels.push({ text: 'Same data, different access rules', position: [0, 3.2, 0], color: themeColor(ROLE.ink, theme) ?? ROLE.ink })
    }
    return { labels, obstacles }
  }, [shown, compare, theme])

  return (
    <group>
      {shown.map(({ structure, color }, i) => (
        <StructureGroup key={i} structure={structure} color={color} />
      ))}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function DataStructureVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D data structures: an array, a linked list, a stack, a queue, and a side-by-side comparison of how each stores and accesses data"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
