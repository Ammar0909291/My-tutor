/**
 * Offline unit harness for src/lib/school/adaptive/learningProfile.ts.
 *
 * Note: the user's prompt referenced `src/lib/school/learningProfile.ts`,
 * which does not exist — the real file lives one level deeper, under
 * `src/lib/school/adaptive/learningProfile.ts`. Function names are exactly
 * as named in the prompt: formatLearningProfileContext, chapterDifficultyBadge,
 * checkpointFrequencyForMode. buildLearningProfile itself is excluded — it
 * makes live prisma calls with no injectable client param.
 *
 * Run with:  npx tsx scripts/test-learning-profile.ts
 */
import {
  formatLearningProfileContext,
  chapterDifficultyBadge,
  checkpointFrequencyForMode,
  type StudentLearningProfile,
  type DifficultyMode,
} from '../src/lib/school/adaptive/learningProfile'
import type { TeachingStyleResult } from '../src/lib/school/adaptive/teachingStyle'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function style(s: TeachingStyleResult['style'] = 'STEP_BY_STEP', confidence: TeachingStyleResult['confidence'] = 'low', label = 'Step-by-Step'): TeachingStyleResult {
  return { style: s, confidence, label }
}

function profile(overrides: Partial<StudentLearningProfile> = {}): StudentLearningProfile {
  return {
    grade: 8,
    strengths: [],
    weaknesses: [],
    masteredTopics: [],
    strugglingTopics: [],
    preferredDifficulty: 'standard',
    preferredTeachingStyle: style(),
    prerequisiteGapCount: 0,
    examReadinessSummary: null,
    masterySummary: null,
    ...overrides,
  }
}

async function run() {
  // ── checkpointFrequencyForMode ───────────────────────────────────────────
  check('guided → frequent', checkpointFrequencyForMode('guided') === 'frequent')
  check('advanced → reduced', checkpointFrequencyForMode('advanced') === 'reduced')
  check('standard → normal', checkpointFrequencyForMode('standard') === 'normal')

  // ── chapterDifficultyBadge ───────────────────────────────────────────────
  check('0 nodes, grade 1 → Easy', chapterDifficultyBadge(0, 1).label === 'Easy')
  check('2 nodes, grade 8 (weight 0, score 2) → Easy (boundary)', chapterDifficultyBadge(2, 8).label === 'Easy')
  check('3 nodes, grade 8 (score 3) → Moderate (just past boundary)', chapterDifficultyBadge(3, 8).label === 'Moderate')
  check('5 nodes, grade 8 (score 5) → Moderate (boundary)', chapterDifficultyBadge(5, 8).label === 'Moderate')
  check('6 nodes, grade 8 (score 6) → Advanced (just past boundary)', chapterDifficultyBadge(6, 8).label === 'Advanced')
  check('senior grade 11 adds +2 weight: 1 node → score 3 → Moderate', chapterDifficultyBadge(1, 11).label === 'Moderate')
  check('mid grade 9 adds +1 weight: 2 nodes → score 3 → Moderate', chapterDifficultyBadge(2, 9).label === 'Moderate')
  check('grade 10 also gets +1 weight (same bracket as 9)', chapterDifficultyBadge(2, 10).label === 'Moderate')
  check('grade 12 gets +2 weight (same bracket as 11)', chapterDifficultyBadge(0, 12).label === 'Easy')
  check('badge includes a color field', typeof chapterDifficultyBadge(1, 8).color === 'string')
  check('badge includes a bg field', typeof chapterDifficultyBadge(1, 8).bg === 'string')

  // ── formatLearningProfileContext ─────────────────────────────────────────
  {
    const result = formatLearningProfileContext(profile())
    check('base profile → includes grade line', result.includes('Grade: 8'))
    check('base profile → includes coaching mode uppercased', result.includes('Coaching mode: STANDARD'))
    check('base profile → no strengths line when empty', !result.includes('Strong topics'))
  }
  {
    const result = formatLearningProfileContext(profile({ strengths: ['algebra', 'geometry', 'trig', 'extra-topic'] }))
    check('strengths present → includes Strong topics line capped at 3', result.includes('Strong topics (can move quickly): algebra, geometry, trig') && !result.includes('extra-topic'))
  }
  {
    const result = formatLearningProfileContext(profile({ weaknesses: ['fractions'] }))
    check('weaknesses present → includes Weak topics line', result.includes('Weak topics (reinforce gently): fractions'))
  }
  {
    const result = formatLearningProfileContext(profile({ strugglingTopics: ['photosynthesis'] }))
    check('strugglingTopics present → includes struggling line', result.includes('Currently struggling with: photosynthesis'))
  }
  {
    const result = formatLearningProfileContext(profile({ masterySummary: 'True Mastery' }))
    check('masterySummary present → includes chapter mastery line', result.includes('Chapter mastery: True Mastery'))
  }
  {
    const result = formatLearningProfileContext(profile({ masterySummary: null }))
    check('masterySummary null → no chapter mastery line', !result.includes('Chapter mastery'))
  }
  {
    const result = formatLearningProfileContext(profile({ preferredDifficulty: 'guided' }))
    check('guided mode → includes gentle questioning prompt', result.includes('Can you try this step?'))
  }
  {
    const result = formatLearningProfileContext(profile({ preferredDifficulty: 'advanced' }))
    check('advanced mode → includes challenge questioning prompt', result.includes('Can you work out why that\'s true?'))
  }
  {
    const result = formatLearningProfileContext(profile({ preferredDifficulty: 'standard' }))
    check('standard mode → no extra questioning prompt block', !result.includes('Can you try this step?') && !result.includes('Can you work out why'))
  }

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
