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
 * ASCII is a decision this function returns, not a prompt default someone else
 * falls into. It is reachable only when the concept cannot be identified at all
 * or when every archetype in the ladder declined — both genuinely exceptional.
 *
 * Pure, synchronous, no LLM, no network, no database.
 */

import { getConceptVisualType, lookupConceptVisual } from '@/lib/teaching/visualRegistry'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { ARCHETYPES, renderArchetype, type ArchetypeContext } from './archetypes'
import { conceptRepresentations } from './conceptArchetype'
import { resolveVisualTarget } from './resolveVisualTarget'
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

/**
 * Resolve the turn's visualization.
 *
 * Ladder, highest teaching quality first:
 *   1. REGISTRY   — a curated concept→visual binding exists (hand-verified).
 *   2. ARCHETYPE  — the Educational Archetype Engine, walking the concept's
 *                   ordered representation candidates until one renders.
 *   3. ASCII      — emergency only.
 */
export function resolveVisual(input: ResolveVisualInput): VisualDecision {
  const target = resolveVisualTarget(input.message, input.lessonConceptId, input.subject)

  // No concept in any canonical KG matched — a genuinely off-curriculum ask.
  if (!target) {
    return asciiDecision('no-resolvable-concept', null, null, resolvePurpose(input, 'explain'))
  }

  const ctx: ArchetypeContext = {
    conceptId: target.conceptId,
    title: target.title,
    description: target.description,
    prerequisites: target.prerequisites,
    difficulty: target.difficulty,
  }

  // ── Tier 1: curated registry binding ───────────────────────────────────────
  const registryVisual = getConceptVisualType(target.conceptId)
  if (registryVisual) {
    const entry = lookupConceptVisual(target.conceptId)
    return {
      purpose: resolvePurpose(input, 'explain'),
      representation: representationForVisualType(registryVisual),
      payload: { renderer: 'card', visualType: registryVisual },
      graphical: true,
      source: 'registry',
      provenance: `registry:${target.conceptId}:${registryVisual}`,
      conceptId: target.conceptId,
      conceptTitle: target.title,
      excursion: target.excursion,
      allowed: entry?.all ?? [registryVisual],
    }
  }

  // ── Tier 2: Educational Archetype Engine ───────────────────────────────────
  for (const representation of conceptRepresentations(ctx)) {
    const payload = renderArchetype(representation, ctx)
    if (!payload) continue        // archetype declined — try the next rung
    return {
      purpose: resolvePurpose(input, ARCHETYPES[representation]?.purpose ?? 'explain'),
      representation,
      payload,
      graphical: true,
      source: 'archetype',
      provenance: `archetype:${representation}:${payload.renderer}`,
      conceptId: target.conceptId,
      conceptTitle: target.title,
      excursion: target.excursion,
      allowed: payload.renderer === 'card' ? [payload.visualType] : null,
    }
  }

  // ── Tier 3: ASCII, emergency only ──────────────────────────────────────────
  return asciiDecision(
    'all-archetypes-declined',
    target.conceptId,
    target.title,
    resolvePurpose(input, 'explain'),
  )
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
