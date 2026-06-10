import { PrismaClient, SubjectType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const subjects = [
    { slug: "c", name: "C Programming", type: SubjectType.C, description: "Системное программирование на языке C" },
    { slug: "cpp", name: "C++", type: SubjectType.CPP, description: "Объектно-ориентированное программирование на C++" },
    { slug: "python", name: "Python", type: SubjectType.PYTHON, description: "Программирование на Python" },
    { slug: "english", name: "English", type: SubjectType.ENGLISH, description: "Английский язык для разработчиков" },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {},
      create: subject,
    });
  }

  console.log("Seed complete — subjects created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
