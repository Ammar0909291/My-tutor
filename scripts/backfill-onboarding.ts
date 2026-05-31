/**
 * One-time backfill: sets onboardingCompleted = true for every user
 * who already has a Profile record (created before the column existed).
 *
 * Run: npx tsx scripts/backfill-onboarding.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const profiles = await prisma.profile.findMany({ select: { userId: true } })

  if (profiles.length === 0) {
    console.log('No profiles found — nothing to backfill.')
    return
  }

  const { count } = await prisma.user.updateMany({
    where: { id: { in: profiles.map((p) => p.userId) } },
    data: { onboardingCompleted: true },
  })

  console.log(`✓ Backfilled onboardingCompleted = true for ${count} user(s).`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
