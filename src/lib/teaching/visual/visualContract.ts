/**
 * The Visual Teaching Contract — the prompt block built FROM the decision.
 *
 * This is the inversion that makes V2 work. Previously the prompt asked the
 * model to decide whether a visual existed ("emit the VISUAL:<type> tag if…"),
 * and when the registry had no row it told the model to draw ASCII instead.
 * The model was therefore the last word on whether a learner saw a picture.
 *
 * Now the decision is already made and already attached to the response. The
 * prompt's only job is to tell the model what the learner is about to SEE, so
 * it teaches to that figure instead of describing an imaginary one.
 */

import { clamp } from './conceptText'
import { buildSemanticsBlock } from './visualSemantics'
import type { RequestedVisualForm } from '@/lib/teaching/masteryGate'
import type { EducationalPurpose, Representation, VisualDecision } from './types'

// ── THE FORM THE LEARNER ASKED FOR vs THE FORM ON SCREEN ────────────────────
//
// Measured in production, 2026-08-11, in an Ohm's Law lesson: "Can you graph
// this?" attached the curated `electric_circuit` scene, and so did "show me a
// graph of this", "can you draw a diagram" and "show me an animation" —
// identical figure, four different requests.
//
// The circuit is the RIGHT curated figure for Ohm's Law and it keeps its
// authority: nothing here removes it, replaces it, or reorders a tier. What was
// wrong is that the tutor was then told only "a circuit of Ohm's Law is
// attached" and went on to present it as the graph that had been asked for.
//
// So the mismatch is DECLARED, not resolved. The learner still gets the best
// figure the hierarchy has, and gets told plainly that it is not the form they
// asked for — which is what a teacher with one chart on the wall would say.

/** Representations that ARE a plot of one quantity against another. */
const PLOT_REPRESENTATIONS: ReadonlySet<Representation> = new Set<Representation>([
  'graph', 'chart', 'motion_graph', 'coordinate_system', 'number_line', 'periodic_trend',
])

/** Representations that depict something MOVING. */
const MOTION_REPRESENTATIONS: ReadonlySet<Representation> = new Set<Representation>([
  'projectile', 'circular_motion', 'pendulum', 'collision', 'orbit', 'wave',
  'motion_graph', 'water_cycle', 'process', 'algorithm',
])

/** Does the attached figure satisfy the form the learner named? */
export function figureMatchesRequestedForm(
  representation: Representation | null | undefined,
  form: RequestedVisualForm | null | undefined,
): boolean {
  if (!form) return true                 // nothing specific was asked for
  if (!representation) return false      // unknown form cannot be claimed to match
  return form === 'plot'
    ? PLOT_REPRESENTATIONS.has(representation)
    : MOTION_REPRESENTATIONS.has(representation)
}

const FORM_WORD: Record<RequestedVisualForm, string> = {
  plot: 'a graph — one quantity plotted against another',
  motion: 'an animation — something that moves',
}

const PURPOSE_INSTRUCTION: Record<EducationalPurpose, string> = {
  explain:     'Use the figure to carry the explanation. Point at its parts in the order they matter.',
  compare:     'Use the figure to contrast the two cases. Name what differs and why it matters.',
  demonstrate: 'Walk the learner through the figure step by step. Show, do not define.',
  explore:     'Invite the learner to look at the figure and notice something before you explain it.',
  derive:      'Use the figure to build the result. Let each step follow visibly from the last.',
  simulate:    'Narrate what the figure is doing as it moves. Tie the motion to the underlying rule.',
  review:      'Use the figure to recall what was already learned. Prompt before telling.',
}

/**
 * Build the block injected into the system prompt.
 *
 * Returns '' when there is nothing to say (no decision) so callers can append
 * unconditionally.
 */
export function buildVisualContractBlock(
  decision: VisualDecision | null,
  /**
   * Whether the learner ASKED to be shown something on this turn. Optional, so
   * every existing caller and test is unchanged; supplied by the chat route,
   * which is the only place that knows.
   */
  opts: {
    learnerAskedForAVisual?: boolean
    /**
     * The SPECIFIC form the learner asked for this turn, when they named one.
     * Reported only — it never selects, reorders or vetoes a figure. See the
     * mismatch rule below.
     */
    requestedForm?: RequestedVisualForm | null
  } = {},
): string {
  if (!decision) return ''

  // ── NO FIGURE ─────────────────────────────────────────────────────────────
  // Not an error and not exceptional: most concepts have no curated visual and
  // no scene generator, and the system now declines to substitute a figure of
  // something else rather than letting the model teach against it. The only
  // job here is to make sure the model knows the screen is empty, so it never
  // refers to a figure that does not exist.
  //
  // M2: an ADMITTED ASSET is required, not merely a payload. A decision without
  // one never reaches the tutor as a figure, so "something is on screen" and
  // "the tutor was told about it" cannot come apart.
  if (!decision.graphical || !decision.asset) {
    return (
      '\n\nVISUAL CONTRACT: NO FIGURE IS ATTACHED TO THIS RESPONSE. ' +
      'The learner\'s screen shows your words and nothing else. Teach this ' +
      'concept normally in prose — a clear explanation, an example, a question. ' +
      'RULES: (1) Do NOT say "look at the figure/diagram/image", "as you can ' +
      'see", "on your screen", or anything else implying a picture exists. ' +
      '(2) Do NOT describe arrows, colours, axes, labels or objects as though ' +
      'they were visible. (3) Do NOT promise a diagram you cannot attach. ' +
      '(4) You MAY use ordinary spatial language to build a mental picture ' +
      '("imagine a ball thrown at an angle") — that is describing an idea, not ' +
      'claiming a figure. ' +
      // RULE 5 DEPENDS ON WHETHER THEY ASKED, and until now it did not.
      //
      // "Do not apologise for the absence of a diagram" is right on an
      // ordinary turn and wrong the moment a learner has asked for one.
      // Measured in a real six-turn session: the student asked to be shown a
      // picture twice and received another analogy each time, with no
      // acknowledgement that they had asked for anything. From their side the
      // request simply vanished, which reads as not being listened to.
      //
      // Answering it costs one clause and claims nothing false: the figure is
      // still absent, the explanation still carries the teaching, and the
      // tutor is forbidden — below — from promising one later.
      (opts.learnerAskedForAVisual
        ? '(5) THE LEARNER ASKED TO BE SHOWN SOMETHING AND NO FIGURE IS ' +
          'AVAILABLE THIS TURN. Acknowledge that in ONE short clause before ' +
          'you continue — plainly, without apologising at length and without ' +
          'blaming a system they cannot see ("I can\'t show you a picture of ' +
          'this one, so let me describe it…"). Then give the clearest ' +
          'word-picture you can. Do NOT ignore the request, and do NOT ' +
          'promise a diagram later — you cannot attach one.'
        : '(5) Do not apologise for the absence of a diagram; ' +
          'a clear explanation is the complete answer.') +
      // RULE 6 — THE CONFLICTING INSTRUCTION.
      //
      // Rules 1-3 tell the tutor not to refer to a figure. Another block in
      // the SAME prompt routinely tells it to show one. Blueprints drive the
      // teaching sequence and are written for a human tutor at a whiteboard,
      // so they say things like:
      //
      //   "TA-1 [DEMONSTRATE + EXPLAIN]: Demo 1 (same-molecule three-states
      //    diagram) alongside Explanation A"
      //   "Run Demo 1 (same-molecule three-states diagram)"
      //   "S6 repair path: Draw the particle-size-vs-spacing contrast diagram"
      //
      // Measured 2026-08-14: 231 of the 424 physics and chemistry concepts
      // that have a blueprint instruct a demo or a diagram while the resolver
      // serves NOTHING for them. The majority case is a prompt that says both
      // "show this diagram" and "no figure is attached".
      //
      // Observed live on the real deployed tutor, chem.found.states-of-matter
      // (a RETIRED binding, so no figure was served and this very block WAS
      // injected):
      //
      //   "Looking at the figure on your screen showing the Interconversion of
      //    States of Matter, you can see how a substance moves between solid,
      //    liquid, and gas phases... it reaches the Melting (Heating) step
      //    shown on screen"
      //
      // No such figure exists anywhere in this codebase — the phrase was
      // invented from the concept's own KG description ("interconversion via
      // heating and cooling"). The model resolved the contradiction by
      // fabricating the picture the blueprint asked for.
      //
      // The blueprint is not wrong: describing a demonstration IS good
      // teaching, and stripping demos out of the teaching sequence would throw
      // away the pedagogy to fix the phrasing. What has to be settled, once
      // and deterministically, is which instruction wins about what is ON
      // SCREEN — and that is this block's own subject, so it says so here
      // rather than in a second place.
      ' (6) ANOTHER INSTRUCTION IN THIS PROMPT MAY TELL YOU TO RUN A DEMO, ' +
      'DRAW A DIAGRAM, OR SHOW A FIGURE. Those describe teaching you deliver ' +
      'IN WORDS. This rule wins on the question of what is on screen: carry ' +
      'the demonstration verbally ("picture three boxes, each with the same ' +
      'particles packed differently"), and NEVER say or imply it is displayed.'
    )
  }

  // M2 — IDENTITY COMES FROM THE ASSET, NOT FROM THE REQUEST.
  //
  // This used to read decision.conceptTitle, i.e. the concept that was ASKED
  // FOR. If the attached figure had belonged to anything else, the sentence
  // below would still have named the requested concept and the tutor would have
  // taught the wrong figure under the right name. It now names whatever the
  // admitted asset says it depicts; admission has already guaranteed the two
  // agree, so this is the same string by construction — and it stays the same
  // string only for as long as that guarantee holds, which is the point.
  const asset = decision.asset
  const what = asset.conceptTitle ? `"${clamp(asset.conceptTitle, 60)}"` : 'this concept'
  const lines: string[] = []

  lines.push(
    '\n\nVISUAL CONTRACT: A FIGURE IS ALREADY BEING RENDERED ON THE LEARNER\'S SCREEN.',
  )

  // ── PROVENANCE — curriculum, or a topic raised in conversation ────────────
  // A figure of an off-curriculum topic is a real figure of that topic, so it
  // is NOT scoped down. What it lacks is a curated description behind it: no
  // authored prerequisites, no reviewed wording, no place in the graph. Saying
  // so keeps the tutor from presenting it with the authority of taught
  // material, which is the specific over-claim this provenance exists to stop.
  if (asset.provenance === 'engine-runtime-topic') {
    lines.push(
      'This figure was built for a topic raised in conversation, not one drawn ' +
      'from the curriculum. Teach it normally and describe the figure exactly ' +
      'as faithfully as any other — but do NOT present it as the course\'s own ' +
      'material, do NOT cite it as the syllabus definition, and if the learner ' +
      'needs the authoritative treatment, say it sits outside the curriculum ' +
      'you have been given.',
    )
  }

  // ── SCOPE (M3-B/B4) — what this figure may be CLAIMED to be ───────────────
  // A domain illustration is a real, on-topic picture that does not depict the
  // concept: one bare coordinate plane serves all 76 calculus concepts, one
  // shapes card all 67 geometry concepts. Introducing those as "a figure of
  // <concept>" was the last false claim left in the pipeline. The picture still
  // renders — it is only barred from claiming to be something it is not.
  if (asset.scope === 'domain') {
    lines.push(
      `It is a GENERAL ILLUSTRATION for this topic — NOT a figure of ${what}. ` +
      'Introduce it honestly, in a few words, as a general picture related to ' +
      'the topic, then teach the concept itself in your own words.',
    )
    lines.push(
      `HARD LIMITS: (1) Do NOT say "this diagram shows ${what}", "as you can see ` +
      'in the figure, the concept works like this", or anything else claiming ' +
      'the picture demonstrates the concept. (2) Do NOT read a property, a ' +
      'relationship, a result or a conclusion off it that it does not contain. ' +
      '(3) Do NOT build your explanation on it — it is beside your words, not ' +
      'carrying them. (4) You MAY point at what it genuinely does show, named ' +
      'below, when that helps orient the learner.',
    )
  } else {
    lines.push(
      `A ${asset.representation ?? 'diagram'} of ${what} is attached to THIS response ` +
      'and the learner can see it right now. It was selected by the teaching ' +
      'engine, not by you.',
    )
    lines.push(PURPOSE_INSTRUCTION[decision.purpose])
  }

  // WHAT IS ACTUALLY ON SCREEN. Read off the ADMITTED ASSET's own semantics,
  // which were computed from the payload the client will render — never from
  // the model's imagination, and never recomputed here from a different source.
  // When the asset yields no nameable element the block is empty and rule (4)
  // below degrades to a truthful generic reference rather than an invented one.
  // ── THE FORM THAT WAS ASKED FOR ────────────────────────────────────────────
  // Declared, never resolved: the figure above stays exactly as the hierarchy
  // chose it. This only stops the tutor calling it something it is not.
  if (opts.requestedForm && !figureMatchesRequestedForm(asset.representation, opts.requestedForm)) {
    lines.push(
      `FORM MISMATCH: the learner asked for ${FORM_WORD[opts.requestedForm]}. What is ` +
      `attached is ${asset.representation ? `a ${asset.representation.replace(/_/g, ' ')}` : 'a different kind of figure'}, ` +
      'which is the best figure this topic has. Say so in ONE short clause before ' +
      'you use it ("I don\'t have a graph of this, but here is the circuit it ' +
      'describes…"). Then teach from what IS on screen. Do NOT call it a graph, ' +
      'do NOT describe axes, curves or plotted values it does not have, and do ' +
      'NOT promise the requested form later — you cannot attach one.',
    )
  }

  const semantics = asset.semantics
  const semanticsBlock = buildSemanticsBlock(semantics)
  if (semanticsBlock) lines.push('WHAT THE LEARNER SEES: ' + semanticsBlock)

  // ── ALREADY INTRODUCED ────────────────────────────────────────────────────
  //
  // Everything above tells the tutor what is on screen and instructs it to
  // refer to the figure by its real elements. That is correct — and on a HELD
  // figure it fires again, identically, every turn. Measured across six
  // consecutive production turns on `phys.meas.errors`, five re-described the
  // same figure with its full numeric range:
  //
  //   "Look at the number line on your screen showing the measurement range
  //    from 9.5 to 10.5 with marks at 9.8 and 10.2."
  //   "…just like the spread you see between 9.8 and 10.2 on the number line
  //    on your screen."
  //   "Think about the number line on your screen showing the measurement
  //    range with points at 9.8 and 10.2 around a true value of 10.0."
  //   "Let's look at the number line on your screen showing the measurement
  //    range from 9.5 to 10.5 with points at 9.8 and 10.2."
  //   "…let's test that idea using the number line on your screen where the
  //    measurement range spans from 9.5 to 10.5."
  //
  // Nothing there is false, so no fabrication rule catches it. It is a
  // TEACHING defect: a learner reading at intermediate level spends their
  // limited attention re-reading a description they already have, and a tutor
  // that re-introduces the same picture every turn reads as one that has
  // forgotten it already did.
  //
  // The contract had no notion of a SECOND turn with the same figure. It does
  // now, from state the engine already keeps: `session.turns` is the held
  // count, 0 on the turn a figure first appears.
  const heldTurns = decision.session?.turns ?? 0
  if (heldTurns > 0) {
    lines.push(
      'ALREADY INTRODUCED: the learner has had this figure in front of them ' +
      'for the whole exchange — you introduced it earlier. Do NOT re-introduce ' +
      'or re-describe it, and do NOT restate its ranges, values or labels that ' +
      'you have already given. Point at the ONE part you are using right now, ' +
      'in a few words ("the gap between 9.8 and 10.2"), and spend the rest of ' +
      'the turn on new teaching. The rules above still bind every element you ' +
      'do name.',
    )
  }

  const referenceRule = semantics.elements.length
    ? '(4) Refer to the figure by its REAL elements, named above, and by those ' +
      'only. Never mention a colour, label, axis, arrow or object that is not ' +
      'in that list — if it is not listed, it is not on screen.'
    : '(4) Refer to the figure truthfully but generally ("the figure beside ' +
      'this message shows…"). You do NOT know its individual labels or ' +
      'colours, so name none of them rather than guessing.'

  // ── WHAT MUST NOT BE CLAIMED ───────────────────────────────────────────────
  // The rules above say "name only what is listed". These say what may not be
  // ASSERTED about the things that are listed, which is where the observed
  // drift actually happened: the figure was named correctly and then given
  // properties it does not show. Everything here is derivable from the payload
  // (it either states a number, a mechanism and a unit, or it does not), so
  // this is a boundary on claims, never a scene-specific script.
  const forbidRule =
    '(7) Do NOT state a measurement, a numerical value, a unit, or a named ' +
    'mechanism that the figure does not itself show — no temperatures, no ' +
    'angles in degrees, no speeds, and no molecular or atomic explanation ' +
    'unless the text listed above says so. A shape is a shape: a line is not a ' +
    'bond, a marker is not a particle, and a curve is not data. If the learner ' +
    'asks for a value the figure does not carry, say plainly that this figure ' +
    'shows the relationship rather than the numbers, and teach the relationship.'

  // Hard prohibitions — each one closes a specific observed production failure.
  // Rule (5) differs by scope: a concept figure LEADS the explanation, whereas a
  // general illustration must not, or the tutor ends up teaching from a picture
  // that does not contain the concept.
  const leadRule = asset.scope === 'domain'
    ? '(5) Your WORDS carry this explanation; the picture is beside them, not ' +
      'part of them.'
    : '(5) Keep the words short — the figure leads, the words support it.'
  lines.push(
    'RULES: (1) Do NOT draw an ASCII diagram — a real figure is already ' +
    'displayed and a second one competes with it. (2) Do NOT say "imagine" or ' +
    '"picture in your mind" — they are LOOKING at it. (3) Do NOT promise a ' +
    'diagram in future tense ("here is a diagram I would draw") — it is ' +
    `already there. ${referenceRule} ${leadRule} (6) Do not open with a bare ` +
    '"look at the figure on your screen" — say what in it matters and why. ' +
    forbidRule,
  )

  // ── THE FIGURE'S CONCEPT IS THIS TURN'S SUBJECT ────────────────────────────
  // Observed drift: the tutor described the viscosity figure accurately and
  // then, in the same reply, pivoted to the lesson and asked an SI-Units
  // question. The figure and the question came from two different concepts, so
  // the learner was looking at one thing and being examined on another.
  //
  // The identity here is the ADMITTED ASSET's, which is the same concept the
  // Teaching Engine set as this turn's target — the contract does not choose
  // it and cannot disagree with it.
  lines.push(
    `GROUNDING: everything you say this turn is about ${what}. Any question you ` +
    'ask must be answerable FROM THIS FIGURE — point at the text or the shape ' +
    'that carries the answer. Do not ask about, or pivot to, a different ' +
    'concept while this figure is on screen, however related it seems.',
  )

  // CONTINUITY. The same figure persisting across turns is the normal case in a
  // real lesson: the tutor asks, the learner answers, the tutor corrects — all
  // against ONE diagram. Saying so stops the model from narrating a new figure
  // ("here is another diagram") when nothing on screen actually changed.
  const held = (decision.session?.turns ?? 0) > 0
  if (held) {
    lines.push(
      'CONTINUITY: this is the SAME figure that was already on screen last ' +
      'turn — it has not changed and has not been redrawn. Continue the ' +
      'current explanation against it. Do not re-introduce it, do not ' +
      'announce a new diagram, and do not describe it from scratch.',
    )
  }

  // EXCURSION — FIGURE SCOPE ONLY.
  //
  // This block used to carry the excursion's teaching lifecycle ("keep teaching
  // until they signal they are done, then offer to return"). It sat AFTER the
  // NO-FIGURE early return above, so a concept with no authored figure — most
  // of the curriculum — received no excursion guidance at all, and the tutor
  // drifted back to the lesson inside the same response. That lifecycle now
  // belongs to the EXCURSION DIRECTIVE (teaching/excursion.ts), which is built
  // from the Teaching Engine's own state and is emitted whether or not a figure
  // exists. What remains here is the one thing that is genuinely about the
  // picture: it depicts the side concept, and it does not move while that
  // concept is being taught.
  if (decision.excursion) {
    lines.push(
      `EXCURSION FIGURE: this figure depicts ${what} — the concept the learner ` +
      'asked about, not the lesson\'s own concept. It STAYS on screen through ' +
      'your questions, their answers and any correction, so do not announce a ' +
      'new diagram and do not describe the lesson\'s concept against it. Follow ' +
      'the EXCURSION DIRECTIVE for when the side question ends.',
    )
  }

  return lines.join(' ')
}
