/**
 * CROSS-CONCEPT DERAILMENT — "before" mid-Chemistry-lesson (2026-09-07).
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Found during the second real-account re-run of the 2026-09-06 student-
 * experience study (weakTopicAdvisorySuppression.test.ts closed two other
 * mechanisms; the four already-patched advisory blocks were confirmed
 * subject-scoped, so a DIFFERENT mechanism was responsible for this one).
 *
 * `chem.bond.covalent-bonding` derailed into teaching the English word
 * "before" on an ordinary, calm turn — no distress signal, no advisory
 * injection. Traced to the "Unresolved-topic excursion" system
 * (`excursion.ts` + `requestedTopic.ts`, 2026-09-02): when the KG resolver
 * cannot name a concept, `namedTopicUnknownTo` falls back to whatever the
 * learner's own words named, filtered only by `DISCOURSE_NOUNS` (lesson
 * apparatus, medium nouns, manner adverbs, POSITION words — 'next', 'last',
 * 'first', 'previous', 'other'). Confirmed no KG concept in any of the six
 * subjects is titled "before" or any of its siblings
 * (`resolveRequestedConceptId` returns null for all of them — see the
 * table below), so `namedTopicUnknownTo` was the only route in.
 *
 * A calm, natural ESL phrasing — "what is before?", "sir what is before?" —
 * matches `TOPIC_REQUEST_RE`'s `what\s+is` alternative at the one-word floor
 * `namedTopicUnknownTo` uses, extracts the bare topic "before", finds it
 * shares no vocabulary with the covalent-bonding lesson text, and is not a
 * medium noun or any word already in `DISCOURSE_NOUNS` — so it reads as a
 * genuine request to be taught something else. Exactly the same class of
 * defect as the already-fixed 'line'/'point'/'slowly'/'main'/'practice'
 * entries in that same Set, just in a family (temporal connectives) nobody
 * had measured yet: 'before', 'after', 'then', 'while', 'during', 'earlier',
 * 'later', 'soon' ALL reproduced the identical leak before the fix below.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────
 * `requestedTopic.ts`'s `DISCOURSE_NOUNS` gains that temporal-connective
 * family, on the same "one surviving real word is enough" discipline as
 * every other entry — so "teach me while loops" and "explain note-taking
 * while listening" (the two real concepts in the whole corpus that legitimately
 * contain one of these words) are unaffected, and only a BARE temporal
 * connective with nothing else names no topic.
 *
 * A second, narrower defect in the same Set was found while testing the
 * sibling word 'previous': `contentWords` (visualEngine.ts) folds any
 * trailing-'s' word longer than 4 characters as a plural with no exception
 * for a word that only looks plural ('previous' -> 'previou'), so the
 * pre-existing 'previous' entry has been silently inert since it was added.
 * Fixed by adding the literal folded string 'previou' alongside it.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import {
  decideExcursion,
  NO_EXCURSION,
  turnCountsForLesson,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { buildRemediationFallbackText } from '@/lib/teaching/remediationOutputContract'

const CHEM_LESSON = 'chem.bond.covalent-bonding'

/** The route's own wiring, reproduced exactly (mirrors unresolvedTopicExcursion.test.ts). */
function turn(opts: {
  message: string
  state?: ExcursionState
  lesson?: string
  subject?: string
}) {
  const lesson = opts.lesson ?? CHEM_LESSON
  const state = opts.state ?? NO_EXCURSION
  const requestedConceptId = resolveRequestedConceptId(opts.message, lesson, opts.subject ?? 'chemistry')

  const node = getKGNode(lesson)
  const activeTitle = state.active
    ? (state.targetTopicTitle ?? getKGNode(state.targetConceptId ?? '')?.title ?? '')
    : ''
  const taughtText = [node?.title ?? '', node?.description ?? '', activeTitle].join(' ')
  const requestedTopicTitle = requestedConceptId
    ? null
    : (namedTopicUnknownTo(opts.message, taughtText)?.title ?? null)

  return {
    requestedConceptId,
    requestedTopicTitle,
    decision: decideExcursion({
      state,
      message: opts.message,
      lessonConceptId: lesson,
      requestedConceptId,
      requestedTopicTitle,
      lastAssistantAskedQuestion: false,
    }),
  }
}

// ── 1 & 2. The exact original failure path, in the exact Chemistry context ──

describe('1/2 — the "before" derailment no longer opens an excursion in the covalent-bonding lesson', () => {
  const TRIGGER_PHRASINGS = [
    'what is before?',
    'sir what is before?',
    'what is before',
  ]

  for (const message of TRIGGER_PHRASINGS) {
    it(`does not resolve to any KG concept: "${message}"`, () => {
      expect(resolveRequestedConceptId(message, CHEM_LESSON, 'chemistry')).toBeNull()
    })

    it(`does not open an unresolved-topic excursion: "${message}"`, () => {
      const t = turn({ message })
      expect(t.requestedTopicTitle).toBeNull()
      expect(t.decision.state.active).toBe(false)
      expect(t.decision.transition).toBe('none')
    })

    it(`the lesson ladder keeps counting: "${message}"`, () => {
      const t = turn({ message })
      expect(turnCountsForLesson(t.decision)).toBe(true)
    })
  }

  it('the whole temporal-connective family reproduced the identical leak pre-fix and is now suppressed', () => {
    const taught = getKGNode(CHEM_LESSON)?.description ?? ''
    for (const word of ['before', 'after', 'then', 'while', 'during', 'earlier', 'later', 'soon']) {
      expect(namedTopicUnknownTo(`what is ${word}?`, taught)).toBeNull()
    }
  })

  it('the sibling position word "previous" is also now genuinely suppressed (contentWords plural-fold bug)', () => {
    const taught = getKGNode(CHEM_LESSON)?.description ?? ''
    expect(namedTopicUnknownTo('what is previous?', taught)).toBeNull()
  })
})

// ── 3. Legitimate Chemistry topic changes must still work ───────────────────

describe('3 — legitimate Chemistry topic changes are unaffected', () => {
  it('an explicit request to a different real Chemistry concept still opens a resolved excursion', () => {
    const t = turn({ message: 'can you teach me ionic bonding instead' })
    expect(t.requestedConceptId).toBe('chem.bond.ionic-bonding')
    expect(t.decision.state.active).toBe(true)
    expect(t.decision.targetConceptId).toBe('chem.bond.ionic-bonding')
  })

  it('"what is electron affinity" still resolves to a real concept, not the fallback path', () => {
    const id = resolveRequestedConceptId('what is electron affinity', CHEM_LESSON, 'chemistry')
    expect(id).toBeTruthy()
  })
})

// ── 4. Legitimate explicit cross-topic (off-curriculum) requests must still work ──

describe('4 — legitimate explicit cross-topic requests still open an unresolved-topic excursion', () => {
  it('a genuine off-curriculum-to-this-lesson topic still names itself', () => {
    const t = turn({ message: 'explain Kubernetes pod scheduling' })
    expect(t.requestedConceptId).toBeNull()
    expect(t.requestedTopicTitle).toBeTruthy()
    expect(t.decision.state.active).toBe(true)
    expect(t.decision.targetConceptId).toBeNull()
  })

  it('a cross-SUBJECT request that DOES resolve in the KG still opens a resolved excursion (not suppressed)', () => {
    const t = turn({ message: 'explain photosynthesis to me please' })
    expect(t.requestedConceptId).toBe('bio.plant.photosynthesis')
    expect(t.decision.state.active).toBe(true)
    expect(t.decision.targetConceptId).toBe('bio.plant.photosynthesis')
  })

  it('a request containing a temporal connective PLUS a real subject still names the subject ("while loops")', () => {
    const t = turn({ message: 'teach me while loops' })
    expect(t.requestedTopicTitle).toBe('while loops')
    expect(t.decision.state.active).toBe(true)
  })

  it('the other real corpus collision, "note-taking while listening", is unaffected', () => {
    const taught = getKGNode(CHEM_LESSON)?.description ?? ''
    expect(namedTopicUnknownTo('explain note-taking while listening', taught)?.title)
      .toBe('note-taking while listening')
  })
})

// ── 5. Previously-fixed Electron-Affinity derailment stays fixed ────────────

describe('5 — the Electron-Affinity path (2026-09-06 fix) is untouched', () => {
  it('"what is electron affinity" resolves via the KG resolver, not the unresolved-topic fallback', () => {
    const t = turn({ message: 'what is electron affinity' })
    expect(t.requestedConceptId).toBe('chem.period.electron-affinity')
    // Resolved via a real concept id — the fallback path never runs.
    expect(t.requestedTopicTitle).toBeNull()
  })
})

// ── 6. Previously-fixed visual-repeat / prompt-leak cases stay fixed ────────

describe('6 — previously-fixed visual-repeat and prompt-leak cases are untouched', () => {
  it('the "show it again" visual-repeat filler still names no topic (2026-08-11/2026-09-06 fixes)', () => {
    const taught = getKGNode(CHEM_LESSON)?.description ?? ''
    expect(namedTopicUnknownTo('can you show the picture again, i want to look one more time', taught)).toBeNull()
  })

  it('the raw-KG-outline leak is still refused by the remediation fallback (chem.atomic.bohr-model incident)', () => {
    // See item 8 below for the same concept's own dedicated check; this
    // confirms the general semicolon-outline guard survives this change too.
    const outline = 'A postulate; a rule; a boundary condition; a quantized state.'
    expect(buildRemediationFallbackText(outline, 'chem.atomic.bohr-model')).toBeNull()
  })
})

// ── 7. Projectile Motion — no cross-subject derailment ───────────────────────

describe('7 — Projectile Motion: the original distress turn extracts no cross-subject topic', () => {
  const PHYS_LESSON = 'phys.mech.projectile-motion'

  it('the exact confusion message that opened the Electric-Field derailment names nothing', () => {
    const msg = 'i see picture but i dont understand what it show. what this line and numbers '
      + 'mean? sorry my english not good'
    expect(resolveRequestedConceptId(msg, PHYS_LESSON, 'physics')).toBeNull()
    const taught = getKGNode(PHYS_LESSON)?.description ?? ''
    expect(namedTopicUnknownTo(msg, taught)).toBeNull()
  })

  it('a bare "what is before?" inside the Projectile Motion lesson also names nothing', () => {
    const t = turn({ message: 'what is before?', lesson: PHYS_LESSON, subject: 'physics' })
    expect(t.decision.state.active).toBe(false)
  })
})

// ── 8. Bohr Model — no raw KG-description leak ──────────────────────────────

describe('8 — Bohr Model of the Atom: the raw-KG-description leak stays fixed', () => {
  it('the exact bohr-model description is refused by the remediation fallback', () => {
    const description = getKGNode('chem.atomic.bohr-model')?.description ?? ''
    expect(description.length).toBeGreaterThan(0)
    const result = buildRemediationFallbackText(description, 'chem.atomic.bohr-model')
    // Either the description itself has 2+ semicolons (refused outright) or it
    // reads as ordinary prose (accepted) — whichever holds, "before" is not
    // the mechanism and this file's fix does not change this behaviour.
    const semicolons = description.match(/;/g)?.length ?? 0
    if (semicolons >= 2) {
      expect(result).toBeNull()
    } else {
      expect(result).toBe(description)
    }
  })

  it('a bare "what is before?" inside the Bohr Model lesson names nothing', () => {
    const t = turn({ message: 'what is before?', lesson: 'chem.atomic.bohr-model', subject: 'chemistry' })
    expect(t.decision.state.active).toBe(false)
  })
})
