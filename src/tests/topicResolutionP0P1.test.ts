import { describe, it, expect } from 'vitest'
import {
  resolveRequestedConceptId,
  conceptIndex,
} from '@/lib/teaching/concept/requestedConcept'
import {
  isExplicitCorrection,
  isReturnRequest,
  MAX_EXCURSION_TURNS,
} from '@/lib/teaching/visual/session'
import { decideExcursion, type ExcursionState } from '@/lib/teaching/excursion'
import { classifyKnowledgeGap } from '@/lib/teaching/knowledgeGap'
import { arbitrateTurn } from '@/lib/teaching/turnArbitration'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { DISCOURSE_NOUNS } from '@/lib/teaching/visual/requestedTopic'

/**
 * E1 + E3 + E4 — the 2026-09-05 topic-resolution P0 and the wrong-subject
 * correction that made it unrecoverable.
 *
 * Every utterance below is a VERBATIM production capture from a real-account
 * physics session, or a control measured during the read-only investigation
 * that preceded these changes. Nothing here is invented phrasing.
 *
 * E2 (the sibling/self-topic suppression for `phys.therm.zeroth-law`) is NOT
 * implemented and is NOT authorized — see the F4 block at the bottom, which
 * CHARACTERIZES the surviving behaviour rather than asserting a fix that is
 * not present.
 */

// ── the two production utterances ───────────────────────────────────────────
const P0_TURN4 =
  'i dont know sir. that is what i am asking you. please dont ask me question, '
  + 'please teach me why loud and soft happens'
const P0_TURN5 =
  'sir this is wrong. i am studying physics beats lesson not english. '
  + 'why you are teaching me about asking questions'
const BEATS = 'phys.wave.beats'
const ENGLISH_ASKING = 'eng.speaking.asking-and-answering-questions'

const NO_EXCURSION: ExcursionState = {
  active: false,
  targetConceptId: null,
  targetTopicTitle: null,
  returnToConceptId: null,
  turns: 0,
}

function gapFor(message: string, lesson: string) {
  return classifyKnowledgeGap({
    failureState: 'dont_know',
    resolvedConceptId: resolveRequestedConceptId(message, lesson, null),
    lessonConceptId: lesson,
    lessonPrerequisites: getKGNode(lesson)?.prerequisites ?? [],
  })
}

// ─────────────────────────────────────────────────────────────────────────────
describe('F1 — the exact P0 production utterance names nothing, anywhere', () => {
  it('resolves to null in the lesson it derailed', () => {
    expect(resolveRequestedConceptId(P0_TURN4, BEATS, null)).toBeNull()
  })

  it('opens no knowledge gap, so KNOWLEDGE_GAP cannot claim the turn', () => {
    expect(gapFor(P0_TURN4, BEATS)).toBeNull()
  })

  it('opens no excursion — transition stays "none" and the lesson keeps the target', () => {
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: P0_TURN4,
      lessonConceptId: BEATS,
      requestedConceptId: resolveRequestedConceptId(P0_TURN4, BEATS, null),
      knowledgeGapConceptId: gapFor(P0_TURN4, BEATS)?.conceptId ?? null,
    })
    expect(decision.transition).toBe('none')
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(BEATS)
  })

  it('derails NO subject — it reached every one of these before the fix', () => {
    for (const lesson of [
      BEATS, 'chem.bond.vsepr', 'math.geom.slope',
      'bio.plant.photosynthesis', 'eng.reading.main-idea-and-details',
      'cs.prog.python-basics',
    ]) {
      expect(
        resolveRequestedConceptId(P0_TURN4, lesson, null),
        `P0 utterance still names a concept in ${lesson}`,
      ).toBeNull()
    }
  })

  it('the isolated clause that carried the match names nothing on its own', () => {
    // This fragment ALONE resolved to the English concept, which is how the
    // main-chain (not the head fallback) origin was proven.
    expect(resolveRequestedConceptId('that is what i am asking you', BEATS, null)).toBeNull()
  })
})

describe('F2 — the second production phrasing', () => {
  it('"why you are teaching me about asking questions" names nothing', () => {
    expect(
      resolveRequestedConceptId('why you are teaching me about asking questions', BEATS, null),
    ).toBeNull()
  })

  it('and the full turn-5 protest names nothing either', () => {
    expect(resolveRequestedConceptId(P0_TURN5, BEATS, null)).toBeNull()
  })
})

describe('F3 — E1 negative control: the concept stays teachable by name', () => {
  it('a genuine English request still reaches it', () => {
    expect(
      resolveRequestedConceptId(
        'teach me asking and answering questions',
        'eng.reading.main-idea-and-details',
        null,
      ),
    ).toBe(ENGLISH_ASKING)
  })

  it('the full title survives because one non-discourse word is enough', () => {
    // 'and' is not discourse vocabulary, which is the whole reason the title
    // is still reachable after 'asking'/'answering' were added.
    expect(DISCOURSE_NOUNS.has('and')).toBe(false)
    expect(DISCOURSE_NOUNS.has('asking')).toBe(true)
    expect(DISCOURSE_NOUNS.has('answering')).toBe(true)
    expect(DISCOURSE_NOUNS.has('ask')).toBe(true)
  })

  it('E1 added only inflections of nouns already in the list', () => {
    expect(DISCOURSE_NOUNS.has('question')).toBe(true)
    expect(DISCOURSE_NOUNS.has('answer')).toBe(true)
  })
})

describe('F5 — head-named prerequisite excursions still open', () => {
  const CASES: ReadonlyArray<readonly [string, string, string]> = [
    ['i dont understand mitochondria', 'bio.div.endosymbiotic-theory', 'bio.cell.mitochondria-energy'],
    ['explain benzene', 'chem.alc.phenols', 'chem.hyd.arenes'],
    ['i dont know about eigenvalues', 'math.de.systems-matrix-method', 'math.linalg.eigenvalues'],
    ['explain eigenvalues', 'math.de.systems-matrix-method', 'math.linalg.eigenvalues'],
  ]
  for (const [message, lesson, expected] of CASES) {
    it(`"${message}" still names ${expected}`, () => {
      expect(resolveRequestedConceptId(message, lesson, null)).toBe(expected)
    })
  }

  it('PRE-EXISTING, not caused here: bare "i dont know eigenvalues" already named nothing', () => {
    // Verified by running the resolver with these changes stashed: null at
    // HEAD~ as well. `isIncidentalWord` drops the one-word match because no
    // REQUEST_CUE precedes it; adding "about" supplies the cue, which is why
    // the control above is the phrasing that actually exercises F5.
    // Pinned so this is never misread as E1/E3 fallout.
    expect(
      resolveRequestedConceptId('i dont know eigenvalues', 'math.de.systems-matrix-method', null),
    ).toBeNull()
  })
})

describe('F6 — legitimate CROSS-SUBJECT excursions still open', () => {
  it('"explain photosynthesis" from a physics lesson still reaches biology', () => {
    expect(resolveRequestedConceptId('explain photosynthesis', BEATS, null))
      .toBe('bio.plant.photosynthesis')
  })

  it('"i dont know enough about the mole concept" still reaches chemistry', () => {
    // knowledgeGap.ts's own worked example.
    expect(resolveRequestedConceptId('i dont know enough about the mole concept', BEATS, null))
      .toBe('chem.found.mole-concept')
  })

  it('and it still classifies as a knowledge gap that opens an excursion', () => {
    const gap = gapFor('i dont know enough about the mole concept', BEATS)
    expect(gap?.conceptId).toBe('chem.found.mole-concept')
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: 'i dont know enough about the mole concept',
      lessonConceptId: BEATS,
      requestedConceptId: 'chem.found.mole-concept',
      knowledgeGapConceptId: gap?.conceptId ?? null,
    })
    expect(decision.transition).toBe('started')
    expect(decision.targetConceptId).toBe('chem.found.mole-concept')
  })
})

describe('F7 — E3 positional controls: every measured genuine request survives', () => {
  const CASES: ReadonlyArray<readonly [string, string, string]> = [
    ['explain photosynthesis to me please', BEATS, 'bio.plant.photosynthesis'],
    ['i dont understand photosynthesis', BEATS, 'bio.plant.photosynthesis'],
    ['teach me about the mole concept', 'phys.mech.friction', 'chem.found.mole-concept'],
    ['i dont know enough about the mole concept', 'chem.found.pure-substances', 'chem.found.mole-concept'],
    ['what is entropy', 'phys.mech.free-body-diagram', 'phys.therm.entropy'],
    ['explain apoptosis', 'bio.plant.photosynthesis', 'bio.cell.apoptosis'],
    ['explain mitochondria to me', 'bio.plant.photosynthesis', 'bio.cell.mitochondria-energy'],
    ['can you explain the mitochondria', 'bio.plant.photosynthesis', 'bio.cell.mitochondria-energy'],
  ]
  for (const [message, lesson, expected] of CASES) {
    it(`"${message}" still resolves`, () => {
      expect(resolveRequestedConceptId(message, lesson, null)).toBe(expected)
    })
  }

  it('the deictic-clause exemption keeps E3 inert when the request names nothing', () => {
    // "explain it" governs only deixis, so E3 stands down and the earlier
    // mention is judged by the pre-existing filters alone — which is the whole
    // point of the exemption: E3 must not become the reason a topic named
    // before a request disappears.
    //
    // MEASURED AGAINST HEAD~ (git stash, before this change): a MULTI-WORD
    // topic before a deictic request already resolved and still does.
    expect(resolveRequestedConceptId('the mole concept, can you explain it', BEATS, null))
      .toBe('chem.found.mole-concept')
  })

  it('PRE-EXISTING, not caused by E3: a bare one-word topic before a request already named nothing', () => {
    // Verified by running the resolver at HEAD~ with these changes stashed:
    // "photosynthesis, can you explain it" returned null BEFORE E3 as well.
    // `isIncidentalWord` drops it because no REQUEST_CUE precedes the noun.
    // Pinned so a future reader does not mistake it for E3 fallout.
    expect(resolveRequestedConceptId('photosynthesis, can you explain it', BEATS, null))
      .toBeNull()
  })

  it('E3 is inert when the message carries no request phrase at all', () => {
    expect(resolveRequestedConceptId('mitochondria', 'bio.plant.photosynthesis', null))
      .toBe('bio.cell.mitochondria-energy')
  })
})

describe('F8 — E4: the wrong-subject correction ends the detour', () => {
  const OPEN_ON_ENGLISH: ExcursionState = {
    active: true,
    targetConceptId: ENGLISH_ASKING,
    targetTopicTitle: null,
    returnToConceptId: BEATS,
    turns: 1,
  }

  it('the detector now recognizes the production protest', () => {
    expect(isExplicitCorrection(P0_TURN5)).toBe(true)
  })

  it('it closes the excursion and returns the target to the lesson', () => {
    const decision = decideExcursion({
      state: OPEN_ON_ENGLISH,
      message: P0_TURN5,
      lessonConceptId: BEATS,
      // Even if the resolver HAD named the rejected target, this must close.
      requestedConceptId: ENGLISH_ASKING,
      knowledgeGapConceptId: null,
    })
    expect(decision.transition).toBe('closed-returned')
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(BEATS)
  })

  it('"I am not studying english" is recognized too', () => {
    expect(isExplicitCorrection('sir i am not studying english')).toBe(true)
  })

  it('DOES NOT fire on ordinary difficulty — a negated VERB is not a correction', () => {
    for (const said of [
      'i am studying this but i do not understand',
      'i am studying and i still do not know',
      'i am not sure sir',
      'i do not know',
      'not really',
      'this is wrong',
    ]) {
      expect(isExplicitCorrection(said), `false correction on: ${said}`).toBe(false)
    }
  })

  it('the existing "I meant X, not Y" REDIRECT is unchanged', () => {
    // A correction naming a DIFFERENT concept must still redirect to it, not
    // close to the lesson. This is the behaviour E4 must not disturb.
    const decision = decideExcursion({
      state: OPEN_ON_ENGLISH,
      message: 'i didnt mean that, i meant photosynthesis, not that',
      lessonConceptId: BEATS,
      requestedConceptId: 'bio.plant.photosynthesis',
      knowledgeGapConceptId: null,
    })
    expect(decision.state.active).toBe(true)
    expect(decision.targetConceptId).toBe('bio.plant.photosynthesis')
    expect(decision.state.returnToConceptId).toBe(BEATS)
  })

  it('a correction naming NOTHING still closes, exactly as before', () => {
    const decision = decideExcursion({
      state: OPEN_ON_ENGLISH,
      message: "that's not what i meant",
      lessonConceptId: BEATS,
      requestedConceptId: null,
      knowledgeGapConceptId: null,
    })
    expect(decision.transition).toBe('closed-returned')
  })

  it('an explicit return request is unaffected', () => {
    expect(isReturnRequest('please go back to beat frequency now')).toBe(true)
  })
})

describe('F9 — a REAL knowledge gap still claims KNOWLEDGE_GAP over RECOVERY', () => {
  it('the rung and its suppression set are untouched', () => {
    const decision = arbitrateTurn({
      knowledgeGapResolved: true,
      recoveryActive: true,
      learnerRequestActive: false,
      closing: false,
      completionReady: false,
    })
    expect(decision.owner).toBe('KNOWLEDGE_GAP')
    expect(decision.denied).toContain('RECOVERY_SCRIPT')
    expect(decision.overridden).toContain('RECOVERY')
  })

  it('and with no gap, RECOVERY still owns a distress turn', () => {
    const decision = arbitrateTurn({
      knowledgeGapResolved: false,
      recoveryActive: true,
      learnerRequestActive: false,
      closing: false,
      completionReady: false,
    })
    expect(decision.owner).toBe('RECOVERY')
  })
})

describe('F10 — R2 and R3 are unchanged', () => {
  it('R2: MAX_EXCURSION_TURNS is still 6 and still force-closes', () => {
    expect(MAX_EXCURSION_TURNS).toBe(6)
    const decision = decideExcursion({
      state: {
        active: true, targetConceptId: 'chem.found.mole-concept',
        targetTopicTitle: null, returnToConceptId: BEATS, turns: 6,
      },
      message: 'ok what about this',
      lessonConceptId: BEATS,
      requestedConceptId: null,
      knowledgeGapConceptId: null,
    })
    expect(decision.transition).toBe('closed-turn-limit')
  })

  it('R3: naming the lesson concept itself opens no excursion', () => {
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: 'explain beats and beat frequency',
      lessonConceptId: BEATS,
      requestedConceptId: BEATS,
      knowledgeGapConceptId: null,
    })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(BEATS)
  })
})

/**
 * F4 — CHARACTERIZATION, NOT A FIX.
 *
 * The brief asks that "thermal equilibrium" at `phys.therm.zeroth-law` should
 * not open a sibling excursion. That behaviour is E2, which is explicitly NOT
 * authorized in this change. E3 cannot reach it and was measured not to:
 * "thermal equilibrium" occurs AFTER the "what is" request phrase, so it is
 * inside the governed clause and the positional rule correctly stands down.
 *
 * These assertions therefore pin what the code ACTUALLY does today, so that
 * (a) the gap is visible rather than silently absent, and (b) implementing E2
 * later will fail these tests loudly and force them to be updated deliberately.
 */
describe('F4 — P1 survives: E2 is NOT implemented (characterization)', () => {
  const ZEROTH = 'phys.therm.zeroth-law'
  const ASK = 'sir i dont understand what is thermal equilibrium meaning. '
    + 'my english is weak please explain simple'

  it('STILL resolves to the sibling concept — this is the open P1', () => {
    expect(resolveRequestedConceptId(ASK, ZEROTH, null)).toBe('phys.therm.temperature')
  })

  it('STILL opens a prerequisite excursion, which still blocks the probe gate', () => {
    const gap = gapFor(ASK, ZEROTH)
    expect(gap?.relationship).toBe('prerequisite')
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: ASK,
      lessonConceptId: ZEROTH,
      requestedConceptId: 'phys.therm.temperature',
      knowledgeGapConceptId: gap?.conceptId ?? null,
    })
    expect(decision.transition).toBe('started')
    // gateTerms.notExcursion is `!excursionActive`; on the NEXT turn it is
    // therefore FALSE, which is precisely the 8-turn assessment block measured
    // in production. Asserted so the cost of leaving E2 unimplemented is
    // recorded in the suite rather than in a report nobody re-reads.
    expect(decision.state.active).toBe(true)
  })

  it('R2 still bounds that excursion at 6 turns — the only thing that saved the lesson', () => {
    const decision = decideExcursion({
      state: {
        active: true, targetConceptId: 'phys.therm.temperature',
        targetTopicTitle: null, returnToConceptId: ZEROTH, turns: MAX_EXCURSION_TURNS,
      },
      message: 'ok',
      lessonConceptId: ZEROTH,
      requestedConceptId: null,
      knowledgeGapConceptId: null,
    })
    expect(decision.transition).toBe('closed-turn-limit')
  })
})

describe('the concept index still builds', () => {
  it('all six subjects are present', () => {
    const prefixes = new Set(conceptIndex().map((e) => e.conceptId.split('.')[0]))
    expect(prefixes.size).toBeGreaterThanOrEqual(6)
  })
})
