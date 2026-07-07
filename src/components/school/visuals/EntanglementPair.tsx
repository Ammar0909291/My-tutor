'use client'
// Entanglement Pair — Quantum Physics visual (Phase 2 Visual Expansion).
// Builds a Bell-pair experiment: entangled pair prepared → particles separate to
// two distant labs → measure A → B is instantly correlated → statistics table.
// Reuses Sprint R.1 progressive reveal.
// Steps: 1 source + pair → 2 separation to A/B → 3 measure A (↑) →
//        4 B correlated (↓) → 5 correlation note (no signal sent).

import anim from './visualAnim.module.css'

export function EntanglementPair({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const cx = 150, cy = 70
  const aX = 45, bX = 255
  return (
    <svg viewBox="0 0 300 165" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — entangled pair prepared at source */}
      {show(1) && (
        <g className={anim.reveal}>
          <circle cx={cx} cy={cy} r={10} fill="#8B5CF6" opacity={0.25} />
          <circle cx={cx - 5} cy={cy} r={4} fill="#3B9EFF" />
          <circle cx={cx + 5} cy={cy} r={4} fill="#22A06B" />
          <text x={cx} y={cy + 26} textAnchor="middle" fontSize={8} fill="#8B5CF6" fontWeight={700}>entangled pair</text>
        </g>
      )}
      {/* Step 2 — particles fly apart to distant labs A and B */}
      {show(2) && (
        <g className={anim.reveal}>
          <line x1={cx - 8} y1={cy} x2={aX + 14} y2={cy} stroke="#3B9EFF" strokeWidth={1.6} markerEnd="url(#enA)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={cx + 8} y1={cy} x2={bX - 14} y2={cy} stroke="#22A06B" strokeWidth={1.6} markerEnd="url(#enB)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <circle cx={aX} cy={cy} r={5} fill="#3B9EFF" />
          <circle cx={bX} cy={cy} r={5} fill="#22A06B" />
          <text x={aX} y={cy - 12} textAnchor="middle" fontSize={9} fill="#3B9EFF" fontWeight={700}>Lab A</text>
          <text x={bX} y={cy - 12} textAnchor="middle" fontSize={9} fill="#22A06B" fontWeight={700}>Lab B</text>
        </g>
      )}
      {/* Step 3 — measure A: gets spin up */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={aX} y1={cy + 8} x2={aX} y2={cy + 30} stroke="#3B9EFF" strokeWidth={2} markerEnd="url(#enUp)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={aX} y={cy + 44} textAnchor="middle" fontSize={9} fill="#3B9EFF" fontWeight={700}>measure A → ↑</text>
        </g>
      )}
      {/* Step 4 — B is instantly correlated: spin down */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={bX} y1={cy + 8} x2={bX} y2={cy + 30} stroke="#22A06B" strokeWidth={2} markerEnd="url(#enDn)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={bX} y={cy + 44} textAnchor="middle" fontSize={9} fill="#22A06B" fontWeight={700}>B → ↓ (correlated)</text>
        </g>
      )}
      {/* Step 5 — no-signaling note */}
      {show(5) && (
        <g className={anim.reveal}>
          <text x={150} y={140} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>outcomes correlated — but no usable signal travels A→B</text>
          <text x={150} y={154} textAnchor="middle" fontSize={8} fill="var(--text-dim)">(each result alone looks random)</text>
        </g>
      )}
      <defs>
        <marker id="enA" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#3B9EFF" /></marker>
        <marker id="enB" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#22A06B" /></marker>
        <marker id="enUp" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#3B9EFF" /></marker>
        <marker id="enDn" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#22A06B" /></marker>
      </defs>
    </svg>
  )
}
