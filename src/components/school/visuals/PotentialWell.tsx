'use client'
// Potential Well — Quantum Physics visual (Visual Expansion Sprint).
// Builds an infinite square well, its quantized energy levels, and the first
// stationary-state wavefunctions. Reuses Sprint R.1 progressive reveal.
// Steps: 1 well walls → 2 ground level E1 → 3 E2 → 4 E3 → 5 ψ on each level.

import anim from './visualAnim.module.css'

export function PotentialWell({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const wallL = 70, wallR = 230, floor = 150, top = 20
  // energies scale as n² (E1, E2=4E1, E3=9E1) — drawn compressed to fit.
  const levels = [
    { n: 1, y: 130, color: '#22A06B' },
    { n: 2, y: 95, color: '#3B9EFF' },
    { n: 3, y: 50, color: '#8B5CF6' },
  ]
  // half-wavelength standing wave for level n across the well
  const wavePath = (n: number, y: number) => {
    const N = 40, A = 12
    return Array.from({ length: N + 1 }, (_, i) => {
      const t = i / N
      const px = wallL + t * (wallR - wallL)
      const py = y - Math.sin(t * Math.PI * n) * A
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
    }).join(' ')
  }
  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — infinite well walls */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={wallL} y1={top} x2={wallL} y2={floor} stroke="var(--text-secondary)" strokeWidth={3} />
          <line x1={wallR} y1={top} x2={wallR} y2={floor} stroke="var(--text-secondary)" strokeWidth={3} />
          <line x1={wallL} y1={floor} x2={wallR} y2={floor} stroke="var(--text-secondary)" strokeWidth={3} />
          <text x={(wallL + wallR) / 2} y={165} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>infinite square well</text>
          <text x={wallL - 6} y={top + 6} textAnchor="end" fontSize={9} fill="var(--text-secondary)">V=∞</text>
          <text x={wallR + 6} y={top + 6} fontSize={9} fill="var(--text-secondary)">V=∞</text>
        </g>
      )}
      {/* Steps 2–4 — quantized energy levels */}
      {levels.map((lv, i) => show(i + 2) && (
        <g key={lv.n} className={anim.reveal}>
          <line x1={wallL} y1={lv.y} x2={wallR} y2={lv.y} stroke={lv.color} strokeWidth={1.6} strokeDasharray="4 3" pathLength={1} className={anim.drawLine} />
          <text x={wallR + 6} y={lv.y + 3} fontSize={9} fill={lv.color} fontWeight={700}>E{lv.n}{lv.n > 1 ? `=${lv.n * lv.n}E₁` : ''}</text>
        </g>
      ))}
      {/* Step 5 — stationary-state wavefunctions on each level */}
      {show(5) && (
        <g className={anim.reveal}>
          {levels.map((lv) => (
            <path key={`w${lv.n}`} d={wavePath(lv.n, lv.y)} fill="none" stroke={lv.color} strokeWidth={1.8} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          ))}
        </g>
      )}
    </svg>
  )
}
