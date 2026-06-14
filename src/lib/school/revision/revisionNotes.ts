import { prisma } from '@/lib/db/prisma'
import { generateJSON } from '@/lib/ai/client'
import { getNodesForChapter, type Chapter } from '@/lib/education'
import { chapterDisplayTitle } from '@/lib/school/schoolRouting'

/**
 * AI Study Notes & Revision Sheets (Sprint CI).
 *
 * Generates concise, on-demand chapter revision material in three formats.
 * Cached globally per board/subject/grade/chapter/noteType (same pattern as
 * ChapterContentCache) so slow AI generation runs once per chapter across all
 * students. Falls back to instant KG-derived content when AI is unavailable.
 *
 * No file storage, no document editor — material is generated and rendered
 * on demand.
 */

import {
  type RevisionNoteType, type RevisionNotes, type TermDefinition,
  type QuickRevisionNotes, type ExamRevisionNotes, type FormulaSheetNotes,
  isFormulaSheetAvailable,
} from './revisionNotesTypes'

export type {
  RevisionNoteType, RevisionNotes, TermDefinition, RecallQuestion, FormulaEntry,
  QuickRevisionNotes, ExamRevisionNotes, FormulaSheetNotes,
} from './revisionNotesTypes'
export { isFormulaSheetAvailable, REVISION_NOTE_META } from './revisionNotesTypes'

const BOARD_LABELS: Record<string, string> = { cbse: 'CBSE', up_board: 'UP Board' }
const LANGUAGE = 'en'

// ── Fallbacks (instant, KG-derived) ──────────────────────────────────────────

function fallbackQuick(chapter: Chapter, subjectName?: string): QuickRevisionNotes {
  const title = chapterDisplayTitle(chapter.title)
  const topics = getNodesForChapter(chapter).map((n) => n.title)
  if (subjectName === 'Hindi') {
    return {
      type: 'quick',
      summary: topics.length > 0
        ? `"${title}" पाठ में ${topics.join(', ')} का अध्ययन किया जाता है। प्रत्येक विषय को ध्यान से पढ़ें और स्मरण प्रश्नों का अभ्यास करें।`
        : `"${title}" पाठ के मुख्य विचारों को पुनः पढ़ें और अभ्यास प्रश्न हल करें।`,
      keyConcepts: topics.slice(0, 6),
      importantTerms: topics.slice(0, 4).map((t) => ({ term: t, definition: `"${title}" पाठ की प्रमुख अवधारणा।` })),
      commonMistakes: ['बिना सोचे-समझे उत्तर लिखना', 'पिछले पाठों को दोबारा न पढ़ना'],
      recallQuestions: topics.slice(0, 3).map((t) => ({ question: `"${t}" से आप क्या समझते हैं?`, answer: `${t} से संबंधित पाठ को दोबारा पढ़ें।` })),
    }
  }
  return {
    type: 'quick',
    summary: topics.length > 0
      ? `"${title}" covers: ${topics.join(', ')}. Revise each topic and attempt the recall questions to check your understanding.`
      : `Revise the key ideas in "${title}" and attempt practice questions.`,
    keyConcepts: topics.slice(0, 6),
    importantTerms: topics.slice(0, 4).map((t) => ({ term: t, definition: `A key concept in ${title}.` })),
    commonMistakes: ['Rushing through steps without checking', 'Forgetting to revise earlier topics'],
    recallQuestions: topics.slice(0, 3).map((t) => ({ question: `What do you understand by "${t}"?`, answer: `Review the lesson on ${t}.` })),
  }
}

function fallbackExam(chapter: Chapter, subjectName?: string): ExamRevisionNotes {
  const title = chapterDisplayTitle(chapter.title)
  const topics = getNodesForChapter(chapter).map((n) => n.title)
  if (subjectName === 'Hindi') {
    return {
      type: 'exam',
      highWeightTopics: topics.slice(0, 5),
      likelyMistakes: ['प्रश्न को ध्यान से न पढ़ना', 'उत्तर में उदाहरण न देना'],
      definitions: topics.slice(0, 4).map((t) => ({ term: t, definition: `"${title}" की प्रमुख अवधारणा।` })),
      fastRevisionPoints: topics.slice(0, 6).map((t) => `पुनरावृत्ति: ${t}`),
    }
  }
  return {
    type: 'exam',
    highWeightTopics: topics.slice(0, 5),
    likelyMistakes: ['Misreading the question', 'Skipping intermediate steps'],
    definitions: topics.slice(0, 4).map((t) => ({ term: t, definition: `Key idea in ${title}.` })),
    fastRevisionPoints: topics.slice(0, 6).map((t) => `Revise: ${t}`),
  }
}

function fallbackFormula(chapter: Chapter): FormulaSheetNotes {
  const topics = getNodesForChapter(chapter).map((n) => n.title)
  return {
    type: 'formula',
    formulas: topics.slice(0, 4).map((t) => ({ formula: t, meaning: `Relates to ${t}.`, example: `See the lesson on ${t} for a worked example.` })),
  }
}

function fallbackFor(type: RevisionNoteType, chapter: Chapter, subjectName?: string): RevisionNotes {
  if (type === 'exam') return fallbackExam(chapter, subjectName)
  if (type === 'formula') return fallbackFormula(chapter)
  return fallbackQuick(chapter, subjectName)
}

// ── Prompts ──────────────────────────────────────────────────────────────────

function languageNote(subjectName: string): string {
  return subjectName === 'Hindi'
    ? 'Write ALL content (summary, concepts, terms, questions, answers) in Hindi (Devanagari script). Do not use Roman transliteration.\n'
    : ''
}

const LIT_KG_PREFIXES = ['hindi.gadya.', 'hindi.padya.', 'hindi.sahitya_vishleshan.', 'hindi.kavya_bodh.']

function isHindiLiteratureChapter(chapterTitle: string, kgNodeIds: string[]): boolean {
  if (kgNodeIds.some((id) => LIT_KG_PREFIXES.some((p) => id.startsWith(p)))) return true
  const t = chapterTitle.toLowerCase()
  return t.includes('क्षितिज') || t.includes('आरोह') || t.includes('कृतिका') ||
    t.includes('वितान') || t.includes('वसंत') || t.includes('रिमझिम') ||
    t.includes('कहानी') || t.includes('कविता') || t.includes('पद्य') ||
    t.includes('गद्य') || t.includes('रामकथा') || t.includes('महाभारत') ||
    t.includes('भारत की खोज') || t.includes('परिचय')
}

function hindiLiteratureRevisionNote(chapterTitle: string, type: RevisionNoteType, kgNodeIds: string[]): string {
  if (!isHindiLiteratureChapter(chapterTitle, kgNodeIds)) return ''
  const isPoetry = kgNodeIds.some((id) => id.startsWith('hindi.padya.') || id.startsWith('hindi.kavya_bodh.'))
  if (type === 'quick') {
    const poetryExtra = isPoetry ? ' For poetry chapters, "recallQuestions" should include one सप्रसंग व्याख्या question asking to explain a quoted verse in context.' : ''
    return `For this literature chapter, "keyConcepts" should list key themes/characters/ideas from the text. "importantTerms" should include key literary terms or difficult words with meanings. "recallQuestions" should test comprehension and theme understanding.${poetryExtra}\n`
  }
  if (type === 'exam') {
    const poetryExtra = isPoetry ? ', सप्रसंग व्याख्या (contextual explanation of quoted verse — highest-weight question type)' : ''
    return `For this literature chapter, "highWeightTopics" should list: पात्र-चित्रण, विषय-वस्तु, भाव/शिल्प-सौंदर्य, गद्यांश/पद्यांश से प्रश्न${poetryExtra}, लेखक/कवि परिचय. "definitions" should include key literary terms. "fastRevisionPoints" should be crucial exam-ready points about themes, characters and style.\n`
  }
  return ''
}

function buildPrompt(type: RevisionNoteType, board: string, subjectName: string, grade: number, chapter: Chapter): string {
  const title = chapterDisplayTitle(chapter.title)
  const topics = getNodesForChapter(chapter).map((n) => n.title)
  const boardLabel = BOARD_LABELS[board] ?? board
  const ctx = `${boardLabel} Grade ${grade} ${subjectName}, chapter "${title}". Topics: ${topics.length > 0 ? topics.join(', ') : title}.`

  if (type === 'quick') {
    return [
      languageNote(subjectName),
      hindiLiteratureRevisionNote(title, 'quick', chapter.kgNodeIds),
      `Create a CONCISE Quick Revision sheet for a ${ctx}`,
      'Keep it tight — equivalent to 1-2 pages. No essays.',
      'Return ONLY this JSON:',
      '{',
      '  "summary": "3-4 sentence chapter summary, plain text",',
      '  "keyConcepts": ["concept 1", "concept 2", ... up to 6, each under 12 words],',
      '  "importantTerms": [{"term":"...","definition":"one-line definition"}, ... up to 5],',
      '  "commonMistakes": ["mistake 1", ... up to 4, each under 15 words],',
      '  "recallQuestions": [{"question":"...","answer":"short answer"}, ... 3-4]',
      '}',
    ].join('\n')
  }
  if (type === 'exam') {
    return [
      languageNote(subjectName),
      hindiLiteratureRevisionNote(title, 'exam', chapter.kgNodeIds),
      `Create a CONCISE Exam Revision sheet for a ${ctx}`,
      'Focus on high-yield, exam-relevant material only. Be brief.',
      'Return ONLY this JSON:',
      '{',
      '  "highWeightTopics": ["topic likely to be tested", ... up to 5],',
      '  "likelyMistakes": ["common exam mistake", ... up to 4],',
      '  "definitions": [{"term":"...","definition":"exam-ready definition"}, ... up to 5],',
      '  "fastRevisionPoints": ["quick point to memorise", ... up to 8, each under 15 words]',
      '}',
    ].join('\n')
  }
  // formula
  return [
    languageNote(subjectName),
    `Create a CONCISE Formula Sheet for a ${ctx}`,
    'List only the formulas that genuinely appear in this chapter. If the chapter has no formulas, return an empty array.',
    'Return ONLY this JSON:',
    '{',
    '  "formulas": [{"formula":"the formula (use plain text, e.g. V = I × R)","meaning":"what each symbol means","example":"one short worked example"}, ... up to 8]',
    '}',
  ].join('\n')
}

// ── Validation ────────────────────────────────────────────────────────────────

function strArr(v: unknown, max: number): string[] {
  if (!Array.isArray(v)) return []
  return v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0).map((x) => x.trim()).slice(0, max)
}

function termArr(v: unknown, max: number): TermDefinition[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
    .map((x) => ({ term: String(x.term ?? '').trim(), definition: String(x.definition ?? '').trim() }))
    .filter((x) => x.term.length > 0)
    .slice(0, max)
}

function normalize(type: RevisionNoteType, data: unknown, chapter: Chapter, subjectName?: string): RevisionNotes {
  if (!data || typeof data !== 'object') return fallbackFor(type, chapter, subjectName)
  const d = data as Record<string, unknown>

  if (type === 'quick') {
    const summary = String(d.summary ?? '').trim()
    const keyConcepts = strArr(d.keyConcepts, 6)
    if (!summary || keyConcepts.length === 0) return fallbackQuick(chapter, subjectName)
    return {
      type: 'quick',
      summary,
      keyConcepts,
      importantTerms: termArr(d.importantTerms, 5),
      commonMistakes: strArr(d.commonMistakes, 4),
      recallQuestions: (Array.isArray(d.recallQuestions) ? d.recallQuestions : [])
        .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
        .map((x) => ({ question: String(x.question ?? '').trim(), answer: String(x.answer ?? '').trim() }))
        .filter((x) => x.question.length > 0)
        .slice(0, 4),
    }
  }

  if (type === 'exam') {
    const highWeightTopics = strArr(d.highWeightTopics, 5)
    if (highWeightTopics.length === 0) return fallbackExam(chapter, subjectName)
    return {
      type: 'exam',
      highWeightTopics,
      likelyMistakes: strArr(d.likelyMistakes, 4),
      definitions: termArr(d.definitions, 5),
      fastRevisionPoints: strArr(d.fastRevisionPoints, 8),
    }
  }

  // formula
  const formulas = (Array.isArray(d.formulas) ? d.formulas : [])
    .filter((x): x is Record<string, unknown> => !!x && typeof x === 'object')
    .map((x) => ({ formula: String(x.formula ?? '').trim(), meaning: String(x.meaning ?? '').trim(), example: String(x.example ?? '').trim() }))
    .filter((x) => x.formula.length > 0)
    .slice(0, 8)
  if (formulas.length === 0) return fallbackFormula(chapter)
  return { type: 'formula', formulas }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getRevisionNotes(
  type: RevisionNoteType,
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
): Promise<RevisionNotes> {
  // Formula sheets only for quantitative subjects
  if (type === 'formula' && !isFormulaSheetAvailable(subjectSlug)) {
    return { type: 'formula', formulas: [] }
  }

  const cached = await prisma.revisionNotesCache.findUnique({
    where: {
      board_subjectSlug_grade_chapterId_noteType_language: {
        board, subjectSlug, grade, chapterId: chapter.id, noteType: type, language: LANGUAGE,
      },
    },
  }).catch(() => null)

  if (cached && cached.content) {
    return cached.content as unknown as RevisionNotes
  }

  const generated = await generateJSON(buildPrompt(type, board, subjectName, grade, chapter), 1200).catch(() => null)
  const notes = normalize(type, generated, chapter, subjectName)

  await prisma.revisionNotesCache.create({
    data: {
      board, subjectSlug, grade, chapterId: chapter.id, noteType: type, language: LANGUAGE,
      content: notes as unknown as import('@prisma/client').Prisma.JsonObject,
    },
  }).catch(() => {})

  return notes
}
