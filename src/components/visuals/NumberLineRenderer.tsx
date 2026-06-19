'use client'
/**
 * NumberLineRenderer — Visual Learning Sprint B.
 * Responsive SVG number line supporting positive/negative values, basic
 * fractions (non-integer highlights labelled as simple fractions where
 * possible), and highlighted points. Theme-aware via CSS variables.
 */
import { useEffect, useRef, useState } from 'react'
import type { NumberLineSpec } from '@/lib/visuals/visualSpec'

/** Format a number as a simple fraction when it is a clean half/third/quarter, else decimal. */
function fractionLabel(n: number): string {
  if (Number.isInteger(n)) return String(n)
  const sign = n < 0 ? '-' : ''
  const a = Math.abs(n)
  const whole = Math.floor(a)
  const frac = a - whole
  const denoms = [2, 3, 4, 5, 6, 8, 10]
  for (const d of denoms) {
    const num = Math.round(frac * d)
    if (Math.abs(frac - num / d) < 1e-6 && num !== 0) {
      const wholePart = whole > 0 ? `${whole} ` : ''
      return `${sign}${wholePart}${num}/${d}`
    }
  }
  return String(Math.round(n * 1000) / 1000)
}

/** Choose a tick step so ticks aren't overcrowded for the given range. */
function autoStep(start: number, end: number): number {
  const span = end - start
  const target = 12 // aim for ~12 ticks
  const raw = span / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const norm = raw / mag
  const step = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10
  return Math.max(step * mag, span / 50)
}

export function NumberLineRenderer({ spec }: { spec: NumberLineSpec }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [w, setW] = useState(360)
  const h = 90

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => setW(Math.max(220, entries[0].contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { start, end } = spec
  const padX = 24
  const usableW = Math.max(1, w - padX * 2)
  const lineY = 46
  const toX = (v: number) => padX + ((v - start) / (end - start)) * usableW

  const step = spec.step && spec.step > 0 ? spec.step : autoStep(start, end)
  const ticks: number[] = []
  const first = Math.ceil(start / step) * step
  for (let v = first; v <= end + 1e-9; v += step) ticks.push(Math.round(v * 1e6) / 1e6)

  const highlights = (spec.highlight ?? []).filter((p) => p >= start && p <= end)

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={badgeStyle}>Number Line</span>
        {spec.title && <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary, #6b7280)' }}>{spec.title}</span>}
      </div>
      <div ref={wrapRef} style={{ width: '100%' }}>
        <svg width={w} height={h} role="img" aria-label={`Number line from ${start} to ${end}${highlights.length ? `, highlighting ${highlights.join(', ')}` : ''}`} style={{ display: 'block' }}>
          {/* main line with arrowheads */}
          <defs>
            <marker id="nl-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-secondary, #6b7280)" />
            </marker>
          </defs>
          <line x1={padX - 12} y1={lineY} x2={w - padX + 12} y2={lineY} stroke="var(--text-secondary, #6b7280)" strokeWidth={2} markerStart="url(#nl-arrow)" markerEnd="url(#nl-arrow)" />
          {/* ticks + labels */}
          {ticks.map((v) => (
            <g key={`t${v}`}>
              <line x1={toX(v)} y1={lineY - 6} x2={toX(v)} y2={lineY + 6} stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
              <text x={toX(v)} y={lineY + 22} fontSize={10} textAnchor="middle" fill="var(--text-dim, #888)">{fractionLabel(v)}</text>
            </g>
          ))}
          {/* highlighted points */}
          {highlights.map((p, i) => (
            <g key={`h${p}-${i}`}>
              <circle cx={toX(p)} cy={lineY} r={6} fill="var(--coral, #F78166)" stroke="var(--bg-surface, #fff)" strokeWidth={2} />
              <text x={toX(p)} y={lineY - 12} fontSize={11} fontWeight={700} textAnchor="middle" fill="var(--coral, #F78166)">{fractionLabel(p)}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  borderRadius: 12,
  border: '1px solid var(--border-subtle, #e5e7eb)',
  background: 'var(--bg-surface, #fff)',
  padding: '10px 12px',
  maxWidth: 440,
}
const badgeStyle: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
  color: 'var(--coral, #F78166)', background: 'var(--coral-muted, rgba(247,129,102,0.12))',
  padding: '2px 7px', borderRadius: 20,
}
