/**
 * Offline unit harness for buildExamReadinessBlock + buildExamReadinessSummaryText
 * in src/lib/school/adaptive/examReadiness.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-exam-readiness.ts
 */

import { buildExamReadinessBlock, buildExamReadinessSummaryText } from '../src/lib/school/adaptive/examReadiness'
import type { ExamReadiness, ExamReadinessSummary } from '../src/lib/school/adaptive/examReadiness'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function readiness(overrides: Partial<ExamReadiness> = {}): ExamReadiness {
  return {
    subjectSlug: 'mathematics',
    subjectLabel: 'Mathematics',
    readinessPercent: 75,
    level: 'exam_ready',
    levelLabel: 'Exam Ready',
    masteryCoverage: 80,
    assessmentStrength: 70,
    revisionCoverage: 90,
    weakTopicRisk: 10,
    strongTopicIds: [],
    riskTopicIds: [],
    confidence: 'high',
    ...overrides,
  }
}

const titleMap: Record<string, string> = {
  'algebra.basics': 'Algebra Basics',
  'fractions.intro': 'Fractions Introduction',
  'geometry.shapes': 'Geometry Shapes',
  'unknown.node': '',
}
const nodeIdToTitle = (id: string) => titleMap[id] ?? id

// ── buildExamReadinessBlock ─────────────────────────────────────────────────

check('confidence low → empty string',
  buildExamReadinessBlock(readiness({ confidence: 'low' }), nodeIdToTitle) === '')

check('confidence medium → non-empty string',
  buildExamReadinessBlock(readiness({ confidence: 'medium' }), nodeIdToTitle).length > 0)

check('confidence high → non-empty string',
  buildExamReadinessBlock(readiness({ confidence: 'high' }), nodeIdToTitle).length > 0)

check('block includes header EXAM READINESS',
  buildExamReadinessBlock(readiness(), nodeIdToTitle).includes('EXAM READINESS'))

check('block includes subjectLabel and readinessPercent and levelLabel',
  buildExamReadinessBlock(readiness({ subjectLabel: 'Science', readinessPercent: 88, levelLabel: 'Strongly Prepared' }), nodeIdToTitle)
    .includes('Science: 88% (Strongly Prepared)'))

check('strongTopicIds present → Strong areas line included with resolved titles',
  buildExamReadinessBlock(readiness({ strongTopicIds: ['algebra.basics', 'fractions.intro'] }), nodeIdToTitle)
    .includes('Strong areas: Algebra Basics, Fractions Introduction'))

check('strongTopicIds empty → no Strong areas line',
  !buildExamReadinessBlock(readiness({ strongTopicIds: [] }), nodeIdToTitle).includes('Strong areas'))

check('riskTopicIds present → Risk areas line included with resolved titles',
  buildExamReadinessBlock(readiness({ riskTopicIds: ['geometry.shapes'] }), nodeIdToTitle)
    .includes('Risk areas: Geometry Shapes'))

check('riskTopicIds empty → no Risk areas line',
  !buildExamReadinessBlock(readiness({ riskTopicIds: [] }), nodeIdToTitle).includes('Risk areas'))

check('riskTopicIds with an unresolvable title (empty string) → filtered out, no dangling comma',
  buildExamReadinessBlock(readiness({ riskTopicIds: ['unknown.node', 'geometry.shapes'] }), nodeIdToTitle)
    .includes('Risk areas: Geometry Shapes') &&
  !buildExamReadinessBlock(readiness({ riskTopicIds: ['unknown.node', 'geometry.shapes'] }), nodeIdToTitle).includes(', Geometry'))

check('level=exam_ready → consolidation instruction line',
  buildExamReadinessBlock(readiness({ level: 'exam_ready' }), nodeIdToTitle).includes('focus on consolidation'))

check('level=strongly_prepared → consolidation instruction line (same branch as exam_ready)',
  buildExamReadinessBlock(readiness({ level: 'strongly_prepared' }), nodeIdToTitle).includes('focus on consolidation'))

check('level=developing → exam-preparation instruction line',
  buildExamReadinessBlock(readiness({ level: 'developing' }), nodeIdToTitle).includes('needs exam preparation'))

check('level=needs_preparation → exam-preparation instruction line (same branch as developing)',
  buildExamReadinessBlock(readiness({ level: 'needs_preparation' }), nodeIdToTitle).includes('needs exam preparation'))

check('exam-ready branch does NOT include needs-preparation text',
  !buildExamReadinessBlock(readiness({ level: 'exam_ready' }), nodeIdToTitle).includes('needs exam preparation'))

check('developing branch does NOT include consolidation text',
  !buildExamReadinessBlock(readiness({ level: 'developing' }), nodeIdToTitle).includes('focus on consolidation'))

// ── buildExamReadinessSummaryText ───────────────────────────────────────────

function summary(subjects: ExamReadiness[]): ExamReadinessSummary {
  return {
    subjects,
    overallReadiness: subjects.length > 0 ? Math.round(subjects.reduce((s, r) => s + r.readinessPercent, 0) / subjects.length) : 0,
    readiestSubject: subjects[0]?.subjectSlug ?? null,
    weakestSubject: subjects[subjects.length - 1]?.subjectSlug ?? null,
  }
}

check('empty subjects → empty string',
  buildExamReadinessSummaryText(summary([])) === '')

check('single subject → formatted as "Label: pct% (levelLabel)"',
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'Mathematics', readinessPercent: 75, levelLabel: 'Exam Ready' })]))
    === 'Mathematics: 75% (Exam Ready)')

check('two subjects → joined with ", "',
  buildExamReadinessSummaryText(summary([
    readiness({ subjectLabel: 'Mathematics', readinessPercent: 75, levelLabel: 'Exam Ready' }),
    readiness({ subjectLabel: 'Science', readinessPercent: 40, levelLabel: 'Developing' }),
  ])) === 'Mathematics: 75% (Exam Ready), Science: 40% (Developing)')

check('three subjects → preserves input order, not sorted by readiness',
  buildExamReadinessSummaryText(summary([
    readiness({ subjectLabel: 'Science', readinessPercent: 30, levelLabel: 'Needs Preparation' }),
    readiness({ subjectLabel: 'Mathematics', readinessPercent: 90, levelLabel: 'Strongly Prepared' }),
  ])).startsWith('Science: 30%'))

check('three subjects → all three labels present in output',
  ['Hindi', 'English', 'Social Science'].every((label) =>
    buildExamReadinessSummaryText(summary([
      readiness({ subjectLabel: 'Hindi', readinessPercent: 50, levelLabel: 'Developing' }),
      readiness({ subjectLabel: 'English', readinessPercent: 60, levelLabel: 'Developing' }),
      readiness({ subjectLabel: 'Social Science', readinessPercent: 70, levelLabel: 'Exam Ready' }),
    ])).includes(label)
  ))

check('readinessPercent of 0 renders as "0%", not omitted',
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'X', readinessPercent: 0, levelLabel: 'Needs Preparation' })]))
    === 'X: 0% (Needs Preparation)')

check('readinessPercent of 100 renders correctly',
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'X', readinessPercent: 100, levelLabel: 'Strongly Prepared' })]))
    === 'X: 100% (Strongly Prepared)')

check('does not include the word EXAM READINESS header (summary is plain, unlike buildExamReadinessBlock)',
  !buildExamReadinessSummaryText(summary([readiness()])).includes('EXAM READINESS'))

check('output contains no leading/trailing whitespace',
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'X' })])) ===
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'X' })])).trim())

check('function is deterministic — same summary twice gives same output',
  buildExamReadinessSummaryText(summary([readiness()])) === buildExamReadinessSummaryText(summary([readiness()])))

check('subjectLabel containing a colon is not escaped or altered',
  buildExamReadinessSummaryText(summary([readiness({ subjectLabel: 'Math: Advanced', readinessPercent: 50, levelLabel: 'Developing' })]))
    === 'Math: Advanced: 50% (Developing)')

check('four subjects → three separators (", ") present',
  buildExamReadinessSummaryText(summary([
    readiness({ subjectLabel: 'A', readinessPercent: 10, levelLabel: 'Needs Preparation' }),
    readiness({ subjectLabel: 'B', readinessPercent: 20, levelLabel: 'Needs Preparation' }),
    readiness({ subjectLabel: 'C', readinessPercent: 30, levelLabel: 'Needs Preparation' }),
    readiness({ subjectLabel: 'D', readinessPercent: 40, levelLabel: 'Developing' }),
  ])).split(', ').length === 4)

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
