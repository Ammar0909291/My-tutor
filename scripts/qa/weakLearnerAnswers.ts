/**
 * How a weak learner types their answer to a multiple-choice question.
 *
 * Extracted from phase-d-learning-loop.ts so it can be imported by a test
 * without executing the harness (that file calls main() at module load).
 * QA ONLY — no production code imports this.
 *
 * STARTING POINT: the cedd8cc generator, verbatim, so the repair has a real
 * before/after rather than an asserted one.
 */
export function echoOption(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/)
  const kept = words.slice(0, maxWords).join(' ')
  return kept.replace(/[,;:]$/, '')
}

export function weakCorrectAnswer(options: string[], correctIndex: number, variant: number): string {
  const text = options[correctIndex]
  const letter = 'ABCD'[correctIndex]
  switch (variant % 4) {
    case 0:  return `i think it is ${echoOption(text, 6).toLowerCase()} sir`
    case 1:  return `${letter}. but sir i not fully sure`
    case 2:  return `maybe ${echoOption(text, 5).toLowerCase()}`
    default: return `sir i think ${letter}`
  }
}

export function weakWrongAnswer(options: string[], correctIndex: number): string {
  const wrong = options.findIndex((_, i) => i !== correctIndex)
  return `i think it is ${echoOption(options[wrong], 6).toLowerCase()}`
}
