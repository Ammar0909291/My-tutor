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
        />
      )
    case 'label': {
      // Typographic tier (M4.1). `size` is a MULTIPLIER on the base label size,
      // so a scene can give its heading, its object names and its fine print
      // three distinguishable weights instead of one flat 11px wall of text.
      // Omitted (every pre-existing scene) => 1 => byte-identical to before.
      const scale = typeof obj.size === 'number' && obj.size > 0 ? Math.min(obj.size, 3) : 1
      return (
        <Html key={key} position={obj.position ?? [0, 0, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{
            fontSize: 11 * scale,
            fontWeight: scale >= 1.4 ? 800 : 700,
            letterSpacing: scale >= 1.4 ? '0.02em' : undefined,
            color: color ?? '#5B8DEF',
            whiteSpace: 'nowrap',
            // A halo in the SURFACE's colour, not a fixed black one: the shadow
            // exists to separate a label from a ray or a wave crossing behind
            // it, and a black glow around dark text on a light panel does the
            // opposite of that.
            textShadow: theme === 'light'
              ? (scale >= 1.4 ? '0 1px 4px rgba(255,255,255,0.95)' : '0 0 3px rgba(255,255,255,0.9)')
              : (scale >= 1.4 ? '0 1px 4px rgba(0,0,0,0.85)' : '0 0 3px rgba(0,0,0,0.6)'),
          }}>
            {obj.text}
          </span>
        </Html>
      )
    }
    case 'path':
    case 'trajectory':
      // Render the ordered points as small markers (spike: no spline geometry yet).
      return (
        <group key={key}>
          {(obj.points ?? []).map((p, i) => (
            <MolecularNode3D key={i} position={p} radius={obj.radius ?? 0.06} color={color ?? '#FFD166'} />
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
