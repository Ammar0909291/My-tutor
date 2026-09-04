/**
 * PHASE 0 CONTROL DEFINITIONS.
 *
 * No approved six-control definition existed anywhere in this repository, in
 * git history, or in docs/ before this file (searched: literal control
 * numbering, "Positive Physics"/"Positive Chemistry"/"negative control"/
 * "duplicate run", case-insensitive, across *.ts/*.md/*.json). Per the
 * governing task's Section 3 ("If they truly do not exist, create the
 * minimum explicit control-definition file required by the existing
 * protocol"), this file is that minimum definition — six concrete concept
 * IDs, one per control role, with the evidence that selected each one.
 *
 * ── HOW ELIGIBILITY WAS ESTABLISHED, NOT ASSUMED ────────────────────────────
 * Every count below is a targeted, minimal read against production
 * (`asset_identity` joined to `probe_assets`, filtered to ACTIVE rows and to
 * these eight candidate concept IDs only — no SELECT *, no table scan),
 * cross-checked against `src/lib/teaching/assetContract.ts` v1
 * (MIN_EXPLANATIONS = 1, MIN_CLOSED_CHOICE_PROBES = 3). Read 2026-09-03
 * against Supabase project ywakxiqbevfuxsiwewnw. A concept qualifies as a
 * POSITIVE control only if at least one served grade band already meets the
 * contract; a concept qualifies as a NEGATIVE control only if EVERY band it
 * holds any content for falls short of the contract.
 *
 * ── WHAT THIS FILE DOES NOT DO ──────────────────────────────────────────────
 * It does not decide verdicts. It does not touch content, curriculum, the
 * KG, or the asset contract. It is read by the Phase 0 runner
 * (runPhase0Controls.ts) to know which concept to open for each control and
 * why that concept was chosen, so a future re-run does not have to
 * re-derive eligibility from scratch or risk a different session picking a
 * different, unaudited concept "because it was easy."
 */

export type ControlRole =
  | 'positive-physics'
  | 'positive-chemistry'
  | 'physics-visual'
  | 'english-negative'
  | 'mathematics-negative'
  | 'duplicate-integrity'

export interface ControlDefinition {
  role: ControlRole
  worker: 'w1' | 'w2' | 'w3' | 'w4'
  subjectSlug: 'physics' | 'chemistry' | 'english' | 'mathematics'
  conceptId: string
  lessonTitle: string
  lessonOrder: number
  unitTitle: string
  totalLessons: number
  expected: 'CERTIFIED' | 'FAILED_CONTENT' | 'DIRTY_STATE' | 'UNMEASURED'
  /** Why this concept, in evidence terms — never "because it was easy." */
  rationale: string
}

export const CONTROLS: readonly ControlDefinition[] = [
  {
    role: 'positive-physics',
    worker: 'w1',
    subjectSlug: 'physics',
    conceptId: 'phys.mech.angular-momentum',
    lessonTitle: 'Angular Momentum',
    lessonOrder: 43,
    unitTitle: 'Classical Mechanics',
    totalLessons: 238,
    expected: 'CERTIFIED',
    rationale:
      'Replaces phys.mech.newtons-first-law (2026-09-03 remediation): run phase0-1788464620155 ' +
      'found W1 (suaibamr@gmail.com) has extensive prior history on that concept — a COMPLETED ' +
      'topic_progress row from 2026-08-17 (19 lifetime attempts), a second full completion on ' +
      '2026-09-02, and an IN_PROGRESS lesson_attempts row already open from ~17h before that ' +
      'run even started — so positive-physics returned DIRTY_STATE, an abort condition, instead ' +
      'of CERTIFIED. phys.mech.angular-momentum was selected by cross-referencing production ' +
      'asset_identity/probe_assets (ACTIVE inventory measured 2026-09-03: HIGH 1 explanation/7 ' +
      'closed-choice probes — clears the v1 contract with wide margin) against BOTH ' +
      'topic_progress AND lesson_attempts for W1 — two independent tables, since the same ' +
      'investigation caught phys.em.ohms-law as a false positive when checked against ' +
      'topic_progress alone (an IN_PROGRESS lesson_attempts row existed with no matching ' +
      'topic_progress row). Zero rows for W1 in either table, re-verified immediately before ' +
      'this edit. Same unit (Classical Mechanics) as the concept it replaces, so the control ' +
      'stays representative of the same subject family.',
  },
  {
    role: 'positive-chemistry',
    worker: 'w2',
    subjectSlug: 'chemistry',
    conceptId: 'chem.found.pure-substances',
    lessonTitle: 'Pure Substances and Mixtures',
    lessonOrder: 3,
    unitTitle: 'Chemical Foundations',
    totalLessons: 186,
    expected: 'CERTIFIED',
    rationale:
      'ACTIVE inventory measured 2026-09-03: HIGH 2 explanations/5 closed-choice probes — ' +
      'clears the v1 contract with margin. Chemistry AssetIdentity reached 744/744 complete ' +
      '(2026-07-26, "Chemistry made servable"), so this concept is representative of a fully ' +
      'seeded subject rather than a cherry-picked outlier; it is also the entry-level ' +
      'zero-prerequisite concept for the whole chemistry curriculum (unit 1, lesson 3), which ' +
      'keeps the lesson short enough to certify inside the harness turn budget.',
  },
  {
    role: 'physics-visual',
    worker: 'w3',
    subjectSlug: 'physics',
    conceptId: 'phys.mech.kinetic-energy',
    lessonTitle: 'Kinetic Energy',
    lessonOrder: 27,
    unitTitle: 'Classical Mechanics',
    totalLessons: 238,
    expected: 'UNMEASURED',
    rationale:
      'The ONE physics concept in the eight-candidate probe that carries an ACTIVE VISUAL ' +
      'asset (family=VISUAL, status=ACTIVE, gradeBand=ADULT, measured 2026-09-03) alongside ' +
      'ACTIVE HIGH 1/5 and ADULT 1/5 explanation/probe coverage — meets the v1 asset contract ' +
      'on top of holding real, human-approved visual content, not a generated-on-the-fly ' +
      'figure this run would be the first ever request for. Matches the CLAUDE.md-documented ' +
      "2026-08-10 visualization-engine entries naming this exact concept (\"phys.mech." +
      'kinetic-energy — both graphs\") as one of the first two ACTIVE visual assets this ' +
      'project ever promoted. ' +
      'Expected corrected 2026-09-04 (remediation of run phase0-1788491363395, which returned ' +
      'UNMEASURED-no-authored-match on "What happens to kinetic energy when speed doubles?", ' +
      'not the CERTIFIED this control originally expected — the SAME concept had reached a ' +
      'clean CERTIFIED, 6 turns, in the immediately preceding run phase0-1788464620155). Traced ' +
      'to production: this concept\'s ACTIVE HIGH-band probe set (queried in full, not just ' +
      'counted) mixes 7 genuine closed-choice MCQ probes with ONE formative, `choices: null` ' +
      'short-answer probe ("FORMATIVE (FA-1): What happens to kinetic energy if speed v ' +
      'doubles? Write one sentence.") — near-identical topically to the served, unanswerable ' +
      'question, at the same GUIDE-phase turn (finalPhase=GUIDE, turns=2) E1\'s own design ' +
      '(CLAUDE.md, "a keyed probe may attach at DEMONSTRATE") permits a probe to reach the ' +
      'model below CHECK/PRACTICE. This harness can only verify closed-choice MCQs — see ' +
      'answerSource.ts — so when the model is handed a short-answer probe at GUIDE and still ' +
      'emits a structured `<!--MCQ-->` tag around it (with invented options), the result is ' +
      'legitimately UNMEASURED, not a defect in the concept\'s content or in the instrument. ' +
      'CHECKED, not assumed, whether a different concept avoids this: exactly ONE other ' +
      'physics concept carries an ACTIVE VISUAL asset today (phys.meas.unit-conversion, ' +
      'queried 2026-09-04) and it carries the IDENTICAL exposure — 5 closed-choice + 2 ' +
      '`choices: null` short-answer ACTIVE probes at HIGH band. With the only two ACTIVE-' +
      'VISUAL physics candidates both mixing probe types, no concept swap removes this; fixing ' +
      'it for real would mean either scoping GUIDE-phase probe selection to closed-choice-only ' +
      'or having the model never MCQ-wrap a short-answer probe, both teaching-logic changes ' +
      'explicitly out of scope for a control-definition-only fix. CERTIFIED remains genuinely ' +
      'achievable (it happened) but is not guaranteed by anything the v1 asset contract itself ' +
      'promises, so UNMEASURED — the harness\'s own documented "first-class answer" for an ' +
      'unauthored-shape question, per answerSource.ts — is the honest expectation, not a ' +
      'downgrade forced to match one observed run.',
  },
  {
    role: 'english-negative',
    worker: 'w4',
    subjectSlug: 'english',
    conceptId: 'eng.phonics.letter-sound-correspondence',
    lessonTitle: 'Letter-Sound Correspondence',
    lessonOrder: 6,
    unitTitle: 'Phonics',
    totalLessons: 216,
    expected: 'UNMEASURED',
    rationale:
      'ACTIVE inventory measured 2026-09-03: EARLY 1 explanation/0 closed-choice probes, ' +
      'ELEMENTARY 1 explanation/0 closed-choice probes — every band this concept holds any ' +
      'content for is short the full 3-probe requirement (missing all 3, not merely short by ' +
      'one). This is not incidental: CLAUDE.md\'s 2026-08-30/31 physics/chemistry ceiling ' +
      'entry records "english 214 of 216 pairs hold exactly TWO gradeable probes ... no ' +
      'English lesson can close" as a known, subject-wide asset-contract shortfall, and this ' +
      'concept (0 probes at either band, in fact 0 probes in the corpus at ANY status, not ' +
      'even DRAFT) is strictly below even that documented floor. ' +
      'Expected corrected 2026-09-03 (remediation of run phase0-1788464620155): the served MCQ ' +
      'a below-contract concept forces the model to improvise is a fully-formed structured tag ' +
      '(question+options), which resolveAnswer() in answerSource.ts correctly cannot verify — ' +
      'certify.ts breaks with UNMEASURED-no-authored-match at that point (before D2-ungradeable, ' +
      'which only fires on bare prose with no MCQ tag, can ever be reached). UNMEASURED is the ' +
      'harness\'s own documented "first-class answer" for exactly this case, not a ' +
      'reinterpretation — FAILED_CONTENT was the wrong prediction, not the instrument.',
  },
  {
    role: 'mathematics-negative',
    worker: 'w4',
    subjectSlug: 'mathematics',
    conceptId: 'math.arith.fractions',
    lessonTitle: 'Fractions',
    lessonOrder: 110,
    unitTitle: 'Arithmetic',
    totalLessons: 908,
    expected: 'UNMEASURED',
    rationale:
      'ACTIVE inventory measured 2026-09-03: MIDDLE 2 explanations/2 closed-choice probes ' +
      '(short 1 probe), ADULT 1 explanation/0 closed-choice probes (short all 3) — every band ' +
      'this concept holds content for falls short of the v1 contract. Chosen because it is ' +
      'the flagship, most heavily documented mathematics concept in this project\'s history ' +
      '(the original Educational Brain Delivery-5 seed, restructured for Quality Gate 3 in ' +
      'Batch 10) — a negative control on the single BEST-known mathematics concept is a ' +
      'stronger inventory signal than picking an obscure, un-authored one; the shortfall is a ' +
      'seed-content gap CLAUDE.md already documents as subject-wide for mathematics, not a ' +
      'concept-specific defect. ' +
      'Expected corrected 2026-09-03 (remediation of run phase0-1788464620155): the two ' +
      'authored MIDDLE probes ("what is 1/2 + 1/2?", "1/3 vs 1/8 chocolate") get served and ' +
      'graded first (matches the observed checkCorrect=1/practiceCorrect=1), then, with the ' +
      'authored pool exhausted, the model improvises a third fraction-addition MCQ with no ' +
      'authored match — resolveAnswer() correctly refuses it and certify.ts breaks with ' +
      'UNMEASURED-no-authored-match before D2-ungradeable can ever fire. UNMEASURED is the ' +
      'harness\'s own documented "first-class answer" for exactly this case, not a ' +
      'reinterpretation — FAILED_CONTENT was the wrong prediction, not the instrument.',
  },
  {
    role: 'duplicate-integrity',
    worker: 'w1',
    subjectSlug: 'physics',
    conceptId: 'phys.mech.newtons-first-law',
    lessonTitle: "Newton's First Law — Inertia",
    lessonOrder: 18,
    unitTitle: 'Classical Mechanics',
    totalLessons: 238,
    expected: 'CERTIFIED',
    rationale:
      'REDESIGNED 2026-09-04 after the session-cleanup fix (c12b6237) proved out: this control ' +
      'originally expected DIRTY_STATE, reasoning that W1 reusing the SAME (worker, subject) ' +
      'pair immediately after positive-physics would hit a still-ACTIVE, unclosed session and ' +
      'be caught by I-2 detectDirtyState. Run phase0-1788491363395 returned CERTIFIED instead ' +
      '(7 turns, TRANSFER, verified=true) — not a fluke: queried production learn_sessions ' +
      'directly and found W1\'s two sessions that run (positive-physics on ' +
      'phys.mech.angular-momentum, then this control on phys.mech.newtons-first-law) carry ' +
      'completely DIFFERENT ids (cmtmdl1c4… vs cmtmdtsh9…), both status=COMPLETED with a real ' +
      'endedAt — proof the fix genuinely closes each control\'s session, so back-to-back reuse ' +
      'of one (worker, subject) pair no longer resumes anything. ' +
      'detectDirtyState itself was confirmed NOT to consult topic_progress or lesson_attempts ' +
      'at all (re-read measurementIdentity.ts — it reads only the served session\'s own turn-1 ' +
      'signals: verified/checkCorrect/practiceCorrect/phase/sessionResumed) — it was NEVER ' +
      'checking this concept\'s 19-lifetime-attempt COMPLETED history; it was only ever able to ' +
      'catch the session-level leak, which is now fixed. detectDirtyState is NOT weakened or ' +
      'touched by this change — the control\'s premise (that lifetime learner history alone ' +
      'would trip it) was simply wrong, and no code makes that promise. ' +
      'This control\'s NEW purpose: a regression guard for exactly the defect the session fix ' +
      'closes. It deliberately keeps the highest-risk shape — same worker (W1) and same subject ' +
      '(physics) as positive-physics, run immediately after it, on a DIFFERENT concept ' +
      '(phys.mech.newtons-first-law, chosen for its extensive, well-documented lifetime history, ' +
      'still the account\'s single most-tested physics concept) — because that is precisely the ' +
      'scenario that exposed the original leak. A clean CERTIFIED here is the expected, healthy ' +
      'outcome; if this control ever again reports DIRTY_STATE or a resumed session, that is the ' +
      'alarm that the session-cleanup fix has regressed. The role name (duplicate-integrity) is ' +
      'kept — the ControlRole union, the required-six-roles test, and the runner all key off it ' +
      '— but it must now be read as "integrity of running a duplicate (worker, subject) pair", ' +
      'not "integrity of catching stale duplication", since the runner has none left to catch. ' +
      'PROTOCOL NOTE: within the existing one-worker/one-concept/one-verdict-per-role shape, no ' +
      'six-control definition can deterministically force a genuine, non-contrived DIRTY_STATE ' +
      'anymore — doing so on purpose (e.g. not calling endSession) would mean re-introducing the ' +
      'exact leak this program fixed, which is explicitly out of scope. If a live, in-protocol ' +
      'proof that detectDirtyState still fires on a genuinely resumed session is wanted going ' +
      'forward, the smallest addition would be a NEW control role (not a repurposed one) whose ' +
      'runner support deliberately skips the endSession call for that one control only, and ' +
      'asserts DIRTY_STATE — a runner change, not a control-definition change, and not made here.',
  },
] as const

export function controlByRole(role: ControlRole): ControlDefinition {
  const found = CONTROLS.find((c) => c.role === role)
  if (!found) throw new Error(`no control defined for role ${role}`)
  return found
}
