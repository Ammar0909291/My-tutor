'use client'
/**
 * HydrogenOrbital3D — 3D Quantum Simulations Phase 1, Task 6.
 * revealStep-gated hydrogen orbital explorer on the Universal 3D Engine:
 *   1 nucleus · 2 1s spherical cloud · 3 2s cloud (larger, with node) ·
 *   4 2p lobed orbital · 5 side-by-side comparison.
 * Educational goal: counter the "planetary orbit" misconception — electrons
 * occupy probability CLOUDS, not flat circular orbits. Reuses ThreeDVisual;
 * narration-compatible via revealStep.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'

/** Fibonacci-sphere point cloud, optionally radially modulated for shells/lobes. */
function cloudPoints(
  count: number,
  radius: number,
  shape: '1s' | '2s' | '2p',
): [number, number, number][] {
  const pts: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    let px = Math.cos(theta) * r
    let py = y
    let pz = Math.sin(theta) * r
    // radial jitter to create a cloud rather than a shell
    let rad = radius * (0.5 + Math.random() * 0.5)
    if (shape === '2s') {
      // bimodal: inner core + outer shell (radial node)
      rad = (i % 2 === 0 ? radius * 0.35 : radius) * (0.7 + Math.random() * 0.3)
    }
    if (shape === '2p') {
      // dumbbell along the y-axis: weight toward poles
      const lobe = Math.sign(py || 1)
      px *= 0.5
      pz *= 0.5
      py = lobe * (0.6 + Math.abs(py)) * radius * 0.7
      rad = radius * (0.4 + Math.random() * 0.3)
    }
    pts.push([px * rad, py * (shape === '2p' ? 1 : rad), pz * rad])
  }
  return pts
}

function Cloud({ points, color }: { points: [number, number, number][]; color: string }) {
  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Nucleus({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.7} />
    </mesh>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showNucleus = revealStep >= 1
  const show1s = revealStep >= 2
  const show2s = revealStep >= 3
  const show2p = revealStep >= 4
  const compare = revealStep >= 5

  const c1s = useMemo(() => cloudPoints(220, 1.0, '1s'), [])
  const c2s = useMemo(() => cloudPoints(260, 2.0, '2s'), [])
  const c2p = useMemo(() => cloudPoints(260, 2.2, '2p'), [])

  // Comparison step lays the three orbitals out side by side.
  const cmp1s = useMemo(() => cloudPoints(180, 0.8, '1s'), [])
  const cmp2s = useMemo(() => cloudPoints(200, 1.2, '2s'), [])
  const cmp2p = useMemo(() => cloudPoints(200, 1.4, '2p'), [])

  if (compare) {
    return (
      <group>
        <group position={[-3.2, 0, 0]}>
          <Nucleus />
          <Cloud points={cmp1s} color="#4DD0E1" />
        </group>
        <group position={[0, 0, 0]}>
          <Nucleus />
          <Cloud points={cmp2s} color="#FFD166" />
        </group>
        <group position={[3.2, 0, 0]}>
          <Nucleus />
          <Cloud points={cmp2p} color="#81C784" />
        </group>
      </group>
    )
  }

  return (
    <group>
      {showNucleus && <Nucleus />}
      {show1s && !show2s && <Cloud points={c1s} color="#4DD0E1" />}
      {show2s && !show2p && <Cloud points={c2s} color="#FFD166" />}
      {show2p && <Cloud points={c2p} color="#81C784" />}
    </group>
  )
}

export function HydrogenOrbital3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={9}
      ariaLabel="3D hydrogen orbital explorer: the nucleus, the 1s probability cloud, the larger 2s cloud, the lobed 2p orbital, and a side-by-side comparison — showing electrons as probability clouds rather than planetary orbits"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
