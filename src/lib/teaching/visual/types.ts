/**
 * Visual Resolver V2 — the permanent visualization contract.
 *
 * ONE authority decides visualization for a turn: `resolveVisual()`. This file
 * is its vocabulary. Nothing here imports React, the LLM, Prisma, or the chat
 * route — the whole decision layer is pure data so it can be unit-tested
 * without a database, a network, or a model.
 *
 * The ordering of the three axes below is the architecture, not a style choice:
 *
 *    PURPOSE  (why are we drawing?)      decided first
 *       ↓
 *    REPRESENTATION (what kind of figure?)
 *       ↓
 *    RENDERER (which existing component draws it?)   decided LAST
 *
 * The previous architecture inverted this — it picked a renderer by keyword-
 * matching the model's own prose, then reverse-engineered a justification. That
 * is why the wrong visual could appear for the right concept.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import type { VisualSession } from './session'

/**
 * Why a visual is being shown this turn. Drives the teaching contract injected
 * into the prompt (see visualContract.ts) — an "explain" figure and a "compare"
 * figure are taught differently even when they render identically.
 */
export type EducationalPurpose =
  | 'explain'
  | 'compare'
  | 'demonstrate'
  | 'explore'
  | 'derive'
  | 'simulate'
  | 'review'

/**
 * The kind of educational figure. Deliberately expressed in TEACHING language,
 * not renderer language: 'free_body_diagram' is a pedagogical object; whether
 * it happens to be drawn by an SVG component or a three.js scene is a
 * downstream detail that can change without touching this vocabulary.
 */
export type Representation =
  // physics — mechanics & motion
  | 'vector'
  | 'force_diagram'
  | 'free_body_diagram'
  | 'projectile'
  | 'circular_motion'
  | 'pendulum'
  | 'collision'
  | 'orbit'
  | 'motion_graph'
  // physics — fields, waves, optics, electricity
  | 'circuit'
  | 'ray_optics'
  | 'wave'
  | 'field'
  | 'energy_levels'
  // chemistry
  | 'atom'
  | 'electron_shells'
  | 'molecule'
  | 'bond'
  | 'crystal'
  | 'periodic_trend'
  // biology
  | 'cell'
  | 'dna'
  | 'food_chain'
  | 'water_cycle'
  | 'punnett'
  | 'ecological_pyramid'
  // mathematics
  | 'graph'
  | 'number_line'
  | 'fraction'
  | 'percentage'
  | 'coordinate_system'
  | 'geometry'
  | 'geometric_solid'
  | 'transformation'
  | 'chart'
  | 'probability_tree'
  // computer science
  | 'data_structure'
  | 'algorithm'
  | 'network'
  | 'architecture'
  | 'memory'
  // universal structural archetypes (subject-independent)
  | 'timeline'
  | 'flowchart'
  | 'process'
  | 'hierarchy'
  | 'comparison'
  | 'block_diagram'
  | 'labelled_figure'

/** Which existing renderer draws the payload. No new renderers are introduced. */
export type RendererKind = 'card' | 'spec' | 'scene' | 'ascii'

/**
 * The drawable result. Discriminated by `renderer`, which is exactly the set of
 * render slots LessonScreen already implements — so a decision is renderable by
 * construction, and no client change is required to consume V2.
 */
export type VisualPayload =
  | { renderer: 'card'; visualType: VisualType }
  | { renderer: 'spec'; visualSpec: VisualSpec }
  | { renderer: 'scene'; sceneSpec: SceneSpec }
  | { renderer: 'ascii' }

/**
 * Where the decision came from. Logged verbatim so every visual is auditable.
 *
 *   registry  — a curated concept binding or a canonical scene generator
 *   generated — the Visualization Engine built it for this concept and it
 *               passed semantic validation
 *   archetype — RETIRED as a source (2026-08-08). The Educational Archetype
 *               Engine is no longer consulted by the resolver; the member is
 *               kept so historical logs still parse.
 *   none      — no faithful figure exists; payload is null
 */
export type VisualSource = 'registry' | 'generated' | 'archetype' | 'none'

/**
 * The single answer for the turn. Exactly one payload — it is structurally
 * impossible for two visuals to coexist, which is what retires the old
 * "never two visuals" post-hoc nulling guard.
 */
export interface VisualDecision {
  /** Decided FIRST. */
  purpose: EducationalPurpose
  /** Decided SECOND. Null only when nothing graphical could be chosen. */
  representation: Representation | null
  /**
   * Decided LAST. NULL when no faithful figure exists for this concept.
   *
   * A null payload is a SUCCESSFUL outcome, not a failure: the system has
   * checked its curated bindings and its scene generators, found nothing that
   * honestly depicts this concept, and is declining to substitute something
   * else. Correct explanation with no figure beats a wrong figure explained
   * confidently.
   */
  payload: VisualPayload | null
  /** True only when a faithful payload is attached. The product metric. */
  graphical: boolean
  /** Which layer produced this. */
  source: VisualSource
  /** Human-readable trace, e.g. `registry:phys.meas.vector-addition`. */
  provenance: string
  /** The concept actually being drawn (may differ from the lesson concept). */
  conceptId: string | null
  conceptTitle: string | null
  /**
   * True when the learner asked about a concept other than the current
   * lesson's — a temporary concept excursion. The tutor teaches the requested
   * concept, then returns to the lesson.
   */
  excursion: boolean
  /**
   * The visuals this concept may legally render. Preserves the 2026-08-02
   * canonical-ownership fix: a VISUAL:<type> tag from the model is only
   * honoured if it appears in this set.
   */
  allowed: readonly VisualType[] | null
  /**
   * The visualization surface to persist for the next turn. Null when nothing
   * graphical is on screen. Written to contextSnapshot by the chat route; read
   * back as `activeSession` so the figure survives follow-ups, answers and
   * corrections instead of being re-derived from each message in isolation.
   */
  session: VisualSession | null
  /**
   * Why the figure was held or switched this turn — 'continuity',
   * 'explicit-new-topic-request', 'learner-answering-not-requesting', … Logged
   * so a visual swap is always explainable after the fact.
   */
  continuityReason: string
}

/**
 * The terminal, non-graphical decision: NO FIGURE.
 *
 * Reached when the concept has neither a curated visual binding nor a scene
 * generator — the common case, by design, since only 496 of 1,775 concepts
 * have a faithful figure today. The tutor is told plainly that nothing is on
 * screen and teaches in words.
 */
export function noFigureDecision(
  reason: string,
  conceptId: string | null = null,
  conceptTitle: string | null = null,
  purpose: EducationalPurpose = 'explain',
  /**
   * Excursions survive the absence of a figure. The learner asked about
   * something other than the lesson; that fact still governs what the tutor
   * teaches this turn, whether or not a picture exists to teach it with.
   */
  excursion = false,
): VisualDecision {
  return {
    purpose,
    representation: null,
    payload: null,
    graphical: false,
    source: 'none',
    provenance: `no-figure:${reason}`,
    conceptId,
    conceptTitle,
    excursion,
    allowed: null,
    session: null,
    continuityReason: 'no-figure',
  }
}
