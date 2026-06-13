'use client'
/**
 * VisualCard — Sprint BW
 * Renders the appropriate SVG visual inside a lightweight card.
 * Mobile-friendly, dark-mode aware, accessible.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
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
}

function VisualComponent({ type }: { type: VisualType }) {
  switch (type) {
    case 'number_line':      return <NumberLine />
    case 'fraction_bar':     return <FractionBar />
    case 'percentage_grid':  return <PercentageGrid />
    case 'coordinate_plane': return <CoordinatePlane />
    case 'geometry_shape':   return <GeometryShapes />
    case 'food_chain':       return <FoodChain />
    case 'water_cycle':      return <WaterCycle />
    case 'solar_system':     return <SolarSystem />
    case 'force_diagram':    return <ForceDiagram />
    case 'circuit_diagram':  return <CircuitDiagram />
  }
}

export function VisualCard({ type }: VisualCardProps) {
  const meta = VISUAL_META[type]

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
        <VisualComponent type={type} />
      </div>

      {/* screen-reader / fallback description */}
      <p style={{ margin: '6px 0 0', fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.4 }}>
        {meta.description}
      </p>
    </div>
  )
}
