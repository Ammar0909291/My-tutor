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
    expected: 'CERTIFIED',
    rationale:
      'The ONE physics concept in the eight-candidate probe that carries an ACTIVE VISUAL ' +
      'asset (family=VISUAL, status=ACTIVE, gradeBand=ADULT, measured 2026-09-03) alongside ' +
      'ACTIVE HIGH 1/5 and ADULT 1/5 explanation/probe coverage — meets the v1 asset contract ' +
      'on top of holding real, human-approved visual content, not a generated-on-the-fly ' +
      'figure this run would be the first ever request for. Matches the CLAUDE.md-documented ' +
      "2026-08-10 visualization-engine entries naming this exact concept (\"phys.mech." +
      'kinetic-energy — both graphs\") as one of the first two ACTIVE visual assets this ' +
      'project ever promoted.',
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
    expected: 'DIRTY_STATE',
    rationale:
      'Reuses Control 1 exactly (same worker W1, same concept, same account, deliberately NOT ' +
      'reset) per the governing protocol\'s own instruction. W1 has just carried this concept ' +
      'to mastery in Control 1; repeating it must be caught by I-2 detectDirtyState at turn 1 ' +
      '(verified-at-turn-1 and/or session-resumed-not-fresh) rather than silently re-taught or ' +
      'silently re-certified — proving the instrument refuses to certify a contaminated run.',
  },
] as const

export function controlByRole(role: ControlRole): ControlDefinition {
  const found = CONTROLS.find((c) => c.role === role)
  if (!found) throw new Error(`no control defined for role ${role}`)
  return found
}
