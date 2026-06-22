'use client'
/**
 * SceneSpecRenderer — Universal Teaching Animation Engine, Scene Specification Foundation Sprint
 * (Task 4, spike). Proof-of-concept generic renderer: interprets a declarative SceneSpec (data)
 * and draws it through the EXISTING primitives, gated by revealStep exactly like every Foundation
 * component. One interpreter for any spec, instead of one bespoke component per concept.
 *
 * Supports labels, vectors/arrows, points/nodes/particles, trajectories/paths, and bonds.
 * bar / surface object types are not handled yet and are skipped.
 *
 * Wired into the live tutor via buildSceneSpec.ts (route.ts) and LessonScreen.tsx, in
 * addition to the standalone dev demo.
 */
import { useMemo } from 'react'
import { Quaternion, Vector3 } from 'three'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'
import { visibleObjects, type SceneObject, type SceneSpec } from '@/lib/teaching/sceneSpec'

/** Plain (headless) connecting cylinder between two atoms — a chemical bond has no direction/arrowhead. */
function BondLine({ from, to, color = '#9aa4b2', thickness = 0.04 }: { from: [number, number, number]; to: [number, number, number]; color?: string; thickness?: number }) {
  const { position, length, quaternion } = useMemo(() => {
    const startV = new Vector3(...from)
    const endV = new Vector3(...to)
    const displacement = endV.clone().sub(startV)
    const len = displacement.length()
    const direction = displacement.clone().normalize()
    const quat = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction)
    const mid = startV.clone().add(direction.multiplyScalar(len / 2))
    return { position: mid.toArray() as [number, number, number], length: len, quaternion: quat }
  }, [from, to])

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[thickness, thickness, Math.max(length, 0.001), 12]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function renderObject(obj: SceneObject, key: number) {
  switch (obj.type) {
    case 'point':
    case 'node':
    case 'particle':
      return (
        <MolecularNode3D
          key={key}
          position={obj.position ?? [0, 0, 0]}
          radius={obj.radius ?? (obj.type === 'node' ? 0.3 : 0.1)}
          color={obj.color ?? '#5B8DEF'}
          label={obj.text}
        />
      )
    case 'vector':
    case 'arrow':
      return (
        <Vector3D
          key={key}
          start={obj.from ?? [0, 0, 0]}
          end={obj.to ?? [1, 0, 0]}
          color={obj.color ?? '#5B8DEF'}
          label={obj.text}
          thickness={obj.thickness ?? 0.05}
        />
      )
    case 'label':
      return (
        <Html key={key} position={obj.position ?? [0, 0, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: obj.color ?? '#5B8DEF', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            {obj.text}
          </span>
        </Html>
      )
    case 'path':
    case 'trajectory':
      // Render the ordered points as small markers (spike: no spline geometry yet).
      return (
        <group key={key}>
          {(obj.points ?? []).map((p, i) => (
            <MolecularNode3D key={i} position={p} radius={obj.radius ?? 0.06} color={obj.color ?? '#FFD166'} />
          ))}
        </group>
      )
    case 'bond':
      return (
        <BondLine
          key={key}
          from={obj.from ?? [0, 0, 0]}
          to={obj.to ?? [1, 0, 0]}
          color={obj.color ?? '#9aa4b2'}
          thickness={obj.thickness ?? 0.04}
        />
      )
    default:
      // bar / surface not handled yet — skipped harmlessly.
      return null
  }
}

interface SceneSpecRendererProps {
  spec: SceneSpec
  /** Same contract as every Foundation component — additive reveal; default shows everything. */
  revealStep?: number
}

export function SceneSpecRenderer({ spec, revealStep = Infinity }: SceneSpecRendererProps) {
  const objects = visibleObjects(spec, revealStep)
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={spec.cameraDistance ?? 7}
      ariaLabel={spec.ariaLabel ?? spec.title}
    >
      <group>{objects.map((obj, i) => renderObject(obj, i))}</group>
    </ThreeDVisual>
  )
}
