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

import { getConceptVisualType, lookupConceptVisualBinding, getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from './conceptSceneParams'
import { admitVisualAsset, makeVisualAsset, type AssetProvenance, type VisualAsset, type VisualIntent } from './asset'
import { isRetiredVisualBinding } from './retired'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { ARCHETYPES, type ArchetypeContext } from './archetypes'
import { resolveVisualTarget } from './resolveVisualTarget'
import { decideContinuity, parseVisualSession, tickSession, type VisualSession } from './session'
import { noFigureDecision, type EducationalPurpose, type Representation, type VisualDecision } from './types'
import { generateConceptFigure, generateConceptScene, validateGeneratedFigure, type GeneratedFigure } from './visualEngine'
import { resolveServicePolicy, servesImmediately } from './generationPolicy'
import { decideVisualNeed, mayIntroduceFigure } from './visualNeed'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

export type LearnerVisualRequest = 'diagram' | 'real_life_example' | 'explain_differently' | null

export interface ResolveVisualInput {
  /** The learner's raw message this turn. */
  message: string
  /**
   * The concept this turn is TEACHING — the excursion target when one is open,
   * otherwise the lesson's own concept. The visual layer draws what is being
   * taught; it does not decide what that is.
   */
  lessonConceptId: string | null
  /**
   * The lesson owed a return, supplied by the Teaching Engine's excursion
   * state (`teaching/excursion.ts`). Present ONLY while an excursion is open.
   *
   * The visual layer does not compute this and does not end it: excursion
   * lifecycle is the Teaching Engine's, and this is the one value the figure
   * needs from it so a "go back" request knows where back is.
   */
  excursionReturnToConceptId?: string | null
  /**
   * Whether the Teaching Engine considers an excursion open this turn.
   * `false` RELEASES a held excursion figure — when teaching has returned to
   * the lesson, the figure from the detour must not stay on screen. Omitted by
   * callers that have no excursion state, which leaves behaviour unchanged.
   */
  excursionActive?: boolean
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
  // The identity this turn is asking for. Built ONCE, from the resolved target,
  // and compared against whatever asset a tier offers — never recomputed from
  // the asset itself, which would make the comparison a tautology.
  const intent: VisualIntent = {
    conceptId: ctx.conceptId,
    conceptTitle: ctx.title,
    purpose: resolvePurpose(input, 'explain'),
    excursion,
    returnToConceptId,
  }

  /**
   * Offer an asset to the admission gate. An asset that is not admitted is not
   * downgraded, substituted or repaired — the tier simply produced nothing, and
   * the next tier (or NO FIGURE) follows. This is the only path from a tier to
   * a payload.
   */
  const offer = (
    asset: VisualAsset,
    purpose: EducationalPurpose,
    source: VisualDecision['source'],
    allowed: readonly VisualType[] | null,
  ): VisualDecision | null => {
    const admission = admitVisualAsset({ ...intent, purpose }, asset)
    if (!admission.ok) {
      // Auditable, and terminal for this tier.
      return {
        ...noFigureDecision(
          `rejected:${admission.reason}`,
          ctx.conceptId,
          ctx.title,
          purpose,
          excursion,
        ),
        continuityReason,
        session: null,
      }
    }
    const admitted = admission.asset
    return {
      purpose,
      representation: admitted.representation,
      payload: admitted.payload,
      asset: admitted,
      graphical: true,
      source,
      provenance: admitted.assetId,
      conceptId: admitted.conceptId,
      conceptTitle: admitted.conceptTitle,
      excursion,
      allowed,
      continuityReason,
      session: {
        conceptId: admitted.conceptId,
        representation: admitted.representation,
        renderer: admitted.renderer,
        returnToConceptId,
        turns: heldTurns,
      },
    }
  }

  // ── Tier −1: RETIRED BINDINGS ─────────────────────────────────────────────
  // Checked before every tier, so a concept whose asset was found to depict
  // something else cannot be picked up again by a broader rule — the curated
  // row, the domain-prefix rule and the scene generator are all downstream of
  // this line. Returning early is the whole mechanism; see retired.ts for the
  // per-concept audit evidence.
  if (isRetiredVisualBinding(ctx.conceptId)) {
    return {
      ...noFigureDecision('retired-binding', ctx.conceptId, ctx.title, intent.purpose, excursion),
      continuityReason,
      session: null,
    }
  }

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
    // A concept with its own authored parameters owns its figure. A concept
    // that only names a generator KIND is served that kind's shared canonical
    // instance, so its concept-level identity is widened from the kind rather
    // than declared — recorded, not hidden. See asset.ts's module doc.
    const conceptOwned = CONCEPT_SCENE_OVERRIDES.includes(ctx.conceptId)
    const provenance: AssetProvenance = conceptOwned ? 'generator' : 'generator-default'
    return offer(
      makeVisualAsset({
        // The `generator:` prefix is preserved for both so log format and the
        // existing provenance assertions are untouched; the honest distinction
        // lives in `provenance`/`identity`, which is what M3 will query, and is
        // spelled out in the id rather than hidden.
        assetId: conceptOwned
          ? `generator:${ctx.conceptId}:${generatorKind}`
          : `generator:kind-default:${generatorKind}`,
        conceptId: ctx.conceptId,
        conceptTitle: ctx.title,
        // The representation names the KIND of figure. Prefer the concept's own
        // registry visual type when it has one; otherwise read it off the scene
        // the generator actually produced. It used to fall back to a hardcoded
        // 'number_line', which was harmless while every generator-bound concept
        // also had a registry row — and would have introduced the M4 pilot's
        // ray diagrams and wave figures to the tutor as number lines.
        representation: (() => {
          const registryVisual = getConceptVisualType(ctx.conceptId)
          return registryVisual
            ? representationForVisualType(registryVisual)
            : representationForSceneType(generatedScene.sceneType)
        })(),
        payload: { renderer: 'scene', sceneSpec: generatedScene },
        provenance,
      }),
      resolvePurpose(input, 'demonstrate'),
      'registry',
      null,
    )
  }

  // ── Tier 1: curated registry binding ───────────────────────────────────────
  const binding = lookupConceptVisualBinding(ctx.conceptId)
  if (binding) {
    const registryVisual = binding.entry.primary
    // 'exact' means a human wrote a row for THIS concept. 'domain' means a
    // prefix rule matched, so the binding names 'math.arith', not the concept.
    const declared = binding.tier === 'exact'
    return offer(
      makeVisualAsset({
        assetId: declared
          ? `registry:${ctx.conceptId}:${registryVisual}`
          : `registry:domain-default:${binding.scope}:${registryVisual}`,
        conceptId: ctx.conceptId,
        conceptTitle: ctx.title,
        representation: representationForVisualType(registryVisual),
        payload: { renderer: 'card', visualType: registryVisual },
        provenance: declared ? 'curated' : 'domain-default',
      }),
      resolvePurpose(input, 'explain'),
      'registry',
      binding.entry.all ?? [registryVisual],
    )
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
  let liveSession =
    session && typeof session.conceptId === 'string' && contextFor(session.conceptId)
      ? session
      : null

  // The Teaching Engine closed the excursion: the detour's figure is released
  // with it. Without this the learner returns to the lesson while an unrelated
  // figure stays on screen — the same "three things disagree at once" state
  // decideContinuity's visual-request rule was written for, arriving from the
  // teaching side instead of the request side.
  const excursionReleased =
    input.excursionActive === false &&
    liveSession !== null &&
    liveSession.returnToConceptId !== null &&
    liveSession.conceptId !== input.lessonConceptId
  if (excursionReleased) liveSession = null

  // ── DOES A FIGURE HELP ON THIS TURN? ──────────────────────────────────────
  // Asked on the INPUT side, before any tier runs, which is where route.ts's
  // own comment says suppression belongs. It withholds a NEW figure only:
  // with something already on screen, `mayIntroduceFigure` defers to
  // continuity, so an answering learner never has the figure they are looking
  // at taken away mid-thought.
  const need = decideVisualNeed({
    message: input.message,
    learnerRequest: input.learnerRequest,
    remediationTier: input.remediationTier,
    lastAssistantAskedQuestion: lastAsked,
    activeSession: liveSession,
  })
  // The RAW session, not the sanitised one: a figure whose concept has since
  // left the KG was still on the learner's screen, so this is a continuity
  // turn and continuity must be allowed to degrade it to the lesson. Passing
  // liveSession here would let suppression hijack that and return nothing.
  if (!mayIntroduceFigure(need, input.activeSession ?? liveSession)) {
    return {
      ...noFigureDecision(`suppressed:${need.reason}`, null, null, resolvePurpose(input, 'explain'), false),
      continuityReason: `need:${need.need}`,
      session: null,
    }
  }

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

  // The Teaching Engine's excursion state, when the caller has one, is the
  // authority on what the figure is a detour FROM. Derived locally only for
  // callers that supply none (tests, the dev harness, the audits).
  const teachingReturnTo = input.excursionReturnToConceptId ?? null

  if (action.kind === 'hold') {
    const ticked = tickSession(action.session)
    conceptId = ticked.conceptId
    returnToConceptId = teachingReturnTo ?? ticked.returnToConceptId
    heldTurns = ticked.turns
  } else {
    conceptId = action.targetConceptId
    // An excursion begins when the new figure is NOT the lesson's own concept.
    returnToConceptId =
      teachingReturnTo ??
      (conceptId && input.lessonConceptId && conceptId !== input.lessonConceptId
        ? input.lessonConceptId
        : null)
    heldTurns = 0
  }

  // The lesson can move onto the concept the held figure is already showing —
  // the learner navigated there, or the excursion's own topic became the
  // lesson. The excursion is over at that moment. Without this, the decision
  // keeps the stale returnToConceptId and the contract emits "the learner
  // asked about X, which is NOT the current lesson's concept" about the very
  // concept being taught. Found by the 100,000-turn simulation (17 turns).
  //
  // With a Teaching-Engine anchor the same rule holds against THAT anchor: the
  // figure is a detour only while it is not showing the concept it must return
  // to. `lessonConceptId` is the teaching target in that mode, so testing it
  // would compare the target against itself and never fire.
  const returnAnchor = teachingReturnTo ?? input.lessonConceptId
  if (conceptId && conceptId === returnAnchor) returnToConceptId = null

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
 *   2. APPROVED   — a human promoted a generated figure for THIS concept to
 *                   ACTIVE                                         -> use it
 *   3. GENERATED  — the engine builds one for THIS concept and it passes
 *                   semantic validation                            -> use it
 *   4. NONE       — anything else, including every rejection       -> no figure
 *
 * APPROVED sits above GENERATED because a reviewed figure is strictly better
 * evidence than an unreviewed one, and below CURATED because a hand-authored
 * binding is better still. It is also what makes the 'reviewed' policy mean
 * anything: without this tier, approving a DRAFT would move a status column
 * and never reach a learner.
 *
 * A rejected generation is never repaired and never replaced. Continuity is
 * untouched: generation is attempted only on a turn that produced no figure at
 * all, so a held figure can never be overwritten by a generated one.
 */
export async function resolveVisualForTurn(
  input: ResolveVisualInput,
  deps: Parameters<typeof generateConceptScene>[1] & {
    /**
     * Reads the approved figure for a concept. Injected rather than imported
     * so this module stays free of the database — with no reader supplied the
     * tier is simply absent, which is what every test and the dev harness want.
     */
    findApprovedFigure?: (conceptId: string) => Promise<GeneratedFigure | null>
  } = {},
): Promise<VisualDecision> {
  let decision = resolveVisual(input)

  // 1. CURATED — already faithful, nothing to add.
  if (decision.graphical) return decision

  // No concept resolved at all: there is nothing to generate a figure OF.
  if (!decision.conceptId) return decision
  const ctx = contextFor(decision.conceptId)
  if (!ctx) return decision

  /**
   * Turn a figure into this turn's decision, through the SAME admission gate
   * every other tier uses. Shared by APPROVED and GENERATED deliberately: two
   * copies of an admission call is how a second authority starts.
   */
  const serve = (figure: GeneratedFigure, assetId: string): VisualDecision => {
    const representation = figure.kind === 'scene'
      ? representationForSceneType(figure.scene.sceneType)
      : representationForVisualType(figure.spec.type as VisualType)

    const asset = makeVisualAsset({
      assetId,
      conceptId: ctx.conceptId,
      conceptTitle: ctx.title,
      representation,
      payload: figure.kind === 'scene'
        ? { renderer: 'scene', sceneSpec: figure.scene }
        : { renderer: 'spec', visualSpec: figure.spec },
      provenance: 'engine',
    })
    const returnTo = decision.excursion
      ? (input.excursionReturnToConceptId ?? input.lessonConceptId ?? null)
      : null
    const admission = admitVisualAsset(
      {
        conceptId: ctx.conceptId,
        conceptTitle: ctx.title,
        purpose: decision.purpose,
        excursion: decision.excursion,
        returnToConceptId: returnTo,
      },
      asset,
    )
    if (!admission.ok) return { ...decision, provenance: `no-figure:rejected-${admission.reason}` }

    return {
      ...decision,
      representation,
      payload: admission.asset.payload,
      asset: admission.asset,
      graphical: true,
      source: 'generated',
      provenance: admission.asset.assetId,
      session: {
        conceptId: admission.asset.conceptId,
        representation,
        renderer: admission.asset.renderer,
        returnToConceptId: returnTo,
        turns: 0,
      },
    }
  }

  // 2. APPROVED — a human already looked at a figure for this concept and
  //    promoted it. Checked BEFORE generation, so an approved concept costs no
  //    provider call and no on-turn latency, and so a reviewer's decision is
  //    what the learner actually sees.
  //
  //    RE-VALIDATED, NEVER TRUSTED ON APPROVAL ALONE — the same rule the cache
  //    path lives by. Approval is evidence a human once looked at this figure,
  //    not evidence that it still depicts this concept: the KG text may have
  //    changed since, and admission cannot catch that on its own because the
  //    identity it compares is the one this function supplies, which would make
  //    the check a tautology. Measured while building this tier: an approved
  //    figure of photosynthesis was admitted for a linear function.
  if (deps.findApprovedFigure) {
    let approved: GeneratedFigure | null = null
    try {
      approved = await deps.findApprovedFigure(ctx.conceptId)
    } catch {
      // The review queue is not allowed to fail a lesson.
      approved = null
    }
    if (approved) {
      const payload = approved.kind === 'scene' ? approved.scene : approved.spec
      const revalidated = validateGeneratedFigure(payload, ctx)
      if (revalidated.ok) return serve(revalidated.figure, `approved:${ctx.conceptId}`)
      // A figure that no longer matches its concept is NOT repaired and NOT
      // substituted; the turn falls through to generation like any other.
      decision = { ...decision, provenance: `no-figure:approved-${revalidated.reason}` }
    }
  }

  // 3. GENERATED — attempted only here, and only for a turn that would
  //    otherwise show nothing.
  const result = await generateConceptFigure(ctx, { purpose: decision.purpose, ...deps })
  if (!result.ok) {
    // 3. NONE — carry the reason so a rejection is auditable rather than silent.
    return { ...decision, provenance: `no-figure:engine-${result.reason}` }
  }

  // A VALID SCENE IS NOT AUTOMATICALLY A SERVED SCENE.
  //
  // Under the 'reviewed' policy the figure has been generated, validated and
  // written down — and is held until a human promotes it. The learner sees text
  // this turn, which is an ordinary successful outcome of this engine, not a
  // failure. Only 'auto' serves on validation alone.
  // The injected policy is honoured here as well as inside the engine, so a
  // caller has ONE override point rather than two that can disagree.
  if (!servesImmediately(deps.policy ?? resolveServicePolicy(ctx.conceptId))) {
    return { ...decision, provenance: 'no-figure:held-for-review' }
  }

  // The model chose the form; the payload follows it rather than the other way
  // round. A generated spec is admitted exactly like a generated scene.
  //
  // This is also the CACHE boundary: generation may have returned a figure
  // stored under a previous turn's key, so identity is re-checked by the
  // admission gate rather than inherited from the cache lookup. A cache hit is
  // evidence that a figure EXISTS, never evidence that it is this concept's.
  return serve(result.figure, `generated:${ctx.conceptId}:${result.cached ? 'cached' : 'fresh'}`)
}

/**
 * REHYDRATION — the figure that was on screen before the page reloaded.
 *
 * THE DEFECT THIS CLOSES. The figure is delivered once, inside the chat
 * response, and the client hangs it on that message in React state. Nothing
 * about the payload is stored on the message row, and /api/sessions/history
 * cannot return what was never written — so every refresh restored the words
 * and dropped the picture, mid-explanation, with the tutor still talking about
 * "the figure on your screen".
 *
 * The fix is NOT to persist the payload. `resolveVisual` is pure and
 * deterministic — re-deriving a held figure reproduces byte-identical output,
 * which is exactly why continuity stores only the concept's identity. That
 * identity is already persisted, in `contextSnapshot.visualSession`. So the
 * restore is a re-derivation, not a cache read, and it runs through this
 * module's own tiers and the admission gate like any other turn:
 *
 *   persisted identity -> resolveVisual (hold) -> admission -> payload
 *
 * Which is what makes it safe. The browser supplies nothing; a retired
 * binding still yields NO FIGURE, a domain illustration is still scoped as a
 * domain illustration, an id that has left the KG still yields nothing, and a
 * corrupt snapshot is rejected by parseVisualSession before it gets here.
 *
 * Called with an EMPTY message on purpose: there is no learner turn to
 * interpret, so nothing may move the figure. Empty text takes decideContinuity's
 * answer-shaped branch, which HOLDs — the one behaviour a restore wants.
 *
 * Returns null whenever there is no faithful figure to restore, which is a
 * successful outcome and the common one.
 */
export function restoreVisualSession(raw: unknown): VisualDecision | null {
  const session = parseVisualSession(raw)
  if (!session) return null
  const decision = resolveVisual({
    message: '',
    lessonConceptId: session.conceptId,
    // Carried so the restored decision reports the same excursion relationship
    // the live turn did. The Teaching Engine still owns the lifecycle; this
    // reads its recorded anchor and decides nothing about it.
    excursionReturnToConceptId: session.returnToConceptId,
    excursionActive: session.returnToConceptId !== null,
    activeSession: session,
    lastAssistantAskedQuestion: false,
  })
  // An admitted asset or nothing — the same bar the live path clears.
  return decision.graphical && decision.asset ? decision : null
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
