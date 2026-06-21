'use client'
/**
 * TransformationsInteractive3D — Mathematics Interactive Layer Sprint, Task 6.
 * Additive: live controls (translation, rotation, scaling) drive a transformed
 * cube shown alongside the unmoved original, plus a values readout. Does not
 * modify Transformations3D.tsx.
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const ORIGINAL_POS: [number, number, number] = [-1.5, 0, 0]

function Scene({ translation, rotation, scale }: { translation: number; rotation: number; scale: number }) {
  const transformedPos: [number, number, number] = [-1.5 + translation, 0, 0]
  return (
    <group>
      <mesh position={ORIGINAL_POS}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#9AA5B8" transparent opacity={0.5} />
      </mesh>
      <mesh position={transformedPos} rotation={[0, rotation, rotation / 2]} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
    </group>
  )
}

interface TransformationsInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function TransformationsInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: TransformationsInteractive3DProps = {}) {
  const [translation, setTranslation] = useState(2.5)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const touched = useMemo(() => new Set<string>(), [])

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'transformation_independence',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'translation', label: 'Translation', min: 0, max: 4, step: 0.1, value: translation, onChange: handleChange('translation', setTranslation), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'rotation', label: 'Rotation (rad)', min: 0, max: Math.PI * 2, step: 0.1, value: rotation, onChange: handleChange('rotation', setRotation), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'scaling', label: 'Scaling', min: 0.3, max: 2, step: 0.1, value: scale, onChange: handleChange('scaling', setScale), format: (v) => `${v.toFixed(1)}×` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D transformations: adjust translation, rotation, and scaling to see a cube transform live next to the unmoved original">
        <Scene translation={translation} rotation={rotation} scale={scale} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Translation {translation.toFixed(1)} — Rotation {rotation.toFixed(1)} rad — Scale {scale.toFixed(1)}×
        {' '}— each transformation changes the shape independently of the others.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setTranslation(2.5); setRotation(0); setScale(1) }}
      />
    </div>
  )
}
