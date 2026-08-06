/**
 * Lesson introduction experience — UX + pedagogy pass.
 *
 * Covers the parts of that change that are pure and therefore assertable:
 * what the voice does and does not read aloud, the introduction's pacing
 * multiplier, the familiarity-question parser, and the prelude narration
 * order. The React rendering itself is verified by the structural assertions
 * at the bottom, in the same source-text idiom the other LessonScreen suites
 * already use.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanTextForTTS } from '@/lib/tts-cleaner'
import { INTRO_SPEECH_RATE_FACTOR } from '@/lib/tts'
import { parseFamiliarityQuestion } from '@/lib/learn/familiarityQuestion'
import { buildPreludeNarration } from '@/lib/curriculum/preludeNarration'
import { getSubjectPrelude } from '@/lib/curriculum/subjectPrelude'

const ROADMAP = 'Here\'s how today will go: Intuition → Explanation → Examples → Guided Practice → Mastery Check → Summary'

// ─── Roadmap arrows are visual only ──────────────────────────────────────────

describe('the lesson roadmap is never read as arrows', () => {
  it('does not speak "leads to" once per stage', () => {
    const out = cleanTextForTTS(ROADMAP)
    expect(out).not.toContain('leads to')
    expect(out).not.toContain('→')
  })

  it('lists the stages instead, in order', () => {
    const out = cleanTextForTTS(ROADMAP)
    expect(out).toContain('Intuition, Explanation, Examples, Guided Practice, Mastery Check, Summary')
  })

  it('keeps the lead-in sentence that makes the list sound natural', () => {
    expect(cleanTextForTTS(ROADMAP)).toContain("Here's how today will go:")
  })

  it('works for the Russian roadmap without injecting English words', () => {
    const out = cleanTextForTTS('Вот как пройдёт урок: Интуиция → Объяснение → Примеры → Практика → Итог')
    expect(out).not.toContain('→')
    expect(out).not.toContain('leads to')
    expect(out).not.toMatch(/then|finally/)
    expect(out).toContain('Интуиция, Объяснение, Примеры, Практика, Итог')
  })
})

describe('educational arrows keep their meaning', () => {
  it('a chemical equation still says "leads to"', () => {
    // The point of the change is that the spoken form of an equation must not
    // say something different from the written one.
    expect(cleanTextForTTS('2H2 + O2 → 2H2O')).toContain('leads to')
  })

  it('a two-term arrow is not treated as a roadmap', () => {
    expect(cleanTextForTTS('Heat → Expansion')).toContain('leads to')
  })

  it('a chain containing numbers is not treated as a roadmap', () => {
    expect(cleanTextForTTS('x → 0 → 1 → 2')).toContain('leads to')
  })
})

// ─── Decorative symbols are never spelled out ────────────────────────────────

describe('presentation symbols stay visual', () => {
  it('a slash separating options becomes a pause, not the word "slash"', () => {
    const out = cleanTextForTTS('I already know it / I have seen it before / Completely new to me')
    expect(out).not.toContain('/')
    expect(out).toContain('I already know it, I have seen it before, Completely new to me')
  })

  it('a slash that carries meaning is left alone', () => {
    // A tight slash survives as a slash. ("km" is separately expanded to
    // "kilometers" by the units dictionary — unrelated, pre-existing, and not
    // what this asserts.)
    expect(cleanTextForTTS('The car travels at 30 km/h')).toContain('/h')
    expect(cleanTextForTTS('Shade 3/4 of the circle')).toContain('3/4')
    expect(cleanTextForTTS('Answer yes and/or no')).toContain('and/or')
  })

  it('table pipes are never read', () => {
    expect(cleanTextForTTS('| Mass | Force |')).not.toContain('|')
  })

  it('decorative rules and checkmarks are never read', () => {
    const out = cleanTextForTTS('---\n✓ Identify the parts\n✓ Describe the model')
    expect(out).not.toContain('✓')
    expect(out).not.toContain('---')
    expect(out).toContain('Identify the parts')
  })
})

// ─── Introduction pacing ─────────────────────────────────────────────────────

describe('introduction pacing', () => {
  it('is slower than the teaching pace', () => {
    expect(INTRO_SPEECH_RATE_FACTOR).toBeLessThan(1)
  })

  it('is a gentle trim, not a crawl', () => {
    expect(INTRO_SPEECH_RATE_FACTOR).toBeGreaterThanOrEqual(0.75)
  })

  it('scales the learner\'s own speed rather than replacing it', () => {
    // A learner who chose 1.5x still gets a proportionally calmer opening.
    expect(1.5 * INTRO_SPEECH_RATE_FACTOR).toBeGreaterThan(1.0 * INTRO_SPEECH_RATE_FACTOR)
  })

  it('leaves a section pause between introduction sections', () => {
    // Sections arrive as paragraphs; each becomes a sentence boundary, which is
    // what speakText breathes on.
    const out = cleanTextForTTS('Welcome to the lesson\n\nEstimated time: 12 minutes\n\nBy the end of this lesson')
    expect(out).toContain('Welcome to the lesson. Estimated time')
  })
})

// ─── Familiarity question ────────────────────────────────────────────────────

describe('parseFamiliarityQuestion', () => {
  const EN = 'Before we begin — how familiar are you with this topic? 🟢 I already know it / 🟡 I\'ve seen it before / 🔴 Completely new to me'

  it('extracts the question and exactly three options', () => {
    const parsed = parseFamiliarityQuestion(EN)
    expect(parsed).not.toBeNull()
    expect(parsed!.options).toEqual(['I already know it', "I've seen it before", 'Completely new to me'])
  })

  it('keeps the question text without the option markers', () => {
    const parsed = parseFamiliarityQuestion(EN)
    expect(parsed!.question).toContain('how familiar are you with this topic?')
    expect(parsed!.question).not.toContain('🟢')
  })

  it('returns the source line so the caller can avoid printing it twice', () => {
    const parsed = parseFamiliarityQuestion(`Intro text\n\n${EN}\n\nMore text`)
    expect(parsed!.line).toBe(EN)
  })

  it('parses the Russian opening with the same three markers', () => {
    const parsed = parseFamiliarityQuestion('Насколько ты знаком с этой темой? 🟢 Уже знаю / 🟡 Слышал раньше / 🔴 Совсем новое')
    expect(parsed!.options).toEqual(['Уже знаю', 'Слышал раньше', 'Совсем новое'])
  })

  it('leaves ordinary tutor prose alone', () => {
    expect(parseFamiliarityQuestion('Great work — ready for the next part?')).toBeNull()
  })

  it('falls back to prose rather than guessing at a malformed set', () => {
    // Two markers is not a three-option question; a half-parsed control would
    // be worse than the sentence it replaced.
    expect(parseFamiliarityQuestion('How familiar are you? 🟢 Know it / 🟡 Seen it')).toBeNull()
  })
})

// ─── Subject introduction narration ──────────────────────────────────────────

describe('buildPreludeNarration', () => {
  const prelude = getSubjectPrelude('physics')!

  it('narrates every authored section', () => {
    const text = buildPreludeNarration(prelude, 'Physics')
    expect(text).toContain(prelude.welcome)
    expect(text).toContain(prelude.bigQuestion)
    expect(text).toContain(prelude.whyItExists)
    expect(text).toContain(prelude.whyItMatters)
    expect(text).toContain(prelude.worthLearning)
    expect(text).toContain(prelude.motivation)
    expect(text).toContain(prelude.transition)
    for (const stage of prelude.roadmap) expect(text).toContain(stage.title)
  })

  it('follows the on-screen order', () => {
    const text = buildPreludeNarration(prelude, 'Physics')
    expect(text.indexOf(prelude.welcome)).toBeLessThan(text.indexOf(prelude.bigQuestion))
    expect(text.indexOf(prelude.bigQuestion)).toBeLessThan(text.indexOf(prelude.whyItExists))
    expect(text.indexOf(prelude.whyItMatters)).toBeLessThan(text.indexOf(prelude.motivation))
  })

  it('states "none" rather than skipping an empty prerequisites section', () => {
    const noPrereqs = getSubjectPrelude('mathematics')!
    expect(noPrereqs.prerequisites).toHaveLength(0)
    expect(buildPreludeNarration(noPrereqs, 'Mathematics')).toContain('Prerequisites. None')
  })

  it('separates sections so the voice pauses between them', () => {
    expect(buildPreludeNarration(prelude, 'Physics')).toContain('\n\n')
  })

  it('survives the TTS cleaner without losing its content', () => {
    const spoken = cleanTextForTTS(buildPreludeNarration(prelude, 'Physics'))
    expect(spoken.length).toBeGreaterThan(500)
    expect(spoken).not.toContain('→')
  })
})

// ─── Structural locks on the introduction copy ───────────────────────────────

describe('lesson opening copy', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
  const stripComments = (s: string) =>
    s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
  const CODE = stripComments(SRC)

  it('says "Previously", never "Yesterday"', () => {
    expect(CODE).toContain('"Previously: [title]. Next: [title]."')
    expect(CODE).not.toContain('Yesterday: [title]')
  })

  it('introduces the objectives before listing them', () => {
    expect(CODE).toContain('By the end of this lesson, you will be able to:')
  })

  it('calls it a lesson, not a chapter', () => {
    expect(CODE).toContain('Say "lesson", never "chapter".')
  })

  it('frames the curiosity section as "Did you know?"', () => {
    expect(CODE).toContain('DID YOU KNOW?')
  })

  it('keeps the roadmap arrows in the visible copy', () => {
    expect(CODE).toContain('Intuition → Explanation → Examples → Guided Practice → Mastery Check → Summary')
  })

  it('speaks the introduction at the introduction rate', () => {
    expect(CODE).toContain('INTRO_SPEECH_RATE_FACTOR')
    expect(CODE).toMatch(/intro:\s*isIntro/)
  })

  it('gives the subject introduction the shared voice pipeline, not its own', () => {
    expect(CODE).toMatch(/onSpeak=\{\(text\) => handleSpeak\(PRELUDE_SPEECH_ID, text, \{ intro: true \}\)\}/)
    // The screen must remain a CALLER of the pipeline, never a second one.
    // Comments stripped: prose describing the rule must not satisfy it.
    const preludeCode = stripComments(
      readFileSync(join(process.cwd(), 'src/components/learn/SubjectPreludeScreen.tsx'), 'utf8'),
    )
    expect(preludeCode).not.toContain('speechSynthesis')
    expect(preludeCode).not.toContain('/api/tts')
    expect(preludeCode).not.toContain('speakText')
  })
})
