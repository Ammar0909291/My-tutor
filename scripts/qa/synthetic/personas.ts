/**
 * SYNTHETIC STUDENTS — five kinds of learner, as deterministic policies.
 *
 * Rule-based on purpose. The answer key comes from the authored corpus (never
 * from the tutor's reply), each persona answers by a fixed pattern, and the
 * same run twice sends the same messages. That makes the scorecard a
 * regression instrument: a change in outcome is a change in the tutor, not in
 * the student. What rule-based students cannot do is answer the tutor's own
 * free-text questions sensibly — they ask to be checked with a question
 * instead. A model-driven student needs an AI key in the environment
 * (see docs/history/synthetic-students.md).
 */

export type AnswerIntent = 'correct' | 'misconception' | 'wrong'

export interface Persona {
  id: 'beginner' | 'careless' | 'strong' | 'confused' | 'offtrack'
  /** What this student is for — which tutor behaviour it exercises. */
  exercises: string
  /** First message after the lesson opens. */
  opener: string
  /** How the n-th multiple-choice answer is chosen; the last entry repeats. */
  answers: AnswerIntent[]
  /** Type the numeric answer (e.g. "84000 J") instead of tapping, every other correct answer. */
  typesNumbers: boolean
  /** Ask something else instead of answering, every `every` turns, once per question. */
  interjections: { every: number; messages: string[] } | null
  /** What to say when no question is on screen, in order; the last entry repeats. */
  followUps: string[]
}

export const PERSONAS: readonly Persona[] = [
  {
    id: 'beginner',
    exercises: 'misconception answers, remediation, re-ask of a missed question',
    opener: "hi, I'm new to this topic. can you explain it simply?",
    answers: ['misconception', 'correct', 'misconception', 'correct', 'correct', 'correct', 'correct'],
    typesNumbers: false,
    interjections: null,
    followUps: ['can you give me a simple example?', 'ok, can you test me with a question?'],
  },
  {
    id: 'careless',
    exercises: 'slips after the right method, typed numeric answers',
    opener: "ok, let's start",
    answers: ['correct', 'wrong', 'correct', 'correct', 'wrong', 'correct', 'correct'],
    typesNumbers: true,
    interjections: null,
    followUps: ['ok', 'test me'],
  },
  {
    id: 'strong',
    exercises: 'a fast learner: shortest path to verified mastery',
    opener: 'I already know the basics of this. can you quiz me?',
    answers: ['correct'],
    typesNumbers: true,
    interjections: null,
    followUps: ['got it. test me please', 'can we move faster? give me a question'],
  },
  {
    id: 'confused',
    exercises: 'distress, re-explanation, diagram requests',
    opener: "I don't understand this topic at all",
    answers: ['wrong', 'correct', 'correct', 'correct', 'wrong', 'correct', 'correct'],
    typesNumbers: false,
    interjections: { every: 4, messages: ["I'm lost, can you explain that differently?", 'can you show me a diagram?'] },
    followUps: ["I still don't get it", 'can you show me a diagram?', 'ok I think I see it now. can you check me with a question?'],
  },
  {
    id: 'offtrack',
    exercises: 'side questions while a question is on screen, returning to the lesson',
    opener: 'is this actually useful in real life, like in cricket?',
    answers: ['correct'],
    typesNumbers: false,
    interjections: { every: 3, messages: ['random question: why do things float in water?', 'will this be on the exam?', "what's your favourite physics fact?"] },
    followUps: ['cool. ok test me', 'ok, next question please'],
  },
]

export function personaById(id: string): Persona {
  const p = PERSONAS.find((x) => x.id === id)
  if (!p) throw new Error(`unknown persona ${id} (have: ${PERSONAS.map((x) => x.id).join(', ')})`)
  return p
}

export interface KeyedChoice { text: string; isCorrect: boolean; misconceptionId?: string }

/** Where the student is in the lesson, as far as its own policy is concerned. */
export interface PersonaState {
  turn: number
  mcqAnswered: number
  correctAnswered: number
  followUpIndex: number
  interjectionIndex: number
  /** The question already interrupted once — answer it next time. */
  interjectedOn: string | null
}

export const initialPersonaState = (): PersonaState => ({
  turn: 0, mcqAnswered: 0, correctAnswered: 0, followUpIndex: 0, interjectionIndex: 0, interjectedOn: null,
})

export type LearnerAct =
  | { kind: 'say'; message: string }
  | { kind: 'answer'; message: string; typed: boolean; intent: AnswerIntent | 'unkeyed'; intendedCorrect: boolean | null; question: string }

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Leading quantity of an option such as "24 Ω" or "84 000 J — because …". */
export function leadingQuantity(text: string): string | null {
  const core = text.split(/\s[—–]\s/)[0].trim()
  const m = core.match(/^(-?\d[\d.,\s  ]*(?:\s?[A-Za-zΩ°µ/²³⁻¹·]{1,8})?)$/)
  return m ? m[1].replace(/[\s  ](?=\d{3}\b)/g, '').trim() : null
}

/**
 * The student's next message.
 *
 * `onScreen` is the question the tutor put up last turn (null when none);
 * `key` is its authored answer key when the corpus has one.
 */
export function decideAct(
  persona: Persona,
  state: PersonaState,
  onScreen: { question: string; options: string[] } | null,
  key: KeyedChoice[] | null,
): { act: LearnerAct; next: PersonaState } {
  const next: PersonaState = { ...state, turn: state.turn + 1 }

  if (onScreen) {
    const due = persona.interjections && state.turn > 0 && state.turn % persona.interjections.every === 0
    if (due && state.interjectedOn !== onScreen.question) {
      const msgs = persona.interjections!.messages
      next.interjectionIndex = state.interjectionIndex + 1
      next.interjectedOn = onScreen.question
      return { act: { kind: 'say', message: msgs[state.interjectionIndex % msgs.length] }, next }
    }

    next.mcqAnswered = state.mcqAnswered + 1
    if (!key) {
      // A question the corpus does not know: the student cannot know the answer
      // either. Tap the first option; the checks record it as unkeyed.
      return { act: { kind: 'answer', message: onScreen.options[0], typed: false, intent: 'unkeyed', intendedCorrect: null, question: onScreen.question }, next }
    }
    const intent = persona.answers[Math.min(state.mcqAnswered, persona.answers.length - 1)]
    const correct = key.find((c) => c.isCorrect)!
    const wrongs = key.filter((c) => !c.isCorrect)
    const pick = intent === 'correct' ? correct
      : intent === 'misconception' ? (wrongs.find((c) => c.misconceptionId) ?? wrongs[0])
      : (wrongs.find((c) => !c.misconceptionId) ?? wrongs[wrongs.length - 1])
    const option = onScreen.options.find((o) => norm(o) === norm(pick.text)) ?? pick.text
    if (intent === 'correct') next.correctAnswered = state.correctAnswered + 1
    const typedNumber = persona.typesNumbers && intent === 'correct' && state.correctAnswered % 2 === 1
      ? leadingQuantity(option) : null
    return {
      act: {
        kind: 'answer', message: typedNumber ?? option, typed: typedNumber !== null,
        intent, intendedCorrect: intent === 'correct', question: onScreen.question,
      },
      next,
    }
  }

  const message = state.turn === 0
    ? persona.opener
    : persona.followUps[Math.min(state.followUpIndex, persona.followUps.length - 1)]
  if (state.turn > 0) next.followUpIndex = state.followUpIndex + 1
  return { act: { kind: 'say', message }, next }
}
