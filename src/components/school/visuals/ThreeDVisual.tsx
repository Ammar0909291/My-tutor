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
  /**
   * Slow orbit of the camera. Delightful on an exploratory 3D object, wrong on
   * a labelled teaching diagram: while the camera moves, every label's screen
   * position moves with it, so no placement can keep text inside the canvas or
   * clear of other text. Defaults to true so existing callers are unchanged.
   */
  autoRotate?: boolean
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
  autoRotate = true,
}: ThreeDVisualProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        width: '100%',
        aspectRatio: '4 / 3',
        // A teaching figure has to be legible before it is tidy. 360px capped
        // 3D scenes small enough that labels crowded the geometry; the floor
        // stops a narrow container collapsing the scene to a strip. The 60vh
        // term keeps a tall figure inside the chat viewport on short windows,
        // so it is never taller than the space available to read it in.
        minHeight: 260,
        maxHeight: 'min(520px, 60vh)',
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
        // The container's height depends on aspect-ratio and viewport terms
        // that settle after first paint; without an explicit resize observer
        // policy the first frame can be drawn against a stale (often zero or
        // near-zero) box and never redrawn. Debouncing on resize only, with
        // scroll observation off, makes the canvas re-measure once layout has
        // settled instead of racing it.
        resize={{ scroll: false, debounce: { scroll: 0, resize: 50 } }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={0.9} />
        <directionalLight position={[-4, -2, -4]} intensity={0.3} />
        <Suspense fallback={null}>{children}</Suspense>
        {enableControls && (
          <OrbitControls
            // Pan was disabled, so a learner who zoomed in could not bring the
            // part they were looking at back into frame. Zoom without pan is a
            // trap; both are enabled together.
            enablePan
            autoRotate={autoRotate && !reducedMotion}
            autoRotateSpeed={0.6}
            minDistance={cameraDistance * 0.5}
            maxDistance={cameraDistance * 2}
          />
        )}
      </Canvas>
    </div>
  )
}
