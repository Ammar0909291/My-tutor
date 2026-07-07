import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const total = await prisma.profile.count()
  const affected = await prisma.profile.count({
    where: { teachingLanguage: 'ru', NOT: { country: 'ru' } },
  })
  const byCountry = await prisma.profile.groupBy({
    by: ['country'],
    where: { teachingLanguage: 'ru' },
    _count: true,
  })
  console.log('Total profiles:', total)
  console.log('Affected (teachingLanguage=ru AND country!=ru):', affected)
  console.log('Breakdown of country values among teachingLanguage=ru profiles:', byCountry)
}
main().catch((e) => { console.error('DB error:', e.message); process.exit(1) }).finally(() => prisma.$disconnect())
