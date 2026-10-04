/**
 * Adaptive complexity — the same figure, pitched at the learner in front of it.
 *
 * WHAT IT MAY AND MAY NOT CHANGE. The one rule that keeps this safe: complexity
 * changes what is SHOWN AT ONCE, never what is true. A beginner and an expert
 * see the same geometry, the same numbers and the same relationship — the
 * beginner meets fewer of them at a time, with more guidance, and is not handed
 * six controls before they have read the picture. Nothing here touches a
 * coordinate, a formula or a value, which is why a figure cannot become wrong
 * by being simplified.
 *
 * ── IT USES THE SIGNAL THE PRODUCT ALREADY HAS ──────────────────────────────
 * `CurriculumLevel` (beginner / intermediate / advanced) — the one level system
 * in this repository that is reachable end to end: the onboarding picker writes
 * it, `Profile.currentLevel` stores it, and `normalizeToCanonicalLevel` maps
 * every legacy value onto it. No new level vocabulary is invented here.
 *
 * ── IT IS NOT PART OF THE ASSET ─────────────────────────────────────────────
 * The level travels with the TURN, never with the scene. A SceneSpec is cached
 * and shared between learners; stamping a per-learner level into it would make
 * one learner's pitch another learner's figure. So the policy is computed at
 * render time from a prop, and an absent level means the intermediate default —
 * which is exactly what every figure did before this existed.
 *
 * Pure. No React, no I/O.
 */

import type { CurriculumLevel } from '@/lib/curriculum/levels'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { roleOf } from '@/lib/teaching/sceneGenerators/visualDesign'

export interface VisualComplexityPolicy {
  level: CurriculumLevel
  /**
   * The most annotations to show at once. Labels beyond this are not deleted —
   * the figure keeps them for later stages and for the other levels — they are
   * simply not all put in front of a beginner at the same moment.
   */
  maxLabels: number
  /** The most variables to offer. A wall of sliders is not an invitation. */
  maxControls: number
  /** Offer the challenge modes (practice / assess). */
  offerChallengeModes: boolean
  /** Offer the misconception contrast. */
  offerContrast: boolean
  /** Offer the representation progression past the situation view. */
  offerRepresentations: boolean
  /** Open on the first stage and walk, rather than showing everything at once. */
  openStaged: boolean
  /** Show each control's causal claim inline (guidance a beginner needs). */
  showEffects: boolean
}

const POLICIES: Record<CurriculumLevel, Omit<VisualComplexityPolicy, 'level'>> = {
  // FEWER THINGS, MORE GUIDANCE. A beginner meeting a concept for the first
  // time is served by one relationship at a time: the figure opens staged, two
  // controls at most, and every control says what it does. Challenge modes and
  // the misconception contrast are withheld — both assume a model to test, and
  // testing a model that has not formed yet reads as being caught out.
  beginner: {
    maxLabels: 5,
    maxControls: 2,
    offerChallengeModes: false,
    offerContrast: false,
    offerRepresentations: false,
    openStaged: true,
    showEffects: true,
  },
  // The default, and what every figure did before this module existed.
  intermediate: {
    maxLabels: 9,
    maxControls: 4,
    offerChallengeModes: true,
    offerContrast: true,
    offerRepresentations: true,
    openStaged: false,
    showEffects: true,
  },
  // LESS SCAFFOLDING, MORE TO DO. Everything is available; the running
  // commentary under each control is not, because at this level it states what
  // the learner is there to work out.
  advanced: {
    maxLabels: 99,
    maxControls: 99,
    offerChallengeModes: true,
    offerContrast: true,
    offerRepresentations: true,
    openStaged: false,
    showEffects: false,
  },
}

/** The policy for a level; the intermediate default when none is known. */
export function complexityFor(level: CurriculumLevel | null | undefined): VisualComplexityPolicy {
  const key: CurriculumLevel = level && level in POLICIES ? level : 'intermediate'
  return { level: key, ...POLICIES[key] }
}

/**
 * Which labels a level meets at once.
 *
 * When a figure has more annotation than the level's budget, the ones that
 * survive are chosen by ROLE, not by position in the list: the result first,
 * then the driving and resulting quantities, then construction aids, and bare
 * apparatus names last. A beginner therefore loses the scaffolding labels and
 * keeps the answer — the opposite of truncating the array, which would keep
 * whatever the generator happened to emit first.
 *
 * GEOMETRY IS NEVER REMOVED. Only labels are budgeted. Removing a drawn object
 * would change what the figure claims; removing a name only changes how much
 * text arrives at once.
 */
const LABEL_PRIORITY: Record<string, number> = {
  result: 0, input: 1, output: 1, aid: 2, ink: 3, reference: 4,
}

/**
 * A one- or two-character label is a MARK, not a name: the "+" and "−" of a
 * charge distribution, a pole letter, "α", "Al". It is drawn as part of the
 * geometry it sits on, so it is neither counted against the budget nor held
 * back. MEASURED in the browser (2026-10-04): a charged conductor's thirteen
 * "+" signs counted as thirteen labels, so the budget hid every charge on the
 * pointed end of the figure whose whole point is "charge crowds at the point".
 */
export function isGlyphLabel(o: SceneObject): boolean {
  return o.type === 'label' && typeof o.text === 'string' && o.text.trim().length <= 2
}

/**
 * Which labels a level meets at once. `fresh` (optional) is the set of objects
 * the CURRENT stage introduces: when the learner is walking the stages, those
 * rank ahead of everything revealed earlier, so every label is met on the
 * stage that introduces it — the promise the held-back note makes ("walk the
 * stages to meet them one at a time"). MEASURED before this (2026-10-04): the
 * stable role order always preferred earlier stages, so on 8 of the 45
 * coverage-extension physics figures some labels were shown at NO stage,
 * including a special-diodes figure's photodiode and solar-cell notes.
 */
export function budgetLabels(objects: SceneObject[], policy: VisualComplexityPolicy, fresh?: ReadonlySet<SceneObject>): SceneObject[] {
  const labels = objects.filter((o) => o.type === 'label' && !isGlyphLabel(o))
  if (labels.length <= policy.maxLabels) return objects

  const keep = new Set(
    labels
      .map((o, i) => ({ o, i, rank: (fresh?.has(o) ? -10 : 0) + (LABEL_PRIORITY[roleOf(o.color) ?? 'ink'] ?? 3) }))
      // Stable within a rank, so the figure does not reshuffle between renders.
      .sort((a, b) => a.rank - b.rank || a.i - b.i)
      .slice(0, policy.maxLabels)
      .map((e) => e.o),
  )
  return objects.filter((o) => o.type !== 'label' || isGlyphLabel(o) || keep.has(o))
}

/** How many labels were held back, so the figure can say so rather than hide it. */
export function labelsHeldBack(objects: SceneObject[], policy: VisualComplexityPolicy): number {
  const labels = objects.filter((o) => o.type === 'label' && !isGlyphLabel(o)).length
  return Math.max(0, labels - policy.maxLabels)
}
