'use client'
// Quantum Circuit — Quantum Physics visual (Phase 2 Visual Expansion).
// Builds a two-qubit circuit: qubit lines → single-qubit gate (H) → CNOT →
// measurement → classical result. Reuses Sprint R.1 progressive reveal.
// Steps: 1 qubit lines → 2 H gate → 3 CNOT → 4 measurement → 5 result bits.

import anim from './visualAnim.module.css'

export function QuantumCircuit({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const x0 = 50, x1 = 260
  const q0 = 60, q1 = 115
  const xH = 95, xCNOT = 150, xM = 210
  return (
    <svg viewBox="0 0 300 165" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — two qubit wires */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={x0} y1={q0} x2={x1} y2={q0} stroke="var(--text-secondary)" strokeWidth={1.6} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={x0} y1={q1} x2={x1} y2={q1} stroke="var(--text-secondary)" strokeWidth={1.6} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={x0 - 6} y={q0 + 4} textAnchor="end" fontSize={11} fill="#22A06B" fontWeight={700}>|0⟩</text>
          <text x={x0 - 6} y={q1 + 4} textAnchor="end" fontSize={11} fill="#22A06B" fontWeight={700}>|0⟩</text>
        </g>
      )}
      {/* Step 2 — Hadamard gate on q0 (creates superposition) */}
      {show(2) && (
        <g className={anim.reveal}>
          <rect x={xH - 12} y={q0 - 12} width={24} height={24} rx={3} fill="#3B9EFF" />
          <text x={xH} y={q0 + 4} textAnchor="middle" fontSize={12} fill="#fff" fontWeight={700}>H</text>
        </g>
      )}
      {/* Step 3 — CNOT (entangles q0→q1) */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={xCNOT} y1={q0} x2={xCNOT} y2={q1} stroke="#8B5CF6" strokeWidth={2} />
          <circle cx={xCNOT} cy={q0} r={4} fill="#8B5CF6" />
          <circle cx={xCNOT} cy={q1} r={9} fill="none" stroke="#8B5CF6" strokeWidth={2} />
          <line x1={xCNOT - 9} y1={q1} x2={xCNOT + 9} y2={q1} stroke="#8B5CF6" strokeWidth={2} />
          <line x1={xCNOT} y1={q1 - 9} x2={xCNOT} y2={q1 + 9} stroke="#8B5CF6" strokeWidth={2} />
          <text x={xCNOT} y={q1 + 26} textAnchor="middle" fontSize={8} fill="#8B5CF6" fontWeight={700}>CNOT (entangle)</text>
        </g>
      )}
      {/* Step 4 — measurement gates */}
      {show(4) && (
        <g className={anim.reveal}>
          {[q0, q1].map((qy) => (
            <g key={qy}>
              <rect x={xM - 12} y={qy - 12} width={24} height={24} rx={3} fill="none" stroke="var(--text-secondary)" strokeWidth={1.6} />
              <path d={`M ${xM - 7} ${qy + 5} A 7 7 0 0 1 ${xM + 7} ${qy + 5}`} fill="none" stroke="var(--text-secondary)" strokeWidth={1.4} />
              <line x1={xM} y1={qy + 5} x2={xM + 6} y2={qy - 5} stroke="var(--text-secondary)" strokeWidth={1.4} />
            </g>
          ))}
        </g>
      )}
      {/* Step 5 — correlated classical result */}
      {show(5) && (
        <g className={anim.reveal}>
          <text x={x1 + 4} y={q0 + 4} fontSize={11} fill="#FF6B5E" fontWeight={700}>0</text>
          <text x={x1 + 4} y={q1 + 4} fontSize={11} fill="#FF6B5E" fontWeight={700}>0</text>
          <text x={(x0 + x1) / 2} y={150} textAnchor="middle" fontSize={8} fill="var(--text-secondary)" fontWeight={600}>Bell pair: results always correlated (00 or 11)</text>
        </g>
      )}
    </svg>
  )
}
