/**
 * Validates the new looksComplete3D gate by exercising it on three samples:
 *   1. Complete Three.js component (the harness reference scene).
 *   2. Truncated 3D body — useEffect opens but no RAF cleanup / dispose.
 *   3. 2D recharts component — no useEffect; gate must pass through unchanged.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

function looksComplete3D(code) {
  if (!/React\.useEffect/.test(code)) return true
  if (!/cancelAnimationFrame/.test(code)) return false
  if (!/\.dispose\s*\(/.test(code)) return false
  return true
}

const COMPLETE_3D = readFileSync(join(here, 'reference-scenes-3d/earth-orbits-sun.js'), 'utf-8')

const TRUNCATED_3D = `export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshStandardMaterial({ color: 0x4f9eff }));
    scene.add(cube);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    function loop() {
      cube.rotation.x += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    loop();
    // cuts off here — no cleanup, no dispose, no return
`

const RECHARTS_2D = `export default function Visual() {
  return React.createElement(recharts.ResponsiveContainer, { width: '100%', height: 300 },
    React.createElement(recharts.LineChart, { data: [{x:1,y:2}] }));
}`

const cases = [
  { name: 'COMPLETE 3D (reference scene)', code: COMPLETE_3D, expect: true },
  { name: 'TRUNCATED 3D (no cleanup)',     code: TRUNCATED_3D, expect: false },
  { name: '2D recharts (no useEffect)',    code: RECHARTS_2D,  expect: true },
]

let allOk = true
for (const c of cases) {
  const got = looksComplete3D(c.code)
  const ok = got === c.expect
  if (!ok) allOk = false
  console.log(`  ${c.name.padEnd(36)} expected=${c.expect} got=${got} → ${ok ? 'PASS' : 'FAIL'}`)
}
process.exit(allOk ? 0 : 1)
