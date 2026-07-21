/**
 * Dynamic Visualization Engine — code generation.
 *
 * Wired into the chat route (src/app/api/learn/chat/route.ts) behind
 * ENABLE_DYNAMIC_VISUALIZATION (on by default — see .env.example), only
 * when neither the deterministic VisualSpec/SceneSpec pipelines nor the
 * parametric scene generators produced anything for the turn. Calls the LLM to write a
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
 *
 * 3D-FIRST WITH 2D FALLBACK: the primary prompt asks for an animated
 * Three.js scene (THREE, React, ReactDOM in scope). If the model's 3D
 * output fails our static checks (missing default export, denylisted
 * identifier, parse failure), we retry once with the legacy 2D recharts
 * prompt — both prompts target the same single-default-export contract,
 * so the renderer is agnostic to which one produced the code.
 */

import { generateAIResponse } from '@/lib/ai/client'
import { parseVisualizationCode } from './parseVisualizationCode'

/** Feature flag — on by default (.env.example); set ENABLE_DYNAMIC_VISUALIZATION= (empty) to disable. */
export function isDynamicVisualizationEnabled(): boolean {
  return process.env.ENABLE_DYNAMIC_VISUALIZATION === 'true'
}

// ── Primary prompt: Three.js (3D) ───────────────────────────────────────────
const SYSTEM_PROMPT_3D = `You are a 3D visualization code generator for a student tutoring app.

Available globals (already in scope, DO NOT import them): THREE, React, ReactDOM.

Return ONLY a single default-exported React functional component.
No imports. No markdown. No explanation. Raw JS only.
No JSX — use React.createElement(...) only (the code runs with no transpiler).
No fetch, no setTimeout, no setInterval, no external resources.
Do NOT touch window.* or document.* — read size from the canvas ref.

CRITICAL: Always complete the full component. Include lights, animation loop,
cancelAnimationFrame cleanup, and renderer.dispose(). Never cut off mid-function.
Simplify geometry if needed but always finish.

The component must:
  - render exactly one canvas via React.useRef and React.createElement('canvas', { ref, style: { width: '100%', height: 300 } })
  - inside React.useEffect(function () { ... }, []), build a THREE.WebGLRenderer attached to that canvas, a PerspectiveCamera, a Scene, ambient + at least one directional/point light, and the concept's geometry
  - drive an animation loop with requestAnimationFrame
  - on cleanup, cancelAnimationFrame and renderer.dispose()
  - make the geometry SPECIFIC to the concept being explained (do not just paste an example)

Example 1 — rotating cube with ambient + directional light:
export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var w = canvas.clientWidth || 320, h = 300;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(2.2, 2.2, 3); camera.lookAt(0, 0, 0);
    var cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x4f9eff, metalness: 0.1, roughness: 0.4 })
    );
    scene.add(cube);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    var dir = new THREE.DirectionalLight(0xffffff, 0.9); dir.position.set(3, 4, 5); scene.add(dir);
    var raf = 0;
    function loop() {
      cube.rotation.x += 0.01; cube.rotation.y += 0.012;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return function () { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);
  return React.createElement('canvas', { ref: ref, style: { width: '100%', height: 300 } });
}

Example 2 — animated sphere with orbit motion around a central body:
export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var w = canvas.clientWidth || 320, h = 300;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 2.5, 8); camera.lookAt(0, 0, 0);
    var sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffcc33, emissive: 0x553300 })
    );
    scene.add(sun);
    var planet = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x66aaff })
    );
    scene.add(planet);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    var pt = new THREE.PointLight(0xffffff, 1.2, 50); pt.position.set(0, 0, 0); scene.add(pt);
    var t = 0, raf = 0;
    function loop() {
      t += 0.02; planet.position.set(Math.cos(t) * 3, 0, Math.sin(t) * 3);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return function () { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);
  return React.createElement('canvas', { ref: ref, style: { width: '100%', height: 300 } });
}`

// ── Fallback prompt: 2D recharts (kept verbatim from the original 2D engine) ─
const SYSTEM_PROMPT_2D = `You are a visualization code generator for a student tutoring app.

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

// Denylist: defense-in-depth on top of the iframe sandbox boundary. Three.js
// scenes mount via a React ref, so they never need `document.` or `window.`
// access — the same restrictions used for the 2D engine still hold.
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
 * 3D-specific completion check. A truncated Three.js component is the common
 * failure mode of the original 800-token cap: useEffect body opens, sets up
 * the scene, then cuts off before the RAF cleanup function is ever returned.
 * Rejecting these here means a truncated 3D pass falls through to the 2D
 * retry instead of shipping unmountable code that will throw at iframe
 * runtime (and leak a renderer + animation loop on every remount).
 *
 * Only applied to the 3D pass — the 2D recharts pass returns purely
 * declarative recharts trees and doesn't have a useEffect lifecycle.
 */
function looksComplete3D(code: string): boolean {
  if (!/React\.useEffect/.test(code)) return true // not a 3D component at all
  if (!/cancelAnimationFrame/.test(code)) return false
  if (!/\.dispose\s*\(/.test(code)) return false
  return true
}

interface GenerateOnceOpts {
  maxTokens: number
  /** Optional extra completeness gate applied AFTER the standard checks. */
  requireComplete?: (code: string) => boolean
}

/**
 * Run one round of: LLM call → tag parse → fence strip → export check →
 * denylist check → optional completeness check. Returns the validated code
 * string or null. Never throws.
 */
async function generateOnce(
  explanationText: string,
  systemPrompt: string,
  opts: GenerateOnceOpts,
): Promise<string | null> {
  try {
    const raw = await generateAIResponse(
      [{ role: 'user', content: `Concept to visualize: ${explanationText.trim()}` }],
      systemPrompt,
      opts.maxTokens,
    )
    const code = parseVisualizationCode(raw) ?? stripCodeFences(raw)
    if (!code) return null
    if (!/export\s+default/.test(code)) return null
    if (!isSafe(code)) return null
    if (opts.requireComplete && !opts.requireComplete(code)) return null
    return code
  } catch {
    return null
  }
}

/**
 * Generates a visualization component for the given explanation text — 3D
 * Three.js first (1500-token budget — Three.js scenes need renderer +
 * camera + lights + animation loop + cleanup, roughly 60-80 lines minimum),
 * with a single retry against the 2D recharts prompt (800 tokens, fits
 * easily) if the 3D pass fails any static check including the 3D-only
 * completeness gate. Never throws — returns null when both passes fail
 * (LLM error, malformed output, missing default export, denylisted
 * identifier, or truncated 3D body). The iframe sandbox exposes BOTH
 * THREE and the 2D libs, so whichever code came back will execute in
 * scope.
 */
export async function generateVisualizationCode(
  explanationText: string,
): Promise<GeneratedVisualization | null> {
  if (!isDynamicVisualizationEnabled()) return null
  if (!explanationText || !explanationText.trim()) return null

  const code3d = await generateOnce(explanationText, SYSTEM_PROMPT_3D, {
    maxTokens: 1500,
    requireComplete: looksComplete3D,
  })
  if (code3d) return { code: code3d }

  const code2d = await generateOnce(explanationText, SYSTEM_PROMPT_2D, {
    maxTokens: 800,
  })
  if (code2d) return { code: code2d }

  return null
}
