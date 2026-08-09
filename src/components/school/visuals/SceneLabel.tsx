'use client'

/**
 * SceneLabel — THE one way a scene draws text.
 *
 * WHY THIS EXISTS. The engine had THREE label implementations that had drifted
 * apart, and only one of them was correct:
 *
 *   SceneSpecRenderer `case 'label'`  theme-aware halo, typographic tiers  ✅
 *   Vector3D                          hardcoded rgba(0,0,0,0.6) halo, 11px  ❌
 *   MolecularNode3D                   hardcoded rgba(0,0,0,0.6) halo, 11px  ❌
 *
 * Measured across the seven M4 pilot figures, the whole activated generator
 * corpus and the vector-addition figure — 177 text-bearing objects:
 *
 *   116 labels rendered correctly (all of them `label` objects)
 *    58 labels rendered with a BLACK halo in BOTH themes, at the smallest size,
 *       with no tier support — every `vector`, `arrow`, `point`, `node` and
 *       `particle` label in the engine
 *
 * That split is exactly why the M4 figures looked right while the Vector
 * Addition figure did not: all 56 M4 labels are `label` objects, and all four
 * of the vector figure's labels ("A (3)", "B (4)", "B (moved)", "R (5)") are
 * `vector` labels. In light theme those 58 labels paint dark text with a BLACK
 * glow on a light surface — a halo that hides text instead of separating it.
 *
 * This component is the consolidation: three label systems become one. It is
 * NOT a new renderer and NOT a second authority — it is the leaf primitive the
 * existing renderer and the existing 3D primitives now share, so a label looks
 * the same wherever it comes from.
 *
 * SIZE IS CONSTANT ON SCREEN. `distanceFactor` used to scale every label by
 * distanceFactor/cameraDistance, so a label's legibility depended on a camera
 * value each scene picked for itself: measured in Chromium, the smallest label
 * rendered at 5.1px, which no learner can read. A label is UI chrome, not
 * geometry — it should be as readable on a scene framed at distance 40 as on
 * one framed at 12. Dropping the factor also makes reality match `layout.ts`,
 * whose collision model was already calibrated against fixed-pixel labels.
 *
 * Theme is a PROP, never a hook. `<Canvas>` mounts its own React reconciler
 * root and app context does not cross that boundary, so the theme is read once
 * on the DOM side by SceneSpecRenderer and passed down — the same rule that
 * file already documents for colour resolution.
 */

import { Html } from '@react-three/drei'
import type { Theme } from '@/components/Providers'
import type { Vec3 } from '@/lib/teaching/sceneSpec'

/**
 * RESPONSIVE SIZE, ONE RULE FOR EVERY SCENE.
 *
 * A constant pixel size fixed legibility but broke containment: at 390px the
 * canvas is only 282px wide, and 13px labels pushed 11 of them outside it.
 * A size that scales with the viewport, with a hard floor, keeps text readable
 * on a phone without letting it grow past what the canvas can hold.
 *
 * FLOOR is the legibility limit — below roughly 10px a label stops being
 * readable, and the engine must never trade legibility for a tidier collision
 * count. Hiding or shrinking a label past this point is a failure, not a fix.
 */
const FLOOR_PX = 10
const IDEAL_VW = 1.05
const CEILING_PX = 15

/** Multipliers above this read as a heading and get the heavier treatment. */
const HEADING_TIER = 1.4

export interface SceneLabelProps {
  text: string
  position: Vec3
  /** Already theme-resolved by the caller via themeColor(). */
  color: string
  theme: Theme
  /**
   * Typographic tier — a MULTIPLIER on the base size, so a scene can give its
   * heading, its object names and its fine print distinguishable weights
   * instead of one flat wall of text. Omitted => 1 => historic behaviour.
   */
  tier?: number
}

export function SceneLabel({ text, position, color, theme, tier }: SceneLabelProps) {
  const scale = typeof tier === 'number' && tier > 0 ? Math.min(tier, 3) : 1
  const heading = scale >= HEADING_TIER

  return (
    <Html position={position} center style={{ pointerEvents: 'none' }}>
      <span
        style={{
          // clamp() does the responsive work in CSS: no context, no measurement
          // pass, no per-scene branching — the same declaration for every label
          // the engine draws.
          fontSize: `clamp(${(FLOOR_PX * scale).toFixed(2)}px, ${(IDEAL_VW * scale).toFixed(2)}vw, ${(CEILING_PX * scale).toFixed(2)}px)`,
          fontWeight: heading ? 800 : 700,
          letterSpacing: heading ? '0.02em' : undefined,
          color,
          whiteSpace: 'nowrap',
          // A halo in the SURFACE's colour, not a fixed black one. The shadow
          // exists to separate a label from a ray or a wave crossing behind it;
          // a black glow around dark text on a light panel does the opposite.
          // This is the single rule the two 3D primitives were missing.
          textShadow: theme === 'light'
            ? (heading ? '0 1px 4px rgba(255,255,255,0.95)' : '0 0 3px rgba(255,255,255,0.9)')
            : (heading ? '0 1px 4px rgba(0,0,0,0.85)' : '0 0 3px rgba(0,0,0,0.6)'),
        }}
      >
        {text}
      </span>
    </Html>
  )
}
