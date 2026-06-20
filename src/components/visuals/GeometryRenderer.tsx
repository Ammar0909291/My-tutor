'use client'
/**
 * GeometryRenderer — Visual Learning Sprint D (Geometry Engine).
 *
 * SVG-only renderer for the six supported geometry shapes: point, line,
 * angle, triangle, rectangle, circle. Every shape's coordinates are
 * closed-form arithmetic on already zod-validated numbers (see
 * visualSpec.ts) — no expression parsing, no canvas, no WebGL, no external
 * geometry engine. Responsive (ResizeObserver) and theme-aware (CSS
 * variables with literal fallbacks), matching GraphRenderer/NumberLineRenderer.
 */
import { useEffect, useRef, useState } from 'react'
import type { GeometrySpec } from '@/lib/visuals/visualSpec'

const PAD = 32 // px padding around the drawn shape, inside the SVG canvas

function fmt(n: number): string {
  const r = Math.round(n * 100) / 100
  return String(r)
}

/** Fit a shape's intrinsic width/height (math units) into the available pixel box. */
function useFitScale(w: number, h: number, unitW: number, unitH: number) {
  const availW = Math.max(1, w - PAD * 2)
  const availH = Math.max(1, h - PAD * 2)
  const scale = Math.min(availW / Math.max(unitW, 1e-6), availH / Math.max(unitH, 1e-6))
  return Math.max(1, Math.min(scale, 60))
}

function useResponsiveSize(defaultH = 260) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 360, h: defaultH })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      setSize({ w: Math.max(220, cr.width), h: defaultH })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [defaultH])
  return { ref, size }
}

export function GeometryRenderer({ spec }: { spec: GeometrySpec }) {
  switch (spec.shape) {
    case 'triangle': return <TriangleShape spec={spec} />
    case 'rectangle': return <RectangleShape spec={spec} />
    case 'circle': return <CircleShape spec={spec} />
    case 'angle': return <AngleShape spec={spec} />
    case 'line': return <LineShape spec={spec} />
    case 'point': return <PointShape spec={spec} />
    default: {
      const _never: never = spec
      return _never
    }
  }
}

// ── triangle (axis-aligned base/height) ─────────────────────────────────────
function TriangleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'triangle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size
  const scale = useFitScale(w, h, spec.base, spec.height)
  const bx = spec.base * scale
  const by = spec.height * scale
  const ox = (w - bx) / 2
  const oy = h - PAD - by < 0 ? PAD : (h - by) / 2 // vertical centering, clamped
  const area = (spec.base * spec.height) / 2

  const x0 = ox, y0 = oy + by // bottom-left
  const x1 = ox + bx, y1 = oy + by // bottom-right
  const x2 = ox + bx / 2, y2 = oy // apex (isosceles, centered over base)

  return (
    <Card title={spec.title ?? 'Triangle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <polygon points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} strokeLinejoin="round" />
        {/* base */}
        <Label x={(x0 + x1) / 2} y={y0 + 16} text={`base = ${fmt(spec.base)}`} />
        {/* height (dashed, apex to base midpoint) */}
        <line x1={x2} y1={y2} x2={x2} y2={y0} stroke="var(--text-dim, #888)" strokeWidth={1} strokeDasharray="4 3" />
        <Label x={x2 + 8} y={(y0 + y2) / 2} text={`height = ${fmt(spec.height)}`} anchor="start" />
      </Canvas>
      <Formula>Area = ½ × base × height = {fmt(area)}</Formula>
    </Card>
  )
}

// ── rectangle ────────────────────────────────────────────────────────────────
function RectangleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'rectangle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size
  const scale = useFitScale(w, h, spec.width, spec.height)
  const rw = spec.width * scale
  const rh = spec.height * scale
  const x0 = (w - rw) / 2
  const y0 = (h - rh) / 2
  const area = spec.width * spec.height

  return (
    <Card title={spec.title ?? 'Rectangle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <rect x={x0} y={y0} width={rw} height={rh} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <Label x={x0 + rw / 2} y={y0 + rh + 16} text={`width = ${fmt(spec.width)}`} />
        <Label x={x0 - 8} y={y0 + rh / 2} text={`height = ${fmt(spec.height)}`} anchor="end" />
      </Canvas>
      <Formula>Area = width × height = {fmt(area)}</Formula>
    </Card>
  )
}

// ── circle ───────────────────────────────────────────────────────────────────
function CircleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'circle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size
  const scale = useFitScale(w, h, spec.radius * 2, spec.radius * 2)
  const r = spec.radius * scale
  const cx = w / 2
  const cy = h / 2
  const area = Math.PI * spec.radius * spec.radius
  const circumference = 2 * Math.PI * spec.radius

  return (
    <Card title={spec.title ?? 'Circle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <circle cx={cx} cy={cy} r={r} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
        <Label x={cx + r / 2} y={cy - 8} text={`radius = ${fmt(spec.radius)}`} />
        <line x1={cx - r} y1={cy + r + 14} x2={cx + r} y2={cy + r + 14} stroke="var(--text-dim, #888)" strokeWidth={1} />
        <Label x={cx} y={cy + r + 28} text={`diameter = ${fmt(spec.radius * 2)}`} />
      </Canvas>
      <Formula>Circumference = 2πr = {fmt(circumference)} · Area = πr² = {fmt(area)}</Formula>
    </Card>
  )
}

// ── angle ────────────────────────────────────────────────────────────────────
function AngleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'angle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size
  const rayLen = Math.min(w, h) * 0.36
  const vx = w * 0.3
  const vy = h * 0.7
  const rad = (spec.angle * Math.PI) / 180
  const x0 = vx + rayLen, y0 = vy // 0° ray (along +x)
  const x1 = vx + rayLen * Math.cos(rad), y1 = vy - rayLen * Math.sin(rad)
  const arcR = rayLen * 0.32
  const largeArc = spec.angle > 180 ? 1 : 0
  const ax0 = vx + arcR, ay0 = vy
  const ax1 = vx + arcR * Math.cos(rad), ay1 = vy - arcR * Math.sin(rad)
  const midRad = rad / 2
  const labelX = vx + (arcR + 18) * Math.cos(midRad)
  const labelY = vy - (arcR + 18) * Math.sin(midRad)

  return (
    <Card title={spec.title ?? 'Angle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <line x1={vx} y1={vy} x2={x0} y2={y0} stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <line x1={vx} y1={vy} x2={x1} y2={y1} stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <path d={`M ${ax0} ${ay0} A ${arcR} ${arcR} 0 ${largeArc} 0 ${ax1} ${ay1}`} fill="none" stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
        <circle cx={vx} cy={vy} r={3} fill="var(--text-secondary, #6b7280)" />
        <Label x={labelX} y={labelY} text={`${fmt(spec.angle)}°`} />
      </Canvas>
      <Formula>Angle measurement = {fmt(spec.angle)}°</Formula>
    </Card>
  )
}

// ── line ─────────────────────────────────────────────────────────────────────
function LineShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'line' }> }) {
  const { ref, size } = useResponsiveSize(160)
  const { w, h } = size
  const scale = useFitScale(w, h, spec.length, 1)
  const len = spec.length * scale
  const x0 = (w - len) / 2
  const x1 = x0 + len
  const y = h / 2

  return (
    <Card title={spec.title ?? 'Line segment'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <line x1={x0} y1={y} x2={x1} y2={y} stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <circle cx={x0} cy={y} r={3} fill="var(--coral, #F78166)" />
        <circle cx={x1} cy={y} r={3} fill="var(--coral, #F78166)" />
        <Label x={(x0 + x1) / 2} y={y - 14} text={`length = ${fmt(spec.length)}`} />
      </Canvas>
    </Card>
  )
}

// ── point ────────────────────────────────────────────────────────────────────
function PointShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'point' }> }) {
  const { ref, size } = useResponsiveSize(120)
  const { w, h } = size
  const cx = w / 2
  const cy = h / 2

  return (
    <Card title={spec.title ?? 'Point'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <circle cx={cx} cy={cy} r={4} fill="var(--coral, #F78166)" />
        <Label x={cx} y={cy - 14} text="A single point" />
      </Canvas>
    </Card>
  )
}

// ── shared presentational pieces ────────────────────────────────────────────
function Canvas({ wrapRef, w, h, children }: { wrapRef: React.MutableRefObject<HTMLDivElement | null>; w: number; h: number; children: React.ReactNode }) {
  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
      <svg width={w} height={h} role="img" aria-label="Geometry diagram" style={{ display: 'block', borderRadius: 8 }}>
        {children}
      </svg>
    </div>
  )
}

function Label({ x, y, text, anchor = 'middle' }: { x: number; y: number; text: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} fontSize={11} fontWeight={600} textAnchor={anchor} fill="var(--text-secondary, #374151)">
      {text}
    </text>
  )
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: '8px 4px 0', fontSize: 12, color: 'var(--text-dim, #888)', fontFamily: 'var(--font-mono, monospace)' }}>
      {children}
    </p>
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
  maxWidth: 440,
}
const badgeStyle: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
  color: 'var(--coral, #F78166)', background: 'var(--coral-muted, rgba(247,129,102,0.12))',
  padding: '2px 7px', borderRadius: 20,
}
