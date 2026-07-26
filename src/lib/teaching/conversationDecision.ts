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

const CONFUSION_RE = /\b(confused|confusing|don'?t\s+(understand|get)|lost|makes?\s+no\s+sense|doesn'?t\s+make\s+sense|what\s+do\s+you\s+mean|huh)\b/i
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
        rendererDirective: 'The previous explanation did not land. Say so plainly ("that explanation clearly wasn\'t working — let me come at it completely differently") then switch method, not just wording.',
      }
    }
    return {
      type: 'REPHRASE_REQUEST',
      rendererDirective: 'The student asked for a different approach. Acknowledge the request briefly ("let me try a completely different angle"), then deliver the new strategy. Never repeat any previous explanation, analogy, or wording.',
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

export function buildConversationDirective(decision: ConversationDecision): string {
  return `CONVERSATION (respond to the student FIRST, then teach):\n- ${decision.type}: ${decision.rendererDirective}`
}
