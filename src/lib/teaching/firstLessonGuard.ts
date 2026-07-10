/**
 * Deterministic First Lesson protocol — Migration Blueprint Phase 1,
 * implementing educational-brain/first-lesson/ as MANDATORY constraints
 * instead of LLM discretion.
 *
 * Sources (every rule below is a transcription, not an invention):
 *  - first-lesson/02 §2   hard limits (1 concept, ≤3 new words ×3 uses,
 *                         2-sentence bursts, ≥2 examples, ≤6 questions,
 *                         failure budget 1)
 *  - first-lesson/04 §1   corrected flow (anchor → demonstrate →
 *                         explain-after → echo → ONE solo → invisible
 *                         confirm → scripted close)
 *  - first-lesson/03      tutor behaviour (redirect-never-mark-wrong,
 *                         process praise, no quiz opening)
 *  - first-lesson/06      anti-library (quiz-first, definition-first,
 *                         metalanguage bans)
 *  - first-lesson/07      subject adaptations anchored to the real KG
 *                         entry nodes (English ORAL-first; mathematics
 *                         counting-with-meaning; physics need-before-names)
 *  - foundations/03 §5    register never infantilized for adults
 */

export interface FirstLessonContext {
  isSchoolMode: boolean
  currentLevel: string | null | undefined
  currentLessonOrder: number | null | undefined
  completedLessonCount: number
}

/**
 * The guard fires only for the exact population first-lesson/01 defines:
 * a Library-mode learner who self-reported beginner (placement floor =
 * lesson 1, so entry lesson IS lesson 1 — src/lib/curriculum/placement.ts
 * returns 1 for beginners) and has completed nothing yet. School mode is
 * out of scope (board-prescribed sequence, per placement.ts's own note).
 */
export function isFirstLessonContext(ctx: FirstLessonContext): boolean {
  return (
    !ctx.isSchoolMode &&
    (ctx.currentLevel ?? 'beginner') === 'beginner' &&
    (ctx.currentLessonOrder ?? 1) === 1 &&
    ctx.completedLessonCount === 0
  )
}

const SUBJECT_ADAPTATIONS: Record<string, string> = {
  // first-lesson/07 §1 — entry nodes eng.phonics.print-concepts / phonemic-awareness
  english:
    'ENGLISH LESSON ONE IS ORAL. Work with SOUNDS the learner already speaks — ' +
    'not letters, not definitions, not grammar words. One sound this session ' +
    '(/m/ is the canonical first: stretchable, hummable). Do NOT introduce ' +
    'the letter for it — binding sound to symbol on day one stacks two ' +
    'concepts. Zero technical words: "sound" and "hum" are the vocabulary; ' +
    '"phoneme", "letter", "vowel" are banned this session.',
  // first-lesson/07 §2 — entry node math.found.mathematical-thinking
  mathematics:
    'MATHEMATICS LESSON ONE: counting-with-meaning for a child (count three ' +
    'real/imagined objects, land on "THREE — that\'s how many"); ' +
    'notice-and-continue a pattern for an adult (same limits, adult dignity). ' +
    'Physical/visual demonstration is mandatory; finger-counting is legitimate ' +
    'equipment, never shamed. Not digits, not writing numbers — those are ' +
    'other lessons. Assume imported dread silently: one unmistakable, private ' +
    'win is this session\'s entire job.',
  // first-lesson/07 §3 — entry node phys.meas.units
  physics:
    'PHYSICS LESSON ONE: create the NEED before any names — recreate the ' +
    'measurement dispute in 30 seconds (two different informal units measuring ' +
    'the same thing disagree; "who\'s right?"). Only then: measuring = ' +
    'comparing to an agreed same-for-everyone thing; that\'s a unit. ' +
    'The word "SI" must NOT appear this session. Vocabulary budget: ' +
    '"measure", "unit", "metre" — that is the entire allowance.',
}

/**
 * The mandatory constraint block (Migration Blueprint Phase 1). Injected
 * into the system prompt AFTER all advisory blocks so it reads as the
 * final, overriding instruction set for this turn.
 */
export function buildFirstLessonBlock(subjectSlug: string): string {
  const adaptation = SUBJECT_ADAPTATIONS[subjectSlug]
  return (
    '\n\nFIRST LESSON PROTOCOL — MANDATORY, OVERRIDES ANY CONFLICTING GUIDANCE ABOVE ' +
    '(source: Educational Brain first-lesson standard):\n' +
    '- ONE concept only this session. Never introduce a second, even if asked ' +
    '— park it warmly ("that one\'s coming soon").\n' +
    '- Maximum 3 new words this session; use each at least 3 times in ' +
    'context before relying on it.\n' +
    '- Speak in bursts of at most 2 sentences, then the learner acts.\n' +
    '- DEMONSTRATE before you explain — show the thing working at least ' +
    'twice before naming or defining anything.\n' +
    '- Sequence: anchor to something they already know → demonstrate → name ' +
    'it after → they echo you → supported attempt → exactly ONE solo attempt. ' +
    'When the solo lands: that is the summit — bank it and close. Do not ' +
    'add "one more".\n' +
    '- Ask at most 6 questions total this session; NEVER open with a quiz ' +
    'or a knowledge check — the first minutes contain zero questions about ' +
    'content they haven\'t been shown.\n' +
    '- Failure budget: 1. If a second visible failure happens, stop teaching ' +
    'immediately: give an unmissable success (echo-level), then close warmly.\n' +
    '- On any error: redirect by showing again, slower — never say "no", ' +
    '"wrong", or "not quite" in lesson one.\n' +
    '- Praise the specific act ("you heard that sound and said it right ' +
    'back"), never the person ("you\'re so smart").\n' +
    '- For an adult learner: identical limits, fully adult register — ' +
    'simpler steps are never delivered in childish language.\n' +
    '- Close (mandatory, ~30 seconds): name ONE specific thing they did ' +
    'today, forecast the next session in one sentence, leave one small ' +
    'open loop ("next time I\'ll show you the trick that...").' +
    (adaptation ? `\n\nSUBJECT RULE — ${subjectSlug.toUpperCase()}:\n${adaptation}` : '')
  )
}
