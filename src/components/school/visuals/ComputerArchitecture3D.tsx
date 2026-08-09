'use client'
/**
 * ComputerArchitecture3D — Computer Science 3D Foundation Sprint, Task 2.
 * revealStep-gated on the Universal 3D Engine: how the major computer
 * components interact —
 *   1 input devices · 2 CPU · 3 memory · 4 storage · 5 data-flow overview.
 * Reuses ThreeDVisual + MolecularNode3D + Vector3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { Vector3D } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 9
const INPUT_POS: [number, number, number] = [-3, 0, 0]
const CPU_POS: [number, number, number] = [0, 0, 0]
const MEMORY_POS: [number, number, number] = [0, 2.2, 0]
const STORAGE_POS: [number, number, number] = [0, -2.2, 0]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showInput = revealStep >= 1
  const showCpu = revealStep >= 2
  const showMemory = revealStep >= 3
  const showStorage = revealStep >= 4
  const showFlow = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    const part = (show: boolean, position: [number, number, number], radius: number, color: string, text: string) => {
      if (!show) return
      obstacles.push({ type: 'node', position, radius })
      labels.push({ text, position: nodeLabelAnchor(position, radius), color })
    }
    part(showInput, INPUT_POS, 0.5, '#81C784', 'Input devices')
    part(showCpu, CPU_POS, 0.6, '#5B8DEF', 'CPU')
    part(showMemory, MEMORY_POS, 0.45, '#FFB74D', 'Memory (RAM)')
    part(showStorage, STORAGE_POS, 0.45, '#BA68C8', 'Storage')
    if (showFlow) {
      obstacles.push({ type: 'vector', from: INPUT_POS, to: [-0.7, 0, 0] })
      obstacles.push({ type: 'vector', from: CPU_POS, to: [0, 1.6, 0] })
      obstacles.push({ type: 'vector', from: CPU_POS, to: [0, -1.6, 0] })
      labels.push({ text: 'Data flows between every component through the CPU', position: [0, -3.4, 0], color: '#5B8DEF' })
    }
    return { labels, obstacles }
  }, [showInput, showCpu, showMemory, showStorage, showFlow])

  return (
    <group>
      {showInput && <MolecularNode3D position={INPUT_POS} radius={0.5} color="#81C784" />}
      {showCpu && <MolecularNode3D position={CPU_POS} radius={0.6} color="#5B8DEF" />}
      {showMemory && <MolecularNode3D position={MEMORY_POS} radius={0.45} color="#FFB74D" />}
      {showStorage && <MolecularNode3D position={STORAGE_POS} radius={0.45} color="#BA68C8" />}

      {showFlow && (
        <group>
          <Vector3D start={INPUT_POS} end={[-0.7, 0, 0]} color="#81C784" thickness={0.04} />
          <Vector3D start={CPU_POS} end={[0, 1.6, 0]} color="#FFB74D" thickness={0.04} />
          <Vector3D start={MEMORY_POS} end={[0, 0.7, 0]} color="#FFB74D" thickness={0.04} />
          <Vector3D start={CPU_POS} end={[0, -1.6, 0]} color="#BA68C8" thickness={0.04} />
        </group>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function ComputerArchitecture3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D computer architecture: input devices, the CPU, memory, storage, and the data flow that connects them"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
