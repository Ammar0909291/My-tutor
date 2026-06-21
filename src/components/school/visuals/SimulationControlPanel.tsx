'use client'
/**
 * SimulationControlPanel — 3D Interactive Simulation Layer Phase 1, Task 2.
 * Generic, subject-agnostic control panel (sliders/toggles/dropdowns/reset)
 * for interactive 3D simulations. Renders below a ThreeDVisual scene inside
 * VisualCard's existing card layout — no new playback/narration architecture.
 */
import type { ReactNode } from 'react'

export interface SliderControl {
  kind: 'slider'
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  format?: (value: number) => string
}

export interface ToggleControl {
  kind: 'toggle'
  id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export interface DropdownControl {
  kind: 'dropdown'
  id: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export type SimulationControl = SliderControl | ToggleControl | DropdownControl

interface SimulationControlPanelProps {
  controls: SimulationControl[]
  onReset: () => void
  highlightedControlId?: string | null
  footer?: ReactNode
}

export function SimulationControlPanel({ controls, onReset, highlightedControlId, footer }: SimulationControlPanelProps) {
  return (
    <div
      role="group"
      aria-label="Simulation controls"
      style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 2px', fontSize: 12 }}
    >
      {controls.map((c) => {
        const highlighted = highlightedControlId === c.id
        const wrapStyle = {
          borderRadius: 8,
          padding: highlighted ? '4px 6px' : undefined,
          outline: highlighted ? '2px solid var(--accent, #5B8DEF)' : undefined,
        }
        if (c.kind === 'slider') {
          return (
            <label key={c.id} style={wrapStyle}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{c.label}</span>
                <span style={{ opacity: 0.7 }}>{c.format ? c.format(c.value) : c.value}</span>
              </span>
              <input
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={c.value}
                onChange={(e) => c.onChange(Number(e.target.value))}
                style={{ width: '100%' }}
                aria-label={c.label}
              />
            </label>
          )
        }
        if (c.kind === 'toggle') {
          return (
            <label key={c.id} style={{ ...wrapStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={c.value} onChange={(e) => c.onChange(e.target.checked)} />
              <span>{c.label}</span>
            </label>
          )
        }
        return (
          <label key={c.id} style={wrapStyle}>
            <span style={{ display: 'block', marginBottom: 2 }}>{c.label}</span>
            <select
              value={c.value}
              onChange={(e) => c.onChange(e.target.value)}
              style={{ width: '100%', fontSize: 12 }}
              aria-label={c.label}
            >
              {c.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        )
      })}
      <button
        type="button"
        onClick={onReset}
        style={{ alignSelf: 'flex-start', fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', cursor: 'pointer' }}
      >
        Reset
      </button>
      {footer}
    </div>
  )
}
