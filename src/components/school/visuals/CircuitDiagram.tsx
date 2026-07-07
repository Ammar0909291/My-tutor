'use client'
// Electric Circuit Diagram (simple series circuit) — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

export function CircuitDiagram({ revealStep = Infinity }: { revealStep?: number }) {
  const stroke = 'var(--text-secondary)'
  const accent = '#FF6B5E'
  const sw = 2
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox="0 0 280 200" width="100%" style={{ maxWidth: 300 }} aria-hidden="true">
      {/* Step 1 — lay the wires */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={40} y1={40} x2={240} y2={40} stroke={stroke} strokeWidth={sw} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={240} y1={40} x2={240} y2={160} stroke={stroke} strokeWidth={sw} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={40} y1={160} x2={240} y2={160} stroke={stroke} strokeWidth={sw} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={40} y1={40} x2={40} y2={75} stroke={stroke} strokeWidth={sw} />
          <line x1={40} y1={125} x2={40} y2={160} stroke={stroke} strokeWidth={sw} />
        </g>
      )}
      {/* Step 2 — battery (power source) */}
      {show(2) && (
        <g className={anim.reveal}>
          {[0, 6, 12].map((dy) => (
            <line key={dy} x1={28} y1={75 + dy * 2.5} x2={52} y2={75 + dy * 2.5} stroke={dy === 0 ? accent : stroke} strokeWidth={dy === 0 ? 3 : 1.5} />
          ))}
          <text x={40} y={105} textAnchor="middle" fontSize={9} fill="var(--text-dim)">Battery</text>
          <text x={25} y={80} fontSize={9} fill={accent} fontWeight={700}>+</text>
          <text x={25} y={100} fontSize={9} fill="#3B82F6" fontWeight={700}>−</text>
        </g>
      )}
      {/* Step 3 — switch */}
      {show(3) && (
        <g className={anim.reveal}>
          <circle cx={120} cy={40} r={4} fill="var(--bg-surface)" stroke={stroke} strokeWidth={sw} />
          <line x1={120} y1={36} x2={140} y2={28} stroke={stroke} strokeWidth={sw} />
          <circle cx={140} cy={40} r={4} fill="var(--bg-surface)" stroke={stroke} strokeWidth={sw} />
          <text x={130} y={22} textAnchor="middle" fontSize={9} fill="var(--text-dim)">Switch</text>
        </g>
      )}
      {/* Step 4 — bulb (load) */}
      {show(4) && (
        <g className={anim.reveal}>
          <circle cx={240} cy={90} r={14} fill="var(--bg-elevated)" stroke="#E3B341" strokeWidth={sw} />
          <line x1={234} y1={84} x2={246} y2={96} stroke="#E3B341" strokeWidth={1.5} />
          <line x1={246} y1={84} x2={234} y2={96} stroke="#E3B341" strokeWidth={1.5} />
          <text x={260} y={93} fontSize={9} fill="var(--text-dim)">Bulb</text>
        </g>
      )}
      {/* Step 5 — resistor + current direction */}
      {show(5) && (
        <g className={anim.reveal}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={120 + i * 10} y={155} width={8} height={10} rx={1} fill="none" stroke={stroke} strokeWidth={1.2} />
          ))}
          <text x={150} y={178} textAnchor="middle" fontSize={9} fill="var(--text-dim)">Resistor (R)</text>
          <path d="M 200 40 L 220 40" stroke={accent} strokeWidth={1.5} markerEnd="url(#dArr)" />
          <text x={210} y={34} textAnchor="middle" fontSize={8} fill={accent}>I →</text>
        </g>
      )}
      <defs>
        <marker id="dArr" markerWidth={6} markerHeight={6} refX={3} refY={3} orient="auto">
          <polygon points="0,0 6,3 0,6" fill={accent} />
        </marker>
      </defs>
    </svg>
  )
}
