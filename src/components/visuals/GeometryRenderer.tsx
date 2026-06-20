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
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const round1 = (v: number) => Math.round(v * 10) / 10

/**
 * Sprint F: a draggable shape handle. Generous invisible hit-area for touch,
 * visible coral dot on top. Purely a pointer-event wrapper — never mutates
 * the spec, only the caller's local state via onDrag.
 */
function Handle({ x, y, label, onDrag }: { x: number; y: number; label: string; onDrag: (dx: number, dy: number) => void }) {
  const last = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    last.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!last.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    onDrag(dx, dy)
  }
  const onPointerUp = () => { last.current = null }
  return (
    <g
      style={{ cursor: 'grab', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <circle cx={x} cy={y} r={16} fill="transparent" aria-label={label} role="img" />
      <circle cx={x} cy={y} r={6} fill="var(--coral, #F78166)" stroke="var(--bg-surface, #fff)" strokeWidth={2} />
    </g>
  )
}

function fmt(n: number): string {
  const r = Math.round(n * 100) / 100
  return String(r)
}

/** Sprint G: shared challenge feedback line — reads a shape's already-live derived value(s) vs. spec.challenge targets. No new state. */
function ChallengeFeedback({ challenge, checks }: { challenge: { tolerance?: number } | undefined; checks: { label: string; ok: boolean }[] }) {
  if (!challenge || checks.length === 0) return null
  const met = checks.every((c) => c.ok)
  const goalText = checks.map((c) => c.label).join(', ')
  return (
    <p style={{ margin: '4px 4px 0', fontSize: 11, fontWeight: 600, color: met ? 'var(--coral, #F78166)' : 'var(--text-dim, #888)' }}>
      {met ? `✓ Target met: ${goalText}` : `Target: ${goalText}`}
    </p>
  )
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

  // Sprint F: live base/height, draggable when spec.interactive. Local
  // state only — resyncs if the spec's own values change.
  const [base, setBase] = useState(spec.base)
  const [height, setHeight] = useState(spec.height)
  useEffect(() => { setBase(spec.base) }, [spec.base])
  useEffect(() => { setHeight(spec.height) }, [spec.height])

  const scale = useFitScale(w, h, base, height)
  const bx = base * scale
  const by = height * scale
  const ox = (w - bx) / 2
  const oy = h - PAD - by < 0 ? PAD : (h - by) / 2 // vertical centering, clamped
  const area = (base * height) / 2
  const sideLen = Math.sqrt((base / 2) ** 2 + height ** 2)
  const perimeter = base + 2 * sideLen

  const x0 = ox, y0 = oy + by // bottom-left
  const x1 = ox + bx, y1 = oy + by // bottom-right
  const x2 = ox + bx / 2, y2 = oy // apex (isosceles, centered over base)

  return (
    <Card title={spec.title ?? 'Triangle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <polygon points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} strokeLinejoin="round" />
        {/* base */}
        <Label x={(x0 + x1) / 2} y={y0 + 16} text={`base = ${fmt(base)}`} />
        {/* height (dashed, apex to base midpoint) */}
        <line x1={x2} y1={y2} x2={x2} y2={y0} stroke="var(--text-dim, #888)" strokeWidth={1} strokeDasharray="4 3" />
        <Label x={x2 + 8} y={(y0 + y2) / 2} text={`height = ${fmt(height)}`} anchor="start" />
        {spec.interactive && (
          <>
            <Handle x={x2} y={y2} label="Drag to change height" onDrag={(_dx, dy) => setHeight((v) => clamp(round1(v - dy / scale), 1, 50))} />
            <Handle x={x1} y={y1} label="Drag to change base" onDrag={(dx) => setBase((v) => clamp(round1(v + (2 * dx) / scale), 1, 50))} />
          </>
        )}
      </Canvas>
      <Formula>Area = ½ × base × height = {fmt(area)} · Perimeter ≈ {fmt(perimeter)}</Formula>
      <ChallengeFeedback
        challenge={spec.challenge}
        checks={[
          ...(spec.challenge?.targetArea !== undefined ? [{ label: `area = ${spec.challenge.targetArea}`, ok: Math.abs(area - spec.challenge.targetArea) <= (spec.challenge.tolerance ?? 1) }] : []),
          ...(spec.challenge?.targetPerimeter !== undefined ? [{ label: `perimeter = ${spec.challenge.targetPerimeter}`, ok: Math.abs(perimeter - spec.challenge.targetPerimeter) <= (spec.challenge.tolerance ?? 1) }] : []),
        ]}
      />
    </Card>
  )
}

// ── rectangle ────────────────────────────────────────────────────────────────
function RectangleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'rectangle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size

  const [width, setWidth] = useState(spec.width)
  const [height, setHeight] = useState(spec.height)
  useEffect(() => { setWidth(spec.width) }, [spec.width])
  useEffect(() => { setHeight(spec.height) }, [spec.height])

  const scale = useFitScale(w, h, width, height)
  const rw = width * scale
  const rh = height * scale
  const x0 = (w - rw) / 2
  const y0 = (h - rh) / 2
  const area = width * height

  return (
    <Card title={spec.title ?? 'Rectangle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <rect x={x0} y={y0} width={rw} height={rh} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <Label x={x0 + rw / 2} y={y0 + rh + 16} text={`width = ${fmt(width)}`} />
        <Label x={x0 - 8} y={y0 + rh / 2} text={`height = ${fmt(height)}`} anchor="end" />
        {spec.interactive && (
          <Handle
            x={x0 + rw} y={y0 + rh}
            label="Drag to resize"
            onDrag={(dx, dy) => {
              setWidth((v) => clamp(round1(v + dx / scale), 1, 50))
              setHeight((v) => clamp(round1(v + dy / scale), 1, 50))
            }}
          />
        )}
      </Canvas>
      <Formula>Area = width × height = {fmt(area)}</Formula>
      <ChallengeFeedback
        challenge={spec.challenge}
        checks={[
          ...(spec.challenge?.targetArea !== undefined ? [{ label: `area = ${spec.challenge.targetArea}`, ok: Math.abs(area - spec.challenge.targetArea) <= (spec.challenge.tolerance ?? 1) }] : []),
          ...(spec.challenge?.targetPerimeter !== undefined ? [{ label: `perimeter = ${spec.challenge.targetPerimeter}`, ok: Math.abs(2 * (width + height) - spec.challenge.targetPerimeter) <= (spec.challenge.tolerance ?? 1) }] : []),
        ]}
      />
    </Card>
  )
}

// ── circle ───────────────────────────────────────────────────────────────────
function CircleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'circle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size

  const [radius, setRadius] = useState(spec.radius)
  useEffect(() => { setRadius(spec.radius) }, [spec.radius])

  const scale = useFitScale(w, h, radius * 2, radius * 2)
  const r = radius * scale
  const cx = w / 2
  const cy = h / 2
  const area = Math.PI * radius * radius
  const circumference = 2 * Math.PI * radius

  return (
    <Card title={spec.title ?? 'Circle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <circle cx={cx} cy={cy} r={r} fill="var(--coral-muted, rgba(247,129,102,0.16))" stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
        <Label x={cx + r / 2} y={cy - 8} text={`radius = ${fmt(radius)}`} />
        <line x1={cx - r} y1={cy + r + 14} x2={cx + r} y2={cy + r + 14} stroke="var(--text-dim, #888)" strokeWidth={1} />
        <Label x={cx} y={cy + r + 28} text={`diameter = ${fmt(radius * 2)}`} />
        {spec.interactive && (
          <Handle x={cx + r} y={cy} label="Drag to change radius" onDrag={(dx) => setRadius((v) => clamp(round1(v + dx / scale), 1, 50))} />
        )}
      </Canvas>
      <Formula>Circumference = 2πr = {fmt(circumference)} · Area = πr² = {fmt(area)}</Formula>
      <ChallengeFeedback
        challenge={spec.challenge}
        checks={[
          ...(spec.challenge?.targetRadius !== undefined ? [{ label: `radius = ${spec.challenge.targetRadius}`, ok: Math.abs(radius - spec.challenge.targetRadius) <= (spec.challenge.tolerance ?? 1) }] : []),
          ...(spec.challenge?.targetArea !== undefined ? [{ label: `area = ${spec.challenge.targetArea}`, ok: Math.abs(area - spec.challenge.targetArea) <= (spec.challenge.tolerance ?? 1) }] : []),
          ...(spec.challenge?.targetPerimeter !== undefined ? [{ label: `circumference = ${spec.challenge.targetPerimeter}`, ok: Math.abs(circumference - spec.challenge.targetPerimeter) <= (spec.challenge.tolerance ?? 1) }] : []),
        ]}
      />
    </Card>
  )
}

// ── angle ────────────────────────────────────────────────────────────────────
function AngleShape({ spec }: { spec: Extract<GeometrySpec, { shape: 'angle' }> }) {
  const { ref, size } = useResponsiveSize()
  const { w, h } = size

  const [angle, setAngle] = useState(spec.angle)
  useEffect(() => { setAngle(spec.angle) }, [spec.angle])

  const rayLen = Math.min(w, h) * 0.36
  const vx = w * 0.3
  const vy = h * 0.7
  const rad = (angle * Math.PI) / 180
  const x0 = vx + rayLen, y0 = vy // 0° ray (along +x)
  const x1 = vx + rayLen * Math.cos(rad), y1 = vy - rayLen * Math.sin(rad)
  const arcR = rayLen * 0.32
  const largeArc = angle > 180 ? 1 : 0
  const ax0 = vx + arcR, ay0 = vy
  const ax1 = vx + arcR * Math.cos(rad), ay1 = vy - arcR * Math.sin(rad)
  const midRad = rad / 2
  const labelX = vx + (arcR + 18) * Math.cos(midRad)
  const labelY = vy - (arcR + 18) * Math.sin(midRad)

  // Sprint F: dragging the ray endpoint recomputes the angle via atan2 of
  // pointer position relative to the fixed vertex (vx, vy).
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const onRayPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onRayPointerMove = (e: React.PointerEvent) => {
    if (!lastPos.current) return
    const svg = (e.target as SVGElement).ownerSVGElement
    const rect = svg?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const newRad = Math.atan2(vy - py, px - vx)
    let deg = (newRad * 180) / Math.PI
    if (deg < 0) deg += 360
    setAngle(clamp(Math.round(deg), 0, 360))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onRayPointerUp = () => { lastPos.current = null }

  return (
    <Card title={spec.title ?? 'Angle'} badge="GEOMETRY">
      <Canvas wrapRef={ref} w={w} h={h}>
        <line x1={vx} y1={vy} x2={x0} y2={y0} stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <line x1={vx} y1={vy} x2={x1} y2={y1} stroke="var(--coral, #F78166)" strokeWidth={2.5} />
        <path d={`M ${ax0} ${ay0} A ${arcR} ${arcR} 0 ${largeArc} 0 ${ax1} ${ay1}`} fill="none" stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
        <circle cx={vx} cy={vy} r={3} fill="var(--text-secondary, #6b7280)" />
        <Label x={labelX} y={labelY} text={`${fmt(angle)}°`} />
        {spec.interactive && (
          <g
            style={{ cursor: 'grab', touchAction: 'none' }}
            onPointerDown={onRayPointerDown}
            onPointerMove={onRayPointerMove}
            onPointerUp={onRayPointerUp}
            onPointerLeave={onRayPointerUp}
          >
            <circle cx={x1} cy={y1} r={16} fill="transparent" aria-label="Drag to change the angle" role="img" />
            <circle cx={x1} cy={y1} r={6} fill="var(--coral, #F78166)" stroke="var(--bg-surface, #fff)" strokeWidth={2} />
          </g>
        )}
      </Canvas>
      <Formula>Angle measurement = {fmt(angle)}°</Formula>
      <ChallengeFeedback
        challenge={spec.challenge}
        checks={[
          ...(spec.challenge?.targetAngle !== undefined ? [{ label: `angle = ${spec.challenge.targetAngle}°`, ok: Math.abs(angle - spec.challenge.targetAngle) <= (spec.challenge.tolerance ?? 3) }] : []),
        ]}
      />
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
