'use client'
// Water Cycle visual — Sprint BW · animated Sprint R.1
// Builds the scene in teaching order: ground → water → sun → cloud → evaporation → precipitation.

import anim from './visualAnim.module.css'

export function WaterCycle({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  return (
    <svg viewBox="0 0 300 160" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — ground & mountain (the landscape) */}
      {show(1) && (
        <g className={anim.reveal}>
          <rect x={0} y={120} width={300} height={40} rx={0} fill="var(--bg-elevated)" opacity={0.5} />
          <polygon points="60,120 120,40 180,120" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth={1} />
        </g>
      )}
      {/* Step 2 — the water body (ocean) */}
      {show(2) && (
        <g className={anim.reveal}>
          <ellipse cx={240} cy={118} rx={40} ry={8} fill="#3B82F6" opacity={0.35} />
          <text x={240} y={120} textAnchor="middle" fontSize={10} fill="#3B82F6">💧</text>
        </g>
      )}
      {/* Step 3 — the sun */}
      {show(3) && (
        <g className={anim.reveal}>
          <circle cx={260} cy={28} r={18} fill="none" stroke="#E3B341" strokeWidth={2} />
          <text x={260} y={33} textAnchor="middle" fontSize={14}>☀️</text>
        </g>
      )}
      {/* Step 4 — the cloud */}
      {show(4) && (
        <g className={anim.reveal}>
          <ellipse cx={100} cy={22} rx={30} ry={14} fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth={1} />
          <text x={100} y={27} textAnchor="middle" fontSize={10} fill="var(--text-dim)">☁️</text>
        </g>
      )}
      {/* Step 5 — evaporation rises */}
      {show(5) && (
        <g className={anim.reveal}>
          <path d="M 240 100 C 240 60 200 40 130 30" stroke="#E3B341" strokeWidth={1.5} fill="none" strokeDasharray="4,3" markerEnd="url(#arr)" pathLength={1} className={anim.drawLine} />
          <text x={185} y={52} fontSize={9} fill="#E3B341" fontWeight={600}>Evaporation</text>
        </g>
      )}
      {/* Step 6 — precipitation falls + runoff returns */}
      {show(6) && (
        <g className={anim.reveal}>
          <path d="M 80 36 C 70 60 60 90 50 120" stroke="#3B82F6" strokeWidth={1.5} fill="none" markerEnd="url(#arrB)" pathLength={1} className={anim.drawLine} />
          <path d="M 180 120 C 200 125 220 122 240 120" stroke="#3B82F6" strokeWidth={1.5} fill="none" markerEnd="url(#arrB)" />
          <text x={22} y={80} fontSize={9} fill="#3B82F6" fontWeight={600}>Precipitation</text>
          <text x={188} y={140} fontSize={9} fill="#3B82F6" fontWeight={600}>Runoff</text>
        </g>
      )}
      <defs>
        <marker id="arr" markerWidth={7} markerHeight={7} refX={3} refY={3.5} orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#E3B341" />
        </marker>
        <marker id="arrB" markerWidth={7} markerHeight={7} refX={3} refY={3.5} orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#3B82F6" />
        </marker>
      </defs>
    </svg>
  )
}
