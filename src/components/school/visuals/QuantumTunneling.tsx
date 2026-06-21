'use client'
// Quantum Tunneling — Quantum Physics visual (Visual Expansion Sprint).
// Shows a wave packet incident on a barrier, exponential decay *inside* the
// barrier (not an over-the-top trajectory), and a reduced-amplitude
// transmitted wave. Reuses Sprint R.1 progressive reveal.
// Steps: 1 axis+barrier → 2 incident wave → 3 exponential decay in barrier →
// 4 transmitted wave → 5 E < V₀ label.

import anim from './visualAnim.module.css'

export function QuantumTunneling({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const axisY = 110, x0 = 20, x1 = 285
  const barL = 135, barR = 175, barTop = 45
  const N = 30
  const incident = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N
    const px = x0 + t * (barL - x0)
    const py = axisY - Math.sin(t * Math.PI * 4) * 22
    return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
  }).join(' ')
  // exponential decay through the barrier
  const decay = Array.from({ length: 21 }, (_, i) => {
    const t = i / 20
    const px = barL + t * (barR - barL)
    const py = axisY - 22 * Math.exp(-t * 2.6) * Math.cos(t * Math.PI * 2)
    return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
  }).join(' ')
  const transAmp = 22 * Math.exp(-2.6) * 4 // small but visible
  const transmitted = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N
    const px = barR + t * (x1 - barR)
    const py = axisY - Math.sin(t * Math.PI * 4) * transAmp
    return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
  }).join(' ')
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
          <text x={x0 + 4} y={axisY + 16} fontSize={9} fill="#3B9EFF" fontWeight={700}>incident (E &lt; V₀)</text>
          <text x={x1 - 4} y={axisY + 16} textAnchor="end" fontSize={9} fill="#22A06B" fontWeight={700}>transmitted</text>
          <text x={(barL + barR) / 2} y={axisY + 28} textAnchor="middle" fontSize={8} fill="#FF6B5E" fontWeight={600}>ψ decays, no energy borrowed</text>
        </g>
      )}
    </svg>
  )
}
