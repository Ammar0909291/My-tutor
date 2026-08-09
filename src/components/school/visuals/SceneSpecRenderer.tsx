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
import { SceneLabel } from './SceneLabel'
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'
import { visibleObjects, type SceneObject, type SceneSpec } from '@/lib/teaching/sceneSpec'
import { themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'
import { useTheme, type Theme } from '@/components/Providers'

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

function renderObject(obj: SceneObject, key: number, theme: Theme) {
  // ONE mapping point. Scene colours are stored as their dark-theme value and
  // resolved role-wise here, so the same payload serves both themes and no
  // scene, asset or persistence path is theme-specific.
  const color = themeColor(obj.color, theme)
  switch (obj.type) {
    case 'point':
    case 'node':
    case 'particle':
      return (
        <MolecularNode3D
          key={key}
          position={obj.position ?? [0, 0, 0]}
          radius={obj.radius ?? (obj.type === 'node' ? 0.3 : 0.1)}
          color={color ?? '#5B8DEF'}
          label={obj.text}
          theme={theme}
        />
      )
    case 'vector':
    case 'arrow':
      return (
        <Vector3D
          key={key}
          start={obj.from ?? [0, 0, 0]}
          end={obj.to ?? [1, 0, 0]}
          color={color ?? '#5B8DEF'}
          label={obj.text}
          thickness={obj.thickness ?? 0.05}
          theme={theme}
        />
      )
    case 'label':
      return (
        <SceneLabel
          key={key}
          text={obj.text ?? ''}
          position={obj.position ?? [0, 0, 0]}
          color={color ?? '#5B8DEF'}
          theme={theme}
          tier={obj.size}
        />
      )
    case 'path':
    case 'trajectory':
      // Render the ordered points as small markers (spike: no spline geometry yet).
      // The path's own text used to be dropped: markers were drawn and the
      // label silently discarded. Any text a scene declares must reach the
      // learner, so it is drawn once at the path's midpoint.
      return (
        <group key={key}>
          {(obj.points ?? []).map((p, i) => (
            <MolecularNode3D key={i} position={p} radius={obj.radius ?? 0.06} color={color ?? '#FFD166'} theme={theme} />
          ))}
          {obj.text && (obj.points?.length ?? 0) > 0 && (
            <SceneLabel
              text={obj.text}
              position={obj.points![Math.floor(obj.points!.length / 2)]}
              color={color ?? '#FFD166'}
              theme={theme}
            />
          )}
        </group>
      )
    case 'bond':
      return (
        <BondLine
          key={key}
          from={obj.from ?? [0, 0, 0]}
          to={obj.to ?? [1, 0, 0]}
          color={color ?? '#9aa4b2'}
          thickness={obj.thickness ?? 0.04}
        />
      )
    case 'bar': {
      // `bar` was reaching `default` and returning null, so its GEOMETRY AND
      // its label were both discarded — a scene could declare a bar chart and
      // the learner would see nothing at all. `size` is the bar's extent and
      // `position` its centre, matching what the generators emit.
      const extent = typeof obj.size === 'number' && obj.size > 0 ? obj.size : 1
      const thickness = obj.radius ?? 1.4
      const at = obj.position ?? [0, 0, 0]
      return (
        <group key={key}>
          <mesh position={at}>
            <boxGeometry args={[extent, thickness, thickness]} />
            <meshStandardMaterial color={color ?? '#5B8DEF'} />
          </mesh>
          {obj.text && (
            <SceneLabel
              text={obj.text}
              position={[at[0], at[1] + thickness / 2 + 0.5, at[2]]}
              color={color ?? '#5B8DEF'}
              theme={theme}
            />
          )}
        </group>
      )
    }
    default:
      // `surface` remains unimplemented — it has no producer in the corpus. It
      // returns null rather than guessing at a height-field representation.
      return null
  }
}

interface SceneSpecRendererProps {
  spec: SceneSpec
  /** Same contract as every Foundation component — additive reveal; default shows everything. */
  revealStep?: number
}

export function SceneSpecRenderer({ spec, revealStep = Infinity }: SceneSpecRendererProps) {
  // Read HERE, not inside the scene graph: <Canvas> mounts its own React
  // reconciler root, and app context does not cross that boundary. renderObject
  // is a plain call made during this component's render, so the value is
  // captured on the DOM side and every object below is already resolved.
  const { theme } = useTheme()
  const objects = visibleObjects(spec, revealStep)
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={spec.cameraDistance ?? 7}
      ariaLabel={spec.ariaLabel ?? spec.title}
    >
      <group>{objects.map((obj, i) => renderObject(obj, i, theme))}</group>
    </ThreeDVisual>
  )
}
