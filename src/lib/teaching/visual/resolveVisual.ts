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
 * ASCII is a decision this function returns, not a prompt default someone else
 * falls into. It is reachable only when no concept resolves at all or when
 * every archetype in the ladder declined — both genuinely exceptional.
 *
 * Pure, synchronous, no LLM, no network, no database.
 */

import { getConceptVisualType, lookupConceptVisual, getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene } from './conceptSceneParams'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { ARCHETYPES, renderArchetype, type ArchetypeContext } from './archetypes'
import { conceptRepresentations } from './conceptArchetype'
import { resolveVisualTarget } from './resolveVisualTarget'
import { decideContinuity, tickSession, type VisualSession } from './session'
import { asciiDecision, type EducationalPurpose, type VisualDecision } from './types'

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
    session: partial.graphical && partial.representation
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
  const generatedScene = buildCanonicalScene(generatorKind)
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

  // ── Tier 2: Educational Archetype Engine ───────────────────────────────────
  for (const representation of conceptRepresentations(ctx)) {
    const payload = renderArchetype(representation, ctx)
    if (!payload) continue        // archetype declined — try the next rung
    return finish({
      purpose: resolvePurpose(input, ARCHETYPES[representation]?.purpose ?? 'explain'),
      representation,
      payload,
      graphical: true,
      source: 'archetype',
      provenance: `archetype:${representation}:${payload.renderer}`,
      conceptId: ctx.conceptId,
      conceptTitle: ctx.title,
      excursion,
      allowed: payload.renderer === 'card' ? [payload.visualType] : null,
    })
  }

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
      ...asciiDecision('no-resolvable-concept', null, null, resolvePurpose(input, 'explain')),
      continuityReason: action.reason,
      session: null,
    }
  }

  const ctx = contextFor(conceptId)
  if (!ctx) {
    return {
      ...asciiDecision('concept-not-in-kg', conceptId, null, resolvePurpose(input, 'explain')),
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
    ...asciiDecision('all-archetypes-declined', ctx.conceptId, ctx.title, resolvePurpose(input, 'explain')),
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
