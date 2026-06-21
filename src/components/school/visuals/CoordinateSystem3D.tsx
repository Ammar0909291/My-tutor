'use client'
/**
 * CoordinateSystem3D — Mathematics 3D Foundation Sprint, Task 2.
 * revealStep-gated: 1 X axis · 2 Y axis · 3 Z axis · 4 coordinate point ·
 * 5 completed system. Reuses ThreeDVisual + Vector3D.
 */
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'

const ORIGIN: [number, number, number] = [0, 0, 0]
const POINT: [number, number, number] = [2, 1.5, 1]

function Scene({ revealStep }: { revealStep: number }) {
  const showX = revealStep >= 1
  const showY = revealStep >= 2
  const showZ = revealStep >= 3
  const showPoint = revealStep >= 4
  const completed = revealStep >= 5

  return (
    <group>
      {showX && <Vector3D start={ORIGIN} end={[3, 0, 0]} color="#FF6B6B" label="X" />}
      {showY && <Vector3D start={ORIGIN} end={[0, 3, 0]} color="#81C784" label="Y" />}
      {showZ && <Vector3D start={ORIGIN} end={[0, 0, 3]} color="#5B8DEF" label="Z" />}
      {showPoint && <MolecularNode3D position={POINT} radius={0.12} color="#FFB74D" label="(2, 1.5, 1)" />}
      {completed && (
        <>
          <Vector3D start={[POINT[0], 0, 0]} end={POINT} color="#9AA5B8" thickness={0.02} />
          <Vector3D start={[0, POINT[1], 0]} end={POINT} color="#9AA5B8" thickness={0.02} />
          <Vector3D start={[0, 0, POINT[2]]} end={POINT} color="#9AA5B8" thickness={0.02} />
        </>
      )}
    </group>
  )
}

export function CoordinateSystem3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={7}
      ariaLabel="3D coordinate system: X, Y, and Z axes built up in order, a labeled coordinate point, and the completed system with projection lines"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
