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
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProcessFlowSpec } from '@/lib/visuals/visualSpec'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'

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

// Sprint F: reorder mode. `order` is a permutation of step indices, held in
// local component state only (never written back to `spec`) — dragging or
// tapping Up/Down swaps adjacent entries. Correctness is checked against the
// identity permutation, i.e. the spec's own step order is assumed correct
// (visual feedback only, no grading/scoring is persisted anywhere).
function useReorder(stepCount: number, enabled: boolean) {
  const identity = Array.from({ length: stepCount }, (_, i) => i)
  // Start reversed when interactive, so there is actually something to fix
  // (matching the brief's "steps shuffled, student reorders" example) — a
  // fixed, deterministic permutation, never random, so it's reproducible.
  const initial = enabled ? [...identity].reverse() : identity
  const [order, setOrder] = useState<number[]>(initial)
  useEffect(() => { setOrder(enabled ? [...identity].reverse() : identity) }, [stepCount, enabled]) // eslint-disable-line react-hooks/exhaustive-deps
  const swap = (i: number, j: number) => {
    if (j < 0 || j >= order.length) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }
  const isCorrect = enabled && order.every((v, i) => v === i)
  return { order, swap, isCorrect }
}

export function ProcessFlowRenderer({
  spec,
  onMasteryEvent,
  masteryContext,
}: {
  spec: ProcessFlowSpec
  /** Sprint L (Visual Mastery activation) — fully optional; omitting it leaves this renderer byte-identical to before. */
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}) {
  const { ref, width } = useResponsiveWidth()
  const orientation = resolveOrientation(spec, width)
  const { order, swap, isCorrect } = useReorder(spec.steps.length, !!spec.interactive)
  const orderedSteps = spec.interactive ? order.map((i) => spec.steps[i]) : spec.steps

  const hasChallenge = !!spec.challenge

  // Sprint L: mastery emission — see GraphRenderer for the shared pattern.
  // `swap` is a discrete button click (no pointer-up "interaction end"), so
  // the natural emission point is the resulting `order`/`isCorrect` change
  // rather than a pointer event. `userSwappedRef` distinguishes a real user
  // click from useReorder's own mount/reset effect (see useReorder above),
  // which also changes `order` but isn't a mastery event.
  const emitMastery = useMemo(
    () => createMasteryEmitter({ visualType: 'process_flow', defaultConcept: spec.title, context: masteryContext, onMasteryEvent }),
    [spec.title, masteryContext, onMasteryEvent]
  )
  const fired = useRef({ shown: false, interacted: false, attempted: false, completed: false })
  const userSwappedRef = useRef(false)
  useEffect(() => {
    if (fired.current.shown) return
    fired.current.shown = true
    emitMastery({ challengeCompleted: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!userSwappedRef.current) return
    if (!fired.current.interacted) {
      fired.current.interacted = true
      emitMastery({ interacted: true, challengeCompleted: false })
    }
    if (spec.interactive) {
      if (!fired.current.attempted) {
        fired.current.attempted = true
        emitMastery({ interacted: true, challengeAttempted: true, challengeCompleted: isCorrect })
      }
      if (isCorrect && !fired.current.completed) {
        fired.current.completed = true
        emitMastery({ interacted: true, challengeAttempted: true, challengeCompleted: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])
  const wrappedSwap = (i: number, j: number) => {
    userSwappedRef.current = true
    swap(i, j)
  }

  return orientation === 'horizontal'
    ? <HorizontalFlow spec={spec} wrapRef={ref} width={width} steps={orderedSteps} interactive={!!spec.interactive} order={order} swap={wrappedSwap} isCorrect={isCorrect} hasChallenge={hasChallenge} />
    : <VerticalFlow spec={spec} wrapRef={ref} width={width} steps={orderedSteps} interactive={!!spec.interactive} order={order} swap={wrappedSwap} isCorrect={isCorrect} hasChallenge={hasChallenge} />
}

interface FlowProps {
  spec: ProcessFlowSpec
  wrapRef: React.MutableRefObject<HTMLDivElement | null>
  width: number
  steps: ProcessFlowSpec['steps']
  interactive: boolean
  order: number[]
  swap: (i: number, j: number) => void
  isCorrect: boolean
  hasChallenge: boolean
}

function ReorderFeedback({ interactive, isCorrect, hasChallenge }: { interactive: boolean; isCorrect: boolean; hasChallenge: boolean }) {
  if (!interactive) return null
  return (
    <p style={{ margin: '6px 4px 0', fontSize: 11, fontWeight: 600, color: isCorrect ? 'var(--coral, #F78166)' : 'var(--text-dim, #888)' }}>
      {isCorrect
        ? (hasChallenge ? '✓ Target met: steps in the correct order' : '✓ Correct order!')
        : (hasChallenge ? 'Target: arrange steps in the correct order' : 'Use ▲▼ to put the steps in the right order')}
    </p>
  )
}

function VerticalFlow({ spec, wrapRef, width, steps, interactive, swap, isCorrect, hasChallenge }: FlowProps) {
  const boxW = Math.min(STEP_W + 60, width - 16)
  const cx = width / 2
  const h = steps.length * STEP_H + (steps.length - 1) * GAP + 16

  return (
    <Card title={spec.title} badge="PROCESS">
      <div ref={wrapRef} style={{ width: '100%' }}>
        <svg width={width} height={h} role="img" aria-label={`${spec.title} process flow`} style={{ display: 'block' }}>
          {steps.map((step, i) => {
            const y = i * (STEP_H + GAP) + 8
            return (
              <g key={i}>
                <StepBox x={cx - boxW / 2} y={y} w={boxW} h={STEP_H} index={i} step={step} />
                {interactive && (
                  <ReorderButtons
                    x={cx + boxW / 2 + 4} y={y + STEP_H / 2}
                    onUp={() => swap(i, i - 1)} onDown={() => swap(i, i + 1)}
                    upDisabled={i === 0} downDisabled={i === steps.length - 1}
                  />
                )}
                {i < steps.length - 1 && (
                  <Arrow x1={cx} y1={y + STEP_H} x2={cx} y2={y + STEP_H + GAP} vertical />
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <ReorderFeedback interactive={interactive} isCorrect={isCorrect} hasChallenge={hasChallenge} />
    </Card>
  )
}

function HorizontalFlow({ spec, wrapRef, width, steps, interactive, swap, isCorrect, hasChallenge }: FlowProps) {
  const n = steps.length
  const totalW = n * STEP_W + (n - 1) * GAP
  const startX = Math.max(8, (width - totalW) / 2)
  const h = STEP_H + 16 + (interactive ? 20 : 0)

  return (
    <Card title={spec.title} badge="PROCESS">
      <div ref={wrapRef} style={{ width: '100%', overflowX: 'auto' }}>
        <svg width={Math.max(width, totalW + 16)} height={h} role="img" aria-label={`${spec.title} process flow`} style={{ display: 'block' }}>
          {steps.map((step, i) => {
            const x = startX + i * (STEP_W + GAP)
            const y = 8
            return (
              <g key={i}>
                <StepBox x={x} y={y} w={STEP_W} h={STEP_H} index={i} step={step} />
                {interactive && (
                  <ReorderButtons
                    x={x + STEP_W / 2} y={y + STEP_H + 14}
                    onUp={() => swap(i, i - 1)} onDown={() => swap(i, i + 1)}
                    upDisabled={i === 0} downDisabled={i === n - 1}
                    horizontal
                  />
                )}
                {i < n - 1 && (
                  <Arrow x1={x + STEP_W} y1={y + STEP_H / 2} x2={x + STEP_W + GAP} y2={y + STEP_H / 2} vertical={false} />
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <ReorderFeedback interactive={interactive} isCorrect={isCorrect} hasChallenge={hasChallenge} />
    </Card>
  )
}

/** Up/Down (or Left/Right) buttons swapping a step with its neighbor — the reliable, touch- and keyboard-friendly reorder affordance. */
function ReorderButtons({ x, y, onUp, onDown, upDisabled, downDisabled, horizontal }: { x: number; y: number; onUp: () => void; onDown: () => void; upDisabled: boolean; downDisabled: boolean; horizontal?: boolean }) {
  return (
    <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
      <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', gap: 2 }}>
        <button
          type="button"
          aria-label={horizontal ? 'Move step left' : 'Move step up'}
          disabled={upDisabled}
          onClick={onUp}
          style={reorderBtnStyle(upDisabled)}
        >
          {horizontal ? '◀' : '▲'}
        </button>
        <button
          type="button"
          aria-label={horizontal ? 'Move step right' : 'Move step down'}
          disabled={downDisabled}
          onClick={onDown}
          style={reorderBtnStyle(downDisabled)}
        >
          {horizontal ? '▶' : '▼'}
        </button>
      </div>
    </foreignObject>
  )
}

function reorderBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    width: 22, height: 11, fontSize: 8, lineHeight: 1, padding: 0, borderRadius: 3,
    border: '1px solid var(--border-subtle, #e5e7eb)', background: 'var(--bg-surface, #fff)',
    color: disabled ? 'var(--text-dim, #888)' : 'var(--text-secondary, #374151)',
    cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
  }
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
