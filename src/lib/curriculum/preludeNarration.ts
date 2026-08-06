/**
 * The subject introduction, read aloud.
 *
 * Mirrors SubjectPreludeScreen's render order exactly — the one way this
 * narration can go wrong is drifting out of step with what the learner is
 * looking at, so the ordering assertions in the test suite pin the two
 * together rather than relying on whoever edits the screen to remember.
 *
 * Every string comes from the SubjectPrelude record. Nothing is authored here,
 * so a new subject still needs only a content entry in subjectPrelude.ts — the
 * "content is data, not code" rule that file is built on.
 *
 * Plain sentences separated by blank lines: cleanTextForTTS turns each blank
 * line into a sentence boundary, which is what gives the spoken version its
 * pause between sections. Section labels are spoken as short lead-ins rather
 * than the screen's uppercase headings, which would read as shouting.
 */
import type { SubjectPrelude } from './subjectPrelude'

export function buildPreludeNarration(prelude: SubjectPrelude, subjectName: string): string {
  const sections: string[] = [
    `${subjectName}.`,
    prelude.welcome,
    `The big question: ${prelude.bigQuestion}`,
    `Why this subject exists. ${prelude.whyItExists}`,
    `Why it matters. ${prelude.whyItMatters}`,
    `What you will learn. ${prelude.roadmap.map((s) => `${s.title}: ${s.detail}`).join(' ')}`,
    `Why it is worth learning. ${prelude.worthLearning}`,
    `What to expect. ${prelude.expectations.join(' ')}`,
    `The journey. ${prelude.estimatedJourney}`,
    prelude.prerequisites.length > 0
      ? `Prerequisites. ${prelude.prerequisites.join(' ')}`
      : 'Prerequisites. None. This starts from the beginning.',
    `Where you will see this. ${prelude.realWorldApplications.join('. ')}.`,
    `Where it leads. ${prelude.careerRelevance.join('. ')}.`,
    `Connects to. ${prelude.connectedSubjects.join('. ')}.`,
    `Before you start. ${prelude.motivation}`,
    prelude.transition,
  ]
  return sections.filter(Boolean).join('\n\n')
}
