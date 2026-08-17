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
import { ThreeDVisual } from './ThreeDVisual'
import { Vector3D } from './Vector3D'
import { MolecularNode3D } from './MolecularNode3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import { visibleObjects, type SceneObject, type SceneSpec } from '@/lib/teaching/sceneSpec'
import { sceneTextObjects } from '@/lib/teaching/visual/layout'
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
          thickness={obj.thickness ?? 0.05}
        />
      )
    case 'label':
      // Drawn by <PlacedLabels/>, which solves every label's position together.
      return null
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
        </group>
      )
    }
    default:
      // `surface` remains unimplemented — it has no producer in the corpus. It
      // returns null rather than guessing at a height-field representation.
      return null
  }
}

/**
 * THE LABEL LAYER — every label in the scene, placed together.
 *
 * Labels cannot be positioned one at a time: avoiding another label requires
 * knowing where that other label ended up. So `renderObject` draws geometry
 * only, and the text is drawn after solving positions for the whole set.
 *
 * The solving and drawing now live in `SceneLabelLayer`, which the three.js
 * VisualCard figures share — this function's whole job is to translate a
 * SceneSpec into the terms that layer speaks. Nothing about placement is
 * persisted: it derives from the spec plus the live canvas size, so the same
 * restored visual re-solves correctly on a different device.
 */
function PlacedLabels({
  objects, cameraDistance, theme,
}: { objects: SceneObject[]; cameraDistance: number; theme: Theme }) {
  const { labels, obstacles } = useMemo(() => {
    const scene: SceneSpec = {
      id: 'labels', title: '', sceneType: 'diagram', cameraDistance,
      steps: [{ objects }],
    }
    return {
      labels: sceneTextObjects(scene).map(({ text, position, object }): LayerLabel => ({
        text,
        position,
        color: themeColor(object.color, theme) ?? '#5B8DEF',
        // `size` is a typographic tier ONLY on label objects; elsewhere it is
        // an extent, so it must not drive typography.
        tier: object.type === 'label' ? object.size : undefined,
      })),
      // Every object is something to stay clear of, including the ones that
      // carry text — the layer strips that text so nothing is counted twice.
      obstacles: objects,
    }
  }, [objects, cameraDistance, theme])

  return <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={cameraDistance} theme={theme} />
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
      cameraTarget={spec.cameraTarget}
      ariaLabel={spec.ariaLabel ?? spec.title}
      // A labelled teaching figure is a diagram, not a turntable. While the
      // camera orbits, every label's screen position orbits with it, so
      // containment and separation cannot be guaranteed for even one frame —
      // and the layout model's fixed-camera projection stops being true.
      // Pan and zoom stay enabled; only the automatic motion stops.
      autoRotate={false}
    >
      <group>
        {objects.map((obj, i) => renderObject(obj, i, theme))}
        <PlacedLabels objects={objects} cameraDistance={spec.cameraDistance ?? 7} theme={theme} />
      </group>
    </ThreeDVisual>
  )
}
