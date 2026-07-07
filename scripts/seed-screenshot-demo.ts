/**
 * Run with: npx tsx scripts/seed-screenshot-demo.ts
 *
 * Creates realistic demo accounts for the screenshot-audit sprint:
 *   - shot.student@mytutor-demo.local  (GENERAL_LEARNER, rich progress/cert/mistakes)
 *   - shot.admin@mytutor-demo.local    (role bootstrapped to ADMIN on first login
 *                                        via maybeBootstrapAdmin — but we also set
 *                                        role directly here so admin pages work
 *                                        even without a live login first)
 *     NOTE: ADMIN_EMAILS in .env is "admin.beta@mytutor-test.local" (pre-existing
 *     account, password unknown). We create our OWN admin with a known password
 *     and additionally add its email pattern check via direct role=ADMIN write,
 *     since maybeBootstrapAdmin only promotes emails listed in ADMIN_EMAILS.
 *   - shot.school@mytutor-demo.local   (SCHOOL_STUDENT, CBSE grade 8, mathematics)
 *
 * Idempotent — safe to re-run (upserts).
 *
 * Password for all three: DemoPass123!  (bcrypt, 12 rounds — matches
 * src/app/api/auth/register/route.ts hashing so NextAuth Credentials login works)
 */
import { PrismaClient, TopicStatus, EvidenceType } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { currentWeekString } from '../src/lib/xp'

const prisma = new PrismaClient()

const PASSWORD = 'DemoPass123!'

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 12)

  // ─── 1. Student demo user ──────────────────────────────────────────────────
  const student = await prisma.user.upsert({
    where: { email: 'shot.student@mytutor-demo.local' },
    update: {},
    create: {
      email: 'shot.student@mytutor-demo.local',
      name: 'Asha Verma',
      passwordHash,
      role: 'STUDENT',
      onboardingCompleted: true,
      xpPoints: 2150,
    },
  })

  await prisma.profile.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      displayName: 'Asha Verma',
      selfDescription: 'Learning Python and English to switch into a dev career.',
      userType: 'GENERAL_LEARNER',
      teachingLanguage: 'en',
      country: 'India',
      streakDays: 12,
      totalSessions: 34,
      totalMessages: 410,
      lastStudiedTopic: 'Functions & Recursion',
      lastStudyDate: new Date(),
      masteredTopics: ['python_setup', 'variables_types', 'input_output', 'conditionals_py'],
      confusedTopics: ['recursion', 'pointer_arithmetic'],
    },
  })

  const pythonSubject = await prisma.subject.findUnique({ where: { slug: 'python' } })
  const englishSubject = await prisma.subject.findUnique({ where: { slug: 'english' } })

  if (pythonSubject) {
    const profile = await prisma.profile.findUnique({ where: { userId: student.id } })
    if (profile) {
      await prisma.profileSubject.upsert({
        where: { profileId_subjectId: { profileId: profile.id, subjectId: pythonSubject.id } },
        update: { progressPercent: 72, currentLevelIndex: 2 },
        create: {
          profileId: profile.id,
          subjectId: pythonSubject.id,
          currentLevelIndex: 2,
          targetLevelIndex: 4,
          progressPercent: 72,
          estimatedHoursLeft: 18,
        },
      })
    }
  }
  if (englishSubject) {
    const profile = await prisma.profile.findUnique({ where: { userId: student.id } })
    if (profile) {
      await prisma.profileSubject.upsert({
        where: { profileId_subjectId: { profileId: profile.id, subjectId: englishSubject.id } },
        update: { progressPercent: 35, currentLevelIndex: 1 },
        create: {
          profileId: profile.id,
          subjectId: englishSubject.id,
          currentLevelIndex: 1,
          targetLevelIndex: 3,
          progressPercent: 35,
          estimatedHoursLeft: 40,
        },
      })
    }
  }

  // StudentProgress (legacy curriculum tracker) — Python lessons 1-6 completed
  await prisma.studentProgress.upsert({
    where: { userId_subjectCode: { userId: student.id, subjectCode: 'python' } },
    update: {},
    create: {
      userId: student.id,
      subjectCode: 'python',
      currentLesson: 7,
      completedLessons: [1, 2, 3, 4, 5, 6],
      lastLessonTitle: 'def & return',
      lastUnitTitle: 'Functions',
      completionPercent: 40,
      isCompleted: false,
    },
  })

  // TopicProgress — knowledge-graph node tracking, mix of COMPLETED/MASTERED
  const topicSlugs: { slug: string; status: TopicStatus; mastery: number }[] = [
    { slug: 'python_setup', status: 'MASTERED', mastery: 98 },
    { slug: 'variables_types', status: 'MASTERED', mastery: 95 },
    { slug: 'input_output', status: 'COMPLETED', mastery: 84 },
    { slug: 'conditionals_py', status: 'COMPLETED', mastery: 80 },
    { slug: 'loops_basic', status: 'COMPLETED', mastery: 76 },
    { slug: 'functions_intro', status: 'IN_PROGRESS', mastery: 55 },
    { slug: 'scope_closures', status: 'NOT_STARTED', mastery: 0 },
  ]
  for (const t of topicSlugs) {
    await prisma.topicProgress.upsert({
      where: { userId_subjectSlug_topicSlug: { userId: student.id, subjectSlug: 'python', topicSlug: t.slug } },
      update: { status: t.status, masteryPct: t.mastery },
      create: {
        userId: student.id,
        subjectSlug: 'python',
        topicSlug: t.slug,
        status: t.status,
        masteryPct: t.mastery,
        attempts: t.mastery > 0 ? 3 : 0,
        lastScore: t.mastery > 0 ? t.mastery : null,
        completedAt: t.status === 'COMPLETED' || t.status === 'MASTERED' ? new Date() : null,
      },
    })
  }

  // MistakeRecord — needs a PracticeSession to reference
  const practiceSession = await prisma.practiceSession.upsert({
    where: { idempotencyKey: 'shot-demo-practice-1' },
    update: {},
    create: {
      userId: student.id,
      subjectSlug: 'python',
      topicSlug: 'functions_intro',
      kind: 'practice',
      questions: [
        { id: 'q1', question: 'What keyword defines a function in Python?', options: ['def', 'func', 'function', 'lambda'], correctIndex: 0 },
        { id: 'q2', question: 'What does a function return by default?', options: ['0', 'None', 'undefined', 'null'], correctIndex: 1 },
      ],
      score: 70,
      completedAt: new Date(),
      idempotencyKey: 'shot-demo-practice-1',
    },
  })

  await prisma.mistakeRecord.createMany({
    data: [
      {
        userId: student.id,
        subjectSlug: 'python',
        topicSlug: 'functions_intro',
        sessionId: practiceSession.id,
        category: 'conceptual_misunderstanding',
        questionId: 'q2',
      },
    ],
    skipDuplicates: true,
  })

  // StudySession — at least one
  await prisma.studySession.createMany({
    data: [
      { userId: student.id, subjectId: pythonSubject?.id, minutes: 35, source: 'learn_session', date: new Date(Date.now() - 86400000) },
      { userId: student.id, subjectId: pythonSubject?.id, minutes: 28, source: 'learn_session', date: new Date(Date.now() - 2 * 86400000) },
      { userId: student.id, subjectId: englishSubject?.id, minutes: 20, source: 'learn_session', date: new Date() },
    ],
    skipDuplicates: true,
  })

  // EvidenceRecord, PerformanceMetric, RetentionMetric — feeds /progress page
  await prisma.evidenceRecord.createMany({
    data: [
      { userId: student.id, subjectSlug: 'python', topicSlug: 'functions_intro', type: EvidenceType.PRACTICE, score: 70, weight: 1 },
      { userId: student.id, subjectSlug: 'python', topicSlug: 'loops_basic', type: EvidenceType.QUIZ, score: 90, weight: 1 },
    ],
    skipDuplicates: true,
  })

  if (pythonSubject) {
    await prisma.retentionMetric.upsert({
      where: { userId_subjectId_topic: { userId: student.id, subjectId: pythonSubject.id, topic: 'functions_intro' } },
      update: {},
      create: {
        userId: student.id,
        subjectId: pythonSubject.id,
        topic: 'functions_intro',
        masteryScore: 55,
        confidenceScore: 60,
        decayScore: 10,
        reviewCount: 2,
        lastReviewedAt: new Date(),
      },
    })

    await prisma.subjectAnalytics.upsert({
      where: { userId_subjectId: { userId: student.id, subjectId: pythonSubject.id } },
      update: {},
      create: {
        userId: student.id,
        subjectId: pythonSubject.id,
        progressPercent: 72,
        studyMinutes: 620,
        lessonsCompleted: 6,
        assessmentsPassed: 3,
        strongTopics: ['variables_types', 'python_setup'],
        weakTopics: ['recursion'],
        trend: 'IMPROVING',
      },
    })
  }

  await prisma.learningAnalytics.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      totalStudyMinutes: 1240,
      currentStreakDays: 12,
      longestStreakDays: 21,
      lastStudyDate: new Date(),
      lessonsCompleted: 9,
      assessmentsPassed: 4,
      projectsCompleted: 1,
      overallCompletionPct: 48,
    },
  })

  // Flashcards — due now, for /flashcards
  await prisma.flashcard.createMany({
    data: [
      { userId: student.id, topic: 'Python Functions', question: 'How do you define a function with a default argument?', answer: 'def greet(name="World"): ...', nextReview: new Date() },
      { userId: student.id, topic: 'Python Functions', question: 'What does `return` do if omitted?', answer: 'The function returns None.', nextReview: new Date() },
      { userId: student.id, topic: 'English Vocabulary', question: 'What does "deprecated" mean?', answer: 'No longer recommended for use; will be removed in future.', nextReview: new Date() },
    ],
    skipDuplicates: true,
  })

  // Gamification: XP transactions, level, streak, achievement
  await prisma.xpTransaction.createMany({
    data: [
      { userId: student.id, amount: 50, action: 'LESSON_COMPLETED', reason: 'Completed: Functions Intro' },
      { userId: student.id, amount: 100, action: 'QUIZ_PASSED', reason: 'Passed Python Loops quiz' },
      { userId: student.id, amount: 200, action: 'CERTIFICATE_EARNED', reason: 'Earned certificate' },
    ],
    skipDuplicates: true,
  })

  await prisma.userLevel.upsert({
    where: { userId: student.id },
    update: {},
    create: { userId: student.id, level: 6, tier: 'Silver', xpInLevel: 350, xpToNext: 650 },
  })

  await prisma.studyStreak.upsert({
    where: { userId: student.id },
    update: {},
    create: { userId: student.id, currentStreak: 12, longestStreak: 21, totalActiveDays: 40, lastActiveDate: new Date() },
  })

  // Weekly XP — leaderboard needs rows across multiple users to render meaningfully.
  // Must use the app's own week-key format (lib/xp.ts currentWeekString — a
  // simplified, non-ISO week calc), not a generic ISO-8601 week number, or the
  // leaderboard query (which keys off currentWeekString()) won't find this row.
  const week = currentWeekString()
  await prisma.weeklyXP.upsert({
    where: { userId_week: { userId: student.id, week } },
    update: { xp: 1280 },
    create: { userId: student.id, week, xp: 1280 },
  })

  // ─── Roadmap enrollment + Certificate (for /certificates and /certificates/[code]) ─
  const roadmap = await prisma.roadmap.findFirst()
  let certCode = 'DEMO-NOCERT'
  if (roadmap) {
    const enrollment = await prisma.roadmapEnrollment.upsert({
      where: { userId_roadmapId: { userId: student.id, roadmapId: roadmap.id } },
      update: { status: 'COMPLETED', progressPct: 100, completedAt: new Date() },
      create: {
        userId: student.id,
        roadmapId: roadmap.id,
        status: 'COMPLETED',
        progressPct: 100,
        completedAt: new Date(),
      },
    })

    certCode = 'MYTUTOR-DEMO-' + student.id.slice(-6).toUpperCase()
    const certificate = await prisma.certificate.upsert({
      where: { userId_roadmapId: { userId: student.id, roadmapId: roadmap.id } },
      update: {},
      create: {
        certificateCode: certCode,
        userId: student.id,
        roadmapId: roadmap.id,
        enrollmentId: enrollment.id,
        recipientName: 'Asha Verma',
        roadmapTitle: roadmap.title,
      },
    })
    certCode = certificate.certificateCode
  }

  // Subject completion certificate (Sprint N) — for the alternate cert type
  await prisma.finalAssessmentResult.upsert({
    where: { userId_subjectCode: { userId: student.id, subjectCode: 'english' } },
    update: {},
    create: {
      userId: student.id,
      subjectCode: 'english',
      score: 88,
      totalQuestions: 20,
      passed: true,
    },
  })
  const subjectCertCode = 'MYTUTOR-ENG-' + student.id.slice(-6).toUpperCase()
  await prisma.subjectCertificate.upsert({
    where: { userId_subjectCode: { userId: student.id, subjectCode: 'english' } },
    update: {},
    create: {
      userId: student.id,
      subjectCode: 'english',
      subjectName: 'English',
      certificateCode: subjectCertCode,
      recipientName: 'Asha Verma',
      totalLessons: 12,
      score: 88,
    },
  })

  // CoachProfile + a placement-interview-complete LearningGoal so /coach has data
  const coachProfile = await prisma.coachProfile.upsert({
    where: { userId: student.id },
    update: {},
    create: { userId: student.id, notes: 'Wants to become a backend developer within 6 months.' },
  })
  if (pythonSubject) {
    await prisma.learningGoal.upsert({
      where: { coachProfileId_subjectId: { coachProfileId: coachProfile.id, subjectId: pythonSubject.id } },
      update: {},
      create: {
        coachProfileId: coachProfile.id,
        subjectId: pythonSubject.id,
        claimedLevel: 'BEGINNER',
        targetLevel: 'INTERMEDIATE',
        reason: 'CAREER',
        dailyMinutes: 30,
        recommendedLevel: 'BEGINNER',
        status: 'PLAN_READY',
      },
    })
  }

  console.log(`Student seeded: ${student.email} / password: ${PASSWORD}`)
  console.log(`  Roadmap certificate code: ${certCode}`)
  console.log(`  Subject certificate code: ${subjectCertCode}`)

  // ─── 2. Admin demo user ────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'shot.admin@mytutor-demo.local' },
    update: { role: 'ADMIN', onboardingCompleted: true },
    create: {
      email: 'shot.admin@mytutor-demo.local',
      name: 'Demo Admin',
      passwordHash,
      role: 'ADMIN',
      onboardingCompleted: true,
      xpPoints: 0,
    },
  })
  await prisma.profile.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      displayName: 'Demo Admin',
      selfDescription: 'Platform administrator account for screenshot audit.',
      userType: 'GENERAL_LEARNER',
      teachingLanguage: 'en',
    },
  })
  console.log(`Admin seeded: ${admin.email} / password: ${PASSWORD} (role=ADMIN)`)

  // ─── 3. School student demo user ───────────────────────────────────────────
  const schoolUser = await prisma.user.upsert({
    where: { email: 'shot.school@mytutor-demo.local' },
    update: {},
    create: {
      email: 'shot.school@mytutor-demo.local',
      name: 'Rohan Mehta',
      passwordHash,
      role: 'STUDENT',
      onboardingCompleted: true,
      xpPoints: 540,
    },
  })
  await prisma.profile.upsert({
    where: { userId: schoolUser.id },
    update: {},
    create: {
      userId: schoolUser.id,
      displayName: 'Rohan Mehta',
      selfDescription: 'CBSE Class 8 student.',
      userType: 'SCHOOL_STUDENT',
      educationBoard: 'cbse',
      grade: 8,
      teachingLanguage: 'en',
      streakDays: 5,
      lastStudyDate: new Date(),
    },
  })

  // School-mode progress: namespaced subjectCode "<board>:<subjectSlug>:<grade>"
  await prisma.studentProgress.upsert({
    where: { userId_subjectCode: { userId: schoolUser.id, subjectCode: 'cbse:mathematics:8' } },
    update: {},
    create: {
      userId: schoolUser.id,
      subjectCode: 'cbse:mathematics:8',
      currentLesson: 3,
      completedLessons: [1, 2],
      lastLessonTitle: 'Rational Numbers',
      lastUnitTitle: 'Number Systems',
      completionPercent: 18,
      isCompleted: false,
    },
  })

  console.log(`School student seeded: ${schoolUser.email} / password: ${PASSWORD} (CBSE Grade 8)`)

  console.log('\nDone. All accounts use password: ' + PASSWORD)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
