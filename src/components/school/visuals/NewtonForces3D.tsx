'use client'
/**
 * NewtonForces3D — Classical Mechanics 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine:
 *   1 object · 2 gravity · 3 normal force · 4 net-force explanation (vectors
 *   summed, residual shown) · 5 balanced-force state (object at rest, forces
 *   cancel). Reuses ThreeDVisual + ForceArrow3D.
 */
import { ThreeDVisual } from './ThreeDVisual'
import { ForceArrow3D } from './ForceArrow3D'

const OBJECT: [number, number, number] = [0, 0.5, 0]

function Scene({ revealStep }: { revealStep: number }) {
  const showObject = revealStep >= 1
  const showGravity = revealStep >= 2
  const showNormal = revealStep >= 3
  const showNet = revealStep >= 4
  const balanced = revealStep >= 5

  return (
    <group>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#3A4356" />
      </mesh>

      {showObject && (
        <mesh position={OBJECT}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#5B8DEF" />
        </mesh>
      )}

      {showGravity && (
        <ForceArrow3D origin={[0, 0, 0]} direction={[0, -1, 0]} magnitude={3} color="#FF6B6B" label="Fg" />
      )}

      {showNormal && (
        <ForceArrow3D origin={[0, 0, 0]} direction={[0, 1, 0]} magnitude={3} color="#4DD0E1" label="N" />
      )}

      {showNet && !balanced && (
        <group position={[2, 1, 0]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#FFB74D" />
          </mesh>
        </group>
      )}

      {balanced && (
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  )
}

export function NewtonForces3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={8}
      ariaLabel="3D Newton's forces: a resting object, the gravity force vector, the normal force vector, the net-force explanation, and the final balanced-force state where the forces cancel"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
