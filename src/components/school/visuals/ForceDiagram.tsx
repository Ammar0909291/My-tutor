'use client'
// Force Diagram — Sprint BW

export function ForceDiagram() {
  const cx = 150, cy = 90, boxW = 60, boxH = 40

  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* ground */}
      <line x1={40} y1={130} x2={260} y2={130} stroke="var(--text-secondary)" strokeWidth={2} />
      {/* hatching */}
      {[50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250].map((x) => (
        <line key={x} x1={x} y1={130} x2={x - 8} y2={140} stroke="var(--text-secondary)" strokeWidth={1} />
      ))}
      {/* object box */}
      <rect x={cx - boxW / 2} y={cy - boxH / 2} width={boxW} height={boxH} rx={4}
        fill="var(--bg-elevated)" stroke="var(--coral)" strokeWidth={2} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text-primary)">Object</text>

      {/* Applied force → */}
      <line x1={cx + boxW / 2} y1={cy} x2={cx + boxW / 2 + 45} y2={cy} stroke="var(--green)" strokeWidth={2.5} markerEnd="url(#gArr)" />
      <text x={cx + boxW / 2 + 22} y={cy - 7} textAnchor="middle" fontSize={10} fill="var(--green)" fontWeight={600}>Applied</text>

      {/* Friction ← */}
      <line x1={cx - boxW / 2} y1={cy} x2={cx - boxW / 2 - 40} y2={cy} stroke="#3B82F6" strokeWidth={2.5} markerEnd="url(#bArr)" />
      <text x={cx - boxW / 2 - 20} y={cy - 7} textAnchor="middle" fontSize={10} fill="#3B82F6" fontWeight={600}>Friction</text>

      {/* Weight ↓ */}
      <line x1={cx} y1={cy + boxH / 2} x2={cx} y2={cy + boxH / 2 + 35} stroke="var(--coral)" strokeWidth={2.5} markerEnd="url(#rArr)" />
      <text x={cx + 25} y={cy + boxH / 2 + 22} textAnchor="middle" fontSize={10} fill="var(--coral)" fontWeight={600}>Weight (W=mg)</text>

      {/* Normal ↑ */}
      <line x1={cx} y1={cy - boxH / 2} x2={cx} y2={cy - boxH / 2 - 35} stroke="#8B5CF6" strokeWidth={2.5} markerEnd="url(#pArr)" />
      <text x={cx + 22} y={cy - boxH / 2 - 18} textAnchor="middle" fontSize={10} fill="#8B5CF6" fontWeight={600}>Normal (N)</text>

      <defs>
        <marker id="gArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="var(--green)" /></marker>
        <marker id="bArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="8,0 0,4 8,8" fill="#3B82F6" /></marker>
        <marker id="rArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="var(--coral)" /></marker>
        <marker id="pArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,8 8,4 0,0" fill="#8B5CF6" /></marker>
      </defs>
    </svg>
  )
}
