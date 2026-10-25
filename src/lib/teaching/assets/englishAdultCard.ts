/**
 * ENGLISH ADULT-BAND CARD-DEPTH — the card builder shared by englishCardDepthBatch25..34.
 *
 * WHY THESE EXIST (learner run, 2026-10-21). 194 English (concept, ADULT) pairs hold FOUR gradeable probes, not the five the other subjects hold
 * (`contract-audit.ts --min 5`): the bar plus room for two wrong answers. The four are two 2-option mcq cards, a 2-option misconception_probe and
 * a checkpoint, so a learner who misses two cannot be certified, and `turnContract.certifiesMastery` treats a 2-option card as practice only once a
 * concept holds three authored 3+-option cards.
 *
 * WHAT A CARD IS HERE. One new 3-option card per pair: the correct answer plus ONE wrong answer for EACH of the concept's two registered
 * misconceptions (`englishAdultMisconceptionIds.ts`, read off the concept's own existing probes, none invented). The scenario is new (none reuses a
 * stem the concept's existing cards ask) and every fact comes from the concept's own Educational Brain entry / blueprint.
 *
 * SLOT (the P-10 constraint). Every pair already holds checkpoint, mcq, mcq and misconception_probe at ADULT. A (concept, kind, band) slot that holds a
 * probe must never gain a second (`buildProbeSlugResolver` would promote the slot to a 5-segment slug and abandon the live row's identity), so the new
 * card takes the only free closed-choice slot, `fill_blank`.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'
import { ENGLISH_ADULT_MISCONCEPTIONS } from './englishAdultMisconceptionIds'

export function adultCard(
  conceptId: string,
  stem: string,
  correct: string,
  wrongA: string,
  wrongB: string,
  note: string,
): SeedProbe {
  const ids = ENGLISH_ADULT_MISCONCEPTIONS[conceptId]
  if (!ids) throw new Error(`no registered misconception ids for ${conceptId}`)
  const [a, b] = ids.map((m) => `${conceptId}:${m}`)
  return {
    conceptId, subjectSlug: 'english', probeKind: 'fill_blank', gradeBand: GradeBand.ADULT,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrongA, isCorrect: false, misconceptionId: a },
      { text: wrongB, isCorrect: false, misconceptionId: b },
    ],
    targetedMisconceptions: [a, b],
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Register; ${note}`,
  }
}
