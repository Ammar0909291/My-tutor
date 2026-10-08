'use client'
// Wave Function Plot — Quantum Physics visual (Visual Expansion Sprint).
// Builds up ψ(x) then |ψ(x)|² (probability density) on the same axes, so the
// Born-rule relationship is taught step by step. Reuses Sprint R.1 reveal.
// Steps: 1 axes → 2 ψ(x) real part → 3 |ψ|² density → 4 shaded probability.

import anim from './visualAnim.module.css'

/** The drawing's geometry (viewBox units). */
export const WAVE_FUNCTION = { x0: 30, x1: 285, axisY: 95, amp: 46, samples: 60, densityScale: 1.6 } as const

export interface WaveFunctionPoint { x: number; /** ψ(x), dimensionless. */ psi: number; /** |ψ(x)|², dimensionless. */ density: number }

/**
 * ψ(x) and |ψ(x)|² at the sample points, as numbers.
 *
 * ψ here is real (a Gaussian-modulated wave), so |ψ|² is exactly ψ² — the density is
 * computed FROM ψ, never drawn separately, so the two cannot disagree: it is zero where
 * ψ crosses zero, peaks where |ψ| peaks, and is never negative.
 */
export function waveFunctionPoints(): WaveFunctionPoint[] {
  const { x0, x1, samples } = WAVE_FUNCTION
  const psi = (t: number) => Math.cos(t * 7) * Math.exp(-Math.pow((t - 0.5) * 3.2, 2))
  return Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples
    const v = psi(t)
    return { x: x0 + t * (x1 - x0), psi: v, density: v * v }
  })
}

export function WaveFunctionPlot({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const { x0, x1, axisY, amp, densityScale } = WAVE_FUNCTION
  const pts = waveFunctionPoints()
  const psiPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${(axisY - p.psi * amp).toFixed(1)}`).join(' ')
  const densPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${(axisY - p.density * amp * densityScale).toFixed(1)}`).join(' ')
  const densArea = `${densPath} L ${x1} ${axisY} L ${x0} ${axisY} Z`
  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — axes */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={x0} y1={axisY} x2={x1} y2={axisY} stroke="var(--text-secondary)" strokeWidth={1.5} markerEnd="url(#wfAx)" />
          <line x1={x0} y1={150} x2={x0} y2={25} stroke="var(--text-secondary)" strokeWidth={1.5} markerEnd="url(#wfAy)" />
          <text x={x1 - 4} y={axisY + 14} textAnchor="end" fontSize={10} fill="var(--text-secondary)" fontWeight={600}>x</text>
          {/* Both curves are drawn on this axis, so it names both: ψ alone read as if the density were a second ψ. */}
          <text x={x0 + 6} y={32} fontSize={10} fill="var(--text-secondary)" fontWeight={600}>ψ, |ψ|²</text>
        </g>
      )}
      {/* Step 2 — ψ(x) amplitude (can be negative) */}
      {show(2) && (
        <path d={psiPath} fill="none" stroke="#3B9EFF" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
      )}
      {/* Step 3 — |ψ(x)|² probability density (always ≥ 0) */}
      {show(3) && (
        <path d={densPath} fill="none" stroke="#FF6B5E" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
      )}
      {/* Step 4 — shaded probability + labels */}
      {show(4) && (
        <g className={anim.reveal}>
          <path d={densArea} fill="#FF6B5E" opacity={0.16} />
          <text x={x1 - 6} y={42} textAnchor="end" fontSize={9} fill="#3B9EFF" fontWeight={700}>ψ(x)</text>
          <text x={x1 - 6} y={56} textAnchor="end" fontSize={9} fill="#FF6B5E" fontWeight={700}>|ψ(x)|²</text>
        </g>
      )}
      <defs>
        <marker id="wfAx" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--text-secondary)" /></marker>
        {/* Apex along +x, like wfAx: orient="auto" turns it to follow the (upward) axis. Drawn apex-up it ended up pointing left. */}
        <marker id="wfAy" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--text-secondary)" /></marker>
      </defs>
    </svg>
  )
}
