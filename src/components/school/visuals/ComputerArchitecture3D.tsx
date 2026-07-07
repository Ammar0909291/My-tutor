'use client'
/**
 * ComputerArchitecture3D — Computer Science 3D Foundation Sprint, Task 2.
 * revealStep-gated on the Universal 3D Engine: how the major computer
 * components interact —
 *   1 input devices · 2 CPU · 3 memory · 4 storage · 5 data-flow overview.
 * Reuses ThreeDVisual + MolecularNode3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D } from './Vector3D'

const INPUT_POS: [number, number, number] = [-3, 0, 0]
const CPU_POS: [number, number, number] = [0, 0, 0]
const MEMORY_POS: [number, number, number] = [0, 2.2, 0]
const STORAGE_POS: [number, number, number] = [0, -2.2, 0]

function caption(text: string, color: string, y: number) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
        {text}
      </span>
    </Html>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showInput = revealStep >= 1
  const showCpu = revealStep >= 2
  const showMemory = revealStep >= 3
  const showStorage = revealStep >= 4
  const showFlow = revealStep >= 5

  return (
    <group>
      {showInput && <MolecularNode3D position={INPUT_POS} radius={0.5} color="#81C784" label="Input devices" />}
      {showCpu && <MolecularNode3D position={CPU_POS} radius={0.6} color="#5B8DEF" label="CPU" />}
      {showMemory && <MolecularNode3D position={MEMORY_POS} radius={0.45} color="#FFB74D" label="Memory (RAM)" />}
      {showStorage && <MolecularNode3D position={STORAGE_POS} radius={0.45} color="#BA68C8" label="Storage" />}

      {showFlow && (
        <group>
          <Vector3D start={INPUT_POS} end={[-0.7, 0, 0]} color="#81C784" thickness={0.04} />
          <Vector3D start={CPU_POS} end={[0, 1.6, 0]} color="#FFB74D" thickness={0.04} />
          <Vector3D start={MEMORY_POS} end={[0, 0.7, 0]} color="#FFB74D" thickness={0.04} />
          <Vector3D start={CPU_POS} end={[0, -1.6, 0]} color="#BA68C8" thickness={0.04} />
          {caption('Data flows between every component through the CPU', '#5B8DEF', -3.4)}
        </group>
      )}
    </group>
  )
}

export function ComputerArchitecture3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D computer architecture: input devices, the CPU, memory, storage, and the data flow that connects them"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
