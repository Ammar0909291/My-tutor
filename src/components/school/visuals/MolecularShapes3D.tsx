'use client'
/**
 * MolecularShapes3D — Chemistry 3D Foundation Sprint, Task 5.
 * revealStep-gated on the Universal 3D Engine: a tetrahedral AX4 molecule
 * (e.g. methane-shaped) —
 *   1 atoms · 2 bonds · 3 geometry (tetrahedral arrangement) ·
 *   4 bond angles (labeled) · 5 final molecule.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'

const CENTER: [number, number, number] = [0, 0, 0]
// Tetrahedral vertex directions, scaled to bond length.
const BOND_LEN = 1.4
const OUTER: [number, number, number][] = [
  [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1],
].map((v) => {
  const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  return [v[0] / len * BOND_LEN, v[1] / len * BOND_LEN, v[2] / len * BOND_LEN] as [number, number, number]
})

function Scene({ revealStep }: { revealStep: number }) {
  const showAtoms = revealStep >= 1
  const showBonds = revealStep >= 2
  const showGeometry = revealStep >= 3
  const showAngles = revealStep >= 4
  const completed = revealStep >= 5

  return (
    <group>
      {showAtoms && (
        <>
          <MolecularNode3D position={CENTER} radius={0.32} color="#5B8DEF" label="C" />
          {OUTER.map((p, i) => (
            <MolecularNode3D key={i} position={p} radius={0.22} color="#81C784" label="H" />
          ))}
        </>
      )}

      {showBonds &&
        OUTER.map((p, i) => <Bond3D key={i} atomA={CENTER} atomB={p} bondOrder={1} color="#9AA5B8" />)}

      {showGeometry && (
        <mesh position={CENTER}>
          <sphereGeometry args={[BOND_LEN, 16, 16]} />
          <meshBasicMaterial color="#FFB74D" wireframe transparent opacity={0.25} />
        </mesh>
      )}

      {showAngles && (
        <Html position={[0, BOND_LEN * 0.55, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FFB74D', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            109.5° tetrahedral angles
          </span>
        </Html>
      )}

      {completed && (
        <Html position={[0, -BOND_LEN * 1.2, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#5B8DEF', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            Tetrahedral molecule
          </span>
        </Html>
      )}
    </group>
  )
}

export function MolecularShapes3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={6}
      ariaLabel="3D molecular shapes: a tetrahedral molecule built up from its atoms, bonds, overall geometry, labeled bond angles, and the final molecule"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
