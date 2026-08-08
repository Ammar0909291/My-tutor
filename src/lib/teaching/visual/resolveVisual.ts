/**
 * resolveVisual() — THE visualization authority.
 *
 * One function. One answer. Called ONCE per turn, BEFORE the LLM.
 *
 * This replaces four competing post-LLM pipelines that each generated a
 * candidate visual and then had a downstream guard null whichever ones lost.
 * Under V2 exactly one payload exists by construction, so:
 *
 *   • the "never two visuals" cleanup is unreachable and retired,
 *   • selection no longer depends on evaluation order,
 *   • selection no longer depends on keyword-matching the model's own prose,
 *   • and the model is TOLD what is being rendered rather than being the thing
 *     that decides whether a visual exists.
 *
 * It answers three questions in a fixed order, and the order is the design:
 *
 *   1. CONTINUITY   — is a figure already on screen that should stay there?
 *   2. TARGET       — if not, which concept are we drawing?
 *   3. FIGURE       — purpose → representation → renderer (renderer LAST).
 *
 * NO FIGURE is a decision this function returns, not a prompt default someone
 * else falls into. It is returned whenever the concept has no curated visual
 * binding and no scene generator — which is the majority of the curriculum
 * today, and is the correct answer: a wrong figure explained confidently is
 * worse for a learner than a correct explanation with no figure.
 *
 * Pure, synchronous, no LLM, no network, no database.
 */

import { getConceptVisualType, lookupConceptVisual, getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene } from './conceptSceneParams'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { ARCHETYPES, type ArchetypeContext } from './archetypes'
import { resolveVisualTarget } from './resolveVisualTarget'
import { decideContinuity, tickSession, type VisualSession } from './session'
import { noFigureDecision, type EducationalPurpose, type Representation, type VisualDecision } from './types'
import { generateConceptScene } from './visualEngine'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

export type LearnerVisualRequest = 'diagram' | 'real_life_example' | 'explain_differently' | null

export interface ResolveVisualInput {
  /** The learner's raw message this turn. */
  message: string
  /** The concept of the lesson currently in progress, if any. */
  lessonConceptId: string | null
  /** Subject slug, used only to break ties in concept matching. */
  subject?: string | null
  /** Deterministic learner-request classification from the existing detector. */
  learnerRequest?: LearnerVisualRequest
  /** Remediation attempts so far — drives purpose, not representation. */
  remediationTier?: number
  /** The figure currently on the learner's screen, from contextSnapshot. */
  activeSession?: VisualSession | null
  /**
   * Whether the tutor's previous turn ended in a question. A short reply to a
   * question is an ANSWER, and an answer must never move the figure.
   */
  lastAssistantAskedQuestion?: boolean
}

/**
 * PURPOSE IS DECIDED FIRST, from the teaching situation — never from which
 * component happens to be available. A learner who asked to SEE something is
 * being shown a demonstration; a learner on their third failed attempt is being
 * shown a re-representation.
 */
function resolvePurpose(
  input: ResolveVisualInput,
  archetypeDefault: EducationalPurpose,
): EducationalPurpose {
  if (input.learnerRequest === 'diagram') return 'demonstrate'
  if (input.learnerRequest === 'explain_differently') return 'explain'
  if ((input.remediationTier ?? 0) >= 3) return 'demonstrate'
  return archetypeDefault
}

function contextFor(conceptId: string): ArchetypeContext | null {
  const node = getKGNode(conceptId)
  if (!node) return null
  return {
    conceptId,
    title: node.title,
    description: node.description ?? '',
    prerequisites: node.prerequisites ?? [],
    difficulty: node.difficulty,
  }
}

/**
 * Build the figure for one concept. Deterministic, so re-deriving it on a held
 * turn reproduces byte-identical output — which is what lets continuity be
 * stateless about the payload itself and store only the concept's identity.
 */
function buildDecision(
  ctx: ArchetypeContext,
  input: ResolveVisualInput,
  excursion: boolean,
  returnToConceptId: string | null,
  continuityReason: string,
  heldTurns: number,
): VisualDecision | null {
  const finish = (
    partial: Omit<VisualDecision, 'session' | 'continuityReason'>,
  ): VisualDecision => ({
    ...partial,
    continuityReason,
    session: partial.graphical && partial.representation && partial.payload
      ? {
          conceptId: ctx.conceptId,
          representation: partial.representation,
          renderer: partial.payload.renderer,
          returnToConceptId,
          turns: heldTurns,
        }
      : null,
  })

  // ── Tier 0: registry-named DETERMINISTIC SCENE GENERATOR ──────────────────
  // visualRegistry has recorded a concept→generator binding for 60 concepts
  // since long before V2, and getConceptSceneGenerator() had ZERO production
  // callers — the binding existed, the generator existed, and nothing ever
  // joined them. This is that join.
  //
  // Ranked ABOVE the generic VisualCard because a generator's output is
  // parameter-driven and concept-specific (it prints the actual resultant,
  // the actual angle sum, the actual total resistance), where the card is one
  // fixed illustration reused across every concept that names it. No LLM: the
  // parameter EXTRACTORS are what needed a model, and canonical parameters
  // replace them entirely.
  const generatorKind = getConceptSceneGenerator(ctx.conceptId)
  // Concept first, generator kind second — a shared generator must still draw
  // THIS concept's case (reflection is a mirror, not a lens).
  const generatedScene = buildCanonicalScene(generatorKind, ctx.conceptId)
  if (generatedScene) {
    return finish({
      purpose: resolvePurpose(input, 'demonstrate'),
      representation: representationForVisualType(getConceptVisualType(ctx.conceptId) ?? 'number_line'),
      payload: { renderer: 'scene', sceneSpec: generatedScene },
      graphical: true,
      source: 'registry',
      provenance: `generator:${ctx.conceptId}:${generatorKind}`,
      conceptId: ctx.conceptId,
      conceptTitle: ctx.title,
      excursion,
      allowed: null,
    })
  }

  // ── Tier 1: curated registry binding ───────────────────────────────────────
  const registryVisual = getConceptVisualType(ctx.conceptId)
  if (registryVisual) {
    const entry = lookupConceptVisual(ctx.conceptId)
    return finish({
      purpose: resolvePurpose(input, 'explain'),
      representation: representationForVisualType(registryVisual),
      payload: { renderer: 'card', visualType: registryVisual },
      graphical: true,
      source: 'registry',
      provenance: `registry:${ctx.conceptId}:${registryVisual}`,
      conceptId: ctx.conceptId,
      conceptTitle: ctx.title,
      excursion,
      allowed: entry?.all ?? [registryVisual],
    })
  }

  // ── NO TIER 2 ─────────────────────────────────────────────────────────────
  // The Educational Archetype Engine used to sit here and guarantee a figure
  // for every concept. It is deliberately NOT consulted any more, because what
  // it produced was a figure of the concept's SHAPE, not of the concept:
  //
  //   phys.therm.calorimetry      -> "3D Data Visualization" stock card
  //   eng.phonics.phonemic-awareness -> "Wave Function psi(x)" — a child
  //                                  learning letter sounds was shown a
  //                                  quantum wavefunction, because the
  //                                  keyword table matched "sound"/"wave"
  //   phys.therm.first-law        -> a DNA-style node-and-path scene labelled
  //                                  with fragments of its own description
  //
  // Those figures then went to the model under a contract asserting a correct
  // figure was on screen, which is how the tutor came to describe an incident
  // ray, a reflected ray and a normal line against a triangle and a circle.
  //
  // The engine itself is untouched and still unit-tested; it is simply no
  // longer an authority on what a learner sees. Returning null here is a
  // SUCCESSFUL outcome: no faithful figure exists, so none is attached.
  return null
}

/** Resolve the turn's visualization. */
export function resolveVisual(input: ResolveVisualInput): VisualDecision {
  const session = input.activeSession ?? null
  const lastAsked = input.lastAssistantAskedQuestion ?? false

  // ── 1. What did the learner name this turn (if anything)? ─────────────────
  const target = resolveVisualTarget(input.message, input.lessonConceptId, input.subject)
  const requestedConceptId = target?.origin === 'learner-request' ? target.conceptId : null

  // ── 2. Does the figure already on screen survive this turn? ───────────────
  // A held figure whose concept has left the Knowledge Graph (renamed or
  // deleted between sessions — contextSnapshot outlives KG edits) would be
  // held anyway and then fail the KG lookup below, spending a turn on ASCII
  // that names a concept which no longer exists. Drop it up front so the
  // learner gets the lesson's own figure instead.
  // The typeof guard also makes this total for a session that bypassed
  // parseVisualSession with a non-string conceptId — getKGNode would throw.
  const liveSession =
    session && typeof session.conceptId === 'string' && contextFor(session.conceptId)
      ? session
      : null

  const action = decideContinuity({
    session: liveSession,
    message: input.message,
    lessonConceptId: input.lessonConceptId,
    requestedConceptId,
    lastAssistantAskedQuestion: lastAsked,
    visualRequested: input.learnerRequest === 'diagram',
  })

  let conceptId: string | null
  let returnToConceptId: string | null
  let heldTurns: number

  if (action.kind === 'hold') {
    const ticked = tickSession(action.session)
    conceptId = ticked.conceptId
    returnToConceptId = ticked.returnToConceptId
    heldTurns = ticked.turns
  } else {
    conceptId = action.targetConceptId
    // An excursion begins when the new figure is NOT the lesson's own concept.
    returnToConceptId =
      conceptId && input.lessonConceptId && conceptId !== input.lessonConceptId
        ? input.lessonConceptId
        : null
    heldTurns = 0
  }

  if (!conceptId) {
    return {
      ...noFigureDecision('no-resolvable-concept', null, null, resolvePurpose(input, 'explain')),
      continuityReason: action.reason,
      session: null,
    }
  }

  const ctx = contextFor(conceptId)
  if (!ctx) {
    return {
      ...noFigureDecision('concept-not-in-kg', conceptId, null, resolvePurpose(input, 'explain')),
      continuityReason: action.reason,
      session: null,
    }
  }

  // ── 3. Draw it ────────────────────────────────────────────────────────────
  const decision = buildDecision(
    ctx,
    input,
    returnToConceptId !== null,
    returnToConceptId,
    action.reason,
    heldTurns,
  )
  if (decision) return decision

  return {
    ...noFigureDecision(
      'no-faithful-visual',
      ctx.conceptId,
      ctx.title,
      resolvePurpose(input, 'explain'),
      returnToConceptId !== null,
    ),
    continuityReason: action.reason,
    session: null,
  }
}

/**
 * Best-effort reverse lookup so a registry-sourced decision still carries a
 * teaching-language representation. Advisory only — it never affects rendering.
 */
function representationForVisualType(visualType: VisualType) {
  for (const archetype of Object.values(ARCHETYPES)) {
    if (archetype.card === visualType) return archetype.representation
  }
  return 'labelled_figure' as const
}

/**
 * THE AUTHORITY for a turn, including runtime generation.
 *
 * resolveVisual() above stays pure and synchronous: it is the decision, and it
 * is what the 1,775-concept audits and every determinism test call. This is the
 * same decision plus the one step that cannot be synchronous — asking the
 * Visualization Engine to build a figure for a concept that has no curated one.
 *
 * The order is the architecture and there is no fourth branch:
 *
 *   1. CURATED    — a concept generator or curated binding exists  -> use it
 *   2. GENERATED  — the engine builds one for THIS concept and it passes
 *                   semantic validation                            -> use it
 *   3. NONE       — anything else, including every rejection       -> no figure
 *
 * A rejected generation is never repaired and never replaced. Continuity is
 * untouched: generation is attempted only on a turn that produced no figure at
 * all, so a held figure can never be overwritten by a generated one.
 */
export async function resolveVisualForTurn(
  input: ResolveVisualInput,
  deps: Parameters<typeof generateConceptScene>[1] = {},
): Promise<VisualDecision> {
  const decision = resolveVisual(input)

  // 1. CURATED — already faithful, nothing to add.
  if (decision.graphical) return decision

  // No concept resolved at all: there is nothing to generate a figure OF.
  if (!decision.conceptId) return decision
  const ctx = contextFor(decision.conceptId)
  if (!ctx) return decision

  // 2. GENERATED — attempted only here, and only for a turn that would
  //    otherwise show nothing.
  const result = await generateConceptScene(ctx, { purpose: decision.purpose, ...deps })
  if (!result.ok) {
    // 3. NONE — carry the reason so a rejection is auditable rather than silent.
    return { ...decision, provenance: `no-figure:engine-${result.reason}` }
  }

  const representation = representationForSceneType(result.scene.sceneType)
  return {
    ...decision,
    representation,
    payload: { renderer: 'scene', sceneSpec: result.scene },
    graphical: true,
    source: 'generated',
    provenance: `generated:${ctx.conceptId}:${result.cached ? 'cached' : 'fresh'}`,
    session: {
      conceptId: ctx.conceptId,
      representation,
      renderer: 'scene',
      returnToConceptId: decision.excursion ? (input.lessonConceptId ?? null) : null,
      turns: 0,
    },
  }
}

/**
 * A generated scene declares its own sceneType; this maps that to the teaching
 * vocabulary the contract speaks. Honest and coarse on purpose — it names the
 * KIND of figure, never a claim about its contents.
 */
function representationForSceneType(sceneType: SceneSpec['sceneType']): Representation {
  switch (sceneType) {
    case 'process':    return 'process'
    case 'comparison': return 'comparison'
    case 'plot':       return 'graph'
    default:           return 'labelled_figure'
  }
}
