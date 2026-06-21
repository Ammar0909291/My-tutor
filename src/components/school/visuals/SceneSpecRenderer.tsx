'use client'
/**
 * SceneSpecRenderer — Universal Teaching Animation Engine, Scene Specification Foundation Sprint
 * (Task 4, spike). Proof-of-concept generic renderer: interprets a declarative SceneSpec (data)
 * and draws it through the EXISTING primitives, gated by revealStep exactly like every Foundation
 * component. One interpreter for any spec, instead of one bespoke component per concept.
 *
 * Spike scope: supports labels, vectors/arrows, points/nodes/particles, and trajectories/paths.
 * Other object types (bond, bar, surface) are intentionally not handled yet and are skipped.
 *
 * NOT wired to production: no VisualType, no VisualCard case, no detectVisual rule, no Tutor
 * integration. Renders standalone (used only in the dev demo this sprint).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'
import { visibleObjects, type SceneObject, type SceneSpec } from '@/lib/teaching/sceneSpec'

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
    default:
      // bond / bar / surface not handled in the spike subset — skipped harmlessly.
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
