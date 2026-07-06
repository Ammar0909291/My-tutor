/**
 * One-time local seed for e2e/*.spec.ts — creates test@example.com /
 * password123, onboarded, enrolled in physics + mathematics + english (the
 * three live curriculums). Safe to re-run (upserts).
 */
import { PrismaClient, SubjectType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'test@example.com'
  const passwordHash = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: 'E2E Test User' },
  })
  await prisma.user.update({ where: { id: user.id }, data: { onboardingCompleted: true } })

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: { teachingLanguage: 'en' },
    create: {
      userId: user.id,
      displayName: 'E2E Test User',
      selfDescription: 'e2e testing',
      userType: 'GENERAL_LEARNER',
      teachingLanguage: 'en',
    },
  })

  const subjects = [
    { slug: 'physics', name: 'Physics', type: SubjectType.PHYSICS },
    { slug: 'mathematics', name: 'Mathematics', type: SubjectType.MATHEMATICS },
    { slug: 'english', name: 'English', type: SubjectType.ENGLISH },
  ]
  for (const s of subjects) {
    const subject = await prisma.subject.upsert({ where: { slug: s.slug }, update: {}, create: s })
    await prisma.profileSubject.upsert({
      where: { profileId_subjectId: { profileId: profile.id, subjectId: subject.id } },
      update: {},
      create: { profileId: profile.id, subjectId: subject.id },
    })
  }

  console.log(`Seeded ${email} / password123, enrolled in physics/mathematics/english`)
}

main().finally(() => prisma.$disconnect())
