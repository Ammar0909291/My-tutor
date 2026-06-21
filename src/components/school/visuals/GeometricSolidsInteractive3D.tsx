'use client'
/**
 * GeometricSolidsInteractive3D — Mathematics Interactive Layer Sprint, Task 5.
 * Additive: a shape selector and scale control drive a live solid plus a
 * dimensions/volume/surface-area readout. Does not modify GeometricSolids3D.tsx.
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

type ShapeType = 'cube' | 'sphere' | 'cylinder' | 'cone'

const BASE_SIZE = 1

function geometryFor(type: ShapeType, scale: number) {
  if (type === 'cube') return { dims: `side ${(BASE_SIZE * scale).toFixed(2)}`, volume: (BASE_SIZE * scale) ** 3, area: 6 * (BASE_SIZE * scale) ** 2 }
  if (type === 'sphere') {
    const r = 0.65 * scale
    return { dims: `radius ${r.toFixed(2)}`, volume: (4 / 3) * Math.PI * r ** 3, area: 4 * Math.PI * r ** 2 }
  }
  if (type === 'cylinder') {
    const r = 0.55 * scale
    const h = 1.2 * scale
    return { dims: `radius ${r.toFixed(2)}, height ${h.toFixed(2)}`, volume: Math.PI * r ** 2 * h, area: 2 * Math.PI * r * h + 2 * Math.PI * r ** 2 }
  }
  const r = 0.6 * scale
  const h = 1.2 * scale
  const slant = Math.sqrt(r * r + h * h)
  return { dims: `radius ${r.toFixed(2)}, height ${h.toFixed(2)}`, volume: (1 / 3) * Math.PI * r ** 2 * h, area: Math.PI * r * slant + Math.PI * r ** 2 }
}

function Scene({ shape, scale }: { shape: ShapeType; scale: number }) {
  if (shape === 'cube') {
    return (
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
    )
  }
  if (shape === 'sphere') {
    return (
      <mesh scale={scale}>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshStandardMaterial color="#5B8DEF" />
      </mesh>
    )
  }
  if (shape === 'cylinder') {
    return (
      <mesh scale={scale}>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 24]} />
        <meshStandardMaterial color="#81C784" />
      </mesh>
    )
  }
  return (
    <mesh scale={scale}>
      <coneGeometry args={[0.6, 1.2, 24]} />
      <meshStandardMaterial color="#FFB74D" />
    </mesh>
  )
}

interface GeometricSolidsInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function GeometricSolidsInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: GeometricSolidsInteractive3DProps = {}) {
  const [shape, setShape] = useState<ShapeType>('cube')
  const [scale, setScale] = useState(1)
  const touched = useMemo(() => new Set<string>(), [])

  const { dims, volume, area } = geometryFor(shape, scale)

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'solid_volume_surface_area',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleShapeChange = (v: string) => {
    setShape(v as ShapeType)
    touched.add('shape')
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 2 })
  }
  const handleScaleChange = (v: number) => {
    setScale(v)
    touched.add('scale')
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 2 })
  }

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown',
      id: 'shape',
      label: 'Shape selector',
      value: shape,
      options: [
        { value: 'cube', label: 'Cube' },
        { value: 'sphere', label: 'Sphere' },
        { value: 'cylinder', label: 'Cylinder' },
        { value: 'cone', label: 'Cone' },
      ],
      onChange: handleShapeChange,
    },
    { kind: 'slider', id: 'scale', label: 'Scale', min: 0.5, max: 2.5, step: 0.1, value: scale, onChange: handleScaleChange, format: (v) => `${v.toFixed(1)}×` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={6} ariaLabel="Interactive 3D geometric solids: choose a shape and scale to see dimensions, volume, and surface area update live">
        <Scene shape={shape} scale={scale} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        {dims} — volume {volume.toFixed(2)} — surface area {area.toFixed(2)}
        {' '}— volume grows with the cube of scale, not linearly.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setShape('cube'); setScale(1) }}
      />
    </div>
  )
}
