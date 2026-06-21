'use client'
/**
 * VisualCard — Sprint BW · Animated Teaching Engine wiring Sprint R.1
 * Renders the appropriate SVG visual inside a lightweight card and drives its
 * step-by-step teaching animation via useTeachingPlayback + VisualPlaybackControls.
 * Architecture unchanged: AI response → VisualType → VisualCard → SVG component.
 *
 * Sprint U — additive narration wiring: when a caller supplies a
 * `narrationTimeline` (derived from the real tutor explanation via
 * narrationSource.ts), the visual advances with narration instead of a timer,
 * reusing the Sprint S/T infrastructure (tutorVisualSync, narrationProgress,
 * synchronizedPlayback) unchanged. Omitting `narrationTimeline` (or supplying
 * one with zero segments) preserves exact Sprint R.1 timer-mode behavior.
 */

import { useEffect, useState } from 'react'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
import { useTeachingPlayback } from '@/hooks/useTeachingPlayback'
import { VisualPlaybackControls } from './VisualPlaybackControls'
import { NumberLine } from './NumberLine'
import { FractionBar } from './FractionBar'
import { PercentageGrid } from './PercentageGrid'
import { CoordinatePlane } from './CoordinatePlane'
import { GeometryShapes } from './GeometryShapes'
import { FoodChain } from './FoodChain'
import { WaterCycle } from './WaterCycle'
import { SolarSystem } from './SolarSystem'
import { ForceDiagram } from './ForceDiagram'
import { CircuitDiagram } from './CircuitDiagram'
import { DoubleSlit } from './DoubleSlit'
import { WaveFunctionPlot } from './WaveFunctionPlot'
import { PotentialWell } from './PotentialWell'
import { QuantumTunneling } from './QuantumTunneling'
import { BlochSphere } from './BlochSphere'
import { EnergyLevelDiagram } from './EnergyLevelDiagram'
import { QuantumCircuit } from './QuantumCircuit'
import { SternGerlach } from './SternGerlach'
import { EntanglementPair } from './EntanglementPair'
import { ParticleSystem3D } from './ParticleSystem3D'
import { WaveSimulation3D, FieldVisualization3D, StructureVisualization3D } from './ThreeDEngineStub'
import { DoubleSlit3D } from './DoubleSlit3D'
import { QuantumTunneling3D } from './QuantumTunneling3D'
import { BlochSphere3D } from './BlochSphere3D'
import { SternGerlach3D } from './SternGerlach3D'
import { HydrogenOrbital3D } from './HydrogenOrbital3D'
import { ProjectileMotion3D } from './ProjectileMotion3D'
import { NewtonForces3D } from './NewtonForces3D'
import { MomentumCollision3D } from './MomentumCollision3D'
import { CircularMotion3D } from './CircularMotion3D'
import { PendulumMotion3D } from './PendulumMotion3D'
import type { LessonTimeline } from '@/lib/visuals/lessonSegments'
import {
  createNarrationProgress,
  advance,
  reset,
  visualStepForSegment,
  isNarrationComplete,
} from '@/lib/visuals/synchronizedPlayback'
import type { NarrationProgress } from '@/lib/visuals/narrationProgress'

/** Base ms per narration beat before speed scaling — mirrors timer mode's stepDurationMs. */
const NARRATION_STEP_DURATION_MS = 700

interface VisualCardProps {
  type: VisualType
  /** Auto-start the teaching animation when the card appears (default true). */
  autoPlay?: boolean
  /** Initial animation speed multiplier (e.g. the Learn panel's voice speed). */
  speed?: number
  /** Sprint U — additive: true when the caller has real narration to sync to. */
  hasNarration?: boolean
  /** Sprint U — additive: narration segments derived from the tutor's explanation text. */
  narrationTimeline?: LessonTimeline
}

/** Number of teaching steps each visual reveals — drives the timeline length. */
export const VISUAL_STEP_COUNTS: Record<VisualType, number> = {
  number_line: 4,
  fraction_bar: 4,
  percentage_grid: 3,
  coordinate_plane: 5,
  geometry_shape: 4,
  food_chain: 5,
  water_cycle: 6,
  solar_system: 3,
  force_diagram: 5,
  circuit_diagram: 5,
  double_slit: 5,
  wave_function: 4,
  potential_well: 5,
  quantum_tunneling: 5,
  bloch_sphere: 5,
  energy_level_diagram: 5,
  quantum_circuit: 5,
  stern_gerlach: 5,
  entanglement_pair: 5,
  three_particle_system: 5,
  three_wave_simulation: 5,
  three_field_visualization: 5,
  three_structure_visualization: 5,
  three_double_slit: 5,
  three_quantum_tunneling: 5,
  three_bloch_sphere: 5,
  three_stern_gerlach: 5,
  three_hydrogen_orbital: 5,
  three_projectile_motion: 5,
  three_newton_forces: 5,
  three_momentum_collision: 5,
  three_circular_motion: 5,
  three_pendulum_motion: 5,
}

function VisualComponent({ type, revealStep }: { type: VisualType; revealStep: number }) {
  switch (type) {
    case 'number_line':      return <NumberLine revealStep={revealStep} />
    case 'fraction_bar':     return <FractionBar revealStep={revealStep} />
    case 'percentage_grid':  return <PercentageGrid revealStep={revealStep} />
    case 'coordinate_plane': return <CoordinatePlane revealStep={revealStep} />
    case 'geometry_shape':   return <GeometryShapes revealStep={revealStep} />
    case 'food_chain':       return <FoodChain revealStep={revealStep} />
    case 'water_cycle':      return <WaterCycle revealStep={revealStep} />
    case 'solar_system':     return <SolarSystem revealStep={revealStep} />
    case 'force_diagram':    return <ForceDiagram revealStep={revealStep} />
    case 'circuit_diagram':  return <CircuitDiagram revealStep={revealStep} />
    case 'double_slit':       return <DoubleSlit revealStep={revealStep} />
    case 'wave_function':     return <WaveFunctionPlot revealStep={revealStep} />
    case 'potential_well':    return <PotentialWell revealStep={revealStep} />
    case 'quantum_tunneling': return <QuantumTunneling revealStep={revealStep} />
    case 'bloch_sphere':      return <BlochSphere revealStep={revealStep} />
    case 'energy_level_diagram': return <EnergyLevelDiagram revealStep={revealStep} />
    case 'quantum_circuit':   return <QuantumCircuit revealStep={revealStep} />
    case 'stern_gerlach':     return <SternGerlach revealStep={revealStep} />
    case 'entanglement_pair': return <EntanglementPair revealStep={revealStep} />
    case 'three_particle_system':         return <ParticleSystem3D revealStep={revealStep} />
    case 'three_wave_simulation':         return <WaveSimulation3D revealStep={revealStep} />
    case 'three_field_visualization':     return <FieldVisualization3D revealStep={revealStep} />
    case 'three_structure_visualization': return <StructureVisualization3D revealStep={revealStep} />
    case 'three_double_slit':         return <DoubleSlit3D revealStep={revealStep} />
    case 'three_quantum_tunneling':   return <QuantumTunneling3D revealStep={revealStep} />
    case 'three_bloch_sphere':        return <BlochSphere3D revealStep={revealStep} />
    case 'three_stern_gerlach':       return <SternGerlach3D revealStep={revealStep} />
    case 'three_hydrogen_orbital':    return <HydrogenOrbital3D revealStep={revealStep} />
    case 'three_projectile_motion':   return <ProjectileMotion3D revealStep={revealStep} />
    case 'three_newton_forces':       return <NewtonForces3D revealStep={revealStep} />
    case 'three_momentum_collision':  return <MomentumCollision3D revealStep={revealStep} />
    case 'three_circular_motion':     return <CircularMotion3D revealStep={revealStep} />
    case 'three_pendulum_motion':     return <PendulumMotion3D revealStep={revealStep} />
  }
}

export function VisualCard({ type, autoPlay = true, speed = 1, hasNarration, narrationTimeline }: VisualCardProps) {
  const meta = VISUAL_META[type]
  const stepCount = VISUAL_STEP_COUNTS[type]

  const totalSegments = narrationTimeline?.segments.length ?? 0
  // Fallback gate — Task 4: only enter narration mode when there is real
  // narration to drive it; otherwise behavior is byte-for-byte Sprint R.1 timer mode.
  const useNarrationMode = !!(hasNarration && totalSegments > 0)

  const [progress, setProgress] = useState<NarrationProgress>(() => createNarrationProgress(totalSegments))
  const [narrationPlaying, setNarrationPlaying] = useState(autoPlay)
  const [narrationSpeed, setNarrationSpeed] = useState(speed)

  // Re-baseline narration progress whenever the underlying timeline changes
  // (e.g. a new tutor message with a different narration length arrives).
  useEffect(() => {
    setProgress(createNarrationProgress(totalSegments))
    setNarrationPlaying(autoPlay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSegments])

  // Task 6 — auto-advance one narration beat at a time; speed scales the
  // interval, never the timer engine itself. Cleared/rescheduled on every
  // progress/speed change so pause/replay/speed-change all take effect immediately.
  useEffect(() => {
    if (!useNarrationMode || !narrationPlaying) return
    if (progress.currentSegment >= progress.totalSegments) return
    const id = setTimeout(() => setProgress((p) => advance(p)), NARRATION_STEP_DURATION_MS / narrationSpeed)
    return () => clearTimeout(id)
  }, [useNarrationMode, narrationPlaying, progress, narrationSpeed])

  const narrationStep = visualStepForSegment(progress, stepCount)

  // Single hook call (rules-of-hooks safe) — mode switches based on whether
  // usable narration was supplied; timer engine itself is untouched either way.
  const playback = useTeachingPlayback(
    stepCount,
    useNarrationMode ? { mode: 'narration', narrationStep, speed: narrationSpeed } : { autoPlay, speed }
  )

  const controls = useNarrationMode
    ? {
        isPlaying: narrationPlaying,
        isComplete: isNarrationComplete(progress),
        speed: narrationSpeed,
        onPlay: () => setNarrationPlaying(true),
        onPause: () => setNarrationPlaying(false),
        onReplay: () => {
          setProgress(reset(progress))
          setNarrationPlaying(true)
        },
        onSpeedChange: setNarrationSpeed,
      }
    : {
        isPlaying: playback.isPlaying,
        isComplete: playback.isComplete,
        speed: playback.speed,
        onPlay: playback.play,
        onPause: playback.pause,
        onReplay: playback.replay,
        onSpeedChange: playback.setSpeed,
      }

  return (
    <div
      role="figure"
      aria-label={`Visual aid: ${meta.title}`}
      style={{
        marginTop: 10,
        marginBottom: 2,
        borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '10px 12px',
        maxWidth: 360,
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1,
          textTransform: 'uppercase', color: 'var(--coral)',
          background: 'var(--coral-muted)', padding: '2px 7px', borderRadius: 20,
        }}>
          Visual Aid
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>
          {meta.title}
        </span>
      </div>

      {/* diagram */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <VisualComponent type={type} revealStep={playback.revealStep} />
      </div>

      {/* playback controls */}
      <VisualPlaybackControls
        isPlaying={controls.isPlaying}
        isComplete={controls.isComplete}
        speed={controls.speed}
        onPlay={controls.onPlay}
        onPause={controls.onPause}
        onReplay={controls.onReplay}
        onSpeedChange={controls.onSpeedChange}
      />

      {/* screen-reader / fallback description */}
      <p style={{ margin: '6px 0 0', fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.4 }}>
        {meta.description}
      </p>
    </div>
  )
}
