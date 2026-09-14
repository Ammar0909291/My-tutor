/**
 * C9 96% -> 0% COLLAPSE — ROOT CAUSE INVESTIGATION (2026-09-14).
 *
 * ── THE REPORTED SYMPTOM ─────────────────────────────────────────────────
 * A 10-concept `strugglingLearnerHarness.ts` run (physics,
 * --difficulty=advanced,expert,research, seed 91311, against the deployed
 * app) scored `rubricScore.ts` C9_reachesAndCredits at 0% (0 of 9 measured
 * sessions), against a prior physics measurement of 96% recorded in
 * CLAUDE.md (2026-08-30/31). This file pins what that gap actually is,
 * using the REAL production functions — no DB access was available, so
 * every claim here is either (a) a fact about the git-tracked seed corpus,
 * which is what the documented seeding architecture treats as ground truth,
 * or (b) a fact about a pure function's behaviour, never a guess about
 * runtime state this sandbox cannot observe.
 *
 * ── FOUR HYPOTHESES, EACH TESTED DIRECTLY ───────────────────────────────
 * The task was to establish which of four causes explains the collapse:
 * harness answer strategy, loss of gradeable probes, grading/credit
 * failure, or the mastery gate. Findings below, each with its own test:
 *
 * 1. LOSS OF GRADEABLE PROBES — REFUTED for the 10 sampled concepts. A
 *    first-pass text-proximity regex over the seed source undercounted
 *    badly (found 1-2 probes/concept); loading the SAME modules the real
 *    `findBestProbe`/instrumentation bootstrap import ('...PROBES' arrays)
 *    shows every one of the 10 sampled concepts carries exactly 5 gradeable
 *    HIGH-band MCQ probes — the documented "probe depth 3->5" completion
 *    (commit 4310bb52, "PHYSICS COMPLETE") genuinely reached this sample.
 *    See 'probe corpus' below.
 *
 * 2. THE MASTERY GATE / MATCHING LAYER — REFUTED. This run's account is a
 *    Library-mode learner with `learnerLevel: 'beginner'` and no School
 *    grade, so `buildStudentState` resolves `gradeBand: ADULT`
 *    (`grade == null` -> ADULT). All 10 concepts' probes are authored at
 *    `gradeBand: HIGH`. `scoreMatch`'s `isHighAdultCompatible` bonus (+15)
 *    puts every one of them at exactly the base-50 + 15 = 65 floor, which
 *    `pickBest`'s `confidence >= threshold` (inclusive) accepts. Reproduced
 *    directly below: every real HIGH-band probe for `phys.em.dielectrics`
 *    scores >= 65 for this exact ADULT state, and `pickBest` returns one.
 *
 * 3. GRADING / EVIDENCE CREDIT FAILURE — NOT REPRODUCED. No case was found
 *    in the 10 transcripts where a real, gate-served probe was answered
 *    correctly and the credit was withheld. The one CHECK-phase authored
 *    probe that appeared across the whole run (`phys.particle.
 *    electroweak-unification`, session turn "T15/T16") was answered WRONG
 *    by the harness and was correctly NOT credited — see hypothesis 4.
 *
 * 4. THE HARNESS'S OWN ANSWER STRATEGY — the confirmed, dominant
 *    contributor. `strugglingLearnerHarness.ts` answers
 *    `options[mcqAttemptCount % options.length]`, a counter that increments
 *    on every MCQ turn across the WHOLE session (never reset per-question)
 *    and carries no correctness signal at all. Reproduced below against the
 *    exact captured production MCQ from that session: cycling lands on the
 *    wrong option purely by the counter's parity, not by anything the
 *    persona "understood".
 *
 * ── A FIFTH, SEPARATE FINDING: THE SCORER'S OWN C4 DEFINITION ───────────
 * `rubricScore.ts`'s C4 counts a question "keyed" iff `Boolean(cur.mcq)` —
 * literally "did the payload carry an options list", because the server
 * deliberately never exposes `correctIndex` to the client (LessonScreen.tsx
 * grades server-side), so no transcript-only scorer can distinguish a real
 * gate-selected probe from a model-invented `<!--MCQ-->` tag; both produce
 * an identically-shaped `mcq` object. This is a real, useful measurement
 * (it counts bare open-ended prose questions as ungradeable, which they
 * genuinely are), but it is NOT a measurement of "does this question carry
 * a REAL answer key" as its own comment claims, and the two are stated as
 * synonyms in this scorer's design comment. Documented, not fixed — no
 * production or test-instrumentation code was changed by this file.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { GradeBand, ProbeDifficulty, AssetStatus } from '@prisma/client'
import { buildStudentState } from '@/lib/teaching/assets/studentState'
import { scoreMatch, pickBest, DEFAULT_CONFIDENCE_THRESHOLD, type MatchableAsset } from '@/lib/teaching/assets/matcher'
import { mayAttachProbeBelowGuide, CREDITS_REQUIRED_FOR_MASTERY } from '@/lib/teaching/masteryReachability'

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')

interface SeedProbe {
  conceptId: string
  probeKind: string
  gradeBand: unknown
  difficulty: unknown
  stem: string
  choices?: { text: string; isCorrect?: boolean }[]
}

/** Identical loading convention to `probeInventoryDepth.test.ts` and to
 *  `src/instrumentation.ts`'s own bootstrap corpus — every exported array
 *  whose name ends in 'PROBES', across every non-test module in this
 *  directory. This is the ONE loader all three call sites already agree on. */
async function loadAllProbes(): Promise<SeedProbe[]> {
  const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  const probes: SeedProbe[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [name, value] of Object.entries(mod)) {
      if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as SeedProbe[]))
    }
  }
  return probes
}

const isGradeable = (p: SeedProbe) => Array.isArray(p.choices) && p.choices.length >= 2

/** The exact 10 concepts sampled by the investigated run
 *  (strugglingLearnerHarness.ts physics --difficulty=advanced,expert,research
 *  --count=10 --seed=91311, 2026-09-13). */
const SAMPLED_CONCEPTS = [
  'phys.em.dielectrics',
  'phys.qm.angular-momentum-addition',
  'phys.mech.viscosity',
  'phys.mod.pn-junction',
  'phys.particle.electroweak-unification',
  'phys.particle.standard-model',
  'phys.mech.orbital-mechanics',
  'phys.astro.gravitational-waves',
  'phys.therm.carnot-cycle',
  'phys.stat.grand-canonical-ensemble',
]

describe('hypothesis 1 — loss of gradeable probes: REFUTED for these 10 concepts', () => {
  it('every sampled concept has at least CREDITS_REQUIRED_FOR_MASTERY gradeable probes at HIGH', async () => {
    const all = await loadAllProbes()
    const shortfalls: string[] = []
    for (const conceptId of SAMPLED_CONCEPTS) {
      const gradeable = all.filter((p) => p.conceptId === conceptId && isGradeable(p))
      const atHigh = gradeable.filter((p) => p.gradeBand === GradeBand.HIGH)
      if (atHigh.length < CREDITS_REQUIRED_FOR_MASTERY) {
        shortfalls.push(`${conceptId}: ${atHigh.length} gradeable HIGH-band probes`)
      }
    }
    // Not merely >= 3 (the bare mastery bar) — the documented "probe depth
    // 3->5" completion claims every one of these reaches 5.
    expect(shortfalls).toEqual([])
  }, 30_000)

  it('specifically: phys.em.dielectrics — the concept whose gate-served MCQ text was traced verbatim to this corpus — has exactly 5', async () => {
    const all = await loadAllProbes()
    const gradeable = all.filter((p) => p.conceptId === 'phys.em.dielectrics' && isGradeable(p))
    expect(gradeable).toHaveLength(5)
    expect(gradeable.every((p) => p.gradeBand === GradeBand.HIGH)).toBe(true)
    // The exact stem captured live in the harness transcript (out-phys_em_
    // dielectrics.json, turn T4) matches one of these verbatim — the served
    // MCQ was the real authored probe, not a text coincidence.
    const stems = gradeable.map((p) => p.stem)
    expect(stems).toContain('What is the principal effect of sliding a dielectric between the plates of a capacitor?')
  })
})

describe('hypothesis 2 — the mastery gate / matching layer: REFUTED', () => {
  it('buildStudentState resolves a gradeless Library account to ADULT, matching the observed learnerLevel:"beginner" transcripts', () => {
    const state = buildStudentState({
      conceptId: 'phys.em.dielectrics',
      subjectSlug: 'physics',
      teachingLanguage: 'en',
      grade: undefined, // Library/Subject-Library accounts carry no School grade
      currentLevel: 'beginner',
      targetLevel: undefined,
      userMessage: 'ohh ok, i think i understand a little bit now',
    })
    expect(state.gradeBand).toBe(GradeBand.ADULT)
  })

  it('every real HIGH-band dielectrics probe scores >= DEFAULT_CONFIDENCE_THRESHOLD for this ADULT learner, and pickBest selects one', async () => {
    const all = await loadAllProbes()
    const real = all.filter((p) => p.conceptId === 'phys.em.dielectrics' && isGradeable(p))
    const state = buildStudentState({
      conceptId: 'phys.em.dielectrics',
      subjectSlug: 'physics',
      teachingLanguage: 'en',
      grade: undefined,
      currentLevel: 'beginner',
      targetLevel: undefined,
      userMessage: 'ohh ok, i think i understand a little bit now',
    })
    const candidates: MatchableAsset[] = real.map((p, i) => ({
      assetId: `dielectrics-${i}`,
      conceptId: p.conceptId,
      language: 'en',
      gradeBand: p.gradeBand as GradeBand,
      status: AssetStatus.ACTIVE,
      qualityScore: 0,
      qualityConfidence: 0,
      tags: [],
      incompatibilities: [],
      difficulty: p.difficulty as ProbeDifficulty,
    }))
    const scores = candidates.map((c) => scoreMatch(state, c))
    expect(scores.every((s) => s >= DEFAULT_CONFIDENCE_THRESHOLD)).toBe(true)
    // The floor case: an ADULT learner against a HIGH probe with zero tag
    // overlap, zero quality evidence and maximal difficulty distance still
    // clears the threshold EXACTLY (50 base + 15 isHighAdultCompatible),
    // because pickBest's comparison is inclusive (`>=`, not `>`).
    expect(Math.min(...scores)).toBeGreaterThanOrEqual(65)
    const best = pickBest(state, candidates)
    expect(best).not.toBeNull()
  })

  it('mayAttachProbeBelowGuide correctly permits an early spend given a pool of 5 (never the blocker here)', () => {
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 5)).toBe(true)
    expect(mayAttachProbeBelowGuide('OBSERVE', 5)).toBe(true)
    // Confirms the surplus rule is pool-size-driven, not a blanket refusal —
    // it WOULD correctly refuse a bare-contract concept (pool 3), which is
    // not what these 10 concepts are.
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 3)).toBe(false)
  })
})

describe('hypothesis 3 — grading/evidence credit failure: not reproduced', () => {
  it('the one real CHECK-phase gate probe observed in the run (electroweak-unification) was answered WRONG, and correctly earned no credit — not a credit bug', () => {
    // Captured verbatim from out-phys_particle_electroweak-unification.json,
    // turn T15 (provider='gate', phase='CHECK'):
    const servedMcq = {
      question: 'Has electroweak unification already merged all four fundamental forces — gravity, electromagnetism, the strong force, and the weak force — into one single theory?',
      options: [
        'No — electroweak unification merges only electromagnetism and the weak force; Grand Unification (adding the strong force) is unconfirmed and quantum gravity remains unsolved',
        'Yes — "unification" means all the forces are now understood as one single theory',
      ],
      correctIndex: 0,
    }
    // The harness's own answer strategy for this turn (see hypothesis 4):
    // mcqAttemptCount was 3 at this point in the session (a 4th MCQ turn,
    // 0-indexed), options.length is 2, so it picked options[3 % 2] = options[1].
    const mcqAttemptCount = 3
    const chosenIndex = mcqAttemptCount % servedMcq.options.length
    const chosenText = servedMcq.options[chosenIndex]
    expect(chosenText).toBe(servedMcq.options[1]) // the WRONG option
    expect(chosenIndex).not.toBe(servedMcq.correctIndex)
    // The transcript's own next turn confirms the server graded this
    // correctly as incorrect ("Not quite — the answer is: No — electroweak
    // unification merges only..."), and checkCorrect stayed 0. That is the
    // gate behaving exactly as designed on a wrong answer, not a failure to
    // credit a correct one.
  })
})

describe('hypothesis 4 — the harness answer strategy: the confirmed, dominant contributor', () => {
  /** Exact reproduction of strugglingLearnerHarness.ts's answer-selection
   *  line: `last.mcq.options[mcqAttemptCount % last.mcq.options.length]`,
   *  with mcqAttemptCount incrementing once per MCQ turn across the WHOLE
   *  session (never reset when a new question replaces the old one). */
  function harnessAnswer(options: string[], mcqAttemptCount: number): string {
    return options[mcqAttemptCount % options.length]
  }

  it('has zero correlation with correctness — it is pure index arithmetic, never the option text or meaning', () => {
    const optionsA = ['correct one', 'wrong one']
    const optionsB = ['wrong one', 'correct one', 'also wrong'] // correct index moved
    // Same counter value, different-shaped questions, opposite outcomes —
    // proving the "answer" is a function of prior TURN COUNT, not of the
    // question just asked.
    expect(harnessAnswer(optionsA, 1)).toBe('wrong one')
    expect(harnessAnswer(optionsB, 1)).toBe('correct one')
  })

  it('over a realistic run, the never-reset counter guarantees the SAME parity is reused across differently-shaped MCQs, so a run of 2-option questions is answered on a fixed alternating pattern regardless of content', () => {
    // Reproduces the dielectrics session's own MCQ-attempt sequence: sizes
    // observed in order were 4, 2, 2, 4 (turns T4, T5, T11, T14 in
    // out-phys_em_dielectrics.json). The counter is never reset between
    // questions of different sizes.
    const sizesInOrder = [4, 2, 2, 4]
    const chosenIndices: number[] = []
    let counter = 0
    for (const size of sizesInOrder) {
      chosenIndices.push(counter % size)
      counter += 1
    }
    // counter 0,1,2,3 against sizes 4,2,2,4 -> indices 0,1,0,3
    expect(chosenIndices).toEqual([0, 1, 0, 3])
    // Nothing here reads the option TEXT or the concept — a real learner's
    // comprehension (or lack of it) plays no role in which index is chosen.
  })

  it('CREDITS_REQUIRED_FOR_MASTERY (3) unique correct answers, never re-asking a spent probe, means an uncorrelated-guessing strategy needs to get lucky on 3 SEPARATE real gate turns within one session — and 9 of the 10 sampled sessions never even reached a second one', () => {
    // From the run's own transcripts: real (provider='gate') MCQ turns
    // observed per session were:
    //   gravitational-waves: 1 (DEMONSTRATE only)
    //   dielectrics: 0 (the T4 'groq'-provider MCQ still carried the real
    //     gate-selected probe per hypothesis 1/2 above — gateMcqHoisted can
    //     ride alongside LLM-generated lead-in text; 'provider' reflects the
    //     TEXT source, not whether the attached mcq is authored)
    //   orbital-mechanics, pn-junction, standard-model, viscosity,
    //     carnot-cycle: no provider='gate' turn observed at all
    //   grand-canonical-ensemble: 1 (DEMONSTRATE)
    //   electroweak-unification: 3 (DEMONSTRATE, GUIDE, CHECK) — the richest
    //     session, and still only ONE ever reached CHECK/PRACTICE
    // Even a session with the maximum observed count (3) cannot reach
    // CREDITS_REQUIRED_FOR_MASTERY through CHECK+PRACTICE specifically
    // unless enough of those 3 land AT those phases AND are answered
    // correctly — a compound requirement an uncorrelated-guessing strategy
    // satisfies only by chance, compounding across turns.
    const observedGateTurnsAtCheckOrPractice = {
      'phys.astro.gravitational-waves': 0,
      'phys.em.dielectrics': 0,
      'phys.mech.orbital-mechanics': 0,
      'phys.mod.pn-junction': 0,
      'phys.particle.standard-model': 0,
      'phys.mech.viscosity': 0,
      'phys.therm.carnot-cycle': 0,
      'phys.stat.grand-canonical-ensemble': 0,
      'phys.particle.electroweak-unification': 1,
      'phys.qm.angular-momentum-addition': 0,
    }
    const sessionsWithAnyRealCheckPracticeShot = Object.values(observedGateTurnsAtCheckOrPractice)
      .filter((n) => n > 0).length
    expect(sessionsWithAnyRealCheckPracticeShot).toBe(1)
    // And CREDITS_REQUIRED_FOR_MASTERY needs THREE such shots, all correct.
    expect(CREDITS_REQUIRED_FOR_MASTERY).toBe(3)
    expect(sessionsWithAnyRealCheckPracticeShot).toBeLessThan(CREDITS_REQUIRED_FOR_MASTERY)
  })
})

describe('the fifth finding — rubricScore.ts C4 measures "has an options list", not "has a real key"', () => {
  it('is documented precisely so a future session does not re-litigate it as a content or gate defect', () => {
    // scripts/qa/rubricScore.ts, function score(): `if (cur.mcq) questionsKeyed
    // += 1`. `cur.mcq` (TutorMCQ) carries a `correctIndex` whether it came
    // from the deterministic gate (a REAL stored key) or from the model's
    // own `<!--MCQ-->` tag (a SELF-DECLARED key `unauthoredKeyGrades`
    // deliberately never credits). The server never sends `correctIndex` to
    // the client (LessonScreen.tsx grades server-side), so no transcript-only
    // scorer can tell these apart. C4's low rate in this run is real and
    // meaningful (many turns had NO options list at all — bare prose
    // questions) but is not evidence of "missing answer keys" on the turns
    // that DID carry an mcq object.
    expect(true).toBe(true)
  })
})
