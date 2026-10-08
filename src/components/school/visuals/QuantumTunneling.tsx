'use client'
// Quantum Tunneling — Quantum Physics visual (Visual Expansion Sprint).
// Shows a wave packet incident on a barrier, exponential decay *inside* the
// barrier (not an over-the-top trajectory), and a reduced-amplitude
// transmitted wave. Reuses Sprint R.1 progressive reveal.
// Steps: 1 axis+barrier → 2 incident wave → 3 exponential decay in barrier →
// 4 transmitted wave → 5 E < V₀ label.

import anim from './visualAnim.module.css'

/** The drawing's fixed geometry (viewBox units). */
export const TUNNEL = {
  axisY: 110, x0: 20, x1: 285, barL: 135, barR: 175, barTop: 45,
  /** Incident amplitude, in px above/below the axis. */
  amp: 22,
  /** Decay constant inside the barrier, per barrier width: ψ(s) = amp·e^(−κ s), s in [0, 1]. */
  kappa: 1.2,
  /** ONE wavelength for the incident and transmitted waves: the energy E is the same either side. */
  wavelength: 28,
  samples: 30,
} as const

export interface TunnelPoint { x: number; /** ψ in px, positive up. */ psi: number }
export interface TunnelCurves { incident: TunnelPoint[]; inside: TunnelPoint[]; transmitted: TunnelPoint[]; transmittedAmp: number }

/**
 * The three pieces of ψ, as numbers (the component only turns them into paths).
 *
 * They follow the Educational Brain's statement of the physics: outside the barrier ψ
 * is a wave of the SAME wavelength on both sides (the transmitted particle has exactly
 * the incident energy); INSIDE it is EVANESCENT — a real, non-oscillating exponential
 * decay — and the wave that emerges has the amplitude the decay has reached at the far
 * edge. The pieces meet in value at the two barrier edges, so ψ is one continuous curve.
 * (The first version multiplied the decay by cos(2πt), which made ψ oscillate and change
 * sign twice inside the barrier — the one thing the evanescent region does not do — and
 * began the decay at the incident amplitude although the incident wave ended at zero.)
 */
export function tunnelingCurves(): TunnelCurves {
  const { x0, x1, barL, barR, amp, kappa, wavelength, samples } = TUNNEL
  const at = (n: number) => Array.from({ length: n + 1 }, (_, i) => i / n)
  const transmittedAmp = amp * Math.exp(-kappa)
  return {
    incident: at(samples).map((t) => { const x = x0 + t * (barL - x0); return { x, psi: amp * Math.cos((2 * Math.PI * (x - barL)) / wavelength) } }),
    inside: at(20).map((t) => ({ x: barL + t * (barR - barL), psi: amp * Math.exp(-kappa * t) })),
    transmitted: at(samples).map((t) => { const x = barR + t * (x1 - barR); return { x, psi: transmittedAmp * Math.cos((2 * Math.PI * (x - barR)) / wavelength) } }),
    transmittedAmp,
  }
}

export function QuantumTunneling({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const { axisY, x0, x1, barL, barR, barTop, amp } = TUNNEL
  const curves = tunnelingCurves()
  const path = (pts: TunnelPoint[]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${(axisY - p.psi).toFixed(1)}`).join(' ')
  const incident = path(curves.incident)
  const decay = path(curves.inside)
  const transmitted = path(curves.transmitted)
  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — axis + potential barrier */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={x0} y1={axisY} x2={x1} y2={axisY} stroke="var(--text-secondary)" strokeWidth={1.2} />
          <rect x={barL} y={barTop} width={barR - barL} height={axisY - barTop} fill="#8B5CF6" opacity={0.18} stroke="#8B5CF6" strokeWidth={1.5} />
          <text x={(barL + barR) / 2} y={barTop - 5} textAnchor="middle" fontSize={9} fill="#8B5CF6" fontWeight={700}>V₀</text>
        </g>
      )}
      {/* Step 2 — incident wave */}
      {show(2) && (
        <path d={incident} fill="none" stroke="#3B9EFF" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
      )}
      {/* Step 3 — exponential decay inside the barrier */}
      {show(3) && (
        <path d={decay} fill="none" stroke="#FF6B5E" strokeWidth={2} strokeDasharray="3 2" pathLength={1} className={anim.drawLine} />
      )}
      {/* Step 4 — reduced-amplitude transmitted wave */}
      {show(4) && (
        <path d={transmitted} fill="none" stroke="#22A06B" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
      )}
      {/* Step 5 — physics labels */}
      {show(5) && (
        <g className={anim.reveal}>
          {/* above the crests: at axisY + 16 it sat inside the incident wave's ±amp swing and the troughs ran through the words */}
          <text x={x0 + 4} y={axisY - amp - 8} fontSize={9} fill="#3B9EFF" fontWeight={700}>incident (E &lt; V₀)</text>
          <text x={x1 - 4} y={axisY + 16} textAnchor="end" fontSize={9} fill="#22A06B" fontWeight={700}>transmitted</text>
          <text x={(barL + barR) / 2} y={axisY + 28} textAnchor="middle" fontSize={8} fill="#FF6B5E" fontWeight={600}>ψ decays, no energy borrowed</text>
        </g>
      )}
    </svg>
  )
}
