'use client'

/**
 * SceneLabelLayer — the ONE place a 3D figure's text gets positioned.
 *
 * WHY THIS EXISTS. `SceneLabel` unified how a label LOOKS; it did nothing about
 * WHERE it sits. Placement lived inside `SceneSpecRenderer`, so only figures
 * built from a SceneSpec could reach it — and the dominant learner-facing
 * surface is not SceneSpec at all. Measured in this repository:
 *
 *   430 VisualCard decisions   vs   44 scene decisions
 *
 * and 15 of the three.js VisualCard components drew their own `<Html>` labels
 * with a hardcoded 11px size and a hardcoded BLACK halo, bypassing SceneLabel,
 * the typographic tiers, the theme rule and the placement solver together.
 *
 * This component is the seam that closes that gap. It is NOT a second solver
 * and NOT a second label: it calls the existing `placeSceneLabels` and renders
 * the existing `SceneLabel`. `SceneSpecRenderer` now goes through it too, so
 * there is exactly one path from "a figure has text" to "text is on screen".
 *
 * ── WHAT A CALLER SUPPLIES ──────────────────────────────────────────────────
 * Labels, and the geometry they must stay clear of. Nothing else — no screen
 * coordinates, no viewport, no per-figure tuning. The solver needs to know what
 * is in the way, and a hand-built R3F scene is the only thing that knows its
 * own geometry, so a caller declares it once as plain obstacle objects.
 *
 * ── PROJECTION ──────────────────────────────────────────────────────────────
 * `layout.ts` reasons on the z = 0 plane, which is exact for a SceneSpec (they
 * are flat) but not for these figures, which are genuinely three-dimensional.
 * Every anchor and obstacle is therefore projected onto that plane FIRST, using
 * the real perspective divide, so the solver sees where a point actually
 * appears rather than where its x/y would put it. Placement then returns a
 * screen position, and `screenToWorld` converts it back exactly.
 *
 * This is why a converted figure must not auto-rotate: under rotation every
 * projection changes every frame, and no placement can hold. That is the same
 * rule `SceneSpecRenderer` already applies to labelled figures, and it leaves
 * manual orbit untouched — the learner can still turn the model by hand.
 *
 * ── NOTHING HERE IS PERSISTED ───────────────────────────────────────────────
 * Positions are derived from the declared labels plus the LIVE canvas size, on
 * every render. A visual restored on a different device re-solves for that
 * device. No screen coordinate ever leaves this component.
 */

import { useEffect, useMemo, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { SceneLabel } from './SceneLabel'
import type { Theme } from '@/components/Providers'
import type { SceneObject, SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'
import {
  labelWrapWidth, placeSceneLabels, screenToWorld, viewportFromCanvas,
} from '@/lib/teaching/visual/layout'

/** A label a figure wants drawn, in the figure's own world coordinates. */
export interface LayerLabel {
  text: string
  /** Where the figure says this label belongs. The solver starts here. */
  position: Vec3
  /** Already theme-resolved by the caller. */
  color?: string
  /** Typographic tier — a multiplier, exactly as SceneLabel means it. */
  tier?: number
}

const DEFAULT_LABEL_COLOR = '#5B8DEF'

/**
 * Perspective-project a point onto the z = 0 plane, as the camera sees it.
 *
 * The camera sits at (0, 0, d) looking down -z, so a point at depth z appears
 * scaled by d / (d - z). Points behind the camera cannot be projected; they
 * keep their x/y, which is the conservative choice — a label is never thrown
 * to infinity by a degenerate coordinate.
 */
function flatten(p: Vec3, cameraDistance: number): Vec3 {
  const denominator = cameraDistance - p[2]
  if (denominator <= 0.001) return [p[0], p[1], 0]
  const k = cameraDistance / denominator
  return [p[0] * k, p[1] * k, 0]
}

/** The same projection applied to every coordinate an obstacle carries. */
function flattenObstacle(obj: SceneObject, cameraDistance: number): SceneObject {
  const flat: SceneObject = { ...obj }
  // Text on an obstacle would be counted as a second label. Callers pass their
  // text through `labels`; here geometry is geometry only.
  delete flat.text
  if (obj.position) flat.position = flatten(obj.position, cameraDistance)
  if (obj.from) flat.from = flatten(obj.from, cameraDistance)
  if (obj.to) flat.to = flatten(obj.to, cameraDistance)
  if (obj.points) flat.points = obj.points.map((p) => flatten(p, cameraDistance))
  return flat
}

export interface SceneLabelLayerProps {
  labels: LayerLabel[]
  /**
   * Everything the labels must avoid, in world coordinates. Omitting it costs
   * only geometry avoidance — containment and label-on-label are still solved.
   */
  obstacles?: SceneObject[]
  cameraDistance: number
  /** Read on the DOM side and passed down: app context does not cross <Canvas>. */
  theme: Theme
}

export function SceneLabelLayer({ labels, obstacles = [], cameraDistance, theme }: SceneLabelLayerProps) {
  const size = useThree((s) => s.size)
  // SceneLabel sizes text in `vw`, which resolves against the WINDOW, not the
  // canvas. A VisualCard is capped well below the window width, so the two
  // must be tracked separately or every modelled label comes out too small.
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerWidth)
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const placed = useMemo(() => {
    if (labels.length === 0) return []
    const viewport = viewportFromCanvas(size.width, size.height, windowWidth)
    const scene: SceneSpec = {
      id: 'label-layer',
      title: '',
      sceneType: 'diagram',
      cameraDistance,
      steps: [{
        objects: [
          ...obstacles.map((o) => flattenObstacle(o, cameraDistance)),
          ...labels.map((l): SceneObject => ({
            type: 'label',
            text: l.text,
            position: flatten(l.position, cameraDistance),
            size: l.tier,
          })),
        ],
      }],
    }
    // Obstacles carry no text, so the solver's label order is the caller's
    // label order, index for index.
    const { labels: solved } = placeSceneLabels(scene, viewport)
    return solved.map((s, i) => ({
      text: s.text,
      position: screenToWorld(s.x, s.y, viewport, cameraDistance),
      color: labels[i]?.color ?? DEFAULT_LABEL_COLOR,
      tier: labels[i]?.tier,
      // The width the solver reserved, so the painted box matches the planned
      // one. Null for every label that fits on a line — almost all of them.
      maxWidthPx: labelWrapWidth(s.text, viewport, labels[i]?.tier) ?? undefined,
    }))
  }, [labels, obstacles, cameraDistance, size.width, size.height, windowWidth])

  return (
    <>
      {placed.map((p, i) => (
        <SceneLabel
          key={`${p.text}-${i}`}
          text={p.text}
          position={p.position}
          color={p.color}
          theme={theme}
          tier={p.tier}
          maxWidthPx={p.maxWidthPx}
        />
      ))}
    </>
  )
}
