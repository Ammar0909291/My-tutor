import { describe, it, expect } from 'vitest'
import {
  looksLikeConceptId, safeConceptTitle, localizeKGNodeTitle, localizeKGModuleTitle,
} from '@/lib/curriculum/knowledgeGraph'
import { buildLessonCloseText, buildCompletionPayload } from '@/lib/teaching/lessonCompletion'
import { localizeVisualLabel } from '@/lib/visuals/visualLabels'
import { t } from '@/lib/i18n'

const LANGS = ['en', 'ru', 'hi'] as const

/** Every concept id seen in the production screenshots, plus representatives
 *  from other subjects so the guard is not chemistry-specific. */
const REAL_IDS = [
  'chem.found.matter',
  'chem.found.states-of-matter',
  'chem.found.pure-substances',
  'math.arith.fractions',
  'phys.mech.newtons-first-law',
]

describe('curriculum ids never reach the student', () => {
  it('recognizes real curriculum ids as ids', () => {
    for (const id of REAL_IDS) expect(looksLikeConceptId(id)).toBe(true)
  })

  it('does not mistake real titles or prose for ids', () => {
    for (const title of [
      'Nature of Matter', 'States of Matter', 'this concept', 'Основы химии',
      'Dr. Smith', 'e.g. water', '', null, undefined,
    ]) {
      expect(looksLikeConceptId(title)).toBe(false)
    }
  })

  it('never returns an id from safeConceptTitle, in any language', () => {
    for (const lang of LANGS) {
      for (const id of REAL_IDS) {
        // Worst case: caller passes the id as the "title" too — exactly what
        // the lesson-summary path used to do.
        const resolved = safeConceptTitle(id, id, lang)
        expect(looksLikeConceptId(resolved)).toBe(false)
      }
    }
  })

  it('returns null rather than a placeholder when nothing presentable exists', () => {
    expect(safeConceptTitle('made.up.concept', 'made.up.concept', 'ru')).toBeNull()
  })

  it('never emits an id in the lesson close, even when every input is an id', () => {
    for (const lang of LANGS) {
      const text = buildLessonCloseText('chem.found.matter', {
        mastered: [{ conceptId: 'chem.found.matter', title: 'chem.found.matter' } as never],
        needsReview: [{ conceptId: 'chem.found.states-of-matter', title: 'chem.found.states-of-matter' } as never],
      }, { lang, conceptId: 'chem.found.matter' })
      for (const id of REAL_IDS) expect(text).not.toContain(id)
      expect(text).not.toMatch(/\b[a-z]+\.[a-z]+\.[a-z-]+\b/)
    }
  })
})

describe('lesson titles are localized', () => {
  it('localizes a known concept title into Russian and Hindi', () => {
    expect(localizeKGNodeTitle('chem.found.matter', 'Nature of Matter', 'ru')).toBe('Природа вещества')
    expect(localizeKGNodeTitle('chem.found.states-of-matter', 'States of Matter', 'ru'))
      .toBe('Агрегатные состояния вещества')
    expect(localizeKGNodeTitle('chem.found.matter', 'Nature of Matter', 'hi')).toBe('पदार्थ की प्रकृति')
  })

  it('leaves English untouched', () => {
    expect(localizeKGNodeTitle('chem.found.matter', 'Nature of Matter', 'en')).toBe('Nature of Matter')
  })

  it('falls back to the readable English title when a translation is missing', () => {
    // Partial coverage is safe: an untranslated concept degrades to English
    // prose, never to an id.
    const out = localizeKGNodeTitle('math.arith.fractions', 'Fractions', 'ru')
    expect(looksLikeConceptId(out)).toBe(false)
    expect(out.length).toBeGreaterThan(0)
  })

  it('localizes module titles (the lesson footer subject)', () => {
    expect(localizeKGModuleTitle('Chemical Foundations', 'ru')).toBe('Основы химии')
    expect(localizeKGModuleTitle('Chemical Foundations', 'en')).toBe('Chemical Foundations')
  })
})

describe('completion messages localize', () => {
  const summary = { mastered: [], needsReview: [] }

  it('renders the Russian close in Russian, with no English template left', () => {
    const text = buildLessonCloseText('Nature of Matter', summary, {
      lang: 'ru', conceptId: 'chem.found.matter',
    })
    expect(text).toContain('Природа вещества')
    expect(text).not.toMatch(/nice work|finished|Press "Start next lesson"/)
    expect(text).toMatch(/[Ѐ-ӿ]/)
  })

  it('renders the Hindi close in Hindi', () => {
    const text = buildLessonCloseText('Nature of Matter', summary, {
      lang: 'hi', conceptId: 'chem.found.matter',
    })
    expect(text).toMatch(/[ऀ-ॿ]/)
    expect(text).not.toMatch(/nice work/)
  })

  it('keeps the exact English wording for English learners', () => {
    const text = buildLessonCloseText('Nature of Matter', summary, {
      lang: 'en', conceptId: 'chem.found.matter',
    })
    expect(text).toContain("That's Nature of Matter finished — nice work.")
    expect(text).toContain('Press "Start next lesson"')
  })

  it('localizes the already-finished variant too', () => {
    const text = buildLessonCloseText('Nature of Matter', summary, {
      lang: 'ru', conceptId: 'chem.found.matter', alreadyFinished: true,
    })
    expect(text).toMatch(/[Ѐ-ӿ]/)
    expect(text).not.toMatch(/already finished/)
  })

  it('defaults to English when no lang is supplied — existing callers unchanged', () => {
    expect(buildLessonCloseText('Nature of Matter', summary))
      .toContain("That's Nature of Matter finished — nice work.")
  })

  it('localizes the completion CARD title, not just the message', () => {
    const payload = buildCompletionPayload(
      { lessonKey: 'k', lessonTitle: 'Nature of Matter', durationSeconds: 1, completedAt: null } as never,
      { mastered: [], needsReview: [], corrected: [], complete: true, totalConcepts: 1 },
      1,
      { lang: 'ru', conceptId: 'chem.found.matter' },
    )
    expect(payload.lessonTitle).toBe('Природа вещества')
  })
})

describe('visualization labels localize', () => {
  it('translates the labels reported in production', () => {
    expect(localizeVisualLabel('Gas', 'ru')).toBe('Газ')
    expect(localizeVisualLabel('Liquid', 'ru')).toBe('Жидкость')
    expect(localizeVisualLabel('Solid', 'ru')).toBe('Твёрдое тело')
    expect(localizeVisualLabel('Evaporation', 'ru')).toBe('Испарение')
  })

  it('translates every step of the states-of-matter flow', () => {
    // The exact step list visualConceptDetector emits for this concept.
    for (const step of ['Solid', 'Melting', 'Liquid', 'Evaporation', 'Gas']) {
      const ru = localizeVisualLabel(step, 'ru')
      expect(ru).not.toBe(step)
      expect(ru).toMatch(/[Ѐ-ӿ]/)
    }
  })

  it('leaves English untouched and passes unmapped labels through', () => {
    expect(localizeVisualLabel('Gas', 'en')).toBe('Gas')
    expect(localizeVisualLabel('Some Unmapped Step', 'ru')).toBe('Some Unmapped Step')
  })

  it('localizes the section badges', () => {
    expect(t('ru', 'viz_badge_process')).toBe('ПРОЦЕСС')
    expect(t('ru', 'viz_badge_visual_aid')).toBe('НАГЛЯДНОЕ ПОСОБИЕ')
    expect(t('en', 'viz_badge_process')).toBe('PROCESS')
  })
})

describe('subject names localize', () => {
  it('uses the existing onboarding subject keys rather than new ones', () => {
    expect(t('ru', 'ob_subj_chemistry')).toBe('Химия')
    expect(t('ru', 'ob_subj_physics')).toBe('Физика')
    expect(t('en', 'ob_subj_chemistry')).toBe('Chemistry')
  })
})
