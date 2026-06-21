'use client'
/**
 * DoubleSlitInteractive3D — Interactive Simulation Layer Phase 2, Task 1.
 * Additive: wraps the double-slit concept with live controls (slit width,
 * slit separation, wavelength) and a live fringe-spacing readout, using the
 * standard small-angle approximation (fringe spacing ∝ wavelength / separation).
 * Does not modify DoubleSlit3D.tsx (untouched, still registered/used as-is).
 */
import { useMemo, useState } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

/** Small-angle approximation: fringe spacing ∝ wavelength / slit separation, independent of slit width. */
function fringeSpacing(wavelength: number, separation: number) {
  return (wavelength / separation) * 6
}

function Scene({ slitWidth, separation, wavelength }: { slitWidth: number; separation: number; wavelength: number }) {
  const spacing = fringeSpacing(wavelength, separation)
  const hue = 240 + (wavelength - 380) * (0 - 240) / (700 - 380) // rough visible-spectrum tint
  const fringeColor = `hsl(${Math.max(0, Math.min(280, hue))}, 80%, 60%)`

  const fringes = useMemo(() => {
    const bars: { y: number; intensity: number }[] = []
    for (let i = -6; i <= 6; i++) {
      const y = i * spacing
      if (Math.abs(y) > 3) continue
      bars.push({ y, intensity: Math.pow(Math.cos((i * Math.PI) / 2), 2) })
    }
    return bars
  }, [spacing])

  return (
    <group>
      <mesh position={[-4, 0, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.7} />
      </mesh>
      <group position={[-1.2, 0, 0]}>
        {[separation / 2 + slitWidth / 2, 0, -(separation / 2 + slitWidth / 2)].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.2, i === 1 ? separation - slitWidth : 1.6, 2]} />
            <meshStandardMaterial color="#5B6B8C" />
          </mesh>
        ))}
      </group>
      <group position={[4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 6, 2]} />
          <meshStandardMaterial color="#1B2030" />
        </mesh>
        {fringes.map((f, i) => (
          <mesh key={i} position={[0.08, f.y, 0]}>
            <boxGeometry args={[0.04, Math.min(0.4, spacing * 0.7), 1.8]} />
            <meshBasicMaterial color={fringeColor} transparent opacity={f.intensity} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

interface DoubleSlitInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function DoubleSlitInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: DoubleSlitInteractive3DProps) {
  const [slitWidth, setSlitWidth] = useState(0.4)
  const [separation, setSeparation] = useState(1.6)
  const [wavelength, setWavelength] = useState(550)
  const touched = useMemo(() => new Set<string>(), [])

  const emit = createMasteryEmitter({
    visualType: 'quantum_interactive',
    defaultConcept: 'double_slit_interference',
    context: masteryContext,
    onMasteryEvent,
  })

  const spacing = fringeSpacing(wavelength, separation)

  const handleChange = (id: string, setter: (v: number) => void) => (v: number) => {
    setter(v)
    touched.add(id)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= 3 })
  }

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'slitWidth', label: 'Slit width', min: 0.1, max: 0.8, step: 0.05, value: slitWidth, onChange: handleChange('slitWidth', setSlitWidth), format: (v) => v.toFixed(2) },
    { kind: 'slider', id: 'separation', label: 'Slit separation', min: 0.8, max: 3, step: 0.1, value: separation, onChange: handleChange('separation', setSeparation), format: (v) => v.toFixed(1) },
    { kind: 'slider', id: 'wavelength', label: 'Wavelength (nm)', min: 380, max: 700, step: 10, value: wavelength, onChange: handleChange('wavelength', setWavelength), format: (v) => `${v.toFixed(0)}nm` },
  ]

  return (
    <div>
      <ThreeDVisual
        cameraDistance={9}
        ariaLabel="Interactive 3D double-slit experiment: adjust slit width, slit separation, and wavelength to see the interference pattern change live"
      >
        <Scene slitWidth={slitWidth} separation={separation} wavelength={wavelength} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        Fringe spacing: {spacing.toFixed(2)} units — spacing grows with wavelength and shrinks as the
        slits move farther apart; slit width alone does not change the spacing.
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setSlitWidth(0.4); setSeparation(1.6); setWavelength(550) }}
      />
    </div>
  )
}
