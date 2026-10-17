/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 24 (eng.phonics, 2 concepts, 6 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 1,493 of English's 1,501 authored cards had only TWO options,
 * so a blind guess scored ~50 %. Owner decision 3 (2026-10-07, `turnContract.
 * certifiesMastery`) makes a 2-option card practice-only once a concept holds three
 * authored cards with 3+ options — which no English concept did. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit the
 * existing identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for EACH of two of the
 * concept's registered misconceptions (ids read off the concept's own existing probes
 * or its educational-brain misconception library, so none is invented). Every stem is a NEW worked example — none reuses a scenario the
 * concept's existing cards already ask. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Register, Worked Examples).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain
 * a second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment
 * slug and abandon the live row's identity. letter-sound-correspondence already uses EARLY : short_answer and ELEMENTARY : mcq, misconception_probe, mcq (promoted by difficulty); the new cards take ELEMENTARY : short_answer, fill_blank and EARLY : mcq. phonemic-awareness already uses EARLY : short_answer only; the new cards take EARLY : mcq, misconception_probe, fill_blank. Their misconception ids are the M1/M2/M5 and P1/P2/P3 entries of the concepts' own educational-brain misconception libraries (educational-brain/concepts/english/<concept>.md), written as `<concept>:M1` like the seed probes do.
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH
const A = GradeBand.ADULT

type Kind = 'short_answer' | 'fill_blank' | 'checkpoint' | 'mcq' | 'misconception_probe'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: kind === 'fill_blank' ? ProbeDifficulty.PROFICIENT : ProbeDifficulty.DEVELOPING,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrongA[0], isCorrect: false, misconceptionId: id(wrongA[1]) },
      { text: wrongB[0], isCorrect: false, misconceptionId: id(wrongB[1]) },
    ],
    targetedMisconceptions: [id(wrongA[1]), id(wrongB[1])],
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Register; ${note}`,
  }
}


const E = GradeBand.EARLY
const EL = GradeBand.ELEMENTARY

export const ENGLISH_CARD_DEPTH_BATCH_24: SeedProbe[] = [
  // ─── eng.phonics.letter-sound-correspondence ─────────────────────────────
  // M1 = letters say their names; M2 = schwa-contaminated consonants ("puh");
  // M5 = first-letter guessing (educational-brain/concepts/english/<concept>.md).
  card('eng.phonics.letter-sound-correspondence', 'short_answer', EL,
    'A child looks at the word "map" and says "em-ay-pee". Another reads the letter p as "puh", so "map" comes out as "muh-a-puh". Which statement is true?',
    'Reading uses each letter\'s clipped sound, /m/ /a/ /p/, not its name and not a sound with "uh" added',
    ['Saying "em-ay-pee" is reading the word, because the letter names are the letters\' proper labels', 'M1'],
    ['"Muh-a-puh" gives the right sound for each letter, so adding "uh" helps the word come together', 'M2'],
    'M1 name vs sound, M2 schwa-tail, re-asked with "map"'),
  card('eng.phonics.letter-sound-correspondence', 'fill_blank', EL,
    'Complete the sentence: when you read the word "nap", ____.',
    'say each letter\'s sound in order and blend them: /n/ /a/ /p/',
    ['look at the first letter and guess a word that starts the same way', 'M5'],
    ['say the name of each letter, "en-ay-pee", from left to right', 'M1'],
    'M5 first-letter guessing, M1 name vs sound, re-asked with "nap"'),
  card('eng.phonics.letter-sound-correspondence', 'mcq', E,
    'This letter is called "pee". When we READ a word, which is its sound?',
    '/p/, a quick puff of air, like the start of "pig"',
    ['"Pee", the name of the letter, which is what we say when we sing the alphabet', 'M1'],
    ['"Puh", the sound with "uh" on the end', 'M2'],
    'M1 name vs sound, M2 schwa-tail, EARLY-band wording'),

  // ─── eng.phonics.phonemic-awareness ──────────────────────────────────────
  // P1 = "sound" means loudness; P2 = syllable-counting vs phoneme-counting;
  // P3 = "same sound" means shares an ending only (the concept's EB library).
  card('eng.phonics.phonemic-awareness', 'mcq', E,
    'Say "map" slowly: mmm-ap. What does your mouth do FIRST?',
    'It makes the /m/, the first little sound in "map"',
    ['It makes a loud noise, so the first sound is how loud the word is', 'P1'],
    ['It says the whole word "map" in one chunk, like one clap', 'P2'],
    'isolating the first phoneme without relying on the word "sound", re-asked with "map"'),
  card('eng.phonics.phonemic-awareness', 'misconception_probe', E,
    'Do "fish" and "fan" share a sound anywhere?',
    'Yes, both start with /f/; words can match at the front, not only at the end like rhymes',
    ['No, they do not rhyme, so they share no sound', 'P3'],
    ['No, each word is one chunk, so there are no little sounds to match', 'P2'],
    'P3 shared sound is not only the ending, re-asked with fish and fan'),
  card('eng.phonics.phonemic-awareness', 'fill_blank', E,
    'Complete the sentence: to count the sounds in "dog", ____.',
    'say it slowly and hold up one finger for each little sound',
    ['clap the beats of the word, so "dog" has one', 'P2'],
    ['listen for how loud it is, since "sound" just means volume or noise', 'P1'],
    'P2 syllables vs phonemes, P1 sound as loudness, re-asked with "dog"'),
]
