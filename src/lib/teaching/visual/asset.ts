/**
 * The Visual Asset identity boundary (M2).
 *
 * M1 established ONE runtime authority and made its failure produce no figure.
 * It did not establish WHO a figure belongs to. The decision carried a
 * `conceptId` and, quite separately, a `payload`, and nothing anywhere checked
 * that the two referred to the same thing. Every layer asserted the binding
 * instead of verifying it — the registry by string prefix, the retired prose
 * pipelines by keyword, the engine by word overlap.
 *
 * This module introduces the smallest thing that can be checked:
 *
 *     VisualIntent  (who we are drawing FOR)
 *          ↓
 *     VisualAsset   (who the figure belongs TO — carried, not inferred)
 *          ↓
 *     admitVisualAsset()   ← the one gate
 *          ↓
 *     renderer + tutor contract, both fed from the SAME admitted asset
 *
 * WHAT M2 DELIBERATELY DOES NOT DO. It does not judge whether a figure is a
 * GOOD depiction of its concept — that is M3, and the previous lexical-overlap
 * experiment showed why it must not be attempted with word matching. M2 answers
 * only: whose asset is this, and is that who we asked for?
 *
 * HONESTY ABOUT DERIVED IDENTITY. Two of the five sources below do not name a
 * concept at all: DOMAIN_VISUALS names a PREFIX ('math.arith'), and a
 * kind-default scene names a GENERATOR ('collision'). Widening either to a
 * concept id is a real inference, so it is recorded as `identity: 'derived'`
 * rather than being quietly presented as a curated binding. M2 admits derived
 * identity — removing it would delete coverage this milestone is explicitly
 * forbidden from touching — but it is now labelled, counted and queryable,
 * which is what makes the M3 audit possible.
 */

import type { VisualPayload, RendererKind, Representation, EducationalPurpose } from './types'
import { describeVisualPayload, type VisualSemantics } from './visualSemantics'
import { scopeForAsset, type VisualScope } from './scope'

/**
 * Where an asset came from, and — read through IDENTITY_STRENGTH below —
 * how strong its claim to a concept is.
 *
 *   curated            an exact CONCEPT_VISUALS row: a human named THIS concept
 *   generator          a CONCEPT_SCENES override: a human named THIS concept
 *                      and authored its parameters
 *   engine             the Visualization Engine generated it FROM this
 *                      concept's own KG title and description
 *   domain-default     a DOMAIN_VISUALS prefix rule matched. The rule names a
 *                      prefix; the concept-level claim is widened from it.
 *   generator-default  the registry bound this concept to a generator KIND, but
 *                      no concept-specific parameters exist, so the figure is
 *                      that kind's shared canonical instance.
 */
export type AssetProvenance =
  | 'curated'
  | 'generator'
  | 'engine'
  /**
   * Generated for a topic the curriculum does not contain — raised in
   * conversation rather than authored into the Knowledge Graph. The figure is
   * still OF that topic (identity is declared, not widened), but the topic
   * itself carries no curated description, prerequisites or place in a graph,
   * and the tutor contract says so rather than letting it be mistaken for
   * curriculum.
   */
  | 'engine-runtime-topic'
  | 'domain-default'
  | 'generator-default'

/** Whether `conceptId` was named at concept level, or widened from a broader rule. */
export type IdentityStrength = 'declared' | 'derived'

export const IDENTITY_STRENGTH: Record<AssetProvenance, IdentityStrength> = {
  'curated': 'declared',
  'generator': 'declared',
  'engine': 'declared',
  'engine-runtime-topic': 'declared',
  'domain-default': 'derived',
  'generator-default': 'derived',
}

/**
 * What the turn is asking for. The identity half of the existing decision,
 * named so it can be compared against an asset instead of assumed to match it.
 */
export interface VisualIntent {
  /** The concept being drawn — the lesson's, or the one the learner named. */
  conceptId: string
  conceptTitle: string
  /** Why we are drawing. Already decided by the resolver from the teaching situation. */
  purpose: EducationalPurpose
  /** True when the target is not the current lesson's concept. */
  excursion: boolean
  /** The lesson concept to come back to, or null when not on an excursion. */
  returnToConceptId: string | null
}

/**
 * A figure plus the identity of the concept it belongs to.
 *
 * `conceptId` is CARRIED, never recomputed at admission time — an identity a
 * checker derives from the request is not an identity, it is a tautology.
 */
export interface VisualAsset {
  /**
   * Stable identifier for the ARTEFACT, which is not always the concept: a
   * domain-default card and a kind-default scene are genuinely shared between
   * concepts, and the id says so ('domain-default:math.arith:number_line').
   * Two concepts showing the same assetId is a fact worth being able to see.
   */
  assetId: string
  /** WHO this asset belongs to. Compared against the intent, never inferred from it. */
  conceptId: string
  /** The concept's title, so the tutor contract names the ASSET's concept. */
  conceptTitle: string
  representation: Representation
  renderer: RendererKind
  payload: VisualPayload
  /** What the renderer will actually draw. Derived from the payload only. */
  semantics: VisualSemantics
  provenance: AssetProvenance
  /** Convenience mirror of IDENTITY_STRENGTH[provenance]; see the module doc. */
  identity: IdentityStrength
  /**
   * What this asset is entitled to CLAIM (M3-B/B4).
   *
   * 'concept' — it depicts this concept; the tutor may teach from it by name.
   * 'domain'  — it is a general illustration related to the topic. It still
   *             renders, but the tutor may not introduce it as a figure OF the
   *             concept. See scope.ts for how this is decided.
   *
   * Identity (`conceptId`) says WHO the asset belongs to; scope says WHETHER it
   * shows them. An asset can be correctly owned and still not depict its owner,
   * which is the case for 372 of the domain-prefix figures.
   */
  scope: VisualScope
}

export type AdmissionRejection =
  | 'missing-identity'
  | 'identity-mismatch'
  | 'renderer-payload-mismatch'
  | 'malformed-payload'

export type AdmissionResult =
  | { ok: true; asset: VisualAsset }
  | { ok: false; reason: AdmissionRejection; detail: string }

/** Build an asset, computing its semantics and identity strength from the payload. */
export function makeVisualAsset(input: {
  assetId: string
  conceptId: string
  conceptTitle: string
  representation: Representation
  payload: VisualPayload
  provenance: AssetProvenance
}): VisualAsset {
  return {
    ...input,
    renderer: input.payload.renderer,
    semantics: describeVisualPayload(input.payload),
    identity: IDENTITY_STRENGTH[input.provenance],
    scope: scopeForAsset(input.provenance, input.conceptId),
  }
}

/**
 * THE admission gate. Nothing may reach a renderer or the tutor contract
 * without passing through here.
 *
 * Rejection is terminal: there is no substitution, no "closest concept", no
 * lexical rescue, no subject-level rescue, no prefix rescue and no archetype
 * rescue. A rejected asset means NO FIGURE, exactly as M1 established.
 *
 * The identity comparison is EXACT STRING EQUALITY on concept ids. It is
 * deliberately not title equality: 'Dynamic Programming' exists in both
 * mathematics and computer science, and two concepts with the same words are
 * not the same concept.
 */
export function admitVisualAsset(intent: VisualIntent, asset: VisualAsset | null): AdmissionResult {
  if (!asset) {
    return { ok: false, reason: 'missing-identity', detail: 'no asset offered' }
  }
  if (!asset.conceptId || !asset.conceptId.trim()) {
    return { ok: false, reason: 'missing-identity', detail: `asset ${asset.assetId} carries no conceptId` }
  }
  if (!intent.conceptId || !intent.conceptId.trim()) {
    return { ok: false, reason: 'missing-identity', detail: 'intent carries no conceptId' }
  }

  // ── The identity rule ──────────────────────────────────────────────────────
  if (asset.conceptId !== intent.conceptId) {
    return {
      ok: false,
      reason: 'identity-mismatch',
      detail: `asset belongs to ${asset.conceptId}, intent is ${intent.conceptId}`,
    }
  }

  // The renderer is the asset's own, never chosen alongside it. A disagreement
  // means the asset was assembled by something that had two opinions.
  if (asset.renderer !== asset.payload.renderer) {
    return {
      ok: false,
      reason: 'renderer-payload-mismatch',
      detail: `asset declares ${asset.renderer}, payload is ${asset.payload.renderer}`,
    }
  }

  if (!isDrawablePayload(asset.payload)) {
    return {
      ok: false,
      reason: 'malformed-payload',
      detail: `${asset.payload.renderer} payload has nothing to draw`,
    }
  }

  return { ok: true, asset }
}

/**
 * Structural floor only — is there anything in the payload at all?
 *
 * Not a semantic check and not a quality check: whether a scene is a GOOD
 * picture of its concept is M3's question, and answering it here with the kind
 * of shallow heuristic that fits in this function is precisely the mistake the
 * lexical gate already made.
 */
function isDrawablePayload(payload: VisualPayload): boolean {
  switch (payload.renderer) {
    case 'card':
      return Boolean(payload.visualType)
    case 'spec':
      return Boolean(payload.visualSpec)
    case 'scene':
      return Boolean(payload.sceneSpec?.steps?.some((s) => (s.objects?.length ?? 0) > 0))
    case 'ascii':
      return false      // retired renderer — never admitted
    default:
      return false
  }
}
