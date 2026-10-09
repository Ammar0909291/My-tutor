'use client'
// Potential Well — Quantum Physics visual (Visual Expansion Sprint).
// Builds an infinite square well, its quantized energy levels, and the first
// stationary-state wavefunctions. Reuses Sprint R.1 progressive reveal.
// Steps: 1 well walls → 2 ground level E1 → 3 E2 → 4 E3 → 5 ψ on each level.
// Levels are drawn to scale (Eₙ = n²E₁) and each ψₙ has n half-wavelengths, zero at the walls.

import anim from './visualAnim.module.css'

/** The drawing's geometry (viewBox units). */
export const POTENTIAL_WELL = {
  wallL: 70, wallR: 230, floor: 150, top: 10,
  /** Height of the n = 1 level above the floor; level n is drawn n² of these up. */
  unit: 14,
  /** Peak of each stationary-state wave, in px about its own level. */
  amp: 9,
  samples: 40,
} as const

const LEVEL_COLOURS = ['#22A06B', '#3B9EFF', '#8B5CF6'] as const

/**
 * The three levels, drawn TO SCALE: Eₙ = n²E₁, so level n sits n² units above the floor.
 * (The first version "compressed" them — 20, 55, 100 above the floor, i.e. 1 : 2.75 : 5 —
 * while labelling them E₂ = 4E₁ and E₃ = 9E₁, so the picture contradicted its own labels.)
 */
export function wellLevels() {
  const { floor, unit } = POTENTIAL_WELL
  return [1, 2, 3].map((n) => ({ n, y: floor - unit * n * n, color: LEVEL_COLOURS[n - 1] }))
}

/** ψₙ across the well: n half-wavelengths, vanishing at both walls. Positive = above the level line. */
export function wellWave(n: number): Array<{ x: number; psi: number }> {
  const { wallL, wallR, samples } = POTENTIAL_WELL
  return Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples
    return { x: wallL + t * (wallR - wallL), psi: Math.sin(t * Math.PI * n) }
  })
}

export function PotentialWell({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const { wallL, wallR, floor, top, amp } = POTENTIAL_WELL
  const levels = wellLevels()
  const wavePath = (n: number, y: number) =>
    wellWave(n).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${(y - p.psi * amp).toFixed(1)}`).join(' ')
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
