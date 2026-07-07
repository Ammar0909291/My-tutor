/**
 * Interactive Worked Examples (Sprint CH).
 *
 * Turns passive "here is the full solution" tutoring into collaborative
 * solving: the tutor leads the student through ONE step at a time, asking
 * what to do next and waiting for the student's answer before continuing.
 *
 * This is a prompt-engineering layer — the LLM conducts the interaction.
 * Session memory persists the active example via a lightweight tag the
 * tutor emits ([WE:concept|step|total] or [WE:done]), parsed server-side
 * (same pattern as Sprint BW visual tags). No new tables.
 *
 * Adapts step granularity to coaching mode:
 *   guided   → many small steps
 *   standard → moderate steps
 *   advanced → fewer, larger steps
 *
 * Understanding checks reuse Sprint BS — this never creates a second
 * checkpoint system.
 */

import type { DifficultyMode } from '@/lib/school/adaptive/learningProfile'

export interface WorkedExample {
  concept: string
  stepCount: number
  currentStep: number
  nextQuestion: string | null
  expectedStudentAction: string | null
}

/** Per-subject keyword patterns that signal a "solve this with me" intent. */
const SOLVE_INTENT_KEYWORDS = [
  'how do i solve', 'how do i find', 'how to solve', 'how to find',
  'solve this', 'solve for', 'work this out', 'work out',
  'help me solve', 'help me with this', 'can you solve',
  'how do you do', 'how do i do', 'how do i calculate', 'calculate',
  'simplify', 'evaluate', 'find the value', 'find x', 'what is the answer',
  'step by step', 'walk me through', 'show me how',
  // English / Social Science correction & construction intents
  'correct this', 'correct the', 'fix this', 'fix the', 'rewrite', 'rearrange',
  'is this correct', 'what is wrong with', "what's wrong with", 'improve this',
]

/** Subjects (and the kinds of problems) where worked examples apply. */
const WORKED_EXAMPLE_SUBJECTS: Record<string, string[]> = {
  mathematics: ['arithmetic', 'fractions', 'percentages', 'algebra', 'geometry'],
  science: ['calculations', 'formulas', 'numerical reasoning'],
  english: ['grammar corrections', 'sentence construction'],
  social_science: ['source analysis', 'reasoning questions'],
}

/** Math expression heuristic: contains digits + operators or an equation. */
function looksLikeProblem(message: string): boolean {
  const hasEquation = /[=]/.test(message)
  const hasMathOps = /\d\s*[+\-*/^×÷]\s*\d/.test(message)
  const hasFraction = /\d\/\d/.test(message)
  const hasPercent = /%|\bpercent/i.test(message)
  // Require a digit after the operator — otherwise ordinary words like
  // "e-mail" (letter immediately followed by '-') false-positive as algebra.
  const hasVariable = /\b[a-z]\s*[=+\-]\s*\d/i.test(message)
  return hasEquation || hasMathOps || hasFraction || hasPercent || hasVariable
}

/**
 * Detect whether the student's message is asking to be walked through a
 * problem. Returns a short concept label when an interactive worked example
 * would help, else null.
 */
export function detectWorkedExampleIntent(
  message: string,
  subjectSlug: string,
): string | null {
  if (!(subjectSlug in WORKED_EXAMPLE_SUBJECTS)) return null

  const lower = message.toLowerCase()
  const hasIntentKeyword = SOLVE_INTENT_KEYWORDS.some((kw) => lower.includes(kw))
  const hasProblem = looksLikeProblem(message)

  // STEM: trigger on either an explicit ask or a problem expression
  if (subjectSlug === 'mathematics' || subjectSlug === 'science') {
    if (hasIntentKeyword || hasProblem) return inferConcept(message, subjectSlug)
    return null
  }

  // English / Social Science: trigger only on explicit ask (no math heuristic)
  if (hasIntentKeyword) return inferConcept(message, subjectSlug)
  return null
}

/** Best-effort concept label from the message + subject. */
function inferConcept(message: string, subjectSlug: string): string {
  const lower = message.toLowerCase()
  if (subjectSlug === 'mathematics') {
    if (/%|percent/.test(lower)) return 'percentages'
    if (/\d\/\d|fraction/.test(lower)) return 'fractions'
    if (/[a-z]\s*[=+\-]|equation|solve for|algebra/.test(lower)) return 'algebra'
    if (/area|perimeter|angle|triangle|circle|geometry/.test(lower)) return 'geometry'
    return 'arithmetic'
  }
  if (subjectSlug === 'science') {
    if (/current|voltage|resistance|ohm|circuit/.test(lower)) return 'electricity calculations'
    if (/force|acceleration|velocity|speed|momentum/.test(lower)) return 'numerical reasoning'
    if (/formula|equation/.test(lower)) return 'formulas'
    return 'calculations'
  }
  if (subjectSlug === 'english') {
    if (/sentence|construct|rewrite|rearrange/.test(lower)) return 'sentence construction'
    return 'grammar corrections'
  }
  if (subjectSlug === 'social_science') {
    if (/source|passage|extract/.test(lower)) return 'source analysis'
    return 'reasoning questions'
  }
  return 'this problem'
}

/** Step-granularity guidance by coaching mode. */
function stepGranularity(mode: DifficultyMode): string {
  if (mode === 'guided') {
    return 'Break the solution into MANY small steps. Each step should cover the smallest possible action (e.g. "first, what do we do to both sides?"). The student needs frequent, gentle prompts.'
  }
  if (mode === 'advanced') {
    return 'Use FEWER, larger steps. This student grasps fundamentals quickly — group routine operations together and focus prompts on the key decisions and reasoning.'
  }
  return 'Use a MODERATE number of steps. Prompt at each meaningful decision point, but combine trivial mechanical steps.'
}

/**
 * Build the INTERACTIVE WORKED EXAMPLE system prompt block.
 * `resuming` indicates an example is already active from a prior turn.
 */
export function buildWorkedExampleBlock(opts: {
  concept: string
  difficultyMode: DifficultyMode
  resuming?: boolean
  currentStep?: number
  totalSteps?: number
}): string {
  const granularity = stepGranularity(opts.difficultyMode)
  const resumeLine = opts.resuming && opts.currentStep && opts.totalSteps
    ? `\nThis worked example is ALREADY IN PROGRESS (step ${opts.currentStep} of ~${opts.totalSteps}). Continue from where you left off based on the student's latest answer — do NOT restart from step 1.`
    : ''

  return `\n\nINTERACTIVE WORKED EXAMPLE — the student wants help solving a ${opts.concept} problem. Solve it WITH them, not FOR them:
- Do NOT dump the full solution. Lead the student through it ONE step at a time.
- For each step: state the step briefly, then ask the student what to do (or what the result is) BEFORE revealing it.
- Wait for the student's answer. If they're right, affirm warmly and move to the next step. If they're wrong, give a small hint and let them retry once before showing the step.
- ${granularity}
- Keep each turn short — one step, one question. Never list all steps at once.
- Reuse the existing understanding-check style (warm, conversational, one question per turn) — do NOT create a separate quiz.
- If a diagram would help a step (fraction bar, number line, etc.), you may emit the VISUAL tag as usual.
- When the FINAL answer is reached and the student has confirmed it, celebrate briefly and connect it back to the concept.${resumeLine}

PROGRESS TRACKING (required): At the very END of your response, on its own line, emit a progress tag so the session can remember the example:
- While the example is in progress: [WE:${opts.concept}|<currentStepNumber>|<estimatedTotalSteps>]
- When the example is fully complete (student confirmed the final answer): [WE:done]
This tag is stripped before the student sees it — never reference it in your visible text.`
}

/**
 * Parse the [WE:...] progress tag from tutor response text.
 * Returns the updated worked-example state (or { done: true }) and clean text.
 */
export function parseWorkedExampleTag(text: string): {
  state: WorkedExample | null
  done: boolean
  cleanText: string
} {
  const doneMatch = text.match(/\[WE:\s*done\s*\]/i)
  if (doneMatch) {
    return { state: null, done: true, cleanText: text.replace(/\[WE:\s*done\s*\]\s*/i, '').trim() }
  }

  const match = text.match(/\[WE:\s*([^|\]]+)\|\s*(\d+)\s*\|\s*(\d+)\s*\]/i)
  if (!match) return { state: null, done: false, cleanText: text }

  const concept = match[1].trim()
  const currentStep = parseInt(match[2], 10) || 1
  const stepCount = parseInt(match[3], 10) || currentStep
  // Strip the EXACT tag we parsed (match[0]), not "the first [WE:...] bracket".
  // A separate strip regex could remove a different, earlier malformed bracket
  // and leave the real progress tag visible to the student.
  const cleanText = text.replace(match[0], '').replace(/\s{2,}/g, ' ').trim()

  return {
    state: { concept, stepCount, currentStep, nextQuestion: null, expectedStudentAction: null },
    done: false,
    cleanText,
  }
}
