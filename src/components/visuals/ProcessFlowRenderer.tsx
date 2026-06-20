'use client'
/**
 * ProcessFlowRenderer — Visual Learning Sprint E (Science Flow Engine).
 *
 * SVG-only renderer for sequential scientific processes (photosynthesis,
 * water cycle, digestion, food chain, ...). Every step is plain validated
 * text (see visualSpec.ts) — no expression parsing, no canvas, no WebGL, no
 * external diagram library. Responsive (ResizeObserver) and theme-aware (CSS
 * variables with literal fallbacks), matching GraphRenderer/NumberLineRenderer/
 * GeometryRenderer.
 */
import { useEffect, useRef, useState } from 'react'
import type { ProcessFlowSpec } from '@/lib/visuals/visualSpec'

const STEP_W = 150
const STEP_H = 56
const GAP = 36 // space between step boxes, used for the arrow

function useResponsiveWidth() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(360)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      setWidth(Math.max(220, entries[0].contentRect.width))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, width }
}

/** 'auto' picks horizontal only when every step fits at a legible width; otherwise vertical (which always fits, scrolling if needed). */
function resolveOrientation(spec: ProcessFlowSpec, containerWidth: number): 'vertical' | 'horizontal' {
  if (spec.orientation === 'vertical' || spec.orientation === 'horizontal') return spec.orientation
  const neededWidth = spec.steps.length * STEP_W + (spec.steps.length - 1) * GAP
  return neededWidth <= containerWidth ? 'horizontal' : 'vertical'
}

export function ProcessFlowRenderer({ spec }: { spec: ProcessFlowSpec }) {
  const { ref, width } = useResponsiveWidth()
  const orientation = resolveOrientation(spec, width)

  return orientation === 'horizontal'
    ? <HorizontalFlow spec={spec} wrapRef={ref} width={width} />
    : <VerticalFlow spec={spec} wrapRef={ref} width={width} />
}

function VerticalFlow({ spec, wrapRef, width }: { spec: ProcessFlowSpec; wrapRef: React.MutableRefObject<HTMLDivElement | null>; width: number }) {
  const boxW = Math.min(STEP_W + 60, width - 16)
  const cx = width / 2
  const h = spec.steps.length * STEP_H + (spec.steps.length - 1) * GAP + 16

  return (
    <Card title={spec.title} badge="PROCESS">
      <div ref={wrapRef} style={{ width: '100%' }}>
        <svg width={width} height={h} role="img" aria-label={`${spec.title} process flow`} style={{ display: 'block' }}>
          {spec.steps.map((step, i) => {
            const y = i * (STEP_H + GAP) + 8
            return (
              <g key={i}>
                <StepBox x={cx - boxW / 2} y={y} w={boxW} h={STEP_H} index={i} step={step} />
                {i < spec.steps.length - 1 && (
                  <Arrow x1={cx} y1={y + STEP_H} x2={cx} y2={y + STEP_H + GAP} vertical />
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}

function HorizontalFlow({ spec, wrapRef, width }: { spec: ProcessFlowSpec; wrapRef: React.MutableRefObject<HTMLDivElement | null>; width: number }) {
  const n = spec.steps.length
  const totalW = n * STEP_W + (n - 1) * GAP
  const startX = Math.max(8, (width - totalW) / 2)
  const h = STEP_H + 16

  return (
    <Card title={spec.title} badge="PROCESS">
      <div ref={wrapRef} style={{ width: '100%', overflowX: 'auto' }}>
        <svg width={Math.max(width, totalW + 16)} height={h} role="img" aria-label={`${spec.title} process flow`} style={{ display: 'block' }}>
          {spec.steps.map((step, i) => {
            const x = startX + i * (STEP_W + GAP)
            const y = 8
            return (
              <g key={i}>
                <StepBox x={x} y={y} w={STEP_W} h={STEP_H} index={i} step={step} />
                {i < n - 1 && (
                  <Arrow x1={x + STEP_W} y1={y + STEP_H / 2} x2={x + STEP_W + GAP} y2={y + STEP_H / 2} vertical={false} />
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}

// ── shared pieces ────────────────────────────────────────────────────────────
function StepBox({ x, y, w, h, index, step }: { x: number; y: number; w: number; h: number; index: number; step: ProcessFlowSpec['steps'][number] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2} />
      <circle cx={x + 16} cy={y + 16} r={10} fill="var(--coral, #F78166)" />
      <text x={x + 16} y={y + 20} fontSize={11} fontWeight={700} textAnchor="middle" fill="#fff">{index + 1}</text>
      <text x={x + w / 2} y={step.note ? y + h / 2 - 2 : y + h / 2 + 4} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--text-secondary, #1f2328)">
        {step.title}
      </text>
      {step.note && (
        <text x={x + w / 2} y={y + h / 2 + 16} fontSize={9.5} textAnchor="middle" fill="var(--text-dim, #888)">
          {step.note}
        </text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, vertical }: { x1: number; y1: number; x2: number; y2: number; vertical: boolean }) {
  const tip = vertical ? { x: x2, y: y2 } : { x: x2, y: y2 }
  const back = vertical
    ? [{ x: x2 - 5, y: y2 - 8 }, { x: x2 + 5, y: y2 - 8 }]
    : [{ x: x2 - 8, y: y2 - 5 }, { x: x2 - 8, y: y2 + 5 }]
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-secondary, #6b7280)" strokeWidth={2} />
      <polygon points={`${tip.x},${tip.y} ${back[0].x},${back[0].y} ${back[1].x},${back[1].y}`} fill="var(--text-secondary, #6b7280)" />
    </g>
  )
}

function Card({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={badgeStyle}>{badge}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary, #6b7280)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  borderRadius: 12,
  border: '1px solid var(--border-subtle, #e5e7eb)',
  background: 'var(--bg-surface, #fff)',
  padding: '10px 12px',
  maxWidth: 600,
}
const badgeStyle: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
  color: 'var(--coral, #F78166)', background: 'var(--coral-muted, rgba(247,129,102,0.12))',
  padding: '2px 7px', borderRadius: 20,
}
