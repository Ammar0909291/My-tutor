'use client'
/**
 * SurfaceVisualizationInteractive3D — Mathematics Interactive Layer Sprint, Task 4.
 * Additive: a surface-type control (paraboloid / saddle / plane) live-regenerates
 * the mesh and its contour rings. Does not modify SurfaceVisualization3D.tsx.
 */
import { useMemo, useState } from 'react'
import { PlaneGeometry } from 'three'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

const SIZE = 3
const SEGMENTS = 24

type SurfaceType = 'paraboloid' | 'saddle' | 'plane'

function heightFn(type: SurfaceType, x: number, y: number): number {
  if (type === 'paraboloid') return (x * x + y * y) * 0.12
  if (type === 'saddle') return (x * x - y * y) * 0.12
  return (x + y) * 0.15
}

function buildSurfaceGeometry(type: SurfaceType) {
  const geom = new PlaneGeometry(SIZE * 2, SIZE * 2, SEGMENTS, SEGMENTS)
  const pos = geom.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    pos.setZ(i, heightFn(type, x, y))
  }
  pos.needsUpdate = true
  geom.computeVertexNormals()
  return geom
}

const CONTOUR_HEIGHTS = [-0.8, -0.4, 0.4, 0.8, 1.2]

function Scene({ type }: { type: SurfaceType }) {
  const surfaceGeom = useMemo(() => buildSurfaceGeometry(type), [type])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Vector3D start={[0, 0, 0]} end={[3, 0, 0]} color="#FF6B6B" label="x" />
        <Vector3D start={[0, 0, 0]} end={[0, 3, 0]} color="#81C784" label="z (height)" />
        <Vector3D start={[0, 0, 0]} end={[0, 0, 3]} color="#5B8DEF" label="y" />
      </group>

      <mesh geometry={surfaceGeom}>
        <meshStandardMaterial color="#5B8DEF" transparent opacity={0.85} side={2} />
      </mesh>

      {CONTOUR_HEIGHTS.filter((h) => h >= 0 || type !== 'paraboloid').map((h, i) => (
        <mesh key={i} position={[0, 0, h]}>
          <ringGeometry args={[Math.max(Math.sqrt(Math.abs(h) / 0.12) - 0.02, 0), Math.sqrt(Math.abs(h) / 0.12) + 0.6, 48]} />
          <meshBasicMaterial color="#FFB74D" transparent opacity={0.15} side={2} />
        </mesh>
      ))}
    </group>
  )
}

interface SurfaceVisualizationInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

const SURFACE_LABEL: Record<SurfaceType, string> = {
  paraboloid: 'z = x² + y² (paraboloid — opens upward, all positive curvature)',
  saddle: 'z = x² − y² (saddle — curves up along x, down along y)',
  plane: 'z = x + y (plane — flat, no curvature)',
}

export function SurfaceVisualizationInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: SurfaceVisualizationInteractive3DProps = {}) {
  const [surfaceType, setSurfaceType] = useState<SurfaceType>('paraboloid')

  const { mark } = useControlMastery({ defaultConcept: 'surface_shape_from_function', threshold: 2, context: masteryContext, onMasteryEvent })

  const handleChange = (v: string) => {
    setSurfaceType(v as SurfaceType)
    mark(v)
  }

  const controls: SimulationControl[] = [
    {
      kind: 'dropdown',
      id: 'surfaceType',
      label: 'Surface type',
      value: surfaceType,
      options: [
        { value: 'paraboloid', label: 'Paraboloid' },
        { value: 'saddle', label: 'Saddle' },
        { value: 'plane', label: 'Plane' },
      ],
      onChange: handleChange,
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={8} ariaLabel="Interactive 3D surface visualization: switch between a paraboloid, a saddle, and a plane to see the surface and its contour rings regenerate live">
        <Scene type={surfaceType} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        {SURFACE_LABEL[surfaceType]}
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => setSurfaceType('paraboloid')}
      />
    </div>
  )
}
