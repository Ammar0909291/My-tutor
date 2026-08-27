/**
 * Conversation Decision — the "Understand" step that EVERY student message
 * passes through before any teaching decision.
 *
 * Pipeline: Student → Understand → Conversation Decision → Teaching Decision → Renderer
 *
 * The renderer must naturally combine both decisions: acknowledge what the
 * student said FIRST, then execute the teaching action. A response that
 * begins with teaching without acknowledging the student's last message
 * is a production bug.
 *
 * Pure function — no I/O, no side effects, no model calls.
 */

export type ConversationDecisionType =
  | 'CONFUSION'          // student is confused or lost
  | 'REPHRASE_REQUEST'   // student asked to explain differently
  | 'DIRECT_QUESTION'    // student asked a genuine question
  | 'SUCCESS'            // student answered correctly / shows understanding
  | 'FRUSTRATION'        // student is frustrated (distinct from confusion)
  | 'BOREDOM'            // student seems disengaged
  | 'CONFIDENCE'         // student shows growing confidence
  | 'CURIOSITY'          // student is curious, exploring beyond the lesson
  | 'ACKNOWLEDGEMENT'    // bare "ok" / "got it" — no real signal
  | 'TENTATIVE_ANSWER'   // hedged, uncertain answer attempt
  | 'RECOVERY'           // distress — recovery guard handles this
  | 'NEUTRAL'            // no strong conversational signal

export interface ConversationDecision {
  type: ConversationDecisionType
  rendererDirective: string
}

/**
 * IS THE LEARNER CONFUSED, OR ASKING FOR A DIFFERENT ANGLE?
 *
 * This test decides WHICH of the two remediation directives below the model
 * receives, and it was a second, narrower copy of exactly the pattern H1 fixed
 * in masteryGate: it recognised "don't understand" but not "i not understand",
 * "i cannot understand", "i am not getting it". Every learner who wrote their
 * confusion in non-standard English therefore fell through to
 * REPHRASE_REQUEST — "the student asked for a different approach" — when what
 * they had actually said was "I am lost".
 *
 * Widened by the same discipline H1 used: extensions of the alternatives
 * already here, nothing new in kind. Deliberately NOT widened to cover
 * "explain it another way" / "please explain easy" — those really are requests
 * for a different approach, both branches now carry the simplify constraint,
 * and REPHRASE_REQUEST's reading of them is pinned by two existing suites.
 */
const CONFUSION_RE = new RegExp([
  String.raw`\b(?:confused|confusing)\b`,
  String.raw`\bdon'?t\s+(?:understand|get)\b`,
  String.raw`\bnot\s+(?:able\s+to\s+)?understand(?:ing)?\b`,
  String.raw`\b(?:can'?t|cannot|couldn'?t|could\s+not)\s+understand\b`,
  String.raw`\bnot\s+getting\s+(?:it|this|that)\b`,
  String.raw`\bi(?:'?m|\s+am)\s+(?:very\s+|so\s+|really\s+)?weak\s+(?:in|at|with)\b`,
  String.raw`\blost\b`,
  String.raw`\bmakes?\s+no\s+sense\b`,
  String.raw`\bdoesn'?t\s+make\s+sense\b`,
  String.raw`\bwhat\s+do\s+you\s+mean\b`,
  String.raw`\bhuh\b`,
].join('|'), 'i')
const BOREDOM_RE = /\b(boring|bored|when\s+(will|do|does)\s+(we|this)|why\s+do\s+(i|we)\s+(even\s+)?(need|have)\s+to|is\s+this\s+(even\s+)?useful|point\s+of\s+this)\b/i
const CURIOSITY_RE = /\b(what\s+(happens|would\s+happen)\s+if|what\s+about|how\s+does\s+that\s+(relate|connect)|can\s+you\s+(also|show)\s+how|what\s+else|is\s+it\s+true\s+that|does\s+this\s+(also|mean))\b/i

const CONFIDENCE_PHRASES = /\b(oh\s+i\s+(see|get\s+it)|that\s+makes\s+sense|now\s+i\s+(understand|get\s+it)|so\s+it'?s\s+(like|basically)|wait,?\s+(so|is\s+it)|i\s+think\s+i\s+(see|understand|get))\b/i

const TENTATIVE_RE = /\b(maybe|perhaps|i\s+think|i\s+guess|not\s+sure|possibly|probably|is\s+it\s+like)\b/i
const QUESTION_END = /\?\s*$/

function isShortMessage(msg: string): boolean {
  return msg.trim().split(/\s+/).length <= 15
}

export function classifyConversation(
  message: string,
  opts: {
    recoveryKey: string | null
    studentIntent: string
    lastAssistantAskedQuestion: boolean
    lastSignalCorrectness: boolean | null
    hedged: boolean
    helpRequestKind: string | null
  },
): ConversationDecision {
  const trimmed = message.trim()

  if (opts.recoveryKey) {
    return {
      type: 'RECOVERY',
      rendererDirective: 'Recovery guard handles this turn — follow the RECOVERY block.',
    }
  }

  if (opts.studentIntent === 'expressing_distress') {
    return {
      type: 'FRUSTRATION',
      rendererDirective: 'The student is frustrated. Acknowledge it briefly ("I hear you — let\'s try this differently"), then change approach. Never dismiss, never argue.',
    }
  }

  if (opts.helpRequestKind === 'explain_differently' || opts.studentIntent === 'requesting_help') {
    if (CONFUSION_RE.test(trimmed)) {
      return {
        type: 'CONFUSION',
        // ── PHASE H2: THIS DIRECTIVE IS THE WHOLE INSTRUCTION ──────────────
        // On a remediation turn the Brain dispatches ESCALATE_TO_LLM ->
        // executor LLM_OPEN, for which `buildBrainExecutionBlock` returns '';
        // and `buildTeachingStrategyBlock` — whose FOUNDATION_REBUILD lines
        // say "use concrete, everyday examples before introducing formal
        // definitions" and "avoid introducing extension material" — is
        // suppressed while the Brain owns decisions. So this string is the
        // ONLY surviving instruction telling the model how to remediate.
        //
        // It used to say "come at it completely differently … switch method",
        // and said nothing at all about DIFFICULTY. Measured live
        // (chem.thermo.bond-enthalpy, 2026-08-27): the learner wrote "sir i
        // not understand this" and was answered with a Haber-process bond-
        // enthalpy calculation — ΔH, tabulated bond energies, "kinetically
        // unfavourable but thermodynamically driven". Shorter, and harder.
        //
        // The direction of travel is now stated, and it is not invented here:
        // it is FOUNDATION_REBUILD's own authored instruction, transcribed
        // into the block that actually reaches the model.
        rendererDirective: "That previous explanation didn't land. Re-teach the SAME idea differently, more simply: one concrete everyday anchor, plain words, one step. Explain first — never reply with only a question. No new formula; stay on this concept."
      }
    }
    return {
      type: 'REPHRASE_REQUEST',
      // Same constraint, different opening: this learner asked for another
      // route rather than reporting that they are lost, so "a different angle"
      // stays (pinned by conversationReplay/conversationDecision). What is
      // added is the direction: a different angle must be an EASIER one. The
      // old "Never repeat any previous explanation, analogy, or wording"
      // clause is gone — it forbade the first move a human tutor makes, which
      // is to say the same idea again, more plainly.
      rendererDirective: 'The student asked for another approach. Try a different angle — but SIMPLER, never harder: a fresh everyday anchor, plain words. Explain first — never reply with only a question. No new formula; stay on the same concept.'
    }
  }

  if (BOREDOM_RE.test(trimmed)) {
    return {
      type: 'BOREDOM',
      rendererDirective: 'The student is disengaged. Briefly connect this concept to something they care about or find surprising, then continue. Show why it matters through one concrete, vivid example — not a speech about importance.',
    }
  }

  if (CURIOSITY_RE.test(trimmed)) {
    return {
      type: 'CURIOSITY',
      rendererDirective: 'The student is curious — this is the best possible signal. Answer their question directly and enthusiastically right now, then connect it back to the current concept. Never defer or deflect the question.',
    }
  }

  if (opts.lastAssistantAskedQuestion && trimmed.length > 0) {
    if (opts.lastSignalCorrectness === true && !opts.hedged) {
      if (CONFIDENCE_PHRASES.test(trimmed)) {
        return {
          type: 'CONFIDENCE',
          rendererDirective: 'The student is building confidence — they got it right and are connecting ideas. Confirm specifically what they got right ("exactly — that\'s the key insight"), then build on it. Never over-praise.',
        }
      }
      return {
        type: 'SUCCESS',
        rendererDirective: 'Correct answer. Confirm briefly and specifically ("yes — because [reason]"), then advance. Never just say "correct" and move on — name what made the answer right in one clause.',
      }
    }

    if (opts.hedged || TENTATIVE_RE.test(trimmed)) {
      return {
        type: 'TENTATIVE_ANSWER',
        rendererDirective: 'The student is trying but not confident. Ground their attempt ("you\'re on the right track" or "close — let\'s look at it this way") before correcting or confirming. Never ignore the hedging.',
      }
    }

    if (opts.lastSignalCorrectness === false) {
      if (isShortMessage(trimmed) && CONFUSION_RE.test(trimmed)) {
        return {
          type: 'CONFUSION',
          rendererDirective: 'Wrong answer and the student knows they\'re lost. Acknowledge it ("let me back up — that wasn\'t clear enough"), then re-explain with a different method. Never repeat the same explanation.',
        }
      }
      return {
        type: 'NEUTRAL',
        rendererDirective: 'The student\'s answer missed the mark. Acknowledge the effort briefly ("good try"), identify the specific gap without negative labels, then guide toward the right answer. One correction, not a lecture.',
      }
    }
  }

  if (opts.studentIntent === 'asking_question') {
    return {
      type: 'DIRECT_QUESTION',
      rendererDirective: 'The student asked a direct question. Answer it first — completely and concisely — before any teaching move. Never redirect to what you planned to teach instead.',
    }
  }

  if (opts.studentIntent === 'acknowledging') {
    return {
      type: 'ACKNOWLEDGEMENT',
      rendererDirective: 'Bare acknowledgement — the student is following along. Continue naturally at the same energy; no re-explaining, no fanfare.',
    }
  }

  if (CONFUSION_RE.test(trimmed) && isShortMessage(trimmed)) {
    return {
      type: 'CONFUSION',
      rendererDirective: 'The student is confused. Acknowledge it plainly ("let me try a different way"), then change approach completely. Never repeat the same explanation with different words.',
    }
  }

  // A message ending in "?" outside an answer context is a real question,
  // even when the CUE couldn't classify the intent — a human tutor always
  // answers it. Confusion-phrased questions ("huh?", "what do you mean?")
  // are caught above; inside an answer context, "is it 9.8?" stays a
  // tentative answer — also handled above.
  if (QUESTION_END.test(trimmed) && !opts.lastAssistantAskedQuestion) {
    return {
      type: 'DIRECT_QUESTION',
      rendererDirective: 'The student asked a direct question. Answer it first — completely and concisely — before any teaching move. Never redirect to what you planned to teach instead.',
    }
  }

  return {
    type: 'NEUTRAL',
    rendererDirective: 'Continue the conversation naturally. Respond to what the student actually said before teaching.',
  }
}

/**
 * PHASE 3 — THE HEADER CARRIED AN AXIS-1 CLAUSE, AND NOTHING KNEW.
 *
 * MEASURED IN PRODUCTION, not reasoned about. Live run on a CLOSING turn
 * (disposable account, chem.found.pure-substances): arbitration correctly
 * reported `owner: CLOSE`, the TURN DIRECTIVE correctly withheld its phase
 * frame and move, the close block was injected, and the post-model guard
 * withheld the model's question (300 -> 210 chars). The learner was still
 * taught a new oil-and-water example on their way out.
 *
 * The cause is this function's own header: "respond to the student FIRST,
 * **then teach**" is emitted for EVERY conversation type, from a block appended
 * near the very END of the prompt — after the close block, after the
 * now-suppressed turn directive. It is the same defect as the TURN DIRECTIVE's:
 * an Axis-1 instruction, positioned last, structurally unaware of the episode.
 * Phase 3 closed the loudest instance and this one kept speaking.
 *
 * WHAT IS AND IS NOT TOUCHED. `classifyConversation` — the Conversation
 * Understanding Engine itself — is NOT modified: not its types, not its
 * ordering, not one regex, and not one `rendererDirective`. Those describe HOW
 * to acknowledge the learner (Axis 4, REGISTER), they conflict with nothing,
 * and they survive whoever owns the turn. Only the hardcoded trailing clause of
 * the block's header changes, and only when another authority owns the action.
 * The engine decides what to say about the learner's message; it never decided
 * that teaching follows.
 */
export function buildConversationDirective(
  decision: ConversationDecision,
  arbitration?: import('./turnArbitration').TurnArbitration | null,
): string {
  const header = (!arbitration || arbitration.allows('PHASE_FRAME'))
    ? 'CONVERSATION (respond to the student FIRST, then teach):'
    : `CONVERSATION (respond to the student FIRST — then follow the ${arbitration.owner} block above, which owns what happens next this turn):`
  return `${header}\n- ${decision.type}: ${decision.rendererDirective}`
}
