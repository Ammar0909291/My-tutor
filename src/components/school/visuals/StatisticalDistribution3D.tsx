'use client'
/**
 * StatisticalDistribution3D — Data Science 3D Foundation Sprint, Task 2.
 * revealStep-gated on the Universal 3D Engine: a statistical distribution —
 *   1 axes · 2 data points · 3 histogram · 4 distribution curve · 5 summary stats.
 * Teaches normal vs skewed distributions and spread. Reuses ThreeDVisual +
 * MolecularNode3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Vector3D } from './Vector3D'

const BINS = [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4]
// Bell-shaped counts (normal distribution), peak in the middle.
const COUNTS = [1, 2, 3, 4, 5, 4, 3, 2, 1]

function Scene({ revealStep }: { revealStep: number }) {
  const showAxes = revealStep >= 1
  const showPoints = revealStep >= 2
  const showHistogram = revealStep >= 3
  const showCurve = revealStep >= 4
  const showStats = revealStep >= 5

  return (
    <group>
      {showAxes && (
        <group>
          <Vector3D start={[-3, -1.6, 0]} end={[3, -1.6, 0]} color="#9AA5B8" thickness={0.03} label="value" />
          <Vector3D start={[-3, -1.6, 0]} end={[-3, 2, 0]} color="#9AA5B8" thickness={0.03} label="frequency" />
        </group>
      )}

      {showPoints && !showHistogram &&
        BINS.flatMap((x, bi) =>
          Array.from({ length: COUNTS[bi] }).map((_, i) => (
            <MolecularNode3D key={`p${bi}-${i}`} position={[x, -1.4 + i * 0.28, 0]} radius={0.08} color="#5B8DEF" />
          ))
        )}

      {showHistogram &&
        BINS.map((x, bi) => {
          const h = COUNTS[bi] * 0.3
          return (
            <mesh key={`b${bi}`} position={[x, -1.6 + h / 2, 0]}>
              <boxGeometry args={[0.5, h, 0.5]} />
              <meshStandardMaterial color="#5B8DEF" />
            </mesh>
          )
        })}

      {showCurve &&
        BINS.map((x, bi) => (
          <MolecularNode3D key={`c${bi}`} position={[x, -1.6 + COUNTS[bi] * 0.3 + 0.2, 0]} radius={0.07} color="#FFD166" />
        ))}

      {showStats && (
        <group>
          <Vector3D start={[0, -1.6, 0]} end={[0, 1.4, 0]} color="#FF6B6B" thickness={0.025} />
          <Html position={[0, -2.2, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6B6B', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
              Mean at center (symmetric normal distribution) — spread is the width
            </span>
          </Html>
        </group>
      )}
    </group>
  )
}

export function StatisticalDistribution3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={10}
      ariaLabel="3D statistical distribution: axes, data points, a histogram, the distribution curve, and summary statistics showing the mean and spread"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
