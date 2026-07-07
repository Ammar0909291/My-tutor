/**
 * Run with: npx tsx scripts/seed.ts
 *
 * Seeds the four core subjects. Idempotent — safe to run multiple times.
 */
import { PrismaClient, SubjectType } from "@prisma/client";
import { SUBJECT_LIBRARY, type SubjectCategory } from "../src/lib/curriculum/subjectCatalog";

const prisma = new PrismaClient();

const CATEGORY_TO_TYPE: Record<SubjectCategory, SubjectType> = {
  languages: SubjectType.LANGUAGE,
  programming: SubjectType.PROGRAMMING,
  mathematics: SubjectType.MATHEMATICS,
  physics: SubjectType.PHYSICS,
  chemistry: SubjectType.CHEMISTRY,
  biology: SubjectType.BIOLOGY,
  ai: SubjectType.AI,
  computer_science: SubjectType.COMPUTER_SCIENCE,
};

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

  console.log("Seeding Subject Library (multi-subject ecosystem)…");

  const existingSlugs = new Set(SUBJECTS.map((s) => s.slug));
  for (const lib of SUBJECT_LIBRARY) {
    if (existingSlugs.has(lib.slug)) continue; // already seeded above with its legacy type
    const result = await prisma.subject.upsert({
      where: { slug: lib.slug },
      update: { name: lib.name, description: lib.description },
      create: {
        slug: lib.slug,
        name: lib.name,
        type: CATEGORY_TO_TYPE[lib.category],
        description: lib.description,
      },
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
