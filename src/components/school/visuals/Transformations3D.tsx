'use client'
/**
 * Transformations3D — Mathematics 3D Foundation Sprint, Task 6.
 * revealStep-gated: 1 original shape · 2 translation · 3 rotation · 4 scaling ·
 * 5 final comparison view. Reuses ThreeDVisual; plain Three.js box geometry.
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 9
const ORIGINAL_POS: [number, number, number] = [0, 0, 0]
const TRANSLATED_POS: [number, number, number] = [2.2, 0.8, 0]
const ROTATION: [number, number, number] = [0, Math.PI / 4, Math.PI / 6]
const SCALE: [number, number, number] = [1.5, 1.5, 1.5]

const ROW_POS: [number, number, number][] = [[-3, 0, 0], [-1, 0, 0], [1, 0, 0], [3, 0, 0]]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showOriginal = revealStep >= 1
  const showTranslation = revealStep >= 2
  const showRotation = revealStep >= 3
  const showScaling = revealStep >= 4
  const compare = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    if (compare) {
      for (const p of ROW_POS) obstacles.push({ type: 'node', position: p, radius: 0.6 })
      labels.push({ text: 'Original · Translation · Rotation · Scaling', position: [0, -1.1, 0], color: '#9AA5B8' })
    }
    return { labels, obstacles }
  }, [compare])

  return (
    <group>
      {showOriginal && !compare && (
        <mesh position={ORIGINAL_POS}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#9AA5B8" />
        </mesh>
      )}

      {showTranslation && !compare && (
        <mesh position={TRANSLATED_POS}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
      )}

      {showRotation && !compare && (
        <mesh position={ORIGINAL_POS} rotation={ROTATION}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#5B8DEF" />
        </mesh>
      )}

      {showScaling && !compare && (
        <mesh position={ORIGINAL_POS} scale={SCALE}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#81C784" />
        </mesh>
      )}

      {compare && (
        <>
          <mesh position={ROW_POS[0]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#9AA5B8" />
          </mesh>
          <mesh position={ROW_POS[1]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          <mesh position={ROW_POS[2]} rotation={ROTATION}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#5B8DEF" />
          </mesh>
          <mesh position={ROW_POS[3]} scale={[1.3, 1.3, 1.3]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#81C784" />
          </mesh>
        </>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function Transformations3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D geometric transformations: an original cube, then its translation, rotation, and scaling, each introduced in turn, then a side-by-side comparison view"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}
