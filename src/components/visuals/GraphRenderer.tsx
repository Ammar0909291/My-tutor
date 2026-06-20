'use client'
/**
 * GraphRenderer — Visual Learning Sprint B (Math Graph Engine MVP).
 *
 * Interactive SVG plot of a single-variable equation (linear y=mx+b and
 * quadratic y=ax^2+bx+c targeted, general arithmetic supported). Features:
 * zoom (wheel + buttons), pan (drag), dynamic grid, axis labels.
 * Evaluation is via the safe parser in @/lib/visuals/mathParser (no eval).
 * Responsive (ResizeObserver) and theme-aware (CSS variables).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { compileExpression } from '@/lib/visuals/mathParser'
import type { GraphSpec } from '@/lib/visuals/visualSpec'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

interface View { cx: number; cy: number; ppu: number } // center (math units) + pixels-per-unit

const MIN_PPU = 4
const MAX_PPU = 400

// ── Sprint F: interactive linear model (draggable slope/intercept) ─────────
// Only a plain `y = mx + b` form is recognized — quadratics and other forms
// simply yield null and the graph renders exactly as before (fail-safe, no
// half-feature). This is a regex match, never a second expression parse.
const LINEAR_RE = /^y=([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?$/i

function extractLinearModel(equation: string): { m: number; b: number } | null {
  const compact = equation.replace(/\s+/g, '')
  const match = compact.match(LINEAR_RE)
  if (!match) return null
  const [, mStr, bStr] = match
  let m: number
  if (mStr === '' || mStr === '+') m = 1
  else if (mStr === '-') m = -1
  else m = Number(mStr)
  const b = bStr ? Number(bStr) : 0
  if (!Number.isFinite(m) || !Number.isFinite(b)) return null
  return { m, b }
}

const M_BOUND = 20
const B_BOUND = 50
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const round1 = (v: number) => Math.round(v * 10) / 10

function formatLinearEquation(m: number, b: number): string {
  const mPart = m === 1 ? 'x' : m === -1 ? '-x' : `${round1(m)}x`
  const bPart = b === 0 ? '' : b > 0 ? ` + ${round1(b)}` : ` - ${Math.abs(round1(b))}`
  return `y = ${mPart}${bPart}`
}

/** Pick a "nice" grid step (1,2,5 × 10^n) so ~targetPx pixels separate lines. */
function niceStep(ppu: number, targetPx = 64): number {
  const raw = targetPx / ppu
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const norm = raw / mag
  const step = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10
  return step * mag
}

function formatTick(n: number): string {
  if (Math.abs(n) < 1e-9) return '0'
  const r = Math.round(n * 1000) / 1000
  return String(r)
}

export function GraphRenderer({
  spec,
  onMasteryEvent,
  masteryContext,
}: {
  spec: GraphSpec
  /** Sprint L (Visual Mastery activation) — fully optional; omitting it leaves this renderer byte-identical to before. */
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 360, h: 280 })
  const compiled = useMemo(() => compileExpression(spec.equation), [spec.equation])

  // Sprint F: linear interactive model. Re-derived (and local state reset)
  // whenever the spec's own equation/flag changes — never mutates `spec`.
  const linearModel = useMemo(
    () => (spec.interactive ? extractLinearModel(spec.equation) : null),
    [spec.interactive, spec.equation]
  )
  const [model, setModel] = useState(linearModel)
  useEffect(() => { setModel(linearModel) }, [linearModel])

  // Sprint G: challenge validation, moved up unchanged (was computed just
  // before the JSX return) so the mastery emitters below can reference it
  // without a forward reference. Same expressions, same result every render.
  const challenge = spec.challenge
  const challengeTolerance = challenge?.tolerance ?? 0.5
  const slopeOk = challenge?.targetSlope === undefined || (model !== null && Math.abs(model.m - challenge.targetSlope) <= challengeTolerance)
  const interceptOk = challenge?.targetIntercept === undefined || (model !== null && Math.abs(model.b - challenge.targetIntercept) <= challengeTolerance)
  const challengeMet = !!challenge && (challenge.targetSlope !== undefined || challenge.targetIntercept !== undefined) && slopeOk && interceptOk

  // Sprint L: mastery emission. `emitMastery` is a no-op whenever
  // onMasteryEvent is absent. Each milestone (shown/interacted/attempted/
  // completed) fires at most once per mounted instance — see
  // docs/VISUAL_MASTERY_INTEGRATION_AUDIT.md for the duplicate-event analysis.
  const emitMastery = useMemo(
    () => createMasteryEmitter({ visualType: 'graph', defaultConcept: spec.title ?? 'graph', context: masteryContext, onMasteryEvent }),
    [spec.title, masteryContext, onMasteryEvent]
  )
  const fired = useRef({ shown: false, interacted: false, attempted: false, completed: false })
  useEffect(() => {
    if (fired.current.shown) return
    fired.current.shown = true
    emitMastery({ challengeCompleted: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Initial view: center on origin, scale so the optional domain (or [-10,10]) fits.
  const [view, setView] = useState<View>(() => {
    const [d0, d1] = spec.domain ?? [-10, 10]
    const span = Math.max(2, Math.abs(d1 - d0))
    return { cx: (d0 + d1) / 2, cy: 0, ppu: Math.max(MIN_PPU, Math.min(MAX_PPU, 360 / span)) }
  })

  // Responsive sizing
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      setSize({ w: Math.max(220, cr.width), h: Math.max(200, Math.min(360, cr.width * 0.72)) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = size
  // math → screen helpers
  const toSx = useCallback((x: number) => w / 2 + (x - view.cx) * view.ppu, [w, view])
  const toSy = useCallback((y: number) => h / 2 - (y - view.cy) * view.ppu, [h, view])
  const fromSx = useCallback((sx: number) => view.cx + (sx - w / 2) / view.ppu, [w, view])
  const fromSy = useCallback((sy: number) => view.cy - (sy - h / 2) / view.ppu, [h, view])

  // Visible math bounds
  const xMin = fromSx(0), xMax = fromSx(w)
  const yMin = fromSy(h), yMax = fromSy(0)

  // ── interaction: pan ──
  const drag = useRef<{ x: number; y: number } | null>(null)
  // Sprint F: which (if any) model handle is currently being dragged. Set by
  // the handle's own onPointerDown (which stops propagation), so background
  // pan and handle-drag never both fire for the same gesture.
  const handleDrag = useRef<'slope' | 'intercept' | null>(null)
  const slopeHandleX = useMemo(() => clamp(round1((xMax - xMin) * 0.3) || 2, 1, M_BOUND), [xMax, xMin])

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (handleDrag.current === 'intercept' && model && rect) {
      const newB = clamp(round1(fromSy(e.clientY - rect.top)), -B_BOUND, B_BOUND)
      setModel({ ...model, b: newB })
      return
    }
    if (handleDrag.current === 'slope' && model && rect) {
      const my = fromSy(e.clientY - rect.top)
      const newM = clamp(round1((my - model.b) / slopeHandleX), -M_BOUND, M_BOUND)
      setModel({ ...model, m: newM })
      return
    }
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    drag.current = { x: e.clientX, y: e.clientY }
    setView((v) => ({ ...v, cx: v.cx - dx / v.ppu, cy: v.cy + dy / v.ppu }))
  }
  const onPointerUp = () => {
    const wasHandleDrag = handleDrag.current
    drag.current = null
    handleDrag.current = null
    if (wasHandleDrag && challenge) {
      if (!fired.current.attempted) {
        fired.current.attempted = true
        emitMastery({ interacted: true, challengeAttempted: true, challengeCompleted: challengeMet })
      }
      if (challengeMet && !fired.current.completed) {
        fired.current.completed = true
        emitMastery({ interacted: true, challengeAttempted: true, challengeCompleted: true })
      }
    }
  }
  const startHandleDrag = (which: 'slope' | 'intercept') => (e: React.PointerEvent) => {
    e.stopPropagation()
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    handleDrag.current = which
    if (!fired.current.interacted) {
      fired.current.interacted = true
      emitMastery({ interacted: true, challengeCompleted: false })
    }
  }

  // ── interaction: zoom (wheel, anchored at cursor) ──
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top
    const mx = fromSx(sx), my = fromSy(sy)
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    setView((v) => {
      const ppu = Math.max(MIN_PPU, Math.min(MAX_PPU, v.ppu * factor))
      // keep the math point under the cursor fixed
      const cx = mx - (sx - w / 2) / ppu
      const cy = my + (sy - h / 2) / ppu
      return { cx, cy, ppu }
    })
  }
  const zoomBtn = (factor: number) => setView((v) => ({ ...v, ppu: Math.max(MIN_PPU, Math.min(MAX_PPU, v.ppu * factor)) }))
  const reset = () => {
    const [d0, d1] = spec.domain ?? [-10, 10]
    const span = Math.max(2, Math.abs(d1 - d0))
    setView({ cx: (d0 + d1) / 2, cy: 0, ppu: Math.max(MIN_PPU, Math.min(MAX_PPU, 360 / span)) })
  }

  // ── grid + path geometry ──
  const step = niceStep(view.ppu)
  const gridLines = useMemo(() => {
    const xs: number[] = []
    const ys: number[] = []
    const startX = Math.ceil(xMin / step) * step
    for (let x = startX; x <= xMax; x += step) xs.push(x)
    const startY = Math.ceil(yMin / step) * step
    for (let y = startY; y <= yMax; y += step) ys.push(y)
    return { xs, ys }
  }, [xMin, xMax, yMin, yMax, step])

  // When a linear model is active, plot from the live m/b state (plain
  // arithmetic) rather than re-parsing text on every drag frame.
  const evalFn = model ? (x: number) => model.m * x + model.b : compiled?.eval
  const pathD = useMemo(() => {
    if (!evalFn) return ''
    let d = ''
    let penDown = false
    const prevYRef = { v: NaN }
    for (let px = 0; px <= w; px += 2) {
      const x = fromSx(px)
      const y = evalFn(x)
      if (!Number.isFinite(y)) { penDown = false; prevYRef.v = NaN; continue }
      const sy = toSy(y)
      // break the line across large vertical jumps (asymptotes)
      if (penDown && Number.isFinite(prevYRef.v) && Math.abs(sy - prevYRef.v) > h * 3) {
        penDown = false
      }
      if (sy < -h * 4 || sy > h * 5) { /* far offscreen; still continue path */ }
      d += `${penDown ? 'L' : 'M'}${px.toFixed(1)},${sy.toFixed(1)}`
      penDown = true
      prevYRef.v = sy
    }
    return d
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compiled, model, w, h, view])

  const axisX = toSy(0) // screen y of the x-axis (y=0)
  const axisY = toSx(0) // screen x of the y-axis (x=0)

  if (!compiled) {
    return (
      <div style={cardStyle}>
        <Header title={spec.title ?? 'Graph'} subtitle={spec.equation} />
        <p style={{ margin: '8px 4px 2px', fontSize: 12, color: 'var(--text-dim, #888)' }}>
          Could not render this equation.
        </p>
      </div>
    )
  }

  const liveEquation = model ? formatLinearEquation(model.m, model.b) : `y = ${spec.equation.replace(/^\s*y\s*=\s*/i, '')}`

  const challengeGoalText = challenge && [
    challenge.targetSlope !== undefined ? `slope = ${challenge.targetSlope}` : null,
    challenge.targetIntercept !== undefined ? `intercept = ${challenge.targetIntercept}` : null,
  ].filter(Boolean).join(', ')

  return (
    <div style={cardStyle}>
      <Header title={spec.title ?? 'Graph'} subtitle={liveEquation} />
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        style={{ position: 'relative', width: '100%', touchAction: 'none', cursor: drag.current ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        <svg width={w} height={h} role="img" aria-label={`Graph of ${spec.equation}`} style={{ display: 'block', borderRadius: 8 }}>
          {/* grid */}
          {gridLines.xs.map((x) => (
            <line key={`gx${x}`} x1={toSx(x)} y1={0} x2={toSx(x)} y2={h} stroke="var(--border-subtle, #e5e7eb)" strokeWidth={1} opacity={0.5} />
          ))}
          {gridLines.ys.map((y) => (
            <line key={`gy${y}`} x1={0} y1={toSy(y)} x2={w} y2={toSy(y)} stroke="var(--border-subtle, #e5e7eb)" strokeWidth={1} opacity={0.5} />
          ))}
          {/* axes */}
          <line x1={0} y1={axisX} x2={w} y2={axisX} stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
          <line x1={axisY} y1={0} x2={axisY} y2={h} stroke="var(--text-secondary, #6b7280)" strokeWidth={1.5} />
          {/* axis tick labels */}
          {gridLines.xs.map((x) => Math.abs(x) > 1e-9 && (
            <text key={`tx${x}`} x={toSx(x)} y={Math.min(h - 4, Math.max(12, axisX + 14))} fontSize={10} textAnchor="middle" fill="var(--text-dim, #888)">{formatTick(x)}</text>
          ))}
          {gridLines.ys.map((y) => Math.abs(y) > 1e-9 && (
            <text key={`ty${y}`} x={Math.min(w - 8, Math.max(10, axisY + 6))} y={toSy(y) + 3} fontSize={10} fill="var(--text-dim, #888)">{formatTick(y)}</text>
          ))}
          {/* curve */}
          <path d={pathD} fill="none" stroke="var(--coral, #F78166)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {/* Sprint F: drag handles for the linear model (interactive only) */}
          {model && (
            <>
              <DragHandle
                x={toSx(0)} y={toSy(model.b)}
                label="Drag to change the y-intercept"
                onPointerDown={startHandleDrag('intercept')}
              />
              <DragHandle
                x={toSx(slopeHandleX)} y={toSy(model.m * slopeHandleX + model.b)}
                label="Drag to change the slope"
                onPointerDown={startHandleDrag('slope')}
              />
            </>
          )}
        </svg>
        {/* zoom controls */}
        <div style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', gap: 4 }}>
          <CtrlBtn label="−" onClick={() => zoomBtn(1 / 1.3)} />
          <CtrlBtn label="+" onClick={() => zoomBtn(1.3)} />
          <CtrlBtn label="⟳" onClick={reset} />
        </div>
      </div>
      <p style={{ margin: '6px 4px 0', fontSize: 10, color: 'var(--text-dim, #888)' }}>
        {model ? 'Drag the points to change slope/intercept · ' : ''}Drag to pan · scroll or use +/− to zoom
      </p>
      {challenge && challengeGoalText && (
        <p style={{ margin: '4px 4px 0', fontSize: 11, fontWeight: 600, color: challengeMet ? 'var(--coral, #F78166)' : 'var(--text-dim, #888)' }}>
          {challengeMet ? `✓ Target met: ${challengeGoalText}` : `Target: ${challengeGoalText}`}
        </p>
      )}
    </div>
  )
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span style={badgeStyle}>Graph</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary, #6b7280)' }}>{title}</span>
      {subtitle && <span style={{ fontSize: 11, color: 'var(--text-dim, #888)', fontFamily: 'var(--font-mono, monospace)' }}>{subtitle}</span>}
    </div>
  )
}

/** Sprint F: a draggable model handle — generous invisible hit-area for touch, visible coral dot on top. */
function DragHandle({ x, y, label, onPointerDown }: { x: number; y: number; label: string; onPointerDown: (e: React.PointerEvent) => void }) {
  return (
    <g style={{ cursor: 'grab', touchAction: 'none' }} onPointerDown={onPointerDown}>
      <circle cx={x} cy={y} r={16} fill="transparent" aria-label={label} role="img" />
      <circle cx={x} cy={y} r={6} fill="var(--coral, #F78166)" stroke="var(--bg-surface, #fff)" strokeWidth={2} />
    </g>
  )
}

function CtrlBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label === '+' ? 'Zoom in' : label === '−' ? 'Zoom out' : 'Reset view'}
      style={{
        width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border-subtle, #e5e7eb)',
        background: 'var(--bg-surface, #fff)', color: 'var(--text-secondary, #374151)',
        fontSize: 15, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {label}
    </button>
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
