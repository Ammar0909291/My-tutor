/**
 * Response Quality Guard — post-LLM deterministic checks (2026-07-29).
 *
 * Catches production-observed failure modes AFTER the LLM generates a
 * response but BEFORE it reaches the learner:
 *
 *   1. Dead loops: identical or near-identical tutor replies
 *   2. Stalled progress: no lesson-state advancement after N turns
 *   3. Transition recursion: the same transition template repeating
 *   4. Response purpose: every reply must teach/answer/assess/summarize/transition/conclude
 *   5. Intro stall: lesson introduction that never transitions to teaching
 *
 * Pure module: no DB, no I/O. Integrates at the post-processing seam in
 * route.ts, between filler-turn detection and the Output Verifier.
 */

// ── 1 & 6: Response deduplication ─────────────────────────────────────────────

/**
 * Normalize text for similarity comparison: lowercase, collapse whitespace,
 * strip punctuation, remove filler words. Two responses that differ only in
 * punctuation/capitalization/filler are "identical" for loop-detection purposes.
 */
function normalizeForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, '')         // strip code blocks
    .replace(/\[.*?\]/g, '')                // strip bracketed tags
    .replace(/<!--[\s\S]*?-->/g, '')        // strip HTML comments
    .replace(/[^\w\s]/g, ' ')              // strip punctuation
    .replace(/\b(the|a|an|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|can|may|might|shall|must|let|lets|let's|we|you|i|me|my|your|our|this|that|it|so|now|just|very|really|quite|also|too|well|okay|ok|alright|great|good|right|sure|yes|no|oh|um|uh|hmm)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Jaccard similarity on word trigrams — catches near-identical responses
 * that differ by a few substituted words. Threshold 0.7 = ~70% overlap.
 */
function trigramSimilarity(a: string, b: string): number {
  const trigrams = (s: string): Set<string> => {
    const words = s.split(' ').filter(Boolean)
    const set = new Set<string>()
    for (let i = 0; i <= words.length - 3; i++) {
      set.add(words.slice(i, i + 3).join(' '))
    }
    return set
  }
  const tA = trigrams(a)
  const tB = trigrams(b)
  if (tA.size === 0 && tB.size === 0) return 1
  if (tA.size === 0 || tB.size === 0) return 0
  let intersection = 0
  for (const t of tA) if (tB.has(t)) intersection++
  return intersection / (tA.size + tB.size - intersection)
}

export interface DeduplicationResult {
  isDuplicate: boolean
  similarity: number
  matchedTurnIndex: number | null
}

const SIMILARITY_THRESHOLD = 0.70
const EXACT_MATCH_THRESHOLD = 0.95

/**
 * Check if the candidate response is substantially identical to any of
 * the recent assistant messages. Returns the highest-similarity match.
 *
 * @param candidate The new LLM response text
 * @param recentAssistantMessages The last N assistant messages (chronological)
 * @param windowSize How many recent messages to check (default 3)
 */
export function detectDuplicateResponse(
  candidate: string,
  recentAssistantMessages: string[],
  windowSize = 3,
): DeduplicationResult {
  const normCandidate = normalizeForComparison(candidate)
  if (normCandidate.length < 20) {
    return { isDuplicate: false, similarity: 0, matchedTurnIndex: null }
  }

  let maxSim = 0
  let matchIdx: number | null = null

  const window = recentAssistantMessages.slice(-windowSize)
  for (let i = 0; i < window.length; i++) {
    const normPrev = normalizeForComparison(window[i])
    if (normPrev.length < 20) continue

    // Exact normalized match
    if (normCandidate === normPrev) {
      return { isDuplicate: true, similarity: 1.0, matchedTurnIndex: i }
    }

    const sim = trigramSimilarity(normCandidate, normPrev)
    if (sim > maxSim) {
      maxSim = sim
      matchIdx = i
    }
  }

  return {
    isDuplicate: maxSim >= SIMILARITY_THRESHOLD,
    similarity: maxSim,
    matchedTurnIndex: maxSim >= SIMILARITY_THRESHOLD ? matchIdx : null,
  }
}

// ── 2 & 5: Stuck-state recovery ──────────────────────────────────────────────

export interface StuckStateResult {
  isStuck: boolean
  reason: string | null
  recoveryAction: 'pivot_angle' | 'simplify' | 'worked_example' | 'close_concept' | null
}

/**
 * Detect whether the lesson is stuck and prescribe a recovery action.
 * Uses the conversation state's phase counters + recent signal history.
 *
 * @param turnsInPhase How many turns the current phase has lasted
 * @param consecutiveFailures How many consecutive failures
 * @param phase Current teaching phase
 * @param totalTurnsThisLesson Approximate total turns on this concept
 */
export function detectStuckState(
  turnsInPhase: number,
  consecutiveFailures: number,
  phase: string,
  totalTurnsThisLesson: number,
): StuckStateResult {
  // 6+ turns in the same phase without advancement
  if (turnsInPhase >= 6) {
    if (consecutiveFailures >= 3) {
      return {
        isStuck: true,
        reason: `${turnsInPhase} turns in ${phase} with ${consecutiveFailures} consecutive failures`,
        recoveryAction: 'close_concept',
      }
    }
    return {
      isStuck: true,
      reason: `${turnsInPhase} turns in ${phase} without advancement`,
      recoveryAction: 'worked_example',
    }
  }

  // 4+ consecutive failures at any phase
  if (consecutiveFailures >= 4) {
    return {
      isStuck: true,
      reason: `${consecutiveFailures} consecutive failures`,
      recoveryAction: 'simplify',
    }
  }

  // 15+ total turns on a single concept suggests the lesson is dragging
  if (totalTurnsThisLesson >= 15 && turnsInPhase >= 3) {
    return {
      isStuck: true,
      reason: `lesson has taken ${totalTurnsThisLesson} turns with ${turnsInPhase} in current phase`,
      recoveryAction: 'pivot_angle',
    }
  }

  return { isStuck: false, reason: null, recoveryAction: null }
}

/**
 * Build a deterministic recovery block for a stuck state.
 */
export function buildStuckRecoveryBlock(result: StuckStateResult, lessonTitle: string | null): string {
  const concept = lessonTitle ? ` about "${lessonTitle}"` : ''

  switch (result.recoveryAction) {
    case 'close_concept':
      return (
        `\n\nSTUCK-STATE RECOVERY — CLOSE CONCEPT: the lesson${concept} has stalled ` +
        `(${result.reason}). The student is struggling beyond productive difficulty. ` +
        'Do NOT continue asking questions or re-explaining the same way. ' +
        'Instead: (1) validate the effort ("This is genuinely hard — you\'ve been working at it"), ' +
        '(2) give ONE concrete takeaway the student DID understand, ' +
        '(3) suggest coming back to this later with fresh eyes. ' +
        'End with [LESSON_COMPLETE] to advance past the stuck point.'
      )

    case 'simplify':
      return (
        `\n\nSTUCK-STATE RECOVERY — SIMPLIFY: ${result.reason}. ` +
        'The current explanation is not landing. ' +
        'Strip everything back to the simplest possible version: ' +
        '(1) ONE sentence explaining the core idea, ' +
        '(2) ONE concrete everyday example, ' +
        '(3) ask ONE yes/no question to check the simplest version landed. ' +
        'Do NOT add complexity, do NOT re-explain what already failed.'
      )

    case 'worked_example':
      return (
        `\n\nSTUCK-STATE RECOVERY — WORKED EXAMPLE: ${result.reason}. ` +
        'The abstract explanation is not working. Switch to a CONCRETE WORKED EXAMPLE: ' +
        'walk through a specific problem step by step, showing every intermediate result. ' +
        'The student watches you work, then you ask them to do a similar one. ' +
        'Do NOT ask them to generalize yet — just replicate the pattern.'
      )

    case 'pivot_angle':
      return (
        `\n\nSTUCK-STATE RECOVERY — PIVOT: ${result.reason}. ` +
        'Try a COMPLETELY DIFFERENT teaching angle: ' +
        'if you used an analogy, try a concrete numerical example; ' +
        'if you used numbers, try a physical/visual demonstration; ' +
        'if you used definitions, try a story or scenario. ' +
        'Do NOT rephrase the same approach — genuinely change the teaching modality.'
      )

    default:
      return ''
  }
}

// ── 3: Transition template recursion ──────────────────────────────────────────

const TRANSITION_PATTERNS = [
  /\blet'?s?\s+(?:move|go|proceed|continue|dive|jump|look|turn|shift|explore|get\s+started)\b/i,
  /\bnow\s+(?:let'?s|we'?ll|that\s+we)\b/i,
  /\bready\s+to\s+(?:explore|learn|move|dive|start|begin)\b/i,
  /\bshall\s+we\s+(?:begin|start|move|explore|look|dive)\b/i,
]

/**
 * Detect if the response is purely a transition template with no teaching
 * content — e.g. "Let's dive into quantum numbers! Ready to explore?"
 */
export function isTransitionOnly(text: string): boolean {
  const stripped = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()

  // Short response + matches transition pattern + no substantive content
  const words = stripped.split(/\s+/)
  if (words.length > 40) return false

  const hasTransition = TRANSITION_PATTERNS.some(re => re.test(stripped))
  if (!hasTransition) return false

  // Check for substantive content indicators
  const hasFormula = /[=+\-*/^].*\d/.test(stripped) || /\d.*[=+\-*/^]/.test(stripped)
  const hasDefinition = /\b(?:is\s+(?:defined\s+as|the|a|an)|means|refers\s+to|called)\b/i.test(stripped)
  const hasExample = /\b(?:for\s+example|e\.g\.|such\s+as|consider|imagine|suppose|think\s+of)\b/i.test(stripped)

  return !hasFormula && !hasDefinition && !hasExample
}

/**
 * Count how many of the recent assistant messages were transition-only.
 * 2+ consecutive transitions = recursion.
 */
export function detectTransitionRecursion(
  candidate: string,
  recentAssistantMessages: string[],
): boolean {
  if (!isTransitionOnly(candidate)) return false
  // Check if the immediately preceding assistant message was also transition-only
  const last = recentAssistantMessages[recentAssistantMessages.length - 1]
  return last ? isTransitionOnly(last) : false
}

// ── 4: Intro-to-teaching enforcement ──────────────────────────────────────────

const INTRO_ONLY_PATTERNS = [
  /\btoday\s+we'?(?:re|ll)\s+(?:going\s+to\s+)?(?:learn|explore|study|cover|look\s+at|discuss)\b/i,
  /\bwelcome\s+to\b.*\b(?:lesson|topic|chapter|module|unit)\b/i,
  /\bin\s+this\s+(?:lesson|session|module)\b/i,
]

/**
 * Detect if the response is a lesson introduction that doesn't actually
 * start teaching. An intro MUST contain at least one substantive element
 * (a question, a concrete example, a definition) or it stalls the lesson.
 */
export function isStallIntroduction(text: string): boolean {
  const hasIntroPattern = INTRO_ONLY_PATTERNS.some(re => re.test(text))
  if (!hasIntroPattern) return false

  const hasQuestion = text.includes('?')
  const hasConcreteContent = /\b(?:for\s+example|consider|imagine|the\s+key\s+idea|defined\s+as|means\s+that|because|therefore|notice\s+(?:that|how))\b/i.test(text)
  const hasFormula = /[=+\-*/^].*\d/.test(text) || /\d.*[=+\-*/^]/.test(text)

  return !hasQuestion && !hasConcreteContent && !hasFormula
}

// ── 7: Response purpose validation ────────────────────────────────────────────

export type ResponsePurpose =
  | 'teach'       // explains a concept, provides information
  | 'answer'      // responds to a learner question
  | 'assess'      // asks a question to check understanding
  | 'summarize'   // recaps what was covered
  | 'transition'  // bridges between concepts/phases
  | 'conclude'    // wraps up a lesson
  | 'recover'     // handles a stuck/frustrated learner
  | 'none'        // no identifiable teaching purpose

/**
 * Classify the purpose of a tutor response. A response with purpose 'none'
 * is an empty conversational turn that should be replaced.
 */
export function classifyResponsePurpose(text: string): ResponsePurpose {
  const stripped = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()

  if (!stripped || stripped.length < 10) return 'none'

  // Check for conclude markers
  if (/\[LESSON_COMPLETE\]/i.test(text)) return 'conclude'

  // Check for assessment (asks a question)
  if (stripped.includes('?')) {
    // Must be a real question, not a rhetorical "right?"
    const questionSentences = stripped.split(/[.!]\s+/).filter(s => s.includes('?'))
    const substantiveQuestion = questionSentences.some(s =>
      s.length > 15 && !/\b(?:right|okay|ok|yes|no)\s*\?/i.test(s)
    )
    if (substantiveQuestion) return 'assess'
  }

  // Check for teaching content
  const teachIndicators = [
    /\b(?:means|defined\s+as|refers\s+to|is\s+when|is\s+the|are\s+the|is\s+a\b|is\s+an\b)\b/i,
    /\b(?:because|therefore|so\s+that|in\s+order\s+to|this\s+is\s+why)\b/i,
    /\b(?:for\s+example|such\s+as|consider|imagine|suppose|notice\s+(?:that|how))\b/i,
    /\b(?:step\s+\d|first|second|third|next|then|finally)\b/i,
    /\b(?:tells\s+us|shows\s+us|describes|determines|represents|measures|indicates)\b/i,
    /\b(?:called|known\s+as|we\s+call|this\s+means|which\s+means)\b/i,
    /[=+\-*/^].*\d/,  // formulas
    /\b\d+\s*(?:×|÷|[+\-*/=])\s*\d+/,  // calculations
  ]
  if (teachIndicators.some(re => re.test(stripped))) return 'teach'

  // Check for answering a question
  if (/\b(?:great\s+question|good\s+question|to\s+answer\s+your|the\s+reason\s+is|that'?s\s+because)\b/i.test(stripped)) return 'answer'

  // Check for summary
  if (/\b(?:to\s+summarize|in\s+summary|let'?s\s+recap|we'?ve\s+(?:covered|learned|seen)|the\s+key\s+(?:takeaway|point|idea)s?\s+(?:is|are))\b/i.test(stripped)) return 'summarize'

  // Check for recovery language
  if (/\b(?:that'?s\s+okay|no\s+worries|don'?t\s+worry|it'?s\s+(?:fine|alright|okay)|let'?s\s+(?:try|take)\s+(?:a\s+different|another)|step\s+back)\b/i.test(stripped)) return 'recover'

  // Check for transition
  if (TRANSITION_PATTERNS.some(re => re.test(stripped))) return 'transition'

  // If the response has substantial length, it likely teaches even without explicit markers
  if (stripped.split(/\s+/).length >= 25) return 'teach'

  return 'none'
}

// ── Combined guard ────────────────────────────────────────────────────────────

export interface QualityGuardInput {
  candidate: string
  recentAssistantMessages: string[]
  turnsInPhase: number
  consecutiveFailures: number
  phase: string
  totalTurnsThisLesson: number
  lessonTitle: string | null
  isFirstTurn: boolean
}

export interface QualityGuardResult {
  passed: boolean
  replacement: string | null
  violations: string[]
  stuckState: StuckStateResult | null
}

/**
 * Run all quality checks on a candidate response. Returns a replacement
 * response when the original fails critical checks.
 */
export function runQualityGuard(input: QualityGuardInput): QualityGuardResult {
  const violations: string[] = []
  let stuckState: StuckStateResult | null = null

  // 1/6: Duplicate detection
  const dedup = detectDuplicateResponse(
    input.candidate,
    input.recentAssistantMessages,
  )
  if (dedup.isDuplicate) {
    violations.push(`duplicate_response:${dedup.similarity.toFixed(2)}`)
  }

  // 3: Transition recursion
  if (detectTransitionRecursion(input.candidate, input.recentAssistantMessages)) {
    violations.push('transition_recursion')
  }

  // 4: Intro stall (only on first few turns)
  if (input.isFirstTurn && isStallIntroduction(input.candidate)) {
    violations.push('intro_stall')
  }

  // 7: Response purpose
  const purpose = classifyResponsePurpose(input.candidate)
  if (purpose === 'none') {
    violations.push('no_teaching_purpose')
  }

  // 2/5: Stuck state (checked independently — produces a system-prompt block, not a replacement)
  stuckState = detectStuckState(
    input.turnsInPhase,
    input.consecutiveFailures,
    input.phase,
    input.totalTurnsThisLesson,
  )

  // Build replacement if critical violations found
  if (violations.length > 0) {
    const concept = input.lessonTitle ? ` about ${input.lessonTitle}` : ''
    let replacement: string

    if (violations.includes('duplicate_response') || violations.includes('transition_recursion')) {
      replacement =
        `Let me try a different approach${concept}. ` +
        'Instead of repeating myself, here\'s a concrete question: ' +
        'what\'s one specific thing about this topic that feels unclear or surprising to you?'
    } else if (violations.includes('intro_stall')) {
      replacement =
        `Let me jump right in${concept}. ` +
        'Here\'s something interesting to start with — what do you notice about it?'
    } else {
      replacement =
        `Let me make sure we\'re making progress${concept}. ` +
        'What\'s one thing you\'ve understood so far, and one thing that still feels fuzzy?'
    }

    return { passed: false, replacement, violations, stuckState }
  }

  return { passed: true, replacement: null, violations, stuckState }
}
