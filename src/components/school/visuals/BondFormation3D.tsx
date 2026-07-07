'use client'
/**
 * BondFormation3D — Chemistry 3D Foundation Sprint, Task 6.
 * revealStep-gated on the Universal 3D Engine:
 *   1 separate atoms · 2 valence electrons · 3 approach (atoms move closer) ·
 *   4 bond formation (shared electron pair + bond) · 5 stable molecule.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D.
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'

const FAR_A: [number, number, number] = [-2.6, 0, 0]
const FAR_B: [number, number, number] = [2.6, 0, 0]
const NEAR_A: [number, number, number] = [-0.75, 0, 0]
const NEAR_B: [number, number, number] = [0.75, 0, 0]

function ValenceElectrons({ center, side }: { center: [number, number, number]; side: 1 | -1 }) {
  const offsets: [number, number, number][] = [
    [side * 0.35, 0.2, 0],
    [side * 0.35, -0.2, 0],
  ]
  return (
    <group>
      {offsets.map((o, i) => (
        <mesh key={i} position={[center[0] + o[0], center[1] + o[1], center[2] + o[2]]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial color="#4DD0E1" emissive="#4DD0E1" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ revealStep }: { revealStep: number }) {
  const showAtoms = revealStep >= 1
  const showValence = revealStep >= 2
  const approached = revealStep >= 3
  const bonded = revealStep >= 4
  const stable = revealStep >= 5

  const posA = approached ? NEAR_A : FAR_A
  const posB = approached ? NEAR_B : FAR_B

  return (
    <group>
      {showAtoms && (
        <>
          <MolecularNode3D position={posA} radius={0.3} color="#FF6B6B" label="A" />
          <MolecularNode3D position={posB} radius={0.3} color="#5B8DEF" label="B" />
        </>
      )}

      {showValence && !bonded && (
        <>
          <ValenceElectrons center={posA} side={1} />
          <ValenceElectrons center={posB} side={-1} />
        </>
      )}

      {bonded && (
        <>
          <Bond3D atomA={posA} atomB={posB} bondOrder={1} color="#81C784" label="shared pair" />
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.6} />
          </mesh>
        </>
      )}

      {stable && (
        <Html position={[0, -0.9, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#81C784', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            Stable molecule AB
          </span>
        </Html>
      )}
    </group>
  )
}

export function BondFormation3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={6}
      ariaLabel="3D bond formation: two separate atoms with their valence electrons approach each other, form a shared-electron-pair bond, and settle into a stable molecule"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}
