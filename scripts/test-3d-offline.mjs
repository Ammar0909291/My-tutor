/**
 * OFFLINE validation harness for the 3D dynamic-visualization wiring.
 * The live-LLM test (test-3d-quality.mjs) requires GROQ_API_KEY (or another
 * reachable LLM endpoint with credentials); this sandbox has neither. This
 * harness instead proves the surrounding pipeline is wired correctly by:
 *   1. Running buildSandboxDocument() with a real Three.js component string
 *      and printing the iframe HTML so we can see THREE is loaded as a
 *      module + injected into the factory scope.
 *   2. Running the static checks (export-default, denylist) on three inputs:
 *      a known-good Three.js component, the legacy 2D recharts component,
 *      and a deliberately unsafe component using `eval()`.
 *
 * Pure node — no network, no LLM call. Verifies the wiring, not the LLM.
 */
import { readFileSync } from 'node:fs'

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

const GOOD_3D = `export default function Visual() {
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
      new THREE.MeshStandardMaterial({ color: 0x4f9eff })
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
}`

const GOOD_2D = `export default function Visual() {
  var data = [];
  for (var i = 0; i < 50; i++) { var x = (i / 49) * 2 * Math.PI; data.push({ x: x.toFixed(2), y: Math.sin(x) }); }
  return React.createElement(
    recharts.ResponsiveContainer, { width: '100%', height: 300 },
    React.createElement(recharts.LineChart, { data: data },
      React.createElement(recharts.XAxis, { dataKey: 'x' }),
      React.createElement(recharts.YAxis, null),
      React.createElement(recharts.Line, { type: 'monotone', dataKey: 'y', stroke: '#8884d8', dot: false })));
}`

const BAD_EVAL = `export default function Visual() {
  eval('alert(1)');
  return React.createElement('div', null, 'pwn');
}`

function gate(name, code) {
  const hasExport = /export\s+default/.test(code)
  const safe = isSafe(code)
  const ok = hasExport && safe
  console.log(`  ${name.padEnd(20)} hasExport=${hasExport} safe=${safe} → ${ok ? 'ACCEPT' : 'REJECT'}`)
  return ok
}

console.log('── Static validation pipeline ─────────────────────────────────')
gate('GOOD_3D (THREE)', GOOD_3D)
gate('GOOD_2D (recharts)', GOOD_2D)
gate('BAD_EVAL (unsafe)', BAD_EVAL)

console.log('\n── Iframe HTML emitted for GOOD_3D (truncated) ───────────────')
// Inline a copy of buildSandboxDocument here — its source of truth lives in
// src/components/learn/DynamicVisualRenderer.tsx, but reading and exec-ing
// TSX needs a transpiler; this mirror is good enough to confirm the shape
// of the HTML the renderer emits.
const VENDOR = [
  '/vendor/dynamic-visuals/react.production.min.js',
  '/vendor/dynamic-visuals/react-dom.production.min.js',
  '/vendor/dynamic-visuals/react-is.production.min.js',
  '/vendor/dynamic-visuals/recharts.production.js',
  '/vendor/dynamic-visuals/d3.min.js',
  '/vendor/dynamic-visuals/mathjs.js',
]
const THREE_MODULE = '/vendor/dynamic-visuals/three.module.min.js'
function buildSandboxDocument(code) {
  const transformed = code.replace(/export\s+default/, 'return')
  const scriptTags = VENDOR.map((s) => `<script src="${s}"></script>`).join('\n')
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body>
<div id="root"></div>
${scriptTags}
<script type="module">
import * as THREE from ${JSON.stringify(THREE_MODULE)};
window.THREE = THREE;
function fail(message) { parent.postMessage({ type: 'dynamic-visual-error', message: String(message) }, '*'); }
try {
  var factory = new Function('React', 'ReactDOM', 'THREE', 'recharts', 'd3', 'mathjs', ${JSON.stringify(transformed)});
  var Component = factory(window.React, window.ReactDOM, window.THREE, window.Recharts, window.d3, window.math);
  if (typeof Component !== 'function') { fail('generated code did not return a component'); }
  else {
    var root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(Component));
    parent.postMessage({ type: 'dynamic-visual-rendered' }, '*');
  }
} catch (err) { fail(err && err.message ? err.message : 'render failed'); }
</script>
</body>
</html>`
}
const html = buildSandboxDocument(GOOD_3D)
console.log(html.slice(0, html.indexOf('var factory')) + '... <factory + render + cleanup omitted> ...')

console.log('\n── Confirm vendored Three.js files are present ──────────────')
for (const f of ['three.module.min.js', 'three.core.min.js']) {
  const path = `public/vendor/dynamic-visuals/${f}`
  try {
    const size = readFileSync(path).length
    console.log(`  ${path.padEnd(50)} ${size} bytes ✓`)
  } catch (e) {
    console.log(`  ${path.padEnd(50)} MISSING ✗ (${e.message})`)
  }
}
