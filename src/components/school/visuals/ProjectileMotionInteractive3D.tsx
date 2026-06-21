'use client'
/**
 * ProjectileMotionInteractive3D — Classical Mechanics Interactive Layer
 * Sprint, Task 2. Additive: live controls (launch angle, launch velocity,
 * gravity preset) drive the trajectory, range, and max-height readouts.
 * Does not modify ProjectileMotion3D.tsx (untouched, still registered/used
 * as-is). Mirrors QuantumTunnelingInteractive3D's structural pattern.
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

const LAUNCH: [number, number, number] = [-4, 0, 0]
const GRAVITY_PRESETS: Record<string, number> = { earth: 9.8, moon: 1.6, jupiter: 24.8 }

function arcPoints(angleDeg: number, v0: number, g: number, steps = 60) {
  const angle = (angleDeg * Math.PI) / 180
  const vx = v0 * Math.cos(angle) * 0.4
  const vy = v0 * Math.sin(angle) * 0.4
  const pts: [number, number, number][] = []
  let t = 0
  const dt = 0.04
  for (let i = 0; i <= steps; i++) {
    const x = LAUNCH[0] + vx * t
    const y = Math.max(0, LAUNCH[1] + vy * t - 0.5 * g * t * t)
    pts.push([x, y, 0])
    if (y <= 0 && i > 5) break
    t += dt
  }
  const range = (2 * vx * vy) / g
  const maxHeight = (vy * vy) / (2 * g)
  return { pts, range, maxHeight, vx, vy }
}

function Scene({ angle, v0, g }: { angle: number; v0: number; g: number }) {
  const { pts, vx, vy } = useMemo(() => arcPoints(angle, v0, g), [angle, v0, g])
  return (
    <group>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#3A4356" />
      </mesh>
      <mesh position={LAUNCH}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#5B8DEF" />
      </mesh>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#81C784" />
        </mesh>
      ))}
      <Vector3D start={LAUNCH} end={[LAUNCH[0] + vx, LAUNCH[1] + vy, 0]} color="#FF6B6B" label="v" />
    </group>
  )
}

interface ProjectileMotionInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function ProjectileMotionInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: ProjectileMotionInteractive3DProps = {}) {
  const [angle, setAngle] = useState(45)
  const [v0, setV0] = useState(10)
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'moon' | 'jupiter'>('earth')
  const touched = useMemo(() => new Set<string>(), [])

  const g = GRAVITY_PRESETS[gravityPreset]
  const { range, maxHeight } = useMemo(() => arcPoints(angle, v0, g), [angle, v0, g])

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'projectile_motion_range',
    context: masteryContext,
    onMasteryEvent,
  })

  const handleNumberChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'angle', label: 'Launch angle', min: 5, max: 85, step: 1, value: angle, onChange: handleNumberChange('angle', setAngle), format: (v) => `${v.toFixed(0)}°` },
    { kind: 'slider', id: 'velocity', label: 'Launch velocity', min: 2, max: 20, step: 0.5, value: v0, onChange: handleNumberChange('velocity', setV0), format: (v) => `${v.toFixed(1)} m/s` },
    {
      kind: 'dropdown', id: 'gravity', label: 'Gravity preset', value: gravityPreset,
      options: [{ value: 'earth', label: 'Earth (9.8)' }, { value: 'moon', label: 'Moon (1.6)' }, { value: 'jupiter', label: 'Jupiter (24.8)' }],
      onChange: (v) => { setGravityPreset(v as 'earth' | 'moon' | 'jupiter'); touched.add('gravity'); emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 }) },
    },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={9} ariaLabel="Interactive 3D projectile motion: adjust launch angle, launch velocity, and gravity preset to see the trajectory, range, and max height change live">
        <Scene angle={angle} v0={v0} g={g} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Range: {range.toFixed(1)} m · Max height: {maxHeight.toFixed(1)} m
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setAngle(45); setV0(10); setGravityPreset('earth') }}
      />
    </div>
  )
}
