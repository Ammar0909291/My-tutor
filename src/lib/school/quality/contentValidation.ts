import { BOARD_CATALOGS, getNodesForChapter } from '@/lib/education'
import type { Chapter } from '@/lib/education'
import type { ChapterContent } from '@/lib/school/chapterContent'
import type { QuickRevisionNotes, RecallQuestion, RevisionNotes } from '@/lib/school/revision/revisionNotesTypes'
import type { PracticeQuestion } from '@/lib/school/practice/practiceTypes'
import {
  ASSESSMENT_MCQ_COUNT,
  ASSESSMENT_SA_COUNT,
  ASSESSMENT_TF_COUNT,
  ASSESSMENT_TOTAL,
} from '@/lib/school/assessment/assessmentTypes'

/**
 * Educational Content Validation Engine (Sprint CN).
 *
 * Internal validation engine — NOT a user feature, NOT a dashboard.
 * Deterministically scores the 5 generated content artifact types against
 * the quality rules in the Sprint CN spec:
 *
 *   1. Chapter Summaries    — minimum/maximum length, readability, contains
 *                              chapter concepts, no empty sections.
 *   2. Revision Notes       — key concepts present, common mistakes present,
 *                              recall questions present.
 *   3. Practice Questions   — answer exists, explanation exists, difficulty
 *                              reasonable, no duplicate questions.
 *   4. Assessments          — chapter coverage, balanced question types,
 *                              answer quality.
 *   5. Mock Tests           — multi-chapter coverage, weak-topic coverage,
 *                              no excessive repetition.
 *
 * Each artifact gets a 0-100 score (passed checks / total checks), mapped to
 * a category:
 *   90-100  Excellent
 *   75-89   Good
 *   50-74   Needs Review
 *   0-49    Poor
 *
 * No DB access, no AI calls — pure functions over already-generated content.
 * (The optional `--sample-ai` script path generates real content via the
 * existing BL/CI/BN/BO/CF generators and feeds it through these validators.)
 */

// ── Report types ──────────────────────────────────────────────────────────────

export type ArtifactType = 'chapter_summary' | 'revision_notes' | 'practice_questions' | 'assessment' | 'mock_test'

export type CheckSeverity = 'failure' | 'warning'

export interface ValidationCheck {
  name: string
  passed: boolean
  severity: CheckSeverity
  detail: string
  /** Short excerpt illustrating the pass/fail evidence. */
  excerpt?: string
  /** Actionable suggestion, present only on failing checks that have one. */
  recommendation?: string
}

export type ValidationCategory = 'Excellent' | 'Good' | 'Needs Review' | 'Poor'

export interface ContentValidationReport {
  artifactType: ArtifactType
  label: string
  generatedAt: string
  score: number
  category: ValidationCategory
  checks: ValidationCheck[]
  failures: string[]
  warnings: string[]
  recommendations: string[]
}

export interface ContentValidationSummary {
  generatedAt: string
  artifactCount: number
  overallScore: number
  category: ValidationCategory
  categoryBreakdown: Record<ValidationCategory, number>
  reports: ContentValidationReport[]
}

// ── Scoring helpers ──────────────────────────────────────────────────────────

function excerpt(text: string, length = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > length ? `${clean.slice(0, length)}…` : clean
}

function scoreFromChecks(checks: ValidationCheck[]): number {
  if (checks.length === 0) return 100
  const passed = checks.filter((c) => c.passed).length
  return Math.round((passed / checks.length) * 100)
}

function categoryForScore(score: number): ValidationCategory {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 50) return 'Needs Review'
  return 'Poor'
}

function buildReport(artifactType: ArtifactType, label: string, checks: ValidationCheck[]): ContentValidationReport {
  const score = scoreFromChecks(checks)
  const failures: string[] = []
  const warnings: string[] = []
  const recommendations: string[] = []
  for (const c of checks) {
    if (c.passed) continue
    const line = `[${c.name}] ${c.detail}${c.excerpt ? ` (e.g. "${c.excerpt}")` : ''}`
    if (c.severity === 'failure') failures.push(line)
    else warnings.push(line)
    if (c.recommendation) recommendations.push(c.recommendation)
  }
  return {
    artifactType,
    label,
    generatedAt: new Date().toISOString(),
    score,
    category: categoryForScore(score),
    checks,
    failures,
    warnings,
    recommendations,
  }
}

// ── 1. Chapter Summaries ─────────────────────────────────────────────────────

const MIN_SUMMARY_WORDS = 30
const MAX_SUMMARY_WORDS = 300
const MAX_AVG_SENTENCE_WORDS = 30

/** Validate a generated `ChapterContent` (Sprint BL) against the chapter's mapped topics. */
export function validateChapterSummary(content: ChapterContent, chapter: Chapter, label: string): ContentValidationReport {
  const checks: ValidationCheck[] = []
  const summary = content.summary ?? ''
  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length

  checks.push({
    name: 'minimum_length',
    passed: wordCount >= MIN_SUMMARY_WORDS,
    severity: 'failure',
    detail: `Summary should be at least ${MIN_SUMMARY_WORDS} words (found ${wordCount}).`,
    excerpt: wordCount < MIN_SUMMARY_WORDS ? excerpt(summary) : undefined,
    recommendation: wordCount < MIN_SUMMARY_WORDS
      ? `Expand the chapter summary to at least ${MIN_SUMMARY_WORDS} words so students get a meaningful overview.`
      : undefined,
  })

  checks.push({
    name: 'maximum_length',
    passed: wordCount <= MAX_SUMMARY_WORDS,
    severity: 'warning',
    detail: `Summary should be at most ${MAX_SUMMARY_WORDS} words (found ${wordCount}).`,
    excerpt: wordCount > MAX_SUMMARY_WORDS ? excerpt(summary) : undefined,
    recommendation: wordCount > MAX_SUMMARY_WORDS
      ? 'Trim the chapter summary — overly long summaries reduce readability for students.'
      : undefined,
  })

  const sentences = summary.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean)
  const avgSentenceWords = sentences.length > 0 ? wordCount / sentences.length : wordCount
  const readable = sentences.length > 0 && avgSentenceWords <= MAX_AVG_SENTENCE_WORDS
  checks.push({
    name: 'readability',
    passed: readable,
    severity: 'warning',
    detail: sentences.length === 0
      ? 'Summary has no detectable sentences.'
      : `Average sentence length should be at most ~${MAX_AVG_SENTENCE_WORDS} words (found ~${Math.round(avgSentenceWords)} across ${sentences.length} sentence(s)).`,
    recommendation: !readable ? 'Break long sentences into shorter ones to improve readability.' : undefined,
  })

  const topics = getNodesForChapter(chapter).map((n) => n.title)
  const combined = `${summary} ${(content.objectives ?? []).join(' ')}`.toLowerCase()
  const mentioned = topics.filter((t) => combined.includes(t.toLowerCase()))
  checks.push({
    name: 'contains_chapter_concepts',
    passed: topics.length === 0 || mentioned.length > 0,
    severity: 'failure',
    detail: topics.length === 0
      ? 'Chapter has no mapped knowledge-graph topics — concept-coverage check skipped.'
      : `Summary/objectives should reference at least one of this chapter's topics (${topics.join(', ')}); found ${mentioned.length} match(es).`,
    recommendation: topics.length > 0 && mentioned.length === 0
      ? `Mention a chapter topic by name (e.g. "${topics[0]}") in the summary or objectives.`
      : undefined,
  })

  const objectives = (content.objectives ?? []).filter((o) => typeof o === 'string' && o.trim().length > 0)
  const noEmptySections = summary.trim().length > 0 && objectives.length > 0
  checks.push({
    name: 'no_empty_sections',
    passed: noEmptySections,
    severity: 'failure',
    detail: `Chapter content must have a non-empty summary and at least one learning objective (found ${objectives.length} objective(s), summary length ${summary.trim().length}).`,
    recommendation: !noEmptySections ? 'Generate both a non-empty summary and a non-empty list of learning objectives.' : undefined,
  })

  return buildReport('chapter_summary', label, checks)
}

// ── 2. Revision Notes ─────────────────────────────────────────────────────────

function nonEmptyStrings(items: string[]): string[] {
  return (items ?? []).filter((s) => typeof s === 'string' && s.trim().length > 0)
}

function arrayPresenceCheck(name: string, items: string[], fieldLabel: string, artifactLabel: string): ValidationCheck {
  const nonEmpty = nonEmptyStrings(items)
  return {
    name,
    passed: nonEmpty.length > 0,
    severity: 'failure',
    detail: `${artifactLabel} must include at least one ${fieldLabel} entry (found ${nonEmpty.length}).`,
    recommendation: nonEmpty.length === 0 ? `Add at least one ${fieldLabel} entry to these revision notes.` : undefined,
  }
}

function recallQuestionsCheck(questions: RecallQuestion[]): ValidationCheck {
  const valid = (questions ?? []).filter((q) => q?.question?.trim().length > 0 && q?.answer?.trim().length > 0)
  return {
    name: 'recall_questions_present',
    passed: valid.length > 0,
    severity: 'failure',
    detail: `Quick revision notes must include at least one recall question with both a question and an answer (found ${valid.length} valid).`,
    recommendation: valid.length === 0 ? 'Add at least one recall question (with both question and answer).' : undefined,
  }
}

/** Validate generated `RevisionNotes` (Sprint CI) — quick/exam/formula. */
export function validateRevisionNotes(notes: RevisionNotes, label: string): ContentValidationReport {
  const checks: ValidationCheck[] = []

  if (notes.type === 'quick') {
    checks.push(arrayPresenceCheck('key_concepts_present', notes.keyConcepts, 'key concept', 'Quick revision notes'))
    checks.push(arrayPresenceCheck('common_mistakes_present', notes.commonMistakes, 'common mistake', 'Quick revision notes'))
    checks.push(recallQuestionsCheck(notes.recallQuestions))
  } else if (notes.type === 'exam') {
    checks.push(arrayPresenceCheck('key_concepts_present', notes.highWeightTopics, 'high-weight topic (key concept)', 'Exam revision notes'))
    checks.push(arrayPresenceCheck('common_mistakes_present', notes.likelyMistakes, 'likely mistake', 'Exam revision notes'))
    checks.push(arrayPresenceCheck('recall_questions_present', notes.fastRevisionPoints, 'fast revision point', 'Exam revision notes'))
  } else {
    checks.push(arrayPresenceCheck('key_concepts_present', notes.formulas.map((f) => f.formula), 'formula (key concept)', 'Formula sheet'))
    checks.push({
      name: 'common_mistakes_present',
      passed: true,
      severity: 'warning',
      detail: 'Formula sheets do not include a dedicated common-mistakes section by design.',
    })
    checks.push({
      name: 'recall_questions_present',
      passed: true,
      severity: 'warning',
      detail: 'Formula sheets do not include recall questions by design.',
    })
  }

  return buildReport('revision_notes', label, checks)
}

// ── 3. Practice Questions ────────────────────────────────────────────────────

const MIN_QUESTION_CHARS = 8
const MAX_QUESTION_CHARS = 400
const MIN_EXPLANATION_CHARS_ASSESSMENT = 10

function hasValidAnswer(q: PracticeQuestion): boolean {
  if (q.type === 'mcq') return Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex <= 3
  if (q.type === 'true_false') return typeof q.correct === 'boolean'
  return typeof q.sampleAnswer === 'string' && q.sampleAnswer.trim().length > 0
}

function hasExplanation(q: PracticeQuestion): boolean {
  if (q.type === 'short_answer') return q.sampleAnswer.trim().length > 0 || q.keywords.length > 0
  return typeof q.explanation === 'string' && q.explanation.trim().length > 0
}

function hasReasonableDifficulty(q: PracticeQuestion): boolean {
  const len = q.question.trim().length
  if (len < MIN_QUESTION_CHARS || len > MAX_QUESTION_CHARS) return false
  if (q.type === 'mcq') {
    const opts = q.options.map((o) => o.trim().toLowerCase())
    if (opts.some((o) => o.length === 0)) return false
    if (new Set(opts).size !== opts.length) return false
  }
  return true
}

function normalizeQuestionText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function findDuplicateQuestions(questions: PracticeQuestion[]): string[] {
  const counts = new Map<string, number>()
  for (const q of questions) {
    const norm = normalizeQuestionText(q.question)
    counts.set(norm, (counts.get(norm) ?? 0) + 1)
  }
  return [...counts.entries()].filter(([, n]) => n > 1).map(([text]) => text)
}

function practiceQuestionChecks(questions: PracticeQuestion[]): ValidationCheck[] {
  const checks: ValidationCheck[] = []

  const missingAnswer = questions.filter((q) => !hasValidAnswer(q))
  checks.push({
    name: 'answer_exists',
    passed: questions.length > 0 && missingAnswer.length === 0,
    severity: 'failure',
    detail: questions.length === 0
      ? 'No questions were generated to validate.'
      : `Every question must have a valid answer (${missingAnswer.length}/${questions.length} missing or invalid).`,
    excerpt: missingAnswer[0] ? excerpt(missingAnswer[0].question) : undefined,
    recommendation: missingAnswer.length > 0
      ? 'Ensure every MCQ has a correctIndex 0-3, every true/false has a boolean correct value, and every short-answer has a non-empty sample answer.'
      : undefined,
  })

  const missingExplanation = questions.filter((q) => !hasExplanation(q))
  checks.push({
    name: 'explanation_exists',
    passed: questions.length > 0 && missingExplanation.length === 0,
    severity: 'failure',
    detail: questions.length === 0
      ? 'No questions were generated to validate.'
      : `Every question must include an explanation or model answer (${missingExplanation.length}/${questions.length} missing).`,
    excerpt: missingExplanation[0] ? excerpt(missingExplanation[0].question) : undefined,
    recommendation: missingExplanation.length > 0
      ? 'Add a brief explanation (MCQ/true-false) or sample answer + keywords (short answer) to every question.'
      : undefined,
  })

  const unreasonable = questions.filter((q) => !hasReasonableDifficulty(q))
  checks.push({
    name: 'difficulty_reasonable',
    passed: unreasonable.length === 0,
    severity: 'warning',
    detail: unreasonable.length > 0
      ? `${unreasonable.length} question(s) look too trivial, too unwieldy, or have duplicate/blank options.`
      : 'Question prompts and options look reasonably scoped.',
    excerpt: unreasonable[0] ? excerpt(unreasonable[0].question) : undefined,
    recommendation: unreasonable.length > 0
      ? 'Review flagged questions for overly short/long prompts or duplicate MCQ options.'
      : undefined,
  })

  const dupes = findDuplicateQuestions(questions)
  checks.push({
    name: 'no_duplicate_questions',
    passed: dupes.length === 0,
    severity: 'failure',
    detail: dupes.length > 0
      ? `Found ${dupes.length} duplicate question text(s): ${dupes.slice(0, 3).map((d) => `"${excerpt(d, 60)}"`).join(', ')}`
      : 'No duplicate question text found.',
    recommendation: dupes.length > 0 ? 'Remove or rephrase duplicate questions so each tests a distinct idea.' : undefined,
  })

  return checks
}

/** Validate a generated practice set (Sprint BN). */
export function validatePracticeQuestions(questions: PracticeQuestion[], label: string): ContentValidationReport {
  return buildReport('practice_questions', label, practiceQuestionChecks(questions))
}

// ── 4. Assessments ────────────────────────────────────────────────────────────

function hasQualityAnswer(q: PracticeQuestion): boolean {
  const text = q.type === 'short_answer' ? q.sampleAnswer : q.explanation
  return typeof text === 'string' && text.trim().length >= MIN_EXPLANATION_CHARS_ASSESSMENT
}

/** Validate a generated chapter assessment (Sprint BO), sized to `ASSESSMENT_TOTAL`. */
export function validateAssessment(questions: PracticeQuestion[], chapter: Chapter, label: string): ContentValidationReport {
  const checks: ValidationCheck[] = []

  const chapterNodeIds = new Set(chapter.kgNodeIds)
  const covered = new Set(questions.map((q) => q.nodeId).filter((id) => chapterNodeIds.has(id)))
  const coveragePct = chapterNodeIds.size > 0 ? covered.size / chapterNodeIds.size : 1
  checks.push({
    name: 'chapter_coverage',
    passed: chapterNodeIds.size === 0 || coveragePct >= 0.5,
    severity: 'failure',
    detail: chapterNodeIds.size === 0
      ? 'Chapter has no mapped knowledge-graph topics — coverage check skipped.'
      : `Assessment should cover at least half of the chapter's ${chapterNodeIds.size} topic(s) (covered ${covered.size}, ${Math.round(coveragePct * 100)}%).`,
    recommendation: chapterNodeIds.size > 0 && coveragePct < 0.5
      ? "Distribute question nodeIds across more of the chapter's topics for fuller coverage."
      : undefined,
  })

  const mcqCount = questions.filter((q) => q.type === 'mcq').length
  const tfCount = questions.filter((q) => q.type === 'true_false').length
  const saCount = questions.filter((q) => q.type === 'short_answer').length
  const balanced = questions.length === ASSESSMENT_TOTAL
    && mcqCount === ASSESSMENT_MCQ_COUNT
    && tfCount === ASSESSMENT_TF_COUNT
    && saCount === ASSESSMENT_SA_COUNT
  checks.push({
    name: 'balanced_question_types',
    passed: balanced,
    severity: 'failure',
    detail: `Assessment should have ${ASSESSMENT_MCQ_COUNT} MCQ + ${ASSESSMENT_TF_COUNT} true/false + ${ASSESSMENT_SA_COUNT} short-answer = ${ASSESSMENT_TOTAL} total (found ${mcqCount}/${tfCount}/${saCount}, ${questions.length} total).`,
    recommendation: !balanced
      ? `Generate exactly ${ASSESSMENT_TOTAL} questions with the ${ASSESSMENT_MCQ_COUNT}/${ASSESSMENT_TF_COUNT}/${ASSESSMENT_SA_COUNT} MCQ/T-F/SA split.`
      : undefined,
  })

  const poorQuality = questions.filter((q) => !hasQualityAnswer(q))
  checks.push({
    name: 'answer_quality',
    passed: questions.length > 0 && poorQuality.length === 0,
    severity: 'failure',
    detail: questions.length === 0
      ? 'No questions were generated to validate.'
      : `Every question must have a substantive explanation/sample answer of at least ${MIN_EXPLANATION_CHARS_ASSESSMENT} characters (${poorQuality.length}/${questions.length} too short or missing).`,
    excerpt: poorQuality[0] ? excerpt(poorQuality[0].question) : undefined,
    recommendation: poorQuality.length > 0
      ? 'Write fuller explanations/sample answers (at least a short sentence) for flagged questions.'
      : undefined,
  })

  return buildReport('assessment', label, checks)
}

// ── 5. Mock Tests ─────────────────────────────────────────────────────────────

const MAX_DUPLICATE_RATIO = 0.1

export interface MockTestSample {
  questions: PracticeQuestion[]
  chapterIds: string[]
  /** KG node ids the student is weak on, if known (drives weak-topic targeting). */
  weakTopicIds?: string[]
}

/** Validate a generated mock test's composition (Sprint CF) — questions + chapterIds. */
export function validateMockTest(sample: MockTestSample, label: string): ContentValidationReport {
  const checks: ValidationCheck[] = []

  const uniqueChapters = new Set(sample.chapterIds)
  checks.push({
    name: 'multi_chapter_coverage',
    passed: uniqueChapters.size >= 2,
    severity: 'warning',
    detail: `Mock test should draw questions from multiple chapters (found ${uniqueChapters.size}: ${[...uniqueChapters].join(', ') || 'none'}).`,
    recommendation: uniqueChapters.size < 2 ? 'Select questions spanning at least 2 chapters for a representative mock test.' : undefined,
  })

  const weakIds = sample.weakTopicIds ?? []
  const weakCovered = weakIds.length === 0 || sample.questions.some((q) => weakIds.includes(q.nodeId))
  checks.push({
    name: 'weak_topic_coverage',
    passed: weakCovered,
    severity: 'failure',
    detail: weakIds.length === 0
      ? 'No weak topics were identified for this sample — weak-topic coverage check skipped.'
      : `Mock test should include at least one question targeting a weak topic (${weakIds.join(', ')}).`,
    recommendation: !weakCovered ? "Include questions whose nodeId matches one of the student's weak topics." : undefined,
  })

  const dupes = findDuplicateQuestions(sample.questions)
  const dupeRatio = sample.questions.length > 0 ? dupes.length / sample.questions.length : 0
  checks.push({
    name: 'no_excessive_repetition',
    passed: dupeRatio <= MAX_DUPLICATE_RATIO,
    severity: 'failure',
    detail: dupes.length > 0
      ? `Found ${dupes.length} duplicate question text(s) out of ${sample.questions.length} (${Math.round(dupeRatio * 100)}%).`
      : 'No duplicate question text found across the mock test.',
    recommendation: dupeRatio > MAX_DUPLICATE_RATIO ? 'Deduplicate questions across chapters before assembling the mock test.' : undefined,
  })

  return buildReport('mock_test', label, checks)
}

// ── Scoring & report assembly ────────────────────────────────────────────────

/** Roll up a batch of artifact reports into an overall summary. */
export function summarizeValidation(reports: ContentValidationReport[]): ContentValidationSummary {
  const overallScore = reports.length > 0
    ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length)
    : 100

  const categoryBreakdown: Record<ValidationCategory, number> = {
    Excellent: 0,
    Good: 0,
    'Needs Review': 0,
    Poor: 0,
  }
  for (const r of reports) categoryBreakdown[r.category]++

  return {
    generatedAt: new Date().toISOString(),
    artifactCount: reports.length,
    overallScore,
    category: categoryForScore(overallScore),
    categoryBreakdown,
    reports,
  }
}

// ── Sample fixtures (Sprint CN deterministic validation set) ────────────────
//
// Hand-authored "good" and deliberately flawed artifacts for each of the 5
// content types, exercised against a small representative chapter from each
// of CBSE and UP Board (mathematics). This demonstrates the validators catch
// real issues without requiring AI generation or DB access.

interface SampleChapterRef {
  boardId: string
  subjectSlug: string
  grade: number
  chapter: Chapter
}

function pickSampleChapter(boardId: string, subjectSlug: string): SampleChapterRef | null {
  const catalog = BOARD_CATALOGS.find((c) => c.boardId === boardId && c.subjectSlug === subjectSlug)
  if (!catalog) return null
  const gradeEntry = catalog.grades.find((g) => g.chapters.length > 0)
  if (!gradeEntry) return null
  return { boardId, subjectSlug, grade: gradeEntry.grade, chapter: gradeEntry.chapters[0] }
}

const CBSE_SAMPLE = pickSampleChapter('cbse', 'mathematics')
const UP_SAMPLE = pickSampleChapter('up_board', 'mathematics')

function topicsFor(chapter: Chapter): string[] {
  return getNodesForChapter(chapter).map((n) => n.title)
}

function goodChapterContent(chapter: Chapter): ChapterContent {
  const topics = topicsFor(chapter)
  const t1 = topics[0] ?? 'the main concept'
  const t2 = topics[1] ?? 'a related idea'
  return {
    summary: `This chapter focuses on ${t1} and shows how it connects to ${t2} and ideas covered earlier in the course. Students will explore worked examples, practice applying ${t1} in different situations, and build the confidence to use it when solving problems. By the end of this chapter, learners should be able to explain ${t1} in their own words and recognise it in new contexts.`,
    objectives: [
      `Understand ${t1}`,
      `Apply ${t1} to solve problems`,
      `Explain ${t1} in your own words`,
      `Connect ${t1} to ${t2}`,
    ],
  }
}

const FLAWED_CHAPTER_CONTENT: ChapterContent = { summary: 'Too short.', objectives: [] }

function goodRevisionNotes(chapter: Chapter): QuickRevisionNotes {
  const topics = topicsFor(chapter)
  const keyConcepts = topics.slice(0, 4)
  const t1 = topics[0] ?? 'the main concept'
  return {
    type: 'quick',
    summary: `Revise the key ideas in this chapter, focusing on ${t1}.`,
    keyConcepts: keyConcepts.length > 0 ? keyConcepts : [t1],
    importantTerms: [{ term: t1, definition: 'A key idea covered in this chapter.' }],
    commonMistakes: [
      'Rushing through steps without checking the working',
      'Forgetting to revise earlier topics before moving on',
    ],
    recallQuestions: [{ question: `What do you understand by "${t1}"?`, answer: `Review the lesson on ${t1}.` }],
  }
}

const FLAWED_REVISION_NOTES: RevisionNotes = {
  type: 'quick',
  summary: '',
  keyConcepts: [],
  importantTerms: [],
  commonMistakes: [],
  recallQuestions: [],
}

function goodPracticeQuestions(chapter: Chapter, tagPrefix: string): PracticeQuestion[] {
  const topics = topicsFor(chapter)
  const nodeIds = chapter.kgNodeIds.length > 0 ? chapter.kgNodeIds : [chapter.id]
  const t = (i: number) => topics[i % Math.max(topics.length, 1)] ?? 'this topic'
  const n = (i: number) => nodeIds[i % nodeIds.length]
  return [
    {
      id: 'q1', type: 'mcq', nodeId: n(0),
      question: `[${tagPrefix}] Which option best describes ${t(0)}?`,
      options: [`${t(0)} is a core idea in this chapter`, 'An unrelated topic', 'A topic from another subject', 'None of the above'],
      correctIndex: 0,
      explanation: `${t(0)} is indeed covered in this chapter.`,
    },
    {
      id: 'q2', type: 'mcq', nodeId: n(1),
      question: `[${tagPrefix}] Which statement is true about ${t(1)}?`,
      options: ['It is covered in this chapter', 'It is unrelated to this chapter', 'It belongs to a different subject', 'It does not apply here'],
      correctIndex: 0,
      explanation: `${t(1)} is correctly covered in this chapter.`,
    },
    {
      id: 'q3', type: 'mcq', nodeId: n(2),
      question: `[${tagPrefix}] Why does ${t(2)} matter in this chapter?`,
      options: ['It forms a foundation for later topics', 'It has no relevance here', 'It belongs to another subject', 'It is rarely used'],
      correctIndex: 0,
      explanation: `${t(2)} forms the foundation for what comes next.`,
    },
    {
      id: 'q4', type: 'true_false', nodeId: n(0),
      question: `[${tagPrefix}] True or false: ${t(0)} is covered in this chapter.`,
      correct: true,
      explanation: `Yes, ${t(0)} is a key part of this chapter.`,
    },
    {
      id: 'q5', type: 'short_answer', nodeId: n(1),
      question: `[${tagPrefix}] In 2-3 sentences, explain what you understand about ${t(1)}.`,
      sampleAnswer: `${t(1)} is an important idea in this chapter. It connects to other concepts and is useful for solving related problems.`,
      keywords: [t(1).toLowerCase().split(/\s+/)[0]],
    },
  ]
}

const FLAWED_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  { id: 'q1', type: 'mcq', nodeId: 'x', question: 'What?', options: ['A', 'A', 'B', 'C'], correctIndex: 5, explanation: '' },
  { id: 'q2', type: 'mcq', nodeId: 'x', question: 'What?', options: ['A', 'A', 'B', 'C'], correctIndex: 5, explanation: '' },
  { id: 'q3', type: 'true_false', nodeId: 'x', question: 'True or false: this is a fact.', correct: true, explanation: '' },
  { id: 'q4', type: 'short_answer', nodeId: 'x', question: 'Explain.', sampleAnswer: '', keywords: [] },
]

function goodAssessmentQuestions(chapter: Chapter): PracticeQuestion[] {
  const topics = topicsFor(chapter)
  const nodeIds = chapter.kgNodeIds.length > 0 ? chapter.kgNodeIds : [chapter.id]
  const t = (i: number) => topics[i % Math.max(topics.length, 1)] ?? `topic ${i + 1}`
  const n = (i: number) => nodeIds[i % nodeIds.length]
  const qs: PracticeQuestion[] = []

  for (let i = 0; i < ASSESSMENT_MCQ_COUNT; i++) {
    qs.push({
      id: `q${i + 1}`, type: 'mcq', nodeId: n(i),
      question: `Assessment Q${i + 1}: which statement best describes ${t(i)}?`,
      options: [`${t(i)} is covered in this chapter`, 'It belongs to a different subject', 'It is not part of this course', 'None of the above'],
      correctIndex: 0,
      explanation: `${t(i)} is a key concept covered in this chapter.`,
    })
  }
  for (let i = 0; i < ASSESSMENT_TF_COUNT; i++) {
    const idx = ASSESSMENT_MCQ_COUNT + i
    qs.push({
      id: `q${idx + 1}`, type: 'true_false', nodeId: n(idx),
      question: `Assessment Q${idx + 1}: true or false, ${t(idx)} is discussed in this chapter.`,
      correct: true,
      explanation: `Yes, ${t(idx)} is discussed in this chapter.`,
    })
  }
  for (let i = 0; i < ASSESSMENT_SA_COUNT; i++) {
    const idx = ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + i
    qs.push({
      id: `q${idx + 1}`, type: 'short_answer', nodeId: n(idx),
      question: `Assessment Q${idx + 1}: explain what you understand about ${t(idx)}.`,
      sampleAnswer: `${t(idx)} is an important concept covered in this chapter, and understanding it helps with later topics.`,
      keywords: [t(idx).toLowerCase().split(/\s+/)[0]],
    })
  }
  return qs
}

function flawedAssessmentQuestions(): PracticeQuestion[] {
  const make = (i: number): PracticeQuestion => ({
    id: `q${i}`, type: 'mcq', nodeId: 'unrelated-node',
    question: `Question ${i}?`,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    explanation: 'OK',
  })
  return [make(1), make(2), make(3), make(4), make(5)]
}

function buildGoodMockSample(): MockTestSample | null {
  if (!CBSE_SAMPLE) return null
  const catalog = BOARD_CATALOGS.find((c) => c.boardId === CBSE_SAMPLE.boardId && c.subjectSlug === CBSE_SAMPLE.subjectSlug)
  const gradeEntry = catalog?.grades.find((g) => g.grade === CBSE_SAMPLE.grade)
  const chapters = gradeEntry?.chapters ?? []
  if (chapters.length < 2) return null
  const [chA, chB] = chapters
  const qsA = goodPracticeQuestions(chA, chA.id)
  const qsB = goodPracticeQuestions(chB, chB.id)
  return { questions: [...qsA, ...qsB], chapterIds: [chA.id, chB.id], weakTopicIds: [qsA[0].nodeId] }
}

function buildFlawedMockSample(chapter: Chapter): MockTestSample {
  const base = goodPracticeQuestions(chapter, chapter.id)
  const dupQuestions = base.map((q, i) => (i === 1 ? { ...q, question: base[0].question } : q))
  return { questions: dupQuestions, chapterIds: [chapter.id], weakTopicIds: ['__nonexistent_weak_node__'] }
}

/** Run the full deterministic validation set across CBSE + UP Board sample chapters. No AI, no DB. */
export function runSampleValidation(): ContentValidationSummary {
  const reports: ContentValidationReport[] = []

  for (const sample of [CBSE_SAMPLE, UP_SAMPLE]) {
    if (!sample) continue
    const boardLabel = sample.boardId === 'cbse' ? 'CBSE' : 'UP Board'
    const chapterLabel = `${boardLabel} Grade ${sample.grade} ${sample.subjectSlug} — "${sample.chapter.title}"`

    reports.push(validateChapterSummary(goodChapterContent(sample.chapter), sample.chapter, `${chapterLabel} (good summary)`))
    reports.push(validateChapterSummary(FLAWED_CHAPTER_CONTENT, sample.chapter, `${chapterLabel} (flawed summary)`))

    reports.push(validateRevisionNotes(goodRevisionNotes(sample.chapter), `${chapterLabel} (good revision notes)`))
    reports.push(validateRevisionNotes(FLAWED_REVISION_NOTES, `${chapterLabel} (flawed revision notes)`))

    reports.push(validatePracticeQuestions(goodPracticeQuestions(sample.chapter, sample.chapter.id), `${chapterLabel} (good practice set)`))
    reports.push(validatePracticeQuestions(FLAWED_PRACTICE_QUESTIONS, `${chapterLabel} (flawed practice set)`))

    reports.push(validateAssessment(goodAssessmentQuestions(sample.chapter), sample.chapter, `${chapterLabel} (good assessment)`))
    reports.push(validateAssessment(flawedAssessmentQuestions(), sample.chapter, `${chapterLabel} (flawed assessment)`))
  }

  const goodMock = buildGoodMockSample()
  if (goodMock) reports.push(validateMockTest(goodMock, 'CBSE mock test sample (multi-chapter, good)'))
  if (CBSE_SAMPLE) reports.push(validateMockTest(buildFlawedMockSample(CBSE_SAMPLE.chapter), 'CBSE mock test sample (single chapter, flawed)'))

  return summarizeValidation(reports)
}
