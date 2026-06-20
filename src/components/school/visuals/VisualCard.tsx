'use client'
/**
 * VisualCard — Sprint BW · Animated Teaching Engine wiring Sprint R.1
 * Renders the appropriate SVG visual inside a lightweight card and drives its
 * step-by-step teaching animation via useTeachingPlayback + VisualPlaybackControls.
 * Architecture unchanged: AI response → VisualType → VisualCard → SVG component.
 */

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

interface VisualCardProps {
  type: VisualType
  /** Auto-start the teaching animation when the card appears (default true). */
  autoPlay?: boolean
  /** Initial animation speed multiplier (e.g. the Learn panel's voice speed). */
  speed?: number
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
  }
}

export function VisualCard({ type, autoPlay = true, speed = 1 }: VisualCardProps) {
  const meta = VISUAL_META[type]
  const stepCount = VISUAL_STEP_COUNTS[type]
  const playback = useTeachingPlayback(stepCount, { autoPlay, speed })

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
        isPlaying={playback.isPlaying}
        isComplete={playback.isComplete}
        speed={playback.speed}
        onPlay={playback.play}
        onPause={playback.pause}
        onReplay={playback.replay}
        onSpeedChange={playback.setSpeed}
      />

      {/* screen-reader / fallback description */}
      <p style={{ margin: '6px 0 0', fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.4 }}>
        {meta.description}
      </p>
    </div>
  )
}
