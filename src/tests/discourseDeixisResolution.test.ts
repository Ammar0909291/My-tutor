/**
 * PHASE 6 P0 — discourse deixis must not resolve to a foreign KG concept.
 *
 * THE DEFECT, observed live in production: a learner in a CHEMISTRY lesson
 * typed "explain the main idea please"; the tutor attached
 * `eng.reading.main-idea-and-details`'s figure and taught English reading
 * comprehension instead of chemistry.
 *
 * THE INVARIANT this file pins:
 *
 *   When a learner is already being taught a concept, ordinary discourse
 *   referring to that teaching context must not silently resolve to an
 *   unrelated KG concept from another subject.
 *
 * The defect was reachable through THREE entry points, all fed by the same
 * missing idea (that "the main idea" is deixis, not a subject):
 *   1. `resolveRequestedConceptId`'s viable-match filter chain
 *   2. `resolveNamedTopicHead`, its fallback — which runs precisely WHEN (1)
 *      finds nothing, so fixing (1) alone just moved the defect
 *   3. `namedTopicUnknownTo`, the unresolved-topic excursion path
 *
 * Sections 3 and 4 are the ones that matter most: a fix that makes discourse
 * return null by ALSO breaking explicit topic requests would be worse than the
 * defect, so legitimate resolution is pinned here in the same file.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'

const PHYSICS = 'phys.mech.newtons-first-law'
const CHEMISTRY = 'chem.found.pure-substances'
const ENGLISH = 'eng.grammar.nouns'

// ═══════════════════════════════════════════════════════════════════════════
// 1. The exact production failures
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P0 — the observed production failures resolve to nothing', () => {
  it('chemistry + "explain the main idea please" no longer reaches an English concept', () => {
    expect(resolveRequestedConceptId('explain the main idea please', CHEMISTRY, 'chemistry')).toBeNull()
  })

  it('physics + "explain the main idea please" no longer reaches an English concept', () => {
    expect(resolveRequestedConceptId('explain the main idea please', PHYSICS, 'physics')).toBeNull()
  })

  it('"what is the point of this?" no longer reaches math.geom.point', () => {
    expect(resolveRequestedConceptId('what is the point of this?', CHEMISTRY, 'chemistry')).toBeNull()
    expect(resolveRequestedConceptId('what is the point of this?', PHYSICS, 'physics')).toBeNull()
  })

  it('the fallback path is closed too — "can you explain the main idea" was the last survivor', () => {
    // This one resolved even AFTER the viable-match filter was added, via
    // resolveNamedTopicHead: the clause tokenizes to exactly "main idea",
    // which is the head of "Main Idea and Supporting Details".
    expect(resolveRequestedConceptId('can you explain the main idea', PHYSICS, 'physics')).toBeNull()
    expect(resolveRequestedConceptId('can you explain the main idea', CHEMISTRY, 'chemistry')).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. The whole committed 30-phrase discourse corpus, in all three subjects
// ═══════════════════════════════════════════════════════════════════════════
const DISCOURSE_PHRASES = [
  'explain the main idea please', 'what is the main idea here?', 'can you explain the main idea',
  'explain the main point', 'what is the point of this?', 'can you explain that part again',
  'what is the answer?', 'what is the next step?', 'can you show me an example',
  'what is the rule here?', 'explain the method', 'what does that mean?',
  'can you explain the difference', 'what is the formula?', 'I did not understand the last part',
  'can you explain the first step', 'what is the reason for that?', 'explain the process',
  'what is the problem here?', 'can you explain the result', 'what is the key idea?',
  'explain the concept', 'what is the summary?', 'can you go over the basics',
  'what is the general rule', 'explain the solution', 'what is the correct answer',
  'can you explain the exercise', 'what is the topic?', 'explain the structure',
]

describe('Phase 6 P0 — the full 90-case battery has zero cross-subject substitutions', () => {
  const lessons: [string, string][] = [
    [PHYSICS, 'physics'], [CHEMISTRY, 'chemistry'], [ENGLISH, 'english'],
  ]
  const prefix = (id: string) => id.split('.')[0]

  it('no discourse phrase resolves to ANY concept, in any of the three subjects', () => {
    const offenders: string[] = []
    for (const [lesson, subject] of lessons) {
      for (const phrase of DISCOURSE_PHRASES) {
        const got = resolveRequestedConceptId(phrase, lesson, subject)
        if (got !== null) offenders.push(`${subject}: "${phrase}" -> ${got}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('and specifically, zero CROSS-SUBJECT resolutions — the severe form', () => {
    const cross: string[] = []
    for (const [lesson, subject] of lessons) {
      for (const phrase of DISCOURSE_PHRASES) {
        const got = resolveRequestedConceptId(phrase, lesson, subject)
        if (got !== null && prefix(got) !== prefix(lesson)) cross.push(`${subject}: "${phrase}" -> ${got}`)
      }
    }
    expect(cross).toEqual([])
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — legitimate resolution must still work.
//    A fix that passes section 2 by breaking these is NOT acceptable.
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P0 — NEGATIVE CONTROLS: explicit topic requests still resolve', () => {
  it('a legitimate CROSS-SUBJECT request from a physics lesson still resolves', () => {
    // The learner genuinely names another subject's concept. This must keep
    // working — it is the whole point of the excursion machinery.
    expect(resolveRequestedConceptId('explain photosynthesis', PHYSICS, 'physics'))
      .toBe('bio.plant.photosynthesis')
  })

  it('a legitimate same-subject request still resolves (KG title matching intact)', () => {
    // Resolves via resolveNamedTopicHead, whose new discourse guard must NOT
    // fire here: 'entropy' is real subject vocabulary, so the phrase survives.
    expect(resolveRequestedConceptId('what is entropy?', PHYSICS, 'physics'))
      .toBe('phys.therm.entropy')
  })

  it('subject-local reading still wins over a foreign same-name concept', () => {
    // The L1/subject-local behaviour: a chemistry learner saying
    // "hybridization" reaches the chemistry concept.
    expect(resolveRequestedConceptId('explain hybridization', 'chem.solid.ionic-solids', 'chemistry'))
      .toBe('chem.bond.hybridization')
  })

  it('a topic phrase containing a discourse word still resolves when the MATCH itself is real', () => {
    // "Point of View" is a genuine KG title, so the matched text is not
    // discourse-only and the filter must leave it alone. This is the
    // one-real-word-is-enough property, asserted at the level the filter
    // actually operates on (the matched text, not the message).
    expect(resolveRequestedConceptId('explain point of view', ENGLISH, 'english'))
      .toBe('eng.literature.point-of-view')
  })
})

describe('Phase 6 P0 — what the negative controls REVEALED (recorded, not smoothed over)', () => {
  it('"explain boiling point" now returns null — and that is an IMPROVEMENT, not a regression', () => {
    // Measured: the matcher never matches "boiling point". It matches the bare
    // fragment [Point] at confidence 0.95, so BEFORE this fix a chemistry
    // learner asking about boiling point was sent to math.geom.point — the
    // GEOMETRY concept. Null is strictly better than a geometry excursion, and
    // the honest answer when the curriculum cannot name the phrase.
    expect(resolveRequestedConceptId('explain boiling point', CHEMISTRY, 'chemistry')).toBeNull()
  })

  it('"can you explain the idea of entropy please" was already null before this fix', () => {
    // The matcher returns NO candidates for this phrasing at all, and the
    // named-topic-head fallback needs the phrase to BE a title head. So this
    // is pre-existing behaviour that the discourse guard does not touch:
    // 'entropy' is not discourse, so the new guard never fires on it.
    expect(resolveRequestedConceptId('can you explain the idea of entropy please', PHYSICS, 'physics'))
      .toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. The unresolved-topic path (namedTopicUnknownTo) — the second entry point
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P0 — the unresolved-topic excursion path is closed too', () => {
  const TAUGHT = "Newton's First Law. An object at rest stays at rest and an object in motion "
    + 'stays in motion unless acted on by a net external force. Inertia.'

  it('"explain the main idea please" no longer becomes the topic "main idea please"', () => {
    // Before the fix this returned a topic and opened an unresolved-topic
    // excursion, which PAUSES the lesson and freezes the mastery ladder.
    expect(namedTopicUnknownTo('explain the main idea please', TAUGHT)).toBeNull()
  })

  it('"what is the main point?" no longer becomes a topic', () => {
    expect(namedTopicUnknownTo('what is the main point?', TAUGHT)).toBeNull()
  })

  it('NEGATIVE CONTROL: a genuinely unknown named topic still opens an excursion', () => {
    expect(namedTopicUnknownTo('teach me quadratic equations', TAUGHT)).not.toBeNull()
  })

  it('NEGATIVE CONTROL: "main" as a real modifier is untouched — one real word survives', () => {
    // 'main' is now discourse vocabulary, but 'sequence'/'stars' are not, so
    // this must still name a topic.
    expect(namedTopicUnknownTo('explain main sequence stars', TAUGHT)).not.toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. The measured, accepted cost — stated as a test so it cannot drift silently
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P0 — the one measured false negative, pinned deliberately', () => {
  it('a bare "teach me point" no longer resolves to math.geom.point', () => {
    // Across all 1,775 KG concepts in six subjects, math.geom.point is the ONLY
    // one whose entire title is discourse vocabulary. Accepted trade, pinned
    // here so a future reader sees it was measured rather than missed.
    expect(resolveRequestedConceptId('teach me point', PHYSICS, 'physics')).toBeNull()
  })

  it('...but a compound title the matcher genuinely matches still resolves', () => {
    // The distinction that matters: "Point of View" IS a KG title, so the
    // matched text is not discourse-only. "boiling point" is NOT a KG title —
    // the matcher only ever saw the bare fragment [Point] — which is why that
    // case is covered above as an improvement rather than here as a survivor.
    expect(resolveRequestedConceptId('explain point of view', ENGLISH, 'english')).not.toBeNull()
  })
})
