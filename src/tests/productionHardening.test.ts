/**
 * Production hardening regressions.
 *
 * Every case here comes from the live shadow deployment on
 * dpl_3YKdNWRhyE7RhH77QCbfdZxsJ3xM, branch claude/visualization-engine-r5hese.
 * Nothing is invented.
 */
import { describe, it, expect } from 'vitest'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import {
  resolveConceptMatches, deriveAcronym, normalizeToTokens,
  SINGLE_TOKEN_MATCH_MAX_MESSAGE_TOKENS,
} from '@/lib/teaching/concept/conceptIndex'
import { understandConcepts } from '@/lib/teaching/concept/conceptUnderstandingEngine'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import { planExecution } from '@/lib/teaching/execution/executionPlanner'
import { TeachingIntent, LessonMode } from '@/lib/teaching/planner/teachingPlan'
import { ExecutionMode } from '@/lib/teaching/execution/executionPlan'
import { selectCurrentLesson } from '@/lib/teaching/progressionIntegrity'

const ALL = buildConceptIndexFromKnowledgeGraph()
const CALORIMETRY = 'phys.therm.calorimetry'

/** The real 3,459-character message the learner pasted at 07:32:15, which
 *  resolved to `math.alg.term` in production. Condensed but keeping every
 *  common-English-word trigger it contained. */
const LONG_PASTED_MESSAGE = `You are performing a PRODUCTION RUNTIME FORENSIC INVESTIGATION.
DO NOT implement fixes. DO NOT modify code. Only gather evidence.
Determine EXACTLY where the deployed runtime executed. Trace the ENTIRE runtime path.
Did the request enter the Brain? What concept was resolved? Show the produced TeachingPlan.
Possible causes include: environment variable not loaded, wrong deployment, branch mismatch,
code path never reached, feature flag, early return, runtime exception, middleware, dead code,
build optimization, tree shaking, unreachable branch. Identify the exact cause with evidence.
Why does Tutor say "Back to Calorimetry" when the visible lesson is "Scalar and Vector Quantities"?
In terms of the field, the current work and the power output of the set. NO FIXES. READ ONLY.`

describe('P0-1 · false-positive concept resolution (production case)', () => {
  it('the real long pasted message no longer resolves math.alg.term', () => {
    const matches = resolveConceptMatches(LONG_PASTED_MESSAGE, ALL, 'physics')
    expect(matches.map(m => m.conceptId)).not.toContain('math.alg.term')
  })

  it('it also stops matching every other incidental single-word title', () => {
    const ids = resolveConceptMatches(LONG_PASTED_MESSAGE, ALL, 'physics').map(m => m.conceptId)
    for (const bogus of [
      'math.abst.field', 'math.found.variable', 'math.graph.tree',
      'cs.struct.trees', 'math.disc.graph-trees', 'phys.mech.power',
    ]) {
      expect(ids).not.toContain(bogus)
    }
  })

  it('the only surviving match is the multi-word title genuinely present', () => {
    const matches = resolveConceptMatches(LONG_PASTED_MESSAGE, ALL, 'physics')
    expect(matches.map(m => m.conceptId)).toEqual(['phys.meas.scalars-vectors'])
  })

  it('a 2-letter acronym no longer matches ordinary words ("DO NOT")', () => {
    // "Damped Oscillations" -> "DO" previously matched the words "DO NOT".
    expect(deriveAcronym('Damped Oscillations')).toBeNull()
    const ids = resolveConceptMatches(LONG_PASTED_MESSAGE, ALL, 'physics').map(m => m.conceptId)
    expect(ids).not.toContain('phys.wave.damped-oscillations')
    expect(ids).not.toContain('math.arith.decimal-operations')
  })

  it('3+ letter acronyms are unaffected', () => {
    expect(deriveAcronym('Simple Harmonic Motion')).toBe('SHM')
  })
})

describe('P0-1 · common English words in long messages', () => {
  const COMMON = ['term', 'force', 'work', 'power', 'current', 'field']

  it.each(COMMON)('"%s" buried in a long message resolves nothing', (word) => {
    const long = `I was reading about the deployment pipeline and the ${word} came up repeatedly ` +
      'in the build logs, which made me wonder about the configuration of the service and ' +
      'whether the environment variables were loaded correctly during the last release, ' +
      'because the observability dashboard showed unusual latency across several endpoints ' +
      'and the team wanted a written summary before the next planning session on Monday.'
    expect(normalizeToTokens(long).length).toBeGreaterThan(SINGLE_TOKEN_MATCH_MAX_MESSAGE_TOKENS)
    const matches = resolveConceptMatches(long, ALL, 'physics')
    expect(matches.filter(m => m.matchedTokenCount === 1)).toEqual([])
  })

  // Only these have an exact single-word canonical title, verified against the
  // live KG. force/work/current do NOT (they appear only inside longer titles
  // such as "Work Done by a Force", "Electric Current and Drift Velocity"), so
  // they never resolved and still do not — a pre-existing short-form alias gap,
  // NOT a regression from the specificity floor.
  const COMMON_WITH_EXACT_TITLE: Array<[string, string]> = [
    ['term', 'math.alg.term'],
    ['power', 'phys.mech.power'],
    ['field', 'math.abst.field'],
    ['vector', 'math.linalg.vector'],
  ]

  it.each(COMMON_WITH_EXACT_TITLE)('"what is %s?" — a focused request — still resolves to %s', (word, id) => {
    const matches = resolveConceptMatches(`what is ${word}?`, ALL, 'physics')
    expect(matches.map(m => m.conceptId)).toContain(id)
  })

  it('force/work/current have no single-word title — unchanged pre-existing gap', () => {
    for (const w of ['force', 'work', 'current']) {
      expect(ALL.some(e => e.title.toLowerCase() === w)).toBe(false)
    }
  })

  it('does not weaken multi-word titles at any message length', () => {
    const long = `${LONG_PASTED_MESSAGE} Please also cover Scalar and Vector Quantities.`
    const ids = resolveConceptMatches(long, ALL, 'physics').map(m => m.conceptId)
    expect(ids).toContain('phys.meas.scalars-vectors')
  })
})

describe('P0-1 · planner no longer discards the resolver ranking', () => {
  it('targets Concept Understanding\'s own primary, not the alphabetically-first id', () => {
    const concepts = understandConcepts({
      message: LONG_PASTED_MESSAGE, activeLessonConceptId: CALORIMETRY,
      index: ALL, preferredSubject: 'physics',
    })
    const plan = planTeachingTurn({
      message: LONG_PASTED_MESSAGE, activeLessonConceptId: CALORIMETRY,
      resolveConcept: () => concepts.matches.map(m => ({
        conceptId: m.conceptId, title: m.title, confidence: m.confidence,
      })),
    })
    expect(plan.targetConceptId).toBe(concepts.primaryConceptId)
    expect(plan.targetConceptId).not.toBe('math.alg.term')
  })

  it('preserves caller order for equal-confidence matches', () => {
    const plan = planTeachingTurn({
      message: 'anything', activeLessonConceptId: null,
      resolveConcept: () => [
        { conceptId: 'zzz.first', title: 'Z', confidence: 0.95 },
        { conceptId: 'aaa.second', title: 'A', confidence: 0.95 },
      ],
    })
    // Caller order wins; the old conceptId tie-break would have picked aaa.second.
    expect(plan.targetConceptId).toBe('zzz.first')
  })
})

describe('P0-1 · production vector case still works (no regression)', () => {
  it('"Teach me vector with visualization." → excursion to math.linalg.vector', () => {
    const message = 'Teach me vector with visualization.'
    const concepts = understandConcepts({
      message, activeLessonConceptId: CALORIMETRY, index: ALL, preferredSubject: 'physics',
    })
    expect(concepts.primaryConceptId).toBe('math.linalg.vector')
    expect(concepts.offTopic).toBe(true)

    const plan = planTeachingTurn({
      message, activeLessonConceptId: CALORIMETRY,
      resolveConcept: () => concepts.matches.map(m => ({
        conceptId: m.conceptId, title: m.title, confidence: m.confidence,
      })),
    })
    expect(plan.intent).toBe(TeachingIntent.VISUALIZE_CONCEPT)
    expect(plan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    expect(plan.excursion.returnToConceptId).toBe(CALORIMETRY)

    const exec = planExecution({ plan, concepts })
    expect(exec.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
  })

  it('"what is vector?" still resolves from a chemistry lesson', () => {
    const concepts = understandConcepts({
      message: 'what is vector?', activeLessonConceptId: 'chem.found.matter',
      index: ALL, preferredSubject: 'chemistry',
    })
    expect(concepts.primaryConceptId).toBe('math.linalg.vector')
  })
})

describe('P0-2 · canonical lesson authority (production Calorimetry case)', () => {
  // Real production state: student_progress.currentLesson = 74 ("Calorimetry"),
  // topic_progress had phys.meas.scalars-vectors = REVISION updated mid-session.
  const lessons = [
    { order: 7, topicSlug: 'phys.meas.scalars-vectors', lessonTitle: 'Scalar and Vector Quantities' },
    { order: 74, topicSlug: CALORIMETRY, lessonTitle: 'Calorimetry' },
  ]

  it('StudentProgress.currentLesson is authoritative over topic_progress rows', () => {
    const selected = selectCurrentLesson(lessons, 74, [
      { topicSlug: 'phys.meas.scalars-vectors', status: 'REVISION' },
      { topicSlug: CALORIMETRY, status: 'IN_PROGRESS' },
    ])
    expect(selected?.topicSlug).toBe(CALORIMETRY)
    expect(selected?.lessonTitle).toBe('Calorimetry')
  })

  it('a REVISION row never overrides the owner — reproduces the exact divergence', () => {
    // The UI displayed scalars-vectors; the server correctly stayed on Calorimetry.
    const selected = selectCurrentLesson(lessons, 74, [
      { topicSlug: 'phys.meas.scalars-vectors', status: 'REVISION' },
    ])
    expect(selected?.topicSlug).not.toBe('phys.meas.scalars-vectors')
  })

  it('falls back to topic_progress only when the owner has no usable value', () => {
    const selected = selectCurrentLesson(lessons, null, [
      { topicSlug: 'phys.meas.scalars-vectors', status: 'IN_PROGRESS' },
    ])
    expect(selected?.topicSlug).toBe('phys.meas.scalars-vectors')
  })
})
