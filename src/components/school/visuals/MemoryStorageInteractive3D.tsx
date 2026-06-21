'use client'
/**
 * MemoryStorageInteractive3D — Computer Science Interactive Layer Sprint, Task 3.
 * Additive: live controls (cache size, RAM size, storage type) drive the tier widths,
 * the access path up the hierarchy, and a relative-latency readout, so the student sees
 * the speed-vs-size trade-off of the memory hierarchy. Does not modify MemoryStorage3D.tsx.
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

type StorageType = 'hdd' | 'ssd' | 'nvme'
const STORAGE_LATENCY: Record<StorageType, number> = { hdd: 1000, ssd: 100, nvme: 25 }

function Tier({ y, width, color, label }: { y: number; width: number; color: string; label: string }) {
  return (
    <group>
      <mesh position={[0, y, 0]}>
        <boxGeometry args={[width, 0.7, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={[0, y, 0.6]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.8)' }}>{label}</span>
      </Html>
    </group>
  )
}

function Scene({ cacheSize, ramSize }: { cacheSize: number; ramSize: number }) {
  // Width encodes size; tiers stay ordered fast/small (top) → slow/large (bottom).
  return (
    <group>
      <Tier y={2.4} width={1.0} color="#5B8DEF" label="CPU" />
      <Tier y={1.2} width={0.8 + cacheSize * 0.04} color="#4DD0E1" label={`Cache ${cacheSize}MB`} />
      <Tier y={0} width={1.6 + ramSize * 0.06} color="#FFB74D" label={`RAM ${ramSize}GB`} />
      <Tier y={-1.4} width={3.8} color="#BA68C8" label="Storage" />
      <Vector3D start={[2.2, -1.4, 0]} end={[2.2, 2.4, 0]} color="#9AA5B8" thickness={0.03} />
    </group>
  )
}

interface MemoryStorageInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function MemoryStorageInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: MemoryStorageInteractive3DProps = {}) {
  const [cacheSize, setCacheSize] = useState(8)
  const [ramSize, setRamSize] = useState(8)
  const [storageType, setStorageType] = useState<StorageType>('ssd')

  const { mark } = useControlMastery({ defaultConcept: 'memory_hierarchy_latency', threshold: 2, context: masteryContext, onMasteryEvent })

  const accessLatency = useMemo(() => STORAGE_LATENCY[storageType], [storageType])

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'cacheSize', label: 'Cache size', min: 1, max: 64, step: 1, value: cacheSize, onChange: (v) => { setCacheSize(v); mark('cacheSize') }, format: (v) => `${v} MB` },
    { kind: 'slider', id: 'ramSize', label: 'RAM size', min: 2, max: 32, step: 2, value: ramSize, onChange: (v) => { setRamSize(v); mark('ramSize') }, format: (v) => `${v} GB` },
    {
      kind: 'dropdown', id: 'storageType', label: 'Storage type', value: storageType,
      options: [{ value: 'hdd', label: 'HDD (~1000×)' }, { value: 'ssd', label: 'SSD (~100×)' }, { value: 'nvme', label: 'NVMe (~25×)' }],
      onChange: (v) => { setStorageType(v as StorageType); mark('storageType') },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D memory hierarchy: adjust cache size, RAM size, and storage type to see the speed-versus-size trade-off and relative access latency">
        <Scene cacheSize={cacheSize} ramSize={ramSize} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Cache is the smallest, fastest tier; storage is the largest, slowest. A cache miss reaching storage costs ~{accessLatency}× a cache hit.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setCacheSize(8); setRamSize(8); setStorageType('ssd') }}
      />
    </div>
  )
}
