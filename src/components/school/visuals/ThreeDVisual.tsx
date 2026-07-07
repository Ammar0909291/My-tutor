'use client'
/**
 * ThreeDVisual — 3D Educational Engine Foundation Sprint 1.
 * Shared React Three Fiber scene host: camera, lighting, responsive layout,
 * mobile compatibility, and reduced-motion support. No subject-specific
 * logic — subject/engine visuals (e.g. ParticleSystem3D) render their scene
 * contents as children and plug into the existing VisualCard revealStep
 * contract exactly like every SVG visual.
 */
import { Suspense, useEffect, useState, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface ThreeDVisualProps {
  /** Scene contents (meshes, points, lights beyond the defaults) — engine-agnostic host. */
  children: ReactNode
  /** Forwarded for components that want to gate their own scene logic on it. */
  revealStep?: number
  /** Accessible label for the figure region (mirrors the SVG visuals' sr-only description). */
  ariaLabel: string
  /** Camera distance from origin. */
  cameraDistance?: number
  /** Allow user orbit/zoom/pan (default true; disabled automatically under reduced motion is NOT assumed — rotation auto-spin is what reduced motion disables). */
  enableControls?: boolean
}

/** Detects the user's OS-level reduced-motion preference (no new narration/animation architecture — purely gates autorotation). */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function ThreeDVisual({
  children,
  ariaLabel,
  cameraDistance = 6,
  enableControls = true,
}: ThreeDVisualProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        width: '100%',
        aspectRatio: '4 / 3',
        maxHeight: 360,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bg-elevated)',
        touchAction: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, cameraDistance], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={0.9} />
        <directionalLight position={[-4, -2, -4]} intensity={0.3} />
        <Suspense fallback={null}>{children}</Suspense>
        {enableControls && (
          <OrbitControls
            enablePan={false}
            autoRotate={!reducedMotion}
            autoRotateSpeed={0.6}
            minDistance={cameraDistance * 0.5}
            maxDistance={cameraDistance * 2}
          />
        )}
      </Canvas>
    </div>
  )
}
