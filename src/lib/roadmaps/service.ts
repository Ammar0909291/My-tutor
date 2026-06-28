// Career Roadmap service (Sprint D, Parts 1-6).
//
// Additive layer that sits on top of the existing Subject/ProfileSubject/
// LearningPath enrollment machinery (mirrors `/api/subjects/enroll`),
// RetentionMetric/Project mastery system (Sprint C), and assessment results.
// Roadmaps don't replace any of those — they bundle them into a tracked,
// outcome-oriented path that ends in a capstone project and a certificate.

import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { generateJSON } from '@/lib/ai/client'
import { findLibrarySubject, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import { ROADMAP_CATALOG, findRoadmap } from './catalog'
import { refreshJobReadiness } from './jobReadiness'
import { SubjectType, ProjectStatus, type MilestoneKind, type RoadmapStatus } from '@prisma/client'

const CATEGORY_TO_TYPE: Record<SubjectCategory, SubjectType> = {
  languages: SubjectType.LANGUAGE,
  programming: SubjectType.PROGRAMMING,
  mathematics: SubjectType.MATHEMATICS,
  physics: SubjectType.PHYSICS,
  chemistry: SubjectType.CHEMISTRY,
  biology: SubjectType.BIOLOGY,
  ai: SubjectType.AI,
  computer_science: SubjectType.COMPUTER_SCIENCE,
}

// ─── Catalog seeding ──────────────────────────────────────────────────────────

/** Idempotently mirrors a catalog roadmap (+ its capstone) into the DB. */
export async function ensureRoadmapSeeded(roadmapSlug: string) {
  const def = findRoadmap(roadmapSlug)
  if (!def) return null

  const roadmap = await withRetry(() => prisma.roadmap.upsert({
    where: { slug: def.slug },
    update: { title: def.title, description: def.description, outcome: def.outcome, requiredSubjects: def.requiredSubjects, estimatedWeeks: def.estimatedWeeks },
    create: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      outcome: def.outcome,
      requiredSubjects: def.requiredSubjects,
      estimatedWeeks: def.estimatedWeeks,
    },
  }))

  const capstone = await withRetry(() => prisma.capstoneProject.upsert({
    where: { roadmapId: roadmap.id },
    update: { title: def.capstone.title, description: def.capstone.description, requirements: def.capstone.requirements, estimatedHours: def.capstone.estimatedHours },
    create: {
      roadmapId: roadmap.id,
      slug: def.capstone.slug,
      title: def.capstone.title,
      description: def.capstone.description,
      requirements: def.capstone.requirements,
      estimatedHours: def.capstone.estimatedHours,
    },
  }))

  return { roadmap, capstone, def }
}

/** Seeds every catalog roadmap — used by the listing endpoint so "browse" always shows fresh data. */
export async function ensureAllRoadmapsSeeded() {
  return Promise.all(ROADMAP_CATALOG.map((r) => ensureRoadmapSeeded(r.slug)))
}

// ─── Subject auto-enrollment (mirrors /api/subjects/enroll) ──────────────────

async function ensureSubjectEnrolled(userId: string, profileId: string, subjectSlug: string) {
  const librarySubject = findLibrarySubject(subjectSlug)
  if (!librarySubject) return null

  const subject = await withRetry(() => prisma.subject.upsert({
    where: { slug: librarySubject.slug },
    update: {},
    create: {
      slug: librarySubject.slug,
      name: librarySubject.name,
      type: CATEGORY_TO_TYPE[librarySubject.category],
      description: librarySubject.description,
    },
  }))

  await withRetry(() => prisma.profileSubject.upsert({
    where: { profileId_subjectId: { profileId, subjectId: subject.id } },
    update: { isActive: true },
    create: { profileId, subjectId: subject.id, currentLevelIndex: 0 },
  }))

  const existingPath = await withRetry(() => prisma.learningPath.findFirst({ where: { userId, subjectId: subject.id } }))
  if (!existingPath) {
    await withRetry(() => prisma.learningPath.create({
      data: {
        userId,
        subjectId: subject.id,
        title: `${subject.name} Course`,
        curriculum: { generated: false, steps: [], note: 'Will be generated at first lesson' },
        totalSteps: 0,
        isActive: true,
      },
    }))
  }

  return subject
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

/**
 * Enrolls the learner in a career roadmap: auto-enrolls every required subject
 * (Part 2), seeds the milestone set (Part 3), and tracks the roadmap as their
 * active career target via CareerProfile. Idempotent — re-enrolling returns
 * the existing enrollment untouched.
 */
export async function enrollUserInRoadmap(userId: string, roadmapSlug: string) {
  const seeded = await ensureRoadmapSeeded(roadmapSlug)
  if (!seeded) throw new Error('Unknown roadmap')
  const { roadmap, def } = seeded

  const profile = await withRetry(() => prisma.profile.findUnique({ where: { userId } }))
  if (!profile) throw new Error('Complete onboarding first')

  const existing = await withRetry(() => prisma.roadmapEnrollment.findUnique({
    where: { userId_roadmapId: { userId, roadmapId: roadmap.id } },
  }))
  if (existing) return { enrollment: existing, roadmap, alreadyEnrolled: true }

  for (const slug of def.requiredSubjects) {
    try {
      await ensureSubjectEnrolled(userId, profile.id, slug)
    } catch (err) {
      console.warn(`[roadmaps] auto-enroll of "${slug}" skipped:`, err)
    }
  }

  const enrollment = await withRetry(() => prisma.roadmapEnrollment.create({
    data: { userId, roadmapId: roadmap.id, status: 'ACTIVE', progressPct: 0 },
  }))

  const milestoneDefs: { kind: MilestoneKind; title: string; description: string }[] = []
  for (const slug of def.requiredSubjects) {
    const lib = findLibrarySubject(slug)
    if (lib) milestoneDefs.push({ kind: 'SUBJECT_COMPLETE', title: `${lib.name} Complete`, description: `Finish every module of ${lib.name} to unlock this milestone.` })
  }
  milestoneDefs.push(
    { kind: 'ROADMAP_PROGRESS', title: `${def.title} Roadmap 25% Complete`, description: `Reach 25% overall progress on the ${def.title} roadmap.` },
    { kind: 'ROADMAP_PROGRESS', title: `${def.title} Roadmap 50% Complete`, description: `Reach 50% overall progress on the ${def.title} roadmap.` },
    { kind: 'CAPSTONE_COMPLETE', title: `${def.capstone.title} Completed`, description: `Submit and pass the ${def.title} capstone project.` },
    { kind: 'ROADMAP_COMPLETE', title: `${def.title} Roadmap Completed`, description: `Complete every required subject and the capstone project.` },
  )

  for (const m of milestoneDefs) {
    await withRetry(() => prisma.milestone.upsert({
      where: { enrollmentId_kind_title: { enrollmentId: enrollment.id, kind: m.kind, title: m.title } },
      update: {},
      create: { enrollmentId: enrollment.id, roadmapId: roadmap.id, userId, kind: m.kind, title: m.title, description: m.description },
    }))
  }

  await withRetry(() => prisma.careerProfile.upsert({
    where: { userId },
    update: { activeRoadmapId: roadmap.id, targetRole: def.outcome },
    create: { userId, activeRoadmapId: roadmap.id, targetRole: def.outcome, skills: [] },
  }))

  await syncRoadmapProgress(userId, enrollment.id)

  return { enrollment, roadmap, alreadyEnrolled: false }
}

// ─── Progress sync, milestone unlocking, certification ──────────────────────

/**
 * Recomputes overall roadmap progress from the learner's actual subject
 * progress + capstone status, unlocks any milestones that have now been
 * earned, marks the roadmap COMPLETED + issues a certificate when every
 * required subject and the capstone are done, and refreshes JobReadiness.
 * Lazy — called whenever roadmap data is read or the capstone is graded
 * (mirrors the lazy module-progress sync in /api/curriculum/plan).
 */
export async function syncRoadmapProgress(userId: string, enrollmentId: string) {
  const enrollment = await withRetry(() => prisma.roadmapEnrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      roadmap: { include: { capstone: { include: { submissions: { where: { userId }, take: 1 } } } } },
      milestones: true,
    },
  }))
  if (!enrollment || enrollment.userId !== userId) return null

  const requiredSlugs = enrollment.roadmap.requiredSubjects
  const subjects = await withRetry(() => prisma.subject.findMany({ where: { slug: { in: requiredSlugs } } }))
  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId },
    include: { subjects: { where: { subjectId: { in: subjects.map((s) => s.id) } } } },
  }))

  const subjectProgress = requiredSlugs.map((slug) => {
    const subject = subjects.find((s) => s.slug === slug)
    const ps = subject ? profile?.subjects.find((p) => p.subjectId === subject.id) : null
    const lib = findLibrarySubject(slug)
    return {
      slug,
      name: lib?.name ?? slug,
      subjectId: subject?.id ?? null,
      progressPercent: ps?.progressPercent ?? 0,
    }
  })

  const capstoneSubmission = enrollment.roadmap.capstone?.submissions[0] ?? null
  const capstoneProgress = capstoneSubmission?.status === 'COMPLETED' ? 100
    : capstoneSubmission?.status === 'SUBMITTED' ? 70
    : capstoneSubmission?.status === 'IN_PROGRESS' ? 35
    : 0

  const weights = [...subjectProgress.map((s) => s.progressPercent), capstoneProgress]
  const overallPct = weights.length > 0 ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length) : 0

  const now = new Date()
  let unlockedCount = 0

  for (const milestone of enrollment.milestones) {
    if (milestone.achievedAt) continue
    let achieved = false
    if (milestone.kind === 'SUBJECT_COMPLETE') {
      achieved = subjectProgress.some((s) => milestone.title === `${s.name} Complete` && s.progressPercent >= 100)
    } else if (milestone.kind === 'ROADMAP_PROGRESS') {
      if (milestone.title.includes('25%')) achieved = overallPct >= 25
      else if (milestone.title.includes('50%')) achieved = overallPct >= 50
    } else if (milestone.kind === 'CAPSTONE_COMPLETE') {
      achieved = capstoneSubmission?.status === 'COMPLETED'
    } else if (milestone.kind === 'ROADMAP_COMPLETE') {
      achieved = subjectProgress.every((s) => s.progressPercent >= 100) && capstoneSubmission?.status === 'COMPLETED'
    }

    if (achieved) {
      await withRetry(() => prisma.milestone.update({ where: { id: milestone.id }, data: { achievedAt: now } }))
      unlockedCount++
    }
  }

  if (unlockedCount > 0) {
    await withRetry(() => prisma.user.update({ where: { id: userId }, data: { xpPoints: { increment: 15 * unlockedCount } } }))
  }

  const isComplete = subjectProgress.every((s) => s.progressPercent >= 100) && capstoneSubmission?.status === 'COMPLETED'
  const status: RoadmapStatus = isComplete ? 'COMPLETED' : 'ACTIVE'

  await withRetry(() => prisma.roadmapEnrollment.update({
    where: { id: enrollment.id },
    data: {
      progressPct: overallPct,
      status,
      completedAt: isComplete ? (enrollment.completedAt ?? now) : enrollment.completedAt,
    },
  }))

  if (isComplete) {
    await issueCertificate(userId, enrollment.roadmap.id, enrollment.id)
  }

  try {
    await refreshJobReadiness(userId)
  } catch (err) {
    console.warn('[roadmaps] job readiness refresh skipped:', err)
  }

  return { overallPct, subjectProgress, capstoneProgress, unlockedCount, isComplete }
}

export function generateCertificateCode(): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const random = randomBytes(3).toString('hex').toUpperCase()
  return `MT-${stamp}-${random}`
}

/**
 * Issues a certificate on first roadmap completion (Part 4) — unique code,
 * recipient name snapshot, and an XP bonus. Idempotent: returns the existing
 * certificate if one was already generated for this user/roadmap.
 */
export async function issueCertificate(userId: string, roadmapId: string, enrollmentId: string) {
  const existing = await withRetry(() => prisma.certificate.findUnique({ where: { userId_roadmapId: { userId, roadmapId } } }))
  if (existing) return existing

  const [user, roadmap] = await Promise.all([
    withRetry(() => prisma.user.findUnique({ where: { id: userId }, include: { profile: true } })),
    withRetry(() => prisma.roadmap.findUnique({ where: { id: roadmapId } })),
  ])
  if (!roadmap) return null

  const recipientName = user?.profile?.displayName?.trim() || user?.name?.trim() || 'My Tutor Learner'

  const certificate = await withRetry(() => prisma.certificate.create({
    data: {
      certificateCode: generateCertificateCode(),
      userId,
      roadmapId,
      enrollmentId,
      recipientName,
      roadmapTitle: roadmap.title,
    },
  }))

  await withRetry(() => prisma.user.update({ where: { id: userId }, data: { xpPoints: { increment: 100 } } }))

  return certificate
}

// ─── Capstone submission + AI review (Part 5, mirrors lib/projects/service) ─

export function clampScore(n: unknown, fallback = 50): number {
  const num = typeof n === 'number' && Number.isFinite(n) ? n : fallback
  return Math.max(0, Math.min(100, Math.round(num)))
}

export function buildCapstoneReviewPrompt(opts: { title: string; description: string; requirements: string[]; content: string }): string {
  return [
    `You are a senior engineer and mentor evaluating a capstone project that marks the end of a career-readiness roadmap — the bar is "would this be acceptable work from a junior professional?"`,
    `Capstone: "${opts.title}" — ${opts.description}`,
    `It must demonstrate: ${opts.requirements.join('; ')}`,
    ``,
    `Submission:`,
    '"""',
    opts.content.slice(0, 8000),
    '"""',
    ``,
    `Score the submission from 0-100 (60+ = passing, job-ready quality) and respond as JSON with this exact shape:`,
    `{"score": number, "summary": string, "strengths": string[], "improvements": string[]}`,
  ].join('\n')
}

/**
 * Submits and immediately AI-reviews the roadmap's capstone project. Passing
 * (score >= 60) marks it COMPLETED, awards XP, and triggers a progress sync
 * that can complete the roadmap and issue the certificate in the same call.
 */
export async function submitCapstone(opts: { userId: string; roadmapSlug: string; content: string }) {
  const { userId, roadmapSlug, content } = opts

  const seeded = await ensureRoadmapSeeded(roadmapSlug)
  if (!seeded) throw new Error('Unknown roadmap')
  const { roadmap, capstone } = seeded

  const enrollment = await withRetry(() => prisma.roadmapEnrollment.findUnique({
    where: { userId_roadmapId: { userId, roadmapId: roadmap.id } },
  }))
  if (!enrollment) throw new Error('Not enrolled in this roadmap')

  const raw = await generateJSON(buildCapstoneReviewPrompt({
    title: capstone.title,
    description: capstone.description,
    requirements: capstone.requirements,
    content,
  }), 1200)

  const score = clampScore(raw?.score)
  const summary = typeof raw?.summary === 'string' && raw.summary.trim()
    ? raw.summary.trim()
    : 'The capstone was reviewed against the roadmap requirements.'
  const strengths = Array.isArray(raw?.strengths) ? raw.strengths.filter((s: unknown) => typeof s === 'string').slice(0, 5) : []
  const improvements = Array.isArray(raw?.improvements) ? raw.improvements.filter((s: unknown) => typeof s === 'string').slice(0, 5) : []

  const status: ProjectStatus = score >= 60 ? ProjectStatus.COMPLETED : ProjectStatus.SUBMITTED
  const now = new Date()

  const submission = await withRetry(() => prisma.capstoneSubmission.upsert({
    where: { userId_capstoneId: { userId, capstoneId: capstone.id } },
    create: { userId, capstoneId: capstone.id, status, content, score, aiReview: summary, strengths, improvements, completedAt: status === 'COMPLETED' ? now : null },
    update: { status, content, score, aiReview: summary, strengths, improvements, completedAt: status === 'COMPLETED' ? now : null },
  }))

  if (status === 'COMPLETED') {
    await withRetry(() => prisma.user.update({ where: { id: userId }, data: { xpPoints: { increment: 50 } } }))
  }

  const sync = await syncRoadmapProgress(userId, enrollment.id)

  return { submission, review: { score, summary, strengths, improvements }, sync }
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

/** The learner's current roadmap (most recently active/updated), with a freshly synced snapshot. */
export async function getActiveRoadmapEnrollment(userId: string) {
  const enrollment = await withRetry(() => prisma.roadmapEnrollment.findFirst({
    where: { userId },
    orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
  }))
  if (!enrollment) return null

  await syncRoadmapProgress(userId, enrollment.id)

  return withRetry(() => prisma.roadmapEnrollment.findUnique({
    where: { id: enrollment.id },
    include: {
      roadmap: { include: { capstone: { include: { submissions: { where: { userId }, take: 1 } } } } },
      milestones: { orderBy: { createdAt: 'asc' } },
      certificates: true,
    },
  }))
}
