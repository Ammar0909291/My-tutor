'use client'
/**
 * QuantumTunnelingInteractive3D — Interactive Simulation Layer Phase 1, Task 4.
 * Additive: wraps the existing tunneling concept with live controls (barrier
 * height, barrier width, particle energy) and a transmission-probability
 * readout, using the simplified rectangular-barrier formula. Explicitly
 * counters "particle borrows energy": barrier height never changes with
 * energy — only transmission probability does. Does not modify
 * QuantumTunneling3D.tsx (untouched, still registered/used as-is).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

function transmissionProbability(barrierHeight: number, barrierWidth: number, energy: number) {
  if (energy >= barrierHeight) return 0.97 // classical-like pass-through (clamped, illustrative)
  const kappa = Math.sqrt(Math.max(0.001, barrierHeight - energy))
  const t = Math.exp(-2 * kappa * barrierWidth)
  return Math.max(0.001, Math.min(0.95, t))
}

function Scene({ height, width, energy }: { height: number; width: number; energy: number }) {
  const T = transmissionProbability(height, width, energy)
  const incomingAmp = 1.3
  const transmittedAmp = incomingAmp * Math.sqrt(T)

  return (
    <group>
      <mesh position={[0, height * 0.6, 0]}>
        <boxGeometry args={[width, height, 2]} />
        <meshStandardMaterial color="#7E57C2" transparent opacity={0.55} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -6 + i * 0.5
        const y = incomingAmp * Math.exp(-Math.pow((x + 3.5) / 1.1, 2)) * Math.cos((x + 3.5) * 4)
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#4DD0E1" />
          </mesh>
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 3 + i * (width / 8)
        const y = transmittedAmp * Math.exp(-Math.pow((x - 3 - width / 2) / 1.1, 2)) * Math.cos((x - 3.5) * 4)
        return (
          <mesh key={`t${i}`} position={[x + width, y, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#81C784" />
          </mesh>
        )
      })}
      <mesh>
        <boxGeometry args={[16, 0.02, 0.02]} />
        <meshBasicMaterial color="#444B5E" />
      </mesh>
    </group>
  )
}

interface QuantumTunnelingInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function QuantumTunnelingInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: QuantumTunnelingInteractive3DProps = {}) {
  const [height, setHeight] = useState(3)
  const [width, setWidth] = useState(1)
  const [energy, setEnergy] = useState(1.5)

  const T = useMemo(() => transmissionProbability(height, width, energy), [height, width, energy])

  const { handleChange } = useControlMastery({ defaultConcept: 'quantum_tunneling_probability', threshold: 3, context: masteryContext, onMasteryEvent })

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'height', label: 'Barrier height', min: 1, max: 6, step: 0.1, value: height, onChange: handleChange('height', setHeight), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'width', label: 'Barrier width', min: 0.3, max: 3, step: 0.1, value: width, onChange: handleChange('width', setWidth), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'energy', label: 'Particle energy', min: 0.1, max: 5.9, step: 0.1, value: energy, onChange: handleChange('energy', setEnergy), format: (v) => v.toFixed(1) },
  ]

  return (
    <div>
      <ThreeDVisual
        cameraDistance={11}
        ariaLabel="Interactive 3D quantum tunneling: adjust barrier height, barrier width, and particle energy to see transmission probability change live"
      >
        <Scene height={height} width={width} energy={energy} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Transmission probability: {(T * 100).toFixed(1)}% — barrier height is fixed by the material;
        only the probability of passing through changes, never the particle&apos;s energy.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setHeight(3); setWidth(1); setEnergy(1.5) }}
      />
    </div>
  )
}
