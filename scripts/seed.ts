/**
 * Run with: npx tsx scripts/seed.ts
 *
 * Seeds the four core subjects. Idempotent — safe to run multiple times.
 */
import { PrismaClient, SubjectType } from "@prisma/client";

const prisma = new PrismaClient();

const SUBJECTS = [
  {
    slug: "c",
    name: "C Programming",
    type: SubjectType.C,
    description: "Системное программирование на языке C — указатели, память, алгоритмы",
  },
  {
    slug: "cpp",
    name: "C++",
    type: SubjectType.CPP,
    description: "Объектно-ориентированное программирование, STL, современный C++",
  },
  {
    slug: "python",
    name: "Python",
    type: SubjectType.PYTHON,
    description: "Python от основ до продвинутых тем: ООП, async, библиотеки",
  },
  {
    slug: "english",
    name: "English",
    type: SubjectType.ENGLISH,
    description: "Английский язык для разработчиков — техническая лексика и разговорная речь",
  },
];

async function main() {
  console.log("Seeding subjects…");

  for (const subject of SUBJECTS) {
    const result = await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: { name: subject.name, description: subject.description },
      create: subject,
    });
    console.log(`  ✓ ${result.name} (${result.id})`);
  }

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
