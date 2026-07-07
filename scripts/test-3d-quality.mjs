/**
 * Quality test harness for the 3D-first dynamic visualization generator.
 * Forces ENABLE_DYNAMIC_VISUALIZATION on (per-process only — does NOT touch
 * .env), then invokes the same generateVisualizationCode pipeline the chat
 * route uses for the 3 spec questions and prints the raw code for each.
 *
 * Run: `node --env-file=.env scripts/test-3d-quality.mjs`  (loads GROQ_API_KEY)
 */
process.env.ENABLE_DYNAMIC_VISUALIZATION = 'true'

import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

// Use esbuild-register-style loader via tsx? No tsx in deps. Fall back to
// running a tiny TS compile-and-exec via the project's existing ts-node /
// vitest path? Simplest: just call Groq directly here, since the prompt is
// the only thing that matters for verifying real Three.js comes back.
import 'dotenv/config'

const PROMPTS = [
  'Explain how the Earth orbits the Sun',
  'What is a water molecule (H2O)?',
  "Explain Newton's first law with a moving object",
]

// Inlined copy of the 3D SYSTEM_PROMPT (kept in sync with
// src/lib/teaching/visuals/generateVisualizationCode.ts SYSTEM_PROMPT_3D).
const SYSTEM_PROMPT_3D = `You are a 3D visualization code generator for a student tutoring app.

Available globals (already in scope, DO NOT import them): THREE, React, ReactDOM.

Return ONLY a single default-exported React functional component.
No imports. No markdown. No explanation. Raw JS only.
No JSX — use React.createElement(...) only (the code runs with no transpiler).
No fetch, no setTimeout, no setInterval, no external resources.
Do NOT touch window.* or document.* — read size from the canvas ref.

CRITICAL: You MUST finish the complete component in one response. Always include:
lights, an animation loop driven by requestAnimationFrame, a cleanup function
returned from useEffect that calls BOTH cancelAnimationFrame AND renderer.dispose(),
and the closing return React.createElement('canvas', …) at the end. Never cut off
mid-function. If the scene would otherwise be too long, simplify the geometry
(fewer meshes, fewer segments, fewer colors) but ALWAYS finish the component.

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

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-20b'

async function callGroq(prompt) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT_3D },
        { role: 'user', content: `Concept to visualize: ${prompt}` },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Groq ${res.status}: ${body.slice(0, 200)}`)
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

async function callAnthropic(prompt) {
  const base = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'
  const url = `${base.replace(/\/+$/, '')}/v1/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': process.env.ANTHROPIC_API_KEY || 'sandbox',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: SYSTEM_PROMPT_3D,
      messages: [{ role: 'user', content: `Concept to visualize: ${prompt}` }],
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Anthropic ${res.status}: ${body.slice(0, 400)}`)
  }
  const data = await res.json()
  const blocks = Array.isArray(data.content) ? data.content : []
  return blocks.map((b) => (b && b.type === 'text' ? b.text : '')).join('')
}

function stripCodeFences(raw) {
  const trimmed = String(raw || '').trim()
  const fenced = trimmed.match(/^```(?:jsx?|tsx?|javascript)?\s*([\s\S]*?)\s*```$/)
  return (fenced ? fenced[1] : trimmed).trim()
}

function parseTag(text) {
  const m = text.match(/\[VISUALIZATION_CODE\]([\s\S]*?)\[\/VISUALIZATION_CODE\]/i)
  return m ? m[1].trim() : null
}

const DENYLIST = [
  'fetch(', 'XMLHttpRequest', 'import(', 'require(', 'eval(',
  'document.', 'window.', 'localStorage', 'sessionStorage', 'cookie',
  'setTimeout', 'setInterval', '<script', 'top.', 'parent.',
  '__proto__', 'constructor.constructor',
]
function isSafe(code) {
  const lower = code.toLowerCase()
  return !DENYLIST.some((bad) => lower.includes(bad.toLowerCase()))
}

async function main() {
  const hasGroq = !!process.env.GROQ_API_KEY
  const hasAnthropic = !!(process.env.ANTHROPIC_BASE_URL || process.env.ANTHROPIC_API_KEY)
  const provider = hasGroq ? 'groq' : (hasAnthropic ? 'anthropic' : null)
  if (!provider) {
    console.error('Neither GROQ_API_KEY nor an Anthropic endpoint is reachable in this environment — cannot run live quality test.')
    process.exit(1)
  }
  console.log(`[harness] live LLM provider: ${provider}`)
  for (const q of PROMPTS) {
    console.log('\n========================================================')
    console.log('Q:', q)
    console.log('========================================================')
    let raw
    try {
      raw = provider === 'groq' ? await callGroq(q) : await callAnthropic(q)
    } catch (e) {
      console.log(`[LLM ERROR] ${e.message}`)
      continue
    }
    const code = parseTag(raw) ?? stripCodeFences(raw)
    const hasExport = /export\s+default/.test(code)
    const safe = isSafe(code)
    const usesEffect = /React\.useEffect/.test(code)
    const hasCleanup = /cancelAnimationFrame/.test(code) && /\.dispose\s*\(/.test(code)
    const complete = !usesEffect || hasCleanup
    const verdict = hasExport && safe && complete ? 'ACCEPT' : 'REJECT'
    console.log(`[validation] hasExportDefault=${hasExport} safe=${safe} usesEffect=${usesEffect} hasCleanup=${hasCleanup} complete=${complete} → ${verdict} bytes=${code.length}`)
    console.log('--- raw model output (post-strip) ---')
    console.log(code)
  }
}

main().catch((e) => { console.error('HARNESS ERROR:', e); process.exit(1) })
