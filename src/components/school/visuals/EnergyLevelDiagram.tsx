'use client'
// Energy Level Diagram — Quantum Physics visual (Phase 2 Visual Expansion).
// Builds atomic energy levels, electron occupancy, an absorption transition, an
// emission transition, and the resulting spectral line. Reuses Sprint R.1 reveal.
// Steps: 1 levels → 2 electron in ground state → 3 absorption (up) →
//        4 emission (down) + photon → 5 spectral line.

import anim from './visualAnim.module.css'

export function EnergyLevelDiagram({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const xL = 55, xR = 175
  // levels converge toward the top (n² spacing inverted: gaps shrink with n)
  const levels = [
    { n: 1, y: 145, color: '#22A06B' },
    { n: 2, y: 95, color: '#3B9EFF' },
    { n: 3, y: 62, color: '#8B5CF6' },
    { n: 4, y: 44, color: '#9CA3AF' },
  ]
  const E1 = levels[0], E3 = levels[2]
  return (
    <svg viewBox="0 0 300 175" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — quantized energy levels */}
      {show(1) && (
        <g className={anim.reveal}>
          {levels.map((lv) => (
            <g key={lv.n}>
              <line x1={xL} y1={lv.y} x2={xR} y2={lv.y} stroke={lv.color} strokeWidth={1.8} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
              <text x={xL - 6} y={lv.y + 3} textAnchor="end" fontSize={9} fill={lv.color} fontWeight={700}>n={lv.n}</text>
            </g>
          ))}
          <text x={(xL + xR) / 2} y={168} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>quantized energy levels</text>
        </g>
      )}
      {/* Step 2 — electron occupying the ground state */}
      {show(2) && (
        <g className={anim.reveal}>
          <circle cx={(xL + xR) / 2} cy={E1.y - 5} r={4} fill="#FF6B5E" />
          <text x={(xL + xR) / 2 + 9} y={E1.y - 2} fontSize={8} fill="var(--text-secondary)">e⁻</text>
        </g>
      )}
      {/* Step 3 — absorption: photon kicks electron up */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={(xL + xR) / 2 - 22} y1={E1.y - 5} x2={(xL + xR) / 2 - 22} y2={E3.y + 5} stroke="#3B9EFF" strokeWidth={2} markerEnd="url(#elUp)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={(xL + xR) / 2 - 48} y={(E1.y + E3.y) / 2} fontSize={8} fill="#3B9EFF" fontWeight={700}>absorb</text>
        </g>
      )}
      {/* Step 4 — emission: electron falls, emits a photon */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={(xL + xR) / 2 + 22} y1={E3.y + 5} x2={(xL + xR) / 2 + 22} y2={E1.y - 5} stroke="#FF6B5E" strokeWidth={2} markerEnd="url(#elDown)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={(xL + xR) / 2 + 28} y={(E1.y + E3.y) / 2} fontSize={8} fill="#FF6B5E" fontWeight={700}>emit</text>
          {/* photon wave leaving */}
          <path d="M 205 100 q 6 -7 12 0 q 6 7 12 0 q 6 -7 12 0" fill="none" stroke="#F59E0B" strokeWidth={1.6} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={241} y={94} fontSize={9} fill="#F59E0B" fontWeight={700}>hν</text>
        </g>
      )}
      {/* Step 5 — resulting spectral line */}
      {show(5) && (
        <g className={anim.reveal}>
          <rect x={205} y={120} width={80} height={26} fill="#111827" rx={3} />
          <line x1={236} y1={120} x2={236} y2={146} stroke="#F59E0B" strokeWidth={2.5} />
          <text x={245} y={138} fontSize={8} fill="#F59E0B" fontWeight={700}>spectral line</text>
        </g>
      )}
      <defs>
        <marker id="elUp" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#3B9EFF" /></marker>
        <marker id="elDown" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#FF6B5E" /></marker>
      </defs>
    </svg>
  )
}
