import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  getSubjectPrelude, hasSubjectPrelude, preludeSubjectSlugs,
  shouldShowPrelude, isPreludeCompleted, EXPECTATIONS,
} from '@/lib/curriculum/subjectPrelude'

const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'computer_science'] as const

// ─── CONTENT ─────────────────────────────────────────────────────────────────

describe('prelude content — every subject is complete', () => {
  it('covers exactly the six curriculum subjects', () => {
    expect(preludeSubjectSlugs().sort()).toEqual([...SUBJECTS].sort())
  })

  it.each(SUBJECTS)('%s has every required section, non-empty', (slug) => {
    const p = getSubjectPrelude(slug)
    expect(p).not.toBeNull()
    const prelude = p!
    // 1-8, the required structure.
    expect(prelude.welcome.length).toBeGreaterThan(20)
    expect(prelude.bigQuestion.length).toBeGreaterThan(10)
    expect(prelude.whyItExists.length).toBeGreaterThan(50)
    expect(prelude.whyItMatters.length).toBeGreaterThan(50)
    expect(prelude.roadmap.length).toBeGreaterThanOrEqual(3)
    expect(prelude.worthLearning.length).toBeGreaterThan(50)
    expect(prelude.expectations.length).toBe(3)
    expect(prelude.transition.length).toBeGreaterThan(20)
    // Additional sections.
    expect(prelude.estimatedJourney.length).toBeGreaterThan(10)
    expect(Array.isArray(prelude.prerequisites)).toBe(true)
    expect(prelude.realWorldApplications.length).toBeGreaterThanOrEqual(3)
    expect(prelude.careerRelevance.length).toBeGreaterThanOrEqual(3)
    expect(prelude.connectedSubjects.length).toBeGreaterThanOrEqual(2)
    expect(prelude.motivation.length).toBeGreaterThan(30)
  })

  it.each(SUBJECTS)('%s roadmap stages all have a title and detail', (slug) => {
    for (const stage of getSubjectPrelude(slug)!.roadmap) {
      expect(stage.title.trim().length).toBeGreaterThan(0)
      expect(stage.detail.trim().length).toBeGreaterThan(10)
    }
  })

  it('uses the exact Big Questions specified', () => {
    expect(getSubjectPrelude('mathematics')!.bigQuestion).toBe('Why do humans need mathematics?')
    expect(getSubjectPrelude('physics')!.bigQuestion).toBe('Why does the universe behave the way it does?')
    expect(getSubjectPrelude('chemistry')!.bigQuestion).toBe('What is everything around us made of?')
    expect(getSubjectPrelude('biology')!.bigQuestion).toBe('What makes something alive?')
    expect(getSubjectPrelude('english')!.bigQuestion).toBe('How can thoughts travel from one mind to another?')
    expect(getSubjectPrelude('computer_science')!.bigQuestion)
      .toBe('How do machines solve problems by following instructions?')
  })

  it('states the three expectations identically for every subject', () => {
    // Shared on purpose: these are promises about how the PLATFORM teaches.
    for (const slug of SUBJECTS) {
      expect(getSubjectPrelude(slug)!.expectations).toBe(EXPECTATIONS)
    }
    const joined = EXPECTATIONS.join(' ').toLowerCase()
    expect(joined).toContain('no prior knowledge')
    expect(joined).toContain('mistakes are expected')
    expect(joined).toContain('memorisation')
  })

  it('returns null for a subject with no prelude, rather than throwing', () => {
    expect(getSubjectPrelude('school_mode')).toBeNull()
    expect(hasSubjectPrelude('school_mode')).toBe(false)
  })
})

// ─── THE GATE ────────────────────────────────────────────────────────────────

describe('one-time display behaviour', () => {
  it('FIRST SUBJECT ENTRY: shows the prelude', () => {
    expect(shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: null })).toBe(true)
  })

  it('shows it when the progress row does not exist yet (undefined)', () => {
    expect(shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: undefined })).toBe(true)
  })

  it('RETURNING LEARNER: never shows it again automatically', () => {
    expect(shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: new Date() })).toBe(false)
  })

  it('accepts a serialized timestamp from the API, not just a Date', () => {
    expect(shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: '2026-08-04T10:00:00.000Z' })).toBe(false)
  })

  it('REPLAY: shows it again only when explicitly requested', () => {
    expect(shouldShowPrelude({
      subjectSlug: 'physics', preludeViewedAt: new Date(), replayRequested: true,
    })).toBe(true)
  })

  it('a replay does not un-complete the prelude', () => {
    // The stored timestamp is what "completed" means; replay is a view.
    const viewedAt = new Date()
    expect(isPreludeCompleted(viewedAt)).toBe(true)
    shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: viewedAt, replayRequested: true })
    expect(isPreludeCompleted(viewedAt)).toBe(true)
  })

  it('a subject with no authored prelude never shows one — even on replay', () => {
    expect(shouldShowPrelude({ subjectSlug: 'school_mode', preludeViewedAt: null })).toBe(false)
    expect(shouldShowPrelude({ subjectSlug: 'school_mode', preludeViewedAt: null, replayRequested: true })).toBe(false)
  })

  it('MANUAL SUBJECT SELECTION behaves identically — the gate has no entry-path input', () => {
    // The gate depends only on (subject, timestamp, replay). There is no code
    // path that can enter a subject and bypass it, which is what makes "manual
    // selection must also trigger it" true by construction rather than by
    // remembering to handle it.
    for (const slug of SUBJECTS) {
      expect(shouldShowPrelude({ subjectSlug: slug, preludeViewedAt: null })).toBe(true)
    }
  })

  it('REFRESH / RECOVERY: the decision is derived from persisted state only', () => {
    // Mid-prelude refresh: nothing was written yet, so it shows again.
    expect(shouldShowPrelude({ subjectSlug: 'biology', preludeViewedAt: null })).toBe(true)
    // Interrupted AFTER completion: the timestamp survives, so it does not.
    expect(shouldShowPrelude({ subjectSlug: 'biology', preludeViewedAt: '2026-01-01T00:00:00.000Z' })).toBe(false)
  })

  it('treats an unparseable timestamp as not completed (fails safe)', () => {
    expect(isPreludeCompleted('not-a-date')).toBe(false)
    expect(shouldShowPrelude({ subjectSlug: 'physics', preludeViewedAt: 'not-a-date' })).toBe(true)
  })
})

// ─── ISOLATION FROM THE LESSON ENGINE ────────────────────────────────────────

describe('the prelude cannot affect lesson progression or mastery', () => {
  const PRELUDE_SRC = readFileSync(join(process.cwd(), 'src/lib/curriculum/subjectPrelude.ts'), 'utf8')
  const ROUTE_SRC = readFileSync(join(process.cwd(), 'src/app/api/curriculum/progress/route.ts'), 'utf8')

  it('the prelude module imports nothing from the teaching engine, Brain or KG', () => {
    expect(PRELUDE_SRC).not.toMatch(/from '@\/lib\/teaching/)
    expect(PRELUDE_SRC).not.toMatch(/from '@\/lib\/teaching-engine/)
    expect(PRELUDE_SRC).not.toMatch(/educationalBrain/)
    expect(PRELUDE_SRC).not.toMatch(/knowledgeGraph/)
  })

  it('the write path touches preludeViewedAt and no progression field', () => {
    const start = ROUTE_SRC.indexOf('export async function POST')
    expect(start).toBeGreaterThan(-1)
    const body = ROUTE_SRC.slice(start)
    expect(body).toContain('preludeViewedAt')

    // Only the WRITE clauses are constrained. `select:` legitimately reads
    // currentLesson/completedLessons to return the caller's progress — reading
    // them cannot affect anything, and asserting over the whole handler would
    // forbid returning an accurate payload.
    const update = body.slice(body.indexOf('update: {'), body.indexOf('create: {'))
    const create = body.slice(body.indexOf('create: {'), body.indexOf('select: {'))
    for (const clause of [update, create]) {
      expect(clause.length).toBeGreaterThan(0)
      for (const forbidden of ['currentLesson:', 'completedLessons:', 'completionPercent:', 'isCompleted:']) {
        expect(clause, `prelude write must not set ${forbidden}`).not.toContain(forbidden)
      }
    }
    // And no XP anywhere in the handler — the prelude is not an achievement.
    expect(body).not.toContain('awardXP')
  })

  it('is stored on the existing StudentProgress row — no new table', () => {
    const schema = readFileSync(join(process.cwd(), 'prisma/schema.prisma'), 'utf8')
    const model = schema.slice(schema.indexOf('model StudentProgress'))
    expect(model.slice(0, model.indexOf('\n}'))).toContain('preludeViewedAt')
    // Nullable, so existing rows read "not seen" rather than needing a backfill.
    expect(model).toMatch(/preludeViewedAt\s+DateTime\?/)
    expect(schema).not.toMatch(/model\s+SubjectPrelude/)
  })
})

// ─── WIRING ──────────────────────────────────────────────────────────────────

describe('prelude wiring in LessonScreen', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('renders in front of the Start Lesson gate, never during a started lesson', () => {
    expect(SRC).toContain('preludeVisible && subjectPrelude')
    // The Start Lesson preview is suppressed while the prelude is up, so the
    // learner cannot reach Lesson 1 around it on first entry.
    // `entryGateReady` was inserted between them so neither overlay renders
    // before curriculum + history have loaded (the ~2s flash). The property
    // this test protects — the Start Lesson preview stays suppressed while the
    // prelude is up — is unchanged.
    expect(SRC).toContain("!lessonStarted && messages.length === 0 && entryGateReady && !preludeVisible")
  })

  it('PRELUDE COMPLETION → LESSON 1: completing dismisses the gate immediately', () => {
    const start = SRC.indexOf('const completePrelude = useCallback')
    expect(start).toBeGreaterThan(-1)
    const body = SRC.slice(start, start + 1400)
    expect(body).toContain("method: 'POST'")
    expect(body).toContain('setPreludeDismissed(true)')
    // Dismissed even on failure — a learner is never trapped behind it.
    expect(body).toContain('catch')
  })

  it('offers replay from Subject Overview only after completion', () => {
    expect(SRC).toContain('isPreludeCompleted(curriculumProgress.preludeViewedAt)')
    expect(SRC).toContain('replayPrelude')
  })

  it('replay never clears the stored completion', () => {
    const start = SRC.indexOf('const replayPrelude = useCallback')
    const body = SRC.slice(start, start + 400)
    expect(body).not.toContain('preludeViewedAt: null')
    expect(body).toContain('setPreludeReplay(true)')
  })
})
