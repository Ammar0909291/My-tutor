import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualTarget, requestTargetsSomethingElse } from '@/lib/teaching/visual/resolveVisualTarget'

/**
 * THE OFF-CURRICULUM REQUEST — the wrong-figure case no downstream gate catches.
 *
 * Target resolution matches the learner's words against a KG index and falls
 * back to the lesson when nothing matches. A topic the curriculum has never
 * heard of CANNOT match, so it fell back silently. Measured before this rule
 * existed, in a `phys.meas.units` lesson:
 *
 *   "Explain Kubernetes pod scheduling"
 *      -> target phys.meas.units · origin lesson-concept · excursion false
 *
 * Every check downstream would then have agreed, because they all ask "is this
 * a good figure of the concept it claims to be" — and a generated SI-units
 * figure is exactly that. The claim is what was wrong.
 *
 * The bar for firing is POSITIVE evidence that a different topic was named,
 * because a false suppression costs a learner a figure they should have had.
 * The table below is the measurement: every phrasing a real learner types
 * during a lesson, and what the rule must do with it.
 */

const LESSON = 'phys.meas.units'   // "SI Units and Measurement"

function target(message: string) {
  return resolveVisualTarget(message, LESSON, 'physics')!
}

describe('Off-curriculum request — the rule fires only on a named topic', () => {
  const NAMES_ANOTHER_TOPIC = [
    'Explain Kubernetes pod scheduling',
    'explain kubernetes pod scheduling',
    'teach me about docker container networking',
    'can you explain byzantine fault tolerance',
  ]

  /**
   * KNOWN LIMITATION, measured and left honest rather than tuned away.
   *
   * The subject-vocabulary test asks whether ANY named word belongs to the
   * subject being studied. Two synthetic phrasings clear that bar for reasons
   * that are not really about the topic:
   *
   *   "what is transformer attention"          "transformer" IS physics
   *   "show me how mortgage amortisation works" "works" folds to "work"
   *
   * The first is arguably correct — a physics learner who says "transformer"
   * may well mean the component. The second is a genuine miss: an everyday
   * verb collides with a concept title. Both fail SAFE — the lesson's own
   * figure is offered instead of nothing — and neither was observed in the
   * real session. Tightening the rule to catch them risks re-breaking "what is
   * energy exactly", which WAS observed. Recorded, not hidden.
   */
  const KNOWN_MISSES = [
    'what is transformer attention',
  ]

  // WAS a known miss ("fails safe" = the lesson figure was shown anyway).
  // Suppressed correctly since the subject-vocabulary escape hatch was
  // removed on 2026-08-11 — mortgage amortisation is not a physics neighbour.
  const NOW_SUPPRESSED_WAS_A_MISS = ['show me how mortgage amortisation works']
  for (const message of NOW_SUPPRESSED_WAS_A_MISS) {
    it(`no longer a miss: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(true)
    })
  }

  for (const message of KNOWN_MISSES) {
    it(`known miss, fails safe: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(false)
    })
  }

  for (const message of NAMES_ANOTHER_TOPIC) {
    it(`suppresses: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(true)
    })
  }

  // MEASURED IN A REAL SESSION, and wrong before the subject-vocabulary test:
  // both of these are ordinary in-lesson questions that were being suppressed
  // as off-curriculum, taking the figure with them.
  // CORRECTED 2026-08-11, by a 40-topic / 80-turn production measurement.
  //
  // These two asserted that a question built from SUBJECT vocabulary keeps the
  // lesson's figure — the "defensible neighbour" rule. Measured at scale, that
  // rule produced 46 wrong figures out of the 62 a learner received: an
  // ionic-crystal lattice for titration, isotopes, moles, pH and electrolysis;
  // a free-body diagram for the refraction of light, including in answer to
  // "Draw it for me." Every one of those took this exit, because every one of
  // those words is vocabulary its subject knows.
  //
  // "energy" is not a neighbour of SI Units and "atom" is a neighbour of
  // Nature of Matter only when that lesson's own text says so — which is what
  // the surviving check tests. So both now SUPPRESS unless the lesson's own
  // title or description carries the word, and the engine shows no figure
  // instead of a confidently narrated wrong one.
  const NEIGHBOUR_QUESTIONS: [string, string, string][] = [
    ['what is energy exactly', 'phys.meas.units', 'physics'],
    ['what is an atom made of', 'chem.found.matter', 'chemistry'],
  ]
  for (const [message, lesson, subject] of NEIGHBOUR_QUESTIONS) {
    it(`no longer claims the lesson figure: "${message}"`, () => {
      const t = resolveVisualTarget(message, lesson, subject)!
      const suppressed = requestTargetsSomethingElse(message, t)
      // Suppressed unless the lesson's OWN words carry the named term.
      const lessonText = `${t.title} ${t.description ?? ''}`.toLowerCase()
      const named = message.toLowerCase().includes('energy') ? 'energy' : 'atom'
      expect(suppressed).toBe(!lessonText.includes(named))
    })
  }

  const IN_LESSON_QUESTIONS: [string, string, string][] = [
    // The OPENING TURN OF EVERY LESSON, measured in the running app: the rule
    // scanned the whole sentence, so a learner describing THEMSELVES ("I am a
    // complete beginner") was read as naming a topic — {complete, beginner,
    // topic}, none of them physics — and the lesson's own concept was
    // suppressed before any tier ran.
    ['I am a complete beginner. Please explain this topic to me.', 'phys.meas.units', 'physics'],
    ['I am a complete beginner. Please explain this topic to me.', 'chem.found.matter', 'chemistry'],
    ['can you teach me this please', 'phys.meas.units', 'physics'],
  ]

  for (const [message, lesson, subject] of IN_LESSON_QUESTIONS) {
    it(`allows an in-lesson question: "${message}"`, () => {
      const t = resolveVisualTarget(message, lesson, subject)!
      expect(requestTargetsSomethingElse(message, t)).toBe(false)
    })
  }

  it('a word another subject uses does not make a topic in-curriculum here', () => {
    // "scheduling" is computer-science vocabulary. In a PHYSICS lesson it is
    // evidence the question left the subject, not evidence it stayed.
    const t = resolveVisualTarget('Explain Kubernetes pod scheduling', LESSON, 'physics')!
    expect(requestTargetsSomethingElse('Explain Kubernetes pod scheduling', t)).toBe(true)
  })

  const ABOUT_THE_LESSON = [
    'explain this again please',
    'explain it more simply',
    'can you explain that again',
    'explain differently',
    'show me a diagram',
    'what is this',
    'tell me more',
    'explain the units again',
    'what is a base unit',
    'teach me measurement',
    'i want to learn more about measurement',
    'explain why units matter',
  ]

  for (const message of ABOUT_THE_LESSON) {
    it(`allows: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(false)
    })
  }

  it('never fires on a concept the learner actually named', () => {
    // origin `learner-request` means the KG recognised the topic; by
    // construction the figure IS what was asked for.
    const t = resolveVisualTarget('teach me vectors', LESSON, 'physics')!
    expect(t.origin).toBe('learner-request')
    expect(requestTargetsSomethingElse('teach me vectors', t)).toBe(false)
  })
})

describe('Off-curriculum request — what the authority returns', () => {
  it('declines rather than drawing the lesson the learner did not ask about', () => {
    const d = resolveVisual({
      message: 'Explain Kubernetes pod scheduling',
      lessonConceptId: LESSON,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toBe('no-figure:request-names-an-uncatalogued-topic')
    expect(d.continuityReason).toBe('request-off-topic')
    // It does not claim the lesson concept either: naming one would tell the
    // tutor a figure of SI units was considered for a Kubernetes question.
    expect(d.conceptId).toBeNull()
  })

  it('releases a held figure when the learner leaves its topic', () => {
    // CORRECTED 2026-08-11, from production. This case asserted the opposite —
    // that a held figure is never taken away, on the reasoning that suppression
    // withholds NEW figures while held ones belong to continuity, and that
    // releasing would blank the screen mid-explanation.
    //
    // That reasoning treats a held figure as inert. It is not. `visualContract`
    // binds the whole turn to whatever is on screen:
    //
    //   "GROUNDING: everything you say this turn is about <figure>. Any
    //    question you ask must be answerable FROM THIS FIGURE … Do not ask
    //    about, or pivot to, a different concept while this figure is on
    //    screen, however related it seems."
    //
    // So holding here does not merely leave an irrelevant picture up — it
    // instructs the tutor to answer a Kubernetes question about vector
    // addition. Measured in production with SI units held against a
    // kinetic-energy graph: "the mass of two kilograms and the units of speed
    // on the axes are built directly from those fundamental base units", said
    // of axes labelled Velocity and Kinetic Energy.
    //
    // The original intent — never blank the screen mid-explanation — is intact
    // and covered in visualStaleFigureAfterTopicChange.test.ts: releasing needs
    // a NAMED topic, so "explain that again", "explain it more simply", "show
    // me a diagram", "why?" and answers to the tutor all still hold.
    const d = resolveVisual({
      message: 'Explain Kubernetes pod scheduling',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      activeSession: {
        conceptId: 'phys.meas.vector-addition',
        representation: 'vector',
        renderer: 'scene',
        returnToConceptId: null,
        turns: 1,
      },
      lastAssistantAskedQuestion: false,
    })
    expect(d.graphical).toBe(false)
    expect(d.continuityReason).toBe('named-topic-left-the-figure')
    // And it does not substitute the lesson's own figure for the one it let go.
    expect(d.conceptId).toBeNull()
  })

  it('keeps a held figure when the learner is still on its topic', () => {
    const d = resolveVisual({
      message: 'Explain vector addition again, I did not follow',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      activeSession: {
        conceptId: 'phys.meas.vector-addition',
        representation: 'vector',
        renderer: 'scene',
        returnToConceptId: null,
        turns: 1,
      },
      lastAssistantAskedQuestion: false,
    })
    expect(d.graphical).toBe(true)
    expect(d.conceptId).toBe('phys.meas.vector-addition')
  })

  it('an ordinary lesson turn is untouched', () => {
    const d = resolveVisual({
      message: 'explain this again please',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      learnerRequest: 'explain_differently',
    })
    expect(d.conceptId).toBe('phys.meas.vector-addition')
    expect(d.graphical).toBe(true)
  })
})
