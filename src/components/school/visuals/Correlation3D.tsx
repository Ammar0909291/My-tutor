'use client'
/**
 * Correlation3D — Data Science 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine: correlation between two variables —
 *   1 axes · 2 random points · 3 positive correlation · 4 negative correlation ·
 *   5 correlation comparison.
 * Teaches correlation strength and direction. Reuses ThreeDVisual +
 * MolecularNode3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D } from './Vector3D'

const XS = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4]
// Deterministic jitter so points sit near (not exactly on) each trend line.
const JITTER = [0.2, -0.15, 0.1, -0.05, 0.15, -0.2, 0.1]

function axes(offsetX: number) {
  return (
    <group>
      <Vector3D start={[offsetX - 2.8, -1.6, 0]} end={[offsetX + 2.8, -1.6, 0]} color="#9AA5B8" thickness={0.025} />
      <Vector3D start={[offsetX, -1.6, 0]} end={[offsetX, 1.6, 0]} color="#9AA5B8" thickness={0.025} />
    </group>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showAxes = revealStep >= 1
  const showRandom = revealStep >= 2
  const showPositive = revealStep >= 3
  const showNegative = revealStep >= 4
  const compare = revealStep >= 5

  if (compare) {
    return (
      <group>
        {axes(-3)}
        {axes(3)}
        {XS.map((x, i) => <MolecularNode3D key={`pp${i}`} position={[-3 + x * 0.5, x * 0.5 + JITTER[i], 0]} radius={0.09} color="#81C784" />)}
        <Vector3D start={[-4.2, -1.2, 0]} end={[-1.8, 1.2, 0]} color="#FFD166" thickness={0.03} />
        {XS.map((x, i) => <MolecularNode3D key={`nn${i}`} position={[3 + x * 0.5, -x * 0.5 + JITTER[i], 0]} radius={0.09} color="#FF6B6B" />)}
        <Vector3D start={[1.8, 1.2, 0]} end={[4.2, -1.2, 0]} color="#FFD166" thickness={0.03} />
        <Html position={[0, -2.3, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.7)' }}>
            Positive (left, up) vs negative (right, down) correlation
          </span>
        </Html>
      </group>
    )
  }

  return (
    <group>
      {showAxes && axes(0)}
      {showRandom && !showPositive &&
        XS.map((x, i) => <MolecularNode3D key={`r${i}`} position={[x, JITTER[i] * 4 - 0.2, 0]} radius={0.1} color="#9AA5B8" />)}
      {showPositive && !showNegative && (
        <group>
          {XS.map((x, i) => <MolecularNode3D key={`p${i}`} position={[x, x * 0.5 + JITTER[i], 0]} radius={0.1} color="#81C784" />)}
          <Vector3D start={[-2.6, -1.3, 0]} end={[2.6, 1.3, 0]} color="#FFD166" thickness={0.03} label="positive" />
        </group>
      )}
      {showNegative && (
        <group>
          {XS.map((x, i) => <MolecularNode3D key={`n${i}`} position={[x, -x * 0.5 + JITTER[i], 0]} radius={0.1} color="#FF6B6B" />)}
          <Vector3D start={[-2.6, 1.3, 0]} end={[2.6, -1.3, 0]} color="#FFD166" thickness={0.03} label="negative" />
        </group>
      )}
    </group>
  )
}

export function Correlation3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={11}
      ariaLabel="3D correlation: axes, random points, positive correlation, negative correlation, and a side-by-side comparison showing correlation strength and direction"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
