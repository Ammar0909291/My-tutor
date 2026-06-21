'use client'
// Bloch Sphere — Quantum Physics visual (Visual Expansion Sprint).
// Builds the qubit Bloch sphere: sphere outline → poles |0⟩/|1⟩ → equatorial
// superposition circle → state vector → phase angle φ. Reuses Sprint R.1 reveal.
// Steps: 1 sphere → 2 axes+poles → 3 equator → 4 state vector → 5 phase label.

import anim from './visualAnim.module.css'

export function BlochSphere({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const cx = 150, cy = 90, r = 62
  // state vector pointing into the upper-front-right octant
  const theta = Math.PI / 3, phi = Math.PI / 4
  const vx = cx + r * Math.sin(theta) * Math.cos(phi)
  // project: y down, slight z foreshortening
  const vy = cy - r * Math.cos(theta) + r * Math.sin(theta) * Math.sin(phi) * 0.35
  return (
    <svg viewBox="0 0 300 180" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — sphere outline */}
      {show(1) && (
        <g className={anim.reveal}>
          <circle cx={cx} cy={cy} r={r} fill="#3B9EFF" opacity={0.07} stroke="var(--text-secondary)" strokeWidth={1.5} />
        </g>
      )}
      {/* Step 2 — axes + computational-basis poles */}
      {show(2) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--text-secondary)" strokeWidth={1} opacity={0.7} />
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--text-secondary)" strokeWidth={1} opacity={0.5} strokeDasharray="3 3" />
          <circle cx={cx} cy={cy - r} r={3} fill="#22A06B" />
          <circle cx={cx} cy={cy + r} r={3} fill="#FF6B5E" />
          <text x={cx + 6} y={cy - r - 2} fontSize={11} fill="#22A06B" fontWeight={700}>|0⟩</text>
          <text x={cx + 6} y={cy + r + 12} fontSize={11} fill="#FF6B5E" fontWeight={700}>|1⟩</text>
        </g>
      )}
      {/* Step 3 — equatorial superposition circle */}
      {show(3) && (
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.32} fill="none" stroke="#8B5CF6" strokeWidth={1.4} strokeDasharray="4 3" pathLength={1} className={anim.drawLine} />
      )}
      {/* Step 4 — qubit state vector */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy} x2={vx} y2={vy} stroke="#8B5CF6" strokeWidth={2.5} markerEnd="url(#blArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <circle cx={vx} cy={vy} r={2.5} fill="#8B5CF6" />
          <text x={vx + 6} y={vy - 2} fontSize={10} fill="#8B5CF6" fontWeight={700}>|ψ⟩</text>
        </g>
      )}
      {/* Step 5 — angle labels */}
      {show(5) && (
        <g className={anim.reveal}>
          <text x={cx + 10} y={cy + 28} fontSize={9} fill="var(--text-secondary)" fontWeight={600}>θ polar, φ phase</text>
          <text x={cx} y={172} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>|ψ⟩ = cos(θ/2)|0⟩ + e^{'{iφ}'}sin(θ/2)|1⟩</text>
        </g>
      )}
      <defs>
        <marker id="blArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#8B5CF6" /></marker>
      </defs>
    </svg>
  )
}
