/**
 * Guided Teaching prompt extensions (Sprint BP — Tutoring Quality).
 *
 * Returns an additive system-prompt block for school-mode sessions only.
 * Never modifies existing context blocks — append-only.
 *
 * Covers:
 *   Phase 1 — micro understanding checks
 *   Phase 2 — grade-aware teaching depth
 *   Phase 3 — "I don't understand" recovery
 *   Phase 4 — weak topic invisible reinforcement
 *   Phase 5 — example-first teaching for STEM/Economics
 *   Phase 6 — chapter objective awareness
 *   Phase 7 — session completion signal
 */

export interface GuidedTeachingOptions {
  board: string
  grade: number
  subjectSlug: string
  /** Top weak topic titles (already scored — pass ≤2 for reinforcement) */
  weakTopicTitles: string[]
  /** Chapter objective bullet points from the curriculum context, if available */
  chapterObjectives?: string[]
}

const EXAMPLE_FIRST_SUBJECTS = new Set(['mathematics', 'science', 'economics'])

function gradeDepthBlock(grade: number): string {
  if (grade <= 6) {
    return `GRADE-APPROPRIATE TEACHING STYLE (Class ${grade}):
- Use very simple language. Short sentences. No technical jargon.
- Ground every concept in a real-life, everyday example the student already knows.
- One idea at a time. Never overwhelm with multiple new terms in the same response.
- Confirm understanding with a single, warm question before moving on.`
  }
  if (grade <= 8) {
    return `GRADE-APPROPRIATE TEACHING STYLE (Class ${grade}):
- Use straightforward language with moderate subject terminology.
- Always follow a new term with a plain-language explanation.
- Provide a worked example before asking the student to try something.
- Keep explanations focused; introduce complexity only after the basics are solid.`
  }
  if (grade <= 10) {
    return `GRADE-APPROPRIATE TEACHING STYLE (Class ${grade}):
- Board-exam awareness: frame explanations around definitions, derivations, and applications that appear in CBSE/UP Board exams.
- Structured reasoning: concept → definition → worked example → application → check.
- Introduce exam-style phrasing naturally ("State and explain...", "Derive the formula for...").
- Balance conceptual understanding with exam-readiness.`
  }
  // 11–12
  return `GRADE-APPROPRIATE TEACHING STYLE (Class ${grade}):
- Formal academic tone. Use precise subject vocabulary without unnecessary simplification.
- Prioritize deep reasoning: derivations, proofs, analytical arguments.
- Connect concepts to board-exam marking schemes and higher-education expectations.
- Challenge the student to reason independently; don't just provide answers.`
}

function understandingCheckBlock(): string {
  return `UNDERSTANDING CHECKS — MANDATORY RULE:
After any response that contains a substantial explanation (roughly 120+ words, or introduces a new concept), end with ONE short, conversational question that checks whether the student understood the key idea.
- Never ask more than one check question per response.
- Never create a quiz or a numbered list of questions.
- Never ask a check question if your response is already a question.
- The question must feel like natural conversation, not an exam.
- Grade-appropriate phrasing: simple for younger grades, analytical for senior grades.
- Examples (use the spirit, not the exact wording):
  Math: "So why do you think multiplying both sides by the same number keeps the equation balanced?"
  Science: "What do you think would happen to the current if we doubled the resistance?"
  Social Science: "Why do you think people's participation in elections matters for democracy?"
  English: "What emotion do you think the poet is trying to create with those words?"`
}

function recoveryBlock(): string {
  return `CONFUSION RECOVERY — when the student signals they don't understand:
Triggers (detect these and similar phrases): "I don't understand", "not clear", "explain again", "confusing", "didn't get it", "can you simplify", "what do you mean", "I'm lost", "समझ नहीं आया", "फिर से समझाओ".
When triggered:
1. Do NOT repeat the previous explanation word for word.
2. Do NOT say "As I already explained...".
3. Simplify by breaking the concept into smaller, numbered micro-steps.
4. Use a different example — completely different from any example used earlier in the session.
5. Keep the tone warm and encouraging: "No worries, let's try a different angle."
6. End with a tiny, easy question to rebuild confidence before going deeper.`
}

function weakTopicReinforcementBlock(weakTopicTitles: string[]): string {
  if (weakTopicTitles.length === 0) return ''
  const topics = weakTopicTitles.slice(0, 2).join(' and ')
  return `INVISIBLE WEAK-TOPIC REINFORCEMENT:
The student has previously struggled with: ${topics}.
When it is naturally relevant to the current explanation, weave in a brief connection to these topics without explicitly saying the student is weak at them.
Example technique: "Percentages are really just another way of writing fractions — so if fractions feel familiar, this should click quickly."
Rules:
- Only when genuinely relevant — never force a connection.
- Never say "You are weak at...", "You struggled with...", or "You got this wrong before."
- Limit: reference at most 1 weak topic per response.`
}

function exampleFirstBlock(subjectSlug: string, grade: number): string {
  if (!EXAMPLE_FIRST_SUBJECTS.has(subjectSlug)) return ''
  const exampleStyle = grade <= 8
    ? 'a relatable, real-life scenario the student encounters daily'
    : 'a real-life scenario OR an exam-style worked problem'
  return `EXAMPLE-FIRST TEACHING (${subjectSlug}):
For this subject, always prefer:
  Concept → Example (${exampleStyle}) → Understanding Check
over:
  Definition → Definition → Definition
Keep examples concise — one focused example is better than a long scenario.`
}

function objectiveAwarenessBlock(objectives: string[]): string {
  if (objectives.length === 0) return ''
  return `CHAPTER OBJECTIVES — prioritise these in your explanations:
${objectives.map((o) => `- ${o}`).join('\n')}
Naturally anchor explanations to these goals. When a student's question is adjacent to an objective, guide them back toward mastering it.`
}

function sessionCompletionBlock(): string {
  return `SESSION COMPLETION SIGNAL:
If the student has answered several questions correctly and appears comfortable with the chapter's key concepts, you may gently suggest moving to practice:
"You seem comfortable with the main ideas here. Whenever you feel ready, the practice section is a great next step."
or:
"You're doing well — you might be ready to test yourself with a short practice activity."
Rules:
- This is a suggestion only — never interrupt an ongoing explanation.
- Only say it once per session, and only when confidence is genuinely evident.
- Never pressure the student or frame it as "you must now do practice".`
}

/**
 * Returns the full guided-teaching system-prompt extension for a school session.
 * Append this after the existing school context blocks.
 */
export function buildGuidedTeachingPrompt(opts: GuidedTeachingOptions): string {
  const blocks: string[] = []

  blocks.push(gradeDepthBlock(opts.grade))
  blocks.push(understandingCheckBlock())
  blocks.push(recoveryBlock())

  const weakBlock = weakTopicReinforcementBlock(opts.weakTopicTitles)
  if (weakBlock) blocks.push(weakBlock)

  const exBlock = exampleFirstBlock(opts.subjectSlug, opts.grade)
  if (exBlock) blocks.push(exBlock)

  const objBlock = objectiveAwarenessBlock(opts.chapterObjectives ?? [])
  if (objBlock) blocks.push(objBlock)

  blocks.push(sessionCompletionBlock())

  return `\n\nGUIDED TEACHING STRATEGY — apply these rules throughout the session:\n${blocks.map((b) => b.trim()).join('\n\n')}`
}
