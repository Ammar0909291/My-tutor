'use client'
/**
 * ComputerArchitectureInteractive3D — Computer Science Interactive Layer Sprint, Task 2.
 * Additive: live controls (CPU speed, memory size, storage type) drive a data-movement
 * display, the current bottleneck component, and a relative throughput readout, so the
 * student observes that a faster CPU does not help when memory or storage is the bottleneck.
 * Does not modify ComputerArchitecture3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

type StorageType = 'hdd' | 'ssd' | 'nvme'
const STORAGE_SPEED: Record<StorageType, number> = { hdd: 2, ssd: 6, nvme: 9 }

const CPU_POS: [number, number, number] = [0, 0, 0]
const MEMORY_POS: [number, number, number] = [0, 2.2, 0]
const STORAGE_POS: [number, number, number] = [0, -2.2, 0]

function Scene({ cpuSpeed, memorySize, storageSpeed, bottleneck }: { cpuSpeed: number; memorySize: number; storageSpeed: number; bottleneck: string }) {
  // Arrow thickness scales with each component's relative speed — the thinnest link is the bottleneck.
  return (
    <group>
      <MolecularNode3D position={CPU_POS} radius={0.6} color={bottleneck === 'CPU' ? '#FF6B6B' : '#5B8DEF'} label={`CPU ×${cpuSpeed}`} />
      <MolecularNode3D position={MEMORY_POS} radius={0.45} color={bottleneck === 'Memory' ? '#FF6B6B' : '#FFB74D'} label={`RAM ${memorySize}GB`} />
      <MolecularNode3D position={STORAGE_POS} radius={0.45} color={bottleneck === 'Storage' ? '#FF6B6B' : '#BA68C8'} label="Storage" />
      <Vector3D start={MEMORY_POS} end={[0, 0.7, 0]} color="#FFB74D" thickness={0.02 + memorySize * 0.004} />
      <Vector3D start={STORAGE_POS} end={[0, -0.7, 0]} color="#BA68C8" thickness={0.02 + storageSpeed * 0.006} />
    </group>
  )
}

interface ComputerArchitectureInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function ComputerArchitectureInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: ComputerArchitectureInteractive3DProps = {}) {
  const [cpuSpeed, setCpuSpeed] = useState(4)
  const [memorySize, setMemorySize] = useState(8)
  const [storageType, setStorageType] = useState<StorageType>('ssd')

  const { mark } = useControlMastery({ defaultConcept: 'computer_architecture_bottleneck', threshold: 2, context: masteryContext, onMasteryEvent })

  const storageSpeed = STORAGE_SPEED[storageType]
  const { bottleneck, throughput } = useMemo(() => {
    // The slowest of the three relative speeds caps overall throughput.
    const speeds: { name: string; value: number }[] = [
      { name: 'CPU', value: cpuSpeed },
      { name: 'Memory', value: memorySize / 2 },
      { name: 'Storage', value: storageSpeed },
    ]
    const slowest = speeds.reduce((a, b) => (b.value < a.value ? b : a))
    return { bottleneck: slowest.name, throughput: slowest.value }
  }, [cpuSpeed, memorySize, storageSpeed])

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'cpuSpeed', label: 'CPU speed', min: 1, max: 10, step: 1, value: cpuSpeed, onChange: (v) => { setCpuSpeed(v); mark('cpuSpeed') }, format: (v) => `×${v}` },
    { kind: 'slider', id: 'memorySize', label: 'Memory (RAM) size', min: 2, max: 32, step: 2, value: memorySize, onChange: (v) => { setMemorySize(v); mark('memorySize') }, format: (v) => `${v} GB` },
    {
      kind: 'dropdown', id: 'storageType', label: 'Storage type', value: storageType,
      options: [{ value: 'hdd', label: 'HDD (slow)' }, { value: 'ssd', label: 'SSD' }, { value: 'nvme', label: 'NVMe (fast)' }],
      onChange: (v) => { setStorageType(v as StorageType); mark('storageType') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D computer architecture: adjust CPU speed, memory size, and storage type to see which component becomes the bottleneck and how throughput changes">
        <Scene cpuSpeed={cpuSpeed} memorySize={memorySize} storageSpeed={storageSpeed} bottleneck={bottleneck} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Bottleneck: <strong style={{ color: '#FF6B6B' }}>{bottleneck}</strong> — relative throughput ×{throughput.toFixed(1)}. A faster CPU does not help once memory or storage limits the flow.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setCpuSpeed(4); setMemorySize(8); setStorageType('ssd') }}
      />
    </div>
  )
}
