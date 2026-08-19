/**
 * Wave 0 Step 1 (Migration Blueprint Phase 0): the authored Educational
 * Brain concept entries, extracted as seedable Knowledge Assets.
 *
 * Every asset below is HUMAN-AUTHORED content transcribed from a frozen
 * `educational-brain/concepts/` entry — the exact file and section is cited
 * on each item. Nothing here is invented: this module is a data-only
 * transcription layer between the Brain (markdown, unreachable at runtime)
 * and the AssetIdentity catalogue (queryable by assembleLesson()).
 *
 * canonicalSlug convention for seeded assets: the capture pipeline builds
 * `${conceptId}:${familyKind}:${language}`; seeds append `:${gradeBand}`
 * so each grade-band variant forms its own lineage and ADR 14 §4.1's
 * one-ACTIVE-per-canonicalSlug invariant holds per variant. Retrieval
 * (findBestExplanation/findBestProbe) never parses the slug — it queries
 * by conceptId + language + status — so the suffix is invisible to the
 * hot path and only scopes the lineage/versioning rules.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { ExplanationKind, ProbeKind, ProbeChoice } from './assetIdentity'

export interface SeedExplanation {
  conceptId: string
  subjectSlug: string
  familyKind: ExplanationKind
  gradeBand: GradeBand
  content: string
  targetedMisconceptions: string[]
  /** educational-brain source file + section (traceability, Wave 0 rule) */
  source: string
}

export interface SeedProbe {
  conceptId: string
  subjectSlug: string
  probeKind: ProbeKind
  gradeBand: GradeBand
  stem: string
  choices?: ProbeChoice[]
  correctValue?: string
  difficulty: ProbeDifficulty
  targetedMisconceptions: string[]
  source: string
}

export const SEED_LANGUAGE = 'en'
export const SEED_AUTHOR_ID = 'EDUCATIONAL_BRAIN_SEED'

export function seedCanonicalSlug(
  conceptId: string,
  familyKind: string,
  gradeBand: GradeBand,
  difficulty?: ProbeDifficulty | null,
): string {
  const base = `${conceptId}:${familyKind}:${SEED_LANGUAGE}:${gradeBand.toLowerCase()}`
  return difficulty ? `${base}:${String(difficulty).toLowerCase()}` : base
}

/**
 * Ladder-aware probe slug resolver — ADR 14 §13 (Remediation Item 6).
 *
 * A "difficulty ladder" is several probes deliberately authored for one
 * (conceptId, probeKind, gradeBand) slot at different ProbeDifficulty rungs.
 * ADR 14 §4.5 allows at most one ACTIVE asset per canonicalSlug, so rungs can
 * only coexist if difficulty participates in the identity.
 *
 * Difficulty is appended ONLY to slots that actually carry a ladder:
 *
 *   singleton slot  ->  conceptId:kind:lang:band            (UNCHANGED)
 *   ladder slot     ->  conceptId:kind:lang:band:difficulty (extended)
 *
 * so every already-authored singleton — which today is every probe in
 * mathematics, chemistry, biology, computer science and English, and the
 * majority of physics — keeps the identity it already has. Only the rungs
 * that currently collide gain a segment.
 *
 * TRADE-OFF, stated explicitly: this makes a probe's identity a function of
 * the dataset it ships in, not of the probe alone. Adding a second rung to a
 * previously-singleton slot changes that slot's identity and orphans its
 * seeded row, so such a slot must be re-seeded. The alternative — appending
 * difficulty unconditionally — is sibling-independent but re-identifies all
 * 2,483 probes across all six subjects, which is the larger break. Item 3's
 * fail-fast validation makes the resolver's input deterministic and
 * duplicate-free, so the resolution is reproducible across all three writers.
 */
export function buildProbeSlugResolver<
  T extends { conceptId: string; probeKind: string; gradeBand: GradeBand; difficulty: ProbeDifficulty },
>(probes: readonly T[]): (probe: T) => string {
  const slotCounts = new Map<string, number>()
  for (const p of probes) {
    const base = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
    slotCounts.set(base, (slotCounts.get(base) ?? 0) + 1)
  }
  return (probe: T) => {
    const base = seedCanonicalSlug(probe.conceptId, probe.probeKind, probe.gradeBand)
    return (slotCounts.get(base) ?? 0) > 1
      ? seedCanonicalSlug(probe.conceptId, probe.probeKind, probe.gradeBand, probe.difficulty)
      : base
  }
}

/** Subjects the automatic cold-start bootstrap (src/instrumentation.ts) seeds. */
export const BOOTSTRAP_SEED_SUBJECTS = ['mathematics', 'physics', 'english', 'chemistry'] as const

/**
 * Prisma `where` matching EXACTLY the AssetIdentity rows the seed bootstrap
 * owns — nothing else.
 *
 * `assetIdentity` is a SHARED table with three writers, and every predicate
 * below excludes exactly one of the other two:
 *
 *   authorKind HUMAN_CURATOR — excludes explanationMemory /
 *       teachingActionRepository's `capture*` path, which inserts
 *       AI_AUTHORED/DRAFT rows after LLM generations. Those rows are governed
 *       by the admin review flow (reviewExplanationAsset / reviewProbeAsset)
 *       and this bootstrap must never touch them.
 *   authorId SEED_AUTHOR_ID  — excludes any other human curator's rows.
 *   tags hasSome <subjects>  — excludes the subjects only the manual script
 *       seeds (biology/computer_science). Those share authorKind and authorId
 *       but are not part of this bootstrap's corpus.
 *
 *       CHEMISTRY JOINED THE BOOTSTRAP CORPUS 2026-08-19. It was script-only,
 *       and the script cannot be run from any session that lacks DATABASE_URL —
 *       which is every session this repo has had. The measurable consequence:
 *       chemistry sat at exactly 2 gradeable probes per concept for all 186
 *       concepts, against an asset contract of 3, so no chemistry lesson could
 *       reach mastery. The other 314 probes were authored, in git, and
 *       unreachable. Adding the subject here is what lets the cold-start
 *       bootstrap — which runs where DATABASE_URL exists — finish the job.
 *
 * Seed rows are tagged `[subjectSlug, familyKind]` (see src/instrumentation.ts),
 * so matching on subject slugs cannot collide with familyKind values.
 *
 * Used for BOTH the completeness guard and the status-convergence step, so a
 * single predicate defines bootstrap ownership in one place.
 */
export function seedOwnershipWhere(
  subjects: readonly string[] = BOOTSTRAP_SEED_SUBJECTS,
): { authorKind: 'HUMAN_CURATOR'; authorId: string; tags: { hasSome: string[] } } {
  return {
    authorKind: 'HUMAN_CURATOR',
    authorId: SEED_AUTHOR_ID,
    tags: { hasSome: [...subjects] },
  }
}

// ─── math.arith.fractions ─────────────────────────────────────────────────────

const FRACTIONS = 'math.arith.fractions'

export const SEED_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FRACTIONS,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // concepts/mathematics/math.arith.fractions.md §Explanation library, "Age 8–11 (mechanism)"
    content:
      'A fraction is two answers in one: the bottom says what SIZE of piece ' +
      "we're using — cut into 4, each piece is a 'quarter'. The top COUNTS " +
      'them — three quarters means three of those pieces. Bottom names the ' +
      'piece, top counts the pieces.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Explanation library, Age 8–11 (mechanism)',
  },
  {
    conceptId: FRACTIONS,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // §Explanation library, "Returning-after-forgetting teen/adult"
    content:
      'You probably remember rules — flip this, common denominator that. Park ' +
      'the rules. A fraction is just a division you haven\'t done yet: 3/4 IS ' +
      '3 ÷ 4. Everything else — comparing, adding, simplifying — falls out of ' +
      'that one idea, and we can rebuild the rules from it in about ten minutes.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Explanation library, Returning teen/adult',
  },
  {
    conceptId: FRACTIONS,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    // §Misconception library M2 (add-across): golden-probe collision + mechanism + contrast
    content:
      "Quick one: what's 1/2 + 1/2? ... You know from life that two halves " +
      'make a whole — that\'s 1. But adding tops and bottoms would say 2/4, ' +
      'which is HALF. The bottom number is the SIZE of piece — you can only ' +
      'count pieces together when they\'re the same size. Same size? Then ' +
      'count the tops. That\'s all adding fractions is.',
    targetedMisconceptions: [`${FRACTIONS}:M2`],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconception library M2 (golden probe + recovery)',
  },

  // ─── phys.mech.newtons-first-law ────────────────────────────────────────────
  {
    conceptId: 'phys.mech.newtons-first-law',
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // concepts/physics/phys.mech.newtons-first-law.md §Explanation library, "Age 12+ (mechanism)"
    content:
      "Force doesn't cause motion — force causes CHANGE of motion. " +
      'Keeping-going is free; starting, stopping, and turning are what cost. ' +
      "Everything you've ever seen stop was being acted on by a force you " +
      "didn't see. The law just says: no net force, no change.",
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/physics/phys.mech.newtons-first-law.md — Explanation library, Age 12+ (mechanism)',
  },
  {
    conceptId: 'phys.mech.newtons-first-law',
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // §Explanation library, "Returning adult"
    content:
      "You memorized 'objects in motion stay in motion' and it never felt " +
      'true — because on Earth it never LOOKS true. The missing piece is that ' +
      'friction and air are forces, as real as a push. Once you count them, ' +
      "every 'thing slowing down' you've ever seen becomes the law working, " +
      'not the law failing.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/physics/phys.mech.newtons-first-law.md — Explanation library, Returning adult',
  },

  // ─── eng.phonics.letter-sound-correspondence ────────────────────────────────
  {
    conceptId: 'eng.phonics.letter-sound-correspondence',
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // concepts/english/eng.phonics.letter-sound-correspondence.md §Explanation library, child 5–7 story frame
    content:
      'Letters are little sound-buttons. This one plays /k/. This one plays ' +
      '/a/. Press them in order, sliding, and they join into a word: caaat — ' +
      'cat! You just READ.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/english/eng.phonics.letter-sound-correspondence.md — Explanation library, child 5–7 (story frame)',
  },
  {
    conceptId: 'eng.phonics.letter-sound-correspondence',
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    // §Explanation library, "returning older struggler (8–11, dignity-first)"
    content:
      'Reading is a code, and nobody ever showed you the two keys: letters ' +
      'have sounds (not just names), and the sounds slide together without ' +
      "stopping. You're not bad at reading — you were given the wrong keys. " +
      'New keys, ten minutes.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/english/eng.phonics.letter-sound-correspondence.md — Explanation library, returning older struggler',
  },

  // ─── eng.phonics.phonemic-awareness ─────────────────────────────────────────
  {
    conceptId: 'eng.phonics.phonemic-awareness',
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // concepts/english/eng.phonics.phonemic-awareness.md §Explanation library, child register
    content:
      "Words are made of tiny sounds, like beads on a string. 'Cat' has " +
      'three tiny sound-beads: c...a...t.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/english/eng.phonics.phonemic-awareness.md — Explanation library, child register',
  },
  {
    conceptId: 'eng.phonics.phonemic-awareness',
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // §Explanation library, adult register (no infantilizing shift — foundations/03 §5)
    content:
      'Every word you say is built from a small set of individual sounds, ' +
      'produced in sequence — the same way this sentence is built from ' +
      "individual words. Right now we're training your ear to hear those " +
      'individual sounds directly, the way you already hear individual words ' +
      'in a sentence.',
    targetedMisconceptions: [],
    source: 'educational-brain/concepts/english/eng.phonics.phonemic-awareness.md — Explanation library, adult register',
  },
]

export const SEED_PROBES: SeedProbe[] = [
  {
    conceptId: FRACTIONS,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    // Misconception library M2 golden probe — distractor-mapped per assessment/03 distractor science
    stem: 'Quick one — what is 1/2 + 1/2?',
    choices: [
      { text: '1 (two halves make a whole)', isCorrect: true },
      { text: '2/4', isCorrect: false, misconceptionId: `${FRACTIONS}:M2` },
      { text: '1/4', isCorrect: false },
    ],
    correctValue: '1',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FRACTIONS}:M2`],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconception library M2, golden probe',
  },
  {
    conceptId: FRACTIONS,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    // Misconception library M1 detection probe, verbatim stem
    stem: 'Would you rather have 1/3 of this chocolate bar or 1/8 of it? Why?',
    choices: [
      { text: '1/3 — cutting into fewer pieces means each piece is bigger', isCorrect: true },
      { text: '1/8 — eight is bigger than three', isCorrect: false, misconceptionId: `${FRACTIONS}:M1` },
    ],
    correctValue: '1/3',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FRACTIONS}:M1`],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconception library M1, detection probe (verbatim)',
  },
  {
    conceptId: 'phys.mech.newtons-first-law',
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    // §Misconception library M1 (impetus) verification probe — "spaceship engine cuts out in deep space"
    //
    // RETAGGED M1 -> MC-1 (Moat S4, phys.mech pass). The Educational Brain
    // entry calls this misconception M1; the blueprint calls the SAME belief
    // MC-1 ("Objects Need Continuous Force to Maintain Motion"), whose repair
    // chain ends at P32 with "spaceship with engines off" — this exact
    // scenario. The blueprint id is the one detectMisconceptions can resolve a
    // repair against, so M1 detected and then never repaired the learner.
    // canonicalSlug is unaffected (conceptId:probeKind:lang:band[:difficulty]).
    stem: "A spaceship's engine cuts out in deep space, far from any planet or star. What happens to the spaceship?",
    choices: [
      { text: 'It keeps moving at the same speed, in the same direction, indefinitely', isCorrect: true },
      { text: 'It gradually slows down and eventually stops', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
      { text: 'It stops as soon as the engine cuts out', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
    ],
    correctValue: 'It keeps moving at the same speed, in the same direction',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: ['phys.mech.newtons-first-law:MC-1'],
    source: 'educational-brain/concepts/physics/phys.mech.newtons-first-law.md — Misconception library M1, delayed/speeded verification probe (retagged to the blueprint id MC-1, same belief)',
  },
  {
    conceptId: 'eng.phonics.letter-sound-correspondence',
    subjectSlug: 'english',
    probeKind: 'short_answer',
    gradeBand: GradeBand.EARLY,
    // §Misconception library M1 (letter names vs sounds) — name-vs-job framing from Explanation library
    stem: "This letter is called 'kay'. When we READ, what sound does it make? Say it out loud.",
    correctValue: '/k/ — a quick, whispered k (not "kuh")',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [
      'eng.phonics.letter-sound-correspondence:M1',
      'eng.phonics.letter-sound-correspondence:M2',
    ],
    source: 'educational-brain/concepts/english/eng.phonics.letter-sound-correspondence.md — Misconception library M1 (name vs sound), M2 (schwa)',
  },
  {
    conceptId: 'eng.phonics.phonemic-awareness',
    subjectSlug: 'english',
    probeKind: 'short_answer',
    gradeBand: GradeBand.EARLY,
    // §Assessment, golden probe (P1 detection wording — avoids the contaminated word "sound" on retry)
    stem: "Say 'sun' slowly with me... ssss-un. What's the very first sound your mouth makes, before anything else?",
    correctValue: '/s/',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: ['eng.phonics.phonemic-awareness:P1'],
    source: 'educational-brain/concepts/english/eng.phonics.phonemic-awareness.md — Assessment (golden probe) + Misconception P1',
  },
]
