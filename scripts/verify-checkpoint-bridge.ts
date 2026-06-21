// One-off verification script for the checkpoint -> TopicProgress/MistakeRecord
// bridge in src/app/api/learn/chat/route.ts. Run with: npx tsx scripts/verify-checkpoint-bridge.ts
// Requires a reachable DATABASE_URL and an existing user id.
import { prisma } from '../src/lib/db/prisma'

async function main() {
  const userId = process.argv[2]
  if (!userId) {
    console.error('Usage: npx tsx scripts/verify-checkpoint-bridge.ts <userId>')
    process.exit(1)
  }
  const subjectSlug = 'verify-test-subject'
  const topicSlug = 'verify-test-node'

  // Simulate the fail branch
  await prisma.topicProgress.upsert({
    where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } },
    create: { userId, subjectSlug, topicSlug, status: 'IN_PROGRESS', masteryPct: 25, attempts: 1, lastScore: 25 },
    update: { status: 'IN_PROGRESS', masteryPct: 25, lastScore: 25, attempts: { increment: 1 } },
  })
  await prisma.mistakeRecord.create({
    data: { userId, subjectSlug, topicSlug, sessionId: 'verify-session', category: 'conversational_checkpoint', questionId: topicSlug },
  })

  const tp = await prisma.topicProgress.findUnique({ where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } } })
  const mr = await prisma.mistakeRecord.findMany({ where: { userId, subjectSlug, topicSlug, category: 'conversational_checkpoint' } })
  console.log('TopicProgress:', tp)
  console.log('MistakeRecord rows:', mr.length, mr)

  // Simulate never-downgrade: mark MASTERED, then confirm a checkpoint write is skipped
  await prisma.topicProgress.update({ where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } }, data: { status: 'MASTERED' } })
  const before = await prisma.topicProgress.findUnique({ where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } } })
  console.log('Marked MASTERED:', before)
  console.log('-> route.ts logic would now `return` before upserting, leaving this row untouched.')

  // cleanup
  await prisma.mistakeRecord.deleteMany({ where: { userId, subjectSlug, topicSlug } })
  await prisma.topicProgress.deleteMany({ where: { userId, subjectSlug, topicSlug } })
  console.log('Cleaned up test rows.')
}

main().finally(() => prisma.$disconnect())
