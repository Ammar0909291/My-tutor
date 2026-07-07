'use client'
/**
 * VisualMasteryDevSummary — Visual Learning Sprint L (Activation, Task 5).
 *
 * Development-only display of a useVisualMastery() summary. Renders nothing
 * in production (and nothing when the summary is empty), matching the
 * provider-badge pattern already used in LessonScreen.tsx
 * (`process.env.NODE_ENV === 'development'`). No persistence, no API calls —
 * purely a read of whatever the calling component's useVisualMastery() hook
 * has collected so far.
 */
import type { VisualMasterySummary } from '@/hooks/useVisualMastery'

const ENGINE_LABELS: Record<string, string> = {
  graph: 'Graph',
  number_line: 'Number Line',
  geometry: 'Geometry',
  process_flow: 'Process Flow',
}

export function VisualMasteryDevSummary({ summary }: { summary: VisualMasterySummary }) {
  if (process.env.NODE_ENV !== 'development') return null
  const entries = Object.entries(summary)
  if (entries.length === 0) return null

  return (
    <div
      style={{
        marginTop: 16,
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px dashed #999',
        background: 'rgba(0,0,0,0.04)',
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <p style={{ margin: '0 0 6px', fontWeight: 700 }}>Visual Mastery Summary (dev only)</p>
      {entries.map(([engine, counts]) => (
        <p key={engine} style={{ margin: '2px 0' }}>
          {ENGINE_LABELS[engine] ?? engine}: shown: {counts.shown}, interacted: {counts.interacted}, completed: {counts.completed}
        </p>
      ))}
    </div>
  )
}
