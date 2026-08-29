'use client'
/**
 * ThreeDVisual — 3D Educational Engine Foundation Sprint 1.
 * Shared React Three Fiber scene host: camera, lighting, responsive layout,
 * mobile compatibility, and reduced-motion support. No subject-specific
 * logic — subject/engine visuals (e.g. ParticleSystem3D) render their scene
 * contents as children and plug into the existing VisualCard revealStep
 * contract exactly like every SVG visual.
 */
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
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


/**
 * Keep the camera on the distance the SCENE asks for.
 *
 * `<Canvas camera={...}>` is applied once, at mount, and never again — which
 * was invisible while a scene was a fixed picture and became a defect the
 * moment a figure could be re-derived. MEASURED in Chromium: raising the force
 * on a torque figure from 10 N to 40 N grew the scene from ±2.8 to ±7 units
 * while the camera stayed at the distance the 10 N figure had asked for, so the
 * lever left the frame entirely and the force arrow filled the canvas with no
 * arrowhead visible. Every panel beside it read correctly, which is what makes
 * this the dangerous kind of bug: the numbers were right and the picture was
 * not.
 *
 * It fires ONLY when the requested distance actually changes, so a learner who
 * has zoomed or panned by hand is never yanked back on an unrelated re-render.
 */
function CameraDistanceSync({ distance }: { distance: number }) {
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls) as { update?: () => void } | null
  const applied = useRef(distance)

  useEffect(() => {
    if (applied.current === distance) return
    applied.current = distance
    camera.position.set(0, 0, distance)
    camera.updateProjectionMatrix()
    controls?.update?.()
  }, [distance, camera, controls])

  return null
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
        <CameraDistanceSync distance={cameraDistance} />
        <Suspense fallback={null}>{children}</Suspense>
        {enableControls && (
          <OrbitControls
            // `makeDefault` publishes the controls on the R3F store, which is
            // how CameraDistanceSync above reaches them to re-apply their
            // internal state after it moves the camera.
            makeDefault
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
