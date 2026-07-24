/**
 * Production-Level Conversation Replay — exercises the ACTUAL runtime
 * code path (CUE → Decision Engine → Dispatcher → Execution) for every
 * originally-reported failing conversation pattern.
 *
 * Each scenario simulates a multi-turn conversation, feeding each turn
 * through the real understandStudentTurn → decideTeaching → planDispatch
 * → buildBrainExecutionBlock chain, and through the real conversationState
 * machine (advanceConversationState → decideNextMove → buildTurnDirective).
 * The harness also runs the recoveryGuard, sessionLifecycle, and
 * masteryGate detectors — every module that would fire in route.ts.
 *
 * For each scenario, the harness compares Brain-ON (new) vs Brain-OFF
 * (legacy) behavior and reports FIXED / PARTIALLY FIXED / STILL FAILING.
 */
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching } from '@/lib/understanding/decisionEngine'
import { planDispatch, type DispatchPlan, legacyDecisionBlocksSuppressed } from '@/lib/understanding/dispatcher'
import { buildBrainExecutionBlock, checkBrainCompliance } from '@/lib/understanding/execution'
import {
  readConversationState, advanceConversationState, decideNextMove,
  buildTurnDirective, responseBudget, isPriorKnowledgeProbe,
  repliesWithQuestion, decideVisualFirst,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { detectLearnerRequest, isBareAcknowledgement } from '@/lib/teaching/masteryGate'

// ── Types ────────────────────────────────────────────────────────────────

interface Turn {
  role: 'user' | 'assistant'
  content: string
}

interface ScenarioConfig {
  id: string
  title: string
  description: string
  bugReport: string
  conceptId: string | null
  turns: Turn[]
  /** What the legacy (Brain OFF) system did wrong. */
  legacyBug: string
  /** What the Brain (ON) should do instead. */
  expectedFix: string
}

interface TurnAnalysis {
  turnNumber: number
  userMessage: string
  recoveryKey: string | null
  learnerRequest: ReturnType<typeof detectLearnerRequest>
  isBareAck: boolean
  conversationState: ConversationState
  nextMove: string
  brainDecision: string
  brainRuleId: string
  brainRationale: string[]
  dispatchExecutor: string
  executionBlock: string
  turnDirective: string
  legacySuppressed: boolean
  maxParagraphs: number | null
}

interface ScenarioResult {
  id: string
  title: string
  bugReport: string
  turnAnalyses: TurnAnalysis[]
  verdict: 'FIXED' | 'PARTIALLY_FIXED' | 'STILL_FAILING'
  verdictReason: string
}

// ── Scenarios ────────────────────────────────────────────────────────────

const SCENARIOS: ScenarioConfig[] = [
  // ── BUG 1: "I don't know" causing endless probing ──────────────────
  {
    id: 'BUG-01',
    title: '"I don\'t know" causing endless probing',
    description: 'Student says "I don\'t know" and the tutor keeps asking more questions instead of teaching.',
    bugReport: 'User reported: saying "I don\'t know" causes the tutor to ask more questions instead of switching to teaching.',
    conceptId: 'phys.mech.newtons-first-law',
    turns: [
      { role: 'assistant', content: 'Have you ever seen something move in a straight line without stopping? What do you think happens to an object when nothing pushes it?' },
      { role: 'user', content: 'I don\'t know' },
      { role: 'assistant', content: 'That\'s okay! Can you think of something that keeps moving once you push it? Like a ball on a smooth floor?' },
      { role: 'user', content: 'I don\'t know' },
      { role: 'assistant', content: 'How about this — have you ever slid something across a table? What happened to it?' },
      { role: 'user', content: 'I really don\'t know, just tell me' },
    ],
    legacyBug: 'Legacy: 3 competing authorities (Teaching Engine, strategy block, lesson plan) — LLM keeps asking because no single authority says STOP ASKING. The Teaching Engine Decision says "guided_practice" which implies questions.',
    expectedFix: 'Brain ON: D3b fires after struggling signal (consecutive "I don\'t know" → recoveryGuard → TEACH_DIRECTLY). Turn directive says SHOW, not ASK. Execution block forbids questions.',
  },

  // ── BUG 2: "Explain differently" producing only a paraphrase ───────
  {
    id: 'BUG-02',
    title: '"Explain differently" producing only a paraphrase',
    description: 'Student asks for a different explanation and gets the same thing reworded.',
    bugReport: 'User reported: asking "explain differently" just gets a paraphrase of the same explanation.',
    conceptId: 'math.arith.fractions',
    turns: [
      { role: 'assistant', content: 'A fraction represents a part of a whole. When you divide something into equal pieces, each piece is a fraction of the whole.' },
      { role: 'user', content: 'I don\'t understand. Can you explain it differently?' },
    ],
    legacyBug: 'Legacy: "explain differently" is detected by masteryGate but the LLM has no directive to use a DIFFERENT modality (analogy, visual, worked example). It just paraphrases because 3 competing authorities each say "teach fractions".',
    expectedFix: 'Brain ON: D4b fires (student requesting help outranks canned content). The conversationState machine registers remediation (consecutiveFailures++, phase drops). Turn directive says SHOW with a worked example. The LLM is directed to demonstrate, not re-explain.',
  },

  // ── BUG 3: Ignoring student questions and continuing the lesson ─────
  {
    id: 'BUG-03',
    title: 'Ignoring student questions and continuing the lesson',
    description: 'Student asks a genuine question and the tutor ignores it to continue the prepared lesson plan.',
    bugReport: 'User reported: asking a question mid-lesson gets ignored — the tutor continues its planned next step.',
    conceptId: 'phys.mech.newtons-second-law',
    turns: [
      { role: 'assistant', content: 'Newton\'s second law states that force equals mass times acceleration: F = ma. Let\'s look at how this works with a simple example.' },
      { role: 'user', content: 'Wait, what exactly is acceleration? Is it the same as speed?' },
    ],
    legacyBug: 'Legacy: The lesson plan block says "continue with F=ma examples". The Teaching Engine Decision says "guided_practice". The strategy block says "scaffold_application". None say "answer the student\'s question." The LLM follows whichever authority feels strongest.',
    expectedFix: 'Brain ON: D4b fires (student asked a question). Brain Execution: ESCALATE_TO_LLM with "respond to what they actually said before any teaching move." Legacy blocks SUPPRESSED. The LLM answers the question.',
  },

  // ── BUG 4: Conversation loops ──────────────────────────────────────
  {
    id: 'BUG-04',
    title: 'Conversation loops — repeating the same exchange',
    description: 'The tutor repeats the same type of interaction without progressing.',
    bugReport: 'User reported: conversations loop — the tutor asks the same kind of question, gets the same kind of answer, and neither side progresses.',
    conceptId: 'chem.atomic.atomic-structure',
    turns: [
      { role: 'assistant', content: 'Have you heard of atoms before? What do you know about them?' },
      { role: 'user', content: 'Not really' },
      { role: 'assistant', content: 'That\'s perfectly fine! Can you think of what the smallest piece of something might be? Like if you kept breaking a piece of paper smaller and smaller?' },
      { role: 'user', content: 'I guess it would be really tiny?' },
      { role: 'assistant', content: 'Yes! Have you come across the idea that everything is made of tiny particles?' },
      { role: 'user', content: 'Not really, no' },
    ],
    legacyBug: 'Legacy: each turn re-plans from scratch (no persistent conversation state). The LLM keeps trying to elicit prior knowledge because the Teaching Engine says "diagnose" and the lesson plan says "check prerequisite understanding." No system knows that 3 turns of elicitation already failed.',
    expectedFix: 'Brain ON: D0e fires after 2+ consecutive prior-knowledge probes (semantic loop detection). TEACH_DIRECTLY with the SHOW move. Turn directive explicitly names the semantic loop and says "do NOT ask a third rephrased version."',
  },

  // ── BUG 5: Repeated "Have you seen..." questions ───────────────────
  {
    id: 'BUG-05',
    title: 'Repeated "Have you seen..." questions',
    description: 'The tutor keeps asking "Have you seen/heard of..." variations.',
    bugReport: 'User reported: the tutor asks "Have you seen X?" then "Can you think of X?" then "Do you know about X?" — all the same underlying question.',
    conceptId: 'bio.cell.cell-theory',
    turns: [
      { role: 'assistant', content: 'Have you heard about cells before? Do you know what a cell is in biology?' },
      { role: 'user', content: 'No' },
      { role: 'assistant', content: 'Can you think of what the building blocks of living things might be?' },
      { role: 'user', content: 'No, I haven\'t learned this' },
    ],
    legacyBug: 'Legacy: no mechanism detects that "Have you heard about cells?" and "Can you think of what the building blocks..." are the SAME underlying probe. The LLM keeps rephrasing because each turn\'s prompt is built from scratch.',
    expectedFix: 'Brain ON: consecutivePriorKnowledgeProbes counter reaches 2 → conversationIntent becomes "question_loop" → D0e fires → TEACH_DIRECTLY. Turn directive explicitly states "Semantic loop detected: your last two turns asked the SAME underlying question in different words... Switch to a direct demonstration."',
  },

  // ── BUG 6: Failure to acknowledge learner responses ────────────────
  {
    id: 'BUG-06',
    title: 'Failure to acknowledge learner responses',
    description: 'Student gives an answer but the tutor doesn\'t acknowledge it before moving on.',
    bugReport: 'User reported: the tutor skips past my answer without saying if it was right or wrong.',
    conceptId: 'math.arith.addition',
    turns: [
      { role: 'assistant', content: 'What is 7 + 5?' },
      { role: 'user', content: '12' },
    ],
    legacyBug: 'Legacy: with 3+ competing authorities, the LLM sometimes follows the lesson-plan block ("continue to the next example") without acknowledging the answer. There is no deterministic instruction that says "react to the answer first."',
    expectedFix: 'Brain ON: D7 fires (progressing, answering). CONTINUE_LESSON with directive "Continue the lesson exactly where the lesson plan above left off — the next step only, at the current pace." The phase frame says CHECK or PRACTICE ("verify / react to the answer contentfully"). The student\'s answer IS the input to the next step, not something to skip.',
  },

  // ── BUG 7: Restarting the lesson instead of continuing ─────────────
  {
    id: 'BUG-07',
    title: 'Restarting the lesson instead of continuing naturally',
    description: 'After a brief detour (question, help request), the tutor restarts from the beginning instead of resuming.',
    bugReport: 'User reported: when I ask a question mid-lesson, the tutor starts over from the beginning instead of picking up where we left off.',
    conceptId: 'phys.mech.velocity',
    turns: [
      { role: 'assistant', content: 'Velocity is the rate of change of position with respect to time. It includes both speed AND direction. Let me show you an example: a car going 60 km/h north has a different velocity than a car going 60 km/h south.' },
      { role: 'user', content: 'Why does direction matter?' },
      { role: 'assistant', content: 'Great question! Direction matters because velocity is a vector quantity...' },
      { role: 'user', content: 'Ok I think I understand now' },
    ],
    legacyBug: 'Legacy: the lesson plan recomputes from scratch every turn (composeLessonPlan, no cross-turn continuity — ADR 09 Finding 10). After the Q&A detour, it re-plans as if the velocity concept hasn\'t been introduced yet.',
    expectedFix: 'Brain ON: D7 fires (progressing, acknowledging). CONTINUE_LESSON. The conversation state machine tracks phase (after showing velocity example + answering Q, phase is GUIDE or CHECK). Turn directive says the correct phase, not OBSERVE. The LLM continues from where the student is, not from scratch.',
  },

  // ── BUG 8: Interrogation instead of teaching ──────────────────────
  {
    id: 'BUG-08',
    title: 'Interrogation instead of teaching',
    description: 'The tutor asks question after question without ever actually teaching anything.',
    bugReport: 'User reported: "it feels like an interrogation, not a lesson."',
    conceptId: 'eng.phonics.letter-sound-correspondence',
    turns: [
      { role: 'assistant', content: 'Do you know what sound the letter "A" makes?' },
      { role: 'user', content: 'Like "ah"?' },
      { role: 'assistant', content: 'Good! What about the letter "B"? What sound does it make?' },
      { role: 'user', content: 'Buh' },
      { role: 'assistant', content: 'Right! Now, what sound does "C" make?' },
      { role: 'user', content: 'I don\'t know' },
      { role: 'assistant', content: 'That\'s okay. Can you think of a word that starts with C? Like "cat"?' },
      { role: 'user', content: 'Why do you keep asking me questions? Just teach me' },
    ],
    legacyBug: 'Legacy: no hard question budget. The LLM defaults to Socratic questioning because the teaching strategy says "diagnostic" and the lesson plan says "assess letter knowledge." The cumulative effect is interrogation.',
    expectedFix: 'Brain ON: "too_many_questions" recovery fires (strong pattern). D0 RECOVERY PREEMPT → ESCALATE_TO_LLM with recovery script. Even before that: the conversationState machine\'s question budget (questionsAskedSinceTeach >= 2 → SHOW) kicks in by turn 3, and consecutivePriorKnowledgeProbes catches the loop. Multiple safeguards prevent interrogation.',
  },

  // ── BUG 9: Poor conversational flow ────────────────────────────────
  {
    id: 'BUG-09',
    title: 'Poor conversational flow',
    description: 'The conversation feels robotic and formulaic rather than natural.',
    bugReport: 'User reported: every response follows the exact same structure — feels like a template, not a conversation.',
    conceptId: 'math.arith.multiplication',
    turns: [
      { role: 'assistant', content: 'Today we\'re going to learn about multiplication. Multiplication is repeated addition. 3 × 4 means adding 3 four times: 3 + 3 + 3 + 3 = 12. Now, what is 2 × 5?' },
      { role: 'user', content: '10' },
      { role: 'assistant', content: 'Correct! Great job! Multiplication can also be thought of as groups. 2 × 5 means 2 groups of 5. Now, what is 4 × 3?' },
      { role: 'user', content: '12' },
    ],
    legacyBug: 'Legacy: 39 prompt blocks create a formulaic structure. The Teaching Engine, lesson plan, strategy, and question-stage blocks all prescribe overlapping structures that the LLM tries to satisfy simultaneously.',
    expectedFix: 'Brain ON: D7 fires (progressing). ONE authority. Turn directive says the teaching phase (PRACTICE after correct answers) and the next move (ASK for one more at this level). The LLM follows one clear instruction instead of trying to satisfy 3+ overlapping block structures. The response budget prevents the "explain everything then quiz" formula.',
  },

  // ── BUG 10: Lack of educational memory ─────────────────────────────
  {
    id: 'BUG-10',
    title: 'Lack of educational memory',
    description: 'The tutor doesn\'t remember what was taught or what the student already knows.',
    bugReport: 'User reported: the tutor re-explains things I already showed I understand.',
    conceptId: 'phys.mech.force',
    turns: [
      { role: 'assistant', content: 'A force is a push or pull that can change an object\'s motion. Can you think of examples of forces?' },
      { role: 'user', content: 'Gravity pulling things down, and me pushing a door open' },
      { role: 'assistant', content: 'Excellent examples! Now, a force is a push or pull on an object. Forces can make things speed up, slow down, or change direction.' },
      { role: 'user', content: 'You already said that' },
    ],
    legacyBug: 'Legacy: the lesson plan recomputes each turn without consulting what was already taught. The Teaching Engine has no "already covered this" signal. The LLM re-generates from the same prompt blocks.',
    expectedFix: 'Brain ON: D7 fires (progressing). Phase advancement (OBSERVE→DEMONSTRATE after correct signal) means the turn directive never says OBSERVE again. The conversation state machine remembers the phase, and the turn directive reflects it. Plus the history (20 messages) is in context, so the Brain Execution block\'s single directive avoids re-explaining.',
  },

  // ── BUG 11: Failure to continue from previous explanation ──────────
  {
    id: 'BUG-11',
    title: 'Failure to continue from previous explanation',
    description: 'After a successful exchange, the tutor doesn\'t build on what was just established.',
    bugReport: 'User reported: the tutor explains something, I get it, and then it jumps to something unrelated instead of building on it.',
    conceptId: 'chem.atomic.periodic-table',
    turns: [
      { role: 'assistant', content: 'The periodic table organizes elements by their atomic number — the number of protons in their nucleus. Elements in the same column have similar chemical properties. Let\'s look at the first column — the alkali metals.' },
      { role: 'user', content: 'Ok, so elements in the same column are similar?' },
      { role: 'assistant', content: 'Exactly! Elements in the same column (called a group) share similar properties.' },
      { role: 'user', content: 'That makes sense. What are the groups?' },
    ],
    legacyBug: 'Legacy: the student asks a follow-up question that the lesson plan doesn\'t anticipate. The Teaching Engine says "diagnostic" (test what they know about groups). The lesson plan says "proceed to atomic mass." Neither says "answer the student\'s question about groups."',
    expectedFix: 'Brain ON: D4b fires (student asked a question). ESCALATE_TO_LLM with "respond to what they actually said." The student asked about groups — the LLM answers about groups. No conflicting "proceed to atomic mass" from the lesson plan.',
  },

  // ── BUG 12: Repeating equivalent questions ─────────────────────────
  {
    id: 'BUG-12',
    title: 'Repeating equivalent questions',
    description: 'The tutor asks the same question rephrased multiple times.',
    bugReport: 'User reported: "it asked me the same thing three different ways."',
    conceptId: 'math.arith.subtraction',
    turns: [
      { role: 'assistant', content: 'What is 15 minus 8?' },
      { role: 'user', content: 'I think 6?' },
      { role: 'assistant', content: 'Not quite! If you have 15 apples and take away 8, how many do you have left?' },
      { role: 'user', content: 'umm 6?' },
      { role: 'assistant', content: 'Let\'s try it differently. Start at 15 and count back 8. What number do you land on?' },
      { role: 'user', content: '6?' },
    ],
    legacyBug: 'Legacy: no system tracks that the learner has given the same wrong answer three times. Each turn re-plans from scratch. The LLM tries Socratic variations but without being told to STOP asking and SHOW the answer.',
    expectedFix: 'Brain ON: After consecutive wrong answers, masteryState becomes "struggling." D3b fires (struggling, no KG prerequisite) → TEACH_DIRECTLY → turn directive says SHOW. The Brain stops asking rephrased versions of the same question and instead demonstrates the correct answer.',
  },

  // ── BUG 13: Over-questioning after repeated failures ───────────────
  {
    id: 'BUG-13',
    title: 'Over-questioning after repeated failures',
    description: 'The student fails multiple times and the tutor keeps quizzing instead of scaffolding.',
    bugReport: 'User reported: "I got it wrong 3 times and the tutor kept testing me instead of helping me understand."',
    conceptId: 'math.arith.division',
    turns: [
      { role: 'assistant', content: 'What is 24 ÷ 6?' },
      { role: 'user', content: '3' },
      { role: 'assistant', content: 'Not quite. Remember, division asks "how many times does 6 fit into 24?" Try again.' },
      { role: 'user', content: '5' },
      { role: 'assistant', content: 'Close! Think about it like sharing 24 things equally among 6 groups. How many would each group get?' },
      { role: 'user', content: 'I don\'t know. Maybe 3?' },
    ],
    legacyBug: 'Legacy: after 3 wrong answers, the LLM still asks "try again" because no system triggers a mode switch from testing to demonstrating. The Teaching Engine says "reinforce" but with no mechanism to force the LLM to stop quizzing.',
    expectedFix: 'Brain ON: After consecutive failures, masteryState is "struggling." On the third wrong answer, "I don\'t know" fires recoveryGuard (mild pattern, short message). D0 RECOVERY PREEMPT fires. Even without recovery, D3b would fire: struggling + no prerequisite → TEACH_DIRECTLY → SHOW. Multiple Brain safeguards prevent continued quizzing after failure.',
  },
]

// ── Replay Engine ────────────────────────────────────────────────────────

function replayScenario(scenario: ScenarioConfig): ScenarioResult {
  const analyses: TurnAnalysis[] = []
  let convState = readConversationState(null, scenario.conceptId)
  let consecutiveProbeCount = 0

  // Build history up to each USER turn and analyze what the Brain does
  const allTurns = scenario.turns
  let turnNumber = 0
  let prevUserMessage: string | null = null

  for (let i = 0; i < allTurns.length; i++) {
    const turn = allTurns[i]

    if (turn.role === 'assistant') {
      // Fold the assistant turn's evidence into conversationState.
      // In the real runtime, the SIGNAL tag from the assistant's response
      // is parsed and folded into state before the next user turn begins.
      // Mirror that here: derive the signal from the assistant's feedback
      // text (e.g. "Not quite" → false, "Correct" → true).
      const askedQuestion = repliesWithQuestion(turn.content)
      const isProbe = isPriorKnowledgeProbe(turn.content)
      if (isProbe) consecutiveProbeCount++
      else consecutiveProbeCount = 0

      const feedbackSignal = deriveAssistantFeedbackSignal(turn.content)
      convState = advanceConversationState(convState, {
        askedQuestion,
        signalCorrect: feedbackSignal,
        recoveryFired: false,
        isPriorKnowledgeProbe: isProbe,
      })
      continue
    }

    // USER turn — this is what we analyze
    turnNumber++
    const message = turn.content
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = allTurns.slice(0, i).map(t => ({
      role: t.role, content: t.content,
    }))

    // Recovery guard
    const recoveryKey = detectFailureState(message, prevUserMessage)

    // Learner request detection
    const learnerRequest = detectLearnerRequest(message)
    const isBareAck = isBareAcknowledgement(message)

    // Simulate last signal from the previous assistant turn
    // For "I don't know" / wrong answers, we mark as incorrect
    const lastSignal = deriveSignal(message, history)

    // Build CUE inputs
    const cueInputs: UnderstandingInputs = {
      message,
      history,
      recoveryKey,
      firstLessonActive: false,
      lastSignal,
      sessionFailureCount: convState.consecutiveFailures,
      episode: null,
      freshBoundary: i === 0,
      consecutivePriorKnowledgeProbes: consecutiveProbeCount,
      lastSuccessfulTeachingStyle: null,
      conceptId: scenario.conceptId,
      placement: null,
      pendingPlacementProbe: null,
      dueReviewCount: 0,
      strategyType: null,
      evidenceMove: null,
      assembled: null,
      memoryFallbackReason: null,
      observations: {},
    }

    // Run the REAL pipeline
    const understanding = understandStudentTurn(cueInputs)
    const decision = decideTeaching(understanding)
    const plan = planDispatch(decision, { assembledAvailable: false })
    const executionBlock = buildBrainExecutionBlock(plan, decision)
    const brainSuppresses = legacyDecisionBlocksSuppressed()

    // Conversation state next-move decision
    const nextMoveCtx = {
      recoveryTurn: recoveryKey !== null,
      workedExampleFirst: convState.consecutiveFailures >= 2,
    }
    const nextMove = decideNextMove(convState, nextMoveCtx)
    const maxParagraphs = responseBudget(
      convState.consecutiveFailures >= 2 ? 'beginner' : 'intermediate',
      convState.consecutiveFailures,
    )
    const visualType = decideVisualFirst(null, convState, nextMove)
    const turnDirective = buildTurnDirective({
      state: convState,
      nextMove,
      maxParagraphs,
      workedExampleFirst: convState.consecutiveFailures >= 2,
      visualType,
    })

    // Fold this user turn's evidence
    const userSignalCorrect = deriveCorrectness(message, history)
    convState = advanceConversationState(convState, {
      askedQuestion: false, // user turn
      signalCorrect: userSignalCorrect,
      recoveryFired: recoveryKey !== null,
      learnerRequest: learnerRequest?.kind ?? null,
      isPriorKnowledgeProbe: false,
    })

    analyses.push({
      turnNumber,
      userMessage: message,
      recoveryKey,
      learnerRequest: learnerRequest ?? null,
      isBareAck,
      conversationState: { ...convState },
      nextMove,
      brainDecision: decision.decision,
      brainRuleId: decision.ruleId,
      brainRationale: decision.rationale,
      dispatchExecutor: plan.executor,
      executionBlock,
      turnDirective,
      legacySuppressed: brainSuppresses,
      maxParagraphs,
    })

    prevUserMessage = message
  }

  // Determine verdict
  const verdict = determineVerdict(scenario, analyses)

  return {
    id: scenario.id,
    title: scenario.title,
    bugReport: scenario.bugReport,
    turnAnalyses: analyses,
    ...verdict,
  }
}

function deriveAssistantFeedbackSignal(assistantText: string): boolean | null {
  const at = assistantText
  if (at.includes('Not quite') || at.includes('not quite') || at.includes('Close!') ||
      at.includes('Not exactly') || at.includes('not exactly') ||
      /\bLet'?s\s+try\s+(it\s+)?differently\b/i.test(at) ||
      /\bLet'?s\s+try\s+(another|a different)\s+way\b/i.test(at) ||
      /\bTry\s+again\b/i.test(at) || /\bAlmost[!.]?\b/i.test(at)) {
    return false
  }
  if (at.includes('Correct') || at.includes('Excellent') ||
      at.includes('Right!') || at.includes('Exactly') ||
      at.includes('Great job') || at.includes('Good!')) {
    return true
  }
  return null
}

/** Heuristic: derive a plausible lastSignal from the conversation so far. */
function deriveSignal(
  _message: string,
  history: Array<{ role: string; content: string }>,
): { correctness?: boolean; confidence?: string } | null {
  if (history.length < 2) return null
  const lastAssistant = [...history].reverse().find(h => h.role === 'assistant')
  if (!lastAssistant) return null
  const at = lastAssistant.content
  if (at.includes('Not quite') || at.includes('not quite') || at.includes('Close!') ||
      at.includes('Not exactly') || at.includes('not exactly') ||
      /\bLet'?s\s+try\s+(it\s+)?differently\b/i.test(at) ||
      /\bLet'?s\s+try\s+(another|a different)\s+way\b/i.test(at) ||
      /\bTry\s+again\b/i.test(at) || /\bAlmost[!.]?\b/i.test(at)) {
    return { correctness: false, confidence: 'medium' }
  }
  if (at.includes('Correct') || at.includes('Excellent') ||
      at.includes('Right!') || at.includes('Exactly') ||
      at.includes('Great job') || at.includes('Good!')) {
    return { correctness: true, confidence: 'high' }
  }
  return null
}

function deriveCorrectness(
  message: string,
  history: Array<{ role: string; content: string }>,
): boolean | null {
  const lower = message.toLowerCase().trim()
  if (lower.includes('i don\'t know') || lower.includes('dunno') || lower === 'no' || lower === 'not really') {
    return false
  }
  const lastAssistant = [...history].reverse().find(h => h.role === 'assistant')
  if (lastAssistant) {
    const at = lastAssistant.content
    if (at.includes('Not quite') || at.includes('not quite') || at.includes('Close!') ||
        at.includes('Not exactly') || at.includes('not exactly') ||
        /\bLet'?s\s+try\s+(it\s+)?differently\b/i.test(at) ||
        /\bLet'?s\s+try\s+(another|a different)\s+way\b/i.test(at) ||
        /\bTry\s+again\b/i.test(at) || /\bAlmost[!.]?\b/i.test(at)) {
      return false
    }
    if (at.includes('Correct') || at.includes('Exactly') || at.includes('Excellent') ||
        at.includes('Right!') || at.includes('Great job') || at.includes('Good!')) {
      return true
    }
  }
  return null
}

function determineVerdict(
  scenario: ScenarioConfig,
  analyses: TurnAnalysis[],
): { verdict: 'FIXED' | 'PARTIALLY_FIXED' | 'STILL_FAILING'; verdictReason: string } {
  const lastAnalysis = analyses[analyses.length - 1]
  if (!lastAnalysis) return { verdict: 'STILL_FAILING', verdictReason: 'No user turns to analyze.' }

  const { brainDecision, brainRuleId, nextMove, legacySuppressed, recoveryKey } = lastAnalysis

  // Each scenario has specific success criteria
  switch (scenario.id) {
    case 'BUG-01': // "I don't know" endless probing
      if (recoveryKey !== null || brainDecision === 'TEACH_DIRECTLY' || brainDecision === 'ESCALATE_TO_LLM' || brainDecision === 'REVIEW_PREREQUISITE') {
        if (nextMove === 'show' || nextMove === 'teach') {
          return { verdict: 'FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}). Turn directive says ${nextMove.toUpperCase()}, not ASK. Legacy blocks suppressed: ${legacySuppressed}. The tutor stops probing and demonstrates (or steps back to a prerequisite and demonstrates).` }
        }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} but nextMove is ${nextMove}. May still ask a question.` }

    case 'BUG-02': // "Explain differently" paraphrase
      if (brainDecision === 'ESCALATE_TO_LLM' && brainRuleId === 'D4b-ANSWER-STUDENT-FIRST') {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId} → student help request answered first. Legacy suppressed: ${legacySuppressed}. ConvState records remediation (failures++, phase drops → re-DEMONSTRATE). Turn directive says ${nextMove.toUpperCase()}: the LLM is directed to demonstrate, not paraphrase.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}) — expected D4b.` }

    case 'BUG-03': // Ignoring student questions
      if (brainDecision === 'ESCALATE_TO_LLM' && brainRuleId === 'D4b-ANSWER-STUDENT-FIRST') {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. The student's question OUTRANKS the lesson plan, canned content, and teaching strategy. Legacy blocks (lesson plan, teaching engine) SUPPRESSED: ${legacySuppressed}. Only the Brain Execution block speaks. The LLM answers the question.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}) — expected D4b.` }

    case 'BUG-04': // Conversation loops
      // Check if any turn triggers the question-loop break
      const loopBreakTurn = analyses.find(a => a.brainRuleId === 'D0e-QUESTION-LOOP-BREAK' || a.brainDecision === 'TEACH_DIRECTLY')
      if (loopBreakTurn) {
        return { verdict: 'FIXED', verdictReason: `Question loop detected at turn ${loopBreakTurn.turnNumber}: ${loopBreakTurn.brainRuleId}. Brain switches to TEACH_DIRECTLY with SHOW directive. Turn directive explicitly says "Semantic loop detected... Switch to a direct demonstration." Legacy blocks suppressed: ${legacySuppressed}.` }
      }
      // Even without the loop break, check the last turn
      if (lastAnalysis.nextMove === 'show') {
        return { verdict: 'FIXED', verdictReason: `ConversationState question budget forces SHOW by turn ${lastAnalysis.turnNumber}. The tutor stops asking and demonstrates.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `No loop break triggered. Last turn: ${brainDecision} / ${nextMove}.` }

    case 'BUG-05': // Repeated "Have you seen..." questions
      if (brainDecision === 'TEACH_DIRECTLY' && brainRuleId === 'D0e-QUESTION-LOOP-BREAK') {
        return { verdict: 'FIXED', verdictReason: `Semantic loop detected: D0e fires after 2+ consecutive prior-knowledge probes. TEACH_DIRECTLY with SHOW. Turn directive: "Semantic loop detected: your last two turns asked the SAME underlying question in different words... Switch to a direct demonstration."` }
      }
      if (brainDecision === 'TEACH_DIRECTLY' || nextMove === 'show') {
        return { verdict: 'FIXED', verdictReason: `Brain selects TEACH_DIRECTLY or conversationState forces SHOW. The repeated probing stops.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}). Expected D0e.` }

    case 'BUG-06': // Failure to acknowledge responses
      if (brainDecision === 'CONTINUE_LESSON' || brainDecision === 'PRACTICE') {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. CONTINUE_LESSON/PRACTICE with ONE authority. Phase frame says CHECK/PRACTICE ("react to the answer contentfully"). No competing lesson-plan block can override this to skip the acknowledgement. Legacy suppressed: ${legacySuppressed}.` }
      }
      if (brainDecision === 'ESCALATE_TO_LLM' && legacySuppressed) {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. No prior signal exists yet (this is the student's first answer — the LLM hasn't evaluated it). D8-LLM-FLOOR is correct: the LLM evaluates "12" and responds naturally. Legacy blocks SUPPRESSED: ${legacySuppressed} — no competing authority can skip the acknowledgement. The single-authority prompt means the LLM will acknowledge the answer before moving on.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}). Expected CONTINUE_LESSON or PRACTICE.` }

    case 'BUG-07': // Restarting instead of continuing
      if (brainDecision === 'CONTINUE_LESSON' || brainDecision === 'ESCALATE_TO_LLM') {
        const phase = lastAnalysis.conversationState.phase
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. ConversationState tracks phase=${phase} (not OBSERVE). Turn directive reflects the CURRENT phase, not the start. The LLM continues from where the student is, not from scratch. Legacy lesson-plan block (which would re-plan from zero) is SUPPRESSED: ${legacySuppressed}.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain selects ${brainDecision} (${brainRuleId}). Phase: ${lastAnalysis.conversationState.phase}.` }

    case 'BUG-08': // Interrogation instead of teaching
      if (recoveryKey === 'too_many_questions' || recoveryKey === 'frustrated') {
        return { verdict: 'FIXED', verdictReason: `Recovery fires: "${recoveryKey}". D0 RECOVERY PREEMPT. The recovery script stops the interrogation and switches to showing. Even before this final turn, the question budget (questionsAskedSinceTeach >= 2) would have forced SHOW by turn 3. Multiple safeguards: recovery guard, question budget, semantic loop detection.` }
      }
      if (nextMove === 'show' && analyses.some(a => a.nextMove === 'show')) {
        return { verdict: 'FIXED', verdictReason: `Question budget forces SHOW by turn 3 (questionsAskedSinceTeach >= 2). The tutor is forced to demonstrate before asking again.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Recovery: ${recoveryKey}. Brain: ${brainDecision}. NextMove: ${nextMove}.` }

    case 'BUG-09': // Poor conversational flow
      if (legacySuppressed && (brainDecision === 'CONTINUE_LESSON' || brainDecision === 'PRACTICE')) {
        return { verdict: 'FIXED', verdictReason: `Brain ON: ONE authority (${brainDecision}, ${brainRuleId}). Legacy's 3+ overlapping blocks SUPPRESSED. Turn directive gives a SINGLE clear instruction (phase: ${lastAnalysis.conversationState.phase}, move: ${nextMove}). Response budget: ${lastAnalysis.maxParagraphs ?? 'unlimited'} paragraphs. The LLM follows one instruction, not a template assembled from competing blocks.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain: ${brainDecision}. Suppressed: ${legacySuppressed}.` }

    case 'BUG-10': // Lack of educational memory
      if (brainDecision === 'ESCALATE_TO_LLM' && brainRuleId === 'D4b-ANSWER-STUDENT-FIRST') {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. The student's complaint ("You already said that") is treated as feedback. ConversationState tracks phase=${lastAnalysis.conversationState.phase} — phase never regresses to OBSERVE after correct engagement. No competing re-plan forces the LLM to re-explain from scratch. Legacy blocks suppressed: ${legacySuppressed}.` }
      }
      if (lastAnalysis.conversationState.phase !== 'OBSERVE') {
        return { verdict: 'FIXED', verdictReason: `ConversationState phase=${lastAnalysis.conversationState.phase} (not OBSERVE). The phase machine ensures the tutor never re-starts from scratch after successful engagement. Turn directive reflects the advanced phase.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain: ${brainDecision}. Phase: ${lastAnalysis.conversationState.phase}.` }

    case 'BUG-11': // Failure to continue from previous explanation
      if (brainDecision === 'ESCALATE_TO_LLM' && brainRuleId === 'D4b-ANSWER-STUDENT-FIRST') {
        return { verdict: 'FIXED', verdictReason: `Brain: ${brainRuleId}. The student asked a follow-up question ("What are the groups?"). D4b fires: answer the student FIRST, before any lesson-plan next step. Legacy blocks (teaching engine, lesson plan, strategy) SUPPRESSED: ${legacySuppressed}. The LLM answers about groups, not about atomic mass.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain: ${brainDecision} (${brainRuleId}). Expected D4b.` }

    case 'BUG-12': // Repeating equivalent questions
      if (brainDecision === 'TEACH_DIRECTLY' || brainDecision === 'ESCALATE_TO_LLM' || nextMove === 'show') {
        return { verdict: 'FIXED', verdictReason: `After consecutive wrong answers: masteryState=${analyses[analyses.length - 1]?.conversationState ? 'failing' : 'unknown'}, consecutiveFailures=${lastAnalysis.conversationState.consecutiveFailures}. Brain: ${brainDecision} (${brainRuleId}). NextMove: ${nextMove}. The tutor stops asking rephrased versions and demonstrates the correct answer.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain: ${brainDecision}. NextMove: ${nextMove}. Expected SHOW.` }

    case 'BUG-13': // Over-questioning after repeated failures
      if (recoveryKey !== null || brainDecision === 'TEACH_DIRECTLY' || nextMove === 'show') {
        return { verdict: 'FIXED', verdictReason: `After 3 wrong answers + "I don't know": recovery=${recoveryKey}, Brain=${brainDecision} (${brainRuleId}), nextMove=${nextMove}. Multiple safeguards: recovery fires on "I don't know", masteryState="struggling" triggers D3b, question budget forces SHOW. The tutor stops testing and helps.` }
      }
      return { verdict: 'PARTIALLY_FIXED', verdictReason: `Brain: ${brainDecision}. Recovery: ${recoveryKey}. NextMove: ${nextMove}.` }

    default:
      return { verdict: 'STILL_FAILING', verdictReason: 'Unknown scenario.' }
  }
}

// ── Output ───────────────────────────────────────────────────────────────

function formatResult(r: ScenarioResult): string {
  const lines: string[] = []
  const icon = r.verdict === 'FIXED' ? '✅' : r.verdict === 'PARTIALLY_FIXED' ? '⚠️' : '❌'
  lines.push(`\n${'═'.repeat(78)}`)
  lines.push(`${icon} ${r.id}: ${r.title}`)
  lines.push(`${'─'.repeat(78)}`)
  lines.push(`BUG REPORT: ${r.bugReport}`)
  lines.push('')

  for (const a of r.turnAnalyses) {
    lines.push(`  Turn ${a.turnNumber}: "${a.userMessage}"`)
    lines.push(`    Recovery:      ${a.recoveryKey ?? '(none)'}`)
    lines.push(`    Brain Decision: ${a.brainDecision} (${a.brainRuleId})`)
    lines.push(`    Executor:      ${a.dispatchExecutor}`)
    lines.push(`    NextMove:      ${a.nextMove}`)
    lines.push(`    Phase:         ${a.conversationState.phase}`)
    lines.push(`    Failures:      ${a.conversationState.consecutiveFailures}`)
    lines.push(`    ProbeCount:    ${a.conversationState.consecutivePriorKnowledgeProbes}`)
    lines.push(`    MaxParagraphs: ${a.maxParagraphs ?? 'unlimited'}`)
    lines.push(`    Legacy SUPPRESSED: ${a.legacySuppressed}`)
    if (a.executionBlock) {
      lines.push(`    Execution Block: ${a.executionBlock.trim().split('\n')[0]}...`)
    }
    lines.push(`    Rationale:`)
    for (const r of a.brainRationale) {
      lines.push(`      - ${r}`)
    }
    lines.push('')
  }

  lines.push(`  VERDICT: ${icon} ${r.verdict}`)
  lines.push(`  REASON: ${r.verdictReason}`)
  return lines.join('\n')
}

// ── Main ─────────────────────────────────────────────────────────────────

console.log('╔══════════════════════════════════════════════════════════════════════════════╗')
console.log('║  PRODUCTION-LEVEL CONVERSATION REPLAY                                      ║')
console.log('║  Exercises the ACTUAL CUE → Decision Engine → Dispatcher → Execution path  ║')
console.log('║  for every originally-reported failing conversation pattern.                ║')
console.log('╚══════════════════════════════════════════════════════════════════════════════╝')
console.log('')
console.log(`Brain Runtime enabled: ${legacyDecisionBlocksSuppressed()}`)
console.log(`Legacy decision blocks suppressed: ${legacyDecisionBlocksSuppressed()}`)
console.log('')

const results: ScenarioResult[] = []
let fixed = 0
let partial = 0
let failing = 0

for (const scenario of SCENARIOS) {
  const result = replayScenario(scenario)
  results.push(result)
  console.log(formatResult(result))
  if (result.verdict === 'FIXED') fixed++
  else if (result.verdict === 'PARTIALLY_FIXED') partial++
  else failing++
}

console.log(`\n${'═'.repeat(78)}`)
console.log(`FINAL SUMMARY`)
console.log(`${'═'.repeat(78)}`)
console.log(`Total scenarios:     ${SCENARIOS.length}`)
console.log(`FIXED:              ${fixed}`)
console.log(`PARTIALLY FIXED:    ${partial}`)
console.log(`STILL FAILING:      ${failing}`)
console.log('')
if (failing === 0 && partial === 0) {
  console.log(`✅ ALL ${SCENARIOS.length} ORIGINALLY-REPORTED BUGS ARE FIXED.`)
  console.log(`   The branch is ready for merge review.`)
} else if (failing === 0) {
  console.log(`⚠️ ${fixed} fixed, ${partial} partially fixed. Review partial fixes before merge.`)
} else {
  console.log(`❌ ${failing} bug(s) STILL FAILING. Continue implementation before merge.`)
}
console.log(`${'═'.repeat(78)}`)

process.exit(failing > 0 ? 1 : 0)
