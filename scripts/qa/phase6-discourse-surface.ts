/**
 * PHASE 6 — SURFACE AREA of the discourse-deixis resolver defect.
 *
 * THE DEFECT, observed live and reproduced deterministically: a learner in a
 * PHYSICS lesson typing "explain the main idea please" has that phrase resolved
 * by `resolveRequestedConceptId` to the ENGLISH concept
 * `eng.reading.main-idea-and-details`. The Teaching Engine then opens a
 * cross-subject excursion, the visual layer attaches that concept's figure, and
 * the tutor teaches English reading comprehension inside a chemistry lesson —
 * measured, not theorised.
 *
 * Phase 6's rule is to STOP PATCHING a systemic architecture defect and instead
 * prove it and measure its surface area. CLAUDE.md independently warns that
 * "touching the resolver is what produced the L1 qualifier defect", so this
 * script CHANGES NOTHING. It measures.
 *
 * METHOD, chosen so the result cannot be an artefact of cherry-picking:
 * the phrase list is ordinary lesson discourse — things a learner says ABOUT
 * the lesson in progress, naming no subject matter at all. Every one of them
 * SHOULD resolve to null (they are deixis: they point at what is already being
 * taught). Any non-null answer is a false positive, and a CROSS-SUBJECT answer
 * is the severe form, because it can switch what is taught.
 */
import { resolveRequestedConceptId } from '../../src/lib/teaching/concept/requestedConcept'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'

/** Ordinary lesson discourse. None of these names a subject to be taught. */
const DISCOURSE_PHRASES = [
  'explain the main idea please',
  'what is the main idea here?',
  'can you explain the main idea',
  'explain the main point',
  'what is the point of this?',
  'can you explain that part again',
  'what is the answer?',
  'what is the next step?',
  'can you show me an example',
  'what is the rule here?',
  'explain the method',
  'what does that mean?',
  'can you explain the difference',
  'what is the formula?',
  'I did not understand the last part',
  'can you explain the first step',
  'what is the reason for that?',
  'explain the process',
  'what is the problem here?',
  'can you explain the result',
  'what is the key idea?',
  'explain the concept',
  'what is the summary?',
  'can you go over the basics',
  'what is the general rule',
  'explain the solution',
  'what is the correct answer',
  'can you explain the exercise',
  'what is the topic?',
  'explain the structure',
]

const LESSONS: { id: string; subject: string }[] = [
  { id: 'phys.mech.newtons-first-law', subject: 'physics' },
  { id: 'chem.found.pure-substances', subject: 'chemistry' },
  { id: 'eng.grammar.nouns', subject: 'english' },
]

const prefixOf = (id: string) => id.split('.')[0] ?? ''

function main(): void {
  console.log('='.repeat(80))
  console.log('PHASE 6 — DISCOURSE-DEIXIS RESOLVER SURFACE AREA')
  console.log('every phrase below is lesson discourse and SHOULD resolve to null')
  console.log('='.repeat(80))

  let total = 0, falsePositives = 0, crossSubject = 0
  const bySubject: Record<string, { fp: number; cross: number; n: number }> = {}
  const examples: string[] = []

  for (const lesson of LESSONS) {
    bySubject[lesson.subject] = { fp: 0, cross: 0, n: 0 }
    console.log(`\n── lesson: ${lesson.id}  (${lesson.subject}) ──`)
    for (const phrase of DISCOURSE_PHRASES) {
      total++; bySubject[lesson.subject].n++
      const got = resolveRequestedConceptId(phrase, lesson.id, lesson.subject)
      if (got === null) continue
      falsePositives++; bySubject[lesson.subject].fp++
      const isCross = prefixOf(got) !== prefixOf(lesson.id)
      if (isCross) { crossSubject++; bySubject[lesson.subject].cross++ }
      const title = getKGNode(got)?.title ?? '?'
      const flag = isCross ? 'CROSS-SUBJECT' : 'same-subject '
      const line = `  ${flag}  "${phrase}"\n              -> ${got}  "${title}"`
      console.log(line)
      if (isCross && examples.length < 12) examples.push(`${lesson.subject}: "${phrase}" -> ${got}`)
    }
  }

  console.log('\n' + '='.repeat(80))
  console.log('SURFACE AREA')
  console.log('='.repeat(80))
  console.log(`  phrases tested            : ${DISCOURSE_PHRASES.length} discourse phrases x ${LESSONS.length} lessons = ${total}`)
  console.log(`  false positives (non-null): ${falsePositives}  (${((falsePositives / total) * 100).toFixed(1)}%)`)
  console.log(`  CROSS-SUBJECT resolutions : ${crossSubject}  (${((crossSubject / total) * 100).toFixed(1)}%)  <- the severe form`)
  for (const [s, v] of Object.entries(bySubject)) {
    console.log(`    ${s.padEnd(10)} falsePositives=${v.fp}/${v.n}  crossSubject=${v.cross}`)
  }
  console.log('\n  A CROSS-SUBJECT resolution is severe because the Teaching Engine opens an')
  console.log('  excursion on it, the visual layer attaches that concept\'s figure, and the')
  console.log('  tutor teaches that subject — inside the learner\'s current lesson. Measured')
  console.log('  live: a chemistry lesson taught English reading comprehension.')
  console.log('\n  NOTHING WAS CHANGED BY THIS SCRIPT. Reported for owner decision, per Phase 6\'s')
  console.log('  "stop patching a systemic architecture defect" rule and CLAUDE.md\'s warning')
  console.log('  that this resolver previously produced the L1 qualifier defect when edited.')
}

main()
