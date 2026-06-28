/**
 * Dynamic 2D Visualization Engine — code generation.
 *
 * Wired into the chat route (src/app/api/learn/chat/route.ts) behind
 * ENABLE_DYNAMIC_VISUALIZATION (default OFF), only when neither the
 * deterministic VisualSpec/SceneSpec pipelines nor the parametric scene
 * generators produced anything for the turn. Calls the LLM to write a
 * small React component (as a string) that visualizes the concept just
 * explained, then runs it through static checks before it is ever sent
 * to the client. The component is never executed here or anywhere in the
 * main render tree — DynamicVisualRenderer.tsx runs it inside a sandboxed,
 * opaque-origin iframe (sandbox="allow-scripts", no allow-same-origin) so
 * that even a malicious or buggy generation cannot reach the user's
 * cookies, storage, or session, and cannot call fetch() against this
 * origin or any other. The denylist below is defense-in-depth on top of
 * that boundary, not a substitute for it — it exists so an obviously
 * dangerous generation never reaches the client at all.
 */

import { generateAIResponse } from '@/lib/ai/client'
import { parseVisualizationCode } from './parseVisualizationCode'

/** Feature flag — keep generation OFF until explicitly enabled. */
export function isDynamicVisualizationEnabled(): boolean {
  return process.env.ENABLE_DYNAMIC_VISUALIZATION === 'true'
}

const SYSTEM_PROMPT = `You are a visualization code generator for a student tutoring app.

Available libraries (already in scope, do not import them): recharts, d3, mathjs — use these only.

Return ONLY a single default-exported React functional component.
No imports. No markdown. No explanation. Raw JS only.
No JSX — use React.createElement(...) only, since the code runs with no transpiler.
No fetch, no setTimeout, no external resources.
Make the visualization specific to the concept explained.

Example 1 — sine wave using recharts LineChart with 50 data points:
export default function Visual() {
  var data = [];
  for (var i = 0; i < 50; i++) {
    var x = (i / 49) * 2 * Math.PI;
    data.push({ x: x.toFixed(2), y: Math.sin(x) });
  }
  return React.createElement(
    recharts.ResponsiveContainer, { width: '100%', height: 300 },
    React.createElement(
      recharts.LineChart, { data: data },
      React.createElement(recharts.XAxis, { dataKey: 'x' }),
      React.createElement(recharts.YAxis, null),
      React.createElement(recharts.CartesianGrid, { strokeDasharray: '3 3' }),
      React.createElement(recharts.Line, { type: 'monotone', dataKey: 'y', stroke: '#8884d8', dot: false })
    )
  );
}

Example 2 — bar chart showing frequency distribution with recharts BarChart:
export default function Visual() {
  var data = [
    { label: '0-10', freq: 4 },
    { label: '10-20', freq: 9 },
    { label: '20-30', freq: 6 },
    { label: '30-40', freq: 2 },
  ];
  return React.createElement(
    recharts.ResponsiveContainer, { width: '100%', height: 300 },
    React.createElement(
      recharts.BarChart, { data: data },
      React.createElement(recharts.XAxis, { dataKey: 'label' }),
      React.createElement(recharts.YAxis, null),
      React.createElement(recharts.Bar, { dataKey: 'freq', fill: '#82ca9d' })
    )
  );
}`

const DENYLIST = [
  'fetch(', 'XMLHttpRequest', 'import(', 'require(', 'eval(',
  'document.', 'window.', 'localStorage', 'sessionStorage', 'cookie',
  'setTimeout', 'setInterval', '<script', 'top.', 'parent.',
  '__proto__', 'constructor.constructor',
]

function stripCodeFences(raw: string): string {
  const trimmed = raw.trim()
  const fenced = trimmed.match(/^```(?:jsx?|tsx?|javascript)?\s*([\s\S]*?)\s*```$/)
  return (fenced ? fenced[1] : trimmed).trim()
}

function isSafe(code: string): boolean {
  const lower = code.toLowerCase()
  return !DENYLIST.some((bad) => lower.includes(bad.toLowerCase()))
}

export interface GeneratedVisualization {
  code: string
}

/**
 * Generates a visualization component for the given explanation text.
 * Never throws — returns null on any failure (no LLM call made, malformed
 * output, missing default export, or a denylisted identifier).
 */
export async function generateVisualizationCode(
  explanationText: string,
): Promise<GeneratedVisualization | null> {
  if (!isDynamicVisualizationEnabled()) return null
  if (!explanationText || !explanationText.trim()) return null

  try {
    const raw = await generateAIResponse(
      [{ role: 'user', content: `Concept to visualize: ${explanationText.trim()}` }],
      SYSTEM_PROMPT,
      800,
    )
    const code = parseVisualizationCode(raw) ?? stripCodeFences(raw)
    if (!code) return null
    if (!/export\s+default/.test(code)) return null
    if (!isSafe(code)) return null

    return { code }
  } catch {
    return null
  }
}
